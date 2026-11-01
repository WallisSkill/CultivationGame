/* ===========================================================
   CÂN BẰNG TOÀN GAME — mọi con số thời gian / chỉ số / trang bị
   File này không đụng DOM để scripts/simulateBalance.js chạy được.

   TRỤC THỜI GIAN
   - REALM_FIRST_MINUTES / REALM_LAST_DAYS: thời gian bế quan của cảnh giới đầu và cuối.
   - 1 giờ đời thực = 1 năm trong game (tuổi thọ), kể cả lúc đang chiến đấu.

   TRỤC SỨC MẠNH
   - refAtk(r, s): chuẩn sức mạnh của tu sĩ đủ đồ ở cảnh giới r, tiểu cảnh s.
   - realmShare(x): phần trăm sức mạnh đến từ BẢN THỂ, còn lại từ TRANG BỊ.
     Giữa mỗi Giới đồ chiếm khoảng 60%, đầu Giới nhẹ hơn, chỉ 3 cảnh giới tuyệt đỉnh mới đảo chiều, Chung Nguyên 94%.
=========================================================== */
const REALM_FIRST_MINUTES = 5;
const REALM_LAST_DAYS = 30;
const SECONDS_PER_DAY = 86400;
const STAGE_SHARE = [0.15, 0.20, 0.30, 0.35];
const REALM_COUNT = 29;
const START_AGE = 6;
const AGE_YEARS_PER_DAY = 24;

const WORLD_TIERS = [
    { id: 'pham', name: 'Phàm Giới', from: 0, to: 8, palette: ['#1d3a2c', '#2f5d3f', '#7bb26a'] },
    { id: 'tien', name: 'Tiên Giới', from: 9, to: 15, mapW: 1500, mapH: 840, palette: ['#1b2f55', '#2f5f9e', '#9fd3ff'] },
    { id: 'thanh', name: 'Thánh Vực', from: 16, to: 19, palette: ['#4a2b12', '#8a5a1e', '#ffd479'] },
    { id: 'thien', name: 'Thiên Ngoại', from: 20, to: 25, palette: ['#22123f', '#46238a', '#c7a1ff'] },
    { id: 'hondon', name: 'Hỗn Độn Hải', from: 26, to: 26, palette: ['#06242b', '#0f5661', '#5fe6e6'] },
    { id: 'hongmong', name: 'Hồng Mông', from: 27, to: 27, palette: ['#2a0b26', '#6d1a5e', '#ff8ad8'] },
    { id: 'chungnguyen', name: 'Chung Nguyên', from: 28, to: 28, palette: ['#17171c', '#3c3c46', '#f5f5f5'] }
];

function worldTierOfRealm(realm) {
    return WORLD_TIERS.find(w => realm >= w.from && realm <= w.to) || WORLD_TIERS[WORLD_TIERS.length - 1];
}

/* --------- tu vi --------- */
const ROOT_SPEED = [0.85, 0.90, 0.95, 1.00, 1.05, 1.10, 1.15, 1.20, 1.30, 1.40];

/* Luyện Khí vài phút, tăng theo cấp số nhân tới Chung Nguyên */
function realmRealSeconds(realm) {
    const first = REALM_FIRST_MINUTES * 60;
    const last = REALM_LAST_DAYS * SECONDS_PER_DAY;
    return first * Math.pow(last / first, realm / (REALM_COUNT - 1));
}

function baseXpRate(realm) {
    return 10 * Math.pow(1.6, realm);
}

function xpNeedFor(realm, stage) {
    return Math.floor(baseXpRate(realm) * realmRealSeconds(realm) * (STAGE_SHARE[stage] || STAGE_SHARE[0]));
}

function rootSpeedMult(root) {
    const elementCount = root?.elements?.length || 1;
    return (ROOT_SPEED[root?.rank || 0] || 1) * (1 + (elementCount - 1) * 0.03);
}

function cultivationRate(realm, root, qi = 1) {
    return baseXpRate(realm) * rootSpeedMult(root) * qi;
}

/* --------- chỉ số chuẩn --------- */
const SHARE_CURVE = [[0, 0.45], [4, 0.34], [8.75, 0.34], [9, 0.35], [12, 0.34], [15.75, 0.34], [16, 0.37], [17.5, 0.34], [19.75, 0.34], [20, 0.37], [22.5, 0.34], [25, 0.40], [26, 0.55], [27, 0.78], [28, 0.94]];
const HP_PER_ATK = 30;
const DEF_PER_ATK = 0.5;

function realmProgress(realm, stage = 0) {
    return realm + stage / 4;
}

function realmShare(x) {
    if (x <= SHARE_CURVE[0][0]) return SHARE_CURVE[0][1];
    for (let i = 1; i < SHARE_CURVE.length; i++) {
        const [x1, y1] = SHARE_CURVE[i];
        const [x0, y0] = SHARE_CURVE[i - 1];
        if (x <= x1) return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
    }
    return SHARE_CURVE[SHARE_CURVE.length - 1][1];
}

function refAtk(realm, stage = 0) {
    return 20 * Math.pow(2.2, realmProgress(realm, stage));
}

function refStats(realm, stage = 0) {
    const atk = refAtk(realm, stage);
    return { atk, def: atk * DEF_PER_ATK, hp: atk * HP_PER_ATK };
}

function rootStatFactor(rootRank = 0) {
    return 1 + rootRank * 0.06;
}

function baseStatsFor(realm, stage = 0, rootRank = 0) {
    const ref = refStats(realm, stage);
    const k = realmShare(realmProgress(realm, stage)) * rootStatFactor(rootRank);
    return {
        power: Math.floor(ref.atk * k),
        defense: Math.floor(ref.def * k),
        hp: Math.floor(ref.hp * k)
    };
}

/* --------- trang bị --------- */
const GEAR_SLOTS = {
    weapon: { label: 'Vũ khí', icon: '🗡️', itemType: 'weapon', atk: 0.60, def: 0.00, hp: 0.00 },
    armor: { label: 'Đạo bào', icon: '🥋', itemType: 'armor', atk: 0.00, def: 0.45, hp: 0.40 },
    helm: { label: 'Đạo quan', icon: '👑', itemType: 'armor', atk: 0.00, def: 0.20, hp: 0.25 },
    boots: { label: 'Vân hài', icon: '🥾', itemType: 'armor', atk: 0.00, def: 0.15, hp: 0.10 },
    ring: { label: 'Nhẫn', icon: '💍', itemType: 'armor', atk: 0.25, def: 0.00, hp: 0.10 },
    amulet: { label: 'Ngọc bội', icon: '📿', itemType: 'armor', atk: 0.15, def: 0.20, hp: 0.15 }
};
const GEAR_SLOT_IDS = Object.keys(GEAR_SLOTS);

const GEAR_QUALITIES = [
    { name: 'Phàm', mult: 0.60, color: '#b8c0c8', price: 4 },
    { name: 'Linh', mult: 0.80, color: '#7be4a3', price: 10 },
    { name: 'Bảo', mult: 1.00, color: '#6db8ff', price: 25 },
    { name: 'Tiên', mult: 1.25, color: '#d59bff', price: 0 },
    { name: 'Thần', mult: 1.60, color: '#ffc14d', price: 0 }
];

const GEAR_SERIES = [
    'Thanh Đồng', 'Huyền Thiết', 'Xích Kim', 'Nguyên Linh', 'Hóa Thần', 'Hư Không', 'Hợp Đạo', 'Lôi Kiếp', 'Đại Thừa',
    'Tán Tiên', 'Địa Tiên', 'Thiên Tiên', 'Chân Tiên', 'Huyền Tiên', 'Kim Tiên', 'Đế Tôn',
    'Thánh Nhân', 'Chí Thánh', 'Đại Thánh', 'Chuẩn Thiên',
    'Diệt Thiên', 'Khai Thiên', 'Toàn Thiên', 'Cực Thiên', 'Nghịch Thiên', 'Sáng Thế',
    'Hỗn Độn', 'Hồng Mông', 'Chung Nguyên'
];

function gearBudget(realm) {
    const midStage = 1.5;
    const ref = refStats(realm, midStage);
    const k = 1 - realmShare(realmProgress(realm, midStage));
    return { atk: ref.atk * k, def: ref.def * k, hp: ref.hp * k };
}

function makeGearItem(realm, slot, quality = 0) {
    const s = GEAR_SLOTS[slot];
    const q = GEAR_QUALITIES[quality];
    const b = gearBudget(realm);
    return {
        name: `${GEAR_SERIES[realm]} ${s.label} [${q.name}]`,
        type: s.itemType,
        slot,
        reqRealm: realm,
        quality,
        atk: Math.floor(b.atk * s.atk * q.mult),
        def: Math.floor(b.def * s.def * q.mult),
        hp: Math.floor(b.hp * s.hp * q.mult),
        speed: slot === 'boots' ? 0.05 + quality * 0.05 : 0,
        desc: `Yêu cầu ${GEAR_SERIES[realm]} cảnh trở lên`
    };
}

/* --------- cảnh giới rút ngắn mọi hoạt động (trừ bế quan) --------- */
const REALM_HASTE_PER_REALM = 0.05;

function realmHaste(realm) {
    return 1 + realm * REALM_HASTE_PER_REALM;
}

/* --------- hệ tu: vòng khắc chế --------- */
const DAO_PATHS = {
    kiem: { name: 'Kiếm tu', icon: '🗡️', beats: 'phap', desc: 'Sát thương +15%, đòn đơn thể +15%' },
    phap: { name: 'Pháp tu', icon: '🔮', beats: 'the', desc: 'Kỹ năng diện rộng +30%, hồi chiêu -10%' },
    the: { name: 'Thể tu', icon: '💪', beats: 'yeu', desc: 'HP +30%, phòng thủ +20%' },
    yeu: { name: 'Yêu tu', icon: '🐾', beats: 'ma', desc: 'Hồi 1% HP mỗi giây, sát thương +5%' },
    ma: { name: 'Ma tu', icon: '🩸', beats: 'kiem', desc: 'Mọi đòn hút máu 10%' }
};
const PATH_COUNTER_BONUS = 1.25;
const PATH_COUNTERED_PENALTY = 0.8;
const KIND_PATHS = { beast: 'yeu', dragon: 'yeu', demon: 'ma', golem: 'the', spirit: 'phap', chaos: 'ma' };

function pathDamageMult(attacker, defender) {
    if (!attacker || !defender) return 1;
    if (DAO_PATHS[attacker].beats === defender) return PATH_COUNTER_BONUS;
    if (DAO_PATHS[defender].beats === attacker) return PATH_COUNTERED_PENALTY;
    return 1;
}

/* --------- nâng cấp trang bị: đồ cảnh giới cao có giới hạn cao hơn, mỗi cấp tăng nhiều hơn --------- */
function gearUpgradeCap(reqRealm) {
    return 5 + reqRealm;
}

function gearUpgradeStep(reqRealm) {
    return 0.04 + reqRealm * 0.003;
}

function applyGearUpgrade(item, plus) {
    const base = item.base || { name: item.name, atk: item.atk, def: item.def, hp: item.hp };
    const k = 1 + plus * gearUpgradeStep(item.reqRealm || 0);
    return {
        base, plus,
        name: `${base.name} +${plus}`,
        atk: Math.floor(base.atk * k),
        def: Math.floor(base.def * k),
        hp: Math.floor(base.hp * k)
    };
}

/* --------- kinh tế --------- */
function goldRef(realm) {
    return Math.floor(60 * Math.pow(1.75, realm));
}

function gearPrice(realm, quality) {
    return goldRef(realm) * GEAR_QUALITIES[quality].price;
}

/* --------- lò rèn theo nơi: lò và quầy hàng chỉ phục vụ tới cảnh giới cao nhất của nơi đó, Thần lò rèn được hết Giới của nó, lò càng lớn càng dễ ra đồ tốt.
   Đồ vượt cấp mang chỉ số cảnh giới cao hơn, tối đa cảnh giới đầu của Giới kế tiếp, nhưng dùng được ngay ở cảnh giới lúc rèn --------- */
const FORGE_GRADES = [
    { name: 'Lò rèn', topChance: 0.15, overChance: 0, overRealms: 0 },
    { name: 'Danh lò', topChance: 0.30, overChance: 0.10, overRealms: 1 },
    { name: 'Thần lò', topChance: 0.50, overChance: 0.20, overRealms: 2, wholeWorld: true }
];

function forgeGradeOf(loc) {
    return FORGE_GRADES[loc.forgeGrade || 0];
}

function forgeCapAt(loc) {
    return forgeGradeOf(loc).wholeWorld ? WORLD_TIERS.find(w => w.id === loc.world).to : loc.maxR;
}

function forgeRealmAt(loc, realm) {
    return Math.min(realm, forgeCapAt(loc));
}

function serviceRealmAt(loc, realm) {
    return Math.min(realm, loc.maxR);
}

function makeForgedGear(realm, slot, gradeIndex = 0) {
    const grade = FORGE_GRADES[gradeIndex];
    const quality = Math.random() < grade.topChance ? 3 : 2;
    const over = Math.random() < grade.overChance ? 1 + Math.floor(Math.random() * grade.overRealms) : 0;
    const gearRealm = Math.min(REALM_COUNT - 1, worldTierOfRealm(realm).to + 1, realm + over);
    if (gearRealm === realm) return makeGearItem(realm, slot, quality);
    return {
        ...makeGearItem(gearRealm, slot, quality),
        name: `⚡ ${GEAR_SERIES[gearRealm]} ${GEAR_SLOTS[slot].label} [${GEAR_QUALITIES[quality].name}] vượt cấp`,
        reqRealm: realm,
        desc: `Rèn vượt ${gearRealm - realm} cảnh giới, yêu cầu ${GEAR_SERIES[realm]} cảnh trở lên`
    };
}

const MATERIAL_NAMES = {
    pham: 'Huyền Thiết Tinh', tien: 'Tiên Kim Sa', thanh: 'Thánh Ngân', thien: 'Thiên Ngoại Vẫn Thiết',
    hondon: 'Hỗn Độn Thạch', hongmong: 'Hồng Mông Tử Khí', chungnguyen: 'Chung Nguyên Tàn Quang'
};
const FORGE_MATERIAL_COST = 20;

/* Cảnh giới càng cao trong cùng giới thì rơi càng nhiều: bậc thứ k của giới nhân k lần */
function materialYield(realm, n) {
    return n * (realm - worldTierOfRealm(realm).from + 1);
}
const FORGE_HOURS = 0.05;
const XP_ITEM_MINUTES = 5;

/* --------- pháp bảo --------- */
const LB_GRADE_POWER = [1, 1.4, 1.9, 2.6, 3.5, 4.6, 6, 7.5, 9, 10, 10.8, 11.4, 12];
const LB_GRADE_UNLOCK_REALM = [0, 3, 5, 8, 12, 16, 20, 23, 25, 26, 27, 28, 28];

function maxLinhBaoGradeForRealm(realm) {
    let grade = 0;
    LB_GRADE_UNLOCK_REALM.forEach((r, g) => { if (realm >= r) grade = g; });
    return grade;
}

function expectedLinhBaoScale(realm) {
    return LB_GRADE_POWER[maxLinhBaoGradeForRealm(realm)] * 1.1;
}

/* --------- kẻ địch --------- */
const ENEMY_TIERS = {
    'Thường': { atk: 1.00, hp: 1.00, def: 1.00, xpMinutes: 8, goldMult: 1, matChance: 0.5, gearChance: 0.04 },
    'Tinh anh': { atk: 1.10, hp: 1.30, def: 1.05, xpMinutes: 20, goldMult: 3, matChance: 1, gearChance: 0.15 },
    'Thống lĩnh': { atk: 1.20, hp: 1.50, def: 1.10, xpMinutes: 45, goldMult: 8, matChance: 1, gearChance: 0.4 },
    'Boss': { atk: 1.05, hp: 1.50, def: 1.05, xpMinutes: 180, goldMult: 25, matChance: 1, gearChance: 1 }
};

function enemyStatsFor(realm, stage, tierName = 'Thường', scale = 1) {
    const tier = ENEMY_TIERS[tierName] || ENEMY_TIERS['Thường'];
    const ref = refStats(realm, stage);
    const hp = Math.floor(ref.hp * tier.hp * expectedLinhBaoScale(realm) * scale);
    return {
        str: Math.floor(ref.atk * tier.atk * scale),
        def: Math.floor(ref.def * tier.def * scale),
        hp,
        maxHp: hp,
        xpMinutes: tier.xpMinutes,
        gold: goldRef(realm) * tier.goldMult
    };
}

/* Điểm thiên kiêu của một con quái theo cảnh giới của nó: 1, 3, 10, 32, 100... */
function renownPoints(realm) {
    return Math.round(Math.pow(10, realm / 2));
}

/* Một bầy n mục tiêu: mỗi con yếu đi, tổng thể nguy hiểm hơn một con đơn lẻ */
const PACK_SCALE = { 1: { atk: 1, hp: 1 }, 2: { atk: 0.7, hp: 0.7 }, 3: { atk: 0.55, hp: 0.6 } };

/* --------- thời gian thực --------- */
function formatRealDuration(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return '—';
    const s = Math.ceil(seconds);
    const d = Math.floor(s / 86400);
    const h = Math.floor(s / 3600) % 24;
    const m = Math.floor(s / 60) % 60;
    if (d > 0) return `${d} ngày ${h} giờ`;
    if (h > 0) return `${h} giờ ${m} phút`;
    if (m > 0) return `${m} phút ${s % 60} giây`;
    return `${s} giây`;
}

if (typeof module !== 'undefined') {
    module.exports = {
        realmRealSeconds, STAGE_SHARE, REALM_COUNT, WORLD_TIERS, GEAR_SLOT_IDS, GEAR_QUALITIES, ENEMY_TIERS,
        LB_GRADE_POWER, DAO_PATHS, PACK_SCALE, pathDamageMult, xpNeedFor, baseXpRate, cultivationRate, realmShare, refStats, baseStatsFor, gearBudget,
        makeGearItem, enemyStatsFor, expectedLinhBaoScale, maxLinhBaoGradeForRealm, goldRef, gearPrice, realmProgress
    };
}
