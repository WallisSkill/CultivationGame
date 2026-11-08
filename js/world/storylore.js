/* ===========================================================
   LỜI KỂ THÊM CHO CỐT TRUYỆN
   Mỗi khóa là "cảnh giới-tiểu cảnh" của MAIN_CHAPTERS hoặc id nhiệm vụ chính.
   Lời thêm nối vào bước cuối có lời thoại, hoặc vào bước ghi ở "step".
   Các mạch tiết lộ: lá tím và Hồng Mông Tử Khí, dấu ấn đen của Thần Đình, người quét lá, Bàn Cổ.
=========================================================== */
const STORY_LORE = {
    /* ----- Hồi I ----- */
    '0-2': [
        ['mac', 'Trên đỉnh Thanh Vân có một cái đài. Người ta bảo bước lên đó là thành tiên.'],
        ['me', 'Lão từng lên chưa?'],
        ['mac', 'Lên rồi thì ai quét lá cho con?'],
        ['narr', 'Lão cúi xuống nhặt một chiếc lá màu tím, không giống lá của cây nào quanh đây, rồi cất vào túi áo như cất tiền.'],
        ['mac', 'Lá này rơi từ rất cao xuống. Bao giờ con biết nó mọc ở đâu thì về kể ta nghe.']
    ],
    '1-0': [
        ['me', 'Sổ sách ghi những gì?'],
        ['to_dao', 'Ai nhận bao nhiêu đan, ai chết năm nào, ai phi thăng. Trang phi thăng dày nhất, mà chưa có dòng nào ghi một người quay về.'],
        ['to_dao', 'Các trưởng lão kể ngày xưa linh mạch phàm giới chảy như sông. Rồi tới một đời, nó bắt đầu chảy ngược lên trời.'],
        ['me', 'Linh khí cũng phi thăng?'],
        ['to_dao', 'Hỏi nhỏ thôi. Câu đó từng làm một trưởng lão bị phạt diện bích trăm năm.']
    ],
    '1-1': [
        ['me', 'Vì sao Mộc Yêu lại giữ linh thảo?'],
        ['to_dao', 'Vì linh thảo là thứ cuối cùng còn hút được linh khí từ đất. Yêu đói, người cũng đói.'],
        ['to_dao', 'Hồi ta mới vào sơn môn, rừng này chưa có yêu. Linh khí mỏng đi thì thứ gì cũng phải tranh nhau.']
    ],
    '1-2': [
        ['to_dao', 'Đừng để bụng. Lăng Phong là con thế gia, từ lúc chưa biết đi đã được hứa một chỗ trên Phi Thăng Đài.'],
        ['me', 'Chỗ trên Phi Thăng Đài cũng hứa trước được à?'],
        ['to_dao', 'Cái gì có sổ thì có chỗ. Mà sổ thì lúc nào cũng có người giữ.']
    ],
    '2-0': [
        ['chuong_mon', 'Hai trăm năm trước Thanh Vân có ba mươi Kim Đan. Giờ còn năm, chưa ai chết trong trận nào.'],
        ['me', 'Họ đi đâu?'],
        ['chuong_mon', 'Có người phi thăng. Có người đi một mình sau giờ Tý. Trong sổ, hai loại đó chỉ khác nhau một nét mực.']
    ],
    '2-1': [
        ['to_dao', 'Tên bị cạo, nhưng mã đệ tử khắc ở mặt trong vẫn còn. Người này nhập môn cùng năm với Lăng Phong.'],
        ['me', 'Ai lại đi cạo tên một cái xác?'],
        ['to_dao', 'Kẻ không muốn sổ nhớ rằng người này từng tồn tại.']
    ],
    '2-2': [
        ['narr', 'Mặt sau thẻ có một dấu ấn đen nhỏ như hạt vừng, nét khắc không giống chữ của phàm giới.'],
        ['to_dao', 'Dấu này ta từng thấy một lần, ở bìa cuốn sổ phi thăng của chưởng môn. Nhớ lấy hình dạng nó.'],
        ['me', 'Nó nghĩa là gì?'],
        ['to_dao', 'Ta không biết. Nhưng thứ gì có mặt cả trên xác chết lẫn trên sổ phi thăng thì không phải chuyện tốt.']
    ],
    '3-0': [
        ['chuong_mon', 'Nguyên Anh là lần đầu con nhìn được mình từ bên ngoài. Có thấy gì lạ không?'],
        ['me', 'Có một sợi chỉ rất mảnh nối từ đỉnh đầu lên trời.'],
        ['chuong_mon', 'Ai cũng có. Ta đã thử cắt nó suốt ba trăm năm. Đầu dây bên kia có người cầm, nhưng ta chưa bao giờ thấy mặt.'],
        ['chuong_mon', 'Đừng kể chuyện sợi chỉ với trưởng lão nào. Người kể trước con giờ không còn ở đây.']
    ],
    '3-1': [
        ['narr', 'Một âm hồn chưa tan hết thì thầm: "Cầu gãy rồi... không ai múc canh... bọn ta không qua sông được..."'],
        ['me', 'Cầu nào?'],
        ['to_dao', 'Sách cổ chép có một con sông của người chết, nằm sâu dưới chân Tiên Giới. Người chết phải qua cầu, uống canh, quên hết rồi mới được đầu thai.'],
        ['to_dao', 'Nếu cầu gãy thật thì âm hồn sẽ dồn lại ở phàm giới. Và có kẻ đang nhặt chúng về Ma Uyên.']
    ],
    '3-2': [
        ['me', 'Lưu huỳnh dùng để làm gì?'],
        ['thuong_hoi', 'Đốt trận. Trận gì mà một tháng ăn ba xe lưu huỳnh thì ngươi tự đoán.'],
        ['thuong_hoi', 'Tặng thêm một tin không lấy tiền: người ký nhận ở Ma Uyên viết chữ rất đẹp, nét chữ của người được dạy trong tông môn.']
    ],
    '4-0': [
        ['me', 'Nhịp thở đó rất chậm, như của người già đang ngủ.'],
        ['to_dao', 'Dưới đại điện là hầm tàng thư của tổ sư, niêm phong từ ngày lập tông.'],
        ['to_dao', 'Tổ sư là người duy nhất trong sổ phi thăng có ghi chú. Sổ chỉ viết: "Người đã về, không nói gì, rồi xuống núi."'],
        ['me', 'Xuống núi đi đâu?'],
        ['to_dao', 'Sổ không ghi. Có lẽ người ghi sổ cũng không dám hỏi.']
    ],
    '4-1': [
        ['narr', 'Con hạc không chết vì Tuyết Yêu. Trên cổ nó có một vết kiếm rất sạch, sáng như kiếm của một đệ tử trẻ.']
    ],
    '4-2': [
        ['me', 'Trong thư sư phụ có nhắc tới lão quét lá nơi con lớn lên.'],
        ['chuong_mon', 'Lúc ta còn là đứa bé, ông lão ấy đã quét lá. Bây giờ ông ấy vẫn quét. Con nghĩ một người phàm sống được bao lâu?'],
        ['me', 'Lão là tu sĩ?'],
        ['chuong_mon', 'Ta chưa từng đo được tu vi của ông ấy, một lần cũng không. Ta chỉ biết ông ấy là người gửi con tới đây.'],
        ['chuong_mon', 'Đốt thư đi. Nếu có ngày con đi đủ xa, hãy về hỏi ông ấy giúp ta: đường xuống nằm ở đâu.']
    ],
    '5-0': [
        ['to_dao', 'Từ ngày Lăng Phong bỏ đi, Ma Uyên mỗi đêm lại sáng thêm một chút. Đệ tử bắt đầu bàn chuyện xuống núi.'],
        ['me', 'Để họ đi.'],
        ['to_dao', 'Đi đâu? Phàm giới hết chỗ linh khí dày rồi. Chỗ dày nhất còn lại là Ma Uyên và Phi Thăng Đài.'],
        ['to_dao', 'Một chỗ hút linh khí xuống, một chỗ hút linh khí lên. Đệ không thấy lạ sao?']
    ],
    '5-1': [
        ['narr', 'Long Vương đếm tiền rất chậm. Lão kể Đông Hải từng có chín con rồng, tám con đã phi thăng.'],
        ['me', 'Rồi sao?'],
        ['narr', 'Lão cười, nói vảy rồng là linh tài mà trên trời mua giá cao nhất. Ngươi không hiểu vì sao tiếng cười ấy làm ngươi rùng mình.']
    ],
    '5-2': [
        ['to_dao', 'Ta cũng mơ. Ta mơ thấy hắn năm mười hai tuổi, ngồi ở bậc đá khóc vì kéo không nổi dây cung.'],
        ['me', 'Tỷ thương hắn?'],
        ['to_dao', 'Ta thương đứa trẻ đó. Người ta không thành ma vì ác. Người ta thành ma vì không chịu nổi việc phải chờ.']
    ],
    '6-0': [
        ['han_bang', 'Trước khi đi, đệ tử ta để lại một câu: "Nếu trên đó tốt, con sẽ gửi tuyết về." Năm trăm năm rồi, Băng Phong chưa có hạt tuyết nào lạ.'],
        ['me', 'Bà vẫn đợi?'],
        ['han_bang', 'Ta đợi để biết có nên khuyên ngươi đừng đi. Nhưng ngươi sẽ đi, nên ta chỉ dặn được một điều.'],
        ['han_bang', 'Trên đó, nếu thấy người cầm xích, đừng cúi đầu trước. Kẻ cúi đầu trước sẽ bị đeo xích trước.']
    ],
    '6-1': [
        ['to_dao', 'Xuống đây còn hơn lên trên? Ma Quân dạy quân của hắn câu đó.'],
        ['me', 'Có khi hắn biết điều gì mà ta không biết.'],
        ['to_dao', 'Đó mới là điều làm ta sợ.']
    ],
    '6-2': [
        ['me', 'Bao nhiêu cái tên?'],
        ['to_dao', 'Ba ngàn bốn trăm hai mươi mốt người, kể từ ngày lập tông. Dấu hỏi nào cũng là cùng một nét tay của sư phụ.'],
        ['to_dao', 'Trang cuối có một dòng viết vội: "Linh khí đi lên cùng người. Ai đếm?"'],
        ['me', 'Ai đếm?'],
        ['to_dao', 'Đệ lên rồi thì tìm ra giúp ta.']
    ],
    '7-0': [
        ['dai_su', 'Có một chuyện, từ trước ta mấy đời giữ đài. Có người từ cột sáng bước xuống, áo trắng, tay cầm chổi.'],
        ['me', 'Người ấy nói gì?'],
        ['dai_su', 'Không nói gì. Quét sạch đài rồi đi xuống chân núi. Sổ ghi đó là ảo giác của người giữ đài, vì đài này chỉ có đường lên.']
    ],
    '7-1': [
        ['dai_su', 'Lôi kiếp không phải để giết ngươi. Nó để đo xem ngươi nặng bao nhiêu.'],
        ['me', 'Đo cho ai?'],
        ['dai_su', 'Cho kẻ nhận hàng ở đầu kia cột sáng. Ta giữ đài ba trăm năm, chỉ dám đoán đến thế.']
    ],
    '7-2': [
        ['ma_quan', 'Ta từng đứng trên Phi Thăng Đài. Cột sáng chạm tới đỉnh đầu thì ta thấy một thứ: những chiếc xích treo sẵn ở đầu bên kia.'],
        ['me', 'Rồi ngươi nhảy xuống?'],
        ['ma_quan', 'Ta đào xuống. Ma Uyên là cái hố ta đào để trốn khỏi cái cột ấy. Linh khí rơi vào đây thì không ai thu được nữa.'],
        ['ma_quan', 'Lăng Phong tưởng ta cho hắn sức mạnh. Ta chỉ cho hắn một chỗ trốn. Hắn không hiểu hai thứ đó khác nhau.']
    ],
    '8-0': [
        ['to_dao', 'Ta không tin Ma Quân. Nhưng ta cũng không tin cái cột sáng kia.'],
        ['me', 'Vậy tỷ tin gì?'],
        ['to_dao', 'Tin đệ. Lên rồi thì đi tìm người cầm sổ, hỏi hắn ai cho phép đếm chúng ta.']
    ],
    '8-1': [
        ['me', 'Trả trước thì không sợ bị quỵt.'],
        ['thuong_hoi', 'Ta làm ăn bốn trăm năm, gặp mười một người phi thăng trước ngươi. Ai cũng trả trước cho tông môn.'],
        ['thuong_hoi', 'Chưa ai quay về lấy tiền thừa. Thôi được, ta để phần thừa của ngươi trong một cái hộp riêng.']
    ],
    '8-2': [
        ['to_dao', 'Lên rồi, nhớ xem người phi thăng có phải làm việc không. Ai cũng tưởng trên đó chỉ có tiên nhạc.'],
        ['me', 'Nếu không phải thì sao?'],
        ['to_dao', 'Thì đừng làm thay ai cả. Sư phụ từng nói trên đó chỉ có một thứ lớn hơn mọi tiên nhân, là cái ghế. Ai ngồi được thì ngồi rất lâu.'],
        ['narr', 'Từ dưới chân núi vọng lại tiếng chổi quét lá đều đều, như đang đếm bước chân ngươi.']
    ],

    /* ----- Hồi II ----- */
    '9-0': [
        ['me', 'Ai đóng dấu này?'],
        ['tien_lai', 'Thiên Đình. Kẻ phi thăng nào cũng qua bàn này: cân linh căn, đo tu vi, ghi số, đeo xích.'],
        ['tien_lai', 'Lôi kiếp dưới phàm giới là để cân hàng đó con. Hàng nặng thì vào hầm sâu.'],
        ['narr', 'Cạnh dấu nô lệ trên cổ tay ngươi có một chấm đen nhỏ, giống hệt dấu trên chiếc thẻ đệ tử năm nào.']
    ],
    '9-1': [
        ['me', 'Linh tủy là gì?'],
        ['tien_lai', 'Là linh khí của phàm giới, trôi lên theo kẻ phi thăng rồi đọng dưới đáy Tiên Giới, như mỡ đọng đáy nồi.'],
        ['tien_lai', 'Ngươi mang lên bao nhiêu linh khí, mỏ được thêm bấy nhiêu. Người cũng là quặng, con ạ.']
    ],
    '9-2': [
        ['tien_lai', 'Tông môn ta tên Lạc Hà. Nếu con còn về phàm giới, hỏi giúp ta còn ai nhớ cái tên đó không.'],
        ['me', 'Lão tin con sẽ ra khỏi đây?'],
        ['tien_lai', 'Mắt con giống một người lão từng gặp dưới hầm. Người đó cũng đeo xích, rồi một đêm biến mất, để lại một cây chổi.'],
        ['tien_lai', 'Đốc công lục cả mỏ không tìm ra. Từ đó có những tiên nô đêm nào cũng nghe tiếng quét lá ở tầng dưới cùng.']
    ],
    '10-0': [
        ['me', 'Đếm được bao nhiêu?'],
        ['van_nguyet', 'Bảy mươi vạn người trong ba mỏ lớn. Mỗi năm có chừng hai ngàn người phi thăng, và mỗi năm cũng chết chừng ấy.'],
        ['van_nguyet', 'Con số đều quá, như có ai đặt hạn mức.'],
        ['van_nguyet', 'Tán Tiên Minh là những kẻ trốn được trước khi bị đóng dấu, hoặc tự cắt dấu đi cùng với thịt. Đừng hỏi ta thuộc loại nào.']
    ],
    '10-1': [
        ['van_nguyet', 'Khóa mở rồi mà không ai dám đi. Ngươi hiểu vì sao không?'],
        ['me', 'Vì không biết đi đâu.'],
        ['van_nguyet', 'Vì dấu ấn trên tay họ là một con số. Làm con số lâu rồi thì người ta sợ có tên.']
    ],
    '10-2': [
        ['tien_thuong', 'Thêm một tin miễn phí cho khách mới: linh tủy không lên Lăng Tiêu bằng xe.'],
        ['me', 'Bằng gì?'],
        ['tien_thuong', 'Bằng ống, một hệ ống chạy dưới Thiên Hà. Ta từng bán ống đồng cho Thiên Đình. Sổ đặt hàng dài gấp mười lần thứ cả triều đình dùng được.']
    ],
    '11-0': [
        ['me', 'Ngoài Tiên Giới còn gì?'],
        ['van_nguyet', 'Sách Thiên Đình nói trên Tiên Giới là Thánh Giới, nơi Lục Thánh ngồi. Nhưng ống không đi về phía đó.'],
        ['van_nguyet', 'Nó đi về một chỗ không có tên trên bản đồ. Thứ ở đó đủ lớn để nuốt cả một Tiên Giới mà không no.']
    ],
    '11-1': [
        ['van_nguyet', 'Mạch ống đập theo nhịp. Mỗi nhịp là một ca đào.'],
        ['me', 'Nó chảy về hướng nào?'],
        ['van_nguyet', 'Lên trên, rồi rẽ ra ngoài. Chỗ rẽ có một dấu ấn đen to bằng cánh cổng. Không ai trong Tán Tiên Minh đọc được.'],
        ['narr', 'Ngươi nhận ra hình dạng dấu ấn đó. Ngươi đã thấy nó trên thẻ đệ tử dưới Tử Vong Cốc, và trên chính cổ tay mình.']
    ],
    '11-2': [
        ['tien_lai', 'Hầm số chín có một khe nứt thông xuống dưới. Khí ở đó lạnh như hơi thở người chết.'],
        ['me', 'Dưới Tiên Giới còn gì?'],
        ['tien_lai', 'Người ta gọi là U Minh Ngục, xa hơn nữa là Âm Giới. Tiên nô chết ở đây không được xuống đó. Hồn họ bị giữ lại trong quặng.'],
        ['tien_lai', 'Sau này con có sức thì xuống đó, hỏi Mạnh Bà xem bà có nhận người không có tên không.']
    ],
    '12-0': [
        ['me', 'Tỷ tin Dao Trì sẽ giúp?'],
        ['van_nguyet', 'Dao Trì Thánh Mẫu là vợ Tiên Đế. Ba trăm năm nay bà không bước ra khỏi ao sen, không ai biết vì sao.'],
        ['van_nguyet', 'Người không ra khỏi nhà lâu như thế thì hoặc đang trốn, hoặc đang bị giữ. Loại nào cũng cần đồng minh.']
    ],
    '12-1': [
        ['dao_tri_mau', 'Kiếm khí đó là của Thông Thiên. Hắn chém một kiếm từ Bích Du, cách cả một Giới.'],
        ['me', 'Một Giới?'],
        ['dao_tri_mau', 'Trên Tiên Giới là Thánh Giới, nơi chỉ có sáu người ngồi. Muốn vào phải có Hồng Mông Tử Khí, thứ không ai ở Tiên Giới từng thấy tận mắt.'],
        ['dao_tri_mau', 'Người ta đồn tử khí rơi xuống từ một nơi còn cao hơn cả Thánh Giới. Ta chỉ biết nó màu tím, như hoàng hôn ở chỗ không có mặt trời.']
    ],
    '12-2': [
        ['me', 'Khế ước đó ký với ai?'],
        ['dao_tri_mau', 'Với kẻ không có mặt. Đêm ký, ta chỉ thấy một bàn tay đen đặt lên giấy, để lại dấu ấn đen.'],
        ['dao_tri_mau', 'Từ đêm đó Hạo Thiên không ngủ được nữa. Hắn bảo trong mơ nghe ai đó đếm số.']
    ],
    '13-0': [
        ['van_nguyet', 'Ngươi biết vì sao mỏ đó tên Vô Quang không?'],
        ['me', 'Vì không có ánh sáng.'],
        ['van_nguyet', 'Vì ánh sáng của nó bị gửi đi hết. Linh tủy ở đó tắt ngay khi đào lên. Ánh sáng chảy vào ống trước khi ai kịp nhìn.']
    ],
    '13-1': [
        ['me', 'Bao nhiêu cái cuốc?'],
        ['narr', 'Ngươi không đếm hết. Cán cuốc nào cũng khắc một con số. Số nhỏ nhất là ba.'],
        ['tien_lai', 'Số một và số hai không có cuốc. Người ta nói đó là hai người đầu tiên ký vào mỏ này, không phải đào.']
    ],
    '13-2': [
        ['tien_lai', 'Đi đâu à? Đi đâu cũng được. Lần đầu tiên câu hỏi đó có nhiều hơn một câu trả lời.'],
        ['van_nguyet', 'Tán Tiên Minh sẽ dẫn họ về Vạn Tiên Thành. Còn ngươi, Thiên Đình sắp gửi thư cho ngươi rồi.'],
        ['me', 'Thư gì?'],
        ['van_nguyet', 'Chiếu chém đầu hoặc chiếu phong quan. Ở Lăng Tiêu, hai loại đó viết trên cùng một loại giấy.']
    ],
    '14-0': [
        ['thai_bach', 'Thêm nữa: trong triều có một ghế để trống từ trước đời bệ hạ. Không ai được ngồi, không ai được hỏi.'],
        ['me', 'Ghế của ai?'],
        ['thai_bach', 'Sổ ghi là ghế của "Sứ giả bên ngoài". Ta đọc chiếu cho ba Tiên Đế, chưa thấy vị sứ giả đó tới lần nào.']
    ],
    '14-1': [
        ['quang_thanh', 'Thiên mệnh do sư phụ Nguyên Thủy chép. Nhưng người chép theo một bản gốc không ai thấy, nằm ở rất xa trên đầu Thánh Giới.'],
        ['me', 'Vậy người chép cũng chỉ là người chép.'],
        ['quang_thanh', 'Câu đó đủ để ngươi bị đuổi khỏi Ngọc Hư ba đời. Đi đi.']
    ],
    '14-2': [
        ['me', 'Dấu ấn đen này ta thấy ba lần rồi.'],
        ['thai_bach', 'Vậy ngươi thấy nhiều hơn cả triều đình cộng lại. Lão chỉ biết mỗi lần dấu đó sáng lên, thuế tăng một thành.'],
        ['thai_bach', 'Và đêm đó bệ hạ không ngủ, ngồi nghe ai đó đọc số qua vách.']
    ],
    '15-0': [
        ['tien_de', 'Ngươi có biết vì sao ta đếm từng hạt thuế không? Thiếu một hạt thì sẽ có kẻ tới lấy mạng bằng chính con số đó.'],
        ['me', 'Ai?'],
        ['tien_de', 'Một sứ giả không có mặt. Ngàn năm hắn tới một lần, ngồi vào chiếc ghế trống trong triều, và đếm.']
    ],
    '15-1': [
        ['narr', 'Dấu nô lệ đã mờ, che dưới giáp vàng. Thiên binh của Thiên Đình cũng là tiên nô được thăng chức.'],
        ['van_nguyet', 'Thiên Đình nuôi xích bằng người từng đeo xích. Vừa rẻ vừa trung thành.']
    ],
    '15-2': [
        ['dao_tri_mau', 'Ngươi đi, cầm theo cái này.'],
        ['narr', 'Bà đưa ngươi một cánh sen khô màu tím nhạt, mỏng như hơi thở.'],
        ['dao_tri_mau', 'Hồi mới thành tiên, ta và hắn thấy nó rơi từ trên cao xuống ao. Một sợi tử khí lạc đường. Hắn hứa có ngày sẽ đi tìm nơi nó mọc.'],
        ['dao_tri_mau', 'Hắn quên rồi. Ngươi đừng quên.']
    ],
    '16-0': [
        ['thai_bach', 'Còn một chuyện. Chiếc ghế trống của sứ giả bên ngoài, sáng nay có người ngồi.'],
        ['me', 'Ai?'],
        ['thai_bach', 'Không ai cả. Đệm ghế lõm xuống như có người ngồi, rồi phẳng lại. Trên đệm để lại một chấm đen.']
    ],
    '16-1': [
        ['narr', 'Một thiên binh già không buông giáo, mà đặt nó nằm ngang trước mặt ngươi rồi quỳ xuống.'],
        ['narr', '"Ngai trống thì ai trả lương?" Lão hỏi. Ngươi không trả lời được, và lão gật đầu như đã quen với điều đó.']
    ],
    '16-2': [
        ['dao_tri_mau', 'Ngày xưa Tiên Giới không có sáu nguồn. Chỉ có một dòng chảy từ trên xuống, ai cũng bảo đó là phần máu cuối của Bàn Cổ.'],
        ['me', 'Bàn Cổ?'],
        ['dao_tri_mau', 'Người khai thiên. Thân thành đất, máu thành sông, hơi thở thành gió. Tiên Giới đứng trên một mạch máu đã nguội.'],
        ['dao_tri_mau', 'Có người nói xác người không nằm ở đây. Muốn biết thật giả thì tìm Đế Giang ở Bàn Cổ Điện, hắn giữ phần máu còn lại.']
    ],
    '17-0': [
        ['van_nguyet', 'Bạch Lão Đầu nhờ ta hỏi bao giờ ngươi về phàm giới. Lão muốn biết còn ai nhớ tông môn của lão.'],
        ['me', 'Khi nào xong việc.'],
        ['van_nguyet', 'Việc của ngươi mới bắt đầu. Đại La là đỉnh của Tiên Giới, nhưng trên đỉnh ấy còn sáu cái ghế. Và trên sáu cái ghế, ta đoán còn kẻ đếm số.']
    ],
    '17-1': [
        ['trieu_minh', 'Sư phụ dặn: kẻ nào đánh được ngoại môn mà không giết ai thì cho xem bản đồ.'],
        ['narr', 'Trên bản đồ, phía trên Tiên Giới vẽ một cung điện tím. Phía trên nữa không vẽ gì, chỉ có một vệt tím nhạt như sương.'],
        ['trieu_minh', 'Chỗ đó sư phụ cũng chưa tới. Người bảo Hồng Mông Tử Khí rơi xuống từ đó, rơi qua mấy tầng trời mới tới tay Thánh Nhân.']
    ],
    '17-2': [
        ['me', 'Tử khí lấy ở đâu?'],
        ['quang_thanh', 'Năm xưa Đạo Tổ giảng đạo ở Tử Tiêu Cung, chia tử khí cho sáu vị. Từ đó không còn phần nào, chỉ còn chút bụi lẻ.'],
        ['quang_thanh', 'Đa Bảo Đạo Nhân gom bụi lẻ ấy, đúc vào sáu món đồ. Còn bụi rơi từ đâu xuống thì phải hỏi người ở trên Đạo Tổ.'],
        ['me', 'Trên Đạo Tổ còn ai?'],
        ['quang_thanh', 'Câu đó không có trong thiên mệnh. Đừng hỏi nữa, ta không muốn chép tên ngươi vào sổ phạt.']
    ],
    '18-0': [
        ['me', 'Tử khí này từ đâu ra?'],
        ['da_bao', 'Hỏi hay. Ta không làm ra nó, ta nhặt. Ngàn năm lại có một ít rơi qua khe trời, như sương lọt qua mái ngói thủng.'],
        ['da_bao', 'Gốc của nó là một đồng cỏ tím ở tận ngoài cùng. Tên đồng cỏ ta chỉ nghe Đạo Tổ nói một lần, lúc người say: Tử Khí Thiên Nguyên.'],
        ['me', 'Đi tới đó được không?'],
        ['da_bao', 'Được, nếu ngươi qua hết Thánh Giới, qua cả những nơi ta không dám kể, rồi lội qua một biển xám không bờ. Người tới đó không cần mua tử khí. Họ thở ra nó.']
    ],
    '18-1': [
        ['da_bao', 'Lũ đạo tặc đó cũng là Chuẩn Thánh, đứng trước cửa Thánh vài vạn năm. Chờ lâu thì ngứa tay.'],
        ['me', 'Sao chúng không tự mua?'],
        ['da_bao', 'Ta không bán cho kẻ cướp. Ta chỉ bán cho kẻ đánh thắng kẻ cướp. Nhờ vậy ta biết hàng về đúng chủ.']
    ],
    '18-2': [
        ['huyen_do', 'Sư phụ Thái Thanh từng nói: tử khí không làm ai mạnh hơn. Nó chỉ cho người ta được phép mạnh hơn.'],
        ['me', 'Ai cho phép?'],
        ['huyen_do', 'Kẻ đã chia tử khí từ đầu. Nếu một ngày ngươi tới được nơi tử khí mọc, nhớ nhìn xem có ai đứng gác không.']
    ],
    m17c: [
        ['narr', 'Sáu đạo tử khí tan vào kinh mạch, mang theo mùi cỏ ướt của một nơi ngươi chưa từng tới. Trong một thoáng ngươi thấy một đồng cỏ tím vô tận và một người đứng quay lưng.'],
        ['narr', 'Rồi hình ảnh tắt. Chỉ còn tiếng chổi quét rất xa, như vọng về từ một kiếp khác.']
    ],

    /* ----- Hồi III ----- */
    '19-1': [
        ['van_nguyet', 'Thành Thánh rồi, cảm giác thế nào?'],
        ['me', 'Như được trao chìa khóa một căn nhà đã có sáu người ở.'],
        ['van_nguyet', 'Vậy thì xem họ có biết căn hầm dưới nhà không.']
    ],
    '19-2': [
        ['thong_thien', 'Nói thật nhé nhóc, ở đây toàn nghị chuyện đất đai, đệ tử, chỗ ngồi. Chưa ai nghị chuyện trên đầu mình.'],
        ['me', 'Trên đầu Thánh Giới có gì?'],
        ['thong_thien', 'Ta từng chém thử một kiếm lên trên. Kiếm đi rất xa rồi khựng lại, như đâm vào một tấm màn. Năm người kia bảo ta say.'],
        ['thong_thien', 'Đạo Tổ giảng đạo xong thì đi, không ai biết đi đâu. Chiếc bồ đoàn của người vẫn để trống tới giờ.']
    ],
    '20-0': [
        ['dong_tu', 'Đừng buồn. Sư phụ còn nhường cả Đạo Tổ. Có lần Đạo Tổ hỏi ai muốn lên cao hơn, sư phụ là người duy nhất không giơ tay.'],
        ['me', 'Vì lười?'],
        ['dong_tu', 'Vì người thấy những kẻ giơ tay đều không quay về. Sư phụ bảo trên Thánh còn tầng nữa, và tầng đó không cần thêm người.']
    ],
    '20-1': [
        ['me', 'Tấm bồ đoàn đó của ai?'],
        ['tien_de', 'Của Đạo Tổ. Người ngồi đó giảng đạo một lần, chia tử khí cho sáu vị, rồi đứng dậy đi lên phía trên. Từ đó Hồng Mông Tử Khí trong Thánh Giới không tăng thêm một sợi.'],
        ['tien_de', 'Ta thiếu đúng một sợi. Ngươi biết đi đâu để lấy không?'],
        ['me', 'Đa Bảo nói tử khí mọc ở một đồng cỏ tím ngoài cùng.'],
        ['tien_de', 'Vậy ngươi đi trước đi. Ta già rồi, chỉ ngồi đợi được thôi.']
    ],
    '20-2': [
        ['me', 'Vậy ai đặt thứ đó lên mắt các ngài?'],
        ['dong_tu', 'Sư phụ không nói. Người chỉ bảo ta quạt lò mạnh hơn. Khói dày lên thì thứ không muốn bị thấy cũng khó trốn.'],
        ['narr', 'Trong làn khói lò Bát Quái, ngươi thấy những sợi chỉ đen mảnh như tóc nối từ mắt sáu pho tượng Thánh lên phía trên.']
    ],
    '21-1': [
        ['van_nguyet', 'Chờ ở đây ta nghe được một chuyện. Các Chuẩn Thánh già bảo trên Đại Thánh còn một tầng không có tên trong sách.'],
        ['me', 'Họ biết gì về nó?'],
        ['van_nguyet', 'Chỉ biết ai lên đó rồi thì không còn được gọi là Thánh. Và ở tầng ấy, Hồng Mông Tử Khí không phải để mua. Nó là không khí để thở.']
    ],
    '21-2': [
        ['thong_thien', 'Ngươi sắp tới chỗ ta rồi. Kể ngươi nghe một chuyện: Đạo Tổ từng nói Hồng Mông Tử Khí không sinh ra ở thế giới này.'],
        ['me', 'Vậy nó sinh ra ở đâu?'],
        ['thong_thien', 'Ở nơi mọi thế giới bắt đầu. Qua tầng trời cao nhất, qua cả chỗ ngươi tưởng là hết, sẽ tới một biển không màu. Sau mắt bão của biển ấy, tử khí mọc như cỏ.'],
        ['thong_thien', 'Ta chưa tới. Ta chỉ thấy bằng kiếm, lúc kiếm còn đi được.']
    ],
    '22-0': [
        ['me', 'Thiên Ma ăn gì?'],
        ['thong_thien', 'Ăn linh tủy, và ăn cả việc chúng ta không thấy chúng. Càng lâu không ai thấy, chúng càng béo.'],
        ['thong_thien', 'Sau chỗ ta chém rách là một vùng trời khác. Có quán ăn, có xác thế giới, có kẻ mạnh hơn ta ngồi uống rượu. Ta thấy mà không dám bước qua.'],
        ['me', 'Thánh Nhân cũng có lúc không dám?'],
        ['thong_thien', 'Thánh Nhân chỉ là chữ khắc trên ghế. Ngồi lâu thì quên mình đang ngồi trên cái gì.']
    ],
    '22-1': [
        ['narr', 'Trong ngực một Kim Cương rỗng có một mảnh sổ, ghi tên từng tín đồ Cực Lạc kèm một con số.'],
        ['narr', 'Dưới cùng là dấu ấn đen quen thuộc. Cực Lạc cũng là một cái mỏ, chỉ là người ta tự nguyện đào bằng nụ cười.']
    ],
    '22-2': [
        ['to_dao', 'Đệ tìm ra người cầm sổ chưa?'],
        ['me', 'Sắp rồi. Hắn không ở Thiên Đình, cũng không ở Thánh Giới.'],
        ['to_dao', 'Vậy thì xa thật. À, lão quét lá ngày xưa hỏi thăm đệ. Lão bảo đệ đi tới đâu rồi cũng sẽ có lúc thấy lại chiếc lá tím.'],
        ['me', 'Lão biết nó mọc ở đâu?'],
        ['to_dao', 'Lão chỉ cười, bảo đệ còn phải qua mấy lớp trời nữa.']
    ],

    /* ----- Hồi IV ----- */
    '23-0': [
        ['ly_khach', 'Đây là Thiên Ma Ngoại Vực. Các Thánh dưới kia không thấy nó, vì nó nằm ngay trên mí mắt họ.'],
        ['me', 'Thiên Ma là gì?'],
        ['ly_khach', 'Là thợ gặt. Một vũ trụ lớn lên, linh khí đủ dày thì chúng tới gặt. Mỏ tiên nô của ngươi chỉ là một cái liềm nhỏ.'],
        ['ly_khach', 'Nhưng chúng cũng chỉ là thợ. Người mua lúa ở xa hơn. Ăn đi đã, chuyện đó dài.']
    ],
    '23-1': [
        ['me', 'Ai ghi sổ đó?'],
        ['ly_khach', 'Đúng câu cần hỏi. Mỗi vũ trụ có một số, ghi ở Thiên Đạo Thần Đình, nơi Thiên Đạo ngồi đếm.'],
        ['ly_khach', 'Lúc ngươi độ lôi kiếp ở phàm giới, Thiên Đạo đã cân ngươi. Ngươi nặng bao nhiêu, sổ ghi bấy nhiêu.']
    ],
    '23-2': [
        ['me', 'Vậy kẻ đếm số là Thiên Đạo.'],
        ['ly_khach', '(Truyền âm) Đúng một nửa. Thiên Đạo đếm, Thần Đình giữ sổ. Còn ai đọc sổ thì ngay cả ta cũng không biết.']
    ],
    '24-0': [
        ['me', 'Thần Đình nằm ở đâu?'],
        ['ly_khach', 'Ở cuối Ngoại Vực, sau Luân Hồi Hải và Khai Thiên Hoang Nguyên. Có một người ngồi giữ cửa, người mà các Thánh dưới kia gọi là Đạo Tổ.'],
        ['me', 'Đạo Tổ cũng ở trong sổ?'],
        ['ly_khach', 'Người là cái bìa sổ. Tới lúc đứng trước người, hãy hỏi người có muốn nghỉ không.']
    ],
    '24-1': [
        ['narr', 'Tàn hồn không trả lời, chỉ tay lên trên. Ở đó có một ngọn đèn rất xa, ngọn đèn của Thần Đình.'],
        ['ly_khach', 'Mỗi tàn hồn ở đây là người của một vũ trụ đã bị gặt. Chúng không đầu thai được, vì sổ của chúng đã đóng.']
    ],
    '24-2': [
        ['huyen_mau', 'Biển này là kho của luân hồi. Mỗi giọt nước là một đời. Thiên Đạo múc nước ở đây để đúc người mới, rồi đếm họ.'],
        ['me', 'Còn Âm Giới dưới Tiên Giới?'],
        ['huyen_mau', 'Chỉ là một cái giếng nhỏ múc từ biển này. Mạnh Bà biết, nên bà ta mới nấu canh. Quên đi rồi thì không ai đếm được nỗi đau.']
    ],
    '25-0': [
        ['narr', 'Nước lặng lại. Ở rìa ảo ảnh có một người cầm chổi đứng rất xa, quay lưng về phía ngươi, như đã đứng đó qua mọi kiếp.'],
        ['me', 'Lão Mặc?'],
        ['narr', 'Mặt nước gợn lên. Khi lặng lại, người cầm chổi đã biến mất, chỉ còn vài chiếc lá tím trôi trên mặt biển.']
    ],
    '25-1': [
        ['narr', 'Một mảnh ký ức: ngươi ngồi trên một chiếc ghế rất cao, dưới chân là sương tím mênh mông, không có ai để nói chuyện.'],
        ['narr', 'Một mảnh khác: ngươi cầm chổi quét lá trước nơi ngươi lớn lên, và có một đứa trẻ đang chờ.']
    ],
    '25-2': [
        ['kiem_to', 'Chí Thượng ở đây ai cũng có chung một câu hỏi: ra khỏi Thiên Đạo thì có gì.'],
        ['me', 'Lão đã thử chưa?'],
        ['kiem_to', 'Ta chém vào bức tường cuối sau Thần Đình. Kiếm không gãy, nhưng ta nghe tiếng sóng phía bên kia. Một biển xám, không màu, không bờ.'],
        ['kiem_to', 'Kẻ nào ngửi được mùi tử khí trong gió từ biển ấy thì không ngủ yên được nữa. Ta là một kẻ như thế.']
    ],
    '26-0': [
        ['hoang_cong', 'Lò của ta đốt bằng gì, ngươi biết không? Bằng một sợi Hồng Mông Tử Khí ta xin được từ một kẻ đi ngang, vạn vạn năm trước.'],
        ['me', 'Kẻ đó từ đâu tới?'],
        ['hoang_cong', 'Từ ngoài biên Thiên Đạo đi ngược vào. Hắn bảo ngoài kia là một biển xám chưa ai đặt tên, mắt bão của biển có một đồng cỏ tím. Hắn cầm chổi, tay còn dính lá.']
    ],
    '26-1': [
        ['me', 'Vách trời làm bằng da Hư Không Thú?'],
        ['hoang_cong', 'Thế giới nào cũng vậy, kể cả vũ trụ của ngươi. Thiên Đạo may vách bằng da thú, rồi đóng dấu lên để biết thế giới nào thuộc về mình.'],
        ['hoang_cong', 'Cái dấu đen ngươi thấy suốt đời đó. Giờ thì biết nó in lên đâu rồi.']
    ],
    '26-2': [
        ['van_kiep', 'Ngôi sao sáng nhất kia là của Bàn Cổ. Hắn khai thiên xong không dừng, đi thẳng ra biển xám, rồi bị xé ra từng mảnh.'],
        ['me', 'Người khai thiên cũng chết?'],
        ['van_kiep', 'Một nửa chết, một nửa thành Ma Thần ngủ ngoài kia. Kẻ đi tìm cội nguồn Bàn Cổ rồi cũng phải gặp nửa đó.']
    ],
    '27-0': [
        ['me', 'Thiên Đạo cũng biết thương?'],
        ['ly_khach', 'Lúc đầu nó thương thật. Rồi rêu nhiều quá, nó phải đếm. Đếm lâu quá thì quên mất mình đếm vì thương.'],
        ['ly_khach', 'Đừng sợ thương. Chỉ cần đừng bao giờ bắt đầu đếm.']
    ],
    '27-1': [
        ['narr', 'Trong túi giáp Đạo Vệ có một lệnh bài: "Thế giới mới. Hạn gặt: sau ba vạn năm. Người nhận: Ngoại Vực."'],
        ['me', 'Thế giới của ta cũng bị hẹn ngày gặt.'],
        ['narr', 'Ngươi bóp nát lệnh bài. Từ rất xa, ở cuối Thần Đình, có tiếng một bánh răng khựng lại.']
    ],
    '27-2': [
        ['me', 'Ai làm ra cỗ máy đó?'],
        ['ly_khach', 'Không ai làm. Có một người được đặt vào trong để nó chạy. Người đó ngồi lâu tới mức tưởng mình là cỗ máy.'],
        ['ly_khach', 'Các Thánh gọi người đó là Đạo Tổ. Ở Tử Tiêu, người đã chia Hồng Mông Tử Khí. Nhưng người không có tử khí để chia, người chỉ được giao việc chia.']
    ],
    '28-0': [
        ['narr', 'Dưới ngọn đèn là một chiếc bàn với chồng sổ cao không thấy đỉnh. Cuốn trên cùng mở sẵn ở trang có tên ngươi.'],
        ['narr', 'Dòng cuối ghi: "Nguồn tử khí: ngoài biên. Lối ra: đóng." Chữ "đóng" đã bị ai đó gạch đi, nét gạch còn rất mới.']
    ],
    '28-1': [
        ['narr', 'Trước khi tan, nó thì thầm bằng giọng người: "Đi ra ngoài đi. Ngoài kia không ai đếm."']
    ],
    '28-2': [
        ['ly_khach', 'Ngày mai ngươi gặp người giữ sổ. Thắng người rồi sẽ thấy cửa ra ngoài biên.'],
        ['me', 'Ngoài biên có gì?'],
        ['ly_khach', 'Biển xám, nơi mọi Đạo trôi lềnh bềnh chưa thành hình. Lội qua được thì tới mắt bão. Sau mắt bão là đồng cỏ tím mà Đa Bảo chỉ nhặt được bụi.'],
        ['ly_khach', 'Lúc đó ngươi không cần mua tử khí nữa. Ngươi sẽ thở ra nó, như người quét lá kia.'],
        ['me', 'Lão biết lão ấy?'],
        ['ly_khach', 'Ta mở quán này vì lão hứa sẽ quay lại trả tiền cơm. Thôi, ăn đi.']
    ],
    m29: [
        ['dao_to', 'Hồng Mông Tử Khí ta chia năm xưa không phải của ta. Một người từ ngoài biên mang vào, nhờ ta chia cho kẻ muốn lên cao.'],
        ['dao_to', 'Ra khỏi biên giới là Hỗn Độn. Đi tới Hải Tâm của nó, qua mắt bão, sẽ là Tử Khí Thiên Nguyên. Người mang tử khí vào đã đi lên từ đó.']
    ],

    /* ----- Hồi V, VI, VII ----- */
    m31: [
        ['vo_danh', 'Trong mộ có một Ma Thần mang hình người khổng lồ, tay cầm chiếc rìu gãy. Nó là nửa còn lại của kẻ đã khai thiên vũ trụ ngươi.'],
        ['me', 'Bàn Cổ?'],
        ['vo_danh', 'Tên đó do người trong vũ trụ ngươi đặt. Ở đây nó chỉ là một cơn đói lớn.']
    ],
    m32: [
        ['vong_ky', 'Qua Hải Tâm là Hồng Mông. Tử khí ở đó mọc thành đồng, mỗi ngọn cỏ là một Đạo chưa ai đi.'],
        ['vong_ky', 'Thứ Đa Bảo bán cho ngươi, thứ Đạo Tổ chia cho sáu Thánh, đều là sương của đồng cỏ ấy bay lạc qua Hỗn Độn. Giờ ngươi sắp tới tận gốc.']
    ],
    m34: { step: 0, lines: [
        ['narr', 'Từng ngọn cỏ tím rung lên khi ngươi bước qua. Chiếc lá trong túi Lão Mặc, cánh sen của Dao Trì Thánh Mẫu, bụi tử khí trong đồ của Đa Bảo, tất cả đều từ đây mà ra.'],
        ['narr', 'Ngươi hít một hơi. Hồng Mông Tử Khí tràn vào thân, nhiều tới mức cả Thánh Giới cũng không đong hết.']
    ] },
    '30-2': [
        ['thich_thien', 'Tiếng chổi đó vang từ trên xuống, qua Hồng Mông, qua Hỗn Độn, tới tận nơi ngươi lớn lên. Nó quét đường cho ai đó.'],
        ['me', 'Cho ta?'],
        ['thich_thien', 'Cho kẻ đi sau. Ngươi đã đi sau ai, thì rồi cũng có kẻ đi sau ngươi.']
    ],
    '31-1': [
        ['tien_lai', 'Lạc Hà Tử. Tông môn không còn, nhưng cái tên thì còn. Cảm ơn con đã cho ta đủ thời gian để nhớ.']
    ],
    '31-2': [
        ['ly_khach', 'Lão quét lá kia cũng nói vậy, lúc ăn bữa đầu tiên ở đây, cách đây mấy vạn kiếp. Giờ ngươi trả xong rồi, lão cũng trả xong rồi.']
    ]
};

Object.entries(STORY_LORE).forEach(([key, entry]) => {
    const quest = QUEST_INDEX[/^\d/.test(key) ? `mc${key.replace('-', '_')}` : key];
    const { step: at, lines } = Array.isArray(entry) ? { lines: entry } : entry;
    const step = at != null ? quest.steps[at] : [...quest.steps].reverse().find(s => s.say);
    step.say = [...(step.say || []), ...lines];
    if (step.ruled?.say) step.ruled.say = [...step.ruled.say, ...lines];
});
