/* ===============================
    FULL GAME: DATA / STATE / HELPERS
    =============================== */
/* --- Data: realms, stages, elements, root ranks --- */
const REALMS = [
    'Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần', 'Luyện Hư', 'Hợp Thể', 'Độ Kiếp', 'Đại Thừa',
    'Tán Tiên', 'Địa Tiên', 'Thiên Tiên', 'Chân Tiên', 'Huyền Tiên', 'Kim Tiên', 'Tiên Đế', 'Thần Cảnh Lục Nguyên', 'Đại La Kim Tiên', 'Chuẩn Thánh',
    'Thánh Nhân Cảnh', 'Chí Thánh Cảnh', 'Đại Thánh Cảnh', 'Chuẩn Thiên Cảnh',
    'Diệt Thiên Cảnh', 'Khai Thiên Cảnh', 'Toàn Thiên Cảnh', 'Cực Thiên Cảnh', 'Nghịch Thiên Cảnh', 'Sáng Thế Cảnh',
    'Hỗn Độn Đạo Giả', 'Hồng Mông Chúa Tể', 'Chung Nguyên Chí Cao'
];
const STAGES = ['Sơ Kỳ', 'Trung Kỳ', 'Hậu Kỳ', 'Đại Viên Mãn'];
const GAME_VERSION = '1.0.0';
// Expose for cross-file access
window.REALMS = REALMS;
window.STAGES = STAGES;

function colorizeElement(el) {
    switch (el) {
        case "Kim": return "🪙<span style='color:#d4af37'>Kim</span>";
        case "Mộc": return "🌿<span style='color:#4caf50'>Mộc</span>";
        case "Thủy": return "💧<span style='color:#2196f3'>Thủy</span>";
        case "Hỏa": return "🔥<span style='color:#f44336'>Hỏa</span>";
        case "Thổ": return "🪨<span style='color:#b8860b'>Thổ</span>";
        case "Hỗn Nguyên": return "🌈<span style='color:#ff69b4'>Hỗn Nguyên</span>";
        default: return el;
    }
}

const ROOT_RANKS = [
    'Phế Phẩm', 'Hạ Phẩm', 'Trung Phẩm',
    'Thượng Phẩm', 'Huyền Phẩm', 'Địa Phẩm',
    'Thiên Phẩm', 'Hậu Thiên Phẩm', 'Tiên thiên Phẩm',
    'Hỗn Độn Phẩm'
];

const COLOR_MAP = {
    'Luyện Khí': '#aaa', 'Trúc Cơ': '#8bc34a', 'Kim Đan': '#ffca28', 'Nguyên Anh': '#ff9800',
    'Hóa Thần': '#e64a19', 'Luyện Hư': '#ff5722', 'Hợp Thể': '#f06292', 'Độ Kiếp': '#ba68c8',
    'Đại Thừa': '#9575cd', 'Tán Tiên': '#4fc3f7', 'Địa Tiên': '#29b6f6', 'Thiên Tiên': '#0288d1',
    'Chân Tiên': '#0277bd', 'Huyền Tiên': '#0069c0', 'Kim Tiên': '#cddc39', 'Tiên Đế': '#d4af37', 'Thần Cảnh Lục Nguyên': '#e0b84a', 'Đại La Kim Tiên': '#f0c75e', 'Chuẩn Thánh': '#ffd98a',
    'Thánh Nhân Cảnh': '#e53935', 'Chí Thánh Cảnh': '#c62828', 'Đại Thánh Cảnh': '#b71c1c',
    'Chuẩn Thiên Cảnh': '#880e4f', 'Diệt Thiên Cảnh': '#6a1b9a', 'Khai Thiên Cảnh': '#4527a0',
    'Toàn Thiên Cảnh': '#283593', 'Cực Thiên Cảnh': '#1a237e', 'Nghịch Thiên Cảnh': '#d81b60',
    'Sáng Thế Cảnh': '#ff4081', 'Hỗn Độn Đạo Giả': '#00bcd4', 'Hồng Mông Chúa Tể': '#00e5ff',
    'Chung Nguyên Chí Cao': '#ffffff',
    'Sơ Kỳ': '#9e9e9e', 'Trung Kỳ': '#4caf50', 'Hậu Kỳ': '#2196f3', 'Đại Viên Mãn': '#ffc107',
    'Phế Phẩm': '#777', 'Hạ Phẩm': '#8d6e63', 'Trung Phẩm': '#00acc1', 'Thượng Phẩm': '#43a047',
    'Huyền Phẩm': '#7e57c2', 'Địa Phẩm': '#8bc34a', 'Thiên Phẩm': '#ffeb3b',
    'Hậu Thiên Phẩm': '#fbc02d', 'Tiên thiên Phẩm': '#fdd835', 'Hỗn Độn Phẩm': '#e0f7fa',
    'Thánh Nhân': '#ff5722', 'Phẫn Nộ': '#f44336', 'Khinh Miệt': '#9e9e9e', 'Bình Thường': '#607d8b',
    'phẫn nộ': '#f44336', 'khinh miệt': '#9e9e9e', 'bình thường': '#607d8b', 'Thống lĩnh': '#ff9800',
    'Tinh anh': '#ff9800', 'Bình thường': '#607d8b'
};
const COLOR_PATTERN = new RegExp(Object.keys(COLOR_MAP).join('|'), 'g');
function colorizeWithMap(text = '') {
    return String(text).replace(COLOR_PATTERN, (match) =>
        `<span style="color:${COLOR_MAP[match]}; font-weight:600;">${match}</span>`
    );
}

const MOBILE_STYLE_ID = 'mobile-compact-style';
function injectMobileStyles() {
    if (typeof document === 'undefined' || document.getElementById(MOBILE_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = MOBILE_STYLE_ID;
    style.textContent = `
        @media (max-width: 768px) {
            body { font-size: 13px; line-height: 1.4; }
            .app { padding: 10px; gap: 12px; }
            header h1 { font-size: 1.35rem; margin-bottom: 6px; }
            .controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
            .controls button { font-size: 0.78rem; padding: 8px 6px; border-radius: 8px; }
            #statsTop { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
            #statsTop .stat { padding: 8px 10px; border-radius: 10px; background: rgba(15, 23, 36, 0.78); }
            #statsTop .stat b { font-size: 0.85rem; }
            #statsTop .stat .badge { font-size: 0.7rem; padding: 2px 6px; }
            #statsTop .stat .bar { height: 6px; }
            #statsTop .stat.name-box { grid-column: span 2; }
            #log { max-height: 42vh; font-size: 0.8rem; overflow-y: auto; }
            #log div { margin-bottom: 4px; }
            .grid { display: flex; flex-direction: column; gap: 12px; }
            .grid > div { display: contents; }
            .panel { margin-bottom: 12px; }
            .panel-combat { order: 0; }
            .panel-log { order: 1; }
            .panel-inventory { order: 2; }
            .panel-realm { order: 3; }
            #currentEnemy, #battleInfo, #rootTable { font-size: 0.82rem; }
            #inventory { margin-top: 12px; }
            #inventoryFilter { display: flex; flex-direction: column; gap: 0px; }
            #inventoryFilter .inventory-filter-row { display: flex; flex-direction: column; gap: 0px; align-items: stretch; }
            #inventoryFilter label { font-size: 0.78rem; letter-spacing: 0.05em; text-transform: uppercase; align-content: center; }
            #inventoryFilter select { width: 100%; padding: 0px 10px; border-radius: 8px; font-size: 0.82rem; }
            #inventoryFilter .equip-all-btn { width: 100%; padding: 8px 0; font-size: 0.82rem; border-radius: 8px; }
            .equip-all-btn { width: 100%; }
            #inventoryItems .item { padding: 10px; margin-bottom: 10px; border-radius: 12px; background: rgba(15, 23, 36, 0.6); }
            #inventoryItems .item b { font-size: 0.9rem; }
            #inventoryItems .item .small { font-size: 0.78rem; }
            .inv-buttons { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin-top: 8px; }
            .inv-buttons button { font-size: 0.78rem; padding: 8px 6px; border-radius: 8px; }
            .inv-buttons button:nth-child(n+3) { grid-column: span 2; }
            #inventoryPagination { display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 0.78rem; margin-top: 6px; }
            #inventoryPagination button { padding: 6px 12px; font-size: 0.78rem; }
            #shopModal > div { max-width: 360px !important; width: 100% !important; padding: 14px 16px !important; }
            #shopModalList { max-height: 60vh !important; }
            #shopModalList .shop-item { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
            #shopModalList .shop-item > div { width: 100% !important; text-align: left !important; }
            #shopModalList .shop-item > div:last-child { display: flex !important; flex-direction: column; align-items: stretch; gap: 6px; margin-left: 0px !important; }
            #shopModalList .shop-item button { width: 100%; padding: 8px 0; font-size: 0.82rem;margin-left: 0px; }
            #rootTable .small { font-size: 0.78rem; }
        }
    `;
    document.head.appendChild(style);
}
injectMobileStyles();

/* --- Mysteries / NPC --- */
const MYSTERIES = [
    { name: 'Vườn Linh Thảo', type: 'good', desc: 'Tìm dược liệu hiếm' },
    { name: 'Ngõ Hắc Ám', type: 'bad', desc: 'Cạm bẫy' },
    { name: 'Động Pháp Tạng', type: 'good', desc: 'Nhận pháp bảo/đan' },
    { name: 'Giếng Linh', type: 'bad', desc: 'Nhiễm độc' },
    { name: 'Lão Sư Ẩn', type: 'npc', desc: 'NPC ẩn có lựa chọn' }
];
const ADMIN_NAMES = ["YYurX1qvIZQQcuUuO4Cg"];
const ADMIN_DISPLAY_NAME = "Thiên Đạo Chí Tôn";

/* Tên admin bị đổi lúc tạo nhân vật nên phải giữ cờ riêng; save cũ nhận ra bằng tên hiển thị và linh căn Hỗn Độn */
function isGameAdmin() {
    return !!state.isAdmin || (state.name === ADMIN_DISPLAY_NAME && state.root?.rank === 9);
}


function randomRootRank() {
    const total = 100;
    const roll = Math.random() * total;
    // return 9;
    if (state.name && ADMIN_NAMES.includes(state.name)) {
        return 9;
    }

    if (roll < 40) return 0;    // 40% Phế
    if (roll < 60) return 1;    // 20% Hạ
    if (roll < 75) return 2;    // 15% Trung
    if (roll < 85) return 3;    // 10% Thượng
    if (roll < 92) return 4;    // 7% Huyền
    if (roll < 97) return 5;    // 5% Địa
    if (roll < 99) return 6;    // 2% Thiên
    if (roll < 99.7) return 7;  // 0.7% Hậu Thiên
    if (roll < 99.95) return 8; // 0.25% Tiên Thiên
    return 9;                   // 0.05% Hỗn Độn
}

function randomElements() {
    // 🎲 Xác định số lượng căn (theo ý trời)
    // 1 căn: 60% | 2 căn: 20% | 3 căn: 10% | 4 căn: 7% | 5 căn: 3%
    const roll = Math.random();
    let count = 1;
    if (state.name && ADMIN_NAMES.includes(state.name)) {
        count = 5;
    }
    else {
        if (roll < 0.6) count = 1;
        else if (roll < 0.8) count = 2;
        else if (roll < 0.9) count = 3;
        else if (roll < 0.97) count = 4;
        else count = 5; // 🌀 Ngũ linh căn – Hỗn Nguyên chi thể!
    }
    // 🪶 Sao chép ngũ hành để tránh trùng
    const pool = [...ELEMENTS];
    const result = [];

    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * pool.length);
        result.push(pool.splice(index, 1)[0]); // lấy và xóa để không trùng
    }

    return result;
}

let startRootRank;
let startRootElement;

/* --- Game state --- */
let state = createDefaultState();

function createDefaultState() {
    return {
        realmIndex: 0,
        realmStage: 0,
        xp: 0,
        hp: 120,
        maxHp: 120,
        power: 15,
        defense: 5,
        gold: 200,
        inventory: [],
        root: {},
        age: START_AGE,
        maxAge: 200,
        autoTrain: false,
        autoFight: false,
        currentEnemy: null,
        board: [null, null, null, null, null, null],
        exploreCooldown: false,
        npcInteractionLock: false,
        luckBonus: 0,
        specialTicks: [],
        lastXpGain: 0
    };
}

window.addEventListener("load", () => {
    const input = document.getElementById("playerNameInput");
    const btn = document.getElementById("startBtn");

    const savedProfileId = localStorage.getItem('tt_profileId');
    if (savedProfileId && !state.profileId) state.profileId = savedProfileId;

    if (typeof initFriendsSystem === 'function') initFriendsSystem();

    if (hasSavedGame()) {
        loadProgress(true);
        fadeOutStartScreen();
        return;
    }

    renderCharacterCreator(document.getElementById('creatorHost'));
    renderRacePicker();

    btn.addEventListener("click", () => {
        const val = input.value.trim();
        if (!val) {
            showToast('Ngươi chưa khai báo đạo danh!', 'warn');
            return;
        }
        state.name = val;
        localStorage.setItem("playerName", val);

        state.__rootStoryShown = false;
        btn.disabled = true;
        btn.innerText = 'Đang khởi tạo...';
        document.getElementById('creatorHost').style.display = 'none';
        document.getElementById('raceHost').style.display = 'none';
        startRootRank = randomRootRank();
        startRootElement = randomElements();
        state.root.elements = startRootElement;
        state.root.rank = startRootRank;
        state.gold = goldRef(0) * 30;
        if (state.name && ADMIN_NAMES.includes(state.name)) {
            state.name = ADMIN_DISPLAY_NAME;
            state.isAdmin = true;
            state.gold = 9999999999999;
        }
        const script = buildRootStoryScript();

        initStarter();
        renderAllImmediate();
        if (state.name !== "Thiên Đạo Chí Tôn") {
            announceRootStory(true);
            playIntroNarration(script).then(() => {
                setTimeout(() => {
                    fadeOutStartScreen();
                    startMainStory();
                }, 1000);
            });
        } else {
            fadeOutStartScreen();
            startMainStory();
        }
    });
});


/* ===========================
    KIỂM TRA THỌ NGUYÊN — TU SĨ HẾT THỌ TẮC TỬ
   =========================== */
function checkLongevity() {
    if (state.age >= state.maxAge) {
        log('⚰️ Tuổi thọ đã vượt quá cực hạn! Nguyên thần tán, thân thể hóa tro bụi...');
        loseByLongevity();
    }
}

function loseByLongevity() {
    if (state.dead) return;
    state.dead = true;
    state.hp = 0;
    state.autoTrain = false;
    state.autoFight = false;
    disableAllButtons();
    log('☠️ Người đã tử vong do cạn thọ nguyên. Thân thể hóa tro bụi...');
    showRebirthButton('cạn thọ nguyên');
}


function disableAllButtons() {
    document.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

function enableAllButtons() {
    document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

function updateAgeDisplay() {
    const ageTxt = $('ageTxt');
    const ageBar = $('ageBar');

    if (ageTxt) {
        writeText(ageTxt, `${Math.floor(state.age)} / ${formatNumber(state.maxAge)}`);
    }

    if (ageBar) {
        const agePercent = Math.min(100, Math.round(state.age / state.maxAge * 100));
        ageBar.style.width = `${agePercent}%`;
    }
}



function showRebirthButton(deathReason = 'không rõ nguyên nhân', killInfo = null) {
    // Tạo overlay popup kết thúc giống như màn hình khởi đầu
    const overlay = document.createElement('div');
    overlay.id = 'ending-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.9)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';

    const container = document.createElement('div');
    container.id = 'ending-screen';
    container.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    container.style.borderRadius = '16px';
    container.style.padding = '40px';
    container.style.maxWidth = '550px';
    container.style.width = '90%';
    container.style.textAlign = 'center';
    container.style.boxShadow = '0 0 60px rgba(230, 201, 122, 0.3)';
    container.style.border = '2px solid #e6c97a';
    container.style.maxHeight = '90vh';
    container.style.overflowY = 'auto';

    const realmName = REALMS[state.realmIndex] || 'Luyện Khí';
    const stageName = STAGES[state.realmStage] || 'Sơ Kỳ';
    const rootRankName = ROOT_RANKS[state.root?.rank || 0] || 'Phế Phẩm';
    const elements = state.root?.elements?.join(', ') || 'Vô căn';

    // Map death reason to display text
    const deathReasonText = {
        'cạn thọ nguyên': 'Tuổi thọ đã cạn kiệt, nguyên thần tán thể...',
        'ngã gục trong chiến đấu': 'Đạo tâm tan rà, thân thể ngã gục trên chiến trường...'
    }[deathReason] || 'Nguyên nhân không rõ...';

    // Build kill info HTML if available
    let killInfoHtml = '';
    if (killInfo && killInfo.enemyName) {
        killInfoHtml = `
            <div style="background: rgba(255,0,0,0.15); border: 1px solid rgba(255,100,100,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px; text-align: left;">
                <div style="color: #ff6b6b; font-weight: bold; margin-bottom: 8px;">☠️ Thông tin tử vong</div>
                <div style="color: #ccc; line-height: 1.6;">
                    <div><b style="color: #ff9999;">Kẻ thù:</b> ${colorizeWithMap(killInfo.enemyName)}</div>
                    <div><b style="color: #ff9999;">Phương thức:</b> ${killInfo.killMethod || 'không rõ'}</div>
                </div>
            </div>
        `;
    }

    // Nút toggle xem nhật ký
    const toggleLogBtnId = 'toggleDeathLogBtn';
    const logContainerId = 'deathLogContainer';

    container.innerHTML = `
        <h2 style="color: #e6c97a; font-size: 2em; margin-bottom: 10px;">☠️ Ngọa Long Túc</h2>
        <p style="color: #ff6b6b; font-style: italic; margin-bottom: 20px;">${deathReasonText}</p>

        ${killInfoHtml}

        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 15px; text-align: left;">
            <h3 style="color: #e6c97a; margin-bottom: 15px; text-align: center;">📜 Nhật ký tu luyện</h3>
            <div style="color: #ccc; line-height: 1.8;">
                <div><b style="color: #e6c97a;">Đạo danh:</b> ${state.name || 'Vô Danh Tu Sĩ'}</div>
                <div><b style="color: #e6c97a;">Cảnh giới đạt được:</b> ${colorizeWithMap(realmName)} ${colorizeWithMap(stageName)}</div>
                <div><b style="color: #e6c97a;">Linh căn:</b> ${elements} (${colorizeWithMap(rootRankName)})</div>
                <div><b style="color: #e6c97a;">Tuổi thọ:</b> ${Math.floor(state.age)} / ${state.maxAge}</div>
                <div><b style="color: #e6c97a;">Linh thạch tích lũy:</b> ${state.gold}</div>
                <div><b style="color: #e6c97a;">Sức mạnh tối đa:</b> ${state.totalPower || state.power}</div>
                <div><b style="color: #e6c97a;">Kho đồ:</b> ${state.inventory.length} vật phẩm</div>
            </div>
        </div>

        <button id="${toggleLogBtnId}" style="
            padding: 10px 20px;
            font-size: 1em;
            border-radius: 8px;
            background: rgba(230, 201, 122, 0.2);
            color: #e6c97a;
            border: 1px solid #e6c97a;
            cursor: pointer;
            margin-bottom: 10px;
            transition: all 0.2s;
        ">📜 Xem nhật ký tu luyện</button>

        <div id="${logContainerId}" style="display: none; max-height: 200px; overflow-y: auto; background: rgba(0,0,0,0.4); border-radius: 8px; padding: 10px; margin-bottom: 15px; text-align: left;"></div>

        <div style="margin-top: 15px;">
            <button id="trungSinhBtn" style="
                padding: 15px 40px;
                font-size: 1.2em;
                border-radius: 10px;
                background: linear-gradient(135deg, #b8860b, #e6c97a);
                color: #1a1a2e;
                border: none;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 4px 20px rgba(230, 201, 122, 0.4);
                transition: transform 0.2s, box-shadow 0.2s;
            ">🔁 Trùng sinh</button>
            <p style="color: #666; font-size: 0.85em; margin-top: 10px;">Bắt đầu một vòng luân hồi mới</p>
        </div>
    `;

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Add hover effect
    const trungSinhBtn = document.getElementById('trungSinhBtn');
    trungSinhBtn.addEventListener('mouseenter', () => {
        trungSinhBtn.style.transform = 'scale(1.05)';
        trungSinhBtn.style.boxShadow = '0 6px 30px rgba(230, 201, 122, 0.6)';
    });
    trungSinhBtn.addEventListener('mouseleave', () => {
        trungSinhBtn.style.transform = 'scale(1)';
        trungSinhBtn.style.boxShadow = '0 4px 20px rgba(230, 201, 122, 0.4)';
    });

    // 🆕 Toggle xem nhật ký tu luyện
    const toggleLogBtn = document.getElementById(toggleLogBtnId);
    const logContainer = document.getElementById(logContainerId);
    let logVisible = false;

    toggleLogBtn.addEventListener('click', () => {
        logVisible = !logVisible;
        if (logVisible) {
            // Hiển thị nhật ký
            logContainer.style.display = 'block';
            toggleLogBtn.innerText = '📕 Ẩn nhật ký tu luyện';
            toggleLogBtn.style.background = 'rgba(230, 201, 122, 0.4)';

            // Build log content from cultivation log history
            const logHistory = window.__cultivationLog || [];
            const initCount = typeof __initLogCount !== 'undefined' ? __initLogCount : 0;

            if (logHistory.length === 0) {
                logContainer.innerHTML = '<div style="color: #888; font-style: italic;">Không có nhật ký nào được ghi lại.</div>';
            } else {
                // Lọc bỏ các dòng log khởi tạo, chỉ hiển thị log thực tế
                let logHtml = '';
                const gameLogs = logHistory.slice(initCount);
                gameLogs.forEach(entry => {
                    logHtml += `<div style="color: #ccc; margin-bottom: 6px;">★ ${entry.time} — ${entry.coloredMsg || entry.msg}</div>`;
                });
                logContainer.innerHTML = logHtml || '<div style="color: #888; font-style: italic;">Không có nhật ký nào được ghi lại.</div>';
            }
        } else {
            // Ẩn nhật ký
            logContainer.style.display = 'none';
            toggleLogBtn.innerText = '📜 Xem nhật ký tu luyện';
            toggleLogBtn.style.background = 'rgba(230, 201, 122, 0.2)';
        }
    });

    // Trùng sinh button - reset everything like a new game
    trungSinhBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            overlay.remove();
            rebirth(); // Reset state
            // Show start screen again for new game
            showStartScreenForRebirth();
        }, 500);
    });

    // Fade in animation
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s';
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });
}

// Hiển thị màn hình khởi đầu sau khi trùng sinh
function showStartScreenForRebirth() {
    // Xóa tất cả localStorage để reset hoàn toàn
    try {
        localStorage.removeItem('playerName');
        localStorage.removeItem(SAVE_KEY);
    } catch(e) {}
    window.__skipAutosave = true;

    // Tải lại trang để bắt đầu mới hoàn toàn
    location.reload();
}

const TOAST_HOST_ID = 'toastLayer';
function showToast(message, variant = 'info') {
    if (typeof document === 'undefined') return;
    const host = document.getElementById(TOAST_HOST_ID);
    if (!host) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${variant}`;
    toast.textContent = message;
    host.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 200);
    }, 2600);
}
if (typeof window !== 'undefined') window.showToast = showToast;

const CONFIRM_HOST_ID = 'confirmLayer';
function showDialog({ message = '', buttons = [] } = {}) {
    if (typeof document === 'undefined') {
        const primary = buttons.find(btn => btn.variant === 'primary') ?? buttons[0];
        return Promise.resolve(primary?.value ?? null);
    }
    const host = document.getElementById(CONFIRM_HOST_ID);
    if (!host) return Promise.resolve(null);
    const safeButtons = buttons.length ? buttons : [{ text: 'OK', value: true, variant: 'primary' }];
    host.innerHTML = `
        <div class="confirm-box">
            <p>${message}</p>
            <div class="confirm-actions">
                ${safeButtons.map((btn, idx) =>
        `<button data-idx="${idx}" class="${btn.variant === 'primary' ? 'confirm' : ''}">
                        ${btn.text}
                    </button>`
    ).join('')}
            </div>
        </div>`;
    host.style.display = 'flex';
    return new Promise(resolve => {
        const teardown = (value) => {
            host.style.display = 'none';
            host.innerHTML = '';
            resolve(value);
        };
        safeButtons.forEach((btn, idx) => {
            const el = host.querySelector(`button[data-idx="${idx}"]`);
            if (el) el.onclick = () => teardown(btn.value ?? idx);
        });
        host.onclick = (ev) => { if (ev.target === host) teardown(null); };
    });
}
if (typeof window !== 'undefined') window.showDialog = showDialog;

function showConfirm(message, options) {
    const { confirmText = 'Đồng ý', cancelText = 'Hủy bỏ' } = options || {};
    return showDialog({
        message,
        buttons: [
            { text: cancelText, value: false },
            { text: confirmText, value: true, variant: 'primary' }
        ]
    });
}

async function clearSavedProfile() {
    const ok = await showConfirm('Xóa đạo danh đã lưu và tải lại trò chơi?');
    if (!ok) return;
    try {
        localStorage.removeItem('playerName');
        localStorage.removeItem(SAVE_KEY);
    } catch { }
    window.__skipAutosave = true;
    log('🧹 Đã xóa đạo danh và save cũ. Đang tải lại...');
    setTimeout(() => location.reload(), 150);
}

function rebirth() {
    const logBox = $('log');
    if (logBox) logBox.innerHTML = '';
    window.__skipAutosave = true;
    log('🔥 Một vòng luân hồi mới bắt đầu — Thiên Đạo chuyển sinh!');
}



/* --- Helpers DOM & log --- */
function $(id) { return document.getElementById(id); }

// 🌟 Format huge numbers to readable format (e.g., 1.69T, 7.72e76, etc.)
function formatNumber(num) {
    if (!Number.isFinite(num)) return '0';
    if (num === 0) return '0';

    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    // Handle truly astronomical numbers (e >= 15)
    if (abs >= 1e15) {
        const exp = Math.floor(Math.log10(abs));
        const mantissa = abs / Math.pow(10, exp);
        if (exp >= 100) {
            // Ultra astronomical - cleaner format
            return sign + mantissa.toFixed(2) + 'e' + exp;
        }
        return sign + mantissa.toFixed(2) + 'e' + exp;
    }

    // Large number abbreviations
    if (abs >= 1e12) return sign + (abs / 1e12).toFixed(2) + 'T';
    if (abs >= 1e9) return sign + (abs / 1e9).toFixed(2) + 'B';
    if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + 'M';
    return sign + Math.floor(abs).toLocaleString();
}

// 🌟 Lịch sử nhật ký tu luyện để hiển thị khi chết
if (typeof window !== 'undefined') {
    window.__cultivationLog = [];
}

// Lưu số dòng log khởi tạo (không tính dòng "Game đã khởi tạo")
let __initLogCount = 0;
function countInitLogs() {
    const el = $('log');
    if (el) __initLogCount = el.children.length;
}

const LOG_LIMIT = 200;
const LOG_STICK_PX = 40;

function log(msg) {
    const el = $('log');
    const time = new Date().toLocaleTimeString();
    const coloredMsg = colorizeWithMap(msg);

    // 🌟 Thêm giờ và render vào nhật ký
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < LOG_STICK_PX;
    el.insertAdjacentHTML('beforeend', `<div>★ ${time} — ${coloredMsg}</div>`);
    while (el.childElementCount > LOG_LIMIT) el.firstElementChild.remove();
    if (atBottom) el.scrollTop = el.scrollHeight;

    // 🌟 Lưu vào lịch sử để hiển thị khi chết
    if (typeof window !== 'undefined') {
        if (!window.__cultivationLog) window.__cultivationLog = [];
        window.__cultivationLog.push({ time, msg, coloredMsg });
        if (window.__cultivationLog.length > LOG_LIMIT) window.__cultivationLog.shift();
    }
}



/* ===========================
AUTO TRAIN / AUTO FIGHT
- train tick grants xp and
=========================== */
let trainTimer = null, fightTimer = null;
window._autoFightOn = !!window._autoFightOn;
function startAutoTrain() {
    state.autoTrain = true;
}

function writeText(el, text) {
    if (el && el.textContent !== text) el.textContent = text;
}

function writeHtml(el, html) {
    if (el && el.__html !== html) {
        el.__html = html;
        el.innerHTML = html;
    }
}

function updateTrainingUI() {
    // Cập nhật thanh XP
    const need = getNeed();
    const xpTxt = $('xpTxt');
    const xpBar = $('xpBar');

    if (xpTxt) {
        const xpGain = Number.isFinite(state.lastXpGain) ? state.lastXpGain : 0;
        const gainLabel = xpGain === 0 ? '' : ` (${xpGain >= 0 ? '+' : ''}${formatNumber(xpGain)})`;
        writeText(xpTxt, `${formatNumber(state.xp)}${gainLabel} / ${formatNumber(need)}`);
    }

    if (xpBar) {
        const xpPercent = Math.min(100, Math.round(state.xp / need * 100));
        xpBar.style.width = `${xpPercent}%`;
    }

    // Cập nhật dự đoán tu vi
    const predEl = $('xpPrediction');
    if (predEl) {
        const pred = getRealmPrediction();
        if (state.realmStage === 3 && state.xp >= need && typeof getBreakthroughGate === 'function' && getBreakthroughGate(state.realmIndex + 1)) {
            writeHtml(predEl, `<span style="color:#ff9f7a">🚧 Bình cảnh: ${getBreakthroughGate(state.realmIndex + 1).title}</span>`);
        } else if (pred) {
            let html = '';
            if (pred.small) {
                const nextStageName = STAGES[state.realmStage + 1] || '';
                html += `<span style="color:#7fbf7f">→ ${nextStageName}: ${pred.small.timeText}</span>`;
            }
            if (pred.big) {
                html += `<span style="color:#f0c674">→ ${pred.big.nextRealm}: ${pred.big.timeText}</span>`;
            }
            writeHtml(predEl, html);
        } else {
            writeHtml(predEl, '');
        }
    }

    // Cập nhật tuổi thọ (nếu bị giảm)
    updateAgeDisplay();
}
function stopAutoTrain() { state.autoTrain = false; }

const PVP_AUTO_TURN_MS = 800;

function startAutoFight() {
    window._autoFightOn = true;
    try { $('autoFight').innerText = 'Tắt auto chiến'; } catch { }
    updateAutoFightLoop();
}
function stopAutoFight(force = true) {
    if (fightTimer) {
        clearInterval(fightTimer);
        fightTimer = null;
    }
    if (force) {
        window._autoFightOn = false;
        try { $('autoFight').innerText = 'Bật auto chiến'; } catch { }
    }
}
function updateAutoFightLoop() {
    if (!window._autoFightOn) {
        if (fightTimer) {
            clearInterval(fightTimer);
            fightTimer = null;
        }
        return;
    }
    if (!state.currentEnemy) {
        if (fightTimer) {
            clearInterval(fightTimer);
            fightTimer = null;
        }
        return;
    }
    if (fightTimer) return;

    fightTimer = setInterval(() => {
        if (!window._autoFightOn) {
            stopAutoFight();
            return;
        }
        if (!state.currentEnemy) {
            stopAutoFight(false);
            return;
        }

        // 🎴 PvE enemies are handled by the real-time board auto-battle; the
        // legacy turn loop only drives PvP now.
        if (!state.currentEnemy.isPvP) {
            if (typeof runBoardBattle === 'function' && !(window.__boardBattle && window.__boardBattle.running)) {
                runBoardBattle();
            }
            return;
        }

        if (pvpSession.myTurn) pvpAttackOrLocal();
    }, PVP_AUTO_TURN_MS);
}
window.updateAutoFightLoop = updateAutoFightLoop;

/* ===========================
   RENDERING UI
   =========================== */
let _renderAllQueued = false;
function renderAllImmediate() {
    if (typeof ensureBoardState === 'function') ensureBoardState();
    renderTopStats();
    renderInventory();
    renderShop();
    if (state.currentEnemy) syncEnemyToRealm(state.currentEnemy);
    if (typeof renderBoardArena === 'function') renderBoardArena();
    renderRootTable();
    if (typeof renderWorldPanels === 'function') renderWorldPanels();

    // 🆕 Render friends UI
    if (typeof renderFriendsUI === 'function') {
        renderFriendsUI();
    }

    checkLongevity();
    updateAutoFightLoop();

    const wasActive = !!window._battleActive;
    if (state.currentEnemy) {
        if (!wasActive) {
            window._battleActive = true;
            if (window.stopAutoTrainingHard) window.stopAutoTrainingHard();
            if (window._findingMatch) {
                window._findingMatch = false;
                const b = $('findMatch'); if (b) b.innerText = 'Tìm đối thủ PvP';
                if (typeof wsSend === 'function') wsSend({ type: 'cancel_find' });
            }
        }
    } else if (wasActive) {
        window._battleActive = false;
    }

    // 🎴 Auto-start the board auto-battle for fresh PvE enemies
    if (state.currentEnemy && !state.currentEnemy.isPvP && state.currentEnemy.hp > 0
        && typeof runBoardBattle === 'function'
        && !(window.__boardBattle && window.__boardBattle.running)) {
        runBoardBattle();
    }
}

function renderAll() {
    if (_renderAllQueued) return;
    _renderAllQueued = true;
    const scheduler = (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function')
        ? window.requestAnimationFrame.bind(window)
        : (cb) => setTimeout(cb, 16);
    scheduler(() => {
        _renderAllQueued = false;
        renderAllImmediate();
    });
}
if (typeof window !== 'undefined') window.renderAllImmediate = renderAllImmediate;

function syncEnemyToRealm(enemy) {
    return enemy;
}

if (typeof window !== 'undefined') window.syncEnemyToRealm = syncEnemyToRealm;

function bodyStats() {
    const rootKeep = 1 - (state.flaw || 0) / 100;
    const bloodMult = (state.bloodBuffUntil || 0) > Date.now() ? BLOOD_BUFF_MULT : 1;
    return {
        baseHp: Math.floor(state.maxHp * rootKeep * raceOf().hp),
        basePower: Math.floor(state.power * rootKeep * bloodMult),
        baseDef: Math.floor(state.defense * rootKeep * raceOf().def)
    };
}

function recalculateStats() {
    // Chỉ số gốc
    const { baseHp, basePower, baseDef } = bodyStats();

    // Bonus từ trang bị
    const bonusHp = getEquippedHp();
    const bonusAtk = getEquippedAtk();
    const bonusDef = getEquippedDef();

    // Tổng hợp
    const newTotalMaxHp = baseHp + bonusHp;
    const hpIncrease = newTotalMaxHp - (state.totalMaxHp || baseHp);

    state.totalPower = basePower + bonusAtk;
    state.totalDef = baseDef + bonusDef;
    state.totalMaxHp = newTotalMaxHp;

    // Nếu giáp làm tăng HP tối đa → hồi tương ứng phần mới
    if (hpIncrease > 0) {
        state.hp += hpIncrease;
        if (state.hp > state.totalMaxHp) state.hp = state.totalMaxHp;
    } else if (state.hp > state.totalMaxHp) {
        // Nếu tháo giáp mà HP > max mới thì giảm xuống
        state.hp = state.totalMaxHp;
    }
}

function renderTopStats() {
    recalculateStats();

    const atkBonus = getEquippedAtk();
    const hpBonus = getEquippedHp();
    const defBonus = getEquippedDef();

    const top = $('statsTop');
    const need = getNeed();
    const realmDisplay = colorizeWithMap(REALMS[state.realmIndex]);
    const stageDisplay = colorizeWithMap(STAGES[state.realmStage]);
    const rootRankDisplay = colorizeWithMap(ROOT_RANKS[state.root.rank]);

    const powerDisplay = `${formatNumber(state.totalPower)}${atkBonus > 0 ? ` (+${formatNumber(atkBonus)})` : ''}`;
    const defDisplay = `${formatNumber(state.totalDef)}${defBonus > 0 ? ` (+${formatNumber(defBonus)})` : ''}`;
    const hpDisplay = `${formatNumber(Math.floor(state.hp))} / ${formatNumber(state.totalMaxHp)}${hpBonus > 0 ? ` (+${formatNumber(hpBonus)})` : ''}`;

    // 🧙‍♂️ Lấy đạo danh và ID
    const playerName = state.name || localStorage.getItem("playerName") || "Vô Danh Tu Sĩ";
    const playerId = state.profileId || buildPublicProfile().id;

    const xpGain = Number.isFinite(state.lastXpGain) ? state.lastXpGain : 0;
    const gainLabel = xpGain === 0 ? '' : ` (${xpGain >= 0 ? '+' : ''}${formatNumber(xpGain)})`;

    top.innerHTML = `
        <div class="stat name-box">
            <b>Đạo danh</b>
            <div id="playerName" style="font-weight:bold; color:#e6c97a; font-size:1.1em;">
                ${playerName}
            </div>
            <div class="small" style="color:#888; margin-top:4px; cursor:pointer;"
                 onclick="copyPlayerId()" title="Click để copy ID">
                ID: <span id="playerIdDisplay">${playerId.substring(0, 16)}...</span>
                <button onclick="copyPlayerId(event)" style="padding:2px 8px; font-size:0.75em; margin-left:4px;">📋</button>
            </div>
        </div>

        <div class="stat"><b>Cảnh giới</b>
            <div>${realmDisplay}
            <span class="badge">${stageDisplay}</span></div>
        </div>

        <div class="stat"><b>Tu vi</b>
            <div id="xpTxt">${formatNumber(state.xp)}${gainLabel} / ${formatNumber(need)}</div>
            <div class="bar"><i id="xpBar" style="width:${Math.min(100, Math.round(state.xp / need * 100))}%"></i></div>
            <div id="xpPrediction" class="small" style="color:#7a9fcd;margin-top:4px;"></div>
        </div>

        <div class="stat"><b>HP</b>
            <div id="hpTxt">${hpDisplay}</div>
            <div class="bar"><i id="hpBar" style="width:${Math.round(state.hp / state.totalMaxHp * 100)}%"></i></div>
        </div>

        <div class="stat"><b>Sức mạnh</b>
            <div id="powerTxt">${powerDisplay}</div>
        </div>

        <div class="stat"><b>Bản thể / Trang bị</b>
            ${renderPowerShareBar()}
        </div>

        <div class="stat"><b>Phòng thủ</b>
            <div id="defTxt">${defDisplay}</div>
        </div>

        <div class="stat"><b>Linh căn</b>
            <div id="rootTxt">${state.root.elements.map(colorizeElement).join(' ')} (${rootRankDisplay})${state.flaw ? ` · Căn cơ ${100 - state.flaw}%` : ''}</div>
        </div>

        <div class="stat"><b>Tuổi thọ</b>
            <div id="ageTxt">${Math.floor(state.age)} / ${formatNumber(state.maxAge)}</div>
            <div class="bar"><i id="ageBar" style="width:${Math.min(100, Math.round(state.age / state.maxAge * 100))}%"></i></div>
        </div>

        <div class="stat"><b>Linh thạch</b>
            <div id="goldTxt">${formatNumber(state.gold)}</div>
        </div>

        <div class="stat" style="grid-column:span 2; text-align:center;">
            <button onclick="showStatDetails()" style="background:rgba(230,201,122,0.15);border:1px solid rgba(230,201,122,0.4);color:#e6c97a;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:0.85em;">
                📊 Chi tiết chỉ số
            </button>
        </div>
    `;
}

// 📊 STAT DETAILS MODAL - Detailed breakdown like Linh Bảo display
function showStatDetails() {
    let modal = document.getElementById('statDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'statDetailModal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:none;align-items:center;justify-content:center;z-index:10000;';
        document.body.appendChild(modal);
    }

    recalculateStats();

    // Calculate bonuses
    const { baseHp, basePower, baseDef } = bodyStats();
    const equipHp = getEquippedHp();
    const equipAtk = getEquippedAtk();
    const equipDef = getEquippedDef();

    // Linh Bảo bonuses from board items
    let lbAtkBonus = 0, lbHpBonus = 0, lbDefBonus = 0;
    if (typeof getLinhBaoStatsBonuses === 'function') {
        const lbBonuses = getLinhBaoStatsBonuses();
        lbAtkBonus = lbBonuses.atk || 0;
        lbHpBonus = lbBonuses.hp || 0;
        lbDefBonus = lbBonuses.def || 0;
    }

    // Element and root rank bonuses (simplified calculation)
    const rootRank = state.root?.rank || 0;
    const rootRankNames = ['', 'Hạ Phẩm', 'Trung Phẩm', 'Thượng Phẩm', 'Huyền Phẩm', 'Địa Phẩm', 'Thiên Phẩm', 'Hậu Thiên Phẩm', 'Tiên thiên Phẩm', 'Hỗn Độn Phẩm'];
    const rootRankName = ROOT_RANKS[rootRank] || 'Phế Phẩm';

    const realmName = REALMS[state.realmIndex] || 'Luyện Khí';
    const stageName = STAGES[state.realmStage] || 'Sơ Kỳ';

    const subs = gearSubTotals();
    const path = DAO_PATHS[state.daoPath];
    const pct = value => `${(value * 100).toFixed(1)}%`;
    const subRow = (label, value, cap) => `<div>${label}: <span style="color:#fff">${pct(value)}</span>${value >= cap ? ' <span style="color:#ffa94d">(đạt trần)</span>' : ` <span style="color:#888">/ trần ${pct(cap)}</span>`}</div>`;
    const bootSpeed = equippedInSlot('boots')?.speed || 0;

    // Cultivation boost
    const cultivateBoost = state.cultivateBoost || 1.0;

    // Calculate total bonuses
    const totalPower = basePower + equipAtk + lbAtkBonus;
    const totalMaxHp = baseHp + equipHp + lbHpBonus;
    const totalDef = baseDef + equipDef + lbDefBonus;

    // Linh Bảo damage info
    let lbDamageInfo = '';
    let lbHealInfo = '';
    let lbShieldInfo = '';
    let lbEffectDetails = [];

    if (Array.isArray(state.board)) {
        state.board.forEach((uid, idx) => {
            if (!uid) return;
            const item = state.inventory.find(i => i.uid === uid && i.type === 'linhbao');
            if (!item) return;

            if (typeof calcLinhBaoTrueValue === 'function') {
                const val = calcLinhBaoTrueValue(item);
                if (val) {
                    if (val.damage > 0) lbEffectDetails.push(`⚔️ ${item.name}: ${formatNumber(val.damage)} sát thương`);
                    if (val.burn > 0) lbEffectDetails.push(`🔥 ${item.name}: ${formatNumber(val.burn)} thiêu đốt/tick`);
                    if (val.heal > 0) lbEffectDetails.push(`🌿 ${item.name}: ${formatNumber(val.heal)} hồi máu`);
                    if (val.shield > 0) lbEffectDetails.push(`🛡️ ${item.name}: ${formatNumber(val.shield)} lá chắn`);
                    if (val.stun > 0) lbEffectDetails.push(`💫 ${item.name}: ${val.stun}s choáng`);
                    if (val.freeze > 0) lbEffectDetails.push(`❄️ ${item.name}: ${val.freeze}s đóng băng`);
                    if (val.lifesteal > 0) lbEffectDetails.push(`🩸 ${item.name}: ${val.lifesteal}% hút máu`);
                    if (val.buffAtk > 0) lbEffectDetails.push(`⬆️ ${item.name}: ${val.buffAtk}% tăng ATK`);
                }
            }
        });
    }

    modal.innerHTML = `
        <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px;max-width:480px;width:90%;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:1px solid rgba(230,201,122,0.3);max-height:85vh;overflow-y:auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <div style="color:#e6c97a;font-weight:700;font-size:1.3em;">📊 Chi Tiết Chỉ Số</div>
                <button onclick="closeStatDetailModal()" style="border:0;background:rgba(255,255,255,0.1);color:#fff;font-size:18px;cursor:pointer;padding:4px 10px;border-radius:6px;">✕</button>
            </div>

            <div style="color:#888;font-size:0.9em;margin-bottom:16px;text-align:center;">
                ${colorizeWithMap(realmName)} ${colorizeWithMap(stageName)} · ${colorizeWithMap(rootRankName)} · ${state.root.elements.map(colorizeElement).join(' ')}
            </div>

            <!-- Identity -->
            <div style="background:rgba(230,201,122,0.1);border:1px solid rgba(230,201,122,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#e6c97a;font-weight:600;margin-bottom:10px;font-size:1.1em;">🏛️ Thân Phận</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    <div>${raceOf().icon} Chủng tộc: <span style="color:#fff">${raceOf().name}</span> · ${raceOf().desc}</div>
                    <div>${path.icon} Hệ tu: <span style="color:#fff">${path.name}</span> (hành ${path.hanh}) · ${path.desc}</div>
                    <div>🏛️ Tiên vị: <span style="color:#fff">${tienViName()}</span>${tienViRegistered() ? ` · ${formatNumber(state.merit)} công lao` : ''}</div>
                    <div>⛩️ Tông môn: <span style="color:#fff">${sectEscape(sectName() || 'chưa có')}</span></div>
                    <div>🌱 Căn cơ: <span style="color:#fff">${100 - (state.flaw || 0)}%</span></div>
                </div>
            </div>

            <!-- Secondary stats -->
            <div style="background:rgba(177,151,252,0.1);border:1px solid rgba(177,151,252,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#b197fc;font-weight:600;margin-bottom:10px;font-size:1.1em;">🎯 Chỉ Số Phụ</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    ${subRow('💥 Chí mạng', subs.crit, GEAR_SUBS.crit.cap)}
                    <div>💢 Hệ số chí mạng: <span style="color:#fff">x${(CRIT_BASE_MULT + subs.critDmg).toFixed(2)}</span></div>
                    ${subRow('💨 Né tránh', subs.dodge, GEAR_SUBS.dodge.cap)}
                    ${subRow('🩸 Hút máu từ đồ', subs.lifesteal, GEAR_SUBS.lifesteal.cap)}
                    <div>🍀 May mắn: <span style="color:#fff">${pct(totalLuck())}</span> <span style="color:#888">(đồ ${pct(subs.luck)})</span></div>
                    <div>🥾 Tốc hành: <span style="color:#fff">+${Math.round(bootSpeed * 100)}%</span></div>
                    <div>⚡ Mọi việc nhanh: <span style="color:#fff">x${realmHaste(state.realmIndex).toFixed(2)}</span></div>
                </div>
            </div>

            <!-- Power Section -->
            <div style="background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#ff6b6b;font-weight:600;margin-bottom:10px;font-size:1.1em;">⚔️ Sức Mạnh (Attack)</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    <div>📍 Căn bản: <span style="color:#fff">${formatNumber(basePower)}</span></div>
                    ${equipAtk > 0 ? `<div>⚔️ Trang bị: <span style="color:#4ade80">+${formatNumber(equipAtk)}</span></div>` : ''}
                    ${lbAtkBonus > 0 ? `<div>📜 Công pháp: <span style="color:#4ade80">+${formatNumber(lbAtkBonus)}</span></div>` : ''}
                    <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:6px;padding-top:6px;color:#e6c97a;font-weight:600;">
                        💥 Tổng: ${formatNumber(totalPower)}
                    </div>
                </div>
            </div>

            <!-- HP Section -->
            <div style="background:rgba(105,219,124,0.1);border:1px solid rgba(105,219,124,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#69db7c;font-weight:600;margin-bottom:10px;font-size:1.1em;">❤️ HP (Máu)</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    <div>📍 Căn bản: <span style="color:#fff">${formatNumber(baseHp)}</span></div>
                    ${equipHp > 0 ? `<div>🛡️ Trang bị: <span style="color:#4ade80">+${formatNumber(equipHp)}</span></div>` : ''}
                    ${lbHpBonus > 0 ? `<div>📜 Công pháp: <span style="color:#4ade80">+${formatNumber(lbHpBonus)}</span></div>` : ''}
                    <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:6px;padding-top:6px;color:#e6c97a;font-weight:600;">
                        💖 Tổng: ${formatNumber(totalMaxHp)}
                    </div>
                </div>
            </div>

            <!-- Defense Section -->
            <div style="background:rgba(116,192,252,0.1);border:1px solid rgba(116,192,252,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#74c0fc;font-weight:600;margin-bottom:10px;font-size:1.1em;">🛡️ Phòng Thủ (Defense)</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    <div>📍 Căn bản: <span style="color:#fff">${formatNumber(baseDef)}</span></div>
                    ${equipDef > 0 ? `<div>🛡️ Trang bị: <span style="color:#4ade80">+${formatNumber(equipDef)}</span></div>` : ''}
                    ${lbDefBonus > 0 ? `<div>📜 Công pháp: <span style="color:#4ade80">+${formatNumber(lbDefBonus)}</span></div>` : ''}
                    <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:6px;padding-top:6px;color:#e6c97a;font-weight:600;">
                        🛡️ Tổng: ${formatNumber(totalDef)}
                    </div>
                </div>
            </div>

            <!-- Damage Range -->
            <div style="background:rgba(255,159,67,0.1);border:1px solid rgba(255,159,67,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#ffa94d;font-weight:600;margin-bottom:10px;font-size:1.1em;">⚔️ Sát Thương Dao Động</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    <div>💥 Nhỏ nhất: <span style="color:#fff">${formatNumber(Math.floor(totalPower * 0.7))}</span></div>
                    <div>💥 Lớn nhất: <span style="color:#fff">${formatNumber(Math.floor(totalPower * 1.3))}</span></div>
                    <div>💥 Trung bình: <span style="color:#e6c97a">${formatNumber(Math.floor(totalPower))}</span></div>
                </div>
            </div>

            <!-- Linh Bảo Effects from Board -->
            ${lbEffectDetails.length > 0 ? `
            <div style="background:rgba(166,255,209,0.1);border:1px solid rgba(166,255,209,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#a6ffd1;font-weight:600;margin-bottom:10px;font-size:1.1em;">📜 Linh Bảo Hiệu Quả</div>
                <div style="color:#ccc;font-size:0.85em;line-height:1.8;">
                    ${lbEffectDetails.map(e => `<div style="margin-bottom:4px;">${e}</div>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Cultivation Boost -->
            <div style="background:rgba(255,212,59,0.1);border:1px solid rgba(255,212,59,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#ffd43b;font-weight:600;margin-bottom:10px;font-size:1.1em;">🌠 Tốc Độ Tu Luyện</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    <div>⚡ Hệ số hiện tại: <span style="color:#e6c97a">x${cultivateBoost.toFixed(2)}</span></div>
                    <div>📈 Bonus: <span style="color:#4ade80">+${((cultivateBoost - 1) * 100).toFixed(1)}%</span></div>
                </div>
            </div>

            <!-- Lifespan -->
            <div style="background:rgba(248,131,172,0.1);border:1px solid rgba(248,131,172,0.3);border-radius:12px;padding:16px;margin-bottom:12px;">
                <div style="color:#f783ac;font-weight:600;margin-bottom:10px;font-size:1.1em;">🩸 Tuổi Thọ</div>
                <div style="color:#ccc;font-size:0.9em;line-height:1.8;">
                    <div>⏳ Hiện tại: <span style="color:#fff">${Math.floor(state.age)}</span> / <span style="color:#fff">${formatNumber(state.maxAge)}</span> tuổi</div>
                    <div>📊 Đã sử dụng: <span style="color:#ff6b6b">${((state.age / state.maxAge) * 100).toFixed(1)}%</span></div>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeStatDetailModal() {
    const modal = document.getElementById('statDetailModal');
    if (modal) modal.style.display = 'none';
}

if (typeof window !== 'undefined') {
    Object.assign(window, { equipAll, equipForRealm, sellOutdatedGear });
    window.showStatDetails = showStatDetails;
    window.closeStatDetailModal = closeStatDetailModal;
}
let inventoryFilter = 'all';
let inventoryFacets = {};
let inventorySort = 'new';
let inventoryPage = 0;
let inventoryPerPage = 4;

const INV_USE_TYPES = {
    consumable: '🧪 Hồi phục', xp: '📘 Tu vi', power: '💪 Sức mạnh', defense: '🛡️ Phòng thủ',
    life: '🩸 Thọ nguyên', luck: '🍀 Vận may', relic: '💠 Linh bảo'
};
const INV_CATEGORIES = [
    { id: 'all', label: '📦 Tất cả', test: () => true },
    { id: 'worn', label: '🧤 Đang mặc', test: item => item.equipped === true },
    { id: 'gear', label: '⚔️ Trang bị', test: item => ['weapon', 'armor'].includes(item.type) },
    { id: 'linhbao', label: '📜 Công pháp', test: item => item.type === 'linhbao' },
    { id: 'gem', label: '💎 Ngọc', test: item => item.type === 'gem' },
    { id: 'use', label: '💊 Đan dược', test: item => !!INV_USE_TYPES[item.type] },
    { id: 'root', label: '💠 Linh căn', test: item => ['root', 'root_frag'].includes(item.type) }
];
const INV_SORTS = [
    { id: 'new', label: 'Mới nhất' },
    { id: 'grade', label: 'Phẩm cao' },
    { id: 'realm', label: 'Cảnh giới cao' }
];
const INV_LB_EFFECTS = [
    ['damage', '⚔️ Sát thương', ['damage']], ['heal', '🌿 Hồi phục', ['heal']], ['shield', '🛡️ Hộ thuẫn', ['shield']],
    ['buff', '⬆️ Tăng lực', ['buffAtk', 'lifesteal']], ['control', '❄️ Khống chế', ['freeze', 'stun', 'parry']]
];

function inventoryFacetGroups() {
    if (inventoryFilter === 'gear' || inventoryFilter === 'worn') return [
        { key: 'slot', label: 'Ô', options: GEAR_SLOT_IDS.map(id => ({ id, label: `${GEAR_SLOTS[id].icon} ${GEAR_SLOTS[id].label}`, test: item => item.slot === id })) },
        { key: 'quality', label: 'Phẩm', options: GEAR_QUALITIES.map((q, i) => ({ id: String(i), label: q.name, test: item => (item.quality || 0) === i })) },
        { key: 'fit', label: 'Yêu cầu', options: [
            { id: 'ok', label: 'Đủ cảnh giới', test: item => (item.reqRealm || 0) <= state.realmIndex },
            { id: 'high', label: 'Chưa đủ', test: item => (item.reqRealm || 0) > state.realmIndex }
        ] }
    ];
    if (inventoryFilter === 'linhbao') return [
        { key: 'effect', label: 'Hiệu ứng', options: INV_LB_EFFECTS.map(([id, label, actions]) => ({ id, label, test: item => lbEffectList(item).some(e => actions.includes(e.action)) })) },
        { key: 'grade', label: 'Giai', options: LB_GRADE_NAMES.map((name, i) => ({ id: String(i), label: name, test: item => lbGradeOf(item) === i })) },
        { key: 'board', label: 'Vị trí', options: [
            { id: 'on', label: 'Trên trận', test: item => state.board.includes(item.uid) },
            { id: 'off', label: 'Trong kho', test: item => !state.board.includes(item.uid) }
        ] }
    ];
    if (inventoryFilter === 'gem') return [
        { key: 'kind', label: 'Loại', options: Object.entries(LB_GEM_KINDS).map(([id, g]) => ({ id, label: `${g.icon} ${g.label}`, test: item => item.gemKind === id })) },
        { key: 'tier', label: 'Bậc', options: GEM_FUSION_NAMES.map((name, t) => ({ id: String(t), label: name, test: item => (item.tier || 0) === t })) }
    ];
    if (inventoryFilter === 'use') return [
        { key: 'kind', label: 'Công dụng', options: Object.entries(INV_USE_TYPES).map(([id, label]) => ({ id, label, test: item => item.type === id })) }
    ];
    if (inventoryFilter === 'root') return [
        { key: 'kind', label: 'Dạng', options: [
            { id: 'root', label: 'Linh căn', test: item => item.type === 'root' },
            { id: 'frag', label: 'Mảnh', test: item => item.type === 'root_frag' }
        ] }
    ];
    return [];
}

// 🔍 Đặt bộ lọc
function setInventoryFilter(type) {
    inventoryFilter = type;
    inventoryFacets = {};
    inventoryPage = 0;
    renderInventory();
}

function toggleInventoryFacet(key, id) {
    inventoryFacets[key] = inventoryFacets[key] === id ? null : id;
    inventoryPage = 0;
    renderInventory();
}

function setInventorySort(id) {
    inventorySort = id;
    inventoryPage = 0;
    renderInventory();
}

// 📄 Chuyển trang
function changeInventoryPage(offset) {
    const filtered = getFilteredInventory();
    const maxPage = Math.floor((filtered.length - 1) / inventoryPerPage);
    inventoryPage = Math.max(0, Math.min(maxPage, inventoryPage + offset));
    renderInventory();
}

function inventoryCategoryItems(categoryId = inventoryFilter) {
    const category = INV_CATEGORIES.find(c => c.id === categoryId) || INV_CATEGORIES[0];
    return state.inventory.filter(item => item.type !== 'manual' && category.test(item));
}

function inventoryFacetMatch(item, groups, skipKey = null) {
    return groups.every(group => {
        if (group.key === skipKey || !inventoryFacets[group.key]) return true;
        return group.options.find(o => o.id === inventoryFacets[group.key])?.test(item) ?? true;
    });
}

function inventoryRank(item) {
    if (inventorySort === 'realm') return item.reqRealm || 0;
    return item.type === 'linhbao' ? lbGradeOf(item) : (item.quality ?? item.tier ?? item.rank ?? 0);
}

// 📦 Lọc và sắp xếp vật phẩm
function getFilteredInventory() {
    const groups = inventoryFacetGroups();
    const items = inventoryCategoryItems().filter(item => inventoryFacetMatch(item, groups));
    if (inventorySort === 'new') return items.reverse();
    return items.sort((a, b) => inventoryRank(b) - inventoryRank(a));
}

function inventoryFilterHTML() {
    const chip = (active, onclick, text) => `<button class="filter-chip ${active ? 'active' : ''}" onclick="${onclick}">${text}</button>`;
    const categories = INV_CATEGORIES.map(c => chip(inventoryFilter === c.id, `setInventoryFilter('${c.id}')`, `${c.label} ${inventoryCategoryItems(c.id).length}`)).join('');
    const groups = inventoryFacetGroups();
    const base = inventoryCategoryItems();
    const facets = groups.map(group => {
        const pool = base.filter(item => inventoryFacetMatch(item, groups, group.key));
        const chips = group.options.map(option => {
            const count = pool.filter(option.test).length;
            const active = inventoryFacets[group.key] === option.id;
            if (!count && !active) return '';
            return chip(active, `toggleInventoryFacet('${group.key}','${option.id}')`, `${option.label} ${count}`);
        }).join('');
        return chips ? `<div class="filter-chips"><span class="filter-label">${group.label}:</span>${chips}</div>` : '';
    }).join('');
    const sorts = INV_SORTS.map(o => chip(inventorySort === o.id, `setInventorySort('${o.id}')`, o.label)).join('');
    return `<div class="inventory-filter-row">
            <div class="filter-chips">${categories}</div>
            ${facets}
            <div class="filter-chips"><span class="filter-label">Xếp:</span>${sorts}</div>
        </div>
        <div class="inv-actions">
            <button class="equip-all-btn" onclick="equipForRealm()">🧤 Đúng cảnh giới</button>
            <button class="equip-all-btn" onclick="equipAll()">⚔️ Mạnh nhất</button>
            <button class="equip-all-btn" onclick="sellOutdatedGear()">💰 Bán đồ cũ</button>
            <button class="equip-all-btn" onclick="doUpgradeLinhBaoByRealm()">🌟 Nâng Linh Bảo</button>
            <button class="equip-all-btn" onclick="toggleInvPicking()">${invPicking ? '✖️ Thôi chọn' : '☑️ Chọn để vứt'}</button>
            ${inventoryFilter === 'gem' ? `<button class="equip-all-btn" onclick="optimizeGems()">✨ Tối ưu ngọc</button>
            <button class="equip-all-btn" onclick="toggleGemAuto()">🤖 Tự tối ưu: ${state.gemAuto ? 'Bật' : 'Tắt'}</button>` : ''}
            ${invPicking ? `<button class="equip-all-btn" onclick="pickAllInv()">📦 Chọn hết đang lọc</button>
            <button class="equip-all-btn inv-pick-bar" onclick="discardPicked()">🗑️ Vứt ${invPicked.size} món đã chọn</button>` : ''}
        </div>`;
}

/* Số món mỗi trang lấy theo chỗ trống thật để cả trang hiện đủ, không phải cuộn */
/* Đổi số món đổi luôn chiều cao dòng: chỉ tăng ở lượt ngoài, lượt lồng chỉ được giảm nên luôn dừng */
let inventoryFitting = false;
const INVENTORY_LIST_RESERVE = 84;
const INVENTORY_LIST_MIN = 90;

function fitInventoryPage(listEl) {
    const pane = listEl.closest('.side-pane');
    if (!pane?.offsetHeight || !listEl.offsetHeight) return;
    const tallest = Math.max(...[...listEl.children].map(child => child.offsetHeight));
    const free = Math.max(INVENTORY_LIST_MIN, pane.getBoundingClientRect().bottom - $('inventoryFilter').getBoundingClientRect().bottom - INVENTORY_LIST_RESERVE);
    listEl.style.maxHeight = `${free}px`;
    listEl.style.overflowY = 'auto';
    const columns = getComputedStyle(listEl).gridTemplateColumns.split(' ').length;
    const fit = Math.max(1, Math.floor(free / (tallest + 8))) * columns;
    if (fit === inventoryPerPage || inventoryPage > 0) return;
    if (inventoryFitting && fit > inventoryPerPage) return;
    const outermost = !inventoryFitting;
    inventoryFitting = true;
    inventoryPerPage = fit;
    try {
        renderInventory();
    } finally {
        if (outermost) inventoryFitting = false;
    }
}

// 🆕 Item Detail Modal
function showItemDetailModal(itemIndex) {
    const item = state.inventory[itemIndex];
    if (!item) return;

    let modal = document.getElementById('itemDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'itemDetailModal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:none;align-items:center;justify-content:center;z-index:10000;';
        document.body.appendChild(modal);
    }

    // Build stats HTML based on item type
    let statsHtml = '';
    if (item.type === 'weapon') {
        statsHtml = `<div style="color:#ff6b6b;margin:8px 0;">⚔️ Sát thương: +${item.atk || 0}</div>`;
        if (item.hp) statsHtml += `<div style="color:#69db7c;margin:8px 0;">❤️ Máu: +${item.hp}</div>`;
    } else if (item.type === 'armor') {
        statsHtml = `<div style="color:#69db7c;margin:8px 0;">❤️ Máu: +${item.hp || 0}</div>`;
        statsHtml += `<div style="color:#74c0fc;margin:8px 0;">🛡️ Phòng thủ: +${item.def || 0}</div>`;
        if (item.atk) statsHtml += `<div style="color:#ff6b6b;margin:8px 0;">⚔️ Sát thương: +${item.atk}</div>`;
    } else if (item.type === 'relic') {
        statsHtml = `<div style="color:#9775fa;margin:8px 0;">💠 ${item.effect || 'Linh Bảo'}</div>`;
        statsHtml += `<div style="color:#ffa94d;margin:8px 0;">⏱️ Còn ${item.uses || 0} lần sử dụng</div>`;
    } else if (item.type === 'consumable') {
        statsHtml = `<div style="color:#69db7c;margin:8px 0;">🧪 Hồi phục: ${item.heal || 0} HP</div>`;
    } else if (item.type === 'xp') {
        statsHtml = `<div style="color:#ffd43b;margin:8px 0;">📘 Bằng ${item.minutes || XP_ITEM_MINUTES} phút bế quan</div>`;
    } else if (item.type === 'power') {
        statsHtml = `<div style="color:#ff6b6b;margin:8px 0;">💪 Sức mạnh: +${item.value}</div>`;
    } else if (item.type === 'defense') {
        statsHtml = `<div style="color:#74c0fc;margin:8px 0;">🛡️ Phòng thủ: +${item.value}</div>`;
    } else if (item.type === 'life') {
        statsHtml = `<div style="color:#f783ac;margin:8px 0;">🩸 Tuổi thọ: +${item.value}</div>`;
    } else if (item.type === 'luck') {
        statsHtml = `<div style="color:#ffa94d;margin:8px 0;">🍀 May mắn: +${(item.value * 100).toFixed(1)}%</div>`;
    } else if (item.type === 'linhbao') {
        // Linh Bảo specific display with damage info, effect evolution, and gem effects
        const gradeLabel = window.lbGradeLabelEnhanced ? window.lbGradeLabelEnhanced(item) : (item.name + ' G.' + item.grade + ' Lv.' + item.level);
        const damageInfo = window.getLinhBaoDamageInfo ? window.getLinhBaoDamageInfo(item) : '';
        const effectEvolution = window.getLinhBaoEffectEvolution ? window.getLinhBaoEffectEvolution(item) : '';
        const gemInfo = window.getLinhBaoGemEffectInfo ? window.getLinhBaoGemEffectInfo(item) : '';
        const cooldown = window.lbEffCooldown ? window.lbEffCooldown(item).toFixed(2) + 's' : (item.cooldown || '?') + 's';
        const element = item.element || '';
        const elementIcon = element === 'Kim' ? '⚔️' : element === 'Mộc' ? '🌿' : element === 'Thủy' ? '💧' : element === 'Hỏa' ? '🔥' : element === 'Thổ' ? '🪨' : '💠';
        const effectSummary = window.lbEffectSummary ? window.lbEffectSummary(item) : (item.desc || '');

        statsHtml = `<div style="margin:8px 0;">${gradeLabel}</div>`;
        statsHtml += `<div style="color:#ffd43b;margin:4px 0;font-size:0.9em;">${elementIcon} ${element} · ⏱️ CD ${cooldown}</div>`;
        if (effectSummary) statsHtml += `<div style="color:#74c0fc;margin:4px 0;font-size:0.85em;">${effectSummary}</div>`;
        if (damageInfo) statsHtml += `<div style="color:#ff9f43;margin:4px 0;font-size:0.85em;">📊 ${damageInfo}</div>`;
        if (effectEvolution) statsHtml += `<div style="color:#c77dff;margin:4px 0;font-size:0.8em;">🔄 ${effectEvolution.replace(/\n/g, '<br>')}</div>`;
        if (gemInfo) statsHtml += `<div style="color:#5cd85c;margin:4px 0;font-size:0.8em;">${gemInfo.replace(/\n/g, '<br>')}</div>`;
    }

    const typeColor = item.type === 'weapon' ? '#ff6b6b' : item.type === 'armor' ? '#74c0fc' : item.type === 'linhbao' ? '#a6ffd1' : '#e6c97a';

    modal.innerHTML = `
        <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px;max-width:380px;width:90%;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
                <div style="color:${typeColor};font-weight:700;font-size:1.3em;">${item.name || 'Vật phẩm'}</div>
                <button onclick="closeItemDetailModal()" style="border:0;background:rgba(255,255,255,0.1);color:#fff;font-size:18px;cursor:pointer;padding:4px 10px;border-radius:6px;">✕</button>
            </div>
            <div style="color:#888;font-size:0.9em;margin-bottom:12px;">Loại: ${item.type === 'linhbao' ? 'Linh Bảo' : item.type === 'weapon' ? 'Vũ khí' : item.type === 'armor' ? 'Giáp' : item.type}</div>
            ${statsHtml}
            <div style="color:#aaa;margin-top:12px;font-size:0.9em;line-height:1.5;">${item.desc || 'Không có mô tả'}</div>
            ${item.equipped ? '<div style="color:#4ade80;margin-top:12px;font-weight:600;">✓ Đang trang bị</div>' : ''}
        </div>
    `;
    modal.style.display = 'flex';
}

function closeItemDetailModal() {
    const modal = document.getElementById('itemDetailModal');
    if (modal) modal.style.display = 'none';
}

if (typeof window !== 'undefined') {
    window.showItemDetailModal = showItemDetailModal;
    window.closeItemDetailModal = closeItemDetailModal;
}

// Wrapper to safely upgrade all Linh Bảo to current realm tier
function doUpgradeLinhBaoByRealm() {
    if (typeof window.upgradeAllLinhBaoToRealmTier === 'function') {
        window.upgradeAllLinhBaoToRealmTier();
    } else {
        log('❌ Chức năng nâng cấp chưa sẵn sàng. Hãy đợi trò chơi tải xong.');
    }
}

/* Chọn nhiều món rồi vứt một lần; đồ đang mặc và pháp bảo trên trận được giữ lại */
let invPicking = false;
const invPicked = new Set();

function invDiscardable(item) {
    return !item.equipped && !(item.type === 'linhbao' && state.board.includes(item.uid));
}

function markInvPick(node, item) {
    node.querySelector('.inv-buttons')?.remove();
    const allowed = invDiscardable(item);
    node.classList.add('inv-pick');
    node.classList.toggle('locked', !allowed);
    node.classList.toggle('picked', invPicked.has(item));
    node.addEventListener('click', event => {
        event.stopPropagation();
        if (!allowed) return;
        if (!invPicked.delete(item)) invPicked.add(item);
        renderInventory();
    }, true);
}

function toggleInvPicking() {
    invPicking = !invPicking;
    invPicked.clear();
    renderInventory();
}

function pickAllInv() {
    getFilteredInventory().filter(invDiscardable).forEach(item => invPicked.add(item));
    renderInventory();
}

async function discardPicked() {
    if (!invPicked.size) { showToast('Chưa chọn món nào.', 'info'); return; }
    const count = invPicked.size;
    if (!await showConfirm(`Vứt bỏ ${count} món đã chọn? Không lấy lại được.`)) return;
    state.inventory = state.inventory.filter(item => !invPicked.has(item));
    invPicked.clear();
    invPicking = false;
    log(`🗑️ Vứt bỏ ${count} món.`);
    renderAll();
}

function renderInventory() {
    const el = $('inventory');
    if (!el) return;

    el.innerHTML = `
                <div id="inventoryFilter" style="margin-bottom:8px"></div>
                <div id="inventoryItems"></div>
                <div id="inventoryPagination" style="margin-top:8px; text-align:center"></div>
            `;

    const filterEl = $('inventoryFilter');
    const listEl = $('inventoryItems');
    const pageEl = $('inventoryPagination');

    filterEl.innerHTML = inventoryFilterHTML();

    const filtered = getFilteredInventory();
    if (!filtered.length) {
        listEl.innerHTML = '<div class="small">Không có vật phẩm nào.</div>';
        return;
    }

    inventoryPage = Math.min(inventoryPage, Math.floor((filtered.length - 1) / inventoryPerPage));
    const start = inventoryPage * inventoryPerPage;
    const end = start + inventoryPerPage;
    const pageItems = filtered.slice(start, end);

    pageItems.forEach((item, idx) => {
        const realIndex = state.inventory.indexOf(item);
        const d = document.createElement('div');
        d.className = 'item';

        let desc = '';
        if (item.type === 'xp') desc = `(${item.minutes || XP_ITEM_MINUTES} phút bế quan)`;
        else if (item.type === 'power') desc = `(+${item.value} Sức mạnh)`;
        else if (item.type === 'life') desc = `(+${item.value} Thọ nguyên)`;
        else if (item.type === 'weapon' || item.type === 'armor') desc = `${GEAR_SLOTS[item.slot]?.icon || ''} (${gearStatText(item)})`;
        else if (item.type === 'defense') desc = `(maxDEF +${item.value})`;
        else if (item.type === 'relic') desc = `💠 Linh Bảo — ${item.effect} (${item.uses} lần)`;
        else if (item.type === 'consumable') desc = `(Hồi ${Math.round((item.healPct || 0) * 100)}% HP)`;
        else if (item.type === 'luck') desc = `Tăng cường vận khí — +${item.value * 100}% vận may)`;

        if (item.type === 'linhbao') {
            const onBoard = Array.isArray(state.board) && item.uid && state.board.includes(item.uid);
            const icons = (typeof lbEffectIcons === 'function') ? lbEffectIcons(item) : '⚜️';
            const summary = (typeof lbEffectSummary === 'function') ? lbEffectSummary(item) : (item.action || '');
            const col = (typeof LB_ELEMENT_COLORS !== 'undefined' && LB_ELEMENT_COLORS[item.element]) || '#a6ffd1';
            const cd = (typeof lbEffCooldown === 'function') ? lbEffCooldown(item).toFixed(1) : item.cooldown;
            const gradeLabel = (typeof lbGradeLabel === 'function') ? lbGradeLabel(item) : `T${item.grade || item.tier || 0}`;
            const gradePlain = (typeof lbGradePlain === 'function') ? lbGradePlain(item) : `T${item.grade || item.tier || 0}`;
            const isMaxed = (typeof lbIsMaxed === 'function') && lbIsMaxed(item);
            const maxGrade = (typeof LB_MAX_GRADE !== 'undefined') ? LB_MAX_GRADE : 12;
            const currentGrade = item.grade || item.tier || 0;
            const atMaxGrade = currentGrade >= maxGrade;
            const gradeMax = (typeof lbMaxLevelFor === 'function') ? lbMaxLevelFor(currentGrade) : 100;
            const currentLevel = item.level || 1;
            const atMaxLevel = currentLevel >= gradeMax;
            const canFuseGrade = !atMaxGrade;
            const sockets = (typeof lbSockets === 'function') ? lbSockets(item) : 0;
            const gemCount = Array.isArray(item.gems) ? item.gems.length : 0;
            const gemIcons = (typeof lbGemIcons === 'function') ? lbGemIcons(item) : '';
            // Get tooltip for true values (damage/heal/shield)
            const tooltipText = typeof getLinhBaoTooltipText === 'function' ? getLinhBaoTooltipText(item) : '';
            // Get gem effect info for tooltip
            const gemEffectInfo = window.getLinhBaoGemEffectInfo ? window.getLinhBaoGemEffectInfo(item) : '';
            d.innerHTML = `
                <div class="linhbao-container">
                    <div class="linhbao-header"><b style="color:${col}">${icons} ${item.name}</b> <span class="small">(${gradeLabel})</span></div>
                    <div class="small">${summary} · CD ${cd}s · ${colorizeElement(item.element)}</div>
                    <div class="small">💎 Ổ ngọc: ${gemIcons || '—'} (${gemCount}/${sockets})</div>
                    <div class="small">${item.desc || ''}</div>
                    <div class="inv-buttons">
                        ${onBoard
                        ? `<button class="equip-btn" onclick="removeFromBoard(${Array.isArray(state.board) ? state.board.indexOf(item.uid) : -1})">🧤 Đang bày trận</button>`
                        : `<button class="equip-btn" onclick="placeOnBoard(${realIndex})">⚜️ Đặt lên trận</button>`}
                        ${atMaxGrade && atMaxLevel
                        ? `<button class="use-btn" disabled style="opacity:.6">✨ Tối cao</button>`
                        : `<button class="use-btn" onclick="upgradeLinhBao(${realIndex})">🔺 Nâng cấp</button>`}
                        ${canFuseGrade
                        ? `<button class="equip-btn" onclick="fuseLinhBao(${realIndex})">🔥 Hợp nhất</button>`
                        : ''}
                        ${gemCount > 0 ? `<button class="use-btn" onclick="detachGems('${item.uid}')">⛏️ Tháo ngọc</button>` : ''}
                        <button class="discard-btn" onclick="discardItem(${realIndex})">🗑️ Vứt</button>
                    </div>
                    ${(tooltipText || gemEffectInfo) ? `<div class="linhbao-tooltip">${tooltipText ? `📊 GIÁ TRỊ THỰC:\n${tooltipText}${gemEffectInfo ? '\n\n' : ''}` : ''}${gemEffectInfo ? `💎 HIỆU ỨNG NGỌC:\n${gemEffectInfo}` : ''}</div>` : ''}
                </div>`;
            listEl.appendChild(d);
            return;
        }

        if (item.type === 'root') {
            const isSelected = rootCombineSelection.includes(realIndex);
            const rankName = ROOT_RANKS?.[item.rank] || 'Phổ thông';
            d.innerHTML = `
                        <div><b>${item.name}</b> <span class="small">(${rankName})</span></div>
                        <div class="small">${item.desc || ''}</div>
                        <div class="inv-buttons">
                            <button class="use-btn" onclick="useItem(${realIndex})">🌈 Sử dụng</button>
                            <button class="use-btn" onclick="toggleRootSelection(${realIndex})"
                                style="background:${isSelected ? 'rgba(123,228,163,0.3)' : 'rgba(255,255,255,0.08)'}">
                                ${isSelected ? '✅ Đã chọn' : '💠 Hợp thành'}
                            </button>
                            <button class="discard-btn" onclick="discardItem(${realIndex})">🗑️ Vứt</button>
                        </div>
                     `;
        }
        // 🌟 Gem items - show Khảm (socket) button
        else if (item.type === 'gem') {
            const gemKind = item.gemKind || 'power';
            const gemDef = (typeof LB_GEM_KINDS !== 'undefined') ? LB_GEM_KINDS[gemKind] : null;
            const gemIcon = gemDef ? gemDef.icon : '💎';
            const gemColor = gemDef ? gemDef.color : '#ff9800';
            const tierName = GEM_FUSION_NAMES[item.tier || 0] || 'Thô';
            const canFuse = (item.tier || 0) < gemMaxTier();
            d.innerHTML = `
                <div><b style="color:${gemColor}">${gemIcon} ${item.name}</b> <span class="small">(${tierName})</span></div>
                <div class="small" style="color:${gemColor}">+${((item.magnitude || 0.1) * 100).toFixed(0)}% ${gemDef?.desc || 'Tăng sức'}</div>
                <div class="small">${item.desc || ''}</div>
                <div class="inv-buttons">
                    <button class="use-btn" onclick="openGemSocketModal(${realIndex})">💎 Khảm ngọc</button>
                    ${canFuse ? `<button class="equip-btn" onclick="openGemFusionModal()">🔥 Hợp nhất</button>` : ''}
                    <button class="discard-btn" onclick="discardItem(${realIndex})">🗑️ Vứt</button>
                </div>`;
        }
        else {
            d.innerHTML = `
                        <div style="cursor:pointer" onclick="showItemDetailModal(${realIndex})"><b style="color:#e6c97a">${item.name}${item.count > 1 ? ` ×${item.count}` : ''}</b> ${desc}</div>
                        <div class="inv-buttons">
                            ${item.type === 'weapon' || item.type === 'armor'
                    ? `<button class="equip-btn" onclick="useItem(${realIndex})">
                                    ${item.equipped ? '🧤 Đang mặc' : '⚙️ Trang bị'}
                                </button>`
                    : item.type === 'relic'
                        ? `<button class="use-btn" onclick="useRelic('${item.name}')">✨ Kích hoạt</button>`
                        : `<button class="use-btn" onclick="useItem(${realIndex})">Dùng</button>`
                }
                            ${item.type === 'xp' && item.count > 1 ? `<button class="use-btn" onclick="useAllXp(${realIndex})">Dùng hết</button>` : ''}
                            <button class="discard-btn" onclick="discardItem(${realIndex})">🗑️ Vứt</button>
                        </div>
                    `;
        }

        if (invPicking) markInvPick(d, item);
        listEl.appendChild(d);
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / inventoryPerPage);
    if (totalPages > 1) {
        pageEl.innerHTML = `
            <button onclick="changeInventoryPage(-1)">⬅</button>
            Trang ${inventoryPage + 1}/${totalPages}
            <button onclick="changeInventoryPage(1)">➡</button>
        `;
    }

    if (rootCombineSelection.length >= 3) {
        const btn = document.createElement('div');
        btn.style = 'text-align:center; margin-top:10px;';
        btn.innerHTML = `<button class="primary" onclick="confirmRootCombination()">✅ Xác nhận hợp thành (${rootCombineSelection.length})</button>`;
        el.appendChild(btn);
    }
    fitInventoryPage(listEl);
}


function gearStatText(item) {
    const parts = [];
    if (item.atk) parts.push(`ATK +${formatNumber(item.atk)}`);
    if (item.def) parts.push(`DEF +${formatNumber(item.def)}`);
    if (item.hp) parts.push(`HP +${formatNumber(item.hp)}`);
    if (item.speed) parts.push(`Tốc hành +${Math.round(item.speed * 100)}%`);
    (item.subs || []).forEach(sub => parts.push(gearSubText(sub)));
    return parts.join(', ');
}

function gearSubText(sub) {
    return `${GEAR_SUBS[sub.kind].label} +${(sub.value * 100).toFixed(1)}%`;
}

function gearScore(item) {
    const b = refStats(0);
    return (item.atk || 0) / b.atk + (item.def || 0) / b.def + (item.hp || 0) / b.hp;
}

function equipByRank(compare) {
    GEAR_SLOT_IDS.forEach(slot => {
        const best = state.inventory
            .filter(it => it.slot === slot && (it.reqRealm || 0) <= state.realmIndex)
            .sort(compare)[0];
        if (best && !best.equipped) useItem(state.inventory.indexOf(best));
    });
    renderAll();
}

function equipAll() {
    equipByRank((a, b) => gearScore(b) - gearScore(a));
}

function equipForRealm() {
    equipByRank((a, b) => (b.reqRealm || 0) - (a.reqRealm || 0) || gearScore(b) - gearScore(a));
}

function gearSellValue(item) {
    return goldRef(item.reqRealm || 0) * ((item.quality || 0) + 1 + (item.plus || 0));
}

function outdatedGear() {
    return state.inventory.filter(it => {
        if (!it.slot || it.equipped) return false;
        const worn = equippedInSlot(it.slot);
        return worn && gearScore(it) <= gearScore(worn);
    });
}

async function sellOutdatedGear() {
    const items = outdatedGear();
    if (!items.length) { showToast('Không có đồ lỗi thời.', 'info'); return; }
    const total = items.reduce((sum, it) => sum + gearSellValue(it), 0);
    const ok = await showConfirm(`Bán ${items.length} món yếu hơn đồ đang mặc, nhận ${formatNumber(total)} linh thạch?`);
    if (!ok) return;
    state.inventory = state.inventory.filter(it => !items.includes(it));
    state.gold += total;
    log(`💰 Bán ${items.length} món đồ lỗi thời, +${formatNumber(total)} linh thạch.`);
    renderAll();
}

function equippedInSlot(slot) {
    return state.inventory.find(it => it.equipped && it.slot === slot) || null;
}

function equipmentPowerShare() {
    recalculateStats();
    const score = (a, d, h) => a / refStats(state.realmIndex, state.realmStage).atk
        + d / refStats(state.realmIndex, state.realmStage).def
        + h / refStats(state.realmIndex, state.realmStage).hp;
    const gear = score(getEquippedAtk(), getEquippedDef(), getEquippedHp());
    const self = score(state.power, state.defense, state.maxHp);
    return self / Math.max(1e-9, self + gear);
}

function renderPowerShareBar() {
    const pct = Math.round(equipmentPowerShare() * 100);
    return `<div class="small">${pct}% / ${100 - pct}%</div>
        <div class="share-bar"><i style="width:${pct}%"></i></div>`;
}

/* equipment helpers */
function getEquippedAtk() {
    let total = 0;
    state.inventory.filter(i => i.equipped && i.atk).forEach(i => total += i.atk);
    return total;
}
function getEquippedDef() {
    let total = 0;
    state.inventory.filter(i => i.equipped && i.def).forEach(i => total += i.def);
    return total;
}
function getEquippedHp() {
    let total = 0;
    state.inventory.filter(i => i.equipped && i.hp).forEach(i => total += i.hp);
    return total;
}

function gearSubTotals() {
    const totals = {};
    Object.entries(GEAR_SUBS).forEach(([kind, sub]) => {
        const sum = state.inventory.filter(i => i.equipped).flatMap(i => i.subs || []).filter(s => s.kind === kind).reduce((a, s) => a + s.value, 0);
        totals[kind] = Math.min(sub.cap, sum);
    });
    return totals;
}

function totalLuck() {
    return (state.luckBonus || 0) + gearSubTotals().luck;
}

/* ===========================
    STARTER: give starter items and render
=========================== */
function initStarter() {
    if (!state.profileId) {
        const savedId = localStorage.getItem('tt_profileId');
        if (savedId) state.profileId = savedId;
        else if (typeof buildPublicProfile === 'function') buildPublicProfile();
    }

    const base = baseStatsFor(0, 0, state.root.rank || 0);
    state.statCurve = STAT_CURVE_VERSION;
    state.power = base.power;
    state.defense = base.defense;
    state.maxHp = base.hp;
    state.totalMaxHp = base.hp;

    state.inventory = [
        { ...makeGearItem(0, 'weapon', 0), equipped: true },
        { ...makeGearItem(0, 'armor', 0), equipped: true }
    ];

    state.board = [null, null, null, null, null, null];
    if (typeof grantStartingLinhBao === 'function') grantStartingLinhBao();

    applyStartingOrigin();
    initWorldState();
    recalculateStats();
    state.hp = state.totalMaxHp;
    state.__rootStoryShown = false;
}

function announceRootStory(force = false) {
    if (!force && state.__rootStoryShown) return;
    state.__rootStoryShown = true;
    recalculateStats();
}

function playIntroNarration(script = buildRootStoryScript()) {
    const container = document.getElementById('introNarration');
    if (!container) return Promise.resolve();
    container.innerHTML = '';
    let lineIndex = 0;

    return new Promise(resolve => {
        const typeLine = () => {
            if (lineIndex >= script.length) {
                resolve();
                return;
            }
            const text = script[lineIndex++];
            if (!text) {
                const emptyLine = document.createElement('div');
                emptyLine.className = 'line';
                emptyLine.innerHTML = '&nbsp;';
                container.appendChild(emptyLine);
                setTimeout(typeLine, 150);
                return;
            }
            const lineEl = document.createElement('div');
            lineEl.className = 'line';
            container.appendChild(lineEl);
            container.scrollTop = container.scrollHeight;
            let charIndex = 0;
            const interval = setInterval(() => {
                if (charIndex >= text.length) {
                    clearInterval(interval);
                    container.scrollTop = container.scrollHeight;
                    setTimeout(typeLine, 180);
                    return;
                }
                lineEl.textContent += text.charAt(charIndex++);
                container.scrollTop = container.scrollHeight;
            }, 35);
        };
        typeLine();
    });
}

function fadeOutStartScreen() {
    const screen = document.getElementById('start-screen');
    if (!screen || screen.dataset.closed === '1') return;
    screen.dataset.closed = '1';
    screen.classList.add('fade-out');
    setTimeout(() => {
        screen.style.display = 'none';
    }, 650);
}


/* ===========================
    SAVE / LOAD
=========================== */
const SAVE_KEY = 'tt_state_v3';

function hasSavedGame() {
    return !!localStorage.getItem(SAVE_KEY);
}

function saveProgress(silent = false) {
    if (window.__skipAutosave) return;
    if (state.profileId) {
        try { localStorage.setItem('tt_profileId', state.profileId); } catch { }
    }
    state.lastSeen = Date.now();
    const snapshot = { ...state, currentEnemy: null };
    localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
    if (!silent) log('Lưu tiến trình thành công.');
}

function loadProgress(isBoot = false) {
    const s = localStorage.getItem(SAVE_KEY);
    if (!s) { log('Không tìm thấy save.'); return; }
    if (window.__boardBattle && typeof forfeitBoardBattle === 'function') forfeitBoardBattle();
    state = JSON.parse(s);
    state.lastXpGain = state.lastXpGain || 0;
    window._battleActive = false;
    if (typeof ensureBoardState === 'function') ensureBoardState();

    const savedId = localStorage.getItem('tt_profileId');
    if (savedId) state.profileId = savedId;
    else if (typeof buildPublicProfile === 'function') buildPublicProfile();

    initWorldState();
    if (isBoot) applyOfflineProgress();
    log('Tải tiến trình thành công.');
    renderAll();
}


/* ===========================
    UI HOOKS
=========================== */
// autoFight button removed - only set onclick if element exists
const autoFightBtn = $('autoFight');
if (autoFightBtn) {
    autoFightBtn.onclick = () => {
        if (window._autoFightOn) { autoFightBtn.innerText = 'Bật auto chiến'; window.stopAutoFight && window.stopAutoFight(); }
        else { autoFightBtn.innerText = 'Tắt auto chiến'; window.startAutoFight && window.startAutoFight(); }
    };
}
// fightNow button removed - only set onclick if element exists
const fightNowBtn = $('fightNow');
if (fightNowBtn) {
    fightNowBtn.onclick = () => {
        if (state.currentEnemy && state.currentEnemy.isPvP) return pvpAttackOrLocal();
        if (typeof runBoardBattle === 'function') return runBoardBattle();
        return pvpAttackOrLocal();
    };
}
$('runBtn').onclick = () => { if (typeof forfeitBoardBattle === 'function') forfeitBoardBattle(); runFromBattle(); };
// changed to window-safe call to avoid "findMatchPvP is not defined"
$('saveBtn').onclick = () => saveProgress();
$('loadBtn').onclick = () => loadProgress();
$('openLook').onclick = () => openLookModal();
const clearBtn = $('clearStorage');
if (clearBtn) clearBtn.onclick = () => clearSavedProfile();


function setGameVersionLabel() {
    const version = document.body.getAttribute('data-game-version');
    const el = document.getElementById('gameVersion');
    if (el && version) el.textContent = `v${version}`;

}


setGameVersionLabel();
log('Thiên địa khai mở.');
countInitLogs(); // Đếm số dòng log khởi tạo để lọc bỏ khi hiển thị nhật ký chết
function renderRootTable() {
    const el = $('rootTable');
    if (!el) return;
    const playerRoot = state.root || { elements: [], rank: 0 };
    const rankName = ROOT_RANKS[playerRoot.rank] || 'Phế Phẩm';
    const elements = playerRoot.elements.length
        ? playerRoot.elements.map(colorizeElement).join(' ')
        : 'Vô căn';
    let html = `<div class="small">Linh căn hiện tại: ${elements} (${colorizeWithMap(rankName)})</div>`;
    html += `<div class="small" style="margin-top:6px;">Tương quan với đơn linh căn cùng phẩm chất:</div>`;
    ELEMENTS.forEach(element => {
        const bonus = (typeof calcElementBonus === 'function')
            ? calcElementBonus(playerRoot.elements, [element], state.realmIndex || 0, state.realmIndex || 0)
            : 0;
        html += `<div class="small">• ${elements} vs ${colorizeElement(element)} ⇒ ${bonus.toFixed(1)}%</div>`;
    });
    el.innerHTML = html;
}

// Hàm copy ID
function copyPlayerId(event) {
    if (event) event.stopPropagation();
    
    const playerId = state.profileId || buildPublicProfile().id;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(playerId).then(() => {
            showToast('Đã copy ID vào clipboard!', 'info');
        }).catch(() => {
            fallbackCopyToClipboard(playerId);
        });
    } else {
        fallbackCopyToClipboard(playerId);
    }
}

// Fallback cho trình duyệt cũ
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Đã copy ID!', 'info');
    } catch (err) {
        showToast('Không thể copy. ID: ' + text, 'warn');
    }
    
    document.body.removeChild(textArea);
}

if (typeof window !== 'undefined') {
    window.copyPlayerId = copyPlayerId;
}

/* ================================================
   LINH BẢO TRUE VALUE CALCULATOR
   Calculate what a Linh Bảo truly deals/heals based on player stats
   ================================================ */
function calcLinhBaoTrueValue(item) {
    if (!item || item.type !== 'linhbao') return null;

    const effects = lbEffectList(item);
    const playerAtk = state.totalPower || state.power || 10;
    const playerMaxHp = state.totalMaxHp || state.maxHp || 100;
    const playerElements = state.root?.elements || [];

    const elemMod = calcLinhBaoElementMod(
        { elements: playerElements },
        { elements: [] }, // target unknown, so no counter debuff
        item.element
    );

    const result = { damage: 0, burn: 0, heal: 0, shield: 0, lifesteal: 0, buffAtk: 0, stun: 0, freeze: 0 };

    for (const ef of effects) {
        if (ef.action === 'damage') {
            result.damage = Math.floor(playerAtk * lbEffMag(ef.magnitude, item) * elemMod);
        } else if (ef.action === 'burn') {
            result.burn = Math.floor(playerAtk * lbEffMag(ef.magnitude, item) * elemMod);
        } else if (ef.action === 'heal') {
            result.heal = Math.floor(playerMaxHp * lbEffMag(ef.magnitude, item) * elemMod);
        } else if (ef.action === 'shield') {
            result.shield = Math.floor(playerMaxHp * lbEffMag(ef.magnitude, item) * elemMod);
        } else if (ef.action === 'lifesteal') {
            result.lifesteal = (ef.magnitude * 100 * elemMod).toFixed(1);
        } else if (ef.action === 'buffAtk') {
            result.buffAtk = (ef.magnitude * 100 * elemMod).toFixed(1);
        } else if (ef.action === 'stun') {
            result.stun = lbDurMag(ef.magnitude, item).toFixed(1);
        } else if (ef.action === 'freeze') {
            result.freeze = lbDurMag(ef.magnitude, item).toFixed(1);
        }
    }

    return result;
}

function getLinhBaoTooltipText(item) {
    const val = calcLinhBaoTrueValue(item);
    if (!val) return '';

    const parts = [];
    if (val.damage > 0) parts.push(`⚔️ Sát thương: ${val.damage.toLocaleString()}`);
    if (val.burn > 0) parts.push(`🔥 Thiêu đốt: ${val.burn.toLocaleString()}/tick`);
    if (val.heal > 0) parts.push(`🌿 Hồi máu: ${val.heal.toLocaleString()}`);
    if (val.shield > 0) parts.push(`🛡️ Khiên: ${val.shield.toLocaleString()}`);
    if (val.lifesteal > 0) parts.push(`🩸 Hút máu: ${val.lifesteal}%`);
    if (val.buffAtk > 0) parts.push(`⬆️ Tăng ATK: ${val.buffAtk}%`);
    if (val.stun > 0) parts.push(`💫 Choáng: ${val.stun}s`);
    if (val.freeze > 0) parts.push(`❄️ Đóng băng: ${val.freeze}s`);

    return parts.join('\n');
}