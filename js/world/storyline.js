/* ===========================================================
   CỐT TRUYỆN — từ thôn nhỏ tới Chung Nguyên Đài
   Quest: { id, act, title, unlock (đại cảnh giới mà quest này mở khóa),
            needs: [realm, stage], steps: [...], reward: {...} }
   Step (mỗi step một loại, say là thoại khi step xong):
     go: địa điểm | hunt: {loc,name,n} | boss: id | gather: {loc,hours,label}
   {name} trong thoại được thay bằng đạo danh người chơi.
=========================================================== */
const ACTS = [
    { id: 1, name: 'Hồi I — Phàm Trần', desc: 'Một đứa trẻ mồ côi bước lên đường tu tiên.' },
    { id: 2, name: 'Hồi II — Tiên Lộ Là Mỏ', desc: 'Phi thăng không phải giải thoát: từ tiên nô dưới mỏ tới Tiên Đế, Đại La Kim Tiên rồi Chuẩn Thánh.' },
    { id: 3, name: 'Hồi III — Thất Thánh', desc: 'Thế gian chỉ có sáu vị Thánh, và ngươi là người thứ bảy. Việc nhiều ở Tiên Giới, thỉnh thoảng lên Thánh Giới nghị chính sự.' },
    { id: 4, name: 'Hồi IV — Đại Đạo Chí Thượng', desc: 'Các cảnh giới Thiên là cực đạo cảnh. Sau lưng Lục Thánh còn rất nhiều người.' },
    { id: 5, name: 'Hồi V — Hỗn Độn Đạo Giả', desc: 'Bên ngoài vũ trụ có những kẻ xem vũ trụ như hạt bụi.' },
    { id: 6, name: 'Hồi VI — Hồng Mông', desc: 'Cảnh giới do chính ngươi sáng tạo. Bên trên không có ai, chỉ còn việc xuống nói chuyện với bên dưới.' },
    { id: 7, name: 'Hồi VII — Chung Nguyên', desc: 'Điểm kết. Một chiếc ghế trống.' }
];

const NPC_LOOK = (body, hairStyle, hair, robe, extra = {}) => ({ body, hairStyle, hair, robe, skin: '#f6d7b8', eyes: '#2b1b12', ...extra });

const NPCS = {
    narr: { name: 'Thiên Cơ' },
    phan_do_say: { name: 'Hắc Bào Trưởng Lão', title: 'Kẻ phản đồ', look: NPC_LOOK('m', 0, '#c9c9d6', '#2b2b35', { aura: '#a8342a' }) },
    tam_ma_say: { name: 'Ngươi Của Kiếp Trước', title: 'Tâm ma', look: NPC_LOOK('m', 1, '#c9c9d6', '#2b2b35', { aura: '#c58bff' }) },
    mac: { name: 'Lão Mặc', title: 'Kẻ quét lá', look: NPC_LOOK('m', 0, '#c9c9d6', '#55524a', { beard: true, weapon: 'staff', weaponColor: '#8a7a55' }) },
    thuy_ba: { name: 'Thủy Bà', title: 'Trưởng thôn', look: NPC_LOOK('f', 0, '#c9c9d6', '#8c6a3a', {}) },
    to_dao: { name: 'Tô Thanh Dao', title: 'Sư tỷ Thanh Vân', look: NPC_LOOK('f', 1, '#1b1b22', '#3e7d5a', { weapon: 'sword', weaponColor: '#7be4a3', eyes: '#2f8f5a' }) },
    lang_phong: { name: 'Lăng Phong', title: 'Thiên kiêu Thanh Vân', look: NPC_LOOK('m', 2, '#2a4f8f', '#d9d4c5', { weapon: 'sword', weaponColor: '#6db8ff' }) },
    chuong_mon: { name: 'Vân Hạc Chân Nhân', title: 'Chưởng môn', look: NPC_LOOK('m', 0, '#f0e6c8', '#3f6f9e', { beard: true, crown: 'guan' }) },
    han_bang: { name: 'Hàn Băng Tiên Tử', title: 'Ẩn sĩ Băng Phong', look: NPC_LOOK('f', 1, '#e9eef7', '#bfe3ff', { skin: '#e9e2f0', eyes: '#2a5fa8', aura: '#9fd3ff' }) },
    ma_quan: { name: 'Cửu U Ma Quân', title: 'Chúa tể Ma Uyên', look: NPC_LOOK('m', 4, '#7a1f2b', '#2b2b35', { eyes: '#a8342a', weapon: 'spear', weaponColor: '#a8342a', aura: '#a8342a' }) },
    tien_lai: { name: 'Bạch Lão Đầu', title: 'Tiên nô già', look: NPC_LOOK('m', 5, '#c9c9d6', '#55524a', { beard: true }) },
    van_nguyet: { name: 'Vân Nguyệt', title: 'Thủ lĩnh Tán Tiên', look: NPC_LOOK('f', 2, '#5b2a86', '#6b4a8f', { weapon: 'fan', weaponColor: '#d59bff', eyes: '#8a4fc0' }) },
    dao_tri_mau: { name: 'Dao Trì Thánh Mẫu', title: 'Chủ Dao Trì', look: NPC_LOOK('f', 3, '#1b1b22', '#dbe8f7', { crown: 'guan', aura: '#ffd9ef' }) },
    tien_de: { name: 'Hạo Thiên Tiên Đế', title: 'Chúa tể Tiên Giới', look: NPC_LOOK('m', 0, '#1b1b22', '#b5832e', { crown: 'guan', crownColor: '#ffd479', weapon: 'sword', weaponColor: '#ffc14d', beard: true, aura: '#ffd76a' }) },
    da_bao: { name: 'Đa Bảo Đạo Nhân', title: 'Kẻ duy nhất bán đồ cấp Thánh', look: NPC_LOOK('m', 5, '#1b1b22', '#b5832e', { weapon: 'orb', weaponColor: '#ffc14d' }) },
    thai_thanh: { name: 'Thái Thanh Thánh Nhân', title: 'Đại sư huynh Tam Thanh', look: NPC_LOOK('m', 0, '#f0e6c8', '#e8e4d8', { beard: true, crown: 'halo', crownColor: '#ffe9a0', aura: '#ffe9a0', weapon: 'fan', weaponColor: '#e8e4d8' }) },
    nguyen_thuy: { name: 'Nguyên Thủy Thiên Tôn', title: 'Giáo chủ Xiển Giáo', look: NPC_LOOK('m', 0, '#1b1b22', '#d9d4c5', { beard: true, crown: 'halo', crownColor: '#ffe9a0', aura: '#fff3c4', weapon: 'staff', weaponColor: '#ffd479' }) },
    thong_thien: { name: 'Thông Thiên Giáo Chủ', title: 'Giáo chủ Tiệt Giáo', look: NPC_LOOK('m', 1, '#1b1b22', '#2b2b35', { crown: 'halo', crownColor: '#ff6b6b', aura: '#ff8a4c', weapon: 'sword', weaponColor: '#ff6b6b' }) },
    nu_oa: { name: 'Nữ Oa Nương Nương', title: 'Mẹ của muôn loài', look: NPC_LOOK('f', 1, '#1b1b22', '#3e7d5a', { crown: 'halo', crownColor: '#7be4a3', aura: '#7be4a3', weapon: 'orb', weaponColor: '#7be4a3' }) },
    chuan_de: { name: 'Chuẩn Đề Đạo Nhân', title: 'Thánh Nhân Tây Phương', look: NPC_LOOK('m', 5, '#1b1b22', '#b5832e', { crown: 'wheel', crownColor: '#ffd479', aura: '#ffd479' }) },
    tiep_dan: { name: 'Tiếp Dẫn Đạo Nhân', title: 'Thánh Nhân Tây Phương', look: NPC_LOOK('m', 5, '#1b1b22', '#d9a520', { crown: 'wheel', crownColor: '#ffd479', aura: '#ffd479', weapon: 'staff', weaponColor: '#ffd479' }) },
    dao_to: { name: 'Đạo Tổ', title: 'Người giữ Thiên Đạo', look: NPC_LOOK('m', 0, '#ffffff', '#5a3a9e', { beard: true, crown: 'wheel', crownColor: '#c58bff', aura: '#c58bff', eyes: '#8a4fc0' }) },
    ly_khach: { name: 'Lữ Khách Vô Cương', title: 'Chủ quán', look: NPC_LOOK('m', 4, '#8b5a2b', '#55524a', { weapon: 'staff', weaponColor: '#8a7a55' }) },
    vo_danh: { name: 'Vô Tướng Vô Hình Siêu Thoát Đại Thần Minh', title: 'Hỗn Độn Đạo Giả', look: NPC_LOOK('m', 1, '#5fe6e6', '#13525c', { aura: '#5fe6e6', crown: 'wheel', crownColor: '#5fe6e6', eyes: '#2f8f5a' }) },
    vong_ky: { name: 'Cửu Duệ Thần Linh', title: 'Hỗn Độn Đạo Giả', look: NPC_LOOK('f', 1, '#e9eef7', '#13525c', { aura: '#5fe6e6', eyes: '#2a5fa8', weapon: 'orb', weaponColor: '#5fe6e6' }) },
    ma_than: { name: 'Ma Thần Thiên Ngô', kind: 'chaos', realm: 29 },
};

const SAINT_ELEMENTS = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];

const BOSSES = {
    hac_trai_chu: { npc: { name: 'Hắc Phong Trại Chủ', look: NPC_LOOK('m', 4, '#1b1b22', '#2b2b35', { weapon: 'sword', weaponColor: '#8c3a3a', beard: true }) }, realm: 0, stage: 1 },
    lang_phong_1: { npc: 'lang_phong', realm: 1, stage: 1, scale: 0.9 },
    thanh_lan: { kind: 'dragon', name: 'Thanh Lân Yêu Vương', realm: 2, stage: 2 },
    phan_do: { npc: { name: 'Hắc Bào Trưởng Lão', look: NPC_LOOK('m', 0, '#c9c9d6', '#2b2b35', { aura: '#a8342a', weapon: 'staff', weaponColor: '#a8342a' }) }, realm: 3, stage: 2 },
    hoa_ma_vuong: { kind: 'demon', name: 'Địa Hỏa Ma Vương', realm: 4, stage: 2 },
    lang_phong_2: { npc: 'lang_phong', realm: 5, stage: 2 },
    tuyet_long: { kind: 'dragon', name: 'Vạn Niên Tuyết Long', realm: 6, stage: 2 },
    ma_quan: { npc: 'ma_quan', realm: 7, stage: 2, board: 4 },
    thien_kiep: { kind: 'spirit', name: 'Cửu Trọng Thiên Kiếp', realm: 8, stage: 2, board: 4 },
    doc_cong: { npc: { name: 'Đốc Công Trương Tiên', look: NPC_LOOK('m', 4, '#1b1b22', '#b5832e', { weapon: 'spear', weaponColor: '#ffc14d' }) }, realm: 9, stage: 2 },
    thien_tuong: { npc: { name: 'Phi Thăng Giám Sát Sứ', look: NPC_LOOK('m', 0, '#1b1b22', '#dbe8f7', { weapon: 'sword', weaponColor: '#9fd3ff', crown: 'guan' }) }, realm: 10, stage: 2 },
    tinh_giao: { kind: 'dragon', name: 'Thiên Hà Giao Vương', realm: 11, stage: 2 },
    kiem_khi: { npc: 'thong_thien', realm: 21, stage: 2, scale: 3, scriptedLoss: true, board: 5 },
    cu_linh: { kind: 'golem', name: 'Cự Linh Thần Tướng', realm: 12, stage: 2 },
    than_ha: { npc: { name: 'Thiên Bồng Nguyên Soái', look: NPC_LOOK('m', 4, '#1b1b22', '#2f5f9e', { weapon: 'spear', weaponColor: '#9fd3ff' }) }, realm: 13, stage: 2 },
    nam_mon: { npc: { name: 'Tăng Trưởng Thiên Vương', look: NPC_LOOK('m', 0, '#1b1b22', '#8c3a3a', { weapon: 'spear', weaponColor: '#ffd479', crown: 'guan' }) }, realm: 14, stage: 2, board: 4 },
    tien_de: { npc: 'tien_de', realm: 15, stage: 2, board: 5, scale: 1.1 },
    nguyen_thuy_phan: { npc: 'nguyen_thuy', realm: 21, stage: 2, scale: 4, scriptedLoss: true, board: 5 },
    thai_thanh: { npc: 'thai_thanh', realm: 19, stage: 2, scale: 0.7, board: 5, elements: SAINT_ELEMENTS },
    nguyen_thuy: { npc: 'nguyen_thuy', realm: 21, stage: 2, scale: 0.6, board: 5, elements: SAINT_ELEMENTS },
    thong_thien: { npc: 'thong_thien', realm: 21, stage: 2, scale: 0.9, board: 5, elements: SAINT_ELEMENTS },
    chuan_tiep: { npc: 'chuan_de', realm: 21, stage: 1, scale: 0.85, board: 5, elements: SAINT_ELEMENTS },
    thien_ma_chu: { kind: 'chaos', name: 'Ngoại Vực Thiên Ma Chủ', realm: 23, stage: 2, board: 5 },
    khoi_loi: { kind: 'golem', name: 'Thiên Đạo Chấp Hành Thể', realm: 23, stage: 2, board: 4 },
    nghiep_long: { kind: 'dragon', name: 'Vạn Kiếp Nghiệp Long', realm: 24, stage: 2, board: 4 },
    tam_ma: { npc: { name: 'Ngươi Của Kiếp Trước', look: NPC_LOOK('m', 1, '#c9c9d6', '#2b2b35', { aura: '#c58bff' }) }, realm: 25, stage: 2, board: 5 },
    quy_tac: { kind: 'chaos', name: 'Thiên Phạt Quy Tắc Thể', realm: 26, stage: 2, board: 5 },
    than_dinh_ve: { kind: 'golem', name: 'Thần Đình Đại Hộ Vệ', realm: 27, stage: 2, board: 5 },
    dao_to: { npc: 'dao_to', realm: 28, stage: 2, board: 6, scale: 1.1, elements: SAINT_ELEMENTS },
    dao_gia_thu: { npc: 'vo_danh', realm: 29, stage: 0, scale: 3, scriptedLoss: true, board: 6 },
    ma_than: { kind: 'chaos', name: 'Ma Thần Thiên Ngô', realm: 29, stage: 2, board: 5 },
    vong_ky: { npc: 'vong_ky', realm: 29, stage: 2, board: 6, scale: 1.05 },
    vo_danh: { npc: 'vo_danh', realm: 29, stage: 3, board: 6, scale: 1.1 },
    cs_1: { npc: 'vong_ky', realm: 31, stage: 3, board: 6, scale: 1 },
    cs_2: { npc: 'vo_danh', realm: 31, stage: 3, board: 6, scale: 1.05 },
    cs_3: { npc: 'thich_thien', realm: 31, stage: 3, board: 6, scale: 1.1 },
    cs_4: { npc: 'am_duong', realm: 31, stage: 3, board: 6, scale: 1.15 },
    cs_5: { npc: 'hd_vo_thuc', realm: 31, stage: 3, board: 6, scale: 1.2 },
    cs_6: { npc: 'hd_thu_cuu', realm: 31, stage: 3, board: 6, scale: 1.3 },
    cs_7: { npc: 'hd_thu_cuu', realm: 31, stage: 3, board: 6, scale: 1.3, adds: { n: 1, name: 'Hỗn Độn Vô Thức' } },
    cs_8: { npc: 'am_duong', realm: 31, stage: 3, board: 6, scale: 1.3, adds: { n: 1, name: 'Thích Thiên Vô Lượng Đại Diệt Tôn' } },
    cs_9: { npc: 'hd_thu_cuu', realm: 31, stage: 3, board: 6, scale: 1.4, adds: { n: 5, name: 'Đạo Giả Liên Thủ' } },
    cs_10: { kind: 'chaos', name: 'Tất Cả Chúng Sinh', realm: 31, stage: 3, board: 6, scale: 1.6, adds: { n: 5, name: 'Chúng Sinh' } },
    hv_gear: { kind: 'chaos', name: 'Trang Bị Tách Ra', realm: 31, stage: 3, board: 4, scale: 0.8, huVoPiece: 'gear' },
    hv_lb: { kind: 'chaos', name: 'Pháp Bảo Tách Ra', realm: 31, stage: 3, scale: 1, huVoPiece: 'lb' },
    hu_vo: { kind: 'chaos', name: 'Hư Vô Chí Đạo', realm: 31, stage: 3, board: 6, scale: 2, hpMult: 4, huVoFinal: true },
};

const MAIN_QUESTS = [
    /* ===== HỒI I ===== */
    {
        id: 'm01', act: 1, title: 'Đêm Lửa Thanh Thủy', needs: [0, 0],
        steps: [
            { go: 'thanh_thuy', say: [['narr', 'Năm ngươi mười tuổi, Thanh Thủy Thôn chỉ có suối, ruộng và một lão già quét lá.'], ['thuy_ba', '{name}, sói đói lại xuống núi rồi. Con ra bờ suối đuổi chúng đi giúp bà.']] },
            { hunt: { loc: 'thanh_thuy', name: 'Sói Đói', n: 2 }, say: [['mac', 'Tay chân còn run mà mắt không chớp. Được.'], ['narr', 'Đêm đó, lửa cháy trên mái nhà đầu làng. Hắc Phong Trại đã xuống núi.']] },
            { boss: 'hac_trai_chu', say: [['thuy_ba', 'Con... đã giết hắn? Thanh Thủy còn lại được mấy mái nhà đâu con.'], ['mac', 'Ngươi có linh căn. Đến Thanh Vân Tông đi. Nói là Lão Mặc giới thiệu — dù chẳng ai nhớ cái tên đó.']] }
        ],
        reward: { hours: 6, goldRefs: 10, gear: ['ring', 1] }
    },
    {
        id: 'm02', act: 1, title: 'Sơn Môn Thanh Vân', unlock: 1, needs: [0, 2],
        steps: [
            { go: 'thanh_van', say: [['to_dao', 'Đệ tử mới à? Khôi lỗi thí luyện không biết nương tay đâu.'], ['lang_phong', 'Một thằng nhà quê cũng đòi nhập môn sao?']] },
            { hunt: { loc: 'thanh_van', name: 'Khôi Lỗi Thí Luyện', n: 3 }, say: [['chuong_mon', 'Từ nay ngươi là ngoại môn đệ tử. Động phủ sau núi linh khí dày gấp đôi dưới chân núi. Hãy bế quan.'], ['to_dao', 'Nhớ nhé: thân thể chỉ là cái nền. Ở cảnh giới này, kẻ có đồ tốt đánh ngã kẻ có tu vi cao.']] }
        ],
        reward: { hours: 6, goldRefs: 15, gear: ['boots', 1] }
    },
    {
        id: 'm03', act: 1, title: 'Tiểu Tỷ Nội Môn', unlock: 2, needs: [1, 2],
        steps: [
            { go: 'vu_moc_lam', say: [['to_dao', 'Thanh Lân Yêu Vương cắn bị thương nhiều sư đệ ở Vạn Mộc Lâm. Đi cùng ta.']] },
            { hunt: { loc: 'vu_moc_lam', name: 'Thanh Lân Mãng', n: 3 } },
            { boss: 'thanh_lan' },
            { go: 'thanh_van', say: [['lang_phong', 'Công đầu thuộc về ta, hiểu chưa? Muốn nội môn thì lên đài.']] },
            { boss: 'lang_phong_1', say: [['chuong_mon', 'Thắng thua không quan trọng. Kết Đan đi, ta muốn thấy Kim Đan của ngươi.']] }
        ],
        reward: { hours: 12, goldRefs: 20, gear: ['weapon', 2] }
    },
    {
        id: 'm04', act: 1, title: 'Bóng Đen Trong Tông', unlock: 3, needs: [2, 2],
        steps: [
            { gather: { loc: 'thanh_van', hours: 2, label: 'Tra sổ đệ tử mất tích' }, say: [['to_dao', 'Mười hai đệ tử mất tích trong ba năm, đều bị gọi lên Hắc Bào Trưởng Lão.']] },
            { boss: 'phan_do', say: [['phan_do_say', 'Ngu xuẩn... Ma Uyên sắp mở, Thanh Vân chỉ là bữa ăn đầu tiên...'], ['chuong_mon', 'Từ hôm nay ngươi là chân truyền. Đừng hỏi ta vì sao sổ sách tông môn thiếu trang.']] }
        ],
        reward: { hours: 12, goldRefs: 25, gear: ['armor', 2] }
    },
    {
        id: 'm05', act: 1, title: 'Địa Hỏa Luyện Anh', unlock: 4, needs: [3, 2],
        steps: [
            { go: 'van_long', say: [['to_dao', 'Muốn hóa Nguyên Anh thành thần cần địa hỏa của Xích Diệm Sơn. Mua thêm đan rồi đi.']] },
            { go: 'xich_diem' },
            { hunt: { loc: 'xich_diem', name: 'Hỏa Ma', n: 4 } },
            { boss: 'hoa_ma_vuong', say: [['mac', 'Lão quét lá đi ngang thôi. Ngọn lửa này khá đấy, cầm lấy mà luyện đồ.']] }
        ],
        reward: { hours: 18, goldRefs: 30, gear: ['helm', 2], lb: 1 }
    },
    {
        id: 'm06', act: 1, title: 'Kiếm Trên Đỉnh Thanh Vân', unlock: 5, needs: [4, 2],
        steps: [
            { go: 'thanh_van', say: [['narr', 'Máu chảy trên bậc đá sơn môn. Lăng Phong đứng giữa quảng trường, sau lưng là ma khí.'], ['lang_phong', 'Thiên tài như ta sao phải đợi ngàn năm? Ma Quân cho ta thứ tông môn không dám cho.']] },
            { boss: 'lang_phong_2', say: [['to_dao', 'Hắn chạy về Ma Uyên rồi. Chưởng môn... đã tọa hóa.'], ['chuong_mon', 'Thanh Vân giao lại cho các con. Đừng để lửa tắt.']] }
        ],
        reward: { hours: 18, goldRefs: 40, gear: ['amulet', 2], boardSlot: true }
    },
    {
        id: 'm07', act: 1, title: 'Băng Tâm Hợp Thể', unlock: 6, needs: [5, 2],
        steps: [
            { go: 'bang_phong', say: [['han_bang', 'Ngươi mang tâm báo thù, thân thể sẽ nứt trước khi hợp đạo. Giết con rồng ngoài kia, rồi ngồi yên trong băng bảy ngày.']] },
            { boss: 'tuyet_long' },
            { gather: { loc: 'bang_phong', hours: 6, label: 'Tĩnh tọa trong băng' }, say: [['han_bang', 'Hồn còn nóng, nhưng đủ dùng. Nhớ rằng: người ở trên kia cũng từng tĩnh tọa như thế này.']] }
        ],
        reward: { hours: 24, goldRefs: 50 }
    },
    {
        id: 'm08', act: 1, title: 'Xuống Ma Uyên', unlock: 7, needs: [6, 2],
        steps: [
            { go: 'ma_uyen', say: [['ma_quan', 'Kẻ phi thăng sợ ta? Nực cười. Ta mới là kẻ duy nhất KHÔNG muốn lên trên đó.']] },
            { hunt: { loc: 'ma_uyen', name: 'Vực Ma', n: 5 } },
            { boss: 'ma_quan', say: [['ma_quan', 'Ngươi nghĩ phi thăng là gì? Hãy lên xem... rồi nhớ lời ta...'], ['to_dao', 'Hắn chết rồi. Vậy mà sao ta thấy lạnh hơn lúc trước?']] }
        ],
        reward: { hours: 24, goldRefs: 60, gear: ['weapon', 3] }
    },
    {
        id: 'm09', act: 1, title: 'Cửu Trọng Lôi Kiếp', unlock: 8, needs: [7, 2],
        steps: [
            { gather: { loc: 'van_long', hours: 8, label: 'Tích trữ đan dược độ kiếp' } },
            { go: 'phi_thang', say: [['narr', 'Lôi vân kéo tới che kín phàm giới. Chín tầng kiếp, mỗi tầng dày hơn tầng trước.']] },
            { boss: 'thien_kiep', say: [['mac', 'Sống à? Tốt. Vậy lên đi. Nhớ quét lá cho sạch.']] }
        ],
        reward: { hours: 24, goldRefs: 80 }
    },
    {
        id: 'm10', act: 1, title: 'Phi Thăng', unlock: 9, needs: [8, 2],
        steps: [
            { go: 'thanh_van', say: [['to_dao', 'Ta ở lại giữ Thanh Vân. Đệ cứ đi. Trên đó... nhớ viết thư về.']] },
            { go: 'phi_thang', say: [['narr', 'Cột sáng từ Phi Thăng Đài xuyên qua mây. Phàm giới thu nhỏ dần dưới chân ngươi.']] }
        ],
        reward: { flag: 'world_tien', hours: 24, goldRefs: 100, gear: ['armor', 3] }
    },

    /* ===== HỒI II ===== */
    {
        id: 'm11', act: 2, title: 'Tiên Nô', unlock: 10, needs: [9, 0],
        steps: [
            { go: 'tien_khoang', say: [['tien_lai', 'Kẻ phi thăng là đồng tiền của Thiên Đình đó con. Hôm nay đốc công đánh chết thêm một người, lão không muốn đếm nữa.']] },
            { hunt: { loc: 'tien_khoang', name: 'Đốc Công Tiên Khoáng', n: 3 } },
            { boss: 'doc_cong', say: [['tien_lai', 'Ngươi... đánh chết đốc công? Đi đi. Vạn Tiên Thành có người muốn gặp kẻ như ngươi.'], ['narr', 'Lời của Cửu U Ma Quân vang lên trong đầu ngươi.']] }
        ],
        reward: { hours: 24, goldRefs: 100, gear: ['ring', 3] }
    },
    {
        id: 'm12', act: 2, title: 'Tán Tiên Minh', unlock: 11, needs: [10, 2],
        steps: [
            { go: 'van_tien', say: [['van_nguyet', 'Tán Tiên Minh không có lý tưởng. Chúng ta chỉ không muốn bị đào đến chết. Chứng minh ngươi có ích đi.']] },
            { boss: 'thien_tuong', say: [['van_nguyet', 'Sổ của tên giám sát này ghi rõ: linh tủy Tiên Giới không về Thiên Đình. Nó chảy ra khỏi Tiên Giới, tới một nơi không có trên bản đồ.']] }
        ],
        reward: { hours: 24, goldRefs: 120, gear: ['boots', 3] }
    },
    {
        id: 'm13', act: 2, title: 'Kiếm Khí Từ Trời', unlock: 12, needs: [11, 2],
        steps: [
            { go: 'thien_ha', say: [['van_nguyet', 'Đường ống linh tủy chạy dưới Thiên Hà. Cắt được một đoạn là Thiên Đình đau.']] },
            { boss: 'tinh_giao', say: [['narr', 'Trời nứt một đường. Một đạo kiếm khí lạc từ rất xa rơi xuống, không ai cầm kiếm.']] },
            { boss: 'kiem_khi', say: [['thong_thien', 'Ồ, kiếm ta thử ở Bích Du đi lạc, trúng phải con kiến biết cắn. Lớn nhanh lên, rồi đến tìm ta.'], ['van_nguyet', 'Đó... chỉ là một sợi kiếm khí. Ngươi vừa chạm vào Thánh Nhân đấy.']] }
        ],
        reward: { hours: 36, goldRefs: 150, gear: ['amulet', 3] }
    },
    {
        id: 'm14', act: 2, title: 'Vết Thương Dao Trì', unlock: 13, needs: [12, 2],
        steps: [
            { go: 'dao_tri', say: [['dao_tri_mau', 'Kiếm khí Thông Thiên còn nằm trong kinh mạch ngươi. Ngồi xuống, ta rút cho. Rồi đi giết Cự Linh, hắn đang canh con ta.']] },
            { gather: { loc: 'dao_tri', hours: 6, label: 'Rút kiếm khí' } },
            { boss: 'cu_linh', say: [['dao_tri_mau', 'Hạo Thiên đã ký một khế ước, với kẻ không ở Tiên Giới. Ta từng là vợ hắn mà chưa bao giờ thấy mặt kẻ đó.']] }
        ],
        reward: { hours: 36, goldRefs: 180, gear: ['helm', 3], lb: 1 }
    },
    {
        id: 'm15', act: 2, title: 'Đóng Cửa Vô Quang', unlock: 14, needs: [13, 2],
        steps: [
            { go: 'van_tien', say: [['van_nguyet', 'Tán Tiên Minh xuất quân. Ba ngàn năm, lần đầu tiên. Phá đoạn ống chính ở Thiên Hà là mỏ Vô Quang chết hẳn.']] },
            { go: 'thien_ha', say: [['van_nguyet', 'Thiên Bồng đích thân giữ đoạn ống này. Hạ hắn đi.']] },
            { boss: 'than_ha', say: [['tien_lai', 'Tắt rồi... ba ngàn năm, ngọn đèn hầm mỏ tắt rồi.'], ['van_nguyet', 'Mỏ Tiên Giới đóng từ hôm nay. Nhưng ngươi đã trở thành kẻ Thiên Đình không thể lờ đi được nữa.']] }
        ],
        reward: { hours: 36, goldRefs: 200 }
    },
    {
        id: 'm16', act: 2, title: 'Nam Thiên Môn', unlock: 15, needs: [14, 2],
        steps: [
            { go: 'nam_thien_mon', say: [['narr', 'Đêm đổi gác, Tiên Quan mới của Lăng Tiêu tự tay mở chốt cổng. Thập vạn thiên binh dàn trận, sau lưng ngươi là tiên nô cầm cuốc.'], ['van_nguyet', 'Sổ thuế đã tới tay Tán Tiên Minh. Từ đêm nay ngươi không còn là người của triều đình nữa.']] },
            { hunt: { loc: 'nam_thien_mon', name: 'Thiên Binh', n: 6 } },
            { boss: 'nam_mon' }
        ],
        reward: { hours: 48, goldRefs: 250, gear: ['weapon', 3] }
    },
    {
        id: 'm17', act: 2, title: 'Ngai Vàng Lăng Tiêu', unlock: 16, needs: [15, 2],
        steps: [
            { go: 'lang_tieu', say: [['tien_de', 'Ngươi tưởng ta thích ngồi đây? Trên khế ước của ta có một cái tên không ai đọc được. Ta chỉ là kẻ thu thuế cho nó.']] },
            { boss: 'tien_de', say: [['tien_de', 'Giết ta thì chúng sẽ tìm kẻ khác. Đừng trách Lục Thánh, họ không thấy cái mỏ nào cả. Có thứ từ bên ngoài... đã che mắt họ. Muốn nói cho họ biết thì còn Lục Nguyên, Đại La, Chuẩn Thánh, ngươi còn xa lắm.'], ['narr', 'Sau ngai vàng, một phiến ngọc nứt ra. Bên kia là bóng cung điện tím.']] },
            { boss: 'nguyen_thuy_phan', say: [['nguyen_thuy', 'Tự tay giết Tiên Đế là trái thiên mệnh ta chép. Một phân thân là đủ dạy bảo kẻ vô lễ. Lên tới Chuẩn Thánh, gom đủ Hồng Mông Tử Khí rồi hãy nói chuyện.'], ['van_nguyet', 'Ngài ấy không giết ngươi. Vậy là ngươi đã bị để ý.']] }
        ],
        reward: { hours: 48, goldRefs: 300, gear: ['armor', 4] }
    },

    {
        id: 'm17a', act: 2, title: 'Lục Nguyên Quy Nhất', unlock: 17, needs: [16, 2],
        steps: [
            { go: 'dao_tri', say: [['dao_tri_mau', 'Thần Cảnh Lục Nguyên là sáu nguồn trong thân hợp lại. Ngồi xuống bên ao, đừng vội.']] },
            { gather: { loc: 'dao_tri', hours: 6, label: 'Hợp nhất Lục Nguyên' }, say: [['dao_tri_mau', 'Sáu dòng đã chảy về một. Từ đây ngươi không còn là tiên thường.']] }
        ],
        reward: { hours: 48, goldRefs: 320, gear: ['boots', 3] }
    },
    {
        id: 'm17b', act: 2, title: 'Đại La Vô Hạn', unlock: 18, needs: [17, 2],
        steps: [
            { go: 'nhan_giao', say: [['huyen_do', 'Đại La là lúc thời gian không còn lấy gì được của ngươi. Muốn bước qua thì nhìn thẳng vào nó.']] },
            { gather: { loc: 'nhan_giao', hours: 8, label: 'Quan sát dòng thời gian' }, say: [['huyen_do', 'Được. Từ nay Tiên Giới không còn ai ngang hàng ngươi, trừ những người không ở Tiên Giới.']] }
        ],
        reward: { hours: 60, goldRefs: 350, gear: ['helm', 3] }
    },
    {
        id: 'm17c', act: 2, title: 'Hồng Mông Tử Khí', unlock: 19, needs: [18, 2],
        steps: [
            { go: 'da_bao', say: [['da_bao', 'Đủ cả sáu phần Hồng Mông Tử Khí rồi chứ? Vậy thì đi đi. Cửa Thánh mở cho ai có tử khí, không mở cho ai có lý.']] },
            { gather: { loc: 'lang_tieu', hours: 8, label: 'Dẫn Tử Khí vào thân' }, say: [['narr', 'Sau ngai vàng, phiến ngọc nứt ra lần nữa. Lần này cung điện tím mở cửa.']] }
        ],
        reward: { flag: 'world_thanh', hours: 60, goldRefs: 400, gear: ['armor', 4] }
    },

    /* ===== HỒI III ===== */
    {
        id: 'm18', act: 3, title: 'Tử Tiêu Nghị Sự', needs: [19, 0],
        steps: [
            { go: 'tu_tieu', say: [['thai_thanh', 'Cả thế gian chỉ có sáu vị Thánh. Hôm nay là bảy. Ghế thứ bảy của ngươi đó.'], ['thong_thien', 'Ngồi đi nhóc, ghế không cắn đâu.'], ['me', 'Dưới Tiên Giới có mỏ, tiên nô bị đào đến chết. Các vị có biết không?'], ['nguyen_thuy', 'Mỏ nào? Thiên mệnh ta chép không có chữ đó. Ở đây chỉ nghị chính sự.']] },
            { go: 'van_tien', say: [['van_nguyet', 'Thánh Nhân mà vẫn về đây ăn cơm với bọn ta à?'], ['me', 'Trên đó sáu người không hề biết có mỏ. Họ không nói dối, họ thật sự không thấy.']] }
        ],
        reward: { hours: 24, goldRefs: 200, gear: ['ring', 3] }
    },
    {
        id: 'm19', act: 3, title: 'Vô Vi', unlock: 20, needs: [19, 2],
        steps: [
            { go: 'bat_canh', say: [['thai_thanh', 'Ngươi nói Tiên Giới có mỏ. Ta nhìn xuống chỉ thấy mây. Thắng được ta một ván thì ta nhìn lại lần nữa.']] },
            { boss: 'thai_thanh', say: [['thai_thanh', 'Ngươi thắng rồi. Thái Cực Đồ cho ngươi mượn.'], ['narr', 'Ngươi bước ra khỏi Bát Cảnh Cung, thấy mình mạnh lên thật. Chỉ có đồng tử quạt lò là cười rất khẽ.']] }
        ],
        reward: { hours: 48, goldRefs: 250, gear: ['helm', 3], relic: 'Thái Cực Đồ' }
    },
    {
        id: 'm20', act: 3, title: 'Thuận Thiên', unlock: 21, needs: [20, 2],
        steps: [
            { go: 'ngoc_hu', say: [['nguyen_thuy', 'Biết chuyện rồi thì đừng giả vờ nữa. Ta cũng không nhường hết như Thái Thanh đâu.']] },
            { boss: 'nguyen_thuy', say: [['nguyen_thuy', 'Sáu phần sức mà ngươi còn đứng. Ngươi không có trong thiên mệnh ta chép. Ai đã xóa tên ngươi?']] }
        ],
        reward: { hours: 48, goldRefs: 300, gear: ['amulet', 3] }
    },
    {
        id: 'm21', act: 3, title: 'Mở Rộng Thánh Giới', needs: [21, 0],
        steps: [
            { go: 'oa_hoang', say: [['nu_oa', 'Con đã là Đại Thánh, ngang hàng thật sự với sáu chúng ta. Thánh Giới chật rồi, tiên nhân dưới kia cũng không còn đường đi lên.'], ['me', 'Vậy thì mở rộng nó ra.'], ['nu_oa', 'Mở ra thì sẽ có thêm nhiều Thánh Nhân. Thánh không còn là thứ hiếm nữa, con chịu được không?']] },
            { gather: { loc: 'tu_tieu', hours: 8, label: 'Đẩy bờ Thánh Giới ra xa' }, say: [['narr', 'Vách Thánh Giới lùi ra ba ngàn dặm. Dưới Tiên Giới, những người đứng ở Chuẩn Thánh cả đời ngẩng đầu lên.']] }
        ],
        reward: { hours: 36, goldRefs: 300, statBless: 0.05 }
    },
    {
        id: 'm22', act: 3, title: 'Kiếm Hẹn', unlock: 22, needs: [21, 2],
        steps: [
            { go: 'bich_du', say: [['thong_thien', 'Lớn nhanh thật. Lần này ta dùng gần hết sức, đừng khóc.']] },
            { boss: 'thong_thien', say: [['thong_thien', 'Đã lắm! Viên mãn Đại Thánh rồi, ta nói được cho ngươi nghe. Tru Tiên Kiếm là của ngươi.'], ['thong_thien', 'Bọn ta là Đại Đạo Thánh Nhân. Trên bọn ta là cảnh giới Thiên, tên thật của nó là Đại Đạo Chí Thượng. Người dưới không biết, ai nghe qua cũng tưởng Chí Thượng chỉ là Thánh mạnh hơn một chút.'], ['me', 'Thật ra thì sao?'], ['thong_thien', 'Một người trong số họ thở ra, cả sáu chúng ta phải cúi đầu. Muốn bước vào thì mua đủ đồ cấp Thiên ở Tử Tiêu Thị đi.']] }
        ],
        reward: { hours: 48, goldRefs: 350, gear: ['weapon', 4], relic: 'Tru Tiên Kiếm' }
    },
    {
        id: 'm23', act: 3, title: 'Dưới Đài Sen', unlock: 23, needs: [22, 2],
        steps: [
            { go: 'tu_tieu', say: [['nguyen_thuy', 'Ta đã chép lại thiên mệnh từ đầu. Từ nay trong sổ có chữ mỏ, chữ tiên nô, và chữ Thiên Ma.'], ['thai_thanh', 'Ta không thích làm việc. Lần này ta làm.'], ['chuan_de', 'Tây Phương xin thôi đòi đất. Đất còn thì mới có người.'], ['nu_oa', 'Các con ăn gì chưa? Ăn rồi cùng ra trận.'], ['thong_thien', 'Lần đầu sáu kẻ này ngồi một bàn mà không cãi nhau. Nhóc, ngươi sắp Diệt Thiên, cầm đầu đi.'], ['me', 'Các vị giữ Thánh Giới. Xé xong tấm màn, ta ra ngoài thế giới tìm chúng.']] },
            { gather: { loc: 'tu_tieu', hours: 6, label: 'Chư Thánh hợp lực xé màn Thiên Ma' }, say: [['narr', 'Sáu đạo Thánh quang cùng rơi xuống Tiên Giới. Lần đầu sau ba ngàn năm, các Thánh thấy mỏ Vô Quang đúng như nó vốn có.'], ['tiep_dan', 'Giờ ta nghe thấy rồi. Tất cả.']] },
            { go: 'cuc_lac', say: [['chuan_de', 'Thiên Ma chui vào qua khe nứt dưới đài sen này. Ba ngàn năm bọn ta ngồi ngay trên nó mà không hay.'], ['tiep_dan', 'Lên Diệt Thiên mới bước được ra ngoài thế giới, ngoài đó là Thiên Ma Ngoại Vực. Chưa đủ sức thì ra là chết, muốn qua thì bước qua chúng ta.']] },
            { boss: 'chuan_tiep', say: [['tiep_dan', 'Thiên Ma mất mỏ Tiên Giới, chúng sẽ đòi lại. Ngươi vừa khiến bên ngoài kia đói.'], ['narr', 'Dưới đài sen là bóng tối không có sao.']] }
        ],
        reward: { flag: 'world_thien', hours: 60, goldRefs: 400, gear: ['armor', 4], boardSlot: true }
    },

    /* ===== HỒI IV ===== */
    {
        id: 'm24', act: 4, title: 'Xác Vạn Giới', unlock: 24, needs: [23, 0],
        steps: [
            { go: 'van_gioi', say: [['narr', 'Những lục địa khô trôi trong hư không. Trên mỗi xác thế giới đều có một cái mỏ.'], ['ly_khach', 'Mới tới Thiên Ma Ngoại Vực à? Đây là ngoài mép thế giới, nơi Lục Thánh chưa từng nhìn thấy. Mọi vũ trụ đều bị trồng rồi gặt. Ngoại Vực Thiên Ma đi trước, che mắt Thánh của vụ đó rồi đào cho cạn. Vũ trụ của ngươi là vụ thứ ba ngàn.']] },
            { hunt: { loc: 'van_gioi', name: 'Thiên Đạo Khôi Lỗi', n: 5 } },
            { boss: 'khoi_loi' }
        ],
        reward: { hours: 60, goldRefs: 400, gear: ['boots', 3] }
    },
    {
        id: 'm25', act: 4, title: 'Biển Kiếp Trước', unlock: 25, needs: [24, 2],
        steps: [
            { go: 'luan_hoi', say: [['ly_khach', 'Muốn phá Thiên Đạo thì phải biết nó đã giết ngươi bao nhiêu lần.']] },
            { boss: 'nghiep_long' },
            { gather: { loc: 'luan_hoi', hours: 8, label: 'Lặn qua các kiếp' }, say: [['narr', 'Ngươi thấy một kiếp cầm chổi. Một kiếp ngồi trên đài cao. Rồi lại một kiếp cầm chổi.']] }
        ],
        reward: { hours: 60, goldRefs: 450, gear: ['ring', 3] }
    },
    {
        id: 'm26', act: 4, title: 'Tâm Ma Vạn Kiếp', unlock: 26, needs: [25, 2],
        steps: [
            { go: 'luan_hoi', say: [['narr', 'Từ mặt biển, một kẻ giống ngươi bước lên, trên tay còn dính máu của ngươi.']] },
            { boss: 'tam_ma', say: [['tam_ma_say', 'Lần này ngươi đi xa hơn ta. Đừng dừng lại ở ngai vàng.']] }
        ],
        reward: { hours: 60, goldRefs: 500, gear: ['amulet', 3] }
    },
    {
        id: 'm27', act: 4, title: 'Khai Một Phương Trời', unlock: 27, needs: [26, 2],
        steps: [
            { go: 'khai_thien', say: [['ly_khach', 'Muốn đánh thắng Thiên Đạo, ngươi phải có trời của riêng mình.']] },
            { gather: { loc: 'khai_thien', hours: 10, label: 'Khai thiên lập địa' } },
            { boss: 'quy_tac', say: [['narr', 'Một vì sao nhỏ thắp lên trong thế giới vừa sinh của ngươi. Ở phàm giới, Tô Thanh Dao ngẩng đầu nhìn trời.']] }
        ],
        reward: { hours: 72, goldRefs: 600, gear: ['helm', 4] }
    },
    {
        id: 'm28', act: 4, title: 'Thần Đình', unlock: 28, needs: [27, 2],
        steps: [
            { go: 'than_dinh', say: [['narr', 'Một cỗ máy lớn hơn mọi tinh hà, quay bằng tiếng khóc đã được lọc sạch.']] },
            { hunt: { loc: 'than_dinh', name: 'Thiên Phạt Sứ', n: 6 } },
            { boss: 'than_dinh_ve' }
        ],
        reward: { hours: 72, goldRefs: 700, gear: ['weapon', 4] }
    },
    {
        id: 'm29', act: 4, title: 'Đạo Tổ', unlock: 29, needs: [28, 2],
        steps: [
            { go: 'than_dinh', say: [['dao_to', 'Ngươi đã viên mãn Sáng Thế, giờ mới được biết. Ta không tạo ra Thiên Đạo. Ta bị đặt ở đây để giữ nó. Bên ngoài nó là Hỗn Độn.'], ['me', 'Hỗn Độn là gì?'], ['dao_to', 'Cảnh giới mà không một Chí Thượng nào được phép biết tên. Thắng ta đi, rồi ra nhìn.']] },
            { boss: 'dao_to', say: [['dao_to', 'Cuối cùng cũng được nghỉ. Thiên Đạo từ nay không còn đòi mạng ai. Nhưng biên giới đã hở rồi, con ạ.']] }
        ],
        reward: { flag: 'world_hondon', hours: 96, goldRefs: 900, gear: ['armor', 4], boardSlot: true }
    },

    /* ===== HỒI V ===== */
    {
        id: 'm30', act: 5, title: 'Hạt Bụi', needs: [29, 0],
        steps: [
            { go: 'bo_hondon', say: [['narr', 'Vũ trụ của ngươi, nhìn từ đây, là một giọt nước trên phiến lá.'], ['vo_danh', 'A. Một giọt biết đi. Lâu rồi mới thấy. Để ta thử xem ngươi cứng tới đâu.']] },
            { boss: 'dao_gia_thu', say: [['vo_danh', 'Ta dùng một phần mười vạn sức, và ngươi còn đứng. Đến am của ta.']] }
        ],
        reward: { hours: 48, goldRefs: 500 }
    },
    {
        id: 'm31', act: 5, title: 'Am Cỏ', needs: [29, 1],
        steps: [
            { go: 'dao_gia_am', say: [['vong_ky', 'Hỗn Độn Đạo Giả không có môn phái. Mỗi người tự thành một con đường. Đạo Giả không dùng đồ, vì chính họ là đồ. Trang bị của ngươi từ đây chỉ còn là phụ.']] },
            { gather: { loc: 'dao_gia_am', hours: 12, label: 'Nghe đạo' } },
            { go: 'ma_than_mo', say: [['vo_danh', 'Lũ Ma Thần lại thức. Chúng sinh ra trước mọi Đạo, chúng ghét mọi thứ có trật tự.']] },
            { boss: 'ma_than' }
        ],
        reward: { hours: 96, goldRefs: 800, gear: ['ring', 4] }
    },
    {
        id: 'm32', act: 5, title: 'Luận Đạo', needs: [29, 2],
        steps: [
            { go: 'dao_gia_am', say: [['vong_ky', 'Muốn qua Hải Tâm, phải thắng một Đạo Giả. Ta trước.']] },
            { boss: 'vong_ky', say: [['vong_ky', 'Đạo của ngươi tên gì?'], ['me', 'Chưa có tên.'], ['vong_ky', 'Tốt. Ai có tên rồi thì đã dừng lại.']] }
        ],
        reward: { hours: 96, goldRefs: 800, gear: ['amulet', 4] }
    },
    {
        id: 'm33', act: 5, title: 'Hải Tâm', unlock: 30, needs: [29, 2],
        steps: [
            { go: 'hai_tam', say: [['vo_danh', 'Bên trên chúng ta không còn cảnh giới nào. Sáu người ngồi đây, không ai đi tiếp được. Thắng ta rồi nói chuyện.']] },
            { boss: 'vo_danh', say: [['vo_danh', 'Hay. Viên mãn Hỗn Độn rồi, không còn đường nào có sẵn nữa. Muốn đi tiếp thì tự mà làm ra đường.'], ['narr', 'Ngươi ngồi xuống giữa Hải Tâm và tự sáng tạo một cảnh giới chưa từng có. Ngươi đặt tên nó là Hồng Mông Chúa Tể.']] }
        ],
        reward: { flag: 'world_hongmong', hours: 120, goldRefs: 1000 }
    },

    /* ===== HỒI VI ===== */
    {
        id: 'm34', act: 6, title: 'Tử Khí', needs: [30, 0],
        steps: [
            { go: 'tu_khi', say: [['narr', 'Cõi này do chính ngươi tạo ra. Không trời, không đất, không một ai. Chỉ có một màu tím đang chờ ngươi nghĩ.']] },
            { go: 'dao_gia_am', say: [['vong_ky', 'Bên trên có gì?'], ['me', 'Không có ai.'], ['vong_ky', 'Vậy ngươi xuống đây làm gì?'], ['me', 'Giao việc. Giữ Ma Thần trong mộ, đừng để chúng ra Hải Tâm.']] }
        ],
        reward: { hours: 96, goldRefs: 800 }
    },
    {
        id: 'm35', act: 6, title: 'Lời Dặn Xuống Dưới', needs: [30, 1],
        steps: [
            { go: 'co_thu', say: [['narr', 'Ngươi trồng một cái cây để có chỗ ngồi. Cây lớn nhanh hơn ý nghĩ, và không có ai dưới bóng nó.']] },
            { go: 'vo_cuong', say: [['ly_khach', 'Ngươi trên kia về à? Có gì ăn không?'], ['me', 'Không. Lão trông coi Thiên Ma Ngoại Vực giúp ta, đừng để ai dựng mỏ nữa.'], ['ly_khach', 'Ghi sổ.']] },
            { go: 'tu_tieu', say: [['thai_thanh', 'Ngươi tới, cả Thánh Giới không ai dám thở.'], ['me', 'Mỏ đóng hẳn. Lục Thánh lo việc của Thánh Giới, đừng đợi ta ra lệnh nữa.']] }
        ],
        reward: { hours: 120, goldRefs: 1000, statBless: 0.05 }
    },
    {
        id: 'm36', act: 6, title: 'Chúa Tể Tọa', unlock: 31, needs: [30, 2],
        steps: [
            { go: 'chua_te', say: [['narr', 'Ngươi dựng một chiếc ngai, ngồi thử rồi đứng dậy. Ở đây không có ai để làm chúa tể của.']] },
            { gather: { loc: 'chua_te', hours: 12, label: 'Sáng tạo cảnh giới cuối cùng' }, say: [['narr', 'Ngươi vẽ thêm một cảnh giới phía trên chiếc ngai trống và gọi nó là Chung Nguyên Chí Cao. Sau đó không còn gì để vẽ.']] }
        ],
        reward: { flag: 'world_chungnguyen', hours: 144, goldRefs: 1200 }
    },

    /* ===== HỒI VII ===== */
    {
        id: 'm37', act: 7, title: 'Trường Hà Tận Cùng', needs: [31, 0],
        steps: [
            { go: 'truong_ha', say: [['narr', 'Dòng thời gian đổ xuống hư vô như một thác nước im lặng. Trong nước là mọi kiếp của ngươi. Trên bờ không có ai.']] },
            { go: 'thanh_van', say: [['to_dao', 'Đệ về rồi à? Cao đến đâu rồi?'], ['me', 'Hết trời rồi, tỷ.'], ['to_dao', 'Vậy thì ăn cơm đi. Trên đó chắc không có ai nấu.']] }
        ],
        reward: { hours: 144, goldRefs: 1200 }
    },
    {
        id: 'm38', act: 7, title: 'Người Quét Lá', needs: [31, 2],
        steps: [
            { go: 'chung_dai', say: [['narr', 'Trên Chung Nguyên Đài có một chiếc ghế trống, cạnh ghế dựng một cây chổi cũ. Ngươi nhận ra cây chổi đó.']] },
            { go: 'thanh_thuy', say: [['mac', 'Con đến rồi. Lá hôm nay nhiều quá, ta quét mãi không xong.'], ['me', 'Chiếc ghế trên đó là của lão.'], ['mac', 'Cũng là của con. Kiếp trước con cũng tự vẽ ra cảnh giới ấy, ngồi xuống rồi thấy cô đơn quá, nên quay về đây quét lá, đợi một đứa trẻ giống mình.'], ['mac', 'Giờ cầm chổi hay ngồi ghế, con là người chọn.']] }
        ],
        reward: { ending: true, hours: 0, goldRefs: 0 }
    },
    {
        id: 'm39', act: 7, title: 'Chúng Sinh Khiêu Chiến', needs: [31, 3], needsEnding: 'ngoi',
        steps: [
            { go: 'chung_dai', say: [['narr', 'Ngươi vừa ngồi xuống, Chung Nguyên Giới bắt đầu nuốt các Giới bên dưới. Hồng Mông, Hỗn Độn, Thiên Ma Ngoại Vực lần lượt mờ đi.'], ['narr', 'Những kẻ đã sáng tạo ra các Giới ấy không chịu ngồi yên. Sáu Đạo Giả bước lên Đài, phía sau họ là tất cả chúng sinh.']] },
            { boss: 'cs_1', say: [['vong_ky', 'Am của ta không còn gì để ai bỏ quên nữa. Ta thua, người sau đến.']] },
            { boss: 'cs_2', say: [['vo_danh', 'Ta từng nói bên trên không còn cảnh giới nào. Ngươi vẽ thêm một cái, rồi nuốt hết cả phần dưới.']] },
            { boss: 'cs_3', say: [['thich_thien', 'Ta thích hết bao nhiêu vũ trụ, chưa từng bị thứ gì thích lại. Hóa ra là cảm giác này.']] },
            { boss: 'cs_4', say: [['am_duong', 'Áo ta dính bụi rồi. Mọi thứ đều diệt, kể cả ta.']] },
            { boss: 'cs_5', say: [['hd_vo_thuc', 'Ta quyết định rồi. Ta tồn tại, để đứng đây thua ngươi.']] },
            { boss: 'cs_6', say: [['hd_thu_cuu', 'Con ta vừa chọn tồn tại, không ai được nuốt nó. Đứng lên đi, chưa xong đâu.']] },
            { boss: 'cs_7', say: [['hd_thu_cuu', 'Hai cha con cũng không cản được. Hỗn Độn thứ mười sẽ không có nữa.']] },
            { boss: 'cs_8', say: [['am_duong', 'Diệt cộng với diệt vẫn chưa đủ diệt ngươi.'], ['thich_thien', 'Vậy thì gọi tất cả.']] },
            { boss: 'cs_9', say: [['narr', 'Sáu Đạo Giả ngã xuống quanh Đài. Từ bên dưới vang lên một âm thanh ngươi đã nghe từ thuở mười tuổi: tiếng của tất cả mọi người.']] },
            { boss: 'cs_10', say: [['narr', 'Tất cả chúng sinh dừng lại. Không ai thắng, chỉ còn ngươi ngồi đó.'], ['narr', 'Ngươi nhả các Giới ra, trả lại từng ngọn núi, từng chiếc lá. Ở Thanh Thủy Thôn, lá lại rụng đầy sân.']] }
        ],
        reward: { hours: 0, goldRefs: 0 }
    },
    {
        id: 'm40', act: 7, title: 'Đại Kết Cục', needs: [31, 3], needsEnding: 'ngoi',
        steps: [
            { go: 'chung_dai', say: [['narr', 'Các Giới đã trở về chỗ cũ, nhưng ngươi vẫn chưa xong. Còn một thứ chưa từng thua ngươi, vì nó chưa từng rời khỏi ngươi.']] },
            { gather: { loc: 'chung_dai', hours: 12, label: 'Dung hợp vạn giới vào một thân' }, say: [['narr', 'Hỗn Độn, Hồng Mông, Chung Nguyên và mọi đạo ngươi từng đi qua tan vào nhau. Khi không còn gì tách biệt, Chung Nguyên Đài biến mất dưới chân ngươi.'], ['narr', 'Trang bị trên người ngươi run lên. Từng món một tách khỏi thân, đứng dậy, quay lại nhìn ngươi.']] },
            { boss: 'hv_gear', say: [['narr', 'Món cuối rơi xuống. Trên người ngươi giờ chỉ còn Hư Vô.'], ['narr', 'Trận pháp của ngươi nứt ra. Từng món pháp bảo đã theo ngươi từ thuở mười tuổi lần lượt rời ô, và lần đầu tiên chúng chĩa về phía ngươi.']] },
            { boss: 'hv_lb', say: [['narr', 'Trận pháp trống rỗng được lấp đầy bằng Chung Nguyên Chí Cao Chi Lực.'], ['narr', 'Những gì đã rời khỏi ngươi tụ lại quanh một người. Người đó mang lục đạo của con người và một cái tên ngươi biết rõ.'], ['narr', 'Tên của ngươi không còn là của ngươi nữa. Muốn giữ danh Hư Vô Chi Chủ, ngươi phải thắng trận này.']] },
            { boss: 'hu_vo', say: [['narr', 'Không có ai ngã xuống. Người đó chỉ mỉm cười rồi tan đi, và Hư Vô mở ra.'], ['narr', 'Từ đây không còn cảnh giới nào phía trên, không còn con đường nào phía trước. Chỉ còn ngươi, và tất cả những gì ngươi muốn làm.']] }
        ],
        reward: { finalRealm: true, hours: 0, goldRefs: 0 }
    }
];

const ENDINGS = [
    { id: 'ngoi', text: '🪑 Ngồi xuống Chung Nguyên Đài', lines: ['Ngươi ngồi xuống. Vạn đạo im lặng. Ở một ngôi làng nhỏ, một lão già mới xuất hiện và bắt đầu quét lá.', 'Vòng lặp tiếp tục. Lần này, ngươi là người đợi.'] },
    { id: 'pha', text: '🔨 Đập vỡ Đài, chấm dứt vòng lặp', lines: ['Ngươi đập vỡ Chung Nguyên Đài. Trường Hà tràn bờ, không còn điểm kết nào nữa.', 'Không ai ngồi trên đạo. Không còn mỏ, không còn gặt. Vũ trụ phải tự học cách sống.'] },
    { id: 've', text: '🏡 Bỏ tất cả, về Thanh Thủy Thôn', lines: ['Ngươi đặt gậy xuống, đi bộ về nhà. Mất đúng ba năm.', 'Tô Thanh Dao đứng ở cổng Thanh Vân, tóc đã bạc: "Thư của đệ đâu?"', 'Ngươi cầm chổi, quét sạch sân. Mặt trời mọc đúng như Bàn Cổ mong đợi.'] }
];

const SIDE_QUESTS = [
    { id: 's_thuoc', loc: 'thanh_thuy', npc: 'thuy_ba', title: 'Thảo Dược Cho Làng', needs: [1, 0], steps: [{ gather: { loc: 'vu_moc_lam', hours: 2, label: 'Hái linh thảo' } }, { go: 'thanh_thuy', say: [['thuy_ba', 'Con vẫn nhớ đường về. Cầm lấy, gói bánh và chút bạc của làng.']] }], reward: { hours: 4, goldRefs: 8 } },
    { id: 's_khoi', loc: 'thanh_van', npc: 'to_dao', title: 'Luyện Kiếm Cùng Sư Tỷ', needs: [1, 0], steps: [{ hunt: { loc: 'thanh_van', name: 'Khôi Lỗi Thí Luyện', n: 5 }, say: [['to_dao', 'Khá hơn rồi. Cái này ta giữ từ hồi Trúc Cơ, cho đệ.']] }], reward: { hours: 8, goldRefs: 10, gear: ['amulet', 1] } },
    { id: 's_bang', loc: 'bang_phong', npc: 'han_bang', title: 'Băng Hồn Không Yên', needs: [5, 0], steps: [{ hunt: { loc: 'bang_phong', name: 'Băng Hồn', n: 6 }, say: [['han_bang', 'Họ từng là đệ tử của ta. Cảm ơn ngươi đã tiễn họ.']] }], reward: { hours: 12, goldRefs: 20, gear: ['boots', 2] } },
    { id: 's_thu', loc: 'van_tien', npc: 'van_nguyet', title: 'Thư Về Phàm Giới', needs: [10, 0], steps: [{ gather: { loc: 'thien_ha', hours: 4, label: 'Tìm khe truyền âm' }, say: [['to_dao', '(Giọng nói vọng từ rất xa) Đệ còn sống là được rồi. Thanh Vân vẫn còn lửa.']] }], reward: { hours: 16, goldRefs: 30, statBless: 0.02 } },
    { id: 's_cho', loc: 'da_bao', npc: 'da_bao', title: 'Món Nợ Của Đa Bảo', needs: [18, 1], steps: [{ hunt: { loc: 'da_bao', name: 'Thánh Giới Đạo Tặc', n: 6 }, say: [['da_bao', 'Làm ăn phải sòng phẳng. Đây là phần của ngươi.']] }], reward: { hours: 24, goldRefs: 80, gear: ['ring', 3] } },
    { id: 's_quan', loc: 'vo_cuong', npc: 'ly_khach', title: 'Bữa Cơm Ở Vô Cương', needs: [25, 0], steps: [{ hunt: { loc: 'khai_thien', name: 'Hư Không Thú', n: 6 }, say: [['ly_khach', 'Thịt dai, nhưng ít ra là thật. Ngồi xuống ăn đi.']] }], reward: { hours: 36, goldRefs: 100, statBless: 0.02 } },
];

/* Chủng tộc: chọn lúc tạo nhân vật cùng hệ tu đầu tiên, cố định cả đời; Yêu tộc luôn có xuất thân yeu */
const RACES = {
    nhan: { name: 'Nhân tộc', icon: '🧑', desc: 'Tu vi nhanh hơn 10%. Xuất thân theo linh căn.', xp: 1.1, hp: 1, def: 1 },
    yeu: { name: 'Yêu tộc', icon: '🐾', desc: 'HP +10%, phòng thủ +5%. Bắt đầu ở Vạn Thú Sơn.', xp: 1, hp: 1.1, def: 1.05 }
};

function raceOf() {
    return RACES[state.race] || RACES.nhan;
}

/* Xuất thân: nơi bắt đầu, hệ tu đầu tiên và chương mở đầu riêng; tất cả hội tụ tại Thanh Vân Tông */
const ORIGINS = {
    thuy: { name: 'Đứa trẻ Thanh Thủy Thôn', loc: 'thanh_thuy', path: 'phap' },
    kim: {
        name: 'Kiếm đồng giữ mộ', loc: 'kiem_trung', path: 'kiem', title: 'Kẻ Lau Kiếm',
        boss: { id: 'kiem_no_truong', name: 'Kiếm Nô Trưởng', look: NPC_LOOK('m', 4, '#c9c9d6', '#55524a', { weapon: 'sword', weaponColor: '#b8c0c8' }) },
        steps: [
            { go: 'kiem_trung', say: [['narr', 'Ngươi lớn lên giữa ba ngàn thanh kiếm cắm trên mộ, công việc mỗi ngày là lau sạch rỉ sét.'], ['narr', 'Đêm nay những thanh kiếm rung lên. Có kiếm hồn đã thức.']] },
            { hunt: { loc: 'kiem_trung', name: 'Kiếm Hồn', n: 2 }, say: [['mac', 'Lão đi ngang quét lá thôi. Ngươi cầm kiếm như cầm chổi, thế mà lại đúng.']] },
            { boss: 'kiem_no_truong', say: [['mac', 'Kiếm Trủng không giữ được ngươi nữa. Đến Thanh Vân Tông đi, nói là Lão Mặc giới thiệu.']] }
        ]
    },
    moc: {
        name: 'Đứa trẻ thú nuôi', loc: 'van_thu', path: 'dan', title: 'Tiếng Gầm Trên Vạn Thú Sơn',
        boss: { id: 'ho_vuong', kind: 'beast', name: 'Bạch Ngạch Hổ Vương' },
        steps: [
            { go: 'van_thu', say: [['narr', 'Một con sói cái nhặt ngươi về từ xác đoàn thương nhân. Ngươi biết gầm trước khi biết nói.']] },
            { hunt: { loc: 'van_thu', name: 'Hổ Yêu', n: 2 }, say: [['narr', 'Bầy hổ tràn qua lãnh địa. Mẹ sói của ngươi không trở về nữa.']] },
            { boss: 'ho_vuong', say: [['mac', 'Một đứa bé cắn chết hổ vương. Thú rừng không dạy được ngươi điều tiếp theo. Xuống núi, tìm Thanh Vân Tông.']] }
        ]
    },
    hoa: {
        name: 'Huyết nô bỏ trốn', loc: 'huyet_sat', path: 'ma', title: 'Đêm Vỡ Xiềng',
        boss: { id: 'huyet_do', name: 'Huyết Đồ Quản Sự', look: NPC_LOOK('m', 4, '#7a1f2b', '#2b2b35', { weapon: 'spear', weaponColor: '#a8342a', eyes: '#a8342a' }) },
        steps: [
            { go: 'huyet_sat', say: [['narr', 'Huyết Sát Giáo trích máu ngươi từ năm năm tuổi. Máu ngươi mang hỏa linh căn, nên ngươi được sống lâu hơn những đứa khác.']] },
            { hunt: { loc: 'huyet_sat', name: 'Huyết Nô Vệ', n: 2 }, say: [['narr', 'Xiềng đứt. Thứ công pháp ngươi trộm nghe qua vách đá đang nóng lên trong mạch máu.']] },
            { boss: 'huyet_do', say: [['mac', 'Công pháp tà, nhưng tay ngươi không run. Thanh Vân Tông sẽ không hỏi ngươi từ đâu đến nếu ngươi không nói.']] }
        ]
    },
    yeu: {
        name: 'Yêu thú khai linh trí', loc: 'van_thu', path: 'yeu', title: 'Khai Linh',
        boss: { id: 'lang_vuong', kind: 'beast', name: 'Xích Nhãn Lang Vương' },
        steps: [
            { go: 'van_thu', say: [['narr', 'Ngươi vốn là một con yêu thú trên Vạn Thú Sơn. Một đêm trăng tròn, linh trí bừng mở và ngươi nhớ được cái tên {name}.']] },
            { hunt: { loc: 'van_thu', name: 'Yêu Lang', n: 2 }, say: [['narr', 'Bầy sói không còn nhận ra ngươi. Kẻ biết suy nghĩ thì không thuộc về bầy nữa.']] },
            { boss: 'lang_vuong', say: [['mac', 'Thân yêu mà tâm biết nghĩ, hiếm đấy. Hóa hình đi rồi tới Thanh Vân Tông, lão sẽ không nói ngươi từ đâu đến.']] }
        ]
    },
    tho: {
        name: 'Con trai thợ mỏ', loc: 'thiet_cot', path: 'the', title: 'Sập Hầm',
        boss: { id: 'quang_vuong', kind: 'golem', name: 'Quặng Khôi Vương' },
        steps: [
            { go: 'thiet_cot', say: [['narr', 'Cha ngươi đào quặng cho Thiết Cốt Môn. Ngươi vác đá từ khi vai còn chưa rộng bằng cái giỏ.'], ['narr', 'Hôm nay hầm sập, và thứ dưới đáy hầm đang bò lên.']] },
            { hunt: { loc: 'thiet_cot', name: 'Quặng Khôi', n: 2 } },
            { boss: 'quang_vuong', say: [['mac', 'Tay không đập vỡ khôi lỗi. Ngươi không cần pháp bảo để sống, nhưng cần thầy. Tới Thanh Vân Tông.']] }
        ]
    },
    phap: {
        name: 'Thiên tài thế gia', loc: 'huyen_phap', path: 'phap', title: 'Bài Thi Cuối',
        boss: { id: 'tham_giao', name: 'Thẩm Giáo Tập', look: NPC_LOOK('m', 0, '#c9c9d6', '#6b4a8f', { weapon: 'staff', weaponColor: '#d59bff', beard: true }) },
        steps: [
            { go: 'huyen_phap', say: [['narr', 'Sinh ra đã mang linh căn hiếm, ngươi được gửi vào Huyền Pháp Các với ba mươi người hầu. Không ai dám đánh thật với ngươi.']] },
            { hunt: { loc: 'huyen_phap', name: 'Thí Pháp Khôi Lỗi', n: 2 } },
            { boss: 'tham_giao', say: [['mac', 'Lão quét sân ở đây ba mươi năm rồi. Đây là lần đầu có đứa thắng thật. Muốn biết mình giỏi thật không thì đến Thanh Vân Tông, nơi không ai biết họ của ngươi.']] }
        ]
    }
};

function originFor(root) {
    if ((root?.rank || 0) >= 6) return 'phap';
    return { Kim: 'kim', 'Mộc': 'moc', 'Thủy': 'thuy', 'Hỏa': 'hoa', 'Thổ': 'tho' }[root?.elements?.[0]] || 'thuy';
}

Object.values(ORIGINS).forEach(o => {
    if (!o.boss) return;
    const { id, ...def } = o.boss;
    BOSSES[id] = def.look ? { npc: { name: def.name, look: def.look }, realm: 0, stage: 1 } : { kind: def.kind, name: def.name, realm: 0, stage: 1 };
});

Object.assign(BOSSES.thong_thien, { path: 'kiem' });
Object.assign(BOSSES.kiem_khi, { path: 'kiem' });
Object.assign(BOSSES.thai_thanh, { path: 'phap' });
Object.assign(BOSSES.nguyen_thuy, { path: 'phap' });
Object.assign(BOSSES.nguyen_thuy_phan, { path: 'phap' });
Object.assign(BOSSES.chuan_tiep, { path: 'the' });
Object.assign(BOSSES.ma_quan, { path: 'ma', adds: { name: 'Vực Ma', kind: 'demon', n: 2 } });
Object.assign(BOSSES.lang_phong_2, { path: 'ma' });
Object.assign(BOSSES.nam_mon, { adds: { name: 'Thiên Binh', kind: 'human', n: 3 } });
Object.assign(BOSSES.tien_de, { path: 'kiem', adds: { name: 'Kim Giáp Tiên Tướng', kind: 'human', n: 2 } });
Object.assign(BOSSES.than_dinh_ve, { adds: { name: 'Thiên Phạt Sứ', kind: 'golem', n: 2 } });

const QUEST_INDEX = [...MAIN_QUESTS, ...SIDE_QUESTS].reduce((m, q) => (m[q.id] = q, m), {});
