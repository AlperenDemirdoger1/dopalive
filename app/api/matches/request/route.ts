import { NextResponse } from "next/server";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";

const matchSchema = z.object({
  planId: z.string().optional(),
  userId: z.string().optional(),
  contactEmail: z.string().email().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Admin SDK not configured" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = matchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const docRef = adminDb.collection("matches").doc();
    await docRef.set({
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("requestMatch error", err);
    return NextResponse.json(
      { error: "Failed to create match request" },
      { status: 500 },
    );
  }
}

