/* ===========================
   TU VI / ĐỘT PHÁ
   - Nhu cầu tu vi tính theo thời gian thực (xem js/world/balance.js).
   - Đột phá đại cảnh giới bị chặn bởi nhiệm vụ chính tuyến tương ứng.
=========================== */
function getNeed(realmIndex = state.realmIndex, stage = state.realmStage) {
    return xpNeedFor(realmIndex, stage);
}

function getEstimatedXpPerSecond() {
    const qi = (typeof currentLocationQi === 'function') ? currentLocationQi() : 1;
    return cultivationRate(state.realmIndex || 0, state.root, qi);
}

function formatTime(seconds) {
    return formatRealDuration(seconds);
}

function getRealmPrediction() {
    const xpPerSecond = getEstimatedXpPerSecond();
    if (xpPerSecond <= 0) return null;

    const stage = state.realmStage;
    const realmIndex = state.realmIndex;
    const remaining = Math.max(0, getNeed() - state.xp);
    const timeText = formatTime(remaining / xpPerSecond);

    if (stage < 3) {
        return { small: { nextRealm: REALMS[realmIndex], nextStage: STAGES[stage + 1], remaining, timeText }, big: null };
    }
    return { small: null, big: { nextRealm: REALMS[realmIndex + 1] || REALMS[realmIndex], remaining, timeText } };
}

/* ===========================
   XP / GAIN
=========================== */
let showXpLog = false;

function gainXP(n) {
    if (window._battleActive || !(n > 0)) return;
    state.xp += n;
    state.lastXpGain = n;
    checkRealmProgress();
}

function gainCultivationHours(hours) {
    const amount = Math.floor(cultivationRate(state.realmIndex || 0, state.root, 1) * hours * 3600);
    gainXP(amount);
    return amount;
}

function checkRealmProgress() {
    let guard = 0;
    while (state.xp >= getNeed() && guard++ < 64) {
        if (state.realmStage < 3) {
            state.xp -= getNeed();
            state.realmStage++;
            smallStageGain();
            log(`Đột phá tiểu kỳ: ${REALMS[state.realmIndex]} ${STAGES[state.realmStage]}`);
            if (typeof onRealmChanged === 'function') onRealmChanged();
            continue;
        }
        if (state.realmIndex >= REALMS.length - 1) {
            state.xp = getNeed();
            break;
        }
        const gate = (typeof getBreakthroughGate === 'function') ? getBreakthroughGate(state.realmIndex + 1) : null;
        if (gate) {
            state.xp = getNeed();
            if (state.bottleneckNotice !== gate.id) {
                state.bottleneckNotice = gate.id;
                log(`🚧 Bình cảnh! Tu vi đã đầy nhưng không thể đột phá ${REALMS[state.realmIndex + 1]} — cần hoàn thành nhiệm vụ "${gate.title}".`);
            }
            break;
        }
        attemptMajorBreakthrough();
        if (typeof onRealmChanged === 'function') onRealmChanged();
        renderAll();
        if (state.xp >= getNeed() * 0.99) break;
    }
}

function normalizeVitals() {
    state.maxHp = Math.round(state.maxHp || 0);
    state.totalMaxHp = Math.round(state.totalMaxHp || state.maxHp);
    const nextHp = Math.round(state.hp || 0);
    state.hp = Math.min(state.totalMaxHp, Math.max(0, nextHp));
}

function calculateStageGain(realm, fromStage = 0, toStage = 0, rootRank = 0) {
    const before = baseStatsFor(realm, fromStage, rootRank);
    const after = baseStatsFor(realm, toStage, rootRank);
    return {
        powInc: after.power - before.power,
        hpInc: after.hp - before.hp,
        defInc: after.defense - before.defense
    };
}

function applyBaseGain(gain) {
    state.power += gain.powInc;
    state.maxHp += gain.hpInc;
    state.defense += gain.defInc;
    const bonusHp = (typeof getEquippedHp === 'function') ? getEquippedHp() : 0;
    state.totalMaxHp = state.maxHp + bonusHp;
    state.hp = state.totalMaxHp;
    normalizeVitals();
}

function smallStageGain(isForce = false) {
    const realm = state.realmIndex || 0;
    const newStage = state.realmStage || 0;
    const rootRank = state.root?.rank || 0;
    const gain = calculateStageGain(realm, Math.max(0, newStage - 1), newStage, rootRank);
    applyBaseGain(gain);

    if (isForce) {
        const lostAge = Math.floor(20 + realm * 8);
        const lostHp = Math.floor(state.hp * 0.15);
        state.maxAge = Math.max(1, state.maxAge - lostAge);
        state.hp = Math.max(1, state.hp - lostHp);
        log(`💢 ${state.name || 'Ngươi'} cưỡng ép lĩnh ngộ tiểu cảnh — hao tổn ${lostAge} năm tuổi thọ, mất ${lostHp} HP!`);
    }

    log(`💫 Lĩnh ngộ ${STAGES[newStage] || 'Không rõ'}: ⚔️ +${formatNumber(gain.powInc)} | 💖 +${formatNumber(gain.hpInc)} | 🪨 +${formatNumber(gain.defInc)}`);
    if (newStage === 3) log('🌕 Đại Viên Mãn! Chuẩn bị đột phá đại cảnh — hào quang tràn đầy!');
    if (window.matchConnected && typeof registerProfile === 'function') registerProfile();
}

function calculateMajorGain({ prevRealm = 0, newRealm = prevRealm + 1, rootRank = 0 } = {}) {
    const before = baseStatsFor(prevRealm, 3, rootRank);
    const after = baseStatsFor(newRealm, 0, rootRank);
    return {
        powInc: Math.max(0, after.power - before.power),
        hpInc: Math.max(0, after.hp - before.hp),
        defInc: Math.max(0, after.defense - before.defense),
        ageInc: Math.floor(300 * Math.pow(1.85, newRealm))
    };
}

function getMajorBreakthroughChance() {
    const rootRank = state.root?.rank || 0;
    const chance = 0.85 - (state.realmIndex || 0) * 0.01 + rootRank * 0.01 + (state.luckBonus || 0) + (state.breakBonus || 0);
    return Math.min(0.98, Math.max(0.5, chance));
}

function attemptMajorBreakthrough(isForce = false) {
    const need = getNeed();
    const isSuccess = isForce || Math.random() < getMajorBreakthroughChance();
    const prevRealm = state.realmIndex;

    if (!isSuccess) {
        const loseAge = Math.floor(20 + prevRealm * 10);
        state.maxAge = Math.max(1, state.maxAge - loseAge);
        state.hp = Math.max(1, Math.floor(state.hp * 0.7));
        state.xp = Math.floor(need * 0.9);
        log(`⚡ Đột phá thất bại ở ${REALMS[prevRealm]} — mất ${loseAge} năm tuổi thọ, tu vi lùi 10%.`);
        normalizeVitals();
        return;
    }

    state.xp = Math.max(0, state.xp - need);
    state.realmIndex = Math.min(REALMS.length - 1, prevRealm + 1);
    state.realmStage = 0;
    state.bottleneckNotice = null;

    const gain = calculateMajorGain({ prevRealm, newRealm: state.realmIndex, rootRank: state.root?.rank || 0 });
    applyBaseGain(gain);
    state.maxAge += gain.ageInc;

    const story = (typeof getBreakthroughStory === 'function') ? getBreakthroughStory(prevRealm, state.realmIndex, gain) : null;
    if (story) {
        displayBreakthroughStory(story);
    } else {
        log(`🌈 Đột phá thành công: ${REALMS[prevRealm]} → ${REALMS[state.realmIndex]}!`);
        log(`⚔️ +${formatNumber(gain.powInc)} | 💖 +${formatNumber(gain.hpInc)} | 🪨 +${formatNumber(gain.defInc)} | ⏳ +${formatNumber(gain.ageInc)} năm`);
    }
    if (window.matchConnected && typeof registerProfile === 'function') registerProfile();
}

if (typeof window !== 'undefined') {
    window.normalizeVitals = normalizeVitals;
    window.calculateStageGain = calculateStageGain;
    window.calculateMajorGain = calculateMajorGain;
}
