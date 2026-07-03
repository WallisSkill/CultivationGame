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
		activatePassiveSkills();
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

/* ================================================
   SKILL TIER SYSTEM - Realm-based skill drops
   Higher realm = higher chance for higher tier skills
   ================================================ */

// Skill tier pools organized by power level
const SKILL_TIER_POOLS = [
    // Tier 0 (1st tier) - Basic skills
    [
        { skillId: 'dragon_roar', name: '🐉 Long Nha Phá Thiên Quyết', desc: 'Hủy diệt công kích dồn dập 250% ATK, CD 3 round', element: 'fire' },
        { skillId: 'crimson_edge', name: '🔪 Huyết Nguyệt Trảm Pháp', desc: 'Tấn công chí mạng 300% ATK, có hút máu 20%', element: 'fire' },
        { skillId: 'lotus_rebirth', name: '🌸 Liên Tâm Hồi Mệnh Công', desc: 'Hồi phục 40% HP và tăng 15% DEF trong 2 round', element: 'water' },
        { skillId: 'steel_shield', name: '🛡️ Thanh Thiết Hộ Thể', desc: 'Tăng 25% DEF trong 3 round', element: 'earth' },
        { skillId: 'wind_slash', name: '🌪️ Phong Nguyệt Trảm', desc: 'Công kích 200% ATK, +10% tốc độ', element: 'wind' },
    ],
    // Tier 1 (2nd tier) - Intermediate skills
    [
        { skillId: 'thuong_thanh_tram', name: '⚡ Thượng Thanh Trảm Pháp', desc: 'Công kích cực mạnh 550% ATK, CD 2 round, bị động +15% DEF', element: 'thunder' },
        { skillId: 'thong_thien_van_kiem', name: '🌪️ Thông Thiên Vạn Kiếm', desc: 'Xoáy sát 300% ATK + 15% HP địch, CD 3 round, bị động +20% ATK', element: 'wind' },
        { skillId: 'flame_dragon_break', name: '🔥 Hoả Long Quyết', desc: '600% ATK + đốt cháy 3 round, CD 3', element: 'fire' },
        { skillId: 'ice_shield_ward', name: '❄️ Băng Giáp Vệ Thể', desc: 'Tăng 40% DEF và kháng băng 3 round', element: 'water' },
        { skillId: 'lightning_fist', name: '⚡ Lôi Quyền', desc: '550% ATK + choáng 1 round, CD 2', element: 'thunder' },
    ],
    // Tier 2 (3rd tier) - Advanced skills
    [
        { skillId: 'nguyen_thuy_hon_don', name: '🌌 Nguyên Thủy Hỗn Độn Chưởng', desc: '450% ATK + 12% HP địch + 40% lifesteal, CD 4', element: 'hybrid' },
        { skillId: 'void_cloud_step', name: '☁️ Hư Không Vân Bộ', desc: 'Tránh 60% sát thương next hit, tăng 30% tốc độ 2 round', element: 'wind' },
        { skillId: 'blood_moon_slasher', name: '🌙 Huyết Nguyệt Tà Diệt', desc: '800% ATK, hút 50% HP, CD 4', element: 'fire' },
        { skillId: 'mountain_breaker', name: '⛰️ Sơn Hà Tái Tạo', desc: '900% ATK + giảm 30% DEF địch 3 round', element: 'earth' },
        { skillId: 'dragon_god_fist', name: '🐉 Long Thần Quyền', desc: '700% ATK + 20% crit rate permanent, CD 3', element: 'fire' },
    ],
    // Tier 3 (4th tier) - Rare skills
    [
        { skillId: 'celestial_division', name: '✨ Thái Hư Phân Thể', desc: 'Tạo 2 bóng ma, mỗi 400% ATK, CD 5', element: 'thunder' },
        { skillId: 'phoenix_rebirth', name: '🔥 Huyết Ngọc Phượng Hoàng', desc: 'Hồi sinh với 80% HP một lần, CD 8', element: 'fire' },
        { skillId: 'nine_dragon_fist', name: '🐉 Cửu Long Quyết', desc: '900% ATK x 3 lần, mỗi +10% crit, CD 6', element: 'fire' },
        { skillId: 'ice_dragon_bite', name: '❄️ Băng Long Xà Uy', desc: '1200% ATK, đóng băng 2 round, CD 5', element: 'water' },
        { skillId: 'thunder_god_wrath', name: '⚡ Lôi Thần Chi Uy', desc: '1500% ATK + choáng toàn trận, CD 6', element: 'thunder' },
    ],
    // Tier 4 (5th tier) - Epic skills
    [
        { skillId: 'heavenly_strike', name: '👊 Thiên Nhai Kích', desc: '2000% ATK, bỏ qua 50% phòng, CD 7', element: 'thunder' },
        { skillId: 'immortal_body', name: '🛡️ Bất Diệt Thân', desc: 'Miễn nhiễm sát thương 2 round, CD 10', element: 'earth' },
        { skillId: 'soul_severance', name: '💀 Linh Hồn Ly Tán', desc: '2000% ATK + 50% HP địch, triệt tiêu hồi phục 3 round', element: 'fire' },
        { skillId: 'primordial_chaos', name: '🌌 Nguyên Lai Hỗn Độn', desc: '2500% ATK + 30% lifesteal + 20% crit dmg permanent, CD 8', element: 'hybrid' },
    ],
    // Tier 5 (6th tier) - Legendary skills
    [
        { skillId: 'god_slayer_fist', name: '⚔️ Thần Giới Sát Quyền', desc: '3000% ATK, bỏ qua 80% phòng, CD 9', element: 'thunder' },
        { skillId: 'world_breaker', name: '🌍 Thế Giới Trảm Phá', desc: '3500% ATK, phá hủy 30% tất cả chỉ số địch vĩnh viễn', element: 'earth' },
        { skillId: 'eternal_rebirth', name: '♾️ Vĩnh Hằng Tái Sinh', desc: 'Hồi full HP + miễn khống chế 3 round, CD 12', element: 'water' },
    ],
    // Tier 6 (7th tier) - Mythic skills
    [
        { skillId: 'universe_breaker', name: '🌟 Vũ Trụ Phá Diệt', desc: '5000% ATK + 50% HP toàn trận địch, CD 10', element: 'hybrid' },
        { skillId: 'celestial_emperor', name: '👑 Thiên Đế Chân Quyền', desc: '4000% ATK + 100% crit dmg permanent + 50% tốc độ vĩnh viễn, CD 8', element: 'thunder' },
        { skillId: 'primordial_god', name: '🌌 Nguyên Thủy Thần Công', desc: '6000% ATK + hồi 200% ATK dạng HP, CD 12', element: 'hybrid' },
    ],
];

// Get skill tier based on realm (higher realm = higher tier chance)
function getSkillTierFromRealm(realmIndex) {
    const r = Math.random();
    // Tier probabilities scale with realm
    // Base chances at realm 0, shifting toward higher tiers as realm increases
    const t0Base = 0.50, t1Base = 0.25, t2Base = 0.15, t3Base = 0.08, t4Base = 0.02;
    const realmBonus = Math.min(realmIndex, 30); // Cap realm bonus at 30

    // Higher realm shifts chances toward higher tiers
    const t0Chance = Math.max(0.10, t0Base - realmBonus * 0.015);
    const t1Chance = Math.max(0.08, t1Base - realmBonus * 0.005);
    const t2Chance = Math.min(0.30, t2Base + realmBonus * 0.008);
    const t3Chance = Math.min(0.25, t3Base + realmBonus * 0.008);
    const t4Chance = Math.min(0.20, t4Base + realmBonus * 0.006);
    const t5Chance = Math.min(0.10, Math.max(0, (realmIndex - 10) * 0.005));
    const t6Chance = Math.min(0.05, Math.max(0, (realmIndex - 20) * 0.003));

    if (r < t6Chance) return 6;
    if (r < t6Chance + t5Chance) return 5;
    if (r < t6Chance + t5Chance + t4Chance) return 4;
    if (r < t6Chance + t5Chance + t4Chance + t3Chance) return 3;
    if (r < t6Chance + t5Chance + t4Chance + t3Chance + t2Chance) return 2;
    if (r < t6Chance + t5Chance + t4Chance + t3Chance + t2Chance + t1Chance) return 1;
    return 0;
}

// Get random skill for a given tier
function getRandomSkillForTier(tier) {
    const pool = SKILL_TIER_POOLS[tier] || SKILL_TIER_POOLS[0];
    return pool[Math.floor(Math.random() * pool.length)];
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
		const val = Math.floor(250 * (1 + state.realmIndex * 0.3));
		addItemToInventory({
			name: 'Ngọc Linh Đan',
			type: 'xp',
			value: val,
			desc: 'Dùng tăng tu vi'
		});
		log(`✨ Kỳ ngộ nhận được ${val} tu vi!`);
	}
	// 🌟 Trấn Pháp — tăng sức mạnh vĩnh viễn
	else if (r < 0.62) {
		const atk = Math.floor(8 + state.realmIndex * 2.5 + Math.random() * 12);
		addItemToInventory({
			name: 'Trấn Pháp',
			type: 'power',
			value: atk,
			desc: 'Dùng tăng sức mạnh vĩnh viễn'
		});
		log(`⚡ Kỳ ngộ tăng ${atk} sức mạnh!`);
	}
	// 🌟 Đan Sinh Mệnh — tăng tuổi thọ
	else if (r < 0.70) {
		const life = Math.floor(80 + state.realmIndex * 30);
		addItemToInventory({
			name: 'Đan Sinh Mệnh',
			type: 'life',
			value: life,
			desc: 'Dùng tăng tuổi thọ'
		});
		log(`🌿 Kỳ ngộ tăng ${life} tuổi thọ!`);
	}
	// 🌟 Huyền Giáp — tăng phòng thủ vĩnh viễn
	else if (r < 0.78) {
		const def = Math.floor(6 + state.realmIndex * 2.5 + Math.random() * 10);
		addItemToInventory({
			name: 'Huyền Giáp',
			type: 'defense',
			value: def,
			desc: 'Dùng tăng phòng thủ vĩnh viễn'
		});
		log(`🛡️ Kỳ ngộ tăng ${def} phòng thủ!`);
	}
	// 🌟 Skill manual - TIER-BASED with realm scaling
	else if (r < 0.88) {
		const skillTier = getSkillTierFromRealm(state.realmIndex);
		const skill = getRandomSkillForTier(skillTier);
		const tierName = (typeof LB_SKILL_TIER_NAMES !== 'undefined')
			? LB_SKILL_TIER_NAMES[skillTier] || `${skillTier + 1}st`
			: `${skillTier + 1}st`;
		addItemToInventory({
			name: skill.name,
			type: 'manual',
			skillId: skill.skillId,
			skillTier: skillTier,
			tierName: tierName,
			maxFusionTier: null, // No fusion limit for exploration skills - can be fused once
			element: skill.element || null,
			desc: skill.desc
		});
		log(`✨ Kỳ ngộ nhận được bí kíp: ${skill.name} [${tierName}]!`);
	}
	// 💰 Gold
	else {
		const gold = Math.floor(250 + state.realmIndex * 80 + Math.random() * 250);
		state.gold += gold;
		log(`💰 Nhặt được ${gold} Linh Thạch!`);
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
			desc: 'Nhận 5000+ Linh Thạch',
			apply: () => {
				const gold = Math.floor(5000 + state.realmIndex * 500 + Math.random() * 3000);
				state.gold += gold;
				log(`💰 Nhận được ${gold.toLocaleString()} Linh Thạch!`);
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
		{
			type: 'skill',
			name: '📜 Tiên Cung Bí Kíp',
			desc: 'Nhận 1 bí kíp cao cấp',
			apply: () => {
				const skillTier = Math.min(6, getSkillTierFromRealm(state.realmIndex) + 2); // Bonus tier for vault
				const skill = getRandomSkillForTier(skillTier);
				const tierName = (typeof LB_SKILL_TIER_NAMES !== 'undefined')
					? LB_SKILL_TIER_NAMES[skillTier] || `${skillTier + 1}st`
					: `${skillTier + 1}st`;
				addItemToInventory({
					name: skill.name,
					type: 'manual',
					skillId: skill.skillId,
					skillTier: skillTier,
					tierName: tierName,
					maxFusionTier: null,
					element: skill.element || null,
					desc: skill.desc
				});
				log(`📜 Nhận được: ${skill.name} [${tierName}]!`);
			}
		}
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
					const xp = Math.floor(getNeed() * 0.3);
					const gold = Math.floor(500 + state.realmIndex * 100 + Math.random() * 500);
					gainXP(xp);
					state.gold += gold;
					log(`✅ May mắn! Nhận được ${xp} tu vi và ${gold} Linh Thạch!`);
					if (Math.random() < 0.3 && typeof grantLinhBaoDrop === 'function') {
						grantLinhBaoDrop({ source: 'Thử thách', gradeBonus: 1 });
					}
				} else {
					const loseXP = Math.floor(getNeed() * 0.15);
					state.xp = Math.max(0, state.xp - loseXP);
					log(`❌ Thất bại! Mất ${loseXP} tu vi!`);
				}
			}
		},
		{
			name: '🛡️ Chơi an toàn',
			desc: 'Nhận phần thưởng nhỏ nhưng chắc chắn',
			apply: () => {
				const xp = Math.floor(getNeed() * 0.1);
				gainXP(xp);
				const gold = Math.floor(150 + state.realmIndex * 40);
				state.gold += gold;
				log(`✅ Nhận được ${xp} tu vi và ${gold} Linh Thạch (an toàn)!`);
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
				const p = Math.floor(15 + state.realmIndex * 3);
				state.power += p;
				log(`⚡ ${blessing.name} — Sức mạnh +${p}!`);
			}
		},
		{
			name: '🛡️ Địa phúc tăng thủ',
			apply: () => {
				const d = Math.floor(12 + state.realmIndex * 2.5);
				state.defense += d;
				log(`🛡️ ${blessing.name} — Phòng thủ +${d}!`);
			}
		},
		{
			name: '💚 Thọ phúc tăng thọ',
			apply: () => {
				const l = Math.floor(100 + state.realmIndex * 40);
				state.maxAge += l;
				log(`💚 ${blessing.name} — Tuổi thọ +${l}!`);
			}
		},
		{
			name: '🍀 Vận phúc tăng may',
			apply: () => {
				state.luckBonus = (state.luckBonus || 0) + 0.08;
				log(`🍀 ${blessing.name} — May mắn +8%!`);
			}
		},
		{
			name: '⚔️ Khí phúc tăng công',
			apply: () => {
				const atk = Math.floor(10 + state.realmIndex * 2);
				addItemToInventory({ name: 'Trấn Pháp', type: 'power', value: atk, desc: 'Tăng sức mạnh' });
				log(`⚔️ ${blessing.name} — Nhận Trấn Pháp +${atk}!`);
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
	const isWeapon = Math.random() < 0.5;
	const realmTier = Math.floor(state.realmIndex / 4);

	if (isWeapon) {
		const atkBase = 15 + realmTier * 8 + Math.floor(Math.random() * 12);
		addItemToInventory({
			name: `Tiên Kiếm Cấp ${realmTier + 1}`,
			type: 'weapon',
			atk: atkBase,
			desc: `ATK +${atkBase}`
		});
		log(`⚔️ Kỳ ngộ nhận được Tiên Kiếm (+${atkBase} ATK)!`);
	} else {
		const defBase = 10 + realmTier * 6 + Math.floor(Math.random() * 10);
		const hpBase = 30 + realmTier * 20 + Math.floor(Math.random() * 25);
		addItemToInventory({
			name: `Tiên Giáp Cấp ${realmTier + 1}`,
			type: 'armor',
			def: defBase,
			hp: hpBase,
			desc: `DEF +${defBase}, HP +${hpBase}`
		});
		log(`🛡️ Kỳ ngộ nhận được Tiên Giáp (+${defBase} DEF, +${hpBase} HP)!`);
	}
	renderInventory();
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
			window._battleActive = true;
			state.currentEnemy = npcEnemy;
			activatePassiveSkills();
			
		
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