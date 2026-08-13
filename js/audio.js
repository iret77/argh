/**
 * SoundEngine: all sound effects are synthesized with the Web Audio API,
 * so the game ships with zero audio assets and works fully offline.
 */
(function () {
  "use strict";

  function SoundEngine() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.ready = false;
  }

  SoundEngine.prototype.init = function () {
    if (this.ready) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(this.ctx.destination);
    this.ready = true;
  };

  // Browsers suspend audio until a user gesture; call this on first tap.
  SoundEngine.prototype.resume = function () {
    if (!this.ready) this.init();
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  };

  SoundEngine.prototype.setMuted = function (m) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.9;
  };

  SoundEngine.prototype._now = function () {
    return this.ctx ? this.ctx.currentTime : 0;
  };

  // A short filtered noise burst: the satisfying "crunch".
  SoundEngine.prototype._noise = function (dur, vol, filterFreq) {
    if (!this.ready || this.muted) return;
    var ctx = this.ctx;
    var n = Math.floor(ctx.sampleRate * dur);
    var buf = ctx.createBuffer(1, n, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    }
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = filterFreq || 1800;
    var g = ctx.createGain();
    g.gain.value = vol;
    src.connect(filt);
    filt.connect(g);
    g.connect(this.master);
    src.start();
  };

  // A pitched blip.
  SoundEngine.prototype._tone = function (freq, dur, vol, type, slideTo) {
    if (!this.ready || this.muted) return;
    var ctx = this.ctx;
    var t = this._now();
    var osc = ctx.createOscillator();
    var g = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  };

  /** Smash a bubble. combo raises the pitch for a rewarding "climbing" feel. */
  SoundEngine.prototype.smash = function (combo) {
    combo = combo || 0;
    this._noise(0.16, 0.35, 1400 + combo * 120);
    var base = 220 + Math.min(combo, 20) * 22;
    this._tone(base, 0.12, 0.28, "square", base * 0.5);
  };

  /** A miss: dull, low thud. */
  SoundEngine.prototype.miss = function () {
    this._tone(90, 0.12, 0.12, "sine", 60);
  };

  /** Meltdown begins: rising sweep. */
  SoundEngine.prototype.meltdown = function () {
    this._tone(160, 0.7, 0.3, "sawtooth", 880);
    this._noise(0.5, 0.2, 3000);
  };

  /** Bonus / golden bubble. */
  SoundEngine.prototype.bonus = function () {
    this._tone(660, 0.1, 0.25, "triangle", 990);
    var self = this;
    setTimeout(function () { self._tone(990, 0.14, 0.22, "triangle", 1320); }, 90);
  };

  /** Round over: descending "aww". */
  SoundEngine.prototype.gameover = function () {
    this._tone(440, 0.6, 0.25, "sine", 110);
  };

  /** UI click. */
  SoundEngine.prototype.click = function () {
    this._tone(520, 0.06, 0.18, "square");
  };

  window.SoundEngine = SoundEngine;
})();
