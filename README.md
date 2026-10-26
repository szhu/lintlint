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
- Branch `wip/2024-07-markdown-checklist` (previously the uncommitted working copy on `main`): A slimmer restart. `bin/lintlint` -> `main.ts` parses `.lintlint.md`, a markdown checklist of standards (e.g. "ESLint config exists", "Consistent quote style enforced"). Nothing evaluates the checklist against a project yet.

Claude's read (unconfirmed): Mechanical checks needed every project to put things in the same place so code could find them. An AI checker could read each project as it is and judge it against the intent of a plain-language checklist, which removes the need for a uniform structure.

Possible next step (Claude's framing, unconfirmed): What should come out of the next session -- talk through the design, build a rough prototype (an agent that reads `.lintlint.md` and reports pass/fail on a real project), or decide whether to keep this repo or start fresh?

### 2026-10-25: Wiki convention

Set up this `wiki` branch at `.worktrees/wiki`. Sean on why the notes belong here:

> This wiki convention and the pitfalls are ran into might be useful for this project itself

See [wiki-convention.md](wiki-convention.md) for the setup, naming decisions and pitfalls.

### 2026-10-25: Parking the uncommitted work

The previously uncommitted restart now lives on `wip/2024-07-markdown-checklist`, backdated to its last edit. See [wip-branches.md](wip-branches.md) for the naming and dating conventions used.

### 2026-10-25: Git-only wiki checkout

Set up the wiki in a Claude Code cloud session, which has no jj. It's a plain git worktree at the same `.worktrees/wiki` location; Sean confirmed the location is what mattered. The steps and new pitfalls are in [wiki-convention.md](wiki-convention.md).

### 2026-10-26: Checklist shape

Sean, on what lintlint should be:

> I think what I want is a checklist. That checklist might have grouping or nesting or some simple structure like that. [...] that's how the report should look like. Each of the items, it could just be a plain text thing now, which is kind of cool. Previously, I'd assume it'd have to be a little bit of code. But it potentially can have more details. I don't even think most of them need more details. However, each item can potentially have a fixer or like a way to apply things. And that would be either code or like a skill, which in my mind is just AI code. [...] It could be deterministic instructions. It could be AI instructions. Contains some instructions for how to achieve that result. Like I can say I want to set up React, but I probably want to set it up a particular way. I think the most common way I want to do it now is just to point to a particular repo and say this is the reference one.

Claude's summary (unconfirmed):

- The checklist is also the report: same groups and items, with each item checked or not.
- An item is usually one line of plain text. It can optionally carry more detail.
- An item can optionally carry instructions for getting to that result, either deterministic (code) or AI (e.g. a skill). The most common kind is expected to be a pointer to a reference repo.
- The 2024 `.lintlint.md` on `wip/2024-07-markdown-checklist` already has this shape (headings as groups, `- [ ]` items as plain text), minus the fix instructions.

### 2026-10-26: Deprioritizing the all-projects audit

Sean:

> I think I want to at least deprioritize building the thing that checks all of my projects for consistency. This thing actually has nothing to do with AI. It's just realizing that due to the number of projects I have, I probably don't want to update them all at once. So having that audit isn't exactly useful. It could be useful for some things, like maybe like checking a bunch of my projects to see if I have unpushed GitHub commits, maybe could be a thing. Like that kind of like hygiene, you know, like things that could be not durable if I didn't fix them. Another one is maybe if I want to maintain a set of like a smaller set of repos that I do want to always keep in tip-top shape, that could also be a thing. Maybe in that case, the right way to do it is not like a catch-all, but like so each rule basically has a check and a fix, right? Maybe what we can do is add a deterministic check for some of these in addition to an AI check. [...] the deterministic check can catch some cases where it is definitely set up correctly. [...] the deterministic check basically says yes or not sure. And then the AI check can be the backup. This way we can add a few known blessed ways of following the rule while not making it so that we actually have to follow the rule everywhere.

Claude's summary (unconfirmed):

- A consistency audit across all projects is deprioritized: there are too many projects to update at once, so a full report isn't very actionable. This isn't about AI.
- Where checking many projects still seems useful:
  - Hygiene, i.e. things that could be lost if left unfixed, such as unpushed commits.
  - A smaller set of repos kept in tip-top shape.
- Each rule has a check and a fix.
- A check can have two layers:
  - A deterministic check that recognizes known "blessed" setups and answers "yes" or "not sure", never "no".
  - An AI check as the fallback for "not sure".
- This lets known setups pass cheaply without requiring every project to use one of them, which was what sank the 2024 attempt.
