import { Resend } from "resend";

/* ─────────────────────────────────────────────────────────
   Palette — mirrors PdfReport.jsx exactly
───────────────────────────────────────────────────────── */
const TEAL       = "#0c8c8c";
const TEAL_LIGHT = "#e6f6f6";
const TEAL_MID   = "#9dd0d0";
const NAVY       = "#001f2e";
const GRAY       = "#4b5563";
const GRAY_LIGHT = "#f3f4f6";

/* ─────────────────────────────────────────────────────────
   Stress config — mirrors PdfReport.jsx exactly
───────────────────────────────────────────────────────── */
const STRESS = {
  low: {
    color:   "#10b981",
    badgeBg: "#d1fae5",
    badgeBd: "#6ee7b7",
    badgeTx: "#065f46",
    label:   "LOW STRESS",
    headline: "Your stress level is well managed. Great work!",
    subline:  "Continue maintaining healthy habits to sustain your performance and well-being.",
  },
  moderate: {
    color:   "#f59e0b",
    badgeBg: "#ffedd5",
    badgeBd: "#f59e0b",
    badgeTx: "#92400e",
    label:   "MODERATE STRESS",
    headline: "Your stress level is manageable but needs attention.",
    subline:  "Addressing these areas now can help you prevent future burnout and improve overall well-being.",
  },
  high: {
    color:   "#ef4444",
    badgeBg: "#fee2e2",
    badgeBd: "#fca5a5",
    badgeTx: "#991b1b",
    label:   "HIGH STRESS",
    headline: "Your stress level is high and needs immediate attention.",
    subline:  "Please take steps to address your stress and consider seeking professional support.",
  },
};

/* ─────────────────────────────────────────────────────────
   Parse "Category: detail" format from AI facts
───────────────────────────────────────────────────────── */
function parseFact(fact) {
  const idx = fact.indexOf(":");
  if (idx > 0 && idx < 55) {
    return { category: fact.slice(0, idx).trim(), detail: fact.slice(idx + 1).trim() };
  }
  const words = fact.split(" ");
  return { category: words.slice(0, 3).join(" "), detail: fact };
}

/* ─────────────────────────────────────────────────────────
   Relationship config
───────────────────────────────────────────────────────── */
const ROSE       = "#e11d48";
const ROSE_LIGHT = "#fff1f2";
const ROSE_MID   = "#fda4af";

const RELATIONSHIP = {
  low: {
    color:    ROSE,
    badgeBg:  ROSE_LIGHT,
    badgeBd:  ROSE_MID,
    badgeTx:  "#9f1239",
    label:    "LOW SATISFACTION",
    headline: "Your relationship satisfaction is low and needs attention.",
    subline:  "Consider open communication with your partner and seeking relationship counseling.",
  },
  average: {
    color:    "#f59e0b",
    badgeBg:  "#ffedd5",
    badgeBd:  "#f59e0b",
    badgeTx:  "#92400e",
    label:    "AVERAGE SATISFACTION",
    headline: "Your relationship has a solid foundation with room to grow.",
    subline:  "Focusing on communication and shared experiences can strengthen your bond.",
  },
  high: {
    color:    "#10b981",
    badgeBg:  "#d1fae5",
    badgeBd:  "#6ee7b7",
    badgeTx:  "#065f46",
    label:    "HIGH SATISFACTION",
    headline: "Your relationship is thriving — keep nurturing it!",
    subline:  "Continue investing in open communication and shared experiences to sustain your connection.",
  },
};

/* ─────────────────────────────────────────────────────────
   Inline SVG icons (same as PdfReport.jsx)
───────────────────────────────────────────────────────── */
const ICON_BRAIN = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.98 2.98 0 0 1-.7-5.45A2.5 2.5 0 0 1 7.5 9 2.5 2.5 0 0 1 9.5 2z"/>
  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.98 2.98 0 0 0 .7-5.45A2.5 2.5 0 0 0 16.5 9 2.5 2.5 0 0 0 14.5 2z"/>
</svg>`;

const ICON_TARGET = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="1.6" stroke-linecap="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="6"/>
  <circle cx="12" cy="12" r="2"/>
  <line x1="12" y1="2" x2="12" y2="6"/>
  <line x1="12" y1="18" x2="12" y2="22"/>
  <line x1="2" y1="12" x2="6" y2="12"/>
  <line x1="18" y1="12" x2="22" y2="12"/>
</svg>`;

const ICON_GEAR = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
</svg>`;

const CARD_ICONS = [ICON_BRAIN, ICON_TARGET, ICON_GEAR];

/* Relationship card icons — rose colored */
const ICON_HEART = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${ROSE}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
</svg>`;

const ICON_CHAT = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${ROSE}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>`;

const ICON_STAR = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${ROSE}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>`;

const REL_CARD_ICONS = [ICON_HEART, ICON_CHAT, ICON_STAR];

/* ─────────────────────────────────────────────────────────
   buildHtml — identical layout to PdfReport.jsx
───────────────────────────────────────────────────────── */
function buildHtml({ name, score, stressLevel, aiFacts }) {
  const sm   = STRESS[stressLevel] || STRESS.moderate;
  const max  = 40;
  const pct  = (score / max) * 100;
  const facts = Array.isArray(aiFacts) && aiFacts.length > 0 ? aiFacts.slice(0, 3) : [];

  /* ── Logo absolute URL (email clients need full URL) ── */
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://emoneeds-stress-assessment.vercel.app";
  const logoUrl = `${baseUrl}/emoneeds-logo.png`;

  /* ── SVG gauge ring math (same as PdfReport: R=44, viewBox 0 0 100 100) ── */

  /* ── Watermark: head+leaf SVG as base64 data URI ── */
  const wmSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
    `<path d="M160,100 C160,150 130,180 80,180 C50,180 20,160 15,120 C10,80 40,30 90,15 C140,0 160,50 160,100 Z" fill="${TEAL}" opacity="0.5"/>` +
    `<path d="M110,50 C130,30 160,40 160,70 C160,100 130,120 110,110 C90,120 60,100 60,70 C60,40 90,30 110,50 Z" fill="white" opacity="0.5"/>` +
    `</svg>`;
  const wmB64 = Buffer.from(wmSvg).toString("base64");
  const wmUri = `data:image/svg+xml;base64,${wmB64}`;

  /* ── Parse AI insight cards ── */
  const cards = facts.length > 0
    ? facts.map(parseFact)
    : [
        { category: "Analyzing...", detail: "Your personalized insights are being prepared." },
        { category: "Analyzing...", detail: "Psychometric patterns are being evaluated." },
        { category: "Analyzing...", detail: "Executive stress profile is being compiled." },
      ];

  /* ── Shield icon for stress badge ── */
  const shieldSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" ` +
    `stroke="${sm.badgeTx}" stroke-width="3" ` +
    `style="vertical-align:middle;margin-right:5px;display:inline-block;">` +
    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` +
    `<path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`;

  /* ── 3 insight cards HTML ── */
  const cardsHtml = cards.map((card, i) => `
    <td width="33%" style="padding:0 8px;vertical-align:top;">
      <div style="border:1.2px solid ${TEAL_MID};border-radius:24px;
        padding:30px 16px 25px;text-align:center;box-sizing:border-box;background:#ffffff;">

        <!-- Icon circle -->
        <div style="width:55px;height:55px;background:${TEAL_LIGHT};border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 20px;flex-shrink:0;">
          ${CARD_ICONS[i]}
        </div>

        <!-- Category title -->
        <p style="margin:0 0 12px;font-family:'Montserrat',Arial,sans-serif;
          font-size:13px;font-weight:800;color:${TEAL};line-height:1.3;">
          ${card.category}
        </p>

        <!-- Detail text -->
        <p style="margin:0;font-family:'Montserrat',Arial,sans-serif;
          font-size:12px;color:${GRAY};line-height:1.6;">
          ${card.detail}
        </p>

      </div>
    </td>`).join("");

  /* ══════════════════════════════════════════════════════
     HTML EMAIL — exact visual match to PdfReport.jsx
  ══════════════════════════════════════════════════════ */
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <title>Your Stress Assessment Report</title>
</head>
<body style="margin:0;padding:0;background:${GRAY_LIGHT};font-family:'Montserrat',Arial,sans-serif;">

  <!-- ── PAGE WRAPPER ── -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%"
    style="background:${GRAY_LIGHT};padding:40px 20px;">
    <tr><td align="center">

      <!-- ════════════════════════════════════════════
           MAIN WHITE CARD  (750px, with watermark)
      ════════════════════════════════════════════ -->
      <table cellpadding="0" cellspacing="0" border="0" width="750"
        style="max-width:750px;width:100%;
          background-color:#ffffff;
          background-image:url('${wmUri}');
          background-repeat:no-repeat;
          background-position:right -30px top -20px;
          background-size:380px 380px;
          box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <tr>
          <td style="padding:60px 50px;box-sizing:border-box;">


            <!-- ══════════════════════════════════════
                 SECTION 1 — HEADER
            ══════════════════════════════════════ -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:40px;">
              <tr><td align="center">

                <!-- Logo -->
                <img src="${logoUrl}" alt="emoneeds" width="160"
                  style="max-width:160px;height:auto;display:block;margin:0 auto 15px;"/>

                <!-- Snapshot badge — white bg, teal border, pill -->
                <div style="display:inline-block;background:#ffffff;
                  border:1px solid ${TEAL_MID};border-radius:20px;
                  padding:4px 14px;margin-bottom:30px;">
                  <span style="font-family:'Montserrat',Arial,sans-serif;
                    font-size:10px;font-weight:800;color:${TEAL};
                    letter-spacing:1.5px;text-transform:uppercase;">
                    YOUR MENTAL WELLNESS SNAPSHOT +
                  </span>
                </div>

                <!-- Main title — Playfair Display, 56px, navy -->
                <h1 style="font-family:'Playfair Display',Georgia,'Times New Roman',serif;
                  font-size:56px;font-weight:900;color:${NAVY};
                  margin:0 0 20px;line-height:1.1;letter-spacing:-1px;">
                  Stress Assessment Report
                </h1>

                <!-- Greeting box — teal-light bg, teal text -->
                <div style="display:inline-block;background:${TEAL_LIGHT};
                  border-radius:4px;padding:8px 25px;margin-bottom:25px;">
                  <span style="font-family:'Montserrat',Arial,sans-serif;
                    font-size:20px;font-weight:600;color:${TEAL};">
                    Hello, ${name}
                  </span>
                </div>

                <!-- Subtitle — navy, 16px -->
                <p style="font-family:'Montserrat',Arial,sans-serif;font-size:16px;
                  color:${NAVY};line-height:1.6;font-weight:500;margin:0;">
                  This is your stress assessment report<br/>
                  based on your response, powered by emoneeds.
                </p>

              </td></tr>
            </table>


            <!-- ══════════════════════════════════════
                 SECTION 2 — SCORE CARD
                 (teal-light bg, border-radius 30px)
            ══════════════════════════════════════ -->
            <div style="background:${TEAL_LIGHT};border-radius:30px;
              padding:35px 40px;margin-bottom:40px;
              border:1px solid rgba(12,140,140,0.1);">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>

                  <!-- LEFT: gauge ring — no flex (Gmail strips it).
                       Outer div uses padding:19px so natural size = 19+122+19 = 160px
                       ring thickness exactly 19px. Inner white circle 122x122.
                       Spacer div pushes text to vertical center. -->
                  <td width="160" style="vertical-align:middle;padding-right:45px;text-align:center;">
                    <div style="display:inline-block;padding:19px;border-radius:80px;
                      background:conic-gradient(${sm.color} 0% ${pct}%, #d1e5e5 ${pct}% 100%);">
                      <!-- Inner white circle: 122x122 -->
                      <div style="width:122px;height:122px;border-radius:61px;
                        background:#ffffff;text-align:center;overflow:hidden;">
                        <!-- Spacer: (122 - 48score - 4gap - 16label) / 2 = 27px -->
                        <div style="height:27px;line-height:0;font-size:0;">&nbsp;</div>
                        <span style="display:block;font-size:48px;font-weight:800;
                          color:${sm.color};line-height:1;
                          font-family:Arial,sans-serif;">${score}</span>
                        <span style="display:block;font-size:13px;color:${GRAY};
                          font-weight:600;font-family:Arial,sans-serif;
                          margin-top:4px;">out of ${max}</span>
                      </div>
                    </div>
                  </td>

                  <!-- RIGHT: badge + headline + subline -->
                  <td style="vertical-align:top;padding-top:5px;">

                    <!-- Stress level badge (shield icon + label) -->
                    <div style="display:inline-block;
                      background:${sm.badgeBg};
                      border:1px solid ${sm.badgeBd};
                      border-radius:6px;padding:6px 14px;margin-bottom:15px;">
                      ${shieldSvg}
                      <span style="font-family:Arial,Helvetica,sans-serif;
                        font-size:12px;font-weight:900;color:${sm.badgeTx};
                        letter-spacing:0.5px;vertical-align:middle;">
                        ${sm.label}
                      </span>
                    </div>

                    <!-- Headline -->
                    <h3 style="font-family:'Montserrat',Arial,sans-serif;
                      font-size:22px;color:${TEAL};
                      margin:0 0 8px;font-weight:700;line-height:1.4;">
                      ${sm.headline}
                    </h3>

                    <!-- Subline -->
                    <p style="font-family:'Montserrat',Arial,sans-serif;
                      font-size:14px;color:${GRAY};
                      margin:0;line-height:1.6;font-weight:500;">
                      ${sm.subline}
                    </p>

                  </td>
                </tr>
              </table>
            </div>


            <!-- ══════════════════════════════════════
                 SECTION 3 — AI INSIGHTS
            ══════════════════════════════════════ -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:50px;">
              <tr><td>

                <!-- Section heading -->
                <h2 style="font-family:'Montserrat',Arial,sans-serif;
                  font-size:20px;font-weight:800;color:${NAVY};
                  margin:0 0 8px;letter-spacing:0.5px;">
                  AI &#8211; INSIGHTS
                </h2>
                <!-- Section subtext (teal) -->
                <p style="font-family:'Montserrat',Arial,sans-serif;
                  font-size:13px;color:${TEAL};
                  margin:0 0 30px;font-weight:500;">
                  Our AI has analyzed your responses and identified key stress patterns.
                </p>

                <!-- 3-column insight cards -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    ${cardsHtml}
                  </tr>
                </table>

              </td></tr>
            </table>


            <!-- ══════════════════════════════════════
                 SECTION 4 — CTA BANNER + DISCLAIMER
            ══════════════════════════════════════ -->

            <!-- Gray pill CTA -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:30px;">
              <tr>
                <td align="center"
                  style="background:${GRAY_LIGHT};border-radius:50px;padding:18px 30px;">
                  <span style="font-family:Arial,Helvetica,sans-serif;
                    font-size:13px;font-weight:800;color:${NAVY};
                    letter-spacing:0.5px;text-transform:uppercase;">
                    WE RECOMMEND YOU TO VISIT EMONEEDS TO KNOW MORE ABOUT IT.
                  </span>
                </td>
              </tr>
            </table>

            <!-- Visit Emoneeds Button -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:28px;">
              <tr>
                <td align="center">
                  <a href="https://emoneeds.com"
                    target="_blank"
                    style="display:inline-block;
                      background:${TEAL};
                      color:#ffffff;
                      text-decoration:none;
                      font-family:'Montserrat',Arial,sans-serif;
                      font-size:15px;
                      font-weight:700;
                      letter-spacing:0.5px;
                      padding:16px 48px;
                      border-radius:50px;
                      mso-padding-alt:0;
                      line-height:1;">
                    Visit Emoneeds &rarr;
                  </a>
                </td>
              </tr>
            </table>

            <!-- Disclaimer -->
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:10px;
              color:#94a3b8;text-align:center;margin:0 auto;line-height:1.6;
              text-transform:uppercase;letter-spacing:0.8px;max-width:90%;">
              Disclaimer: Powered by emoneeds. This automated brief reflects
              self-reported data intended for performance benchmarking,
              not clinical diagnosis.
            </p>


          </td>
        </tr>
      </table>
      <!-- ── end white card ── -->

    </td></tr>
  </table>

</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────
   buildRelationshipHtml — same layout as buildHtml but rose
───────────────────────────────────────────────────────── */
function buildRelationshipHtml({ name, score, relationshipLevel, aiFacts }) {
  const rm   = RELATIONSHIP[relationshipLevel] || RELATIONSHIP.average;
  const max  = 35;
  const pct  = (score / max) * 100;
  const facts = Array.isArray(aiFacts) && aiFacts.length > 0 ? aiFacts.slice(0, 3) : [];

  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://emoneeds-stress-assessment.vercel.app";
  const logoUrl = `${baseUrl}/emoneeds-logo.png`;

  const wmSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
    `<path d="M160,100 C160,150 130,180 80,180 C50,180 20,160 15,120 C10,80 40,30 90,15 C140,0 160,50 160,100 Z" fill="${ROSE}" opacity="0.5"/>` +
    `<path d="M110,50 C130,30 160,40 160,70 C160,100 130,120 110,110 C90,120 60,100 60,70 C60,40 90,30 110,50 Z" fill="white" opacity="0.5"/>` +
    `</svg>`;
  const wmB64 = Buffer.from(wmSvg).toString("base64");
  const wmUri = `data:image/svg+xml;base64,${wmB64}`;

  const cards = facts.length > 0
    ? facts.map(parseFact)
    : [
        { category: "Analyzing...", detail: "Your personalized relationship insights are being prepared." },
        { category: "Analyzing...", detail: "Relationship patterns are being evaluated." },
        { category: "Analyzing...", detail: "Your relationship profile is being compiled." },
      ];

  const shieldSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" ` +
    `stroke="${rm.badgeTx}" stroke-width="3" ` +
    `style="vertical-align:middle;margin-right:5px;display:inline-block;">` +
    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` +
    `<path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`;

  const cardsHtml = cards.map((card, i) => `
    <td width="33%" style="padding:0 8px;vertical-align:top;">
      <div style="border:1.2px solid ${ROSE_MID};border-radius:24px;
        padding:30px 16px 25px;text-align:center;box-sizing:border-box;background:#ffffff;">
        <div style="width:55px;height:55px;background:${ROSE_LIGHT};border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 20px;flex-shrink:0;">
          ${REL_CARD_ICONS[i]}
        </div>
        <p style="margin:0 0 12px;font-family:'Montserrat',Arial,sans-serif;
          font-size:13px;font-weight:800;color:${ROSE};line-height:1.3;">
          ${card.category}
        </p>
        <p style="margin:0;font-family:'Montserrat',Arial,sans-serif;
          font-size:12px;color:${GRAY};line-height:1.6;">
          ${card.detail}
        </p>
      </div>
    </td>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <title>Your Relationship Assessment Report</title>
</head>
<body style="margin:0;padding:0;background:${GRAY_LIGHT};font-family:'Montserrat',Arial,sans-serif;">

  <table cellpadding="0" cellspacing="0" border="0" width="100%"
    style="background:${GRAY_LIGHT};padding:40px 20px;">
    <tr><td align="center">

      <table cellpadding="0" cellspacing="0" border="0" width="750"
        style="max-width:750px;width:100%;
          background-color:#ffffff;
          background-image:url('${wmUri}');
          background-repeat:no-repeat;
          background-position:right -30px top -20px;
          background-size:380px 380px;
          box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <tr>
          <td style="padding:60px 50px;box-sizing:border-box;">

            <!-- HEADER -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:40px;">
              <tr><td align="center">
                <img src="${logoUrl}" alt="emoneeds" width="160"
                  style="max-width:160px;height:auto;display:block;margin:0 auto 15px;"/>
                <div style="display:inline-block;background:#ffffff;
                  border:1px solid ${ROSE_MID};border-radius:20px;
                  padding:4px 14px;margin-bottom:30px;">
                  <span style="font-family:'Montserrat',Arial,sans-serif;
                    font-size:10px;font-weight:800;color:${ROSE};
                    letter-spacing:1.5px;text-transform:uppercase;">
                    YOUR MENTAL WELLNESS SNAPSHOT +
                  </span>
                </div>
                <h1 style="font-family:'Playfair Display',Georgia,'Times New Roman',serif;
                  font-size:56px;font-weight:900;color:${NAVY};
                  margin:0 0 20px;line-height:1.1;letter-spacing:-1px;">
                  Relationship Assessment Report
                </h1>
                <div style="display:inline-block;background:${ROSE_LIGHT};
                  border-radius:4px;padding:8px 25px;margin-bottom:25px;">
                  <span style="font-family:'Montserrat',Arial,sans-serif;
                    font-size:20px;font-weight:600;color:${ROSE};">
                    Hello, ${name}
                  </span>
                </div>
                <p style="font-family:'Montserrat',Arial,sans-serif;font-size:16px;
                  color:${NAVY};line-height:1.6;font-weight:500;margin:0;">
                  This is your relationship assessment report<br/>
                  based on your response, powered by emoneeds.
                </p>
              </td></tr>
            </table>

            <!-- SCORE CARD -->
            <div style="background:${ROSE_LIGHT};border-radius:30px;
              padding:35px 40px;margin-bottom:40px;
              border:1px solid rgba(225,29,72,0.1);">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="160" style="vertical-align:middle;padding-right:45px;text-align:center;">
                    <div style="display:inline-block;padding:19px;border-radius:80px;
                      background:conic-gradient(${rm.color} 0% ${pct}%, #fecdd3 ${pct}% 100%);">
                      <div style="width:122px;height:122px;border-radius:61px;
                        background:#ffffff;text-align:center;overflow:hidden;">
                        <div style="height:27px;line-height:0;font-size:0;">&nbsp;</div>
                        <span style="display:block;font-size:48px;font-weight:800;
                          color:${rm.color};line-height:1;
                          font-family:Arial,sans-serif;">${score}</span>
                        <span style="display:block;font-size:13px;color:${GRAY};
                          font-weight:600;font-family:Arial,sans-serif;
                          margin-top:4px;">out of ${max}</span>
                      </div>
                    </div>
                  </td>
                  <td style="vertical-align:top;padding-top:5px;">
                    <div style="display:inline-block;
                      background:${rm.badgeBg};
                      border:1px solid ${rm.badgeBd};
                      border-radius:6px;padding:6px 14px;margin-bottom:15px;">
                      ${shieldSvg}
                      <span style="font-family:Arial,Helvetica,sans-serif;
                        font-size:12px;font-weight:900;color:${rm.badgeTx};
                        letter-spacing:0.5px;vertical-align:middle;">
                        ${rm.label}
                      </span>
                    </div>
                    <h3 style="font-family:'Montserrat',Arial,sans-serif;
                      font-size:22px;color:${ROSE};
                      margin:0 0 8px;font-weight:700;line-height:1.4;">
                      ${rm.headline}
                    </h3>
                    <p style="font-family:'Montserrat',Arial,sans-serif;
                      font-size:14px;color:${GRAY};
                      margin:0;line-height:1.6;font-weight:500;">
                      ${rm.subline}
                    </p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- AI INSIGHTS -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:50px;">
              <tr><td>
                <h2 style="font-family:'Montserrat',Arial,sans-serif;
                  font-size:20px;font-weight:800;color:${NAVY};
                  margin:0 0 8px;letter-spacing:0.5px;">
                  AI &#8211; INSIGHTS
                </h2>
                <p style="font-family:'Montserrat',Arial,sans-serif;
                  font-size:13px;color:${ROSE};
                  margin:0 0 30px;font-weight:500;">
                  Our AI has analyzed your responses and identified key relationship patterns.
                </p>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>${cardsHtml}</tr>
                </table>
              </td></tr>
            </table>

            <!-- CTA BANNER -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:30px;">
              <tr>
                <td align="center"
                  style="background:${GRAY_LIGHT};border-radius:50px;padding:18px 30px;">
                  <span style="font-family:Arial,Helvetica,sans-serif;
                    font-size:13px;font-weight:800;color:${NAVY};
                    letter-spacing:0.5px;text-transform:uppercase;">
                    WE RECOMMEND YOU TO VISIT EMONEEDS TO KNOW MORE ABOUT IT.
                  </span>
                </td>
              </tr>
            </table>

            <!-- Visit Emoneeds Button -->
            <table cellpadding="0" cellspacing="0" border="0" width="100%"
              style="margin-bottom:28px;">
              <tr>
                <td align="center">
                  <a href="https://emoneeds.com" target="_blank"
                    style="display:inline-block;background:${ROSE};color:#ffffff;
                      text-decoration:none;font-family:'Montserrat',Arial,sans-serif;
                      font-size:15px;font-weight:700;letter-spacing:0.5px;
                      padding:16px 48px;border-radius:50px;line-height:1;">
                    Visit Emoneeds &rarr;
                  </a>
                </td>
              </tr>
            </table>

            <!-- Disclaimer -->
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:10px;
              color:#94a3b8;text-align:center;margin:0 auto;line-height:1.6;
              text-transform:uppercase;letter-spacing:0.8px;max-width:90%;">
              Disclaimer: Powered by emoneeds. This automated brief reflects
              self-reported data intended for relationship wellness benchmarking,
              not clinical diagnosis.
            </p>

          </td>
        </tr>
      </table>

    </td></tr>
  </table>

</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────
   Handler
───────────────────────────────────────────────────────── */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, score, stressLevel, relationshipLevel, assessmentType, archetype, aiFacts } = req.body;

  if (!email || !name || score === undefined) {
    return res.status(400).json({ error: "Missing required fields (email, name, score)" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service not configured." });
  }

  const isRelationship = assessmentType === "relationship";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const html = isRelationship
      ? buildRelationshipHtml({ name, score, relationshipLevel, aiFacts })
      : buildHtml({ name, score, stressLevel, archetype, aiFacts });

    const emailPayload = {
      from:    "Emoneeds <reports@mail.emoneeds.com>",
      to:      email,
      subject: isRelationship
        ? "Your Personalized Relationship Assessment Report"
        : "Your Personalized Stress Assessment Report",
      html,
    };


    const result = await resend.emails.send(emailPayload);

    if (result.error) {
      const errDetail = JSON.stringify(result.error);
      console.error("Resend error:", errDetail);
      return res.status(502).json({ error: result.error.message || errDetail, detail: result.error });
    }

    console.log("Email sent successfully, id:", result.data?.id);
    return res.status(200).json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Failed to send email:", error.message, error.stack);
    return res.status(500).json({ error: error.message || "Failed to send email" });
  }
}
