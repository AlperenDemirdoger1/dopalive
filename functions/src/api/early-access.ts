import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { adminDb } from "../admin";

const earlyAccessSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  interestedFeatures: z.array(z.string()).optional(),
  comments: z.string().optional(),
  selectedPlanId: z.string().optional(),
  source: z.string().optional(),
  preferredModule: z.string().optional(),
  struggles: z.array(z.string()).optional(),
  ageRange: z.string().optional(),
  diagnosis: z.string().optional(),
  expectation: z.string().optional(),
  expectationOptions: z.array(z.string()).optional(),
});

export const earlyAccess = onRequest(async (req, res) => {
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

  const parsed = earlyAccessSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid payload",
      issues: parsed.error.flatten(),
    });
    return;
  }

  const data = parsed.data;

  try {
    const docRef = adminDb.collection("early_access_signups").doc();
    await docRef.set({
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error("submitEarlyAccess error", err);
    res.status(500).json({ error: "Failed to save application" });
  }
});




