# The `argh` skill

An optional [Claude skill](https://code.claude.com/docs) that turns a
frustrated `ARGH` in the prompt into a one-click escape hatch: the assistant
replies with a link to the **ARGH!** game, with the current AI and model
pre-filled as URL parameters.

Because the name is generated from the live session, the game itself never
hard-codes any brand or model name.

## What it does

Type something like:

```
AAAARGH
```

…and the assistant responds with a short, light line plus a link such as:

```
https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>
```

(`models` takes up to three comma-separated names; pass fewer, or none, and the
game fills the rest with neutral labels.)

Opening that link drops you straight into the game, already venting at the
right model.

## Install

Two ways in, depending on whether your agent can write files. Both are spelled
out in [`SETUP.md`](../SETUP.md).

**Agents with file access** (Claude Code, Codex) take the one-paste prompt,
which points them at the readable `SKILL.md` — an agent about to add a
persistent instruction should be able to inspect it first, and an opaque
download from an unfamiliar link is something a careful agent will refuse.

**Chat apps** can't install a skill at all; there you upload
[`argh.skill`](https://iret77.github.io/argh/argh.skill) yourself — an ordinary
zip published under the `.skill` name skill publishers conventionally use. Its
root is the `argh/` directory, the layout uploaders expect, and it's rebuilt from
this folder on every deploy, so it can't drift from `SKILL.md`.

To install by hand, copy the `argh` folder into your agent's skills directory and
restart the agent. Where that directory is depends on the agent — check its own
documentation; argh deliberately doesn't guess on your behalf.

## Customize

- Change the base URL in `SKILL.md` if you host the game somewhere other than
  GitHub Pages.
- Tweak the trigger wording or the reply tone to taste.
