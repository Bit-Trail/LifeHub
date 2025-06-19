import { Request, Response } from "express";
import { prisma } from "../prisma";


// Add tasks
export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { dueDate: "asc" },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Create Task
export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { title, category, dueDate, reminderAt } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
        category,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        reminderAt: reminderAt ? new Date(reminderAt) : undefined,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Toggle Task
export const toggleTask = async (req: Request, res: Response) => {
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

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.userId;
  const { title, category, dueDate, reminderAt } = req.body;

  try {
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });

    if (!task || task.userId !== userId) {
       res.status(404).json({ error: "Task not found or unauthorized" });
       return;
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(reminderAt && { reminderAt: new Date(reminderAt) }),
        updatedAt: new Date(),
      },
    });

     res.status(200).json(updatedTask);
     return;
  } catch (error) {
    console.error("Update task error:", error);
     res.status(500).json({ error: "Failed to update task" });
     return;
  }
};


// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
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
