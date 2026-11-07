/* ===========================================================
   HỒNG HOANG — những người và chuyện cũ của Tam Giới.
   - Lục Nguyên: Thần Cảnh Lục Nguyên là sáu nguyên, ngưng từng nguyên một, đủ sáu mới Quy Nhất.
   - Tam Giới Sinh Lão Bệnh Tử: muốn thành Thánh phải tự trải sinh, lão, bệnh, tử ở Thiên, Nhân, Âm Giới.
   - Truyện phụ: Tây Du, Phong Thần, Vu Yêu, Phật môn, Âm Giới Hậu Thổ.
   - Thiên Ma Ngoại Vực: Hỗn Độn Ma Thần còn sống, giấu mặt dưới những cái tên tầm thường.
   - Nạp sau tienarc.js, trước storyscenes.js.
=========================================================== */
Object.assign(NPCS, {
    thai_van: { name: 'Thải Vân Đồng Tử', title: 'Người giữ Nữ Oa Miếu', look: NPC_LOOK('f', 0, '#1b1b22', '#e88aa8', { weapon: 'fan', weaponColor: '#ffb3d9' }) },
    van_tieu: { name: 'Vân Tiêu Tiên Tử', title: 'Đại tỷ Tam Tiêu, Tiệt Giáo', look: NPC_LOOK('f', 2, '#1b1b22', '#3f6f9e', { weapon: 'orb', weaponColor: '#9fd3ff', aura: '#9fd3ff' }) },
    quynh_tieu: { name: 'Quỳnh Tiêu Tiên Tử', title: 'Nhị tỷ Tam Tiêu, Tiệt Giáo', look: NPC_LOOK('f', 1, '#1b1b22', '#8a5a9e', { weapon: 'sword', weaponColor: '#e0b3ff' }) },
    kim_linh: { name: 'Kim Linh Thánh Mẫu', title: 'Thân truyền Tiệt Giáo', look: NPC_LOOK('f', 3, '#1b1b22', '#b5832e', { crown: 'guan', crownColor: '#ffd479', weapon: 'orb', weaponColor: '#ffd479' }) },
    duong_tien: { name: 'Dương Tiễn', title: 'Nhị Lang Hiển Thánh Chân Quân', look: NPC_LOOK('m', 2, '#1b1b22', '#c9c9d6', { weapon: 'spear', weaponColor: '#dbe8f7', eyes: '#ffd479' }) },
    na_tra: { name: 'Na Tra', title: 'Tam Đàn Hải Hội Đại Thần', look: NPC_LOOK('m', 3, '#1b1b22', '#c23a3a', { weapon: 'spear', weaponColor: '#ff6b3d', aura: '#ff9a6b' }) },
    ly_tinh: { name: 'Lý Tịnh', title: 'Thác Tháp Thiên Vương', look: NPC_LOOK('m', 0, '#1b1b22', '#b5832e', { beard: true, crown: 'guan', crownColor: '#ffd479', weapon: 'orb', weaponColor: '#ffcf40' }) },
    ngo_khong: { name: 'Tôn Ngộ Không', title: 'Tề Thiên Đại Thánh', look: NPC_LOOK('m', 4, '#b5832e', '#c26a2a', { skin: '#d9a066', eyes: '#ffcf40', crown: 'guan', crownColor: '#ffd479', weapon: 'staff', weaponColor: '#ffcf40' }) },
    bat_gioi: { name: 'Trư Bát Giới', title: 'Thiên Bồng Nguyên Soái năm xưa', look: NPC_LOOK('m', 5, '#1b1b22', '#2f5f9e', { skin: '#f0b8b8', weapon: 'axe', weaponColor: '#c9c9d6' }) },
    sa_tang: { name: 'Sa Ngộ Tĩnh', title: 'Quyển Liêm Đại Tướng năm xưa', look: NPC_LOOK('m', 5, '#2b2b35', '#55524a', { beard: true, skin: '#b8a48a', weapon: 'staff', weaponColor: '#c9c9d6' }) },
    kim_thien: { name: 'Kim Thiền Tử', title: 'Đệ tử thứ hai của Phật môn', look: NPC_LOOK('m', 5, '#1b1b22', '#d9a520', { crown: 'wheel', crownColor: '#ffd479' }) },
    nhien_dang: { name: 'Nhiên Đăng Cổ Phật', title: 'Quá Khứ Phật', look: NPC_LOOK('m', 5, '#c9c9d6', '#d9a520', { beard: true, crown: 'wheel', crownColor: '#ffcf40', weapon: 'staff', weaponColor: '#ffd479' }) },
    quan_am: { name: 'Quan Thế Âm Bồ Tát', title: 'Xưa là Từ Hàng Đạo Nhân', look: NPC_LOOK('f', 3, '#1b1b22', '#e8e4d8', { crown: 'halo', crownColor: '#ffffff', weapon: 'orb', weaponColor: '#bfe3ff' }) },
    tran_nguyen: { name: 'Trấn Nguyên Tử', title: 'Địa Tiên Chi Tổ', look: NPC_LOOK('m', 0, '#c9c9d6', '#8c6a3a', { beard: true, weapon: 'fan', weaponColor: '#d9d4c5' }) },
    hau_tho: { name: 'Hậu Thổ Nương Nương', title: 'Thánh Nhân Âm Giới, Tổ Vu hóa Luân Hồi', look: NPC_LOOK('f', 3, '#1b1b22', '#55402a', { crown: 'halo', crownColor: '#c9a46a', aura: '#8c6a3a' }) },
    manh_ba: { name: 'Mạnh Bà', title: 'Người nấu canh quên', look: NPC_LOOK('f', 0, '#c9c9d6', '#55402a', { weapon: 'staff', weaponColor: '#8a6a4a' }) },
    diem_vuong: { name: 'Tần Quảng Vương', title: 'Điện thứ nhất Thập Điện Diêm La', look: NPC_LOOK('m', 4, '#1b1b22', '#2b0b12', { beard: true, crown: 'guan', crownColor: '#c9a46a' }) },
    phan_quan: { name: 'Thôi Phán Quan', title: 'Người giữ Sổ Sinh Tử', look: NPC_LOOK('m', 0, '#1b1b22', '#3a2a1a', { beard: true, weapon: 'fan', weaponColor: '#c9c9d6' }) },
    minh_ha_to: { name: 'Minh Hà Lão Tổ', title: 'Chủ Huyết Hải, tổ A Tu La', look: NPC_LOOK('m', 2, '#5a0b12', '#2b0b12', { aura: '#a8342a', eyes: '#ff3b3b', weapon: 'sword', weaponColor: '#c23a3a' }) },
    dia_tang: { name: 'Địa Tạng Vương Bồ Tát', title: 'Người giữ cửa Âm Giới', look: NPC_LOOK('m', 5, '#1b1b22', '#8a5a1e', { crown: 'wheel', crownColor: '#ffcf40', weapon: 'staff', weaponColor: '#ffcf40' }) },
    hau_nghe: { name: 'Hậu Nghệ', title: 'Đại Vu bắn mặt trời', look: NPC_LOOK('m', 4, '#1b1b22', '#6b3a2a', { beard: true, weapon: 'spear', weaponColor: '#ff9a3d' }) },
    de_giang: { name: 'Đế Giang', title: 'Tàn hồn Tổ Vu đứng đầu', look: NPC_LOOK('m', 4, '#7a1f2b', '#3a2a1a', { aura: '#c94a2a', eyes: '#ff6b3d' }) },
    de_tuan: { name: 'Đế Tuấn', title: 'Tàn ảnh Yêu Đế', look: NPC_LOOK('m', 2, '#b5832e', '#5a2a0a', { crown: 'guan', crownColor: '#ffd479', aura: '#ffcf40' }) },
    thai_nhat: { name: 'Đông Hoàng Thái Nhất', title: 'Tàn ảnh Yêu Hoàng, chủ Hỗn Độn Chung', look: NPC_LOOK('m', 2, '#ffcf40', '#7a2a0a', { crown: 'halo', crownColor: '#ffcf40', aura: '#ff9a3d', weapon: 'orb', weaponColor: '#ffcf40' }) },
    nhu_lai: { name: 'Như Lai Phật Tổ', title: 'Giáo chủ Linh Sơn', look: NPC_LOOK('m', 5, '#1b1b22', '#d9a520', { crown: 'wheel', crownColor: '#ffd479', aura: '#ffd479' }) },
    can_khon: { name: 'Càn Khôn Lão Tổ', title: 'Hỗn Độn Ma Thần', look: NPC_LOOK('m', 0, '#c9c9d6', '#3a2a6e', { beard: true, aura: '#c7a1ff' }) },
    am_duong_to: { name: 'Âm Dương Lão Tổ', title: 'Hỗn Độn Ma Thần', look: NPC_LOOK('m', 1, '#f0f0f0', '#1b1b22', { aura: '#e9eef7' }) },
    thoi_than: { name: 'Thời Thần', title: 'Hỗn Độn Ma Thần', look: NPC_LOOK('m', 0, '#dbe8f7', '#2a4f8f', { beard: true, aura: '#9fd3ff' }) },
    duong_mi: { name: 'Dương Mi Đại Tiên', title: 'Hỗn Độn Ma Thần', look: NPC_LOOK('m', 1, '#1b1b22', '#3e7d5a', { aura: '#7be4a8', weapon: 'staff', weaponColor: '#7be4a8' }) },
    la_hau: { name: 'La Hầu', title: 'Ma Tổ, Hỗn Độn Ma Thần', look: NPC_LOOK('m', 2, '#2b2b35', '#2b0b12', { aura: '#a8342a', eyes: '#ff3b3b', weapon: 'sword', weaponColor: '#a8342a' }) },
    ban_co: { name: 'Bàn Cổ', title: 'Người khai thiên', look: NPC_LOOK('m', 4, '#55402a', '#3a2a1a', { beard: true, aura: '#ffcf40', weapon: 'axe', weaponColor: '#ffd479' }) }
});
Object.assign(NPCS.bich_tieu, { title: 'Tam muội Tam Tiêu, Tiệt Giáo', look: NPC_LOOK('f', 1, '#1b1b22', '#3e7d5a', { weapon: 'orb', weaponColor: '#7be4a8' }) });
Object.assign(NPCS.di_lac, { title: 'Vị Lai Phật' });

/* Ai sống ở đâu, ngoài người giao việc: storyscenes.js đưa vào LOCATION_NPCS */
const HH_HOMES = {
    tiet_giao: ['van_tieu', 'quynh_tieu', 'bich_tieu', 'kim_linh'],
    oa_giao: ['thai_van'],
    nam_thien_mon: ['duong_tien'],
    bac_thien_mon: ['na_tra', 'ly_tinh'],
    thien_ha: ['bat_gioi'],
    hoa_qua: ['ngo_khong'],
    ngu_hanh: ['ngo_khong', 'quan_am'],
    luu_sa: ['sa_tang', 'quan_am'],
    tay_giao: ['kim_thien', 'nhien_dang', 'di_lac'],
    ngu_trang: ['tran_nguyen'],
    am_gioi: ['hau_tho'],
    bat_canh: ['thai_thanh'],
    ngoc_hu: ['nguyen_thuy'],
    bich_du: ['thong_thien'],
    oa_hoang: ['nu_oa'],
    cuc_lac: ['chuan_de'],
    thuy_van: ['dia_tang'],
    manh_ba: ['manh_ba'],
    thap_dien: ['diem_vuong'],
    sinh_tu: ['phan_quan'],
    minh_ha: ['minh_ha_to'],
    ban_co_dien: ['hau_nghe', 'de_giang'],
    quang_han: ['hang_nga'],
    yeu_dinh: ['de_tuan', 'thai_nhat'],
    linh_son: ['nhu_lai', 'tiep_dan'],
    van_gioi: ['can_khon'],
    luan_hoi: ['am_duong_to'],
    tinh_mo: ['thoi_than'],
    hu_nhan: ['duong_mi'],
    ma_vuc: ['la_hau'],
    khai_thien: ['ban_co']
};

/* Cảnh giới theo cốt truyện: [cảnh giới, tiểu cảnh]. Đại đệ tử của Thánh đều là Chuẩn Thánh */
const HH_RANKS = {
    huyen_do: [18, 2], quang_thanh: [18, 1], da_bao: [18, 3], kim_linh: [18, 1], trieu_minh: [17, 2],
    van_tieu: [17, 3], quynh_tieu: [17, 2], bich_tieu: [17, 1], thai_van: [14, 0],
    duong_tien: [17, 2], na_tra: [17, 1], ly_tinh: [16, 0], thai_bach: [17, 0], dao_tri_mau: [17, 1],
    ngo_khong: [17, 3], bat_gioi: [15, 2], sa_tang: [14, 2], kim_thien: [17, 3],
    nhien_dang: [18, 3], di_lac: [18, 1], quan_am: [18, 0], nhu_lai: [18, 3],
    tran_nguyen: [18, 3], hau_tho: [19, 1], dia_tang: [18, 2], manh_ba: [16, 0], diem_vuong: [16, 2], phan_quan: [14, 1], minh_ha_to: [18, 3], hau_nghe: [17, 3], de_giang: [18, 3],
    de_tuan: [18, 3], thai_nhat: [18, 3], con_bang: [18, 2],
    can_khon: [26, 3], am_duong_to: [26, 3], thoi_than: [27, 1], duong_mi: [27, 2], la_hau: [27, 3], ban_co: [28, 3]
};

/* Cảnh giới đổi theo truyện: bước sau cùng đã tới thì hiện bước đó */
const HH_RANK_STEPS = {
    van_nguyet: [{ at: 9, realm: 10 }, { at: 13, realm: 14 }, { at: 16, realm: 17 }, { at: 19, realm: 18, stage: 0 }, { quest: 'mc21_1', realm: 18, stage: 3 }]
};

/* Ma Thần giấu mặt: trước khi lộ chỉ hiện tên giả và cảnh giới Diệt Thiên */
const HH_DISGUISE = {
    can_khon: { name: 'Lão Nhặt Đá', title: 'Kẻ lượm xác thế giới', until: 'hh_ma_can_khon' },
    am_duong_to: { name: 'Người Chèo Đò Hai Mặt', title: 'Lái đò Luân Hồi Hải', until: 'hh_ma_am_duong' },
    thoi_than: { name: 'Lão Giữ Mộ', title: 'Người quét Tinh Thần Mộ', until: 'hh_ma_thoi_than' },
    duong_mi: { name: 'Gã Trồng Liễu', title: 'Kẻ trồng cây trong hư không', until: 'hh_ma_duong_mi' },
    la_hau: { name: 'Hắc Y Khách', title: 'Kẻ ngồi một mình ở Ma Vực', until: 'hh_ma_la_hau' },
    ban_co: { name: 'Người Khổng Lồ Ngủ', title: 'Núi đá hình người', until: 'hh_ma_ban_co' }
};
Object.entries(HH_DISGUISE).forEach(([key, mask]) => {
    Object.assign(mask, { trueName: NPCS[key].name, trueTitle: NPCS[key].title, realm: 23 });
    Object.assign(NPCS[key], { name: mask.name, title: mask.title });
});

function hhRevealed(mask) {
    return state.questDone.includes(mask.until) || state.questActive.some(rt => rt.id === mask.until && rt.step >= 1);
}

function syncDisguises() {
    syncAmGioi();
    Object.entries(HH_DISGUISE).forEach(([key, mask]) => {
        const shown = hhRevealed(mask);
        NPCS[key].name = shown ? mask.trueName : mask.name;
        NPCS[key].title = shown ? mask.trueTitle : mask.title;
    });
}

Object.assign(BOSSES, {
    hh_duong_tien: { npc: 'duong_tien', realm: 14, stage: 2, board: 5, path: 'kiem' },
    hh_na_tra: { npc: 'na_tra', realm: 13, stage: 2, board: 5 },
    hh_thien_binh: { kind: 'human', name: 'Thập Vạn Thiên Binh', realm: 12, stage: 2, board: 5, adds: { name: 'Cự Linh Thần', kind: 'golem', n: 2 } },
    hh_hoang_ha: { npc: 'van_tieu', realm: 15, stage: 2, board: 5, adds: { name: 'Quỳnh Tiêu Kiếm Ảnh', kind: 'spirit', n: 2 } },
    hh_ban_co_ao: { kind: 'golem', name: 'Bàn Cổ Chân Thân Hư Ảnh', realm: 16, stage: 2, board: 5, scale: 1.2, adds: { name: 'Tổ Vu Tàn Hồn', kind: 'spirit', n: 3 } },
    hh_thai_nhat: { npc: 'thai_nhat', realm: 17, stage: 1, board: 5, scale: 1.1 },
    hh_tam_ma_81: { kind: 'demon', name: 'Bát Thập Nhất Nạn', realm: 15, stage: 2, board: 5, adds: { name: 'Yêu Quái Đường Tây', kind: 'beast', n: 3 } },
    hh_sa_tang: { npc: 'sa_tang', realm: 14, stage: 2, board: 5 },
    hh_minh_ha: { npc: 'minh_ha_to', realm: 17, stage: 2, board: 5, scale: 1.15, adds: { name: 'A Tu La Chiến Sĩ', kind: 'human', n: 2 } },
    hh_vo_thuong: { kind: 'spirit', name: 'Vô Thường Câu Hồn', realm: 17, stage: 2, board: 5, adds: { name: 'Quỷ Sai Nại Hà', kind: 'human', n: 2 } },
    hh_can_khon: { npc: 'can_khon', realm: 23, stage: 2, board: 6, scale: 1.2 },
    hh_am_duong: { npc: 'am_duong_to', realm: 24, stage: 2, board: 6, scale: 1.2 },
    hh_thoi_than: { npc: 'thoi_than', realm: 25, stage: 2, board: 6, scale: 1.2 },
    hh_duong_mi: { npc: 'duong_mi', realm: 26, stage: 2, board: 6, scale: 1.25 },
    hh_la_hau: { npc: 'la_hau', realm: 27, stage: 2, board: 6, scale: 1.3, adds: { name: 'Diệt Thế Ma Ảnh', kind: 'demon', n: 2 } },
    hh_ban_co: { npc: 'ban_co', realm: 28, stage: 2, board: 6, scale: 1.35 }
});

/* ---------- Lục Nguyên: sáu nguyên, mỗi nguyên một cảnh giới nhỏ ---------- */
const LUC_NGUYEN_NAMES = ['Tinh', 'Khí', 'Thần', 'Hồn', 'Phách', 'Đạo'];
const LUC_NGUYEN_ORDINALS = ['Nhất', 'Nhị', 'Tam', 'Tứ', 'Ngũ', 'Lục'];
const LUC_NGUYEN_STAGES = [0, 0, 1, 1, 2, 2];
const LUC_NGUYEN_QUESTS = [
    {
        loc: 'ban_co_dien', npc: 'hau_nghe',
        intro: [['hau_nghe', 'Tinh nguyên là thịt và máu. Vu tộc không tu nguyên thần, chỉ luyện thân tới khi thân cứng hơn trời.'], ['me', 'Ta phải làm gì?'], ['hau_nghe', 'Đứng dưới tượng Bàn Cổ, để Vu Binh đánh tới khi ngươi không còn biết đau.']],
        steps: [
            { hunt: { loc: 'ban_co_dien', name: 'Vu Binh', n: 6 }, say: [['hau_nghe', 'Đủ rồi. Máu ngươi chảy chậm lại, như máu của người đã chết một lần.']] },
            { gather: { loc: 'ban_co_dien', hours: 6, label: 'Ngưng Tinh Nguyên dưới tượng Bàn Cổ' }, say: [['narr', 'Nguồn thứ nhất trong thân đông lại thành một khối ấm sau rốn. Ngươi nghe thấy tim mình đập cùng nhịp với tượng đá.']] }
        ]
    },
    {
        loc: 'ngu_trang', npc: 'tran_nguyen',
        intro: [['tran_nguyen', 'Khí nguyên ở trong đất, không ở trên trời. Ta là tổ của Địa Tiên, cả đời chưa từng bay lên Lăng Tiêu.'], ['me', 'Vì sao?'], ['tran_nguyen', 'Vì dưới chân ta có địa mạch. Ngồi xuống cạnh cây Nhân Sâm, nghe đất thở.']],
        steps: [
            { hunt: { loc: 'ngu_trang', name: 'Địa Mạch Linh', n: 5 }, say: [['tran_nguyen', 'Địa mạch nổi giận vì có kẻ lạ. Giờ nó biết ngươi rồi.']] },
            { gather: { loc: 'ngu_trang', hours: 6, label: 'Ngưng Khí Nguyên theo nhịp địa mạch' }, say: [['narr', 'Hơi thở của ngươi chậm dần, rồi trùng với hơi thở của đất. Nguồn thứ hai chảy vào xương sống.']] }
        ]
    },
    {
        loc: 'nam_thien_mon', npc: 'duong_tien',
        intro: [['duong_tien', 'Thần nguyên là con mắt bên trong. Thiên nhãn của ta nhìn thấy thật giả, nhưng phải đổi bằng một giọt máu mỗi lần mở.'], ['me', 'Ngài dạy ta mở?'], ['duong_tien', 'Ta không dạy. Ta đánh. Nhìn được đường thương của ta thì thần nguyên tự sáng.']],
        steps: [
            { boss: 'hh_duong_tien', say: [['duong_tien', 'Ngươi nhìn thấy mũi thương trước khi nó tới. Được. Đừng nhìn ngai vàng quá lâu, có những thứ nhìn thấy rồi không nói được.']] },
            { gather: { loc: 'nam_thien_mon', hours: 6, label: 'Ngưng Thần Nguyên trên cổng trời' }, say: [['narr', 'Giữa trán ngươi nóng lên. Nguồn thứ ba mở ra, mọi thứ trước mắt có thêm một lớp bóng.']] }
        ]
    },
    {
        loc: 'am_gioi', npc: 'hau_tho',
        intro: [['hau_tho', 'Hồn nguyên không tu được ở chỗ người sống. Con xuống đây, đi một vòng Lục Đạo với ta.'], ['me', 'Đi rồi có về được không?'], ['hau_tho', 'Ta là Luân Hồi. Ta cho về thì con về.']],
        steps: [
            { hunt: { loc: 'am_gioi', name: 'Âm Hồn Lạc Lối', n: 6 }, say: [['dia_tang', 'Những hồn này không tìm được cầu Nại Hà. Ngươi dẫn chúng tới, Hậu Thổ sẽ nhận.']] },
            { gather: { loc: 'am_gioi', hours: 6, label: 'Ngưng Hồn Nguyên bên Lục Đạo Luân Hồi' }, say: [['narr', 'Sáu cánh cửa luân hồi quay quanh ngươi. Hồn ngươi đứng yên giữa chúng mà không bị kéo đi. Nguồn thứ tư thành.']] }
        ]
    },
    {
        loc: 'yeu_dinh', npc: 'thai_nhat',
        intro: [['thai_nhat', 'Phách là cái run khi nghe tiếng chuông. Hỗn Độn Chung của ta đánh một tiếng, Vu tộc rụng mất một nửa phách.'], ['me', 'Ngài muốn đánh ta?'], ['thai_nhat', 'Ta là tàn ảnh. Chỉ còn sức đánh một tiếng. Đứng vững được thì phách của ngươi là của ngươi.']],
        steps: [
            { boss: 'hh_thai_nhat', say: [['thai_nhat', 'Chuông rung mà ngươi không quỳ. Đế Tuấn huynh, kẻ này ta không giữ được nữa.'], ['de_tuan', 'Thì để nó đi. Yêu Đình đã sập từ lâu rồi.']] },
            { gather: { loc: 'yeu_dinh', hours: 6, label: 'Ngưng Phách Nguyên trong dư âm Hỗn Độn Chung' }, say: [['narr', 'Tiếng chuông còn vang trong lồng ngực, rồi lặng đi. Nguồn thứ năm không còn run nữa.']] }
        ]
    },
    {
        loc: 'tay_giao', npc: 'nhien_dang',
        intro: [['nhien_dang', 'Năm nguồn đã có, nguồn thứ sáu là Đạo. Ta từng ngồi ở Tử Tiêu Cung nghe giảng, ngồi tận hàng cuối.'], ['me', 'Đạo ở đâu?'], ['nhien_dang', 'Ở chỗ năm nguồn kia gặp nhau. Ngồi xuống dưới ngọn đèn của ta. Đèn còn cháy thì ngươi còn ngồi.']],
        steps: [{ gather: { loc: 'tay_giao', hours: 8, label: 'Ngưng Đạo Nguyên dưới Linh Cữu Đăng' }, say: [['nhien_dang', 'Đèn chưa tắt mà ngươi đã đứng lên. Sáu nguồn đủ cả. Giờ về Dao Trì, để chúng chảy về một.']] }]
    }
].map((q, i) => ({
    ...q, id: `ln_${i + 1}`, title: `${LUC_NGUYEN_ORDINALS[i]} Nguyên: ${LUC_NGUYEN_NAMES[i]} Nguyên`, needs: [16, LUC_NGUYEN_STAGES[i]],
    after: i ? `ln_${i}` : undefined, reward: { hours: 8, goldRefs: 40, statBless: 0.02 }
}));

function lucNguyenDone() {
    return LUC_NGUYEN_QUESTS.filter(q => state.questDone.includes(q.id)).length;
}

function lucNguyenStatHTML() {
    const realm = state.realmIndex || 0;
    if (realm < 16) return '';
    const done = lucNguyenDone();
    if (realm > 16 && done >= LUC_NGUYEN_QUESTS.length) return '';
    const names = LUC_NGUYEN_NAMES.map((name, i) => i < done ? `<span style="color:#fff">${name}</span>` : `<span style="color:#888">${name}</span>`).join(' · ');
    return `<div>🔆 Lục Nguyên: <span style="color:#fff">${LUC_NGUYEN_ORDINALS[Math.max(0, done - 1)]} Nguyên</span> (${done}/${LUC_NGUYEN_QUESTS.length}) · ${names}</div>`;
}

/* ---------- Tam Giới Sinh Lão Bệnh Tử: khóa đột phá Thánh Nhân ---------- */
const TAM_GIOI_QUESTS = [
    {
        id: 'tg_sinh', loc: 'am_gioi', npc: 'hau_tho', title: 'Tam Giới · Sinh', needs: [11, 0],
        intro: [['hau_tho', 'Con muốn làm Thánh à? Thánh nhìn chúng sinh từ trên cao. Ai chưa từng là chúng sinh thì nhìn gì cũng sai.'], ['me', 'Ta từng là tiên nô.'], ['hau_tho', 'Đó là khổ, chưa phải đời. Đi xem một sinh mệnh bắt đầu, ở cả ba cõi.']],
        steps: [
            { go: 'hoa_qua', say: [['ngo_khong', 'Hòn đá này là mẹ ta. Nó nứt ra một sáng gió to, ta nhảy ra, mắt bắn hai tia vàng lên tận Lăng Tiêu.'], ['me', 'Thiên Đình có sợ không?'], ['ngo_khong', 'Sợ thì đã không phái ta đi chăn ngựa. Sinh ra ở trời hay ở đá cũng phải tự đi tìm tên của mình.']] },
            { gather: { loc: 'thanh_thuy', hours: 2, label: 'Ngồi ngoài cửa chờ một đứa trẻ chào đời' }, say: [['thuy_ba', 'Đứa bé này đẻ ngược, ta tưởng mất cả mẹ lẫn con.'], ['narr', 'Tiếng khóc đầu tiên vang lên lúc gà gáy. Ngươi nhận ra mình đã nín thở cả đêm, như một phàm nhân.']] },
            { go: 'am_gioi', say: [['hau_tho', 'Ba cõi, ba lần sinh. Đá nứt, người đẻ, hồn đầu thai. Đứa bé ở Phàm Giới là hồn ta tiễn đi tuần trước.'], ['me', 'Nó nhớ gì không?'], ['hau_tho', 'Không. Vì vậy nó mới được làm người.']] }
        ],
        reward: { hours: 6, goldRefs: 30 }
    },
    {
        id: 'tg_lao', loc: 'ngu_trang', npc: 'tran_nguyen', title: 'Tam Giới · Lão', needs: [12, 1], after: 'tg_sinh',
        intro: [['tran_nguyen', 'Cây Nhân Sâm ba ngàn năm ra hoa, ba ngàn năm kết trái. Ăn một quả sống thêm bốn vạn bảy ngàn năm.'], ['me', 'Vậy là không già nữa?'], ['tran_nguyen', 'Già vẫn già, chỉ chậm hơn. Ngươi chưa biết già là gì. Hậu Thổ cho ngươi mượn một kiếp phàm, đi rồi về kể ta nghe.']],
        steps: [
            { go: 'am_gioi', say: [['hau_tho', 'Uống ngụm nước này, con sẽ quên mình là tiên trong một kiếp. Ta giữ thân con ở đây.']] },
            { gather: { loc: 'van_long', hours: 4, label: 'Sống một kiếp phàm nhân tới tuổi già' }, say: [['narr', 'Ngươi làm thợ rèn ở Vân Long Thành. Năm sáu mươi tuổi tay không còn nhấc nổi búa. Năm bảy mươi, ngươi quên tên đứa cháu út.'], ['narr', 'Một sáng ngồi trước lò nguội, ngươi chợt hiểu vì sao tiên nhân ai cũng sợ thời gian mà không ai chịu nói.']] },
            { go: 'ngu_trang', say: [['tran_nguyen', 'Về rồi à. Mặt ngươi trẻ, mắt ngươi già. Thế là đủ.'], ['me', 'Già không đau. Chỉ là mỗi ngày mất một thứ.'], ['tran_nguyen', 'Ừ. Quả Nhân Sâm không trả lại được thứ đã mất.']] }
        ],
        reward: { hours: 8, goldRefs: 40 }
    },
    {
        id: 'tg_benh', loc: 'ban_co_dien', npc: 'hau_nghe', title: 'Tam Giới · Bệnh', needs: [14, 1], after: 'tg_lao',
        intro: [['hau_nghe', 'Sau Vu Yêu đại chiến, xác Vu tộc thối rữa thành ôn dịch. Dịch trôi xuống Phàm Giới, người chết cả làng.'], ['me', 'Vu tộc không chữa sao?'], ['hau_nghe', 'Vu tộc chỉ biết đánh. Ngươi đi dọn Ôn Thần ở đây, rồi xuống dưới xem người ta chết vì bệnh ra sao.']],
        steps: [
            { hunt: { loc: 'ban_co_dien', name: 'Ôn Thần', n: 6 }, say: [['hau_nghe', 'Ôn Thần sinh từ máu cũ. Giết hết cũng không hết, nhưng đỡ được một mùa.']] },
            { gather: { loc: 'co_lac', hours: 3, label: 'Sắc thuốc cho Cổ Lạc Trấn đang có dịch' }, say: [['narr', 'Ngươi không dùng tiên lực, chỉ sắc thuốc bằng tay như một lang trung. Đêm thứ ba, đứa bé ngươi đút thuốc vẫn không qua khỏi.'], ['narr', 'Mẹ nó không khóc. Bà cảm ơn ngươi, rồi đi múc nước cho người kế bên.']] },
            { go: 'luu_sa', say: [['quan_am', 'Bệnh không phải tội, cũng không phải phạt. Thân có hạn thì có bệnh.'], ['me', 'Ta cứu được mười người, chết một đứa bé.'], ['quan_am', 'Con nhớ đứa bé, không nhớ mười người. Vì thế con mới hiểu được bệnh.']] }
        ],
        reward: { hours: 10, goldRefs: 50 }
    },
    {
        id: 'tg_tu', loc: 'am_gioi', npc: 'hau_tho', title: 'Tam Giới · Tử', needs: [17, 1], after: 'tg_benh',
        intro: [['hau_tho', 'Còn một thứ con chưa trải. Lần này ta không cho con mượn kiếp người. Con tự đi qua cửa tử.'], ['me', 'Ta sẽ chết?'], ['hau_tho', 'Một lúc thôi. Đủ để biết.']],
        steps: [
            { boss: 'hh_vo_thuong', say: [['narr', 'Xích Câu Hồn quấn cổ ngươi. Ngươi để yên cho nó kéo, đi qua cầu Nại Hà như mọi hồn khác.']] },
            { gather: { loc: 'vong_huong', hours: 4, label: 'Đứng trên Vọng Hương Đài nhìn lại đời mình' }, say: [['narr', 'Trên Vọng Hương Đài, ngươi thấy Thanh Thủy Thôn, Lão Mặc quét lá, sư tỷ Tô Thanh Dao, hầm mỏ Vô Quang. Không ai trong đó biết ngươi đang nhìn.'], ['dia_tang', 'Ai đứng ở đây cũng khóc. Ngươi không khóc thì ta lo.']] },
            { go: 'thanh_thuy', say: [['thuy_ba', 'Có ai đó đứng ngoài cửa à? Gió lạnh quá.'], ['narr', 'Ngươi là một hồn ma đứng ở làng cũ. Thủy Bà quàng thêm áo, không nhìn thấy ngươi. Chết là như vậy: mọi thứ vẫn tiếp tục.']] },
            { go: 'am_gioi', say: [['hau_tho', 'Về đi. Sinh, lão, bệnh, tử, con đã đi đủ ở cả ba cõi.'], ['me', 'Giờ ta làm Thánh được chưa?'], ['hau_tho', 'Giờ con mới được phép thử. Thánh mà chưa từng chết thì chỉ là kẻ mạnh ngồi cao.']] }
        ],
        reward: { hours: 14, goldRefs: 80, statBless: 0.03 }
    }
].map(q => ({ ...q, crossWorld: true }));

/* Trước khi thành Thánh phải đi hết chuỗi của Hậu Thổ: Tam Giới Sinh Lão Bệnh Tử và mọi việc ở Âm Giới */
function hauThoChain() {
    return [...TAM_GIOI_QUESTS, ...AM_GIOI_QUESTS];
}

function tamGioiGate(realm) {
    if (realm !== SAINT_REALM) return null;
    const chain = hauThoChain();
    const q = chain.find(x => !state.questDone.includes(x.id));
    if (!q) return null;
    const done = chain.length - chain.filter(x => !state.questDone.includes(x.id)).length;
    return { id: `gate_${q.id}`, title: `Đi hết chuỗi của Hậu Thổ (${done}/${chain.length}): còn "${q.title}" từ ${NPCS[q.npc].name} ở ${LOCATIONS[q.loc].name}` };
}

/* ---------- Truyện phụ Hồng Hoang ---------- */
const HH_SIDE_QUESTS = [
    {
        id: 'hh_tam_tieu', loc: 'tiet_giao', npc: 'van_tieu', title: 'Cửu Khúc Hoàng Hà Trận', needs: [15, 0],
        intro: [['van_tieu', 'Ba tỷ muội ta giữ một trận đồ từ thời Phong Thần. Năm đó Cửu Khúc Hoàng Hà Trận nhốt cả mười hai Kim Tiên Xiển Giáo, gọt mất Tam Hoa của họ.'], ['quynh_tieu', 'Rồi Thánh Nhân ra tay, ba chúng ta chết trong trận của chính mình.'], ['bich_tieu', 'Giờ sống lại rồi thì phải thử trận trên người khác chứ. Ngươi vào đi.']],
        steps: [
            { gather: { loc: 'tiet_giao', hours: 3, label: 'Đi qua chín khúc Hoàng Hà' }, say: [['narr', 'Mỗi khúc sông lấy đi một thứ: tiếng, màu, mùi, rồi tới tên. Tới khúc thứ chín ngươi chỉ còn nhớ mình đang đi.']] },
            { boss: 'hh_hoang_ha', say: [['van_tieu', 'Ngươi ra được mà Tam Hoa còn nguyên. Kim Linh sư tỷ, kẻ này hơn mười hai Kim Tiên năm đó.'], ['kim_linh', 'Hơn ở chỗ nó không kiêu. Tiệt Giáo nhận đệ tử như vậy.']] }
        ],
        reward: { hours: 6, goldRefs: 35 }
    },
    {
        id: 'hh_na_tra', loc: 'bac_thien_mon', npc: 'na_tra', title: 'Tòa Tháp Trên Tay Cha', needs: [13, 1],
        intro: [['na_tra', 'Ngày bé ta róc thịt trả mẹ, lóc xương trả cha. Sư phụ Thái Ất lấy hoa sen làm thân mới cho ta.'], ['ly_tinh', 'Còn ta thì cầm tòa tháp Nhiên Đăng cho, để con ta không giết ta.'], ['na_tra', 'Ngươi đánh với ta một trận. Ta muốn xem cha ta còn phải cầm tháp tới bao giờ.']],
        steps: [
            { boss: 'hh_na_tra', say: [['na_tra', 'Đánh với người lạ mà không thấy giận. Cha, chắc người bỏ tháp xuống được rồi.'], ['ly_tinh', 'Bỏ thì bỏ. Tay ta mỏi ba ngàn năm nay rồi.']] }
        ],
        reward: { hours: 5, goldRefs: 25 }
    },
    {
        id: 'hh_duong_tien', loc: 'nam_thien_mon', npc: 'duong_tien', title: 'Nghe Điều Không Nghe Tuyên', needs: [14, 1], after: 'hh_na_tra',
        intro: [['duong_tien', 'Ta là cháu ruột của Hạo Thiên. Chiếu chỉ của cậu ta không nghe, chỉ nghe việc nào cần làm.'], ['me', 'Giờ cần làm gì?'], ['duong_tien', 'Thiên binh Nam Môn còn mang lệnh cũ, đi bắt tiên nô bỏ trốn. Lệnh cũ thì phải có người xé.']],
        steps: [
            { hunt: { loc: 'nam_thien_mon', name: 'Thiên Binh', n: 5 }, say: [['duong_tien', 'Xé xong rồi. Hao Thiên Khuyển của ta đánh hơi được mấy đứa trốn, ta cho chúng đi.']] },
            { gather: { loc: 'nam_thien_mon', hours: 2, label: 'Đứng gác cổng trời với Nhị Lang' }, say: [['duong_tien', 'Thiên nhãn của ta từng nhìn vào ngai vàng Lăng Tiêu. Ta thấy một thứ, và không nói với ai. Có ngày ngươi sẽ tự thấy.']] }
        ],
        reward: { hours: 5, goldRefs: 25 }
    },
    {
        id: 'hh_wk_1', loc: 'hoa_qua', npc: 'ngo_khong', title: 'Đấu Chiến · Thạch Hầu', needs: [11, 0],
        intro: [['ngo_khong', 'Muốn hiểu lão Tôn thì đừng nghe kể. Nhổ một sợi lông của ta, thổi một hơi, ngươi sẽ thành ta trong một đời.'], ['me', 'Một đời của ngươi?'], ['ngo_khong', 'Đi từ hòn đá tới Linh Sơn. Đi xong mới biết vì sao ta tên Ngộ Không.']],
        steps: [
            { hunt: { loc: 'hoa_qua', name: 'Hỗn Thế Ma Vương', n: 3 }, say: [['narr', 'Ngươi là Mỹ Hầu Vương. Con ma vương bắt lũ khỉ con, ngươi đuổi nó tới tận hang. Đó là trận đầu tiên của ngươi.']] },
            { gather: { loc: 'hoa_qua', hours: 3, label: 'Vượt biển tìm thầy học đạo' }, say: [['narr', 'Ngươi kết bè vượt biển mười năm. Ở Linh Đài Phương Thốn Sơn có một lão sư phụ gõ đầu ngươi ba cái rồi chắp tay đi vào.'], ['narr', 'Nửa đêm canh ba ngươi tới cửa sau. Lão dạy ngươi bảy mươi hai phép biến hóa, rồi bắt thề không được nói tên thầy.']] }
        ],
        reward: { hours: 4, goldRefs: 20 }
    },
    {
        id: 'hh_wk_2', loc: 'nam_thien_mon', npc: 'duong_tien', title: 'Đấu Chiến · Đại Náo Thiên Cung', needs: [13, 0], after: 'hh_wk_1',
        intro: [['narr', 'Ngươi vẫn là Ngộ Không. Thiên Đình phong ngươi làm Bật Mã Ôn chăn ngựa. Ngươi đập ấn, tự xưng Tề Thiên Đại Thánh.'], ['duong_tien', 'Con khỉ kia, cậu ta sai ta tới bắt ngươi.']],
        steps: [
            { boss: 'hh_thien_binh', say: [['narr', 'Mười vạn thiên binh không giữ được ngươi. Ngươi ăn hết đào tiên, uống cạn rượu ngự, nuốt cả hồ lô kim đan của Thái Thượng.']] },
            { boss: 'hh_duong_tien', say: [['duong_tien', 'Ngươi biến thành miếu thờ, đuôi dựng thành cột cờ sau miếu. Miếu nào lại có cột cờ phía sau?'], ['narr', 'Ngươi thua, không vì yếu hơn, mà vì không biết giấu cái đuôi. Lò Bát Quái nung ngươi bốn mươi chín ngày, lửa luyện ra đôi Hỏa Nhãn Kim Tinh.']] }
        ],
        reward: { hours: 5, goldRefs: 25 }
    },
    {
        id: 'hh_wk_3', loc: 'ngu_hanh', npc: 'ngo_khong', title: 'Đấu Chiến · Năm Trăm Năm Dưới Núi', needs: [14, 0], after: 'hh_wk_2',
        intro: [['narr', 'Ngươi nhảy một cái mười vạn tám ngàn dặm, tới năm cột trời, đề tên và đi tiểu. Hóa ra đó là năm ngón tay của Phật Tổ.']],
        steps: [
            { gather: { loc: 'ngu_hanh', hours: 5, label: 'Nằm dưới Ngũ Hành Sơn năm trăm năm' }, say: [['narr', 'Đói thì ăn viên sắt, khát thì uống nước đồng. Mùa xuân có cỏ mọc qua kẽ tay. Năm thứ ba trăm, ngươi thôi chửi trời.'], ['narr', 'Năm thứ năm trăm, có một hòa thượng gầy leo lên núi, gỡ lá bùa. Ngươi không biết nên cảm ơn hay ghét hắn.']] },
            { go: 'ngu_hanh', say: [['quan_am', 'Vòng kim cô này không trói con. Nó chỉ nhắc con đừng quên con vừa ra từ đâu.'], ['ngo_khong', 'Lúc đó ta tưởng là xiềng. Giờ ta tháo được rồi mà vẫn không muốn tháo.']] }
        ],
        reward: { hours: 6, goldRefs: 30 }
    },
    {
        id: 'hh_wk_4', loc: 'thien_ha', npc: 'bat_gioi', title: 'Đấu Chiến · Thầy Trò Bốn Người', needs: [15, 0], after: 'hh_wk_3',
        intro: [['bat_gioi', 'Ta từng thống lĩnh tám vạn thủy quân Thiên Hà. Say rượu trêu Hằng Nga một câu, bị đánh xuống đầu thai nhầm vào bụng heo.'], ['me', 'Có hối hận không?'], ['bat_gioi', 'Hối hận chứ. Giá biết trước thì ta đã uống ít hơn một chén.']],
        steps: [
            { go: 'quang_han', say: [['hang_nga', 'Thiên Bồng nhờ người tới xin lỗi à? Ba ngàn năm rồi. Bảo hắn ta không giận, chỉ là không muốn gặp.']] },
            { boss: 'hh_sa_tang', say: [['sa_tang', 'Ta làm vỡ chén lưu ly ở yến Bàn Đào, bị đày xuống Lưu Sa Hà, bảy ngày một lần bị phi kiếm đâm sườn. Đánh xong rồi, giờ ta theo ai?'], ['narr', 'Đội của ngươi có đủ bốn người: một hòa thượng, một con khỉ, một con heo, một gã râu đỏ. Thêm một con ngựa trắng vốn là rồng.']] },
            { boss: 'hh_tam_ma_81', say: [['narr', 'Tám mươi mốt nạn. Có nạn là yêu quái, có nạn là thầy đuổi ngươi đi, có nạn là chính ngươi muốn bỏ về Hoa Quả Sơn.'], ['narr', 'Nạn cuối cùng không có yêu nào. Chỉ là con rùa già quên lời hứa, hất cả đoàn xuống sông.']] }
        ],
        reward: { hours: 7, goldRefs: 35 }
    },
    {
        id: 'hh_wk_5', loc: 'tay_giao', npc: 'kim_thien', title: 'Đấu Chiến Thắng Phật', needs: [16, 0], after: 'hh_wk_4',
        intro: [['kim_thien', 'Ngươi mượn đời của đại đồ đệ ta, đi tới cuối rồi. Ở Linh Sơn, Phật Tổ phong nó là Đấu Chiến Thắng Phật.'], ['me', 'Thắng ai?'], ['kim_thien', 'Thắng chính nó. Con khỉ không còn đánh ai nữa, mà vẫn là người đánh giỏi nhất.']],
        steps: [
            { gather: { loc: 'tay_giao', hours: 3, label: 'Thả sợi lông khỉ, trở về là chính mình' }, say: [['narr', 'Sợi lông bay đi. Ngươi lại là ngươi, nhưng tay còn quen cầm một cây gậy không có thật.'], ['ngo_khong', 'Giờ ngươi biết rồi đó. Tên ta là Ngộ Không vì phải mất hết mới hiểu ra chữ không.']] }
        ],
        reward: { hours: 8, goldRefs: 45, statBless: 0.02 }
    },
    {
        id: 'hh_kts_1', loc: 'tay_giao', npc: 'kim_thien', title: 'Kim Thiền Tử · Chín Kiếp', needs: [15, 2],
        intro: [['kim_thien', 'Ta ngủ gật khi Phật Tổ giảng pháp. Phạt mười kiếp làm người, kiếp nào cũng phải đi lấy kinh.'], ['me', 'Chín kiếp trước thì sao?'], ['kim_thien', 'Chết ở cùng một con sông. Ngươi đi xem giúp ta.']],
        steps: [
            { gather: { loc: 'sinh_tu', hours: 3, label: 'Lật Sổ Sinh Tử tìm chín kiếp Kim Thiền' }, say: [['dia_tang', 'Chín dòng, chín cái tên khác nhau, cùng một chữ chết: Lưu Sa Hà.'], ['hau_tho', 'Ta đã tiễn hắn chín lần. Lần nào hắn cũng hỏi đường về phía tây.']] },
            { go: 'luu_sa', say: [['sa_tang', 'Chuỗi đầu lâu trên cổ ta à? Chín cái, của chín hòa thượng đi lấy kinh ăn thịt không tan, nổi trên mặt sông.'], ['me', 'Đều là một người.'], ['sa_tang', 'Ta biết. Vì vậy ta mới đeo. Kiếp thứ mười ta sẽ không ăn, ta theo hắn.']] }
        ],
        reward: { hours: 6, goldRefs: 30 }
    },
    {
        id: 'hh_kts_2', loc: 'tay_giao', npc: 'kim_thien', title: 'Kim Thiền Tử · Lột Xác', needs: [16, 2], after: 'hh_kts_1',
        intro: [['kim_thien', 'Kiếp thứ mười, ta đi đủ tám mươi mốt nạn. Tới bến Lăng Vân có con thuyền không đáy.'], ['me', 'Thuyền không đáy thì chở ai?'], ['kim_thien', 'Chở cái phần không chìm được. Cái xác phàm của ta trôi đi trước mặt ta.']],
        steps: [
            { gather: { loc: 'tay_giao', hours: 4, label: 'Ngồi thuyền không đáy qua bến Lăng Vân' }, say: [['narr', 'Một cái xác trôi ngang mạn thuyền, mặc cà sa của Kim Thiền Tử. Rồi thêm một cái nữa. Ngươi nhìn kỹ, cái thứ hai mang mặt ngươi.'], ['kim_thien', 'Ngươi cũng lột được rồi. Mười kiếp ta mới bỏ được cái xác, ngươi chỉ mất một buổi chiều vì ngươi đã chết ở Âm Giới một lần.']] },
            { go: 'tay_giao', say: [['nhien_dang', 'Kim Thiền về rồi. Ngươi là người đầu tiên nhìn thấy chính cái xác của mình mà không quay lại vớt.']] }
        ],
        reward: { hours: 8, goldRefs: 40 }
    },
    {
        id: 'hh_tam_the', loc: 'tay_giao', npc: 'di_lac', title: 'Tam Thế Phật', needs: [17, 0],
        intro: [['di_lac', 'Nhiên Đăng là Quá Khứ, Như Lai là Hiện Tại, ta là Vị Lai. Ba người ba chiếc ghế, chưa ai chịu đứng dậy.'], ['me', 'Vị Lai Phật cười gì?'], ['di_lac', 'Cười vì tới lượt ta thì có khi chẳng còn ai để độ.']],
        steps: [
            { go: 'tay_giao', say: [['nhien_dang', 'Trước khi có Phật, ta ngồi ở Tử Tiêu Cung, sau lưng là sáu bồ đoàn. Ta không giành được ghế nào, nên phải tự làm một con đường.']] },
            { gather: { loc: 'tay_giao', hours: 3, label: 'Ngồi giữa Quá Khứ và Vị Lai' }, say: [['di_lac', 'Ngồi giữa hai ta mà không ngả về bên nào. Ngươi lên Linh Sơn mà gặp Hiện Tại đi, người ấy có chuyện muốn kể.']] }
        ],
        reward: { hours: 6, goldRefs: 30 }
    },
    {
        id: 'hh_nhu_lai', loc: 'linh_son', npc: 'nhu_lai', title: 'Gương Mặt Ở Đa Bảo Thị', needs: [21, 0], after: 'hh_tam_the',
        intro: [['nhu_lai', 'Ngươi từng mua đồ ở Đa Bảo Thị. Có thấy gã chủ chợ béo cười giống ta không?'], ['me', 'Giống như đúc.'], ['nhu_lai', 'Ta là Đa Bảo, đại đệ tử của Thông Thiên. Sau Vạn Tiên Trận ta theo về Tây Phương, phần không chịu đi ở lại đó bán hàng.']],
        steps: [{ gather: { loc: 'linh_son', hours: 4, label: 'Nghe Như Lai kể trận Vạn Tiên' }, say: [['nhu_lai', 'Vạn tiên Tiệt Giáo chết trong một ngày. Ta bị trói bằng dây của Tây Phương mà mang đi. Ta không hận. Ta chỉ không dám về Bích Du.'], ['thong_thien', 'Bảo hắn về đi. Ta chưa từng khóa cửa.']] }],
        reward: { hours: 10, goldRefs: 60 }
    },
    {
        id: 'hh_vu_yeu', loc: 'ban_co_dien', npc: 'de_giang', title: 'Đô Thiên Thần Sát', needs: [16, 2],
        intro: [['de_giang', 'Mười hai Tổ Vu sinh ra từ máu Bàn Cổ. Chúng ta không có nguyên thần, không nghe đạo, chỉ có thân thể.'], ['me', 'Rồi sao?'], ['de_giang', 'Rồi Yêu Đình lên trời, chúng ta ở dưới đất. Thập Kim Ô ra phơi nắng chết người của ta, Hậu Nghệ bắn rơi chín con. Từ đó không ai dừng được nữa.']],
        steps: [
            { go: 'quang_han', say: [['hang_nga', 'Hậu Nghệ là chồng ta. Ngày chàng bắn chín mặt trời, Yêu Đình thề diệt Vu tộc. Ta trộm thuốc bay lên đây, không phải vì muốn thành tiên.'], ['me', 'Vì sao?'], ['hang_nga', 'Vì ta không muốn nhìn chàng chết.']] },
            { boss: 'hh_ban_co_ao', say: [['de_giang', 'Mười hai Tổ Vu hợp lại gọi ra hư ảnh Bàn Cổ. Năm đó chúng ta dùng nó đánh vỡ Chu Thiên Tinh Đấu của Yêu Đình. Ngươi chặn được một nhát rìu của nó.'], ['hau_nghe', 'Cộng Công sư huynh đâm vào Bất Chu Sơn, trời thủng một lỗ, Nữ Oa phải vá. Chúng ta thắng mà không còn ai sống để mừng.']] },
            { go: 'yeu_dinh', say: [['de_tuan', 'Vu tộc cũng tới kể chuyện à? Hai bên chết sạch, Thiên Đình mới được dựng lại cho người khác ngồi.'], ['thai_nhat', 'Con út của huynh, Kim Ô thứ mười, còn sống. Nó giờ tự gọi mình là Yêu Hoàng, ở dưới kia.']] }
        ],
        reward: { hours: 8, goldRefs: 45 }
    },
    {
        id: 'hh_kim_o', loc: 'yeu_hoang_dien', npc: 'yeu_hoang', title: 'Kim Ô Thứ Mười', needs: [17, 2], after: 'hh_vu_yeu',
        intro: [['yeu_hoang', 'Ngươi gặp phụ hoàng ta ở Yêu Đình rồi à? Ta là đứa duy nhất trốn được mũi tên của Hậu Nghệ.'], ['me', 'Ngài có hận không?'], ['yeu_hoang', 'Có. Rồi ta nhìn chín anh trai mình cháy rụi đất của người ta suốt mười ngày. Hận cũng thấy ngượng.']],
        steps: [{ gather: { loc: 'phu_tang', hours: 3, label: 'Thắp lại chín ngọn đèn trên Phù Tang Thụ' }, say: [['yeu_hoang', 'Chín cành không, một cành có ta. Tối nay ta không đậu một mình nữa.']] }],
        reward: { hours: 6, goldRefs: 35 }
    },
    {
        id: 'hh_dia_tang', loc: 'thuy_van', npc: 'dia_tang', title: 'Địa Ngục Chưa Trống', needs: [13, 0],
        intro: [['dia_tang', 'Ta thề địa ngục chưa trống thì chưa thành Phật. Thề xong mới biết người chết nhiều hơn người được độ.'], ['me', 'Vậy ngài không bao giờ thành Phật?'], ['dia_tang', 'Có lẽ. Nhưng ta không ở đây để thành Phật.']],
        steps: [{ hunt: { loc: 'nai_ha', name: 'Quỷ Sai Nại Hà', n: 5 }, say: [['dia_tang', 'Bọn quỷ sai ăn tiền đút lót, cho hồn giàu đi tắt. Từ nay cầu Nại Hà xếp hàng như nhau.']] }],
        reward: { hours: 5, goldRefs: 25 }
    }
];

/* ---------- Thiên Ma Ngoại Vực: Hỗn Độn Ma Thần giấu mặt ---------- */
const HH_MA_THAN_QUESTS = [
    {
        id: 'hh_ma_can_khon', loc: 'van_gioi', npc: 'can_khon', needs: [23, 1], boss: 'hh_can_khon', place: 'van_gioi',
        intro: [['can_khon', 'Nhặt đá thôi, khách đừng để ý. Thế giới chết thì còn lại đá, đá nào cũng từng là trời của ai đó.']],
        sense: 'Nhìn kỹ những hòn đá lão nhặt',
        reveal: [['narr', 'Mỗi hòn đá trong giỏ lão là một bầu trời thu nhỏ, có cả mây. Lão không nhặt xác thế giới, lão đang gom chúng lại.'], ['can_khon', 'Bị nhìn ra rồi. Ta là Càn Khôn, trước khi Bàn Cổ bổ trời ta đã định trên dưới. Ba ngàn Ma Thần chết dưới rìu hắn, ta giả làm đá mà sống.']],
        win: [['can_khon', 'Ngươi đỡ được càn khôn đảo ngược. Bàn Cổ cũng từng đỡ như vậy rồi bổ ta làm đôi. Ngươi không bổ. Lạ.']]
    },
    {
        id: 'hh_ma_am_duong', loc: 'luan_hoi', npc: 'am_duong_to', needs: [24, 1], boss: 'hh_am_duong', place: 'luan_hoi',
        intro: [['am_duong_to', 'Qua sông không? Đò này chở người sống sang bờ chết, chở người chết về bờ sống. Giá như nhau.']],
        sense: 'Ngồi đò nhìn nửa mặt còn lại của lái đò',
        reveal: [['narr', 'Một nửa mặt lão sáng như ban trưa, nửa kia tối như đáy biển. Nước dưới thuyền chia hai màu, không hòa vào nhau.'], ['am_duong_to', 'Âm Dương Lão Tổ. Hậu Thổ làm Luân Hồi trong Tam Giới, ta làm cho cả vũ trụ trước khi có Tam Giới. Không ai trả tiền đò.']],
        win: [['am_duong_to', 'Ngươi đứng giữa hai màu nước mà không chìm. Đi đi, đò ta không thu của ngươi.']]
    },
    {
        id: 'hh_ma_thoi_than', loc: 'tinh_mo', npc: 'thoi_than', needs: [25, 1], boss: 'hh_thoi_than', place: 'tinh_mo',
        intro: [['thoi_than', 'Mộ sao ở đây, mộ nào cũng cần quét. Ta quét hoài mà bụi không vơi, lạ thật.']],
        sense: 'Đếm số lần lão quét một bậc thềm',
        reveal: [['narr', 'Lão quét một bậc thềm, bậc thềm trẻ lại một vạn năm. Bụi bay lên thành những vì sao chưa sinh.'], ['thoi_than', 'Ta là Thời Thần. Bàn Cổ khai thiên thì thời gian mới chảy, nên ta trốn ở đây quét ngược nó lại một chút mỗi ngày.']],
        win: [['thoi_than', 'Ngươi không già đi trong trận này, cũng không trẻ lại. Kẻ không sợ thời gian thì ta không giữ được.']]
    },
    {
        id: 'hh_ma_duong_mi', loc: 'hu_nhan', npc: 'duong_mi', needs: [26, 1], boss: 'hh_duong_mi', place: 'hu_nhan',
        intro: [['duong_mi', 'Ta trồng liễu trong hư không. Không có đất thì liễu mọc trên khoảng cách.']],
        sense: 'Đi theo hàng liễu trồng giữa hư không',
        reveal: [['narr', 'Ngươi đi mười bước theo hàng liễu, đã ở một đầu kia của Ngoại Vực. Không gian gấp lại như vạt áo dưới tay gã.'], ['duong_mi', 'Dương Mi, chủ không gian. Ta già hơn Hồng Quân, già hơn cả La Hầu. Ta chỉ không thích đánh nhau, nên mới sống.']],
        win: [['duong_mi', 'Một cành liễu của ta trói được cả Thánh Nhân. Ngươi cắt được nó. Lấy đi, trồng ở chỗ nào ngươi muốn có đường về.']]
    },
    {
        id: 'hh_ma_la_hau', loc: 'ma_vuc', npc: 'la_hau', needs: [27, 1], boss: 'hh_la_hau', place: 'ma_vuc',
        intro: [['la_hau', 'Ngồi đi. Ở Ma Vực này, chỉ ta với ngươi là còn biết đếm thời gian theo ngày.']],
        sense: 'Nhìn bốn thanh kiếm cắm quanh chỗ hắn ngồi',
        reveal: [['narr', 'Bốn thanh kiếm khắc chữ Tru, Lục, Hãm, Tuyệt. Ngươi từng thấy chúng treo ở Bích Du Cung.'], ['la_hau', 'La Hầu. Ma Tổ. Tru Tiên Tứ Kiếm vốn là của ta. Năm xưa ta cùng Hồng Quân tranh đạo ở Tu Di Sơn, ta thua, hắn thành Đạo Tổ, kiếm của ta về tay đồ đệ hắn.']],
        win: [['la_hau', 'Hồng Quân thắng ta vì có Thiên Đạo đứng sau. Ngươi thắng ta mà không có ai sau lưng. Ta sẽ chờ xem ngươi gặp Hồng Quân thì ai cúi đầu.']]
    },
    {
        id: 'hh_ma_ban_co', loc: 'khai_thien', npc: 'ban_co', needs: [28, 1], boss: 'hh_ban_co', place: 'khai_thien',
        intro: [['narr', 'Giữa Khai Thiên Hoang Nguyên có một quả núi hình người nằm nghiêng, tay ôm một tảng đá như cán rìu. Không ai nhớ nó có từ bao giờ.']],
        sense: 'Ngồi bên quả núi hình người nghe nó thở',
        reveal: [['narr', 'Núi thở một hơi, mất ba ngày. Ngươi nhận ra quả núi là người, tảng đá là rìu.'], ['ban_co', 'Ta bổ trời, thân hóa thành núi sông, mắt thành nhật nguyệt. Ba ngàn Ma Thần chết theo. Nhưng một phần của ta không chịu tan, trôi ra ngoài trời ta bổ.'], ['me', 'Tam Thanh, Tổ Vu, đều sinh từ ngài.'], ['ban_co', 'Nguyên thần thành Tam Thanh, máu thành Tổ Vu. Còn ta nằm đây, chờ xem con cháu đánh nhau xong chưa.']],
        win: [['ban_co', 'Đứa nhỏ cầm được một nhát rìu của ta. Đi đi, lên chỗ Đạo Tổ ngồi. Bảo hắn Bàn Cổ còn thở.']]
    }
].map(q => ({
    id: q.id, loc: q.loc, npc: q.npc, needs: q.needs, intro: q.intro,
    title: `Người Lạ Ở ${LOCATIONS[q.loc].name}`,
    steps: [
        { gather: { loc: q.place, hours: 3, label: q.sense }, say: q.reveal },
        { boss: q.boss, say: q.win }
    ],
    reward: { hours: 12, goldRefs: 70 }
}));

/* ---------- Âm Giới: mở từ Thiên Tiên, phải đi khắp mười tám nơi ---------- */
const AM_GIOI_OPEN_REALM = 11;

function syncAmGioi() {
    if (state.flags.world_am || (state.realmIndex || 0) < AM_GIOI_OPEN_REALM || !state.flags.world_tien) return;
    state.flags.world_am = true;
    log(`🕯️ Quỷ Môn Quan dưới U Minh Ngục đã mở: ${WORLD_TIERS.find(w => w.id === 'am').name} chờ ngươi.`);
}

const AM_GIOI_QUESTS = [
    {
        id: 'am_manh_ba', loc: 'manh_ba', npc: 'manh_ba', title: 'Chén Canh Thứ Một Vạn', needs: [12, 0],
        intro: [['manh_ba', 'Hôm nay ta nấu chén thứ một vạn ức. Ngạ Quỷ ngoài kia cướp canh, uống vào quên luôn cả cơn đói.'], ['me', 'Thế không tốt sao?'], ['manh_ba', 'Quên đói thì không đi đầu thai. Chúng sẽ ở lại đây mãi.']],
        steps: [
            { hunt: { loc: 'manh_ba', name: 'Ngạ Quỷ', n: 5 }, say: [['manh_ba', 'Đuổi được rồi. Đứa nào còn nhớ mình đói thì còn cứu được.']] },
            { gather: { loc: 'vong_xuyen', hours: 2, label: 'Vớt hồn rơi xuống Vong Xuyên Hà' }, say: [['narr', 'Ngươi kéo lên một hồn già. Ông chỉ nhớ một câu hát ru, hát mãi không dứt.'], ['manh_ba', 'Để ta nấu chén khác cho ông ấy. Chén này không quên câu hát.']] }
        ],
        reward: { hours: 5, goldRefs: 25, opens: 'manh_ba' }
    },
    {
        id: 'am_thap_dien', loc: 'thap_dien', npc: 'diem_vuong', title: 'Phán Quan Ăn Vàng Mã', needs: [13, 1],
        intro: [['diem_vuong', 'Mười điện xử án công bằng, trừ một chỗ: có phán quan nhận vàng mã của người dương gian đốt xuống.'], ['me', 'Vàng mã cũng mua được án?'], ['diem_vuong', 'Ở Phong Đô vàng mã là tiền thật. Đi tra cho ta.']],
        steps: [
            { gather: { loc: 'phong_do', hours: 2, label: 'Tra sổ vàng mã ở Phong Đô Quỷ Thành' }, say: [['narr', 'Sổ chợ Phong Đô ghi rõ: hồn nhà giàu mua án nhẹ, hồn nhà nghèo không có ai đốt cho.']] },
            { hunt: { loc: 'thap_dien', name: 'Phán Quan Âm Ty', n: 4 }, say: [['diem_vuong', 'Từ nay vàng mã đốt xuống đem chia đều cho hồn không ai cúng. Lò rèn Phong Đô cũng mở cho ngươi.']] }
        ],
        reward: { hours: 6, goldRefs: 30, opens: 'phong_do' }
    },
    {
        id: 'am_sinh_tu', loc: 'sinh_tu', npc: 'phan_quan', title: 'Trang Sổ Bị Xé', needs: [14, 1],
        intro: [['phan_quan', 'Năm xưa một con khỉ xông vào đây, lấy bút gạch tên cả họ nhà nó khỏi Sổ Sinh Tử. Trang đó tới giờ vẫn trống.'], ['me', 'Chép lại không được sao?'], ['phan_quan', 'Sổ Linh canh trang trống, ai chạm vào là nó cắn.']],
        steps: [
            { hunt: { loc: 'sinh_tu', name: 'Sổ Linh', n: 5 }, say: [['phan_quan', 'Sổ Linh yên rồi. Giờ ngươi chép, ta đọc.']] },
            { gather: { loc: 'sinh_tu', hours: 3, label: 'Chép lại trang Sổ Sinh Tử' }, say: [['narr', 'Ngươi chép tới tên Tôn Ngộ Không thì ngòi bút khô. Thôi Phán Quan cười, bảo để trống chỗ đó.'], ['phan_quan', 'Có những kẻ không ghi tên vào sổ được. Ngươi xem trang của ngươi đi.'], ['narr', 'Trang của ngươi có tên, nhưng dòng ngày chết bị nhòe như vừa có ai lau.']] }
        ],
        reward: { hours: 7, goldRefs: 35 }
    },
    {
        id: 'am_dia_nguc', loc: 'thuy_van', npc: 'dia_tang', title: 'Mười Tám Tầng', needs: [15, 1], after: 'hh_dia_tang',
        intro: [['dia_tang', 'Đế Thính nghe thấy dưới tầng mười tám có một hồn kêu oan ba ngàn năm. Ngươi xuống với ta.']],
        steps: [
            { hunt: { loc: 'dia_nguc', name: 'Tội Hồn', n: 6 }, say: [['narr', 'Tầng nào cũng có người kêu. Tới tầng mười tám, chỉ có một tiếng gõ đều đều vào vách.']] },
            { gather: { loc: 'vong_huong', hours: 2, label: 'Đưa hồn kêu oan lên Vọng Hương Đài' }, say: [['dia_tang', 'Hắn chỉ muốn nhìn quê một lần. Ba ngàn năm, không ai cho.']] }
        ],
        reward: { hours: 7, goldRefs: 35 }
    },
    {
        id: 'am_cuu_u', loc: 'am_gioi', npc: 'hau_tho', title: 'Hàn Hồn Cửu U', needs: [16, 0],
        intro: [['hau_tho', 'Ở Cửu U có những hồn lạnh tới mức quên cả tên, không vào được Luân Hồi. Con đưa chúng qua Bỉ Ngạn để chúng nhớ lại.']],
        steps: [
            { hunt: { loc: 'cuu_u', name: 'Cửu U Hàn Hồn', n: 5 }, say: [['narr', 'Hàn hồn tan thành sương. Trong sương có những cái tên, rất khẽ.']] },
            { gather: { loc: 'bi_ngan', hours: 2, label: 'Dẫn hồn qua Bỉ Ngạn Hoa Hải' }, say: [['hau_tho', 'Hoa đỏ nhắc chúng nhớ. Nhớ được tên thì Luân Hồi nhận.']] }
        ],
        reward: { hours: 8, goldRefs: 40 }
    },
    {
        id: 'am_minh_ha', loc: 'minh_ha', npc: 'minh_ha_to', title: 'Huyết Hải Bất Khô', needs: [17, 0],
        intro: [['minh_ha_to', 'Huyết Hải không khô thì Minh Hà không chết. Ta sinh ra từ máu, ta dựng A Tu La để có người gọi ta là tổ.'], ['me', 'Ngài muốn gì?'], ['minh_ha_to', 'Bọn A Tu La lại đòi đánh lên trời. Đánh thắng chúng cho ta, rồi đánh với ta.']],
        steps: [
            { hunt: { loc: 'tu_la', name: 'A Tu La Chiến Sĩ', n: 6 }, say: [['narr', 'A Tu La đánh tới khi gãy kiếm, rồi cúi đầu. Chúng không ghét trời, chúng chỉ ghét bị quên.']] },
            { boss: 'hh_minh_ha', say: [['minh_ha_to', 'Nguyên Đồ, A Tỳ không chém được ngươi. Hậu Thổ thành Thánh rồi, ta chỉ còn biển máu. Đi đi, Huyết Hải nhớ mặt ngươi.']] }
        ],
        reward: { hours: 10, goldRefs: 55 }
    },
    {
        id: 'am_vo_gian', loc: 'thuy_van', npc: 'dia_tang', title: 'Vô Gián', needs: [17, 2], after: 'am_dia_nguc',
        intro: [['dia_tang', 'Dưới mười tám tầng còn Vô Gián. Ở đó khổ không có khoảng nghỉ. Ta chưa từng xuống tới đáy.']],
        steps: [
            { hunt: { loc: 'vo_gian', name: 'Vô Gián Tội Hồn', n: 6 }, say: [['narr', 'Tới đáy Vô Gián, ngươi gặp một cái bóng ngồi tụng kinh. Đó là Địa Tạng, phần đã ở lại đây từ ngày phát nguyện.']] },
            { go: 'thuy_van', say: [['dia_tang', 'Ngươi đã gặp phần còn lại của ta. Địa ngục chưa trống, nên nó chưa về.']] }
        ],
        reward: { hours: 10, goldRefs: 55 }
    }
];

/* ---------- Bái phỏng Lục Thánh: bắt buộc trong mạch chính Thánh Giới ---------- */
const LUC_THANH_QUESTS = [
    {
        id: 'lt_thai_thanh', loc: 'bat_canh', npc: 'thai_thanh', title: 'Lục Thánh · Thái Thanh', needs: [19, 0], gate: 'm19',
        intro: [['thai_thanh', 'Thánh mới tới Bát Cảnh Cung à. Ngồi đi, ta đang đun lò, chưa rảnh tay.'], ['me', 'Ngài không hỏi ta tới làm gì?'], ['thai_thanh', 'Vô vi. Ngươi tới thì tới, đi thì đi. Ngồi canh lò với ta một lúc.']],
        steps: [{ gather: { loc: 'bat_canh', hours: 3, label: 'Canh lò Bát Quái cùng Thái Thanh' }, say: [['thai_thanh', 'Lửa không cần ai trông, nó vẫn cháy. Người làm Thánh cũng vậy, đừng cứ đưa tay vào.'], ['narr', 'Ngươi ngồi suốt ba canh giờ. Ông ta chưa nhìn ngươi lấy một lần, mà ngươi biết mình đã bị nhìn thấu.']] }],
        reward: { hours: 6, goldRefs: 40 }
    },
    {
        id: 'lt_nguyen_thuy', loc: 'ngoc_hu', npc: 'nguyen_thuy', title: 'Lục Thánh · Nguyên Thủy', needs: [19, 1], gate: 'm19', after: 'lt_thai_thanh',
        intro: [['nguyen_thuy', 'Xiển Giáo dạy theo thiên mệnh. Ngươi là kẻ không có tên trong sổ, nên ta muốn xem ngươi tự viết được gì.']],
        steps: [
            { hunt: { loc: 'ngoc_hu', name: 'Xiển Giáo Kim Tiên', n: 4 }, say: [['nguyen_thuy', 'Đệ tử ta thua mà không oán. Đó là thiên mệnh ta chép cho chúng.']] },
            { gather: { loc: 'ngoc_hu', hours: 3, label: 'Chép một trang thiên mệnh cho chính mình' }, say: [['nguyen_thuy', 'Ngươi viết toàn chữ chưa. Chưa đi, chưa biết, chưa xong. Được, ta không sửa.']] }
        ],
        reward: { hours: 6, goldRefs: 40 }
    },
    {
        id: 'lt_thong_thien', loc: 'bich_du', npc: 'thong_thien', title: 'Lục Thánh · Thông Thiên', needs: [20, 0], gate: 'm20',
        intro: [['thong_thien', 'Tới Bích Du thì phải qua kiếm. Tru Tiên Tứ Kiếm của ta treo ở bốn cửa, mỗi cửa một ý.']],
        steps: [
            { hunt: { loc: 'bich_du', name: 'Tru Tiên Kiếm Linh', n: 4 }, say: [['thong_thien', 'Tru, Lục, Hãm, Tuyệt. Ngươi qua đủ bốn cửa. Có biết bốn thanh kiếm này vốn của ai không?'], ['me', 'Của ngài.'], ['thong_thien', 'Không. Sư tôn đưa ta, còn trước sư tôn thì là của một kẻ đã thua. Lên Ngoại Vực rồi ngươi sẽ gặp.']] }
        ],
        reward: { hours: 7, goldRefs: 45 }
    },
    {
        id: 'lt_nu_oa', loc: 'oa_hoang', npc: 'nu_oa', title: 'Lục Thánh · Nữ Oa', needs: [20, 1], gate: 'm20', after: 'lt_thong_thien',
        intro: [['nu_oa', 'Con ăn gì chưa? Ăn rồi thì giúp ta nhặt đá. Năm xưa vá trời ta dùng năm màu, giờ chỗ vá lại mỏng.']],
        steps: [{ gather: { loc: 'oa_hoang', hours: 4, label: 'Nhặt Ngũ Sắc Thạch vá lại vòm trời' }, say: [['nu_oa', 'Cộng Công đâm đổ Bất Chu Sơn, ta vá. Con người cãi nhau, ta lại vá. Làm mẹ là vá mãi không xong.'], ['narr', 'Viên đá cuối cùng ngươi đặt vào vết nứt có màu thứ sáu. Nữ Oa nhìn rất lâu rồi để yên.']] }],
        reward: { hours: 7, goldRefs: 45 }
    },
    {
        id: 'lt_chuan_de', loc: 'cuc_lac', npc: 'chuan_de', title: 'Lục Thánh · Chuẩn Đề', needs: [21, 0], gate: 'm22',
        intro: [['chuan_de', 'Tây Phương nghèo, đất cằn, linh mạch mỏng. Bọn ta phải xin, phải đổi, phải mời người về.'], ['me', 'Kể cả mời một con khỉ đi phá Thiên Đình?'], ['chuan_de', 'Con khỉ tự đi. Ta chỉ dạy nó bay.']],
        steps: [{ hunt: { loc: 'cuc_lac', name: 'Kim Cương Hộ Pháp', n: 4 }, say: [['chuan_de', 'Kim Cương ở đây không biết đau, cũng không biết vì sao đứng gác. Ngươi đánh xong mà không giận, vậy là hiểu Tây Phương hơn chúng.']] }],
        reward: { hours: 8, goldRefs: 50 }
    },
    {
        id: 'lt_tiep_dan', loc: 'linh_son', npc: 'tiep_dan', title: 'Lục Thánh · Tiếp Dẫn', needs: [21, 1], gate: 'm22', after: 'lt_chuan_de',
        intro: [['tiep_dan', 'Ta khóc vì Tây Phương khổ. Ngồi ở Tử Tiêu Cung nghe giảng, ta khóc tới khi Hồng Vân đạo hữu nhường ghế.'], ['me', 'Ngài có thấy nợ ông ấy không?'], ['tiep_dan', 'Mỗi ngày. Món nợ đó là lý do ta vẫn còn khóc.']],
        steps: [
            { hunt: { loc: 'linh_son', name: 'La Hán Sa Đọa', n: 3 }, say: [['tiep_dan', 'Họ từng là đệ tử ta. Đói lâu quá thì tu hành cũng hóa thành tham.']] },
            { gather: { loc: 'linh_son', hours: 3, label: 'Đi cùng Tiếp Dẫn qua đất Tây Phương' }, say: [['tiep_dan', 'Đây là ruộng của dân Tây Phương. Thánh Nhân không cày được, chỉ đứng nhìn họ cày.'], ['narr', 'Ông cúi nhặt một bông lúa lép, cất vào tay áo như một món bảo vật.']] },
            { go: 'linh_son', say: [['tiep_dan', 'Ngươi đã gặp đủ Lục Thánh. Sáu kẻ ngồi cao nhất mà chẳng ai rảnh tay.'], ['tiep_dan', 'Còn một vị Thánh ở dưới đáy Tam Giới. Bà ấy không ngồi với bọn ta, nhưng ngươi đã gặp rồi.']] }
        ],
        reward: { hours: 8, goldRefs: 50 }
    }
];
LUC_THANH_QUESTS.forEach(q => { QUEST_INDEX[q.gate].needsSide = [...(QUEST_INDEX[q.gate].needsSide || []), q.id]; });

const HH_QUESTS = [...LUC_NGUYEN_QUESTS, ...TAM_GIOI_QUESTS, ...HH_SIDE_QUESTS, ...AM_GIOI_QUESTS, ...LUC_THANH_QUESTS, ...HH_MA_THAN_QUESTS];
HH_QUESTS.filter(q => !LUC_THANH_QUESTS.includes(q)).forEach(q => { q.crossWorld = true; });
SIDE_QUESTS.push(...HH_QUESTS);
HH_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });
QUEST_INDEX.m17a.needsSide = [...(QUEST_INDEX.m17a.needsSide || []), ...LUC_NGUYEN_QUESTS.map(q => q.id)];

Object.assign(QUEST_INDEX.mc16_2, { steps: [{ go: 'dao_tri', say: [['dao_tri_mau', 'Thần Cảnh Lục Nguyên không phải một cảnh giới mà là sáu: Tinh, Khí, Thần, Hồn, Phách, Đạo. Mỗi nguyên phải ngưng ở một nơi khác nhau.'], ['me', 'Ở đâu?'], ['dao_tri_mau', 'Tinh ở Bàn Cổ Điện, Khí ở Ngũ Trang Quán, Thần ở Nam Thiên Môn, Hồn ở Âm Giới, Phách ở Yêu Đình, Đạo dưới ngọn đèn của Nhiên Đăng. Đủ sáu rồi hãy về đây Quy Nhất.']] }] });

Object.assign(NPC_STORIES, {
    hau_tho: [
        { from: 10, lines: ['Ta từng là Tổ Vu, mười hai anh em, sinh từ máu Bàn Cổ.', ['me', 'Giờ người là gì?'], 'Giờ ta là cái bánh xe. Người chết lăn vào, người sống lăn ra. Ta không còn thân để đi đâu nữa.'] },
        { from: 14, lines: ['Ta lấy thân hóa Lục Đạo Luân Hồi, Thiên Đạo trả bằng công đức thành Thánh. Ta là Thánh duy nhất không ngồi ở Tử Tiêu.', ['me', 'Người không lên đó sao?'], 'Ta đứng dậy thì Luân Hồi dừng lại. Thánh của Âm Giới thì ở lại Âm Giới.'] }
    ],
    ngo_khong: [{ from: 11, lines: ['Ngươi biết vì sao ta không nói tên sư phụ không?', ['me', 'Vì đã thề.'], 'Vì ta đoán ra lão là ai. Một vị Thánh ở phương tây, dạy một con khỉ đi phá Thiên Đình, rồi cử đồ đệ mình đi bắt nó. Cờ của Thánh, khỉ là quân.'] }],
    tran_nguyen: [{ from: 12, lines: ['Hồng Vân là bạn ta. Ở Tử Tiêu Cung hắn nhường ghế cho Tiếp Dẫn, Chuẩn Đề.', ['me', 'Rồi sao?'], 'Rồi hắn bị đuổi giết vì luồng tử khí đã nhường đi mà vẫn bị đòi. Ta trồng cây này ở chỗ hắn ngã.'] }],
    duong_tien: [{ from: 14, lines: ['Mẹ ta là em gái Hạo Thiên, bị đè dưới núi Đào Sơn vì lấy chồng phàm.', ['me', 'Ngài cứu bà?'], 'Ta bổ núi. Rồi cậu ta phong ta làm thần, ta nhận, nhưng chưa bao giờ vào chầu.'] }],
    van_tieu: [{ from: 15, lines: ['Triệu Công Minh là anh ruột của ba chúng ta. Anh ấy chết vì bị bùa đóng đinh, ta mới bày Hoàng Hà Trận.', ['me', 'Giờ anh ấy sống rồi.'], 'Ừ. Sống lại rồi mới thấy năm đó giận quá.'] }],
    de_tuan: [{ from: 16, lines: ['Ta với Thái Nhất đều là Kim Ô, sinh trên mặt trời. Lập Yêu Đình để yêu tộc có trời của mình.', ['me', 'Sao lại sụp?'], 'Vì trời chỉ có một. Thánh Nhân không muốn trời thuộc về yêu, cũng không muốn thuộc về Vu.'] }],
    kim_thien: [{ from: 15, lines: ['Ta không nhớ chín kiếp trước. Ta chỉ nhớ mỗi lần chết đều đói.', ['me', 'Đói?'], 'Ừ. Hòa thượng đi lấy kinh chẳng mấy khi được ăn no.'] }]
});

const HH_VOICES = {
    tiep_dan: { up: ['{me}. Ta khóc cho ngươi một giọt, vì đường còn dài.'], even: ['Ngang ta rồi. Vậy ngươi khóc thay ta một hôm.'], down: ['Ngươi vượt ta. Ta vẫn khóc, nhưng giờ là khóc mừng.'], area: 'Linh Sơn. Ruộng Tây Phương cằn, chuông thì không bao giờ ngừng.' },
    manh_ba: { up: ['{me}? Chưa tới lượt ngươi uống canh.'], even: ['Ngang ta. Ngồi xuống, ta múc cho một chén không quên.'], down: ['Ngươi vượt ta rồi. Canh của ta không làm ngươi quên được nữa.'], area: { manh_ba: 'Mạnh Bà Đình. Một chén canh, một đời quên sạch.', town: 'Canh của ta nấu bằng nước Vong Xuyên.' } },
    diem_vuong: { up: ['{me}. Án của ngươi chưa tới bàn ta.'], even: ['Ngang ta. Thập Điện không xử người ngang hàng.'], down: ['Ngươi vượt ta. Sổ án của ta không có trang cho ngươi.'], area: 'Điện thứ nhất Thập Điện Diêm La. Án ở đây không kháng cáo.' },
    phan_quan: { up: ['{me}. Tên ngươi ở trang bốn trăm, ta nhớ.'], even: ['Ngang ta. Muốn xem trang của mình không?'], down: ['Ngươi vượt ta. Trang của ngươi tự nhòe rồi.'], area: 'Sinh Tử Bộ Các. Mỗi tờ sổ là một đời, giấy mỏng hơn ngươi tưởng.' },
    minh_ha_to: { up: ['{me}. Một giọt Huyết Hải cũng đủ nuốt ngươi.'], even: ['Ngang ta. A Tu La sẽ muốn đánh với ngươi.'], down: ['Ngươi vượt ta. Huyết Hải không khô, nhưng ta thôi đòi lên trời.'], area: 'Huyết Hải bất khô, Minh Hà bất tử.' },
    thai_van: { up: ['{me} vào miếu thì cởi giày.'], even: ['Ngang ta thì vào thắp hương đi.'], down: ['Ngươi vượt ta rồi, nhưng Nương Nương vẫn bắt cởi giày.'], area: 'Nữ Oa Miếu ở Tiên Giới chỉ có ta giữ. Muốn gặp Nương Nương thật thì lên Oa Hoàng Cung.' },
    bich_tieu: { up: ['{me} cũng dám bước lên Kim Ngao Đảo à? Gan đấy.'], even: ['Ngang ta. Đừng kể với hai tỷ, họ sẽ bắt ngươi vào trận thử.'], down: ['Ngươi vượt ta rồi. Thôi, ta gọi ngươi là sư huynh vậy.'], area: 'Kim Ngao Đảo, Tiệt Giáo hữu giáo vô loại. Ba tỷ muội ta giữ bờ biển phía đông.' },
    van_tieu: { up: ['{me}, còn xa mới vào được Hoàng Hà Trận.'], even: ['Ngang ta. Trận đồ của ta không nương người ngang hàng.'], down: ['Ngươi vượt ta. Trận nào của ta cũng không nhốt được ngươi nữa.'], area: 'Hỗn Nguyên Kim Đẩu treo trên đầu đảo. Nó từng gọt Tam Hoa của mười hai Kim Tiên.' },
    quynh_tieu: { up: ['Nhỏ quá, kiếm của ta không rút ra cho {me}.'], even: ['Ngang ta. Muốn thử kiếm không?'], down: ['Ngươi vượt ta rồi. Kiếm này ta cất đi vậy.'], area: 'Tiệt Giáo nhận cả yêu. Ngươi nhìn cái cây kia, nó là sư đệ của ta.' },
    kim_linh: { up: ['{me}. Đệ tử ngoại môn còn cao hơn ngươi.'], even: ['Ngang ta. Thông Thiên sư phụ hẳn sẽ muốn gặp ngươi.'], down: ['Ngươi đã vượt ta. Ta là thân truyền, cũng phải cúi đầu.'], area: 'Kim Ngao Đảo đông người nhất Tiên Giới, vì Tiệt Giáo không đuổi ai.' },
    duong_tien: { up: ['Thiên nhãn nhìn thấy ngươi đang ở {me}. Chưa đủ để ta rút thương.'], even: ['Ngang ta. Hao Thiên Khuyển không sủa ngươi, lạ đấy.'], down: ['Ngươi vượt ta. Thiên nhãn ta không nhìn thấu ngươi nữa.'], area: 'Nam Thiên Môn. Ta đứng gác ở đây vì ở đây không phải vào chầu.' },
    na_tra: { up: ['{me} à? Ta năm tuổi đã mạnh hơn thế.'], even: ['Ngang ta! Đánh một trận đi, không ai chết đâu.'], down: ['Ngươi vượt ta rồi. Đừng nói với cha ta.'], area: 'Bắc Thiên Môn, chỗ cha ta đóng quân. Ta ở đây để ông ấy đỡ lo.' },
    ly_tinh: { up: ['{me}. Đứng xa ra, tháp này không phân biệt bạn thù.'], even: ['Ngang ta. Ngồi xuống uống chén trà, ta mỏi tay rồi.'], down: ['Ngươi vượt ta. Ta chỉ là một ông bố cầm tháp.'], area: 'Đại doanh Thác Tháp Thiên Vương. Thiên binh ở đây chưa từng thắng con khỉ đó lần nào.' },
    ngo_khong: { up: ['Ha, {me}! Lão Tôn thổi một hơi là ngươi bay về Phàm Giới.'], even: ['Ngang lão Tôn rồi đó. Đánh không? Đánh cho vui.'], down: ['Ngươi vượt lão Tôn rồi. Năm trăm năm dưới núi ta mới học được chữ phục.'], area: { hoa_qua: 'Hoa Quả Sơn, Thủy Liêm Động. Lũ khỉ con vẫn chờ ta về chia đào.', ngu_hanh: 'Ngũ Hành Sơn. Năm trăm năm ta nằm dưới đây, giờ về thăm như thăm nhà cũ.', town: 'Lão Tôn đi đâu cũng là nhà.' } },
    bat_gioi: { up: ['{me}? Ngồi xuống ăn gì đã, chuyện tu luyện để mai.'], even: ['Ngang ta à. Thôi chia nhau con gà này đi.'], down: ['Ngươi vượt ta rồi. Ta đã nói ta lười mà.'], area: 'Thiên Hà. Tám vạn thủy quân của ta năm xưa giờ chỉ còn sóng.' },
    sa_tang: { up: ['{me}. Sông này nuốt người ở cảnh giới đó.'], even: ['Ngang ta. Qua sông thì ta chở.'], down: ['Ngươi vượt ta. Ta chỉ biết gánh hành lý.'], area: 'Lưu Sa Hà, tám trăm dặm cát chảy, lông ngỗng cũng chìm.' },
    kim_thien: { up: ['A Di Đà Phật. {me} đi đường xa chưa?'], even: ['Ngang bần tăng. Mười kiếp chưa từng gặp ai như vậy.'], down: ['Thí chủ đã vượt bần tăng. Ta vẫn còn đói như mười kiếp trước.'], area: 'Tu Di Sơn. Kinh ở đây ta chép mười lần mới đem được về một lần.' },
    nhien_dang: { up: ['{me}. Ngọn đèn của ta chưa soi tới ngươi.'], even: ['Ngang ta. Ta là Quá Khứ, ngươi có muốn làm quá khứ không?'], down: ['Ngươi vượt ta. Đèn này tặng ngươi soi đường.'], area: 'Linh Cữu Đăng cháy từ trước khi có Phật. Ta ngồi đây nhìn nó mỗi ngày.' },
    quan_am: { up: ['{me}, con vất vả rồi.'], even: ['Ngang ta. Vậy con độ được người rồi.'], down: ['Con đã vượt ta. Đi đâu cũng nhớ nhìn người bên đường.'], area: 'Ta không ở đây. Ta ở nơi có người cần, chỗ này hôm nay cần.' },
    tran_nguyen: { up: ['{me}. Đất dưới chân ngươi còn nặng hơn ngươi.'], even: ['Ngang ta. Ăn một quả Nhân Sâm không?'], down: ['Ngươi vượt ta. Địa Tiên Chi Tổ cũng chỉ là ông lão trồng cây.'], area: 'Ngũ Trang Quán. Cây Nhân Sâm đã từng bị một con khỉ quật đổ, ta trồng lại.' },
    hau_tho: { up: ['Con ở {me}. Ta nhớ hồn con, nó từng qua đây khi con còn là phàm nhân.'], even: ['Ngang ta rồi. Luân Hồi không giữ được con nữa.'], down: ['Con vượt ta. Lúc nào mệt thì xuống đây ngồi, ta không đòi gì.'], area: 'Âm Giới, Lục Đạo Luân Hồi. Mọi linh hồn đều đi ngang qua ta, kể cả của Thánh.' },
    dia_tang: { up: ['{me}. Chưa tới lúc ngươi xuống đây.'], even: ['Ngang ta. Phụ ta dẫn hồn một ngày không?'], down: ['Ngươi vượt ta. Địa ngục vẫn chưa trống.'], area: 'Cầu Nại Hà, Vọng Hương Đài. Ai đi qua cũng ngoái lại một lần.' },
    hau_nghe: { up: ['{me}. Mũi tên của ta bắn rơi mặt trời, ngươi đứng xa ra.'], even: ['Ngang ta. Vu tộc không nói nhiều, đánh xong rồi uống.'], down: ['Ngươi vượt ta. Thay ta lên Quảng Hàn hỏi thăm nàng.'], area: 'Bàn Cổ Điện, chỗ Vu tộc cuối cùng còn thờ tổ.' },
    de_giang: { up: ['{me}. Vu tộc không cúi đầu với ai, nhất là kẻ yếu.'], even: ['Ngang ta, một tàn hồn. Đừng tự hào.'], down: ['Ngươi vượt Tổ Vu. Bàn Cổ hẳn sẽ vui.'], area: 'Tượng Bàn Cổ trong điện này cao hơn trời Tiên Giới, đỉnh đầu chạm vào hư không.' },
    de_tuan: { up: ['{me}. Yêu Đình năm xưa có cả triệu kẻ như ngươi.'], even: ['Ngang Yêu Đế. Ta còn là tàn ảnh, ngươi không cần cúi.'], down: ['Ngươi vượt ta. Hà Đồ Lạc Thư cũng không tính được ngươi.'], area: 'Yêu Đình cố đô, ba mươi ba tầng trời của yêu tộc, giờ chỉ còn nền đá.' },
    thai_nhat: { up: ['Hỗn Độn Chung rung một tiếng là {me} tan xác.'], even: ['Ngang ta. Ta còn một tiếng chuông, không phí cho ngươi.'], down: ['Ngươi vượt ta. Chuông này tặng ngươi cũng không ai đánh được.'], area: 'Đông Hoàng Chung từng treo ở đây. Giờ chỉ còn tiếng của nó.' },
    nhu_lai: { up: ['{me}. Bàn tay ta lớn hơn đường ngươi đi.'], even: ['Ngang ta. Ngươi có thấy gã chủ chợ ở Đa Bảo Thị không?'], down: ['Ngươi vượt ta. Năm ngón tay ta không giữ được ngươi.'], area: 'Linh Sơn. Ở đây ai cũng cười, trừ ta khi nhớ Bích Du.' },
    can_khon: { up: ['Khách cứ đi, lão nhặt đá thôi.'], even: ['Đá này nặng lắm, khách giúp lão một tay?'], down: ['Khách mạnh thật. Lão chỉ là kẻ nhặt đá.'], area: 'Vạn Giới Phế Tích, đá nào cũng từng là một bầu trời.' },
    am_duong_to: { up: ['Qua sông không khách?'], even: ['Bờ nào cũng như nhau thôi.'], down: ['Khách tự bơi qua được rồi.'], area: 'Luân Hồi Hải, nước hai màu không hòa vào nhau.' },
    thoi_than: { up: ['Đừng bước lên bậc này, vừa quét xong.'], even: ['Khách tới sớm hay muộn vậy?'], down: ['Khách không để lại dấu chân. Lạ.'], area: 'Tinh Thần Mộ, sao chết thì về đây nằm.' },
    duong_mi: { up: ['Đứng xa cây liễu ra, nó quấn người.'], even: ['Khách thích liễu không?'], down: ['Khách bước qua khoảng cách như bước qua rãnh nước.'], area: 'Hư Không Chi Nhãn, liễu mọc không cần đất.' },
    la_hau: { up: ['Ngồi đi. Đừng nhìn mấy thanh kiếm.'], even: ['Ngồi ngang ta. Hiếm có ai dám.'], down: ['Ngươi mạnh hơn Hồng Quân lúc hắn thắng ta.'], area: 'Vô Thiên Ma Vực. Ma ở đây đều là con cháu ta, chúng không biết.' },
    ban_co: { up: ['Núi im lặng.'], even: ['Núi thở ra một hơi dài.'], down: ['Núi mở mắt, nhìn ngươi rất lâu.'], area: 'Khai Thiên Hoang Nguyên. Đất ở đây vẫn còn vết rìu.' }
};

if (typeof window !== 'undefined') Object.assign(window, { lucNguyenStatHTML });
