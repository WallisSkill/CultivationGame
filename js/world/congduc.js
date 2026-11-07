/* ===========================================================
   CÔNG ĐỨC LỆNH — ở Thánh Giới, Nguyên Thủy Thiên Tôn giao việc xuống Tiên Giới trừ hại.
   - Nhận lệnh ở Ngọc Hư Cung, đang giữ lệnh thì được xuống Tiên Giới, xong lệnh cuối thì về lại Thánh Giới.
   - Mỗi lệnh xong cho tu vi và công đức; đột phá các cảnh giới Thánh cần đủ công đức.
=========================================================== */
const CONG_DUC_HALL = 'ngoc_hu';
const CONG_DUC_GIVER = 'nguyen_thuy';
const CONG_DUC_WORLD = 'tien';
const CONG_DUC_NEED = { 20: 100, 21: 250, 22: 450 };
const CONG_DUC_BASE = 20;
const CONG_DUC_HOURS = 4;
const CONG_DUC_MAX_ORDERS = 5;
const CONG_DUC_OFFERS = 6;
const CONG_DUC_LAST_REALM = 22;

const CONG_DUC_QUEST = {
    id: 'cd_lenh', loc: CONG_DUC_HALL, npc: CONG_DUC_GIVER, title: 'Công Đức Lệnh', needs: [SAINT_REALM, 0],
    afterMain: MAIN_QUESTS.find(q => q.reward?.flag === 'world_thanh')?.id,
    intro: [[CONG_DUC_GIVER, 'Lên tới đây rồi thì đừng tưởng ngồi yên là thành Thánh. Thiên Đạo ghi công đức, không ghi tu vi.'], ['me', 'Công đức lấy ở đâu?'], [CONG_DUC_GIVER, 'Ở dưới kia. Tiên Giới còn đầy thứ hại người, ta cấp lệnh, ngươi xuống trừ. Đủ công đức thì cửa cảnh giới mới mở.']],
    steps: [{ talk: CONG_DUC_GIVER, loc: CONG_DUC_HALL, say: [[CONG_DUC_GIVER, 'Cầm lấy Công Đức Lệnh. Có lệnh trong tay thì cửa xuống Tiên Giới mở cho ngươi, xong việc thì tự về.'], ['narr', 'Tấm lệnh bài ngọc trắng khắc một chữ Đức, ấm như vừa lấy ra từ lòng bàn tay.']] }],
    reward: { hours: 2, congDuc: true }
};
SIDE_QUESTS.push(CONG_DUC_QUEST);
QUEST_INDEX[CONG_DUC_QUEST.id] = CONG_DUC_QUEST;

function congDucRegistered() {
    return state.congDuc != null;
}

function congDucOpen() {
    return congDucRegistered() && (state.realmIndex || 0) >= SAINT_REALM && (state.realmIndex || 0) <= CONG_DUC_LAST_REALM;
}

function congDucGate(realm) {
    const need = CONG_DUC_NEED[realm];
    if (need == null || (state.congDuc || 0) >= need) return null;
    if (!congDucRegistered()) return { id: `congduc_${realm}`, title: `Nhận Công Đức Lệnh từ ${NPCS[CONG_DUC_GIVER].name} ở ${LOCATIONS[CONG_DUC_HALL].name}` };
    return { id: `congduc_${realm}`, title: `Đủ ${formatNumber(need)} công đức (đang có ${formatNumber(state.congDuc)}): nhận Công Đức Lệnh ở ${LOCATIONS[CONG_DUC_HALL].name}` };
}

function congDucNextNeed() {
    return Object.entries(CONG_DUC_NEED).map(([realm, need]) => ({ realm: +realm, need })).find(x => x.realm > (state.realmIndex || 0));
}

function congDucMerit(loc, realm) {
    return CONG_DUC_BASE * courtGrade(loc, realm).mult;
}

function congDucHours(loc, realm) {
    return CONG_DUC_HOURS * courtGrade(loc, realm).mult;
}

function congDucRewardText(loc, realm) {
    return `+${formatNumber(cultivationSecondsXp(cultivationHoursToSeconds(congDucHours(loc, realm))))} tu vi · +${formatNumber(congDucMerit(loc, realm))} công đức`;
}

function congDucOffers() {
    const active = state.cdOrders.map(order => order.loc);
    const offers = (state.cdOffers || []).filter(o => LOCATIONS[o.loc]?.world === CONG_DUC_WORLD && !active.includes(o.loc));
    if (offers.length) return state.cdOffers = offers;
    const pool = Object.values(LOCATIONS).filter(l => l.world === CONG_DUC_WORLD && (l.enemies || []).length && storyAreaOpen(l.id) && !active.includes(l.id));
    state.cdOffers = pool.sort(() => Math.random() - 0.5).slice(0, CONG_DUC_OFFERS)
        .map(l => ({ loc: l.id, name: l.enemies[Math.floor(Math.random() * l.enemies.length)].name, ...courtRollRank(l) }));
    return state.cdOffers;
}

function migrateCongDuc() {
    state.cdOrders = state.cdOrders || [];
}

function registerCongDuc() {
    if (congDucRegistered()) return;
    state.congDuc = 0;
    log(`📜 Nhận Công Đức Lệnh từ ${NPCS[CONG_DUC_GIVER].name}.`);
}

function acceptCongDucOrder(index) {
    if (!congDucOpen() || state.cdOrders.length >= CONG_DUC_MAX_ORDERS) return;
    const offer = congDucOffers()[index];
    if (!offer) return;
    const loc = LOCATIONS[offer.loc];
    const grade = courtGrade(loc, offer.realm);
    state.cdOrders.push({ loc: loc.id, name: offer.name, realm: offer.realm, stage: offer.stage, need: grade.kills, done: 0 });
    state.cdOffers.splice(index, 1);
    log(`📜 Công Đức Lệnh (${grade.name}): diệt ${grade.kills} ${offer.name} ${courtRankText(offer)} tại ${loc.name}.`);
    openCongDuc();
    renderAll();
}

function congDucDescent(toWorld) {
    return congDucOpen() && (state.cdOrders || []).some(order => LOCATIONS[order.loc].world === toWorld);
}

function noteCongDucKill(unit) {
    const order = (state.cdOrders || []).find(o => o.name === unit.name && o.loc === state.location && o.realm === unit.realmIndex && o.stage === unit.realmStage);
    if (!order) return;
    order.done++;
    if (order.done < order.need) return;
    const loc = LOCATIONS[order.loc];
    const merit = congDucMerit(loc, order.realm);
    state.congDuc = (state.congDuc || 0) + merit;
    state.cdOrders = state.cdOrders.filter(o => o !== order);
    log(`📜 Hoàn thành Công Đức Lệnh: +${merit} công đức.`);
    log(`✨ Tu vi +${formatNumber(gainCultivationHours(congDucHours(loc, order.realm)))}`);
    showToast(`Công đức +${merit}`, 'info');
    delete state.bottleneckNotice;
    checkRealmProgress();
    if (!congDucDescent(loc.world)) setTimeout(() => { if (!window._battleActive) { ascendToWorld(); renderAll(); } }, 1200);
}

function openCongDuc() {
    if (!congDucRegistered()) {
        openWorldModal('congDucModal', '📜 Công Đức Lệnh', `<div class="small">Gặp ${NPCS[CONG_DUC_GIVER].name} để nhận Công Đức Lệnh.</div>`);
        return;
    }
    const next = congDucNextNeed();
    const full = state.cdOrders.length >= CONG_DUC_MAX_ORDERS;
    const orders = state.cdOrders.map(order => `<div class="small">• ${order.name} ${courtRankText(order)} tại ${LOCATIONS[order.loc].name} (${order.done}/${order.need}) · ${courtGrade(LOCATIONS[order.loc], order.realm).name}<br>🎁 ${congDucRewardText(LOCATIONS[order.loc], order.realm)}</div>`).join('');
    const offers = congDucOpen() ? congDucOffers().map((offer, i) => {
        const loc = LOCATIONS[offer.loc];
        const grade = courtGrade(loc, offer.realm);
        return `<div class="market-row"><span class="small"><b>${grade.name}</b> · diệt ${grade.kills} ${offer.name} <b>${courtRankText(offer)}</b> tại ${loc.name}<br>🎁 ${congDucRewardText(loc, offer.realm)}</span>
            <button class="mini-btn" ${full ? 'disabled' : ''} onclick="acceptCongDucOrder(${i})">Nhận</button></div>`;
    }).join('') : '<div class="small">Thiên Đạo không còn ghi công đức cho cảnh giới của ngươi.</div>';
    const needs = Object.entries(CONG_DUC_NEED).map(([realm, need]) => `<div class="small">${+realm === next?.realm ? '▶ ' : ''}${formatNumber(need)} công đức để lên ${REALMS[realm]}</div>`).join('');
    openWorldModal('congDucModal', '📜 Công Đức Lệnh', `<div><b>${formatNumber(state.congDuc)}</b> công đức${next ? ` / ${formatNumber(next.need)} để lên ${REALMS[next.realm]}` : ''}</div>
        <div class="small">Có lệnh trong tay thì được xuống Tiên Giới; xong lệnh cuối ở dưới đó sẽ tự về Thánh Giới.</div>
        <div class="small" style="margin-top:8px"><b>Lệnh đang làm ${state.cdOrders.length}/${CONG_DUC_MAX_ORDERS}</b></div>${orders}
        <div class="small" style="margin-top:8px"><b>Lệnh có thể nhận</b></div>${offers}
        <div class="small" style="margin-top:10px"><b>Mốc công đức</b></div>${needs}`);
}

function congDucCardsHTML() {
    return (state.cdOrders || []).map(c => `<div class="quest-card"><div class="small">Công Đức Lệnh · ${courtGrade(LOCATIONS[c.loc], c.realm).name}</div><b>${c.name}</b><div class="small">${courtRankText(c)} · ${LOCATIONS[c.loc].name} (${c.done}/${c.need})</div><div class="small">🎁 ${congDucRewardText(LOCATIONS[c.loc], c.realm)}</div>
        ${state.location === c.loc ? '' : `<button class="mini-btn" onclick="travelTo('${c.loc}')">Đi ngay</button>`}</div>`).join('');
}

if (typeof window !== 'undefined') Object.assign(window, { openCongDuc, acceptCongDucOrder });
