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
const TELEPORT_MIN_REALM = { pham: 2, tien: 12, thanh: 20, thien: 25, hondon: 29, hongmong: 30, chungnguyen: 31, huvo: 32 };
/* Cõi cuối: cảnh giới cao hơn cõi thì tới tức thì, thấp hơn thì mất ngàn giờ cho mỗi bậc thiếu */
const ABSOLUTE_WORLDS = ['hondon', 'hongmong', 'chungnguyen'];
const INSTANT_LEG_SECONDS = 1;
const LOW_REALM_HOURS_PER_STEP = 1000;
const STAR_STONE_GOLD_REFS = 40;
const STAR_STONE_MINUTES = 30;
const MAP_W = 1000;
const MAP_H = 560;
const MAP_DECOR_DENSITY = 70 / (MAP_W * MAP_H);
const ROAD_EVENT_INTERVAL = 5;
const ROAD_EVENT_BASE_CHANCE = 0.03;
const ROAD_EVENT_LUCK_FACTOR = 0.1;
const ROAD_EVENT_MAX_CHANCE = 0.15;
const ROAD_BANDIT_XP_MINUTES = 0.5;
const ROAD_BANDITS = {
    pham: 'Sơn Tặc', tien: 'Tiên Đạo Tặc', thanh: 'Thánh Giới Đạo Tặc', thien: 'Cực Đạo Tán Tu'
};
const BOUNTY_KILLS = 5;
const BOUNTY_GOLD_REFS = 15;
const BOUNTY_HOURS = 1;
const BOUNTY_MATERIAL = 6;

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

/* Đồ vượt cấp mang chỉ số của cảnh giới trong tên, cao hơn cảnh giới yêu cầu */
function gearStatRealm(item) {
    const name = item.name.replace(/^[^\p{L}]+/u, '');
    return Math.max(item.reqRealm || 0, GEAR_SERIES.findIndex(series => name.startsWith(`${series} `)));
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
    state.questActive = (state.questActive || []).filter(rt => QUEST_INDEX[rt.id]);
    state.forgeQueue = state.forgeQueue || [];
    state.hired = state.hired || 0;
    migrateCourtOrders();
    state.inventory.forEach(it => {
        if (it.slot && (it.reqRealm || 0) >= GEAR_SUB_REALM && !it.subs) it.subs = rollGearSubs(it.reqRealm, it.quality || 0);
    });
    if (!state.gearSubsRanked) {
        state.inventory.filter(it => it.subs?.length).forEach(it => {
            it.subs = rollGearSubs(gearStatRealm(it), it.quality || 0, it.subs.map(s => s.kind));
        });
        state.gearSubsRanked = true;
    }
    state.race = state.race || (DAO_PATHS[state.daoPath]?.race === 'yeu' ? 'yeu' : 'nhan');
    state.origin = state.origin || 'thuy';
    state.daoPath = state.daoPath || ORIGINS[state.origin].path;
    applyOriginQuest();
    restoreHuVoQuests();
    if (state.huVoDisciple) takeHuVoName(HU_VO_DISCIPLE_NAME);
    state.ringTale = state.ringTale ?? state.realmIndex ?? 0;
    state.activity = state.activity || null;
    state.testSpeed = isGameAdmin() ? state.testSpeed || 1 : 1;
    state.lastSeen = state.lastSeen || Date.now();
    migrateRealmShift();
    migrateHuVoUnearned();
    mergeStacks();
    migrateMainChapters();
    if (state.flags.open_da_bao && state.realmIndex >= SAINT_REALM) state.flags.open_thanh_thi = true;
    if (state.ageCurveFixed) {
        state.age = Math.max(START_AGE, state.age - legacyEntryAge(state.realmIndex, state.maxAge));
        delete state.ageCurveFixed;
    }
    migrateStatCurve();
    moveUpToRealmWorld();
    state.intel = state.intel || [];
    learnIntel(state.location);
}

/* Save cũ theo đường cong chỉ số trước: giữ nguyên phần cộng thêm, chỉ đổi tỉ lệ theo đường mới */
function migrateStatCurve() {
    if (state.statCurve === STAT_CURVE_VERSION) return;
    state.statCurve = STAT_CURVE_VERSION;
    if (!state.root?.elements) return;
    const realm = state.realmIndex || 0, stage = state.realmStage || 0;
    const body = refAtk(realm, stage) / oldRefAtk(realm, stage);
    state.power = Math.floor(state.power * body);
    state.defense = Math.floor(state.defense * body);
    state.maxHp = Math.floor(state.maxHp * body);
    state.hp = Math.floor(state.hp * body);
    (state.inventory || []).filter(it => it && it.slot && it.reqRealm != null).forEach(it => {
        const gear = refAtk(it.reqRealm, GEAR_MID_STAGE) / oldRefAtk(it.reqRealm, GEAR_MID_STAGE);
        ['atk', 'def', 'hp'].forEach(key => { if (it[key]) it[key] = Math.floor(it[key] * gear); });
    });
    recalculateStats();
}

/* Save cũ: chèn ba cảnh giới sau Tiên Đế, ai từ Thánh Nhân trở lên dời lên ba bậc */
const REALM_SHIFT_FROM = 16;
const REALM_SHIFT = 3;

/* Bản đầu của Đại Kết Cục cho lên Hư Vô Chí Đạo mà không qua trận nào: save cũ quay về Chung Nguyên viên mãn và đánh lại từ đầu */
function migrateHuVoUnearned() {
    if (state.huVoEarned) return;
    state.huVoEarned = true;
    if (!state.questDone?.includes('m40') && state.realmIndex < REALM_COUNT - 1 && !state.huVoName) return;
    state.questDone = state.questDone.filter(id => id !== 'm40');
    state.questActive = state.questActive.filter(rt => rt.id !== 'm40');
    if (state.realmIndex >= REALM_COUNT - 1) {
        state.realmIndex = REALM_COUNT - 2;
        state.realmStage = STAGES.length - 1;
    }
    if (LOCATIONS[state.location]?.world === HU_VO_WORLD) state.location = 'chung_dai';
    if (state.huVoName) {
        state.name = state.huVoName;
        delete state.huVoName;
    }
}

function migrateRealmShift() {
    if (state.realmShift) return;
    state.realmShift = true;
    if (!state.root?.elements) return;
    const moved = r => r >= REALM_SHIFT_FROM ? r + REALM_SHIFT : r;
    if (state.realmIndex >= REALM_SHIFT_FROM) {
        const realm = state.realmIndex, stage = state.realmStage || 0;
        const body = refAtk(realm + REALM_SHIFT, stage) / refAtk(realm, stage);
        ['power', 'defense', 'maxHp', 'hp'].forEach(key => { state[key] = Math.floor(state[key] * body); });
        state.realmIndex = realm + REALM_SHIFT;
        (state.inventory || []).filter(it => it && it.slot && it.reqRealm >= REALM_SHIFT_FROM).forEach(it => {
            const gear = refAtk(it.reqRealm + REALM_SHIFT, GEAR_MID_STAGE) / refAtk(it.reqRealm, GEAR_MID_STAGE);
            ['atk', 'def', 'hp'].forEach(key => { if (it[key]) it[key] = Math.floor(it[key] * gear); });
            it.reqRealm += REALM_SHIFT;
        });
    }
    state.questDone = state.questDone.map(id => id.replace(/^(mc|st_)(\d+)_/, (all, head, realm) => `${head}${moved(Number(realm))}_`));
    state.questActive = state.questActive.filter(rt => !/^(mc|st_|m\d)/.test(rt.id));
    if (state.bounty?.name === 'Thiên Ngoại Đạo Tặc') state.bounty.name = 'Cực Đạo Tán Tu';
    if (state.bounty?.name === 'Thánh Vực Đạo Tặc') state.bounty.name = 'Thánh Giới Đạo Tặc';
    delete state.huntRange;
    MAIN_QUESTS.filter(q => q.needs[0] < state.realmIndex && !state.questDone.includes(q.id)).forEach(q => state.questDone.push(q.id));
    recalculateStats();
}

/* Save cũ: bỏ qua hồi nhỏ của các cảnh giới đã qua, cảnh giới đang ở thì đi lại từ đầu cảnh giới */
function migrateMainChapters() {
    if (state.mainChaptersSet) return;
    state.mainChaptersSet = true;
    if (!state.questDone.length) return;
    const next = MAIN_QUESTS.find(q => !q.chapter && !state.questDone.includes(q.id));
    if (!next) return;
    MAIN_QUESTS.filter(q => q.chapter && q.needs[0] < next.needs[0] && !state.questDone.includes(q.id)).forEach(q => state.questDone.push(q.id));
    state.questActive = state.questActive.filter(rt => rt.id[0] !== 'm');
}

/* ---------- đồng hồ ---------- */
function travelSecondsLeft() {
    const a = state.activity;
    return a?.type === 'travel' ? a.legs.slice(a.leg).reduce((sum, leg) => sum + leg.left, 0) : 0;
}

function advanceWorld(sec) {
    if (state.dead || !state.root?.elements) return;
    advanceForgeQueue(sec);
    accrueChaosStone(sec);
    const moving = window._battleActive ? 0 : Math.min(sec, travelSecondsLeft());
    state.age += (sec - moving) * ageYearsPerSecond(state.realmIndex) + moving * travelAgeYearsPerSecond(state.realmIndex);
    if (window._battleActive) return;
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
            endDescentIfDue();
            if (document.getElementById('start-screen')?.dataset.closed === '1') { advanceMainQuest(); advanceGuides(); }
            updateTrainingUI();
            renderActivityBar();
            updateMapToken();
            if (state.gemAuto) optimizeGems(true);
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
    state.age = Math.min(state.age, state.maxAge * AGE_OFFLINE_MAX_SHARE);
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
    const seconds = activity.type === 'travel' || activity.type === 'trial' ? activity.seconds : hastedSeconds(activity.seconds);
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
        case 'trial':
            finishTrial(a);
            break;
        default:
            log(`✅ ${a.label} xong.`);
    }
    renderAll();
}

function activityBarHTML() {
    const a = state.activity;
    if (window._battleActive) { return '<b>⚔️ Đang giao chiến</b> <span class="small">— tu vi tạm dừng</span>'; }
    if (!a) {
        const q = currentLocationQi();
        return state.autoTrain
            ? `<b>🧘 Đang bế quan</b> <span class="small">tại ${currentLocation().name} · linh khí x${q.toFixed(2)} · ${formatNumber(Math.floor(getEstimatedXpPerSecond()))} tu vi/giây</span>`
            : `<b>🚶 Rảnh rỗi</b> <span class="small">— tới chỗ Bế quan trong khu vực và ngồi xuống để tu luyện</span>`;
    }
    const remaining = activityRemaining();
    const pct = Math.max(0, Math.min(100, 100 * (1 - remaining / a.total)));
    const canCancel = a.type !== 'rest';
    return `<div class="activity-row">
        <b>${a.label}</b> <span class="small">còn ${formatRealDuration(remaining / (state.testSpeed || 1))} · không tu luyện được${a.type === 'travel' ? ` · kỳ ngộ ${(roadEventChance() * 100).toFixed(1)}% mỗi ${ROAD_EVENT_INTERVAL} giây` : ''}</span>
        ${canCancel ? '<button class="mini-btn" onclick="cancelActivity()">Dừng</button>' : ''}
    </div><div class="bar"><i style="width:${pct}%"></i></div>`;
}

function renderActivityBar() {
    writeHtml($('activityBar'), activityBarHTML());
}

/* ---------- di chuyển ---------- */
function worldOf(locId) {
    return WORLD_TIERS.find(w => w.id === LOCATIONS[locId].world);
}

/* Hư Vô Chi Chủ không xuống được nữa, đệ tử chỉ xuống khi có lệnh */
function hasLeftWorlds() {
    return (state.realmIndex || 0) >= REALM_COUNT - 1 && !huVoOnDuty();
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
    if (hasLeftWorlds()) return loc.world === HU_VO_WORLD;
    return ABSOLUTE_WORLDS.includes(loc.world) || ((state.realmIndex || 0) >= loc.minR && storyAreaOpen(id));
}

function storyAreaOpen(id) {
    const lock = STORY_AREA_UNLOCK[id];
    return !lock || (state.questDone || []).includes(lock);
}

function storyAreaLockText(id) {
    return `Cốt truyện chưa tới đây: mở sau nhiệm vụ "${QUEST_INDEX[STORY_AREA_UNLOCK[id]].title}".`;
}

/* Lên Giới cao rồi không được xuống thêm, trừ người đứng đầu Thiên Hạ Bảng của Giới đang ở.
   Đã đứng ở Giới thấp thì vẫn đi lại trong Giới đó và về lại được */
function worldIndex(worldId) {
    return WORLD_TIERS.findIndex(w => w.id === worldId);
}

function holdsWorldTop(worldId) {
    return thienHaRank(worldId) === 1;
}

function realmWorld() {
    return worldTierOfRealm(state.realmIndex || 0).id;
}

/* Thiên Ma Ngoại Vực và Thánh Giới cùng tính là một Giới */
function gioiIndex(worldId) {
    return worldIndex(worldId === 'thien' ? 'thanh' : worldId);
}

function descentActive() {
    return (state.descentUntil || 0) > Date.now();
}

/* Nhiệm vụ chính đang dẫn xuống Giới dưới thì được xuống đúng Giới đó */
function storyDescent(toWorld) {
    const rt = mainQuestRuntime();
    const step = rt && questStep(rt);
    return !!step && stepLocations(step).some(id => LOCATIONS[id]?.world === toWorld);
}

function descentBlocked(toWorld) {
    if ((state.realmIndex || 0) >= OVERSEER_REALM) return false;
    if (storyDescent(toWorld)) return false;
    const home = realmWorld();
    const floor = Math.min(gioiIndex(home), gioiIndex(currentLocation().world));
    return gioiIndex(toWorld) < floor && !holdsWorldTop(home) && !descentActive();
}

function teleportBlockReason(id) {
    const tier = worldOf(id);
    if (descentBlocked(tier.id)) return `Không được xuống ${tier.name}: cần đứng đầu Thiên Hạ Bảng ${worldTierOfRealm(state.realmIndex || 0).name} hoặc dùng Tinh Không Thạch.`;
    return teleportLockReason(id);
}

function teleportLockReason(id) {
    const tier = worldOf(id);
    const minRealm = TELEPORT_MIN_REALM[tier.id];
    if (minRealm == null) return '';
    if ((state.realmIndex || 0) >= Math.max(minRealm, OVERSEER_REALM)) return '';
    const missing = [];
    if (!state.sect) missing.push('nhập tông môn');
    if ((state.realmIndex || 0) < minRealm) missing.push(`đạt ${REALMS[minRealm]}`);
    return missing.length ? `Dịch chuyển trong ${tier.name}: cần ${missing.join(' và ')}.` : '';
}

/* Đã mở khóa dịch chuyển tới đó, kể cả khi bản thân đang bị cấm xuống Giới thấp */
function teleportUnlocked(id) {
    return id in LOCATIONS && canEnterLocation(id) && TELEPORT_MIN_REALM[LOCATIONS[id].world] != null
        && worldUnlocked(LOCATIONS[id].world) && !teleportLockReason(id);
}

function canTeleport(id) {
    return teleportUnlocked(id) && !descentBlocked(worldOf(id).id);
}

function teleportTo(id) {
    if (!requireFree() || !canTeleport(id)) return;
    state.location = id;
    log(`⚡ Dịch chuyển tới ${LOCATIONS[id].name}.`);
    guideDone('teleport');
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
    if (loc.gate && (!loc.gate.flag || state.flags[loc.gate.flag]) && worldUnlocked(LOCATIONS[loc.gate.to].world)
        && !descentBlocked(LOCATIONS[loc.gate.to].world)) out.push(loc.gate.to);
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

/* Đồng đội đưa đi: được đi qua vùng chưa đủ cảnh giới, không bao giờ chậm hơn tự đi.
   Người đưa đã mở khóa dịch chuyển tới đó thì tới ngay, không cần có đường đi */
function carriedTravel(id, seconds, carrier) {
    if (!requireFree() || !huVoMayGo(id)) return;
    if (seconds <= 0) {
        state.location = id;
        log(`⚡ ${carrier} đưa ngươi tới ngay ${LOCATIONS[id].name}.`);
        checkArrival();
        return;
    }
    const route = findPath(state.location, id, true);
    if (!route) {
        showToast(`${carrier} chưa mở khóa dịch chuyển tới đó, mà đường đi thì chưa có.`, 'warn');
        return;
    }
    if (seconds >= route.seconds && findPath(state.location, id)) {
        showToast(`${carrier} không đi nhanh hơn ngươi. Người đưa phải cao cảnh giới hơn hoặc có thể dịch chuyển tới đó.`, 'warn');
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
    if (!huVoMayGo(id)) { showToast('Đệ tử của Chủ chỉ rời Hư Vô Cung khi được giao việc tại nơi đó.', 'warn'); return; }
    if (huVoDescend(id)) return;
    const route = findPath(state.location, id);
    if (!route) { showToast('Chưa có đường tới đó.', 'warn'); return; }
    beginRoute(id, route);
    log(`🛤️ Khởi hành tới ${LOCATIONS[id].name}, mất ${formatRealDuration(route.seconds)}. Trên đường không thể tu luyện.`);
    const escort = renownTravelMult(route.path[0]);
    if (escort < 1) log(`🐎 Người trong khu vực nể danh thiên kiêu, đưa đường: thời gian đi x${escort}.`);
}

/* ---------- kỳ ngộ trên đường: mỗi 5 giây thực tung một lần, chỉ khi đang mở game ---------- */
function roadEventChance() {
    return Math.min(ROAD_EVENT_MAX_CHANCE, ROAD_EVENT_BASE_CHANCE + totalLuck() * ROAD_EVENT_LUCK_FACTOR);
}

function tickRoadEvents(realDt) {
    const a = state.activity;
    if (!a || a.type !== 'travel' || window._battleActive || (state.realmIndex || 0) >= TELEPORT_MIN_REALM.thanh) return;
    a.eventClock = (a.eventClock || 0) + realDt;
    if (a.eventClock < ROAD_EVENT_INTERVAL) return;
    a.eventClock -= ROAD_EVENT_INTERVAL;
    if (Math.random() < roadEventChance()) triggerRoadEvent();
}

function triggerRoadEvent(kind = null) {
    const luck = totalLuck();
    const roll = Math.random();
    const type = kind || (roll < 0.10 + luck ? 'master' : (roll < 0.55 ? 'item' : 'bandit'));
    if (type === 'master') roadMaster();
    else if (type === 'item') {
        const tales = ROAD_TALES[currentLocation().world];
        playDialogue(tales[Math.floor(Math.random() * tales.length)]);
        log('✨ Kỳ ngộ trên đường!');
        roadItem();
    }
    else roadBandit();
}

function rollPackSize(bonus = 0) {
    const roll = Math.random();
    const luck = totalLuck() * 0.5 + bonus;
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
        grantMaterial(worldTierOfRealm(realm).id, materialYield(realm, 2));
    } else if (roll < 0.95) {
        addItemToInventory({ name: 'Ngọc Linh Đan', type: 'xp', minutes: XP_ITEM_MINUTES, desc: `Bằng ${XP_ITEM_MINUTES} phút bế quan` });
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

/* Địa Chí: chỉ biết dịch vụ của nơi đã đặt chân tới hoặc đã dò la được */
function learnIntel(id) {
    if (!state.intel.includes(id)) state.intel.push(id);
}

function intelEntries(loc) {
    const services = loc.services || [];
    return [
        services.includes('forge') && `${forgeGradeOf(loc).wholeWorld ? '🔥' : '🔨'} ${forgeGradeOf(loc).name}`,
        services.includes('shop') && '🏪 Cửa hàng',
        services.includes('board') && '📜 Bảng thưởng',
        loc.blackMarket && '🕯️ Chợ Đen'
    ].filter(Boolean);
}

function intelBadge(loc) {
    if (!state.intel.includes(loc.id)) return '';
    const icon = loc.blackMarket ? '🕯️' : (loc.services || []).includes('forge') ? (forgeGradeOf(loc).wholeWorld ? '🔥' : '🔨') : '';
    return icon ? `<text x="${loc.x + 24}" y="${loc.y - 16}" text-anchor="middle" font-size="16">${icon}</text>` : '';
}

function intelLine(loc) {
    if (!intelEntries(loc).length && state.intel.includes(loc.id)) return '';
    return `<div class="small">${state.intel.includes(loc.id) ? intelEntries(loc).join(' · ') : '❔ Chưa rõ nơi này có gì, hãy tới xem hoặc dò la.'}</div>`;
}

function openAtlasBook() {
    const worlds = WORLD_TIERS.filter(w => worldUnlocked(w.id)).map(tier => {
        const sites = Object.values(LOCATIONS).filter(l => l.world === tier.id && intelEntries(l).length);
        const known = sites.filter(l => state.intel.includes(l.id));
        const rows = known.map(l => `<div class="guide-row"><b>${l.icon} ${l.name}</b><span>${intelEntries(l).join(' · ')}</span></div>`).join('');
        const left = sites.length - known.length;
        return `<div class="market-head">${tier.name} (${known.length}/${sites.length})</div>${rows}${left ? `<div class="small">Còn ${left} nơi chưa rõ: tới tận nơi, hoặc nhận việc Dò La ở ${INTEL_SOURCE_NAMES[tier.id]}, mỗi nơi một người biết một tin.</div>` : ''}`;
    }).join('');
    openWorldModal('atlasBookModal', '📖 Địa Chí', worlds);
}

function checkArrival() {
    learnIntel(state.location);
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
    const place = `translate(${p.x - 26} ${p.y - 74})`;
    if (node.getAttribute('transform') !== place) node.setAttribute('transform', place);
}

/* ---------- bản đồ ---------- */
function seededScatter(seed, count, width, height) {
    const out = [];
    let v = seed;
    const rand = () => (v = (v * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < count; i++) out.push({ x: rand() * width, y: rand() * height, r: 0.6 + rand() * 0.9, k: rand() });
    return out;
}

function terrainDecor(worldId, pal, locs, width, height) {
    const seed = 7919 * (WORLD_TIERS.findIndex(w => w.id === worldId) + 1);
    const clear = p => locs.every(l => Math.hypot(l.x - p.x, l.y - p.y) > 70);
    return seededScatter(seed, Math.round(MAP_DECOR_DENSITY * width * height), width, height).filter(clear).map(p => {
        const s = p.r;
        if (worldId === 'pham') {
            return p.k < 0.5
                ? `<path d="M${p.x} ${p.y} l${16 * s} ${-30 * s} l${16 * s} ${30 * s} Z" fill="${pal[0]}" opacity=".75"/><path d="M${p.x + 16 * s} ${p.y - 30 * s} l${-5 * s} ${10 * s} h${10 * s} Z" fill="#dfe8e0" opacity=".7"/>`
                : `<path d="M${p.x} ${p.y} l${8 * s} ${-20 * s} l${8 * s} ${20 * s} Z" fill="${pal[2]}" opacity=".25"/>`;
        }
        if (worldId === 'tien' || worldId === 'thanh') {
            return `<g opacity=".3" fill="#fff"><ellipse cx="${p.x}" cy="${p.y}" rx="${34 * s}" ry="${9 * s}"/><ellipse cx="${p.x + 18 * s}" cy="${p.y - 7 * s}" rx="${22 * s}" ry="${8 * s}"/></g>`;
        }
        if (worldId === 'thien' || worldId === 'chungnguyen' || worldId === HU_VO_WORLD) {
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
    const mapW = tier.mapW || MAP_W;
    const mapH = tier.mapH || MAP_H;
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
            ${intelBadge(l)}
        </g>`;
    }).join('');
    const p = mapTokenPosition();
    const showToken = currentLocation().world === viewId;
    const token = showToken
        ? `<g id="mapToken" transform="translate(${p.x - 26} ${p.y - 74})" pointer-events="none">${playerAvatarSvg().replace('<svg class', '<svg width="52" height="70" class')}</g>`
        : '';
    const tabs = WORLD_TIERS.filter(w => worldUnlocked(w.id) && (!hasLeftWorlds() || w.id === HU_VO_WORLD)).map(w =>
        `<button class="filter-chip ${w.id === viewId ? 'active' : ''}" onclick="setMapWorld('${w.id}')">${w.name}</button>`
    ).join('');
    host.innerHTML = `<div class="filter-chips">${tabs}<button class="filter-chip" onclick="openAtlasBook()">📖 Địa Chí</button></div>
        <svg class="map-svg" viewBox="0 0 ${mapW} ${mapH}" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Bản đồ ${tier.name}">
            <defs><linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[0]}"/></linearGradient></defs>
            <rect width="${mapW}" height="${mapH}" fill="url(#mapBg)"/>
            ${terrainDecor(viewId, pal, locs, mapW, mapH)}
            ${roads}${nodes}${token}
        </svg>${renderMapDestination()}`;
}

function renderMapDestination() {
    if (!mapSelected || mapSelected === state.location) return '';
    const loc = LOCATIONS[mapSelected];
    const route = findPath(state.location, mapSelected);
    if (!canEnterLocation(mapSelected)) {
        return `<div class="map-dest"><div><b>${loc.icon} ${loc.name}</b>
            <div class="small">🔒 ${(state.realmIndex || 0) < loc.minR ? `Cần đạt ${REALMS[loc.minR]} mới có thể đặt chân tới.` : storyAreaLockText(loc.id)}</div></div></div>`;
    }
    const teleport = canTeleport(mapSelected)
        ? `<button class="primary" onclick="teleportTo('${loc.id}')">⚡ Dịch chuyển</button>`
        : '';
    const blocked = teleportBlockReason(mapSelected);
    const carryRoute = findPath(state.location, mapSelected, true);
    const carry = roomCarriers().length ? `<button onclick="rideAsk('${loc.id}')">🤝 Nhờ đồng đội đưa đi</button>` : '';
    const carryHint = carryRoute && !carry ? '<div class="small">Muốn được đưa đi: vào chung phòng với người cảnh giới bằng hoặc cao hơn, hoặc người đã mở khóa dịch chuyển tới đó.</div>' : '';
    return `<div class="map-dest">
        <div><b>${loc.icon} ${loc.name}</b> <span class="small">linh khí x${loc.qi.toFixed(2)} · ${REALMS[loc.minR]} trở lên</span>
        <div class="small">${loc.desc}</div>${intelLine(loc)}${blocked ? `<div class="small">🔒 ${blocked}</div>` : ''}${carryHint}</div>
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
    const pack = Math.max(state.huntPackMin || 1, rollPackSize());
    const seconds = huntSeconds() * (0.4 + Math.random()) / Math.sqrt(pack);
    startActivity({ type: 'hunt', label: '🗡️ Lùng sục con mồi', seconds, pack });
}

/* Người chơi tự giới hạn cảnh giới quái khi săn ở từng nơi */
function openHuntRange() {
    const loc = currentLocation();
    const range = enemyRealmRange(loc);
    const [low, high] = state.huntRange?.[loc.id] || range;
    const realms = Array.from({ length: range[1] - range[0] + 1 }, (_, i) => range[0] + i);
    const row = (label, active, pick) => `<div class="small" style="margin-top:8px"><b>${label}</b></div><div class="loc-actions">${realms.map(r => `<button class="mini-btn" ${r === active ? 'disabled' : ''} onclick="setHuntRange(${pick(r)})">${REALMS[r]}</button>`).join('')}</div>`;
    openWorldModal('huntRangeModal', `🎚️ Cấp quái ở ${loc.name}`, `<div class="small">Khi săn ở đây chỉ gặp quái trong khoảng đã chọn.</div>
        ${row('Từ', low, r => `${r}, ${Math.max(r, high)}`)}
        ${row('Đến', high, r => `${Math.min(low, r)}, ${r}`)}
        <button class="mini-btn" style="margin-top:10px" onclick="setHuntRange(${range[0]}, ${range[1]})">Bỏ giới hạn</button>
        <div class="small" style="margin-top:12px"><b>Số kẻ địch tối thiểu mỗi lần gặp</b> (áp dụng mọi nơi)</div><div class="loc-actions">${[1, 2, 3].map(n => `<button class="mini-btn" ${n === (state.huntPackMin || 1) ? 'disabled' : ''} onclick="setHuntPackMin(${n})">${n}</button>`).join('')}</div>`);
}

function setHuntPackMin(n) {
    if (n > 1) state.huntPackMin = n;
    else delete state.huntPackMin;
    guideDone('hunt_range');
    openHuntRange();
    renderAll();
}

function setHuntRange(low, high) {
    const loc = currentLocation();
    state.huntRange = state.huntRange || {};
    if (low === enemyRealmRange(loc)[0] && high === enemyRealmRange(loc)[1]) delete state.huntRange[loc.id];
    else state.huntRange[loc.id] = [low, high];
    guideDone('hunt_range');
    openHuntRange();
    renderAll();
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

function serviceOpen(locId) {
    return FREE_SERVICE_LOCATIONS.includes(locId) || !!state.flags[`open_${locId}`];
}

function hasService(name) {
    const loc = currentLocation();
    return (loc.services || []).includes(name) && serviceOpen(loc.id);
}

const SERVICE_LABELS = { shop: 'Cửa hàng', board: 'Bảng treo thưởng' };

function serviceLabel(loc, name) {
    return name === 'forge' ? forgeGradeOf(loc).name : SERVICE_LABELS[name] || name;
}

function lockedServices(loc) {
    if (serviceOpen(loc.id) || !QUEST_INDEX[`open_${loc.id}`]) return [];
    return (loc.services || []).filter(name => name === 'forge' || SERVICE_LABELS[name]);
}

function questGiverText(q) {
    return `${NPCS[questGiver(q)].name} tại ${LOCATIONS[q.loc].name}`;
}

function questBlockReasons(q, seen = new Set()) {
    if (seen.has(q.id)) return [];
    seen.add(q.id);
    if (state.questActive.some(rt => rt.id === q.id)) return [`Đang làm "${q.title}". Xong việc rồi báo lại ${questGiverText(q)}.`];
    const reasons = [];
    if (!needsMet(q)) reasons.push(`"${q.title}" cần đạt ${REALMS[q.needs[0]]} ${STAGES[q.needs[1]]}.`);
    [q.afterMain, q.after].filter(id => id && !state.questDone.includes(id)).forEach(id => {
        const need = QUEST_INDEX[id];
        if (id[0] === 'm') reasons.push(`Cần xong nhiệm vụ chính "${need.title}".`);
        else reasons.push(...questBlockReasons(need, seen));
    });
    if (!reasons.length) reasons.push(`Gặp ${questGiverText(q)} nhận việc "${q.title}".`);
    return reasons;
}

function serviceLockReasons(loc) {
    const q = QUEST_INDEX[`open_${loc.id}`];
    const reasons = questBlockReasons(q);
    if (!reasons[reasons.length - 1].includes(`"${q.title}"`)) reasons.push(`Sau đó gặp ${questGiverText(q)} nhận việc "${q.title}".`);
    return reasons;
}

function openLockedService() {
    const loc = currentLocation();
    const label = lockedServices(loc).map(name => serviceLabel(loc, name)).join(', ');
    openWorldModal('serviceLockModal', `🔒 ${label}`, `<div class="small">${label} ở ${loc.name} chưa mở cho ngươi.</div>
        ${serviceLockReasons(loc).map(text => `<div class="small">• ${text}</div>`).join('')}`);
}

function openServiceShop() {
    if (!hasService('shop')) { showToast(`${currentLocation().name} không có cửa hàng.`, 'warn'); return; }
    window._lbShopOffer = null;
    window.openShopModal();
}

function grantMaterial(worldId, n, source = null) {
    state.mats[worldId] = (state.mats[worldId] || 0) + n;
    log(`⛏️ ${source ? `${source} rơi` : 'Nhận'} ${n} ${MATERIAL_NAMES[worldId]}.`);
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

function freeGoods() {
    return (state.realmIndex || 0) >= FREE_GOODS_REALM;
}

function forgeSeconds() {
    return freeGoods() ? 0 : hastedSeconds(FORGE_HOURS * 3600);
}

function selfForging() {
    return (state.realmIndex || 0) >= OVERSEER_REALM;
}

function forgeSite() {
    return selfForging() ? { ...SELF_FORGE_SITE, world: realmWorld() } : currentLocation();
}

function selfGateTier() {
    const tier = selfForging() ? gateTierOf(state.realmIndex + 1) : null;
    return tier?.forged ? tier : null;
}

function hasForgePiece(tier, slot) {
    return !tier.pieces || !!state.forgePieces?.[tier.realm]?.includes(slot);
}

function selfGateRows(have, matCost) {
    const tier = selfGateTier();
    if (!tier) return '';
    return GEAR_SLOT_IDS.map(slot => {
        const it = makeGateGear(tier, slot, GATE_QUEST_QUALITY);
        const ready = hasForgePiece(tier, slot);
        return `<div class="shop-item forge-row">
            <div><b style="color:${tier.color}">${GEAR_SLOTS[slot].icon} ${tier.icon} ${it.name}</b><div class="small">${gearStatText({ ...it, subs: [] })}</div></div>
            <button onclick="startGateForge('${slot}')" ${!ready || have < matCost ? 'disabled' : ''}>${ready ? 'Rèn' : 'Thiếu mảnh'}</button>
        </div>`;
    }).join('');
}

function startGateForge(slot) {
    const tier = selfGateTier();
    if (!tier || !hasForgePiece(tier, slot)) return;
    const worldId = realmWorld();
    const matCost = forgeMaterialCost();
    if ((state.mats[worldId] || 0) < matCost) { showToast('Thiếu nguyên liệu.', 'warn'); return; }
    state.mats[worldId] -= matCost;
    const seconds = forgeSeconds();
    state.forgeQueue.push({ slot, gateRealm: tier.realm, total: seconds, remaining: seconds });
    log(`🔨 Tự rèn ${GEAR_SLOTS[slot].label} cấp ${tier.label}, xong sau ${formatRealDuration(seconds)}.`);
    openForge();
    renderAll();
}

function accrueChaosStone(sec) {
    if (!selfForging()) return;
    const clock = (state.chaosStoneClock || 0) + sec;
    const stones = Math.floor(clock / CHAOS_STONE_SECONDS);
    state.chaosStoneClock = clock - stones * CHAOS_STONE_SECONDS;
    if (stones) state.mats[realmWorld()] = (state.mats[realmWorld()] || 0) + stones;
}

function openForge() {
    if (!selfForging() && !hasService('forge')) { showToast(`${currentLocation().name} không có lò rèn.`, 'warn'); return; }
    guideDone('forge');
    const loc = forgeSite();
    const grade = forgeGradeOf(loc);
    const realm = forgeRealmAt(loc, state.realmIndex);
    const worldId = worldTierOfRealm(realm).id;
    const have = state.mats[worldId] || 0;
    const matCost = forgeMaterialCost();
    const picking = forgeCanChooseSubs(loc, realm);
    const price = forgePriceWith(realm, picking ? forgeChosenSubs.length : 0);
    const rows = selfGateRows(have, matCost) + GEAR_SLOT_IDS.map(slot => {
        const it = makeGearItem(realm, slot, 2);
        return `<div class="shop-item forge-row">
            <div><b style="color:${GEAR_QUALITIES[2].color}">${GEAR_SLOTS[slot].icon} ${it.name}</b><div class="small">${gearStatText({ ...it, subs: [] })}</div></div>
            <button onclick="startForge('${slot}')" ${have < matCost || state.gold < price ? 'disabled' : ''}>Rèn</button>
        </div>`;
    }).join('');
    const capNote = realm < state.realmIndex ? ` Lò này chỉ rèn tới ${REALMS[forgeCapAt(loc)]}.` : '';
    const overNote = grade.overChance ? ` ${Math.round(grade.overChance * 100)}% rèn vượt tới ${grade.overRealms} cảnh giới, dùng được ngay.` : '';
    openWorldModal('forgeModal', `🔨 ${grade.name} ${loc.name}`, `<div class="small">Mỗi món: ${freeGoods() ? 'không tốn gì, xong ngay' : `${matCost} ${MATERIAL_NAMES[worldId]} (có ${have})${price ? ` + ${formatNumber(price)} linh thạch` : ''}, ${formatRealDuration(forgeSeconds())}, ${selfForging() ? 'tự rèn' : 'thợ rèn'} làm nền, rèn được nhiều món cùng lúc`}. ${Math.round(grade.topChance * (1 - forgeGodChance(grade, worldId)) * 100)}% ra phẩm Tiên.${forgeGodChance(grade, worldId) ? ` ${Math.round(forgeGodChance(grade, worldId) * 100)}% ra phẩm Thần.` : ''}${overNote}${capNote}</div>${forgeQueueHTML()}${forgeSubPicker(loc, realm)}${rows}<div class="small" style="margin-top:10px"><b>Nâng cấp đồ đang mặc</b> (tức thì)</div>${gearUpgradeRows()}`);
}

let forgeChosenSubs = [];

function forgeCanChooseSubs(loc, realm) {
    return !!forgeGradeOf(loc).wholeWorld && realm >= GEAR_SUB_REALM;
}

function forgePriceWith(realm, subCount) {
    return selfForging() ? 0 : Math.floor(gearPrice(realm, 2) * (1 + FORGE_SUB_FEE * subCount));
}

function forgeSubPicker(loc, realm) {
    if (!forgeGradeOf(loc).wholeWorld) return '';
    if (!forgeCanChooseSubs(loc, realm)) return `<div class="small">Thần lò chọn được chỉ số phụ cho đồ từ ${REALMS[GEAR_SUB_REALM]} trở lên.</div>`;
    const chips = Object.entries(GEAR_SUBS).map(([kind, sub]) => `<button class="filter-chip ${forgeChosenSubs.includes(kind) ? 'active' : ''}" onclick="toggleForgeSub('${kind}')">${sub.label}</button>`).join('');
    return `<div class="small" style="margin-top:8px"><b>Chỉ định thuộc tính</b> (${forgeChosenSubs.length}/${FORGE_SUB_MAX}, mỗi loại +${Math.round(FORGE_SUB_FEE * 100)}% linh thạch, giá trị ngẫu nhiên. Không chọn thì ra ngẫu nhiên.)</div><div class="filter-chips">${chips}</div>`;
}

function toggleForgeSub(kind) {
    if (forgeChosenSubs.includes(kind)) forgeChosenSubs = forgeChosenSubs.filter(k => k !== kind);
    else if (forgeChosenSubs.length < FORGE_SUB_MAX) forgeChosenSubs = [...forgeChosenSubs, kind];
    else showToast(`Mỗi món tối đa ${FORGE_SUB_MAX} thuộc tính.`, 'warn');
    openForge();
}

function gearUpgradeCost(item) {
    const next = (item.plus || 0) + 1;
    return { gold: selfForging() ? 0 : goldRef(item.reqRealm || 0) * 2 * next, mats: freeGoods() ? 0 : next };
}

function upgradeGear(uidIndex) {
    const item = state.inventory[uidIndex];
    if (!item?.slot) return;
    const plus = item.plus || 0;
    if (plus >= gearUpgradeCap(item.reqRealm || 0)) { showToast('Đã đạt giới hạn nâng cấp.', 'warn'); return; }
    if ((item.reqRealm || 0) > forgeCapAt(forgeSite())) { showToast('Lò này không đủ sức nâng món đồ đó.', 'warn'); return; }
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
        if ((item.reqRealm || 0) > forgeCapAt(forgeSite())) return `<div class="shop-item forge-row"><div><b>${item.name}</b><div class="small">Lò này không đủ sức nâng món đồ này.</div></div></div>`;
        const cost = gearUpgradeCost(item);
        const worldId = worldTierOfRealm(item.reqRealm || 0).id;
        return `<div class="shop-item forge-row">
            <div><b>${item.name}</b><div class="small">${gearStatText(item)} · +${plus}/${cap} · mỗi cấp +${step}%</div>
            <div class="small">${cost.mats ? `${cost.gold ? `${formatNumber(cost.gold)} linh thạch, ` : ''}${cost.mats} ${MATERIAL_NAMES[worldId]}` : 'Không tốn gì'}</div></div>
            <button onclick="upgradeGear(${index})">Nâng cấp</button></div>`;
    }).join('');
}

function startForge(slot) {
    const loc = forgeSite();
    const realm = forgeRealmAt(loc, state.realmIndex);
    const worldId = worldTierOfRealm(realm).id;
    const subs = forgeCanChooseSubs(loc, realm) && forgeChosenSubs.length ? forgeChosenSubs : null;
    const price = forgePriceWith(realm, subs?.length || 0);
    const matCost = forgeMaterialCost();
    if ((state.mats[worldId] || 0) < matCost || state.gold < price) { showToast('Thiếu nguyên liệu hoặc linh thạch.', 'warn'); return; }
    state.mats[worldId] -= matCost;
    state.gold -= price;
    const seconds = forgeSeconds();
    state.forgeQueue.push({ slot, realm, grade: loc.forgeGrade || 0, subs, total: seconds, remaining: seconds });
    log(`🔨 ${selfForging() ? 'Tự rèn' : 'Giao thợ rèn'} ${GEAR_SLOTS[slot].label}, xong sau ${formatRealDuration(seconds)}.`);
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
    const gear = job.gateRealm ? makeGateGear(gateTierOf(job.gateRealm), job.slot, GATE_QUEST_QUALITY) : makeForgedGear(job.realm, job.slot, job.grade, job.subs);
    addItemToInventory(gear);
    log(`🔨 Rèn xong ${gear.name}!`);
    showToast(`Rèn xong ${gear.name}`, 'info');
}

function forgeQueueHTML() {
    if (!state.forgeQueue.length) return '';
    return `<div class="small">🔨 Đang rèn: ${state.forgeQueue.map(job =>
        `${GEAR_SLOTS[job.slot].label} (${formatRealDuration(job.remaining / (state.testSpeed || 1))})`).join(', ')}</div>`;
}

function bountyRewardText() {
    const worldId = worldTierOfRealm(state.realmIndex).id;
    return [`+${formatNumber(cultivationSecondsXp(cultivationHoursToSeconds(BOUNTY_HOURS)))} tu vi`, `+${formatNumber(goldRef(state.realmIndex) * BOUNTY_GOLD_REFS)} linh thạch`, `+${materialYield(state.realmIndex, BOUNTY_MATERIAL)} ${MATERIAL_NAMES[worldId]}`].join(' · ');
}

function openBountyBoard() {
    openWorldModal('bountyModal', '📜 Bảng treo thưởng', `<div class="small">Diệt ${BOUNTY_KILLS} con mồi được chỉ định trong Giới này.</div>
        <div class="small">🎁 ${bountyRewardText()}</div>
        <button class="mini-btn" onclick="acceptBounty()">Nhận lệnh</button>`);
}

function acceptBounty() {
    const board = document.getElementById('bountyModal');
    if (board) board.style.display = 'none';
    const pool = Object.values(LOCATIONS).filter(l => l.world === currentLocation().world && (l.enemies || []).length && canEnterLocation(l.id) && l.maxR >= state.realmIndex - 1);
    if (!pool.length) { showToast('Cõi này không có sinh linh nào để treo thưởng.', 'warn'); return; }
    const loc = pool[Math.floor(Math.random() * pool.length)];
    const pick = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
    state.bounty = { loc: loc.id, name: pick.name, need: BOUNTY_KILLS, done: 0 };
    log(`📜 Nhận lệnh treo thưởng: diệt ${BOUNTY_KILLS} ${pick.name} tại ${loc.name}.`);
    renderAll();
}

function finishBounty() {
    const worldId = worldTierOfRealm(state.realmIndex).id;
    const gold = goldRef(state.realmIndex) * BOUNTY_GOLD_REFS;
    state.gold += gold;
    const xp = gainCultivationHours(BOUNTY_HOURS);
    log(`📜 Hoàn thành treo thưởng! +${formatNumber(gold)} linh thạch, +${formatNumber(xp)} tu vi.`);
    grantMaterial(worldId, materialYield(state.realmIndex, BOUNTY_MATERIAL));
    state.bounty = null;
}

/* ---------- nhiệm vụ ---------- */
function questStep(rt) {
    return ruledStory(questStepsFor(QUEST_INDEX[rt.id], rt.b)[rt.step]);
}

function branchMatches(when) {
    const elements = state.root?.elements || [];
    const rank = state.root?.rank || 0;
    if (!when) return true;
    if (when.el && !elements.includes(when.el)) return false;
    if (when.els && !when.els.some(e => elements.includes(e))) return false;
    if (when.rankMin != null && rank < when.rankMin) return false;
    if (when.rankMax != null && rank > when.rankMax) return false;
    if (when.hybrid != null && (elements.length > 1) !== when.hybrid) return false;
    return true;
}

function pickBranch(q) {
    return Object.keys(q.branches || {}).find(key => branchMatches(q.branches[key].when)) || null;
}

function questIntro(q, key) {
    return (key && q.branches?.[key]?.intro) || q.intro;
}

function startQuestRuntime(q) {
    const rt = { id: q.id, step: 0, n: 0, b: pickBranch(q) };
    state.questActive.push(rt);
    return rt;
}

/* Đã có Hư Vô Chi Chủ thì các cảnh giới có sẵn: truyện dùng phần ruled, nghe Đạo Giả kể thay vì tự sáng tạo */
function ruledStory(part) {
    return part?.ruled && huVoHolder() ? { ...part, ...part.ruled } : part;
}

function mainQuestRuntime() {
    return state.questActive.find(rt => rt.id[0] === 'm') || null;
}

function needsMet(q) {
    const [r, s] = q.needs;
    return state.realmIndex > r || (state.realmIndex === r && state.realmStage >= s);
}

function questExpired(q) {
    return !!q.until && (state.realmIndex !== q.until[0] || state.realmStage !== q.until[1]);
}

function questOpen(q) {
    if (state.questDone.includes(q.id) || state.questActive.some(rt => rt.id === q.id)) return false;
    if (!needsMet(q) || questExpired(q) || !endingAllows(q) || !huVoSeedOpen(q)) return false;
    if (q.realmOnly != null && state.realmIndex !== q.realmOnly) return false;
    if (q.id[0] !== 'm' && !questLocations(q, pickBranch(q)).every(storyAreaOpen)) return false;
    return [q.after, q.afterMain].every(id => !id || state.questDone.includes(id));
}

function mainQuestBlocker(q) {
    return (q.needsSide || []).find(id => !state.questDone.includes(id));
}

function endingAllows(q) {
    return !q.needsEnding || state.endingId === q.needsEnding;
}

function nextMainQuest() {
    return MAIN_QUESTS.find(q => !state.questDone.includes(q.id) && endingAllows(q)) || null;
}

function gateGearWorn(tier) {
    return state.inventory.filter(it => it.equipped && it.slot && (it[tier.flag] || gearSeriesRealm(it) >= tier.realm)).length;
}

function gearGate(realm) {
    const tier = gateTierOf(realm);
    if (!tier) return null;
    const worn = gateGearWorn(tier);
    if (worn >= GEAR_SLOT_IDS.length) return null;
    return { id: `gate_gear_${realm}`, title: `${tier.title}, ${tier.forged ? `tự rèn ở nút Rèn đồ${tier.pieces ? ' khi có mảnh rèn từ các Đạo Giả' : ''}` : `nhận từ nhiệm vụ phụ${tier.shop ? ` hoặc mua ở ${LOCATIONS[tier.shop].name}` : ''}`} (${worn}/${GEAR_SLOT_IDS.length})` };
}

function getBreakthroughGate(realm) {
    const q = MAIN_QUESTS.find(x => x.unlock === realm);
    return q && !state.questDone.includes(q.id) ? q : gearGate(realm) || tienViGate(realm);
}

function pickOrigin() {
    return state.race === 'yeu' ? 'yeu' : originFor(state.root);
}

function applyStartingOrigin() {
    state.origin = pickOrigin();
    state.location = ORIGINS[state.origin].loc;
    state.daoPath = state.startPath || ORIGINS[state.origin].path;
    log(`🌱 Xuất thân: ${ORIGINS[state.origin].name}.`);
}

function applyOriginQuest() {
    const origin = ORIGINS[state.origin];
    const quest = QUEST_INDEX.m01;
    quest.title = origin.title;
    quest.steps = origin.steps;
    quest.outro = originStory().outro;
    Object.assign(QUEST_INDEX.mc0_1, originStory().first);
    [QUEST_INDEX.mc0_2.steps[0], QUEST_INDEX.m38.steps.find(step => step.talk === 'mac')].forEach(step => { step.loc = origin.loc; });
    if (!LOCATION_NPCS[origin.loc].includes('mac')) LOCATION_NPCS[origin.loc].unshift('mac');
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

function openAllHall() {
    const rows = pathsOfRace(state.race).map(id => `<div class="market-row"><span>${DAO_PATHS[id].icon} <b>${DAO_PATHS[id].name}</b> <span class="small">${DAO_PATHS[id].desc}</span></span>
        <span><button class="mini-btn" onclick="openDaoHall('${id}')">Kỹ năng</button> <button class="mini-btn" ${state.daoPath === id ? 'disabled' : ''} onclick="setDaoPath('${id}')">Chuyển</button></span></div>`).join('');
    openWorldModal('allHallModal', '📜 Truyền thừa các hệ', rows);
}

function openDaoHall(path = currentLocation().path) {
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
    if (!q || !needsMet(q) || mainQuestBlocker(q)) return;
    const rt = startQuestRuntime(q);
    log(`📖 ${ACTS[q.act - 1].name} — Nhiệm vụ mới: ${q.title}${rt.b && q.branches[rt.b].tag ? ` (${q.branches[rt.b].tag})` : ''}`);
    if (questIntro(q, rt.b)) playDialogue(questIntro(q, rt.b));
    questsOnLocation();
}

/* Phi thăng: đột phá sang cảnh giới đầu của Giới mới là đứng ngay ở cửa vào Giới đó */
function worldEntry(worldId) {
    return Object.values(LOCATIONS).find(l => l.world === worldId && l.gate && worldIndex(LOCATIONS[l.gate.to].world) < worldIndex(worldId));
}

function moveUpToRealmWorld() {
    if ((state.realmIndex || 0) >= OVERSEER_REALM) return null;
    const home = realmWorld();
    if (worldIndex(currentLocation().world) >= worldIndex(home) || holdsWorldTop(home) || descentActive()) return null;
    const entry = worldEntry(home);
    if (!entry) return null;
    state.activity = null;
    state.location = entry.id;
    state.flags['world_' + home] = true;
    return entry;
}

function ascendToWorld() {
    const entry = moveUpToRealmWorld();
    if (!entry) return;
    log(`🌠 Trở về ${worldOf(entry.id).name}: ${entry.name}.`);
    checkArrival();
}

/* Chợ Đen bán Tinh Không Thạch: mỗi viên cho xuống Giới dưới một thời gian, hết giờ bị kéo về */
function starStonePrice() {
    return goldRef(state.realmIndex) * STAR_STONE_GOLD_REFS;
}

function canUseStarStone() {
    return (state.starStones || 0) > 0 && !descentActive() && !!worldEntry(realmWorld()) && currentLocation().world === realmWorld();
}

function buyStarStone() {
    if (!currentLocation().blackMarket) return;
    if (state.gold < starStonePrice()) { showToast('Không đủ linh thạch.', 'warn'); return; }
    state.gold -= starStonePrice();
    state.starStones = (state.starStones || 0) + 1;
    openBlackMarket();
    renderAll();
}

function useStarStone() {
    if (!canUseStarStone()) return;
    const target = LOCATIONS[worldEntry(realmWorld()).gate.to];
    state.starStones--;
    state.descentUntil = Date.now() + STAR_STONE_MINUTES * 60000;
    state.activity = null;
    state.location = target.id;
    state.flags['world_' + target.world] = true;
    const modal = document.getElementById('blackMarketModal');
    if (modal) modal.style.display = 'none';
    log(`🌌 Tinh Không Thạch mở khe xuống ${worldOf(target.id).name}: còn ${STAR_STONE_MINUTES} phút.`);
    checkArrival();
}

function endDescentIfDue() {
    if (!state.descentUntil || descentActive() || window._battleActive) return;
    state.descentUntil = 0;
    ascendToWorld();
}

function onRealmChanged() {
    playRingTales();
    ascendToWorld();
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
    const step = questStep(rt);
    if (huVoClaim(step.boss)) { renderAll(); return; }
    rt.step++;
    rt.n = 0;
    if (step.say) playDialogue(step.say);
    if (rt.step >= questStepsFor(q, rt.b).length) {
        state.questActive = state.questActive.filter(x => x !== rt);
        state.questDone.push(q.id);
        if (q.outro) playDialogue(q.outro);
        grantQuestReward(q);
        advanceMainQuest();
    } else {
        const next = questStep(rt);
        if (next.go === state.location || huVoStepEmpty(next.boss)) completeStep(rt);
    }
    renderAll();
}

/* Ở Hư Vô Cung tu vi đầy không còn cảnh giới để lên, mà luyện ra thêm một ô trận pháp */
function growHuVoBoard() {
    if (state.location !== HU_VO_HOME) return false;
    state.xp -= getNeed();
    state.maxBoardSlots = getEffectiveBoardSlots() + 1;
    ensureBoardState();
    const lb = huVoLinhBao();
    state.inventory.push(lb);
    state.board[state.board.indexOf(null)] = lb.uid;
    log(`🎴 Bế quan xong: trận pháp thêm một ô, ${state.maxBoardSlots} ô ${lb.name}.`);
    renderAll();
    return true;
}

function moveToHuVoWorld(note = 'Từ đây không xuống Giới dưới được nữa.') {
    state.flags['world_' + HU_VO_WORLD] = true;
    state.location = HU_VO_HOME;
    mapViewWorld = null;
    log(`🏯 Ngươi dọn về ${LOCATIONS[HU_VO_HOME].name}. ${note}`);
}

/* Cảnh giới cuối không đi bằng tu vi: thắng Hư Vô Chí Đạo là bước vào, trò chơi sang endgame */
function enterFinalRealm() {
    state.realmIndex = REALM_COUNT - 1;
    state.realmStage = STAGES.length - 1;
    state.xp = 0;
    state.huVoEarned = true;
    delete state.huVoChoice;
    delete state.huVoDisciple;
    state.huVoDuels = 0;
    huVoGrowth(state.realmStage);
    takeHuVoName();
    moveToHuVoWorld();
    log(`🌌 Bước vào ${REALMS[state.realmIndex]}. Hoàn thành Đại Kết Cục.`);
    playDialogue(HU_VO_ENTER_LINES);
    playRingTales();
    reportHuVoWin();
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
    if (selfForging()) grantMaterial(realmWorld(), CHAOS_STONE_QUEST);
    if (r.forgePieces) {
        const held = state.forgePieces?.[r.forgePieces.realm] || [];
        state.forgePieces = { ...state.forgePieces, [r.forgePieces.realm]: [...new Set([...held, ...r.forgePieces.slots])] };
        log(`🧩 Nhận mảnh rèn: ${r.forgePieces.slots.map(slot => GEAR_SLOTS[slot].label).join(', ')}.`);
    }
    if (r.gear) addItemToInventory(makeGearItem(state.realmIndex, r.gear[0], r.gear[1]));
    if (r.gateGear) r.gateGear.slots.forEach(slot => addItemToInventory(makeGateGear(gateTierOf(r.gateGear.realm), slot, GATE_QUEST_QUALITY)));
    if (r.treasure) addItemToInventory(makeTreasureGear(state.realmIndex, randomGearSlot(), TREASURE_REWARD.quality, TREASURE_REWARD.bonus));
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
    if (r.intel) {
        learnIntel(r.intel);
        log(`📖 Địa Chí ghi thêm: ${LOCATIONS[r.intel].name}.`);
    }
    if (r.opens) {
        state.flags[`open_${r.opens}`] = true;
        log(`🔓 ${LOCATIONS[r.opens].name} đã mở dịch vụ cho ngươi.`);
    }
    if (r.flag) {
        state.flags[r.flag] = true;
        const w = WORLD_TIERS.find(x => 'world_' + x.id === r.flag);
        log(`🌌 Mở đường tới ${w.name}!`);
    }
    if (r.ending) queueEndingChoice();
    if (r.finalRealm) huVoHolder() ? offerHuVoChoice() : enterFinalRealm();
    if (r.huVoOrder) reportHuVoOrder(r.huVoOrder);
    if (r.huVoSeed) wsSend({ type: 'huvo_seed_done', id: r.huVoSeed });
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
    if (step.task) return step.act?.();
    if (step.go) return travelTo(step.go);
    if (step.talk) return state.location === step.loc ? openNpcTalk(step.talk) : travelTo(step.loc);
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
        if (huVoStepEmpty(step.boss)) return completeStep(rt);
        const start = () => spawnBoss(step.boss, QUEST_INDEX[id]);
        if (boss.scriptedLoss) start();
        else coopGate(`Khiêu chiến ${bossName(step.boss)}`, start);
    }
}

/* Đại Kết Cục: món kế tiếp còn chưa tách khỏi người chơi */
function huVoPiece(id) {
    const kind = BOSSES[id]?.huVoPiece;
    if (kind === 'gear') return GEAR_SLOT_IDS.map(equippedInSlot).find(it => it && !it.huVo) || null;
    if (kind === 'lb') return boardItems().find(it => it && it.linhBaoId !== HU_VO_LB) || null;
    return null;
}

/* Bước không còn gì để đánh: hết món tách ra, hoặc ngôi đang trống */
function huVoStepEmpty(id) {
    const b = BOSSES[id];
    return !!b && ((b.huVoPiece && !huVoPiece(id)) || (b.huVoHolder && !huVoHolder()));
}

/* Thua trận cuối: mọi thứ trở về như trước Đại Kết Cục, nhiệm vụ làm lại từ đầu.
   Save cũ không lưu món đã tách ra thì giữ đồ Hư Vô, chỉ làm lại nhiệm vụ */
function huVoFallBack() {
    const rt = state.questActive.find(x => x.id === 'm40');
    if (!rt) return;
    const parts = state.huVoParts || [];
    if (parts.every(part => part.item)) {
        state.inventory = state.inventory.filter(it => !it.huVo && it.linhBaoId !== HU_VO_LB);
        ensureBoardState();
        parts.forEach(part => {
            state.inventory.push(part.item);
            if (part.at >= 0) state.board[part.at] = part.item.uid;
        });
        state.huVoParts = [];
    }
    rt.step = 0;
    rt.n = 0;
    recalculateStats();
    log('🌀 Thua trận cuối: trang bị và pháp bảo trở về như cũ, Đại Kết Cục phải đánh lại từ đầu.');
    questsOnLocation();
}

function huVoLinhBao() {
    return makeLinhBao(HU_VO_LB, LB_MAX_GRADE, LB_MAX_LEVEL);
}

function huVoFill(kind) {
    if (kind === 'gear') {
        GEAR_SLOT_IDS.filter(slot => !equippedInSlot(slot)).forEach(slot => state.inventory.push(makeHuVoGear(slot)));
        return;
    }
    state.board = state.board.map(uid => {
        if (uid) return uid;
        const lb = huVoLinhBao();
        state.inventory.push(lb);
        return lb.uid;
    });
}

/* Thắng một món: món đó rời hẳn người chơi, Hư Vô thế chỗ. Trả về true nếu còn món phải đánh */
function huVoClaim(id) {
    const kind = BOSSES[id]?.huVoPiece;
    if (!kind) return false;
    const piece = huVoPiece(id);
    if (piece) {
        (state.huVoParts ||= []).push({ name: piece.name, item: piece, at: state.board.indexOf(piece.uid) });
        if (kind === 'gear') {
            state.inventory.push(makeHuVoGear(piece.slot));
        } else {
            const lb = huVoLinhBao();
            state.inventory.push(lb);
            state.board[state.board.indexOf(piece.uid)] = lb.uid;
        }
        state.inventory.splice(state.inventory.indexOf(piece), 1);
        log(`🌌 ${piece.name} đã rời khỏi ngươi. ${kind === 'gear' ? 'Trang bị Hư Vô' : LINH_BAO_MAP[HU_VO_LB].name} thế chỗ.`);
        if (huVoPiece(id)) return true;
    }
    huVoFill(kind);
    recalculateStats();
    return false;
}

function huVoBoard(piece) {
    return piece?.type === 'linhbao' ? [{ ...piece, flatPower: true }] : null;
}

function huVoFinalEscorts(realm, stage) {
    return (state.huVoParts || []).map(part => {
        const add = buildEnemy({ name: part.name, kind: 'chaos', realmIndex: realm, realmStage: stage, boardSize: 1 });
        add.str = Math.floor(add.str * 0.5);
        add.hp = add.maxHp = Math.floor(add.maxHp * 0.3);
        const board = huVoBoard(part.item || part.lb);
        if (board) add.boardDefs = board;
        return add;
    });
}

/* Hư Vô Chi Chủ đương nhiệm từ máy chủ; chưa có ai thì trận cuối là chính người chơi */
let huVoThrone = null;

function huVoHolder() {
    return huVoThrone && huVoThrone.id !== state.profileId ? huVoThrone : null;
}

function reportHuVoWin() {
    recalculateStats();
    state.huVoPending = true;
    registerProfile();
    wsSend({
        type: 'huvo_win', token: profileToken(), name: state.huVoName || state.name, look: playerLook(),
        atk: state.totalPower, def: state.totalDef, hp: state.totalMaxHp,
        elements: state.root?.elements || [], path: state.daoPath || null
    });
}

function handleHuVoThrone(msg) {
    huVoThrone = msg.throne || null;
    if (huVoThrone?.id === state.profileId) state.huVoPending = false;
    else if (state.huVoPending || (!huVoThrone && state.realmIndex === REALM_COUNT - 1 && !state.huVoDisciple)) reportHuVoWin();
    syncHuVoSeeds();
    const seat = huVoThrone?.disciples?.[state.profileId];
    if (state.huVoDisciple && huVoThrone?.exiled?.[state.profileId]) demoteHuVoDisciple();
    else if (state.huVoDisciple && huVoThrone && (!seat?.atk || seat.stage !== state.realmStage || seat.name !== state.name)) joinHuVoThrone();
    if (msg.news && huVoThrone) {
        log(`🌌 ${huVoThrone.name} đã thắng trận cuối, trở thành Hư Vô Chi Chủ đời thứ ${huVoThrone.reign}.`);
        showToast(`🌌 Hư Vô Chi Chủ mới: ${huVoThrone.name}`);
    }
    if (state.questDone) renderAll();
}

/* Trận cuối chỉ là phân thân của người giữ ngôi; muốn lấy ngôi phải khiêu chiến người thật */
function applyHuVoRival(enemy, holder, share = 1) {
    enemy.look = holder.look || enemy.look;
    enemy.str = holder.atk * share;
    enemy.def = holder.def * share;
    enemy.hp = enemy.maxHp = holder.hp * share;
    enemy.shownRealm = REALM_COUNT - 1;
    if (share === 1) {
        enemy.realmIndex = REALM_COUNT - 1;
        enemy.realmStage = holder.stage ?? STAGES.length - 1;
    }
    enemy.elements = holder.elements;
    enemy.path = holder.path;
    enemy.boardDefs = Array.from({ length: getEffectiveBoardSlots() }, huVoLinhBao).map(lbDuelDef);
    enemy.duel = true;
}

/* Trận cuối đánh với chính cái tên của người chơi, thắng mới thành Hư Vô Chi Chủ */
function takeHuVoName(title = HU_VO_PLAYER_NAME) {
    if (state.huVoName) return;
    state.huVoName = state.name;
    state.name = title;
}

function bossName(id) {
    const b = BOSSES[id];
    if (b.huVoSelf) return state.huVoName || state.name;
    if (b.huVoHolder) return huVoHolder() ? `${huVoHolder().name} · Phân Thân` : b.name;
    const npc = typeof b.npc === 'string' ? NPCS[b.npc] : b.npc;
    return huVoPiece(id)?.name || npc?.name || b.name;
}

function spawnBoss(id, quest) {
    const b = BOSSES[id];
    const npc = typeof b.npc === 'string' ? NPCS[b.npc] : b.npc;
    const piece = huVoPiece(id);
    let realm = b.realm, stage = b.stage || 0;
    if (!b.scriptedLoss && quest && realm >= quest.needs[0]) {
        realm = quest.needs[0];
        stage = Math.min(stage, quest.needs[1]);
    }
    const enemy = buildEnemy({
        name: bossName(id), kind: b.kind, look: b.huVoSelf ? playerLook() : npc?.look || null, tier: 'Boss', scale: b.scale || 1,
        boardSize: b.board || 4, realmIndex: realm, realmStage: stage, elements: b.elements, path: b.path,
        rootRank: rollEnemyRootRank(realm, 1)
    });
    enemy.bossId = id;
    enemy.huVoEnd = !!(b.huVoSelf || b.huVoHolder);
    enemy.shownRealm = b.shownRealm;
    if (b.hpMult) enemy.hp = enemy.maxHp = Math.floor(enemy.maxHp * b.hpMult);
    if (huVoBoard(piece)) enemy.boardDefs = huVoBoard(piece);
    if (b.huVoSelf) enemy.escorts = huVoFinalEscorts(realm, stage);
    if (b.huVoHolder && huVoHolder()) {
        applyHuVoRival(enemy, huVoHolder(), HU_VO_CLONE_SHARE);
        enemy.name = bossName(id);
        log(`🌌 Phân thân của ${huVoHolder().name}, Hư Vô Chi Chủ đời thứ ${huVoHolder().reign}, chặn đường ngươi.`);
    }
    if (id === 'hv_de_tu') {
        const foe = huVoNextDisciple();
        applyHuVoRival(enemy, foe);
        enemy.name = foe.name;
        enemy.huVoFoe = foe.id;
    }
    if (b.adds) {
        enemy.escorts = Array.from({ length: b.adds.n }, () => {
            const add = buildEnemy({ name: b.adds.name, kind: b.adds.kind, realmIndex: realm, realmStage: stage, boardSize: 1 });
            add.shownRealm = b.shownRealm;
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

/* Thắng PvP bằng một trận Thống lĩnh ở cảnh giới thấp hơn trong hai bên */
function grantPvpWinReward() {
    reportHuVoDuelWin();
    const realm = Math.min(state.realmIndex || 0, state.currentEnemy?.realmIndex ?? Infinity);
    const tier = ENEMY_TIERS['Thống lĩnh'];
    const gold = goldRef(realm) * tier.goldMult;
    state.gold += gold;
    const xp = gainCultivationSeconds(battleXpSeconds(tier.xpMinutes));
    log(`🏆 Thưởng PvP: +${formatNumber(gold)} linh thạch, +${formatNumber(xp)} tu vi.`);
    grantMaterial(worldTierOfRealm(realm).id, materialYield(realm, 1));
    if (Math.random() < tier.gearChance) {
        const slot = GEAR_SLOT_IDS[Math.floor(Math.random() * GEAR_SLOT_IDS.length)];
        addItemToInventory(makeGearItem(realm, slot, 1));
    }
}

function enemyRenownPoints(enemy) {
    return [enemy, ...(enemy.escorts || [])].reduce((sum, unit) => sum + renownPoints(unit.realmIndex), 0);
}

function onEnemyDefeated(enemy) {
    if (enemy.bossId) clearBossStep(enemy.bossId);
    if (enemy.huVoFoe) beatHuVoDisciple(enemy.huVoFoe);
    onSaintDuelWon(enemy);
    onLuanDaoWon(enemy);
    const killed = [enemy, ...(enemy.escorts || [])];
    if (enemy.hunted) {
        const earned = enemyRenownPoints(enemy);
        state.mastery[state.location] = (state.mastery[state.location] || 0) + killed.length;
        grantRenown(state.location, earned);
    }
    killed.forEach(unit => {
        state.questActive.slice().forEach(rt => {
            const hunt = questStep(rt)?.hunt;
            if (hunt && hunt.name === unit.name && hunt.loc === state.location) {
                rt.n++;
                if (rt.n >= hunt.n) completeStep(rt);
            }
        });
        noteCourtKill(unit);
        if (state.bounty && state.bounty.name === unit.name && state.bounty.loc === state.location) {
            state.bounty.done++;
            if (state.bounty.done >= state.bounty.need) finishBounty();
        }
    });
    guideKills(killed);
    if (state.autoHunt) setTimeout(() => { if (state.autoHunt && !isBusy()) startHunt(); }, 800);
}

function onScriptedLoss(enemy) {
    state.hp = state.totalMaxHp;
    log(`💫 ${enemy.name} không hạ sát thủ. Ngươi sống sót.`);
    onLuanDaoLost(enemy);
    clearBossStep(enemy.bossId);
}

function acceptSideQuest(id) {
    const rt = startQuestRuntime(QUEST_INDEX[id]);
    log(`📜 Nhận nhiệm vụ phụ: ${QUEST_INDEX[id].title}`);
    if (questIntro(QUEST_INDEX[id], rt.b)) playDialogue(questIntro(QUEST_INDEX[id], rt.b));
    questsOnLocation();
    renderAll();
}

function gatherSeconds(step) {
    return step.gather.hours * 3600 / GATHER_TIME_DIVISOR;
}

function questStepText(rt) {
    const step = questStep(rt);
    if (step.go) return `Đi tới ${LOCATIONS[step.go].name}`;
    if (step.talk) return `Nói chuyện với ${NPCS[step.talk].name} tại ${LOCATIONS[step.loc].name}`;
    if (step.hunt) return `Diệt ${step.hunt.name} tại ${LOCATIONS[step.hunt.loc].name} (${rt.n}/${step.hunt.n})`;
    if (step.gather) return `${step.gather.label} tại ${LOCATIONS[step.gather.loc].name} (${formatRealDuration(hastedSeconds(gatherSeconds(step)))})`;
    if (step.boss) return `Khiêu chiến ${bossName(step.boss)}`;
    if (step.task) return `${guideLabel(step)}${(step.n || 1) > 1 ? ` (${rt.n}/${step.n})` : ''}`;
    return '';
}

/* Phần thưởng tính theo cảnh giới hiện tại; nhiệm vụ ẩn giữ bí mật */
function questRewardText(q) {
    if (q.hidden) return '';
    const r = q.reward || {};
    const parts = [];
    if (r.hours) parts.push(`+${formatNumber(cultivationSecondsXp(cultivationHoursToSeconds(r.hours)))} tu vi`);
    if (r.goldRefs) parts.push(`+${formatNumber(goldRef(state.realmIndex) * r.goldRefs)} linh thạch`);
    if (r.gear) parts.push(`${GEAR_SLOTS[r.gear[0]].label} phẩm ${GEAR_QUALITIES[r.gear[1]].name}`);
    if (r.forgePieces) parts.push(`Mảnh rèn ${r.forgePieces.slots.map(slot => GEAR_SLOTS[slot].label).join(', ')} cấp ${gateTierOf(r.forgePieces.realm).label}`);
    if (r.gateGear) parts.push(`${r.gateGear.slots.map(slot => GEAR_SLOTS[slot].label).join(', ')} cấp ${gateTierOf(r.gateGear.realm).label}`);
    if (r.treasure) parts.push(`1 món ngẫu nhiên phẩm ${GEAR_QUALITIES[TREASURE_REWARD.quality].name}, vượt ${TREASURE_REWARD.bonus} cảnh giới`);
    if (r.lb) parts.push('1 linh bảo ngẫu nhiên');
    if (r.relic) parts.push(r.relic);
    if (r.boardSlot) parts.push('+1 ô trận pháp');
    if (r.statBless) parts.push(`chỉ số bản thể +${Math.round(r.statBless * 100)}%`);
    if (r.intel) parts.push('thêm tin vào Địa Chí');
    if (r.opens) parts.push(`mở dịch vụ ${LOCATIONS[r.opens].name}`);
    if (r.flag) parts.push(`mở đường tới ${WORLD_TIERS.find(x => 'world_' + x.id === r.flag).name}`);
    if (r.ending) parts.push('kết thúc cốt truyện');
    if (r.finalRealm) parts.push(`bước vào ${REALMS[REALM_COUNT - 1]}`);
    return parts.join(' · ');
}

function questRewardHTML(q) {
    const text = questRewardText(q);
    return text ? `<div class="small">🎁 ${text}</div>` : '';
}

function questActionLabel(rt) {
    const step = questStep(rt);
    if (step.boss) return 'Khiêu chiến';
    if (step.task) return 'Làm ngay';
    const loc = step.go || step.hunt?.loc || step.gather?.loc || step.loc;
    if (loc && loc !== state.location) return 'Đi ngay';
    if (step.talk) return 'Nói chuyện';
    return step.gather ? 'Bắt đầu' : 'Đi săn';
}

function renderQuestPanel() {
    const el = $('questPanel');
    if (!el) return;
    const cards = state.questActive.map(rt => {
        const q = QUEST_INDEX[rt.id];
        const main = rt.id[0] === 'm';
        const guide = !!q.guide;
        return `<div class="quest-card ${main ? 'main' : ''}" data-quest="${rt.id}">
            <div class="small">${main ? ACTS[q.act - 1].name : guide ? '🧭 Chỉ dẫn chức năng' : 'Nhiệm vụ phụ'}${q.unlock != null ? ` · mở khóa ${REALMS[q.unlock]}` : ''}${rt.b && q.branches[rt.b].tag ? ` · ${q.branches[rt.b].tag}` : ''}</div>
            <b>${q.title}</b>
            <div class="small">${questStepText(rt)}</div>
            ${questRewardHTML(q)}
            <button class="mini-btn" onclick="questAction('${rt.id}')">${questActionLabel(rt)}</button>${guide ? `<button class="mini-btn" onclick="skipGuide('${rt.id}')">Bỏ qua</button>` : ''}
        </div>`;
    });
    if (!mainQuestRuntime()) {
        const q = nextMainQuest();
        const blocker = q && QUEST_INDEX[mainQuestBlocker(q)];
        if (q) cards.unshift(`<div class="quest-card" data-quest="${q.id}"><div class="small">${ACTS[q.act - 1].name}</div><b>${q.title}</b>
            <div class="small">${blocker && needsMet(q) ? `Trước hết hãy xong "${blocker.title}": gặp ${NPCS[questGiver(blocker)].name} tại ${LOCATIONS[blocker.loc].name}.` : `Cần đạt ${REALMS[q.needs[0]]} ${STAGES[q.needs[1]]} — hãy bế quan.`}</div>${questRewardHTML(q)}</div>`);
        else if (state.endingId) cards.unshift(`<div class="quest-card main"><b>${state.realmIndex === REALM_COUNT - 1 ? `🌌 Đại Kết Cục${huVoThrone ? ` · Hư Vô Chi Chủ: ${huVoThrone.name}` : ''}` : `Đã kết thúc: ${storyText(ENDINGS.find(e => e.id === state.endingId).text)}`}</b></div>`);
    }
    const trialCard = trialCardHTML();
    if (trialCard) cards.unshift(trialCard);
    const huVoPanel = huVoPanelHTML();
    if (huVoPanel) cards.unshift(huVoPanel);
    if (descentActive()) {
        cards.push(`<div class="quest-card"><div class="small">Tinh Không Thạch</div><b>Còn ${Math.ceil((state.descentUntil - Date.now()) / 60000)} phút ở Giới dưới</b></div>`);
    }
    if (state.realmIndex >= SAINT_REALM) state.courtOrders = [];
    (state.courtOrders || []).forEach(c => {
        cards.push(`<div class="quest-card"><div class="small">Lệnh Thiên Đình · ${courtGrade(LOCATIONS[c.loc], c.realm).name}</div><b>${c.name}</b><div class="small">${courtRankText(c)} · ${LOCATIONS[c.loc].name} (${c.done}/${c.need})</div><div class="small">🎁 ${courtRewardText(LOCATIONS[c.loc], c.realm)}</div></div>`);
    });
    if (state.bounty) {
        const b = state.bounty;
        cards.push(`<div class="quest-card"><div class="small">Treo thưởng</div><b>${b.name}</b><div class="small">${LOCATIONS[b.loc].name} (${b.done}/${b.need})</div><div class="small">🎁 ${bountyRewardText()}</div></div>`);
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
    if (who === 'me') return { name: state.name, svg: playerAvatarSvg(true) };
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
    const text = storyText(line.text);
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
        buttons: ENDINGS.map(e => ({ text: storyText(e.text), value: e.id, variant: 'primary' }))
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
        ${(loc.enemies || []).length ? `<div class="small">⚔️ Kẻ địch: ${REALMS[enemyRealmRange(loc)[0]]} – ${REALMS[enemyRealmRange(loc)[1]]}${loc.maxS != null ? ` ${STAGES[loc.maxS]}` : ''}${state.huntRange?.[loc.id] ? ` · đang săn ${REALMS[state.huntRange[loc.id][0]]} – ${REALMS[state.huntRange[loc.id][1]]}` : ''}${state.huntPackMin > 1 ? ` · ít nhất ${state.huntPackMin} con` : ''} <button class="mini-btn" onclick="openHuntRange()">🎚️ Chọn cấp săn</button></div>` : ''}
        <div class="small">⛩️ Tông môn: ${sectEscape(sectName() || 'chưa có')}</div>
        ${(loc.enemies || []).length ? `<div class="small">🎯 Thành thạo khu vực: ${state.mastery[loc.id] || 0} điểm · ⚡ Cảnh giới: mọi việc nhanh x${realmHaste(state.realmIndex).toFixed(2)}</div>` : ''}
        ${renownStatusHTML()}
        ${forgeQueueHTML()}`;
}

function gearTipHTML(slot) {
    const it = equippedInSlot(slot);
    if (!it) return `<b>${GEAR_SLOTS[slot].label}</b><div class="small">Trống</div>`;
    const q = GEAR_QUALITIES[it.quality || 0];
    const lines = gearStatText(it).split(', ').map(line => `<div>${line}</div>`).join('');
    return `<b style="color:${q.color}">${it.name}</b><div class="small">Phẩm ${q.name} · Yêu cầu ${REALMS[it.reqRealm || 0]}</div>${lines}`;
}

function speechText(line) {
    const text = storyText(line[1]);
    return line[0] === 'narr' || line[0] === 'me' ? text : `${NPCS[line[0]]?.name || line[0]}: ${text}`;
}

function questTipHTML(id) {
    const q = QUEST_INDEX[id];
    const rt = state.questActive.find(x => x.id === id);
    const done = state.questDone.includes(id);
    const key = rt ? rt.b : pickBranch(q);
    const reached = done ? questStepsFor(q, key).length : rt?.step || 0;
    const giver = id[0] === 'm' ? ACTS[q.act - 1].name : q.guide ? 'Chỉ dẫn chức năng' : `${NPCS[questGiver(q)].name} · ${LOCATIONS[q.loc].name}`;
    const why = (questIntro(q, key) || []).map(speechText).join('<br>') || (id[0] === 'm' ? ruledStory(ACTS[q.act - 1]).desc : 'Việc của người trong vùng, phải tới hỏi mới rõ.');
    const steps = questStepsFor(q, key).map((step, i) => {
        if (i < reached) return `<div>✔ ${(ruledStory(step).say || []).map(speechText).join(' ') || 'Đã xong.'}</div>`;
        if (rt && i === rt.step) return `<div>▶ ${questStepText(rt)}</div>`;
        return '<div>• ???</div>';
    }).join('');
    return `<b>${q.title}</b><div class="small">${giver}</div>
        <div class="tip-head">Vì sao có nhiệm vụ này</div><div class="small">${why}</div>
        <div class="tip-head">Diễn biến</div><div class="small">${steps}</div>
        ${q.hidden ? '' : `<div class="tip-head">Phần thưởng</div><div class="small">${questRewardText(q) || 'Không có'}</div>`}`;
}

function trackGearTip(e) {
    const target = e.target.closest?.('.gear-slot, .quest-card[data-quest]');
    let tip = document.getElementById('gearTip');
    if (!target) { if (tip) tip.style.display = 'none'; return; }
    if (!tip) {
        tip = document.createElement('div');
        tip.id = 'gearTip';
        document.body.appendChild(tip);
    }
    tip.innerHTML = target.dataset.quest ? questTipHTML(target.dataset.quest) : gearTipHTML(target.dataset.slot);
    tip.style.display = 'block';
    tip.style.left = `${Math.max(8, Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 8))}px`;
    tip.style.top = `${Math.max(8, Math.min(e.clientY + 14, window.innerHeight - tip.offsetHeight - 8))}px`;
}
document.addEventListener('mousemove', trackGearTip);

/* ---------- nói chuyện với NPC ---------- */
function closeNpcTalk() {
    const modal = document.getElementById('npcModal');
    if (modal) modal.style.display = 'none';
}

function npcOffers(key) {
    return SIDE_QUESTS.filter(q => q.loc === state.location && questGiver(q) === key && questOpen(q));
}

function npcReports(key) {
    return state.questActive.filter(rt => questStep(rt)?.talk === key && questStep(rt).loc === state.location);
}

function openNpcTalk(key) {
    const offers = npcOffers(key).map(q => `<button class="mini-btn" onclick="acceptFromNpc('${q.id}')">${q.hidden ? '🌑' : '❓'} ${q.title}${questRewardHTML(q)}</button>`).join('');
    const reports = npcReports(key).map(rt => `<button class="mini-btn" onclick="reportToNpc('${rt.id}')">📜 Báo lại: ${QUEST_INDEX[rt.id].title}</button>`).join('');
    openWorldModal('npcModal', `💬 ${NPCS[key].name}`, `<div class="small">${NPCS[key].title || ''}</div>${npcRealmRemarkHTML(key)}
        <div class="npc-options">${reports}${offers}${npcStoryButton(key)}${saintDuelButton(key)}${luanDaoButton(key)}<button class="mini-btn" onclick="talkAboutArea('${key}')">🗨️ Hỏi về nơi này</button></div>`);
}

/* Lục Thánh ở sức thật, viên mãn Đại Thánh; thua không chết, thắng lần đầu mới có thưởng */
const SAINT_DUEL_REALM = 20;
const SAINT_DUEL_GOLD_REFS = 300;
const SAINT_DUELS = { thai_thanh: 1.3, thong_thien: 1.25, nguyen_thuy: 1.2, nu_oa: 1.15, tiep_dan: 1, chuan_de: 0.95 };
Object.entries(SAINT_DUELS).forEach(([key, scale]) => {
    BOSSES[`duel_${key}`] = { npc: key, realm: 21, stage: 3, scale, board: 6, elements: SAINT_ELEMENTS, scriptedLoss: true };
});

/* Hỗn Độn Hải không có quái: Đạo Giả luận đạo với nhau để lên bảng, tính kiểu elo nên càng vượt đối thủ thắng càng ít, thua càng đau */
const LUAN_DAO_SCALES = [1.3, 1.25, 1.2, 1.15, 1.1, 1.05];
HONDON_DAO_GIA.forEach((key, i) => {
    BOSSES[`luan_${key}`] = { npc: key, realm: OVERSEER_REALM, stage: 3, scale: LUAN_DAO_SCALES[i], board: 6, scriptedLoss: true };
});

function luanDaoKey(npcKey) {
    if (currentLocation().world !== 'hondon' || (state.realmIndex || 0) < OVERSEER_REALM) return null;
    return HONDON_DAO_GIA.find(key => NPCS[key].name === NPCS[npcKey].name) || null;
}

function luanDaoStake(enemy) {
    const key = enemy.bossId?.startsWith('luan_') ? enemy.bossId.slice(5) : null;
    if (!key) return null;
    const locId = state.location;
    const mine = state.renown[locId] || 0;
    const rival = npcTianjiao(locId).find(entry => entry.id === `npc_${key}`).score;
    const unit = TIANJIAO_BASE_SCORE * renownPoints(LOCATIONS[locId].maxR);
    return { locId, mine, gain: Math.round(unit * rival / (mine + rival)), loss: Math.round(unit * mine / (mine + rival)) };
}

function onLuanDaoWon(enemy) {
    const stake = luanDaoStake(enemy);
    if (!stake) return;
    grantRenown(stake.locId, stake.gain);
    state.luanElo = (state.luanElo || 0) + LUAN_DAO_ELO;
    log(`📊 Elo +${LUAN_DAO_ELO}, dùng để đổi đan dược.`);
}

function onLuanDaoLost(enemy) {
    const stake = luanDaoStake(enemy);
    if (!stake) return;
    state.renown[stake.locId] = stake.mine - stake.loss;
    log(`🏆 Thiên kiêu -${formatNumber(stake.loss)} điểm tại ${LOCATIONS[stake.locId].name}.`);
    reportRenown(stake.locId);
}

function luanDaoButton(key) {
    const rival = luanDaoKey(key);
    return rival ? `<button class="mini-btn" onclick="challengeLuanDao('${rival}')">⚔️ Luận đạo</button>` : '';
}

function challengeLuanDao(key) {
    if (!requireFree()) return;
    closeNpcTalk();
    spawnBoss(`luan_${key}`);
}

function saintDuelButton(key) {
    if (!SAINT_DUELS[key] || (state.realmIndex || 0) < SAINT_DUEL_REALM) return '';
    return `<button class="mini-btn" onclick="challengeSaint('${key}')">⚔️ Thách đấu${state.saintDuels?.[key] ? ' (đã thắng)' : ''}</button>`;
}

function challengeSaint(key) {
    if (!requireFree()) return;
    closeNpcTalk();
    spawnBoss(`duel_${key}`);
}

function onSaintDuelWon(enemy) {
    const key = enemy.bossId?.replace('duel_', '');
    if (!SAINT_DUELS[key] || state.saintDuels?.[key]) return;
    state.saintDuels = { ...state.saintDuels, [key]: true };
    const gold = goldRef(state.realmIndex) * SAINT_DUEL_GOLD_REFS;
    state.gold += gold;
    log(`🏆 Lần đầu thắng ${enemy.name} ở sức thật: +${formatNumber(gold)} linh thạch.`);
}

function npcStoryList(key) {
    if (NPC_STORIES[key]) return NPC_STORIES[key];
    const tales = RESIDENT_TALES[currentLocation().world];
    if (!tales || !key.startsWith('dan_')) return [];
    return [{ from: 0, lines: [tales[NPC_SEED(key) % tales.length]] }];
}

function npcStoryNext(key) {
    const list = npcStoryList(key);
    const heard = state.npcHeard?.[key] || 0;
    return list[heard] && (state.realmIndex || 0) >= list[heard].from ? heard : -1;
}

function npcStoryButton(key) {
    const list = npcStoryList(key);
    const next = npcStoryNext(key);
    if (next >= 0) return `<button class="mini-btn" onclick="talkStory('${key}')">❗ Trò chuyện</button>`;
    return (state.npcHeard?.[key] || 0) > 0 && list.length ? `<button class="mini-btn" onclick="talkStory('${key}')">💬 Nhắc lại chuyện cũ</button>` : '';
}

function talkStory(key) {
    closeNpcTalk();
    const list = npcStoryList(key);
    const next = npcStoryNext(key);
    const story = list[next >= 0 ? next : (state.npcHeard?.[key] || 1) - 1];
    if (!story) return;
    if (next >= 0) state.npcHeard = { ...state.npcHeard, [key]: next + 1 };
    playDialogue(story.lines.map(line => typeof line === 'string' ? [key, line] : line));
}

function talkAboutArea(key) {
    closeNpcTalk();
    const loc = currentLocation();
    const lines = [[key, `${loc.name}? ${loc.desc}`]];
    if ((loc.enemies || []).length) lines.push([key, npcEnemyRangeLine(key, REALMS[enemyRealmRange(loc)[0]], REALMS[enemyRealmRange(loc)[1]])]);
    if (key === locationSmith(loc)) lines.push([key, `${forgeGradeOf(loc).name} này rèn được tới ${REALMS[forgeCapAt(loc)]}.`]);
    else lines.push([key, npcAreaLine(key, loc)]);
    playDialogue(lines);
}

function acceptFromNpc(id) {
    closeNpcTalk();
    if (huVoSeedOf(QUEST_INDEX[id])?.target === 'first') wsSend({ type: 'huvo_claim', id: QUEST_INDEX[id].huVoSeedId });
    else acceptSideQuest(id);
}

function reportToNpc(id) {
    closeNpcTalk();
    const rt = state.questActive.find(x => x.id === id);
    if (rt) completeStep(rt);
}

function renderAppearancePanel() {
    const el = $('appearancePanel');
    if (!el) return;
    const slots = GEAR_SLOT_IDS.map(slot => {
        const it = equippedInSlot(slot);
        const color = it ? GEAR_QUALITIES[it.quality || 0].color : '#667';
        const stale = it && Math.max(it.reqRealm || 0, gearSeriesRealm(it)) < state.realmIndex;
        const tier = it ? gearGateTier(it) : null;
        return `<div class="gear-slot ${tier ? `gear-motif gear-motif-${tier.motif}` : ''}" style="border-color:${color}${tier ? `;--motif:${tier.color}` : ''}" data-slot="${slot}">
            <span>${GEAR_SLOTS[slot].icon}</span>
            <div><div class="small">${GEAR_SLOTS[slot].label}${tier ? ` · ${tier.icon} ${tier.label}` : ''}${stale ? ' · lỗi thời' : ''}</div><b style="color:${color}">${it ? it.name.replace(` ${GEAR_SLOTS[slot].label}`, '') : '—'}</b></div>
        </div>`;
    }).join('');
    const path = DAO_PATHS[state.daoPath];
    const countered = Object.keys(HANH_KHAC).find(h => HANH_KHAC[h] === path.hanh);
    el.innerHTML = `<div class="hero-card"><div class="hero-portrait">${playerAvatarSvg(true)}</div><div class="gear-slots">${slots}</div></div>
        <div class="loc-actions">
            <button class="mini-btn" onclick="equipForRealm()">Đúng cảnh giới</button>
            <button class="mini-btn" onclick="equipAll()">Mạnh nhất</button>
            <button class="mini-btn" onclick="sellOutdatedGear()">Bán lỗi thời (${outdatedGear().length})</button>
        </div>
        <div class="small">${raceOf().icon} <b>${raceOf().name}</b> · ${raceOf().desc}</div>
        <div class="small">${path.icon} <b>${path.name}</b> · ${path.desc}</div>
        <div class="small">Hành ${path.hanh}: khắc hệ ${HANH_KHAC[path.hanh]} (+25%) · bị hệ ${countered} khắc (-20%)</div>
        <div class="small">Đồng đội hệ ${Object.keys(HANH_SINH).find(h => HANH_SINH[h] === path.hanh)} sinh cho ngươi: sức mạnh +10%. Đồng đội hệ ${countered} khắc ngươi: phòng thủ -5%.</div>`;
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
    if (!isGameAdmin()) return;
    state.testPanel = !state.testPanel;
    renderAll();
}

function renderTestPanel() {
    const el = $('testPanel');
    if (!el) return;
    const admin = isGameAdmin();
    const button = $('testBtn');
    if (button) button.style.display = admin ? '' : 'none';
    el.style.display = admin && state.testPanel ? 'block' : 'none';
    if (!admin || !state.testPanel) return;
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
    openHuntRange, setHuntRange, openNpcTalk, talkAboutArea, acceptFromNpc, reportToNpc, openAtlasBook, openDaoHall, setDaoPath, buyStarStone, useStarStone, setDaoPath, openDaoHall, buyDaoSkill, hireGuard, travelTo, teleportTo, joinSect, selectMapNode, setMapWorld, cancelActivity, startHunt, startExplore, toggleAutoHunt, openServiceShop, openForge,
    startForge, toggleForgeSub, upgradeGear, acceptBounty, openBountyBoard, talkStory, challengeSaint, challengeLuanDao, startGateForge, questAction, acceptSideQuest, nextDialogue, toggleTestPanel, setTestSpeed, testJumpRealm,
    testTeleport, testFillXp, testGearUp, testSkipStep, testFinishActivity, testWinBattle, testRich
});
