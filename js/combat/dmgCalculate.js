/* ===========================
           DAMAGE FORMULA with RANGE INFO
           =========================== */
/* compute final damage from attacker -> defender */
function computeDamage(
    atkPower, atkElements, atkRank, atkRealm, atkStage,
    defPower, defElements, defRank, defRealm, defStage
) {
    const baseDamage = Math.max(1, atkPower - defPower * 0.5);

    const elePercent = calcElementBonus(atkElements, defElements, atkRealm, defRealm);
    const elementFactor = 1 + (elePercent / 100);

    const rankFactor = calcRankBonus(atkRank, defRank);

    const realmFactor = calcRealmBonusFull(atkRealm, atkStage, defRealm, defStage);

    const tierFactor = calcTierBonus(atkRealm, defRealm);

    let raw = baseDamage * elementFactor * rankFactor * realmFactor * tierFactor;

    // Apply maximum damage cap when fighting higher realm enemies
    // This prevents astronomical damage when player stats are very high
    const realmDiff = defRealm - atkRealm;
    if (realmDiff > 3) {
        // Cap damage at a percentage of baseDamage based on realm difference
        // For realmDiff = 4: cap at 20% of baseDamage
        // For realmDiff = 6: cap at 10% of baseDamage
        // For realmDiff = 8+: cap at 5% of baseDamage
        let maxDamageRatio = Math.max(0.05, 0.5 - (realmDiff - 3) * 0.1);
        const maxDamage = Math.floor(baseDamage * maxDamageRatio);
        if (raw > maxDamage) {
            raw = maxDamage;
        }
    }

    const mitigate = Math.floor(defPower * 0.4);
    let final = Math.floor(raw - mitigate);
    if (final < 1) final = 1;

    return {
        final,
        elementFactor,
        rankFactor,
        realmFactor,
        mitigate,
        elePercent,
    };
}

function calcTierBonus(atkRealm, defRealm, atkName = state.name, defName = state.currentEnemy.name) {
    // Phân loại tier
    function getTier(realm) {
        if (realm < 9) return 0;      // Phàm giới (0-8)
        if (realm < 16) return 1;     // Tiên giới (9-15)
        if (realm < 20) return 2;     // Thánh cảnh (16-19)
        if (realm < 26) return 3;     // Thiên cảnh (20-25)
        if (realm === 26) return 4;   // Hỗn Độn (26)
        if (realm === 27) return 5;   // Hồng Mông (27)
        return 6;                      // Chung Nguyên (28)
    }

    function getTierName(tier) {
        const tierNames = ['Phàm Giới', 'Tiên Giới', 'Thánh Cảnh', 'Thiên Cảnh', 'Hỗn Độn', 'Hồng Mông', 'Chung Nguyên'];
        return tierNames[tier] || 'Unknown';
    }

    const atkTier = getTier(atkRealm);
    const defTier = getTier(defRealm);
    const tierDiff = atkTier - defTier;

    const atkTierName = getTierName(atkTier);
    const defTierName = getTierName(defTier);

    // Bonus khi vượt tier
    if (tierDiff > 0) {
        const tierBonuses = [1, 3.0, 4.0, 5.0, 6.0, 8.0, 10.0, 15.0];
        let bonus = 1.0;

        for (let i = 1; i <= tierDiff; i++) {
            bonus *= tierBonuses[i] || 15.0;
        }

        log(`⚔️ ${atkName} [${atkTierName}] đánh ${defName} [${defTierName}] → x${bonus.toFixed(2)} (vượt ${tierDiff} tier)`);
        return bonus;
    }
    else if (tierDiff < 0) {
        const tierPenalties = [1, 0.20, 0.15, 0.10, 0.05, 0.02, 0.01, 0.005];
        let penalty = 1.0;

        for (let i = 1; i <= Math.abs(tierDiff); i++) {
            penalty *= tierPenalties[i] || 0.005;
        }

        // Additional severe penalty for large realm differences
        // If actual realm difference is very large, apply extra reduction
        const realmDiff = Math.abs(atkRealm - defRealm);
        if (realmDiff > 6) {
            // Extra penalty: reduce damage by 50% for each realm above 6
            const extraReduction = Math.pow(0.5, realmDiff - 6);
            penalty *= extraReduction;
        }

        log(`🛡️ ${atkName} [${atkTierName}] đánh ${defName} [${defTierName}] → x${penalty.toFixed(4)} (kém ${Math.abs(tierDiff)} tier, giảm ${((1 - penalty) * 100).toFixed(2)}%)`);
        return penalty;
    }

    return 1.0;
}