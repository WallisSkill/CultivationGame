// Story system for Tu Tiên game - element-based story generation
// Stories are now organized by elements and rank for thematic relevance

// ==================== ELEMENT-BASED STORY OPENINGS ====================
// Structure: ELEMENT_OPENINGS[element][rankTier]
// Each element has 4 tier-specific openings: low, mid, high, supreme
const ELEMENT_OPENINGS = {
    'Kim': {
        low: [
            {
                id: 1,
                title: "KIM ĐAO SẮC NHỌN",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "⚔️ KIM ĐAO SẮC NHỌN ⚔️",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "⚔️ Những thanh kiếm ánh kim chém gió trong hư không, dù yếu vẫn sắc bén!",
                    "⚔️ Ngươi mới bắt đầu con đường tu tiên, nhưng ý chí đã như thép...",
                    "⚔️ Kim linh trong huyết mạch đang thức tỉnh, dù còn yếu ớt...",
                    "⚔️ Từ một mảnh sắt nhỏ, ngươi sẽ rèn luyện thành thanh kiếm vĩ đại!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                title: "KIM ĐAO XUẤT THẾ",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "⚔️ KIM ĐAO XUẤT THẾ ⚔️",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "⚔️ Những thanh kiếm ánh kim chém gió trong hư không, tiếng kim loại rung động...",
                    "⚔️ Ngươi mở mắt ra, cơ thể như được đúc từ thép ben tinh khiết...",
                    "⚔️ Mỗi đường kiếm trong không khí đều tựa như những lời thề sắt ben...",
                    "⚔️ Kim linh trong huyết mạch đang thức tỉnh, đòi được ra trận!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                title: "BẠCH KIM CHIẾN",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🗡️ BẠCH KIM CHIẾN 🗡️",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🗡️ Ánh bạc từ những thanh kiếm chiếu rọi khắp nơi, sắc bén vô cùng...",
                    "🗡️ Ngươi đứng giữa một cánh đồng kiếm, nơi mỗi thanh đều nghe theo ngươi...",
                    "🗡️ Khí thế sắc bén xuyên thủng mọi phòng tuyến, kim chiến, kim thắng!",
                    "🗡️ Từ nay, ngươi chính là Đao Kiếm Chi Tử - sắc bén là sống!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                title: "KIM ĐẠI VƯƠNG",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "👑 KIM ĐẠI VƯƠNG 👑",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "👑 Ngàn kiếm quỳ phục trước ngai vàng kim quang!",
                    "👑 Ngươi là Đế vương của muôn kiếm - sắc bén vô địch!",
                    "👑 Kim khí ngưng tụ thành vương miện, kim đao tuân theo mệnh lệnh!",
                    "👑 Từ nay, thiên hạ đều phải quỳ trước thanh kiếm của ngươi!"
                ]
            }
        ]
    },
    'Mộc': {
        low: [
            {
                id: 1,
                title: "THANH MỘC TIỂU SINH",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌱 THANH MỘC TIỂU SINH 🌱",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌱 Những nhánh cây xanh nhỏ từ đan điền ngươi đâm chồi nảy lộc...",
                    "🌱 Ngươi đứng giữa vườn cây nhỏ, cành lá rung rinh trong gió...",
                    "🌱 Mỗi chiếc lá đều mang theo sinh khí, dù nhỏ bé vẫn kiên cường...",
                    "🌱 Mộc linh trong ngươi đang hòa vào thiên nhiên - sinh trưởng không ngừng!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                title: "THANH MỘC SINH",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌿 THANH MỘC SINH 🌿",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌿 Những nhánh cây xanh từ đan điền ngươi đâm chồi nảy lộc...",
                    "🌿 Ngươi đứng giữa rừng cây ngàn năm, cành lá rung rinh trong gió...",
                    "🌿 Mỗi chiếc lá đều mang theo sinh khí của thiên địa, nuôi dưỡng ngươi...",
                    "🌿 Mộc linh trong ngươi đang hòa vào thiên nhiên - sáng tạo, sinh trưởng!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                title: "ĐẠI THỤ TRƯỜNG SINH",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌳 ĐẠI THỤ TRƯỜNG SINH 🌳",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌳 Ngươi đứng dưới gốc cây cổ thụ ngàn năm, rễ cây đâm sâu vào lòng đất...",
                    "🌳 Từng vòng năm trong thân cây như những bản ghi về lịch sử vạn cổ...",
                    "🌳 Cây như muốn kể cho ngươi nghe những bí ẩn của thiên địa...",
                    "🌳 Mộc linh trong ngươi như đại thụ - che chở muôn loài, sống mãi với thời gian!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                title: "MỘC ĐẠO THƯỜNG SINH",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌲 MỘC ĐẠO THƯỜNG SINH 🌲",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌲 Ngươi là Đạo của sự sống - vạn vật đều sinh từ ngươi!",
                    "🌲 Rừng rậm bao la phục tùng, cây cối đâm chồi theo ý ngươi!",
                    "🌲 Mộc căn của ngươi là nguồn sống của càn khôn!",
                    "🌲 Từ nay, ngươi chính là Thường Sinh Đạo - sống mãi không bao giờ tàn!"
                ]
            }
        ]
    },
    'Thủy': {
        low: [
            {
                id: 1,
                title: "THUỶ TRIỀU TIỂU NGỌC",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "💧 THUỶ TRIỀU TIỂU NGỌC 💧",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "💧 Dòng nước nhỏ từ đan điền tuôn ra, ngươi đứng bên bờ suối trong...",
                    "💧 Sóng nhỏ vỗ vào chân, mang theo linh khí từ dòng suối nhỏ...",
                    "💧 Mỗi giọt nước đều mang theo năng lượng tu luyện, dù còn ít...",
                    "💧 Thủy căn của ngươi như suối nhỏ - trong veo mà không ngừng chảy!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                title: "THUỶ TRIỀU DÂNG",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌊 THUỶ TRIỀU DÂNG 🌊",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌊 Dòng nước từ đan điền tuôn ra như thác đổ, ngươi đứng giữa biển nước...",
                    "🌊 Sóng biển vỗ vào chân, mang theo linh khí từ đại dương vô tận...",
                    "🌊 Mỗi giọt nước đều mang theo năng lượng tu luyện vô cùng...",
                    "🌊 Thủy căn của ngươi như sông Mê Mông - cuồn cuộn, không ngừng!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                title: "THUỶ LONG CHỦ",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🐉 THUỶ LONG CHỦ 🐉",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🐉 Rồng nước uốn lượn từ đan điền, ngươi làm chủ muôn dòng sông!",
                    "🐉 Sóng biển tuân theo ý chỉ, thủy triều lên xuống theo mệnh ngươi!",
                    "🐉 Thủy căn của ngươi như đại dương - bao la, sâu thẳm, vô tận!",
                    "🐉 Từ nay, ngươi là Thủy Long Chủ - người cai quản mọi dòng nước!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                title: "THUỶ ĐẠO VÔ CÙNG",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌌 THUỶ ĐẠO VÔ CÙNG 🌌",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌌 Ngươi là đại dương không bờ - tất cả đều chảy về ngươi!",
                    "🌌 Thủy nguyên quy nhất, vạn dòng đều thuộc về ngươi!",
                    "🌌 Ngươi là Thủy Đạo - vô cùng, vô tận, vĩnh hằng!",
                    "🌌 Từ nay, ngươi chính là Thủy Đạo Vô Cùng - tất cả đều quy về ngươi!"
                ]
            }
        ]
    },
    'Hỏa': {
        low: [
            {
                id: 1,
                title: "HỎA DIỄM TIỂU NHI",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🔥 HỎA DIỄM TIỂU NHI 🔥",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🔥 Ngọn lửa nhỏ từ đan điền bắt đầu bùng cháy, dù còn yếu ớt...",
                    "🔥 Ngươi đứng trước ngọn nến cháy sáng, cảm nhận hơi ấm đầu tiên...",
                    "🔥 Mỗi ngọn lửa đều có ý chí riêng, dù nhỏ vẫn thiêu đốt!",
                    "🔥 Hỏa căn trong ngươi như ngọn nến - leo lói nhưng không tắt!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                title: "HỎA DIỄM THIÊU",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🔥 HỎA DIỄM THIÊU 🔥",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🔥 Ngọn lửa từ đan điền bùng cháy, thiêu đốt mọi tạp chất trong thân...",
                    "🔥 Ngươi đứng giữa biển lửa mà không bị phỏng, như được Hỏa thần bảo hộ...",
                    "🔥 Mỗi ngọn lửa đều nghe theo điều khiển của ngươi, đốt cháy mọi cản trở!",
                    "🔥 Hỏa căn trong ngươi nóng cháy hơn mặt trời - hủy diệt và sáng tạo!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                title: "HỎA LONG PHƯỢNG",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🔥 HỎA LONG PHƯỢNG 🔥",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🔥 Rồng lửa và phượng hoàng cùng xuất hiện từ đan điền ngươi!",
                    "🔥 Ngọn lửa thiêu đốt cả thiên địa, ngươi là hỏa chi chủ!",
                    "🔥 Hỏa diễm trong cơ thể ngươi như núi lửa phun trào!",
                    "🔥 Từ nay, ngươi là Hỏa Long Phượng - hủy diệt và tái sinh!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                title: "HỎA ĐẠO VIÊM DƯƠNG",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "☀️ HỎA ĐẠO VIÊM DƯƠNG ☀️",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "☀️ Ngươi là mặt trời không bao giờ tắt - thiêu đốt vạn vật!",
                    "☀️ Hỏa nguyên chi lực của ngươi có thể đốt cháy cả càn khôn!",
                    "☀️ Ngươi là Hỏa Đạo - Viêm Dương chi Thần, ngọn lửa của vũ trụ!",
                    "☀️ Từ nay, ngươi chính là Viêm Dương Đạo - thiêu đốt tất cả, soi sáng vạn gian!"
                ]
            }
        ]
    },
    'Thổ': {
        low: [
            {
                id: 1,
                title: "THỔ KHÍ KHỞI NGUYÊN",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🏔️ THỔ KHÍ KHỞI NGUYÊN 🏔️",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🏔️ Một hạt đất nhỏ từ đan điền ngươi bắt đầu sinh sôi...",
                    "🏔️ Ngươi đặt tay lên đất, cảm nhận nhịp đập của đại địa mẹ...",
                    "🏔️ Từng hạt cát nhỏ hội tụ, hình thành nền móng đầu tiên...",
                    "🏔️ Thổ căn của ngươi như hạt giống - nảy mầm từ đất mẹ!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                title: "THỔ KHÍ BỐC LÊN",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🏔️ THỔ KHÍ BỐC LÊN 🏔️",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🏔️ Mặt đất dưới chân ngươi rung chuyển, đất đai phóng thích linh khí...",
                    "🏔️ Ngươi đặt tay lên đất, cảm nhận được nhịp đập của đại địa mẹ...",
                    "🏔️ Từng tảng đá từ lòng đất trồi lên, xoay quanh ngươi như vệ tinh...",
                    "🏔️ Thổ căn của ngươi nặng nề mà vững chắc - nền tảng của vạn vật!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                title: "ĐẠI ĐỊA CHỦ",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌾 ĐẠI ĐỊA CHỦ 🌾",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌾 Đất đai dưới chân ngươi rực rỡ một màu vàng óng ánh...",
                    "🌾 Ngươi cảm nhận được sức sống của muôn loài đang từ đất mà sinh ra!",
                    "🌾 Mỗi hạt đất đều mang theo năng lượng nuôi dưỡng vạn vật...",
                    "🌾 Thổ linh trong ngươi như đất mẹ - nuôi dưỡng, che chở, sinh vạn vật!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                title: "THỔ ĐẠO CÀN KHÔN",
                lines: [
                    "",
                    "═══════════════════════════════════════════════════════════",
                    "🌍 THỔ ĐẠO CÀN KHÔN 🌍",
                    "═══════════════════════════════════════════════════════════",
                    "",
                    "🌍 Ngươi là nền tảng của càn khôn - không có gì tồn tại nếu không có ngươi!",
                    "🌍 Đại địa phục tùng, núi non cúi đầu, tất cả đều từ ngươi mà ra!",
                    "🌍 Ngươi là Thổ Đạo - Càn Khôn Chi Thổ, nền tảng vạn vật!",
                    "🌍 Từ nay, ngươi chính là Thổ Đạo Càn Khôn - vạn vật đều sinh từ ngươi!"
                ]
            }
        ]
    }
};

// Rank-based story openings (for multi-element spirit roots)
const RANK_OPENINGS = {
    low: [ // rank 0-2 (Phế phẩm, Hạ phẩm, Trung phẩm)
        {
            id: 1,
            title: "PHÀM NHÂN NGHỊCH KHỞI",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "🍂 PHÀM NHÂN NGHỊCH KHỞI 🍂",
                "═══════════════════════════════════════════════════════════",
                "",
                "🍂 Ngươi sinh ra với linh căn yếu ớt, bị người đời coi như phế vật...",
                "🍂 Nhưng trong ngươi có một ngọn lửa không bao giờ tắt - đó là ý chí nghịch thiên!",
                "🍂 Dù là cỏ cây bé nhỏ, ngươi vẫn hướng về mặt trời!",
                "🍂 Từ nay, ngươi sẽ chứng minh rằng phàm nhân cũng có thể đạt đạo!"
            ]
        },
        {
            id: 2,
            title: "TU HÀNH ĐẦU DŨNG CẢM",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "💪 TU HÀNH ĐẦU DŨNG CẢM 💪",
                "═══════════════════════════════════════════════════════════",
                "",
                "💪 Linh căn yếu khiến ngươi chật vật ngay từ bước đầu tiên...",
                "💪 Nhưng ngươi nhớ lại bao người đã nói 'ngươi không làm được'...",
                "💪 Với quyết tâm sắt đá, ngươi bước tiếp con đường tu đạo!",
                "💪 Từ bùn lầy, ngươi sẽ vươn lên tầng cao nhất của thiên địa!"
            ]
        },
        {
            id: 3,
            title: "Nghịch Thiên Chi Tâm",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "⚡ Nghịch Thiên Chi Tâm ⚡",
                "═══════════════════════════════════════════════════════════",
                "",
                "⚡ Trời không cho ngươi tài năng, ngươi sẽ tự tạo ra!",
                "⚡ Đất không cho ngươi cơ duyên, ngươi sẽ tự tìm kiếm!",
                "⚡ Ngươi không tin vào số phận, ngươi tin vào nghị lực của chính mình!",
                "⚡ Mệnh trời định, ta không thèm - đó là khẩu khí của ngươi!"
            ]
        }
    ],
    mid: [ // rank 3-5 (Thượng phẩm, Huyền phẩm, Địa phẩm)
        {
            id: 1,
            title: "THIÊN PHÚ DẦN HIỆN",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "🌟 THIÊN PHÚ DẦN HIỆN 🌟",
                "═══════════════════════════════════════════════════════════",
                "",
                "🌟 Ngươi được thiên địa ban tặng một linh căn không tồi...",
                "🌟 Từ đây, mỗi bước đi đều vững chắc hơn người thường!",
                "🌟 Ngươi cảm nhận được linh khí trong thiên địa đang hòa vào cơ thể!",
                "🌟 Con đường tiên đạo đã mở ra trước mắt - hãy nắm lấy cơ hội!"
            ]
        },
        {
            id: 2,
            title: "ĐẠO CƠ ĐÃ MỞ",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "✨ ĐẠO CƠ ĐÃ MỞ ✨",
                "═══════════════════════════════════════════════════════════",
                "",
                "✨ Linh căn của ngươi đang tỏa sáng, tiềm năng được đánh thức!",
                "✨ Ngươi cảm nhận được một luồng năng lượng dâng trào trong đan điền!",
                "✨ Mỗi ngày tu luyện, ngươi đều thấy tiến bộ rõ rệt!",
                "✨ Thiên phú của ngươi không giới hạn - chỉ cần thời gian để bung trổ!"
            ]
        },
        {
            id: 3,
            title: "CƠ HỘI TU ĐẠO",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "🌈 CƠ HỘI TU ĐẠO 🌈",
                "═══════════════════════════════════════════════════════════",
                "",
                "🌈 Tu đạo chính quan - con đường đã rõ ràng!",
                "🌈 Ngươi có linh căn tốt, từ đây mọi thứ sẽ khác!",
                "🌈 Thiên địa đang mỉm cười với ngươi!",
                "🌈 Hãy nắm lấy cơ hội này và tiến bước!"
            ]
        }
    ],
    high: [ // rank 6-8 (Thiên phẩm, Tiên phẩm, Thánh phẩm)
        {
            id: 1,
            title: "THIÊN TÀI XUẤT HIỆN",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "⭐ THIÊN TÀI XUẤT HIỆN ⭐",
                "═══════════════════════════════════════════════════════════",
                "",
                "⭐ Linh căn của ngươi thuộc hàng hiếm có trong thiên hạ!",
                "⭐ Thiên địa đều cảm nhận được sự xuất hiện của một thiên tài!",
                "⭐ Mọi người đều ngước nhìn và kính sợ trước linh căn của ngươi!",
                "⭐ Ngươi không phải kẻ thường - ngươi là người được trời chọn!"
            ]
        },
        {
            id: 2,
            title: "THÁNH LINH QUANG THỂ",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "🌟 THÁNH LINH QUANG THỂ 🌟",
                "═══════════════════════════════════════════════════════════",
                "",
                "🌟 Ánh sáng thánh linh từ đan điền ngươi tỏa ra khắp nơi!",
                "🌟 Ngươi mang trong mình một linh căn thuộc hàng thánh cấp!",
                "🌟 Thiên đạo đã ghi tên ngươi vào sổ thánh nhân từ khi sinh ra!",
                "🌟 Tương lai của ngươi sáng như nhật nguyệt - vô cùng huy hoàng!"
            ]
        },
        {
            id: 3,
            title: "VẠN NGƯỜI KÍNH NGƯỜI",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "👑 VẠM NGƯỜI KÍNH NGƯỜI 👑",
                "═══════════════════════════════════════════════════════════",
                "",
                "👑 Ngươi là thiên tài hiếm có - ai gặp cũng phải kính nể!",
                "👑 Khí chất tu sĩ tỏa ra, người người ngưỡng mộ!",
                "👑 Đạo lộ của ngươi rộng mở, việc gì cũng thuận lợi!",
                "👑 Từ nay, ngươi là ngôi sao đang tỏa sáng trên bầu trời tu tiên!"
            ]
        }
    ],
    supreme: [ // rank 9+ (Hỗn Nguyên, Đại Thừa, Tiên Thiên, etc.)
        {
            id: 1,
            title: "HỖN NGUYÊN CHÍ TÔN",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "🌌 HỖN NGUYÊN CHÍ TÔN 🌌",
                "═══════════════════════════════════════════════════════════",
                "",
                "🌌 Trong đan điền ngươi, ngũ hành đang giao hòa và ngưng tụ!",
                "🌌 Ngươi là kết tinh của thiên địa - một tồn tại không thuộc luân hồi!",
                "🌌 Đế vận đã được ghi vào càn khôn, ngươi là chủ nhân của vạn vật!",
                "🌌 Hỗn nguyên linh căn - ngươi chính là Đấng Sáng Thế!"
            ]
        },
        {
            id: 2,
            title: "ĐẠI THỪA VÔ THƯỢNG",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "🏆 ĐẠI THỪA VÔ THƯỢNG 🏆",
                "═══════════════════════════════════════════════════════════",
                "",
                "🏆 Linh căn của ngươi là đỉnh cao của vạn cổ - không ai sánh bằng!",
                "🏆 Ngũ hành trong ngươi hòa làm một, tạo thành một thế giới thu nhỏ!",
                "🏆 Ngươi có thể sáng tạo và hủy diệt chỉ bằng một ý niệm!",
                "🏆 Từ nay, ngươi là Vô Thượng - không có gì có thể sánh được!"
            ]
        },
        {
            id: 3,
            title: "TIÊN THIÊN ĐẠI ĐẠO",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "💫 TIÊN THIÊN ĐẠI ĐẠO 💫",
                "═══════════════════════════════════════════════════════════",
                "",
                "💫 Ngươi sinh ra đã mang trong mình đạo căn viên mãn!",
                "💫 Thiên địa như được dựng lên chỉ để phục vụ ngươi!",
                "💫 Ngươi có thể cảm nhận được ý muốn của trời đất!",
                "💫 Tiên thiên chi linh - ngươi là hiện thân của Đạo trên mặt đất!"
            ]
        },
        {
            id: 4,
            title: "ĐẾ VẬN THỤC MỆNH",
            lines: [
                "",
                "═══════════════════════════════════════════════════════════",
                "🌟 ĐẾ VẬN THỤC MỆNH 🌟",
                "═══════════════════════════════════════════════════════════",
                "",
                "🌟 Ngũ hành ngưng tụ, đế vận thục mệnh!",
                "🌟 Ngươi là kết tinh của vạn cổ - một tồn tại vô song!",
                "🌟 Mọi thiên tài trong thiên hạ đều phải ngước nhìn ngươi!",
                "🌟 Ngươi chính là định mệnh - ngươi là người được chọn!"
            ]
        }
    ]
};

// Default/fallback openings (general stories when no element match)
const DEFAULT_OPENINGS = [
    {
        id: 1,
        title: "KHAI THIÊN",
        lines: [
            "",
            "═══════════════════════════════════════════════════════════",
            "📜 KHAI THIÊN 📜",
            "═══════════════════════════════════════════════════════════",
            "",
            "✨ Hồi hương tưởng cảnh... Ngươi chợt tỉnh giấc mộng vạn cổ...",
            "✨ Ngửi thấy hương thơm của cổ đạo, nghe tiếng chuông thiên cổ vang vọng...",
            "✨ Mở mắt ra, ngươi thấy mình đứng giữa một thế giới hoàn toàn xa lạ...",
        ]
    },
    {
        id: 2,
        title: "LUYỆN NGỌC",
        lines: [
            "",
            "═══════════════════════════════════════════════════════════",
            "💎 LUYỆN NGỌC 📜",
            "═══════════════════════════════════════════════════════════",
            "",
            "🔥 Lửa thiêu đốt trong đan điền, ngươi như được tôi luyện trong hỏa long...",
            "🔥 Từng đợt đau đớn xuyên qua thân thể, nhưng linh hồn lại càng thêm sáng rực...",
            "🔥 Ngọn lửa khai thiên nung nấu thân xác, biến phàm thành tiên...",
        ]
    },
    {
        id: 3,
        title: "THIÊN ĐẠO",
        lines: [
            "",
            "═══════════════════════════════════════════════════════════",
            "🌌 THIÊN ĐẠO 📜",
            "═══════════════════════════════════════════════════════════",
            "",
            "🌌 Bầu trời đêm đầy sao, ngươi ngước nhìn vòm trời vô tận...",
            "🌌 Từng vì sao chầm chậm xoay, như đang vẽ nên bản đồ vận mệnh...",
            "🌌 Một tia sáng đặc biệt tách khỏi vân sao, hướng thẳng về phía ngươi...",
        ]
    },
    {
        id: 4,
        title: "HỖN ĐỘN",
        lines: [
            "",
            "═══════════════════════════════════════════════════════════",
            "🌑 HỖN ĐỘN 📜",
            "═══════════════════════════════════════════════════════════",
            "",
            "🌑 Trước khi có thiên địa, chỉ có hồng mông... ngươi đứng trong hư không tuyệt đối...",
            "🌑 Không có ánh sáng, không có bóng tối, không có thời gian... chỉ có ngươi và hư vô...",
            "🌑 Rồi một tia sáng xuất hiện, bắt đầu một hành trình mới...",
        ]
    }
];

const ORIGIN_POOLS_EXTENDED = {
    // LOW RANK ORIGINS (rank 0-2) - 25 variations
    low: [
        // Group 1: Abandoned children (5)
        "Một hài nhi bị bỏ lại bên bờ suối Linh Hà, trong tay chỉ có mảnh ngọc tàn khắc chữ 'Đạo'.",
        "Đứa trẻ bị đặt trước cửa chùa cổ trong đêm mưa giông, tiếng chuông vẫn vang vọng bên tai.",
        "Một trẻ sơ sinh nằm giữa rừng già, được sóc đỏ cho uống sữa mỗi đêm đến khi được người tìm thấy.",
        "Hài nhi bị bỏ trong thuyền nan giữa dòng sông, để trôi theo dòng nước đến duyên phận.",
        "Đứa trẻ mồ côi được một lão nông nhặt về, dạy nó cách cầy cấy và sống bằng hai bàn tay.",

        // Group 2: Hardships (5)
        "Xuất thân nơi phàm trần tầm thường, sớm mồ côi cha mẹ, lấy khổ luyện làm đạo.",
        "Sinh ra trong gia đình nghèo khó, cha mẹ chết sớm vì dịch bệnh, một mình tự lập.",
        "Lớn lên trong xóm lao động, đói khát triền miên, chỉ có ý chí là không bao giờ tắt.",
        "Bị bán làm nô tì từ nhỏ, chịu đựng nhục hình không biết bao nhiêu lần.",
        "Sống lang thang trên đường, ngủ nơi đình làng, ăn nhặt từng hạt cơm rơi.",

        // Group 3: Survival stories (5)
        "Sinh ra giữa làng nhỏ bị tà khí bao phủ, sống sót duy nhất nhờ ý chí cầu sinh.",
        "Gia đình bị thảm sát bởi yêu ma, một mình chạy thoát giữa đêm đen tối.",
        "Làng bị cướp phá, cha bị giết, mẹ bị bắt, chỉ còn lại một mình ngươi.",
        "Dịch bệnh hoành hành, cả nhà chết hết, ngươi là người sống sót cuối cùng.",
        "Bị rắn độc cắn nhưng không chết, nhờ đó mà linh căn bộc phát.",

        // Group 4: Slaves and outcasts (5)
        "Từng làm nô dịch cho tu sĩ, bị hành hạ mà ngộ ra 'cầu đạo chỉ có máu và mồ hôi'.",
        "Là đứa con của một người đàn bà bị ruồng bỏ, bị coi như cặn bã của xã hội.",
        "Sinh ra làm nô lệ trong mỏ khoáng, không biết mặt trời trông như thế nào.",
        "Bị bán vào lòng luyện đan, làm việc đến chết với những người cùng cảnh ngộ.",
        "Là con của tội nhân, bị xã hội ruồng bỏ từ nhỏ, sống nơi bãi rác.",

        // Group 5: Wanderers and seekers (5)
        "Một kẻ lang thang nơi biên ải, thấy tiên bay qua trời, từ đó lòng hướng tới đạo.",
        "Trẻ mồ côi không nơi về, cứ đi mãi về phía có ánh sáng, đến khi thấy chân tướng.",
        "Kẻ bị đuổi cùng đường, nhảy xuống vực sâu nhưng không chết, được cứu bởi một vị cao nhân.",
        "Một người tự xưng 'vô gia' — không cha không mẹ, không quê, chỉ có đạo là nhà.",
        "Người điên khùng được cho là bị 'thiên nhãn thông', thực ra đang ngộ đạo trong dị tượng."
    ],

    // MID RANK ORIGINS (rank 3-5) - 25 variations
    mid: [
        // Group 1: Border life (5)
        "Lớn lên nơi biên cương loạn thế, hằng ngày đối mặt thú hoang linh mị — đạo tâm được rèn trong lửa và máu.",
        "Sống trong thành trì biên ải, đêm đêm nghe tiếng chiến tranh vang vọng từ phương xa.",
        "Gia đình giữ đồn biên cương, cha chết trận, mẹ gả cho người khác, một mình nuôi em.",
        "Làng bị giặc cướp tấn công nhiều lần, mỗi lần sống sót đều thêm một bài học.",
        "Người giữ cửa ải, mỗi đêm canh gác đều ngắm trăng và ngẫm về cuộc đời.",

        // Group 2: Fallen families (5)
        "Là hậu duệ của một tông môn đã diệt, mang oán khí nghìn năm chờ ngày phục hưng.",
        "Gia tộc từng huy hoàng nay sa sút, người trong gia đều chết dần, chỉ còn ngươi.",
        "Con cháu của một vị Trưởng lão bị đày ra biên ải, sống trong nhục nhã.",
        "Tộc trưởng mất tích, gia tộc nội chiến, ngươi là đứa trẻ duy nhất sống sót.",
        "Một chi tộc bị trục xuất khỏi tông môn, sống lang thang không nơi qui phục.",

        // Group 3:孤儿 & orphans (5)
        "Trưởng thành trong cô nhi viện của Tán Tu Minh, thề rằng một ngày sẽ bước lên tiên đạo.",
        "Mồ côi sớm, được các sư thầy trong chùa nuôi dưỡng, tụng kinh từ năm lên ba.",
        "Cha mẹ chết vì tu luyện điên độ, ngươi thề không lặp lại sai lầm của họ.",
        "Cô nhi viện bị tấn công, ngươi một mình chạy thoát, mang theo bí kíp của sư phụ đã mất.",
        "Được mẹ nuôi là một nô lệ tu tiên, dạy ngươi những điều cấm kỵ của thiên địa.",

        // Group 4: Disciples & students (5)
        "Được một lão đạo nhặt về giữa núi hoang, dạy đạo pháp sơ cấp — đến nay đạo cơ dần hiển lộ.",
        "Từ nhỏ được gửi vào tông môn nhỏ, bị coi như người hầu, nhưng không ngừng tu luyện.",
        "Đệ tử lưu lạc của một tông môn đã tan rã, mang theo manh mối về hung thủ.",
        "Được nhận làm đồ đệ cho một cao nhân ẩn sĩ, nhưng sư phụ chết trước khi truyền hết kinh.",
        "Con của một đại sư bị kết tội danh, phải ẩn náu trong rừng sâu từ nhỏ.",

        // Group 5: Ambition & determination (5)
        "Sinh trong dòng dõi tầm trung, song lòng không cam tầm thường, quyết tự khai đạo lộ.",
        "Phật tử nhà giàu bỏ cả gia sản ra đi, một bộ y hà khổ cầu đạo.",
        "Người trẻ tuổi bị gia đình ép cưới vợ, bỏ trốn theo tiếng gọi của đạo.",
        "Nho sinh thi trượt nhiều lần, quyết tâm tìm đường khác để thành danh.",
        "Thương nhân bỏ hết của cải, tìm kiếm một thứ quý hơn vàng — đó là đạo."
    ],

    // HIGH RANK ORIGINS (rank 6-8) - 25 variations
    high: [
        // Group 1: Bloodline mysteries (5)
        "Mang trong người dòng máu cổ thần, ký ức bị phong ấn, chỉ khi linh căn hiển thế mới khôi phục.",
        "Xuất thân từ thế gia linh mạch, từ nhỏ đã cảm được linh khí chuyển động trong huyết quản.",
        "Là hậu nhân thất lạc của Cổ Tiên tộc, máu huyết đang dần thức tỉnh.",
        "Ngươi sinh ra, dị tượng hiện — thiên tượng nghịch chuyển, đạo văn cổ xoay quanh nôi.",
        "Được một vị Chân Tiên chọn làm truyền nhân bí ẩn, định mệnh không thuộc phàm gian.",

        // Group 2: Divine encounters (5)
        "Mẹ ngươi từng cứu một con rồng bị thương, rồng ban cho một giọt máu trước khi bay đi.",
        "Khi mẹ mang thai ngươi, có một vị phật hiện trong giấc mơ bà và nói 'đứa trẻ này sẽ là Bồ Tát'.",
        "Cha ngươi là một tu sĩ từng phạm giới, nhưng gặp được thiên tiên giáng sinh.",
        "Bà ngoại ngươi từng nuốt một viên đan dược trong mộng, năng lượng đó truyền qua các thế hệ.",
        "Một đạo sĩ cứu ngươi khỏi chết khi còn trong bụng mẹ, phù rễ bằng phép thuật cổ.",

        // Group 3: Cultivation connections (5)
        "Được linh thể nhập vào đêm ngươi chào đời, khiến ngươi có linh căn đặc biệt.",
        "Cha là Trưởng lão của một siêu cấp tông môn, mẹ là con gái của Thánh chủ.",
        "Sinh ra khi Thiên Cơ xuất hiện, báo trước một thiên tài sẽ thay đổi vận mệnh thiên hạ.",
        "Được một vị Đạo Tổ nhìn thấy khi còn là hài nhi, nói 'đứa trẻ này sẽ đại nao bang'.",
        "Một trong ba mươi sáu đại cảnh giới của thế giới này đã chết và hồn phách nhập vào ngươi.",

        // Group 4: Extraordinary births (5)
        "Khi chào đời, nhà cửa đều rung chuyển, hoa quả nở rộ trong mùa đông.",
        "Tiếng khóc của ngươi khi mới sinh đã làm vỡ một tấm gương cổ trong làng.",
        "Ngươi sinh ra với một vết chình ấn đỏ trên trán, như ấn quyết của cổ tiên.",
        "Đêm ngươi ra đời, sao Bắc Đẩu mọc ngay giữa trưa, mọi người đều thấy.",
        "Ngươi sinh ra không khóc, chỉ mỉm cười và ngước nhìn trời xanh — điềm báo của thiên tài.",

        // Group 5: Destined paths (5)
        "Được tiên nhân trong mộng dạy một pháp quyết, tỉnh dậy thì đã thuộc làu.",
        "Một bà cụ từ phương xa đến ban đêm, nói ngươi là 'người được chọn' rồi biến mất.",
        "Khi lên ba, ngươi đã có thể ngồi thiền một ngày một đêm không ăn uống.",
        "Được một vị cao nhân truyền thụ một chương kinh văn cổ trước khi hóa đi.",
        "Trong người ngươi có một mảnh vỡ của Thái Ất Thần Khí đã thức tỉnh."
    ],

    // CHAOS/SUPREME ORIGINS (rank 9+) - 25 variations
    chaos: [
        // Group 1: Primordial existence (5)
        "Sinh giữa hư vô, không cha không mẹ, chỉ có thiên đạo lưu lại một giọt linh quang.",
        "Là kết tinh của ngũ hành, sinh ra cùng tiếng sấm khai thiên — Hỗn Độn chi thể, không thuộc luân hồi.",
        "Không ai biết ngươi đến từ đâu, nhưng mỗi bước đi đều khiến thiên địa chấn động.",
        "Từ trong hỗn mang, một linh hồn thức tỉnh — không ký ức, chỉ có đạo tâm thuần khiết vô biên.",
        "Ngươi không phải được sinh ra — ngươi là sự kiện tự xảy ra trong càn khôn.",

        // Group 2: Cosmic events (5)
        "Sao sa rơi xuống khi ngươi chào đời, một ngôi sao băng giáng vào nhà ngươi và tan biến.",
        "Khi ngươi khóc lần đầu tiên, mặt trời bắt đầu chiếu sáng thế giới lần đầu sau Đại Diễn.",
        "Thiên địa vừa mới khai thiên khi ngươi ra đời, ngươi và thế giới cùng một lứa.",
        "Một vệ tinh của Thái Dương bị rơi xuống, hóa thành một đứa trẻ — đó là ngươi.",
        "Trên bầu trời xuất hiện một hố đen mới, đó là nơi ngươi đến từ.",

        // Group 3: God-like origins (5)
        "Là con của một vị Đế quân đã nhập diệt, di sản quân vương trong huyết mạch.",
        "Hồn phách ngươi là một vị Thần từ thiên giới rơi xuống, nhưng không nhớ gì.",
        "Ngươi là hiện thân của Đạo, một khía cạnh của vũ trụ tự biến thành người.",
        "Một trong mười hai Thần Vị đã hóa thân làm người, mang theo sứ mệnh ngàn năm.",
        "Ngươi là mảnh vỡ của Thượng Đế — một phần của nguyên thủy đang tìm cách tái hợp.",

        // Group 4: Ultimate potential (5)
        "Trong cơ thể ngươi có một Tiên Vực đang hình thành, một thế giới thu nhỏ.",
        "Ngươi mang trong mình Vạn Vật Chi Thai — năng lượng nguyên thủy của tạo hóa.",
        "Ba mươi sáu cảnh giới đều có thể thuộc về ngươi, ngươi là vô hạn.",
        "Ngươi có thể tu luyện tất cả các pháp môn, không có bất kỳ giới hạn nào.",
        "Đạo tâm ngươi là vô tâm — không ham muốn, không sợ hãi, chỉ có Đạo thuần túy.",

        // Group 5: Paradoxical existence (5)
        "Ngươi vừa tồn tại vừa không tồn tại, là nghịch lý sống trong thế giới hữu hạn.",
        "Ngươi không có quá khứ, không có tương lai — chỉ có hiện tại vô tận.",
        "Là kẻ đầu tiên tu thành chân tiên trong kiếp này — vạn cổ đệ nhất nhân.",
        "Ngươi chết đi vô số lần nhưng đều tái sinh mạnh hơn, không người nào hiểu được.",
        "Ngươi là cả hai bên của mọi sự đối lập: thiện và ác, sáng và tối, sống và chết."
    ]
};

const FATE_POOLS_EXTENDED = {
    // LOW RANK FATES (rank 0-2) - 25 variations
    low: [
        // Group 1: Hardship fates (5)
        "Mệnh bạc như sương, một khi tâm diệt thì đạo diệt.",
        "Trời không thương, nhưng lòng không phục — chỉ có nghịch thiên mới tồn.",
        "Đạo căn khiếm khuyết, song tâm bất khuất — lấy khổ làm thầy, lấy máu làm kinh.",
        "Số kiếp luân hồi, mãi mãi dưới chân người, trừ phi phá nhân quả mà thăng hoa.",
        "Mệnh như chanh chua, nhưng ngươi có quyết tâm sắt đá của thiết kiếm.",

        // Group 2: Persistence fates (5)
        "Kiếp trà tấm thân cầy cấy, tâm nguyện đổ vỡ, song ý chí chưa từng tắt.",
        "Đường đời chông gai, mỗi bước đều là vực thẳm, nhưng ngươi vẫn bước tiếp.",
        "Phúc bạc nhưng lộc không hề mỏng — ngươi được mệnh trời thử thách.",
        "Số phận nhiều sóng gió, nhưng ngươi là thuyền nhỏ không bao giờ chìm.",
        "Đạo lộ đầy tuyết lạnh, nhưng ngọn lửa trong lòng ngươi không bao giờ tắt.",

        // Group 3: Rebellion fates (5)
        "Nghịch thiên chi tử — kẻ được sinh ra để phá vỡ quy tắc của trời.",
        "Ngươi không tin vào số phận, ngươi tin vào nghị lực của chính mình.",
        "Mệnh trời định, ta không thèm — đó là khẩu khí của ngươi.",
        "Kẻ mà thiên địa muốn hủy diệt, ngươi lại càng phải sống sót.",
        "Số kiếp cô đơn, ngươi lại càng phải tỏa sáng giữa đêm tối.",

        // Group 4: Hidden potential fates (5)
        "Trong xương tủy có một tia thiên phú bị phong ấn, chờ ngày đại khai.",
        "Tuy phế linh căn, nhưng tâm hồn ngươi lại là Thái Ất chi tâm.",
        "Có một bí ẩn trong cơ thể ngươi mà chính ngươi cũng chưa khám phá.",
        "Ngươi là kẻ 'vô gia định', không số phận ràng buộc — đó là lợi thế.",
        "Đạo tâm ngươi tựa như gương sạch — không vật nào có thể làm đục được.",

        // Group 5: Endurance fates (5)
        "Sống sót qua mọi khổ nạn, đó là sứ mệnh của ngươi.",
        "Ngươi là loài cỏ dại, có thể mọc ở bất kỳ nơi nào, bất kỳ điều kiện nào.",
        "Mỗi lần ngã xuống, ngươi lại đứng dậy mạnh hơn — đó là bản chất của ngươi.",
        "Như cây tùng bị tuyết đè, ngươi cong nhưng không gãy.",
        "Kiếp người ngắn ngủi, ngươi phải sống gấp bội lần."
    ],

    // MID RANK FATES (rank 3-5) - 25 variations
    mid: [
        // Group 1: Unpredictable fates (5)
        "Mệnh gặp hung cát khó lường, phúc họa song hành.",
        "Đạo lộ quanh co, thiên cơ che giấu, chỉ khi ngươi kiên định mới thấy chân đạo.",
        "Thân mang một tia linh vận cổ xưa — tuy nhỏ, nhưng có thể bùng cháy thành thiên hỏa.",
        "Một khúc nhạc vận mệnh ngân vang, người nghe thấy sẽ đổi đời, kẻ bỏ lỡ sẽ mất đạo.",
        "Thiên ý khó dò, nhưng ngươi có thể đọc được một phần.",

        // Group 2: Hidden glory fates (5)
        "Trong xương tủy ngươi có một tia huyết mạch cổ nhân đang chờ thức tỉnh.",
        "Ngươi là người được cất giấu, đợi ngày đại khai cảnh.",
        "Có một vận mệnh ngầm đang đeo bám ngươi, không ai biết là gì.",
        "Ngươi mang trong mình một bí mật lớn lao — sẽ tự lộ ra khi đến lúc.",
        "Mỗi khi ngươi thoát chết, vận mệnh lại thay đổi một chút.",

        // Group 3: Determination fates (5)
        "Đạo tâm bình thường nhưng ý chí phi thường — đó là vũ khí của ngươi.",
        "Ngươi tin rằng trời cao nhất định có mắt, và ngươi sẽ khiến trời phải nhìn.",
        "Mỗi ngày ngươi đều tiến bộ, dù chỉ một bước nhỏ — tích lũy thành đại đạo.",
        "Không có thiên phú, ngươi có thể thay thế bằng nỗ lực gấp trăm.",
        "Ngươi là người đi sau nhưng đến trước — bởi ngươi không bao giờ dừng lại.",

        // Group 4: Fate twists (5)
        "Thiên cơ đã định, nhưng ngươi có thể viết lại một phần.",
        "Phần thưởng và hiểm nguy cân bằng — ngươi phải chọn cẩn thận.",
        "Vận mệnh ngươi như dòng sông, có thể đổi hướng nếu có đủ nghị lực.",
        "Mỗi quyết định của ngươi đều mở ra một nhánh tương lai khác.",
        "Ngươi không thuộc về định mệnh nào — ngươi tự tạo định mệnh cho mình.",

        // Group 5: Spiritual fates (5)
        "Tâm linh ngươi thuần khiết, có thể cảm nhận được lời sách thánh.",
        "Ngươi như tờ giấy trắng — trống không, nhưng có thể vẽ lên bất kỳ hình gì.",
        "Trực giác của ngươi nhạy bén hơn người thường — đó là ơn trời.",
        "Ngươi có duyên với cổ văn, có thể đọc được những kinh văn cổ.",
        "Giấc mơ của ngươi thường là điềm báo — ngươi không biết đó là vinh hay họa."
    ],

    // HIGH RANK FATES (rank 6-8) - 25 variations
    high: [
        // Group 1:天命所归 (Destined) (5)
        "Thân mang thiên mệnh dị thường — nơi ngươi đi qua, đạo vận xoay chuyển.",
        "Thiên địa chú mục, linh cơ bất diệt, đạo ngươi là con đường chưa từng tồn tại.",
        "Là người mà trời muốn diệt, nhưng đạo lại bảo hộ — một thân nghịch số, một chí nghịch thiên.",
        "Một tia linh quang của Cổ Tiên lưu lại, ngươi chính là mảnh tàn của giấc mộng vạn cổ.",
        "Ngươi là kẻ được chọn, dù ngươi không hề hay biết.",

        // Group 2: Great responsibility fates (5)
        "Sứ mệnh lớn lao đang chờ ngươi — ngươi sẽ thay đổi vận mệnh thiên hạ.",
        "Ngươi mang trong mình gánh nặng của cả một thế hệ.",
        "Đại cục đang trong nguy, ngươi là người có thể cứu vãn.",
        "Thiên hạ đại loạn, ngươi là kẻ có thể định thiên hạ.",
        "Ngươi sẽ gặp được đại duyên, đại kế, đại nạn — và phải vượt qua tất cả.",

        // Group 3: Power fates (5)
        "Lực lượng khổng lồ đang спит trong cơ thể ngươi, chờ một ngày phát tích.",
        "Ngươi có thể đạt đến cảnh giới mà người thường chỉ mơ ước.",
        "Tu vi ngươi sẽ tăng theo cấp số nhân — không ai có thể đoán trước.",
        "Ngươi được sinh ra để thống trị, không phải để phục vụ.",
        "Thiên phú của ngươi là độc nhất — không ai có thể sánh bằng.",

        // Group 4: Lonely peaks (5)
        "Đỉnh cao cô đơn — ngươi sẽ đứng trên đỉnh núi cao nhất, nhưng không có ai bên cạnh.",
        "Đạo lộ của ngươi cô lập, nhưng ngươi không sợ hãi.",
        "Ngươi phải từ bỏ nhiều thứ để đạt được Đạo cao hơn.",
        "Càng lên cao, càng ít người hiểu ngươi — đó là cô đơn của kẻ muốn thành đạo.",
        "Ngươi là thiên tài, nhưng thiên tài thường sống ngắn.",

        // Group 5: Transcendence fates (5)
        "Ngươi không tu theo con đường người khác — ngươi tự tạo ra con đường của mình.",
        "Đạo của ngươi vượt ra ngoài vũ trụ — ngươi không bị ràng buộc bởi bất kỳ quy luật nào.",
        "Ngươi có thể nhìn thấy bản chất thực của vạn vật — đó là trực giác siêu việt.",
        "Từ khi sinh ra, ngươi đã khác — và sẽ mãi khác.",
        "Ngươi không phải người thường, và sớm muộn thiên địa cũng sẽ nhận ra."
    ],

    // CHAOS/SUPREME FATES (rank 9+) - 25 variations
    chaos: [
        // Group 1: Ultimate fates (5)
        "Không có thiên mệnh, ngươi chính là thiên mệnh.",
        "Trên đầu ba hoa tụ đỉnh, dưới chân chín long cuộn đất — vạn đạo quỳ phục.",
        "Ngươi sinh ra để chứng minh rằng Đại Đạo không có giới hạn.",
        "Thiên đạo không dung, địa đạo không chở — chỉ có ngươi tự lập nên một con đường mới.",
        "Ngươi là nghịch lý — sống mà không sống, tồn tại mà không tồn tại.",

        // Group 2: Cosmic responsibility fates (5)
        "Vũ trụ đang chờ ngươi cứu rỗi — ngươi là đấng cứu thế.",
        "Ngươi là người cuối cùng của một chuỗi luân hồi vô tận.",
        "Thiên địa sẽ kết thúc vào một ngày nào đó, và ngươi sẽ quyết định số phận đó.",
        "Ngươi là người giữ cân bằng giữa sáng thế và hủy diệt.",
        "Vạn vật đều là một phần của ngươi, ngươi là một phần của vạn vật.",

        // Group 3: Paradoxical existence fates (5)
        "Ngươi vừa là người sáng tạo vũ trụ, vừa là sáng tạo đang diễn ra.",
        "Ngươi không sinh ra — ngươi tự tồn tại, không có nguyên nhân.",
        "Ngươi sẽ sống mãi mãi, và cũng sẽ chết đi ngay lập tức.",
        "Tương lai và quá khứ của ngươi đều là trạng thái hiện tại.",
        "Ngươi là kẻ duy nhất có thể phá vỡ quy luật của chính vũ trụ.",

        // Group 4: Transcendent purpose fates (5)
        "Mục đích của ngươi là không có mục đích — đó là tự do tuyệt đối.",
        "Ngươi tồn tại để chứng minh rằng tồn tại không cần lý do.",
        "Đạo của ngươi là không có Đạo — ngươi là Đạo itu.",
        "Ngươi sẽ hòa vào hư không, nhưng cũng sẽ xuất hiện từ hư không.",
        "Ngươi là điểm bắt đầu và kết thúc của mọi thứ.",

        // Group 5: Absolute fates (5)
        "Ngươi là tuyệt đối — không đối lập, không so sánh, không giới hạn.",
        "Tất cả mọi con đường đều dẫn đến ngươi, và từ ngươi đi khắp mọi nơi.",
        "Ngươi là cả thực tại lẫn ảo tưởng, và cả hai đều thuộc về ngươi.",
        "Khi ngươi nhận ra ngươi là ai, vũ trụ sẽ run rẩy.",
        "Ngươi là bí ẩn lớn nhất — ngay cả ngươi cũng không thể hiểu hết được."
    ]
};

// ==================== ELEMENT-BASED MIDDLE SCENES ====================
// ==================== ELEMENT-BASED MIDDLE SCENES ====================
// Structure: ELEMENT_MIDDLE_SCENES[element][rankTier]
// Each element has 4 tier-specific scenes: low, mid, high, supreme
const ELEMENT_MIDDLE_SCENES = {
    'Kim': {
        low: [
            {
                id: 1,
                lines: [
                    "📜 【KIM ĐAO SƠ KHởi】📜",
                    "   Một thanh kiếm nhỏ từ đan điền ngươi dần hình thành, sắc bén!",
                    "   Kim nguyên chi lực bắt đầu tuôn trào, dù còn yếu ớt...",
                    "   Từ nay, ngươi sẽ tôi luyện thanh kiếm này trong muôn vàn trận chiến!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "📜 【KIM ĐAO PHÁ THIÊN】📜",
                    "   Sắt đao bạc giáp chém gió trong hư không, ngươi đứng giữa một cánh đồng kiếm!",
                    "   Kim nguyên chi lực tuôn trào trong huyết mạch, mỗi đường kiếm đều sắc bén!",
                    "   Từ nay, ngươi là Kẻ Sống Sót - ai không sắc sẽ bị cắt!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "📜 【KIM KHÍ LƯU XUẤT】📜",
                    "   Những dải lụa vàng quấn quanh thân ngươi, ánh sáng kim khí chiếu rọi!",
                    "   Mỗi thanh kiếm đều là một ý chí - sắt ben như thép!",
                    "   Kim căn của ngươi như thanh kiếm mới rèn - cần được tôi luyện trong chiến đấu!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "📜 【THIÊN BINH TƯỢNG HÌNH】📜",
                    "   Ngàn vạn thanh kiếm xoay quanh thân, như đang bảo vệ ngươi!",
                    "   Ngươi là Đao Kiếm Chi Tử - sắc bén vô cùng!",
                    "   Kim linh trong ngươi đang thức tỉnh, đòi được ra trận!"
                ]
            }
        ]
    },
    'Mộc': {
        low: [
            {
                id: 1,
                lines: [
                    "📜 【THANH MỘC TIỂU SINH】📜",
                    "   Những nhánh cây nhỏ đâm chồi từ đan điền, mỏng manh nhưng kiên cường!",
                    "   Mộc nguyên chi lực bắt đầu tuôn trào, như nhựa cây non...",
                    "   Ngươi học cách hòa vào thiên nhiên - từ tốt sinh trưởng!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "📜 【THANH MỘC THỤ SINH】📜",
                    "   Cây cối đâm chồi nảy lộc quanh ngươi, sinh mệnh tuôn trào!",
                    "   Rễ cây từ đất trời đâm sâu vào thân ngươi, hút linh khí!",
                    "   Mộc linh trong ngươi đang hòa vào thiên nhiên - sáng tạo, sinh trưởng!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "📜 【CỎ LÁ XANH TƯƠI】📜",
                    "   Những sợi cỏ xanh phủ kín mặt đất, hơi thở của mùa xuân!",
                    "   Ngươi cảm nhận được nhựa sống đang tuôn chảy trong huyết mạch!",
                    "   Mỗi ngọn cỏ đều mang một ý nghĩa - sinh mệnh bất diệt!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "📜 【ĐẠI THỤ TRƯỜNG SINH】📜",
                    "   Ngươi đứng dưới gốc cây cổ thụ ngàn năm, rễ cây đâm sâu vào lòng đất...",
                    "   Từng vòng năm trong thân cây như những bản ghi về lịch sử vạn cổ...",
                    "   Mộc linh trong ngươi như đại thụ - che chở muôn loài, sống mãi với thời gian!"
                ]
            }
        ]
    },
    'Thủy': {
        low: [
            {
                id: 1,
                lines: [
                    "📜 【THUỶ TRIỀU TIỂU KHởi】📜",
                    "   Một dòng suối nhỏ từ đan điền hình thành, trong veo và mát mẻ!",
                    "   Thủy nguyên chi lực bắt đầu tuôn chảy, dù còn ít ỏi...",
                    "   Ngươi cảm nhận được hơi nước mát lành đang thấm vào huyết mạch!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "📜 【THUỶ TRIỀU DÂNG TRÀO】📜",
                    "   Dòng nước từ đan điền tuôn ra như thác đổ, ngươi đứng giữa biển nước...",
                    "   Sóng biển vỗ vào chân, mang theo linh khí từ đại dương vô tận...",
                    "   Thủy căn của ngươi như sông Mê Mông - cuồn cuộn, không ngừng!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "📜 【SÔNG BẠC CHẢY】📜",
                    "   Những dòng sông bạc chảy qua thân thể ngươi, tẩy sạch mọi tạp chất...",
                    "   Ngươi hòa mình vào dòng nước trong vắt, trở thành một phần của thủy vận!",
                    "   Mỗi con sóng đều mang theo lời thì thầm của biển cả..."
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "📜 【LINH MẠCH THUỶ ĐẠO】📜",
                    "   Ngươi đứng bên bờ một dòng sông ánh sáng, nơi dòng nước là linh khí ngưng tụ...",
                    "   Từng giọt linh dịch rơi xuống, thấm vào thân thể ngươi như mưa xuân...",
                    "   Thủy Đạo của ngươi như đại dương - bao la, sâu thẳm, vô tận!"
                ]
            }
        ]
    },
    'Hỏa': {
        low: [
            {
                id: 1,
                lines: [
                    "📜 【HỎA DIỄM TIỂU NHI】📜",
                    "   Ngọn lửa nhỏ từ đan điền bắt đầu bùng cháy, leo lói nhưng kiên trì!",
                    "   Hỏa nguyên chi lực yếu ớt như ngọn nến, nhưng không bao giờ tắt...",
                    "   Ngươi cảm nhận được hơi ấm đầu tiên của ngọn lửa bên trong!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "📜 【HỎA DIỄM THIÊU ĐỐT】📜",
                    "   Ngọn lửa từ đan điền bùng cháy, thiêu đốt mọi tạp chất trong thân...",
                    "   Ngươi đứng giữa biển lửa mà không bị phỏng, như được Hỏa thần bảo hộ...",
                    "   Hỏa căn trong ngươi nóng cháy hơn mặt trời - hủy diệt và sáng tạo!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "📜 【TÂM HỎA NỘI SÂU】📜",
                    "   Trong lòng ngươi như có một ngọn núi lửa đang phun trào...",
                    "   Ngọn lửa bên trong thiêu đốt kẻ thù, bảo vệ ngươi khắp nơi...",
                    "   Ngươi cảm nhận được nhiệt năng đang xuyên qua mỗi tế bào..."
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "📜 【HỎA LONG PHƯỢNG CHỦ】📜",
                    "   Rồng lửa và phượng hoàng cùng xuất hiện từ đan điền ngươi!",
                    "   Ngọn lửa thiêu đốt cả thiên địa, ngươi là hỏa chi chủ!",
                    "   Hỏa Đạo của ngươi như mặt trời - thiêu đốt vạn vật, soi sáng càn khôn!"
                ]
            }
        ]
    },
    'Thổ': {
        low: [
            {
                id: 1,
                lines: [
                    "📜 【THỔ KHÍ KHỞI NGUYÊN】📜",
                    "   Một hạt đất nhỏ từ đan điền lan ra, nặng nề nhưng vững chắc!",
                    "   Thổ nguyên chi lực bắt đầu hình thành, như mầm mống từ đất mẹ...",
                    "   Ngươi đặt tay lên đất, cảm nhận nhịp đập của đại địa nơi ngươi đứng!"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "📜 【THỔ KHÍ BỐC LÊN】📜",
                    "   Mặt đất dưới chân ngươi rung chuyển, đất đai phóng thích linh khí...",
                    "   Ngươi đặt tay lên đất, cảm nhận được nhịp đập của đại địa mẹ...",
                    "   Thổ căn của ngươi nặng nề mà vững chắc - nền tảng của vạn vật!"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "📜 【ĐẠI ĐỊA CHỮA LÀNH】📜",
                    "   Đất đai dưới chân ngươi rực rỡ một màu vàng óng ánh...",
                    "   Ngươi cảm nhận được sức sống của muôn loài đang từ đất mà sinh ra!",
                    "   Thổ linh trong ngươi như đất mẹ - nuôi dưỡng, che chở, sinh vạn vật!"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "📜 【CỔ THỤ NGÀN NĂM CHỦ】📜",
                    "   Ngươi đứng dưới gốc cây cổ thụ ngàn năm, rễ cây đâm sâu vào lòng đất...",
                    "   Từng vòng năm trong thân cây như những bản ghi về lịch sử vạn cổ...",
                    "   Thổ Đạo của ngươi như đại địa - che chở muôn vật, vững như núi non!"
                ]
            }
        ]
    }
};

// Rank-based middle scenes (for multi-element spirit roots)
const RANK_MIDDLE_SCENES = {
    low: [
        {
            id: 1,
            lines: [
                "📜 【PHÀM NHÂN TU ĐẠO】📜",
                "   Một thế giới tu tiên đầy huyền bí và nguy hiểm, ngươi đứng giữa muôn vàn khó khăn...",
                "   Linh căn yếu ớt khiến con đường thêm chông gai, nhưng ngươi không lùi bước!",
                "   Đạo tâm là ánh sáng dẫn lối - dù yếu ớt vẫn hướng về tiên đạo!"
            ]
        },
        {
            id: 2,
            lines: [
                "📜 【NGHỊCH THIÊN CHI TÂM】📜",
                "   Trời không cho ngươi tài năng, ngươi sẽ tự tạo ra!",
                "   Đất không cho ngươi cơ duyên, ngươi sẽ tự tìm kiếm!",
                "   Ngươi không tin vào số phận - ngươi tin vào nghị lực của chính mình!"
            ]
        },
        {
            id: 3,
            lines: [
                "📜 【ĐẠO LỘ CHÔNG GAI】📜",
                "   Con đường tu tiên mịt mờ như sương khói, nhưng ngươi vẫn bước tiếp...",
                "   Người đi trước để lại tro tàn, kẻ đi sau vẫn cứ bước đi...",
                "   Ngươi cũng vậy, dù biết có thể mãi mãi không đến được đích!"
            ]
        }
    ],
    mid: [
        {
            id: 1,
            lines: [
                "📜 【TU ĐẠO CHÍNH QUAN】📜",
                "   Cửu Châu bát hoang, tu tiên là con đường ngược đời, nhưng ngươi đã chọn nó!",
                "   Trời cao đất dày, kẻ có ý chí sẽ vượt lên trên tất cả!",
                "   Ngươi bước vào con đường này với quyết tâm vững chắc!"
            ]
        },
        {
            id: 2,
            lines: [
                "📜 【THIÊN PHÚ DẦN HIỆN】📜",
                "   Linh căn của ngươi đang tỏa sáng, tiềm năng được đánh thức!",
                "   Ngươi cảm nhận được một luồng năng lượng dâng trào trong đan điền!",
                "   Mỗi ngày tu luyện, ngươi đều thấy tiến bộ rõ rệt!"
            ]
        },
        {
            id: 3,
            lines: [
                "📜 【VẠN CỔ TU ĐẠO】📜",
                "   Từ thuở hồng hoang đến nay, bao anh hùng đã ngã xuống...",
                "   Bao thiên tài đều hóa cốt bụi, chỉ có Đạo còn trường tồn!",
                "   Ngươi mang trong mình ngọn lửa đam mê, bước tiếp con đường vô tận!"
            ]
        }
    ],
    high: [
        {
            id: 1,
            lines: [
                "📜 【THIÊN TÀI XUẤT HIỆN】📜",
                "   Linh căn của ngươi thuộc hàng hiếm có trong thiên hạ!",
                "   Thiên địa đều cảm nhận được sự xuất hiện của một thiên tài!",
                "   Mọi người đều ngước nhìn và kính sợ trước linh căn của ngươi!"
            ]
        },
        {
            id: 2,
            lines: [
                "📜 【THÁNH LINH QUANG THỂ】📜",
                "   Ánh sáng thánh linh từ đan điền ngươi tỏa ra khắp nơi!",
                "   Ngươi mang trong mình một linh căn thuộc hàng thánh cấp!",
                "   Thiên đạo đã ghi tên ngươi vào sổ thánh nhân từ khi sinh ra!"
            ]
        },
        {
            id: 3,
            lines: [
                "📜 【ĐẠO CƠ VIÊN MÃN】📜",
                "   Trong thế giới này, linh khí là thước đo mọi sức mạnh, và ngươi đang dẫn đầu!",
                "   Ngươi không còn là kẻ yếu - ngươi là người mạnh nhất trong thế hệ trẻ!",
                "   Hãy để thiên địa thấy rằng ngươi xứng đáng!"
            ]
        }
    ],
    supreme: [
        {
            id: 1,
            lines: [
                "📜 【HỖN NGUYÊN CHÍ TÔN】📜",
                "   Trong đan điền ngươi, ngũ hành đang giao hòa và ngưng tụ!",
                "   Ngươi là kết tinh của thiên địa - một tồn tại không thuộc luân hồi!",
                "   Đế vận đã được ghi vào càn khôn, ngươi là chủ nhân của vạn vật!"
            ]
        },
        {
            id: 2,
            lines: [
                "📜 【ĐẠI THỪA VÔ THƯỢNG】📜",
                "   Linh căn của ngươi là đỉnh cao của vạn cổ - không ai sánh bằng!",
                "   Ngũ hành trong ngươi hòa làm một, tạo thành một thế giới thu nhỏ!",
                "   Ngươi có thể sáng tạo và hủy diệt chỉ bằng một ý niệm!"
            ]
        },
        {
            id: 3,
            lines: [
                "📜 【TIÊN THIÊN ĐẠI ĐẠO】📜",
                "   Ngươi sinh ra đã mang trong mình đạo căn viên mãn!",
                "   Thiên địa như được dựng lên chỉ để phục vụ ngươi!",
                "   Ngươi có thể cảm nhận được ý muốn của trời đất!"
            ]
        },
        {
            id: 4,
            lines: [
                "📜 【ĐẾ VẬN THỤC MỆNH】📜",
                "   Ngũ hành ngưng tụ, đế vận thục mệnh!",
                "   Ngươi là kết tinh của vạn cổ - một tồn tại vô song!",
                "   Mọi thiên tài trong thiên hạ đều phải ngước nhìn ngươi!"
            ]
        }
    ]
};

// Default/fallback middle scenes
const DEFAULT_MIDDLE_SCENES = [
    {
        id: 1,
        lines: [
            "📜 【TU TIÊN HỒNG HOANG CHI GIỚI】📜",
            "   Một thế giới tu tiên đầy huyền bí và nguy hiểm,",
            "   Nơi cảnh giới phân chia thiên hạ, linh căn quyết định số phận,",
            "   Đạo tâm là ánh sáng dẫn lối, tu vi là ngọn cờ chinh phục."
        ]
    },
    {
        id: 2,
        lines: [
            "📜 【THIÊN ĐỊA CHUYỂN DỊCH】📜",
            "   Cửu Châu bát hoang, tu tiên là con đường ngược đời,",
            "   Trời cao đất dày, kẻ có ý chí sẽ vượt lên trên tất cả,",
            "   Ngươi bước vào con đường này, dù biết trước bao gian nan."
        ]
    },
    {
        id: 3,
        lines: [
            "📜 【VẠN CỔ TU ĐẠO】📜",
            "   Từ thuở hồng hoang đến nay, bao anh hùng đã ngã xuống,",
            "   Bao thiên tài đều hóa cốt bụi, chỉ có Đạo còn trường tồn,",
            "   Ngươi mang trong mình ngọn lửa đam mê, bước tiếp con đường vô tận."
        ]
    }
];

// ==================== ELEMENT-BASED ENDING SCENES ====================
// Structure: ELEMENT_ENDING_SCENES[element][rankTier]
// Each element has 4 tier-specific endings: low, mid, high, supreme
const ELEMENT_ENDING_SCENES = {
    'Kim': {
        low: [
            {
                id: 1,
                lines: [
                    "💠 Kim linh trong ngươi đã thức tỉnh, ${state.name} bước vào đạo lộ tu hành... 💠",
                    "Từ giây phút này, ngươi là Sắt Ben Kiếm - sắc bén là sống, yếu ớt là chết!",
                    "⚔️ Thiên địa tịch mịch — Kim Đạo khai mở! ⚔️"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "🌟 Kim khí quanh ngươi như dải lụa vàng, ${state.name} là Đao Kiếm Chi Tử! 🌟",
                    "Mỗi đường kiếm đều là một ý chí - sắt ben như thép, không gì có thể cản!",
                    "✨ Đạo lộ vô tận, ngươi hãy tiến bước! ✨"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "💎 Kim căn của ngươi như thanh kiếm mới rèn - cần được tôi luyện trong chiến đấu! 💎",
                    "${state.name} từ giờ sẽ bước trên con đường tu tiên đầy gian khổ!",
                    "🔥 Hãy để thiên địa thấy rằng ngươi xứng đáng! 🔥"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "👑 Kim Đạo Đại Vương - ${state.name} là Đế vương của muôn kiếm! 👑",
                    "Ngàn kiếm quỳ phục, kim khí ngưng tụ thành vương miện!",
                    "⚔️ Từ nay, thiên hạ đều phải quỳ trước thanh kiếm của ngươi! ⚔️"
                ]
            }
        ]
    },
    'Mộc': {
        low: [
            {
                id: 1,
                lines: [
                    "💠 Mộc linh trong ngươi đã thức tỉnh, ${state.name} bước vào đạo lộ tu hành... 💠",
                    "Từ giây phút này, ngươi là Thanh Mộc Chi Tử - sinh mệnh bất diệt!",
                    "🌿 Thiên địa tịch mịch — Mộc Đạo khai mở! 🌿"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "🌱 Nhựa sống tuôn chảy trong huyết mạch, ${state.name} là Thụ Sinh Chi Tử! 🌱",
                    "Ngươi như cây cối đâm chồi nảy lộc - sinh trưởng không ngừng!",
                    "✨ Đạo lộ vô tận, ngươi hãy tiến bước! ✨"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "🌳 Mộc căn của ngươi như đại thụ - vững chắc, sâu rễ, che chở muôn loài! 🌳",
                    "${state.name} từ giờ sẽ bước trên con đường tu tiên đầy gian khổ!",
                    "🍃 Từ một hạt giống nhỏ bé, ngươi sẽ trở thành đại thụ che trời! 🍃"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "🌲 Mộc Đạo Thường Sinh - ${state.name} là Đạo của sự sống! 🌲",
                    "Vạn vật đều sinh từ ngươi, rừng rậm phục tùng ngươi!",
                    "🌿 Từ nay, ngươi chính là Thường Sinh Đạo - sống mãi không bao giờ tàn! 🌿"
                ]
            }
        ]
    },
    'Thủy': {
        low: [
            {
                id: 1,
                lines: [
                    "💠 Thủy linh trong ngươi đã thức tỉnh, ${state.name} bước vào đạo lộ tu hành... 💠",
                    "Từ giây phút này, ngươi là Thủy Long Chi Tử - cuồn cuộn, không ngừng!",
                    "🌊 Thiên địa tịch mịch — Thủy Đạo khai mở! 🌊"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "💧 Dòng nước trong cơ thể ngươi như sông Mê Mông - sâu không đáy! 💧",
                    "${state.name} là Thuỷ Triều Chi Tử - mãnh liệt và không ngừng nghỉ!",
                    "✨ Đạo lộ vô tận, ngươi hãy tiến bước! ✨"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "🌊 Thủy căn của ngươi như đại dương - bao la, sâu thẳm, vô tận! 🌊",
                    "${state.name} từ giờ sẽ bước trên con đường tu tiên đầy gian khổ!",
                    "💫 Hãy để thiên địa thấy rằng ngươi xứng đáng! 💫"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "🐉 Thủy Đạo Vô Cùng - ${state.name} là đại dương không bờ! 🐉",
                    "Tất cả đều chảy về ngươi, ngươi là Thủy Long Chủ!",
                    "🌌 Từ nay, ngươi chính là Thủy Đạo - vô cùng, vô tận, vĩnh hằng! 🌌"
                ]
            }
        ]
    },
    'Hỏa': {
        low: [
            {
                id: 1,
                lines: [
                    "💠 Hỏa linh trong ngươi đã thức tỉnh, ${state.name} bước vào đạo lộ tu hành... 💠",
                    "Từ giây phút này, ngươi là Hỏa Diễm Chi Tử - nóng cháy hơn mặt trời!",
                    "🔥 Thiên địa tịch mịch — Hỏa Đạo khai mở! 🔥",
                    "🎴 Pháp bảo đang sở hữu: ${phapBaoList}"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "🌋 Ngọn lửa trong đan điền bùng cháy, ${state.name} là Hỏa Long Chi Tử! 🌋",
                    "Ngươi như ngọn lửa trong bóng tối - dù yếu vẫn không tắt!",
                    "✨ Đạo lộ vô tận, ngươi hãy tiến bước! ✨"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "🔥 Hỏa căn của ngươi như lò thiêu - đốt người ngã, luyện người thành tiên! 🔥",
                    "${state.name} từ giờ sẽ bước trên con đường tu tiên đầy gian khổ!",
                    "💫 Hãy để thiên địa thấy rằng ngươi xứng đáng! 💫"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "☀️ Hỏa Đạo Viêm Dương - ${state.name} là mặt trời không bao giờ tắt! ☀️",
                    "Hỏa nguyên chi lực của ngươi có thể thiêu đốt cả càn khôn!",
                    "🔥 Từ nay, ngươi chính là Viêm Dương Đạo - thiêu đốt tất cả, soi sáng vạn gian! 🔥"
                ]
            }
        ]
    },
    'Thổ': {
        low: [
            {
                id: 1,
                lines: [
                    "💠 Thổ linh trong ngươi đã thức tỉnh, ${state.name} bước vào đạo lộ tu hành... 💠",
                    "Từ giây phút này, ngươi là Thổ Các Chi Tử - vững chắc như núi non!",
                    "🏔️ Thiên địa tịch mịch — Thổ Đạo khai mở! 🏔️"
                ]
            }
        ],
        mid: [
            {
                id: 1,
                lines: [
                    "🌾 Đất đai dưới chân ngươi rực rỡ một màu vàng óng ánh! 🌾",
                    "${state.name} là Đại Địa Chi Tử - nuôi dưỡng vạn vật, che chở muôn loài!",
                    "✨ Đạo lộ vô tận, ngươi hãy tiến bước! ✨"
                ]
            }
        ],
        high: [
            {
                id: 1,
                lines: [
                    "🏔️ Thổ căn của ngươi như đất mẹ - nền tảng vững chắc cho mọi sinh mệnh! 🏔️",
                    "${state.name} từ giờ sẽ bước trên con đường tu tiên đầy gian khổ!",
                    "💫 Hãy để thiên địa thấy rằng ngươi xứng đáng! 💫"
                ]
            }
        ],
        supreme: [
            {
                id: 1,
                lines: [
                    "🌍 Thổ Đạo Càn Khôn - ${state.name} là nền tảng của vạn vật! 🌍",
                    "Đại địa phục tùng, núi non cúi đầu, tất cả đều từ ngươi mà ra!",
                    "🏔️ Từ nay, ngươi chính là Thổ Đạo Càn Khôn - vạn vật đều sinh từ ngươi! 🏔️"
                ]
            }
        ]
    }
};

// Rank-based ending scenes (for multi-element spirit roots)
const RANK_ENDING_SCENES = {
    low: [
        {
            id: 1,
            lines: [
                "💠 Linh căn và phẩm chất đã định, ${state.name} bước vào đạo lộ tu hành... 💠",
                "Từ giây phút này, từng hơi thở đều hòa cùng thiên địa, từng bước đi đều khắc lên vận mệnh!",
                "✨ Thiên địa tịch mịch — Đạo lộ khai mở! ✨"
            ]
        },
        {
            id: 2,
            lines: [
                "⚡ Dù yếu ớt, ${state.name} vẫn quyết tâm vươn lên! ⚡",
                "Ngươi là Phàm Nhân Nghịch Khởi - không ai có thể ngăn cản ý chí của ngươi!",
                "💪 Đạo lộ vô tận, ngươi hãy tiến bước! 💪"
            ]
        },
        {
            id: 3,
            lines: [
                "🍂 ${state.name} mang trong mình ngọn lửa không bao giờ tắt! 🍂",
                "Dù là cỏ cây bé nhỏ, ngươi vẫn hướng về mặt trời!",
                "🌟 Từ bùn lầy, ngươi sẽ vươn lên tầng cao nhất của thiên địa! 🌟"
            ]
        }
    ],
    mid: [
        {
            id: 1,
            lines: [
                "🌟 Từ hôm nay, ${state.name} sẽ viết nên câu chuyện của chính mình! 🌟",
                "Dù số phận có định, nhưng ý chí của ngươi sẽ là ánh sáng soi đường!",
                "⚔️ Đạo lộ vô tận, ngươi hãy tiến bước! ⚔️"
            ]
        },
        {
            id: 2,
            lines: [
                "📿 Linh căn đã hiển lộ, vận mệnh đã được mở! 📿",
                "${state.name} từ giờ sẽ bước trên con đường tu tiên đầy gian khổ!",
                "✨ Thiên phú của ngươi không giới hạn - chỉ cần thời gian để bung trổ! ✨"
            ]
        },
        {
            id: 3,
            lines: [
                "🌈 ${state.name} đứng trước vô số khả năng, mỗi bước đi đều là lịch sử! 🌈",
                "Hành trình tu đạo chính thức bắt đầu!",
                "💫 Hãy nắm lấy cơ hội này và tiến bước! 💫"
            ]
        }
    ],
    high: [
        {
            id: 1,
            lines: [
                "⭐ ${state.name} là Thiên Tài Xuất Hiện - đất trời chú mục! ⭐",
                "Mọi người đều ngước nhìn và kính sợ trước linh căn của ngươi!",
                "🌟 Đạo lộ vô tận, ngươi hãy tiến bước! 🌟"
            ]
        },
        {
            id: 2,
            lines: [
                "🌟 Thánh linh quang thể - ${state.name} mang trong mình ánh sáng thánh cấp! 🌟",
                "Thiên đạo đã ghi tên ngươi vào sổ thánh nhân từ khi sinh ra!",
                "✨ Tương lai của ngươi sáng như nhật nguyệt - vô cùng huy hoàng! ✨"
            ]
        },
        {
            id: 3,
            lines: [
                "👑 ${state.name} là ngôi sao đang tỏa sáng trên bầu trời tu tiên! 👑",
                "Từ nay, ngươi không còn là kẻ thường - ngươi là người được trời chọn!",
                "🏆 Hãy để thiên địa thấy rằng ngươi xứng đáng! 🏆"
            ]
        }
    ],
    supreme: [
        {
            id: 1,
            lines: [
                "🌌 Hỗn Nguyên Chí Tôn - ${state.name} là Đấng Sáng Thế! 🌌",
                "Ngươi là kết tinh của thiên địa - một tồn tại không thuộc luân hồi!",
                "⚡ Đế vận đã được ghi vào càn khôn - ngươi là chủ nhân của vạn vật! ⚡"
            ]
        },
        {
            id: 2,
            lines: [
                "🏆 ${state.name} là Vô Thượng - không có gì có thể sánh được! 🏆",
                "Ngươi có thể sáng tạo và hủy diệt chỉ bằng một ý niệm!",
                "💫 Từ nay, ngươi chính là Đạo - ngươi là hiện thân của thiên địa! 💫"
            ]
        },
        {
            id: 3,
            lines: [
                "💫 Tiên Thiên Đại Đạo - ${state.name} mang trong mình đạo căn viên mãn! 💫",
                "Thiên địa như được dựng lên chỉ để phục vụ ngươi!",
                "🌟 Ngươi là kẻ được chọn - ngươi là định mệnh! 🌟"
            ]
        },
        {
            id: 4,
            lines: [
                "🌟 Đế Vận Thục Mệnh - ${state.name} là kết tinh của vạn cổ! 🌟",
                "Mọi thiên tài trong thiên hạ đều phải ngước nhìn ngươi!",
                "✨ Ngươi chính là người được trời chọn - ngươi là định mệnh! ✨"
            ]
        }
    ]
};

// Default/fallback ending scenes
const DEFAULT_ENDING_SCENES = [
    {
        id: 1,
        lines: [
            "💠 Linh căn và phẩm chất đã định, ${state.name} bước vào đạo lộ tu hành... 💠",
            "Từ giây phút này, từng hơi thở đều hòa cùng thiên địa, từng bước đi đều khắc lên vận mệnh!",
            "✨ Thiên địa tịch mịch — Đạo lộ khai mở! ✨"
        ]
    },
    {
        id: 2,
        lines: [
            "🌟 Từ hôm nay, ${state.name} sẽ viết nên câu chuyện của chính mình! 🌟",
            "Dù số phận có định, nhưng ý chí của ngươi sẽ là ánh sáng soi đường!",
            "⚔️ Đạo lộ vô tận, ngươi hãy tiến bước! ⚔️"
        ]
    },
    {
        id: 3,
        lines: [
            "💫 Vận mệnh không còn là bí ẩn, nó đang trở thành hiện thực! 💫",
            "${state.name} mang theo linh căn và ý chí, bước vào thế giới tu tiên!",
            "🔥 Hãy để thiên địa thấy rằng ngươi xứng đáng! 🔥"
        ]
    }
];

// 🆕 RANDOM START GAME STORIES - These appear at game start instead of fixed "Thiên Cơ Chuyển Động"
// Stories are now organized by element and rank for thematic relevance

// Element-specific stories (single element spirit roots get these unique stories)
const ELEMENT_STORIES = {
    'Kim': [
        {
            title: "Kim Linh Xuất Thế",
            lines: [
                "⚔️ 【Kim Linh Xuất Thế】 — Sắt đao bạc giáp, thiên binh tượng hình! ⚔️",
                "Từng thanh kiếm ánh kim chiếu rọi khắp nơi, ngươi đứng giữa một rừng kiếm!",
                "Mỗi thanh kiếm đều tỏa ra khí thế sắc bén, như muốn chém đứt thiên đạo!",
                "Kim nguyên chi lực trong cơ thể ngươi như được khóa mở!",
                "Ngươi là kẻ được Kim linh bảo hộ - sắc bén vô cùng!"
            ]
        },
        {
            title: "Bạch Kim Chiến Giới",
            lines: [
                "🗡️ 【Bạch Kim Chiến Giới】 — Trọng kiếm xuất thế, thiên hạ vận hành! 🗡️",
                "Một thanh trọng kiếm từ trời cao rơi xuống, tiếng kim loại vang vọng khắp cửu thiên!",
                "Ngươi cảm nhận được sức mạnh của kim loại quý hiếm trong huyết mạch!",
                "Từng đợt kim khí tụ hội, hóa thành lưỡi kiếm vĩ đại!",
                "Đạo của ngươi là chém và phá - kim chiến, kim thắng!"
            ]
        }
    ],
    'Mộc': [
        {
            title: "Mộc Linh Thụ Sinh",
            lines: [
                "🌳 【Mộc Linh Thụ Sinh】 — Cây cối đâm chồi, sinh mệnh tuôn trào! 🌳",
                "Rễ cây từ đất trời đâm sâu vào thân ngươi, hút linh khí!",
                "Từng nhánh lá xòe ra, tạo thành một tán che chở vô hình!",
                "Ngươi cảm nhận được nhựa sống đang tuôn chảy trong huyết mạch!",
                "Mộc căn của ngươi đâm chồi nảy lộc - sinh cơ bừng bừng!"
            ]
        },
        {
            title: "Thanh Mộc Chi Phong",
            lines: [
                "🎋 【Thanh Mộc Chi Phong】 — Gió xuân thổi, cây cối đâm chồi! 🎋",
                "Một cơn gió xanh mát thổi qua, mang theo hương thơm của cỏ cây!",
                "Ngươi đứng giữa rừng cây ngàn năm, cảm nhận được nhịp sống của vạn vật!",
                "Từng chiếc lá rơi xuống như những lời chỉ dẫn của Đạo!",
                "Mộc linh trong ngươi đang hòa vào thiên nhiên - thuận theo lẽ sống!"
            ]
        }
    ],
    'Thủy': [
        {
            title: "Thủy Long Quy Khúc",
            lines: [
                "🌊 【Thủy Long Quy Khúc】 — Rồng nước uốn lượn, thủy triều vô cùng! 🌊",
                "Một con rồng nước khổng lồ xuất hiện từ sóng biển!",
                "Ngươi đứng trên mặt nước mà không chìm, như được Thủy bảo hộ!",
                "Dòng nước ngầm trong cơ thể ngươi hình thành một con rồng uốn lượn!",
                "Thủy căn của ngươi như biển cả - sâu không đáy, rộng không bờ!"
            ]
        },
        {
            title: "Bạch Thủy Triều Cường",
            lines: [
                "💧 【Bạch Thủy Triều Cường】 — Nước trắng dâng cao, sóng vỗ đất trời! 💧",
                "Thủy triều dâng cao ngút trời, ngươi đứng giữa biển nước bạc!",
                "Mỗi đợt sóng đều mang theo năng lượng tu luyện vô tận!",
                "Ngươi hòa mình vào dòng nước, trở thành một phần của thủy vận!",
                "Thủy linh trong ngươi như sông Mê Mông - cuồn cuộn không ngừng!"
            ]
        }
    ],
    'Hỏa': [
        {
            title: "Hỏa Long Xuất Thế",
            lines: [
                "🔥 【Hỏa Long Xuất Thế】 — Rồng lửa gầm rống, thiên địa thiêu đốt! 🔥",
                "Một con rồng lửa từ đan điền ngươi lao ra, để lại vết lửa trên trời!",
                "Ngọn lửa trong ngươi bùng cháy mãnh liệt, đốt cháy mọi tạp chất!",
                "Hỏa diễm trong cơ thể ngươi như núi lửa phun trào!",
                "Hỏa căn của ngươi nóng cháy hơn mặt trời - hủy diệt và sáng tạo!"
            ]
        },
        {
            title: "Hồng Hoả Chiến Khu",
            lines: [
                "🌋 【Hồng Hoả Chiến Khu】 — Lửa đỏ rực trời, ngọn lửa không tắt! 🌋",
                "Một ngọn lửa đỏ rực bùng lên từ đáy vực sâu!",
                "Ngươi đứng giữa biển lửa mà không bị thiêu đốt, như được Hỏa thần bảo hộ!",
                "Mỗi ngọn lửa đều nghe theo điều khiển của ngươi!",
                "Hỏa linh trong ngươi như lò thiêu - đốt người ngã, luyện người thành tiên!"
            ]
        }
    ],
    'Thổ': [
        {
            title: "Thổ Các Thần Thông",
            lines: [
                "🏔️ 【Thổ Các Thần Thông】 — Đại địa rung chuyển, núi non phục tùng! 🏔️",
                "Mặt đất dưới chân ngươi rung chuyển, núi non cúi đầu!",
                "Ngươi đặt tay lên đất, cảm nhận được nhịp đập của đại địa!",
                "Từng tảng đá từ đất trồi lên, xoay quanh ngươi như vệ tinh!",
                "Thổ căn của ngươi nặng nề mà vững chắc - nền tảng của vạn vật!"
            ]
        },
        {
            title: "Hoàng Thổ Triều Dâng",
            lines: [
                "🌾 【Hoàng Thổ Triều Dâng】 — Đất vàng sinh vạn vật, mùa màng bội thu! 🌾",
                "Đất đai trước mặt ngươi rực rỡ một màu vàng óng ả!",
                "Ngươi cảm nhận được sức sống của muôn loài đang từ đất mà sinh ra!",
                "Từng hạt giống nảy mầm quanh ngươi, tạo thành một vườn cây đầy sức sống!",
                "Thổ linh trong ngươi như đất mẹ - nuôi dưỡng vạn vật, sinh vạn vật!"
            ]
        }
    ]
};

// Rank-based stories
const RANK_STORIES = {
    low: [ // rank 0-2 (Phế phẩm, Hạ phẩm, Trung phẩm)
        {
            title: "Phàm Nhân Nghịch Khởi",
            lines: [
                "🍂 【Phàm Nhân Nghịch Khởi】 — Dù yếu ớt, vẫn quyết tâm vươn lên! 🍂",
                "Ngươi sinh ra với linh căn yếu ớt, bị người đời coi như phế vật...",
                "Nhưng trong ngươi có một ngọn lửa không bao giờ tắt - đó là ý chí nghịch thiên!",
                "Từ hôm nay, ngươi sẽ chứng minh rằng phàm nhân cũng có thể đạt đạo!",
                "Dù là cỏ cây bé nhỏ, ngươi vẫn hướng về mặt trời!"
            ]
        },
        {
            title: "Gian Nan Khởi Đầu",
            lines: [
                "💪 【Gian Nan Khởi Đầu】 — Con đường đầy chông gai, nhưng ngươi không lùi! 💪",
                "Linh căn yếu khiến ngươi chật vật ngay từ bước đầu tiên...",
                "Nhưng ngươi nhớ lại bao người đã nói 'ngươi không làm được'...",
                "Với quyết tâm sắt đá, ngươi bước tiếp con đường tu đạo!",
                "Từ bùn lầy, ngươi sẽ vươn lên tầng cao nhất của thiên địa!"
            ]
        }
    ],
    mid: [ // rank 3-5 (Thượng phẩm, Huyền phẩm, Địa phẩm)
        {
            title: "Tu Đạo Chính Quan",
            lines: [
                "🌟 【Tu Đạo Chính Quan】 — Có linh căn tốt, con đường đã rõ! 🌟",
                "Ngươi được thiên địa ban tặng một linh căn không tồi...",
                "Từ đây, mỗi bước đi đều vững chắc hơn người thường!",
                "Ngươi cảm nhận được linh khí trong thiên địa đang hòa vào cơ thể!",
                "Con đường tiên đạo đã mở ra trước mắt - hãy nắm lấy cơ hội!"
            ]
        },
        {
            title: "Thiên Phú Dần Hiện",
            lines: [
                "📈 【Thiên Phú Dần Hiện】 — Tiềm năng bắt đầu bùng nổ! 📈",
                "Linh căn của ngươi đang tỏa sáng, tiềm năng được đánh thức!",
                "Ngươi cảm nhận được một luồng năng lượng dâng trào trong đan điền!",
                "Mỗi ngày tu luyện, ngươi đều thấy tiến bộ rõ rệt!",
                "Thiên phú của ngươi không giới hạn - chỉ cần thời gian để bung trổ!"
            ]
        }
    ],
    high: [ // rank 6-8 (Thiên phẩm, Tiên phẩm, Thánh phẩm)
        {
            title: "Thiên Tài Xuất Hiện",
            lines: [
                "⭐ 【Thiên Tài Xuất Hiện】 — Đất trời chú mục, thiên tài ra đời! ⭐",
                "Linh căn của ngươi thuộc hàng hiếm có trong thiên hạ!",
                "Thiên địa đều cảm nhận được sự xuất hiện của một thiên tài!",
                "Mọi người đều ngước nhìn và kính sợ trước linh căn của ngươi!",
                "Ngươi không phải kẻ thường - ngươi là người được trời chọn!"
            ]
        },
        {
            title: "Thánh Linh Xuất Thế",
            lines: [
                "🌟 【Thánh Linh Xuất Thế】 — Thánh quang chiếu rọi, thế gian kinh ngạc! 🌟",
                "Ánh sáng thánh linh từ đan điền ngươi tỏa ra khắp nơi!",
                "Ngươi mang trong mình một linh căn thuộc hàng thánh cấp!",
                "Thiên đạo đã ghi tên ngươi vào sổ thánh nhân từ khi sinh ra!",
                "Tương lai của ngươi sáng như nhật nguyệt - vô cùng huy hoàng!"
            ]
        }
    ],
    supreme: [ // rank 9+ (Hỗn Nguyên, Đại Thừa, Tiên Thiên, etc.)
        {
            title: "Hỗn Nguyên Chí Tôn",
            lines: [
                "🌌 【Hỗn Nguyên Chí Tôn】 — Ngũ hành ngưng tụ, đế vận thục mệnh! 🌌",
                "Trong đan điền ngươi, ngũ hành đang giao hòa và ngưng tụ!",
                "Ngươi là kết tinh của thiên địa - một tồn tại không thuộc luân hồi!",
                "Đế vận đã được ghi vào càn khôn, ngươi là chủ nhân của vạn vật!",
                "Hỗn nguyên linh căn - ngươi chính là Đấng Sáng Thế!"
            ]
        },
        {
            title: "Đại Thừa Vô Thượng",
            lines: [
                "🏆 【Đại Thừa Vô Thượng】 — Một thân ngũ hành, thiên địa vô song! 🏆",
                "Linh căn của ngươi là đỉnh cao của vạn cổ - không ai sánh bằng!",
                "Ngũ hành trong ngươi hòa làm một, tạo thành một thế giới thu nhỏ!",
                "Ngươi có thể sáng tạo và hủy diệt chỉ bằng một ý niệm!",
                "Từ nay, ngươi là Vô Thượng - không có gì có thể sánh được!"
            ]
        },
        {
            title: "Tiên Thiên Đại Đạo",
            lines: [
                "💫 【Tiên Thiên Đại Đạo】 — Đạo căn viên mãn, tiên mệnh định sẵn! 💫",
                "Ngươi sinh ra đã mang trong mình đạo căn viên mãn!",
                "Thiên địa như được dựng lên chỉ để phục vụ ngươi!",
                "Ngươi có thể cảm nhận được ý muốn của trời đất!",
                "Tiên thiên chi linh - ngươi là hiện thân của Đạo trên mặt đất!"
            ]
        }
    ]
};

// General stories (for multi-element or fallback)
const GENERAL_STORIES = [
    {
        title: "Thiên Cơ Chuyển Động",
        lines: [
            "🌠 【Thiên Cơ Chuyển Động】 — Linh căn khai mở, đạo vận giáng thế! 🌠",
            "Một luồng quang mang từ cửu thiên trút xuống, linh khí khắp hư không sôi trào...",
            "Ngươi đứng giữa hư vô, thân ảnh nhỏ bé mà thiên địa đều chú mục!",
            "Dường như có một bàn tay vô hình đang định hình lại vận mệnh của ngươi...",
            "Từng đợt sóng linh khí cuồn cuộn đến, như muốn nuốt chửng cả đất trời!"
        ]
    },
    {
        title: "Thiên Đạo Thanh Âm",
        lines: [
            "🎵 【Thiên Đạo Thanh Âm】 — Tiếng đạo ca vang vọng cửu thiên! 🎵",
            "Từng thanh âm trong veo như tiếng chuông cổ xưa vang vọng trong hư không...",
            "Ngươi nghe thấy lời thì thầm của Đạo, những bí mật ngàn năm được truyền lại...",
            "Mỗi nốt nhạc đều mang một ý nghĩa sâu xa, mỗi câu chữ đều là một bài học...",
            "Âm thanh thiên đạo như nuốt chửng ngươi vào một cảnh giới khác!"
        ]
    },
    {
        title: "Cửu Thiên Nghịch Chuyển",
        lines: [
            "🌠 【Cửu Thiên Nghịch Chuyển】 — Phong vân đảo điên, thiên địa lay chuyển! 🌠",
            "Cửu tầng trời xanh đột nhiên hòa vào nhau tạo thành một vòng xoáy khổng lồ!",
            "Ngươi đứng giữa vòng xoáy đó, tóc bay trong gió thiên địa!",
            "Thời gian có vẻ như ngưng lại, không gian bị bóp méo...",
            "Một thế giới mới đang được mở ra cho ngươi!"
        ]
    },
    {
        title: "Vạn Vật Đại Chiến",
        lines: [
            "⚔️ 【Vạn Vật Đại Chiến】 — Cuộc chiến của vạn vật bắt đầu! ⚔️",
            "Ngươi nhìn thấy vô số bóng hình chiến đấu trên bầu trời!",
            "Những cường giả từ khắp nơi đổ về đây, mang theo khí thế hùng mạnh!",
            "Đây là thời đại của các tu sĩ - thời đại của ngươi!",
            "Hãy nắm lấy cơ hội này và viết nên sử sách của riêng ngươi!"
        ]
    },
    {
        title: "Hỗn Độn Khai Sơn",
        lines: [
            "🌑 【Hỗn Độn Khai Sơn】 — Từ hư vô sinh ra, định mệnh bắt đầu! 🌑",
            "Trước khi có thiên địa, chỉ có bóng tối vô tận...",
            "Rồi một tia sáng xuất hiện trong bóng tối đó!",
            "Tia sáng đó chính là ngươi - linh hồn được sinh ra từ hư không!",
            "Ngươi là khởi nguồn của mọi khả năng, mọi tương lai!"
        ]
    }
];

// 🆕 Helper function to select story based on player's spirit root
function selectStartGameStory(elements, rank) {
    const elementCount = elements.length;

    // Single element - use element-specific story
    if (elementCount === 1) {
        const element = elements[0];
        const elementStories = ELEMENT_STORIES[element];
        if (elementStories && elementStories.length > 0) {
            return pickRandom(elementStories);
        }
    }

    // Determine rank tier
    let rankTier;
    if (rank >= 9) {
        rankTier = 'supreme';
    } else if (rank >= 6) {
        rankTier = 'high';
    } else if (rank >= 3) {
        rankTier = 'mid';
    } else {
        rankTier = 'low';
    }

    // Try rank-specific stories first for multi-element
    if (elementCount > 1) {
        const rankStories = RANK_STORIES[rankTier];
        if (rankStories && rankStories.length > 0) {
            return pickRandom(rankStories);
        }
    }

    // Fallback to general stories
    return pickRandom(GENERAL_STORIES);
}

// ==================== ELEMENT-BASED SPECIAL PHENOMENA ====================
// Structure: ELEMENT_SPECIAL_PHENOMENA[element][rankTier]
// Each element has 4 tier-specific phenomena: low, mid, high, supreme
const ELEMENT_SPECIAL_PHENOMENA = {
    'Kim': {
        low: [
            "⚔️ 【Kim Linh Tiểu Khởi】 — Một thanh kiếm nhỏ hình thành trong đan điền! ⚔️\nKim nguyên chi lực bắt đầu tuôn trào, dù còn yếu ớt..."
        ],
        mid: [
            "⚔️ 【Kim Linh Xuất Thế】 — Sắt đao bạc giáp, thiên binh tượng hình! ⚔️\nKim nguyên chi lực tuôn trào, ngàn vạn thanh kiếm xoay quanh thân!"
        ],
        high: [
            "🗡️ 【Kim Đan Ngưng Hình】 — Kim đan đang hình thành trong đan điền! 🗡️\nÁnh sáng vàng rực chiếu qua da, ngươi có thể cảm nhận được!"
        ],
        supreme: [
            "💎 【Thiên Binhm Tượng Hình】 — Ngàn vạn thanh kiếm xuất hiện! 💎\nNgươi là Đao Kiếm Chi Tử - sắc bén vô địch, ngàn kiếm quỳ phục!"
        ]
    },
    'Mộc': {
        low: [
            "🌱 【Sinh Cơ Bắt Đầu】 — Mọi đại đạo đều bắt đầu từ một tia sáng! 🌱\nNgươi chính là tia sáng đó, dù còn nhỏ bé, nhưng đã có ý chí!"
        ],
        mid: [
            "🌿 【Mộc Linh Thụ Sinh】 — Sinh mệnh chi lực tràn đầy trong huyết mạch! 🌿\nMỗi tế bào trong cơ thể đều sung mãn năng lượng!"
        ],
        high: [
            "🍃 【Thanh Mộc Chi Phong】 — Gió xuân thổi, cây cối đâm chồi! 🍃\nNhựa sống tuôn chảy, ngươi như được hòa vào thiên nhiên!"
        ],
        supreme: [
            "🌳 【Đại Thụ Trường Sinh】 — Ngươi đứng dưới gốc cây cổ thụ ngàn năm! 🌳\nMộc linh ngưng tụ, ngươi là Thường Sinh Đạo - sống mãi với thời gian!"
        ]
    },
    'Thủy': {
        low: [
            "💧 【Thuỷ Triều Tiểu Khởi】 — Dòng suối nhỏ hình thành trong đan điền! 💧\nThủy nguyên chi lực bắt đầu tuôn chảy, trong veo và mát mẻ..."
        ],
        mid: [
            "🌊 【Thuỷ Long Quy Khúc】 — Thủy nguyên chi lực tuôn trào không ngừng! 🌊\nDòng nước ngầm trong cơ thể ngươi hình thành một con rồng nước!"
        ],
        high: [
            "💧 【Bạch Thủy Triều Cường】 — Nước trắng dâng cao, sóng vỗ đất trời! 💧\nThủy triều dâng cao ngút trời, ngươi đứng giữa biển nước bạc!"
        ],
        supreme: [
            "🌊 【Linhmạch Thuỷ Đạo】 — Dòng sông ánh sáng chảy qua thân ngươi! 🌊\nThủy Đạo của ngươi như đại dương - bao la, sâu thẳm, vô tận!"
        ]
    },
    'Hỏa': {
        low: [
            "🔥 【Hỏa Diễm Tiểu Nhi】 — Ngọn lửa nhỏ bùng cháy trong đan điền! 🔥\nHỏa nguyên chi lực leo lói nhưng không bao giờ tắt..."
        ],
        mid: [
            "🔥 【Hỏa Long Xuất Thế】 — Thất hoả chiến long lao ra từ đan điền! 🔥\nNgọn lửa thiêu đốt mọi tạp chất, thân thể tinh luyện như ngọc!"
        ],
        high: [
            "🌋 【Hồng Hoả Chiến Khu】 — Lửa đỏ rực trời, ngọn lửa không tắt! 🌋\nNgươi đứng giữa biển lửa mà không bị thiêu đốt, như được Hỏa thần bảo hộ!"
        ],
        supreme: [
            "☀️ 【Hỏa Đạo Viêm Dương】 — Ngươi là mặt trời không bao giờ tắt! ☀️\nHỏa Đạo của ngươi thiêu đốt cả càn khôn - Viêm Dương chi Thần!\n🎴 Pháp bảo của ngươi: ${phapBaoList}"
        ]
    },
    'Thổ': {
        low: [
            "🏔️ 【Thổ Khí Khởi Nguyên】 — Một hạt đất nhỏ hình thành trong đan điền! 🏔️\nThổ nguyên chi lực nặng nề nhưng vững chắc, bắt đầu từ mầm mống..."
        ],
        mid: [
            "🏔️ 【Thổ Các Thần Thông】 — Đại địa rung chuyển phục tùng! 🏔️\nNgươi cảm nhận được mọi rung động của đại địa dưới chân!"
        ],
        high: [
            "🌾 【Hoàng Thổ Triều Dâng】 — Đất vàng sinh vạn vật, mùa màng bội thu! 🌾\nĐất đai dưới chân ngươi rực rỡ một màu vàng óng ả!"
        ],
        supreme: [
            "🌍 【Thổ Đạo Càn Khôn】 — Ngươi là nền tảng của vạn vật! 🌍\nĐại địa phục tùng, núi non cúi đầu, tất cả đều từ ngươi mà ra!"
        ]
    }
};

// Rank-based special phenomena (for multi-element spirit roots)
const RANK_SPECIAL_PHENOMENA = {
    low: [
        "🍂 【Phàm Thai Mỏng Manh】— Linh khí yếu ớt, đạo lộ chông gai... 🍂\nSong chỉ cần tâm ngươi không diệt, đạo vẫn còn một tia sinh cơ.",
        "💧 【Minh Tâm Kiên Định】— Dù gian nan, ngươi vẫn không lùi bước! 💧\nTrong lòng ngươi có một ngọn lửa không bao giờ tắt.",
        "⚔️ 【Nghịch Thiên Chi Tâm】— Trời định, ta không tin! ⚔️\nNgươi có ý chí mạnh hơn bất kỳ ai!",
        "🌱 【Sinh Cơ Bắt Đầu】— Mọi đại đạo đều bắt đầu từ một tia sáng! 🌱\nNgươi chính là tia sáng đó, dù còn nhỏ bé."
    ],
    mid: [
        "🌠 【Thiên Cơ Chuyển Động】 — Linh căn khai mở, đạo vận giáng thế! 🌠\nMột luồng quang mang từ cửu thiên trút xuống, linh khí khắp hư không sôi trào...",
        "✨ 【Thiên Phú Bùng Nổ】 — Linh căn đột nhiên bừng sáng! ✨\nMột luồng năng lượng dâng trào từ đan điền, toàn thân ngươi run rẩy!",
        "🌟 【Đạo Tâm Viên Mãn】 — Tâm ma đã tan, đạo cơ đã thành! 🌟\nNgươi cảm nhận được sự tĩnh lặng hoàn toàn trong tâm hồn!",
        "💫 【Thiên Địa Đồng Cảm】 — Ngươi hòa làm một với thiên địa! 💫\nLinh khí tự động vận chuyển quanh thân, mạch lạc thông suốt!"
    ],
    high: [
        "🌟 【Thiên Tài Xuất Hiện】 — Đất trời chú mục, thiên tài ra đời! ⭐\nÁnh sáng thánh linh từ đan điền ngươi tỏa ra khắp nơi!",
        "🐉 【Long Vận Thanh Thị】 — Chân long bay lên trời cao! 🐉\nNgươi nhìn thấy một con rồng vàng bay ngang đỉnh đầu!",
        "🌺 【Hoa Đạo Khai Thành】 — Vạn hoa đua nở chào đón! 🌺\nMùi hương cổ xưa lan tỏa, linh khí trở nên ngọt ngào!",
        "🌈 【Cầu Vồng Bảy Sắc】 — Đạo vận hiển lộ với bảy màu sắc! 🌈\nNgươi đứng trong ánh sáng cầu vồng, linh khí tuôn trào!"
    ],
    supreme: [
        "🌌 【Hỗn Nguyên Chí Tôn】 — Ngũ hành ngưng tụ, đế vận thục mệnh! 🌌\nNgươi là kết tinh của thiên địa - một tồn tại không thuộc luân hồi!",
        "🏆 【Đại Thừa Vô Thượng】 — Một thân ngũ hành, thiên địa vô song! 🏆\nNgươi có thể sáng tạo và hủy diệt chỉ bằng một ý niệm!",
        "💫 【Tiên Thiên Đại Đạo】 — Đạo căn viên mãn, tiên mệnh định sẵn! 💫\nThiên địa như được dựng lên chỉ để phục vụ ngươi!",
        "⚡ 【Đế Vận Thục Mệnh】 — Đế vận đã được ghi vào càn khôn! ⚡\nNgươi là chủ nhân của vạn vật - ngươi chính là Đấng Sáng Thế!"
    ]
};

// Default/fallback special phenomena
const DEFAULT_SPECIAL_PHENOMENA = [
    "🌠 【Thiên Cơ Chuyển Động】 — Linh căn khai mở, đạo vận giáng thế! 🌠\nMột luồng quang mang từ cửu thiên trút xuống, linh khí khắp hư không sôi trào...",
    "✨ 【Thiên Phú Bùng Nổ】 — Linh căn đột nhiên bừng sáng! ✨\nMột luồng năng lượng dâng trào từ đan điền, toàn thân ngươi run rẩy!",
    "🌟 【Đạo Tâm Viên Mãn】 — Tâm ma đã tan, đạo cơ đã thành! 🌟\nNgươi cảm nhận được sự tĩnh lặng hoàn toàn trong tâm hồn!",
    "💫 【Thiên Địa Đồng Cảm】 — Ngươi hòa làm một với thiên địa! 💫\nLinh khí tự động vận chuyển quanh thân, mạch lạc thông suốt!",
    "👁️ 【Thiên Nhãn Thông】 — Con mắt thứ ba đã mở! 👁️\nNgươi có thể nhìn thấy những thứ vô hình!"
];

// Helper function to get random item from array
function pickRandom(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to pick multiple random items
function pickMultiple(arr, count) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// 🆕 Selection functions for element-based story elements
function selectOpening(elements, rank) {
    const elementCount = elements.length;

    // Determine rank tier first (needed for both single and multi-element)
    let rankTier;
    if (rank >= 9) rankTier = 'supreme';
    else if (rank >= 6) rankTier = 'high';
    else if (rank >= 3) rankTier = 'mid';
    else rankTier = 'low';

    // Single element - use element AND rank tier-specific story
    if (elementCount === 1) {
        const element = elements[0];
        const elementOpenings = ELEMENT_OPENINGS[element]?.[rankTier];
        if (elementOpenings && elementOpenings.length > 0) {
            return pickRandom(elementOpenings);
        }
    }

    // Multi-element - try rank-specific stories
    if (elementCount > 1) {
        const rankOpenings = RANK_OPENINGS[rankTier];
        if (rankOpenings && rankOpenings.length > 0) {
            return pickRandom(rankOpenings);
        }
    }

    // Fallback to default
    return pickRandom(DEFAULT_OPENINGS);
}

function selectMiddleScene(elements, rank) {
    const elementCount = elements.length;

    // Determine rank tier first (needed for both single and multi-element)
    let rankTier;
    if (rank >= 9) rankTier = 'supreme';
    else if (rank >= 6) rankTier = 'high';
    else if (rank >= 3) rankTier = 'mid';
    else rankTier = 'low';

    // Single element - use element AND rank tier-specific scene
    if (elementCount === 1) {
        const element = elements[0];
        const elementScenes = ELEMENT_MIDDLE_SCENES[element]?.[rankTier];
        if (elementScenes && elementScenes.length > 0) {
            return pickRandom(elementScenes);
        }
    }

    // Multi-element - try rank-specific scenes
    if (elementCount > 1) {
        const rankScenes = RANK_MIDDLE_SCENES[rankTier];
        if (rankScenes && rankScenes.length > 0) {
            return pickRandom(rankScenes);
        }
    }

    // Fallback to default
    return pickRandom(DEFAULT_MIDDLE_SCENES);
}

function selectEndingScene(elements, rank) {
    const elementCount = elements.length;

    // Determine rank tier first (needed for both single and multi-element)
    let rankTier;
    if (rank >= 9) rankTier = 'supreme';
    else if (rank >= 6) rankTier = 'high';
    else if (rank >= 3) rankTier = 'mid';
    else rankTier = 'low';

    // Single element - use element AND rank tier-specific scene
    if (elementCount === 1) {
        const element = elements[0];
        const elementScenes = ELEMENT_ENDING_SCENES[element]?.[rankTier];
        if (elementScenes && elementScenes.length > 0) {
            return pickRandom(elementScenes);
        }
    }

    // Multi-element - try rank-specific scenes
    if (elementCount > 1) {
        const rankScenes = RANK_ENDING_SCENES[rankTier];
        if (rankScenes && rankScenes.length > 0) {
            return pickRandom(rankScenes);
        }
    }

    // Fallback to default
    return pickRandom(DEFAULT_ENDING_SCENES);
}

function selectSpecialPhenomenon(elements, rank) {
    const elementCount = elements.length;

    // Determine rank tier first (needed for both single and multi-element)
    let rankTier;
    if (rank >= 9) rankTier = 'supreme';
    else if (rank >= 6) rankTier = 'high';
    else if (rank >= 3) rankTier = 'mid';
    else rankTier = 'low';

    // Single element - use element AND rank tier-specific phenomenon
    if (elementCount === 1) {
        const element = elements[0];
        const elementPhenomena = ELEMENT_SPECIAL_PHENOMENA[element]?.[rankTier];
        if (elementPhenomena && elementPhenomena.length > 0) {
            return pickRandom(elementPhenomena);
        }
    }

    // Multi-element - try rank-specific phenomena
    if (elementCount > 1) {
        const rankPhenomena = RANK_SPECIAL_PHENOMENA[rankTier];
        if (rankPhenomena && rankPhenomena.length > 0) {
            return pickRandom(rankPhenomena);
        }
    }

    // Fallback to default
    return pickRandom(DEFAULT_SPECIAL_PHENOMENA);
}

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

    // Classify rank tier
    const supreme = rank >= 9;
    const highRank = rank >= 6;
    const lowRank = rank <= 2;

    // Get origin and fate based on rank tier
    let originSet, fateSet;
    if (supreme) {
        originSet = ORIGIN_POOLS_EXTENDED.chaos;
        fateSet = FATE_POOLS_EXTENDED.chaos;
    } else if (highRank) {
        originSet = ORIGIN_POOLS_EXTENDED.high;
        fateSet = FATE_POOLS_EXTENDED.high;
    } else if (lowRank) {
        originSet = ORIGIN_POOLS_EXTENDED.low;
        fateSet = FATE_POOLS_EXTENDED.low;
    } else {
        originSet = ORIGIN_POOLS_EXTENDED.mid;
        fateSet = FATE_POOLS_EXTENDED.mid;
    }

    // Pick random origin and fate from pools
    const origin = pickRandom(originSet);
    const fate = pickRandom(fateSet);

    // 🆕 Get player's Pháp bảo from inventory
    const phapBaoList = (state.inventory || [])
        .filter(it => it && it.type === 'linhbao')
        .map(it => `${it.name || 'Pháp bảo'} [${it.grade != null ? 'đẳng cấp ' + it.grade : 'tân lập'}]`)
        .join(', ');
    const phapBaoSummary = phapBaoList || 'Chưa có pháp bảo nào';

    // Helper function for Pháp bảo substitution
    const applyPhapBaoSub = (line) => line.replace(/\$\{phapBaoList\}/g, phapBaoSummary);

    // 🆕 Pick element-based story elements
    const opening = selectOpening(elements, rank);
    const middleSceneObj = selectMiddleScene(elements, rank);
    const endingSceneObj = selectEndingScene(elements, rank);
    const specialPhenomenon = selectSpecialPhenomenon(elements, rank);
    const startGameStory = selectStartGameStory(elements, rank);

    // Build the script
    const script = [];

    // Add opening
    script.push(...opening.lines.map(applyPhapBaoSub));

    // Add middle scene with replaced name and Pháp bảo
    const middleLines = middleSceneObj.lines.map(line =>
        applyPhapBaoSub(line.replace(/\$\{state\.name\}/g, state.name || 'Ngươi'))
    );
    script.push("");
    script.push(...middleLines);

    script.push("");

    // Add origin and fate
    script.push("📜 【Thân Thế Nhân Vật】📜");
    script.push(`   ${origin}`);
    script.push("");
    script.push("☯️ 【Thiên Mệnh Chi Đạo】☯️");
    script.push(`   ${fate}`);
    script.push("");

    // 🆕 Add random start game story instead of hardcoded "Thiên Cơ Chuyển Động"
    script.push("═══════════════════════════════════════════════════════════");
    startGameStory.lines.forEach(line => script.push(applyPhapBaoSub(line)));
    script.push("═══════════════════════════════════════════════════════════");
    script.push(`🌠 【Linh Căn Hiện Thế】${tierName} 🌠`);
    script.push(`→ Ngũ hành hiển lộ: ${elementSummary}`);
    script.push("");
    script.push(`🔮 【Phẩm Chất Hiện Thế】${rankName} 🔮`);

    // phẩm chất based on rank
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
            "Từ trong khí hỗn độn, ngươi nghe thấy tiếng thì thầm của Đại Đạo: 'Ngươi chính là kẻ được chọn…'"
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
    } else {
        script.push(
            "",
            applyPhapBaoSub(specialPhenomenon)
        );
    }

    // 🆕 Add ending scene (now using object format)
    const endingLines = endingSceneObj.lines.map(line =>
        applyPhapBaoSub(line.replace(/\$\{state\.name\}/g, state.name || 'Ngươi'))
    );
    script.push("");
    script.push(...endingLines);
    script.push("===================================================");

    return script;
}

function getOriginAndFate(elements, rank) {
    const eCount = elements.length;
    const highRank = rank >= 7;
    const lowRank = rank <= 2;
    const supreme = rank >= 9;

    let originSet;
    if (supreme) originSet = ORIGIN_POOLS_EXTENDED.chaos;
    else if (highRank) originSet = ORIGIN_POOLS_EXTENDED.high;
    else if (lowRank) originSet = ORIGIN_POOLS_EXTENDED.low;
    else originSet = ORIGIN_POOLS_EXTENDED.mid;

    let fateSet;
    if (supreme) fateSet = FATE_POOLS_EXTENDED.chaos;
    else if (highRank) fateSet = FATE_POOLS_EXTENDED.high;
    else if (lowRank) fateSet = FATE_POOLS_EXTENDED.low;
    else fateSet = FATE_POOLS_EXTENDED.mid;

    const origin = pickRandom(originSet);
    const fate = pickRandom(fateSet);

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
                `🔥🔥🔥🔥🔥 ${state.name || 'NGƯƠI'} TỪ ${REALMS[prevRealm].toUpperCase()} VƯỢT QUA MỌI KHÁI NIỆM, TRỞ THÀNH ${REALMS[newRealm].toUpperCase()}!`,
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
                "💥💥💥💥💥💥 VŨ TRỤ BẢN NGUYÊN RẤT RỜ - TẤT CẢ QUI TẮC ĐỀU TỪ NGƯƠI MÀ RA!",
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
                `   🛡️ Hồng mông vực: +${stats.defInc.toLocaleString()} (VẠN PHÁP KHÔNG XÂM)`,
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
        selectedStory = stories[28];
    } else if (newRealm === 27) {
        selectedStory = stories[27];
    } else if (newRealm === 26) {
        selectedStory = stories[26];
    } else if (newRealm >= 20) {
        selectedStory = stories[20];
    } else if (newRealm >= 16) {
        selectedStory = stories[16];
    } else if (newRealm >= 9) {
        selectedStory = stories[9];
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
        delay += 300;
    });
}