/* ===========================
    CHAT ĐẠO HỮU
    - Gửi qua kênh pvp_relay của máy chủ (sessionId 'chat'), máy chủ không lưu tin.
    - Lịch sử lưu trong localStorage theo từng đạo hữu.
    - Tin chưa được xác nhận giữ trạng thái pending, gửi lại khi đối phương online.
=========================== */
const CHAT_SESSION = 'chat';
const CHAT_MAX_LENGTH = 500;
const CHAT_HISTORY_LIMIT = 500;
const CHAT_RETRY_MS = 60000;
/* Tải lại trang: socket cũ đóng sau khi socket mới đăng ký thì máy chủ mất định tuyến tới ta */
const CHAT_REREGISTER_MS = 3000;

const chatState = { threads: {}, unread: {}, openId: null };

function chatStorageKey() {
    return `tt_chat_${state.profileId || 'local'}`;
}

function saveChat() {
    try {
        localStorage.setItem(chatStorageKey(), JSON.stringify({ threads: chatState.threads, unread: chatState.unread }));
    } catch (e) {
        console.error('Failed to save chat:', e);
    }
}

function initChat() {
    try {
        const loaded = JSON.parse(localStorage.getItem(chatStorageKey()) || '{}');
        chatState.threads = loaded.threads || {};
        chatState.unread = loaded.unread || {};
    } catch (e) {
        console.error('Failed to load chat:', e);
    }
    setInterval(flushPendingChat, CHAT_RETRY_MS);
}

function chatThread(friendId) {
    if (!chatState.threads[friendId]) chatState.threads[friendId] = [];
    return chatState.threads[friendId];
}

function pushChatMessage(friendId, message) {
    const thread = chatThread(friendId);
    thread.push(message);
    if (thread.length > CHAT_HISTORY_LIMIT) thread.splice(0, thread.length - CHAT_HISTORY_LIMIT);
    saveChat();
}

function relayChat(friendId, kind, data) {
    return wsSend({ type: 'pvp_relay', to: friendId, sessionId: CHAT_SESSION, kind, data });
}

function sendChatPayload(friendId, message) {
    return relayChat(friendId, 'chat', { id: message.id, text: message.text, ts: message.ts });
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const friendId = chatState.openId;
    if (!input || !friendId) return;
    const text = input.value.trim().slice(0, CHAT_MAX_LENGTH);
    if (!text) return;
    const message = { id: `${state.profileId}_${Date.now().toString(36)}`, mine: true, text, ts: Date.now(), status: 'pending' };
    pushChatMessage(friendId, message);
    sendChatPayload(friendId, message);
    input.value = '';
    input.focus();
    renderChatMessages();
}

function flushPendingChat(onlyFriendId = null) {
    if (!window.matchConnected) return;
    Object.keys(chatState.threads).forEach(friendId => {
        if (onlyFriendId && friendId !== onlyFriendId) return;
        chatState.threads[friendId].filter(m => m.mine && m.status === 'pending').forEach(m => sendChatPayload(friendId, m));
    });
}

function handleChatRelay(msg) {
    const friend = friendsState.friends.find(f => f.id === msg.from);
    if (!friend || !msg.data) return;

    if (msg.kind === 'chat_ack') {
        const message = chatThread(msg.from).find(m => m.id === msg.data.id);
        if (message) {
            message.status = 'sent';
            saveChat();
            if (chatState.openId === msg.from) renderChatMessages();
        }
        return;
    }

    const { id, text, ts } = msg.data;
    if (typeof id !== 'string' || typeof text !== 'string') return;
    relayChat(msg.from, 'chat_ack', { id });
    if (chatThread(msg.from).some(m => m.id === id)) return;

    pushChatMessage(msg.from, { id, mine: false, text: text.slice(0, CHAT_MAX_LENGTH), ts: Number(ts) || Date.now() });
    if (chatState.openId === msg.from) {
        renderChatMessages();
        return;
    }
    chatState.unread[msg.from] = (chatState.unread[msg.from] || 0) + 1;
    saveChat();
    showToast(`💬 ${friend.name}: ${text.slice(0, 60)}`, 'info');
    renderFriendsUI();
}

function chatEscape(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatChatTime(ts) {
    return new Date(ts).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
}

function renderChatMessages() {
    const box = document.getElementById('chatMessages');
    if (!box) return;
    const thread = chatThread(chatState.openId);
    box.innerHTML = thread.map(m => `<div class="chat-msg ${m.mine ? 'mine' : ''}">
        <div>${chatEscape(m.text)}</div>
        <div class="small">${formatChatTime(m.ts)}${m.mine && m.status === 'pending' ? ' · chờ gửi' : ''}</div>
    </div>`).join('') || '<div class="small">Chưa có tin nhắn nào.</div>';
    box.scrollTop = box.scrollHeight;
}

function openChat(friendId) {
    const friend = friendsState.friends.find(f => f.id === friendId);
    if (!friend) return;
    chatState.openId = friendId;
    delete chatState.unread[friendId];
    saveChat();
    let modal = document.getElementById('chatModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'chatModal';
        modal.className = 'world-modal';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `<div class="world-modal-box chat-box">
        <div class="world-modal-head"><b>💬 ${chatEscape(friend.name)}</b><button aria-label="Đóng" onclick="closeChat()">✕</button></div>
        <div id="chatMessages" class="chat-messages"></div>
        <div class="chat-input-row">
            <input id="chatInput" type="text" maxlength="${CHAT_MAX_LENGTH}" placeholder="Nhập tin nhắn" aria-label="Tin nhắn"
                onkeydown="if(event.key==='Enter')sendChatMessage()">
            <button class="primary" onclick="sendChatMessage()">Gửi</button>
        </div>
    </div>`;
    modal.style.display = 'flex';
    renderChatMessages();
    document.getElementById('chatInput').focus();
    renderFriendsUI();
}

function closeChat() {
    chatState.openId = null;
    const modal = document.getElementById('chatModal');
    if (modal) modal.style.display = 'none';
}

if (typeof window !== 'undefined') {
    Object.assign(window, { openChat, closeChat, sendChatMessage });
}
