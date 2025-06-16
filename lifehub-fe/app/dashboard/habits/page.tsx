"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const days = ["M", "T", "W", "T", "F", "S", "S"];

type Habit = {
  id: number;
  name: string;
  streak: boolean[];
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newHabit,
        streak: [false, false, false, false, false, false, false],
      },
    ]);
    setNewHabit("");
  };

  const toggleDay = (habitId: number, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              streak: habit.streak.map((val, idx) =>
                idx === dayIndex ? !val : val
              ),
            }
          : habit
      )
    );
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Add new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <Button onClick={addHabit}>Add</Button>
        </div>

        {habits.length === 0 ? (
          <p className="text-gray-400">No habits yet. Add one!</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-8 text-center font-medium text-gray-300">
              <div className="text-left pl-2">Habit</div>
              {days.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            {habits.map((habit) => (
              <div
                key={habit.id}
                className="grid grid-cols-8 items-center text-center bg-white/5 p-3 rounded-md"
              >
                <div className="text-left pl-2 text-white">{habit.name}</div>
                {habit.streak.map((checked, idx) => (
                  <Checkbox
                    key={idx}
                    checked={checked}
                    onCheckedChange={() => toggleDay(habit.id, idx)}
                    className="mx-auto"
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
