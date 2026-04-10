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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="w-full px-5 sm:px-10 pt-6 sm:pt-10 shrink-0">
        <div className="flex justify-center mb-4 sm:mb-6">
          <img src="/emoneeds-logo.png" alt="emoneeds" className="h-9 sm:h-12 md:h-14 w-auto" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-sm font-semibold text-muted-foreground font-secondary">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary-dark font-secondary">
            {question.category}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question + Answers */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 sm:px-10 py-6" key={currentIndex}>
        <div className="w-full max-w-2xl animate-fade-in">
          <h2 className="mb-6 sm:mb-10 text-center text-xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-snug">
            {question.text}
          </h2>
          <div className="flex flex-col gap-3 sm:gap-4">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center rounded-2xl border-2 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-bold transition-all duration-300 ${
                  selectedAnswer === option.value
                    ? "border-primary bg-primary-light text-primary-dark shadow-card scale-[1.02]"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent hover:scale-[1.01]"
                }`}
              >
                <span className={`mr-4 sm:mr-5 flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-sm sm:text-base font-black ${
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

      {/* Footer */}
      <div className="w-full flex items-center px-5 sm:px-10 pb-6 sm:pb-10 shrink-0">
        <Button variant="outline" onClick={handlePrev} className="gap-2 h-11 sm:h-14 px-5 sm:px-7 text-sm sm:text-base font-semibold rounded-2xl border-2">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;
