"use client";

import { Goal } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { format } from "date-fns";

export function GoalCard({
  goal,
  onDelete,
}: {
  goal: Goal;
  onDelete: (id: number) => void;
}) {
  const daysLeft = Math.ceil(
    (new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const overdue = daysLeft < 0 && goal.status !== "Done";

  const badge =
    goal.status === "Done"
      ? { text: "Completed", color: "bg-green-100 text-green-800" }
      : overdue
      ? { text: "Overdue", color: "bg-red-100 text-red-800" }
      : { text: "In Progress", color: "bg-yellow-100 text-yellow-800" };

  return (
    <Card className="border shadow-sm hover:shadow-md transition">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          <GripVertical className="w-4 h-4 opacity-50" />
        </div>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {goal.description || "—"}
        </p>

        <div className="flex justify-between items-center pt-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              🎯 {format(new Date(goal.targetDate), "dd MMM yyyy")}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded ${badge.color}`}>
              {badge.text}
            </span>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(goal.id)}
            title="Delete Goal"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
