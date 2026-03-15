---
name: pr-staging
description: 「仮リリース」と言われたら使うスキル。現在のfeatureブランチからdevelopブランチへのPRを作成・squash mergeする。GitHub CLI (gh) を使用。
---

# PR Staging Skill

featureブランチ → developブランチへのPR作成＆squash mergeを行う。

---

### Step 1: 事前確認

```bash
git status
git branch --show-current
gh auth status
```

- 未コミットの変更があればユーザーに確認する
- `gh` が未認証なら止まって伝える

### Step 2: cliff.toml の検出

```bash
test -f cliff.toml && echo "cliff.toml found"
```

`cliff.toml` が存在する場合、このリポジトリはconventional commitsでリリースノートを自動生成している。
未プッシュコミットを確認し、形式に沿っているかユーザーに案内する：

```bash
git log origin/develop..HEAD --oneline
```

形式の目安：

| prefix | 用途 |
|--------|------|
| `feat:` | 新機能 |
| `fix:` | バグ修正 |
| `docs:` | ドキュメント |
| `refactor:` | リファクタリング |
| `chore:` | その他の変更 |

スコープがある場合は `feat(scope): message` の形式。
形式が不正なコミットがあれば `git commit --amend` や `git rebase -i` での修正を促す。（強制はしない）

### Step 3: PRテンプレートをユーザーに提示

以下をそのまま表示し、ユーザーに埋めてもらう：

```
タイトル: 

## 概要
<!-- 何をなぜ変更したか -->

## 変更内容
- 
- 

## 確認事項
- [ ] テスト追加・更新済み
- [ ] 動作確認済み
```

### Step 4: PR作成

```bash
CURRENT_BRANCH=$(git branch --show-current)
TITLE="<ユーザー入力>"
BODY="<ユーザー入力>"

gh pr create \
  --base develop \
  --head "$CURRENT_BRANCH" \
  --title "$TITLE" \
  --body "$BODY"

gh pr view --json url -q .url
```

### Step 5: マージ確認 → squash merge

ユーザーにマージ確認を取り、OKであれば：

```bash
gh pr merge --squash --delete-branch
```
