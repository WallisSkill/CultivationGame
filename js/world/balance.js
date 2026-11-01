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
const REALM_COUNT = 32;
const START_AGE = 6;
const BASE_LIFESPAN = 200;
const AGE_SPEND_SHARE = 0.0125;
const LEGACY_AGE_SHARE = 0.15;
const AGE_MIN_REALM_DAYS = 3;
const AGE_FLOOR_MAX_SHARE = 0.5;
const AGE_OFFLINE_MAX_SHARE = 0.9;
/* Đi đường không tính như bế quan: một phút đường tối đa chừng này năm, ở mọi cảnh giới */
const AGE_TRAVEL_YEARS_PER_MINUTE = 0.1;

const WORLD_TIERS = [
    { id: 'pham', name: 'Phàm Giới', from: 0, to: 8, palette: ['#1d3a2c', '#2f5d3f', '#7bb26a'] },
    { id: 'tien', name: 'Tiên Giới', from: 9, to: 18, mapW: 1500, mapH: 840, palette: ['#1b2f55', '#2f5f9e', '#9fd3ff'] },
    { id: 'thanh', name: 'Thánh Giới', from: 19, to: 22, palette: ['#4a2b12', '#8a5a1e', '#ffd479'] },
    { id: 'thien', name: 'Thiên Ma Ngoại Vực', from: 23, to: 28, palette: ['#22123f', '#46238a', '#c7a1ff'] },
    { id: 'hondon', name: 'Hỗn Độn Hải', from: 29, to: 29, palette: ['#06242b', '#0f5661', '#5fe6e6'] },
    { id: 'hongmong', name: 'Hồng Mông', from: 30, to: 30, palette: ['#2a0b26', '#6d1a5e', '#ff8ad8'] },
    { id: 'chungnguyen', name: 'Chung Nguyên', from: 31, to: 31, palette: ['#17171c', '#3c3c46', '#f5f5f5'] }
];

/* Cõi do người chơi tự sáng tạo sau viên mãn Hỗn Độn: không người, không quái, chỉ đi nói chuyện với bên dưới */
const EMPTY_WORLDS = ['hongmong', 'chungnguyen'];
const OVERSEER_REALM = 29;
/* Hỗn Độn Hải chỉ có Đạo Giả, không có quái để săn */
const NO_MONSTER_WORLDS = ['hondon', ...EMPTY_WORLDS];

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

/* Tuổi trôi theo thọ nguyên của cảnh giới: ở một cảnh đủ lâu tiêu một phần cố định của thọ nguyên */
function realmAgeGain(realm) {
    return Math.floor(300 * Math.pow(1.85, realm));
}

function realmLifespan(realm) {
    let years = BASE_LIFESPAN;
    for (let r = 1; r <= realm; r++) years += realmAgeGain(r);
    return years;
}

function ageYearsPerSecond(realm) {
    return realmLifespan(realm) * AGE_SPEND_SHARE / Math.max(realmRealSeconds(realm), AGE_MIN_REALM_DAYS * SECONDS_PER_DAY);
}

/* Phần tuổi bản trước đã cộng cứng khi vào cảnh giới, chỉ dùng để trả lại cho save cũ */
function legacyEntryAge(realm, maxAge) {
    let years = START_AGE;
    for (let r = 0; r < realm; r++) years += realmLifespan(r) * LEGACY_AGE_SHARE;
    return Math.min(years, maxAge * AGE_FLOOR_MAX_SHARE);
}

function travelAgeYearsPerSecond(realm) {
    return Math.min(ageYearsPerSecond(realm), AGE_TRAVEL_YEARS_PER_MINUTE / 60);
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
const SHARE_CURVE = [[0, 0.45], [4, 0.34], [8.75, 0.34], [9, 0.35], [12, 0.34], [18.75, 0.34], [19, 0.37], [20.5, 0.34], [22.75, 0.34], [23, 0.37], [25.5, 0.34], [28, 0.40], [29, 0.55], [30, 0.78], [31, 0.94]];
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

/* Mỗi đại cảnh giới gấp REALM_POWER_STEP lần; tiểu kỳ chỉ nhích nhẹ nên đột phá là một bước nhảy lớn */
const REALM_POWER_STEP = 5;
const STAGE_POWER_SHARE = 0.1;
const STAT_CURVE_VERSION = 2;
const OLD_POWER_STEP = 2.2;
const OLD_STAGE_SHARE = 0.25;
const GEAR_MID_STAGE = 1.5;

function refAtk(realm, stage = 0) {
    return 20 * Math.pow(REALM_POWER_STEP, realm + stage * STAGE_POWER_SHARE);
}

function oldRefAtk(realm, stage) {
    return 20 * Math.pow(OLD_POWER_STEP, realm + stage * OLD_STAGE_SHARE);
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
    'Tán Tiên', 'Địa Tiên', 'Thiên Tiên', 'Chân Tiên', 'Huyền Tiên', 'Kim Tiên', 'Đế Tôn', 'Lục Nguyên', 'Đại La', 'Chuẩn Thánh',
    'Thánh Nhân', 'Chí Thánh', 'Đại Thánh', 'Chuẩn Thiên',
    'Diệt Thiên', 'Khai Thiên', 'Toàn Thiên', 'Cực Thiên', 'Nghịch Thiên', 'Sáng Thế',
    'Hỗn Độn', 'Hồng Mông', 'Chung Nguyên'
];

/* Chỉ số phụ: đồ từ Địa Tiên trở lên, phẩm càng cao càng nhiều dòng, tổng mỗi loại có trần.
   Biên độ ngẫu nhiên hẹp hơn bước tăng nên giá trị thấp nhất của bậc trên luôn cao hơn giá trị cao nhất của bậc dưới */
const GEAR_SUB_REALM = 10;
const GEAR_SUB_ROLL = [1, 1.07];
const GEAR_SUB_GROWTH = 1.08;
const GEAR_SUBS = {
    crit: { label: 'Chí mạng', base: 0.02, cap: 0.6 },
    critDmg: { label: 'Sát thương chí mạng', base: 0.1, cap: 2 },
    dodge: { label: 'Né tránh', base: 0.015, cap: 0.4 },
    lifesteal: { label: 'Hút máu', base: 0.01, cap: 0.25 },
    luck: { label: 'May mắn', base: 0.01, cap: 0.3 }
};
const CRIT_BASE_MULT = 1.5;

function gearSubFloor(kind, realm, quality) {
    return GEAR_SUBS[kind].base * Math.pow(GEAR_SUB_GROWTH, realm - GEAR_SUB_REALM) * GEAR_QUALITIES[quality].mult;
}

function rollGearSubs(realm, quality, chosen = null) {
    if (realm < GEAR_SUB_REALM) return [];
    const kinds = chosen || Object.keys(GEAR_SUBS).sort(() => Math.random() - 0.5).slice(0, 1 + Math.floor(quality / 2));
    return kinds.map(kind => {
        const roll = GEAR_SUB_ROLL[0] + Math.random() * (GEAR_SUB_ROLL[1] - GEAR_SUB_ROLL[0]);
        return { kind, value: +(gearSubFloor(kind, realm, quality) * roll).toFixed(4) };
    });
}

function gearBudget(realm) {
    const midStage = GEAR_MID_STAGE;
    const ref = refStats(realm, midStage);
    const k = 1 - realmShare(realmProgress(realm, midStage));
    return { atk: ref.atk * k, def: ref.def * k, hp: ref.hp * k };
}

function makeGearItem(realm, slot, quality = 0, chosenSubs = null) {
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
        subs: rollGearSubs(realm, quality, chosenSubs),
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
    kiem: { name: 'Kiếm tu', icon: '🗡️', race: 'nhan', hanh: 'Kim', desc: 'Sát thương +15%, đòn đơn thể +15%' },
    phat: { name: 'Phật tu', icon: '🪔', race: 'nhan', hanh: 'Kim', desc: 'Phòng thủ +30%, HP +15%' },
    dan: { name: 'Đan tu', icon: '⚗️', race: 'nhan', hanh: 'Mộc', desc: 'HP +10%, hồi 0.4% HP mỗi giây' },
    phap: { name: 'Pháp tu', icon: '🔮', race: 'nhan', hanh: 'Thủy', desc: 'Kỹ năng diện rộng +30%, hồi chiêu -10%' },
    ma: { name: 'Ma tu', icon: '🩸', race: 'nhan', hanh: 'Hỏa', desc: 'Mọi đòn hút máu 10%' },
    the: { name: 'Thể tu', icon: '💪', race: 'nhan', hanh: 'Thổ', desc: 'HP +30%, phòng thủ +20%' },
    tran: { name: 'Trận tu', icon: '🧿', race: 'nhan', hanh: 'Thổ', desc: 'Kỹ năng diện rộng +20%, phòng thủ +15%' },
    yeu: { name: 'Thú tu', icon: '🐯', race: 'yeu', hanh: 'Kim', desc: 'Hồi 0.4% HP mỗi giây, sát thương +5%' },
    doc: { name: 'Xà tu', icon: '🐍', race: 'yeu', hanh: 'Mộc', desc: 'Kỹ năng diện rộng +15%, mọi đòn hút máu 5%' },
    long: { name: 'Long tu', icon: '🐲', race: 'yeu', hanh: 'Thủy', desc: 'Sát thương +10%, HP +15%' },
    cam: { name: 'Cầm tu', icon: '🦅', race: 'yeu', hanh: 'Hỏa', desc: 'Hồi chiêu -20%' },
    ho: { name: 'Hồ tu', icon: '🦊', race: 'yeu', hanh: 'Thổ', desc: 'Hồi chiêu -15%, mọi đòn hút máu 5%' }
};
const PATH_COUNTER_BONUS = 1.25;
const PATH_COUNTERED_PENALTY = 0.8;
const KIND_PATHS = { beast: 'yeu', dragon: 'long', demon: 'ma', golem: 'the', spirit: 'phap', chaos: 'ma' };

/* Ngũ hành của hệ tu: khắc tính trên đòn đánh, sinh và khắc trong cùng đội tính ở pathTeamBond */
const HANH_SINH = { 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' };
const HANH_KHAC = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };
const TEAM_SINH_ATK = 0.1;
const TEAM_KHAC_DEF = 0.05;
const TEAM_FIVE_BONUS = 0.15;
const HANH_COUNT = 5;

function pathDamageMult(attacker, defender) {
    if (!attacker || !defender) return 1;
    const own = DAO_PATHS[attacker].hanh, other = DAO_PATHS[defender].hanh;
    if (HANH_KHAC[own] === other) return PATH_COUNTER_BONUS;
    if (HANH_KHAC[other] === own) return PATH_COUNTERED_PENALTY;
    return 1;
}

function pathsOfRace(race) {
    return Object.keys(DAO_PATHS).filter(id => DAO_PATHS[id].race === race);
}

function pathTeamBond(path, teamPaths) {
    const hanh = DAO_PATHS[path].hanh;
    const others = [...teamPaths];
    others.splice(others.indexOf(path), 1);
    const otherHanh = others.map(id => DAO_PATHS[id].hanh);
    const sinh = otherHanh.some(h => HANH_SINH[h] === hanh);
    const khac = otherHanh.some(h => HANH_KHAC[h] === hanh);
    const five = new Set([hanh, ...otherHanh]).size === HANH_COUNT;
    return {
        sinh, khac, five,
        atk: 1 + (sinh ? TEAM_SINH_ATK : 0) + (five ? TEAM_FIVE_BONUS : 0),
        def: 1 - (khac ? TEAM_KHAC_DEF : 0),
        hp: 1 + (five ? TEAM_FIVE_BONUS : 0)
    };
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

/* Thần lò cho chọn loại chỉ số phụ, mỗi loại cộng thêm phí; giá trị vẫn ngẫu nhiên */
const FORGE_SUB_MAX = 3;
const FORGE_SUB_FEE = 0.5;

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

function makeForgedGear(realm, slot, gradeIndex = 0, chosenSubs = null) {
    const grade = FORGE_GRADES[gradeIndex];
    const quality = Math.random() < grade.topChance ? 3 : 2;
    const over = Math.random() < grade.overChance ? 1 + Math.floor(Math.random() * grade.overRealms) : 0;
    const gearRealm = Math.min(REALM_COUNT - 1, worldTierOfRealm(realm).to + 1, realm + over);
    if (gearRealm === realm) return makeGearItem(realm, slot, quality, chosenSubs);
    return {
        ...makeGearItem(gearRealm, slot, quality, chosenSubs),
        name: `⚡ ${GEAR_SERIES[gearRealm]} ${GEAR_SLOTS[slot].label} [${GEAR_QUALITIES[quality].name}] vượt cấp`,
        reqRealm: realm,
        desc: `Rèn vượt ${gearRealm - realm} cảnh giới, yêu cầu ${GEAR_SERIES[realm]} cảnh trở lên`
    };
}

/* Bảo vật nhiệm vụ: chỉ số của cảnh giới cao hơn nhưng yêu cầu vẫn là cảnh giới hiện tại */
function makeTreasureGear(realm, slot, quality, bonus) {
    const gearRealm = Math.min(REALM_COUNT - 1, realm + bonus);
    return {
        ...makeGearItem(gearRealm, slot, quality),
        name: `✨ ${GEAR_SERIES[gearRealm]} ${GEAR_SLOTS[slot].label} [${GEAR_QUALITIES[quality].name}] thất truyền`,
        reqRealm: realm,
        desc: `Bảo vật thất truyền, yêu cầu ${GEAR_SERIES[realm]} cảnh trở lên`
    };
}

/* Cảnh giới mốc: phải mặc đủ bộ đồ cấp đó mới đột phá được. Đồ mặc được từ cảnh giới ngay trước mốc,
   nhiệm vụ phụ cấp đủ bộ một lần, cửa hàng bán lại để không bao giờ kẹt nếu lỡ bán mất. exclusive: quầy chỉ bán bộ này */
const SAINT_REALM = 19;
const THIEN_REALM = 22;
const SAINT_SHOP_QUALITIES = [2, 1, 0];
const GATE_QUEST_QUALITY = 2;
const GATE_TIERS = [
    { realm: 9, motif: 'tien', icon: '☁️', color: '#7fd4ff', flag: 'tienGear', label: 'Tiên', title: 'Mặc đủ đồ cấp Tiên', shop: 'phi_thang' },
    { realm: SAINT_REALM, motif: 'thanh', icon: '🪷', color: '#ff9d4d', flag: 'saintGear', label: 'Thánh', title: 'Thu đủ Hồng Mông Tử Khí: mặc đủ đồ cấp Thánh', shop: 'da_bao', exclusive: true },
    { realm: THIEN_REALM, motif: 'thien', icon: '✴️', color: '#d9b8ff', flag: 'thienGear', label: 'Thiên', title: 'Mặc đủ đồ cấp Thiên', shop: 'thanh_thi', exclusive: true },
    { realm: 29, motif: 'hondon', icon: '🌀', color: '#5fe6e6', flag: 'hondonGear', label: 'Hỗn Độn', title: 'Mặc đủ đồ cấp Hỗn Độn', shop: 'vo_cuong' },
    { realm: 30, motif: 'hongmong', icon: '🌸', color: '#ffb3e6', flag: 'hongmongGear', label: 'Hồng Mông', title: 'Mặc đủ đồ cấp Hồng Mông', shop: 'dao_gia_am' },
    { realm: 31, motif: 'chungnguyen', icon: '⚪', color: '#f5f5f5', flag: 'chungnguyenGear', label: 'Chung Nguyên', title: 'Mặc đủ đồ cấp Chung Nguyên', shop: 'co_thu' }
];

function gateTierOf(realm) {
    return GATE_TIERS.find(t => t.realm === realm) || null;
}

/* Cấp thật của một món đọc từ tên: đồ vượt cấp và đồ thất truyền vẫn mang tên cấp của chúng; đồ không theo bộ trả về -1 */
function gearSeriesRealm(item) {
    const name = String(item.name || '').replace(/^[⚡✨]\s*/u, '');
    return GEAR_SERIES.findIndex(series => name.startsWith(`${series} `));
}

/* Bậc mốc cao nhất mà món đồ đạt tới, dùng để vẽ họa tiết riêng */
function gearGateTier(item) {
    const realm = gearSeriesRealm(item);
    return GATE_TIERS.filter(t => t.realm <= realm).pop() || null;
}

function makeGateGear(tier, slot, quality) {
    const reqRealm = tier.realm - 1;
    return { ...makeGearItem(tier.realm, slot, quality), reqRealm, [tier.flag]: true, desc: `Đồ cấp ${tier.label}, yêu cầu ${GEAR_SERIES[reqRealm]} cảnh trở lên` };
}

const MATERIAL_NAMES = {
    pham: 'Huyền Thiết Tinh', tien: 'Tiên Kim Sa', thanh: 'Thánh Ngân', thien: 'Cực Đạo Vẫn Thiết',
    hondon: 'Hỗn Độn Thạch', hongmong: 'Hồng Mông Tử Khí', chungnguyen: 'Chung Nguyên Tàn Quang'
};
const FORGE_MATERIAL_COST = 20;

/* Cảnh giới càng cao trong cùng giới thì rơi càng nhiều: bậc thứ k của giới nhân k lần */
function materialYield(realm, n) {
    return n * (realm - worldTierOfRealm(realm).from + 1);
}
const FORGE_HOURS = 0.05;
const XP_ITEM_MINUTES = 5;
const SAINT_XP_PILLS = [
    { id: 'pill_thanh_1h', name: 'Thánh Nguyên Đan', minutes: 60 },
    { id: 'pill_thanh_2h', name: 'Đại Thánh Nguyên Đan', minutes: 120 }
];
const XP_PILL_PRICE_PER_MINUTE = 12;
const STACK_TYPES = ['xp', 'consumable', 'power', 'defense', 'life', 'luck'];

/* --------- pháp bảo --------- */
const LB_GRADE_POWER = [1, 1.4, 1.9, 2.6, 3.5, 4.6, 6, 7.5, 9, 10, 10.8, 11.4, 12];
const LB_GRADE_UNLOCK_REALM = [0, 3, 5, 8, 12, 16, 20, 23, 25, 26, 29, 30, 31];

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

/* Mới vào đạo chưa có đồ: quái ba cảnh giới đầu yếu hơn mức chuẩn */
const NEWBIE_ENEMY_SCALE = [0.5, 0.7, 0.85];

function enemyStatsFor(realm, stage, tierName = 'Thường', baseScale = 1) {
    const tier = ENEMY_TIERS[tierName] || ENEMY_TIERS['Thường'];
    const ref = refStats(realm, stage);
    const scale = baseScale * (NEWBIE_ENEMY_SCALE[realm] ?? 1);
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
        LB_GRADE_POWER, DAO_PATHS, PACK_SCALE, pathDamageMult, pathTeamBond, pathsOfRace, xpNeedFor, baseXpRate, cultivationRate, realmShare, refStats, baseStatsFor, gearBudget,
        makeGearItem, enemyStatsFor, expectedLinhBaoScale, maxLinhBaoGradeForRealm, LB_GRADE_UNLOCK_REALM, goldRef, gearPrice, realmProgress
    };
}
