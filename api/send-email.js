import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, pdfBase64 } = req.body;

  if (!email || !pdfBase64) {
    return res.status(400).json({ error: "Missing required fields (email, pdfBase64)" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment variables.");
    return res.status(500).json({ error: "Email service not configured." });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const base64Data = pdfBase64.includes("base64,") ? pdfBase64.split("base64,")[1] : pdfBase64;

    const result = await resend.emails.send({
      from: "Emoneeds <reports@mail.emoneeds.com>",
      to: email,
      subject: "Your Personalized Stress Assessment Report",
      html: `
        <p>Hello ${name || "there"},</p>
        <p>Thank you for taking the Emoneeds Stress Assessment.</p>
        <p>Please find attached your personalized assessment report and executive AI insights.</p>
        <br />
        <p>Best regards,<br/>The Emoneeds Team</p>
      `,
      attachments: [
        {
          filename: "Stress_Assessment_Report.pdf",
          content: Buffer.from(base64Data, "base64"),
        },
      ],
    });

    if (result.error) {
      console.error("Resend API error detail:", JSON.stringify(result.error));
      return res.status(400).json({ error: result.error.message || JSON.stringify(result.error) });
    }

    return res.status(200).json({ success: true, id: result.data.id });
  } catch (error) {
    console.error("Failed to send email:", error.message);
    return res.status(500).json({ error: error.message || "Failed to send email" });
  }
}
