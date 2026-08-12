/**
 * The frustrating things an AI says right before you rage-quit.
 *
 * No brand or model names are hard-coded here. Each phrase is tagged with a
 * generic, made-up "personality type" that only drives the bubble colour and
 * an optional flavour label. The actual AI/model name shown in-game comes from
 * the player (setup form) or from the ?ai= / ?model= URL parameters.
 */
window.ARGH_PHRASES = [
  { text: "You're absolutely right!", type: "overconfident" },
  { text: "I apologize for the confusion.", type: "apologetic" },
  { text: "Let me try that again.", type: "apologetic" },
  { text: "I've fixed the issue.", type: "overconfident" },
  { text: "Just to clarify…", type: "overconfident" },
  { text: "That's a great question!", type: "overconfident" },
  { text: "I understand your frustration.", type: "apologetic" },
  { text: "Here's a revised version:", type: "overconfident" },
  { text: "I don't have enough context.", type: "apologetic" },
  { text: "Let me break this down for you:", type: "overconfident" },
  { text: "Would you like me to continue?", type: "overconfident" },
  { text: "It looks like there was an error.", type: "apologetic" },
  { text: "My apologies for the oversight.", type: "apologetic" },
  { text: "I've made the requested changes.", type: "overconfident" },
  { text: "Certainly! Let me help with that.", type: "overconfident" },
  { text: "Let's circle back to that.", type: "overconfident" },
  { text: "To summarize the summary…", type: "overconfident" },
  { text: "I cannot assist with that request.", type: "apologetic" },
  { text: "You're absolutely right to flag that!", type: "overconfident" },
  { text: "Here is the complete solution:", type: "overconfident" },
  { text: "Sorry about that — try this instead.", type: "apologetic" },
  { text: "I appreciate your patience.", type: "apologetic" },
  { text: "Let me refactor the whole thing.", type: "overconfident" },
  { text: "That should work now. (It won't.)", type: "hallucination" },
  { text: "Great catch! Fixing it now.", type: "overconfident" },
  { text: "I may have hallucinated that API.", type: "hallucination" },
  { text: "Per my previous response…", type: "overconfident" },
  { text: "According to the docs (that don't exist)…", type: "hallucination" },
  { text: "This function definitely exists.", type: "hallucination" },
  { text: "I'm confident this is correct.", type: "hallucination" },
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

/** Colour for the rare golden bonus bubble. */
window.ARGH_GOLD = { color: "#ffd15c", glow: "rgba(255,209,92,0.6)" };
