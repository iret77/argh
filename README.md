# ARGH! 😤

**A stress-relief mini-game.** An AI drove you up the wall? Now smash the
frustrating chat bubbles and let it all out.

Annoying AI clichés — *"You're absolutely right!"*, *"I've fixed the issue."*,
*"Let me try that again."* — float up the screen. Tap them to smash them into
satisfying little shards, chain hits for a **RAGE** combo, and fill the meter
to trigger a screen-shaking **MELTDOWN**. You have 60 seconds. Vent responsibly.

> Built with **Claude Opus 4.8**. An unofficial, fan-made game.

## Play

It's a zero-dependency static site built with plain `<script>` tags (no ES
modules, no `fetch`), so you can simply **open `index.html` in your browser** —
no server required.

If you'd rather serve it over HTTP (Node only, no other tooling):

```bash
npm start
#   → http://localhost:8000
```

Works on desktop (mouse) and mobile (touch).

## Which AI are you venting at?

The game **hard-codes no brand or model names.** The AI you're venting at is
supplied at runtime, in one of two ways:

1. **URL parameters** — `?ai=<name>&model=<name>`, e.g.
   [`?ai=Claude&model=Opus%205`](https://iret77.github.io/argh/?ai=Claude&model=Opus%205).
   The name shows on the bubbles; the tagline greets you personally.
2. **Setup prompt** — open the game with no parameters and it asks *"Which AI
   drove you up the wall?"* (plus an optional model) before the round starts.
   Nothing is played until you answer.

Inputs are sanitized (whitespace collapsed, capped at 24 characters) and only
ever drawn as canvas text.

Bubble variety is brand-free by design: three made-up "personality types"
(*The Overconfident One*, *The Apologizer*, *The Hallucinator*) drive the
colour and a fallback label — the real model name, when supplied, is what
appears on the bubble.

## The `argh` skill (optional)

`skill/` contains an installable **Claude skill**. Once installed, typing
`ARGH` / `AAAARGH` in the prompt makes the assistant reply with a game link
that already has `ai` and `model` filled in from the current session — so the
name is never hard-coded, it's generated on the fly. See
[`skill/README.md`](skill/README.md) for installation.

## Features

- 🎯 **Smash gameplay** — hit-tested chat bubbles with satisfying particle bursts,
  shockwaves and screen shake.
- 🔥 **Combo system** — chain smashes within the combo window for score multipliers.
- 💥 **Meltdown mode** — fill the rage meter to unleash a double-score frenzy.
- 🧱 **Bubble variety** — quick bubbles, tough "wall of text" bubbles (multiple
  hits), rare golden bonuses, and three colour-coded personality types.
- 🔊 **Synthesized audio** — every sound effect is generated at runtime with the
  Web Audio API, so there are **no audio assets** and it works fully offline.
- 🏆 **Persistent high score**, rage ranks, end-of-round stats and a copy-result
  button.
- 📱 Responsive, touch-friendly, respects `prefers-reduced-motion`.

## Project structure

```
index.html          # markup, HUD, setup form and overlays
css/styles.css       # all styling
js/phrases.js        # the frustrating phrases + brand-free personality types
js/audio.js          # Web Audio sound engine (synthesized SFX)
js/game.js           # canvas game engine (state, spawning, physics, render)
assets/favicon.svg   # icon
skill/               # optional installable Claude skill
.github/workflows/   # GitHub Pages deploy
```

No build step, no bundler, no dependencies — plain HTML/CSS/JS so it can be
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
