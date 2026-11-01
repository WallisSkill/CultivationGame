/* ===========================================================
   CHỢ ĐEN — hàng đổi theo giờ thật, cấm vật đánh đổi căn cơ, đấu giá với các lão quái
   - Cấm vật dùng ngay khi mua, mỗi món làm tổn căn cơ vĩnh viễn (state.flaw, tính theo %).
   - Căn cơ giảm toàn bộ chỉ số bản thể, không ảnh hưởng phần trang bị.
   - Đấu giá: ra giá xong đối thủ theo tới khi vượt hạn mức riêng của họ.
=========================================================== */
const MARKET_ROTATE_MS = 3600000;
const MARKET_GOODS_SHOWN = 7;
const MARKET_MAX_FLAW = 50;
const MARKET_MAT_AMOUNT = 20;
const MARKET_XP_HOURS = 6;
const MARKET_AGE_SHARE = 0.05;
const MARKET_THEFT_QUALITY = 3;
const MARKET_HEAL = 2;
const FORBIDDEN_XP_HOURS = 48;
const FORBIDDEN_AGE_SHARE = 0.3;
const BLOOD_BUFF_MINUTES = 30;
const BLOOD_BUFF_MULT = 1.5;
const AUCTION_LOTS = 3;
const AUCTION_STEP = 1.2;
const AUCTION_LIMIT_MIN = 1.6;
const AUCTION_LIMIT_SPREAD = 2.4;
const AUCTION_HOLY_QUALITY = 4;

function randomGearSlot() {
    return GEAR_SLOT_IDS[Math.floor(Math.random() * GEAR_SLOT_IDS.length)];
}

function addMarketBoardSlot() {
    state.maxBoardSlots = (state.maxBoardSlots || LB_BOARD_SLOTS) + 1;
    log(`🎴 Trận pháp mở rộng: ${state.maxBoardSlots} ô.`);
}

const MARKET_GOODS = [
    { id: 'mat', icon: '🧱', name: 'Linh Tài Lậu', refs: 15, desc: `${MARKET_MAT_AMOUNT} nguyên liệu rèn của Giới này.`, use: () => { const w = currentLocation().world; state.mats[w] = (state.mats[w] || 0) + MARKET_MAT_AMOUNT; } },
    { id: 'xp', icon: '🌫️', name: 'Tụ Linh Tán', refs: 25, desc: `Cộng tu vi bằng ${MARKET_XP_HOURS} giờ bế quan.`, use: () => gainCultivationHours(MARKET_XP_HOURS) },
    { id: 'age', icon: '🍑', name: 'Diên Thọ Đan', refs: 50, desc: 'Thêm 5% tuổi thọ tối đa.', use: () => { state.maxAge = Math.floor(state.maxAge * (1 + MARKET_AGE_SHARE)); } },
    { id: 'lb', icon: '🏺', name: 'Pháp Bảo Vô Danh', refs: 60, desc: 'Một pháp bảo ngẫu nhiên, không ai biết từ đâu ra.', use: () => grantLinhBaoDrop({ source: 'Chợ Đen', gradeBonus: 0 }) },
    { id: 'gear', icon: '🧥', name: 'Đồ Trộm Từ Tiên Phủ', refs: 120, desc: 'Một món đồ phẩm Tiên đúng cảnh giới, cửa hàng thường không bán.', use: () => addItemToInventory(makeGearItem(state.realmIndex, randomGearSlot(), MARKET_THEFT_QUALITY)) },
    { id: 'heal', icon: '💊', name: 'Bổ Căn Đan', refs: 400, desc: `Hồi ${MARKET_HEAL}% căn cơ đã tổn.`, use: () => { state.flaw = Math.max(0, (state.flaw || 0) - MARKET_HEAL); }, ready: () => (state.flaw || 0) > 0 },
    { id: 'pha_canh', icon: '💥', name: 'Phá Cảnh Đan', refs: 80, flaw: 3, desc: `Cộng tu vi bằng ${FORBIDDEN_XP_HOURS} giờ bế quan.`, use: () => gainCultivationHours(FORBIDDEN_XP_HOURS) },
    { id: 'nghich_tho', icon: '🕯️', name: 'Nghịch Thọ Đan', refs: 100, flaw: 2, desc: 'Thêm 30% tuổi thọ tối đa, lấy từ phần sống của kẻ khác.', use: () => { state.maxAge = Math.floor(state.maxAge * (1 + FORBIDDEN_AGE_SHARE)); } },
    { id: 'huyet_te', icon: '🩸', name: 'Huyết Tế Phù', refs: 60, flaw: 1, desc: `Sức mạnh x${BLOOD_BUFF_MULT} trong ${BLOOD_BUFF_MINUTES} phút giờ thật.`, use: () => { state.bloodBuffUntil = Date.now() + BLOOD_BUFF_MINUTES * 60000; } },
    { id: 'cai_can', icon: '🧬', name: 'Cải Căn Dịch', refs: 200, flaw: 5, desc: 'Tăng một bậc phẩm chất linh căn.', use: () => { state.root.rank = Math.min(ROOT_RANKS.length - 1, state.root.rank + 1); }, ready: () => state.root.rank < ROOT_RANKS.length - 1 }
];

const AUCTION_ITEMS = [
    { id: 'thanh_giap', icon: '🛡️', name: 'Thánh Vật: Đồ Phẩm Thần', refs: 400, desc: 'Một món đồ phẩm Thần đúng cảnh giới.', use: () => addItemToInventory(makeGearItem(state.realmIndex, randomGearSlot(), AUCTION_HOLY_QUALITY)) },
    { id: 'thanh_bao', icon: '🔱', name: 'Thánh Vật: Pháp Bảo Thượng Cổ', refs: 500, desc: 'Pháp bảo giai cao nhất cảnh giới của ngươi dùng được.', use: () => addItemToInventory(makeLinhBao(LINH_BAO[Math.floor(Math.random() * LINH_BAO.length)].id, maxLinhBaoGradeForRealm(state.realmIndex), 1)) },
    { id: 'ma_cot', icon: '🦴', name: 'Cấm Vật: Thiên Ma Cốt', refs: 800, flaw: 8, desc: 'Ghép vào xương sống, mở thêm 1 ô trận pháp.', use: addMarketBoardSlot },
    { id: 'co_thu_dan', icon: '🌳', name: 'Thánh Vật: Cổ Thụ Tâm', refs: 450, desc: 'Thêm 50% tuổi thọ tối đa.', use: () => { state.maxAge = Math.floor(state.maxAge * 1.5); } },
    { id: 'ma_chu', icon: '📕', name: 'Cấm Vật: Ma Chủ Tâm Kinh', refs: 700, flaw: 6, desc: 'Cộng tu vi bằng 7 ngày bế quan.', use: () => gainCultivationHours(168) }
];

function marketPrice(refs) {
    return goldRef(state.realmIndex) * refs;
}

function marketKey() {
    return `${state.location}:${Math.floor(Date.now() / MARKET_ROTATE_MS)}`;
}

function seededPick(list, key, count) {
    return [...list].sort((a, b) => hashText(`${key}${a.id}`) - hashText(`${key}${b.id}`)).slice(0, count);
}

function marketState() {
    const key = marketKey();
    if (state.market?.key === key) return state.market;
    state.market = {
        key,
        sold: [],
        lots: seededPick(AUCTION_ITEMS, key, AUCTION_LOTS).map(item => {
            const rival = TIANJIAO_NAMES[hashText(key + item.id) % TIANJIAO_NAMES.length];
            const spread = (hashText(`${item.id}${key}`) % 100) / 100;
            return { id: item.id, rival, bid: item.refs, limit: item.refs * (AUCTION_LIMIT_MIN + AUCTION_LIMIT_SPREAD * spread), sold: false };
        })
    };
    return state.market;
}

function flawBlocked(item) {
    return !!item.flaw && (state.flaw || 0) + item.flaw > MARKET_MAX_FLAW;
}

function applyMarketItem(item) {
    if (item.flaw) {
        state.flaw = (state.flaw || 0) + item.flaw;
        log(`☠️ ${item.name}: căn cơ tổn ${item.flaw}%, còn ${100 - state.flaw}%.`);
    }
    item.use();
    recalculateStats();
}

function buyMarketGood(id) {
    const item = MARKET_GOODS.find(g => g.id === id);
    const market = marketState();
    if (!currentLocation().blackMarket || market.sold.includes(id) || flawBlocked(item) || (item.ready && !item.ready())) return;
    const price = marketPrice(item.refs);
    if (state.gold < price) { showToast('Không đủ linh thạch.', 'warn'); return; }
    state.gold -= price;
    market.sold.push(id);
    log(`🕯️ Mua ${item.name} (−${formatNumber(price)} linh thạch).`);
    applyMarketItem(item);
    openBlackMarket();
    renderAll();
}

function bidLot(index) {
    const lot = marketState().lots[index];
    const item = AUCTION_ITEMS.find(x => x.id === lot.id);
    if (!currentLocation().blackMarket || lot.sold || flawBlocked(item)) return;
    const next = lot.bid * AUCTION_STEP;
    const price = marketPrice(next);
    if (state.gold < price) { showToast('Không đủ linh thạch để ra giá.', 'warn'); return; }
    const counter = next * AUCTION_STEP;
    if (counter <= lot.limit) {
        lot.bid = counter;
        log(`🔨 ${lot.rival} trả ${formatNumber(marketPrice(counter))} cho ${item.name}.`);
    } else {
        state.gold -= price;
        lot.sold = true;
        log(`🔨 Thắng đấu giá ${item.name}: ${formatNumber(price)} linh thạch. ${lot.rival} bỏ cuộc.`);
        applyMarketItem(item);
    }
    openBlackMarket();
    renderAll();
}

function marketRow(item, action) {
    const flawNote = item.flaw ? ` <span style="color:#ff8a80">Tổn ${item.flaw}% căn cơ</span>` : '';
    return `<div class="market-row"><div><b>${item.icon} ${item.name}</b><div class="small">${item.desc}${flawNote}</div></div>${action}</div>`;
}

function openBlackMarket() {
    const market = marketState();
    const goods = seededPick(MARKET_GOODS.filter(g => !g.ready || g.ready() || market.sold.includes(g.id)), market.key, MARKET_GOODS_SHOWN);
    const goodRows = goods.map(item => {
        const sold = market.sold.includes(item.id);
        const blocked = flawBlocked(item);
        const label = sold ? 'Đã mua' : blocked ? 'Căn cơ quá yếu' : formatNumber(marketPrice(item.refs));
        return marketRow(item, `<button class="mini-btn" ${sold || blocked ? 'disabled' : ''} onclick="buyMarketGood('${item.id}')">${label}</button>`);
    }).join('');
    const lotRows = market.lots.map((lot, i) => {
        const item = AUCTION_ITEMS.find(x => x.id === lot.id);
        const blocked = flawBlocked(item);
        const label = lot.sold ? 'Đã chốt' : blocked ? 'Căn cơ quá yếu' : `Ra ${formatNumber(marketPrice(lot.bid * AUCTION_STEP))}`;
        const status = lot.sold ? '' : `<div class="small">${lot.rival} đang giữ giá ${formatNumber(marketPrice(lot.bid))}</div>`;
        return marketRow(item, `<div>${status}<button class="mini-btn" ${lot.sold || blocked ? 'disabled' : ''} onclick="bidLot(${i})">${label}</button></div>`);
    }).join('');
    openWorldModal('blackMarketModal', '🕯️ Chợ Đen', `<div class="small">Hàng đổi mỗi giờ. Linh thạch: ${formatNumber(state.gold)} · Căn cơ: ${100 - (state.flaw || 0)}%</div>
        <div class="market-head">💠 Vượt Giới</div>
        ${marketRow({ icon: '💠', name: `Tinh Không Thạch (có ${state.starStones || 0})`, desc: `Xuống Giới dưới ${STAR_STONE_MINUTES} phút rồi bị kéo về.` }, `<div><button class="mini-btn" onclick="buyStarStone()">${formatNumber(starStonePrice())}</button>${canUseStarStone() ? '<button class="mini-btn" onclick="useStarStone()">Dùng</button>' : ''}</div>`)}
        <div class="market-head">🕯️ Hàng hôm nay</div>${goodRows}
        <div class="market-head">🔨 Đấu giá</div>${lotRows}`);
}

if (typeof window !== 'undefined') Object.assign(window, { openBlackMarket, buyMarketGood, bidLot });
