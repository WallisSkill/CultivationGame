const fs = require('fs');
const path = require('path');

function locateGitDir(startDir) {
	const seen = new Set();
	let dir = path.resolve(startDir);
	const { root } = path.parse(dir);
	while (!seen.has(dir)) {
		seen.add(dir);
		const candidate = path.join(dir, '.git');
		if (fs.existsSync(candidate)) return candidate;
		if (dir === root) break;
		dir = path.dirname(dir);
	}
	return null;
}

const gitDir =
	locateGitDir(process.cwd()) ||
	locateGitDir(__dirname) ||
	locateGitDir(path.resolve(__dirname, '..')) ||
	locateGitDir(path.resolve(__dirname, '..', 'basegame'));

if (!gitDir) {
	throw new Error('Không thấy thư mục .git/hooks — chạy script trong repo sau khi init git.');
}

const repoRoot = path.dirname(gitDir);
const indexPath = fs.existsSync(path.join(repoRoot, 'basegame', 'index.html'))
	? 'basegame/index.html'
	: 'index.html';

const hookPath = path.join(gitDir, 'hooks', 'pre-commit');
const hook = `#!/bin/sh
node scripts/updateVersion.js || exit 1
git add ${indexPath}
`;

fs.writeFileSync(hookPath, hook, { encoding: 'utf8' });
fs.chmodSync(hookPath, 0o755);
console.log('✔️ Đã cài hook pre-commit. Mỗi lần commit sẽ cập nhật version tự động.');
