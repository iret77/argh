# Set up ARGH! in your agent

Install a tiny skill once; after that, whenever you type `argh`, you get a
one-click link to smash your frustration in the same session that just annoyed
you.

There are two ways in, and which one applies depends on a single question: can
your agent write files?

## Agents that can write files (Claude Code, Codex)

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

## Chat apps (claude.ai and the like)

A chat app can't install a skill on its own — it has no tool for it, and asking
it to fetch one from a link gets you a refusal, correctly so. Add it yourself:

1. Download [`argh.skill`](https://iret77.github.io/argh/argh.skill).
2. Upload it in your app's own skill settings, wherever that app keeps them.

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

## Uninstalling

Delete or disable the skill wherever your agent installed it.

No traces, no accounts, nothing else to clean up.
