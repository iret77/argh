# ARGH! 😤

**A stress-relief mini-game.** An AI drove you up the wall? Now smash the
frustrating chat bubbles and let it all out.

Annoying AI clichés (*"You're absolutely right!"*, *"I've fixed the issue."*,
*"Let me try that again."*) float up the screen. Tap them to smash them into
satisfying little shards, chain hits for a **RAGE** combo, and fill the meter
to trigger a screen-shaking **MELTDOWN**. You have 60 seconds. Smash responsibly.

> Built with **Claude Opus 4.8**. An unofficial, fan-made game.

## Share it

The fastest way to hook someone is one line plus a link:

> Frustrated with your AI? Paste this into your chat, then type `argh` anytime
> to smash your frustration in a quick game 👉 https://iret77.github.io/argh/install.html

## Play

It's a zero-dependency static site built with plain `<script>` tags (no ES
modules, no `fetch`), so you can simply **open `index.html` in your browser**
with no server required.

If you'd rather serve it over HTTP (Node only, no other tooling):

```bash
npm start
#   → http://localhost:8000
```

Works on desktop (mouse) and mobile (touch).

## Which AI are you smashing?

The game **hard-codes no brand or model names.** The AI you're smashing is
supplied at runtime, in one of two ways:

1. **URL parameters:** `?ai=<your-ai>&models=<model-1>,<model-2>,<model-3>`
   (up to three models, comma-separated). The names you pass show on the
   bubbles; the tagline greets you personally. (`?model=<name>` is still
   accepted as a single-model alias.) An optional `&help=0` starts the how-to
   collapsed — the referring agent adds it for a player it has sent here
   before, which keeps that memory with the agent instead of on the device.
   A repeatable `#q=<quote>` (up to three, 120 chars each) lets the agent pass
   what *it* said right before you snapped; those lines open the round and keep
   coming back, so you smash the actual offending sentence. Repeated rather than
   comma-separated, because real sentences contain commas — and deliberately in
   the URL **fragment**, since browsers never transmit anything after the `#`,
   so a quote pulled from a private conversation cannot reach the host's logs.
2. **Setup prompt:** open the game with no parameters and it asks *"Which AI
   drove you up the wall?"* (plus optional model(s)) before the round starts.
   Nothing is played until you answer.

Inputs are sanitized (whitespace collapsed, each name capped at 24 characters)
and only ever drawn as canvas text.

Bubble variety is brand-free by design: three made-up "personality types"
(*The Overconfident One*, *The Apologizer*, *The Hallucinator*) drive the
colour and a fallback label. Up to three supplied model names map onto those
three types in order; **any type without a supplied model keeps its neutral
label**, so passing one, two, three, or zero models all work.

## The `argh` skill: smash without leaving your AI chat

The point of ARGH! is smashing your frustration **in the same session that
annoyed you**. So the main way in is a tiny skill you install into your agent
with a single copy-paste prompt. After that, typing `argh` any time hands you a
game link with the AI/model filled in from that session.

- **One-paste setup (Claude Code *and* Codex):** see [`SETUP.md`](SETUP.md), or
  the friendly landing page at
  [`install.html`](https://iret77.github.io/argh/install.html). Both agents read
  the same `SKILL.md` with the same `name`/`description` frontmatter.
- **The skill itself:** [`skill/argh/SKILL.md`](skill/argh/SKILL.md)
  (agent-agnostic behaviour). Manual install notes, including the zip upload for
  browser chats, in [`skill/README.md`](skill/README.md).
- **Uninstall:** delete or disable the skill. No accounts, no traces.

There are two ways in, split by a single question: can the agent write files?
Claude Code and Codex take the one-paste prompt, which points them at the
readable `SKILL.md` — an agent about to add a persistent instruction to your
setup should be able to inspect what it installs, and a careful one will refuse
an opaque download from an unfamiliar link. Chat apps can't install a skill at
all, so there you upload `argh.skill` yourself: a zip whose root is the skill
folder, published under the `.skill` name skill publishers conventionally use and
rebuilt on every deploy so it can't drift from the source.

The prompt says nothing about *where* skills are stored — that's the agent's
business, and those locations change. It asks only that an agent which can't
install skills say so plainly instead of substituting an improvised workaround.

## Features

- 🎯 **Smash gameplay:** hit-tested chat bubbles with satisfying particle bursts,
  shockwaves and screen shake.
- 🔥 **Combo system:** chain smashes within the combo window for score multipliers.
- 💥 **Meltdown mode:** fill the rage meter to unleash a double-score frenzy.
- 🧱 **Bubble variety:** quick bubbles, tough "wall of text" bubbles (multiple
  hits), rare golden bonuses, and three colour-coded personality types.
- 🔊 **Synthesized audio:** every sound effect is generated at runtime with the
  Web Audio API, so there are **no audio assets** and it works fully offline.
- 🏆 **Rage ranks**, end-of-round stats and a copy-result button. The best score
  lives for the current page load only — the site writes **nothing** to your
  device: no cookies, no local storage, no analytics, no third-party requests.
- 📱 Responsive, touch-friendly, respects `prefers-reduced-motion`.

## Project structure

```
index.html          # markup, HUD, setup form and overlays
install.html         # one-paste onboarding / share landing page
css/styles.css       # all styling
js/phrases.js        # the frustrating phrases + brand-free personality types
js/audio.js          # Web Audio sound engine (synthesized SFX)
js/game.js           # canvas game engine (state, spawning, physics, render)
assets/favicon.svg   # icon
skill/               # optional installable, agent-agnostic skill
SETUP.md             # canonical copy-paste setup prompt
.github/workflows/   # GitHub Pages deploy
```

No build step, no bundler, no dependencies. Plain HTML/CSS/JS so it can be
opened directly or hosted anywhere.

## Deploy

Pushing to the default branch triggers the included GitHub Actions workflow
(`.github/workflows/pages.yml`), which publishes the site to **GitHub Pages**.
Enable Pages for the repository (Settings → Pages → Build and deployment →
Source: *GitHub Actions*) and it goes live automatically.

## Disclaimer

ARGH! is an **unofficial, fan-made parody game** and is **not affiliated with,
endorsed by, or sponsored by** Anthropic or any other AI provider. Any AI or
model names shown in the game are supplied by the player (or via URL
parameters), used only to refer to those products. "Claude" and related model
names are trademarks of Anthropic PBC; other names belong to their respective
owners.

## License

[MIT](LICENSE)
