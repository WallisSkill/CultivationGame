/* ===========================================================
   LỜI KỂ THÊM CHO NHIỆM VỤ PHỤ (Phàm Giới, Tiên Giới, vùng đất)
   Cùng cách chọn bước như STORY_LORE_STEPS: "go:địa điểm", "boss:id", "hunt:địa điểm", "gather:địa điểm".
=========================================================== */
const SIDE_LORE_A = {
    /* ----- Phàm Giới và việc vặt dọc đường ----- */
    s_thuoc: {
        'gather:vu_moc_lam': [
            ['narr', 'Linh thảo ở Vạn Mộc Lâm mọc dưới gốc những cây đã đổ, nơi đất còn giữ được hơi ẩm. Phải bới qua ba lớp lá mới thấy một cây.'],
            ['me', 'Thủy Bà dặn mười bó. Chỗ này mới được sáu.'],
            ['narr', 'Một con sóc đỏ ngồi trên cành nhìn xuống. Mỗi lần ngươi định nhổ cả rễ, nó lại kêu chíp một tiếng.'],
            ['me', 'Biết rồi. Chừa rễ cho năm sau.'],
            ['narr', 'Con sóc im. Bốn bó còn lại mọc ở bờ suối, đúng chỗ nó nhảy tới.']
        ],
        'go:thanh_thuy': [
            ['me', 'Trong làng có ai ốm à?'],
            ['thuy_ba', 'Thằng cháu nhà họ Đào sốt ba ngày. Thầy thuốc trên huyện đòi một lạng bạc mới chịu xuống núi, cả xóm gom mãi chưa đủ.'],
            ['me', 'Vậy bà giữ bạc lại mà mời thầy.'],
            ['thuy_ba', 'Có thảo dược rồi thì khỏi mời ai. Bạc là tiền công của làng, không nhận thì ta mất mặt với cả xóm.'],
            ['narr', 'Ngoài sân đình, Lão Mặc dừng chổi, nhìn gói thảo dược một lúc rồi gật đầu, như người kiểm hàng.'],
            ['mac', 'Chừa rễ là được. Rừng nhớ ai nhổ, cũng nhớ ai chừa.']
        ]
    },
    s_khoi: {
        'hunt:thanh_van': [
            ['me', 'Tỷ giữ nó từ hồi Trúc Cơ mà cho đệ dễ vậy?'],
            ['to_dao', 'Đồ nằm trong rương thì chỉ biết nhớ chủ. Đeo lên người đệ, nó còn có việc để làm.'],
            ['me', 'Khôi lỗi này đánh như người thật. Ai đúc ra?'],
            ['to_dao', 'Thạch Lão, theo thế kiếm của mấy sư huynh đã phi thăng. Con thứ ba là Lý sư huynh, hồi xưa cũng hay chém hụt bên trái như thế.'],
            ['me', 'Lý sư huynh có gửi thư về không?'],
            ['to_dao', 'Chưa ai gửi về cả. Trên đó bận, chắc vậy.'],
            ['narr', 'Tô Thanh Dao cúi lau thanh kiếm gỗ, lau rất lâu, dù kiếm chẳng dính gì.'],
            ['to_dao', 'Mai luyện tiếp. Đệ đánh còn nặng tay, khôi lỗi gãy nữa thì Thạch Lão lại mắng ta chứ không mắng đệ.']
        ]
    },
    s_bang: {
        'hunt:bang_phong': [
            ['me', 'Đệ tử của tiên tử sao lại thành băng hồn?'],
            ['han_bang', 'Họ đi lên Phi Thăng Đài, từng người một. Vài trăm năm sau, hồn họ trôi về cốc này, lạnh hơn tuyết.'],
            ['me', 'Người đã phi thăng sao lại chết?'],
            ['han_bang', 'Ta hỏi băng câu đó ba trăm năm. Băng chỉ giữ, không trả lời.'],
            ['narr', 'Băng hồn cuối cùng tan ra. Trước khi mất hẳn, nó giơ cổ tay lên cho ngươi xem: một vết đen nhỏ, vuông vức như con dấu.'],
            ['han_bang', 'Đứa nào về cũng mang vết đó. Tên của chúng là ta đặt. Còn vết kia ai đặt, ta không biết.'],
            ['me', 'Tiên tử không muốn đi lên tìm hiểu?'],
            ['han_bang', 'Ta ở lại để còn người tiễn. Nếu ngươi lên, hãy nhìn cổ tay kẻ đón ngươi trước khi nhìn mặt hắn.']
        ]
    },
    s_thu: {
        'gather:thien_ha': [
            ['me', 'Tỷ nghe được đệ sao?'],
            ['to_dao', 'Nghe được nửa câu. Nửa kia lẫn với tiếng gì như sóng.'],
            ['me', 'Đệ đang đứng cạnh một dòng sông sao. Ở đây sông chảy trên trời.'],
            ['to_dao', 'Dưới này trời vẫn mưa như cũ. Lò của Thạch Lão vẫn đỏ. Mấy đứa nhập môn năm nay hỏi đệ là ai, ta bảo là kẻ hay làm gãy khôi lỗi.'],
            ['me', 'Tỷ kể xấu đệ.'],
            ['to_dao', 'Kể đúng. Ta chỉ không kể là đệ đi rồi.'],
            ['narr', 'Khe truyền âm rung mạnh, tiếng nói đứt quãng. Câu cuối ngươi chỉ nghe được hai chữ: "viết thư".'],
            ['me', 'Đệ sẽ viết. Viết đủ trăm lá rồi mang về một lượt.']
        ]
    },
    s_cho: {
        'hunt:da_bao': [
            ['me', 'Bọn đạo tặc trộm của lão thứ gì mà lão trả hẳn một chiếc nhẫn?'],
            ['da_bao', 'Một túi Hồng Mông Tử Khí. Gọi thế cho sang, thật ra là bụi.'],
            ['me', 'Bụi mà cả Thánh Giới tranh nhau?'],
            ['da_bao', 'Bụi của một chỗ rất xa. Ở đó nó là một khối liền, trôi tới đây thì vụn ra. Ta chỉ gom lại.'],
            ['me', 'Chỗ xa đó tên gì?'],
            ['da_bao', 'Câu hỏi thì miễn phí, câu trả lời thì tính tiền. Ngươi chưa đủ tiền.'],
            ['narr', 'Đa Bảo mở túi, nhúm một ít bụi tím lên ngửi, rồi nhăn mặt.'],
            ['da_bao', 'Bọn này pha thêm tro bếp cho nặng túi. Trộm mà còn gian, Thánh Giới hết thuốc chữa.']
        ]
    },
    s_quan: {
        'hunt:khai_thien': [
            ['me', 'Hư Không Thú cũng ăn được à?'],
            ['ly_khach', 'Ở Hoang Nguyên, thứ gì chưa có luật thì đều ăn được. Có luật rồi thì phải hỏi luật trước.'],
            ['me', 'Thịt này vị gì vậy?'],
            ['ly_khach', 'Vị của thứ chưa quyết định mình là gì. Ăn chậm thì giống thịt gà, ăn nhanh thì giống đá.'],
            ['narr', 'Lữ Khách thái thịt bằng một con dao mỏng như lá lúa. Mỗi lát nằm trên thớt lại đổi màu một chút.'],
            ['ly_khach', 'Hồi mới mở quán, ta nấu cho ba khách. Giờ có hôm ba trăm. Kẻ bỏ đi tới vùng này ngày một đông, mà chẳng ai mang theo đồ ăn.'],
            ['me', 'Họ bỏ đi khỏi cái gì?'],
            ['ly_khach', 'Mỗi người một thứ. Quán ta có một luật: không hỏi chuyện khách khi khách đang ăn. Ngươi cũng đang ăn.']
        ]
    },

    /* ----- Tiên Giới: người quen trên đường ----- */
    tp_yeu_ha: {
        'hunt:yeu_ha': [
            ['me', 'Những lần trước không đủ người sao?'],
            ['yeu_ha_chu', 'Lần nào cũng thiếu. Hà Giao một hai người, giám binh một hai người. Có lần chính người trên thuyền đẩy nhau xuống cho nhẹ.'],
            ['me', 'Ngươi giữ bến này bao lâu rồi?'],
            ['yeu_ha_chu', 'Từ hồi ta còn là một con cá chép. Yêu Hà nuôi ta lớn, giờ ta trả nợ sông bằng cách đưa người qua.'],
            ['narr', 'Ông già ngồi mũi thuyền vẫy tay về phía bờ, miệng nói một câu bằng giọng quê nặng trịch. Sóng nuốt mất lời, chỉ còn cái vẫy tay.'],
            ['yeu_ha_chu', 'Ông ấy cảm ơn. Người từ mỏ ra đều cảm ơn kiểu đó, bằng tiếng của nơi họ lớn lên, như sợ quên mất.']
        ],
        'gather:yeu_ha': [
            ['yeu_ha_chu', 'Khéo tay. Dòng xoáy này ta nắn ba trăm năm không yên, ngươi nắn một canh giờ.'],
            ['me', 'Sao khúc quanh này lại xoáy?'],
            ['yeu_ha_chu', 'Đáy sông có một đường ống cũ của Thiên Đình, gãy từ đời nào. Nước lọt vào ống, ống hút nước, thế là xoáy.'],
            ['me', 'Ống đó dẫn gì?'],
            ['yeu_ha_chu', 'Linh khí từ các mỏ. Giám binh bảo ống chạy ra ngoài. Ngoài của cái gì thì không giám binh nào biết, mà cũng chẳng ai dám hỏi.'],
            ['narr', 'Sau đuôi thuyền, hai cái bóng dài lặng lẽ bơi theo, vây lưng rạch một vệt trên mặt nước vừa phẳng.']
        ]
    },
    tp_bat_hoang: {
        'hunt:bat_hoang': [
            ['me', 'Đấu nô ở đây đều từ mỏ ra?'],
            ['dau_no', 'Gần hết. Thoát xích rồi thì không có nghề, chỉ còn cái thân. Đem thân ra đánh nhau, để thân nhớ nó là của mình.'],
            ['me', 'Tên tiên quan kia còn quay lại không?'],
            ['dau_no', 'Sẽ quay lại, mang theo đấu nô đắt hơn. Tiên quan thua một lần thì nhớ cả trăm năm. Được cái trăm năm ở đây trôi nhanh.'],
            ['narr', 'Đám đấu nô ngồi quanh đài băng bó cho nhau. Một gã cụt tay đang dạy một đứa trẻ cách nắm đấm sao cho không gãy ngón.'],
            ['dau_no', 'Đứa nhỏ đó là con của một đấu nô chết năm ngoái. Ở Bát Hoang không có nhà, đài này là nhà. Ngươi vừa giữ được nhà cho nó.']
        ],
        'gather:bat_hoang': [
            ['me', 'Thiết Ngưu học cách đánh khớp ở đâu?'],
            ['dau_no', 'Trong mỏ. Xẻng gãy ở khớp nhiều hơn ở lưỡi. Người cũng vậy, đánh vào chỗ nối là xong.'],
            ['me', 'Ông từng gãy chỗ nào?'],
            ['dau_no', 'Gối trái, vai phải, ba cái xương sườn. Gãy rồi thì lành, lành lệch một chút thì đánh lệch một chút, đối thủ càng khó đoán.'],
            ['narr', 'Thiết Ngưu tung một quyền chậm như rùa. Ngươi lùi nửa bước, gạt vào khuỷu tay ông. Ông cười, lộ hàm răng sứt.'],
            ['dau_no', 'Được. Linh căn kém thì phải khôn. Khôn thì thua ít.']
        ]
    },
    tp_hac_thi: {
        'hunt:hac_thi': [
            ['me', 'Đứa nhỏ từ đâu tới?'],
            ['hac_chu', 'Từ Phàm Giới, theo lời nó. Mới bảy tuổi, chưa tu ngày nào. Bọn buôn người dắt nó lên bằng một lối mà đến ta còn chưa biết.'],
            ['me', 'Chúng mua trẻ con dưới đó làm gì?'],
            ['hac_chu', 'Linh căn tốt thì bán cho mỏ, mỏ cần những đứa thở khỏe. Linh căn kém thì bán làm người hầu cho tiên quan. Đứa nào cũng có giá, trừ ở chợ ta.'],
            ['narr', 'Mạc Tam Nương thắp thêm một ngọn đèn âm. Đứa nhỏ ngủ gục trên đống vải, một tay vẫn nắm chặt vạt áo bà.'],
            ['hac_chu', 'Hắc Thị mở ra cho kẻ không giấy tờ có chỗ mua bán. Không ngờ có ngày phải dọn thêm một gian để nuôi trẻ.'],
            ['me', 'Bà nuôi được không?'],
            ['hac_chu', 'Không biết. Chợ này chưa từng có món nào ta không định được giá. Đứa nhỏ này là món đầu tiên.']
        ],
        'gather:hac_thi': [
            ['me', 'Để ta nói với nó.'],
            ['narr', 'Đứa nhỏ nhìn ngươi rất lâu, rồi hỏi ngươi có phải người ở dưới lên không. Ngươi gật đầu.'],
            ['me', 'Mẹ ngươi đang đợi. Khi nào xuống, ta sẽ ghé báo là ngươi vẫn khỏe.'],
            ['narr', 'Đứa nhỏ đọc tên làng, tên mẹ, cả tên con chó nhà bên. Ngươi nhắc lại từng chữ cho nó yên tâm.'],
            ['hac_chu', 'Hứa với trẻ con là món nợ khó trả nhất. Ở chợ ta, ai nợ thì phải trả, kể cả ngươi.']
        ]
    },
    tp_quang_han: {
        'hunt:quang_han': [
            ['me', 'Ba ngàn năm chưa rời, sao đêm rằm nó lại bỏ đi?'],
            ['hang_nga', 'Đêm rằm ta không ra gốc quế ngồi với nó. Ta bận tiếp khách của Lăng Tiêu. Nó đợi không được, đi tìm ta.'],
            ['me', 'Thỏ mà cũng giận?'],
            ['hang_nga', 'Giận lâu lắm. Ba ngàn năm nó chỉ có ta, còn ta thì có cả cung trăng phải lo. Nó thấy không công bằng.'],
            ['narr', 'Thỏ ngọc rúc vào lòng Hằng Nga, quay lưng về phía bà. Bà vẫn vuốt lông nó, không nói gì.'],
            ['hang_nga', 'Lần sau Lăng Tiêu gửi khách tới, ta sẽ cho đóng cửa cung. Khách thì còn nhiều, thỏ chỉ có một.']
        ],
        'gather:quang_han': [
            ['hang_nga', 'Dấu chân đó là của nó. Nhỏ, lệch về bên trái. Nó đi khập khiễng từ hồi giã thuốc cho Thiên Đình.'],
            ['me', 'Thỏ ngọc giã thuốc gì?'],
            ['hang_nga', 'Thuốc trường sinh cho tiên quan. Mỗi đêm ba ngàn chày. Tiên quan nào cũng uống, chẳng ai hỏi ai giã.'],
            ['narr', 'Vệt sương kéo về phía hốc đá dưới gốc quế. Quanh đó lảng vảng những bóng trắng mờ, lạnh hơn cả sương ngươi vừa ngưng.'],
            ['hang_nga', 'Nguyệt hồn. Tiên nữ cũ của cung này, ở lâu quá nên quên đường đi. Họ không ác, họ chỉ không muốn ai mang thứ gì ra khỏi cung.']
        ]
    },
    tp_thanh_khau: {
        'gather:thanh_khau': [
            ['ho_hau', 'Ảo trận của ngươi thô, nhưng thô thì thật. Mật thám Thiên Đình quen nhìn đồ tinh xảo, gặp đồ thô lại tin ngay.'],
            ['me', 'Chín trăm chín mươi chín lần nói dối cho ta. Ta có đáng không?'],
            ['ho_hau', 'Hồ tộc nói dối không vì ai đáng. Nói dối là nghề của bọn ta, như thợ rèn thì phải đập sắt.'],
            ['narr', 'Trong rặng đào có tiếng cười khúc khích. Mấy con hồ mị hoang lẻn vào trận, gặm từng nút ảo ảnh như gặm bánh.'],
            ['ho_hau', 'Hồ mị hoang, không phục ai ngoài cái bụng. Dẹp chúng trước khi mật thám tới, không thì trận lủng như rổ.']
        ],
        'hunt:thanh_khau': [
            ['me', 'Còn lần thứ một ngàn lẻ một?'],
            ['ho_hau', 'Lúc đó ngươi tự nói dối lấy. Ta già rồi, đuôi rụng mất ba cái.'],
            ['me', 'Nói dối cũng làm rụng đuôi?'],
            ['ho_hau', 'Giữ lời nói dối mới làm rụng. Mỗi lời phải có người nhớ, nhớ đủ lâu thì nặng như núi đeo sau lưng.'],
            ['narr', 'Một sợi lông trắng đậu xuống vai ngươi. Rặng đào phía sau khép lại, đường về hiện ra đúng chỗ cũ.'],
            ['ho_hau', 'Lần sau tới thì nhớ cười trước khi bước vào. Đường ở Thanh Khâu chỉ mở cho kẻ biết cười.']
        ]
    },
    tp_phu_tang: {
        'hunt:phu_tang': [
            ['me', 'Kim Ô non rơi khỏi tổ có thường không?'],
            ['dan_phu_tang', 'Năm nào cũng có một con. Chúng tập bay lúc chiều tà, khi lửa trên người yếu nhất. Ngốc, nhưng con non nào cũng ngốc như vậy.'],
            ['me', 'Sao mộc linh lại muốn dập nó?'],
            ['dan_phu_tang', 'Cây sợ lửa là lẽ thường. Mộc linh sinh ra từ rễ Phù Tang, gánh lũ Kim Ô trên đầu mà không được kêu một tiếng. Lửa rớt xuống gốc thì chúng giận.'],
            ['narr', 'Trên cành cao, một con Kim Ô lớn kêu một tiếng chói tai. Lá Phù Tang rung lên từng lớp, như cả cây đang thở ra.'],
            ['dan_phu_tang', 'Mẹ nó đấy. Bà ấy không xuống được, xuống là cháy rừng. Đành ngồi trên đó kêu từ chiều tới giờ.']
        ],
        'gather:phu_tang': [
            ['me', 'Lửa của nó nhỏ như ngọn nến.'],
            ['dan_phu_tang', 'Mặt trời nào lúc đầu cũng là ngọn nến. Lớn lên mới biết chói.'],
            ['narr', 'Lửa của Kim Ô non vừa bén, mộc linh dưới gốc đã ngẩng đầu. Lá trên mình chúng xào xạc như tiếng nghiến răng.'],
            ['dan_phu_tang', 'Chúng nhớ năm mười mặt trời cùng mọc, đất cháy mười ngày, gốc Phù Tang cũng bén lửa. Cây không quên lửa.'],
            ['me', 'Vậy phải cho chúng thấy lửa này không đốt rừng.']
        ]
    },
    tp_yeu_hoang: {
        'hunt:yeu_hoang_dien': [
            ['me', 'Ba vạn năm mới mở, sao lại mở cho ta?'],
            ['yeu_hoang', 'Vì ngươi đánh tới tận bàn rượu mà không xin gì. Lâu rồi điện này mới có khách, chứ không phải kẻ tới cầu xin.'],
            ['me', 'Yêu tộc từng ở Thiên Đình thật sao?'],
            ['yeu_hoang', 'Phụ hoàng ta từng ngồi trên đó. Rồi có một ngày quá nhiều mặt trời, quá ít người tha thứ. Yêu tộc bị đuổi xuống, mang theo được hai cái chén.'],
            ['narr', 'Yêu Hoàng rót rượu ra hai cái chén sứt. Chén của vua mà sứt, ngươi nhìn mãi mới dám cầm.'],
            ['yeu_hoang', 'Một chén cho ta, một chén cho kẻ ngang hàng. Ba vạn năm nay chén thứ hai để trống.'],
            ['me', 'Rượu ngon.'],
            ['yeu_hoang', 'Đắng chứ. Ngươi nói dối kém hồ tộc nhiều.']
        ],
        'gather:yeu_hoang_dien': [
            ['me', 'Họ còn nói tên mình. Không ai trùng ai.'],
            ['yeu_hoang', 'Ta biết. Ta tự tay lát từng viên, mỗi viên một cái tên. Lát xong thì không kẻ nào dám bước lên mà không cúi đầu.'],
            ['me', 'Vậy sao không chôn họ cho yên?'],
            ['yeu_hoang', 'Đất ngoài kia là đất của Thiên Đình. Chôn xuống đó là trả họ cho kẻ đã giết họ. Ta không làm thế được.'],
            ['narr', 'Dưới chân ngươi, nền xương khẽ rung, như cả nghìn người cùng thở ra một lúc.']
        ]
    },
    tp_bac_minh: {
        'hunt:bac_minh': [
            ['me', 'Ba vạn năm, lão mơ thấy gì?'],
            ['con_bang', 'Thấy lúc ta còn là cá, bơi trong một biển xám không có bờ. Giữa biển có một con mắt bão, mở ra thì sinh, khép lại thì diệt.'],
            ['me', 'Biển đó ở đâu?'],
            ['con_bang', 'Xa hơn mọi chỗ ngươi gọi là xa. Ta bơi ra khỏi đó, hóa chim, bay vào đây, rồi quên lối về.'],
            ['narr', 'Mặt biển đen gợn lên một vòng sóng tròn rất chậm, như có thứ gì to lớn trở mình dưới đáy.'],
            ['con_bang', 'Đừng hỏi thêm. Trả lời thêm một câu là ta tỉnh hẳn, tỉnh hẳn thì Bắc Minh tràn bờ.']
        ],
        'gather:bac_minh': [
            ['narr', 'Một mảnh giấc mơ trôi qua mặt ngươi. Trong đó, một người khổng lồ nằm ngủ, tóc hóa thành rừng, máu chảy thành sông.'],
            ['me', 'Đây là giấc mơ, hay chuyện có thật?'],
            ['narr', 'Giấc mơ cuộn sang góc khác. Một nửa người khổng lồ ấy đứng dậy, bước vào bóng tối bên ngoài, không ngoảnh lại.'],
            ['narr', 'Bắc Minh Giao ngoạm lấy mép giấc mơ, xé một mảng lớn. Mảng đó tan thành bọt, tanh mùi sắt gỉ.'],
            ['me', 'Phần còn lại, ta mang lên cho lão.']
        ]
    },

    /* ----- Mở cửa hàng, lò rèn các vùng ----- */
    open_thanh_van: {
        'hunt:thanh_van': [
            ['me', 'Lõi đồng này rèn được gì?'],
            ['lo_tuong', 'Rèn được thứ biết đánh. Đồng trong khôi lỗi ăn kiếm khí của đệ tử mấy trăm năm, cho vào lò là nó tự nhớ đường kiếm.'],
            ['me', 'Thạch Lão rèn cho tông môn lâu chưa?'],
            ['lo_tuong', 'Ba đời chưởng môn. Chưa đời nào trả tiền than đúng hạn, đời này cũng vậy.'],
            ['narr', 'Thạch Lão quăng lõi đồng vào lò. Tia lửa bắn ra, ông không buồn tránh, râu đã cháy sém từ lâu.'],
            ['lo_tuong', 'Đệ tử mới cứ tưởng lò rèn là chỗ ngồi chơi. Ngồi một buổi là biết: ở đây cái gì cũng nặng, cái gì cũng nóng, cái gì cũng phải làm lại.'],
            ['me', 'Vậy ta bắt đầu từ đâu?'],
            ['lo_tuong', 'Từ cái búa. Cầm lên. Không nhấc nổi thì ra kho, kho có bán búa nhẹ cho kẻ yếu tay.']
        ]
    },
    open_van_long: {
        'hunt:van_long': [
            ['me', 'Tán tu cướp hàng thì lính thành ở đâu?'],
            ['thuong_hoi', 'Lính thành ăn lương của thương hội. Ta trả lương thấp, nên họ đánh cũng thấp. Thuê ngươi một lần còn rẻ hơn.'],
            ['me', 'Bà nói thẳng thật.'],
            ['thuong_hoi', 'Nói vòng tốn thời gian, thời gian thì tốn tiền. Ở Vân Long, nói thẳng là lịch sự.'],
            ['narr', 'Kim Nương ghi tên ngươi vào một dòng trống. Nét chữ nhanh, gọn, không một vết mực thừa.'],
            ['thuong_hoi', 'Có tên rồi thì có quyền mua, cũng có nghĩa vụ trả. Kẻ nào quỵt Vân Long thì khắp phàm giới không chợ nào bán cho.'],
            ['me', 'Đã có ai quỵt chưa?'],
            ['thuong_hoi', 'Một kẻ. Giờ hắn tự trồng rau mà ăn. Nghe đâu rau cũng ngon.']
        ]
    },
    open_xich_diem: {
        'hunt:xich_diem': [
            ['me', 'Tim Hỏa Ma nóng thế này mà ông cầm tay không?'],
            ['hoa_cong', 'Tay ta nung mấy trăm năm rồi. Giờ nó chỉ biết nóng, không biết bỏng.'],
            ['me', 'Lò thần này ai xây?'],
            ['hoa_cong', 'Sư tổ của ta. Lão xây xong thì nhảy vào lò, bảo muốn biết lửa nghĩ gì. Từ đó lò chưa tắt.'],
            ['narr', 'Hỏa Công thả tim Hỏa Ma vào lò. Ngọn lửa đổi từ đỏ sang trắng, rồi sang một màu ngươi chưa thấy bao giờ.'],
            ['hoa_cong', 'Màu đó là lúc lửa vui. Nó ít khi vui lắm, ngươi gặp may.'],
            ['me', 'Còn khi lửa buồn?'],
            ['hoa_cong', 'Thì ta rèn hỏng. Hôm nay đừng làm nó buồn.']
        ]
    },
    open_phi_thang: {
        'hunt:phi_thang': [
            ['me', 'Sấm trên đài này đánh ai?'],
            ['dai_su', 'Đánh kẻ lên đài. Chịu nổi thì đi, không chịu nổi thì thành tro, tro thì gió mang đi.'],
            ['me', 'Ông rèn bằng sấm mà không sợ sao?'],
            ['dai_su', 'Sợ thì chết lâu rồi. Sấm thích kẻ sợ nó, lúc nào cũng đánh trúng được. Kẻ không sợ thì nó phải nhắm.'],
            ['narr', 'Lôi Đài Sư kẹp hạch sấm bằng một cái kìm gỗ đã cháy đen. Mỗi lần hạch giật, ông lại huýt sáo một tiếng như dỗ chó.'],
            ['dai_su', 'Hạch còn sống, nó nhớ chủ. Rèn thành đồ rồi, nó sẽ nhớ ngươi. Sấm đánh vào thứ nó nhớ thì nhẹ tay hơn.'],
            ['me', 'Nhẹ hơn bao nhiêu?'],
            ['dai_su', 'Đủ để sống. Lò ở dưới chân đài. Chưa xong việc thì đừng đứng lên đài.']
        ]
    },
    open_kiem_trung: {
        'hunt:kiem_trung': [
            ['me', 'Kiếm hồn nổi loạn vì sao?'],
            ['kiem_lao', 'Vì nhớ chủ. Chủ chết rồi mà kiếm chưa chịu chết. Mỗi năm vài thanh tỉnh dậy, đi khắp mộ tìm bàn tay quen.'],
            ['me', 'Ông giữ mộ một mình?'],
            ['kiem_lao', 'Có thêm mấy đứa nhỏ lau kiếm. Chúng sợ kiếm hồn, nhưng lau kỹ. Kiếm được lau kỹ thì ngủ lâu hơn.'],
            ['narr', 'Vô Phong Lão rút một thanh kiếm rỉ khỏi mộ, gõ nhẹ vào bia ba cái rồi cắm lại. Thanh kiếm thôi rung.'],
            ['kiem_lao', 'Đó là cách chào. Kiếm cũng như người, có ai hỏi thăm thì đỡ cô đơn.'],
            ['me', 'Quầy hàng của mộ bán gì?'],
            ['kiem_lao', 'Nhang, giẻ lau, dầu chống rỉ. Và vài thanh kiếm không chủ, cho kẻ nào chịu làm chủ mới.']
        ]
    },
    open_thiet_cot: {
        'hunt:thiet_cot': [
            ['me', 'Thiết Cốt Môn luyện thể thế nào?'],
            ['thiet_su', 'Đào quặng tay không, ba năm. Năm đầu gãy móng, năm thứ hai gãy ngón, năm thứ ba thì đá gãy trước.'],
            ['me', 'Đệ tử chịu nổi à?'],
            ['thiet_su', 'Không nổi thì về. Cửa môn ta không khóa. Kẻ ở lại là kẻ tự chọn.'],
            ['narr', 'Thủ vệ vừa bị đánh ngã đã đứng dậy, phủi bụi, chắp tay chào ngươi rồi về chỗ cũ như chưa có gì.'],
            ['thiet_su', 'Thằng đó ngã trăm lần mỗi ngày. Ngã nhiều nên đứng dậy nhanh. Môn ta không dạy đánh, chỉ dạy đứng dậy.'],
            ['me', 'Kho có bán thứ gì giúp đứng dậy nhanh hơn?'],
            ['thiet_su', 'Thuốc bóp. Mùi hắc, đắt, nhưng thấm. Đệ tử của ta mua nhiều nhất.']
        ]
    },
    open_huyet_sat: {
        'hunt:huyet_sat': [
            ['me', 'Hộ pháp mà đứng bán hàng?'],
            ['huyet_nu', 'Hộ pháp phải giữ cửa, mà cửa giáo ta là cái quầy. Ai vào cũng phải mua, mua xong thì phải đi.'],
            ['me', 'Giáo các ngươi bán gì?'],
            ['huyet_nu', 'Huyết đan, thuốc cầm máu, dao mổ. Thứ gì dính tới máu là có ta. Đệ tử chính đạo cũng mua, có điều đi cửa sau.'],
            ['narr', 'Huyết Nương lau tay vào vạt áo đỏ. Cổ tay trái bà chi chít vết kim cũ, xếp đều như những hàng chữ.'],
            ['huyet_nu', 'Đừng thương hại. Năm tuổi ta vào giáo bằng cổ tay này, ba mươi năm sau ta đứng quầy cũng bằng nó. Thế là lời.'],
            ['me', 'Lời với ai?'],
            ['huyet_nu', 'Với kẻ đã trích máu ta. Hắn chết rồi, ta còn sống, và giờ hắn là nguyên liệu trong kho.']
        ]
    },
    open_huyen_phap: {
        'hunt:huyen_phap': [
            ['me', 'Học phủ của con nhà thế gia mà chịu bán cho ta?'],
            ['phap_lao', 'Con nhà thế gia mua sách không đọc, mua thuốc không biết uống. Ta chán bán cho họ rồi.'],
            ['me', 'Ba bài thi vừa rồi là gì?'],
            ['phap_lao', 'Bài một xem ngươi có biết chạy. Bài hai xem ngươi có biết đứng lại. Bài ba xem ngươi có biết lúc nào làm cái nào.'],
            ['narr', 'Huyền Cơ Tử đưa ngươi một lọ thuốc không nhãn. Ngươi ngửi, lắc đầu, đặt lại. Lão gật gù.'],
            ['phap_lao', 'Đúng. Thuốc không nhãn thì không uống. Một nửa đệ tử thế gia trượt ở chỗ này, nửa còn lại trượt vì đã uống.'],
            ['me', 'Họ có sao không?'],
            ['phap_lao', 'Ngủ ba ngày. Tỉnh dậy thì học được một điều đắt hơn học phí.']
        ]
    },
    open_van_thu: {
        'hunt:van_thu': [
            ['me', 'Đầu đàn Yêu Lang đi đâu?'],
            ['thu_mau', 'Hóa hình rồi bỏ núi. Tu đủ thì thành người, thành người rồi thì chê đàn.'],
            ['me', 'Bà không giữ nó lại?'],
            ['thu_mau', 'Giữ được ai bao giờ. Ta chỉ giữ được bầy nó bỏ lại. Bầy mất đầu thì cắn nhau, cắn chán thì cắn người.'],
            ['narr', 'Một con sói con bò ra từ sau tảng đá, ngửi giày ngươi, rồi nằm luôn lên đó. Bách Thú Bà bật cười.'],
            ['thu_mau', 'Nó chọn ngươi rồi. Sói không chọn kẻ mạnh, sói chọn kẻ có mùi giống nhà.'],
            ['me', 'Ta có mùi gì?'],
            ['thu_mau', 'Mùi máu với mùi khói. Ở núi này, đó là mùi nhà. Đi thì nhẹ chân, kẻo nó tỉnh.']
        ]
    },
    open_van_tien: {
        'hunt:van_tien': [
            ['me', 'Ông xóa tên ta khỏi sổ tiên nô thì có sao không?'],
            ['tien_thuong', 'Có, mất đầu nếu bị phát hiện. Nhưng tiên quan Lăng Tiêu không bao giờ tự đọc sổ, họ thuê người đọc, mà người đọc thì ta quen.'],
            ['me', 'Ông liều vì cái gì?'],
            ['tien_thuong', 'Vì khách. Tiên nô thoát mỏ là khách sộp nhất Vạn Tiên. Họ không có gì, nên cái gì cũng phải mua.'],
            ['narr', 'Lý Chưởng Quỹ thổi khô mực, gấp sổ lại, nhét nó xuống dưới một chồng sổ khác dày gấp đôi.'],
            ['tien_thuong', 'Ở thành này ai cũng từng là thứ khác. Ta từng là đạo tặc. Lần đầu vào đây, ta cũng bị một chưởng quỹ già sai đi dẹp đạo tặc.'],
            ['me', 'Rồi ông dẹp được không?'],
            ['tien_thuong', 'Dẹp được chính ta. Giờ đi đi, ngươi đứng lâu trước quầy người ta lại tưởng ta đang khai báo.']
        ]
    },
    open_dao_tri: {
        'hunt:dao_tri': [
            ['me', 'Lò đun bằng nước ao. Nước ao từ đâu ra?'],
            ['dao_tri_mau', 'Từ sương. Linh khí Tiên Giới đọng trên mặt ao, mỗi đêm một lớp mỏng như cánh ve.'],
            ['me', 'Còn linh khí Tiên Giới từ đâu ra?'],
            ['dao_tri_mau', 'Từ dưới lên. Mỗi kẻ phi thăng mang theo một ít trong thân, rồi để lại một ít ở đây. Ao này đã uống một phần của ngươi.'],
            ['narr', 'Mặt ao phẳng như gương. Ngươi cúi xuống, thấy bóng mình, và sau bóng mình là những bóng người lạ, mờ dần như khói.'],
            ['dao_tri_mau', 'Những người lên trước ngươi. Ta không giấu, vì kẻ khác giấu đủ rồi.'],
            ['me', 'Thánh Mẫu không thấy lạ sao?'],
            ['dao_tri_mau', 'Thấy từ lâu. Thấy lạ mà vẫn uống nước ao, nghĩa là ta cũng có phần. Đi rèn đi, ta không muốn nói thêm.']
        ]
    },
    open_kim_bang: {
        'hunt:kim_bang': [
            ['me', 'Lông chim non mà nung chảy được tiên kim?'],
            ['kim_si_cong', 'Kim Sí Bằng sinh ra để bắt rồng. Lông nó phải nóng hơn vảy rồng một bậc, không thì làm sao cắp nổi.'],
            ['me', 'Giờ tộc Kim Sí còn bắt rồng không?'],
            ['kim_si_cong', 'Rồng giờ hiếm, con nào còn thì đã có chủ che chở. Chim non không có gì để bắt, nên đâm ra hung.'],
            ['narr', 'Trong nắm lông vàng ngươi mang về lẫn một sợi tơ màu tím, mảnh như tóc, sờ vào lại mát.'],
            ['kim_si_cong', 'Lại một sợi. Gió Bắc Minh thổi qua vách là có. Ta giữ cả hộp, chưa nung chảy được sợi nào.'],
            ['me', 'Lò thần cũng chịu thua?'],
            ['kim_si_cong', 'Lửa của trời này chỉ đốt được đồ của trời này. Sợi đó là hàng nhà khác. Giữ lấy, coi như quà cho khách mới.']
        ]
    },
    open_thanh_thi: {
        'hunt:thanh_thi': [
            ['me', 'Chợ Thánh Giới mà không bán binh giáp?'],
            ['dan_thanh_thi', 'Không bán. Ở đây người ta đánh nhau bằng đạo lý, binh giáp thì để cho Đa Bảo bán mà giàu.'],
            ['me', 'Tán Đồ phá quầy để cướp gì?'],
            ['dan_thanh_thi', 'Cướp chỗ ngồi. Quầy ở đây truyền từ đời này sang đời khác. Tán Đồ không có quầy, nên đi phá quầy người ta.'],
            ['narr', 'Người giữ chợ vẫn cúi xuống một bàn cờ, đánh một mình với chính mình.'],
            ['dan_thanh_thi', 'Ván cờ đó hắn đánh từ hồi chợ mới dựng. Chưa bên nào thắng. Hắn bảo thắng rồi thì không biết làm gì nữa.'],
            ['me', 'Ta đánh với ông ấy một ván được không?'],
            ['dan_thanh_thi', 'Được, nếu ngươi chịu ngồi ba ngàn năm. Mua thuốc trước đi, ngồi lâu đau lưng.']
        ]
    },
    open_da_bao: {
        'hunt:da_bao': [
            ['me', 'Thiếu một món đồ Thánh thì không thành Thánh. Luật đó ai đặt?'],
            ['da_bao', 'Không phải ta. Ta chỉ bán hàng đúng luật. Luật nào cũng cần người bán hàng, thế nên ta giàu.'],
            ['me', 'Lão bán cho ai nhiều nhất?'],
            ['da_bao', 'Cho kẻ sắp thành Thánh. Thành rồi thì không mua nữa, chỉ ghé qua mặc cả cho vui.'],
            ['narr', 'Đa Bảo gảy bàn tính. Hạt nào cũng bằng ngọc, gảy lên kêu như chuông nhỏ.'],
            ['da_bao', 'Bàn tính này ta mang theo từ hồi còn học ở Bích Du Cung. Sư phụ chê ta tính toán quá. Giờ đệ tử của người vẫn phải tới chỗ ta mua giáp.'],
            ['me', 'Lão không sợ Thông Thiên giận?'],
            ['da_bao', 'Người giận thì người mua đắt. Lệnh bài cầm chắc, mất là không cấp lại đâu.']
        ]
    },
    open_bat_canh: {
        'hunt:bat_canh': [
            ['me', 'Lò chưa tắt lần nào, ai giữ lửa ban đêm?'],
            ['dong_tu', 'Ta. Ban ngày cũng ta. Sư phụ ngồi trong kia, ít khi mở mắt, mà lửa vẫn cháy đúng như người muốn.'],
            ['me', 'Người muốn lửa cháy thế nào?'],
            ['dong_tu', 'Không biết. Người không nói. Ta đoán rồi quạt theo. Lò chưa nổ lần nào, vậy là ta đoán đúng, hoặc người không quan tâm.'],
            ['narr', 'Kim Giác Đồng Tử ngáp dài, đổi tay cầm quạt. Bàn tay kia chai cứng như vỏ cây.'],
            ['dong_tu', 'Ta có đứa em, Ngân Giác, trước quạt chung. Nó trốn xuống hạ giới làm yêu quái, nghe nói vui lắm. Ta ở lại, vì phải có người quạt.'],
            ['me', 'Ngươi có muốn đi không?'],
            ['dong_tu', 'Muốn. Nhưng ta đi thì lò tắt, lò tắt thì sư phụ phải đứng dậy. Ta chưa thấy người đứng dậy bao giờ, cũng chưa muốn thấy.']
        ]
    },
    open_vo_cuong: {
        'hunt:vo_cuong': [
            ['me', 'Khách trong quán đều trốn Thiên Đạo cả sao?'],
            ['ly_khach', 'Trốn thì to tát quá. Phần lớn chỉ mệt, muốn ngồi một chỗ không ai bắt mình leo tiếp.'],
            ['me', 'Còn bọn đạo tặc ngoài cửa?'],
            ['ly_khach', 'Cũng là khách, chỉ chưa chịu ngồi. Đánh một trận rồi chúng sẽ ngồi. Tuần sau ngươi gặp lại, chúng đang rửa bát.'],
            ['narr', 'Trong góc quán, một lão già tóc trắng ngủ gục bên chén rượu. Mặt bàn trước lão khắc chi chít tên người, có tên đã mòn vẹt.'],
            ['ly_khach', 'Ai ngồi bàn đó đủ lâu thì được khắc tên. Lão kia khắc ba lần, lần nào cũng quên là mình đã khắc.'],
            ['me', 'Ta có được khắc không?'],
            ['ly_khach', 'Trả xong bữa thứ một trăm thì được. Còn chín mươi chín bữa nữa, ăn đi.']
        ]
    },
    open_khai_thien: {
        'hunt:khai_thien': [
            ['me', 'Rèn luật cho lửa là thế nào?'],
            ['hoang_cong', 'Lửa ở đây chưa ai dạy. Có lúc nó cháy lạnh, có lúc cháy ngược, có lúc cháy rồi đổi ý. Đúc Quy Tắc Thể vào lò thì lửa mới biết thế nào là nóng.'],
            ['me', 'Ông là thợ của một nơi chưa có luật?'],
            ['hoang_cong', 'Thợ đầu tiên tới đây. Những kẻ tới trước ta không mang búa, họ mang ghế, ngồi xuống rồi tưởng mình là trời.'],
            ['narr', 'Khai Sơn Tượng nện một búa. Tiếng búa không vang, chỉ lăn ra đất như một hòn sỏi rồi nằm yên đó.'],
            ['hoang_cong', 'Tiếng cũng chưa có luật. Rèn thêm vài trăm năm, ta sẽ dạy nó vang.'],
            ['me', 'Lò này rèn được những gì?'],
            ['hoang_cong', 'Những thứ chưa có tên. Ngươi rèn ra thì tự đặt tên. Ở đây tên là của kẻ đến trước.']
        ]
    },

    /* ----- Đất của yêu ----- */
    open_yeu_do: {
        'hunt:thap_van_son': [
            ['me', 'Sơn Quân cắn nhau vì sao?'],
            ['dan_yeu_do', 'Tranh núi. Thập Vạn Đại Sơn mỗi ngọn một chủ, chủ chết thì mười con tranh. Ngọn nào cũng ngon, chẳng ai chịu nhường.'],
            ['me', 'Miếng xương này khắc chữ gì?'],
            ['dan_yeu_do', 'Tên ngươi bằng chữ yêu. Đọc ra nghĩa là kẻ đáng ăn mà không ăn được. Ở Yêu Đô, đó là lời khen.'],
            ['narr', 'Trong đô, người lạ đi cúi đầu, yêu thì đi ngẩng mặt. Một đứa nhỏ đầu hổ chạy ngang, nhìn ngươi rồi le lưỡi.'],
            ['dan_yeu_do', 'Đừng chấp. Nó chưa thấy người nào bước vào mà không run. Ngươi làm nó tò mò, nó sẽ bám theo ngươi cả buổi.'],
            ['me', 'Bám theo để làm gì?'],
            ['dan_yeu_do', 'Để xem người ăn gì. Yêu tộc tin rằng biết kẻ khác ăn gì là biết hắn sợ gì.']
        ]
    },
    s_yeu_quan: {
        'hunt:yeu_quan': [
            ['me', 'Ai khắc câu trên cửa quan?'],
            ['dan_yeu_quan', 'Một Yêu Hoàng đời trước, bằng móng tay. Thiên Đình cho thợ tới đục ba lần, chữ vẫn mọc lại.'],
            ['me', 'Ngươi là người, sao lại sống ở đất yêu?'],
            ['dan_yeu_quan', 'Vì đất người không cho ta sống. Ta trốn mỏ, đi về nam ba tháng mới tới đây. Lang Tướng ngửi ta một lúc rồi cho qua.'],
            ['narr', 'Con Lang Tướng vừa bị đánh ngã ngồi liếm vết thương, đôi mắt vàng vẫn dõi theo ngươi, không chút hằn học.'],
            ['dan_yeu_quan', 'Nó không ghét ngươi. Nó giữ cửa vì việc của nó là giữ cửa, không vì giận ai. Yêu đơn giản hơn người nhiều.'],
            ['me', 'Ở đây có nhiều người như ngươi không?'],
            ['dan_yeu_quan', 'Vài trăm. Bọn ta trồng lúa, yêu đi săn, đổi cho nhau. Không thuế, không lính tuần. Nghèo, nhưng ngủ được.']
        ]
    },
    s_thanh_khau: {
        'gather:thanh_khau': [
            ['narr', 'Ảo trận kéo ngươi về những thứ quen thuộc: một mái nhà, một bát cơm, một giọng nói gọi tên ngươi. Ngươi ngồi yên, không đáp.'],
            ['me', 'Không phải thật. Giọng đó gọi ta bằng một cái tên ta chưa từng có.'],
            ['narr', 'Tiếng cười sau rặng đào ngưng lại một nhịp, như kẻ chơi bị bắt bài.'],
            ['me', 'Trò chơi hết rồi. Ra đây.'],
            ['narr', 'Từ trong làn hoa, từng con hồ mị bước ra, mắt cong như trăng non. Lần này chúng không cười.']
        ],
        'hunt:thanh_khau': [
            ['me', 'Con hồ trắng đó là ai?'],
            ['dan_thanh_khau', 'Có người bảo là Hồ Hậu, có người bảo là con gái út của bà. Ai được nó gật đầu thì từ nay đi Thanh Khâu không lạc nữa.'],
            ['me', 'Hồ mị bày trận để làm gì?'],
            ['dan_thanh_khau', 'Để chơi. Hồ con buồn thì kéo khách đi vòng vòng, khách hoảng thì chúng vui. Chúng không ăn thịt, chỉ ăn cái hoảng của người ta.'],
            ['narr', 'Trên đường ra, cánh hoa đào bay theo ngươi một đoạn, rồi dừng lại ở ranh rừng như có ai giữ.'],
            ['dan_thanh_khau', 'Hoa tiễn khách đấy. Thanh Khâu ít khi tiễn ai.']
        ]
    },
    s_hoa_long: {
        'hunt:hoa_long_tri': [
            ['me', 'Thứ dưới ao là gì?'],
            ['dan_hoa_long_tri', 'Một con rồng già, già hơn cả Long Cung. Nó hóa rồng ở ao này, rồi không chịu đi.'],
            ['me', 'Sao nó lại lột vảy giao mãng?'],
            ['dan_hoa_long_tri', 'Hóa rồng xong thì phải lên trời làm quan. Nó từng lên, từng làm quan, rồi trốn về. Nó không muốn con cháu đi lại con đường ấy.'],
            ['narr', 'Một con mãng trụi vảy bò lên bờ, ngước nhìn mặt ao rất lâu, rồi lặng lẽ trườn trở xuống.'],
            ['dan_hoa_long_tri', 'Năm sau nó sẽ thử lại. Mãng con nào cũng muốn làm rồng, kể cả khi biết rồng không vui.'],
            ['me', 'Vậy có nên giúp chúng không?'],
            ['dan_hoa_long_tri', 'Giúp chúng được quyền chọn là đủ. Lão rồng dưới kia vừa nhắm mắt, nghĩa là lão đã nghe ngươi.']
        ]
    },
    s_yeu_hoang: {
        'hunt:yeu_hoang_dien': [
            ['me', 'Ngài không ra mặt?'],
            ['yeu_hoang', 'Trẫm ra mặt thì ngươi phải quỳ. Ngươi không quỳ thì cận vệ lại phải đánh. Cận vệ của trẫm mệt rồi.'],
            ['me', 'Ta không tới để đánh nhau.'],
            ['yeu_hoang', 'Ai tới đây cũng nói vậy, rồi ai cũng đánh. Tiên Giới dạy người ta một câu nói và một thói quen, hai thứ chẳng bao giờ khớp.'],
            ['narr', 'Trong bóng tối, một đôi mắt vàng mở ra, to bằng cửa điện, nhìn ngươi từ đầu tới chân rồi khép lại.'],
            ['yeu_hoang', 'Lần sau tới thì mang rượu. Trẫm có chén, chỉ thiếu người uống cùng.']
        ]
    },

    /* ----- Đồ vượt cửa cảnh giới ----- */
    gate_9_0: {
        'hunt:long_cung': [
            ['me', 'Long Cung để người lạ xuống lấy vảy giao sao?'],
            ['dan_long_cung', 'Long Cung không còn ai để cấm. Long Vương lên trời từ lâu, cung chỉ còn giao long hoang và mấy kẻ đắm thuyền như ta.'],
            ['me', 'Ngươi đắm thuyền ở đây?'],
            ['dan_long_cung', 'Ba mươi năm trước. Sóng đánh vỡ thuyền, ta chìm, tỉnh dậy đã thở được dưới nước. Không biết là phúc hay là phạt.'],
            ['narr', 'Diệp Tán Nhân khâu vảy giao bằng gân cá voi, đường kim đều như dệt lưới. Bàn tay lão nhăn nheo vì ngâm nước.'],
            ['dan_long_cung', 'Nghề cũ của ta là vá lưới. Vá lưới hay may giáp cũng thế: chỗ nào hở thì cá lọt, chỗ nào hở thì kiếm lọt.'],
            ['me', 'Lão không muốn lên bờ?'],
            ['dan_long_cung', 'Trên bờ ta là một lão già đắm thuyền. Dưới này ta là thợ may duy nhất của Long Cung. Ngươi chọn cái nào?']
        ]
    },
    gate_9_1: {
        'hunt:ma_uyen': [
            ['me', 'Ngươi sống sót ở Ma Uyên bằng cách nào?'],
            ['dan_ma_uyen', 'Không đứng gần mép. Ma khí xé hồn kẻ nào nhìn xuống lâu. Ta chỉ nhìn lò.'],
            ['me', 'Lò ở đây đốt bằng gì?'],
            ['dan_ma_uyen', 'Bằng hơi thở của Vực Ma. Chúng thở ra lửa đen. Thép tôi lửa đen thì biết sợ, mà biết sợ thì không gãy.'],
            ['narr', 'Tần Tiểu Ca nhúng lưỡi thép vào chậu nước muối. Nước sôi lên rồi đông lại thành một lớp đen như mực.'],
            ['dan_ma_uyen', 'Thép thường gãy vì cứng. Thép này cong được, cong rồi lại thẳng. Giống người sống ở Ma Uyên.'],
            ['me', 'Ngươi định ở đây mãi?'],
            ['dan_ma_uyen', 'Tới khi rèn xong một thanh kiếm cho em gái ta. Năm năm trước nó trượt chân xuống vực. Ta tin nó còn sống, mà ở dưới đó thì cần có kiếm.']
        ]
    },
    gate_9_2: {
        'hunt:phi_thang': [
            ['me', 'Lôi vân đánh nhầm người là thế nào?'],
            ['dan_phi_thang', 'Kẻ lên đài thiếu đồ, sấm tưởng là yêu ma đội lốt, đánh cho tan xác. Kẻ đủ đồ, sấm nhận ra người, chỉ đánh cho đau.'],
            ['me', 'Ngươi giữ cửa đài bao lâu rồi?'],
            ['dan_phi_thang', 'Mười hai năm. Mỗi năm chừng hai người lên. Phần lớn tóc đã bạc, hiếm khi thấy ai trẻ như ngươi.'],
            ['narr', 'Tần Khách đeo ngọc bội lôi hạch vào thắt lưng ngươi, chỉnh lại cho ngay. Tay hắn run nhẹ, mắt cứ liếc lên lôi vân.'],
            ['dan_phi_thang', 'Đừng cười. Ai nhìn sấm mười hai năm cũng run. Ta chỉ mong mỗi người ta tiễn đều lên tới nơi.']
        ]
    },
    gate_19_0: {
        'hunt:da_bao': [
            ['me', 'Lão trả công bằng Tử Khí mà không tiếc à?'],
            ['da_bao', 'Tiếc chứ. Nhưng kẻ cầm Tử Khí của ta đi thành Thánh thì sau này phải quay lại mua đồ của ta. Cho trước, thu sau.'],
            ['me', 'Bắc Minh với Phù Tang, sao Tử Khí lại nằm ở đó?'],
            ['da_bao', 'Mấy chỗ ấy cũ. Đồ cũ hay nằm ở chỗ cũ. Ta không tự đi lấy được, rời quầy một ngày là chợ này bị dọn sạch.'],
            ['narr', 'Đa Bảo đẩy hai sợi tử khí qua quầy bằng đầu đũa, như sợ chạm tay vào sẽ dính.'],
            ['da_bao', 'Cầm cẩn thận. Tử Khí không thích bị nắm chặt. Nắm chặt quá, nó tan ngay trong tay.'],
            ['me', 'Còn nắm lỏng?'],
            ['da_bao', 'Thì nó bay đi. Thành Thánh khó là vì thế.']
        ]
    },
    gate_19_1: {
        'hunt:bac_minh': [
            ['me', 'Sao giao long lại nuốt tử khí?'],
            ['dan_bac_minh', 'Chúng tưởng là thức ăn. Nuốt vào thì ngủ ngon hơn, vảy dày hơn, nhưng không con nào hóa rồng được. Tử khí không nuôi kẻ không biết dùng.'],
            ['me', 'Ngươi làm gì ở vùng biển này?'],
            ['dan_bac_minh', 'Chèo thuyền đưa khách đi xem Côn Bằng ngủ. Khách trả tiền để nhìn một vùng biển đen chẳng có gì. Ta không hiểu, nhưng tiền thì thật.'],
            ['narr', 'Từ bụng con giao cuối cùng, hai sợi tử khí thoát ra, lượn quanh ngươi như hai con cá nhỏ rồi nằm yên trên tay.'],
            ['dan_bac_minh', 'Chúng chọn ngươi rồi. Ta từng thấy một vị tiên trả cả gia tài để mua một sợi, nó trượt khỏi tay ông ta như lươn.'],
            ['me', 'Còn ta chẳng trả gì.'],
            ['dan_bac_minh', 'Chắc vì thế. Tử khí cũng ghét bị mua.']
        ]
    },
    gate_19_2: {
        'hunt:phu_tang': [
            ['me', 'Mộc linh giữ tử khí làm gì?'],
            ['dan_phu_tang', 'Nuôi cây. Hai sợi đó quấn quanh rễ Phù Tang mấy vạn năm, nhờ vậy cây mới chịu nổi lửa của Kim Ô.'],
            ['me', 'Lấy đi thì cây có sao không?'],
            ['dan_phu_tang', 'Sẽ yếu đi chút ít. Nhưng cây đã lớn, Kim Ô trên cành cũng chẳng còn đủ mười. Cây đỡ nổi.'],
            ['narr', 'Một mộc linh già bò ra từ hốc rễ, nhìn hai sợi tử khí trong tay ngươi rất lâu, rồi chậm rãi cúi đầu như người tiễn của hồi môn.'],
            ['dan_phu_tang', 'Nó tiếc. Nhưng nó cũng biết thứ quý mà giữ mãi dưới đất thì chỉ là rễ.']
        ]
    },
    gate_22_0: {
        'hunt:bich_du': [
            ['me', 'Kiếm ý của Tru Tiên vẫn còn sống?'],
            ['dan_bich_du', 'Sống, và khó tính. Bốn thanh kiếm cắm quanh Bích Du từ thời Phong Thần, kiếm linh của chúng chưa ngủ ngày nào.'],
            ['me', 'Ngươi trông sân mà không sợ bị chém?'],
            ['dan_bich_du', 'Có chứ. Tháng nào ta cũng mất vài sợi tóc. Sư phụ bảo kiếm linh chỉ chém thứ thừa, nên ta mới sống tới giờ.'],
            ['narr', 'Bạch Đạo Hữu nhúng tấm giáp vào luồng kiếm ý đang tan. Mặt giáp hiện lên những vết xước nhỏ, xếp thành hoa văn như vảy cá.'],
            ['dan_bich_du', 'Vết xước đó do kiếm ý tự khắc. Nó nhận ra giáp này đã chịu nó một lần, lần sau sẽ chém nhẹ hơn.'],
            ['me', 'Sao lại đừng nói ai cho?'],
            ['dan_bich_du', 'Tiệt Giáo không cho ai thứ gì, đó là luật. Ta chỉ để quên một tấm giáp ở chỗ ngươi đứng.']
        ]
    },
    gate_22_1: {
        'hunt:linh_son': [
            ['me', 'La Hán mà cũng sa đọa?'],
            ['dan_linh_son', 'Tu lâu quá thì quên mình tu vì cái gì. Họ tụng kinh ba ngàn năm, tụng tới mức kinh thành tiếng ồn, rồi nổi giận với cả tiếng chuông.'],
            ['me', 'Ngươi sống ở Linh Sơn?'],
            ['dan_linh_son', 'Ta làm ruộng dưới chân núi. Tiếp Dẫn Đạo Nhân trông ruộng Tây Phương, ta trông một mảnh nhỏ trong đó. Lúa ở đây chín theo tiếng chuông.'],
            ['narr', 'Viên xá lợi trong tay ngươi còn ấm. Bên trong có một đốm sáng chập chờn như ngọn đèn sắp tắt.'],
            ['dan_linh_son', 'Đó là chút tâm còn lại của vị La Hán. Luyện vào binh khí rồi, mỗi lần ngươi ra đòn là nó được tụng thêm một câu.'],
            ['me', 'Như vậy có phải là siêu độ không?'],
            ['dan_linh_son', 'Ta là nông dân, không biết chữ siêu độ. Ta chỉ biết thứ gì chưa dùng hết thì đừng bỏ.']
        ]
    },
    gate_22_2: {
        'hunt:cuc_lac': [
            ['me', 'Hộ pháp mất tâm từ khi nào?'],
            ['dan_cuc_lac', 'Từ khi Chuẩn Đề bắt đầu ngồi nhìn khe nứt dưới đài sen. Người nhìn, hộ pháp nhìn theo. Nhìn lâu quá, tâm của họ trôi qua khe.'],
            ['me', 'Lão giữ cửa mà không nhìn?'],
            ['dan_cuc_lac', 'Ta quay lưng về phía khe. Ba trăm năm chưa quay lại lần nào. Người giữ cửa phải biết mình nhìn về phía nào.'],
            ['narr', 'Kim thân hộ pháp vỡ ra từng mảng vàng. Bên trong rỗng không, chỉ có một làn gió mỏng thổi về phía đài sen.'],
            ['dan_cuc_lac', 'Thấy chưa, vàng còn, người đi. Đúc cho khéo. Vàng này đứng gác cả đời, giờ để nó gác cho ngươi.'],
            ['me', 'Bên kia khe có gì?'],
            ['dan_cuc_lac', 'Không biết. Ta đã nói rồi, ta quay lưng.']
        ]
    },
    gate_29_0: {
        'hunt:khai_thien': [
            ['me', 'Ngoài kia không có gì giữ hình dạng cho ta thật sao?'],
            ['hoang_cong', 'Hỗn Độn không ghét ngươi, nó chỉ không nhớ ngươi. Mỗi bước ra ngoài, nó quên ngươi một chút. Giáp này nhớ thay.'],
            ['me', 'Ông từng ra ngoài chưa?'],
            ['hoang_cong', 'Một lần. Về tới nơi, ta quên tay trái là tay nào. Mất ba năm mới học lại cách cầm búa.'],
            ['narr', 'Bộ giáp đúc từ Quy Tắc Thể không có màu cố định. Mỗi khi ngươi cử động, nó lại nhắc ngươi khuỷu tay ở đâu, đầu gối ở đâu.'],
            ['hoang_cong', 'Nó lắm lời. Nhưng ngoài Hỗn Độn, kẻ lắm lời là kẻ sống lâu. Nghe nó.']
        ]
    },
    gate_29_1: {
        'hunt:hu_nhan': [
            ['me', 'Con mắt này của ai?'],
            ['dan_hu_nhan', 'Không ai biết. Có kẻ bảo là mắt của một Ma Thần chết trước khi trời mở. Có kẻ bảo hư không tự mọc mắt để xem ai đang đi trong nó.'],
            ['me', 'Ngươi sống sót ở đây bằng cách nào?'],
            ['dan_hu_nhan', 'Đứng sau lưng con mắt. Nó thấy mọi thứ, trừ chỗ nó đang đứng. Ta đứng đó hai ngàn năm.'],
            ['narr', 'Đồng tử Ma Đồng trong tay ngươi vẫn còn đảo qua đảo lại, như đang tìm thứ gì giữa khoảng trống.'],
            ['dan_hu_nhan', 'Nó tìm chủ cũ. Luyện vào binh khí thì nó sẽ tìm kẻ thù cho ngươi. Mắt nào cũng cần có thứ để nhìn.']
        ]
    },
    gate_29_2: {
        'hunt:than_dinh': [
            ['me', 'Ngươi giữ cửa Thần Đình mà để ta lấy dấu ấn Đạo Vệ?'],
            ['dan_than_dinh', 'Ta giữ cửa trong. Đạo Vệ đi cửa ngoài. Cửa nào người nấy lo.'],
            ['me', 'Đạo Vệ là gì?'],
            ['dan_than_dinh', 'Khôi lỗi mặc áo người. Chúng đi khắp bờ Hỗn Độn, mang tin về Thần Đình. Không biết đói, không biết mỏi, chỉ biết đi đúng giờ.'],
            ['narr', 'Dấu ấn Đạo Vệ lạnh như sắt mùa đông, mặt trơn nhẵn, không chữ, không hình. Hứa Tiểu Ca nhặt từng cái, chùi vào áo rồi đưa cho ngươi.'],
            ['dan_than_dinh', 'Ta làm việc này lâu tới mức Đạo Vệ đi ngang chào ta, ta chào lại. Có hôm ta quên mình là người hay là một trong số chúng.'],
            ['me', 'Ngươi là người.'],
            ['dan_than_dinh', 'Cảm ơn. Hôm nay ta tin ngươi.']
        ]
    },
    gate_30_0: {
        'gather:ma_than_mo': [
            ['me', 'Long cốt ở đây là của con rồng nào?'],
            ['hd_thu_cuu', 'Không phải rồng ngươi biết. Đây là xương của thứ có trước rồng, có trước cả chữ rồng. Người sau nhìn thấy, gọi đại là long cốt.'],
            ['me', 'Nghĩa địa này ai chôn?'],
            ['hd_thu_cuu', 'Không ai chôn. Ba ngàn Ma Thần chết cùng một lúc, nằm xuống đúng chỗ mình ngã. Mộ là do thời gian đắp.'],
            ['narr', 'Khúc xương dài nhất ngươi nhặt được có một vết chém thẳng, nhẵn như mặt gương.'],
            ['hd_thu_cuu', 'Vết của một nhát rìu. Bộ xương nào ở đây cũng có. Mặc nó vào thì nhớ rằng ngươi đang mặc thứ đã thua.']
        ]
    },
    gate_30_1: {
        'gather:vo_chung_lau': [
            ['me', 'Tháp này ai xây?'],
            ['am_duong', 'Không ai xây. Mỗi kẻ leo lên lại thêm một tầng, vì không chịu nổi việc dừng lại ở tầng cuối.'],
            ['me', 'Vậy càng leo thì tháp càng cao?'],
            ['am_duong', 'Phải. Ngươi vừa thêm vài tầng. Đừng áy náy, ai cũng thế.'],
            ['narr', 'Binh khí trong tay ngươi không có lưỡi, không có chuôi, chỉ có sức nặng. Nó chờ ngươi quyết định nó là gì.'],
            ['am_duong', 'Thứ chưa rèn thì chưa có hình. Rèn theo ý ngươi. Đừng rèn theo ý tháp, tháp chỉ muốn ngươi leo tiếp.']
        ]
    },
    gate_30_2: {
        'gather:hai_tam': [
            ['me', 'Mắt bão này thở ra Hồng Mông. Phía sau nó là gì?'],
            ['vo_danh', 'Tử Khí Thiên Nguyên. Những sợi tử khí ngươi gom suốt dọc đường đều là hơi thở lạc của nơi đó.'],
            ['narr', 'Giữa mắt bão, ngươi ngồi bất động. Những luồng hơi tím quấn quanh ngươi rồi đông lại từng mảnh, nặng như sắt non.'],
            ['vo_danh', 'Bão không giết ngươi vì ngươi không chống lại nó. Những kẻ đến trước đều cố đứng vững. Không ai còn lại.'],
            ['me', 'Còn ngươi?'],
            ['vo_danh', 'Ta ngồi xuống từ đầu.']
        ]
    },

    /* ----- Mẻ rèn cuối của các thần lò ----- */
    lo_xich_diem: {
        'hunt:xich_diem': [
            ['narr', 'Dung Nham Cự Nhân cuối cùng ngã xuống, thân nguội dần thành đá xám. Cuối đường hầm có thứ gì đó lạnh hơn cả núi lửa đang đợi.'],
            ['hoa_cong', 'Sư tổ ta đấy. Lão nhảy vào lò để hỏi lửa, lửa trả lời gì thì không ai biết, chỉ biết lão không ra nữa. Nguyên liệu ta cần nằm trong tay lão.'],
            ['me', 'Vậy ta phải đánh sư tổ của ông?'],
            ['hoa_cong', 'Đánh cho lão nghỉ. Lão đã hỏi lửa đủ lâu rồi.']
        ],
        'boss:lo_xich_diem': [
            ['narr', 'Oán linh tan thành tro nóng. Trong đống tro còn một khối kim loại đỏ rực, hình như một nắm tay đang nắm chặt.'],
            ['hoa_cong', 'Thứ lão giữ tới cuối. Hồi còn sống lão cũng chưa bao giờ chịu mở tay cho ta xem.'],
            ['me', 'Bên trong có gì?'],
            ['hoa_cong', 'Mang về lò rồi biết. Ta đợi mấy trăm năm, thêm một canh giờ cũng chẳng sao.']
        ],
        'go:xich_diem': [
            ['narr', 'Nắm tay kim loại từ từ mở ra trong lửa. Bên trong là một viên đá nhỏ, khắc dòng chữ: lửa không trả lời, lửa chỉ cháy.'],
            ['hoa_cong', 'Lão già ngốc. Mấy trăm năm, chỉ để viết ra câu đó.'],
            ['me', 'Ông thấy câu đó đúng không?'],
            ['hoa_cong', 'Đúng. Đúng nên mới tức. Cầm đồ đi, ta muốn ngồi một mình với lò.']
        ]
    },
    lo_bat_canh: {
        'hunt:bat_canh': [
            ['me', 'Lực sĩ ở đây đông quá. Ai nuôi chúng?'],
            ['ren_bat_canh', 'Chẳng ai nuôi. Chúng tự đến, tự canh, tự đánh nhau với khách. Ở Bát Cảnh, cái gì cũng tự.'],
            ['narr', 'Cuối đường, một bóng người mặc đạo bào rách đứng chắn cửa kho nguyên liệu, tay cầm một tờ giấy thề cháy dở.'],
            ['ren_bat_canh', 'Kẻ Phản Thệ. Hắn từng thề giữ kho tới khi lò tắt. Lò không tắt, hắn chán, nên hắn nuốt luôn chìa khóa.']
        ],
        'boss:lo_bat_canh': [
            ['narr', 'Kẻ Phản Thệ quỳ xuống, tờ giấy thề trong tay cháy hết. Từ miệng hắn lăn ra một chiếc chìa khóa đồng.'],
            ['me', 'Hắn còn nói được gì không?'],
            ['ren_bat_canh', 'Hắn chỉ nói một câu suốt mấy ngàn năm: ta muốn được nghỉ. Giờ thì được rồi.'],
            ['me', 'Không ai cho hắn nghỉ sớm hơn sao?'],
            ['ren_bat_canh', 'Lời thề là của hắn. Giữ hay bỏ là việc của hắn. Ở đây không ai làm thay việc của ai.']
        ],
        'go:bat_canh': [
            ['narr', 'Lô Sư mở kho bằng chìa khóa đồng. Trong kho chỉ có một khối sắt nhỏ, bọc trong tờ giấy thề thứ hai, chưa ký.'],
            ['ren_bat_canh', 'Hắn định thề lại, rồi không dám ký. Khối sắt này ngấm sự do dự của hắn mấy ngàn năm.'],
            ['me', 'Do dự thì rèn được gì?'],
            ['ren_bat_canh', 'Rèn được thứ không bao giờ ra đòn vội. Ngươi sẽ thích nó, hoặc ghét nó.']
        ]
    },
    lo_khai_thien: {
        'hunt:khai_thien': [
            ['me', 'Mười hai Quy Tắc Thể rồi mà vẫn chưa thấy đường vào.'],
            ['hoang_cong', 'Đường vào bị một kẻ đến trước ta giữ. Hắn muốn tự khai một phương trời, khai nửa chừng thì chết. Hồn hắn vẫn đứng trong nửa phương trời đó.'],
            ['narr', 'Phía trước, đất bỗng nghiêng đi một góc lạ. Mặt trời ở đó mọc từ phía dưới.'],
            ['hoang_cong', 'Trời của hắn đấy. Hắn làm không xong, nên mọi thứ đều lộn. Vào đó cẩn thận, chân ngươi sẽ muốn đi lên trời.']
        ],
        'boss:lo_khai_thien': [
            ['narr', 'Oán linh tan đi, nửa phương trời của nó sụp xuống như một tấm lều đứt dây. Giữa đống đổ nát còn một khối quặng tỏa ánh sáng ngược.'],
            ['me', 'Hắn muốn khai một phương trời thế nào?'],
            ['hoang_cong', 'Một phương trời không có ai ghi chép. Ý hay, nhưng hắn quên làm móng. Trời nào không có móng cũng đổ.']
        ],
        'go:khai_thien': [
            ['narr', 'Khai Sơn Tượng đặt khối quặng vào lò. Lần đầu tiên, lửa cháy đúng một hướng, từ dưới lên, như lửa phải cháy.'],
            ['hoang_cong', 'Thấy chưa? Hắn dạy được lửa một điều trước khi chết. Thợ thì để lại đồ, kẻ mơ thì để lại luật.'],
            ['me', 'Còn ông để lại gì?'],
            ['hoang_cong', 'Món này, cho ngươi. Hỏi nhiều quá, cầm lấy đi.']
        ]
    },
    lo_phong_do: {
        'hunt:phong_do': [
            ['me', 'Ác quỷ ở đây sao đông như chợ?'],
            ['ren_phong_do', 'Vì cầu gãy. Hồn qua không được thì ở lại Phong Đô, ở lâu thì đói, đói lâu thì thành quỷ.'],
            ['me', 'Cầu nào?'],
            ['ren_phong_do', 'Cầu Nại Hà. Gãy từ đời nào không ai nhớ. Mạnh Bà vẫn đứng đầu cầu nấu canh, chỉ là không còn ai qua để uống.'],
            ['narr', 'Cuối phố quỷ, một bóng người ôm quyển sổ nợ đứng chắn trước cửa lò. Trên trán hắn khắc một chữ thề đã mờ.']
        ],
        'boss:lo_phong_do': [
            ['narr', 'Kẻ Phản Thệ ngã xuống, quyển sổ nợ bung ra. Trang nào cũng có một cái tên, một món nợ, và một nét gạch ngang.'],
            ['ren_phong_do', 'Hắn từng thề đòi nợ cho Diêm La. Rồi thấy người ta không trả nổi, hắn gạch hết. Phạm lời thề nên bị phạt đứng đây.'],
            ['me', 'Bị phạt vì tha nợ?'],
            ['ren_phong_do', 'Ở Âm Giới, tha nợ là tội nặng nhất. Nợ không trả thì luân hồi lệch cân, luân hồi lệch cân thì người sống ở trên cũng khổ.']
        ],
        'go:phong_do': [
            ['narr', 'Lửa nghiệp trong lò Phong Đô cháy màu xanh lục. Ân Lão Đầu thả quyển sổ nợ vào, lửa bùng lên rồi dịu xuống như vừa được trả một món nợ cũ.'],
            ['ren_phong_do', 'Mẻ này rèn bằng nợ được tha. Nhẹ hơn mọi thứ ta từng rèn.'],
            ['me', 'Lão có định qua cầu không?'],
            ['ren_phong_do', 'Khi nào cầu được nối lại. Ta muốn uống bát canh của Mạnh Bà một lần, quên cái nghề này đi.']
        ]
    },
    lo_kim_bang: {
        'hunt:kim_bang': [
            ['me', 'Bầy chim lại kéo về đông hơn trước.'],
            ['kim_si_cong', 'Chúng đánh hơi thấy oán linh. Kim Sí Bằng ghét thứ gì không có cánh mà vẫn bay được.'],
            ['narr', 'Trên đỉnh vách, một bóng xám lơ lửng giữa gió, không cánh, không chân, ôm trong lòng một chiếc lông vàng to bằng người.'],
            ['kim_si_cong', 'Chiếc lông của Kim Sí tổ. Oán linh kia vốn là kẻ trộm. Trộm được rồi mà không xuống được, ôm nó chết trên vách.']
        ],
        'boss:lo_kim_bang': [
            ['narr', 'Oán linh tan vào gió. Chiếc lông vàng chao xuống, ngươi đưa tay đón. Nó nóng tới mức không khí quanh đó rung lên.'],
            ['me', 'Hắn trộm lông để làm gì?'],
            ['kim_si_cong', 'Để bay. Hắn là người, muốn có cánh. Lông thì có rồi, nhưng không ai dạy hắn bay. Thế là ngồi trên vách tới chết.']
        ],
        'go:kim_bang': [
            ['narr', 'Kim Sí Lão Tượng thả lông tổ vào lò. Lửa vàng vụt lên cao hơn vách đá, cả bầy chim non im bặt, ngẩng đầu nhìn.'],
            ['kim_si_cong', 'Chúng nhận ra mùi tổ. Từ nay chúng sẽ hiền với ngươi hơn.'],
            ['me', 'Chúng còn đuổi ta nữa không?'],
            ['kim_si_cong', 'Vẫn đuổi. Nhưng giờ là đuổi theo để chơi.']
        ]
    }
};

applyStoryLoreSteps(SIDE_LORE_A, 'SIDE_LORE_A');
