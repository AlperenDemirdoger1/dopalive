import { NextResponse } from "next/server";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";

const earlyAccessSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  interestedFeatures: z.array(z.string()).optional(),
  comments: z.string().optional(),
  selectedPlanId: z.string().optional(),
  source: z.string().optional(),
  preferredModule: z.string().optional(), // Legacy field
  struggles: z.array(z.string()).optional(),
  ageRange: z.string().optional(),
  diagnosis: z.string().optional(),
  expectation: z.string().optional(),
  expectationOptions: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = earlyAccessSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const docRef = adminDb.collection("early_access_signups").doc();
    await docRef.set({
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("submitEarlyAccess error", err);
    return NextResponse.json(
      { error: "Failed to save application" },
      { status: 500 },
    );
  }
}

