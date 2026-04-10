import { Resend } from "resend";

/* ─────────────────────────────────────────────────────────
   Identical to PdfReport.jsx — same palette, same layout
───────────────────────────────────────────────────────── */
const STRESS = {
  low: {
    color:    "#10b981",
    badgeBg:  "#d1fae5",
    badgeBd:  "#6ee7b7",
    badgeTx:  "#065f46",
    label:    "LOW STRESS",
    headline: "Your stress level is well managed. Great work!",
    subline:  "Continue maintaining healthy habits to sustain your performance and well-being.",
  },
  moderate: {
    color:    "#f59e0b",
    badgeBg:  "#fef3c7",
    badgeBd:  "#f59e0b",
    badgeTx:  "#92400e",
    label:    "MODERATE STRESS",
    headline: "Your stress level is manageable but needs attention.",
    subline:  "Addressing these areas now can help you prevent future burnout and improve overall well-being.",
  },
  high: {
    color:    "#ef4444",
    badgeBg:  "#fee2e2",
    badgeBd:  "#fca5a5",
    badgeTx:  "#991b1b",
    label:    "HIGH STRESS",
    headline: "Your stress level is high and needs immediate attention.",
    subline:  "Please take steps to address your stress and consider seeking professional support.",
  },
};

function parseFact(fact) {
  const idx = fact.indexOf(":");
  if (idx > 0 && idx < 55) {
    return { category: fact.slice(0, idx).trim(), detail: fact.slice(idx + 1).trim() };
  }
  const words = fact.split(" ");
  return { category: words.slice(0, 3).join(" "), detail: fact };
}

/* Inline SVG icons — same as PdfReport.jsx */
const ICONS = [
  /* Brain */
  `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c8c8c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.98 2.98 0 0 1-.7-5.45A2.5 2.5 0 0 1 7.5 9 2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.98 2.98 0 0 0 .7-5.45A2.5 2.5 0 0 0 16.5 9 2.5 2.5 0 0 0 14.5 2z"/>
  </svg>`,
  /* Target */
  `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c8c8c" stroke-width="1.5" stroke-linecap="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
  </svg>`,
  /* Gear */
  `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c8c8c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>`,
];

/* ─────────────────────────────────────────────────────────
   Build HTML — mirrors PdfReport.jsx exactly
───────────────────────────────────────────────────────── */
function buildHtml({ name, score, stressLevel, aiFacts }) {
  const sm     = STRESS[stressLevel] || STRESS.moderate;
  const pct    = Math.round((score / 40) * 100);
  const facts  = Array.isArray(aiFacts) ? aiFacts.slice(0, 3) : [];

  /* Logo: absolute URL so email clients can load it */
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://emoneeds-stress-assessment.vercel.app";
  const logoUrl = `${baseUrl}/emoneeds-logo.png`;

  /* Conic-gradient gauge — works in Gmail/Apple Mail */
  const gaugeHtml = `
    <div style="width:150px;height:150px;border-radius:50%;
      background:conic-gradient(${sm.color} 0% ${pct}%, #ddeaea ${pct}% 100%);
      display:inline-flex;align-items:center;justify-content:center;">
      <div style="width:112px;height:112px;border-radius:50%;background:#ffffff;
        display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
        <span style="font-size:30px;font-weight:800;color:${sm.color};font-family:Arial,sans-serif;line-height:1;">${score}</span>
        <span style="font-size:11px;color:#4b5563;font-family:Arial,sans-serif;margin-top:3px;">out of 40</span>
      </div>
    </div>`;

  /* Stress badge */
  const badgeHtml = `
    <div style="display:inline-block;background:${sm.badgeBg};border:1.5px solid ${sm.badgeBd};
      border-radius:50px;padding:6px 14px;margin-bottom:14px;white-space:nowrap;">
      <span style="display:inline-block;vertical-align:middle;margin-right:5px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${sm.badgeTx}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      </span>
      <span style="display:inline-block;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;
        font-size:11px;font-weight:900;letter-spacing:1.2px;color:${sm.badgeTx};">${sm.label}</span>
    </div>`;

  /* AI insight cards */
  const cardsHtml = facts.length > 0
    ? facts.map((fact, i) => {
        const { category, detail } = parseFact(fact);
        return `
          <td width="33%" style="padding:0 7px;vertical-align:top;">
            <div style="background:#ffffff;border:1.5px solid #9dd0d0;border-radius:16px;
              padding:20px 14px 18px;text-align:center;box-sizing:border-box;">
              <!-- Icon circle -->
              <div style="width:52px;height:52px;border-radius:50%;background:#e6f6f6;
                display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                ${ICONS[i]}
              </div>
              <!-- Category -->
              <p style="margin:0 0 7px 0;font-family:'Montserrat',Arial,sans-serif;
                font-size:12px;font-weight:800;color:#0c8c8c;line-height:1.3;">${category}</p>
              <!-- Detail -->
              <p style="margin:0;font-family:'Montserrat',Arial,sans-serif;
                font-size:11px;color:#4b5563;line-height:1.65;">${detail}</p>
            </div>
          </td>`;
      }).join("")
    : `<td><p style="font-family:Arial,sans-serif;font-size:12px;color:#9ca3af;">No insights generated.</p></td>`;

  /* Watermark circles (top-right decoration) — CSS only, no absolute positioning */
  /* Skipped in email — not reliable across clients */

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <title>Your Stress Assessment Report</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Montserrat',Arial,sans-serif;">

  <!-- ── PAGE WRAPPER ── -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0f4f8;padding:36px 20px;">
    <tr>
      <td align="center">

        <!-- ── WHITE CARD ── -->
        <table cellpadding="0" cellspacing="0" border="0" width="700"
          style="max-width:700px;width:100%;background:#ffffff;border-radius:16px;
            border-top:6px solid #222222;box-shadow:0 4px 28px rgba(0,0,0,0.10);overflow:hidden;">
          <tr>
            <td style="padding:44px 50px 40px;box-sizing:border-box;">

              <!-- ══ HEADER ══ -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td align="center">

                    <!-- Logo -->
                    <img src="${logoUrl}" alt="emoneeds" width="160"
                      style="max-width:160px;height:auto;display:block;margin:0 auto 14px;"/>

                    <!-- Snapshot badge -->
                    <div style="display:inline-block;background:#e6f6f6;border:1px solid #9dd0d0;
                      border-radius:50px;padding:5px 16px;margin-bottom:8px;">
                      <span style="font-family:'Montserrat',Arial,sans-serif;font-size:10px;font-weight:700;
                        letter-spacing:2px;text-transform:uppercase;color:#0c8c8c;">
                        YOUR MENTAL WELLNESS SNAPSHOT +
                      </span>
                    </div>
                    <br/>

                    <!-- Main title -->
                    <h1 style="font-family:'Playfair Display',Georgia,'Times New Roman',serif;
                      font-size:46px;font-weight:800;color:#001f2e;margin:8px 0;line-height:1.1;">
                      Stress Assessment Report
                    </h1>

                    <!-- Greeting pill -->
                    <div style="display:inline-block;background:#e6f6f6;border:1px solid #9dd0d0;
                      border-radius:8px;padding:7px 24px;margin:6px 0 8px;">
                      <span style="font-family:'Montserrat',Arial,sans-serif;font-size:15px;
                        font-weight:600;color:#001f2e;">Hello, ${name}</span>
                    </div>
                    <br/>

                    <!-- Subtitle -->
                    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:13px;
                      color:#0c8c8c;margin:6px 0 0;line-height:1.65;font-weight:500;">
                      This is your stress assessment report<br/>
                      based on your response, powered by emoneeds.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- ══ SCORE CARD ══ -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background:#e6f6f6;border:1px solid #9dd0d0;border-radius:20px;
                  margin-bottom:32px;">
                <tr>
                  <td style="padding:26px 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>

                        <!-- Left: Gauge -->
                        <td width="160" style="vertical-align:middle;padding-right:28px;">
                          ${gaugeHtml}
                        </td>

                        <!-- Right: Stress info -->
                        <td style="vertical-align:top;padding-top:6px;">
                          ${badgeHtml}
                          <p style="font-family:'Montserrat',Arial,sans-serif;font-size:17px;
                            font-weight:700;color:#0c8c8c;margin:0 0 8px;line-height:1.4;">
                            ${sm.headline}
                          </p>
                          <p style="font-family:'Montserrat',Arial,sans-serif;font-size:12px;
                            color:#4b5563;margin:0;line-height:1.65;">
                            ${sm.subline}
                          </p>
                        </td>

                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ══ AI INSIGHTS ══ -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <h2 style="font-family:'Montserrat',Arial,sans-serif;font-size:20px;
                      font-weight:800;color:#001f2e;margin:0 0 4px;letter-spacing:0.3px;">
                      AI &#8211; INSIGHTS
                    </h2>
                    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:12px;
                      color:#4b5563;margin:0 0 18px;">
                      Our AI has analyzed your responses and identified key stress patterns.
                    </p>
                    <!-- 3-column cards -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr style="margin:0 -7px;">
                        ${cardsHtml}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ══ CTA BANNER ══ -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:18px;">
                <tr>
                  <td align="center" style="background:#f3f4f6;border-radius:50px;padding:15px 28px;">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;
                      color:#001f2e;letter-spacing:0.8px;text-transform:uppercase;">
                      WE RECOMMEND YOU TO VISIT EMONEEDS TO KNOW MORE ABOUT IT.
                    </span>
                  </td>
                </tr>
              </table>

              <!-- ══ DISCLAIMER ══ -->
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:8.5px;color:#9ca3af;
                text-align:center;margin:0;line-height:1.6;letter-spacing:0.3px;text-transform:uppercase;">
                Disclaimer: Powered by Emoneeds. This automated brief reflects self-reported data
                intended for performance benchmarking, not clinical diagnosis.
              </p>

            </td>
          </tr>
        </table>
        <!-- ── end white card ── -->

      </td>
    </tr>
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

  const { email, name, score, stressLevel, archetype, aiFacts, pdfBase64 } = req.body;

  if (!email || !name || score === undefined) {
    return res.status(400).json({ error: "Missing required fields (email, name, score)" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service not configured." });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const html   = buildHtml({ name, score, stressLevel, archetype, aiFacts });

    const emailPayload = {
      from:    "Emoneeds <reports@mail.emoneeds.com>",
      to:      email,
      subject: "Your Personalized Stress Assessment Report",
      html,
    };

    if (pdfBase64) {
      const base64Data = pdfBase64.includes("base64,") ? pdfBase64.split("base64,")[1] : pdfBase64;
      emailPayload.attachments = [{
        filename: "Stress_Assessment_Report.pdf",
        content:  Buffer.from(base64Data, "base64"),
      }];
    }

    const result = await resend.emails.send(emailPayload);

    if (result.error) {
      const errDetail = JSON.stringify(result.error);
      console.error("Resend error:", errDetail);
      return res.status(502).json({ error: result.error.message || errDetail, detail: result.error });
    }

    console.log("Email sent, id:", result.data?.id);
    return res.status(200).json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Failed to send email:", error.message, error.stack);
    return res.status(500).json({ error: error.message || "Failed to send email" });
  }
}
