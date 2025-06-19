import { ReactNode } from "react";

export type Task = {
  date: any;
  id: number;
  title: string;
  category: "WORK" | "PERSONAL";
  completed: boolean;
  dueDate?: string;
  reminderAt?: string;
  createdAt: string;
  updatedAt: string;
};


export type Habit = {
  frequency: any;
  completed: any;
  id: number;
  title: string;
  emoji: string;
  tracked: { [day: string]: boolean }; // e.g., { Mon: true, Tue: false, ... }
};

export type Journal = {
  title: ReactNode;
  date: string | number | Date;
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
