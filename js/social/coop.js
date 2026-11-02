/* ===========================
    HỢP TÁC — nhờ đạo hữu hỗ trợ khi đánh boss hoặc PvP
    - Người kích hoạt là chủ phòng: chọn đánh một mình hoặc gọi hỗ trợ rồi đợi có người nhận,
      lúc đợi vẫn có thể vào đánh một mình.
    - Boss: chủ phòng tính trận, người hỗ trợ thành đồng đội với chỉ số và pháp bảo thật,
      trận được phát cho họ xem và họ nhận một nửa phần thưởng.
    - PvP: trận theo lượt giữa hai máy, người hỗ trợ đánh thêm một đòn trợ chiến mỗi lượt của chủ phòng.
    - Phòng tổ đội: chủ phòng mời người vào; thành viên sẵn sàng tự vào mọi trận của chủ phòng,
      kể cả săn quái. Thành viên gửi chỉ số định kỳ, chủ phòng phát danh sách định kỳ.
    - Đưa đi: người cùng phòng cảnh giới bằng hoặc cao hơn nhận lời thì ta đi với thời gian của họ, được qua cả vùng chưa đủ cảnh giới.
      Ai đã mở khóa dịch chuyển tới đó thì đưa ta tới ngay, bất kể cảnh giới và họ đang ở đâu. Chỗ ta chưa đủ cảnh giới vẫn không vào được.
    - Tin nhắn đi qua pvp_relay (sessionId 'coop').
=========================== */
const COOP_SESSION = 'coop';
const COOP_TICK_MS = 250;
const COOP_WATCH_LIMIT = 10;
const COOP_HELP_TIMEOUT_MS = 180000;
const COOP_REWARD_SHARE = 0.5;
const COOP_PVP_ASSIST_MULT = 0.6;
const COOP_MAX_SLOTS = 6;
const COOP_MAX_PACK = 3;
const COOP_PEER_LIMIT = 20;
const COOP_SEND_BUFFER_LIMIT = 16 * 1024;
const COOP_MIRROR_MAX_STEP_MS = 250;

const ROOM_MAX_MEMBERS = 3;
const ROOM_SYNC_MS = 3000;
const ROOM_STALE_MS = 12000;
const RIDE_WAIT_MS = 60000;

const coop = { pending: null, helpers: [], helping: null, tickAt: 0, room: null, joined: null, seenInvite: {}, ride: null, rideAsked: {} };

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
        name: state.name, look: playerLook(), path: state.daoPath,
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

function coopGate(title, start, opponentId = null) {
    if (coopPullRoom(opponentId)) return start(null);
    const peers = coopPeers().filter(id => id !== opponentId);
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
    coop.helpers = [helper];
    coopRelay(msg.from, 'start', { id: p.id, title: p.title });
    p.peers.filter(id => id !== msg.from).forEach(id => coopRelay(id, 'cancel', { id: p.id }));
    log(`🤝 ${helper.name} đến hỗ trợ!`);
    p.start(helper);
}

function coopHelperCombatants() {
    return coop.helpers.map(h => {
        const defs = h.slots.map(slot => ({ ...LINH_BAO_MAP[slot.id], grade: slot.grade, level: slot.level }));
        return Object.assign(lbBaseCombatant(), {
            side: 'player', name: h.name, path: h.path, hp: h.hp, maxHp: h.hp, baseAtk: h.atk, atk: h.atk, def: h.def,
            elements: h.elements, rootRank: h.rootRank, realmIndex: h.realmIndex, realmStage: h.realmStage,
            slots: (defs.length ? defs : [LB_DEFAULT_ATTACK]).map(lbMakeSlot),
            viewLook: { ...h.look, weapon: 'sword' },
            avatar: humanoidSvg({ ...h.look, weapon: 'sword' }, { title: h.name })
        });
    }).map(c => {
        lbApplyPathPassive(c);
        return c;
    });
}

function coopTick(units, kind = 'tick') {
    const now = Date.now();
    if (!coop.helpers.length || now - coop.tickAt < COOP_TICK_MS) return;
    if (window.matchWS?.bufferedAmount > COOP_SEND_BUFFER_LIMIT) return;
    coop.tickAt = now;
    coop.helpers.forEach(h => coopRelay(h.id, kind, { id: h.sid, units }));
}

function coopUnitSpec(c) {
    return {
        side: c.side, name: c.name, path: c.path, maxHp: c.maxHp, kind: c.ref?.kind || null,
        look: c.ref ? c.ref.look || null : c.viewLook || null, realmIndex: c.realmIndex, realmStage: c.realmStage, tier: c.tier || null,
        slots: c.slots.map(slot => ({
            id: slot.def.linhBaoId || slot.def.id, grade: lbGradeOf(slot.def), level: slot.def.level || 1, cooldown: slot.cooldown
        }))
    };
}

function coopBroadcastArena(battle) {
    const units = [...battle.allies, ...battle.foes].map(coopUnitSpec);
    coop.helpers.forEach(h => coopRelay(h.id, 'arena', { id: h.sid, units }));
}

/* Mỗi đơn vị một mảng gọn: máu, khiên, cờ choáng/băng, rồi tiến độ từng ô */
function coopBattleTick(battle) {
    if (!coop.helpers.length || Date.now() - coop.tickAt < COOP_TICK_MS) return;
    const now = performance.now();
    coopTick([...battle.allies, ...battle.foes].map(c => [
        Math.max(0, Math.round(c.hp)), Math.round(c.shield),
        (now < c.stunUntil ? 1 : 0) + (now < c.freezeUntil ? 2 : 0),
        ...c.slots.map(slot => Math.round(slot.elapsed))
    ]), 'arena_tick');
}

function coopFinish(win, reward = null) {
    coop.helpers.forEach(h => coopRelay(h.id, 'end', { id: h.sid, win, reward }));
    coop.helpers = [];
}

function coopBattleEnd(result, enemy) {
    const reward = result === 'win' && enemy ? {
        gold: enemy.gold || 0, xpMinutes: enemy.xpMinutes || 0, realm: enemy.realmIndex,
        renown: enemy.hunted ? { loc: state.location, points: enemyRenownPoints(enemy) } : null
    } : null;
    coopFinish(result === 'win', reward);
}

/* Đối thủ PvP không thể đồng thời là người hỗ trợ của trận đó, ghép ngẫu nhiên chỉ biết tên đối thủ lúc này */
function coopDropOpponent(opponentId) {
    if (coop.helping?.host === opponentId) coopCloseWatch();
    coop.helpers.filter(h => h.id === opponentId).forEach(h => coopRelay(h.id, 'end', { id: h.sid, win: false }));
    coop.helpers = coop.helpers.filter(h => h.id !== opponentId);
}

/* Đòn trợ chiến PvP cộng vào đòn của chủ phòng */
function coopPvpAssist(opponent) {
    let total = 0;
    coop.helpers.forEach(h => {
        const damage = computeDamage(
            h.atk * COOP_PVP_ASSIST_MULT, h.elements, h.rootRank, h.realmIndex, h.realmStage,
            opponent.def, opponent.elements, opponent.rootRank, opponent.realmIndex, opponent.realmStage
        ).final;
        log(`🤝 ${h.name} trợ chiến ${formatNumber(damage)} sát thương.`);
        total += damage;
    });
    if (total) {
        coopTick([
            { name: state.name, side: 'player', hp: Math.round(state.hp), max: state.totalMaxHp },
            { name: state.currentEnemy.name, side: 'enemy', hp: Math.max(0, Math.round(state.currentEnemy.hp - total)), max: state.currentEnemy.maxHp }
        ]);
    }
    return total;
}

/* ---------- phòng tổ đội ---------- */
function coopReady() {
    return !isBusy() && !state.autoTrain && !coop.helping;
}

function roomCreate() {
    if (coop.joined) { showToast('Đang ở phòng khác.', 'warn'); return; }
    coop.room = { members: [] };
    log('🏠 Đã tạo phòng tổ đội.');
    renderRoomPanel();
}

function roomInvite(id) {
    if (!coop.room || coop.room.members.length >= ROOM_MAX_MEMBERS) return;
    if (coopRelay(id, 'room_invite', { name: state.name })) showToast('Đã gửi lời mời.', 'info');
}

function roomKick(id) {
    coopRelay(id, 'room_close', {});
    coop.room.members = coop.room.members.filter(m => m.id !== id);
    renderRoomPanel();
}

function roomClose() {
    if (!coop.room) return;
    coop.room.members.forEach(m => coopRelay(m.id, 'room_close', {}));
    coop.room = null;
    log('🏠 Đã giải tán phòng.');
    renderRoomPanel();
}

function roomLeave() {
    if (!coop.joined) return;
    coopRelay(coop.joined.host, 'room_leave', {});
    log(`🚪 Rời phòng của ${sectEscape(coop.joined.hostName)}.`);
    coop.joined = null;
    renderRoomPanel();
}

function roomOnInvite(msg, name) {
    if (coop.room || coop.joined || coop.seenInvite[msg.from]) return;
    coop.seenInvite[msg.from] = true;
    showDialog({
        message: `🏠 ${sectEscape(name)} mời ngươi vào phòng tổ đội.`,
        buttons: [{ text: 'Từ chối', value: false }, { text: 'Vào phòng', value: true, variant: 'primary' }]
    }).then(ok => {
        delete coop.seenInvite[msg.from];
        if (!ok || coop.room || coop.joined) return;
        coop.joined = { host: msg.from, hostName: name, members: [], seen: Date.now() };
        coopRelay(msg.from, 'room_join', { ally: { ...coopAllyData(), ready: coopReady() } });
        renderRoomPanel();
    });
}

/* Nút nhờ đưa đi nằm trên bản đồ nên phải vẽ lại khi danh sách người đưa thay đổi */
function rideRefresh(carriersBefore) {
    if (roomCarriers().length !== carriersBefore) renderMap();
}

function roomOnAlly(msg, name) {
    const room = coop.room;
    if (!room) return;
    const carriers = roomCarriers().length;
    let member = room.members.find(m => m.id === msg.from);
    const allyText = JSON.stringify(msg.data?.ally ?? null);
    if (member?.allyText === allyText) {
        member.seen = Date.now();
        return;
    }
    if (!member) {
        if (msg.kind !== 'room_join' || room.members.length >= ROOM_MAX_MEMBERS) return;
        member = { id: msg.from };
        room.members.push(member);
        log(`🏠 ${sectEscape(name)} vào phòng.`);
    }
    Object.assign(member, { ally: coopCleanAlly(msg.data?.ally), ready: !!msg.data?.ally?.ready, seen: Date.now(), allyText });
    renderRoomPanel();
    rideRefresh(carriers);
}

/* Kéo thành viên sẵn sàng vào trận sắp bắt đầu; trả về true nếu có ai vào */
function coopPullRoom(excludeId = null) {
    if (!coop.room || coop.helpers.length) return coop.helpers.length > 0;
    const sid = `${state.profileId}_${Date.now().toString(36)}`;
    coop.helpers = coop.room.members.filter(m => m.ready && m.ally && m.id !== excludeId).map(m => ({ id: m.id, sid, ...m.ally }));
    coop.helpers.forEach(h => coopRelay(h.id, 'start', { id: sid, title: state.currentEnemy?.name || 'Trận của tổ đội' }));
    return coop.helpers.length > 0;
}

function roomSync() {
    const now = Date.now();
    if (coop.room) {
        const before = coop.room.members.length;
        coop.room.members = coop.room.members.filter(m => now - m.seen < ROOM_STALE_MS);
        const names = coop.room.members.map(m => ({ id: m.id, name: m.ally.name, ready: m.ready, realmIndex: m.ally.realmIndex }));
        coop.room.members.forEach(m => coopRelay(m.id, 'room_roster', { members: names, hostRealm: state.realmIndex }));
        if (before !== coop.room.members.length) renderRoomPanel();
    }
    if (coop.joined) {
        if (now - coop.joined.seen > ROOM_STALE_MS) {
            log('🏠 Mất kết nối với phòng.');
            coop.joined = null;
            renderRoomPanel();
            return;
        }
        coopRelay(coop.joined.host, 'room_ally', { ally: { ...coopAllyData(), ready: coopReady() } });
    }
}

function renderRoomPanel() {
    const el = document.getElementById('roomPanel');
    if (!el) return;
    if (coop.joined) {
        const rows = coop.joined.members.map(m => `<div class="small">${m.ready ? '🟢' : '🟡'} ${m.name}</div>`).join('');
        el.innerHTML = `<div class="small">Phòng của <b>${sectEscape(coop.joined.hostName)}</b> · ${coopReady() ? 'sẵn sàng' : 'đang bận, không vào trận'}</div>${rows}
            <button class="mini-btn" onclick="roomLeave()">Rời phòng</button>`;
        return;
    }
    if (!coop.room) {
        el.innerHTML = '<div class="small">Tạo phòng rồi mời người khác, thành viên sẽ vào mọi trận của ngươi.</div><button class="mini-btn" onclick="roomCreate()">Tạo phòng</button>';
        return;
    }
    const members = coop.room.members.map(m => `<div class="sect-row"><span class="small">${m.ready ? '🟢' : '🟡'} ${m.ally.name}</span>
        <button class="mini-btn" onclick="roomKick('${m.id}')">Mời ra</button></div>`).join('');
    const inRoom = coop.room.members.map(m => m.id);
    const invites = coop.room.members.length < ROOM_MAX_MEMBERS ? coopPeers().filter(id => !inRoom.includes(id)).map(id => {
        const person = onlinePlayers.get(id) || friendsState.friends.find(f => f.id === id);
        return `<div class="sect-row"><span class="small">${sectEscape(person?.name || id)}</span><button class="mini-btn" onclick="roomInvite('${id}')">Mời</button></div>`;
    }).join('') : '';
    el.innerHTML = `<div class="small">Thành viên ${coop.room.members.length}/${ROOM_MAX_MEMBERS} · 🟢 sẵn sàng 🟡 đang bận</div>${members}
        ${invites ? `<div class="small">Người có thể mời</div>${invites}` : ''}
        <button class="mini-btn" onclick="roomClose()">Giải tán</button>`;
}

/* ---------- đưa đi ---------- */
function roomMates() {
    if (coop.room) return coop.room.members.map(m => ({ id: m.id, name: m.ally.name, realmIndex: m.ally.realmIndex }));
    if (!coop.joined) return [];
    const host = { id: coop.joined.host, name: sectEscape(coop.joined.hostName), realmIndex: coop.joined.hostRealm || 0 };
    return [host, ...coop.joined.members.filter(m => m.id !== state.profileId)];
}

function roomCarriers() {
    return roomMates();
}

function rideAsk(dest) {
    if (!requireFree()) return;
    const carriers = roomCarriers();
    if (!carriers.length) return;
    const id = `${state.profileId}_${Date.now().toString(36)}`;
    coop.ride = { id, dest, carriers: carriers.map(m => m.id), at: Date.now() };
    carriers.forEach(m => coopRelay(m.id, 'ride_ask', { id, from: state.location, dest, realm: state.realmIndex || 0 }));
    openWorldModal('coopModal', `🤝 Nhờ đưa tới ${LOCATIONS[dest].name}`, `<div class="small">Đang đợi ${carriers.map(m => m.name).join(', ')} nhận lời...</div>
        <div class="loc-actions"><button onclick="rideCancel()">Thôi không đợi</button></div>`);
}

function rideCancel() {
    coop.ride = null;
    coopClosePrompt();
}

/* Người đưa tính thời gian bằng tốc độ của chính họ; cảnh giới thấp hơn thì chỉ đưa bằng dịch chuyển */
function rideSeconds(from, dest, askerRealm) {
    if (teleportUnlocked(dest)) return 0;
    if ((state.realmIndex || 0) < askerRealm) return null;
    return findPath(from, dest)?.seconds ?? null;
}

function rideOnAsk(msg, name) {
    const { id, from, dest, realm } = msg.data || {};
    const refuse = () => coopRelay(msg.from, 'ride_no', { id });
    if (typeof id !== 'string' || !Object.hasOwn(LOCATIONS, from ?? '') || !Object.hasOwn(LOCATIONS, dest ?? '')) return;
    if (!roomMates().some(m => m.id === msg.from) || coop.rideAsked[msg.from]) return;
    if (window._battleActive || coop.helping) return refuse();
    coop.rideAsked[msg.from] = true;
    showDialog({
        message: `🤝 ${sectEscape(name)} nhờ đưa từ ${LOCATIONS[from].name} tới ${LOCATIONS[dest].name}.`,
        buttons: [{ text: 'Từ chối', value: false }, { text: 'Đưa đi', value: true, variant: 'primary' }]
    }).then(ok => {
        delete coop.rideAsked[msg.from];
        const seconds = ok ? rideSeconds(from, dest, Number(realm) || 0) : null;
        if (seconds == null) return refuse();
        coopRelay(msg.from, 'ride_ok', { id, seconds });
        log(`🤝 Đưa ${sectEscape(name)} tới ${LOCATIONS[dest].name}.`);
    });
}

function rideRefused(msg) {
    const ride = coop.ride;
    if (!ride || ride.id !== msg.data?.id) return;
    ride.carriers = ride.carriers.filter(id => id !== msg.from);
    if (ride.carriers.length) return;
    rideCancel();
    showToast('Không ai đưa đi được.', 'warn');
}

function rideOnOk(msg, name) {
    const ride = coop.ride;
    const seconds = Number(msg.data?.seconds);
    if (!ride || ride.id !== msg.data?.id || !ride.carriers.includes(msg.from) || !Number.isFinite(seconds)) return;
    rideCancel();
    carriedTravel(ride.dest, seconds, sectEscape(name));
    renderMap();
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
    const hadArena = !!coop.helping?.arena;
    coop.helping = null;
    const modal = document.getElementById('coopWatchModal');
    if (modal) modal.style.display = 'none';
    if (hadArena) {
        syncBattleOverlay();
        renderBoardArena();
    }
}

/* Người hỗ trợ dựng lại đúng khung chiến đấu của chủ phòng từ dữ liệu phát sang */
function coopMirrorUnit(spec) {
    const side = spec?.side === 'enemy' ? 'enemy' : 'player';
    const realmIndex = lbClamp(Number(spec?.realmIndex) || 0, 0, REALMS.length - 1);
    const name = sectEscape(String(spec?.name ?? '').replace(/<[^>]*>/g, '').slice(0, 40));
    const look = spec?.look ? coopCleanLook(spec.look) : null;
    const kind = MONSTER_DRAW[spec?.kind] ? spec.kind : 'human';
    const slots = (Array.isArray(spec?.slots) ? spec.slots : []).slice(0, COOP_WATCH_LIMIT).map(slot => {
        const base = LINH_BAO_MAP[slot?.id] || LB_DEFAULT_ATTACK;
        const def = { ...base, grade: lbClamp(Number(slot?.grade) || 0, 0, LB_MAX_GRADE), level: lbClamp(Number(slot?.level) || 1, 1, LB_MAX_LEVEL) };
        return { def, cooldown: Math.max(0.25, Number(slot?.cooldown) || 2), elapsed: 0, fillNode: null, tileNode: null };
    });
    return Object.assign(lbBaseCombatant(), {
        side, name, path: DAO_PATHS[spec?.path] ? spec.path : null, realmIndex,
        realmStage: lbClamp(Number(spec?.realmStage) || 0, 0, 3), tier: ENEMY_TIERS[spec?.tier] ? spec.tier : null,
        hp: Math.max(1, Number(spec?.maxHp) || 1), maxHp: Math.max(1, Number(spec?.maxHp) || 1), slots,
        avatar: side === 'enemy' ? enemyAvatarSvg({ name, kind, look, realmIndex }) : humanoidSvg(look || defaultLook(), { title: name })
    });
}

function coopOnArena(data) {
    const units = (Array.isArray(data?.units) ? data.units : []).slice(0, COOP_WATCH_LIMIT).map(coopMirrorUnit);
    const allies = units.filter(u => u.side === 'player');
    const foes = units.filter(u => u.side === 'enemy');
    if (!allies.length || !foes.length) return;
    const modal = document.getElementById('coopWatchModal');
    if (modal) modal.style.display = 'none';
    coop.helping.arena = { allies, foes, units };
    syncBattleOverlay();
    lbBuildArenaDOM(coop.helping.arena);
    lbUpdateArena(coop.helping.arena);
    if (!coop.mirrorAt) {
        coop.mirrorAt = performance.now();
        requestAnimationFrame(coopMirrorFrame);
    }
}

/* Giữa hai gói tin thanh hồi chiêu tự chạy tiếp, tới gói sau thì chỉnh lại theo chủ phòng */
function coopMirrorFrame(time) {
    const mirror = coop.helping?.arena;
    if (!mirror) {
        coop.mirrorAt = 0;
        return;
    }
    const step = Math.min(COOP_MIRROR_MAX_STEP_MS, Math.max(0, time - coop.mirrorAt));
    coop.mirrorAt = time;
    mirror.units.forEach(unit => {
        if (unit.hp <= 0 || time < unit.stunUntil || time < unit.freezeUntil) return;
        unit.slots.forEach(slot => {
            const full = slot.cooldown * 1000;
            slot.elapsed = Math.min(full, slot.elapsed + step);
            if (slot.fillNode) slot.fillNode.style.transform = `scaleX(${slot.elapsed / full})`;
        });
    });
    requestAnimationFrame(coopMirrorFrame);
}

function coopOnArenaTick(data) {
    const mirror = coop.helping.arena;
    if (!mirror || !Array.isArray(data?.units)) return;
    coop.helping.at = Date.now();
    const now = performance.now();
    mirror.units.forEach((unit, i) => {
        const next = data.units[i];
        if (!Array.isArray(next)) return;
        const [nextHp, nextShield, flags, ...elapsedList] = next;
        const hp = Math.max(0, Number(nextHp) || 0);
        const delta = Math.round(hp - unit.hp);
        if (delta < 0) lbFloat(unit, `${fmtVal(delta)}`, 'dmg');
        else if (delta > 0) lbFloat(unit, `+${fmtVal(delta)}`, 'heal');
        unit.hp = hp;
        unit.shield = Math.max(0, Number(nextShield) || 0);
        unit.stunUntil = flags & 1 ? now + COOP_TICK_MS * 2 : 0;
        unit.freezeUntil = flags & 2 ? now + COOP_TICK_MS * 2 : 0;
        unit.slots.forEach((slot, s) => {
            const elapsed = Number(elapsedList[s]) || 0;
            if (elapsed < slot.hostElapsed) lbLunge(unit);
            slot.hostElapsed = elapsed;
            slot.elapsed = elapsed;
        });
    });
    lbUpdateArena(mirror);
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
    const renown = reward.renown;
    if (Object.hasOwn(LOCATIONS, renown?.loc ?? '')) {
        const cap = renownPoints(LOCATIONS[renown.loc].maxR) * COOP_MAX_PACK;
        const points = Math.min(cap, Math.max(0, Math.floor(Number(renown.points) || 0)));
        grantRenown(renown.loc, points);
    }
    renderAll();
}

function coopWatchdog() {
    if (coop.helping && Date.now() - coop.helping.at > COOP_HELP_TIMEOUT_MS) coopCloseWatch();
    if (coop.ride && Date.now() - coop.ride.at > RIDE_WAIT_MS) {
        rideCancel();
        showToast('Không ai nhận lời đưa đi.', 'warn');
    }
}

function handleCoopRelay(msg) {
    const known = onlinePlayers.get(msg.from) || friendsState.friends.find(f => f.id === msg.from) || roomMates().find(m => m.id === msg.from);
    if (!known) return;
    const helping = coop.helping && coop.helping.host === msg.from && coop.helping.sid === msg.data?.id;
    switch (msg.kind) {
        case 'room_invite': roomOnInvite(msg, known.name); break;
        case 'room_join':
        case 'room_ally': roomOnAlly(msg, known.name); break;
        case 'room_leave':
            if (coop.room) {
                coop.room.members = coop.room.members.filter(m => m.id !== msg.from);
                renderRoomPanel();
            }
            break;
        case 'room_close':
            if (coop.joined?.host === msg.from) {
                log('🏠 Phòng đã đóng.');
                coop.joined = null;
                renderRoomPanel();
            }
            break;
        case 'room_roster':
            if (coop.joined?.host === msg.from && Array.isArray(msg.data?.members)) {
                const carriers = roomCarriers().length;
                const rosterText = JSON.stringify(msg.data);
                coop.joined.seen = Date.now();
                if (coop.joined.rosterText === rosterText) break;
                coop.joined.rosterText = rosterText;
                coop.joined.hostRealm = lbClamp(Number(msg.data.hostRealm) || 0, 0, REALMS.length - 1);
                coop.joined.members = msg.data.members.slice(0, ROOM_MAX_MEMBERS).map(m => ({
                    id: String(m?.id), name: sectEscape(String(m?.name).slice(0, 60)), ready: !!m?.ready,
                    realmIndex: lbClamp(Number(m?.realmIndex) || 0, 0, REALMS.length - 1)
                }));
                renderRoomPanel();
                rideRefresh(carriers);
            }
            break;
        case 'ride_ask': rideOnAsk(msg, known.name); break;
        case 'ride_ok': rideOnOk(msg, known.name); break;
        case 'ride_no': rideRefused(msg); break;
        case 'ask': coopOnAsk(msg, known.name); break;
        case 'accept': coopOnAccept(msg); break;
        case 'start':
            if (coop.joined?.host === msg.from && !coop.helping && typeof msg.data?.id === 'string') {
                coop.helping = { sid: msg.data.id, host: msg.from, at: Date.now(), started: true, title: String(msg.data.title || '').slice(0, 60) };
                coopRenderWatch(coop.helping.title);
            } else if (helping) {
                coop.helping.started = true;
                coop.helping.title = String(msg.data.title || '').slice(0, 60);
                coopRenderWatch(coop.helping.title);
            }
            break;
        case 'full':
        case 'cancel':
            if (helping && !coop.helping.started) coop.helping = null;
            break;
        case 'arena':
            if (helping) coopOnArena(msg.data);
            break;
        case 'arena_tick':
            if (helping) coopOnArenaTick(msg.data);
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
setInterval(roomSync, ROOM_SYNC_MS);

if (typeof window !== 'undefined') Object.assign(window, { coopCallHelp, coopGoSolo, rideAsk, rideCancel, roomCreate, roomInvite, roomKick, roomClose, roomLeave });
