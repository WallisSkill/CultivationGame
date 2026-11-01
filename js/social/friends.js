/* ===========================
    HỆ THỐNG BẠN BÈ
=========================== */

// State quản lý bạn bè
const friendsState = {
    friends: [], // Danh sách bạn bè: [{ id, name, realmIndex, realmStage, online }]
    pendingRequests: [], // Lời mời đang chờ: [{ from, fromName, timestamp }]
    sentRequests: [] // Lời mời đã gửi: [{ to, toName, timestamp }]
};

// Khởi tạo hệ thống bạn bè
function initFriendsSystem() {
    loadFriendsFromStorage();
    setupFriendsEventListeners();
    
    // 🆕 Đảm bảo profileId được load/tạo ngay khi khởi động friends system
    if (!state.profileId) {
        const savedId = localStorage.getItem('tt_profileId');
        if (savedId) {
            state.profileId = savedId;
            console.log('✅ initFriendsSystem: Load profileId từ localStorage:', savedId);
        } else if (typeof buildPublicProfile === 'function') {
            buildPublicProfile();
        }
    }
    
    initChat();
    initPresence();

    // 🆕 Tự động kết nối WebSocket khi khởi động
    if (typeof connectMatchWS === 'function') {
        connectMatchWS().then(connected => {
            if (connected) {
                log('🌐 Đã kết nối hệ thống đạo hữu.');
            }
        });
    }
    
    renderFriendsUI();
}

// Lưu trữ local
function saveFriendsToStorage() {
    try {
        localStorage.setItem('tt_friends', JSON.stringify(friendsState));
    } catch (e) {
        console.error('Failed to save friends:', e);
    }
}

function loadFriendsFromStorage() {
    try {
        const data = localStorage.getItem('tt_friends');
        if (data) {
            const loaded = JSON.parse(data);
            friendsState.friends = loaded.friends || [];
            friendsState.pendingRequests = loaded.pendingRequests || [];
            friendsState.sentRequests = loaded.sentRequests || [];
        }
    } catch (e) {
        console.error('Failed to load friends:', e);
    }
}

// Gửi lời mời kết bạn
function sendFriendRequest(targetId, targetName) {
    if (!targetId || !targetName) {
        log('❌ Thiếu thông tin đối phương.');
        return;
    }

    const myProfile = buildPublicProfile();
    
    // Kiểm tra đã là bạn
    if (friendsState.friends.some(f => f.id === targetId)) {
        log('⚠️ Đã là bạn bè rồi.');
        return;
    }

    // Kiểm tra đã gửi lời mời
    if (friendsState.sentRequests.some(r => r.to === targetId)) {
        log('⏳ Đã gửi lời mời cho người này.');
        return;
    }

    // 🆕 Đảm bảo đã kết nối trước khi gửi
    if (!window.matchConnected) {
        log('🔌 Đang kết nối...');
        connectMatchWS().then(ok => {
            if (ok) {
                sendFriendRequestActual(targetId, targetName, myProfile);
            } else {
                log('❌ Không thể kết nối server.');
            }
        });
        return;
    }

    sendFriendRequestActual(targetId, targetName, myProfile);
}

// 🆕 Hàm thực tế gửi lời mời
function sendFriendRequestActual(targetId, targetName, myProfile) {
    if (wsSend({
        type: 'friend_request',
        to: targetId,
        from: myProfile.id,
        fromName: myProfile.name,
        fromProfile: myProfile
    })) {
        friendsState.sentRequests.push({
            to: targetId,
            toName: targetName,
            timestamp: Date.now()
        });
        saveFriendsToStorage();
        log(`📨 Đã gửi lời mời kết bạn đến ${targetName}.`);
        renderFriendsUI();
    } else {
        log('❌ Không thể gửi lời mời (chưa kết nối server).');
    }
}

// Chấp nhận lời mời
function acceptFriendRequest(fromId, fromName, fromProfile) {
    const myProfile = buildPublicProfile();

    // Xóa khỏi pending
    friendsState.pendingRequests = friendsState.pendingRequests.filter(r => r.from !== fromId);

    // Thêm vào danh sách bạn
    if (!friendsState.friends.some(f => f.id === fromId)) {
        friendsState.friends.push({
            id: fromId,
            name: fromName,
            realmIndex: fromProfile?.realmIndex || 0,
            realmStage: fromProfile?.realmStage || 0,
            rootRank: fromProfile?.rootRank || 0,
            online: true
        });
    }

    // Thông báo cho đối phương
    wsSend({
        type: 'friend_accept',
        to: fromId,
        from: myProfile.id,
        fromName: myProfile.name,
        fromProfile: myProfile
    });

    saveFriendsToStorage();
    log(`✅ Đã chấp nhận lời mời từ ${fromName}.`);
    renderFriendsUI();
}

// Từ chối lời mời
function rejectFriendRequest(fromId, fromName) {
    friendsState.pendingRequests = friendsState.pendingRequests.filter(r => r.from !== fromId);
    
    wsSend({
        type: 'friend_reject',
        to: fromId,
        from: buildPublicProfile().id
    });

    saveFriendsToStorage();
    log(`❌ Đã từ chối lời mời từ ${fromName}.`);
    renderFriendsUI();
}

// Xóa bạn bè
async function removeFriend(friendId, friendName) {
    const ok = await showConfirm(`Xóa ${friendName} khỏi danh sách bạn bè?`);
    if (!ok) return;

    friendsState.friends = friendsState.friends.filter(f => f.id !== friendId);
    
    wsSend({
        type: 'friend_remove',
        to: friendId,
        from: buildPublicProfile().id
    });

    saveFriendsToStorage();
    log(`🗑️ Đã xóa ${friendName} khỏi danh sách bạn bè.`);
    renderFriendsUI();
}

// Mời bạn bè vào PvP
function inviteFriendToPvP(friendId, friendName) {
    // 🆕 Kiểm tra cảnh giới tối thiểu
    if (state.realmIndex < 1) {
        log('❌ Ngươi cần đạt ít nhất Trúc Cơ mới có thể thách đấu!');
        showToast('Cần Trúc Cơ để PvP!', 'warn');
        return;
    }

    if (state.currentEnemy) {
        log('❌ Đang trong trận đấu, không thể gửi lời mời.');
        return;
    }

    coopGate(`Thách đấu ${friendName}`, () => {
        const myProfile = buildPublicProfile();
        wsSend({
            type: 'pvp_invite',
            to: friendId,
            from: myProfile.id,
            fromName: myProfile.name,
            fromProfile: myProfile
        });
        log(`⚔️ Đã gửi lời mời PvP đến ${friendName}.`);
    }, friendId);
}

// Xử lý tin nhắn từ server
function handleFriendsMessage(msg) {
    switch (msg.type) {
        case 'friend_request_sent': {
            // 🆕 Server xác nhận đã gửi, cập nhật tên thật
            const { targetName, targetProfile } = msg;
            const req = friendsState.sentRequests.find(r => r.to === targetProfile?.id);
            if (req) {
                req.toName = targetName || req.toName;
                saveFriendsToStorage();
                renderFriendsUI();
            }
            log(`✅ Đã tìm thấy ${targetName}. Lời mời đã được gửi.`);
            break;
        }
        
        case 'friend_request': {
            // Nhận lời mời kết bạn
            const { from, fromName, fromProfile } = msg;
            
            if (friendsState.friends.some(f => f.id === from)) {
                return; // Đã là bạn
            }

            if (!friendsState.pendingRequests.some(r => r.from === from)) {
                friendsState.pendingRequests.push({
                    from,
                    fromName,
                    fromProfile,
                    timestamp: Date.now()
                });
                saveFriendsToStorage();
                log(`📬 ${fromName} gửi lời mời kết bạn.`);
                showToast(`${fromName} muốn kết bạn với ngươi!`, 'info');
                renderFriendsUI();
            }
            break;
        }

        case 'friend_accept': {
            // Đối phương chấp nhận
            const { from, fromName, fromProfile } = msg;
            
            friendsState.sentRequests = friendsState.sentRequests.filter(r => r.to !== from);
            
            if (!friendsState.friends.some(f => f.id === from)) {
                friendsState.friends.push({
                    id: from,
                    name: fromName,
                    realmIndex: fromProfile?.realmIndex || 0,
                    realmStage: fromProfile?.realmStage || 0,
                    rootRank: fromProfile?.rootRank || 0,
                    online: true
                });
            }

            saveFriendsToStorage();
            log(`✅ ${fromName} đã chấp nhận lời mời kết bạn.`);
            showToast(`${fromName} trở thành đạo hữu!`, 'info');
            renderFriendsUI();
            break;
        }

        case 'friend_reject': {
            // Đối phương từ chối
            const { from } = msg;
            friendsState.sentRequests = friendsState.sentRequests.filter(r => r.to !== from);
            saveFriendsToStorage();
            renderFriendsUI();
            break;
        }

        case 'friend_remove': {
            // Đối phương xóa bạn
            const { from } = msg;
            const friend = friendsState.friends.find(f => f.id === from);
            if (friend) {
                friendsState.friends = friendsState.friends.filter(f => f.id !== from);
                saveFriendsToStorage();
                log(`💔 ${friend.name} đã xóa ngươi khỏi danh sách bạn bè.`);
                renderFriendsUI();
            }
            break;
        }

        case 'friend_online': {
            // 🆕 Bạn bè online - CẬP NHẬT PROFILE ĐẦY ĐỦ
            const { profileId, profile } = msg;
            const friend = friendsState.friends.find(f => f.id === profileId);
            if (friend) {
                friend.online = true;
                
                // 🆕 Cập nhật thông tin mới nhất từ profile
                if (profile) {
                    friend.name = profile.name || friend.name;
                    friend.realmIndex = profile.realmIndex ?? friend.realmIndex;
                    friend.realmStage = profile.realmStage ?? friend.realmStage;
                    friend.rootRank = profile.rootRank ?? friend.rootRank;
                    if (profile.elements) friend.elements = profile.elements;
                }
                
                saveFriendsToStorage();
                renderFriendsUI();
                flushPendingChat(profileId);
            }
            break;
        }

        case 'friend_offline': {
            // Bạn bè offline
            const { profileId } = msg;
            const friend = friendsState.friends.find(f => f.id === profileId);
            if (friend) {
                friend.online = false;
                saveFriendsToStorage();
                renderFriendsUI();
                log(`💤 ${friend.name} đã offline.`);
            }
            break;
        }

        case 'pvp_invite': {
            // Nhận lời mời PvP từ bạn
            const { from, fromName, fromProfile } = msg;
            
            // 🆕 Kiểm tra cảnh giới tối thiểu
            if (state.realmIndex < 1) {
                // Từ chối tự động và thông báo
                wsSend({
                    type: 'pvp_decline',
                    to: from,
                    from: buildPublicProfile().id,
                    reason: 'low_realm'
                });
                log(`❌ ${fromName} gửi lời mời PvP nhưng ngươi chưa đủ cảnh giới (cần Trúc Cơ).`);
                showToast('Cần Trúc Cơ để PvP!', 'warn');
                return;
            }
            
            // 🆕 Kiểm tra đối phương có đủ cảnh giới không
            if (fromProfile && fromProfile.realmIndex < 1) {
                wsSend({
                    type: 'pvp_decline',
                    to: from,
                    from: buildPublicProfile().id,
                    reason: 'opponent_low_realm'
                });
                log(`❌ ${fromName} chưa đủ cảnh giới để thách đấu.`);
                showToast(`${fromName} chưa đủ Trúc Cơ!`, 'warn');
                return;
            }
            
            showDialog({
                message: `${fromName} thách đấu ngươi! Chấp nhận?`,
                buttons: [
                    { text: 'Từ chối', value: false },
                    { text: 'Chiến!', value: true, variant: 'primary' }
                ]
            }).then(accepted => {
                if (accepted) {
                    const myProfile = buildPublicProfile();
                    wsSend({
                        type: 'pvp_accept',
                        to: from,
                        from: myProfile.id,
                        fromName: myProfile.name,
                        fromProfile: myProfile
                    });
                    
                    startPvPBattle(fromProfile);
                } else {
                    wsSend({
                        type: 'pvp_decline',
                        to: from,
                        from: buildPublicProfile().id
                    });
                }
            });
            break;
        }

        case 'pvp_accept': {
            // 🆕 Người kia chấp nhận lời mời PvP
            const { from, fromName, fromProfile } = msg;
            log(`✅ ${fromName} chấp nhận thách đấu!`);
            showToast(`${fromName} chấp nhận thách đấu!`, 'info');
            
            // Bắt đầu trận đấu
            startPvPBattle(fromProfile);
            break;
        }

        case 'pvp_decline': {
            const { from, reason } = msg;
            const friend = friendsState.friends.find(f => f.id === from);
            const name = friend?.name || 'Đạo hữu';
            
            // 🆕 Hiển thị lý do từ chối
            if (reason === 'low_realm') {
                log(`❌ ${name} chưa đủ cảnh giới để thách đấu (cần Trúc Cơ).`);
                showToast(`${name} chưa đủ Trúc Cơ!`, 'warn');
            } else if (reason === 'opponent_low_realm') {
                log(`❌ Ngươi chưa đủ cảnh giới để thách đấu ${name}.`);
                showToast('Ngươi chưa đủ Trúc Cơ!', 'warn');
            } else {
                log(`❌ ${name} từ chối thách đấu.`);
                showToast(`${name} từ chối thách đấu`, 'warn');
            }
            break;
        }
    }
}

// Setup event listeners cho WebSocket
function setupFriendsEventListeners() {
    // Hook vào onMatchMessage để xử lý tin nhắn bạn bè
    const originalOnMatchMessage = window.onMatchMessage;
    
    window.onMatchMessage = function(ev) {
        let msg = {};
        try { msg = JSON.parse(ev.data || '{}'); } catch { return; }

        if (msg.type === 'info' && msg.message === 'Đã đăng ký hồ sơ.') return;
        if (msg.type === 'friend_online') noteProfile(msg.profile);
        if (msg.type === 'friend_offline') onlinePlayers.delete(msg.profileId);
        if (msg.type === 'ranked_board' || msg.type === 'ranked_rewards') {
            handleRankedMessage(msg);
            return;
        }
        if (msg.type?.startsWith('boss_')) {
            handleWorldBossMessage(msg);
            return;
        }
        if (msg.type?.startsWith('world_') || msg.type === 'tianjiao_board') {
            handleWorldMessage(msg);
            return;
        }
        if (msg.type === 'pvp_relay' && msg.sessionId === WORLD_SESSION) {
            handleWorldRelay(msg);
            return;
        }

        // 🆕 Thêm pvp_accept và pvp_decline vào danh sách xử lý
        if (['friend_request', 'friend_request_sent', 'friend_accept', 'friend_reject', 'friend_remove', 
             'friend_online', 'friend_offline', 'pvp_invite', 'pvp_accept', 'pvp_decline'].includes(msg.type)) {
            handleFriendsMessage(msg);
            return;
        }

        if (msg.type === 'pvp_relay' && msg.sessionId === CHAT_SESSION) {
            handleChatRelay(msg);
            return;
        }

        if (msg.type === 'pvp_relay' && msg.sessionId === SECT_SESSION) {
            handleSectRelay(msg);
            return;
        }

        if (msg.type === 'pvp_relay' && msg.sessionId === COOP_SESSION) {
            handleCoopRelay(msg);
            return;
        }

        // Gọi handler cũ cho các message khác
        if (originalOnMatchMessage) {
            originalOnMatchMessage.call(this, ev);
        }
    };
}

// 🆕 Callback khi WebSocket kết nối
window.onFriendsWSConnected = function() {
    renderFriendsUI();
    flushPendingChat();
    sendPresence();
    setTimeout(sendPresence, CHAT_REREGISTER_MS);
};

// Render UI
function renderFriendsUI() {
    const container = document.getElementById('friendsPanel');
    if (!container) return;

    let html = '<h3>👥 Đạo Hữu</h3>';

    // 🆕 Hiển thị trạng thái kết nối
    const connectionStatus = window.matchConnected 
        ? '<span style="color:#4caf50;">🟢 Đã kết nối</span>'
        : '<span style="color:#f44336;">🔴 Chưa kết nối</span>';
    
    html += `
        <div style="margin-bottom:8px; padding:6px; background:rgba(0,0,0,0.2); border-radius:6px; text-align:center; font-size:0.85em;">
            ${connectionStatus}
            ${!window.matchConnected ? '<button onclick="reconnectFriends()" style="padding:4px 8px; font-size:0.8em; margin-left:8px;">🔄 Kết nối lại</button>' : ''}
        </div>
    `;

    // 🆕 Hiển thị ID của mình
    const myProfile = buildPublicProfile();
    html += `
        <div style="margin-bottom:16px; padding:12px; background:rgba(123,228,163,0.1); border-radius:8px;">
            <div style="font-weight:600; margin-bottom:4px;">📇 ID của ngươi</div>
            <div style="display:flex; gap:8px; align-items:center;">
                <input type="text" readonly value="${myProfile.id}" 
                       id="myProfileId"
                       style="flex:1; padding:6px; background:#1a1a1a; border:1px solid #444; border-radius:4px; color:#fff; font-size:0.85em;">
                <button onclick="copyMyProfileId()" style="padding:6px 12px;">📋 Copy</button>
            </div>
            <div class="small" style="margin-top:4px; color:#888;">Chia sẻ ID này để đạo hữu kết bạn với ngươi</div>
        </div>
    `;

    // Form thêm bạn
    html += `
        <div style="margin-bottom:16px; padding:12px; background:rgba(255,255,255,0.05); border-radius:8px;">
            <div style="margin-bottom:8px; font-weight:600;">Kết bạn bằng ID</div>
            <div style="display:flex; gap:8px;">
                <input id="friendIdInput" type="text" placeholder="Dán ID đạo hữu vào đây" 
                       style="flex:1; padding:8px; border-radius:6px; border:1px solid #444; background:#1a1a1a; color:#fff;">
                <button onclick="sendFriendRequestById()" 
                        ${!window.matchConnected ? 'disabled title="Chưa kết nối server"' : ''}
                        style="padding:8px 16px;">📨 Gửi</button>
            </div>
        </div>
    `;

    // Lời mời đang chờ
    if (friendsState.pendingRequests.length > 0) {
        html += '<div style="margin-bottom:16px;"><div style="font-weight:600; margin-bottom:8px;">📬 Lời mời kết bạn</div>';
        friendsState.pendingRequests.forEach(req => {
            html += `
                <div style="padding:10px; margin-bottom:8px; background:rgba(123,228,163,0.1); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <div style="font-weight:600;">${req.fromName}</div>
                        <div class="small">ID: ${req.from.substring(0, 12)}...</div>
                    </div>
                    <div style="display:flex; gap:6px;">
                        <button onclick="acceptFriendRequest('${req.from}', '${req.fromName}', ${JSON.stringify(req.fromProfile).replace(/"/g, '&quot;')})" 
                                style="padding:6px 12px; background:#4caf50;">✅</button>
                        <button onclick="rejectFriendRequest('${req.from}', '${req.fromName}')" 
                                style="padding:6px 12px; background:#f44336;">❌</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Danh sách bạn bè
    html += '<div style="margin-bottom:16px;"><div style="font-weight:600; margin-bottom:8px;">🤝 Bạn bè (' + friendsState.friends.length + ')</div>';
    
    if (friendsState.friends.length === 0) {
        html += '<div class="small" style="padding:12px; text-align:center; color:#888;">Chưa có đạo hữu nào</div>';
    } else {
        friendsState.friends.forEach(friend => {
            const statusColor = friend.online ? '#4caf50' : '#888';
            const statusText = friend.online ? '🟢 Online' : '⚪ Offline';
            
            html += `
                <div style="padding:12px; margin-bottom:10px; background:rgba(255,255,255,0.05); border-radius:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:start;">
                        <div style="flex:1;">
                            <div style="font-weight:600;">${friend.name} <span style="color:${statusColor}; font-size:0.85em;">${statusText}</span></div>
                            <div class="small">ID: ${friend.id.substring(0, 16)}...</div>
                            <div class="small">${colorizeWithMap(REALMS[friend.realmIndex] || 'Luyện Khí')} ${colorizeWithMap(STAGES[friend.realmStage] || 'Sơ Kỳ')}</div>
                            <div class="small">Linh căn: ${colorizeWithMap(ROOT_RANKS[friend.rootRank] || 'Phế Phẩm')}</div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            <button onclick="openChat('${friend.id}')" style="padding:6px 12px; font-size:0.85em;">💬 Chat${chatState.unread[friend.id] ? ` (${chatState.unread[friend.id]})` : ''}</button>
                            ${friend.online ? `<button onclick="inviteFriendToPvP('${friend.id}', '${friend.name}')" style="padding:6px 12px; font-size:0.85em;">⚔️ PvP</button>` : ''}
                            <button onclick="removeFriend('${friend.id}', '${friend.name}')" style="padding:6px 12px; font-size:0.85em; background:#f44336;">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    html += '</div>';

    // Lời mời đã gửi
    if (friendsState.sentRequests.length > 0) {
        html += '<div><div style="font-weight:600; margin-bottom:8px;">📤 Đã gửi lời mời</div>';
        friendsState.sentRequests.forEach(req => {
            html += `
                <div style="padding:8px; margin-bottom:6px; background:rgba(255,255,255,0.03); border-radius:6px;">
                    <div class="small">${req.toName} <span style="color:#888;">(chờ phản hồi)</span></div>
                </div>
            `;
        });
        html += '</div>';
    }

    container.innerHTML = html;
}

// Helper: gửi lời mời bằng ID input
function sendFriendRequestById() {
    const input = document.getElementById('friendIdInput');
    if (!input) return;

    const targetId = input.value.trim();
    if (!targetId) {
        showToast('Vui lòng nhập ID đạo hữu', 'warn');
        return;
    }

    // Tạm dùng ID làm tên, server sẽ trả về tên thật
    sendFriendRequest(targetId, `Đạo hữu ${targetId.substring(0, 8)}`);
    input.value = '';
}

// 🆕 Copy ID của mình
function copyMyProfileId() {
    const input = document.getElementById('myProfileId');
    if (!input) return;
    
    input.select();
    input.setSelectionRange(0, 99999); // Mobile
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value).then(() => {
            showToast('Đã copy ID!', 'info');
            document.execCommand('copy');
        }).catch(() => {
            showToast('Đã copy ID của ngươi!', 'info');
        });
    } else {
        document.execCommand('copy');
        showToast('Đã copy ID của ngươi!', 'info');
    }
}

// 🆕 Hàm kết nối lại
function reconnectFriends() {
    if (typeof connectMatchWS === 'function') {
        log('🔌 Đang kết nối lại...');
        connectMatchWS().then(ok => {
            if (ok) {
                log('✅ Đã kết nối lại thành công.');
                renderFriendsUI();
            } else {
                log('❌ Không thể kết nối.');
            }
        });
    }
}

if (typeof window !== 'undefined') {
    window.initFriendsSystem = initFriendsSystem;
    window.sendFriendRequest = sendFriendRequest;
    window.sendFriendRequestById = sendFriendRequestById;
    window.acceptFriendRequest = acceptFriendRequest;
    window.rejectFriendRequest = rejectFriendRequest;
    window.removeFriend = removeFriend;
    window.inviteFriendToPvP = inviteFriendToPvP;
    window.renderFriendsUI = renderFriendsUI;
    window.copyMyProfileId = copyMyProfileId;
    window.reconnectFriends = reconnectFriends;
}
