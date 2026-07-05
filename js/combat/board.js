/* ============================================================
   BOARD AUTO-BATTLE ("Đấu Pháp Bảo Trận") — Bazaar-style PvE
   - Linh bảo (spirit artifacts) sit on a board and auto-fire on
     their own cooldown during a real-time duel. Each artifact can
     carry MULTIPLE effects.
   - Grades (giai): Phàm → Hoàng → Huyền → Địa → Thiên → Tiên Pháp.
     At Tiên Pháp (top grade) it further levels up to Lv.100.
   - Reuses computeDamage (ngũ hành / phẩm chất / cảnh giới) and
     the existing winBattle / loseBattle reward handlers.
   - PvP is untouched (still handled by fight.js).
   ============================================================ */

/* ---------- element presentation ---------- */
const LB_ELEMENT_COLORS = {
    'Kim': '#d4af37', 'Mộc': '#4caf50', 'Thủy': '#2196f3',
    'Hỏa': '#f44336', 'Thổ': '#b8860b'
};

/* ---------- grade (giai) system ----------
   Grades above Tiên Pháp are legendary/mythic tiers:
   Chí Tôn → Đế → Chuẩn Thánh → Thánh → Hỗn Độn → Hồng Mông → Chung Nguyên
   Each tier has progressively higher max levels and requires much more effort to reach.
--------------------------------------------------------------- */
const LB_GRADE_NAMES = [
    'Phàm Giai', 'Hoàng Giai', 'Huyền Giai', 'Địa Giai', 'Thiên Giai', 'Tiên Pháp',
    'Chí Tôn Pháp', 'Đế Pháp', 'Chuẩn Thánh Pháp', 'Thánh Pháp', 'Hỗn Độn Pháp', 'Hồng Mông Pháp', 'Chung Nguyên Pháp'
];
const LB_GRADE_COLORS = [
    '#9e9e9e', '#8bc34a', '#4fc3f7', '#ba68c8', '#ffb300', '#ff4081',  // original 6
    '#ff1744',   // Chí Tôn Pháp - crimson red
    '#d500f9',   // Đế Pháp - imperial purple
    '#00bcd4',   // Chuẩn Thánh Pháp - divine cyan
    '#ffd700',   // Thánh Pháp - sacred gold
    '#e040fb',   // Hỗn Độn Pháp - chaos magenta
    '#7c4dff',   // Hồng Mông Pháp - primordial violet
    '#ffffff'    // Chung Nguyên Pháp - absolute white (ultimate)
];
const LB_MAX_GRADE = 12;   // index of Chung Nguyên Pháp (the ultimate grade)
const LB_MAX_LEVEL = 1200; // Chung Nguyên Pháp caps at 1200
// Level caps: each tier requires much more cultivation to reach max
// Progressive difficulty: the higher the grade, the more levels needed and harder to advance
const LB_GRADE_MAX_LEVEL = [10, 20, 35, 50, 70, 100, 150, 220, 320, 450, 620, 850, 1200];
// Upgrade cost multiplier increases exponentially for higher grades
const LB_GRADE_COST_MULT = [1, 1.2, 1.5, 2, 2.8, 4, 6, 9, 14, 22, 35, 55, 90];
const LB_BOARD_SLOTS = 6;

// Helper to get effective board slots (can be increased to 9 by Đạo Tổ)
function getEffectiveBoardSlots() {
    return state.maxBoardSlots || LB_BOARD_SLOTS;
}

/* ---------- gems (khảm ngọc) ---------- */
const LB_GEM_KINDS = {
    power: { icon: '💠', label: 'Lực Ngọc', color: '#ff7043', desc: 'Tăng uy lực pháp bảo' },
    haste: { icon: '🌀', label: 'Tốc Ngọc', color: '#4dd0e1', desc: 'Giảm thời gian hồi chiêu' },
    leech: { icon: '🩸', label: 'Hấp Ngọc', color: '#ef5350', desc: 'Thêm hút máu khi khai hỏa' },
    guard: { icon: '🔰', label: 'Hộ Ngọc', color: '#81c784', desc: 'Thêm đỡ gạt khi khai hỏa' }
};

/* ---------- action metadata (icon + label) ---------- */
const LB_ACTIONS = {
    damage: { icon: '⚔️', label: 'Sát thương' },
    burn: { icon: '🔥', label: 'Thiêu đốt' },
    heal: { icon: '🌿', label: 'Hồi phục' },
    shield: { icon: '🛡️', label: 'Hộ thuẫn' },
    freeze: { icon: '❄️', label: 'Đóng băng' },
    buffAtk: { icon: '⬆️', label: 'Tăng công' },
    lifesteal: { icon: '🩸', label: 'Hút máu' },
    parry: { icon: '🛡', label: 'Đỡ gạt' },
    stun: { icon: '💫', label: 'Choáng' }
};

/* ---------- Linh bảo catalog ----------
   Each linh bảo has an `effects` array. magnitude meaning per action:
     damage    -> ATK multiplier
     burn      -> burn DPS = ATK * magnitude (lasts LB_BURN_SECS)
     heal      -> heals magnitude * maxHp
     shield    -> absorbs magnitude * maxHp
     freeze    -> duration (s) slowing the target board
     buffAtk   -> +magnitude (fraction) ATK each fire (compounding)
     lifesteal -> heal magnitude * damage dealt this fire
     parry     -> block fraction of the next incoming hit
     stun      -> stun duration (s); has LB_STUN_CHANCE to land
--------------------------------------------------------------- */
const LINH_BAO = [
    { id: 'phi_kiem', name: 'Phi Kiếm Quyết', element: 'Kim', cooldown: 1.6, cost: 260, effects: [{ action: 'damage', magnitude: 0.9 }], desc: 'Ngự kiếm liên miên, ra đòn cực nhanh.' },
    { id: 'loi_dinh', name: 'Lôi Đình Phù', element: 'Kim', cooldown: 3.0, cost: 520, effects: [{ action: 'damage', magnitude: 2.0 }, { action: 'stun', magnitude: 0.9 }], desc: 'Sấm sét giáng xuống, có thể làm choáng địch.' },
    { id: 'liet_hoa', name: 'Liệt Hỏa Châu', element: 'Hỏa', cooldown: 2.5, cost: 420, effects: [{ action: 'burn', magnitude: 0.55 }], desc: 'Gieo hỏa diễm thiêu đốt địch theo thời gian.' },
    { id: 'huyet_sat', name: 'Huyết Sát Đao', element: 'Hỏa', cooldown: 2.2, cost: 460, effects: [{ action: 'damage', magnitude: 1.4 }, { action: 'lifesteal', magnitude: 0.3 }], desc: 'Đao khí hút máu địch để hồi phục.' },
    { id: 'cuong_phong', name: 'Cuồng Phong Kiếm', element: 'Mộc', cooldown: 2.0, cost: 380, effects: [{ action: 'damage', magnitude: 1.3 }], desc: 'Kiếm phong như bão, tần suất tốt.' },
    { id: 'thanh_moc', name: 'Thanh Mộc Đan', element: 'Mộc', cooldown: 3.0, cost: 400, effects: [{ action: 'heal', magnitude: 0.10 }], desc: 'Sinh cơ mộc linh, hồi phục khí huyết.' },
    { id: 'huyen_bang', name: 'Huyền Băng Kính', element: 'Thủy', cooldown: 4.0, cost: 560, effects: [{ action: 'freeze', magnitude: 2.0 }, { action: 'damage', magnitude: 0.6 }], desc: 'Băng phong trấn địch, làm chậm pháp bảo đối phương.' },
    { id: 'hau_tho', name: 'Hậu Thổ Thuẫn', element: 'Thổ', cooldown: 3.5, cost: 440, effects: [{ action: 'shield', magnitude: 0.16 }, { action: 'parry', magnitude: 0.5 }], desc: 'Đất dày sinh thuẫn, đỡ gạt đòn kế tiếp.' },
    { id: 'kim_cang', name: 'Kim Cang Trử', element: 'Kim', cooldown: 3.0, cost: 480, effects: [{ action: 'buffAtk', magnitude: 0.08 }], desc: 'Luyện thể kim cang, càng đánh càng mạnh.' },
    { id: 'tu_linh', name: 'Tụ Linh Trận', element: 'Thổ', cooldown: 4.0, cost: 500, effects: [{ action: 'heal', magnitude: 0.12 }, { action: 'shield', magnitude: 0.10 }], desc: 'Tụ linh khí thiên địa, vừa hồi vừa hộ thân.' },
    { id: 'cuu_u', name: 'Cửu U Hấp Hồn Kỳ', element: 'Thủy', cooldown: 2.6, cost: 620, effects: [{ action: 'damage', magnitude: 1.2 }, { action: 'lifesteal', magnitude: 0.4 }], desc: 'Cờ hồn hút sinh lực địch nuôi bản thân.' },
    { id: 'phan_thien', name: 'Phần Thiên Diễm Hỏa', element: 'Hỏa', cooldown: 2.4, cost: 640, effects: [{ action: 'damage', magnitude: 1.0 }, { action: 'burn', magnitude: 0.4 }], desc: 'Ngọn lửa vừa chém vừa thiêu.' },
    { id: 'thai_at', name: 'Thái Ất Hộ Sinh', element: 'Mộc', cooldown: 3.2, cost: 600, effects: [{ action: 'heal', magnitude: 0.09 }, { action: 'buffAtk', magnitude: 0.05 }], desc: 'Vừa dưỡng sinh vừa tăng đạo lực.' },
    { id: 'vo_cuc', name: 'Vô Cực Kiếm Vực', element: 'Kim', cooldown: 3.4, cost: 760, effects: [{ action: 'damage', magnitude: 1.6 }, { action: 'freeze', magnitude: 1.2 }], desc: 'Kiếm vực phong tỏa, chém kèm đóng băng.' },
    { id: 'huyen_vu', name: 'Huyền Vũ Thánh Giáp', element: 'Thổ', cooldown: 4.2, cost: 820, effects: [{ action: 'shield', magnitude: 0.2 }, { action: 'parry', magnitude: 0.7 }, { action: 'heal', magnitude: 0.06 }], desc: 'Thánh giáp Huyền Vũ, phòng ngự tuyệt đối.' },
    { id: 'huyet_ma', name: 'Huyết Ma Đại Pháp', element: 'Hỏa', cooldown: 2.8, cost: 880, effects: [{ action: 'damage', magnitude: 1.3 }, { action: 'lifesteal', magnitude: 0.25 }, { action: 'burn', magnitude: 0.3 }], desc: 'Ma công tà đạo: chém, hút máu và thiêu đốt.' },
    { id: 'can_khon', name: 'Thần Thông · Càn Khôn Nhất Kích', element: 'Mộc', cooldown: 3.8, cost: 1200, effects: [{ action: 'damage', magnitude: 2.4 }, { action: 'stun', magnitude: 1.0 }], desc: 'Một kích chấn động càn khôn, uy lực kinh người.' },
    { id: 'hon_don', name: 'Thần Thông · Hỗn Độn Thôn Thiên', element: 'Thủy', cooldown: 4.5, cost: 1500, effects: [{ action: 'damage', magnitude: 2.0 }, { action: 'lifesteal', magnitude: 0.5 }, { action: 'freeze', magnitude: 1.5 }], desc: 'Nuốt trọn thiên địa, hút máu và phong ấn địch.' }
];
const LINH_BAO_MAP = LINH_BAO.reduce((m, x) => (m[x.id] = x, m), {});

/* fallback "bare-hands" artifact so a player with an empty board can still fight */
const LB_DEFAULT_ATTACK = { id: '_basic', name: 'Chân Khí Kích', element: 'Kim', cooldown: 2.2, grade: 0, level: 1, effects: [{ action: 'damage', magnitude: 1.0 }], desc: 'Ngưng tụ chân khí đánh ra.' };

const LB_TICK_MS = 100;
const LB_BURN_SECS = 4;
const LB_FREEZE_SLOW = 0.35; // frozen board advances at 35% speed
const LB_MAX_SECONDS = 90;   // safety cap so a stalemate cannot run forever
const LB_ENEMY_DMG_SCALE = 0.7; // enemies fire many items — dial their hits down
const LB_STUN_CHANCE = 0.5;  // chance a stun effect lands
const LB_STUN_IMMUNE = 2.0;  // seconds a target is immune after a stun (no perma-stun)
const LB_PARRY_SECS = 3.5;   // how long a parry charge lingers

function lbClamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/* ---------- grade / level maths ---------- */
function lbGradeOf(item) { return lbClamp(item.grade != null ? item.grade : (item.tier || 0), 0, LB_MAX_GRADE); }
function lbMaxLevelFor(grade) { return LB_GRADE_MAX_LEVEL[lbClamp(grade, 0, LB_MAX_GRADE)]; }
function lbLevelOf(item) { return lbClamp(item.level || 1, 1, lbMaxLevelFor(lbGradeOf(item))); }
function lbIsMaxed(item) { return lbGradeOf(item) >= LB_MAX_GRADE && lbLevelOf(item) >= LB_MAX_LEVEL; }

// combat power multiplier from grade + level (every grade levels now)
// Higher grades get exponentially better scaling
function lbPowerScale(item) {
    const g = lbGradeOf(item), lvl = lbLevelOf(item);
    // Base scales: 1, 1.6, 2.2, 2.8, 3.5, 4.2, 5.0, 6.0, 7.2, 8.5, 10.0, 12.0, 14.5
    const baseTable = [1, 1.6, 2.2, 2.8, 3.5, 4.2, 5.0, 6.2, 7.8, 9.8, 12.5, 16.0, 21.0];
    const base = baseTable[lbClamp(g, 0, 12)] || (1 + g * 1.2);
    // Step also scales better for higher grades
    const stepTable = [0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.20];
    const step = stepTable[lbClamp(g, 0, 12)] || 0.15;
    return base * (1 + (lvl - 1) * step);
}
// gentler scale for durations (freeze / stun)
function lbDurScale(item) {
    const g = lbGradeOf(item), lvl = lbLevelOf(item);
    // Higher grades also extend effect durations more
    const base = (1 + g * 0.15) * (1 + g * 0.03); // slightly increasing
    return base * (1 + (lvl - 1) * 0.008);
}
function lbEffCooldown(item) {
    const g = lbGradeOf(item), lvl = lbLevelOf(item);
    // Cooldown reduction: grade gives flat reduction (capped), level gives small reduction
    // Max reduction from grade alone is 45% (at grade 9+), plus up to 40% from levels
    const gradeReduction = Math.min(0.45, g * 0.05);
    const levelReduction = Math.min(0.40, (lvl - 1) * 0.0008);
    let cd = (item.cooldown || 2.5) * (1 - gradeReduction - levelReduction);
    cd *= lbGemMods(item).cdMul;
    // Minimum cooldown scales slightly with base cooldown to prevent instant attacks
    return Math.max(0.25, cd);
}
function lbEffMag(baseMag, item) { return baseMag * lbPowerScale(item) * lbGemMods(item).powerMul; }
function lbDurMag(baseMag, item) { return baseMag * lbDurScale(item); }

/* ---------- gem helpers ---------- */
// Socket count increases with grade: 1,1,2,2,3,3, 4,4,5,5,6,6,7
function lbSockets(item) {
    const g = lbGradeOf(item);
    if (g <= 5) return [1, 1, 2, 2, 3, 3][g];
    // Higher grades get more sockets
    return Math.min(7, 3 + Math.floor((g - 5) * 0.8) + 1);
}
function lbGemMods(item) {
    let power = 0, haste = 0, leech = 0, guard = 0;
    (item.gems || []).forEach(g => {
        if (g.gemKind === 'power') power += g.magnitude;
        else if (g.gemKind === 'haste') haste += g.magnitude;
        else if (g.gemKind === 'leech') leech += g.magnitude;
        else if (g.gemKind === 'guard') guard += g.magnitude;
    });
    return { powerMul: 1 + power, cdMul: Math.max(0.4, 1 - haste), leech, guard };
}
function lbGemMagnitude(kind, tier) {
    const t = Math.max(0, tier || 0);
    switch (kind) {
        case 'power': return +(0.15 + t * 0.1).toFixed(3);
        case 'haste': return +(0.08 + t * 0.05).toFixed(3);
        case 'leech': return +(0.10 + t * 0.05).toFixed(3);
        case 'guard': return +(0.15 + t * 0.08).toFixed(3);
        default: return 0.1;
    }
}
function makeGem(kind, tier = 0) {
    const def = LB_GEM_KINDS[kind];
    if (!def) return null;
    const tierName = ['Thô', 'Tinh', 'Hoàn Mỹ', 'Cực Phẩm'][Math.min(3, tier)] || 'Thô';
    const gem = {
        name: `${def.label} (${tierName})`, type: 'gem', gemKind: kind,
        magnitude: lbGemMagnitude(kind, tier), tier, desc: def.desc
    };
    ensureItemUid(gem);
    return gem;
}
if (typeof window !== 'undefined') window.makeGem = makeGem;

function lbEffectList(item) {
    if (item && Array.isArray(item.effects)) return item.effects;
    const def = item ? LINH_BAO_MAP[item.linhBaoId || item.id] : null;
    if (def && Array.isArray(def.effects)) return def.effects;
    // legacy single-action fallback
    const action = item?.action || def?.action || 'damage';
    const magnitude = item?.magnitude ?? def?.magnitude ?? 1;
    return [{ action, magnitude }];
}
function lbItemIcon(item) {
    const e = lbEffectList(item)[0];
    return (e && LB_ACTIONS[e.action] ? LB_ACTIONS[e.action].icon : '⚜️');
}
function lbEffectIcons(item) {
    return lbEffectList(item).map(e => LB_ACTIONS[e.action] ? LB_ACTIONS[e.action].icon : '❔').join('');
}
function lbEffectSummary(item) {
    return lbEffectList(item).map(e => LB_ACTIONS[e.action] ? LB_ACTIONS[e.action].label : e.action).join(' + ');
}
// Icons for legendary grades (6-12)
const LB_GRADE_ICONS = ['', '', '', '', '', '',
    '⚔️',  // Chí Tôn Pháp
    '👑',  // Đế Pháp
    '⭐',  // Chuẩn Thánh Pháp
    '✨',  // Thánh Pháp
    '🌀',  // Hỗn Độn Pháp
    '🌌',  // Hồng Mông Pháp
    '🏆'   // Chung Nguyên Pháp
];

function lbGradeLabel(item) {
    const g = lbGradeOf(item);
    const icon = LB_GRADE_ICONS[g] || '';
    const name = LB_GRADE_NAMES[g] || `Giai ${g}`;
    const lvl = lbLevelOf(item);
    const col = LB_GRADE_COLORS[g] || '#fff';
    const isLegendary = g >= 6;
    const glowStyle = isLegendary ? `text-shadow: 0 0 8px ${col};` : '';
    return `<span style="color:${col};${glowStyle}">${icon} ${name} Lv.${lvl}</span>`;
}
function lbGradePlain(item) {
    const g = lbGradeOf(item);
    const icon = LB_GRADE_ICONS[g] || '';
    const name = LB_GRADE_NAMES[g] || `Giai ${g}`;
    return `${icon} ${name} Lv.${lbLevelOf(item)}`;
}
function lbGemIcons(item) {
    const n = lbSockets(item);
    const gems = item.gems || [];
    let s = '';
    for (let i = 0; i < n; i++) {
        const g = gems[i];
        s += g && LB_GEM_KINDS[g.gemKind] ? LB_GEM_KINDS[g.gemKind].icon : '◦';
    }
    return s;
}
if (typeof window !== 'undefined') {
    Object.assign(window, { lbGradeOf, lbLevelOf, lbMaxLevelFor, lbIsMaxed, lbEffCooldown, lbGradeLabel, lbGradePlain, lbEffectIcons, lbEffectSummary, lbItemIcon, lbSockets, lbGemMods, lbGemIcons });
}

/* ---------- item / board state helpers ---------- */
let _lbUidSeq = 1;
function ensureItemUid(item) {
    if (!item.uid) item.uid = `lb_${Date.now().toString(36)}_${(_lbUidSeq++).toString(36)}`;
    return item.uid;
}

// Build a fresh inventory linh-bảo item from a catalog id at a given grade/level.
function makeLinhBao(id, grade = 0, level = 1) {
    const base = LINH_BAO_MAP[id];
    if (!base) return null;
    const it = {
        name: base.name, type: 'linhbao', linhBaoId: id,
        element: base.element, cooldown: base.cooldown,
        effects: JSON.parse(JSON.stringify(base.effects)),
        grade: lbClamp(grade, 0, LB_MAX_GRADE),
        level: lbClamp(level, 1, LB_MAX_LEVEL),
        gems: [],
        cost: base.cost, desc: base.desc
    };
    ensureItemUid(it);
    return it;
}
if (typeof window !== 'undefined') window.makeLinhBao = makeLinhBao;

function ensureBoardState() {
    if (!Array.isArray(state.board)) state.board = [];
    const maxSlots = getEffectiveBoardSlots();
    while (state.board.length < maxSlots) state.board.push(null);
    if (state.board.length > maxSlots) state.board = state.board.slice(0, maxSlots);
    (state.inventory || []).forEach(it => {
        if (it && it.type === 'linhbao') {
            ensureItemUid(it);
            if (it.grade == null) it.grade = it.tier || 0; // migrate old tier -> grade
            if (it.level == null) it.level = 1;
            if (!Array.isArray(it.gems)) it.gems = [];
        }
        if (it && it.type === 'gem') ensureItemUid(it);
    });
    state.board = state.board.map(uid => {
        if (!uid) return null;
        const found = (state.inventory || []).find(it => it && it.uid === uid);
        return found ? uid : null;
    });
}
if (typeof window !== 'undefined') window.ensureBoardState = ensureBoardState;

function boardItems() {
    ensureBoardState();
    return state.board.map(uid => uid ? state.inventory.find(it => it && it.uid === uid) : null);
}

function placeOnBoard(inventoryIndex) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể sắp trận.'); return; }
    ensureBoardState();
    const it = state.inventory[inventoryIndex];
    if (!it || it.type !== 'linhbao') return;
    ensureItemUid(it);
    if (state.board.includes(it.uid)) { log(`⚠️ ${it.name} đã ở trên trận.`); return; }
    const slot = state.board.indexOf(null);
    if (slot < 0) { log('⚠️ Trận pháp đã đầy (6 ô). Gỡ bớt linh bảo trước.'); return; }
    state.board[slot] = it.uid;
    log(`⚜️ Đặt ${it.name} vào ô ${slot + 1} của trận pháp.`);
    renderAll();
}
if (typeof window !== 'undefined') window.placeOnBoard = placeOnBoard;

function removeFromBoard(slot) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể sắp trận.'); return; }
    ensureBoardState();
    if (slot < 0 || slot >= getEffectiveBoardSlots()) return;
    const uid = state.board[slot];
    if (!uid) return;
    const it = state.inventory.find(x => x && x.uid === uid);
    state.board[slot] = null;
    if (it) log(`↩️ Gỡ ${it.name} khỏi trận pháp.`);
    renderAll();
}
if (typeof window !== 'undefined') window.removeFromBoard = removeFromBoard;

/* ---------- reward drops (kỳ ngộ / Thánh Nhân) ---------- */
function grantLinhBaoDrop(opts = {}) {
    if (typeof LINH_BAO === 'undefined' || typeof addItemToInventory !== 'function') return null;
    const realm = state.realmIndex || 0;
    let grade = lbClamp(Math.floor(realm / 5) + (opts.gradeBonus || 0), 0, LB_MAX_GRADE);
    if (Math.random() < 0.2) grade = Math.min(LB_MAX_GRADE, grade + 1); // lucky bump
    let level = 1;
    if (grade >= LB_MAX_GRADE) level = lbClamp(1 + Math.floor(Math.random() * Math.max(1, (realm - 24) * 4)), 1, LB_MAX_LEVEL);
    const def = opts.id ? LINH_BAO_MAP[opts.id] : LINH_BAO[Math.floor(Math.random() * LINH_BAO.length)];
    if (!def) return null;
    const lb = makeLinhBao(def.id, grade, level);
    if (!lb) return null;
    addItemToInventory(lb);
    log(`🎴 ${opts.source || 'Kỳ ngộ'} — nhận Trận Pháp Bảo ${lb.name} [${lbGradePlain(lb)}]!`);
    return lb;
}
if (typeof window !== 'undefined') window.grantLinhBaoDrop = grantLinhBaoDrop;

// Saints grant a higher-grade linh bảo so you get a head start.
window.addEventListener('load', () => {
    if (window.__lbSaintHooked) return;
    window.__lbSaintHooked = true;
    const orig = window.callSaintOnTalk;
    if (typeof orig === 'function') {
        window.callSaintOnTalk = function (saint, opts) {
            const r = orig.apply(this, arguments);
            try {
                if (r !== false && Math.random() < 0.5) grantLinhBaoDrop({ source: `Thánh Nhân ${saint?.name || ''}`.trim(), gradeBonus: 2 });
                if (r !== false && Math.random() < 0.4) grantGemDrop({ source: 'Thánh Nhân', tierBonus: 1 });
            } catch { }
            return r;
        };
    }
});

function grantGemDrop(opts = {}) {
    if (typeof makeGem !== 'function' || typeof addItemToInventory !== 'function') return null;
    const realm = state.realmIndex || 0;
    const tier = lbClamp(Math.floor(realm / 7) + (opts.tierBonus || 0) + (Math.random() < 0.2 ? 1 : 0), 0, 3);
    const kinds = Object.keys(LB_GEM_KINDS);
    const kind = opts.kind || kinds[Math.floor(Math.random() * kinds.length)];
    const gem = makeGem(kind, tier);
    if (!gem) return null;
    addItemToInventory(gem);
    log(`💎 ${opts.source || 'Kỳ ngộ'} — nhận linh ngọc ${gem.name}!`);
    return gem;
}
if (typeof window !== 'undefined') window.grantGemDrop = grantGemDrop;

/* ---------- Starting Linh Bảo based on Linh căn ---------- */
// Grant starting Trận Pháp Bảo based on player's Linh căn
// Higher tier Linh căn = better chance, better grade, more matching elements
function grantStartingLinhBao() {
    if (typeof LINH_BAO === 'undefined' || typeof makeLinhBao !== 'function' || typeof addItemToInventory !== 'function') return [];

    const playerElements = state.root?.elements || [];
    const playerRank = state.root?.rank || 0;
    const elemCount = playerElements.length;

    // Calculate Linh căn tier (0-7) based on element count and rank
    // Higher tier = better Linh Bảo rewards
    let tier = 0;
    if (elemCount >= 5 && playerRank >= 9) tier = 7;      // Hỗn Độn Ngũ Linh Căn - best
    else if (elemCount >= 5 || playerRank >= 9) tier = 6; // Ngũ Linh Căn or Hỗn Độn
    else if (elemCount >= 4 || playerRank >= 7) tier = 5;  // Tứ Linh Căn or Thánh
    else if (elemCount >= 3 || playerRank >= 5) tier = 4;  // Tam Linh Căn or Địa
    else if (elemCount >= 2 || playerRank >= 3) tier = 3;  // Song Linh Căn or Huyền
    else if (elemCount >= 1 || playerRank >= 1) tier = 2;  // Nhất Linh Căn or Hoàng
    else tier = 1; // Phế Linh Căn

    // Tier configuration: [baseChance, minGrade, maxGrade, numToGive]
    const tierConfig = {
        1: { chance: 0.35, minGrade: 0, maxGrade: 1, count: 1 },
        2: { chance: 0.50, minGrade: 0, maxGrade: 2, count: 1 },
        3: { chance: 0.65, minGrade: 1, maxGrade: 2, count: 1 },
        4: { chance: 0.75, minGrade: 1, maxGrade: 3, count: 2 },
        5: { chance: 0.85, minGrade: 2, maxGrade: 4, count: 2 },
        6: { chance: 0.92, minGrade: 2, maxGrade: 5, count: 2 },
        7: { chance: 1.00, minGrade: 3, maxGrade: 6, count: 3 }
    };
    const cfg = tierConfig[tier] || tierConfig[1];

    // Element-matching pools: prefer Linh Bảo with player's elements
    // If player has no elements, all Linh Bảo are equally available
    const matchingElements = playerElements.length > 0 ? playerElements : null;

    const granted = [];

    // Determine how many Linh Bảo to try granting
    const maxAttempts = cfg.count + (tier >= 5 ? 1 : 0); // Extra attempt for higher tiers

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Check if we get a Linh Bảo this attempt
        if (Math.random() >= cfg.chance) continue;

        // Select a Linh Bảo - prefer matching elements
        let candidates = LINH_BAO;
        if (matchingElements) {
            const matching = LINH_BAO.filter(lb => matchingElements.includes(lb.element));
            const nonMatching = LINH_BAO.filter(lb => !matchingElements.includes(lb.element));
            // 70% chance to pick matching element if available
            if (matching.length > 0 && Math.random() < 0.7) {
                candidates = matching;
            } else if (nonMatching.length > 0) {
                candidates = nonMatching;
            }
        }

        if (candidates.length === 0) continue;
        const def = candidates[Math.floor(Math.random() * candidates.length)];

        // Determine grade - higher tier = higher grades possible
        let grade = cfg.minGrade + Math.floor(Math.random() * (cfg.maxGrade - cfg.minGrade + 1));
        // Small chance for bonus grade
        if (Math.random() < 0.15 + tier * 0.05) {
            grade = Math.min(LB_MAX_GRADE, grade + 1);
        }
        grade = lbClamp(grade, 0, LB_MAX_GRADE);

        // Create and give the Linh Bảo
        const lb = makeLinhBao(def.id, grade, 1);
        if (lb) {
            addItemToInventory(lb);
            granted.push(lb);

            // Log the acquisition with tier info
            const tierName = ['Phế', 'Hạ', 'Trung', 'Thượng', 'Tiên', 'Thánh', 'Đế'][Math.min(6, tier)] || 'Phế';
            const elemInfo = matchingElements ? ` [${matchingElements.join(', ')}]` : '';
            const gradeColor = LB_GRADE_COLORS[grade] || '#fff';
            log(`🎴 Khởi nghiệp Trận Pháp Bảo — ${lb.name} <span style="color:${gradeColor}">[${LB_GRADE_NAMES[grade]}]</span> (Linh căn ${tierName}${elemInfo})!`);
        }
    }

    return granted;
}
if (typeof window !== 'undefined') window.grantStartingLinhBao = grantStartingLinhBao;

/* ---------- gem socketing ---------- */
function attachGem(gemInvIndex, linhBaoUid) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể khảm ngọc.'); return; }
    const gem = state.inventory[gemInvIndex];
    if (!gem || gem.type !== 'gem') { log('Không phải linh ngọc.'); return; }
    const lb = state.inventory.find(x => x && x.uid === linhBaoUid && x.type === 'linhbao');
    if (!lb) { log('Không tìm thấy pháp bảo.'); return; }
    if (!Array.isArray(lb.gems)) lb.gems = [];
    if (lb.gems.length >= lbSockets(lb)) { log(`⚠️ ${lb.name} đã đầy ổ ngọc (${lbSockets(lb)}).`); return; }
    lb.gems.push({ name: gem.name, gemKind: gem.gemKind, magnitude: gem.magnitude, tier: gem.tier });
    state.inventory.splice(gemInvIndex, 1);
    log(`💎 Khảm ${gem.name} vào ${lb.name}.`);
    closeGemModal();
    renderAll();
}
if (typeof window !== 'undefined') window.attachGem = attachGem;

function detachGems(linhBaoUid) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể tháo ngọc.'); return; }
    const lb = state.inventory.find(x => x && x.uid === linhBaoUid && x.type === 'linhbao');
    if (!lb || !Array.isArray(lb.gems) || !lb.gems.length) return;
    lb.gems.forEach(g => {
        const gem = { name: g.name, type: 'gem', gemKind: g.gemKind, magnitude: g.magnitude, tier: g.tier };
        ensureItemUid(gem);
        state.inventory.push(gem);
    });
    const n = lb.gems.length;
    lb.gems = [];
    log(`⛏️ Tháo ${n} linh ngọc khỏi ${lb.name}.`);
    renderAll();
}
if (typeof window !== 'undefined') window.detachGems = detachGems;

/* ===========================
   GEM FUSION SYSTEM
   - 2 gems of same tier & kind → 1 gem of next tier
   - Max tier: Cực Phẩm (tier 3)
=========================== */
const GEM_FUSION_NAMES = ['Thô', 'Tinh', 'Hoàn Mỹ', 'Cực Phẩm'];

function fuseGem(gem1Idx, gem2Idx) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể hợp nhất ngọc.'); return; }
    const gem1 = state.inventory[gem1Idx];
    const gem2 = state.inventory[gem2Idx];
    if (!gem1 || !gem2 || gem1.type !== 'gem' || gem2.type !== 'gem') {
        log('⚠️ Vật phẩm không hợp lệ.'); return;
    }
    if (gem1.gemKind !== gem2.gemKind) {
        log('⚠️ Hai linh ngọc phải cùng loại để hợp nhất.'); return;
    }
    if (gem1.tier !== gem2.tier) {
        log('⚠️ Hai linh ngọc phải cùng cấp để hợp nhất.'); return;
    }
    if (gem1.tier >= 3) {
        log('⚠️ Linh ngọc đã đạt cấp tối đa, không thể hợp nhất.'); return;
    }
    const newTier = gem1.tier + 1;
    const newMagnitude = Math.min(1.0, (gem1.magnitude || 0.1) * 1.15); // 15% increase, cap at 1.0
    const gemDef = LB_GEM_KINDS[gem1.gemKind] || { label: 'Linh Ngọc' };
    const newName = `${gemDef.label} ${GEM_FUSION_NAMES[newTier]}`;
    const newGem = {
        name: newName,
        type: 'gem',
        gemKind: gem1.gemKind,
        magnitude: newMagnitude,
        tier: newTier,
        desc: `Linh ngọc ${GEM_FUSION_NAMES[newTier]} - +${(newMagnitude * 100).toFixed(0)}% ${gemDef.desc || 'Tăng sức'}`
    };
    ensureItemUid(newGem);
    // Remove both gems (remove higher index first to avoid shifting issues)
    const [idx1, idx2] = gem1Idx < gem2Idx ? [gem1Idx, gem2Idx] : [gem2Idx, gem1Idx];
    state.inventory.splice(idx1, 1);
    state.inventory.splice(idx2 - 1, 1); // idx2-1 because idx1 was already removed
    state.inventory.push(newGem);
    log(`🔥 Hợp nhất thành công: ${newName}!`);
    closeGemFusionModal();
    renderAll();
}
if (typeof window !== 'undefined') window.fuseGem = fuseGem;

function closeGemFusionModal() {
    const m = document.getElementById('gemFusionModal');
    if (m) m.style.display = 'none';
    selectedGemForFusion = null;
    highlightFusableGems([]);
}

let selectedGemForFusion = null;

function highlightFusableGems(gem1Idx) {
    // Highlight gems that can be fused with the selected gem
    const allGems = document.querySelectorAll('.gem-fusion-item');
    allGems.forEach((el, idx) => {
        const gem = window.__gemFusionCache?.[idx];
        if (!gem || idx === gem1Idx) {
            el.style.opacity = '1';
            return;
        }
        const selected = window.__gemFusionCache?.[gem1Idx];
        if (selected && selected.gemKind === gem.gemKind && selected.tier === gem.tier && selected.tier < 3) {
            el.style.opacity = '1';
            el.style.boxShadow = '0 0 8px rgba(255, 215, 0, 0.6)';
        } else {
            el.style.opacity = '0.5';
            el.style.boxShadow = 'none';
        }
    });
}

function openGemFusionModal() {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể hợp nhất ngọc.'); return; }
    ensureBoardState();
    let modal = document.getElementById('gemFusionModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gemFusionModal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:none;align-items:center;justify-content:center;z-index:10000;';
        document.body.appendChild(modal);
    }

    const gems = state.inventory.filter(x => x && x.type === 'gem');
    // Cache gems for reference
    window.__gemFusionCache = gems;

    const gemRows = gems.map((gem, i) => {
        const gemDef = LB_GEM_KINDS[gem.gemKind] || { icon: '💎', label: 'Linh Ngọc', color: '#888' };
        const tierName = GEM_FUSION_NAMES[gem.tier] || 'Thô';
        const magnitude = ((gem.magnitude || 0.1) * 100).toFixed(0);
        return `<div class="gem-fusion-item" onclick="selectGemForFusion(${i})" style="
            display:flex;align-items:center;padding:10px 12px;margin-bottom:8px;
            border-radius:8px;background:rgba(255,255,255,0.05);cursor:pointer;
            transition:all 0.2s;">
            <span style="font-size:1.4em;margin-right:10px;color:${gemDef.color}">${gemDef.icon}</span>
            <div style="flex:1">
                <b style="color:${gemDef.color}">${gem.name || gemDef.label}</b>
                <div class="small">${tierName} · +${magnitude}% ${gemDef.desc || ''}</div>
            </div>
            <span class="small" style="color:#888">${gem.tier >= 3 ? 'MAX' : '🟢 Có thể hợp nhất'}</span>
        </div>`;
    }).join('') || '<div class="small">Chưa có linh ngọc nào để hợp nhất.</div>';

    modal.innerHTML = `<div style="background:#0f1724;border-radius:12px;max-width:500px;width:90%;padding:18px;box-shadow:0 10px 40px rgba(0,0,0,0.6);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="color:#ffd700;font-weight:600;">🔥 Hợp nhất Linh Ngọc</div>
            <button onclick="closeGemFusionModal()" style="border:0;background:transparent;color:#f87171;font-size:20px;cursor:pointer;">✕</button>
        </div>
        <div class="small" style="color:#9fb3c8;margin-top:6px;">
            Chọn 2 linh ngọc cùng loại và cùng cấp để hợp nhất thành cấp cao hơn.
        </div>
        <div style="margin-top:14px;max-height:420px;overflow:auto;" id="gemFusionList">
            ${gemRows}
        </div>
    </div>`;

    // Add hover effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .gem-fusion-item:hover { background: rgba(255,255,255,0.1) !important; }
        .gem-fusion-selected { background: rgba(255, 215, 0, 0.2) !important; border: 1px solid rgba(255, 215, 0, 0.5); }
    `;
    modal.appendChild(style);

    modal.style.display = 'flex';
}
if (typeof window !== 'undefined') window.openGemFusionModal = openGemFusionModal;

function selectGemForFusion(idx) {
    const gems = window.__gemFusionCache;
    if (!gems || !gems[idx]) return;

    if (selectedGemForFusion === null) {
        selectedGemForFusion = idx;
        // Highlight this gem
        const items = document.querySelectorAll('.gem-fusion-item');
        items.forEach((el, i) => {
            el.classList.remove('gem-fusion-selected');
            if (i === idx) el.classList.add('gem-fusion-selected');
        });
        // Highlight fusable gems
        highlightFusableGems(idx);
    } else {
        // Second gem selected - try to fuse
        if (selectedGemForFusion === idx) {
            // Deselect
            selectedGemForFusion = null;
            const items = document.querySelectorAll('.gem-fusion-item');
            items.forEach(el => {
                el.classList.remove('gem-fusion-selected');
                el.style.opacity = '1';
                el.style.boxShadow = 'none';
            });
        } else {
            // Attempt fusion
            fuseGem(selectedGemForFusion, idx);
        }
    }
}
if (typeof window !== 'undefined') window.selectGemForFusion = selectGemForFusion;

/* modal to pick which linh bảo receives a gem */
function closeGemModal() { const m = document.getElementById('lbGemModal'); if (m) m.style.display = 'none'; }
function openGemSocketModal(gemInvIndex) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể khảm ngọc.'); return; }
    const gem = state.inventory[gemInvIndex];
    if (!gem || gem.type !== 'gem') return;
    ensureBoardState();
    let modal = document.getElementById('lbGemModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lbGemModal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:none;align-items:center;justify-content:center;z-index:10000;';
        document.body.appendChild(modal);
    }
    const owned = state.inventory.filter(x => x && x.type === 'linhbao' && state.board && state.board.includes(x.uid));
    const rows = owned.map(lb => {
        const free = lbSockets(lb) - (lb.gems ? lb.gems.length : 0);
        const disabled = free <= 0;
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;margin-bottom:8px;border-radius:8px;background:rgba(255,255,255,0.05);">
            <div>${lbEffectIcons(lb)} <b>${lb.name}</b> <span class="small">(${lbGradePlain(lb)}) · ổ ${lb.gems ? lb.gems.length : 0}/${lbSockets(lb)}</span></div>
            <button ${disabled ? 'disabled style="opacity:.5"' : `onclick="attachGem(${gemInvIndex},'${lb.uid}')"`}>Khảm</button>
        </div>`;
    }).join('') || '<div class="small">Chưa có pháp bảo để khảm ngọc.</div>';
    modal.innerHTML = `<div style="background:#0f1724;border-radius:12px;max-width:520px;width:90%;padding:18px;box-shadow:0 10px 40px rgba(0,0,0,0.6);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="color:#a6ffd1;font-weight:600;">Khảm ${gem.name} vào pháp bảo nào?</div>
            <button onclick="closeGemModal()" style="border:0;background:transparent;color:#f87171;font-size:20px;cursor:pointer;">✕</button>
        </div>
        <div style="margin-top:14px;max-height:420px;overflow:auto;">${rows}</div>
    </div>`;
    modal.style.display = 'flex';
}
if (typeof window !== 'undefined') window.openGemSocketModal = openGemSocketModal;

/* ---------- skill reward catalog for battle ---------- */
const LB_SKILL_REWARDS = [
    { skillId: 'dragon_roar', name: '🐉 Long Nha Phá Thiên', desc: '250% ATK, CD 3 round', color: '#ff6b6b' },
    { skillId: 'crimson_edge', name: '🔪 Huyết Nguyệt Trảm', desc: '300% ATK + 20% lifesteal', color: '#c92a2a' },
    { skillId: 'lotus_rebirth', name: '🌸 Liên Tâm Hồi Mệnh', desc: 'Hồi 40% HP, +15% DEF 2 round', color: '#f783ac' },
    { skillId: 'thuong_thanh_tram', name: '⚡ Thượng Thanh Trảm Pháp', desc: '550% ATK, CD 2, +15% DEF', color: '#ffd43b' },
    { skillId: 'thong_thien_van_kiem', name: '🌪️ Thông Thiên Vạn Kiếm', desc: '300% ATK + 15% HP, CD 3, +20% ATK', color: '#74c0fc' },
    { skillId: 'nguyen_thuy_hon_don', name: '🌌 Nguyên Thủy Hỗn Độn', desc: '450% ATK + 12% HP + 40% lifesteal', color: '#9775fa' },
    { skillId: 'tay_du_ky_dai', name: '⚔️ Tay Du Kỳ Đại', desc: '350% ATK x2 lần, CD 4', color: '#ffa94d' },
    { skillId: 'than_tuc_vo_su', name: '🔥 Thần Túc Vô Sư', desc: '400% ATK, hút 50% sát thương', color: '#ff922b' }
];

// Skill tier display names (1st = tier 0, 2nd = tier 1, etc.)
const LB_SKILL_TIER_NAMES = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

// Fusion cost: how many skills of tier N needed to create 1 of tier N+1
// Formula: tier 0→1 = 2, 1→2 = 9, 2→3 = 36, 3→4 = 100, 4→5 = 225, etc.
// Growing exponentially to make higher tier skills very rare
const LB_SKILL_FUSION_COST = [2, 9, 36, 100, 225, 441, 784];

// Get skill by skillId - uses LB_SKILL_REWARDS for display info (name, desc, color)
// but ensures the skill exists in SKILL_LIBRARY so it can be learned
function getSkillRewardById(skillId) {
    // First try LB_SKILL_REWARDS (has display info like color, desc)
    const fromRewards = LB_SKILL_REWARDS.find(s => s.skillId === skillId);
    if (fromRewards) return fromRewards;

    // Fall back to SKILL_LIBRARY (has core skill definition)
    // This ensures skills that exist in SKILL_LIBRARY but not in LB_SKILL_REWARDS can still be used
    const fromLibrary = SKILL_LIBRARY[skillId];
    if (fromLibrary) {
        return {
            skillId: fromLibrary.id,
            name: fromLibrary.name,
            desc: fromLibrary.description,
            color: '#9775fa' // default purple for skills from library
        };
    }

    return null;
}

// Calculate how many skills needed to fuse from one tier to next
function getSkillFusionCost(fromTier) {
    if (fromTier < 0 || fromTier >= LB_SKILL_FUSION_COST.length) return Infinity;
    return LB_SKILL_FUSION_COST[fromTier];
}

// Check if a skill can be used for fusion
function canSkillFuse(item) {
    if (!item || item.type !== 'manual') return false;
    if (item.fusionLocked) return false; // already at max tier
    // If maxFusionTier is set, check if we can still ascend
    if (item.maxFusionTier != null && item.skillTier >= item.maxFusionTier) return false;
    return true;
}

// Count how many skills of a specific tier the player has that can be fused
function countSkillsByTier(tier) {
    if (!Array.isArray(state.inventory)) return 0;
    return state.inventory.filter(it => {
        if (!it || it.type !== 'manual') return false;
        if ((it.skillTier || 0) !== tier) return false;
        return canSkillFuse(it);
    }).length;
}

// Create a skill item for inventory
function createSkillItem(skillId, skillTier = 0, options = {}) {
    const reward = getSkillRewardById(skillId);
    if (!reward) return null;
    return {
        name: reward.name,
        skillId: skillId,
        type: 'manual',
        skillTier: skillTier,
        tierName: LB_SKILL_TIER_NAMES[skillTier] || `${skillTier + 1}th`,
        // Skills from fusion have a limit - can only ascend one more tier
        maxFusionTier: options.fromFusion ? (skillTier + 1) : null,
        element: reward.element || null,
        desc: options.upgradedDesc || reward.desc,
        color: reward.color,
        isFusionSkill: !!options.fromFusion
    };
}

// Fuse skills of a specific tier to create one of the next tier
// Returns the new skill item, or null if not enough skills
function fuseSkillOfTier(fromTier) {
    const cost = getSkillFusionCost(fromTier);
    if (cost === Infinity) {
        log('🔒 Đã đạt cấp tối đa, không thể hợp nhất thêm.');
        return null;
    }

    const available = countSkillsByTier(fromTier);
    if (available < cost) {
        log(`⚠️ Cần ${cost} bí kíp ${LB_SKILL_TIER_NAMES[fromTier]} để hợp nhất thành ${LB_SKILL_TIER_NAMES[fromTier + 1]}, nhưng chỉ có ${available}.`);
        return null;
    }

    // Find and remove skills to consume (only skills that can fuse)
    const skillsToRemove = [];
    let removed = 0;
    for (let i = 0; i < state.inventory.length && removed < cost; i++) {
        const it = state.inventory[i];
        if (it && it.type === 'manual' && (it.skillTier || 0) === fromTier && canSkillFuse(it)) {
            skillsToRemove.push(i);
            removed++;
        }
    }

    if (removed < cost) {
        log(`⚠️ Không đủ bí kíp để hợp nhất.`);
        return null;
    }

    // Remove consumed skills (reverse order to preserve indices)
    skillsToRemove.sort((a, b) => b - a).forEach(idx => {
        state.inventory.splice(idx, 1);
    });

    // Randomly pick a skill from the rewards catalog
    // Skills from fusion have higher chance to be upgraded versions
    // Only pick skills that exist in SKILL_LIBRARY (single source of truth for learnable skills)
    const isUpgraded = Math.random() < 0.4; // 40% chance for upgraded version
    const learnableSkills = LB_SKILL_REWARDS.filter(s => SKILL_LIBRARY[s.skillId]);

    // Safety check: if no learnable skills, return early
    if (learnableSkills.length === 0) {
        log(`⚠️ Không có bí kíp nào có thể hợp nhất!`);
        return null;
    }

    const baseSkill = learnableSkills[Math.floor(Math.random() * learnableSkills.length)];

    let newSkillId = baseSkill.skillId;
    let newDesc = baseSkill.desc;
    let newColor = baseSkill.color;

    // Create upgraded description for higher tier skills
    // ALL fusions get upgraded (even tier 0→1), stronger bonuses for higher tiers
    // 40% chance for LUCKY upgrade (extra 20% bonus)
    const tierMultiplier = isUpgraded
        ? 1 + (fromTier + 1) * 0.35 + 0.2  // Lucky: 35% + 20% extra = 55% per tier
        : 1 + (fromTier + 1) * 0.35;        // Normal: 35% per tier
    const tierName = LB_SKILL_TIER_NAMES[fromTier + 1] || `${fromTier + 2}th`;
    newDesc = `[${tierName} Cấp] ${baseSkill.desc} (+${Math.floor((tierMultiplier - 1) * 100)}% mạnh hơn)`;
    newColor = getHigherTierColor(baseSkill.color, fromTier + 1);

    // NEW SKILL: Skills from fusion can only ascend ONE more tier
    const newSkill = createSkillItem(newSkillId, fromTier + 1, {
        fromFusion: true, // Mark as fusion-created (limited to one more tier)
        upgradedDesc: newDesc
    });

    log(`🌀 Hợp nhất ${cost} bí kíp ${LB_SKILL_TIER_NAMES[fromTier]} thành công!`);
    log(`✨ Nhận được: ${newSkill.name} [${newSkill.tierName} Cấp]!`);
    if (isUpgraded) {
        log(`🌟 May mắn! Đây là bí kíp được tăng cấp!`);
    }
    log(`⚠️ Bí kíp này chỉ có thể hợp nhất tối đa 1 lần nữa.`);

    return newSkill;
}

// Helper to get a visually higher-tier color
function getHigherTierColor(baseColor, tier) {
    const tierColors = [
        '#ff6b6b', // tier 0 - red
        '#ffa94d', // tier 1 - orange
        '#ffd43b', // tier 2 - yellow
        '#69db7c', // tier 3 - green
        '#4dabf7', // tier 4 - blue
        '#da77f2', // tier 5 - purple
        '#ff922b', // tier 6 - gold (legendary)
        '#fff'     // tier 7+ - white
    ];
    return tierColors[Math.min(tier, tierColors.length - 1)] || baseColor;
}

// Open skill fusion modal UI
function openSkillFusionModal() {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể hợp nhất.'); return; }

    let modal = document.getElementById('skillFusionModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'skillFusionModal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:none;align-items:center;justify-content:center;z-index:10050;';
        document.body.appendChild(modal);
    }

    const maxTier = LB_SKILL_FUSION_COST.length - 1;
    const rows = [];

    for (let tier = 0; tier <= maxTier; tier++) {
        const cost = LB_SKILL_FUSION_COST[tier];
        const available = countSkillsByTier(tier);
        const canFuse = available >= cost;
        const tierName = LB_SKILL_TIER_NAMES[tier] || `${tier + 1}th`;
        const nextTierName = LB_SKILL_TIER_NAMES[tier + 1] || `${tier + 2}th`;

        const buttonDisabled = !canFuse ? 'disabled style="opacity:0.5"' : `onclick="doSkillFusion(${tier})"`;

        rows.push(`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;margin-bottom:10px;border-radius:8px;background:rgba(255,255,255,0.05);border-left:3px solid ${canFuse ? '#4ade80' : '#666'};">
                <div>
                    <div style="font-weight:600;color:${canFuse ? '#4ade80' : '#888'}">${tierName} → ${nextTierName}</div>
                    <div class="small">Cần ${cost} bí kíp · Có ${available} trong túi</div>
                    ${available < cost ? `<div class="small" style="color:#f87171;">Thiếu ${cost - available} bí kíp</div>` : ''}
                </div>
                <button ${buttonDisabled}>🔥 Hợp nhất</button>
            </div>
        `);
    }

    // Also show fusion-limited skills info
    const fusionLimitedSkills = state.inventory.filter(it => it && it.type === 'manual' && it.fusionLimited && it.fusionCount === 0);
    let limitedInfo = '';
    if (fusionLimitedSkills.length > 0) {
        limitedInfo = `
            <div style="margin-top:16px;padding:10px;background:rgba(255,152,0,0.1);border-radius:8px;">
                <div style="color:#ffa94d;font-weight:600;">⚠️ Bí kíp giới hạn hợp nhất (${fusionLimitedSkills.length})</div>
                <div class="small" style="color:#888;">Những bí kíp này chỉ có thể hợp nhất 1 lần cuối trước khi khóa vĩnh viễn.</div>
                <div class="small" style="margin-top:4px;">
                    ${fusionLimitedSkills.slice(0, 5).map(s => `${s.name} [${s.tierName}]`).join(', ')}${fusionLimitedSkills.length > 5 ? '...' : ''}
                </div>
            </div>
        `;
    }

    modal.innerHTML = `
        <div style="background:#0f1724;border-radius:14px;max-width:520px;width:90%;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,0.6);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                <div style="color:#ffa94d;font-weight:700;font-size:1.1em;">🌀 Hợp Nhất Bí Kíp</div>
                <button onclick="closeSkillFusionModal()" style="border:0;background:transparent;color:#f87171;font-size:20px;cursor:pointer;">✕</button>
            </div>
            <div class="small" style="color:#888;margin-bottom:12px;">Hợp nhất ${maxTier + 1} bí kíp cùng cấp để tạo bí kíp cấp cao hơn. Bí kíp hợp nhất chỉ có thể nâng cấp 1 lần nữa!</div>
            ${rows.join('')}
            ${limitedInfo}
        </div>
    `;
    modal.style.display = 'flex';
}
if (typeof window !== 'undefined') window.openSkillFusionModal = openSkillFusionModal;

function closeSkillFusionModal() {
    const m = document.getElementById('skillFusionModal');
    if (m) m.style.display = 'none';
}

// Execute skill fusion for a specific tier
function doSkillFusion(tier) {
    const newSkill = fuseSkillOfTier(tier);
    if (newSkill) {
        addItemToInventory(newSkill);
        // Mark the new skill as having been through one fusion
        newSkill.fusionCount = 1;
        // If it's fusion-limited, mark it as locked after this one use
        if (newSkill.fusionLimited) {
            // Actually, fusionLimited means it CAN fuse one more time, so we need to track count
        }
    }
    closeSkillFusionModal();
    renderAll();
}
if (typeof window !== 'undefined') window.doSkillFusion = doSkillFusion;

/* ---------- victory reward choice ---------- */
function _lbRewardPool() {
    const kinds = Object.keys(LB_GEM_KINDS);
    const realm = state.realmIndex || 0;
    const tier = lbClamp(Math.floor(realm / 7), 0, 3);
    const opts = [];

    // Determine what categories to include
    const roll = Math.random();
    const useSkills = roll < 0.3; // 30% chance for skill reward option

    if (useSkills) {
        // 2 gems + 1 skill choice
        const shuffled = kinds.slice().sort(() => Math.random() - 0.5);
        opts.push({ kind: 'gem', gemKind: shuffled[0], tier: lbClamp(tier + (Math.random() < 0.3 ? 1 : 0), 0, 3) });
        opts.push({ kind: 'gem', gemKind: shuffled[1], tier: lbClamp(tier + (Math.random() < 0.3 ? 1 : 0), 0, 3) });
        // Only pick skills that exist in SKILL_LIBRARY (single source of truth for learnable skills)
        // This ensures all skill rewards can be learned
        const learnableSkills = LB_SKILL_REWARDS.filter(s => SKILL_LIBRARY[s.skillId]);
        if (learnableSkills.length > 0) {
            const skill = learnableSkills[Math.floor(Math.random() * learnableSkills.length)];
            opts.push({ kind: 'skill', skillId: skill.skillId, skill });
        }
    } else {
        // 2 gems + 1 linhbao (classic)
        const shuffled = kinds.slice().sort(() => Math.random() - 0.5);
        for (let i = 0; i < 2; i++) {
            const kind = shuffled[i % shuffled.length];
            const t = lbClamp(tier + (Math.random() < 0.3 ? 1 : 0), 0, 3);
            opts.push({ kind: 'gem', gemKind: kind, tier: t });
        }
        if (Math.random() < 0.5) {
            const def = LINH_BAO[Math.floor(Math.random() * LINH_BAO.length)];
            opts.push({ kind: 'linhbao', id: def.id, grade: lbClamp(Math.floor(realm / 5), 0, LB_MAX_GRADE) });
        } else {
            // Instead of linhbao, give another gem of different kind
            const kind = shuffled[2 % shuffled.length];
            const t = lbClamp(tier + (Math.random() < 0.3 ? 1 : 0), 0, 3);
            opts.push({ kind: 'gem', gemKind: kind, tier: t });
        }
    }
    return opts;
}
function closeRewardModal() { const m = document.getElementById('lbRewardModal'); if (m) m.style.display = 'none'; }
function pickBattleReward(i) {
    const opts = window.__lbRewardOpts || [];
    const o = opts[i];
    if (!o) return;
    if (o.kind === 'gem') {
        const g = makeGem(o.gemKind, o.tier);
        if (g) { addItemToInventory(g); log(`🎁 Chọn phần thưởng: ${g.name}.`); }
    } else if (o.kind === 'linhbao') {
        const lb = makeLinhBao(o.id, o.grade, 1);
        if (lb) { addItemToInventory(lb); log(`🎁 Chọn phần thưởng: ${lb.name} [${lbGradePlain(lb)}].`); }
    } else if (o.kind === 'skill') {
        addItemToInventory({
            name: o.skill.name,
            type: 'manual',
            skillId: o.skill.skillId,
            desc: o.skill.desc
        });
        log(`🎁 Chọn phần thưởng: ${o.skill.name}!`);
    }
    window.__lbRewardOpts = null;
    closeRewardModal();
    renderAll();
}
if (typeof window !== 'undefined') window.pickBattleReward = pickBattleReward;
function showBoardRewardChoice() {
    const opts = _lbRewardPool();
    window.__lbRewardOpts = opts;
    let modal = document.getElementById('lbRewardModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lbRewardModal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.72);display:none;align-items:center;justify-content:center;z-index:10001;';
        document.body.appendChild(modal);
    }
    const cards = opts.map((o, i) => {
        if (o.kind === 'gem') {
            const def = LB_GEM_KINDS[o.gemKind];
            const mag = lbGemMagnitude(o.gemKind, o.tier);
            const tierName = ['Thô', 'Tinh', 'Hoàn Mỹ', 'Cực Phẩm'][o.tier] || 'Thô';
            return `<div class="lb-reward-card" onclick="pickBattleReward(${i})" style="border-color:${def.color}">
                <div style="font-size:1.8em">${def.icon}</div>
                <div style="font-weight:700;color:${def.color}">${def.label}</div>
                <div class="small">${tierName} · +${(mag * 100).toFixed(0)}%</div>
                <div class="small">${def.desc}</div>
            </div>`;
        }
        if (o.kind === 'skill') {
            const s = o.skill;
            return `<div class="lb-reward-card" onclick="pickBattleReward(${i})" style="border-color:${s.color}">
                <div style="font-size:1.4em">📜</div>
                <div style="font-weight:700;color:${s.color}">${s.name}</div>
                <div class="small">${s.desc}</div>
                <div class="small" style="color:#aaa;margin-top:4px;">Bí kíp chiến đấu</div>
            </div>`;
        }
        const def = LINH_BAO_MAP[o.id];
        const col = LB_ELEMENT_COLORS[def.element] || '#a6ffd1';
        return `<div class="lb-reward-card" onclick="pickBattleReward(${i})" style="border-color:${col}">
            <div style="font-size:1.4em">${lbEffectIcons({ ...def, grade: o.grade })}</div>
            <div style="font-weight:700;color:${col}">${def.name}</div>
            <div class="small">${LB_GRADE_NAMES[o.grade]}</div>
            <div class="small">${lbEffectSummary({ ...def })}</div>
        </div>`;
    }).join('');
    modal.innerHTML = `<div style="background:#0f1724;border-radius:14px;max-width:640px;width:92%;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,0.6);">
        <div style="color:#ffd166;font-weight:700;font-size:1.1em;margin-bottom:4px;">🏆 Chiến lợi phẩm — chọn 1 phần thưởng</div>
        <div class="small" style="margin-bottom:14px;">Đạo hữu lập công, thiên địa ban thưởng. Hãy chọn một.</div>
        <div class="lb-reward-grid">${cards}</div>
    </div>`;
    modal.style.display = 'flex';
}
if (typeof window !== 'undefined') window.showBoardRewardChoice = showBoardRewardChoice;

/* ---------- enemy board generator ---------- */
function buildEnemyBoard(enemy) {
    const realm = enemy.realmIndex || 0;
    const grade = lbClamp(Math.floor(realm / 5), 0, LB_MAX_GRADE);
    const gradeMax = lbMaxLevelFor(grade);

    // Level scaling for enemies:
    // Grades 0-5 (Phàm to Tiên Pháp): level = 1 (basic tiers)
    // Grades 6-12 (Chí Tôn to Chung Nguyên): level scales within the grade's max
    // Higher grades = more powerful enemies with higher level linhbao
    let level;
    if (grade <= 5) {
        level = 1;
    } else {
        // Each grade covers 5 realm levels, scale level within grade's max
        const realmOffset = realm - (grade * 5);
        level = lbClamp(1 + Math.floor(realmOffset * (gradeMax / 8)), 1, gradeMax);
    }

    const count = Math.max(2, Math.min(5, 2 + Math.floor(realm / 6)));
    const enemyEls = enemy.elements || [];

    const pool = LINH_BAO.map(def => ({
        def,
        w: (enemyEls.includes(def.element) ? 3 : 1) *
            (def.effects.some(e => e.action === 'damage' || e.action === 'burn') ? 1.4 : 1)
    }));

    const chosen = [];
    const offensive = pool.filter(p => p.def.effects.some(e => e.action === 'damage' || e.action === 'burn'));
    if (offensive.length) chosen.push(lbWeightedPick(offensive).def);
    while (chosen.length < count) {
        chosen.push(lbWeightedPick(pool).def);
        if (chosen.length > 12) break;
    }
    return chosen.map(def => ({ ...def, grade, level }));
}
function lbWeightedPick(list) {
    const total = list.reduce((a, b) => a + b.w, 0);
    let r = Math.random() * total;
    for (const item of list) { r -= item.w; if (r <= 0) return item; }
    return list[list.length - 1];
}

/* ---------- combatant construction ---------- */
function lbMakeSlot(def) {
    return { def, cooldown: lbEffCooldown(def), elapsed: 0, fillNode: null, tileNode: null };
}
function lbBaseCombatant() {
    return { shield: 0, burns: [], freezeUntil: 0, stunUntil: 0, stunImmuneUntil: 0, parryFrac: 0, parryUntil: 0 };
}

/* ---------- Linh Bảo element interaction helper ----------
   - If source's Linh căn contains the same element as Linh Bảo, buff (+15% per matching element)
   - If target's Linh căn counters Linh Bảo's element, weaken (-15% per counter element)
   Element countering follows ELEMENT_MATRIX: positive = target beats source (weaken), negative = source beats target (no effect here)
*/
function calcLinhBaoElementMod(source, target, linhBaoElement) {
    if (!linhBaoElement) return 1.0;

    const sourceElems = source.elements || [];
    const targetElems = target.elements || [];

    let mod = 1.0;

    // Buff: if source's elements contain the Linh Bảo element, gain synergy bonus
    const matchingCount = sourceElems.filter(e => e === linhBaoElement).length;
    if (matchingCount > 0) {
        mod += 0.15 * matchingCount; // +15% per matching element
    }

    // Weaken: if target's elements counter the Linh Bảo element, reduce effect
    // In ELEMENT_MATRIX: if matrix[targetElem][linhBaoElem] > 0, target beats source -> weaken
    if (typeof ELEMENT_MATRIX !== 'undefined') {
        for (const targetElem of targetElems) {
            const counterPower = ELEMENT_MATRIX[targetElem]?.[linhBaoElement];
            if (counterPower > 0) {
                mod -= 0.15; // -15% per countering element
            }
        }
    }

    return Math.max(0.3, Math.min(2.0, mod)); // clamp between 30% and 200%
}

function lbBuildPlayerCombatant() {
    if (typeof recalculateStats === 'function') recalculateStats();
    let atk = state.totalPower || state.power || 10;
    let def = state.totalDef || state.defense || 5;
    let maxHp = state.totalMaxHp || state.maxHp || 100;
    if (typeof applyPassiveSkillBuffs === 'function') {
        try { const b = applyPassiveSkillBuffs(); atk += b.atkBonus || 0; def += b.defBonus || 0; } catch { }
    }
    const placed = boardItems().filter(Boolean);
    const defs = placed.length ? placed : [LB_DEFAULT_ATTACK];
    return Object.assign(lbBaseCombatant(), {
        side: 'player',
        name: state.name || 'Ngươi',
        hp: Math.max(1, Math.min(state.hp || maxHp, maxHp)), maxHp,
        baseAtk: atk, atk, def,
        elements: state.root?.elements || [], rootRank: state.root?.rank || 0,
        realmIndex: state.realmIndex || 0, realmStage: state.realmStage || 0,
        slots: defs.map(lbMakeSlot)
    });
}

function lbBuildEnemyCombatant(enemy) {
    const defs = buildEnemyBoard(enemy);
    return Object.assign(lbBaseCombatant(), {
        side: 'enemy',
        name: enemy.name || 'Địch',
        hp: Math.max(1, enemy.hp || enemy.maxHp || 100),
        maxHp: Math.max(1, enemy.maxHp || enemy.hp || 100),
        baseAtk: enemy.str || 10, atk: enemy.str || 10, def: enemy.def || 0,
        elements: enemy.elements || [], rootRank: enemy.rootRank || 0,
        realmIndex: enemy.realmIndex || 0, realmStage: enemy.realmStage || 0,
        slots: defs.map(lbMakeSlot), ref: enemy
    });
}

/* ---------- damage application (respects parry + shield) ---------- */
function lbApplyDamage(target, amount) {
    let dmg = Math.max(0, Math.floor(amount));
    const now = performance.now();
    if (target.parryFrac > 0 && now < target.parryUntil) {
        dmg = Math.floor(dmg * (1 - target.parryFrac));
        target.parryFrac = 0; // consumed
    }
    if (target.shield > 0) {
        const absorbed = Math.min(target.shield, dmg);
        target.shield -= absorbed;
        dmg -= absorbed;
    }
    target.hp = Math.max(0, target.hp - dmg);
    return dmg;
}

/* ---------- a linh bảo fires ALL of its effects ---------- */
function lbFire(battle, source, target, slot) {
    const item = slot.def;
    const effects = lbEffectList(item);
    const now = performance.now();
    const dmgScale = source.side === 'enemy' ? LB_ENEMY_DMG_SCALE : 1;

    // Calculate element modifier: buff if source's Linh căn matches, weaken if target's Linh căn counters
    const elemMod = calcLinhBaoElementMod(source, target, item.element);

    let dealt = 0;

    // 1) direct damage (summed) - apply element modifier
    for (const ef of effects) {
        if (ef.action !== 'damage') continue;
        const basePower = source.atk * lbEffMag(ef.magnitude, item) * dmgScale * elemMod;
        const d = computeDamage(
            basePower, source.elements, source.rootRank, source.realmIndex, source.realmStage,
            target.def, target.elements, target.rootRank, target.realmIndex, target.realmStage
        );
        dealt += lbApplyDamage(target, d.final);
    }
    if (dealt > 0) lbFloat(battle, target.side, `-${fmtVal(dealt)}`, 'dmg');

    const gemMods = lbGemMods(item);

    // 2) lifesteal from the damage just dealt (effects + Hấp Ngọc gems) - apply element modifier
    let lsFrac = gemMods.leech;
    for (const ef of effects) if (ef.action === 'lifesteal') lsFrac += ef.magnitude * elemMod;
    if (lsFrac > 0 && dealt > 0) {
        const heal = Math.floor(dealt * lsFrac);
        if (heal > 0) { source.hp = Math.min(source.maxHp, source.hp + heal); lbFloat(battle, source.side, `+${fmtVal(heal)}`, 'heal'); }
    }

    // Hộ Ngọc gems grant parry on every fire
    if (gemMods.guard > 0) {
        source.parryFrac = Math.max(source.parryFrac, gemMods.guard);
        source.parryUntil = now + LB_PARRY_SECS * 1000;
    }

    // 3) the rest - apply element modifier to damage/healing effects
    for (const ef of effects) {
        switch (ef.action) {
            case 'burn': {
                const dps = Math.max(1, source.atk * lbEffMag(ef.magnitude, item) * dmgScale * elemMod);
                target.burns.push({ dps, remaining: LB_BURN_SECS });
                lbFloat(battle, target.side, '🔥', 'burn');
                break;
            }
            case 'heal': {
                const amt = Math.floor(source.maxHp * lbEffMag(ef.magnitude, item) * elemMod);
                source.hp = Math.min(source.maxHp, source.hp + amt);
                lbFloat(battle, source.side, `+${fmtVal(amt)}`, 'heal');
                break;
            }
            case 'shield': {
                const amt = Math.floor(source.maxHp * lbEffMag(ef.magnitude, item) * elemMod);
                source.shield += amt;
                lbFloat(battle, source.side, `🛡️${fmtVal(amt)}`, 'shield');
                break;
            }
            case 'freeze': {
                const dur = lbDurMag(ef.magnitude, item);
                target.freezeUntil = Math.max(target.freezeUntil, now + dur * 1000);
                lbFloat(battle, target.side, '❄️', 'freeze');
                break;
            }
            case 'stun': {
                if (Math.random() < LB_STUN_CHANCE && now >= target.stunImmuneUntil) {
                    const dur = lbDurMag(ef.magnitude, item);
                    target.stunUntil = now + dur * 1000;
                    target.stunImmuneUntil = target.stunUntil + LB_STUN_IMMUNE * 1000;
                    lbFloat(battle, target.side, '💫', 'stun');
                }
                break;
            }
            case 'parry': {
                source.parryFrac = Math.max(source.parryFrac, ef.magnitude);
                source.parryUntil = now + LB_PARRY_SECS * 1000;
                lbFloat(battle, source.side, '🛡', 'parry');
                break;
            }
            case 'buffAtk': {
                const before = source.atk;
                source.atk = Math.floor(source.atk * (1 + lbEffMag(ef.magnitude, item) * elemMod));
                lbFloat(battle, source.side, `⬆️${fmtVal(source.atk - before)}`, 'buff');
                break;
            }
        }
    }

    log(`${lbItemIcon(item)} ${source.name} · ${item.name}${dealt > 0 ? ` gây ${fmtVal(dealt)} sát thương` : ''}.`);
}

/* ---------- the battle loop ---------- */
function runBoardBattle() {
    if (!state.currentEnemy) { log('Không có kẻ thù để giao chiến.'); return; }
    if (state.currentEnemy.isPvP) { if (typeof pvpAttackOrLocal === 'function') pvpAttackOrLocal(); return; }
    if (window.__boardBattle && window.__boardBattle.running) return;

    ensureBoardState();
    if (typeof syncEnemyToRealm === 'function') syncEnemyToRealm(state.currentEnemy);

    window._battleActive = true;
    if (window.stopAutoTrainingHard) window.stopAutoTrainingHard();

    const battle = {
        running: true, elapsedMs: 0,
        player: lbBuildPlayerCombatant(),
        enemy: lbBuildEnemyCombatant(state.currentEnemy),
        dom: {}, timer: null
    };
    window.__boardBattle = battle;

    lbBuildArenaDOM(battle);
    log(`🎴 Bố trí trận pháp — ${battle.player.slots.length} vs ${battle.enemy.slots.length} pháp bảo. Khai chiến!`);

    battle.timer = setInterval(() => lbStep(battle), LB_TICK_MS);
    lbUpdateArena(battle);
}
if (typeof window !== 'undefined') window.runBoardBattle = runBoardBattle;

function lbStep(battle) {
    if (!battle.running) return;
    const now = performance.now();
    const tickSec = LB_TICK_MS / 1000;
    battle.elapsedMs += LB_TICK_MS;

    const sides = [
        { self: battle.player, foe: battle.enemy },
        { self: battle.enemy, foe: battle.player }
    ];

    for (const { self, foe } of sides) {
        if (self.hp <= 0 || foe.hp <= 0) continue;
        const stunned = now < self.stunUntil;
        const frozen = now < self.freezeUntil;
        const slow = stunned ? 0 : (frozen ? LB_FREEZE_SLOW : 1);
        if (slow === 0) continue;
        for (const slot of self.slots) {
            slot.elapsed += LB_TICK_MS * slow;
            if (slot.elapsed >= slot.cooldown * 1000) {
                slot.elapsed -= slot.cooldown * 1000;
                lbFire(battle, self, foe, slot);
                if (foe.hp <= 0 || self.hp <= 0) break;
            }
        }
        // End battle immediately if either combatant is dead after attacks
        if (battle.player.hp <= 0) { lbEndBattle(battle, 'lose'); return; }
        if (battle.enemy.hp <= 0) { lbEndBattle(battle, 'win'); return; }
    }

    for (const c of [battle.player, battle.enemy]) {
        if (!c.burns.length) continue;
        for (const b of c.burns) { lbApplyDamage(c, b.dps * tickSec); b.remaining -= tickSec; }
        c.burns = c.burns.filter(b => b.remaining > 0 && c.hp > 0);
    }

    lbUpdateArena(battle);

    const timeout = battle.elapsedMs >= LB_MAX_SECONDS * 1000;
    if (battle.enemy.hp <= 0) return lbEndBattle(battle, 'win');
    if (battle.player.hp <= 0) return lbEndBattle(battle, 'lose');
    if (timeout) {
        const pPct = battle.player.hp / battle.player.maxHp;
        const ePct = battle.enemy.hp / battle.enemy.maxHp;
        return lbEndBattle(battle, pPct >= ePct ? 'win' : 'lose');
    }
}

function lbEndBattle(battle, result) {
    if (!battle.running) return;
    battle.running = false;
    if (battle.timer) { clearInterval(battle.timer); battle.timer = null; }
    window._battleActive = false;

    const enemy = state.currentEnemy;
    state.hp = Math.max(0, Math.floor(battle.player.hp));
    if (enemy) enemy.hp = Math.max(0, Math.floor(battle.enemy.hp));

    lbUpdateArena(battle);

    if (result === 'win') {
        if (typeof winBattle === 'function' && enemy) winBattle(enemy);
        state.totalMaxHp = (state.maxHp || 0) + (typeof getEquippedHp === 'function' ? getEquippedHp() : 0);
        state.hp = state.totalMaxHp;
        state.currentEnemy = null;
        log('🔥 Khí huyết sôi trào — HP hồi phục toàn phần sau chiến thắng!');
        // 🏆 better rewards: sometimes a choice of gems/linh bảo, or a gem drop
        try {
            const elite = enemy && enemy.tier && enemy.tier !== 'Thường';
            if (Math.random() < (elite ? 0.6 : 0.28)) showBoardRewardChoice();
            else if (Math.random() < 0.25) grantGemDrop({ source: 'Chiến thắng' });
        } catch { }
    } else {
        // 🆕 Lưu thông tin tử vong - bị Linh Bảo trận pháp tiêu diệt
        if (enemy) {
            window.__lastDeathInfo = {
                enemyName: enemy.name || 'Kẻ thù không rõ',
                killMethod: 'Linh Bảo trận pháp'
            };
        }
        if (typeof loseBattle === 'function') loseBattle();
        state.currentEnemy = null;
    }

    window.__boardBattle = null;
    if (typeof renderAll === 'function') renderAll();
}

function forfeitBoardBattle() {
    const battle = window.__boardBattle;
    if (battle && battle.running) {
        battle.running = false;
        if (battle.timer) { clearInterval(battle.timer); battle.timer = null; }
        window.__boardBattle = null;
    }
    window._battleActive = false;
}
if (typeof window !== 'undefined') window.forfeitBoardBattle = forfeitBoardBattle;

/* ============================================================
   RENDERING
   ============================================================ */
function lbArenaEl() { return document.getElementById('boardArena'); }

function lbSlotTileHTML(slot, idx, side) {
    const def = slot.def;
    const col = LB_ELEMENT_COLORS[def.element] || '#888';
    return `
        <div class="lb-tile" data-side="${side}" data-idx="${idx}" style="border-color:${col}">
            <div class="lb-tile-top">
                <span class="lb-tile-icon">${lbEffectIcons(def)}</span>
                <span class="lb-tile-tier">${lbGradeLabel(def)}</span>
            </div>
            <div class="lb-tile-name" style="color:${col}">${def.name}</div>
            <div class="lb-tile-cd"><div class="lb-tile-fill" style="background:${col}"></div></div>
        </div>`;
}

function lbSideHTML(c, side) {
    const tiles = c.slots.map((s, i) => lbSlotTileHTML(s, i, side)).join('');
    return `
        <div class="lb-side lb-side-${side}">
            <div class="lb-side-head">
                <span class="lb-side-name">${side === 'enemy' ? '👹 ' : '🧙 '}${c.name}</span>
                <span class="lb-side-hp-txt" data-hp="${side}"></span>
            </div>
            <div class="lb-hpbar"><div class="lb-hpfill lb-hpfill-${side}" data-hpfill="${side}"></div>
                <div class="lb-shieldfill" data-shield="${side}"></div></div>
            <div class="lb-board" data-board="${side}">${tiles}</div>
            <div class="lb-float" data-float="${side}"></div>
        </div>`;
}

function lbBuildArenaDOM(battle) {
    const el = lbArenaEl();
    if (!el) return;
    el.classList.add('lb-active');
    el.innerHTML = `
        ${lbSideHTML(battle.enemy, 'enemy')}
        <div class="lb-vs">⚔️ Đấu Pháp Bảo</div>
        ${lbSideHTML(battle.player, 'player')}`;

    ['player', 'enemy'].forEach(side => {
        const c = battle[side];
        const board = el.querySelector(`[data-board="${side}"]`);
        c.slots.forEach((slot, i) => {
            const tile = board.children[i];
            slot.tileNode = tile;
            slot.fillNode = tile ? tile.querySelector('.lb-tile-fill') : null;
        });
        battle.dom[side] = {
            hpTxt: el.querySelector(`[data-hp="${side}"]`),
            hpFill: el.querySelector(`[data-hpfill="${side}"]`),
            shield: el.querySelector(`[data-shield="${side}"]`),
            float: el.querySelector(`[data-float="${side}"]`)
        };
    });
}

function lbUpdateArena(battle) {
    if (!battle || !battle.dom) return;
    const now = performance.now();
    ['player', 'enemy'].forEach(side => {
        const c = battle[side];
        const d = battle.dom[side];
        if (!d) return;
        const pct = Math.max(0, Math.min(100, (c.hp / c.maxHp) * 100));
        const shieldPct = Math.max(0, Math.min(100, (c.shield / c.maxHp) * 100));
        if (d.hpFill) d.hpFill.style.width = pct + '%';
        if (d.shield) d.shield.style.width = shieldPct + '%';
        if (d.hpTxt) d.hpTxt.textContent =
            `${fmtVal(Math.ceil(c.hp))}/${fmtVal(c.maxHp)}${c.shield > 0 ? ` 🛡️${fmtVal(Math.ceil(c.shield))}` : ''}`;
        const stunned = now < c.stunUntil;
        const frozen = now < c.freezeUntil;
        c.slots.forEach(slot => {
            if (slot.fillNode) {
                const p = Math.max(0, Math.min(100, (slot.elapsed / (slot.cooldown * 1000)) * 100));
                slot.fillNode.style.width = p + '%';
            }
            if (slot.tileNode) {
                slot.tileNode.classList.toggle('lb-frozen', frozen && !stunned);
                slot.tileNode.classList.toggle('lb-stunned', stunned);
            }
        });
    });
}

let _lbFloatSeq = 0;
function lbFloat(battle, side, text, kind) {
    const host = battle.dom?.[side]?.float;
    if (!host) return;
    const span = document.createElement('span');
    span.className = `lb-float-item lb-float-${kind}`;
    span.innerHTML = text;
    span.style.left = (10 + Math.random() * 70) + '%';
    host.appendChild(span);
    span.dataset.id = ++_lbFloatSeq;
    setTimeout(() => { try { span.remove(); } catch { } }, 900);
}

/* Static board panel shown out of combat (board editor view). */
function renderBoardArena() {
    const el = lbArenaEl();
    if (!el) return;
    if (window.__boardBattle && window.__boardBattle.running) return;

    el.classList.remove('lb-active');
    ensureBoardState();
    const slots = boardItems();

    const tiles = slots.map((it, i) => {
        if (!it) {
            return `<div class="lb-tile lb-tile-empty" onclick="log('Bấm một linh bảo trong túi đồ để đặt vào trận.')">
                        <div class="lb-tile-name">Ô ${i + 1}</div>
                        <div class="lb-tile-sub small">trống</div>
                    </div>`;
        }
        const col = LB_ELEMENT_COLORS[it.element] || '#888';
        const tooltipText = (typeof getLinhBaoTooltipText === 'function') ? getLinhBaoTooltipText(it) : '';
        const tooltipHtml = tooltipText ? `<div class="lb-tile-tooltip">📊 GIÁ TRỊ THỰC:\n${tooltipText.replace(/\n/g, '<br>')}</div>` : '';
        return `<div class="lb-tile" style="border-color:${col}" onclick="removeFromBoard(${i})" title="Gỡ khỏi trận">
                    <div class="lb-tile-top"><span class="lb-tile-icon">${lbEffectIcons(it)}</span><span class="lb-tile-tier">${lbGradeLabel(it)}</span></div>
                    <div class="lb-tile-name" style="color:${col}">${it.name}</div>
                    <div class="lb-tile-sub small">${lbEffectSummary(it)} · CD ${lbEffCooldown(it).toFixed(1)}s</div>
                    ${tooltipHtml}
                </div>`;
    }).join('');

    const enemyLine = state.currentEnemy && !state.currentEnemy.isPvP
        ? `<div class="small" style="margin-bottom:6px">Kẻ địch chờ giao chiến: <b>${state.currentEnemy.name}</b> — bấm “Tấn công” để khai chiến.</div>`
        : `<div class="small" style="margin-bottom:6px">Sắp xếp linh bảo rồi “Đi kỳ ngộ” để tìm địch.</div>`;

    el.innerHTML = `
        <div class="lb-editor-head">🎴 Trận Pháp Bảo <span class="small">(bấm ô để gỡ · bấm linh bảo trong túi để đặt)</span></div>
        ${enemyLine}
        <div class="lb-board lb-board-editor">${tiles}</div>`;
}
if (typeof window !== 'undefined') window.renderBoardArena = renderBoardArena;
