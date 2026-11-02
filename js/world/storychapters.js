/* ===========================================================
   HỒI TRUYỆN THEO TIỂU CẢNH GIỚI
   Mỗi cảnh giới: Sơ Kỳ, Trung Kỳ, Hậu Kỳ là các hồi nhỏ, Đại Viên Mãn là nhiệm vụ mở khóa đột phá.
   Khóa: "cảnh giới-tiểu cảnh", bước giống MAIN_QUESTS.
=========================================================== */
Object.assign(NPCS, {
    huyen_do: { name: 'Huyền Đô Đại Pháp Sư', title: 'Chưởng giáo Nhân Giáo tại Tiên Giới', look: NPC_LOOK('m', 0, '#f0e6c8', '#e8e4d8', { beard: true, weapon: 'fan', weaponColor: '#e8e4d8' }) },
    quang_thanh: { name: 'Quảng Thành Tử', title: 'Đại đệ tử Xiển Giáo', look: NPC_LOOK('m', 0, '#1b1b22', '#d9d4c5', { beard: true, weapon: 'staff', weaponColor: '#ffd479' }) },
    trieu_minh: { name: 'Triệu Công Minh', title: 'Tiên nhân Tiệt Giáo', look: NPC_LOOK('m', 4, '#1b1b22', '#2b2b35', { beard: true, weapon: 'sword', weaponColor: '#ff6b6b' }) },
    bich_tieu: { name: 'Bích Tiêu Tiên Tử', title: 'Người giữ Nữ Oa Miếu', look: NPC_LOOK('f', 1, '#1b1b22', '#3e7d5a', { weapon: 'orb', weaponColor: '#7be4a3' }) },
    di_lac: { name: 'Di Lặc Tôn Giả', title: 'Tiên nhân Tây Phương Giáo', look: NPC_LOOK('m', 5, '#1b1b22', '#b5832e', { weapon: 'staff', weaponColor: '#ffd479' }) },
    thai_so: { name: 'Thái Sơ Lão Tổ', title: 'Đại Đạo Chí Thượng', look: NPC_LOOK('m', 0, '#ffffff', '#3a2a6e', { beard: true, aura: '#c58bff', crown: 'halo', crownColor: '#c58bff' }) },
    huyen_mau: { name: 'Huyền Minh Đạo Mẫu', title: 'Đại Đạo Chí Thượng', look: NPC_LOOK('f', 1, '#1b1b22', '#3a2a6e', { aura: '#c58bff', crown: 'halo', crownColor: '#c58bff' }) },
    kiem_to: { name: 'Bất Hủ Kiếm Tổ', title: 'Đại Đạo Chí Thượng', look: NPC_LOOK('m', 1, '#c9c9d6', '#2b2b35', { aura: '#c58bff', weapon: 'sword', weaponColor: '#c58bff' }) },
    van_kiep: { name: 'Vạn Kiếp Thiên Quân', title: 'Đại Đạo Chí Thượng', look: NPC_LOOK('m', 4, '#8b5a2b', '#3a2a6e', { aura: '#c58bff', weapon: 'spear', weaponColor: '#c58bff' }) },
    hd_vo_thuc: { name: 'Hỗn Độn Vô Thức', title: 'Hỗn Độn Đạo Giả', look: NPC_LOOK('m', 1, '#5fe6e6', '#13525c', { aura: '#5fe6e6' }) },
    hd_thu_cuu: { name: 'Hỗn Độn Thứ Chín', title: 'Hỗn Độn Đạo Giả Viên Mãn', look: NPC_LOOK('m', 1, '#5fe6e6', '#13525c', { aura: '#5fe6e6', eyes: '#2a5fa8' }) },
    am_duong: { name: 'Âm Dương Vô Cấu Tịch Diệt Thần', title: 'Hỗn Độn Đạo Giả', look: NPC_LOOK('f', 2, '#e9eef7', '#13525c', { aura: '#5fe6e6', weapon: 'orb', weaponColor: '#5fe6e6' }) },
    thich_thien: { name: 'Thích Thiên Vô Lượng Đại Diệt Tôn', title: 'Hỗn Độn Đạo Giả', look: NPC_LOOK('m', 5, '#1b1b22', '#13525c', { aura: '#5fe6e6', crown: 'wheel', crownColor: '#5fe6e6' }) },
    thai_bach: { name: 'Thái Bạch Tinh Quân', title: 'Sứ giả Lăng Tiêu', look: NPC_LOOK('m', 0, '#f0e6c8', '#dbe8f7', { beard: true, crown: 'guan', weapon: 'fan', weaponColor: '#f5f5f5' }) }
});

const MAIN_CHAPTERS = {
    /* ----- Hồi I ----- */
    '0-1': ORIGIN_STORY.thuy.first,
    '0-2': { title: 'Lời Của Lão Quét Lá', steps: [{ go: 'thanh_thuy', say: [['mac', 'Đường lên Thanh Vân có chín ngàn bậc. Ngươi định leo bằng gì?'], ['me', 'Bằng chân.'], ['mac', 'Tốt. Kẻ định leo bằng đầu đều ngã trước.']] }] },
    '1-0': { title: 'Linh Mạch Ngoại Môn', steps: [{ go: 'thanh_van', say: [['to_dao', 'Trúc Cơ rồi à? Đệ tử ngoại môn được phát một viên đan mỗi tháng. Nội môn được mười.'], ['me', 'Vì sao chênh lệch vậy?'], ['to_dao', 'Vì linh mạch có hạn, mà ai cũng muốn thành tiên. Nhớ lấy, ở đâu cũng có sổ sách.']] }] },
    '1-1': { title: 'Hái Thuốc Thay Sư Tỷ', steps: [{ go: 'vu_moc_lam', say: [['to_dao', 'Mộc Yêu giữ linh thảo ở đây. Đệ làm thay ta, ta dạy đệ cách thở khi xuất kiếm.']] }, { hunt: { loc: 'vu_moc_lam', name: 'Mộc Yêu', n: 3 }, say: [['to_dao', 'Thở chậm thôi. Kiếm nhanh mà lòng chậm mới là kiếm.']] }] },
    '1-2': { title: 'Ánh Mắt Lăng Phong', steps: [{ go: 'thanh_van', say: [['lang_phong', 'Nghe nói sư tỷ dạy riêng cho ngươi?'], ['me', 'Có sao không?'], ['lang_phong', 'Có chứ. Nghĩa là ngươi đáng để ta nhớ tên. Đừng làm ta thất vọng.']] }] },
    '2-0': { title: 'Kim Đan Đầu Tiên', steps: [{ go: 'thanh_van', say: [['chuong_mon', 'Kim Đan sáng lắm. Sáng thì dễ bị nhìn thấy, con hiểu chứ?'], ['me', 'Đệ tử không hiểu.'], ['chuong_mon', 'Vậy thì đừng đi một mình sau giờ Tý.']] }] },
    '2-1': { title: 'Chiếc Giường Bỏ Trống', steps: [{ go: 'thanh_van', say: [['to_dao', 'Đệ tử ngủ cạnh đệ đâu rồi?'], ['me', 'Nói là xuống Tử Vong Cốc hái thuốc.'], ['to_dao', 'Tông môn không có lệnh nào như thế.']] }, { go: 'tu_vong_coc' }, { hunt: { loc: 'tu_vong_coc', name: 'Thi Khôi', n: 3 }, say: [['narr', 'Một con Thi Khôi còn đeo thẻ đệ tử Thanh Vân. Tên trên thẻ đã bị cạo đi.']] }] },
    '2-2': { title: 'Thẻ Đệ Tử', steps: [{ go: 'thanh_van', say: [['to_dao', 'Đừng đưa thứ này cho ai. Nhất là những người mặc áo đen.'], ['me', 'Sư tỷ nghi ai?'], ['to_dao', 'Ta nghi cả ta. Ở đây không ai sạch hết đâu.']] }] },
    '3-0': { title: 'Nguyên Anh Mở Mắt', steps: [{ go: 'thanh_van', say: [['chuong_mon', 'Từ nay ngươi ngồi cùng hàng với các trưởng lão. Họ sẽ cười với ngươi. Đừng tin.'], ['me', 'Còn sư phụ?'], ['chuong_mon', 'Ta thì mệt rồi, không cười nổi nữa.']] }] },
    '3-1': { title: 'Tiếng Trống Cổ Lạc', steps: [{ go: 'co_lac', say: [['to_dao', 'Dân Cổ Lạc nói đêm nào cũng nghe trống. Âm hồn chỉ tụ khi có ai đó gọi chúng.']] }, { hunt: { loc: 'co_lac', name: 'Âm Hồn Trấn Cổ', n: 4 }, say: [['narr', 'Trên mặt trống khắc dấu của Ma Uyên. Có người đã trả tiền cho nó.']] }] },
    '3-2': { title: 'Mùi Lưu Huỳnh', steps: [{ go: 'van_long', say: [['thuong_hoi', 'Đơn hàng lưu huỳnh của Xích Diệm tăng gấp ba tháng này, người mua dùng lệnh bài Thanh Vân.'], ['me', 'Lệnh bài của ai?'], ['thuong_hoi', 'Một đệ tử trẻ, đẹp trai, kiếm rất sáng. Ngươi biết hắn chứ?']] }] },
    '4-0': { title: 'Thần Niệm Đầu Tiên', steps: [{ go: 'thanh_van', say: [['to_dao', 'Hóa Thần rồi, đệ nghe được cả tiếng thở của tông môn. Nghe xem, có gì lạ không?'], ['me', 'Dưới đại điện có một nhịp thở thừa.'], ['to_dao', 'Đừng nói với ai. Đặc biệt là Lăng Phong.']] }] },
    '4-1': { title: 'Hạc Không Về', steps: [{ go: 'bang_phong', say: [['narr', 'Hạc đưa thư của chưởng môn gửi Băng Phong Cốc không bao giờ tới. Ngươi lần theo vết lông rơi.']] }, { hunt: { loc: 'bang_phong', name: 'Tuyết Yêu', n: 4 }, say: [['narr', 'Trong bụng Tuyết Yêu còn nửa bức thư: "...nếu ta chết, hãy..."']] }] },
    '4-2': { title: 'Nửa Bức Thư', steps: [{ go: 'thanh_van', say: [['chuong_mon', 'Bức thư đó à? Đốt đi.'], ['me', 'Sư phụ biết mình sắp chết?'], ['chuong_mon', 'Người già đều biết. Việc của con là đừng khóc trước mặt đệ tử.']] }] },
    '5-0': { title: 'Cái Cột Của Thanh Vân', steps: [{ go: 'thanh_van', say: [['to_dao', 'Chín mươi bảy đệ tử. Kho còn chừng ấy đan. Đệ phân đi.'], ['me', 'Sao lại là đệ?'], ['to_dao', 'Vì ai phân cũng bị ghét, mà đệ chịu được.']] }] },
    '5-1': { title: 'Long Cung Bán Muối', steps: [{ go: 'long_cung', say: [['narr', 'Thanh Vân cần linh thạch. Long Cung Đông Hải đang treo thưởng đầu Dạ Xoa phản loạn.']] }, { hunt: { loc: 'long_cung', name: 'Dạ Xoa Tuần Hải', n: 5 }, say: [['narr', 'Tiền đủ nuôi tông môn một năm. Ngươi nhìn số xác rồi nhìn số tiền, thấy mình giống một người nào đó.']] }] },
    '5-2': { title: 'Đêm Không Ngủ', steps: [{ go: 'thanh_van', say: [['to_dao', 'Đệ lại không ngủ. Đệ mơ thấy gì?'], ['me', 'Mơ thấy mình đâm hắn.'], ['to_dao', 'Rồi sao?'], ['me', 'Rồi tỉnh dậy, tay vẫn nắm chặt.']] }] },
    '6-0': { title: 'Hàn Băng Nhớ Lại', steps: [{ go: 'bang_phong', say: [['han_bang', 'Hợp Thể rồi vẫn nóng. Ta có một đệ tử từng như ngươi, phi thăng năm trăm năm trước.'], ['me', 'Người ấy có viết thư về không?'], ['han_bang', 'Chưa một ai viết thư về.']] }] },
    '6-1': { title: 'Quân Tiên Phong Của Vực', steps: [{ go: 'ma_uyen', say: [['to_dao', 'Cốt Tướng đang kéo về phía Thanh Vân. Chặn ở miệng vực, đừng để chúng ra.']] }, { hunt: { loc: 'ma_uyen', name: 'Cốt Tướng', n: 5 }, say: [['narr', 'Áo giáp của Cốt Tướng khắc cùng một dòng chữ: "Xuống đây còn hơn lên trên."']] }] },
    '6-2': { title: 'Cuốn Sổ Thiếu Trang', steps: [{ go: 'thanh_van', say: [['to_dao', 'Mấy trang sổ tông môn bị xé, ta tìm thấy rồi. Chúng ghi tên người phi thăng.'], ['me', 'Rồi sao?'], ['to_dao', 'Phía sau mỗi cái tên, sư phụ đều vẽ một dấu hỏi.']] }] },
    '7-0': { title: 'Tấm Bia Dưới Vực', steps: [{ go: 'phi_thang', say: [['dai_su', 'Ngươi có hỏi vì sao đài này chỉ có đường lên không?'], ['me', 'Vì sao?'], ['dai_su', 'Ta giữ đài ba trăm năm. Chưa thấy ai xuống, nên cũng chưa ai trả lời được.']] }] },
    '7-1': { title: 'Sấm Non', steps: [{ hunt: { loc: 'phi_thang', name: 'Lôi Thú', n: 5 }, say: [['dai_su', 'Sấm non đã vậy. Kiếp thật của ngươi còn dày gấp chín lần.']] }] },
    '7-2': { title: 'Lời Của Kẻ Thù', steps: [{ go: 'ma_uyen', say: [['ma_quan', 'Ngươi xuống tận đây chỉ để nghe một câu thôi sao?'], ['me', 'Ngươi biết gì về phi thăng?'], ['ma_quan', 'Ta biết kẻ nào lên đều không về. Còn ta thì ở lại làm ác, và vẫn còn sống.']] }] },
    '8-0': { title: 'Đại Thừa Cô Đơn', steps: [{ go: 'thanh_van', say: [['to_dao', 'Phàm giới không còn ai đánh lại đệ nữa. Cảm giác thế nào?'], ['me', 'Giống như đứng trên mái nhà, không có thang xuống.']] }] },
    '8-1': { title: 'Tích Đan Cho Tông Môn', steps: [{ gather: { loc: 'van_long', hours: 4, label: 'Mua đan dự trữ cho Thanh Vân' }, say: [['thuong_hoi', 'Trả trước mười năm tiền đan cho một tông môn sắp mất cột chống? Ngươi khờ thật.']] }] },
    '8-2': { title: 'Thăm Mộ Chưởng Môn', steps: [{ go: 'thanh_van', say: [['narr', 'Gốc tùng già đã nhú chồi mới. Ngươi đặt lên mộ nửa bức thư năm xưa.'], ['to_dao', 'Đệ có sợ không?'], ['me', 'Sợ. Nhưng ở lại còn sợ hơn.']] }] },

    /* ----- Hồi II: mỏ xong ở Huyền Tiên, từ Kim Tiên bước vào hàng ngũ tiên quan ----- */
    '9-0': { title: 'Bàn Kiểm Kê', intro: [['narr', 'Tỉnh dậy, cổ tay ngươi đã có dấu ấn nô lệ. Trên đầu không phải trời xanh mà là trần đá của một căn hầm vô tận.'], ['me', 'Đây là Tiên Giới?']], steps: [{ go: 'phi_thang_tri', say: [['narr', 'Không có tiên nhạc. Chỉ có xiềng xích và một chiếc bàn kiểm kê.'], ['tien_lai', 'Phải, Tiên Giới đó con. Chào mừng tới thiên đường. Đừng chống cự, chúng sẽ chuyển ngươi xuống mỏ thôi.']] }] },
    '9-1': { title: 'Ca Đào Đầu Tiên', steps: [{ go: 'tien_khoang', say: [['tien_lai', 'Ba ngàn năm rồi, ta đào linh tủy cho Thiên Đình. Cầm cuốc thấp xuống, đừng để đốc công thấy ngươi còn sức.']] }, { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 3 }, say: [['tien_lai', 'Chúng từng là tiên nô như ta với ngươi. Đào đến chết rồi vẫn đào.']] }] },
    '9-2': { title: 'Người Không Có Tên', steps: [{ gather: { loc: 'tien_khoang', hours: 2, label: 'Đào linh tủy theo ca' }, say: [['me', 'Lão tên thật là gì?'], ['tien_lai', 'Quên rồi. Ở đây ai cũng là số. Ta là số bốn trăm mười hai.'], ['me', 'Lão từng là gì trước khi phi thăng?'], ['tien_lai', 'Tông chủ một tông môn. Đồ đệ ta chắc vẫn đang đợi thư.']] }] },
    '10-0': { title: 'Người Từ Vạn Tiên Thành', steps: [{ go: 'van_tien', say: [['van_nguyet', 'Kẻ giết đốc công là ngươi? Ta tưởng phải to con hơn.'], ['me', 'Ngươi là ai?'], ['van_nguyet', 'Người giả làm ăn mày ba trăm năm để đếm xem có bao nhiêu kẻ bị xích. Đi theo ta, đừng ngẩng đầu.']] }] },
    '10-1': { title: 'Đường Áp Giải', steps: [{ go: 'tay_thien_mon', say: [['van_nguyet', 'Tây Thiên Môn là nơi người phi thăng bị đóng dấu rồi áp xuống mỏ. Chặn một chuyến cho ta xem.']] }, { hunt: { loc: 'tay_thien_mon', name: 'Thiên Binh Tây Môn', n: 4 }, say: [['narr', 'Mười bảy người trong xe áp giải nhìn ngươi. Không ai dám tháo xiềng, kể cả khi khóa đã mở.']] }] },
    '10-2': { title: 'Tờ Khai Của Lý Chưởng Quỹ', steps: [{ go: 'van_tien', say: [['tien_thuong', 'Ta bán đồ cho Thiên Đình, cũng bán cho Tán Tiên Minh. Đừng nhìn ta như thế, ai trả tiền thì là khách.'], ['me', 'Ai đang giám sát kẻ phi thăng?'], ['tien_thuong', 'Một sứ giả. Trong sổ của hắn có đủ thứ ngươi muốn biết.']] }] },
    '11-0': { title: 'Linh Tủy Đi Về Đâu', steps: [{ go: 'van_tien', say: [['van_nguyet', 'Thiên Đình tiêu chưa tới một phần mười số linh tủy đào lên. Phần còn lại chảy đi đâu?'], ['me', 'Lên Thánh Giới?'], ['van_nguyet', 'Ta cũng từng nghĩ vậy. Nhưng đường ống không đi lên, nó đi ra ngoài. Vậy kẻ thù của chúng ta không ở Lăng Tiêu Điện. Giờ thì sợ đi.']] }] },
    '11-1': { title: 'Dò Đường Ống', steps: [{ go: 'thien_ha', say: [['van_nguyet', 'Tinh Hồn làm tổ quanh đường ống. Dọn sạch để ta đo mạch.']] }, { hunt: { loc: 'thien_ha', name: 'Tinh Hồn', n: 5 }, say: [['narr', 'Áp tai vào đường ống, ngươi nghe tiếng cuốc rất xa vọng lại theo dòng linh tủy.']] }] },
    '11-2': { title: 'Về Lại Hầm Mỏ', steps: [{ go: 'tien_khoang', say: [['tien_lai', 'Con về thật à? Ta tưởng kẻ thoát rồi không ai ngoái lại.'], ['me', 'Lão vẽ cho con sơ đồ các hầm.'], ['tien_lai', 'Ba ngàn năm ta chỉ thuộc mỗi cái đó. Cầm lấy. Và nhớ ăn, trông con gầy lắm.']] }] },
    '12-0': { title: 'Bảy Ngày', steps: [{ go: 'van_tien', say: [['van_nguyet', 'Vết kiếm của ngươi lan tới tim rồi. Bảy ngày, không hơn.'], ['me', 'Cuộc chiến thì sao?'], ['van_nguyet', 'Người chết thì không chiến được. Đi Dao Trì.']] }] },
    '12-1': { title: 'Cửa Ao Sen', steps: [{ go: 'dao_tri', say: [['narr', 'Hộ vệ Dao Trì không nhận thư của Tán Tiên Minh. Họ chỉ nhận kẻ còn đứng được.']] }, { hunt: { loc: 'dao_tri', name: 'Dao Trì Hộ Vệ', n: 4 }, say: [['dao_tri_mau', 'Đủ rồi. Đứa nào mang kiếm khí của Thông Thiên mà còn đánh được, cứ để nó vào.']] }] },
    '12-2': { title: 'Lời Thú Nhận Của Thánh Mẫu', steps: [{ go: 'dao_tri', say: [['me', 'Vì sao bà giúp ta?'], ['dao_tri_mau', 'Hạo Thiên từng là một tiên nô như ngươi. Hắn thề sẽ đóng cửa mỏ.'], ['me', 'Rồi sao?'], ['dao_tri_mau', 'Rồi hắn ngồi lên ngai vàng. Con ta còn bị giữ dưới tay Cự Linh để ta không dám mở miệng.']] }] },
    '13-0': { title: 'Hội Quân', steps: [{ go: 'van_tien', say: [['van_nguyet', 'Sơ đồ của Bạch Lão Đầu, kiếm của ngươi, ba ngàn tán tiên. Đủ để đóng cửa một cái mỏ.'], ['me', 'Chỉ một cái?'], ['van_nguyet', 'Cái lớn nhất. Vô Quang Tiên Khoáng gãy thì Tiên Giới mất nguồn. Phải xong trước khi chúng đổi đốc công mới.']] }] },
    '13-1': { title: 'Hầm Dưới Cùng', steps: [{ go: 'tien_khoang', say: [['tien_lai', 'Tầng dưới cùng không có đèn. Mấy trăm năm nay người xuống đó đều không lên.']] }, { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 6 }, say: [['narr', 'Tầng dưới cùng là một cái hồ linh tủy. Bên bờ chất đầy những chiếc cuốc đã mòn nhẵn.']] }] },
    '13-2': { title: 'Ca Cuối', steps: [{ go: 'tien_khoang', say: [['me', 'Bỏ cuốc xuống. Từ hôm nay không còn ca nào nữa.'], ['tien_lai', 'Nghe chưa, số bốn trăm mười hai này ba ngàn năm mới được nghe câu đó.'], ['narr', 'Hàng vạn tiên nô đứng im. Rồi có người bật khóc, không ai biết nên đi về đâu.']] }] },
    '14-0': { title: 'Chiếu Chiêu An', steps: [{ go: 'van_tien', say: [['thai_bach', 'Vô Quang đã đóng. Bệ hạ không truy cứu, bệ hạ mời ngươi vào triều làm Tiên Quan.'], ['me', 'Kẻ ta vừa cướp mỏ của ông ta?'], ['thai_bach', 'Giết ngươi thì mất một tướng giỏi. Trong triều, ai cũng từng cướp của ai đó.'], ['van_nguyet', 'Nhận đi. Ba trăm năm ta không vào được cửa Lăng Tiêu, ngươi chỉ cần gật đầu.']] }] },
    '14-1': { title: 'Bước Vào Hàng Ngũ Tiên Quan', steps: [{ go: 'lang_tieu', say: [['thai_bach', 'Tiên Quan mới phải qua lễ thử giáp. Kim Giáp Tiên Tướng sẽ không nương tay đâu, họ ghét ngươi mà.']] }, { hunt: { loc: 'lang_tieu', name: 'Kim Giáp Tiên Tướng', n: 4 }, say: [['thai_bach', 'Đứng dậy đi, đại nhân. Từ hôm nay ngươi có ghế trong triều và cả một danh sách kẻ muốn ngươi chết.']] }] },
    '14-2': { title: 'Sổ Thuế Lăng Tiêu', steps: [{ gather: { loc: 'lang_tieu', hours: 3, label: 'Tra sổ thuế linh tủy' }, say: [['narr', 'Trang cuối sổ thuế có một dấu ấn đen không ai đọc được và tên Hạo Thiên ở dưới cùng, như chữ ký của một kẻ làm thuê.'], ['thai_bach', 'Ta không thấy ngươi đọc gì cả. Cổng Nam đêm mai đổi gác, ta cũng không biết điều đó.']] }] },
    '15-0': { title: 'Tiên Đế', steps: [{ go: 'lang_tieu', say: [['tien_de', 'Lại đây. Ngày ta đột phá cảnh giới này, ta cũng đứng ở đúng chỗ ngươi đứng.'], ['me', 'Bệ hạ từng là tiên nô.'], ['tien_de', 'Và ngươi đã lên tới Tiên Đế sau một đời. Trên trời chỉ có một ghế. Ngươi định làm gì?']] }] },
    '15-1': { title: 'Dư Đảng Thiên Binh', steps: [{ go: 'dong_thien_mon', say: [['van_nguyet', 'Tàn quân Nam Môn rút về Đông Thiên Môn. Đừng để chúng vây phía sau khi ngươi lên điện.']] }, { hunt: { loc: 'dong_thien_mon', name: 'Thiên Binh Đông Môn', n: 6 }, say: [['narr', 'Những thiên binh cuối cùng buông giáo. Nhiều người trong số họ có dấu ấn cũ trên cổ tay.']] }] },
    '15-2': { title: 'Lời Từ Biệt Dao Trì', steps: [{ go: 'dao_tri', say: [['dao_tri_mau', 'Ta đã chờ ngày này rất lâu, giờ lại không dám nhìn.'], ['me', 'Bà muốn con nói gì với ông ấy?'], ['dao_tri_mau', 'Không cần. Hắn biết tên mình từng là gì. Thế là đủ đau rồi.']] }] },

    '16-0': { title: 'Ngai Trống', steps: [{ go: 'lang_tieu', say: [['thai_bach', 'Bệ hạ băng hà, ngai vàng trống. Triều thần hỏi ngài có ngồi không.'], ['me', 'Không. Giao cho Vân Nguyệt và Tán Tiên Minh cùng cầm sổ.'], ['thai_bach', 'Vậy là Lăng Tiêu lần đầu có người đọc sổ mà không ăn sổ.']] }] },
    '16-1': { title: 'Tàn Binh Bắc Môn', steps: [{ hunt: { loc: 'bac_thien_mon', name: 'Thiên Binh Bắc Môn', n: 5 }, say: [['narr', 'Những kẻ còn trung thành với một ngai vàng trống đã buông giáo.']] }] },
    '16-2': { title: 'Sáu Nguồn Trong Thân', steps: [{ go: 'dao_tri', say: [['dao_tri_mau', 'Thần Cảnh Lục Nguyên, sáu nguồn lực chia sáu ngả. Ngươi có thấy thân mình như sáu con sông không?'], ['me', 'Sông nào cũng đòi đi riêng.'], ['dao_tri_mau', 'Vậy là đúng cảnh giới rồi.']] }] },
    '17-0': { title: 'Đại La', steps: [{ go: 'van_tien', say: [['van_nguyet', 'Đại La Kim Tiên. Cả Tiên Giới giờ đếm được trên đầu ngón tay.'], ['me', 'Mỏ thế nào rồi?'], ['van_nguyet', 'Đã có người trồng lại cỏ trên cửa hầm. Bạch Lão Đầu cười suốt ba ngày.']] }] },
    '17-1': { title: 'Tiễn Khách Giáo Phái', steps: [{ hunt: { loc: 'tiet_giao', name: 'Tiệt Giáo Ngoại Môn', n: 5 }, say: [['trieu_minh', 'Ha, lần trước đưa thư, lần này đến thử kiếm. Tiên Giới chật với ngươi rồi đấy.']] }] },
    '17-2': { title: 'Thước Đo Của Thánh', steps: [{ go: 'xien_giao', say: [['quang_thanh', 'Trên Đại La chỉ còn Chuẩn Thánh. Sư phụ ta nói kẻ đứng đó không thiếu sức, chỉ thiếu một thứ.'], ['me', 'Thứ gì?'], ['quang_thanh', 'Hồng Mông Tử Khí. Không có nó, Chuẩn Thánh ngồi tới mục xương.']] }] },
    '18-0': { title: 'Hồng Mông Tử Khí', steps: [{ go: 'da_bao', say: [['da_bao', 'Hồng Mông Tử Khí không ai cho không. Sáu món đồ cấp Thánh của ta, mỗi món giữ một đạo tử khí.'], ['me', 'Vì sao chỉ ngươi bán?'], ['da_bao', 'Vì ta không chịu ngồi ghế, mà xuống đây mở chợ. Đủ sáu món mới thành Thánh. Không bán chịu.']] }] },
    '18-1': { title: 'Tử Khí Không Rơi Từ Trời', steps: [{ hunt: { loc: 'da_bao', name: 'Thánh Giới Đạo Tặc', n: 5 }, say: [['da_bao', 'Lũ đó xuống đây giành tử khí của ngươi đấy. Giờ thì trả tiền đi.']] }] },
    '18-2': { title: 'Chuẩn Thánh Cả Đời', steps: [{ go: 'nhan_giao', say: [['huyen_do', 'Ta đứng ở Chuẩn Thánh đã tám vạn năm.'], ['me', 'Không có tử khí?'], ['huyen_do', 'Có tiền cũng không dám mua. Lên đó rồi thì không còn sư phụ để đổ lỗi nữa.']] }] },

    /* ----- Hồi III ----- */
    '19-1': { title: 'Tiên Nô Không Có Nhà', steps: [{ go: 'van_tien', say: [['van_nguyet', 'Hàng vạn tiên nô ra khỏi mỏ mà không biết về đâu. Thánh Nhân như ngươi giải quyết được chứ?'], ['me', 'Dọn sạch hầm trước, rồi chia đất.']] }, { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 4 }, say: [['tien_lai', 'Đời này ta chưa từng thấy Thánh Nhân cầm chổi dọn hầm.']] }] },
    '19-2': { title: 'Chính Sự', steps: [{ go: 'tu_tieu', say: [['thong_thien', 'Hôm nay nghị chuyện Tây Phương đòi thêm đất. Ngươi có ý kiến không?'], ['me', 'Đất của Tiên Giới, hỏi người Tiên Giới.'], ['thong_thien', 'Ha, ngồi được ba phiên đã biết cãi.']] }] },
    '20-0': { title: 'Đồng Tử Cười', steps: [{ go: 'bat_canh', say: [['dong_tu', 'Lên Chí Thánh rồi à? Giờ ngươi đủ tư cách nghe rồi. Trận đó sư phụ ta nhường ngươi đấy.'], ['me', 'Nhường?'], ['dong_tu', 'Cả sáu vị đều ở Đại Thánh Cảnh. Không vị nào là Thánh Nhân Sơ Kỳ như ngươi tưởng. Ngươi nhìn cái Thái Cực Đồ kia xem, nó còn chưa mở hết một phần.']] }] },
    '20-1': { title: 'Sổ Thuế Mới', steps: [{ go: 'lang_tieu', say: [['thai_bach', 'Thánh Nhân về thăm triều đình à? Thiên Đình Lệnh đã thôi không gửi tới ngài nữa.'], ['me', 'Vì sao?'], ['thai_bach', 'Thiên Đình không ra lệnh cho Thánh. Xin ngài xem giúp đám dư đảng.']] }, { hunt: { loc: 'dong_thien_mon', name: 'Thiên Binh Đông Môn', n: 4 }, say: [['narr', 'Một cái phất tay đã xong. Ngươi nhớ lại lần đầu đánh ở đây, đã phải rút kiếm ba lần.']] }] },
    '20-2': { title: 'Mắt Của Thánh', steps: [{ go: 'bat_canh', say: [['dong_tu', 'Sư phụ ta soi Vô Quang suốt ba ngày rồi. Ngươi biết người thấy gì không?'], ['me', 'Hầm mỏ và xác người.'], ['dong_tu', 'Ruộng lúa. Tiên nhân vừa gặt vừa hát. Ba ngàn năm nay cả sáu vị đều thấy thế. Có thứ gì đó nằm trên mắt các ngài.']] }] },
    '21-1': { title: 'Những Vị Thánh Mới', steps: [{ go: 'thanh_thi', say: [['van_nguyet', 'Cảm giác làm Thánh Nhân cũng thường thôi.'], ['me', 'Tỷ lên rồi à?'], ['van_nguyet', 'Nhờ ngươi mở rộng Thánh Giới. Giờ ở đây không còn chỉ bảy người nữa.']] }, { hunt: { loc: 'thanh_thi', name: 'Thánh Giới Tán Đồ', n: 6 }, say: [['narr', 'Toàn là Thánh Nhân mới, đánh một lần tan cả nhóm. Ngươi không còn phải rút kiếm.']] }] },
    '21-2': { title: 'Kiếm Ý Bích Du', steps: [{ go: 'bich_du', say: [['thong_thien', 'Đệ tử ta muốn thử ngươi. Giết nhẹ tay thôi, chúng còn phải quét đảo.']] }, { hunt: { loc: 'bich_du', name: 'Tiệt Giáo Kiếm Tiên', n: 6 }, say: [['thong_thien', 'Vết sẹo ta cho vẫn còn. Được, ngày mai dùng tay thật.']] }] },
    '22-0': { title: 'Ngoại Vực Thiên Ma', steps: [{ go: 'bich_du', say: [['thong_thien', 'Ta chém một kiếm vào chỗ ngươi chỉ. Có thứ rách ra, không phải của vũ trụ này.'], ['me', 'Là gì?'], ['thong_thien', 'Ngoại Vực Thiên Ma. Chúng che mắt sáu người bọn ta, dụ Hạo Thiên ký khế, rồi lập mỏ tiên nô ngay dưới chân Thánh Nhân. Nhục lắm, nhóc ạ.']] }] },
    '22-1': { title: 'Kim Cương Không Chớp Mắt', steps: [{ go: 'cuc_lac', say: [['narr', 'Người ở Cực Lạc mỉm cười giống hệt nhau. Không ai trả lời khi ngươi hỏi đường.']] }, { hunt: { loc: 'cuc_lac', name: 'Kim Cương Hộ Pháp', n: 6 }, say: [['narr', 'Kim Cương ngã xuống vẫn mỉm cười. Bên trong họ rỗng như vỏ ve.']] }] },
    '22-2': { title: 'Thư Về Thanh Vân', steps: [{ gather: { loc: 'tu_tieu', hours: 3, label: 'Tìm khe truyền âm về phàm giới' }, say: [['to_dao', '(Giọng nói rất xa) Đệ cao đến đâu rồi?'], ['me', 'Cao tới mức sắp không ai biết nữa.'], ['to_dao', 'Vậy thì nhớ xuống ăn cơm.']] }] },

    /* ----- Hồi IV ----- */
    '23-0': { title: 'Thiên Ma Ngoại Vực', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Khách mới à? Ngồi đi. Chuẩn Thiên, Diệt Thiên, Khai Thiên, tên nghe to thật. Thực ra đều là đi tới tận cùng Đạo của mình thôi.'], ['me', 'Quán này ai mở?'], ['ly_khach', 'Một kẻ lười không muốn đi tiếp. Đừng học ta.']] }] },
    '23-1': { title: 'Bữa Ăn Đầu Tiên Ở Cực Đạo', steps: [{ hunt: { loc: 'vo_cuong', name: 'Cực Đạo Tán Tu', n: 6 }, say: [['ly_khach', 'Dọn cửa xong rồi thì ăn đi. Vũ trụ của ngươi tên gì?'], ['me', 'Nó có tên sao?'], ['ly_khach', 'Vụ thứ ba ngàn. Đó là tên trong sổ.']] }] },
    '23-2': { title: 'Tin Đồn Vạn Giới', steps: [{ go: 'van_gioi', say: [['narr', 'Trên xác một thế giới có tấm bia khắc đúng những cái tên giống Lục Thánh, viết bằng thứ chữ khác.'], ['ly_khach', 'Vụ nào cũng có sáu vị Thánh bị che mắt. Đổi người, không đổi tấm màn.']] }, { go: 'van_gioi', say: [['thai_so', 'Sáu đứa đó ta dạy cả. Thái Thanh còn sợ ta không?'], ['me', 'Lão là ai?'], ['thai_so', 'Là kẻ đứng sau ghế. Ở đây ai cũng đứng sau một cái ghế nào đó.']] }, { go: 'van_gioi', say: [['narr', 'Những sợi màn đen vẫn còn nối từ đây về Tiên Giới, và đầu bên này có thứ đang nắm lấy.'], ['thong_thien', '(Từ rất xa) Sáu chúng ta chống trời cho ngươi. Cứ chém đi, nhóc.']] }, { hunt: { loc: 'van_gioi', name: 'Ngoại Vực Thiên Ma', n: 6 } }, { boss: 'thien_ma_chu', say: [['narr', 'Thiên Ma Chủ tan ra, sợi màn cuối cùng đứt. Khe nứt dưới đài sen khép lại.'], ['nu_oa', '(Từ rất xa) Con về chưa? Về ăn đi.']] }] },
    '24-0': { title: 'Đáy Sổ', steps: [{ go: 'van_gioi', say: [['ly_khach', 'Khôi lỗi kia gặt xong một vụ thì đi đâu, ngươi có nghĩ tới không?'], ['me', 'Về nơi nào đó nộp sổ.'], ['ly_khach', 'Đúng. Và nơi đó tên là Thần Đình.']] }] },
    '24-1': { title: 'Tàn Hồn Không Đi', steps: [{ hunt: { loc: 'van_gioi', name: 'Tàn Hồn Vạn Giới', n: 6 }, say: [['narr', 'Tàn hồn cuối cùng nắm tay áo ngươi, hỏi: "Vụ của ta gặt xong chưa?"']] }] },
    '24-2': { title: 'Sứ Giả Luân Hồi', steps: [{ go: 'luan_hoi', say: [['ly_khach', 'Biển này giữ hết các đời của ngươi. Đừng soi lâu.'], ['me', 'Lão từng soi?'], ['ly_khach', 'Vì thế mới mở quán.']] }, { hunt: { loc: 'luan_hoi', name: 'Luân Hồi Sứ', n: 6 }, say: [['huyen_mau', 'Nữ Oa nặn người, còn ta nặn Nữ Oa. Đừng nhìn ta như thế, ai rồi cũng có mẹ.']] }] },
    '25-0': { title: 'Một Kiếp Cầm Chổi', steps: [{ go: 'luan_hoi', say: [['narr', 'Trong nước hiện lên {vision}.'], ['me', 'Là ai đang chờ ai?']] }] },
    '25-1': { title: 'Nghiệp Long Con', steps: [{ hunt: { loc: 'luan_hoi', name: 'Nghiệp Long', n: 5 }, say: [['narr', 'Mỗi con Nghiệp Long ngã xuống trả lại ngươi một mảnh ký ức không phải của đời này.']] }] },
    '25-2': { title: 'Câu Hỏi Của Lữ Khách', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Biết được bao nhiêu kiếp rồi?'], ['me', 'Đời nào ta cũng tới đây.'], ['ly_khach', 'Đời nào ta cũng hỏi câu này. Ăn đi, nguội rồi.']] }, { go: 'thien_kiem', say: [['kiem_to', 'Thông Thiên chém được một vết trên ngươi à? Vết đó là ta dạy nó.'], ['me', 'Ở đây còn bao nhiêu người như lão?'], ['kiem_to', 'Đếm làm gì. Ngươi tưởng Chí Thượng chỉ có vài người sao?']] }] },
    '26-0': { title: 'Kẻ Không Có Trời', steps: [{ go: 'khai_thien', say: [['hoang_cong', 'Ở đây lửa muốn cháy kiểu gì thì cháy. Ngươi muốn tạo trời à? Trước hết tập làm cái lò đã.'], ['me', 'Khác gì nhau?'], ['hoang_cong', 'Lò hỏng thì đổi lò. Trời hỏng thì có người chết.']] }] },
    '26-1': { title: 'Thú Hư Không', steps: [{ hunt: { loc: 'khai_thien', name: 'Hư Không Thú', n: 6 }, say: [['hoang_cong', 'Da nó không nhớ hình dạng, cho nên rất hợp làm vách trời.']] }] },
    '26-2': { title: 'Tên Ngọn Gió', steps: [{ go: 'khai_thien', say: [['hoang_cong', 'Mọi thế giới phải bắt đầu bằng một thứ gì đó. Ngươi chọn gì?'], ['me', '{windLine}'], ['hoang_cong', 'Nhỏ thế? Thôi được, kẻ chọn thứ lớn đều thành Thiên Đạo cả.']] }, { go: 'tinh_mo', say: [['van_kiep', 'Mỗi ngôi sao ở đây là một Chí Thượng đã dừng lại. Ngươi định dừng ở đâu?'], ['me', 'Chưa biết.'], ['van_kiep', 'Tốt. Người biết rồi đều nằm ở đây.']] }] },
    '27-0': { title: 'Chúng Sinh Của Ta', steps: [{ go: 'khai_thien', say: [['narr', 'Trong thế giới nhỏ của ngươi có một loài rêu vừa mọc. Ngươi canh nó suốt ba tháng.'], ['ly_khach', 'Coi chừng. Thiên Đạo cũng bắt đầu bằng việc thương một đám rêu.']] }] },
    '27-1': { title: 'Thám Tử Của Trời', steps: [{ go: 'than_dinh', say: [['narr', 'Đạo Vệ tuần tra đang kiểm kê từng thế giới mới sinh. Thế giới của ngươi đã có số.']] }, { hunt: { loc: 'than_dinh', name: 'Đạo Vệ', n: 6 }, say: [['narr', 'Trên giáp Đạo Vệ có một dãy số. Số cuối cùng là mã thế giới của ngươi.']] }] },
    '27-2': { title: 'Tiếng Bánh Răng', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Cỗ máy đó không ác. Nó chỉ đếm.'], ['me', 'Cái đếm đó giết người.'], ['ly_khach', 'Phải. Từ lúc ra đời, kẻ làm sổ sách đã giết nhiều hơn kẻ cầm gươm.']] }] },
    '28-0': { title: 'Ngọn Đèn Cuối Hành Lang', steps: [{ go: 'than_dinh', say: [['narr', 'Thần Đình rỗng hơn ngươi nghĩ. Hành lang dài vô tận chỉ có một ngọn đèn ở cuối.']] }] },
    '28-1': { title: 'Thiên Phạt Lần Cuối', steps: [{ hunt: { loc: 'than_dinh', name: 'Thiên Phạt Sứ', n: 8 }, say: [['narr', 'Thiên Phạt Sứ cuối cùng cúi đầu trước khi tan. Hình như nó đã mệt từ lâu.']] }] },
    '28-2': { title: 'Bữa Cơm Trước Khi Đi', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Thua thì quay lại trả nợ, thắng thì cũng phải trả.'], ['me', 'Tiền cơm bao nhiêu?'], ['ly_khach', 'Ngươi là kẻ đầu tiên hỏi. Ngày mai ta nói.']] }] },

    /* ----- Hồi VI, VII ----- */
    '30-2': { title: 'Tiếng Gọi Từ Đạo Thai', steps: [{ go: 'dao_thai', say: [['narr', 'Đạo Thai đập như một trái tim. Mỗi nhịp là một câu hỏi không có lời. Xung quanh chỉ có ngươi.']] }, { go: 'hon_the', say: [['thich_thien', 'Trên kia có gì?'], ['me', 'Tiếng chổi.'], ['thich_thien', 'Vậy thì ngươi sắp xong rồi.']] }] },
    '31-1': { title: 'Ký Ức Hồ', steps: [{ go: 'ky_uc_ho', say: [['narr', '{memory} Không có ai để hỏi đó là tay của ai.']] }, { go: 'tien_khoang', say: [['tien_lai', 'Lại về nữa à? Ở đây cỏ mọc cả rồi.'], ['me', 'Lão còn nhớ số bốn trăm mười hai không?'], ['tien_lai', 'Nhớ. Mà tên thật ta nhớ ra rồi, con muốn nghe không?']] }] },
    '31-2': { title: 'Chiếc Đò Không Người', steps: [{ go: 'truong_ha', say: [['narr', 'Một chiếc đò cũ đậu ở bến, sào đã mòn. Không có người lái. Ngươi tự đẩy nó ra.']] }, { go: 'vo_cuong', say: [['ly_khach', 'Tiền cơm bao nhiêu, ngươi hỏi từ lâu rồi.'], ['me', 'Bao nhiêu?'], ['ly_khach', 'Hết rồi. Ngươi ăn ở đây bao nhiêu đời cũng đúng bằng số việc ngươi đã làm.']] }] }
};

const MAIN_FINAL_STAGE = 3;
const CHAPTER_ACT_REALMS = [8, 18, 22, 28, 29, 30, 31];

function chapterAct(realm) {
    return CHAPTER_ACT_REALMS.findIndex(top => realm <= top) + 1;
}

/* Nhiệm vụ mở khóa nằm ở Đại Viên Mãn; các hồi đặc biệt giữ tiểu cảnh riêng */
const MAIN_STAGE_FIX = { m32: 2, m31: 1, m35: 1, m38: 3 };

/* Từ Tiên Quan: Lăng Tiêu sai đi đưa thư tới giáo phái của Lục Thánh ở Tiên Giới, chen giữa đường lên Tiên Đế */
const SECT_ERRANDS = [
    { go: 'nhan_giao', say: [['thai_bach', 'Tiên Quan mới phải đích thân đưa thiếp tới các giáo phái của Thánh Nhân. Lục Thánh ở trên, nhưng người của họ ở dưới này.'], ['huyen_do', 'Chưởng giáo ở Thủ Dương Sơn không làm gì cả, đó là giáo lý. Thiếp để đấy, ngươi về đi.']] },
    { go: 'xien_giao', say: [['quang_thanh', 'Tên ngươi không có trong sổ thiên mệnh Xiển Giáo chép.'], ['me', 'Vậy ta là ai?'], ['quang_thanh', 'Là lỗi chính tả. Sư phụ không thích lỗi chính tả.']] },
    { go: 'tiet_giao', say: [['trieu_minh', 'Tiệt Giáo không nhận thiếp. Rút kiếm trước đã.']] }, { hunt: { loc: 'tiet_giao', name: 'Tiệt Giáo Ngoại Môn', n: 3 }, say: [['trieu_minh', 'Khá. Thông Thiên sư phụ sẽ thích ngươi, đó không phải chuyện may đâu.']] },
    { go: 'oa_giao', say: [['bich_tieu', 'Mỗi pho tượng ở đây là một giống loài. Nương Nương vẫn đến thăm chúng.'], ['me', 'Có tượng của ta không?'], ['bich_tieu', 'Không. Lạ thật, ai cũng có.']] },
    { go: 'tay_giao', say: [['di_lac', 'Tây Phương giáo dạy chịu khổ. Ngươi từng dưới mỏ, ngươi nói xem khổ có ích gì?'], ['me', 'Có ích cho kẻ thu thuế.'], ['di_lac', 'Ha. Câu đó đừng nói trước mặt hai vị giáo chủ.']] }
];

MAIN_CHAPTERS['14-1'].steps.push(...SECT_ERRANDS.slice(0, 2));
MAIN_CHAPTERS['14-2'].steps.unshift(...SECT_ERRANDS.slice(2));

/* Hồi V: gặp đủ sáu Đạo Giả trước các trận luận đạo */
const DAO_GIA_MEETINGS = {
    m31: [{ go: 'thai_so_thuy', say: [['hd_vo_thuc', '...'], ['me', 'Lão có nghe ta nói không?'], ['hd_vo_thuc', 'Nghe. Chưa quyết định có tồn tại hay không.']] }, { go: 'ma_than_mo', say: [['hd_thu_cuu', 'Ta là Hỗn Độn thứ chín. Tám cái trước ta đều đã chết, kể cả cái đang đứng nói chuyện với ngươi.'], ['hd_thu_cuu', 'Đứa ngươi gặp ở Thái Sơ Thủy là con ta. Nó chưa quyết định có tồn tại hay không, ta là cha nên chờ được.']] }],
    m32: [{ go: 'hon_kiem', say: [['am_duong', 'Âm dương của ta không vướng một hạt bụi. Vũ trụ của ngươi thì toàn bụi.']] }, { go: 'vo_chung_lau', say: [['am_duong', 'Mọi thứ đều diệt. Ta chỉ đến sớm một chút.']] }, { go: 'hon_the', say: [['thich_thien', 'Trời của ngươi ta đã thích, đã hết. Ngươi còn định bước tiếp?']] }, { go: 'hai_tam', say: [['thich_thien', 'Vô lượng vũ trụ, vô lượng lần diệt. Ngươi là lần thứ mấy, tự ngươi đếm đi.']] }]
};
Object.entries(DAO_GIA_MEETINGS).forEach(([id, steps]) => QUEST_INDEX[id].steps.unshift(...steps));

MAIN_QUESTS.forEach(q => {
    if (q.unlock != null) q.needs = [q.needs[0], MAIN_FINAL_STAGE];
    if (MAIN_STAGE_FIX[q.id] != null) q.needs = [q.needs[0], MAIN_STAGE_FIX[q.id]];
});

Object.entries(MAIN_CHAPTERS).forEach(([key, chapter]) => {
    const [realm, stage] = key.split('-').map(Number);
    const quest = { ...chapter, id: `mc${realm}_${stage}`, act: chapterAct(realm), needs: [realm, stage], chapter: true, reward: { hours: 1 + stage, goldRefs: 4 + stage * 2 } };
    MAIN_QUESTS.push(quest);
    QUEST_INDEX[quest.id] = quest;
});
MAIN_QUESTS.sort((a, b) => a.needs[0] - b.needs[0] || a.needs[1] - b.needs[1]);

/* Chuyện riêng của từng NPC: nghe lần lượt, chuyện sau mở theo cảnh giới. Chuỗi là lời của chính NPC, cặp ['me', ...] là lời người chơi */
const NPC_STORIES = {
    tien_de: [
        { from: 14, lines: ['Ngươi nhìn cái ngai này bằng ánh mắt của kẻ từng cầm cuốc. Ta nhận ra, vì ta cũng từng nhìn nó như thế.', ['me', 'Bệ hạ từng là số mấy?'], 'Số bảy mươi ba. Vô Quang, tầng thứ chín. Trên cổ tay ta vẫn còn sẹo, ta đeo vòng vàng để che.'] },
        { from: 14, lines: ['Ngày ta lên ngai, ta thề đóng mỏ trong ba trăm năm.', ['me', 'Vì sao không đóng?'], 'Hôm sau trên bàn ta có một tờ khế không ai mang tới. Ta đọc xong, hiểu rằng ngai vàng này cũng là một cái cuốc, chỉ là mạ vàng.'] },
        { from: 15, lines: ['Dao Trì vẫn pha trà cho ta mỗi sáng, và chưa bao giờ nhìn vào mắt ta nữa.', ['me', 'Bệ hạ có hối hận không?'], 'Mỗi ngày. Nhưng đừng nói với ai. Tiên Đế mà hối hận thì thiên binh sẽ tính lại tiền lương.'] }
    ],
    thai_thanh: [
        { from: 19, lines: ['...', ['me', 'Thánh Nhân có nghe ta nói không?'], 'Nghe. Ta đang không trả lời. Đó cũng là một câu trả lời.'] },
        { from: 20, lines: ['Đồng tử nói với ngươi rồi. Phải, ta nhường.', ['me', 'Vì sao?'], 'Nếu ta không nhường, ngươi chết. Nếu ngươi chết, ta lại phải làm một việc. Ta không thích làm việc.'] },
        { from: 22, lines: ['Ngày xưa ta có một sư phụ. Người dạy ta chữ Vô Vi rồi đi mất.', ['me', 'Người đi đâu?'], 'Đi đâu thì ngươi sắp biết. Ta chọn ngồi im vì chỉ cần ta động, người ấy sẽ nhìn xuống.'] },
        { from: 24, lines: ['Thái Sơ vẫn khỏe chứ?', ['me', 'Lão ấy hỏi ngươi còn sợ không.'], 'Bảo với người: còn. Và nhờ ngươi nói thêm, lò đan của con vẫn chưa tắt.'] }
    ],
    nguyen_thuy: [
        { from: 19, lines: ['Ngồi thẳng. Thánh Nhân không ngồi vắt chân ở Ngọc Hư.', ['me', 'Thiên mệnh có quy định chuyện đó?'], 'Quyển ba trăm mười hai, trang sáu. Ta chép tay.'] },
        { from: 20, lines: ['Ta không nhường ngươi. Ta chỉ dùng đúng lượng sức trong sổ ghi.', ['me', 'Sổ ghi ta thua?'], 'Sổ không có tên ngươi. Đó là lần đầu trong đời ta chép đến một dòng trống, và tay ta run.'] },
        { from: 21, lines: ['Ngươi có biết vì sao ta ghét Thông Thiên không?', ['me', 'Vì đệ tử của hắn không có quy củ.'], 'Vì hắn nhận tất cả mọi người, còn ta đã từ chối rất nhiều. Trong số đó có người ta không ngủ được khi nhớ tới.'] }
    ],
    thong_thien: [
        { from: 19, lines: ['Nhóc! Lại đây, uống đi. Rượu này nấu từ kiếm khí, lần đầu sẽ hơi rát cổ.', ['me', 'Thánh Nhân nào cũng uống thế này?'], 'Không. Năm người kia đều nghĩ uống là mất thể diện. Vì vậy ta mới rảnh mà rủ ngươi.'] },
        { from: 20, lines: ['Vết chém năm đó, ta dùng một phần vạn sức thôi. Giờ biết rồi đừng giận.', ['me', 'Ta giận thì sao?'], 'Thì tốt! Giận thì mới mài kiếm. Năm kẻ kia nhường ngươi vì lười, ta nhường vì muốn sau này có người đánh tử tế với ta.'] },
        { from: 21, lines: ['Tiệt Giáo nhận cả yêu, cả quỷ, cả tên ăn trộm. Bị chửi suốt vạn năm.', ['me', 'Ngươi có hối hận không?'], 'Trong đám đó có một đứa từng quét đảo cho ta. Giờ nó là kiếm tiên giỏi nhất ta có. Hối hận cái gì.'] },
        { from: 25, lines: ['Bất Hủ Kiếm Tổ khen ngươi à? Ông già đó chưa từng khen ta một câu.', ['me', 'Lão nói vết sẹo của ta là lão dạy ngươi.'], 'Ha! Vậy thì ngươi cũng coi như đồ tôn của ta. Mời rượu đi.'] }
    ],
    nu_oa: [
        { from: 19, lines: ['Con ăn gì chưa?', ['me', 'Thánh Nhân không cần ăn.'], 'Ta biết. Nhưng ta nặn ra cả muôn loài, câu đầu tiên ta học là câu đó.'] },
        { from: 20, lines: ['Có đứa nào nói với con là ta nhường chưa? Ta chỉ không nỡ.', ['me', 'Khác gì nhau?'], 'Thái Thanh nhường vì lười, ta không nỡ vì con vẫn còn nhỏ. Sau này con sẽ hiểu, nhìn gì ta cũng thấy là con mình.'] },
        { from: 21, lines: ['Hạo Thiên cũng từng là đứa trẻ ta nặn từ đất ven sông. Ta nhớ cả ngón tay út hắn cong.', ['me', 'Người có giận ta không?'], 'Đất về với đất. Ta chỉ tiếc chưa kịp hỏi hắn đã ăn gì chưa.'] },
        { from: 26, lines: ['Huyền Minh là mẹ ta, con gặp rồi. Bà có khỏe không?', ['me', 'Bà ấy nói ai rồi cũng có mẹ.'], 'Vẫn vậy. Mấy vạn năm bà chưa từng hỏi ta đã ăn gì chưa. Có lẽ vì thế ta mới hỏi tất cả mọi người.'] }
    ],
    chuan_de: [
        { from: 19, lines: ['Thí chủ thấy Tây Phương nghèo không?', ['me', 'Đất cằn, người ít.'], 'Đúng vậy. Vì thế bần đạo phải nói thêm nhiều lời để xin đất của người khác. Đừng cười.'] },
        { from: 20, lines: ['Sư huynh Tiếp Dẫn khóc thật đấy, không phải diễn. Còn ta thì diễn.', ['me', 'Người diễn gì?'], 'Diễn tin rằng khổ là có ích. Có người phải tin, thì chúng sinh mới chịu sống qua mùa đông.'] }
    ],
    tiep_dan: [
        { from: 19, lines: ['Mỗi người khổ, ta đều nghe được. Riêng Tiên Giới im lặng lạ lùng.', ['me', 'Vì thế mặt người lúc nào cũng buồn?'], 'Mặt ta đã thế từ trước. Chỉ là bây giờ có lý do.'] },
        { from: 20, lines: ['Ta không nhường con. Lúc đó ta đang nghe một đứa bé ở phàm giới khóc, nên quên mất mình đang đánh.', ['me', 'Đứa bé đó thế nào?'], 'Nó nín rồi. Ta đánh tiếp thì con đã đi.'] }
    ],
    thai_bach: [
        { from: 14, lines: ['Ta làm sứ giả từ đời trước Hạo Thiên. Ta đã đọc chiếu phong cho ba Tiên Đế, và đọc điếu văn cho hai.', ['me', 'Lão không ngán sao?'], 'Giọng ta hợp với cả hai loại văn. Sống lâu trong triều là nhờ có một giọng như thế.'] },
        { from: 19, lines: ['Không còn Thiên Đình Lệnh cho ngài nữa, thưa Thánh Nhân. Sổ công lao của ngài ta đóng lại rồi.', ['me', 'Có tiếc không?'], 'Ngài là tờ công lao dày nhất ta từng phê. Ta giữ nó trong tay áo, đừng nói với ai.'] }
    ],
    da_bao: [
        { from: 18, lines: ['Ngươi biết vì sao ta bỏ ghế Thánh xuống đây bán hàng không?', ['me', 'Vì lãi cao?'], 'Vì trên ghế ai cũng nói chuyện lý tưởng. Dưới chợ người ta nói thật, nhất là lúc trả giá.'] },
        { from: 22, lines: ['Đồ Thiên ta không bán, Tử Tiêu Thị mới bán. Chỗ đó trả tiền thuê cho ta.', ['me', 'Thì ra vẫn là ngươi.'], 'Làm ăn thôi. Đừng nói với Nguyên Thủy.'] }
    ],
    ly_khach: [
        { from: 23, lines: ['Ngươi ăn cay được không?', ['me', 'Ở đây cũng có ớt?'], 'Không. Có người trồng thử một cây trên xác thế giới của hắn. Hắn chết rồi, cây vẫn ra quả.'] },
        { from: 26, lines: ['Ta từng là Nghịch Thiên Cảnh, đứng trước Thần Đình và ngồi xuống mở quán.', ['me', 'Vì sao dừng lại?'], 'Vì nhìn thấy một đứa nhóc đang đói. Bây giờ thì quên mất nó là ai rồi.'] }
    ],
    van_nguyet: [
        { from: 10, lines: ['Ba trăm năm ăn mày, thứ ta học được nhiều nhất là nhìn giày người khác.', ['me', 'Giày ta thế nào?'], 'Rách, nhưng buộc chặt. Ngươi định đi xa đấy.'] },
        { from: 19, lines: ['Ngươi nhớ lúc đầu ta bảo đừng ngẩng đầu không?', ['me', 'Nhớ.'], 'Giờ ta ngẩng đầu thì thấy ngươi. Cái cổ này đau lắm, thôi ngồi xuống đi.'] }
    ],
    tien_lai: [
        { from: 9, lines: ['Ca này nặng lắm, con ăn đi.', ['me', 'Phần của lão đâu?'], 'Người già ăn ít. Trên mỏ mà nói câu đó thì đã là chuyện cười rồi.'] },
        { from: 19, lines: ['Thánh Nhân về thăm lão già này à? Quỳ hay đứng đây?', ['me', 'Ngồi đi, lão.'], 'Ha, số bốn trăm mười hai được Thánh Nhân mời ngồi. Đồ đệ ta mà biết chắc chắn không tin.'] }
    ],
    dao_tri_mau: [
        { from: 11, lines: ['Sen trong ao này nở từ trước khi Thiên Đình có tên.', ['me', 'Bà trồng?'], 'Con ta trồng. Giờ ta chỉ tưới.'] },
        { from: 16, lines: ['Hắn đi rồi, sáng nay ta vẫn pha hai chén trà.', ['me', 'Con xin lỗi.'], 'Đừng. Hắn nói đúng một câu trước khi chết: mỏ không dừng bởi người chết. Vậy thì con đi mà dừng nó.'] }
    ],
    to_dao: [
        { from: 1, lines: ['Đệ lại quên ăn.', ['me', 'Sư tỷ đoán sao hay vậy?'], 'Mặt đệ lúc nào quên ăn trông giống hệt lúc mới vào sơn môn.'] },
        { from: 19, lines: ['Nghe nói đệ thành Thánh rồi. Ở đây vẫn phải tự rửa bát.', ['me', 'Dạ.'], 'Tốt. Ở đâu đó trên trời đệ làm gì ta không quản, ở Thanh Vân thì vẫn là sư đệ.'] }
    ],
    mac: [
        { from: 0, lines: ['Lá rụng rồi lại rụng. Quét cho sạch làm gì, con hỏi đi.', ['me', 'Làm gì ạ?'], 'Để có chuyện làm trong khi chờ.'] },
        { from: 19, lines: ['Cao vậy mà vẫn nhớ đường về à.', ['me', 'Lão quét lá ở đây từ bao giờ?'], 'Từ lúc cái sân này chưa có lá. Con về ăn tối nhé.'] }
    ],
    dong_tu: [
        { from: 19, lines: ['Sư phụ bảo quạt lò thì ta quạt. Sư phụ không bảo dừng, nên ta quạt tám vạn năm.', ['me', 'Có mỏi không?'], 'Người mỏi mà nói ra thì sẽ phải làm thêm việc khác.'] }
    ],
    huyen_do: [{ from: 14, lines: ['Nhân Giáo dạy người ta làm người trước khi thành tiên. Khó hơn thành tiên nhiều.', ['me', 'Pháp sư thành chưa?'], 'Một nửa. Còn nửa kia cũng đang tu.'] }],
    quang_thanh: [{ from: 14, lines: ['Ta đã chép thiên mệnh tám ngàn năm, chưa từng sai một chữ.', ['me', 'Có từng chép sai ý không?'], 'Chữ của sư phụ, ý của sư phụ. Câu hỏi của ngươi sẽ khiến ta bị phạt.'] }],
    trieu_minh: [{ from: 14, lines: ['Hữu giáo vô loại, đệ tử Tiệt Giáo ai cũng từng là kẻ không ai cần.', ['me', 'Ngài thì sao?'], 'Ta từng là một con hổ đói. Sư phụ cho ăn, không hỏi vì sao hổ biết nói.'] }],
    bich_tieu: [{ from: 14, lines: ['Ta lau bụi cho các tượng. Mỗi ngày một ngàn pho.', ['me', 'Bao giờ xong?'], 'Không bao giờ, Nương Nương vẫn nặn thêm.'] }],
    di_lac: [{ from: 14, lines: ['Ta luôn cười, vì Tiếp Dẫn đã khóc phần của ta rồi.', ['me', 'Thật à?'], 'Không. Ta cười vì nếu không cười thì ta cũng khóc.'] }],
    thai_so: [{ from: 23, lines: ['Sáu đứa đó không biết ta còn ở đây, chúng tưởng ta chỉ là một Thánh Nhân mạnh hơn chút đã đi xa.', ['me', 'Lão là Đại Đạo Chí Thượng?'], 'Tên đó chỉ nghe được ở đây thôi. Dưới kia có nói cũng không ai nhớ.'] }],
    huyen_mau: [{ from: 24, lines: ['Ta sinh ra cái gì đều bị nó quên.', ['me', 'Nữ Oa vẫn nhớ người.'], 'Vậy sao? Nó vẫn hỏi người khác đã ăn gì chưa à. Đứa ngốc.'] }],
    kiem_to: [{ from: 25, lines: ['Ta chém đứt được mọi thứ, trừ một câu nói của sư phụ.', ['me', 'Câu gì?'], 'Quên rồi, chỉ nhớ là chém không đứt.'] }],
    van_kiep: [{ from: 26, lines: ['Ngươi đã chết ở chỗ này tám lần trong các kiếp trước.', ['me', 'Lần này thì sao?'], 'Lần này ta chưa đếm xong.'] }],
    vo_danh: [{ from: 29, lines: ['Tên của ta dài vì mỗi vũ trụ gọi một đoạn. Không ai nghe hết một lần.', ['me', 'Ngươi có nhớ hết không?'], 'Không. Ta chỉ nhớ đoạn cuối, đoạn đó là ngươi vừa thêm vào.'] }],
    vong_ky: [{ from: 29, lines: ['Chín hậu duệ của ta đều mang tên ta. Lần nào gọi một đứa, tám đứa kia cũng quay lại.', ['me', 'Bọn họ đâu?'], 'Trong tay áo ta. Chúng đang ngủ.'] }],
    hd_vo_thuc: [{ from: 29, lines: ['...', ['me', 'Chỉ có thế thôi sao?'], '...'] }],
    hd_thu_cuu: [{ from: 29, lines: ['Lần sau gặp nhau, người đứng đây sẽ là Hỗn Độn thứ mười.', ['me', 'Ngươi sợ à?'], 'Ta đã là người thứ chín được nghe câu đó.'] }],
    am_duong: [{ from: 29, lines: ['Đừng chạm vào áo ta.', ['me', 'Bẩn à?'], 'Không. Ngươi sẽ thấy mình bẩn.'] }, { from: 29, lines: ['Ta ngồi với mọi thứ trong phút cuối của chúng.', ['me', 'Có đáng sợ không?'], 'Không. Chỉ yên tĩnh thôi.'] }],
    thich_thien: [{ from: 29, lines: ['Ta từng thích một vũ trụ, rồi ta thích hết nó.', ['me', 'Nghĩa là sao?'], 'Là ăn. Đừng hỏi thêm.'] }, { from: 29, lines: ['Vô lượng diệt nghĩa là không đếm được ta đã diệt bao nhiêu thứ.', ['me', 'Còn sinh ra thì sao?'], 'Câu đó chưa từng có ai hỏi. Ngồi xuống đây.'] }],
};

/* Cư dân: mỗi người một chuyện theo Giới, chọn cố định theo người */
const RESIDENT_TALES = {
    pham: ['Con trai ta bảo đi Thanh Vân tu tiên, ba mươi năm rồi chưa về.', 'Năm mất mùa, có một lão già đi ngang gieo hạt rồi biến mất. Lúa năm đó mọc tới ngực.', 'Ta đi chợ hai mươi dặm chỉ để nghe chuyện về người phi thăng.'],
    tien: ['Ta từng là Nguyên Anh lẫy lừng ở phàm giới. Lên đây ta bán nước.', 'Ban đêm ở đây cũng nghe tiếng cuốc, dù mỏ đã xa lắm.', 'Thuế linh tủy năm nay lại tăng. Không ai biết lên tới đâu.'],
    thanh: ['Ai cũng tưởng Thánh Nhân sống sung sướng. Ta quét sân cho một vị, người chưa từng nói với ta một câu.', 'Có lời đồn trên Thánh còn một thứ cao hơn chút. Chắc chỉ là Thánh già hơn thôi.', 'Từ khi Thánh Giới mở rộng, chợ ở đây đông hẳn.'],
    thien: ['Ở Thiên Ma Ngoại Vực không ai hỏi quê quán. Vì quê của ai cũng đã bị gặt.', 'Ta đứng ở đây đã ba kiếp rồi, vẫn không hiểu vì sao mình đứng.', 'Đừng nói to. Ở đây một lời có thể đánh thức thứ mà ngươi không muốn nó dậy.'],
    hondon: ['Ta quên mất mình có phải là người không. Ngươi thấy sao?', 'Ở đây khái niệm cũng cần phải đi kiếm ăn.', 'Một ngày ở đây dài bằng một vũ trụ, hoặc ngắn hơn, tùy tâm trạng.']
};
