import { Button } from "./Button.jsx";
import { ArrowRight } from "lucide-react";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-background px-6 sm:px-10 py-10 sm:py-16">
      <div className="flex w-full justify-center shrink-0 animate-fade-in">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-12 sm:h-16 md:h-20 w-auto" />
      </div>

      <div className="flex flex-col items-center gap-5 sm:gap-8 text-center flex-1 justify-center max-w-2xl px-2 animate-fade-in">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight">
          Stress Check-In
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-secondary leading-relaxed max-w-md sm:max-w-xl">
          Take 2 minutes to understand your stress levels and get personalized wellness insights.
        </p>
        <Button size="lg" onClick={onStart} className="mt-4 sm:mt-8 w-full sm:w-auto px-8 sm:px-12 h-14 sm:h-16 text-base sm:text-lg gap-3 rounded-2xl shadow-xl">
          Get Started
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>

      <div className="shrink-0 pt-6 animate-fade-in">
        <p className="text-xs sm:text-sm text-muted-foreground/70 font-secondary text-center px-4">
          Your responses are confidential and used only for your personal assessment.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
