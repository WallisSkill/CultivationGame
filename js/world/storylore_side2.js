/* ===========================================================
   LỜI KỂ THÊM CHO NHIỆM VỤ PHỤ (Hồng Hoang, Âm Giới, Lục Thánh, Bàn Cổ)
   Cùng cách chọn bước như STORY_LORE_STEPS: "go:địa điểm", "boss:id", "hunt:địa điểm", "gather:địa điểm".
=========================================================== */
const SIDE_LORE_B = {
    /* ----- Lục Nguyên ----- */
    ln_1: {
        'hunt:ban_co_dien': [
            ['me', 'Vu Binh đánh không cần nghĩ. Chúng không sợ chết sao?'],
            ['hau_nghe', 'Chúng chưa sống đủ lâu để sợ. Vu tộc sinh từ máu, máu chỉ biết chảy về phía trước.'],
            ['me', 'Còn ngài thì sợ.'],
            ['hau_nghe', 'Ta có vợ. Có vợ thì biết sợ. Bắn trúng chín mặt trời mà không dám lên cung trăng, ngươi thấy có buồn cười không?'],
            ['narr', 'Dưới chân tượng, đất uống máu ngươi rất nhanh, như đã quen với thứ đó.']
        ],
        'gather:ban_co_dien': [
            ['hau_nghe', 'Nhìn tay ta đi.'],
            ['narr', 'Bàn tay Hậu Nghệ chai tới mức móng hóa đá. Hai ngón kéo dây cung đã không còn cong được.'],
            ['hau_nghe', 'Vu tộc không chết già. Thịt cứng dần, rồi một sáng đứng dậy không nổi, thành tượng. Mấy pho đá quanh điện này đều là anh em ta.'],
            ['me', 'Ngài đứng đây với họ mỗi ngày?'],
            ['hau_nghe', 'Phải có người lau rêu. Ngươi ngưng được Tinh Nguyên rồi, lúc rảnh thì lau giúp pho thứ ba bên trái. Hắn ghét bẩn.']
        ]
    },
    ln_2: {
        'hunt:ngu_trang': [
            ['me', 'Địa Mạch Linh trông như rễ cây biết đi.'],
            ['tran_nguyen', 'Nó là rễ của cây Nhân Sâm. Năm xưa con khỉ đá đẩy đổ cây, rễ đứt ra thành mấy đứa này, tới giờ chưa chịu về.'],
            ['me', 'Cây đổ mà vẫn sống?'],
            ['tran_nguyen', 'Quan Âm đổ nửa bình nước vào gốc. Nửa còn lại bà giữ, bảo để dành cho lần khỉ ghé chơi sau.'],
            ['narr', 'Con Địa Mạch Linh cuối cùng chui xuống đất, dừng lại ngay dưới gốc cây, quấn một vòng như đứa trẻ ôm chân mẹ.']
        ],
        'gather:ngu_trang': [
            ['tran_nguyen', 'Nghe được đất thở rồi chứ. Mỗi lần dưới kia có người phi thăng, đất thở ra một hơi dài.'],
            ['me', 'Rồi hít vào lại?'],
            ['tran_nguyen', 'Không hết. Linh khí theo người lên trời, chưa thấy theo ai đi xuống. Ta đếm hơi thở của đất mười vạn năm, hơi sau ngắn hơn hơi trước.'],
            ['me', 'Ngài không ngăn được sao?'],
            ['tran_nguyen', 'Ta là Địa Tiên, giữ được một mảnh vườn. Phần còn lại phải đợi một kẻ biết bay mà vẫn nhớ mùi đất.']
        ]
    },
    ln_3: {
        'boss:hh_duong_tien': [
            ['me', 'Mỗi lần mở thiên nhãn mất một giọt máu. Ngài mở bao nhiêu lần rồi?'],
            ['duong_tien', 'Đủ để Hao Thiên Khuyển phải liếm vết thương cho ta mỗi tối. Nó thích vị máu nhà Dương hơn thịt.'],
            ['narr', 'Con chó đen nghe nhắc tên thì vẫy đuôi, rồi lại cắn nhẹ vào gót ngươi cho có lệ.'],
            ['me', 'Nó cắn ta.'],
            ['duong_tien', 'Nó nhận ngươi. Kẻ nó ghét thì nó cắn cổ.']
        ],
        'gather:nam_thien_mon': [
            ['me', 'Lớp bóng này là gì?'],
            ['duong_tien', 'Là cái người ta từng là. Thử nhìn thiên binh xem.'],
            ['narr', 'Bóng thứ hai của mỗi thiên binh mặc áo nâu, vác cuốc. Có một bóng còn bế con.'],
            ['duong_tien', 'Phần lớn từng là dân dưới kia. Mặc giáp vàng vài trăm năm thì quên tay mình từng cầm cuốc.'],
            ['me', 'Ngài thấy mà vẫn gác cổng cùng họ.'],
            ['duong_tien', 'Ta gác để còn có người nhớ thay họ. Đứng ngoài cổng thì nhìn vào chẳng thấy gì.']
        ]
    },
    ln_4: {
        'hunt:am_gioi': [
            ['me', 'Sao chúng không tìm được cầu?'],
            ['dia_tang', 'Chết xa nhà. Hồn lạc thì đi theo tiếng gọi tên. Không ai gọi thì hồn đi vòng tròn.'],
            ['me', 'Đế Thính không nghe thấy chúng à?'],
            ['dia_tang', 'Nghe hết. Nghe nhiều quá nên giờ nó nằm úp tai xuống đất mà ngủ. Ta không nỡ đánh thức.'],
            ['narr', 'Ngươi gọi to: "Có ai tên gì không?". Ba hồn quay đầu lại cùng lúc, như vừa được hỏi một câu đã chờ rất lâu.']
        ],
        'gather:am_gioi': [
            ['hau_tho', 'Con không bị kéo đi. Tốt. Nhiều tiên nhân xuống đây thử, cánh cửa thứ ba nuốt mất một nửa.'],
            ['me', 'Cửa thứ ba dẫn đi đâu?'],
            ['hau_tho', 'Súc sinh đạo. Ai kiêu thì nó gọi. Con từng làm nô, nên con không kiêu nổi.'],
            ['me', 'Nương nương từng có thân như Hậu Nghệ?'],
            ['hau_tho', 'Từng. Ta là Tổ Vu. Ta đem thân mình làm cánh cửa này, nên giờ không có chỗ nào để ngồi, chỉ có chỗ để đứng.'],
            ['narr', 'Một cánh cửa quay chậm lại trước mặt ngươi, như người gác cổng gật đầu chào, rồi quay tiếp.']
        ]
    },
    ln_5: {
        'boss:hh_thai_nhat': [
            ['me', 'Ngài chỉ còn sức đánh một tiếng. Vậy giờ hết rồi?'],
            ['thai_nhat', 'Hết. Mai lại có. Tàn ảnh như cái giếng cạn, đêm nào cũng rỉ ra một gáo.'],
            ['de_tuan', 'Đệ ta đánh chuông giỏi nhất Hồng Hoang, mà ngày cuối không kịp đánh tiếng thứ hai.'],
            ['thai_nhat', 'Huynh lại kể chuyện đó với khách. Ta chết vì mải nhìn huynh chết trước, có gì hay mà kể.'],
            ['narr', 'Hai tàn ảnh im một lúc. Chiếc chuông trong tay Thái Nhất ngân rất khẽ, như ai đó vừa thở dài vào nó.']
        ],
        'gather:yeu_dinh': [
            ['de_tuan', 'Ngươi biết Chu Thiên Tinh Đấu Đại Trận không? Ba trăm sáu mươi lăm Yêu Thần, mỗi đứa giữ một vì sao.'],
            ['me', 'Giờ họ ở đâu?'],
            ['de_tuan', 'Thành sao thật. Trận vỡ, chúng bị găm luôn lên trời. Đêm nào trời trong, ngươi đang nhìn mộ của Yêu Đình.'],
            ['me', 'Ngài có hối hận vì đã đánh Vu tộc không?'],
            ['de_tuan', 'Ta hối hận vì không đánh sớm hơn. Đánh sớm thì chết sớm, đỡ mất thêm mười con.'],
            ['narr', 'Dư âm chuông lặng hẳn. Đế Tuấn ngồi xuống bậc thềm sụp, đếm sao bằng ngón tay như một người cha đếm con.']
        ]
    },
    ln_6: {
        'gather:tay_giao': [
            ['me', 'Ngọn đèn này cháy bằng dầu gì?'],
            ['nhien_dang', 'Bằng năm tháng của ta. Mỗi đêm một năm. Ta thắp nó từ hôm rời Tử Tiêu Cung, chưa thấy đáy đĩa.'],
            ['me', 'Ngài ngồi hàng cuối ở đó. Hàng cuối nghe có rõ không?'],
            ['nhien_dang', 'Không rõ. Nhưng hàng cuối được ngủ gật mà không ai mắng. Những người ngồi trên phải thức, nên họ thành Thánh.'],
            ['me', 'Ngài không tiếc?'],
            ['nhien_dang', 'Tiếc một chút. Rồi ta có một ngọn đèn, một con đường, mấy đứa đệ tử biết cười. Thánh Nhân ít ai có đủ ba thứ đó.'],
            ['narr', 'Sáu nguồn trong thân ngươi lặng đi cùng lúc, như sáu người vừa ngồi xuống chung một chiếu.'],
            ['nhien_dang', 'Thấy chưa. Đạo không ở trên cao. Nó ở chỗ mọi thứ chịu ngồi yên với nhau.']
        ]
    },

    /* ----- Tam Giới Sinh Lão Bệnh Tử ----- */
    tg_sinh: {
        'go:hoa_qua': [
            ['me', 'Lúc còn là đá, ngươi nghĩ gì?'],
            ['ngo_khong', 'Không nghĩ gì. Chỉ ấm lên mỗi khi nắng chiếu. Ta nằm ấm như thế ba ngàn năm, sướng hơn làm Phật.'],
            ['me', 'Vậy sao lại nứt?'],
            ['ngo_khong', 'Có con chim đậu lên mổ một cái. Chắc nó tưởng trứng. Ta ra đời vì một con chim nhầm.'],
            ['narr', 'Lũ khỉ con nhảy quanh chân ngươi, tranh nhau một quả đào sâu. Con nhỏ nhất thắng, rồi chia cho cả đám.']
        ],
        'gather:thanh_thuy': [
            ['thuy_ba', 'Cậu ngồi ngoài cửa cả đêm mà không hỏi trai hay gái. Người lạ ai cũng hỏi.'],
            ['me', 'Bà đỡ bao nhiêu đứa rồi?'],
            ['thuy_ba', 'Không đếm. Đếm thì phải đếm cả đứa không giữ được. Ta chỉ nhớ đứa nào khóc to.'],
            ['me', 'Đứa này khóc to.'],
            ['thuy_ba', 'Ừ. Khóc to thì đòi sống. Mai mốt lớn chắc lại bỏ làng đi tu tiên, như bao đứa khác. Thôi, cứ để nó đòi.']
        ],
        'go:am_gioi': [
            ['me', 'Tiễn hồn đi mỗi ngày, nương nương có tiếc không?'],
            ['hau_tho', 'Mỗi lần. Hồn nào đi qua cũng để lại cho ta một chút. Hóa ra ta mới là kẻ không được quên.'],
            ['me', 'Thánh Nhân cũng có thứ không quên được.'],
            ['hau_tho', 'Thánh Nhân là kẻ phải nhớ thay người khác. Đi tiếp đi. Sinh dễ, lão mới khó.']
        ]
    },
    tg_lao: {
        'go:am_gioi': [
            ['me', 'Nếu ta quên luôn đường về thì sao?'],
            ['hau_tho', 'Thì ta gọi. Tên con còn ở chỗ ta.'],
            ['me', 'Kiếp mượn thì sống sao cũng được nhỉ.'],
            ['hau_tho', 'Không. Có người sẽ thương con, có người con sẽ làm buồn. Đừng lấy cớ là kiếp mượn mà sống ẩu.'],
            ['narr', 'Nước trong chén màu xám nhạt, không mùi. Uống xong, chỗ đứng dưới chân mềm đi như đất sau mưa.']
        ],
        'gather:van_long': [
            ['narr', 'Trong kiếp đó ngươi có một người vợ hay càu nhàu và một lò rèn không bao giờ đủ than.'],
            ['narr', 'Năm bốn mươi, một thiếu niên tới đặt rèn thanh kiếm đầu đời để lên núi tu tiên. Ngươi rèn kỹ, lấy rẻ. Hắn không bao giờ quay lại.'],
            ['narr', 'Năm sáu mươi, vợ ngươi mất. Từ đó không ai càu nhàu nữa, và lò rèn tự nhiên lạnh hơn.'],
            ['narr', 'Năm bảy mươi hai, ngươi chết trong giấc ngủ. Tỉnh dậy ở Âm Giới, điều đầu tiên ngươi làm là cố nhớ tên bà, và không nhớ nổi.']
        ],
        'go:ngu_trang': [
            ['me', 'Ngài ăn quả Nhân Sâm bao nhiêu lần rồi?'],
            ['tran_nguyen', 'Chưa lần nào. Quả này ta trồng cho khách.'],
            ['me', 'Vì sao?'],
            ['tran_nguyen', 'Vì ta muốn già. Già thì nhớ được ai đã đi qua. Kẻ không già chỉ đứng nhìn người khác già.'],
            ['narr', 'Ông đưa ngươi một quả. Ngươi cầm mà không ăn. Ông cười, như vừa thắng một ván cờ ba ngàn năm.']
        ]
    },
    tg_benh: {
        'hunt:ban_co_dien': [
            ['me', 'Ôn Thần biết mình là bệnh không?'],
            ['hau_nghe', 'Không. Chúng tưởng mình vẫn là Vu tộc. Con kia có cái sẹo trên vai, giống hệt sẹo của Hình Thiên sư huynh.'],
            ['me', 'Ngài đánh chúng mà không nương tay.'],
            ['hau_nghe', 'Nương tay thì dịch xuống được thêm ba làng. Anh em ta chết một lần rồi, ta không để họ giết người thêm lần nữa.'],
            ['narr', 'Xác Ôn Thần tan thành nước đen. Hậu Nghệ cúi xuống, lấy tay áo lau một vệt trên đá, rất chậm.']
        ],
        'gather:co_lac': [
            ['me', 'Bà không giận ta sao?'],
            ['narr', 'Người mẹ lắc đầu. Bà bảo chồng bà là lang trung của trấn, chết tuần trước vì chính trận dịch này. Giờ bà làm thay.'],
            ['me', 'Bà biết sắc thuốc à?'],
            ['narr', 'Bà bảo không. Bà chỉ nhớ chồng bà hay nói một câu: người bệnh cần thấy có ai ngồi cạnh hơn là cần thuốc.'],
            ['narr', 'Đêm thứ tư, ngươi không sắc thuốc nữa. Ngươi đi từ giường này sang giường khác, ngồi mỗi chỗ một lúc.']
        ],
        'go:luu_sa': [
            ['me', 'Bồ Tát có cứu được trấn đó không?'],
            ['quan_am', 'Cứu một mùa. Bình nước của ta có đáy. Con người thì mùa nào cũng bệnh.'],
            ['sa_tang', 'Ta nằm dưới sông này bảy trăm năm, sườn bị kiếm đâm bảy ngày một lần. Đau quen rồi thì thôi kêu, nhưng vẫn đau.'],
            ['me', 'Vậy bệnh lâu thì thành quen?'],
            ['quan_am', 'Thành quen thì người ta thôi kể. Con nhớ đứa bé đó, là con còn chịu nghe kể. Giữ lấy cái đó.']
        ]
    },
    tg_tu: {
        'boss:hh_vo_thuong': [
            ['narr', 'Qua cầu, ngươi đi giữa một hàng hồn dài. Người phía trước là một ông lão lính, áo còn thủng lỗ tên.'],
            ['me', 'Ông có sợ không?'],
            ['narr', 'Ông lão bảo hồi sống sợ cái chết. Giờ chết rồi, chỉ sợ xếp hàng lâu. Rồi ông hỏi ngươi có mang thuốc lá không.'],
            ['me', 'Không có.'],
            ['narr', 'Ông thở dài, bảo dương gian thiếu gì thì Âm Giới cũng thiếu cái đó. Hàng người nhích lên một bước.']
        ],
        'gather:vong_huong': [
            ['me', 'Ta muốn khóc, mà không biết khóc cho ai.'],
            ['dia_tang', 'Vậy nhìn tiếp. Tới khi thấy người ngươi còn nợ.'],
            ['narr', 'Ngươi nhìn lại. Lão Mặc vẫn quét lá. Lão ngẩng lên, đúng về phía Vọng Hương Đài, rồi cúi xuống quét tiếp.'],
            ['me', 'Lão ấy thấy ta.'],
            ['dia_tang', 'Người sống không thấy được đài này. Ta canh ở đây đã lâu. Lão quét lá ấy ngẩng lên không phải lần đầu.']
        ],
        'go:thanh_thuy': [
            ['narr', 'Trẻ con trong làng chơi trò nhảy ô, đúng kiểu ô ngươi từng vẽ. Một đứa nhảy sai, cãi nhau ầm ĩ.'],
            ['narr', 'Con chó vàng đầu ngõ sủa về phía ngươi. Chó thấy được hồn. Nó sủa ba tiếng rồi vẫy đuôi, như nhận ra người quen.'],
            ['me', 'Ít ra còn có một đứa nhớ ta.'],
            ['narr', 'Chó vẫy đuôi với mọi người. Ngươi biết vậy, mà vẫn đứng nhìn nó thêm một lúc.']
        ],
        'go:am_gioi': [
            ['me', 'Chết rồi, ta mới thấy mình chẳng quan trọng lắm.'],
            ['hau_tho', 'Đó là câu đầu tiên của Thánh. Câu thứ hai là: vậy mà vẫn phải làm cho đàng hoàng.'],
            ['me', 'Còn câu thứ ba?'],
            ['hau_tho', 'Câu thứ ba con tự tìm. Ta chỉ biết hai câu, nên ta ở dưới này.']
        ]
    },

    /* ----- Truyện phụ Hồng Hoang ----- */
    hh_tam_tieu: {
        'gather:tiet_giao': [
            ['quynh_tieu', 'Tới khúc thứ chín mà còn nhớ mình đang đi. Đại tỷ, kẻ này lì hơn Quảng Thành Tử.'],
            ['van_tieu', 'Quảng Thành Tử khóc ở khúc thứ năm. Tới giờ hắn vẫn không nhận.'],
            ['me', 'Những thứ trận lấy đi trôi về đâu?'],
            ['bich_tieu', 'Xuống đáy sông. Tam Hoa của mười hai Kim Tiên còn nằm dưới đó. Họ không xuống lấy, vì xuống thì phải nhờ bọn ta.'],
            ['van_tieu', 'Kim Tiên mà, thà mất hoa còn hơn mất mặt.']
        ],
        'boss:hh_hoang_ha': [
            ['me', 'Các vị bày trận này vì sao?'],
            ['quynh_tieu', 'Vì đại ca. Triệu Công Minh bị người ta bắn chết bằng một hình nộm rơm, hai mươi mốt ngày bái một lần.'],
            ['bich_tieu', 'Ba tỷ muội ta đi đòi nợ. Đòi tới mức Thánh Nhân phải ra tay.'],
            ['me', 'Giờ sống lại rồi, còn đòi không?'],
            ['van_tieu', 'Đại ca cũng sống lại rồi. Hôm qua huynh ấy còn vay tiền ta mua rượu. Nợ đó tính sao thì ta chưa biết.']
        ]
    },
    hh_na_tra: {
        'boss:hh_na_tra': [
            ['me', 'Róc thịt trả cha mẹ. Đau không?'],
            ['na_tra', 'Đau. Nhưng nhẹ người. Thân đó là nợ, trả xong thì thân sen này là của ta.'],
            ['ly_tinh', 'Còn ta thì không trả được gì. Tòa tháp này Nhiên Đăng cho mượn. Mượn thì phải có ngày trả.'],
            ['me', 'Ngày nào?'],
            ['ly_tinh', 'Ông ấy cười bảo khi nào thằng bé không còn giận thì đem về.'],
            ['na_tra', 'Vậy cha đem về đi. Con không còn giận.'],
            ['narr', 'Lý Tịnh đặt tòa tháp xuống bậc đá. Tháp nặng tới mức bậc đá nứt một đường. Ông nhìn đôi tay rỗng của mình rất lâu.'],
            ['ly_tinh', 'Ba ngàn năm, ta quên mất tay mình để làm gì khác.'],
            ['na_tra', 'Để vỗ vai con. Cha thử xem, con không đốt đâu.']
        ]
    },
    hh_duong_tien: {
        'hunt:nam_thien_mon': [
            ['me', 'Lệnh cũ ghi gì?'],
            ['duong_tien', 'Bắt về, khóa lại, đóng dấu. Không ghi tội. Tiên nô trốn thì không cần tội.'],
            ['me', 'Dấu này là của Hạo Thiên?'],
            ['duong_tien', 'Dấu của cậu ta màu đỏ. Dấu trên lệnh này màu đen, nhỏ bằng móng tay, đóng ở góc. Ta chưa từng thấy ai cầm con dấu đó.'],
            ['narr', 'Lá lệnh trong tay ngươi cháy xém cả bốn mép. Riêng chỗ mực đen ở góc thì lửa không bén.']
        ],
        'gather:nam_thien_mon': [
            ['me', 'Vì sao ngài không nghe chiếu chỉ của cậu mình?'],
            ['duong_tien', 'Mẹ ta là em gái hắn. Lấy chồng phàm, bị hắn đè dưới Đào Sơn. Ta bổ núi cứu mẹ, từ đó chiếu của hắn đọc lên ta chỉ nghe thấy tiếng gió.'],
            ['me', 'Hắn không phạt ngài?'],
            ['duong_tien', 'Hắn cần người gác cổng giỏi. Ta cần cái cổng để nhìn. Hai cậu cháu nhịn nhau ba ngàn năm, gọi là hòa thuận.'],
            ['narr', 'Hao Thiên Khuyển gác cằm lên chân ngươi, ngủ. Cổng trời im tới mức nghe được tiếng mây trôi.']
        ]
    },
    hh_wk_1: {
        'hunt:hoa_qua': [
            ['narr', 'Trong hang ma vương có mấy chục chiếc lồng tre. Lũ khỉ con trong đó gầy rộc, không con nào kêu.'],
            ['me', 'Nó bắt chúng để làm gì?'],
            ['narr', 'Một con khỉ già khai: ma vương dạy chúng cầm giáo, để lập một đội quân. Con nào không học được thì bị ăn.'],
            ['narr', 'Ngươi phá lồng. Lũ khỉ chạy ra, rồi quay lại nhặt mấy cây giáo gãy, ôm về núi.'],
            ['ngo_khong', '(Trong lông) Về sau ta cũng lập quân khỉ. Học của chính kẻ ta vừa đánh. Đời ngộ thế đấy.']
        ],
        'gather:hoa_qua': [
            ['narr', 'Ở Phương Thốn Sơn ngươi học được phép biến. Một hôm khoe với sư huynh, ngươi hóa thành cây tùng giữa sân.'],
            ['narr', 'Sư phụ đi ra, nhìn cây tùng, nhìn đám đệ tử đang vỗ tay. Ông không mắng. Ông bảo ngươi thu dọn đồ.'],
            ['me', 'Chỉ vì biến một cây tùng?'],
            ['narr', 'Ông bảo phép không có lỗi. Lỗi là đem ra cho người ta xem. Kẻ thích được xem thì sớm muộn cũng bị bắt.'],
            ['ngo_khong', 'Lời đó ta nhớ năm trăm năm sau, khi nằm dưới núi. Lúc đi thì ta chỉ thấy ông già khó tính.']
        ]
    },
    hh_wk_2: {
        'boss:hh_thien_binh': [
            ['narr', 'Trong vườn Bàn Đào, rễ mỗi gốc cây cắm vào một ống đồng. Ống chạy xuyên mây, xuống phía hạ giới.'],
            ['me', 'Đào tiên lớn bằng gì?'],
            ['narr', 'Một tiên đồng giữ vườn run quá, khai thật: cây hút từ dưới lên. Ba ngàn năm một quả, mỗi quả bằng một vùng đất gầy.'],
            ['narr', 'Ngươi cắn một miếng. Ngọt. Rồi nhớ tới ruộng khô ở Phàm Giới, và nuốt không trôi.'],
            ['narr', 'Ngươi ăn hết cả vườn, không phải vì tham. Chỉ là không muốn ai được ăn nữa.']
        ],
        'boss:hh_duong_tien': [
            ['ngo_khong', '(Trong lông) Trận này ta thua, nhưng không ghét Dương Tiễn. Hắn đánh mà không nói một câu nào của Thiên Đình.'],
            ['me', 'Trong lò thì sao?'],
            ['ngo_khong', 'Nóng. Nhưng ta nghe Lão Quân ngồi ngoài ngáp, rồi ngáy. Ông ta không thèm canh lửa.'],
            ['me', 'Vậy ai canh?'],
            ['ngo_khong', 'Không ai. Lửa tự cháy. Bốn mươi chín ngày, ta đạp lò ra, ông ta vẫn ngồi đó, mở một mắt nhìn ta, rồi ngủ tiếp.']
        ]
    },
    hh_wk_3: {
        'gather:ngu_hanh': [
            ['narr', 'Có một tiều phu hay tới ngồi cạnh tảng đá ăn cơm nắm, kể chuyện làng dưới núi. Ngươi không trả lời, ông vẫn kể.'],
            ['narr', 'Năm thứ bốn trăm, ông không tới nữa. Con trai ông tới, rồi tới cháu ông. Đứa cháu đem theo cả cơm nắm cho ngươi.'],
            ['me', 'Ba đời người, ta vẫn nằm đây.'],
            ['narr', 'Đứa cháu hỏi ngươi có phải yêu quái không. Ngươi bảo phải. Nó gật gù, bảo yêu quái gì mà nằm hiền thế.'],
            ['narr', 'Đêm đó ngươi khóc lần đầu tiên dưới núi. Nước mắt khỉ chảy vào kẽ đá, mùa sau mọc lên một bụi hoa dại.']
        ],
        'go:ngu_hanh': [
            ['me', 'Vòng kim cô có đau không?'],
            ['ngo_khong', 'Đau lúc thầy niệm. Mà thầy chỉ niệm khi ta đánh người không đáng đánh. Tính ra ta đáng bị đau.'],
            ['quan_am', 'Con nhận thế là đã hơn nhiều người tu trăm năm.'],
            ['ngo_khong', 'Bồ Tát đừng khen. Khen thì ta lại muốn đi đánh ai đó cho vui.'],
            ['narr', 'Quan Âm cười, vẩy một giọt nước từ cành dương. Bụi hoa dại dưới chân núi nở thêm một bông.']
        ]
    },
    hh_wk_4: {
        'go:quang_han': [
            ['me', 'Hắn say thật, hay mượn rượu?'],
            ['hang_nga', 'Say thật. Nhưng câu hắn nói lúc say không phải câu trêu. Hắn bảo ta đừng ở cung trăng một mình nữa, ở đây lạnh.'],
            ['me', 'Câu đó mà bị đày?'],
            ['hang_nga', 'Vì hắn nói to, trước mặt cả triều. Hắn bảo cung trăng là chỗ nhốt người. Không ai được nói vậy về cung trăng.'],
            ['narr', 'Ngoài sân, thỏ ngọc vẫn giã thuốc. Thuốc giã mãi không xong, như cái cớ để khỏi phải ngẩng lên.']
        ],
        'boss:hh_sa_tang': [
            ['me', 'Một chén lưu ly mà phạt nặng thế?'],
            ['sa_tang', 'Đêm đó yến tiệc vui quá. Thiên Bồng cười to ở bàn bên, ta giật mình đánh rơi chén. Cùng một đêm, hai đứa bị đày.'],
            ['me', 'Vậy hai người quen nhau từ trước.'],
            ['sa_tang', 'Quen tiếng cười. Lúc gặp lại ở đội thỉnh kinh, hắn cười, ta nhận ra liền. Ta suýt đánh hắn.'],
            ['narr', 'Sa Tăng lau cây trượng, ngước nhìn về phía đội ngũ đang chờ. Gã heo vẫy tay, tay kia vẫn cầm cái bánh.']
        ],
        'boss:hh_tam_ma_81': [
            ['me', 'Nạn nào khó nhất?'],
            ['bat_gioi', 'Không phải yêu. Là lúc sư phụ đuổi đại sư huynh. Thầy trò mà như người dưng một buổi chiều.'],
            ['me', 'Rồi sao?'],
            ['bat_gioi', 'Rồi đại sư huynh về. Không ai xin lỗi ai. Cứ thế đi tiếp, vì đường còn dài hơn cái giận.'],
            ['narr', 'Dọc đường ngươi để ý: nhiều yêu quái ăn thịt người là thú cưỡi, đồng tử của các vị trên trời lẻn xuống.'],
            ['bat_gioi', 'Đánh xong là chủ nó xuống xin về. Mười lần thì chín lần như vậy. Lần thứ mười là yêu thật, đánh chết không ai đòi.']
        ]
    },
    hh_wk_5: {
        'gather:tay_giao': [
            ['me', 'Ngươi mất những gì?'],
            ['ngo_khong', 'Mất Hoa Quả Sơn một thời, mất cái tên Tề Thiên, mất năm trăm năm. Còn lại cây gậy với một ông thầy hay khóc.'],
            ['me', 'Có hối hận không?'],
            ['ngo_khong', 'Không. Mất hết rồi mới thấy rõ chỗ mình đứng. Đứng trên chẳng có gì thì không ai lay được.'],
            ['kim_thien', 'Từ hôm thành Phật, nó dùng gậy Như Ý để chống đi hái đào. Bảy tấn sắt mà làm gậy chống.'],
            ['ngo_khong', 'Thầy nói thế là chê hay khen?'],
            ['kim_thien', 'Khen. Thầy chưa từng thấy ai đánh khắp trời đất xong lại chịu cầm gậy cho đúng chỗ.'],
            ['narr', 'Con khỉ gãi đầu, chỗ vòng kim cô cũ. Thói quen vẫn còn, dù vòng đã không còn.']
        ]
    },
    hh_kts_1: {
        'gather:sinh_tu': [
            ['me', 'Chín kiếp đó là những ai?'],
            ['phan_quan', 'Một con trai thợ gốm. Một hoàng tử. Một gã ăn mày. Một nhà sư mù. Kiếp nào cũng tự rời nhà đi về phía tây, không ai bảo.'],
            ['me', 'Kiếp nào sống lâu nhất?'],
            ['phan_quan', 'Gã ăn mày. Ba mươi tư năm. Hắn đi chậm nhất, vì cứ dừng lại chia cơm cho người khác.'],
            ['hau_tho', 'Kiếp đó lúc xuống đây, hắn còn hỏi ta có đói không. Ta là Thánh, mà bị một gã ăn mày hỏi đói.']
        ],
        'go:luu_sa': [
            ['me', 'Ngươi ăn hắn chín lần mà không biết?'],
            ['sa_tang', 'Biết từ lần thứ ba. Lần thứ tư ta thử không ăn, thả hắn qua sông. Hôm sau hắn chết đuối ở khúc dưới.'],
            ['me', 'Vậy sao vẫn ăn?'],
            ['sa_tang', 'Không ăn thì hắn cũng chết. Ăn thì ta giữ được đầu hắn, để nhớ hắn từng tới.'],
            ['narr', 'Chín chiếc đầu lâu trên cổ gã va vào nhau, kêu lách cách như chuông gió treo hiên.']
        ]
    },
    hh_kts_2: {
        'gather:tay_giao': [
            ['me', 'Lúc ngủ gật trong buổi giảng, ngài mơ gì?'],
            ['kim_thien', 'Mơ thấy mình ngồi hàng đầu, nghe rõ từng chữ. Tỉnh dậy thì Phật Tổ đã giảng xong.'],
            ['me', 'Mười kiếp chỉ vì một giấc mơ.'],
            ['kim_thien', 'Mười kiếp vì một giấc mơ tưởng mình đã hiểu. Ta ngủ không có tội. Ta tỉnh dậy mà tưởng mình đã nghe, đó mới là tội.'],
            ['narr', 'Thuyền không đáy cập bến. Cái xác mang mặt ngươi đã trôi khuất, không để lại vệt nước nào.']
        ],
        'go:tay_giao': [
            ['me', 'Kim Thiền Tử về rồi, giờ làm gì?'],
            ['nhien_dang', 'Ngồi giảng kinh. Mười kiếp đi lấy kinh, cuối cùng chỉ để có người ngồi giảng cho tử tế.'],
            ['kim_thien', 'Lần đầu lấy về toàn kinh không chữ. Đó mới là bộ thật. Bộ có chữ là bộ ta phải đổi bằng cái bát vàng.'],
            ['me', 'Đổi với ai?'],
            ['kim_thien', 'Hai vị giữ kho. Họ bảo kinh không thể cho không. Cái bát đó của vua Đường cho ta, giờ chắc họ dùng ăn cơm.']
        ]
    },
    hh_tam_the: {
        'go:tay_giao': [
            ['me', 'Ngài không giành được ghế, vậy ai được?'],
            ['nhien_dang', 'Những người đến sớm và đúng lúc. Hồng Vân đến sớm mà nhường, nên chết sớm.'],
            ['me', 'Ngài có muốn ngồi không?'],
            ['nhien_dang', 'Lúc đó muốn lắm. Giờ thì mừng. Ngồi trên đó, ta đã không có thời gian làm ngọn đèn.'],
            ['di_lac', 'Cổ Phật nói như than, mà mặt thì hơi hả hê.']
        ],
        'gather:tay_giao': [
            ['me', 'Vị Lai có thấy tương lai không?'],
            ['di_lac', 'Thấy một khúc. Nặng lắm, nên ta phải cười cho nhẹ. Cái bụng này là chỗ ta để những thứ chưa xảy ra.'],
            ['me', 'Trong bụng ngài có ta không?'],
            ['di_lac', 'Có. Nằm cạnh một cái bánh bao. Đừng hỏi cái nào quan trọng hơn.'],
            ['nhien_dang', 'Hắn lại thế. Ba ngàn năm nay hắn chưa trả lời ai câu nào cho thẳng.']
        ]
    },
    hh_nhu_lai: {
        'gather:linh_son': [
            ['me', 'Phần ở lại Đa Bảo Thị bán gì?'],
            ['nhu_lai', 'Những thứ trôi dạt. Đắt nhất là bụi tím. Nó trôi từ ngoài trời vào, nhặt được bao nhiêu thì bán bấy nhiêu.'],
            ['me', 'Bụi đó là Hồng Mông Tử Khí?'],
            ['nhu_lai', 'Mảnh vụn của nó. Nguồn thật ở rất xa, qua Hỗn Độn Hải Tâm, giữa con mắt của một biển xám. Ta chưa từng đi tới.'],
            ['me', 'Phật Tổ mà vẫn buôn?'],
            ['nhu_lai', 'Phần Đa Bảo của ta chưa thôi buôn. Phần Như Lai thì ngồi đây. Ta chưa biết phần nào mới là ta.'],
            ['thong_thien', 'Phần nào cũng là đồ đệ ta. Về uống chén rượu, hai phần ngồi chung một bàn cho ta xem.'],
            ['narr', 'Như Lai không trả lời. Tay ông vô thức vuốt mép áo cà sa, động tác của người quen đếm tiền.']
        ]
    },
    hh_vu_yeu: {
        'go:quang_han': [
            ['me', 'Thuốc đó ai cho?'],
            ['hang_nga', 'Tây Vương Mẫu. Bà cho chàng hai phần. Uống một phần thì sống lâu, uống cả hai thì lên trời.'],
            ['me', 'Bà ấy muốn Hậu Nghệ lên trời?'],
            ['hang_nga', 'Bà muốn rút chàng khỏi Vu tộc. Đại Vu lên trời thì dưới đất bớt một người mạnh. Ta uống cả hai, để chàng khỏi phải chọn.'],
            ['narr', 'Nàng nhìn xuống một ngọn núi trọc ở Phàm Giới. Nơi Hậu Nghệ từng đứng bắn mặt trời, giờ chỉ còn đá.']
        ],
        'boss:hh_ban_co_ao': [
            ['me', 'Mười hai Tổ Vu hợp lại. Ai đứng giữa trận?'],
            ['de_giang', 'Ta. Ta là kẻ nhanh nhất, nên phải đứng chỗ không được chạy. Hậu Thổ đứng sau lưng ta, lần cuối cùng còn có thân.'],
            ['me', 'Cộng Công vì sao đâm núi?'],
            ['de_giang', 'Thua Chúc Dung một trận, giận quá. Vu tộc giận thì không nghĩ. Một cái đầu cứng đổi lấy một lỗ thủng trên trời.'],
            ['hau_nghe', 'Hắn tỉnh lại thì Nữ Oa đã vá xong. Hắn tới xin lỗi, bà cho hắn một bát cơm, bảo ăn đi rồi về.']
        ],
        'go:yeu_dinh': [
            ['me', 'Thiên Đình được dựng lại cho ai ngồi?'],
            ['de_tuan', 'Cho một đồng tử từng giữ cửa cho Đạo Tổ. Hắn hiền, không biết đánh, không biết hỏi. Ngai đó cần đúng một người như thế.'],
            ['thai_nhat', 'Bọn ta đánh nhau mười vạn năm để dọn chỗ cho một đứa giữ cửa.'],
            ['me', 'Ngài có hận không?'],
            ['de_tuan', 'Có lúc. Rồi ta nghĩ, ít ra hắn không đốt đất của ai. Ngồi ghế mà không làm gì, có khi là tài.']
        ]
    },
    hh_kim_o: {
        'gather:phu_tang': [
            ['me', 'Chín ngọn đèn cháy bằng gì?'],
            ['yeu_hoang', 'Bằng lửa của chín anh ta. Ta giữ từ hôm đó. Năm nào lửa cũng nhỏ đi một chút.'],
            ['me', 'Ngài từng nghĩ tới chuyện trả thù Hậu Nghệ?'],
            ['yeu_hoang', 'Từng. Ta bay tới tận chỗ ông ấy. Ông đang tưới mấy luống rau, lưng còng. Ta về.'],
            ['me', 'Vì sao mười anh em cùng ra một lượt?'],
            ['yeu_hoang', 'Vì mẹ ta đi vắng. Mỗi ngày một đứa, mẹ dặn vậy. Hôm đó anh cả bảo đi cả mười cho vui. Bọn ta mới chín trăm tuổi, còn nhỏ.'],
            ['narr', 'Yêu Hoàng nói xong thì im. Lửa trên chín ngọn đèn cùng run lên một lúc.'],
            ['yeu_hoang', 'Ta là đứa chạy sau cùng, vì ngủ dậy muộn. Mười vạn năm nay, ta chưa từng ngủ quá giờ nữa.']
        ]
    },
    hh_dia_tang: {
        'hunt:nai_ha': [
            ['me', 'Quỷ sai nhận đút lót để làm gì? Ở đây có gì mà mua?'],
            ['dia_tang', 'Mua chỗ đầu thai. Nhà giàu, thân khỏe, mặt đẹp. Đi tắt qua cầu thì được chọn trước.'],
            ['me', 'Hồn nghèo thì sao?'],
            ['dia_tang', 'Thì nhận phần còn lại. Có hồn xếp hàng ba lần, ba lần đầu thai làm trâu.'],
            ['narr', 'Một quỷ sai quỳ xuống khóc, bảo hắn cũng từng là hồn nghèo, làm quỷ sai để khỏi phải làm trâu nữa.'],
            ['dia_tang', 'Ta biết. Vì vậy ta không đuổi ngươi. Từ mai ngươi đứng cuối hàng, đỡ các cụ lên cầu.'],
            ['narr', 'Đế Thính dưới chân Địa Tạng mở một mắt, nhìn tên quỷ sai, rồi nhắm lại như đã nghe đủ.']
        ]
    },

    /* ----- Thiên Ma Ngoại Vực ----- */
    hh_ma_can_khon: {
        'gather:van_gioi': [
            ['me', 'Lão gom những bầu trời này để làm gì?'],
            ['can_khon', 'Để chúng có chỗ nằm. Ba ngàn Ma Thần, mỗi kẻ có một bầu trời riêng. Trời mở ra thì những bầu trời nhỏ vỡ hết.'],
            ['me', 'Lão gom được bao nhiêu?'],
            ['can_khon', 'Hai ngàn tám trăm. Ta xếp theo tuổi. Hòn này của Thời Thần, hắn còn sống mà không biết ta giữ.'],
            ['narr', 'Lão đưa ngươi một hòn đá nhỏ. Bên trong mưa rơi ngược, từ đất lên mây.'],
            ['can_khon', 'Của một kẻ thích mưa. Chết từ trước khi có chữ để ghi tên. Ta chỉ nhớ hắn hay ngồi ướt.']
        ],
        'boss:hh_can_khon': [
            ['me', 'Vì sao ta không bổ?'],
            ['can_khon', 'Vì ngươi không cần trên dưới. Bàn Cổ cần, nên phải bổ. Kẻ mở trời thì không để ai đứng ngoài trời của mình.'],
            ['me', 'Lão có hận ông ấy không?'],
            ['can_khon', 'Hận thì ta đã chết. Ta chỉ tiếc. Đá trong giỏ ta toàn là trời của bạn cũ.'],
            ['narr', 'Lão cất hòn đá mưa ngược vào chỗ sâu nhất của giỏ, vuốt nhẹ như vuốt đầu một đứa trẻ.']
        ]
    },
    hh_ma_am_duong: {
        'gather:luan_hoi': [
            ['me', 'Luân Hồi Hải rộng đến đâu?'],
            ['am_duong_to', 'Bằng mọi kẻ từng chết. Âm Giới của Hậu Thổ chỉ là một cái giếng nhỏ múc từ đây.'],
            ['me', 'Nàng biết lão không?'],
            ['am_duong_to', 'Biết. Nàng mượn nước của ta mà không trả tiền. Ta cũng không đòi. Cái giếng đó giữ được nhiều hồn hơn cả biển.'],
            ['me', 'Biển mà thua giếng?'],
            ['am_duong_to', 'Biển rộng thì ai cũng chìm như nhau. Giếng nhỏ thì người giữ giếng nhớ được mặt từng hồn.']
        ],
        'boss:hh_am_duong': [
            ['me', 'Hai nửa mặt của lão có cãi nhau không?'],
            ['am_duong_to', 'Ngày nào cũng cãi. Nửa sáng muốn chở người về bờ sống, nửa tối muốn chở sang bờ chết. Vì thế đò ta cứ ở giữa sông.'],
            ['me', 'Vậy ai được qua?'],
            ['am_duong_to', 'Kẻ tự chèo. Như ngươi vừa rồi.'],
            ['narr', 'Nước dưới thuyền vẫn hai màu. Riêng chỗ mạn đò ngươi ngồi có một vệt xám, nơi hai màu vừa chạm vào nhau.']
        ]
    },
    hh_ma_thoi_than: {
        'gather:tinh_mo': [
            ['me', 'Quét ngược mỗi ngày, lão không mệt sao?'],
            ['thoi_than', 'Mệt. Nhưng ta là thời gian, mệt thì cũng chỉ chậm lại một chút. Chậm lại thì những ngôi mộ này chết lâu hơn.'],
            ['me', 'Mộ của ai?'],
            ['thoi_than', 'Của những vì sao. Sao cũng chết, như người. Chỉ là không ai khóc, nên ta quét cho chúng.'],
            ['narr', 'Một ngôi mộ dưới chổi lão sáng lên chốc lát, như vì sao trong đó vừa mở mắt nhìn ngươi rồi ngủ lại.']
        ],
        'boss:hh_thoi_than': [
            ['me', 'Có bậc thềm nào lão không quét?'],
            ['thoi_than', 'Một bậc. Ở cuối dãy. Có một kẻ đã từ chỗ cao nhất bước xuống, đặt chân lên đó, rồi đi mất. Bỏ lại cả tên.'],
            ['me', 'Vì sao không quét?'],
            ['thoi_than', 'Quét ngược thì hắn phải quay lên. Hắn xuống được là việc khó nhất ta từng thấy, ta không dám làm hỏng.'],
            ['narr', 'Ngươi nhìn về cuối dãy mộ. Bậc thềm đó không có bụi, như vừa có ai lau sáng nay.']
        ]
    },
    hh_ma_duong_mi: {
        'gather:hu_nhan': [
            ['me', 'Liễu mọc trên khoảng cách thì rễ ở đâu?'],
            ['duong_mi', 'Ở giữa hai thứ cách nhau. Ngươi với nơi ngươi lớn lên cách bao xa, rễ dài bấy nhiêu.'],
            ['me', 'Vậy cây của ta chắc cao lắm.'],
            ['duong_mi', 'Không. Rễ dài thì cây thấp. Cây cao là của những kẻ chưa từng đi đâu.'],
            ['narr', 'Gã chỉ vào một cây liễu cao vút. Gã bảo đó là cây của chính gã, trồng ở đây mười vạn năm, chưa bước ra khỏi vườn.']
        ],
        'boss:hh_duong_mi': [
            ['me', 'Ngài già hơn La Hầu. Vì sao không ai biết tên ngài?'],
            ['duong_mi', 'Vì ta không đánh ai. Kẻ không đánh ai thì không có trong truyện. Truyện chỉ chép kẻ thắng và kẻ thua.'],
            ['me', 'Giờ ngài thua ta rồi, thành có trong truyện.'],
            ['duong_mi', 'Hỏng thật. Ngươi kể nhẹ tay thôi.'],
            ['narr', 'Cành liễu trong tay ngươi nảy một chồi non. Chồi nghiêng về phía nơi ngươi lớn lên, rất xa.']
        ]
    },
    hh_ma_la_hau: {
        'gather:ma_vuc': [
            ['me', 'Ngài tranh đạo với Hồng Quân vì gì?'],
            ['la_hau', 'Vì một cuốn sổ. Hắn bảo phải có sổ thì mới có trật tự. Ta bảo có sổ thì sẽ có kẻ giữ sổ.'],
            ['me', 'Ai đúng?'],
            ['la_hau', 'Cả hai. Có trật tự thật. Và có kẻ giữ sổ thật. Chỉ là kẻ đó không phải Hồng Quân, hắn cũng chỉ là người chép.'],
            ['narr', 'Hắn rót cho ngươi một chén nước đen, đặc như mực. Rồi tự uống chén của mình một hơi, như uống thuốc đắng.'],
            ['la_hau', 'Uống đi. Nước Ma Vực. Không ngon, nhưng chưa ai ghi được nó vào sổ.']
        ],
        'boss:hh_la_hau': [
            ['me', 'Người ta bảo Ma Tổ muốn diệt thế.'],
            ['la_hau', 'Người ta là những kẻ đọc sổ. Ta muốn đốt sổ, nên trong sổ ta là kẻ diệt thế.'],
            ['me', 'Thua rồi, sao còn ngồi đây?'],
            ['la_hau', 'Để canh. Chỗ ta ngồi là một cửa ra ngoài. Có những ống chảy qua đây, cắt được bao nhiêu thì ta cắt.'],
            ['narr', 'Sau lưng hắn là những ống đồng bị chém đứt, đầu ống gỉ sét. Bên trong vẫn rỉ ra chút linh khí nhạt màu, chảy ngược về phía Tam Giới.']
        ]
    },
    hh_ma_ban_co: {
        'gather:khai_thien': [
            ['me', 'Phần trôi ra ngoài giờ ở đâu?'],
            ['ban_co', 'Thành Ma Thần. Nửa ta nằm trong trời, nửa ta lang thang ngoài trời. Nửa ngoài kia không có thân, nên lúc nào cũng đói.'],
            ['me', 'Đế Giang nói máu ngài còn nóng.'],
            ['ban_co', 'Nó giữ máu ta. Tiên Giới đứng trên một mạch máu ta đã nguội. Đá linh trên đó là máu đông của ta.'],
            ['me', 'Ngài biết mà không dậy?'],
            ['ban_co', 'Dậy thì trời sập. Ta bổ nó ra rồi phải nằm đỡ nó. Ngươi tưởng ta ngủ, ta đang chống.']
        ],
        'boss:hh_ban_co': [
            ['me', 'Ba đứa con của ngài, Tam Thanh, giờ vẫn hay cãi nhau.'],
            ['ban_co', 'Ta biết. Một ý nghĩ chia làm ba thì cãi là phải. Còn đánh nhau không?'],
            ['me', 'Không. Lão đại ngủ, lão nhị chép sổ, lão tam uống rượu.'],
            ['ban_co', 'Vậy là tốt hơn ta. Ta với Ma Thần thì đánh tới khi trời mở.'],
            ['narr', 'Quả núi thở ra lần nữa. Lần này chỉ mất một ngày, như vừa nhẹ đi một chút.']
        ]
    },

    /* ----- Âm Giới ----- */
    am_manh_ba: {
        'hunt:manh_ba': [
            ['me', 'Ngạ Quỷ cướp canh mà không biết canh để làm gì.'],
            ['manh_ba', 'Đói thì cái gì nóng cũng là cơm. Mấy đứa này hồi sống chết đói, hồn cũng đói theo.'],
            ['me', 'Bà có cho chúng ăn không?'],
            ['manh_ba', 'Có. Ta nấu một nồi cháo riêng, không bỏ lá quên. Ăn no thì chúng nhớ ra mình là ai, tự xếp hàng.'],
            ['narr', 'Một con Ngạ Quỷ gầy nhất ngồi xổm cạnh nồi cháo, ăn từng muỗng nhỏ như sợ hết.']
        ],
        'gather:vong_xuyen': [
            ['me', 'Bà có bao giờ uống canh của mình không?'],
            ['manh_ba', 'Chưa. Người nấu mà quên thì nêm sai. Ta phải nhớ mặt từng người, để biết ai cần mặn, ai cần nhạt.'],
            ['me', 'Canh cũng có mặn nhạt?'],
            ['manh_ba', 'Người khổ nhiều thì cần canh đậm. Người sống sướng thì một ngụm là quên. Ông lão này đậm vừa thôi, cho ông giữ câu hát.'],
            ['narr', 'Ông lão uống canh rồi bước lên cầu. Tới giữa cầu, ông vẫn ngân nho nhỏ, sai một chữ.']
        ]
    },
    am_thap_dien: {
        'gather:phong_do': [
            ['me', 'Ai định giá vàng mã?'],
            ['narr', 'Chủ chợ Phong Đô bảo giá theo mùa. Tết trên dương gian người ta đốt nhiều, vàng mã rẻ như lá. Tháng bảy thì đắt.'],
            ['narr', 'Hắn chỉ cho ngươi một quầy bán nhà giấy, ô tô giấy, cả người hầu giấy. Hồn nhà giàu dưới này cũng có người hầu.'],
            ['me', 'Người hầu giấy có hồn không?'],
            ['narr', 'Chủ chợ cười, bảo có. Hồn của những kẻ không ai cúng, được thuê vào làm người giấy, đổi lấy một bữa.']
        ],
        'hunt:thap_dien': [
            ['me', 'Phán quan ăn vàng mã để làm gì? Chết rồi giàu để đâu?'],
            ['diem_vuong', 'Để mua canh quên loại đặc. Canh Mạnh Bà thì miễn phí, nhưng có loại quên nhanh hơn, giá cao.'],
            ['me', 'Họ muốn quên gì?'],
            ['diem_vuong', 'Những án họ đã xử sai. Âm Ty cũng có người không chịu nổi việc của chính mình.'],
            ['me', 'Ngài có muốn quên án nào không?'],
            ['diem_vuong', 'Có. Vì vậy ta không uống. Người xử án mà quên án sai thì sẽ xử sai lần nữa.']
        ]
    },
    am_sinh_tu: {
        'hunt:sinh_tu': [
            ['me', 'Sổ Linh là gì?'],
            ['phan_quan', 'Là những dòng tên bị gạch. Gạch rồi thì chữ không mất, nó thành thứ này, đi canh chỗ trống của mình.'],
            ['me', 'Vậy con khỉ kia tạo ra cả đàn.'],
            ['phan_quan', 'Hơn ba trăm đứa. Cả họ nhà khỉ Hoa Quả Sơn. Đứa nào cũng nhảy nhót như chủ.'],
            ['narr', 'Một con Sổ Linh tan ra, để lại một chữ "Hầu" cháy dở. Nó còn cố gãi tai trước khi tắt.']
        ],
        'gather:sinh_tu': [
            ['me', 'Ai lau dòng ngày chết của ta?'],
            ['phan_quan', 'Không phải ta. Sổ này có những trang ta không với tới. Dòng của ngươi nằm ở mép, gần chỗ đó.'],
            ['me', 'Chỗ đó là đâu?'],
            ['phan_quan', 'Trang cuối. Trang cuối Sổ Sinh Tử là bản chép từ một cuốn sổ khác, to hơn, ở ngoài Tam Giới. Ta chỉ được giữ bản chép.'],
            ['me', 'Ông có bao giờ muốn xem bản gốc?'],
            ['phan_quan', 'Ta là người giữ sổ, không phải người đọc sổ. Nhưng nếu ngươi thấy nó, nhớ xem trang của ngươi ở bản đó có nhòe như ở đây không.']
        ]
    },
    am_dia_nguc: {
        'hunt:dia_nguc': [
            ['me', 'Hắn gõ vào vách vì gì?'],
            ['dia_tang', 'Đếm ngày. Hắn không có tội đáng xuống tầng mười tám. Sổ ghi hắn tội phản chủ.'],
            ['me', 'Phản ai?'],
            ['dia_tang', 'Phản một tông môn. Hắn là trưởng làng, không chịu nộp trẻ trong làng cho tông môn đó làm đồng tử luyện đan. Tông môn viết đơn xuống.'],
            ['narr', 'Trên vách, những vết gõ xếp thành hàng dài. Cuối hàng có một vòng tròn nhỏ, ông vẽ thay cho mặt trời.']
        ],
        'gather:vong_huong': [
            ['me', 'Quê hắn còn không?'],
            ['dia_tang', 'Còn. Mấy đứa trẻ năm đó giờ đã có cháu. Không đứa nào biết ông.'],
            ['narr', 'Người trưởng làng nhìn rất lâu. Rồi ông bảo vậy là được, không biết thì khỏi phải buồn.'],
            ['me', 'Giờ hắn đi đâu?'],
            ['dia_tang', 'Đầu thai. Ta xin Hậu Thổ cho hắn về lại làng đó, làm con của một trong mấy đứa trẻ năm xưa.']
        ]
    },
    am_cuu_u: {
        'hunt:cuu_u': [
            ['me', 'Vì sao chúng lạnh tới mức quên tên?'],
            ['hau_tho', 'Vì không ai gọi. Hồn còn người nhớ thì ấm. Cửu U chứa những kẻ cả làng đều chết, không còn ai thắp hương.'],
            ['me', 'Cả làng chết vì gì?'],
            ['hau_tho', 'Lũ, dịch, chiến tranh. Con kể một lý do bất kỳ, Cửu U đều có.'],
            ['narr', 'Trong sương có một tiếng gọi lặp lại nhiều lần. Đó là tên một ngôi làng, không phải tên người.']
        ],
        'gather:bi_ngan': [
            ['me', 'Hoa Bỉ Ngạn có bao giờ tàn không?'],
            ['hau_tho', 'Hoa không có lá, lá không có hoa. Hai thứ không bao giờ gặp nhau. Ta trồng nó vì giống người với người dưới này.'],
            ['me', 'Nghe buồn quá.'],
            ['hau_tho', 'Buồn thì mới nhớ. Ta không trồng thứ gì vui ở đây, vui thì người ta quên nhanh.'],
            ['narr', 'Một hồn nhỏ qua hoa hỏi ngươi tên gì. Ngươi nói {name}. Nó lặp lại mấy lần, như học thuộc, rồi tự nhớ ra tên mình.']
        ]
    },
    am_minh_ha: {
        'hunt:tu_la': [
            ['me', 'A Tu La sợ bị quên vì sao?'],
            ['minh_ha_to', 'Vì Tam Giới không có chỗ cho chúng. Không thuộc trời, không thuộc người, không thuộc quỷ.'],
            ['me', 'Vậy thì tự do.'],
            ['minh_ha_to', 'Ngươi nói hay. Chúng không nghĩ thế. Chúng muốn có tên trong một cái gì đó, như mọi kẻ khác.'],
            ['narr', 'Một chiến sĩ A Tu La lau máu, khắc tên mình lên đá. Viết sai một nét, xóa, khắc lại.']
        ],
        'boss:hh_minh_ha': [
            ['me', 'Ngài với Hậu Thổ là kẻ thù?'],
            ['minh_ha_to', 'Là hàng xóm. Năm đó ta cũng muốn làm Luân Hồi. Nàng nhanh hơn, vì nàng chịu mất thân. Ta tiếc thân.'],
            ['me', 'Ngài có hối hận không?'],
            ['minh_ha_to', 'Mỗi lần nhìn nàng đứng giữa Lục Đạo, ta thấy may. Nhìn lại biển máu của ta, ta thấy cũng may. Hai cái may, khó nói.'],
            ['narr', 'Huyết Hải dâng một con sóng đỏ, liếm qua chân ngươi rồi lùi lại, như một con chó lớn đánh hơi khách.']
        ]
    },
    am_vo_gian: {
        'hunt:vo_gian': [
            ['me', 'Ngài là phần đã ở lại. Ngài có nhớ phần trên kia không?'],
            ['narr', 'Cái bóng không ngừng tụng. Nó chỉ nghiêng đầu về phía những tội hồn quanh đó.'],
            ['narr', 'Ngươi để ý: quanh cái bóng, tiếng kêu nhỏ hơn. Không ai được tha, nhưng ai ngồi gần nó cũng thở được giữa hai cơn đau.'],
            ['me', 'Vô Gián có khoảng nghỉ rồi.'],
            ['narr', 'Cái bóng gật đầu một lần, rồi tụng tiếp, như sợ dừng lâu thì khoảng nghỉ đó mất.']
        ],
        'go:thuy_van': [
            ['me', 'Phần dưới kia làm Vô Gián có chỗ để thở.'],
            ['dia_tang', 'Ta biết. Ta không dám xuống gặp nó. Gặp rồi, có khi ta muốn ở lại luôn, thì trên này không ai giữ cửa.'],
            ['me', 'Ngài chia mình làm hai để giữ cả hai nơi.'],
            ['dia_tang', 'Hậu Thổ dạy. Nàng chia cả thân thể làm sáu. Ta chỉ dám chia làm hai.'],
            ['narr', 'Đế Thính dụi đầu vào tay ngươi, rồi nằm úp tai xuống đất, nghe về phía Vô Gián.']
        ]
    },

    /* ----- Lục Thánh ----- */
    lt_thai_thanh: {
        'gather:bat_canh': [
            ['me', 'Lò này từng nung Tề Thiên Đại Thánh.'],
            ['thai_thanh', 'Nung bốn mươi chín ngày. Nó ra được, mắt sáng hơn. Ta mất một lò đan.'],
            ['me', 'Ngài không giận?'],
            ['thai_thanh', 'Giận thì phải đứng dậy. Đứng dậy thì mỏi.'],
            ['narr', 'Một đạo đồng mang trà vào. Thái Thanh không uống, nhưng cũng không bảo mang ra. Chén trà nguội dần trên án.'],
            ['me', 'Đệ tử của ngài cũng ít nói như ngài?'],
            ['thai_thanh', 'Huyền Đô nói nhiều. Ta nhận nó vì có nó thì ta khỏi phải nói.'],
            ['narr', 'Ông nhắm mắt. Ngươi tưởng ông ngủ. Lúc ngươi đứng dậy, ông bảo: "Đóng cửa nhẹ thôi."']
        ]
    },
    lt_nguyen_thuy: {
        'hunt:ngoc_hu': [
            ['me', 'Ngài chép thiên mệnh cho đệ tử. Ngài chép từ đâu?'],
            ['nguyen_thuy', 'Mỗi sáng có một trang hiện trên án. Ta chép lại, chữ cho đẹp, chia cho đúng người.'],
            ['me', 'Ngài chưa từng sửa một chữ?'],
            ['nguyen_thuy', 'Một lần. Năm Phong Thần. Ta sửa một chữ cho đệ tử bớt khổ, và mười hai đứa mất Tam Hoa.'],
            ['narr', 'Ông kể như kể chuyện người khác. Nhưng ngòi bút trong tay ông dừng lại giữa một nét ngang.']
        ],
        'gather:ngoc_hu': [
            ['me', 'Ta viết toàn chữ chưa. Ngài không thấy phí giấy sao?'],
            ['nguyen_thuy', 'Phí. Nhưng là giấy của ngươi. Ta chép cả đời trên giấy của người khác.'],
            ['me', 'Ngài có muốn viết một trang của mình không?'],
            ['nguyen_thuy', 'Đã thử. Viết được một chữ "Ta" thì không biết viết gì tiếp. Kẻ quen chép thì không quen nghĩ.'],
            ['narr', 'Ông gấp trang giấy của ngươi lại, cất vào tay áo, không bỏ vào kho sổ.'],
            ['nguyen_thuy', 'Trang này ta giữ riêng. Đừng kể với Thông Thiên, hắn sẽ cười.']
        ]
    },
    lt_thong_thien: {
        'hunt:bich_du': [
            ['me', 'Ngài biết kẻ đã thua là ai, mà không đi gặp?'],
            ['thong_thien', 'Gặp thì phải trả kiếm. Mà kiếm này ta cầm quen tay rồi.'],
            ['narr', 'Ông rót rượu ra hai chén. Một chén cho ngươi, một chén để trống bên cạnh.'],
            ['me', 'Chén đó của ai?'],
            ['thong_thien', 'Của Đa Bảo. Nó không về, ta vẫn rót. Rót lâu thành thói.'],
            ['me', 'Ngài không giận nhị sư huynh?'],
            ['thong_thien', 'Giận thì đánh, đánh xong thì uống. Năm Vạn Tiên Trận ta đứng ngay trước mặt hắn mà hét, hắn nhìn ta như nhìn qua một tấm màn.'],
            ['me', 'Tấm màn gì?'],
            ['thong_thien', 'Ta không biết. Ta chỉ biết hôm đó cả bốn Thánh Nhân nhìn ta mà như không ai thấy ta. Uống đi, chuyện cũ rồi.']
        ]
    },
    lt_nu_oa: {
        'gather:oa_hoang': [
            ['me', 'Màu thứ sáu là màu gì?'],
            ['nu_oa', 'Tím. Ta chưa từng có viên đá màu đó. Con nhặt ở đâu?'],
            ['me', 'Nó nằm lẫn trong đống đá, như có ai để sẵn.'],
            ['nu_oa', 'Nó vá khít hơn đá của ta. Ta già rồi, có người vá giỏi hơn thì để họ vá.'],
            ['thai_van', 'Nương nương nói vậy thôi, tối nay lại ngồi ngắm chỗ đó tới sáng.'],
            ['nu_oa', 'Thải Vân, nấu cơm đi. Khách nhặt đá cả buổi chưa ăn gì.'],
            ['me', 'Ta không đói.'],
            ['nu_oa', 'Con nào cũng nói vậy. Rồi ăn hết ba bát. Ngồi xuống.']
        ]
    },
    lt_chuan_de: {
        'hunt:cuc_lac': [
            ['me', 'Ngài dạy con khỉ bay, rồi để nó đi phá trời. Để đổi lấy gì?'],
            ['chuan_de', 'Đất. Sau Đại Náo Thiên Cung, Tây Phương được thêm một châu. Tây Phương nghèo, ta không ngại mặc cả.'],
            ['me', 'Mặc cả với ai?'],
            ['chuan_de', 'Với kẻ chia đất. Ta tưởng là Hạo Thiên. Ký giấy xong mới thấy chữ ký bên kia không phải chữ hắn. Ta đọc không ra.'],
            ['me', 'Ngài vẫn giữ tờ giấy?'],
            ['chuan_de', 'Giữ. Ta là kẻ buôn. Muốn xem thì đổi cho ta một thứ.'],
            ['me', 'Đổi gì?'],
            ['chuan_de', 'Một lời hứa. Khi ngươi đọc được chữ ký đó, nói cho Tây Phương biết trước Đông Phương.'],
            ['narr', 'Một Kim Cương Hộ Pháp ngã xuống, đứng dậy, rồi tự trở về chỗ gác như chưa có gì xảy ra.']
        ]
    },
    lt_tiep_dan: {
        'hunt:linh_son': [
            ['me', 'Linh Sơn mà cũng đói?'],
            ['tiep_dan', 'Tây Phương đất cằn. Cúng dường thì nhiều, ruộng thì ít. Đệ tử ta ăn một bữa, nhịn một bữa, giảng kinh cả ngày.'],
            ['me', 'Ngài không chia thêm cho họ?'],
            ['tiep_dan', 'Ta chia hết rồi. Thánh Nhân cũng chỉ có hai bàn tay. Ta khóc vì biết hai bàn tay không đủ.'],
            ['narr', 'Một La Hán sa đọa nằm dưới chân ngươi. Trong nắm tay hắn còn giữ một nắm gạo, đếm từng hạt.']
        ],
        'gather:linh_son': [
            ['me', 'Ruộng này gầy hơn ruộng Phàm Giới.'],
            ['tiep_dan', 'Vì nó ở dưới Linh Sơn. Người ở đây bỏ ruộng đi nghe giảng. Nghe xong thì đói.'],
            ['me', 'Ngài có thể bảo họ về cày.'],
            ['tiep_dan', 'Ta bảo rồi. Họ bảo cày thì không thành Phật. Ta khóc thêm một lần.'],
            ['narr', 'Một ông nông dân già nhận ra Tiếp Dẫn. Ông không quỳ, chỉ hỏi năm nay có mưa không. Tiếp Dẫn lắc đầu, rồi cúi xuống nhổ cỏ giúp ông.']
        ],
        'go:linh_son': [
            ['me', 'Sáu vị chẳng ai giống ai.'],
            ['tiep_dan', 'Một người ngủ, một người chép, một người uống, một người nấu cơm, một người mặc cả, một người khóc. Ngươi chọn ai làm thầy?'],
            ['me', 'Người nấu cơm.'],
            ['tiep_dan', 'Ai cũng chọn vậy. Nên Nữ Oa có nhiều con nhất.'],
            ['narr', 'Ông đặt bông lúa lép vào tay ngươi. Bông lúa nhẹ tới mức phải nắm chặt mới không bay mất.']
        ]
    },

    /* ----- Cội Nguồn Bàn Cổ ----- */
    bc_mau: {
        'hunt:ban_co_dien': [
            ['me', 'Vu Binh còn máu Bàn Cổ. Vậy chúng là con cháu ông ấy?'],
            ['de_giang', 'Là giọt máu cuối. Bọn ta mười hai người là mười hai dòng chính. Vu Binh là những giọt bắn ra lúc ông ấy ngã.'],
            ['me', 'Vậy ta có nên đánh chúng?'],
            ['de_giang', 'Đánh đi. Vu tộc thương nhau bằng cách đánh nhau. Không ai đánh thì Vu Binh buồn, đứng hóa đá sớm.'],
            ['narr', 'Một Vu Binh ngã xuống, cười to, rồi đứng dậy đòi đánh tiếp. Đế Giang phải đá nó ra chỗ khác.']
        ],
        'gather:ban_co_dien': [
            ['me', 'Một năm mới đập một lần. Ông ấy còn sống bao lâu nữa?'],
            ['de_giang', 'Không ai tính được. Ta chỉ biết ngày xưa nhịp mạnh hơn.'],
            ['me', 'Ngài giữ máu ông ấy ở đâu?'],
            ['de_giang', 'Trong ta. Ta là Tổ Vu duy nhất còn đủ máu nóng. Phần nguội đi thì thành đất, phần lớn nhất nằm dưới Tiên Giới.'],
            ['me', 'Dưới Tiên Giới?'],
            ['de_giang', 'Tiên Giới đứng trên một mạch máu đã nguội. Đá linh trên đó là máu đông. Ngươi từng đào mỏ, là ngươi đã cầm máu ông ấy trên tay.'],
            ['narr', 'Ngươi nhớ những khối đá linh ấm tay ở mỏ Vô Quang. Hồi ấy ngươi tưởng chỉ là do cọ xát.']
        ]
    },
    bc_mat: {
        'gather:quang_han': [
            ['me', 'Hình người nằm ngửa đó có cử động không?'],
            ['hang_nga', 'Có. Rất chậm. Ngàn năm co một ngón tay. Một ngón tay là một dãy núi mới.'],
            ['me', 'Nàng ngắm ông ấy bao lâu rồi?'],
            ['hang_nga', 'Từ ngày lên đây. Ở cung trăng không có ai để nói chuyện, nên ta nói với ông ấy. Ông ấy chưa từng trả lời, nghe vậy lại dễ chịu.'],
            ['narr', 'Thỏ ngọc dừng giã thuốc, cùng nhìn xuống. Dưới kia, một con sông đổi dòng rất khẽ, như người nằm ngủ trở mình.']
        ],
        'hunt:phu_tang': [
            ['me', 'Mắt trái thành mặt trời. Vậy mười Kim Ô là gì?'],
            ['hang_nga', 'Là mười tia nhìn của con mắt đó. Chín tia bị bắn rơi. Từ đó mặt trời chỉ nhìn được một nơi mỗi lúc, nên mới có ngày và đêm.'],
            ['me', 'Trước đó không có đêm?'],
            ['hang_nga', 'Không. Hậu Nghệ bắn ra đêm. Chàng không biết, ta cũng không nói. Đêm là lúc ta được nhìn chàng mà chàng không thấy ta.'],
            ['narr', 'Một con Kim Ô non đậu lại trên vai ngươi. Nó nóng mà không bỏng, như một ánh nhìn biết nhận người quen.']
        ]
    },
    bc_toc: {
        'hunt:thien_ha': [
            ['me', 'Tinh Hồn rối vì sao?'],
            ['van_nguyet', 'Vì Thiên Hà từng là chiến trường. Thủy quân của Thiên Bồng đánh nhau ở đây, giẫm lên tóc ông ấy suốt mấy ngàn năm.'],
            ['me', 'Nàng gỡ một mình?'],
            ['van_nguyet', 'Mỗi đêm vài sợi. Ta thích việc này. Gỡ tóc cho người khác là việc của người thân, mà ông ấy chẳng còn ai.'],
            ['narr', 'Ngươi gỡ xong một sợi. Ở chỗ đó, một vì sao nhỏ sáng lên, chớp hai lần như cảm ơn.']
        ],
        'gather:luu_sa': [
            ['me', 'Phần biết nghĩ là nguyên thần?'],
            ['van_nguyet', 'Phải. Nguyên thần ông ấy tách thành ba người. Ba người đó giờ là Thánh, và không chịu nhận mình từng là một.'],
            ['sa_tang', 'Hèn chi sông này không bao giờ trong. Ta tưởng tại ta làm đục.'],
            ['me', 'Ngươi ở dưới máu Bàn Cổ bảy trăm năm mà không biết.'],
            ['sa_tang', 'Biết thì sao? Biết thì ta vẫn bị kiếm đâm. Nhưng biết rồi, đau cũng thấy có chút tự hào.']
        ]
    },
    bc_nguyen_than: {
        'gather:bat_canh': [
            ['me', '"Để yên" là để yên cái gì?'],
            ['thai_thanh', 'Thế giới vừa bổ ra. Ông ấy muốn nó tự lớn. Ta giữ phần đó, nên ta không làm gì.'],
            ['me', 'Kể cả khi thế giới hỏng?'],
            ['thai_thanh', 'Hỏng thì tự sửa. Không sửa được thì tự chết. Chết rồi thì có cái khác mọc. Ngươi nghe thấy lạnh lùng à?'],
            ['me', 'Nghe thấy lười.'],
            ['thai_thanh', 'Cũng đúng. Ông ấy bổ trời xong thì mệt, phần mệt đó là ta.']
        ],
        'go:ngoc_hu': [
            ['me', 'Phải có thứ tự. Ngài lập Xiển Giáo để giữ thứ tự đó.'],
            ['nguyen_thuy', 'Phải. Nhưng Bàn Cổ không viết sổ. Ông ấy chỉ bổ. Phần thứ tự trong ta quen tay, ai đưa sổ ta cũng chép.'],
            ['me', 'Ngài có thấy đó là tật không?'],
            ['nguyen_thuy', 'Là tật. Đại ca có tật ngủ, tam đệ có tật uống. Ta có tật chép. Một ý nghĩ chia ba thì mỗi phần mang một tật.'],
            ['narr', 'Nguyên Thủy đặt bút xuống. Lần đầu trong ngày, ông không chép cho hết trang.']
        ],
        'go:bich_du': [
            ['me', 'Ghép ba câu lại: để yên, có thứ tự, ai cũng được.'],
            ['thong_thien', 'Nghe như một người cha mở cửa nhà, để con tự lớn, dạy chúng lễ, ai ghé cũng mời ăn.'],
            ['me', 'Nghe giống Nữ Oa hơn.'],
            ['thong_thien', 'Ha. Đừng nói với bà ấy. Bà ấy sẽ bắt ba anh em ta ngồi ăn chung một mâm.'],
            ['thong_thien', 'Thân ông ấy ngươi đi đủ rồi. Còn cây rìu. Hỏi ta đi, ta vừa có rượu.']
        ]
    },
    bc_riu: {
        'hunt:bich_du': [
            ['me', 'Kiếm linh ngông vì nhớ chuyện bổ trời?'],
            ['thong_thien', 'Vì nhớ lúc đó trên nó không có gì. Giờ trên nó có trời, có Thánh, có ta. Nó không quen bị ai cầm.'],
            ['me', 'Nó muốn bổ lần nữa?'],
            ['thong_thien', 'Nó muốn biết lần trước bổ đúng hay sai. Mỗi lần ta rút kiếm, nó hỏi. Ta chưa trả lời được.'],
            ['narr', 'Kiếm linh cuối cùng tan, để lại một vệt sáng thẳng tắp trên không trung. Vệt đó chỉ ra ngoài trời.']
        ],
        'go:tu_tieu': [
            ['me', 'Ba vị ngồi chung một chỗ thế này hiếm lắm.'],
            ['thong_thien', 'Lần trước là lúc nghe Đạo Tổ giảng. Nhị ca ngồi thẳng lưng, đại ca ngủ, ta ăn vụng.'],
            ['nguyen_thuy', 'Đệ ăn vụng đào của ta.'],
            ['thong_thien', 'Mười vạn năm rồi mà huynh còn nhớ.'],
            ['thai_thanh', 'Hai đứa im đi. Khách đang hỏi việc.'],
            ['narr', 'Ba mảnh của một cây rìu nằm cạnh nhau trên bồ đoàn cũ. Chúng rung nhẹ, như muốn liền lại mà không biết cách.']
        ]
    },
    bc_ma_than: {
        'hunt:tinh_mo': [
            ['me', 'Một nhát thẳng như vậy, ông ấy không do dự sao?'],
            ['ly_khach', 'Do dự thì trời không mở. Người cầm rìu phải chọn một lần, rồi mang nó cả đời.'],
            ['me', 'Ba ngàn kẻ chết. Ông ấy có biết tên ai không?'],
            ['ly_khach', 'Biết hết. Vì vậy ông ấy mới hóa thân. Kẻ biết tên ba ngàn người đã giết thì không sống tiếp nổi bằng thân cũ.'],
            ['narr', 'Một Tinh Hài cuối cùng gục xuống, vết chém trên ngực nó phát sáng một lần rồi tắt.']
        ],
        'gather:van_gioi': [
            ['me', 'Những mảnh vỡ này là trời cũ của ai?'],
            ['ly_khach', 'Của Ma Thần. Mỗi kẻ có một bầu trời riêng. Trời lớn mở ra thì những bầu trời nhỏ bể hết.'],
            ['me', 'Có mảnh nào còn nguyên không?'],
            ['ly_khach', 'Có kẻ đã gom hết mảnh còn nguyên. Quanh đây có một lão nhặt đá. Đừng giành của lão, lão nhặt lâu hơn ngươi sống.'],
            ['narr', 'Một mảnh vỡ dưới chân ngươi còn hơi ấm. Bên trong có tiếng ai đó hát rất nhỏ, bằng một thứ tiếng không còn ai nói.']
        ]
    },
    bc_khai_thien: {
        'hunt:khai_thien': [
            ['me', 'Luật chưa thành hình thì sau này sẽ thành gì?'],
            ['ly_khach', 'Tùy kẻ nhặt. Thiên Đạo nhặt được một ít, thành luật của Tam Giới: lửa nóng, nước chảy xuống, người phải chết.'],
            ['me', 'Phần còn lại?'],
            ['ly_khach', 'Nằm đây, chờ. Có khi một luật chưa thành hình là thứ quý nhất. Nó còn có thể khác đi.'],
            ['narr', 'Một Quy Tắc Thể tan ra. Trong khoảnh khắc, gió ở đó thổi ngược, rồi chọn lại hướng cũ.']
        ],
        'gather:khai_thien': [
            ['me', 'Lửa ở đây lạnh thật.'],
            ['ly_khach', 'Lửa đầu tiên. Chưa ai nói với nó rằng lửa phải nóng. Mọi thứ ở đây đều chưa được dặn.'],
            ['me', 'Quả núi kia có được dặn gì không?'],
            ['ly_khach', 'Nó tự dặn mình nằm yên. Ngươi để ý, đất quanh nó lún xuống một vòng, như có ai đang chống từ bên dưới.'],
            ['narr', 'Ngươi đặt tay lên sườn núi. Đá lạnh, nhưng rất lâu sau có một nhịp, giống hệt nhịp ngươi từng nghe dưới tượng đá ở Bàn Cổ Điện.'],
            ['me', 'Ta nghe nhịp này rồi.'],
            ['ly_khach', 'Vậy là đúng chỗ. Máu ở đâu thì người cũng ở đó.']
        ]
    }
};

applyStoryLoreSteps(SIDE_LORE_B, 'SIDE_LORE_B');
