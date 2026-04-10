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
    <div className="page-wrapper py-8 sm:py-12 px-5 sm:px-8 gap-5 sm:gap-7">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-8 sm:h-11 w-auto" />
      </div>

      {/* Title */}
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-light px-4 py-2 mb-3 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          <span className="text-xs sm:text-sm font-bold text-primary-dark">AI-Powered Insights</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground mb-1.5">
          Your Personalized Facts
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-secondary">
          Based on your stress assessment responses
        </p>
      </div>

      {/* Archetype Card */}
      {archetype && (
        <div className="content-container rounded-2xl border-2 border-primary/20 bg-primary-light p-5 sm:p-6 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Executive Archetype</span>
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-dark mb-1.5">{archetype}</h3>
          <p className="text-xs sm:text-sm text-foreground font-secondary leading-relaxed">
            {archetypeDescriptions[archetype] || "A unique stress profile identified from your responses."}
          </p>
        </div>
      )}

      {/* Facts */}
      <div className="content-container rounded-2xl bg-card p-5 sm:p-7 shadow-card border border-border/50 animate-fade-in">
        {aiLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8 sm:py-10">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-spin" />
            <p className="text-xs sm:text-sm text-muted-foreground font-secondary">
              Generating your personalized insights…
            </p>
          </div>
        ) : aiFacts && aiFacts.length > 0 ? (
          <ul className="flex flex-col gap-4 sm:gap-6">
            {aiFacts.map((fact, i) => (
              <li
                key={i}
                className="flex items-start gap-3 sm:gap-4 animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-black text-primary-foreground shadow-sm">
                  {i + 1}
                </span>
                <p className="text-sm sm:text-base lg:text-lg text-foreground font-secondary leading-relaxed pt-0.5">
                  {fact}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xs sm:text-sm text-muted-foreground font-secondary py-8">
            No insights available. Please retake the assessment.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="content-container flex justify-center pb-4 animate-fade-in">
        <Button variant="outline" onClick={onRestart} className="w-full sm:w-auto gap-2 rounded-2xl border-2">
          <RotateCcw /> Take Again
        </Button>
      </div>
    </div>
  );
};

export default FactsScreen;
