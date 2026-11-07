/* ===========================================================
   HỒI II CHI TIẾT: TIÊN GIỚI
   - Mỗi tiểu cảnh giới từ Tán Tiên tới Chuẩn Thánh là một chặng, đi qua khắp Tiên Giới; khu vực mở dần theo chặng.
   - branches chọn theo linh căn lúc nhận việc: when.el (có hành đó), rankMin/rankMax (phẩm), hybrid (tạp linh căn).
   - Nạp sau storychapters.js, trước storyscenes.js: chỉ thay intro/steps/branches, giữ nguyên id, needs, thưởng và boss.
=========================================================== */
Object.assign(NPCS, {
    yeu_ha_chu: { name: 'Thanh Lân', title: 'Yêu tiên giữ bến Yêu Hà', look: NPC_LOOK('f', 2, '#2f7f8f', '#1f4f5f', { weapon: 'staff', weaponColor: '#7fe0d0' }) },
    dau_no: { name: 'Thiết Ngưu', title: 'Thủ lĩnh đấu nô Bát Hoang', look: NPC_LOOK('m', 5, '#1b1b22', '#6b3a2a', { beard: true, weapon: 'axe', weaponColor: '#c9c9d6' }) },
    hac_chu: { name: 'Mạc Tam Nương', title: 'Chủ Hắc Thị', look: NPC_LOOK('f', 1, '#1b1b22', '#2b2b35', { weapon: 'fan', weaponColor: '#c58bff' }) },
    hang_nga: { name: 'Hằng Nga', title: 'Chủ Quảng Hàn Cung', look: NPC_LOOK('f', 1, '#e8e8f0', '#dfe8ff', { aura: '#dfe8ff' }) },
    ho_hau: { name: 'Đồ Sơn Hồ Hậu', title: 'Hồ Hậu Thanh Khâu', look: NPC_LOOK('f', 4, '#f0f0f0', '#c26a9a', { aura: '#ffb3d9' }) },
    yeu_hoang: { name: 'Yêu Hoàng Kim Thiên', title: 'Chủ Yêu Hoàng Điện', look: NPC_LOOK('m', 4, '#b5832e', '#5a2a0a', { crown: 'guan', weapon: 'spear', weaponColor: '#ffcf40' }) },
    con_bang: { name: 'Côn Bằng Lão Tổ', title: 'Kẻ ngủ dưới Bắc Minh', look: NPC_LOOK('m', 3, '#2b3b55', '#0f1f35', { beard: true, aura: '#3d7bff' }) }
});

function reviseQuest(id, part) {
    Object.assign(QUEST_INDEX[id], part);
}

/* ---------- Tán Tiên: tiên nô, chỉ có bàn kiểm kê, hầm mỏ và con sông sau mỏ ---------- */
reviseQuest('mc9_0', {
    steps: [
        { go: 'phi_thang_tri', say: [['narr', 'Không có tiên nhạc. Chỉ có xiềng xích, một hàng người dài và một chiếc bàn kiểm kê bằng ngọc đã mòn vẹt.'], ['tien_lai', 'Phải, Tiên Giới đó con. Chào mừng tới thiên đường. Đừng chống cự, chúng sẽ chuyển ngươi xuống mỏ thôi.'], ['me', 'Lão là ai?'], ['tien_lai', 'Một kẻ phi thăng trước con ba ngàn năm. Đứng sau lão, cúi đầu, đừng nhìn vào mắt giám binh.']] },
        { gather: { loc: 'phi_thang_tri', hours: 1, label: 'Xếp hàng chờ đóng dấu' }, say: [['narr', 'Giám binh ấn con dấu nung đỏ lên cổ tay ngươi. Mùi da cháy lẫn với mùi linh khí ngọt lịm của Tiên Giới.'], ['tien_lai', 'Đau thì cứ đau. Đừng kêu, kêu thì chúng nhớ mặt.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            steps: [
                { go: 'phi_thang_tri', say: [['narr', 'Giám binh đặt tay lên đỉnh đầu ngươi rồi khựng lại. Bàn kiểm kê sáng rực, cả hàng người phía sau im bặt.'], ['tien_lai', 'Linh căn cỡ này... con ơi, chúng sẽ không để con xuống mỏ đâu. Chúng sẽ bán con.'], ['me', 'Bán cho ai?'], ['tien_lai', 'Cho bất kỳ vị tiên quan nào cần một con chó săn biết tu luyện.']] },
                { hunt: { loc: 'phi_thang_tri', name: 'Giám Binh Thiên Đình', n: 2 }, say: [['narr', 'Ngươi hất văng hai giám binh. Người thứ ba thổi tù và. Một khắc sau ngươi nằm úp mặt trên nền đá, tai ù đi.'], ['narr', 'Trên tờ khai, có kẻ viết thêm một dòng mực đỏ: "Hàng quý, tính khí xấu. Tạm cho xuống mỏ, canh kỹ."'], ['tien_lai', 'Ngốc thật. Nhưng lão thích kẻ ngốc kiểu này.']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            steps: [
                { go: 'phi_thang_tri', say: [['narr', 'Giám binh liếc bàn kiểm kê, ngáp một cái, phẩy tay như đuổi ruồi.'], ['tien_lai', 'Phẩm thấp à? Tốt. Ở đây phẩm thấp là phúc. Chúng không thèm để mắt tới con.'], ['me', 'Ở phàm giới ai cũng bảo phẩm thấp thì đừng mong phi thăng.'], ['tien_lai', 'Vậy mà con vẫn lên được. Giữ chuyện đó trong bụng, đừng để ai biết con giỏi hơn tờ khai.']] },
                { gather: { loc: 'phi_thang_tri', hours: 1, label: 'Xếp cuối hàng ca đêm' }, say: [['narr', 'Con dấu đóng lệch, chỉ in được nửa chữ "nô". Giám binh không buồn đóng lại.'], ['tien_lai', 'Nửa chữ thôi. Sau này xóa cũng dễ hơn.']] }
            ]
        }
    }
});

reviseQuest('mc9_1', {
    steps: [
        { go: 'tien_khoang', say: [['tien_lai', 'Ba ngàn năm rồi, ta đào linh tủy cho Thiên Đình. Cầm cuốc thấp xuống, đừng để đốc công thấy ngươi còn sức.'], ['me', 'Linh tủy là gì?'], ['tien_lai', 'Là thứ làm cho Tiên Giới sáng. Đào lên thì nó chảy đi, không ai biết chảy đi đâu. Hỏi nhiều là bị đánh.']] },
        { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 3 }, say: [['tien_lai', 'Chúng từng là tiên nô như ta với ngươi. Đào đến chết rồi vẫn đào.'], ['me', 'Không ai chôn họ sao?'], ['tien_lai', 'Chôn ở đâu? Đất ở đây toàn là mỏ.']] }
    ],
    branches: {
        hoa: {
            when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
            steps: [
                { go: 'tien_khoang', say: [['tien_lai', 'Tay con nóng quá. Đặt lên đá đi, xem nào.'], ['narr', 'Đá dưới tay ngươi đỏ dần lên, mềm như sáp. Mạch linh tủy lộ ra, sáng như một dòng máu trong vách.'], ['tien_lai', 'Chà. Một ca đào của con bằng ba ngày của lão. Nhưng nhớ đấy, hơi nóng sẽ gọi bọn khoáng thi tới.']] },
                { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 4 }, say: [['narr', 'Khoáng thi bò ra từ những đường hầm bỏ hoang, tìm tới hơi ấm như thiêu thân.'], ['tien_lai', 'Chúng lạnh lắm, ba ngàn năm không được ấm. Con đốt chúng đi là phải, cũng coi như cho chúng một lần ấm cuối.']] }
            ]
        },
        thuy: {
            when: { el: 'Thủy' }, tag: 'Thủy linh căn',
            steps: [
                { go: 'tien_khoang', say: [['me', 'Dưới vách này có nước.'], ['tien_lai', 'Nước? Ba ngàn năm lão uống nước đốc công phát, mỗi ngày một gáo.'], ['narr', 'Ngươi áp tay vào vách. Một dòng nước ngầm rỉ ra, trong vắt, lạnh buốt.']] },
                { gather: { loc: 'tien_khoang', hours: 1, label: 'Dẫn mạch nước ngầm về lán' }, say: [['narr', 'Đêm đó cả lán tiên nô được uống no lần đầu sau nhiều năm. Không ai nói gì, chỉ có tiếng nuốt.'], ['tien_lai', 'Đừng để đốc công biết. Chúng sẽ lấp nó lại rồi tính thêm thuế nước.']] },
                { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 3 }, say: [['tien_lai', 'Khoáng thi cũng khát. Chúng đi theo mùi nước. Thương chúng thì đánh cho nhanh.']] }
            ]
        },
        moc: {
            when: { el: 'Mộc' }, tag: 'Mộc linh căn',
            steps: [
                { go: 'tien_khoang', say: [['narr', 'Trong khe đá tối có một nhúm rêu đã chết khô. Ngươi chạm vào, nó xanh lại.'], ['tien_lai', 'Rêu linh! Ăn được đấy. Lão Tứ ở lán bên đang ho ra máu, thứ này cầm được vài ngày.']] },
                { gather: { loc: 'tien_khoang', hours: 1, label: 'Ươm rêu linh trong khe đá' }, say: [['narr', 'Ba ngày sau, khe đá phủ một lớp xanh mỏng. Người ta xếp hàng, mỗi người bứt một nhúm, không ai lấy nhiều hơn.'], ['tien_lai', 'Con biết không, đây là lần đầu tiên lão thấy cái gì đó mọc ở dưới này.']] },
                { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 2 }, say: [['tien_lai', 'Chúng giẫm lên rêu. Đuổi đi giùm lão.']] }
            ]
        },
        kim: {
            when: { el: 'Kim' }, tag: 'Kim linh căn',
            steps: [
                { go: 'tien_khoang', say: [['me', 'Lão nghe không? Đá đang ngân.'], ['tien_lai', 'Lão chỉ nghe tiếng cuốc.'], ['narr', 'Với ngươi, mỗi mạch quặng ngân một nốt khác nhau. Mạch giàu nhất hát to nhất, nằm ngay sau lưng đốc công.']] },
                { gather: { loc: 'tien_khoang', hours: 1, label: 'Lần theo tiếng quặng' }, say: [['narr', 'Ngươi đào trúng mạch giàu. Đủ khoán cho cả lán, mọi người được nghỉ sớm nửa ca.'], ['tien_lai', 'Nửa ca. Ba ngàn năm, lần đầu được nghỉ nửa ca. Con đừng tỏ ra giỏi quá, chúng sẽ tăng khoán.']] },
                { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 3 }, say: [['tien_lai', 'Mạch giàu thì khoáng thi cũng đông. Chúng chết rồi mà vẫn nhớ chỗ nào nhiều linh tủy.']] }
            ]
        },
        tho: {
            when: { el: 'Thổ' }, tag: 'Thổ linh căn',
            steps: [
                { go: 'tien_khoang', say: [['narr', 'Trần hầm rung lên. Đá vụn rơi lả tả. Ai đó la lên: sập hầm!'], ['tien_lai', 'Chạy! Đừng quay lại!'], ['me', 'Không cần chạy.'], ['narr', 'Ngươi đặt tay lên vách. Đất dưới chân ngươi im lặng như một con thú vừa được vuốt lưng.']] },
                { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 3 }, say: [['narr', 'Từ đường hầm sập, khoáng thi lổm ngổm bò ra. Đất đã chôn chúng một lần, giờ trả chúng lại.'], ['tien_lai', 'Mười hai người sống vì con. Ở dưới này chưa ai cứu được ai. Nhớ lấy cảm giác này, sau này con sẽ cần nó.']] }
            ]
        }
    }
});

reviseQuest('mc9_2', {
    steps: [
        { gather: { loc: 'tien_khoang', hours: 2, label: 'Đào linh tủy theo ca' }, say: [['me', 'Lão tên thật là gì?'], ['tien_lai', 'Quên rồi. Ở đây ai cũng là số. Ta là số bốn trăm mười hai.'], ['me', 'Lão từng là gì trước khi phi thăng?'], ['tien_lai', 'Tông chủ một tông môn. Đồ đệ ta chắc vẫn đang đợi thư.']] },
        { go: 'tien_khoang', say: [['dan_tien_khoang', 'Ngươi là đứa mới hay nói chuyện với lão Bạch phải không? Lão kể chuyện đồ đệ với tất cả mọi người.'], ['me', 'Chuyện đó không thật sao?'], ['dan_tien_khoang', 'Thật. Chỉ là ba ngàn năm rồi, đồ đệ lão chắc đã thành tro. Lão biết mà vẫn kể, vì không kể thì quên mất mình là người.']] },
        { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 2 }, say: [['narr', 'Trên cổ một khoáng thi còn đeo tấm thẻ gỗ khắc chữ "Thanh Vân". Nét chữ giống hệt nét chữ trên bia đá sơn môn của ngươi.'], ['tien_lai', 'Đưa đây. Lão giữ cho. Có ngày con mang nó về.']] }
    ]
});

reviseQuest('m11', {
    steps: [
        { go: 'tien_khoang', say: [['tien_lai', 'Kẻ phi thăng là đồng tiền của Thiên Đình đó con. Hôm nay đốc công đánh chết thêm một người, lão không muốn đếm nữa.'], ['me', 'Vậy thì đừng đếm. Đánh.']] },
        { hunt: { loc: 'tien_khoang', name: 'Đốc Công Tiên Khoáng', n: 3 } },
        { boss: 'doc_cong', say: [['tien_lai', 'Ngươi... đánh chết đốc công? Đi đi. Vạn Tiên Thành có người muốn gặp kẻ như ngươi.'], ['narr', 'Lời của Cửu U Ma Quân vang lên trong đầu ngươi.']] },
        { go: 'yeu_ha', say: [['yeu_ha_chu', 'Ngươi là kẻ vừa giết đốc công? Giám binh đang lật tung cả bờ sông. Xuống nước đi, Yêu Hà không giao người cho Thiên Đình.'], ['me', 'Sao ngươi giúp ta?'], ['yeu_ha_chu', 'Yêu tiên bọn ta cũng từng bị đóng dấu. Chỉ khác là bọn ta cắn đứt tay kẻ cầm dấu.']] },
        { gather: { loc: 'yeu_ha', hours: 1, label: 'Nấp dưới đáy Yêu Hà chờ giám binh đi qua' }, say: [['narr', 'Trên đầu ngươi, bóng giáo lướt qua mặt nước rồi xa dần.'], ['yeu_ha_chu', 'Xuôi dòng ba trăm dặm là cổng sau Vạn Tiên Thành. Đi đi, đừng nhớ mặt ta, nhớ mặt thì lỡ miệng.']] }
    ]
});

/* ---------- Địa Tiên: Vạn Tiên Thành, đấu trường của nô lệ thoát xích, đường áp giải và chợ đen ---------- */
reviseQuest('mc10_0', {
    steps: [
        { go: 'van_tien', say: [['van_nguyet', 'Kẻ giết đốc công là ngươi? Ta tưởng phải to con hơn.'], ['me', 'Ngươi là ai?'], ['van_nguyet', 'Người giả làm ăn mày ba trăm năm để đếm xem có bao nhiêu kẻ bị xích. Đi theo ta, đừng ngẩng đầu.']] },
        { go: 'bat_hoang', say: [['dau_no', 'Vân Nguyệt dẫn người mới tới à? Ở Bát Hoang, ai muốn vào Tán Tiên Minh thì phải đứng được ba hiệp với đấu nô của ta.'], ['me', 'Đấu nô cũng là người thoát xích?'], ['dau_no', 'Thoát xích chứ chưa thoát nghề. Ngoài đánh nhau ra bọn ta chẳng biết làm gì. Lên đài đi.']] },
        { hunt: { loc: 'bat_hoang', name: 'Đấu Nô', n: 3 }, say: [['dau_no', 'Được. Ngươi đánh như người từng cầm cuốc, không hoa mỹ, chỉ cốt sống.'], ['van_nguyet', 'Thiết Ngưu khen ai thì người đó dùng được. Từ hôm nay ngươi có chỗ ngủ ở Vạn Tiên Thành.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Kẻ giết đốc công là ngươi? Ta đọc được tờ khai của ngươi rồi: "Hàng quý, tính khí xấu."'], ['me', 'Ngươi lấy đâu ra?'], ['van_nguyet', 'Mua. Giá của ngươi trên chợ nô bằng giá một tòa lầu. Thiên Đình sẽ không bỏ món hàng đắt như vậy đâu, chúng sẽ đuổi theo.'], ['van_nguyet', 'Vậy nên Tán Tiên Minh cần ngươi làm mũi giáo, không phải làm bóng.']] },
                { go: 'bat_hoang', say: [['dau_no', 'Thiên phẩm à? Ta từng đánh chết ba tên Thiên phẩm trên đài này. Chúng đều nghĩ linh căn đánh thay chúng được.'], ['me', 'Ta không nghĩ vậy.'], ['dau_no', 'Thế thì lên đài chứng minh. Ta cho năm người, không phải ba.']] },
                { hunt: { loc: 'bat_hoang', name: 'Đấu Nô', n: 5 }, say: [['dau_no', 'Hừ. Linh căn tốt mà không ỷ. Hiếm đấy.'], ['van_nguyet', 'Ngươi sẽ ở tầng trên khách điếm, cửa sổ nhìn ra phía Lăng Tiêu. Để ngày nào cũng nhớ mình đang bị ai săn.']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Kẻ giết đốc công là ngươi? Tờ khai ghi linh căn hạng bét.'], ['me', 'Thất vọng à?'], ['van_nguyet', 'Ngược lại. Tán Tiên Minh toàn kẻ linh căn hạng bét. Kẻ có phẩm tốt đều đã được Thiên Đình mua đi trước khi kịp hận.']] },
                { go: 'bat_hoang', say: [['dau_no', 'Phẩm thấp à? Ta cũng vậy. Ở Bát Hoang không ai hỏi linh căn, chỉ hỏi ngươi chịu được mấy đòn.'], ['me', 'Bao nhiêu thì đủ?'], ['dau_no', 'Đến khi đối thủ mệt trước ngươi.']] },
                { hunt: { loc: 'bat_hoang', name: 'Tiên Cương Khôi', n: 3 }, say: [['dau_no', 'Khôi lỗi cương thiết, đánh đến gãy tay cũng không than. Ngươi đánh nó ba con mà không lùi bước nào.'], ['van_nguyet', 'Linh căn không tốt thì gan phải tốt. Ngươi có cái thứ hai. Đủ rồi.']] }
            ]
        }
    }
});

reviseQuest('mc10_1', {
    steps: [
        { go: 'tay_thien_mon', say: [['van_nguyet', 'Tây Thiên Môn là nơi người phi thăng bị đóng dấu rồi áp xuống mỏ. Chặn một chuyến cho ta xem.'], ['me', 'Bao nhiêu người trong một chuyến?'], ['van_nguyet', 'Mười bảy. Lúc nào cũng mười bảy. Thiên Đình thích số lẻ, dễ chia phần.']] },
        { hunt: { loc: 'tay_thien_mon', name: 'Thiên Binh Tây Môn', n: 4 }, say: [['narr', 'Mười bảy người trong xe áp giải nhìn ngươi. Không ai dám tháo xiềng, kể cả khi khóa đã mở.']] },
        { go: 'tru_tien', say: [['dan_tru_tien', 'Dẫn họ lên Tru Tiên Đài à? Chỗ này kiếm khí còn chưa tắt, thiên binh không dám đuổi lên.'], ['me', 'Còn người thì sao?'], ['dan_tru_tien', 'Người thì sợ kiếm khí hơn sợ thiên binh. Nhưng sợ một thứ không giết mình vẫn hơn.']] },
        { hunt: { loc: 'tru_tien', name: 'Tiên Kiếm Linh', n: 2 }, say: [['narr', 'Kiếm linh tan đi, để lại một khoảng đài trống đủ cho mười bảy người ngồi. Có người khóc, có người ngủ ngay lập tức.'], ['van_nguyet', 'Ngày mai sẽ có mười bảy người khác. Ngươi chặn được một chuyến, không chặn được con đường.']] }
    ]
});

reviseQuest('mc10_2', {
    steps: [
        { go: 'van_tien', say: [['tien_thuong', 'Ta bán đồ cho Thiên Đình, cũng bán cho Tán Tiên Minh. Đừng nhìn ta như thế, ai trả tiền thì là khách.'], ['me', 'Ai đang giám sát kẻ phi thăng?'], ['tien_thuong', 'Một sứ giả. Trong sổ của hắn có đủ thứ ngươi muốn biết. Trang về đường áp giải bị xé ra rồi, đang nằm ở Hắc Thị.']] },
        { go: 'hac_thi', say: [['hac_chu', 'Trang sổ của Giám Sát Sứ? Có. Giá là một việc, không phải tiền.'], ['me', 'Việc gì?'], ['hac_chu', 'Bọn cướp đêm qua lấy mất ba thùng hàng của ta. Mang về, trang sổ là của ngươi. Đừng hỏi trong thùng có gì.']] },
        { hunt: { loc: 'hac_thi', name: 'Kẻ Cướp Hắc Thị', n: 3 }, say: [['hac_chu', 'Đủ ba thùng. Đây, trang sổ. Hắn ghi tên từng chuyến áp giải và tên người nhận ở đầu kia.'], ['narr', 'Người nhận không có tên. Chỉ có một dấu ấn đen, không ai đọc được.']] }
    ],
    branches: {
        kim: {
            when: { el: 'Kim' }, tag: 'Kim linh căn',
            steps: [
                { go: 'van_tien', say: [['tien_thuong', 'Trang sổ về đường áp giải bị xé ra rồi, nằm ở Hắc Thị. Mạc Tam Nương không nhận tiền từ người lạ.'], ['me', 'Thế bà ta nhận gì?'], ['tien_thuong', 'Kim loại có lịch sử. Bà ta sưu tầm xích nô lệ, ta nói thật đấy.']] },
                { go: 'hac_thi', say: [['hac_chu', 'Xích của mỏ Vô Quang? Ngươi đưa ta, ta đưa trang sổ. Nhưng ta muốn nó được rèn lại thành thứ gì đó.'], ['me', 'Thành gì?'], ['hac_chu', 'Thành một cái khóa. Để ta khóa cửa Hắc Thị lại mỗi khi thiên binh tới.']] },
                { gather: { loc: 'hac_thi', hours: 2, label: 'Rèn xích nô lệ thành ổ khóa' }, say: [['narr', 'Dưới tay ngươi, sắt xích nguội dần thành một ổ khóa nặng trịch. Mạc Tam Nương cầm lên, gõ nhẹ, nghe tiếng ngân rất lâu.'], ['hac_chu', 'Ổ khóa này sẽ không bao giờ mở cho Thiên Đình. Trang sổ của ngươi đây.']] }
            ]
        },
        moc: {
            when: { el: 'Mộc' }, tag: 'Mộc linh căn',
            steps: [
                { go: 'van_tien', say: [['tien_thuong', 'Trang sổ đang ở Hắc Thị. Mạc Tam Nương có đứa em trai bệnh, cả Tiên Giới không ai chữa được.']] },
                { go: 'hac_thi', say: [['hac_chu', 'Ngươi biết dược? Em ta bị kiếm khí của Tru Tiên Đài cắt đứt kinh mạch từ năm mười tuổi.'], ['me', 'Cho ta xem.'], ['hac_chu', 'Chữa được thì trang sổ là của ngươi. Không chữa được thì đừng hứa.']] },
                { gather: { loc: 'hac_thi', hours: 2, label: 'Nối kinh mạch bằng mộc khí' }, say: [['narr', 'Mộc khí trong tay ngươi mọc chậm như rễ cây, tìm từng đầu kinh mạch đứt mà nối lại.'], ['hac_chu', 'Nó cử động được ngón tay rồi. Ta... cầm lấy trang sổ. Từ nay ở Hắc Thị ngươi là khách không cần trả tiền.']] }
            ]
        },
        thuy: {
            when: { el: 'Thủy' }, tag: 'Thủy linh căn',
            steps: [
                { go: 'van_tien', say: [['tien_thuong', 'Trang sổ ở Hắc Thị. Đường vào trên mặt đất đầy mật thám, nhưng dưới cống thì không ai canh.']] },
                { go: 'hac_thi', say: [['hac_chu', 'Đi đường cống mà vào à? Có gan. Hàng của ta bị cướp, chúng tẩu thoát cũng bằng đường cống.'], ['me', 'Vậy ta biết đuổi theo đường nào.']] },
                { hunt: { loc: 'hac_thi', name: 'Kẻ Cướp Hắc Thị', n: 4 }, say: [['narr', 'Nước dưới cống dâng lên theo tay ngươi, cuốn bọn cướp dạt vào chân tường.'], ['hac_chu', 'Lần sau vào cửa trước đi. Ngươi làm cả chợ ta ngập tới mắt cá chân. Trang sổ đây.']] }
            ]
        },
        hoa: {
            when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
            steps: [
                { go: 'van_tien', say: [['tien_thuong', 'Trang sổ ở Hắc Thị. Hắc Thị chỉ họp khi đèn âm thắp lên, mà đèn âm tối nay bị kẻ nào dập hết rồi.']] },
                { go: 'hac_thi', say: [['hac_chu', 'Bọn cướp dập đèn để cướp trong tối. Không có đèn thì chợ không họp, ta không bán gì được, kể cả trang sổ của ngươi.'], ['me', 'Ta thắp đèn.']] },
                { hunt: { loc: 'hac_thi', name: 'Kẻ Cướp Hắc Thị', n: 3 }, say: [['narr', 'Lửa của ngươi thắp lên từng ngọn đèn âm. Trong ánh xanh lè, bọn cướp không còn chỗ nấp.'], ['hac_chu', 'Lửa đẹp. Lần đầu đèn Hắc Thị cháy bằng lửa của một kẻ lương thiện. Trang sổ đây, đi đi trước khi ta đổi ý.']] }
            ]
        },
        tho: {
            when: { el: 'Thổ' }, tag: 'Thổ linh căn',
            steps: [
                { go: 'van_tien', say: [['tien_thuong', 'Trang sổ ở Hắc Thị, trong kho dưới đất của Mạc Tam Nương. Kho đó sập từ tuần trước, chưa ai đào ra được.']] },
                { go: 'hac_thi', say: [['hac_chu', 'Đào được kho ra thì trang sổ là của ngươi, cộng thêm một lời cảm ơn. Lời cảm ơn của ta hiếm hơn trang sổ.']] },
                { gather: { loc: 'hac_thi', hours: 2, label: 'Đào lại kho ngầm Hắc Thị' }, say: [['narr', 'Đất tách ra theo tay ngươi như rèm cửa. Kho ngầm còn nguyên, chỉ có bụi.'], ['hac_chu', 'Cảm ơn. Đấy, ta nói rồi. Trang sổ đây.']] }
            ]
        }
    }
});

reviseQuest('m12', {
    steps: [
        { go: 'van_tien', say: [['van_nguyet', 'Tán Tiên Minh không có lý tưởng. Chúng ta chỉ không muốn bị đào đến chết. Chứng minh ngươi có ích đi.'], ['me', 'Trang sổ ghi Giám Sát Sứ tối nay vào thành.'], ['van_nguyet', 'Hắn mang theo mật thám. Dọn chúng trước, rồi mới tới hắn.']] },
        { hunt: { loc: 'van_tien', name: 'Tiên Đạo Tặc', n: 3 }, say: [['narr', 'Dưới lớp áo đạo tặc là thẻ bài Thiên Đình. Mật thám giả làm cướp để có cớ lục soát nhà dân.']] },
        { boss: 'thien_tuong', say: [['van_nguyet', 'Sổ của tên giám sát này ghi rõ: linh tủy Tiên Giới không về Thiên Đình. Nó chảy ra khỏi Tiên Giới, tới một nơi không có trên bản đồ.']] }
    ]
});

/* ---------- Thiên Tiên: thư các, đường ống dưới Thiên Hà, trở lại mỏ ---------- */
reviseQuest('mc11_0', {
    steps: [
        { go: 'van_tien', say: [['van_nguyet', 'Thiên Đình tiêu chưa tới một phần mười số linh tủy đào lên. Phần còn lại chảy đi đâu?'], ['me', 'Lên Thánh Giới?'], ['van_nguyet', 'Ta cũng từng nghĩ vậy. Nhưng đường ống không đi lên, nó đi ra ngoài. Bản vẽ đường ống nằm trong Thái Hư Thư Các.']] },
        { go: 'thien_ha', say: [['van_nguyet', 'Thư các nằm bên kia Thiên Hà. Qua sông sao thì đi sát bờ, Tinh Hồn ở giữa dòng không thích người lạ.']] },
        { go: 'thai_ho', say: [['dan_thai_ho', 'Thư các này cửa khép hờ vì Thiên Đình tin không ai dám vào. Thư linh canh sách thì không tin ai cả.'], ['me', 'Bản vẽ đường ống nằm ở đâu?'], ['dan_thai_ho', 'Tầng chín, kệ cuối. Cuốn sách mỏng nhất, vì đó là thứ người ta muốn quên nhất.']] },
        { hunt: { loc: 'thai_ho', name: 'Thư Linh', n: 3 }, say: [['narr', 'Thư linh tan thành những trang giấy trắng bay lả tả. Không trang nào có chữ, chúng đã quên hết những gì từng giữ.']] },
        { gather: { loc: 'thai_ho', hours: 2, label: 'Chép lại bản vẽ đường ống' }, say: [['narr', 'Đường ống chạy dưới Thiên Hà, qua Nam Thiên Môn rồi đâm thẳng vào một chỗ trống trên bản đồ, nơi người vẽ chỉ để lại một vòng tròn đen.'], ['van_nguyet', 'Vậy kẻ thù của chúng ta không ở Lăng Tiêu Điện. Giờ thì sợ đi.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 5 }, tag: 'Linh căn cao phẩm',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Bản vẽ đường ống nằm trong Thái Hư Thư Các, bị phong bằng mực chỉ linh căn cao phẩm mới thấy.'], ['me', 'Thiên Đình phòng ai mà dùng thứ mực ấy?'], ['van_nguyet', 'Phòng chính tiên nô. Họ biết người phẩm cao đều đã bị mua về làm việc cho họ.']] },
                { go: 'thien_ha', say: [['van_nguyet', 'Đi sát bờ Thiên Hà mà sang. Kẻ có linh căn như ngươi, Tinh Hồn ngửi thấy từ xa.']] },
                { go: 'thai_ho', say: [['dan_thai_ho', 'Ngươi nhìn thấy dòng chữ trên kệ kia à? Ta canh thư các hai trăm năm mà chỉ thấy giấy trắng.'], ['me', 'Có chữ. Viết bằng thứ mực sáng như linh tủy.']] },
                { gather: { loc: 'thai_ho', hours: 1, label: 'Đọc bản vẽ phong ấn' }, say: [['narr', 'Từng nét mực hiện lên dưới mắt ngươi: đường ống dưới Thiên Hà, qua Nam Thiên Môn, rồi đâm vào một vòng tròn đen ở mép bản đồ.'], ['narr', 'Dưới vòng tròn có một dòng nhỏ: "Phần của khế. Không được ghi vào sổ thuế."'], ['van_nguyet', 'Khế với ai? Thiên Đình còn ký với ai nữa?']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Bản vẽ ở Thái Hư Thư Các, phong bằng mực chỉ người linh căn cao mới đọc được. Ngươi không đọc được, ta cũng không.'], ['me', 'Vậy thì lấy cả cuốn sách mang về.'], ['van_nguyet', 'Thư linh sẽ xé xác ngươi. Nhưng ý hay.']] },
                { go: 'thien_ha', say: [['van_nguyet', 'Qua Thiên Hà đi, lúc về thì chạy cho nhanh.']] },
                { go: 'thai_ho', say: [['dan_thai_ho', 'Lấy cả cuốn? Thư linh sẽ đuổi tới khi sách về kệ. Ngươi đánh đủ nhiều thì chúng mệt.']] },
                { hunt: { loc: 'thai_ho', name: 'Thư Linh', n: 5 }, say: [['narr', 'Cuốn sách mỏng nằm trong áo ngươi, nóng như hòn than. Phía sau, thư linh cuối cùng tan thành giấy trắng.'], ['van_nguyet', 'Ta mua được một kẻ phẩm cao biết đọc, hắn đọc xong thì khóc. Đường ống chạy ra khỏi Tiên Giới, vào một vòng tròn đen.']] }
            ]
        }
    }
});

reviseQuest('mc11_1', {
    steps: [
        { go: 'thien_ha', say: [['van_nguyet', 'Tinh Hồn làm tổ quanh đường ống. Dọn sạch để ta đo mạch.']] },
        { hunt: { loc: 'thien_ha', name: 'Tinh Hồn', n: 5 }, say: [['narr', 'Áp tai vào đường ống, ngươi nghe tiếng cuốc rất xa vọng lại theo dòng linh tủy.']] }
    ],
    branches: {
        thuy: {
            when: { el: 'Thủy' }, tag: 'Thủy linh căn',
            steps: [
                { go: 'thien_ha', say: [['van_nguyet', 'Đường ống chôn sâu dưới tinh quang, không ai thấy được.'], ['me', 'Không cần thấy. Linh tủy là thứ lỏng, nó chảy thì ta nghe.'], ['narr', 'Ngươi nhắm mắt. Dòng linh tủy chảy trong lòng ngươi như một con sông thứ hai, xuôi về phía đông nam.']] },
                { hunt: { loc: 'thien_ha', name: 'Tinh Hồn', n: 4 }, say: [['van_nguyet', 'Ngươi chỉ đúng chỗ. Ống ở ngay dưới tổ Tinh Hồn.'], ['narr', 'Dòng chảy mạnh tới mức làm tay ngươi tê dại. Mỗi ngày Tiên Giới mất một con sông như thế.']] }
            ]
        },
        kim: {
            when: { el: 'Kim' }, tag: 'Kim linh căn',
            steps: [
                { go: 'thien_ha', say: [['me', 'Đường ống bằng tiên kim. Ta nghe được nó rung.'], ['van_nguyet', 'Rung thế nào?'], ['me', 'Như một sợi dây đàn bị kéo căng tới sắp đứt.']] },
                { hunt: { loc: 'thien_ha', name: 'Tinh Giao', n: 3 }, say: [['narr', 'Tinh giao quấn quanh đường ống như rắn quấn cột. Chúng ăn hơi linh tủy rỉ ra từ những mối hàn.'], ['van_nguyet', 'Mối hàn bị rỉ. Vậy là đường ống cũng già rồi, giống chúng ta.']] }
            ]
        },
        hoa: {
            when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
            steps: [
                { go: 'thien_ha', say: [['me', 'Chỗ này nóng hơn chỗ khác. Linh tủy chảy nhanh thì sinh nhiệt.'], ['van_nguyet', 'Ngươi đi theo hơi nóng như chó săn đi theo mùi. Đi đi.']] },
                { hunt: { loc: 'thien_ha', name: 'Tinh Hồn', n: 5 }, say: [['narr', 'Tinh hồn bu kín đoạn ống nóng nhất như bầy thiêu thân. Đốt sạch, ngươi thấy mặt ống đỏ rực, khắc đầy những dấu ấn đen.']] }
            ]
        },
        moc: {
            when: { el: 'Mộc' }, tag: 'Mộc linh căn',
            steps: [
                { go: 'thien_ha', say: [['me', 'Ta gieo hạt xuống. Rễ cây sẽ tìm tới chỗ có linh khí.'], ['van_nguyet', 'Gieo cây giữa Thiên Hà? Người ta sẽ tưởng ngươi điên.']] },
                { gather: { loc: 'thien_ha', hours: 1, label: 'Chờ rễ cây tìm đường ống' }, say: [['narr', 'Rễ cây bò dưới tinh quang, cong về một hướng, rồi quấn chặt lấy một thứ gì đó cứng và lạnh.'], ['van_nguyet', 'Ống đây. Rễ cây của ngươi đang uống linh tủy của Thiên Đình. Để nó uống đi.']] },
                { hunt: { loc: 'thien_ha', name: 'Tinh Hồn', n: 3 }, say: [['narr', 'Tinh hồn kéo tới gặm rễ cây. Ngươi đuổi chúng đi. Cái cây nhỏ đứng thẳng giữa dòng sao.']] }
            ]
        },
        tho: {
            when: { el: 'Thổ' }, tag: 'Thổ linh căn',
            steps: [
                { go: 'thien_ha', say: [['me', 'Ở dưới Thiên Hà vẫn là đất. Đất thì biết cái gì đang đè lên nó.'], ['narr', 'Ngươi áp lòng bàn tay xuống. Đất kể cho ngươi nghe về một vật dài vô tận, nặng như núi, chạy từ mỏ ra mép thế giới.']] },
                { hunt: { loc: 'thien_ha', name: 'Tinh Giao', n: 3 }, say: [['van_nguyet', 'Ngươi chỉ chỗ, bọn giao long lao ra. Có vẻ chúng được nuôi để canh ống.']] }
            ]
        }
    }
});

reviseQuest('mc11_2', {
    steps: [
        { go: 'tien_khoang', say: [['tien_lai', 'Con về thật à? Ta tưởng kẻ thoát rồi không ai ngoái lại.'], ['me', 'Lão vẽ cho con sơ đồ các hầm.'], ['tien_lai', 'Ba ngàn năm ta chỉ thuộc mỗi cái đó. Nhưng sơ đồ thật lão giấu dưới tầng sáu, chỗ khoáng thi đông nhất.']] },
        { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 4 }, say: [['narr', 'Dưới tầng sáu, trong một hốc đá, có tấm da thuộc vẽ bằng máu khô. Ba ngàn năm, từng nét một.'], ['tien_lai', 'Cầm lấy. Và nhớ ăn, trông con gầy lắm.']] },
        { go: 'yeu_ha', say: [['yeu_ha_chu', 'Ngươi còn sống à. Ta nghe nói ngươi đang đào mộ Thiên Đình.'], ['me', 'Ống linh tủy có chạy qua Yêu Hà không?'], ['yeu_ha_chu', 'Có. Mỗi năm sông cạn đi một chút. Bọn ta tưởng trời phạt, hóa ra là người ta hút.']] }
    ]
});

/* ---------- Chân Tiên: bảy ngày, cung trăng, ao sen, ngục tối ---------- */
reviseQuest('mc12_0', {
    steps: [
        { go: 'van_tien', say: [['van_nguyet', 'Vết kiếm của ngươi lan tới tim rồi. Bảy ngày, không hơn.'], ['me', 'Cuộc chiến thì sao?'], ['van_nguyet', 'Người chết thì không chiến được. Đi Dao Trì. Nhưng trước đó ghé Quảng Hàn Cung, hàn khí ở đó làm kiếm khí chậm lại.']] },
        { go: 'quang_han', say: [['hang_nga', 'Kiếm khí của Thông Thiên à. Ta thấy nó sáng từ xa, như một ngôi sao rơi nhầm chỗ.'], ['me', 'Bà làm nó chậm lại được không?'], ['hang_nga', 'Ta chỉ có lạnh. Lạnh không chữa được gì, chỉ làm mọi thứ chờ lâu hơn.']] },
        { gather: { loc: 'quang_han', hours: 2, label: 'Ngâm mình trong hàn quang' }, say: [['narr', 'Hàn quang thấm vào kinh mạch. Kiếm khí trong ngực ngươi co lại như con rắn gặp băng.'], ['hang_nga', 'Bảy ngày thành mười bốn. Đi đi. Dao Trì còn xa, và Thánh Mẫu không thích khách đến muộn.']] }
    ],
    branches: {
        hoa: {
            when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Vết kiếm lan tới tim rồi, bảy ngày. Ngươi lại là Hỏa linh căn, lửa trong người đang nuôi kiếm khí.'], ['me', 'Vậy phải làm sao?'], ['van_nguyet', 'Ghé Quảng Hàn Cung. Lạnh với ngươi sẽ đau, nhưng đau còn hơn chết.']] },
                { go: 'quang_han', say: [['hang_nga', 'Hỏa linh căn mà tới cung trăng. Ngươi đứng đây thì cây quế cũng nóng lên.'], ['me', 'Bà có cách gì không?'], ['hang_nga', 'Nguyệt hồn ăn lửa. Để chúng gặm bớt lửa của ngươi, rồi ta mới làm lạnh được.']] },
                { hunt: { loc: 'quang_han', name: 'Nguyệt Hồn', n: 3 }, say: [['narr', 'Mỗi nguyệt hồn lao vào ngươi lại mang đi một ngọn lửa. Ngươi lạnh dần, run lên, nhưng kiếm khí cũng chậm lại.'], ['hang_nga', 'Đủ rồi. Ngươi giờ chỉ còn ấm như người thường. Mười bốn ngày. Đi Dao Trì.']] }
            ]
        },
        thuy: {
            when: { el: 'Thủy' }, tag: 'Thủy linh căn',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Vết kiếm lan tới tim rồi, bảy ngày. Ngươi là Thủy linh căn, hàn khí Quảng Hàn hợp với ngươi.']] },
                { go: 'quang_han', say: [['hang_nga', 'Thủy linh căn. Ngươi có thể ở lại đây lâu hơn người khác. Muốn ở luôn không?'], ['me', 'Bà cô đơn à?'], ['hang_nga', 'Một cây quế, một con thỏ, ba ngàn năm. Ngươi đoán xem.']] },
                { gather: { loc: 'quang_han', hours: 3, label: 'Cùng Hằng Nga ngồi dưới gốc quế' }, say: [['narr', 'Hàn khí hòa vào nước trong người ngươi, đóng băng kiếm khí thành một mảnh pha lê nhỏ nằm im cạnh tim.'], ['hang_nga', 'Hai mươi ngày. Nhiều hơn người khác. Lâu lâu quay lại kể chuyện, ta không đòi gì hơn.']] }
            ]
        },
        moc: {
            when: { el: 'Mộc' }, tag: 'Mộc linh căn',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Vết kiếm lan tới tim rồi. Ghé Quảng Hàn Cung trước, rồi đi Dao Trì.']] },
                { go: 'quang_han', say: [['hang_nga', 'Mộc linh căn. Ngươi nghe thấy cây quế nói gì không?'], ['me', 'Nó nói nó mệt. Bị chặt ba ngàn năm không đổ.'], ['hang_nga', 'Ta chưa từng biết điều đó. Ta chỉ biết nó không đổ.']] },
                { gather: { loc: 'quang_han', hours: 2, label: 'Chữa vết chặt trên cây quế' }, say: [['narr', 'Vết chặt trên thân quế khép lại. Một chiếc lá mới mọc ra, lần đầu sau ba ngàn năm.'], ['hang_nga', 'Đổi lại, nhựa quế sẽ giữ kiếm khí cho ngươi. Mười bốn ngày. Cảm ơn ngươi đã hỏi nó.']] }
            ]
        }
    }
});

reviseQuest('mc12_1', {
    steps: [
        { go: 'dao_tri', say: [['narr', 'Hộ vệ Dao Trì không nhận thư của Tán Tiên Minh. Họ chỉ nhận kẻ còn đứng được.']] },
        { hunt: { loc: 'dao_tri', name: 'Dao Trì Hộ Vệ', n: 4 }, say: [['dao_tri_mau', 'Đủ rồi. Đứa nào mang kiếm khí của Thông Thiên mà còn đánh được, cứ để nó vào.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            steps: [
                { go: 'dao_tri', say: [['narr', 'Hộ vệ Dao Trì nhìn ngươi rất lâu rồi lùi lại một bước.'], ['dao_tri_mau', 'Linh căn như vậy, Hạo Thiên mà biết sẽ muốn ngươi làm con nuôi. Ngươi có biết hắn từng là ai không?'], ['me', 'Không.'], ['dao_tri_mau', 'Vào đi. Ta kể cho ngươi nghe, rồi ngươi sẽ không muốn làm con ai cả.']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            steps: [
                { go: 'dao_tri', say: [['narr', 'Hộ vệ chặn ngươi ngoài cửa. Phẩm thấp thế này mà đòi gặp Thánh Mẫu.'], ['me', 'Ta không còn thời gian để cãi.']] },
                { gather: { loc: 'dao_tri', hours: 1, label: 'Quỳ trước cửa ao sen' }, say: [['narr', 'Ngươi quỳ trên bậc đá lạnh. Kiếm khí cào vào tim từng đợt.']] },
                { hunt: { loc: 'dao_tri', name: 'Dao Trì Hộ Vệ', n: 5 }, say: [['dao_tri_mau', 'Quỳ một canh rồi đứng dậy đánh năm người. Phẩm không cao mà chí không thấp. Vào đi, đứa nhỏ.']] }
            ]
        }
    }
});

reviseQuest('mc12_2', {
    steps: [
        { go: 'dao_tri', say: [['me', 'Vì sao bà giúp ta?'], ['dao_tri_mau', 'Hạo Thiên từng là một tiên nô như ngươi. Hắn thề sẽ đóng cửa mỏ.'], ['me', 'Rồi sao?'], ['dao_tri_mau', 'Rồi hắn ngồi lên ngai vàng. Con ta còn bị giữ dưới tay Cự Linh để ta không dám mở miệng.']] },
        { go: 'u_minh', say: [['dan_u_minh', 'Ngươi hỏi đứa nhỏ Cự Linh giữ ở đây à? Nó ở tầng dưới cùng, cạnh những tiên nhân nhập ma.'], ['me', 'Sao lại giam cùng bọn nhập ma?'], ['dan_u_minh', 'Để Thánh Mẫu biết, ngày nào bà mở miệng thì con bà sẽ thành một trong số chúng.']] },
        { hunt: { loc: 'u_minh', name: 'Đọa Tiên', n: 3 }, say: [['narr', 'Đọa tiên ngã xuống, mắt vẫn đỏ. Trên cổ tay một kẻ có vết dấu nô lệ mờ, giống hệt dấu trên tay ngươi.']] }
    ]
});

reviseQuest('m14', {
    steps: [
        { go: 'dao_tri', say: [['dao_tri_mau', 'Kiếm khí Thông Thiên còn nằm trong kinh mạch ngươi. Ngồi xuống, ta rút cho. Rồi đi giết Cự Linh, hắn đang canh con ta.']] },
        { gather: { loc: 'dao_tri', hours: 6, label: 'Rút kiếm khí' } },
        { go: 'u_minh', say: [['dao_tri_mau', 'Hắn ở U Minh Ngục. Đừng nhìn vào mắt đứa nhỏ nếu nó đã đỏ. Mang nó về, đỏ hay không cũng mang về.']] },
        { boss: 'cu_linh', say: [['dao_tri_mau', 'Hạo Thiên đã ký một khế ước, với kẻ không ở Tiên Giới. Ta từng là vợ hắn mà chưa bao giờ thấy mặt kẻ đó.']] }
    ]
});

/* ---------- Huyền Tiên: liên minh yêu tộc, rồi đóng mỏ ---------- */
reviseQuest('mc13_0', {
    steps: [
        { go: 'van_tien', say: [['van_nguyet', 'Sơ đồ của Bạch Lão Đầu, kiếm của ngươi, ba ngàn tán tiên. Đủ để đóng cửa một cái mỏ.'], ['me', 'Chỉ một cái?'], ['van_nguyet', 'Cái lớn nhất. Nhưng ba ngàn người không đủ chặn thiên binh. Cần yêu tộc. Đi Vạn Yêu Đô.']] },
        { go: 'yeu_do', say: [['dan_yeu_do', 'Người lạ ở Vạn Yêu Đô phải cúi đầu. Ngươi không cúi, vậy là có chuyện muốn nói.'], ['me', 'Tán Tiên Minh muốn liên minh với yêu tộc để đóng mỏ Vô Quang.'], ['dan_yeu_do', 'Hội đồng yêu tộc có bốn nhà: Vạn Yêu Quan, Thập Vạn Đại Sơn, Thanh Khâu và Hóa Long Trì. Thuyết phục đủ bốn nhà thì Yêu Đô mới mở cửa.']] },
        { hunt: { loc: 'yeu_do', name: 'Yêu Đô Cấm Vệ', n: 2 }, say: [['narr', 'Cấm vệ thử sức người lạ như thử mùi. Ngã hai tên, phần còn lại lùi ra nhường đường.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Đóng mỏ cần yêu tộc. Yêu tộc chỉ nói chuyện với kẻ mạnh, mà ngươi thì có thứ linh căn làm yêu vật phải ngửi theo.']] },
                { go: 'yeu_do', say: [['dan_yeu_do', 'Linh căn này... Hội đồng sẽ muốn gặp ngươi ngay. Nhưng chúng cũng sẽ muốn ăn ngươi.'], ['me', 'Ta sẽ để chúng thử.'], ['dan_yeu_do', 'Bốn nhà: Vạn Yêu Quan, Thập Vạn Đại Sơn, Thanh Khâu, Hóa Long Trì. Đi đủ bốn nơi, nói đủ bốn lần.']] }
            ]
        },
        tap: {
            when: { hybrid: true }, tag: 'Tạp linh căn',
            steps: [
                { go: 'van_tien', say: [['van_nguyet', 'Đóng mỏ cần yêu tộc. Yêu tộc ghét người, nhưng ghét nhất là người thuần chủng tự cao. Ngươi là tạp linh căn, có khi lại hợp.']] },
                { go: 'yeu_do', say: [['dan_yeu_do', 'Ngươi mang nhiều hành trong người như yêu tộc lai. Ở đây không ai coi ngươi là người lạ hẳn.'], ['me', 'Vậy có dễ nói chuyện hơn không?'], ['dan_yeu_do', 'Dễ được vào cửa hơn. Nói chuyện thì vẫn phải đi đủ bốn nhà.']] },
                { hunt: { loc: 'yeu_do', name: 'Yêu Đô Cấm Vệ', n: 1 }, say: [['narr', 'Cấm vệ chỉ đánh lấy lệ một hiệp rồi tránh đường, như với người trong tộc.']] }
            ]
        }
    }
});

reviseQuest('mc13_1', {
    title: 'Bốn Nhà Yêu Tộc',
    steps: [
        { go: 'yeu_quan', say: [['dan_yeu_quan', 'Vạn Yêu Quan chia đất người và đất yêu. Ngươi muốn mở cửa quan cho tiên nô chạy sang?'], ['me', 'Chỉ khi có chiến.'], ['dan_yeu_quan', 'Lang Tướng không nghe lời nói. Hạ ba con, chúng sẽ tự nghe.']] },
        { hunt: { loc: 'yeu_quan', name: 'Lang Tướng', n: 3 }, say: [['narr', 'Lang tướng cuối cùng ngửa cổ ra. Ở Vạn Yêu Quan, đó là lời thề.']] },
        { go: 'thap_van_son', say: [['dan_thap_van_son', 'Mười vạn ngọn núi, mười vạn chủ. Chúng không đồng ý gì với nhau cả, trừ một điều: ghét Thiên Đình.'], ['me', 'Thế là đủ.']] },
        { hunt: { loc: 'thap_van_son', name: 'Sơn Quân', n: 3 }, say: [['narr', 'Ba Sơn Quân bại trận cùng gầm một tiếng. Khắp mười vạn ngọn núi, tiếng gầm vọng lại như đồng ý.']] },
        { go: 'thanh_khau', say: [['ho_hau', 'Người đã đến được Thanh Khâu thì hẳn đã đi lạc ít nhất ba lần. Đường ở đây đổi theo tiếng cười của ta.'], ['me', 'Hồ tộc có theo không?'], ['ho_hau', 'Hồ tộc không ra trận. Hồ tộc nói dối cho người ra trận. Thiên Đình sẽ nghe tin quân ngươi ở phía tây, trong khi ngươi ở phía đông.']] },
        { go: 'hoa_long_tri', say: [['dan_hoa_long_tri', 'Giao mãng ở đây chờ hóa rồng mấy ngàn năm. Thiên Đình giữ long môn, chỉ cho con nào chịu làm thú cưỡi được bước qua.'], ['me', 'Đóng mỏ rồi, long môn cũng phải mở.']] },
        { hunt: { loc: 'hoa_long_tri', name: 'Mãng Tướng', n: 3 }, say: [['narr', 'Mãng tướng cuộn mình lại, đặt đầu xuống chân ngươi. Bốn nhà yêu tộc đã nghe.'], ['dan_hoa_long_tri', 'Ngày đóng mỏ, nước Hóa Long Trì sẽ tràn về Thiên Hà. Đừng đứng ở chỗ trũng.']] }
    ],
    branches: {
        hoa: {
            when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
            steps: [
                { go: 'yeu_quan', say: [['dan_yeu_quan', 'Lang tộc sợ lửa. Ngươi mang lửa đến cửa quan là muốn dọa hay muốn kết giao?'], ['me', 'Kết giao. Lửa này để đốt xích, không đốt lông.']] },
                { hunt: { loc: 'yeu_quan', name: 'Lang Tướng', n: 2 }, say: [['narr', 'Hai lang tướng xông lên rồi dừng lại cách ngọn lửa một bước. Chúng thử ngươi, ngươi không đốt. Thế là đủ.']] },
                { go: 'thap_van_son', say: [['dan_thap_van_son', 'Thập Vạn Đại Sơn có núi lửa. Sơn Quân núi lửa sẽ thích ngươi, những kẻ khác thì sợ cháy rừng.']] },
                { hunt: { loc: 'thap_van_son', name: 'Thụ Yêu', n: 3 }, say: [['narr', 'Thụ yêu kéo đến dập lửa trước khi kịp nghe. Ngươi đánh lui chúng mà không cháy một cành.']] },
                { go: 'thanh_khau', say: [['ho_hau', 'Lửa của ngươi soi được đường đi trong ảo trận. Lần đầu có kẻ tới Thanh Khâu không bị lạc.'], ['me', 'Hồ tộc theo chứ?'], ['ho_hau', 'Theo. Nhưng ta muốn một ngọn lửa của ngươi để thắp trong miếu tổ. Hồ tộc nhớ ơn bằng lửa.']] },
                { go: 'hoa_long_tri', say: [['dan_hoa_long_tri', 'Giao mãng ghét lửa, nước của chúng sôi lên khi ngươi lại gần.'], ['me', 'Vậy ta đứng xa mà nói.']] },
                { hunt: { loc: 'hoa_long_tri', name: 'Bán Long', n: 3 }, say: [['narr', 'Bán long lao ra từ làn nước sôi. Ngươi hạ chúng mà không thêm một giọt lửa. Bốn nhà đã nghe.']] }
            ]
        },
        thuy: {
            when: { el: 'Thủy' }, tag: 'Thủy linh căn',
            steps: [
                { go: 'hoa_long_tri', say: [['dan_hoa_long_tri', 'Thủy linh căn! Giao mãng sẽ nghe ngươi trước. Nước gọi nước.'], ['me', 'Vậy ta bắt đầu từ đây.']] },
                { gather: { loc: 'hoa_long_tri', hours: 1, label: 'Gọi giao mãng lên mặt ao' }, say: [['narr', 'Mặt ao gợn sóng theo nhịp thở của ngươi. Từng cái đầu giao mãng ngoi lên, lặng lẽ nghe.'], ['dan_hoa_long_tri', 'Hóa Long Trì theo ngươi. Ba nhà kia khó hơn đấy.']] },
                { go: 'thanh_khau', say: [['ho_hau', 'Giao mãng đã theo thì hồ tộc cũng theo. Chúng ta chỉ ghét đi đầu thôi.']] },
                { go: 'yeu_quan', say: [['dan_yeu_quan', 'Hóa Long Trì và Thanh Khâu đều đã gật? Lang tộc không chịu đứng cuối.']] },
                { hunt: { loc: 'yeu_quan', name: 'Lang Tướng', n: 3 }, say: [['narr', 'Lang tướng bại trận ngửa cổ ra. Vạn Yêu Quan đã thề.']] },
                { go: 'thap_van_son', say: [['dan_thap_van_son', 'Ba nhà đều theo rồi, mười vạn núi không lẽ đứng ngoài. Nhưng Sơn Quân phải thử ngươi.']] },
                { hunt: { loc: 'thap_van_son', name: 'Sơn Quân', n: 3 }, say: [['narr', 'Tiếng gầm vọng khắp mười vạn ngọn núi. Bốn nhà đã nghe.']] }
            ]
        },
        tho: {
            when: { el: 'Thổ' }, tag: 'Thổ linh căn',
            steps: [
                { go: 'thap_van_son', say: [['dan_thap_van_son', 'Thổ linh căn. Mười vạn ngọn núi nghe được bước chân ngươi từ lúc ngươi còn ở Yêu Đô.'], ['me', 'Chúng nói gì?'], ['dan_thap_van_son', 'Chúng nói ngươi bước nhẹ. Núi thích kẻ bước nhẹ.']] },
                { gather: { loc: 'thap_van_son', hours: 1, label: 'Ngồi nghe núi nói' }, say: [['narr', 'Từ chân núi, tiếng đá chuyển mình truyền đi như lời truyền tin. Các Sơn Quân lần lượt cúi đầu.']] },
                { go: 'yeu_quan', say: [['dan_yeu_quan', 'Núi đã theo, quan cũng theo. Nhưng lang tộc vẫn phải thử.']] },
                { hunt: { loc: 'yeu_quan', name: 'Yêu Binh Thủ Quan', n: 3 }, say: [['narr', 'Yêu binh thủ quan dạt ra. Cửa quan mở hé một khe.']] },
                { go: 'thanh_khau', say: [['ho_hau', 'Hồ tộc theo. Ta chỉ hỏi một câu: ngươi có định ở lại Tiên Giới khi mọi chuyện xong không?'], ['me', 'Chưa biết.'], ['ho_hau', 'Câu trả lời thật nhất ta nghe năm nay.']] },
                { go: 'hoa_long_tri', say: [['dan_hoa_long_tri', 'Đất của ngươi giữ được bờ ao khi nước dâng. Giao mãng theo.']] },
                { hunt: { loc: 'hoa_long_tri', name: 'Mãng Tướng', n: 2 }, say: [['narr', 'Mãng tướng cuộn mình đặt đầu xuống chân ngươi. Bốn nhà đã nghe.']] }
            ]
        }
    }
});

reviseQuest('mc13_2', {
    title: 'Hầm Dưới Cùng',
    steps: [
        { go: 'tien_khoang', say: [['tien_lai', 'Tầng dưới cùng không có đèn. Mấy trăm năm nay người xuống đó đều không lên.'], ['me', 'Ở dưới đó có gì?'], ['tien_lai', 'Có chỗ bắt đầu của đường ống. Đóng ở đó thì cả mỏ chết.']] },
        { hunt: { loc: 'tien_khoang', name: 'Khoáng Thi', n: 6 }, say: [['narr', 'Tầng dưới cùng là một cái hồ linh tủy. Bên bờ chất đầy những chiếc cuốc đã mòn nhẵn.']] },
        { go: 'tien_khoang', say: [['me', 'Bỏ cuốc xuống. Từ hôm nay không còn ca nào nữa.'], ['tien_lai', 'Nghe chưa, số bốn trăm mười hai này ba ngàn năm mới được nghe câu đó.'], ['narr', 'Hàng vạn tiên nô đứng im. Rồi có người bật khóc, không ai biết nên đi về đâu.'], ['yeu_ha_chu', 'Về Yêu Hà. Sông cạn rồi, cần người đào lại lòng sông. Lần này đào cho mình.']] }
    ]
});

/* Từ Kim Tiên trở đi: giữ bước gốc (có cả việc đưa thiếp các giáo phái), chỉ thêm bước trước, sau và nhánh */
function extendQuest(id, part) {
    const q = QUEST_INDEX[id];
    const base = q.steps;
    q.steps = [...(part.before || []), ...base, ...(part.after || [])];
    if (part.branches) q.branches = Object.fromEntries(Object.entries(part.branches).map(([key, b]) => [key, { when: b.when, tag: b.tag, steps: [...(b.before || []), ...base, ...(b.after || [])] }]));
}

/* ---------- Kim Tiên: vào triều ---------- */
extendQuest('mc14_0', {
    after: [
        { go: 'bac_thien_mon', say: [['thai_bach', 'Tiên Quan mới nhận ấn ở Bắc Thiên Môn. Huyền Vũ Vệ giữ ấn, chúng chỉ trao cho kẻ đỡ được một đòn.'], ['me', 'Một đòn của ai?'], ['thai_bach', 'Của chính cái cổng. Bắc Thiên Môn nặng bằng cả Thiên Hà.']] },
        { hunt: { loc: 'bac_thien_mon', name: 'Huyền Vũ Vệ', n: 2 }, say: [['narr', 'Huyền Vũ Vệ lùi về hai bên cổng. Ấn Tiên Quan nằm trong tay ngươi, lạnh như một hòn đá dưới mỏ.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            after: [
                { go: 'bac_thien_mon', say: [['thai_bach', 'Bệ hạ nhìn tờ khai cũ của ngươi rồi. Linh căn như vậy, ngài ban hẳn chức Thiên Tướng, không phải Tiên Quan.'], ['me', 'Vì sao?'], ['thai_bach', 'Vì một thanh kiếm tốt thì phải treo trong nhà mình, kẻo người khác nhặt được.']] },
                { hunt: { loc: 'bac_thien_mon', name: 'Huyền Vũ Vệ', n: 3 }, say: [['narr', 'Ấn Thiên Tướng nặng gấp đôi ấn Tiên Quan. Trên ấn có khắc tên ngươi, nét mực còn ướt như vừa viết hôm qua.'], ['van_nguyet', 'Hắn đã chuẩn bị ấn từ trước khi ngươi đóng mỏ. Hiểu chưa? Hắn biết ngươi sẽ thắng.']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            after: [
                { go: 'bac_thien_mon', say: [['thai_bach', 'Chức của ngươi là Giám Mã, trông chuồng thiên mã ở Bắc Thiên Môn. Đừng giận, triều đình đọc tờ khai chứ không đọc chiến công.'], ['me', 'Ta không giận. Chuồng ngựa ở gần cổng.'], ['thai_bach', 'Ha. Ta sẽ coi như không nghe thấy câu đó.']] },
                { gather: { loc: 'bac_thien_mon', hours: 1, label: 'Cho thiên mã ăn' }, say: [['narr', 'Thiên mã ăn cỏ từ tay ngươi. Lính gác cổng cười cợt, nhưng tối đó chúng kể với nhau rằng Giám Mã mới biết tên từng con ngựa.'], ['van_nguyet', 'Kẻ trông ngựa biết cổng mở lúc nào. Chức thấp nhất lại là chức có ích nhất.']] }
            ]
        }
    }
});

/* ---------- Tiên Đế: một đời trên một ghế ---------- */
extendQuest('mc15_0', {
    after: [
        { gather: { loc: 'lang_tieu', hours: 1, label: 'Đứng hầu buổi chầu cuối của Thiên Đế' }, say: [['narr', 'Trăm quan tâu chuyện mưa gió, không ai nhắc tới cái mỏ đã đóng. Hạo Thiên nghe hết, không ngắt lời ai.'], ['tien_de', 'Ngươi thấy không? Họ không hỏi ta linh tủy đi đâu. Ba ngàn năm, không một ai hỏi.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            after: [
                { gather: { loc: 'lang_tieu', hours: 1, label: 'Ngồi bên Thiên Đế trong buổi chầu' }, say: [['tien_de', 'Linh căn ngươi tốt hơn ta ngày ấy nhiều. Ngồi gần đây, sau này ghế này của ngươi.'], ['me', 'Bệ hạ muốn có người kế vị, hay người thay chỗ ký khế?'], ['tien_de', 'Câu đó... ta từng hỏi người ngồi trước ta. Hắn cũng không trả lời.']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            after: [
                { gather: { loc: 'lang_tieu', hours: 1, label: 'Đứng cuối hàng triều thần' }, say: [['tien_de', 'Đứng cuối hàng à? Ngày xưa ta cũng đứng chỗ đó. Linh căn của ta còn tệ hơn ngươi.'], ['me', 'Vậy sao bệ hạ lên được ngai?'], ['tien_de', 'Vì kẻ bên ngoài cần một kẻ biết ơn. Kẻ phẩm thấp được nâng lên thì biết ơn lâu nhất.']] }
            ]
        }
    }
});

extendQuest('mc15_1', {
    after: [
        { go: 'nhan_giao', say: [['huyen_do', 'Tàn binh chạy về Thủ Dương Sơn xin che chở. Nhân Giáo không đuổi ai, cũng không giữ ai.'], ['me', 'Vậy ta làm gì với họ?'], ['huyen_do', 'Hỏi tên họ. Thiên binh chưa bao giờ được ai hỏi tên.']] }
    ],
    branches: {
        hoa: {
            when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
            before: [
                { go: 'dong_thien_mon', say: [['narr', 'Kim Ô Vệ giữ Đông Thiên Môn là chim lửa. Thấy lửa của ngươi, chúng ngập ngừng, không biết nên đánh hay nên theo.'], ['van_nguyet', 'Đánh cho chúng hiểu lửa của ngươi không cháy cho Thiên Đình.']] },
                { hunt: { loc: 'dong_thien_mon', name: 'Kim Ô Vệ', n: 3 }, say: [['narr', 'Ba Kim Ô Vệ xếp cánh, đậu xuống sau lưng ngươi.']] }
            ]
        },
        thuy: {
            when: { el: 'Thủy' }, tag: 'Thủy linh căn',
            before: [
                { go: 'dong_thien_mon', say: [['me', 'Đông Thiên Môn lấy nước từ Thiên Hà. Cắt nước thì chúng phải ra.'], ['van_nguyet', 'Vây mà không đánh. Kiểu của ngươi.']] },
                { gather: { loc: 'dong_thien_mon', hours: 1, label: 'Rút nước khỏi hào Đông Môn' }, say: [['narr', 'Hào nước cạn trơ đáy. Đêm thứ hai, cổng Đông Môn mở từ bên trong.']] }
            ]
        }
    }
});

extendQuest('mc15_2', {
    before: [
        { go: 'van_tien', say: [['tien_lai', 'Mai con lên điện à? Lão gói cho con mấy cái bánh. Bánh tiên nô, cứng lắm, nhưng no.'], ['me', 'Lão không sợ sao?'], ['tien_lai', 'Sợ chứ. Nhưng ba ngàn năm lão sợ mà không có gì để mất. Giờ sợ mà có người để lo, khác lắm.']] }
    ],
    after: [
        { go: 'u_minh', say: [['dan_u_minh', 'Đứa nhỏ ngươi mang ra năm ấy đã khỏi đỏ mắt. Nó nhờ ta nhắn: ngày ngươi lên điện, nó sẽ đứng ở U Minh chặn tàn binh.'], ['me', 'Nó còn nhỏ.'], ['dan_u_minh', 'Ở U Minh không ai còn nhỏ lâu cả.']] }
    ]
});

/* ---------- Lục Nguyên: ngai trống, yêu tộc đòi đất, sáu nguồn trong thân ---------- */
extendQuest('mc16_0', {
    after: [
        { go: 'van_tien', say: [['van_nguyet', 'Ta không biết đọc sổ thuế. Ta chỉ biết đếm người chết.'], ['me', 'Thế thì đếm người sống. Sổ nào cũng bắt đầu từ đó.'], ['van_nguyet', 'Ngươi nói như một kẻ đã ngồi ngai.'], ['me', 'Ta nói như một kẻ từng bị đếm.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            after: [
                { go: 'van_tien', say: [['van_nguyet', 'Trăm quan đang thì thầm: linh căn như ngươi mà không ngồi ngai thì phí. Sớm muộn chúng sẽ ép ngươi ngồi.'], ['me', 'Để chúng ép.'], ['van_nguyet', 'Ngươi không sợ mình đổi ý sao?'], ['me', 'Sợ. Nên mới để ngươi giữ sổ.']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            after: [
                { go: 'van_tien', say: [['van_nguyet', 'Trăm quan nói kẻ phẩm thấp không được ngồi ngai. May là ngươi không muốn ngồi.'], ['me', 'Phẩm của ngươi cũng thấp.'], ['van_nguyet', 'Thế nên ta mới giữ sổ. Kẻ phẩm thấp đếm tiền kỹ nhất.']] }
            ]
        }
    }
});

extendQuest('mc16_1', {
    after: [
        { go: 'yeu_do', say: [['yeu_hoang', 'Ngươi là kẻ đóng mỏ. Yêu tộc giữ lời, đã ra trận. Giờ yêu tộc đòi phần.'], ['me', 'Phần gì?'], ['yeu_hoang', 'Bắc Thiên Môn. Từ nay cổng phía bắc do yêu tộc giữ. Thiên Đình cũ không cho bọn ta qua, Thiên Đình mới phải cho.'], ['me', 'Được. Nhưng cổng mở cho cả hai chiều.']] }
    ],
    branches: {
        tap: {
            when: { hybrid: true }, tag: 'Tạp linh căn',
            after: [
                { go: 'yeu_do', say: [['yeu_hoang', 'Tạp linh căn, mùi như yêu tộc lai. Ngươi đứng đây không ai coi là người lạ.'], ['me', 'Yêu tộc đòi gì?'], ['yeu_hoang', 'Đòi Bắc Thiên Môn. Nhưng với ngươi, ta không đòi. Ta xin.'], ['me', 'Xin thì dễ cho hơn. Cổng mở cả hai chiều.']] }
            ]
        }
    }
});

const SIX_SOURCES = {
    thuy: { el: 'Thủy', loc: 'yeu_ha', label: 'Hòa nguồn Thủy vào dòng Yêu Hà', say: [['yeu_ha_chu', 'Sông đầy lại rồi. Ngươi xuống ngồi đi, nước nhớ ngươi.'], ['narr', 'Nguồn Thủy trong thân chảy theo con sông ngươi từng nấp dưới đáy, rồi lặng như mặt hồ.']] },
    hoa: { el: 'Hỏa', loc: 'hac_thi', label: 'Hòa nguồn Hỏa vào đèn âm Hắc Thị', say: [['hac_chu', 'Đèn âm vẫn cháy bằng lửa ngươi thắp năm ấy. Ngồi giữa chợ đi, ta cấm khách làm phiền.'], ['narr', 'Nguồn Hỏa trong thân cháy theo nhịp những ngọn đèn xanh, không còn bốc lên giận dữ.']] },
    moc: { el: 'Mộc', loc: 'quang_han', label: 'Hòa nguồn Mộc vào cây quế', say: [['hang_nga', 'Cây quế ra lá mới mỗi năm. Ngồi dưới gốc đi, nó muốn trả ơn kẻ đã hỏi chuyện nó.'], ['narr', 'Nguồn Mộc trong thân mọc rễ xuống cùng cây quế, chậm và vững.']] },
    kim: { el: 'Kim', loc: 'tru_tien', label: 'Hòa nguồn Kim vào kiếm khí Tru Tiên', say: [['dan_tru_tien', 'Kiếm linh ở đây không đánh ngươi nữa. Chúng chỉ ngân, như chào một thanh kiếm cùng lò.'], ['narr', 'Nguồn Kim trong thân ngân cùng kiếm khí trên đài, sắc mà không cắt vào chính ngươi.']] },
    tho: { el: 'Thổ', loc: 'tien_khoang', label: 'Hòa nguồn Thổ vào lòng mỏ cũ', say: [['tien_lai', 'Mỏ giờ trồng cỏ rồi. Con ngồi ở cửa hầm đi, đất ở đây nhớ con.'], ['narr', 'Nguồn Thổ trong thân lắng xuống cùng lòng mỏ đã nguội, nặng mà yên.']] }
};
extendQuest('mc16_2', {
    after: [
        { go: 'thai_ho', say: [['dan_thai_ho', 'Sách về Lục Nguyên đều nói một điều: sáu nguồn không hợp lại được nếu ngươi không về lại nơi từng nuôi chúng.'], ['me', 'Nơi nào nuôi chúng?'], ['dan_thai_ho', 'Nơi ngươi từng đau. Sách không ghi vậy, ta tự thêm vào.']] },
        { gather: { loc: 'thai_ho', hours: 2, label: 'Đọc sách về Lục Nguyên' } }
    ],
    branches: Object.fromEntries(Object.entries(SIX_SOURCES).map(([key, src]) => [key, {
        when: { el: src.el }, tag: `Nguồn ${src.el}`,
        after: [
            { go: src.loc, say: [['me', 'Ta về rồi.']] },
            { gather: { loc: src.loc, hours: 2, label: src.label }, say: src.say }
        ]
    }]))
});

/* ---------- Đại La: thăm lại người cũ, tiễn giáo phái ---------- */
extendQuest('mc17_0', {
    after: [
        { go: 'tien_khoang', say: [['tien_lai', 'Đại La Kim Tiên mà còn về thăm cái mỏ đã trồng cỏ. Con đúng là ngốc.'], ['tien_lai', 'Đây. Tấm thẻ "Thanh Vân" lão giữ hộ con. Lão nói rồi, có ngày con mang nó về.'], ['me', 'Về đâu?'], ['tien_lai', 'Về nơi người ta còn chờ thư. Lão không còn ai chờ, nhưng con thì có.']] },
        { go: 'yeu_ha', say: [['yeu_ha_chu', 'Lòng sông đào xong rồi. Tiên nô cũ đào cho mình, đúng như ta nói.'], ['me', 'Ngươi giữ bến bao lâu nữa?'], ['yeu_ha_chu', 'Tới khi không còn ai phải nấp dưới đáy sông. Sắp rồi.']] }
    ]
});

extendQuest('mc17_1', {
    after: [
        { go: 'oa_giao', say: [['thai_van', 'Lạ lắm. Đêm qua trong miếu mọc thêm một pho tượng đất, không ai nặn.'], ['me', 'Tượng ai?'], ['thai_van', 'Tượng ngươi. Cầm cuốc. Nương Nương chắc đã nhìn thấy ngươi rồi.']] },
        { go: 'tay_giao', say: [['di_lac', 'Lần trước ngươi nói khổ có ích cho kẻ thu thuế. Ta nghĩ mãi.'], ['me', 'Rồi sao?'], ['di_lac', 'Rồi ta thôi thu thuế hương hỏa ở Tu Di Sơn. Hai vị giáo chủ chưa biết. Đừng kể.']] }
    ],
    branches: {
        cao: {
            when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
            before: [
                { go: 'tiet_giao', say: [['trieu_minh', 'Thông Thiên sư phụ hỏi ngươi có muốn nhập Tiệt Giáo không. Linh căn như ngươi, sư phụ cho đứng hàng nội môn ngay.'], ['me', 'Còn những kẻ phẩm thấp?'], ['trieu_minh', 'Tiệt Giáo nhận cả vạn tiên, không chừa ai. Nhưng đứng hàng nào là chuyện khác.']] }
            ]
        },
        thap: {
            when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
            before: [
                { go: 'tiet_giao', say: [['trieu_minh', 'Phẩm thấp mà lên tới Đại La. Cả Kim Ngao Đảo bàn tán chuyện ngươi.'], ['me', 'Bàn gì?'], ['trieu_minh', 'Bàn xem có phải sư phụ chọn sai cách thu đồ đệ suốt mấy vạn năm không.']] }
            ]
        }
    }
});

extendQuest('mc17_2', {
    after: [
        { go: 'thanh_khau', say: [['ho_hau', 'Hồng Mông Tử Khí à? Hồ tộc nghe đồn chỉ có một chợ bán, ở chỗ chỉ Chuẩn Thánh mới đứng được.'], ['me', 'Đồn có thật không?'], ['ho_hau', 'Hồ tộc tung tin đồn, nên hồ tộc biết tin nào thật. Tin này thật.']] },
        { go: 'hac_thi', say: [['hac_chu', 'Đa Bảo Thị? Ta từng bán hàng cho một gã béo tự xưng chủ chợ đó. Hắn trả bằng thứ khí màu tím, ta không dám tiêu.'], ['me', 'Còn giữ không?'], ['hac_chu', 'Đổi rồi. Lấy một bình rượu. Giờ nghĩ lại ta tiếc.']] }
    ]
});

/* ---------- Chuẩn Thánh: chợ tử khí, những lời từ biệt ---------- */
extendQuest('mc18_0', {
    after: [
        { go: 'lang_tieu', say: [['van_nguyet', 'Ngươi đi Đa Bảo Thị thì nhớ: ở đó cái gì cũng có giá, kể cả lời khuyên của ta.'], ['me', 'Lời khuyên của ngươi giá bao nhiêu?'], ['van_nguyet', 'Một lần quay về. Đừng quên trả.']] }
    ],
    branches: {
        kim: {
            when: { el: 'Kim' }, tag: 'Kim linh căn',
            after: [
                { go: 'da_bao', say: [['da_bao', 'Kim linh căn à. Lò sau chợ của ta nguội ba ngàn năm. Rèn cho ta một mẻ, ta bớt giá tử khí.'], ['me', 'Rèn gì?'], ['da_bao', 'Một cái cân. Cân của ta lệch, khách cãi suốt.']] },
                { gather: { loc: 'da_bao', hours: 2, label: 'Rèn cân cho chủ chợ' }, say: [['da_bao', 'Cân thẳng rồi. Ha, giờ thì khách hết cãi, ta mất cả thú vui.']] }
            ]
        },
        moc: {
            when: { el: 'Mộc' }, tag: 'Mộc linh căn',
            after: [
                { go: 'da_bao', say: [['da_bao', 'Mộc linh căn à. Chậu cây trước quầy của ta sắp chết. Nó là thứ duy nhất ta không bán.'], ['me', 'Để ta xem.']] },
                { gather: { loc: 'da_bao', hours: 2, label: 'Cứu chậu cây trước quầy' }, say: [['da_bao', 'Xanh lại rồi. Ta không nói cảm ơn, ở chợ ta nói cảm ơn là phải trả tiền.']] }
            ]
        }
    }
});

extendQuest('mc18_1', {
    after: [
        { go: 'bat_hoang', say: [['dau_no', 'Nghe nói đạo tặc Thánh Giới kéo xuống giành tử khí. Đấu nô Bát Hoang xin đi canh chợ cho ngươi.'], ['me', 'Đạo tặc đó mạnh hơn các ngươi nhiều.'], ['dau_no', 'Thì sao. Bọn ta chưa bao giờ đánh với kẻ yếu hơn mình. Quen rồi.']] }
    ]
});

extendQuest('mc18_2', {
    after: [
        { go: 'dao_tri', say: [['dao_tri_mau', 'Ngươi sắp đi khỏi Tiên Giới. Ta không có gì cho ngươi, ngoài một câu.'], ['me', 'Câu gì?'], ['dao_tri_mau', 'Hạo Thiên đã từng đứng ở chỗ ngươi. Hắn đi lên, rồi quên đường xuống. Đừng quên.']] },
        { go: 'van_tien', say: [['narr', 'Vạn Tiên Thành mở tiệc. Tiên nô cũ, đấu nô, yêu tiên, tán tiên ngồi chung một bàn dài tới tận cổng.'], ['tien_lai', 'Lão chưa bao giờ ngồi bàn dài như vậy. Ba ngàn năm, lão chỉ biết ngồi xổm.'], ['van_nguyet', 'Đi đi. Lần này đừng để ai đóng dấu lên tay ngươi nữa.']] }
    ]
});

/* ---------- Nhiệm vụ phụ Tiên Giới: người quen trên đường, mỗi việc chia nhánh theo linh căn ---------- */
const TIEN_SIDE_QUESTS = [
    {
        id: 'tp_yeu_ha', loc: 'yeu_ha', npc: 'yeu_ha_chu', title: 'Thuyền Đêm Yêu Hà', needs: [10, 1], reward: { hours: 3, goldRefs: 12 },
        intro: [['yeu_ha_chu', 'Đêm nay có một thuyền tiên nô trốn mỏ xuôi Yêu Hà. Hà Giao rình ở khúc quanh, chúng ăn cả người lẫn thuyền.']],
        steps: [{ hunt: { loc: 'yeu_ha', name: 'Hà Giao', n: 4 }, say: [['yeu_ha_chu', 'Thuyền qua rồi. Mười một người, không thiếu ai. Lần đầu ta đếm được số tròn.']] }],
        branches: {
            thuy: {
                when: { el: 'Thủy' }, tag: 'Thủy linh căn',
                intro: [['yeu_ha_chu', 'Thủy linh căn à? Khúc quanh có xoáy nước, thuyền nào qua cũng lật. Ngươi dẫn dòng được thì khỏi phải đánh.']],
                steps: [
                    { gather: { loc: 'yeu_ha', hours: 1, label: 'Nắn dòng xoáy cho thuyền qua' }, say: [['narr', 'Dòng xoáy dịu xuống theo tay ngươi. Chiếc thuyền lướt qua khúc quanh như trôi trên mặt gương.']] },
                    { hunt: { loc: 'yeu_ha', name: 'Hà Giao', n: 2 }, say: [['yeu_ha_chu', 'Hai con Hà Giao đói quá nên mới bám theo. Thôi, coi như ngươi giúp chúng khỏi đói nữa.']] }
                ]
            },
            hoa: {
                when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
                intro: [['yeu_ha_chu', 'Thuyền tuần của giám binh đậu ở bến dưới. Hỏa linh căn thì ngươi biết phải làm gì rồi.']],
                steps: [
                    { gather: { loc: 'yeu_ha', hours: 1, label: 'Đốt thuyền tuần ở bến dưới' }, say: [['narr', 'Ánh lửa đỏ rực một khúc sông. Giám binh chạy lên bờ dập lửa, không ai còn nhìn xuống nước.']] },
                    { hunt: { loc: 'yeu_ha', name: 'Hà Giao', n: 3 }, say: [['yeu_ha_chu', 'Ồn ào quá. Nhưng hiệu quả. Mười một người qua, không ai bị đóng dấu lại.']] }
                ]
            }
        }
    },
    {
        id: 'tp_bat_hoang', loc: 'bat_hoang', npc: 'dau_no', title: 'Đài Sinh Tử', needs: [10, 2], reward: { hours: 3, goldRefs: 14 },
        intro: [['dau_no', 'Có tên tiên quan tới Bát Hoang mua đấu nô về làm trò tiêu khiển. Ta nói đấu nô không bán. Hắn bảo vậy thì thắng đài của hắn.']],
        steps: [{ hunt: { loc: 'bat_hoang', name: 'Đấu Nô', n: 4 }, say: [['dau_no', 'Đấu nô thuê của hắn đã gục cả. Hắn bỏ về, không trả tiền đài. Thế là quá đủ.']] }],
        branches: {
            cao: {
                when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
                intro: [['dau_no', 'Tên tiên quan nhìn ngươi như nhìn món hàng. Hắn trả giá ngươi bằng cả đấu trường của ta.'], ['me', 'Vậy để hắn thua cả đấu trường của hắn.']],
                steps: [{ hunt: { loc: 'bat_hoang', name: 'Đấu Nô', n: 6 }, say: [['dau_no', 'Sáu trận, không trận nào quá ba chiêu. Hắn sẽ kể với cả Lăng Tiêu rằng có món hàng không mua được.']] }]
            },
            thap: {
                when: { rankMax: 2 }, tag: 'Linh căn tầm thường',
                intro: [['dau_no', 'Hắn đem tới khôi lỗi cương thiết, đòn nào cũng đủ giết người phẩm thấp. Ta luyện cho ngươi cách đỡ trước đã.']],
                steps: [
                    { gather: { loc: 'bat_hoang', hours: 1, label: 'Luyện đỡ đòn với Thiết Ngưu' }, say: [['dau_no', 'Đừng đỡ thẳng. Lùi nửa bước rồi đánh vào khớp. Khôi lỗi không biết đau, nhưng biết gãy.']] },
                    { hunt: { loc: 'bat_hoang', name: 'Tiên Cương Khôi', n: 4 }, say: [['dau_no', 'Bốn con, gãy cả bốn. Linh căn kém mà học nhanh thế, ta mới gặp lần đầu.']] }
                ]
            }
        }
    },
    {
        id: 'tp_hac_thi', loc: 'hac_thi', npc: 'hac_chu', title: 'Món Hàng Biết Khóc', needs: [11, 0], reward: { hours: 3, goldRefs: 15 },
        intro: [['hac_chu', 'Có kẻ mang một đứa trẻ tới bán ở chợ ta. Hắc Thị bán mọi thứ, trừ người. Hắn không chịu đi.']],
        steps: [{ hunt: { loc: 'hac_thi', name: 'Kẻ Cướp Hắc Thị', n: 4 }, say: [['hac_chu', 'Đứa nhỏ ở lại với ta. Ta sẽ dạy nó buôn bán, lương thiện được bao nhiêu thì tùy nó.']] }],
        branches: {
            moc: {
                when: { el: 'Mộc' }, tag: 'Mộc linh căn',
                intro: [['hac_chu', 'Kẻ buôn người bỏ chạy, đứa nhỏ bị chúng cho uống thuốc mê, mãi không tỉnh.']],
                steps: [
                    { hunt: { loc: 'hac_thi', name: 'Kẻ Cướp Hắc Thị', n: 2 }, say: [['narr', 'Trong túi kẻ buôn người có gói thuốc mê. Mùi thảo dược hắc nồng.']] },
                    { gather: { loc: 'hac_thi', hours: 1, label: 'Giải thuốc mê cho đứa trẻ' }, say: [['hac_chu', 'Nó mở mắt rồi. Câu đầu tiên nó hỏi là mẹ đâu. Ta không biết trả lời sao.']] }
                ]
            },
            kim: {
                when: { el: 'Kim' }, tag: 'Kim linh căn',
                intro: [['hac_chu', 'Đứa nhỏ bị khóa xích tiên kim, chìa thì kẻ buôn người nuốt mất rồi.']],
                steps: [
                    { gather: { loc: 'hac_thi', hours: 1, label: 'Tháo xích tiên kim bằng tay không' }, say: [['narr', 'Từng mắt xích mềm ra dưới tay ngươi rồi rơi xuống như những đồng xu cũ.']] },
                    { hunt: { loc: 'hac_thi', name: 'Kẻ Cướp Hắc Thị', n: 3 }, say: [['hac_chu', 'Bọn đồng bọn kéo tới đòi hàng. Giờ thì chúng biết Hắc Thị có luật.']] }
                ]
            }
        }
    },
    {
        id: 'tp_quang_han', loc: 'quang_han', npc: 'hang_nga', title: 'Con Thỏ Đi Lạc', needs: [12, 1], reward: { hours: 4, goldRefs: 18 },
        intro: [['hang_nga', 'Thỏ ngọc của ta chạy mất từ đêm rằm. Ngọc Thố Tinh ngoài kia giả dạng nó, ta không phân biệt nổi.']],
        steps: [{ hunt: { loc: 'quang_han', name: 'Ngọc Thố Tinh', n: 5 }, say: [['hang_nga', 'Con thật nấp sau gốc quế, run cầm cập. Ba ngàn năm nó chưa từng rời ta. Cảm ơn ngươi.']] }],
        branches: {
            thuy: {
                when: { el: 'Thủy' }, tag: 'Thủy linh căn',
                intro: [['hang_nga', 'Thỏ ngọc thích uống sương. Ngươi có thể ngưng sương ở đâu nó đi qua không?']],
                steps: [
                    { gather: { loc: 'quang_han', hours: 1, label: 'Ngưng sương thành vệt trên nền cung' }, say: [['narr', 'Sương đọng lại thành từng vệt. Chỉ một vệt có dấu chân nhỏ xíu đi ngang.']] },
                    { hunt: { loc: 'quang_han', name: 'Nguyệt Hồn', n: 3 }, say: [['hang_nga', 'Nguyệt hồn đang vây nó. Con thỏ ngốc. Ngươi ôm nó về đi, nó chịu ngươi rồi.']] }
                ]
            },
            moc: {
                when: { el: 'Mộc' }, tag: 'Mộc linh căn',
                intro: [['hang_nga', 'Cây quế biết thỏ đi đâu. Nó không nói với ta, nhưng có khi nói với ngươi.']],
                steps: [
                    { gather: { loc: 'quang_han', hours: 1, label: 'Hỏi cây quế' }, say: [['narr', 'Cây quế rung một nhánh về phía đông. Ở đó có một hốc đá lạnh.']] },
                    { hunt: { loc: 'quang_han', name: 'Ngọc Thố Tinh', n: 3 }, say: [['hang_nga', 'Bọn giả dạng bị ngươi đuổi sạch. Hóa ra cây quế cũng biết thương con thỏ.']] }
                ]
            }
        }
    },
    {
        id: 'tp_thanh_khau', loc: 'thanh_khau', npc: 'ho_hau', title: 'Lời Nói Dối Thứ Một Ngàn', needs: [13, 2], reward: { hours: 4, goldRefs: 20 },
        intro: [['ho_hau', 'Hồ tộc đã nói dối Thiên Đình chín trăm chín mươi chín lần cho ngươi. Lần thứ một ngàn, Thiên Đình gửi mật thám tới kiểm tra.']],
        steps: [
            { gather: { loc: 'thanh_khau', hours: 1, label: 'Dựng ảo trận đón mật thám' } },
            { hunt: { loc: 'thanh_khau', name: 'Hồ Mị', n: 4 }, say: [['ho_hau', 'Mật thám về báo quân ngươi ở phía tây. Lần thứ một ngàn, vẫn trót lọt.']] }
        ],
        branches: {
            tap: {
                when: { hybrid: true }, tag: 'Tạp linh căn',
                intro: [['ho_hau', 'Mật thám dò linh căn để tìm ngươi. Tạp linh căn như ngươi giả làm hồ tộc lai là đẹp nhất.']],
                steps: [{ gather: { loc: 'thanh_khau', hours: 2, label: 'Giả làm hồ tộc giữa chợ Thanh Khâu' }, say: [['ho_hau', 'Mật thám đi ngang ngươi ba lần mà không nhận ra. Ngươi nói dối giỏi hơn ta tưởng.']] }]
            },
            cao: {
                when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
                intro: [['ho_hau', 'Linh căn ngươi sáng như ngọn đèn, ảo trận nào cũng không giấu nổi. Phải dẹp mật thám trước khi chúng thấy.']],
                steps: [{ hunt: { loc: 'thanh_khau', name: 'Cửu Vĩ Vệ', n: 4 }, say: [['ho_hau', 'Mật thám đội lốt Cửu Vĩ Vệ. Chúng không bao giờ về được nữa. Lần này hồ tộc không cần nói dối.']] }]
            }
        }
    },
    {
        id: 'tp_phu_tang', loc: 'phu_tang', npc: 'narr', title: 'Kim Ô Non Rơi Khỏi Tổ', needs: [15, 0], reward: { hours: 5, goldRefs: 25 },
        intro: [['dan_phu_tang', 'Một con Kim Ô non rơi khỏi tổ trên cành Phù Tang. Mộc linh dưới gốc coi nó là lửa lạ, đòi dập.']],
        steps: [{ hunt: { loc: 'phu_tang', name: 'Phù Tang Mộc Linh', n: 5 }, say: [['dan_phu_tang', 'Kim Ô non bay về tổ rồi. Sáng mai mặt trời mọc sớm hơn một khắc, coi như nó cảm ơn.']] }],
        branches: {
            hoa: {
                when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
                intro: [['dan_phu_tang', 'Kim Ô non sắp tắt lửa. Hỏa linh căn như ngươi có thể nhóm lại cho nó.']],
                steps: [
                    { gather: { loc: 'phu_tang', hours: 2, label: 'Nhóm lửa cho Kim Ô non' }, say: [['narr', 'Con chim nhỏ rúc vào lòng bàn tay ngươi, lửa của nó cháy lại từng chút một.']] },
                    { hunt: { loc: 'phu_tang', name: 'Phù Tang Mộc Linh', n: 2 }, say: [['dan_phu_tang', 'Mộc linh thấy lửa hiền thì lui. Kim Ô non sẽ nhớ mùi lửa của ngươi.']] }
                ]
            },
            moc: {
                when: { el: 'Mộc' }, tag: 'Mộc linh căn',
                intro: [['dan_phu_tang', 'Mộc linh không nghe ai, trừ kẻ cùng là cây. Ngươi nói chuyện với chúng đi.']],
                steps: [{ gather: { loc: 'phu_tang', hours: 2, label: 'Thuyết phục mộc linh để yên Kim Ô' }, say: [['dan_phu_tang', 'Mộc linh nhấc con chim lên tận tổ. Cây với lửa, lần đầu không đánh nhau.']] }]
            }
        }
    },
    {
        id: 'tp_yeu_hoang', loc: 'yeu_hoang_dien', npc: 'yeu_hoang', title: 'Rượu Của Yêu Hoàng', needs: [14, 1], reward: { hours: 5, goldRefs: 25 },
        intro: [['yeu_hoang', 'Muốn uống rượu với ta thì qua được cận vệ. Yêu Hoàng Điện không có cửa sau.']],
        steps: [{ hunt: { loc: 'yeu_hoang_dien', name: 'Yêu Thánh Cận Vệ', n: 4 }, say: [['yeu_hoang', 'Ngồi. Rượu này ủ từ ngày yêu tộc bị đuổi khỏi Thiên Đình. Hôm nay mới mở.']] }],
        branches: {
            tho: {
                when: { el: 'Thổ' }, tag: 'Thổ linh căn',
                intro: [['yeu_hoang', 'Nền điện này lát bằng xương những kẻ không quỳ. Thổ linh căn thì nghe được họ. Họ nói gì?']],
                steps: [
                    { gather: { loc: 'yeu_hoang_dien', hours: 1, label: 'Nghe xương dưới nền điện' }, say: [['me', 'Họ không hận ngươi. Họ chỉ muốn được chôn.'], ['yeu_hoang', 'Ba vạn năm, chưa ai nói với ta câu đó.']] },
                    { hunt: { loc: 'yeu_hoang_dien', name: 'Yêu Hoàng Hộ Long', n: 2 }, say: [['yeu_hoang', 'Hộ Long chỉ thử ngươi thôi. Mai ta sẽ cho cạy nền điện lên.']] }
                ]
            },
            hoa: {
                when: { el: 'Hỏa' }, tag: 'Hỏa linh căn',
                intro: [['yeu_hoang', 'Rượu của ta phải hâm bằng lửa của kẻ ngang hàng. Lửa của ngươi đủ nóng chưa?']],
                steps: [{ hunt: { loc: 'yeu_hoang_dien', name: 'Yêu Thánh Cận Vệ', n: 3 }, say: [['yeu_hoang', 'Rượu ấm rồi. Lửa ngươi không khói. Kẻ không khói thì không giấu gì.']] }]
            }
        }
    },
    {
        id: 'tp_bac_minh', loc: 'bac_minh', npc: 'con_bang', title: 'Giấc Mơ Của Côn', needs: [16, 0], reward: { hours: 6, goldRefs: 30 },
        intro: [['con_bang', 'Ta mơ một giấc ba vạn năm. Côn Ngư con cháu ta quẫy nước làm ta tỉnh. Dỗ chúng đi, ta muốn ngủ tiếp.']],
        steps: [{ hunt: { loc: 'bac_minh', name: 'Côn Ngư', n: 5 }, say: [['con_bang', 'Yên rồi. Ta sẽ mơ thấy ngươi một lúc, rồi quên. Đừng giận.']] }],
        branches: {
            thuy: {
                when: { el: 'Thủy' }, tag: 'Thủy linh căn',
                intro: [['con_bang', 'Thủy linh căn. Ngươi lặn xuống đáy Bắc Minh được không? Giấc mơ của ta ở dưới đó, có kẻ đang gặm nó.']],
                steps: [
                    { gather: { loc: 'bac_minh', hours: 2, label: 'Lặn xuống đáy Bắc Minh' }, say: [['narr', 'Dưới đáy biển, giấc mơ của Côn Bằng trôi như một tấm lụa xanh. Bắc Minh Giao đang xé từng mảnh.']] },
                    { hunt: { loc: 'bac_minh', name: 'Bắc Minh Giao', n: 3 }, say: [['con_bang', 'Ngươi mang giấc mơ về nguyên vẹn. Trong đó có cảnh trời đất chưa chia. Ngươi thấy chưa?'], ['me', 'Thấy. Rất yên.']] }
                ]
            },
            cao: {
                when: { rankMin: 6 }, tag: 'Linh căn thượng thừa',
                intro: [['con_bang', 'Linh căn như ngươi... Côn Ngư sẽ theo ngươi như theo cha. Dẫn chúng ra khỏi chỗ ta nằm là được.']],
                steps: [{ gather: { loc: 'bac_minh', hours: 2, label: 'Dẫn đàn Côn Ngư ra biển xa' }, say: [['con_bang', 'Chúng đi theo ngươi thật. Ta nên ghen tị không nhỉ? Thôi, ta ngủ.']] }]
            }
        }
    }
];
SIDE_QUESTS.push(...TIEN_SIDE_QUESTS);
TIEN_SIDE_QUESTS.forEach(q => { QUEST_INDEX[q.id] = q; });
