"use client";

import { Goal } from "@/types";
import { Button } from "@/components/ui/button";
import { deleteGoal } from "@/lib/api";
import { format } from "date-fns";

type Props = {
  goals: Goal[];
  onUpdate: () => void;
};

export function GoalTable({ goals, onUpdate }: Props) {
  if (!goals || goals.length === 0) {
    return <p className="text-muted-foreground">No goals yet.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Target Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal.id} className="border-t dark:border-zinc-700">
              <td className="px-4 py-2">{goal.title}</td>
              <td className="px-4 py-2">
                {format(new Date(goal.targetDate), "dd MMM yyyy")}
              </td>
              <td className="px-4 py-2">{goal.status ?? "In Progress"}</td>
              <td className="px-4 py-2 flex justify-end">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteGoal(goal.id).then(onUpdate)}
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
