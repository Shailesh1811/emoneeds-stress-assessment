import React from "react";

/* ── Palette ─────────────────────────────────────────── */
const C = {
  teal:        "#0c8c8c",
  tealLight:   "#e6f6f6",
  tealMid:     "#b2dede",
  navy:        "#001f2e",
  orange:      "#f59e0b",
  yellowLight: "#fef3c7",
  yellowBorder:"#f59e0b",
  gray:        "#4b5563",
  grayLight:   "#f3f4f6",
  border:      "#e5e7eb",
  darkBorder:  "#333333",
  white:       "#ffffff",
};

const stressMap = {
  low: {
    color:  "#10b981",
    bg:     "#d1fae5",
    border: "#6ee7b7",
    text:   "#065f46",
    label:  "LOW STRESS",
    headline: "Your stress level is well managed. Great work!",
    subline:  "Continue maintaining healthy habits to sustain your performance and well-being.",
  },
  moderate: {
    color:  C.orange,
    bg:     C.yellowLight,
    border: C.yellowBorder,
    text:   "#92400e",
    label:  "MODERATE STRESS",
    headline: "Your stress level is manageable but needs attention.",
    subline:  "Addressing these areas now can help you prevent future burnout and improve overall well-being.",
  },
  high: {
    color:  "#ef4444",
    bg:     "#fee2e2",
    border: "#fca5a5",
    text:   "#991b1b",
    label:  "HIGH STRESS",
    headline: "Your stress level is high and needs immediate attention.",
    subline:  "Please take steps to address your stress and consider seeking professional support.",
  },
};

/* ── Inline SVG Icons ────────────────────────────────── */
const BrainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={C.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44
      2.98 2.98 0 0 1-.7-5.45A2.5 2.5 0 0 1 7.5 9 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44
      2.98 2.98 0 0 0 .7-5.45A2.5 2.5 0 0 0 16.5 9 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={C.teal} strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2"  y1="12" x2="6"  y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
  </svg>
);

const GearIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={C.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12
      M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

const ICONS = [<BrainIcon key="b"/>, <TargetIcon key="t"/>, <GearIcon key="g"/>];

/* ── Helpers ─────────────────────────────────────────── */
function getLevel(score) {
  return score <= 13 ? "low" : score <= 26 ? "moderate" : "high";
}

function parseFact(fact) {
  const idx = fact.indexOf(":");
  if (idx > 0 && idx < 50) {
    return { category: fact.slice(0, idx).trim(), detail: fact.slice(idx + 1).trim() };
  }
  const words = fact.split(" ");
  return { category: words.slice(0, 3).join(" "), detail: fact };
}

/* ── Shared style snippets ───────────────────────────── */
const FONT_SERIF = "'Playfair Display', Georgia, serif";
const FONT_SANS  = "'Montserrat', Arial, sans-serif";

/* ════════════════════════════════════════════════════════
   Component
═══════════════════════════════════════════════════════ */
const PdfReport = React.forwardRef(({ name, score, aiFacts }, ref) => {
  const level    = getLevel(score);
  const sm       = stressMap[level];
  const maxScore = 40;
  const pct      = Math.round((score / maxScore) * 100);

  /* SVG gauge math */
  const R    = 52;
  const circ = 2 * Math.PI * R;
  const fill = circ - (pct / 100) * circ;

  const facts = Array.isArray(aiFacts) ? aiFacts.slice(0, 3) : [];

  return (
    /* Outer page background */
    <div style={{
      width:      "800px",
      background: "#f0f4f8",
      padding:    "40px 30px",
      boxSizing:  "border-box",
      fontFamily: FONT_SANS,
    }} ref={ref}>

      {/* ── White card ── */}
      <div style={{
        background:   C.white,
        borderRadius: "16px",
        borderTop:    `6px solid ${C.darkBorder}`,
        boxShadow:    "0 4px 30px rgba(0,0,0,0.10)",
        padding:      "50px",
        boxSizing:    "border-box",
      }}>

        {/* ══ SECTION 1 – HEADER ══ */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>

          {/* Logo */}
          <img src="/emoneeds-logo.png" alt="emoneeds logo"
            style={{ maxWidth: "180px", margin: "0 auto 18px", display: "block" }} />

          {/* Badge pill */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
            <span style={{
              background:   C.tealLight,
              border:       `1px solid ${C.tealMid}`,
              borderRadius: "50px",
              padding:      "5px 18px",
              fontSize:     "10px",
              fontWeight:   "700",
              letterSpacing:"2px",
              textTransform:"uppercase",
              color:        C.teal,
              fontFamily:   FONT_SANS,
            }}>
              YOUR MENTAL WELLNESS SNAPSHOT +
            </span>
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily:  FONT_SERIF,
            fontSize:    "48px",
            fontWeight:  "800",
            color:       C.navy,
            margin:      "0 0 18px 0",
            lineHeight:  "1.1",
          }}>
            Stress Assessment Report
          </h1>

          {/* Greeting box */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
            <span style={{
              background:   C.tealLight,
              borderRadius: "8px",
              padding:      "8px 22px",
              fontSize:     "16px",
              fontWeight:   "600",
              color:        C.navy,
              fontFamily:   FONT_SANS,
            }}>
              Hello, {name}
            </span>
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: FONT_SANS,
            fontSize:   "14px",
            color:      C.navy,
            margin:     "0",
            lineHeight: "1.6",
          }}>
            This is your stress assessment report based on your response, powered by emoneeds.
          </p>
        </div>

        {/* ══ SECTION 2 – SCORE CARD ══ */}
        <div style={{
          background:   C.tealLight,
          borderRadius: "20px",
          padding:      "28px 32px",
          display:      "flex",
          alignItems:   "center",
          gap:          "32px",
          marginBottom: "36px",
        }}>

          {/* Left – Gauge */}
          <div style={{ flexShrink: 0 }}>
            <svg width="160" height="160" viewBox="0 0 130 130">
              {/* Track */}
              <circle cx="65" cy="65" r={R} fill="none" stroke="#dde9e9" strokeWidth="13"/>
              {/* Progress arc */}
              <circle cx="65" cy="65" r={R} fill="none"
                stroke={sm.color}
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray={circ.toFixed(2)}
                strokeDashoffset={fill.toFixed(2)}
                transform="rotate(-90 65 65)"
              />
              {/* Inner white circle */}
              <circle cx="65" cy="65" r="38" fill={C.white}/>
              {/* Score number */}
              <text x="65" y="58" textAnchor="middle" fontSize="28" fontWeight="800"
                fill={sm.color} fontFamily="Arial">{score}</text>
              {/* "out of 40" */}
              <text x="65" y="76" textAnchor="middle" fontSize="11"
                fill={C.gray} fontFamily="Arial">out of {maxScore}</text>
            </svg>
          </div>

          {/* Right – Status */}
          <div style={{ flex: 1 }}>
            {/* Level badge */}
            <div style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "6px",
              background:   sm.bg,
              border:       `1px solid ${sm.border}`,
              borderRadius: "50px",
              padding:      "5px 14px",
              marginBottom: "14px",
            }}>
              {/* Shield icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke={sm.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
              <span style={{
                fontSize:      "10px",
                fontWeight:    "800",
                letterSpacing: "1.5px",
                color:         sm.text,
                fontFamily:    FONT_SANS,
              }}>
                {sm.label}
              </span>
            </div>

            <p style={{
              fontFamily: FONT_SANS,
              fontSize:   "18px",
              fontWeight: "700",
              color:      C.teal,
              margin:     "0 0 10px 0",
              lineHeight: "1.35",
            }}>
              {sm.headline}
            </p>
            <p style={{
              fontFamily: FONT_SANS,
              fontSize:   "13px",
              color:      C.gray,
              margin:     "0",
              lineHeight: "1.65",
            }}>
              {sm.subline}
            </p>
          </div>
        </div>

        {/* ══ SECTION 3 – AI INSIGHTS ══ */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontFamily:  FONT_SANS,
            fontSize:    "20px",
            fontWeight:  "800",
            color:       C.navy,
            margin:      "0 0 4px 0",
            letterSpacing:"0.5px",
          }}>
            AI – INSIGHTS
          </h2>
          <p style={{
            fontFamily: FONT_SANS,
            fontSize:   "13px",
            color:      C.gray,
            margin:     "0 0 20px 0",
          }}>
            Our AI has analyzed your responses and identified key stress patterns.
          </p>

          {/* Cards row */}
          <div style={{ display: "flex", gap: "14px" }}>
            {facts.length > 0
              ? facts.map((fact, i) => {
                  const { category, detail } = parseFact(fact);
                  return (
                    <div key={i} style={{
                      flex:         "1 1 0",
                      background:   C.white,
                      border:       `1px solid ${C.darkBorder}`,
                      borderRadius: "16px",
                      padding:      "22px 16px 20px",
                      textAlign:    "center",
                      boxSizing:    "border-box",
                    }}>
                      {/* Icon circle */}
                      <div style={{
                        width:          "54px",
                        height:         "54px",
                        borderRadius:   "50%",
                        background:     C.tealLight,
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        margin:         "0 auto 14px",
                      }}>
                        {ICONS[i]}
                      </div>
                      {/* Category */}
                      <p style={{
                        fontFamily: FONT_SANS,
                        fontSize:   "12px",
                        fontWeight: "800",
                        color:      C.teal,
                        margin:     "0 0 8px 0",
                        lineHeight: "1.3",
                      }}>
                        {category}
                      </p>
                      {/* Detail */}
                      <p style={{
                        fontFamily: FONT_SANS,
                        fontSize:   "11px",
                        color:      C.gray,
                        margin:     "0",
                        lineHeight: "1.6",
                      }}>
                        {detail}
                      </p>
                    </div>
                  );
                })
              : (
                <p style={{ fontFamily: FONT_SANS, fontSize: "13px", color: C.gray }}>
                  No insights generated.
                </p>
              )
            }
          </div>
        </div>

        {/* ══ SECTION 4 – FOOTER ══ */}

        {/* CTA Banner */}
        <div style={{
          background:   C.grayLight,
          borderRadius: "50px",
          padding:      "16px 30px",
          textAlign:    "center",
          marginBottom: "20px",
        }}>
          <p style={{
            fontFamily:    FONT_SANS,
            fontSize:      "11px",
            fontWeight:    "800",
            color:         C.navy,
            margin:        "0",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}>
            We recommend you to visit Emoneeds to know more about it.
          </p>
        </div>

        {/* Disclaimer */}
        <p style={{
          fontFamily:    FONT_SANS,
          fontSize:      "9px",
          color:         "#9ca3af",
          textAlign:     "center",
          margin:        "0",
          lineHeight:    "1.6",
          letterSpacing: "0.3px",
          textTransform: "uppercase",
        }}>
          Disclaimer: Powered by Emoneeds. This automated brief reflects self-reported data
          intended for performance benchmarking, not clinical diagnosis.
        </p>

      </div>
    </div>
  );
});

export default PdfReport;
