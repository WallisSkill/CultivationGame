const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function locateGitDir(startDir) {
    let currentDir = startDir;
    while (currentDir !== path.dirname(currentDir)) {
        if (fs.existsSync(path.join(currentDir, '.git'))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    return null;
}

const gitDir =
    locateGitDir(process.cwd()) ||
    locateGitDir(__dirname) ||
    locateGitDir(path.resolve(__dirname, '..')) ||
    locateGitDir(path.resolve(__dirname, '..', 'basegame'));

const repoRoot = gitDir ? path.dirname(gitDir) : path.resolve(__dirname, '..');
const indexPathCandidates = [
    path.join(repoRoot, 'basegame', 'index.html'),
    path.join(repoRoot, 'index.html')
];
const indexPath = indexPathCandidates.find(fs.existsSync);

if (!indexPath) {
    throw new Error('Không tìm thấy index.html để cập nhật.');
}


function git(cmd) {
    if (!gitDir) return '';
    return execSync(`git ${cmd}`, { cwd: repoRoot }).toString().trim();
}

function resolveVersion() {
    try {
        const hash = git('rev-parse --short HEAD');
        return hash || 'dev';
    } catch {
        return 'dev';
    }
}

function updateIndex(version) {
    const html = fs.readFileSync(indexPath, 'utf8');
    const updated = html.replace(/data-game-version="[^"]*"/, `data-game-version="${version}"`);
    if (html !== updated) {
        fs.writeFileSync(indexPath, updated);
        console.log(`Game version updated to ${version}`);
    } else {
        console.log('Game version unchanged.');
    }
}

updateIndex(resolveVersion());
