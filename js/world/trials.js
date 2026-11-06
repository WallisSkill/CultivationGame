/* ===========================================================
   ĐỘ KIẾP ĐẠI CẢNH GIỚI
   - Tu vi đầy viên mãn chưa đủ: phải tới đúng nơi, ngồi xuống chịu kiếp đủ số phút thật.
   - Mỗi kiếp có hiệu ứng riêng vẽ quanh người ngồi, lời thoại tả đúng hiệu ứng đó.
   - Chịu đủ thì đột phá chắc chắn thành công; đứng dậy giữa chừng thì phải chịu lại từ đầu.
=========================================================== */
const BREAKTHROUGH_TRIALS = {
    1: { loc: 'thanh_van', minutes: 3, effect: 'vortex', color: '#7bfac2', start: 'Linh khí Thanh Vân Tông xoáy thành lốc quanh người, ngươi dẫn từng sợi vào đan điền.', done: 'Lốc linh khí sụp vào trong, hóa thành nền móng vững chắc. Trúc Cơ đã thành.' },
    2: { loc: 'vu_moc_lam', minutes: 4, effect: 'fire', color: '#ffb347', start: 'Giữa Vạn Mộc Lâm, chân hỏa trong người bốc lên, nung linh dịch thành một khối tròn.', done: 'Lửa tắt, một viên kim đan sáng rực nằm yên trong đan điền.' },
    3: { loc: 'tu_vong_coc', minutes: 4, effect: 'glow', color: '#ffe9a0', start: 'Âm khí Tử Vong Cốc ép xuống, kim đan nứt dần, một luồng sáng vàng lọt ra từ khe nứt.', done: 'Đan vỡ, anh hài nhỏ mở mắt giữa vầng sáng vàng. Nguyên Anh đã thành.' },
    4: { loc: 'van_long', minutes: 5, effect: 'ripple', color: '#9dd7ff', start: 'Giữa Vân Long Thành, thần thức lan ra từng vòng như sóng nước, chạm tới mọi góc thành.', done: 'Sóng thần thức thu về một điểm, nguyên anh hóa thần. Hóa Thần đã thành.' },
    5: { loc: 'xich_diem', minutes: 5, effect: 'fire', color: '#ff7a3a', start: 'Địa hỏa Xích Diệm Sơn trào lên bao lấy thân, nung chảy ranh giới giữa thực và hư.', done: 'Thân giữa biển lửa hóa nửa hư nửa thực. Luyện Hư đã thành.' },
    6: { loc: 'bang_phong', minutes: 6, effect: 'snow', color: '#bfe9ff', start: 'Hàn khí Băng Phong Cốc đóng băng từng thớ thịt, tuyết rơi phủ kín người ngồi.', done: 'Băng vỡ vụn, thân và hồn hợp làm một không còn kẽ hở. Hợp Thể đã thành.' },
    7: { loc: 'long_cung', minutes: 6, effect: 'lightning', color: '#8fd3ff', start: 'Trên Đông Hải Long Cung mây đen kéo tới, lôi kiếp đầu tiên giáng xuống đỉnh đầu.', done: 'Đạo lôi cuối cùng tan vào thân. Ngươi đã vượt qua Độ Kiếp.' },
    8: { loc: 'ma_uyen', minutes: 7, effect: 'glow', color: '#f5f0ff', start: 'Dưới đáy Vô Tận Ma Uyên tối đen, ngươi thắp đạo tâm thành một ngọn đèn trắng.', done: 'Ánh trắng soi tới tận đáy vực, ma khí lùi xa. Đại Thừa đã thành.' },
    9: { loc: 'phi_thang', minutes: 8, effect: 'lightning', color: '#c58bff', start: 'Phi Thăng Đài rung lên, cửu cửu thiên lôi tím giáng xuống từng đạo một.', done: 'Đạo lôi thứ tám mươi mốt tan đi, tiên quang từ trời rọi xuống đài. Ngươi thành Tán Tiên.' },
    10: { loc: 'yeu_ha', minutes: 8, effect: 'ripple', color: '#5fc9c0', start: 'Dưới đáy Yêu Hà, nơi ngươi từng nấp khỏi giám binh, dòng nước dội thành từng vòng sóng quanh người, rửa sạch hơi phàm cuối cùng.', done: 'Sóng lặng. Thân ngươi giờ đứng vững trên đất Tiên Giới như kẻ sinh ra ở đây, không còn là món hàng vừa được đóng dấu.' },
    11: { loc: 'tru_tien', minutes: 8, effect: 'starfall', color: '#e8f0ff', start: 'Trên Tru Tiên Đài trống trải, sao trời lần lượt rơi xuống, mỗi ngôi sao khắc một đạo văn lên thân.', done: 'Vạn sao an vị trong thân. Thiên Tiên đã thành.' },
    12: { loc: 'quang_han', minutes: 9, effect: 'pillar', color: '#dfe8ff', start: 'Ánh trăng Quảng Hàn Cung đổ thành một cột sáng lạnh, gột từng lớp tạp niệm.', done: 'Cột trăng thu lại, chỉ còn chân tâm trong suốt. Chân Tiên đã thành.' },
    13: { loc: 'u_minh', minutes: 9, effect: 'vortex', color: '#c0392b', start: 'Giữa U Minh Ngục, ma khí của những tiên nhân nhập ma xoáy quanh người, kéo tiên lực xuống tận đáy ngục.', done: 'Ngươi ngồi giữa ma khí mà không đỏ mắt. Đạo tâm đã cứng hơn bức tường giam họ.' },
    14: { loc: 'dao_tri', minutes: 10, effect: 'glow', color: '#ffd76a', start: 'Kim quang Dao Trì đổ lên người, đúc lại tiên thể từng tấc một.', done: 'Thân sáng như vàng ròng, vạn pháp khó xâm. Kim Tiên đã thành.' },
    15: { loc: 'yeu_hoang_dien', minutes: 10, effect: 'pillar', color: '#ffcf40', start: 'Trong Yêu Hoàng Điện, nơi ngự của kẻ ngang hàng Thiên Đế, một cột kim quang từ thiên khung giáng thẳng xuống người ngồi.', done: 'Cột kim quang hóa thành đế quan trên đầu. Tiên Đế đã thành.' },
    16: { loc: 'phu_tang', minutes: 10, effect: 'rings', color: '#ffa94d', start: 'Dưới Phù Tang Thụ, sáu vòng thần quang lần lượt hiện quanh người, mỗi vòng một nguyên.', done: 'Sáu vòng hợp lại không còn kẽ hở. Thần Cảnh Lục Nguyên đã thành.' },
    17: { loc: 'bac_minh', minutes: 12, effect: 'vortex', color: '#3d7bff', start: 'Bắc Minh Hải cuộn thành xoáy nước khổng lồ, nuốt cả trời đất vào đạo thể.', done: 'Biển lặng, đạo thể bất hủ như vàng ròng. Đại La Kim Tiên đã thành.' },
    18: { loc: 'nam_thien_mon', minutes: 12, effect: 'lightning', color: '#ffd24a', start: 'Trước Nam Thiên Môn, kim lôi thiên phạt giáng xuống, thử xem ngươi có xứng gần Thánh.', done: 'Kim lôi tắt, thiên môn cúi đầu. Chuẩn Thánh đã thành.' },
    19: { loc: 'lang_tieu', minutes: 15, effect: 'rings', color: '#ffe066', start: 'Trong Lăng Tiêu Bảo Điện, vòng thánh quang vàng nối nhau hiện sau lưng, vạn tiên đứng lặng.', done: 'Thánh quang chiếu khắp Tam Giới, vạn linh quỳ bái. Ngươi thành Thánh Nhân.' },
    20: { loc: 'tu_tieu', minutes: 15, effect: 'pillar', color: '#c77dff', start: 'Tử khí Tử Tiêu Cung dựng thành cột tím xuyên trời, ép thánh đạo vào khuôn.', done: 'Cột tử khí đứng yên trên đầu. Chí Thánh đã thành.' },
    21: { loc: 'loi_trach', minutes: 15, effect: 'lightning', color: '#9fe8ff', start: 'Cả Lôi Trạch hóa thành biển sét, vạn đạo lôi đình cùng giáng một lúc.', done: 'Biển sét lặng, sấm còn vang trong thánh thể. Đại Thánh đã thành.' },
    22: { loc: 'linh_son', minutes: 18, effect: 'glow', color: '#fff4c2', start: 'Trên đỉnh Linh Sơn, phật quang lẫn thánh quang hòa làm một, chiếu xuyên qua thân.', done: 'Ánh sáng lặng vào trong, ngươi đứng ở ngưỡng cửa cảnh giới Thiên. Chuẩn Thiên đã thành.' },
    23: { loc: 'cuc_lac', minutes: 18, effect: 'chaos', color: '#ff4d6d', start: 'Ở rìa Tây Phương Cực Lạc, khe nứt ra ngoài thế giới mở, ma khí đỏ của Ngoại Vực tràn vào thử thân.', done: 'Ngươi xé khe nứt bằng tay không. Diệt Thiên đã thành.' },
    24: { loc: 'van_gioi', minutes: 20, effect: 'ripple', color: '#b0a8ff', start: 'Giữa Vạn Giới Phế Tích, tàn ảnh các thế giới đã chết dội lại thành từng vòng sóng.', done: 'Ngươi thu vạn tàn ảnh làm một, mở ra một phương trời. Khai Thiên đã thành.' },
    25: { loc: 'luan_hoi', minutes: 20, effect: 'vortex', color: '#a0f0ff', start: 'Luân Hồi Hải cuộn thành vòng xoáy sinh tử, kéo ngươi qua từng kiếp một.', done: 'Vạn kiếp đi qua mà thân không đổi. Toàn Thiên đã thành.' },
    26: { loc: 'khai_thien', minutes: 20, effect: 'pillar', color: '#ffb067', start: 'Trên Khai Thiên Hoang Nguyên, ngươi dựng thân làm cột chống trời, trời đè xuống từng tấc.', done: 'Trời không đè nổi nữa. Cực Thiên đã thành.' },
    27: { loc: 'tinh_mo', minutes: 22, effect: 'starfall', color: '#ff6b6b', start: 'Tinh Thần Mộ trút xuống những ngôi sao đỏ đã chết, mỗi ngôi sao là một lời nguyền chống lại ngươi.', done: 'Sao đỏ cháy hết, chỉ còn ngươi đứng giữa mộ. Nghịch Thiên đã thành.' },
    28: { loc: 'hu_nhan', minutes: 25, effect: 'rings', color: '#e0e0ff', start: 'Trước Hư Không Chi Nhãn, từng vòng hư không mở ra quanh người, mỗi vòng một thế giới chưa có.', done: 'Ngươi gieo một thế giới vào vòng đầu tiên. Sáng Thế đã thành.' },
    29: { loc: 'than_dinh', minutes: 30, effect: 'chaos', color: '#b45cff', start: 'Thiên Đạo Thần Đình tan rã thành hỗn độn tím, ngươi ngồi giữa cơn lốc trước khi có trời đất.', done: 'Hỗn độn lặng lại quanh ngươi như nước quanh đá. Ngươi thành Hỗn Độn Đạo Giả.' },
    30: { loc: 'hai_tam', minutes: 30, effect: 'chaos', color: '#ffb000', start: 'Giữa Hỗn Độn Hải Tâm, khí hỗn độn đỏ vàng cuộn quanh, hồng mông tử khí đầu tiên lóe lên.', done: 'Tử khí nhận ngươi làm chủ. Hồng Mông Chúa Tể đã thành.' },
    31: { loc: 'chua_te', minutes: 30, effect: 'pillar', color: '#fff7d6', start: 'Trên Chúa Tể Tọa, cột sáng trắng vàng nối từ khởi nguyên tới tận cùng, xuyên qua thân ngươi.', done: 'Khởi nguyên và tận cùng gặp nhau trong ngươi. Chung Nguyên Chí Cao đã thành.' }
};

const TRIAL_BOLT_SECONDS = 5;
const TRIAL_DAMAGE_SHARE = 0.7;

function trialFor(realm) {
    return BREAKTHROUGH_TRIALS[realm] || null;
}

/* Kiếp đang chờ: tu vi đã đầy viên mãn, không còn bình cảnh nhiệm vụ, chưa chịu kiếp */
function pendingTrial() {
    const next = (state.realmIndex || 0) + 1;
    const trial = trialFor(next);
    if (!trial || state.trialDone === next || state.realmStage < 3 || state.huVoDisciple || state.huVoChoice) return null;
    if (state.xp < getNeed()) return null;
    if (typeof getBreakthroughGate === 'function' && getBreakthroughGate(next)) return null;
    return { ...trial, realm: next };
}

function trialText(trial) {
    return `Tới ${LOCATIONS[trial.loc].name}, ngồi chịu kiếp ${trial.minutes} phút để lên ${REALMS[trial.realm]}`;
}

function trialActive() {
    return state.activity?.type === 'trial' ? state.activity : null;
}

function startTrial() {
    const trial = pendingTrial();
    if (!trial) return;
    if (state.location !== trial.loc) return travelTo(trial.loc);
    if (!requireFree()) return;
    startActivity({ type: 'trial', label: `⚡ Độ kiếp ${REALMS[trial.realm]}`, seconds: trial.minutes * 60, realm: trial.realm });
    const spot = typeof meditateSpot === 'function' && meditateSpot();
    if (spot) {
        sceneState.x = spot.x;
        sceneState.y = spot.y + 46;
        sceneState.tx = sceneState.ty = null;
        refreshSceneSpots();
    }
    log(`⚡ ${trial.start}`);
    playDialogue([['narr', trial.start]]);
}

/* Kiếp đánh như một kẻ địch: mốc là người viên mãn mặc đủ đồ Bảo phẩm cùng cảnh giới, chịu hết kiếp còn khoảng 30% máu */
function trialExpected(realm) {
    const body = refStats(realm, 3);
    const share = realmShare(realmProgress(realm, 3));
    const gear = gearBudget(realm);
    return { hp: body.hp * share + gear.hp, def: body.def * share + gear.def };
}

function trialBolts(trial) {
    return Math.floor(trial.minutes * 60 / TRIAL_BOLT_SECONDS);
}

function trialBoltAtk(trial) {
    const expected = trialExpected(trial.realm - 1);
    const c = expected.hp * TRIAL_DAMAGE_SHARE / trialBolts(trial);
    return (c + Math.sqrt(c * c + 4 * c * expected.def)) / 2;
}

function trialBoltDamage(trial) {
    const atk = trialBoltAtk(trial);
    const def = state.totalDef || state.defense || 0;
    return Math.max(1, Math.floor(atk * atk / (atk + def)));
}

function trialStrike(a, seconds) {
    const trial = { ...trialFor(a.realm), realm: a.realm };
    a.boltClock = (a.boltClock || 0) + seconds;
    while (a.boltClock >= TRIAL_BOLT_SECONDS) {
        a.boltClock -= TRIAL_BOLT_SECONDS;
        state.hp -= trialBoltDamage(trial);
        if (state.hp <= 0) {
            failTrial(a);
            return false;
        }
    }
    return true;
}

function failTrial(a) {
    state.hp = 1;
    state.activity = null;
    const text = `Lôi kiếp ${REALMS[a.realm]} đánh ngươi ngã gục giữa chừng. Thân này chưa đủ cứng để chịu trời phạt: hồi máu, rèn đồ cho xứng rồi chịu lại từ đầu.`;
    log(`💥 ${text}`);
    showToast(`Độ kiếp ${REALMS[a.realm]} thất bại`, 'warn');
    playDialogue([['narr', text]]);
    renderAll();
}

function finishTrial(a) {
    const trial = trialFor(a.realm);
    state.trialDone = a.realm;
    log(`🌟 ${trial.done}`);
    playDialogue([['narr', trial.done]]);
    checkRealmProgress();
}

function trialCardHTML() {
    const trial = pendingTrial();
    if (!trial) return '';
    const here = state.location === trial.loc;
    const busy = trialActive();
    const hit = trialBoltDamage(trial);
    const total = hit * trialBolts(trial);
    const weak = total >= (state.hp || 0);
    return `<div class="quest-card main"><div class="small">⚡ Độ kiếp</div><b>${REALMS[trial.realm]}</b>
        <div class="small">${trialText(trial)}.${busy ? ' Đang chịu kiếp, đứng dậy là phải chịu lại từ đầu.' : ''}</div>
        <div class="small">${trialBolts(trial)} đạo lôi, mỗi đạo trừ ${formatNumber(hit)} máu, tổng ${formatNumber(total)} / máu hiện có ${formatNumber(Math.floor(state.hp || 0))}.${weak ? ' <b style="color:#ff7a7a">Không đủ máu chịu hết kiếp: rèn đồ, hồi máu trước.</b>' : ''}</div>
        ${busy ? '' : `<button class="mini-btn" onclick="startTrial()">${here ? 'Độ kiếp' : 'Đi ngay'}</button>`}</div>`;
}

/* ---------- hiệu ứng ---------- */
function trialRand(seed) {
    const v = Math.sin(seed * 127.1) * 43758.5453;
    return v - Math.floor(v);
}

function drawTrialEffect(ctx, x, y, effect, color, t) {
    const cy = y - SCENE_AVATAR_H * 0.5;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineCap = 'round';
    const glow = (r, a) => {
        const g = ctx.createRadialGradient(x, cy, 0, x, cy, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalAlpha = a;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = color;
    };
    switch (effect) {
        case 'lightning': {
            glow(70, 0.25);
            drawTrialBolt(ctx, x, y, color, t, 420, 0, glow);
            break;
        }
        case 'fire': {
            glow(80, 0.3);
            for (let i = 0; i < 22; i++) {
                const life = ((t / 900) + trialRand(i)) % 1;
                const fx = x + (trialRand(i * 3) - 0.5) * 70 * (1 - life * 0.6);
                const fy = y - life * 150;
                ctx.globalAlpha = 1 - life;
                ctx.beginPath();
                ctx.arc(fx, fy, 9 * (1 - life) + 2, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
        case 'vortex': {
            glow(90, 0.2);
            ctx.lineWidth = 2.5;
            for (let arm = 0; arm < 4; arm++) {
                ctx.beginPath();
                for (let k = 0; k <= 40; k++) {
                    const r = 120 - k * 2.6;
                    const a = t / 600 + arm * Math.PI / 2 + k * 0.12;
                    const px = x + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.45;
                    k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
                }
                ctx.globalAlpha = 0.7;
                ctx.stroke();
            }
            break;
        }
        case 'glow': {
            const pulse = 0.5 + 0.5 * Math.sin(t / 500);
            glow(90 + pulse * 40, 0.35 + pulse * 0.3);
            for (let i = 0; i < 12; i++) {
                const a = i * Math.PI / 6 + t / 3000;
                ctx.globalAlpha = 0.25 + pulse * 0.25;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x + Math.cos(a) * 50, cy + Math.sin(a) * 50);
                ctx.lineTo(x + Math.cos(a) * (110 + pulse * 30), cy + Math.sin(a) * (110 + pulse * 30));
                ctx.stroke();
            }
            break;
        }
        case 'ripple': {
            ctx.lineWidth = 3;
            for (let i = 0; i < 4; i++) {
                const p = ((t / 1600) + i / 4) % 1;
                ctx.globalAlpha = 1 - p;
                ctx.beginPath();
                ctx.ellipse(x, y, 30 + p * 170, (30 + p * 170) * 0.35, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            break;
        }
        case 'snow': {
            glow(80, 0.25);
            for (let i = 0; i < 40; i++) {
                const p = ((t / 4000) + trialRand(i)) % 1;
                const sx = x + (trialRand(i * 7) - 0.5) * 260 + Math.sin(t / 700 + i) * 10;
                ctx.globalAlpha = 0.9 - p * 0.5;
                ctx.beginPath();
                ctx.arc(sx, y - 280 + p * 300, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
        case 'starfall': {
            glow(70, 0.2);
            for (let i = 0; i < 8; i++) {
                const p = ((t / 1400) + trialRand(i)) % 1;
                const sx = x + (trialRand(i * 5) - 0.5) * 240 + p * 60;
                const sy = y - 320 + p * (320 - SCENE_AVATAR_H * 0.4);
                ctx.globalAlpha = 1 - p * 0.6;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(sx - 30, sy - 40);
                ctx.lineTo(sx, sy);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
        case 'pillar': {
            const pulse = 0.5 + 0.5 * Math.sin(t / 400);
            const w = 46 + pulse * 14;
            const g = ctx.createLinearGradient(x - w, 0, x + w, 0);
            g.addColorStop(0, 'rgba(0,0,0,0)');
            g.addColorStop(0.5, color);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.globalAlpha = 0.55 + pulse * 0.25;
            ctx.fillStyle = g;
            ctx.fillRect(x - w, y - 420, w * 2, 420);
            ctx.fillStyle = color;
            glow(70, 0.4);
            break;
        }
        case 'rings': {
            ctx.lineWidth = 3;
            for (let i = 0; i < 6; i++) {
                const show = Math.min(1, Math.max(0, (t / 900) % 8 - i));
                ctx.globalAlpha = 0.8 * show;
                ctx.beginPath();
                ctx.arc(x, cy - 10, 44 + i * 13, t / (1200 + i * 300) * (i % 2 ? -1 : 1), t / (1200 + i * 300) * (i % 2 ? -1 : 1) + Math.PI * 1.7);
                ctx.stroke();
            }
            break;
        }
        case 'chaos': {
            for (let i = 0; i < 6; i++) {
                const a = t / (700 + i * 120) + i;
                const r = 60 + 40 * Math.sin(t / 900 + i * 2);
                const g = ctx.createRadialGradient(x + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6, 0, x + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6, 70);
                g.addColorStop(0, i % 2 ? color : '#1a0b2e');
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.globalAlpha = 0.55;
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6, 70, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
    }
    if (effect !== 'lightning') drawTrialBolt(ctx, x, y, color, t, 1100, 0, glow);
    ctx.restore();
}

function drawTrialBolt(ctx, x, y, color, t, period, seed, glow, spread = 50, top = 340, width = 4) {
    const bolt = Math.floor(t / period);
    const age = (t % period) / period;
    if (age >= 0.45) return;
    const bx = x + (trialRand(bolt + seed) - 0.5) * spread;
    ctx.save();
    ctx.globalAlpha = 1 - age / 0.45;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    let px = bx, py = y - top;
    ctx.moveTo(px, py);
    for (let i = 1; i <= 8; i++) {
        py = y - top + i * (top - SCENE_AVATAR_H * 0.3) / 8;
        px = i === 8 ? x : bx + (trialRand((bolt + seed) * 9 + i) - 0.5) * 60;
        ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.lineWidth = Math.max(1, width * 0.4);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.restore();
    if (glow) glow(110, 0.5 * (1 - age / 0.45));
}

/* Hư Vô Chí Đạo ngồi đâu Đại Đạo Tịch Diệt giáng xuống đó; linh căn càng cao kiếp càng dữ, chỉ là cảnh, không trừ máu */
function tichDietActive() {
    return (state.realmIndex || 0) >= REALMS.length - 1;
}

function tichDietLevel() {
    const rank = (state.root?.rank || 0) / (ROOT_RANKS.length - 1);
    const pure = 1 / Math.max(1, state.root?.elements?.length || 1);
    return 0.4 + rank * 0.8 + pure * 0.3;
}

function drawTichDiet(ctx, x, y, t) {
    const level = tichDietLevel();
    const cy = y - SCENE_AVATAR_H * 0.5;
    const r = 120 + level * 90;
    ctx.save();
    const hole = ctx.createRadialGradient(x, cy, 0, x, cy, r);
    hole.addColorStop(0, 'rgba(0,0,0,0.85)');
    hole.addColorStop(0.55, 'rgba(20,0,40,0.5)');
    hole.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = hole;
    ctx.beginPath();
    ctx.arc(x, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    for (let i = 0; i < Math.round(3 + level * 5); i++) {
        const p = ((t / 2200) + trialRand(i + 40)) % 1;
        ctx.globalAlpha = 1 - p;
        ctx.strokeStyle = i % 2 ? '#ffffff' : '#b98cff';
        ctx.beginPath();
        ctx.ellipse(x, cy, r * (1 - p) + 10, (r * (1 - p) + 10) * 0.4, t / 4000 + i, 0, Math.PI * 2);
        ctx.stroke();
    }
    for (let i = 0; i < Math.round(30 + level * 50); i++) {
        const p = ((t / 3000) + trialRand(i * 3 + 7)) % 1;
        const a = trialRand(i * 11) * Math.PI * 2;
        const d = (1 - p) * r * 1.6;
        ctx.globalAlpha = p;
        ctx.fillStyle = i % 3 ? '#e8e0ff' : '#000';
        ctx.fillRect(x + Math.cos(a) * d, cy + Math.sin(a) * d * 0.6, 3, 3);
    }
    ctx.globalAlpha = 1;
    const bolts = Math.round(2 + level * 4);
    for (let i = 0; i < bolts; i++) {
        drawTrialBolt(ctx, x, y, ['#ffffff', '#c77dff', '#000000', '#ff4d6d', '#7ad7ff'][i % 5], t + i * 137, 520 + i * 90, i * 31, null, 120 + level * 160, 420, 3 + level * 3);
    }
    ctx.restore();
}

function drawTrialProgress(ctx, a, w, h) {
    const trial = trialFor(a.realm);
    const pct = Math.max(0, Math.min(1, 1 - a.remaining / a.total));
    ctx.fillStyle = 'rgba(0,0,0,.6)';
    ctx.fillRect(w / 2 - 160, 14, 320, 30);
    ctx.fillStyle = trial.color;
    ctx.fillRect(w / 2 - 156, 18, 312 * pct, 22);
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(`${a.label} · ${Math.floor(pct * 100)}%`, w / 2, 35);
}

if (typeof window !== 'undefined') Object.assign(window, { startTrial, pendingTrial, trialFor, drawTichDiet });
