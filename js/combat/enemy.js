/* ===========================
    ENEMY: dựng kẻ địch từ bảng chuẩn trong balance.js
=========================== */
/* Đa phần phẩm thấp và trung, phẩm cao cực hiếm; cảnh giới của quái nâng dần mặt bằng */
const ENEMY_ROOT_WEIGHTS = [40, 30, 20, 7, 2, 0.7, 0.2, 0.07, 0.03, 0];
const ENEMY_ROOT_REALMS_PER_RANK = 4;

function rollEnemyRootRank(realm, bonus = 0) {
    const total = ENEMY_ROOT_WEIGHTS.reduce((a, b) => a + b, 0);
    let roll = Math.random() * total;
    let rank = ENEMY_ROOT_WEIGHTS.findIndex(weight => (roll -= weight) <= 0);
    rank += Math.floor(realm / ENEMY_ROOT_REALMS_PER_RANK) + bonus;
    return Math.max(0, Math.min(ROOT_RANKS.length - 1, rank));
}

function randomHumanPath() {
    return ['kiem', 'phap', 'the', 'ma'][Math.floor(Math.random() * 4)];
}

function buildEnemy({ name, realmIndex, realmStage = 0, tier = 'Thường', scale = 1, elements, rootRank, kind = 'human', look = null, boardSize = 3, path = null }) {
    const stats = enemyStatsFor(realmIndex, realmStage, tier, scale);
    return {
        name,
        tier,
        kind,
        look,
        boardSize,
        path: path || KIND_PATHS[kind] || randomHumanPath(),
        realmIndex,
        realmStage,
        elements: elements && elements.length ? elements : randomHybridElements(realmIndex, false),
        rootRank: rootRank != null ? rootRank : rollEnemyRootRank(realmIndex),
        ...stats
    };
}

function rollEnemyTier() {
    const roll = Math.random();
    if (roll < 0.03) return 'Thống lĩnh';
    if (roll < 0.15) return 'Tinh anh';
    return 'Thường';
}

function randomRealmStage() {
    const r = Math.random();
    if (r < 0.45) return 0;
    if (r < 0.75) return 1;
    if (r < 0.95) return 2;
    return 3;
}

/* Dựng bầy: con đầu là thủ lĩnh, các con sau là escorts; phần thưởng cộng dồn vào thủ lĩnh */
function applyPackScale(unit, count) {
    const k = PACK_SCALE[count];
    unit.str = Math.floor(unit.str * k.atk);
    unit.hp = unit.maxHp = Math.floor(unit.maxHp * k.hp);
    unit.boardSize = count > 1 ? 2 : unit.boardSize;
}

/* Kẻ địch thuộc về khu vực: cảnh giới lấy trong khoảng của địa điểm, không theo người chơi */
const ENEMY_REALM_STEP_CHANCE = 0.25;
const UNDERLEVEL_XP_MULT = 0.25;
/* Quái cao hơn mình: mỗi tiểu cảnh giới chênh lệch nhân thêm thưởng; tu vi còn bị chặn bởi trần mỗi trận */
const OVERLEVEL_REWARD_STEP = 1.4;
const OVERLEVEL_LOOT_MAX = 10;

function overlevelRewardMult(unit) {
    const gap = (unit.realmIndex * STAGES.length + (unit.realmStage || 0)) - ((state.realmIndex || 0) * STAGES.length + (state.realmStage || 0));
    return gap > 0 ? Math.pow(OVERLEVEL_REWARD_STEP, gap) : 1;
}

function enemyRealmRange(loc) {
    const top = loc.enemyMax ?? loc.maxR;
    return [Math.min(loc.minR, top), top];
}

function rollLocationRealm(loc, capRealm = Infinity) {
    const chosen = state.huntRange?.[loc.id];
    const range = enemyRealmRange(loc);
    const [low, high] = chosen || range;
    const top = Math.min(high, range[1], Math.max(range[0], capRealm));
    let realm = Math.min(low, top);
    if (chosen) realm += Math.floor(Math.random() * (top - realm + 1));
    else while (realm < top && Math.random() < ENEMY_REALM_STEP_CHANCE) realm++;
    const stageCap = realm === loc.maxR && loc.maxS != null ? loc.maxS : 3;
    return { realmIndex: realm, realmStage: Math.min(stageCap, randomRealmStage()) };
}

/* Đang làm nhiệm vụ săn ở đây thì không gặp quái vượt cảnh giới và tiểu cảnh giới của mình */
function rollQuestRealm(loc) {
    const rolled = rollLocationRealm(loc, state.realmIndex);
    const realmIndex = Math.min(rolled.realmIndex, state.realmIndex);
    const realmStage = realmIndex === state.realmIndex ? Math.min(rolled.realmStage, state.realmStage || 0) : rolled.realmStage;
    return { realmIndex, realmStage };
}

/* Lệnh Thiên Đình chỉ chen vào bầy khi cấp của nó nằm trong khoảng săn đã chọn, và không vượt người chơi lúc đang săn cho nhiệm vụ */
function courtOrderFits(order, loc, wanted) {
    const chosen = state.huntRange?.[loc.id];
    if (chosen && (order.realm < chosen[0] || order.realm > chosen[1])) return false;
    return !wanted || order.realm * STAGES.length + (order.stage || 0) <= (state.realmIndex || 0) * STAGES.length + (state.realmStage || 0);
}

function spawnEnemyPack(makeUnit, count) {
    const members = Array.from({ length: count }, () => makeUnit());
    members.forEach(unit => applyPackScale(unit, count));
    const [leader, ...escorts] = members;
    leader.escorts = escorts;
    leader.gold = members.reduce((sum, m) => sum + m.gold, 0);
    leader.xpMinutes = members.reduce((sum, m) => sum + m.xpMinutes, 0);
    return leader;
}

function spawnEnemyWithRules(huntedSeconds = 0, count = 1) {
    const loc = currentLocation();
    const pool = loc.enemies || [];
    if (!pool.length) { log(`${loc.name} yên bình, không có gì để săn.`); return; }
    const wanted = (state.questActive || []).map(rt => questStep(rt)?.hunt).find(h => h && h.loc === loc.id);
    const order = [...(state.courtOrders || []), ...(state.cdOrders || [])].find(o => o.loc === loc.id && courtOrderFits(o, loc, wanted));
    const makeUnit = () => {
        if (order && (!wanted || Math.random() < 0.5)) {
            const target = pool.find(e => e.name === order.name);
            return buildEnemy({ name: order.name, kind: target?.kind, realmIndex: order.realm, realmStage: order.stage, tier: rollEnemyTier() });
        }
        const preferred = wanted && Math.random() < 0.7 ? pool.find(e => e.name === wanted.name) : null;
        const pick = preferred || pool[Math.floor(Math.random() * pool.length)];
        const unit = buildEnemy({ name: pick.name, kind: pick.kind, ...(wanted ? rollQuestRealm(loc) : rollLocationRealm(loc)), tier: rollEnemyTier() });
        if (unit.realmIndex < state.realmIndex - 1) unit.xpMinutes *= UNDERLEVEL_XP_MULT;
        if (huntedSeconds) unit.xpMinutes = unit.xpMinutes / ENEMY_TIERS['Thường'].xpMinutes * (huntedSeconds / 60) * HUNT_XP_PER_SEARCH_MINUTE;
        const mult = overlevelRewardMult(unit);
        unit.xpMinutes *= mult;
        unit.lootMult = Math.min(OVERLEVEL_LOOT_MAX, mult);
        unit.gold = Math.floor(unit.gold * unit.lootMult);
        return unit;
    };
    const enemy = spawnEnemyPack(makeUnit, count);
    if (huntedSeconds) enemy.hunted = true;
    startEncounter(enemy);
}

function enemyPackMembers(enemy) {
    return [enemy, ...(enemy.escorts || [])];
}

function unitRankText(e) {
    return `${REALMS[e.shownRealm ?? e.realmIndex ?? 0]} ${STAGES[e.realmStage || 0]}${e.tier ? ` · ${e.tier}` : ''}`;
}

function startEncounter(enemy) {
    state.currentEnemy = enemy;
    window._battleActive = true;
    enemyPackMembers(enemy).forEach(unit => log(`⚔️ Gặp ${unit.name} — ${unitRankText(unit)} · Linh căn: ${unit.elements.map(colorizeElement).join(' ')}`));
    renderAllImmediate();
}

/* random hybrid elements (2..4 elements, small chance for many) */
function randomHybridElements(realmIndex = 0, forceHybrid = false) {
    const roll = Math.random();
    let count = 1;

    const realmFactor = Math.min(1, Math.log10(realmIndex + 2) / 2);

    if (forceHybrid) {
        if (roll < 0.03 + 0.07 * realmFactor) count = 4;
        else if (roll < 0.25 + 0.25 * realmFactor) count = 3;
        else count = 2;
    } else {
        if (roll < 0.02 + 0.03 * realmFactor) count = 4;
        else if (roll < 0.10 + 0.15 * realmFactor) count = 3;
        else if (roll < 0.30 + 0.30 * realmFactor) count = 2;
        else count = 1;
    }

    const res = [];
    while (res.length < count) {
        const e = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
        if (!res.includes(e)) res.push(e);
    }
    return res;
}

function spawnSpecific(e) {
    state.currentEnemy = e;
    renderAll();
    log(`Mục tiêu đặt: ${state.currentEnemy.name} — ${REALMS[state.currentEnemy.realmIndex]}`);
}

