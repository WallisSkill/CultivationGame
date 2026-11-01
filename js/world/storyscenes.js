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
    m11: { intro: [['narr', 'Tỉnh dậy, cổ tay ngươi đã có dấu ấn nô lệ. Trên đầu không phải trời xanh mà là trần đá của một căn hầm vô tận.'], ['me', 'Đây là Tiên Giới?'], ['tien_lai', 'Phải. Chào mừng tới thiên đường.']], outro: [['tien_lai', 'Ta đào ba ngàn năm mà chưa từng thấy đốc công đổ máu. Hóa ra máu chúng cũng đỏ.'], ['narr', 'Sau lưng ngươi, những chiếc cuốc lần lượt rơi xuống đất.']] },
    m12: { intro: [['narr', 'Vạn Tiên Thành lộng lẫy như bức tranh. Đi sâu vào ngõ sau là những tiên nhân không còn đan điền, ngồi xin một giọt linh dịch.'], ['van_nguyet', 'Ngươi là kẻ giết đốc công? Theo ta, đừng ngẩng đầu.']], outro: [['van_nguyet', 'Từ giờ ngươi có tên trong danh sách truy nã của Thiên Đình. Chúc mừng, ngươi đã thành người của chúng ta.']] },
    m13: { intro: [['narr', 'Thiên Hà không có nước, chỉ có tinh quang chảy qua những đường ống lớn bằng cả tòa thành.'], ['van_nguyet', 'Tiên Giới rực rỡ nhờ cái thứ chạy trong đó. Và nó được ép ra từ những người như ngươi.']], outro: [['narr', 'Vết kiếm trên ngực ngươi không chảy máu, chỉ phát sáng. Mỗi lần thở, nó lại cắt sâu thêm một chút.']] },
    m14: { intro: [['van_nguyet', 'Kiếm khí của Thánh Nhân sẽ giết ngươi trong bảy ngày. Chỉ có Thánh Mẫu Dao Trì rút được.'], ['me', 'Bà ấy là người của Thiên Đình.'], ['van_nguyet', 'Từng là. Hơn nữa ngươi chẳng còn cách nào khác.']], outro: [['dao_tri_mau', 'Ao sen này trồng bằng nước mắt của ta. Hàng ngàn năm trước ta cũng đã muốn lật đổ một người.']] },
    m15: { intro: [['narr', 'Khắp Vạn Tiên Thành, những tiên nô phá xiềng đổ về quảng trường. Không ai hô khẩu hiệu. Họ chỉ cầm cuốc.'], ['tien_lai', 'Lão già này đào đất ba ngàn năm. Hôm nay muốn đào thứ khác.']], outro: [['narr', 'Đường ống linh tủy gãy làm đôi. Lần đầu sau vạn năm, đèn của Lăng Tiêu Bảo Điện chập chờn.']] },
    m16: { intro: [['tien_lai', 'Nếu lão ngã, đừng quay lại. Cuốc này là của ngươi.'], ['me', 'Lão sẽ không ngã.'], ['tien_lai', 'Tiên nô nào cũng ngã, con ạ. Chỉ là được chọn ngã ở đâu.']], outro: [['narr', 'Nam Thiên Môn đổ xuống. Trong đống đá, ngươi nhặt lại một chiếc cuốc cũ, cán đã ướt.']] },
    m17: { intro: [['narr', 'Lăng Tiêu Bảo Điện vắng tanh. Chín ngàn bậc thềm ngọc, giống hệt bậc đá Thanh Vân năm nào.'], ['me', 'Ta đã leo bậc này một lần rồi.']], outro: [['narr', 'Tiên nô quỳ xuống hát một bài ca cũ. Ngươi không ngồi lên ngai vàng. Ngươi đi về phía vết nứt.']] },
    m18: { intro: [['narr', 'Tử Tiêu Cung nằm trên một khoảng trời không có gió. Sáu chiếc ghế đá, sáu hơi thở nặng như sáu thế giới.']], outro: [['da_bao', 'Đã thấy mặt khách hàng lớn của ta rồi đấy. Muốn sống sót, mua đi. Không bán chịu.']] },
    m19: { intro: [['narr', 'Bát Cảnh Cung có một lò đan chưa bao giờ tắt. Một đồng tử quạt lửa, không ngẩng đầu.'], ['me', 'Thái Thanh ở đâu?'], ['narr', 'Đồng tử chỉ tay vào ngọn lửa, rồi lại quạt tiếp.']], outro: [['thai_thanh', 'Hàng ức năm ta không làm gì. Hôm nay ta cho ngươi mượn đồ. Coi như đã làm một việc.']] },
    m20: { intro: [['narr', 'Trên đường tới Ngọc Hư, mỗi bước chân ngươi đều nghe tiếng sổ sách lật. Có ai đó đang đọc số mệnh của ngươi, và đang nhíu mày.']], outro: [['narr', 'Trong thiên thư của Ngọc Hư Cung, trang ghi tên ngươi là một trang trắng, mép giấy bị rọc rất ngay ngắn.']] },
    m21: { intro: [['narr', 'Oa Hoàng Cung không có vách, chỉ có đất ẩm và những tượng người chưa khô.'], ['me', 'Những tượng này là gì?'], ['nu_oa', 'Là những đứa trẻ chưa ra đời. Con cũng từng ở đây.']], outro: [['narr', 'Từ Tiên Giới vọng lên tin: xiềng của tiên nô tự rơi. Bạch Lão Đầu không kịp nghe tin ấy.']] },
    m22: { intro: [['narr', 'Vạn kiếm ở Bích Du đồng loạt chúc xuống khi ngươi đặt chân lên đảo. Vết sẹo trên ngực bỗng nóng lên.'], ['thong_thien', 'Vẫn giữ vết sẹo ta cho à? Tốt. Có người biết giữ đồ.']], outro: [['narr', 'Hắn cười rất to. Sau tiếng cười, ngươi thấy lần đầu tiên một Thánh Nhân nhìn lên trời mà sợ.']] },
    m23: { intro: [['narr', 'Cực Lạc thơm mùi sen. Những người tụng kinh ở đây đều mỉm cười giống nhau, và không ai chớp mắt.']], outro: [['narr', 'Khe nứt mở ra phía dưới đài sen. Không có gió, không có sao, chỉ có tiếng trái tim ngươi đang đập.']] },
    m24: { intro: [['narr', 'Ra khỏi vũ trụ, ngươi mới biết bầu trời cũng có mép. Bên ngoài trôi lững lờ xác của những thế giới khác.'], ['ly_khach', 'Đứng đó mãi cũng không sống lại được đâu. Ta có quán, ăn gì không?']], outro: [['ly_khach', 'Con khôi lỗi này thu hoạch thay Thiên Đạo. Nó còn nhớ tên người cuối cùng nó gặt, nhưng ngươi đừng hỏi.']] },
    m25: { intro: [['narr', 'Luân Hồi Hải không có sóng. Mỗi giọt nước là một đời người đã sống xong.'], ['me', 'Bao nhiêu trong đó là ta?'], ['ly_khach', 'Đừng đếm. Có người đếm rồi không về nữa.']], outro: [['narr', 'Ngươi nhớ lại mùi lá khô. Nhớ cả cảm giác cán chổi trong lòng bàn tay, dù đời này ngươi chưa từng quét.']] },
    m26: { intro: [['narr', 'Đêm ở Luân Hồi Hải, có tiếng ai đó gọi đúng cái tên ngươi chưa bao giờ nói với ai.']], outro: [['narr', 'Ngươi đặt tay lên ngực. Ở đó vừa có một thứ rời đi, nhẹ như khi buông một món nợ.']] },
    m27: { intro: [['narr', 'Hoang Nguyên là nơi chưa có luật. Lửa ở đây có thể lạnh, đá có thể khóc.'], ['ly_khach', 'Đừng hỏi cách khai thiên. Bàn Cổ cũng không ai dạy.']], outro: [['narr', 'Ngươi đặt tên cho ngọn gió đầu tiên của thế giới mình là "Thanh Thủy".']] },
    m28: { intro: [['narr', 'Từ xa đã nghe tiếng bánh răng. Mỗi tiếng là một đời tu sĩ vừa được tính vào sổ.']], outro: [['narr', 'Sau cánh cửa cuối cùng của Thần Đình chỉ có một căn phòng nhỏ, một ngọn đèn và một ông lão đang mệt.']] },
    m29: { intro: [['ly_khach', 'Ta mở quán ở đây lâu lắm rồi. Hàng vạn kẻ bước qua, ta chỉ mời cơm lần này.'], ['me', 'Vì sao?'], ['ly_khach', 'Vì ngươi là kẻ đầu tiên hỏi quán có đắt không.']], outro: [['narr', 'Bánh răng dừng lại. Ở một phàm giới xa xôi, Tô Thanh Dao ngẩng lên, không hiểu sao thấy nhẹ cả người.']] },
    m30: { intro: [['narr', 'Bờ biển này không có nước. Hỗn độn cuộn lại thành sóng rồi tan ra thành những khái niệm chưa ai đặt tên.']], outro: [['narr', 'Ngươi đứng dậy, cười. Từ rất lâu rồi mới có người dạy cho ngươi biết mình nhỏ tới đâu.']] },
    m31: { intro: [['narr', 'Am cỏ chỉ có một phiến đá, một bình trà nguội và hai người không hề quan tâm vũ trụ ngươi vừa cứu.']], outro: [['vong_ky', 'Ma Thần chết rồi vẫn còn mơ. Nghe tiếng mơ đó, ngươi sẽ hiểu vì sao Đạo Giả không ngủ.']] },
    m32: { intro: [['vo_danh', 'Thua cũng được. Chỉ là thua thì ngươi quét sân.'], ['me', 'Sao ai cũng bắt ta quét?']], outro: [['narr', 'Vọng Kỷ nhấp ngụm trà nguội, lần đầu tiên sau vạn kỷ nguyên mỉm cười.']] },
    m33: { intro: [['narr', 'Hải Tâm là con mắt của cơn bão. Ở giữa có một người ngồi, trước mặt là bàn cờ chưa ai đi nước nào.']], outro: [['narr', 'Ngươi nhìn xuống tay mình. Những vết chai ngươi không nhớ đã có từ bao giờ, nằm đúng chỗ người ta cầm chổi.']] },
    m34: { intro: [['narr', 'Ngươi không còn biết mình đứng hay nổi. Ý nghĩ vừa sinh đã bị màu tím đọc mất.']], outro: [['narr', 'Linh tử khí tan ra, thì thầm một câu bằng giọng của chính ngươi: "Về nhà đi."']] },
    m35: { intro: [['narr', 'Cổ thụ rộng hơn trí tưởng tượng. Dưới gốc có một người khổng lồ không có nửa thân, vẫn đang cầm rìu.']], outro: [['narr', 'Mặt trời đầu tiên ngươi nhìn thấy trong đời, ở suối Thanh Thủy, hóa ra là món quà có người đã chết vì nó.']] },
    m36: { intro: [['narr', 'Chúa Tể Tọa không có đường lên. Muốn tới, ngươi phải quên mất mình đang đi.']], outro: [['narr', 'Trên ghế để lại một chiếc lá khô. Ngươi không cần đoán ai đã đặt nó ở đó.']] },
    m37: { intro: [['narr', 'Trong dòng nước, ngươi thấy mình ở tuổi lên mười đang đuổi sói, thấy Thanh Dao đốt đèn đợi thư, thấy những kẻ đã ngã cầm cuốc.'], ['me', 'Tất cả vẫn ở đây.']], outro: [['narr', 'Dư ảnh tan đi, để lại tiếng chổi quét đều đều từ cuối dòng sông.']] },
    m38: { intro: [['narr', 'Chung Nguyên Đài là một khoảnh sân nhỏ. Có một gốc cây, nhiều lá và mùi khói bếp của Thanh Thủy Thôn.']] }
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
    thu_linh: { name: 'Mộc Linh', title: 'Hồn của Cổ Thụ', look: NPC_LOOK('f', 1, '#ff8ad8', '#7a1f6a', { aura: '#ff8ad8' }) },
    do_nhan: { name: 'Lão Lái Đò', title: 'Người chèo Trường Hà', look: NPC_LOOK('m', 5, '#f0e6c8', '#f2f2f2', { beard: true, weapon: 'staff', weaponColor: '#f5f5f5' }) }
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
        loc: 'da_bao', npc: 'da_bao', title: 'Tiền Đặt Cọc', needs: [16, 0],
        intro: [['da_bao', 'Đa Bảo Thị không có khách vãng lai. Đặt cọc bằng đầu bọn đạo tặc, ta cấp lệnh bài.']],
        steps: [{ hunt: { loc: 'da_bao', name: 'Thánh Vực Đạo Tặc', n: 5 }, say: [['da_bao', 'Lệnh bài của ngươi đây. Mua nhiều, chết ít.']] }]
    },
    {
        loc: 'bat_canh', npc: 'dong_tu', title: 'Quạt Lò Bát Quái', needs: [16, 0],
        intro: [['dong_tu', 'Lò Bát Quái chưa tắt lần nào. Đánh thắng Lực Sĩ thì ta cho ngươi ghé lửa nhờ một lúc. Sư phụ ta sẽ không làm gì đâu, người chưa bao giờ làm gì.']],
        steps: [{ hunt: { loc: 'bat_canh', name: 'Hoàng Cân Lực Sĩ', n: 5 }, say: [['dong_tu', 'Vào đi. Đừng nói ta cho phép, cũng đừng nói ta không cho.']] }]
    },
    {
        loc: 'vo_cuong', npc: 'ly_khach', title: 'Tiền Cơm Trả Trước', needs: [20, 0],
        intro: [['ly_khach', 'Quán ta ghi sổ chứ không cho nợ. Dẹp bọn đạo tặc trước cửa là trừ được bữa đầu.']],
        steps: [{ hunt: { loc: 'vo_cuong', name: 'Thiên Ngoại Đạo Tặc', n: 5 }, say: [['ly_khach', 'Sạch sẽ. Bếp, lò và tấm bảng trong quán, ngươi dùng thoải mái.']] }]
    },
    {
        loc: 'khai_thien', npc: 'hoang_cong', title: 'Quặng Quy Tắc', needs: [22, 0],
        intro: [['hoang_cong', 'Nơi này chưa có luật nên lửa muốn cháy kiểu gì thì cháy. Mang Quy Tắc Thể về, ta rèn cho lửa một cái luật.']],
        steps: [{ hunt: { loc: 'khai_thien', name: 'Quy Tắc Thể', n: 6 }, say: [['hoang_cong', 'Lửa đã biết nghe lời. Thần lò Hoang Nguyên mở cho ngươi.']] }]
    },
    {
        loc: 'dao_gia_am', npc: 'vong_ky', title: 'Khôi Lỗi Trước Am', needs: [26, 0],
        intro: [['vong_ky', 'Am không có gì để bán, chỉ có đồ người ta bỏ quên. Muốn lấy thì đánh thắng khôi lỗi ngoài sân.']],
        steps: [{ hunt: { loc: 'dao_gia_am', name: 'Đạo Giả Thí Luyện Khôi', n: 6 }, say: [['vong_ky', 'Cứ lấy. Đừng hỏi của ai.']] }]
    },
    {
        loc: 'ma_than_mo', npc: 'mo_nhan', title: 'Đốt Hài Ma Thần', needs: [26, 0],
        intro: [['mo_nhan', 'Thần lò ở đây đốt bằng hài cốt Ma Thần. Mang về đủ, ta nhóm cho một mẻ.']],
        steps: [{ hunt: { loc: 'ma_than_mo', name: 'Ma Thần Tàn Hài', n: 6 }, say: [['mo_nhan', 'Đủ cháy một kỷ nguyên. Lò này từ nay có tên ngươi.']] }]
    },
    {
        loc: 'co_thu', npc: 'thu_linh', title: 'Lắng Nghe Cổ Thụ', needs: [27, 0],
        intro: [['thu_linh', 'Cây không bán cũng không cho. Cây chỉ rụng lá xuống người nó tin. Hộ Linh nổi giận rồi, làm chúng ngủ đi.']],
        steps: [{ hunt: { loc: 'co_thu', name: 'Cổ Thụ Hộ Linh', n: 6 }, say: [['thu_linh', 'Cây đã nghe ngươi. Mọi thứ dưới tán này mở cho ngươi.']] }]
    },
    {
        loc: 'truong_ha', npc: 'do_nhan', title: 'Tiền Đò', needs: [28, 0],
        intro: [['do_nhan', 'Qua sông phải trả tiền đò, mà ở đây chỉ nhận dư ảnh của chính khách. Trả đi, rồi ta bán cho thứ cần bán.']],
        steps: [{ hunt: { loc: 'truong_ha', name: 'Dư Ảnh Của Ngươi', n: 6 }, say: [['do_nhan', 'Đủ tiền đò. Quầy và lò bên bến mở cho ngươi.']] }]
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
    ]
};
