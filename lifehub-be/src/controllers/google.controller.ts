import { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import { prisma } from "../prisma";

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = process.env as Record<string, string>;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  throw new Error("Google OAuth env vars missing. Check .env file");
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// Scopes for Calendar and Tasks
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/tasks",
];

/**
 * GET /api/google/auth
 * Redirect user to Google consent screen
 */
export const authorizeGoogle = async (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
  res.redirect(url);
};

/**
 * GET /api/google/callback
 * Exchange code for tokens and save refresh token for the user
 */
export const googleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  const userId = (req as any).user.userId; // expects auth middleware

  if (!code || Array.isArray(code)) {
     res.status(400).json({ error: "Missing code param" });
     return;
  }

  try {
    const tokenResponse = await oauth2Client.getToken(code as string);
    const tokens = tokenResponse.tokens;
    await prisma.user.update({
      where: { id: userId },
      data: {
        googleRefreshToken: tokens.refresh_token || null,
        googleAccessToken: tokens.access_token || null,
      },
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Google callback error", err);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
};

/**
 * Helper: set client credentials for a user id
 */
const setCredentialsForUser = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.googleRefreshToken) throw new Error("No Google account linked");
  oauth2Client.setCredentials({ refresh_token: user.googleRefreshToken });
};

/**
 * POST /api/google/add-task
 * body: { title: string, dueDate?: string, reminderAt?: string }
 * Creates both a Google Task and Calendar event
 */
export const createTaskOnGoogle = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { title, dueDate, reminderAt } = req.body as {
    title: string;
    dueDate?: string;
    reminderAt?: string;
  };

  try {
    await setCredentialsForUser(userId);

    /** Calendar Event **/
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: title,
        start: dueDate ? { date: dueDate } : undefined,
        end: dueDate ? { date: dueDate } : undefined,
      },
    });

    /** Tasks **/
    const tasks = google.tasks({ version: "v1", auth: oauth2Client });
    await tasks.tasks.insert({
      tasklist: "@default",
      requestBody: {
        title,
        due: dueDate ? new Date(dueDate).toISOString() : undefined,
      },
    });

    res.json({ message: "Synced to Google", eventId: event.data.id });
  } catch (err) {
    console.error("Google create task error", err);
    res.status(500).json({ error: "Failed to sync task with Google" });
  }
};