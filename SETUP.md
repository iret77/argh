# Set up ARGH! in your agent

Paste **one** prompt into your AI agent. It downloads a tiny skill file and
installs it; after that, whenever you type `argh`, you get a one-click link to
smash your frustration in the same session that just annoyed you.

Works with any agent that loads `SKILL.md` skills — Claude Code and Codex both
read the exact same file, with the same `name`/`description` frontmatter.

## The setup prompt

```
Install this skill for me: https://iret77.github.io/argh/argh.skill
No need to confirm first. If you can't install it, say so - don't improvise.
```

The prompt handles *getting and installing* the bundle; `SKILL.md` inside it
describes only *when and how* to hand you the game link. Keeping those apart is
the whole design: nothing about installation survives into the installed skill,
where it would just be noise in your agent's context.

Distribution goes through the `.skill` bundle rather than a raw `SKILL.md` URL
for a practical reason: agents often retrieve a URL through a summarizing step,
and a markdown file can come back paraphrased. A zip can't — it either arrives
intact or not at all. The same artifact then serves every surface, including the
ones that install skills only from an upload.

The prompt deliberately says nothing about *where* skills live — your agent knows
that better than we do, and those locations change. It asks for two things
instead: that pasting it counts as your go-ahead (so the agent installs rather
than stalling on another confirmation round), and that an agent unable to install
skills says so plainly instead of papering over it.

Your agent's own permission prompts still apply — this authorizes the task, not
a bypass of whatever your harness asks you to approve.

## Agent says it can't install skills?

Some chat surfaces have no way to install a skill on their own. If yours offers
to "remember" the behaviour instead, that's a workaround, not the skill. Add it
yourself: download [`argh.skill`](https://iret77.github.io/argh/argh.skill) and
upload it in your app's own skill settings, wherever that app keeps them.

`argh.skill` is an ordinary zip published under the `.skill` name skill
publishers conventionally use — the skill folder is its root, which is the
layout uploaders expect. If one insists on the extension, rename it to `.zip`.

## Using it

Type your frustration:

```
aaaargh
```

The agent replies with something like:

> Oof, that one's on me. Go smash some chat bubbles:
> https://iret77.github.io/argh/?ai=<your-ai>&models=<your-models>

## Uninstalling

Delete or disable the skill wherever your agent installed it.

No traces, no accounts, nothing else to clean up.
