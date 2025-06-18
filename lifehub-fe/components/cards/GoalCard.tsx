"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Goal } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GoalForm } from "@/components/forms/GoalForm";
import { GoalTable } from "@/components/ui/GoalTable";

interface Props {
  goals: Goal[];
  onUpdate: () => void;
}

export function GoalCard({ goals, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          🎯 Personal Goals
        </h2>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          New Goal
        </Button>
      </div>

      <GoalTable goals={goals} onUpdate={onUpdate} />
      <GoalForm open={open} setOpen={setOpen} onSuccess={onUpdate} />
    </motion.div>
  );
}
