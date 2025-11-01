/* ===========================
    EXPLORATION / MYSTERIES / NPC
    - cooldown anti-spam, block if in combat
=========================== */

function canExplore() {
    return !state.exploreCooldown && !state.currentEnemy;
}

// Original implementation renamed
function exploreOriginalImpl() {
    if (state.currentEnemy) {
        log('Không thể gặp kỳ ngộ khi đang chiến đấu.');
        return;
    }
    if (state.exploreCooldown) {
        log('Phải chờ trước khi gặp kỳ ngộ tiếp.');
        return;
    }

    state.exploreCooldown = true;
    setTimeout(() => state.exploreCooldown = false, 500);

    const luck = state.luckBonus || 0;
    const mysteryChance = Math.min(0.45, 0.1 + luck);

    const saintChance = Math.min(0.4, 0.02 + luck * 0.6 + state.realmIndex * 0.004);
    if (Math.random() < saintChance && typeof window.encounterRandomSaint === 'function') {
        log('🌠 Thiên tượng dị thường — một vị Thánh Nhân hạ phàm giữa kỳ ngộ!');
        window.encounterRandomSaint('explore');
        renderAll();
        return;
    }

    const roll = Math.random();

    if (roll < mysteryChance) {
        const goodChance = Math.min(0.40, 0.20 + luck * 0.25);

        const filteredMysteries = MYSTERIES.filter(m => {
            if (m.type === 'good') {
                return Math.random() < goodChance;
            } else if (m.type === 'bad') {
                const badChance = Math.max(0.15, 0.6 - luck * 0.4);
                return Math.random() < badChance;
            } else {
                return true;
            }
        });

        const m = filteredMysteries[Math.floor(Math.random() * filteredMysteries.length)];
        if (!m) {
            log(`✨ Không có kỳ ngộ nào xuất hiện... (Thiên Cơ tạm đóng)`);
            return;
        }

        log(`✨ Gặp kỳ ngộ: ${m.name} — ${m.desc}`);

        if (m.type === 'good') mysteryGood();
        else if (m.type === 'bad') mysteryBad();
        else if (m.type === 'npc') mysteryNpc(m);
    }
    else {
        window._battleActive = true;
        spawnEnemyWithRules();
    }
}

// Wire a single guarded explore that enforces battle lock
window.exploreOriginalImpl = exploreOriginalImpl;
window.explore = function () {
    if (window._battleActive || (typeof isBattleLocked === 'function' && isBattleLocked())) {
        log('🔒 Đang chiến đấu — không thể đi kỳ ngộ.');
        return;
    }
    return window.exploreOriginalImpl();
}

function mysteryGood() {
    const r = Math.random();
    if (r < 0.25) {
        //Ngọc Linh Đan — tăng tu vi
        const val = Math.floor(200 * (1 + state.realmIndex * 0.25));
        addItemToInventory({
            name: 'Ngọc Linh Đan',
            type: 'xp',
            value: val,
            desc: 'Dùng tăng tu vi'
        });
    }
    else if (r < 0.5) {
        //Trấn Pháp — tăng sức mạnh vĩnh viễn
        const atk = Math.floor(6 + state.realmIndex * 2 + Math.random() * 10);
        addItemToInventory({
            name: 'Trấn Pháp',
            type: 'power',
            value: atk,
            desc: 'Dùng tăng sức mạnh vĩnh viễn'
        });
    }
    else if (r < 0.75) {
        //Đan Sinh Mệnh — tăng tuổi thọ
        const life = Math.floor(60 + state.realmIndex * 25);
        addItemToInventory({
            name: 'Đan Sinh Mệnh',
            type: 'life',
            value: life,
            desc: 'Dùng tăng tuổi thọ'
        });
    }
    else {
        //Huyền Giáp — tăng phòng thủ vĩnh viễn
        const def = Math.floor(5 + state.realmIndex * 2 + Math.random() * 8);
        addItemToInventory({
            name: 'Huyền Giáp',
            type: 'defense',
            value: def,
            desc: 'Dùng tăng phòng thủ vĩnh viễn'
        });
    }

    // small chance Hỗn Nguyên top
    if (Math.random() < 0.02) {
        const elems = randomHybridElements(state.realmIndex, true);
        const rank = Math.min(6, 3 + Math.floor(state.realmIndex / 5));
        addItemToInventory({ name: `Hỗn Nguyên ${elems.join('+')} ${ROOT_RANKS[rank]}`, type: 'root', elements: elems, rank, desc: 'Hỗn nguyên linh căn hiếm' });
        log('Kỳ ngộ hiếm: tìm thấy Linh Căn Hỗn Nguyên!');
    }
    renderAll();
}

function mysteryBad() {
    const r = Math.random();
    if (r < 0.5) {
        const loseAge = Math.floor(5 + Math.random() * 12 + state.realmIndex * 1.5);
        state.maxAge = Math.max(1, state.maxAge - loseAge);
        log(`Kỳ ngộ xấu: mất ${loseAge} tuổi thọ!`);
    } else if (r < 0.85) {
        const loseXP = Math.floor(getNeed() * 0.12);
        state.xp = Math.max(0, state.xp - loseXP);
        log(`Kỳ ngộ xấu: mất ${loseXP} tu vi!`);
    } else {
        const loseHp = Math.floor(50 + state.realmIndex * 20);
        state.hp = Math.max(1, state.hp - loseHp);
        log(`Kỳ ngộ xấu: bị thương, mất ${loseHp} HP!`);
    }
    renderAll();
}

async function mysteryNpc(m) {
	if (state.npcInteractionLock) {
		log('Đang tương tác NPC. Hoàn tất rồi mới gặp NPC khác.');
		return;
	}
	state.npcInteractionLock = true;
	try {
		let choice = null;
		if (typeof showDialog === 'function') {
			choice = await showDialog({
				message: `${m.name} xuất hiện. Đại nhân lựa chọn con đường nào?`,
				buttons: [
					{ text: 'Xin chỉ điểm', value: 1, variant: 'primary' },
					{ text: 'Giao dịch', value: 2 },
					{ text: 'Thách đấu', value: 3 },
					{ text: 'Từ chối', value: 4 }
				]
			});
		}
		if (!choice) {
			const pick = prompt(
				`${m.name} xuất hiện. Chọn 1-4:\n` +
				`1) Xin chỉ điểm\n2) Giao dịch\n3) Thách đấu\n4) Từ chối`
			);
			choice = parseInt(pick, 10) || 4;
		}

		if (choice === 1) {
			if (Math.random() < 0.7) {
				const xp = Math.floor(120 + state.realmIndex * 60);
				gainXP(xp);
				log('NPC chỉ điểm: tu vi tăng!');
			} else {
				const p = Math.floor(8 + state.realmIndex * 3);
				state.power += p;
				log('NPC truyền công, sức mạnh tăng!');
			}
		} else if (choice === 2) {
			const cost = Math.floor(80 + state.realmIndex * 30);
			if (state.gold >= cost) {
				state.gold -= cost;
				addItemToInventory({
					name: 'Bảo Vật Giao Dịch',
					type: 'power',
					value: Math.floor(10 + state.realmIndex * 5),
					desc: 'Tăng sức mạnh'
				});
				log('Giao dịch thành công với NPC.');
			} else {
				log('Không đủ vàng để giao dịch.');
			}
		} else if (choice === 3) {
			// 🌠 Danh sách các loại NPC khác nhau
			const npcTemplates = [
				{
					name: 'Kiếm Tu Hỏa Vân',
					elements: ['Hỏa'],
					rootRank: 3, // Thượng Phẩm
					style: 'tấn công mạnh, phòng yếu',
					strMul: 1.4, hpMul: 0.8, defMul: 0.7
				},
				{
					name: 'Thổ Giáp Hộ Pháp',
					elements: ['Thổ'],
					rootRank: 3,
					style: 'phòng thủ cao',
					strMul: 0.9, hpMul: 1.3, defMul: 1.6
				},
				{
					name: 'Song Linh Nữ Tiên',
					elements: ['Thủy', 'Mộc'],
					rootRank: 3, // Thiên Phẩm
					style: 'linh hoạt, công thủ hài hòa',
					strMul: 1.2, hpMul: 1.1, defMul: 1.0
				},
				{
					name: 'Mộc Ảnh Đạo Nhân',
					elements: ['Mộc'],
					rootRank: 2,
					style: 'đánh độc, khó chịu',
					strMul: 1.0, hpMul: 1.0, defMul: 0.9
				},
				{
					name: 'Hỏa Thần Chi Linh',
					elements: ['Hỏa', 'Thổ'],
					rootRank: 3,
					style: 'Phẩm chất cực cao, công siêu khủng',
					strMul: 1.6, hpMul: 1.0, defMul: 0.8
				},
			];

			// 🎲 Random chọn 1 NPC để thách đấu
			const chosenTemplate = npcTemplates[Math.floor(Math.random() * npcTemplates.length)];

			// ⚖️ Cảnh giới NPC có thể thấp hơn hoặc cao hơn 1 bậc người chơi
			const realmOffset = Math.floor(Math.random() * 3) - 1; // -1, 0 hoặc +1
			const npcRealmIndex = Math.max(0, Math.min(REALMS.length - 1, state.realmIndex + realmOffset));

			// 🔮 Hệ số sức mạnh dựa theo người chơi
			const playerFactor = Math.max(1.0, (state.totalPower + state.totalDef) / 900);
			const realmGap = npcRealmIndex - state.realmIndex;

			const realmFactor = 1 + realmGap * 0.25;

			const randomVar = 0.85 + Math.random() * 0.25;

			const powerScale = 0.8;   // sức mạnh gốc giảm còn 80%
			const hpScale = 0.85;     // máu gốc giảm còn 85%
			const defScale = 0.8;     // phòng thủ gốc giảm còn 80%

			const npcEnemy = {
				name: chosenTemplate.name,
				realmIndex: npcRealmIndex,
				tier: "Bình thường",
				realmStage: Math.floor(Math.random() * 4),

				str: Math.floor(state.totalPower * chosenTemplate.strMul * realmFactor * randomVar * powerScale),

				hp: Math.floor(state.totalMaxHp * chosenTemplate.hpMul * realmFactor * randomVar * hpScale),
				maxHp: Math.floor(state.totalMaxHp * chosenTemplate.hpMul * realmFactor * randomVar * hpScale),

				def: Math.floor(state.totalDef * chosenTemplate.defMul * realmFactor * randomVar * defScale),

				xp: Math.floor(80 * (1 + npcRealmIndex * 0.3) * chosenTemplate.rootRank),
				gold: Math.floor(40 * (1 + npcRealmIndex * 0.25) * chosenTemplate.rootRank),

				elements: chosenTemplate.elements,
				rootRank: chosenTemplate.rootRank,
				baseTemplate: ENEMY_TEMPLATES[0],
				style: chosenTemplate.style
			};


			state.currentEnemy = npcEnemy;

			// ✨ Hiển thị thông tin ra log
			log(`🌌 ${npcEnemy.name} (${REALMS[npcEnemy.realmIndex]}) xuất hiện!`);
			log(`💠 Linh căn: ${npcEnemy.elements.join('+')} — ${ROOT_RANKS[npcEnemy.rootRank]} (${npcEnemy.style})`);
			log(`⚔️ HP: ${npcEnemy.hp}, ATK: ${npcEnemy.str}, DEF: ${npcEnemy.def}`);
		}

		else {
			log('NPC thất vọng, bỏ đi.');
		}
	} finally {
		setTimeout(() => (state.npcInteractionLock = false), 2400);
		renderAll();
	}
}

/* expose functions for inline buttons */
window.spawnSpecific = spawnSpecific;
window.buyItem = buyItem;
window.addItemToInventory = addItemToInventory;