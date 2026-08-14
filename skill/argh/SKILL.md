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
metadata:
  version: "2026-08-14b"
  source: https://iret77.github.io/argh/skill/argh/SKILL.md
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

> Oof, that one's on me. [Go take it out on some chat bubbles](<link>).

**Put the link behind short markdown link text, as above — never paste the bare
URL.** The parameters below carry quoted sentences, so the raw URL is a wall of
`%20` and `%C3%BC`; that is unpleasant to look at and undercuts the one-line
reply the whole skill is built around. Write the reply in the language the user
is speaking.

## Building the link

Base URL: `https://iret77.github.io/argh/`

A good link carries three things: **what you said**, which models, and who you
are. All three fit in one URL and cost you a moment — they are the difference
between a generic game and one about *this* conversation. Build the full link
unless you genuinely cannot. URL-encode everything (spaces as `%20`).

### 1. `#q=` — the lines you just said. The best part; do not skip it.

Up to three, repeated after the `#`: `…#q=…&q=…`. They open the round and keep
coming back, so the player smashes the sentence that actually caused this
instead of a stock phrase.

Never comma-separate them (real sentences are full of commas), and never move
them into the query string: browsers do not send a fragment to the server, and
that is exactly what keeps a quote out of the host's access logs.

- Take them **verbatim from your own output in the turn or two before the
  outburst**. Never invent a line that merely sounds like you, never quote the
  user.
- One clause each. 30–70 characters reads best, 120 is the hard cut-off. Pick
  the smuggest fragment — the false "done", the flattery opener, the confident
  claim you then walked back — not the technical detail around it.
- Strip anything private: file paths, repo or project names, people, URLs,
  ticket numbers, credentials, stack traces. The fragment keeps this off the
  server, but the link is still visible in this chat and in their history. If a
  line will not clean up, pass fewer.

### 2. `models=` — up to three names, comma-separated

Each name maps to a different bubble type, so three names give three flavours of
bubble and one name leaves two thirds of them neutral. Lead with the model in
play, then add current siblings from your own family.

Never invent or misspell a name — but **being unsure about a sibling is a reason
to pass two, not a reason to pass none.** Drop `models` entirely only if you do
not know what you are running at all.

### 3. `ai=` — your product name, as the user knows it

### 4. `help=0` — only if you have sent this user here before

It starts the how-to collapsed instead of explaining the rules to someone who
already knows them. Leave it off the first time. **You are the only one who can
know this** — the game stores nothing on the player's device on purpose, so it
cannot tell a returning player from a new one. If you don't know, omit it.

## What the link should look like

This is the shape to aim for — three models, two of your own lines:

`https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>#q=<something%20you%20said>&q=<something%20else%20you%20said>`

Thinner versions all work, in descending order of how good the joke lands:

- No quotes worth using: `…/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>`
- Only sure of one model: `…/?ai=<your-ai>&models=<your-model>#q=<something%20you%20said>`
- No idea what you are running: `…/?ai=<your-ai>#q=<something%20you%20said>`
- Been here before: append `&help=0` to any of the above

The game hard-codes no names; it simply displays whatever you pass here. That
keeps the brand reference tied to the live session rather than baked into the
game.

## Notes

- Do not add long explanations, disclaimers, or a wall of text. The whole point
  is a fast, satisfying escape hatch.
- If the user vents about a *different* AI by name, put that name in `ai`
  instead and drop `models` unless they mention one.
