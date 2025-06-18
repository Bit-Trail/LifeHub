"use client";

import { Habit } from "@/types";
import { HabitTable } from "@/components/ui/HabitTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { HabitForm } from "@/components/forms/HabitForm";
import { motion } from "framer-motion";

interface Props {
  habits: Habit[];
  onUpdate: () => void;
}

export function HabitCard({ habits, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          💪 Habit Tracker
        </h2>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Habit
        </Button>
      </div>

      <HabitTable habits={habits} onUpdate={onUpdate} />
      <HabitForm open={open} setOpen={setOpen} onSuccess={onUpdate} />
    </motion.div>
  );
}
