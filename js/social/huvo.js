/* ===========================
    NGÔI HƯ VÔ — sau khi thắng phân thân của Hư Vô Chi Chủ.
    - Phải thắng lần lượt các đệ tử, đánh với chỉ số lúc họ nhập môn. Thua một người, hoặc đầu hàng trước khi thắng hết: Sơ Kỳ.
    - Thắng hết rồi đầu hàng: Hậu Kỳ. Khiêu chiến Chủ mà thua: Trung Kỳ.
    - Khiêu chiến là PvP thật với Chủ đang online, tối đa HU_VO_MAX_DUELS lần thua.
    - Bậc trên sai bậc dưới: làm việc ở Giới dưới, hoặc gieo cơ duyên thành nhiệm vụ ẩn cho mọi người.
    - Máy chủ giữ đệ tử, lệnh và cơ duyên; bên thắng báo kết quả, bên rời mạng tính là thua.
=========================== */
const HU_VO_MAX_DUELS = 5;
const HU_VO_CLONE_SHARE = 0.2;
const HU_VO_SEED_HOURS = 1;
const HU_VO_ORDER_REWARD = { hours: 4, goldRefs: 20, treasure: true };

let huVoOrders = [];

function isHuVoHolder() {
    return !!huVoThrone && huVoThrone.id === state.profileId;
}

/* Ở cảnh giới cuối, mỗi tiểu cảnh giới bằng một đại cảnh giới của các cảnh giới trước */
function huVoGrowth(stage) {
    state.huVoGains = state.huVoGains || 0;
    while (state.huVoGains <= stage) {
        applyBaseGain(calculateMajorGain({ prevRealm: REALM_COUNT - 2, newRealm: REALM_COUNT - 1, rootRank: state.root?.rank || 0 }));
        state.huVoGains++;
    }
    recalculateStats();
    state.hp = state.totalMaxHp;
}

function offerHuVoChoice() {
    state.huVoChoice = true;
    state.huVoEarned = true;
    state.huVoDuels = 0;
    state.huVoBeaten = [];
    log(`🌌 Phân thân của ${huVoHolder().name} đã tan. Muốn tới ngôi Hư Vô, ngươi phải thắng hết đệ tử của Chủ.`);
    showToast('🌌 Mở bảng nhiệm vụ để chọn số phận.');
}

function becomeHuVoDisciple(stage) {
    delete state.huVoChoice;
    state.huVoDisciple = true;
    state.realmIndex = REALM_COUNT - 1;
    state.realmStage = stage;
    state.xp = 0;
    huVoGrowth(stage);
    registerProfile();
    joinHuVoThrone();
    log(`🌌 Ngươi thành Hư Vô Đạo Giả, kẹt mãi ở ${REALMS[state.realmIndex]} ${STAGES[stage]}.`);
    playDialogue(HU_VO_ENTER_LINES);
    renderAll();
}

function joinHuVoThrone() {
    recalculateStats();
    wsSend({
        type: 'huvo_join', token: profileToken(), name: state.name, look: playerLook(),
        atk: state.totalPower, def: state.totalDef, hp: state.totalMaxHp,
        elements: state.root?.elements || [], path: state.daoPath || null
    });
}

function acceptHuVoDefeat() {
    if (!state.huVoChoice) return;
    becomeHuVoDisciple(huVoSurrenderStage());
}

function huVoSurrenderStage() {
    if (huVoNextDisciple()) return 0;
    return state.huVoDuels ? 1 : 2;
}

function huVoNextDisciple() {
    const entry = Object.entries(huVoThrone?.disciples || {}).find(([id]) => id !== state.profileId && !(state.huVoBeaten || []).includes(id));
    return entry ? { id: entry[0], ...entry[1] } : null;
}

function fightHuVoDisciple() {
    if (!state.huVoChoice || !huVoNextDisciple() || !requireFree()) return;
    spawnBoss('hv_de_tu');
}

function beatHuVoDisciple(id) {
    state.huVoBeaten.push(id);
    const next = huVoNextDisciple();
    log(next ? `⚔️ Còn ${sectEscape(next.name)} chặn đường.` : '⚔️ Đã thắng hết đệ tử. Ngôi Hư Vô ở ngay trước mặt.');
}

function loseToHuVoDisciple() {
    log('💀 Ngươi thua đệ tử của Chủ.');
    becomeHuVoDisciple(0);
}

function challengeHuVo() {
    if (!huVoHolder() || state.currentEnemy || (state.huVoChoice && huVoNextDisciple())) return;
    registerProfile();
    wsSend({ type: 'huvo_challenge', token: profileToken(), profile: buildPublicProfile() });
    log(`⚔️ Đã gửi lời khiêu chiến tới ${huVoHolder().name}.`);
}

function reportHuVoDuelWin() {
    if (pvpSession.huVoDuel) wsSend({ type: 'huvo_duel_win' });
}

function startHuVoDuel(msg) {
    if (state.currentEnemy) { wsSend({ type: 'huvo_duel_busy' }); return; }
    if (msg.role === 'holder') showToast(`⚔️ ${msg.opponent.name} khiêu chiến ngôi Hư Vô!`, 'warn');
    startPvPBattle(msg.opponent);
    pvpSession.huVoDuel = msg.role;
}

function finishHuVoDuel(msg) {
    const role = pvpSession.huVoDuel;
    pvpSession.huVoDuel = null;
    if (pvpSession.active) endPvPSession();
    const won = msg.winner === state.profileId;
    if (role === 'challenger' && won) { enterFinalRealm(); return; }
    if (role === 'holder') { log(won ? '👑 Ngươi giữ được ngôi Hư Vô.' : '🌌 Ngươi đã mất ngôi Hư Vô.'); return; }
    if (won) return;
    state.huVoDuels = msg.tries;
    log(`💀 Khiêu chiến thất bại, đã thua ${state.huVoDuels}/${HU_VO_MAX_DUELS} lần.`);
    if (state.huVoChoice && state.huVoDuels >= HU_VO_MAX_DUELS) becomeHuVoDisciple(1);
    renderAll();
}

const HU_VO_DUEL_FAIL = {
    offline: 'Hư Vô Chi Chủ không online, chưa khiêu chiến được.',
    busy: 'Hư Vô Chi Chủ đang trong một trận khác.',
    tries: `Đã hết ${HU_VO_MAX_DUELS} lần khiêu chiến.`
};

function handleHuVoMessage(msg) {
    if (msg.type === 'huvo_throne') handleHuVoThrone(msg);
    if (msg.type === 'huvo_orders') handleHuVoOrders(msg);
    if (msg.type === 'huvo_duel') startHuVoDuel(msg);
    if (msg.type === 'huvo_duel_end') finishHuVoDuel(msg);
    if (msg.type === 'huvo_duel_fail') showToast(HU_VO_DUEL_FAIL[msg.reason] || 'Không khiêu chiến được.', 'warn');
    if (msg.type === 'huvo_report') log(`📜 ${sectEscape(msg.name)} đã xong việc: ${sectEscape(msg.title)}.`);
}

/* ---------- lệnh và cơ duyên ---------- */
function huVoQuestId(def) {
    return `${def.kind === 'seed_quest' ? 'hvs' : 'hvo'}_${def.id}`;
}

function huVoOrderQuest(id, def) {
    const seed = def.kind === 'seed';
    return {
        id, loc: def.loc, npc: 'narr', needs: [0, 0], title: `📜 ${sectEscape(def.title)}`,
        intro: [['narr', `${sectEscape(def.from)} truyền lệnh: ${sectEscape(def.text)}`]],
        steps: [seed ? { gather: { loc: def.loc, hours: HU_VO_SEED_HOURS, label: 'Gieo cơ duyên' } } : { hunt: { loc: def.loc, name: def.monster, n: def.n } }],
        reward: { ...HU_VO_ORDER_REWARD, huVoOrder: def.id }
    };
}

function huVoSeedQuest(id, def) {
    const loc = LOCATIONS[def.loc];
    const key = residentKey(loc.id);
    treasureBoss(loc, id, loc.maxR);
    return {
        id, loc: loc.id, npc: 'narr', hidden: true, needs: [loc.minR, 0], title: sectEscape(def.title),
        intro: [[key, sectEscape(def.text)]],
        steps: [{ hunt: { loc: loc.id, name: def.monster, n: HIDDEN_HUNT } }, { boss: id }, { talk: key, loc: loc.id, say: [[key, `Đây là cơ duyên ${sectEscape(def.from)} để lại. Cầm lấy.`]] }],
        reward: { hours: 4, goldRefs: 20, treasure: true }
    };
}

function registerHuVoQuest(def) {
    const loc = LOCATIONS[def.loc];
    const id = huVoQuestId(def);
    if (QUEST_INDEX[id]) return id;
    if (!loc || !/^\w+$/.test(def.id) || !(loc.enemies || []).some(e => e.name === def.monster)) return null;
    const quest = def.kind === 'seed_quest' ? huVoSeedQuest(id, def) : huVoOrderQuest(id, def);
    QUEST_INDEX[id] = quest;
    if (quest.hidden) SIDE_QUESTS.push(quest);
    (state.huVoQuests ||= {})[id] = def;
    return id;
}

function restoreHuVoQuests() {
    Object.values(state.huVoQuests || {}).forEach(registerHuVoQuest);
}

function handleHuVoOrders(msg) {
    huVoOrders = msg.orders || [];
    if (state.huVoDisciple) {
        huVoOrders.filter(order => order.to === state.profileId).forEach(order => {
            const id = registerHuVoQuest(order);
            if (!id) return;
            if (state.questDone.includes(id)) wsSend({ type: 'huvo_order_done', id: order.id });
            else if (!state.questActive.some(rt => rt.id === id)) acceptSideQuest(id);
        });
    }
    renderAll();
}

function reportHuVoOrder(id) {
    wsSend({ type: 'huvo_order_done', id });
}

/* ---------- giao diện ---------- */
function huVoPanelHTML() {
    if (state.huVoChoice && huVoHolder()) {
        const next = huVoNextDisciple();
        const surrender = `<button class="mini-btn" onclick="acceptHuVoDefeat()">🏳️ Đầu hàng (${STAGES[huVoSurrenderStage()]})</button>`;
        if (next) {
            return `<div class="quest-card main"><div class="small">Ngôi Hư Vô</div><b>${sectEscape(next.name)} chặn đường</b>
                <div class="small">Thắng hết đệ tử mới tới được Chủ. Thua một trận thành Hư Vô Đạo Giả Sơ Kỳ.</div>
                <button class="mini-btn" onclick="fightHuVoDisciple()">⚔️ Đấu đệ tử</button>${surrender}</div>`;
        }
        const left = HU_VO_MAX_DUELS - (state.huVoDuels || 0);
        return `<div class="quest-card main"><div class="small">Ngôi Hư Vô</div><b>${sectEscape(huVoHolder().name)} đang đợi ngươi chọn</b>
            <div class="small">Khiêu chiến là PvP thật, Chủ phải online. Còn ${left}/${HU_VO_MAX_DUELS} lần, thua hết thành Hư Vô Đạo Giả Trung Kỳ.</div>
            <button class="mini-btn" onclick="challengeHuVo()">⚔️ Khiêu chiến Chủ</button>${surrender}</div>`;
    }
    if (state.huVoDisciple) {
        const order = huVoCommandable().length ? '<button class="mini-btn" onclick="openHuVoOrders()">📜 Giao việc</button>' : '';
        return `<div class="quest-card main"><div class="small">Hư Vô Đạo Giả · ${STAGES[state.realmStage]}</div><b>Đệ tử của ${sectEscape(huVoThrone?.name || 'Hư Vô Chi Chủ')}</b>${order}</div>`;
    }
    if (isHuVoHolder()) {
        const count = Object.keys(huVoThrone.disciples || {}).length;
        return `<div class="quest-card main"><div class="small">Hư Vô Chi Chủ · ${count} đệ tử</div><b>${(huVoThrone.seeds || []).length} cơ duyên đang gieo ở Giới dưới</b>
            <button class="mini-btn" onclick="openHuVoOrders()">📜 Giao việc</button></div>`;
    }
    if (huVoHolder() && state.realmIndex === REALM_COUNT - 1 && (state.huVoDuels || 0) < HU_VO_MAX_DUELS) {
        return `<div class="quest-card main"><b>Ngôi Hư Vô đang thuộc về ${sectEscape(huVoHolder().name)}</b>
            <button class="mini-btn" onclick="challengeHuVo()">⚔️ Khiêu chiến lại</button></div>`;
    }
    return '';
}

function huVoCommandable() {
    return Object.entries(huVoThrone?.disciples || {}).filter(([id, d]) => id !== state.profileId && (isHuVoHolder() || (state.huVoDisciple && (d.stage || 0) < state.realmStage)));
}

function huVoOrderLocations() {
    return Object.values(LOCATIONS).filter(loc => (loc.enemies || []).length && !EMPTY_WORLDS.includes(loc.world));
}

function huVoMonsterOptions(locId) {
    return LOCATIONS[locId].enemies.map(e => `<option>${e.name}</option>`).join('');
}

function syncHuVoMonsters() {
    $('hvoMonster').innerHTML = huVoMonsterOptions($('hvoLoc').value);
}

function openHuVoOrders() {
    const disciples = huVoCommandable();
    const pending = huVoOrders.filter(order => order.by === state.profileId).map(order => `<div class="small">• ${sectEscape(order.title)} → ${sectEscape(huVoThrone.disciples?.[order.to]?.name || 'đệ tử cũ')}</div>`).join('');
    const locations = huVoOrderLocations();
    openWorldModal('huVoOrderModal', '📜 Giao việc cho đệ tử', disciples.length ? `
        <div class="small">Việc thường: đệ tử diệt quái rồi nhận thưởng. Gieo cơ duyên: đệ tử xuống gieo xong, nơi đó có nhiệm vụ ẩn cho mọi người.</div>
        <select id="hvoTo">${disciples.map(([id, d]) => `<option value="${sectEscape(id)}">${sectEscape(d.name)} · ${STAGES[d.stage || 0]}</option>`).join('')}</select>
        <select id="hvoKind"><option value="hunt">Việc thường</option><option value="seed">Gieo cơ duyên</option></select>
        <select id="hvoLoc" onchange="syncHuVoMonsters()">${locations.map(loc => `<option value="${loc.id}">${loc.name}</option>`).join('')}</select>
        <select id="hvoMonster">${huVoMonsterOptions(locations[0].id)}</select>
        <input id="hvoN" type="number" min="1" max="50" value="10">
        <input id="hvoTitle" maxlength="40" placeholder="Tên nhiệm vụ">
        <textarea id="hvoText" maxlength="200" placeholder="Lời dặn, cũng là lời kể của nhiệm vụ ẩn"></textarea>
        <button class="mini-btn" onclick="sendHuVoOrder()">Giao</button>${pending}` : '<div class="small">Chưa có ai để sai khiến.</div>');
}

function sendHuVoOrder() {
    const title = $('hvoTitle').value.trim();
    const text = $('hvoText').value.trim();
    if (!title || !text) { showToast('Cần tên nhiệm vụ và lời dặn.', 'warn'); return; }
    wsSend({
        type: 'huvo_order', to: $('hvoTo').value, kind: $('hvoKind').value, loc: $('hvoLoc').value,
        monster: $('hvoMonster').value, n: Number($('hvoN').value) || 1, title, text
    });
    $('huVoOrderModal')?.remove();
    log(`📜 Đã giao việc: ${sectEscape(title)}.`);
}
