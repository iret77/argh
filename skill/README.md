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
https://iret77.github.io/argh/?ai=Claude&models=Opus%205,Sonnet%205,Fable%205
```

(`models` takes up to three comma-separated names; pass fewer, or none, and the
game fills the rest with neutral labels.)

Opening that link drops you straight into the game, already venting at the
right model.

## Install

### Claude Code

Copy the skill into your skills directory:

```bash
# Project-scoped (this repo only):
mkdir -p .claude/skills && cp -r skill/argh .claude/skills/argh

# Or user-scoped (all your projects):
mkdir -p ~/.claude/skills && cp -r skill/argh ~/.claude/skills/argh
```

Then start (or restart) Claude Code; it picks up `SKILL.md` automatically.

### claude.ai

Upload the `argh` folder (containing `SKILL.md`) as a skill in your skill
settings, where supported.

## Customize

- Change the base URL in `SKILL.md` if you host the game somewhere other than
  GitHub Pages.
- Tweak the trigger wording or the reply tone to taste.
