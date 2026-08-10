# ARGH! 😤

**A stress-relief mini-game.** Claude drove you up the wall? Now smash the
frustrating chat bubbles and let it all out.

Annoying AI clichés — *"You're absolutely right!"*, *"I've fixed the issue."*,
*"Let me try that again."* — float up the screen. Tap them to smash them into
satisfying little shards, chain hits for a **RAGE** combo, and fill the meter
to trigger a screen-shaking **MELTDOWN**. You have 60 seconds. Vent responsibly.

> Built with **Claude Opus 4.8** — to help you survive Sonnet 5, Opus 5 and the
> occasional Fable 5.

## Play

It's a zero-dependency static site. Just open it, or serve the folder:

```bash
# Any static server works — pick one:
python3 -m http.server 8000
#   → http://localhost:8000

npx serve .
```

Then open the printed URL in your browser. Works on desktop (mouse) and
mobile (touch).

## Features

- 🎯 **Smash gameplay** — hit-tested chat bubbles with satisfying particle bursts,
  shockwaves and screen shake.
- 🔥 **Combo system** — chain smashes within the combo window for score multipliers.
- 💥 **Meltdown mode** — fill the rage meter to unleash a double-score frenzy.
- 🧱 **Bubble variety** — quick bubbles, tough "wall of text" bubbles (multiple
  hits), and rare golden bonus bubbles.
- 🎨 **Model flavour** — bubbles are colour-coded by the model that "said" it
  (Sonnet 5 / Opus 5 / Fable 5). Purely cosmetic, all in good fun.
- 🔊 **Synthesized audio** — every sound effect is generated at runtime with the
  Web Audio API, so there are **no audio assets** and it works fully offline.
- 🏆 **Persistent high score**, rage ranks, end-of-round stats and a copy-result
  button.
- 📱 Responsive, touch-friendly, respects `prefers-reduced-motion`.

## Project structure

```
index.html          # markup, HUD and overlays
css/styles.css       # all styling
js/phrases.js        # the frustrating phrases + model palette
js/audio.js          # Web Audio sound engine (synthesized SFX)
js/game.js           # canvas game engine (state, spawning, physics, render)
assets/favicon.svg   # icon
.github/workflows/   # GitHub Pages deploy
```

No build step, no bundler, no dependencies — plain HTML/CSS/JS so it can be
opened directly or hosted anywhere.

## Deploy

Pushing to the default branch triggers the included GitHub Actions workflow
(`.github/workflows/pages.yml`), which publishes the site to **GitHub Pages**.
Enable Pages for the repository (Settings → Pages → Build and deployment →
Source: *GitHub Actions*) and it goes live automatically.

## License

[MIT](LICENSE)
