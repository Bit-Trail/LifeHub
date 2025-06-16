import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { title } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const toggleTask = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;
  const taskId = parseInt(req.params.id);

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    if (task.userId !== userId) {
      res.status(403).json({ error: "Not authorized" });
      return;
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { completed: !task.completed },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle task" });
  }
};


export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;
  const taskId = parseInt(req.params.id);

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    if (task.userId !== userId) {
      res.status(403).json({ error: "Not authorized" });
      return;
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};