const fs = require('fs');
const path = require('path');

/**
 * Tìm thư mục chứa index.html (ưu tiên basegame/index.html nếu có)
 */
function locateGitDir(startDir) {
    let dir = path.resolve(startDir);
    const { root } = path.parse(dir);
    while (true) {
        if (fs.existsSync(path.join(dir, '.git'))) return dir;
        if (dir === root) break;
        dir = path.dirname(dir);
    }
    return null;
}

const repoRoot =
    locateGitDir(process.cwd()) ||
    locateGitDir(__dirname) ||
    locateGitDir(path.resolve(__dirname, '..')) ||
    locateGitDir(path.resolve(__dirname, '..', 'basegame')) ||
    path.resolve(__dirname, '..');

const indexPathCandidates = [
    path.join(repoRoot, 'basegame', 'index.html'),
    path.join(repoRoot, 'index.html')
];
const indexPath = indexPathCandidates.find(fs.existsSync);

if (!indexPath) {
    throw new Error('Không tìm thấy index.html để cập nhật.');
}

/**
 * Sinh chuỗi version theo thời gian thực thi — định dạng YYYYmmDDHHMMss + 6 ký tự random
 */
function resolveVersion() {
    const now = new Date();
    const pad = (n, len = 2) => String(n).padStart(len, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());

    // Sinh chuỗi random gồm 6 ký tự (chữ + số)
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `${year}${month}${day}_${hour}${minute}${second}_${randomStr}`;
}

/**
 * Cập nhật thuộc tính data-game-version trong index.html
 */
function updateIndex(version) {
    const html = fs.readFileSync(indexPath, 'utf8');
    const updated = html.replace(/data-game-version="[^"]*"/, `data-game-version="${version}"`);
    if (html !== updated) {
        fs.writeFileSync(indexPath, updated);
        console.log(`✨ Game version updated to ${version}`);
        console.log(`⚙️  Build time: ${new Date().toLocaleString('vi-VN')}`);
    } else {
        console.log('⚪ Game version unchanged.');
    }
}

updateIndex(resolveVersion());
