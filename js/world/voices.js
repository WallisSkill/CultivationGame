/* ===========================================================
   GIỌNG RIÊNG CỦA TỪNG NPC
   - up: NPC cao hơn người chơi; even: ngang cảnh giới; down: người chơi đã vượt NPC.
   - area: câu trả lời khi hỏi về nơi này.
   - Khóa thay thế: {me} cảnh giới người chơi, {npc} cảnh giới NPC, {below} cảnh giới dưới người chơi,
     {ring}/{Ring} vòng sau lưng người chơi, {loc} tên nơi đang đứng.
   - Cư dân không tên lấy một trong các tính cách RESIDENT_VOICES theo hạt giống của nơi ở.
=========================================================== */
const NPC_VOICES = {
    thuy_ba: {
        up: ['Bà già này chưa từng cao hơn ai. Ngồi xuống uống bát nước đã.', 'Bà không biết vòng vèo gì đâu, chỉ biết con còn gầy lắm.'],
        even: ['{me} hả? Bà chỉ biết con vẫn ăn hai bát cơm như hồi nhỏ.', 'Người làng mình mà lên được {me} thì ông bà ở dưới mộ cũng ngồi dậy.'],
        down: ['Ôi chao, cái vòng sau lưng con sáng quá, bà phải nheo mắt. Con vẫn nhớ đường về làng chứ?', 'Thanh Thủy dựng lại được mấy gian nhà rồi. Hôm nào về, bà nấu cháo cá cho.'],
        area: 'Làng bé tí, cháy một lần là thấy hết. Giờ chỉ còn mấy gian nhà mới với cái giếng cũ, bà vẫn ra đó gánh nước mỗi sáng.'
    },
    to_dao: {
        up: ['Mới {me} mà đã muốn so kiếm với ta? Rút kiếm chậm thế kia thì đợi thêm vài năm.', '{Ring} sau lưng đệ còn run. Thở đều đi rồi hẵng nói chuyện vòng vèo.'],
        even: ['Cùng {me}. Từ hôm nay ta không đỡ đòn cho đệ nữa đâu.', 'Ngang nhau rồi thì gọi ta là Thanh Dao cũng được. Nhưng đừng gọi trước mặt người ngoài.'],
        down: ['Đệ vượt ta rồi. Ta không ghen, ta chỉ lo đệ quên cách thở khi xuất kiếm.', 'Ngày xưa ta dắt đệ qua cổng ngoại môn. Giờ đến lượt đệ đi trước, nhớ ngoái lại một lần.'],
        area: 'Chỗ nào cũng có sổ sách, có kẻ ghi và kẻ bị ghi. Đệ nhìn xem ai cầm bút trước rồi hẵng tin ai.'
    },
    lang_phong: {
        up: ['{me}? Ta đứng ở chỗ ngươi từ hồi chưa biết cầm đũa.', 'Đừng nhìn ta bằng ánh mắt đó. Kẻ ở dưới nhìn lên thì nên cúi đầu.'],
        even: ['Ngang ta rồi à? Tốt. Lên đài, ta muốn biết ngươi may mắn hay thật sự có tài.', 'Cùng {me} mà sư tỷ chỉ nhìn ngươi. Ta không hiểu, và ta ghét những thứ mình không hiểu.'],
        down: ['Ngươi vượt ta... Không sao. Thiên tài không đi đường thẳng.', 'Cứ đắc ý đi. Có những thứ tông môn không bao giờ cho ngươi, ta sẽ tự đi lấy.'],
        area: 'Thanh Vân này giữ thiên tài như giữ chim trong lồng. Lồng sơn vàng thì vẫn là lồng.'
    },
    chuong_mon: {
        up: ['{me} à. Ta ngồi đây đã nhìn mấy trăm đứa đi qua cảnh giới ấy. Đứa nào chậm lại mới đi được xa.', 'Đừng vội. Con càng lên cao thì càng ít người dám nói thật với con, kể cả ta.'],
        even: ['Ngang ta rồi sao? Vậy uống với ta một chén, chén thầy trò cuối cùng.', 'Cùng một cảnh giới mới thấy, cái ghế chưởng môn này còn nặng hơn tu vi của ta.'],
        down: ['Con đã đi xa hơn ta. Đừng quay đầu cúi chào nữa, Thanh Vân sẽ tự biết mình được ai che chở.', 'Già rồi thì nhìn trò vượt mình là niềm vui duy nhất. Đừng tước của ta niềm vui đó.'],
        area: 'Tông môn trăm năm, sổ sách thiếu mấy trang ta biết cả. Có những trang ta tự xé, đừng hỏi ta trang nào.'
    },
    han_bang: {
        up: ['Lạnh à? Ở {me} thì tim ngươi còn nóng quá.', 'Ngồi xuống. Đừng nói. Tuyết rơi đủ lâu thì tâm ma cũng phải ngủ.'],
        even: ['Ngang ta. Vậy ngươi tự nghe được tiếng tuyết rồi.', 'Cùng cảnh giới thì ta khỏi chữa cho ngươi nữa. Tự giữ lấy.'],
        down: ['Ngươi đi xa rồi. Băng Phong Cốc vẫn lạnh như cũ, nếu cần một chỗ không có ai.', 'Vòng sau lưng ngươi không làm tan nổi tuyết ở đây. Thế là tốt.'],
        area: 'Băng ở đây không tan từ ngàn năm. Người tới đây hoặc muốn quên, hoặc muốn bị quên.'
    },
    ma_quan: {
        up: ['Con kiến {me} cũng biết ngẩng đầu sao? Thú vị.', 'Ta nuốt cả trăm tông môn mới tới được chỗ này. Ngươi định trả bằng gì?'],
        even: ['Cùng cảnh giới. Ngươi ngửi thấy mùi máu của chính mình chưa?', 'Ngươi và ta khác nhau ở chỗ ta không giả vờ mình sạch.'],
        down: ['Ngươi đứng trên ta... Ma Uyên vẫn còn sâu hơn ngươi tưởng.', 'Giết ta đi thì vực này lại sinh ra một kẻ khác. Ngươi định giết bao nhiêu lần?'],
        area: 'Ma Uyên không đáy. Mỗi kẻ rơi xuống đều tưởng mình là kẻ cuối cùng.'
    },
    tien_lai: {
        up: ['Ta cũng từng ở {me}, trước khi đeo xiềng. Tu vi không cứu được ai ở đây đâu.', 'Đừng nhìn lưng ta. Vòng của tiên nô đều bị khắc số.'],
        even: ['Cùng {me} à? Thế thì ngươi đào được bằng ta. Đừng để họ biết.', 'Ngang nhau thì đỡ ta cái gùi một đoạn. Ở đây chẳng ai giúp ai không công.'],
        down: ['Ngươi vượt cả ta rồi. Lúc lên cao, nhớ quay xuống nhìn những cái hầm này.', 'Mang {ring} mà còn đứng nói chuyện với tiên nô, người ta sẽ ghi tên ngươi vào sổ đấy.'],
        area: 'Phía trên là ánh sáng phi thăng, phía dưới là mỏ. Người ta chỉ kể cho nhau nghe phần phía trên.'
    },
    van_nguyet: {
        up: ['{me} thì chưa đủ để xé khế ước. Luyện thêm, ta cần người biết đánh.', 'Tán Tiên không có tông môn chống lưng. Ngươi ngã ở đây không ai nhặt đâu.'],
        even: ['Ngang ta rồi. Tốt, ta không cần người theo, ta cần người đi cạnh.', 'Cùng cảnh giới thì cùng chia rượu, cùng chia nợ. Ở chỗ ta là thế.'],
        down: ['Ngươi đã cao hơn ta. Đừng quên ai cho ngươi chỗ ngủ ngày mới lên.', 'Thiên Đình sẽ mời ngươi về. Đi hay không là việc của ngươi, nhưng đừng mang quân về đây.'],
        area: 'Tán Tiên sống ở rìa mọi thứ: rìa thành, rìa luật, rìa trời. Rìa thì gió mạnh, nhưng thoáng.'
    },
    dao_tri_mau: {
        up: ['{me}? Ở Dao Trì, đó là cảnh giới của người hầu rót rượu.', 'Ngươi đứng xa ra một chút. Hơi phàm còn bám trên áo.'],
        even: ['Cùng cảnh giới. Vậy ngươi được ngồi, nhưng chỉ ở mép bàn.', 'Ta không quen có người nhìn thẳng mình. Ngươi là người đầu tiên trong trăm năm.'],
        down: ['Ngươi đã vượt ta. Đào tiên năm nay sẽ dọn thêm một chiếc ghế.', 'Ta vẫn là chủ Dao Trì. Ở đây, cảnh giới không đổi được chỗ ngồi của ta.'],
        area: 'Đào ở đây chín ba ngàn năm một lần. Người hái đào thì chưa ai sống đủ lâu để hái lần hai.'
    },
    tien_de: {
        up: ['Ngươi còn ở {me}. Trẫm từng ở đó, với một cái cuốc trên vai.', 'Quỳ thì không cần. Đứng thẳng, trẫm muốn xem lưng ngươi có cong không.'],
        even: ['Ngang trẫm. Trong điện này chỉ hai người không phải quỳ, và trẫm không chắc người kia là ai.', 'Cùng cảnh giới thì nói thật đi: ngươi muốn ngai này hay muốn đập nó?'],
        down: ['Ngươi đã vượt trẫm. Ngai vàng này không chịu nổi người như ngươi, nên đừng ngồi.', 'Trẫm cũng từng tưởng lên cao là thoát. Rồi trẫm thấy trời chỉ là cái mỏ lớn hơn.'],
        area: 'Lăng Tiêu Bảo Điện, chín mươi chín bậc ngọc. Mỗi bậc chôn một người. Trẫm đếm rồi.'
    },
    da_bao: {
        up: ['{me} hả? Túi tiền ngươi còn nhẹ hơn tu vi. Xem thôi, đừng sờ.', 'Ta bán cho Thánh nhân. Còn ngươi, ta bán cho sau.'],
        even: ['Cùng cảnh giới, ta giảm cho một phần. Đừng nói với ai.', 'Ngang hàng thì làm ăn ngang hàng. Ngươi mang gì tới đổi?'],
        down: ['Khách quý! Mang {ring} tới quầy ta là làm sáng cả chợ. Muốn xem hàng trong kho không?', 'Ngươi vượt ta rồi, nhưng giá vẫn là giá. Ở chợ này đến Thánh nhân cũng trả tiền.'],
        area: 'Đa Bảo Thị: thứ gì cũng có giá, thứ gì không có giá thì ta chưa bán thôi.'
    },
    thai_thanh: {
        up: ['{me}. Nước chảy chỗ thấp mà vẫn tới biển, ngươi đừng sốt ruột.', 'Ta không dạy ngươi gì đâu. Ngươi cứ ngồi đó, gió sẽ dạy.'],
        even: ['Ngang ta. Vậy ngồi im với ta một nén nhang, không làm gì cả. Khó hơn ngươi nghĩ.', 'Cùng ba vòng vàng, mà ta vẫn chưa hiểu Đạo hơn ngày đầu được bao nhiêu.'],
        down: ['Ngươi đã qua ta. Ta vui, mà cũng không vui. Đạo vốn chẳng có cao thấp.', 'Lão già này chỉ còn biết luyện đan. Ngươi muốn một viên thì cứ lấy.'],
        area: 'Tử Tiêu Cung vốn chẳng có gì. Người ta tới đây tưởng nghe giảng, rồi chỉ nghe được tiếng mình thở.'
    },
    nguyen_thuy: {
        up: ['{me} mà đã dám vào Ngọc Hư? Quy củ là thứ đầu tiên ngươi phải học.', 'Xiển Giáo không thu kẻ lai lịch không rõ. Ngươi chưa đủ tư cách hỏi ta.'],
        even: ['Cùng cảnh giới. Ta vẫn sẽ nói: căn cốt có cao thấp, đó là luật, không phải ác ý.', 'Ngang hàng thì ngồi, nhưng ngồi cho thẳng.'],
        down: ['Ngươi vượt ta... Phải ghi lại. Luật trời không sai, chỉ có kẻ đọc luật sai.', 'Được, ta thừa nhận. Nhưng quy củ Ngọc Hư không đổi vì một người.'],
        area: 'Ngọc Hư Cung: mỗi viên gạch đều có thứ tự. Kẻ bước lệch một bước, ta đều biết.'
    },
    thong_thien: {
        up: ['Ha! {me} mà dám tới Bích Du. Ta thích. Hữu giáo vô loại, vào đi.', 'Đừng sợ thanh kiếm sau lưng ta. Nó chỉ chém kẻ đóng cửa với người khác.'],
        even: ['Ngang ta rồi! Rút kiếm, chẳng cần lý do gì cả.', 'Cùng cảnh giới thì cùng uống. Đệ tử ta toàn yêu tinh, uống giỏi lắm.'],
        down: ['Ngươi qua ta rồi! Thế là tốt. Kẻ nào vượt được ta, Tiệt Giáo nợ một chén.', 'Đừng khách sáo. Bích Du chưa từng đóng cửa với ai, càng không đóng với ngươi.'],
        area: 'Bích Du Cung không có tường. Ai tới cũng là khách, ai đánh cũng là bạn tập.'
    },
    nu_oa: {
        up: ['{me}... Con người đất sét như ngươi đi được tới đây, ta vui lắm.', 'Ngồi gần lại. Ta muốn xem tay ngươi có còn mùi đất không.'],
        even: ['Ngang ta rồi sao. Có những đứa con lớn nhanh quá, mẹ không kịp nhìn.', 'Cùng cảnh giới, vậy ngươi có biết nặn người không? Khó lắm, thương hơn nặn trời.'],
        down: ['Con đã cao hơn ta. Đừng quên đất mình được nặn từ đâu ra.', 'Có lúc ta vá trời, có lúc trời vá ta. Giờ đến lượt con vá.'],
        area: 'Oa Hoàng Cung có một hồ bùn. Ta nặn người đầu tiên ở đó, và vẫn giữ lại một nắm chưa nặn xong.'
    },
    chuan_de: {
        up: ['Hữu duyên, hữu duyên! {me} mà tới được Cực Lạc thì đúng là có duyên với Tây Phương.', 'Ở lại với bần đạo đi, Tây Phương nghèo nhưng thiếu người lắm.'],
        even: ['Cùng cảnh giới à? Bần đạo vốn chẳng mạnh nhất, nên không ngại nói thật.', 'Ngang hàng thì càng có duyên. Ngươi có muốn mang về Tây Phương một món bảo bối không?'],
        down: ['Thí chủ đã vượt bần đạo. Thôi, coi như Tây Phương lại lỡ một mối duyên.', 'Thí chủ mạnh rồi thì nhớ Cực Lạc còn nghèo. Ghé qua, không xin gì đâu, thật đấy.'],
        area: 'Cực Lạc nghe thì sướng, ở rồi mới biết đất cằn. Bần đạo trồng sen ở đây ba mươi vạn năm mới nở một đóa.'
    },
    dao_to: {
        up: ['{me}.', 'Thiên Đạo nghe thấy ngươi rồi. Đi tiếp.'],
        even: ['Cùng chỗ đứng. Hiếm.', 'Ngươi đến đây, Thiên Đạo phải viết lại một dòng.'],
        down: ['Ngươi qua rồi. Thiên Đạo không giữ ngươi nữa.', 'Ta giữ Thiên Đạo. Ngươi không cần nó.'],
        area: 'Thần Đỉnh. Trên này không có gió, vì gió cũng phải xin phép.'
    },
    ly_khach: {
        up: ['{me} hả? Quán ta tiếp đủ hạng khách, nhưng khách như ngươi thì ít khi ở lâu.', 'Gọi bình rượu đi. Uống xong ta kể chuyện kẻ ở {me} năm xưa đi qua đây rồi không về.'],
        even: ['Cùng cảnh giới, vậy ngươi trả tiền phòng như mọi người, không bớt.', 'Ngang nhau thì kể ta nghe một chuyện đường xa. Chuyện hay ta tính rẻ.'],
        down: ['Khách quý! Ngồi chỗ cửa sổ, đó là chỗ của những người đi xa nhất.', 'Mang {ring} mà còn ghé quán ta. Để ta khắc tên ngươi lên xà nhà.'],
        area: 'Quán này mở ở mọi ngã rẽ không có tên. Người qua đây đều đang đi tìm một chỗ chưa ai tới.'
    },
    vo_danh: {
        up: ['Ngươi gọi ta là gì cũng được. Tên ta dài quá, chính ta cũng quên đoạn giữa.', '{me}... Những con số ấy ta bỏ lại lâu rồi, cùng với hình dạng.'],
        even: ['Cùng chỗ đứng. Vậy ngươi cũng sắp không cần tên nữa.', 'Ngang nhau thì đừng nhìn ta. Nhìn cũng không thấy đâu.'],
        down: ['Ngươi đã vượt kẻ vô danh. Giờ đến lượt ngươi chọn có giữ tên hay không.', 'Vô Tướng thì không cúi đầu được, nhưng ta ghi nhận.'],
        area: 'Ở đây không có tên, nên cũng không có nơi. Ngươi đứng đâu thì đó là {loc}.'
    },
    vong_ky: {
        up: ['Thả lỏng đi. {me} hay gì thì ở Hỗn Độn Hải cũng chẳng ai đếm.', 'Ngồi đi, đừng đứng cứng như cột thế. Ở đây không có trời để mà sợ.'],
        even: ['Cùng năm vòng tím à? Vậy là bạn nhậu rồi.', 'Ngang nhau thì kể chuyện vui đi. Chuyện buồn ta nghe đủ chín đời rồi.'],
        down: ['Ngươi đi trước bọn ta rồi. Thoải mái chứ? Lên cao rồi càng phải thoải mái.', 'Vượt cả Cửu Duệ rồi à? Thôi, lần sau rượu ngươi trả.'],
        area: 'Đạo Giả Âm à? Chỉ là chỗ bọn ta tụ lại kể chuyện cũ. Hỗn Độn mênh mông quá, không tụ thì buồn.'
    },
    huyen_do: {
        up: ['{me}. Lửa đan của ngươi còn chưa đều, đứng gần lò thì cẩn thận.', 'Nhân Giáo dạy chậm. Ngươi muốn nhanh thì sang Xiển Giáo.'],
        even: ['Cùng cảnh giới, vậy giúp ta canh lò một đêm. Đan Nhân Giáo không được để nguội.', 'Ngang hàng. Ta gọi ngươi là đạo hữu, nhưng đan thì vẫn tính tiền.'],
        down: ['Ngươi vượt ta rồi. Sư tôn từng nói, người nhanh nhất thường quên tắt lửa.', 'Ta chỉ giữ cửa Nhân Giáo ở Tiên Giới. Đường của ngươi ở trên cao hơn.'],
        area: 'Nhân Giáo ở Tiên Giới chỉ có một lò, một am, một người. Thái Thanh sư tôn bảo vậy là đủ.'
    },
    quang_thanh: {
        up: ['{me}? Ở Xiển Giáo, đệ tử hầu trà cũng hơn thế.', 'Lai lịch ngươi thế nào? Xiển Giáo không thu đồ không rõ gốc.'],
        even: ['Ngang ta. Hiếm có kẻ ngoài môn đi được tới đây.', 'Cùng cảnh giới thì ta tiếp. Nhưng đừng nhắc tên Tiệt Giáo trước mặt ta.'],
        down: ['Ngươi vượt cả đại đệ tử Xiển Giáo... Sư tôn sẽ muốn gặp ngươi.', 'Được, ta nhận thua. Nhưng ngươi không phải người Xiển Giáo, nên chuyện này không tính.'],
        area: 'Xiển Giáo ở Tiên Giới chỉ thu người có căn cốt. Người không có thì đứng ngoài cổng mà nhìn.'
    },
    trieu_minh: {
        up: ['Ha ha, {me}! Còn nghèo lắm đúng không? Cầm lấy, coi như Triệu mỗ đầu tư.', 'Đừng sợ con hổ đen, nó chỉ cắn kẻ quỵt nợ.'],
        even: ['Ngang hàng! Làm ăn với ta không bao giờ lỗ, chỉ là lời ít hay lời nhiều.', 'Cùng cảnh giới thì cùng hưởng. Tiệt Giáo không giấu của.'],
        down: ['Ngươi vượt ta rồi! Tiền tài thì ta vẫn hơn, ngươi đừng buồn.', 'Lên cao rồi nhớ Tiệt Giáo nghèo đệ tử chứ không nghèo tình.'],
        area: 'Chỗ ta thì vàng nhiều hơn đá. Nhưng đi tiếp xuống núi, đá lại nhiều hơn người.'
    },
    bich_tieu: {
        up: ['{me} mà đòi vào miếu Nương Nương? Lau giày đi đã.', 'Đứng đó. Ta đếm xem ngươi mấy vòng, rồi tính có cho vào không.'],
        even: ['Ngang ta à? Hừ, may cho ngươi là hôm nay ta vui.', 'Cùng cảnh giới thì ta khỏi cầm kéo. Vào thắp hương đi.'],
        down: ['Ngươi vượt ta rồi, đừng có cười. Nương Nương vẫn bắt ngươi cởi giày.', 'Được rồi được rồi, ngươi giỏi. Đừng kể với hai tỷ của ta.'],
        area: 'Miếu Nữ Oa ở Tiên Giới chỉ có ta giữ. Ai muốn gặp Nương Nương thật thì phải lên Oa Hoàng Cung.'
    },
    di_lac: {
        up: ['Ha ha ha, {me}! Bụng ta còn to hơn tu vi của ngươi.', 'Cười một cái đi. Ở Tây Phương, mặt nhăn là không lên được đâu.'],
        even: ['Cùng cảnh giới, vậy cùng cười. Ha ha!', 'Ngang hàng thì ăn chung một trái đào, ta ăn phần to.'],
        down: ['Ngươi vượt ta rồi, ha ha, càng tốt! Bụng ta đỡ phải gánh.', 'Lên cao mà vẫn cười được, đó mới là tu thành.'],
        area: 'Tây Phương Giáo ở Tiên Giới vui lắm, chỉ là chùa nhỏ, ai vào cũng phải nghiêng người.'
    },
    thai_so: {
        up: ['{me}. Lúc thế giới này mới có ánh sáng, ta đã ở đây.', 'Đừng hỏi ta về vòng. Hồi ta tu, chưa có ai đặt tên cho vòng.'],
        even: ['Cùng chỗ đứng. Vậy ngươi đã nghe thấy tiếng đầu tiên của trời đất chưa?', 'Ngang ta. Rất lâu rồi mới có người ngồi được ngang ta.'],
        down: ['Ngươi đã đi trước cả lúc khởi đầu. Ta không biết phải gọi ngươi là gì.', 'Lão Tổ thì cũng có ngày làm hậu bối. Lạ thật.'],
        area: 'Đây là nơi những thứ đầu tiên được đặt xuống. Ngươi đạp lên đâu cũng là một khởi đầu.'
    },
    kiem_to: {
        up: ['{me}. Kiếm còn nhẹ.', 'Rút kiếm. Không cần nói.'],
        even: ['Ngang ta. Một kiếm là biết.', 'Cùng chỗ đứng. Kiếm của ngươi tên gì?'],
        down: ['Ngươi qua ta. Kiếm không nói dối.', 'Ta thua một kiếm. Còn chín ngàn kiếm nữa.'],
        area: 'Thiên Kiếm Vực. Mỗi ngọn núi là một thanh kiếm ta cắm xuống. Đừng chạm.'
    },
    van_kiep: {
        up: ['{me}... Ngươi mới qua mấy kiếp? Ta qua vạn cái rồi.', 'Từ đây trời không thêm vòng, chỉ thêm kiếp. Ngươi chịu được bao nhiêu?'],
        even: ['Ngang ta. Vậy ngươi biết sấm cũng biết mỏi.', 'Cùng chỗ đứng thì ta kể ngươi nghe kiếp thứ ba nghìn, lần duy nhất ta suýt chết.'],
        down: ['Ngươi vượt ta. Kiếp sau của ngươi, ta không đếm được nữa.', 'Hay. Đến cả kiếp nạn cũng phải nhường đường cho ngươi.'],
        area: 'Tinh Mộ là nơi những ngôi sao chết sau kiếp nạn. Ta trông chúng, vì không ai khác chịu trông.'
    },
    hd_vo_thuc: {
        up: ['Ngươi là ai? À, {me}... Ta không nhớ được con số, chỉ nhớ màu.', 'Ồn quá. Ngươi cứ đứng đó, đừng thở mạnh, ta đang mơ.'],
        even: ['Ngang ta à? Ta không biết. Ta không biết mình ở đâu cả.', 'Cha bảo ta đừng nói chuyện với người lạ. Ngươi lạ không?'],
        down: ['Ngươi đi qua ta rồi. Ta không thấy, nhưng ta biết.', 'Ngươi lớn rồi. Ta thì vẫn chưa tỉnh.'],
        area: 'Thái Sơ Thủy... nước này chưa biết mình là nước. Ta cũng vậy.'
    },
    hd_thu_cuu: {
        up: ['{me}. Con của ta còn đi xa hơn ngươi khi đang ngủ.', 'Đứng thẳng. Ở Hỗn Độn, kẻ khom lưng sẽ bị nuốt.'],
        even: ['Ngang hàng Đạo Giả. Vậy ngươi biết ta là kẻ thứ chín, không phải kẻ cuối.', 'Cùng chỗ đứng. Đừng gọi ta là viên mãn, viên mãn là một cách nói lịch sự của "hết đường".'],
        down: ['Ngươi đã vượt kẻ thứ chín. Ta mong ngươi đừng thành kẻ thứ mười.', 'Đường của ngươi giờ không còn ai đi trước. Chậm thôi, đừng để ai đuổi theo.'],
        area: 'Hải Tâm là con mắt của Hỗn Độn Hải. Ngươi nhìn vào nó, nó cũng nhìn lại ngươi.'
    },
    am_duong: {
        up: ['Sáng là {me}, tối cũng là {me}. Ngươi còn hai mặt, ta thì đã khép lại.', 'Một nửa ta muốn dạy ngươi, nửa kia muốn diệt ngươi.'],
        even: ['Ngang nhau. Âm cân dương, ngươi cân ta.', 'Cùng chỗ đứng. Vậy ai là âm, ai là dương?'],
        down: ['Ngươi vượt ta. Âm dương đều nghiêng về phía ngươi.', 'Tịch diệt cũng phải cúi đầu một nửa. Nửa kia vẫn đứng.'],
        area: 'Vô Chung Lâu không có tầng cuối, cũng không có tầng đầu. Ngươi đang ở giữa, như mọi người.'
    },
    thich_thien: {
        up: ['{me}? Ta diệt cả trời rồi, ngươi là cái gì?', 'Tránh ra. Ta không muốn diệt thứ quá nhỏ.'],
        even: ['Ngang ta. Đánh đi, nói nhiều làm gì.', 'Cùng chỗ đứng thì đánh cho biết ai đứng lâu hơn.'],
        down: ['Ngươi vượt ta... Được. Diệt ta đi, nếu ngươi dám.', 'Ta diệt được mọi thứ, trừ ngươi. Lạ thật.'],
        area: 'Hồn Thế à? Chỗ này ta đã diệt một lần, nó lại mọc lên. Lần sau ta diệt kỹ hơn.'
    },
    thai_bach: {
        up: ['Ấy, {me} là một khởi đầu tốt đẹp. Lão phu xin chúc mừng trước.', 'Có việc gì cần Lăng Tiêu, lão phu chuyển lời giúp. Lời thì mất phí, tình thì không.'],
        even: ['Cùng cảnh giới, lão phu xin gọi đạo hữu. Hôm nào vào triều, đừng quên lão phu.', 'Ngang nhau thì nói chuyện dễ. Ngồi xuống, lão phu kể chuyện trong triều.'],
        down: ['Ngài đã vượt lão phu. Thánh chỉ sau này, lão phu mang tới tận cửa ngài.', 'Ôi, lão phu nói chuyện với ngài bằng giọng cũ là thất lễ rồi.'],
        area: 'Lão phu đi sứ khắp Tiên Giới, chỗ nào cũng giống nhau: ai cũng mỉm cười, ai cũng giữ một con dao.'
    },
    lo_tuong: {
        up: ['{me}? Cầm búa còn chưa vững thì đừng hỏi ta rèn gì.', 'Đứng xa lò ra, tóc cháy thì đừng trách.'],
        even: ['Ngang ta. Thế thì tự quạt lửa đi, ta nghỉ một lát.', 'Cùng cảnh giới thì sắt nghe lời cả hai ta.'],
        down: ['Ngươi vượt lão rồi. Đồ của lão giờ không xứng với ngươi, nhưng sửa thì vẫn được.', 'Lò Thanh Vân bé, nhưng ta rèn kiếm cho ngươi từ hồi ngươi còn ngoại môn. Nhớ đấy.'],
        area: 'Lò Thanh Vân này đúc kiếm cho ba đời chưởng môn. Lửa chưa tắt lần nào, kể cả đêm máu chảy trên bậc đá.'
    },
    thuong_hoi: {
        up: ['{me} à? Thương hội ta chưa làm ăn với cảnh giới đó, nhưng ta nhớ mặt ngươi rồi.', 'Muốn hỏi tin tức? Một câu một giá, khách mới thì giá đôi.'],
        even: ['Cùng cảnh giới, ta tính giá người quen.', 'Ngang hàng thì ta nói thẳng: hàng tốt nhất ta để dưới quầy.'],
        down: ['Khách quý! Ngươi cần gì, Kim Nương này tìm được hết, chỉ trừ lương tâm.', 'Vượt ta rồi mà còn ghé thương hội. Ngươi muốn mua hay muốn bán?'],
        area: 'Vân Long Thành là chỗ hàng hóa đi qua. Hàng gì đi qua đây, ta đều biết ai mua, ai trả tiền.'
    },
    hoa_cong: {
        up: ['{me}? HA! Đứng gần lò của ta là cháy da đấy!', 'Lửa Xích Diệm nuốt cả sắt Nguyên Anh. Ngươi muốn thử à?'],
        even: ['Ngang ta! Vậy cầm búa, thổi lửa! Đứng nhìn làm gì!', 'Cùng cảnh giới thì cùng rèn! Lửa không chờ ai!'],
        down: ['Ngươi vượt ta rồi! Tốt! Đem thứ gì khó rèn tới đây!', 'Thần thợ thì cũng phải cúi đầu trước kẻ mạnh hơn. Nhưng búa thì ta không cúi!'],
        area: 'Xích Diệm Sơn cháy từ trước khi có tông môn nào! Đất ở đây nóng tới mức trứng chín trong vỏ!'
    },
    dai_su: {
        up: ['{me}. Muốn lên đài thì đợi sấm gọi tên ngươi.', 'Lôi kiếp không thương ai. Ta giữ đài, ta biết.'],
        even: ['Ngang ta. Lần sau có sấm, ta đứng cạnh ngươi.', 'Cùng cảnh giới, vậy ngươi hiểu tiếng sấm cũng có giọng.'],
        down: ['Ngươi qua cả ta. Đài này chưa ai vượt người giữ đài mà còn quay lại.', 'Vết cháy trên đài, có một vết là của ngươi. Ta không lau.'],
        area: 'Phi Thăng Đài. Sấm đánh xuống đây mỗi ngày, người lên đây mỗi trăm năm.'
    },
    kiem_lao: {
        up: ['{me}. Kiếm ở đây cũng từng thuộc về những người như thế.', 'Nói nhỏ thôi. Kiếm đang ngủ.'],
        even: ['Ngang ta. Vậy ngươi biết kiếm cũng có mộ.', 'Cùng cảnh giới thì giúp ta lau một thanh. Nó đợi chủ ba trăm năm rồi.'],
        down: ['Ngươi qua lão rồi. Đừng để kiếm của ngươi nằm ở đây.', 'Đi xa rồi thì nhớ có một nơi chôn kiếm chứ không chôn người.'],
        area: 'Kiếm Trủng: mỗi ngôi mộ cắm một thanh kiếm, không có tên. Người chết thì quên được, kiếm thì không.'
    },
    thiet_su: {
        up: ['{me}? Đấm vào bia đá này thử xem, chưa vỡ thì đừng nói chuyện.', 'Thân yếu thì đạo cũng yếu. Đi gánh đá đi.'],
        even: ['Ngang ta! Ra sân, đấm nhau một trận cho ấm người.', 'Cùng cảnh giới thì ta không nương tay. Thiết Cốt không biết nương tay.'],
        down: ['Ngươi vượt ta rồi! Xương ngươi bằng gì vậy?', 'Ta thua thì ta nhận. Nhưng mai ta lại gánh gấp đôi.'],
        area: 'Thiết Cốt Môn không có kinh thư. Chỉ có đá, mồ hôi và tiếng xương kêu.'
    },
    huyet_nu: {
        up: ['{me}... máu ngươi còn loãng lắm.', 'Đừng sợ. Ta chỉ ngửi thôi, chưa uống.'],
        even: ['Ngang ta. Máu ngươi nghe có vẻ ngọt.', 'Cùng cảnh giới, ta nói thật: Huyết Sát không ác hơn ai, chỉ thật hơn.'],
        down: ['Ngươi vượt ta rồi. Mùi máu của ngươi giờ làm ta sợ.', 'Đi xa rồi thì nhớ: máu ai cũng đỏ như nhau.'],
        area: 'Huyết Sát ở chỗ đất đỏ quanh năm. Người ngoài tưởng là máu, thật ra là sắt. Nhưng cũng có máu.'
    },
    phap_lao: {
        up: ['{me}. Theo sách thì cảnh giới đó còn ba mươi sáu cửa ải. Ngươi mới qua mấy?', 'Đọc thêm đi. Pháp thuật không đến từ nắm đấm.'],
        even: ['Ngang ta. Vậy ngươi đã đọc tới quyển thứ bao nhiêu?', 'Cùng cảnh giới, ta cho ngươi mượn một quyển. Nhớ trả.'],
        down: ['Ngươi vượt ta... Phải ghi vào sách. Không có trong sách thì không ai tin.', 'Huyền Pháp Các không còn gì dạy ngươi nữa. Nhưng còn nhiều thứ để ngươi viết.'],
        area: 'Huyền Pháp Các giữ chín vạn quyển. Một nửa không ai đọc nổi, nửa kia không ai muốn đọc.'
    },
    thu_mau: {
        up: ['{me} hả? Con hổ ở sau núi còn hơn ngươi đó, đừng có láo.', 'Lại đây, cho bà xem tay. Tay người hay tay thú, bà nhìn là biết.'],
        even: ['Ngang bà rồi à. Thú trong núi bắt đầu nể con rồi đó.', 'Cùng cảnh giới thì dắt con sói già đi dạo giùm bà.'],
        down: ['Con vượt bà rồi. Thú trong núi còn nhớ mùi con đấy.', 'Đi xa rồi nhớ về. Vạn Thú Sơn không đuổi ai, chỉ không giữ ai.'],
        area: 'Vạn Thú Sơn: thú ở đây không ác, chỉ đói. Người ác thì no vẫn cắn.'
    },
    tien_thuong: {
        up: ['{me}? Khách hàng mới, xin mời. Giá trong sổ, không mặc cả.', 'Tính nhẩm thì ngươi còn thiếu vài trăm linh thạch mới mua được món kia.'],
        even: ['Cùng cảnh giới, ta ghi sổ cho ngươi nợ được một lần.', 'Ngang hàng thì ta nói nhỏ: chiều nay hàng mới về.'],
        down: ['Khách quý! Sổ của ngươi ta để riêng một trang.', 'Ngài vượt cả tiểu nhân rồi, nhưng giá thì sổ không cho đổi.'],
        area: 'Vạn Tiên Thành mua bán cả ngày cả đêm. Tiên nhân cũng phải trả tiền, chỉ là trả bằng thứ khác.'
    },
    dong_tu: {
        up: ['Hi hi, {me}! Lò này nóng lắm, ta ném ngươi vào là thành đan liền.', 'Lão gia đi vắng. Ngươi muốn ăn trộm đan thì nhanh lên.'],
        even: ['Ngang ta à? Vậy chơi trò canh lò không? Ai ngủ trước thì thua.', 'Cùng cảnh giới thì ta cho xem cái hồ lô của ta. Đừng nói với lão gia.'],
        down: ['Ngươi lớn hơn ta rồi... Ta vẫn chỉ là đồng tử. Bất công quá.', 'Nếu gặp lão gia, đừng kể ta lấy trộm đan nhé.'],
        area: 'Lò Bát Quái chưa bao giờ tắt. Ta đã canh nó lâu tới mức quên mình bao nhiêu tuổi.'
    },
    hoang_cong: {
        up: ['{me}. Tay ngươi chưa đủ để đục một ngọn núi.', 'Khai sơn không cần sức, cần biết núi muốn mở chỗ nào.'],
        even: ['Ngang ta. Giúp ta đẩy tảng đá này, nó cản đường của một thế giới.', 'Cùng cảnh giới thì ta chia cho ngươi một nhát đục.'],
        down: ['Ngươi vượt ta. Lần sau ngươi mở thế giới, gọi ta tới đục cổng.', 'Ta làm thợ cả đời. Ngươi thì làm trời.'],
        area: 'Hoang Nguyên: đất chưa thành thế giới. Ta đục ra chỗ nào, chỗ đó mới có tên.'
    }
};

/* Cư dân không tên: mỗi người một tính cách theo hạt giống của nơi ở */
const RESIDENT_VOICES = [
    {
        up: ['Ấy, đạo hữu mới {me} à? Ta kể cho nghe, tuần trước có kẻ {me} bước ra cửa là nằm luôn.', 'Ngươi còn non, mà non thì nghe tin đồn nhiều vào. Ta biết đủ chuyện cả vùng này.'],
        even: ['Cùng cảnh giới, vậy ngươi có nghe chuyện con gái nhà họ Vân bỏ trốn chưa?', 'Ngang nhau thì kể chuyện ngang nhau. Ngươi trước, ta sau.'],
        down: ['Ôi trời, {ring}! Để ta chạy đi kể cho cả phố biết.', 'Ngươi mạnh vậy mà còn đứng nói chuyện với ta, mai ta có chuyện mà khoe rồi.'],
        area: { town: 'Trong thành này, chuyện gì xảy ra sáng thì chiều ta đã biết. Hỏi ta là hỏi đúng người.', sect: 'Chuyện trong tông ta biết hết, ai ghét ai, ai nợ ai. Nhưng nói nhỏ thôi.', wild: 'Đường này ta đi trăm lần, gặp đủ hạng người. Có kẻ trả tiền chỉ để ta im.', dungeon: 'Ta sống được ở đây vì nghe ngóng nhanh. Nghe tiếng động lạ là chạy trước khi kịp hỏi.', gate: 'Ai qua cổng ta cũng hỏi chuyện. Phía bên kia nghe nói còn lạ hơn ta tưởng.' }
    },
    {
        up: ['{me}... Đi chậm thôi, ở đây kẻ vội đều ngã.', 'Đừng tin ai quá ba câu, kể cả ta.'],
        even: ['Cùng cảnh giới. Ngươi đi thì nhìn chân, ta nhìn lưng cho.', 'Ngang hàng thì càng phải cẩn thận. Kẻ ngang mình là kẻ dễ đâm sau lưng nhất.'],
        down: ['Ngươi mạnh rồi, nhưng mạnh không có nghĩa là không chết.', 'Mang {ring} thì càng dễ bị nhắm. Đi đường vòng một chút.'],
        area: { town: 'Thành đông người thì đông móc túi. Giữ chặt túi linh thạch.', sect: 'Ở trong tông, câu nào nói ra cũng có người ghi lại. Ta học cách im từ lâu.', wild: 'Đi đường này đừng nhóm lửa, đừng hát, đừng đi một mình sau khi trời tối.', dungeon: 'Thấy chỗ nào sạch quá thì đừng bước vào. Chỗ sạch là chỗ có thứ đã ăn hết.', gate: 'Qua cổng thì nhớ đường quay lại. Không phải ai cũng nhớ.' }
    },
    {
        up: ['Ha, {me}! Ta cũng từng ở đó, rồi ta ngã ngửa, rồi ta ở đây.', 'Ngươi mặt căng thế? Tu tiên chứ có phải đi đòi nợ đâu.'],
        even: ['Cùng cảnh giới! Vậy ngươi cũng đang kẹt như ta, ha ha.', 'Ngang nhau thì đánh cược đi: ai lên cảnh giới trước thì khao.'],
        down: ['Ối, {ring}! Ngươi đừng đứng gần, ta ngại lắm, mặt ta xấu thế này.', 'Ngươi mạnh vậy, cho ta bám theo một đoạn được không? Ta xách đồ.'],
        area: { town: 'Thành này vui nhất là giờ cơm. Còn lại thì toàn người đi tu mặt nhăn như khỉ.', sect: 'Tông ta nghiêm lắm, nghiêm tới mức con mèo cũng phải đi đúng giờ.', wild: 'Đường xa, gió lớn, quái dữ. Ba thứ đó ta đều né được, trừ cái miệng mình.', dungeon: 'Ta vào đây ba lần, ra cả ba lần. Không phải vì giỏi, mà vì quái chê ta gầy.', gate: 'Cổng này đẹp nhỉ? Ta đứng giữ nó mười năm mà chưa dám qua lần nào.' }
    },
    {
        up: ['Con ơi, {me} ấy à, hồi ta còn trẻ cũng có một đứa như con. Nó đi xa, không về.', 'Ngồi đây nghe lão kể. Chuyện cũ đôi khi cứu được mạng.'],
        even: ['Cùng cảnh giới với lão rồi à? Tóc lão bạc, còn con thì chưa. Thế là con hơn.', 'Ngang lão rồi. Vậy lão kể con nghe chuyện ông nội của nơi này.'],
        down: ['Con vượt lão rồi. Lão già rồi, chỉ còn nhớ được ngày con đi ngang đây.', 'Đi xa thì nhớ về kể lão nghe. Lão không còn sức để đi nữa.'],
        area: { town: 'Hồi lão còn nhỏ, thành này chỉ là một cái chợ bùn. Giờ thì người đông, mà ít ai nhớ chợ bùn.', sect: 'Tông này lập từ đời ông cố lão. Mỗi cái cột đều có một chuyện, mà lão chỉ nhớ một nửa.', wild: 'Ngày trước đường này có một quán trà. Chủ quán bị quái ăn, lão vẫn nhớ vị trà.', dungeon: 'Chỗ này ngày xưa là nhà của ai đó. Giờ thì chẳng ai nhớ là ai.', gate: 'Lão giữ cổng này từ khi còn đen tóc. Bao nhiêu người qua, lão đếm không xuể.' }
    },
    {
        up: ['{me}. Đi đi.', 'Ta không có gì để nói với kẻ ở {me}.'],
        even: ['Cùng cảnh giới. Thế thì sao?', 'Ngang nhau. Đừng làm phiền.'],
        down: ['Ngươi mạnh hơn. Ta biết rồi.', 'Vòng sau lưng ngươi sáng thật. Xong chưa?'],
        area: { town: 'Thành. Người. Ồn.', sect: 'Tông môn. Có quy củ. Đừng phá.', wild: 'Đường xa. Quái nhiều. Tự lo.', dungeon: 'Nguy hiểm. Đừng vào.', gate: 'Cổng. Qua thì qua.' }
    },
    {
        up: ['{me}? Ngươi tu theo công pháp nào? Ta đang kẹt ở {npc}, chỉ ta với!', 'Mỗi ngày ta ngồi sáu canh giờ mà không lên nổi. Ngươi bao lâu?'],
        even: ['Cùng cảnh giới! Ngồi luận đạo với ta một lát, chỉ một lát thôi.', 'Ngang nhau thì so linh căn đi. Linh căn ngươi màu gì?'],
        down: ['Ngươi lên {me} bằng cách nào? Kể đi, ta chép lại!', 'Một ngày nào đó ta cũng sẽ có {ring}. Ngươi đợi ta nhé.'],
        area: { town: 'Linh khí trong thành loãng lắm, ta ra ngoài thành ngồi mới được.', sect: 'Động phủ của tông linh khí dày, mỗi tội phải xếp hàng.', wild: 'Ngoài hoang linh khí tốt, chỉ là ngồi được nửa canh giờ thì quái tới.', dungeon: 'Nơi nguy hiểm thường linh khí dày. Ta tới đây để ngồi, không phải để đánh.', gate: 'Đứng gần cổng hít được chút linh khí của Giới bên kia. Ta đứng đây mỗi ngày.' }
    }
];

const ENEMY_RANGE_LINES = [
    'Quanh đây toàn kẻ từ {low} tới {high}, liệu sức mà đi.',
    'Bọn quanh đây mạnh từ {low} tới {high}. Đi thì nhớ đường về.',
    'Quái ở đây từ {low} lên tới {high}. Kẻ ở {high} thì đừng gây sự.',
    'Từ {low} tới {high}, chỗ này không thiếu thứ gì muốn ăn thịt người.',
    'Có kẻ {low}, có kẻ {high}. Đi một mình thì chọn đường có người.',
    'Ở đây gặp đủ từ {low} tới {high}. Đừng ngại bỏ chạy.'
];

function npcVoice(key) {
    if (NPC_VOICES[key]) return NPC_VOICES[key];
    const named = Object.keys(NPC_VOICES).find(name => NPCS[name] === NPCS[key]);
    if (named) return NPC_VOICES[named];
    return RESIDENT_VOICES[NPC_SEED(key) % RESIDENT_VOICES.length];
}

function voiceText(text, words) {
    return text.replace(/\{(\w+)\}/g, (all, word) => words[word] ?? all);
}

function npcAreaLine(key, loc) {
    const area = npcVoice(key).area;
    const line = typeof area === 'string' ? area : area[loc.type] || area.town;
    return voiceText(line, { loc: loc.name });
}

function npcEnemyRangeLine(key, low, high) {
    return voiceText(ENEMY_RANGE_LINES[NPC_SEED(key) % ENEMY_RANGE_LINES.length], { low, high });
}

if (typeof window !== 'undefined') Object.assign(window, { npcVoice, npcAreaLine, npcEnemyRangeLine });
