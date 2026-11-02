/* ===========================
    COMBAT: attackTurn, win/lose
=========================== */

function attackTurn() {
    if (!state.currentEnemy) { log('Không có kẻ thù để tấn công.'); return; }
    recalculateStats();
    if (typeof syncEnemyToRealm === 'function') syncEnemyToRealm(state.currentEnemy);

    if (!window._battleActive) {
        window._battleActive = true;
        if (window.stopAutoTrainingHard) window.stopAutoTrainingHard();
    }

    const enemy = state.currentEnemy;
    const enemyRealmIndex = (typeof enemy.realmIndex === 'number')
        ? enemy.realmIndex
        : Math.max(0, state.realmIndex - 1);
    const playerRank = state.root.rank;
    const playerRealmIndex = state.realmIndex;
    const atkPower = state.totalPower;
    const { playerBuff, enemyBuff } = applyElementalBuffs(state, enemy);

    // ⚔️ Tru Tiên Kiếm — 50% cơ hội kết liễu tức khắc
    if (state.relicEffects?.instantKill > 0 && Math.random() < 0.7) {
        enemy.hp = 0;
        state.relicEffects.instantKill--;
        log(`⚔️ Tru Tiên Kiếm phát sáng! ${enemy.name} bị kết liễu tức khắc! (${state.relicEffects.instantKill} lần còn lại)`);
        if (state.relicEffects.instantKill <= 0) log("✨ Tru Tiên Kiếm đã cạn sát ý, tan biến...");
        winBattle(enemy);
        state.currentEnemy = null;
        renderAll();
        return;
    }

    // 🌿 Gọi hàm xử lý hiệu ứng Ngũ Hành

    // --- Người chơi tấn công ---
    if (!enemyBuff.skip) {
        const pdmg = computeDamage(
            atkPower * playerBuff.atk,
            state.root.elements, playerRank, playerRealmIndex, state.realmStage,
            enemy.def * enemyBuff.def, enemy.elements, enemy.rootRank || 0,
            enemyRealmIndex, enemy.realmStage || 0, false
        );

        let totalDmg = pdmg.final;

        if (playerBuff.burn > 0) {
            const burn = Math.floor(pdmg.final * playerBuff.burn);
            totalDmg += burn;
            log(`🔥 Hỏa diễm của ngươi thiêu đốt thêm ${fmtVal(burn)} sát thương!`);
        }
        if (pdmg.elePercent === 0) log("Ngươi cần phải ở cảnh giới Kim Đan mới mở được sát thương ngũ hành")

        enemy.hp -= totalDmg;
        log(`⚔️ Ta đánh ${enemy.name} gây ${fmtVal(totalDmg)} sát thương.
            (ATK: ${fmtVal(state.power)}${getEquippedAtk() > 0 ? ` (+${getEquippedAtk()})` : ''},
            Ngũ hành ${pdmg.elePercent.toFixed(1)}%,
            Phẩm chất x${pdmg.rankFactor.toFixed(2)},
            Cảnh giới x${pdmg.realmFactor.toFixed(2)})`);
        updateBattleInfo(pdmg, false);
    } else {
        log(`💧 ${enemy.name} né tránh đòn đánh của ngươi nhờ linh căn Thủy!`);
    }

    // 🏮 Thất Bảo Diệu Thọ — thu phục vũ khí địch
    if (state.relicEffects?.weaponCapture > 0 && Math.random() < 0.15) {
        const stolenAtk = Math.floor(enemy.str * 1.2);
        state.power += stolenAtk;
        state.relicEffects.weaponCapture--;
        log(`🪄 Thất Bảo Diệu Thọ hấp thu vũ khí của ${enemy.name}! Sức mạnh +${fmtVal(stolenAtk)}. (${state.relicEffects.weaponCapture} lần còn lại)`);
        if (state.relicEffects.weaponCapture <= 0) log("✨ Thất Bảo Diệu Thọ mất đi linh quang, bay về thiên giới...");
    }

    if (enemy.hp <= 0) {
        winBattle(enemy);
        if (state.relicEffects?.doubleReward > 0) {
            log("🌸 Chiêu Yêu Phiến mở ra — Phần thưởng nhân đôi!");
            doubleLastReward();
            state.relicEffects.doubleReward--;
            if (state.relicEffects.doubleReward <= 0) log("✨ Chiêu Yêu Phiến hóa thành cánh hoa, tiêu tán theo gió...");
        }
        const bonusHp = typeof getEquippedHp === 'function' ? getEquippedHp() : 0;
        state.totalMaxHp = (state.maxHp || 0) + bonusHp;
        state.hp = state.totalMaxHp;
        log("🔥 Khí huyết sôi trào — HP hồi phục toàn phần sau chiến thắng!");
        state.currentEnemy = null;
        renderAll();
        return;
    }

    // --- Địch phản kích ---
    if (!playerBuff.skip && !enemy.skipNextAttack) {
        const edmg = computeDamage(
            enemy.str * enemyBuff.atk,
            enemy.elements, enemy.rootRank || 0, enemyRealmIndex, enemy.realmStage || 0,
            (state.totalDef) * playerBuff.def,
            state.root.elements, state.root.rank, playerRealmIndex, state.realmStage, true
        );

        let enemyFinalDmg = edmg.final;
        if (enemyBuff.burn > 0) {
            const burnBack = Math.floor(edmg.final * enemyBuff.burn);
            enemyFinalDmg += burnBack;
            log(`🔥 ${enemy.name} mang theo hỏa diễm — Thiêu đốt thêm ${fmtVal(burnBack)} sát thương!`);
        }

        // 💎 Tam Bảo Ngọc Như Ý — phản 75% sát thương
        if (state.relicEffects?.reflect > 0 && edmg.final > 0) {
            const reflect = Math.floor(edmg.final * 0.75);
            enemy.hp = Math.max(0, enemy.hp - reflect);
            state.relicEffects.reflect--;
            log(`💎 Tam Bảo Ngọc Như Ý phản ${fmtVal(reflect)} sát thương lại ${enemy.name}! (${state.relicEffects.reflect} lần còn lại)`);
            if (state.relicEffects.reflect <= 0) log("✨ Tam Bảo Ngọc Như Ý tan biến...");
            if (enemy.hp <= 0) {
                winBattle(enemy);
                state.currentEnemy = null;
                renderAll();
                return;
            }
        }

        // ☯️ Thái Cực Đồ — bất tử khi sắp chết
        if (state.relicEffects?.immortal > 0 && state.hp - enemyFinalDmg <= 0) {
            state.relicEffects.immortal--;
            state.hp = 1;
            if (edmg.elePercent === 0) log(`${enemy.name} chưa phải Kim Đan chưa có sát thương ngũ hành`);

            log(`${enemy.name} tấn công, gây ${fmtVal(enemyFinalDmg)} sát thương.
                (Ngũ hành ${(edmg.elePercent.toFixed(1))}%,
                Phẩm chất x${edmg.rankFactor.toFixed(2)},
                Cảnh giới x${edmg.realmFactor.toFixed(2)})`);
            updateBattleInfo(edmg, true);
            log(`☯️ Thái Cực Đồ phát sáng — Ngươi tránh khỏi cái chết! (${state.relicEffects.immortal} lần còn lại)`);
            if (state.relicEffects.immortal <= 0) log("✨ Thái Cực Đồ vỡ tan thành bụi sáng...");
            renderAll();
            return;
        }

        // 💥 Nhận sát thương thực tế
        state.hp -= enemyFinalDmg;
        if (edmg.elePercent === 0) log(`${enemy.name} chưa phải Kim Đan chưa có sát thương ngũ hành`);
        log(`${enemy.name} tấn công, gây ${fmtVal(enemyFinalDmg)} sát thương.
                    (Ngũ hành ${edmg.elePercent.toFixed(1)}%,
                    Phẩm chất x${edmg.rankFactor.toFixed(2)},
                    Cảnh giới x${edmg.realmFactor.toFixed(2)})`);
        updateBattleInfo(edmg, true);

        if (state.hp <= 0) {
            // 🆕 Lưu thông tin tử vong
            window.__lastDeathInfo = {
                enemyName: enemy.name || 'Kẻ thù không rõ',
                killMethod: 'đòn đánh thường'
            };
            loseBattle();
            state.currentEnemy = null;
        }
    } else if (enemy.skipNextAttack) {
        enemy.skipNextAttack = false;
        log("💧 Linh căn Thủy vận chuyển — Ngươi né tránh phản kích hoàn toàn!");
    } else {
        log("💧 Linh căn Thủy vận chuyển — Ngươi né tránh phản kích hoàn toàn!");
    }

    
    renderAll();
}

const RUN_REST_SECONDS = 60;
const LOSE_REST_SECONDS = 180;

function runFromBattle() {
    if (!state.currentEnemy) { log('Không có kẻ thù để chạy.'); return; }
    if (state.currentEnemy.worldBoss && window.__boardBattle?.running) { lbEndBattle(window.__boardBattle, 'lose'); return; }
    if (state.currentEnemy.isPvP && pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
        reportRankedLoss();
        wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'end', data: { result: 'forfeit' } });
        endPvPSession();
        return;
    }
    window._battleActive = false;
    const name = state.currentEnemy?.name || 'đối thủ';
    const fellBack = state.currentEnemy?.huVoEnd;
    const foe = state.currentEnemy?.huVoFoe;
    state.currentEnemy = null;
    if (fellBack) huVoFallBack();
    if (foe) loseToHuVoDisciple();
    log(`🏃 Chạy khỏi ${name}. Cần điều dưỡng ${formatRealDuration(hastedSeconds(RUN_REST_SECONDS))}.`);
    startActivity({ type: 'rest', label: 'Điều dưỡng', seconds: RUN_REST_SECONDS });
    renderAll();
}

/* Mỗi con trong bầy tự gieo và rơi theo cấp, cảnh giới của chính nó */
function grantEnemyMaterial(unit) {
    const tier = ENEMY_TIERS[unit.tier] || ENEMY_TIERS['Thường'];
    if (Math.random() >= tier.matChance) return;
    grantMaterial(worldTierOfRealm(unit.realmIndex).id, Math.round(materialYield(unit.realmIndex, unit.tier === 'Thường' ? 1 : 3) * (unit.lootMult || 1)), unit.name);
}

function grantBattleRewards(enemy) {
    const tier = ENEMY_TIERS[enemy.tier] || ENEMY_TIERS['Thường'];
    const gold = Math.floor((enemy.gold || goldRef(enemy.realmIndex)) * renownGoldMult());

    state.gold += gold;
    const xp = gainCultivationSeconds(battleXpSeconds(enemy.xpMinutes || tier.xpMinutes));
    log(`🏵️ Hạ ${enemy.name}! +${formatNumber(xp)} tu vi, +${formatNumber(gold)} linh thạch.`);

    enemyPackMembers(enemy).forEach(grantEnemyMaterial);
    lbGainMastery(enemyPackMembers(enemy).length);
    if (Math.random() < tier.gearChance * (enemy.lootMult || 1)) {
        const slot = GEAR_SLOT_IDS[Math.floor(Math.random() * GEAR_SLOT_IDS.length)];
        const quality = enemy.tier === 'Boss' ? 3 : (enemy.tier === 'Thống lĩnh' ? 2 : 1);
        const gear = makeGearItem(enemy.realmIndex, slot, quality);
        addItemToInventory(gear);
        log(`🎁 Rơi trang bị: ${gear.name}!`);
    }
    if (Math.random() < 0.02) {
        const rank = Math.min(ROOT_RANKS.length - 1, (state.root?.rank || 0) + 1);
        const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
        addItemToInventory({ name: `Mảnh ${el} ${ROOT_RANKS[rank]}`, type: 'root_frag', value: { elements: [el], rank }, desc: 'Dùng 3 mảnh hợp thành linh căn' });
    }
}

function winBattle(enemy) {
    window._battleActive = false;
    grantBattleRewards(enemy);
    onEnemyDefeated(enemy);

    const boardBattle = window.__boardBattle;
    if (boardBattle && boardBattle.running) {
        boardBattle.running = false;
        if (boardBattle.timer) {
            clearInterval(boardBattle.timer);
            boardBattle.timer = null;
        }
    }

    renderInventory();
    checkRealmProgress();
}

/* Thua trận không còn là hết game: trọng thương, tụt tu vi, dưỡng thương rồi đi tiếp. */
function loseBattle() {
    window._battleActive = false;

    const boardBattle = window.__boardBattle;
    if (boardBattle && boardBattle.running) {
        boardBattle.running = false;
        if (boardBattle.timer) {
            clearInterval(boardBattle.timer);
            boardBattle.timer = null;
        }
    }

    const killInfo = window.__lastDeathInfo;
    window.__lastDeathInfo = null;
    const lost = Math.floor(state.xp * 0.05);
    state.xp = Math.max(0, state.xp - lost);
    state.hp = Math.max(1, Math.floor((state.totalMaxHp || state.maxHp) * 0.25));
    log(`💀 Bại dưới tay ${killInfo?.enemyName || 'kẻ thù'}! Mất ${formatNumber(lost)} tu vi, cần dưỡng thương ${formatRealDuration(hastedSeconds(LOSE_REST_SECONDS))}.`);
    startActivity({ type: 'rest', label: 'Dưỡng thương', seconds: LOSE_REST_SECONDS });
}

/* update battle info display */
function updateBattleInfo(dmgData, enemy = false) {
    const el = $('battleInfo');

    const eleVal = dmgData.elePercent ?? ((dmgData.elementFactor * 100 - 100));
    const eleColor = eleVal > 0 ? 'lightgreen' : (eleVal < 0 ? 'salmon' : 'white');

    const infoLine = `
        <span style="color:${eleColor}">Ngũ hành ${eleVal.toFixed(1)}%</span> • 
        Phẩm chất x${dmgData.rankFactor.toFixed(2)} • 
        Cảnh giới x${dmgData.realmFactor.toFixed(2)} • 
        Giảm ${dmgData.mitigate}
    `;

    if (!enemy) {
        el.innerHTML = infoLine;
    } else {
        el.innerHTML += `<div class="small">Phản kích → ${infoLine}</div>`;
    }
}

// ===== PvP MATCHMAKING + TURN SYNC (client) =====
(function initPvpGlobals() {
    if (!('matchWS' in window)) window.matchWS = null;
    if (!('matchConnected' in window)) window.matchConnected = false;
    if (!('MATCH_WS_URL' in window)) window.MATCH_WS_URL = location.hostname === '127.0.0.1' && new URLSearchParams(location.search).get('ws') || 'wss://cultivationserver.onrender.com';
    if (!('_findingMatch' in window)) window._findingMatch = false; // finding toggle
})();
const matchURL = window.MATCH_WS_URL;

const pvpSession = {
    active: false,
    sessionId: null,
    opponentId: null,
    myTurn: false,
    started: false,
    oppLastHbTs: 0
};

// NEW: finding flag to prevent forced pulls and for cancel button
if (!('_findingMatch' in window)) window._findingMatch = false;

/* --- PvP logic: matchmaking, turn sync, heartbeat --- */
function buildPublicProfile() {
    // 🆕 Đảm bảo profileId luôn tồn tại và LOAD TỪ LOCALSTORAGE TRƯỚC
    if (!state.profileId) {
        // 1️⃣ Kiểm tra localStorage trước
        const savedId = localStorage.getItem('tt_profileId');
        if (savedId) {
            state.profileId = savedId;
            console.log('✅ Đã load profileId từ localStorage:', savedId);
        } else {
            // 2️⃣ Tạo ID mới nếu chưa có
            const timestamp = Date.now();
            const randomPart = Math.floor(Math.random() * 1e5);
            state.profileId = `p_${timestamp}_${randomPart}`;
            
            // 3️⃣ LƯU NGAY vào localStorage
            try {
                localStorage.setItem('tt_profileId', state.profileId);
                console.log('✅ Đã tạo và lưu profileId mới:', state.profileId);
            } catch(e) {
                console.error('❌ Lỗi lưu profileId:', e);
            }
        }
    } else {
        // 4️⃣ Nếu đã có trong state nhưng chưa lưu localStorage → LƯU NGAY
        const savedId = localStorage.getItem('tt_profileId');
        if (savedId !== state.profileId) {
            try {
                localStorage.setItem('tt_profileId', state.profileId);
                console.log('✅ Đã sync profileId vào localStorage:', state.profileId);
            } catch(e) {}
        }
    }
    
    if (typeof recalculateStats === 'function') recalculateStats();
    
    return {
        id: state.profileId,
        name: state.name || 'Tu Sĩ',
        realmIndex: state.realmIndex || 0,
        realmStage: state.realmStage || 0,
        rootRank: state.root?.rank || 0,
        elements: state.root?.elements || [],
        str: state.totalPower || state.power || 10,
        def: state.totalDef || state.defense || 5,
        hp: state.totalMaxHp || state.maxHp || 100,
        look: playerLook(),
        loc: state.location || null,
        renown: sharedRenown()
    };
}

const WS_RETRY_MIN_MS = 1000;
const WS_RETRY_MAX_MS = 15000;
const WS_CLOSE_REPLACED = 1000;
const PVP_HB_TIMEOUT_MS = 15000;
let wsRetryMs = WS_RETRY_MIN_MS;
let wsRetryTimer = null;

/* Mất mạng thì tự nối lại, giãn dần; bị tab khác thế chỗ thì thôi */
function scheduleWsRetry(code) {
    if (code === WS_CLOSE_REPLACED || wsRetryTimer) return;
    wsRetryTimer = setTimeout(() => {
        wsRetryTimer = null;
        connectMatchWS(true);
    }, wsRetryMs);
    wsRetryMs = Math.min(WS_RETRY_MAX_MS, wsRetryMs * 2);
}

function wsSend(obj) {
    if (!window.matchWS || !window.matchConnected) return false;
    try { window.matchWS.send(JSON.stringify(obj)); return true; } catch { return false; }
}

function connectMatchWS(quiet = false) {
    return new Promise((resolve) => {
        if (window.matchWS && window.matchConnected) return resolve(true);
        if (!quiet) log('🔌 Đang kết nối PvP...');
        try { window.matchWS = new WebSocket(matchURL); } catch { log('❌ Không thể khởi tạo kết nối PvP.'); return resolve(false); }
        window.matchWS.onopen = () => {
            window.matchConnected = true;
            wsRetryMs = WS_RETRY_MIN_MS;
            pvpSession.oppLastHbTs = Date.now();
            log('✅ Kết nối PvP đã mở.');
            registerProfile();
            
            // 🆕 Thông báo cho friends system
            if (typeof window.onFriendsWSConnected === 'function') {
                window.onFriendsWSConnected();
            }
            
            if (pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
                wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'resync_request', data: {} });
            }
            resolve(true);
        };
        window.matchWS.onclose = (ev) => {
            if (window.matchConnected) log('🔌 Kết nối PvP đã đóng.');
            window.matchConnected = false;
            resolve(false);
            scheduleWsRetry(ev.code);
            // nếu đang tìm thì trả nút về trạng thái mặc định
            if (window._findingMatch) {
                window._findingMatch = false;
                const b = $('findMatch'); if (b) b.innerText = 'Tìm đối thủ PvP';
            }
            if (state.currentEnemy?.isPvP) window._battleActive = false;
            if (typeof renderFriendsUI === 'function') renderFriendsUI();
        };
        window.matchWS.onerror = () => { if (!quiet) log('❌ Lỗi kết nối PvP.'); };
        window.matchWS.onmessage = onMatchMessage;
    });
}

function registerProfile() {
    const profile = buildPublicProfile();
    wsSend({ type: 'register', profile });
}

function deriveSessionId(a, b) {
    return [a, b].sort().join(':');
}

function attachPvPOpponent(opp) {
    const e = {
        name: `${opp.name || 'Đạo Hữu'} [PvP]`,
        tier: 'Đạo hữu',
        realmIndex: Math.max(0, Math.floor(opp.realmIndex || 0)),
        realmStage: Math.max(0, Math.floor(opp.realmStage || 0)),
        str: Math.max(1, Math.floor(opp.str || 10)),
        def: Math.max(0, Math.floor(opp.def || 5)),
        hp: Math.max(1, Math.floor(opp.hp || 100)),
        maxHp: Math.max(1, Math.floor(opp.hp || 100)),
        elements: Array.isArray(opp.elements) && opp.elements.length ? opp.elements.slice(0, 5) : ['Hỏa'],
        rootRank: Math.max(0, Math.floor(opp.rootRank || 0)),
        look: opp.look || null,
        isPvP: true
    };

    window._battleActive = true;
    if (window.stopAutoTrainingHard) window.stopAutoTrainingHard();

    state.currentEnemy = e;
    renderAll();
}

function deriveSessionId(a, b) {
    return [a, b].sort().join(':');
}

function _extractJoinTsFromId(id) {
    const m = String(id || '').match(/^p_(\d+)_/);
    return m ? Number(m[1]) : 0;
}
function decideFirstTurnByJoin(meId, oppId) {
    const ta = _extractJoinTsFromId(meId);
    const tb = _extractJoinTsFromId(oppId);
    if (ta && tb && ta !== tb) {
        // earlier join goes first
        return ta < tb;
    }
    // fallback: stable lexicographic order using session id
    const first = deriveSessionId(meId, oppId).split(':')[0];
    return first === meId;
}

function initPvPTurnOrder(opp) {
    const me = buildPublicProfile();
    return decideFirstTurnByJoin(me.id, opp.id);
}

function startPvPBattle(oppProfile, matchId = null) {
    const me = buildPublicProfile();
    coopDropOpponent(oppProfile.id);
    pvpSession.matchId = matchId;
    pvpSession.active = true;
    pvpSession.opponentId = oppProfile.id;
    pvpSession.sessionId = deriveSessionId(me.id, oppProfile.id);
    pvpSession.myTurn = decideFirstTurnByJoin(me.id, oppProfile.id);
    pvpSession.started = true;

    attachPvPOpponent(oppProfile);
    // reset finding status and button text
    window._findingMatch = false;
    const b = $('findMatch'); if (b) b.innerText = 'Tìm đối thủ PvP';

    log(`🤺 Ghép PvP — ${state.currentEnemy.name} (${REALMS[state.currentEnemy.realmIndex]} ${STAGES[state.currentEnemy.realmStage]})`);
    log(`💠 Linh căn: ${state.currentEnemy.elements.map(colorizeElement).join(' ')} — ${ROOT_RANKS[state.currentEnemy.rootRank]}`);
    log(`⚔️ HP: ${state.currentEnemy.hp}, ATK: ${state.currentEnemy.str}, DEF: ${state.currentEnemy.def}`);
    if (matchId) log('📊 Trận xếp hạng: kết quả tính vào elo.');
    startPvPHeartbeat();
    pvpExchangeKit();
}

// Faster heartbeat and timeout to auto-win when opponent refreshes
function startPvPHeartbeat() {
    stopPvPHeartbeat();
    pvpSession.oppLastHbTs = Date.now();
    window._pvpHbTimer = setInterval(() => {
        if (pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
            wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'hb', data: { t: Date.now() } });
            const gap = Date.now() - (pvpSession.oppLastHbTs || 0);
            if (gap > PVP_HB_TIMEOUT_MS) {
                log('🏳️ Đối thủ đã rời trận. Ngươi chiến thắng!');
                endPvPSession();
            }
        }
    }, 1500);
}
function stopPvPHeartbeat() { if (window._pvpHbTimer) { clearInterval(window._pvpHbTimer); window._pvpHbTimer = null; } }

// Send forfeit on unload so the other side wins immediately
window.addEventListener('beforeunload', () => {
    try {
        if (pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
            reportRankedLoss();
            wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'end', data: { result: 'forfeit' } });
        }
    } catch { }
});

// Only accept matches when we are finding
function onMatchMessage(ev) {
    let msg = {};
    try { msg = JSON.parse(ev.data || '{}'); } catch { return; }

    if (msg.type === 'info' && msg.message) { log(`ℹ️ PvP: ${msg.message}`); return; }

    if (msg.type === 'match_found' && msg.opponent) {
        if (!window._findingMatch) { log('ℹ️ Bỏ qua trận PvP không do ngươi tìm.'); return; }
        startPvPBattle(msg.opponent, msg.matchId);
        return;
    }

    if (msg.type === 'pvp_relay' && msg.from && msg.sessionId && msg.kind) {
        if (!pvpSession.sessionId || msg.sessionId !== pvpSession.sessionId) return;
        pvpSession.oppLastHbTs = Date.now();

        switch (msg.kind) {
            case 'hb':
                break;
            case 'kit':
                pvpReceiveKit(msg.data);
                break;
            case 'bhit':
                pvpBoardHit(msg.data);
                break;
            case 'bstate':
                pvpBoardState(msg.data);
                break;
            case 'attack': {
                /* Đòn từ bản cũ chưa tính khắc chế cảnh giới thì máy người nhận tự tính */
                const self = { realmIndex: state.realmIndex || 0, realmStage: state.realmStage || 0, dodge: gearSubTotals().dodge };
                const edge = msg.data?.edged ? 1 : edgeDamage(state.currentEnemy || self, self);
                const dmg = Math.max(0, Math.floor((msg.data?.damage || 0) * edge));
                const burn = Math.max(0, Math.floor((msg.data?.burn || 0) * edge));
                const wasDodge = msg.data?.miss || (!msg.data?.edged && Math.random() < edgeDodge(self, state.currentEnemy || self));
                const detail = msg.data?.detail || {};

                const name = state.currentEnemy?.name || 'Đối thủ';

                if (wasDodge) {
                    log(`💧 ${name} né tránh đòn đánh của ngươi!`);
                } else {
                    const total = dmg + burn;
                    state.hp = Math.max(0, state.hp - total);

                    // ✅ Hiển thị thông tin chi tiết
                    log(`💥 ${name} đánh ngươi gây ${total} sát thương.`);

                    if (detail.elePercent || detail.rankFactor || detail.realmFactor) {
                        log(`   (Khắc chế ${detail.elePercent?.toFixed(1) || 0}%, Phẩm chất x${detail.rankFactor?.toFixed(2) || 1}, Cảnh giới x${detail.realmFactor?.toFixed(2) || 1})`);
                    }

                    if (burn > 0) {
                        log(`🔥 Hỏa diễm thiêu đốt thêm ${burn} sát thương!`);
                    }
                }

                if (state.hp <= 0) {
                    log('💀 Ngươi bại trận trong PvP.');
                    reportRankedLoss();
                    wsSend({
                        type: 'pvp_relay',
                        to: pvpSession.opponentId,
                        sessionId: pvpSession.sessionId,
                        kind: 'end',
                        data: { result: 'win' }
                    });
                    endPvPSession();
                } else {
                    pvpSession.myTurn = true;

                    renderAll();
                }
                break;
            }
            case 'end': {
                const result = msg.data?.result || 'end';
                if (result === 'win' || result === 'forfeit') {
                    log(result === 'win' ? '🎉 Ngươi thắng PvP!' : '🏳️ Đối thủ đã rời trận. Ngươi chiến thắng!');
                    grantPvpWinReward();
                } else {
                    log('🏁 Trận PvP kết thúc.');
                }
                endPvPSession();
                break;
            }
            case 'resync_request': {
                const payload = { myHp: state.hp, oppHp: state.currentEnemy?.hp || 0, yourTurn: !pvpSession.myTurn };
                wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'resync_state', data: payload });
                break;
            }
            case 'resync_state': {
                if (typeof msg.data?.myHp === 'number') state.hp = Math.max(0, msg.data.myHp);
                if (typeof msg.data?.oppHp === 'number' && state.currentEnemy) state.currentEnemy.hp = Math.max(0, msg.data.oppHp);
                if (typeof msg.data?.yourTurn === 'boolean') pvpSession.myTurn = msg.data.yourTurn;
                renderAll();
                break;
            }
        }
    }
}

// Helper to compute and format PvP damage log (fallback-safe)
function pvpComputeDetail(attacker, defender) {
    if (typeof computeDamage === 'function') {
        const det = computeDamage(
            attacker.str || 10, attacker.elements || [], attacker.rootRank || 0, attacker.realmIndex || 0, attacker.realmStage || 0,
            defender.def || 0, defender.elements || [], defender.rootRank || 0, defender.realmIndex || 0, defender.realmStage || 0
        );
        return {
            final: det.final,
            elementFactor: det.elementFactor,
            rankFactor: det.rankFactor,
            realmFactor: det.realmFactor,
            elePercent: det.elePercent
        };
    }
    const base = Math.max(1, (attacker.str || 10) - (defender.def || 0) * 0.4);
    return { final: Math.floor(base), elementFactor: 1, rankFactor: 1, realmFactor: 1, elePercent: 0 };
}

function pvpLogHit(prefix, total, det, burnExtra = 0, wasDodge = false) {
    if (wasDodge) {
        log(`💧 Linh căn Thủy vận chuyển — ${prefix} né tránh đòn tấn công!`);
        return;
    }
    const elePct = det?.elePercent ?? (((det?.elementFactor || 1) - 1) * 100);
    log(`${prefix} gây ${Number(total).toFixed(2)} sát thương. (Ngũ hành ${Number(elePct).toFixed(2)}%, Phẩm chất x${Number(det?.rankFactor || 1).toFixed(2)}, Cảnh giới x${Number(det?.realmFactor || 1).toFixed(2)})`);
    if (burnExtra > 0) log(`🔥 Thiêu đốt thêm ${burnExtra} sát thương.`);
}

// Attack: PvP path now mirrors attackTurn() effects (element buffs, dodge, burn)
function pvpAttackOrLocal() {
    if (state.currentEnemy?.isPvP && !pvpSession.legacy) return;
    if (!state.currentEnemy || !state.currentEnemy.isPvP) {
        if (typeof attackTurn === 'function') return attackTurn();
        return;
    }
    if (!pvpSession.myTurn) { log('⏳ Chưa tới lượt ngươi.'); return; }

    // Build snapshots
    const me = {
        name: state.name || 'Ngươi',
        str: state.totalPower || state.power || 10,
        def: state.totalDef || state.defense || 5,
        realmIndex: state.realmIndex || 0,
        realmStage: state.realmStage || 0,
        rootRank: state.root?.rank || 0,
        elements: state.root?.elements || []
    };
    const opp = {
        name: state.currentEnemy?.name || 'Đối thủ',
        str: state.currentEnemy?.str || 10,
        def: state.currentEnemy?.def || 0,
        realmIndex: state.currentEnemy?.realmIndex || 0,
        realmStage: state.currentEnemy?.realmStage || 0,
        rootRank: state.currentEnemy?.rootRank || 0,
        elements: state.currentEnemy?.elements || []
    };

    // ⚡ Apply elemental buffs như attackTurn()
    let playerBuff = { atk: 1, def: 1, skip: false, burn: 0 };
    let enemyBuff = { atk: 1, def: 1, skip: false, burn: 0 };
    if (typeof applyElementalBuffs === 'function') {
        try {
            const buffs = applyElementalBuffs(
                {
                    name: me.name,
                    realmIndex: me.realmIndex,
                    realmStage: me.realmStage,
                    root: { rank: me.rootRank, elements: me.elements },
                    elements: me.elements,
                    totalMaxHp: state.totalMaxHp,
                    maxHp: state.maxHp,
                    hp: state.hp
                },
                {
                    name: opp.name,
                    realmIndex: opp.realmIndex,
                    realmStage: opp.realmStage,
                    rootRank: opp.rootRank,
                    elements: opp.elements,
                    maxHp: state.currentEnemy?.maxHp,
                    hp: state.currentEnemy?.hp
                }
            );
            playerBuff = buffs.playerBuff || playerBuff;
            enemyBuff = buffs.enemyBuff || enemyBuff;
        } catch { }
    }

    // Enemy dodge (skip) from their elemental effect
    const wasDodge = enemyBuff.skip || Math.random() < edgeDodge(opp, me);

    let baseDamage = 0;
    let burnExtra = 0;
    let detail = { final: 0, elementFactor: 1, rankFactor: 1, realmFactor: 1, elePercent: 0 };

    const isCrit = false;
    if (!wasDodge) {
        // ✅ Tính damage ĐÚNG với elemental buffs
        const att = {
            str: Math.floor(me.str * playerBuff.atk),
            elements: me.elements,
            rootRank: me.rootRank,
            realmIndex: me.realmIndex,
            realmStage: me.realmStage
        };
        const def = {
            def: Math.floor(opp.def * enemyBuff.def),
            elements: opp.elements,
            rootRank: opp.rootRank,
            realmIndex: opp.realmIndex,
            realmStage: opp.realmStage
        };

        if (typeof computeDamage === 'function') {
            detail = computeDamage(
                att.str,
                att.elements, att.rootRank, att.realmIndex, att.realmStage,
                def.def,
                def.elements, def.rootRank, def.realmIndex, def.realmStage,
                false
            );
            baseDamage = Math.max(1, Math.floor(detail.final || 1));
        } else {
            detail = pvpComputeDetail(att, def);
            baseDamage = Math.max(1, Math.floor(detail.final || 1));
        }

        // ✅ Burn damage từ elemental buff
        if (playerBuff.burn) {
            burnExtra = Math.max(1, Math.floor(baseDamage * playerBuff.burn));
        }

        }

    const edge = edgeDamage(me, opp);
    baseDamage = Math.floor(baseDamage * edge);
    burnExtra = Math.floor(burnExtra * edge);
    const assist = wasDodge ? 0 : coopPvpAssist(opp);
    const total = wasDodge ? 0 : (baseDamage + burnExtra + assist);

    // Apply locally to opponent
    if (!wasDodge) {
        state.currentEnemy.hp = Math.max(0, (state.currentEnemy.hp || 0) - total);
    }

    // ✅ Hiển thị log với đầy đủ thông tin
    if (!wasDodge) {
        log(`⚔️ Ngươi đánh ${state.currentEnemy.name} gây ${total} sát thương.`);
        log(`   (Khắc chế ${detail.elePercent?.toFixed(1) || 0}%, Phẩm chất x${detail.rankFactor?.toFixed(2) || 1}, Cảnh giới x${detail.realmFactor?.toFixed(2) || 1})`);
        if (burnExtra > 0) {
            log(`🔥 Hỏa diễm thiêu đốt thêm ${burnExtra} sát thương!`);
        }
    } else {
        log(`💧 ${state.currentEnemy.name} né tránh đòn đánh của ngươi!`);
    }

    // ✅ Send structured payload
    if (pvpSession.opponentId && pvpSession.sessionId) {
        wsSend({
            type: 'pvp_relay',
            to: pvpSession.opponentId,
            sessionId: pvpSession.sessionId,
            kind: 'attack',
            data: {
                miss: wasDodge,
                damage: baseDamage,
                burn: burnExtra,
                edged: true,
                detail,
            }
        });
    }
    pvpSession.myTurn = false;

    if (state.currentEnemy.hp <= 0 && !wasDodge) {
        log('🎉 Ngươi thắng PvP!');
        grantPvpWinReward();
        if (pvpSession.opponentId && pvpSession.sessionId) {
            wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'end', data: { result: 'defeat' } });
        }
        endPvPSession();
        return;
    }

    
    renderAll();
}
window.pvpAttackOrLocal = pvpAttackOrLocal;

// Stop auto training (best-effort, supports multiple timer names)
function stopAutoTrainingHard() {
    try {
        const candidates = [
            'autoTrainTimer', '_autoTrainTimer', 'trainInterval',
            'autoCultivateTimer', 'cultivateTimer', 'autoLoopTimer',
            'autoTimer', 'trainTimer', 'cultivationTimer'
        ];
        for (const k of candidates) {
            if (window[k]) {
                try { clearInterval(window[k]); } catch { }
                try { clearTimeout(window[k]); } catch { }
                window[k] = null;
            }
        }
    } catch { }
}
// export to window so later patches can always call it
window.stopAutoTrainingHard = stopAutoTrainingHard;

// Ensure battle lock stops auto training immediately when a battle starts
(function battleLockInit() {
    if (!('_battleActive' in window)) window._battleActive = false;

    // ...existing code...
    const _oldRenderAll = (typeof renderAll === 'function') ? renderAll : null;
    renderAll = function () {
        if (_oldRenderAll) _oldRenderAll();
        if (state.currentEnemy && !window._battleActive) {
            window._battleActive = true;
            // changed: use window guard to avoid ReferenceError
            if (window.stopAutoTrainingHard) window.stopAutoTrainingHard();
        }
        if (!state.currentEnemy && window._battleActive) {
            window._battleActive = false;
        }
    };
})();

// ===== Battle lock hooks (stop auto-train, cancel finding) =====
(function battleLockInit() {
    if (!('_battleActive' in window)) window._battleActive = false;

    const _oldRenderAll = (typeof renderAll === 'function') ? renderAll : null;
    renderAll = function () {
        if (_oldRenderAll) _oldRenderAll();
        if (state.currentEnemy && !window._battleActive) {
            window._battleActive = true;
            // changed: use window guard to avoid ReferenceError
            if (window.stopAutoTrainingHard) window.stopAutoTrainingHard();
            // also stop finding PvP if any
            if (window._findingMatch) {
                window._findingMatch = false;
                const b = $('findMatch'); if (b) b.innerText = 'Tìm đối thủ PvP';
                wsSend({ type: 'cancel_find' });
            }
        }
        if (!state.currentEnemy && window._battleActive) {
            window._battleActive = false;
        }
    };
})();

function findMatchPvP() {
    if (state.realmIndex < 1) { log('❌ Cần đạt ít nhất Cảnh giới Trúc Cơ để giao lưu với các đạo hữu.'); showToast('Cần Trúc Cơ để vào đấu trường.', 'warn'); return; }
    if (state.currentEnemy) { log('Đang chiến đấu, không thể tìm đối thủ PvP.'); return; }
    connectMatchWS().then(ok => {
        if (!ok) { log('❌ Không thể kết nối PvP (hãy chạy server ws://localhost:8080).'); return; }
        const btn = $('findMatch');

        // Cancel finding
        if (window._findingMatch) {
            window._findingMatch = false;
            if (btn) btn.innerText = 'Tìm đối thủ PvP';
            wsSend({ type: 'cancel_find' }); // server may ignore; local toggle is enough
            log('🛑 Dừng tìm đối thủ PvP.');
            renderAll();
            return;
        }

        // Start finding
        window._findingMatch = true;
        if (btn) btn.innerText = 'Dừng tìm đối thủ PvP';
        const profile = buildPublicProfile();
        wsSend({ type: 'find_match', profile, token: profileToken() });
        log('🔍 Đang tìm đối thủ xếp hạng: chỉ ghép người cũng đang tìm và lệch tối đa 1 cảnh giới.');
        showToast('Đang tìm đối thủ xếp hạng...', 'info');
        renderAll();
    });
}

function endPvPSession() {
    stopPvPHeartbeat();
    stopAutoFight();
    pvpStopBoard();
    pvpSession.matchId = null;
    pvpSession.active = false;
    pvpSession.sessionId = null;
    pvpSession.opponentId = null;
    pvpSession.myTurn = false;
    pvpSession.started = false;
    state.currentEnemy = null;
    state.hp = state.totalMaxHp;
    window._battleActive = false;
    window._findingMatch = false;
    coopFinish(true);
    try {
        const btn = $('findMatch');
        if (btn) btn.innerText = 'Tìm đối thủ PvP';
    } catch { }

    if (typeof resetAllCooldowns === 'function') {
        resetAllCooldowns();
    }

    renderAll();
}
window.findMatchPvP = findMatchPvP; // expose globally for button handlers