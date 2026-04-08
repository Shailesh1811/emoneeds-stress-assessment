import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, pdfBase64 } = req.body;

  if (!email || !pdfBase64) {
    return res.status(400).json({ error: "Missing required fields (email, pdfBase64)" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Ensure base64 string is stripped of data:application/pdf;base64, if present
    const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");

    // Send the email with the PDF attached
    const result = await resend.emails.send({
      from: "Emoneeds <noreply@emoneeds.com>", // Default verified domain required by Resend, or use user's custom domain
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
          content: base64Data,
        },
      ],
    });

    if (result.error) {
      console.error("Resend API error:", result.error);
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ success: true, id: result.data.id });
  } catch (error) {
    console.error("Failed to send email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
