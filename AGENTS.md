# Repository Rules

- Write commit messages in Japanese
- Branch names must start with "feat/" or "fix/"
- Merge PRs into "develop"

# Issues Workflow

- Create a new branch from "develop" (prefix "feat/" or "fix/")
- If an issue number is specified, fetch its details with the `gh` command
- Edit the issue-related changes and commit them
- Create a PR and include "Fixes #N" in the PR body
- Merge the PR into "develop"
- Merge "develop" into "main" manually at a convenient time
