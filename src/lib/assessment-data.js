export const questions = [
  { id: 1, text: "In the last month, how often have you been upset because of something that happened unexpectedly?", category: "Work" },
  { id: 2, text: "In the last month, how often have you felt that you were unable to control the important things in your life?", category: "Sleep" },
  { id: 3, text: "In the last month, how often have you felt nervous and stressed?", category: "Anxiety" },
  { id: 4, text: "In the last month, how often have you felt confident about your ability to handle your personal problems?", category: "Physical" },
  { id: 5, text: "In the last month, how often have you felt that things were going your way?", category: "Mood" },
  { id: 6, text: "In the last month, how often have you found that you could not cope with all the things that you had to do?", category: "Cognitive" },
  { id: 7, text: "In the last month, how often have you been able to control irritations in your life?", category: "Lifestyle" },
  { id: 8, text: "In the last month, how often have you felt that you were on top of things?", category: "Emotional" },
  { id: 9, text: "In the last month, how often have you been angered because of things that were outside of your control?", category: "Social" },
  { id: 10, text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?", category: "Balance" },
];

export const answerOptions = [
  { value: 0, label: "Never" },
  { value: 1, label: "Almost Never" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Fairly Often" },
  { value: 4, label: "Very Often" },
];

export function calculateStressLevel(score) {
  if (score <= 13) return "low";
  if (score <= 26) return "moderate";
  return "high";
}

export const stressLevelConfig = {
  low: {
    label: "Low Stress",
    description: "You're managing stress well! Keep up your healthy habits and continue prioritizing self-care.",
    tips: [
      "Maintain your current wellness routine",
      "Consider mindfulness practices to stay grounded",
      "Keep nurturing your social connections",
    ],
  },
  moderate: {
    label: "Moderate Stress",
    description: "You're experiencing a moderate level of stress. Small changes can make a big difference in how you feel.",
    tips: [
      "Try scheduling regular breaks during work",
      "Practice deep breathing exercises daily",
      "Establish a consistent sleep schedule",
      "Consider speaking with a wellness professional",
    ],
  },
  high: {
    label: "High Stress",
    description: "Your stress levels are elevated. It's important to take proactive steps to protect your mental health.",
    tips: [
      "Reach out to a mental health professional",
      "Prioritize sleep and nutrition immediately",
      "Set firm boundaries with work and obligations",
      "Practice daily relaxation techniques",
      "Talk to someone you trust about how you're feeling",
    ],
  },
};