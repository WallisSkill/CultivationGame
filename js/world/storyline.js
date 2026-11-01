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
    { id: 2, name: 'Hồi II — Tiên Lộ Là Mỏ', desc: 'Phi thăng không phải giải thoát.' },
    { id: 3, name: 'Hồi III — Lục Thánh', desc: 'Va chạm với những kẻ viết ra luật trời.' },
    { id: 4, name: 'Hồi IV — Ngoài Thiên Đạo', desc: 'Thánh Nhân chỉ là chấp sự. Ai là chủ?' },
    { id: 5, name: 'Hồi V — Hỗn Độn Đạo Giả', desc: 'Bên ngoài vũ trụ có những kẻ xem vũ trụ như hạt bụi.' },
    { id: 6, name: 'Hồi VI — Hồng Mông', desc: 'Nơi Đạo được sinh ra.' },
    { id: 7, name: 'Hồi VII — Chung Nguyên', desc: 'Điểm kết. Người đang ngồi đợi ngươi.' }
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
    da_bao: { name: 'Đa Bảo Đạo Nhân', title: 'Chủ Đa Bảo Thị', look: NPC_LOOK('m', 5, '#1b1b22', '#b5832e', { weapon: 'orb', weaponColor: '#ffc14d' }) },
    thai_thanh: { name: 'Thái Thanh Thánh Nhân', title: 'Đại sư huynh Tam Thanh', look: NPC_LOOK('m', 0, '#f0e6c8', '#e8e4d8', { beard: true, crown: 'halo', crownColor: '#ffe9a0', aura: '#ffe9a0', weapon: 'fan', weaponColor: '#e8e4d8' }) },
    nguyen_thuy: { name: 'Nguyên Thủy Thiên Tôn', title: 'Giáo chủ Xiển Giáo', look: NPC_LOOK('m', 0, '#1b1b22', '#d9d4c5', { beard: true, crown: 'halo', crownColor: '#ffe9a0', aura: '#fff3c4', weapon: 'staff', weaponColor: '#ffd479' }) },
    thong_thien: { name: 'Thông Thiên Giáo Chủ', title: 'Giáo chủ Tiệt Giáo', look: NPC_LOOK('m', 1, '#1b1b22', '#2b2b35', { crown: 'halo', crownColor: '#ff6b6b', aura: '#ff8a4c', weapon: 'sword', weaponColor: '#ff6b6b' }) },
    nu_oa: { name: 'Nữ Oa Nương Nương', title: 'Mẹ của muôn loài', look: NPC_LOOK('f', 1, '#1b1b22', '#3e7d5a', { crown: 'halo', crownColor: '#7be4a3', aura: '#7be4a3', weapon: 'orb', weaponColor: '#7be4a3' }) },
    chuan_de: { name: 'Chuẩn Đề Đạo Nhân', title: 'Thánh Nhân Tây Phương', look: NPC_LOOK('m', 5, '#1b1b22', '#b5832e', { crown: 'wheel', crownColor: '#ffd479', aura: '#ffd479' }) },
    tiep_dan: { name: 'Tiếp Dẫn Đạo Nhân', title: 'Thánh Nhân Tây Phương', look: NPC_LOOK('m', 5, '#1b1b22', '#d9a520', { crown: 'wheel', crownColor: '#ffd479', aura: '#ffd479', weapon: 'staff', weaponColor: '#ffd479' }) },
    dao_to: { name: 'Đạo Tổ', title: 'Người giữ Thiên Đạo', look: NPC_LOOK('m', 0, '#ffffff', '#5a3a9e', { beard: true, crown: 'wheel', crownColor: '#c58bff', aura: '#c58bff', eyes: '#8a4fc0' }) },
    ly_khach: { name: 'Lữ Khách Vô Cương', title: 'Chủ quán', look: NPC_LOOK('m', 4, '#8b5a2b', '#55524a', { weapon: 'staff', weaponColor: '#8a7a55' }) },
    vo_danh: { name: 'Vô Danh Đạo Giả', title: 'Hỗn Độn Đạo Giả', look: NPC_LOOK('m', 1, '#5fe6e6', '#13525c', { aura: '#5fe6e6', crown: 'wheel', crownColor: '#5fe6e6', eyes: '#2f8f5a' }) },
    vong_ky: { name: 'Vọng Kỷ Đạo Giả', title: 'Hỗn Độn Đạo Giả', look: NPC_LOOK('f', 1, '#e9eef7', '#13525c', { aura: '#5fe6e6', eyes: '#2a5fa8', weapon: 'orb', weaponColor: '#5fe6e6' }) },
    ma_than: { name: 'Ma Thần Thiên Ngô', kind: 'chaos', realm: 26 },
    ban_co: { name: 'Bàn Cổ Tàn Niệm', title: 'Người khai thiên đầu tiên', look: NPC_LOOK('m', 4, '#7a1f2b', '#2b2b35', { aura: '#ff8a4c', weapon: 'spear', weaponColor: '#ff8a4c', beard: true, skin: '#d9a273' }) },
    hong_mong: { name: 'Hồng Mông Chúa Tể', title: 'Kẻ ngồi trên Đạo', look: NPC_LOOK('f', 1, '#ff8ad8', '#7a1f6a', { aura: '#ff8ad8', crown: 'wheel', crownColor: '#ff8ad8', eyes: '#a8342a' }) },
    chung_nguyen: { name: 'Chung Nguyên Chí Cao', title: 'Điểm kết', look: NPC_LOOK('m', 0, '#c9c9d6', '#f2f2f2', { beard: true, aura: '#ffffff', crown: 'wheel', crownColor: '#ffffff', weapon: 'staff', weaponColor: '#ffffff' }) }
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
    kiem_khi: { npc: 'thong_thien', realm: 18, stage: 2, scale: 3, scriptedLoss: true, board: 5 },
    cu_linh: { kind: 'golem', name: 'Cự Linh Thần Tướng', realm: 12, stage: 2 },
    than_ha: { npc: { name: 'Thiên Bồng Nguyên Soái', look: NPC_LOOK('m', 4, '#1b1b22', '#2f5f9e', { weapon: 'spear', weaponColor: '#9fd3ff' }) }, realm: 13, stage: 2 },
    nam_mon: { npc: { name: 'Tăng Trưởng Thiên Vương', look: NPC_LOOK('m', 0, '#1b1b22', '#8c3a3a', { weapon: 'spear', weaponColor: '#ffd479', crown: 'guan' }) }, realm: 14, stage: 2, board: 4 },
    tien_de: { npc: 'tien_de', realm: 15, stage: 2, board: 5, scale: 1.1 },
    nguyen_thuy_phan: { npc: 'nguyen_thuy', realm: 19, stage: 2, scale: 3, scriptedLoss: true, board: 5 },
    thai_thanh: { npc: 'thai_thanh', realm: 16, stage: 2, board: 5, elements: SAINT_ELEMENTS },
    nguyen_thuy: { npc: 'nguyen_thuy', realm: 17, stage: 2, board: 5, elements: SAINT_ELEMENTS },
    thong_thien: { npc: 'thong_thien', realm: 18, stage: 2, board: 5, elements: SAINT_ELEMENTS },
    chuan_tiep: { npc: 'chuan_de', realm: 19, stage: 2, board: 6, elements: SAINT_ELEMENTS },
    nu_oa_thu: { npc: 'nu_oa', realm: 18, stage: 2, board: 5, elements: SAINT_ELEMENTS },
    khoi_loi: { kind: 'golem', name: 'Thiên Đạo Chấp Hành Thể', realm: 20, stage: 2, board: 4 },
    nghiep_long: { kind: 'dragon', name: 'Vạn Kiếp Nghiệp Long', realm: 21, stage: 2, board: 4 },
    tam_ma: { npc: { name: 'Ngươi Của Kiếp Trước', look: NPC_LOOK('m', 1, '#c9c9d6', '#2b2b35', { aura: '#c58bff' }) }, realm: 22, stage: 2, board: 5 },
    quy_tac: { kind: 'chaos', name: 'Thiên Phạt Quy Tắc Thể', realm: 23, stage: 2, board: 5 },
    than_dinh_ve: { kind: 'golem', name: 'Thần Đình Đại Hộ Vệ', realm: 24, stage: 2, board: 5 },
    dao_to: { npc: 'dao_to', realm: 25, stage: 2, board: 6, scale: 1.1, elements: SAINT_ELEMENTS },
    dao_gia_thu: { npc: 'vo_danh', realm: 26, stage: 0, scale: 3, scriptedLoss: true, board: 6 },
    ma_than: { kind: 'chaos', name: 'Ma Thần Thiên Ngô', realm: 26, stage: 2, board: 5 },
    vong_ky: { npc: 'vong_ky', realm: 26, stage: 2, board: 6, scale: 1.05 },
    vo_danh: { npc: 'vo_danh', realm: 26, stage: 3, board: 6, scale: 1.1 },
    tu_khi_linh: { kind: 'spirit', name: 'Tử Khí Bản Nguyên', realm: 27, stage: 1, board: 5 },
    ban_co: { npc: 'ban_co', realm: 27, stage: 2, board: 6 },
    hong_mong: { npc: 'hong_mong', realm: 27, stage: 3, board: 6, scale: 1.1 },
    du_anh: { kind: 'spirit', name: 'Vạn Kiếp Dư Ảnh', realm: 28, stage: 1, board: 6 },
    chung_nguyen: { npc: 'chung_nguyen', realm: 28, stage: 3, board: 6, scale: 1.15 }
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
            { go: 'phi_thang_tri', say: [['narr', 'Không có tiên nhạc. Chỉ có xiềng xích và một chiếc bàn kiểm kê.'], ['tien_lai', 'Lại một đứa nữa. Đừng chống cự, chúng sẽ chuyển ngươi xuống mỏ thôi.']] },
            { go: 'tien_khoang', say: [['tien_lai', 'Ba ngàn năm rồi, ta đào linh tủy cho Thiên Đình. Kẻ phi thăng là đồng tiền của họ đó con.']] },
            { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 4 } },
            { boss: 'doc_cong', say: [['tien_lai', 'Ngươi... đánh chết đốc công? Đi đi. Vạn Tiên Thành có người muốn gặp kẻ như ngươi.'], ['narr', 'Lời của Cửu U Ma Quân vang lên trong đầu ngươi.']] }
        ],
        reward: { hours: 24, goldRefs: 100, gear: ['ring', 3] }
    },
    {
        id: 'm12', act: 2, title: 'Tán Tiên Minh', unlock: 11, needs: [10, 2],
        steps: [
            { go: 'van_tien', say: [['van_nguyet', 'Tán Tiên Minh không có lý tưởng. Chúng ta chỉ không muốn bị đào đến chết. Chứng minh ngươi có ích đi.']] },
            { boss: 'thien_tuong', say: [['van_nguyet', 'Sổ của tên giám sát này ghi rõ: linh tủy Tiên Giới không về Thiên Đình. Nó chảy lên Thánh Vực.']] }
        ],
        reward: { hours: 24, goldRefs: 120, gear: ['boots', 3] }
    },
    {
        id: 'm13', act: 2, title: 'Kiếm Khí Từ Trời', unlock: 12, needs: [11, 2],
        steps: [
            { go: 'thien_ha', say: [['van_nguyet', 'Đường ống linh tủy chạy dưới Thiên Hà. Cắt được một đoạn là Thiên Đình đau.']] },
            { boss: 'tinh_giao', say: [['narr', 'Trời nứt một đường. Một đạo kiếm khí từ rất xa rơi xuống, không ai cầm kiếm.']] },
            { boss: 'kiem_khi', say: [['thong_thien', 'Ồ, con kiến biết cắn. Ta chỉ tiện tay. Lớn nhanh lên, rồi đến Bích Du tìm ta.'], ['van_nguyet', 'Đó... chỉ là một sợi kiếm khí. Ngươi vừa chạm vào Thánh Nhân đấy.']] }
        ],
        reward: { hours: 36, goldRefs: 150, gear: ['amulet', 3] }
    },
    {
        id: 'm14', act: 2, title: 'Vết Thương Dao Trì', unlock: 13, needs: [12, 2],
        steps: [
            { go: 'dao_tri', say: [['dao_tri_mau', 'Kiếm khí Thông Thiên còn nằm trong kinh mạch ngươi. Ngồi xuống, ta rút cho. Rồi đi giết Cự Linh, hắn đang canh con ta.']] },
            { gather: { loc: 'dao_tri', hours: 6, label: 'Rút kiếm khí' } },
            { boss: 'cu_linh', say: [['dao_tri_mau', 'Mọi Tiên Đế đều ký khế với Lục Thánh. Hạo Thiên cũng thế. Ta từng là vợ hắn.']] }
        ],
        reward: { hours: 36, goldRefs: 180, gear: ['helm', 3], lb: 1 }
    },
    {
        id: 'm15', act: 2, title: 'Công Phá Thiên Binh', unlock: 14, needs: [13, 2],
        steps: [
            { go: 'van_tien', say: [['van_nguyet', 'Tán Tiên Minh xuất quân. Ba ngàn năm, lần đầu tiên.']] },
            { go: 'thien_ha' },
            { boss: 'than_ha' }
        ],
        reward: { hours: 36, goldRefs: 200 }
    },
    {
        id: 'm16', act: 2, title: 'Nam Thiên Môn', unlock: 15, needs: [14, 2],
        steps: [
            { go: 'nam_thien_mon', say: [['narr', 'Thập vạn thiên binh dàn trận. Sau lưng ngươi là tiên nô cầm cuốc.']] },
            { hunt: { loc: 'nam_thien_mon', name: 'Thiên Binh', n: 6 } },
            { boss: 'nam_mon' }
        ],
        reward: { hours: 48, goldRefs: 250, gear: ['weapon', 3] }
    },
    {
        id: 'm17', act: 2, title: 'Tiên Đế', unlock: 16, needs: [15, 2],
        steps: [
            { go: 'lang_tieu', say: [['tien_de', 'Ngươi tưởng ta thích ngồi đây? Bên trên có sáu người. Ta chỉ là kẻ thu thuế cho họ.']] },
            { boss: 'tien_de', say: [['tien_de', 'Giết ta thì mỏ vẫn chạy. Muốn dừng nó... lên hỏi họ đi.'], ['narr', 'Sau ngai vàng, một phiến ngọc nứt ra. Bên kia là bóng cung điện tím.']] },
            { boss: 'nguyen_thuy_phan', say: [['nguyen_thuy', 'Một phân thân của ta là đủ dạy bảo kẻ vô lễ. Thành Thánh rồi hãy nói chuyện.'], ['van_nguyet', 'Ngài ấy không giết ngươi. Vậy là ngươi đã bị để ý.']] }
        ],
        reward: { flag: 'world_thanh', hours: 48, goldRefs: 300, gear: ['armor', 4] }
    },

    /* ===== HỒI III ===== */
    {
        id: 'm18', act: 3, title: 'Tử Tiêu Nghị Sự', needs: [16, 0],
        steps: [
            { go: 'tu_tieu', say: [['thai_thanh', 'Một Tiên Đế chết, một vị Thánh mới sinh. Thiên Đạo vẫn cân bằng. Ngươi muốn ngồi ghế thứ bảy không?'], ['thong_thien', 'Từ chối đi nhóc, cho vui.'], ['me', 'Dừng mỏ Tiên Giới. Thả tiên nô.'], ['nguyen_thuy', 'Vậy thì đánh đi. Thánh Vực chỉ nghe một ngôn ngữ.']] },
            { go: 'da_bao', say: [['da_bao', 'Ở đây ai trả tiền cũng là khách. Muốn đánh Thánh Nhân, ngươi cần đồ của Thánh Vực.']] }
        ],
        reward: { hours: 24, goldRefs: 200, gear: ['ring', 3] }
    },
    {
        id: 'm19', act: 3, title: 'Vô Vi', unlock: 17, needs: [16, 2],
        steps: [
            { go: 'bat_canh', say: [['thai_thanh', 'Ta không ghét ngươi. Ta chỉ không làm gì cả. Chính vì thế mỏ vẫn chạy suốt vạn năm.']] },
            { boss: 'thai_thanh', say: [['thai_thanh', 'Đẹp lắm. Thái Cực Đồ cho ngươi mượn. Bên ngoài trời có thứ ta không dám nói tên.']] }
        ],
        reward: { hours: 48, goldRefs: 250, gear: ['helm', 3], relic: 'Thái Cực Đồ' }
    },
    {
        id: 'm20', act: 3, title: 'Thuận Thiên', unlock: 18, needs: [17, 2],
        steps: [
            { go: 'ngoc_hu', say: [['nguyen_thuy', 'Trật tự là ngọn núi. Kẻ dưới chân núi không có quyền hỏi vì sao núi cao.']] },
            { boss: 'nguyen_thuy', say: [['nguyen_thuy', 'Ngươi... không có trong thiên mệnh ta đọc. Ai đã xóa tên ngươi?']] }
        ],
        reward: { hours: 48, goldRefs: 300, gear: ['amulet', 3] }
    },
    {
        id: 'm21', act: 3, title: 'Mẹ Của Muôn Loài', needs: [18, 0],
        steps: [
            { go: 'oa_hoang', say: [['nu_oa', 'Ta nặn con người từ đất, và ta không hỏi họ có muốn hay không. Con có nghĩ ta có tội?']] },
            { boss: 'nu_oa_thu', say: [['nu_oa', 'Được rồi. Tiên nô của ta, ta tự thả. Phần còn lại con phải hỏi hai vị ở Tây Phương.']] }
        ],
        reward: { hours: 36, goldRefs: 300, statBless: 0.05 }
    },
    {
        id: 'm22', act: 3, title: 'Kiếm Hẹn', unlock: 19, needs: [18, 2],
        steps: [
            { go: 'bich_du', say: [['thong_thien', 'Nhóc con lớn nhanh thật. Lần này ta dùng tay thật.']] },
            { boss: 'thong_thien', say: [['thong_thien', 'Ha! Đã lắm! Từ thời khai thiên chưa ai làm ta chảy máu. Tru Tiên Kiếm là của ngươi.'], ['thong_thien', 'Nghe này: sáu chúng ta chỉ là chấp sự. Đạo Tổ cũng chỉ là người gác cổng.']] }
        ],
        reward: { hours: 48, goldRefs: 350, gear: ['weapon', 4], relic: 'Tru Tiên Kiếm' }
    },
    {
        id: 'm23', act: 3, title: 'Dưới Đài Sen', unlock: 20, needs: [19, 2],
        steps: [
            { go: 'cuc_lac', say: [['chuan_de', 'Tây Phương dạy chúng sinh chịu khổ, vì khổ là nhiên liệu.'], ['tiep_dan', 'Đài sen này nằm trên một khe nứt. Muốn qua, phải bước qua chúng ta.']] },
            { boss: 'chuan_tiep', say: [['tiep_dan', 'Mỏ Tiên Giới đã dừng. Nhưng Thiên Đạo sẽ đòi lại. Ngươi vừa khiến nó đói.'], ['narr', 'Dưới đài sen là bóng tối không có sao.']] }
        ],
        reward: { flag: 'world_thien', hours: 60, goldRefs: 400, gear: ['armor', 4], boardSlot: true }
    },

    /* ===== HỒI IV ===== */
    {
        id: 'm24', act: 4, title: 'Xác Vạn Giới', unlock: 21, needs: [20, 0],
        steps: [
            { go: 'van_gioi', say: [['narr', 'Những lục địa khô trôi trong hư không. Trên mỗi xác thế giới đều có một cái mỏ.'], ['ly_khach', 'Lần đầu ra ngoài à? Mọi vũ trụ đều bị trồng rồi gặt. Vũ trụ của ngươi là vụ thứ ba ngàn.']] },
            { hunt: { loc: 'van_gioi', name: 'Thiên Đạo Khôi Lỗi', n: 5 } },
            { boss: 'khoi_loi' }
        ],
        reward: { hours: 60, goldRefs: 400, gear: ['boots', 3] }
    },
    {
        id: 'm25', act: 4, title: 'Biển Kiếp Trước', unlock: 22, needs: [21, 2],
        steps: [
            { go: 'luan_hoi', say: [['ly_khach', 'Muốn phá Thiên Đạo thì phải biết nó đã giết ngươi bao nhiêu lần.']] },
            { boss: 'nghiep_long' },
            { gather: { loc: 'luan_hoi', hours: 8, label: 'Lặn qua các kiếp' }, say: [['narr', 'Ngươi thấy một kiếp cầm chổi. Một kiếp ngồi trên đài cao. Rồi lại một kiếp cầm chổi.']] }
        ],
        reward: { hours: 60, goldRefs: 450, gear: ['ring', 3] }
    },
    {
        id: 'm26', act: 4, title: 'Tâm Ma Vạn Kiếp', unlock: 23, needs: [22, 2],
        steps: [
            { go: 'luan_hoi', say: [['narr', 'Từ mặt biển, một kẻ giống ngươi bước lên, trên tay còn dính máu của ngươi.']] },
            { boss: 'tam_ma', say: [['tam_ma_say', 'Lần này ngươi đi xa hơn ta. Đừng dừng lại ở ngai vàng.']] }
        ],
        reward: { hours: 60, goldRefs: 500, gear: ['amulet', 3] }
    },
    {
        id: 'm27', act: 4, title: 'Khai Một Phương Trời', unlock: 24, needs: [23, 2],
        steps: [
            { go: 'khai_thien', say: [['ly_khach', 'Muốn đánh thắng Thiên Đạo, ngươi phải có trời của riêng mình.']] },
            { gather: { loc: 'khai_thien', hours: 10, label: 'Khai thiên lập địa' } },
            { boss: 'quy_tac', say: [['narr', 'Một vì sao nhỏ thắp lên trong thế giới vừa sinh của ngươi. Ở phàm giới, Tô Thanh Dao ngẩng đầu nhìn trời.']] }
        ],
        reward: { hours: 72, goldRefs: 600, gear: ['helm', 4] }
    },
    {
        id: 'm28', act: 4, title: 'Thần Đình', unlock: 25, needs: [24, 2],
        steps: [
            { go: 'than_dinh', say: [['narr', 'Một cỗ máy lớn hơn mọi tinh hà, quay bằng tiếng khóc đã được lọc sạch.']] },
            { hunt: { loc: 'than_dinh', name: 'Thiên Phạt Sứ', n: 6 } },
            { boss: 'than_dinh_ve' }
        ],
        reward: { hours: 72, goldRefs: 700, gear: ['weapon', 4] }
    },
    {
        id: 'm29', act: 4, title: 'Đạo Tổ', unlock: 26, needs: [25, 2],
        steps: [
            { go: 'than_dinh', say: [['dao_to', 'Ta không tạo ra Thiên Đạo. Ta bị đặt ở đây để giữ nó. Nếu nó dừng, thứ bên ngoài sẽ tràn vào.'], ['me', 'Thứ gì?'], ['dao_to', 'Thắng ta đi, rồi ra nhìn.']] },
            { boss: 'dao_to', say: [['dao_to', 'Cuối cùng cũng được nghỉ. Thiên Đạo từ nay không còn đòi mạng ai. Nhưng biên giới đã hở rồi, con ạ.']] }
        ],
        reward: { flag: 'world_hondon', hours: 96, goldRefs: 900, gear: ['armor', 4], boardSlot: true }
    },

    /* ===== HỒI V ===== */
    {
        id: 'm30', act: 5, title: 'Hạt Bụi', needs: [26, 0],
        steps: [
            { go: 'bo_hondon', say: [['narr', 'Vũ trụ của ngươi, nhìn từ đây, là một giọt nước trên phiến lá.'], ['vo_danh', 'A. Một giọt biết đi. Lâu rồi mới thấy. Để ta thử xem ngươi cứng tới đâu.']] },
            { boss: 'dao_gia_thu', say: [['vo_danh', 'Ta dùng một phần mười vạn sức, và ngươi còn đứng. Đến am của ta.']] }
        ],
        reward: { hours: 48, goldRefs: 500 }
    },
    {
        id: 'm31', act: 5, title: 'Am Cỏ', needs: [26, 1],
        steps: [
            { go: 'dao_gia_am', say: [['vong_ky', 'Hỗn Độn Đạo Giả không có môn phái. Mỗi người tự thành một con đường. Đạo Giả không dùng đồ, vì chính họ là đồ. Trang bị của ngươi từ đây chỉ còn là phụ.']] },
            { gather: { loc: 'dao_gia_am', hours: 12, label: 'Nghe đạo' } },
            { go: 'ma_than_mo', say: [['vo_danh', 'Lũ Ma Thần lại thức. Chúng sinh ra trước mọi Đạo, chúng ghét mọi thứ có trật tự.']] },
            { boss: 'ma_than' }
        ],
        reward: { hours: 96, goldRefs: 800, gear: ['ring', 4] }
    },
    {
        id: 'm32', act: 5, title: 'Luận Đạo', needs: [26, 2],
        steps: [
            { go: 'dao_gia_am', say: [['vong_ky', 'Muốn qua Hải Tâm, phải thắng một Đạo Giả. Ta trước.']] },
            { boss: 'vong_ky', say: [['vong_ky', 'Đạo của ngươi tên gì?'], ['me', 'Chưa có tên.'], ['vong_ky', 'Tốt. Ai có tên rồi thì đã dừng lại.']] }
        ],
        reward: { hours: 96, goldRefs: 800, gear: ['amulet', 4] }
    },
    {
        id: 'm33', act: 5, title: 'Hải Tâm', unlock: 27, needs: [26, 2],
        steps: [
            { go: 'hai_tam', say: [['vo_danh', 'Ta đã ngồi ở đây lâu hơn tuổi của vạn vũ trụ. Bước qua được ta, ngươi sẽ biết Đạo từ đâu ra.']] },
            { boss: 'vo_danh', say: [['vo_danh', 'Hay. Trước ngươi có một kẻ cũng thắng ta. Hắn cầm chổi.']] }
        ],
        reward: { flag: 'world_hongmong', hours: 120, goldRefs: 1000 }
    },

    /* ===== HỒI VI ===== */
    {
        id: 'm34', act: 6, title: 'Tử Khí', needs: [27, 0],
        steps: [
            { go: 'tu_khi', say: [['narr', 'Không có trời, không có đất. Chỉ có một màu tím đang nghĩ.']] },
            { hunt: { loc: 'tu_khi', name: 'Tử Khí Linh', n: 5 } },
            { boss: 'tu_khi_linh' }
        ],
        reward: { hours: 96, goldRefs: 800 }
    },
    {
        id: 'm35', act: 6, title: 'Người Khai Thiên', needs: [27, 1],
        steps: [
            { go: 'co_thu', say: [['ban_co', 'Ta bổ đôi hỗn độn một nhát rồi chết. Từ đó ta đứng đây chờ người đến hỏi vì sao. Rút rìu đi.']] },
            { boss: 'ban_co', say: [['ban_co', 'Vì ta muốn có một nơi để thấy mặt trời mọc. Chỉ thế thôi. Đừng để ai biến nó thành cái mỏ nữa.']] }
        ],
        reward: { hours: 120, goldRefs: 1000, statBless: 0.05 }
    },
    {
        id: 'm36', act: 6, title: 'Chúa Tể', unlock: 28, needs: [27, 2],
        steps: [
            { go: 'chua_te', say: [['hong_mong', 'Ta ngồi đây để không ai phải ngồi ở nơi cao hơn. Bên trên ta chỉ còn một kẻ, và hắn đang chờ ngươi.'], ['me', 'Ngươi biết hắn?'], ['hong_mong', 'Ngươi cũng biết. Hắn dạy ngươi cầm cuốc từ năm mười tuổi.']] },
            { boss: 'hong_mong', say: [['hong_mong', 'Thật sao... vẫn là ngươi. Đi đi. Chấm dứt nó, hoặc lặp lại nó.']] }
        ],
        reward: { flag: 'world_chungnguyen', hours: 144, goldRefs: 1200 }
    },

    /* ===== HỒI VII ===== */
    {
        id: 'm37', act: 7, title: 'Trường Hà Tận Cùng', needs: [28, 0],
        steps: [
            { go: 'truong_ha', say: [['narr', 'Dòng thời gian đổ xuống hư vô như một thác nước im lặng. Trong nước là mọi kiếp của ngươi.']] },
            { boss: 'du_anh' }
        ],
        reward: { hours: 144, goldRefs: 1200 }
    },
    {
        id: 'm38', act: 7, title: 'Người Quét Lá', needs: [28, 2],
        steps: [
            { go: 'chung_dai', say: [['chung_nguyen', 'Con đến rồi. Lá hôm nay nhiều quá, ta quét mãi không xong.'], ['me', 'Lão Mặc.'], ['chung_nguyen', 'Cũng là con. Kiếp trước con thắng ở đây, ngồi xuống cái ghế này, rồi thấy cô đơn quá nên quay về làm kẻ quét lá ở một ngôi làng, đợi một đứa trẻ giống mình.'], ['chung_nguyen', 'Thiên Đạo, Thánh Nhân, Đạo Tổ, tất cả chỉ để rèn con đến đây thay ta. Giờ cầm gậy lên.']] },
            { boss: 'chung_nguyen', say: [['chung_nguyen', 'Tốt lắm. Giờ con là người chọn.']] }
        ],
        reward: { ending: true, hours: 0, goldRefs: 0 }
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
    { id: 's_cho', loc: 'da_bao', npc: 'da_bao', title: 'Món Nợ Của Đa Bảo', needs: [16, 2], steps: [{ hunt: { loc: 'da_bao', name: 'Thánh Vực Đạo Tặc', n: 6 }, say: [['da_bao', 'Làm ăn phải sòng phẳng. Đây là phần của ngươi.']] }], reward: { hours: 24, goldRefs: 80, gear: ['ring', 3] } },
    { id: 's_quan', loc: 'vo_cuong', npc: 'ly_khach', title: 'Bữa Cơm Ở Vô Cương', needs: [22, 0], steps: [{ hunt: { loc: 'khai_thien', name: 'Hư Không Thú', n: 6 }, say: [['ly_khach', 'Thịt dai, nhưng ít ra là thật. Ngồi xuống ăn đi.']] }], reward: { hours: 36, goldRefs: 100, statBless: 0.02 } },
    { id: 's_mo', loc: 'dao_gia_am', npc: 'vong_ky', title: 'Tảo Mộ Ma Thần', needs: [26, 1], steps: [{ hunt: { loc: 'ma_than_mo', name: 'Ma Thần Tàn Hài', n: 8 }, say: [['vong_ky', 'Kẻ không có trật tự cũng cần người chôn.']] }], reward: { hours: 48, goldRefs: 150, gear: ['boots', 4] } }
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
Object.assign(BOSSES.nu_oa_thu, { path: 'yeu' });
Object.assign(BOSSES.chuan_tiep, { path: 'the' });
Object.assign(BOSSES.ma_quan, { path: 'ma', adds: { name: 'Vực Ma', kind: 'demon', n: 2 } });
Object.assign(BOSSES.lang_phong_2, { path: 'ma' });
Object.assign(BOSSES.nam_mon, { adds: { name: 'Thiên Binh', kind: 'human', n: 3 } });
Object.assign(BOSSES.tien_de, { path: 'kiem', adds: { name: 'Kim Giáp Tiên Tướng', kind: 'human', n: 2 } });
Object.assign(BOSSES.than_dinh_ve, { adds: { name: 'Thiên Phạt Sứ', kind: 'golem', n: 2 } });

const QUEST_INDEX = [...MAIN_QUESTS, ...SIDE_QUESTS].reduce((m, q) => (m[q.id] = q, m), {});
