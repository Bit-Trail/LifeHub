import express from "express";
import {
  authorizeGoogle,
  googleCallback,
  createTaskOnGoogle,
} from "../controllers/google.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// ✅ Do NOT add `authenticate` here
router.get("/auth", authorizeGoogle); // PUBLIC
router.get("/callback", authenticate, googleCallback); // PROTECTED
router.post("/add-task", authenticate, createTaskOnGoogle); // PROTECTED

export default router;