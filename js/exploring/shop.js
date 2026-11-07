/* ===========================
    INVENTORY / ITEMS / EQUIP
=========================== */
/* Hàng bán theo cảnh giới, không vượt cảnh giới cao nhất của nơi đó — trang bị Phàm/Linh, đan dược, ngọc giản bế quan */
function buildShopStock(loc = currentLocation()) {
    const realm = serviceRealmAt(loc, state.realmIndex || 0);
    const g = goldRef(realm);
    const base = baseStatsFor(realm, state.realmStage || 0, state.root?.rank || 0);
    const stock = [];
    const gateTier = GATE_TIERS.find(t => t.shop === loc.id && (state.realmIndex || 0) >= t.realm - 1);
    if (gateTier) SAINT_SHOP_QUALITIES.forEach(quality => GEAR_SLOT_IDS.forEach(slot => {
        stock.push({ ...makeGateGear(gateTier, slot, quality), id: `gate_${gateTier.realm}_${slot}_${quality}`, price: gearPrice(gateTier.realm, quality) });
    }));
    if (!gateTier?.exclusive && loc.world !== 'thanh') {
        [1, 0].forEach(quality => GEAR_SLOT_IDS.forEach(slot => {
            stock.push({ ...makeGearItem(realm, slot, quality), id: `gear_${slot}_${quality}`, price: gearPrice(realm, quality) });
        }));
    }
    stock.push(
        { id: 'pill_heal', name: 'Hồi Thiên Đan', type: 'consumable', healPct: 0.5, price: g * 3 },
        { id: 'jade_cult', name: 'Tụ Linh Ngọc Giản', type: 'xp', realm: state.realmIndex || 0, minutes: XP_ITEM_MINUTES, price: goldRef(state.realmIndex || 0) * XP_ITEM_MINUTES * XP_PILL_PRICE_PER_MINUTE },
        { id: 'pill_power', name: 'Lực Cốt Đan', type: 'power', value: Math.ceil(base.power * 0.02), price: g * 150 },
        { id: 'pill_barrier', name: 'Huyền Giáp Đan', type: 'defense', value: Math.ceil(base.defense * 0.02), price: g * 150 },
        { id: 'nectar_life', name: 'Tiên Tủy Sinh Mệnh', type: 'life', value: 30 + realm * 20, price: g * 20 },
        { id: 'scroll_fortune', name: 'Trục Thư Tăng Vận', type: 'luck', value: 0.01, price: g * 200 }
    );
    if (state.realmIndex >= SAINT_REALM) SAINT_XP_PILLS.forEach(pill => {
        stock.push({ ...pill, type: 'xp', realm: state.realmIndex, price: goldRef(state.realmIndex) * pill.minutes * XP_PILL_PRICE_PER_MINUTE });
    });
    const discount = renownShopMult();
    stock.forEach(item => {
        item.price = Math.floor(item.price * discount);
        tagXpItem(item);
    });
    return stock;
}

function stackKey(it) {
    return STACK_TYPES.includes(it?.type) ? [it.type, it.name, it.minutes, it.value, it.healPct].join('|') : null;
}

/* Vật phẩm tu vi mang cảnh giới lúc có được: tên ghi rõ, và cho đúng tu vi của cảnh giới đó */
function tagXpItem(it) {
    if (it?.type !== 'xp' || it.tagged) return it;
    it.realm = it.realm ?? (state.realmIndex || 0);
    it.tagged = true;
    it.name = `${it.name} [${REALMS[it.realm]}]`;
    return it;
}

function xpItemGain(it, count = 1) {
    return gainXpAmount(cultivationSecondsXp((it.minutes || XP_ITEM_MINUTES) * 60 * count, it.realm));
}

function gainXpAmount(amount) {
    gainXP(amount);
    return amount;
}

function addItemToInventory(it) {
    tagXpItem(it);
    const key = stackKey(it);
    const same = key && state.inventory.find(other => stackKey(other) === key);
    if (same) same.count = (same.count || 1) + (it.count || 1);
    else state.inventory.push(it);
    renderTopStats();
    renderInventory();
    log(`Nhận vật Phẩm: ${it.name}`);
}

/* Save cũ: gộp các viên giống nhau thành một dòng */
function mergeStacks() {
    const seen = new Map();
    state.inventory.forEach(tagXpItem);
    state.inventory = state.inventory.filter(it => {
        const key = stackKey(it);
        if (!key) return true;
        const same = seen.get(key);
        if (!same) { seen.set(key, it); return true; }
        same.count = (same.count || 1) + (it.count || 1);
        return false;
    });
}

function useAllXp(index) {
    const it = state.inventory[index];
    if (!it || it.type !== 'xp') return;
    if (window._battleActive) { showToast('Đang chiến đấu, chưa thể bế quan.', 'warn'); return; }
    const count = it.count || 1;
    const gained = xpItemGain(it, count);
    state.inventory.splice(index, 1);
    log(`📘 Dùng ${count} ${it.name}, tu vi +${formatNumber(gained)}.`);
    renderTopStats();
    renderInventory();
}

function useItem(index) {
    const it = state.inventory[index];
    if (!it) return;
    
    let needsFullRender = false;
    
    if (it.type === 'xp') {
        if (window._battleActive) { showToast('Đang chiến đấu, chưa thể bế quan.', 'warn'); return; }
        const gained = xpItemGain(it);
        log(`📘 Dùng ${it.name}, tu vi +${formatNumber(gained)}.`);
        renderTopStats();
    }

    else if (it.type === 'power') {
        state.power += it.value;
        log(`💪 Dùng ${it.name}, sức mạnh +${it.value}.`);
        needsFullRender = true;
    }

    else if (it.type === 'life') {
        state.maxAge += it.value;
        log(`🩸 Dùng ${it.name}, tuổi thọ +${it.value}.`);
        
        // 🆕 Chỉ cập nhật age display
        const ageEl = document.getElementById('ageTxt');
        if (ageEl) ageEl.textContent = `${state.age} / ${maxAgeText()}`;
        
        const ageBarEl = document.getElementById('ageBar');
        if (ageBarEl) {
            ageBarEl.style.width = `${agePercent()}%`;
        }
    }
    else if (it.type === 'luck') {
        state.luckBonus = (state.luckBonus || 0) + it.value;
        log(`🍀 Dùng ${it.name}, khí vận +${(it.value * 100).toFixed(1)}%.`);
    }
    else if (it.type === 'defense') {
        state.defense += it.value;
        log(`🛡️ Dùng ${it.name}, phòng thủ vĩnh viễn +${it.value}.`);
        needsFullRender = true;
    }

    else if (it.type === 'consumable') {
        const amount = Math.floor((state.totalMaxHp || state.maxHp) * (it.healPct || 0.25));
        state.hp = Math.min(state.totalMaxHp || state.maxHp, state.hp + amount);
        log(`🧪 Dùng ${it.name}, hồi ${formatNumber(amount)} HP.`);
        needsFullRender = true;
    }

    else if (it.type === 'weapon' || it.type === 'armor') {
        if (!it.equipped && (it.reqRealm || 0) > state.realmIndex) {
            log(`⚠️ Cần ${REALMS[it.reqRealm]} mới trang bị được ${it.name}.`);
            return;
        }
        if (!it.equipped) state.inventory.forEach(x => { if (x.slot === it.slot) x.equipped = false; });
        it.equipped = !it.equipped;
        log(`${it.name} ${it.equipped ? 'đã trang bị' : 'đã tháo'}`);
        needsFullRender = true;
        const gateTier = gateTierOf((state.realmIndex || 0) + 1);
        if (gateTier && gateGearWorn(gateTier) === GEAR_SLOT_IDS.length) {
            delete state.bottleneckNotice;
            checkRealmProgress();
        }
    }

    else if (it.type === 'root_frag') {
        const same = state.inventory.filter(
            x => x.type === 'root_frag' &&
                x.value.elements[0] === it.value.elements[0] &&
                x.value.rank === it.value.rank
        );

        if (same.length >= 3) {
            let removed = 0;
            for (let i = state.inventory.length - 1; i >= 0 && removed < 3; i--) {
                const e = state.inventory[i];
                if (e.type === 'root_frag' &&
                    e.value.elements[0] === it.value.elements[0] &&
                    e.value.rank === it.value.rank) {
                    state.inventory.splice(i, 1);
                    removed++;
                }
            }

            const newRoot = {
                name: `${it.value.elements[0]} Linh Căn (${ROOT_RANKS[it.value.rank]})`,
                type: 'root',
                elements: [it.value.elements[0]],
                rank: it.value.rank,
                desc: `Linh căn hoàn chỉnh của hệ ${it.value.elements[0]}, phẩm chất ${ROOT_RANKS[it.value.rank]}.`,
                combinable: true // có thể hợp thành hỗn nguyên
            };

            state.inventory.push(newRoot);
            log(`🌈 Hợp thành linh căn ${newRoot.name}! (đã thêm vào túi đồ)`);
        } else {
            log('🪶 Cần thêm mảnh để hợp thành linh căn (cần 3 mảnh).');
        }
    }
    else if (it.type === 'root') {
        const isHybrid = it.elements.length > 1;
        state.root = {
            elements: it.elements.slice(0),
            rank: it.rank,
            isHybrid: isHybrid
        };
        log(`🌈 Linh căn đổi thành ${it.name}${isHybrid ? ' — Hỗn Nguyên khởi động!' : ''}`);
        state.inventory.splice(index, 1);
        renderAll();
        return;
    }

    // consume non-equipment items
    if ((it.count || 1) > 1) it.count--;
    else if (it.type !== 'weapon' && it.type !== 'armor' && it.type !== 'root_frag' && it.type !== 'root') {
        state.inventory.splice(index, 1);
    }
    
    // 🆕 Chỉ render khi thực sự cần
    if (needsFullRender) {
        renderAll();
    } else {
        renderInventory(); // chỉ render inventory
    }
}

let rootCombineSelection = []; // các linh căn đang được chọn để hợp

function toggleRootSelection(index) {
    const it = state.inventory[index];
    if (it.type !== 'root') return;

    const pos = rootCombineSelection.indexOf(index);
    if (pos >= 0) rootCombineSelection.splice(pos, 1);
    else rootCombineSelection.push(index);

    renderInventory();
}

function confirmRootCombination() {
    if (rootCombineSelection.length < 3) {
        log('🌿 Cần chọn ít nhất 3 linh căn để hợp thành Hỗn Nguyên Tam Linh.');
        return;
    }

    // Kiểm tra phẩm chất đồng nhất
    const roots = rootCombineSelection.map(i => state.inventory[i]);
    const sameRank = roots.every(r => r.rank === roots[0].rank);
    if (!sameRank) {
        log('⚠️ Phẩm chất linh căn không đồng nhất, không thể hợp.');
        return;
    }

    // Sinh hỗn nguyên căn
    const elements = [...new Set(roots.flatMap(r => r.elements))];
    const rank = roots[0].rank;

    const hybrid = {
        name: `Hỗn Nguyên Linh Căn (${elements.join(' + ')})`,
        type: 'root',
        elements: elements,
        rank: rank,
        desc: `Linh căn hợp thể ${elements.length} hệ (${ROOT_RANKS[rank]}), có thể kích hoạt.`,
        isHybrid: true
    };

    // Xóa các linh căn cũ
    rootCombineSelection.sort((a, b) => b - a).forEach(i => state.inventory.splice(i, 1));
    rootCombineSelection = [];

    // Thêm hỗn nguyên căn mới
    state.inventory.push(hybrid);
    log(`🌌 Hợp thành ${hybrid.name}! Linh căn hợp thể ${elements.length} hệ đã sinh.`);
    renderInventory();
}


function discardItem(index) {
    const it = state.inventory[index];
    if (!it) return;
    if (confirm(`Ngài có chắc muốn vứt bỏ vật Phẩm "${it.name}"${it.count > 1 ? ` (cả ${it.count} viên)` : ''} không?`)) {
        state.inventory.splice(index, 1);
        log(`🗑️ Vứt bỏ ${it.name}.`);
        renderAll();
    }
}


/* ===========================
   SHOP
   - price scaled by realm
   =========================== */


/* modal helpers */
function ensureShopModal() {
    if (document.getElementById('shopModal')) return;
    const modal = document.createElement('div');
    modal.id = 'shopModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:none;align-items:center;justify-content:center;z-index:9999;';
    modal.innerHTML = `
        <div style="background:#0f1724;border-radius:12px;max-width:620px;width:90%;padding:18px;box-shadow:0 10px 40px rgba(0,0,0,0.6);">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <div style="color:#a6ffd1;font-weight:600;">Đa Bảo Đạo Nhân: “Đạo hữu ghé xem linh bảo ta dày công sưu tầm nào.”</div>
                <button id="closeShopBtn" style="border:0;background:transparent;color:#f87171;font-size:20px;cursor:pointer;">✕</button>
            </div>
            <div id="shopModalList" style="margin-top:14px;max-height:420px;overflow:auto;"></div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeShopBtn').onclick = () => toggleShopModal(false);
}

function toggleShopModal(show) {
    const modal = document.getElementById('shopModal');
    if (!modal) return;
    modal.style.display = show ? 'flex' : 'none';
    if (show) renderShop();
}

function openShopModal() {
    ensureShopModal();
    toggleShopModal(true);
}

if (typeof window !== 'undefined') window.openShopModal = openShopModal;

function shopQty(id) {
    return Math.max(1, Math.floor(Number(document.getElementById(`shopQty_${id}`)?.value) || 1));
}

function setShopQtyMax(id) {
    const si = (window.RENDERED_SHOP_LIST || []).find(x => x.id === id);
    const input = document.getElementById(`shopQty_${id}`);
    if (si && input) input.value = Math.max(1, Math.floor(state.gold / si.price));
}

function buyItem(id) {
    const si = (window.RENDERED_SHOP_LIST || []).find(x => x.id === id);
    if (!si) {
        log('Không tìm thấy vật phẩm trong shop hiện tại.');
        return;
    }
    const qty = STACK_TYPES.includes(si.type) ? shopQty(id) : 1;
    const cost = si.price * qty;
    if (state.gold < cost) {
        log(`Không đủ linh thạch (${formatNumber(cost)}).`);
        return;
    }
    state.gold -= cost;
    const { id: _id, price: _price, ...item } = si;
    addItemToInventory({ desc: 'Mua tại cửa hàng', ...item, count: qty });
    log(`🛒 Mua thành công: ${qty} ${si.name} — Giá ${formatNumber(cost)} linh thạch.`);
    renderShop();
}

function shopItemDesc(si) {
    switch (si.type) {
        case 'weapon':
        case 'armor': return gearStatText(si);
        case 'consumable': return `Hồi ${Math.round(si.healPct * 100)}% HP`;
        case 'xp': return `Bằng ${si.minutes} phút bế quan của ${REALMS[si.realm]}`;
        case 'power': return `Sức mạnh vĩnh viễn +${formatNumber(si.value)}`;
        case 'defense': return `Phòng thủ vĩnh viễn +${formatNumber(si.value)}`;
        case 'life': return `Tuổi thọ +${si.value}`;
        case 'luck': return `May mắn +${(si.value * 100).toFixed(1)}%`;
        default: return si.desc || '';
    }
}

window.RENDERED_SHOP_LIST = [];
function renderShop() {
    ensureShopModal();
    const listEl = document.getElementById('shopModalList');
    if (!listEl) return;
    listEl.innerHTML = '';
    window.RENDERED_SHOP_LIST = buildShopStock();

    window.RENDERED_SHOP_LIST.forEach(si => {
        const color = si.quality != null ? GEAR_QUALITIES[si.quality].color : '#a6ffd1';
        const row = document.createElement('div');
        row.className = 'shop-item';
        row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:10px 12px;margin-bottom:10px;border-radius:8px;background:rgba(255,255,255,0.05);';
        row.innerHTML = `
            <div style="flex:1;">
                <div style="font-weight:600;color:${color};">${si.name}</div>
                <div class="small" style="margin-top:4px;line-height:1.4;">${shopItemDesc(si)}</div>
            </div>
            <div style="text-align:right;margin-left:12px;">
                <div class="small" style="color:#ffd166;">${formatNumber(si.price)} linh thạch</div>
                ${STACK_TYPES.includes(si.type) ? `<input id="shopQty_${si.id}" type="number" min="1" value="1" aria-label="Số lượng" style="width:72px;margin-top:6px;">
                <button onclick="setShopQtyMax('${si.id}')" style="margin-top:6px;white-space:nowrap;">Tối đa</button>` : ''}
                <button onclick="buyItem('${si.id}')" style="margin-top:6px;white-space:nowrap;">Mua</button>
            </div>
        `;
        listEl.appendChild(row);
    });

    renderLinhBaoShop(listEl);
}

/* Hỗn Độn Đạo Giả không dùng linh thạch: đan dược đổi bằng elo thắng luận đạo */
function eloPillStock() {
    return buildShopStock(SELF_FORGE_SITE).filter(si => !si.slot && !(si.type === 'life' && ageless())).map(si => ({ ...si, elo: state.realmIndex >= FREE_GOODS_REALM ? 0 : Math.max(1, Math.round(si.price / (goldRef(state.realmIndex) * ELO_PILL_GOLD_REFS))) }));
}

function openPillExchange() {
    const rows = eloPillStock().map(si => `<div class="shop-item forge-row">
        <div><b>${si.name}</b><div class="small">${shopItemDesc(si)}</div></div>
        <button onclick="buyPillWithElo('${si.id}')" ${(state.luanElo || 0) < si.elo ? 'disabled' : ''}>${si.elo ? `${si.elo} elo` : 'Nhận'}</button>
    </div>`).join('');
    openWorldModal('pillModal', '⚗️ Đổi đan dược', `<div class="small">${state.realmIndex >= FREE_GOODS_REALM ? 'Từ Hồng Mông Chúa Tể trở lên đan dược không cần elo.' : `Elo hiện có: ${state.luanElo || 0}. Mỗi trận thắng luận đạo được ${LUAN_DAO_ELO} elo.`}</div>${rows}`);
}

function buyPillWithElo(id) {
    const si = eloPillStock().find(x => x.id === id);
    if (!si || (state.luanElo || 0) < si.elo) return;
    state.luanElo = (state.luanElo || 0) - si.elo;
    const { id: _id, price: _price, elo: _elo, ...item } = si;
    addItemToInventory({ ...item, count: 1 });
    log(`⚗️ Nhận ${si.name}${si.elo ? ` bằng ${si.elo} elo` : ''}.`);
    openPillExchange();
    renderAll();
}

if (typeof window !== 'undefined') Object.assign(window, { openPillExchange, buyPillWithElo });

/* ===========================
   CHỢ LINH BẢO (Bazaar-style artifacts)
   =========================== */
function lbShopPrice(baseCost, grade) {
    return Math.floor(goldRef(state.realmIndex || 0) * (baseCost || 300) / 40 * (1 + grade * 0.15));
}

function getRealmLinhBaoGradeRange(realmIdx) {
    const max = maxLinhBaoGradeForRealm(realmIdx);
    return { min: Math.max(0, max - 1), max, tierName: LB_GRADE_NAMES[max] };
}

function lbRollShopOffer() {
    if (typeof LINH_BAO === 'undefined') { window._lbShopOffer = []; return; }
    const maxG = (typeof LB_MAX_GRADE !== 'undefined' ? LB_MAX_GRADE : 11);
    const realmGrade = getRealmLinhBaoGradeRange(state.realmIndex || 0);
    const pool = [...LINH_BAO];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const pick = pool.slice(0, 4);
    window._lbShopOffer = pick.map(def => {
        // Random grade within realm's allowed range, with some variance
        const variance = Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
        const g = Math.max(realmGrade.min, Math.min(realmGrade.max, realmGrade.min + Math.floor(Math.random() * (realmGrade.max - realmGrade.min + 1)) + variance));
        return { id: def.id, grade: Math.min(maxG, Math.max(0, g)), price: lbShopPrice(def.cost, g) };
    });
    log(`🎴 ${realmGrade.tierName} xuất hiện tại cửa hàng!`);
}

function renderLinhBaoShop(listEl) {
    if (typeof LINH_BAO === 'undefined' || typeof LINH_BAO_MAP === 'undefined') return;
    if (!Array.isArray(window._lbShopOffer)) lbRollShopOffer();

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px;border-top:1px solid rgba(255,255,255,0.12);padding-top:14px;';
    header.innerHTML = `
        <div style="color:#ffd166;font-weight:700;">🎴 Chợ Linh Bảo <span class="small" style="color:#9fb3c8">(pháp bảo bày trận)</span></div>
        <button onclick="refreshLinhBaoShop()" style="white-space:nowrap;">🔄 Làm mới</button>`;
    listEl.appendChild(header);

    if (!window._lbShopOffer.length) {
        const empty = document.createElement('div');
        empty.className = 'small';
        empty.textContent = 'Hết linh bảo — bấm “Làm mới” để lấy lô mới.';
        listEl.appendChild(empty);
        return;
    }

    window._lbShopOffer.forEach((offer, idx) => {
        const def = LINH_BAO_MAP[offer.id];
        if (!def) return;
        const view = { ...def, grade: offer.grade, level: 1 };
        const col = (typeof LB_ELEMENT_COLORS !== 'undefined' && LB_ELEMENT_COLORS[def.element]) || '#a6ffd1';
        const icons = (typeof lbEffectIcons === 'function') ? lbEffectIcons(view) : '⚜️';
        const summary = (typeof lbEffectSummary === 'function') ? lbEffectSummary(view) : '';
        const gradeLabel = (typeof LB_GRADE_NAMES !== 'undefined') ? LB_GRADE_NAMES[offer.grade] : `G${offer.grade}`;
        const cd = (typeof lbEffCooldown === 'function') ? lbEffCooldown(view).toFixed(1) : def.cooldown;
        const row = document.createElement('div');
        row.className = 'shop-item';
        row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:10px 12px;margin-bottom:10px;border-radius:8px;background:rgba(255,255,255,0.05);border-left:3px solid ' + col + ';';
        row.innerHTML = `
            <div style="flex:1;">
                <div style="font-weight:600;color:${col};">${icons} ${def.name} <span class="small">(${gradeLabel})</span></div>
                <div class="small" style="margin-top:4px;line-height:1.4;">${summary} · CD ${cd}s · ${def.desc}</div>
            </div>
            <div style="text-align:right;margin-left:12px;">
                <div class="small" style="color:#ffd166;">${offer.price.toLocaleString()} linh thạch</div>
                <button onclick="buyLinhBao(${idx})" style="margin-top:6px;white-space:nowrap;">Mua</button>
            </div>`;
        listEl.appendChild(row);
    });
}

function refreshLinhBaoShop() {
    lbRollShopOffer();
    renderShop();
}
if (typeof window !== 'undefined') window.refreshLinhBaoShop = refreshLinhBaoShop;

function buyLinhBao(idx) {
    if (window._battleActive || (typeof isBattleLocked === 'function' && isBattleLocked())) {
        log('🔒 Đang chiến đấu — không thể mua sắm.');
        return;
    }
    const offer = (window._lbShopOffer || [])[idx];
    if (!offer) { log('Không tìm thấy linh bảo.'); return; }
    if (state.gold < offer.price) { log(`Không đủ linh thạch (${offer.price.toLocaleString()}).`); return; }
    if (typeof makeLinhBao !== 'function') { log('Hệ thống linh bảo chưa sẵn sàng.'); return; }

    const lb = makeLinhBao(offer.id, offer.grade);
    if (!lb) { log('Không thể tạo linh bảo.'); return; }
    state.gold -= offer.price;
    addItemToInventory(lb);
    log(`🛒 Thỉnh được linh bảo ${lb.name} (${(typeof lbGradePlain === 'function' ? lbGradePlain(lb) : lb.grade)}) — ${offer.price.toLocaleString()} linh thạch.`);
    window._lbShopOffer.splice(idx, 1);
    renderShop();
}
if (typeof window !== 'undefined') window.buyLinhBao = buyLinhBao;

/* Fuse linh bảo to raise grade: requires 2 items of same grade to create 1 of next grade.
   Exponential material cost: 2, 9, 36, 100, 225...
   The first grade (Phàm) needs 2 to fuse, Hoàng needs 9, etc. */
const LB_LINHBAO_FUSION_MATERIALS = [2, 9, 36, 100, 225, 441, 784, 1296, 2025, 3025, 4356, 6084, 8000];
const LB_LINHBAO_FUSION_GOLD = [100, 500, 2000, 8000, 30000, 100000, 350000, 1200000, 4000000, 14000000, 50000000, 180000000, 650000000];

// Check if a specific Linh Bảo item can be used for fusion
function canLinhBaoFuse(inventoryIndex) {
    const it = state.inventory[inventoryIndex];
    if (!it || it.type !== 'linhbao') return false;
    const g = (typeof lbGradeOf === 'function') ? lbGradeOf(it) : (it.grade || 0);
    const maxG = (typeof LB_MAX_GRADE !== 'undefined') ? LB_MAX_GRADE : 12;
    if (g >= maxG) return false; // Already at max grade
    // Check if already at max fusion tier
    if (it.maxFusionTier != null && g >= it.maxFusionTier) return false;
    return true;
}

// Count available Linh Bảo of a given grade that can be fused
function countLinhBaoForFusion(grade) {
    if (!Array.isArray(state.inventory)) return 0;
    return state.inventory.filter(it => {
        if (!it || it.type !== 'linhbao') return false;
        const g = (typeof lbGradeOf === 'function') ? lbGradeOf(it) : (it.grade || 0);
        if (g !== grade) return false;
        return canLinhBaoFuse(state.inventory.indexOf(it));
    }).length;
}

/* Vật liệu hợp nhất do người chơi chọn; pháp bảo đang trên trận không bao giờ là vật liệu */
function fusionMaterials(target) {
    const g = lbGradeOf(target);
    return state.inventory.filter(item => item && item.type === 'linhbao' && item !== target && lbGradeOf(item) === g
        && !state.board.includes(item.uid) && canLinhBaoFuse(state.inventory.indexOf(item)))
        .sort((x, y) => lbLevelOf(x) - lbLevelOf(y));
}

let _fusionPick = null;

function fuseLinhBao(inventoryIndex) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể hợp nhất.'); return; }
    const it = state.inventory[inventoryIndex];
    if (!it || it.type !== 'linhbao') return;
    if (!canLinhBaoFuse(inventoryIndex)) { log(`🔒 ${it.name} không thể hợp nhất!`); return; }
    if (!lbFuseReady(it)) { log(`🔒 ${it.name} cần thành thạo 100% mới nâng được (đang ${lbMasteryPct(it)}%).`); return; }
    _fusionPick = { uid: it.uid, picked: [] };
    renderFusionPick();
}

function renderFusionPick() {
    const target = state.inventory.find(item => item && item.uid === _fusionPick.uid);
    if (!target) return;
    const g = lbGradeOf(target);
    const need = LB_LINHBAO_FUSION_MATERIALS[g] || 2;
    const gold = LB_LINHBAO_FUSION_GOLD[g] || 100;
    const list = fusionMaterials(target);
    const rows = list.map(item => {
        const on = _fusionPick.picked.includes(item.uid);
        return `<button class="look-chip ${on ? 'active' : ''}" onclick="toggleFusionMaterial('${item.uid}')">${item.name} ${lbMasteryPct(item)}%</button>`;
    }).join('') || '<div class="small">Không có pháp bảo cùng giai ngoài trận.</div>';
    const ready = _fusionPick.picked.length === need && state.gold >= gold && lbFuseReady(target);
    openWorldModal('fusionModal', `🔥 Hợp nhất ${target.name}`, `<div class="small">Thăng lên ${LB_GRADE_NAMES[g + 1]}. Thành thạo giảm ${Math.round(LB_FUSE_MASTERY_LOSS * 100)}%: từ ${lbMasteryPct(target)}% còn ${Math.floor(lbMasteryAfterFuse(target))}%. Pháp bảo đang trên trận không bị lấy làm vật liệu.</div>
        <div>Đã chọn <b>${_fusionPick.picked.length}/${need}</b> · ${gold.toLocaleString()} linh thạch</div>
        <div class="fusion-picks">${rows}</div>
        <button class="mini-btn" onclick="autoPickFusion()">Chọn cấp thấp nhất</button>
        <button class="mini-btn" ${ready ? '' : 'disabled'} onclick="confirmFusion()">🔥 Hợp nhất</button>`);
}

function toggleFusionMaterial(uid) {
    const target = state.inventory.find(item => item && item.uid === _fusionPick.uid);
    const need = LB_LINHBAO_FUSION_MATERIALS[lbGradeOf(target)] || 2;
    const picked = _fusionPick.picked;
    if (picked.includes(uid)) _fusionPick.picked = picked.filter(x => x !== uid);
    else if (picked.length < need) picked.push(uid);
    renderFusionPick();
}

function autoPickFusion() {
    const target = state.inventory.find(item => item && item.uid === _fusionPick.uid);
    const need = LB_LINHBAO_FUSION_MATERIALS[lbGradeOf(target)] || 2;
    _fusionPick.picked = fusionMaterials(target).slice(0, need).map(item => item.uid);
    renderFusionPick();
}

function confirmFusion() {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể hợp nhất.'); return; }
    const it = state.inventory.find(item => item && item.uid === _fusionPick.uid);
    if (!it) return;
    const maxG = LB_MAX_GRADE;
    const g = lbGradeOf(it);
    const materialCost = LB_LINHBAO_FUSION_MATERIALS[g] || 2;
    const goldCost = LB_LINHBAO_FUSION_GOLD[g] || 100;
    const allowed = fusionMaterials(it).map(item => item.uid);
    const picked = _fusionPick.picked.filter(uid => allowed.includes(uid));
    if (!lbFuseReady(it)) { log(`🔒 ${it.name} cần thành thạo 100% mới nâng được (đang ${lbMasteryPct(it)}%).`); return; }
    if (picked.length !== materialCost) { log(`⚠️ Cần chọn đủ ${materialCost} vật liệu ngoài trận.`); return; }
    if (state.gold < goldCost) { log(`⚠️ Cần ${goldCost.toLocaleString()} linh thạch để hợp nhất! Hiện có: ${state.gold.toLocaleString()}`); return; }

    state.gold -= goldCost;
    state.inventory = state.inventory.filter(item => !item || !picked.includes(item.uid));
    it.grade = g + 1;
    it.level = lbMasteryAfterFuse(it);
    delete it.fusionLocked;

    const gradeTitle = it.grade >= 6 ? '🔱' : (it.grade >= 3 ? '⭐' : '✨');
    log(`${gradeTitle} Đột phá! ${it.name} thăng lên ${LB_GRADE_NAMES[it.grade]}! (−${goldCost.toLocaleString()} linh thạch, −${materialCost} vật liệu, thành thạo còn ${lbMasteryPct(it)}%)`);

    // Special messages for legendary grades
    if (it.grade === 6) log(`⚔️ Chí Tôn Pháp — bước vào cảnh giới Chí Tôn!`);
    else if (it.grade === 7) log(`👑 Đế Pháp — ngôi vị Đế không ai bì kịp!`);
    else if (it.grade === 8) log(`🌟 Chuẩn Thánh Pháp — gần như thánh nhân!`);
    else if (it.grade === 9) log(`💫 Thánh Pháp — cảnh giới thánh!`);
    else if (it.grade === 10) log(`🌀 Hỗn Độn Pháp — hỗn loạn thiên địa!`);
    else if (it.grade === 11) log(`🌌 Hồng Mông Pháp — khởi nguyên vũ trụ!`);
    else if (it.grade === 12) log(`🏆 Chung Nguyên Pháp — đỉnh cao tuyệt đối!`);

    if (it.grade >= maxG) log(`🏆 ${it.name} đã đạt cảnh giới tối cao tuyệt đối!`);
    guideDone('fuse');

    document.getElementById('fusionModal').style.display = 'none';
    renderAll();
}
if (typeof window !== 'undefined') Object.assign(window, { fuseLinhBao, toggleFusionMaterial, autoPickFusion, confirmFusion });

// Guard useItem during battle
if (typeof window.useItem === 'function') {
	const __oldUseItem = window.useItem;
	window.useItem = function(item) {
		if (window._battleActive || (typeof isBattleLocked === 'function' && isBattleLocked())) {
			log('🔒 Đang chiến đấu — không thể dùng vật phẩm.');
			return;
		}
		return __oldUseItem(item);
	};
}

// Optionally guard buy/equip if they exist
if (typeof window.buyItem === 'function') {
	const __oldBuyItem = window.buyItem;
	window.buyItem = function(id) {
		if (window._battleActive || (typeof isBattleLocked === 'function' && isBattleLocked())) {
			log('🔒 Đang chiến đấu — không thể mua sắm.');
			return;
		}
		return __oldBuyItem(id);
	};
}