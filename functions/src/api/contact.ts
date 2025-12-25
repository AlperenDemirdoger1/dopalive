import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { adminDb } from "../admin";

const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const contact = onRequest(async (req, res) => {
  // CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!adminDb) {
    res.status(500).json({ error: "Admin SDK not configured" });
    return;
  }

  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid payload",
      issues: parsed.error.flatten(),
    });
    return;
  }

  const { email, subject, message } = parsed.data;

  try {
    const docRef = adminDb.collection("contact_messages").doc();
    await docRef.set({
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    // Try to send email via Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "DopaLive <noreply@dopalive.app>",
            to: ["alperen.demirdoger@gmail.com"],
            replyTo: email,
            subject: `İletişim Formu: ${subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ff6b6b;">Yeni İletişim Formu Mesajı</h2>
                <p><strong>Gönderen:</strong> ${email}</p>
                <p><strong>Konu:</strong> ${subject}</p>
                <hr style="border: 1px solid #e0e0e0; margin: 20px 0;" />
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                  <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <hr style="border: 1px solid #e0e0e0; margin: 20px 0;" />
                <p style="color: #666; font-size: 12px;">Bu mesaj DopaLive iletişim formundan gönderilmiştir.</p>
              </div>
            `,
          }),
        });

        if (response.ok) {
          await docRef.update({ status: "sent", sentAt: new Date().toISOString() });
        }
      } catch (emailErr) {
        console.error("email send error", emailErr);
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("contact form error", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});




