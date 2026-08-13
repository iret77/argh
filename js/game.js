/**
 * ARGH! A stress-relief mini-game.
 * Smash the frustrating AI chat bubbles to vent.
 *
 * Vanilla JS + HTML5 Canvas, no build step, no dependencies.
 */
(function () {
  "use strict";

  var PHRASES = window.ARGH_PHRASES;
  var TYPES = window.ARGH_TYPES;
  var GOLD = window.ARGH_GOLD;
  var TYPE_ORDER = window.ARGH_TYPE_ORDER;
  var DEFAULT_TYPE = "overconfident";
  var MAX_MODELS = 3;

  // ------------------------------------------------------------------ config
  var CONFIG = {
    roundTime: 60,          // seconds per round
    baseSpawn: 1.05,        // seconds between spawns at start
    minSpawn: 0.42,         // fastest spawn interval
    baseRise: 46,           // px/sec upward drift at start
    maxRise: 120,           // px/sec near the end
    rageMax: 100,
    ragePerSmash: 7,
    meltdownTime: 5,        // seconds
    comboWindow: 1.6,       // seconds to keep a combo alive
    goldenChance: 0.06,
    toughChance: 0.16,      // "wall of text" bubbles (multiple hits)
  };

  var RANKS = [
    { min: 0,    name: "Mildly Annoyed" },
    { min: 400,  name: "Frustrated" },
    { min: 900,  name: "Fed Up" },
    { min: 1600, name: "Seething" },
    { min: 2600, name: "Furious" },
    { min: 4000, name: "INCANDESCENT" },
  ];

  var BEST_KEY = "argh_best_score_v1";

  // --------------------------------------------------------------- utilities
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // Clean a user/URL-supplied name: strip control chars, collapse whitespace,
  // cap length. Rendered only as canvas text (no markup), so this is display
  // hygiene rather than an HTML-injection guard.
  function sanitizeName(s) {
    if (!s) return "";
    return String(s)
      .replace(/[\u0000-\u001f\u007f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 24);
  }

  // Parse a comma-separated model list into up to MAX_MODELS clean names.
  function parseModels(raw) {
    if (!raw) return [];
    return String(raw)
      .split(",")
      .map(sanitizeName)
      .filter(Boolean)
      .slice(0, MAX_MODELS);
  }

  // Read ?ai= and ?models= (or legacy ?model=) from the URL. The game
  // hard-codes no brand names; they arrive here (e.g. from the "argh"
  // skill) or via the setup form.
  function readParams() {
    try {
      var p = new URLSearchParams(window.location.search);
      return {
        ai: sanitizeName(p.get("ai")),
        models: parseModels(p.get("models") || p.get("model")),
      };
    } catch (e) {
      return { ai: "", models: [] };
    }
  }

  // ------------------------------------------------------------------ engine
  function Game() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.sound = new window.SoundEngine();

    // Who are we venting at? Comes from ?ai=/?models= or the setup form.
    var params = readParams();
    this.ai = params.ai;          // the AI the player named (never hard-coded)
    this.models = params.models;  // up to 3 model names, optional
    this.configured = !!this.ai;

    this.dpr = 1;
    this.w = 0;
    this.h = 0;

    this.state = "menu"; // menu | playing | gameover
    this.bubbles = [];
    this.particles = [];
    this.floaters = [];
    this.shockwaves = [];
    this.bgDots = [];

    this.lastTime = 0;
    this.shake = 0;
    this.spawnTimer = 0;

    this.reset();
    this._bindUI();
    this._resize();
    window.addEventListener("resize", this._resize.bind(this));

    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this._makeBgDots();
  }

  Game.prototype.reset = function () {
    this.score = 0;
    this.timeLeft = CONFIG.roundTime;
    this.rage = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.bestCombo = 0;
    this.smashed = 0;
    this.meltdowns = 0;
    this.meltdownTimer = 0;
    this.inMeltdown = false;
    this.bubbles.length = 0;
    this.particles.length = 0;
    this.floaters.length = 0;
    this.shockwaves.length = 0;
    this.spawnTimer = 0.5;
    this.best = parseInt(localStorage.getItem(BEST_KEY) || "0", 10) || 0;
  };

  // -------------------------------------------------------------- DOM wiring
  Game.prototype._bindUI = function () {
    var self = this;
    this.el = {
      menu: document.getElementById("menu"),
      gameover: document.getElementById("gameover"),
      hud: document.getElementById("hud"),
      score: document.getElementById("score"),
      best: document.getElementById("best"),
      timer: document.getElementById("timer"),
      rageFill: document.getElementById("rageFill"),
      combo: document.getElementById("combo"),
      muteBtn: document.getElementById("muteBtn"),
      muteBtnMenu: document.getElementById("muteBtnMenu"),
      finalScore: document.getElementById("finalScore"),
      finalBest: document.getElementById("finalBest"),
      rank: document.getElementById("rank"),
      newBest: document.getElementById("newBest"),
      statSmashed: document.getElementById("statSmashed"),
      statCombo: document.getElementById("statCombo"),
      statMeltdowns: document.getElementById("statMeltdowns"),
      tagline: document.getElementById("tagline"),
      setup: document.getElementById("setup"),
      aiInput: document.getElementById("aiInput"),
      modelInput: document.getElementById("modelInput"),
      startBtn: document.getElementById("startBtn"),
    };

    // Setup form: only shown when no ai/model came from the URL.
    if (this.configured) {
      this.el.setup.hidden = true;
      this.el.startBtn.disabled = false;
    } else {
      this.el.setup.hidden = false;
      if (this.models.length) this.el.modelInput.value = this.models.join(", ");
      var refresh = function () {
        self.el.startBtn.disabled = sanitizeName(self.el.aiInput.value) === "";
      };
      this.el.aiInput.addEventListener("input", refresh);
      this.el.setup.addEventListener("submit", function (e) { e.preventDefault(); });
      refresh();
    }
    this._updateTagline();

    this.el.startBtn.addEventListener("click", function () {
      // Pull names from the form when they didn't come from the URL.
      if (!self.configured) {
        var ai = sanitizeName(self.el.aiInput.value);
        if (!ai) { self.el.aiInput.focus(); return; }
        self.ai = ai;
        self.models = parseModels(self.el.modelInput.value);
        self.configured = true;
      }
      self.sound.resume();
      self.sound.click();
      self.start();
    });
    document.getElementById("againBtn").addEventListener("click", function () {
      self.sound.click();
      self.start();
    });
    document.getElementById("shareBtn").addEventListener("click", function () {
      self._share();
    });

    var toggleMute = function () {
      self.sound.resume();
      var m = !self.sound.muted;
      self.sound.setMuted(m);
      self.el.muteBtn.setAttribute("aria-pressed", String(m));
      self.el.muteBtnMenu.setAttribute("aria-pressed", String(m));
      try { localStorage.setItem("argh_muted", m ? "1" : "0"); } catch (e) {}
    };
    this.el.muteBtn.addEventListener("click", toggleMute);
    this.el.muteBtnMenu.addEventListener("click", toggleMute);

    // Restore mute preference.
    if (localStorage.getItem("argh_muted") === "1") {
      this.sound.setMuted(true);
      this.el.muteBtn.setAttribute("aria-pressed", "true");
      this.el.muteBtnMenu.setAttribute("aria-pressed", "true");
    }

    // Pointer input on the canvas.
    var onDown = function (e) {
      if (self.state !== "playing") return;
      e.preventDefault();
      var rect = self.canvas.getBoundingClientRect();
      var pts = e.changedTouches ? e.changedTouches : [e];
      for (var i = 0; i < pts.length; i++) {
        self._hit(pts[i].clientX - rect.left, pts[i].clientY - rect.top);
      }
    };
    this.canvas.addEventListener("mousedown", onDown);
    this.canvas.addEventListener("touchstart", onDown, { passive: false });

    // Pause round if the tab loses focus so the timer stays fair.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && self.state === "playing") self.paused = true;
      else self.paused = false;
    });
  };

  Game.prototype.best = 0;

  // ------------------------------------------------------------------ sizing
  Game.prototype._resize = function () {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    this.canvas.style.width = this.w + "px";
    this.canvas.style.height = this.h + "px";
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this._makeBgDots();
  };

  Game.prototype._makeBgDots = function () {
    this.bgDots = [];
    var n = Math.round((this.w * this.h) / 26000);
    for (var i = 0; i < n; i++) {
      this.bgDots.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        r: rand(0.6, 2.2),
        s: rand(6, 24),
        a: rand(0.05, 0.25),
      });
    }
  };

  // Personalise the menu subtitle once we know who we're venting at.
  Game.prototype._updateTagline = function () {
    if (!this.el || !this.el.tagline) return;
    this.el.tagline.textContent = this.ai
      ? this.ai + " drove you up the wall. Now smash the nonsense out of your system."
      : "Blow off some steam.";
  };

  // -------------------------------------------------------------- state flow
  Game.prototype.start = function () {
    this.reset();
    this.state = "playing";
    this.paused = false;
    this.el.menu.hidden = true;
    this.el.gameover.hidden = true;
    this.el.hud.hidden = false;
    this.el.muteBtn.hidden = false;
    this._syncHud();
  };

  Game.prototype.end = function () {
    this.state = "gameover";
    this.sound.gameover();
    this.el.hud.hidden = true;
    this.el.muteBtn.hidden = true;

    var isNewBest = this.score > this.best;
    if (isNewBest) {
      this.best = this.score;
      try { localStorage.setItem(BEST_KEY, String(this.best)); } catch (e) {}
    }

    var rank = RANKS[0].name;
    for (var i = 0; i < RANKS.length; i++) {
      if (this.score >= RANKS[i].min) rank = RANKS[i].name;
    }

    this.el.finalScore.textContent = this.score;
    this.el.finalBest.textContent = this.best;
    this.el.rank.textContent = rank;
    this.el.newBest.hidden = !isNewBest;
    this.el.statSmashed.textContent = this.smashed;
    this.el.statCombo.textContent = this.bestCombo + "×";
    this.el.statMeltdowns.textContent = this.meltdowns;
    this.el.gameover.hidden = false;
    this._lastRank = rank;
  };

  Game.prototype._share = function () {
    var target = this.ai || "my AI";
    if (this.models.length) target += " (" + this.models.join(", ") + ")";
    var txt = "I hit rank \"" + (this._lastRank || "Mildly Annoyed") +
      "\" smashing my " + target + " frustration in ARGH!, score " + this.score +
      " (best combo " + this.bestCombo + "×). Smash your own nonsense.";
    var done = function () {
      var b = document.getElementById("shareBtn");
      var old = b.textContent;
      b.textContent = "Copied! ✓";
      setTimeout(function () { b.textContent = old; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, done);
    } else {
      done();
    }
    this.sound.click();
  };

  // --------------------------------------------------------------- spawning
  Game.prototype._difficulty = function () {
    // 0 at round start, 1 at round end.
    return 1 - clamp(this.timeLeft / CONFIG.roundTime, 0, 1);
  };

  Game.prototype._spawn = function () {
    var d = this._difficulty();
    var golden = Math.random() < CONFIG.goldenChance;
    var tough = !golden && Math.random() < CONFIG.toughChance;

    var phrase = golden
      ? { text: "★ RARE: a helpful answer!", type: DEFAULT_TYPE }
      : pick(PHRASES);

    var rise = lerp(CONFIG.baseRise, CONFIG.maxRise, d) * (this.inMeltdown ? 0.7 : 1);
    if (golden) rise *= 1.7;

    var b = {
      text: phrase.text,
      type: phrase.type || DEFAULT_TYPE,
      golden: golden,
      hp: tough ? 3 : 1,
      maxHp: tough ? 3 : 1,
      tough: tough,
      x: 0, y: this.h + 60,
      vx: rand(-14, 14),
      vy: -rise,
      wobble: rand(0, Math.PI * 2),
      wobbleSpeed: rand(1.2, 2.4),
      scale: 0,
      born: 0,
      dead: false,
    };
    this._measure(b);
    b.x = rand(b.hw + 12, this.w - b.hw - 12);
    this.bubbles.push(b);
  };

  // The short label above a bubble's text. Each personality type maps to one
  // supplied model (by slot order); a slot without a model falls back to the
  // neutral personality label. Golden bonuses read "BONUS".
  Game.prototype._tagFor = function (b) {
    if (b.golden) return "BONUS";
    var type = TYPES[b.type] ? b.type : DEFAULT_TYPE;
    var slot = TYPE_ORDER.indexOf(type);
    var model = slot >= 0 ? this.models[slot] : "";
    return model || TYPES[type].label;
  };

  // Measure bubble size from wrapped text.
  Game.prototype._measure = function (b) {
    var ctx = this.ctx;
    var fontSize = b.tough ? 15 : 16;
    b.fontSize = fontSize;
    ctx.font = "700 " + fontSize + "px " + getFont();
    var maxW = Math.min(this.w * 0.66, 260);
    var words = b.text.split(" ");
    var lines = [];
    var line = "";
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    b.lines = lines;

    var textW = 0;
    for (var j = 0; j < lines.length; j++) {
      textW = Math.max(textW, ctx.measureText(lines[j]).width);
    }
    // Make sure the bubble is wide enough for its tag too.
    ctx.font = "800 10px " + getFont();
    var tagText = ((b.golden ? "✦ " : "") + this._tagFor(b)).toUpperCase();
    var tagW = ctx.measureText(tagText).width + (b.tough ? 30 : 0);

    var padX = 18, padY = 14, tagH = 16, lineH = fontSize + 5;
    b.w = Math.max(textW, tagW) + padX * 2;
    b.h = lines.length * lineH + padY * 2 + tagH;
    b.hw = b.w / 2;
    b.hh = b.h / 2;
    b.lineH = lineH;
    b.padY = padY;
    b.tagH = tagH;
  };

  // ------------------------------------------------------------------- input
  Game.prototype._hit = function (px, py) {
    // Topmost bubble first.
    for (var i = this.bubbles.length - 1; i >= 0; i--) {
      var b = this.bubbles[i];
      if (b.dead) continue;
      if (px >= b.x - b.hw && px <= b.x + b.hw &&
          py >= b.y - b.hh && py <= b.y + b.hh) {
        this._smash(b, px, py);
        return;
      }
    }
    // Miss.
    this.combo = 0;
    this.comboTimer = 0;
    this.sound.miss();
    this.floaters.push(makeFloater(px, py, "whiff", "#8a83ad", 15));
  };

  Game.prototype._smash = function (b, px, py) {
    b.hp -= 1;
    this.shake = Math.min(this.shake + (b.golden ? 12 : 7), 22);

    var m = TYPES[b.type] || TYPES[DEFAULT_TYPE];
    this._burst(px, py, b.golden ? GOLD.color : m.color, b.golden ? 26 : 14);

    if (b.hp > 0) {
      // Tough bubble: cracked but not destroyed.
      b.scale = 1.16;
      this.sound.smash(this.combo);
      return;
    }

    b.dead = true;
    this.smashed++;
    this.combo++;
    this.comboTimer = CONFIG.comboWindow;
    if (this.combo > this.bestCombo) this.bestCombo = this.combo;

    var mult = 1 + Math.floor(this.combo / 3) * 0.5; // combo multiplier
    var base = b.golden ? 120 : b.tough ? 40 : 15;
    if (this.inMeltdown) base *= 2;
    var gained = Math.round(base * mult);
    this.score += gained;

    this.rage = clamp(this.rage + CONFIG.ragePerSmash, 0, CONFIG.rageMax);

    // Bigger shockwave + shards on kill.
    this._burst(px, py, b.golden ? GOLD.color : m.color, b.golden ? 30 : 18);
    this.shockwaves.push({ x: px, y: py, r: 6, max: b.golden ? 130 : 74, a: 0.7 });
    this.floaters.push(makeFloater(b.x, b.y, "+" + gained, b.golden ? GOLD.color : "#fff", b.golden ? 30 : 22));

    if (b.golden) this.sound.bonus();
    else this.sound.smash(this.combo);

    if (this.combo >= 3 && this.combo % 3 === 0) this._showCombo();

    if (this.rage >= CONFIG.rageMax && !this.inMeltdown) this._startMeltdown();
  };

  Game.prototype._showCombo = function () {
    var el = this.el.combo;
    el.textContent = this.combo + "× COMBO";
    el.classList.remove("show");
    // force reflow to restart animation
    void el.offsetWidth;
    el.classList.add("show");
  };

  Game.prototype._startMeltdown = function () {
    this.inMeltdown = true;
    this.meltdownTimer = CONFIG.meltdownTime;
    this.meltdowns++;
    this.rage = CONFIG.rageMax;
    this.shake = 24;
    this.sound.meltdown();
    var el = this.el.combo;
    el.textContent = "💥 MELTDOWN!";
    el.classList.remove("show");
    void el.offsetWidth;
    el.classList.add("show");
  };

  // --------------------------------------------------------------- particles
  Game.prototype._burst = function (x, y, color, count) {
    for (var i = 0; i < count; i++) {
      var a = rand(0, Math.PI * 2);
      var sp = rand(60, 340);
      this.particles.push({
        x: x, y: y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 40,
        size: rand(3, 9),
        color: color,
        rot: rand(0, Math.PI * 2),
        vr: rand(-10, 10),
        life: rand(0.4, 0.9),
        maxLife: 0.9,
      });
    }
  };

  // ------------------------------------------------------------------- update
  Game.prototype._update = function (dt) {
    // Animate background always.
    for (var i = 0; i < this.bgDots.length; i++) {
      var d = this.bgDots[i];
      d.y -= d.s * dt;
      if (d.y < -4) { d.y = this.h + 4; d.x = Math.random() * this.w; }
    }

    if (this.state !== "playing" || this.paused) {
      this._updateEffects(dt);
      return;
    }

    this.timeLeft -= dt;
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this._syncHud();
      this.end();
      return;
    }

    // Meltdown handling.
    if (this.inMeltdown) {
      this.meltdownTimer -= dt;
      this.rage = clamp((this.meltdownTimer / CONFIG.meltdownTime) * CONFIG.rageMax, 0, CONFIG.rageMax);
      if (this.meltdownTimer <= 0) {
        this.inMeltdown = false;
        this.rage = 0;
      }
    }

    // Combo decay.
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.combo = 0;
    }

    // Spawning.
    var d2 = this._difficulty();
    var interval = lerp(CONFIG.baseSpawn, CONFIG.minSpawn, d2);
    if (this.inMeltdown) interval *= 0.4;
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this._spawn();
      this.spawnTimer = interval * rand(0.8, 1.2);
      if (this.inMeltdown && Math.random() < 0.5) this._spawn();
    }

    // Bubbles.
    for (var k = this.bubbles.length - 1; k >= 0; k--) {
      var b = this.bubbles[k];
      b.born += dt;
      b.scale = lerp(b.scale, 1, Math.min(1, dt * 12));
      b.wobble += b.wobbleSpeed * dt;
      b.y += b.vy * dt;
      b.x += (b.vx + Math.sin(b.wobble) * 10) * dt;
      if (b.x < b.hw) { b.x = b.hw; b.vx = Math.abs(b.vx); }
      if (b.x > this.w - b.hw) { b.x = this.w - b.hw; b.vx = -Math.abs(b.vx); }
      if (b.dead || b.y < -b.hh - 20) {
        if (!b.dead) { // escaped unsmashed → break combo
          this.combo = 0;
        }
        this.bubbles.splice(k, 1);
      }
    }

    this._updateEffects(dt);
    this._syncHud();
  };

  Game.prototype._updateEffects = function (dt) {
    var i;
    for (i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      p.vy += 620 * dt;   // gravity
      p.vx *= 0.98;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
    }
    for (i = this.floaters.length - 1; i >= 0; i--) {
      var f = this.floaters[i];
      f.life -= dt;
      f.y -= 42 * dt;
      if (f.life <= 0) this.floaters.splice(i, 1);
    }
    for (i = this.shockwaves.length - 1; i >= 0; i--) {
      var s = this.shockwaves[i];
      s.r += (s.max - s.r) * Math.min(1, dt * 9);
      s.a -= dt * 1.8;
      if (s.a <= 0) this.shockwaves.splice(i, 1);
    }
    if (this.shake > 0) {
      this.shake -= dt * 60;
      if (this.shake < 0) this.shake = 0;
    }
  };

  Game.prototype._syncHud = function () {
    this.el.score.textContent = this.score;
    this.el.best.textContent = Math.max(this.best, this.score);
    var t = Math.ceil(this.timeLeft);
    this.el.timer.textContent = t;
    if (t <= 10) this.el.timer.classList.add("is-low");
    else this.el.timer.classList.remove("is-low");
    this.el.rageFill.style.width = this.rage + "%";
    if (this.rage >= CONFIG.rageMax) this.el.rageFill.classList.add("is-full");
    else this.el.rageFill.classList.remove("is-full");
  };

  // ------------------------------------------------------------------- render
  Game.prototype._render = function () {
    var ctx = this.ctx;
    ctx.save();
    ctx.clearRect(0, 0, this.w, this.h);

    // Background gradient.
    var g = ctx.createLinearGradient(0, 0, 0, this.h);
    if (this.inMeltdown) {
      g.addColorStop(0, "#2a0d1f");
      g.addColorStop(1, "#1a0a12");
    } else {
      g.addColorStop(0, "#0d0b1a");
      g.addColorStop(1, "#171233");
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.w, this.h);

    // Drifting background dots.
    for (var i = 0; i < this.bgDots.length; i++) {
      var d = this.bgDots[i];
      ctx.globalAlpha = d.a;
      ctx.fillStyle = this.inMeltdown ? "#ff6b8f" : "#7b5cff";
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Screen shake.
    if (this.shake > 0) {
      ctx.translate(rand(-this.shake, this.shake) * 0.5, rand(-this.shake, this.shake) * 0.5);
    }

    // Shockwaves.
    for (i = 0; i < this.shockwaves.length; i++) {
      var s = this.shockwaves[i];
      ctx.globalAlpha = Math.max(0, s.a);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Bubbles.
    for (i = 0; i < this.bubbles.length; i++) {
      this._drawBubble(this.bubbles[i]);
    }

    // Particles (shards).
    for (i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      ctx.save();
      ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    // Floating score text.
    for (i = 0; i < this.floaters.length; i++) {
      var f = this.floaters[i];
      ctx.save();
      ctx.globalAlpha = clamp(f.life / f.maxLife, 0, 1);
      ctx.fillStyle = f.color;
      ctx.font = "900 " + f.size + "px " + getFont();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(f.text, f.x, f.y);
      ctx.restore();
    }

    ctx.restore();
  };

  Game.prototype._drawBubble = function (b) {
    var ctx = this.ctx;
    var m = TYPES[b.type] || TYPES[DEFAULT_TYPE];
    var color = b.golden ? GOLD.color : m.color;
    var glow = b.golden ? GOLD.glow : m.glow;
    var tag = this._tagFor(b);

    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.scale(b.scale, b.scale);

    // Glow.
    ctx.shadowColor = glow;
    ctx.shadowBlur = b.golden ? 28 : 16;

    // Bubble body.
    var w = b.w, h = b.h, r = 16;
    var damaged = b.tough && b.hp < b.maxHp;
    ctx.fillStyle = damaged ? "rgba(40,28,60,0.95)" : "rgba(28,22,54,0.94)";
    ctx.strokeStyle = color;
    ctx.lineWidth = b.golden ? 3 : 2;
    roundRect(ctx, -w / 2, -h / 2, w, h, r);
    ctx.fill();
    ctx.stroke();

    // Tail.
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 22, h / 2 - 1);
    ctx.lineTo(-w / 2 + 8, h / 2 + 14);
    ctx.lineTo(-w / 2 + 38, h / 2 - 1);
    ctx.closePath();
    ctx.fillStyle = damaged ? "rgba(40,28,60,0.95)" : "rgba(28,22,54,0.94)";
    ctx.fill();

    // Tag (player's model / generic personality / BONUS).
    ctx.fillStyle = color;
    ctx.font = "800 10px " + getFont();
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText((b.golden ? "✦ " : "") + tag.toUpperCase(), -w / 2 + 16, -h / 2 + 10);

    // Text lines.
    ctx.fillStyle = "#f4f1ff";
    ctx.font = "700 " + b.fontSize + "px " + getFont();
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    var ty = -h / 2 + b.padY + b.tagH;
    for (var i = 0; i < b.lines.length; i++) {
      ctx.fillText(b.lines[i], -w / 2 + 18, ty + i * b.lineH);
    }

    // Tough bubble "cracks" indicator.
    if (b.tough) {
      ctx.fillStyle = color;
      ctx.font = "900 11px " + getFont();
      ctx.textAlign = "right";
      ctx.fillText("×" + b.hp, w / 2 - 12, -h / 2 + 10);
    }

    ctx.restore();
  };

  // -------------------------------------------------------------------- loop
  Game.prototype._loop = function (ts) {
    if (!this.lastTime) this.lastTime = ts;
    var dt = (ts - this.lastTime) / 1000;
    this.lastTime = ts;
    if (dt > 0.05) dt = 0.05; // clamp big frame gaps
    this._update(dt);
    this._render();
    requestAnimationFrame(this._loop);
  };

  // ---------------------------------------------------------------- helpers
  function makeFloater(x, y, text, color, size) {
    return { x: x, y: y, text: text, color: color, size: size, life: 0.8, maxLife: 0.8 };
  }

  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function getFont() {
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  }

  // ------------------------------------------------------------------- boot
  window.addEventListener("DOMContentLoaded", function () {
    window.__ARGH = new Game();
  });
})();
