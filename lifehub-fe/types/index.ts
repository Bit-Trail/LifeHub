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
  createdAt: string | number | Date;
  frequency: any;
  completed: any;
  id: number;
  title: string;
  emoji: string;
  tracked: { [day: string]: boolean }; // e.g., { Mon: true, Tue: false, ... }
};

export type Journal = {
  mood: any;
  title: ReactNode;
  date: string | number | Date;
  id: number;
  content: string;
  createdAt: string;
};

export type Goal = {
  createdAt: string | number | Date;
  description: ReactNode;
  targetDate: string | number | Date;
  id: number;
  title: string;
  status: "Not Started" | "In Progress" | "Done";
};
