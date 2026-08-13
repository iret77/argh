# Set up ARGH! in your agent

Paste **one** prompt into your AI agent (Claude Code, Claude Desktop, or an
OpenAI/Codex-style agent). It installs a tiny persistent skill; after that,
whenever you type `argh`, you get a one-click link to smash your frustration
in the same session that just annoyed you.

## The setup prompt

```
Set up the "ARGH!" skill for me: read https://iret77.github.io/argh/skill/argh/SKILL.md and install it. Show me what you'll save, then confirm.
```

That's it. The agent reads the skill (which contains all the behaviour),
installs it wherever it keeps skills, shows you what it will save, and you
confirm. Everything about *what the skill does* lives in `SKILL.md`, not in this
prompt.

## Using it

Type your frustration:

```
aaaargh
```

The agent replies with something like:

> Oof, that one's on me. Go smash some chat bubbles:
> https://iret77.github.io/argh/?ai=<your-ai>&models=<your-models>

## Uninstalling

Just remove or disable the skill:

- **Claude:** delete `~/.claude/skills/argh/` (or disable it in your skill settings).
- **OpenAI/Codex:** delete the `argh` block from your `AGENTS.md` / instructions.

No traces, no accounts, nothing else to clean up.
