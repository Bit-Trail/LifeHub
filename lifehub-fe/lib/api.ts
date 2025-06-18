import { getAuthToken } from "./utils";

const BASE_URL = "http://localhost:3030/api";

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
export const getTasks = () => api("/tasks");
export const createTask = (data: { title: string }) =>
  api("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const toggleTask = (id: number) =>
  api(`/tasks/${id}/toggle`, { method: "PATCH" });
export const deleteTask = (id: number) =>
  api(`/tasks/${id}`, { method: "DELETE" });

//
// ✅ HABITS
//
export const getHabits = () => api("/habits");
export const createHabit = (data: { title: string; frequency: string }) =>
  api("/habits", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const toggleHabit = (id: number) =>
  api(`/habits/${id}/toggle`, { method: "PATCH" });
export const deleteHabit = (id: number) =>
  api(`/habits/${id}`, { method: "DELETE" });

//
// ✅ JOURNALS
//
export const getJournals = () => api("/journals");
export const createJournal = (data: {
  title: string;
  content: string;
  mood?: string;
}) =>
  api("/journals", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const deleteJournal = (id: number) =>
  api(`/journals/${id}`, { method: "DELETE" });

//
// ✅ GOALS
//
export const getGoals = () => api("/goals");
export const createGoal = (data: {
  title: string;
  description?: string;
  targetDate: string;
}) =>
  api("/goals", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateGoal = (
  id: number,
  data: {
    title: string;
    description?: string;
    status?: string;
    targetDate: string;
  }
) =>
  api(`/goals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
export const deleteGoal = (id: number) =>
  api(`/goals/${id}`, { method: "DELETE" });