/* ===========================================================
   BẢNG LỆNH CÁC GIỚI CAO — làm lệnh diệt quái để tích điểm, đủ điểm mới đột phá.
   - Công Đức Lệnh (Thánh Giới): Nguyên Thủy Thiên Tôn giao việc xuống Tiên Giới, cho công đức.
   - Ngoại Vực Lệnh (Thiên Ma Ngoại Vực): Lữ Khách Vô Cương giao việc chém yêu ma ngay tại Ngoại Vực, cho chiến tích.
   - Hỗn Độn Lệnh (Hỗn Độn Hải): Đệ Cửu Hỗn Độn giao năm việc ở Ngoại Vực, đủ năm lệnh mới vượt Đạo Giả.
   - Lệnh nào cũng thưởng tu vi và nguyên liệu rèn của Giới nhà.
   - Lệnh ở Giới thấp hơn cho phép xuống đó; xong lệnh cuối ở dưới thì tự về sảnh nhận lệnh.
=========================================================== */
const ORDER_BOARDS = {
    congduc: {
        title: 'Công Đức Lệnh', icon: '📜', hall: 'ngoc_hu', giver: 'nguyen_thuy', hunt: 'tien', home: 'thanh',
        from: SAINT_REALM, to: 22, need: { 20: 100, 21: 250, 22: 450 }, points: 20, hours: 4, mats: 4, maxOrders: 5, offers: 6,
        pointsKey: 'congDuc', ordersKey: 'cdOrders', offersKey: 'cdOffers', unit: 'công đức', afterFlag: 'world_thanh', quest: 'cd_lenh',
        intro: [['nguyen_thuy', 'Lên tới đây rồi thì đừng tưởng ngồi yên là thành Thánh. Thiên Đạo ghi công đức, không ghi tu vi.'], ['me', 'Công đức lấy ở đâu?'], ['nguyen_thuy', 'Ở dưới kia. Tiên Giới còn đầy thứ hại người, ta cấp lệnh, ngươi xuống trừ. Đủ công đức thì cửa cảnh giới mới mở.']],
        say: [['nguyen_thuy', 'Cầm lấy Công Đức Lệnh. Có lệnh trong tay thì cửa xuống Tiên Giới mở cho ngươi, xong việc thì tự về.'], ['narr', 'Tấm lệnh bài ngọc trắng khắc một chữ Đức, ấm như vừa lấy ra từ lòng bàn tay.']],
        closed: 'Thiên Đạo không còn ghi công đức cho cảnh giới của ngươi.'
    },
    ngoaivuc: {
        title: 'Ngoại Vực Lệnh', icon: '⚔️', hall: 'vo_cuong', giver: 'ly_khach', hunt: 'thien', home: 'thien',
        from: 23, to: 28, need: { 24: 100, 25: 220, 26: 360, 27: 520, 28: 700, 29: 900 }, points: 20, hours: 4, mats: 4, maxOrders: 5, offers: 6,
        pointsKey: 'chienTich', ordersKey: 'nvOrders', offersKey: 'nvOffers', unit: 'chiến tích ngoại vực', afterFlag: 'world_thien', quest: 'nv_lenh',
        intro: [['ly_khach', 'Ở Ngoại Vực không ai hỏi ngươi tu bao lâu. Người ta hỏi ngươi đã chém bao nhiêu.'], ['me', 'Chém gì?'], ['ly_khach', 'Yêu ma trôi dạt từ vạn giới chết. Khách trạm ghi chiến tích cho từng người. Không đủ chiến tích thì Thiên Đạo ngoài này không mở cửa cho ngươi lên.']],
        say: [['ly_khach', 'Đây là Ngoại Vực Lệnh. Treo ở thắt lưng, yêu ma nào ngươi chém đúng lệnh thì khách trạm biết.'], ['narr', 'Tấm lệnh bằng sắt đen, mặt sau khắc tên những người cầm nó trước ngươi. Phần lớn đã bị gạch.']],
        closed: 'Khách trạm chỉ ghi chiến tích cho người còn ở Ngoại Vực.'
    },
    hondon: {
        title: 'Hỗn Độn Lệnh', icon: '🌀', hall: 'ma_than_mo', giver: 'hd_thu_cuu', hunt: 'thien', home: 'hondon',
        from: OVERSEER_REALM, to: OVERSEER_REALM, need: { 30: 5 }, points: 1, flatPoints: true, hours: 8, mats: 10, maxOrders: 5, offers: 5,
        pointsKey: 'hdLenh', ordersKey: 'hdOrders', offersKey: 'hdOffers', unit: 'Hỗn Độn Lệnh hoàn thành', afterFlag: 'world_hondon', quest: 'hd_lenh',
        intro: [['hd_thu_cuu', 'Đạo Giả mới. Ngươi tưởng ra tới Hỗn Độn là hết việc?'], ['me', 'Còn việc gì?'], ['hd_thu_cuu', 'Ngoại Vực là cái rốn rỉ ra Hỗn Độn. Ta giao năm việc. Xong đủ năm, ta mới chỉ cho ngươi chỗ hở để bước qua Đạo Giả.']],
        say: [['hd_thu_cuu', 'Hỗn Độn Lệnh. Cầm nó thì ngươi đi lại giữa đây và Ngoại Vực như đi trong nhà.'], ['narr', 'Tấm lệnh không có hình. Nhìn lâu thì thấy chín vệt xoáy, vệt thứ chín còn đang quay.']],
        closed: 'Đệ Cửu Hỗn Độn chỉ giao việc cho Đạo Giả chưa bước qua.'
    }
};

Object.entries(ORDER_BOARDS).forEach(([id, board]) => {
    board.id = id;
    const quest = {
        id: board.quest, loc: board.hall, npc: board.giver, title: board.title, needs: [board.from, 0],
        afterMain: MAIN_QUESTS.find(q => q.reward?.flag === board.afterFlag)?.id,
        intro: board.intro, steps: [{ talk: board.giver, loc: board.hall, say: board.say }],
        reward: { hours: 2, orderBoard: id }
    };
    if (!LOCATION_NPCS[board.hall].includes(board.giver)) LOCATION_NPCS[board.hall].unshift(board.giver);
    SIDE_QUESTS.push(quest);
    QUEST_INDEX[quest.id] = quest;
});

function orderBoard(id) {
    return ORDER_BOARDS[id];
}

function boardRegistered(board) {
    return state[board.pointsKey] != null;
}

function boardOpen(board) {
    const realm = state.realmIndex || 0;
    return boardRegistered(board) && realm >= board.from && realm <= board.to;
}

function boardOrders(board) {
    return state[board.ordersKey] || [];
}

function allBoardOrders() {
    return Object.values(ORDER_BOARDS).flatMap(boardOrders);
}

function boardHallText(board) {
    return `${NPCS[board.giver].name} ở ${LOCATIONS[board.hall].name}`;
}

function boardGate(realm) {
    for (const board of Object.values(ORDER_BOARDS)) {
        const need = board.need[realm];
        if (need == null || (state[board.pointsKey] || 0) >= need) continue;
        if (!boardRegistered(board)) return { id: `${board.id}_${realm}`, title: `Nhận ${board.title} từ ${boardHallText(board)}` };
        return { id: `${board.id}_${realm}`, title: `Đủ ${formatNumber(need)} ${board.unit} (đang có ${formatNumber(state[board.pointsKey])}): nhận ${board.title} ở ${LOCATIONS[board.hall].name}` };
    }
    return null;
}

function boardNextNeed(board) {
    return Object.entries(board.need).map(([realm, need]) => ({ realm: +realm, need })).find(x => x.realm > (state.realmIndex || 0));
}

function boardPoints(board, loc, realm) {
    return board.flatPoints ? board.points : board.points * courtGrade(loc, realm).mult;
}

function boardHours(board, loc, realm) {
    return board.hours * courtGrade(loc, realm).mult;
}

function boardMats(board, loc, realm) {
    return materialYield(state.realmIndex || 0, board.mats * courtGrade(loc, realm).mult);
}

function boardRewardText(board, loc, realm) {
    return `+${formatNumber(cultivationSecondsXp(cultivationHoursToSeconds(boardHours(board, loc, realm))))} tu vi · +${formatNumber(boardPoints(board, loc, realm))} ${board.unit} · +${formatNumber(boardMats(board, loc, realm))} ${MATERIAL_NAMES[board.home]}`;
}

function boardLocFits(board, loc) {
    return loc.world === board.hunt && (loc.enemies || []).length && storyAreaOpen(loc.id) && courtLocFits(loc);
}

function boardOffers(board) {
    const active = boardOrders(board).map(order => order.loc);
    const offers = (state[board.offersKey] || []).filter(o => LOCATIONS[o.loc] && boardLocFits(board, LOCATIONS[o.loc]) && courtRankFits(o) && !active.includes(o.loc));
    if (offers.length) return state[board.offersKey] = offers;
    const pool = Object.values(LOCATIONS).filter(l => boardLocFits(board, l) && !active.includes(l.id));
    state[board.offersKey] = pool.sort(() => Math.random() - 0.5).slice(0, board.offers)
        .map(l => ({ loc: l.id, name: l.enemies[Math.floor(Math.random() * l.enemies.length)].name, ...courtRollRank(l) }));
    return state[board.offersKey];
}

function migrateCongDuc() {
    Object.values(ORDER_BOARDS).forEach(board => { state[board.ordersKey] = state[board.ordersKey] || []; });
}

function registerOrderBoard(id) {
    const board = orderBoard(id);
    if (!board || boardRegistered(board)) return;
    state[board.pointsKey] = 0;
    log(`${board.icon} Nhận ${board.title} từ ${NPCS[board.giver].name}.`);
}

function acceptBoardOrder(id, index) {
    const board = orderBoard(id);
    if (!boardOpen(board) || boardOrders(board).length >= board.maxOrders) return;
    const offer = boardOffers(board)[index];
    if (!offer) return;
    const loc = LOCATIONS[offer.loc];
    const grade = courtGrade(loc, offer.realm);
    state[board.ordersKey].push({ loc: loc.id, name: offer.name, realm: offer.realm, stage: offer.stage, need: grade.kills, done: 0 });
    state[board.offersKey].splice(index, 1);
    log(`${board.icon} ${board.title} (${grade.name}): diệt ${grade.kills} ${offer.name} ${courtRankText(offer)} tại ${loc.name}.`);
    openOrderBoard(id);
    renderAll();
}

function boardDescends(board) {
    return board.hunt !== board.home;
}

function congDucDescent(toWorld) {
    return Object.values(ORDER_BOARDS).some(board => boardDescends(board) && boardOpen(board) && boardOrders(board).some(order => LOCATIONS[order.loc].world === toWorld));
}

function returnToBoardHall(board) {
    if (window._battleActive || currentLocation().world === board.home) return;
    state.activity = null;
    state.location = board.hall;
    log(`🌠 Trở về ${LOCATIONS[board.hall].name}.`);
    checkArrival();
    renderAll();
}

function noteBoardKill(board, unit) {
    const order = boardOrders(board).find(o => o.name === unit.name && o.loc === state.location && o.realm === unit.realmIndex && o.stage === unit.realmStage);
    if (!order) return;
    order.done++;
    if (order.done < order.need) return;
    const loc = LOCATIONS[order.loc];
    const points = boardPoints(board, loc, order.realm);
    const mats = boardMats(board, loc, order.realm);
    state[board.pointsKey] = (state[board.pointsKey] || 0) + points;
    state[board.ordersKey] = boardOrders(board).filter(o => o !== order);
    log(`${board.icon} Hoàn thành ${board.title}: +${formatNumber(points)} ${board.unit}.`);
    log(`✨ Tu vi +${formatNumber(gainCultivationHours(boardHours(board, loc, order.realm)))}`);
    grantMaterial(board.home, mats, board.title);
    showToast(`${board.unit} +${formatNumber(points)}`, 'info');
    delete state.bottleneckNotice;
    checkRealmProgress();
    if (boardDescends(board) && !boardOrders(board).some(o => LOCATIONS[o.loc].world === loc.world)) setTimeout(() => returnToBoardHall(board), 1200);
}

function noteCongDucKill(unit) {
    Object.values(ORDER_BOARDS).forEach(board => noteBoardKill(board, unit));
}

function boardOrderLine(board, order) {
    const loc = LOCATIONS[order.loc];
    return `<div class="small">• ${order.name} ${courtRankText(order)} tại ${loc.name} (${order.done}/${order.need}) · ${courtGrade(loc, order.realm).name}<br>🎁 ${boardRewardText(board, loc, order.realm)}</div>`;
}

function openOrderBoard(id) {
    const board = orderBoard(id);
    const modal = `${board.id}BoardModal`;
    const heading = `${board.icon} ${board.title}`;
    if (!boardRegistered(board)) {
        openWorldModal(modal, heading, `<div class="small">Gặp ${boardHallText(board)} để nhận ${board.title}.</div>`);
        return;
    }
    const orders = boardOrders(board);
    const next = boardNextNeed(board);
    const full = orders.length >= board.maxOrders;
    const offers = boardOpen(board) ? boardOffers(board).map((offer, i) => {
        const loc = LOCATIONS[offer.loc];
        const grade = courtGrade(loc, offer.realm);
        return `<div class="market-row"><span class="small"><b>${grade.name}</b> · diệt ${grade.kills} ${offer.name} <b>${courtRankText(offer)}</b> tại ${loc.name}<br>🎁 ${boardRewardText(board, loc, offer.realm)}</span>
            <button class="mini-btn" ${full ? 'disabled' : ''} onclick="acceptBoardOrder('${board.id}', ${i})">Nhận</button></div>`;
    }).join('') || '<div class="small">Chưa có nơi nào hợp cảnh giới của ngươi.</div>' : `<div class="small">${board.closed}</div>`;
    const huntWorld = WORLD_TIERS.find(w => w.id === board.hunt).name;
    const rule = boardDescends(board)
        ? `Có lệnh trong tay thì được xuống ${huntWorld}; xong lệnh cuối ở dưới đó sẽ tự về ${LOCATIONS[board.hall].name}.`
        : `Lệnh làm ngay tại ${huntWorld}.`;
    const needs = Object.entries(board.need).map(([realm, need]) => `<div class="small">${+realm === next?.realm ? '▶ ' : ''}${formatNumber(need)} ${board.unit} để lên ${REALMS[realm]}</div>`).join('');
    openWorldModal(modal, heading, `<div><b>${formatNumber(state[board.pointsKey])}</b> ${board.unit}${next ? ` / ${formatNumber(next.need)} để lên ${REALMS[next.realm]}` : ''}</div>
        <div class="small">${rule} Mỗi lệnh xong cũng cho ${MATERIAL_NAMES[board.home]}.</div>
        <div class="small" style="margin-top:8px"><b>Lệnh đang làm ${orders.length}/${board.maxOrders}</b></div>${orders.map(order => boardOrderLine(board, order)).join('')}
        <div class="small" style="margin-top:8px"><b>Lệnh có thể nhận</b></div>${offers}
        <div class="small" style="margin-top:10px"><b>Mốc ${board.unit}</b></div>${needs}`);
}

function boardStatLine(board) {
    const realm = state.realmIndex || 0;
    if (!boardRegistered(board)) return realm >= board.from && realm <= board.to ? `<div>${board.icon} ${board.title}: <span style="color:#fff">chưa nhận</span> · gặp ${boardHallText(board)}</div>` : '';
    if (realm > board.to && !boardOrders(board).length) return '';
    const next = boardNextNeed(board);
    const have = state[board.pointsKey] || 0;
    const goal = next ? ` / ${formatNumber(next.need)} để lên ${REALMS[next.realm]}` : '';
    const short = next && have < next.need ? ` <span style="color:#ff9a9a">(thiếu ${formatNumber(next.need - have)})</span>` : '';
    return `<div>${board.icon} ${board.unit[0].toUpperCase()}${board.unit.slice(1)}: <span style="color:#fff">${formatNumber(have)}</span>${goal}${short} · ${boardOrders(board).length}/${board.maxOrders} lệnh đang làm</div>`;
}

function congDucStatHTML() {
    return Object.values(ORDER_BOARDS).map(boardStatLine).join('');
}

function congDucCardsHTML() {
    return Object.values(ORDER_BOARDS).flatMap(board => boardOrders(board).map(c => {
        const loc = LOCATIONS[c.loc];
        return `<div class="quest-card"><div class="small">${board.title} · ${courtGrade(loc, c.realm).name}</div><b>${c.name}</b><div class="small">${courtRankText(c)} · ${loc.name} (${c.done}/${c.need})</div><div class="small">🎁 ${boardRewardText(board, loc, c.realm)}</div>
        ${state.location === c.loc ? '' : `<button class="mini-btn" onclick="travelTo('${c.loc}')">Đi ngay</button>`}</div>`;
    })).join('');
}

function boardSpots(loc) {
    return Object.values(ORDER_BOARDS).filter(board => loc.id === board.hall && boardRegistered(board));
}

if (typeof window !== 'undefined') Object.assign(window, { openOrderBoard, acceptBoardOrder });
