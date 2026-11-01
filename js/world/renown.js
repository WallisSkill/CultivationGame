/* ===========================================================
   THIÊN KIÊU BẢNG — mỗi địa điểm một bảng, điểm là thành thạo khu vực.
   Bảng gồm thiên kiêu bản địa (NPC cố định theo địa điểm), ta,
   và người chơi khác từng thấy online (xem js/social/presence.js).
   Top 3 được người trong khu vực coi trọng: hộ pháp miễn phí,
   đi đường nhanh hơn, cộng ưu đãi riêng theo loại địa điểm.
=========================================================== */
const TIANJIAO_NAMES = [
    'Lạc Thanh Hà', 'Mộ Dung Tuyết', 'Tiêu Viêm Vũ', 'Thẩm Băng Tâm', 'Cổ Trần', 'Bạch Vô Thường', 'Diệp Phong Lâm', 'Hàn Nguyệt',
    'Nam Cung Liệt', 'Âu Dương Sương', 'Tư Đồ Kiếm', 'Vân Khê', 'Lý Trường Sinh', 'Tần Mục Dã', 'Liễu Như Yên', 'Hoa Vô Khuyết',
    'Đông Phương Dạ', 'Lâm Tịch', 'Thượng Quan Vũ', 'Dạ Lưu Ly', 'Sở Cuồng Ca', 'Tô Vãn', 'Bắc Minh Hải', 'Quân Mạc Tà'
];
const TIANJIAO_BASE_SCORE = 20;
const TIANJIAO_BOARD_SIZE = 10;
const THIEN_HA_SHOWN = 5;

/* Chỉ số theo hạng 1, 2, 3 */
const RANK_FREE_GUARDS = [2, 1, 1];
const RANK_TRAVEL_MULT = [0.4, 0.6, 0.8];
const RANK_QI_BONUS = [0.15, 0.10, 0.05];
const RANK_SHOP_DISCOUNT = [0.20, 0.15, 0.10];
const RANK_HUNT_GOLD_BONUS = [0.50, 0.30, 0.15];

function hashText(text) {
    let hash = 7;
    for (const ch of text) hash = (hash * 31 + ch.codePointAt(0)) % 2147483647;
    return hash;
}

function npcTianjiao(locId) {
    const loc = LOCATIONS[locId];
    const seed = hashText(locId);
    if (loc.world === 'hondon') {
        return HONDON_DAO_GIA.map((key, i) => ({ id: `npc_${key}`, name: NPCS[key].name, score: TIANJIAO_BASE_SCORE * renownPoints(loc.maxR) * (HONDON_DAO_GIA.length - i) }));
    }
    return [3, 2, 1].map((weight, i) => ({
        id: `npc_${locId}_${i}`,
        name: TIANJIAO_NAMES[(seed + i * 7) % TIANJIAO_NAMES.length],
        score: TIANJIAO_BASE_SCORE * renownPoints(loc.maxR) * weight
    }));
}

function tianjiaoBoard(locId) {
    const me = { id: 'me', name: state.name, score: state.renown?.[locId] || 0, isMe: true };
    const others = knownPlayerScores(locId);
    return [...npcTianjiao(locId), ...others, me]
        .sort((a, b) => b.score - a.score || (b.isMe ? 1 : 0) - (a.isMe ? 1 : 0))
        .slice(0, TIANJIAO_BOARD_SIZE);
}

function tianjiaoRank(locId) {
    if (!(state.renown?.[locId] > 0)) return 0;
    return tianjiaoBoard(locId).findIndex(entry => entry.isMe) + 1;
}

/* Thiên Hạ Bảng: tổng điểm của từng người trên mọi nơi trong một Giới */
function thienHaBoard(worldId) {
    const totals = new Map();
    const add = (key, entry) => {
        const row = totals.get(key) || { name: entry.name, score: 0, isMe: !!entry.isMe };
        row.score += entry.score;
        totals.set(key, row);
    };
    Object.keys(LOCATIONS).filter(id => LOCATIONS[id].world === worldId).forEach(id => {
        [...npcTianjiao(id), ...knownPlayerScores(id)].forEach(entry => add(entry.name, entry));
        add('me', { name: state.name, score: state.renown?.[id] || 0, isMe: true });
    });
    return [...totals.values()].sort((a, b) => b.score - a.score || (b.isMe ? 1 : 0) - (a.isMe ? 1 : 0));
}

function thienHaRank(worldId) {
    const board = thienHaBoard(worldId);
    const rank = board.findIndex(entry => entry.isMe);
    return board[rank].score > 0 ? rank + 1 : 0;
}

function rankValue(table, locId = state.location) {
    const rank = tianjiaoRank(locId);
    return rank >= 1 && rank <= table.length ? table[rank - 1] : 0;
}

function renownQiMult() {
    return currentLocation().type === 'sect' ? 1 + rankValue(RANK_QI_BONUS) : 1;
}

function renownShopMult() {
    return currentLocation().type === 'town' || currentLocation().type === 'sect' ? 1 - rankValue(RANK_SHOP_DISCOUNT) : 1;
}

function renownGoldMult() {
    const type = currentLocation().type;
    return type === 'wild' || type === 'dungeon' ? 1 + rankValue(RANK_HUNT_GOLD_BONUS) : 1;
}

function renownTravelMult(fromId) {
    return rankValue(RANK_TRAVEL_MULT, fromId) || 1;
}

/* Đi trong khu vực mình đứng top 3: nhanh theo đúng hệ số đi đường */
function renownWalkMult() {
    return 1 / renownTravelMult(state.location);
}

function guardsAllowed() {
    return (state.realmIndex || 0) < OVERSEER_REALM;
}

function renownFreeGuards() {
    return guardsAllowed() ? rankValue(RANK_FREE_GUARDS) : 0;
}

function renownPerkLines(rank) {
    if (rank < 1 || rank > 3) return [];
    const i = rank - 1;
    const type = currentLocation().type;
    const lines = [guardsAllowed() && `🤝 ${RANK_FREE_GUARDS[i]} hộ pháp khu vực miễn phí mỗi trận`, `🐎 Rời khu vực nhanh hơn: thời gian đi x${RANK_TRAVEL_MULT[i]}`, `🏃 Đi trong khu vực nhanh x${(1 / RANK_TRAVEL_MULT[i]).toFixed(2)}`].filter(Boolean);
    if (type === 'sect') lines.push(`💠 Linh khí +${Math.round(RANK_QI_BONUS[i] * 100)}%`);
    if (type === 'town' || type === 'sect') lines.push(`🏪 Giá cửa hàng -${Math.round(RANK_SHOP_DISCOUNT[i] * 100)}%`);
    if ((type === 'wild' || type === 'dungeon') && !NO_MONSTER_WORLDS.includes(currentLocation().world)) lines.push(`💰 Linh thạch từ săn +${Math.round(RANK_HUNT_GOLD_BONUS[i] * 100)}%`);
    return lines;
}

function renownStatusHTML() {
    const rank = tianjiaoRank(state.location);
    if (rank < 1 || rank > 3) return '';
    return `<div class="small">🏆 Thiên kiêu hạng ${rank}: đi đường x${RANK_TRAVEL_MULT[rank - 1]} · đi trong khu vực nhanh x${renownWalkMult().toFixed(2)} · ${RANK_FREE_GUARDS[rank - 1]} hộ pháp miễn phí</div>`;
}

function openTianjiaoBoard() {
    const locId = state.location;
    requestTianjiaoBoard(locId);
    const rows = tianjiaoBoard(locId).map((entry, i) => `<div class="sect-row ${entry.isMe ? 'tj-me' : ''}">
        <span>${i < 3 ? ['🥇', '🥈', '🥉'][i] : `${i + 1}.`} ${sectEscape(entry.name)}</span>
        <b>${formatNumber(entry.score)}</b></div>`).join('');
    const rank = tianjiaoRank(locId);
    const perks = renownPerkLines(rank).map(line => `<div class="small">${line}</div>`).join('');
    const needed = npcTianjiao(locId)[2].score;
    const hint = rank >= 1 && rank <= 3
        ? `<div class="small"><b>Ưu đãi hạng ${rank} tại đây:</b></div>${perks}`
        : worldOf(locId).id === 'hondon'
            ? '<div class="small">Hỗn Độn Hải không có quái để săn, bảng này chỉ có sáu Đạo Giả. Gặp họ để luận đạo: thắng được cộng điểm, thua bị trừ, đối thủ càng cao càng đáng.</div>'
            : `<div class="small">Săn tại đây để tăng điểm, quái cảnh giới càng cao càng nhiều điểm. Cần vượt ${formatNumber(needed)} điểm để vào top 3.</div>`;
    const world = worldOf(locId);
    const board = thienHaBoard(world.id);
    const worldRows = board.slice(0, THIEN_HA_SHOWN).map((entry, i) => `<div class="sect-row ${entry.isMe ? 'tj-me' : ''}">
        <span>${i + 1}. ${sectEscape(entry.name)}</span><b>${formatNumber(entry.score)}</b></div>`).join('');
    const worldRank = thienHaRank(world.id);
    const worldNote = `<div class="small" style="margin-top:10px"><b>Thiên Hạ Bảng — ${world.name}</b> (tổng điểm mọi nơi trong Giới${worldRank ? `, ngươi hạng ${worldRank}` : ''}).${(state.realmIndex || 0) < OVERSEER_REALM ? ' Hạng 1 mới được xuống Giới thấp hơn.' : ''}</div>`;
    openWorldModal('tianjiaoModal', `🏆 Thiên Kiêu Bảng — ${LOCATIONS[locId].name}`, `${hint}${rows}${worldNote}${worldRows}`);
}

function sectHomeLocation() {
    return state.ownSect?.hq || state.sectInfo?.hq || state.sect || null;
}

/* Điểm săn được cộng cho nơi săn, và cộng đúng số đó cho nơi đóng tông môn nếu là nơi khác */
function grantRenown(locId, points) {
    const home = sectHomeLocation();
    [locId, home].filter((id, i) => id && LOCATIONS[id] && (i === 0 || id !== locId)).forEach(id => {
        state.renown[id] = (state.renown[id] || 0) + points;
        log(`🏆 Thiên kiêu +${formatNumber(points)} điểm tại ${LOCATIONS[id].name}.`);
        reportRenown(id);
    });
}

if (typeof window !== 'undefined') Object.assign(window, { openTianjiaoBoard });
