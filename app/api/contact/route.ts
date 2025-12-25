import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminDb } from "@/lib/firebase/admin";

const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  const db = getAdminDb();
  if (!db) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email, subject, message } = parsed.data;

  try {
    // Save to Firestore
    const docRef = db.collection('contact_messages').doc();
    await docRef.set({
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });

    // Try to send email via Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'DopaLive <noreply@dopalive.app>',
            to: 'alperen.demirdoger@gmail.com',
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
          // Update status to sent
          await docRef.update({ status: 'sent', sentAt: new Date().toISOString() });
        }
      } catch (emailErr) {
        console.error("email send error", emailErr);
        // Continue even if email fails - message is saved to Firestore
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("contact form error", err);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 },
    );
  }
}

