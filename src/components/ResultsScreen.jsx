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
    <div className="min-h-screen flex flex-col bg-background px-6 sm:px-10 py-8 sm:py-12 gap-8">
      {/* Header */}
      <div className="flex justify-center shrink-0">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-9 sm:h-12 w-auto" />
      </div>

      {/* Score Circle */}
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="relative">
          <svg className="h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
            <circle cx="100" cy="100" r="85" fill="none" stroke={stressColor} strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 534} 534`} className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold animate-count-up" style={{ color: stressColor }}>{score}</span>
            <span className="text-xs sm:text-sm text-muted-foreground font-secondary mt-1">out of {maxScore}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <StressIcon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: stressColor }} />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold" style={{ color: stressColor }}>{config.label}</h2>
        </div>
      </div>

      {/* Tips / AI Facts */}
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-card p-5 sm:p-7 shadow-card border border-border/50 animate-fade-in">
        {aiFacts && aiFacts.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h3 className="text-base sm:text-lg font-bold text-foreground">Your Personalized Insights</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {aiFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-foreground font-secondary animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">
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
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h3 className="text-base sm:text-lg font-bold text-foreground">Recommended Next Steps</h3>
              </div>
              {aiLoading && <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />}
            </div>
            <ul className="flex flex-col gap-3">
              {config.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-foreground font-secondary animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">
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
      <div className="w-full max-w-2xl mx-auto flex items-center gap-4 sm:gap-5 bg-card p-4 sm:p-5 shadow-card border border-border/50 rounded-2xl animate-fade-in">
        <div className="rounded-xl bg-white p-2 shrink-0 shadow-sm border border-border/20">
          <QRCode value="https://emoneeds.com" size={64} />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm sm:text-base font-extrabold text-foreground">Learn More About Us</h4>
          <p className="text-xs sm:text-sm text-muted-foreground font-secondary leading-snug">Scan to visit Emoneeds for professional support.</p>
        </div>
      </div>

      {/* Privacy note */}
      <div className="w-full max-w-2xl mx-auto flex items-start gap-2 px-1 animate-fade-in">
        <span className="text-muted-foreground mt-0.5 shrink-0">🔒</span>
        <p className="text-xs sm:text-sm text-muted-foreground font-secondary leading-relaxed">
          These results are <strong>confidential</strong> and will be permanently removed from our databases once your report email has been sent.
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-2xl mx-auto flex gap-3 sm:gap-4 animate-fade-in pb-4">
        <Button variant="outline" onClick={onRestart} className="flex-1 gap-2 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-2xl border-2">
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> Take Again
        </Button>
        <Button onClick={onViewFacts} className="flex-1 gap-2 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-2xl shadow-lg">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> View AI Insights <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
