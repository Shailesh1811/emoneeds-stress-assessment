import React from "react";

/* ── Palette ─────────────────────────────── */
const TEAL        = "#0c8c8c";
const TEAL_LIGHT  = "#e6f6f6";
const TEAL_MID    = "#9dd0d0";
const NAVY        = "#001f2e";
const ORANGE      = "#f59e0b";
const GRAY        = "#4b5563";
const GRAY_LIGHT  = "#f3f4f6";
const WHITE       = "#ffffff";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Montserrat', Arial, sans-serif";

/* ── Stress config ───────────────────────── */
const STRESS = {
  low: {
    color:     "#10b981",
    badgeBg:   "#d1fae5",
    badgeBd:   "#6ee7b7",
    badgeTx:   "#065f46",
    label:     "LOW STRESS",
    headline:  "Your stress level is well managed. Great work!",
    subline:   "Continue maintaining healthy habits to sustain your performance and well-being.",
  },
  moderate: {
    color:     ORANGE,
    badgeBg:   "#ffedd5",
    badgeBd:   ORANGE,
    badgeTx:   "#92400e",
    label:     "MODERATE STRESS",
    headline:  "Your stress level is manageable but needs attention.",
    subline:   "Addressing these areas now can help you prevent future burnout and improve overall well-being.",
  },
  high: {
    color:     "#ef4444",
    badgeBg:   "#fee2e2",
    badgeBd:   "#fca5a5",
    badgeTx:   "#991b1b",
    label:     "HIGH STRESS",
    headline:  "Your stress level is high and needs immediate attention.",
    subline:   "Please take steps to address your stress and consider seeking professional support.",
  },
};

/* ── Card icons (inline SVG) ─────────────── */
const CardIcons = [
  /* Brain */
  <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.98 2.98 0 0 1-.7-5.45A2.5 2.5 0 0 1 7.5 9 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.98 2.98 0 0 0 .7-5.45A2.5 2.5 0 0 0 16.5 9 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>,
  /* Target */
  <svg key="t" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke={TEAL} strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
  </svg>,
  /* Gear */
  <svg key="g" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>,
];

/* ── Watermark ───────────────────────────── */
const WatermarkSVG = () => (
  <div style={{
    position: "absolute", top: "-20px", right: "-30px",
    width: "400px", height: "400px",
    opacity: 0.08, pointerEvents: "none", zIndex: 0,
  }}>
    <svg viewBox="0 0 200 200" fill={TEAL}>
      <path d="M160,100 C160,150 130,180 80,180 C50,180 20,160 15,120 C10,80 40,30 90,15 C140,0 160,50 160,100 Z" opacity="0.5"/>
      <path d="M110,50 C130,30 160,40 160,70 C160,100 130,120 110,110 C90,120 60,100 60,70 C60,40 90,30 110,50 Z" fill="white"/>
    </svg>
  </div>
);

/* ── Shield badge icon ───────────────────── */
const ShieldSVG = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="3"
    style={{ marginRight: "6px", verticalAlign: "middle", display: "inline-block" }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Helpers ─────────────────────────────── */
function getLevel(s) { return s <= 13 ? "low" : s <= 26 ? "moderate" : "high"; }

function parseFact(fact) {
  const idx = fact.indexOf(":");
  if (idx > 0 && idx < 55) {
    return { category: fact.slice(0, idx).trim(), detail: fact.slice(idx + 1).trim() };
  }
  const words = fact.split(" ");
  return { category: words.slice(0, 3).join(" "), detail: fact };
}

/* ════════════════════════════════════════════════════════
   Component
═══════════════════════════════════════════════════════ */
const PdfReport = React.forwardRef(({ name, score, aiFacts }, ref) => {
  const level  = getLevel(score);
  const sm     = STRESS[level];
  const max    = 40;
  const pct    = (score / max) * 100;

  /* SVG gauge */
  const R    = 44;
  const circ = 2 * Math.PI * R;
  const offset = circ - (pct / 100) * circ;

  const facts = Array.isArray(aiFacts) ? aiFacts.slice(0, 3) : [];

  /* Pad to 3 placeholder cards if AI hasn't loaded yet */
  const cards = facts.length > 0 ? facts : [
    { category: "Analyzing…", detail: "Your AI insights are being generated." },
    { category: "Analyzing…", detail: "Psychometric patterns are being evaluated." },
    { category: "Analyzing…", detail: "Executive stress profile is being compiled." },
  ];

  return (
    <div style={{ width: "750px", margin: "0 auto", background: "#f3f4f6", padding: "40px 20px" }} ref={ref}>
      <div style={{
        background:   WHITE,
        borderRadius: "0px",
        padding:      "60px 50px",
        position:     "relative",
        overflow:     "hidden",
        boxShadow:    "0 4px 20px rgba(0,0,0,0.08)",
        fontFamily:   SANS,
      }}>
        <WatermarkSVG />

        {/* ══ HEADER ══ */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>

          {/* Logo */}
          <img src="/emoneeds-logo.png" alt="emoneeds"
            style={{ maxWidth: "160px", height: "auto", display: "block", margin: "0 auto 15px" }} />

          {/* Snapshot badge */}
          <div style={{
            display: "inline-flex", alignItems: "center",
            background: WHITE, border: `1px solid ${TEAL_MID}`,
            padding: "4px 12px", borderRadius: "20px", marginBottom: "30px",
          }}>
            <span style={{ fontSize: "10px", fontWeight: "800", color: TEAL, letterSpacing: "1.5px" }}>
              YOUR MENTAL WELLNESS SNAPSHOT +
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: SERIF, fontSize: "56px", color: NAVY,
            margin: "0 0 20px 0", fontWeight: "900", letterSpacing: "-1px",
          }}>
            Stress Assessment Report
          </h1>

          {/* Greeting */}
          <div style={{
            display: "inline-block", background: TEAL_LIGHT,
            padding: "8px 25px", borderRadius: "4px", marginBottom: "25px",
          }}>
            <span style={{ fontSize: "20px", fontWeight: "600", color: TEAL }}>
              Hello, {name}
            </span>
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: "16px", color: NAVY, lineHeight: "1.6",
            fontWeight: "500", marginBottom: "40px",
          }}>
            This is your stress assessment report<br />
            based on your response, powered by emoneeds.
          </p>
        </div>

        {/* ══ SCORE CARD ══ */}
        <div style={{
          background: TEAL_LIGHT, borderRadius: "30px",
          padding: "35px 40px", display: "flex", alignItems: "center",
          gap: "45px", marginBottom: "40px",
          position: "relative", zIndex: 1,
          border: "1px solid rgba(12,140,140,0.1)",
        }}>

          {/* Gauge */}
          <div style={{ position: "relative", width: "140px", height: "140px", flexShrink: 0 }}>
            <svg width="140" height="140" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={R} fill="none" stroke="#d1e5e5" strokeWidth="9"/>
              <circle cx="50" cy="50" r={R} fill="none"
                stroke={sm.color} strokeWidth="9"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 50 50)"/>
            </svg>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", textAlign: "center",
            }}>
              <div style={{ fontSize: "42px", fontWeight: "800", color: sm.color, lineHeight: "1" }}>
                {score}
              </div>
              <div style={{ fontSize: "13px", color: GRAY, fontWeight: "600" }}>
                out of {max}
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: "inline-block",
              background: sm.badgeBg, border: `1px solid ${sm.badgeBd}`,
              padding: "6px 14px", borderRadius: "6px", marginBottom: "15px",
            }}>
              <ShieldSVG color={sm.badgeTx} />
              <span style={{
                fontSize: "12px", fontWeight: "900",
                color: sm.badgeTx, letterSpacing: "0.5px",
                verticalAlign: "middle",
              }}>
                {sm.label}
              </span>
            </div>
            <h3 style={{ fontSize: "22px", color: TEAL, margin: "0 0 8px 0", fontWeight: "700" }}>
              {sm.headline}
            </h3>
            <p style={{ fontSize: "14px", color: GRAY, margin: 0, lineHeight: "1.6", fontWeight: "500" }}>
              {sm.subline}
            </p>
          </div>
        </div>

        {/* ══ AI INSIGHTS ══ */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: NAVY, marginBottom: "8px", letterSpacing: "0.5px" }}>
            AI – INSIGHTS
          </h2>
          <p style={{ fontSize: "13px", color: GRAY, marginBottom: "30px", fontWeight: "500" }}>
            Our AI has analyzed your responses and identified key stress patterns.
          </p>

          <div style={{ display: "flex", gap: "20px" }}>
            {cards.map((item, i) => {
              const { category, detail } = facts.length > 0 ? parseFact(facts[i]) : item;
              return (
                <div key={i} style={{
                  flex: 1, border: `1.2px solid ${TEAL_MID}`,
                  borderRadius: "24px", padding: "30px 20px", textAlign: "center",
                }}>
                  <div style={{
                    width: "55px", height: "55px", background: TEAL_LIGHT,
                    borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", margin: "0 auto 20px",
                  }}>
                    {CardIcons[i]}
                  </div>
                  <h4 style={{ fontSize: "14px", fontWeight: "800", color: TEAL, marginBottom: "12px", lineHeight: "1.3" }}>
                    {category}
                  </h4>
                  <p style={{ fontSize: "12px", color: GRAY, lineHeight: "1.6", margin: 0 }}>
                    {detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ FOOTER CTA ══ */}
        <div style={{ marginTop: "50px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ background: GRAY_LIGHT, padding: "18px", borderRadius: "50px", marginBottom: "30px" }}>
            <span style={{ fontSize: "13px", fontWeight: "800", color: NAVY, letterSpacing: "0.5px" }}>
              WE RECOMMEND YOU TO VISIT EMONEEDS TO KNOW MORE ABOUT IT.
            </span>
          </div>
          <p style={{
            fontSize: "10px", color: "#94a3b8",
            textTransform: "uppercase", letterSpacing: "0.8px",
            maxWidth: "90%", margin: "0 auto", lineHeight: "1.6",
          }}>
            Disclaimer: Powered by emoneeds. This automated brief reflects self-reported data
            intended for performance benchmarking, not clinical diagnosis.
          </p>
        </div>

      </div>
    </div>
  );
});

export default PdfReport;
