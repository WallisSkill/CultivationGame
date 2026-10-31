/* ===========================
    BẢNG PVP Ở TÔNG MÔN — khác Thiên Kiêu Bảng: chỉ tính elo.
    - Chỉ trận ghép qua Đấu trường xếp hạng mới cộng trừ elo, thách đấu bạn bè không tính.
    - Máy chủ giữ elo và bảng. Bên thua báo kết quả, bên rời mạng tính là thua.
    - Hết ngày, top đã đánh trong ngày được ghi thưởng; thưởng tính theo cảnh giới lúc nhận.
=========================== */
const RANKED_REWARD_TIERS = [
    { upTo: 1, goldRefs: 50, hours: 6, gems: 2 },
    { upTo: 3, goldRefs: 30, hours: 3, gems: 1 },
    { upTo: 10, goldRefs: 15, hours: 1, gems: 0 }
];

const rankedState = { board: [], me: null };

function rankedTier(rank) {
    return RANKED_REWARD_TIERS.find(tier => rank <= tier.upTo) || null;
}

function reportRankedLoss() {
    if (!pvpSession.matchId) return;
    wsSend({ type: 'ranked_result', matchId: pvpSession.matchId, lost: true });
    pvpSession.matchId = null;
}

function claimRankedReward({ day, rank }) {
    const tier = rankedTier(rank);
    if (!tier) return;
    const gold = goldRef(state.realmIndex) * tier.goldRefs;
    state.gold += gold;
    const xp = gainCultivationHours(tier.hours);
    log(`📊 Thưởng Bảng PvP ngày ${sectEscape(String(day))}, hạng ${rank}: +${formatNumber(gold)} linh thạch, +${formatNumber(xp)} tu vi.`);
    for (let i = 0; i < tier.gems; i++) grantGemDrop({ source: 'Bảng PvP' });
    showToast(`Nhận thưởng Bảng PvP hạng ${rank}!`, 'info');
}

function renderRankedBoard() {
    const modal = document.getElementById('rankedModal');
    if (modal?.style.display === 'none' || !modal) return;
    openRankedModal();
}

function openRankedModal() {
    const rows = rankedState.board.map((entry, i) => `<div class="sect-row ${entry.id === state.profileId ? 'tj-me' : ''}">
        <span>${i < 3 ? ['🥇', '🥈', '🥉'][i] : `${i + 1}.`} ${sectEscape(entry.name)} <span class="small">${entry.wins}T ${entry.losses}B</span></span>
        <b>${formatNumber(entry.elo)}</b></div>`).join('');
    const me = rankedState.me;
    const mine = me && me.wins + me.losses > 0
        ? `<div class="small"><b>Của ngươi:</b> hạng ${me.rank} · ${formatNumber(me.elo)} elo · ${me.wins} thắng ${me.losses} thua</div>`
        : '<div class="small">Ngươi chưa có trận xếp hạng nào.</div>';
    const rewards = RANKED_REWARD_TIERS.map((tier, i) => {
        const from = i ? RANKED_REWARD_TIERS[i - 1].upTo + 1 : 1;
        const label = from === tier.upTo ? `Hạng ${from}` : `Hạng ${from}–${tier.upTo}`;
        return `<div class="small">${label}: ${formatNumber(goldRef(state.realmIndex) * tier.goldRefs)} linh thạch, ${tier.hours} giờ tu vi${tier.gems ? `, ${tier.gems} linh ngọc` : ''}</div>`;
    }).join('');
    openWorldModal('rankedModal', '📊 Bảng PvP', `${mine}
        <div class="small">Tìm trận ở Đấu trường xếp hạng để cộng trừ elo, thách đấu bạn bè không tính. Mỗi cặp chỉ tính ${RANKED_PAIR_LIMIT} trận một ngày, rời trận tính là thua.</div>
        ${rows || '<div class="small">Chưa có ai trên bảng.</div>'}
        <div class="small" style="margin-top:10px"><b>Thưởng mỗi ngày lúc 0 giờ</b> (top đã đánh trong ngày)</div>${rewards}`);
}

const RANKED_PAIR_LIMIT = 3;

function openRankedBoard() {
    wsSend({ type: 'ranked_get' });
    openRankedModal();
}

function handleRankedMessage(msg) {
    if (msg.type === 'ranked_rewards') {
        (Array.isArray(msg.rewards) ? msg.rewards : []).forEach(claimRankedReward);
        renderAll();
        return;
    }
    rankedState.board = Array.isArray(msg.board) ? msg.board : [];
    rankedState.me = msg.me || null;
    if (msg.change) log(`📊 Elo ${msg.change > 0 ? '+' : ''}${msg.change} → ${formatNumber(msg.me?.elo || 0)}.`);
    renderRankedBoard();
}

if (typeof window !== 'undefined') Object.assign(window, { openRankedBoard });
