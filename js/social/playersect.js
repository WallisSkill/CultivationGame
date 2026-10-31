/* ===========================
    TÔNG MÔN CỦA NGƯỜI CHƠI
    - state.ownSect: tông do ta lập (lưu trong save của chưởng môn).
    - state.sectInfo: tông của đạo hữu mà ta gia nhập.
    - Thu nhập tích theo thời gian thực vào ngân khố, kể cả khi đóng game.
    - Mời / rời / đồng bộ thành viên đi qua kênh pvp_relay (sessionId 'sect'),
      chỉ gửi được khi hai bên cùng online.
=========================== */
const SECT_SESSION = 'sect';
const SECT_FOUND_MIN_REALM = 3;
const SECT_FOUND_COST = 100;
const SECT_NAME_MAX = 24;
const SECT_BUILDING_MAX = 5;
const SECT_BUILDING_COST = 60;
const SECT_DISCIPLE_COST = 20;
const SECT_DISCIPLES_PER_GATE = 3;
const SECT_QI_PER_LEVEL = 0.03;
const SECT_GOLD_PER_LEVEL_HOUR = 1;
const SECT_MEMBER_INCOME_BONUS = 0.1;
const SECT_MATS_PER_DISCIPLE_HOUR = 1 / 6;
const SECT_FORGE_DISCOUNT_PER_LEVEL = 2;

const SECT_BUILDINGS = {
    linh_mach: { icon: '💠', name: 'Linh Mạch', effect: l => `Linh khí tại sơn môn +${Math.round(l * SECT_QI_PER_LEVEL * 100)}%` },
    linh_dien: { icon: '🌾', name: 'Linh Điền', effect: l => `${l * SECT_GOLD_PER_LEVEL_HOUR} phần linh thạch mỗi giờ` },
    luyen_khi: { icon: '🔥', name: 'Luyện Khí Các', effect: l => `Rèn đồ giảm ${l * SECT_FORGE_DISCOUNT_PER_LEVEL} nguyên liệu` },
    son_mon: { icon: '⛩️', name: 'Sơn Môn', effect: l => `Tối đa ${l * SECT_DISCIPLES_PER_GATE} đệ tử` }
};

function sectEscape(text) {
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

function sectName() {
    if (state.ownSect) return state.ownSect.name;
    if (state.sectInfo) return state.sectInfo.name;
    return state.sect ? LOCATIONS[state.sect]?.name : null;
}

function sectLocationQiMult(locId) {
    const own = state.ownSect;
    if (own && own.hq === locId) return 1 + own.buildings.linh_mach * SECT_QI_PER_LEVEL;
    const info = state.sectInfo;
    if (info && info.hq === locId) return 1 + (info.qiLevel || 0) * SECT_QI_PER_LEVEL;
    return 1;
}

function forgeMaterialCost() {
    const level = state.ownSect?.buildings.luyen_khi || 0;
    return FORGE_MATERIAL_COST - level * SECT_FORGE_DISCOUNT_PER_LEVEL;
}

function accrueSectIncome(seconds) {
    const s = state.ownSect;
    if (!s) return;
    const hours = seconds / 3600;
    const realm = state.realmIndex || 0;
    const memberBonus = 1 + s.members.length * SECT_MEMBER_INCOME_BONUS;
    s.gold += goldRef(realm) * s.buildings.linh_dien * SECT_GOLD_PER_LEVEL_HOUR * memberBonus * hours;
    s.mats += s.disciples * SECT_MATS_PER_DISCIPLE_HOUR * hours;
}

function collectSectIncome() {
    const s = state.ownSect;
    if (!s) return;
    const gold = Math.floor(s.gold), mats = Math.floor(s.mats);
    if (!gold && !mats) { showToast('Ngân khố chưa có gì.', 'warn'); return; }
    state.gold += gold;
    s.gold -= gold;
    s.mats -= mats;
    log(`🏦 Nhận từ ngân khố: +${formatNumber(gold)} linh thạch.`);
    if (mats) grantMaterial(worldTierOfRealm(state.realmIndex).id, mats);
    renderAll();
}

function canFoundSect() {
    if (state.ownSect) return 'Đã có tông môn.';
    if ((state.realmIndex || 0) < SECT_FOUND_MIN_REALM) return `Cần đạt ${REALMS[SECT_FOUND_MIN_REALM]}.`;
    const loc = currentLocation();
    if (loc.type === 'dungeon' || loc.type === 'gate') return `${loc.name} không thể làm sơn môn.`;
    if (state.gold < goldRef(state.realmIndex) * SECT_FOUND_COST) return 'Không đủ linh thạch.';
    return '';
}

function openFoundSect() {
    const blocked = canFoundSect();
    if (blocked) { showToast(blocked, 'warn'); return; }
    const cost = goldRef(state.realmIndex) * SECT_FOUND_COST;
    openWorldModal('foundSectModal', '⛩️ Khai tông lập phái', `
        <div class="small">Sơn môn đặt tại ${currentLocation().name}, không dời được. Giá ${formatNumber(cost)} linh thạch.</div>
        <div class="chat-input-row">
            <input id="sectNameInput" type="text" maxlength="${SECT_NAME_MAX}" placeholder="Tên tông môn" aria-label="Tên tông môn"
                onkeydown="if(event.key==='Enter')foundSect()">
            <button class="primary" onclick="foundSect()">Lập tông</button>
        </div>`);
}

function foundSect() {
    const input = document.getElementById('sectNameInput');
    const name = (input?.value || '').trim().slice(0, SECT_NAME_MAX);
    if (!name) { showToast('Tông môn cần có tên.', 'warn'); return; }
    if (canFoundSect()) return;
    leaveJoinedSect();
    state.gold -= goldRef(state.realmIndex) * SECT_FOUND_COST;
    state.ownSect = {
        name, hq: state.location, gold: 0, mats: 0, disciples: 0, members: [],
        buildings: { linh_mach: 0, linh_dien: 0, luyen_khi: 0, son_mon: 1 }
    };
    state.sect = 'own';
    document.getElementById('foundSectModal').style.display = 'none';
    log(`⛩️ ${name} khai tông tại ${currentLocation().name}!`);
    renderAll();
}

function sectBuildingCost(id) {
    const level = state.ownSect.buildings[id];
    return goldRef(state.realmIndex) * SECT_BUILDING_COST * (level + 1) * (level + 1);
}

function upgradeSectBuilding(id) {
    const s = state.ownSect;
    if (!s || s.buildings[id] >= SECT_BUILDING_MAX) return;
    const cost = sectBuildingCost(id);
    if (state.gold < cost) { showToast('Không đủ linh thạch.', 'warn'); return; }
    state.gold -= cost;
    s.buildings[id]++;
    log(`🏗️ ${SECT_BUILDINGS[id].name} lên cấp ${s.buildings[id]}.`);
    syncSectToMembers();
    renderAll();
}

function recruitDisciple() {
    const s = state.ownSect;
    if (!s) return;
    if (s.disciples >= s.buildings.son_mon * SECT_DISCIPLES_PER_GATE) { showToast('Sơn Môn đã đầy đệ tử.', 'warn'); return; }
    const cost = goldRef(state.realmIndex) * SECT_DISCIPLE_COST;
    if (state.gold < cost) { showToast('Không đủ linh thạch.', 'warn'); return; }
    state.gold -= cost;
    s.disciples++;
    log(`🧑‍🎓 Thu nhận đệ tử thứ ${s.disciples}.`);
    renderAll();
}

async function dissolveSect() {
    if (!state.ownSect) return;
    const ok = await showConfirm(`Giải tán ${sectEscape(state.ownSect.name)}? Công trình và đệ tử sẽ mất hết.`);
    if (!ok) return;
    state.ownSect.members.forEach(m => relaySect(m.id, 'kick', {}));
    log(`🏚️ ${state.ownSect.name} đã giải tán.`);
    state.ownSect = null;
    state.sect = null;
    syncStorySect();
    renderAll();
}

/* ---------- thành viên qua máy chủ ---------- */
function relaySect(to, kind, data) {
    return wsSend({ type: 'pvp_relay', to, sessionId: SECT_SESSION, kind, data });
}

function sectSyncPayload() {
    const s = state.ownSect;
    return { name: s.name, hq: s.hq, qiLevel: s.buildings.linh_mach, members: s.members.length };
}

function syncSectToMembers() {
    if (!state.ownSect) return;
    state.ownSect.members.forEach(m => relaySect(m.id, 'sync', sectSyncPayload()));
}

function inviteToSect(friendId) {
    if (!state.ownSect) return;
    if (relaySect(friendId, 'invite', sectSyncPayload())) showToast('Đã gửi lời mời.', 'info');
    else showToast('Chưa kết nối máy chủ.', 'warn');
}

function kickSectMember(id) {
    const s = state.ownSect;
    if (!s) return;
    s.members = s.members.filter(m => m.id !== id);
    relaySect(id, 'kick', {});
    syncSectToMembers();
    renderAll();
}

function leaveJoinedSect() {
    if (!state.sectInfo) return;
    relaySect(state.sectInfo.ownerId, 'leave', {});
    state.sectInfo = null;
    state.sect = null;
    syncStorySect();
}

function leaveSectByButton() {
    log(`🚪 Rời ${state.sectInfo?.name || 'tông môn'}.`);
    leaveJoinedSect();
    renderAll();
}

function sanitizeSectPayload(data) {
    if (!data || typeof data.name !== 'string' || !data.name.trim()) return null;
    return {
        name: data.name.trim().slice(0, SECT_NAME_MAX),
        hq: LOCATIONS[data.hq] ? data.hq : null,
        qiLevel: Math.max(0, Math.min(SECT_BUILDING_MAX, Number(data.qiLevel) || 0)),
        members: Math.max(0, Number(data.members) || 0)
    };
}

async function handleSectInvite(from, friend, data) {
    const info = sanitizeSectPayload(data);
    if (!info) return;
    if (state.ownSect) { relaySect(from, 'decline', {}); return; }
    const ok = await showConfirm(`${sectEscape(friend.name)} mời ngươi gia nhập ${sectEscape(info.name)}. Đồng ý?`);
    if (!ok) { relaySect(from, 'decline', {}); return; }
    leaveJoinedSect();
    state.sectInfo = { ...info, ownerId: from };
    state.sect = 'joined';
    relaySect(from, 'accept', {});
    log(`⛩️ Gia nhập ${info.name}.`);
    renderAll();
}

function handleSectRelay(msg) {
    const friend = friendsState.friends.find(f => f.id === msg.from);
    if (!friend) return;
    const own = state.ownSect;
    const joined = state.sectInfo?.ownerId === msg.from;
    switch (msg.kind) {
        case 'invite':
            handleSectInvite(msg.from, friend, msg.data);
            break;
        case 'accept':
            if (own && !own.members.some(m => m.id === msg.from)) {
                own.members.push({ id: msg.from, name: friend.name });
                log(`⛩️ ${friend.name} gia nhập ${own.name}.`);
                syncSectToMembers();
                renderAll();
            }
            break;
        case 'decline':
            showToast(`${friend.name} từ chối lời mời.`, 'warn');
            break;
        case 'leave':
            if (own) {
                own.members = own.members.filter(m => m.id !== msg.from);
                log(`🚪 ${friend.name} rời ${own.name}.`);
                syncSectToMembers();
                renderAll();
            }
            break;
        case 'kick':
            if (joined) {
                log(`🚪 Không còn thuộc ${state.sectInfo.name}.`);
                state.sectInfo = null;
                state.sect = null;
                syncStorySect();
                renderAll();
            }
            break;
        case 'sync':
            if (joined) {
                const info = sanitizeSectPayload(msg.data);
                if (info) {
                    state.sectInfo = { ...info, ownerId: msg.from };
                    renderAll();
                }
            }
            break;
    }
}

/* ---------- giao diện ---------- */
function renderOwnSect(s) {
    const buildings = Object.entries(SECT_BUILDINGS).map(([id, b]) => {
        const level = s.buildings[id];
        const maxed = level >= SECT_BUILDING_MAX;
        return `<div class="sect-row"><div><b>${b.icon} ${b.name} ${level}/${SECT_BUILDING_MAX}</b><div class="small">${b.effect(level)}</div></div>
            ${maxed ? '' : `<button class="mini-btn" onclick="upgradeSectBuilding('${id}')">${formatNumber(sectBuildingCost(id))}</button>`}</div>`;
    }).join('');
    const memberIds = s.members.map(m => m.id);
    const invitable = friendsState.friends.filter(f => f.online && !memberIds.includes(f.id));
    const members = s.members.map(m => `<div class="sect-row"><span class="small">${sectEscape(m.name)}</span>
        <button class="mini-btn" onclick="kickSectMember('${m.id}')">Trục xuất</button></div>`).join('');
    const invites = invitable.map(f => `<div class="sect-row"><span class="small">${sectEscape(f.name)}</span>
        <button class="mini-btn" onclick="inviteToSect('${f.id}')">Mời</button></div>`).join('');
    return `<div><b>${sectEscape(s.name)}</b> <span class="small">sơn môn: ${LOCATIONS[s.hq].name}</span></div>
        <div class="sect-row"><div class="small">🏦 ${formatNumber(Math.floor(s.gold))} linh thạch · ${Math.floor(s.mats)} nguyên liệu</div>
            <button class="mini-btn" onclick="collectSectIncome()">Nhận</button></div>
        ${buildings}
        <div class="sect-row"><div class="small">🧑‍🎓 Đệ tử ${s.disciples}/${s.buildings.son_mon * SECT_DISCIPLES_PER_GATE}</div>
            <button class="mini-btn" onclick="recruitDisciple()">${formatNumber(goldRef(state.realmIndex) * SECT_DISCIPLE_COST)}</button></div>
        ${members ? `<div class="small">Thành viên</div>${members}` : ''}
        ${invites ? `<div class="small">Đạo hữu đang online</div>${invites}` : ''}
        <button class="mini-btn" onclick="dissolveSect()">Giải tán</button>`;
}

function renderSectPanel() {
    const el = document.getElementById('sectPanel');
    if (!el) return;
    if (state.ownSect) { el.innerHTML = renderOwnSect(state.ownSect); return; }
    if (state.sectInfo) {
        const info = state.sectInfo;
        el.innerHTML = `<div><b>${sectEscape(info.name)}</b> <span class="small">${info.members} thành viên${info.hq ? ` · sơn môn: ${LOCATIONS[info.hq].name}` : ''}</span></div>
            <button class="mini-btn" onclick="leaveSectByButton()">Rời tông</button>`;
        return;
    }
    const blocked = canFoundSect();
    el.innerHTML = `<div class="small">${blocked || `Có thể lập sơn môn tại ${currentLocation().name}.`}</div>
        <button class="mini-btn" onclick="openFoundSect()">Khai tông lập phái</button>`;
}

if (typeof window !== 'undefined') {
    Object.assign(window, {
        openFoundSect, foundSect, upgradeSectBuilding, recruitDisciple, collectSectIncome, dissolveSect,
        inviteToSect, kickSectMember, leaveSectByButton
    });
}
