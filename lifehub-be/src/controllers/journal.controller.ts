import { Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// ➕ Create a journal entry
export const createJournal = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, mood } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const journal = await prisma.journal.create({
      data: {
        title,
        content,
        mood,
        userId,
      },
    });

    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create journal", details: error });
  }
};

// 📄 Get all journals for a user
export const getJournals = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const journals = await prisma.journal.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch journals", details: error });
  }
};

// ✏️ Update a journal
export const updateJournal = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const journalId = Number(req.params.id);
    const { title, content, mood } = req.body;

    const journal = await prisma.journal.findUnique({ where: { id: journalId } });

    if (!journal || journal.userId !== userId) {
      return res.status(404).json({ error: "Journal not found or unauthorized" });
    }

    const updated = await prisma.journal.update({
      where: { id: journalId },
      data: { title, content, mood },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update journal", details: error });
  }
};

// ❌ Delete a journal
export const deleteJournal = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const journalId = Number(req.params.id);

    const journal = await prisma.journal.findUnique({ where: { id: journalId } });

    if (!journal || journal.userId !== userId) {
      return res.status(404).json({ error: "Journal not found or unauthorized" });
    }

    await prisma.journal.delete({ where: { id: journalId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete journal", details: error });
  }
};