import { useState, useCallback, useRef, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import StatsScreen from "./components/StatsScreen.jsx";
import LeadCaptureScreen from "./components/LeadCaptureScreen.jsx";
import QuestionScreen from "./components/QuestionScreen.jsx";
import ResultsScreen from "./components/ResultsScreen.jsx";
import FactsScreen from "./components/FactsScreen.jsx";
import PdfReport from "./components/PdfReport.jsx";
import { calculateStressLevel, questions } from "./lib/assessment-data.js";
import { supabase } from "./lib/supabaseClient.js";
import { analyzeStress } from "./lib/analyzeStress.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const App = () => {
  const [screen, setScreen] = useState("welcome");
  const [pendingAnswers, setPendingAnswers] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [aiFacts, setAiFacts] = useState(null);
  const [archetype, setArchetype] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const pdfRef = useRef(null);
  const hasDispatchedEmailRef = useRef(false);

  const handleStart = () => setScreen("stats");

  const handleAssessmentComplete = useCallback((answers) => {
    setPendingAnswers(answers);
    setScreen("lead");
  }, []);

  const handleLeadSubmit = useCallback(
    async (data) => {
      setUserInfo({ name: data.name, email: data.email, organization: data.organization });
      // Calculate score immediately — no need to wait for AI
      const score = pendingAnswers.reduce((sum, a, i) => sum + ([3, 4, 6, 7].includes(i) ? 4 - a : a), 0);
      setTotalScore(score);
      setAiLoading(true);
      setAiFacts(null);
      setArchetype(null);
      hasDispatchedEmailRef.current = false;
      setScreen("results");

      // Build per-question answers in Q1-a3 format
      const answersDetail = {};
      questions.forEach((q, i) => {
        answersDetail[`Q${i + 1}`] = `a${pendingAnswers[i]}`;
      });

      // Call AI analysis and Supabase in parallel
      const [aiResult] = await Promise.allSettled([
        analyzeStress(pendingAnswers),

        supabase
          ? supabase.from("assessments").insert({
              name: data.name,
              email: data.email,
              phone: data.phone || null,
              score,
              stress_level: calculateStressLevel(score),
              answers: answersDetail,
              organization: data.organization || null,
            })
          : Promise.resolve(),
      ]);

      if (aiResult.status === "fulfilled" && aiResult.value?.score !== undefined) {
        const { archetype: arc, ai_facts } = aiResult.value;
        setArchetype(arc);
        setAiFacts(ai_facts);
      } else {
        console.error("AI error:", aiResult.reason);
      }

      setAiLoading(false);
    },
    [pendingAnswers]
  );

  // Generate and send PDF in background once AI finishes and facts exist
  useEffect(() => {
    if (!aiLoading && aiFacts && aiFacts.length > 0 && userInfo?.email && pdfRef.current && !hasDispatchedEmailRef.current) {
      hasDispatchedEmailRef.current = true;
      
      const generateAndSendPdf = async () => {
        try {
          // Wait 200ms to ensure React fully flushes the text and DOM has painted
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const canvas = await html2canvas(pdfRef.current, { scale: 2 });
          const imgData = canvas.toDataURL("image/jpeg", 0.9);
          const pdf = new jsPDF("p", "pt", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
          
          const pdfBase64 = pdf.output("datauristring");

          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: userInfo.name,
              email: userInfo.email,
              score: totalScore,
              stressLevel: calculateStressLevel(totalScore),
              archetype: archetype,
              aiFacts: aiFacts,
              pdfBase64: pdfBase64,
            }),
          });
        } catch (err) {
          console.error("Failed to generate and send PDF:", err);
          hasDispatchedEmailRef.current = false; // allow retry on total failure
        }
      };

      generateAndSendPdf();
    }
  }, [aiLoading, aiFacts, userInfo]);

  const handleViewFacts = useCallback(() => setScreen("facts"), []);

  const handleRestart = useCallback(() => {
    setScreen("welcome");
    setPendingAnswers(null);
    setTotalScore(0);
    setAiFacts(null);
    setArchetype(null);
    setAiLoading(false);
    setUserInfo(null);
  }, []);

  return (
    <div className="min-h-screen w-screen">
      {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {screen === "stats" && <StatsScreen onNext={() => setScreen("questions")} />}
      {screen === "questions" && <QuestionScreen onComplete={handleAssessmentComplete} onBack={() => setScreen("stats")} />}
      {screen === "lead" && <LeadCaptureScreen onSubmit={handleLeadSubmit} onBack={() => setScreen("questions")} />}
      {screen === "results" && (
        <ResultsScreen
          score={totalScore}
          aiFacts={aiFacts}
          archetype={archetype}
          aiLoading={aiLoading}
          onRestart={handleRestart}
          onViewFacts={handleViewFacts}
        />
      )}
      {screen === "facts" && (
        <FactsScreen
          aiFacts={aiFacts}
          archetype={archetype}
          aiLoading={aiLoading}
          onRestart={handleRestart}
        />
      )}

      {/* Invisible PDF Report Container */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        {userInfo && (
          <PdfReport 
            ref={pdfRef} 
            name={userInfo.name} 
            score={totalScore} 
            aiFacts={aiFacts} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
