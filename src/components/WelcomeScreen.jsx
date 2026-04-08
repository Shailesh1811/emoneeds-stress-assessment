import { Button } from "./Button.jsx";
import { ArrowRight } from "lucide-react";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-between bg-background px-8 py-16 md:py-24">
      
      {/* Top Anchor: Logo */}
      <div className="flex w-full justify-center shrink-0 animate-fade-in">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-16 md:h-24 w-auto drop-shadow-xl" />
      </div>

      {/* Epicenter: Main Value Prop */}
      <div className="flex flex-col items-center gap-6 md:gap-10 text-center flex-1 justify-center max-w-4xl px-4 animate-fade-in delay-100">
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
          Stress Check-In
        </h1>
        <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground font-secondary leading-relaxed">
          Take 2 minutes to understand your stress levels and get personalized wellness insights.
        </p>
        
        {/* Premium Large Button for iPad */}
        <Button size="lg" onClick={onStart} className="mt-8 md:mt-12 px-10 md:px-16 h-16 md:h-20 text-xl font-semibold gap-4 rounded-2xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          Get Started
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
      </div>

      {/* Footer Anchor: Trust badge */}
      <div className="shrink-0 pt-8 animate-fade-in delay-200">
        <p className="text-sm md:text-base text-muted-foreground/70 font-secondary text-center px-4">
          Your responses are confidential and used only for your personal assessment.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;