function buildRootStoryScript() {
    const elements = state.root?.elements || [];
    const rank = state.root?.rank ?? 0;
    const rankName = ROOT_RANKS[rank] || "Vô Danh";
    const tierName = [
        'Nhất Linh Căn (Tạp Tử)',
        'Song Linh Căn — Âm Dương giao cảm',
        'Tam Linh Căn — Tam khí tương sinh',
        'Tứ Linh Căn — Tứ tượng hỗ ứng',
        'Ngũ Linh Căn — Hỗn Nguyên Thể 🌌'
    ][Math.max(0, elements.length - 1)] || "Vô Linh Căn";
    const elementSummary = elements.length ? elements.join(' ') : 'Vô căn';
    const { origin, fate } = getOriginAndFate(elements, rank);

    const script = [
        "📜 【Thân Thế Nhân Vật】",
        `   ${origin}`,
        "",
        "☯️ 【Thiên Mệnh Chi Đạo】",
        `   ${fate}`,
        "",
        "====================================",
        "🌠 【Thiên Cơ Chuyển Động】 — Linh căn khai mở, đạo vận giáng thế!",
        "Một luồng quang mang từ cửu thiên trút xuống, linh khí khắp hư không sôi trào...",
        "Ngươi đứng giữa hư vô, thân ảnh nhỏ bé mà thiên địa đều chú mục!",
        "====================================",
        `🌠 【Linh Căn Hiện Thế】${tierName}`,
        `→ Ngũ hành hiển lộ: ${elementSummary}`,
        "",
        `🔮 【Phẩm Chất Hiện Thế】${rankName}`
    ];

    // phẩm chất
    if (rank >= 9) {
        script.push(
            "☯️ Hỗn Độn chi vận hiện thế — thiên địa rung chuyển, vạn vật quỳ phục!",
            "Ánh sáng từ tam thiên đại đạo hội tụ, linh hồn ngươi như hòa cùng vũ trụ!",
            "Một tia Hỗn Độn khí lưu quanh thân, hóa thành đồ án Thái Cực chấn động càn khôn!"
        );
    } else if (rank === 8) {
        script.push(
            "🌌 Tiên Thiên linh vận bùng nổ — đạo khí dâng trào khắp hư không!",
            "Trên cao mây tan, nhật nguyệt song chiếu, tiếng đạo ca vang vọng cửu thiên.",
            "Thiên địa tán thưởng, vạn vật cúi đầu — thân mang Tiên Cốt chi mạch!"
        );
    } else if (rank === 7) {
        script.push(
            "🔥 Hậu Thiên thần vận ngưng tụ — thiên cơ lay động!",
            "Tứ tượng quanh thân, linh lực xoay chuyển, tỏa ra đạo vận ngũ sắc."
        );
    } else if (rank === 6) {
        script.push(
            "⚡ Thiên phẩm linh quang giáng thế — vạn linh thất sắc!",
            "Ánh sáng như ngân hà rơi, từng sợi linh khí tựu lại nơi huyệt mạch."
        );
    } else if (rank === 5) {
        script.push(
            "🌋 Địa phẩm linh khí dao động — đất trời cộng hưởng.",
            "Đại địa truyền âm, linh mạch khẽ rung, đạo cơ đã mở."
        );
    } else if (rank === 4) {
        script.push(
            "🌙 Huyền phẩm hiện đạo — ánh trăng phủ mạch linh.",
            "Khí tức quanh thân ngươi dần ổn định, tâm cảnh tĩnh lặng như nước hồ thu."
        );
    } else if (rank === 3) {
        script.push(
            "💎 Thượng phẩm hiển linh — khí tức thuần chính.",
            "Thiên ý thuận, đạo vận hiền hòa, linh căn sáng rực một góc hư không."
        );
    } else if (rank === 2) {
        script.push(
            "🌿 Trung phẩm phát mạch — đạo vận sơ khai.",
            "Một tia linh quang chập chờn trong đan điền, đạo lộ mới chỉ manh nha."
        );
    } else if (rank === 1) {
        script.push(
            "🍂 Hạ phẩm linh căn yếu ớt, như đom đóm giữa đêm dài.",
            "Tuy nhỏ bé, song trong u tối vẫn le lói một tia hy vọng."
        );
    } else {
        script.push(
            "🥄 Phế phẩm — linh căn tan loãng, đạo tâm khó tụ.",
            "Trời không ưu đãi, đạo lộ hiểm trở, nhưng chỉ có kẻ nghịch thiên mới lập đại đạo!"
        );
    }

    // dị tượng
    if (elements.length >= 5 && rank >= 9) {
        script.push(
            "",
            "☯️ 【Thiên Địa Dị Tượng】— Ngũ hành nghịch chuyển, vạn vật run rẩy!",
            "🌌 Một Hỗn Độn Chi Thể nghịch thiên xuất thế, vạn đạo quỳ phục, nhật nguyệt đảo huyền!",
            "Từ trong khí hỗn độn, ngươi nghe thấy tiếng thì thầm của Đại Đạo: ‘Ngươi chính là kẻ được chọn…’"
        );
    } else if (elements.length >= 4 && rank >= 8) {
        script.push(
            "",
            "⚡ 【Thiên Cơ Giao Động】— Tiên linh hiện thế, đạo vận khuếch tán!",
            "Trời rơi mưa linh, đất tỏa hào quang, đạo văn cổ xưa chầm chậm xoay quanh thân ngươi."
        );
    } else if (elements.length >= 3 && rank >= 6) {
        script.push(
            "",
            "✨ 【Thiên Khải Linh Vân】— Khí tức vững mạnh, linh vận cường hóa!",
            "Mây tụ đỉnh đầu, tựa rồng cuộn quanh thân, đạo ý sơ hiển."
        );
    } else if (rank <= 1) {
        script.push(
            "",
            "🍂 【Phàm Thai Mỏng Manh】— Linh khí yếu ớt, đạo lộ chông gai...",
            "Song chỉ cần tâm ngươi không diệt, đạo vẫn còn một tia sinh cơ."
        );
    }

    script.push(
        "",
        `💠 Linh căn và phẩm chất đã định, ${state.name} bước vào đạo lộ tu hành...`,
        "Từ giây phút này, từng hơi thở đều hòa cùng thiên địa, từng bước đi đều khắc lên vận mệnh!",
        "✨ Thiên địa tịch mịch — Đạo lộ khai mở!",
        "===================================="
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
