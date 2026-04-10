import { Button } from "./Button.jsx";
import { ArrowRight } from "lucide-react";

const stats = [
  {
    value: "$1 Trillion",
    fact: "Mental health issues cost the global economy in lost productivity every year.",
  },
  {
    value: "2.6×",
    fact: "Stressed employees are more likely to actively search for a new job.",
  },
  {
    value: "$4 Back",
    fact: "For every $1 spent on mental health programs, companies get $4 back in productivity gains.",
  },
  {
    value: "63%",
    fact: "Of sick days in the tech industry are caused by burnout.",
  },
];

const StatsScreen = ({ onNext }) => {
  return (
    <div className="page-wrapper items-center justify-between py-10 sm:py-14 px-5 sm:px-8">
      {/* Header */}
      <div className="w-full text-center animate-fade-in">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 sm:h-14 md:h-16 w-auto mx-auto mb-4 sm:mb-5" />
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-2">
          Do You Know?
        </h1>
        <p className="text-xs sm:text-base text-muted-foreground font-secondary">
          The hidden cost of workplace stress
        </p>
      </div>

      {/* Stats cards */}
      <div className="content-container flex flex-col gap-3 sm:gap-4 my-6 sm:my-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 rounded-2xl bg-card border-2 border-border/50 px-5 sm:px-6 py-4 sm:py-5 shadow-card animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-primary sm:min-w-[100px] sm:text-right shrink-0">
              {item.value}
            </span>
            <p className="text-xs sm:text-sm lg:text-base text-foreground font-secondary leading-relaxed">
              {item.fact}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="content-container flex justify-center">
        <Button size="lg" onClick={onNext} className="w-full sm:w-auto gap-3 rounded-2xl shadow-xl">
          Take the Stress Assessment
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default StatsScreen;
