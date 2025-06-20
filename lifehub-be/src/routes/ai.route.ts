// routes/ai.route.ts
import express from "express";
import { getInsights } from "../controllers/ai.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/ai-insights", authenticate, (req, res, next) => {
  getInsights(req, res).catch(next);
});

export default router;