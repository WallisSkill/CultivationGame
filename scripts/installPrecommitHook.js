const fs = require('fs');
const path = require('path');

function locateGitRoot(startDir) {
	const dir = path.resolve(startDir);

	if (fs.existsSync(path.join(dir, '.git'))) {
		return dir;
	}

	const parentDir = path.dirname(dir);
	if (parentDir === dir) {
		return null;
	}

	return locateGitRoot(parentDir);
}

const gitRoot =
	locateGitRoot(process.cwd()) ||
	locateGitRoot(__dirname) ||
	locateGitRoot(path.resolve(__dirname, '..')) ||
	locateGitRoot(path.resolve(__dirname, '..', 'basegame'));

if (!gitRoot) throw new Error('Không thấy thư mục .git/hooks — hãy chạy sau khi init git.');
const hooksDir = path.join(gitRoot, '.git', 'hooks');

const updateScriptRel = path.relative(gitRoot, path.join(__dirname, 'updateVersion.js')).split(path.sep).join('/');
const indexRel = fs.existsSync(path.join(gitRoot, 'basegame', 'index.html')) ? 'basegame/index.html' : 'index.html';

const postCommit = `#!/bin/sh
set -e

if [ "$SKIP_VERSION_UPDATE" = "1" ]; then
    exit 0
fi

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

node "$REPO_ROOT/${updateScriptRel}"

if git diff --quiet -- "${indexRel}"; then
    exit 0
fi

git add "${indexRel}"
SKIP_VERSION_UPDATE=1 git commit --amend --no-edit >/dev/null

echo "✔️ Version tag refreshed to $(git rev-parse --short HEAD)"
`;

fs.writeFileSync(path.join(hooksDir, 'post-commit'), postCommit, 'utf8');
fs.chmodSync(path.join(hooksDir, 'post-commit'), 0o755);
console.log('✔️ Đã cài post-commit hook — mỗi lần commit sẽ cập nhật version rồi amend lại.');