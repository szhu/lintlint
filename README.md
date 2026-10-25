# lintlint wiki

Scratch space for discussing lintlint before anything lands on the project branches. This branch (`wiki`) has history unrelated to `main`.

## Discussion log

### 2026-10-25: Revisiting the idea with AI

Sean:

> Previously I was going to make a system that enforces a structure for projects so we can check whether it adheres to my standards. This fell through bc it meant that we have to make all projects be formatted the same way to even do the check.
>
> It's a few years later and we have AI now! So I feel like the solution to this problem has changed meaningfully.

State of the earlier attempts:

- Bookmark `attempt-1-as-code`: A Deno CLI with code-based `facts/` (ESLint and Prettier config readers) and `rules/` (e.g. enabled ESLint rules, extends, Prettier plugins).
- Uncommitted working copy on `main` in the code checkout: A slimmer restart. `bin/lintlint` -> `main.ts` parses `.lintlint.md`, a markdown checklist of standards (e.g. "ESLint config exists", "Consistent quote style enforced"). Nothing evaluates the checklist against a project yet.

Claude's read (unconfirmed): Mechanical checks needed every project to put things in the same place so code could find them. An AI checker could read each project as it is and judge it against the intent of a plain-language checklist, which removes the need for a uniform structure.

Open question: What should come out of the next session -- talk through the design, build a rough prototype (an agent that reads `.lintlint.md` and reports pass/fail on a real project), or decide whether to keep this repo or start fresh?

### 2026-10-25: Wiki convention

Set up this `wiki` branch at `.worktrees/wiki`. Sean on why the notes belong here:

> This wiki convention and the pitfalls are ran into might be useful for this project itself

See [wiki-convention.md](wiki-convention.md) for the setup, naming decisions and pitfalls.
