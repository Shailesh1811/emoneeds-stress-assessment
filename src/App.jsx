import { useState, useCallback } from "react";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import LeadCaptureScreen from "./components/LeadCaptureScreen.jsx";
import QuestionScreen from "./components/QuestionScreen.jsx";
import ResultsScreen from "./components/ResultsScreen.jsx";
import { calculateStressLevel, questions } from "./lib/assessment-data.js";
import { supabase } from "./lib/supabaseClient.js";

const App = () => {
  const [screen, setScreen] = useState("welcome");
  const [leadData, setLeadData] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  const handleStart = () => setScreen("lead");

  const handleLeadSubmit = (data) => {
    setLeadData(data);
    setScreen("questions");
  };

  const handleAssessmentComplete = useCallback(
    async (answers) => {
      const score = answers.reduce((sum, a) => sum + a, 0);
      setTotalScore(score);
      setScreen("results");

      // Build per-question answers in Q1-a3 format
      const answersDetail = {};
      questions.map((q, i) => {
        answersDetail[`Q${i + 1}`] = `a${answers[i]}`;
      });

      // Send to Supabase
      if (supabase && leadData) {
        try {
          const { error } = await supabase.from("assessments").insert({
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone || null,
            score,
            stress_level: calculateStressLevel(score),
            answers: answersDetail,
          });
          if (error) console.error("Supabase insert error:", error.message);
          else console.log("✅ Assessment saved to Supabase");
        } catch (err) {
          console.error("Supabase network error:", err);
        }
      }
    },
    [leadData]
  );

  const handleRestart = useCallback(() => {
    setScreen("welcome");
    setLeadData(null);
    setTotalScore(0);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {screen === "lead" && <LeadCaptureScreen onSubmit={handleLeadSubmit} onBack={() => setScreen("welcome")} />}
      {screen === "questions" && <QuestionScreen onComplete={handleAssessmentComplete} onBack={() => setScreen("lead")} />}
      {screen === "results" && <ResultsScreen score={totalScore} onRestart={handleRestart} />}
    </div>
  );
};

export default App;