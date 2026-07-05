/* ===========================================================
        HỆ THỐNG LỤC THÁNH — BỔ SUNG, KHÔNG CHỈNH CODE GỐC
=========================================================== */
const SAINTS = [
    {
        name: "Thái Thanh Thánh Nhân",
        realm: 18,
        realmStage: 2,
        desc: "Phòng thủ tuyệt đối, phú giáp thiên hạ, có xác suất nhận Thái Cực Đồ (bất tử 3 lần)",
        onTalk: () => {
            // 🛡️ Phòng ngự vĩnh viễn tăng 50%
            state.defense = Math.floor(state.defense * 1.5);
            log("🌀 Thái Thanh ban phúc — Phòng ngự tăng vĩnh viễn 50%!");

            // 💰 Tài vận vô biên
            const goldGain = Math.floor(10000 + Math.random() * 20000 * (1 + state.realmIndex * 0.2));
            state.gold += goldGain;
            log(`💰 Thái Thanh mở kho Linh Bảo — Ngươi nhận được ${goldGain.toLocaleString()} linh thạch!`);

            // ✨ Có cơ hội ban thêm pháp bảo
            if (Math.random() < 0.3 + state.luckBonus) {
                const relic = { name: "Thái Cực Đồ", type: "relic", uses: 3, effect: "Bất tử 3 lần tấn công" };

                // 🪶 Không cho trùng (chỉ 1 lần trong túi)
                const exists = state.inventory.some(i => i.name === relic.name && i.type === "relic");
                if (exists) {
                    log("⚠️ Thái Cực Đồ đã có trong túi, Thánh Bảo không thể song tồn.");
                } else {
                    state.inventory.push(relic);
                    log("🎁 Đạo vận tương sinh — nhận được Thái Cực Đồ!");
                }
            }
            // 🌈 Tăng thêm chút phúc vận
            state.luckBonus = (state.luckBonus || 0) + 0.05;
            log("💠 Khí vận của ngươi dâng trào — may mắn +5%!");
        },
        elements: ["Thủy", "Thổ", "Hỏa", "Kim", "Mộc"],
        drop: { name: "Thái Cực Đồ", type: "relic", uses: 3, effect: "Bất tử 3 lần tấn công" }
    },
    {
        name: "Thông Thiên Giáo Chủ",
        realm: 18,
        realmStage: 1,
        desc: "Sát thương cực cao, có xác suất nhận Tru Tiên Kiếm (có thể kết liễu tức khắc)",
        onTalk: () => {
            state.power = Math.floor(state.power * 1.6);
            log("⚡ Thông Thiên truyền đạo — Sức mạnh tăng 60%!");
            if (Math.random() < 0.3 + state.luckBonus) {
                const relic = { name: "Tru Tiên Kiếm", type: "relic", uses: 3, effect: "Có cơ hội giết địch ngay lập tức" };
                const exists = state.inventory.some(i => i.name === relic.name && i.type === "relic");
                if (exists) {
                    log("⚠️ Tru Tiên Kiếm đã có trong túi, không thể song tồn!");
                } else {
                    state.inventory.push(relic);
                    log("🎁 Linh kiếm tự sinh — nhận được Tru Tiên Kiếm!");
                }
            }
            if (state.learnedSkillFromSaint === false && Math.random() < 0.4 && !state.skills?.learned?.thong_thien_van_kiem) {
                addItemToInventory({
                    name: '🌪️ Thông Thiên Vạn Kiếm',
                    type: 'manual',
                    skillId: 'thong_thien_van_kiem',
                    desc: 'Chân truyền Thông Thiên — Xoáy sát thương 300% ATK + 15% HP địch, cooldown 3 round, bị động tăng 20% ATK'
                });
                log("⚡ Thông Thiên truyền thụ Thông Thiên Vạn Kiếm!");
                state.learnedSkillFromSaint = true;
            }
        },
        elements: ["Thủy", "Thổ", "Hỏa", "Kim", "Mộc"],
        drop: { name: "Tru Tiên Kiếm", type: "relic", uses: 3, effect: "Có cơ hội giết địch ngay lập tức" }
    },
    {
        name: "Nguyên Thủy Thiên Tôn",
        realm: 18,
        realmStage: 1,
        desc: "Sinh mệnh vô tận, có xác suất nhận Tam Bảo Ngọc Như Ý (phản 75% sát thương 3 lần)",
        onTalk: () => {
            state.maxHp += state.maxHp * 1.25;

            const bonusHp = typeof getEquippedHp === 'function' ? getEquippedHp() : 0;
            state.totalMaxHp = state.maxHp + bonusHp;

            state.hp = state.totalMaxHp;

            log(`💧 Nguyên Thủy truyền pháp — HP tối đa gấp 1.25 lần (${state.totalMaxHp}), đã hồi full!`);

            if (Math.random() < 0.3 + state.luckBonus) {
                const relic = { name: "Tam Bảo Ngọc Như Ý", type: "relic", uses: 3, effect: "Phản 75% sát thương trong 3 lượt" };
                const exists = state.inventory.some(i => i.name === relic.name && i.type === "relic");
                if (exists) {
                    log("⚠️ Tam Bảo Ngọc Như Ý đã có trong túi, không thể song tồn!");
                } else {
                    state.inventory.push(relic);
                    log("🎁 Ngọc như ý tự hiện — nhận được Tam Bảo Ngọc Như Ý!");
                }

            }

            if (state.learnedSkillFromSaint === false && Math.random() < 0.4 && !state.skills?.learned?.nguyen_thuy_hon_don) {
                addItemToInventory({
                    name: '🌌 Nguyên Thủy Hỗn Độn Chưởng Pháp',
                    type: 'manual',
                    skillId: 'nguyen_thuy_hon_don',
                    desc: 'Chân truyền Nguyên Thủy — 450% ATK + 12% HP địch + 40% lifesteal (CD 4)'
                });
                log("🌌 Nguyên Thủy truyền thụ Hỗn Độn Chưởng Pháp!");
            }
        }
        ,
        elements: ["Thủy", "Thổ", "Hỏa", "Kim", "Mộc"],
        drop: { name: "Tam Bảo Ngọc Như Ý", type: "relic", uses: 3, effect: "Phản 75% sát thương trong 3 lượt" }
    },
    {
        name: "Nữ Oa Nương Nương",
        realm: 17,
        realmStage: 2,
        desc: "Tăng Phẩm chất linh căn, có xác suất tăng 2 bậc hoặc hợp nhất thêm linh căn khác, có xác suất nhận Chiêu Yêu Phiến(Phần thưởng quái x2 trong 3 lần)",
        onTalk: () => {
            const chance = Math.random();
            let cultivateInc = 0; // 🌿 tốc độ tu luyện tăng thêm sau mỗi thay đổi
            let logMsg = "";

            if (chance < 0.2) {
                // 🌈 Nữ Oa hiển linh — có thể ban 1 đến 3 linh căn còn thiếu
                const possible = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
                const missing = possible.filter(el => !state.root.elements.includes(el));

                if (missing.length > 0) {
                    // 🎲 Nữ Oa quyết định ban bao nhiêu căn (1–3 hoặc hết nếu gần đủ)
                    const addCount = Math.min(missing.length, Math.floor(Math.random() * 3) + 1);

                    for (let i = 0; i < addCount; i++) {
                        const el = missing.splice(Math.floor(Math.random() * missing.length), 1)[0];
                        state.root.elements.push(el);
                    }

                    // ⚡ Mỗi căn mới tăng mạnh tốc độ tu luyện (+10% mỗi căn)
                    const cultivateInc = addCount * 0.20;
                    state.cultivateBoost = (state.cultivateBoost || 1.0) * (1 + cultivateInc);

                    if (state.root.elements.length === 5) {
                        logMsg = `🌌 Nữ Oa hợp ngũ linh — Linh căn của ngươi đã viên mãn! (${state.root.elements.join(" + ")}) 🌈`;
                    } else {
                        logMsg = `🌈 Nữ Oa truyền khí — Linh căn của ngươi mở rộng thêm ${addCount} căn! (${state.root.elements.join(" + ")})`;
                    }
                } else {
                    // Đã đủ 5 căn
                    logMsg = "🌈 Nữ Oa mỉm cười — Linh căn của ngươi đã đạt cực hạn Hỗn Nguyên, không thể mở thêm.";
                    const up = Math.random() < 0.2 ? 2 : 1;
                    if (state.root.rank < 7) {
                        // 🌸 Nâng Phẩm chất linh căn
                        const oldRank = ROOT_RANKS[state.root.rank];
                        state.root.rank = Math.min(7, state.root.rank + up);
                        const newRank = ROOT_RANKS[state.root.rank];
                        logMsg = `🌸 Nữ Oa ân điển — Phẩm chất linh căn tăng ${up} bậc: ${oldRank} → ${newRank}!`;
                    }
                    else {
                        logMsg = "🌈 Nữ Oa mỉm cười — Phẩm chất Linh căn của ngươi đã đạt cực hạn có thể tác động của thánh nhân.";
                    }
                    cultivateInc += up * 0.08;
                }
            }
            else {
                const up = Math.random() < 0.2 ? 2 : 1;
                if (state.root.rank < 7) {
                    // 🌸 Nâng Phẩm chất linh căn
                    const oldRank = ROOT_RANKS[state.root.rank];
                    state.root.rank = Math.min(7, state.root.rank + up);
                    const newRank = ROOT_RANKS[state.root.rank];
                    logMsg = `🌸 Nữ Oa ân điển — Phẩm chất linh căn tăng ${up} bậc: ${oldRank} → ${newRank}!`;
                }
                else {
                    logMsg = "🌈 Nữ Oa mỉm cười — Phẩm chất Linh căn của ngươi đã đạt cực hạn có thể tác động của thánh nhân.";
                }
                cultivateInc += up * 0.08; // mỗi bậc tăng +8% tốc độ tu luyện

            }

            // 💮 Thêm tốc độ tu luyện (vĩnh viễn)
            if (cultivateInc > 0) {
                state.cultivateBoost = (state.cultivateBoost || 1.0) * (1 + cultivateInc);
                const boostPercent = ((state.cultivateBoost - 1) * 100).toFixed(1);
                log(`${logMsg} 🌠 Tốc độ tu luyện hiện tại: +${boostPercent}%`);
            } else {
                log(logMsg);
            }

            // 💮 Nữ Oa cũng có cơ duyên sinh bảo (30%)
            if (Math.random() < 0.3 + state.luckBonus) {
                const relic = { name: "Chiêu Yêu Phiến", type: "relic", uses: 3, effect: "Phần thưởng quái x2 trong 3 lần" };
                const exists = state.inventory.some(i => i.name === relic.name && i.type === "relic");
                if (exists) {
                    log("⚠️ Chiêu Yêu Phiến đã có trong túi, không thể song tồn!");
                } else {
                    state.inventory.push(relic);
                    log("🎁 Nữ Oa linh quang — nhận được Chiêu Yêu Phiến!");
                }

            }
        },
        elements: ["Thủy", "Thổ", "Hỏa", "Kim", "Mộc"],
        drop: { name: "Chiêu Yêu Phiến", type: "relic", uses: 3, effect: "Phần thưởng quái x2 trong 3 lần" }
    }
    ,
    {
        name: "Chuẩn Đề Đạo Nhân",
        realm: 17,
        realmStage: 1,
        desc: "Giảm chênh lệch cảnh giới (tăng tiểu cảnh giới), có xác suất nhận Thất Bảo Diệu Thọ (thu phục vũ khí địch)",
        onTalk: () => {
            if (state.realmStage < STAGES.length - 1) {
                state.realmStage++;
                smallStageGain();
                log(`✨ Chuẩn Đề điểm hóa — Tiểu cảnh giới tăng lên: ${STAGES[state.realmStage]}!`);
            } else {
                log("🌿 Chuẩn Đề bảo hộ — Ngươi đã đạt Đại Viên Mãn, không thể thăng tiểu cảnh thêm nữa!");
                attemptMajorBreakthrough(true);
                log(`🌿 Chuẩn Đề điểm hóa — Đại cảnh giới tăng lên: ${REALMS[state.realmIndex]}!`);
            }
            if (Math.random() < 0.3 + state.luckBonus) {
                const relic = { name: "Thất Bảo Diệu Thọ", type: "relic", uses: 2, effect: "Thu phục vũ khí địch, 2 lần" };
                const exists = state.inventory.some(i => i.name === relic.name && i.type === "relic");
                if (exists) {
                    log("⚠️ Thất Bảo Diệu Thọ đã có trong túi, không thể song tồn!");
                } else {
                    state.inventory.push(relic);
                    log("🎁 Bảo thọ tự hiện — nhận được Thất Bảo Diệu Thọ!");
                }
            }
        },
        elements: ["Thủy", "Thổ", "Hỏa", "Kim", "Mộc"],
        drop: { name: "Thất Bảo Diệu Thọ", type: "relic", uses: 2, effect: "Thu phục vũ khí địch, 2 lần" }
    },
    {
        name: "Tiếp Dẫn Đạo Nhân",
        realm: 17,
        realmStage: 1,
        desc: "Có 30% cơ hội triệu hồi Tam Thanh hiển linh, nếu không chỉ tăng may mắn +10%",
        onTalk: () => {
            const chance = Math.random();

            if (chance < 0.3) {
                // 🌌 Tam Thanh hiển linh
                log("🌠 Tiếp Dẫn khai thị — Linh quang xoay chuyển, cánh cửa Tam Thanh hiển hiện giữa hư không!");

                //Danh sách Tam Thanh từ SAINTS
                const tamThanh = SAINTS.filter(x =>
                    ["Thái Thanh Thánh Nhân", "Thông Thiên Giáo Chủ", "Nguyên Thủy Thiên Tôn"].includes(x.name)
                );

                // Chọn ngẫu nhiên một Thánh Nhân
                const chosen = tamThanh[Math.floor(Math.random() * tamThanh.length)];

                log(`✨ Tam Thanh linh cảm — ${chosen.name} giáng thế!`);
                if (typeof chosen.onTalk === "function") {
                    chosen.onTalk(); // Gọi luôn hành động của vị Thánh được chọn
                } else {
                    log(`⚠️ ${chosen.name} hiện chưa truyền pháp nào.`);
                }

                // 💎 10% cơ hội ban thêm Tiếp Dẫn Bảo Tràng
                if (Math.random() < 0.1 + state.luckBonus) {
                    const relic = { name: "Tiếp Dẫn Bảo Tràng", type: "relic", uses: 1, effect: "Gọi Tam Thanh một lần" };
                    const exists = state.inventory.some(i => i.name === relic.name && i.type === "relic");
                    if (exists) {
                        log("⚠️ Tiếp Dẫn Bảo Tràng đã có trong túi, không thể song tồn!");
                    } else {
                        state.inventory.push(relic);
                        log("🎁 Tam Thanh tương cảm — nhận được Tiếp Dẫn Bảo Tràng!");
                    }
                }
            } else {
                // 🌈 Không trúng Tam Thanh, chỉ được may mắn
                state.luckBonus = (state.luckBonus || 0) + 0.1;
                log("💫 Tiếp Dẫn mỉm cười — Tam Thanh chưa hiển linh, nhưng vận khí của ngươi tăng +10%!");
            }
        },
        elements: ["Thủy", "Thổ", "Hỏa", "Kim", "Mộc"],
        drop: { name: "Tiếp Dẫn Bảo Tràng", type: "relic", uses: 1, effect: "Gọi Tam Thanh một lần" }
    },
    {
        name: "Đạo Tổ",
        realm: 25,
        realmStage: 3,
        desc: "🔥 Đấng sáng tạo — Mở rộng Trận Pháp Bảo lên 9 ô ngay lập tức! Cơ hội rất hiếm!",
        onTalk: () => {
            // 🔥 Increase board slots by 1 (max 9)
            const currentSlots = state.maxBoardSlots || LB_BOARD_SLOTS;
            if (currentSlots < 9) {
                state.maxBoardSlots = currentSlots + 1;
                log(`🔥 Đạo Tổ ban phúc — Trận Pháp Bảo mở rộng lên ${state.maxBoardSlots} ô!`);
            } else {
                log("⚜️ Trận Pháp Bảo của ngươi đã đạt cực đại 9 ô!");
            }

            // 💰 Massive gold reward
            const goldGain = Math.floor(50000 + Math.random() * 100000 * (1 + state.realmIndex * 0.3));
            state.gold += goldGain;
            log(`💰 Đạo Tổ mở kho bảo — Ngươi nhận được ${goldGain.toLocaleString()} linh thạch!`);

            // ✨ Increase max HP significantly
            state.maxHp = Math.floor(state.maxHp * 1.5);
            const bonusHp = typeof getEquippedHp === 'function' ? getEquippedHp() : 0;
            state.totalMaxHp = state.maxHp + bonusHp;
            state.hp = state.totalMaxHp;
            log(`💖 Đạo Tổ ban phép — HP tối đa gấp 1.5 lần (${state.totalMaxHp}), đã hồi full!`);

            // ⚡ Increase power significantly
            state.power = Math.floor(state.power * 1.8);
            log(`⚡ Đạo Tổ truyền đạo — Sức mạnh tăng 80%!`);

            // 🌟 Increase defense significantly
            state.defense = Math.floor(state.defense * 1.5);
            log(`🛡️ Đạo Tổ ban phúc — Phòng ngự tăng 50%!`);

            // 💠 Massive luck boost
            state.luckBonus = (state.luckBonus || 0) + 0.15;
            log(`🍀 Đạo Tổ ban phước — May mắn +15%!`);

            // 📜 Chance to get a legendary skill
            if (Math.random() < 0.5 && !state.skills?.learned?.nguyen_thuy_hon_don) {
                addItemToInventory({
                    name: '🌌 Nguyên Thủy Hỗn Độn Chưởng Pháp',
                    type: 'manual',
                    skillId: 'nguyen_thuy_hon_don',
                    desc: 'Chân truyền Đạo Tổ — 450% ATK + 12% HP địch + 40% lifesteal (CD 4)'
                });
                log("🌌 Đạo Tổ truyền thụ Hỗn Độn Chưởng Pháp!");
            }
        },
        elements: ["Thủy", "Thổ", "Hỏa", "Kim", "Mộc"],
        drop: null // Đạo Tổ doesn't drop items, the blessing is the reward
    }

];

// Thêm giới hạn phúc của thánh: sau 15 lần không nhận buff nữa
const MAX_SAINT_BLESS = 15;
function saintBlessingAllowed() {
    state.saintBlessCount = state.saintBlessCount || 0;
    return state.saintBlessCount < MAX_SAINT_BLESS;
}
function callSaintOnTalk(saint) {
    if (!saint || typeof saint.onTalk !== 'function') return false;
    if (!saintBlessingAllowed()) {
        log('🔒 Ngươi đã nhận đủ cơ duyên từ Thánh Nhân. Từ nay chỉ có thể thỉnh chiến hoặc rời đi.');
        return false;
    }
    state.saintBlessCount++;
    showLegend(saint.name);
    saint.onTalk();
    return true;
}

// Guarded: add free-bypass for callSaintOnTalk to not consume blessing limit
(function patchCallSaintOnTalk() {
    if (window.__patchedCallSaintOnTalk) return;
    window.__patchedCallSaintOnTalk = true;

    const _oldCall = (typeof window.callSaintOnTalk === 'function') ? window.callSaintOnTalk : null;

    window.callSaintOnTalk = function (saint, opts = {}) {
        const free = !!opts.free;
        if (!saint || typeof saint.onTalk !== 'function') return false;

        // If not free and old function exists, delegate to original
        if (!free && typeof _oldCall === 'function') {
            return _oldCall(saint);
        }

        // Free: bypass limit, do not consume saintBlessCount
        const before = state.saintBlessCount || 0;
        showLegend(saint.name);
        try { saint.onTalk(); } catch { }
        state.saintBlessCount = before;
        return true;
    };
})();

// Reward API: grant one free meet for all saints (does not consume max count)
(function exposeAllSaintsReward() {
    if (window.grantAllSaintsRewardFree) return;

    window.grantAllSaintsRewardFree = function (reason = 'victory') {
        try {
            if (!Array.isArray(SAINTS) || SAINTS.length === 0) return;
            log(`🎁 Phần thưởng chiến thắng — Lục Thánh giáng lâm (miễn giới hạn).`);
            SAINTS.forEach(s => {
                try {
                    window.callSaintOnTalk(s, { free: true, reason });
                    log(`✨ ${s.name} ban phúc vô điều kiện, thực lực tăng mạnh.`);
                } catch { }
            });
            log(`🎉 Yến hội Lục Thánh kết thúc.`);
        } catch { }
    };
})();

// Reward: meet all six saints once, for free, without consuming max limit
window.grantAllSaintsRewardFree = function (reason = 'victory') {
    try {
        if (!Array.isArray(SAINTS) || SAINTS.length === 0) return;
        log(`🎁 Phần thưởng chiến thắng — Lục Thánh giáng lâm (miễn giới hạn).`);
        SAINTS.forEach(s => {
            try {
                window.callSaintOnTalk(s, { free: true, reason });
                log(`✨ ${s.name} ban phúc vô điều kiện, thực lực tăng mạnh.`);
            } catch { }
        });
        log(`🎉 Yến hội Lục Thánh kết thúc.`);
    } catch { }
};

function useRelic(relicName) {
    const relic = state.inventory.find(r => r.name === relicName && r.type === 'relic');
    if (!relic) {
        log(`Không tìm thấy bảo vật "${relicName}" trong túi.`);
        return;
    }

    switch (relic.name) {
        case "Thái Cực Đồ":
            state.relicEffects = state.relicEffects || {};
            state.relicEffects.immortal = 1; // bất tử 3 lần
            log("☯️ Thái Cực Đồ kích hoạt! Ngươi được bảo hộ khỏi cái chết 1 lần!");
            break;

        case "Tru Tiên Kiếm":
            state.relicEffects = state.relicEffects || {};
            state.relicEffects.instantKill = 1; // 3 lần có thể giết địch ngay lập tức
            log("⚔️ Tru Tiên Kiếm rung động! Sát ý tràn ngập, có thể kết liễu tức khắc kẻ địch!");
            break;

        case "Tam Bảo Ngọc Như Ý":
            state.relicEffects = state.relicEffects || {};
            state.relicEffects.reflect = 1; // phản 3 lần 75%
            log("💎 Tam Bảo Ngọc Như Ý tỏa sáng! Mọi sát thương nhận vào sẽ phản lại 75% trong 3 lần.");
            break;

        case "Chiêu Yêu Phiến":
            state.relicEffects = state.relicEffects || {};
            state.relicEffects.doubleReward = 1; // thưởng x2 trong 3 trận
            log("🌸 Chiêu Yêu Phiến mở ra — phần thưởng từ quái sẽ nhân đôi trong 3 lần chiến thắng!");
            break;

        case "Thất Bảo Diệu Thọ":
            state.relicEffects = state.relicEffects || {};
            state.relicEffects.weaponCapture = 1;
            log("✨ Thất Bảo Diệu Thọ bay ra! Có thể thu phục vũ khí của kẻ địch 2 lần!");
            break;

        case "Tiếp Dẫn Bảo Tràng":
            log("🌠 Tiếp Dẫn Bảo Tràng mở ra — Tam Thanh hiển linh, may mắn của ngươi tăng vọt!"); state.luckBonus = (state.luckBonus || 0) + 0.2;

            const tamThanh = SAINTS.filter(x =>
                ["Thái Thanh Thánh Nhân", "Thông Thiên Giáo Chủ", "Nguyên Thủy Thiên Tôn"].includes(x.name)
            );

            const chosen = tamThanh[Math.floor(Math.random() * tamThanh.length)];

            log(`✨ Linh cảm giao hòa — ${chosen.name} giáng thế!`);
            // Sử dụng guard: nếu đã đủ 15, không nhận buff nữa
            if (!callSaintOnTalk(chosen)) {
                log(`🙏 ${chosen.name} điểm hóa: Cơ duyên đã mãn, từ nay hãy tự bước đi.`);
            }

            log("💫 Tiếp Dẫn Bảo Tràng tiêu tán — cánh cửa Tam Thanh khép lại.");
            state.inventory.splice(state.inventory.indexOf(relic), 1);
            renderInventory()
            break;


        default:
            log(`🔮 ${relic.name} phát sáng nhưng chưa hiểu cách vận dụng...`);
            return;
    }

    relic.uses--;
    if (relic.uses <= 0) {
        state.inventory = state.inventory.filter(r => r !== relic);
        log(`🪙 Bảo vật ${relic.name} đã hết hạn sử dụng và biến mất khỏi túi.`);
    }
}

// Truyền thuyết về các Thánh Nhân
const LEGENDS = [
    {
        name: "Thái Thanh Thánh Nhân",
        story: `Thái Thanh Thánh Nhân, vị Thánh đầu tiên của nhân loại, đã mang đến ánh sáng tri thức và văn minh. Ngài đã chiến đấu chống lại bóng tối và hỗ trợ các thế hệ sau này bằng sự khôn ngoan và sức mạnh phi thường.`
    },
    {
        name: "Thông Thiên Giáo Chủ",
        story: `Thông Thiên Giáo Chủ, người đã vén màn bí ẩn của vũ trụ và chỉ dẫn chúng sinh đến gần hơn với chân lý. Ngài sở hữu thanh kiếm sắc bén có thể chém đứt mọi huyền bí.`
    },
    {
        name: "Nguyên Thủy Thiên Tôn",
        story: `Nguyên Thủy Thiên Tôn, vị Thánh của sự sống và cái chết, người đã mang đến cho nhân loại hiểu biết về vòng luân hồi và sự chuyển mình của sinh mệnh.`
    },
    {
        name: "Nữ Oa Nương Nương",
        story: `Nữ Oa Nương Nương, vị Thánh mẫu của muôn loài, người đã hy sinh thân mình để cứu rỗi nhân loại khỏi đại nạn, mang đến sự sống và sự tiếp nối cho các thế hệ sau.`
    },
    {
        name: "Chuẩn Đề Đạo Nhân",
        story: `Chuẩn Đề Đạo Nhân, người đã chỉ ra con đường tu luyện thành chính quả, giúp chúng sinh thoát khỏi khổ ải và đạt được sự viên mãn trong cuộc sống.`
    },
    {
        name: "Tiếp Dẫn Đạo Nhân",
        story: `Tiếp Dẫn Đạo Nhân, người đã mở ra cánh cửa dẫn đến những chân trời mới, nơi mà nhân loại có thể giao lưu và học hỏi với các sinh mệnh cao cấp hơn.`
    },
    {
        name: "Đạo Tổ",
        story: `Đạo Tổ, đấng sáng tạo nguyên thủy, ngọn nguồn của vạn vật. Ngài là tồn tại vĩnh cửu trước cả thiên địa, mang trong mình quyền năng sáng tạo và hủy diệt. Ngài chưa bao giờ thực sự rời khỏi cõi ta bởi Ngài ở khắp nơi như là quy luật của vũ trụ. Gặp được Đạo Tổ là cơ duyên vi diệu nhất trong thiên hạ.`
    }
];

function showLegend(saintName) {
    const legend = LEGENDS.find(l => l.name === saintName);
    if (!legend) {
        log("📜 Không tìm thấy truyền thuyết cho vị Thánh này.");
        return;
    }
    log(`📜 Truyền thuyết về ${legend.name}: ${legend.story}`);
}

function encounterRandomSaint(source = 'unknown') {
    if (!Array.isArray(SAINTS) || SAINTS.length === 0) {
        log('🌌 Thiên giới vắng lặng — chưa thể gặp Thánh Nhân.');
        return false;
    }
    const saint = SAINTS[Math.floor(Math.random() * SAINTS.length)];
    log(`🕯️ ${saint.name} giáng thế!`);

    const bless = () => {
        const blessed = typeof window.callSaintOnTalk === 'function'
            ? window.callSaintOnTalk(saint)
            : (saint.onTalk?.(), true);
        if (!blessed) log('🙏 Thánh Nhân chỉ mỉm cười, cơ duyên lần này khép lại.');
        if (typeof renderAll === 'function') renderAll();
    };
    const battle = () => startSaintChallenge(saint, source);

    if (typeof showDialog === 'function') {
        showDialog({
            message: `${saint.name} hạ phàm, đại nhân chọn con đường nào?`,
            buttons: [
                { text: 'Thỉnh giáo', value: 'bless', variant: 'primary' },
                { text: 'Thách đấu', value: 'battle' },
                { text: 'Rời đi', value: 'leave' }
            ]
        }).then(choice => {
            if (choice === 'battle') battle();
            else if (choice === 'leave') log('🙏 Ngươi khom người hành lễ, Thánh Nhân mỉm cười rồi rời đi.');
            else bless();
        });
        return true;
    }

    const choice = parseInt(prompt(
        `${saint.name} hạ phàm, đại nhân chọn con đường nào?\n` +
        `1) Thỉnh giáo — nhận ban phúc\n` +
        `2) Thách đấu — luận đạo bằng kiếm`
    ) || '1', 10);
    if (choice === 2) {
        battle();
        return true;
    }
    bless();
    return true;
}

/* ================================================
   ENCOUNTER DAO TO - The rarest and strongest saint
   ================================================ */
function encounterDaoTo(source = 'unknown') {
    const daoToSaint = SAINTS.find(s => s.name === 'Đạo Tổ');
    if (!daoToSaint) {
        log('🌌 Đạo Tổ chưa hiện thân — cơ duyên chưa đến.');
        return false;
    }
    log(`🕯️🔥 ${daoToSaint.name} NGỰ KIẾN!`);

    const bless = () => {
        const blessed = typeof callSaintOnTalk === 'function'
            ? callSaintOnTalk(daoToSaint)
            : (daoToSaint.onTalk?.(), true);
        if (!blessed) log('🙏 Đạo Tổ chỉ mỉm cười, cơ duyên lần này khép lại.');
        if (typeof renderAll === 'function') renderAll();
    };
    const battle = () => startSaintChallenge(daoToSaint, source);

    if (typeof showDialog === 'function') {
        showDialog({
            message: `🔥 ${daoToSaint.name} HIỂN LINH! Đại nhân chọn con đường nào?\n(⚠️ Cơ duyên HIẾM CÓ trong vũ trụ!)\n\n📜 Ngài là Đấng Sáng Tạo — ngọn nguồn của muôn vạn vật.\n📜 Gặp được Ngài, ngươi đã được thiên địa chiếu cố!`,
            buttons: [
                { text: '🙏 Thỉnh giáo (+1 ô trận pháp)', value: 'bless', variant: 'primary' },
                { text: '⚔️ Thách đấu (TỰ TUẨN THẦN!)', value: 'battle' },
                { text: 'Rời đi', value: 'leave' }
            ]
        }).then(choice => {
            if (choice === 'battle') battle();
            else if (choice === 'leave') log('🙏 Ngươi khom người hành lễ, Đạo Tổ mỉm cười rồi rời đi.');
            else bless();
        });
        return true;
    }

    const choice = parseInt(prompt(
        `🔥 ${daoToSaint.name} HIỂN LINH!\n` +
        `1) 🙏 Thỉnh giáo — +1 ô trận pháp! (Khuyến nghị)\n` +
        `2) ⚔️ Thách đấu — TỰ TUẨN THẦN!`
    ) || '1', 10);
    if (choice === 2) {
        battle();
        return true;
    }
    bless();
    return true;
}

if (typeof window !== 'undefined') {
    window.encounterDaoTo = encounterDaoTo;
}

function startSaintChallenge(saint, source = 'unknown') {
    const realmIndex = Math.min(REALMS.length - 1, Math.max(0, saint.realm ?? state.realmIndex + 3));
    const mult = 1.4 + Math.max(0, state.realmIndex - 12) * 0.05;
    const template = {
        name: `${saint.name}`,
        baseStr: 520,
        baseHp: 1600,
        baseDef: 360,
        baseXp: 1500,
        gold: 8000
    };

    const enemy = (typeof createCultivator === 'function')
        ? createCultivator(template, realmIndex, mult, saint.realmStage || 0, saint.elements, 8)
        : {
            name: template.name,
            tier: 'Thánh Chiến',
            realmIndex,
            realmStage: saint.realmStage || 0,
            str: Math.floor(700 * mult),
            def: Math.floor(420 * mult),
            hp: Math.floor(4500 * mult),
            maxHp: Math.floor(4500 * mult),
            xp: Math.floor(2000 * mult),
            gold: Math.floor(8000 * mult)
        };
    let diff = realmIndex - state.realmIndex;
    let multiply = 1;
    if (diff > 3) {
        log(`⚔️ ${saint.name} phẫn nộ trước hành động của ngươi!`);
        log(`⚔️ ${saint.name} nói: "Con kiến cũng đòi khiêu chiến Thánh Nhân? Ta sẽ cho ngươi biết thế nào là sức mạnh tuyệt đối của ${saint.name}!"`);
        multiply = 4;
        enemy.str = Math.floor(enemy.str * multiply);
        enemy.def = Math.floor(enemy.def / multiply);
        log(`${saint.name} tăng gấp ${multiply} lần sức mạnh nhưng giảm ${multiply} lần phòng ngự!`);
        enemy.tier = "Phẫn Nộ";
    }
    else if (diff > 1) {
        log(`⚔️ ${saint.name} nhìn ngươi bằng ánh mắt khinh miệt.`);
        log(`⚔️ ${saint.name} nói: "Một phàm nhân cũng đòi đọ sức với Thánh Nhân!"`);
        multiply = 2;
        enemy.str = Math.floor(enemy.str * multiply);
        enemy.def = Math.floor(enemy.def / multiply);
        log(`${saint.name} tăng gấp ${multiply} lần sức mạnh nhưng giảm ${multiply} lần phòng ngự!`);
        enemy.tier = "Khinh miệt";
    }
    else {
        log(`⚔️ ${saint.name} mở mắt nhìn ngươi.`);
        log(`⚔️ ${saint.name} nói: "Ngươi dũng cảm đòi thách đấu với ta, ta sẽ cho ngươi thấy sức mạnh của Thánh Nhân!"`);
        enemy.tier = "Bình thường";
    }

    enemy.isSaint = true;
    enemy.saintName = saint.name;
    enemy.rewardMult = (enemy.rewardMult || 1) * 4;
    enemy.elements = saint.elements?.slice?.() || enemy.elements;
    enemy.rootRank = Math.max(enemy.rootRank || 0, 8);

    state.currentEnemy = enemy;
    window._battleActive = true;
    if (typeof stopAutoTrainingHard === 'function') stopAutoTrainingHard();
    log(`⚔️ ${saint.name} chấp nhận lời thách đấu!`);
    if (typeof renderAll === 'function') renderAll();
}

if (typeof window !== 'undefined') {
    window.encounterRandomSaint = encounterRandomSaint;
    window.startSaintChallenge = startSaintChallenge;
}
//# sourceMappingURL= saint.js.map