# WIP branches

Notes on how uncommitted project work has been parked so far. As with the rest of this wiki, explicit instructions from Sean take precedence.

- **Commit title:** Starts with `WIP: `, e.g. `WIP: Restart lintlint around a markdown checklist`.
- **Branch name:** `wip/<yyyy>-<mm>-<short-title>`, e.g. `wip/2024-07-markdown-checklist`. The date used here was when the work happened (file mtimes), not when the branch was made.
- **Commit date:** Git doesn't store file mtimes, so a clone loses when the work happened. Here the WIP commit was backdated to the latest file edit (2024-07-22 14:42:19 -04:00), since all edits were within one day.
- **Attribution:** The Claude co-author trailer was left off, since that was approved for wiki commits and the code was Sean's.

## Pitfalls

- **Backdating with jj:** `jj metaedit` can only set the author time to now, but `JJ_TIMESTAMP=<iso time> jj metaedit -r <change> --update-author-timestamp` worked and set both author and committer time. The override also applied to descendants rebased by the same command, which backdated the empty working copy. Abandoning that empty working copy (`jj abandon`) gave a fresh one with the current time; `metaedit` on it reported "Nothing changed".
- **Force pushes:** Backdating rewrites the commit, so an already-pushed WIP branch needs a force push afterward.
