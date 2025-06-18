// goal.route.ts
import express, { RequestHandler } from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticate);

router.post("/",  createGoal  as RequestHandler);
router.get("/",   getGoals    as RequestHandler);
router.put("/:id",updateGoal  as RequestHandler);
router.delete("/:id", deleteGoal as RequestHandler);

export default router;
