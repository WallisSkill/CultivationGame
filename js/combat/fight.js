/* ===========================
    COMBAT: attackTurn, win/lose
=========================== */
function attackTurn() {
    if (!state.currentEnemy) { log('Không có kẻ thù để tấn công.'); return; }
    recalculateStats();

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
    const { playerBuff, enemyBuff } = applyElementalBuffs(state, enemy);

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
    if (!playerBuff.skip) {
        const edmg = computeDamage(
            enemy.str * enemyBuff.atk,
            enemy.elements, enemy.rootRank || 0, enemyRealmIndex, enemy.realmStage || 0,
            state.totalDef * playerBuff.def,
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

            log(`${enemy.name} phản kích, gây ${fmtVal(enemyFinalDmg)} sát thương.
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
        log(`${enemy.name} phản kích, gây ${fmtVal(enemyFinalDmg)} sát thương.
                    (Ngũ hành ${edmg.elePercent.toFixed(1)}%,
                    Phẩm chất x${edmg.rankFactor.toFixed(2)},
                    Cảnh giới x${edmg.realmFactor.toFixed(2)})`);
        updateBattleInfo(edmg, true);

        if (state.hp <= 0) {
            loseBattle();
            state.currentEnemy = null;
        }
    } else {
        log("💧 Linh căn Thủy vận chuyển — Ngươi né tránh phản kích hoàn toàn!");
    }

    renderAll();
}

function runFromBattle() {
    if (!state.currentEnemy) { log('Không có kẻ thù để chạy.'); return; }
    if (state.currentEnemy.isPvP && pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
        wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'end', data: { result: 'forfeit' } });
        endPvPSession();
        return;
    }
    window._battleActive = false;
    const cost = Math.floor(state.xp * 0.15);
    state.xp = Math.max(0, state.xp - cost);
    const name = state.currentEnemy?.name || 'đối thủ';
    state.currentEnemy = null;
    log(`🏃 Chạy khỏi ${name}, mất ${cost} tu vi (15%).`);
    renderAll();
}

function winBattle(enemy) {
    window._battleActive = false;
    const mult = enemy.rewardMult || 1;
    const baseXp = Math.floor((enemy.xp || 50) * mult);
    const baseGold = Math.floor((enemy.gold || 20) * mult);

    // ⚜️ Phần thưởng cơ bản
    let finalXp = baseXp;
    let finalGold = baseGold;

    // 🌸 Chiêu Yêu Phiến — nhân đôi phần thưởng
    if (state.relicEffects?.doubleReward > 0) {
        finalXp *= 2;
        finalGold *= 2;
        state.relicEffects.doubleReward--;
        log(`🌸 Chiêu Yêu Phiến mở ra — phần thưởng nhân đôi! (${state.relicEffects.doubleReward} lần còn lại)`);
        if (state.relicEffects.doubleReward <= 0) {
            log("✨ Chiêu Yêu Phiến hóa thành tro bụi, tiêu tán theo gió...");
        }
    }

    // 💰 Thưởng cơ bản
    state.gold += finalGold;
    gainXP(finalXp);
    log(`🏵️ Hạ ${enemy.name}! Nhận ${finalXp} tu vi và ${finalGold} vàng.`);

    // 🌌 Vượt cấp chi phúc — thưởng thêm khi địch mạnh hơn
    const realmDiff = (enemy.realmIndex ?? 0) - (state.realmIndex ?? 0);
    if (realmDiff > 0) {
        // thưởng % theo độ chênh
        const bonusFactor = 1 + realmDiff * 0.25; // mỗi cảnh giới cao hơn +25%
        const xpBonus = Math.floor(baseXp * bonusFactor);
        const goldBonus = Math.floor(baseGold * bonusFactor);
        const boost = 1 + realmDiff * 0.03; // mỗi cảnh giới cao hơn +3% tốc độ tu luyện

        state.xp += xpBonus;
        state.gold += goldBonus;
        state.cultivateBoost = (state.cultivateBoost || 1.0) * boost;

        log(`⚡ Vượt cấp chiến thắng! Cảnh giới chênh lệch ${realmDiff}, thưởng thêm +${xpBonus} tu vi, +${goldBonus} vàng.`);
        log(`💠 Đạo tâm dao động — tốc độ tu luyện vĩnh viễn tăng ${(boost * 100 - 100).toFixed(1)}%!`);
    }

    // Ghi nhớ phần thưởng cuối (để Double Reward hoặc log lại)
    state.lastReward = {
        type: 'xp',
        value: finalXp,
        gold: finalGold,
        desc: `${enemy.name} (${enemy.tier || 'Thường'})`
    };

    // 🎁 loot cơ bản (với xác suất tăng theo Phẩm & Chiêu Yêu Phiến)
    const lootMult = (state.relicEffects?.doubleReward ? 2 : 1.0);
    (enemy.baseTemplate?.loot || []).forEach(l => {
        const chance = 0.9 * Math.min(1.5, mult / 1.5) * lootMult;
        if (Math.random() < chance) {
            const itm = JSON.parse(JSON.stringify(l));
            if (itm.value) itm.value = Math.floor(itm.value * mult);
            addItemToInventory(itm);
        }
    });

    // 🎖️ Cơ hội rơi mảnh linh căn
    const fragChance = 0.2 * mult * lootMult;
    if (Math.random() < fragChance) {
        const rank = Math.min(6, Math.floor(2 + state.realmIndex / 4 + (enemy.rootRank || 0) / 3));
        const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
        addItemToInventory({
            name: `Mảnh ${el} ${ROOT_RANKS[rank]}`,
            type: 'root_frag',
            value: { elements: [el], rank },
            desc: 'Dùng 3 mảnh hợp thành linh căn'
        });
        log(`✨ Rơi mảnh linh căn Phẩm ${ROOT_RANKS[rank]}!`);
    }

    // 💎 Rơi thưởng đặc biệt (năng lực, tu vi, thọ nguyên)
    const bonusDropCount = Math.floor(mult * (0.5 + Math.random()));
    for (let i = 0; i < bonusDropCount; i++) {
        const roll = Math.random();
        if (roll < 0.3) {
            const p = Math.floor(3 + Math.random() * 6 + state.realmIndex);
            state.power += p;
            log(`🔥 Uy danh lan tỏa: Sức mạnh vĩnh viễn +${p}.`);
        } else if (roll < 0.6) {
            const val = Math.floor(60 + Math.random() * 120 * mult);
            addItemToInventory({ name: 'Linh Thạch Tăng Cấp', type: 'xp', value: val, desc: 'Dùng tăng tu vi' });
            log(`💎 Nhặt được Linh Thạch Tăng Cấp (+${val} tu vi).`);
        } else {
            const life = Math.floor(20 + Math.random() * 60 * mult);
            addItemToInventory({ name: 'Đan Thọ Nguyên', type: 'life', value: life, desc: 'Tăng tuổi thọ' });
            log(`🌿 May mắn rơi Đan Thọ Nguyên (+${life} thọ).`);
        }
    }

    // 🕊️ Nếu kẻ địch là Thánh Nhân — có xác suất ban phúc khí
    if (enemy.isSaint && Math.random() < 0.25) {
        const boost = 1.05 + Math.random() * 0.15;
        state.cultivateBoost = (state.cultivateBoost || 1.0) * boost;
        log(`💠 Linh khí Thánh Nhân còn vương — tốc độ tu luyện tăng ${(boost * 100 - 100).toFixed(1)}%!`);
    }

    renderInventory();
    checkRealmProgress();
}




function loseBattle() {
    window._battleActive = false;
    state.hp = 0;
    disableAllButtons();
    stopAging();
    log('💀 Ngươi ngã gục! Đạo tâm tan rã, không thể tiếp tục.');
    showRebirthButton();
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
    if (!('MATCH_WS_URL' in window)) window.MATCH_WS_URL = 'ws://localhost:8080';
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
    state.profileId = state.profileId || `p_${Date.now()}_${Math.floor(Math.random() * 1e5)}`;
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
        hp: state.totalMaxHp || state.maxHp || 100
    };
}

function wsSend(obj) {
    if (!window.matchWS || !window.matchConnected) return false;
    try { window.matchWS.send(JSON.stringify(obj)); return true; } catch { return false; }
}

function connectMatchWS() {
    return new Promise((resolve) => {
        if (window.matchWS && window.matchConnected) return resolve(true);
        log('🔌 Đang kết nối PvP...');
        try { window.matchWS = new WebSocket(matchURL); } catch { log('❌ Không thể khởi tạo kết nối PvP.'); return resolve(false); }
        window.matchWS.onopen = () => {
            window.matchConnected = true;
            log('✅ Kết nối PvP đã mở.');
            registerProfile();
            if (pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
                wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'resync_request', data: {} });
            }
            resolve(true);
        };
        window.matchWS.onclose = () => {
            window.matchConnected = false;
            $('toggleAuto').innerText = 'Dừng tu luyện auto';
            log('🔌 Kết nối PvP đã đóng.');
            // nếu đang tìm thì trả nút về trạng thái mặc định
            if (window._findingMatch) {
                window._findingMatch = false;
                const b = $('findMatch'); if (b) b.innerText = 'Tìm đối thủ PvP';
            }
            window._battleActive = false;
        };
        window.matchWS.onerror = () => { window.matchConnected = false; log('❌ Lỗi kết nối PvP.'); };
        window.matchWS.onmessage = onMatchMessage;
    });
}

// send forfeit on page closing to notify opponent
window.addEventListener('beforeunload', () => {
    try {
        if (pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
            wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'end', data: { result: 'forfeit' } });
        }
    } catch { }
});

// Heartbeat to detect opponent disconnect
function startPvPHeartbeat() {
    stopPvPHeartbeat();
    window._battleActive = true;
    pvpSession.oppLastHbTs = Date.now();
    window._pvpHbTimer = setInterval(() => {
        if (pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
            wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'hb', data: { t: Date.now() } });
            const gap = Date.now() - (pvpSession.oppLastHbTs || 0);
            if (gap > 4500) {
                log('🏳️ Đối thủ đã rời trận. Ngươi chiến thắng!');
                endPvPSession();
            }
        }
    }, 1500);
}
function stopPvPHeartbeat() { if (window._pvpHbTimer) { clearInterval(window._pvpHbTimer); window._pvpHbTimer = null; } }

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

function startPvPBattle(oppProfile) {
    const me = buildPublicProfile();
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
    log(pvpSession.myTurn ? '🎲 Ngươi ra tay trước.' : '🎲 Đối thủ ra tay trước.');
    startPvPHeartbeat();
}

// Faster heartbeat and timeout to auto-win when opponent refreshes
function startPvPHeartbeat() {
    stopPvPHeartbeat();
    pvpSession.oppLastHbTs = Date.now();
    window._pvpHbTimer = setInterval(() => {
        if (pvpSession.active && pvpSession.opponentId && pvpSession.sessionId) {
            wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'hb', data: { t: Date.now() } });
            const gap = Date.now() - (pvpSession.oppLastHbTs || 0);
            if (gap > 4500) {
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
        startPvPBattle(msg.opponent);
        return;
    }

    if (msg.type === 'pvp_relay' && msg.from && msg.sessionId && msg.kind) {
        if (!pvpSession.sessionId || msg.sessionId !== pvpSession.sessionId) return;

        switch (msg.kind) {
            case 'hb': {
                pvpSession.oppLastHbTs = Date.now();
                break;
            }
            case 'attack': {
                // Structured payload from attacker side
                const miss = !!msg.data?.miss;
                const baseDmg = Math.max(0, Math.floor(msg.data?.damage || 0));
                const burnExtra = Math.max(0, Math.floor(msg.data?.burn || 0));
                const total = Math.max(0, baseDmg + burnExtra);

                // Build snapshots only for logging (no RNG here)
                const attacker = {
                    str: state.currentEnemy?.str || 10,
                    def: state.currentEnemy?.def || 0,
                    realmIndex: state.currentEnemy?.realmIndex || 0,
                    realmStage: state.currentEnemy?.realmStage || 0,
                    rootRank: state.currentEnemy?.rootRank || 0,
                    elements: state.currentEnemy?.elements || []
                };
                const defender = {
                    str: state.power || 10,
                    def: state.defense || 5,
                    realmIndex: state.realmIndex || 0,
                    realmStage: state.realmStage || 0,
                    rootRank: state.root?.rank || 0,
                    elements: state.root?.elements || []
                };

                // Use provided detail if exists, otherwise recompute for log only
                const det = (msg.data?.detail && typeof msg.data.detail === 'object')
                    ? msg.data.detail
                    : pvpComputeDetail(attacker, defender);

                if (!miss) {
                    state.hp = Math.max(0, state.hp - total);
                }
                const name = state.currentEnemy?.name || 'Đối thủ';
                pvpLogHit(`${name}`, total, det, burnExtra, miss);

                if (state.hp <= 0 && !miss) {
                    log(`${name} tung sát thương quyết định lên người ngươi!`);
                    log('💀 Ngươi bại trận trong PvP.');
                    wsSend({ type: 'pvp_relay', to: pvpSession.opponentId, sessionId: pvpSession.sessionId, kind: 'end', data: { result: 'win' } });
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
                    log('🏳️ Đối thủ đã rời trận. Ngươi chiến thắng!');
                    if (window.grantAllSaintsRewardFree) window.grantAllSaintsRewardFree('pvp_win_remote');
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
    // Prefer detailed function if available
    if (typeof computeDamageDetailed === 'function') {
        return computeDamageDetailed(
            attacker.str || 10, attacker.elements || [], attacker.rootRank || 0, attacker.realmIndex || 0, attacker.realmStage || 0,
            defender.def || 0, defender.elements || [], defender.rootRank || 0, defender.realmIndex || 0, defender.realmStage || 0
        );
    }
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

    // Apply elemental buffs like attackTurn(): includes logs and side effects (heal, etc.)
    let playerBuff = { atk: 1, def: 1, skip: false, burn: 0 };
    let enemyBuff = { atk: 1, def: 1, skip: false, burn: 0 };
    if (typeof applyElementalBuffs === 'function') {
        try {
            const buffs = applyElementalBuffs(
                { name: me.name, realmIndex: me.realmIndex, realmStage: me.realmStage, root: { rank: me.rootRank, elements: me.elements }, elements: me.elements, totalMaxHp: state.totalMaxHp, maxHp: state.maxHp, hp: state.hp },
                { name: opp.name, realmIndex: opp.realmIndex, realmStage: opp.realmStage, rootRank: opp.rootRank, elements: opp.elements, maxHp: state.currentEnemy?.maxHp, hp: state.currentEnemy?.hp }
            );
            playerBuff = buffs.playerBuff || playerBuff;
            enemyBuff = buffs.enemyBuff || enemyBuff;
        } catch { }
    }

    // Enemy dodge (skip) from their elemental effect
    const wasDodge = enemyBuff.skip;

    let baseDamage = 0;
    let burnExtra = 0;
    let detail = { final: 0, elementFactor: 1, rankFactor: 1, realmFactor: 1, elePercent: 0 };

    if (!wasDodge) {
        // Compute damage using current buffs
        const att = {
            str: Math.floor((me.str || 10) * (playerBuff.atk || 1)),
            elements: me.elements, rootRank: me.rootRank,
            realmIndex: me.realmIndex, realmStage: me.realmStage
        };
        const def = {
            def: Math.floor((opp.def || 0) * (enemyBuff.def || 1)),
            elements: opp.elements, rootRank: opp.rootRank,
            realmIndex: opp.realmIndex, realmStage: opp.realmStage
        };
        detail = pvpComputeDetail(att, def);
        baseDamage = Math.max(1, Math.floor(detail.final || 1));
        // Burn adds extra damage proportional to damage (like attackTurn burn percent)
        if (playerBuff.burn) burnExtra = Math.max(1, Math.floor(baseDamage * playerBuff.burn));
    }

    const total = wasDodge ? 0 : (baseDamage + burnExtra);

    // Apply locally to opponent
    if (!wasDodge) {
        state.currentEnemy.hp = Math.max(0, (state.currentEnemy.hp || 0) - total);
    }
    pvpLogHit('🗡️ Ngươi', total, detail, burnExtra, wasDodge);

    // Send structured payload so opponent mirrors effects without RNG
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
                detail
            }
        });
    }
    pvpSession.myTurn = false;

    if (state.currentEnemy.hp <= 0 && !wasDodge) {
        log('🎉 Ngươi thắng PvP!');
        if (window.grantAllSaintsRewardFree) window.grantAllSaintsRewardFree('pvp_win_local');
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
        state.autoTrain = false;
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
    try {
        const btn = document.getElementById('toggleAuto');
        if (btn) btn.textContent = 'Bắt đầu tu luyện auto';
    } catch { }
    log('🔒 Đang chiến đấu — tự động tu luyện đã dừng.');
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
            return;
        }

        // Start finding
        window._findingMatch = true;
        if (btn) btn.innerText = 'Dừng tìm đối thủ PvP';
        const profile = buildPublicProfile();
        wsSend({ type: 'find_match', profile });
        log('🔍 Đang tìm đối thủ PvP (ưu tiên cùng cảnh giới)...');
    });
}

function endPvPSession() {
    stopPvPHeartbeat();
    pvpSession.active = false;
    pvpSession.sessionId = null;
    pvpSession.opponentId = null;
    pvpSession.myTurn = false;
    pvpSession.started = false;
    state.currentEnemy = null;
    state.hp = state.totalMaxHp;
    // NEW: always reset finding state and disconnect WS after a match finishes
    window._findingMatch = false;
    try {
        const btn = $('findMatch');
        if (btn) btn.innerText = 'Tìm đối thủ PvP';
    } catch { }
    try {
        // small delay to allow final messages to flush (best-effort)
        setTimeout(() => {
            if (window.matchWS) {
                try { window.matchWS.close(); } catch { }
                window.matchWS = null;
                window.matchConnected = false;
            }
        }, 200);
    } catch { }

    renderAll();
}
window.findMatchPvP = findMatchPvP; // expose globally for button handlers