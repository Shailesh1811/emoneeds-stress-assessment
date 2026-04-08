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
    <div className="flex h-screen flex-col bg-background justify-between py-12 md:py-16">
      {/* Header Anchor */}
      <div className="flex justify-center shrink-0">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 md:h-12 w-auto drop-shadow-xl" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 items-center justify-center px-6 md:px-16 overflow-y-auto w-full">
        <div className="w-full max-w-3xl animate-fade-in my-auto py-8">

          {/* Title Module */}
          <div className="mb-8 md:mb-12 text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-light px-5 py-2.5 mb-5 md:mb-6 shadow-sm">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-bold text-primary-dark">AI-Powered Insights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">Your Personalized Facts</h2>
            <p className="text-lg md:text-xl text-muted-foreground font-secondary">
              Based on your stress assessment responses
            </p>
          </div>

          {/* Archetype card */}
          {archetype && (
            <div className="mb-6 md:mb-8 rounded-2xl border-2 border-primary/20 bg-primary-light p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <Brain className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Executive Archetype</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-2">{archetype}</h3>
              <p className="text-base md:text-lg text-foreground font-secondary leading-relaxed space-y-2">
                {archetypeDescriptions[archetype] || "A unique stress profile identified from your responses."}
              </p>
            </div>
          )}

          {/* Facts list */}
          <div className="rounded-2xl bg-card p-8 md:p-10 shadow-card border border-border/50">
            {aiLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="text-lg text-muted-foreground font-secondary">Generating your personalized insights…</p>
              </div>
            ) : aiFacts && aiFacts.length > 0 ? (
              <ul className="flex flex-col gap-6 md:gap-8">
                {aiFacts.map((fact, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 md:gap-6 animate-fade-in"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <span className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base md:text-lg font-black text-primary-foreground shadow-sm">
                      {i + 1}
                    </span>
                    <p className="text-xl md:text-2xl text-foreground font-secondary leading-relaxed pt-1 md:pt-1.5">{fact}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-muted-foreground font-secondary py-10">
                No insights available. Please retake the assessment.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Return Action */}
      <div className="flex justify-center shrink-0 pt-6 animate-fade-in delay-300">
        <Button variant="outline" size="lg" onClick={onRestart} className="gap-3 h-14 md:h-16 px-8 md:px-10 text-lg font-bold rounded-2xl border-2">
          <RotateCcw className="w-5 h-5 md:w-6 md:h-6" /> Take Again
        </Button>
      </div>
    </div>
  );
};

export default FactsScreen;
