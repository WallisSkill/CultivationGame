/* ===========================================================
   ĐỘNG CƠ THẾ GIỚI
   - Đồng hồ: mọi tiến trình tính bằng giây đời thực, nhân testSpeed khi test,
     tiếp tục chạy khi đóng game (bù offline lúc mở lại).
   - Một thời điểm chỉ có một hoạt động (đi đường, săn, thám hiểm, rèn, dưỡng thương).
     Đang có hoạt động thì KHÔNG tu luyện được.
=========================================================== */
const TICK_MS = 250;
const HUNT_SECONDS = 5 * 60;
const EXPLORE_SECONDS = 15 * 60;
const BASE_TRAVEL_SPEED = 1;
const BOUNTY_KILLS = 5;

let worldLastTick = Date.now();
let worldUiAccum = 0;
let mapViewWorld = null;
let mapSelected = null;

function currentLocation() {
    return LOCATIONS[state.location] || LOCATIONS.thanh_thuy;
}

function currentLocationQi() {
    return currentLocation().qi || 1;
}

function initWorldState() {
    state.location = state.location || 'thanh_thuy';
    state.look = { ...defaultLook(), ...(state.look || {}) };
    state.mats = state.mats || {};
    state.flags = state.flags || {};
    state.questDone = state.questDone || [];
    state.questActive = state.questActive || [];
    state.activity = state.activity || null;
    state.testSpeed = state.testSpeed || 1;
    state.lastSeen = state.lastSeen || Date.now();
}

/* ---------- đồng hồ ---------- */
function advanceWorld(sec) {
    if (window._battleActive || state.dead || !state.root?.elements) return;
    state.age += sec / SECONDS_PER_DAY;
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
    if (window._battleActive) { showToast('Đang giao chiến.', 'warn'); return false; }
    if (state.activity) { showToast(`Đang bận: ${state.activity.label}.`, 'warn'); return false; }
    return true;
}

function startActivity(activity) {
    state.activity = { total: activity.seconds, remaining: activity.seconds, ...activity };
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
            spawnEnemyWithRules();
            break;
        case 'explore':
            window.exploreOriginalImpl();
            break;
        case 'gather':
            completeGather(a.questId);
            break;
        case 'forge':
            finishForge(a);
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
            : `<b>🚶 Rảnh rỗi</b> <span class="small">— không tu luyện, tu vi đứng yên</span>`;
        return;
    }
    const remaining = activityRemaining();
    const pct = Math.max(0, Math.min(100, 100 * (1 - remaining / a.total)));
    const canCancel = a.type !== 'rest';
    el.innerHTML = `<div class="activity-row">
        <b>${a.label}</b> <span class="small">còn ${formatRealDuration(remaining / (state.testSpeed || 1))} · không tu luyện được</span>
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

function travelSpeed() {
    const realm = state.realmIndex || 0;
    const tier = worldTierOfRealm(realm);
    const boots = (typeof equippedInSlot === 'function' ? equippedInSlot('boots')?.speed : 0) || 0;
    return BASE_TRAVEL_SPEED + (realm - tier.from) * 0.15 + boots;
}

function edgeSeconds(from, to) {
    const a = LOCATIONS[from], b = LOCATIONS[to];
    if (a.gate && a.gate.to === to) return a.gate.minutes * 60 / travelSpeed();
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    return distance * worldOf(from).travelScale * 60 / travelSpeed();
}

function neighbors(id) {
    const loc = LOCATIONS[id];
    const out = [...loc.links];
    if (loc.gate && (!loc.gate.flag || state.flags[loc.gate.flag]) && worldUnlocked(LOCATIONS[loc.gate.to].world)) out.push(loc.gate.to);
    return out;
}

function findPath(from, to) {
    const dist = { [from]: 0 };
    const prev = {};
    const open = new Set([from]);
    while (open.size) {
        const cur = [...open].reduce((a, b) => dist[a] <= dist[b] ? a : b);
        open.delete(cur);
        if (cur === to) break;
        neighbors(cur).forEach(n => {
            const d = dist[cur] + edgeSeconds(cur, n);
            if (d < (dist[n] ?? Infinity)) { dist[n] = d; prev[n] = cur; open.add(n); }
        });
    }
    if (dist[to] == null) return null;
    const path = [to];
    while (path[0] !== from) path.unshift(prev[path[0]]);
    return { path, seconds: dist[to] };
}

function travelTo(id) {
    if (!requireFree()) return;
    if (id === state.location) return;
    const route = findPath(state.location, id);
    if (!route) { showToast('Chưa có đường tới đó.', 'warn'); return; }
    const legs = route.path.slice(1).map((to, i) => ({ from: route.path[i], to, seconds: edgeSeconds(route.path[i], to), left: edgeSeconds(route.path[i], to) }));
    startActivity({ type: 'travel', label: `🛤️ Đi tới ${LOCATIONS[id].name}`, seconds: route.seconds, legs, leg: 0, dest: id });
    log(`🛤️ Khởi hành tới ${LOCATIONS[id].name}, mất ${formatRealDuration(route.seconds)}. Trên đường không thể tu luyện.`);
}

function checkArrival() {
    mapViewWorld = currentLocation().world;
    mapSelected = null;
    questsOnLocation();
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
        return `<g class="map-node ${here ? 'here' : ''}" role="button" tabindex="0" aria-label="${l.name}" onclick="selectMapNode('${l.id}')" onkeydown="if(event.key==='Enter')selectMapNode('${l.id}')">
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
    return `<div class="map-dest">
        <div><b>${loc.icon} ${loc.name}</b> <span class="small">linh khí x${loc.qi.toFixed(2)} · ${REALMS[loc.minR]} trở lên</span>
        <div class="small">${loc.desc}</div></div>
        ${route ? `<button class="primary" onclick="travelTo('${loc.id}')">Đi (${formatRealDuration(route.seconds)})</button>` : '<span class="small">Chưa có đường</span>'}
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
function startHunt() {
    if (!requireFree()) return;
    if (!(currentLocation().enemies || []).length) return;
    startActivity({ type: 'hunt', label: '🗡️ Lùng sục con mồi', seconds: HUNT_SECONDS });
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
    const rows = GEAR_SLOT_IDS.map(slot => {
        const it = makeGearItem(realm, slot, 2);
        return `<div class="shop-item forge-row">
            <div><b style="color:${GEAR_QUALITIES[2].color}">${GEAR_SLOTS[slot].icon} ${it.name}</b><div class="small">${gearStatText(it)}</div></div>
            <button onclick="startForge('${slot}')" ${have < FORGE_MATERIAL_COST || state.gold < price ? 'disabled' : ''}>Rèn</button>
        </div>`;
    }).join('');
    openWorldModal('forgeModal', '🔨 Lò rèn', `<div class="small">Mỗi món: ${FORGE_MATERIAL_COST} ${MATERIAL_NAMES[worldId]} (có ${have}) + ${formatNumber(price)} linh thạch, ${FORGE_HOURS} giờ. 15% ra phẩm Tiên.</div>${rows}`);
}

function startForge(slot) {
    if (!requireFree()) return;
    const realm = state.realmIndex;
    const worldId = worldTierOfRealm(realm).id;
    const price = gearPrice(realm, 2);
    if ((state.mats[worldId] || 0) < FORGE_MATERIAL_COST || state.gold < price) return;
    state.mats[worldId] -= FORGE_MATERIAL_COST;
    state.gold -= price;
    document.getElementById('forgeModal').style.display = 'none';
    startActivity({ type: 'forge', label: '🔨 Rèn trang bị', seconds: FORGE_HOURS * 3600, slot, realm });
}

function finishForge(a) {
    const gear = makeGearItem(a.realm, a.slot, Math.random() < 0.15 ? 3 : 2);
    addItemToInventory(gear);
    log(`🔨 Rèn xong ${gear.name}!`);
}

function acceptBounty() {
    const pool = Object.values(LOCATIONS).filter(l => l.world === currentLocation().world && (l.enemies || []).length && l.minR <= state.realmIndex);
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
        return startActivity({ type: 'gather', label: `🌿 ${step.gather.label}`, seconds: step.gather.hours * 3600, questId: id });
    }
    if (step.boss) {
        if (!requireFree()) return;
        spawnBoss(step.boss, QUEST_INDEX[id]);
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
        boardSize: b.board || 4, realmIndex: realm, realmStage: stage, elements: b.elements,
        rootRank: Math.min(ROOT_RANKS.length - 1, (state.root?.rank || 0) + 1)
    });
    enemy.bossId = id;
    enemy.scriptedLoss = !!b.scriptedLoss;
    startEncounter(enemy);
}

function clearBossStep(bossId) {
    state.questActive.slice().forEach(rt => {
        if (questStep(rt)?.boss === bossId) completeStep(rt);
    });
}

function onEnemyDefeated(enemy) {
    if (enemy.bossId) clearBossStep(enemy.bossId);
    state.questActive.slice().forEach(rt => {
        const hunt = questStep(rt)?.hunt;
        if (hunt && hunt.name === enemy.name && hunt.loc === state.location) {
            rt.n++;
            if (rt.n >= hunt.n) completeStep(rt);
        }
    });
    if (state.bounty && state.bounty.name === enemy.name && state.bounty.loc === state.location) {
        state.bounty.done++;
        if (state.bounty.done >= state.bounty.need) finishBounty();
    }
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

function questStepText(rt) {
    const step = questStep(rt);
    if (step.go) return `Đi tới ${LOCATIONS[step.go].name}`;
    if (step.hunt) return `Diệt ${step.hunt.name} tại ${LOCATIONS[step.hunt.loc].name} (${rt.n}/${step.hunt.n})`;
    if (step.gather) return `${step.gather.label} tại ${LOCATIONS[step.gather.loc].name} (${step.gather.hours} giờ)`;
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
    const busy = isBusy() ? 'disabled' : '';
    const sideOffers = SIDE_QUESTS.filter(q => q.loc === loc.id && !state.questDone.includes(q.id)
        && !state.questActive.some(rt => rt.id === q.id) && needsMet(q));
    const buttons = [];
    if ((loc.enemies || []).length) {
        buttons.push(`<button ${busy} onclick="startHunt()">🗡️ Săn (${formatRealDuration(HUNT_SECONDS)})</button>`);
        buttons.push(`<button class="${state.autoHunt ? 'primary' : ''}" onclick="toggleAutoHunt()">🔁 ${state.autoHunt ? 'Dừng săn liên tục' : 'Săn liên tục'}</button>`);
    }
    buttons.push(`<button ${busy} onclick="startExplore()">🧭 Thám hiểm (${formatRealDuration(EXPLORE_SECONDS)})</button>`);
    if (hasService('shop')) buttons.push(`<button onclick="openServiceShop()">🏪 Cửa hàng</button>`);
    if (hasService('forge')) buttons.push(`<button onclick="openForge()">🔨 Lò rèn</button>`);
    if (hasService('board') && !state.bounty) buttons.push(`<button onclick="acceptBounty()">📜 Nhận treo thưởng</button>`);
    const sides = sideOffers.map(q => `<div class="quest-card">
        <div class="side-offer">${npcAvatarSvg(NPCS[q.npc])}<div><b>${NPCS[q.npc].name}</b><div class="small">${q.title}</div></div></div>
        <button class="mini-btn" onclick="acceptSideQuest('${q.id}')">Nhận</button></div>`).join('');
    const mats = worldTierOfRealm(state.realmIndex).id;
    el.innerHTML = `<div class="loc-head"><b>${loc.icon} ${loc.name}</b>
        <span class="small">${worldOf(loc.id).name} · linh khí x${loc.qi.toFixed(2)} · ${MATERIAL_NAMES[mats]}: ${state.mats[mats] || 0}</span></div>
        <div class="small">${loc.desc}</div>
        <div class="loc-actions">${buttons.join('')}</div>${sides}`;
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
    el.innerHTML = `<div class="hero-card"><div class="hero-portrait">${playerAvatarSvg()}</div><div class="gear-slots">${slots}</div></div>`;
}

function renderWorldPanels() {
    renderMap();
    renderLocationPanel();
    renderQuestPanel();
    renderAppearancePanel();
    renderActivityBar();
    renderTestPanel();
    syncCultivationButton();
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
    const realmSeconds = REALM_REAL_DAYS * SECONDS_PER_DAY / (state.testSpeed || 1);
    el.innerHTML = `<strong>🧪 Bảng test</strong>
        <div class="small">Tốc độ thời gian (1 cảnh giới ≈ ${formatRealDuration(realmSeconds)})</div>
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
    if (b && b.running) b.enemy.hp = 0;
}

function testRich() {
    state.gold += goldRef(state.realmIndex) * 1000;
    Object.keys(MATERIAL_NAMES).forEach(k => { state.mats[k] = (state.mats[k] || 0) + 100; });
    renderAll();
}

/* ---------- khởi động ---------- */
setInterval(worldTick, TICK_MS);
setInterval(() => { if (state.root?.elements && !state.dead) saveProgress(true); }, 30000);

Object.assign(window, {
    travelTo, selectMapNode, setMapWorld, cancelActivity, startHunt, startExplore, toggleAutoHunt, openServiceShop, openForge,
    startForge, acceptBounty, questAction, acceptSideQuest, nextDialogue, toggleTestPanel, setTestSpeed, testJumpRealm,
    testTeleport, testFillXp, testGearUp, testSkipStep, testFinishActivity, testWinBattle, testRich
});
