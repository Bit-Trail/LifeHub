import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createHabit,
  getHabits,
  toggleHabit,
  deleteHabit,
} from "../controllers/habit.controller";

const router = express.Router();

router.use(authenticate);

router.post("/", createHabit);
router.get("/", getHabits);
router.patch("/:id/toggle", toggleHabit);
router.delete("/:id", deleteHabit);

export default router;
