/* ===========================================================
   TIÊN VỊ — từ Tiên Giới trở lên phải báo danh ở Thiên Đình Điện, lập công để thăng chức.
   - Đột phá các cảnh giới cao cần đủ tiên vị.
   - Công lao có từ lệnh Thiên Đình; đứng đầu bảng tranh công thì lệnh đáng giá hơn.
   - Lệnh Thiên Đình cũng cộng điểm thiên kiêu, tính vào Thiên Hạ Bảng.
=========================================================== */
const TIEN_VI = [
    { name: 'Tiên Đinh', merit: 0, realm: 10 },
    { name: 'Thiên Binh', merit: 30, realm: 12 },
    { name: 'Thiên Tướng', merit: 120, realm: 14 },
    { name: 'Tinh Quân', merit: 400, realm: 16 },
    { name: 'Tiên Quan', merit: 1000, realm: 20 },
    { name: 'Đế Quân', merit: 2500, realm: 26 }
];
const COURT_MERIT_BASE = 10;
const COURT_KILLS = 6;
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

function courtMeritReward() {
    const step = WORLD_TIERS.findIndex(w => w.id === currentLocation().world);
    const base = COURT_MERIT_BASE * Math.pow(2, step);
    return Math.floor(base * (courtBoard()[0].isMe ? COURT_TOP_MULT : 1));
}

function registerTienVi() {
    if (tienViRegistered() || !courtOpenHere()) return;
    state.merit = 0;
    playDialogue([['narr', 'Một tiên lại không ngẩng đầu, chấm bút vào sổ vàng: "Tên, quê quán, tu vi. Từ nay ngươi là người có tên trên trời."'], ['narr', 'Trong sổ đã chi chít những cái tên đang giẫm lên nhau để lập công.']]);
    log(`🏛️ Báo danh Thiên Đình: nhận tiên vị ${tienViName()}.`);
    openCourt();
    renderAll();
}

function acceptCourtOrder() {
    if (!tienViRegistered() || state.court || !courtOpenHere()) return;
    const world = currentLocation().world;
    const pool = Object.values(LOCATIONS).filter(l => l.world === world && (l.enemies || []).length && l.minR <= state.realmIndex);
    const loc = pool[Math.floor(Math.random() * pool.length)];
    const pick = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
    state.court = { loc: loc.id, name: pick.name, need: COURT_KILLS, done: 0 };
    log(`🏛️ Lệnh Thiên Đình: diệt ${COURT_KILLS} ${pick.name} tại ${loc.name}.`);
    openCourt();
    renderAll();
}

function noteCourtKill(unit) {
    const order = state.court;
    if (!order || order.name !== unit.name || order.loc !== state.location) return;
    order.done++;
    if (order.done < order.need) return;
    const before = tienViIndex();
    const merit = courtMeritReward();
    const gold = goldRef(state.realmIndex) * COURT_GOLD_REFS;
    state.merit += merit;
    state.gold += gold;
    state.court = null;
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
    const order = state.court
        ? `<div class="small">Đang nhận lệnh: ${state.court.name} tại ${LOCATIONS[state.court.loc].name} (${state.court.done}/${state.court.need}).</div>`
        : `<button class="mini-btn" onclick="acceptCourtOrder()">📜 Nhận lệnh (+${courtMeritReward()} công lao)</button>`;
    openWorldModal('courtModal', '🏛️ Thiên Đình Điện', `<div><b>${tienViName()}</b> · ${formatNumber(state.merit)} công lao${next ? ` / ${formatNumber(next.merit)}` : ''}</div>
        ${order}
        <div class="small" style="margin-top:10px"><b>Bảng tranh công</b> (đứng đầu được công lao x${COURT_TOP_MULT})</div>${rows}
        <div class="small" style="margin-top:10px"><b>Các bậc tiên vị</b></div>${ranks}`);
}

if (typeof window !== 'undefined') Object.assign(window, { openCourt, registerTienVi, acceptCourtOrder });
