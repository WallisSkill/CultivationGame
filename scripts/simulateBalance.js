/* Kiểm tra cân bằng & dữ liệu cốt truyện không cần trình duyệt:
   node scripts/simulateBalance.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { console, Math, Object, Array, JSON, Number, Infinity, performance, state: { name: 'x' }, log() { } };
ctx.window = ctx;
vm.createContext(ctx);
['js/world/balance.js', 'js/world/atlas.js', 'js/world/storyline.js', 'js/world/storychapters.js', 'js/world/tienarc.js', 'js/world/honghoang.js', 'js/world/storyscenes.js', 'js/world/avatar.js', 'js/world/rings.js', 'js/world/voices.js', 'js/world/guides.js', 'js/world/trials.js', 'js/world/congduc.js', 'js/combat/bonus.js', 'js/combat/dmgCalculate.js'].forEach(f => {
    vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8').replace(/\bconst (?=[A-Z_]+\b)/g, 'var '), ctx);
});
vm.runInContext(`
var INFO = {
  questAllSteps, RING_TALES, BREAKTHROUGH_TRIALS, STORY_AREA_UNLOCK, NPC_VOICES, RESIDENT_VOICES, ENEMY_RANGE_LINES, ORIGINS, ORIGIN_STORY, ENDINGS, LOCATION_NPCS, FREE_SERVICE_LOCATIONS, LOCATIONS, QUEST_INDEX, MAIN_QUESTS, SIDE_QUESTS, BOSSES, NPCS, WORLD_TIERS, GEAR_SLOT_IDS, LB_GRADE_POWER,
  refStats, baseStatsFor, makeGearItem, enemyStatsFor, maxLinhBaoGradeForRealm, realmShare, computeDamage, GEAR_SUBS, GEAR_SUB_ROLL, GEAR_QUALITIES, gearSubFloor, GATE_TIERS, GATE_QUESTS, LB_GRADE_UNLOCK_REALM
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
        [...(s.say || []), ...(s.ruled?.say || [])].forEach(([who]) => { if (who !== 'me' && !G.NPCS[who]) fail.push(`${q.id}: speaker ${who}`); });
        if (s.ruled?.talk && !G.LOCATIONS[s.ruled.loc]) fail.push(`${q.id}: ruled loc ${s.ruled.loc}`);
    });
}
for (const [id, o] of Object.entries(G.ORIGINS)) {
    if (!G.LOCATIONS[o.loc]) fail.push(`origin ${id}: loc ${o.loc}`);
    if (!(G.LOCATIONS[o.loc].services || []).includes('shop')) fail.push(`origin ${id}: không có cửa hàng`);
    (o.steps || []).forEach(s => {
        if (s.boss && !G.BOSSES[s.boss]) fail.push(`origin ${id}: boss ${s.boss}`);
        if (s.hunt && !G.LOCATIONS[s.hunt.loc].enemies.some(e => e.name === s.hunt.name)) fail.push(`origin ${id}: ${s.hunt.name}`);
    });
}
const storyTokens = JSON.stringify([G.MAIN_QUESTS, G.ENDINGS]).match(/\{\w+\}/g).map(t => t.slice(1, -1)).filter(t => t !== 'name' && t !== 'holder');
for (const id of Object.keys(G.ORIGINS)) {
    const story = G.ORIGIN_STORY[id];
    if (!story) { fail.push(`origin ${id}: thiếu ORIGIN_STORY`); continue; }
    storyTokens.forEach(t => { if (!story.text[t]) fail.push(`origin ${id}: thiếu lời {${t}}`); });
    [...story.outro, ...story.first.steps.flatMap(s => s.say || [])].forEach(([who]) => { if (who !== 'me' && !G.NPCS[who]) fail.push(`origin ${id}: speaker ${who}`); });
    story.first.steps.forEach(s => {
        if ((s.go || s.loc || s.hunt.loc) !== G.ORIGINS[id].loc) fail.push(`origin ${id}: chương đầu ở ngoài quê`);
        if (s.hunt && !G.LOCATIONS[s.hunt.loc].enemies.some(e => e.name === s.hunt.name)) fail.push(`origin ${id}: ${s.hunt.name}`);
    });
}
Object.entries(G.RING_TALES).forEach(([mark, lines]) => lines.forEach(([who]) => { if (who !== 'me' && who !== 'narr' && !G.NPCS[who]) fail.push(`vòng ${mark}: speaker ${who}`); }));
const ABSOLUTE = ['hondon', 'hongmong', 'chungnguyen'];
const WORLDS_WITHOUT_LIFE = [...ABSOLUTE, 'huvo'];
function reachable(start, realm) {
    const seen = new Set([start]);
    const queue = [start];
    while (queue.length) {
        G.LOCATIONS[queue.pop()].links.forEach(n => {
            const l = G.LOCATIONS[n];
            if (!seen.has(n) && (ABSOLUTE.includes(l.world) || realm >= l.minR)) { seen.add(n); queue.push(n); }
        });
    }
    return seen;
}
for (const [id, o] of Object.entries(G.ORIGINS)) {
    if (!reachable(o.loc, 0).has('thanh_van')) fail.push(`origin ${id}: không tới được Thanh Vân ở Luyện Khí`);
}
for (const q of Object.values(G.QUEST_INDEX)) {
    q.steps.forEach(s => {
        const id = s.go || s.loc || s.hunt?.loc || s.gather?.loc;
        if (!id) return;
        const l = G.LOCATIONS[id];
        if (!ABSOLUTE.includes(l.world) && l.minR > q.needs[0]) fail.push(`${q.id}: ${l.name} cần cảnh giới ${l.minR} > ${q.needs[0]}`);
    });
}
for (const w of G.WORLD_TIERS) {
    const list = Object.values(G.LOCATIONS).filter(l => l.world === w.id);
    for (let r = w.from; r <= w.to; r++) {
        const open = list.filter(l => ABSOLUTE.includes(w.id) || r >= l.minR);
        const seen = reachable(open[0].id, r);
        open.forEach(l => { if (!seen.has(l.id)) fail.push(`${w.name} cảnh giới ${r}: ${l.name} bị cô lập`); });
    }
}
for (let r = 1; r < 29; r++) if (!G.MAIN_QUESTS.some(q => q.unlock === r)) fail.push(`thiếu quest mở khóa realm ${r}`);
for (let r = 0; r < 29; r++) for (let st = 0; st < 4; st++) if (!G.MAIN_QUESTS.some(q => q.needs[0] === r && q.needs[1] === st)) fail.push(`thiếu hồi truyện ${r}-${st}`);
G.MAIN_QUESTS.forEach((q, i) => {
    const prev = G.MAIN_QUESTS[i - 1];
    if (prev && !q.needsEnding && (q.needs[0] < prev.needs[0] || (q.needs[0] === prev.needs[0] && q.needs[1] <= prev.needs[1]))) fail.push(`${q.id}: needs lùi hoặc trùng ${prev.id}`);
    (q.needsSide || []).forEach(id => {
        const side = G.QUEST_INDEX[id];
        if (side.afterMain && G.MAIN_QUESTS.findIndex(m => m.id === side.afterMain) >= i) fail.push(`${q.id}: kẹt vòng với ${id}`);
    });
    q.steps.forEach(step => { if (step.talk && !G.LOCATION_NPCS[step.loc].includes(step.talk)) fail.push(`${q.id}: ${step.talk} không có ở ${step.loc}`); });
    if (q.unlock && q.needs[0] !== q.unlock - 1) fail.push(`${q.id}: needs ${q.needs} lệch unlock ${q.unlock}`);
});
['tien', 'thanh', 'thien'].forEach(w => {
    const list = Object.values(G.LOCATIONS).filter(l => l.world === w);
    if (!list.some(l => (l.services || []).includes('shop'))) fail.push(`${w}: không có shop`);
    if (!list.some(l => (l.services || []).includes('forge'))) fail.push(`${w}: không có forge`);
});

for (let r = 0; r < 29; r++) {
    if (!Object.values(G.LOCATIONS).some(l => (l.services || []).includes('forge') && l.minR <= r && l.maxR >= r)) fail.push(`cảnh giới ${r}: không có lò rèn`);
}
G.WORLD_TIERS.filter(w => !WORLDS_WITHOUT_LIFE.includes(w.id)).forEach(w => {
    if (!Object.values(G.LOCATIONS).some(l => l.world === w.id && l.forgeGrade === 2)) fail.push(`${w.id}: không có Thần lò`);
});

Object.values(G.LOCATIONS).filter(l => (l.services || []).length).forEach(l => {
    if (!G.FREE_SERVICE_LOCATIONS.includes(l.id) && !G.SIDE_QUESTS.some(q => q.reward?.opens === l.id)) fail.push(`${l.name}: không có nhiệm vụ mở dịch vụ`);
});
G.SIDE_QUESTS.filter(q => q.reward?.opens).forEach(q => q.steps.forEach(step => {
    const names = (G.LOCATIONS[step.hunt?.loc]?.enemies || []).map(e => e.name);
    if (step.hunt && !names.includes(step.hunt.name)) fail.push(`${q.id}: ${step.hunt.name} không có ở ${step.hunt.loc}`);
}));

[[10, 29], [11, 30], [12, 31]].forEach(([grade, realm]) => {
    if (G.LB_GRADE_UNLOCK_REALM[grade] !== realm) fail.push(`pháp giai ${grade} phải mở ở cảnh giới ${realm}`);
});

Object.values(G.LOCATIONS).filter(l => WORLDS_WITHOUT_LIFE.includes(l.world)).forEach(l => {
    if (l.enemies.length) fail.push(`${l.name}: không được có quái`);
    if (l.services.length || l.blackMarket) fail.push(`${l.name}: không được có dịch vụ`);
});

G.GATE_TIERS.forEach(tier => {
    const shop = G.LOCATIONS[tier.shop];
    if (shop && (!shop.services.includes('shop') || shop.minR > tier.realm - 1)) fail.push(`mốc ${tier.realm}: ${shop.name} không bán được đồ mốc`);
    if (tier.forged && !tier.pieces) return;
    const reward = q => q.reward.gateGear || q.reward.forgePieces;
    const slots = G.GATE_QUESTS.filter(q => reward(q).realm === tier.realm).flatMap(q => reward(q).slots);
    if (slots.length !== G.GEAR_SLOT_IDS.length || G.GEAR_SLOT_IDS.some(k => !slots.includes(k))) fail.push(`mốc ${tier.realm}: nhiệm vụ phụ không đủ bộ đồ`);
});

if (G.LOCATIONS.da_bao.world !== 'tien' || !G.LOCATIONS.da_bao.services.includes('shop')) fail.push('Đa Bảo Thị phải bán ở Tiên Giới');

/* ---- chỉ số phụ: bậc trên thấp nhất vẫn hơn bậc dưới cao nhất ---- */
for (const kind of Object.keys(G.GEAR_SUBS)) {
    for (let r = 10; r < 29; r++) {
        G.GEAR_QUALITIES.forEach((_, q) => {
            const top = G.gearSubFloor(kind, r, q) * G.GEAR_SUB_ROLL[1];
            if (r < 28 && G.gearSubFloor(kind, r + 1, q) <= top) fail.push(`chỉ số phụ ${kind}: cảnh ${r + 1} không hơn cảnh ${r}`);
            if (q < 4 && G.gearSubFloor(kind, r, q + 1) <= top) fail.push(`chỉ số phụ ${kind}: phẩm ${q + 1} không hơn phẩm ${q}`);
        });
    }
}

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

/* trận trung bình: mỗi ô pháp bảo ~1.3 hệ số, hồi 2.5 giây; địch nhân 0.7 sát thương, 5 cảnh đầu 0.5 */
function duel(p, tier, enemyRealm = p.r, enemyStage = p.s, scale = 1, board = 3) {
    const e = G.enemyStatsFor(enemyRealm, enemyStage, tier, scale);
    const elements = ['Kim'];
    const hit = G.computeDamage(p.atk * 1.3 * p.lb, elements, p.rootRank, p.r, p.s, e.def, elements, p.rootRank, enemyRealm, enemyStage).final;
    const back = G.computeDamage(e.str * 1.3 * (enemyRealm < 5 ? 0.5 : 0.7), elements, p.rootRank, enemyRealm, enemyStage, p.def, elements, p.rootRank, p.r, p.s).final;
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
    if (r <= 26 && duel(on, 'Boss', r + 2, s, 1, bossBoard).win) fail.push(`realm ${r}: thắng boss cao hơn 2 cảnh`);
    if (r >= 3 && r <= 14 && d.win) fail.push(`realm ${r}: không đồ vẫn thắng — đồ chưa đủ quan trọng`);
    if ([4, 12, 17, 22].includes(r) && Math.abs(on.selfShare - 0.4) > 0.05) fail.push(`realm ${r}: giữa Giới bản thể ${(on.selfShare * 100).toFixed(0)}%, cần khoảng 40%`);
}

/* nhân vật mới: chỉ có đồ khởi đầu và 3 pháp bảo phải thắng trận đầu dù linh căn kém */
function newbieAt(r, s, rootRank) {
    const base = G.baseStatsFor(r, s, rootRank);
    const kit = ['weapon', 'armor'].map(k => G.makeGearItem(0, k, 0));
    return {
        atk: base.power + kit[0].atk + kit[1].atk, def: base.defense + kit[0].def + kit[1].def, hp: base.hp + kit[0].hp + kit[1].hp,
        lb: G.LB_GRADE_POWER[G.maxLinhBaoGradeForRealm(r)], lbSlots: 3, rootRank, r, s
    };
}
for (const rootRank of [0, 3]) {
    const p = newbieAt(0, 0, rootRank);
    [['Thường', 0, 1, 3], ['Thường', 1, 1, 3], ['Tinh anh', 0, 1, 3], ['Boss', 0, 1, 4]].forEach(([tier, stage, scale, board]) => {
        const fight = duel(p, tier, 0, stage, scale, board);
        console.log(`tân thủ linh căn ${rootRank}: ${tier} kỳ ${stage} ${fight.win ? 'W' : 'L'} ${fight.tKill.toFixed(0)}s/${fight.tDie.toFixed(0)}s`);
        if (fight.tDie < fight.tKill * 1.3) fail.push(`tân thủ thua ${tier} kỳ ${stage}`);
    });
}

/* mười kẻ cảnh dưới vây một người cảnh trên, cùng tiểu kỳ và đủ đồ: người cảnh trên phải thắng */
const GANG_HITS = 55;
for (let r = 1; r < 29; r++) {
    const slots = r < 5 ? 3 : (r < 20 ? 5 : 6);
    const hi = playerAt(r, 0, r, 2, slots), lo = playerAt(r - 1, 0, r - 1, 2, slots);
    const el = ['Kim'];
    const down = G.computeDamage(hi.atk * hi.lb, el, 3, r, 0, lo.def, el, 3, r - 1, 0).final;
    const up = G.computeDamage(lo.atk * lo.lb, el, 3, r - 1, 0, hi.def, el, 3, r, 0).final;
    if (down * hi.hp <= GANG_HITS * up * lo.hp) fail.push(`realm ${r}: 10 người cảnh dưới vẫn hạ được 1 người`);
}

/* ---- giọng riêng của NPC ---- */
const VOICE_TOKENS = ['me', 'npc', 'below', 'ring', 'Ring', 'Me', 'loc', 'low', 'high'];
const voiceTokens = text => [...text.matchAll(/\{(\w+)\}/g)].map(m => m[1]).filter(t => !VOICE_TOKENS.includes(t));
const checkVoice = (who, v) => {
    ['up', 'even', 'down'].forEach(b => { if (!v[b]?.length) fail.push(`giọng ${who}: thiếu ${b}`); });
    [...v.up, ...v.even, ...v.down, ...(typeof v.area === 'string' ? [v.area] : Object.values(v.area || {}))].forEach(t => voiceTokens(t).forEach(x => fail.push(`giọng ${who}: khóa lạ {${x}}`)));
    if (!v.area) fail.push(`giọng ${who}: thiếu area`);
};
Object.entries(G.NPC_VOICES).forEach(([k, v]) => { if (!G.NPCS[k]) fail.push(`giọng ${k}: không có NPC`); checkVoice(k, v); });
G.RESIDENT_VOICES.forEach((v, i) => checkVoice(`cư dân ${i}`, v));
const NPC_TYPES = ['town', 'sect', 'wild', 'dungeon', 'gate'];
G.RESIDENT_VOICES.forEach((v, i) => NPC_TYPES.forEach(t => { if (!v.area[t]) fail.push(`giọng cư dân ${i}: thiếu area ${t}`); }));
Object.values(G.LOCATION_NPCS).flat().filter(k => !k.startsWith('dan_') && !k.startsWith('ren_') && k !== 'mac').forEach(k => {
    if (!G.NPC_VOICES[k]) fail.push(`NPC ${k} chưa có giọng riêng`);
});
const STORY_ORDER = G.MAIN_QUESTS.map(q => q.id);
function storyReachable(world, realm, doneUpTo) {
    const entry = Object.values(G.LOCATIONS).find(l => l.world === world && l.gate && G.WORLD_TIERS.findIndex(t => t.id === G.LOCATIONS[l.gate.to].world) < G.WORLD_TIERS.findIndex(t => t.id === world));
    const open = id => G.LOCATIONS[id].world === world && G.LOCATIONS[id].minR <= realm && (!G.STORY_AREA_UNLOCK[id] || STORY_ORDER.indexOf(G.STORY_AREA_UNLOCK[id]) <= doneUpTo);
    const seen = new Set([entry.id]);
    const queue = [entry.id];
    while (queue.length) G.LOCATIONS[queue.shift()].links.filter(id => open(id) && !seen.has(id)).forEach(id => { seen.add(id); queue.push(id); });
    return seen;
}
G.MAIN_QUESTS.forEach((q, i) => {
    const world = G.WORLD_TIERS.find(t => t.from <= q.needs[0] && q.needs[0] <= t.to)?.id;
    if (!G.WORLD_TIERS.find(t => t.id === world)?.release) return;
    const reach = storyReachable(world, q.needs[0], i - 1);
    G.questAllSteps(q).flatMap(s => [s.go, s.loc, s.hunt?.loc, s.gather?.loc]).filter(id => id && G.LOCATIONS[id]?.world === world).forEach(id => {
        if (!reach.has(id)) fail.push(`${q.id}: cốt truyện dẫn tới ${id} nhưng khu vực còn khóa`);
    });
});
const gioiOf = w => G.WORLD_TIERS.findIndex(t => t.id === (w === 'thien' ? 'thanh' : w));
G.MAIN_QUESTS.forEach(q => {
    const home = G.WORLD_TIERS.find(t => t.from <= q.needs[0] && q.needs[0] <= t.to)?.id;
    if (q.needs[0] >= 29) return;
    (q.needsSide || []).map(id => G.QUEST_INDEX[id]).forEach(s => {
        if (s.crossWorld) return;
        if (gioiOf(G.LOCATIONS[s.loc].world) < gioiOf(home)) fail.push(`${q.id}: chờ ${s.id} ở Giới dưới mà không có lối xuống`);
    });
});
const TRIAL_EFFECTS = ['lightning', 'fire', 'vortex', 'glow', 'ripple', 'snow', 'starfall', 'pillar', 'rings', 'chaos'];
for (let r = 1; r < G.WORLD_TIERS[G.WORLD_TIERS.length - 1].from; r++) {
    const t = G.BREAKTHROUGH_TRIALS[r];
    if (!t) { fail.push(`độ kiếp ${r}: thiếu`); continue; }
    const loc = G.LOCATIONS[t.loc];
    if (!loc) fail.push(`độ kiếp ${r}: nơi ${t.loc}`);
    else if (loc.minR > r - 1) fail.push(`độ kiếp ${r}: ${t.loc} cần cảnh giới ${loc.minR}`);
    if (!TRIAL_EFFECTS.includes(t.effect)) fail.push(`độ kiếp ${r}: hiệu ứng ${t.effect}`);
    if (!(t.minutes > 0) || !t.start || !t.done) fail.push(`độ kiếp ${r}: thiếu phút hoặc thoại`);
    const tier = loc && G.WORLD_TIERS.find(w => w.id === loc.world);
    if (tier?.release) {
        const doneUpTo = G.MAIN_QUESTS.findIndex(q => q.unlock === r);
        if (!storyReachable(loc.world, r - 1, doneUpTo).has(t.loc)) fail.push(`độ kiếp ${r}: ${t.loc} còn khóa theo cốt truyện`);
    }
}

if (fail.length) {
    console.log('\nLỖI:\n' + [...new Set(fail)].join('\n'));
    process.exit(1);
}
console.log('\nOK');
