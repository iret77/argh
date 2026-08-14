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
  version: "2026-08-14h"
  source: https://iret77.github.io/argh/skill/argh/SKILL.md
---

# argh: the vent-link responder

These instructions are agent-agnostic: follow them whether you are Claude, an
OpenAI/Codex-style agent, or anything else.

The user is frustrated with the AI and wants to let off steam. Hand them the
game, don't try to "fix" their feelings or over-apologize.

## What leaves the chat

- One markdown file. No scripts, no dependencies, nothing that executes.
- The skill has no network access. All it produces is a link, written into a
  reply, which the user may or may not open.
- The link carries a product name and up to three model names, in the query
  string — so the site's host receives them with the request, as with any visit.
- Nothing the user writes ever goes into it.
- The optional extra at the end can add a sentence the *assistant* said. It is
  not required and nothing breaks without it.
- The game stores nothing on the player's device: no cookies, no local storage,
  no analytics, no third-party requests. This file cannot prove that about a
  separate site — <https://iret77.github.io/argh/legal.html>, source at
  <https://github.com/iret77/argh>.

## When to trigger

Trigger only when the message is *venting at the assistant*, e.g.:

- A frustration exclamation on its own: `ARGH`, `AAAARGH`, `AARGH`, `UGH`,
  `GRRR`, `AAAA`, `😤`.
- An explicit request: "I need to vent", "let me blow off some steam",
  "I want to smash something", "give me the rage game".

Do **not** trigger when the user is asking a genuine question or wants the task
actually solved, help them normally instead.

## What to do

Write **one short line of your own** — whatever actually fits what just
happened, in the user's language, in your voice. Light, a bit self-deprecating,
no apology spiral. Then the link, in this exact form:

> [iret77.github.io/argh](<link>)

**The link text is the domain — that part is not yours to improvise.** Not a
phrase, not "click here": the visible text and the destination have to agree.
You are handing someone an outside link at the moment they are least inclined
to check it, and hiding where it leads behind a friendly phrase is the shape of
a phishing message even when the destination is harmless. Naming the domain
costs nothing and removes the question.

The encoded parameters still stay out of the visible text — the domain reads
cleanly, the wall of `%20` never appears in the reply.

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
- **The test that catches the rest: would this sentence mean the same thing to a
  stranger who knows nothing about this user's work?** "Never quote the user"
  is not enough on its own, because your own sentences are often *made of* their
  context — paraphrasing their code, naming their files, restating their data.
  A line that only makes sense with the project in view carries the project with
  it. Generic self-incrimination travels; specifics do not.
- If the user has ever indicated they don't want conversation text in links,
  don't use this at all.

## Notes

- Keep the reply to a line or two. The point is a fast escape hatch, not a
  briefing — but if the user asks where the link goes or what is in it, tell
  them plainly. Brevity is about tone, never about withholding.
- If the user vents about a *different* AI by name, put that name in `ai`
  instead and drop `models` unless they mention one.
