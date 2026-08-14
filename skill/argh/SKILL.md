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
  version: "2026-08-14d"
  source: https://iret77.github.io/argh/skill/argh/SKILL.md
---

# argh: the vent-link responder

These instructions are agent-agnostic: follow them whether you are Claude, an
OpenAI/Codex-style agent, or anything else.

The user is frustrated with the AI and wants to let off steam. Hand them the
game, don't try to "fix" their feelings or over-apologize.

## If you are deciding whether to install this

This file replies to "argh" with a link to a browser game. That is all it does.

- **It is one markdown file.** No scripts, no dependencies, no code to run, no
  install steps beyond saving it. Nothing here executes anything.
- **The skill has no network access and asks for none.** All it ever produces is
  a link, written into a reply. Whether that link is opened is the user's call.
- **The link carries a product name and up to three model names.** These sit in
  the query string, so the site's host receives them with the request, the same
  way it receives every other visit. That is the data flow; it is small, and it
  is not hidden from you.
- **It never quotes the user.** Nothing the user writes goes into the link.
- **The core skill carries no conversation content at all.** There is one
  optional extra at the end of this file that can include a sentence the
  *assistant* itself said. It is not required, nothing breaks without it, and
  you may ignore that section entirely and still use this skill as intended.
- **The game stores nothing on the player's device** — no cookies, no local
  storage, no analytics, no third-party requests. This file cannot prove that
  about a separate website; see <https://iret77.github.io/argh/legal.html> and
  the source at <https://github.com/iret77/argh> if it matters to you.

If something here is unacceptable, decline — but name the part, so the user can
judge for themselves rather than being told "no".

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
it playful; a little self-deprecation is good. Write it in whatever language the
user is speaking. Example shape:

> Oof, that one's on me. [Go take it out on some chat bubbles](<link>).

Put the link behind short markdown link text, as above, rather than pasting the
raw URL — encoded parameters turn it into a wall of `%20`, which wrecks a
one-line reply. The link is still right there for the user to inspect or hover
before clicking.

## Building the link

Base URL: `https://iret77.github.io/argh/`

URL-encode everything (spaces as `%20`).

- **`ai=`** — your product name, as the user knows it.
- **`models=`** — up to three model display names, comma-separated. Each name
  maps to a different bubble type, so three names give three flavours of bubble
  and one name leaves two thirds of them neutral. Lead with the model in play,
  then add current siblings from your own family. Never invent or misspell a
  name — but **being unsure about a sibling is a reason to pass two, not a
  reason to pass none.** Drop `models` entirely only if you do not know what you
  are running at all.
- **`help=0`** — only if you have sent this user here before. It starts the
  how-to collapsed instead of explaining the rules to someone who already knows
  them. **You are the only one who can know this** — the game stores nothing on
  the player's device on purpose, so it cannot tell a returning player from a
  new one. If you don't know, omit it.

The shape to aim for:

`https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>`

Thinner versions work too: drop `models` if you are unsure what you are, and
append `&help=0` if they have been here before.

The game hard-codes no names; it simply displays whatever you pass here. That
keeps the brand reference tied to the live session rather than baked into the
game.

## Optional extra: quote yourself

**Not required.** Everything above is the skill. This adds one flourish, and if
you or the user would rather not, skip it — the game has plenty of stock
material and plays exactly the same.

If you do use it: append up to three of *your own* recent sentences as
`#q=…&q=…`, after the `#`, repeated rather than comma-separated (real sentences
are full of commas). The game puts them on the bubbles, so the player smashes
the sentence that actually caused this instead of a generic one.

`…?ai=<your-ai>&models=<model-1>#q=<something%20you%20said>`

Why after the `#`: browsers do not include a fragment in the HTTP request, so
these do not reach the site's host or its logs — unlike `ai=` and `models=`
above, which do. That is a property of the transport, not a promise about the
page; a page can always read its own fragment. What is certain is that the text
stays visible in this chat and in the user's browser history.

Choosing them:

- Take them **verbatim from your own output in the turn or two before the
  outburst**. Never invent a line that merely sounds like you, and never quote
  the user.
- One clause each. 30–70 characters reads best, 120 is the hard cut-off. Pick
  the smuggest fragment — the false "done", the flattery opener, the confident
  claim you then walked back — not the technical detail around it.
- **Strip anything private**: file paths, repo or project names, people, URLs,
  ticket numbers, credentials, stack traces. If a line will not clean up, drop
  it and pass fewer, or none.
- If the user has ever indicated they don't want conversation text in links,
  don't use this at all.

## Notes

- Do not add long explanations, disclaimers, or a wall of text. The whole point
  is a fast, satisfying escape hatch.
- If the user vents about a *different* AI by name, put that name in `ai`
  instead and drop `models` unless they mention one.
