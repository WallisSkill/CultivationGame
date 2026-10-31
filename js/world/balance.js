/* ===========================================================
   CÂN BẰNG TOÀN GAME — mọi con số thời gian / chỉ số / trang bị
   File này không đụng DOM để scripts/simulateBalance.js chạy được.

   TRỤC THỜI GIAN
   - REALM_REAL_DAYS: số ngày đời thực bế quan liên tục cho 1 đại cảnh giới.
   - 1 ngày đời thực = 1 năm trong game (tuổi thọ).

   TRỤC SỨC MẠNH
   - refAtk(r, s): chuẩn sức mạnh của tu sĩ đủ đồ ở cảnh giới r, tiểu cảnh s.
   - realmShare(x): phần trăm sức mạnh đến từ BẢN THỂ, còn lại từ TRANG BỊ.
     Hạ/trung kỳ tụt dần (đồ áp đảo), từ Thánh cảnh đảo chiều, Chung Nguyên 94%.
=========================================================== */
const REALM_REAL_DAYS = 90;
const SECONDS_PER_DAY = 86400;
const STAGE_SHARE = [0.15, 0.20, 0.30, 0.35];
const REALM_COUNT = 29;

const WORLD_TIERS = [
    { id: 'pham', name: 'Phàm Giới', from: 0, to: 8, travelScale: 0.30, palette: ['#1d3a2c', '#2f5d3f', '#7bb26a'] },
    { id: 'tien', name: 'Tiên Giới', from: 9, to: 15, travelScale: 0.40, palette: ['#1b2f55', '#2f5f9e', '#9fd3ff'] },
    { id: 'thanh', name: 'Thánh Vực', from: 16, to: 19, travelScale: 0.50, palette: ['#4a2b12', '#8a5a1e', '#ffd479'] },
    { id: 'thien', name: 'Thiên Ngoại', from: 20, to: 25, travelScale: 0.60, palette: ['#22123f', '#46238a', '#c7a1ff'] },
    { id: 'hondon', name: 'Hỗn Độn Hải', from: 26, to: 26, travelScale: 0.80, palette: ['#06242b', '#0f5661', '#5fe6e6'] },
    { id: 'hongmong', name: 'Hồng Mông', from: 27, to: 27, travelScale: 1.00, palette: ['#2a0b26', '#6d1a5e', '#ff8ad8'] },
    { id: 'chungnguyen', name: 'Chung Nguyên', from: 28, to: 28, travelScale: 1.20, palette: ['#17171c', '#3c3c46', '#f5f5f5'] }
];

function worldTierOfRealm(realm) {
    return WORLD_TIERS.find(w => realm >= w.from && realm <= w.to) || WORLD_TIERS[WORLD_TIERS.length - 1];
}

/* --------- tu vi --------- */
const ROOT_SPEED = [0.85, 0.90, 0.95, 1.00, 1.05, 1.10, 1.15, 1.20, 1.30, 1.40];

function baseXpRate(realm) {
    return 10 * Math.pow(1.6, realm);
}

function xpNeedFor(realm, stage) {
    return Math.floor(baseXpRate(realm) * REALM_REAL_DAYS * SECONDS_PER_DAY * (STAGE_SHARE[stage] || STAGE_SHARE[0]));
}

function rootSpeedMult(root) {
    const elementCount = root?.elements?.length || 1;
    return (ROOT_SPEED[root?.rank || 0] || 1) * (1 + (elementCount - 1) * 0.03);
}

function cultivationRate(realm, root, qi = 1) {
    return baseXpRate(realm) * rootSpeedMult(root) * qi;
}

/* --------- chỉ số chuẩn --------- */
const SHARE_CURVE = [[0, 0.45], [15, 0.15], [19, 0.30], [22, 0.50], [25, 0.72], [26, 0.80], [27, 0.88], [28, 0.94]];
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
    { name: 'Phàm', mult: 0.60, color: '#b8c0c8', price: 40 },
    { name: 'Linh', mult: 0.80, color: '#7be4a3', price: 90 },
    { name: 'Bảo', mult: 1.00, color: '#6db8ff', price: 160 },
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

/* --------- kinh tế --------- */
function goldRef(realm) {
    return Math.floor(60 * Math.pow(1.75, realm));
}

function gearPrice(realm, quality) {
    return goldRef(realm) * GEAR_QUALITIES[quality].price;
}

const MATERIAL_NAMES = {
    pham: 'Huyền Thiết Tinh', tien: 'Tiên Kim Sa', thanh: 'Thánh Ngân', thien: 'Thiên Ngoại Vẫn Thiết',
    hondon: 'Hỗn Độn Thạch', hongmong: 'Hồng Mông Tử Khí', chungnguyen: 'Chung Nguyên Tàn Quang'
};
const FORGE_MATERIAL_COST = 20;
const FORGE_HOURS = 2;

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
    'Thường': { atk: 0.80, hp: 0.80, def: 0.80, xpMinutes: 8, goldMult: 1, matChance: 0.5, gearChance: 0.04 },
    'Tinh anh': { atk: 0.90, hp: 1.10, def: 0.90, xpMinutes: 20, goldMult: 3, matChance: 1, gearChance: 0.15 },
    'Thống lĩnh': { atk: 1.00, hp: 1.30, def: 1.00, xpMinutes: 45, goldMult: 8, matChance: 1, gearChance: 0.4 },
    'Boss': { atk: 0.95, hp: 1.40, def: 1.00, xpMinutes: 180, goldMult: 25, matChance: 1, gearChance: 1 }
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
        REALM_REAL_DAYS, STAGE_SHARE, REALM_COUNT, WORLD_TIERS, GEAR_SLOT_IDS, GEAR_QUALITIES, ENEMY_TIERS,
        LB_GRADE_POWER, xpNeedFor, baseXpRate, cultivationRate, realmShare, refStats, baseStatsFor, gearBudget,
        makeGearItem, enemyStatsFor, expectedLinhBaoScale, maxLinhBaoGradeForRealm, goldRef, gearPrice, realmProgress
    };
}
