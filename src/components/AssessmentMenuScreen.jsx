import { Brain, Heart, Wind, LayoutGrid, LogOut, ChevronRight, Clock } from "lucide-react";

const assessments = [
  {
    id: "stress",
    icon: Brain,
    title: "Stress Assessment",
    description: "Measure your current stress levels with our scientifically validated PSS-10 assessment.",
    color: "#0c8c8c",
    bgColor: "#e6f6f6",
    available: true,
  },
  {
    id: "relationship",
    icon: Heart,
    title: "Relationship Assessment",
    description: "Evaluate the health and dynamics of your personal and professional relationships.",
    color: "#e11d48",
    bgColor: "#fff1f2",
    available: false,
  },
  {
    id: "anxiety",
    icon: Wind,
    title: "Anxiety Assessment",
    description: "Understand your anxiety patterns and discover strategies for better mental well-being.",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    available: false,
  },
  {
    id: "other",
    icon: LayoutGrid,
    title: "More Assessments",
    description: "Explore additional mental wellness assessments tailored to your unique needs.",
    color: "#374151",
    bgColor: "#f3f4f6",
    available: false,
  },
];

const AssessmentMenuScreen = ({ onSelectAssessment, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background px-6 sm:px-10 py-8 sm:py-12 gap-8">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <img src="/emoneeds-logo.png" alt="emoneeds" className="h-9 sm:h-12 w-auto" />
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition px-3 py-2 rounded-xl hover:bg-muted"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Title */}
      <div className="text-center animate-fade-in">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3">
          Choose an Assessment
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-secondary max-w-lg mx-auto">
          Select the assessment you'd like to take. Each is designed to give you actionable insights into your mental wellness.
        </p>
      </div>

      {/* Assessment Cards */}
      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-fade-in">
        {assessments.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => item.available && onSelectAssessment(item.id)}
              disabled={!item.available}
              className={`
                relative flex flex-col items-start gap-4 p-6 rounded-3xl border text-left transition-all duration-200
                ${item.available
                  ? "bg-card border-border/50 shadow-card hover:shadow-lg hover:-translate-y-0.5 cursor-pointer hover:border-primary/30"
                  : "bg-card border-border/30 opacity-70 cursor-not-allowed"
                }
              `}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Coming Soon badge */}
              {!item.available && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-bold text-muted-foreground">Coming Soon</span>
                </div>
              )}

              {/* Icon */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
                style={{ backgroundColor: item.bgColor }}
              >
                <Icon className="w-6 h-6" style={{ color: item.color }} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-extrabold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-secondary leading-relaxed">{item.description}</p>
              </div>

              {/* Arrow (only if available) */}
              {item.available && (
                <div className="self-end flex items-center gap-1 text-xs font-bold" style={{ color: item.color }}>
                  Start <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground font-secondary pb-2">
        All assessments are confidential and powered by emoneeds AI.
      </p>
    </div>
  );
};

export default AssessmentMenuScreen;
