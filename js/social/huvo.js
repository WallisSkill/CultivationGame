/* ===========================
    NGÔI HƯ VÔ — sau khi thắng phân thân của Hư Vô Chi Chủ.
    - Phải thắng lần lượt các đệ tử, đánh với chỉ số lúc họ nhập môn. Thua một người, hoặc đầu hàng trước khi thắng hết: Sơ Kỳ.
    - Thắng hết rồi đầu hàng: Hậu Kỳ. Khiêu chiến Chủ mà thua: Trung Kỳ.
    - Khiêu chiến là PvP thật với Chủ đang online, tối đa HU_VO_MAX_DUELS lần thua.
    - Đệ tử mất tên, chỉ được xuống Giới dưới để truyền lời và giao việc. Bậc trên sai bậc dưới.
    - Việc hiện cho mọi người, người nhận đầu tiên hoặc người được chỉ định. Chủ xóa được mọi việc đã giao.
    - Máy chủ giữ đệ tử, lệnh và cơ duyên; bên thắng báo kết quả, bên rời mạng tính là thua.
=========================== */
const HU_VO_MAX_DUELS = 5;
const HU_VO_CLONE_SHARE = 0.2;
const HU_VO_SEED_HOURS = 1;
const HU_VO_DISCIPLE_NAME = 'Hư Vô Đạo Giả';
const HU_VO_DISCIPLE_WORLD = 'chungnguyen';
const HU_VO_ORDER_REWARD = { hours: 4, goldRefs: 20, treasure: true };
const HU_VO_REWARD_LEVELS = [{ label: 'Thưởng nhỏ', hours: 1, goldRefs: 5 }, { label: 'Thưởng vừa', hours: 4, goldRefs: 20, treasure: true }, { label: 'Thưởng lớn', hours: 12, goldRefs: 60, treasure: true }];
const HU_VO_WORKS = { word: '💬 Truyền lời', hunt: '⚔️ Diệt quái', gather: '🌿 Thu thập', boss: '🌑 Cơ duyên ẩn' };

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
    takeHuVoName(HU_VO_DISCIPLE_NAME);
    registerProfile();
    joinHuVoThrone();
    log(`🌌 Ngươi mất tên, thành ${HU_VO_DISCIPLE_NAME}, kẹt mãi ở ${REALMS[state.realmIndex]} ${STAGES[stage]}.`);
    playDialogue(HU_VO_ENTER_LINES);
    playRingTales();
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
    if (msg.type === 'huvo_claim') claimedHuVoSeed(msg);
    if (msg.type === 'huvo_report') log(`📜 ${sectEscape(msg.name)} đã xong việc: ${sectEscape(msg.title)}.`);
}

/* ---------- lệnh và cơ duyên ---------- */
function huVoQuestId(def) {
    return `${def.kind === 'seed_quest' ? 'hvs' : 'hvo'}_${def.id}`;
}

function huVoOrderQuest(id, def) {
    const label = def.work === 'word' ? 'Xuống truyền lời' : 'Xuống giao việc';
    return {
        id, loc: def.loc, npc: 'narr', needs: [0, 0], title: `📜 ${sectEscape(def.title)}`,
        intro: [['narr', `${sectEscape(def.from)} sai ngươi xuống ${LOCATIONS[def.loc].name}: ${sectEscape(def.text)}`]],
        steps: [{ gather: { loc: def.loc, hours: HU_VO_SEED_HOURS, label } }],
        reward: { ...HU_VO_ORDER_REWARD, huVoOrder: def.id }
    };
}

function huVoSeedSteps(id, def, key) {
    const from = sectEscape(def.from);
    const report = { talk: key, loc: def.loc, say: [[key, `Việc ${from} giao đã xong. Cầm lấy.`]] };
    if (def.work === 'word') return [{ talk: key, loc: def.loc, say: [[key, `${from} nhắn ngươi: ${sectEscape(def.text)}`]] }];
    if (def.work === 'hunt') return [{ hunt: { loc: def.loc, name: def.monster, n: def.n } }, report];
    if (def.work === 'gather') return [{ gather: { loc: def.loc, hours: def.n, label: sectEscape(def.title) } }, report];
    treasureBoss(LOCATIONS[def.loc], id, LOCATIONS[def.loc].maxR);
    return [{ hunt: { loc: def.loc, name: def.monster, n: HIDDEN_HUNT } }, { boss: id }, { talk: key, loc: def.loc, say: [[key, `Đây là cơ duyên ${from} để lại. Cầm lấy.`]] }];
}

function huVoSeedQuest(id, def) {
    const loc = LOCATIONS[def.loc];
    const key = residentKey(loc.id);
    const personal = !!def.target && def.target !== 'all';
    const { label, ...level } = HU_VO_REWARD_LEVELS[def.reward ?? 1];
    return {
        id, loc: loc.id, npc: 'narr', hidden: true, needs: personal ? [0, 0] : [loc.minR, 0], title: sectEscape(def.title), huVoSeedId: def.id,
        intro: [[key, def.work === 'word' ? `Có đệ tử của ${sectEscape(def.from)} để lại lời nhắn ở ${loc.name}.` : sectEscape(def.text)]],
        steps: huVoSeedSteps(id, def, key),
        reward: { ...level, ...(personal ? { huVoSeed: def.id } : {}) }
    };
}

function registerHuVoQuest(def) {
    const loc = LOCATIONS[def.loc];
    const id = huVoQuestId(def);
    if (QUEST_INDEX[id]) return id;
    const needsMonster = def.kind === 'seed_quest' && !['word', 'gather'].includes(def.work);
    if (!loc || !/^\w+$/.test(def.id) || (needsMonster && !(loc.enemies || []).some(e => e.name === def.monster))) return null;
    const quest = def.kind === 'seed_quest' ? huVoSeedQuest(id, def) : huVoOrderQuest(id, def);
    QUEST_INDEX[id] = quest;
    if (quest.hidden) SIDE_QUESTS.push(quest);
    (state.huVoQuests ||= {})[id] = def;
    return id;
}

function restoreHuVoQuests() {
    Object.values(state.huVoQuests || {}).forEach(registerHuVoQuest);
    setTimeout(syncHuVoSeeds);
}

function huVoSeedOf(q) {
    return (huVoThrone?.seeds || []).find(seed => seed.id === q.huVoSeedId);
}

function huVoSeedOpen(q) {
    if (!q.huVoSeedId) return true;
    const seed = huVoSeedOf(q);
    if (!seed) return false;
    if (seed.target === 'first') return !seed.claimedBy || seed.claimedBy === state.profileId;
    return !seed.target || seed.target === 'all' || seed.target === state.profileId;
}

function removeHuVoQuest(id, message) {
    if (state.questActive.some(rt => rt.id === id)) log(message);
    state.questActive = state.questActive.filter(rt => rt.id !== id);
    SIDE_QUESTS.splice(0, SIDE_QUESTS.length, ...SIDE_QUESTS.filter(q => q.id !== id));
    delete QUEST_INDEX[id];
    delete state.huVoQuests[id];
}

/* Việc bị Chủ xóa thì tự thu hồi; người được chỉ định nhận ngay */
function syncHuVoSeeds() {
    if (!huVoThrone || !state.questDone) return;
    const seeds = huVoThrone.seeds || [];
    seeds.forEach(registerHuVoQuest);
    Object.keys(state.huVoQuests || {}).filter(id => id.startsWith('hvs_') && !state.questDone.includes(id) && !seeds.some(seed => huVoQuestId(seed) === id))
        .forEach(id => removeHuVoQuest(id, `🌑 Việc "${QUEST_INDEX[id]?.title}" đã bị thu hồi.`));
    seeds.filter(seed => seed.target === state.profileId && QUEST_INDEX[huVoQuestId(seed)] && questOpen(QUEST_INDEX[huVoQuestId(seed)])).forEach(seed => {
        showToast(`🌌 ${sectEscape(seed.from)} chỉ định ngươi.`);
        acceptSideQuest(huVoQuestId(seed));
    });
}

function claimedHuVoSeed(msg) {
    const id = `hvs_${msg.id}`;
    if (msg.ok && QUEST_INDEX[id]) acceptSideQuest(id);
    else showToast('Đã có người nhận việc này trước ngươi.', 'warn');
}

function huVoMayGo(locId) {
    if (!state.huVoDisciple || LOCATIONS[locId].world === HU_VO_DISCIPLE_WORLD) return true;
    return state.questActive.some(rt => rt.id.startsWith('hvo_') && QUEST_INDEX[rt.id]?.loc === locId);
}

function handleHuVoOrders(msg) {
    huVoOrders = msg.orders || [];
    Object.keys(state.huVoQuests || {}).filter(id => id.startsWith('hvo_') && !state.questDone.includes(id) && !huVoOrders.some(order => huVoQuestId(order) === id))
        .forEach(id => removeHuVoQuest(id, `📜 Việc "${QUEST_INDEX[id]?.title}" đã bị thu hồi.`));
    if (state.huVoDisciple) {
        huVoOrders.filter(order => order.to === state.profileId).forEach(order => {
            const id = registerHuVoQuest(order);
            if (!id) return;
            if (state.questDone.includes(id)) wsSend({ type: 'huvo_order_done', id: order.id });
            else if (!state.questActive.some(rt => rt.id === id)) acceptSideQuest(id);
        });
    }
    if (state.questDone) renderAll();
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

function syncHuVoWork() {
    const work = $('hvoWork').value;
    $('hvoMonster').hidden = work === 'word' || work === 'gather';
    $('hvoN').hidden = work === 'word' || work === 'boss';
    $('hvoN').placeholder = work === 'gather' ? 'Số giờ' : 'Số lượng';
    $('hvoTarget').querySelector('[value="all"]').hidden = work === 'word';
    if (work === 'word' && $('hvoTarget').value === 'all') $('hvoTarget').value = 'first';
}

function huVoPeople() {
    const people = new Map();
    friendsState.friends.forEach(f => people.set(f.id, f.name));
    onlinePlayers.forEach(p => people.set(p.id, p.name));
    return people;
}

function huVoTargetText(order) {
    if (order.target === 'all' || !order.target) return 'mọi người';
    if (order.target === 'first') return order.claimedBy ? 'đã có người nhận' : 'người đầu tiên';
    return `chỉ định ${sectEscape(huVoPeople().get(order.target) || 'một người')}`;
}

function huVoOrderRow(order, status) {
    const remove = isHuVoHolder() ? ` <button class="mini-btn" onclick="deleteHuVoOrder('${sectEscape(order.id)}')">🗑️ Xóa</button>` : '';
    return `<div class="small">• ${HU_VO_WORKS[order.work] || '📜'} ${sectEscape(order.title)} · ${LOCATIONS[order.loc]?.name || ''} · ${huVoTargetText(order)} · ${status}${remove}</div>`;
}

function openHuVoOrders() {
    const disciples = huVoCommandable();
    const mine = order => isHuVoHolder() || order.by === state.profileId;
    const rows = [
        ...huVoOrders.filter(mine).map(order => huVoOrderRow(order, 'đệ tử đang xuống')),
        ...(huVoThrone?.seeds || []).filter(mine).map(seed => huVoOrderRow(seed, 'đang hiện ở Giới dưới'))
    ].join('');
    const locations = huVoOrderLocations();
    const form = disciples.length ? `
        <div class="small">Đệ tử xuống tận nơi, xong thì việc mới hiện ở Giới dưới, gặp dân ở nơi đó để nhận. Người được chỉ định nhận ngay.</div>
        <select id="hvoTo">${disciples.map(([id, d], i) => `<option value="${sectEscape(id)}">Đệ tử thứ ${i + 1} · ${STAGES[d.stage || 0]}</option>`).join('')}</select>
        <select id="hvoWork" onchange="syncHuVoWork()">${Object.entries(HU_VO_WORKS).map(([key, label]) => `<option value="${key}">${label}</option>`).join('')}</select>
        <select id="hvoTarget"><option value="first">Người đầu tiên nhận</option><option value="all" hidden>Mọi người</option>${[...huVoPeople()].map(([id, name]) => `<option value="${sectEscape(id)}">🎯 ${sectEscape(name)}</option>`).join('')}</select>
        <select id="hvoLoc" onchange="syncHuVoMonsters()">${locations.map(loc => `<option value="${loc.id}">${loc.name}</option>`).join('')}</select>
        <select id="hvoMonster" hidden>${huVoMonsterOptions(locations[0].id)}</select>
        <input id="hvoN" type="number" min="1" max="50" value="10" hidden>
        <select id="hvoReward">${HU_VO_REWARD_LEVELS.map((level, i) => `<option value="${i}"${i === 1 ? ' selected' : ''}>${level.label}</option>`).join('')}</select>
        <input id="hvoTitle" maxlength="40" placeholder="Tên việc">
        <textarea id="hvoText" maxlength="200" placeholder="Lời truyền, hoặc chi tiết việc giao"></textarea>
        <button class="mini-btn" onclick="sendHuVoOrder()">Giao</button>` : '<div class="small">Chưa có ai để sai khiến.</div>';
    openWorldModal('huVoOrderModal', '📜 Giao việc cho đệ tử', `${form}${rows ? `<div class="tip-head">Việc đã giao</div>${rows}` : ''}`);
}

function sendHuVoOrder() {
    const title = $('hvoTitle').value.trim();
    const text = $('hvoText').value.trim();
    if (!title || !text) { showToast('Cần tên việc và lời dặn.', 'warn'); return; }
    wsSend({
        type: 'huvo_order', to: $('hvoTo').value, work: $('hvoWork').value, target: $('hvoTarget').value, loc: $('hvoLoc').value,
        monster: $('hvoMonster').value, n: Number($('hvoN').value) || 1, reward: Number($('hvoReward').value), title, text
    });
    $('huVoOrderModal')?.remove();
    log(`📜 Đã giao việc: ${sectEscape(title)}.`);
}

function deleteHuVoOrder(id) {
    if (!isHuVoHolder()) return;
    wsSend({ type: 'huvo_order_delete', id });
    $('huVoOrderModal')?.remove();
    log('🗑️ Đã xóa việc đã giao.');
}
