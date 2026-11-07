/* ===========================================================
   VÒNG SAU LƯNG TRONG CỐT TRUYỆN
   - NPC_REALM: cảnh giới NPC để hiện vòng; Lão Mặc không có vòng nào nhìn thấy được.
   - RING_TALES: cảnh truyện khi người chơi đạt mốc vòng.
   - Lời phán xét: mỗi NPC nói bằng giọng riêng trong voices.js, theo việc mình cao hơn, ngang hay đã bị người chơi vượt.
=========================================================== */
const NPC_REALM = { thai_thanh: 21, nguyen_thuy: 21, thong_thien: 20, nu_oa: 20, tiep_dan: 19, chuan_de: 19, thai_so: 28, huyen_mau: 28, kiem_to: 28, van_kiep: 28, to_dao: 3, chuong_mon: 6, tien_lai: 9 };
const NPC_STAGE = { thai_thanh: 3, nguyen_thuy: 1, thong_thien: 2, nu_oa: 0, tiep_dan: 2, chuan_de: 0, hau_tho: 1 };
const NPC_NO_RING = ['mac'];

function storyRealmOf(key) {
    if (NPC_REALM[key] != null) return NPC_REALM[key];
    if (HH_RANKS[key]) return HH_RANKS[key][0];
    const fought = Object.values(BOSSES).filter(b => b.npc === key).map(b => b.shownRealm ?? b.realm);
    if (fought.length) return Math.max(...fought);
    if (/Đạo Giả/.test(NPCS[key].title || '')) return OVERSEER_REALM;
    const met = MAIN_QUESTS.find(q => questAllSteps(q).some(step => step.say?.some(line => line[0] === key)));
    return met ? met.needs[0] : null;
}

Object.keys(NPCS).filter(key => !NPC_NO_RING.includes(key)).forEach(key => {
    const realm = storyRealmOf(key);
    if (realm == null) return;
    NPCS[key].daoRealm = realm;
    if (NPC_STAGE[key] != null) NPCS[key].daoStage = NPC_STAGE[key];
    else if (HH_RANKS[key]?.[1] != null) NPCS[key].daoStage = HH_RANKS[key][1];
    NPCS[key].storyNpc = true;
});
const NPC_WORLDS = {};
Object.values(LOCATIONS).forEach(loc => {
    [residentKey(loc.id), ...LOCATION_NPCS[loc.id]].filter(key => !NPC_NO_RING.includes(key)).forEach(key => {
        if (!NPCS[key]) return;
        (NPC_WORLDS[key] = NPC_WORLDS[key] || new Set()).add(loc.world);
        if (NPCS[key].daoRealm == null) NPCS[key].daoRealm = loc.enemyMax ?? loc.maxR;
    });
});
/* Thánh Giới chỉ Lục Thánh thành Thánh: người chỉ sống ở đó dừng ở trần quái của Giới */
Object.entries(NPC_WORLDS).forEach(([key, worlds]) => {
    if (NPC_REALM[key] != null || HH_RANKS[key] || worlds.size !== 1) return;
    const cap = Object.values(LOCATIONS).find(loc => worlds.has(loc.world) && loc.enemyMax != null)?.enemyMax;
    if (cap != null && NPCS[key].daoRealm > cap) NPCS[key].daoRealm = cap;
});
Object.values(NPCS).forEach(npc => {
    if (npc.daoRealm == null || !npc.look) return;
    npc.look.ringRealm = npc.daoRealm;
    if (npc.look.crown === 'wheel') delete npc.look.crown;
});

const RING_NUMBERS = { 1: 'một', 2: 'hai', 3: 'ba', 4: 'bốn', 5: 'năm', 6: 'sáu', 7: 'bảy', 8: 'tám', 9: 'chín', 10: 'mười' };

function ringName(realm) {
    const style = backRingStyle(realm);
    const detail = realm >= 22 && realm <= 28 ? ' đầy hoa văn' : '';
    return `${RING_NUMBERS[style.radii.length]} vòng ${style.name}${detail}`;
}

const RING_TALES = {
    1: [['narr', 'Sáng nay trên vách động phủ, bóng lưng ngươi có thêm vòng trắng thứ hai, như vòng tuổi trên gốc cây. Phàm nhân không thấy. Tu sĩ nào cũng thấy.'], ['mac', 'Hai vòng à? Mỗi bước lên lại thêm một vòng, ai đi đường này cũng thế. Đừng đếm sớm.']],
    9: [['narr', 'Chín vòng trắng tan đi, chỉ còn một vòng màu nước biển. Ngươi lại bắt đầu đếm từ một. Giám Binh ở Phi Thăng Trì liếc lưng ngươi rồi mới nhìn mặt ngươi, và ghi một dòng vào sổ.'], ['tien_lai', 'Ở đây người ta đọc vòng trước khi đọc tên. Vòng là thứ dễ đếm nhất của một con người.']],
    15: [['narr', 'Bảy vòng xanh mọc thêm răng và chấm sao. Thiên binh quỳ xuống, nhưng đầu họ cúi về phía lưng ngươi chứ không phải mặt ngươi.'], ['me', 'Họ quỳ trước cái vòng.'], ['narr', 'Không ai trả lời. Ở Tiên Giới, đó là câu trả lời.']],
    19: [['narr', 'Mười vòng xanh vỡ ra và liền lại thành một vòng vàng. Ngươi tưởng đó là phần thưởng, cho tới khi nhận ra nó không ngừng quay dù ngươi đứng yên.'], ['thai_thanh', 'Một vòng vàng nặng hơn mười vòng xanh. Lúc mới có ta cũng soi gương cả ngày.']],
    20: [['narr', 'Vòng vàng thứ hai mọc ra bên ngoài vòng đầu. Tiếng chuông Tu Di vang lên đúng lúc, như thể có ai đó vừa đánh dấu.']],
    21: [['thai_thanh', 'Ba vòng. Trong sáu chúng ta chỉ ta và Nguyên Thủy đứng tới đây, và cả hai đã dạy Thánh Giới rằng không có vòng vàng thứ tư.'], ['me', 'Có không?'], ['thai_thanh', 'Câu đó hỏi xong thì đừng để ai nghe thấy.']],
    22: [['narr', 'Ngươi chờ vòng vàng thứ tư. Nó không đến. Thay vào đó, trên vòng ngoài hiện lên tám hạt sáng, xếp đều như ai đó vừa chấm mực.'], ['van_kiep', 'Đừng ngạc nhiên. Từ đây trời không thêm vòng cho ngươi, chỉ thêm chữ.']],
    25: [['narr', 'Hoa văn trên lưng ngươi đã dày tới mức có thể đọc. Ngươi soi xuống mặt nước và đọc thử: đó là những nét chép lại mọi trận ngươi từng đánh.']],
    28: [['narr', 'Sáu ngôi sao đi vào quỹ đạo quanh ba vòng vàng. Ngươi tạo ra một thế giới, và cư dân đầu tiên của nó ngước lên thấy vòng của ngươi trên trời, gọi đó là mặt trời.']],
    29: [['narr', 'Ba vòng vàng tan ra thành năm vòng tím. Hóa ra trên ba vòng vàng vẫn còn đường, chỉ là Lục Thánh chưa từng đứng đủ cao để thấy.'], ['vong_ky', 'Năm vòng. Ở Hỗn Độn Hải ai cũng có năm vòng, nên ở đây chẳng ai nhìn lưng ai cả. Thoải mái chứ?']],
    30: [['narr', 'Bảy vòng đỏ viền vàng. Màu ấy không phải màu lửa. Ngươi nhận ra nó khi nhớ lại lần đầu thấy máu của chính mình.'], ['hd_thu_cuu', 'Hồng Mông không vẽ gì mới. Nó chỉ trả lại màu cho những thứ ngươi đã quên.']],
    31: [['narr', 'Chín vòng trắng viền vàng. Đứng trên Chung Nguyên Đài nhìn xuống, ngươi thấy một cái sân nhỏ rất xa, trên đó có những vệt chổi tròn. Chín vệt, trùng khít với lưng ngươi.'], ['me', 'Từ đầu tới cuối, đây là vết chổi.'], ['mac', '(Tiếng chổi vọng từ rất xa) Lá rụng theo vòng thì quét theo vòng thôi.']],
    32: [['narr', 'Vòng thứ mười mọc ra màu đen. Nó không có trong sân của ai, không có trong sổ của ai. Lần đầu tiên, có một vòng không do ai vẽ cho ngươi.']]
};

function playRingTales() {
    const realm = state.realmIndex || 0;
    const due = Object.keys(RING_TALES).map(Number).filter(mark => mark > state.ringTale && mark <= realm);
    state.ringTale = Math.max(state.ringTale, realm);
    due.forEach(mark => playDialogue(RING_TALES[mark]));
}

const RING_JUDGE = {
    hidden: ['Ta không thấy vòng nào sau lưng ông ấy. Có lẽ vì thế mà ông ấy nhìn ai cũng như nhìn lá rụng.']
};

/* Lục Thánh giấu cảnh giới: trước khi người chơi lên Chí Thánh, cả sáu chỉ hiện là Thánh Nhân Cảnh */
const SAINT_REVEAL_REALM = 20;

/* Cảnh giới thật lộ ra khi người chơi đủ tầm nhìn: Hạo Thiên là Chuẩn Thánh Viên Mãn, không phải Tiên Đế */
const NPC_TRUE_RANK = { tien_de: { realm: 18, stage: 3, from: SAINT_REVEAL_REALM } };

function npcShownRealm(npc, key) {
    const truth = NPC_TRUE_RANK[key];
    if (truth && (state.realmIndex || 0) >= truth.from) return { realm: truth.realm, stage: truth.stage };
    const hit = [...(HH_RANK_STEPS[key] || [])].reverse().find(s => s.quest ? state.questDone.includes(s.quest) : (state.realmIndex || 0) >= s.at);
    if (hit) return { realm: hit.realm, stage: hit.stage ?? null };
    const mask = HH_DISGUISE[key];
    if (mask && !hhRevealed(mask)) return { realm: mask.realm, stage: null };
    if (NPC_STAGE[key] != null && (state.realmIndex || 0) < SAINT_REVEAL_REALM) return { realm: SAINT_REALM, stage: null };
    return { realm: npc.daoRealm, stage: npc.daoStage ?? null };
}

function syncHiddenSaints() {
    syncDisguises();
    [...Object.keys(NPC_STAGE), ...Object.keys(NPC_TRUE_RANK), ...Object.keys(HH_RANK_STEPS), ...Object.keys(HH_DISGUISE)].forEach(key => {
        if (NPCS[key]?.look) NPCS[key].look.ringRealm = npcShownRealm(NPCS[key], key).realm;
    });
}

function ringBucket(npc, realm, stage = 0, key = null) {
    const shown = npcShownRealm(npc, key);
    const theirs = shown.realm * STAGES.length + (shown.stage ?? 0);
    const mine = realm * STAGES.length + (shown.stage != null ? stage : 0);
    if (theirs > mine) return 'up';
    return theirs === mine ? 'even' : 'down';
}

function capitalize(text) {
    return text[0].toUpperCase() + text.slice(1);
}

function npcRealmRemarkHTML(key) {
    const npc = NPCS[key];
    const realm = state.realmIndex || 0;
    if (npc.daoRealm == null) {
        if (!NPC_NO_RING.includes(key)) return '';
        return `<div class="small">🔘 Không nhìn thấu cảnh giới</div><div class="small"><i>${RING_JUDGE.hidden[0]}</i></div>`;
    }
    const shown = npcShownRealm(npc, key);
    const lines = npcVoice(key)[ringBucket(npc, realm, state.realmStage || 0, key)];
    const ring = ringName(realm);
    const words = { me: REALMS[realm], below: REALMS[Math.max(0, realm - 1)], npc: REALMS[shown.realm], ring, Ring: capitalize(ring), Me: REALMS[realm], loc: currentLocation().name };
    const line = voiceText(lines[(NPC_SEED(key) + realm) % lines.length], words);
    return `<div class="small">🔘 ${REALMS[shown.realm]}${shown.stage != null ? ` ${STAGES[shown.stage]}` : ''} · ${ringName(shown.realm)}</div><div class="small"><i>“${line}”</i></div>`;
}
