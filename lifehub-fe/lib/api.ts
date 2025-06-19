import { getAuthToken } from "./utils";
import { Habit, Journal, Task, Goal } from "@/types";


const BASE_URL = "http://localhost:3030/api";

function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

// Shared request function
async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error || "API error");
  }

  return response.json();
}

// Dashboard stats
export async function getDashboardStats() {
  const res = await fetch("http://localhost:3030/api/stats", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch stats");

  return res.json(); // { tasks: 4, habits: 2, goals: 1, journals: 5 }
}

// Dashboard preview
export async function getDashboardPreview() {
  const res = await fetch("http://localhost:3030/api/stats/preview", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load preview");

  return res.json(); // { tasks: [], habits: [], journals: [], goals: [] }
}

//
// 🔐 AUTH
//
export const login = (data: { email: string; password: string }) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const register = (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

//
// ✅ TASKS
//
export async function getTasks(): Promise<Task[]> {
  const token = getToken();
  if (!token) throw new Error("Missing token");

  const res = await fetch("http://localhost:3030/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
}

export async function createTask(data: { title: string; date: string }) {
  const token = getToken();
  if (!token) throw new Error("Missing token");

  const res = await fetch("http://localhost:3030/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create task");
  }
}

export async function deleteTask(id: number) {
  const token = getToken();
  if (!token) throw new Error("Missing token");

  const res = await fetch(`http://localhost:3030/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete task");
}

export async function toggleTaskDone(id: number) {
  const token = getToken();
  if (!token) throw new Error("Missing token");

  const res = await fetch(`http://localhost:3030/api/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to toggle task");
}

//
// ✅ HABITS
//
export async function getHabits(): Promise<Habit[]> {
  const res = await fetch("http://localhost:3030/api/habits", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return res.json();
}

// ✅ Create habit
export async function createHabit(data: { title: string; emoji: string, frequency: string }) {
  await fetch("http://localhost:3030/api/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(data),
  });
}

// ✅ Toggle a habit day
export async function toggleHabitDay(id: number, day: string) {
  await fetch(`http://localhost:3030/api/habits/${id}/toggle/${day}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
}


//
// ✅ JOURNALS
//
export async function getJournals(): Promise<Journal[]> {
  const res = await fetch("http://localhost:3030/api/journals", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return res.json();
}

export async function createJournal(data: { content: string }) {
  await fetch("http://localhost:3030/api/journals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteJournal(id: number): Promise<void> {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/journals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete journal");
  }
}

//
// ✅ GOALS
//
export async function getGoals(): Promise<Goal[]> {
  const res = await fetch("http://localhost:3030/api/goals", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return res.json();
}

export async function createGoal(data: {
  title: string;
  description?: string;
  targetDate: string;
}) {
  await fetch("http://localhost:3030/api/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(data),
  });
}

export async function updateGoalStatus(id: number, status: string) {
  await fetch(`http://localhost:3030/api/goals/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ status }),
  });
}

export const deleteGoal = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token"); // or wherever you store it

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete goal");
  }
};