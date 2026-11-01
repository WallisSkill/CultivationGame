/* ===========================================================
   HỒI TRUYỆN THEO TIỂU CẢNH GIỚI
   Mỗi cảnh giới: Sơ Kỳ, Trung Kỳ, Hậu Kỳ là các hồi nhỏ, Đại Viên Mãn là nhiệm vụ mở khóa đột phá.
   Khóa: "cảnh giới-tiểu cảnh", bước giống MAIN_QUESTS.
=========================================================== */
Object.assign(NPCS, {
    thai_bach: { name: 'Thái Bạch Tinh Quân', title: 'Sứ giả Lăng Tiêu', look: NPC_LOOK('m', 0, '#f0e6c8', '#dbe8f7', { beard: true, crown: 'guan', weapon: 'fan', weaponColor: '#f5f5f5' }) }
});

const MAIN_CHAPTERS = {
    /* ----- Hồi I ----- */
    '0-1': { title: 'Vết Tro Trên Tay', steps: [{ go: 'thanh_thuy', say: [['thuy_ba', 'Con ngủ được không? Ta thấy con ngồi bên mộ cả đêm.'], ['me', 'Bà ơi, tu tiên là gì?'], ['thuy_ba', 'Là đi thật xa để không ai bắt nạt được mình nữa. Chỉ có điều, đi xa rồi thì khó về.']] }, { hunt: { loc: 'thanh_thuy', name: 'Sói Đói', n: 2 }, say: [['mac', 'Tay vững hơn hôm qua. Chổi của ta cũng vậy, quét mãi mới vững.']] }] },
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
    '11-0': { title: 'Linh Tủy Đi Về Đâu', steps: [{ go: 'van_tien', say: [['van_nguyet', 'Thiên Đình tiêu chưa tới một phần mười số linh tủy đào lên. Phần còn lại chảy đi đâu?'], ['me', 'Lên Thánh Vực.'], ['van_nguyet', 'Đúng. Vậy kẻ thù của chúng ta không ở Lăng Tiêu Điện. Giờ thì sợ đi.']] }] },
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
    '14-2': { title: 'Sổ Thuế Lăng Tiêu', steps: [{ gather: { loc: 'lang_tieu', hours: 3, label: 'Tra sổ thuế linh tủy' }, say: [['narr', 'Trang cuối sổ thuế có sáu dấu ấn của Lục Thánh và tên Hạo Thiên ở dưới cùng, như chữ ký của một kẻ làm thuê.'], ['thai_bach', 'Ta không thấy ngươi đọc gì cả. Cổng Nam đêm mai đổi gác, ta cũng không biết điều đó.']] }] },
    '15-0': { title: 'Tiên Đế', steps: [{ go: 'lang_tieu', say: [['tien_de', 'Lại đây. Ngày ta đột phá cảnh giới này, ta cũng đứng ở đúng chỗ ngươi đứng.'], ['me', 'Bệ hạ từng là tiên nô.'], ['tien_de', 'Và ngươi đã lên tới Tiên Đế sau một đời. Trên trời chỉ có một ghế. Ngươi định làm gì?']] }] },
    '15-1': { title: 'Dư Đảng Thiên Binh', steps: [{ go: 'dong_thien_mon', say: [['van_nguyet', 'Tàn quân Nam Môn rút về Đông Thiên Môn. Đừng để chúng vây phía sau khi ngươi lên điện.']] }, { hunt: { loc: 'dong_thien_mon', name: 'Thiên Binh Đông Môn', n: 6 }, say: [['narr', 'Những thiên binh cuối cùng buông giáo. Nhiều người trong số họ có dấu ấn cũ trên cổ tay.']] }] },
    '15-2': { title: 'Lời Từ Biệt Dao Trì', steps: [{ go: 'dao_tri', say: [['dao_tri_mau', 'Ta đã chờ ngày này rất lâu, giờ lại không dám nhìn.'], ['me', 'Bà muốn con nói gì với ông ấy?'], ['dao_tri_mau', 'Không cần. Hắn biết tên mình từng là gì. Thế là đủ đau rồi.']] }] },

    /* ----- Hồi III ----- */
    '16-1': { title: 'Thánh Vị Trống', steps: [{ go: 'tu_tieu', say: [['thong_thien', 'Nhóc con, ghế thứ bảy vẫn để trống cho ngươi đấy.'], ['me', 'Ai từng ngồi trên đó?'], ['thong_thien', 'Không ai. Nó chỉ để nhắc rằng luôn có người muốn ngồi.']] }] },
    '16-2': { title: 'Đồng Tử Quạt Lò', steps: [{ go: 'bat_canh', say: [['dong_tu', 'Ngươi hỏi sư phụ ta làm gì suốt vạn năm à? Không làm gì.'], ['me', 'Còn ngươi?'], ['dong_tu', 'Ta quạt lò. Có người phải làm việc thì người khác mới không làm gì được.']] }, { hunt: { loc: 'bat_canh', name: 'Hoàng Cân Lực Sĩ', n: 5 }, say: [['dong_tu', 'Giờ thì sư phụ sẽ tiếp ngươi. Hoặc không. Với người thì cũng như nhau.']] }] },
    '17-0': { title: 'Tiếng Lật Sổ', steps: [{ go: 'ngoc_hu', say: [['nguyen_thuy', 'Ngươi đến sớm hơn thiên mệnh ba trăm năm.'], ['me', 'Thiên mệnh do ai viết?'], ['nguyen_thuy', 'Do ta chép lại. Chưa ai hỏi ta chép từ đâu.']] }] },
    '17-1': { title: 'Kim Tiên Xiển Giáo', steps: [{ hunt: { loc: 'ngoc_hu', name: 'Xiển Giáo Kim Tiên', n: 6 }, say: [['narr', 'Trong tay áo của một Kim Tiên Xiển Giáo có một đồng linh tủy còn ấm, in dấu Vô Quang.']] }] },
    '17-2': { title: 'Lão Thương Nhân Biết Chuyện', steps: [{ go: 'da_bao', say: [['da_bao', 'Linh tủy tồn kho ở Thánh Vực đủ dùng ba vạn năm. Mỏ của ngươi đóng cũng chẳng ai đói.'], ['me', 'Vậy họ còn đào làm gì?'], ['da_bao', 'Hỏi hay đấy. Câu trả lời đắt lắm, mà ngươi chưa đủ tiền.']] }] },
    '18-1': { title: 'Tượng Chưa Khô', steps: [{ go: 'oa_hoang', say: [['nu_oa', 'Con có muốn biết tượng của con đặt ở đâu không?'], ['me', 'Ở đâu?'], ['nu_oa', 'Không có. Con không phải do ta nặn. Đó là điều làm ta mất ngủ.']] }] },
    '18-2': { title: 'Kiếm Ý Bích Du', steps: [{ go: 'bich_du', say: [['thong_thien', 'Đệ tử ta muốn thử ngươi. Giết nhẹ tay thôi, chúng còn phải quét đảo.']] }, { hunt: { loc: 'bich_du', name: 'Tiệt Giáo Kiếm Tiên', n: 6 }, say: [['thong_thien', 'Vết sẹo ta cho vẫn còn. Được, ngày mai dùng tay thật.']] }] },
    '19-0': { title: 'Thánh Nhân Sợ Gì', steps: [{ go: 'bich_du', say: [['thong_thien', 'Mỗi khi vũ trụ này no, có thứ gì đó từ bên ngoài đến gặt. Ta đã thấy một lần.'], ['me', 'Vì vậy các ngươi mới đào?'], ['thong_thien', 'Vì vậy mới cần cống phẩm. Bọn ta sợ, nhóc ạ.']] }] },
    '19-1': { title: 'Kim Cương Không Chớp Mắt', steps: [{ go: 'cuc_lac', say: [['narr', 'Người ở Cực Lạc mỉm cười giống hệt nhau. Không ai trả lời khi ngươi hỏi đường.']] }, { hunt: { loc: 'cuc_lac', name: 'Kim Cương Hộ Pháp', n: 6 }, say: [['narr', 'Kim Cương ngã xuống vẫn mỉm cười. Bên trong họ rỗng như vỏ ve.']] }] },
    '19-2': { title: 'Thư Về Thanh Vân', steps: [{ gather: { loc: 'tu_tieu', hours: 3, label: 'Tìm khe truyền âm về phàm giới' }, say: [['to_dao', '(Giọng nói rất xa) Đệ cao đến đâu rồi?'], ['me', 'Cao tới mức sắp hết trời.'], ['to_dao', 'Vậy thì nhớ xuống ăn cơm.']] }] },

    /* ----- Hồi IV ----- */
    '20-0': { title: 'Bờ Trời', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Khách mới à? Ngồi đi. Ở đây không có trời nên không ai bị trời phạt.'], ['me', 'Quán này ai mở?'], ['ly_khach', 'Một kẻ lười không muốn đi tiếp. Đừng học ta.']] }] },
    '20-1': { title: 'Bữa Ăn Đầu Tiên Ngoài Trời', steps: [{ hunt: { loc: 'vo_cuong', name: 'Thiên Ngoại Đạo Tặc', n: 6 }, say: [['ly_khach', 'Dọn cửa xong rồi thì ăn đi. Vũ trụ của ngươi tên gì?'], ['me', 'Nó có tên sao?'], ['ly_khach', 'Vụ thứ ba ngàn. Đó là tên trong sổ.']] }] },
    '20-2': { title: 'Tin Đồn Vạn Giới', steps: [{ go: 'van_gioi', say: [['narr', 'Trên xác một thế giới có tấm bia khắc đúng những cái tên giống Lục Thánh, viết bằng thứ chữ khác.'], ['ly_khach', 'Vụ nào cũng có sáu chấp sự. Đổi người, không đổi ghế.']] }] },
    '21-0': { title: 'Đáy Sổ', steps: [{ go: 'van_gioi', say: [['ly_khach', 'Khôi lỗi kia gặt xong một vụ thì đi đâu, ngươi có nghĩ tới không?'], ['me', 'Về nơi nào đó nộp sổ.'], ['ly_khach', 'Đúng. Và nơi đó tên là Thần Đình.']] }] },
    '21-1': { title: 'Tàn Hồn Không Đi', steps: [{ hunt: { loc: 'van_gioi', name: 'Tàn Hồn Vạn Giới', n: 6 }, say: [['narr', 'Tàn hồn cuối cùng nắm tay áo ngươi, hỏi: "Vụ của ta gặt xong chưa?"']] }] },
    '21-2': { title: 'Sứ Giả Luân Hồi', steps: [{ go: 'luan_hoi', say: [['ly_khach', 'Biển này giữ hết các đời của ngươi. Đừng soi lâu.'], ['me', 'Lão từng soi?'], ['ly_khach', 'Vì thế mới mở quán.']] }, { hunt: { loc: 'luan_hoi', name: 'Luân Hồi Sứ', n: 6 } }] },
    '22-0': { title: 'Một Kiếp Cầm Chổi', steps: [{ go: 'luan_hoi', say: [['narr', 'Trong nước hiện lên một ngôi làng, một sân lá, một đứa trẻ đang chờ.'], ['me', 'Là ai đang chờ ai?']] }] },
    '22-1': { title: 'Nghiệp Long Con', steps: [{ hunt: { loc: 'luan_hoi', name: 'Nghiệp Long', n: 5 }, say: [['narr', 'Mỗi con Nghiệp Long ngã xuống trả lại ngươi một mảnh ký ức không phải của đời này.']] }] },
    '22-2': { title: 'Câu Hỏi Của Lữ Khách', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Biết được bao nhiêu kiếp rồi?'], ['me', 'Đời nào ta cũng tới đây.'], ['ly_khach', 'Đời nào ta cũng hỏi câu này. Ăn đi, nguội rồi.']] }] },
    '23-0': { title: 'Kẻ Không Có Trời', steps: [{ go: 'khai_thien', say: [['hoang_cong', 'Ở đây lửa muốn cháy kiểu gì thì cháy. Ngươi muốn tạo trời à? Trước hết tập làm cái lò đã.'], ['me', 'Khác gì nhau?'], ['hoang_cong', 'Lò hỏng thì đổi lò. Trời hỏng thì có người chết.']] }] },
    '23-1': { title: 'Thú Hư Không', steps: [{ hunt: { loc: 'khai_thien', name: 'Hư Không Thú', n: 6 }, say: [['hoang_cong', 'Da nó không nhớ hình dạng, cho nên rất hợp làm vách trời.']] }] },
    '23-2': { title: 'Tên Ngọn Gió', steps: [{ go: 'khai_thien', say: [['hoang_cong', 'Mọi thế giới phải bắt đầu bằng một thứ gì đó. Ngươi chọn gì?'], ['me', 'Một ngọn gió thổi qua suối.'], ['hoang_cong', 'Nhỏ thế? Thôi được, kẻ chọn thứ lớn đều thành Thiên Đạo cả.']] }] },
    '24-0': { title: 'Chúng Sinh Của Ta', steps: [{ go: 'khai_thien', say: [['narr', 'Trong thế giới nhỏ của ngươi có một loài rêu vừa mọc. Ngươi canh nó suốt ba tháng.'], ['ly_khach', 'Coi chừng. Thiên Đạo cũng bắt đầu bằng việc thương một đám rêu.']] }] },
    '24-1': { title: 'Thám Tử Của Trời', steps: [{ go: 'than_dinh', say: [['narr', 'Đạo Vệ tuần tra đang kiểm kê từng thế giới mới sinh. Thế giới của ngươi đã có số.']] }, { hunt: { loc: 'than_dinh', name: 'Đạo Vệ', n: 6 }, say: [['narr', 'Trên giáp Đạo Vệ có một dãy số. Số cuối cùng là mã thế giới của ngươi.']] }] },
    '24-2': { title: 'Tiếng Bánh Răng', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Cỗ máy đó không ác. Nó chỉ đếm.'], ['me', 'Cái đếm đó giết người.'], ['ly_khach', 'Phải. Từ lúc ra đời, kẻ làm sổ sách đã giết nhiều hơn kẻ cầm gươm.']] }] },
    '25-0': { title: 'Ngọn Đèn Cuối Hành Lang', steps: [{ go: 'than_dinh', say: [['narr', 'Thần Đình rỗng hơn ngươi nghĩ. Hành lang dài vô tận chỉ có một ngọn đèn ở cuối.']] }] },
    '25-1': { title: 'Thiên Phạt Lần Cuối', steps: [{ hunt: { loc: 'than_dinh', name: 'Thiên Phạt Sứ', n: 8 }, say: [['narr', 'Thiên Phạt Sứ cuối cùng cúi đầu trước khi tan. Hình như nó đã mệt từ lâu.']] }] },
    '25-2': { title: 'Bữa Cơm Trước Khi Đi', steps: [{ go: 'vo_cuong', say: [['ly_khach', 'Thua thì quay lại trả nợ, thắng thì cũng phải trả.'], ['me', 'Tiền cơm bao nhiêu?'], ['ly_khach', 'Ngươi là kẻ đầu tiên hỏi. Ngày mai ta nói.']] }] },

    /* ----- Hồi VI, VII ----- */
    '27-2': { title: 'Tiếng Gọi Từ Đạo Thai', steps: [{ go: 'dao_thai', say: [['narr', 'Đạo Thai đập như một trái tim. Mỗi nhịp là một câu hỏi không có lời.'], ['ban_co', 'Nghe gì không?'], ['me', 'Tiếng chổi.'], ['ban_co', 'Vậy là ngươi đã rất gần rồi.']] }] },
    '28-1': { title: 'Ký Ức Hồ', steps: [{ go: 'ky_uc_ho', say: [['do_nhan', 'Soi xem, đây là những ngày ngươi tưởng đã quên.'], ['narr', 'Mặt hồ hiện lên Thanh Thủy Thôn, ánh lửa và một bàn tay nhỏ cầm chổi.']] }] },
    '28-2': { title: 'Lão Lái Đò', steps: [{ go: 'truong_ha', say: [['do_nhan', 'Qua bờ kia không còn ai đưa về đâu.'], ['me', 'Có ai từng qua rồi chưa?'], ['do_nhan', 'Một người. Hắn cầm chổi đi, và để lại tiền đò chưa trả.']] }] }
};

const MAIN_FINAL_STAGE = 3;
const CHAPTER_ACT_REALMS = [8, 15, 19, 25, 26, 27, 28];

function chapterAct(realm) {
    return CHAPTER_ACT_REALMS.findIndex(top => realm <= top) + 1;
}

/* Nhiệm vụ mở khóa nằm ở Đại Viên Mãn; các hồi đặc biệt giữ tiểu cảnh riêng */
const MAIN_STAGE_FIX = { m32: 2, m31: 1, m35: 1, m38: 3 };
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
