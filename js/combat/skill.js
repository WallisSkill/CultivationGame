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
    },

    // ⛰️ Sơn Hà Tái Tạo - skill từ explore.js SKILL_TIERS
    mountain_breaker: {
        id: 'mountain_breaker',
        name: '⛰️ Sơn Hà Tái Tạo',
        type: 'active',
        description: '900% ATK + giảm 30% DEF địch 3 round, CD 4',
        maxLevel: 6,
        cooldown: 4,
        getEffect(level) {
            return {
                duration: 3,
                damageMultiplier: 9.0 + (level - 1) * 0.5,
                cooldown: Math.max(2, 4 - Math.floor(level / 3)),
                defShred: 0.30 + (level - 1) * 0.03,
                defShredDuration: 3
            };
        },
        xp(level) { return 100 + (level - 1) * 75; }
    },

    // 🛡️ Thanh Thiết Hộ Thể
    steel_shield: {
        id: 'steel_shield',
        name: '🛡️ Thanh Thiết Hộ Thể',
        type: 'passive',
        description: 'Tăng 25% DEF trong 3 round',
        maxLevel: 6,
        getEffect(level) {
            return {
                duration: 3 + Math.floor(level / 2),
                defPercent: 0.25 + (level - 1) * 0.04
            };
        },
        xp(level) { return 70 + (level - 1) * 50; }
    },

    // 🌪️ Phong Nguyệt Trảm
    wind_slash: {
        id: 'wind_slash',
        name: '🌪️ Phong Nguyệt Trảm',
        type: 'active',
        description: 'Công kích 200% ATK, +10% tốc độ',
        maxLevel: 6,
        cooldown: 3,
        getEffect(level) {
            return {
                damageMultiplier: 2.0 + (level - 1) * 0.3,
                cooldown: Math.max(2, 3 - Math.floor(level / 3)),
                speedPercent: 0.10 + (level - 1) * 0.03
            };
        },
        xp(level) { return 80 + (level - 1) * 60; }
    },

    // 🔥 Hoả Long Quyết
    flame_dragon_break: {
        id: 'flame_dragon_break',
        name: '🔥 Hoả Long Quyết',
        type: 'active',
        description: '600% ATK + đốt cháy 3 round, CD 3',
        maxLevel: 6,
        cooldown: 3,
        getEffect(level) {
            return {
                damageMultiplier: 6.0 + (level - 1) * 0.5,
                cooldown: Math.max(2, 3 - Math.floor(level / 3)),
                burnDamage: 0.15 + (level - 1) * 0.03,
                burnDuration: 3
            };
        },
        xp(level) { return 90 + (level - 1) * 70; }
    },

    // ❄️ Băng Giáp Vệ Thể
    ice_shield_ward: {
        id: 'ice_shield_ward',
        name: '❄️ Băng Giáp Vệ Thể',
        type: 'passive',
        description: 'Tăng 40% DEF và kháng băng 3 round',
        maxLevel: 6,
        getEffect(level) {
            return {
                duration: 3 + Math.floor(level / 2),
                defPercent: 0.40 + (level - 1) * 0.05,
                iceResist: 0.30 + (level - 1) * 0.05
            };
        },
        xp(level) { return 85 + (level - 1) * 60; }
    },

    // ⚡ Lôi Quyền
    lightning_fist: {
        id: 'lightning_fist',
        name: '⚡ Lôi Quyền',
        type: 'active',
        description: '550% ATK + choáng 1 round, CD 2',
        maxLevel: 6,
        cooldown: 2,
        getEffect(level) {
            return {
                damageMultiplier: 5.5 + (level - 1) * 0.4,
                cooldown: Math.max(1, 2 - Math.floor(level / 4)),
                stunDuration: 1 + Math.floor(level / 4)
            };
        },
        xp(level) { return 85 + (level - 1) * 65; }
    },

    // ☁️ Hư Không Vân Bộ
    void_cloud_step: {
        id: 'void_cloud_step',
        name: '☁️ Hư Không Vân Bộ',
        type: 'active',
        description: 'Tránh 60% sát thương next hit, tăng 30% tốc độ 2 round',
        maxLevel: 6,
        cooldown: 4,
        getEffect(level) {
            return {
                dodgeDamagePercent: 0.60 + (level - 1) * 0.05,
                speedPercent: 0.30 + (level - 1) * 0.04,
                duration: 2
            };
        },
        xp(level) { return 90 + (level - 1) * 70; }
    },

    // 🌙 Huyết Nguyệt Tà Diệt
    blood_moon_slasher: {
        id: 'blood_moon_slasher',
        name: '🌙 Huyết Nguyệt Tà Diệt',
        type: 'active',
        description: '800% ATK, hút 50% HP, CD 4',
        maxLevel: 6,
        cooldown: 4,
        getEffect(level) {
            return {
                damageMultiplier: 8.0 + (level - 1) * 0.6,
                cooldown: Math.max(2, 4 - Math.floor(level / 3)),
                lifesteal: 0.50 + (level - 1) * 0.04
            };
        },
        xp(level) { return 110 + (level - 1) * 80; }
    },

    // 🐉 Long Thần Quyền
    dragon_god_fist: {
        id: 'dragon_god_fist',
        name: '🐉 Long Thần Quyền',
        type: 'active',
        description: '700% ATK + 20% crit rate permanent, CD 3',
        maxLevel: 6,
        cooldown: 3,
        getEffect(level) {
            return {
                damageMultiplier: 7.0 + (level - 1) * 0.5,
                cooldown: Math.max(2, 3 - Math.floor(level / 3)),
                critChance: 0.20 + (level - 1) * 0.03
            };
        },
        xp(level) { return 120 + (level - 1) * 90; }
    },

    // ✨ Thái Hư Phân Thể
    celestial_division: {
        id: 'celestial_division',
        name: '✨ Thái Hư Phân Thể',
        type: 'active',
        description: 'Tạo 2 bóng ma, mỗi 400% ATK, CD 5',
        maxLevel: 6,
        cooldown: 5,
        getEffect(level) {
            return {
                damageMultiplier: 4.0 + (level - 1) * 0.4,
                cloneCount: 2,
                cooldown: Math.max(3, 5 - Math.floor(level / 3))
            };
        },
        xp(level) { return 130 + (level - 1) * 100; }
    },

    // 🔥 Huyết Ngọc Phượng Hoàng
    phoenix_rebirth: {
        id: 'phoenix_rebirth',
        name: '🔥 Huyết Ngọc Phượng Hoàng',
        type: 'active',
        description: 'Hồi sinh với 80% HP một lần, CD 8',
        maxLevel: 6,
        cooldown: 8,
        getEffect(level) {
            return {
                resurrectionHpPercent: 0.80 + (level - 1) * 0.03,
                cooldown: Math.max(5, 8 - Math.floor(level / 2))
            };
        },
        xp(level) { return 150 + (level - 1) * 120; }
    },

    // 🐉 Cửu Long Quyết
    nine_dragon_fist: {
        id: 'nine_dragon_fist',
        name: '🐉 Cửu Long Quyết',
        type: 'active',
        description: '900% ATK x 3 lần, mỗi +10% crit, CD 6',
        maxLevel: 6,
        cooldown: 6,
        getEffect(level) {
            return {
                damageMultiplier: 9.0 + (level - 1) * 0.7,
                hitCount: 3,
                cooldown: Math.max(4, 6 - Math.floor(level / 3)),
                critBonus: 0.10 + (level - 1) * 0.02
            };
        },
        xp(level) { return 140 + (level - 1) * 110; }
    },

    // ❄️ Băng Long Xà Uy
    ice_dragon_bite: {
        id: 'ice_dragon_bite',
        name: '❄️ Băng Long Xà Uy',
        type: 'active',
        description: '1200% ATK, đóng băng 2 round, CD 5',
        maxLevel: 6,
        cooldown: 5,
        getEffect(level) {
            return {
                damageMultiplier: 12.0 + (level - 1) * 1.0,
                cooldown: Math.max(3, 5 - Math.floor(level / 3)),
                freezeDuration: 2
            };
        },
        xp(level) { return 145 + (level - 1) * 115; }
    },

    // ⚡ Lôi Thần Chi Uy
    thunder_god_wrath: {
        id: 'thunder_god_wrath',
        name: '⚡ Lôi Thần Chi Uy',
        type: 'active',
        description: '1500% ATK + choáng toàn trận, CD 6',
        maxLevel: 6,
        cooldown: 6,
        getEffect(level) {
            return {
                damageMultiplier: 15.0 + (level - 1) * 1.2,
                cooldown: Math.max(4, 6 - Math.floor(level / 3)),
                aoeStun: true,
                stunDuration: 1
            };
        },
        xp(level) { return 160 + (level - 1) * 130; }
    },

    // 👊 Thiên Nhai Kích
    heavenly_strike: {
        id: 'heavenly_strike',
        name: '👊 Thiên Nhai Kích',
        type: 'active',
        description: '2000% ATK, bỏ qua 50% phòng, CD 7',
        maxLevel: 6,
        cooldown: 7,
        getEffect(level) {
            return {
                damageMultiplier: 20.0 + (level - 1) * 1.5,
                cooldown: Math.max(4, 7 - Math.floor(level / 2)),
                armorPenetration: 0.50 + (level - 1) * 0.05
            };
        },
        xp(level) { return 180 + (level - 1) * 140; }
    },

    // 🛡️ Bất Diệt Thân
    immortal_body: {
        id: 'immortal_body',
        name: '🛡️ Bất Diệt Thân',
        type: 'active',
        description: 'Miễn nhiễm sát thương 2 round, CD 10',
        maxLevel: 6,
        cooldown: 10,
        getEffect(level) {
            return {
                damageImmunityDuration: 2 + Math.floor(level / 3),
                cooldown: Math.max(6, 10 - Math.floor(level / 2))
            };
        },
        xp(level) { return 200 + (level - 1) * 150; }
    },

    // 💀 Linh Hồn Ly Tán
    soul_severance: {
        id: 'soul_severance',
        name: '💀 Linh Hồn Ly Tán',
        type: 'active',
        description: '2000% ATK + 50% HP địch, triệt tiêu hồi phục 3 round',
        maxLevel: 6,
        cooldown: 8,
        getEffect(level) {
            return {
                damageMultiplier: 20.0 + (level - 1) * 1.5,
                percentHpDamage: 0.50 + (level - 1) * 0.05,
                cooldown: Math.max(5, 8 - Math.floor(level / 3)),
                healBlockDuration: 3
            };
        },
        xp(level) { return 190 + (level - 1) * 145; }
    },

    // 🌌 Nguyên Lai Hỗn Độn
    primordial_chaos: {
        id: 'primordial_chaos',
        name: '🌌 Nguyên Lai Hỗn Độn',
        type: 'active',
        description: '2500% ATK + 30% lifesteal + 20% crit dmg permanent, CD 8',
        maxLevel: 6,
        cooldown: 8,
        getEffect(level) {
            return {
                damageMultiplier: 25.0 + (level - 1) * 2.0,
                cooldown: Math.max(5, 8 - Math.floor(level / 3)),
                lifesteal: 0.30 + (level - 1) * 0.04,
                critBonus: 0.20 + (level - 1) * 0.03
            };
        },
        xp(level) { return 220 + (level - 1) * 160; }
    },

    // ⚔️ Thần Giới Sát Quyền
    god_slayer_fist: {
        id: 'god_slayer_fist',
        name: '⚔️ Thần Giới Sát Quyền',
        type: 'active',
        description: '3000% ATK, bỏ qua 80% phòng, CD 9',
        maxLevel: 6,
        cooldown: 9,
        getEffect(level) {
            return {
                damageMultiplier: 30.0 + (level - 1) * 2.5,
                cooldown: Math.max(5, 9 - Math.floor(level / 2)),
                armorPenetration: 0.80 + (level - 1) * 0.03
            };
        },
        xp(level) { return 250 + (level - 1) * 180; }
    },

    // 🌍 Thế Giới Trảm Phá
    world_breaker: {
        id: 'world_breaker',
        name: '🌍 Thế Giới Trảm Phá',
        type: 'active',
        description: '3500% ATK, phá hủy 30% tất cả chỉ số địch vĩnh viễn',
        maxLevel: 6,
        cooldown: 10,
        getEffect(level) {
            return {
                damageMultiplier: 35.0 + (level - 1) * 2.5,
                cooldown: Math.max(6, 10 - Math.floor(level / 2)),
                statDestroyPercent: 0.30 + (level - 1) * 0.03
            };
        },
        xp(level) { return 280 + (level - 1) * 200; }
    },

    // ♾️ Vĩnh Hằng Tái Sinh
    eternal_rebirth: {
        id: 'eternal_rebirth',
        name: '♾️ Vĩnh Hằng Tái Sinh',
        type: 'active',
        description: 'Hồi full HP + miễn khống chế 3 round, CD 12',
        maxLevel: 6,
        cooldown: 12,
        getEffect(level) {
            return {
                fullHeal: true,
                cooldown: Math.max(7, 12 - Math.floor(level / 2)),
                ccImmuneDuration: 3 + Math.floor(level / 2)
            };
        },
        xp(level) { return 300 + (level - 1) * 220; }
    },

    // 🌟 Vũ Trụ Phá Diệt
    universe_breaker: {
        id: 'universe_breaker',
        name: '🌟 Vũ Trụ Phá Diệt',
        type: 'active',
        description: '5000% ATK + 50% HP toàn trận địch, CD 10',
        maxLevel: 6,
        cooldown: 10,
        getEffect(level) {
            return {
                damageMultiplier: 50.0 + (level - 1) * 4.0,
                cooldown: Math.max(6, 10 - Math.floor(level / 2)),
                aoeDamagePercent: 0.50 + (level - 1) * 0.05
            };
        },
        xp(level) { return 350 + (level - 1) * 250; }
    },

    // 👑 Thiên Đế Chân Quyền
    celestial_emperor: {
        id: 'celestial_emperor',
        name: '👑 Thiên Đế Chân Quyền',
        type: 'active',
        description: '4000% ATK + 100% crit dmg permanent + 50% tốc độ vĩnh viễn, CD 8',
        maxLevel: 6,
        cooldown: 8,
        getEffect(level) {
            return {
                damageMultiplier: 40.0 + (level - 1) * 3.0,
                cooldown: Math.max(5, 8 - Math.floor(level / 3)),
                critDamageBonus: 1.00 + (level - 1) * 0.10,
                speedPercent: 0.50 + (level - 1) * 0.05
            };
        },
        xp(level) { return 400 + (level - 1) * 280; }
    },

    // 🌌 Nguyên Thủy Thần Công
    primordial_god: {
        id: 'primordial_god',
        name: '🌌 Nguyên Thủy Thần Công',
        type: 'active',
        description: '6000% ATK + hồi 200% ATK dạng HP, CD 12',
        maxLevel: 6,
        cooldown: 12,
        getEffect(level) {
            return {
                damageMultiplier: 60.0 + (level - 1) * 5.0,
                cooldown: Math.max(7, 12 - Math.floor(level / 2)),
                healPercentOfDamage: 2.00 + (level - 1) * 0.15
            };
        },
        xp(level) { return 500 + (level - 1) * 350; }
    },

    // ⚔️ Tay Du Kỳ Đại - skill từ board.js
    tay_du_ky_dai: {
        id: 'tay_du_ky_dai',
        name: '⚔️ Tay Du Kỳ Đại',
        type: 'active',
        description: '350% ATK x2 lần, CD 4',
        maxLevel: 6,
        cooldown: 4,
        getEffect(level) {
            return {
                damageMultiplier: 3.5 + (level - 1) * 0.3,
                hitCount: 2,
                cooldown: Math.max(3, 4 - Math.floor(level / 3))
            };
        },
        xp(level) { return 120 + (level - 1) * 90; }
    },

    // 🔥 Thần Túc Vô Sư - skill từ board.js
    than_tuc_vo_su: {
        id: 'than_tuc_vo_su',
        name: '🔥 Thần Túc Vô Sư',
        type: 'active',
        description: '400% ATK, hút 50% sát thương',
        maxLevel: 6,
        cooldown: 3,
        getEffect(level) {
            return {
                damageMultiplier: 4.0 + (level - 1) * 0.4,
                lifesteal: 0.50 + (level - 1) * 0.03,
                cooldown: Math.max(2, 3 - Math.floor(level / 4))
            };
        },
        xp(level) { return 130 + (level - 1) * 100; }
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
function formatSkillEffect(skillId) {
    const def = SKILL_LIBRARY[skillId];
    if (!def) return '';

    const level = (state.skills?.learned?.[skillId] || 1);
    const effect = getSkillEffect(skillId);
    if (!effect) return def.description || '';

    let parts = [];

    // Active skill effects
    if (def.type === 'active') {
        if (effect.damageMultiplier) {
            parts.push(`💥 ${(effect.damageMultiplier * 100).toFixed(0)}% ATK`);
        }
        if (effect.percentHpDamage) {
            parts.push(`🌪️ +${(effect.percentHpDamage * 100).toFixed(0)}% HP địch`);
        }
        if (effect.lifesteal) {
            parts.push(`🩸 Hút ${(effect.lifesteal * 100).toFixed(0)}% máu`);
        }
        if (effect.cooldown) {
            parts.push(`⏳ CD ${effect.cooldown} lượt`);
        }

        // Passive buffs từ active skill
        let passiveParts = [];
        if (effect.atkPercent) {
            passiveParts.push(`⚔️ +${(effect.atkPercent * 100).toFixed(0)}% ATK`);
        }
        if (effect.defPercent) {
            passiveParts.push(`🛡️ +${(effect.defPercent * 100).toFixed(0)}% DEF`);
        }
        if (passiveParts.length > 0) {
            parts.push(`\n📿 Bị động: ${passiveParts.join(', ')}`);
        }
    }

    // Passive skill effects
    if (def.type === 'passive') {
        if (effect.atkPercent) {
            parts.push(`⚔️ +${(effect.atkPercent * 100).toFixed(0)}% ATK`);
        }
        if (effect.defPercent) {
            parts.push(`🛡️ +${(effect.defPercent * 100).toFixed(0)}% DEF`);
        }
        if (effect.maxHpPercent) {
            parts.push(`❤️ +${(effect.maxHpPercent * 100).toFixed(0)}% HP`);
        }
        if (effect.dodgeChance) {
            parts.push(`💨 +${(effect.dodgeChance * 100).toFixed(0)}% né`);
        }
        if (effect.critChance) {
            parts.push(`💥 +${(effect.critChance * 100).toFixed(0)}% chí mạng`);
        }
        if (effect.critBonus) {
            parts.push(`💢 +${(effect.critBonus * 100).toFixed(0)}% sát thương chí mạng`);
        }
        if (effect.burstBonus) {
            parts.push(`🔥 +${(effect.burstBonus * 100).toFixed(0)}% bộc phát`);
        }
        if (effect.healPercent) {
            parts.push(`🌸 Hồi ${(effect.healPercent * 100).toFixed(1)}% HP/lượt`);
        }
    }

    return parts.length > 0 ? parts.join(' | ') : def.description || '';
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