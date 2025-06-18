import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
} from "../controllers/journal.controller";

const router = express.Router();

router.use(authenticate);

// ✅ Don't wrap in arrow functions; directly reference the controller with correct type
router.post("/createJournal", createJournal as any);
router.get("/", getJournals as any);
router.put("/:id", updateJournal as any);
router.delete("/:id", deleteJournal as any);

export default router;