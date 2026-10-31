/* ===========================
    HỢP TÁC — nhờ đạo hữu hỗ trợ khi đánh boss hoặc PvP
    - Người kích hoạt là chủ phòng: chọn đánh một mình hoặc gọi hỗ trợ rồi đợi có người nhận,
      lúc đợi vẫn có thể vào đánh một mình.
    - Boss: chủ phòng tính trận, người hỗ trợ thành đồng đội với chỉ số và pháp bảo thật,
      trận được phát cho họ xem và họ nhận một nửa phần thưởng.
    - PvP: trận theo lượt giữa hai máy, người hỗ trợ đánh thêm một đòn trợ chiến mỗi lượt của chủ phòng.
    - Tin nhắn đi qua pvp_relay (sessionId 'coop').
=========================== */
const COOP_SESSION = 'coop';
const COOP_TICK_MS = 400;
const COOP_HELP_TIMEOUT_MS = 180000;
const COOP_REWARD_SHARE = 0.5;
const COOP_PVP_ASSIST_MULT = 0.6;
const COOP_MAX_SLOTS = 6;
const COOP_PEER_LIMIT = 20;

const coop = { pending: null, helper: null, helping: null, tickAt: 0 };

function coopRelay(to, kind, data) {
    return wsSend({ type: 'pvp_relay', to, sessionId: COOP_SESSION, kind, data });
}

function coopPeers() {
    const ids = new Set(playersHere().map(p => p.id));
    friendsState.friends.filter(f => f.online).forEach(f => ids.add(f.id));
    return [...ids].slice(0, COOP_PEER_LIMIT);
}

function coopAllyData() {
    recalculateStats();
    return {
        name: state.name, look: state.look, path: state.daoPath,
        atk: state.totalPower, def: state.totalDef, hp: state.totalMaxHp,
        realmIndex: state.realmIndex, realmStage: state.realmStage,
        rootRank: state.root?.rank || 0, elements: state.root?.elements || [],
        slots: boardItems().filter(Boolean).map(lb => ({ id: lb.linhBaoId || lb.id, grade: lbGradeOf(lb), level: lbLevelOf(lb) }))
    };
}

function coopCleanLook(look) {
    const color = value => (/^#[0-9a-fA-F]{6}$/.test(value) ? value : undefined);
    const clean = {
        body: look?.body === 'f' ? 'f' : 'm', hairStyle: Math.max(0, Math.min(5, Math.floor(Number(look?.hairStyle) || 0))),
        hair: color(look?.hair), robe: color(look?.robe), skin: color(look?.skin), eyes: color(look?.eyes)
    };
    Object.keys(clean).forEach(key => { if (clean[key] === undefined) delete clean[key]; });
    return clean;
}

function coopCleanAlly(data) {
    const num = (value, fallback = 1) => Math.max(1, Math.floor(Number(value) || fallback));
    const slots = (Array.isArray(data?.slots) ? data.slots : []).slice(0, COOP_MAX_SLOTS)
        .filter(slot => LINH_BAO_MAP[slot?.id])
        .map(slot => ({ id: slot.id, grade: lbClamp(Number(slot.grade) || 0, 0, LB_MAX_GRADE), level: lbClamp(Number(slot.level) || 1, 1, LB_MAX_LEVEL) }));
    return {
        name: sectEscape(String(data?.name || 'Đạo hữu').slice(0, 24)),
        look: coopCleanLook(data?.look),
        path: DAO_PATHS[data?.path] ? data.path : null,
        atk: num(data?.atk), def: num(data?.def), hp: num(data?.hp),
        realmIndex: lbClamp(Number(data?.realmIndex) || 0, 0, REALMS.length - 1),
        realmStage: lbClamp(Number(data?.realmStage) || 0, 0, 3),
        rootRank: lbClamp(Number(data?.rootRank) || 0, 0, ROOT_RANKS.length - 1),
        elements: (Array.isArray(data?.elements) ? data.elements : []).filter(e => ELEMENTS.includes(e)),
        slots
    };
}

/* ---------- phía chủ phòng ---------- */
function coopClosePrompt() {
    const modal = document.getElementById('coopModal');
    if (modal) modal.style.display = 'none';
}

function coopGate(title, start) {
    const peers = coopPeers();
    if (!peers.length) return start(null);
    coop.pending = { id: `${state.profileId}_${Date.now().toString(36)}`, title, start, peers, called: false };
    openWorldModal('coopModal', `🤝 ${sectEscape(title)}`, `<div class="small">${peers.length} đạo hữu có thể hỗ trợ.</div>
        <div class="loc-actions">
            <button class="primary" onclick="coopCallHelp()">Gọi hỗ trợ</button>
            <button onclick="coopGoSolo()">Vào đánh một mình</button>
        </div>`);
}

function coopCallHelp() {
    const p = coop.pending;
    if (!p) return;
    p.called = true;
    p.peers.forEach(id => coopRelay(id, 'ask', { id: p.id, title: p.title, name: state.name }));
    openWorldModal('coopModal', `🤝 ${sectEscape(p.title)}`, `<div class="small">Đang đợi đạo hữu nhận lời...</div>
        <div class="loc-actions"><button onclick="coopGoSolo()">Không đợi, vào đánh một mình</button></div>`);
}

function coopGoSolo() {
    const p = coop.pending;
    if (!p) return;
    if (p.called) p.peers.forEach(id => coopRelay(id, 'cancel', { id: p.id }));
    coop.pending = null;
    coopClosePrompt();
    p.start(null);
}

function coopOnAccept(msg) {
    const p = coop.pending;
    if (!p || p.id !== msg.data?.id || !p.called || isBusy()) {
        coopRelay(msg.from, 'full', { id: msg.data?.id });
        return;
    }
    coop.pending = null;
    coopClosePrompt();
    const helper = { id: msg.from, sid: p.id, ...coopCleanAlly(msg.data.ally) };
    coop.helper = helper;
    coopRelay(msg.from, 'start', { id: p.id, title: p.title });
    p.peers.filter(id => id !== msg.from).forEach(id => coopRelay(id, 'cancel', { id: p.id }));
    log(`🤝 ${helper.name} đến hỗ trợ!`);
    p.start(helper);
}

function coopHelperCombatant() {
    const h = coop.helper;
    if (!h) return null;
    const defs = h.slots.map(slot => ({ ...LINH_BAO_MAP[slot.id], grade: slot.grade, level: slot.level }));
    return Object.assign(lbBaseCombatant(), {
        side: 'player', name: h.name, path: h.path, hp: h.hp, maxHp: h.hp, baseAtk: h.atk, atk: h.atk, def: h.def,
        elements: h.elements, rootRank: h.rootRank, realmIndex: h.realmIndex, realmStage: h.realmStage,
        slots: (defs.length ? defs : [LB_DEFAULT_ATTACK]).map(lbMakeSlot),
        avatar: humanoidSvg({ ...h.look, weapon: 'sword' }, { title: h.name })
    });
}

function coopTick(units) {
    const h = coop.helper;
    const now = Date.now();
    if (!h || now - coop.tickAt < COOP_TICK_MS) return;
    coop.tickAt = now;
    coopRelay(h.id, 'tick', { id: h.sid, units });
}

function coopBattleTick(battle) {
    coopTick([...battle.allies, ...battle.foes].map(c => ({
        name: c.name, side: c.side, hp: Math.max(0, Math.round(c.hp)), max: c.maxHp
    })));
}

function coopFinish(win, reward = null) {
    const h = coop.helper;
    if (!h) return;
    coop.helper = null;
    coopRelay(h.id, 'end', { id: h.sid, win, reward });
}

function coopBattleEnd(result, enemy) {
    const reward = result === 'win' && enemy ? { gold: enemy.gold || 0, xpMinutes: enemy.xpMinutes || 0, realm: enemy.realmIndex } : null;
    coopFinish(result === 'win', reward);
}

/* Đòn trợ chiến PvP cộng vào đòn của chủ phòng */
function coopPvpAssist(opponent) {
    const h = coop.helper;
    if (!h) return 0;
    const damage = computeDamage(
        h.atk * COOP_PVP_ASSIST_MULT, h.elements, h.rootRank, h.realmIndex, h.realmStage,
        opponent.def, opponent.elements, opponent.rootRank, opponent.realmIndex, opponent.realmStage
    ).final;
    log(`🤝 ${h.name} trợ chiến ${formatNumber(damage)} sát thương.`);
    coopTick([
        { name: state.name, side: 'player', hp: Math.round(state.hp), max: state.totalMaxHp },
        { name: state.currentEnemy.name, side: 'enemy', hp: Math.max(0, Math.round(state.currentEnemy.hp - damage)), max: state.currentEnemy.maxHp }
    ]);
    return damage;
}

/* ---------- phía người hỗ trợ ---------- */
function coopOnAsk(msg, name) {
    const data = msg.data;
    if (isBusy() || coop.helping || typeof data?.id !== 'string' || typeof data.title !== 'string') return;
    showDialog({
        message: `🤝 ${sectEscape(name)} cầu viện: ${sectEscape(data.title.slice(0, 60))}`,
        buttons: [{ text: 'Bỏ qua', value: false }, { text: 'Đi hỗ trợ', value: true, variant: 'primary' }]
    }).then(ok => {
        if (!ok || isBusy()) return;
        coop.helping = { sid: data.id, host: msg.from, at: Date.now(), started: false };
        coopRelay(msg.from, 'accept', { id: data.id, ally: coopAllyData() });
    });
}

function coopRenderWatch(title, units = []) {
    const rows = units.map(u => {
        const pct = Math.round(Math.max(0, u.hp) / Math.max(1, u.max) * 100);
        return `<div class="small">${u.side === 'enemy' ? '👹' : '🧙'} ${sectEscape(String(u.name)).slice(0, 40)} · ${formatNumber(u.hp)}/${formatNumber(u.max)}</div>
            <div class="bar"><i style="width:${pct}%"></i></div>`;
    }).join('');
    openWorldModal('coopWatchModal', `🤝 Đang hỗ trợ: ${sectEscape(title)}`, rows || '<div class="small">Đang vào trận...</div>');
}

function coopCloseWatch() {
    coop.helping = null;
    const modal = document.getElementById('coopWatchModal');
    if (modal) modal.style.display = 'none';
}

function coopOnEnd(data) {
    coopCloseWatch();
    const reward = data?.reward;
    if (!data?.win || !reward) { log('🤝 Trận hỗ trợ đã kết thúc.'); return; }
    const realm = lbClamp(Number(reward.realm) || 0, 0, REALMS.length - 1);
    const gold = Math.min(Number(reward.gold) || 0, goldRef(realm) * ENEMY_TIERS.Boss.goldMult) * COOP_REWARD_SHARE;
    const minutes = Math.min(Number(reward.xpMinutes) || 0, ENEMY_TIERS.Boss.xpMinutes) * COOP_REWARD_SHARE;
    state.gold += Math.floor(gold);
    const xp = gainCultivationSeconds(battleXpSeconds(minutes));
    log(`🤝 Hỗ trợ thành công: +${formatNumber(gold)} linh thạch, +${formatNumber(xp)} tu vi.`);
    renderAll();
}

function coopWatchdog() {
    if (coop.helping && Date.now() - coop.helping.at > COOP_HELP_TIMEOUT_MS) coopCloseWatch();
}

function handleCoopRelay(msg) {
    const known = onlinePlayers.get(msg.from) || friendsState.friends.find(f => f.id === msg.from);
    if (!known) return;
    const helping = coop.helping && coop.helping.host === msg.from && coop.helping.sid === msg.data?.id;
    switch (msg.kind) {
        case 'ask': coopOnAsk(msg, known.name); break;
        case 'accept': coopOnAccept(msg); break;
        case 'start':
            if (helping) {
                coop.helping.started = true;
                coop.helping.title = String(msg.data.title || '').slice(0, 60);
                coopRenderWatch(coop.helping.title);
            }
            break;
        case 'full':
        case 'cancel':
            if (helping && !coop.helping.started) coop.helping = null;
            break;
        case 'tick':
            if (helping && Array.isArray(msg.data.units)) {
                coop.helping.at = Date.now();
                coopRenderWatch(coop.helping.title, msg.data.units.slice(0, 12));
            }
            break;
        case 'end':
            if (helping) coopOnEnd(msg.data);
            break;
    }
}

setInterval(coopWatchdog, COOP_TICK_MS * 10);

if (typeof window !== 'undefined') Object.assign(window, { coopCallHelp, coopGoSolo });
