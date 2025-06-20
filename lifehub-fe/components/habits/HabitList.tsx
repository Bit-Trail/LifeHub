"use client";

import { Habit } from "@/types";
import HabitItem from "./HabitItem";

interface Props {
  habits: Habit[];
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number, day: string) => Promise<void>;
  onUpdate: () => Promise<void>;
  showStreakDetails?: boolean;
}

export function HabitList({
  habits,
  onDelete,
  onToggle,
  onUpdate,
  showStreakDetails = true,
}: Props) {
  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
          showStreakDetails={showStreakDetails}
        />
      ))}
    </div>
  );
}
