import { calculateStressLevel, stressLevelConfig, questions } from "../lib/assessment-data.js";
import QRCode from "react-qr-code";
import { Button } from "./Button.jsx";
import { RotateCcw, CheckCircle, AlertTriangle, AlertCircle, Lightbulb, Sparkles, Loader2, ArrowRight } from "lucide-react";

const stressColorMap = {
  low: "hsl(152, 60%, 42%)",
  moderate: "hsl(38, 92%, 50%)",
  high: "hsl(0, 72%, 51%)",
};

const ResultsScreen = ({ score, aiFacts, archetype, aiLoading, onRestart, onViewFacts }) => {
  const level = calculateStressLevel(score);
  const config = stressLevelConfig[level];
  const maxScore = questions.length * 4;
  const percentage = Math.round((score / maxScore) * 100);
  const stressColor = stressColorMap[level];
  const StressIcon = level === "low" ? CheckCircle : level === "moderate" ? AlertTriangle : AlertCircle;

  return (
    <div className="page-wrapper py-8 sm:py-12 px-5 sm:px-8 gap-6 sm:gap-8">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-8 sm:h-11 w-auto" />
      </div>

      {/* Score Circle */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 animate-fade-in">
        <div className="relative">
          <svg
            className="h-32 w-32 sm:h-44 sm:w-44 md:h-48 md:w-48 -rotate-90"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
            <circle
              cx="100" cy="100" r="85" fill="none"
              stroke={stressColor} strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 534} 534`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl md:text-6xl font-bold animate-count-up" style={{ color: stressColor }}>
              {score}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground font-secondary mt-0.5">
              out of {maxScore}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <StressIcon className="h-5 w-5 sm:h-7 sm:w-7" style={{ color: stressColor }} />
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold" style={{ color: stressColor }}>
            {config.label}
          </h2>
        </div>
      </div>

      {/* Tips / AI Facts */}
      <div className="content-container rounded-2xl bg-card p-5 sm:p-6 shadow-card border border-border/50 animate-fade-in">
        {aiFacts && aiFacts.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-foreground">Your Personalized Insights</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {aiFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground font-secondary animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">
                    {i + 1}
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-foreground">Recommended Next Steps</h3>
              </div>
              {aiLoading && <Loader2 className="h-4 w-4 text-muted-foreground animate-spin shrink-0" />}
            </div>
            <ul className="flex flex-col gap-3">
              {config.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground font-secondary animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* QR Code */}
      <div className="content-container flex items-center gap-4 bg-card p-4 sm:p-5 shadow-card border border-border/50 rounded-2xl animate-fade-in">
        <div className="rounded-xl bg-white p-2 shrink-0 shadow-sm border border-border/20">
          <QRCode value="https://emoneeds.com" size={56} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h4 className="text-sm sm:text-base font-extrabold text-foreground truncate">Learn More About Us</h4>
          <p className="text-xs sm:text-sm text-muted-foreground font-secondary leading-snug">
            Scan to visit Emoneeds for professional support.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="content-container flex gap-3 pb-4 animate-fade-in">
        <Button variant="outline" onClick={onRestart} className="flex-1 gap-2 rounded-2xl border-2 min-w-0">
          <RotateCcw className="shrink-0" /> <span className="truncate">Take Again</span>
        </Button>
        <Button onClick={onViewFacts} className="flex-1 gap-1 sm:gap-2 rounded-2xl shadow-lg min-w-0">
          <Sparkles className="shrink-0" />
          <span className="truncate">View AI Insights</span>
          <ArrowRight className="shrink-0" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
