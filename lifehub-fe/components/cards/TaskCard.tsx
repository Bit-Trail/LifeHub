"use client";

import { Task } from "@/types";
import { TaskTable } from "@/components/ui/TaskTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TaskForm } from "@/components/forms/TaskForm";
import { motion } from "framer-motion";

interface Props {
  tasks: Task[];
  onUpdate: () => void;
}

export function TaskCard({ tasks, onUpdate }: Props) {
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
          📋 Your Tasks
        </h2>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Task
        </Button>
      </div>

      <TaskTable tasks={tasks} onUpdate={onUpdate} />
      <TaskForm open={open} setOpen={setOpen} onSuccess={onUpdate} />
    </motion.div>
  );
}
