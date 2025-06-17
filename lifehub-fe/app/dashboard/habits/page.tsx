"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuthToken } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Habit = {
  id: number;
  title: string;
  frequency: string;
  completed: boolean;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";

  const fetchHabits = async () => {
    const res = await fetch(`${API}/api/habits`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await res.json();
    setHabits(data);
  };

  const addHabit = async () => {
    if (!title.trim()) return;
    await fetch(`${API}/api/habits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, frequency }),
    });
    setTitle("");
    fetchHabits();
  };

  const toggleHabit = async (id: number) => {
    await fetch(`${API}/api/habits/${id}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    fetchHabits();
  };

  const deleteHabit = async (id: number) => {
    await fetch(`${API}/api/habits/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🧘 Habits</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Enter new habit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="rounded-md border p-2 text-sm dark:bg-slate-800"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <Button onClick={addHabit}>Add</Button>
      </div>

      <div className="space-y-3">
        {habits.length === 0 && (
          <p className="text-muted-foreground">No habits yet.</p>
        )}
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800"
          >
            <div>
              <h3
                className={`font-medium ${
                  habit.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {habit.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Frequency: {habit.frequency}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => toggleHabit(habit.id)}>
                Toggle
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteHabit(habit.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
