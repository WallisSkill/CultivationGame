/* ===========================
    KHUNG TOÀN MÀN HÌNH: cột phải chia tab, màn hẹp thì cột phải thành ngăn kéo
=========================== */
const SIDE_TAB_KEY = 'tt_side_tab';
const SIDE_DRAWER_WIDTH = 900;

function sideIsDrawer() {
    return window.innerWidth <= SIDE_DRAWER_WIDTH;
}

function showSideTab(tab) {
    document.querySelectorAll('#sideTabs button').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
    document.querySelectorAll('.side [data-tab]:not(button)').forEach(panel => panel.classList.toggle('tab-on', panel.dataset.tab === tab));
}

function setSideTab(tab) {
    const closing = sideIsDrawer() && document.body.classList.contains('side-open') && document.querySelector(`#sideTabs button.active`)?.dataset.tab === tab;
    document.body.classList.toggle('side-open', !closing);
    showSideTab(tab);
    document.querySelector('.side-pane').scrollLeft = 0;
    try { localStorage.setItem(SIDE_TAB_KEY, tab); } catch { }
}

/* Không cuộn: nội dung dài chia cột ngang, nút trang lật từng cột; trận đấu thì thu nhỏ cho vừa */
const PAGED_SELECTOR = '.side-pane, .world-modal-box, #itemDetailModal > div, #shopModalList, #gemFusionList, #testPanel';
const PAGE_GAP = 24;
const PAGER_MS = 300;

function pagerFlip(el, delta) {
    el.scrollLeft += delta * (el.clientWidth + PAGE_GAP);
}

function ensurePager(el) {
    if (el.__pager?.isConnected) return el.__pager;
    const pager = document.createElement('div');
    pager.className = 'pager';
    pager.innerHTML = '<button aria-label="Trang trước">⬅</button><span></span><button aria-label="Trang sau">➡</button>';
    const [prev, next] = pager.querySelectorAll('button');
    prev.onclick = () => { pagerFlip(el, -1); refreshPagers(); };
    next.onclick = () => { pagerFlip(el, 1); refreshPagers(); };
    el.after(pager);
    el.classList.add('paged');
    el.__pager = pager;
    return pager;
}

function fitBattle() {
    const panel = document.querySelector('.panel-combat');
    if (!panel) return;
    if (!panel.classList.contains('battle-overlay')) { panel.style.zoom = ''; return; }
    if (panel.scrollHeight <= panel.clientHeight + 1) return;
    panel.style.zoom = (parseFloat(panel.style.zoom) || 1) * panel.clientHeight / panel.scrollHeight;
}

function refreshPagers() {
    document.querySelectorAll(PAGED_SELECTOR).forEach(el => {
        const pager = ensurePager(el);
        const step = el.clientWidth + PAGE_GAP;
        const pages = step > PAGE_GAP ? Math.round((el.scrollWidth + PAGE_GAP) / step) : 1;
        const page = Math.min(pages, Math.round(el.scrollLeft / step) + 1);
        pager.classList.toggle('on', pages > 1);
        pager.querySelector('span').textContent = `Trang ${page}/${pages}`;
    });
    fitBattle();
}

(function initShell() {
    let tab = 'hero';
    try { tab = localStorage.getItem(SIDE_TAB_KEY) || tab; } catch { }
    if (!document.querySelector(`#sideTabs button[data-tab="${tab}"]`)) tab = 'hero';
    showSideTab(tab);
    setInterval(refreshPagers, PAGER_MS);
})();
