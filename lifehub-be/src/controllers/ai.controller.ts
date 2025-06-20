import { prisma } from "../prisma";
import { askLifeHub } from "../services/ai";
import { Request, Response } from "express";

interface MessageRequest extends Request {
  body: {
    message?: string;
    [key: string]: any;
  };
  user?: {
    userId: string;
    [key: string]: any;
  };
}

export const getInsights = async (req: MessageRequest, res: Response) => {
  const userId = req.user?.userId ? Number(req.user.userId) : undefined;
  const { message } = req.body;

  try {
    const [tasks, habits, goals, journals] = await Promise.all([
      prisma.task.findMany({ where: { userId } }),
      prisma.habit.findMany({ where: { userId } }),
      prisma.goal.findMany({ where: { userId } }),
      prisma.journal.findMany({ where: { userId } }),
    ]);

    const userContent = JSON.stringify({ tasks, habits, goals, journals }).slice(0, 12000);

    let promptMessages;

    if (message && message.trim() !== "") {
      promptMessages = [
        { role: "system", content: "You are LifeHub AI Assistant. Be helpful, specific, and analyze user's data if needed." },
        { role: "user", content: `DATA: ${userContent}` },
        { role: "user", content: message },
      ];
    } else {
      promptMessages = [
        {
          role: "system",
          content: `
            You are LifeHub, a personal productivity coach.
            Respond ONLY in valid minified JSON format: {"highlights":[],"issues":[],"actions":[]}
            DO NOT return markdown or explanations.
          `,
        },
        { role: "user", content: userContent },
      ];
    }

    const output = await askLifeHub(promptMessages);

    if (message) {
      // User free-text query → return raw text
      res.json({ reply: output });
    } else {
      // Expected structured JSON → try parse
      try {
        const parsed = JSON.parse(output);
        res.json(parsed);
      } catch (error) {
        console.error("Invalid AI JSON Output:", output);
        res.status(500).json({
          error: "AI failed",
          message: "Invalid JSON output from AI",
          raw: output,
        });
      }
    }
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({
      error: "AI failed",
      message: err instanceof Error ? err.message : String(err),
    });
  }
};