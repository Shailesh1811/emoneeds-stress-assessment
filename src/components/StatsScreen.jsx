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
    <div className="min-h-screen flex flex-col items-center justify-between bg-background px-6 sm:px-10 py-10 sm:py-16">
      <div className="w-full text-center shrink-0 animate-fade-in">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-12 sm:h-16 md:h-20 w-auto mx-auto mb-4 sm:mb-6" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-2">
          Do You Know?
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-secondary">
          The hidden cost of workplace stress
        </p>
      </div>

      <div className="flex flex-col w-full max-w-2xl my-6 sm:my-8 gap-4 sm:gap-5 px-0">
        {stats.map((item, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-2xl bg-card border-2 border-border/50 px-5 sm:px-7 py-4 sm:py-5 shadow-card animate-fade-in"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <span className="text-2xl sm:text-3xl font-black text-primary sm:min-w-[110px] sm:text-right">
              {item.value}
            </span>
            <p className="text-sm sm:text-base md:text-lg text-foreground font-secondary leading-relaxed">
              {item.fact}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full shrink-0 animate-fade-in">
        <Button size="lg" onClick={onNext} className="w-full sm:w-auto gap-3 px-8 sm:px-12 h-14 sm:h-16 text-base sm:text-lg font-bold rounded-2xl shadow-xl">
          Take the Stress Assessment
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>
    </div>
  );
};

export default StatsScreen;
