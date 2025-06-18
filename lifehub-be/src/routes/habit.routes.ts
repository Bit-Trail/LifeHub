import express from "express";
import { RequestHandler } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createHabit,
  getHabits,
  toggleHabitDay,
  deleteHabit,
} from "../controllers/habit.controller";

const router = express.Router();

router.use(authenticate);

router.post("/", createHabit);
router.get("/", getHabits);
router.patch("/:id/toggle/:day", toggleHabitDay as RequestHandler);
router.delete("/:id", deleteHabit);

export default router;
