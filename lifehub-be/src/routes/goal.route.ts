import express, { RequestHandler } from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { goalCreateSchema, goalUpdateSchema } from "../validation/schemas";

const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  validateBody(goalCreateSchema),
  createGoal as RequestHandler
);
router.get("/", getGoals as RequestHandler);
router.patch(
  "/:id",
  validateBody(goalUpdateSchema),
  updateGoal as RequestHandler
);
router.delete("/:id", deleteGoal as RequestHandler);

export default router;
