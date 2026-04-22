import Groq from "groq-sdk";
import { calculateRelationshipScore, calculateRelationshipLevel, getRelationshipArchetype } from "./relationship-data.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function callGroqWithRetry(prompt, maxRetries = 3) {
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

export async function analyzeRelationship(answers) {
  const score     = calculateRelationshipScore(answers);
  const level     = calculateRelationshipLevel(score);
  const archetype = getRelationshipArchetype(answers);

  const levelLabel = { low: "Low Satisfaction (7–14)", average: "Average Satisfaction (15–21)", high: "High Satisfaction (22–35)" }[level];

  const prompt = `You are an expert relationship psychologist and couples therapist with 20 years of experience.
Analyze the RAS (Relationship Assessment Scale) data for this individual.

Total Score: ${score}/35
Satisfaction Level: ${levelLabel}
Relationship Archetype: ${archetype}
Raw RAS Answers (Q1–Q7, scale 1–5): ${answers.join(", ")}

Based strictly on this data, output exactly 3 insightful, empathetic observations about their relationship dynamics and areas to focus on.

STRICT RULES:
1. Format: Each insight MUST follow exactly this structure — "Category Name: insight description." where Category Name is 2-4 words (e.g. "Emotional Attunement", "Unmet Expectations", "Connection Strength") and the description is one clear sentence of 12-18 words.
2. Tone: Warm, professional, non-judgmental, and actionable.
3. FORBIDDEN: Clinical jargon, negative labels, guilt-inducing language.
4. Address the individual directly as "You".
5. Output ONLY the 3 numbered lines. No extra text.`;

  try {
    const text = await callGroqWithRetry(prompt);

    const ai_facts = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^\*{0,2}\d+\.\*{0,2}\s*\*{0,2}/, "").replace(/\*+/g, "").trim())
      .filter((line) => line.length > 0)
      .slice(0, 3);

    return { score, archetype, ai_facts };
  } catch (err) {
    console.error("Groq Relationship API Error:", err.message);
    throw new Error(`AI analysis failed: ${err.message}`);
  }
}
