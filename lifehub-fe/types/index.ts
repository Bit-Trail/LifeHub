import { ReactNode } from "react";

export type Task = {
  id: number;
  title: string;
  completed: boolean; // ✅ match backend key
  date?: string;      // optional if not used
};

export type Habit = {
  id: number;
  title: string;
  emoji: string;
  tracked: { [day: string]: boolean }; // e.g., { Mon: true, Tue: false, ... }
};

export type Journal = {
  id: number;
  content: string;
  createdAt: string;
};

export type Goal = {
  description: ReactNode;
  targetDate: string | number | Date;
  id: number;
  title: string;
  status: "Not Started" | "In Progress" | "Done";
};
