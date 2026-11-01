/* ===========================
    BOSS THẾ GIỚI — mỗi Giới một con, mọi người chơi đánh chung một thanh máu.
    - Máy chủ giữ máu và đóng góp. Một trận là một lượt: đánh tới khi gục, chạy hoặc hết giờ, rồi báo % máu đã gây.
    - Boss chết: ai đủ đóng góp được ghi thưởng theo hạng, thưởng tính theo cảnh giới lúc nhận.
    - Gục trước boss không mất tu vi, chỉ phải điều dưỡng.
=========================== */
const WORLD_BOSSES = {
    pham: { name: 'Cửu U Ma Long', kind: 'dragon' },
    tien: { name: 'Thiên Kiếp Kim Long', kind: 'dragon' },
    thanh: { name: 'Thánh Vực Ma Hoàng', kind: 'demon' },
    thien: { name: 'Thiên Ngoại Tà Thần', kind: 'demon' },
    hondon: { name: 'Hỗn Độn Cự Thú', kind: 'beast' },
    hongmong: { name: 'Hồng Mông Cổ Thần', kind: 'golem' },
    chungnguyen: { name: 'Chung Nguyên Chi Chủ', kind: 'spirit' }
};
const WORLD_BOSS_SCALE = 2.5;
const WORLD_BOSS_STAGE = 3;
const WORLD_BOSS_BOARD = 6;
const WORLD_BOSS_BAR_UNITS = 1000;
const WORLD_BOSS_FIGHT_GAP_SECONDS = 30;
const WORLD_BOSS_REST_SECONDS = 60;
const WORLD_BOSS_CLAIM_MS = 5000;
const WORLD_BOSS_REWARD_TIERS = [
    { upTo: 1, goldRefs: 200, hours: 12, gems: 5, mats: 20, gearQuality: 3 },
    { upTo: 3, goldRefs: 120, hours: 8, gems: 3, mats: 12, gearQuality: 3 },
    { upTo: 10, goldRefs: 60, hours: 4, gems: 2, mats: 6, gearQuality: 2 },
    { upTo: Infinity, goldRefs: 25, hours: 2, gems: 1, mats: 3, gearQuality: null }
];

const worldBossState = { bosses: {}, pending: false, nextFightAt: 0 };

function currentBossWorld() {
    return worldOf(state.location);
}

function worldBossTier(rank) {
    return WORLD_BOSS_REWARD_TIERS.find(tier => rank <= tier.upTo);
}

function worldBossRemaining(boss) {
    return boss.respawnAt ? Math.max(0, (boss.respawnAt - Date.now()) / 1000) : 0;
}

function worldBossWait() {
    return Math.max(0, (worldBossState.nextFightAt - Date.now()) / 1000);
}

function startWorldBossFight() {
    const world = currentBossWorld();
    const boss = worldBossState.bosses[world.id];
    if (!window.matchConnected || !boss || boss.hp <= 0) return showToast('Boss hiện không thể khiêu chiến.', 'info');
    if (state.currentEnemy || window._battleActive || state.activity) return showToast('Đang bận, chưa thể khiêu chiến.', 'info');
    if (worldBossWait() > 0) return showToast(`Chờ ${formatRealDuration(worldBossWait())} nữa.`, 'info');
    const def = WORLD_BOSSES[world.id];
    const enemy = buildEnemy({
        name: def.name, kind: def.kind, tier: 'Boss', scale: WORLD_BOSS_SCALE, boardSize: WORLD_BOSS_BOARD,
        realmIndex: world.to, realmStage: WORLD_BOSS_STAGE, rootRank: rollEnemyRootRank(world.to, 1)
    });
    enemy.worldBoss = world.id;
    enemy.hp = Math.max(1, Math.ceil(enemy.maxHp * Math.min(1, boss.hp / WORLD_BOSS_BAR_UNITS)));
    enemy.fightStartHp = enemy.hp;
    document.getElementById('worldBossModal')?.style.setProperty('display', 'none');
    startEncounter(enemy);
}

/* Thắng, thua hay chạy đều chỉ là hết lượt: máu đã gây được tính cho máy chủ */
function finishWorldBossFight(enemy, result) {
    const units = Math.floor((enemy.fightStartHp - enemy.hp) / enemy.maxHp * WORLD_BOSS_BAR_UNITS);
    wsSend({ type: 'boss_hit', world: enemy.worldBoss, units, token: profileToken() });
    worldBossState.nextFightAt = Date.now() + WORLD_BOSS_FIGHT_GAP_SECONDS * 1000;
    state.currentEnemy = null;
    log(`🐉 Gây ${(units / WORLD_BOSS_BAR_UNITS * 100).toFixed(1)}% một thanh máu của ${enemy.name}.`);
    if (result === 'win') {
        state.hp = state.totalMaxHp;
        return;
    }
    state.hp = Math.max(1, Math.floor((state.totalMaxHp || state.maxHp) * 0.25));
    startActivity({ type: 'rest', label: 'Điều dưỡng', seconds: WORLD_BOSS_REST_SECONDS });
}

function claimWorldBossReward({ world, rank, total }) {
    const tier = worldBossTier(rank);
    const tierWorld = WORLD_TIERS.find(w => w.id === world);
    const def = WORLD_BOSSES[world];
    if (!tier || !tierWorld || !def) return;
    const realm = Math.min(state.realmIndex, tierWorld.to);
    const gold = goldRef(realm) * tier.goldRefs;
    state.gold += gold;
    const xp = gainCultivationHours(tier.hours);
    log(`🐉 Thưởng diệt ${def.name}, hạng ${rank}/${total}: +${formatNumber(gold)} linh thạch, +${formatNumber(xp)} tu vi.`);
    grantMaterial(world, materialYield(tierWorld.to, tier.mats), def.name);
    for (let i = 0; i < tier.gems; i++) grantGemDrop({ source: 'Boss Thế Giới' });
    if (tier.gearQuality !== null) {
        const gear = makeGearItem(realm, GEAR_SLOT_IDS[Math.floor(Math.random() * GEAR_SLOT_IDS.length)], tier.gearQuality);
        addItemToInventory(gear);
        log(`🎁 Rơi trang bị: ${gear.name}!`);
    }
    showToast(`Nhận thưởng diệt ${def.name}, hạng ${rank}!`, 'info');
}

function worldBossModalHTML() {
    const world = currentBossWorld();
    const boss = worldBossState.bosses[world.id];
    const def = WORLD_BOSSES[world.id];
    if (!window.matchConnected || !boss) return '<div class="small">Cần kết nối máy chủ để xem Boss Thế Giới.</div>';
    const pct = boss.hp / boss.maxHp * 100;
    const rows = boss.top.map((hit, i) => `<div class="sect-row">
        <span>${i < 3 ? ['🥇', '🥈', '🥉'][i] : `${i + 1}.`} ${sectEscape(hit.name)}</span>
        <b>${(hit.units / boss.maxHp * 100).toFixed(1)}%</b></div>`).join('');
    const respawn = worldBossRemaining(boss);
    const action = boss.hp <= 0
        ? `<div class="small">Đã bị diệt, hồi sinh sau ${formatRealDuration(respawn)}.</div>`
        : `<button class="mini-btn" onclick="startWorldBossFight()">⚔️ Khiêu chiến</button>`;
    const rewards = WORLD_BOSS_REWARD_TIERS.map((tier, i) => {
        const from = i ? WORLD_BOSS_REWARD_TIERS[i - 1].upTo + 1 : 1;
        const label = tier.upTo === Infinity ? `Hạng ${from} trở đi` : (from === tier.upTo ? `Hạng ${from}` : `Hạng ${from}–${tier.upTo}`);
        const realm = Math.min(state.realmIndex, world.to);
        return `<div class="small">${label}: ${formatNumber(goldRef(realm) * tier.goldRefs)} linh thạch, ${tier.hours} giờ tu vi, ${tier.gems} linh ngọc, ${materialYield(world.to, tier.mats)} ${MATERIAL_NAMES[world.id]}${tier.gearQuality !== null ? `, trang bị ${GEAR_QUALITIES[tier.gearQuality].name}` : ''}</div>`;
    }).join('');
    return `<div><b>${def.name}</b> — ${REALMS[world.to]} ${STAGES[WORLD_BOSS_STAGE]} · ${world.name}</div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="small">Máu còn ${pct.toFixed(1)}%. Ngươi đã gây ${(boss.mine / boss.maxHp * 100).toFixed(1)}%.</div>
        ${action}
        <div class="small" style="margin-top:10px">Mỗi lượt cách nhau ${WORLD_BOSS_FIGHT_GAP_SECONDS} giây. Gục không mất tu vi, chỉ phải điều dưỡng. Cần gây ít nhất 0,25% tổng máu mới có thưởng.</div>
        <div class="small" style="margin-top:10px"><b>Đóng góp</b></div>
        ${rows || '<div class="small">Chưa ai ra tay.</div>'}
        <div class="small" style="margin-top:10px"><b>Thưởng khi boss chết</b></div>${rewards}`;
}

function openWorldBoss() {
    wsSend({ type: 'boss_get' });
    openWorldModal('worldBossModal', '🐉 Boss Thế Giới', worldBossModalHTML());
}

/* Trong trận tu vi không được ghi nhận nên chờ đánh xong mới nhận */
function claimWorldBossRewards() {
    if (!worldBossState.pending || !window.matchConnected || window._battleActive || state.currentEnemy) return;
    worldBossState.pending = false;
    wsSend({ type: 'boss_claim', token: profileToken() });
}

function handleWorldBossMessage(msg) {
    if (msg.type === 'boss_killed') {
        const def = WORLD_BOSSES[msg.world];
        if (def) log(`🐉 ${def.name} đã bị ${sectEscape(String(msg.killer))} kết liễu!`);
        return;
    }
    if (msg.type === 'boss_rewards') {
        (Array.isArray(msg.rewards) ? msg.rewards : []).forEach(claimWorldBossReward);
        renderAll();
        return;
    }
    worldBossState.bosses = msg.bosses || {};
    worldBossState.pending = !!msg.pending;
    const modal = document.getElementById('worldBossModal');
    if (modal && modal.style.display !== 'none') openWorldModal('worldBossModal', '🐉 Boss Thế Giới', worldBossModalHTML());
    claimWorldBossRewards();
}

if (typeof window !== 'undefined') {
    Object.assign(window, { openWorldBoss, startWorldBossFight });
    setInterval(claimWorldBossRewards, WORLD_BOSS_CLAIM_MS);
}
