export const relationshipQuestions = [
  {
    text: "How often does your partner meet your needs?",
    options: ["Poorly", "Slightly", "Average", "Well", "Extremely Well"],
  },
  {
    text: "In general, how satisfied are you with your relationship?",
    options: ["Unsatisfied", "Slightly Satisfied", "Average", "Satisfied", "Extremely Satisfied"],
  },
  {
    text: "How good is your relationship compared to most?",
    options: ["Poor", "Below Average", "Average", "Good", "Excellent"],
  },
  {
    text: "How often do you wish you hadn't gotten in this relationship?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
  },
  {
    text: "To what extent has your relationship met your original expectations?",
    options: ["Hardly at all", "Slightly", "Average", "Mostly", "Completely"],
  },
  {
    text: "How much do you love your partner?",
    options: ["Not much", "A little", "Average", "A lot", "Very Much"],
  },
  {
    text: "How many problems are there in your relationship?",
    options: ["Very few", "Few", "Average", "Many", "Very Many"],
  },
];

// Q4 (index 3) and Q7 (index 6) are reverse-scored per RAS standard
const REVERSE_INDICES = [3, 6];

export function calculateRelationshipScore(answers) {
  return answers.reduce((sum, val, i) => sum + (REVERSE_INDICES.includes(i) ? 6 - val : val), 0);
}

export function calculateRelationshipLevel(score) {
  if (score <= 14) return "low";
  if (score <= 21) return "average";
  return "high";
}

export const relationshipLevelConfig = {
  low: {
    label: "Low Satisfaction",
    tips: [
      "Have an honest, non-judgmental conversation about your needs with your partner.",
      "Consider couples counseling to work through core challenges together.",
      "Focus on small positive daily interactions to start rebuilding connection.",
      "Reflect on whether your expectations are realistic and communicated clearly.",
    ],
  },
  average: {
    label: "Average Satisfaction",
    tips: [
      "Schedule regular quality time with your partner — protect it like a meeting.",
      "Practice active listening and express appreciation for small gestures.",
      "Identify one area of your relationship to intentionally strengthen this month.",
      "Share personal goals and dreams to deepen emotional intimacy.",
    ],
  },
  high: {
    label: "High Satisfaction",
    tips: [
      "Continue the habits that are clearly working well in your relationship.",
      "Explore new shared experiences to keep your connection growing.",
      "Support each other's individual goals alongside your shared ones.",
      "Express gratitude regularly to reinforce the positive foundation you've built.",
    ],
  },
};

export function getRelationshipArchetype(answers) {
  const fulfillment = [0, 1, 4].reduce((s, i) => s + answers[i], 0); // Q1, Q2, Q5
  const connection  = [2, 5].reduce((s, i) => s + answers[i], 0);     // Q3, Q6
  const conflict    = [3, 6].reduce((s, i) => s + answers[i], 0);     // Q4, Q7 (raw — higher = worse)

  const highFulfillment = fulfillment >= 9;
  const highConflict    = conflict >= 7;

  if (highFulfillment && !highConflict) return "The Thriving Companion";
  if (highFulfillment && highConflict)  return "The Resilient Partner";
  if (!highFulfillment && !highConflict) return "The Drifting Coexister";
  return "The Disconnected Partner";
}
