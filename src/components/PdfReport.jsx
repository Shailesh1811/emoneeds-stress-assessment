import React from "react";

const TEAL = "#1a7a6e";
const TEAL_LIGHT = "#e6f7f5";
const TEAL_MID = "#b2e4de";

const stressColorMap = {
  low: "#10b981",
  moderate: "#f59e0b",
  high: "#ef4444",
};

const stressBgMap = {
  low: "#d1fae5",
  moderate: "#fef3c7",
  high: "#fee2e2",
};

const stressBorderMap = {
  low: "#6ee7b7",
  moderate: "#fcd34d",
  high: "#fca5a5",
};

const stressTextMap = {
  low: "#065f46",
  moderate: "#92400e",
  high: "#991b1b",
};

const stressLabelMap = {
  low: "LOW STRESS",
  moderate: "MODERATE STRESS",
  high: "HIGH STRESS",
};

const stressHeadlineMap = {
  low: "Your stress level is well managed. Great work!",
  moderate: "Your stress level is manageable but needs attention.",
  high: "Your stress level is high and needs immediate attention.",
};

const stressSublineMap = {
  low: "Continue maintaining healthy habits to sustain your performance and well-being.",
  moderate: "Addressing these areas now can help you prevent future issues and improve overall well-being.",
  high: "Please take immediate steps to address your situation and seek professional support.",
};

// Card icons as inline SVG strings
const cardIcons = [
  // Brain
  `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.98 2.98 0 0 1-.7-5.45A2.5 2.5 0 0 1 7.5 9a2.5 2.5 0 0 1 2-4.5z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.98 2.98 0 0 0 .7-5.45A2.5 2.5 0 0 0 16.5 9a2.5 2.5 0 0 0-2-4.5z"/>
  </svg>`,
  // Target
  `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
  </svg>`,
  // Gear
  `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>`,
];

function parseFact(fact) {
  const colonIdx = fact.indexOf(":");
  if (colonIdx > 0 && colonIdx < 50) {
    return {
      category: fact.substring(0, colonIdx).trim(),
      detail: fact.substring(colonIdx + 1).trim(),
    };
  }
  // Fallback: first 3 words as category
  const words = fact.split(" ");
  return {
    category: words.slice(0, 3).join(" "),
    detail: fact,
  };
}

const PdfReport = React.forwardRef(({ name, score, aiFacts }, ref) => {
  const getLevel = (s) => (s <= 13 ? "low" : s <= 26 ? "moderate" : "high");
  const level = getLevel(score);
  const stressColor = stressColorMap[level];
  const maxScore = 40;
  const pct = Math.round((score / maxScore) * 100);

  // SVG circle math
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const displayFacts = Array.isArray(aiFacts) ? aiFacts.slice(0, 3) : [];

  return (
    <div
      ref={ref}
      style={{
        width: "800px",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px 50px 0",
          position: "relative",
        }}
      >
        {/* Decorative watermark circles (top-right) */}
        <div style={{
          position: "absolute", right: "30px", top: "-10px",
          width: "220px", height: "220px", borderRadius: "50%",
          border: `2px solid ${TEAL_MID}`, opacity: 0.35, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "70px", top: "30px",
          width: "140px", height: "140px", borderRadius: "50%",
          border: `2px solid ${TEAL_MID}`, opacity: 0.25, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "95px", top: "55px",
          width: "90px", height: "90px", borderRadius: "50%",
          border: `2px solid ${TEAL_MID}`, opacity: 0.2, pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <img src="/emoneeds-logo.png" alt="emoneeds" style={{ height: "44px", width: "auto" }} />
        </div>

        {/* Snapshot tag */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <span style={{
            fontSize: "10px", fontWeight: "700", letterSpacing: "3px",
            textTransform: "uppercase", color: TEAL,
          }}>
            YOUR MENTAL WELLNESS SNAPSHOT ✦
          </span>
        </div>

        {/* Main title */}
        <h1 style={{
          margin: "0 0 18px 0",
          fontSize: "46px",
          fontWeight: "900",
          color: "#111827",
          textAlign: "center",
          lineHeight: "1.1",
        }}>
          Stress Assessment Report
        </h1>

        {/* Hello pill */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <span style={{
            display: "inline-block",
            backgroundColor: TEAL_LIGHT,
            border: `2px solid ${TEAL_MID}`,
            borderRadius: "50px",
            padding: "7px 26px",
            fontSize: "17px",
            fontWeight: "700",
            color: "#0d5c52",
          }}>
            Hello, {name}
          </span>
        </div>

        {/* Subtitle */}
        <p style={{
          margin: "0 0 28px 0",
          fontSize: "15px",
          color: TEAL,
          textAlign: "center",
          lineHeight: "1.6",
          fontWeight: "500",
        }}>
          This is your stress assessment report<br />
          based on your response, powered by emoneeds.
        </p>
      </div>

      {/* ── SCORE SECTION ── */}
      <div style={{ padding: "0 50px" }}>
        <div style={{
          backgroundColor: TEAL_LIGHT,
          border: `1px solid ${TEAL_MID}`,
          borderRadius: "16px",
          padding: "28px 30px",
          display: "flex",
          alignItems: "center",
          gap: "28px",
          marginBottom: "32px",
        }}>
          {/* SVG Progress Circle */}
          <div style={{ flexShrink: 0 }}>
            <svg width="160" height="160" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={r} fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="70" cy="70" r={r}
                fill="none"
                stroke={stressColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${circ.toFixed(2)}`}
                strokeDashoffset={`${offset.toFixed(2)}`}
                transform="rotate(-90 70 70)"
              />
              <text x="70" y="62" textAnchor="middle" fontSize="34" fontWeight="800" fill={stressColor} fontFamily="Arial">{score}</text>
              <text x="70" y="82" textAnchor="middle" fontSize="13" fill="#6b7280" fontFamily="Arial">out of {maxScore}</text>
            </svg>
          </div>

          {/* Stress info */}
          <div style={{ flex: 1 }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: stressBgMap[level],
              border: `1px solid ${stressBorderMap[level]}`,
              borderRadius: "50px",
              padding: "5px 14px",
              marginBottom: "14px",
            }}>
              <span style={{ fontSize: "11px", fontWeight: "800", color: stressTextMap[level], letterSpacing: "1.5px" }}>
                {stressLabelMap[level]}
              </span>
            </div>

            <p style={{
              margin: "0 0 10px 0",
              fontSize: "19px",
              fontWeight: "800",
              color: "#111827",
              lineHeight: "1.3",
            }}>
              {stressHeadlineMap[level]}
            </p>
            <p style={{
              margin: "0",
              fontSize: "13px",
              color: "#6b7280",
              lineHeight: "1.6",
            }}>
              {stressSublineMap[level]}
            </p>
          </div>
        </div>
      </div>

      {/* ── AI INSIGHTS ── */}
      <div style={{ padding: "0 50px 32px" }}>
        <h2 style={{
          margin: "0 0 4px 0",
          fontSize: "22px",
          fontWeight: "900",
          color: "#111827",
          letterSpacing: "0.5px",
        }}>
          AI – INSIGHTS
        </h2>
        <p style={{
          margin: "0 0 20px 0",
          fontSize: "13px",
          color: TEAL,
          fontWeight: "500",
        }}>
          Our AI has analyzed your responses and identified key stress patterns.
        </p>

        {/* Cards row */}
        <div style={{ display: "flex", gap: "14px" }}>
          {displayFacts.length > 0 ? displayFacts.map((fact, i) => {
            const { category, detail } = parseFact(fact);
            return (
              <div key={i} style={{
                flex: 1,
                border: `1px solid ${TEAL_MID}`,
                borderRadius: "14px",
                padding: "20px 16px",
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(26,122,110,0.07)",
              }}>
                {/* Icon */}
                <div
                  style={{
                    width: "56px", height: "56px",
                    borderRadius: "50%",
                    backgroundColor: TEAL_LIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                  dangerouslySetInnerHTML={{ __html: cardIcons[i] }}
                />
                <p style={{
                  margin: "0 0 8px 0",
                  fontSize: "13px",
                  fontWeight: "800",
                  color: TEAL,
                  lineHeight: "1.3",
                }}>
                  {category}
                </p>
                <p style={{
                  margin: "0",
                  fontSize: "12px",
                  color: "#6b7280",
                  lineHeight: "1.6",
                }}>
                  {detail}
                </p>
              </div>
            );
          }) : (
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>No insights generated.</p>
          )}
        </div>
      </div>

      {/* ── CTA BAR ── */}
      <div style={{ padding: "0 50px 20px" }}>
        <div style={{
          backgroundColor: TEAL,
          borderRadius: "12px",
          padding: "18px 24px",
          textAlign: "center",
        }}>
          <p style={{
            margin: "0",
            fontSize: "14px",
            fontWeight: "800",
            color: "#ffffff",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}>
            We recommend you to visit Emoneeds to know more about it.
          </p>
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <div style={{ padding: "0 50px 30px" }}>
        <p style={{
          margin: "0",
          fontSize: "10px",
          color: "#9ca3af",
          textAlign: "center",
          fontStyle: "italic",
          lineHeight: "1.6",
          textTransform: "uppercase",
          letterSpacing: "0.3px",
        }}>
          Disclaimer: Powered by Emoneeds. This automated brief reflects self-reported data intended for performance benchmarking, not clinical diagnosis.
        </p>
      </div>
    </div>
  );
});

export default PdfReport;
