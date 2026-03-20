import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
} from "../controllers/journal.controller";
import { validateBody } from "../middleware/validate.middleware";
import {
  journalCreateSchema,
  journalUpdateSchema,
} from "../validation/schemas";

const router = express.Router();

router.use(authenticate);

router.post("/", validateBody(journalCreateSchema), createJournal as any);
router.get("/", getJournals as any);
router.put("/:id", validateBody(journalUpdateSchema), updateJournal as any);
router.delete("/:id", deleteJournal as any);

export default router;