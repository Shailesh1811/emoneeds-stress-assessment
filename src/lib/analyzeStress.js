import Groq from "groq-sdk";

const REVERSE_INDICES = [3, 4, 6, 7];

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
        console.warn(`Attempt ${i + 1} failed. Retrying in ${i + 1}s...`);
        await delay((i + 1) * 1000);
      } else {
        throw error;
      }
    }
  }
  throw new Error("AI servers are currently too busy. Please try again in a moment.");
}

export async function analyzeStress(answers) {
  const { total_score, helplessness_score, helplessness_level, efficacy_score, efficacy_level, archetype } =
    psychometricScore(answers);

  const prompt = `You are an elite organizational psychologist advising Fortune 500 executives.
Analyze this IT executive's psychometric data:
Total Score: ${total_score}/40
- Perceived Helplessness: ${helplessness_level} (${helplessness_score}/24)
- Perceived Self-Efficacy: ${efficacy_level} (${efficacy_score}/16)
- Executive Archetype: ${archetype}
Raw PSS Answers (0=Never, 4=Very Often): ${answers.join(", ")}

Output exactly 3 short, boardroom-ready insights about their current state.

RULES:
- Max 10 words per insight.
- Tone: analytical, authoritative, peer-to-peer.
- Address as "You".
- Output ONLY the 3 numbered facts, nothing else.`;

  try {
    const text = await analyzeStressWithRetry(prompt);

    const ai_facts = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^\*{0,2}\d+\.\*{0,2}\s*\*{0,2}/, "").replace(/\*+/g, "").trim())
      .filter((line) => line.length > 0)
      .slice(0, 3);

    return { score: total_score, archetype, ai_facts };
  } catch (err) {
    console.error("Groq API Error:", err.message);
    throw new Error(`AI analysis failed: ${err.message}`);
  }
}
