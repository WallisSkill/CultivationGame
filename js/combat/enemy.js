/* ===========================
    ENEMY: dựng kẻ địch từ bảng chuẩn trong balance.js
=========================== */
function rollEnemyRootRank(bonus = 0) {
    const base = state.root?.rank || 0;
    const swing = Math.floor(Math.random() * 3) - 1;
    return Math.max(0, Math.min(ROOT_RANKS.length - 1, base + swing + bonus));
}

function buildEnemy({ name, realmIndex, realmStage = 0, tier = 'Thường', scale = 1, elements, rootRank, kind = 'human', look = null, boardSize = 3 }) {
    const stats = enemyStatsFor(realmIndex, realmStage, tier, scale);
    return {
        name,
        tier,
        kind,
        look,
        boardSize,
        realmIndex,
        realmStage,
        elements: elements && elements.length ? elements : randomHybridElements(realmIndex, false),
        rootRank: rootRank != null ? rootRank : rollEnemyRootRank(),
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

function spawnEnemyWithRules() {
    const loc = currentLocation();
    const pool = loc.enemies || [];
    if (!pool.length) { log(`${loc.name} yên bình, không có gì để săn.`); return; }
    const wanted = (state.questActive || []).map(rt => questStep(rt)?.hunt).find(h => h && h.loc === loc.id);
    const preferred = wanted && Math.random() < 0.7 ? pool.find(e => e.name === wanted.name) : null;
    const pick = preferred || pool[Math.floor(Math.random() * pool.length)];
    startEncounter(buildEnemy({
        name: pick.name,
        kind: pick.kind,
        realmIndex: Math.max(loc.minR, Math.min(loc.maxR, state.realmIndex)),
        realmStage: Math.min(state.realmStage, randomRealmStage()),
        tier: rollEnemyTier()
    }));
}

function startEncounter(enemy) {
    state.currentEnemy = enemy;
    window._battleActive = true;
    log(`⚔️ Gặp ${enemy.name} (${enemy.tier}) — ${REALMS[enemy.realmIndex]} ${STAGES[enemy.realmStage]} · Linh căn: ${enemy.elements.map(colorizeElement).join(' ')}`);
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

function renderCurrentEnemy() {
    const div = $('currentEnemy');
    if (!state.currentEnemy) {
        div.innerText = 'Không có';
        return;
    }

    const e = state.currentEnemy;
    const stageName = STAGES[e.realmStage || 0];
    const elementsText = (e.elements && e.elements.length)
        ? e.elements.map(colorizeElement).join(' ')
        : 'Không rõ';

    div.innerHTML = colorizeWithMap(`
        <div><b>${e.name}</b> (${e.tier || ''})</div>
        <div>Cảnh giới: ${REALMS[e.realmIndex]} <span class="badge">${stageName}</span></div>
        <div>HP ${formatNumber(Math.floor(e.hp))}/${formatNumber(Math.floor(e.maxHp))}, ATK ${formatNumber(e.str)}, DEF ${formatNumber(e.def)}</div>
        <div class="small">Linh căn: ${elementsText} (${ROOT_RANKS[e.rootRank || 0]})</div>
    `);
}
