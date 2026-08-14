# Set up ARGH! in your agent

Install a tiny skill once; after that, whenever you type `argh`, you get a
one-click link to smash your frustration in the same session that just annoyed
you.

Which way in applies depends on the *tab you are in*, not the app — ChatGPT and
Claude both bundle a chat and a coding agent into one desktop app, and they do
not all handle skills the same way. One exception worth knowing up front:
**ChatGPT's personal chat cannot install skills at all**; use its Work or Codex
tab instead.

## Claude Code, Codex, ChatGPT Work

Paste this:

```
Install this skill for me: https://iret77.github.io/argh/skill/argh/SKILL.md
It's plain markdown - read it first. If you can't install skills, say so, don't improvise.
```

The prompt points at the readable `SKILL.md` on purpose. An agent that is about
to add a persistent instruction to your setup should be able to see what it is
installing, and a sensible one will refuse an opaque download from a link it
doesn't know. Markdown it can read and judge; a zip it can only take on faith.

It deliberately says nothing about *where* skills live — your agent knows that
better than we do, and those locations change. The second sentence only asks it
not to paper over a failure with an improvised substitute, such as quietly
"remembering" the behaviour instead.

Your agent's own permission prompts still apply.

## Anywhere else: install from the file

If your app takes skills as a file, this is the file. Chat surfaces generally
can't install one themselves — asking gets you a refusal, correctly so — so add
it yourself:

1. Download [`argh.skill`](https://iret77.github.io/argh/argh.skill).
2. Add it wherever that app keeps its skills, and enable it.

ChatGPT no longer takes a skill file this way at all: attach one and it hands
you back an install prompt of its own instead. Which makes the prompt above the
canonical route there — in the Work or Codex tab, never the personal chat.

`argh.skill` is an ordinary zip published under the `.skill` name skill
publishers conventionally use — the skill folder is its root, which is the
layout uploaders expect. If one insists on the extension, rename it to `.zip`.
It's rebuilt on every deploy, so it can't drift from `SKILL.md`.

## Using it

Start a fresh session first — agents pick up a newly installed skill when they
start, so it won't answer in the same session that installed it.

Then type your frustration:

```
aaaargh
```

The agent replies with something like:

> Oof, that one's on me. Go smash some chat bubbles:
> https://iret77.github.io/argh/?ai=<your-ai>&models=<your-models>

## Updating

An installed skill is a copy on your machine and never updates itself. If the
links you get back look thin — one model name, no quotes — you are running an
older version: paste the setup prompt again and it overwrites. The frontmatter
carries a `version` date so you can check which one you have.

## Uninstalling

Delete or disable the skill wherever your agent installed it.

No traces, no accounts, nothing else to clean up.
