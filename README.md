# GitHub + Pull Requests 101

This guide explains the basic workflow for collaborating on GitHub with Git and pull requests (PRs).

## 1. The basic idea

- **Git** tracks changes to files on your computer.
- **GitHub** hosts Git repositories online and adds collaboration tools.
- A **branch** is an independent line of work.
- A **commit** is a saved checkpoint in Git history.
- A **pull request** proposes merging one branch into another, usually `main`.

The typical workflow is:

```text
clone → create a branch → edit files → commit → push → open a PR
      → review → update → merge
```

## 2. One-time setup

Install Git, then configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Authenticate with GitHub using either GitHub CLI:

```bash
gh auth login
```

or SSH credentials configured for your GitHub account.

## 3. Get a repository

On GitHub, open the repository and select **Code → Local → HTTPS** or **SSH**. Then clone it:

```bash
git clone https://github.com/OWNER/REPOSITORY.git
cd REPOSITORY
```

Check the repository state:

```bash
git status
git remote -v
```

`origin` is the usual name for the GitHub repository you cloned.

## 4. Start work on a branch

Do not normally work directly on `main`. First update it, then create a descriptive branch:

```bash
git switch main
git pull origin main
git switch -c fix/improve-readme
```

Common branch names include:

```text
feature/add-search
fix/login-error
docs/update-installation
```

Keep each branch focused on one change.

## 5. Make and commit changes

Edit files, then inspect what changed:

```bash
git status
git diff
```

Stage the files you want to include:

```bash
git add README.md
# Or stage all intended changes:
git add .
```

Create a clear commit:

```bash
git commit -m "Improve installation instructions"
```

A good commit message says what the commit does. Commit related changes together, and avoid mixing unrelated cleanup into the same commit.

## 6. Push your branch

The first push connects your local branch to its GitHub branch:

```bash
git push -u origin fix/improve-readme
```

After that, this is usually enough:

```bash
git push
```

## 7. Open a pull request

On GitHub:

1. Open the repository.
2. Select **Compare & pull request** for your pushed branch.
3. Confirm the base branch is `main`.
4. Add a useful title.
5. Explain what changed and why.
6. Include testing steps or screenshots when useful.
7. Request reviewers.

You can also use GitHub CLI:

```bash
gh pr create --base main --head fix/improve-readme
```

### A useful PR description

```markdown
## What changed
- Updated the installation instructions.

## Why
New contributors were missing the authentication step.

## Testing
- Read through the commands on macOS and Linux.
```

## 8. Review and update the PR

Reviewers may:

- Approve the PR.
- Leave comments or request changes.
- Ask questions.

Make requested changes on the same local branch:

```bash
git status
# edit files
git add path/to/file
git commit -m "Address review feedback"
git push
```

The PR updates automatically when you push more commits to its branch.

Before asking for another review, check the PR's status checks and resolve open conversations.

## 9. Keep your branch current

If `main` changes while your PR is open:

```bash
git switch main
git pull origin main
git switch fix/improve-readme
git merge main
git push
```

If Git reports conflicts:

1. Open each conflicted file.
2. Remove the conflict markers: `<<<<<<<`, `=======`, and `>>>>>>>`.
3. Keep the correct final content.
4. Stage the resolved files.
5. Finish the merge commit.
6. Run tests and push.

```bash
git add path/to/resolved-file
git commit
git push
```

Some teams use rebase instead of merge to update a branch. Follow the repository's contribution guidelines before rewriting history.

## 10. Merge the PR

Once the PR is approved and checks pass, a maintainer merges it on GitHub. GitHub may offer:

- **Merge commit**: preserves all branch commits and adds a merge commit.
- **Squash and merge**: combines the PR into one commit.
- **Rebase and merge**: applies the commits directly on the base branch.

Use the option preferred by the project. After merging:

```bash
git switch main
git pull origin main
git branch -d fix/improve-readme
```

If the remote branch is not deleted automatically:

```bash
git push origin --delete fix/improve-readme
```

## 11. Frequently used commands

| Command | Purpose |
| --- | --- |
| `git status` | Show the current branch and changed files |
| `git switch main` | Move to the `main` branch |
| `git switch -c branch-name` | Create and switch to a branch |
| `git pull` | Download and integrate remote changes |
| `git add file` | Stage a file for the next commit |
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes |
| `git commit -m "message"` | Create a commit |
| `git push` | Upload commits to GitHub |
| `git log --oneline` | View compact commit history |
| `git branch` | List local branches |
| `gh pr status` | Show your PR status with GitHub CLI |

## 12. Good habits

- Pull the latest `main` before starting new work.
- Use a branch for every feature, fix, or documentation change.
- Keep commits and PRs small enough to review.
- Write PR descriptions for the person reviewing your work.
- Run tests and linters before opening or updating a PR.
- Never commit passwords, API keys, tokens, or private certificates.
- Do not force-push a shared branch.
- Read `CONTRIBUTING.md` and repository-specific instructions.

## Quick reference

```bash
git clone https://github.com/OWNER/REPOSITORY.git
cd REPOSITORY
git switch main
git pull origin main
git switch -c feature/my-change

# edit files
git status
git diff
git add .
git commit -m "Describe the change"
git push -u origin feature/my-change

# Open the PR on GitHub, respond to review, then:
git push

# After the PR is merged:
git switch main
git pull origin main
git branch -d feature/my-change
```
