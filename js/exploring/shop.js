/* ===========================
    INVENTORY / ITEMS / EQUIP
=========================== */
/* --- Shop items (base) --- */
const SHOP_ITEMS = [
    { id: 'swd_iron', name: 'Kiếm Sắt', type: 'weapon', atk: 12, hp: 0, def: 0, cost: 80 },
    { id: 'swd_storm', name: 'Kiếm Lôi Đình', type: 'weapon', atk: 210, hp: 40, def: 0, cost: 1800 },
    { id: 'blade_void', name: 'Đoản Đao Hư Không', type: 'weapon', atk: 320, hp: 0, def: 35, cost: 3400 },
    { id: 'arm_basic', name: 'Giáp Cơ Bản', type: 'armor', atk: 0, hp: 70, def: 12, cost: 120 },
    { id: 'arm_dragon', name: 'Long Lân Khải', type: 'armor', atk: 0, hp: 520, def: 78, cost: 2200 },
    { id: 'robe_stellar', name: 'Tinh Hà Đạo Bào', type: 'armor', atk: 45, hp: 420, def: 55, cost: 3600 },
    { id: 'elixir_small', name: 'Đan Hồi Phục Tiểu', type: 'consumable', heal: 120, cost: 60 },
    { id: 'elixir_royal', name: 'Đan Long Huyết', type: 'consumable', heal: 680, cost: 420 },
    { id: 'jade_cult', name: 'Ngọc Bội Tụ Linh', type: 'xp', value: 900, cost: 260 },
    { id: 'jade_sun', name: 'Thái Dương Kim Ngọc', type: 'xp', value: 2800, cost: 980 },
    { id: 'pill_power', name: 'Lực Cốt Đan', type: 'power', value: 45, cost: 320 },
    { id: 'pill_barrier', name: 'Huyền Giáp Đan', type: 'defense', value: 55, cost: 340 },
    { id: 'nectar_life', name: 'Tiên Tủy Sinh Mệnh', type: 'life', value: 220, cost: 560 },
    { id: 'scroll_fortune', name: 'Trục Thư Tăng Vận', type: 'luck', value: 0.06, cost: 720, desc: 'Tăng khí vận lâu dài' },
    { id: 'manual_iron_body', name: 'Công Pháp Huyền Thiết', type: 'manual', skillId: 'iron_body', cost: 540, desc: 'Học kỹ năng tăng phòng thủ' },
    { id: 'manual_dragon', name: 'Chân Giải Long Nha Trảm', type: 'manual', skillId: 'dragon_roar', cost: 820, desc: 'Học tuyệt kỹ bộc phát sát thương' },
    { id: 'manual_wind', name: 'Ảnh Phong Thân Pháp', type: 'manual', skillId: 'wind_step', cost: 680, desc: 'Học thân pháp gia tăng né tránh' },
    { id: 'manual_crimson', name: 'Chiếu Nguyệt Đồ Quyết', type: 'manual', skillId: 'crimson_edge', cost: 940, desc: 'Học kỹ năng tăng chí mạng' },
    { id: 'manual_lotus', name: 'Liên Tâm Dưỡng Sinh Kinh', type: 'manual', skillId: 'lotus_rebirth', cost: 760, desc: 'Học công pháp hồi phục khí huyết' },
    
    // 🔥 THÊM SKILL CHỦ ĐỘNG
    { id: 'manual_thuong_thanh', name: '⚡ Thượng Thanh Trảm Quyết', type: 'manual', skillId: 'thuong_thanh_tram', cost: 1200, desc: 'Học chiêu thức sát thương 300% ATK (CD 2)' },
    { id: 'manual_thien_ma', name: '🌪️ Thiên Ma Chuyển Pháp', type: 'manual', skillId: 'thien_ma_chuyen', cost: 1500, desc: 'Học chiêu xoáy 200% ATK + 15% HP địch (CD 3)' },
    { id: 'manual_huyet_kiem', name: '🩸 Cửu Thiên Huyết Kiếm Phổ', type: 'manual', skillId: 'cuu_thien_huyet_kiem', cost: 1800, desc: 'Học chiêu hút máu 250% ATK + 30% lifesteal (CD 3)' }
];

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
    SHOP_ITEMS.forEach(si => {
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
}

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