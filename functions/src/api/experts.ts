import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { adminDb } from "../admin";

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

export const experts = onRequest(async (req, res) => {
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

  const parsed = expertSchema.safeParse(req.body);

  if (!parsed.success) {
    console.error("Expert application validation error:", {
      body: req.body,
      errors: parsed.error.errors,
    });
    res.status(400).json({
      error: "Invalid payload",
      issues: parsed.error.flatten(),
      details: parsed.error.errors,
    });
    return;
  }

  const data = parsed.data;

  try {
    const docRef = adminDb.collection("expert_applications").doc();
    await docRef.set({
      ...data.contact,
      education: data.education,
      experience: data.experience,
      approach: data.approach,
      availability: data.availability,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error("submitExpertApplication error", err);
    res.status(500).json({ error: "Failed to save application" });
  }
});

