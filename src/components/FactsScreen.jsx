import { Button } from "./Button.jsx";
import { Sparkles, Brain, RotateCcw, Loader2 } from "lucide-react";

const archetypeDescriptions = {
  "The High-Functioning Firefighter": "You're highly capable but constantly putting out fires. Your drive is an asset — but without rest, it becomes a liability.",
  "Cognitive Depletion": "Your mental reserves are running low. Decision fatigue is real, and your mind is signaling it needs recovery time.",
  "Executive Detachment": "You appear calm on the surface, but may be emotionally disconnected. Re-engaging with purpose can restore your edge.",
  "Optimal Flow State": "You're operating at your peak. Stress is channeled productively and your mind is clear and focused.",
};

const FactsScreen = ({ aiFacts, archetype, aiLoading, onRestart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background px-6 sm:px-10 py-8 sm:py-12 gap-6 sm:gap-8">
      {/* Header */}
      <div className="flex justify-center shrink-0">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-9 sm:h-12 w-auto" />
      </div>

      {/* Title */}
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-light px-4 py-2 mb-4 shadow-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs sm:text-sm font-bold text-primary-dark">AI-Powered Insights</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-2">Your Personalized Facts</h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-secondary">
          Based on your stress assessment responses
        </p>
      </div>

      {/* Archetype Card */}
      {archetype && (
        <div className="w-full max-w-2xl mx-auto rounded-2xl border-2 border-primary/20 bg-primary-light p-5 sm:p-7 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Executive Archetype</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary-dark mb-2">{archetype}</h3>
          <p className="text-sm sm:text-base text-foreground font-secondary leading-relaxed">
            {archetypeDescriptions[archetype] || "A unique stress profile identified from your responses."}
          </p>
        </div>
      )}

      {/* Facts */}
      <div className="w-full max-w-2xl mx-auto rounded-2xl bg-card p-5 sm:p-8 shadow-card border border-border/50 animate-fade-in">
        {aiLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-sm sm:text-base text-muted-foreground font-secondary">Generating your personalized insights…</p>
          </div>
        ) : aiFacts && aiFacts.length > 0 ? (
          <ul className="flex flex-col gap-5 sm:gap-6">
            {aiFacts.map((fact, i) => (
              <li key={i} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground shadow-sm">
                  {i + 1}
                </span>
                <p className="text-base sm:text-lg md:text-xl text-foreground font-secondary leading-relaxed pt-0.5">{fact}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm sm:text-base text-muted-foreground font-secondary py-8">
            No insights available. Please retake the assessment.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-center pb-4 animate-fade-in">
        <Button variant="outline" onClick={onRestart} className="gap-2 h-12 sm:h-14 px-7 sm:px-10 text-sm sm:text-base font-bold rounded-2xl border-2">
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> Take Again
        </Button>
      </div>
    </div>
  );
};

export default FactsScreen;
