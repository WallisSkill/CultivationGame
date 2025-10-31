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



/* nhỏ tăng khi lên stage */
function smallStageGain(isForce = false) {
    const realm = state.realmIndex || 0;
    const newStage = state.realmStage || 0;
    const prevStage = Math.max(0, newStage - 1);
    const rootRank = state.root?.rank || 0;

    const prevScale = (typeof getHeavenScale === 'function') ? getHeavenScale(realm, prevStage, rootRank) : 1;
    const newScale = (typeof getHeavenScale === 'function') ? getHeavenScale(realm, newStage, rootRank) : 1;
    const delta = Math.max(1, newScale - prevScale);

    // Hệ số tăng kiểm soát — đủ lớn để cảm nhận, không bùng nổ
    const powerGain = Math.max(1, Math.floor(delta * 0.06) + 4 + realm * 2);
    const hpGain    = Math.max(5, Math.floor(delta * 0.45) + 30 + realm * 12);
    const defGain   = Math.max(1, Math.floor(delta * 0.025) + 2 + realm);

    state.power   += powerGain;
    state.maxHp   += hpGain;
    state.defense += defGain;

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
    log(`⚔️ Công lực tăng +${powerGain}`);
    log(`💖 HP tăng +${hpGain}`);
    log(`🪨 Phòng ngự tăng +${defGain}`);

    if (newStage === 3) {
        log(`🌕 Đại Viên Mãn! Chuẩn bị đột phá đại cảnh.`);
    }
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
		} catch {}
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
        const delta = Math.max(1, newScale - prevScale);

        // Hệ số tăng đại cảnh — lớn nhưng kiểm soát
        const powInc = Math.max(3, Math.floor(delta * 0.35) + 30 + prevRealm * 25);
        const hpInc  = Math.max(20, Math.floor(delta * 2.2) + 200 + prevRealm * 140);
        const defInc = Math.max(2, Math.floor(delta * 0.12) + 6 + prevRealm * 8);

        state.power   += powInc;
        state.maxHp   += hpInc;
        state.defense += defInc;

        const bonusHp = (typeof getEquippedHp === 'function') ? getEquippedHp() : 0;
        state.totalMaxHp = state.maxHp + bonusHp;
        state.hp = state.totalMaxHp;
        normalizeVitals();
        const ageInc = Math.floor(800 + (state.realmIndex + 1) * 60);
        state.maxAge += ageInc;

        log(`🌈 Đột phá thành công: ${REALMS[prevRealm]} → ${REALMS[state.realmIndex]}!`);
        log(`⚔️ Công lực +${powInc}, 💖 HP +${hpInc}, 🪨 Phòng ngự +${defInc}`);
        log(`📿 Linh căn: ${ROOT_RANKS[rootRank]} (${((rankBonus) * 100).toFixed(1)}%), căn ${elementCount} (${((hybridBonus) * 100).toFixed(1)}%)`);
        const newRealm = state.realmIndex;
        const baseBoost = 0.18 + newRealm * 0.03;
        const rankBoost = rootRank * 0.02;
        const hybridBoost = Math.max(0, elementCount - 1) * 0.018;
        const scaleBoost = Math.min(0.35, Math.log10(Math.max(10, newScale)) * 0.015);
        const cultivateMult = 1 + baseBoost + rankBoost + hybridBoost + scaleBoost;
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


/* check and process realm progression (called after xp gain) */
function checkRealmProgress() {
    while (state.xp >= getNeed()) {
        state.xp -= getNeed();
        if (state.realmStage < 3) {
            state.realmStage++;
            smallStageGain();
            log(`Đột phá tiểu kỳ: ${REALMS[state.realmIndex]} ${STAGES[state.realmStage]}`);
            continue;
        } else {
            attemptMajorBreakthrough();
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
                        try { log('🔒 Đang chiến đấu — tu vi không tăng.'); } catch {}
                    }
                    return;
                }
                state._xp = nv;
                const delta = nv - cur;
                if (delta !== 0) state.lastXpGain = delta;
            },
            configurable: false
        });
    } catch {}
})();

function normalizeVitals() {
    state.maxHp = Math.round(state.maxHp || 0);
    state.totalMaxHp = Math.round(state.totalMaxHp || state.maxHp);
    const nextHp = Math.round(state.hp || 0);
    state.hp = Math.min(state.totalMaxHp, Math.max(0, nextHp));
}
if (typeof window !== 'undefined') window.normalizeVitals = normalizeVitals;
