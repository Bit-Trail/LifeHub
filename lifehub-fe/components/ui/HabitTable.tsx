"use client";

import { Habit } from "@/types";
import { Button } from "@/components/ui/button";
import { toggleHabitDay } from "@/lib/api";

interface Props {
  habits: Habit[];
  onUpdate: () => void;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HabitTable({ habits, onUpdate }: Props) {
  function deleteHabit(id: number) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-center" colSpan={7}>
              Days
            </th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id} className="border-t dark:border-zinc-700">
              <td className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-200">
                {habit.title}
              </td>
              {days.map((day) => (
                <td key={day} className="px-2 py-2 text-center">
                  <Button
                    size="icon"
                    variant={habit.completed ? "default" : "outline"}
                    className="h-6 w-6 text-xs"
                    onClick={() => toggleHabitDay(habit.id, day).then(onUpdate)}
                  >
                    {day[0]}
                  </Button>
                </td>
              ))}
              <td className="px-4 py-2 text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    deleteHabit(habit.id);
                    onUpdate();
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
