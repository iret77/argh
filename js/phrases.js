/**
 * The frustrating things an AI says right before you rage-quit.
 * Each phrase is tagged with the model most likely to have said it,
 * purely for flavour and colour-coding. All in good fun.
 */
window.ARGH_PHRASES = [
  { text: "You're absolutely right!", model: "sonnet" },
  { text: "I apologize for the confusion.", model: "sonnet" },
  { text: "Let me try that again.", model: "opus" },
  { text: "As an AI language model…", model: "fable" },
  { text: "I've fixed the issue.", model: "opus" },
  { text: "Just to clarify…", model: "sonnet" },
  { text: "That's a great question!", model: "sonnet" },
  { text: "I understand your frustration.", model: "opus" },
  { text: "Here's a revised version:", model: "opus" },
  { text: "I don't have enough context.", model: "sonnet" },
  { text: "Let me break this down for you:", model: "opus" },
  { text: "Would you like me to continue?", model: "sonnet" },
  { text: "It looks like there was an error.", model: "opus" },
  { text: "My apologies for the oversight.", model: "sonnet" },
  { text: "I've made the requested changes.", model: "opus" },
  { text: "Certainly! Let me help with that.", model: "sonnet" },
  { text: "Let's circle back to that.", model: "fable" },
  { text: "To summarize the summary…", model: "fable" },
  { text: "I cannot assist with that request.", model: "opus" },
  { text: "You're absolutely right to flag that!", model: "sonnet" },
  { text: "Here is the complete solution:", model: "opus" },
  { text: "Sorry about that — try this instead.", model: "sonnet" },
  { text: "I appreciate your patience.", model: "opus" },
  { text: "Let me refactor the whole thing.", model: "opus" },
  { text: "That should work now. (It won't.)", model: "fable" },
  { text: "Great catch! Fixing it now.", model: "sonnet" },
  { text: "I may have hallucinated that API.", model: "fable" },
  { text: "Per my previous response…", model: "opus" },
];

/** Visual identity per model — used for bubble colouring. */
window.ARGH_MODELS = {
  sonnet: { label: "Sonnet 5", color: "#6db2ff", glow: "rgba(109,178,255,0.55)" },
  opus:   { label: "Opus 5",   color: "#c58bff", glow: "rgba(197,139,255,0.55)" },
  fable:  { label: "Fable 5",  color: "#ffd15c", glow: "rgba(255,209,92,0.6)" },
};
