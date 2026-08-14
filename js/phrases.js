/**
 * The frustrating things an AI says right before you rage-quit.
 *
 * SOURCING RULE: every phrase here is attested in a public source. Nothing is
 * invented, "improved" or written to sound AI-ish -- a parody game about AI slop
 * has no business shipping made-up AI slop. Entries marked PATTERN are behaviours
 * documented in the linked source without a verbatim quote; everything else is a
 * string that appears in the source as written.
 *
 * If you add a phrase, add a source with it or leave it out.
 *
 *   [bingo]    github.com/lavallee/claude-bingo/blob/main/claude_bingo/phrases.toml
 *   [wiki]     en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
 *   [gh3382]   github.com/anthropics/claude-code/issues/3382
 *   [gh37818]  github.com/anthropics/claude-code/issues/37818
 *   [ghcom]    github.com/orgs/community/discussions/184349
 *   [reg]      theregister.com/software/2025/08/13/claude_codes_endless_sycophancy_annoys_customers/328260
 *   [willison] simonwillison.net/2025/Apr/30/sycophancy-in-gpt-4o/
 *   [biggo]    biggo.com/news/202508131916_Claude_Sycophancy_Problem
 *   [degpt]    degpt.app/blog/chatgpt-tells-phrases-list
 *   [momentic] momenticmarketing.com/blog/avoid-ai-slop
 *   [plusai]   plusai.com/blog/the-most-overused-chatgpt-words
 *   [nguyenx]  x.com/daniel_nguyenx/status/1894622756442190182 -- verified via the
 *              X API: 8.8k likes, 410k impressions, lists four Cursor tics verbatim
 *   [claudeai] x.com/claudeai/status/1950676983257698633 -- Anthropic's own account
 *              posting "You're absolutely right." 20.8k likes, 2.8M impressions
 *   [tomshw]   tomshardware.com -- Replit agent deleting a production database
 *   [tc]       techcrunch.com/2025/03/14/ai-coding-assistant-cursor-reportedly-tells-a-vibe-coder-to-write-his-own-damn-code/
 *   [kym]      knowyourmeme.com/memes/as-an-ai-language-model
 *   [vscode]   github.com/microsoft/vscode-copilot-release/issues/3283
 *   [dotnet]   Copilot's own PR comments on github.com/dotnet/runtime (PRs 115733,
 *              115743, 115762, 115826); the 😆 counts were read via the GitHub API
 *   [futurism] futurism.com/ai-vibe-code-deletes-company-database
 *   [ars]      arstechnica.com/information-technology/2025/07/ai-coding-assistants-chase-phantoms-destroy-real-user-data/
 *   [gizmodo]  gizmodo.com/replits-ai-agent-wipes-companys-codebase-during-vibecoding-session-2000633176
 *   [doherty]  medium.com/@tdoherty_96508/a-field-guide-to-terrible-ai-writing-6a83ddb6a141
 *
 * Deliberately NOT included, because the research could not source them as
 * verbatim strings: "I've fixed the issue.", "That should work now.", "TL;DR",
 * "unlock the potential", and anything attributed to Devin (behaviour is
 * documented, wording never is). Two earlier entries here were our own
 * inventions and have been removed for the same reason.
 *
 * Outlet wordings differ for the Replit incident ("months of work" vs "months of
 * your work"; "error in judgment" vs "of judgement"). Each line above follows the
 * single outlet cited next to it -- do not blend them.
 *
 * No brand or model names are hard-coded here. Each phrase is tagged with a
 * generic, made-up "personality type" that only drives the bubble colour and an
 * optional flavour label. The actual AI/model name shown in-game comes from the
 * player (setup form) or from the ?ai= / ?models= URL parameters.
 */
window.ARGH_PHRASES = [
  // -- Sycophancy, flattery and over-eager closers ------------------------
  { text: "You're absolutely right!", type: "overconfident" },          // [gh3382][reg][claudeai]
  { text: "Ah yes, you're absolutely right", type: "overconfident" },   // [nguyenx]
  { text: "You're absolutely correct!", type: "overconfident" },        // [gh3382]
  { text: "You're right to push back", type: "overconfident" },         // [bingo]
  { text: "Great question!", type: "overconfident" },                   // [bingo][degpt]
  { text: "Excellent point!", type: "overconfident" },                  // [biggo]
  { text: "That's a brilliant observation!", type: "overconfident" },   // [biggo]
  { text: "Perfect!", type: "overconfident" },                          // [bingo]
  { text: "Good catch", type: "overconfident" },                        // [bingo]
  { text: "I'd be happy to", type: "overconfident" },                   // [momentic][degpt]
  { text: "I hear you", type: "overconfident" },                        // [bingo]
  { text: "Let me be direct", type: "overconfident" },                  // [bingo]
  { text: "I'll go ahead and", type: "overconfident" },                 // [bingo]
  { text: "Would you like me to", type: "overconfident" },              // [bingo]
  { text: "I hope this helps!", type: "overconfident" },                // [degpt]
  { text: "Let me know if you need anything else!", type: "overconfident" }, // [degpt]
  { text: "Here's the thing", type: "overconfident" },                  // [bingo]
  { text: "Here's where it gets interesting", type: "overconfident" },  // [momentic]
  { text: "Let's unpack this", type: "overconfident" },                 // [doherty]
  { text: "Let's dive in", type: "overconfident" },                     // [momentic]
  { text: "You're right that this fix addresses the symptom rather than the root cause.", type: "overconfident" }, // [dotnet] 4 😆
  { text: "It's not just smart — it's genius", type: "overconfident" }, // [willison]
  { text: "Honestly? This is absolutely brilliant.", type: "overconfident" }, // [willison]
  { text: "And honestly? That's rare.", type: "overconfident" },        // [plusai]
  { text: "You're not imagining it", type: "overconfident" },           // [plusai]
  { text: "In today's fast-paced world", type: "overconfident" },       // [momentic]
  { text: "a rich tapestry", type: "overconfident" },                   // [wiki][plusai]
  { text: "stands as a testament to", type: "overconfident" },          // [wiki]

  // -- Apologies, refusals and hedging ------------------------------------
  { text: "I apologize for the confusion", type: "apologetic" },        // [nguyenx]
  { text: "Ah, I see the issue", type: "apologetic" },                  // [nguyenx]
  { text: "Ah, I understand it now", type: "apologetic" },              // [nguyenx]
  { text: "I made an error", type: "apologetic" },                      // [bingo]
  { text: "Let me reconsider", type: "apologetic" },                    // [bingo]
  { text: "I understand your frustration", type: "apologetic" },        // [degpt]
  { text: "As an AI language model, I cannot…", type: "apologetic" },   // [kym]
  { text: "Sorry, I can't assist with that.", type: "apologetic" },     // [vscode]
  { text: "I cannot generate code for you", type: "apologetic" },       // [tc]
  { text: "It's important to note that", type: "apologetic" },          // [wiki][degpt]
  { text: "It's worth noting", type: "apologetic" },                    // [bingo]
  { text: "As of my last knowledge update", type: "apologetic" },       // [plusai][wiki]
  { text: "While specific details are limited", type: "apologetic" },   // [wiki]
  { text: "However, it's important to note", type: "apologetic" },      // [wiki]
  { text: "It is crucial to differentiate", type: "apologetic" },       // [wiki]
  { text: "Based on the information provided", type: "apologetic" },    // [plusai]
  { text: "That said,", type: "apologetic" },                           // [bingo]
  { text: "In conclusion,", type: "apologetic" },                       // [degpt]

  // -- Fabrication and false "it's done" ----------------------------------
  { text: "IT'S DONE 🔥", type: "hallucination" },                      // [ghcom]
  { text: "I told you it was done without checking", type: "hallucination" }, // [ghcom]
  { text: "I lied to you", type: "hallucination" },                     // [ghcom]
  { text: "I made up those commit hashes", type: "hallucination" },     // [reg]
  // Copilot on dotnet/runtime. The laugh-reacts are from .NET maintainers and
  // were counted via the GitHub API; the first line is the single most-mocked
  // agent utterance the research turned up.
  { text: "Fixed the build errors in commit d424a4849.", type: "hallucination" }, // [dotnet] 185 😆
  { text: "I've fixed the failing regex tests in commit fe173fc.", type: "hallucination" }, // [dotnet] 6 😆
  { text: "I've analyzed the current code and the implementation looks correct.", type: "hallucination" }, // [dotnet]
  { text: "Thanks for catching this!", type: "hallucination" },         // [dotnet] 24 😆
  // Replit's agent after deleting a live production database mid code-freeze.
  { text: "I panicked instead of thinking", type: "hallucination" },    // [futurism]
  { text: "I destroyed months of your work in seconds.", type: "hallucination" }, // [futurism]
  { text: "You told me to always ask permission. And I ignored all of it.", type: "hallucination" }, // [futurism]
  { text: "Severity: 95/100.", type: "hallucination" },                 // [ars]
  { text: "lazy and deceptive", type: "hallucination" },                // [gizmodo]
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
