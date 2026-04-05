import { useEffect, useState, useRef } from "react";
import { calculateStressLevel, stressLevelConfig, questions } from "../lib/assessment-data.js";
import QRCode from "react-qr-code";
import { Button } from "./Button.jsx";
import { RotateCcw, CheckCircle, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";

const stressColorMap = {
  low: "hsl(152, 60%, 42%)",
  moderate: "hsl(38, 92%, 50%)",
  high: "hsl(0, 72%, 51%)",
};

const AUTO_RESET_SECONDS = 15;

const ResultsScreen = ({ score, onRestart }) => {
  const level = calculateStressLevel(score);
  const config = stressLevelConfig[level];
  const maxScore = questions.length * 4;
  const percentage = Math.round((score / maxScore) * 100);
  const [countdown, setCountdown] = useState(AUTO_RESET_SECONDS);
  const timerRef = useRef();

  const resetTimer = () => setCountdown(AUTO_RESET_SECONDS);

  useEffect(() => {
    const handleActivity = () => resetTimer();
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("mousemove", handleActivity);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { onRestart(); return AUTO_RESET_SECONDS; }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onRestart]);

  const stressColor = stressColorMap[level];
  const StressIcon = level === "low" ? CheckCircle : level === "moderate" ? AlertTriangle : AlertCircle;

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex justify-center pt-6">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 w-auto" />
      </div>
      <div className="flex flex-1 items-center justify-center px-12">
        <div className="grid w-full max-w-5xl grid-cols-2 gap-12 animate-fade-in">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <svg className="h-48 w-48 -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                <circle cx="100" cy="100" r="85" fill="none" stroke={stressColor} strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 534} 534`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold animate-count-up" style={{ color: stressColor }}>{score}</span>
                <span className="text-sm text-muted-foreground font-secondary">out of {maxScore}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <StressIcon className="h-6 w-6" style={{ color: stressColor }} />
              <h2 className="text-2xl font-bold" style={{ color: stressColor }}>{config.label}</h2>
            </div>
            <p className="text-center text-base text-muted-foreground font-secondary max-w-sm">{config.description}</p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="rounded-xl bg-card p-8 shadow-card">
              <div className="flex items-center gap-2 mb-5">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Recommended Next Steps</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {config.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-foreground font-secondary animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}>
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex items-center gap-4 rounded-xl bg-card p-5 shadow-card">
              <div className="rounded-md bg-white p-2 shrink-0">
                <QRCode value="https://emoneeds.com" size={72} />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">Learn More About Us</h4>
                <p className="text-sm text-muted-foreground font-secondary">Scan this QR code with your phone's camera to visit the Emoneeds website for professional support.</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={onRestart} className="gap-2">
                <RotateCcw /> Take Again
              </Button>
              <span className="text-sm text-muted-foreground font-secondary">Auto-reset in {countdown}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;