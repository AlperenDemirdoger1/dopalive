import { NextResponse } from "next/server";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";

const quizSchema = z.object({
  archetype: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    key: z.string().optional(),
    emoji: z.string().optional(),
  }),
  scores: z.record(z.string(), z.number()).optional(),
  insights: z.array(z.string()).optional(),
  recommendedPlan: z.string().optional(),
  planReasoning: z.string().optional(),
  userId: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = quizSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  const now = new Date();

  try {
    const docRef = adminDb.collection("quiz_profiles").doc();
    await docRef.set({
      ...payload,
      createdAt: now.toISOString(),
      userId: payload.userId || null,
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("submitQuizResult error", err);
    return NextResponse.json(
      { error: "Failed to save quiz" },
      { status: 500 },
    );
  }
}

