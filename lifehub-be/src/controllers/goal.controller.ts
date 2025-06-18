import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// 📌 Create Goal
export const createGoal = async (req: AuthRequest, res: Response) => {
  const { title, description, targetDate } = req.body;
  const userId = req.user?.userId;

  if (!userId || !title || !targetDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const goal = await prisma.goal.create({
      data: { title, description, targetDate: new Date(targetDate), userId },
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create goal", details: error });
  }
};

// 📌 Get All Goals
export const getGoals = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  res.json(goals);
};

// 📌 Update Goal
export const updateGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const goalId = Number(req.params.id);
  const { title, description, status, targetDate } = req.body;

  const goal = await prisma.goal.findUnique({ where: { id: goalId } });
  if (!goal || goal.userId !== userId) {
    return res.status(404).json({ error: "Goal not found or unauthorized" });
  }

  const updated = await prisma.goal.update({
    where: { id: goalId },
    data: { title, description, status, targetDate: new Date(targetDate) },
  });

  res.json(updated);
};

// 📌 Delete Goal
export const deleteGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const goalId = Number(req.params.id);

  const goal = await prisma.goal.findUnique({ where: { id: goalId } });
  if (!goal || goal.userId !== userId) {
    return res.status(404).json({ error: "Goal not found or unauthorized" });
  }

  await prisma.goal.delete({ where: { id: goalId } });
  res.json({ message: "Goal deleted" });
};
