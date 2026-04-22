import { useEffect } from "react";
import { calculateRelationshipLevel, relationshipLevelConfig } from "../lib/relationship-data.js";
import { Button } from "./Button.jsx";
import { RotateCcw, CheckCircle, AlertTriangle, AlertCircle, Lightbulb, Sparkles, Loader2, ArrowRight } from "lucide-react";
import QRCode from "react-qr-code";

const stressColorMap = {
  low:     "hsl(0, 72%, 51%)",
  average: "hsl(38, 92%, 50%)",
  high:    "hsl(152, 60%, 42%)",
};

const archetypeDescriptions = {
  "The Thriving Companion":    "Your relationship is strong and fulfilling. You and your partner support each other well — keep nurturing this foundation.",
  "The Resilient Partner":     "You value your relationship deeply despite facing challenges. Your commitment is an asset — working through conflict together can strengthen your bond.",
  "The Drifting Coexister":    "You and your partner may have settled into routine without deep engagement. Reconnecting intentionally can reignite closeness.",
  "The Disconnected Partner":  "Your relationship currently feels unfulfilling and strained. Honest conversations and professional support can open a path forward.",
};

const RelationshipResultsScreen = ({ score, aiFacts, archetype, aiLoading, onRestart, onViewFacts }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const level  = calculateRelationshipLevel(score);
  const config = relationshipLevelConfig[level];
  const maxScore  = 35;
  const minScore  = 7;
  const percentage = Math.round(((score - minScore) / (maxScore - minScore)) * 100);
  const color  = stressColorMap[level];
  const Icon   = level === "high" ? CheckCircle : level === "average" ? AlertTriangle : AlertCircle;

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
            <circle cx="100" cy="100" r="85" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 534} 534`} className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color }}>{score}</span>
            <span className="text-xs sm:text-sm text-muted-foreground font-secondary mt-1">out of {maxScore}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Icon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color }} />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold" style={{ color }}>{config.label}</h2>
        </div>
      </div>

      {/* Archetype */}
      {archetype && (
        <div className="w-full max-w-2xl mx-auto rounded-2xl border-2 border-rose-200 bg-rose-50 p-5 sm:p-7 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">Relationship Archetype</p>
          <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-2">{archetype}</h3>
          <p className="text-sm sm:text-base text-muted-foreground font-secondary leading-relaxed">
            {archetypeDescriptions[archetype] || "A unique relationship profile identified from your responses."}
          </p>
        </div>
      )}

      {/* Tips / AI Facts */}
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-card p-5 sm:p-7 shadow-card border border-border/50 animate-fade-in">
        {aiFacts && aiFacts.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
              <h3 className="text-base sm:text-lg font-bold text-foreground">Your Personalized Insights</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {aiFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-foreground font-secondary animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700">
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
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
                <h3 className="text-base sm:text-lg font-bold text-foreground">Recommended Next Steps</h3>
              </div>
              {aiLoading && <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />}
            </div>
            <ul className="flex flex-col gap-3">
              {config.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-foreground font-secondary"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700">
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
          <p className="text-xs sm:text-sm text-muted-foreground font-secondary leading-snug">Scan to visit Emoneeds for professional relationship support.</p>
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
        <Button onClick={onViewFacts}
          className="flex-1 gap-2 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-2xl shadow-lg"
          style={{ backgroundColor: "#e11d48" }}>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> View AI Insights <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </Button>
      </div>
    </div>
  );
};

export default RelationshipResultsScreen;
