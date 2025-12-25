import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { adminDb } from "../admin";

const matchSchema = z.object({
  planId: z.string().optional(),
  userId: z.string().optional(),
  contactEmail: z.string().email().optional(),
  notes: z.string().optional(),
});

export const matchesRequest = onRequest(async (req, res) => {
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

  const parsed = matchSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid payload",
      issues: parsed.error.flatten(),
    });
    return;
  }

  const data = parsed.data;

  try {
    const docRef = adminDb.collection("matches").doc();
    await docRef.set({
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error("requestMatch error", err);
    res.status(500).json({ error: "Failed to create match request" });
  }
});




