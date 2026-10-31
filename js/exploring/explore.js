/* ===========================
	EXPLORATION / MYSTERIES / NPC
	- cooldown anti-spam, block if in combat
=========================== */

function exploreOriginalImpl() {
	if (state.currentEnemy) {
		log('Không thể gặp kỳ ngộ khi đang chiến đấu.');
		return;
	}

	const luck = state.luckBonus || 0;
	const roll = Math.random();

	if (roll < Math.min(0.75, 0.55 + luck)) {
		const goodChance = Math.min(0.75, 0.55 + luck * 0.25);
		const pick = Math.random();
		if (pick < goodChance) {
			log('✨ Thám hiểm gặp cơ duyên!');
			mysteryGood();
		} else if (pick < goodChance + 0.15) {
			log('☠️ Thám hiểm gặp hiểm cảnh!');
			mysteryBad();
		} else {
			mysteryNpc({ name: 'Lão Sư Ẩn' });
		}
		return;
	}
	spawnEnemyWithRules();
}

window.exploreOriginalImpl = exploreOriginalImpl;

function permanentStatRoll(stat) {
	const base = baseStatsFor(state.realmIndex, state.realmStage, state.root?.rank || 0);
	return Math.ceil(base[stat] * (0.005 + Math.random() * 0.01));
}

function mysteryGood() {
	const r = Math.random();

	// 🌟 Special treasure vault event (rare)
	if (r < 0.03) {
		mysteryTreasureVault();
		return;
	}
	// 🌟 Dilemma event
	if (r < 0.08) {
		mysteryDilemma();
		return;
	}
	// 🌟 Blessing event
	if (r < 0.14) {
		mysteryBlessing();
		return;
	}
	// 🌟 Weapon/Armor drop
	if (r < 0.22) {
		mysteryEquipment();
		return;
	}
	// 🌟 Linh Bao drop (increased chance)
	if (r < 0.35 && typeof grantLinhBaoDrop === 'function') {
		const gradeBonus = Math.random() < 0.25 ? 1 : 0;
		grantLinhBaoDrop({ source: 'Kỳ ngộ', gradeBonus });
		renderInventory();
		return;
	}
	// 🌟 Gem drop
	if (r < 0.42 && typeof grantGemDrop === 'function') {
		grantGemDrop({ source: 'Kỳ ngộ', tierBonus: Math.random() < 0.3 ? 1 : 0 });
		renderInventory();
		return;
	}
	// 🌟 Ngọc Linh Đan — tăng tu vi
	if (r < 0.52) {
		addItemToInventory({ name: 'Ngọc Linh Đan', type: 'xp', hours: 0.5, desc: 'Bằng 30 phút bế quan' });
	}
	// 🌟 Trấn Pháp — tăng sức mạnh vĩnh viễn
	else if (r < 0.62) {
		addItemToInventory({ name: 'Trấn Pháp', type: 'power', value: permanentStatRoll('power'), desc: 'Dùng tăng sức mạnh vĩnh viễn' });
	}
	// 🌟 Đan Sinh Mệnh — tăng tuổi thọ
	else if (r < 0.70) {
		addItemToInventory({ name: 'Đan Sinh Mệnh', type: 'life', value: 30 + state.realmIndex * 20, desc: 'Dùng tăng tuổi thọ' });
	}
	// 🌟 Huyền Giáp — tăng phòng thủ vĩnh viễn
	else if (r < 0.78) {
		addItemToInventory({ name: 'Huyền Giáp', type: 'defense', value: permanentStatRoll('defense'), desc: 'Dùng tăng phòng thủ vĩnh viễn' });
	}
	// 💰 Gold
	else {
		const gold = goldRef(state.realmIndex) * (3 + Math.floor(Math.random() * 4));
		state.gold += gold;
		log(`💰 Nhặt được ${formatNumber(gold)} Linh Thạch!`);
	}

	// small chance Hỗn Nguyên top
	if (Math.random() < 0.025) {
		const elems = randomHybridElements(state.realmIndex, true);
		const rank = Math.min(6, 3 + Math.floor(state.realmIndex / 5));
		addItemToInventory({
			name: `Hỗn Nguyên ${elems.join('+')} ${ROOT_RANKS[rank]}`,
			type: 'root',
			elements: elems,
			rank,
			desc: 'Hỗn nguyên linh căn hiếm'
		});
		log('✨ Kỳ ngộ cực hiếm: tìm thấy Linh Căn Hỗn Nguyên!');
	}

	renderInventory();
}

// 🌟 Treasure Vault - choose one of three treasures
function mysteryTreasureVault() {
	log('🏰 Kỳ ngộ hiếm: Tìm thấy Tiên Cung Bảo Khố!');

	const choices = [
		{
			type: 'gold',
			name: '💎 Tiên Cung Bảo Tàng',
			desc: 'Nhận một kho linh thạch',
			apply: () => {
				const gold = goldRef(state.realmIndex) * 30;
				state.gold += gold;
				log(`💰 Nhận được ${formatNumber(gold)} Linh Thạch!`);
			}
		},
		{
			type: 'linhbao',
			name: '🎴 Tiên Cung Trận Pháp',
			desc: 'Nhận 1 Trận Pháp Bảo giai cao',
			apply: () => {
				if (typeof grantLinhBaoDrop === 'function') {
					grantLinhBaoDrop({ source: 'Tiên Cung', gradeBonus: 2 });
				}
			}
		},
		];

	if (typeof showDialog === 'function') {
		showDialog({
			message: '🏰 Tiên Cung Bảo Khố xuất hiện! Chọn một bảo vật:',
			buttons: choices.map((c, i) => ({ text: c.name + ' - ' + c.desc, value: i, variant: i === 0 ? 'primary' : 'default' }))
		}).then(choice => {
			if (choice !== null && choice !== undefined && choices[choice]) {
				choices[choice].apply();
				renderAll();
			}
		});
	} else {
		const pick = parseInt(prompt('🏰 Tiên Cung Bảo Khố!\n0) 💎 Tiên Cung Bảo Tàng\n1) 🎴 Tiên Cung Trận Pháp\n2) 📜 Tiên Cung Bí Kíp\n\nChọn (0-2):') || '0', 10);
		if (choices[pick]) {
			choices[pick].apply();
			renderAll();
		}
	}
}

// 🌟 Dilemma - make a choice with risk/reward
function mysteryDilemma() {
	log('⚖️ Kỳ ngộ hiếm: Thử thách ý chí!');

	const choices = [
		{
			name: '🔥 Chấp nhận rủi ro',
			desc: 'Có cơ hội nhận gấp 3 phần thưởng, nhưng cũng có thể mất nhiều hơn',
			apply: () => {
				if (Math.random() < 0.6) {
					const gold = goldRef(state.realmIndex) * 8;
					const xp = gainCultivationHours(3);
					state.gold += gold;
					log(`✅ May mắn! Nhận được ${formatNumber(xp)} tu vi và ${formatNumber(gold)} Linh Thạch!`);
					if (Math.random() < 0.3 && typeof grantLinhBaoDrop === 'function') {
						grantLinhBaoDrop({ source: 'Thử thách', gradeBonus: 1 });
					}
				} else {
					const loseXP = Math.floor(cultivationRate(state.realmIndex, state.root) * 2 * 3600);
					state.xp = Math.max(0, state.xp - loseXP);
					log(`❌ Thất bại! Mất ${formatNumber(loseXP)} tu vi!`);
				}
			}
		},
		{
			name: '🛡️ Chơi an toàn',
			desc: 'Nhận phần thưởng nhỏ nhưng chắc chắn',
			apply: () => {
				const xp = gainCultivationHours(1);
				const gold = goldRef(state.realmIndex) * 2;
				state.gold += gold;
				log(`✅ Nhận được ${formatNumber(xp)} tu vi và ${formatNumber(gold)} Linh Thạch (an toàn)!`);
			}
		}
	];

	if (typeof showDialog === 'function') {
		showDialog({
			message: '⚖️ Thần linh thử thách ý chí của ngươi!',
			buttons: [
				{ text: choices[0].name, value: 0, variant: 'danger' },
				{ text: choices[1].name, value: 1, variant: 'primary' }
			]
		}).then(choice => {
			if (choice !== null && choice !== undefined) {
				choices[choice].apply();
				renderAll();
			}
		});
	} else {
		const pick = parseInt(prompt('⚖️ Thần linh thử thách!\n0) 🔥 Chấp nhận rủi ro\n1) 🛡️ Chơi an toàn\n\nChọn:') || '1', 10);
		if (choices[pick] !== undefined) {
			choices[pick].apply();
			renderAll();
		}
	}
}

// 🌟 Blessing - random blessing from heavens
function mysteryBlessing() {
	const blessings = [
		{
			name: '🌟 Thiên phúc tăng sức',
			apply: () => {
				const p = permanentStatRoll('power');
				state.power += p;
				log(`⚡ ${blessing.name} — Sức mạnh +${formatNumber(p)}!`);
			}
		},
		{
			name: '🛡️ Địa phúc tăng thủ',
			apply: () => {
				const d = permanentStatRoll('defense');
				state.defense += d;
				log(`🛡️ ${blessing.name} — Phòng thủ +${formatNumber(d)}!`);
			}
		},
		{
			name: '💚 Thọ phúc tăng thọ',
			apply: () => {
				const l = 30 + state.realmIndex * 20;
				state.maxAge += l;
				log(`💚 ${blessing.name} — Tuổi thọ +${l}!`);
			}
		},
		{
			name: '🍀 Vận phúc tăng may',
			apply: () => {
				state.luckBonus = (state.luckBonus || 0) + 0.01;
				log(`🍀 ${blessing.name} — May mắn +1%!`);
			}
		},
		{
			name: '⚔️ Khí phúc tăng công',
			apply: () => {
				addItemToInventory({ name: 'Trấn Pháp', type: 'power', value: permanentStatRoll('power'), desc: 'Tăng sức mạnh' });
			}
		},
		{
			name: '🎴 Linh phúc tăng bảo',
			apply: () => {
				if (typeof grantLinhBaoDrop === 'function') {
					grantLinhBaoDrop({ source: 'Linh phúc', gradeBonus: 1 });
				}
				log(`🎴 ${blessing.name} — Nhận được Trận Pháp Bảo!`);
			}
		}
	];

	const blessing = blessings[Math.floor(Math.random() * blessings.length)];
	blessing.apply();

	// Extra chance for double blessing
	if (Math.random() < 0.25) {
		const blessing2 = blessings[Math.floor(Math.random() * blessings.length)];
		blessing2.apply();
		log('🌟 Kỳ ngộ kép — Nhận thêm 1 phước lành!');
	}

	renderAll();
}

// 🌟 Equipment drop (weapon or armor)
function mysteryEquipment() {
	const slot = GEAR_SLOT_IDS[Math.floor(Math.random() * GEAR_SLOT_IDS.length)];
	const gear = makeGearItem(state.realmIndex, slot, Math.random() < 0.2 ? 2 : 1);
	addItemToInventory(gear);
	log(`⚔️ Kỳ ngộ nhận được ${gear.name}!`);
	renderInventory();
}

function mysteryBad() {
	const r = Math.random();
	if (r < 0.5) {
		const loseAge = Math.floor(5 + Math.random() * 12 + state.realmIndex * 1.5);
		state.maxAge = Math.max(1, state.maxAge - loseAge);
		log(`Kỳ ngộ xấu: mất ${loseAge} tuổi thọ!`);
	} else if (r < 0.85) {
		const loseXP = Math.floor(cultivationRate(state.realmIndex, state.root) * 1 * 3600);
		state.xp = Math.max(0, state.xp - loseXP);
		log(`Kỳ ngộ xấu: mất ${formatNumber(loseXP)} tu vi!`);
	} else {
		const loseHp = Math.floor((state.totalMaxHp || state.maxHp) * 0.3);
		state.hp = Math.max(1, state.hp - loseHp);
		log(`Kỳ ngộ xấu: bị thương, mất ${formatNumber(loseHp)} HP!`);
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
				gainCultivationHours(0.5);
				log('NPC chỉ điểm: tu vi tăng!');
			} else {
				state.power += permanentStatRoll('power');
				log('NPC truyền công, sức mạnh tăng!');
			}
		} else if (choice === 2) {
			const cost = goldRef(state.realmIndex) * 10;
			if (state.gold >= cost) {
				state.gold -= cost;
				addItemToInventory({
					name: 'Bảo Vật Giao Dịch',
					type: 'power',
					value: permanentStatRoll('power') * 2,
					desc: 'Tăng sức mạnh'
				});
				log('Giao dịch thành công với NPC.');
			} else {
				log('Không đủ linh thạch để giao dịch.');
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

			const npcEnemy = buildEnemy({
				name: chosenTemplate.name,
				realmIndex: npcRealmIndex,
				realmStage: Math.floor(Math.random() * 4),
				tier: 'Tinh anh',
				elements: chosenTemplate.elements
			});
			npcEnemy.str = Math.floor(npcEnemy.str * chosenTemplate.strMul);
			npcEnemy.def = Math.floor(npcEnemy.def * chosenTemplate.defMul);
			npcEnemy.hp = npcEnemy.maxHp = Math.floor(npcEnemy.maxHp * chosenTemplate.hpMul);
			npcEnemy.style = chosenTemplate.style;
			window._battleActive = true;
			state.currentEnemy = npcEnemy;


			// ✨ Hiển thị thông tin ra log
			log(`🌌 ${npcEnemy.name} (${REALMS[npcEnemy.realmIndex]}) xuất hiện!`);
			log(`💠 Linh căn: ${npcEnemy.elements.join('+')} — ${ROOT_RANKS[npcEnemy.rootRank]} (${npcEnemy.style})`);
			log(`⚔️ HP: ${formatNumber(npcEnemy.hp)}, ATK: ${formatNumber(npcEnemy.str)}, DEF: ${formatNumber(npcEnemy.def)}`);
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