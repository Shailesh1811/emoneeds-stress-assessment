import { useState } from "react";
import { questions, answerOptions } from "../lib/assessment-data.js";
import { Button } from "./Button.jsx";
import { ArrowLeft } from "lucide-react";

const QuestionScreen = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentIndex] || questions[questions.length - 1];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const selectedAnswer = answers[currentIndex];
  const isLast = currentIndex >= questions.length - 1;

  const handleSelect = (value) => {
    if (isTransitioning) return;
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (isLast) {
        onComplete(newAnswers);
      } else {
        setCurrentIndex((i) => i + 1);
        setIsTransitioning(false);
      }
    }, 400);
  };

  const handlePrev = () => {
    if (currentIndex === 0) { onBack(); } else { setCurrentIndex((i) => i - 1); }
  };

  return (
    <div className="flex h-screen flex-col bg-background justify-between">
      {/* Top Header */}
      <div className="w-full px-8 md:px-16 pt-8 md:pt-12 shrink-0">
        <div className="flex justify-center mb-6 md:mb-8">
          <img src="/emoneeds-logo.png" alt="emoneeds" className="h-10 md:h-14 w-auto drop-shadow-xl" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm md:text-base font-semibold text-muted-foreground font-secondary">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="rounded-full bg-primary-light px-4 py-1.5 text-xs md:text-sm font-semibold text-primary-dark font-secondary">
            {question.category}
          </span>
        </div>
        <div className="h-2 md:h-3 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Middle Question Area */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 md:px-16 overflow-y-auto" key={currentIndex}>
        <div className="w-full max-w-3xl animate-fade-in my-auto py-8">
          <h2 className="mb-10 md:mb-14 text-center text-3xl md:text-4xl font-extrabold text-foreground leading-snug">
            {question.text}
          </h2>
          <div className="flex flex-col gap-4 md:gap-5">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex h-[72px] md:h-[84px] w-full items-center rounded-2xl border-2 px-6 md:px-8 text-xl font-bold transition-all duration-300 ${
                  selectedAnswer === option.value
                    ? "border-primary bg-primary-light text-primary-dark shadow-card scale-[1.02]"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent hover:scale-[1.01]"
                }`}
              >
                <span className={`mr-6 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full text-base md:text-lg font-black shrink-0 ${
                  selectedAnswer === option.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {option.value + 1}
                </span>
                <span className="text-left leading-tight">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="w-full flex items-center px-8 md:px-16 pb-8 md:pb-12 shrink-0">
        <Button variant="outline" size="lg" onClick={handlePrev} className="gap-3 h-14 md:h-16 px-6 md:px-8 text-lg font-semibold rounded-2xl border-2">
          <ArrowLeft className="w-6 h-6" /> Back
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;