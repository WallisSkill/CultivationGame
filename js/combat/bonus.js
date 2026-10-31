/* ===========================
    ELEMENT & ROOT RANK CALCS
    - calcRealmBonusFull: returns multiplier for realm difference
    - calcRankBonus: returns multiplier for root rank difference
=========================== */
const ELEMENTS = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
const ELEMENT_MATRIX = {
    'Kim': { 'Kim': 0, 'Mộc': 20, 'Thủy': -10, 'Hỏa': -20, 'Thổ': 10 },
    'Mộc': { 'Kim': -20, 'Mộc': 0, 'Thủy': 20, 'Hỏa': 10, 'Thổ': -10 },
    'Thủy': { 'Kim': 10, 'Mộc': -20, 'Thủy': 0, 'Hỏa': 20, 'Thổ': -10 },
    'Hỏa': { 'Kim': 20, 'Mộc': -10, 'Thủy': -20, 'Hỏa': 0, 'Thổ': 10 },
    'Thổ': { 'Kim': -10, 'Mộc': 20, 'Thủy': 10, 'Hỏa': -20, 'Thổ': 0 }
};

function calcElementBonus(attackerElements, defenderElements, atkRealm = 0, defRealm = 0) {
    const normalize = e => e?.replace(/[^A-Za-zÀ-ỹ]/g, '')
        .replace(/.*(Kim|Mộc|Thủy|Hỏa|Thổ).*/, '$1') || null;

    const atkList = (attackerElements || []).map(normalize).filter(Boolean);
    const defList = (defenderElements || []).map(normalize).filter(Boolean);
    if (!atkList.length || !defList.length) return 0;

    const diff = atkList.length - defList.length;
    const MIN_REALM_FOR_ELEMENT = 2;
    const atkHasElement = atkRealm >= MIN_REALM_FOR_ELEMENT;
    const defHasElement = defRealm >= MIN_REALM_FOR_ELEMENT;
    if (!atkHasElement && defHasElement) {
        return -20;
    }

    if (!atkHasElement && !defHasElement) return 0;

    let bestMatch = -999;
    atkList.forEach(a => {
        defList.forEach(d => {
            const v = ELEMENT_MATRIX[a]?.[d] ?? 0;
            if (v > bestMatch) bestMatch = v;
        });
    });

    let internal = 0;
    for (let i = 0; i < atkList.length; i++) {
        for (let j = i + 1; j < atkList.length; j++) {
            const v = ELEMENT_MATRIX[atkList[i]]?.[atkList[j]] ?? 0;
            if (v > 0) internal += v * 0.3;
        }
    }

    let reversePenalty = 0;
    if (atkHasElement && defHasElement) {
        let reverseWorst = 0;
        defList.forEach(d => {
            atkList.forEach(a => {
                const v = ELEMENT_MATRIX[d]?.[a] ?? 0;
                if (v > 0 && v > reverseWorst) reverseWorst = v;
            });
        });
        reversePenalty = reverseWorst * 0.15;
    }

    let result = bestMatch + internal - reversePenalty;
    if (diff > 0) {
        const multiRootBonus = 1 + (diff * 0.30);
        result *= multiRootBonus;
        if (diff >= 2) result += 10 * diff;
        if (diff >= 3) result *= 1.5;
    } else if (diff < 0) {
        const penalty = Math.pow(0.7, Math.abs(diff));
        result *= penalty;
        result -= 8 * Math.abs(diff);
    }

    const realmDiff = (atkRealm || 0) - (defRealm || 0);
    if (realmDiff !== 0) {
        const atkScale = atkRealm > 10 ? 1 + Math.log10(atkRealm - 9) * 0.5 : atkRealm / 10;
        const defScale = defRealm > 10 ? 1 + Math.log10(defRealm - 9) * 0.5 : defRealm / 10;

        const realmFactor = (1 + (atkScale - defScale) * 0.25);
        result *= realmFactor;

        if (realmDiff > 0) result += realmDiff * 2;
        else result -= Math.abs(realmDiff) * 3;
    }

    result = Math.max(-200, Math.min(400, result));
    return parseFloat(result.toFixed(2));
}


function calcRealmBonusFull(attackerRealmIndex, attackerRealmStage, defenderRealmIndex, defenderRealmStage) {
    const mainDiff = attackerRealmIndex - defenderRealmIndex;
    const stageDiff = (attackerRealmStage || 0) - (defenderRealmStage || 0);

    // Hệ số cơ bản giảm dốc để tránh bùng nổ
    let mult = 1.0;

    if (mainDiff > 0) {
        mult *= (1 + mainDiff * 0.35);     // mỗi cảnh cao hơn +35%
    } else if (mainDiff < 0) {
        mult *= Math.max(0.25, 1 + mainDiff * 0.25); // thấp cảnh giảm nhưng không tụt quá 0.25x
    }

    // Tiểu cảnh tác động nhẹ
    if (stageDiff !== 0) {
        mult *= (1 + stageDiff * 0.15);
    }

    // Tầng giới (phàm/tiên/thánh...) — vừa phải
    function getRealmTier(index) {
        if (index <= 8) return 0;
        if (index <= 15) return 1;
        if (index <= 20) return 2;
        if (index <= 25) return 3;
        return 4;
    }
    const atkTier = getRealmTier(attackerRealmIndex);
    const defTier = getRealmTier(defenderRealmIndex);
    const tierDiff = atkTier - defTier;

    if (tierDiff > 0) mult *= Math.pow(1.6, tierDiff);  // thay vì 10^...
    else if (tierDiff < 0) mult /= Math.pow(1.6, Math.abs(tierDiff));

    // Giới hạn an toàn
    mult = Math.min(50, Math.max(0.1, mult));
    return mult;
}


function calcRankBonus(attackerRank, defenderRank) {
    const diff = Math.floor(attackerRank || 0) - Math.floor(defenderRank || 0);
    const mult = (1 + diff * 0.06) * (0.97 + Math.random() * 0.06);
    return parseFloat(Math.max(0.75, Math.min(1.35, mult)).toFixed(2));
}

// ⛏️ Fix: chỉ giữ 1 bản getRealmMultiplier hợp lệ, xóa bản dư/thiếu dấu đóng trước đó
function getRealmMultiplier(attackerRealm, defenderRealm) {
	const diff = (attackerRealm ?? 0) - (defenderRealm ?? 0);
	if (diff === 0) return 1.0;
	if (diff > 0) {
		return Math.min(3.0, 1 + diff * 0.25);
	}
	return Math.max(0.4, 1 + diff * 0.25);
}

//ELEMENT
function applyElementalBuffs(player, enemy) {
    const verbose = !window._elementalDebug;
    const logSection = (msg) => { if (verbose) log(msg); };

    const playerRank = player.root?.rank || 0;
    const enemyRank = enemy.rootRank || 0;
    const playerRealm = player.realmIndex || 0;
    const enemyRealm = enemy.realmIndex || 0;
    const playerStage = player.realmStage || 0;
    const enemyStage = enemy.realmStage || 0;

    const playerFactor = calcRootFactorForElement(playerRank, playerRealm, playerStage);
    const enemyFactor = calcRootFactorForElement(enemyRank, enemyRealm, enemyStage);

    const playerResist = calcElementResist(playerRank, playerRealm, playerStage);
    const enemyResist = calcElementResist(enemyRank, enemyRealm, enemyStage);

    logSection(`\n==============================`);
    logSection(`[Ngũ Hành Đạo Vận — Người Chơi]`);
    logSection(`==============================`);
    const playerBuff = applyElementalEffect(player, enemy, playerFactor, enemyResist, true, verbose);
    logSection(`==============================`);
    logSection(`[Kết thúc đạo vận người chơi]`);
    logSection(`==============================\n`);

    logSection(`\n==============================`);
    logSection(`[Ngũ Hành Đạo Vận — ${enemy.name}]`);
    logSection(`==============================`);
    const enemyBuff = applyElementalEffect(enemy, player, enemyFactor, playerResist, false, verbose);
    logSection(`==============================`);
    logSection(`[Kết thúc đạo vận ${enemy.name}]`);
    logSection(`==============================\n`);

    return { playerBuff, enemyBuff };
}

/*
  SỬA CHÍNH: buff tỉ lệ tăng rất mạnh theo realm/stage, không còn cap cứng.
  - Mộc: luôn hồi >=10% maxHP + thêm theo phẩm chất và cảnh giới.
  - Kim/Thổ/Hỏa/Thủy: tăng theo log10(1+factor) và realm multiplier; giảm đồng nhất bởi kháng và chênh cảnh giới.
*/
function applyElementalEffect(actor, target, factor, resist, isPlayer = false, verbose = false) {
    const logMsg = verbose ? (msg) => log(msg) : () => {};
    const buff = { atk: 1, def: 1, skip: false, burn: 0 };
    const elements = actor.elements || actor.root?.elements || [];
    const name = isPlayer ? 'Ngươi' : (actor?.name || 'Địch thủ');

    const r = Number(resist) || 0;
    const realmDiff = (actor.realmIndex ?? 0) - (target.realmIndex ?? 0);
    if (actor.realmIndex < 3) {
        logMsg(`⚠️ ${name} cảnh giới quá thấp, không thể vận hành ngũ hành.`);
        logMsg(`${name} phải đạt cảnh giới Nguyên Anh mới có được hiệu ứng ngũ hành.`);
        return buff;
    }

    // Rank-based boost: Thiên Phẩm (6) trở lên tăng nhẹ toàn bộ hiệu ứng
    const rootRank = actor.root?.rank || 0;
    const rankTierBoost =
        rootRank >= 9 ? 1.30 :
        rootRank >= 8 ? 1.22 :
        rootRank >= 7 ? 1.15 :
        rootRank >= 6 ? 1.10 : 1.0;

    const realmMul = 1
        + (actor.realmIndex || 0) * 0.18
        + (actor.realmStage || 0) * 0.10;

    const compress = (x) => Math.log10(1 + Math.max(0, x));
    const red = getElementReduction(r, realmDiff);

    // Mộc: luôn hồi >= 10%, cộng theo rank và cảnh giới, có áp dụng boost cho Thiên Phẩm+
    if (elements.includes("Mộc")) {
        const trueMaxHp = actor.totalMaxHp ?? actor.maxHp ?? 0;

        const baseHealPercent = 0.10;
        const rankHealExtra = 0.02 * rootRank;
        const scaleExtra = 0.04 * compress(factor) * realmMul;
        const healPercent = Math.max(0, (baseHealPercent + rankHealExtra + scaleExtra) * red * rankTierBoost);

        const healAmount = Math.max(1, Math.floor(trueMaxHp * healPercent));
        actor.hp = Math.min(trueMaxHp, (actor.hp ?? 0) + healAmount);

        logMsg(`🌿 ${name} vận Mộc — Hồi ${fmtVal(healAmount)} HP (${(healPercent * 100).toFixed(2)}%).`);
    }

    // Các hệ còn lại: tăng theo cảnh giới và được boost khi rank >= Thiên Phẩm
    const basePct = compress(factor) * realmMul * red * rankTierBoost;

    if (elements.includes("Kim")) {
        const atkPct = 0.06 * basePct + 0.01 * (actor.realmStage || 0);
        if (atkPct > 0) {
            buff.atk += atkPct;
            logMsg(`⚔️ ${name} vận Kim — Tấn công +${(atkPct * 100).toFixed(2)}%.`);
        }
    }

    if (elements.includes("Thổ")) {
        const defPct = 0.06 * basePct + 0.008 * (actor.realmStage || 0);
        if (defPct > 0) {
            buff.def += defPct;
            logMsg(`🪨 ${name} vận Thổ — Phòng thủ +${(defPct * 100).toFixed(2)}%.`);
        }
    }

    if (elements.includes("Hỏa")) {
        const burnPct = Math.max(0, 0.05 * basePct + 0.005 * (actor.realmStage || 0));
        if (burnPct > 0) {
            buff.burn = burnPct;
            logMsg(`🔥 ${name} vận Hỏa — Thiêu đốt +${(burnPct * 100).toFixed(2)}% sát thương.`);
        }
    }

    if (elements.includes("Thủy")) {
        let dodge = Math.max(0, 0.05 * basePct + 0.01 * (actor.realmStage || 0));
        if (realmDiff > 0) dodge *= (1 + realmDiff * 0.05);
        if (dodge > 0) {
            const shown = Math.min(0.9, dodge);
            logMsg(`💧 ${name} vận Thủy — Né tránh ${(shown * 100).toFixed(2)}%.`);
            if (Math.random() < shown) buff.skip = true;
        }
    }

    return buff;
}

function fmtVal(value, isPercent = false) {
    if (isPercent) return `${(value * 100).toFixed(1)}%`;
    if (Math.abs(value) < 100 && !Number.isInteger(value)) return value.toFixed(2);
    return formatNumber(Math.round(value));
}

/*
  SỬA CHÍNH: Kháng tăng mạnh theo cảnh giới/phẩm chất. Bỏ min-cap; nếu chênh cảnh quá lớn, buff gần như biến mất.
*/
function calcRootFactorForElement(rank, realm = 0, stage = 0) {
    if (realm < 0) return 0.0;
    const r = Math.max(0, Math.floor(rank || 0));
    const GROWTH = [0.25, 0.40, 0.65, 1.0, 1.5, 2.2, 3.3, 4.9, 7.4]; // tăng mạnh hơn theo phẩm chất
    let factor = 1.0;
    for (let i = 0; i < r && i < GROWTH.length; i++) factor *= (1 + GROWTH[i]);

    // tăng rất mạnh theo cảnh giới, đặc biệt sau Tiên/Vũ trụ
    const realmScale = Math.pow(realm + 4, 3.0);
    const stageScale = [1.0, 1.25, 1.6, 2.0][stage] || 1.0;

    let tierBonus = 1.0;
    if (realm > 9) tierBonus *= Math.pow(1.15, realm - 9);
    if (realm > 15) tierBonus *= Math.pow(1.18, realm - 15);
    if (realm > 21) tierBonus *= Math.pow(1.22, realm - 21);

    const combined = Math.pow(factor, 0.5) * realmScale * tierBonus * stageScale;
    return parseFloat(combined.toFixed(3));
}

/*
  Kháng nguyên tố tăng rất mạnh theo cảnh giới/phẩm chất. Không gate theo realm < 5.
*/
function calcElementResist(rootRank = 0, realm = 0, stage = 0, targetRealm = realm) {
    const GROWTH = [0.35, 0.50, 0.80, 1.2, 1.8, 2.7, 4.0, 6.0, 9.0]; // tăng nhanh hơn theo phẩm chất
    let resistPower = 1.0;
    for (let i = 0; i < rootRank && i < GROWTH.length; i++) resistPower *= (1 + GROWTH[i]);

    const realmFactor = Math.pow(realm + 4, 3.2);
    const stageResist = [1.0, 1.25, 1.6, 2.1][stage] || 1.0;
    const diff = realm - (targetRealm ?? realm);

    // Ưu thế cảnh giới áp chế mạnh
    let suppression = 1.0;
    if (diff > 0) suppression = Math.pow(1.6, diff);
    else if (diff < 0) suppression = Math.pow(0.7, -diff);

    let total = Math.pow(resistPower, 0.5) * Math.pow(realmFactor, 1.05) * stageResist * suppression;

    if (realm > 15) total *= Math.pow(1.12, realm - 15);
    if (realm > 22) total *= Math.pow(1.15, realm - 22);

    return parseFloat(total.toFixed(3));
}

/*
  Giảm hiệu lực theo kháng và chênh cảnh giới:
  - Kháng càng lớn => giảm càng mạnh (log10).
  - Nếu thua cảnh nhiều bậc => hiệu lực về gần 0.
  - Không cap min (có thể gần 0), clamp [0..1] để an toàn.
*/
function getElementReduction(resist, realmDiff = 0) {
    const r = Math.max(0, resist);
    let base = 1 / (1 + Math.log10(1 + r / 400)); // kháng mạnh hơn trước

    if (realmDiff < 0) {
        const gap = -realmDiff;
        base *= Math.pow(0.55, gap); // thua mỗi cảnh giảm về 55%
    } else if (realmDiff > 0) {
        base *= Math.pow(1.08, realmDiff); // hơn cảnh được cộng nhẹ
    }

    // Không cap min 0.3 như trước, chỉ giữ trong [0..1] để ổn định
    return Math.max(0, Math.min(1, base));
}
