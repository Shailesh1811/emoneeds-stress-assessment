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
    <div className="flex h-screen flex-col items-center justify-between bg-background px-8 py-12 md:py-20">
      
      {/* Top Header */}
      <div className="w-full text-center shrink-0 animate-fade-in">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-16 md:h-20 w-auto mx-auto mb-6 md:mb-8 drop-shadow-xl" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">
          Do You Know?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-secondary">
          The hidden cost of workplace stress
        </p>
      </div>

      {/* Center Facts List */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-3xl my-8 px-4">
        <div className="flex flex-col gap-6 md:gap-8">
          {stats.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 md:gap-8 rounded-2xl bg-card border-2 border-border/50 px-8 py-6 shadow-card animate-fade-in"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="shrink-0 text-3xl md:text-4xl font-black text-primary min-w-[110px] md:min-w-[130px] text-right drop-shadow-sm">
                {item.value}
              </span>
              <p className="text-lg md:text-xl text-foreground font-secondary leading-relaxed">
                {item.fact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex justify-center w-full shrink-0 animate-fade-in delay-300">
        <Button size="lg" onClick={onNext} className="gap-3 px-10 md:px-14 h-16 md:h-18 text-lg md:text-xl font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
          Take the Stress Assessment
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default StatsScreen;
