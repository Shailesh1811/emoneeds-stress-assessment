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
    <div className="page-wrapper">
      {/* Header */}
      <div className="content-container pt-6 sm:pt-10 pb-0">
        <div className="flex justify-center mb-4 sm:mb-5">
          <img src="/emoneeds-logo.png" alt="emoneeds" className="h-8 sm:h-11 md:h-13 w-auto" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-sm font-semibold text-muted-foreground font-secondary">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary-dark font-secondary">
            {question.category}
          </span>
        </div>
        <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question + Answers */}
      <div className="flex flex-1 flex-col items-center justify-center py-6 sm:py-8" key={currentIndex}>
        <div className="content-container animate-fade-in">
          <h2 className="mb-5 sm:mb-8 text-center text-lg sm:text-2xl lg:text-3xl font-extrabold text-foreground leading-snug">
            {question.text}
          </h2>
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center rounded-xl border-2 px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base font-semibold transition-all duration-300 min-h-[52px] sm:min-h-[60px] ${
                  selectedAnswer === option.value
                    ? "border-primary bg-primary-light text-primary-dark shadow-card scale-[1.02]"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent hover:scale-[1.01]"
                }`}
              >
                <span className={`mr-3 sm:mr-4 flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-black ${
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
      <div className="content-container pb-6 sm:pb-10 flex items-center">
        <Button variant="outline" size="sm" onClick={handlePrev} className="gap-2 rounded-xl border-2">
          <ArrowLeft /> Back
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;
