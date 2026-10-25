# Wiki convention

A `wiki` branch holds discussion and notes that aren't committed to the project yet. It has history unrelated to `main`, so it can be pushed and pulled (e.g. to continue a discussion from mobile) without touching the real project.

These are notes on what has worked so far, not rules. Explicit instructions from Sean take precedence over anything here. The hedged wording is deliberate: the goal, in Sean's words, is "to make it harder by default for it to override any explicit how-tos I give it."

## Setup

So far this has used HTTPS remotes (see pitfalls).

With JJ, the steps used here were roughly:

```sh
cd <repo>
mkdir -p .worktrees
jj workspace add --name wiki -r 'root()' .worktrees/wiki
cd .worktrees/wiki
jj commit -m "Initial commit"   # empty first commit
# ...write notes...
jj commit -m "<message>"
jj bookmark create wiki -r @-
jj git push --bookmark wiki
```

To recreate the workspace in a fresh clone where `wiki` already exists, `mkdir -p .worktrees && jj workspace add --name wiki -r wiki .worktrees/wiki` should be enough.

With Git only, recreating the worktree in a fresh clone where `wiki` already exists worked like this (in a Claude Code cloud session):

```sh
cd <repo>
git fetch origin wiki
mkdir -p .worktrees
git worktree add -B wiki .worktrees/wiki origin/wiki
```

The folder layout matches the JJ setup; the only difference is that `.worktrees/wiki` holds a `.git` file pointing back to `<repo>/.git` instead of a `.jj/` folder. Starting a `wiki` branch from scratch with Git only would probably be an orphan branch checked out the same way (untested).

Once set up, the global `~/.gitignore` has `/.worktrees/`.

## Conventions

- **Location:** `<repo>/.worktrees/wiki`. It mirrors Claude Code's `.claude/worktrees`, so Claude Code users recognize the concept, while leaving the folder unmanaged by any tool.
- **First commit:** An empty `Initial commit` on `root()`, matching how `main` starts.
- **Attribution:** Wiki commits may include `Co-Authored-By: Claude ... <noreply@anthropic.com>`.

## Locations considered

- **Sibling folder** (`../<repo>.wiki`): Works, but Sean preferred keeping it inside the repo.
- **`.wiki/`:** About 7.7k files on GitHub live under `.wiki/`, mostly from repos that keep GitHub wiki sources there. Those are finished public docs, which is a different purpose from pre-commit notes.
- **`.scratch/`:** Very common, and many hits look like AI-agent output (`.scratch/<feature>/PRD.md`, `HANDOFF-*.md`). A future tool could write into the wiki.
- **`.git/wiki`:** jj and git both ignore it with no config. But git commands run inside it fail with `fatal: this operation must be run in a work tree`, and VS Code hides `.git` by default.
- **`.claude/worktrees/wiki`:** Claude Code creates and cleans up worktrees there, which is risky for a long-lived checkout.
- **`.notes`, `.drafts`, `.sidecar`, `.offtree`, ...:** Also viable. `.worktrees` won because it describes the setup and generalizes to other long-lived branches.

## Pitfalls

- **Nested workspaces and git:** jj (0.45) automatically skips a nested folder containing its own `.jj`. Plain `git status` still lists it as untracked, hence the global ignore.
- **Missing parent folder:** `jj workspace add .worktrees/wiki` fails with "No such file or directory" if `.worktrees/` doesn't exist yet.
- **Stale SSH remote:** `Permission denied (publickey)` on push came from an old `git@github.com:` origin while everything else uses HTTPS through `gh`. Switching with `jj git remote set-url origin https://github.com/<owner>/<repo>.git` resolved it, without needing to debug the SSH agent. `gh auth refresh` alone doesn't help an SSH remote.
- **Adding the empty first commit later:** Inserting it after pushing rewrites history and needs a force push. Starting with it avoids that.
- **Stale local git ref after a force push:** After rewriting and force-pushing `wiki`, the local git branch `refs/heads/wiki` stayed at the old commit for a while (jj showed `wiki@git` as behind, and `jj git export` said "No export needed in colocated workspaces"). It had caught up by a later `jj git fetch`; the cause wasn't confirmed.
- **Moving a workspace:** What worked here was recreating it rather than moving the folder: `jj workspace forget wiki`, trashing the old folder, then `jj workspace add` at the new path with `-r wiki`. `forget` already discards the old empty working-copy commit.
- **jj 0.45 CLI differences:** `jj git push` has no `--allow-new`, and `jj git init` / `jj workspace add` don't accept `-q`.
- **Claude Code's edit guard:** In a background session, the Write/Edit tools refuse paths inside a JJ workspace because the guard only recognizes Git worktrees. Shell writes still work.
- **Global ignore file location:** Git doesn't read `~/.gitignore` on its own (its default is `~/.config/git/ignore`). On a machine without it set up, `git config --global core.excludesFile ~/.gitignore` was needed.
- **Branches missing from a fresh clone:** The clone in a Claude Code cloud session only had `main`; `wiki` and the other branches showed up after `git fetch origin '+refs/heads/*:refs/remotes/origin/*'`.
- **"The wiki" vs. GitHub's wiki:** Asked to clone "the wiki", Claude first tried GitHub's separate `<repo>.wiki.git`, which isn't this branch (and wasn't reachable from the cloud session).
- **GitHub's PR link:** Pushing `wiki` prints a "Create a pull request" link. It's probably safe to ignore, since `wiki` isn't meant to merge.
