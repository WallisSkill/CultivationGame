/* ============================================================
   BOARD AUTO-BATTLE ("Đấu Pháp Bảo Trận") — Bazaar-style PvE
   - Linh bảo (spirit artifacts) sit on a board and auto-fire on
     their own cooldown during a real-time duel.
   - Reuses computeDamage (ngũ hành / phẩm chất / cảnh giới) and
     the existing winBattle / loseBattle reward handlers.
   - PvP is untouched (still handled by fight.js).
   ============================================================ */

/* ---------- element / tier presentation ---------- */
const LB_ELEMENT_COLORS = {
    'Kim': '#d4af37', 'Mộc': '#4caf50', 'Thủy': '#2196f3',
    'Hỏa': '#f44336', 'Thổ': '#b8860b'
};
const LB_TIER_NAMES = ['Đồng', 'Bạc', 'Vàng', 'Kim Cương'];
const LB_TIER_COLORS = ['#cd7f32', '#c0c0c0', '#ffd700', '#b9f2ff'];
const LB_MAX_TIER = 3;
const LB_BOARD_SLOTS = 6;

/* ---------- action metadata (icon + label) ---------- */
const LB_ACTIONS = {
    damage: { icon: '⚔️', label: 'Sát thương' },
    burn: { icon: '🔥', label: 'Thiêu đốt' },
    heal: { icon: '🌿', label: 'Hồi phục' },
    shield: { icon: '🛡️', label: 'Hộ thuẫn' },
    freeze: { icon: '❄️', label: 'Đóng băng' },
    buffAtk: { icon: '⬆️', label: 'Tăng công' }
};

/* ---------- Linh bảo catalog ----------
   magnitude meaning per action:
     damage   -> ATK multiplier per fire
     burn     -> burn DPS = ATK * magnitude (lasts LB_BURN_SECS)
     heal     -> heals magnitude * maxHp
     shield   -> absorbs magnitude * maxHp
     freeze   -> freeze duration in seconds (slows target board)
     buffAtk  -> +magnitude (fraction) to ATK each fire (compounding)
--------------------------------------------------------------- */
const LINH_BAO = [
    { id: 'phi_kiem', name: 'Phi Kiếm Quyết', element: 'Kim', action: 'damage', cooldown: 1.6, magnitude: 0.9, cost: 260, desc: 'Ngự kiếm liên miên, ra đòn cực nhanh.' },
    { id: 'loi_dinh', name: 'Lôi Đình Phù', element: 'Kim', action: 'damage', cooldown: 3.0, magnitude: 2.2, cost: 520, desc: 'Sấm sét giáng xuống, một đòn kinh thiên.' },
    { id: 'liet_hoa', name: 'Liệt Hỏa Châu', element: 'Hỏa', action: 'burn', cooldown: 2.5, magnitude: 0.55, cost: 420, desc: 'Gieo hỏa diễm thiêu đốt địch theo thời gian.' },
    { id: 'huyet_sat', name: 'Huyết Sát Đao', element: 'Hỏa', action: 'damage', cooldown: 2.2, magnitude: 1.5, cost: 460, desc: 'Đao khí đỏ thẫm, chém mạnh và ổn định.' },
    { id: 'cuong_phong', name: 'Cuồng Phong Kiếm', element: 'Mộc', action: 'damage', cooldown: 2.0, magnitude: 1.3, cost: 380, desc: 'Kiếm phong như bão, tần suất tốt.' },
    { id: 'thanh_moc', name: 'Thanh Mộc Đan', element: 'Mộc', action: 'heal', cooldown: 3.0, magnitude: 0.10, cost: 400, desc: 'Sinh cơ mộc linh, hồi phục khí huyết.' },
    { id: 'huyen_bang', name: 'Huyền Băng Kính', element: 'Thủy', action: 'freeze', cooldown: 4.0, magnitude: 2.0, cost: 560, desc: 'Băng phong trấn địch, làm chậm pháp bảo đối phương.' },
    { id: 'hau_tho', name: 'Hậu Thổ Thuẫn', element: 'Thổ', action: 'shield', cooldown: 3.5, magnitude: 0.16, cost: 440, desc: 'Đất dày sinh thuẫn, hấp thụ sát thương.' },
    { id: 'kim_cang', name: 'Kim Cang Trử', element: 'Kim', action: 'buffAtk', cooldown: 3.0, magnitude: 0.08, cost: 480, desc: 'Luyện thể kim cang, càng đánh càng mạnh.' },
    { id: 'tu_linh', name: 'Tụ Linh Trận', element: 'Thổ', action: 'heal', cooldown: 4.0, magnitude: 0.14, cost: 500, desc: 'Tụ linh khí thiên địa, hồi phục lượng lớn.' }
];
const LINH_BAO_MAP = LINH_BAO.reduce((m, x) => (m[x.id] = x, m), {});

/* fallback "bare-hands" artifact so a player with an empty board can still fight */
const LB_DEFAULT_ATTACK = { id: '_basic', name: 'Chân Khí Kích', element: 'Kim', action: 'damage', cooldown: 2.2, magnitude: 1.0, tier: 0, desc: 'Ngưng tụ chân khí đánh ra.' };

const LB_TICK_MS = 100;
const LB_BURN_SECS = 4;
const LB_FREEZE_SLOW = 0.35; // frozen board advances at 35% speed
const LB_MAX_SECONDS = 90;   // safety cap so a stalemate cannot run forever
// enemies fire several items at once (vs the old single hit per turn), so dial
// their per-hit output down to keep fair-leveled fights fair.
const LB_ENEMY_DMG_SCALE = 0.7;

/* ---------- tier maths ---------- */
function lbEffCooldown(def) {
    const tier = Math.max(0, Math.min(LB_MAX_TIER, def.tier || 0));
    return Math.max(0.5, def.cooldown * (1 - tier * 0.12));
}
function lbEffMagnitude(def) {
    const tier = Math.max(0, Math.min(LB_MAX_TIER, def.tier || 0));
    // freeze magnitude is a duration; scale it gently, others scale +50%/tier
    if (def.action === 'freeze') return def.magnitude * (1 + tier * 0.25);
    return def.magnitude * (1 + tier * 0.5);
}
function lbTierLabel(tier) {
    const t = Math.max(0, Math.min(LB_MAX_TIER, tier || 0));
    return `<span style="color:${LB_TIER_COLORS[t]}">${LB_TIER_NAMES[t]}</span>`;
}

/* ---------- item / board state helpers ---------- */
let _lbUidSeq = 1;
function ensureItemUid(item) {
    if (!item.uid) item.uid = `lb_${Date.now().toString(36)}_${(_lbUidSeq++).toString(36)}`;
    return item.uid;
}

// Build a fresh inventory linh-bảo item from a catalog id.
function makeLinhBao(id, tier = 0) {
    const base = LINH_BAO_MAP[id];
    if (!base) return null;
    const it = {
        name: base.name, type: 'linhbao', linhBaoId: id,
        element: base.element, action: base.action,
        cooldown: base.cooldown, magnitude: base.magnitude,
        tier: Math.max(0, Math.min(LB_MAX_TIER, tier)),
        cost: base.cost, desc: base.desc
    };
    ensureItemUid(it);
    return it;
}
if (typeof window !== 'undefined') window.makeLinhBao = makeLinhBao;

function ensureBoardState() {
    if (!Array.isArray(state.board)) state.board = [];
    // normalise to fixed length of nulls / uids
    while (state.board.length < LB_BOARD_SLOTS) state.board.push(null);
    if (state.board.length > LB_BOARD_SLOTS) state.board = state.board.slice(0, LB_BOARD_SLOTS);
    // backfill uids on existing linh bảo so old saves keep working
    (state.inventory || []).forEach(it => { if (it && it.type === 'linhbao') ensureItemUid(it); });
    // drop board references whose item no longer exists
    state.board = state.board.map(uid => {
        if (!uid) return null;
        const found = (state.inventory || []).find(it => it && it.uid === uid);
        return found ? uid : null;
    });
}
if (typeof window !== 'undefined') window.ensureBoardState = ensureBoardState;

function boardItems() {
    ensureBoardState();
    return state.board.map(uid => uid ? state.inventory.find(it => it && it.uid === uid) : null);
}

function placeOnBoard(inventoryIndex) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể sắp trận.'); return; }
    ensureBoardState();
    const it = state.inventory[inventoryIndex];
    if (!it || it.type !== 'linhbao') return;
    ensureItemUid(it);
    if (state.board.includes(it.uid)) { log(`⚠️ ${it.name} đã ở trên trận.`); return; }
    const slot = state.board.indexOf(null);
    if (slot < 0) { log('⚠️ Trận pháp đã đầy (6 ô). Gỡ bớt linh bảo trước.'); return; }
    state.board[slot] = it.uid;
    log(`⚜️ Đặt ${it.name} vào ô ${slot + 1} của trận pháp.`);
    renderAll();
}
if (typeof window !== 'undefined') window.placeOnBoard = placeOnBoard;

function removeFromBoard(slot) {
    if (window._battleActive) { log('🔒 Đang giao chiến — không thể sắp trận.'); return; }
    ensureBoardState();
    if (slot < 0 || slot >= LB_BOARD_SLOTS) return;
    const uid = state.board[slot];
    if (!uid) return;
    const it = state.inventory.find(x => x && x.uid === uid);
    state.board[slot] = null;
    if (it) log(`↩️ Gỡ ${it.name} khỏi trận pháp.`);
    renderAll();
}
if (typeof window !== 'undefined') window.removeFromBoard = removeFromBoard;

/* ---------- enemy board generator ---------- */
function buildEnemyBoard(enemy) {
    const realm = enemy.realmIndex || 0;
    const tier = Math.max(0, Math.min(LB_MAX_TIER, Math.floor(realm / 5)));
    const count = Math.max(2, Math.min(5, 2 + Math.floor(realm / 6)));
    const enemyEls = enemy.elements || [];

    // weight catalog toward the enemy's own elements
    const pool = LINH_BAO.map(def => ({
        def,
        w: (enemyEls.includes(def.element) ? 3 : 1) * (def.action === 'damage' || def.action === 'burn' ? 1.4 : 1)
    }));

    const chosen = [];
    // guarantee at least one offensive artifact
    const offensive = pool.filter(p => p.def.action === 'damage' || p.def.action === 'burn');
    if (offensive.length) chosen.push(lbWeightedPick(offensive).def);

    while (chosen.length < count) {
        const pick = lbWeightedPick(pool).def;
        chosen.push(pick); // duplicates allowed — enemies can double up
        if (chosen.length > 12) break;
    }
    return chosen.map(def => ({ ...def, tier }));
}
function lbWeightedPick(list) {
    const total = list.reduce((a, b) => a + b.w, 0);
    let r = Math.random() * total;
    for (const item of list) { r -= item.w; if (r <= 0) return item; }
    return list[list.length - 1];
}

/* ---------- combatant construction ---------- */
function lbMakeSlot(def) {
    return {
        def,
        cooldown: lbEffCooldown(def),
        magnitude: lbEffMagnitude(def),
        elapsed: 0,
        fillNode: null,
        tileNode: null
    };
}

function lbBuildPlayerCombatant() {
    if (typeof recalculateStats === 'function') recalculateStats();
    let atk = state.totalPower || state.power || 10;
    let def = state.totalDef || state.defense || 5;
    let maxHp = state.totalMaxHp || state.maxHp || 100;

    // fold in equipped passive-skill buffs so công pháp still matter
    if (typeof applyPassiveSkillBuffs === 'function') {
        try {
            const b = applyPassiveSkillBuffs();
            atk += b.atkBonus || 0;
            def += b.defBonus || 0;
        } catch { }
    }

    const placed = boardItems().filter(Boolean);
    const defs = placed.length ? placed : [LB_DEFAULT_ATTACK];

    return {
        side: 'player',
        name: state.name || 'Ngươi',
        hp: Math.max(1, Math.min(state.hp || maxHp, maxHp)),
        maxHp,
        shield: 0,
        baseAtk: atk, atk,
        def,
        elements: state.root?.elements || [],
        rootRank: state.root?.rank || 0,
        realmIndex: state.realmIndex || 0,
        realmStage: state.realmStage || 0,
        slots: defs.map(lbMakeSlot),
        burns: [],
        freezeUntil: 0
    };
}

function lbBuildEnemyCombatant(enemy) {
    const defs = buildEnemyBoard(enemy);
    return {
        side: 'enemy',
        name: enemy.name || 'Địch',
        hp: Math.max(1, enemy.hp || enemy.maxHp || 100),
        maxHp: Math.max(1, enemy.maxHp || enemy.hp || 100),
        shield: 0,
        baseAtk: enemy.str || 10, atk: enemy.str || 10,
        def: enemy.def || 0,
        elements: enemy.elements || [],
        rootRank: enemy.rootRank || 0,
        realmIndex: enemy.realmIndex || 0,
        realmStage: enemy.realmStage || 0,
        slots: defs.map(lbMakeSlot),
        burns: [],
        freezeUntil: 0,
        ref: enemy
    };
}

/* ---------- damage application ---------- */
function lbApplyDamage(target, amount) {
    let dmg = Math.max(0, Math.floor(amount));
    if (target.shield > 0) {
        const absorbed = Math.min(target.shield, dmg);
        target.shield -= absorbed;
        dmg -= absorbed;
    }
    target.hp = Math.max(0, target.hp - dmg);
    return dmg;
}

function lbFire(battle, source, target, slot) {
    const def = slot.def;
    const mag = slot.magnitude;
    const now = performance.now();

    const dmgScale = source.side === 'enemy' ? LB_ENEMY_DMG_SCALE : 1;

    switch (def.action) {
        case 'damage': {
            const basePower = source.atk * mag * dmgScale;
            const d = computeDamage(
                basePower, source.elements, source.rootRank, source.realmIndex, source.realmStage,
                target.def, target.elements, target.rootRank, target.realmIndex, target.realmStage
            );
            const dealt = lbApplyDamage(target, d.final);
            lbFloat(battle, target.side, `-${fmtVal(dealt)}`, 'dmg');
            log(`${LB_ACTIONS.damage.icon} ${source.name} · ${def.name} gây ${fmtVal(dealt)} sát thương.`);
            break;
        }
        case 'burn': {
            const dps = Math.max(1, source.atk * mag * dmgScale);
            target.burns.push({ dps, remaining: LB_BURN_SECS });
            lbFloat(battle, target.side, '🔥', 'burn');
            log(`${LB_ACTIONS.burn.icon} ${source.name} · ${def.name} thiêu đốt ${fmtVal(dps)}/giây (${LB_BURN_SECS}s).`);
            break;
        }
        case 'heal': {
            const amt = Math.floor(source.maxHp * mag);
            source.hp = Math.min(source.maxHp, source.hp + amt);
            lbFloat(battle, source.side, `+${fmtVal(amt)}`, 'heal');
            log(`${LB_ACTIONS.heal.icon} ${source.name} · ${def.name} hồi ${fmtVal(amt)} HP.`);
            break;
        }
        case 'shield': {
            const amt = Math.floor(source.maxHp * mag);
            source.shield += amt;
            lbFloat(battle, source.side, `🛡️${fmtVal(amt)}`, 'shield');
            log(`${LB_ACTIONS.shield.icon} ${source.name} · ${def.name} tạo hộ thuẫn ${fmtVal(amt)}.`);
            break;
        }
        case 'freeze': {
            target.freezeUntil = now + mag * 1000;
            lbFloat(battle, target.side, '❄️', 'freeze');
            log(`${LB_ACTIONS.freeze.icon} ${source.name} · ${def.name} đóng băng pháp bảo ${target.name} (${mag.toFixed(1)}s).`);
            break;
        }
        case 'buffAtk': {
            const before = source.atk;
            source.atk = Math.floor(source.atk * (1 + mag));
            lbFloat(battle, source.side, `⬆️${fmtVal(source.atk - before)}`, 'buff');
            log(`${LB_ACTIONS.buffAtk.icon} ${source.name} · ${def.name} tăng công lên ${fmtVal(source.atk)}.`);
            break;
        }
    }
}

/* ---------- the battle loop ---------- */
function runBoardBattle() {
    if (!state.currentEnemy) { log('Không có kẻ thù để giao chiến.'); return; }
    if (state.currentEnemy.isPvP) { if (typeof pvpAttackOrLocal === 'function') pvpAttackOrLocal(); return; }
    if (window.__boardBattle && window.__boardBattle.running) return; // already fighting

    ensureBoardState();
    if (typeof syncEnemyToRealm === 'function') syncEnemyToRealm(state.currentEnemy);

    window._battleActive = true;
    if (window.stopAutoTrainingHard) window.stopAutoTrainingHard();

    const battle = {
        running: true,
        elapsedMs: 0,
        player: lbBuildPlayerCombatant(),
        enemy: lbBuildEnemyCombatant(state.currentEnemy),
        dom: {},
        timer: null
    };
    window.__boardBattle = battle;

    lbBuildArenaDOM(battle);
    log(`🎴 Bố trí trận pháp — ${battle.player.slots.length} vs ${battle.enemy.slots.length} pháp bảo. Khai chiến!`);

    battle.timer = setInterval(() => lbStep(battle), LB_TICK_MS);
    lbUpdateArena(battle);
}
if (typeof window !== 'undefined') window.runBoardBattle = runBoardBattle;

function lbStep(battle) {
    if (!battle.running) return;
    const now = performance.now();
    const tickSec = LB_TICK_MS / 1000;
    battle.elapsedMs += LB_TICK_MS;

    const sides = [
        { self: battle.player, foe: battle.enemy },
        { self: battle.enemy, foe: battle.player }
    ];

    // advance cooldowns + fire
    for (const { self, foe } of sides) {
        if (self.hp <= 0 || foe.hp <= 0) continue;
        const slow = now < self.freezeUntil ? LB_FREEZE_SLOW : 1;
        for (const slot of self.slots) {
            slot.elapsed += LB_TICK_MS * slow;
            if (slot.elapsed >= slot.cooldown * 1000) {
                slot.elapsed -= slot.cooldown * 1000;
                lbFire(battle, self, foe, slot);
                if (foe.hp <= 0 || self.hp <= 0) break;
            }
        }
    }

    // damage-over-time (burns)
    for (const c of [battle.player, battle.enemy]) {
        if (!c.burns.length) continue;
        for (const b of c.burns) {
            lbApplyDamage(c, b.dps * tickSec);
            b.remaining -= tickSec;
        }
        c.burns = c.burns.filter(b => b.remaining > 0 && c.hp > 0);
    }

    lbUpdateArena(battle);

    // resolve
    const timeout = battle.elapsedMs >= LB_MAX_SECONDS * 1000;
    if (battle.enemy.hp <= 0) return lbEndBattle(battle, 'win');
    if (battle.player.hp <= 0) return lbEndBattle(battle, 'lose');
    if (timeout) {
        // whoever has the higher HP% wins the stalemate
        const pPct = battle.player.hp / battle.player.maxHp;
        const ePct = battle.enemy.hp / battle.enemy.maxHp;
        return lbEndBattle(battle, pPct >= ePct ? 'win' : 'lose');
    }
}

function lbEndBattle(battle, result) {
    if (!battle.running) return;
    battle.running = false;
    if (battle.timer) { clearInterval(battle.timer); battle.timer = null; }
    window._battleActive = false;

    const enemy = state.currentEnemy;
    // persist player HP back to state
    state.hp = Math.max(0, Math.floor(battle.player.hp));
    if (enemy) enemy.hp = Math.max(0, Math.floor(battle.enemy.hp));

    lbUpdateArena(battle);

    if (result === 'win') {
        if (typeof winBattle === 'function' && enemy) winBattle(enemy);
        // full heal after victory (mirrors the old combat)
        state.totalMaxHp = (state.maxHp || 0) + (typeof getEquippedHp === 'function' ? getEquippedHp() : 0);
        state.hp = state.totalMaxHp;
        state.currentEnemy = null;
        log('🔥 Khí huyết sôi trào — HP hồi phục toàn phần sau chiến thắng!');
    } else {
        if (typeof loseBattle === 'function') loseBattle();
        state.currentEnemy = null;
    }

    window.__boardBattle = null;
    if (typeof renderAll === 'function') renderAll();
}

/* forfeit hook used by the flee button */
function forfeitBoardBattle() {
    const battle = window.__boardBattle;
    if (battle && battle.running) {
        battle.running = false;
        if (battle.timer) { clearInterval(battle.timer); battle.timer = null; }
        window.__boardBattle = null;
    }
    window._battleActive = false;
}
if (typeof window !== 'undefined') window.forfeitBoardBattle = forfeitBoardBattle;

/* ============================================================
   RENDERING
   ============================================================ */
function lbArenaEl() { return document.getElementById('boardArena'); }

function lbSlotTileHTML(slot, idx, side) {
    const def = slot.def;
    const col = LB_ELEMENT_COLORS[def.element] || '#888';
    const act = LB_ACTIONS[def.action] || { icon: '❔', label: def.action };
    return `
        <div class="lb-tile" data-side="${side}" data-idx="${idx}" style="border-color:${col}">
            <div class="lb-tile-top">
                <span class="lb-tile-icon">${act.icon}</span>
                <span class="lb-tile-tier">${lbTierLabel(def.tier)}</span>
            </div>
            <div class="lb-tile-name" style="color:${col}">${def.name}</div>
            <div class="lb-tile-cd"><div class="lb-tile-fill" style="background:${col}"></div></div>
        </div>`;
}

function lbSideHTML(c, side) {
    const tiles = c.slots.map((s, i) => lbSlotTileHTML(s, i, side)).join('');
    return `
        <div class="lb-side lb-side-${side}">
            <div class="lb-side-head">
                <span class="lb-side-name">${side === 'enemy' ? '👹 ' : '🧙 '}${c.name}</span>
                <span class="lb-side-hp-txt" data-hp="${side}"></span>
            </div>
            <div class="lb-hpbar"><div class="lb-hpfill lb-hpfill-${side}" data-hpfill="${side}"></div>
                <div class="lb-shieldfill" data-shield="${side}"></div></div>
            <div class="lb-board" data-board="${side}">${tiles}</div>
            <div class="lb-float" data-float="${side}"></div>
        </div>`;
}

function lbBuildArenaDOM(battle) {
    const el = lbArenaEl();
    if (!el) return;
    el.classList.add('lb-active');
    el.innerHTML = `
        ${lbSideHTML(battle.enemy, 'enemy')}
        <div class="lb-vs">⚔️ Đấu Pháp Bảo</div>
        ${lbSideHTML(battle.player, 'player')}`;

    // cache node refs
    ['player', 'enemy'].forEach(side => {
        const c = battle[side];
        const board = el.querySelector(`[data-board="${side}"]`);
        c.slots.forEach((slot, i) => {
            const tile = board.children[i];
            slot.tileNode = tile;
            slot.fillNode = tile ? tile.querySelector('.lb-tile-fill') : null;
        });
        battle.dom[side] = {
            hpTxt: el.querySelector(`[data-hp="${side}"]`),
            hpFill: el.querySelector(`[data-hpfill="${side}"]`),
            shield: el.querySelector(`[data-shield="${side}"]`),
            float: el.querySelector(`[data-float="${side}"]`)
        };
    });
}

function lbUpdateArena(battle) {
    if (!battle || !battle.dom) return;
    ['player', 'enemy'].forEach(side => {
        const c = battle[side];
        const d = battle.dom[side];
        if (!d) return;
        const pct = Math.max(0, Math.min(100, (c.hp / c.maxHp) * 100));
        const shieldPct = Math.max(0, Math.min(100, (c.shield / c.maxHp) * 100));
        if (d.hpFill) d.hpFill.style.width = pct + '%';
        if (d.shield) d.shield.style.width = shieldPct + '%';
        if (d.hpTxt) d.hpTxt.textContent =
            `${fmtVal(Math.ceil(c.hp))}/${fmtVal(c.maxHp)}${c.shield > 0 ? ` 🛡️${fmtVal(Math.ceil(c.shield))}` : ''}`;
        const now = performance.now();
        const frozen = now < c.freezeUntil;
        c.slots.forEach(slot => {
            if (slot.fillNode) {
                const p = Math.max(0, Math.min(100, (slot.elapsed / (slot.cooldown * 1000)) * 100));
                slot.fillNode.style.width = p + '%';
            }
            if (slot.tileNode) slot.tileNode.classList.toggle('lb-frozen', frozen);
        });
    });
}

let _lbFloatSeq = 0;
function lbFloat(battle, side, text, kind) {
    const host = battle.dom?.[side]?.float;
    if (!host) return;
    const span = document.createElement('span');
    span.className = `lb-float-item lb-float-${kind}`;
    span.innerHTML = text;
    span.style.left = (10 + Math.random() * 70) + '%';
    host.appendChild(span);
    const id = ++_lbFloatSeq;
    span.dataset.id = id;
    setTimeout(() => { try { span.remove(); } catch { } }, 900);
}

/* Static board panel shown out of combat (board editor view).
   During a live battle the engine owns #boardArena, so we bail. */
function renderBoardArena() {
    const el = lbArenaEl();
    if (!el) return;
    if (window.__boardBattle && window.__boardBattle.running) return;

    el.classList.remove('lb-active');
    ensureBoardState();
    const slots = boardItems();

    const tiles = slots.map((it, i) => {
        if (!it) {
            return `<div class="lb-tile lb-tile-empty" onclick="log('Bấm một linh bảo trong túi đồ để đặt vào trận.')">
                        <div class="lb-tile-name">Ô ${i + 1}</div>
                        <div class="lb-tile-sub small">trống</div>
                    </div>`;
        }
        const col = LB_ELEMENT_COLORS[it.element] || '#888';
        const act = LB_ACTIONS[it.action] || { icon: '❔', label: it.action };
        return `<div class="lb-tile" style="border-color:${col}" onclick="removeFromBoard(${i})" title="Gỡ khỏi trận">
                    <div class="lb-tile-top"><span class="lb-tile-icon">${act.icon}</span><span class="lb-tile-tier">${lbTierLabel(it.tier)}</span></div>
                    <div class="lb-tile-name" style="color:${col}">${it.name}</div>
                    <div class="lb-tile-sub small">${act.label} · CD ${lbEffCooldown(it).toFixed(1)}s</div>
                </div>`;
    }).join('');

    const enemyLine = state.currentEnemy && !state.currentEnemy.isPvP
        ? `<div class="small" style="margin-bottom:6px">Kẻ địch chờ giao chiến: <b>${state.currentEnemy.name}</b> — bấm “Tấn công” để khai chiến.</div>`
        : `<div class="small" style="margin-bottom:6px">Sắp xếp linh bảo rồi “Đi kỳ ngộ” để tìm địch.</div>`;

    el.innerHTML = `
        <div class="lb-editor-head">🎴 Trận Pháp Bảo <span class="small">(bấm ô để gỡ · bấm linh bảo trong túi để đặt)</span></div>
        ${enemyLine}
        <div class="lb-board lb-board-editor">${tiles}</div>`;
}
if (typeof window !== 'undefined') window.renderBoardArena = renderBoardArena;
