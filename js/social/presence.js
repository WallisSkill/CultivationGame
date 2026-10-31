/* ===========================
    HIỆN DIỆN ONLINE
    - Máy chủ phát hồ sơ cho mọi người mỗi lần 'register', nên ta đăng ký lại định kỳ
      kèm địa điểm và điểm thiên kiêu: ai online đều thấy nhau, không cần kết bạn.
    - Máy chủ không báo khi người lạ rời đi: quá hạn không nghe tin thì coi như đã rời.
    - Vị trí và lời nói gửi qua pvp_relay (sessionId 'world') tới người cùng địa điểm.
    - Điểm của người khác nhớ cục bộ để bảng thiên kiêu còn hiện khi họ offline.
=========================== */
const WORLD_SESSION = 'world';
const PRESENCE_INTERVAL_MS = 15000;
const PRESENCE_EXPIRE_MS = 40000;
const POSITION_SEND_MS = 200;
const POSITION_PEER_LIMIT = 20;
const SAY_MAX_LENGTH = 120;
const SAY_SHOW_MS = 6000;
const RENOWN_SHARED_LOCATIONS = 12;
const RENOWN_CACHE_KEY = 'tt_renown_cache';
const RENOWN_CACHE_MS = 7 * 86400 * 1000;

const onlinePlayers = new Map();
let renownCache = {};
let positionSentAt = 0;

function initPresence() {
    try {
        renownCache = JSON.parse(localStorage.getItem(RENOWN_CACHE_KEY) || '{}');
    } catch (e) {
        console.error('Failed to load renown cache:', e);
    }
    const now = Date.now();
    Object.keys(renownCache).forEach(id => { if (now - renownCache[id].ts > RENOWN_CACHE_MS) delete renownCache[id]; });
    setInterval(sendPresence, PRESENCE_INTERVAL_MS);
    setInterval(expirePlayers, PRESENCE_EXPIRE_MS / 2);
}

function saveRenownCache() {
    try {
        localStorage.setItem(RENOWN_CACHE_KEY, JSON.stringify(renownCache));
    } catch (e) {
        console.error('Failed to save renown cache:', e);
    }
}

function sharedRenown() {
    const entries = Object.entries(state.mastery || {}).sort((a, b) => b[1] - a[1]).slice(0, RENOWN_SHARED_LOCATIONS);
    return Object.fromEntries(entries);
}

function sendPresence() {
    if (window.matchConnected && state.root?.elements) registerProfile();
}

function cleanName(name) {
    return String(name || 'Tu Sĩ').slice(0, 24);
}

function noteProfile(profile) {
    if (!/^[\w-]{1,64}$/.test(profile?.id || '') || profile.id === state.profileId) return;
    const known = onlinePlayers.get(profile.id);
    const loc = LOCATIONS[profile.loc] ? profile.loc : null;
    const player = known || { x: null, y: null, tx: null, ty: null };
    Object.assign(player, {
        id: profile.id, name: cleanName(profile.name), look: profile.look || null, loc,
        realmIndex: Number(profile.realmIndex) || 0, realmStage: Number(profile.realmStage) || 0, lastSeen: Date.now()
    });
    if (known && known.loc !== loc) player.x = player.y = player.tx = player.ty = null;
    onlinePlayers.set(profile.id, player);
    if (profile.renown && typeof profile.renown === 'object') {
        const renown = {};
        Object.entries(profile.renown).forEach(([id, score]) => {
            if (LOCATIONS[id] && Number.isFinite(score) && score > 0) renown[id] = Math.floor(score);
        });
        renownCache[profile.id] = { name: player.name, renown, ts: Date.now() };
        saveRenownCache();
    }
}

function expirePlayers() {
    const limit = Date.now() - PRESENCE_EXPIRE_MS;
    onlinePlayers.forEach((player, id) => { if (player.lastSeen < limit) onlinePlayers.delete(id); });
}

function playersHere() {
    return [...onlinePlayers.values()].filter(p => p.loc === state.location && Date.now() - p.lastSeen < PRESENCE_EXPIRE_MS);
}

function knownPlayerScores(locId) {
    return Object.entries(renownCache)
        .filter(([, entry]) => entry.renown?.[locId] > 0)
        .map(([id, entry]) => ({ id, name: entry.name, score: entry.renown[locId] }));
}

function relayWorld(to, kind, data) {
    return wsSend({ type: 'pvp_relay', to, sessionId: WORLD_SESSION, kind, data });
}

function broadcastHere(kind, data) {
    playersHere().slice(0, POSITION_PEER_LIMIT).forEach(p => relayWorld(p.id, kind, data));
}

function sendPosition(x, y) {
    const now = Date.now();
    if (now - positionSentAt < POSITION_SEND_MS) return;
    positionSentAt = now;
    broadcastHere('pos', { x: Math.round(x), y: Math.round(y), loc: state.location });
}

function sendSay(text) {
    const clean = text.trim().slice(0, SAY_MAX_LENGTH);
    if (!clean) return;
    broadcastHere('say', { text: clean, loc: state.location });
    showSceneBubble(null, clean);
    log(`💬 ${state.name}: ${clean}`);
}

function handleWorldRelay(msg) {
    const player = onlinePlayers.get(msg.from);
    const data = msg.data;
    if (!player || !data || data.loc !== state.location) return;
    player.lastSeen = Date.now();
    player.loc = data.loc;
    if (msg.kind === 'pos' && Number.isFinite(data.x) && Number.isFinite(data.y)) {
        if (player.x == null) { player.x = data.x; player.y = data.y; }
        player.tx = data.x;
        player.ty = data.y;
    } else if (msg.kind === 'say' && typeof data.text === 'string') {
        const text = data.text.slice(0, SAY_MAX_LENGTH);
        showSceneBubble(player, text);
        log(`💬 ${player.name}: ${sectEscape(text)}`);
    }
}

if (typeof window !== 'undefined') Object.assign(window, { sendSay });
