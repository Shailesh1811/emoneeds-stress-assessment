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
    <div className="flex h-screen flex-col bg-background justify-between py-10 md:py-16">
      {/* Top Header */}
      <div className="flex justify-center shrink-0">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 md:h-12 w-auto drop-shadow-xl" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 md:px-12 w-full overflow-y-auto">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl animate-fade-in my-auto py-8">
          
          {/* Score Circle */}
          <div className="relative mb-6 md:mb-8 scale-110 md:scale-125">
            <svg className="h-48 w-48 -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
              <circle cx="100" cy="100" r="85" fill="none" stroke={stressColor} strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 534} 534`} className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl md:text-6xl font-bold animate-count-up" style={{ color: stressColor }}>{score}</span>
              <span className="text-base md:text-lg text-muted-foreground font-secondary mt-1">out of {maxScore}</span>
            </div>
          </div>
          
          {/* Stress Level Text */}
          <div className="flex flex-col items-center text-center px-4 mb-8 md:mb-10">
            <div className="flex items-center gap-3 md:gap-4">
              <StressIcon className="h-8 w-8 md:h-10 md:w-10" style={{ color: stressColor }} />
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: stressColor }}>{config.label}</h2>
            </div>
          </div>

          {/* QR Code Box */}
          <div className="flex items-center gap-5 w-full bg-card p-6 shadow-card border border-border/50 rounded-2xl max-w-md">
            <div className="rounded-xl bg-white p-3 shrink-0 shadow-sm border border-border/20">
              <QRCode value="https://emoneeds.com" size={84} />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <h4 className="text-xl font-extrabold text-foreground tracking-tight">Learn More About Us</h4>
              <p className="text-base text-muted-foreground font-secondary leading-snug">Scan this QR code natively with your phone to visit Emoneeds for professional support.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Return Actions (Side by Side) */}
      <div className="flex justify-center shrink-0 w-full px-6 md:px-12 animate-fade-in delay-200">
        <div className="flex w-full max-w-2xl gap-4 md:gap-6">
          <Button variant="outline" size="lg" onClick={onRestart} className="flex-1 gap-2 md:gap-3 h-16 md:h-20 text-lg md:text-xl font-bold rounded-2xl border-2">
            <RotateCcw className="w-5 h-5 md:w-6 md:h-6" /> Take Again
          </Button>
          <Button size="lg" onClick={onViewFacts} className="flex-1 gap-2 md:gap-3 h-16 md:h-20 text-lg md:text-xl font-bold rounded-2xl shadow-lg">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 shrink-0" /> View AI Insights <ArrowRight className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
