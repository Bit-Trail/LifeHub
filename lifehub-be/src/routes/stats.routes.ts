import express from "express";
import { getDashboardStats, getDashboardPreview } from "../controllers/stats.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();
router.get("/", authenticate, getDashboardStats);
router.get("/preview", authenticate, getDashboardPreview);

export default router;