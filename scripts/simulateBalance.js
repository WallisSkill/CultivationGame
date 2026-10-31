/* Kiểm tra cân bằng & dữ liệu cốt truyện không cần trình duyệt:
   node scripts/simulateBalance.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { console, Math, Object, Array, JSON, Number, Infinity, performance, state: { name: 'x' }, log() { } };
ctx.window = ctx;
vm.createContext(ctx);
['js/world/balance.js', 'js/world/atlas.js', 'js/world/storyline.js', 'js/combat/bonus.js', 'js/combat/dmgCalculate.js'].forEach(f => {
    vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8').replace(/\bconst (?=[A-Z_]+\b)/g, 'var '), ctx);
});
vm.runInContext(`
var INFO = {
  ORIGINS, LOCATIONS, QUEST_INDEX, MAIN_QUESTS, SIDE_QUESTS, BOSSES, NPCS, WORLD_TIERS, GEAR_SLOT_IDS, LB_GRADE_POWER,
  refStats, baseStatsFor, makeGearItem, enemyStatsFor, maxLinhBaoGradeForRealm, realmShare, computeDamage
};`, ctx);
const G = ctx.INFO;

const fail = [];

/* ---- dữ liệu cốt truyện ---- */
for (const [id, l] of Object.entries(G.LOCATIONS)) {
    l.links.forEach(o => {
        if (!G.LOCATIONS[o]) fail.push(`${id}: link hỏng ${o}`);
        else if (!G.LOCATIONS[o].links.includes(id)) fail.push(`${id}: link một chiều ${o}`);
    });
    if (l.gate && !G.LOCATIONS[l.gate.to]) fail.push(`${id}: gate hỏng`);
}
for (const q of Object.values(G.QUEST_INDEX)) {
    q.steps.forEach(s => {
        if (s.go && !G.LOCATIONS[s.go]) fail.push(`${q.id}: go ${s.go}`);
        if (s.boss && !G.BOSSES[s.boss]) fail.push(`${q.id}: boss ${s.boss}`);
        if (s.gather && !G.LOCATIONS[s.gather.loc]) fail.push(`${q.id}: gather ${s.gather.loc}`);
        if (s.hunt) {
            const loc = G.LOCATIONS[s.hunt.loc];
            if (!loc) fail.push(`${q.id}: hunt loc ${s.hunt.loc}`);
            else if (!loc.enemies.some(e => e.name === s.hunt.name)) fail.push(`${q.id}: ${loc.name} không có ${s.hunt.name}`);
        }
        (s.say || []).forEach(([who]) => { if (who !== 'me' && !G.NPCS[who]) fail.push(`${q.id}: speaker ${who}`); });
    });
}
for (const [id, o] of Object.entries(G.ORIGINS)) {
    if (!G.LOCATIONS[o.loc]) fail.push(`origin ${id}: loc ${o.loc}`);
    (o.steps || []).forEach(s => {
        if (s.boss && !G.BOSSES[s.boss]) fail.push(`origin ${id}: boss ${s.boss}`);
        if (s.hunt && !G.LOCATIONS[s.hunt.loc].enemies.some(e => e.name === s.hunt.name)) fail.push(`origin ${id}: ${s.hunt.name}`);
    });
}
for (let r = 1; r < 29; r++) if (!G.MAIN_QUESTS.some(q => q.unlock === r)) fail.push(`thiếu quest mở khóa realm ${r}`);
G.MAIN_QUESTS.forEach((q, i) => {
    if (i && (q.needs[0] < G.MAIN_QUESTS[i - 1].needs[0])) fail.push(`${q.id}: needs lùi`);
    if (q.unlock && q.needs[0] !== q.unlock - 1) fail.push(`${q.id}: needs ${q.needs} lệch unlock ${q.unlock}`);
});
['tien', 'thanh', 'thien', 'hondon', 'hongmong', 'chungnguyen'].forEach(w => {
    const list = Object.values(G.LOCATIONS).filter(l => l.world === w);
    if (!list.some(l => (l.services || []).includes('shop'))) fail.push(`${w}: không có shop`);
    if (!list.some(l => (l.services || []).includes('forge'))) fail.push(`${w}: không có forge`);
});

/* ---- đường cong sức mạnh ---- */
function playerAt(r, s, gearRealm, quality, lbSlots, rootRank = 3, lbRealm = r) {
    const base = G.baseStatsFor(r, s, rootRank);
    const gear = { atk: 0, def: 0, hp: 0 };
    if (gearRealm >= 0) G.GEAR_SLOT_IDS.forEach(k => {
        const it = G.makeGearItem(gearRealm, k, quality);
        gear.atk += it.atk; gear.def += it.def; gear.hp += it.hp;
    });
    return {
        atk: base.power + gear.atk, def: base.defense + gear.def, hp: base.hp + gear.hp,
        selfShare: base.power / (base.power + gear.atk), lb: G.LB_GRADE_POWER[G.maxLinhBaoGradeForRealm(lbRealm)], lbSlots, rootRank, r, s
    };
}

/* trận trung bình: mỗi ô pháp bảo ~1.3 hệ số, hồi 2.5 giây; địch nhân 0.5 sát thương */
function duel(p, tier, enemyRealm = p.r, enemyStage = p.s, scale = 1, board = 3) {
    const e = G.enemyStatsFor(enemyRealm, enemyStage, tier, scale);
    const elements = ['Kim'];
    const hit = G.computeDamage(p.atk * 1.3 * p.lb, elements, p.rootRank, p.r, p.s, e.def, elements, p.rootRank, enemyRealm, enemyStage).final;
    const back = G.computeDamage(e.str * 1.3 * 0.5, elements, p.rootRank, enemyRealm, enemyStage, p.def, elements, p.rootRank, p.r, p.s).final;
    const dps = hit * p.lbSlots / 2.5, taken = back * board / 2.5;
    const tKill = e.maxHp / dps, tDie = p.hp / taken;
    return { win: tKill < tDie, tKill, tDie };
}

console.log('r  self%(đồ Bảo)  ATK-base  ATK-đồ    |  đồ đúng cảnh: thường/boss  |  đồ cũ -1 cảnh  |  không đồ');
for (let r = 0; r < 29; r++) {
    const s = 2;
    const slots = r < 5 ? 3 : (r < 20 ? 5 : 6);
    const bossBoard = r < 16 ? 4 : 5;
    const on = playerAt(r, s, r, 2, slots);
    const old = playerAt(r, s, r - 1, 2, slots);
    const none = playerAt(r, s, -1, 2, slots);
    const a = duel(on, 'Thường'), b = duel(on, 'Boss', r, s, 1, bossBoard), c = duel(old, 'Boss', r, s, 1, bossBoard), d = duel(none, 'Thường');
    const fmt = x => `${x.win ? 'W' : 'L'} ${x.tKill.toFixed(0)}s/${x.tDie.toFixed(0)}s`;
    console.log(String(r).padEnd(3), (on.selfShare * 100).toFixed(0).padStart(4) + '%',
        String(G.baseStatsFor(r, s, 3).power).padStart(14), String(on.atk - G.baseStatsFor(r, s, 3).power).padStart(13), ' | ',
        fmt(a).padEnd(12), fmt(b).padEnd(12), ' | ', fmt(c).padEnd(12), ' | ', fmt(d));
    if (!a.win) fail.push(`realm ${r}: thua quái thường dù đủ đồ`);
    if (!b.win) fail.push(`realm ${r}: thua boss dù đủ đồ`);
    if (a.tKill < 6) fail.push(`realm ${r}: trận quá ngắn ${a.tKill.toFixed(1)}s`);
    if (b.tKill > 80) fail.push(`realm ${r}: boss quá lâu, chạm mốc 90s`);
    if (r <= 14 && d.win) fail.push(`realm ${r}: không đồ vẫn thắng — đồ chưa đủ quan trọng`);
}

if (fail.length) {
    console.log('\nLỖI:\n' + [...new Set(fail)].join('\n'));
    process.exit(1);
}
console.log('\nOK');
