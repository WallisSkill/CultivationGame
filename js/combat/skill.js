const MAX_EQUIPPED_SKILLS = 3;
const SKILL_LIBRARY = {
    // 🔥 SKILL CHỦ ĐỘNG - ACTIVE SKILLS
    thuong_thanh_tram: {
        id: 'thuong_thanh_tram',
        name: '⚡ Thượng Thanh Trảm',
        type: 'active',
        description: 'Tấn công 420% ATK, cooldown 2 round. Bị động: +50% DEF (mạnh nhất về phòng thủ)',
        maxLevel: 10,
        cooldown: 2,
        getEffect(level) {
            return {
                duration: -1,
                damageMultiplier: 4.2 + (level - 1) * 0.25,
                cooldown: Math.max(1, 2 - Math.floor(level / 3)),
                defPercent: 0.50 + (level - 1) * 0.05
            };
        },
        xp(level) { return 80 + (level - 1) * 60; }
    },

    // 🌪️ THÔNG THIÊN VẠN KIẾM - SÁT THƯƠNG CAO NHẤT
    thong_thien_van_kiem: {
        id: 'thong_thien_van_kiem',
        name: '🌪️ Thông Thiên Vạn Kiếm',
        type: 'active',
        description: 'Xoáy sát thương 650% ATK + 20% HP địch, cooldown 3 round. Bị động: +45% ATK (mạnh nhất về công kích)',
        maxLevel: 6,
        cooldown: 3,
        getEffect(level) {
            return {
                duration: -1,
                damageMultiplier: 6.5 + (level - 1) * 0.5,
                percentHpDamage: 0.20 + (level - 1) * 0.05,
                cooldown: Math.max(2, 3 - Math.floor(level / 4)),
                atkPercent: 0.45 + (level - 1) * 0.03,
            };
        },
        xp(level) { return 90 + (level - 1) * 70; }
    },

    // 🌌 NGUYÊN THỦY HỖN ĐỘN - ĐIỀU HÒA (balanced)
    nguyen_thuy_hon_don: {
        id: 'nguyen_thuy_hon_don',
        name: '🌌 Nguyên Thủy Hỗn Độn Chưởng',
        type: 'active',
        description: 'Chưởng pháp tối thượng điều hòa: 450% ATK + 12% HP địch + hút 40% máu, CD 4 round. Bị động: +25% ATK, +25% DEF',
        maxLevel: 12,
        cooldown: 4,
        getEffect(level) {
            return {
                duration: -1,
                damageMultiplier: 4.5 + (level - 1) * 0.3,
                percentHpDamage: 0.12 + (level - 1) * 0.015,
                lifesteal: 0.40 + (level - 1) * 0.02,
                cooldown: Math.max(2, 4 - Math.floor(level / 4)),
                atkPercent: 0.25 + (level - 1) * 0.02,
                defPercent: 0.25 + (level - 1) * 0.02
            };
        },
        xp(level) { return 200 + (level - 1) * 150; }
    },
    cuu_thien_huyet_kiem: {
        id: 'cuu_thien_huyet_kiem',
        name: '🩸 Cửu Thiên Huyết Kiếm',
        type: 'active',
        description: 'Đòn chí mạng 250% ATK, hút 30% HP gây ra, cooldown 3 round',
        maxLevel: 6,
        cooldown: 3,
        getEffect(level) {
            return {
                damageMultiplier: 2.5 + (level - 1) * 0.25,
                lifesteal: 0.3 + (level - 1) * 0.05,
                cooldown: Math.max(2, 3 - Math.floor(level / 4))
            };
        },
        xp(level) { return 100 + (level - 1) * 75; }
    },

    // 💫 SKILL BỊ ĐỘNG - PASSIVE SKILLS
    iron_body: {
        id: 'iron_body',
        name: '💪 Huyền Thiết Chân Thể',
        type: 'passive',
        description: 'Gia cố phòng thủ mạnh trong vài lượt chiến đấu.',
        maxLevel: 6,
        getEffect(level) {
            const duration = 3 + Math.floor(level / 2);
            return {
                duration,
                defFlat: 20 + (level - 1) * 18,
                defPercent: 0.08 + (level - 1) * 0.04
            };
        },
        xp(level) { return 60 + (level - 1) * 45; }
    },

    dragon_roar: {
        id: 'dragon_roar',
        name: '🐉 Long Nha Phá Thiên',
        type: 'passive',
        description: 'Khai bạo sát khí, tăng mạnh công và sát thương bộc phát.',
        maxLevel: 6,
        getEffect(level) {
            return {
                duration: 2 + Math.floor(level / 3),
                atkPercent: 0.18 + (level - 1) * 0.06,
                burstPercent: 0.25 + (level - 1) * 0.05
            };
        },
        xp(level) { return 70 + (level - 1) * 55; }
    },

    wind_step: {
        id: 'wind_step',
        name: '⚡ Ảnh Phong Bộ',
        type: 'passive',
        description: 'Thân pháp nhẹ như gió, nâng cao tỷ lệ né tránh.',
        maxLevel: 7,
        getEffect(level) {
            return {
                duration: 3 + Math.floor(level / 2),
                dodgeChance: 0.18 + (level - 1) * 0.04,
                atkPercent: 0.04 + (level - 1) * 0.015
            };
        },
        xp(level) { return 55 + (level - 1) * 35; }
    },

    crimson_edge: {
        id: 'crimson_edge',
        name: '🔪 Huyết Nguyệt Trảm',
        type: 'passive',
        description: 'Tụ sát khí, tăng tỷ lệ chí mạng và sát thương chí mạng.',
        maxLevel: 6,
        getEffect(level) {
            return {
                duration: 3 + Math.floor(level / 2),
                critChance: 0.22 + (level - 1) * 0.05,
                critBonus: 0.5 + (level - 1) * 0.12
            };
        },
        xp(level) { return 65 + (level - 1) * 50; }
    },

    lotus_rebirth: {
        id: 'lotus_rebirth',
        name: '🌸 Liên Tâm Hồi Mệnh',
        type: 'passive',
        description: 'Điều dưỡng khí huyết, hồi phục mỗi lượt và tăng chút phòng thủ.',
        maxLevel: 6,
        getEffect(level) {
            return {
                duration: 4,
                healPercent: 0.04 + (level - 1) * 0.018,
                healFlat: 25 + (level - 1) * 18,
                defPercent: 0.05 + (level - 1) * 0.02
            };
        },
        xp(level) { return 60 + (level - 1) * 45; }
    }
};

if (typeof window !== 'undefined') {
    window.SKILL_LIBRARY = SKILL_LIBRARY;
    window.MAX_EQUIPPED_SKILLS = MAX_EQUIPPED_SKILLS;
}
function ensureSkillsState() {
    state.skills = state.skills || { learned: {}, equipped: [] };
    state.skillRuntime = state.skillRuntime || { active: [], enemyKey: null };
}
function getSkillXpNeeded(id, level) {
    const def = SKILL_LIBRARY[id];
    if (!def) return 100;
    return Math.max(40, def.xp ? def.xp(level) : 100 + (level - 1) * 60);
}
function learnSkill(skillId, manualName) {
    ensureSkillsState();
    const def = SKILL_LIBRARY[skillId];
    if (!def) {
        log(`⚠️ Không thể lĩnh ngộ ${manualName || skillId}.`);
        return false;
    }
    if (state.skills.learned[skillId]) {
        log(`📚 Ngươi đã thông hiểu ${def.name}.`);
        return false;
    }
    state.skills.learned[skillId] = { level: 1, xp: 0 };
    if (!state.skills.equipped.includes(skillId) && state.skills.equipped.length < MAX_EQUIPPED_SKILLS) {
        state.skills.equipped.push(skillId);
    }
    log(`📖 Ngươi lĩnh ngộ ${def.name}!`);
    renderAll();
    return true;
}
function toggleEquipSkill(skillId) {
    ensureSkillsState();
    if (!state.skills.learned[skillId]) return;
    const idx = state.skills.equipped.indexOf(skillId);
    if (idx >= 0) {
        state.skills.equipped.splice(idx, 1);
        log(`🔁 Ngừng vận dụng ${SKILL_LIBRARY[skillId]?.name || skillId}.`);
    } else {
        if (state.skills.equipped.length >= MAX_EQUIPPED_SKILLS) {
            log(`⚠️ Chỉ có thể vận dụng tối đa ${MAX_EQUIPPED_SKILLS} công pháp đồng thời.`);
            return;
        }
        state.skills.equipped.push(skillId);
        log(`✨ Kích hoạt ${SKILL_LIBRARY[skillId]?.name || skillId}.`);
    }
    renderAll();
}
function gainSkillMastery(skillId, amount = 1) {
    ensureSkillsState();
    if (!amount || amount <= 0) return;
    const data = state.skills.learned?.[skillId];
    const def = SKILL_LIBRARY[skillId];
    if (!data || !def) return;
    data.xp += amount;
    let leveled = false;
    while (data.level < (def.maxLevel || 9)) {
        const need = getSkillXpNeeded(skillId, data.level);
        if (data.xp < need) break;
        data.xp -= need;
        data.level += 1;
        leveled = true;
    }
    if (leveled) {
        log(`🚀 ${def.name} tăng thành Lv.${data.level}!`);
    }
}
function getSkillEffect(skillId) {
    ensureSkillsState();
    const def = SKILL_LIBRARY[skillId];
    const data = state.skills.learned?.[skillId];
    if (!def || !data) return null;
    return { ...(def.getEffect?.(data.level) || {}), id: skillId, name: def.name };
}
function getSkillXpProgress(skillId) {
    const data = state.skills.learned?.[skillId];
    if (!data) return '0/0';
    return `${data.xp}/${getSkillXpNeeded(skillId, data.level)}`;
}

// 🆕 Thêm hệ thống cooldown cho active skills
function initSkillCooldowns() {
    if (!state.skillCooldowns) state.skillCooldowns = {};
    if (!state.skillUsedThisTurn) state.skillUsedThisTurn = false; // ⭐ Track đã dùng skill lượt này
}

function getSkillCooldown(skillId) {
    initSkillCooldowns();
    return state.skillCooldowns[skillId] || 0;
}

function setSkillCooldown(skillId, turns) {
    initSkillCooldowns();
    state.skillCooldowns[skillId] = Math.max(0, turns);
}

function reduceAllCooldowns() {
    initSkillCooldowns();
    for (let id in state.skillCooldowns) {
        if (state.skillCooldowns[id] > 0) {
            state.skillCooldowns[id]--;
        }
    }
    state.skillUsedThisTurn = false;
}

function canUseSkill(skillId) {
    const def = SKILL_LIBRARY[skillId];
    if (!def || def.type !== 'active') return false;

    if (state.skillUsedThisTurn) return false;

    return getSkillCooldown(skillId) === 0;
}

// ⭐ Đánh dấu đã dùng skill
function markSkillUsed() {
    initSkillCooldowns();
    state.skillUsedThisTurn = true;
}

function canUseSkill(skillId) {
    const def = SKILL_LIBRARY[skillId];
    if (!def || def.type !== 'active') return false;
    return getSkillCooldown(skillId) === 0;
}

// 🆕 Lấy danh sách active skills có thể dùng
function getUsableActiveSkills() {
    ensureSkillsState();
    const result = [];
    const equipped = state.skills?.equipped || [];

    for (let skillId of equipped) {
        const def = SKILL_LIBRARY[skillId];
        if (!def || def.type !== 'active') continue;

        const canUse = canUseSkill(skillId);
        const cooldown = getSkillCooldown(skillId);
        const effect = getSkillEffect(skillId);

        result.push({
            id: skillId,
            name: def.name,
            canUse,
            cooldown,
            effect,
            description: def.description,
            usedThisTurn: state.skillUsedThisTurn
        });
    }

    return result;
}

// 🆕 Lấy thông tin passive buffs đang active
function getActivePassiveBuffs() {
    if (!state.skillRuntime?.active) return [];

    return state.skillRuntime.active.map(buff => {
        const def = SKILL_LIBRARY[buff.skillId];
        return {
            name: def?.name || buff.skillId,
            remainingTurns: buff.remainingTurns,
            effect: buff.effect
        };
    });
}

// 🆕 Format skill effect cho display
function formatSkillEffect(effect) {
    const parts = [];
    if (effect.damageMultiplier) parts.push(`${(effect.damageMultiplier * 100).toFixed(0)}% ATK`);
    if (effect.percentHpDamage) parts.push(`${(effect.percentHpDamage * 100).toFixed(0)}% HP địch`);
    if (effect.lifesteal) parts.push(`Hút ${(effect.lifesteal * 100).toFixed(0)}% HP`);
    if (effect.atkPercent) parts.push(`+${(effect.atkPercent * 100).toFixed(0)}% ATK`);
    if (effect.defPercent) parts.push(`+${(effect.defPercent * 100).toFixed(0)}% DEF`);
    if (effect.dodgeChance) parts.push(`${(effect.dodgeChance * 100).toFixed(0)}% Né`);
    if (effect.critChance) parts.push(`${(effect.critChance * 100).toFixed(0)}% Chí mạng`);
    if (effect.healPercent) parts.push(`+${(effect.healPercent * 100).toFixed(1)}% HP/lượt`);
    return parts.join(', ');
}

// 🎨 Render toàn bộ skill UI
function renderSkillsUI() {
    const container = document.getElementById('skillsDisplay');
    if (!container) return;

    ensureSkillsState();

    let html = '';

    // 📚 Danh sách skill đã học
    const learned = Object.keys(state.skills.learned || {});
    if (learned.length === 0) {
        html += '<div class="small" style="color:#888; margin-bottom:10px;">Chưa có công pháp nào. Mua bí kíp tại shop.</div>';
    } else {
        html += '<div class="skill-section"><b>📚 Công pháp đã học:</b></div>';
        html += '<div class="skill-grid">';

        learned.forEach(skillId => {
            const def = SKILL_LIBRARY[skillId];
            const data = state.skills.learned[skillId];
            if (!def || !data) return;

            const isEquipped = state.skills.equipped.includes(skillId);
            const isActive = def.type === 'active';
            const effect = getSkillEffect(skillId);
            const progress = getSkillXpProgress(skillId);

            html += `
                <div class="skill-item ${isEquipped ? 'equipped' : ''}">
                    <div class="skill-header">
                        <span class="skill-name">${def.name}</span>
                        <span class="skill-level">Lv.${data.level}</span>
                    </div>
                    <div class="skill-type small">${isActive ? '⚡ Chủ động' : '💫 Bị động'}</div>
                    <div class="skill-desc small">${def.description}</div>
                    ${effect ? `<div class="skill-effect small">Hiệu quả: ${formatSkillEffect(effect)}</div>` : ''}
                    <div class="skill-progress small">EXP: ${progress}</div>
                    <button class="skill-toggle-btn" onclick="toggleEquipSkill('${skillId}')">
                        ${isEquipped ? '✅ Đã trang bị' : '⚙️ Trang bị'}
                    </button>
                </div>
            `;
        });

        html += '</div>';
    }

    // ⚡ Active skills có thể dùng (trong combat)
    if (window._battleActive && state.currentEnemy) {
        const activeSkills = getUsableActiveSkills();
        if (activeSkills.length > 0) {
            html += '<div class="skill-section" style="margin-top:12px;"><b>⚡ Chiêu thức:</b></div>';

            // ⭐ Hiển thị thông báo nếu đã dùng skill lượt này
            if (state.skillUsedThisTurn) {
                html += '<div class="small" style="color:#ff9800; margin-bottom:8px;">⚠️ Đã dùng chiêu thức lượt này</div>';
            }

            html += '<div class="active-skills-grid">';

            activeSkills.forEach(skill => {
                const cdText = skill.cooldown > 0 ? `(CD: ${skill.cooldown})` : '✓';
                const canUse = skill.canUse && !skill.cooldown && !state.skillUsedThisTurn;

                html += `
                    <button 
                        class="active-skill-btn ${canUse ? 'ready' : 'cooldown'}" 
                        onclick="useActiveSkill('${skill.id}')"
                        ${!canUse ? 'disabled' : ''}
                        title="${skill.description}"
                    >
                        <div class="skill-btn-name">${skill.name}</div>
                        <div class="skill-btn-cd">${cdText}</div>
                    </button>
                `;
            });

            html += '</div>';
        }
    }

    // 💫 Passive buffs đang hoạt động
    const buffs = getActivePassiveBuffs();
    if (buffs.length > 0) {
        html += '<div class="skill-section" style="margin-top:12px;"><b>💫 Buff hiệu lực:</b></div>';
        html += '<div class="passive-buffs">';

        buffs.forEach(buff => {
            html += `
                <div class="buff-item">
                    <span class="buff-name">${buff.name}</span>
                    <span class="buff-duration">${buff.remainingTurns !== -1 ? buff.remainingTurns + ' lượt' : 'Vĩnh viễn'}</span>
                </div>
            `;
        });

        html += '</div>';
    }

    container.innerHTML = html;
}

function resetAllCooldowns() {
    initSkillCooldowns();
    for (let id in state.skillCooldowns) {
        state.skillCooldowns[id] = 0;
    }
    state.skillUsedThisTurn = false;
    log('✨ Công pháp đã hồi phục hoàn toàn.');
}

// 🔄 Tự động render khi skill thay đổi
if (typeof window !== 'undefined') {
    window.toggleEquipSkill = toggleEquipSkill;
    window.learnSkill = learnSkill;
    window.gainSkillMastery = gainSkillMastery;
    window.getSkillEffect = getSkillEffect;
    window.ensureSkillsState = ensureSkillsState;
    window.canUseSkill = canUseSkill;
    window.setSkillCooldown = setSkillCooldown;
    window.reduceAllCooldowns = reduceAllCooldowns;
    window.getUsableActiveSkills = getUsableActiveSkills;
    window.getActivePassiveBuffs = getActivePassiveBuffs;
    window.formatSkillEffect = formatSkillEffect;
    window.renderSkillsUI = renderSkillsUI;
    window.markSkillUsed = markSkillUsed;
}