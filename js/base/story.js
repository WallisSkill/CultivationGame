function buildRootStoryScript() {
    const elements = state.root?.elements || [];
    const rank = state.root?.rank ?? 0;
    const rankName = ROOT_RANKS[rank] || "Vô Danh";
    const tierName = [
        'Nhất Linh Căn (Tạp Tử)',
        'Song Linh Căn — Âm Dương giao cảm',
        'Tam Linh Căn — Tam khí tương sinh',
        'Tứ Linh Căn — Tứ tượng hỗ ứng',
        'Ngũ Linh Căn — Hỗn Nguyên Thể'
    ][Math.max(0, elements.length - 1)] || "Vô Linh Căn";
    const elementSummary = elements.length ? elements.join(' ') : 'Vô căn';
    const { origin, fate } = getOriginAndFate(elements, rank);

    const script = [
        "📜 【Thân Thế Nhân Vật】📜",
        `   ${origin}`,
        "",
        "☯️ 【Thiên Mệnh Chi Đạo】☯️",
        `   ${fate}`,
        "",
        "===================================================",
        "🌠 【Thiên Cơ Chuyển Động】 — Linh căn khai mở, đạo vận giáng thế! 🌠",
        "Một luồng quang mang từ cửu thiên trút xuống, linh khí khắp hư không sôi trào...",
        "Ngươi đứng giữa hư vô, thân ảnh nhỏ bé mà thiên địa đều chú mục!",
        "===================================================",
        `🌠 【Linh Căn Hiện Thế】${tierName} 🌠`,
        `→ Ngũ hành hiển lộ: ${elementSummary}`,
        "",
        `🔮 【Phẩm Chất Hiện Thế】${rankName} 🔮`
    ];

    // phẩm chất
    if (rank >= 9) {
        script.push(
            "☯️ Hỗn Độn chi vận hiện thế — thiên địa rung chuyển, vạn vật quỳ phục! ☯️",
            "Ánh sáng từ tam thiên đại đạo hội tụ, linh hồn ngươi như hòa cùng vũ trụ!",
            "Một tia Hỗn Độn khí lưu quanh thân, hóa thành đồ án Thái Cực chấn động càn khôn!"
        );
    } else if (rank === 8) {
        script.push(
            "🌌 Tiên Thiên linh vận bùng nổ — đạo khí dâng trào khắp hư không! 🌌",
            "Trên cao mây tan, nhật nguyệt song chiếu, tiếng đạo ca vang vọng cửu thiên.",
            "Thiên địa tán thưởng, vạn vật cúi đầu — thân mang Tiên Cốt chi mạch!"
        );
    } else if (rank === 7) {
        script.push(
            "🔥 Hậu Thiên thần vận ngưng tụ — thiên cơ lay động! 🔥",
            "Tứ tượng quanh thân, linh lực xoay chuyển, tỏa ra đạo vận ngũ sắc."
        );
    } else if (rank === 6) {
        script.push(
            "⚡ Thiên phẩm linh quang giáng thế — vạn linh thất sắc! ⚡",
            "Ánh sáng như ngân hà rơi, từng sợi linh khí tựu lại nơi huyệt mạch."
        );
    } else if (rank === 5) {
        script.push(
            "🌋 Địa phẩm linh khí dao động — đất trời cộng hưởng. 🌋",
            "Đại địa truyền âm, linh mạch khẽ rung, đạo cơ đã mở."
        );
    } else if (rank === 4) {
        script.push(
            "🌙 Huyền phẩm hiện đạo — ánh trăng phủ mạch linh. 🌙",
            "Khí tức quanh thân ngươi dần ổn định, tâm cảnh tĩnh lặng như nước hồ thu."
        );
    } else if (rank === 3) {
        script.push(
            "💎 Thượng phẩm hiển linh — khí tức thuần chính. 💎",
            "Thiên ý thuận, đạo vận hiền hòa, linh căn sáng rực một góc hư không."
        );
    } else if (rank === 2) {
        script.push(
            "🌿 Trung phẩm phát mạch — đạo vận sơ khai. 🌿",
            "Một tia linh quang chập chờn trong đan điền, đạo lộ mới chỉ manh nha."
        );
    } else if (rank === 1) {
        script.push(
            "🍂 Hạ phẩm linh căn yếu ớt, như đom đóm giữa đêm dài. 🍂",
            "Tuy nhỏ bé, song trong u tối vẫn le lói một tia hy vọng."
        );
    } else {
        script.push(
            "🥄 Phế phẩm — linh căn tan loãng, đạo tâm khó tụ. 🥄",
            "Trời không ưu đãi, đạo lộ hiểm trở, nhưng chỉ có kẻ nghịch thiên mới lập đại đạo!"
        );
    }

    // dị tượng
    if (elements.length >= 5 && rank >= 9) {
        script.push(
            "",
            "☯️ 【Thiên Địa Dị Tượng】— Ngũ hành nghịch chuyển, vạn vật run rẩy! ☯️",
            "🌌 Một Hỗn Độn Chi Thể nghịch thiên xuất thế, vạn đạo quỳ phục, nhật nguyệt đảo huyền! 🌌",
            "Từ trong khí hỗn độn, ngươi nghe thấy tiếng thì thầm của Đại Đạo: ‘Ngươi chính là kẻ được chọn…’"
        );
    } else if (elements.length >= 4 && rank >= 8) {
        script.push(
            "",
            "⚡ 【Thiên Cơ Giao Động】— Tiên linh hiện thế, đạo vận khuếch tán! ⚡",
            "Trời rơi mưa linh, đất tỏa hào quang, đạo văn cổ xưa chầm chậm xoay quanh thân ngươi."
        );
    } else if (elements.length >= 3 && rank >= 6) {
        script.push(
            "",
            "✨ 【Thiên Khải Linh Vân】— Khí tức vững mạnh, linh vận cường hóa! ✨",
            "Mây tụ đỉnh đầu, tựa rồng cuộn quanh thân, đạo ý sơ hiển."
        );
    } else if (rank <= 1) {
        script.push(
            "",
            "🍂 【Phàm Thai Mỏng Manh】— Linh khí yếu ớt, đạo lộ chông gai... 🍂",
            "Song chỉ cần tâm ngươi không diệt, đạo vẫn còn một tia sinh cơ."
        );
    }

    script.push(
        "",
        `💠 Linh căn và phẩm chất đã định, ${state.name} bước vào đạo lộ tu hành... 💠`,
        "Từ giây phút này, từng hơi thở đều hòa cùng thiên địa, từng bước đi đều khắc lên vận mệnh!",
        "✨ Thiên địa tịch mịch — Đạo lộ khai mở! ✨",
        "==================================================="
    );

    return script;
}

function getOriginAndFate(elements, rank) {
    const eCount = elements.length; // số lượng nguyên tố (linh căn)
    const highRank = rank >= 7;     // phẩm chất cao (Hậu Thiên trở lên)
    const lowRank = rank <= 2;      // phẩm chất thấp
    const supreme = rank >= 9;      // Hỗn Độn

    // 🌿 Danh sách mẫu thân thế chia theo tầng đạo vận
    const originPools = {
        low: [
            "Một hài nhi bị bỏ lại bên bờ suối Linh Hà, trong tay chỉ có mảnh ngọc tàn khắc chữ ‘Đạo’.",
            "Xuất thân nơi phàm trần tầm thường, sớm mồ côi cha mẹ, lấy khổ luyện làm đạo.",
            "Sinh ra giữa làng nhỏ bị tà khí bao phủ, sống sót duy nhất nhờ ý chí cầu sinh.",
            "Từng làm nô dịch cho tu sĩ, bị hành hạ mà ngộ ra ‘cầu đạo chỉ có máu và mồ hôi’.",
            "Một kẻ lang thang nơi biên ải, thấy tiên bay qua trời, từ đó lòng hướng tới đạo."
        ],
        mid: [
            "Lớn lên nơi biên cương loạn thế, hằng ngày đối mặt thú hoang linh mị — đạo tâm được rèn trong lửa và máu.",
            "Là hậu duệ của một tông môn đã diệt, mang oán khí nghìn năm chờ ngày phục hưng.",
            "Trưởng thành trong cô nhi viện của Tán Tu Minh, thề rằng một ngày sẽ bước lên tiên đạo.",
            "Được một lão đạo nhặt về giữa núi hoang, dạy đạo pháp sơ cơ — đến nay đạo cơ dần hiển lộ.",
            "Sinh trong dòng dõi tầm trung, song lòng không cam tầm thường, quyết tự khai đạo lộ."
        ],
        high: [
            "Mang trong người dòng máu cổ thần, ký ức bị phong ấn, chỉ khi linh căn hiển thế mới khôi phục.",
            "Xuất thân từ thế gia linh mạch, từ nhỏ đã cảm được linh khí chuyển động trong huyết quản.",
            "Là hậu nhân thất lạc của Cổ Tiên tộc, máu huyết đang dần thức tỉnh.",
            "Ngươi sinh ra, dị tượng hiện — thiên tượng nghịch chuyển, đạo văn cổ xoay quanh nôi.",
            "Được một vị Chân Tiên chọn làm truyền nhân bí ẩn, định mệnh không thuộc phàm gian."
        ],
        chaos: [
            "Sinh giữa hư vô, không cha không mẹ, chỉ có thiên đạo lưu lại một giọt linh quang.",
            "Là kết tinh của ngũ hành, sinh ra cùng tiếng sấm khai thiên — Hỗn Độn chi thể, không thuộc luân hồi.",
            "Không ai biết ngươi đến từ đâu, nhưng mỗi bước đi đều khiến thiên địa chấn động.",
            "Từ trong hỗn mang, một linh hồn thức tỉnh — không ký ức, chỉ có đạo tâm thuần khiết vô biên."
        ]
    };

    // 🌠 Mẫu định mệnh chia theo tầng phẩm chất
    const fatePools = {
        low: [
            "Mệnh bạc như sương, một khi tâm diệt thì đạo diệt.",
            "Trời không thương, nhưng lòng không phục — chỉ có nghịch thiên mới tồn.",
            "Đạo căn khiếm khuyết, song tâm bất khuất — lấy khổ làm thầy, lấy máu làm kinh.",
            "Số kiếp luân hồi, mãi mãi dưới chân người, trừ phi phá nhân quả mà thăng hoa."
        ],
        mid: [
            "Mệnh gặp hung cát khó lường, phúc họa song hành.",
            "Đạo lộ quanh co, thiên cơ che giấu, chỉ khi ngươi kiên định mới thấy chân đạo.",
            "Thân mang một tia linh vận cổ xưa — tuy nhỏ, nhưng có thể bùng cháy thành thiên hỏa.",
            "Một khúc nhạc vận mệnh ngân vang, người nghe thấy sẽ đổi đời, kẻ bỏ lỡ sẽ mất đạo."
        ],
        high: [
            "Thân mang thiên mệnh dị thường — nơi ngươi đi qua, đạo vận xoay chuyển.",
            "Thiên địa chú mục, linh cơ bất diệt, đạo ngươi là con đường chưa từng tồn tại.",
            "Là người mà trời muốn diệt, nhưng đạo lại bảo hộ — một thân nghịch số, một chí nghịch thiên.",
            "Một tia linh quang của Cổ Tiên lưu lại, ngươi chính là mảnh tàn của giấc mộng vạn cổ."
        ],
        chaos: [
            "Không có thiên mệnh, ngươi chính là thiên mệnh.",
            "Trên đầu ba hoa tụ đỉnh, dưới chân chín long cuộn đất — vạn đạo quỳ phục.",
            "Ngươi sinh ra để chứng minh rằng Đại Đạo không có giới hạn.",
            "Thiên đạo không dung, địa đạo không chở — chỉ có ngươi tự lập nên một con đường mới."
        ]
    };

    let originSet;
    if (supreme) originSet = originPools.chaos;
    else if (highRank) originSet = originPools.high;
    else if (lowRank) originSet = originPools.low;
    else originSet = originPools.mid;

    let fateSet;
    if (supreme) fateSet = fatePools.chaos;
    else if (highRank) fateSet = fatePools.high;
    else if (lowRank) fateSet = fatePools.low;
    else fateSet = fatePools.mid;

    const origin = originSet[Math.floor(Math.random() * originSet.length)];
    const fate = fateSet[Math.floor(Math.random() * fateSet.length)];

    return { origin, fate };
}

function getBreakthroughStory(prevRealm, newRealm, stats) {
    const stories = {
        // 🔥 TIÊN GIỚI (9-15)
        9: {
            title: "✨ ĐẮC ĐẠO TIÊN GIỚI ✨",
            story: [
                "🌌 Thiên địa chấn động, vạn vật kinh hãi!",
                "⚡ Ngươi phá vỡ giới hạn phàm nhân, bước vào cảnh giới trường sinh bất tử!",
                "🌟 Thân thể thoát xác phàm thai, linh hồn thăng hoa, đạo cơ thông suốt!",
                `💫 Từ ${REALMS[prevRealm]} tiến vào ${REALMS[newRealm]} - con đường tu tiên chính thức mở ra!`,
                "🎆 Thiên kiếp giáng xuống như lời chúc phúc, mỗi tia sét thiên lôi đều tôi luyện tiên thể!",
                "🌈 Từ nay, thọ mạng kéo dài vạn năm, du hành giữa các tinh hà!",
                `⏳ Tuổi thọ tăng thêm ${stats.ageInc.toLocaleString()} năm - gần như trường sinh!`,
                `⚔️ Tiên lực dâng trào: Công lực +${stats.powInc.toLocaleString()}`,
                `💖 Tiên thể thành hình: Sinh lực +${stats.hpInc.toLocaleString()}`,
                `🛡️ Kim thân bất hoại: Phòng ngự +${stats.defInc.toLocaleString()}`,
                "🎯 Tiên đạo vô cùng, tu vi như gió!",
            ]
        },

        // 🌟 THÁNH CẢNH (16-19)
        16: {
            title: "⭐ THÀNH THÁNH - VẠN LINH QUỲ BÁI ⭐",
            story: [
                "🌌🌌🌌 VŨ TRỤ RUNG CHUYỂN 🌌🌌🌌",
                "💥 Vô số vị diện tinh hệ đều cảm nhận được sự ra đời của một vị Thánh!",
                "⚡⚡⚡ Thiên đạo khóc than, địa mạch đảo ngược, thời gian đóng băng!",
                `🔥 ${state.name || 'Ngươi'} từ ${REALMS[prevRealm]} phá vỡ mọi giới hạn, thăng thiên thành ${REALMS[newRealm]}!`,
                "🌠 Thánh quang chiếu rọi vạn dặm, chúng sinh đều quỳ bái!",
                "🎆 Đạo tâm viên mãn, lĩnh hội chân lý vũ trụ, trở thành luật pháp sống!",
                "✨ Một niệm động, thiên địa thay đổi; một lời nói, đạo luật dao động!",
                `⏳ Trường sinh bất tử: +${stats.ageInc.toLocaleString()} năm (nửa triệu năm!)`,
                "━━━━━━━━━━━━━━━━━━━━━━",
                "📊 THỰC LỰC THÀNH THÁNH:",
                `   ⚔️ Thánh lực: +${stats.powInc.toLocaleString()} (có thể phá hủy tinh hệ)`,
                `   💖 Thánh thể: +${stats.hpInc.toLocaleString()} (bất tử bất diệt)`,
                `   🛡️ Thánh vực: +${stats.defInc.toLocaleString()} (vạn pháp bất xâm)`,
                "━━━━━━━━━━━━━━━━━━━━━━",
                "🌟 Từ đây, ngươi là thực thể siêu việt, không còn ràng buộc bởi luật trời!",
                "💫 Vũ trụ rộng lớn, ngươi có thể đi đến mọi nơi!",
            ]
        },

        // ⚡ THIÊN CẢNH (20-25)
        20: {
            title: "⚡ THIÊN ĐỈNH - NGHỊCH THIÊN THÀNH ĐẠO ⚡",
            story: [
                "🌌🌌🌌🌌🌌 ĐA VŨ TRỤ CHẤN ĐỘNG 🌌🌌🌌🌌🌌",
                "💥💥💥 VÔ SỐ VŨ TRỤ SONG SONG ĐỀU CẢM NHẬN ĐƯỢC SỰ RA ĐỜI CỦA MỘT VỊ THIÊN TÔN!",
                "⚡⚡⚡ THIÊN ĐẠO RÚT LUI, ĐẠO TỔ KINH HOÀNG, CHÂN THẦN QUỲ BÁI!",
                `🔥🔥🔥 ${state.name || 'NGƯƠI'} TỪ ${REALMS[prevRealm].toUpperCase()} PHÁ VỠ THIÊN LUẬT, THĂNG LÊN ${REALMS[newRealm].toUpperCase()}!`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🎆 CẢNH TƯỢNG THIÊN TÔN GIÁNG SINH:",
                "   🌟 Vô số vũ trụ cùng rung động",
                "   🌟 Hỗn độn khai tích, thời không đảo ngược",
                "   🌟 Thiên đạo tự động lánh xa, không dám đến gần",
                "   🌟 Tất cả luật pháp vũ trụ đều phải tuân theo ngươi",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "✨ Ngươi trở thành thực thể tối cao, có thể:",
                "   💫 Sáng tạo và hủy diệt vũ trụ chỉ bằng một niệm",
                "   💫 Điều khiển thời gian như sợi chỉ",
                "   💫 Viết lại luật pháp của muôn ngàn thế giới",
                "   💫 Trường sinh bất tử thật sự - không có khái niệm thời gian",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                `⏳ VĨNH HẰNG: +${stats.ageInc.toLocaleString()} năm (50 triệu năm!)`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "📊 THỰC LỰC THIÊN TÔN:",
                `   ⚔️ Thiên lực: +${stats.powInc.toLocaleString()} (hủy diệt đa vũ trụ)`,
                `   💖 Thiên thể: +${stats.hpInc.toLocaleString()} (bất diệt vĩnh hằng)`,
                `   🛡️ Thiên vực: +${stats.defInc.toLocaleString()} (tuyệt đối bất khả xâm phạm)`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🎯 Từ nay, ngươi chính là đỉnh cao của mọi tu luyện!",
                "🌈 Đa vũ trụ rộng lớn vô hạn, nhưng không có gì có thể cản bước ngươi!",
            ]
        },

        // 🌌 HỖN ĐỘN CẢNH (26+)
        26: {
            title: "🌌 HỖN ĐỘN ĐẠO GIẢ - SÁNG TẠO VẠN VẬT 🌌",
            story: [
                "🌌🌌🌌🌌🌌🌌🌌 HỖN ĐỘN KHAI TÍCH 🌌🌌🌌🌌🌌🌌🌌",
                "💥💥💥💥💥 TẤT CẢ THỰC TẠI ĐỀU NGƯNG TRỆ - KHÁI NIỆM 'TỒN TẠI' BỊ VIẾT LẠI!",
                "⚡⚡⚡⚡⚡ KHÔNG CÒN THIÊN ĐẠO, KHÔNG CÒN VŨ TRỤ, CHỈ CÒN NGƯƠI!",
                `🔥🔥🔥🔥🔥 ${state.name || 'NGƯƠI'} TỪ ${REALMS[prevRealm].toUpperCase()} VƯỢ...

T QUA MỌI KHÁI NIỆM, TRỞ THÀNH ${REALMS[newRealm].toUpperCase()}!`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🎆 NGƯƠI CHÍNH LÀ:",
                "   🌟 Nguồn gốc của mọi vũ trụ",
                "   🌟 Người sáng tạo ra khái niệm 'tồn tại'",
                "   🌟 Thực thể vượt qua mọi chiều không gian và thời gian",
                "   🌟 Đấng Chí Tôn tối cao - không có gì có thể so sánh",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "✨ QUYỀN NĂNG TUYỆT ĐỐI:",
                "   💫 Sáng tạo vô số vũ trụ chỉ bằng suy nghĩ",
                "   💫 Định nghĩa lại ý nghĩa của 'thời gian' và 'không gian'",
                "   💫 Tồn tại ở mọi nơi, mọi lúc, mọi chiều không gian",
                "   💫 Bất tử tuyệt đối - khái niệm 'chết' không còn ý nghĩa",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                `⏳ VĨNH CỬU: +${stats.ageInc.toLocaleString()} năm (5 TỶ NĂM!)`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "📊 THỰC LỰC HỖN ĐỘN CHÍ TÔN:",
                `   ⚔️ Hỗn độn lực: +${stats.powInc.toLocaleString()} (TUYỆT ĐỐI)`,
                `   💖 Hỗn độn thể: +${stats.hpInc.toLocaleString()} (BẤT DIỆT VĨNH CỬU)`,
                `   🛡️ Hỗn độn vực: +${stats.defInc.toLocaleString()} (KHÔNG THỂ PHÁ VỠ)`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🎯 Ngươi đã đạt đến đỉnh cao tuyệt đối!",
                "🌈 Không còn gì cao hơn, mạnh hơn, vĩ đại hơn ngươi!",
                "⭐ Ngươi chính là... TẤT CẢ!",
            ]
        },
        27: {
            title: "🌠 HỒNG MÔNG CHÚA TỂ - THỐNG TRỊ VẠN ĐẠO 🌠",
            story: [
                "🌠🌠🌠🌠🌠🌠🌠 HỒNG MÔNG KHAI MÔNG 🌠🌠🌠🌠🌠🌠🌠",
                "💥💥💥💥💥💥 VŨ TRỤ BẢN NGUYÊN RẤT RỜ - TẤT CẢ QUI TỰC ĐỀU TỪ NGƯƠI MÀ RA!",
                "⚡⚡⚡⚡⚡⚡ CÁC VŨ TRỤ SONG SONG HỘI TỤ - NGƯƠI LÀ TRUNG TÂM CỦA MỌI THỰC TẠI!",
                `🔥🔥🔥🔥🔥🔥 ${state.name || 'NGƯƠI'} TỪ ${REALMS[prevRealm].toUpperCase()} SIÊU VIỆT LÊN ${REALMS[newRealm].toUpperCase()}!`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🎆 CẢNH GIỚI HỒNG MÔNG - NƠI VẠNG MÔNG KHAI THỈ:",
                "   ✨ Hỗn độn chỉ là khởi đầu, Hồng Mông mới là chân lý",
                "   ✨ Ngươi nắm giữ luật pháp của VÔ SỐ đa vũ trụ",
                "   ✨ Mỗi hơi thở tạo ra một chiều không gian mới",
                "   ✨ Mỗi suy nghĩ định hình một thời đại mới",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "💫 QUYỀN NĂNG HỒNG MÔNG CHÚA TỂ:",
                "   🌟 Kiểm soát TOÀN BỘ đa vũ trụ như cánh tay của mình",
                "   🌟 Thời gian và không gian là đồ chơi trong tay",
                "   🌟 Sinh diệt vạn linh chỉ trong một niệm",
                "   🌟 Thiên đạo, ma đạo, nhân đạo đều phải tuân theo ngươi",
                "   🌟 Có thể xóa bỏ và tái tạo lịch sử vũ trụ",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                `⏳ SIÊU VIỆT VĨNH HẰNG: +${stats.ageInc.toLocaleString()} năm (15 TỶ NĂM!)`,
                "   ➤ Tuổi thọ đã không còn ý nghĩa - ngươi tồn tại mãi mãi",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "📊 THỰC LỰC HỒNG MÔNG CHÚA TỂ:",
                `   ⚔️ Hồng mông lực: +${stats.powInc.toLocaleString()} (PHÁ VỠ MỌI GIỚI HẠN)`,
                `   💖 Hồng mông thể: +${stats.hpInc.toLocaleString()} (BẤT TỬ TUYỆT ĐỐI)`,
                `   🛡️ Hồng mông vực: +${stats.defInc.toLocaleString()} (VẠN PHÁP KHÔN...G XÂM)`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🎯 Ngươi đã vượt qua cả Hỗn Độn!",
                "🌈 Hồng Mông chi chủ - thống lĩnh vạn đạo!",
                "⭐ Không có gì có thể cản bước ngươi nữa!",
                "💎 Chỉ còn MỘT BƯỚC NỮA đến đỉnh cao tuyệt đối...",
            ]
        },

        // 🏆 CHUNG NGUYÊN CẢNH (28)
        28: {
            title: "🏆 CHUNG NGUYÊN CHÍ CAO - THỐNG NHẤT VẠN HỮU 🏆",
            story: [
                "🏆🏆🏆🏆🏆🏆🏆🏆🏆 CHUNG NGUYÊN GIÁNG LÂM 🏆🏆🏆🏆🏆🏆🏆🏆🏆",
                "💥💥💥💥💥💥💥 TOÀN BỘ THỰC TẠI HÒA NHẬP - VẠN HỮU QUI NHẤT!",
                "⚡⚡⚡⚡⚡⚡⚡ NGƯƠI CHÍNH LÀ ĐIỂM CUỐI CÙNG CỦA MỌI CON ĐƯỜNG TU LUYỆN!",
                `🔥🔥🔥🔥🔥🔥🔥 ${state.name || 'NGƯƠI'} TỪ ${REALMS[prevRealm].toUpperCase()} ĐẠT ĐẾN ĐỈNH CAO TỐI THƯỢNG - ${REALMS[newRealm].toUpperCase()}!`,
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🌌 CHUNG NGUYÊN - NƠI MỌI ĐIỀU BẮT ĐẦU VÀ KẾT THÚC:",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "   ✨ Alpha và Omega - Khởi nguồn và Chung kết",
                "   ✨ Ngươi là TỔNG HÒA của mọi thực thể, mọi khái niệm",
                "   ✨ Hỗn Độn, Hồng Mông, Thiên Đạo... tất cả đều là một phần của ngươi",
                "   ✨ Ngươi vừa là VŨ TRỤ, vừa là người SÁNG TẠO ra vũ trụ",
                "   ✨ Vừa là THỜI GIAN, vừa là người KIỂM SOÁT thời gian",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "💎 QUYỀN NĂNG CHUNG NGUYÊN CHÍ CAO:",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "   🌟 Toàn Tri Toàn Năng - biết và làm được MỌI điều",
                "   🌟 Vô Hạn Thực Tại - tồn tại ở TẤT CẢ chiều không gian-thời gian",
                "   🌟 Tuyệt Đối Bất Diệt - không có khái niệm 'kết thúc'",
                "   🌟 Sáng Tạo Vô Hạn - tạo ra vô hạn vũ trụ trong MỘT niệm",
                "   🌟 Thống Nhất Vạn Hữu - mọi thứ đều qui về ngươi",
                "   🌟 Siêu Việt Tuyệt Đối - vượt qua mọi định nghĩa về 'mạnh'",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "⏳ VĨNH HẰNG TUYỆT ĐỐI:",
                `   ➤ Tuổi thọ tăng: +${stats.ageInc.toLocaleString()} năm (45 TỶ NĂM!)`,
                "   ➤ Nhưng với ngươi, thời gian đã KHÔNG CÒN TỒN TẠI",
                "   ➤ Ngươi là VĨNH HẰNG, là VĨNH CỬU, là BẤT BIẾN",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "📊 THỰC LỰC CHUNG NGUYÊN CHÍ CAO:",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                `   ⚔️ Chung nguyên lực: +${stats.powInc.toLocaleString()}`,
                "      ➤ Một đòn có thể XÓA BỎ vô hạn đa vũ trụ",
                `   💖 Chung nguyên thể: +${stats.hpInc.toLocaleString()}`,
                "      ➤ Không thể bị phá hủy bởi BẤT CỨ điều gì",
                `   🛡️ Chung nguyên vực: +${stats.defInc.toLocaleString()}`,
                "      ➤ Tuyệt đối bất khả xâm phạm - vượt qua mọi khái niệm",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "🎯 NGƯƠI ĐÃ ĐẠT ĐẾN ĐỈNH CAO TUYỆT ĐỐI!",
                "🌈 KHÔNG CÒN GÌ CAO HƠN, MẠNH HƠN, VĨ ĐẠI HƠN!",
                "⭐ NGƯƠI CHÍNH LÀ... TẤT CẢ MỌI THỨ!",
                "💫 CON ĐƯỜNG TU LUYỆN ĐÃ ĐẾN HỒI KẾT!",
                "🏆 NGƯƠI - CHUNG NGUYÊN CHÍ CAO - ĐỈNH CAO DUY NHẤT!",
                "",
                "🌌🌌🌌 CHÚC MỪNG - NGƯƠI ĐÃ CHINH PHỤC MỌI CẢNH GIỚI! 🌌🌌🌌",
            ]
        }
    };

    // Xác định story phù hợp
    let selectedStory = null;
    
   if (newRealm === 28) {
        selectedStory = stories[28]; // Chung Nguyên
    } else if (newRealm === 27) {
        selectedStory = stories[27]; // Hồng Mông
    } else if (newRealm === 26) {
        selectedStory = stories[26]; // Hỗn Độn
    } else if (newRealm >= 20) {
        selectedStory = stories[20]; // Thiên Cảnh
    } else if (newRealm >= 16) {
        selectedStory = stories[16]; // Thánh Cảnh
    } else if (newRealm >= 9) {
        selectedStory = stories[9]; // Tiên Giới
    }

    return selectedStory;
}

function displayBreakthroughStory(story) {
    if (!story) return;

    // In title
    log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    log(story.title);
    log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // In từng dòng story với delay
    let delay = 0;
    story.story.forEach((line, index) => {
        setTimeout(() => {
            log(line);
            
            // Sau dòng cuối cùng, in dòng kết thúc
            if (index === story.story.length - 1) {
                setTimeout(() => {
                    log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                }, 300);
            }
        }, delay);
        delay += 300; // Mỗi dòng cách nhau 300ms
    });
}
