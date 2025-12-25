import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminDb } from "@/lib/firebase/admin";

const expertSchema = z.object({
  contact: z.object({
    full_name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    city: z.string().optional(),
  }),
  education: z.object({
    education_level: z.string().optional(),
    field_of_study: z.string().optional(),
    certifications: z.array(z.string()).optional(),
  }),
  experience: z.object({
    coaching_years: z.string().optional(),
    adhd_experience: z.string().optional(),
    online_experience: z.string().optional(),
    current_clients: z.string().optional(),
  }),
  approach: z.object({
    specialties: z.array(z.string()).optional(),
    coaching_style: z.string().optional(),
    why_adhd: z.string().optional(),
  }),
  availability: z.object({
    weekly_hours: z.string().optional(),
    preferred_schedule: z.array(z.string()).optional(),
    expectations: z.array(z.string()).optional(),
    start_date: z.string().optional(),
  }),
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
  const parsed = expertSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const docRef = db.collection("expert_applications").doc();
    await docRef.set({
      ...data.contact,
      education: data.education,
      experience: data.experience,
      approach: data.approach,
      availability: data.availability,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("submitExpertApplication error", err);
    return NextResponse.json(
      { error: "Failed to save application" },
      { status: 500 },
    );
  }
}
