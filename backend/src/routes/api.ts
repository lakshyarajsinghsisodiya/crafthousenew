import { Router } from "express";
import { z } from "zod";
import {
  gallery,
  packages,
  portfolio,
  process,
  services,
  stats,
  testimonials,
} from "../data/content.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Crafthouse Media API" });
});

router.get("/stats", (_req, res) => res.json(stats));
router.get("/services", (_req, res) => res.json(services));
router.get("/portfolio", (_req, res) => res.json(portfolio));
router.get("/packages", (_req, res) => res.json(packages));
router.get("/process", (_req, res) => res.json(process));
router.get("/testimonials", (_req, res) => res.json(testimonials));
router.get("/gallery", (_req, res) => res.json(gallery));

router.get("/content", (_req, res) => {
  res.json({
    stats,
    services,
    portfolio,
    packages,
    process,
    testimonials,
    gallery,
  });
});

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  business: z.string().min(2).max(150).optional(),
  message: z.string().min(10).max(2000),
  type: z.enum(["discovery", "proposal"]).default("discovery"),
});

router.post("/contact", (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const submission = {
    ...parsed.data,
    id: `contact_${Date.now()}`,
    receivedAt: new Date().toISOString(),
  };

  console.log("[Contact]", submission);

  return res.status(201).json({
    success: true,
    message: "Thank you. We'll be in touch within 24 hours.",
    submissionId: submission.id,
  });
});

export default router;
