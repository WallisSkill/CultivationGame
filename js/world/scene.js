/* ===========================================================
   BẢN ĐỒ BÊN TRONG — canvas nhìn từ trên xuống, đi bằng WASD / mũi tên / bấm chuột.
   Mỗi địa điểm sinh cảnh theo id: công trình xếp vòng quanh sân,
   cây đá làm vật cản, E để tương tác. Người chơi khác lấy từ presence.js.
=========================================================== */
const SCENE_W = 1400;
const SCENE_H = 900;
const SCENE_VIEW_MIN_W = 960;
let sceneViewW = SCENE_VIEW_MIN_W;
const SCENE_VIEW_BASE_H = 540;
let sceneViewH = SCENE_VIEW_BASE_H;
const SCENE_SPEED = 240;
const SCENE_PLAYER_R = 16;
const SCENE_INTERACT_R = 80;
const SCENE_AVATAR_W = 52;
const SCENE_AVATAR_H = 70;
const SCENE_DECOR_COUNT = 46;
const SCENE_MAX_DT = 0.05;
const SCENE_INNER_RING = 0.68;

const sceneState = {
    view: 'scene', locId: null, x: SCENE_W / 2, y: SCENE_H - 150, tx: null, ty: null,
    keys: new Set(), spots: [], decor: [], nearest: null, lastFrame: 0, bubble: null, canvas: null, ctx: null, images: new Map()
};

function sceneSpots(loc) {
    const spots = [];
    const add = (icon, label, action, available = true, id = null) => { if (available) spots.push({ icon, label, action, id }); };
    const huntable = (loc.enemies || []).length > 0;
    add('🧘', state.autoTrain ? 'Đứng dậy' : 'Ngồi bế quan', () => toggleMeditate(), true, 'meditate');
    add('🏆', 'Thiên Kiêu Bảng', () => openTianjiaoBoard());
    add('🗡️', 'Săn quái', () => startHunt(), huntable);
    add('🧭', 'Thám hiểm', () => startExplore());
    add('🏪', 'Cửa hàng', () => openServiceShop(), hasService('shop'));
    add('🔨', 'Lò rèn', () => openForge(), hasService('forge'));
    add('📜', 'Bảng treo thưởng', () => acceptBounty(), hasService('board') && !state.bounty);
    add('🤝', `Thuê hộ pháp ${state.hired}/${HIRE_MAX}`, () => hireGuard(), hasService('shop'));
    add('⛩️', `Nhập ${loc.name}`, () => joinSect(loc.id), loc.type === 'sect' && state.sect !== loc.id && !state.ownSect);
    add(DAO_PATHS[loc.path]?.icon, 'Truyền thừa', () => openDaoHall(), !!loc.path);
    add(DAO_PATHS[loc.path]?.icon, `Chuyển ${DAO_PATHS[loc.path]?.name}`, () => setDaoPath(loc.path), !!loc.path && state.daoPath !== loc.path);
    add('⚔️', window._findingMatch ? 'Dừng tìm đối thủ' : 'Đấu trường xếp hạng', () => window.findMatchPvP(), loc.type === 'town' || loc.type === 'sect');
    add('📊', 'Bảng PvP', () => openRankedBoard(), loc.type === 'sect');
    add('🐉', 'Boss Thế Giới', () => openWorldBoss(), loc.type === 'town' || loc.type === 'sect');
    SIDE_QUESTS.filter(q => q.loc === loc.id && !state.questDone.includes(q.id)
        && !state.questActive.some(rt => rt.id === q.id) && needsMet(q))
        .forEach(q => add('❓', `${NPCS[q.npc].name}: ${q.title}`, () => acceptSideQuest(q.id)));
    add('❗', 'Nhiệm vụ', () => questAction(mainQuestRuntime()?.id), !!mainQuestRuntime());
    const radiusX = SCENE_W / 2 - 170, radiusY = SCENE_H / 2 - 140;
    spots.forEach((spot, i) => {
        const angle = Math.PI * (1.08 + 0.84 * (spots.length > 1 ? i / (spots.length - 1) : 0.5));
        const ring = i % 2 ? SCENE_INNER_RING : 1;
        spot.x = SCENE_W / 2 + Math.cos(angle) * radiusX * ring;
        spot.y = SCENE_H / 2 + 40 + Math.sin(angle) * radiusY * ring;
    });
    spots.push({ icon: '🚪', label: 'Ra bản đồ', action: () => setWorldView('map'), x: SCENE_W / 2, y: SCENE_H - 60 });
    return spots;
}

function meditateSpot() {
    return sceneState.spots.find(spot => spot.id === 'meditate');
}

function toggleMeditate() {
    if (state.autoTrain) return standUp();
    if (window._battleActive) return;
    if (state.activity) { showToast(`Đang bận: ${state.activity.label}.`, 'warn'); return; }
    const spot = meditateSpot();
    sceneState.x = spot.x;
    sceneState.y = spot.y + 46;
    sceneState.tx = sceneState.ty = null;
    state.autoTrain = true;
    log('🧘 Ngồi xuống bế quan. Tu vi tăng theo thời gian thực, kể cả khi đóng game.');
    renderAll();
}

function standUp() {
    if (!state.autoTrain) return;
    state.autoTrain = false;
    log('🚶 Đứng dậy, dừng bế quan.');
    renderAll();
}

function sceneDecor(locId, spots) {
    const out = [];
    let v = hashText(locId) + 11;
    const rand = () => (v = (v * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < SCENE_DECOR_COUNT; i++) {
        const d = { x: 40 + rand() * (SCENE_W - 80), y: 40 + rand() * (SCENE_H - 80), r: 16 + rand() * 18, k: rand() };
        const clear = spots.every(s => Math.hypot(s.x - d.x, s.y - d.y) > 100)
            && Math.hypot(SCENE_W / 2 - d.x, SCENE_H / 2 + 100 - d.y) > 240
            && Math.abs(d.x - SCENE_W / 2) > 70;
        if (clear) out.push(d);
    }
    return out;
}

function enterScene() {
    const loc = currentLocation();
    sceneState.locId = loc.id;
    sceneState.x = SCENE_W / 2;
    sceneState.y = SCENE_H - 150;
    sceneState.tx = sceneState.ty = null;
    refreshSceneSpots();
    sceneState.decor = sceneDecor(loc.id, sceneState.spots);
    const seat = meditateSpot();
    if (state.autoTrain) {
        sceneState.x = seat.x;
        sceneState.y = seat.y + 46;
    }
}

function refreshSceneSpots() {
    sceneState.spots = sceneSpots(currentLocation());
}

function sceneBlocked(x, y) {
    if (x < SCENE_PLAYER_R || y < SCENE_PLAYER_R || x > SCENE_W - SCENE_PLAYER_R || y > SCENE_H - SCENE_PLAYER_R) return true;
    return sceneState.decor.some(d => Math.hypot(d.x - x, d.y - y) < d.r + SCENE_PLAYER_R - 6);
}

function sceneMove(dt) {
    const s = sceneState;
    let dx = 0, dy = 0;
    if (s.keys.has('a') || s.keys.has('arrowleft')) dx -= 1;
    if (s.keys.has('d') || s.keys.has('arrowright')) dx += 1;
    if (s.keys.has('w') || s.keys.has('arrowup')) dy -= 1;
    if (s.keys.has('s') || s.keys.has('arrowdown')) dy += 1;
    if (dx || dy) {
        s.tx = s.ty = null;
    } else if (s.tx != null) {
        dx = s.tx - s.x;
        dy = s.ty - s.y;
        if (Math.hypot(dx, dy) < 6) { s.tx = s.ty = null; dx = dy = 0; }
    }
    const len = Math.hypot(dx, dy);
    if (!len || window._battleActive || state.activity?.type === 'travel') return;
    standUp();
    const step = SCENE_SPEED * renownWalkMult() * dt / len;
    const nx = s.x + dx * step, ny = s.y + dy * step;
    const movedX = !sceneBlocked(nx, s.y);
    if (movedX) s.x = nx;
    const movedY = !sceneBlocked(s.x, ny);
    if (movedY) s.y = ny;
    if (!movedX && !movedY) s.tx = s.ty = null;
    sendPosition(s.x, s.y);
}

function sceneNearest() {
    let best = null, bestDist = SCENE_INTERACT_R;
    sceneState.spots.forEach(spot => {
        const dist = Math.hypot(spot.x - sceneState.x, spot.y - sceneState.y);
        if (dist < bestDist) { best = spot; bestDist = dist; }
    });
    playersHere().forEach(p => {
        if (p.x == null) return;
        const dist = Math.hypot(p.x - sceneState.x, p.y - sceneState.y);
        if (dist < bestDist) { best = { player: p, label: `Gặp ${p.name}`, action: () => openPlayerCard(p.id) }; bestDist = dist; }
    });
    return best;
}

function sceneInteract() {
    if (window._battleActive) return;
    sceneState.nearest?.action();
}

function openPlayerCard(id) {
    const p = onlinePlayers.get(id);
    if (!p) return;
    const isFriend = friendsState.friends.some(f => f.id === id);
    openWorldModal('playerCardModal', sectEscape(p.name), `<div class="small">${REALMS[p.realmIndex] || ''} ${STAGES[p.realmStage] || ''}</div>
        <div class="loc-actions">
            ${isFriend ? `<button onclick="openChat('${id}')">💬 Chat</button>` : `<button id="playerFriendBtn">🤝 Kết bạn</button>`}
            <button onclick="inviteFriendToPvP('${id}', document.querySelector('#playerCardModal b').textContent)">⚔️ Thách đấu</button>
        </div>`);
    const btn = document.getElementById('playerFriendBtn');
    if (btn) btn.onclick = () => { sendFriendRequest(id, p.name); document.getElementById('playerCardModal').style.display = 'none'; };
}

/* ---------- vẽ ---------- */
function sceneImage(key, svg) {
    let image = sceneState.images.get(key);
    if (!image) {
        image = new Image();
        image.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
        sceneState.images.set(key, image);
    }
    return image;
}

function drawUnit(ctx, image, x, y, name, color) {
    ctx.fillStyle = 'rgba(0,0,0,.3)';
    ctx.beginPath();
    ctx.ellipse(x, y, 18, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    if (image.complete && image.naturalWidth) ctx.drawImage(image, x - SCENE_AVATAR_W / 2, y - SCENE_AVATAR_H + 6, SCENE_AVATAR_W, SCENE_AVATAR_H);
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.strokeText(name, x, y - SCENE_AVATAR_H);
    ctx.fillStyle = color;
    ctx.fillText(name, x, y - SCENE_AVATAR_H);
}

function drawBubble(ctx, x, y, text) {
    ctx.font = '14px sans-serif';
    const w = Math.min(320, ctx.measureText(text).width + 18);
    ctx.fillStyle = 'rgba(255,255,255,.92)';
    ctx.fillRect(x - w / 2, y - SCENE_AVATAR_H - 44, w, 24);
    ctx.fillStyle = '#111';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y - SCENE_AVATAR_H - 27, w - 10);
}

/* Màn rộng nhìn được nhiều cảnh hơn thay vì chừa dải đen */
function fitSceneView() {
    const canvas = sceneState.canvas;
    if (!canvas.clientWidth || !canvas.clientHeight) return;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    sceneViewW = Math.round(Math.max(SCENE_VIEW_MIN_W, Math.min(SCENE_W, SCENE_VIEW_BASE_H * aspect)));
    sceneViewH = Math.round(Math.min(SCENE_H, sceneViewW / aspect));
    if (canvas.width !== sceneViewW) canvas.width = sceneViewW;
    if (canvas.height !== sceneViewH) canvas.height = sceneViewH;
}

function drawScene() {
    fitSceneView();
    const s = sceneState;
    const ctx = s.ctx;
    const pal = worldTierOfRealm(currentLocation().minR).palette;
    const camX = Math.max(0, Math.min(SCENE_W - sceneViewW, s.x - sceneViewW / 2));
    const camY = Math.max(0, Math.min(SCENE_H - sceneViewH, s.y - sceneViewH / 2));
    ctx.save();
    ctx.translate(-camX, -camY);

    ctx.fillStyle = pal[0];
    ctx.fillRect(0, 0, SCENE_W, SCENE_H);
    ctx.fillStyle = pal[1];
    ctx.beginPath();
    ctx.ellipse(SCENE_W / 2, SCENE_H / 2 + 60, SCENE_W / 2 - 60, SCENE_H / 2 - 70, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(241,227,191,.3)';
    ctx.fillRect(SCENE_W / 2 - 40, SCENE_H / 2, 80, SCENE_H / 2);

    s.decor.forEach(d => {
        ctx.fillStyle = d.k < 0.5 ? pal[0] : pal[2];
        ctx.globalAlpha = d.k < 0.5 ? 1 : 0.55;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    s.spots.forEach(spot => {
        const near = s.nearest === spot;
        ctx.fillStyle = near ? '#ffe9a0' : 'rgba(11,18,32,.85)';
        ctx.strokeStyle = pal[2];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.font = '26px serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(spot.icon, spot.x, spot.y + 9);
        ctx.font = 'bold 15px sans-serif';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000';
        ctx.strokeText(spot.label, spot.x, spot.y + 50);
        ctx.fillStyle = '#fff';
        ctx.fillText(spot.label, spot.x, spot.y + 50);
    });

    const units = playersHere().filter(p => p.x != null).map(p => {
        const look = p.look || defaultLook();
        return { y: p.y, draw: () => {
            drawUnit(ctx, sceneImage(`p:${JSON.stringify(look)}`, humanoidSvg(look, { title: p.name })), p.x, p.y, p.name, '#a6ffd1');
            if (p.bubble && Date.now() < p.bubbleUntil) drawBubble(ctx, p.x, p.y, p.bubble);
        } };
    });
    units.push({ y: s.y, draw: () => {
        const look = playerLook();
        drawUnit(ctx, sceneImage(`me:${JSON.stringify(look)}`, humanoidSvg(look, { title: state.name })), s.x, s.y, state.name || '', '#ffe9a0');
        if (s.bubble && Date.now() < s.bubble.until) drawBubble(ctx, s.x, s.y, s.bubble.text);
        if (state.autoTrain) {
            ctx.font = '22px serif';
            ctx.textAlign = 'center';
            ctx.fillText('🧘', s.x + 34, s.y - 34);
        }
    } });
    units.sort((a, b) => a.y - b.y).forEach(u => u.draw());
    ctx.restore();

    if (s.nearest) {
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        const text = `[E] ${s.nearest.label}`;
        const w = ctx.measureText(text).width + 30;
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.fillRect(sceneViewW / 2 - w / 2, sceneViewH - 46, w, 32);
        ctx.fillStyle = '#ffe9a0';
        ctx.fillText(text, sceneViewW / 2, sceneViewH - 24);
    }
    if (state.activity?.type === 'travel') {
        ctx.fillStyle = 'rgba(0,0,0,.6)';
        ctx.fillRect(0, 0, sceneViewW, sceneViewH);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(state.activity.label, sceneViewW / 2, sceneViewH / 2);
    }
}

function sceneFrame(now) {
    requestAnimationFrame(sceneFrame);
    const s = sceneState;
    if (s.view !== 'scene' || !s.ctx || !state.root?.elements) { s.lastFrame = now; return; }
    if (s.locId !== state.location) enterScene();
    const dt = Math.min(SCENE_MAX_DT, (now - s.lastFrame) / 1000 || 0);
    s.lastFrame = now;
    sceneMove(dt);
    playersHere().forEach(p => {
        if (p.tx == null) return;
        p.x += (p.tx - p.x) * Math.min(1, dt * 8);
        p.y += (p.ty - p.y) * Math.min(1, dt * 8);
    });
    s.nearest = sceneNearest();
    drawScene();
}

function showSceneBubble(player, text) {
    if (player) {
        player.bubble = text;
        player.bubbleUntil = Date.now() + SAY_SHOW_MS;
    } else {
        sceneState.bubble = { text, until: Date.now() + SAY_SHOW_MS };
    }
}

/* ---------- khung & điều khiển ---------- */
function setWorldView(view) {
    sceneState.view = view;
    renderWorldViewTabs();
}

function renderWorldViewTabs() {
    const tabs = $('worldViewTabs');
    if (!tabs) return;
    const here = playersHere().length;
    const huntable = (currentLocation().enemies || []).length > 0;
    const autoHunt = huntable ? `<button class="filter-chip ${state.autoHunt ? 'active' : ''}" onclick="toggleAutoHunt()">🔁 Săn liên tục: ${state.autoHunt ? 'ON' : 'OFF'}</button>` : '';
    tabs.innerHTML = `<button class="filter-chip ${sceneState.view === 'scene' ? 'active' : ''}" onclick="setWorldView('scene')">🚶 Bên trong</button>
        <button class="filter-chip ${sceneState.view === 'map' ? 'active' : ''}" onclick="setWorldView('map')">🗺️ Thiên Hạ Đồ</button>
        ${autoHunt}
        <span class="small">👥 ${here + 1} người tại đây · ${Math.max(worldServer.online, onlinePlayers.size + 1)} online</span>`;
    $('sceneHost').style.display = sceneState.view === 'scene' ? 'flex' : 'none';
    $('worldMap').style.display = sceneState.view === 'map' ? 'flex' : 'none';
}

/* Khi có trận, khung chiến đấu được đưa vào khung thế giới, đè lên cảnh bên trong */
function syncBattleOverlay() {
    const panel = document.querySelector('.panel-combat');
    const stage = $('sceneHost');
    if (!panel || !stage) return;
    const fighting = !!state.currentEnemy || !!coop.helping?.arena;
    if (fighting === panel.classList.contains('battle-overlay')) return;
    if (fighting) {
        standUp();
        panel.dataset.homeReady = '1';
        panel.__home = panel.__home || { parent: panel.parentNode, next: panel.nextElementSibling };
        setWorldView('scene');
        stage.appendChild(panel);
    } else {
        panel.__home.parent.insertBefore(panel, panel.__home.next);
    }
    panel.classList.toggle('battle-overlay', fighting);
    $('runBtn').style.display = state.currentEnemy ? 'inline-block' : 'none';
}

function isTypingTarget(target) {
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName);
}

function scenePointer(event) {
    const rect = sceneState.canvas.getBoundingClientRect();
    const scale = Math.max(sceneViewW / rect.width, sceneViewH / rect.height);
    const padX = (rect.width - sceneViewW / scale) / 2;
    const padY = (rect.height - sceneViewH / scale) / 2;
    const camX = Math.max(0, Math.min(SCENE_W - sceneViewW, sceneState.x - sceneViewW / 2));
    const camY = Math.max(0, Math.min(SCENE_H - sceneViewH, sceneState.y - sceneViewH / 2));
    sceneState.tx = (event.clientX - rect.left - padX) * scale + camX;
    sceneState.ty = (event.clientY - rect.top - padY) * scale + camY;
}

function initScene() {
    const host = $('sceneHost');
    if (!host) return;
    host.innerHTML = `<canvas id="sceneCanvas" width="${sceneViewW}" height="${sceneViewH}" tabindex="0" aria-label="Bên trong khu vực, đi bằng WASD, tương tác bằng E"></canvas>
        <div class="chat-input-row">
            <button onclick="sceneInteract()">Tương tác (E)</button>
            <input id="sceneSay" type="text" maxlength="${SAY_MAX_LENGTH}" placeholder="Nói với mọi người tại đây" aria-label="Nói với mọi người tại đây"
                onkeydown="if(event.key==='Enter'){sendSay(this.value);this.value='';}">
        </div>`;
    sceneState.canvas = $('sceneCanvas');
    sceneState.ctx = sceneState.canvas.getContext('2d');
    sceneState.canvas.addEventListener('pointerdown', scenePointer);
    window.addEventListener('keydown', event => {
        if (sceneState.view !== 'scene' || isTypingTarget(event.target)) return;
        const key = event.key.toLowerCase();
        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
            sceneState.keys.add(key);
            if (key.startsWith('arrow')) event.preventDefault();
        } else if (key === 'e' && !event.repeat) {
            sceneInteract();
        }
    });
    window.addEventListener('keyup', event => sceneState.keys.delete(event.key.toLowerCase()));
    window.addEventListener('blur', () => sceneState.keys.clear());
    renderWorldViewTabs();
    requestAnimationFrame(sceneFrame);
}

if (typeof window !== 'undefined') Object.assign(window, { setWorldView, sceneInteract, initScene, syncBattleOverlay });
