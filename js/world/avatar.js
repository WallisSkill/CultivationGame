/* ===========================================================
   NGOẠI HÌNH — vẽ nhân vật bằng SVG ghép lớp
   - look: { body, skin, hairStyle, hair, robe, trim, eyes, beard, aura, crown, weapon, wing }
   - Người chơi: look gốc + trang bị đang mặc đổi đạo bào/vũ khí/đạo quan,
     cảnh giới quyết định hào quang.
   - Quái & thực thể: kind quyết định hình khối, palette theo thế giới.
=========================================================== */
const LOOK_OPTIONS = {
    body: [{ id: 'm', label: 'Nam' }, { id: 'f', label: 'Nữ' }],
    skin: ['#f6d7b8', '#eec39a', '#d9a273', '#a9734a', '#e9e2f0'],
    hairStyle: ['Búi đạo', 'Xõa dài', 'Đuôi ngựa', 'Song kế', 'Tóc ngắn', 'Đầu trọc'],
    hair: ['#1b1b22', '#4a2f1d', '#8b5a2b', '#c9c9d6', '#f0e6c8', '#7a1f2b', '#2a4f8f', '#5b2a86'],
    robe: ['#3f6f9e', '#3e7d5a', '#8c3a3a', '#6b4a8f', '#d9d4c5', '#2b2b35', '#b5832e', '#c26a9a'],
    eyes: ['#2b1b12', '#2a5fa8', '#2f8f5a', '#a8342a', '#8a4fc0', '#d9a520']
};

const REALM_AURA = [
    { from: 0, color: null },
    { from: 2, color: '#ffd76a' },
    { from: 5, color: '#ff8a4c' },
    { from: 9, color: '#7fd4ff' },
    { from: 16, color: '#ffe9a0' },
    { from: 20, color: '#c58bff' },
    { from: 26, color: '#5fe6e6' },
    { from: 27, color: '#ff8ad8' },
    { from: 28, color: '#ffffff' }
];

function defaultLook() {
    return { body: 'm', skin: LOOK_OPTIONS.skin[0], hairStyle: 0, hair: LOOK_OPTIONS.hair[0], robe: LOOK_OPTIONS.robe[0], eyes: LOOK_OPTIONS.eyes[0] };
}

function shadeColor(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const mix = (c) => Math.max(0, Math.min(255, Math.round(c + (amount < 0 ? c : 255 - c) * amount)));
    const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), b = mix(n & 255);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

let _svgUid = 0;

function auraLayer(color, id) {
    if (!color) return '';
    return `<defs><radialGradient id="${id}"><stop offset="35%" stop-color="${color}" stop-opacity=".5"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>
        <ellipse class="av-aura" cx="60" cy="88" rx="58" ry="72" fill="url(#${id})"/>`;
}

function hairBack(look) {
    const c = look.hair;
    switch (look.hairStyle) {
        case 1: return `<path d="M31 46 Q27 92 38 112 L82 112 Q93 92 89 46 Z" fill="${c}"/>`;
        case 2: return `<path d="M82 34 Q104 44 98 88 Q92 74 84 62 Z" fill="${c}"/>`;
        case 3: return `<circle cx="28" cy="34" r="10" fill="${c}"/><circle cx="92" cy="34" r="10" fill="${c}"/>`;
        default: return '';
    }
}

function hairFront(look) {
    const c = look.hair;
    const hi = shadeColor(c, 0.18);
    switch (look.hairStyle) {
        case 0: return `<circle cx="60" cy="13" r="9" fill="${c}"/><rect x="48" y="11" width="24" height="3" rx="1.5" fill="#d9b45a"/>
            <path d="M32 44 Q33 16 60 16 Q87 16 88 44 Q78 28 60 29 Q42 28 32 44 Z" fill="${c}"/>`;
        case 1: return `<path d="M31 50 Q30 15 60 15 Q90 15 89 50 Q84 30 66 28 Q62 38 44 36 Q36 40 31 50 Z" fill="${c}"/>
            <path d="M40 22 Q52 16 66 20" stroke="${hi}" stroke-width="2" fill="none"/>`;
        case 2: return `<path d="M32 46 Q32 16 60 16 Q88 16 88 46 Q80 30 60 27 Q40 30 32 46 Z" fill="${c}"/>
            <rect x="79" y="30" width="9" height="5" rx="2" fill="#c0392b"/>`;
        case 3: return `<path d="M32 46 Q32 16 60 16 Q88 16 88 46 Q76 34 60 30 Q44 34 32 46 Z" fill="${c}"/>
            <rect x="24" y="40" width="8" height="4" rx="2" fill="#d9b45a"/><rect x="88" y="40" width="8" height="4" rx="2" fill="#d9b45a"/>`;
        case 4: return `<path d="M33 42 Q34 17 60 17 Q86 17 87 42 L80 32 L72 37 L64 30 L54 37 L46 31 L39 37 Z" fill="${c}"/>`;
        default: return `<path d="M42 21 Q52 16 62 19" stroke="#ffffff" stroke-opacity=".25" stroke-width="2.5" fill="none"/>`;
    }
}

function faceLayer(look) {
    const eye = look.eyes || '#2b1b12';
    const fem = look.body === 'f';
    const ey = 46;
    const eyes = fem
        ? `<ellipse cx="50" cy="${ey}" rx="4" ry="5" fill="${eye}"/><ellipse cx="70" cy="${ey}" rx="4" ry="5" fill="${eye}"/>
           <circle cx="51.5" cy="${ey - 2}" r="1.4" fill="#fff"/><circle cx="71.5" cy="${ey - 2}" r="1.4" fill="#fff"/>
           <path d="M44 ${ey - 4} Q50 ${ey - 9} 55 ${ey - 5}M65 ${ey - 5} Q70 ${ey - 9} 76 ${ey - 4}" stroke="#2b1b12" stroke-width="1.6" fill="none"/>`
        : `<ellipse cx="50" cy="${ey}" rx="3.2" ry="4" fill="${eye}"/><ellipse cx="70" cy="${ey}" rx="3.2" ry="4" fill="${eye}"/>
           <circle cx="51" cy="${ey - 1.6}" r="1.1" fill="#fff"/><circle cx="71" cy="${ey - 1.6}" r="1.1" fill="#fff"/>
           <path d="M44 ${ey - 8} L55 ${ey - 6}M65 ${ey - 6} L76 ${ey - 8}" stroke="${shadeColor(look.hair, -0.1)}" stroke-width="2.4" stroke-linecap="round"/>`;
    const mouth = fem
        ? `<path d="M56 56 Q60 59 64 56" stroke="#c0564f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
           <ellipse cx="44" cy="53" rx="3.5" ry="2" fill="#ff9d9d" opacity=".5"/><ellipse cx="76" cy="53" rx="3.5" ry="2" fill="#ff9d9d" opacity=".5"/>`
        : `<path d="M56 57 L64 57" stroke="#8a5a44" stroke-width="1.6" stroke-linecap="round"/>`;
    const beard = look.beard
        ? `<path d="M46 56 Q60 92 74 56 Q60 64 46 56 Z" fill="${look.hair}"/>`
        : '';
    return eyes + mouth + beard;
}

function weaponLayer(kind, color) {
    if (!kind) return '';
    const glow = shadeColor(color, 0.4);
    switch (kind) {
        case 'spear': return `<g transform="rotate(10 100 90)"><rect x="98" y="30" width="4" height="118" fill="#6b4a2b"/><path d="M100 10 L107 34 L93 34 Z" fill="${color}" stroke="${glow}"/></g>`;
        case 'fan': return `<g transform="translate(90 84)"><path d="M0 0 L-16 -30 Q10 -44 30 -24 Z" fill="${color}" stroke="${glow}"/><path d="M0 0 L-5 -36M0 0 L9 -36M0 0 L22 -30" stroke="${glow}" stroke-width="1"/></g>`;
        case 'orb': return `<circle cx="102" cy="82" r="11" fill="${color}" stroke="${glow}" stroke-width="2"/><circle cx="98" cy="78" r="3" fill="#fff" opacity=".7"/>`;
        case 'staff': return `<rect x="98" y="24" width="4" height="124" fill="#6b4a2b"/><circle cx="100" cy="22" r="8" fill="${color}" stroke="${glow}"/>`;
        default: return `<g transform="rotate(14 100 96)"><rect x="97" y="26" width="6" height="74" rx="1" fill="${color}" stroke="${glow}" stroke-width="1"/><path d="M97 26 L100 16 L103 26 Z" fill="${glow}"/><rect x="90" y="98" width="20" height="4" fill="#caa24a"/><rect x="98" y="102" width="4" height="14" fill="#5c3b1e"/></g>`;
    }
}

function crownLayer(crown, color) {
    switch (crown) {
        case 'guan': return `<path d="M46 19 L50 7 L60 13 L70 7 L74 19 Z" fill="${color}" stroke="#fff3" stroke-width="1"/>`;
        case 'halo': return `<ellipse cx="60" cy="10" rx="22" ry="5" fill="none" stroke="${color}" stroke-width="3"/>`;
        case 'wheel': return `<circle cx="60" cy="42" r="42" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6 6" opacity=".8"/>`;
        default: return '';
    }
}

function wingLayer(color) {
    if (!color) return '';
    return `<path d="M36 82 Q2 62 4 106 Q18 96 36 100 Z" fill="${color}" opacity=".7"/><path d="M84 82 Q118 62 116 106 Q102 96 84 100 Z" fill="${color}" opacity=".7"/>`;
}

function humanoidSvg(look, opts = {}) {
    const l = { ...defaultLook(), ...look };
    const id = `av${++_svgUid}`;
    const robe = l.robe, dark = shadeColor(robe, -0.28), lite = shadeColor(robe, 0.22);
    const trim = l.trim || '#e6c97a';
    const shoulders = l.body === 'f' ? 'M42 72 Q60 64 78 72' : 'M38 73 Q60 63 82 73';
    return `<svg class="avatar ${opts.cls || ''}" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.title || 'nhân vật'}">
        ${auraLayer(l.aura, id)}
        ${wingLayer(l.wing)}
        <ellipse cx="60" cy="152" rx="32" ry="6" fill="#000" opacity=".3"/>
        ${hairBack(l)}
        <path d="${shoulders} L${l.body === 'f' ? '84 146 L36 146' : '88 146 L32 146'} Z" fill="${robe}"/>
        <path d="M32 146 Q60 138 88 146 L90 150 L30 150 Z" fill="${dark}"/>
        <path d="M60 68 L60 146" stroke="${dark}" stroke-width="2"/>
        <path d="M50 67 L60 88 L70 67" fill="${lite}" stroke="${trim}" stroke-width="1.6"/>
        <rect x="${l.body === 'f' ? 42 : 38}" y="92" width="${l.body === 'f' ? 36 : 44}" height="8" rx="2" fill="${trim}"/>
        <path d="M58 100 L54 124 L60 120 L66 124 L62 100 Z" fill="${trim}" opacity=".9"/>
        <path d="M38 74 Q26 90 26 110 Q33 116 39 110 L44 84 Z" fill="${dark}"/>
        <path d="M82 74 Q94 90 94 108 Q87 114 81 108 L76 84 Z" fill="${dark}"/>
        <circle cx="31" cy="112" r="5" fill="${l.skin}"/>
        <circle cx="90" cy="108" r="5" fill="${l.skin}"/>
        ${weaponLayer(l.weapon, l.weaponColor || '#c8d4e0')}
        <rect x="53" y="58" width="14" height="12" fill="${shadeColor(l.skin, -0.12)}"/>
        <path d="M34 44 Q34 18 60 18 Q86 18 86 44 Q86 66 60 66 Q34 66 34 44 Z" fill="${l.skin}"/>
        ${faceLayer(l)}
        ${hairFront(l)}
        ${crownLayer(l.crown, l.crownColor || trim)}
    </svg>`;
}

const MONSTER_DRAW = {
    beast: (a, b, c) => `<ellipse cx="66" cy="96" rx="38" ry="24" fill="${a}"/>
        <rect x="36" y="110" width="9" height="30" rx="4" fill="${b}"/><rect x="50" y="112" width="9" height="28" rx="4" fill="${b}"/>
        <rect x="74" y="112" width="9" height="28" rx="4" fill="${b}"/><rect x="90" y="110" width="9" height="30" rx="4" fill="${b}"/>
        <path d="M104 92 Q118 82 114 66 Q108 80 98 84 Z" fill="${b}"/>
        <path d="M46 88 Q18 92 16 70 Q16 50 36 48 L34 34 L46 46 L58 34 L58 50 Q68 58 62 76 Z" fill="${a}"/>
        <path d="M18 76 L30 72 L28 82 Z" fill="#fff"/><circle cx="34" cy="62" r="4" fill="${c}"/>`,
    demon: (a, b, c) => `<path d="M38 150 L40 86 Q60 70 80 86 L82 150 Z" fill="${a}"/>
        <path d="M40 90 Q4 66 8 26 Q24 56 46 66 Z" fill="${b}"/><path d="M80 90 Q116 66 112 26 Q96 56 74 66 Z" fill="${b}"/>
        <path d="M36 36 Q22 16 34 6 Q36 24 48 30 Z" fill="${c}"/><path d="M84 36 Q98 16 86 6 Q84 24 72 30 Z" fill="${c}"/>
        <path d="M34 48 Q34 24 60 24 Q86 24 86 48 Q86 74 60 76 Q34 74 34 48 Z" fill="${a}"/>
        <path d="M44 46 L56 52 L44 54 Z" fill="${c}"/><path d="M76 46 L64 52 L76 54 Z" fill="${c}"/>
        <path d="M48 62 Q60 72 72 62 L68 66 L64 62 L60 67 L56 62 L52 66 Z" fill="#fff"/>
        <path d="M30 100 Q18 112 22 128 L34 118 Z" fill="${b}"/><path d="M90 100 Q102 112 98 128 L86 118 Z" fill="${b}"/>`,
    spirit: (a, b, c) => `<path d="M26 150 Q18 120 24 84 Q28 26 60 22 Q92 26 96 84 Q102 120 94 150 L82 136 L70 150 L60 138 L50 150 L38 136 Z" fill="${a}" opacity=".85"/>
        <path d="M60 22 Q44 44 52 70 Q60 48 60 22 Z" fill="${b}" opacity=".7"/>
        <ellipse cx="46" cy="66" rx="7" ry="11" fill="${c}"/><ellipse cx="74" cy="66" rx="7" ry="11" fill="${c}"/>
        <ellipse cx="60" cy="96" rx="9" ry="14" fill="#0006"/>`,
    golem: (a, b, c) => `<path d="M28 150 L34 110 L24 74 L44 58 L76 58 L96 74 L86 110 L92 150 L66 150 L60 122 L54 150 Z" fill="${a}" stroke="${b}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M8 86 L26 72 L34 110 L16 124 Z" fill="${b}"/><path d="M112 86 L94 72 L86 110 L104 124 Z" fill="${b}"/>
        <rect x="42" y="26" width="36" height="32" rx="4" fill="${a}" stroke="${b}" stroke-width="3"/>
        <rect x="48" y="38" width="9" height="6" fill="${c}"/><rect x="63" y="38" width="9" height="6" fill="${c}"/>
        <path d="M60 76 L52 92 L62 96 L54 112" stroke="${c}" stroke-width="3" fill="none"/>`,
    dragon: (a, b, c) => `<path d="M14 142 Q44 120 30 96 Q16 72 46 62 Q80 54 72 34 Q66 18 86 12 Q112 18 106 42 Q102 62 78 72 Q54 80 66 100 Q82 128 42 148 Z" fill="${a}" stroke="${b}" stroke-width="3"/>
        <path d="M86 12 L82 0 L96 8 L104 0 L102 16 Z" fill="${c}"/><circle cx="94" cy="28" r="4" fill="${c}"/>
        <path d="M104 40 Q118 44 116 54 L102 48 Z" fill="${b}"/><path d="M30 96 L18 90M46 62 L38 50M72 72 L82 84" stroke="${c}" stroke-width="3"/>`,
    chaos: (a, b, c) => `<path d="M60 14 Q104 18 106 66 Q108 112 60 112 Q12 112 14 66 Q16 18 60 14 Z" fill="${a}"/>
        <path d="M24 100 Q10 124 28 150 Q30 124 40 108Z M50 110 Q44 136 56 156 Q60 134 62 112Z M72 108 Q78 136 92 150 Q92 124 84 102Z M92 90 Q116 106 112 136 Q104 116 86 104Z" fill="${b}"/>
        <circle cx="60" cy="56" r="22" fill="#fff"/><circle cx="60" cy="56" r="12" fill="${c}"/><circle cx="60" cy="56" r="5" fill="#000"/>
        <circle cx="30" cy="42" r="7" fill="#fff"/><circle cx="30" cy="42" r="3" fill="${c}"/>
        <circle cx="92" cy="40" r="6" fill="#fff"/><circle cx="92" cy="40" r="3" fill="${c}"/>
        <circle cx="86" cy="84" r="5" fill="#fff"/><circle cx="86" cy="84" r="2.5" fill="${c}"/>`
};

function monsterSvg(kind, realm = 0, title = '') {
    const pal = worldTierOfRealm(realm).palette;
    const draw = MONSTER_DRAW[kind] || MONSTER_DRAW.beast;
    return `<svg class="avatar" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
        <ellipse cx="60" cy="152" rx="34" ry="6" fill="#000" opacity=".3"/>
        ${draw(pal[1], pal[0], pal[2])}
    </svg>`;
}

function realmAuraColor(realm) {
    let color = null;
    REALM_AURA.forEach(a => { if (realm >= a.from) color = a.color; });
    return color;
}

/* Trang bị đổi hình: đạo bào theo chuỗi trang bị, vũ khí theo phẩm chất, đạo quan theo thế giới */
const WORLD_ROBES = { pham: null, tien: '#dbe8f7', thanh: '#e8cf8f', thien: '#5a3a9e', hondon: '#13525c', hongmong: '#7a1f6a', chungnguyen: '#f2f2f2' };
const WORLD_TRIMS = { pham: '#e6c97a', tien: '#7fd4ff', thanh: '#ff9d4d', thien: '#d9b8ff', hondon: '#5fe6e6', hongmong: '#ffb3e6', chungnguyen: '#111111' };

function playerLook() {
    const look = { ...defaultLook(), ...(state.look || {}) };
    look.aura = realmAuraColor(state.realmIndex || 0);
    const armor = (typeof equippedInSlot === 'function') ? equippedInSlot('armor') : null;
    const weapon = (typeof equippedInSlot === 'function') ? equippedInSlot('weapon') : null;
    const helm = (typeof equippedInSlot === 'function') ? equippedInSlot('helm') : null;
    if (armor) {
        const w = worldTierOfRealm(armor.reqRealm || 0).id;
        if (WORLD_ROBES[w]) look.robe = WORLD_ROBES[w];
        look.trim = armor.quality >= 3 ? GEAR_QUALITIES[armor.quality].color : WORLD_TRIMS[w];
    }
    if (weapon) {
        look.weapon = 'sword';
        look.weaponColor = GEAR_QUALITIES[weapon.quality || 0].color;
    }
    if (helm) {
        look.crown = (helm.reqRealm || 0) >= 16 ? 'halo' : 'guan';
        look.crownColor = GEAR_QUALITIES[helm.quality || 0].color;
    }
    if ((state.realmIndex || 0) >= 20) look.crown = 'wheel';
    if ((state.realmIndex || 0) >= 9) look.wing = shadeColor(look.aura || '#ffffff', 0.2);
    return look;
}

function playerAvatarSvg() {
    return humanoidSvg(playerLook(), { title: state.name || 'Tu sĩ' });
}

function enemyAvatarSvg(enemy) {
    if (enemy.isPvP) return humanoidSvg(enemy.look || defaultLook(), { title: enemy.name });
    if (enemy.look) return humanoidSvg(enemy.look, { title: enemy.name });
    if (enemy.kind && MONSTER_DRAW[enemy.kind]) return monsterSvg(enemy.kind, enemy.realmIndex || 0, enemy.name);
    const pal = worldTierOfRealm(enemy.realmIndex || 0).palette;
    return humanoidSvg({ robe: pal[1], trim: pal[2], hair: '#1b1b22', hairStyle: 4, weapon: 'sword' }, { title: enemy.name });
}

function npcAvatarSvg(npc) {
    if (npc.kind && MONSTER_DRAW[npc.kind]) return monsterSvg(npc.kind, npc.realm || 0, npc.name);
    return humanoidSvg(npc.look || defaultLook(), { title: npc.name });
}

/* --------- tạo nhân vật --------- */
function lookChips(key, values, current, labelOf) {
    return values.map((v, i) => {
        const value = typeof v === 'object' ? v.id : (key === 'hairStyle' ? i : v);
        const active = value === current ? 'active' : '';
        const isColor = typeof v === 'string' && v[0] === '#';
        return isColor
            ? `<button type="button" class="look-swatch ${active}" style="background:${v}" aria-label="${labelOf} ${i + 1}" onclick="setLook('${key}','${v}')"></button>`
            : `<button type="button" class="look-chip ${active}" onclick="setLook('${key}',${typeof value === 'number' ? value : `'${value}'`})">${typeof v === 'object' ? v.label : v}</button>`;
    }).join('');
}

function characterCreatorHTML() {
    const l = { ...defaultLook(), ...(state.look || {}) };
    return `<div class="creator">
        <div class="creator-preview">${humanoidSvg({ ...l, weapon: 'sword' }, { title: 'Xem trước' })}</div>
        <div class="creator-options">
            <div class="look-row"><span>Thân hình</span><div>${lookChips('body', LOOK_OPTIONS.body, l.body, 'Thân hình')}</div></div>
            <div class="look-row"><span>Kiểu tóc</span><div>${lookChips('hairStyle', LOOK_OPTIONS.hairStyle, l.hairStyle, 'Kiểu tóc')}</div></div>
            <div class="look-row"><span>Màu tóc</span><div>${lookChips('hair', LOOK_OPTIONS.hair, l.hair, 'Màu tóc')}</div></div>
            <div class="look-row"><span>Màu da</span><div>${lookChips('skin', LOOK_OPTIONS.skin, l.skin, 'Màu da')}</div></div>
            <div class="look-row"><span>Màu mắt</span><div>${lookChips('eyes', LOOK_OPTIONS.eyes, l.eyes, 'Màu mắt')}</div></div>
            <div class="look-row"><span>Đạo bào</span><div>${lookChips('robe', LOOK_OPTIONS.robe, l.robe, 'Đạo bào')}</div></div>
        </div>
    </div>`;
}

let _creatorHost = null;

function renderCharacterCreator(host) {
    _creatorHost = host;
    if (host) host.innerHTML = characterCreatorHTML();
}

function setLook(key, value) {
    state.look = { ...defaultLook(), ...(state.look || {}), [key]: value };
    renderCharacterCreator(_creatorHost);
    if (document.getElementById('appearancePanel')) renderAll();
}

function openLookModal() {
    let modal = document.getElementById('lookModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lookModal';
        modal.className = 'world-modal';
        modal.innerHTML = `<div class="world-modal-box">
            <div class="world-modal-head"><b>Ngoại hình</b><button aria-label="Đóng" onclick="document.getElementById('lookModal').style.display='none'">✕</button></div>
            <div id="lookModalBody"></div></div>`;
        document.body.appendChild(modal);
    }
    renderCharacterCreator(document.getElementById('lookModalBody'));
    modal.style.display = 'flex';
}

if (typeof window !== 'undefined') Object.assign(window, { setLook, openLookModal });
