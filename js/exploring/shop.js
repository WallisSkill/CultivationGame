/* ===========================
    INVENTORY / ITEMS / EQUIP
=========================== */
/* --- Shop items (base) --- */
/* 🎮 REALM-BASED SHOP TIERS:
   - Tier 0 (Realm 0-4):    Phàm giới items
   - Tier 1 (Realm 5-8):    Trúc Cơ→Đại Thừa items
   - Tier 2 (Realm 9-15):   Tiên giới items
   - Tier 3 (Realm 16-19):  Thánh cảnh items
   - Tier 4 (Realm 20-25):  Thiên cảnh items
   - Tier 5 (Realm 26+):    Cực cảnh items
*/
const SHOP_ITEMS = [
    // 🎯 TIER 0 - Phàm giới (Realm 0-4)
    { id: 'swd_iron', name: 'Kiếm Sắt', type: 'weapon', atk: 12, hp: 0, def: 0, cost: 80, minTier: 0 },
    { id: 'arm_basic', name: 'Giáp Cơ Bản', type: 'armor', atk: 0, hp: 70, def: 12, cost: 120, minTier: 0 },
    { id: 'elixir_small', name: 'Đan Hồi Phục Tiểu', type: 'consumable', heal: 120, cost: 60, minTier: 0 },
    { id: 'jade_cult', name: 'Ngọc Bội Tụ Linh', type: 'xp', value: 900, cost: 260, minTier: 0 },
    { id: 'pill_power', name: 'Lực Cốt Đan', type: 'power', value: 45, cost: 320, minTier: 0 },
    { id: 'pill_barrier', name: 'Huyền Giáp Đan', type: 'defense', value: 55, cost: 340, minTier: 0 },
    { id: 'nectar_life', name: 'Tiên Tủy Sinh Mệnh', type: 'life', value: 220, cost: 560, minTier: 0 },
    { id: 'scroll_fortune', name: 'Trục Thư Tăng Vận', type: 'luck', value: 0.06, cost: 720, minTier: 0, desc: 'Tăng khí vận lâu dài' },
    { id: 'manual_iron_body', name: 'Công Pháp Huyền Thiết', type: 'manual', skillId: 'iron_body', cost: 540, minTier: 0, desc: 'Học kỹ năng tăng phòng thủ' },
    { id: 'manual_wind_step', name: 'Ảnh Phong Thân Pháp', type: 'manual', skillId: 'wind_step', cost: 680, minTier: 0, desc: 'Học thân pháp gia tăng né tránh' },

    // ⚔️ TIER 1 - Trúc Cơ→Đại Thừa (Realm 5-8)
    { id: 'swd_storm', name: 'Kiếm Lôi Đình', type: 'weapon', atk: 210, hp: 40, def: 0, cost: 1800, minTier: 1 },
    { id: 'arm_dragon', name: 'Long Lân Khải', type: 'armor', atk: 0, hp: 520, def: 78, cost: 2200, minTier: 1 },
    { id: 'blade_void', name: 'Đoản Đao Hư Không', type: 'weapon', atk: 320, hp: 0, def: 35, cost: 3400, minTier: 1 },
    { id: 'robe_stellar', name: 'Tinh Hà Đạo Bào', type: 'armor', atk: 45, hp: 420, def: 55, cost: 3600, minTier: 1 },
    { id: 'elixir_royal', name: 'Đan Long Huyết', type: 'consumable', heal: 680, cost: 420, minTier: 1 },
    { id: 'jade_sun', name: 'Thái Dương Kim Ngọc', type: 'xp', value: 2800, cost: 980, minTier: 1 },
    { id: 'pill_cosmic', name: 'Nguyệt Tâm Đan', type: 'power', value: 120, cost: 880, minTier: 1 },
    { id: 'pill_eden', name: 'Thiên Địa Đan', type: 'defense', value: 150, cost: 920, minTier: 1 },

    // 🔮 TIER 2 - Tiên giới (Realm 9-15)
    { id: 'sword_celestial', name: 'Thiên Kiếm', type: 'weapon', atk: 850, hp: 180, def: 80, cost: 12000, minTier: 2 },
    { id: 'armor_immortal', name: 'Bất Diệt Khải', type: 'armor', atk: 120, hp: 2200, def: 380, cost: 15000, minTier: 2 },
    { id: 'robe_phoenix', name: 'Phượng Hoàng Dao Bào', type: 'armor', atk: 280, hp: 1800, def: 290, cost: 14000, minTier: 2 },
    { id: 'elixir_immortal', name: 'Tiên Tân Đan', type: 'consumable', heal: 3500, cost: 2500, minTier: 2 },
    { id: 'jade_star', name: 'Tinh Ngọc Tụ Tu Vi', type: 'xp', value: 15000, cost: 6000, minTier: 2 },
    { id: 'pill_dragon', name: 'Long Cốt Đan', type: 'power', value: 380, cost: 3200, minTier: 2 },
    { id: 'pill_phoenix', name: 'Phượng Linh Đan', type: 'defense', value: 420, cost: 3500, minTier: 2 },
    { id: 'manual_iron_body_t2', name: 'Thiên Thiết Công Pháp', type: 'manual', skillId: 'iron_body', cost: 4000, minTier: 2, desc: 'Phiên bản Tiên giới của Huyền Thiết' },
    { id: 'manual_wind_step_t2', name: 'Thần Tung Thân Pháp', type: 'manual', skillId: 'wind_step', cost: 4500, minTier: 2, desc: 'Phiên bản Tiên giới của Ảnh Phong' },

    // ⭐ TIER 3 - Thánh cảnh (Realm 16-19)
    { id: 'sword_divine', name: 'Thánh Kiếm', type: 'weapon', atk: 3200, hp: 650, def: 280, cost: 45000, minTier: 3 },
    { id: 'armor_divine', name: 'Thánh Khải', type: 'armor', atk: 380, hp: 8000, def: 1200, cost: 55000, minTier: 3 },
    { id: 'robe_goddess', name: 'Nữ Thần Bào', type: 'armor', atk: 850, hp: 6500, def: 920, cost: 52000, minTier: 3 },
    { id: 'elixir_divine', name: 'Thánh Tân Đan', type: 'consumable', heal: 15000, cost: 9800, minTier: 3 },
    { id: 'jade_divine', name: 'Thánh Ngọc Tụ Linh', type: 'xp', value: 65000, cost: 22000, minTier: 3 },
    { id: 'pill_divine_power', name: 'Thánh Lực Đan', type: 'power', value: 1200, cost: 12000, minTier: 3 },
    { id: 'pill_divine_def', name: 'Thánh Giáp Đan', type: 'defense', value: 1400, cost: 13000, minTier: 3 },

    // 🌟 TIER 4 - Thiên cảnh (Realm 20-25)
    { id: 'sword_heaven', name: 'Thiên Kiếm Chư Thần', type: 'weapon', atk: 12000, hp: 2500, def: 950, cost: 180000, minTier: 4 },
    { id: 'armor_heaven', name: 'Thiên Khải Chư Thần', type: 'armor', atk: 1400, hp: 28000, def: 4200, cost: 200000, minTier: 4 },
    { id: 'robe_cosmos', name: 'Cosmos Đạo Bào', type: 'armor', atk: 2800, hp: 22000, def: 3200, cost: 190000, minTier: 4 },
    { id: 'elixir_heaven', name: 'Thiên Tân Đan', type: 'consumable', heal: 55000, cost: 38000, minTier: 4 },
    { id: 'jade_heaven', name: 'Thiên Ngọc Tụ Tu Vi', type: 'xp', value: 250000, cost: 85000, minTier: 4 },
    { id: 'pill_heaven_power', name: 'Thiên Lực Đan', type: 'power', value: 4500, cost: 48000, minTier: 4 },
    { id: 'pill_heaven_def', name: 'Thiên Giáp Đan', type: 'defense', value: 5200, cost: 52000, minTier: 4 },

    // 🌌 TIER 5 - Cực cảnh (Realm 26+)
    { id: 'sword_ultimate', name: 'Hỗn Độn Kiếm', type: 'weapon', atk: 45000, hp: 9500, def: 3500, cost: 650000, minTier: 5 },
    { id: 'armor_ultimate', name: 'Hỗn Độn Khải', type: 'armor', atk: 5200, hp: 95000, def: 15000, cost: 720000, minTier: 5 },
    { id: 'robe_chaos', name: 'Hồng Mông Đạo Bào', type: 'armor', atk: 9800, hp: 75000, def: 12000, cost: 680000, minTier: 5 },
    { id: 'elixir_ultimate', name: 'Hỗn Độn Tân Đan', type: 'consumable', heal: 200000, cost: 150000, minTier: 5 },
    { id: 'jade_ultimate', name: 'Hồng Mông Ngọc', type: 'xp', value: 1000000, cost: 320000, minTier: 5 },
    { id: 'pill_ultimate_power', name: 'Hỗn Độn Lực Đan', type: 'power', value: 18000, cost: 180000, minTier: 5 },
    { id: 'pill_ultimate_def', name: 'Hỗn Độn Giáp Đan', type: 'defense', value: 20000, cost: 200000, minTier: 5 },
];

/* Get the player's shop tier based on realm */
function getPlayerShopTier(realmIdx) {
    if (realmIdx < 5) return 0;
    if (realmIdx < 9) return 1;
    if (realmIdx < 16) return 2;
    if (realmIdx < 20) return 3;
    if (realmIdx < 26) return 4;
    return 5;
}

/* Get tier name for display */
function getShopTierName(tier) {
    const names = ['Phàm Giới', 'Trúc Cơ→Đại Thừa', 'Tiên Giới', 'Thánh Cảnh', 'Thiên Cảnh', 'Cực Cảnh'];
    return names[tier] || 'Unknown';
}

function addItemToInventory(it) {
    state.inventory.push(it);
    renderAll();
    log(`Nhận vật Phẩm: ${it.name}`);
}

function useItem(index) {
    const it = state.inventory[index];
    if (!it) return;
    
    let needsFullRender = false;
    
    if (it.type === 'xp') {
        gainXP(Math.floor(it.value * (1 + state.realmIndex * 0.2)));
        log(`📘 Dùng ${it.name}, tăng tu vi.`);
        // gainXP đã tự update UI
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
        if (ageEl) ageEl.textContent = `${state.age} / ${state.maxAge}`;
        
        const ageBarEl = document.getElementById('ageBar');
        if (ageBarEl) {
            const percent = Math.min(100, Math.round(state.age / state.maxAge * 100));
            ageBarEl.style.width = `${percent}%`;
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

    else if (it.type === 'consumable' && it.heal) {
        state.hp = Math.min(state.maxHp, state.hp + it.heal);
        log(`🧪 Dùng ${it.name}, hồi ${it.heal} HP.`);
        
        // 🆕 Chỉ cập nhật HP bar
        const hpEl = document.getElementById('hpTxt');
        const hpBarEl = document.getElementById('hpBar');
        const bonusHp = typeof getEquippedHp === 'function' ? getEquippedHp() : 0;
        const totalMaxHp = state.maxHp + bonusHp;
        
        if (hpEl) hpEl.textContent = `${Math.floor(state.hp)} / ${totalMaxHp}`;
        if (hpBarEl) {
            const percent = Math.round(state.hp / totalMaxHp * 100);
            hpBarEl.style.width = `${percent}%`;
        }
    }

    else if (it.type === 'weapon') {
        it.equipped = !it.equipped;
        log(`${it.name} ${it.equipped ? 'đã trang bị' : 'đã tháo'}`);
        needsFullRender = true;
    }

    else if (it.type === 'armor') {
        it.equipped = !it.equipped;
        log(`${it.name} ${it.equipped ? 'đã mặc' : 'đã tháo'}`);
        needsFullRender = true;
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

    else if (it.type === 'manual' && it.skillId) {
        const success = learnSkill(it.skillId, it.name);
        if (!success) {
            renderAll();
            return;
        }
        log(`🧠 Ngươi ngộ ra công pháp ${SKILL_LIBRARY?.[it.skillId]?.name || it.name}.`);
        needsFullRender = true;
    }

    // consume non-equipment items
    if (it.type !== 'weapon' && it.type !== 'armor' && it.type !== 'root_frag' && it.type !== 'root') {
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
    if (confirm(`Ngài có chắc muốn vứt bỏ vật Phẩm "${it.name}" không?`)) {
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

function buyItem(id) {
    const si = (window.RENDERED_SHOP_LIST || []).find(x => x.id === id);
    if (!si) {
        log('Không tìm thấy vật phẩm trong shop hiện tại.');
        return;
    }

    const price = si.price;
    if (state.gold < price) {
        log(`Không đủ linh thạch (${price}).`);
        return;
    }

    state.gold -= price;

    const obj = {
        name: si.name,
        type: si.type,
        desc: 'Mua tại cửa hàng',
        atk: si.atk,
        def: si.def,
        hp: si.hp,
        heal: si.heal,
        value: si.value,
        effect: si.effect,
        uses: si.uses,
        skillId: si.skillId
    };

    addItemToInventory(obj);
    log(`🛒 Mua thành công: ${si.name} — Giá ${price.toLocaleString()} linh thạch.`);
}

window.RENDERED_SHOP_LIST = [];
function renderShop() {
    ensureShopModal();
    const listEl = document.getElementById('shopModalList');
    if (!listEl) return;
    listEl.innerHTML = '';
    window.RENDERED_SHOP_LIST = [];

    const playerTier = getPlayerShopTier(state.realmIndex || 0);
    const tierName = getShopTierName(playerTier);

    // Show tier header
    const tierHeader = document.createElement('div');
    tierHeader.style.cssText = 'text-align:center;margin-bottom:14px;padding:8px;background:rgba(166,255,209,0.1);border-radius:8px;border:1px solid rgba(166,255,209,0.3);';
    tierHeader.innerHTML = `<div style="color:#a6ffd1;font-weight:700;">🏪 Cửa Hàng ${tierName}</div>
        <div class="small" style="color:#9fb3c8;margin-top:4px;">Tu vi hiện tại: <b>Cảnh ${state.realmIndex}</b> — Hiển thị vật phẩm từ Tier 0 đến Tier ${playerTier}</div>`;
    listEl.appendChild(tierHeader);

    // Filter items by tier
    const availableItems = SHOP_ITEMS.filter(si => (si.minTier || 0) <= playerTier);

    // Group items by tier
    const itemsByTier = {};
    availableItems.forEach(si => {
        const tier = si.minTier || 0;
        if (!itemsByTier[tier]) itemsByTier[tier] = [];
        itemsByTier[tier].push(si);
    });

    // Render items grouped by tier with headers
    let lastTier = -1;
    Object.keys(itemsByTier).sort((a, b) => a - b).forEach(tier => {
        const items = itemsByTier[tier];
        const currentTierName = getShopTierName(parseInt(tier));

        // Add tier header (only if we have multiple tiers)
        if (playerTier > 0 && parseInt(tier) < playerTier) {
            const sectionHeader = document.createElement('div');
            sectionHeader.style.cssText = 'margin:12px 0 8px;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:6px;font-size:0.85em;color:#888;';
            sectionHeader.innerHTML = `📦 ${currentTierName} — <span class="small">Cấp độ cơ bản</span>`;
            listEl.appendChild(sectionHeader);
        } else if (parseInt(tier) === playerTier) {
            const sectionHeader = document.createElement('div');
            sectionHeader.style.cssText = 'margin:12px 0 8px;padding:6px 10px;background:rgba(255,215,0,0.15);border-radius:6px;font-size:0.85em;color:#ffd700;';
            sectionHeader.innerHTML = `✨ ${currentTierName} — <span class="small">Vật phẩm cao cấp mới xuất hiện!</span>`;
            listEl.appendChild(sectionHeader);
        }

        items.forEach(si => {
        const realmAtkMul = Math.pow(1.5, state.realmIndex);
        const realmDefMul = Math.pow(1.45, state.realmIndex);
        const realmHpMul = Math.pow(1.5, state.realmIndex);
        const realmHealMul = Math.pow(1.25, state.realmIndex);
        const realmValueMul = Math.pow(1.35, state.realmIndex);

        const priceBoost = Math.pow(1.35, state.realmIndex) * (1 + state.realmIndex * 0.08);
        const price = Math.floor(si.cost * priceBoost);

        const enhanced = { ...si, price };

        if (si.type === 'weapon') {
            enhanced.atk = Math.floor((si.atk || 0) * realmAtkMul + state.realmIndex * 18);
            enhanced.hp = si.hp || 0;
        } else if (si.type === 'armor') {
            enhanced.hp = Math.floor((si.hp || 0) * realmHpMul + state.realmIndex * 110);
            enhanced.def = Math.floor((si.def || 0) * realmDefMul + state.realmIndex * 16);
            enhanced.atk = si.atk || 0;
        } else if (si.type === 'consumable') {
            enhanced.heal = Math.floor((si.heal || 0) * realmHealMul);
        } else if (si.type === 'luck') {
            enhanced.value = parseFloat((si.value + state.realmIndex * 0.015).toFixed(3));
        } else if (['xp', 'power', 'defense', 'life'].includes(si.type)) {
            enhanced.value = Math.floor((si.value || 0) * realmValueMul);
        }

        window.RENDERED_SHOP_LIST.push(enhanced);

        const desc = (() => {
            switch (si.type) {
                case 'weapon':
                    return `ATK +${enhanced.atk}${enhanced.hp ? `, HP +${enhanced.hp}` : ''}`;
                case 'armor':
                    return `HP +${enhanced.hp}, DEF +${enhanced.def}${enhanced.atk ? `, ATK +${enhanced.atk}` : ''}`;
                case 'consumable':
                    return `Hồi HP ${enhanced.heal}`;
                case 'xp':
                    return `Tăng tu vi +${enhanced.value}`;
                case 'power':
                    return `Sức mạnh +${enhanced.value}`;
                case 'defense':
                    return `Phòng thủ +${enhanced.value}`;
                case 'life':
                    return `Tuổi thọ +${enhanced.value}`;
                case 'luck':
                    return `May mắn +${(enhanced.value * 100).toFixed(1)}%`;
                case 'manual':
                    // 🆕 Hiển thị chi tiết skill
                    const skillDef = window.SKILL_LIBRARY?.[si.skillId];
                    if (skillDef) {
                        const skillType = skillDef.type === 'active' ? '⚡ Chủ động' : '💫 Bị động';
                        return `${skillType} — ${skillDef.description || si.desc || 'Kỹ năng mới'}`;
                    }
                    return si.desc || 'Công pháp mới';
                default:
                    return si.desc || 'Vật phẩm đặc biệt';
            }
        })();

        const row = document.createElement('div');
        row.className = 'shop-item';
        row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:10px 12px;margin-bottom:10px;border-radius:8px;background:rgba(255,255,255,0.05);';
        row.innerHTML = `
            <div style="flex:1;">
                <div style="font-weight:600;color:#a6ffd1;">${si.name}</div>
                <div class="small" style="margin-top:4px;line-height:1.4;">${desc}</div>
            </div>
            <div style="text-align:right;margin-left:12px;">
                <div class="small" style="color:#ffd166;">${price.toLocaleString()} linh thạch</div>
                <button onclick="buyItem('${si.id}')" style="margin-top:6px;white-space:nowrap;">Mua</button>
            </div>
        `;
        listEl.appendChild(row);
        });
    });

    renderLinhBaoShop(listEl);
}

/* ===========================
   CHỢ LINH BẢO (Bazaar-style artifacts)
   =========================== */
function lbShopPrice(baseCost, grade) {
    const realmBoost = Math.pow(1.3, state.realmIndex || 0) * (1 + (state.realmIndex || 0) * 0.06);
    return Math.floor((baseCost || 300) * realmBoost * (1 + grade * 0.9));
}

/* 🎴 LINH BẢO SHOP GRADE BY REALM
   - Realms 0-4:   Phàm giới (grade 0-1) - Phàm Pháp
   - Realms 5-8:   Kim Đan→Đại Thừa (grade 2-3) - Huyền Pháp
   - Realms 9-15:  Tiên giới (grade 4-5) - Tiên Pháp
   - Realms 16-19: Thánh cảnh (grade 6-7) - Thánh Pháp
   - Realms 20-25: Thiên cảnh (grade 8-9) - Thiên Pháp
   - Realms 26-28: Cực cảnh (grade 10-11) - Hỗn Độn Pháp / Hồng Mông Pháp
*/
function getRealmLinhBaoGradeRange(realmIdx) {
    if (realmIdx < 5) return { min: 0, max: 1, tierName: 'Phàm Pháp' };
    if (realmIdx < 9) return { min: 2, max: 3, tierName: 'Huyền Pháp' };
    if (realmIdx < 16) return { min: 4, max: 5, tierName: 'Tiên Pháp' };
    if (realmIdx < 20) return { min: 6, max: 7, tierName: 'Thánh Pháp' };
    if (realmIdx < 26) return { min: 8, max: 9, tierName: 'Thiên Pháp' };
    return { min: 10, max: 11, tierName: 'Hỗn Độn Pháp' };
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

/* Upgrade an owned linh bảo: ONLY level up within current grade.
   To raise grade, you MUST use fuseLinhBao function.
   Level upgrade: cost increases with level and grade. */
function upgradeLinhBao(inventoryIndex) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể nâng cấp.'); return; }
    const it = state.inventory[inventoryIndex];
    if (!it || it.type !== 'linhbao') return;

    const maxG = (typeof LB_MAX_GRADE !== 'undefined') ? LB_MAX_GRADE : 12;
    const g = (typeof lbGradeOf === 'function') ? lbGradeOf(it) : (it.grade || 0);
    const lvl = (typeof lbLevelOf === 'function') ? lbLevelOf(it) : (it.level || 1);
    const gradeMax = (typeof lbMaxLevelFor === 'function') ? lbMaxLevelFor(g) : 100;
    const gradeCostMult = (typeof LB_GRADE_COST_MULT !== 'undefined') ? LB_GRADE_COST_MULT[g] || 1 : 1;

    if (lvl >= gradeMax) {
        // Already at max level for this grade
        const gName = (typeof LB_GRADE_NAMES !== 'undefined') ? LB_GRADE_NAMES[g] : g;
        log(`🔺 ${it.name} đã đạt ${gName} Lv.${gradeMax} (tối đa). Dùng Hợp nhất để thăng giai!`);
        return;
    }

    // level up within the current grade
    // Cost increases exponentially with grade AND level
    const levelCostMult = 1 + (lvl - 1) * (0.05 + g * 0.015);
    const cost = Math.floor(lbShopPrice(it.cost, g) * levelCostMult * gradeCostMult);
    if (state.gold < cost) { log(`Không đủ linh thạch để tăng cấp (cần ${cost.toLocaleString()}).`); return; }
    state.gold -= cost;
    it.level = lvl + 1;
    const gName = (typeof LB_GRADE_NAMES !== 'undefined') ? LB_GRADE_NAMES[g] : g;
    log(`🔺 ${it.name} tu luyện tới ${gName} Lv.${it.level}! (−${cost.toLocaleString()} linh thạch)`);

    // Announce milestone levels
    const milestones = [gradeMax * 0.25, gradeMax * 0.5, gradeMax * 0.75, gradeMax];
    if (milestones.includes(it.level)) {
        log(`🌟 ${it.name} đạt cột mốc ${gName} Lv.${it.level}!`);
    }
    renderAll();
}
if (typeof window !== 'undefined') window.upgradeLinhBao = upgradeLinhBao;

/* Fuse linh bảo to raise grade: requires 2 items of same grade to create 1 of next grade.
   Works like skill fusion - exponential material cost: 2, 9, 36, 100, 225...
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
    // Check if fusion is locked
    if (it.fusionLocked) return false;
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

function fuseLinhBao(inventoryIndex) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể hợp nhất.'); return; }
    const it = state.inventory[inventoryIndex];
    if (!it || it.type !== 'linhbao') return;

    const maxG = (typeof LB_MAX_GRADE !== 'undefined') ? LB_MAX_GRADE : 12;
    const g = (typeof lbGradeOf === 'function') ? lbGradeOf(it) : (it.grade || 0);

    if (g >= maxG) {
        const gName = (typeof LB_GRADE_NAMES !== 'undefined') ? LB_GRADE_NAMES[g] : g;
        log(`🔒 ${it.name} đã đạt ${gName} (tối đa), không thể thăng giai thêm!`);
        return;
    }

    // Check if item can be fused
    if (!canLinhBaoFuse(inventoryIndex)) {
        log(`🔒 ${it.name} không thể hợp nhất!`);
        return;
    }

    const materialCost = LB_LINHBAO_FUSION_MATERIALS[g] || 2;
    const goldCost = LB_LINHBAO_FUSION_GOLD[g] || 100;

    // Check if we have enough materials (same grade Linh Bảo)
    const available = countLinhBaoForFusion(g);
    if (available < materialCost) {
        log(`⚠️ Cần ${materialCost} Trận Pháp Bảo ${LB_GRADE_NAMES ? LB_GRADE_NAMES[g] : 'Giai ' + g} để hợp nhất! Hiện có: ${available}`);
        return;
    }

    // Check gold cost
    if (state.gold < goldCost) {
        log(`⚠️ Cần ${goldCost.toLocaleString()} linh thạch để hợp nhất! Hiện có: ${state.gold.toLocaleString()}`);
        return;
    }

    // Find material Linh Bảo items to consume (excluding the one we're upgrading)
    const toRemove = [];
    for (let i = 0; i < state.inventory.length && toRemove.length < materialCost; i++) {
        const item = state.inventory[i];
        if (!item || item.type !== 'linhbao') continue;
        if (i === inventoryIndex) continue; // Don't include the target item
        const ig = (typeof lbGradeOf === 'function') ? lbGradeOf(item) : (item.grade || 0);
        if (ig !== g) continue; // Must be same grade
        if (!canLinhBaoFuse(i)) continue; // Must be fusible
        toRemove.push(i);
    }

    if (toRemove.length < materialCost) {
        log(`⚠️ Không đủ Trận Pháp Bảo cùng giai đoạn để hợp nhất!`);
        return;
    }

    // Deduct gold
    state.gold -= goldCost;

    // Remove material items (highest index first to avoid shifting issues)
    toRemove.sort((a, b) => b - a);
    for (const idx of toRemove) {
        state.inventory.splice(idx, 1);
    }

    // Upgrade the target item
    it.grade = g + 1;
    it.level = 1;
    it.fusionLocked = true; // Lock from further fusion (can only ascend once like skills)

    const gradeTitle = it.grade >= 6 ? '🔱' : (it.grade >= 3 ? '⭐' : '✨');
    log(`${gradeTitle} Đột phá! ${it.name} thăng lên ${LB_GRADE_NAMES[it.grade]}! (−${goldCost.toLocaleString()} linh thạch, −${materialCost} vật liệu)`);

    // Special messages for legendary grades
    if (it.grade === 6) log(`⚔️ Chí Tôn Pháp — bước vào cảnh giới Chí Tôn!`);
    else if (it.grade === 7) log(`👑 Đế Pháp — ngôi vị Đế không ai bì kịp!`);
    else if (it.grade === 8) log(`🌟 Chuẩn Thánh Pháp — gần như thánh nhân!`);
    else if (it.grade === 9) log(`💫 Thánh Pháp — cảnh giới thánh!`);
    else if (it.grade === 10) log(`🌀 Hỗn Độn Pháp — hỗn loạn thiên địa!`);
    else if (it.grade === 11) log(`🌌 Hồng Mông Pháp — khởi nguyên vũ trụ!`);
    else if (it.grade === 12) log(`🏆 Chung Nguyên Pháp — đỉnh cao tuyệt đối!`);

    if (it.grade >= maxG) log(`🏆 ${it.name} đã đạt cảnh giới tối cao tuyệt đối!`);

    renderAll();
}
if (typeof window !== 'undefined') window.fuseLinhBao = fuseLinhBao;

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