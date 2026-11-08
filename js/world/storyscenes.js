/* ===========================================================
   CẢNH TRUYỆN THÊM
   - MAIN_SCENES: intro lúc nhận nhiệm vụ chính, outro lúc xong.
   - REGION_QUESTS: mỗi nơi có dịch vụ phải làm việc cho người ở đó mới được dùng.
   - ROAD_TALES: cảnh gặp trên đường theo từng Giới.
=========================================================== */
const MAIN_SCENES = {
    m02: { intro: [['narr', 'Chín ngàn bậc đá dẫn lên Thanh Vân Tông. Mây quấn quanh chân ngươi, sau lưng là {behind}.'], ['me', '{vow}'], ['mac', '(Tiếng chổi vọng từ rất xa) Bậc nào cũng phải bước, đừng nhảy.']], outro: [['narr', 'Động phủ của ngươi chỉ là một hang đá ẩm. Nhưng đêm đầu tiên, ngươi nghe được tiếng linh khí chảy.']] },
    m03: { intro: [['to_dao', 'Đệ tử ngoại môn chỉ được ăn phần thừa của linh mạch. Muốn lên nội môn phải có công.'], ['me', 'Sư tỷ giúp ta vì sao?'], ['to_dao', 'Vì ánh mắt đệ giống một người ta từng quen. Đừng hỏi thêm.']], outro: [['lang_phong', 'Lần này là ta sơ ý. Lần sau ngươi sẽ không còn đứng được.'], ['narr', 'Hắn cười, nhưng bàn tay cầm kiếm siết đến trắng bệch.']] },
    m04: { intro: [['narr', 'Đêm ở Thanh Vân bỗng im hơn thường lệ. Sáng ra, thêm một chiếc giường đệ tử bỏ trống.'], ['to_dao', 'Đệ có để ý không? Không ai dám nhắc tới tên họ.']], outro: [['narr', 'Trong mật thất của Hắc Bào Trưởng Lão có mười hai chiếc bình, mỗi bình một làn khói đang cào vào thành.'], ['to_dao', 'Đệ mở nút đi. Để họ được về.']] },
    m05: { intro: [['narr', 'Vân Long Thành đông như hội, mùi đan dược lẫn mùi sắt nung tràn khắp phố.'], ['to_dao', 'Ở đây có tiền là có đường. Giữ chặt túi và cả cái miệng của đệ.']], outro: [['narr', 'Nguyên Anh trong đan điền mở mắt lần đầu. Nó nhìn ngươi, gương mặt y hệt, chỉ già hơn một chút.']] },
    m06: { intro: [['narr', 'Một cánh hạc truyền thư đậm máu rơi xuống bàn ngươi. Chỉ có bốn chữ: "Thanh Vân có biến".'], ['me', 'Lăng Phong...']], outro: [['narr', 'Ngươi và Tô Thanh Dao hạ huyệt chưởng môn dưới gốc tùng già. Cả tông môn còn chưa đầy một trăm người.'], ['to_dao', 'Từ nay đệ không còn là đệ tử nữa. Đệ là cái cột của nơi này.']] },
    m07: { intro: [['to_dao', 'Đệ không ngủ ba tháng rồi. Trong mắt chỉ còn Lăng Phong.'], ['to_dao', 'Có một người ở Băng Phong Cốc từng chữa bệnh này. Đừng để ta phải đi chôn thêm một người nữa.']], outro: [['narr', 'Tuyết phủ kín vai ngươi. Bảy ngày sau, lần đầu tiên từ đêm chưởng môn mất, ngươi thở chậm lại được.']] },
    m08: { intro: [['narr', 'Cửa vực Vô Tận thở ra gió nóng như hơi thở của con vật đang ngủ.'], ['to_dao', 'Tất cả những gì sư phụ giấu đều dẫn về đây.'], ['me', 'Tỷ ở lại giữ sơn môn. Xuống dưới đó một mình ta là đủ.']], outro: [['narr', 'Dưới đáy Ma Uyên, ngươi tìm thấy một tấm bia. Tên những kẻ phi thăng được khắc kín, tất cả đều bị gạch ngang.']] },
    m09: { intro: [['narr', 'Trời đổi màu từ ba ngày trước. Chim không bay, cá không bơi. Cả Phàm Giới đang nín thở chờ ngươi.'], ['mac', 'Sấm chỉ biết đánh vào kẻ đứng cao nhất. Vậy nên hãy đứng cho vững.']], outro: [['narr', 'Tầng kiếp thứ chín tan đi. Mưa rơi xuống, {rain}.']] },
    m10: { intro: [['narr', '{farewell}']], outro: [['to_dao', 'Ta vẫn giữ lửa ở đây. Đừng để ta đợi uổng.'], ['narr', 'Ánh sáng nuốt lấy ngươi. Ngươi không biết rằng cánh cửa phía trên chỉ mở một chiều.']] },
    m11: { outro: [['tien_lai', 'Ta đào ba ngàn năm mà chưa từng thấy đốc công đổ máu. Hóa ra máu chúng cũng đỏ.'], ['narr', 'Sau lưng ngươi, những chiếc cuốc lần lượt rơi xuống đất.']] },
    m12: { intro: [['narr', 'Vạn Tiên Thành lộng lẫy như bức tranh. Đi sâu vào ngõ sau là những tiên nhân không còn đan điền, ngồi xin một giọt linh dịch.'], ['van_nguyet', 'Ngươi là kẻ giết đốc công? Theo ta, đừng ngẩng đầu.']], outro: [['van_nguyet', 'Từ giờ ngươi có tên trong danh sách truy nã của Thiên Đình. Chúc mừng, ngươi đã thành người của chúng ta.']] },
    m13: { intro: [['narr', 'Thiên Hà không có nước, chỉ có tinh quang chảy qua những đường ống lớn bằng cả tòa thành.'], ['van_nguyet', 'Tiên Giới rực rỡ nhờ cái thứ chạy trong đó. Và nó được ép ra từ những người như ngươi.']], outro: [['narr', 'Vết kiếm trên ngực ngươi không chảy máu, chỉ phát sáng. Mỗi lần thở, nó lại cắt sâu thêm một chút.']] },
    m14: { intro: [['van_nguyet', 'Kiếm khí của Thánh Nhân sẽ giết ngươi trong bảy ngày. Chỉ có Thánh Mẫu Dao Trì rút được.'], ['me', 'Bà ấy là người của Thiên Đình.'], ['van_nguyet', 'Từng là. Hơn nữa ngươi chẳng còn cách nào khác.']], outro: [['dao_tri_mau', 'Ao sen này trồng bằng nước mắt của ta. Hàng ngàn năm trước ta cũng đã muốn lật đổ một người.']] },
    m15: { intro: [['narr', 'Khắp Vạn Tiên Thành, những tiên nô phá xiềng đổ về quảng trường. Không ai hô khẩu hiệu. Họ chỉ cầm cuốc.'], ['tien_lai', 'Lão già này đào đất ba ngàn năm. Hôm nay muốn đào thứ khác.']], outro: [['narr', 'Đường ống linh tủy gãy làm đôi. Lần đầu sau vạn năm, đèn của Lăng Tiêu Bảo Điện chập chờn.'], ['van_nguyet', 'Chuyện mỏ xong rồi. Giờ tới thứ khó hơn: những kẻ đã hưởng từ nó.']] },
    m16: { intro: [['tien_lai', 'Nếu lão ngã, đừng quay lại. Cuốc này là của ngươi.'], ['me', 'Lão sẽ không ngã.'], ['tien_lai', 'Tiên nô nào cũng ngã, con ạ. Chỉ là được chọn ngã ở đâu.']], outro: [['narr', 'Nam Thiên Môn đổ xuống. Trong đống đá, ngươi nhặt lại một chiếc cuốc cũ, cán đã ướt.']] },
    m17: { intro: [['narr', 'Lăng Tiêu Bảo Điện vắng tanh. Chín ngàn bậc thềm ngọc, giống hệt bậc đá Thanh Vân năm nào.'], ['me', 'Ta đã leo bậc này một lần rồi.']], outro: [['narr', 'Tiên nô quỳ xuống hát một bài ca cũ. Ngươi không ngồi lên ngai vàng. Ngươi đi về phía vết nứt.']] },
    m23: { intro: [['narr', 'Cực Lạc thơm mùi sen. Những người tụng kinh ở đây đều mỉm cười giống nhau, và không ai chớp mắt.']], outro: [['narr', 'Khe nứt mở ra phía dưới đài sen. Không có gió, không có sao, chỉ có tiếng trái tim ngươi đang đập.']] },
    m24: { intro: [['narr', 'Ra khỏi vũ trụ, ngươi mới biết bầu trời cũng có mép. Bên ngoài trôi lững lờ xác của những thế giới khác.'], ['ly_khach', 'Đứng đó mãi cũng không sống lại được đâu. Ta có quán, ăn gì không?']], outro: [['ly_khach', 'Con khôi lỗi này thu hoạch thay Thiên Đạo, sau khi Thiên Ma đào xong. Nó còn nhớ tên người cuối cùng nó gặt, nhưng ngươi đừng hỏi.']] },
    m25: { intro: [['narr', 'Luân Hồi Hải không có sóng. Mỗi giọt nước là một đời người đã sống xong.'], ['me', 'Bao nhiêu trong đó là ta?'], ['ly_khach', 'Đừng đếm. Có người đếm rồi không về nữa.']], outro: [['narr', 'Ngươi nhớ lại mùi lá khô. Nhớ cả cảm giác cán chổi trong lòng bàn tay, dù đời này ngươi chưa từng quét.']] },
    m26: { intro: [['narr', 'Đêm ở Luân Hồi Hải, có tiếng ai đó gọi đúng cái tên ngươi chưa bao giờ nói với ai.']], outro: [['narr', 'Ngươi đặt tay lên ngực. Ở đó vừa có một thứ rời đi, nhẹ như khi buông một món nợ.']] },
    m27: { intro: [['narr', 'Hoang Nguyên là nơi chưa có luật. Lửa ở đây có thể lạnh, đá có thể khóc.'], ['ly_khach', 'Đừng hỏi cách khai thiên. Bàn Cổ cũng không ai dạy.']], outro: [['narr', 'Ngươi đặt tên cho ngọn gió đầu tiên của thế giới mình là "{wind}".']] },
    m28: { intro: [['narr', 'Từ xa đã nghe tiếng bánh răng. Mỗi tiếng là một đời tu sĩ vừa được tính vào sổ.']], outro: [['narr', 'Sau cánh cửa cuối cùng của Thần Đình chỉ có một căn phòng nhỏ, một ngọn đèn và một ông lão đang mệt.']] },
    m29: { intro: [['ly_khach', 'Ta mở quán ở đây lâu lắm rồi. Hàng vạn kẻ bước qua, ta chỉ mời cơm lần này.'], ['me', 'Vì sao?'], ['ly_khach', 'Vì ngươi là kẻ đầu tiên hỏi quán có đắt không.']], outro: [['narr', 'Bánh răng dừng lại. Ở một phàm giới xa xôi, Tô Thanh Dao ngẩng lên, không hiểu sao thấy nhẹ cả người.']] },
    m30: { intro: [['narr', 'Bờ biển này không có nước. Hỗn độn cuộn lại thành sóng rồi tan ra thành những khái niệm chưa ai đặt tên.']], outro: [['narr', 'Ngươi đứng dậy, cười. Từ rất lâu rồi mới có người dạy cho ngươi biết mình nhỏ tới đâu.']] },
    m31: { intro: [['narr', 'Am cỏ chỉ có một phiến đá, một bình trà nguội và hai người không hề quan tâm vũ trụ ngươi vừa cứu.']], outro: [['vong_ky', 'Ma Thần chết rồi vẫn còn mơ. Nghe tiếng mơ đó, ngươi sẽ hiểu vì sao Đạo Giả không ngủ.']] },
    m32: { intro: [['vo_danh', 'Thua cũng được. Chỉ là thua thì ngươi quét sân.'], ['me', 'Sao ai cũng bắt ta quét?']], outro: [['narr', 'Vọng Kỷ nhấp ngụm trà nguội, lần đầu tiên sau vạn kỷ nguyên mỉm cười.']] },
    m33: { intro: [['narr', 'Hải Tâm là con mắt của cơn bão. Ở giữa có một người ngồi, trước mặt là bàn cờ chưa ai đi nước nào.']], outro: [['narr', 'Ngươi nhìn xuống tay mình. Những vết chai ngươi không nhớ đã có từ bao giờ, nằm đúng chỗ người ta cầm chổi.']] },
};

Object.entries(MAIN_SCENES).forEach(([id, scene]) => Object.assign(QUEST_INDEX[id], scene));

Object.assign(NPCS, {
    lo_tuong: { name: 'Thạch Lão', title: 'Thợ rèn Thanh Vân', look: NPC_LOOK('m', 5, '#c9c9d6', '#55524a', { beard: true }) },
    thuong_hoi: { name: 'Kim Nương', title: 'Chủ thương hội Vân Long', look: NPC_LOOK('f', 2, '#7a1f2b', '#b5832e', { weapon: 'fan', weaponColor: '#ffc14d' }) },
    kim_si_cong: { name: 'Kim Sí Lão Tượng', title: 'Thần thợ Kim Bằng Nhai', look: NPC_LOOK('m', 2, '#8a6a1f', '#ffd76a', { beard: true, weapon: 'staff', weaponColor: '#ffcf40' }) },
    hoa_cong: { name: 'Hỏa Công', title: 'Thần thợ Xích Diệm', look: NPC_LOOK('m', 4, '#7a1f2b', '#8c3a3a', { beard: true, weapon: 'staff', weaponColor: '#ff8a4c' }) },
    dai_su: { name: 'Lôi Đài Sư', title: 'Thợ giữ Phi Thăng Đài', look: NPC_LOOK('m', 0, '#c9c9d6', '#3f6f9e', { weapon: 'staff', weaponColor: '#7fd4ff' }) },
    kiem_lao: { name: 'Vô Phong Lão', title: 'Giữ mộ Kiếm Trủng', look: NPC_LOOK('m', 1, '#c9c9d6', '#2b2b35', { weapon: 'sword', weaponColor: '#b8c0c8' }) },
    thiet_su: { name: 'Thiết Sư Phụ', title: 'Môn chủ Thiết Cốt', look: NPC_LOOK('m', 5, '#1b1b22', '#8c3a3a', { beard: true }) },
    huyet_nu: { name: 'Huyết Nương', title: 'Hộ pháp Huyết Sát', look: NPC_LOOK('f', 1, '#7a1f2b', '#2b2b35', { eyes: '#a8342a', aura: '#a8342a' }) },
    phap_lao: { name: 'Huyền Cơ Tử', title: 'Các chủ Huyền Pháp', look: NPC_LOOK('m', 0, '#f0e6c8', '#6b4a8f', { beard: true, weapon: 'orb', weaponColor: '#d59bff' }) },
    thu_mau: { name: 'Bách Thú Bà', title: 'Trông coi Vạn Thú Sơn', look: NPC_LOOK('f', 3, '#8b5a2b', '#3e7d5a', { eyes: '#d9a520' }) },
    tien_thuong: { name: 'Lý Chưởng Quỹ', title: 'Chưởng quỹ Vạn Tiên', look: NPC_LOOK('m', 0, '#1b1b22', '#dbe8f7', { weapon: 'orb', weaponColor: '#7fd4ff' }) },
    dong_tu: { name: 'Kim Giác Đồng Tử', title: 'Giữ lò Bát Quái', look: NPC_LOOK('m', 3, '#1b1b22', '#e8cf8f', { weapon: 'fan', weaponColor: '#ffc14d' }) },
    hoang_cong: { name: 'Khai Sơn Tượng', title: 'Thợ Hoang Nguyên', look: NPC_LOOK('m', 4, '#8b5a2b', '#5a3a9e', { beard: true, weapon: 'staff', weaponColor: '#c58bff' }) },
});

const REGION_QUESTS = [
    {
        loc: 'thanh_van', npc: 'lo_tuong', title: 'Tay Nghề Của Thạch Lão', needs: [0, 2],
        intro: [['lo_tuong', 'Kho và lò của tông môn không mở cho kẻ lạ. Đánh tan vài con khôi lỗi, ta lấy lõi đồng làm phôi rồi tính.']],
        steps: [{ hunt: { loc: 'thanh_van', name: 'Khôi Lỗi Thí Luyện', n: 3 }, say: [['lo_tuong', 'Lõi này còn nóng. Được, từ nay lò Thanh Vân, kho Thanh Vân và bảng nhiệm vụ đều mở cho ngươi.']] }]
    },
    {
        loc: 'van_long', npc: 'thuong_hoi', title: 'Đường Hàng Vân Long', needs: [1, 0],
        intro: [['thuong_hoi', 'Vân Long không bán cho người lạ mặt. Tán tu đang cướp hàng ngoài cổng, dẹp chúng rồi ta ghi tên ngươi vào sổ.']],
        steps: [{ hunt: { loc: 'van_long', name: 'Tán Tu Lang Thang', n: 4 }, say: [['thuong_hoi', 'Sòng phẳng. Từ nay chợ, lò rèn và bảng thưởng Vân Long đều nhận mặt ngươi.']] }]
    },
    {
        loc: 'xich_diem', npc: 'hoa_cong', title: 'Mượn Lửa Địa Tâm', needs: [3, 0],
        intro: [['hoa_cong', 'Thần lò này ăn tim của Hỏa Ma. Mang đủ thì ta nhóm, thiếu thì mời đi nơi khác.'], ['me', 'Lò này khác gì lò thường?'], ['hoa_cong', 'Lò thường rèn thứ ngươi xứng đáng. Lò này rèn thứ ngươi chưa xứng.']],
        steps: [{ hunt: { loc: 'xich_diem', name: 'Hỏa Ma', n: 5 }, say: [['hoa_cong', 'Lửa lên rồi. Thần lò Xích Diệm nhận ngươi làm khách.']] }]
    },
    {
        loc: 'phi_thang', npc: 'dai_su', title: 'Sấm Đọng Trên Đài', needs: [7, 0],
        intro: [['dai_su', 'Sấm đọng lại quanh đài này, ai rèn ở đây phải dùng được nó. Giết Lôi Thú rồi đem hạch về.']],
        steps: [{ hunt: { loc: 'phi_thang', name: 'Lôi Thú', n: 5 }, say: [['dai_su', 'Có hạch sấm rồi. Lò dưới chân đài là của ngươi.']] }]
    },
    {
        loc: 'kiem_trung', npc: 'kiem_lao', title: 'Tế Mộ Vô Danh', needs: [0, 0],
        intro: [['kiem_lao', 'Mỗi thanh kiếm ở đây có một chủ đã chết. Trừ bớt Kiếm Hồn nổi loạn, ta sẽ cho ngươi mua đồ cúng.']],
        steps: [{ hunt: { loc: 'kiem_trung', name: 'Kiếm Hồn', n: 3 }, say: [['kiem_lao', 'Họ yên rồi. Quầy hàng của mộ này mở cho ngươi.']] }]
    },
    {
        loc: 'thiet_cot', npc: 'thiet_su', title: 'Ba Quyền Nhập Môn', needs: [0, 0],
        intro: [['thiet_su', 'Thiết Cốt Môn không tin lời nói. Đánh ngã thủ vệ của ta rồi nói chuyện mua bán.']],
        steps: [{ hunt: { loc: 'thiet_cot', name: 'Thiết Cốt Thủ', n: 3 }, say: [['thiet_su', 'Xương ngươi cứng đấy. Kho môn phái mở cho ngươi.']] }]
    },
    {
        loc: 'huyet_sat', npc: 'huyet_nu', title: 'Nợ Máu', needs: [0, 0],
        intro: [['huyet_nu', 'Vào giáo ta thì phải để lại chút máu, của ngươi hay của chúng, tùy ngươi chọn.']],
        steps: [{ hunt: { loc: 'huyet_sat', name: 'Huyết Nô Vệ', n: 3 }, say: [['huyet_nu', 'Tay ngươi đỏ rồi, trông dễ coi hơn. Quầy bán mở cho ngươi.']] }]
    },
    {
        loc: 'huyen_phap', npc: 'phap_lao', title: 'Thí Pháp Sơ Khảo', needs: [0, 0],
        intro: [['phap_lao', 'Khôi lỗi ở đây là bài thi. Qua được ba bài, ta mới tin ngươi biết đọc nhãn thuốc.']],
        steps: [{ hunt: { loc: 'huyen_phap', name: 'Thí Pháp Khôi Lỗi', n: 3 }, say: [['phap_lao', 'Đạt. Hàng trong Các từ nay bán cho ngươi.']] }]
    },
    {
        loc: 'van_thu', npc: 'thu_mau', title: 'Bầy Sói Lạc Đàn', needs: [0, 0],
        intro: [['thu_mau', 'Yêu Lang mất đầu đàn nên cắn cả người nhà. Giúp ta dẹp bớt rồi hẵng nói chuyện mua da thú.']],
        steps: [{ hunt: { loc: 'van_thu', name: 'Yêu Lang', n: 3 }, say: [['thu_mau', 'Núi yên rồi. Quầy của ta mở cho ngươi.']] }]
    },
    {
        loc: 'van_tien', npc: 'tien_thuong', title: 'Giấy Thông Hành Vạn Tiên', needs: [9, 0],
        intro: [['tien_thuong', 'Trên cổ tay ngươi còn dấu tiên nô, ta bán cho ngươi là mất đầu. Dẹp bọn đạo tặc cản đường hàng, ta sẽ xóa dấu đó khỏi sổ.']],
        steps: [{ hunt: { loc: 'van_tien', name: 'Tiên Đạo Tặc', n: 5 }, say: [['tien_thuong', 'Trên sổ của ta, ngươi giờ là khách quen. Chợ, lò và bảng thưởng đều mở.']] }]
    },
    {
        loc: 'dao_tri', npc: 'dao_tri_mau', title: 'Hộ Vệ Thử Lòng', needs: [11, 0],
        intro: [['dao_tri_mau', 'Lò Dao Trì đun bằng nước ao, rèn được thứ ngươi xứng đáng và hơn một chút. Vượt qua hộ vệ của ta, ngươi mới được chạm vào lửa.']],
        steps: [{ hunt: { loc: 'dao_tri', name: 'Dao Trì Hộ Vệ', n: 5 }, say: [['dao_tri_mau', 'Ao đã nhận ngươi. Danh lò Dao Trì từ nay mở cửa.']] }]
    },
    {
        loc: 'kim_bang', npc: 'kim_si_cong', title: 'Lông Vàng Nhóm Lửa', needs: [13, 0],
        intro: [['kim_si_cong', 'Lò trên vách này nhóm bằng lông Kim Sí Bằng, lửa của nó nung chảy được cả tiên kim. Bầy chim non hung hăng lắm, dẹp bớt rồi mang lông về.'], ['me', 'Sao lại đặt lò tận nơi này?'], ['kim_si_cong', 'Lò gần thì ai cũng tới. Thần lò mà ai cũng tới thì còn gì là thần.']],
        steps: [{ hunt: { loc: 'kim_bang', name: 'Kim Sí Bằng', n: 5 }, say: [['kim_si_cong', 'Lửa vàng lên rồi. Thần lò Kim Bằng nhận ngươi làm khách.']] }]
    },
    {
        loc: 'thanh_thi', npc: 'narr', title: 'Lệnh Bài Tử Tiêu Thị', needs: [19, 0],
        intro: [['narr', 'Người giữ chợ không ngẩng đầu: "Thánh Giới không có khách vãng lai. Tán Đồ đang phá quầy, dẹp đi rồi hãy hỏi mua."']],
        steps: [{ hunt: { loc: 'thanh_thi', name: 'Thánh Giới Tán Đồ', n: 5 }, say: [['narr', 'Chợ yên trở lại. Lệnh bài bằng ngọc tím rơi vào tay ngươi.']] }]
    },
    {
        loc: 'da_bao', npc: 'da_bao', title: 'Tiền Đặt Cọc', needs: [18, 0],
        intro: [['da_bao', 'Đồ cấp Thánh ta chỉ bán cho Chuẩn Thánh. Đặt cọc bằng đầu bọn đạo tặc Thánh Giới xuống đây trộm hàng, ta cấp lệnh bài.']],
        steps: [{ hunt: { loc: 'da_bao', name: 'Thánh Giới Đạo Tặc', n: 5 }, say: [['da_bao', 'Lệnh bài của ngươi đây. Nhớ kỹ: thiếu một món đồ Thánh trên người, Thiên Đạo sẽ không cho ngươi thành Thánh. Mua đủ sáu món, mua nhiều, chết ít.']] }]
    },
    {
        loc: 'bat_canh', npc: 'dong_tu', title: 'Quạt Lò Bát Quái', needs: [19, 0],
        intro: [['dong_tu', 'Lò Bát Quái chưa tắt lần nào. Đánh thắng Lực Sĩ thì ta cho ngươi ghé lửa nhờ một lúc. Sư phụ ta sẽ không làm gì đâu, người chưa bao giờ làm gì.']],
        steps: [{ hunt: { loc: 'bat_canh', name: 'Hoàng Cân Lực Sĩ', n: 5 }, say: [['dong_tu', 'Vào đi. Đừng nói ta cho phép, cũng đừng nói ta không cho.']] }]
    },
    {
        loc: 'vo_cuong', npc: 'ly_khach', title: 'Tiền Cơm Trả Trước', needs: [23, 0],
        intro: [['ly_khach', 'Quán ta ghi sổ chứ không cho nợ. Dẹp bọn đạo tặc trước cửa là trừ được bữa đầu.']],
        steps: [{ hunt: { loc: 'vo_cuong', name: 'Cực Đạo Tán Tu', n: 5 }, say: [['ly_khach', 'Sạch sẽ. Bếp, lò và tấm bảng trong quán, ngươi dùng thoải mái.']] }]
    },
    {
        loc: 'khai_thien', npc: 'hoang_cong', title: 'Quặng Quy Tắc', needs: [25, 0],
        intro: [['hoang_cong', 'Nơi này chưa có luật nên lửa muốn cháy kiểu gì thì cháy. Mang Quy Tắc Thể về, ta rèn cho lửa một cái luật.']],
        steps: [{ hunt: { loc: 'khai_thien', name: 'Quy Tắc Thể', n: 6 }, say: [['hoang_cong', 'Lửa đã biết nghe lời. Thần lò Hoang Nguyên mở cho ngươi.']] }]
    }
].map(q => ({ ...q, id: `open_${q.loc}`, reward: { hours: 1, goldRefs: 5, opens: q.loc } }));

SIDE_QUESTS.push(...REGION_QUESTS);
REGION_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });

const FREE_SERVICE_LOCATIONS = ['thanh_thuy'];

const ROAD_TALES = {
    pham: [
        [['narr', 'Bên đường có một quán trà bỏ hoang, ấm nước vẫn còn nóng. Dưới đáy chén có thứ gì đó lấp lánh.']],
        [['narr', 'Một đứa trẻ chăn trâu chỉ tay vào bụi rậm, cười khúc khích rồi biến mất cùng cả con trâu.']],
        [['narr', 'Mưa rào đổ xuống. Ngươi trú dưới miếu thổ địa và thấy lễ vật ai đó bỏ quên trên bàn thờ.']]
    ],
    tien: [
        [['narr', 'Một đoạn ống linh tủy vỡ, tinh quang trào ra thành vũng. Ngươi cúi xuống, trong vũng có vật gì đang chìm.']],
        [['narr', 'Tiên nô bỏ trốn dúi vào tay ngươi một gói nhỏ rồi chạy mất: "Đừng để bọn chúng tìm thấy."']],
        [['narr', 'Một tinh cầu nhỏ lạc đường lăn ngang qua, để lại vệt sáng và vài mảnh vụn.']]
    ],
    thanh: [
        [['narr', 'Một trang thiên thư bị gió thổi lạc, tự cuốn thành túi nhỏ rơi vào tay ngươi.']],
        [['narr', 'Dấu chân Thánh Nhân để lại trên đá, trong đó đọng một vũng linh quang chưa khô.']],
        [['narr', 'Một đạo đồng ngủ gật giữa đường, bọc đồ lăn tới chân ngươi. Hắn không tỉnh dậy.']]
    ],
    thien: [
        [['narr', 'Một xác thế giới nhỏ trôi ngang. Trên đó còn một căn nhà, cửa mở, đèn vẫn sáng.']],
        [['narr', 'Một mảnh quy tắc gãy bay lạc, chạm vào tay ngươi rồi hóa thành vật có thể cầm được.']],
        [['narr', 'Trong hư không có tiếng rao hàng rất xa. Khi ngươi quay lại, chỉ còn một gói đồ lơ lửng.']]
    ],
    hondon: [
        [['narr', 'Sóng hỗn độn dạt vào một vật chưa có tên. Ngươi đặt tên cho nó, và nó trở nên dùng được.']],
        [['narr', 'Một Đạo Giả ngồi câu trên hư vô, không ngẩng đầu, ném cho ngươi thứ vừa cắn câu.']]
    ],
    hongmong: [
        [['narr', 'Một sợi tử khí quấn quanh cổ tay ngươi, ngưng lại rồi rơi xuống thành vật thật.']],
        [['narr', 'Một chiếc lá của Cổ Thụ bay lạc tới, gân lá chỉ về thứ gì đó nằm ngay chân ngươi.']]
    ],
    chungnguyen: [
        [['narr', 'Một đoạn ký ức của ngươi trôi ngang, trong đó có món đồ ngươi đã làm rơi từ kiếp trước.']],
        [['narr', 'Dòng thời gian khẽ rẽ, để lại bên bờ một vật ướt nước.']]
    ],
    huvo: [
        [['narr', 'Trong Hư Vô Cung không có gì rơi xuống, vì không có gì ngoài ngươi. Ngươi nghĩ tới một món đồ, và nó ở đó.']]
    ]
};

/* Mỗi tiểu cảnh giới có vài việc riêng, sinh theo nơi cùng tầm cảnh giới. Không chặn đột phá, qua tiểu cảnh là hết hạn */
const STAGE_QUEST_COUNT = 3;
const STAGE_HUNT_TITLES = ['Trừ Hại {enemy}', 'Lệnh Truy Sát {enemy}', 'Dấu Vết {enemy}', 'Thử Tay Với {enemy}', 'Vây Quét {enemy}', 'Món Nợ Của {enemy}', 'Tin Đồn Về {enemy}', 'Đêm Săn {enemy}'];
const STAGE_HUNT_HOOKS = [
    [['narr', 'Dân quanh {loc} đồn rằng {enemy} lại xuất hiện. Sau khi tắt nắng, không ai dám ra khỏi cửa.']],
    [['narr', 'Trước {loc} treo một tờ cáo thị rách: ai diệt được {enemy} thì có thưởng.'], ['narr', 'Bên dưới có ba chữ ký đã bị gạch.']],
    [['narr', 'Một tu sĩ bị thương lết tới trước mặt ngươi, chỉ kịp nói: "{enemy}... {loc}..."']],
    [['narr', 'Một đứa trẻ níu áo ngươi. Nó nói {enemy} ở {loc} đã ăn mất con dê duy nhất của nhà nó.']],
    [['narr', 'Một thương đoàn dừng chân, không dám đi tiếp về phía {loc}. {enemy} đã chặn đường ba hôm.']],
    [['narr', 'Bà cụ bán trà đầu ngõ hạ giọng: "Ở {loc} bây giờ toàn {enemy}. Con trai ta đi hái thuốc, hai ngày chưa về."']],
    [['narr', 'Một tiều phu vác bó củi chạy ngang qua, vừa chạy vừa ngoái lại. Hỏi ra mới biết {enemy} vừa đuổi hắn ra khỏi {loc}.']],
    [['narr', 'Trưởng thôn gần {loc} đặt lên bàn một túi bạc lẻ, toàn những đồng mòn vẹt.'], ['narr', '"Cả thôn góp lại đấy. Dẹp giúp bọn {enemy}."']],
    [['narr', 'Đêm qua có tiếng hú vọng về từ {loc}. Sáng ra, hàng rào nhà ai cũng có vết cào của {enemy}.']],
    [['narr', 'Một nữ tu đang mài kiếm ven đường ngẩng lên nhìn ngươi.'], ['narr', '"Ta đi {loc} một mình không nổi. {enemy} đông hơn ta tưởng. Ngươi đi thì ta chỉ đường."']]
];
const STAGE_HUNT_TALKS = [
    [['me', 'Chúng ra lúc nào?'], ['narr', '"Chạng vạng. Lúc mắt người kém nhất thì mũi chúng thính nhất."']],
    [['me', 'Trước đây có ai đi dẹp chưa?'], ['narr', '"Có. Họ về được, nhưng ít hơn lúc đi."']],
    [['me', 'Chúng đông không?'], ['narr', 'Người kia giơ cả hai bàn tay lên, gập lại, rồi giơ lên lần nữa.']],
    [['me', 'Sao trước đây không có?'], ['narr', '"Linh khí mỏng đi, thú đói thì mò xuống gần người. Người đói thì mò lên gần thú."']],
    [['me', 'Thưởng bao nhiêu?'], ['narr', '"Không nhiều. Đủ cho một bữa rượu và một lời cảm ơn thật lòng."']],
    [['me', 'Chúng có điểm yếu nào không?'], ['narr', '"Có. Chúng chỉ biết lao tới. Người bình tĩnh thì sống."']],
    [['me', 'Trong đó có con đầu đàn không?'], ['narr', '"Không ai thấy. Nhưng cách chúng đi thành hàng thì chắc là có."']],
    [['me', 'Cứ để ta.'], ['narr', 'Người kia nhìn ngươi hồi lâu, như cố nhớ mặt ngươi phòng khi phải kể lại với ai đó.']]
];
const STAGE_HUNT_CLOSES = [
    [['narr', 'Ngươi siết lại đai lưng rồi lên đường.']],
    [['narr', 'Tu vi vừa tăng cũng cần một chỗ để thử. Ngươi đi về phía {loc}.']],
    [['narr', 'Trước khi đi, ngươi được dúi vào tay một nắm cơm nắm, vẫn còn ấm.']],
    [['narr', 'Một con chó già lẽo đẽo theo ngươi tới đầu làng rồi ngồi lại, không đi nữa.']],
    [['narr', 'Bầu trời phía {loc} xám hơn những chỗ khác.']],
    [['narr', '"Về được thì kể ta nghe," có người nói với theo.']],
    [['narr', 'Ngươi ghi nhớ con đường, phòng khi phải chạy về.']],
    [['narr', 'Gió đổi chiều, mang tới mùi tanh. Chúng ở không xa.']]
];
const STAGE_HUNT_AFTERS = [
    [['narr', 'Chiến trường yên lại. Tay ngươi vững hơn lúc đến.']],
    [['narr', 'Con cuối cùng gục xuống trước mặt ngươi, mắt vẫn mở.']],
    [['narr', 'Máu {enemy} thấm xuống đất, bốc lên một làn hơi mỏng rồi tan.']],
    [['narr', 'Ngươi thở dốc, lau kiếm vào vạt áo. Lần sau sẽ nhanh hơn.']],
    [['narr', 'Trận này dài hơn ngươi tưởng. Khi xong, mặt trời đã nghiêng hẳn.']],
    [['narr', 'Con đầu đàn ngã xuống, đám còn lại tản vào rừng, không quay lại nữa.']],
    [['narr', 'Một vết rách trên tay áo nhắc ngươi rằng con thứ ba đã suýt chạm tới cổ.']],
    [['narr', 'Xong việc. {loc} im ắng tới mức nghe được cả tiếng lá rơi.']]
];
const STAGE_HUNT_MOMENTS = [
    [['narr', 'Trên xác một con có vết thương cũ, như từng bị thứ gì lớn hơn đuổi khỏi chỗ ở.'], ['me', 'Vậy còn thứ đã đuổi chúng thì sao?']],
    [['narr', 'Một lão nông mang ra bầu rượu nhạt, bảo dành cho người dọn sạch đường, ba năm rồi chưa ai uống.'], ['narr', '"Chờ ba năm thì nó nhạt," lão cười. "Người chờ cũng vậy."']],
    [['me', 'Các ngươi cũng chỉ đi kiếm ăn.'], ['narr', 'Ngươi chôn chúng ở rìa {loc}. Không ai bảo ngươi làm vậy, cũng không ai thấy.']],
    [['narr', 'Trong hang chúng có mấy món đồ của người: một chiếc giày, nửa cái nón, một cái trâm gãy.'], ['narr', 'Ngươi gói lại, mang về cho ai còn nhận ra.']],
    [['narr', 'Đứa trẻ chăn trâu đứng xem từ trên đồi, giờ chạy xuống hỏi ngươi học kiếm ở đâu.'], ['me', 'Ở chỗ không có ai dạy.']],
    [['narr', 'Một con non trốn dưới gốc cây, run lẩy bẩy. Ngươi nhìn nó một lúc rồi quay đi.']],
    [['narr', 'Ngươi ngồi xuống điều tức. Linh lực chảy qua kinh mạch êm hơn trước, như dòng suối vừa được khơi.']],
    [['narr', 'Từ xa, tiếng chuông chiều của ngôi chùa nhỏ vọng lại. Hôm nay người ta sẽ dám thắp đèn muộn hơn.']]
];
const STAGE_GATHER_TITLES = ['Ngộ Đạo Tại {loc}', 'Thu Thập Linh Vật {loc}', 'Khảo Sát {loc}', 'Lắng Nghe {loc}', 'Vẽ Bản Đồ {loc}', 'Tìm Di Tích {loc}'];
const STAGE_GATHER_LABELS = ['Tĩnh tọa ngộ đạo', 'Thu thập linh vật', 'Khảo sát địa mạch', 'Lắng nghe linh khí', 'Ghi chép địa hình', 'Tìm dấu di tích'];
const STAGE_GATHER_HOOKS = [
    [['narr', 'Linh khí ở {loc} chuyển động theo nhịp lạ. Ở tiểu cảnh này ngươi đã nghe được nó.']],
    [['narr', 'Một cuốn sổ cũ nhắc tới {loc}, trang cuối bị xé mất.']],
    [['narr', 'Người dẫn đường của vùng này đã đi xa, để lại tấm bản đồ {loc} mới vẽ một nửa.']],
    [['narr', 'Có người kể ở {loc} có một khoảng đất cỏ không mọc, lá rơi xuống cũng tự bay đi.']],
    [['narr', 'Một lão dược nông nhờ ngươi tới {loc} xem giúp mạch đất. Năm nay ruộng thuốc của lão héo nửa.']],
    [['narr', 'Một học trò thư viện gửi ngươi danh sách những thứ cần ghi chép ở {loc}, chữ viết run run.'], ['narr', '"Thầy ta già rồi, không tự đi được nữa."']],
    [['narr', 'Đêm rằm, phía {loc} có ánh sáng mờ nhấp nháy như đom đóm, nhưng không phải mùa đom đóm.']],
    [['narr', 'Trong lúc tĩnh tọa, tâm ngươi cứ hướng về {loc}, như có ai gọi khẽ.']]
];
const STAGE_GATHER_TALKS = [
    [['me', 'Nơi ấy có gì lạ?'], ['narr', '"Từ đời ông bà đã thế. Chưa ai nghĩ tới việc ngồi xuống nghe thử."']],
    [['me', 'Sao không ai tới xem?'], ['narr', '"Có, nhưng người ta chỉ đi qua. Muốn hiểu thì phải ngồi lại."']],
    [['me', 'Cần bao lâu?'], ['narr', '"Một canh giờ, hoặc cả đời. Tùy người."']],
    [['me', 'Có nguy hiểm không?'], ['narr', '"Với người vội vàng thì có."']],
    [['me', 'Ta nên tìm gì?'], ['narr', '"Thứ gì khác với hôm qua. Ở đó, thứ gì khác là thứ đáng nhớ."']],
    [['me', 'Người trước đã tìm thấy gì?'], ['narr', '"Hắn không nói. Hắn chỉ cười, rồi đi xa hơn."']]
];
const STAGE_GATHER_CLOSES = [
    [['narr', 'Ngươi gói ít lương khô rồi lên đường.']],
    [['narr', 'Muốn đi xa hơn thì trước tiên phải hiểu nơi mình đang đứng.']],
    [['narr', 'Ngươi mang theo bút mực, một tấm vải dầu và chút kiên nhẫn.']],
    [['narr', 'Đường tới {loc} không xa, nhưng ngươi đi chậm để nhìn cho kỹ.']],
    [['narr', 'Trời quang. Một ngày tốt để ngồi yên.']],
    [['narr', 'Ngươi hít một hơi sâu. Lần này không phải để đánh nhau.']]
];
const STAGE_GATHER_AFTERS = [
    [['narr', 'Một chút tâm đắc lắng xuống đan điền.']],
    [['narr', 'Thứ tìm được không lớn, nhưng là của riêng ngươi.']],
    [['narr', 'Ngươi ghi lại mọi thứ, biết đâu về sau cần tới.']],
    [['narr', 'Khi ngươi mở mắt, sương đã tan và chân đã tê.']],
    [['narr', 'Ngươi đứng dậy, nhẹ hơn lúc ngồi xuống.']],
    [['narr', 'Tấm bản đồ trong tay ngươi giờ đầy thêm vài nét.']]
];
const STAGE_GATHER_MOMENTS = [
    [['narr', 'Linh khí ở đây không đứng yên. Nó trôi lên rất chậm, như khói hương trong căn nhà không có gió.'], ['me', 'Đi lên đâu?']],
    [['narr', 'Một con sóc ngồi cạnh ngươi suốt buổi, như cũng đang tu.']],
    [['narr', 'Dưới lớp rêu là một phiến đá khắc chữ đã mờ. Ngươi chỉ đọc được hai chữ "đã tới".']],
    [['me', 'Lần sau ta sẽ ngồi lâu hơn.'], ['narr', 'Gió thổi qua, như đáp rằng nơi này không vội.']],
    [['narr', 'Mạch đất ở đây chạy lệch về một phía. Ruộng thuốc của ai đó sẽ cần được đào lại mương.']],
    [['narr', 'Ngươi bỏ lại một hòn đá xếp chồng lên những hòn đá người trước để lại. Chồng đá đã cao tới gối.']],
    [['narr', 'Ở đây yên tới mức ngươi nghe thấy tim mình đập, chậm và đều.']]
];
const STAGE_REPORT_OPENS = [
    [['narr', 'Ngươi quay lại báo tin. Người giao việc gật đầu, dúi vào tay ngươi chút lộ phí.']],
    [['narr', 'Ngươi về tới nơi khi đèn vừa thắp. Người giao việc đếm lộ phí hai lần rồi mới đưa.']],
    [['narr', 'Nghe xong, người giao việc thở phào, như vừa đặt xuống một gánh nặng.']],
    [['narr', 'Người giao việc đã đứng chờ sẵn ở cổng. Nhìn mặt ngươi là đủ hiểu.']],
    [['narr', 'Tin truyền về trước cả ngươi. Lúc ngươi tới, lộ phí đã gói sẵn.']],
    [['narr', 'Ngươi kể lại ngắn gọn. Người giao việc nghe hết, không ngắt lời câu nào.']]
];
const STAGE_REPORT_REMARKS = [
    [['narr', '"Đi đường cẩn thận," người đó nói.']],
    [['me', 'Sợ thiếu à?'], ['narr', '"Sợ thừa. Thừa thì phải ghi sổ, mà ta ghét ghi sổ."']],
    [['narr', 'Họ mời ngươi ở lại ăn cơm. Ngươi từ chối, họ vẫn gói cho ngươi một nắm.']],
    [['narr', '"Lần sau có việc, ta biết tìm ai rồi."']],
    [['narr', 'Một đứa trẻ trốn sau cột nhà nhìn ngươi, rồi chạy vào kể cho cả nhà.']],
    [['narr', '"Người tu tiên mà chịu làm việc vặt," người đó lắc đầu cười. "Hiếm."']],
    [['me', 'Không cần nhiều thế.'], ['narr', '"Cầm lấy. Không cầm thì ta mắc nợ, mà ta ghét mắc nợ hơn ghét mất tiền."']],
    [['narr', 'Người đó rót cho ngươi một chén trà nóng. Hai người ngồi im một lúc, không ai cần nói gì.']]
];

function stageFill(text, loc, enemy) {
    return text.replace(/\{loc\}/g, loc.name).replace(/\{enemy\}/g, enemy || '');
}

function stagePick(pool, seed, salt, offset = 0) {
    let h = Math.imul(seed, 0x9e3779b1) ^ Math.imul(salt + 1, 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    h ^= h >>> 16;
    return pool[((h >>> 0) + offset) % pool.length];
}

function stageLines(seed, offset, loc, enemy, ...pools) {
    return pools.flatMap((pool, i) => stagePick(pool, seed, i * 7 + pools.length, offset)).map(([who, text]) => [who, stageFill(text, loc, enemy)]);
}

function stageQuest(realm, stage, slot) {
    const sites = Object.values(LOCATIONS).filter(l => l.minR <= realm && l.maxR >= realm && (l.enemies || []).length);
    const seed = realm * 31 + stage * 7 + slot * 3;
    const mix = realm * 1000 + stage * 10;
    const loc = sites[(seed + slot * Math.ceil(sites.length / STAGE_QUEST_COUNT)) % sites.length];
    const id = `st_${realm}_${stage}_${slot}`;
    const base = { id, loc: loc.id, npc: 'narr', needs: [realm, stage], until: [realm, stage], stageQuest: true, reward: { hours: 0.5 + stage * 0.25, goldRefs: 3 + stage } };
    const report = { go: loc.id, say: stageLines(mix, slot, loc, '', STAGE_REPORT_OPENS, STAGE_REPORT_REMARKS) };
    if (slot === 2) {
        return {
            ...base,
            title: stageFill(stagePick(STAGE_GATHER_TITLES, mix, 1, slot), loc),
            intro: stageLines(mix, slot, loc, '', STAGE_GATHER_HOOKS, STAGE_GATHER_TALKS, STAGE_GATHER_CLOSES),
            steps: [{ gather: { loc: loc.id, hours: 1, label: stagePick(STAGE_GATHER_LABELS, mix, 2, slot) }, say: stageLines(mix, slot, loc, '', STAGE_GATHER_AFTERS, STAGE_GATHER_MOMENTS) }, report]
        };
    }
    const enemy = loc.enemies[seed % loc.enemies.length].name;
    return {
        ...base,
        title: stageFill(stagePick(STAGE_HUNT_TITLES, mix, 1, slot), loc, enemy),
        intro: stageLines(mix, slot, loc, enemy, STAGE_HUNT_HOOKS, STAGE_HUNT_TALKS, STAGE_HUNT_CLOSES),
        steps: [{ hunt: { loc: loc.id, name: enemy, n: 3 + stage }, say: stageLines(mix, slot, loc, enemy, STAGE_HUNT_AFTERS, STAGE_HUNT_MOMENTS) }, report]
    };
}

const STAGE_QUESTS = [];
for (let realm = 0; realm < REALM_COUNT; realm++) {
    for (let stage = 0; stage < 4; stage++) {
        if (realm < OVERSEER_REALM) for (let slot = 0; slot < STAGE_QUEST_COUNT; slot++) STAGE_QUESTS.push(stageQuest(realm, stage, slot));
    }
}
SIDE_QUESTS.push(...STAGE_QUESTS);
STAGE_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });

const YEU_QUESTS = [
    {
        id: 'open_yeu_do', loc: 'yeu_do', npc: 'narr', title: 'Lệnh Bài Yêu Đô', needs: [10, 0], reward: { hours: 1, goldRefs: 5, opens: 'yeu_do' },
        intro: [['narr', 'Lính gác nhìn ngươi như nhìn món ăn: "Người muốn mua bán ở Yêu Đô thì phải có công với yêu tộc. Sơn Quân ngoài kia đang cắn nhau, dẹp đi."']],
        steps: [{ hunt: { loc: 'thap_van_son', name: 'Sơn Quân', n: 6 }, say: [['narr', 'Lính gác ném cho ngươi một miếng xương khắc chữ. Chợ và lò trong đô mở cho ngươi.']] }]
    },
    {
        id: 's_yeu_quan', loc: 'yeu_quan', npc: 'narr', title: 'Đất Của Yêu', needs: [9, 2], reward: { hours: 2, goldRefs: 10 },
        intro: [['narr', 'Trên cửa quan khắc: "Trời chia người với yêu, ta chia lại." Muốn đi qua thì phải thắng kẻ giữ cửa.']],
        steps: [{ hunt: { loc: 'yeu_quan', name: 'Lang Tướng', n: 5 }, say: [['narr', 'Yêu binh tránh sang hai bên. Từ đây về nam là đất của chúng, không phải của Thiên Đình.']] }]
    },
    {
        id: 's_thanh_khau', loc: 'thanh_khau', npc: 'narr', title: 'Tiếng Cười Thanh Khâu', needs: [11, 2], reward: { hours: 3, goldRefs: 15 },
        intro: [['narr', 'Ngươi đi mãi vẫn về chỗ cũ. Có ai đó đang cười sau rặng đào.']],
        steps: [{ gather: { loc: 'thanh_khau', hours: 2, label: 'Giữ tâm phá ảo trận' } }, { hunt: { loc: 'thanh_khau', name: 'Hồ Mị', n: 6 }, say: [['narr', 'Rừng đào tan. Một con hồ trắng ngồi nhìn ngươi, gật đầu rồi biến mất.']] }]
    },
    {
        id: 's_hoa_long', loc: 'hoa_long_tri', npc: 'narr', title: 'Ao Không Có Đáy', needs: [12, 2], reward: { hours: 4, goldRefs: 20 },
        intro: [['narr', 'Những con mãng lên bờ đều không còn vảy. Có thứ gì đó dưới ao không muốn thêm rồng mới.']],
        steps: [{ hunt: { loc: 'hoa_long_tri', name: 'Bán Long', n: 8 }, say: [['narr', 'Nước ao dịu lại. Dưới đáy có vật gì vừa nhắm mắt.']] }]
    },
    {
        id: 's_yeu_hoang', loc: 'yeu_hoang_dien', npc: 'narr', title: 'Diện Kiến Yêu Hoàng', needs: [14, 2], reward: { hours: 6, goldRefs: 30 },
        intro: [['narr', 'Cửa điện không có lính. Giọng nói từ trong vọng ra: "Tiên cũng dám tới đây. Giỏi. Qua được cận vệ của ta thì nói chuyện."']],
        steps: [{ hunt: { loc: 'yeu_hoang_dien', name: 'Yêu Thánh Cận Vệ', n: 8 }, say: [['narr', 'Trong bóng tối có tiếng cười nhẹ: "Thiên Đình có một kẻ như ngươi, trẫm ngủ không yên rồi."']] }]
    }
];
SIDE_QUESTS.push(...YEU_QUESTS);
YEU_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });

/* Dò la tin tức: mỗi Giới một chuỗi, nơi tới được sớm thì dò trước; cùng cảnh giới thì lò thường trước rồi tới Chợ Đen, Thần lò */
const INTEL_FORGE_HOURS = [1, 2, 4];
const INTEL_MARKET_HOURS = 3;

function intelDirection(tier, loc) {
    const h = loc.x < (tier.mapW || 1000) / 3 ? 'tây' : loc.x > (tier.mapW || 1000) * 2 / 3 ? 'đông' : '';
    const v = loc.y < (tier.mapH || 560) / 3 ? 'bắc' : loc.y > (tier.mapH || 560) * 2 / 3 ? 'nam' : '';
    return v || h ? `phía ${[h, v].filter(Boolean).join(' ')}` : 'vùng giữa';
}

/* Mỗi tin một người kể ở một nơi khác nhau: lò thường nghe ở gần cổng Giới, lò càng lớn càng phải đi xa mới có người biết */
const INTEL_LINES = [
    (s, label, where) => `Khách lữ hành ở ${s.name} rỉ tai nhau về một ${label} nằm ở ${where}. Muốn biết chính xác thì phải chịu khó nghe ngóng.`,
    (s, label, where) => `Ta từng thấy khói của một ${label} bốc lên ở ${where}, nhưng đường tới thì quên mất rồi. Ở lại ${s.name} hỏi thêm người qua lại xem.`,
    (s, label, where) => `Người ở ${s.name} hay nhắc tới một ${label} ở ${where}. Họ không kể không công đâu, ngồi lại mà nghe.`,
    (s, label, where) => `Có kẻ say rượu ở ${s.name} khoe từng tới một ${label} ở ${where}. Chờ hắn tỉnh rồi hỏi cho rõ.`,
    (s, label, where) => `Một ${label} ở ${where}? Đám già ở ${s.name} biết đường, nhưng phải ngồi uống với họ mấy tuần trà mới chịu nói.`
];

function intelQuest(tier, source, loc, label, hours, after, i) {
    const key = residentKey(source.id);
    return {
        id: `intel_${loc.id}`, loc: source.id, npc: 'narr', title: `Dò La: ${label}`, needs: [Math.max(tier.from, source.minR), 0], after, reward: { hours: 0.5, goldRefs: 2, intel: loc.id },
        intro: [[key, INTEL_LINES[(tier.from + i) % INTEL_LINES.length](source, label, `${intelDirection(tier, loc)} ${tier.name}`)]],
        steps: [{ gather: { loc: source.id, hours, label: 'Dò la tin tức' }, say: [[key, `Tìm ra rồi: ${label} ở ${loc.name}. Ngươi ghi vào Địa Chí.`]] }]
    };
}

function intelHops(start) {
    const hops = { [start.id]: 0 };
    const queue = [start.id];
    while (queue.length) {
        const at = queue.shift();
        LOCATIONS[at].links.filter(id => LOCATIONS[id].world === start.world && hops[id] == null).forEach(id => { hops[id] = hops[at] + 1; queue.push(id); });
    }
    return hops;
}

const INTEL_QUESTS = WORLD_TIERS.flatMap(tier => {
    const sites = Object.values(LOCATIONS).filter(l => l.world === tier.id);
    const start = sites.reduce((best, l) => l.minR < best.minR ? l : best);
    const hops = intelHops(start);
    const forges = sites.filter(l => (l.services || []).includes('forge')).sort((a, b) => (a.forgeGrade || 0) - (b.forgeGrade || 0));
    const forgeEntry = l => ({ loc: l, label: forgeGradeOf(l).name + (l.blackMarket ? ' và Chợ Đen' : ''), hours: INTEL_FORGE_HOURS[l.forgeGrade || 0] });
    const chain = [
        ...forges.filter(l => !forgeGradeOf(l).wholeWorld).map(forgeEntry),
        ...sites.filter(l => l.blackMarket && !forges.includes(l)).map(l => ({ loc: l, label: 'Chợ Đen', hours: INTEL_MARKET_HOURS })),
        ...forges.filter(l => forgeGradeOf(l).wholeWorld).map(forgeEntry)
    ].map((entry, order) => ({ ...entry, order })).sort((a, b) => a.loc.minR - b.loc.minR || a.order - b.order);
    const used = new Set();
    return chain.map((entry, i) => {
        const pool = sites.filter(l => l !== entry.loc && !l.seatOnly && hops[l.id] != null && l.minR <= entry.loc.minR)
            .sort((a, b) => hops[a.id] - hops[b.id] || a.minR - b.minR || a.id.localeCompare(b.id));
        const free = pool.filter(l => !used.has(l.id));
        const list = free.length ? free : pool;
        const source = list[chain.length > 1 ? Math.round(i * (list.length - 1) / (chain.length - 1)) : 0];
        used.add(source.id);
        return intelQuest(tier, source, entry.loc, entry.label, entry.hours, i ? `intel_${chain[i - 1].loc.id}` : null, i);
    });
});
SIDE_QUESTS.push(...INTEL_QUESTS);
INTEL_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });
const INTEL_SOURCE_NAMES = INTEL_QUESTS.reduce((names, q) => {
    const world = LOCATIONS[q.loc].world;
    names[world] = names[world] ? `${names[world]}, ${LOCATIONS[q.loc].name}` : LOCATIONS[q.loc].name;
    return names;
}, {});

/* Mỗi cảnh giới mốc có ba nhiệm vụ phụ nối nhau ở cảnh giới cuối trước mốc, mở dần từ Sơ Kỳ tới Đại Viên Mãn, cộng lại đủ sáu món */
const GATE_QUEST_HUNT = 6;
const GATE_QUEST_STAGES = [0, 2, 3];
const GATE_QUEST_GATHER_HOURS = 6;
const GATE_QUEST_SETS = {
    9: [
        { loc: 'long_cung', npc: 'narr', title: 'Giáp Vảy Đông Hải', hunt: 'Giao Long', slots: ['armor', 'helm'], intro: 'Phàm cốt không chịu nổi tiên khí đâu. Vảy Giao Long dưới Long Cung may được giáp, ngươi dám xuống lấy không?', done: 'Giáp này tiên khí xuyên không thủng. Mặc vào rồi hẵng nghĩ tới chuyện phi thăng.' },
        { loc: 'ma_uyen', npc: 'narr', title: 'Thép Tôi Ma Hỏa', hunt: 'Vực Ma', slots: ['weapon', 'ring'], intro: 'Binh khí phàm gặp tiên khí là gãy. Đúc lại bằng ma hỏa của Vực Ma thì may ra chịu được.', done: 'Lửa ma tôi xong thì tiên khí cũng chẳng làm gì nổi. Cầm lấy.' },
        { loc: 'phi_thang', npc: 'narr', title: 'Lôi Vân Dưới Chân', hunt: 'Lôi Thú', slots: ['boots', 'amulet'], intro: 'Lôi vân trên đài không nhận kẻ thiếu đồ. Hạ Lôi Thú, ta luyện lôi hạch của chúng thành ngọc bội và vân hài.', done: 'Đủ sáu món cấp Tiên rồi. Lôi vân sẽ không đánh nhầm người nữa.' }
    ],
    19: [
        { loc: 'da_bao', npc: 'da_bao', title: 'Trả Công Bằng Tử Khí', hunt: 'Thánh Giới Đạo Tặc', slots: ['armor', 'helm'], intro: 'Hết tiền mua đồ à? Ta không cho không, nhưng ta trả công. Dẹp đạo tặc trước chợ, hai phần tử khí đầu tiên là của ngươi.', done: 'Sòng phẳng. Bốn phần còn lại nằm ở Bắc Minh và Phù Tang.' },
        { loc: 'bac_minh', npc: 'narr', title: 'Tử Khí Dưới Đáy Bắc Minh', hunt: 'Bắc Minh Giao', slots: ['weapon', 'ring'], intro: 'Đáy biển này có hai sợi tử khí chìm từ thời Tam Thanh còn trẻ. Bọn giao long nuốt hết rồi.', done: 'Tử khí vẫn còn ấm. Rèn vào binh khí đi, nó tự biết đường.' },
        { loc: 'phu_tang', npc: 'narr', title: 'Tử Khí Trên Cành Phù Tang', hunt: 'Phù Tang Mộc Linh', slots: ['boots', 'amulet'], intro: 'Cây thần giữ hai sợi tử khí cuối. Mộc linh không chịu buông, phải đánh cho chúng buông.', done: 'Đủ sáu phần Hồng Mông Tử Khí. Cửa Thánh giờ không có lý do gì để đóng trước mặt ngươi.' }
    ],
    22: [
        { loc: 'bich_du', npc: 'narr', title: 'Kiếm Ý Tôi Giáp', hunt: 'Tru Tiên Kiếm Linh', slots: ['armor', 'helm'], intro: 'Muốn chạm vào cảnh giới Thiên thì thân phải chịu được kiếm ý của Tru Tiên. Giáp tôi trong đó mới dùng được.', done: 'Kiếm ý không xuyên qua nổi nữa. Cầm lấy, đừng nói ai cho.' },
        { loc: 'linh_son', npc: 'narr', title: 'Xá Lợi Sa Đọa', hunt: 'La Hán Sa Đọa', slots: ['weapon', 'ring'], intro: 'La Hán sa đọa vẫn còn giữ xá lợi. Thứ đó luyện vào binh khí thì đánh được cả đạo vận cấp Thiên.', done: 'Tiếng chuông trên núi nhẹ đi một chút. Đây là phần của ngươi.' },
        { loc: 'cuc_lac', npc: 'narr', title: 'Kim Thân Hộ Pháp', hunt: 'Kim Cương Hộ Pháp', slots: ['boots', 'amulet'], intro: 'Hộ pháp ở đây đã mất tâm từ lâu, chỉ còn kim thân. Phá ra, phần vàng ấy đúc được đồ cấp Thiên.', done: 'Đủ sáu món cấp Thiên. Cánh cửa Chuẩn Thiên chỉ đợi tu vi của ngươi thôi.' }
    ],
    29: [
        { loc: 'khai_thien', npc: 'hoang_cong', title: 'Quy Tắc Làm Giáp', hunt: 'Quy Tắc Thể', slots: ['armor', 'helm'], intro: 'Hỗn Độn không có luật, thân không có giáp là tan. Mang Quy Tắc Thể về, ta đóng luật thành giáp cho ngươi.', done: 'Mặc vào đi. Ngoài kia không có gì giữ hình dạng cho ngươi ngoài bộ này.' },
        { loc: 'hu_nhan', npc: 'narr', title: 'Con Ngươi Của Hư Không', hunt: 'Hư Không Ma Đồng', slots: ['weapon', 'ring'], intro: 'Con mắt này nhìn được Hỗn Độn. Móc đồng tử của nó ra, luyện vào binh khí thì mới đánh trúng thứ không có hình.', done: 'Binh khí này nhìn thấy đường. Tay ngươi chỉ cần đi theo.' },
        { loc: 'than_dinh', npc: 'narr', title: 'Dấu Ấn Đạo Vệ', hunt: 'Đạo Vệ', slots: ['boots', 'amulet'], intro: 'Đạo Vệ đeo dấu ấn đi lại qua bờ Hỗn Độn. Lấy đủ thì ngươi cũng đi được.', done: 'Đủ sáu món cấp Hỗn Độn. Bờ bên kia không còn là chỗ chết nữa.' }
    ],
    30: [
        { loc: 'ma_than_mo', npc: 'hd_thu_cuu', title: 'Long Cốt Hỗn Độn', gather: { loc: 'ma_than_mo', hours: GATE_QUEST_GATHER_HOURS, label: 'Nhặt long cốt' }, slots: ['armor', 'helm'], intro: 'Hồng Mông có trước cả Hỗn Độn, đồ thường vào đó là thành không có. Long cốt ở đây đủ cũ để sống sót.', done: 'Long cốt không chịu mục. Ngươi mặc nó thì cũng không mục.' },
        { loc: 'vo_chung_lau', npc: 'am_duong', title: 'Tầng Không Có Số', gather: { loc: 'vo_chung_lau', hours: GATE_QUEST_GATHER_HOURS, label: 'Leo tầng không có số' }, slots: ['weapon', 'ring'], intro: 'Tháp này cất thứ binh khí chưa từng được rèn. Leo đủ lâu, nó sẽ tự rơi vào tay ngươi.', done: 'Tháp vẫn không có tầng cuối, nhưng ngươi đã có thứ để mang đi.' },
        { loc: 'hai_tam', npc: 'vo_danh', title: 'Hơi Thở Hải Tâm', gather: { loc: 'hai_tam', hours: GATE_QUEST_GATHER_HOURS, label: 'Ngồi giữa mắt bão' }, slots: ['boots', 'amulet'], intro: 'Mắt bão này thở ra hơi của Hồng Mông. Ngồi giữa bão đủ lâu mà không tan thì hơi ấy đọng lại thành đồ.', done: 'Đủ sáu mảnh rèn Hồng Mông. Giờ tự rèn lấy, Tử Khí Thiên Nguyên sẽ nhận ra ngươi.' }
    ]
};

const GATE_QUESTS = Object.entries(GATE_QUEST_SETS).flatMap(([gate, set]) => set.map((entry, stage) => {
    const realm = Number(gate) - 1;
    const speaker = entry.npc === 'narr' ? `dan_${entry.loc}` : entry.npc;
    return {
        id: `gate_${gate}_${stage}`, loc: entry.loc, npc: entry.npc, title: entry.title, realmOnly: realm, needs: [realm, GATE_QUEST_STAGES[stage]],
        after: stage ? `gate_${gate}_${stage - 1}` : null,
        intro: [[speaker, entry.intro]],
        steps: [{ ...(entry.gather ? { gather: entry.gather } : { hunt: { loc: entry.loc, name: entry.hunt, n: GATE_QUEST_HUNT } }), say: [[speaker, entry.done]] }],
        reward: gateTierOf(Number(gate)).pieces
            ? { forgePieces: { realm: Number(gate), slots: entry.slots } }
            : { hours: 2, goldRefs: 10, gateGear: { realm: Number(gate), slots: entry.slots } }
    };
}));
SIDE_QUESTS.push(...GATE_QUESTS);
GATE_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });

/* Cư dân: mỗi nơi có một người để hỏi chuyện, nơi có lò thêm thợ rèn; nhiệm vụ không có NPC riêng do cư dân giao */
const NPC_SEED = text => [...text].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
const RESIDENT_SURNAMES = ['Lâm', 'Trần', 'Vân', 'Thẩm', 'Mộ', 'Tần', 'Hứa', 'Liễu', 'Phong', 'Bạch', 'Cố', 'Diệp'];
const RESIDENT_GIVEN = ['Đại Thúc', 'Lão Nhân', 'Nương Tử', 'Tiểu Ca', 'Bà Bà', 'Đạo Hữu', 'Tán Nhân', 'Khách'];
const RESIDENT_ROLES = { town: 'Dân trong thành', sect: 'Đệ tử trông sân', wild: 'Kẻ quen đường', dungeon: 'Người sống sót', gate: 'Người giữ cửa' };
const RESIDENT_COLORS = ['#55524a', '#3f6f9e', '#8c6a3a', '#6b4a8f', '#3e7d5a', '#8c3a3a'];
const SMITH_NAMES = ['Lão Thiết', 'Hỏa Thủ', 'Kim Chùy', 'Đoàn Lão', 'Lô Sư', 'Mặc Chùy', 'Thạch Bà', 'Ân Lão Đầu', 'Viêm Thúc', 'Tôn Tam Chùy', 'Cổ Dã Tử', 'Lục Đe'];
let smithCount = 0;

function residentKey(locId) {
    return `dan_${locId}`;
}

function npcLookFromSeed(seed) {
    return NPC_LOOK(seed % 2 ? 'm' : 'f', seed % 6, RESIDENT_COLORS[seed % 3], RESIDENT_COLORS[seed % RESIDENT_COLORS.length]);
}

/* Hỗn Độn Hải chỉ có sáu Đạo Giả nên người ở mỗi nơi đều là một trong sáu vị đó */
const HONDON_DAO_GIA = ['hd_thu_cuu', 'hd_vo_thuc', 'am_duong', 'thich_thien', 'vo_danh', 'vong_ky'];

const LOCATION_NPCS = {};
Object.values(LOCATIONS).forEach(loc => {
    const seed = NPC_SEED(loc.id);
    const named = [...new Set([...SIDE_QUESTS.filter(q => q.loc === loc.id && q.npc !== 'narr').map(q => q.npc), ...(HH_HOMES[loc.id] || [])])];
    const storySpeakers = MAIN_QUESTS.flatMap(questAllSteps).filter(step => step.go === loc.id).map(speakerOfStep);
    const freeDaoGia = loc.world === 'hondon'
        ? HONDON_DAO_GIA.map((_, i) => HONDON_DAO_GIA[(seed + i) % HONDON_DAO_GIA.length]).filter(key => !named.includes(key) && !storySpeakers.includes(key)).map(key => NPCS[key])
        : [];
    NPCS[residentKey(loc.id)] = freeDaoGia[0] || {
        name: `${RESIDENT_SURNAMES[seed % RESIDENT_SURNAMES.length]} ${RESIDENT_GIVEN[(seed >>> 4) % RESIDENT_GIVEN.length]}`,
        title: RESIDENT_ROLES[loc.type] || 'Người qua đường', look: npcLookFromSeed(seed)
    };
    if ((loc.services || []).includes('forge') && !named.some(key => /thợ/i.test(NPCS[key].title || ''))) {
        const key = `ren_${loc.id}`;
        NPCS[key] = { name: freeDaoGia[1]?.name || SMITH_NAMES[smithCount++ % SMITH_NAMES.length], title: `Thợ ${forgeGradeOf(loc).name} ${loc.name}`, look: NPC_LOOK('m', 5, '#c9c9d6', '#55524a', { beard: true }) };
        named.push(key);
    }
    LOCATION_NPCS[loc.id] = EMPTY_WORLDS.includes(loc.world) ? [] : [...named, residentKey(loc.id)];
});

/* Người đã chết hay đã bỏ đi trong cốt truyện không còn đứng ở địa điểm, trừ khi nhiệm vụ đang cần gặp */
const NPC_DIES_IN = { tien_de: 'm17', chuong_mon: 'm06', lang_phong: 'm06' };
/* Kẻ chết ở Lăng Tiêu chỉ là con rối: Hạo Thiên thật ngồi ở Tử Tiêu Cung, chỉ hiện ra sau chương lộ chuyện */
const NPC_RETURNS = { tien_de: { loc: 'tu_tieu', after: 'mc20_1' } };

function npcNeededHere(key, locId) {
    return state.questActive.some(rt => { const step = questStep(rt); return step?.talk === key && (!locId || step.loc === locId); });
}

function npcGone(key, locId = null) {
    const back = NPC_RETURNS[key];
    if (back && locId === back.loc) return !state.questDone.includes(back.after) && !npcNeededHere(key, locId);
    if (!state.questDone.includes(NPC_DIES_IN[key])) return false;
    return !npcNeededHere(key, locId);
}

function locationSmith(loc) {
    return LOCATION_NPCS[loc.id].find(key => /thợ/i.test(NPCS[key].title || ''));
}

function questGiver(q) {
    return q.npc === 'narr' ? residentKey(q.loc) : q.npc;
}

/* Về đến nơi chưa đủ: bước đi tới có người để gặp thì phải nói chuyện với người đó; nhân vật chính xuất hiện ngay tại nơi của hồi truyện */
/* Nhánh theo linh căn: mỗi nhánh có when và steps riêng, có thể có intro, tag; không nhánh nào khớp thì đi steps chung */
function questAllSteps(q) {
    return [...(q.steps || []), ...Object.values(q.branches || {}).flatMap(b => b.steps || [])];
}

function questStepsFor(q, key) {
    return key && q.branches?.[key] ? q.branches[key].steps : q.steps || [];
}

function speakerOfStep(step) {
    return step.say?.find(line => !['narr', 'me'].includes(line[0]))?.[0];
}

SIDE_QUESTS.forEach(q => questAllSteps(q).forEach(step => {
    if (!step.go) return;
    const speaker = speakerOfStep(step);
    step.talk = LOCATION_NPCS[step.go]?.includes(speaker) ? speaker : residentKey(step.go);
    step.loc = step.go;
    delete step.go;
}));

MAIN_QUESTS.forEach(q => questAllSteps(q).forEach(step => {
    if (step.ruled?.talk && !LOCATION_NPCS[step.ruled.loc].includes(step.ruled.talk)) LOCATION_NPCS[step.ruled.loc].unshift(step.ruled.talk);
    const speaker = speakerOfStep(step);
    if (!step.go || !speaker) return;
    if (!LOCATION_NPCS[step.go].includes(speaker)) LOCATION_NPCS[step.go].unshift(speaker);
    step.talk = speaker;
    step.loc = step.go;
    delete step.go;
}));

/* Nhiệm vụ ẩn: chỉ cư dân kể, chỉ trong đúng một cảnh giới; Thần lò giao việc đổi lấy một món ngẫu nhiên */
const HIDDEN_QUEST_RATE = 3;
const HIDDEN_HUNT = 12;
const HIDDEN_BOSS_SCALE = 1.5;
const TREASURE_REWARD = { quality: 4, bonus: 2 };
const HIDDEN_TITLES = ['Mật Tàng', 'Lời Trăn Trối', 'Vết Máu Cũ', 'Lời Thề Bị Quên', 'Ngôi Mộ Không Tên'];
const HIDDEN_FOES = ['Kẻ Canh Mật Tàng', 'Oán Linh Cổ Xưa', 'Thủ Mộ Nhân', 'Kẻ Phản Thệ'];

function treasureSteps(loc, key, bossId, thanks) {
    const seed = NPC_SEED(loc.id);
    return [
        { hunt: { loc: loc.id, name: loc.enemies[seed % loc.enemies.length].name, n: HIDDEN_HUNT } },
        { boss: bossId },
        { talk: key, loc: loc.id, say: [[key, thanks]] }
    ];
}

function treasureBoss(loc, id, realm) {
    const seed = NPC_SEED(id);
    BOSSES[id] = { npc: { name: HIDDEN_FOES[seed % HIDDEN_FOES.length], look: { ...npcLookFromSeed(seed), aura: '#c58bff' } }, realm: Math.min(realm, loc.enemyMax ?? realm), stage: 2, scale: HIDDEN_BOSS_SCALE, board: 5 };
}

/* Khu vực theo cốt truyện: Giới có release thì trước nhiệm vụ đó chỉ đi được những nơi cốt truyện đã dẫn tới.
   Nơi cốt truyện dẫn tới sau đó mở khi xong nhiệm vụ chính ngay trước lần đầu được nhắc; nơi cốt truyện không nhắc mở khi xong release */
function stepLocations(step) {
    return [step.go, step.loc, step.hunt?.loc, step.gather?.loc].filter(Boolean);
}

function questLocations(q, key) {
    const steps = key === undefined ? questAllSteps(q) : questStepsFor(q, key);
    return [q.loc, ...steps.flatMap(stepLocations), q.reward?.intel, q.reward?.opens].filter(id => id && LOCATIONS[id]);
}

const STORY_AREA_UNLOCK = {};
WORLD_TIERS.filter(tier => tier.release).forEach(tier => {
    const releaseAt = MAIN_QUESTS.findIndex(q => q.id === tier.release);
    Object.values(LOCATIONS).filter(loc => loc.world === tier.id).forEach(loc => {
        const first = MAIN_QUESTS.findIndex(q => questAllSteps(q).some(step => stepLocations(step).includes(loc.id)));
        if (first >= 0 && first <= releaseAt) return;
        STORY_AREA_UNLOCK[loc.id] = first > releaseAt ? MAIN_QUESTS[first - 1].id : tier.release;
    });
});

function storyAreaQuestIndex(locId) {
    const lock = STORY_AREA_UNLOCK[locId];
    return lock ? MAIN_QUESTS.findIndex(q => q.id === lock) : -1;
}

const HIDDEN_QUESTS = Object.values(LOCATIONS).filter(loc => (loc.enemies || []).length && NPC_SEED(loc.id) % HIDDEN_QUEST_RATE === 0).map(loc => {
    const seed = NPC_SEED(loc.id);
    const opensAt = storyAreaQuestIndex(loc.id);
    const realm = Math.max(loc.minR + seed % (loc.maxR - loc.minR + 1), opensAt >= 0 ? MAIN_QUESTS[opensAt].needs[0] : 0);
    const key = residentKey(loc.id);
    const id = `an_${loc.id}`;
    treasureBoss(loc, id, realm);
    return {
        id, loc: loc.id, npc: 'narr', hidden: true, realmOnly: realm, needs: [realm, 0],
        title: `${HIDDEN_TITLES[seed % HIDDEN_TITLES.length]} Ở ${loc.name}`,
        intro: [[key, `Tu vi như ngươi thì ta mới dám nói. Ở ${loc.name} có thứ người xưa chôn lại, và thứ giữ nó vẫn còn thức. Quét sạch đường vào, hạ nó rồi quay về gặp ta.`]],
        steps: treasureSteps(loc, key, id, 'Ta đợi người như ngươi đã lâu. Vật này vốn không thuộc về cảnh giới của ngươi, cầm lấy.'),
        reward: { hours: 4, goldRefs: 20, treasure: true }
    };
});

const FORGE_TREASURE_QUESTS = Object.values(LOCATIONS).filter(loc => forgeGradeOf(loc).wholeWorld && (loc.enemies || []).length).map(loc => {
    const key = locationSmith(loc);
    const id = `lo_${loc.id}`;
    treasureBoss(loc, id, loc.minR);
    return {
        id, loc: loc.id, npc: key, title: `Mẻ Rèn Cuối Của ${NPCS[key].name}`, needs: [loc.minR, 0],
        intro: [[key, 'Lò này còn một mẻ ta chưa dám mở, thiếu đúng một thứ nguyên liệu nằm trong thân kẻ đang chặn đường vào. Lấy về đây, ra món gì là do trời định.']],
        steps: treasureSteps(loc, key, id, 'Đủ rồi. Lửa lên... Ra món gì ta cũng không biết trước, nhưng cả đời ta chưa rèn thứ nào hơn thế.'),
        reward: { hours: 2, goldRefs: 10, treasure: true }
    };
});

SIDE_QUESTS.push(...HIDDEN_QUESTS, ...FORGE_TREASURE_QUESTS);
[...HIDDEN_QUESTS, ...FORGE_TREASURE_QUESTS].forEach(q => { QUEST_INDEX[q.id] = q; });

/* Xen kẽ cốt truyện: việc mở khu vực chờ nhiệm vụ chính trước đó, một số nhiệm vụ chính chờ lại việc này */
const MAIN_GATE_LOCATIONS = ['thanh_van', 'xich_diem', 'phi_thang', 'van_tien', 'dao_tri', 'da_bao', 'vo_cuong', 'khai_thien', 'dao_gia_am', 'co_thu'];
const needsBefore = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);

[...REGION_QUESTS, ...FORGE_TREASURE_QUESTS].forEach(q => {
    const before = MAIN_QUESTS.filter(m => needsBefore(m.needs, q.needs)).pop();
    if (before) q.afterMain = before.id;
});
REGION_QUESTS.filter(q => !MAIN_GATE_LOCATIONS.includes(q.loc) && forgeGradeOf(LOCATIONS[q.loc]).wholeWorld && QUEST_INDEX[`intel_${q.loc}`]).forEach(q => { q.after = `intel_${q.loc}`; });
REGION_QUESTS.filter(q => MAIN_GATE_LOCATIONS.includes(q.loc)).forEach(q => {
    const world = LOCATIONS[q.loc].world;
    const opensAt = storyAreaQuestIndex(q.loc);
    const gated = MAIN_QUESTS.find((m, i) => needsBefore(q.needs, m.needs) && i > opensAt + 1 && worldTierOfRealm(m.needs[0]).id === world);
    if (gated) gated.needsSide = [...(gated.needsSide || []), q.id];
});
