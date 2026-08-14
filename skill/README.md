# The `argh` skill

An optional [Claude skill](https://code.claude.com/docs) that turns a
frustrated `ARGH` in the prompt into a one-click escape hatch: the assistant
replies with a link to the **ARGH!** game, with the current AI and model
pre-filled as URL parameters.

Because the name is generated from the live session, the game itself never
hard-codes any brand or model name.

## What it does

Type something like:

```
AAAARGH
```

…and the assistant responds with a short, light line plus a link such as:

```
https://iret77.github.io/argh/?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>
```

(`models` takes up to three comma-separated names; pass fewer, or none, and the
game fills the rest with neutral labels.)

Opening that link drops you straight into the game, already venting at the
right model.

## Install

The distributable is [`argh.skill`](https://iret77.github.io/argh/argh.skill) —
an ordinary zip published under the `.skill` name skill publishers
conventionally use. Its root is the `argh/` directory, the layout uploaders
expect, and it's rebuilt from this folder on every deploy, so it can't drift
from `SKILL.md`.

The easy way to install it is the one-paste prompt in [`SETUP.md`](../SETUP.md):
the agent downloads the bundle and installs it wherever it keeps skills.

To do it by hand, either upload `argh.skill` in your app's skill settings, or
unpack it and copy the `argh` folder into your agent's skills directory, then
restart the agent so it picks the skill up. Where that directory is depends on
the agent — check its own documentation; argh deliberately doesn't guess on your
behalf.

## Customize

- Change the base URL in `SKILL.md` if you host the game somewhere other than
  GitHub Pages.
- Tweak the trigger wording or the reply tone to taste.
