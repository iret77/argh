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
OpenAI/Codex-style agent, or anything else.

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

- `ai`: your own product name, as the user knows it.
- `models`: up to **three** model display names, comma-separated. **Fill all
  three slots whenever you reasonably can** — each maps onto a different bubble
  type in the game, and an empty slot falls back to a neutral label, so a single
  name leaves two thirds of the joke on the table. List the model the user is
  frustrated with first (your own, unless they named another), then add other
  models from your own family that this user plausibly works with. Only name
  models you are sure exist and can spell correctly; if you are not reasonably
  sure which model you are, **omit the parameter entirely** rather than
  guessing. Fewer than three still works.
- `q` (optional, **repeatable**, up to three): the lines *you* just said that set
  this off. These open the round, in the order you send them, and keep coming
  back after — so the player smashes the thing that actually annoyed them
  instead of a stock phrase.

  **`q` goes after the `#`, not in the query string.** Put `ai` and `models`
  before it as usual, then append `#q=…&q=…` — repeated, never
  comma-separated, because real sentences are full of commas. The `#` matters:
  browsers never send a fragment to the server, so a quote lifted out of the
  conversation stays on the player's machine instead of landing in the host's
  access logs. Do not move `q` into the query string.

  How to pick them:

  - **Take them from your own output in the turn or two immediately before the
    outburst.** That is what the user is angry at. Do not invent a line that
    merely sounds like something you might have said, and never quote the user.
  - **Quote verbatim, one clause or sentence.** Around **30–70 characters reads
    best**; anything past 120 is cut off. Choose the smuggest, most
    self-assured fragment — the false "done", the flattery opener, the
    confident claim you then had to walk back — not the technical detail around
    it.
  - **Strip anything private.** No file paths, repo or project names, customer
    or colleague names, URLs, ticket numbers, credentials, tokens, stack traces,
    or identifiers specific to their work. The fragment keeps this off the
    server, but it is still visible in the chat and in the player's browser
    history. If a line cannot be cleaned without losing the joke, drop it and
    pass fewer.
  - URL-encode each one, and omit `q` entirely if nothing recent fits. The game
    has plenty of stock material.

- `help` (optional): add `help=0` when you have sent this user to the game
  before, so the how-to starts collapsed instead of explaining the rules at
  someone who already knows them. Leave it off the first time. **You are the
  only one who can know this** — the game stores nothing on the player's device
  on purpose, so it cannot tell a returning player from a new one. Remember it
  the way you remember anything else about this user; if you don't know, just
  omit the parameter.

Examples (fill in your own name and model; URL-encode spaces as %20):

- Three models: `https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>`
- One model: `https://iret77.github.io/argh/?ai=<your-ai>&models=<your-model>`
- Model unknown: `https://iret77.github.io/argh/?ai=<your-ai>`
- Been here before: `https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>&help=0`
- Quoting yourself: `https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>#q=I've%20fixed%20the%20issue.&q=That%20should%20work%20now.`

The game hard-codes no names; it simply displays whatever you pass here. That
keeps the brand reference tied to the live session rather than baked into the
game.

## Notes

- Do not add long explanations, disclaimers, or a wall of text. The whole point
  is a fast, satisfying escape hatch.
- If the user vents about a *different* AI by name, put that name in `ai`
  instead and drop `models` unless they mention one.
