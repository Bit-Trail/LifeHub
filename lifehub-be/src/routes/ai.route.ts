// routes/ai.route.ts
import express from "express";
import { getInsights } from "../controllers/ai.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { aiInsightsSchema } from "../validation/schemas";

const router = express.Router();

router.post(
  "/ai-insights",
  authenticate,
  validateBody(aiInsightsSchema),
  (req, res, next) => {
    getInsights(req, res).catch(next);
  }
);

export default router;