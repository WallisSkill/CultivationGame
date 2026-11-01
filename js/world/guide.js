/* ===========================================================
   HƯỚNG DẪN — giải thích chỉ số và luật chơi cho người mới
=========================================================== */
const GUIDE_SECTIONS = [
    {
        title: '📊 Chỉ số nhân vật',
        items: [
            ['Cảnh giới', '29 đại cảnh giới, mỗi cảnh có 4 tiểu kỳ: Sơ Kỳ, Trung Kỳ, Hậu Kỳ, Đại Viên Mãn. Đây là thứ quyết định sức mạnh nhiều nhất.'],
            ['Tu vi', 'Đầy thanh này thì lên tiểu kỳ tiếp theo. Có được từ bế quan, đánh quái và làm nhiệm vụ.'],
            ['Bình cảnh', 'Tu vi đầy nhưng chưa đủ điều kiện đột phá. Dòng cảnh báo ở thẻ Tu vi cho biết phải làm gì.'],
            ['HP', 'Máu của ngươi, về 0 là thua trận. Số trong ngoặc là phần trang bị cộng thêm.'],
            ['Sức mạnh', 'Sát thương gốc, pháp bảo đánh càng mạnh khi chỉ số này càng cao.'],
            ['Phòng thủ', 'Giảm sát thương phải nhận.'],
            ['Bản thể / Trang bị', 'Tỉ lệ sức mạnh đến từ bản thân và từ đồ. Số trước là bản thể, số sau là trang bị.'],
            ['Linh căn', 'Các hệ ngũ hành và phẩm chất của ngươi. Phẩm càng cao chỉ số gốc càng lớn.'],
            ['Căn cơ', 'Mặc định 100%. Cấm vật ở Chợ Đen làm tổn căn cơ vĩnh viễn, giảm mọi chỉ số bản thể theo đúng phần trăm đó; Bổ Căn Đan hồi lại một ít. Dưới 50% thì không dùng thêm cấm vật được.'],
            ['Chủng tộc', 'Chọn khi tạo nhân vật, không đổi được. Nhân tộc tu vi nhanh hơn 10%, có 7 hệ tu. Yêu tộc HP +10%, phòng thủ +5%, có 5 hệ tu, bắt đầu ở Vạn Thú Sơn.'],
            ['Hệ tu', 'Mỗi hệ thuộc một hành. Kim khắc Mộc, Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim: đánh hệ bị khắc +25%, đánh hệ khắc mình -20%. Đổi hệ ở điểm Truyền thừa của đúng chủng tộc; Bờ Hỗn Độn, Tử Khí Thiên Nguyên và Trường Hà Tận Cùng dạy mọi hệ của chủng tộc ngươi.'],
            ['Đồng đội sinh khắc', 'Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc. Đội có người sinh cho ngươi: sức mạnh +10%. Đội có người khắc ngươi: phòng thủ -5%. Đủ cả 5 hành: sức mạnh và HP +15%. Hộ pháp và đệ tử mang hệ ngẫu nhiên cùng chủng tộc.'],
            ['Tuổi thọ', 'Hết tuổi thọ là chết. Cảnh giới càng cao tuổi trôi càng nhanh, đột phá giúp thọ nguyên tăng thêm. Lúc đi đường tuổi trôi rất chậm, đi xa cũng không tốn mấy năm. Vắng mặt không làm chết vì già, tuổi dừng ở 90% thọ nguyên.'],
            ['Linh thạch', 'Tiền để mua đồ, rèn đúc và mua ở Chợ Đen.'],
            ['Chi tiết chỉ số', 'Nút ở cuối hàng chỉ số, xem đầy đủ các nguồn cộng thêm.']
        ]
    },
    {
        title: '⚔️ Tương quan trong trận',
        items: [
            ['Chênh đại cảnh giới', 'Mỗi cảnh giới cao hơn được +35% sát thương. Mỗi cảnh giới thấp hơn bị -35%, thấp nhất còn 20%. Chỉ số gốc của cảnh trên cũng lớn hơn nhiều, nên vượt cảnh rất khó thắng.'],
            ['Chênh tiểu kỳ', 'Chỉ tính khi cùng đại cảnh giới: mỗi tiểu kỳ chênh 15% sát thương.'],
            ['Khác Giới', 'Đánh kẻ ở Giới cao hơn bị giảm mạnh sát thương, đánh kẻ ở Giới thấp hơn được tăng thêm.'],
            ['Ngũ hành', 'Khắc được +20%, bị khắc -20%: Kim khắc Mộc, Mộc khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Thổ khắc Mộc. Dưới Kim Đan chưa dùng được ngũ hành.'],
            ['Hiệu ứng trận pháp', 'Thiêu đốt, đóng băng, choáng, hồi máu, hộ thuẫn, đỡ đòn và tăng lực đều chịu áp chế cảnh giới như sát thương. Đánh kẻ cảnh giới cao hơn thì khống chế ngắn và khó trúng hơn, hồi máu và hộ thuẫn yếu đi.'],
            ['Hết giờ trận', 'Sau 90 giây mà địch chưa chết thì tính là thua.'],
            ['Chọn cấp săn', 'Bấm nút Chọn cấp săn ở thông tin khu vực để chỉ gặp quái trong khoảng cảnh giới của nơi đó.'],
            ['Bậc quái', 'Thường, Tinh anh, Thống lĩnh, Boss: bậc càng cao càng khỏe và thưởng càng nhiều.']
        ]
    },
    {
        title: '🧘 Tu luyện và trang bị',
        items: [
            ['Bế quan', 'Ngồi xuống ở chỗ Bế quan trong khu vực. Linh khí nơi đó càng cao tu vi tăng càng nhanh.'],
            ['Trận Pháp Bảo', 'Pháp bảo đặt lên trận sẽ tự đánh theo thời gian hồi.'],
            ['Nâng giai pháp bảo', 'Lên giai vẫn giữ nguyên cấp đang có. Hợp nhất cho ngươi tự chọn vật liệu; pháp bảo đang ở trên trận không bị lấy làm vật liệu.'],
            ['Rèn đồ', 'Lò rèn chỉ rèn tới cảnh giới của nơi đó. Thần lò rèn được mọi cấp trong Giới của nó, vượt cấp tối đa tới cảnh giới đầu của Giới sau.'],
            ['Chỉ định thuộc tính', 'Ở Thần lò, đồ từ Địa Tiên trở lên có thể chọn tối đa 3 loại chỉ số phụ, mỗi loại cộng 50% linh thạch; giá trị vẫn ngẫu nhiên. Lò rèn và Danh lò ra ngẫu nhiên.'],
            ['Nhiệm vụ tiểu cảnh giới', 'Mỗi tiểu kỳ có 3 việc riêng, phải tới nói chuyện với người trong vùng mới nhận được, xong việc quay lại báo. Qua tiểu kỳ thì việc chưa nhận sẽ mất. Cốt truyện chính cũng chia theo từng tiểu kỳ.'],
            ['Nói chuyện với NPC', 'Mỗi nơi đều có người để hỏi chuyện, nơi có lò thì có cả thợ rèn. Nhiệm vụ phụ phải nhận và báo lại với đúng người, đi tới nơi thôi chưa đủ. Dấu ❗ là người đó có việc cho ngươi.'],
            ['Nhiệm vụ ẩn', 'Chỉ NPC của nơi đó kể, và chỉ khi ngươi đang ở đúng một cảnh giới; qua cảnh giới đó là mất. Thưởng một món đồ phẩm Thần cao hơn 2 cảnh giới. Thần lò cũng có việc riêng, thưởng tương tự.'],
            ['Chính tuyến và phụ tuyến', 'Một số nhiệm vụ phụ chỉ có sau nhiệm vụ chính nhất định. Một số nhiệm vụ chính phải chờ nhiệm vụ phụ; thẻ nhiệm vụ sẽ ghi cần gặp ai.'],
            ['Xem chi tiết nhiệm vụ', 'Rê chuột vào thẻ nhiệm vụ để đọc vì sao có nhiệm vụ đó và diễn biến đã qua.']
        ]
    },
    {
        title: '🌌 Các Giới và danh vọng',
        items: [
            ['Phi thăng', 'Đủ cảnh giới sẽ được đưa lên Giới mới. Đã lên thì không được xuống, trừ hai cách dưới đây.'],
            ['Thiên Hạ Bảng', 'Tổng điểm của ngươi ở mọi nơi trong một Giới. Đứng đầu bảng được tự do xuống Giới thấp hơn.'],
            ['Tinh Không Thạch', 'Mua ở Chợ Đen. Mỗi viên đưa xuống Giới liền dưới 30 phút giờ thật, hết giờ bị kéo về.'],
            ['Địa Chí', 'Bản đồ chỉ hiện lò rèn, Chợ Đen và dịch vụ của nơi đã tới hoặc đã dò la. Làm chuỗi Dò La ở điểm đầu mỗi Giới để lần ra từ lò thường tới Thần lò. Xem ở nút Địa Chí trên bản đồ.'],
            ['Chợ Đen', 'Hàng đổi mỗi giờ thật, mỗi món mua được một lần. Đấu giá: ra giá xong đối thủ sẽ trả cao hơn tới khi vượt hạn mức của họ, thắng mới mất tiền.'],
            ['Thiên Kiêu Bảng', 'Xếp hạng theo từng nơi, điểm có từ việc diệt quái ở nơi đó.'],
            ['Chỉ số phụ', 'Đồ từ Địa Tiên trở lên có thêm dòng ngẫu nhiên: chí mạng, sát thương chí mạng, né tránh, hút máu, may mắn. Phẩm càng cao càng nhiều dòng. Cùng một loại, đồ cảnh giới cao hơn hoặc phẩm cao hơn luôn có giá trị cao hơn, kể cả khi ra thấp nhất. Xem tổng ở Chi tiết chỉ số. Chí mạng, né tránh và hút máu từ đồ có tác dụng trong trận thường, chưa áp dụng cho Đấu trường xếp hạng.'],
            ['Tiên vị', 'Từ Tiên Giới phải báo danh ở Thiên Đình Điện và làm lệnh để có công lao. Thiếu tiên vị thì không đột phá tiếp được. Cao nhất là Đế Quân, ứng với Tiên Đế.'],
            ['Lệnh Thiên Đình', 'Nhận cùng lúc tối đa 5 lệnh. Mỗi lệnh ghi rõ tên và cảnh giới quái; săn ở đúng nơi đó sẽ gặp đúng quái ấy, không theo Chọn cấp săn, và chỉ quái đúng cảnh giới mới được tính. Quái cảnh giới càng cao thì lệnh càng khó và công lao càng lớn; cảnh giới cao nhất của Giới là Tử Lệnh. Từ Huyền Tiên, ở đâu cũng mở được Thiên Đình Điện để nhận lệnh của Giới đang đứng.']
        ]
    }
];

/* Cảnh giới hiện dần theo Giới đã tới; nhiệm vụ ẩn chỉ hiện tên sau khi làm xong */
function guideRealmSection() {
    const items = WORLD_TIERS.flatMap(world => {
        if (!worldUnlocked(world.id)) return [['🔒 ???', 'Chưa tới Giới này.']];
        return Array.from({ length: world.to - world.from + 1 }, (_, i) => world.from + i).map(realm => {
            const quests = HIDDEN_QUESTS.filter(q => q.realmOnly === realm);
            const done = quests.filter(q => state.questDone.includes(q.id)).map(q => `✔ ${q.title}`);
            const locked = quests.length - done.length;
            return [`${realm + 1}. ${REALMS[realm]}`, [world.name, ...done, locked ? `🔒 ${locked} nhiệm vụ ẩn chưa mở` : ''].filter(Boolean).join(' · ')];
        });
    });
    return { title: '🗻 Cảnh giới và nhiệm vụ ẩn', items };
}

function openGuide() {
    const body = [...GUIDE_SECTIONS, guideRealmSection()].map((section, i) => `<details class="guide-section" ${i === 0 ? 'open' : ''}>
        <summary>${section.title}</summary>
        ${section.items.map(([name, text]) => `<div class="guide-row"><b>${name}</b><span>${text}</span></div>`).join('')}
    </details>`).join('');
    openWorldModal('guideModal', '❓ Hướng dẫn', body);
}

if (typeof window !== 'undefined') Object.assign(window, { openGuide });
