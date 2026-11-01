/* ===========================================================
   TIÊN VỊ — từ Tiên Giới trở lên phải báo danh ở Thiên Đình Điện, lập công để thăng chức.
   - Đột phá các cảnh giới cao cần đủ tiên vị.
   - Công lao có từ lệnh Thiên Đình; đứng đầu bảng tranh công thì lệnh đáng giá hơn.
   - Lệnh Thiên Đình cũng cộng điểm thiên kiêu, tính vào Thiên Hạ Bảng.
=========================================================== */
const TIEN_VI = [
    { name: 'Tiên Đinh', merit: 0, realm: 10 },
    { name: 'Thiên Binh', merit: 30, realm: 11 },
    { name: 'Thiên Tướng', merit: 90, realm: 12 },
    { name: 'Tinh Quân', merit: 200, realm: 13 },
    { name: 'Tiên Quan', merit: 400, realm: 14 },
    { name: 'Đế Quân', merit: 700, realm: 15 }
];
const COURT_MERIT_BASE = 10;
const COURT_MAX_ORDERS = 5;
const COURT_OFFERS = 6;
/* Độ khó theo mức nguy hiểm của nơi trong Giới của nó; nơi có boss cốt truyện lấy cảnh giới boss */
const COURT_GRADES = [
    { name: 'Thường', upTo: 0.33, mult: 1, kills: 6 },
    { name: 'Khó', upTo: 0.66, mult: 2, kills: 8 },
    { name: 'Hiểm', upTo: 0.99, mult: 3, kills: 10 },
    { name: 'Tử Lệnh', upTo: 1, mult: 5, kills: 12 }
];
const COURT_GOLD_REFS = 10;
const COURT_RENOWN_KILLS = 12;
const COURT_TOP_MULT = 1.5;
const COURT_RIVALS = 5;
const COURT_RIVAL_MIN = 0.4;
const COURT_RIVAL_SPREAD = 0.8;

function courtOpenHere() {
    return currentLocation().world !== 'pham' && hasService('board');
}

function tienViRegistered() {
    return state.merit != null;
}

function tienViIndex() {
    if (!tienViRegistered()) return -1;
    return TIEN_VI.reduce((best, rank, i) => state.merit >= rank.merit ? i : best, 0);
}

function tienViName() {
    return tienViRegistered() ? TIEN_VI[tienViIndex()].name : 'Chưa báo danh';
}

function tienViGate(realm) {
    const need = TIEN_VI.reduce((best, rank, i) => realm >= rank.realm ? i : best, -1);
    if (need < 0 || tienViIndex() >= need) return null;
    return { id: `tienvi_${need}`, title: `Đạt tiên vị ${TIEN_VI[need].name} ở Thiên Đình Điện` };
}

function courtRivals() {
    const next = TIEN_VI[Math.min(TIEN_VI.length - 1, tienViIndex() + 1)];
    return TIANJIAO_NAMES.slice(0, COURT_RIVALS).map(name => ({
        name,
        merit: Math.floor(next.merit * (COURT_RIVAL_MIN + COURT_RIVAL_SPREAD * (hashText(name) % 100) / 100))
    }));
}

function courtBoard() {
    return [...courtRivals(), { name: state.name, merit: state.merit || 0, isMe: true }].sort((a, b) => b.merit - a.merit);
}

const LOCATION_BOSS_REALMS = {};
MAIN_QUESTS.forEach(q => {
    let site = null;
    q.steps.forEach(step => {
        site = step.go || site;
        if (step.boss && site) LOCATION_BOSS_REALMS[site] = Math.max(LOCATION_BOSS_REALMS[site] || 0, BOSSES[step.boss].realm);
    });
});

function courtGrade(loc) {
    const tier = WORLD_TIERS.find(w => w.id === loc.world);
    const danger = LOCATION_BOSS_REALMS[loc.id] ?? (loc.minR + loc.maxR) / 2;
    const share = tier.to > tier.from ? (danger - tier.from) / (tier.to - tier.from) : 1;
    return COURT_GRADES.find(grade => share <= grade.upTo) || COURT_GRADES[COURT_GRADES.length - 1];
}

function courtMeritReward(loc) {
    const step = WORLD_TIERS.findIndex(w => w.id === loc.world);
    const base = COURT_MERIT_BASE * Math.pow(2, step) * courtGrade(loc).mult;
    return Math.floor(base * (courtBoard()[0].isMe ? COURT_TOP_MULT : 1));
}

function courtOffers() {
    const world = currentLocation().world;
    const active = state.courtOrders.map(order => order.loc);
    const offers = (state.courtOffers || []).filter(o => LOCATIONS[o.loc].world === world && !active.includes(o.loc));
    if (offers.length) return state.courtOffers = offers;
    const pool = Object.values(LOCATIONS).filter(l => l.world === world && (l.enemies || []).length && l.minR <= state.realmIndex && !active.includes(l.id));
    state.courtOffers = pool.sort(() => Math.random() - 0.5).slice(0, COURT_OFFERS)
        .map(l => ({ loc: l.id, name: l.enemies[Math.floor(Math.random() * l.enemies.length)].name }));
    return state.courtOffers;
}

function migrateCourtOrders() {
    state.courtOrders = state.courtOrders || [];
    if (!state.court) return;
    state.courtOrders.push(state.court);
    delete state.court;
}

function registerTienVi() {
    if (tienViRegistered() || !courtOpenHere()) return;
    state.merit = 0;
    playDialogue([['narr', 'Một tiên lại không ngẩng đầu, chấm bút vào sổ vàng: "Tên, quê quán, tu vi. Từ nay ngươi là người có tên trên trời."'], ['narr', 'Trong sổ đã chi chít những cái tên đang giẫm lên nhau để lập công.']]);
    log(`🏛️ Báo danh Thiên Đình: nhận tiên vị ${tienViName()}.`);
    openCourt();
    renderAll();
}

function acceptCourtOrder(index) {
    if (!tienViRegistered() || !courtOpenHere() || state.courtOrders.length >= COURT_MAX_ORDERS) return;
    const offer = courtOffers()[index];
    if (!offer) return;
    const loc = LOCATIONS[offer.loc];
    const need = courtGrade(loc).kills;
    state.courtOrders.push({ loc: loc.id, name: offer.name, need, done: 0 });
    state.courtOffers.splice(index, 1);
    log(`🏛️ Lệnh Thiên Đình (${courtGrade(loc).name}): diệt ${need} ${offer.name} tại ${loc.name}.`);
    openCourt();
    renderAll();
}

function noteCourtKill(unit) {
    const order = state.courtOrders.find(o => o.name === unit.name && o.loc === state.location);
    if (!order) return;
    order.done++;
    if (order.done < order.need) return;
    const before = tienViIndex();
    const loc = LOCATIONS[order.loc];
    const merit = courtMeritReward(loc);
    const gold = goldRef(state.realmIndex) * COURT_GOLD_REFS * courtGrade(loc).mult;
    state.merit += merit;
    state.gold += gold;
    state.courtOrders = state.courtOrders.filter(o => o !== order);
    grantRenown(state.location, renownPoints(state.realmIndex) * COURT_RENOWN_KILLS);
    log(`🏛️ Hoàn thành lệnh Thiên Đình: +${merit} công lao, +${formatNumber(gold)} linh thạch.`);
    if (tienViIndex() > before) {
        log(`🏛️ Thăng tiên vị: ${tienViName()}!`);
        showToast(`Thăng tiên vị ${tienViName()}!`, 'info');
        delete state.bottleneckNotice;
        checkRealmProgress();
    }
}

function openCourt() {
    if (!tienViRegistered()) {
        openWorldModal('courtModal', '🏛️ Thiên Đình Điện', `<div class="small">Từ Tiên Giới trở lên, kẻ không có tiên vị không được đột phá tiếp.</div>
            <button class="mini-btn" onclick="registerTienVi()">📝 Báo danh</button>`);
        return;
    }
    const index = tienViIndex();
    const next = TIEN_VI[index + 1];
    const rows = courtBoard().map((entry, i) => `<div class="sect-row ${entry.isMe ? 'tj-me' : ''}">
        <span>${i < 3 ? ['🥇', '🥈', '🥉'][i] : `${i + 1}.`} ${sectEscape(entry.name)}</span><b>${formatNumber(entry.merit)}</b></div>`).join('');
    const ranks = TIEN_VI.map((rank, i) => `<div class="small">${i === index ? '▶ ' : ''}${rank.name}: ${formatNumber(rank.merit)} công lao, cần để lên ${REALMS[rank.realm]}</div>`).join('');
    const orders = state.courtOrders.map(order => `<div class="small">• ${order.name} tại ${LOCATIONS[order.loc].name} (${order.done}/${order.need}) · ${courtGrade(LOCATIONS[order.loc]).name}</div>`).join('');
    const full = state.courtOrders.length >= COURT_MAX_ORDERS;
    const offers = courtOffers().map((offer, i) => {
        const loc = LOCATIONS[offer.loc];
        return `<div class="market-row"><span class="small"><b>${courtGrade(loc).name}</b> · diệt ${courtGrade(loc).kills} ${offer.name} tại ${loc.name}</span>
            <button class="mini-btn" ${full ? 'disabled' : ''} onclick="acceptCourtOrder(${i})">+${courtMeritReward(loc)} công lao</button></div>`;
    }).join('');
    const order = `<div class="small" style="margin-top:8px"><b>Lệnh đang làm ${state.courtOrders.length}/${COURT_MAX_ORDERS}</b></div>${orders}
        <div class="small" style="margin-top:8px"><b>Lệnh có thể nhận</b></div>${offers}`;
    openWorldModal('courtModal', '🏛️ Thiên Đình Điện', `<div><b>${tienViName()}</b> · ${formatNumber(state.merit)} công lao${next ? ` / ${formatNumber(next.merit)}` : ''}</div>
        ${order}
        <div class="small" style="margin-top:10px"><b>Bảng tranh công</b> (đứng đầu được công lao x${COURT_TOP_MULT})</div>${rows}
        <div class="small" style="margin-top:10px"><b>Các bậc tiên vị</b></div>${ranks}`);
}

if (typeof window !== 'undefined') Object.assign(window, { openCourt, registerTienVi, acceptCourtOrder });
