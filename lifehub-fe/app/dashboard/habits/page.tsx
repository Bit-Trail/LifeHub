"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HabitCard } from "@/components/cards/HabitCard";
import { HabitForm } from "@/components/forms/HabitForm";
import { getHabits } from "@/lib/api";
import { Habit } from "@/types";

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  const fetchHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Habits</h1>
        <Button onClick={() => setOpen(true)}>+ Add Habit</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {habits.map((habit) => (
          <HabitCard habits={habits} onUpdate={fetchData} />
        ))}
      </div>

      <HabitForm open={open} setOpen={setOpen} onSuccess={fetchHabits} />
    </div>
  );
}
