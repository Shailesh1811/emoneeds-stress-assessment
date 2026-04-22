import { useState } from "react";
import { relationshipQuestions } from "../lib/relationship-data.js";
import { Button } from "./Button.jsx";
import { ArrowLeft } from "lucide-react";

const RelationshipQuestionScreen = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(relationshipQuestions.length).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = relationshipQuestions[currentIndex];
  const progress = ((currentIndex + 1) / relationshipQuestions.length) * 100;
  const selectedAnswer = answers[currentIndex];
  const isLast = currentIndex >= relationshipQuestions.length - 1;

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
            Question {currentIndex + 1} of {relationshipQuestions.length}
          </span>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 font-secondary">
            Relationship Assessment
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-rose-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question + Answers */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 sm:px-10 py-6" key={currentIndex}>
        <div className="w-full max-w-2xl animate-fade-in">
          <h2 className="mb-8 sm:mb-12 text-center text-xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-snug">
            {question.text}
          </h2>

          {/* Scale */}
          <div className="flex flex-col gap-4">
            {/* End labels */}
            <div className="flex justify-between px-1">
              <span className="text-xs sm:text-sm font-bold text-muted-foreground max-w-[30%] text-left leading-tight">{question.leftLabel}</span>
              <span className="text-xs sm:text-sm font-bold text-muted-foreground max-w-[30%] text-right leading-tight">{question.rightLabel}</span>
            </div>

            {/* 5 buttons */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleSelect(val)}
                  className={`flex-1 aspect-square flex items-center justify-center rounded-2xl border-2 text-lg sm:text-2xl font-black transition-all duration-200 ${
                    selectedAnswer === val
                      ? "border-rose-500 bg-rose-50 text-rose-600 shadow-md scale-105"
                      : "border-border bg-card text-foreground hover:border-rose-300 hover:bg-rose-50/50 hover:scale-[1.03]"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            {/* Number labels */}
            <div className="flex justify-between px-1">
              <span className="text-xs text-muted-foreground font-secondary">1 = {question.leftLabel}</span>
              <span className="text-xs text-muted-foreground font-secondary">5 = {question.rightLabel}</span>
            </div>
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

export default RelationshipQuestionScreen;
