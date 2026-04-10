import { Resend } from "resend";

function getStressColor(level) {
  if (level === "low") return "#10b981";
  if (level === "high") return "#ef4444";
  return "#f59e0b";
}

function getStressLabel(level) {
  if (level === "low") return "Low Stress";
  if (level === "high") return "High Stress";
  return "Moderate Stress";
}

function buildHtml({ name, score, stressLevel, archetype, aiFacts }) {
  const color = getStressColor(stressLevel);
  const label = getStressLabel(stressLevel);
  const maxScore = 40;

  const factsHtml = Array.isArray(aiFacts) && aiFacts.length > 0
    ? aiFacts.map((fact, i) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="36" style="vertical-align:top;padding-top:2px;">
                <div style="width:28px;height:28px;border-radius:50%;background:#e6f7f5;font-weight:800;font-size:13px;color:#1a7a6e;text-align:center;line-height:28px;">${i + 1}</div>
              </td>
              <td style="font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;padding-left:8px;">${fact}</td>
            </tr>
          </table>
        </td>
      </tr>`).join("")
    : `<tr><td style="padding:16px 0;color:#9ca3af;font-size:14px;">No AI insights available.</td></tr>`;

  const archetypeHtml = archetype ? `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;background:#e6f7f5;border-radius:12px;border:2px solid #b2e4de;">
      <tr>
        <td style="padding:18px 22px;">
          <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1a7a6e;font-family:Arial,sans-serif;">Executive Archetype</p>
          <p style="margin:0;font-size:19px;font-weight:800;color:#0d5c52;font-family:Arial,sans-serif;">${archetype}</p>
        </td>
      </tr>
    </table>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Your Stress Assessment Report</title>
</head>
<body style="margin:0;padding:0;background:#f0fafa;font-family:Arial,sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f0fafa;padding:32px 16px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#1a7a6e;padding:36px 40px;text-align:center;">
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;">Stress Assessment Report</h1>
              <p style="margin:8px 0 0 0;font-size:15px;color:#b2e4de;">Prepared for ${name}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 28px 0;font-size:16px;color:#374151;line-height:1.7;font-family:Arial,sans-serif;">
                Hello <strong>${name}</strong>, here is your personalized stress assessment report, powered by Emoneeds. Your full PDF report is also attached.
              </p>

              <!-- Score Box -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td align="center" style="padding:28px 20px;background:#f9fffe;border-radius:16px;border:2px solid #e0f5f3;">
                    <p style="margin:0 0 6px 0;font-size:52px;font-weight:800;color:${color};font-family:Arial,sans-serif;line-height:1;">${score}</p>
                    <p style="margin:0 0 12px 0;font-size:13px;color:#9ca3af;font-family:Arial,sans-serif;">out of ${maxScore}</p>
                    <p style="margin:0;font-size:22px;font-weight:800;color:${color};font-family:Arial,sans-serif;">${label}</p>
                  </td>
                </tr>
              </table>

              ${archetypeHtml}

              <!-- AI Insights -->
              <h2 style="margin:0 0 14px 0;font-size:17px;font-weight:800;color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:10px;font-family:Arial,sans-serif;">AI-Powered Insights</h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                ${factsHtml}
              </table>

              <!-- Privacy Notice -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;">
                    <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;font-family:Arial,sans-serif;">
                      <strong>Privacy Notice:</strong> These results are confidential and will be permanently removed from our databases once your report has been delivered.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="https://emoneeds.com" style="display:inline-block;background:#1a7a6e;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:50px;font-family:Arial,sans-serif;">
                      Visit Emoneeds for Professional Support
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fffe;padding:24px 40px;text-align:center;border-top:1px solid #e0f5f3;">
              <p style="margin:0 0 6px 0;font-size:13px;color:#6b7280;font-family:Arial,sans-serif;">Best regards, <strong>The Emoneeds Team</strong></p>
              <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;font-style:italic;font-family:Arial,sans-serif;">
                This report reflects self-reported data for performance benchmarking purposes only — not clinical diagnosis.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
    const html = buildHtml({ name, score, stressLevel, archetype, aiFacts });

    const emailPayload = {
      from: "Emoneeds <reports@mail.emoneeds.com>",
      to: email,
      subject: "Your Personalized Stress Assessment Report",
      html,
    };

    // Attach PDF if provided
    if (pdfBase64) {
      const base64Data = pdfBase64.includes("base64,") ? pdfBase64.split("base64,")[1] : pdfBase64;
      emailPayload.attachments = [{
        filename: "Stress_Assessment_Report.pdf",
        content: Buffer.from(base64Data, "base64"),
      }];
    }

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
