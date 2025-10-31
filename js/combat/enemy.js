/* ===========================
    ENEMY SPAWN + EQUIPMENT ENHANCED
=========================== */
/* --- Enemy templates --- */
const ENEMY_TEMPLATES = [
    {
        // 🐉 Cấp thấp – luyện công, thử linh căn
        name: 'Yêu Tinh',
        baseStr: 27,
        baseHp: 40.0,
        baseXp: 15,
        baseDef: 17,
        gold: 10,
        elements: ['Mộc'],
        rootRank: 1,
        tier: 1,
        loot: [{ name: 'Linh Thạch Thô', type: 'xp', value: 1200 }]
    },

    {
        // 🐍 Trung cấp – Kim Đan, Nguyên Anh
        name: 'Hồ Long',
        baseStr: 75,        // hơn gấp ~2.5 Yêu Tinh
        baseHp: 150,
        baseXp: 77,
        baseDef: 55,
        gold: 57,
        elements: ['Thủy'],
        rootRank: 2,
        tier: 2,
        loot: [{ name: 'Mảnh Linh Hồn', type: 'xp', value: 8000 }]
    },

    {
        // 🪨 Cao cấp – Hóa Thần, Luyện Hư
        name: 'Cự Ma',
        baseStr: 150,
        baseHp: 222,
        baseXp: 100,
        baseDef: 142,
        gold: 120,
        elements: ['Hỏa'],
        rootRank: 3,
        tier: 4,
        loot: [{ name: 'Linh Thạch Cao', type: 'xp', value: 40000 }]
    },

    {
        // 👑 Đỉnh cao phàm giới – Độ Kiếp, Đại Thừa
        name: 'Thiên Ma',
        baseStr: 15,
        baseHp: 50,
        baseXp: 200,
        baseDef: 10,
        gold: 150,
        elements: ['Hỏa', 'Thủy', 'Kim'],
        rootRank: 5,
        tier: 8,
        loot: [{ name: 'Tinh Nguyên', type: 'xp', value: 150000 }]
    }
];


function spawnEnemyWithRules() {
    let diff = 0;
    const r = Math.random();

    if (r < 0.6) diff = -1;
    else if (r < 0.9) diff = 0;
    else {
        const hr = Math.random();
        if (hr < 0.8) diff = 1;
        else if (hr < 0.95) diff = 2;
        else diff = 3;
    }

    if (state.realmIndex < 5 && diff > 1) diff = 1;
    if (state.realmIndex < 3 && diff > 0) diff = 0;

    let targetRealm = Math.min(Math.max(0, state.realmIndex + diff), REALMS.length - 1);
    const template = pickTemplateByRealm(targetRealm);
    const realmStage = randomRealmStage();

    // Xác định tier/mult trước khi scale
    let tier = 'Thường', mult = 1.2;
    const tierRoll = Math.random();
    if (tierRoll < 0.03) { tier = 'Thống lĩnh'; mult = 4; }
    else if (tierRoll < 0.15) { tier = 'Tinh anh'; mult = 2; }
    else { tier = 'Thường'; mult = 1.2; }

    const enemy = scaleEnemy(template, targetRealm, mult, realmStage);
    enemy.tier = tier;

    enemy.elements = randomHybridElements(targetRealm, false);
    enemy.rootRank = getRootRankForRealm(targetRealm);

    if (tier !== 'Thường') {
        enemy.weaponBonus = Math.floor(20 + Math.random() * 40);
        enemy.armorBonus = Math.floor(15 + Math.random() * 35);
        enemy.str = Math.floor(enemy.str * (1 + (enemy.weaponBonus || 0) / 100));
        enemy.def = Math.floor(enemy.def * (1 + (enemy.armorBonus || 0) / 100));
        enemy.hp = Math.floor(enemy.hp * (1 + (enemy.armorBonus || 0) / 100));
        enemy.maxHp = enemy.hp;
    }

    // 🧠 Cập nhật vào state
    state.currentEnemy = enemy;
    log(`⚔️ Gặp ${enemy.name} (${tier}) — ${REALMS[targetRealm]} (${STAGES[realmStage]})
                    🌿 Linh căn: ${enemy.elements?.map(colorizeElement).join(' ') || 'Vô căn'} (${ROOT_RANKS[enemy.rootRank || 0]})
                    ${enemy.weaponBonus || enemy.armorBonus ?
            `⚔️ [Vuốt Ma +${enemy.weaponBonus || 0}% ATK] / 🛡 [Giáp Cốt +${enemy.armorBonus || 0}% DEF]`
            : ''}`);

    renderAll();
}

function randomRealmStage() {
    const r = Math.random();
    if (r < 0.45) return 0;  // Sơ Kỳ
    if (r < 0.75) return 1;  // Trung Kỳ
    if (r < 0.95) return 2;  // Hậu Kỳ
    return 3;                // Đại Viên Mãn
}

function getRootRankForRealm(realmIndex) {
    // 🎚️ Trọng số cơ bản (Phế → Hỗn Độn)
    const baseWeights = [40, 25, 15, 10, 6, 3, 1, 0.5, 0.3, 0.1];

    const adjustedWeights = [...baseWeights];
    const boostFactor = 1 + realmIndex * 0.45;

    // 🔮 Thanh lọc linh căn theo cảnh giới
    if (realmIndex < 5) {
        // Kim Đan – Hóa Thần
        for (let i = 0; i < adjustedWeights.length; i++) {
            adjustedWeights[i] = Math.max(1, baseWeights[i] / Math.pow(boostFactor, i * 0.25));
        }
    }
    else if (realmIndex < 7) {
        // Luyện Hư – Hợp Thể
        adjustedWeights[0] = 5;   // phế phẩm cực hiếm
        adjustedWeights[1] = 10;  // hạ phẩm hiếm
        adjustedWeights[2] = 15;
        adjustedWeights[3] = 20;
        adjustedWeights[4] = 25;
        adjustedWeights[5] = 30;
        adjustedWeights[6] = 40;
        adjustedWeights[7] = 50;
        adjustedWeights[8] = 60;
        adjustedWeights[9] = 10; // hỗn độn cực hiếm
    }
    else if (realmIndex < 9) {
        // 💥 Độ Kiếp – Đại Thừa
        adjustedWeights[0] = 0;   // Không còn phế phẩm
        adjustedWeights[1] = 0;   // Không còn hạ phẩm
        adjustedWeights[2] = 0;   // Không còn trung phẩm
        adjustedWeights[3] = 2;   // Thượng phẩm cực hiếm
        adjustedWeights[4] = 4;   // Huyền phẩm rất hiếm
        adjustedWeights[5] = 10;  // Địa phẩm
        adjustedWeights[6] = 25;  // Thiên phẩm
        adjustedWeights[7] = 35;  // Hậu Thiên phẩm
        adjustedWeights[8] = 20;  // Tiên Thiên phẩm
        adjustedWeights[9] = 4;   // Hỗn Độn phẩm (cực kỳ hiếm)
    }
    else if (realmIndex < 12) {
        // 🌀 Tiên – Tiên Đế
        adjustedWeights.fill(0);
        adjustedWeights[5] = 5;   // Địa phẩm
        adjustedWeights[6] = 20;  // Thiên phẩm
        adjustedWeights[7] = 35;  // Hậu Thiên phẩm
        adjustedWeights[8] = 30;  // Tiên Thiên phẩm
        adjustedWeights[9] = 10;  // Hỗn Độn phẩm
    }
    else {
        // 🌌 Thánh Nhân – Đạo Cảnh – Hỗn Độn
        adjustedWeights.fill(0);
        adjustedWeights[6] = 10;  // Thiên phẩm
        adjustedWeights[7] = 20;  // Hậu Thiên phẩm
        adjustedWeights[8] = 35;  // Tiên Thiên phẩm
        adjustedWeights[9] = 25;  // Hỗn Độn phẩm
    }

    // 🔢 Chọn ngẫu nhiên theo trọng số
    const total = adjustedWeights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;

    for (let i = 0; i < adjustedWeights.length; i++) {
        r -= adjustedWeights[i];
        if (r <= 0) return i;
    }

    return adjustedWeights.length - 1; // fallback: Hỗn Độn phẩm
}


function pickTemplateByRealm(r) {
    if (r < 3) return ENEMY_TEMPLATES[0];
    if (r < 8) return ENEMY_TEMPLATES[1];
    if (r < 16) return ENEMY_TEMPLATES[2];
    return ENEMY_TEMPLATES[3];
}

// SỬA: scaleEnemy dùng đúng hệ đột phá, loại bỏ hệ số nhỏ gây HP/ATK thấp
function scaleEnemy(template, realmIndex, mult = 1, realmStage = 0) {
    const rootRank = getRootRankForRealm(realmIndex);
    const heavenBase = getHeavenScale(realmIndex, realmStage, rootRank); // luôn tăng theo cảnh/tiểu cảnh/phẩm chất

    // Hệ số chuẩn hóa để đưa về mặt bằng “vô tận tăng”, cảnh cao luôn thắng
    const BASE_K = 0.25;  // hệ số nền cho ATK/DEF
    const HP_K   = 6.0;   // HP cao hơn để trận không quá ngắn
    const DEF_K  = 0.50;  // DEF vừa phải

    const scale = heavenBase * BASE_K * mult;
    const rankBonus = 1 + (rootRank * 0.12);

    const e = {
        name: template.name,
        tier: 'Thường',
        realmIndex,
        realmStage,
        baseTemplate: template,
        elements: randomHybridElements(realmIndex, false),
        rootRank,
    };

    // Luôn tăng khi cảnh/tier tăng
    e.str = Math.max(1, Math.floor(template.baseStr * scale * rankBonus));
    e.hp  = Math.max(1, Math.floor(template.baseHp * scale * HP_K * rankBonus));
    e.def = Math.max(0, Math.floor(template.baseDef * scale * DEF_K * rankBonus));

    // đảm bảo tăng đơn điệu ở cảnh thấp (fallback)
    if (realmIndex <= 2) {
        e.str = Math.max(e.str, Math.floor(template.baseStr * 1.5));
        e.hp  = Math.max(e.hp,  Math.floor(template.baseHp * 2.5));
        e.def = Math.max(e.def, Math.floor(template.baseDef * 1.2));
    }

    e.maxHp = e.hp;
    e.xp = Math.floor(template.baseXp * (1 + realmIndex * 0.6));
    e.gold = Math.floor((template.gold || 10) * (1 + realmIndex * 0.4));

    return e;
}


/* random hybrid elements (2..4 elements, small chance for many) */
function randomHybridElements(realmIndex = 0, forceHybrid = false) {
    const roll = Math.random();
    let count = 1;

    const realmFactor = Math.min(1, Math.log10(realmIndex + 2) / 2); // từ 0 → 1 dần

    if (forceHybrid) {
        if (roll < 0.03 + 0.07 * realmFactor) count = 4;
        else if (roll < 0.25 + 0.25 * realmFactor) count = 3;
        else count = 2;
    } else {
        if (roll < 0.02 + 0.03 * realmFactor) count = 4;
        else if (roll < 0.10 + 0.15 * realmFactor) count = 3;
        else if (roll < 0.30 + 0.30 * realmFactor) count = 2;
        else count = 1;
    }

    const res = [];
    while (res.length < count) {
        const e = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
        if (!res.includes(e)) res.push(e);
    }
    return res;
}


function renderEnemyList() {
    const el = $('enemyList');
    el.innerHTML = '';

    const pool = spawnEnemyPoolForRealm(state.realmIndex);

    pool.forEach((e, idx) => {
        const realmName = REALMS[e.realmIndex] || "Vô Danh";
        const stageName = STAGES[e.realmStage || 0] || "Sơ Kỳ";
        const rankName = ROOT_RANKS[e.rootRank] || "Phế Phẩm";
        const elementIcons = e.elements.map(colorizeElement).join(' ');
        const atk = e.str || 0;
        const def = e.def || 0;
        const hp = e.hp || 0;

        const div = document.createElement('div');
        div.className = 'enemy-box';
        div.innerHTML = `
            <b>${e.name}</b>
            <div class="small">
                🧿 Cảnh giới: ${realmName} ${stageName}
            </div>
            <div class="small">
                🌿 Linh căn: ${elementIcons}
            </div>
            <div class="small">
                💎 Phẩm chất: <b>${rankName}</b>
            </div>
            <div class="small">
                ❤️ HP: ${hp}　⚔️ ATK: ${atk}　🛡️ DEF: ${def}
            </div>
            <div style="margin-top:6px">
                <button>Chọn mục tiêu</button>
            </div>
        `;

        // 🧠 Gán trực tiếp object e vào sự kiện (vẫn giữ được reference thật)
        div.querySelector('button').onclick = () => spawnSpecific(e);

        el.appendChild(div);
    });
}



function spawnSpecific(e) {
    state.currentEnemy = e;
    renderAll();
    log(`Mục tiêu đặt: ${state.currentEnemy.name} — ${REALMS[state.currentEnemy.realmIndex]}`);
}

function renderCurrentEnemy() {
    const div = $('currentEnemy');
    if (!state.currentEnemy) {
        div.innerText = 'Không có';
        return;
    }

    const e = state.currentEnemy;
    const stageName = STAGES[e.realmStage || 0];

    const elementsText = (e.elements && e.elements.length)
        ? e.elements.map(colorizeElement).join(' ')
        : 'Không rõ';
    let displayText = `
                <div><b">${e.name}</b> (${e.tier || ''})</div><br>
                <div>Cảnh giới: ${REALMS[e.realmIndex]} 
                    <span class="badge">${stageName}</span>
                </div>
                <div>HP ${Math.floor(e.hp)}/${Math.floor(e.maxHp)}, 
                    ATK ${e.str}, DEF ${e.def}
                </div>
                <div>Dao động sát thương: 
                    ${Math.floor(e.str * 0.7)} – ${Math.floor(e.str * 1.3)}
                </div>
                <div class="small">
                    Linh căn: ${elementsText} 
                    (${ROOT_RANKS[e.rootRank]})
                </div>
            `;

    div.innerHTML = colorizeWithMap(displayText);
}

/* spawn pool helper */
function spawnEnemyPoolForRealm(realmIndex) {
    const pool = [];
    const templates = [ENEMY_TEMPLATES[0], ENEMY_TEMPLATES[1], ENEMY_TEMPLATES[2]];
    templates.forEach((t, i) => {
        const rIndex = Math.min(REALMS.length - 1, Math.max(0, realmIndex + (i - 1)));
        const e = scaleEnemy(t, rIndex, 1 + i * 0.15, randomRealmStage());
        e.realmIndex = rIndex;
        // Đồng bộ chọn hệ với logic spawn chính
        e.elements = randomHybridElements(rIndex, false);
        pool.push(e);
    });
    if (realmIndex > 10) {
        const e = scaleEnemy(ENEMY_TEMPLATES[3], Math.min(REALMS.length - 1, realmIndex), 1.2, ENEMY_TEMPLATES[3].realmStage);
        e.realmIndex = Math.min(REALMS.length - 1, realmIndex);
        e.elements = randomHybridElements(e.realmIndex, false);
        pool.push(e);
    }
    return pool;
}

function getHeavenScale(realmIndex = 0, stage = 0, rootRank = 0) {
    const stageScale = [1.0, 1.25, 1.6, 2.2][stage] || 1.0;
    const realmScale = Math.pow(2.4, realmIndex) * Math.pow(1.35, stage); // cảnh giới thống trị

    const rootBonus = 1 + rootRank * 0.15;
    let tierBonus = 1.0;
    if (realmIndex > 9) tierBonus *= Math.pow(1.08, realmIndex - 9);
    if (realmIndex > 15) tierBonus *= Math.pow(1.10, realmIndex - 15);
    if (realmIndex > 21) tierBonus *= Math.pow(1.12, realmIndex - 21);

    return realmScale * stageScale * rootBonus * tierBonus;
}

/*
 Add a helper so older/other code calling createCultivator(...) won't fail.
 It returns an enemy-like cultivator object scaled by realm/stage/root and multiplier.
*/
function createCultivator(template, realmIndex = 0, mult = 1, realmStage = 0, elements = [],baseRootRank = null) {
	// ensure helper functions exist
	const rootRank = baseRootRank != null ? baseRootRank :typeof getRootRankForRealm === 'function' ? getRootRankForRealm(realmIndex) : (template?.rootRank || 0);
	const heavenScale = (typeof getHeavenScale === 'function'
		? getHeavenScale(realmIndex, realmStage, rootRank)
		: (1)) * mult * 0.015;

	const e = {
		name: template?.name || 'Quái Vật',
		tier: 'Thường',
		realmIndex,
		realmStage,
		baseTemplate: template || {},
		elements: elements.length ? elements : (typeof randomHybridElements === 'function') ? randomHybridElements(realmIndex, false) : (template?.elements || []),
		rootRank,
	};

	// base coefficients — tuned to produce balanced numbers
	e.str = Math.max(1, Math.floor((template?.baseStr || 10) * 10 * heavenScale));
	e.hp  = Math.max(1, Math.floor((template?.baseHp || 50) * 25 * heavenScale));
	e.def = Math.max(0, Math.floor((template?.baseDef || 5) * 8 * heavenScale));

	e.maxHp = e.hp;
	e.xp = Math.floor((template?.baseXp || 10) * (1 + realmIndex * 0.6));
	e.gold = Math.floor(((template?.gold) || 10) * (1 + realmIndex * 0.4));

	return e;
}
