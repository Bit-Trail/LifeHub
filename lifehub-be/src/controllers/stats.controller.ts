import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getDashboardStats = async (req: any, res: Response) => {
  const userId = req.user?.userId;

  try {
    const [tasks, habits, journals, goals] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.habit.count({ where: { userId } }),
      prisma.journal.count({ where: { userId } }),
      prisma.goal.count({ where: { userId } }),
    ]);

    res.json({ tasks, habits, journals, goals });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const getDashboardPreview = async (req: any, res: Response) => {
  const userId = req.user?.userId;

  try {
    const [tasks, habits, journals, goals] = await Promise.all([
      prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 3 }),
      prisma.habit.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 3 }),
      prisma.journal.findMany({ where: { userId }, orderBy: { date: "desc" }, take: 3 }),
      prisma.goal.findMany({ where: { userId }, orderBy: { targetDate: "asc" }, take: 3 }),
    ]);

    res.json({ tasks, habits, journals, goals });
  } catch (err) {
    res.status(500).json({ error: "Failed to load preview" });
  }
};