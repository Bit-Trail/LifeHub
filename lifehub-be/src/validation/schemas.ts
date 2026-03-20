import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const taskCreateSchema = z.object({
  title: z.string().min(1),
  category: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  reminderAt: z.string().datetime().optional(),
});

export const taskUpdateSchema = z
  .object({
    title: z.string().min(1).optional(),
    category: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    reminderAt: z.string().datetime().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const habitCreateSchema = z.object({
  title: z.string().min(1),
  frequency: z.string().min(1),
});

export const journalCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  mood: z.string().optional(),
});

export const journalUpdateSchema = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    mood: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const goalCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  targetDate: z.string().datetime(),
  status: z.string().optional(),
});

export const goalUpdateSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    targetDate: z.string().datetime().optional(),
    status: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const aiInsightsSchema = z.object({
  message: z.string().optional(),
});

