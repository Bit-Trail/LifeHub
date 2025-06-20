"use client";

import { useEffect, useState } from "react";
import { Habit } from "@/types";
import { getAuthToken } from "@/lib/utils";
import { toast } from "sonner";
import { HabitForm } from "@/components/habits/HabitForm";
import { HabitList } from "@/components/habits/HabitList";

export default function HabitPage() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    try {
      const res = await fetch("http://localhost:3030/api/habits", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch habits");
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      toast.error("Error loading habits");
    }
  };

  const deleteHabit = async (id: number) => {
    try {
      await fetch(`http://localhost:3030/api/habits/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      toast.success("Habit deleted");
      fetchHabits();
    } catch (err) {
      toast.error("Failed to delete habit");
    }
  };

  const toggleHabitDay = async (id: number, day: string) => {
    try {
      await fetch(`http://localhost:3030/api/habits/${id}/toggle/${day}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      fetchHabits();
    } catch (err) {
      toast.error("Failed to toggle habit day");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">🧠 Habits</h2>
        <HabitForm onCreate={fetchHabits} />
      </div>

      {habits.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No habits found. Start by adding one!
        </p>
      ) : (
        <HabitList
          habits={habits}
          onDelete={deleteHabit}
          onToggle={toggleHabitDay}
          onUpdate={fetchHabits}
          showStreakDetails={true}
        />
      )}
    </div>
  );
}
