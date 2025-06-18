import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// 📌 Create Goal
export const createGoal = async (req: AuthRequest, res: Response) => {
  const { title, description = "", targetDate, status = "Not Started" } = req.body;
  const userId = req.user?.userId;

  if (!userId || !title || !targetDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        targetDate: new Date(targetDate),
        status,
        userId,
      },
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error("Create goal error:", error);
    res.status(500).json({ error: "Failed to create goal" });
  }
};

// 📌 Get All Goals
export const getGoals = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  try {
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

// 📌 Update Goal
export const updateGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const goalId = Number(req.params.id);
  const { title, description, status, targetDate } = req.body;

  try {
    const goal = await prisma.goal.findUnique({ where: { id: goalId } });

    if (!goal || goal.userId !== userId) {
      return res.status(404).json({ error: "Goal not found or unauthorized" });
    }

    const updated = await prisma.goal.update({
      where: { id: goalId },
      data: {
        title: title ?? goal.title,
        description: description ?? goal.description,
        status: status ?? goal.status,
        targetDate: targetDate ? new Date(targetDate) : goal.targetDate,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update goal error:", err);
    res.status(500).json({ error: "Failed to update goal" });
  }
};

// 📌 Delete Goal
export const deleteGoal = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const goalId = Number(req.params.id);

  try {
    const goal = await prisma.goal.findUnique({ where: { id: goalId } });

    if (!goal || goal.userId !== userId) {
      return res.status(404).json({ error: "Goal not found or unauthorized" });
    }

    await prisma.goal.delete({ where: { id: goalId } });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    console.error("Delete goal error:", err);
    res.status(500).json({ error: "Failed to delete goal" });
  }
};

