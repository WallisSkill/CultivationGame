/* ===========================
   NEED / GROWTH / BREAKTHROUGH
   - getNeed: tăng rất mạnh theo realmIndex, scale by stage
   - stage: Sơ/Trung/Hậu/ViênMãn
   - attemptMajorBreakthrough: chance, success/fail consequences
=========================== */
function getNeed(realmIndex = state.realmIndex, stage = state.realmStage) {
    const base = 800;
    const stageMult = [1, 2, 4, 7][stage] || 1;

    // 🌌 Cơ bản – đạo vận nền
    let power = 2.0 + realmIndex * 0.25;

    // ✨ Hệ số cấp số nhân riêng cho từng giai đoạn
    let tierMult = 1; // hệ số nhân cấp số tăng phi tuyến

    if (realmIndex < 1) {
        tierMult = 1.5;
    }
    else if (realmIndex < 2) {
        tierMult = 9;
    }
    else if (realmIndex < 9) {
        // 🔥 Tu Chân (Nguyên Anh – Đại Thừa)
        tierMult = Math.pow(12, realmIndex - 3);
    }
    else if (realmIndex < 15) {
        // 🌠 Tiên giới (Tán Tiên → Tiên Đế)
        // Mỗi cấp Tiên nhân gấp bội lần cấp trước
        const tierBase = 15; // cấp số nhân cơ bản
        tierMult = Math.pow(tierBase, realmIndex - 3) * 50;
    }
    else if (realmIndex < 20) {
        // 🕯️ Thánh cảnh (Thánh Nhân → Chuẩn Thiên)
        const tierBase = 18;
        tierMult = Math.pow(tierBase, realmIndex - 7) * 5000;
    }
    else if (realmIndex < 25) {
        // ⚡ Thiên cảnh (Diệt Thiên → Toàn Thiên)
        const tierBase = 22;
        tierMult = Math.pow(tierBase, realmIndex - 12) * 1_000_000;
    }
    else {
        // 🌌 Cảnh cuối: Nghịch Thiên, Sáng Thế, Hỗn Độn, Hồng Mông, Chung Nguyên
        // Mỗi cảnh giới là 1 vũ trụ riêng — EXP gần như vô hạn
        const tierBase = 30;
        tierMult = Math.pow(tierBase, realmIndex - 16) * 1_000_000_000;
    }

    // 🧮 Tính toán đạo vận chính
    let expNeed = Math.floor(base * Math.pow(power, realmIndex * 2.2) * stageMult * tierMult);


    return expNeed;
}



/* ===========================
   XP / GAIN / RENDER
   =========================== */
let showXpLog = true;

function gainXP(n) {
    // Lock cultivation during battle
    if (window._battleActive) {
        // best-effort stop any auto-train timer if still running
        try {
            if (window.autoTrainTimer) { clearInterval(window.autoTrainTimer); window.autoTrainTimer = null; }
            if (window._autoTrainTimer) { clearInterval(window._autoTrainTimer); window._autoTrainTimer = null; }
        } catch { }
        return;
    }

    const realmMult = 1 + state.realmIndex * 0.6;
    const cultivateMult = state.cultivateBoost || 1.0;

    const rootRank = state.root?.rank ?? 0;
    const elementsCount = (state.root?.elements?.length ?? 1);

    const RANK_SPEED = [
        0.9, 1.3, 2.0, 3.0, 4.6, 6.8, 12.8, 22.5, 46.0, 95.0
    ];

    const rankMult = RANK_SPEED[rootRank] || 1.0;

    const hybridLayers = Math.max(0, elementsCount - 1);
    const multiRootBonus = 1 + Math.log2(elementsCount) * 0.5 + hybridLayers * 0.08 + (state.root?.isHybrid ? 0.1 : 0);
    const rootSpeedMult = rankMult * multiRootBonus;

    const scaled = Math.floor(n * realmMult * cultivateMult * rootSpeedMult);

    state.xp += scaled;
    state.lastXpGain = scaled;
    state.scaled = scaled;

    if (showXpLog) {
        log(
            `✨ Tu vi +${scaled} ` +
            `(cảnh giới x${realmMult.toFixed(2)}, tốc độ tu luyện x${cultivateMult.toFixed(2)}, ` +
            `phẩm chất x${rankMult.toFixed(2)}, ` +
            `hỗn nguyên x${multiRootBonus.toFixed(2)})`
        );
    }

    checkRealmProgress();
}

/* ===========================
   ATTEMPT / BREAKTHROUGH
   =========================== */
/* check and process realm progression (called after xp gain) */
function checkRealmProgress() {
    while (state.xp >= getNeed()) {
        state.xp -= getNeed();
        if (state.realmStage < 3) {
            state.realmStage++;
            smallStageGain();
            renderAllImmediate();
            log(`Đột phá tiểu kỳ: ${REALMS[state.realmIndex]} ${STAGES[state.realmStage]}`);
            continue;
        } else {
            attemptMajorBreakthrough();
            renderAllImmediate();
            break;
        }
    }
}

(function installXpBattleGuard() {
    try {
        if (!window.state) return;
        const desc = Object.getOwnPropertyDescriptor(state, 'xp');
        if (desc && (desc.get || desc.set)) return; // đã được guard
        state._xp = Number.isFinite(state.xp) ? state.xp : 0;
        Object.defineProperty(state, 'xp', {
            get() { return state._xp; },
            set(v) {
                const cur = Number(state._xp) || 0;
                const nv = Math.max(0, Number(v) || 0);
                // Chỉ chặn tăng trong battle; giảm thì cho phép
                if (window._battleActive && nv > cur) {
                    // log tiết chế mỗi ~1s để khỏi spam
                    const now = Date.now();
                    if (!window._xpBlockedLogTs || now - window._xpBlockedLogTs > 1000) {
                        window._xpBlockedLogTs = now;
                        try { log('🔒 Đang chiến đấu — tu vi không tăng.'); } catch { }
                    }
                    return;
                }
                state._xp = nv;
                const delta = nv - cur;
                if (delta !== 0) state.lastXpGain = delta;
            },
            configurable: false
        });
    } catch { }
})();

function normalizeVitals() {
    state.maxHp = Math.round(state.maxHp || 0);
    state.totalMaxHp = Math.round(state.totalMaxHp || state.maxHp);
    const nextHp = Math.round(state.hp || 0);
    state.hp = Math.min(state.totalMaxHp, Math.max(0, nextHp));
}

function calculateStageGain(realm, fromStage = 0, toStage = 0, rootRank = 0) {
    const start = Math.max(0, Math.min(3, fromStage));
    const end = Math.max(start, Math.min(3, toStage));
    let powInc = 0, hpInc = 0, defInc = 0;

    for (let stage = start + 1; stage <= end; stage++) {
        const prevScale = (typeof getHeavenScale === 'function') ? getHeavenScale(realm, stage - 1, rootRank) : 1;
        const newScale = (typeof getHeavenScale === 'function') ? getHeavenScale(realm, stage, rootRank) : prevScale;
        const delta = Math.max(1, newScale - prevScale);

        // 🔥 BASE STATS - Tăng mạnh chỉ số cơ bản
        const basePow = Math.floor(delta * 0.5) + 50 + realm * 35;    // ⬆️ Tăng gấp 10x
        const baseHp = Math.floor(delta * 3.5) + 350 + realm * 180;   // ⬆️ Tăng gấp 10x
        const baseDef = Math.floor(delta * 0.2) + 12 + realm * 8;     // ⬆️ Tăng gấp 8x

        // 🌌 TIER MULTIPLIER - Hệ số theo cảnh giới (giống major breakthrough)
        let tierMultiplier = 1;

        if (realm < 2) {
            // Luyện Khí, Trúc Cơ - tăng vừa phải
            tierMultiplier = 1.2 + realm * 0.3;
        }
        else if (realm < 9) {
            // Tu Chân (Kim Đan → Đại Thừa) - tăng mạnh
            tierMultiplier = 2.0 + Math.pow(1.8, realm - 2);
        }
        else if (realm < 15) {
            // Tiên giới (Tán Tiên → Tiên Đế) - tăng cực mạnh
            tierMultiplier = 8.0 + Math.pow(2.5, realm - 9);
        }
        else if (realm < 20) {
            // Thánh cảnh - vượt bậc phi thường
            tierMultiplier = 40.0 + Math.pow(3.0, realm - 15);
        }
        else if (realm < 25) {
            // Thiên cảnh - siêu vượt bậc
            tierMultiplier = 200.0 + Math.pow(4.0, realm - 20);
        }
        else {
            // Nghịch Thiên, Sáng Thế, Hỗn Độn - thần thánh hóa
            tierMultiplier = 1200.0 + Math.pow(5.0, realm - 25);
        }

        // 🔥 STAGE MULTIPLIER - Mỗi stage tăng dần
        // Sơ Kỳ (1): x1.0, Trung Kỳ (2): x1.5, Hậu Kỳ (3): x2.5, Đại Viên Mãn (4): x4.0
        const stageMultipliers = [1.0, 1.0, 1.5, 2.5, 4.0];
        const stageMult = stageMultipliers[stage] || 1.0;

        // ⚡ FINAL CALCULATION
        const finalPowMult = tierMultiplier * stageMult * 0.8;  // Power
        const finalHpMult = tierMultiplier * stageMult * 1.2;   // HP cao hơn
        const finalDefMult = tierMultiplier * stageMult * 0.6;  // Defense vừa

        powInc += Math.max(50, Math.floor(basePow * finalPowMult));
        hpInc += Math.max(350, Math.floor(baseHp * finalHpMult));
        defInc += Math.max(12, Math.floor(baseDef * finalDefMult));
    }

    return { powInc, hpInc, defInc };
}

function smallStageGain(isForce = false) {
    const realm = state.realmIndex || 0;
    const newStage = state.realmStage || 0;
    const prevStage = Math.max(0, newStage - 1);
    const rootRank = state.root?.rank || 0;

    const gain = calculateStageGain(realm, prevStage, newStage, rootRank);

    // 🆕 BONUS THEO LINH CĂN
    const rootRankBonuses = [1.0, 1.2, 1.5, 2.0, 2.8, 4.0, 6.5, 11.0, 20.0, 40.0];
    const rootBonus = rootRankBonuses[rootRank] || 1.0;

    // 🆕 BONUS THEO NGUYÊN TỐ
    const elementCount = state.root?.elements?.length || 1;
    const elementBonus = 1 + (elementCount - 1) * 0.3; // Mỗi nguyên tố thêm +30%

    // ✅ ÁP DỤNG BONUS
    const finalPowInc = Math.floor(gain.powInc * rootBonus * elementBonus);
    const finalHpInc = Math.floor(gain.hpInc * rootBonus * elementBonus);
    const finalDefInc = Math.floor(gain.defInc * rootBonus * elementBonus);

    state.power += finalPowInc;
    state.maxHp += finalHpInc;
    state.defense += finalDefInc;

    const bonusHp = (typeof getEquippedHp === 'function') ? getEquippedHp() : 0;
    state.totalMaxHp = state.maxHp + bonusHp;
    state.hp = state.totalMaxHp;
    normalizeVitals();

    if (isForce) {
        const lostAge = Math.floor(20 + realm * 8);
        const lostHp = Math.floor(state.hp * 0.15);
        state.maxAge = Math.max(1, state.maxAge - lostAge);
        state.hp = Math.max(1, state.hp - lostHp);
        log(`💢 ${state.name || 'Ngươi'} cưỡng ép lĩnh ngộ tiểu cảnh — hao tổn ${lostAge} năm tuổi thọ, mất ${lostHp} HP!`);
    }

    const stageNames = ["Sơ Kỳ", "Trung Kỳ", "Hậu Kỳ", "Đại Viên Mãn"];
    const stageName = stageNames[newStage] || "Không rõ";

    log(`💫 Ngươi lĩnh ngộ ${stageName} tiểu cảnh!`);
    log(`⚔️ Công lực +${finalPowInc.toLocaleString()} | 💖 HP +${finalHpInc.toLocaleString()} | 🪨 Phòng ngự +${finalDefInc.toLocaleString()}`);

    // 🆕 Hiển thị bonus nếu có
    if (rootBonus > 1.0 || elementBonus > 1.0) {
        const bonusText = [];
        if (rootBonus > 1.0) bonusText.push(`Linh căn x${rootBonus.toFixed(1)}`);
        if (elementBonus > 1.0) bonusText.push(`Nguyên tố x${elementBonus.toFixed(1)}`);
        log(`✨ Bonus: ${bonusText.join(', ')}`);
    }

    // 🆕 BUFF TỐC ĐỘ TU LUYỆN khi đạt stage cao
    if (newStage >= 2) { // Hậu Kỳ trở lên
        const stageBoost = 1 + newStage * 0.08; // Hậu Kỳ: +16%, Đại Viên Mãn: +24%
        state.cultivateBoost = (state.cultivateBoost || 1.0) * stageBoost;
        log(`🌠 Đạo hành tinh thông — tốc độ tu luyện nhân ${stageBoost.toFixed(2)}`);
    }

    if (newStage === 3) {
        log(`🌕 Đại Viên Mãn! Chuẩn bị đột phá đại cảnh — hào quang tràn đầy!`);

        // 🆕 BONUS ĐẶC BIỆT khi đạt Đại Viên Mãn
        const perfectionBonus = {
            pow: Math.floor(finalPowInc * 0.5),  // Thêm 50% power
            hp: Math.floor(finalHpInc * 0.5),
            def: Math.floor(finalDefInc * 0.5)
        };

        state.power += perfectionBonus.pow;
        state.maxHp += perfectionBonus.hp;
        state.defense += perfectionBonus.def;

        log(`🎆 Viên Mãn chi lực — thêm ⚔️ ${perfectionBonus.pow.toLocaleString()} ATK, 💖 ${perfectionBonus.hp.toLocaleString()} HP, 🛡️ ${perfectionBonus.def.toLocaleString()} DEF!`);
    }
}

/* ===========================
   EXPERIMENTAL: ENEMY SPAWNING
   =========================== */
function spawnEnemy(realm, stage, isMini = false) {
    const basePower = 100;
    const powerMult = 1.2;

    // Thực thể địch cơ bản
    let enemy = {
        name: "Kẻ Thù",
        realmIndex: realm,
        realmStage: stage,
        maxHp: 0,
        hp: 0,
        defense: 0,
        power: 0,
        level: 0,
        exp: 0,
        drop: [],
        isBoss: false,
        isMiniBoss: isMini || false,
        elements: [],
        rank: 0,
        skills: [],
        ai: "aggressive",
        lootTable: "default",
        traits: [],
        cooldown: 0,
        nextSpawn: 0
    };

    // Tăng cường sức mạnh theo cảnh giới
    const tierBoost = Math.pow(powerMult, realm);
    enemy.power = Math.floor(basePower * tierBoost);
    enemy.maxHp = Math.floor(100 * tierBoost);
    enemy.defense = Math.floor(10 * tierBoost);

    // Gán cấp độ và điểm kinh nghiệm
    enemy.level = realm + stage * 0.1;
    enemy.exp = Math.floor(50 * tierBoost);

    // Thiết lập tên và thuộc tính ngẫu nhiên
    enemy.name = `${getRandomPrefix()} ${enemy.name}`;
    enemy.traits.push(getRandomTrait());

    return enemy;
}

function getRandomPrefix() {
    const prefixes = ["Ác Quỷ", "Bóng Tối", "Hắc Ám", "Ma Vương", "Yêu Tinh", "Thần Chết"];
    return prefixes[Math.floor(Math.random() * prefixes.length)];
}

function getRandomTrait() {
    const traits = ["Nhanh Nhẹn", "Mạnh Mẽ", "Bền Bỉ", "Thông Minh", "Khéo Léo", "Tà Ác"];
    return traits[Math.floor(Math.random() * traits.length)];
}
if (typeof window !== 'undefined') {
    window.normalizeVitals = normalizeVitals;
    window.calculateStageGain = window.calculateStageGain || calculateStageGain;
    window.calculateMajorGain = calculateMajorGain;
}

function attemptMajorBreakthrough(isForce = false) {
    const baseChance = 0.40;
    const penaltyPerRealm = 0.08;
    const realmPenalty = (state.realmIndex + 1) * penaltyPerRealm;

    const rootRank = state.root.rank || 0;
    const rankBonus = Math.pow(1.10, rootRank) - 1;
    const elementCount = state.root.elements?.length || 1;
    const hybridBonus = Math.pow(1.15, elementCount - 1) - 1;
    const cultivateBoost = state.cultivateBoost || 1.0;
    const luckBonus = state.luckBonus || 0;
    const breakBonus = state.breakBonus || 0;

    let totalChance = baseChance - realmPenalty + rankBonus + hybridBonus + luckBonus + breakBonus;
    totalChance *= Math.min(2.0, cultivateBoost);
    totalChance = Math.min(0.9, Math.max(0.05, totalChance));

    const isSuccess = isForce || (Math.random() < totalChance);
    const prevRealm = state.realmIndex;

    if (isSuccess) {
        const prevScale = (typeof getHeavenScale === 'function') ? getHeavenScale(prevRealm, 3, rootRank) : 1;
        state.realmIndex = Math.min(REALMS.length - 1, state.realmIndex + 1);
        state.realmStage = 0;

        const newScale = (typeof getHeavenScale === 'function') ? getHeavenScale(state.realmIndex, 0, rootRank) : 1;
        
        // 🔥 TÍNH TOÁN BUFF VƯỢT BẬC
        const gain = calculateMajorGain({
            prevRealm,
            newRealm: state.realmIndex,
            prevScale,
            newScale,
            rootRank,
            elementCount
        });

        // ⚡ ÁP DỤNG BUFF với hệ số vượt bậc
        const powInc = gain.powInc;
        const hpInc = gain.hpInc;
        const defInc = gain.defInc;

        state.power   += powInc;
        state.maxHp   += hpInc;
        state.defense += defInc;

        const bonusHp = (typeof getEquippedHp === 'function') ? getEquippedHp() : 0;
        state.totalMaxHp = state.maxHp + bonusHp;
        state.hp = state.totalMaxHp;
        normalizeVitals();
        
        // 🆕 TUỔI THỌ TĂNG VƯỢT BẬC
        const ageInc = gain.ageInc;
        state.maxAge += ageInc;

        log(`🌈 Đột phá thành công: ${REALMS[prevRealm]} → ${REALMS[state.realmIndex]}!`);
        log(`⚔️ Công lực +${powInc.toLocaleString()}, 💖 HP +${hpInc.toLocaleString()}, 🪨 Phòng ngự +${defInc.toLocaleString()}`);
        log(`⏳ Tuổi thọ +${ageInc.toLocaleString()} năm`);
        log(`📊 Hệ số tăng trưởng: x${gain.growthMult.toFixed(2)} (cảnh giới x${gain.realmStepBoost.toFixed(2)})`);
        log(`📿 Linh căn: ${ROOT_RANKS[rootRank]} (${(rankBonus * 100).toFixed(1)}%), căn ${elementCount} (${(hybridBonus * 100).toFixed(1)}%)`);
        
        // 🌠 Tốc độ tu luyện tăng theo cultivateMult
        const cultivateMult = gain.cultivateMult;
        state.cultivateBoost = (state.cultivateBoost || 1.0) * cultivateMult;
        const totalBoostPct = ((state.cultivateBoost - 1) * 100).toFixed(1);
        log(`🌠 Đạo cơ thăng hoa — tốc độ tu luyện nhân ${cultivateMult.toFixed(2)} (tổng +${totalBoostPct}%).`);
        
    } else {
        const loseAge = Math.floor(20 + state.realmIndex * 10);
        state.maxAge = Math.max(1, state.maxAge - loseAge);
        state.hp = Math.max(1, Math.floor(state.hp * 0.7));
        log(`⚡ Đột phá thất bại ở ${REALMS[state.realmIndex]} — mất ${loseAge} năm tuổi thọ.`);
        const curBoost = state.cultivateBoost || 1.0;
        if (curBoost > 1.0) {
            state.cultivateBoost = Math.max(1.0, curBoost * 0.95);
            log(`🌘 Đạo tâm dao động — tốc độ tu luyện giảm còn x${state.cultivateBoost.toFixed(2)}.`);
        }
        normalizeVitals();
    }
}

function calculateMajorGain(params = {}) {
    const prevRealm = Math.max(0, params.prevRealm ?? 0);
    const newRealm = Math.max(prevRealm + 1, params.newRealm ?? (prevRealm + 1));
    const rootRank = Math.max(0, params.rootRank ?? 0);
    const elementCount = Math.max(1, params.elementCount ?? 1);
    const prevScale = Math.max(1, params.prevScale ?? 1);
    const newScale = Math.max(prevScale, params.newScale ?? prevScale);
    const delta = Math.max(1, newScale - prevScale);

    // 🔥 BASE STATS - Chỉ số cơ bản tăng theo delta và realm
    const basePow = Math.floor(delta * 1.5) + 200 + prevRealm * 120;
    const baseHp = Math.floor(delta * 10) + 1500 + prevRealm * 800;
    const baseDef = Math.floor(delta * 0.6) + 35 + prevRealm * 25;

    // 🌌 GROWTH MULTIPLIER - Hệ số tăng trưởng vượt bậc
    const prevNeed = getNeed(prevRealm, 3);
    const nextNeed = getNeed(newRealm, 0);
    const needRatio = Math.max(1, nextNeed / Math.max(1, prevNeed));

    // ⚡ VƯỢT BẬC THEO CẢNH GIỚI - BOOST CỰC MẠNH
    let tierMultiplier = 1;

    if (newRealm < 2) {
        tierMultiplier = 2.0 + needRatio * 0.5;
    }
    else if (newRealm < 9) {
        tierMultiplier = 8.0 + Math.pow(needRatio, 0.5) * 3.0;
    }
    else if (newRealm < 16) {
        // 🔥 TIÊN GIỚI (Tán Tiên → Tiên Đế) - BOOST CỰC MẠNH
        tierMultiplier = 50.0 + Math.pow(needRatio, 0.6) * 12.0 + Math.pow(2.2, newRealm - 9) * 25;
    }
    else if (newRealm < 20) {
        // 🌟 THÁNH CẢNH - SIÊU VƯỢT BẬC
        tierMultiplier = 10000.0 + Math.pow(needRatio, 0.65) * 50.0 + Math.pow(3.0, newRealm - 16) * 10000;
    }
    else if (newRealm < 26) {
        // ⭐ THIÊN CẢNH - THẦN THÁNH HÓA
        tierMultiplier = 1200000.0 + Math.pow(needRatio, 0.7) * 200.0 + Math.pow(3.0, newRealm - 20) * 1200000;
    }
    else {
        // 🌌 CỰC CẢNH - VÔ ĐỊCH
        tierMultiplier = 3500000000 + Math.pow(needRatio, 0.75) * 1000.0 + Math.pow(3.0, newRealm - 26) * 3500000000;
    }

    // 🔥 REALM STEP BOOST - Mỗi cảnh giới cao hơn = buff lớn hơn
    const realmStepBoost = Math.max(2.0, 1.0 + (newRealm + 1) * 1.2);

    // 🌟 ROOT RANK BOOST - Linh căn càng cao càng mạnh
    const rootRankBonuses = [1.0, 1.3, 1.7, 2.5, 3.8, 6.0, 10.0, 18.0, 35.0, 70.0];
    const rootBonus = rootRankBonuses[rootRank] || 1.0;

    // 🔥 ELEMENT BOOST - Nguyên tố càng nhiều càng mạnh
    const elementBonus = 1.0 + (elementCount - 1) * 0.5;

    // ⚡ FINAL MULTIPLIERS
    const powMult = tierMultiplier * realmStepBoost * rootBonus * elementBonus * 1.2;
    const hpMult = tierMultiplier * realmStepBoost * rootBonus * elementBonus * 1.5;
    const defMult = tierMultiplier * realmStepBoost * rootBonus * elementBonus * 1.0;

    // 🌟 TÍNH TOÁN CUỐI CÙNG
    const powInc = Math.max(200, Math.floor(basePow * powMult));
    const hpInc = Math.max(1500, Math.floor(baseHp * hpMult));
    const defInc = Math.max(35, Math.floor(baseDef * defMult));

    // ⏳ TUỔI THỌ TĂNG VƯỢT BẬC
    let ageInc = 0;
    if (newRealm < 2) {
        ageInc = 1000 + newRealm * 200;
    } else if (newRealm < 9) {
        ageInc = 2000 + (newRealm - 2) * 1200;
    } else if (newRealm < 16) {
        ageInc = 15000 + Math.pow(2.0, newRealm - 9) * 5000;
    } else if (newRealm < 20) {
        ageInc = 500000 + Math.pow(3.0, newRealm - 16) * 250000;
    } else if (newRealm < 26) {
        ageInc = 50000000 + Math.pow(3.0, newRealm - 20) * 25000000;
    } else {
        ageInc = 5000000000 + Math.pow(3.0, newRealm - 26) * 2500000000;
    }

    // 🔥🔥🔥 CULTIVATE BOOST - TỐC ĐỘ TU LUYỆN VƯỢT BẬC GIỐNG TIER MULTIPLIER
    let cultivateSpeedMult = 1.0;
    
    if (newRealm < 2) {
        // Luyện Khí, Trúc Cơ - tăng vừa
        cultivateSpeedMult = 1.5 + newRealm * 0.3;
    }
    else if (newRealm < 9) {
        // Tu Chân - tăng mạnh
        // Kim Đan (2): x2.5
        // Nguyên Anh (3): x3.5
        // Hóa Thần (4): x5.0
        // Luyện Hư (5): x7.5
        // Hợp Thể (6): x11.0
        // Độ Kiếp (7): x16.5
        // Đại Thừa (8): x25.0
        cultivateSpeedMult = 1.5 + Math.pow(1.5, newRealm - 2) * 0.8;
    }
    else if (newRealm < 16) {
        // 🔥 TIÊN GIỚI - TỐC ĐỘ TU LUYỆN VƯỢT BẬC
        // Tán Tiên (9): x50
        // Địa Tiên (10): x80
        // Thiên Tiên (11): x130
        // Chân Tiên (12): x210
        // Huyền Tiên (13): x340
        // Kim Tiên (14): x550
        // Tiên Đế (15): x900
        cultivateSpeedMult = 30.0 + Math.pow(1.65, newRealm - 9) * 18;
    }
    else if (newRealm < 20) {
        // 🌟 THÁNH CẢNH - TỐC ĐỘ SIÊU VIỆT
        // Thánh Nhân (16): x2,000
        // Chí Thánh (17): x5,000
        // Đại Thánh (18): x12,500
        // Chuẩn Thiên (19): x31,250
        cultivateSpeedMult = 1200 + Math.pow(2.5, newRealm - 16) * 800;
    }
    else if (newRealm < 26) {
        // ⭐ THIÊN CẢNH - TỐC ĐỘ THẦN THÁNH
        // Diệt Thiên (20): x100,000
        // Khai Thiên (21): x300,000
        // Toàn Thiên (22): x900,000
        // Cực Thiên (23): x2,700,000
        // Nghịch Thiên (24): x8,100,000
        // Sáng Thế (25): x24,300,000
        cultivateSpeedMult = 60000 + Math.pow(3.0, newRealm - 20) * 40000;
    }
    else {
        // 🌌 CỰC CẢNH - TỐC ĐỘ VÔ HẠN
        // Hỗn Độn (26): x100M
        // Hồng Mông (27): x300M
        // Chung Nguyên (28): x900M+
        cultivateSpeedMult = 60000000 + Math.pow(3.0, newRealm - 26) * 40000000;
    }

    // 🌟 BONUS THEO LINH CĂN VÀ NGUYÊN TỐ
    const rootSpeedBonus = 1.0 + rootRank * 0.15; // Mỗi rank +15%
    const elementSpeedBonus = 1.0 + (elementCount - 1) * 0.08; // Mỗi nguyên tố +8%

    // 🔥 SCALE BOOST - Theo needRatio
    const scaleSpeedBoost = Math.min(3.0, Math.pow(needRatio, 0.15));

    // ⚡ TÍNH TOÁN CUỐI CÙNG
    const cultivateMult = cultivateSpeedMult * rootSpeedBonus * elementSpeedBonus * scaleSpeedBoost;

    return {
        powInc,
        hpInc,
        defInc,
        ageInc,
        cultivateMult,
        needRatio,
        growthMult: tierMultiplier,
        realmStepBoost
    };
}
