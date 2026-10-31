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
    return [3, 2, 1].map((weight, i) => ({
        id: `npc_${locId}_${i}`,
        name: TIANJIAO_NAMES[(seed + i * 7) % TIANJIAO_NAMES.length],
        score: TIANJIAO_BASE_SCORE * (loc.minR + 1) * weight
    }));
}

function tianjiaoBoard(locId) {
    const me = { id: 'me', name: state.name, score: state.mastery?.[locId] || 0, isMe: true };
    const others = knownPlayerScores(locId);
    return [...npcTianjiao(locId), ...others, me]
        .sort((a, b) => b.score - a.score || (b.isMe ? 1 : 0) - (a.isMe ? 1 : 0))
        .slice(0, TIANJIAO_BOARD_SIZE);
}

function tianjiaoRank(locId) {
    if (!(state.mastery?.[locId] > 0)) return 0;
    return tianjiaoBoard(locId).findIndex(entry => entry.isMe) + 1;
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

function renownFreeGuards() {
    return rankValue(RANK_FREE_GUARDS);
}

function renownPerkLines(rank) {
    if (rank < 1 || rank > 3) return [];
    const i = rank - 1;
    const type = currentLocation().type;
    const lines = [`🤝 ${RANK_FREE_GUARDS[i]} hộ pháp khu vực miễn phí mỗi trận`, `🐎 Rời khu vực nhanh hơn: thời gian đi x${RANK_TRAVEL_MULT[i]}`];
    if (type === 'sect') lines.push(`💠 Linh khí +${Math.round(RANK_QI_BONUS[i] * 100)}%`);
    if (type === 'town' || type === 'sect') lines.push(`🏪 Giá cửa hàng -${Math.round(RANK_SHOP_DISCOUNT[i] * 100)}%`);
    if (type === 'wild' || type === 'dungeon') lines.push(`💰 Linh thạch từ săn +${Math.round(RANK_HUNT_GOLD_BONUS[i] * 100)}%`);
    return lines;
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
        : `<div class="small">Săn tại đây để tăng điểm. Cần vượt ${formatNumber(needed)} điểm để vào top 3.</div>`;
    openWorldModal('tianjiaoModal', `🏆 Thiên Kiêu Bảng — ${LOCATIONS[locId].name}`, `${hint}${rows}`);
}

if (typeof window !== 'undefined') Object.assign(window, { openTianjiaoBoard });
