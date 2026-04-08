const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { PromptTemplate } = require("@langchain/core/prompts");

const REVERSE_INDICES = [3, 4, 6, 7];

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

const PROMPT_TEMPLATE = `You are an insightful and elegant wellness consultant analyzing a tech CEO's stress assessment.
Their total score is {total_score}/40.

Psychological profile:
- Perceived Helplessness: {helplessness_level} ({helplessness_score}/24)
- Perceived Self-Efficacy: {efficacy_level} ({efficacy_score}/16)
- Executive Archetype: {archetype}

Their raw answers (0=Never to 4=Very Often) to the 10 PSS questions are: {answers}.

Based on this data, output exactly 3 short, elegant behavioral facts about their current state.

Rules:
- Maximum 8-10 words per fact.
- Use clear, professional, and empathetic language suitable for a C-suite executive.
- Address the user directly as "You".
- Output ONLY the numbered list.`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length !== 10) {
    return res.status(400).json({ error: "Invalid answers: expected array of 10 integers" });
  }

  const {
    total_score,
    helplessness_score,
    helplessness_level,
    efficacy_score,
    efficacy_level,
    archetype,
  } = psychometricScore(answers);

  try {
    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "gemini-2.0-flash", // Updated model name for better compatibility
      temperature: 0.7,
    });

    const prompt = PromptTemplate.fromTemplate(PROMPT_TEMPLATE);
    const chain = prompt.pipe(llm);

    const result = await chain.invoke({
      total_score,
      helplessness_level,
      helplessness_score,
      efficacy_level,
      efficacy_score,
      archetype,
      answers: answers.join(", "),
    });

    const ai_facts = result.content
      .split("\n")
      .filter((line) => /^\d+\./.test(line.trim()))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .slice(0, 3);

    return res.status(200).json({ score: total_score, archetype, ai_facts });
  } catch (err) {
    const statusCode = err.status || err.code || 500;
    console.error(`Gemini API Error [${statusCode}]:`, err.message);
    
    // Explicit hints for common errors
    if (statusCode === 403) console.error("Error 403: API Key issue or model access restricted.");
    if (statusCode === 429) console.error("Error 429: Rate limit exceeded (Free tier quota).");
    if (statusCode === 404) console.error("Error 404: Model name not found.");

    return res.status(statusCode).json({ 
      error: "AI analysis failed", 
      errorCode: statusCode,
      detail: err.message 
    });
  }
};
