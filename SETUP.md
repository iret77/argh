# Set up ARGH! in your agent

Paste **one** prompt into your AI agent (Claude Code, Claude Desktop, or an
OpenAI/Codex-style agent). It installs a tiny persistent skill; after that,
whenever you type `argh`, you get a one-click link to smash your frustration
in the same session that just annoyed you.

## The setup prompt

```
Set up the "ARGH!" skill for me.

Read https://iret77.github.io/argh/skill/argh/SKILL.md in full, then install it
as a persistent skill that survives across sessions:
- If you are Claude (Claude Code / Desktop): save it to
  ~/.claude/skills/argh/SKILL.md
- Otherwise (e.g. an OpenAI/Codex agent): add an equivalent persistent
  instruction to your AGENTS.md (or your memory / custom-instructions file).

Show me exactly what you will write and wait for my OK before saving. Once
installed: whenever I type "argh", "aaaargh" or similar frustration, reply with
the ARGH! game link with ?ai= and ?models= filled in from this session. Just a
short line plus the link, nothing else.
```

That's it. The agent shows you what it will save, you confirm, done.

## Using it

Type your frustration:

```
aaaargh
```

The agent replies with something like:

> Oof, that one's on me. Go smash some chat bubbles:
> https://iret77.github.io/argh/?ai=Claude&models=Opus%205,Sonnet%205,Fable%205

## Uninstalling

Just remove or disable the skill:

- **Claude:** delete `~/.claude/skills/argh/` (or disable it in your skill settings).
- **OpenAI/Codex:** delete the `argh` block from your `AGENTS.md` / instructions.

No traces, no accounts, nothing else to clean up.
