/* ===========================
           DAMAGE FORMULA with RANGE INFO
           =========================== */
/* compute final damage from attacker -> defender */
function computeDamage(
    atkPower, atkElements, atkRank, atkRealm, atkStage,
    defPower, defElements, defRank, defRealm, defStage
) {
    const baseDamage = Math.max(1, atkPower * atkPower / Math.max(1, atkPower + defPower));

    const elePercent = calcElementBonus(atkElements, defElements, atkRealm, defRealm);
    const elementFactor = 1 + (elePercent / 100);

    const rankFactor = calcRankBonus(atkRank, defRank);

    const realmFactor = calcRealmBonusFull(atkRealm, atkStage, defRealm, defStage);

    const tierFactor = calcTierBonus(atkRealm, defRealm);

    const final = Math.max(1, Math.floor(baseDamage * elementFactor * rankFactor * realmFactor * tierFactor));

    return {
        final,
        elementFactor,
        rankFactor,
        realmFactor,
        mitigate: Math.floor(atkPower - baseDamage),
        elePercent,
    };
}

const TIER_BOOST = [1, 3.0, 4.0, 5.0, 6.0, 8.0, 10.0];
const TIER_PENALTY = [1, 0.20, 0.15, 0.10, 0.05, 0.02, 0.01];

function realmWorldTier(realm) {
    return WORLD_TIERS.findIndex(w => realm >= w.from && realm <= w.to);
}

/* Áp chế đẳng cấp: tiên đánh phàm, thánh đánh tiên, hỗn độn đánh thánh... */
function calcTierBonus(atkRealm, defRealm) {
    const tierDiff = realmWorldTier(atkRealm) - realmWorldTier(defRealm);
    let mult = 1;
    for (let i = 1; i <= Math.abs(tierDiff); i++) {
        mult *= tierDiff > 0 ? TIER_BOOST[i] : TIER_PENALTY[i];
    }
    return mult;
}
