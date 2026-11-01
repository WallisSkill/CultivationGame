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
            ['Tuổi thọ', 'Hết tuổi thọ là chết. Đột phá cảnh giới giúp sống lâu hơn.'],
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
            ['Nhiệm vụ tiểu cảnh giới', 'Mỗi tiểu kỳ có 3 việc riêng. Qua tiểu kỳ thì việc chưa nhận sẽ mất.']
        ]
    },
    {
        title: '🌌 Các Giới và danh vọng',
        items: [
            ['Phi thăng', 'Đủ cảnh giới sẽ được đưa lên Giới mới. Đã lên thì không được xuống, trừ hai cách dưới đây.'],
            ['Thiên Hạ Bảng', 'Tổng điểm của ngươi ở mọi nơi trong một Giới. Đứng đầu bảng được tự do xuống Giới thấp hơn.'],
            ['Tinh Không Thạch', 'Mua ở Chợ Đen. Mỗi viên đưa xuống Giới liền dưới 30 phút giờ thật, hết giờ bị kéo về.'],
            ['Thiên Kiêu Bảng', 'Xếp hạng theo từng nơi, điểm có từ việc diệt quái ở nơi đó.'],
            ['Tiên vị', 'Từ Tiên Giới phải báo danh ở Thiên Đình Điện và làm lệnh để có công lao. Thiếu tiên vị thì không đột phá tiếp được. Cao nhất là Đế Quân, ứng với Tiên Đế.']
        ]
    }
];

function openGuide() {
    const body = GUIDE_SECTIONS.map((section, i) => `<details class="guide-section" ${i === 0 ? 'open' : ''}>
        <summary>${section.title}</summary>
        ${section.items.map(([name, text]) => `<div class="guide-row"><b>${name}</b><span>${text}</span></div>`).join('')}
    </details>`).join('');
    openWorldModal('guideModal', '❓ Hướng dẫn', body);
}

if (typeof window !== 'undefined') Object.assign(window, { openGuide });
