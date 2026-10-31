/* ===========================================================
   ĐỘNG CƠ THẾ GIỚI
   - Đồng hồ: mọi tiến trình tính bằng giây đời thực, nhân testSpeed khi test,
     tiếp tục chạy khi đóng game (bù offline lúc mở lại).
   - Một thời điểm chỉ có một hoạt động (đi đường, săn, thám hiểm, rèn, dưỡng thương).
     Đang có hoạt động thì KHÔNG tu luyện được.
=========================================================== */
const TICK_MS = 250;
const HUNT_BASE_SECONDS = 10;
const HUNT_MIN_SECONDS = 3;
const HUNT_MASTERY_DECAY = 0.99;
const HUNT_XP_PER_SEARCH_MINUTE = 0.5;
const EXPLORE_SECONDS = 210;
const GATHER_TIME_DIVISOR = 60;
const HIRE_MAX = 2;
const HIRE_COST = 3;
const HUNT_PACK_CHANCE = { 2: 0.25, 3: 0.1 };
const BASE_TRAVEL_SPEED = 1;
/* Phút cho một chặng chuẩn theo cảnh giới; từ Kim Đan trở lên cùng một mốc */
const TRAVEL_LEG_MINUTES = [3, 2, 1];
const TRAVEL_LEG_PIXELS = 250;
const TRAVEL_GATE_PIXELS = 500;
/* Quãng đường càng xa, thời gian tăng nhanh hơn quãng đường */
const TRAVEL_DISTANCE_EXPONENT = 1.5;
/* Dịch chuyển: cần tông môn + cảnh giới tối thiểu của cõi đích */
const TELEPORT_MIN_REALM = { pham: 2, tien: 12, thanh: 17, thien: 22 };
/* Cõi cuối: cảnh giới cao hơn cõi thì tới tức thì, thấp hơn thì mất ngàn giờ cho mỗi bậc thiếu */
const ABSOLUTE_WORLDS = ['hondon', 'hongmong', 'chungnguyen'];
const INSTANT_LEG_SECONDS = 1;
const LOW_REALM_HOURS_PER_STEP = 1000;
const ROAD_EVENT_INTERVAL = 5;
const ROAD_EVENT_BASE_CHANCE = 0.005;
const ROAD_EVENT_LUCK_FACTOR = 0.1;
const ROAD_EVENT_MAX_CHANCE = 0.08;
const ROAD_BANDIT_XP_MINUTES = 0.5;
const ROAD_BANDITS = {
    pham: 'Sơn Tặc', tien: 'Tiên Đạo Tặc', thanh: 'Thánh Vực Đạo Tặc', thien: 'Thiên Ngoại Đạo Tặc',
    hondon: 'Hỗn Độn Đạo Tặc', hongmong: 'Hồng Mông Đạo Tặc', chungnguyen: 'Chung Yên Đạo Tặc'
};
const BOUNTY_KILLS = 5;

let worldLastTick = Date.now();
let worldUiAccum = 0;
let mapViewWorld = null;
let mapSelected = null;

function currentLocation() {
    return LOCATIONS[state.location] || LOCATIONS.thanh_thuy;
}

function currentLocationQi() {
    return (currentLocation().qi || 1) * sectLocationQiMult(state.location) * renownQiMult();
}

function initWorldState() {
    state.location = state.location || 'thanh_thuy';
    state.look = { ...defaultLook(), ...(state.look || {}) };
    state.mats = state.mats || {};
    state.flags = state.flags || {};
    state.mastery = state.mastery || {};
    state.renown = state.renown || { ...state.mastery };
    syncStorySect();
    state.questDone = state.questDone || [];
    state.questActive = state.questActive || [];
    state.forgeQueue = state.forgeQueue || [];
    state.hired = state.hired || 0;
    state.origin = state.origin || 'thuy';
    state.daoPath = state.daoPath || ORIGINS[state.origin].path;
    applyOriginQuest();
    state.activity = state.activity || null;
    state.testSpeed = state.testSpeed || 1;
    state.lastSeen = state.lastSeen || Date.now();
}

/* ---------- đồng hồ ---------- */
function advanceWorld(sec) {
    if (state.dead || !state.root?.elements) return;
    advanceForgeQueue(sec);
    if (window._battleActive) return;
    state.age += sec / SECONDS_PER_DAY;
    accrueSectIncome(sec);
    let left = sec;
    while (left > 0 && state.activity) {
        const a = state.activity;
        if (a.type === 'travel') {
            const leg = a.legs[a.leg];
            const use = Math.min(left, leg.left);
            leg.left -= use;
            left -= use;
            if (leg.left <= 0) {
                state.location = leg.to;
                a.leg++;
                checkArrival();
                if (state.activity !== a) break;
                if (a.leg >= a.legs.length) finishActivity();
            }
        } else {
            const use = Math.min(left, a.remaining);
            a.remaining -= use;
            left -= use;
            if (a.remaining <= 0) finishActivity();
        }
        if (window._battleActive) return;
    }
    if (left > 0 && !state.activity && state.autoTrain) {
        gainXP(getEstimatedXpPerSecond() * left);
    }
}

function worldTick() {
    const now = Date.now();
    const realDt = Math.min(5, (now - worldLastTick) / 1000);
    worldLastTick = now;
    advanceWorld(realDt * (state.testSpeed || 1));
    tickRoadEvents(realDt);
    worldUiAccum += TICK_MS;
    if (worldUiAccum >= 500) {
        worldUiAccum = 0;
        if (state.root?.elements) {
            updateTrainingUI();
            renderActivityBar();
            updateMapToken();
            if (typeof checkLongevity === 'function') checkLongevity();
        }
    }
}

function applyOfflineProgress() {
    const gap = (Date.now() - (state.lastSeen || Date.now())) / 1000;
    worldLastTick = Date.now();
    if (gap < 60) return;
    const before = { realm: state.realmIndex, stage: state.realmStage, xp: state.xp };
    advanceWorld(gap);
    const moved = before.realm !== state.realmIndex || before.stage !== state.realmStage;
    showToast(`Vắng mặt ${formatRealDuration(gap)}. ${moved ? `Đã đạt ${REALMS[state.realmIndex]} ${STAGES[state.realmStage]}.` : ''}`, 'info');
    log(`⏳ Trong ${formatRealDuration(gap)} ngươi vắng mặt, thế giới vẫn tiếp diễn.`);
}

window.addEventListener('beforeunload', () => { if (state.root?.elements) saveProgress(true); });

/* ---------- hoạt động ---------- */
function isBusy() {
    return !!state.activity || !!window._battleActive;
}

function requireFree() {
    if (coop.helping?.started) { showToast('Đang hỗ trợ đạo hữu.', 'warn'); return false; }
    if (window._battleActive) { showToast('Đang giao chiến.', 'warn'); return false; }
    if (state.activity) { showToast(`Đang bận: ${state.activity.label}.`, 'warn'); return false; }
    return true;
}

function hastedSeconds(seconds) {
    return seconds / realmHaste(state.realmIndex || 0);
}

function startActivity(activity) {
    standUp();
    const seconds = activity.type === 'travel' ? activity.seconds : hastedSeconds(activity.seconds);
    state.activity = { ...activity, total: seconds, remaining: seconds, seconds };
    renderAll();
}

function activityRemaining() {
    const a = state.activity;
    if (!a) return 0;
    if (a.type === 'travel') return a.legs.slice(a.leg).reduce((sum, l) => sum + l.left, 0);
    return a.remaining;
}

function cancelActivity() {
    const a = state.activity;
    if (!a || a.type === 'rest') return;
    state.autoHunt = false;
    state.activity = null;
    log(a.type === 'travel' ? `🛑 Dừng chân tại ${currentLocation().name}.` : `🛑 Bỏ dở: ${a.label}.`);
    renderAll();
}

function finishActivity() {
    const a = state.activity;
    state.activity = null;
    switch (a.type) {
        case 'travel':
            log(`📍 Đã tới ${currentLocation().name}.`);
            break;
        case 'hunt':
            spawnEnemyWithRules(a.total, a.pack || 1);
            break;
        case 'explore':
            window.exploreOriginalImpl();
            break;
        case 'gather':
            completeGather(a.questId);
            break;
        default:
            log(`✅ ${a.label} xong.`);
    }
    renderAll();
}

function renderActivityBar() {
    const el = $('activityBar');
    if (!el) return;
    const a = state.activity;
    if (window._battleActive) { el.innerHTML = '<b>⚔️ Đang giao chiến</b> <span class="small">— tu vi tạm dừng</span>'; return; }
    if (!a) {
        const q = currentLocationQi();
        el.innerHTML = state.autoTrain
            ? `<b>🧘 Đang bế quan</b> <span class="small">tại ${currentLocation().name} · linh khí x${q.toFixed(2)} · ${formatNumber(Math.floor(getEstimatedXpPerSecond()))} tu vi/giây</span>`
            : `<b>🚶 Rảnh rỗi</b> <span class="small">— tới chỗ Bế quan trong khu vực và ngồi xuống để tu luyện</span>`;
        return;
    }
    const remaining = activityRemaining();
    const pct = Math.max(0, Math.min(100, 100 * (1 - remaining / a.total)));
    const canCancel = a.type !== 'rest';
    el.innerHTML = `<div class="activity-row">
        <b>${a.label}</b> <span class="small">còn ${formatRealDuration(remaining / (state.testSpeed || 1))} · không tu luyện được${a.type === 'travel' ? ` · kỳ ngộ ${(roadEventChance() * 100).toFixed(1)}% mỗi ${ROAD_EVENT_INTERVAL} giây` : ''}</span>
        ${canCancel ? '<button class="mini-btn" onclick="cancelActivity()">Dừng</button>' : ''}
    </div><div class="bar"><i style="width:${pct}%"></i></div>`;
}

/* ---------- di chuyển ---------- */
function worldOf(locId) {
    return WORLD_TIERS.find(w => w.id === LOCATIONS[locId].world);
}

function worldUnlocked(worldId) {
    return worldId === 'pham' || !!state.flags['world_' + worldId];
}

function syncStorySect() {
    if (!state.sect && state.questDone?.includes('m02')) state.sect = 'thanh_van';
}

function absoluteLegSeconds(to) {
    const tier = worldOf(to);
    if (!ABSOLUTE_WORLDS.includes(tier.id)) return null;
    const realm = state.realmIndex || 0;
    if (realm > tier.to) return INSTANT_LEG_SECONDS;
    if (realm < tier.from) return (tier.from - realm) * LOW_REALM_HOURS_PER_STEP * 3600;
    return null;
}

/* Vùng đất có cấp: chưa đủ cảnh giới thì không đặt chân tới được.
   Các cõi cuối đi theo luật riêng trong absoluteLegSeconds. */
function canEnterLocation(id) {
    const loc = LOCATIONS[id];
    return ABSOLUTE_WORLDS.includes(loc.world) || (state.realmIndex || 0) >= loc.minR;
}

function teleportBlockReason(id) {
    const tier = worldOf(id);
    const minRealm = TELEPORT_MIN_REALM[tier.id];
    if (minRealm == null) return '';
    const missing = [];
    if (!state.sect) missing.push('nhập tông môn');
    if ((state.realmIndex || 0) < minRealm) missing.push(`đạt ${REALMS[minRealm]}`);
    return missing.length ? `Dịch chuyển trong ${tier.name}: cần ${missing.join(' và ')}.` : '';
}

function canTeleport(id) {
    return id in LOCATIONS && canEnterLocation(id) && TELEPORT_MIN_REALM[LOCATIONS[id].world] != null
        && worldUnlocked(LOCATIONS[id].world) && !teleportBlockReason(id);
}

function teleportTo(id) {
    if (!requireFree() || !canTeleport(id)) return;
    state.location = id;
    log(`⚡ Dịch chuyển tới ${LOCATIONS[id].name}.`);
    checkArrival();
}

function joinSect(id) {
    if (!requireFree()) return;
    if (state.ownSect) { showToast('Chưởng môn không thể nhập tông khác.', 'warn'); return; }
    const previous = sectName();
    leaveJoinedSect();
    state.sect = id;
    log(previous ? `⛩️ Rời ${previous}, gia nhập ${LOCATIONS[id].name}.` : `⛩️ Gia nhập ${LOCATIONS[id].name}.`);
    renderAll();
}

function travelSpeed() {
    const realm = state.realmIndex || 0;
    const tier = worldTierOfRealm(realm);
    const boots = (typeof equippedInSlot === 'function' ? equippedInSlot('boots')?.speed : 0) || 0;
    return (BASE_TRAVEL_SPEED + (realm - tier.from) * 0.15 + boots) * realmHaste(realm);
}

function travelUnitSeconds() {
    const minutes = TRAVEL_LEG_MINUTES[Math.min(state.realmIndex || 0, TRAVEL_LEG_MINUTES.length - 1)];
    return minutes * 60 / travelSpeed();
}

function edgeSeconds(from, to) {
    const a = LOCATIONS[from], b = LOCATIONS[to];
    const absolute = absoluteLegSeconds(to);
    if (absolute != null) return absolute;
    const pixels = a.gate && a.gate.to === to ? TRAVEL_GATE_PIXELS : Math.hypot(a.x - b.x, a.y - b.y);
    return travelUnitSeconds() * pixels / TRAVEL_LEG_PIXELS;
}

function neighbors(id, carried = false) {
    const loc = LOCATIONS[id];
    const out = [...loc.links];
    if (loc.gate && (!loc.gate.flag || state.flags[loc.gate.flag]) && worldUnlocked(LOCATIONS[loc.gate.to].world)) out.push(loc.gate.to);
    return carried ? out : out.filter(canEnterLocation);
}

function findPath(from, to, carried = false) {
    const dist = { [from]: 0 };
    const prev = {};
    const open = new Set([from]);
    while (open.size) {
        const cur = [...open].reduce((a, b) => dist[a] <= dist[b] ? a : b);
        open.delete(cur);
        if (cur === to) break;
        neighbors(cur, carried).forEach(n => {
            const d = dist[cur] + edgeSeconds(cur, n);
            if (d < (dist[n] ?? Infinity)) { dist[n] = d; prev[n] = cur; open.add(n); }
        });
    }
    if (dist[to] == null) return null;
    const path = [to];
    while (path[0] !== from) path.unshift(prev[path[0]]);
    const legs = path.slice(1).map((next, i) => ({ from: path[i], to: next, seconds: edgeSeconds(path[i], next) }));
    const normal = legs.filter(l => absoluteLegSeconds(l.to) == null);
    const units = normal.reduce((sum, l) => sum + l.seconds, 0) / travelUnitSeconds();
    const stretch = units > 1 ? Math.pow(units, TRAVEL_DISTANCE_EXPONENT - 1) : 1;
    const escort = renownTravelMult(from);
    normal.forEach(l => { l.seconds *= stretch * escort; });
    legs.forEach(l => { l.left = l.seconds; });
    return { path, legs, seconds: legs.reduce((sum, l) => sum + l.seconds, 0) };
}

function beginRoute(id, route) {
    startActivity({ type: 'travel', label: `🛤️ Đi tới ${LOCATIONS[id].name}`, seconds: route.seconds, legs: route.legs, leg: 0, dest: id });
}

/* Đồng đội đưa đi: được đi qua vùng chưa đủ cảnh giới, không bao giờ chậm hơn tự đi */
function carriedTravel(id, seconds, carrier) {
    if (!requireFree()) return;
    const route = findPath(state.location, id, true);
    if (!route) return;
    if (seconds >= route.seconds && findPath(state.location, id)) {
        showToast(`${carrier} không đi nhanh hơn ngươi. Người đưa phải cao cảnh giới hơn hoặc có thể dịch chuyển tới đó.`, 'warn');
        return;
    }
    if (seconds <= 0) {
        state.location = id;
        log(`⚡ ${carrier} đưa ngươi tới ngay ${LOCATIONS[id].name}.`);
        checkArrival();
        return;
    }
    const scale = Math.min(1, seconds / route.seconds);
    route.legs.forEach(l => { l.seconds *= scale; l.left = l.seconds; });
    route.seconds *= scale;
    beginRoute(id, route);
    log(`🤝 ${carrier} đưa ngươi tới ${LOCATIONS[id].name}, mất ${formatRealDuration(route.seconds)}.`);
}

function travelTo(id) {
    if (!requireFree()) return;
    if (id === state.location) return;
    const route = findPath(state.location, id);
    if (!route) { showToast('Chưa có đường tới đó.', 'warn'); return; }
    beginRoute(id, route);
    log(`🛤️ Khởi hành tới ${LOCATIONS[id].name}, mất ${formatRealDuration(route.seconds)}. Trên đường không thể tu luyện.`);
    const escort = renownTravelMult(route.path[0]);
    if (escort < 1) log(`🐎 Người trong khu vực nể danh thiên kiêu, đưa đường: thời gian đi x${escort}.`);
}

/* ---------- kỳ ngộ trên đường: mỗi 5 giây thực tung một lần, chỉ khi đang mở game ---------- */
function roadEventChance() {
    return Math.min(ROAD_EVENT_MAX_CHANCE, ROAD_EVENT_BASE_CHANCE + (state.luckBonus || 0) * ROAD_EVENT_LUCK_FACTOR);
}

function tickRoadEvents(realDt) {
    const a = state.activity;
    if (!a || a.type !== 'travel' || window._battleActive) return;
    a.eventClock = (a.eventClock || 0) + realDt;
    if (a.eventClock < ROAD_EVENT_INTERVAL) return;
    a.eventClock -= ROAD_EVENT_INTERVAL;
    if (Math.random() < roadEventChance()) triggerRoadEvent();
}

function triggerRoadEvent(kind = null) {
    const luck = state.luckBonus || 0;
    const roll = Math.random();
    const type = kind || (roll < 0.10 + luck ? 'master' : (roll < 0.55 ? 'item' : 'bandit'));
    if (type === 'master') roadMaster();
    else if (type === 'item') roadItem();
    else roadBandit();
}

function rollPackSize(bonus = 0) {
    const roll = Math.random();
    const luck = (state.luckBonus || 0) * 0.5 + bonus;
    if (roll < HUNT_PACK_CHANCE[3] + luck / 2) return 3;
    if (roll < HUNT_PACK_CHANCE[3] + HUNT_PACK_CHANCE[2] + luck) return 2;
    return 1;
}

function roadBandit() {
    const worldId = currentLocation().world;
    const makeUnit = () => {
        const unit = buildEnemy({
            name: ROAD_BANDITS[worldId],
            ...rollLocationRealm(currentLocation()),
            tier: Math.random() < 0.15 ? 'Tinh anh' : 'Thường'
        });
        unit.xpMinutes = unit.xpMinutes / ENEMY_TIERS['Thường'].xpMinutes * ROAD_BANDIT_XP_MINUTES;
        return unit;
    };
    const enemy = spawnEnemyPack(makeUnit, rollPackSize(0.15));
    log(`🏴 ${enemy.name} chặn đường!`);
    showToast(`${enemy.name} chặn đường!`, 'warn');
    startEncounter(enemy);
}

function roadItem() {
    const realm = state.realmIndex;
    const roll = Math.random();
    if (roll < 0.5) {
        const gold = goldRef(realm) * (2 + Math.floor(Math.random() * 3));
        state.gold += gold;
        log(`💰 Nhặt được túi linh thạch ven đường: +${formatNumber(gold)}.`);
    } else if (roll < 0.8) {
        grantMaterial(worldTierOfRealm(realm).id, 2);
    } else if (roll < 0.95) {
        addItemToInventory({ name: 'Ngọc Linh Đan', type: 'xp', hours: 1, desc: 'Bằng 1 giờ bế quan' });
    } else {
        const slot = GEAR_SLOT_IDS[Math.floor(Math.random() * GEAR_SLOT_IDS.length)];
        addItemToInventory(makeGearItem(realm, slot, 1));
    }
    showToast('Nhặt được vật phẩm trên đường!', 'info');
    renderAll();
}

function roadMaster() {
    const dest = LOCATIONS[state.activity.dest];
    playDialogue([['narr', `Một vị cao nhân cưỡi mây đi ngang, phất tay áo: "Thuận đường, ta đưa ngươi một đoạn." Chớp mắt ngươi đã đứng tại ${dest.name}.`]]);
    log(`🌤️ Gặp cao nhân, được đưa thẳng tới ${dest.name}.`);
    state.location = dest.id;
    state.activity = null;
    checkArrival();
}

function checkArrival() {
    mapViewWorld = currentLocation().world;
    mapSelected = null;
    questsOnLocation();
    sendPresence();
    if (typeof setWorldView === 'function') setWorldView('scene');
    renderAll();
}

function mapTokenPosition() {
    const a = state.activity;
    const here = currentLocation();
    if (!a || a.type !== 'travel' || a.leg >= a.legs.length) return { x: here.x, y: here.y };
    const leg = a.legs[a.leg];
    const from = LOCATIONS[leg.from], to = LOCATIONS[leg.to];
    if (from.world !== to.world) return { x: from.x, y: from.y };
    const t = 1 - leg.left / leg.seconds;
    return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
}

function updateMapToken() {
    const node = $('mapToken');
    if (!node) return;
    const p = mapTokenPosition();
    node.setAttribute('transform', `translate(${p.x - 26} ${p.y - 74})`);
}

/* ---------- bản đồ ---------- */
function seededScatter(seed, count) {
    const out = [];
    let v = seed;
    const rand = () => (v = (v * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < count; i++) out.push({ x: rand() * 1000, y: rand() * 560, r: 0.6 + rand() * 0.9, k: rand() });
    return out;
}

function terrainDecor(worldId, pal, locs) {
    const seed = 7919 * (WORLD_TIERS.findIndex(w => w.id === worldId) + 1);
    const clear = p => locs.every(l => Math.hypot(l.x - p.x, l.y - p.y) > 70);
    return seededScatter(seed, 70).filter(clear).map(p => {
        const s = p.r;
        if (worldId === 'pham') {
            return p.k < 0.5
                ? `<path d="M${p.x} ${p.y} l${16 * s} ${-30 * s} l${16 * s} ${30 * s} Z" fill="${pal[0]}" opacity=".75"/><path d="M${p.x + 16 * s} ${p.y - 30 * s} l${-5 * s} ${10 * s} h${10 * s} Z" fill="#dfe8e0" opacity=".7"/>`
                : `<path d="M${p.x} ${p.y} l${8 * s} ${-20 * s} l${8 * s} ${20 * s} Z" fill="${pal[2]}" opacity=".25"/>`;
        }
        if (worldId === 'tien' || worldId === 'thanh') {
            return `<g opacity=".3" fill="#fff"><ellipse cx="${p.x}" cy="${p.y}" rx="${34 * s}" ry="${9 * s}"/><ellipse cx="${p.x + 18 * s}" cy="${p.y - 7 * s}" rx="${22 * s}" ry="${8 * s}"/></g>`;
        }
        if (worldId === 'thien' || worldId === 'chungnguyen') {
            return `<circle cx="${p.x}" cy="${p.y}" r="${1.6 * s}" fill="#fff" opacity="${0.3 + p.k * 0.6}"/>`;
        }
        return `<path d="M${p.x} ${p.y} q${20 * s} ${-16 * s} ${40 * s} 0 t${40 * s} 0" stroke="${pal[2]}" stroke-opacity=".28" fill="none" stroke-width="2"/>`;
    }).join('');
}

function renderMap() {
    const host = $('worldMap');
    if (!host) return;
    const viewId = mapViewWorld || currentLocation().world;
    const tier = WORLD_TIERS.find(w => w.id === viewId);
    const locs = Object.values(LOCATIONS).filter(l => l.world === viewId);
    const pal = tier.palette;
    const seen = new Set();
    const roads = locs.flatMap(l => l.links.map(to => {
        const key = [l.id, to].sort().join('|');
        if (seen.has(key)) return '';
        seen.add(key);
        const b = LOCATIONS[to];
        return `<line x1="${l.x}" y1="${l.y}" x2="${b.x}" y2="${b.y}" stroke="#f1e3bf" stroke-opacity=".55" stroke-width="3" stroke-dasharray="9 8"/>`;
    })).join('');
    const nodes = locs.map(l => {
        const here = l.id === state.location;
        const selected = l.id === mapSelected;
        const locked = !canEnterLocation(l.id);
        return `<g class="map-node ${here ? 'here' : ''} ${locked ? 'locked' : ''}" role="button" tabindex="0" aria-label="${l.name}" onclick="selectMapNode('${l.id}')" onkeydown="if(event.key==='Enter')selectMapNode('${l.id}')">
            <circle cx="${l.x}" cy="${l.y}" r="27" fill="${selected ? '#ffe9a0' : '#0b1220'}" fill-opacity="${selected ? 1 : 0.8}" stroke="${here ? '#ffe9a0' : pal[2]}" stroke-width="3"/>
            <text x="${l.x}" y="${l.y + 9}" text-anchor="middle" font-size="24">${l.icon}</text>
            <text x="${l.x}" y="${l.y + 47}" text-anchor="middle" font-size="17" fill="#fff" stroke="#000" stroke-width="3" paint-order="stroke" font-weight="600">${l.name}</text>
        </g>`;
    }).join('');
    const p = mapTokenPosition();
    const showToken = currentLocation().world === viewId;
    const token = showToken
        ? `<g id="mapToken" transform="translate(${p.x - 26} ${p.y - 74})" pointer-events="none">${playerAvatarSvg().replace('<svg class', '<svg width="52" height="70" class')}</g>`
        : '';
    const tabs = WORLD_TIERS.filter(w => worldUnlocked(w.id)).map(w =>
        `<button class="filter-chip ${w.id === viewId ? 'active' : ''}" onclick="setMapWorld('${w.id}')">${w.name}</button>`
    ).join('');
    host.innerHTML = `<div class="filter-chips">${tabs}</div>
        <svg class="map-svg" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Bản đồ ${tier.name}">
            <defs><linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[0]}"/></linearGradient></defs>
            <rect width="1000" height="560" fill="url(#mapBg)"/>
            ${terrainDecor(viewId, pal, locs)}
            ${roads}${nodes}${token}
        </svg>${renderMapDestination()}`;
}

function renderMapDestination() {
    if (!mapSelected || mapSelected === state.location) return '';
    const loc = LOCATIONS[mapSelected];
    const route = findPath(state.location, mapSelected);
    if (!canEnterLocation(mapSelected)) {
        return `<div class="map-dest"><div><b>${loc.icon} ${loc.name}</b>
            <div class="small">🔒 Cần đạt ${REALMS[loc.minR]} mới có thể đặt chân tới.</div></div></div>`;
    }
    const teleport = canTeleport(mapSelected)
        ? `<button class="primary" onclick="teleportTo('${loc.id}')">⚡ Dịch chuyển</button>`
        : '';
    const blocked = teleportBlockReason(mapSelected);
    const carryRoute = findPath(state.location, mapSelected, true);
    const carry = carryRoute && roomCarriers().length ? `<button onclick="rideAsk('${loc.id}')">🤝 Nhờ đồng đội đưa đi</button>` : '';
    const carryHint = carryRoute && !carry ? '<div class="small">Muốn được đưa đi: vào chung phòng với người cảnh giới bằng hoặc cao hơn.</div>' : '';
    return `<div class="map-dest">
        <div><b>${loc.icon} ${loc.name}</b> <span class="small">linh khí x${loc.qi.toFixed(2)} · ${REALMS[loc.minR]} trở lên</span>
        <div class="small">${loc.desc}</div>${blocked ? `<div class="small">🔒 ${blocked}</div>` : ''}${carryHint}</div>
        <div class="map-dest-actions">${teleport}${carry}
        ${route ? `<button onclick="travelTo('${loc.id}')">Đi (${formatRealDuration(route.seconds)})</button>` : '<span class="small">Chưa có đường</span>'}</div>
    </div>`;
}

function selectMapNode(id) {
    mapSelected = id === state.location ? null : id;
    renderMap();
}

function setMapWorld(id) {
    mapViewWorld = id;
    mapSelected = null;
    renderMap();
}

/* ---------- săn / thám hiểm / dịch vụ ---------- */
function huntSeconds() {
    const points = state.mastery[state.location] || 0;
    return Math.max(HUNT_MIN_SECONDS, HUNT_BASE_SECONDS * Math.pow(HUNT_MASTERY_DECAY, points));
}

function startHunt() {
    if (!requireFree()) return;
    if (!(currentLocation().enemies || []).length) return;
    const pack = rollPackSize();
    const seconds = huntSeconds() * (0.4 + Math.random()) / Math.sqrt(pack);
    startActivity({ type: 'hunt', label: '🗡️ Lùng sục con mồi', seconds, pack });
}

function startExplore() {
    if (!requireFree()) return;
    startActivity({ type: 'explore', label: '🧭 Thám hiểm', seconds: EXPLORE_SECONDS });
}

function toggleAutoHunt() {
    state.autoHunt = !state.autoHunt;
    if (state.autoHunt && !isBusy()) startHunt();
    renderAll();
}

function hasService(name) {
    return (currentLocation().services || []).includes(name);
}

function openServiceShop() {
    if (!hasService('shop')) { showToast(`${currentLocation().name} không có cửa hàng.`, 'warn'); return; }
    window._lbShopOffer = null;
    window.openShopModal();
}

function grantMaterial(worldId, n) {
    state.mats[worldId] = (state.mats[worldId] || 0) + n;
    log(`⛏️ Nhận ${n} ${MATERIAL_NAMES[worldId]}.`);
}

function openWorldModal(id, title, body) {
    let modal = document.getElementById(id);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = id;
        modal.className = 'world-modal';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `<div class="world-modal-box">
        <div class="world-modal-head"><b>${title}</b><button aria-label="Đóng" onclick="document.getElementById('${id}').style.display='none'">✕</button></div>
        ${body}</div>`;
    modal.style.display = 'flex';
}

function openForge() {
    if (!hasService('forge')) { showToast(`${currentLocation().name} không có lò rèn.`, 'warn'); return; }
    const realm = state.realmIndex;
    const worldId = worldTierOfRealm(realm).id;
    const have = state.mats[worldId] || 0;
    const price = gearPrice(realm, 2);
    const matCost = forgeMaterialCost();
    const rows = GEAR_SLOT_IDS.map(slot => {
        const it = makeGearItem(realm, slot, 2);
        return `<div class="shop-item forge-row">
            <div><b style="color:${GEAR_QUALITIES[2].color}">${GEAR_SLOTS[slot].icon} ${it.name}</b><div class="small">${gearStatText(it)}</div></div>
            <button onclick="startForge('${slot}')" ${have < matCost || state.gold < price ? 'disabled' : ''}>Rèn</button>
        </div>`;
    }).join('');
    openWorldModal('forgeModal', '🔨 Lò rèn', `<div class="small">Mỗi món: ${matCost} ${MATERIAL_NAMES[worldId]} (có ${have}) + ${formatNumber(price)} linh thạch, ${formatRealDuration(hastedSeconds(FORGE_HOURS * 3600))}, thợ rèn làm nền, rèn được nhiều món cùng lúc. 15% ra phẩm Tiên.</div>${forgeQueueHTML()}${rows}<div class="small" style="margin-top:10px"><b>Nâng cấp đồ đang mặc</b> (tức thì)</div>${gearUpgradeRows()}`);
}

function gearUpgradeCost(item) {
    const next = (item.plus || 0) + 1;
    return { gold: goldRef(item.reqRealm || 0) * 2 * next, mats: next };
}

function upgradeGear(uidIndex) {
    const item = state.inventory[uidIndex];
    if (!item?.slot) return;
    const plus = item.plus || 0;
    if (plus >= gearUpgradeCap(item.reqRealm || 0)) { showToast('Đã đạt giới hạn nâng cấp.', 'warn'); return; }
    const worldId = worldTierOfRealm(item.reqRealm || 0).id;
    const cost = gearUpgradeCost(item);
    if ((state.mats[worldId] || 0) < cost.mats || state.gold < cost.gold) { showToast('Thiếu nguyên liệu hoặc linh thạch.', 'warn'); return; }
    state.mats[worldId] -= cost.mats;
    state.gold -= cost.gold;
    Object.assign(item, applyGearUpgrade(item, plus + 1));
    log(`🔨 Nâng cấp thành công: ${item.name}.`);
    openForge();
    renderAll();
}

function gearUpgradeRows() {
    return state.inventory.map((item, index) => ({ item, index })).filter(({ item }) => item.equipped && item.slot).map(({ item, index }) => {
        const plus = item.plus || 0;
        const cap = gearUpgradeCap(item.reqRealm || 0);
        const step = Math.round(gearUpgradeStep(item.reqRealm || 0) * 1000) / 10;
        if (plus >= cap) return `<div class="shop-item forge-row"><div><b>${item.name}</b><div class="small">${gearStatText(item)} · tối đa +${cap}</div></div></div>`;
        const cost = gearUpgradeCost(item);
        const worldId = worldTierOfRealm(item.reqRealm || 0).id;
        return `<div class="shop-item forge-row">
            <div><b>${item.name}</b><div class="small">${gearStatText(item)} · +${plus}/${cap} · mỗi cấp +${step}%</div>
            <div class="small">${formatNumber(cost.gold)} linh thạch, ${cost.mats} ${MATERIAL_NAMES[worldId]}</div></div>
            <button onclick="upgradeGear(${index})">Nâng cấp</button></div>`;
    }).join('');
}

function startForge(slot) {
    const realm = state.realmIndex;
    const worldId = worldTierOfRealm(realm).id;
    const price = gearPrice(realm, 2);
    const matCost = forgeMaterialCost();
    if ((state.mats[worldId] || 0) < matCost || state.gold < price) { showToast('Thiếu nguyên liệu hoặc linh thạch.', 'warn'); return; }
    state.mats[worldId] -= matCost;
    state.gold -= price;
    const seconds = hastedSeconds(FORGE_HOURS * 3600);
    state.forgeQueue.push({ slot, realm, total: seconds, remaining: seconds });
    log(`🔨 Giao thợ rèn ${GEAR_SLOTS[slot].label}, xong sau ${formatRealDuration(seconds)}.`);
    openForge();
    renderAll();
}

function advanceForgeQueue(sec) {
    if (!state.forgeQueue?.length) return;
    state.forgeQueue.forEach(job => { job.remaining -= sec; });
    state.forgeQueue.filter(job => job.remaining <= 0).forEach(finishForge);
    if (state.forgeQueue.some(job => job.remaining <= 0)) {
        state.forgeQueue = state.forgeQueue.filter(job => job.remaining > 0);
        renderAll();
    }
}

function finishForge(job) {
    const gear = makeGearItem(job.realm, job.slot, Math.random() < 0.15 ? 3 : 2);
    addItemToInventory(gear);
    log(`🔨 Thợ rèn giao ${gear.name}!`);
    showToast(`Rèn xong ${gear.name}`, 'info');
}

function forgeQueueHTML() {
    if (!state.forgeQueue.length) return '';
    return `<div class="small">🔨 Đang rèn: ${state.forgeQueue.map(job =>
        `${GEAR_SLOTS[job.slot].label} (${formatRealDuration(job.remaining / (state.testSpeed || 1))})`).join(', ')}</div>`;
}

function acceptBounty() {
    const pool = Object.values(LOCATIONS).filter(l => l.world === currentLocation().world && (l.enemies || []).length && l.minR <= state.realmIndex && l.maxR >= state.realmIndex - 1);
    const loc = pool[Math.floor(Math.random() * pool.length)];
    const pick = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
    state.bounty = { loc: loc.id, name: pick.name, need: BOUNTY_KILLS, done: 0 };
    log(`📜 Nhận lệnh treo thưởng: diệt ${BOUNTY_KILLS} ${pick.name} tại ${loc.name}.`);
    renderAll();
}

function finishBounty() {
    const worldId = worldTierOfRealm(state.realmIndex).id;
    const gold = goldRef(state.realmIndex) * 15;
    state.gold += gold;
    const xp = gainCultivationHours(1);
    log(`📜 Hoàn thành treo thưởng! +${formatNumber(gold)} linh thạch, +${formatNumber(xp)} tu vi.`);
    grantMaterial(worldId, 6);
    state.bounty = null;
}

/* ---------- nhiệm vụ ---------- */
function questStep(rt) {
    return QUEST_INDEX[rt.id].steps[rt.step];
}

function mainQuestRuntime() {
    return state.questActive.find(rt => rt.id[0] === 'm') || null;
}

function needsMet(q) {
    const [r, s] = q.needs;
    return state.realmIndex > r || (state.realmIndex === r && state.realmStage >= s);
}

function nextMainQuest() {
    return MAIN_QUESTS.find(q => !state.questDone.includes(q.id)) || null;
}

function getBreakthroughGate(realm) {
    const q = MAIN_QUESTS.find(x => x.unlock === realm);
    return q && !state.questDone.includes(q.id) ? q : null;
}

function pickOrigin() {
    return originFor(state.root);
}

function applyStartingOrigin() {
    state.origin = pickOrigin();
    state.location = ORIGINS[state.origin].loc;
    state.daoPath = ORIGINS[state.origin].path;
    log(`🌱 Xuất thân: ${ORIGINS[state.origin].name}.`);
}

function applyOriginQuest() {
    const origin = ORIGINS[state.origin];
    if (!origin.steps) return;
    const quest = MAIN_QUESTS[0];
    quest.title = origin.title;
    quest.steps = origin.steps;
}

function setDaoPath(path) {
    if (!requireFree()) return;
    const cost = goldRef(state.realmIndex) * 10;
    if (state.gold < cost) { showToast('Không đủ linh thạch.', 'warn'); return; }
    state.gold -= cost;
    state.daoPath = path;
    log(`🧭 Chuyển sang ${DAO_PATHS[path].name}. ${DAO_PATHS[path].desc}.`);
    renderAll();
}

function openDaoHall() {
    const path = currentLocation().path;
    if (!path) return;
    const grade = maxLinhBaoGradeForRealm(state.realmIndex);
    const rows = LINH_BAO.filter(lb => lb.path === path).map(lb => `<div class="shop-item forge-row">
        <div><b>${lbEffectIcons(lb)} ${lb.name}</b> <span class="small">${LB_GRADE_NAMES[grade]}</span>
        <div class="small">${lbEffectSummary(lb)} · ${lb.desc}</div></div>
        <button onclick="buyDaoSkill('${lb.id}')">${formatNumber(lbShopPrice(lb.cost, grade))}</button></div>`).join('');
    openWorldModal('daoHallModal', `📜 Truyền thừa ${DAO_PATHS[path].name}`, rows);
}

function buyDaoSkill(id) {
    const grade = maxLinhBaoGradeForRealm(state.realmIndex);
    const price = lbShopPrice(LINH_BAO_MAP[id].cost, grade);
    if (state.gold < price) { showToast('Không đủ linh thạch.', 'warn'); return; }
    state.gold -= price;
    addItemToInventory(makeLinhBao(id, grade, 1));
    log(`📜 Học được ${LINH_BAO_MAP[id].name}.`);
}

function hireGuard() {
    const cost = goldRef(state.realmIndex) * HIRE_COST;
    if (state.hired >= HIRE_MAX) { showToast('Đã đủ hộ pháp.', 'warn'); return; }
    if (state.gold < cost) { showToast('Không đủ linh thạch.', 'warn'); return; }
    state.gold -= cost;
    state.hired++;
    log(`🤝 Thuê hộ pháp cho trận kế tiếp (${state.hired}/${HIRE_MAX}).`);
    renderAll();
}

function startMainStory() {
    advanceMainQuest();
    renderAll();
}

function advanceMainQuest() {
    if (mainQuestRuntime()) return;
    const q = nextMainQuest();
    if (!q || !needsMet(q)) return;
    state.questActive.push({ id: q.id, step: 0, n: 0 });
    log(`📖 ${ACTS[q.act - 1].name} — Nhiệm vụ mới: ${q.title}`);
    questsOnLocation();
}

function onRealmChanged() {
    advanceMainQuest();
}

function questsOnLocation() {
    state.questActive.slice().forEach(rt => {
        const step = questStep(rt);
        if (step && step.go === state.location) completeStep(rt);
    });
}

function completeStep(rt) {
    const q = QUEST_INDEX[rt.id];
    const step = q.steps[rt.step];
    rt.step++;
    rt.n = 0;
    if (step.say) playDialogue(step.say);
    if (rt.step >= q.steps.length) {
        state.questActive = state.questActive.filter(x => x !== rt);
        state.questDone.push(q.id);
        grantQuestReward(q);
        advanceMainQuest();
    } else {
        const next = q.steps[rt.step];
        if (next.go === state.location) completeStep(rt);
    }
    renderAll();
}

function grantQuestReward(q) {
    const r = q.reward || {};
    log(`🏆 Hoàn thành: ${q.title}`);
    if (r.hours) log(`✨ Tu vi +${formatNumber(gainCultivationHours(r.hours))}`);
    if (r.goldRefs) {
        const gold = goldRef(state.realmIndex) * r.goldRefs;
        state.gold += gold;
        log(`💰 +${formatNumber(gold)} linh thạch`);
    }
    if (r.gear) addItemToInventory(makeGearItem(state.realmIndex, r.gear[0], r.gear[1]));
    if (r.lb) grantLinhBaoDrop({ source: q.title, gradeBonus: 0 });
    if (r.relic) {
        const saint = SAINTS.find(s => s.drop?.name === r.relic);
        if (saint) state.inventory.push({ ...saint.drop });
    }
    if (r.boardSlot) {
        state.maxBoardSlots = (state.maxBoardSlots || LB_BOARD_SLOTS) + 1;
        log(`🎴 Trận pháp mở rộng: ${state.maxBoardSlots} ô.`);
    }
    if (r.statBless) {
        state.power = Math.floor(state.power * (1 + r.statBless));
        state.defense = Math.floor(state.defense * (1 + r.statBless));
        state.maxHp = Math.floor(state.maxHp * (1 + r.statBless));
        log(`🌟 Đạo cơ thăng hoa: chỉ số bản thể +${Math.round(r.statBless * 100)}%.`);
    }
    syncStorySect();
    if (r.flag) {
        state.flags[r.flag] = true;
        const w = WORLD_TIERS.find(x => 'world_' + x.id === r.flag);
        log(`🌌 Mở đường tới ${w.name}!`);
    }
    if (r.ending) queueEndingChoice();
}

function queueEndingChoice() {
    dialogueQueue.push({ ending: true });
}

function completeGather(questId) {
    const rt = state.questActive.find(x => x.id === questId);
    if (rt) completeStep(rt);
}

function questAction(id) {
    const rt = state.questActive.find(x => x.id === id);
    if (!rt) return;
    const step = questStep(rt);
    if (step.go) return travelTo(step.go);
    if (step.hunt) {
        if (state.location !== step.hunt.loc) return travelTo(step.hunt.loc);
        return startHunt();
    }
    if (step.gather) {
        if (state.location !== step.gather.loc) return travelTo(step.gather.loc);
        if (!requireFree()) return;
        return startActivity({ type: 'gather', label: `🌿 ${step.gather.label}`, seconds: gatherSeconds(step), questId: id });
    }
    if (step.boss) {
        if (!requireFree()) return;
        const boss = BOSSES[step.boss];
        const npc = typeof boss.npc === 'string' ? NPCS[boss.npc] : boss.npc;
        const start = () => spawnBoss(step.boss, QUEST_INDEX[id]);
        if (boss.scriptedLoss) start();
        else coopGate(`Khiêu chiến ${npc?.name || boss.name}`, start);
    }
}

function spawnBoss(id, quest) {
    const b = BOSSES[id];
    const npc = typeof b.npc === 'string' ? NPCS[b.npc] : b.npc;
    let realm = b.realm, stage = b.stage || 0;
    if (!b.scriptedLoss && quest && realm >= quest.needs[0]) {
        realm = quest.needs[0];
        stage = Math.min(stage, quest.needs[1]);
    }
    const enemy = buildEnemy({
        name: npc?.name || b.name, kind: b.kind, look: npc?.look || null, tier: 'Boss', scale: b.scale || 1,
        boardSize: b.board || 4, realmIndex: realm, realmStage: stage, elements: b.elements, path: b.path,
        rootRank: rollEnemyRootRank(realm, 1)
    });
    enemy.bossId = id;
    if (b.adds) {
        enemy.escorts = Array.from({ length: b.adds.n }, () => {
            const add = buildEnemy({ name: b.adds.name, kind: b.adds.kind, realmIndex: realm, realmStage: stage, boardSize: 1 });
            add.str = Math.floor(add.str * 0.5);
            add.hp = add.maxHp = Math.floor(add.maxHp * 0.3);
            return add;
        });
    }
    enemy.scriptedLoss = !!b.scriptedLoss;
    startEncounter(enemy);
}

function clearBossStep(bossId) {
    state.questActive.slice().forEach(rt => {
        if (questStep(rt)?.boss === bossId) completeStep(rt);
    });
}

function enemyRenownPoints(enemy) {
    return [enemy, ...(enemy.escorts || [])].reduce((sum, unit) => sum + renownPoints(unit.realmIndex), 0);
}

function onEnemyDefeated(enemy) {
    if (enemy.bossId) clearBossStep(enemy.bossId);
    const killed = [enemy, ...(enemy.escorts || [])];
    if (enemy.hunted) {
        const earned = enemyRenownPoints(enemy);
        state.mastery[state.location] = (state.mastery[state.location] || 0) + killed.length;
        state.renown[state.location] = (state.renown[state.location] || 0) + earned;
        log(`🏆 Thiên kiêu +${formatNumber(earned)} điểm tại ${currentLocation().name}.`);
        reportRenown();
    }
    killed.forEach(unit => {
        state.questActive.slice().forEach(rt => {
            const hunt = questStep(rt)?.hunt;
            if (hunt && hunt.name === unit.name && hunt.loc === state.location) {
                rt.n++;
                if (rt.n >= hunt.n) completeStep(rt);
            }
        });
        if (state.bounty && state.bounty.name === unit.name && state.bounty.loc === state.location) {
            state.bounty.done++;
            if (state.bounty.done >= state.bounty.need) finishBounty();
        }
    });
    if (state.autoHunt) setTimeout(() => { if (state.autoHunt && !isBusy()) startHunt(); }, 800);
}

function onScriptedLoss(enemy) {
    state.hp = state.totalMaxHp;
    log(`💫 ${enemy.name} không hạ sát thủ. Ngươi sống sót.`);
    clearBossStep(enemy.bossId);
}

function acceptSideQuest(id) {
    state.questActive.push({ id, step: 0, n: 0 });
    log(`📜 Nhận nhiệm vụ phụ: ${QUEST_INDEX[id].title}`);
    questsOnLocation();
    renderAll();
}

function gatherSeconds(step) {
    return step.gather.hours * 3600 / GATHER_TIME_DIVISOR;
}

function questStepText(rt) {
    const step = questStep(rt);
    if (step.go) return `Đi tới ${LOCATIONS[step.go].name}`;
    if (step.hunt) return `Diệt ${step.hunt.name} tại ${LOCATIONS[step.hunt.loc].name} (${rt.n}/${step.hunt.n})`;
    if (step.gather) return `${step.gather.label} tại ${LOCATIONS[step.gather.loc].name} (${formatRealDuration(hastedSeconds(gatherSeconds(step)))})`;
    if (step.boss) {
        const b = BOSSES[step.boss];
        const npc = typeof b.npc === 'string' ? NPCS[b.npc] : b.npc;
        return `Khiêu chiến ${npc?.name || b.name}`;
    }
    return '';
}

function questActionLabel(rt) {
    const step = questStep(rt);
    if (step.boss) return 'Khiêu chiến';
    const loc = step.go || step.hunt?.loc || step.gather?.loc;
    if (loc && loc !== state.location) return 'Đi ngay';
    return step.gather ? 'Bắt đầu' : 'Đi săn';
}

function renderQuestPanel() {
    const el = $('questPanel');
    if (!el) return;
    const cards = state.questActive.map(rt => {
        const q = QUEST_INDEX[rt.id];
        const main = rt.id[0] === 'm';
        return `<div class="quest-card ${main ? 'main' : ''}">
            <div class="small">${main ? ACTS[q.act - 1].name : 'Nhiệm vụ phụ'}${q.unlock != null ? ` · mở khóa ${REALMS[q.unlock]}` : ''}</div>
            <b>${q.title}</b>
            <div class="small">${questStepText(rt)}</div>
            <button class="mini-btn" onclick="questAction('${rt.id}')">${questActionLabel(rt)}</button>
        </div>`;
    });
    if (!mainQuestRuntime()) {
        const q = nextMainQuest();
        if (q) cards.unshift(`<div class="quest-card"><div class="small">${ACTS[q.act - 1].name}</div><b>${q.title}</b>
            <div class="small">Cần đạt ${REALMS[q.needs[0]]} ${STAGES[q.needs[1]]} — hãy bế quan.</div></div>`);
        else if (state.endingId) cards.unshift(`<div class="quest-card main"><b>Đã kết thúc: ${ENDINGS.find(e => e.id === state.endingId).text}</b></div>`);
    }
    if (state.bounty) {
        const b = state.bounty;
        cards.push(`<div class="quest-card"><div class="small">Treo thưởng</div><b>${b.name}</b><div class="small">${LOCATIONS[b.loc].name} (${b.done}/${b.need})</div></div>`);
    }
    el.innerHTML = cards.join('') || '<div class="small">Chưa có nhiệm vụ.</div>';
}

/* ---------- thoại ---------- */
const dialogueQueue = [];

function playDialogue(lines) {
    dialogueQueue.push(...lines.map(([who, text]) => ({ who, text })));
    if (!document.getElementById('dialogueLayer')?.classList.contains('open')) nextDialogue();
}

function speakerOf(who) {
    if (who === 'me') return { name: state.name, svg: playerAvatarSvg() };
    const npc = NPCS[who] || { name: who };
    if (who === 'narr') return { name: '', svg: '' };
    return { name: npc.name, title: npc.title, svg: npcAvatarSvg(npc) };
}

function nextDialogue() {
    const layer = $('dialogueLayer');
    if (!layer) return;
    const line = dialogueQueue.shift();
    if (!line) { layer.classList.remove('open'); return; }
    if (line.ending) { layer.classList.remove('open'); showEndingChoice(); return; }
    const sp = speakerOf(line.who);
    const text = line.text.replaceAll('{name}', state.name);
    layer.innerHTML = `<div class="dialogue-box" onclick="nextDialogue()">
        ${sp.svg ? `<div class="dialogue-portrait">${sp.svg}</div>` : ''}
        <div class="dialogue-text">
            ${sp.name ? `<b>${sp.name}</b> ${sp.title ? `<span class="small">${sp.title}</span>` : ''}` : ''}
            <p class="${sp.name ? '' : 'narration'}">${text}</p>
            <div class="small dialogue-next">Bấm để tiếp tục ▸</div>
        </div></div>`;
    layer.classList.add('open');
}

function showEndingChoice() {
    showDialog({
        message: 'Chung Nguyên Đài trống. Ngươi làm gì?',
        buttons: ENDINGS.map(e => ({ text: e.text, value: e.id, variant: 'primary' }))
    }).then(choice => {
        const ending = ENDINGS.find(e => e.id === choice) || ENDINGS[0];
        state.endingId = ending.id;
        playDialogue(ending.lines.map(text => ['narr', text]));
        renderAll();
    });
}

/* ---------- panel địa điểm & hình tượng ---------- */
function renderLocationPanel() {
    const el = $('locationPanel');
    if (!el) return;
    const loc = currentLocation();
    const mats = worldTierOfRealm(state.realmIndex).id;
    el.innerHTML = `<div class="loc-head"><b>${loc.icon} ${loc.name}</b>
        <span class="small">${worldOf(loc.id).name} · linh khí x${loc.qi.toFixed(2)} · ${MATERIAL_NAMES[mats]}: ${state.mats[mats] || 0}</span></div>
        <div class="small">${loc.desc}</div>
        ${(loc.enemies || []).length ? `<div class="small">⚔️ Kẻ địch: ${REALMS[loc.minR]} – ${REALMS[loc.maxR]}${loc.maxS != null ? ` ${STAGES[loc.maxS]}` : ''}</div>` : ''}
        <div class="small">⛩️ Tông môn: ${sectEscape(sectName() || 'chưa có')}</div>
        ${(loc.enemies || []).length ? `<div class="small">🎯 Thành thạo khu vực: ${state.mastery[loc.id] || 0} điểm · ⚡ Cảnh giới: mọi việc nhanh x${realmHaste(state.realmIndex).toFixed(2)}</div>` : ''}
        ${renownStatusHTML()}
        ${forgeQueueHTML()}`;
}

function renderAppearancePanel() {
    const el = $('appearancePanel');
    if (!el) return;
    const slots = GEAR_SLOT_IDS.map(slot => {
        const it = equippedInSlot(slot);
        const color = it ? GEAR_QUALITIES[it.quality || 0].color : '#667';
        const stale = it && (it.reqRealm || 0) < state.realmIndex;
        return `<div class="gear-slot" style="border-color:${color}" title="${it ? gearStatText(it) : 'Trống'}">
            <span>${GEAR_SLOTS[slot].icon}</span>
            <div><div class="small">${GEAR_SLOTS[slot].label}${stale ? ' · lỗi thời' : ''}</div><b style="color:${color}">${it ? it.name.replace(` ${GEAR_SLOTS[slot].label}`, '') : '—'}</b></div>
        </div>`;
    }).join('');
    const path = DAO_PATHS[state.daoPath];
    const beatenBy = Object.values(DAO_PATHS).find(p => p.beats === state.daoPath);
    el.innerHTML = `<div class="hero-card"><div class="hero-portrait">${playerAvatarSvg()}</div><div class="gear-slots">${slots}</div></div>
        <div class="loc-actions">
            <button class="mini-btn" onclick="equipForRealm()">Đúng cảnh giới</button>
            <button class="mini-btn" onclick="equipAll()">Mạnh nhất</button>
            <button class="mini-btn" onclick="sellOutdatedGear()">Bán lỗi thời (${outdatedGear().length})</button>
        </div>
        <div class="small">${path.icon} <b>${path.name}</b> · ${path.desc}</div>
        <div class="small">Khắc ${DAO_PATHS[path.beats].name} (+25%) · bị ${beatenBy.name} khắc (-20%)</div>`;
}

function renderWorldPanels() {
    renderMap();
    renderLocationPanel();
    renderQuestPanel();
    renderAppearancePanel();
    renderActivityBar();
    renderTestPanel();
    renderSectPanel();
    renderRoomPanel();
    syncBattleOverlay();
    if (typeof refreshSceneSpots === 'function' && sceneState.canvas) {
        refreshSceneSpots();
        renderWorldViewTabs();
    }
}

/* ---------- chế độ test ---------- */
const TEST_SPEEDS = [1, 60, 3600, 86400, 259200];

function toggleTestPanel() {
    state.testPanel = !state.testPanel;
    renderAll();
}

function renderTestPanel() {
    const el = $('testPanel');
    if (!el) return;
    el.style.display = state.testPanel ? 'block' : 'none';
    if (!state.testPanel) return;
    const realmOpts = REALMS.map((r, i) => `<option value="${i}" ${i === state.realmIndex ? 'selected' : ''}>${i}. ${r}</option>`).join('');
    const stageOpts = STAGES.map((s, i) => `<option value="${i}" ${i === state.realmStage ? 'selected' : ''}>${s}</option>`).join('');
    const locOpts = Object.values(LOCATIONS).map(l => `<option value="${l.id}" ${l.id === state.location ? 'selected' : ''}>${l.name}</option>`).join('');
    const speedBtns = TEST_SPEEDS.map(s => `<button class="filter-chip ${s === state.testSpeed ? 'active' : ''}" onclick="setTestSpeed(${s})">x${s.toLocaleString()}</button>`).join('');
    const realmSeconds = realmRealSeconds(state.realmIndex) / (state.testSpeed || 1);
    el.innerHTML = `<strong>🧪 Bảng test</strong>
        <div class="small">Tốc độ thời gian (cảnh giới này ≈ ${formatRealDuration(realmSeconds)})</div>
        <div class="filter-chips">${speedBtns}</div>
        <div class="test-row"><select id="testRealm" aria-label="Cảnh giới">${realmOpts}</select><select id="testStage" aria-label="Tiểu cảnh">${stageOpts}</select><button onclick="testJumpRealm()">Nhảy tới</button></div>
        <div class="test-row"><select id="testLoc" aria-label="Địa điểm">${locOpts}</select><button onclick="testTeleport()">Dịch chuyển</button></div>
        <div class="test-row">
            <button onclick="testFillXp()">Đầy tu vi</button>
            <button onclick="testGearUp()">Đồ đúng cảnh</button>
            <button onclick="testSkipStep()">Xong bước NV</button>
            <button onclick="testFinishActivity()">Xong hoạt động</button>
            <button onclick="testWinBattle()">Thắng trận</button>
            <button onclick="testRich()">+Linh thạch</button>
        </div>`;
}

function setTestSpeed(speed) {
    state.testSpeed = speed;
    renderAll();
}

function testJumpRealm() {
    const realm = Number($('testRealm').value), stage = Number($('testStage').value);
    if (window.__boardBattle) forfeitBoardBattle();
    state.currentEnemy = null;
    state.activity = null;
    state.realmIndex = realm;
    state.realmStage = stage;
    state.xp = 0;
    const base = baseStatsFor(realm, stage, state.root?.rank || 0);
    state.power = base.power;
    state.defense = base.defense;
    state.maxHp = base.hp;
    state.maxAge = Math.max(state.maxAge, state.age + 100000);
    state.inventory.forEach(it => { if ((it.reqRealm || 0) > realm) it.equipped = false; });

    state.questActive = state.questActive.filter(rt => rt.id[0] !== 'm');
    const firstOpen = MAIN_QUESTS.findIndex(q => q.needs[0] > realm || (q.needs[0] === realm && q.needs[1] > stage));
    const doneUntil = firstOpen < 0 ? MAIN_QUESTS.length - 1 : firstOpen - 1;
    state.questDone = state.questDone.filter(id => id[0] !== 'm');
    state.flags = {};
    state.forgeQueue = state.forgeQueue || [];
    MAIN_QUESTS.forEach((q, i) => {
        if (i < doneUntil) {
            state.questDone.push(q.id);
            if (q.reward?.flag) state.flags[q.reward.flag] = true;
        }
    });
    const tier = worldTierOfRealm(realm);
    if (LOCATIONS[state.location].world !== tier.id) {
        state.location = Object.values(LOCATIONS).find(l => l.world === tier.id).id;
    }
    state.flags['world_' + tier.id] = true;
    if (!state.ownSect && !state.sectInfo) {
        state.sect = null;
        syncStorySect();
    }
    mapViewWorld = tier.id;
    advanceMainQuest();
    recalculateStats();
    state.hp = state.totalMaxHp;
    log(`🧪 Nhảy tới ${REALMS[realm]} ${STAGES[stage]}.`);
    renderAll();
}

function testTeleport() {
    state.activity = null;
    state.location = $('testLoc').value;
    state.flags['world_' + currentLocation().world] = true;
    checkArrival();
}

function testFillXp() {
    state.xp = getNeed();
    window._battleActive = false;
    checkRealmProgress();
    renderAll();
}

function testGearUp() {
    state.inventory.forEach(it => { it.equipped = false; });
    const set = GEAR_SLOT_IDS.map(slot => ({ ...makeGearItem(state.realmIndex, slot, 2), equipped: true }));
    state.inventory.push(...set);
    const grade = maxLinhBaoGradeForRealm(state.realmIndex);
    boardItems().filter(Boolean).forEach(lb => { lb.grade = grade; lb.level = 1; });
    recalculateStats();
    state.hp = state.totalMaxHp;
    renderAll();
}

function testSkipStep() {
    const rt = mainQuestRuntime();
    if (rt) completeStep(rt);
}

function testFinishActivity() {
    if (!state.activity) return;
    if (state.activity.type === 'travel') {
        state.location = state.activity.dest;
        state.activity = null;
        checkArrival();
    } else {
        finishActivity();
    }
}

function testWinBattle() {
    const b = window.__boardBattle;
    if (b && b.running) b.foes.forEach(c => { c.hp = 0; });
}

function testRich() {
    state.gold += goldRef(state.realmIndex) * 1000;
    Object.keys(MATERIAL_NAMES).forEach(k => { state.mats[k] = (state.mats[k] || 0) + 100; });
    renderAll();
}

/* ---------- khởi động ---------- */
setInterval(worldTick, TICK_MS);
window.addEventListener('load', () => initScene());
setInterval(() => { if (state.root?.elements && !state.dead) saveProgress(true); }, 30000);

Object.assign(window, {
    setDaoPath, openDaoHall, buyDaoSkill, hireGuard, travelTo, teleportTo, joinSect, selectMapNode, setMapWorld, cancelActivity, startHunt, startExplore, toggleAutoHunt, openServiceShop, openForge,
    startForge, upgradeGear, acceptBounty, questAction, acceptSideQuest, nextDialogue, toggleTestPanel, setTestSpeed, testJumpRealm,
    testTeleport, testFillXp, testGearUp, testSkipStep, testFinishActivity, testWinBattle, testRich
});
