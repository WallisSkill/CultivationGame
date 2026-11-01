/* ===========================================================
   CẢNH TRUYỆN THÊM
   - MAIN_SCENES: intro lúc nhận nhiệm vụ chính, outro lúc xong.
   - REGION_QUESTS: mỗi nơi có dịch vụ phải làm việc cho người ở đó mới được dùng.
   - ROAD_TALES: cảnh gặp trên đường theo từng Giới.
=========================================================== */
const MAIN_SCENES = {
    m01: { outro: [['narr', 'Ngươi đắp mộ cho những người hàng xóm, tay còn dính tro. Lão Mặc vẫn quét lá trước đình, như thể đêm qua chưa từng có lửa.'], ['mac', 'Lá rụng thì quét. Người mất thì chôn. Còn sống thì đi.'], ['thuy_ba', 'Trên núi Thanh Vân có người dạy đạo. Con đi đi, đừng ngoảnh lại.']] },
    m02: { intro: [['narr', 'Chín ngàn bậc đá dẫn lên Thanh Vân Tông. Mây quấn quanh chân ngươi, sau lưng là khói Thanh Thủy còn chưa tan.'], ['me', 'Nếu đủ mạnh, đêm đó đã khác.'], ['mac', '(Tiếng chổi vọng từ rất xa) Bậc nào cũng phải bước, đừng nhảy.']], outro: [['narr', 'Động phủ của ngươi chỉ là một hang đá ẩm. Nhưng đêm đầu tiên, ngươi nghe được tiếng linh khí chảy.']] },
    m03: { intro: [['to_dao', 'Đệ tử ngoại môn chỉ được ăn phần thừa của linh mạch. Muốn lên nội môn phải có công.'], ['me', 'Sư tỷ giúp ta vì sao?'], ['to_dao', 'Vì ánh mắt đệ giống một người ta từng quen. Đừng hỏi thêm.']], outro: [['lang_phong', 'Lần này là ta sơ ý. Lần sau ngươi sẽ không còn đứng được.'], ['narr', 'Hắn cười, nhưng bàn tay cầm kiếm siết đến trắng bệch.']] },
    m04: { intro: [['narr', 'Đêm ở Thanh Vân bỗng im hơn thường lệ. Sáng ra, thêm một chiếc giường đệ tử bỏ trống.'], ['to_dao', 'Đệ có để ý không? Không ai dám nhắc tới tên họ.']], outro: [['narr', 'Trong mật thất của Hắc Bào Trưởng Lão có mười hai chiếc bình, mỗi bình một làn khói đang cào vào thành.'], ['to_dao', 'Đệ mở nút đi. Để họ được về.']] },
    m05: { intro: [['narr', 'Vân Long Thành đông như hội, mùi đan dược lẫn mùi sắt nung tràn khắp phố.'], ['to_dao', 'Ở đây có tiền là có đường. Giữ chặt túi và cả cái miệng của đệ.']], outro: [['narr', 'Nguyên Anh trong đan điền mở mắt lần đầu. Nó nhìn ngươi, gương mặt y hệt, chỉ già hơn một chút.']] },
    m06: { intro: [['narr', 'Một cánh hạc truyền thư đậm máu rơi xuống bàn ngươi. Chỉ có bốn chữ: "Thanh Vân có biến".'], ['me', 'Lăng Phong...']], outro: [['narr', 'Ngươi và Tô Thanh Dao hạ huyệt chưởng môn dưới gốc tùng già. Cả tông môn còn chưa đầy một trăm người.'], ['to_dao', 'Từ nay đệ không còn là đệ tử nữa. Đệ là cái cột của nơi này.']] },
    m07: { intro: [['to_dao', 'Đệ không ngủ ba tháng rồi. Trong mắt chỉ còn Lăng Phong.'], ['to_dao', 'Có một người ở Băng Phong Cốc từng chữa bệnh này. Đừng để ta phải đi chôn thêm một người nữa.']], outro: [['narr', 'Tuyết phủ kín vai ngươi. Bảy ngày sau, lần đầu tiên từ đêm chưởng môn mất, ngươi thở chậm lại được.']] },
    m08: { intro: [['narr', 'Cửa vực Vô Tận thở ra gió nóng như hơi thở của con vật đang ngủ.'], ['to_dao', 'Tất cả những gì sư phụ giấu đều dẫn về đây.'], ['me', 'Tỷ ở lại giữ sơn môn. Xuống dưới đó một mình ta là đủ.']], outro: [['narr', 'Dưới đáy Ma Uyên, ngươi tìm thấy một tấm bia. Tên những kẻ phi thăng được khắc kín, tất cả đều bị gạch ngang.']] },
    m09: { intro: [['narr', 'Trời đổi màu từ ba ngày trước. Chim không bay, cá không bơi. Cả Phàm Giới đang nín thở chờ ngươi.'], ['mac', 'Sấm chỉ biết đánh vào kẻ đứng cao nhất. Vậy nên hãy đứng cho vững.']], outro: [['narr', 'Tầng kiếp thứ chín tan đi. Mưa rơi xuống, ấm như nước suối Thanh Thủy.']] },
    m10: { intro: [['narr', 'Trước khi đi, ngươi về Thanh Thủy lần cuối. Mái đình cũ đã được lợp lại, chổi của Lão Mặc dựng ở góc, không thấy người đâu.']], outro: [['to_dao', 'Ta vẫn giữ lửa ở đây. Đừng để ta đợi uổng.'], ['narr', 'Ánh sáng nuốt lấy ngươi. Ngươi không biết rằng cánh cửa phía trên chỉ mở một chiều.']] },
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
    m27: { intro: [['narr', 'Hoang Nguyên là nơi chưa có luật. Lửa ở đây có thể lạnh, đá có thể khóc.'], ['ly_khach', 'Đừng hỏi cách khai thiên. Bàn Cổ cũng không ai dạy.']], outro: [['narr', 'Ngươi đặt tên cho ngọn gió đầu tiên của thế giới mình là "Thanh Thủy".']] },
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
    mo_nhan: { name: 'Người Giữ Mộ', title: 'Thợ Ma Thần Mộ', look: NPC_LOOK('m', 1, '#5fe6e6', '#13525c', { weapon: 'staff', weaponColor: '#5fe6e6' }) },
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
        intro: [['dao_tri_mau', 'Thần lò Dao Trì đun bằng nước ao. Vượt qua hộ vệ của ta, ngươi mới được chạm vào lửa.']],
        steps: [{ hunt: { loc: 'dao_tri', name: 'Dao Trì Hộ Vệ', n: 5 }, say: [['dao_tri_mau', 'Ao đã nhận ngươi. Thần lò từ nay mở cửa.']] }]
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
    },
    {
        loc: 'dao_gia_am', npc: 'vong_ky', title: 'Khôi Lỗi Trước Am', needs: [29, 0],
        intro: [['vong_ky', 'Am không có gì để bán, chỉ có đồ người ta bỏ quên. Muốn lấy thì đánh thắng khôi lỗi ngoài sân.']],
        steps: [{ hunt: { loc: 'dao_gia_am', name: 'Đạo Giả Thí Luyện Khôi', n: 6 }, say: [['vong_ky', 'Cứ lấy. Đừng hỏi của ai.']] }]
    },
    {
        loc: 'ma_than_mo', npc: 'mo_nhan', title: 'Đốt Hài Ma Thần', needs: [29, 0],
        intro: [['mo_nhan', 'Thần lò ở đây đốt bằng hài cốt Ma Thần. Mang về đủ, ta nhóm cho một mẻ.']],
        steps: [{ hunt: { loc: 'ma_than_mo', name: 'Ma Thần Tàn Hài', n: 6 }, say: [['mo_nhan', 'Đủ cháy một kỷ nguyên. Lò này từ nay có tên ngươi.']] }]
    }
].map(q => ({ ...q, id: `open_${q.loc}`, reward: { hours: 1, goldRefs: 5, opens: q.loc } }));

SIDE_QUESTS.push(...REGION_QUESTS);
REGION_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });

const FREE_SERVICE_LOCATIONS = ['thanh_thuy', 'co_thu', 'truong_ha'];

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
    ]
};

/* Mỗi tiểu cảnh giới có vài việc riêng, sinh theo nơi cùng tầm cảnh giới. Không chặn đột phá, qua tiểu cảnh là hết hạn */
const STAGE_QUEST_COUNT = 3;
const STAGE_HUNT_TITLES = ['Trừ Hại {enemy}', 'Lệnh Truy Sát {enemy}', 'Dấu Vết {enemy}', 'Thử Tay Với {enemy}', 'Vây Quét {enemy}', 'Món Nợ Của {enemy}', 'Tin Đồn Về {enemy}', 'Đêm Săn {enemy}'];
const STAGE_HUNT_INTROS = ['Dân quanh {loc} đồn rằng {enemy} lại xuất hiện. Không ai dám ra khỏi cửa sau khi tắt nắng.', 'Một tờ cáo thị rách treo trước {loc}: ai diệt được {enemy} thì có thưởng.', 'Trong lúc tĩnh tọa, ngươi ngửi thấy tử khí từ {loc}. Tu vi vừa tăng cũng cần một chỗ để thử.', 'Một tu sĩ bị thương lết tới trước mặt ngươi, chỉ kịp nói ba chữ: "{enemy}... {loc}..."'];
const STAGE_HUNT_DONES = ['Chiến trường yên lại. Tay ngươi vững hơn lúc đến.', 'Người quanh đây bắt đầu nhớ tên ngươi.', 'Thu dọn xong, ngươi nhận ra đường tu trước mặt rõ hơn một chút.'];
const STAGE_GATHER_TITLES = ['Ngộ Đạo Tại {loc}', 'Thu Thập Linh Vật {loc}', 'Khảo Sát {loc}', 'Lắng Nghe {loc}', 'Vẽ Bản Đồ {loc}', 'Tìm Di Tích {loc}'];
const STAGE_GATHER_LABELS = ['Tĩnh tọa ngộ đạo', 'Thu thập linh vật', 'Khảo sát địa mạch', 'Lắng nghe linh khí', 'Ghi chép địa hình', 'Tìm dấu di tích'];
const STAGE_GATHER_INTROS = ['Linh khí ở {loc} chuyển động theo nhịp lạ. Ở tiểu cảnh này ngươi đã nghe được nó.', 'Một cuốn sổ cũ nhắc tới {loc}, trang cuối bị xé mất.', 'Ngươi muốn hiểu vùng đất này trước khi đi xa hơn. {loc} là nơi nên bắt đầu.'];
const STAGE_GATHER_DONES = ['Một chút tâm đắc lắng xuống đan điền.', 'Thứ tìm được không lớn, nhưng là của riêng ngươi.', 'Ngươi ghi lại mọi thứ, biết đâu về sau cần tới.'];

function stageFill(text, loc, enemy) {
    return text.replace(/\{loc\}/g, loc.name).replace(/\{enemy\}/g, enemy || '');
}

function stageQuest(realm, stage, slot) {
    const sites = Object.values(LOCATIONS).filter(l => l.minR <= realm && l.maxR >= realm && (l.enemies || []).length);
    const seed = realm * 31 + stage * 7 + slot * 3;
    const loc = sites[(seed + slot * Math.ceil(sites.length / STAGE_QUEST_COUNT)) % sites.length];
    const id = `st_${realm}_${stage}_${slot}`;
    const base = { id, loc: loc.id, npc: 'narr', needs: [realm, stage], until: [realm, stage], stageQuest: true, reward: { hours: 0.5 + stage * 0.25, goldRefs: 3 + stage } };
    const report = { go: loc.id, say: [['narr', 'Ngươi quay lại báo tin. Người giao việc gật đầu, dúi vào tay ngươi chút lộ phí.']] };
    if (slot === 2) {
        return {
            ...base,
            title: stageFill(STAGE_GATHER_TITLES[seed % STAGE_GATHER_TITLES.length], loc),
            intro: [['narr', stageFill(STAGE_GATHER_INTROS[seed % STAGE_GATHER_INTROS.length], loc)]],
            steps: [{ gather: { loc: loc.id, hours: 1, label: STAGE_GATHER_LABELS[seed % STAGE_GATHER_LABELS.length] }, say: [['narr', STAGE_GATHER_DONES[seed % STAGE_GATHER_DONES.length]]] }, report]
        };
    }
    const enemy = loc.enemies[seed % loc.enemies.length].name;
    return {
        ...base,
        title: stageFill(STAGE_HUNT_TITLES[seed % STAGE_HUNT_TITLES.length], loc, enemy),
        intro: [['narr', stageFill(STAGE_HUNT_INTROS[seed % STAGE_HUNT_INTROS.length], loc, enemy)]],
        steps: [{ hunt: { loc: loc.id, name: enemy, n: 3 + stage }, say: [['narr', STAGE_HUNT_DONES[seed % STAGE_HUNT_DONES.length]]] }, report]
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

/* Dò la tin tức: mỗi Giới một chuỗi, biết lò thường trước rồi mới lần ra Danh lò, Thần lò và Chợ Đen */
const INTEL_FORGE_HOURS = [1, 2, 4];
const INTEL_MARKET_HOURS = 3;

function intelDirection(tier, loc) {
    const h = loc.x < (tier.mapW || 1000) / 3 ? 'tây' : loc.x > (tier.mapW || 1000) * 2 / 3 ? 'đông' : '';
    const v = loc.y < (tier.mapH || 560) / 3 ? 'bắc' : loc.y > (tier.mapH || 560) * 2 / 3 ? 'nam' : '';
    return v || h ? `phía ${[h, v].filter(Boolean).join(' ')}` : 'vùng giữa';
}

function intelQuest(tier, source, loc, label, hours, after) {
    return {
        id: `intel_${loc.id}`, loc: source.id, npc: 'narr', title: `Dò La: ${label}`, needs: [tier.from, 0], after, reward: { hours: 0.5, goldRefs: 2, intel: loc.id },
        intro: [['narr', `Khách lữ hành ở ${source.name} rỉ tai nhau về một ${label} nằm ở ${intelDirection(tier, loc)} ${tier.name}. Muốn biết chính xác thì phải chịu khó nghe ngóng.`]],
        steps: [{ gather: { loc: source.id, hours, label: 'Dò la tin tức' }, say: [['narr', `Tìm ra rồi: ${label} ở ${loc.name}. Ngươi ghi vào Địa Chí.`]] }]
    };
}

const INTEL_QUESTS = WORLD_TIERS.flatMap(tier => {
    const sites = Object.values(LOCATIONS).filter(l => l.world === tier.id);
    const source = sites.reduce((best, l) => l.minR < best.minR ? l : best);
    const forges = sites.filter(l => (l.services || []).includes('forge')).sort((a, b) => (a.forgeGrade || 0) - (b.forgeGrade || 0));
    const chain = [
        ...forges.map(l => ({ loc: l, label: forgeGradeOf(l).name + (l.blackMarket ? ' và Chợ Đen' : ''), hours: INTEL_FORGE_HOURS[l.forgeGrade || 0] })),
        ...sites.filter(l => l.blackMarket && !forges.includes(l)).map(l => ({ loc: l, label: 'Chợ Đen', hours: INTEL_MARKET_HOURS }))
    ];
    return chain.map((entry, i) => intelQuest(tier, source, entry.loc, entry.label, entry.hours, i ? `intel_${chain[i - 1].loc.id}` : null));
});
SIDE_QUESTS.push(...INTEL_QUESTS);
INTEL_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });
const INTEL_SOURCE_NAMES = INTEL_QUESTS.reduce((names, q) => (names[LOCATIONS[q.loc].world] = LOCATIONS[q.loc].name, names), {});

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
        { loc: 'ma_than_mo', npc: 'mo_nhan', title: 'Long Cốt Hỗn Độn', hunt: 'Hỗn Độn Cự Long', slots: ['armor', 'helm'], intro: 'Hồng Mông có trước cả Hỗn Độn, đồ thường vào đó là thành không có. Long cốt ở đây đủ cũ để sống sót.', done: 'Long cốt không chịu mục. Ngươi mặc nó thì cũng không mục.' },
        { loc: 'vo_chung_lau', npc: 'narr', title: 'Tầng Không Có Số', hunt: 'Lâu Chủ Tàn Ảnh', slots: ['weapon', 'ring'], intro: 'Tàn ảnh Lâu Chủ giữ thứ binh khí chưa từng được rèn. Hạ đủ bóng của lão, nó sẽ rơi ra.', done: 'Tháp vẫn không có tầng cuối, nhưng ngươi đã có thứ để mang đi.' },
        { loc: 'hai_tam', npc: 'narr', title: 'Hơi Thở Hải Tâm', hunt: 'Hải Tâm Ma Thần', slots: ['boots', 'amulet'], intro: 'Mắt bão này thở ra hơi của Hồng Mông. Ma Thần ở đây đã nuốt no, phải rạch ra mới lấy được.', done: 'Đủ sáu món cấp Hồng Mông. Tử Khí Thiên Nguyên sẽ nhận ra ngươi.' }
    ],
    31: [
        { loc: 'dao_gia_am', npc: 'vong_ky', title: 'Dệt Áo Bằng Tử Khí', gather: { loc: 'tu_khi', hours: GATE_QUEST_GATHER_HOURS, label: 'Thu Hồng Mông Tử Khí' }, slots: ['armor', 'helm'], intro: 'Cõi của ngươi không có ai để chém, nên phải tự làm lấy. Về Thiên Nguyên thu Tử Khí mà dệt áo, bước tới Trường Hà không có áo là tan.', done: 'Ngươi vừa mặc vào thứ đã tạo ra Đạo. Đừng giặt.' },
        { loc: 'vo_cuong', npc: 'ly_khach', title: 'Lửa Đầu Tiên', gather: { loc: 'so_hoa', hours: GATE_QUEST_GATHER_HOURS, label: 'Lấy lửa Sơ Hỏa Đài' }, slots: ['weapon', 'ring'], intro: 'Bếp ta tắt lửa rồi. Ngươi có ngọn lửa chưa từng tắt trên đó, xin một mồi. Tiện tay tôi luôn binh khí của ngươi.', done: 'Lửa tốt. Bữa này ta trả công bằng hai món, khỏi ghi sổ.' },
        { loc: 'ma_than_mo', npc: 'mo_nhan', title: 'Bào Thai Của Đạo', gather: { loc: 'dao_thai', hours: GATE_QUEST_GATHER_HOURS, label: 'Canh Đạo Thai' }, slots: ['boots', 'amulet'], intro: 'Người chết ở đây đều không thấy được đoạn cuối. Ngồi canh Đạo Thai đi, thứ chưa ra đời mới dẫn được ngươi tới chỗ mọi thứ đã kết thúc.', done: 'Đủ sáu món cấp Chung Nguyên. Từ đây không còn ai đào mộ giúp ngươi nữa.' }
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
        reward: { hours: 2, goldRefs: 10, gateGear: { realm: Number(gate), slots: entry.slots } }
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
const RESIDENT_AREA_LINES = {
    town: 'Ở đây tin đồn chạy nhanh hơn ngựa, nhưng người hỏi đúng chuyện thì không nhiều.',
    sect: 'Quy củ ở đây nghiêm, đừng để người trên trông thấy ta nói nhiều.',
    wild: 'Đi đường này phải biết lúc nào nên dừng. Kẻ không biết đều nằm lại cả.',
    dungeon: 'Ta còn đứng đây là vì biết chỗ nào không được bước vào.',
    gate: 'Kẻ qua cổng này ai cũng vội. Chẳng mấy người quay lại kể chuyện bên kia.'
};
const SMITH_NAMES = ['Lão Thiết', 'Hỏa Thủ', 'Kim Chùy', 'Đoàn Lão', 'Lô Sư'];

function residentKey(locId) {
    return `dan_${locId}`;
}

function npcLookFromSeed(seed) {
    return NPC_LOOK(seed % 2 ? 'm' : 'f', seed % 6, RESIDENT_COLORS[seed % 3], RESIDENT_COLORS[seed % RESIDENT_COLORS.length]);
}

const LOCATION_NPCS = {};
Object.values(LOCATIONS).forEach(loc => {
    const seed = NPC_SEED(loc.id);
    NPCS[residentKey(loc.id)] = {
        name: `${RESIDENT_SURNAMES[seed % RESIDENT_SURNAMES.length]} ${RESIDENT_GIVEN[(seed >>> 4) % RESIDENT_GIVEN.length]}`,
        title: RESIDENT_ROLES[loc.type] || 'Người qua đường', look: npcLookFromSeed(seed)
    };
    const named = [...new Set(SIDE_QUESTS.filter(q => q.loc === loc.id && q.npc !== 'narr').map(q => q.npc))];
    if ((loc.services || []).includes('forge') && !named.some(key => /thợ/i.test(NPCS[key].title || ''))) {
        const key = `ren_${loc.id}`;
        NPCS[key] = { name: SMITH_NAMES[seed % SMITH_NAMES.length], title: `Thợ ${forgeGradeOf(loc).name} ${loc.name}`, look: NPC_LOOK('m', 5, '#c9c9d6', '#55524a', { beard: true }) };
        named.push(key);
    }
    LOCATION_NPCS[loc.id] = EMPTY_WORLDS.includes(loc.world) ? [] : [...named, residentKey(loc.id)];
});

/* Người đã chết trong cốt truyện không còn đứng ở địa điểm */
const NPC_DIES_IN = { tien_de: 'm17' };

function npcGone(key) {
    return state.questDone.includes(NPC_DIES_IN[key]);
}

function locationSmith(loc) {
    return LOCATION_NPCS[loc.id].find(key => /thợ/i.test(NPCS[key].title || ''));
}

function questGiver(q) {
    return q.npc === 'narr' ? residentKey(q.loc) : q.npc;
}

/* Về đến nơi chưa đủ: bước đi tới có người để gặp thì phải nói chuyện với người đó; nhân vật chính xuất hiện ngay tại nơi của hồi truyện */
function speakerOfStep(step) {
    return step.say?.find(line => !['narr', 'me'].includes(line[0]))?.[0];
}

SIDE_QUESTS.forEach(q => (q.steps || []).forEach(step => {
    if (!step.go) return;
    const speaker = speakerOfStep(step);
    step.talk = LOCATION_NPCS[step.go]?.includes(speaker) ? speaker : residentKey(step.go);
    step.loc = step.go;
    delete step.go;
}));

MAIN_QUESTS.forEach(q => q.steps.forEach(step => {
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
    BOSSES[id] = { npc: { name: HIDDEN_FOES[seed % HIDDEN_FOES.length], look: { ...npcLookFromSeed(seed), aura: '#c58bff' } }, realm, stage: 2, scale: HIDDEN_BOSS_SCALE, board: 5 };
}

const HIDDEN_QUESTS = Object.values(LOCATIONS).filter(loc => (loc.enemies || []).length && NPC_SEED(loc.id) % HIDDEN_QUEST_RATE === 0).map(loc => {
    const seed = NPC_SEED(loc.id);
    const realm = loc.minR + seed % (loc.maxR - loc.minR + 1);
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
REGION_QUESTS.filter(q => MAIN_GATE_LOCATIONS.includes(q.loc)).forEach(q => {
    const world = LOCATIONS[q.loc].world;
    const gated = MAIN_QUESTS.find(m => needsBefore(q.needs, m.needs) && worldTierOfRealm(m.needs[0]).id === world);
    if (gated) gated.needsSide = [...(gated.needsSide || []), q.id];
});
