import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// ➕ Create a new habit
export const createHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { title, frequency } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!title || !frequency) {
    res.status(400).json({ error: "Title and frequency are required" });
    return;
  }

  try {
    const habit = await prisma.habit.create({
      data: {
        title,
        frequency,
        userId, // ✅ now userId is definitely a number
      },
    });

    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: "Failed to create habit" });
  }
};


// 📄 Get all habits
export const getHabits = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  const habits = await prisma.habit.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  res.json(habits);
};

// ✅ Toggle habit completion
export const toggleHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const habitId = parseInt(req.params.id);

  const habit = await prisma.habit.findUnique({ where: { id: habitId } });

  if (!habit) {
    res.status(404).json({ error: "Habit not found" });
    return;
  }

  if (habit.userId !== userId) {
    res.status(403).json({ error: "Not authorized" });
    return;
  }

  const updated = await prisma.habit.update({
    where: { id: habitId },
    data: { completed: !habit.completed },
  });

  res.json(updated);
};

// ❌ Delete a habit
export const deleteHabit = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const habitId = parseInt(req.params.id);

  const habit = await prisma.habit.findUnique({ where: { id: habitId } });

  if (!habit) {
    res.status(404).json({ error: "Habit not found" });
    return;
  }

  if (habit.userId !== userId) {
    res.status(403).json({ error: "Not authorized" });
    return;
  }

  await prisma.habit.delete({ where: { id: habitId } });
  res.json({ message: "Habit deleted" });
};
