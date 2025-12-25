import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { adminDb } from "../admin";

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

export const quizSubmit = onRequest(async (req, res) => {
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

  const parsed = quizSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid payload",
      issues: parsed.error.flatten(),
    });
    return;
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

    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error("submitQuizResult error", err);
    res.status(500).json({ error: "Failed to save quiz" });
  }
});




