/* ===========================
           DAMAGE FORMULA with RANGE INFO
           =========================== */
/* compute final damage from attacker -> defender */
        function computeDamage(
            atkPower, atkElements, atkRank, atkRealm, atkStage,
            defPower, defElements, defRank, defRealm, defStage
        ) {
            const baseDamage = Math.max(1, atkPower - defPower * 0.5);

            const elePercent = calcElementBonus(atkElements, defElements,atkRealm,defRealm);
            const elementFactor = 1 + (elePercent / 100);

            const rankFactor = calcRankBonus(atkRank, defRank);

            const realmFactor = calcRealmBonusFull(atkRealm, atkStage, defRealm, defStage);

            let raw = baseDamage * elementFactor * rankFactor * realmFactor;

            const mitigate = Math.floor(defPower * 0.4);
            let final = Math.floor(raw - mitigate);
            if (final < 1) final = 1;

            return {
                final,
                elementFactor,
                rankFactor,
                realmFactor,
                mitigate,
                elePercent
            };
        }