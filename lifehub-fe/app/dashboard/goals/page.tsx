"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GoalForm } from "@/components/forms/GoalForm";
import { GoalTable } from "@/components/ui/GoalTable";
import { getGoals } from "@/lib/api";
import { Goal } from "@/types";

export default function GoalPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [open, setOpen] = useState(false);

  const fetchGoals = async () => {
    const data = await getGoals();
    setGoals(data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Goals</h1>
        <Button onClick={() => setOpen(true)}>+ Add Goal</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <GoalTable goals={goals} onUpdate={fetchGoals} />
      </div>

      <GoalForm open={open} setOpen={setOpen} onSuccess={fetchGoals} />
    </div>
  );
}
