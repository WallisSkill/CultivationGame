/* ===========================================================
   CHỈ DẪN CHỨC NĂNG
   - Mỗi chức năng mới mở theo cảnh giới có một nhiệm vụ chỉ dẫn tự nhận: lời giải thích, rồi bắt làm thử một lần.
   - Bước task được đếm bằng guideDone(task) gọi từ chỗ dùng chức năng; check() có sẵn thì tự xong khi điều kiện đúng.
   - Mỗi lúc chỉ chạy một chỉ dẫn; không làm được thì bỏ qua, không mất gì.
=========================================================== */
const GUIDE_REWARD = { hours: 1, goldRefs: 3 };
const ELEMENT_BEATS = { Kim: 'Mộc', Mộc: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim', Thổ: 'Mộc' };

const GUIDE_QUESTS = [
    {
        id: 'hd_tran_phap', title: 'Chỉ dẫn: Trận Pháp Và Thành Thạo', needs: [0, 0],
        intro: [['narr', 'Pháp bảo bày trên trận pháp sẽ tự ra chiêu trong mọi trận đánh, mỗi món có hồi chiêu riêng. Món nằm trong túi thì không làm gì cả.'],
            ['narr', 'Pháp bảo mới nhận có thành thạo thấp. Hạ quái khi nó đang nằm trên trận thì thành thạo tăng dần tới 100%, lúc đó chỉ số gấp đôi lúc mới nhận và hồi chiêu nhanh hơn.']],
        steps: [
            { task: 'board', label: 'Bày ít nhất một pháp bảo lên trận (tab Trận pháp)', check: () => boardItems().some(Boolean), act: () => setSideTab('board') },
            { task: 'board_kill', n: 5, label: 'Hạ quái khi đang bày trận', act: () => (currentLocation().enemies || []).length ? startHunt() : setWorldView('map'), say: [['narr', 'Thấy thành thạo nhích lên chưa? Rê chuột vào pháp bảo để xem phần trăm.']] }
        ]
    },
    {
        id: 'hd_cap_san', title: 'Chỉ dẫn: Chọn Cấp Săn', needs: [0, 2],
        intro: [['narr', 'Mỗi nơi có quái trong một khoảng cảnh giới. Nút Chọn cấp săn ở dòng kẻ địch cho ngươi giới hạn khoảng đó, và chọn mỗi lần gặp ít nhất mấy con (1 đến 3).'],
            ['narr', 'Gặp càng đông thì mỗi con càng yếu, lùng sục càng nhanh, mà phần thưởng cộng dồn cả bầy.']],
        steps: [{ task: 'hunt_range', label: 'Mở Chọn cấp săn ở nơi có quái và chọn một mức', act: () => (currentLocation().enemies || []).length ? openHuntRange() : showToast('Nơi này không có quái, hãy tới nơi có quái.', 'warn') }]
    },
    {
        id: 'hd_khac_che', title: 'Chỉ dẫn: Khắc Chế Cảnh Giới', needs: [1, 0],
        intro: [['narr', 'Cứ bốn tiểu kỳ là một đại cảnh giới. Chênh nhau từ một đại cảnh giới trở lên thì kẻ dưới gần như không né, không chí mạng, không hút máu được (tối đa 1%), còn kẻ trên đánh mạnh gấp đôi cho mỗi bậc chênh.'],
            ['narr', 'Đổi lại, hạ được quái cao hơn mình thì thưởng nhân thêm 1,4 lần cho mỗi tiểu kỳ chênh lệch: tu vi, linh thạch, nguyên liệu và tỉ lệ rơi đồ.']],
        steps: [{ task: 'over_kill', label: 'Hạ một con quái cao hơn ngươi ít nhất một tiểu kỳ', act: () => (currentLocation().enemies || []).length ? openHuntRange() : setWorldView('map') }]
    },
    {
        id: 'hd_pvp', title: 'Chỉ dẫn: Đấu Trường', needs: [1, 1],
        intro: [['narr', 'Từ Trúc Cơ, ở thành và tông môn có Đấu trường xếp hạng. Hai người bày trận pháp đánh với nhau, khắc chế cảnh giới vẫn tính như khi đánh quái.'],
            ['narr', 'Thắng thua đổi điểm trên Bảng PvP. Thắng kẻ hạng cao được nhiều điểm, thua kẻ hạng thấp mất nhiều.']],
        steps: [{ task: 'pvp', label: 'Mở Đấu trường xếp hạng hoặc Bảng PvP ở thành hay tông môn', act: () => setWorldView('scene') }]
    },
    {
        id: 'hd_ren_do', title: 'Chỉ dẫn: Rèn Đồ', needs: [1, 2],
        intro: [['narr', 'Quái rơi nguyên liệu của Giới mình. Mang nguyên liệu và linh thạch tới nơi có lò, rèn ra trang bị đúng cảnh giới của ngươi.'],
            ['narr', 'Lò càng cao cấp rèn được đồ càng cao, lò Danh trở lên còn cho chọn dòng phụ. Hỏi thợ rèn để biết lò rèn tới cảnh giới nào.']],
        steps: [{ task: 'forge', label: 'Mở lò rèn ở một nơi có lò', act: () => hasService('forge') ? openForge() : setWorldView('map') }]
    },
    {
        id: 'hd_boss', title: 'Chỉ dẫn: Boss Thế Giới', needs: [1, 3],
        intro: [['narr', 'Mỗi Giới có một Boss Thế Giới, máu dùng chung cho mọi người chơi. Ai đánh cũng trừ vào cùng một thanh máu.'],
            ['narr', 'Boss chết thì mọi người góp sức đều được thưởng theo phần đóng góp, rồi một giờ sau boss sống lại.']],
        steps: [{ task: 'world_boss', label: 'Mở Boss Thế Giới ở thành hay tông môn', act: () => setWorldView('scene') }]
    },
    {
        id: 'hd_ngu_hanh', title: 'Chỉ dẫn: Ngũ Hành Xung Khắc', needs: [2, 0],
        intro: [['narr', 'Kim Đan thành, ngũ hành trong linh căn bắt đầu có sức. Kim khắc Mộc, Mộc khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Thổ khắc Mộc.'],
            ['narr', 'Đánh kẻ bị mình khắc được thêm 20% sát thương, bị khắc thì mất 20%. Kẻ chưa tới Kim Đan gặp quái đã có ngũ hành thì luôn bị thiệt 20%.']],
        steps: [{ task: 'element_kill', n: 5, label: () => `Hạ quái bị ngươi khắc (linh căn ${(state.root?.elements || []).join(', ') || 'chưa có'}, khắc ${[...new Set((state.root?.elements || []).map(e => ELEMENT_BEATS[e]).filter(Boolean))].join(', ') || 'không hệ nào'})` }]
    },
    {
        id: 'hd_dich_chuyen', title: 'Chỉ dẫn: Dịch Chuyển', needs: [2, 1],
        intro: [['narr', 'Đi bộ tốn thời gian thật. Đã nhập một tông môn và đạt Kim Đan thì ở Phàm Giới có thể dịch chuyển tức thì tới mọi nơi trong Giới đó.'],
            ['narr', 'Mở Thiên Hạ Đồ, chọn một nơi rồi bấm Dịch chuyển. Mỗi Giới cao hơn cần cảnh giới cao hơn mới mở được.']],
        steps: [{ task: 'teleport', label: 'Dịch chuyển một lần trên Thiên Hạ Đồ', act: () => setWorldView('map') }]
    },
    {
        id: 'hd_nang_pham', title: 'Chỉ dẫn: Nâng Phẩm Pháp Bảo', needs: [3, 0],
        intro: [['narr', 'Từ Nguyên Anh, pháp bảo lên được phẩm mới. Hợp nhất một món với vài pháp bảo cùng giai nằm ngoài trận và một ít linh thạch, nó thăng một giai.'],
            ['narr', 'Chỉ món đã thành thạo 100% mới nâng được, và mỗi lần lên phẩm thành thạo giảm 75%. Hãy nâng món ngươi đã dùng lâu nhất.']],
        steps: [{ task: 'fuse', label: 'Hợp nhất một pháp bảo lên phẩm mới (tab Túi đồ)', act: () => setSideTab('bag') }]
    },
    {
        id: 'hd_lap_tong', title: 'Chỉ dẫn: Khai Tông Lập Phái', needs: [3, 1],
        intro: [['narr', 'Nguyên Anh đã đủ tư cách mở sơn môn riêng. Sơn môn đặt ở nơi ngươi đứng, không dời được, và không đặt ở bí cảnh hay cổng Giới.'],
            ['narr', 'Tông môn riêng có công trình để xây, đệ tử để thu. Lập tông thì tự rời tông đang ở.']],
        steps: [{ task: 'sect', label: 'Mở khung Khai tông lập phái (tab Tông môn)', check: () => !!state.ownSect, act: () => setSideTab('sect') }]
    },
    {
        id: 'hd_thien_dinh', title: 'Chỉ dẫn: Lệnh Thiên Đình', needs: [9, 1],
        when: () => Object.values(LOCATIONS).some(l => l.world === 'tien' && (l.services || []).includes('board') && canEnterLocation(l.id)),
        intro: [['narr', 'Ở Tiên Giới, Thiên Đình Điện giao lệnh diệt quái đúng tên, đúng cảnh giới. Đăng ký Tiên Vị rồi nhận cùng lúc tối đa 5 lệnh.'],
            ['narr', 'Lệnh càng cao càng khó mà công lao càng lớn. Từ Huyền Tiên, ở đâu trong Giới cũng mở được Thiên Đình Điện.']],
        steps: [{ task: 'court', label: 'Nhận một lệnh ở Thiên Đình Điện', check: () => (state.courtOrders || []).length > 0, act: () => setWorldView('scene') }]
    }
];

GUIDE_QUESTS.forEach(q => {
    q.guide = true;
    q.npc = 'narr';
    q.reward = GUIDE_REWARD;
    QUEST_INDEX[q.id] = q;
});

function elementBeaten(unit) {
    const beats = (state.root?.elements || []).map(e => ELEMENT_BEATS[e]);
    return (unit.elements || []).some(e => beats.includes(String(e).replace(/.*(Kim|Mộc|Thủy|Hỏa|Thổ).*/, '$1')));
}

/* Gọi khi hạ quái: đếm cho các chỉ dẫn cần hạ quái */
function guideKills(killed) {
    if (boardItems().some(Boolean)) guideDone('board_kill', killed.length);
    if ((state.realmIndex || 0) >= 2) guideDone('element_kill', killed.filter(elementBeaten).length);
    if (killed.some(unit => overlevelRewardMult(unit) > 1)) guideDone('over_kill');
}

function guideRuntime() {
    return state.questActive.find(rt => QUEST_INDEX[rt.id]?.guide) || null;
}

function guideLabel(step) {
    return typeof step.label === 'function' ? step.label() : step.label;
}

function checkGuideStep() {
    const rt = guideRuntime();
    if (rt && questStep(rt)?.check?.()) completeStep(rt);
}

function advanceGuides() {
    if (guideRuntime()) return checkGuideStep();
    const q = GUIDE_QUESTS.find(g => !state.questDone.includes(g.id) && needsMet(g) && (!g.when || g.when()));
    if (!q) return;
    state.questActive.push({ id: q.id, step: 0, n: 0 });
    log(`🧭 ${q.title}`);
    playDialogue(q.intro);
    checkGuideStep();
    renderAll();
}

function guideDone(task, n = 1) {
    const rt = guideRuntime();
    const step = rt && questStep(rt);
    if (step?.task !== task || !(n > 0)) return;
    rt.n += n;
    if (rt.n >= (step.n || 1)) completeStep(rt);
    else renderAll();
}

function skipGuide(id) {
    const rt = state.questActive.find(x => x.id === id);
    if (!rt) return;
    state.questActive = state.questActive.filter(x => x !== rt);
    state.questDone.push(id);
    log(`🧭 Bỏ qua: ${QUEST_INDEX[id].title}`);
    renderAll();
}

if (typeof window !== 'undefined') Object.assign(window, { advanceGuides, guideDone, guideKills, skipGuide });
