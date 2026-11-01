/* ===========================================================
   NGOẠI HÌNH — vẽ nhân vật bằng SVG ghép lớp
   - look: { body, skin, hairStyle, hair, robe, trim, sash, boots, eyes, beard, aura, crown, weapon, wing }
   - Người chơi: look gốc + phẩm chất đồ đang mặc đổi màu đạo bào/vân hài/đai/vũ khí/đạo quan,
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

function eyeLayer(cx, look, id, fem) {
    const y = 46;
    const rx = fem ? 5.4 : 4.6, ry = fem ? 6.2 : 5;
    const lash = shadeColor(look.hair, -0.3);
    return `<ellipse cx="${cx}" cy="${y}" rx="${rx + 1}" ry="${ry}" fill="#fffdf8"/>
        <ellipse cx="${cx}" cy="${y + 0.4}" rx="${rx - 0.8}" ry="${ry - 0.3}" fill="url(#${id}-iris)"/>
        <ellipse cx="${cx}" cy="${y + 0.8}" rx="${rx - 2.8}" ry="${ry - 2.2}" fill="#14100f"/>
        <circle cx="${cx + 1.6}" cy="${y - 2}" r="1.6" fill="#fff"/><circle cx="${cx - 1.4}" cy="${y + 2.4}" r=".8" fill="#fff" opacity=".8"/>
        <path d="M${cx - rx - 1.6} ${y - 1} Q${cx} ${y - ry - 2.6} ${cx + rx + 1.6} ${y - 1}" stroke="${lash}" stroke-width="${fem ? 2 : 1.7}" fill="none" stroke-linecap="round"/>`;
}

function faceLayer(look, id) {
    const fem = look.body === 'f';
    const brow = shadeColor(look.hair, -0.1);
    const brows = fem
        ? `<path d="M42 37 Q49 33 55 36M65 36 Q71 33 78 37" stroke="${brow}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
        : `<path d="M41 38 L55 35.5M65 35.5 L79 38" stroke="${brow}" stroke-width="2.6" stroke-linecap="round"/>`;
    const nose = `<path d="M60 51 Q61.6 53.4 59.6 54" stroke="${shadeColor(look.skin, -0.28)}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
    const mouth = fem
        ? `<path d="M56 58.4 Q60 61.4 64 58.4 Q60 59.6 56 58.4 Z" fill="#d0605c" stroke="#d0605c" stroke-width=".8" stroke-linejoin="round"/>`
        : `<path d="M55.5 58.6 Q60 60.6 64.5 58.6" stroke="#9a5f4a" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
    const blush = `<ellipse cx="44" cy="54" rx="4.4" ry="2.4" fill="#ff8f8f" opacity="${fem ? 0.4 : 0.18}"/><ellipse cx="76" cy="54" rx="4.4" ry="2.4" fill="#ff8f8f" opacity="${fem ? 0.4 : 0.18}"/>`;
    const beard = look.beard
        ? `<path d="M46 57 Q60 94 74 57 Q60 66 46 57 Z" fill="${look.hair}"/>`
        : '';
    return blush + eyeLayer(49, look, id, fem) + eyeLayer(71, look, id, fem) + brows + nose + mouth + beard;
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

function robeDefs(l, id) {
    const robe = l.robe;
    return `<defs>
        <linearGradient id="${id}-robe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shadeColor(robe, 0.3)}"/><stop offset=".45" stop-color="${robe}"/><stop offset="1" stop-color="${shadeColor(robe, -0.38)}"/></linearGradient>
        <linearGradient id="${id}-sleeve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shadeColor(robe, 0.08)}"/><stop offset="1" stop-color="${shadeColor(robe, -0.45)}"/></linearGradient>
        <linearGradient id="${id}-inner" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shadeColor(robe, 0.62)}"/><stop offset="1" stop-color="${shadeColor(robe, 0.2)}"/></linearGradient>
        <linearGradient id="${id}-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shadeColor(l.skin, 0.12)}"/><stop offset="1" stop-color="${shadeColor(l.skin, -0.06)}"/></linearGradient>
        <radialGradient id="${id}-iris" cy=".75" r=".8"><stop offset="0" stop-color="${shadeColor(l.eyes, 0.55)}"/><stop offset="1" stop-color="${shadeColor(l.eyes, -0.15)}"/></radialGradient>
    </defs>`;
}

function ribbonLayer(color) {
    if (!color) return '';
    return `<path d="M42 78 Q10 84 14 116 Q16 134 4 144" stroke="${color}" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/>
        <path d="M78 78 Q110 84 106 116 Q104 134 116 144" stroke="${color}" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/>`;
}

function hairTemples(look) {
    if (look.hairStyle === 5) return '';
    const c = look.hair;
    return `<path d="M34 42 Q31 58 36 69 Q40 58 40 44 Z" fill="${c}"/><path d="M86 42 Q89 58 84 69 Q80 58 80 44 Z" fill="${c}"/>
        <path d="M43 24 Q53 18 66 21" stroke="${shadeColor(c, 0.32)}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
}

function humanoidSvg(look, opts = {}) {
    const l = { ...defaultLook(), ...look };
    const id = `av${++_svgUid}`;
    const dark = shadeColor(l.robe, -0.5);
    const trim = l.trim || '#e6c97a';
    const sash = l.sash || trim;
    const boots = l.boots || shadeColor(l.robe, -0.55);
    const fem = l.body === 'f';
    const shoulder = fem ? 18 : 23, waist = fem ? 12 : 16, hem = fem ? 33 : 35;
    const left = 60 - shoulder, right = 60 + shoulder;
    return `<svg class="avatar ${opts.cls || ''}" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.title || 'nhân vật'}">
        ${robeDefs(l, id)}
        ${auraLayer(l.aura, id)}
        ${wingLayer(l.wing)}
        <ellipse cx="60" cy="153" rx="36" ry="5.5" fill="#000" opacity=".32"/>
        ${ribbonLayer(l.aura)}
        ${hairBack(l)}
        <ellipse cx="49" cy="151" rx="9" ry="4.4" fill="${boots}"/><ellipse cx="71" cy="151" rx="9" ry="4.4" fill="${boots}"/>
        <path d="M43 149 Q49 146 55 149M65 149 Q71 146 77 149" stroke="${shadeColor(boots, 0.35)}" stroke-width="1.2" fill="none"/>
        <path d="M${left} 75 Q60 64 ${right} 75 L${60 + waist} 97 Q${60 + hem - 8} 122 ${60 + hem} 146 Q60 154 ${60 - hem} 146 Q${60 - hem + 8} 122 ${60 - waist} 97 Z" fill="url(#${id}-robe)" stroke="${dark}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M52 100 Q49 126 45 149 Q60 153 75 149 Q71 126 68 100 Z" fill="url(#${id}-inner)"/>
        <path d="M${60 - hem} 146 Q60 154 ${60 + hem} 146" stroke="${trim}" stroke-width="2.4" fill="none"/>
        <path d="M45 104 Q40 126 34 142M75 104 Q80 126 86 142M52 100 L45 149M68 100 L75 149" stroke="${dark}" stroke-width="1" fill="none" opacity=".45"/>
        <path d="M50 67 L60 86 L70 67 Z" fill="#f4efe2"/>
        <path d="M46 69 L52 66.6 L71 95 L63 98 Z" fill="${trim}"/>
        <path d="M74 69 L68 66.6 L56 87 L60 91 Z" fill="${shadeColor(trim, -0.2)}"/>
        <rect x="${60 - waist - 1}" y="92" width="${waist * 2 + 2}" height="9" rx="2.5" fill="${sash}" stroke="${shadeColor(sash, -0.35)}" stroke-width=".8"/>
        <path d="M60 101 L60 113" stroke="${sash}" stroke-width="1.4"/>
        <circle cx="60" cy="116" r="3.8" fill="#bff2d2" stroke="${shadeColor(sash, -0.2)}" stroke-width="1"/>
        <path d="M58 119 L57 131M60 119.6 L60 132M62 119 L63 131" stroke="${sash}" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M${left + 1} 75 Q${left - 14} 92 ${left - 15} 118 Q${left - 15} 128 ${left - 4} 126 Q${left + 6} 124 ${left + 7} 114 L${60 - waist + 1} 90 Z" fill="url(#${id}-sleeve)" stroke="${dark}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M${left - 15} 118 Q${left - 15} 128 ${left - 4} 126 Q${left + 6} 124 ${left + 7} 114" stroke="${trim}" stroke-width="2.4" fill="none"/>
        <circle cx="${left - 4}" cy="124" r="4.6" fill="${l.skin}"/>
        ${weaponLayer(l.weapon, l.weaponColor || '#c8d4e0')}
        <path d="M${right - 1} 75 Q${right + 13} 86 96 106 Q95 115 86 116 Q78 116 ${right - 6} 110 L${60 + waist - 1} 90 Z" fill="url(#${id}-sleeve)" stroke="${dark}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M96 106 Q95 115 86 116 Q79 116 ${right - 6} 110" stroke="${trim}" stroke-width="2.4" fill="none"/>
        <circle cx="96" cy="108" r="4.6" fill="${l.skin}"/>
        <rect x="53" y="58" width="14" height="13" rx="3" fill="${shadeColor(l.skin, -0.14)}"/>
        <ellipse cx="34.5" cy="47" rx="3" ry="5" fill="${shadeColor(l.skin, -0.08)}"/><ellipse cx="85.5" cy="47" rx="3" ry="5" fill="${shadeColor(l.skin, -0.08)}"/>
        <path d="M35 42 Q35 18 60 18 Q85 18 85 42 Q85 56 73 63 Q60 70 47 63 Q35 56 35 42 Z" fill="url(#${id}-skin)"/>
        ${faceLayer(l, id)}
        ${hairTemples(l)}
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

/* Áo quần mang màu phẩm chất của món đang mặc, viền theo thế giới của món đó */
const GEAR_FABRIC_SHADE = -0.12;
const WORLD_TRIMS = { pham: '#e6c97a', tien: '#7fd4ff', thanh: '#ff9d4d', thien: '#d9b8ff', hondon: '#5fe6e6', hongmong: '#ffb3e6', chungnguyen: '#111111' };

function playerLook() {
    const look = { ...defaultLook(), ...(state.look || {}) };
    look.aura = realmAuraColor(state.realmIndex || 0);
    const armor = (typeof equippedInSlot === 'function') ? equippedInSlot('armor') : null;
    const weapon = (typeof equippedInSlot === 'function') ? equippedInSlot('weapon') : null;
    const helm = (typeof equippedInSlot === 'function') ? equippedInSlot('helm') : null;
    const boots = (typeof equippedInSlot === 'function') ? equippedInSlot('boots') : null;
    const amulet = (typeof equippedInSlot === 'function') ? equippedInSlot('amulet') : null;
    const fabric = item => shadeColor(GEAR_QUALITIES[item.quality || 0].color, GEAR_FABRIC_SHADE);
    if (armor) {
        look.robe = fabric(armor);
        look.trim = WORLD_TRIMS[worldTierOfRealm(armor.reqRealm || 0).id];
    }
    if (boots) look.boots = fabric(boots);
    if (amulet) look.sash = fabric(amulet);
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
