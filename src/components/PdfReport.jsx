import React from "react";

/* ── Palette ─────────────────────────────── */
const TEAL        = "#0c8c8c";
const TEAL_LIGHT  = "#e6f6f6";
const TEAL_MID    = "#9dd0d0";
const NAVY        = "#001f2e";
const ORANGE      = "#f59e0b";
const YELLOW_LIGHT= "#fef3c7";
const GRAY        = "#4b5563";
const GRAY_LIGHT  = "#f3f4f6";
const WHITE       = "#ffffff";

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS  = "'Montserrat', Arial, Helvetica, sans-serif";

/* ── Stress config ───────────────────────── */
const STRESS = {
  low: {
    color:   "#10b981",
    badgeBg: "#d1fae5",
    badgeBd: "#6ee7b7",
    badgeTx: "#065f46",
    label:   "LOW STRESS",
    headline:"Your stress level is well managed. Great work!",
    subline: "Continue maintaining healthy habits to sustain your performance and well-being.",
  },
  moderate: {
    color:   ORANGE,
    badgeBg: YELLOW_LIGHT,
    badgeBd: ORANGE,
    badgeTx: "#92400e",
    label:   "MODERATE STRESS",
    headline:"Your stress level is manageable but needs attention.",
    subline: "Addressing these areas now can help you prevent future burnout and improve overall well-being.",
  },
  high: {
    color:   "#ef4444",
    badgeBg: "#fee2e2",
    badgeBd: "#fca5a5",
    badgeTx: "#991b1b",
    label:   "HIGH STRESS",
    headline:"Your stress level is high and needs immediate attention.",
    subline: "Please take steps to address your stress and consider seeking professional support.",
  },
};

/* ── Icons ───────────────────────────────── */
const BrainSVG = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.98 2.98 0 0 1-.7-5.45A2.5 2.5 0 0 1 7.5 9 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.98 2.98 0 0 0 .7-5.45A2.5 2.5 0 0 0 16.5 9 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);

const TargetSVG = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke={TEAL} strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2"  y1="12" x2="6"  y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
  </svg>
);

const GearSVG = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

const ShieldSVG = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const CARD_ICONS = [<BrainSVG key="b"/>, <TargetSVG key="t"/>, <GearSVG key="g"/>];

/* ── Watermark Brain SVG (top-right decoration) ── */
const WatermarkSVG = () => (
  <svg width="170" height="170" viewBox="0 0 200 200" fill="none"
    style={{ position:"absolute", top:"-10px", right:"-10px", opacity:0.12, pointerEvents:"none" }}>
    {/* Concentric circles */}
    <circle cx="150" cy="50" r="80" stroke={TEAL} strokeWidth="1.5"/>
    <circle cx="150" cy="50" r="60" stroke={TEAL} strokeWidth="1.5"/>
    <circle cx="150" cy="50" r="40" stroke={TEAL} strokeWidth="1.5"/>
    {/* Rough brain outline using paths */}
    <path d="M120 70 C100 60 95 40 110 32 C120 26 132 32 135 42
             C140 30 155 26 165 34 C175 42 172 58 162 64
             C175 68 180 80 172 90 C165 98 152 96 145 88
             C140 98 128 102 118 94 C108 86 110 76 120 70Z"
      stroke={TEAL} strokeWidth="1.5" fill="none"/>
    <line x1="135" y1="42" x2="135" y2="88" stroke={TEAL} strokeWidth="1"/>
    <path d="M118 80 Q127 78 135 82 Q143 78 152 80" stroke={TEAL} strokeWidth="1"/>
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

/* ══════════════════════════════════════════
   Component
══════════════════════════════════════════ */
const PdfReport = React.forwardRef(({ name, score, aiFacts }, ref) => {
  const level  = getLevel(score);
  const sm     = STRESS[level];
  const max    = 40;
  const pct    = Math.round((score / max) * 100);

  /* SVG gauge */
  const R    = 50;
  const circ = 2 * Math.PI * R;
  const gap  = circ - (pct / 100) * circ;

  const facts = Array.isArray(aiFacts) ? aiFacts.slice(0, 3) : [];

  return (
    /* Outer page wrapper */
    <div style={{ width:"800px", background:"#f0f4f8", padding:"36px 28px", boxSizing:"border-box", fontFamily:SANS }} ref={ref}>

      {/* ─── WHITE CARD ─── */}
      <div style={{
        background:   WHITE,
        borderRadius: "16px",
        borderTop:    "6px solid #222222",
        boxShadow:    "0 4px 28px rgba(0,0,0,0.10)",
        padding:      "44px 50px 40px",
        boxSizing:    "border-box",
        position:     "relative",
        overflow:     "hidden",
      }}>

        {/* Watermark top-right */}
        <WatermarkSVG />

        {/* ══ HEADER ══ */}
        <div style={{ textAlign:"center", marginBottom:"28px" }}>

          {/* Logo */}
          <img src="/emoneeds-logo.png" alt="emoneeds logo"
            style={{ maxWidth:"160px", margin:"0 auto 14px", display:"block" }} />

          {/* Snapshot badge */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"16px" }}>
            <div style={{
              background: TEAL_LIGHT, border:`1px solid ${TEAL_MID}`,
              borderRadius:"50px", padding:"5px 16px",
            }}>
              <span style={{
                fontFamily:SANS, fontSize:"10px", fontWeight:"700",
                letterSpacing:"2px", textTransform:"uppercase", color:TEAL,
              }}>
                YOUR MENTAL WELLNESS SNAPSHOT +
              </span>
            </div>
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily:SERIF, fontSize:"46px", fontWeight:"800",
            color:NAVY, margin:"0 0 16px 0", lineHeight:"1.1",
          }}>
            Stress Assessment Report
          </h1>

          {/* Greeting pill */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"12px" }}>
            <div style={{
              background: TEAL_LIGHT, border:`1px solid ${TEAL_MID}`,
              borderRadius:"8px", padding:"7px 24px",
            }}>
              <span style={{
                fontFamily:SANS, fontSize:"15px", fontWeight:"600", color:NAVY,
              }}>
                Hello, {name}
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily:SANS, fontSize:"13px", color:TEAL,
            margin:"0", lineHeight:"1.65", fontWeight:"500",
          }}>
            This is your stress assessment report<br/>
            based on your response, powered by emoneeds.
          </p>
        </div>

        {/* ══ SCORE CARD ══ */}
        <div style={{
          background:   TEAL_LIGHT,
          border:       `1px solid ${TEAL_MID}`,
          borderRadius: "20px",
          padding:      "26px 30px",
          display:      "flex",
          alignItems:   "center",
          gap:          "30px",
          marginBottom: "32px",
        }}>

          {/* Gauge circle */}
          <div style={{ flexShrink:0 }}>
            <svg width="150" height="150" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={R} fill="none" stroke="#ddeaea" strokeWidth="12"/>
              <circle cx="60" cy="60" r={R} fill="none"
                stroke={sm.color} strokeWidth="12" strokeLinecap="round"
                strokeDasharray={circ.toFixed(2)} strokeDashoffset={gap.toFixed(2)}
                transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="34" fill={WHITE}/>
              <text x="60" y="54" textAnchor="middle" fontSize="24" fontWeight="800"
                fill={sm.color} fontFamily="Arial, sans-serif">{score}</text>
              <text x="60" y="70" textAnchor="middle" fontSize="10"
                fill={GRAY} fontFamily="Arial, sans-serif">out of {max}</text>
            </svg>
          </div>

          {/* Right side */}
          <div style={{ flex:1 }}>

            {/* ── STRESS BADGE ──
                NOTE: no flex/gap here to avoid html2canvas text-clipping.
                Using inline-block + margin instead.               */}
            <div style={{
              display:      "inline-block",
              background:   sm.badgeBg,
              border:       `1.5px solid ${sm.badgeBd}`,
              borderRadius: "50px",
              padding:      "6px 16px",
              marginBottom: "14px",
              whiteSpace:   "nowrap",
            }}>
              <span style={{
                display:       "inline-block",
                verticalAlign: "middle",
                marginRight:   "6px",
              }}>
                <ShieldSVG color={sm.badgeTx} />
              </span>
              <span style={{
                display:       "inline-block",
                verticalAlign: "middle",
                fontFamily:    "Arial, Helvetica, sans-serif",
                fontSize:      "11px",
                fontWeight:    "900",
                letterSpacing: "1.2px",
                color:         sm.badgeTx,
              }}>
                {sm.label}
              </span>
            </div>

            <p style={{
              fontFamily:SANS, fontSize:"17px", fontWeight:"700",
              color:TEAL, margin:"0 0 8px 0", lineHeight:"1.4",
            }}>
              {sm.headline}
            </p>
            <p style={{
              fontFamily:SANS, fontSize:"12px", color:GRAY,
              margin:"0", lineHeight:"1.65",
            }}>
              {sm.subline}
            </p>
          </div>
        </div>

        {/* ══ AI INSIGHTS ══ */}
        <div style={{ marginBottom:"28px" }}>
          <h2 style={{
            fontFamily:SANS, fontSize:"20px", fontWeight:"800",
            color:NAVY, margin:"0 0 4px 0", letterSpacing:"0.3px",
          }}>
            AI – INSIGHTS
          </h2>
          <p style={{
            fontFamily:SANS, fontSize:"12px", color:GRAY,
            margin:"0 0 18px 0",
          }}>
            Our AI has analyzed your responses and identified key stress patterns.
          </p>

          {/* 3 Cards */}
          <div style={{ display:"flex", gap:"14px" }}>
            {facts.length > 0
              ? facts.map((fact, i) => {
                  const { category, detail } = parseFact(fact);
                  return (
                    <div key={i} style={{
                      flex:         "1 1 0",
                      background:   WHITE,
                      border:       `1.5px solid ${TEAL_MID}`,
                      borderRadius: "16px",
                      padding:      "20px 14px 18px",
                      textAlign:    "center",
                      boxSizing:    "border-box",
                    }}>
                      {/* Icon circle */}
                      <div style={{
                        width:"52px", height:"52px", borderRadius:"50%",
                        background:TEAL_LIGHT,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        margin:"0 auto 12px",
                      }}>
                        {CARD_ICONS[i]}
                      </div>
                      {/* Category */}
                      <p style={{
                        fontFamily:SANS, fontSize:"12px", fontWeight:"800",
                        color:TEAL, margin:"0 0 7px 0", lineHeight:"1.3",
                      }}>
                        {category}
                      </p>
                      {/* Detail */}
                      <p style={{
                        fontFamily:SANS, fontSize:"11px", color:GRAY,
                        margin:"0", lineHeight:"1.65",
                      }}>
                        {detail}
                      </p>
                    </div>
                  );
                })
              : <p style={{ fontFamily:SANS, fontSize:"12px", color:GRAY }}>No insights generated.</p>
            }
          </div>
        </div>

        {/* ══ CTA BANNER ══ */}
        <div style={{
          background:   GRAY_LIGHT,
          borderRadius: "50px",
          padding:      "15px 28px",
          textAlign:    "center",
          marginBottom: "18px",
        }}>
          {/* Plain text — no font-family fallback issues */}
          <span style={{
            fontFamily:    "Arial, Helvetica, sans-serif",
            fontSize:      "11px",
            fontWeight:    "800",
            color:         NAVY,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}>
            WE RECOMMEND YOU TO VISIT EMONEEDS TO KNOW MORE ABOUT IT.
          </span>
        </div>

        {/* ══ DISCLAIMER ══ */}
        <p style={{
          fontFamily:    "Arial, Helvetica, sans-serif",
          fontSize:      "8.5px",
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
