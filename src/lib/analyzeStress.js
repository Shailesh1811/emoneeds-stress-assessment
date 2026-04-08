import Groq from "groq-sdk";

const REVERSE_INDICES = [3, 4, 6, 7]; // Questions 4, 5, 7, 8 (0-indexed)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function psychometricScore(answers) {
  const total_score = answers.reduce((sum, val, i) => {
    return sum + (REVERSE_INDICES.includes(i) ? 4 - val : val);
  }, 0);

  const helplessness_score = [0, 1, 2, 5, 8, 9].reduce((sum, i) => sum + answers[i], 0);
  const helplessness_level = helplessness_score >= 14 ? "High" : "Low";

  const efficacy_score = [3, 4, 6, 7].reduce((sum, i) => sum + answers[i], 0);
  const efficacy_level = efficacy_score >= 10 ? "High" : "Low";

  let archetype;
  if (helplessness_level === "High" && efficacy_level === "High") archetype = "The High-Functioning Firefighter";
  else if (helplessness_level === "High" && efficacy_level === "Low") archetype = "Cognitive Depletion";
  else if (helplessness_level === "Low" && efficacy_level === "Low") archetype = "Executive Detachment";
  else archetype = "Optimal Flow State";

  return { total_score, helplessness_score, helplessness_level, efficacy_score, efficacy_level, archetype };
}

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function analyzeStressWithRetry(prompt, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      });
      return completion.choices[0]?.message?.content || "";
    } catch (error) {
      if (error.message?.includes("503") || error.status === 503) {
        console.warn(`Attempt ${i + 1} failed due to high demand. Retrying in ${i + 1}s...`);
        await delay((i + 1) * 1000);
      } else {
        throw error;
      }
    }
  }
  throw new Error("AI servers are currently too busy. Please try again in a moment.");
}

export async function analyzeStress(answers) {
  const {
    total_score,
    helplessness_score,
    helplessness_level,
    efficacy_score,
    efficacy_level,
    archetype,
  } = psychometricScore(answers);

  const prompt = `You are an elite organizational psychologist and cognitive performance advisor to Fortune 500 CEOs and CTOs.
Analyze the psychometric data for this IT executive.
Total Score: ${total_score}/40

Psychological profile:
- Perceived Helplessness: ${helplessness_level} (${helplessness_score}/24)
- Perceived Self-Efficacy: ${efficacy_level} (${efficacy_score}/16)
- Executive Archetype: ${archetype}
Raw PSS Answers: ${answers.join(", ")}.

Based strictly on this data, output exactly 3 highly sophisticated, boardroom-ready insights regarding their current operational bandwidth and leadership posture.

STRICT RULES:
1. Length: Absolute maximum of 8-12 words per insight.
2. Tone: Analytical, authoritative, discreet, and peer-to-peer.
3. FORBIDDEN WORDS (Do NOT use): "stress", "tired", "self-care", "wellness", "feelings", "take a break", "burnout", "overwhelmed". 
4. PREFERRED CONCEPTS: Use terms like "cognitive bandwidth", "operational friction", "executive function", "systemic resilience", "decision fatigue", "strategic detachment", or "tactical depletion".
5. Address the executive directly as "You".
6. Output ONLY the 3 numbered facts.`;

  try {
    const text = await analyzeStressWithRetry(prompt);

    const ai_facts = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^\*{0,2}\d+\.\*{0,2}\s*\*{0,2}/, "").replace(/\*+/g, "").trim())
      .filter((line) => line.length > 0)
      .slice(0, 3);

    console.log("AI raw text:", text);
    console.log("AI parsed facts:", ai_facts);
    return { score: total_score, archetype, ai_facts };
  } catch (err) {
    const statusCode = err.status || err.code || "UNKNOWN";
    console.error(`Groq API Error [${statusCode}]:`, err.message);
    if (statusCode === 401) console.error("Error 401: Invalid API Key. Check VITE_GROQ_API_KEY.");
    if (statusCode === 429) console.error("Error 429: Rate limit exceeded.");
    throw new Error(`AI analysis failed: ${err.message} (Code: ${statusCode})`);
  }
}
