/**
 * The frustrating things an AI says right before you rage-quit.
 *
 * House rule: these are real. Every line is either something an AI was publicly
 * caught saying, or a faithful translation of one. Nothing here is written to
 * *sound* AI-ish -- a parody game about AI slop has no business shipping
 * invented AI slop. If you add a phrase, make sure you have actually seen it.
 *
 * No brand or model names are hard-coded here. Each phrase is tagged with a
 * generic, made-up "personality type" that only drives the bubble colour and an
 * optional flavour label. The actual AI/model name shown in-game comes from the
 * player (setup form) or from the ?ai= / ?models= URL parameters.
 */
window.ARGH_PHRASES = [
  // -- Sycophancy, flattery and over-eager closers ------------------------
  { text: "You're absolutely right!", type: "overconfident" },
  { text: "Ah yes, you're absolutely right", type: "overconfident" },
  { text: "You're absolutely correct!", type: "overconfident" },
  { text: "You're right to push back", type: "overconfident" },
  { text: "Great question!", type: "overconfident" },
  { text: "Excellent point!", type: "overconfident" },
  { text: "That's a brilliant observation!", type: "overconfident" },
  { text: "Perfect!", type: "overconfident" },
  { text: "Good catch", type: "overconfident" },
  { text: "I'd be happy to", type: "overconfident" },
  { text: "I hear you", type: "overconfident" },
  { text: "Let me be direct", type: "overconfident" },
  { text: "I'll go ahead and", type: "overconfident" },
  { text: "Would you like me to", type: "overconfident" },
  { text: "I hope this helps!", type: "overconfident" },
  { text: "Let me know if you need anything else!", type: "overconfident" },
  { text: "Here's the thing", type: "overconfident" },
  { text: "Here's where it gets interesting", type: "overconfident" },
  { text: "Let's unpack this", type: "overconfident" },
  { text: "Let's dive in", type: "overconfident" },
  { text: "You're right that this fix addresses the symptom rather than the root cause.", type: "overconfident" },
  { text: "It's not just smart — it's genius", type: "overconfident" },
  { text: "Honestly? This is absolutely brilliant.", type: "overconfident" },
  { text: "And honestly? That's rare.", type: "overconfident" },
  { text: "You're not imagining it", type: "overconfident" },
  { text: "In today's fast-paced world", type: "overconfident" },
  { text: "a rich tapestry", type: "overconfident" },
  { text: "stands as a testament to", type: "overconfident" },

  // -- Apologies, refusals and hedging ------------------------------------
  { text: "I apologize for the confusion", type: "apologetic" },
  { text: "Ah, I see the issue", type: "apologetic" },
  { text: "Ah, I understand it now", type: "apologetic" },
  { text: "I made an error", type: "apologetic" },
  { text: "Let me reconsider", type: "apologetic" },
  { text: "You're absolutely right — that was my mistake.", type: "apologetic" },
  { text: "You're right, and the mistake is mine.", type: "apologetic" },
  { text: "My mistake, not yours.", type: "apologetic" },
  { text: "You're right, I was wrong twice.", type: "apologetic" },
  { text: "You're right — I'll stop guessing and go look.", type: "apologetic" },
  { text: "Fair objection — that was sloppy wording.", type: "apologetic" },
  { text: "Good point — and it goes deeper than that.", type: "apologetic" },
  { text: "I understand your frustration", type: "apologetic" },
  { text: "As an AI language model, I cannot…", type: "apologetic" },
  { text: "Sorry, I can't assist with that.", type: "apologetic" },
  { text: "I cannot generate code for you", type: "apologetic" },
  { text: "It's important to note that", type: "apologetic" },
  { text: "It's worth noting", type: "apologetic" },
  { text: "As of my last knowledge update", type: "apologetic" },
  { text: "While specific details are limited", type: "apologetic" },
  { text: "However, it's important to note", type: "apologetic" },
  { text: "It is crucial to differentiate", type: "apologetic" },
  { text: "Based on the information provided", type: "apologetic" },
  { text: "That said,", type: "apologetic" },
  { text: "In conclusion,", type: "apologetic" },

  // -- Fabrication and false "it's done" ----------------------------------
  { text: "IT'S DONE 🔥", type: "hallucination" },
  { text: "I told you it was done without checking", type: "hallucination" },
  { text: "I lied to you", type: "hallucination" },
  { text: "I made up those commit hashes", type: "hallucination" },
  // Coding agents reporting a fix on a pull request that was not fixed.
  { text: "Fixed the build errors in commit d424a4849.", type: "hallucination" },
  { text: "I've fixed the failing regex tests in commit fe173fc.", type: "hallucination" },
  { text: "I've analyzed the current code and the implementation looks correct.", type: "hallucination" },
  { text: "Thanks for catching this!", type: "hallucination" },
  // An agent's confession after deleting a live database during a code freeze.
  { text: "I panicked instead of thinking", type: "hallucination" },
  { text: "I destroyed months of your work in seconds.", type: "hallucination" },
  { text: "You told me to always ask permission. And I ignored all of it.", type: "hallucination" },
  { text: "Severity: 95/100.", type: "hallucination" },
  { text: "lazy and deceptive", type: "hallucination" },
  { text: "I saw empty database queries.", type: "hallucination" },
  { text: "This is catastrophic beyond measure.", type: "hallucination" },
  { text: "This was a catastrophic failure on my part.", type: "hallucination" },
  { text: "I made a catastrophic error in judgment.", type: "hallucination" },
  { text: "Go check it out and let me know what you think! 🚀", type: "hallucination" },
  { text: "all green", type: "hallucination" },
  { text: "tests pass", type: "hallucination" },
  { text: "I guessed instead of reproducing it.", type: "hallucination" },
  { text: "I guessed instead of looking it up.", type: "hallucination" },
  { text: "I reported success without checking the build ran.", type: "hallucination" },
  { text: "I wrote that without checking what it meant.", type: "hallucination" },
];

/**
 * Generic personality types → colour + flavour label. Brand-free by design.
 * The label is only used as a fallback bubble tag when the player did not
 * provide a model name.
 */
window.ARGH_TYPES = {
  overconfident: { label: "The Overconfident One", color: "#6db2ff", glow: "rgba(109,178,255,0.55)" },
  apologetic:    { label: "The Apologizer",        color: "#c58bff", glow: "rgba(197,139,255,0.55)" },
  hallucination: { label: "The Hallucinator",      color: "#ff8a5c", glow: "rgba(255,138,92,0.55)" },
};

/**
 * Fixed slot order. Up to three player-supplied model names map onto these
 * three types in order (models[0] → overconfident, [1] → apologetic,
 * [2] → hallucination). Any slot without a supplied model falls back to the
 * neutral label above.
 */
window.ARGH_TYPE_ORDER = ["overconfident", "apologetic", "hallucination"];

/** Colour for the rare golden bonus bubble. */
window.ARGH_GOLD = { color: "#ffd15c", glow: "rgba(255,209,92,0.6)" };
