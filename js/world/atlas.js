/* ===========================================================
   BẢN ĐỒ THẾ GIỚI — 7 cõi, mỗi cõi một đồ thị địa điểm.
   x/y theo khung 1000×560. links: tên địa điểm nối đường bộ.
   qi: nồng độ linh khí, nhân tốc độ bế quan tại chỗ.
   services: shop (cửa hàng), forge (lò rèn), board (bảng treo thưởng).
=========================================================== */
const E = (name, kind) => ({ name, kind });

const LOCATIONS = {
    /* ---- Phàm Giới ---- */
    thanh_thuy: { world: 'pham', name: 'Thanh Thủy Thôn', icon: '🏡', x: 120, y: 430, type: 'town', qi: 0.9, minR: 0, maxR: 1, links: ['hac_phong', 'thanh_van'], services: ['shop'], desc: 'Làng nhỏ ven suối, nơi ngươi lớn lên.', enemies: [E('Sói Đói', 'beast')] },
    hac_phong: { world: 'pham', name: 'Hắc Phong Trại', icon: '🏴', x: 90, y: 230, type: 'wild', qi: 0.9, minR: 0, maxR: 2, links: ['thanh_thuy', 'vu_moc_lam'], desc: 'Sơn trại của bọn thổ phỉ tu tà pháp.', enemies: [E('Thổ Phỉ', 'human'), E('Hắc Lang', 'beast')] },
    thanh_van: { world: 'pham', name: 'Thanh Vân Tông', icon: '⛩️', x: 330, y: 330, type: 'sect', qi: 1.25, minR: 0, maxR: 4, links: ['thanh_thuy', 'van_long', 'vu_moc_lam'], services: ['shop', 'forge', 'board'], desc: 'Đại tông chính đạo. Động phủ đệ tử có linh khí dày đặc.', enemies: [E('Khôi Lỗi Thí Luyện', 'golem')] },
    vu_moc_lam: { world: 'pham', name: 'Vạn Mộc Lâm', icon: '🌲', x: 300, y: 120, type: 'wild', qi: 1.05, minR: 1, maxR: 4, links: ['hac_phong', 'thanh_van', 'xich_diem'], desc: 'Rừng nguyên sinh đầy yêu thú và linh thảo.', enemies: [E('Thanh Lân Mãng', 'dragon'), E('Mộc Yêu', 'golem'), E('Yêu Lang', 'beast')] },
    van_long: { world: 'pham', name: 'Vân Long Thành', icon: '🏯', x: 540, y: 390, type: 'town', qi: 1.0, minR: 1, maxR: 8, links: ['thanh_van', 'xich_diem', 'bang_phong'], services: ['shop', 'forge', 'board'], desc: 'Thành lớn nhất phàm giới, chợ pháp bảo ngày đêm tấp nập.', enemies: [E('Tán Tu Lang Thang', 'human')] },
    xich_diem: { world: 'pham', name: 'Xích Diệm Sơn', icon: '🌋', x: 590, y: 150, type: 'wild', qi: 1.1, minR: 3, maxR: 6, links: ['vu_moc_lam', 'van_long', 'ma_uyen'], desc: 'Núi lửa ngàn năm, địa hỏa cuồn cuộn.', enemies: [E('Hỏa Ma', 'demon'), E('Dung Nham Cự Nhân', 'golem')] },
    bang_phong: { world: 'pham', name: 'Băng Phong Cốc', icon: '🏔️', x: 760, y: 470, type: 'wild', qi: 1.15, minR: 4, maxR: 7, links: ['van_long', 'phi_thang'], desc: 'Thung lũng băng tuyết, nơi ẩn cư của Hàn Băng Tiên Tử.', enemies: [E('Băng Hồn', 'spirit'), E('Tuyết Yêu', 'beast')] },
    ma_uyen: { world: 'pham', name: 'Vô Tận Ma Uyên', icon: '🕳️', x: 800, y: 120, type: 'dungeon', qi: 1.2, minR: 6, maxR: 8, links: ['xich_diem', 'phi_thang'], desc: 'Vực sâu thông xuống ma giới, ma khí xé rách thần hồn.', enemies: [E('Vực Ma', 'demon'), E('Cốt Tướng', 'spirit')] },
    phi_thang: { world: 'pham', name: 'Phi Thăng Đài', icon: '🌠', x: 920, y: 300, type: 'gate', qi: 1.3, minR: 7, maxR: 8, links: ['bang_phong', 'ma_uyen'], gate: { to: 'phi_thang_tri', minutes: 360, flag: 'world_tien' }, desc: 'Đài đá cổ dẫn lên Tiên Giới. Lôi vân chưa từng tan.', enemies: [E('Lôi Thú', 'beast')] },

    /* ---- Tiên Giới ---- */
    phi_thang_tri: { world: 'tien', name: 'Phi Thăng Trì', icon: '💧', x: 90, y: 300, type: 'gate', qi: 1.1, minR: 9, maxR: 10, links: ['tien_khoang', 'van_tien'], gate: { to: 'phi_thang', minutes: 360 }, desc: 'Nơi tiếp nhận kẻ phi thăng — hoặc nơi kiểm kê họ.', enemies: [E('Giám Binh Thiên Đình', 'human')] },
    tien_khoang: { world: 'tien', name: 'Vô Quang Tiên Khoáng', icon: '⛏️', x: 240, y: 120, type: 'dungeon', qi: 1.0, minR: 9, maxR: 11, links: ['phi_thang_tri', 'thien_ha'], desc: 'Hầm mỏ nơi tiên nô đào linh tủy đến chết.', enemies: [E('Đốc Công Tiên Khoáng', 'human'), E('Khoáng Thi', 'spirit')] },
    van_tien: { world: 'tien', name: 'Vạn Tiên Thành', icon: '🏛️', x: 330, y: 400, type: 'town', qi: 1.2, minR: 9, maxR: 15, links: ['phi_thang_tri', 'dao_tri', 'thien_ha'], services: ['shop', 'forge', 'board'], desc: 'Thành của tán tiên, nơi tin tức và pháp bảo chảy về.', enemies: [E('Tiên Đạo Tặc', 'human')] },
    thien_ha: { world: 'tien', name: 'Thiên Hà Tinh Hải', icon: '🌌', x: 520, y: 170, type: 'wild', qi: 1.25, minR: 10, maxR: 13, links: ['tien_khoang', 'van_tien', 'nam_thien_mon'], desc: 'Dải ngân hà chảy ngang bầu trời tiên giới.', enemies: [E('Tinh Giao', 'dragon'), E('Tinh Hồn', 'spirit')] },
    dao_tri: { world: 'tien', name: 'Dao Trì', icon: '🪷', x: 590, y: 440, type: 'sect', qi: 1.35, minR: 11, maxR: 15, links: ['van_tien', 'nam_thien_mon'], services: ['forge'], desc: 'Ao tiên của Dao Trì Thánh Mẫu, linh khí ngưng thành sương.', enemies: [E('Dao Trì Hộ Vệ', 'human')] },
    nam_thien_mon: { world: 'tien', name: 'Nam Thiên Môn', icon: '🚪', x: 760, y: 300, type: 'dungeon', qi: 1.2, minR: 13, maxR: 15, links: ['thien_ha', 'dao_tri', 'lang_tieu'], desc: 'Cổng trời do thập vạn thiên binh trấn giữ.', enemies: [E('Thiên Binh', 'human'), E('Cự Linh Thần', 'golem')] },
    lang_tieu: { world: 'tien', name: 'Lăng Tiêu Bảo Điện', icon: '👑', x: 915, y: 170, type: 'gate', qi: 1.4, minR: 14, maxR: 15, links: ['nam_thien_mon'], gate: { to: 'tu_tieu', minutes: 480, flag: 'world_thanh' }, desc: 'Ngai vàng của Tiên Đế, phía sau là lối lên Thánh Vực.', enemies: [E('Kim Giáp Tiên Tướng', 'human')] },

    /* ---- Thánh Vực ---- */
    tu_tieu: { world: 'thanh', name: 'Tử Tiêu Cung', icon: '🟣', x: 500, y: 90, type: 'gate', qi: 1.3, minR: 16, maxR: 19, links: ['bat_canh', 'ngoc_hu', 'da_bao'], gate: { to: 'lang_tieu', minutes: 480 }, desc: 'Nơi Đạo Tổ từng giảng đạo, Lục Thánh nghị sự.', enemies: [E('Tử Tiêu Đạo Đồng', 'human')] },
    bat_canh: { world: 'thanh', name: 'Bát Cảnh Cung', icon: '☯️', x: 180, y: 180, type: 'sect', qi: 1.35, minR: 16, maxR: 19, links: ['tu_tieu', 'da_bao'], desc: 'Đạo tràng của Thái Thanh Thánh Nhân.', enemies: [E('Hoàng Cân Lực Sĩ', 'golem')] },
    ngoc_hu: { world: 'thanh', name: 'Ngọc Hư Cung', icon: '🏔️', x: 820, y: 180, type: 'sect', qi: 1.35, minR: 16, maxR: 19, links: ['tu_tieu', 'bich_du'], desc: 'Xiển giáo tổ đình của Nguyên Thủy Thiên Tôn.', enemies: [E('Xiển Giáo Kim Tiên', 'human')] },
    da_bao: { world: 'thanh', name: 'Đa Bảo Thị', icon: '🏮', x: 420, y: 300, type: 'town', qi: 1.2, minR: 16, maxR: 19, links: ['tu_tieu', 'bat_canh', 'bich_du', 'oa_hoang'], services: ['shop', 'forge', 'board'], desc: 'Chợ đêm của Đa Bảo Đạo Nhân, trung lập với mọi giáo phái.', enemies: [E('Thánh Vực Đạo Tặc', 'human')] },
    bich_du: { world: 'thanh', name: 'Bích Du Cung', icon: '⚔️', x: 730, y: 380, type: 'sect', qi: 1.35, minR: 17, maxR: 19, links: ['ngoc_hu', 'da_bao', 'cuc_lac'], desc: 'Tiệt giáo vạn tiên lai triều của Thông Thiên Giáo Chủ.', enemies: [E('Tiệt Giáo Kiếm Tiên', 'human'), E('Tru Tiên Kiếm Linh', 'spirit')] },
    oa_hoang: { world: 'thanh', name: 'Oa Hoàng Cung', icon: '🐍', x: 180, y: 430, type: 'sect', qi: 1.35, minR: 17, maxR: 19, links: ['da_bao', 'cuc_lac'], desc: 'Cung điện của Nữ Oa Nương Nương giữa biển mây.', enemies: [E('Xà Vệ Oa Hoàng', 'dragon')] },
    cuc_lac: { world: 'thanh', name: 'Tây Phương Cực Lạc', icon: '🪔', x: 480, y: 480, type: 'gate', qi: 1.4, minR: 18, maxR: 19, links: ['oa_hoang', 'bich_du'], gate: { to: 'van_gioi', minutes: 720, flag: 'world_thien' }, desc: 'Đạo tràng Chuẩn Đề và Tiếp Dẫn. Dưới đài sen là khe nứt ra ngoài Thiên Đạo.', enemies: [E('Kim Cương Hộ Pháp', 'golem')] },

    /* ---- Thiên Ngoại ---- */
    van_gioi: { world: 'thien', name: 'Vạn Giới Phế Tích', icon: '🪨', x: 110, y: 280, type: 'gate', qi: 1.2, minR: 20, maxR: 22, links: ['vo_cuong', 'luan_hoi'], gate: { to: 'cuc_lac', minutes: 720 }, desc: 'Xác các thế giới bị Thiên Đạo thu hoạch trôi lơ lửng.', enemies: [E('Tàn Hồn Vạn Giới', 'spirit'), E('Thiên Đạo Khôi Lỗi', 'golem')] },
    vo_cuong: { world: 'thien', name: 'Vô Cương Khách Trạm', icon: '🛖', x: 340, y: 130, type: 'town', qi: 1.2, minR: 20, maxR: 25, links: ['van_gioi', 'khai_thien'], services: ['shop', 'forge', 'board'], desc: 'Quán trọ của những kẻ đã trốn khỏi Thiên Đạo.', enemies: [E('Thiên Ngoại Đạo Tặc', 'human')] },
    luan_hoi: { world: 'thien', name: 'Luân Hồi Hải', icon: '🌊', x: 370, y: 440, type: 'wild', qi: 1.3, minR: 21, maxR: 24, links: ['van_gioi', 'khai_thien', 'than_dinh'], desc: 'Biển chứa mọi kiếp người đã qua, kể cả kiếp của ngươi.', enemies: [E('Luân Hồi Sứ', 'spirit'), E('Nghiệp Long', 'dragon')] },
    khai_thien: { world: 'thien', name: 'Khai Thiên Hoang Nguyên', icon: '🪐', x: 630, y: 200, type: 'wild', qi: 1.4, minR: 22, maxR: 25, links: ['vo_cuong', 'luan_hoi', 'than_dinh'], desc: 'Vùng trống nơi ngươi có thể tự khai một phương thiên địa.', enemies: [E('Hư Không Thú', 'beast'), E('Quy Tắc Thể', 'chaos')] },
    than_dinh: { world: 'thien', name: 'Thiên Đạo Thần Đình', icon: '⚖️', x: 900, y: 320, type: 'gate', qi: 1.5, minR: 24, maxR: 25, links: ['luan_hoi', 'khai_thien'], gate: { to: 'bo_hondon', minutes: 960, flag: 'world_hondon' }, desc: 'Trung khu vận hành Thiên Đạo, nơi Đạo Tổ tọa trấn.', enemies: [E('Thiên Phạt Sứ', 'golem'), E('Đạo Vệ', 'human')] },

    /* ---- Hỗn Độn Hải ---- */
    bo_hondon: { world: 'hondon', name: 'Bờ Hỗn Độn', icon: '🌫️', x: 120, y: 300, type: 'gate', qi: 1.3, minR: 26, maxR: 26, links: ['dao_gia_am', 'ma_than_mo'], gate: { to: 'than_dinh', minutes: 960 }, desc: 'Nơi mọi quy tắc tan ra, thời gian không còn thẳng.', enemies: [E('Hỗn Độn Sinh Linh', 'chaos')] },
    dao_gia_am: { world: 'hondon', name: 'Đạo Giả Am', icon: '🛕', x: 430, y: 130, type: 'town', qi: 1.5, minR: 26, maxR: 26, links: ['bo_hondon', 'hai_tam'], services: ['shop', 'forge', 'board'], desc: 'Am cỏ của các Hỗn Độn Đạo Giả, mỗi người là một vũ trụ.', enemies: [E('Đạo Giả Thí Luyện Khôi', 'golem')] },
    ma_than_mo: { world: 'hondon', name: 'Ma Thần Mộ', icon: '⚰️', x: 470, y: 440, type: 'dungeon', qi: 1.4, minR: 26, maxR: 26, links: ['bo_hondon', 'hai_tam'], desc: 'Nghĩa địa của Tam Thiên Ma Thần sinh trước khai thiên.', enemies: [E('Ma Thần Tàn Hài', 'demon'), E('Hỗn Độn Cự Long', 'dragon')] },
    hai_tam: { world: 'hondon', name: 'Hỗn Độn Hải Tâm', icon: '🌀', x: 860, y: 280, type: 'gate', qi: 1.6, minR: 26, maxR: 26, links: ['dao_gia_am', 'ma_than_mo'], gate: { to: 'tu_khi', minutes: 1440, flag: 'world_hongmong' }, desc: 'Mắt bão của hỗn độn, lối vào Hồng Mông.', enemies: [E('Hải Tâm Ma Thần', 'chaos')] },

    /* ---- Hồng Mông ---- */
    tu_khi: { world: 'hongmong', name: 'Tử Khí Thiên Nguyên', icon: '🌸', x: 150, y: 320, type: 'gate', qi: 1.5, minR: 27, maxR: 27, links: ['co_thu'], gate: { to: 'hai_tam', minutes: 1440 }, desc: 'Đồng cỏ của Hồng Mông Tử Khí, thứ tạo ra Đạo.', enemies: [E('Tử Khí Linh', 'spirit')] },
    co_thu: { world: 'hongmong', name: 'Hồng Mông Cổ Thụ', icon: '🌳', x: 500, y: 220, type: 'town', qi: 1.7, minR: 27, maxR: 27, links: ['tu_khi', 'chua_te'], services: ['shop', 'forge', 'board'], desc: 'Cây mẹ của vạn đại đạo, tán lá là các chuỗi vũ trụ.', enemies: [E('Cổ Thụ Hộ Linh', 'golem')] },
    chua_te: { world: 'hongmong', name: 'Chúa Tể Tọa', icon: '🪑', x: 860, y: 320, type: 'gate', qi: 1.8, minR: 27, maxR: 27, links: ['co_thu'], gate: { to: 'truong_ha', minutes: 2160, flag: 'world_chungnguyen' }, desc: 'Ngai của Hồng Mông Chúa Tể, đặt trên vực thẳm cuối cùng.', enemies: [E('Chúa Tể Thân Vệ', 'chaos')] },

    /* ---- Chung Nguyên ---- */
    truong_ha: { world: 'chungnguyen', name: 'Trường Hà Tận Cùng', icon: '🌅', x: 220, y: 300, type: 'gate', qi: 1.8, minR: 28, maxR: 28, links: ['chung_dai'], gate: { to: 'chua_te', minutes: 2160 }, services: ['shop', 'forge'], desc: 'Nơi dòng thời gian đổ xuống hư vô.', enemies: [E('Dư Ảnh Của Ngươi', 'spirit')] },
    chung_dai: { world: 'chungnguyen', name: 'Chung Nguyên Đài', icon: '⚪', x: 780, y: 300, type: 'dungeon', qi: 2.0, minR: 28, maxR: 28, links: ['truong_ha'], desc: 'Điểm kết của mọi đạo. Có một người đang ngồi đợi.', enemies: [E('Chung Yên Chi Ảnh', 'chaos')] }
};

Object.keys(LOCATIONS).forEach(id => { LOCATIONS[id].id = id; });
