import { Button } from "./Button.jsx";
import { RotateCcw, Users, MessageSquare, MapPin } from "lucide-react";

/* ── Service items ───────────────────────────────────── */
const SERVICES = [
  {
    title: "Employee Assistance Programs",
    desc:  "Confidential access to psychiatry, therapy, and counseling for your team.",
    illustration: (
      /* Two people in conversation — doctor + patient */
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <rect width="120" height="120" rx="16" fill="#e6f6f6"/>
        {/* Person left */}
        <circle cx="38" cy="42" r="14" fill="#b2dede"/>
        <rect x="22" y="60" width="32" height="36" rx="10" fill="#7bbfbf"/>
        {/* Person right (doctor) */}
        <circle cx="82" cy="42" r="14" fill="#ffffff" stroke="#0c8c8c" strokeWidth="2"/>
        <rect x="66" y="60" width="32" height="36" rx="10" fill="#ffffff" stroke="#0c8c8c" strokeWidth="2"/>
        {/* Stethoscope hint */}
        <path d="M78 72 Q82 80 86 72" stroke="#0c8c8c" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Chat bubble between them */}
        <rect x="46" y="32" width="28" height="16" rx="6" fill="#0c8c8c"/>
        <path d="M54 48 L58 54 L62 48" fill="#0c8c8c"/>
        <line x1="51" y1="37" x2="69" y2="37" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="51" y1="43" x2="63" y2="43" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Psychometric Hiring Assessments",
    desc:  "Understand who someone is before you make the offer.",
    illustration: (
      /* Clipboard with personality/chart elements */
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <rect width="120" height="120" rx="16" fill="#e6f6f6"/>
        {/* Clipboard */}
        <rect x="24" y="20" width="72" height="86" rx="8" fill="#ffffff" stroke="#0c8c8c" strokeWidth="2"/>
        <rect x="44" y="14" width="32" height="14" rx="6" fill="#0c8c8c"/>
        {/* Bars */}
        <rect x="34" y="72" width="10" height="22" rx="3" fill="#b2dede"/>
        <rect x="50" y="58" width="10" height="36" rx="3" fill="#0c8c8c"/>
        <rect x="66" y="66" width="10" height="28" rx="3" fill="#7bbfbf"/>
        {/* Magnifier */}
        <circle cx="88" cy="44" r="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
        <line x1="100" y1="56" x2="110" y2="66" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
        {/* Face in magnifier */}
        <circle cx="88" cy="40" r="6" fill="#0c8c8c"/>
        <path d="M82 52 Q88 56 94 52" stroke="#0c8c8c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: "Manager Training",
    desc:  "Equip your leaders to notice, listen, and respond.",
    illustration: (
      /* Two professionals in discussion */
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <rect width="120" height="120" rx="16" fill="#e6f6f6"/>
        {/* Person left (manager) */}
        <circle cx="40" cy="38" r="14" fill="#0c8c8c"/>
        <rect x="24" y="56" width="32" height="40" rx="10" fill="#0c8c8c"/>
        {/* Person right */}
        <circle cx="80" cy="42" r="12" fill="#b2dede"/>
        <rect x="66" y="58" width="28" height="36" rx="9" fill="#7bbfbf"/>
        {/* Speech wave lines */}
        <path d="M56 38 Q60 34 64 38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M52 33 Q60 27 68 33" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Whiteboard hint */}
        <rect x="30" y="16" width="60" height="16" rx="4" fill="#ffffff" stroke="#0c8c8c" strokeWidth="1.5"/>
        <line x1="36" y1="21" x2="64" y2="21" stroke="#0c8c8c" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="26" x2="54" y2="26" stroke="#b2dede" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Wellness Audits",
    desc:  "See what's actually happening in your organization, not what surveys tell you.",
    illustration: (
      /* Person with magnifier / data */
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <rect width="120" height="120" rx="16" fill="#e6f6f6"/>
        {/* Person */}
        <circle cx="42" cy="38" r="14" fill="#0c8c8c"/>
        <rect x="26" y="56" width="32" height="40" rx="10" fill="#0c8c8c"/>
        {/* Big magnifier */}
        <circle cx="82" cy="52" r="22" fill="none" stroke="#b2dede" strokeWidth="3"/>
        <circle cx="82" cy="52" r="14" fill="#fef3c7"/>
        {/* Chart inside magnifier */}
        <rect x="74" y="58" width="5" height="8" rx="1" fill="#f59e0b"/>
        <rect x="81" y="52" width="5" height="14" rx="1" fill="#0c8c8c"/>
        <rect x="88" y="55" width="5" height="11" rx="1" fill="#7bbfbf"/>
        {/* Handle */}
        <line x1="98" y1="68" x2="108" y2="80" stroke="#b2dede" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ── Stats ───────────────────────────────────────────── */
const STATS = [
  { value: "20,000+",  label: "individuals", icon: <Users  className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" /> },
  { value: "200,000+", label: "sessions",    icon: <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: "#0c8c8c" }} /> },
  { value: "223+",     label: "cities",      icon: <MapPin  className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: "#0c8c8c" }} /> },
];

/* ════════════════════════════════════════════════════════
   Component
═══════════════════════════════════════════════════════ */
const WhoWeAreScreen = ({ onRestart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* ── Scrollable content ── */}
      <div className="flex-1 flex flex-col items-center px-5 sm:px-10 pt-10 sm:pt-14 pb-6 gap-0">

        {/* ══ SECTION 1: WHO WE ARE ══ */}
        <section className="w-full max-w-2xl flex flex-col items-center gap-5 sm:gap-7 animate-fade-in">

          {/* Badge */}
          <div className="flex items-center gap-2.5 bg-primary text-primary-foreground px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="7" r="3"/>
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              <circle cx="17" cy="7" r="3"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            </svg>
            <span className="text-base sm:text-lg font-bold tracking-wide">Who We Are</span>
          </div>

          {/* Main quote */}
          <blockquote className="text-center text-xl sm:text-2xl md:text-3xl font-bold italic text-foreground leading-snug px-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            "The people in your office who seem fine are not always fine."
          </blockquote>

          {/* Description */}
          <p className="text-center text-sm sm:text-base md:text-lg text-foreground font-secondary leading-relaxed max-w-xl px-1">
            Emoneeds is an{" "}
            <strong className="text-primary font-bold">integrated mental health platform.</strong>{" "}
            Psychiatrists, clinical psychologists, and counselors working together, sharing treatment
            plans, treating the full spectrum. From workplace stress to serious illness.
          </p>

          {/* Hero illustration placeholder */}
          <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-card border border-border/40 bg-card"
            style={{ aspectRatio: "4/3" }}>
            {/* Illustrated placeholder matching the mockup */}
            <svg viewBox="0 0 440 330" className="w-full h-full" fill="none">
              {/* Office background */}
              <rect width="440" height="330" fill="#f0f9f9"/>
              {/* Floor */}
              <rect y="240" width="440" height="90" fill="#e6f6f6"/>
              {/* Window */}
              <rect x="10" y="30" width="80" height="110" rx="6" fill="#cce8f4"/>
              <line x1="50" y1="30" x2="50" y2="140" stroke="#b2dede" strokeWidth="2"/>
              <line x1="10" y1="80" x2="90" y2="80" stroke="#b2dede" strokeWidth="2"/>
              {/* Plant */}
              <rect x="20" y="200" width="16" height="42" rx="4" fill="#8fbc8f"/>
              <ellipse cx="28" cy="198" rx="22" ry="18" fill="#6aaa6a"/>
              <ellipse cx="14" cy="208" rx="14" ry="12" fill="#5a9a5a"/>
              <ellipse cx="42" cy="206" rx="14" ry="12" fill="#5a9a5a"/>

              {/* MAIN PERSON — stressed at desk */}
              {/* Desk */}
              <rect x="130" y="218" width="180" height="12" rx="4" fill="#c4a882"/>
              <rect x="148" y="230" width="8" height="42" rx="3" fill="#b09070"/>
              <rect x="284" y="230" width="8" height="42" rx="3" fill="#b09070"/>
              {/* Laptop */}
              <rect x="175" y="188" width="90" height="58" rx="6" fill="#3a3a4a"/>
              <rect x="178" y="191" width="84" height="50" rx="4" fill="#4a9999"/>
              <rect x="155" y="246" width="130" height="6" rx="3" fill="#2a2a3a"/>
              {/* Coffee mug */}
              <rect x="278" y="224" width="18" height="20" rx="4" fill="#8b5e3c"/>
              <path d="M296 230 Q304 230 304 238 Q304 246 296 246" stroke="#6b4428" strokeWidth="2" fill="none"/>
              {/* Person — sitting */}
              <ellipse cx="220" cy="178" rx="26" ry="26" fill="#f4c4a0"/>
              {/* Hair */}
              <ellipse cx="220" cy="158" rx="24" ry="16" fill="#2a1a0a"/>
              {/* Body */}
              <rect x="192" y="200" width="56" height="60" rx="18" fill="#5a7abd"/>
              {/* Left arm on desk */}
              <path d="M194 220 Q170 230 175 246" stroke="#5a7abd" strokeWidth="20" strokeLinecap="round" fill="none"/>
              {/* Hand on face (stressed pose) */}
              <ellipse cx="220" cy="184" rx="14" ry="12" fill="#f4c4a0"/>
              {/* Stress lines */}
              <path d="M250 160 Q256 154 254 148" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M256 168 Q264 164 264 157" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M252 176 Q260 174 262 168" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

              {/* Background colleagues */}
              {/* Person far left */}
              <circle cx="68" cy="196" r="14" fill="#e8b090"/>
              <rect x="54" y="208" width="28" height="30" rx="8" fill="#8b6a9a"/>
              {/* Person far right */}
              <circle cx="374" cy="200" r="13" fill="#f0c8a8"/>
              <rect x="362" y="212" width="24" height="28" rx="7" fill="#9a7a5a"/>
              {/* Laptop far right */}
              <rect x="344" y="226" width="50" height="30" rx="4" fill="#3a3a4a" opacity="0.6"/>

              {/* Thought bubbles — doctors top right */}
              {/* Bubble 1 */}
              <circle cx="320" cy="60" r="34" fill="white" stroke="#b2dede" strokeWidth="2"/>
              <circle cx="290" cy="92" r="8" fill="white" stroke="#b2dede" strokeWidth="1.5"/>
              <circle cx="274" cy="108" r="4" fill="white" stroke="#b2dede" strokeWidth="1.5"/>
              {/* Doctor face 1 */}
              <circle cx="320" cy="52" r="14" fill="#f4d4b4"/>
              <rect x="308" y="64" width="24" height="22" rx="7" fill="#ffffff" stroke="#0c8c8c" strokeWidth="1.5"/>
              <path d="M316 72 Q320 76 324 72" stroke="#0c8c8c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              {/* Stethoscope */}
              <path d="M317 80 Q320 86 323 80" stroke="#0c8c8c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

              {/* Bubble 2 */}
              <circle cx="390" cy="50" r="28" fill="white" stroke="#b2dede" strokeWidth="2"/>
              <circle cx="365" cy="76" r="7" fill="white" stroke="#b2dede" strokeWidth="1.5"/>
              <circle cx="352" cy="90" r="4" fill="white" stroke="#b2dede" strokeWidth="1.5"/>
              {/* Doctor face 2 */}
              <circle cx="390" cy="43" r="13" fill="#c8a870"/>
              <rect x="379" y="54" width="22" height="18" rx="6" fill="#2a5a8a"/>
              {/* Glasses */}
              <circle cx="386" cy="38" r="4" fill="none" stroke="#ffffff" strokeWidth="1"/>
              <circle cx="394" cy="38" r="4" fill="none" stroke="#ffffff" strokeWidth="1"/>
              <line x1="390" y1="38" x2="390" y2="38" stroke="#ffffff" strokeWidth="1"/>

              {/* Connecting dots between person and bubbles */}
              <circle cx="250" cy="130" r="3" fill="#b2dede"/>
              <circle cx="268" cy="114" r="3" fill="#b2dede"/>
              <circle cx="284" cy="100" r="3" fill="#b2dede"/>

              {/* Emoneeds branding hint */}
              <text x="220" y="318" textAnchor="middle" fontSize="11" fill="#0c8c8c"
                fontFamily="Arial, sans-serif" fontWeight="600" opacity="0.6">
                emoneeds — integrated mental health
              </text>
            </svg>
          </div>
        </section>

        {/* ══ SECTION 2: WHAT WE OFFER ══ */}
        <section className="w-full max-w-2xl flex flex-col items-center gap-6 sm:gap-8 mt-10 sm:mt-14 animate-fade-in">

          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What We Offer
            </h2>
            <p className="text-base sm:text-lg italic text-muted-foreground font-secondary">
              "Good care is not one conversation. It's a system."
            </p>
          </div>

          {/* Service list */}
          <div className="w-full flex flex-col gap-4 sm:gap-5">
            {SERVICES.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 sm:gap-7 bg-card rounded-2xl border border-border/50 shadow-card px-4 sm:px-6 py-4 sm:py-5 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Illustration */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden">
                  {item.illustration}
                </div>
                {/* Text */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 3: STATS BAR ══ */}
        <section className="w-full max-w-2xl mt-10 sm:mt-14 animate-fade-in">
          <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 bg-card rounded-2xl border border-border/50 shadow-card px-4 sm:px-8 py-5 sm:py-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-1.5 ${
                  i === 0 ? "sm:items-start" : i === 2 ? "sm:items-end" : "sm:items-center"
                }`}
              >
                <div className="p-2 rounded-full bg-primary-light">
                  {stat.icon}
                </div>
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground leading-none">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ TAKE AGAIN BUTTON ══ */}
        <div className="w-full max-w-2xl mt-8 sm:mt-10 mb-4 flex justify-center animate-fade-in">
          <Button
            variant="outline"
            size="lg"
            onClick={onRestart}
            className="w-full sm:w-auto px-10 sm:px-14 h-14 sm:h-16 text-base sm:text-lg font-bold rounded-2xl border-2 gap-3"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            Take Again
          </Button>
        </div>

      </div>
    </div>
  );
};

export default WhoWeAreScreen;
