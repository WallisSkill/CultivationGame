/* ===========================================================
   LỜI KỂ THÊM, ĐỢT BA
   Mỗi hồi truyện và mỗi nhiệm vụ chính thêm năm câu, nối vào bước cuối có lời thoại.
=========================================================== */
const STORY_LORE_MORE = {
    /* ----- Hồi I ----- */
    '0-2': [
        ['me', 'Nếu con không về được thì sao?'],
        ['mac', 'Thì lá vẫn rụng, ta vẫn quét. Có những thứ không cần người chờ mới xảy ra.'],
        ['me', 'Lão có đợi con không?'],
        ['mac', 'Ta đợi lâu rồi. Thêm một đời nữa cũng chẳng sao.'],
        ['narr', 'Lão quay đi. Ngươi để ý chiếc chổi của lão không có cọng nào gãy, như chưa từng quét qua thứ gì nặng.']
    ],
    '1-0': [
        ['me', 'Tỷ có tin linh khí chảy lên trời không?'],
        ['to_dao', 'Ta tin những gì ta đo được. Năm ta nhập môn, một viên đan đủ cho ta ngồi ba ngày. Giờ chỉ đủ hai.'],
        ['to_dao', 'Đan không đổi, lò không đổi, người luyện cũng không đổi. Chỉ có đất là gầy đi.'],
        ['me', 'Rồi sẽ có ngày không còn gì để tu?'],
        ['to_dao', 'Có lẽ. Cho nên đệ tu nhanh lên, kịp lúc còn thứ để tu.']
    ],
    '1-1': [
        ['me', 'Vậy giết Mộc Yêu là cướp của chúng.'],
        ['to_dao', 'Phải. Tu tiên là cướp linh khí của trời đất. Người ngay thẳng thì nhận điều đó, kẻ giả dối thì gọi là cơ duyên.'],
        ['to_dao', 'Đệ chọn làm loại nào?'],
        ['me', 'Loại nhớ mình đã lấy của ai.'],
        ['to_dao', 'Tốt. Kiếm của kẻ biết nhớ thường không vung bừa.']
    ],
    '1-2': [
        ['me', 'Ai giữ sổ của Thanh Vân?'],
        ['to_dao', 'Chưởng môn. Nhưng trăm năm một lần, chưởng môn phải nộp bản sao lên Phi Thăng Đài.'],
        ['me', 'Phi Thăng Đài cần sổ của tông môn làm gì?'],
        ['to_dao', 'Ta hỏi rồi. Người giữ đài nói: "Để biết ai sắp lên." Giọng lão lúc ấy làm ta lạnh gáy, nên ta không hỏi thêm.'],
        ['narr', 'Từ xa, Lăng Phong vẫn đứng nhìn về phía ngươi, tay đặt trên chuôi kiếm.']
    ],
    '2-0': [
        ['me', 'Sư phụ có định phi thăng không?'],
        ['chuong_mon', 'Ta đủ tu vi từ ba mươi năm trước.'],
        ['me', 'Vậy sao sư phụ còn ở đây?'],
        ['chuong_mon', 'Vì ta đọc sổ quá kỹ. Kẻ đọc sổ kỹ thì không dám bước lên đài.'],
        ['chuong_mon', 'Đừng học ta. Ta già và nhát. Con còn trẻ, đủ gan để đi xem cái đài đó dẫn tới đâu.']
    ],
    '2-1': [
        ['me', 'Có nên báo chưởng môn không?'],
        ['to_dao', 'Báo thì phải nói ta tự ý xuống Tử Vong Cốc. Không báo thì người này mãi không có tên.'],
        ['me', 'Vậy báo.'],
        ['to_dao', 'Đệ chịu phạt dễ thật. Được, ta đi cùng.'],
        ['narr', 'Trước khi rời cốc, ngươi lấy than viết lên tấm thẻ. Không biết tên thật của người đó, ngươi viết "Đồng môn".']
    ],
    '2-2': [
        ['me', 'Sư tỷ, tỷ từng muốn phi thăng không?'],
        ['to_dao', 'Từng. Năm mười sáu tuổi ta thề sẽ lên trước Lăng Phong.'],
        ['me', 'Giờ thì sao?'],
        ['to_dao', 'Giờ ta muốn biết trên đó có gì trước đã. Người khôn thì nhìn đường trước khi chạy.'],
        ['to_dao', 'Còn đệ thì chắc chắn sẽ chạy trước. Cho nên ta phải nhìn hộ đệ.']
    ],
    '3-0': [
        ['me', 'Người kể trước con là ai?'],
        ['chuong_mon', 'Trưởng lão Hàn Thư. Ông ấy thử cắt sợi chỉ bằng kiếm. Hôm sau ông ấy được gọi lên Phi Thăng Đài, sớm hơn sổ ghi tám mươi năm.'],
        ['me', 'Ông ấy phi thăng?'],
        ['chuong_mon', 'Sổ ghi vậy. Nhưng đêm đó trời không có sấm.'],
        ['narr', 'Chưởng môn nhắm mắt. Sợi chỉ trên đầu ông mảnh hơn của mọi người, như đã bị cứa nhiều lần.']
    ],
    '3-1': [
        ['me', 'Ma Uyên cần âm hồn làm gì?'],
        ['to_dao', 'Sách nói âm hồn là linh khí đã thành hình. Người chết đi, linh khí còn lại trong hồn.'],
        ['to_dao', 'Hồn không qua sông được thì linh khí không về đất. Nó chỉ trôi, ai nhặt được thì ăn được.'],
        ['me', 'Vậy cầu gãy là có kẻ cố ý.'],
        ['to_dao', 'Hoặc có kẻ cần cầu gãy. Ta không biết cái nào đáng sợ hơn.']
    ],
    '3-2': [
        ['me', 'Ngươi giữ được tờ ký nhận không?'],
        ['thuong_hoi', 'Ta giữ mọi tờ giấy. Nhưng đưa cho ngươi thì ta mất một khách sộp, còn ngươi thì nghèo.'],
        ['me', 'Ta trả bằng gì?'],
        ['thuong_hoi', 'Bằng việc còn sống. Người sống thì mai còn mua hàng. Đây, cầm lấy, đừng nói ai đưa.'],
        ['narr', 'Chữ ký trên tờ giấy có một nét móc cong ở cuối, kiểu chữ chỉ đệ tử chân truyền Thanh Vân được dạy.']
    ],
    '4-0': [
        ['me', 'Nhịp thở dưới đại điện là của tổ sư?'],
        ['to_dao', 'Tổ sư mất từ hai ngàn năm trước. Còn nếu người chưa mất, thì người đang ngủ dưới chân chúng ta.'],
        ['me', 'Tỷ muốn xuống xem?'],
        ['to_dao', 'Muốn. Nhưng niêm phong mang ấn của chưởng môn mọi đời. Phá nó là phá lời của hai mươi đời người.'],
        ['narr', 'Đêm đó ngươi áp tai xuống nền đá. Nhịp thở vẫn chậm và đều, như tiếng chổi quét qua một cái sân rất xa.']
    ],
    '4-1': [
        ['me', 'Lăng Phong.'],
        ['narr', 'Gần xác hạc có một vệt máu đông màu đen, không phải máu chim, cũng không phải máu người.'],
        ['me', 'Hắn bị thương. Ma khí trong máu này... hắn đi quá xa rồi.'],
        ['narr', 'Ngươi gói nửa bức thư vào áo. Gió Băng Phong thổi qua làm tờ giấy sột soạt, như có người đang nói nhỏ.'],
        ['narr', 'Ngươi đứng rất lâu trên tuyết rồi mới quay về, mang theo một bức thư không còn ai để gửi.']
    ],
    '4-2': [
        ['me', 'Sư phụ không tự đi hỏi?'],
        ['chuong_mon', 'Ta hỏi rồi. Năm hai mươi tuổi, ta xuống núi hỏi ông ấy đường lên ở đâu.'],
        ['me', 'Ông ấy trả lời sao?'],
        ['chuong_mon', '"Đường lên ai cũng thấy. Hỏi đường xuống thì ta mới trả lời." Ta không hiểu, nên không hỏi lần thứ hai.'],
        ['chuong_mon', 'Giờ ta hiểu rồi, nhưng không còn đủ thời gian để đi. Con thì còn.']
    ],
    '5-0': [
        ['me', 'Có khi hai chỗ đó đang giành nhau.'],
        ['to_dao', 'Giành linh khí của phàm giới như hai con chó giành một khúc xương. Còn chúng ta là thịt bám trên xương.'],
        ['to_dao', 'Đệ phân đan cho công bằng. Nếu phải chết, ít ra Thanh Vân chết mà không ai oán ai.'],
        ['me', 'Sẽ không ai chết.'],
        ['to_dao', 'Câu đó sư phụ cũng nói, đúng một ngày trước khi người đi.']
    ],
    '5-1': [
        ['me', 'Vì sao con rồng thứ chín không đi?'],
        ['narr', 'Long Vương ngừng đếm. Lão nói con thứ chín là lão, và lão đã tự cắt vảy mình để trời không muốn lấy nữa.'],
        ['narr', 'Dưới áo bào, lưng lão chỉ còn da trần, lằn những vết dao chằng chịt.'],
        ['me', 'Thì ra trên đó người ta mua cả rồng.'],
        ['narr', 'Long Vương cười lần nữa, trả thêm một túi linh thạch, nói là tiền để ngươi đừng bao giờ bán vảy của mình.']
    ],
    '5-2': [
        ['me', 'Đệ không muốn thành ma.'],
        ['to_dao', 'Vậy thì đừng chờ một mình. Mệt thì nói. Ta không giỏi an ủi, nhưng ta giỏi pha trà.'],
        ['me', 'Trà của tỷ đắng lắm.'],
        ['to_dao', 'Đắng thì mới tỉnh. Uống đi rồi ngủ. Mai còn phải chặn quân Ma Uyên.'],
        ['narr', 'Đêm đó ngươi ngủ được. Lần đầu sau ba tháng, trong mơ không có kiếm.']
    ],
    '6-0': [
        ['me', 'Bà biết trên đó có xích?'],
        ['han_bang', 'Ta không biết. Ta chỉ biết người tự do thì sẽ gửi tuyết về.'],
        ['han_bang', 'Một người im lặng năm trăm năm thì hoặc đã chết, hoặc không được phép nói.'],
        ['me', 'Nếu gặp người đó, con sẽ hỏi.'],
        ['han_bang', 'Gặp thì đừng hỏi. Mang người về. Ta còn nợ đứa nhỏ đó một bữa cơm.']
    ],
    '6-1': [
        ['me', 'Vậy ta xuống tận nơi hỏi hắn.'],
        ['to_dao', 'Hỏi được thì cũng phải đánh được. Ma Quân tu ngàn năm, ngồi dưới đáy vực ăn linh khí của nửa phàm giới.'],
        ['me', 'Thì ta lớn nhanh hơn.'],
        ['to_dao', 'Đệ nói như trẻ con. Nhưng hôm nay ta không muốn cãi đệ.'],
        ['narr', 'Ở miệng vực, tro xương Cốt Tướng không bay lên mà chìm xuống, như bị thứ gì dưới đáy nuốt lấy.']
    ],
    '6-2': [
        ['me', 'Có cái tên nào không có dấu hỏi không?'],
        ['to_dao', 'Có một. Tên tổ sư. Phía sau không phải dấu hỏi mà là một chiếc lá vẽ nguệch ngoạc.'],
        ['me', 'Chiếc lá?'],
        ['to_dao', 'Sư phụ vẽ, chắc lúc rảnh. Nhưng sư phụ không bao giờ rảnh. Ta giữ lại trang đó.'],
        ['narr', 'Nàng chìa trang giấy ra. Chiếc lá được tô bằng mực tím, loại mực Thanh Vân chưa từng dùng.']
    ],
    '7-0': [
        ['me', 'Lão tin đó là ảo giác?'],
        ['dai_su', 'Người giữ đài trước ta tin là thật. Ông ấy ghi vào sổ, rồi bị thay ngay năm đó.'],
        ['dai_su', 'Ta thì không ghi gì. Ta chỉ để một cây chổi ở góc đài, phòng khi có người cần.'],
        ['me', 'Có ai dùng chưa?'],
        ['dai_su', 'Sáng nào ta cũng thấy đài sạch lá. Ta không hỏi ai quét.']
    ],
    '7-1': [
        ['me', 'Nếu ta không muốn bị cân?'],
        ['dai_su', 'Thì đừng độ kiếp. Ở lại phàm giới, già đi, chết như mọi người. Có gì đáng xấu hổ đâu.'],
        ['me', 'Có ai ở lại mà sống tốt không?'],
        ['dai_su', 'Có một người. Lão quét lá suốt đời, chưa thấy già đi. Nhưng ta không chắc lão là người ở lại hay người đã về.'],
        ['narr', 'Sấm non tan hết. Trên mặt đài để lại những vết cháy hình bàn cân.']
    ],
    '7-2': [
        ['me', 'Biết vậy sao ngươi không nói với cả phàm giới?'],
        ['ma_quan', 'Nói rồi, ba lần. Lần nào tông môn cũng gọi ta là ma, và lần nào người ta cũng vẫn lên đài.'],
        ['ma_quan', 'Người muốn bay thì ghét kẻ nói trời có lưới. Thà làm ma còn hơn làm kẻ nói thật mà không ai nghe.'],
        ['me', 'Ta nghe rồi.'],
        ['ma_quan', 'Vậy thì lên đi, rồi tự cắt lưới. Ta chỉ đào được một cái hố. Ngươi thì có lẽ đào được cả trời.']
    ],
    '8-0': [
        ['me', 'Đệ đi rồi tỷ sẽ làm gì?'],
        ['to_dao', 'Giữ lửa, dạy đệ tử, sửa mái nhà. Những việc không ai nhớ nhưng thiếu thì sập.'],
        ['to_dao', 'Và mỗi năm ta sẽ lên Phi Thăng Đài nhìn một lần. Nếu có người đi xuống từ cột sáng, ta muốn là người đầu tiên thấy.'],
        ['me', 'Nếu không ai đi xuống?'],
        ['to_dao', 'Thì ta vẫn nhìn. Có người nhìn thì đường mới không bị quên.']
    ],
    '8-1': [
        ['me', 'Mười một người trước, ngươi có nhớ tên không?'],
        ['thuong_hoi', 'Nhớ hết. Làm ăn thì phải nhớ tên khách, nhất là khách không về.'],
        ['thuong_hoi', 'Người thứ ba là một cô gái Băng Phong Cốc, trả tiền bằng tuyết luyện thành đá. Ta vẫn giữ một viên.'],
        ['me', 'Đệ tử của Hàn Băng Tiên Tử?'],
        ['thuong_hoi', 'Có lẽ. Gặp nàng ấy trên trời thì nói tiền thừa vẫn còn ở đây.']
    ],
    '8-2': [
        ['me', 'Sư phụ, con đi đây.'],
        ['narr', 'Gió thổi qua cành tùng. Một chiếc lá rơi lên mộ, ngươi không nhặt.'],
        ['to_dao', 'Đệ biết vì sao sư phụ trồng tùng không? Vì tùng không rụng lá. Người ghét quét sân.'],
        ['me', 'Vậy mà lá vẫn rơi.'],
        ['to_dao', 'Ừ. Có những thứ rơi dù không ai muốn. Đi đi, trước khi ta đổi ý mà níu đệ lại.']
    ],

    /* ----- Hồi II ----- */
    '9-0': [
        ['me', 'Chấm đen này là gì?'],
        ['tien_lai', 'Lão cũng có. Ai cũng có. Lão gọi nó là con mắt, vì đêm nào nó cũng nóng lên lúc đốc công điểm danh.'],
        ['tien_lai', 'Đừng cố khoét nó. Có người khoét rồi, sáng hôm sau nó mọc lại, kèm thêm một vòng xích.'],
        ['me', 'Thứ gì mọc lại được trên da thịt?'],
        ['tien_lai', 'Thứ không thuộc về con. Đi, ca đầu sắp điểm danh rồi.']
    ],
    '9-1': [
        ['me', 'Lão đào ba ngàn năm, lão có biết linh tủy đi đâu không?'],
        ['tien_lai', 'Lão chỉ biết nó vào ống. Đêm đêm áp tai vào vách hầm, nghe nó chảy lên, chảy mãi, không bao giờ dừng.'],
        ['tien_lai', 'Hồi mới xuống, lão nghĩ nó về Lăng Tiêu cho tiên quan uống rượu. Sau này lão không nghĩ nữa.'],
        ['me', 'Vì sao?'],
        ['tien_lai', 'Vì nghĩ thì đau, không nghĩ thì chỉ mỏi. Ở đây mỏi dễ chịu hơn đau.']
    ],
    '9-2': [
        ['me', 'Lão có xuống tầng dưới cùng không?'],
        ['tien_lai', 'Một lần. Không có ai, chỉ có lá. Lá màu tím, chẳng biết từ đâu bay xuống tận đáy đất.'],
        ['tien_lai', 'Lão nhặt một chiếc, giấu dưới lưỡi suốt ba trăm năm. Đốc công không bao giờ khám miệng tiên nô.'],
        ['narr', 'Lão há miệng. Trên lưỡi lão có một vệt tím nhạt, như vết một chiếc lá đã tan vào thịt.'],
        ['tien_lai', 'Từ đó lão đào mãi mà không chết. Lão nghĩ là nhờ nó. Con thấy có buồn cười không?']
    ],
    '10-0': [
        ['me', 'Tỷ muốn ta làm gì?'],
        ['van_nguyet', 'Làm thứ ta không làm được: đánh. Tán Tiên Minh có ba ngàn người, ai cũng giỏi trốn, không ai giỏi đánh.'],
        ['van_nguyet', 'Còn ngươi, mới lên đã giết đốc công. Kẻ như thế thường chết sớm, hoặc làm đổi cả một Giới.'],
        ['me', 'Ta chọn loại sau.'],
        ['van_nguyet', 'Ai cũng chọn loại sau. Theo ta, đừng ngẩng đầu, và đừng chết trước khi ta tính xong lời lãi.']
    ],
    '10-1': [
        ['me', 'Vậy ta gọi tên họ.'],
        ['narr', 'Ngươi hỏi tên từng người trên xe. Có người nhớ, có người không. Một bà lão chỉ nhớ tên con trai mình.'],
        ['van_nguyet', 'Ngươi làm vậy thì họ sẽ khóc. Khóc thì đi chậm.'],
        ['me', 'Đi chậm mà còn là người.'],
        ['van_nguyet', 'Được. Hôm nay ta đi chậm cùng ngươi.']
    ],
    '10-2': [
        ['me', 'Ống dẫn đi đâu?'],
        ['tien_thuong', 'Ta bán ống, không bán bản đồ. Nhưng có điều lạ: Thiên Đình đặt ống đồng, còn đầu ống bên kia lại không làm bằng đồng.'],
        ['me', 'Bằng gì?'],
        ['tien_thuong', 'Một thứ đen như mực, không ai đúc ra được. Thợ của ta nói nó ấm, như da một sinh vật đang ngủ.'],
        ['tien_thuong', 'Tin này ta tặng. Nếu ngươi chết vì nó thì đừng về đòi lại tiền.']
    ],
    '11-0': [
        ['me', 'Tỷ sợ không?'],
        ['van_nguyet', 'Sợ. Ba trăm năm ta tưởng kẻ thù ngồi trên ngai vàng. Giờ ngai vàng chỉ là cái phễu.'],
        ['van_nguyet', 'Đánh kẻ ngồi trên ngai thì cần quân. Đánh thứ ở đầu kia phễu thì ta không biết cần gì.'],
        ['me', 'Cần biết nó là gì trước đã.'],
        ['van_nguyet', 'Đúng. Đi dò đường ống. Mỗi đoạn ống lần theo được là một bước gần nó hơn.']
    ],
    '11-1': [
        ['me', 'Dấu ấn đó có cả ở phàm giới.'],
        ['van_nguyet', 'Ngươi nói gì?'],
        ['me', 'Trên thẻ đệ tử chết, trên sổ phi thăng của Thanh Vân. Thứ ở đầu ống có mặt từ trước khi ta phi thăng.'],
        ['van_nguyet', 'Vậy nó không chỉ hút Tiên Giới. Nó hút từ tận dưới cùng, qua cả phàm giới, qua cả người như ngươi.'],
        ['narr', 'Dấu ấn đen trên cổ tay ngươi nóng lên, như vừa nghe thấy tên mình.']
    ],
    '11-2': [
        ['me', 'Lão muốn xuống đó sao?'],
        ['tien_lai', 'Lão muốn được chết đàng hoàng. Có cầu, có canh, có người gọi tên lần cuối.'],
        ['me', 'Lão còn sống lâu mà.'],
        ['tien_lai', 'Ừ. Nhưng người già hay lo xa. Đây, sơ đồ các hầm. Hầm số chín thì đừng xuống một mình.'],
        ['narr', 'Trên sơ đồ, khe nứt ở hầm số chín được tô đen, kèm một dòng chữ run rẩy: "Lối đi của người chết."']
    ],
    '12-0': [
        ['me', 'Bảy ngày thì làm được gì?'],
        ['van_nguyet', 'Đủ để tới Dao Trì, đánh qua hộ vệ, nói chuyện với một người ba trăm năm không nói chuyện với ai.'],
        ['van_nguyet', 'Bà ấy chịu rút kiếm khí thì ngươi sống. Không chịu thì ngươi chết, và ta lại đi ăn mày thêm trăm năm.'],
        ['me', 'Nghe như tỷ sẽ nhớ ta.'],
        ['van_nguyet', 'Ta nhớ mọi khoản đầu tư lỗ. Đừng để mình thành một khoản như thế.']
    ],
    '12-1': [
        ['me', 'Bà từng thấy tử khí?'],
        ['dao_tri_mau', 'Một lần, rất lâu rồi. Ngươi sống qua lần rút kiếm khí thì ta kể.'],
        ['dao_tri_mau', 'Ngồi xuống. Kiếm khí này kén người, nó sẽ cắn ngươi trước khi chịu ra.'],
        ['me', 'Đau không?'],
        ['dao_tri_mau', 'Đau như bị nhắc lại mọi lần ngươi đã cúi đầu. Ai cúi đầu nhiều thì đau nhiều.']
    ],
    '12-2': [
        ['me', 'Bà còn yêu ông ấy không?'],
        ['dao_tri_mau', 'Ta yêu người đã thề đóng mỏ. Người ngồi trên ngai bây giờ, ta không biết là ai.'],
        ['dao_tri_mau', 'Có đêm ta nghe hắn nói mớ: "Bảy mươi ba, bảy mươi ba." Đó là số của hắn hồi còn ở mỏ.'],
        ['me', 'Ông ấy chưa bao giờ thật sự ra khỏi mỏ.'],
        ['dao_tri_mau', 'Phải. Hắn chỉ đổi chỗ đứng, từ dưới hầm lên trên ngai.']
    ],
    '13-0': [
        ['me', 'Đóng được Vô Quang thì đầu ống bên kia sẽ ra sao?'],
        ['van_nguyet', 'Đói. Mà thứ đói thì sẽ đi kiếm ăn. Ngươi phải sẵn sàng cho ngày nó quay lại nhìn chúng ta.'],
        ['me', 'Để nó nhìn. Ta cũng muốn thấy mặt nó.'],
        ['van_nguyet', 'Ngươi nói như kẻ chưa từng sợ gì. Ta thì sợ đủ cho cả hai.'],
        ['narr', 'Ngoài cửa sổ, Thiên Hà chảy chậm hơn mọi đêm, như đang chờ.']
    ],
    '13-1': [
        ['me', 'Hai người đó là ai?'],
        ['tien_lai', 'Không ai biết. Có người đồn số một là Tiên Đế đời đầu, số hai là kẻ không có mặt.'],
        ['tien_lai', 'Hồ này là nơi người ta đổ xác tiên nô. Linh khí trong xác tan vào hồ, hồ lại sáng.'],
        ['me', 'Vậy cả mỏ là một cái mồ.'],
        ['tien_lai', 'Phải. Ba ngàn năm, lão đào trên mồ của bạn mình mà không biết.']
    ],
    '13-2': [
        ['me', 'Ta nên nhận loại nào?'],
        ['van_nguyet', 'Loại cho ngươi tới gần ngai vàng nhất. Ở gần thì mới thấy kẻ ngồi trên đó sợ gì.'],
        ['tien_lai', 'Con vào cung thì nhớ ăn cho no. Nghe nói đồ ăn trên Lăng Tiêu toàn sương với hoa, không chắc bụng.'],
        ['me', 'Lão không đi cùng?'],
        ['tien_lai', 'Lão ở lại trồng cỏ trên cửa hầm. Ba ngàn năm đào xuống, giờ lão muốn trồng lên.']
    ],
    '14-0': [
        ['me', 'Sao lão kể ta nghe chuyện này?'],
        ['thai_bach', 'Vì ngươi là người đầu tiên vào triều mà nhìn chiếc ghế trống trước khi nhìn ngai vàng.'],
        ['thai_bach', 'Người có mắt như vậy hoặc sống rất lâu, hoặc chết rất sớm. Lão muốn đặt cược.'],
        ['me', 'Lão cược bên nào?'],
        ['thai_bach', 'Bên sống. Lão già rồi, đọc điếu văn mãi cũng chán.']
    ],
    '14-1': [
        ['me', 'Ngươi đã bao giờ hỏi sư phụ bản gốc ở đâu chưa?'],
        ['quang_thanh', 'Một lần. Người không trả lời, chỉ chép tiếp. Nhưng hôm đó tay người chậm hơn hôm trước.'],
        ['quang_thanh', 'Từ đó ta không hỏi nữa. Đệ tử làm sư phụ chậm tay là tội lớn.'],
        ['me', 'Có khi người cũng muốn biết.'],
        ['quang_thanh', 'Có khi. Ngươi đi đường của ngươi, ta không ngăn. Nhưng đừng bảo ta đi cùng.']
    ],
    '14-2': [
        ['me', 'Đêm mai cổng Nam đổi gác. Lão muốn ta làm gì?'],
        ['thai_bach', 'Lão nói gì đâu? Lão già, nói lẩm cẩm.'],
        ['thai_bach', 'Nhưng nếu có ai mở cổng Nam cho Tán Tiên Minh, lão sẽ đọc chiếu tuyên người đó phản nghịch, giọng thật to.'],
        ['me', 'Để cả Tiên Giới biết tên ta.'],
        ['thai_bach', 'Ngươi hiểu nhanh lắm. Tiên Quan giỏi thường chết trước tuổi. Cố mà kém đi một chút.']
    ],
    '15-0': [
        ['me', 'Bệ hạ từng thử giết sứ giả đó chưa?'],
        ['tien_de', 'Có. Năm thứ ba lên ngai. Ta đâm vào chiếc ghế, kiếm đi qua không khí rồi gãy.'],
        ['tien_de', 'Đêm đó thuế tăng gấp đôi, mỏ Vô Quang sập một tầng. Ba ngàn tiên nô chết vì một nhát kiếm của ta.'],
        ['me', 'Nên bệ hạ không thử nữa.'],
        ['tien_de', 'Nên ta thu thuế. Mỗi ngày một người chết vẫn ít hơn một đêm ba ngàn người. Ta tự nhủ thế suốt mấy vạn năm.']
    ],
    '15-1': [
        ['me', 'Họ có biết mình từng là tiên nô không?'],
        ['van_nguyet', 'Biết. Vì thế họ đánh dữ nhất. Kẻ sợ bị đẩy về hầm sẽ làm mọi thứ để không phải quay lại.'],
        ['me', 'Vậy ta cho họ một chỗ khác để đi.'],
        ['van_nguyet', 'Ngươi định nuôi cả quân của kẻ thù?'],
        ['me', 'Ta định để không ai phải làm quân của kẻ thù nữa.']
    ],
    '15-2': [
        ['me', 'Con sẽ không quên.'],
        ['dao_tri_mau', 'Ai cũng hứa vậy. Hắn cũng hứa với ta. Lời hứa không giữ được người, chỉ có người giữ được lời hứa.'],
        ['dao_tri_mau', 'Ngày ngươi lên Lăng Tiêu, nếu hắn hỏi ta có nói gì không, hãy nói ta vẫn pha trà mỗi sáng.'],
        ['me', 'Chỉ vậy thôi?'],
        ['dao_tri_mau', 'Chỉ vậy. Hắn sẽ hiểu. Chúng ta từng sống ba ngàn năm bằng những câu ngắn như thế.']
    ],
    '16-0': [
        ['me', 'Sứ giả đó tới xem ai là chủ mới.'],
        ['thai_bach', 'Lão cũng nghĩ thế. Ngài không ngồi ngai, nên nó không biết ghi tên ai.'],
        ['thai_bach', 'Ba vạn năm nay, đây là lần đầu sổ thuế Lăng Tiêu bỏ trống một dòng. Lão run tay khi phê.'],
        ['me', 'Bỏ trống thì sao?'],
        ['thai_bach', 'Thì thứ ở đầu kia phải tự đến lấy. Ngài nên lớn nhanh trước khi nó tới.']
    ],
    '16-1': [
        ['me', 'Còn bao nhiêu mắt?'],
        ['narr', '"Bảy," lão đáp. "Bảy ngàn năm nữa."'],
        ['narr', 'Ngươi rút kiếm chém một nhát. Sợi xích dưới giáp lão đứt làm đôi, rơi xuống nền đá.'],
        ['narr', 'Lão nhìn sợi xích rất lâu, rồi nhặt giáo đứng dậy, đi về phía Vạn Tiên Thành mà không ngoái lại.'],
        ['me', 'Ngai trống thì không ai trả lương. Nhưng cũng không ai phải đeo xích.']
    ],
    '16-2': [
        ['me', 'Nếu xác Bàn Cổ không ở đây thì ở đâu?'],
        ['dao_tri_mau', 'Có người nói ở rất xa, ngoài cả trời. Có người nói người chưa chết, chỉ đang ngủ ở nơi khai thiên.'],
        ['dao_tri_mau', 'Ngươi thử cảm nhận đi. Sáu nguồn trong thân ngươi, nguồn nào cũng có một nhịp đập rất chậm.'],
        ['me', 'Nhịp đó... không phải của ta.'],
        ['dao_tri_mau', 'Đó là nhịp mạch máu của Tiên Giới. Ai tới được Lục Nguyên cũng nghe thấy. Ta gọi nó là tim của người khai thiên.']
    ],
    '17-0': [
        ['me', 'Tỷ không lên tiếp sao?'],
        ['van_nguyet', 'Ta tới Đại La rồi đứng lại. Phải có người ở Tiên Giới cầm sổ, không thì ba năm sau lại có mỏ mới.'],
        ['van_nguyet', 'Ngươi thì cứ lên. Mỗi lần lên một tầng, viết cho ta một câu. Không cần dài.'],
        ['me', 'Viết gì?'],
        ['van_nguyet', 'Viết: "Ở đây không có mỏ." Ngày nào ngươi không viết được câu đó nữa, ta sẽ biết phải làm gì.']
    ],
    '17-1': [
        ['me', 'Thông Thiên muốn ta tới đó?'],
        ['trieu_minh', 'Sư phụ muốn có người uống rượu cùng. Năm vị kia không uống. Người bảo kẻ đánh được mà không giết ai là kẻ biết dừng tay.'],
        ['trieu_minh', 'Kẻ biết dừng tay thì uống không say quá. Sư phụ ghét uống với kẻ say quá.'],
        ['me', 'Ta chưa uống rượu bao giờ.'],
        ['trieu_minh', 'Ha! Càng tốt. Tới Bích Du đi, sư phụ sẽ dạy ngươi, bằng kiếm hoặc bằng chén.']
    ],
    '17-2': [
        ['me', 'Ngươi chép tên ta vào sổ thiên mệnh được không?'],
        ['quang_thanh', 'Ta thử rồi. Mực không bám. Tên ngươi viết xong thì tan như sương.'],
        ['quang_thanh', 'Sư phụ nhìn trang giấy đó rất lâu, rồi bảo ta cất đi, đừng để ai thấy.'],
        ['me', 'Vì sao?'],
        ['quang_thanh', 'Vì thứ duy nhất thiên mệnh không ghi được là thứ không bị trời đếm. Sư phụ sợ. Ta chưa từng thấy người sợ.']
    ],
    '18-0': [
        ['me', 'Ngươi từng tới đó?'],
        ['da_bao', 'Không. Ta chỉ tới được rìa Thánh Giới, đứng nhìn ra ngoài. Ngoài đó có một quán ăn, ta ngửi thấy mùi cơm.'],
        ['da_bao', 'Ta không bước ra. Ta là kẻ buôn, kẻ buôn không đi tới chỗ không ai trả tiền.'],
        ['me', 'Vậy sao ngươi bán cho ta?'],
        ['da_bao', 'Vì ngươi trông như kẻ sẽ bước ra. Ta muốn sau này có người kể cho ta nghe quán đó nấu món gì.']
    ],
    '18-1': [
        ['me', 'Trong bọn đạo tặc có ai sắp thành Thánh không?'],
        ['da_bao', 'Không. Kẻ cướp tử khí thì tử khí không chịu ở lại. Nó tan khỏi tay chúng như nước qua kẽ ngón.'],
        ['da_bao', 'Tử khí kén chủ, như đất kén hạt. Đó là thứ duy nhất ta không mua bán được.'],
        ['me', 'Nó chọn ta?'],
        ['da_bao', 'Nó chưa chọn. Nhưng nó không bỏ đi. Thế là đủ để ta lấy tiền.']
    ],
    '18-2': [
        ['me', 'Pháp sư nghĩ có người gác?'],
        ['huyen_do', 'Chỗ nào có thứ quý thì có người gác. Ta đứng ở Chuẩn Thánh tám vạn năm, chỉ dám nghĩ tới đó.'],
        ['huyen_do', 'Ngươi khác ta. Ngươi không có sư phụ ở trên để đổ lỗi, nên ngươi phải tự đi.'],
        ['me', 'Ta có sư phụ, người đã mất.'],
        ['huyen_do', 'Vậy người đó đã cho ngươi thứ quý nhất: không còn ai để ngươi cúi đầu. Đi đi, Chuẩn Thánh.']
    ],

    /* ----- Hồi III ----- */
    '19-1': [
        ['me', 'Họ không biết. Sáu người ngồi trên mà không biết dưới nhà có hầm.'],
        ['van_nguyet', 'Ngươi có giận họ không?'],
        ['me', 'Có. Nhưng giận không đóng được mỏ. Ta dọn hầm trước đã.'],
        ['tien_lai', 'Thánh Nhân dọn hầm, lão kể ra chắc chẳng ai tin. Cầm chổi thì cầm cho đúng, tay phải ở trên.'],
        ['narr', 'Lão sửa lại tay cầm chổi cho ngươi. Ngươi chợt thấy tư thế ấy quen như đã làm cả đời.']
    ],
    '19-2': [
        ['me', 'Ngài có muốn biết Đạo Tổ đi đâu không?'],
        ['thong_thien', 'Muốn. Nhưng mỗi lần ta hỏi, Nguyên Thủy bảo không có trong thiên mệnh, Thái Thanh im lặng, Nữ Oa hỏi ta ăn chưa.'],
        ['thong_thien', 'Còn Tiếp Dẫn với Chuẩn Đề thì xin thêm đất. Hỏi sáu người một câu, ta nhận về sáu câu không liên quan.'],
        ['me', 'Vậy ta sẽ tự tìm.'],
        ['thong_thien', 'Ha! Ta thích câu đó. Tìm thấy thì nhớ mang rượu về, Đạo Tổ nợ ta một chén từ hồi giảng đạo.']
    ],
    '20-0': [
        ['me', 'Còn ngươi, ngươi có muốn lên không?'],
        ['dong_tu', 'Ta là đồng tử quạt lò. Ta chỉ muốn sư phụ bảo dừng một lần.'],
        ['me', 'Ta sẽ nói với người.'],
        ['dong_tu', 'Đừng. Sư phụ bảo dừng thì ta không biết làm gì nữa. Quạt lò tám vạn năm, ta quên mất mình từng muốn gì.'],
        ['narr', 'Lửa trong lò Bát Quái bùng lên một chút, rồi lại cháy đều như tám vạn năm qua.']
    ],
    '20-1': [
        ['me', 'Ngài đợi Đạo Tổ, hay đợi một người mở đường?'],
        ['tien_de', 'Lúc đầu ta đợi Đạo Tổ. Sau đó đợi ai cũng được, miễn là người đi trước mà không quên quay lại.'],
        ['tien_de', 'Dao Trì vẫn pha trà mỗi sáng chứ?'],
        ['me', 'Bà ấy nói vẫn pha. Hai chén.'],
        ['tien_de', '(Im lặng rất lâu) ...Đi đi. Ở đây bụi nhiều, mắt ta cay.']
    ],
    '20-2': [
        ['me', 'Những sợi chỉ đó dẫn đi đâu?'],
        ['dong_tu', 'Ta không thấy được xa thế. Nhưng mỗi khi sư phụ nhắm mắt ngồi thiền, mấy sợi chỉ lại chùng xuống.'],
        ['dong_tu', 'Có lẽ thứ cầm đầu dây chỉ kéo khi các ngài mở mắt nhìn xuống.'],
        ['me', 'Vậy nó sợ Thánh Nhân nhìn thấy.'],
        ['dong_tu', 'Hoặc nó tiếc công giữ màn. Sư phụ bảo kẻ làm sổ sách ghét nhất là phải sửa sổ.']
    ],
    '21-1': [
        ['me', 'Vậy những Chuẩn Thánh già biết nhiều hơn Thánh?'],
        ['van_nguyet', 'Họ có nhiều thời gian hơn. Đứng chờ mấy vạn năm thì nghe được hết mọi tin đồn.'],
        ['van_nguyet', 'Có một lão kể từng thấy một người đi qua cửa Thánh mà không cần tử khí, tay cầm chổi, vai dính lá tím.'],
        ['me', 'Lão có hỏi tên người đó không?'],
        ['van_nguyet', 'Có. Người đó chỉ cười, bảo lá rụng thì quét, rồi đi lên trên. Lão kể xong thì khóc, không ai hiểu vì sao.']
    ],
    '21-2': [
        ['me', 'Kiếm của ngài khựng lại ở đâu?'],
        ['thong_thien', 'Ở một tấm màn đen ngay trên mí mắt chúng ta. Ta đã tưởng đó là bầu trời, cho tới hôm ngươi tới.'],
        ['thong_thien', 'Ngươi lên tới Đại Thánh đi. Lúc đó ta không nhường ngươi nữa, và ta sẽ dùng thanh kiếm còn lại.'],
        ['me', 'Ngài còn kiếm khác?'],
        ['thong_thien', 'Tru Tiên Kiếm. Ta giữ ba vạn năm chưa rút. Ngươi sẽ là lý do đầu tiên.']
    ],
    '22-0': [
        ['me', 'Giờ ngài thấy rồi. Ngài sẽ làm gì?'],
        ['thong_thien', 'Gọi năm người kia lại. Lần này không nghị chuyện đất, mà nghị chuyện xé màn.'],
        ['thong_thien', 'Nguyên Thủy sẽ phải chép lại thiên mệnh. Hắn sẽ ghét ta, nhưng hắn ghét ta quen rồi.'],
        ['me', 'Còn Thái Thanh?'],
        ['thong_thien', 'Đại sư huynh biết từ lâu, ta đoán vậy. Huynh ấy chỉ đợi một kẻ đủ ngu để làm thay. Ngươi là kẻ ngu đó, nhóc, ta khen đấy.']
    ],
    '22-1': [
        ['me', 'Chuẩn Đề có biết không?'],
        ['narr', 'Ngươi nghĩ tới nụ cười của Chuẩn Đề và nước mắt của Tiếp Dẫn. Một người diễn tin rằng khổ là có ích, một người khóc thật vì nghe được khổ.'],
        ['narr', 'Nhưng Tiếp Dẫn chưa từng nghe tiếng khổ của Tiên Giới. Vậy cũng chưa từng nghe tiếng khổ ngay trong Cực Lạc.'],
        ['me', 'Tấm màn che cả tai họ.'],
        ['narr', 'Ngươi gói mảnh sổ lại. Sẽ có lúc cả sáu vị phải cùng đọc nó.']
    ],
    '22-2': [
        ['me', 'Thanh Vân dạo này thế nào?'],
        ['to_dao', 'Có thêm ba mươi đệ tử. Có đứa giống đệ hồi mới vào, quên ăn, cãi sư tỷ.'],
        ['to_dao', 'Linh khí cũng dày lại một chút. Các trưởng lão bảo từ năm đệ đóng cái mỏ gì đó trên trời, đất bớt gầy.'],
        ['me', 'Tỷ biết chuyện mỏ?'],
        ['to_dao', 'Lão quét lá kể, kể như kể chuyện thời tiết. Thôi, khe truyền âm sắp đóng, nhớ xuống ăn cơm.']
    ],

    /* ----- Hồi IV ----- */
    '23-0': [
        ['me', 'Lão là ai mà biết nhiều thế?'],
        ['ly_khach', 'Một kẻ đi qua nhiều vụ quá. Đi nhiều thì biết nhiều, biết nhiều thì lười đi.'],
        ['ly_khach', 'Ngồi đi. Hôm nay có canh. Rau trồng trên xác vũ trụ thứ hai ngàn tám trăm, ngọt lắm.'],
        ['me', 'Ăn rau mọc trên xác một vũ trụ?'],
        ['ly_khach', 'Ở đây cái gì chẳng mọc trên xác. Ngươi ăn thì nó được nhớ thêm một bữa. Ăn đi.']
    ],
    '23-1': [
        ['me', 'Vậy Thần Đình biết ta đang ở đây?'],
        ['ly_khach', 'Biết. Nhưng nó chưa để ý. Ngươi mới chỉ là một con số tăng hơi nhanh.'],
        ['ly_khach', 'Lúc nào ngươi khiến nó phải sửa sổ, nó sẽ để ý. Lúc đó đừng ăn ở quán ta, ta không muốn bị đốt quán.'],
        ['me', 'Lão sợ à?'],
        ['ly_khach', 'Sợ thì ta đã không mở quán ở đây. Ta chỉ tiếc nồi canh.']
    ],
    '23-2': [
        ['nu_oa', '(Truyền âm) Con về chưa? Ta nghe có tiếng màn rách.'],
        ['me', 'Con chưa về. Ngoài này còn dài lắm.'],
        ['nu_oa', 'Vậy ăn trước rồi hẵng đi tiếp. Ngoài đó có ai nấu cho con không?'],
        ['me', 'Có một lữ khách mở quán.'],
        ['nu_oa', 'Tốt. Cảm ơn người đó giúp ta. Ta nợ người ấy một bữa, vì đã nuôi đứa con ta không với tới.']
    ],
    '24-0': [
        ['me', 'Vì sao lão nghĩ Đạo Tổ muốn nghỉ?'],
        ['ly_khach', 'Vì ta từng đứng trước người. Mắt người như mắt kẻ trực đêm quá lâu mà không ai tới thay ca.'],
        ['ly_khach', 'Người hỏi ta có muốn ngồi vào chỗ đó không. Ta bảo không, rồi lui ra mở quán.'],
        ['me', 'Lão có hối hận không?'],
        ['ly_khach', 'Mỗi khi nghĩ tới người còn ngồi đó, có. Nhưng ta nấu canh ngon. Ít ra có một việc làm đúng.']
    ],
    '24-1': [
        ['me', 'Có cách nào mở lại sổ cho họ không?'],
        ['ly_khach', 'Đốt cuốn sổ. Nhưng sổ nằm ở Thần Đình, và kẻ giữ nó mạnh hơn mọi thứ ngươi từng gặp.'],
        ['me', 'Vậy ta sẽ mạnh hơn.'],
        ['ly_khach', 'Kiếp nào ngươi cũng nói câu đó. Kiếp này ta mong ngươi giữ lời.'],
        ['narr', 'Tàn hồn buông tay áo ngươi, chậm rãi trôi về phía ngọn đèn, như vừa được hứa một điều đã chờ rất lâu.']
    ],
    '24-2': [
        ['me', 'Bà là mẹ của Nữ Oa?'],
        ['huyen_mau', 'Ta nặn Nữ Oa từ một giọt nước ở đây. Nó nặn người từ đất. Đứa nào cũng cố làm ra thứ gì đó để không cô đơn.'],
        ['huyen_mau', 'Ngươi cũng vậy. Ngươi đi xa thế này là để tìm một chỗ không ai đếm, rồi gọi người thân tới.'],
        ['me', 'Bà có muốn gặp lại Nữ Oa không?'],
        ['huyen_mau', 'Gặp thì nó sẽ hỏi ta ăn gì chưa, và ta không biết trả lời thế nào. Thôi, để nó nhớ ta như bây giờ.']
    ],
    '25-0': [
        ['me', 'Lão Mặc từng ở đây? Hay chỉ là ký ức?'],
        ['ly_khach', '(Truyền âm) Biển này không chứa ký ức của người khác, chỉ chứa ký ức của chính ngươi.'],
        ['me', 'Vậy người cầm chổi đó ở trong ký ức của ta.'],
        ['ly_khach', 'Hoặc chính là ngươi. Đừng soi lâu. Kẻ soi lâu sẽ không phân biệt được mình đang nhớ hay đang sống.'],
        ['narr', 'Ngươi vớt một chiếc lá tím lên. Nó không ướt, như chưa từng chạm vào nước.']
    ],
    '25-1': [
        ['me', 'Thứ lặp lại nhiều nhất là chiếc chổi.'],
        ['ly_khach', '(Truyền âm) Và chiếc ghế. Ghế, rồi chổi, rồi ghế, rồi chổi. Ngươi đi vòng tròn lâu rồi.'],
        ['me', 'Lần này ta muốn ra khỏi vòng.'],
        ['ly_khach', 'Muốn ra khỏi vòng thì phải biết vì sao lần trước mình quay lại. Chưa biết thì đừng vội.'],
        ['narr', 'Nghiệp Long cuối cùng chìm xuống. Mặt biển hiện lên đúng một hình ảnh: một đứa trẻ đang đợi ở cuối con đường.']
    ],
    '25-2': [
        ['me', 'Lão muốn ra ngoài đó?'],
        ['kiem_to', 'Muốn. Nhưng kiếm của ta chỉ chém được thứ có hình. Biển xám không có hình, ta không biết chém vào đâu.'],
        ['kiem_to', 'Ngươi thì khác. Ngươi còn một món nợ cơm, một lão quét lá chờ ở quê, một tỷ tỷ bảo ngươi xuống ăn.'],
        ['me', 'Những thứ đó giúp được gì?'],
        ['kiem_to', 'Ở chỗ không có hình, người ta chỉ đi được bằng những thứ mình nhớ. Kẻ không nhớ gì như ta thì chỉ đứng đây chém gió.']
    ],
    '26-0': [
        ['me', 'Kẻ đó có nói tên không?'],
        ['hoang_cong', 'Không. Hắn chỉ hỏi ta có lò không, để hong khô chiếc chổi bị ướt sương tím.'],
        ['hoang_cong', 'Ta cho hong. Hắn để lại một sợi tử khí làm tiền củi. Lò ta cháy từ đó tới giờ chưa tắt.'],
        ['me', 'Rồi hắn đi đâu?'],
        ['hoang_cong', 'Đi vào trong, về phía các vũ trụ nhỏ. Hắn bảo phải về kịp trước khi có đứa trẻ cần người dẫn đường.']
    ],
    '26-1': [
        ['me', 'Nếu ta làm vách trời không có dấu?'],
        ['hoang_cong', 'Thì thế giới của ngươi không ai đếm được, nhưng cũng không ai che chở. Không có trời thì không ai trả lời khi người ta cầu.'],
        ['me', 'Ta sẽ trả lời.'],
        ['hoang_cong', 'Câu đó Thiên Đạo cũng từng nói. Nhớ lấy, để sau này còn biết mình đã hứa gì.'],
        ['narr', 'Ngươi lột tấm da Hư Không Thú. Mặt trong không có dấu ấn nào. Dấu chỉ có ở mặt ngoài, nơi Thiên Đạo nhìn vào.']
    ],
    '26-2': [
        ['me', 'Nửa đó có còn nhớ mình là Bàn Cổ không?'],
        ['van_kiep', 'Nó chỉ nhớ một việc: chém. Chém hỗn độn ra để có trời đất. Giờ nó chém mọi thứ có trật tự, vì tưởng đó vẫn là hỗn độn.'],
        ['van_kiep', 'Nửa chết thì thành vũ trụ của ngươi: núi, sông, gió, Tiên Giới. Nửa sống thì ở ngoài kia, đói và giận.'],
        ['me', 'Một người khai thiên, rồi bị chính trời mình tạo ra đếm.'],
        ['van_kiep', 'Đúng. Sao của hắn sáng nhất vì cháy lâu nhất. Đừng để sao của ngươi cháy như vậy.']
    ],
    '27-0': [
        ['me', 'Làm sao để không đếm?'],
        ['ly_khach', 'Gọi tên. Một đám rêu có tên thì ngươi sẽ nhớ nó, không cần đếm nó.'],
        ['me', 'Vậy ta đặt tên cho đám rêu này.'],
        ['ly_khach', 'Đặt tên gì?'],
        ['me', 'Thanh Vân. Ở đó có người dạy ta rằng ở đâu cũng có sổ sách. Ta muốn có một nơi không có.']
    ],
    '27-1': [
        ['me', 'Nó biết rồi.'],
        ['narr', 'Từ hư không, ba Đạo Vệ khác bước ra, đứng yên nhìn ngươi. Không ai tấn công.'],
        ['narr', 'Một kẻ rút từ giáp ra một lệnh bài mới: "Thế giới mới. Hạn gặt: chưa định." Rồi cả ba lui lại.'],
        ['me', 'Chưa định?'],
        ['narr', 'Lần đầu tiên, Thần Đình không biết phải đếm thứ ngươi tạo ra như thế nào.']
    ],
    '27-2': [
        ['me', 'Vậy ai giao việc cho người?'],
        ['ly_khach', 'Ta không biết. Ta chỉ biết người mang tử khí vào đã giao nó cho Đạo Tổ, rồi đi lên phía trên.'],
        ['ly_khach', 'Có lẽ người đó cũng từng ngồi trong cỗ máy, rồi tìm được đường ra, và để Đạo Tổ ngồi thay.'],
        ['me', 'Nghe như một vòng không dứt.'],
        ['ly_khach', 'Đúng vậy. Và ngươi là kẻ đầu tiên ta thấy muốn bẻ vòng, thay vì nhận ca kế tiếp.']
    ],
    '28-0': [
        ['me', 'Ai gạch chữ "đóng"?'],
        ['narr', 'Cạnh cuốn sổ có một cây bút. Mực còn ướt, màu tím.'],
        ['narr', 'Trên mặt bàn có một vết lõm, như có ai đã ngồi đây cả vạn năm rồi vừa đứng dậy.'],
        ['me', 'Đạo Tổ đã đi rồi?'],
        ['narr', 'Ngọn đèn cuối hành lang lắc nhẹ. Ngươi nghe tiếng bước chân rất chậm, như đang đợi ngươi đuổi kịp.']
    ],
    '28-1': [
        ['me', 'Có bao nhiêu kẻ như thế?'],
        ['narr', 'Ngươi đếm theo số trên giáp. Số cuối cùng gần bằng số người trong sổ phi thăng Thanh Vân.'],
        ['narr', 'Có lẽ trong số đó có đồ đệ của Hàn Băng Tiên Tử, có cả những người mà chưởng môn đã vẽ dấu hỏi phía sau tên.'],
        ['me', 'Ta sẽ không đếm các ngươi. Ta sẽ nhớ.'],
        ['narr', 'Những bộ giáp rỗng lặng lẽ đổ xuống, như những người lính cuối cùng được cho về.']
    ],
    '28-2': [
        ['me', 'Mai ta đi. Nếu ta không về thì sao?'],
        ['ly_khach', 'Thì ta giữ chỗ cho ngươi. Ta giữ chỗ cho lão quét lá mấy vạn kiếp rồi, thêm một chỗ cũng được.'],
        ['ly_khach', 'Nhưng ngươi sẽ về. Kẻ ăn chịu bao giờ cũng về, vì sợ mang tiếng.'],
        ['me', 'Ta ăn chịu?'],
        ['ly_khach', 'Từ bữa đầu tiên. Ngủ đi. Sáng mai ta nấu cháo. Người sắp đánh nhau với trời nên ăn cháo, dễ tiêu.']
    ],

    /* ----- Hồi VI, VII ----- */
    '30-2': [
        ['me', 'Ngươi đã đi sau ai?'],
        ['thich_thien', 'Sau một kẻ ăn hết mọi thứ trước ta. Ta tưởng phải ăn nhiều hơn hắn thì mới vượt được.'],
        ['thich_thien', 'Giờ ta ngồi đây, đã thích hết vô lượng vũ trụ, mà vẫn chưa vượt được ai.'],
        ['me', 'Vì ngươi không quét đường cho ai.'],
        ['thich_thien', '...Có lẽ. Đi đi. Lần này ta sẽ nghe xem tiếng chổi kia quét cho ai.']
    ],
    '31-1': [
        ['me', 'Lạc Hà Tử. Con sẽ nhớ.'],
        ['tien_lai', 'Vậy đủ rồi. Một cái tên chỉ cần một người nhớ là sống.'],
        ['tien_lai', 'Con đi cao thế, có ai còn gọi con bằng tên không?'],
        ['me', 'Có một sư tỷ, một lão quét lá, và lão.'],
        ['tien_lai', 'Ba người. Nhiều hơn số người nhớ tên lão suốt ba ngàn năm. Đi đi, đừng để họ chờ lâu.']
    ],
    '31-2': [
        ['me', 'Vậy giờ lão đóng quán?'],
        ['ly_khach', 'Không. Sẽ có kẻ khác đi qua, đói, không có tiền. Quán mở cho kẻ đó.'],
        ['ly_khach', 'Ngươi biết không, ta mở quán không phải vì lão quét lá. Ta mở vì hồi trước ta cũng là kẻ đói đi qua.'],
        ['me', 'Ai nấu cho lão ăn?'],
        ['ly_khach', 'Một người cầm chổi. Lão ấy nấu dở lắm. Cho nên ta mới phải học nấu.']
    ],

    /* ----- Nhiệm vụ chính ----- */
    m01: [
        ['me', 'Bà Thủy thì sao?'],
        ['thuy_ba', 'Bà già rồi, ở lại trông mấy mái nhà còn lại. Con đi đi. Thanh Thủy không giữ được người có linh căn.'],
        ['thuy_ba', 'Đây, cầm lấy. Nắm cơm cuối cùng trong bếp. Đói thì ăn, đừng để dành.'],
        ['me', 'Con sẽ về.'],
        ['mac', 'Câu đó ai đi cũng nói. Nói rồi thì nhớ mà giữ.']
    ],
    m02: [
        ['me', 'Thưa chưởng môn, Lão Mặc là ai?'],
        ['chuong_mon', 'Ngày ta còn nhỏ, ông ấy đã già như bây giờ. Ông ấy chỉ đường cho ta lên núi, rồi không bao giờ hỏi thăm.'],
        ['chuong_mon', 'Tông môn này nợ ông ấy nhiều thứ không ghi trong sổ. Con được ông ấy gửi tới, vậy là ta cũng nợ con.'],
        ['to_dao', 'Chưởng môn chưa từng nói thế với ai. Đệ cẩn thận, người khác sẽ ghen đấy.'],
        ['lang_phong', '(Từ xa) Ghen? Với một đứa mới vào? Để xem nó trụ được mấy tháng.']
    ],
    m03: [
        ['chuong_mon', 'Lăng Phong thua thì sẽ tu khổ hơn. Con cũng phải khổ hơn nó, nếu không muốn bị bỏ lại.'],
        ['me', 'Đệ tử hiểu.'],
        ['chuong_mon', 'Không, con chưa hiểu. Thua một lần thì người ta mạnh lên. Thắng một lần thì người ta bắt đầu sợ mất.'],
        ['to_dao', 'Đi, ta dẫn đệ về động phủ nội môn. Linh khí ở đó dày gấp ba, nhưng trần thấp, đừng đứng thẳng quá.'],
        ['narr', 'Đêm ấy ngươi ngồi thiền đến sáng. Ngoài cửa, có ai đó luyện kiếm suốt đêm, tiếng kiếm sắc và giận.']
    ],
    m04: [
        ['chuong_mon', 'Ma Uyên đã cài người vào Thanh Vân từ trước khi con ra đời. Hắc Bào chỉ là một.'],
        ['me', 'Còn bao nhiêu người như hắn?'],
        ['chuong_mon', 'Ta mà biết thì đã không phải xé sổ. Từ nay con là chân truyền, mắt con phải mở to hơn mắt ta.'],
        ['to_dao', 'Đệ thấy chưởng môn mệt không? Mỗi lần người cười là một lần người giấu chuyện gì đó.'],
        ['me', 'Đệ thấy. Lần sau, đệ muốn người cười vì vui thật.']
    ],
    m05: [
        ['me', 'Lão dạy con luyện lửa được không?'],
        ['mac', 'Ta chỉ dạy quét lá. Nhưng quét lá cũng như luyện lửa: biết cái gì nên giữ lại, cái gì nên đưa đi.'],
        ['me', 'Lửa này nên giữ lại?'],
        ['mac', 'Giữ đúng bằng con cần. Phần thừa trả cho núi. Núi cũng phải ăn.'],
        ['narr', 'Lão quay đi. Ngọn lửa ba ngàn năm trong tay ngươi khẽ cúi xuống theo bước chân lão, như chào một người quen cũ.']
    ],
    m06: [
        ['to_dao', 'Chiếc lá đó người giữ suốt đời. Ta từng thấy người lấy ra ngắm vào những đêm không ngủ được.'],
        ['me', 'Lão Mặc cũng có một chiếc như thế.'],
        ['to_dao', 'Vậy là sư phụ từng gặp lão. Có những chuyện người mang theo xuống mộ.'],
        ['me', 'Đệ sẽ tìm ra chiếc lá này mọc ở đâu.'],
        ['to_dao', 'Tìm đi. Còn bây giờ thì giúp ta đưa người vào điện. Đệ tử đang nhìn, chúng ta không được khóc.']
    ],
    m07: [
        ['me', 'Bảy ngày trong băng, đêm nào con cũng thấy Lăng Phong.'],
        ['han_bang', 'Ngươi thấy hắn làm gì?'],
        ['me', 'Đứng ở miệng vực, quay đầu nhìn lên, như muốn nói gì đó.'],
        ['han_bang', 'Kẻ phản bội nào cũng nhìn lên một lần. Nếu sau này gặp hắn lần cuối, cứ để hắn nói.'],
        ['han_bang', 'Đó là thứ duy nhất ta không cho được đệ tử của ta: một lần được nói hết trước khi đi.']
    ],
    m08: [
        ['to_dao', 'Hắn còn sống. Hắn trốn xuống dưới đáy rồi.'],
        ['me', 'Để hắn đi.'],
        ['to_dao', 'Đệ không báo thù nữa?'],
        ['me', 'Hắn trốn khỏi thứ mà ta sắp đi gặp. Báo thù hắn lúc này cũng như giành nhau một chỗ trong hố.'],
        ['to_dao', 'Đệ lớn rồi. Ta không biết nên vui hay buồn. Về thôi, Thanh Vân còn phải sửa mái.']
    ],
    m09: [
        ['narr', 'Lão đưa ngươi một nắm cành khô buộc lại thành cây chổi nhỏ bằng bàn tay.'],
        ['mac', 'Cầm lấy. Trên kia không có lá để quét. Nhưng có lúc con cần nhớ mình từ đâu tới.'],
        ['me', 'Lão có lên không?'],
        ['mac', 'Ta lên rồi. Ta xuống rồi. Giờ ta ở đây quét lá. Con đi trước đi.'],
        ['narr', 'Ngươi quay lại thì lão đã đi xa, chỉ còn vệt chổi trên đá chạy thẳng về phía chân núi.']
    ],
    m10: [
        ['narr', 'Cột sáng siết lại. Ngươi thấy những vòng xích treo lơ lửng trong ánh sáng, đúng như lời Ma Quân.'],
        ['narr', 'Ngươi muốn quay lại, nhưng cột sáng không có đường xuống. Linh khí trong thân ngươi đã bị kéo đi trước.'],
        ['me', '(Khẽ) Tỷ, đệ thấy rồi. Trên này có xích.'],
        ['narr', 'Không ai nghe. Ánh sáng nuốt câu nói ấy, như đã nuốt mọi câu nói của ba ngàn người đi trước.'],
        ['narr', 'Rồi mọi thứ tối sầm.']
    ],
    m11: [
        ['me', 'Lão đi cùng con.'],
        ['tien_lai', 'Lão đi thì ai chỉ đường cho đứa tiếp theo? Năm nào cũng có kẻ mới xuống.'],
        ['tien_lai', 'Con đi đi. Ra được thì quay về. Không cần cứu lão, chỉ cần cho lão biết bên ngoài vẫn có trời.'],
        ['me', 'Con sẽ quay về đóng cửa mỏ.'],
        ['tien_lai', 'Ba ngàn năm, lão nghe câu đó mười hai lần. Nhưng lần này lão muốn tin thêm một lần nữa.']
    ],
    m12: [
        ['me', 'Tỷ không giống người hay sợ.'],
        ['van_nguyet', 'Ta sợ suốt ba trăm năm, chỉ là sợ có trật tự. Sợ có trật tự thì sống lâu.'],
        ['van_nguyet', 'Từ hôm nay ngươi là người của Tán Tiên Minh. Không lệnh bài, không lương, chỉ có một chỗ ngủ và một người lo cho ngươi chết muộn.'],
        ['me', 'Ai?'],
        ['van_nguyet', 'Ta. Đừng làm ta lỗ vốn.']
    ],
    m13: [
        ['me', 'Một sợi kiếm khí lạc đường mà đã như thế. Thánh Nhân mạnh tới đâu?'],
        ['van_nguyet', 'Không ai ở Tiên Giới biết. Chưa ai từng thấy Thánh Nhân ra tay. Hôm nay ngươi là người đầu tiên.'],
        ['me', 'Người đó bảo ta lớn nhanh lên rồi tới tìm.'],
        ['van_nguyet', 'Thánh Nhân để ý tới một con kiến. Hoặc là phúc lớn, hoặc là họa lớn. Ta không có thời gian đoán, ngươi đang chảy máu.'],
        ['narr', 'Vết kiếm trên ngực ngươi sáng lên, mỗi nhịp tim lại đau thêm một chút.']
    ],
    m14: [
        ['me', 'Khế ước đó còn hiệu lực không?'],
        ['dao_tri_mau', 'Còn. Cự Linh chết thì khế không chết. Nó nằm trong ngực Hạo Thiên, như một cái đinh.'],
        ['dao_tri_mau', 'Muốn rút đinh thì phải rút cả người. Ngươi chuẩn bị chưa?'],
        ['me', 'Chưa. Nhưng ta sẽ chuẩn bị.'],
        ['dao_tri_mau', 'Tốt. Người nói "rồi" thường nói dối. Người nói "sẽ" thì còn đang tính đường.']
    ],
    m15: [
        ['tien_lai', 'Đèn hầm tắt rồi. Ba ngàn năm lão mới thấy bóng tối thật. Hóa ra bóng tối không đáng sợ bằng đèn mỏ.'],
        ['me', 'Lão muốn đi đâu?'],
        ['tien_lai', 'Đi tắm. Ba ngàn năm lão chưa được tắm. Rồi tính sau.'],
        ['van_nguyet', 'Mọi người ra khỏi mỏ hết rồi. Thiên Đình sẽ trả đũa, có thể bằng một đạo quân, có thể bằng một tờ chiếu.'],
        ['me', 'Để họ đến. Lần này họ phải đi qua ta.']
    ],
    m16: [
        ['me', 'Tỷ giữ được không?'],
        ['van_nguyet', 'Ba ngàn tán tiên, mười vạn tiên nô, và một bà già pha trà ở Dao Trì đang nhìn. Giữ được.'],
        ['tien_lai', 'Con đi đi! Cổng này lão đứng gác trong mơ ba ngàn năm rồi!'],
        ['narr', 'Ngươi bước qua Nam Thiên Môn. Con đường lên Lăng Tiêu lát ngọc, viên ngọc nào cũng khắc một con số.'],
        ['narr', 'Ngươi đi qua chúng như đi qua những ngôi mộ.']
    ],
    m17: [
        ['van_nguyet', 'Ngươi... vừa làm phân thân Thánh Nhân khựng lại.'],
        ['me', 'Không phải ta. Là câu hỏi.'],
        ['narr', 'Ngươi nhặt trang giấy trắng. Ở góc dưới có một chấm đen nhỏ, giống hệt dấu trên cổ tay ngươi.'],
        ['van_nguyet', 'Lên tới Chuẩn Thánh, gom đủ tử khí. Ngài ấy nói vậy. Vậy là ngươi đã có đường đi.'],
        ['me', 'Và có người đang chờ ở cuối đường.']
    ],
    m17a: [
        ['me', 'Vì sao bà không nghe lại được?'],
        ['dao_tri_mau', 'Vì ta ngồi xuống bên ao này rồi ở lại. Kẻ ở lại không nghe được gió từ xa.'],
        ['dao_tri_mau', 'Ngươi đừng ở lại. Gió đó gọi ngươi thì đi theo nó.'],
        ['me', 'Nó đến từ đâu?'],
        ['dao_tri_mau', 'Từ nơi mọc ra cánh sen ta cho ngươi. Ngươi còn giữ chứ? Vậy thì nó sẽ dẫn đường.']
    ],
    m17b: [
        ['me', 'Đứng trên bờ dòng thời gian là thế nào?'],
        ['huyen_do', 'Là kẻ thời gian không lấy được gì. Không phải Đại La, mà cao hơn Đại La rất nhiều.'],
        ['huyen_do', 'Sư phụ ta không nói, nhưng ta từng thấy người nhìn về phía phàm giới, nơi có một sân lá, rồi lắc đầu.'],
        ['me', 'Thái Thanh biết Lão Mặc?'],
        ['huyen_do', 'Sư phụ biết mọi thứ và chọn không làm gì. Có lẽ đó là cách người kính trọng một ai đó.']
    ],
    m17c: [
        ['narr', 'Cung điện tím hiện ra sau ngai vàng. Chín bậc thềm, mỗi bậc là một luồng mây tím.'],
        ['van_nguyet', '(Từ dưới) Đi đi! Nhớ viết cho ta một câu!'],
        ['me', 'Ở đây không có mỏ.'],
        ['van_nguyet', 'Chưa tới mà đã viết! Thôi được, ta tin trước, kiểm tra sau.'],
        ['narr', 'Ngươi bước lên bậc thềm đầu tiên. Từ đây, ngươi không còn là tiên nữa.']
    ],
    m18: [
        ['me', 'Cái ghế thứ bảy... ngồi lên như ngồi trên miệng giếng.'],
        ['van_nguyet', 'Ngươi có thể từ chối.'],
        ['me', 'Từ chối thì trên đó không ai thấy cái mỏ. Ta sẽ ngồi, cho tới khi cả sáu người phải nhìn.'],
        ['tien_lai', 'Thánh Nhân về ăn cơm với tiên nô. Lão phải kể cho đám trẻ trong mỏ mới được.'],
        ['van_nguyet', 'Ăn đi. Thánh Nhân hay không thì cũng phải ăn. Đó là luật duy nhất ta còn tin.']
    ],
    m19: [
        ['dong_tu', '(Rất khẽ) Sư phụ vừa nói nhiều nhất trong tám vạn năm.'],
        ['me', 'Thái Cực Đồ này có xé được tấm màn không?'],
        ['thai_thanh', 'Không. Nó chỉ cho ngươi biết đâu là trước, đâu là sau. Tấm màn kia không có trước sau, chỉ có đếm.'],
        ['thai_thanh', 'Đi hỏi Nguyên Thủy. Hắn chép thiên mệnh, hắn sẽ thấy chỗ trống.'],
        ['narr', 'Thái Thanh nhắm mắt lại. Đồng tử vẫn quạt lò, nhưng lần này nhanh hơn một nhịp.']
    ],
    m20: [
        ['me', 'Ngài cần bao lâu?'],
        ['nguyen_thuy', 'Ba vạn năm, nếu chép đúng phép. Một năm, nếu ta phá phép.'],
        ['me', 'Ngài chọn cách nào?'],
        ['nguyen_thuy', 'Ta... sẽ chép một năm. Đừng nói với Quảng Thành Tử. Hắn sẽ ngất.'],
        ['narr', 'Lần đầu tiên ngươi thấy Nguyên Thủy Thiên Tôn cầm bút mà không ngồi thẳng.']
    ],
    m21: [
        ['me', 'Thứ đó thấy ta.'],
        ['nu_oa', 'Con lùi lại. Có những thứ mình nhìn lâu thì chúng sẽ nhớ mặt mình.'],
        ['me', 'Để nó nhớ. Ta cũng muốn nó nhớ.'],
        ['nu_oa', 'Con giống hệt đứa trẻ đầu tiên ta nặn, cứng đầu và hay đói. Thôi, về ăn đi, Thánh Giới đã rộng ra rồi.'],
        ['narr', 'Những Chuẩn Thánh dưới Tiên Giới lần đầu được bước qua bậc thềm tím. Ngươi nghe họ khóc như những tiên nô ngày ra khỏi mỏ.']
    ],
    m22: [
        ['me', 'Vậy ngài ngồi im là để trốn?'],
        ['thai_thanh', 'Là để chờ. Chờ một kẻ không cần trốn.'],
        ['thai_thanh', 'Thông Thiên không ngồi im được. Nữ Oa thương quá nên không dám nhìn thẳng. Nguyên Thủy tin sổ. Hai người Tây Phương lo đất.'],
        ['me', 'Còn ta?'],
        ['thai_thanh', 'Ngươi không có trong sổ. Đi đi. Lần đầu ta nói nhiều thế này, mệt rồi.']
    ],
    m23: [
        ['me', 'Các vị không đi cùng ta?'],
        ['chuan_de', 'Thánh Giới cần người giữ. Ngoài kia thấy có người đi ra, Thiên Ma sẽ tìm đường vào. Chúng ta là cửa.'],
        ['tiep_dan', 'Giờ bần đạo nghe thấy tiếng khổ của cả Tiên Giới. Nhiều lắm, nhưng bần đạo mừng. Nghe được thì mới đỡ được.'],
        ['nu_oa', '(Từ xa) Con mang đồ ăn theo chưa?'],
        ['narr', 'Ngươi bước xuống dưới đài sen, vào bóng tối không có sao. Phía sau, sáu đạo Thánh quang vẫn sáng, như đèn ai để ngoài hiên.']
    ],
    m24: [
        ['me', 'Lão tên gì?'],
        ['ly_khach', 'Lữ khách. Gọi vậy là đủ. Ở đây có tên thì sẽ bị ghi sổ.'],
        ['ly_khach', 'Ngươi cũng nên giấu tên đi. Thần Đình đếm bằng số, nhưng tìm người bằng tên.'],
        ['me', 'Ta không giấu. Ta muốn nó tìm.'],
        ['ly_khach', 'Hừ. Kiếp nào cũng thế. Ăn đi, cơm của kẻ không giấu tên ta không lấy tiền, vì sợ không kịp đòi.']
    ],
    m25: [
        ['me', 'Ta đã sống bao nhiêu kiếp?'],
        ['ly_khach', 'Đủ để Thiên Đạo nhớ mặt. Mỗi kiếp ngươi đi xa hơn một chút, rồi nó kéo ngươi về.'],
        ['ly_khach', 'Nhưng lần này khác. Lần này ngươi biết nó kéo. Biết rồi thì có thể không chịu.'],
        ['me', 'Làm sao để không chịu?'],
        ['ly_khach', 'Phải thắng chính mình của những kiếp trước. Chúng sẽ tìm tới ngươi. Chúng không cam tâm.']
    ],
    m26: [
        ['me', 'Đừng ngồi... vậy thì làm gì?'],
        ['narr', 'Không ai trả lời. Luân Hồi Hải lặng như chưa từng có ai bước lên từ đó.'],
        ['ly_khach', '(Truyền âm) Tâm Ma của ngươi nói thật. Kẻ ngồi ngai thì cô đơn. Kẻ cầm chổi thì đợi.'],
        ['me', 'Ta muốn làm cách thứ ba.'],
        ['ly_khach', 'Cách thứ ba à? Chưa ai từng làm. Vậy thì đi tìm xem nó là gì.']
    ],
    m27: [
        ['hoang_cong', 'Trời của ngươi nhỏ quá, nhưng không có dấu. Ta làm lò cả đời, chưa thấy lò nào không có dấu.'],
        ['me', 'Nó sẽ lớn.'],
        ['hoang_cong', 'Ừ. Thứ gì không bị đếm cũng lớn theo cách riêng.'],
        ['ly_khach', 'Giờ Thần Đình phải tìm tới ngươi. Ngươi đã có thứ nó không cho phép tồn tại.'],
        ['me', 'Vậy ta tới đó trước.']
    ],
    m28: [
        ['me', 'Đạo Tổ.'],
        ['narr', 'Ngọn đèn ở cuối hành lang sáng lên, như vừa có người vặn bấc.'],
        ['narr', 'Ngươi nhớ tới tấm bồ đoàn bụi phủ một tấc ở Tử Tiêu Cung, nhớ tới Hạo Thiên ngồi cuối hàng.'],
        ['me', 'Bao nhiêu người đang chờ ngài, ngài có biết không?'],
        ['narr', 'Không có tiếng trả lời. Chỉ có tiếng lật sổ rất chậm từ cuối hành lang vọng lại.']
    ],
    m29: [
        ['me', 'Người đó là ai?'],
        ['dao_to', 'Ta không biết tên. Người ấy đến, ngồi cạnh ta một đêm, cùng ta lật sổ. Sáng ra để lại tử khí và một chiếc chổi.'],
        ['dao_to', 'Ta giữ chiếc chổi rất lâu. Rồi một ngày nó biến mất. Ta đoán người ấy cần nó hơn ta.'],
        ['me', 'Ngài có muốn đi cùng ta không?'],
        ['dao_to', 'Ta ngồi đây lâu quá, chân không còn biết đi. Đi đi, con. Nhớ để cửa mở cho kẻ đến sau.']
    ],
    m30: [
        ['me', 'Vậy tử khí ở Hải Tâm?'],
        ['vo_danh', 'Ở bên kia Hải Tâm. Nơi không ai trong sáu chúng ta bước tới.'],
        ['me', 'Vì sao?'],
        ['vo_danh', 'Vì sáu người đã ngồi xuống đây và đặt tên cho mình. Kẻ có tên thì không qua được mắt bão.'],
        ['vo_danh', 'Ngươi thì chưa có tên ở Hỗn Độn. Có lẽ ngươi qua được. Đến am đi, ta kể tiếp.']
    ],
    m31: [
        ['me', 'Bàn Cổ cũng từng đứng ở Hỗn Độn này?'],
        ['vong_ky', 'Hắn đi qua đây, vác rìu, không ngồi xuống am nào. Hắn bảo phải đi tìm chỗ tử khí mọc để chém ra một trời.'],
        ['vong_ky', 'Hắn tới được gần Hải Tâm, chém một nhát, xẻ ra vũ trụ của ngươi. Rồi hắn quay lại chém nữa, chém mãi, tới khi rìu gãy.'],
        ['me', 'Sao hắn không dừng?'],
        ['vong_ky', 'Vì kẻ khai thiên quên mất mình khai thiên để làm gì. Ngươi thì đừng quên.']
    ],
    m32: [
        ['me', 'Ngươi có muốn đi cùng ta?'],
        ['vong_ky', 'Ta có tên rồi. Ta đã dừng.'],
        ['vong_ky', 'Nhưng ta sẽ ngồi đây giữ am. Ngươi quay lại thì sẽ có trà, có chỗ ngồi, có người hỏi đạo của ngươi tên gì.'],
        ['me', 'Đến lúc đó ta sẽ có câu trả lời.'],
        ['vong_ky', 'Không cần. Chỉ cần ngươi quay lại.']
    ],
    m35: [
        ['tien_de', 'Ta... đứng dậy được rồi.'],
        ['thai_thanh', '(Mở mắt) Hạo Thiên. Lâu rồi.'],
        ['tien_de', 'Đại Thánh. Ta ngồi cuối hàng ba vạn năm, ngài có thấy ta không?'],
        ['thai_thanh', 'Thấy. Ta chờ ngươi tự đứng lên. Giờ thì lên hàng trước mà ngồi.'],
        ['narr', 'Ở Dao Trì, Thánh Mẫu vừa pha xong hai chén trà, và lần đầu tiên bà ngẩng lên nhìn về phía Thánh Giới.']
    ]
};

Object.entries(STORY_LORE_MORE).forEach(([key, lines]) => {
    const quest = QUEST_INDEX[/^\d/.test(key) ? `mc${key.replace('-', '_')}` : key];
    if (!quest) throw new Error(`STORY_LORE_MORE: không có nhiệm vụ ${key}`);
    lines.forEach(([who]) => {
        if (who !== 'me' && who !== 'narr' && !NPCS[who]) throw new Error(`STORY_LORE_MORE: ${key} dùng NPC lạ ${who}`);
    });
    const step = [...quest.steps].reverse().find(s => s.say);
    step.say = [...step.say, ...lines];
    if (step.ruled?.say) step.ruled.say = [...step.ruled.say, ...lines];
});
