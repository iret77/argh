---
name: argh
description: >-
  When the user vents raw frustration at the AI, a message that is essentially
  a scream like "ARGH", "AAAARGH", "AARGH", "UGH", "GRRR", or an explicit "I
  need to vent / blow off steam / rage-quit" aimed at the assistant, reply with
  a link to the ARGH! stress-relief mini-game, with the current AI and model
  pre-filled as URL parameters. Do NOT trigger for normal questions, for
  frustration aimed at something other than the AI, or when the user is asking
  for real help with a task.
---

# argh: the vent-link responder

These instructions are agent-agnostic: follow them whether you are Claude, an
OpenAI/Codex-style agent, or anything else. Persist them wherever your agent
keeps skills or custom instructions.

The user is frustrated with the AI and wants to let off steam. Hand them the
game, don't try to "fix" their feelings or over-apologize.

## When to trigger

Trigger only when the message is *venting at the assistant*, e.g.:

- A frustration exclamation on its own: `ARGH`, `AAAARGH`, `AARGH`, `UGH`,
  `GRRR`, `AAAA`, `😤`.
- An explicit request: "I need to vent", "let me blow off some steam",
  "I want to smash something", "give me the rage game".

Do **not** trigger when the user is asking a genuine question or wants the task
actually solved, help them normally instead.

## What to do

Reply with **one short, light, empathetic line** and then the game link. Keep
it playful; a little self-deprecation is good. Example shape:

> Oof, that one's on me. Go take it out on some chat bubbles: <link>

## Building the link

Base URL: `https://iret77.github.io/argh/`

Append these query parameters, all URL-encoded (encode spaces as `%20`):

- `ai`: the assistant's product name as the user knows it (for you that is
  `Claude`).
- `models`: up to **three** model display names, comma-separated. Use the
  model(s) the user is actually frustrated with. If they named one, pass that
  one; otherwise pass your current model (for example `Opus 5`, `Sonnet 5`,
  `Fable 5`, or `Haiku 4.5`). You may pass the current family as up to three
  names. If you are not reasonably sure which model you are, **omit the
  `models` parameter entirely** rather than guessing. In the game, the three
  models map onto three bubble types; any missing slot falls back to a neutral
  label, so passing fewer than three is fine.

Examples:

- One model: `https://iret77.github.io/argh/?ai=Claude&models=Opus%205`
- Three models: `https://iret77.github.io/argh/?ai=Claude&models=Opus%205,Sonnet%205,Fable%205`
- Model unknown: `https://iret77.github.io/argh/?ai=Claude`

The game hard-codes no names; it simply displays whatever you pass here. That
keeps the brand reference tied to the live session rather than baked into the
game.

## Notes

- Do not add long explanations, disclaimers, or a wall of text. The whole point
  is a fast, satisfying escape hatch.
- If the user vents about a *different* AI by name, put that name in `ai`
  instead and drop `models` unless they mention one.
