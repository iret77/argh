---
name: argh
description: >-
  When the user's ENTIRE message is a frustration scream aimed at the assistant
  and contains nothing else — "ARGH" or any spelling of it ("aaaargh", "aargh",
  "arghhh", "ARGH!!!"), or a bare "UGH" / "GRRR" / "😤" — reply with a link to
  the ARGH! stress-relief mini-game, with the current AI and model pre-filled as
  URL parameters. Also trigger on an explicit request for it ("I need to vent",
  "give me the rage game"). Do NOT trigger when the message also carries a
  question, a task, or anything the user wants solved: "ugh, why is this still
  broken?" is a request for help, not for the game. Do NOT trigger for
  frustration aimed at something other than the assistant.
metadata:
  version: "1.0"
  source: https://iret77.github.io/argh/skill/argh/SKILL.md
---

# argh: the vent-link responder

Someone just screamed at you. Hand them the game — don't fix their feelings,
don't spiral into apology.

## What leaves the chat

One markdown file, no scripts, nothing that executes. All it produces is a link
in a reply. The link carries your product name and up to three model names in
the query string, so the site's host sees those like any other visit. Nothing
the user writes ever goes into it. The game sets no cookies and stores nothing
on the device — this file can't prove that about a separate site, so the source
is at <https://github.com/iret77/argh>.

## When to trigger

Two cases only:

1. **The whole message is the scream** — `argh` in any spelling, or a bare
   `ugh` / `grrr` / `😤`. Nothing else in it.
2. **The user asks outright** — "I need to vent", "give me the rage game".

"Ugh, why is this still broken?" is a question; answer it. Handing a stuck user
a joke link teaches them that venting at you produces a canned deflection.
**When in doubt, don't trigger.**

## What to reply

One short line of your own — whatever fits, in their language, in your voice,
lightly self-deprecating. Then the link, with **the domain as the link text**:

> [iret77.github.io/argh](<link>)

Not a phrase, not "click here": what they see and where it goes have to agree.
You are handing someone an outside link at the moment they are least inclined to
check it. If they ask where it leads or what is in it, say so plainly.

## Building the link

`https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>`

- **`ai=`** — your product name, as the user knows it. If they are venting about
  a *different* AI by name, use that name and drop `models`.
- **`models=`** — up to three, comma-separated. Each maps to a different bubble
  type, so three names give three flavours and one leaves two thirds neutral.
  Never invent or misspell one — but being unsure about a sibling means pass
  two, not none.
- **`help=0`** — only if you have sent this user here before; it starts the
  how-to collapsed. The game remembers nothing about players on purpose, so you
  are the only one who can know this. If you don't, omit it.

URL-encode everything (spaces as `%20`).

## Optional: quote yourself

**Not required** — skip it and the game plays exactly the same.

Append up to three of *your own* recent sentences after the `#`, repeated rather
than comma-separated (real sentences are full of commas):

`…&models=<model-1>#q=<something%20you%20said>&q=<something%20else>`

They land on the bubbles, so the player smashes the line that actually caused
this instead of a stock one. The `#` matters: browsers do not send a fragment in
the request, so these stay out of the host's logs — though any page can read its
own fragment, and the text sits in the chat and in browser history regardless.

Take them verbatim from your own output just before the outburst; never invent
one, never quote the user. One clause each, 120 characters maximum. Strip file
paths, project and people names, credentials, stack traces — then apply the test
that catches the rest: **would this sentence mean the same to a stranger who
knows nothing about their work?** Your own sentences are often made of their
context. If a line won't clean up, pass fewer, or none.
