/* ===========================================================
   LỜI KỂ THÊM CHO TỪNG BƯỚC NHIỆM VỤ CHÍNH
   Khóa là id nhiệm vụ hoặc "cảnh giới-tiểu cảnh" của hồi truyện.
   Mỗi bước chọn bằng "loại:đích": go:địa điểm, boss:id trùm, hunt:địa điểm, gather:địa điểm.
   Lời thêm phát sau lời có sẵn, khi bước đó hoàn thành.
=========================================================== */
const STORY_LORE_STEPS = {
    /* ----- Hồi I ----- */
    m01: {
        'go:thanh_thuy': [
            ['me', 'Bà ơi, sói năm nay xuống sớm thế?'],
            ['thuy_ba', 'Trên núi hết thú rồi con. Mấy năm nay rừng thưa dần, cây không ra quả, suối cũng cạn bớt.'],
            ['thuy_ba', 'Ông bà mình kể ngày xưa đứng ở bờ suối hít một hơi là thấy người nhẹ hẳn. Giờ thì chỉ thấy lạnh.'],
            ['mac', '(Từ xa, tay vẫn quét) Linh khí đi đâu thì sói đi theo đó. Con cầm cây gậy kia mà đi.']
        ],
        'hunt:thanh_thuy': [
            ['me', 'Hắc Phong Trại? Bọn chúng chưa bao giờ xuống tới đây.'],
            ['mac', 'Có người trả tiền cho chúng xuống. Làng này nằm trên một mạch linh khí nhỏ. Nhỏ thôi, nhưng vẫn có kẻ muốn đào.'],
            ['thuy_ba', 'Con chạy đi! Đừng quay lại!'],
            ['me', 'Bà ở lại thì ai đuổi chúng?']
        ],
        'boss:hac_trai_chu': [
            ['narr', 'Trên xác Hắc Phong Trại Chủ có một túi bạc nặng, mặt túi thêu hình một đám mây đen.'],
            ['me', 'Lão Mặc, lão là ai vậy?'],
            ['mac', 'Một lão già quét lá. Mười năm nữa con hỏi lại, câu trả lời vẫn thế.'],
            ['mac', 'Đi đi. Đường lên núi dài lắm. Lúc nào mệt thì nhớ ở dưới này vẫn có người quét sân chờ con.']
        ]
    },
    m02: {
        'go:thanh_van': [
            ['to_dao', 'Đừng để ý hắn. Lăng Phong mười chín tuổi đã Trúc Cơ, cả tông môn chiều hắn như chiều trứng.'],
            ['me', 'Tỷ là ai?'],
            ['to_dao', 'Tô Thanh Dao, nội môn. Ta được giao trông đám mới vào như đệ. Ăn đủ, ngủ đủ, đừng chết sớm, ba việc đó ta quản.']
        ],
        'hunt:thanh_van': [
            ['me', 'Đồ tốt lấy ở đâu?'],
            ['to_dao', 'Đánh yêu thú, làm nhiệm vụ, đổi ở Vạn Long. Ở đây không ai cho không thứ gì, trừ lời khuyên của ta.'],
            ['chuong_mon', 'Lão Mặc giới thiệu con? Lạ thật. Lần cuối ta nghe cái tên ấy là năm ta mới nhập môn.'],
            ['chuong_mon', 'Đi đi. Có gì không hiểu thì hỏi Thanh Dao. Có gì nó không trả lời thì đừng hỏi ai khác.']
        ]
    },
    m03: {
        'go:vu_moc_lam': [
            ['me', 'Yêu Vương đó mạnh không?'],
            ['to_dao', 'Đủ mạnh để cắn ba sư đệ. Nhưng Thanh Lân Mãng vốn sống sâu trong núi, nơi linh khí còn dày. Chúng không thuộc về chỗ này.'],
            ['to_dao', 'Có thứ gì đó trong núi khiến chúng phải dạt ra. Giết xong, ta muốn đệ xem nó có vết thương cũ không.']
        ],
        'boss:thanh_lan': [
            ['narr', 'Trên lưng Thanh Lân Yêu Vương có ba vết móng sâu, cũ hơn mọi vết kiếm của hai người.'],
            ['to_dao', 'Thứ cào được Yêu Vương không phải yêu thú phàm giới. Về tông môn, đừng kể với ai trước khi ta báo lên chưởng môn.']
        ],
        'go:thanh_van': [
            ['me', 'Công đầu ngươi cứ lấy. Ta chỉ cần nội môn.'],
            ['lang_phong', 'Ngươi tưởng nhường thì ta sẽ nương tay à? Lên đài.']
        ],
        'boss:lang_phong_1': [
            ['lang_phong', '(Lau máu khóe miệng) Lần này là may. Lần sau ta sẽ không để ngươi kịp nhìn thấy kiếm.'],
            ['to_dao', 'Hắn thua lần đầu trong đời. Người như hắn không quên được chuyện đó đâu.']
        ]
    },
    m04: {
        'gather:thanh_van': [
            ['me', 'Hắc Bào Trưởng Lão là ai?'],
            ['to_dao', 'Trưởng lão giữ hầm đan, ít khi ra mặt. Đệ tử nào được gọi lên đều được thưởng một viên đan đỏ. Sau đó họ xin đi lịch luyện, rồi không về.'],
            ['to_dao', 'Sổ ghi họ chết ngoài núi. Nhưng ngày chết của cả mười hai người đều là đêm trăng non.']
        ],
        'boss:phan_do': [
            ['me', 'Sư phụ biết sổ thiếu trang?'],
            ['chuong_mon', 'Ta xé. Có những cái tên ghi vào đó thì sẽ bị người khác đọc.'],
            ['to_dao', 'Đệ thấy áo hắn không? Mây đen thêu ở vạt áo. Ta từng thấy dấu mây đó trên áo bọn cướp quanh chân núi.'],
            ['me', 'Vậy kẻ đứng sau chúng là Ma Uyên.']
        ]
    },
    m05: {
        'go:van_long': [
            ['thuong_hoi', 'Địa hỏa à? Xích Diệm Sơn dạo này không yên. Hỏa Ma ra khỏi miệng núi nhiều gấp đôi năm ngoái.'],
            ['me', 'Vì sao?'],
            ['thuong_hoi', 'Có kẻ mua sạch lưu huỳnh quanh đó. Lửa thiếu ăn thì lửa đi kiếm ăn. Đan của ngươi đây, trả tiền trước.']
        ],
        'boss:hoa_ma_vuong': [
            ['me', 'Lão đi ngang Xích Diệm Sơn? Chỗ này cách nơi con gặp lão cả ngàn dặm.'],
            ['mac', 'Lá thì rơi ở khắp nơi. Ta đi tới đâu quét tới đó.'],
            ['mac', 'Lửa này cháy ba ngàn năm rồi, đừng phí. Kẻ biết luyện thì cầm lửa, kẻ không biết thì bị lửa cầm.']
        ]
    },
    m06: {
        'go:thanh_van': [
            ['me', 'Lăng Phong! Sư phụ đâu?'],
            ['lang_phong', 'Trong điện, đang nhìn thứ lão sợ nhất: đệ tử của lão đã biết sự thật.'],
            ['lang_phong', 'Sổ phi thăng có ba ngàn cái tên, không một ai về. Ma Quân nói người lên đó thành quặng. Ta không làm quặng.']
        ],
        'boss:lang_phong_2': [
            ['me', 'Sư phụ!'],
            ['chuong_mon', 'Đừng đuổi theo nó. Nó không sai hết đâu, con ạ. Chỉ là nó chọn trốn.'],
            ['chuong_mon', 'Con thì đừng trốn. Đi lên, nhìn tận mắt, rồi nếu được thì về kể.'],
            ['narr', 'Bàn tay chưởng môn buông thõng. Trong lòng bàn tay là một chiếc lá tím đã khô.']
        ]
    },
    m07: {
        'go:bang_phong': [
            ['me', 'Bà biết chuyện Thanh Vân?'],
            ['han_bang', 'Cả phàm giới biết. Một thiên tài phản tông, một chưởng môn tọa hóa. Chuyện đó trăm năm lặp lại một lần, chỉ đổi tên người.'],
            ['han_bang', 'Muốn giết Lăng Phong thì đi đi, chết sớm cho gọn. Muốn sống tới ngày hiểu vì sao chuyện đó lặp lại thì ngồi xuống đây.']
        ],
        'boss:tuyet_long': [
            ['han_bang', 'Tuyết Long là con cuối cùng trong bầy. Cả bầy đã bay lên trời từ trăm năm trước.'],
            ['me', 'Rồng cũng phi thăng?'],
            ['han_bang', 'Thứ gì có linh khí đều bị kéo lên. Con này ở lại vì nó sợ. Ngươi vừa giết kẻ duy nhất trong bầy biết sợ.']
        ],
        'gather:bang_phong': [
            ['me', 'Người trên kia là ai?'],
            ['han_bang', 'Đệ tử của ta, chưởng môn của ngươi, cả Lăng Phong nếu hắn sống đủ lâu. Ai cũng từng ngồi trong băng, tưởng mình đã nguội.'],
            ['han_bang', 'Đi đi. Ma Uyên đang mở. Lần sau gặp lại, mong là ngươi vẫn còn lạnh.']
        ]
    },
    m08: {
        'go:ma_uyen': [
            ['me', 'Ngươi giết người Thanh Vân, đốt làng ta, mua chuộc Lăng Phong. Vì cái gì?'],
            ['ma_quan', 'Vì linh khí. Phàm giới đang bị hút cạn lên trời. Ta giữ lại một ít dưới vực, thứ gì rơi vào đây thì không bay lên được nữa.'],
            ['ma_quan', 'Ta không thiện. Nhưng ít ra cái ta ăn, ta ăn ở đây, không gửi đi cho ai.']
        ],
        'hunt:ma_uyen': [
            ['narr', 'Vực Ma ngã xuống, tan thành sương linh khí đặc quánh. Sương không bay lên mà chìm xuống đáy vực như nước.'],
            ['to_dao', 'Đệ thấy không? Ở đây linh khí chảy xuống. Cả đời ta chỉ thấy nó chảy lên.']
        ],
        'boss:ma_quan': [
            ['lang_phong', '(Từ trong bóng tối) Ngươi giết lão rồi. Vậy từ nay ai giữ cái hố này?'],
            ['me', 'Ra đây, Lăng Phong.'],
            ['narr', 'Không ai trả lời. Chỉ có tiếng bước chân đi xa dần xuống đáy vực.']
        ]
    },
    m09: {
        'gather:van_long': [
            ['thuong_hoi', 'Bốn trăm năm ta bán đan độ kiếp, ngươi là người thứ mười hai. Mười một người trước đều mua đúng số này.'],
            ['me', 'Họ có qua kiếp không?'],
            ['thuong_hoi', 'Có. Ta biết vì đêm họ độ kiếp, trời sáng một cột. Sau đó thì ta không biết gì nữa.']
        ],
        'go:phi_thang': [
            ['dai_su', 'Đứng vào giữa đài. Chín tầng sấm, tầng nào cũng đo ngươi một lần.'],
            ['me', 'Nếu ta không đủ nặng?'],
            ['dai_su', 'Thì ngươi chết, và trời không nhớ ngươi. Đủ nặng thì ngươi sống, và trời sẽ nhớ ngươi rất lâu.']
        ],
        'boss:thien_kiep': [
            ['me', 'Lão ở đây từ bao giờ?'],
            ['mac', 'Từ lúc con bắt đầu sợ. Sấm thì ai cũng sợ, chỉ cần sợ xong vẫn đứng.'],
            ['mac', 'Trên kia con sẽ thấy nhiều thứ khiến con muốn quay về. Lúc đó cứ nhìn lòng bàn tay, đếm xem con đã quét được bao nhiêu chiếc lá.'],
            ['me', 'Con chưa quét chiếc nào.'],
            ['mac', 'Thì bắt đầu đi.']
        ]
    },
    m10: {
        'go:thanh_van': [
            ['me', 'Tỷ không đi cùng?'],
            ['to_dao', 'Ai cũng đi thì ai giữ lửa? Chưởng môn dặn đừng để lửa tắt.'],
            ['to_dao', 'Trên đó có xích thì đừng chịu. Có người tốt thì nhớ cảm ơn. Không có gì cả thì về.'],
            ['me', 'Nếu không về được?'],
            ['to_dao', 'Thì viết thư. Chữ có bay qua tám tầng trời ta cũng đọc.']
        ],
        'go:phi_thang': [
            ['narr', 'Linh khí trong thân ngươi bị kéo đi trước cả thân xác, như nước chảy vào một cái miệng rất lớn ở đầu kia cột sáng.'],
            ['narr', 'Trước khi mây khép lại, ngươi thấy dưới chân núi nơi ngươi lớn lên có một chấm nhỏ đứng yên. Một người cầm chổi đang ngẩng lên nhìn.']
        ]
    },

    /* ----- Hồi II ----- */
    m11: {
        'go:tien_khoang': [
            ['me', 'Lão là ai? Đây là đâu?'],
            ['tien_lai', 'Lão là số bốn trăm mười hai. Đây là Vô Quang Tiên Khoáng, mỏ lớn nhất của Thiên Đình.'],
            ['tien_lai', 'Con còn trẻ, còn sức. Đừng ngẩng đầu, đừng nói to, đừng đánh lại đốc công. Ba điều ấy giữ con sống thêm vài trăm năm.'],
            ['me', 'Còn nếu con đánh lại?'],
            ['tien_lai', 'Thì lão phải học lại cách hy vọng. Lão già rồi, học cái đó mệt lắm.']
        ],
        'hunt:tien_khoang': [
            ['narr', 'Từng tên đốc công ngã xuống. Hàng trăm tiên nô buông cuốc, không ai chạy, không ai reo, chỉ có tiếng thở.']
        ],
        'boss:doc_cong': [
            ['me', '(Khẽ) Hắn nói đúng. Hắn chỉ không nói hết.'],
            ['tien_lai', 'Đi nhanh. Cuối hầm có lối ra Vạn Tiên Thành. Tìm người ăn mày đứng dưới cột cờ đổ.']
        ]
    },
    m12: {
        'go:van_tien': [
            ['me', 'Ta phải làm gì?'],
            ['van_nguyet', 'Có một Thiên Tướng giám sát việc áp giải kẻ phi thăng, trong người mang sổ. Giết hắn, lấy sổ.'],
            ['van_nguyet', 'Ba trăm năm nay Tán Tiên Minh chỉ dám trộm, chưa dám giết một Thiên Tướng. Ngươi làm được thì bọn ta mới dám tin.']
        ],
        'boss:thien_tuong': [
            ['me', 'Tới đâu?'],
            ['van_nguyet', 'Sổ chỉ ghi một ký hiệu, cái dấu đen tròn. Mỗi chuyến linh tủy gửi đi đều đóng dấu ấy.'],
            ['van_nguyet', 'Ngươi nhìn như đã thấy dấu này rồi. Thấy ở đâu?'],
            ['me', 'Trên thẻ của một đệ tử chết, ở phàm giới.'],
            ['van_nguyet', 'Vậy là nó ở cả hai đầu cột sáng. Hay lắm, giờ ta có lý do để sợ.']
        ]
    },
    m13: {
        'go:thien_ha': [
            ['me', 'Thiên Hà là sông thật?'],
            ['van_nguyet', 'Là linh tủy chảy. Người Tiên Giới ngắm nó mỗi đêm, tưởng là sao. Không ai biết mình đang ngắm mồ hôi của tiên nô.']
        ],
        'boss:tinh_giao': [
            ['van_nguyet', 'Cái gì vậy? Ở Tiên Giới không ai chém được một kiếm như thế!'],
            ['me', 'Nó đang lao về phía ta.']
        ],
        'boss:kiem_khi': [
            ['me', 'Thông Thiên là ai?'],
            ['van_nguyet', 'Một trong Lục Thánh, Giáo chủ Tiệt Giáo. Người ngồi ở Thánh Giới, cao hơn Thiên Đình, cao hơn mọi thứ ta từng biết.'],
            ['van_nguyet', 'Kiếm khí đó còn trong người ngươi. Nó sẽ ăn dần kinh mạch. Phải tới Dao Trì.']
        ]
    },
    m14: {
        'go:dao_tri': [
            ['me', 'Con bà?'],
            ['dao_tri_mau', 'Con gái út của ta. Nó dám nói với cha nó rằng mỏ là tội. Hôm sau nó bị giao cho Cự Linh canh giữ.'],
            ['dao_tri_mau', 'Ta rút kiếm khí cho ngươi, ngươi trả ta con gái. Ở Tiên Giới đó là cuộc mua bán sạch sẽ nhất ngươi sẽ gặp.']
        ],
        'gather:dao_tri': [
            ['narr', 'Kiếm khí bị rút ra như một sợi tơ bạc, cuộn lại trong lòng bàn tay Thánh Mẫu rồi tan đi.'],
            ['dao_tri_mau', 'Một sợi kiếm khí lạc đường mà suýt giết một tiên nhân. Ngươi tưởng tượng được kẻ chém nó mạnh tới đâu không?'],
            ['me', 'Không.'],
            ['dao_tri_mau', 'Tốt. Kẻ tưởng tượng được thì đã dừng tu rồi.']
        ],
        'boss:cu_linh': [
            ['narr', 'Từ sau lưng Cự Linh, một thiếu nữ bước ra, cổ tay còn hằn vết xích. Nàng chạy về phía ao sen mà không nói lời nào.'],
            ['dao_tri_mau', 'Ngươi trả rồi, giờ ta nợ ngươi. Ở Tiên Giới, người nợ ngươi đáng giá hơn người sợ ngươi.']
        ]
    },
    m15: {
        'go:van_tien': [
            ['me', 'Ba ngàn tán tiên đánh được Thiên Bồng?'],
            ['van_nguyet', 'Không. Ba ngàn tán tiên giữ chân thiên binh. Thiên Bồng là của ngươi.'],
            ['tien_lai', 'Lão cũng đi. Lão thuộc từng đoạn ống dưới Thiên Hà, ba ngàn năm nay đêm nào cũng nghe nó chảy.']
        ],
        'go:thien_ha': [
            ['narr', 'Thiên Bồng Nguyên Soái đứng trên đoạn ống lớn nhất, sau lưng là tám vạn thủy binh.'],
            ['me', 'Ngươi biết ống này chảy về đâu không?'],
            ['narr', 'Thiên Bồng không trả lời. Mắt hắn nhìn qua ngươi, về phía cuối ống, như sợ một thứ còn lớn hơn ngươi.']
        ],
        'boss:than_ha': [
            ['narr', 'Đoạn ống gãy. Linh tủy tràn ra Thiên Hà, sáng rực một đêm rồi tắt. Lần đầu tiên, sao trên trời Tiên Giới tối đi một mảng.'],
            ['me', 'Đầu kia đường ống vừa giật mạnh một cái.'],
            ['van_nguyet', 'Ta cũng thấy. Như một con cá lớn bị đứt cước. Nó biết rồi.']
        ]
    },
    m16: {
        'go:nam_thien_mon': [
            ['me', 'Tỷ sợ không?'],
            ['van_nguyet', 'Sợ. Nhưng ba trăm năm trước ta cũng sợ, và khi đó ta không có ngươi.'],
            ['tien_lai', 'Tiên nô Vô Quang, nghe đây! Hôm nay không ai đào cho ai cả!']
        ],
        'hunt:nam_thien_mon': [
            ['narr', 'Thiên binh lùi dần. Có kẻ quay giáo đi theo tiên nô. Có kẻ đứng yên, không biết nên đánh về phía nào.']
        ],
        'boss:nam_mon': [
            ['narr', 'Thủ tướng Nam Thiên Môn ngã xuống. Cánh cổng ba vạn năm chưa từng mở cho kẻ không có lệnh bài, giờ mở toang.'],
            ['van_nguyet', 'Lăng Tiêu ở phía trước. Đi đi, ta giữ cổng.']
        ]
    },
    m17: {
        'go:lang_tieu': [
            ['me', 'Cái tên đó là gì?'],
            ['tien_de', 'Ta đọc mấy vạn năm vẫn không đọc được. Mỗi lần nhìn, nó lại thành một con số khác.'],
            ['tien_de', 'Muốn đánh thì đánh. Nhưng biết trước điều này: ta chết, sổ không chết.']
        ],
        'boss:nguyen_thuy_phan': [
            ['me', 'Thiên mệnh của ngài có chép ai đặt cái mỏ dưới chân ngài không?'],
            ['nguyen_thuy', '(Phân thân khựng lại) ...Không có. Trang đó trống.'],
            ['narr', 'Phân thân tan đi, để lại một trang giấy trắng rơi xuống ngai vàng.']
        ]
    },
    m17a: {
        'go:dao_tri': [
            ['me', 'Sáu nguồn là những gì?'],
            ['dao_tri_mau', 'Tinh, khí, thần, hồn, phách, đạo. Người thường để chúng chảy riêng như sáu con suối. Lục Nguyên là lúc ngươi biết chúng cùng bắt nguồn từ một chỗ.'],
            ['dao_tri_mau', 'Con gái ta gửi lời cảm ơn. Nó không dám tự nói, nó sợ người lạ. Ba trăm năm bị xích thì ai cũng thế.']
        ],
        'gather:dao_tri': [
            ['me', 'Chỗ đó là đâu?'],
            ['dao_tri_mau', 'Ta không biết. Nhưng lúc sáu dòng nhập một, ngươi có nghe thấy gì không?'],
            ['me', 'Tiếng gió thổi qua một đồng cỏ.'],
            ['dao_tri_mau', 'Ta cũng nghe thấy, ba vạn năm trước. Từ đó không nghe lại được nữa.']
        ]
    },
    m17b: {
        'go:nhan_giao': [
            ['me', 'Nhìn thẳng vào thời gian là thế nào?'],
            ['huyen_do', 'Ngồi xuống, nhìn mọi thứ ngươi từng mất. Không quay mặt đi được thì ngươi đã thành Đại La.'],
            ['huyen_do', 'Sư phụ Thái Thanh nói thời gian là con sông duy nhất không chảy ra biển. Nó chảy về một người.']
        ],
        'gather:nhan_giao': [
            ['me', 'Ta thấy nơi ta lớn lên, thấy sư phụ. Và thấy một người quét lá không hề già đi.'],
            ['huyen_do', 'Không già trong dòng thời gian của ngươi? Vậy người đó không ở trong dòng. Người đó đứng trên bờ.']
        ]
    },
    m17c: {
        'go:da_bao': [
            ['me', 'Có lý mà không có tử khí thì sao?'],
            ['da_bao', 'Thì đứng trước cửa mà cãi với cánh cửa. Ta thấy nhiều người làm vậy cả vạn năm.'],
            ['da_bao', 'Lên tới đó nhớ nói với Nguyên Thủy là ta bán đắt. Hắn sẽ vui, vì hắn luôn tin ta tham.']
        ]
    },

    /* ----- Hồi III ----- */
    m18: {
        'go:tu_tieu': [
            ['thong_thien', 'Nhóc nói mỏ à? Ta chưa thấy. Nhưng nhóc trông không giống kẻ hay nói dối.'],
            ['nu_oa', 'Con ăn gì chưa? Ngồi xuống đã, chuyện mỏ ta sẽ nhìn lại.'],
            ['tiep_dan', 'Bần đạo nghe được tiếng khổ của muôn loài. Riêng Tiên Giới chưa từng nghe gì. Bần đạo đã tưởng đó là phúc.'],
            ['thai_thanh', '...Tan họp.']
        ],
        'go:van_tien': [
            ['van_nguyet', 'Không thấy? Ba ngàn năm, bảy mươi vạn người, mà không thấy?'],
            ['me', 'Như có tấm màn che mắt họ. Mắt họ nhìn xuống mà chỉ thấy mây.'],
            ['van_nguyet', 'Vậy kẻ thù không phải Lục Thánh, mà là thứ treo tấm màn ấy. Giờ ta càng sợ hơn.']
        ]
    },
    m19: {
        'go:bat_canh': [
            ['dong_tu', '(Khẽ) Sư phụ ít khi nói nhiều như vậy. Ngươi đánh cẩn thận.'],
            ['me', 'Thánh Nhân đánh nhau thế nào?'],
            ['thai_thanh', 'Không đánh. Ta đứng yên. Ngươi đi qua được ta là thắng.']
        ],
        'boss:thai_thanh': [
            ['thai_thanh', 'Ta sẽ nhìn lại. Không phải vì ngươi thắng, mà vì ngươi không cầu xin.'],
            ['me', 'Ngài thấy gì?'],
            ['thai_thanh', '...Mây. Vẫn là mây. Nhưng lần này ta biết mây ấy không phải của ta.']
        ]
    },
    m20: {
        'go:ngoc_hu': [
            ['me', 'Thiên mệnh ngài chép từ đâu ra?'],
            ['nguyen_thuy', 'Từ bản gốc trên đầu Thánh Giới. Mỗi vạn năm có một trang mới hiện lên, ta chép xuống không sai một chữ.'],
            ['nguyen_thuy', 'Ba ngàn năm nay trang nào cũng có một ô trống đúng chỗ Tiên Giới. Ta đã tưởng đó là ân điển.']
        ],
        'boss:nguyen_thuy': [
            ['me', 'Không ai xóa. Có lẽ bản gốc không đếm được ta.'],
            ['nguyen_thuy', 'Mọi thứ đều có trong sổ. Thứ không có trong sổ thì hoặc không tồn tại, hoặc lớn hơn cả sổ.'],
            ['nguyen_thuy', 'Đi đi. Ta phải chép lại từ đầu, và lần này ta sẽ đọc cả những ô trống.']
        ]
    },
    m21: {
        'go:oa_hoang': [
            ['me', 'Chịu được. Ta từng đứng chờ dưới mỏ còn lâu hơn.'],
            ['nu_oa', 'Vậy thì mở đi. Nhưng trước đó ăn cái này. Bánh ta làm từ đất ven sông, giống hôm ta nặn ra loài người.']
        ],
        'go:bat_canh': [
            ['me', 'Ở đó có ai không?'],
            ['thai_thanh', 'Có. Người dạy ta chữ Vô Vi đang ở đó. Và còn những kẻ nhìn sáu chúng ta như nhìn đám trẻ chơi ngoài sân.'],
            ['thai_thanh', 'Hồng Mông Tử Khí chúng ta quý như mạng, ở đó người ta đốt làm lửa sưởi.']
        ],
        'gather:tu_tieu': [
            ['van_nguyet', '(Truyền âm từ Thánh Thị) Thấy rồi! Cửa Thánh lùi ra, bọn ta có chỗ đứng rồi!'],
            ['narr', 'Ở rìa mới của Thánh Giới có một khe nứt rất nhỏ. Sau khe nứt là bóng tối, và một thứ đang nhìn lại.']
        ]
    },
    m22: {
        'go:bich_du': [
            ['me', 'Ta không khóc. Ta tới đòi lại vết sẹo.'],
            ['thong_thien', 'Ha! Đúng là đồ đệ tốt mà ta chưa kịp nhận. Rút kiếm!']
        ],
        'boss:thong_thien': [
            ['me', 'Năm xưa ngài chém một kiếm vào tấm màn. Có thấy gì không?'],
            ['thong_thien', 'Thấy một con mắt. Không phải mắt người. Nó nhìn ta như nhìn một con số.']
        ],
        'go:bat_canh': [
            ['thai_thanh', 'Tới Thiên Cảnh, ngươi sẽ gặp cái nhìn Thông Thiên kể. Đừng sợ nó. Nó chỉ đếm, không biết nghĩ.'],
            ['me', 'Ngài từng tới đó?'],
            ['thai_thanh', 'Ta chỉ đứng ở cửa, rồi quay về ngồi im. Một người ngồi im đủ lâu, thứ đang đếm sẽ quên đếm hắn.']
        ]
    },
    m23: {
        'gather:tu_tieu': [
            ['nu_oa', 'Con nhìn kìa. Những đứa trẻ ta nặn... ta đã để chúng đào ba ngàn năm.'],
            ['thong_thien', 'Khóc sau đi. Giờ thì chém.']
        ],
        'boss:chuan_tiep': [
            ['chuan_de', 'Ra ngoài kia, nhớ tìm một lữ khách mở quán. Ba ngàn năm một lần, bần đạo nghe gió đưa mùi cơm từ ngoài vào.'],
            ['me', 'Ngoài mép thế giới mà có quán cơm?'],
            ['tiep_dan', 'Nơi nào có người đi xa thì nơi đó có quán. Đi đi.']
        ]
    },

    /* ----- Hồi IV ----- */
    m24: {
        'go:van_gioi': [
            ['me', 'Vụ thứ ba ngàn? Vậy những vụ trước đâu?'],
            ['ly_khach', 'Ngươi đang đứng trên xác chúng. Lục địa dưới chân ngươi từng có Lục Thánh, có Thiên Đình, có một cái mỏ.']
        ],
        'hunt:van_gioi': [
            ['narr', 'Khôi lỗi ngã xuống, trong ngực là những bánh răng khắc dấu ấn đen. Bánh răng nào cũng mang số của một vũ trụ.']
        ],
        'boss:khoi_loi': [
            ['ly_khach', 'Khôi lỗi gặt. Thiên Ma ăn. Thần Đình ghi sổ. Ngươi vừa giết người làm công, kẻ chủ còn ở xa.'],
            ['me', 'Ta sẽ đi tới tận chỗ chủ ngồi.'],
            ['ly_khach', 'Ai mới tới cũng nói thế. Ăn no rồi hẵng đi.']
        ]
    },
    m25: {
        'go:luan_hoi': [
            ['me', 'Thiên Đạo đã giết ta?'],
            ['ly_khach', 'Mỗi lần ngươi đi quá xa, nó lại cuốn ngươi về biển này rồi cho đầu thai. Ngươi tưởng mình mới đi lần đầu sao?']
        ],
        'boss:nghiep_long': [
            ['narr', 'Nghiệp Long chìm xuống. Mặt biển hiện lên gương mặt của ngươi qua từng kiếp, gương mặt nào cũng đang nhìn lên trên.']
        ],
        'gather:luan_hoi': [
            ['me', 'Người cầm chổi đó là ta?'],
            ['ly_khach', 'Biển chỉ cho thấy, không giải thích. Nhưng ta để ý: kiếp nào cầm chổi, ngươi cũng đứng ở cùng một nơi.']
        ]
    },
    m26: {
        'go:luan_hoi': [
            ['tam_ma_say', 'Ngươi giết ta bao nhiêu lần rồi? Ta thì nhớ. Lần nào ngươi cũng thắng ta, rồi ngồi lên ngai, rồi cô đơn.']
        ],
        'boss:tam_ma': [
            ['me', 'Ngai vàng nào?'],
            ['tam_ma_say', 'Cái ở trên cùng. Lần này đi qua nó, đừng ngồi.'],
            ['narr', 'Tâm Ma tan ra như sương, để lại một chiếc lá tím trên mặt nước.']
        ]
    },
    m27: {
        'go:khai_thien': [
            ['me', 'Có trời riêng thì đánh được Thiên Đạo?'],
            ['ly_khach', 'Không đánh được. Nhưng có trời riêng thì Thiên Đạo không đếm được ngươi nữa. Kẻ không bị đếm mới đến gần được nó.'],
            ['hoang_cong', 'Lò ở đây, đất ở đây, lửa ta cho mượn. Khai thế nào là việc của ngươi.']
        ],
        'gather:khai_thien': [
            ['narr', 'Ngươi tách một mảnh hư không ra khỏi Ngoại Vực. Nó run rẩy như một con thú non, chưa có tên, chưa có số.']
        ],
        'boss:quy_tac': [
            ['to_dao', '(Rất xa, ở phàm giới) Ngôi sao mới kia... sao trông quen thế?'],
            ['narr', 'Lần đầu tiên trong ba ngàn vụ, một vì sao mọc lên mà không có số.']
        ]
    },
    m28: {
        'go:than_dinh': [
            ['me', 'Tiếng khóc của ai?'],
            ['ly_khach', '(Truyền âm) Của mọi kẻ bị gặt. Thần Đình lọc bỏ tên, chỉ giữ lại sức. Sức đó quay bánh răng.'],
            ['narr', 'Trên mỗi bánh răng là một dấu ấn đen. Ngươi đã đi từ phàm giới tới đây để gặp lại nó, lần này nguyên vẹn.']
        ],
        'hunt:than_dinh': [
            ['narr', 'Thiên Phạt Sứ ngã xuống không có máu. Bên trong chúng chỉ có chữ: điều luật, hạn mức, ngày gặt.']
        ],
        'boss:than_dinh_ve': [
            ['narr', 'Thần Đình Vệ quỳ xuống. Phía sau hắn, hành lang tối dần, chỉ còn một ngọn đèn ở cuối.'],
            ['me', 'Ai ngồi dưới ngọn đèn đó?'],
            ['narr', 'Thần Đình Vệ chỉ kịp nói một chữ trước khi tan: "Tổ."']
        ]
    },
    m29: {
        'go:than_dinh': [
            ['me', 'Ngài là Đạo Tổ? Lục Thánh vẫn chờ ngài giảng đạo lần nữa.'],
            ['dao_to', 'Ta biết. Ta xuống Tử Tiêu một lần, chia xong tử khí là phải về. Rời chỗ này lâu thì sổ không ai giữ.'],
            ['dao_to', 'Hạo Thiên vẫn ngồi cuối hàng chờ ta à? Nói với hắn đừng chờ nữa. Người hắn nên chờ là ngươi.']
        ]
    },

    /* ----- Hồi V, VI, VII ----- */
    m30: {
        'go:bo_hondon': [
            ['me', 'Ngươi là ai?'],
            ['vo_danh', 'Tên ta dài lắm, gọi Vô Danh cho gọn. Ta là một trong sáu kẻ ngồi ở biển này.']
        ],
        'boss:dao_gia_thu': [
            ['me', 'Biển này là gì?'],
            ['vo_danh', 'Hỗn Độn, nơi các Đạo trôi trước khi có người đi. Vũ trụ của ngươi là một giọt, Thiên Đạo của ngươi chỉ là cái vỏ giọt.'],
            ['vo_danh', 'Ngửi thấy gì không? Gió từ Hải Tâm thổi về. Đó là mùi tử khí, thứ trong vũ trụ ngươi người ta mua bằng cả đời.']
        ]
    },
    m31: {
        'gather:dao_gia_am': [
            ['vong_ky', 'Đạo Giả không tu bằng linh khí. Ở đây không có linh khí, chỉ có ý. Ngươi nghĩ mình là gì thì ngươi thành cái đó.'],
            ['me', 'Nếu ta nghĩ sai?'],
            ['vong_ky', 'Thì ngươi thành Ma Thần. Lũ trong mộ kia đều từng nghĩ sai một lần.']
        ],
        'boss:ma_than': [
            ['narr', 'Ma Thần ngã xuống, thân tan thành sương xám. Trong sương còn một chiếc rìu gãy, lưỡi mòn vì chém quá nhiều lần vào thứ không thể chém.'],
            ['vo_danh', 'Đừng nhặt. Ai cầm chiếc rìu đó cũng muốn khai thiên lại từ đầu.']
        ]
    },
    m32: {
        'go:dao_gia_am': [
            ['me', 'Thắng một Đạo Giả thì được gì?'],
            ['vong_ky', 'Được đi qua mắt bão. Hải Tâm không có cửa, chỉ có sự cho phép. Sáu chúng ta là sự cho phép đó.']
        ]
    },
    m35: {
        'go:co_thu': [
            ['narr', 'Rễ cây cắm xuống tận Hỗn Độn, ngọn vươn lên chạm tới chỗ chưa có tên. Mỗi chiếc lá là một vũ trụ nhỏ, và có những chiếc lá màu tím.'],
            ['narr', 'Một chiếc lá rơi. Ngươi nhìn nó trôi qua Hải Tâm, qua Hỗn Độn, qua vách trời, rồi mất hút về phía nơi ngươi lớn lên.'],
            ['me', 'Chiếc lá năm đó... rơi từ cây ta trồng?'],
            ['narr', 'Không ai trả lời. Ở đây chưa từng có ai trả lời.']
        ],
        'go:vo_cuong': [
            ['ly_khach', 'Người ngươi có mùi tử khí, giống hệt người quét lá năm xưa.'],
            ['me', 'Lão ấy có ghi nợ ở đây không?'],
            ['ly_khach', 'Có. Nhưng sổ của ta không có số, chỉ có tên. Ta không giống Thần Đình.']
        ],
        'go:tu_tieu': [
            ['tien_de', 'Thánh Nhân... không, ta không biết nên gọi ngươi là gì nữa.'],
            ['me', 'Gọi tên là được. Sợi tử khí ngài thiếu, ta mang về rồi.'],
            ['narr', 'Ngươi thả một sợi tử khí vào tay Hạo Thiên. Lần đầu sau mấy vạn năm, chiếc bồ đoàn cuối hàng có người đứng dậy.']
        ]
    },
    m36: {
        'go:chua_te': [
            ['narr', 'Từ đây nhìn xuống, ngươi thấy mọi tầng mình đã đi qua: Hồng Mông, Hỗn Độn, Thần Đình, Thánh Giới, Tiên Giới, và tận đáy là nơi ngươi lớn lên, có tiếng chổi.'],
            ['narr', 'Ngồi ở đây không có ai để nói chuyện. Ngươi chợt hiểu vì sao có người lại chọn quay về quét lá.']
        ]
    },
    m37: {
        'go:truong_ha': [
            ['narr', 'Ngươi thấy kiếp đầu tiên: một đứa trẻ lần đầu cầm vũ khí. Ở xa có một người quét lá mang gương mặt của ngươi.'],
            ['narr', 'Thác nước không có tiếng, nhưng ngươi nghe tiếng chổi chạy dọc theo dòng chảy, từ kiếp này sang kiếp khác.']
        ]
    },
    m38: {
        'go:chung_dai': [
            ['narr', 'Trên cán chổi còn dính một chiếc lá tím chưa khô, như người cầm nó vừa rời đi.'],
            ['narr', 'Dưới ghế khắc một dòng chữ nhỏ: "Đợi một đứa trẻ giống mình."']
        ]
    },

    /* ----- Thêm cho các hồi truyện còn ngắn ----- */
    '4-1': {
        'go:bang_phong': [
            ['me', 'Thư gửi Băng Phong Cốc? Sư phụ quen Hàn Băng Tiên Tử?'],
            ['narr', 'Trên tuyết có dấu chân người, rất nhẹ, đi cạnh vết lông hạc. Dấu chân dừng ở mép vực rồi biến mất như bay lên.']
        ]
    },
    '15-1': {
        'go:dong_thien_mon': [
            ['me', 'Chúng còn bao nhiêu người?'],
            ['van_nguyet', 'Chừng hai vạn, phần lớn là thiên binh già sắp tới tuổi được bỏ xích. Họ đánh không vì trung thành, mà vì sợ mất phần lương cuối.']
        ]
    },
    '16-1': {
        'hunt:bac_thien_mon': [
            ['me', 'Lương của ông là bao nhiêu?'],
            ['narr', 'Lão chìa cổ tay ra. Dưới giáp là dấu nô lệ số ba vạn hai ngàn. "Lương là được bỏ xích," lão nói. "Mỗi ngàn năm bỏ một mắt."']
        ]
    },
    '22-1': {
        'go:cuc_lac': [
            ['me', 'Tây Phương Cực Lạc mà không ai nói chuyện?'],
            ['narr', 'Một tiểu sa di quét sân ngẩng lên rồi cúi xuống thật nhanh. Trên cổ tay cậu có một chấm đen nhỏ.']
        ]
    },
    '25-1': {
        'hunt:luan_hoi': [
            ['me', 'Chiếc ghế đó ở đâu? Ngôi làng đó ở đâu?'],
            ['ly_khach', '(Truyền âm) Đừng tìm bằng mắt. Ký ức của Nghiệp Long trộn lẫn mọi kiếp. Thứ gì lặp lại nhiều lần mới là thật.']
        ]
    },
    '28-1': {
        'hunt:than_dinh': [
            ['me', 'Ngoài kia là đâu?'],
            ['narr', 'Không ai trả lời nữa. Dấu ấn đen trên giáp nó mờ dần như mực gặp nước.'],
            ['narr', 'Ngươi chợt nhận ra Thiên Phạt Sứ cũng từng là người, có lẽ là một kẻ độ kiếp thất bại, bị giữ lại để đánh những kẻ độ kiếp sau.']
        ]
    },
    '31-2': {
        'go:truong_ha': [
            ['narr', 'Trên mạn đò có những vạch khắc nhỏ, mỗi vạch là một lần qua sông. Đếm tới vạch cuối, ngươi thấy nét khắc giống hệt nét tay mình.']
        ]
    }
};

function storyLoreStep(quest, selector) {
    const [kind, target] = selector.split(':');
    const match = {
        go: s => s.go === target || (s.talk && s.loc === target),
        boss: s => s.boss === target,
        hunt: s => s.hunt?.loc === target,
        gather: s => s.gather?.loc === target
    }[kind];
    const step = match && quest.steps.find(match);
    if (!step) throw new Error(`STORY_LORE_STEPS: ${quest.id} không có bước ${selector}`);
    return step;
}

Object.entries(STORY_LORE_STEPS).forEach(([key, bySelector]) => {
    const quest = QUEST_INDEX[/^\d/.test(key) ? `mc${key.replace('-', '_')}` : key];
    if (!quest) throw new Error(`STORY_LORE_STEPS: không có nhiệm vụ ${key}`);
    Object.entries(bySelector).forEach(([selector, lines]) => {
        lines.forEach(([who]) => {
            if (who !== 'me' && who !== 'narr' && !NPCS[who]) throw new Error(`STORY_LORE_STEPS: ${key} dùng NPC lạ ${who}`);
        });
        const step = storyLoreStep(quest, selector);
        step.say = [...(step.say || []), ...lines];
        if (step.ruled?.say) step.ruled.say = [...step.ruled.say, ...lines];
    });
});
