import { Button } from "./Button.jsx";
import { ArrowRight } from "lucide-react";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="page-wrapper items-center justify-between py-10 sm:py-14 lg:py-20 px-5 sm:px-8">
      {/* Logo */}
      <div className="flex w-full justify-center animate-fade-in">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 sm:h-14 md:h-16 w-auto" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center gap-5 sm:gap-7 text-center flex-1 justify-center w-full max-w-2xl mx-auto px-2 animate-fade-in">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
          Stress Check-In
        </h1>
        <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground font-secondary leading-relaxed max-w-lg">
          Take 2 minutes to understand your stress levels and get personalized wellness insights.
        </p>
        <Button size="lg" onClick={onStart} className="mt-2 sm:mt-6 w-full sm:w-auto gap-3 rounded-2xl shadow-xl">
          Get Started
          <ArrowRight />
        </Button>
      </div>

      {/* Footer note */}
      <p className="text-xs sm:text-sm text-muted-foreground/60 font-secondary text-center max-w-sm mx-auto animate-fade-in">
        Your responses are confidential and used only for your personal assessment.
      </p>
    </div>
  );
};

export default WelcomeScreen;
