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
    hairStyle: ['Búi đạo', 'Xõa dài', 'Đuôi ngựa', 'Song kế', 'Tóc ngắn', 'Đầu trọc', 'Bán kế'],
    face: ['Trái xoan', 'Vuông', 'Thanh tú'],
    eyeShape: ['Phượng nhãn', 'Hiền hòa', 'Đuôi xếch'],
    brow: ['Kiếm mi', 'Liễu mi', 'Rậm'],
    beard: ['Không', 'Ria', 'Râu dài'],
    hair: ['#1b1b22', '#4a2f1d', '#8b5a2b', '#c9c9d6', '#f0e6c8', '#7a1f2b', '#2a4f8f', '#5b2a86'],
    robe: ['#3f6f9e', '#3e7d5a', '#8c3a3a', '#6b4a8f', '#d9d4c5', '#2b2b35', '#b5832e', '#c26a9a'],
    eyes: ['#2b1b12', '#2a5fa8', '#2f8f5a', '#a8342a', '#8a4fc0', '#d9a520']
};

const REALM_AURA = [
    { from: 0, color: null },
    { from: 2, color: '#ffd76a' },
    { from: 5, color: '#ff8a4c' },
    { from: 9, color: '#7fd4ff' },
    { from: 19, color: '#ffe9a0' },
    { from: 23, color: '#c58bff' },
    { from: 29, color: '#5fe6e6' },
    { from: 30, color: '#ff8ad8' },
    { from: 31, color: '#ffffff' },
    { from: 32, color: '#b388ff' }
];

function defaultLook() {
    return { body: 'm', skin: LOOK_OPTIONS.skin[0], hairStyle: 0, hair: LOOK_OPTIONS.hair[0], robe: LOOK_OPTIONS.robe[0], eyes: LOOK_OPTIONS.eyes[0], face: 0, eyeShape: 0, beard: 0 };
}

function shadeColor(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const mix = (c) => Math.max(0, Math.min(255, Math.round(c + (amount < 0 ? c : 255 - c) * amount)));
    const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), b = mix(n & 255);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

let _svgUid = 0;

const INK = '#1d1a20';

function auraLayer(color, id) {
    if (!color) return '';
    return `<defs><radialGradient id="${id}"><stop offset="20%" stop-color="${color}" stop-opacity=".42"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>
        <ellipse class="av-aura" cx="60" cy="70" rx="56" ry="68" fill="url(#${id})"/>
        <g fill="none" stroke="${color}" stroke-linecap="round" opacity=".55">
            <path d="M22 118 Q6 96 20 74 Q30 60 22 44 Q40 62 30 80 Q22 98 34 112" stroke-width="2.4"/>
            <path d="M98 112 Q116 92 102 68 Q94 52 104 34 Q86 54 94 74 Q102 94 88 110" stroke-width="2"/>
        </g>`;
}

const HAIR_CAP = 'M49.4 28 Q46.6 9.6 60 9 Q73.4 9.6 70.6 28 Q69.6 20.6 65 16.6 Q60.4 20.6 54.6 18 Q50.6 21 49.4 28 Z';
const HAIR_SWEEP = 'M49.4 28 Q46.6 9.6 60 9 Q73.4 9.6 70.6 28 Q70 20 64 15.4 Q58 22 51.6 20.6 Q50 23.6 49.4 28 Z';

function hairStrands(c) {
    return `<path d="M51 17 Q46 30 48.4 46 Q49.6 36 51.4 27 Q52 21 54 17 Z" fill="${c}"/><path d="M69 17 Q74 30 71.6 46 Q70.4 36 68.6 27 Q68 21 66 17 Z" fill="${c}"/>`;
}

function hairLines(look) {
    const hi = shadeColor(look.hair, 0.4);
    return `<path d="M51.6 22 Q53 13 60 10.6 M54 17.6 Q57 12 63 11 M66 15.6 Q65 12.6 61.6 10.4 M68.6 22 Q68 16 64.6 12.4" stroke="${hi}" stroke-width=".4" fill="none" stroke-linecap="round" opacity=".5"/>`;
}

function hairBack(look) {
    const c = look.hair;
    const dark = shadeColor(c, -0.3);
    switch (look.hairStyle) {
        case 1: return `<path d="M50 18 Q40 56 43 112 Q52 122 60 116 Q68 122 77 112 Q80 56 70 18 Z" fill="${dark}"/>`;
        case 2: return `<path d="M63 9 Q84 6 88 30 Q92 56 84 84 Q81 60 76 42 Q72 24 62 16 Z" fill="${dark}"/>`;
        case 3: return `<path d="M50 22 Q45 40 47 60 Q60 66 73 60 Q75 40 70 22 Z" fill="${dark}"/>`;
        case 6: return `<path d="M50 18 Q42 52 45 92 Q52 100 60 96 Q68 100 75 92 Q78 52 70 18 Z" fill="${dark}"/>`;
        default: return '';
    }
}

function hairFront(look) {
    const c = look.hair;
    const pin = '#d9b45a';
    switch (look.hairStyle) {
        case 0: return `<ellipse cx="60" cy="6.4" rx="5.4" ry="4.6" fill="${c}"/><path d="M50 8 L71 5" stroke="${pin}" stroke-width="1" stroke-linecap="round"/><path d="${HAIR_CAP}" fill="${c}"/>${hairLines(look)}`;
        case 1: return `<path d="${HAIR_SWEEP}" fill="${c}"/>${hairStrands(c)}<path d="M48.6 40 Q45 62 49 84 Q50 62 51.6 44 Z" fill="${c}"/><path d="M71.4 40 Q75 62 71 84 Q70 62 68.4 44 Z" fill="${c}"/>${hairLines(look)}`;
        case 2: return `<path d="${HAIR_SWEEP}" fill="${c}"/><path d="M60 8 L68 7" stroke="#b5332b" stroke-width="2.2" stroke-linecap="round"/>${hairStrands(c)}${hairLines(look)}`;
        case 3: return `<circle cx="48.4" cy="10.6" r="5.4" fill="${c}"/><circle cx="71.6" cy="10.6" r="5.4" fill="${c}"/><path d="${HAIR_CAP}" fill="${c}"/><path d="M45 14 L52 14M68 14 L75 14" stroke="${pin}" stroke-width="1.2" stroke-linecap="round"/>${hairStrands(c)}${hairLines(look)}`;
        case 4: return `<path d="M49.4 27 Q46.6 9.6 60 9 Q73.4 9.6 70.6 27 L68 20 L65 23 L62 16.6 L58 22 L55 17 L52.6 23 Z" fill="${c}"/>${hairLines(look)}`;
        case 5: return '<path d="M53 15.4 Q58 13 63 13.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" fill="none" stroke-linecap="round"/>';
        default: return `<ellipse cx="60" cy="6.6" rx="4.6" ry="3.8" fill="${c}"/><path d="M57 4 L64 9" stroke="${pin}" stroke-width=".9" stroke-linecap="round"/><path d="${HAIR_SWEEP}" fill="${c}"/>${hairStrands(c)}${hairLines(look)}`;
    }
}

const FACE_SHAPES = [
    'M50.6 24 Q50.6 13 60 13 Q69.4 13 69.4 24 Q69.4 31 66 35.6 Q62.4 39.8 60 40 Q57.6 39.8 54 35.6 Q50.6 31 50.6 24 Z',
    'M50.4 24 Q50.4 13 60 13 Q69.6 13 69.6 24 Q69.8 32 67.4 36 Q63.4 40.4 60 40.4 Q56.6 40.4 52.6 36 Q50.2 32 50.4 24 Z',
    'M51 24 Q51 13 60 13 Q69 13 69 24 Q68.8 30 65 35.4 Q62 40 60 40.6 Q58 40 55 35.4 Q51.2 30 51 24 Z'
];

function eyeLayer(cx, side, look, id, fem) {
    const y = 27;
    const outer = cx + side * 3.5, inner = cx - side * 3;
    const lift = [1.1, 0.4, 1.8][look.eyeShape || 0];
    const open = fem ? 2.5 : 2;
    const lid = `M${inner} ${y + 0.5} Q${cx} ${y - open} ${outer} ${y - lift}`;
    const lash = shadeColor(look.hair, -0.45);
    return `<path d="${lid} Q${cx} ${y + 1.5} ${inner} ${y + 0.5} Z" fill="#fbf7ee"/>
        <circle cx="${cx}" cy="${y - 0.3}" r="1.45" fill="url(#${id}-iris)"/><circle cx="${cx}" cy="${y - 0.3}" r=".62" fill="#0d0b0b"/><circle cx="${cx + 0.4}" cy="${y - 0.8}" r=".3" fill="#fff"/>
        <path d="${lid}" stroke="${lash}" stroke-width="${fem ? 0.85 : 0.75}" fill="none" stroke-linecap="round"/>`;
}

function browLayer(look, fem) {
    const style = look.brow ?? (fem ? 1 : 0);
    const c = shadeColor(look.hair, -0.25);
    const y = 22;
    const rise = [1.5, 0.5, 1][style];
    const width = [0.95, 0.55, 1.35][style];
    const brow = side => `M${60 + side * 1.9} ${y + 0.8} Q${60 + side * 5.4} ${y - rise} ${60 + side * 8.2} ${y - rise + 0.9}`;
    return `<path d="${brow(-1)} ${brow(1)}" stroke="${c}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
}

function beardLayer(look) {
    const c = look.hair;
    const kind = look.beard === true ? 2 : (look.beard || 0);
    if (kind === 1) return `<path d="M55.4 33.4 Q58 32.6 60 33.4 Q62 32.6 64.6 33.4 Q62 34.6 60 34 Q58 34.6 55.4 33.4 Z" fill="${c}"/>`;
    if (kind === 2) return `<path d="M55 33.2 Q60 32.2 65 33.2 Q64.6 37 62.6 42 Q61 56 60 64 Q59 56 57.4 42 Q55.4 37 55 33.2 Z" fill="${c}"/>`;
    return '';
}

function faceLayer(look, id) {
    const fem = look.body === 'f';
    const line = shadeColor(look.skin, -0.42);
    const nose = `<path d="M60.8 30 Q61.4 31.3 60.8 31.7 Q60.2 32 59.4 31.7" stroke="${line}" stroke-width=".45" fill="none" stroke-linecap="round" opacity=".75"/>`;
    const lip = fem ? '#b8423f' : '#9a5a4c';
    const mouth = `<path d="M57.4 ${35} Q59 34.5 60 34.9 Q61 34.5 62.6 ${35} Q60 36.4 57.4 ${35} Z" fill="${lip}" opacity="${fem ? 0.9 : 0.6}"/>`;
    const cheek = fem ? '<ellipse cx="54" cy="31" rx="2.4" ry="1.3" fill="#e88" opacity=".22"/><ellipse cx="66" cy="31" rx="2.4" ry="1.3" fill="#e88" opacity=".22"/>' : '';
    const shade = `<path d="M50.8 25 Q51 31 54 35.6 Q56 38 58 39.2 Q53.4 33 52.6 24 Q51.6 23 50.8 25 Z M69.2 25 Q69 31 66 35.6 Q64 38 62 39.2 Q66.6 33 67.4 24 Q68.4 23 69.2 25 Z" fill="${line}" opacity=".16"/>`;
    return shade + cheek + eyeLayer(55.5, -1, look, id, fem) + eyeLayer(64.5, 1, look, id, fem) + browLayer(look, fem) + nose + mouth + beardLayer(look);
}

function weaponLayer(kind, color) {
    if (!kind) return '';
    const glow = shadeColor(color, 0.45);
    switch (kind) {
        case 'spear': return `<g transform="rotate(5 98 90)"><rect x="97.2" y="26" width="1.8" height="124" fill="#4b3320"/><path d="M98 6 L102 28 L98 31 L94 28 Z" fill="${color}" stroke="${INK}" stroke-width=".5"/><path d="M95 32 Q98 40 101 32" stroke="#a33" stroke-width="1.6" fill="none"/></g>`;
        case 'fan': return `<g transform="translate(97 92)"><path d="M0 0 L-17 -22 Q0 -36 17 -22 Z" fill="#efe8da" stroke="${INK}" stroke-width=".6"/><path d="M0 0 L-9 -29M0 0 L0 -32M0 0 L9 -29" stroke="${INK}" stroke-width=".4" opacity=".6"/><path d="M-14 -24 Q0 -34 14 -24" stroke="${color}" stroke-width="2" fill="none" opacity=".7"/></g>`;
        case 'orb': return `<circle cx="99" cy="76" r="8" fill="${color}" stroke="${glow}" stroke-width="1"/><circle cx="96.6" cy="73.6" r="2.2" fill="#fff" opacity=".75"/>`;
        case 'staff': return `<rect x="97.4" y="20" width="1.8" height="130" fill="#4b3320"/><path d="M98.2 8 Q106 14 98.2 22 Q90.6 14 98.2 8 Z" fill="${color}" stroke="${INK}" stroke-width=".5"/>`;
        case 'huvo': return huVoBladeLayer(color);
        default: return `<g transform="rotate(9 98 92)"><path d="M96.7 22 L98 12 L99.3 22 L99.3 84 L96.7 84 Z" fill="${shadeColor(color, 0.35)}" stroke="${INK}" stroke-width=".5"/><path d="M98 14 L98 84" stroke="${color}" stroke-width=".7"/><path d="M92.6 84 Q98 86.6 103.4 84" stroke="#caa24a" stroke-width="1.8" fill="none" stroke-linecap="round"/><rect x="97.1" y="85" width="1.8" height="11" fill="#2f2118"/><path d="M98 96 Q95 104 98 110" stroke="#a33" stroke-width="1" fill="none"/></g>`;
    }
}

function crownLayer(crown, color, stage = 0) {
    switch (crown) {
        case 'huvo': return huVoCrownLayer(color, stage);
        case 'guan': return `<path d="M54 10 L55.6 2 Q60 .4 64.4 2 L66 10 Q60 12 54 10 Z" fill="${color}" stroke="${INK}" stroke-width=".5"/><path d="M49 7.6 L71 5.4" stroke="#e6c97a" stroke-width="1" stroke-linecap="round"/>`;
        case 'halo': return `<ellipse cx="60" cy="5" rx="13" ry="3" fill="none" stroke="${color}" stroke-width="1.6"/>`;
        case 'wheel': return `<circle cx="60" cy="27" r="25" fill="none" stroke="${color}" stroke-width="1.2" stroke-dasharray="3 3" opacity=".8"/>`;
        default: return '';
    }
}

function wingLayer(color) {
    if (!color) return '';
    return `<g fill="${color}" opacity=".32"><path d="M44 54 Q14 44 4 66 Q2 86 14 100 Q14 78 26 68 Q36 62 46 62 Z"/><path d="M76 54 Q106 44 116 66 Q118 86 106 100 Q106 78 94 68 Q84 62 74 62 Z"/></g>`;
}

function ribbonLayer(color) {
    if (!color) return '';
    return `<path d="M46 62 Q14 72 16 104 Q17 126 4 146" stroke="${color}" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>
        <path d="M74 62 Q106 72 104 104 Q103 126 116 146" stroke="${color}" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`;
}

/* Họa tiết thêu trên áo theo bậc mốc: ngực để còn thấy ở khung chân dung, tà áo để thấy khi đứng cả người */
const ROBE_MOTIFS = {
    tien: 'M-5 2 q-1 -3 2 -3 q1 -3 4 -2 q3 -1 3 2 q2 1 1 3 Z',
    thanh: 'M0 4 Q-4 0 0 -5 Q4 0 0 4 M0 4 Q-6 3 -6 -2 Q-3 -1 0 4 M0 4 Q6 3 6 -2 Q3 -1 0 4',
    thien: 'M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z',
    hondon: 'M0 0 q2 -2 3 1 q-1 4 -5 2 q-4 -3 -1 -7 q5 -3 8 2',
    hongmong: 'M0 0 Q-3 -6 0 -6 Q3 -6 0 0 M0 0 Q6 -3 6 0 Q6 3 0 0 M0 0 Q3 6 0 6 Q-3 6 0 0 M0 0 Q-6 3 -6 0 Q-6 -3 0 0',
    chungnguyen: 'M-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0',
    huvo: 'M-6 0 A6 6 0 1 1 3 5.2 A4.6 4.6 0 1 0 -6 0 Z M5 -6 L5.7 -4 L7.6 -3.4 L5.7 -2.8 L5 -.8 L4.3 -2.8 L2.4 -3.4 L4.3 -4 Z'
};
const ROBE_MOTIF_SPOTS = [[46, 64, 0.8], [74, 64, 0.8], [43, 116, 1.3], [77, 116, 1.3], [38, 136, 1], [82, 136, 1]];

function robeMotifLayer(motif, color) {
    const shape = ROBE_MOTIFS[motif];
    if (!shape) return '';
    return ROBE_MOTIF_SPOTS.map(([x, y, k]) => `<path transform="translate(${x} ${y}) scale(${k})" d="${shape}" fill="${color}" fill-opacity=".28" stroke="${color}" stroke-width=".7"/>`).join('');
}

/* Bộ đồ Hư Vô: nền vũ trụ tím đen viền ánh trăng; mỗi món một hình riêng, Đạo Quan lớn dần theo tiểu cảnh giới */
const HU_VO_VOID = '#1c0b3a';
const HU_VO_GLOW = '#d9c2ff';
const HU_VO_STARS = [[45, 104, 1], [38, 128, 1.3], [52, 138, 0.8], [75, 104, 1.1], [83, 126, 0.9], [70, 140, 1.3], [33, 142, 0.8], [87, 141, 1], [48, 70, 0.8], [72, 70, 0.8]];
const HU_VO_CROWN_PEAKS = [1, 3, 5, 7];
const HU_VO_CROWN_HEIGHT = [7, 11, 15, 21];

function huVoStar(x, y, k, color = '#ffffff') {
    return `<path transform="translate(${x} ${y}) scale(${k})" d="M0 -2.6 L.5 -.5 L2.6 0 L.5 .5 L0 2.6 L-.5 .5 L-2.6 0 L-.5 -.5 Z" fill="${color}"/>`;
}

function huVoBladeLayer(color) {
    return `<g transform="rotate(9 98 92)">
        <path d="M98 -8 L103.4 12 L102 84 L94 84 L92.6 12 Z" fill="${color}" opacity=".22"/>
        <path d="M98 -6 L101.8 12 L100.6 84 L95.4 84 L94.2 12 Z" fill="${HU_VO_VOID}" stroke="${color}" stroke-width=".9"/>
        <path d="M98 2 L98 82" stroke="#ffffff" stroke-width=".7" opacity=".9"/>
        <path d="M88 86 Q92 80 98 84 Q104 80 108 86 Q98 91 88 86 Z" fill="${HU_VO_VOID}" stroke="${color}" stroke-width=".8"/>
        <circle cx="98" cy="85.4" r="1.8" fill="#ffffff"/>
        <rect x="96.8" y="88" width="2.4" height="12" fill="${HU_VO_VOID}" stroke="${color}" stroke-width=".5"/>
        <path d="M108 26 l3 6 l-3 6 l-3 -6 Z M86 44 l2.4 5 l-2.4 5 l-2.4 -5 Z M110 58 l2 4 l-2 4 l-2 -4 Z" fill="${color}" opacity=".85"/>
    </g>`;
}

function huVoCrownLayer(color, stage) {
    const n = HU_VO_CROWN_PEAKS[stage];
    const tall = HU_VO_CROWN_HEIGHT[stage];
    const spread = 10.5;
    const step = n > 1 ? spread * 2 / (n - 1) : 0;
    const peaks = Array.from({ length: n }, (_, i) => {
        const x = 60 - (n > 1 ? spread : 0) + step * i;
        const off = n > 1 ? Math.abs(x - 60) / spread : 0;
        const top = 9 - tall * (1 - off * 0.55);
        return `<path d="M${x - 2} 12 L${x} ${top} L${x + 2} 12 Z" fill="${HU_VO_VOID}" stroke="${color}" stroke-width=".6"/>${stage >= 2 ? `<circle cx="${x}" cy="${top}" r=".9" fill="#ffffff"/>` : ''}`;
    }).join('');
    return `<g>${peaks}
        <path d="M48.6 13.6 Q60 7.6 71.4 13.6 L70.4 9.8 Q60 4.4 49.6 9.8 Z" fill="${HU_VO_VOID}" stroke="${color}" stroke-width=".7"/>
        <path d="M50 11 Q60 6.2 70 11" stroke="${color}" stroke-width=".5" fill="none" opacity=".8"/>
        <circle cx="60" cy="8.8" r="${1.5 + stage * 0.45}" fill="${color}" stroke="#ffffff" stroke-width=".5"/>
    </g>`;
}

function huVoHaloLayer(color, stage) {
    if (stage === 0) return '';
    const ticks = Array.from({ length: 24 }, (_, i) => `<path transform="rotate(${i * 15} 60 27)" d="M60 -5 L61 ${i % 2 ? -1 : -9} L59 ${i % 2 ? -1 : -9} Z" fill="${color}"/>`).join('');
    return `<g>
        ${stage === 3 ? `<circle cx="60" cy="27" r="31" fill="#07030f"/><circle cx="60" cy="27" r="31" fill="none" stroke="#ffffff" stroke-width=".9"/>` : ''}
        <circle cx="60" cy="27" r="${stage === 1 ? 25 : 29}" fill="none" stroke="${color}" stroke-width="${stage === 1 ? 0.8 : 1.3}" opacity=".9"/>
        ${stage >= 2 ? ticks : ''}
        ${stage === 3 ? [[24, 12], [96, 12], [20, 40], [100, 40], [60, -12]].map(([x, y]) => huVoStar(x, y, 1.3)).join('') : ''}
    </g>`;
}

function huVoWingLayer(color) {
    const feathers = [[46, 56, 2, 40, 12, 70], [46, 58, -2, 66, 12, 88], [46, 60, 2, 92, 16, 104], [47, 62, 10, 114, 24, 112]];
    const wing = feathers.map(([x1, y1, x2, y2, cx, cy]) => `<path d="M${x1} ${y1} Q${cx} ${y1 - 8} ${x2} ${y2} Q${cx + 6} ${cy - 4} ${x1 + 2} ${y1 + 6} Z" fill="${HU_VO_VOID}" stroke="${color}" stroke-width=".7"/>`).join('');
    const stars = [[14, 50], [8, 78], [12, 98], [26, 106]].map(([x, y]) => huVoStar(x, y, 0.9)).join('');
    return `<g>${wing}${stars}</g><g transform="matrix(-1 0 0 1 120 0)">${wing}${stars}</g>`;
}

function huVoRobeLayer(l, L, R, hem) {
    const gear = l.huVoGear;
    if (!gear.armor) return '';
    const shoulder = (x, dir) => `<path d="M${x - dir * 3} 45 L${x + dir * 13} 39 L${x + dir * 9} 47 L${x + dir * 15} 47 L${x + dir * 8} 54 L${x + dir * 2} 58 Z" fill="${HU_VO_VOID}" stroke="${l.trim}" stroke-width=".8"/><circle cx="${x + dir * 5}" cy="49" r="1.4" fill="#ffffff"/>`;
    return `${HU_VO_STARS.map(([x, y, k]) => huVoStar(x, y, k)).join('')}
        <path d="M${60 - hem} 147 q4 -9 7 -3 q3 -11 7 -2 q3 -8 6 0 M${60 + hem} 147 q-4 -9 -7 -3 q-3 -11 -7 -2 q-3 -8 -6 0" stroke="${l.trim}" stroke-width="1" fill="none"/>
        ${shoulder(L, -1)}${shoulder(R, 1)}`;
}

function huVoFrontLayer(l, L) {
    const gear = l.huVoGear;
    const glow = l.trim || HU_VO_GLOW;
    return `${gear.amulet ? `<circle cx="63.6" cy="92" r="5.4" fill="${glow}" opacity=".3"/><path d="M63.6 84 L63.6 88" stroke="${glow}" stroke-width=".7"/><circle cx="63.6" cy="92" r="3.2" fill="#07030f" stroke="${glow}" stroke-width=".9"/>${huVoStar(63.6, 92, 0.9)}` : ''}
        ${gear.ring ? `<ellipse cx="${L - 3}" cy="133" rx="9" ry="3" fill="none" stroke="${glow}" stroke-width=".8" transform="rotate(-18 ${L - 3} 133)"/><circle cx="${L - 11}" cy="135" r="1.3" fill="#ffffff"/>` : ''}
        ${gear.boots ? `<g fill="${glow}"><ellipse cx="42" cy="152" rx="10" ry="2.4" opacity=".35"/><ellipse cx="78" cy="152" rx="10" ry="2.4" opacity=".35"/></g><path d="M34 153 q4 -3 8 0 M70 153 q4 -3 8 0" stroke="#ffffff" stroke-width=".6" fill="none"/>` : ''}`;
}

function robeDefs(l, id) {
    const robe = l.robe;
    return `<defs>
        <linearGradient id="${id}-robe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shadeColor(robe, 0.34)}"/><stop offset=".5" stop-color="${robe}"/><stop offset="1" stop-color="${shadeColor(robe, -0.34)}"/></linearGradient>
        <linearGradient id="${id}-sleeve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shadeColor(robe, 0.22)}"/><stop offset=".6" stop-color="${shadeColor(robe, -0.08)}"/><stop offset="1" stop-color="${shadeColor(robe, 0.5)}"/></linearGradient>
        <linearGradient id="${id}-inner" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f1e6"/><stop offset="1" stop-color="${shadeColor(robe, 0.66)}"/></linearGradient>
        <linearGradient id="${id}-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shadeColor(l.skin, 0.2)}"/><stop offset="1" stop-color="${shadeColor(l.skin, -0.05)}"/></linearGradient>
        <radialGradient id="${id}-iris"><stop offset="0" stop-color="${shadeColor(l.eyes, 0.2)}"/><stop offset="1" stop-color="${shadeColor(l.eyes, -0.3)}"/></radialGradient>
        <filter id="${id}-ink" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".12" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="1.1"/></filter>
    </defs>`;
}

function humanoidSvg(look, opts = {}) {
    const l = { ...defaultLook(), ...look };
    const id = `av${++_svgUid}`;
    const trim = l.trim || '#e6c97a';
    const sash = l.sash || shadeColor(l.robe, -0.4);
    const boots = l.boots || INK;
    const fem = l.body === 'f';
    const sh = fem ? 13.5 : 17, waist = fem ? 7.6 : 10.4, hem = fem ? 27 : 30;
    const L = 60 - sh, R = 60 + sh;
    const inkLine = `stroke="${INK}" stroke-width=".55" stroke-linejoin="round"`;
    const gear = l.huVoGear;
    const tall = l.crown === 'huvo' || gear?.armor;
    const view = tall ? (opts.bust ? '17 -14 86 115' : '-5 -14 130 174') : (opts.bust ? '22 0 76 101' : '0 0 120 160');
    return `<svg class="avatar ${opts.cls || ''}" viewBox="${view}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.title || 'nhân vật'}">
        ${robeDefs(l, id)}
        ${auraLayer(l.aura, id)}
        ${gear?.armor ? huVoWingLayer(trim) : wingLayer(l.wing)}
        ${l.crown === 'huvo' ? huVoHaloLayer(l.crownColor || trim, l.crownStage) : ''}
        <ellipse cx="60" cy="153" rx="34" ry="4" fill="#000" opacity=".28"/>
        ${ribbonLayer(l.aura)}
        ${hairBack(l)}
        <g filter="url(#${id}-ink)">
            <path d="M46 151 q-6 3 -9 1 q2 -4 9 -5 Z M74 151 q6 3 9 1 q-2 -4 -9 -5 Z" fill="${boots}" ${inkLine}/>
            <path d="M${L} 47 Q${L - 1} 62 ${60 - waist} 79 Q${60 - hem + 9} 114 ${60 - hem} 147 Q${60 - hem / 2} 154 60 151 Q${60 + hem / 2} 154 ${60 + hem} 147 Q${60 + hem - 9} 114 ${60 + waist} 79 Q${R + 1} 62 ${R} 47 Q60 41 ${L} 47 Z" fill="url(#${id}-robe)" ${inkLine}/>
            <path d="M54 80 Q52 118 47 151 Q60 154.5 73 151 Q68 118 66 80 Z" fill="url(#${id}-inner)" stroke="${INK}" stroke-width=".5"/>
            <path d="M${60 - hem} 147 Q${60 - hem / 2} 154 47 151 M73 151 Q${60 + hem / 2} 154 ${60 + hem} 147" stroke="${trim}" stroke-width="1.8" fill="none"/>
            <path d="M51 84 Q47 116 41 146 Q48 118 53 86Z M69 84 Q73 116 79 146 Q72 118 67 86Z M57 92 Q56 122 55 148 Q58 122 59 94Z M63 92 Q64 122 65 148 Q62 122 61 94Z" fill="${INK}" opacity=".3"/>
            <path d="M54 44 L60 60 L66 44 Q60 42 54 44 Z" fill="#f6f1e6" stroke="${INK}" stroke-width=".4"/>
            <path d="M52.4 44.6 L55.4 43.6 L69.4 76.6 L65.6 78.4 Z" fill="${trim}" stroke="${INK}" stroke-width=".4"/>
            <path d="M67.6 44.6 L64.6 43.6 L56 62 L58.4 64.4 Z" fill="${shadeColor(trim, -0.18)}" stroke="${INK}" stroke-width=".4"/>
            <path d="M${60 - waist - 1} 75.4 Q60 79 ${60 + waist + 1} 75.4 L${60 + waist + 1.4} 81.6 Q60 85 ${60 - waist - 1.4} 81.6 Z" fill="${sash}" ${inkLine}/>
            <path d="M57 83 Q55 96 56.4 108 M59.4 83.4 Q60 98 58.8 112" stroke="${sash}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
            ${robeMotifLayer(l.motif, trim)}
            ${gear ? huVoRobeLayer(l, L, R, hem) : ''}
            <circle cx="63.6" cy="92" r="2.1" fill="#bff2d2" stroke="${INK}" stroke-width=".4"/><path d="M63.6 84 L63.6 90 M63.6 94 L63.6 101" stroke="#a33" stroke-width=".7"/>
            <path d="M${L + 1} 47 Q${L - 9} 62 ${L - 12} 96 Q${L - 17} 120 ${L - 11} 131 Q${L - 2} 137 ${L + 7} 121 Q${L + 8} 100 ${L + 7} 68 Z" fill="url(#${id}-sleeve)" ${inkLine}/>
            <path d="M${L - 11} 131 Q${L - 2} 137 ${L + 7} 121" stroke="${trim}" stroke-width="1.9" fill="none"/>
            <path d="M${L - 3} 66 Q${L - 7} 96 ${L - 7} 124 M${L + 2} 72 Q${L + 1} 100 ${L + 1} 124" stroke="${INK}" stroke-width=".6" fill="none" opacity=".35"/>
            <path d="M${L - 4} 131.6 q2 4 4.6 3 q2 -1 1.4 -4.6 Z" fill="${l.skin}" stroke="${INK}" stroke-width=".4"/>
        </g>
        ${gear ? huVoFrontLayer(l, L) : ''}
        ${weaponLayer(l.weapon, l.weaponColor || '#c8d4e0')}
        <g filter="url(#${id}-ink)">
            <path d="M${R - 1} 47 Q${R + 8} 56 ${R + 11} 72 L97 78 Q102 84 99 92 Q99 118 86 128 Q76 124 ${R - 3} 96 Q${R - 6} 80 ${R - 7} 64 Z" fill="url(#${id}-sleeve)" ${inkLine}/>
            <path d="M97 78 Q102 84 99 92" stroke="${trim}" stroke-width="1.9" fill="none"/>
            <path d="M${R + 3} 62 Q${R + 3} 88 86 118 M${R - 2} 72 Q${R - 2} 92 80 112" stroke="${INK}" stroke-width=".6" fill="none" opacity=".35"/>
            <path d="M96.4 80 q3.4 -2.4 5.4 0 q1.4 3 -1.4 5.4 q-3.4 .6 -4.6 -1.6 Z" fill="${l.skin}" stroke="${INK}" stroke-width=".4"/>
        </g>
        <path d="M56 36 L56 44 Q60 47 64 44 L64 36 Z" fill="${shadeColor(l.skin, -0.14)}"/><path d="M56 38 Q60 43 64 38 L64 41 Q60 44.4 56 41 Z" fill="${shadeColor(l.skin, -0.34)}" opacity=".5"/>
        <ellipse cx="50.2" cy="27" rx="1.1" ry="2.5" fill="${shadeColor(l.skin, -0.12)}"/><ellipse cx="69.8" cy="27" rx="1.1" ry="2.5" fill="${shadeColor(l.skin, -0.12)}"/>
        <path d="${FACE_SHAPES[l.face || 0]}" fill="url(#${id}-skin)" stroke="${shadeColor(l.skin, -0.4)}" stroke-width=".35"/>
        ${faceLayer(l, id)}
        ${hairFront(l)}
        ${crownLayer(l.crown, l.crownColor || trim, l.crownStage)}
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
const WORLD_TRIMS = { pham: '#e6c97a', tien: '#7fd4ff', thanh: '#ff9d4d', thien: '#d9b8ff', hondon: '#5fe6e6', hongmong: '#ffb3e6', chungnguyen: '#111111', huvo: '#b388ff' };

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
        const tier = gearGateTier(armor);
        look.trim = tier?.color || WORLD_TRIMS[worldTierOfRealm(Math.max(armor.reqRealm || 0, gearSeriesRealm(armor))).id];
        look.motif = tier?.motif;
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
    if (armor?.huVo) Object.assign(look, { robe: HU_VO_VOID, trim: HU_VO_GLOW, sash: '#0d0520', motif: 'huvo' });
    if (boots?.huVo) look.boots = '#120726';
    if (weapon?.huVo) Object.assign(look, { weapon: 'huvo', weaponColor: HU_VO_GLOW });
    if (helm?.huVo) {
        look.crown = 'huvo';
        look.crownColor = HU_VO_GLOW;
        look.crownStage = (state.realmIndex || 0) === REALM_COUNT - 1 ? state.realmStage || 0 : 0;
    }
    const ring = (typeof equippedInSlot === 'function') ? equippedInSlot('ring') : null;
    if ([armor, weapon, helm, boots, amulet, ring].some(it => it?.huVo)) {
        look.huVoGear = { armor: !!armor?.huVo, boots: !!boots?.huVo, amulet: !!amulet?.huVo, ring: !!ring?.huVo };
    }
    return look;
}

function playerAvatarSvg(bust = false) {
    return humanoidSvg(playerLook(), { title: state.name || 'Tu sĩ', bust });
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
    return humanoidSvg(npc.look || defaultLook(), { title: npc.name, bust: true });
}

/* --------- tạo nhân vật --------- */
const LOOK_INDEXED = ['hairStyle', 'face', 'eyeShape', 'brow', 'beard'];

function lookChips(key, values, current, labelOf) {
    return values.map((v, i) => {
        const value = typeof v === 'object' ? v.id : (LOOK_INDEXED.includes(key) ? i : v);
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
        <div class="creator-preview">${humanoidSvg({ ...l, weapon: 'sword' }, { title: 'Xem trước', bust: true })}</div>
        <div class="creator-options">
            <div class="look-row"><span>Thân hình</span><div>${lookChips('body', LOOK_OPTIONS.body, l.body, 'Thân hình')}</div></div>
            <div class="look-row"><span>Kiểu tóc</span><div>${lookChips('hairStyle', LOOK_OPTIONS.hairStyle, l.hairStyle, 'Kiểu tóc')}</div></div>
            <div class="look-row"><span>Khuôn mặt</span><div>${lookChips('face', LOOK_OPTIONS.face, l.face, 'Khuôn mặt')}</div></div>
            <div class="look-row"><span>Mắt</span><div>${lookChips('eyeShape', LOOK_OPTIONS.eyeShape, l.eyeShape, 'Mắt')}</div></div>
            <div class="look-row"><span>Lông mày</span><div>${lookChips('brow', LOOK_OPTIONS.brow, l.brow ?? (l.body === 'f' ? 1 : 0), 'Lông mày')}</div></div>
            <div class="look-row"><span>Râu</span><div>${lookChips('beard', LOOK_OPTIONS.beard, l.beard || 0, 'Râu')}</div></div>
            <div class="look-row"><span>Màu tóc</span><div>${lookChips('hair', LOOK_OPTIONS.hair, l.hair, 'Màu tóc')}</div></div>
            <div class="look-row"><span>Màu da</span><div>${lookChips('skin', LOOK_OPTIONS.skin, l.skin, 'Màu da')}</div></div>
            <div class="look-row"><span>Màu mắt</span><div>${lookChips('eyes', LOOK_OPTIONS.eyes, l.eyes, 'Màu mắt')}</div></div>
            <div class="look-row"><span>Đạo bào</span><div>${lookChips('robe', LOOK_OPTIONS.robe, l.robe, 'Đạo bào')}</div></div>
        </div>
    </div>`;
}

function renderRacePicker() {
    state.race = state.race || 'nhan';
    const cards = Object.entries(RACES).map(([id, race]) => `<button type="button" class="race-card ${state.race === id ? 'active' : ''}" onclick="setRace('${id}')">
        <b>${race.icon} ${race.name}</b><span class="small">${race.desc}</span>
    </button>`).join('');
    const paths = pathsOfRace(state.race);
    if (!paths.includes(state.startPath)) state.startPath = paths[0];
    const pathCards = paths.map(id => `<button type="button" class="race-card ${state.startPath === id ? 'active' : ''}" onclick="setStartPath('${id}')">
        <b>${DAO_PATHS[id].icon} ${DAO_PATHS[id].name}</b><span class="small">Hành ${DAO_PATHS[id].hanh}. ${DAO_PATHS[id].desc}</span>
    </button>`).join('');
    document.getElementById('raceHost').innerHTML = `<div class="race-grid">${cards}</div><div class="race-grid path-grid">${pathCards}</div>`;
}

function setRace(id) {
    state.race = id;
    renderRacePicker();
}

function setStartPath(id) {
    state.startPath = id;
    renderRacePicker();
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

if (typeof window !== 'undefined') Object.assign(window, { setLook, openLookModal, setRace, setStartPath });
