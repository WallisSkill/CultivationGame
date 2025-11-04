/* ===============================
    FULL GAME: DATA / STATE / HELPERS
    =============================== */
/* --- Data: realms, stages, elements, root ranks --- */
const REALMS = [
    'Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần', 'Luyện Hư', 'Hợp Thể', 'Độ Kiếp', 'Đại Thừa',
    'Tán Tiên', 'Địa Tiên', 'Thiên Tiên', 'Chân Tiên', 'Huyền Tiên', 'Kim Tiên', 'Tiên Đế',
    'Thánh Nhân Cảnh', 'Chí Thánh Cảnh', 'Đại Thánh Cảnh', 'Chuẩn Thiên Cảnh',
    'Diệt Thiên Cảnh', 'Khai Thiên Cảnh', 'Toàn Thiên Cảnh', 'Cực Thiên Cảnh', 'Nghịch Thiên Cảnh', 'Sáng Thế Cảnh',
    'Hỗn Độn Đạo Giả', 'Hồng Mông Chúa Tể', 'Chung Nguyên Chí Cao'
];
const STAGES = ['Sơ Kỳ', 'Trung Kỳ', 'Hậu Kỳ', 'Đại Viên Mãn'];
const GAME_VERSION = '1.0.0';

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
    'Chân Tiên': '#0277bd', 'Huyền Tiên': '#0069c0', 'Kim Tiên': '#cddc39', 'Tiên Đế': '#d4af37',
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
let state = {
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
    age: 6,
    maxAge: 200,
    autoTrain: false,
    autoFight: false,
    currentEnemy: null,
    exploreCooldown: false,
    npcInteractionLock: false,
    luckBonus: 0,
    specialTicks: [],
    lastXpGain: 0,
    skillUsedThisTurn: false,
    learnedSkillFromSaint: false
};

window.addEventListener("load", () => {
    const saved = localStorage.getItem("playerName");
    const startScreen = document.getElementById("start-screen");
    const input = document.getElementById("playerNameInput");
    const btn = document.getElementById("startBtn");
    // Nếu chưa có tên -> yêu cầu nhập
    btn.addEventListener("click", () => {
        const val = input.value.trim();
        if (!val) {
            showToast('Ngươi chưa khai báo đạo danh!', 'warn');
            return;
        }
        window.state = window.state || {};
        state.name = val;
        localStorage.setItem("playerName", val);

        state.__rootStoryShown = false;
        btn.disabled = true;
        btn.innerText = 'Đang khởi tạo...';
        startRootRank = randomRootRank();
        startRootElement = randomElements();
        state.root.elements = startRootElement;
        state.root.rank = startRootRank;
        state.gold = 240;
        if (state.name && ADMIN_NAMES.includes(state.name)) {
            state.name = "Thiên Đạo Chí Tôn";
            state.gold = 99999999;
        }
        const script = buildRootStoryScript();

        initStarter();
        renderAllImmediate();
        if (state.name !== "Thiên Đạo Chí Tôn") {
            announceRootStory(true);
            playIntroNarration(script).then(() => {
                setTimeout(() => fadeOutStartScreen(), 1000);
            });
        } else {
            fadeOutStartScreen();
        }
        state.age = 6;
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
    state.hp = 0;
    state.autoTrain = false;
    state.autoFight = false;
    stopAging();
    disableAllButtons();
    log('☠️ Người đã tử vong do cạn thọ nguyên. Thân thể hóa tro bụi...');
    showRebirthButton();
}


function disableAllButtons() {
    document.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

function enableAllButtons() {
    document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

// gọi 1 lần khi khởi game
function startAging() {
    // nếu đang có interval thì bỏ qua
    if (state.ageIntervalId) return;

    state.ageIntervalId = setInterval(() => {
        // nếu đạt max tuổi thì dừng
        checkLongevity();
        state.age += 1;
        updateAgeDisplay();
    }, 5000);
}

function stopAging() {
    if (state.ageIntervalId) {
        clearInterval(state.ageIntervalId);
        state.ageIntervalId = null;
    }
}

function updateAgeDisplay() {
    const ageTxt = $('ageTxt');
    const ageBar = $('ageBar');

    if (ageTxt) {
        ageTxt.textContent = `${state.age} / ${state.maxAge}`;
    }

    if (ageBar) {
        const agePercent = Math.min(100, Math.round(state.age / state.maxAge * 100));
        ageBar.style.width = `${agePercent}%`;
    }
}



function showRebirthButton() {
    const container = document.createElement('div');
    container.id = 'rebirthContainer';
    container.style.textAlign = 'center';
    container.style.marginTop = '20px';

    const btn = document.createElement('button');
    btn.innerText = '🔁 Trùng sinh';
    btn.className = 'primary';
    btn.style.fontSize = '18px';
    btn.onclick = () => {
        container.remove();
        rebirth();
    };

    container.appendChild(btn);
    document.querySelector('.app').appendChild(container);
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
        localStorage.removeItem('tt_state_complete_v2');
    } catch { }
    log('🧹 Đã xóa đạo danh và save cũ. Đang tải lại...');
    setTimeout(() => location.reload(), 150);
}

function rebirth() {
    const logBox = $('log');
    if (logBox) logBox.innerHTML = '';
    log('🔥 Một vòng luân hồi mới bắt đầu — Thiên Đạo chuyển sinh!');
    log('🌄 Khí tức mới tràn ngập — Linh căn tái hiện, thiên địa lại mở ra!');

    // reset toàn bộ state về mặc định
    state = {
        realmIndex: 0,
        realmStage: 0,
        xp: 0,
        hp: 120,
        maxHp: 120,
        power: 15,
        defense: 5,
        gold: 200,
        inventory: [],
        root: { elements: startRootElement, rank: startRootRank },
        age: 18,
        maxAge: 200,
        autoTrain: false,
        autoFight: false,
        currentEnemy: null,
        exploreCooldown: false,
        npcInteractionLock: false,
        luckBonus: 0,
        specialTicks: [],
        lastXpGain: 0
    };
    initStarter();
    enableAllButtons();
    renderAll();
}



/* --- Helpers DOM & log --- */
function $(id) { return document.getElementById(id); }
function log(msg) {
    const el = $('log');
    const time = new Date().toLocaleTimeString();
    const coloredMsg = colorizeWithMap(msg);

    // 🌟 Thêm giờ và render vào nhật ký
    const entry = `<div>★ ${time} — ${coloredMsg}</div>`;
    el.innerHTML += entry;
    el.scrollTop = el.scrollHeight;
}



/* ===========================
   AGE REGEN: +1 every 5 seconds
   =========================== */
startAging();


/* ===========================
AUTO TRAIN / AUTO FIGHT
- train tick grants xp and
=========================== */
let trainTimer = null, fightTimer = null;
window._autoFightOn = !!window._autoFightOn;
function startAutoTrain() {
    if (trainTimer) clearInterval(trainTimer);
    trainTimer = setInterval(() => {
        if (state.hp <= 0) return;
        let base = Math.max(1, Math.floor(state.power * (0.5 + Math.random() * 0.6)));
        // apply special tick items
        state.inventory.forEach(it => { if (it.effect === 'xp_tick') base += it.value; });
        gainXP(base);
        // small age consumption occasionally
        if (Math.random() < 0.18) state.maxAge = Math.max(1, state.maxAge - 1);
        if (Math.random() < 0.015) {
            state.maxAge = Math.max(1, state.maxAge - 3);
            log('Tu luyện gặp cố, mất tuổi thọ.');
        }

        updateTrainingUI();
    }, 2000);
}

function updateTrainingUI() {
    // Cập nhật thanh XP
    const need = getNeed();
    const xpTxt = $('xpTxt');
    const xpBar = $('xpBar');

    if (xpTxt) {
        const xpGain = Number.isFinite(state.lastXpGain) ? state.lastXpGain : 0;
        const gainLabel = xpGain === 0 ? '' : ` (${xpGain >= 0 ? '+' : ''}${xpGain})`;
        xpTxt.textContent = `${state.xp}${gainLabel} / ${need}`;
    }

    if (xpBar) {
        const xpPercent = Math.min(100, Math.round(state.xp / need * 100));
        xpBar.style.width = `${xpPercent}%`;
    }

    // Cập nhật tuổi thọ (nếu bị giảm)
    updateAgeDisplay();
}
function stopAutoTrain() { if (trainTimer) clearInterval(trainTimer); trainTimer = null; }

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

        let skillUsed = false;

        if (typeof getUsableActiveSkills === 'function') {
            const usableSkills = getUsableActiveSkills();

            for (let skill of usableSkills) {
                if (skill.canUse && !state.skillUsedThisTurn) {
                    if (typeof useActiveSkill === 'function') {
                        skillUsed = useActiveSkill(skill.id);
                        if (skillUsed) break; // Chỉ dùng 1 skill mỗi lượt
                    }
                }
            }
        }
            pvpAttackOrLocal();
    }, 2400);
}
window.updateAutoFightLoop = updateAutoFightLoop;

/* ===========================
   RENDERING UI
   =========================== */
let _renderAllQueued = false;
function renderAllImmediate() {
    renderTopStats();
    renderInventory();
    renderShop();
    if (state.currentEnemy) syncEnemyToRealm(state.currentEnemy);
    renderCurrentEnemy();
    renderRootTable();

    // 🆕 Render skill UI
    if (typeof renderSkillsUI === 'function') {
        renderSkillsUI();
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

const BASE_REALM_PROFILE = { power: 15, hp: 120, def: 5 };

function computeCultivationProfile(baseStats, realmIndex = 0, realmStage = 0, opts = {}) {
    const stats = {
        power: Math.max(1, baseStats?.power ?? BASE_REALM_PROFILE.power),
        hp: Math.max(1, baseStats?.hp ?? BASE_REALM_PROFILE.hp),
        def: Math.max(1, baseStats?.def ?? BASE_REALM_PROFILE.def)
    };
    const rank = Math.max(0, opts.rootRank ?? 0);
    const elementCount = Math.max(1, opts.elementCount || (opts.elements?.length ?? 1));

    if (typeof calculateMajorGain === 'function') {
        for (let realm = 0; realm < realmIndex; realm++) {
            const gain = calculateMajorGain({
                prevRealm: realm,
                newRealm: realm + 1,
                prevScale: sampleRealmScale(realm, 3, rank),
                newScale: sampleRealmScale(realm + 1, 0, rank),
                rootRank: rank,
                elementCount
            });
            stats.power += gain.powInc;
            stats.hp += gain.hpInc;
            stats.def += gain.defInc;
        }
    }

    if (typeof calculateStageGain === 'function' && realmStage > 0) {
        const stageGain = calculateStageGain(realmIndex, 0, realmStage, rank);
        stats.power += stageGain.powInc;
        stats.hp += stageGain.hpInc;
        stats.def += stageGain.defInc;
    }

    return {
        power: Math.max(1, Math.floor(stats.power)),
        hp: Math.max(1, Math.floor(stats.hp)),
        def: Math.max(1, Math.floor(stats.def))
    };
}

function sampleRealmScale(realm, stage, rank) {
    if (typeof getHeavenScale === 'function') {
        const v = getHeavenScale(realm, stage, rank);
        if (Number.isFinite(v) && v > 0) return v;
    }
    return 1 + realm * 0.8 + stage * 0.3 + rank * 0.12;
}

function getRealmProfile(realmIndex = 0, opts = {}) {
    return computeCultivationProfile(BASE_REALM_PROFILE, realmIndex, 0, opts);
}

function syncEnemyToRealm(enemy, override) {
    if (!enemy) return enemy;

    if (enemy.__basePower == null) enemy.__basePower = Math.max(1, enemy.str || enemy.baseStr || BASE_REALM_PROFILE.power);
    if (enemy.__baseHp == null) enemy.__baseHp = Math.max(1, enemy.maxHp || enemy.hp || BASE_REALM_PROFILE.hp);
    if (enemy.__baseDef == null) enemy.__baseDef = Math.max(1, enemy.def || enemy.baseDef || BASE_REALM_PROFILE.def);

    const rank = override?.rootRank ?? enemy.rootRank ?? 2;
    const elementCount = override?.elementCount ?? (enemy.elements?.length || 1);
    const profile = getRealmProfile(enemy.realmIndex || 0, { rootRank: rank, elementCount });
    const baseProfile = getRealmProfile(0, { rootRank: rank, elementCount });

    const powRatio = profile.power / Math.max(1, baseProfile.power);
    const hpRatio = profile.hp / Math.max(1, baseProfile.hp);
    const defRatio = profile.def / Math.max(1, baseProfile.def);

    const stageFactor = 1 + Math.max(0, enemy.realmStage || 0) * 0.35;
    const ferocity = Math.max(1, override?.ferocity ?? enemy.baseFerocity ?? enemy.ferocity ?? 1);
    enemy.ferocity = ferocity;

    enemy.str = Math.max(4, Math.floor(enemy.__basePower * powRatio * stageFactor * ferocity));
    enemy.maxHp = Math.max(30, Math.floor(enemy.__baseHp * hpRatio * stageFactor * ferocity));
    enemy.def = Math.max(3, Math.floor(enemy.__baseDef * defRatio * stageFactor));
    enemy.hp = Math.max(1, Math.min(enemy.maxHp, enemy.hp || enemy.maxHp));

    const playerState = (typeof state !== 'undefined') ? state : null;
    const playerPower = Math.max(4, playerState ? (playerState.totalPower || playerState.power || 4) : profile.power);
    const playerHp = Math.max(30, playerState ? (playerState.totalMaxHp || playerState.maxHp || 30) : profile.hp);
    const playerDef = Math.max(3, playerState ? (playerState.totalDef || playerState.defense || 3) : profile.def);
    const playerRealm = playerState?.realmIndex ?? 0;
    const realmGap = (enemy.realmIndex ?? playerRealm) - playerRealm;

    const powerCapBase = realmGap >= 0
        ? 2.2 + realmGap * 0.65
        : Math.max(1.35, 2.2 + realmGap * 0.55);
    const hpCapBase = realmGap >= 0
        ? 3.2 + realmGap * 1.1
        : Math.max(1.6, 3.2 + realmGap * 0.8);
    const defCapBase = realmGap >= 0
        ? 2.0 + realmGap * 0.45
        : Math.max(1.25, 2.0 + realmGap * 0.35);

    const powerCap = powerCapBase * ferocity;
    const hpCap = hpCapBase * Math.max(1, ferocity * 0.9);
    const defCap = defCapBase * Math.max(1, Math.pow(ferocity, 0.6));

    enemy.str = Math.max(4, Math.min(enemy.str, Math.floor(playerPower * powerCap)));
    enemy.maxHp = Math.max(30, Math.min(enemy.maxHp, Math.floor(playerHp * hpCap)));
    enemy.totalMaxHp = enemy.maxHp;
    enemy.hp = Math.max(1, Math.min(enemy.maxHp, enemy.hp));
    enemy.def = Math.max(3, Math.min(enemy.def, Math.floor(playerDef * defCap)));

    const rewardPowerRatio = enemy.str / Math.max(1, playerPower);
    const rewardHpRatio = enemy.maxHp / Math.max(1, playerHp);
    const rewardDefRatio = enemy.def / Math.max(1, playerDef);
    const rewardBase = Math.max(rewardPowerRatio * 0.7, rewardHpRatio * 0.25, rewardDefRatio * 0.4) * Math.max(1, ferocity * 0.85);

    enemy.rewardMult = Math.max(enemy.rewardMult || ferocity, rewardBase);
    return enemy;
}

if (typeof window !== 'undefined') {
    window.getRealmProfile = window.getRealmProfile || getRealmProfile;
    window.syncEnemyToRealm = syncEnemyToRealm;
    window.computeCultivationProfile = window.computeCultivationProfile || computeCultivationProfile;
}

function recalculateStats() {
    // Chỉ số gốc
    const baseHp = state.maxHp;
    const basePower = state.power;
    const baseDef = state.defense;

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
    recalculateStats(); // đảm bảo luôn tính mới

    const atkBonus = getEquippedAtk();
    const hpBonus = getEquippedHp();
    const defBonus = getEquippedDef();

    const top = $('statsTop');
    const need = getNeed();
    const realmDisplay = colorizeWithMap(REALMS[state.realmIndex]);
    const stageDisplay = colorizeWithMap(STAGES[state.realmStage]);
    const rootRankDisplay = colorizeWithMap(ROOT_RANKS[state.root.rank]);

    const powerDisplay = `${state.totalPower}${atkBonus > 0 ? ` (+${atkBonus})` : ''}`;
    const defDisplay = `${state.totalDef}${defBonus > 0 ? ` (+${defBonus})` : ''}`;
    const hpDisplay = `${Math.floor(state.hp)} / ${state.totalMaxHp}${hpBonus > 0 ? ` (+${hpBonus})` : ''}`;

    // 🧙‍♂️ Lấy đạo danh (nếu chưa có thì fallback "Vô Danh Tu Sĩ")
    const playerName = state.name || localStorage.getItem("playerName") || "Vô Danh Tu Sĩ";

    const xpGain = Number.isFinite(state.lastXpGain) ? state.lastXpGain : 0;
    const gainLabel = xpGain === 0 ? '' : ` (${xpGain >= 0 ? '+' : ''}${xpGain})`;

    top.innerHTML = `
        <div class="stat name-box">
            <b>Đạo danh</b>
            <div id="playerName" style="font-weight:bold; color:#e6c97a; font-size:1.1em;">
                ${playerName}
            </div>
        </div>

        <div class="stat"><b>Cảnh giới</b>
            <div>${realmDisplay} 
            <span class="badge">${stageDisplay}</span></div>
        </div>

        <div class="stat"><b>Tu vi</b>
            <div id="xpTxt">${state.xp}${gainLabel} / ${need}</div>
            <div class="bar"><i id="xpBar" style="width:${Math.min(100, Math.round(state.xp / need * 100))}%"></i></div>
        </div>

        <div class="stat"><b>HP</b>
            <div id="hpTxt">${hpDisplay}</div>
            <div class="bar"><i id="hpBar" style="width:${Math.round(state.hp / state.totalMaxHp * 100)}%"></i></div>
        </div>

        <div class="stat"><b>Sức mạnh</b>
            <div id="powerTxt">${powerDisplay}</div>
        </div>

        <div class="stat"><b>Sát thương dao động</b>
            <div>${Math.floor(state.totalPower * 0.7)} – ${Math.floor(state.totalPower * 1.3)}</div>
        </div>

        <div class="stat"><b>Phòng thủ</b>
            <div id="defTxt">${defDisplay}</div>
        </div>

        <div class="stat"><b>Linh căn</b>
            <div id="rootTxt">${state.root.elements.map(colorizeElement).join(' ')} (${rootRankDisplay})</div>
        </div>

        <div class="stat"><b>Tuổi thọ</b>
            <div id="ageTxt">${state.age} / ${state.maxAge}</div>
            <div class="bar"><i id="ageBar" style="width:${Math.min(100, Math.round(state.age / state.maxAge * 100))}%"></i></div>
        </div>

        <div class="stat"><b>Linh thạch</b>
            <div id="goldTxt">${state.gold}</div>
        </div>
    `;
}



// 🌟 Biến điều khiển lọc và phân trang
let inventoryFilter = 'all';
let inventoryPage = 0;
const ITEMS_PER_PAGE = 4;

// 🔍 Đặt bộ lọc
function setInventoryFilter(type) {
    inventoryFilter = type;
    inventoryPage = 0;
    renderInventory();
}

// 📄 Chuyển trang
function changeInventoryPage(offset) {
    const filtered = getFilteredInventory();
    const maxPage = Math.floor((filtered.length - 1) / ITEMS_PER_PAGE);
    inventoryPage = Math.max(0, Math.min(maxPage, inventoryPage + offset));
    renderInventory();
}

// 📦 Lọc vật phẩm theo loại
function getFilteredInventory() {
    return state.inventory.filter(item => {
        if (inventoryFilter === 'equipped') return item.equipped === true;
        if (inventoryFilter === 'usable')
            return ['consumable', 'xp', 'life', 'power', 'defense', 'luck'].includes(item.type);
        if (inventoryFilter === 'relic') return item.type === 'relic';
        if (inventoryFilter === 'root') return item.type === 'root';
        if (inventoryFilter === 'root_frag') return item.type === 'root_frag';
        if (inventoryFilter === 'manual') return item.type === 'manual';
        return true;
    });
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

    filterEl.innerHTML = `
                <div class="inventory-filter-row">
                    <label for="inventoryFilterSelect">Bộ lọc</label>
                    <select id="inventoryFilterSelect">
                        <option value="all">Tất cả</option>
                        <option value="equipped">Đang mặc</option>
                        <option value="equipment">Trang bị</option>
                        <option value="manual">Công pháp</option>
                        <option value="usable">Dùng được</option>
                        <option value="relic">Thánh vật</option>
                        <option value="root">Linh căn</option>
                        <option value="root_frag">Mảnh linh căn</option>
                    </select>
                </div>
                <button class="equip-all-btn" onclick="equipAll()">🧤 Mặc tất cả</button>
            `;
    const filterSelect = document.getElementById('inventoryFilterSelect');
    if (filterSelect) {
        filterSelect.value = inventoryFilter;
        filterSelect.onchange = (ev) => setInventoryFilter(ev.target.value);
    }

    const filtered = getFilteredInventory();
    if (!filtered.length) {
        listEl.innerHTML = '<div class="small">Không có vật phẩm nào.</div>';
        return;
    }

    const start = inventoryPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, end);

    pageItems.forEach((item, idx) => {
        const realIndex = state.inventory.indexOf(item);
        const d = document.createElement('div');
        d.className = 'item';

        let desc = '';
        if (item.type === 'xp') desc = `(+${item.value} Tu vi)`;
        else if (item.type === 'power') desc = `(+${item.value} Sức mạnh)`;
        else if (item.type === 'life') desc = `(+${item.value} Thọ nguyên)`;
        else if (item.type === 'weapon') desc = `(ATK +${item.atk})`;
        else if (item.type === 'armor') desc = `(DEF +${item.def}, HP +${item.hp})`;
        else if (item.type === 'defense') desc = `(maxDEF +${item.value})`;
        else if (item.type === 'relic') desc = `💠 Linh Bảo — ${item.effect} (${item.uses} lần)`;
        else if (item.type === 'luck') desc = `Tăng cường vận khí — +${item.value * 100}% vận may)`;

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

        else {
            d.innerHTML = `
                        <div><b>${item.name}</b> ${desc}</div>
                        <div class="inv-buttons">
                            ${item.type === 'weapon' || item.type === 'armor'
                    ? `<button class="equip-btn" onclick="useItem(${realIndex})">
                                    ${item.equipped ? '🧤 Đang mặc' : '⚙️ Trang bị'}
                                </button>`
                    : item.type === 'relic'
                        ? `<button class="use-btn" onclick="useRelic('${item.name}')">✨ Kích hoạt</button>`
                        : `<button class="use-btn" onclick="useItem(${realIndex})">Dùng</button>`
                }
                            <button class="discard-btn" onclick="discardItem(${realIndex})">🗑️ Vứt</button>
                        </div>
                    `;
        }

        listEl.appendChild(d);
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
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
}


function equipAll() {
    let equippedCount = 0;

    state.inventory.forEach((item, idx) => {
        if ((item.type === 'weapon' || item.type === 'armor') && !item.equipped) {
            useItem(idx); // dùng hàm trang bị sẵn có
            equippedCount++;
        }
    });

    renderInventory();
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

/* ===========================
    STARTER: give starter items and render
=========================== */
function initStarter() {
    startAging();
    // 🎴 Thiết lập vật phẩm khởi thủy
    state.inventory = [
        { name: 'Kiếm Gỗ', type: 'weapon', atk: 4, desc: 'Vũ khí khởi thủy', equipped: true },
        { name: 'Áo Lót', type: 'armor', hp: 20, def: 3, desc: 'Giáp sơ cấp', equipped: true }
    ];

    state.hp = state.maxHp;
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
function saveProgress() {
    localStorage.setItem('tt_state_complete_v2', JSON.stringify(state));
    log('Lưu tiến trình thành công.');
}
function loadProgress() {
    const s = localStorage.getItem('tt_state_complete_v2');
    if (!s) { log('Không tìm thấy save.'); return; }
    state = JSON.parse(s);
    state.lastXpGain = state.lastXpGain || 0;
    log('Tải tiến trình thành công.');
    renderAll();
}
function turnLogCultivation() {
    showXpLog = !showXpLog;

    const btn = document.getElementById('toggleXpLog');
    if (showXpLog) {
        btn.textContent = 'Tắt log tu vi';
        log('🧘‍♂️ Đại nhân mở lại hiển thị biến động tu vi.');
    } else {
        btn.textContent = 'Bật log tu vi';
        log('🕯️ Đại nhân tĩnh tâm nhập định, tạm ẩn biến động tu vi.');
    }
}

/* ===========================
    UI HOOKS
=========================== */
$('toggleAuto').onclick = () => {
    state.autoTrain = !state.autoTrain;
    if (state.autoTrain) { $('toggleAuto').innerText = 'Dừng tu luyện auto'; startAutoTrain(); log('Bật auto tu luyện.'); }
    else { $('toggleAuto').innerText = 'Bắt đầu tu luyện auto'; stopAutoTrain(); log('Tắt auto tu luyện.'); }
};
$('autoFight').onclick = () => {
    // use new auto-fight loop (toggle text too)
    if (window._autoFightOn) { $('autoFight').innerText = 'Bật auto chiến'; window.stopAutoFight && window.stopAutoFight(); }
    else { $('autoFight').innerText = 'Tắt auto chiến'; window.startAutoFight && window.startAutoFight(); }
};
$('explore').onclick = () => explore();
$('fightNow').onclick = () => pvpAttackOrLocal();
$('runBtn').onclick = () => runFromBattle();
// changed to window-safe call to avoid "findMatchPvP is not defined"
$('findMatch').onclick = () => { if (window.findMatchPvP) window.findMatchPvP(); };
$('saveBtn').onclick = () => saveProgress();
$('loadBtn').onclick = () => loadProgress();
$('toggleXpLog').onclick = () => turnLogCultivation();
const shopBtn = $('openShop');
if (shopBtn) shopBtn.onclick = () => window.openShopModal && window.openShopModal();
const clearBtn = $('clearStorage');
if (clearBtn) clearBtn.onclick = () => clearSavedProfile();


function setGameVersionLabel() {
    const version = document.body.getAttribute('data-game-version');
    const el = document.getElementById('gameVersion');
    if (el && version) el.textContent = `v${version}`;

}


setGameVersionLabel();
log('Game đã khởi tạo: hệ thống đầy đủ (spawn rules 50/40/10, đột phá, linh căn, shop, NPC).');
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