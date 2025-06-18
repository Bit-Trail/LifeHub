"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskTable } from "@/components/ui/TaskTable";
import { TaskForm } from "@/components/forms/TaskForm";
import { Task } from "@/types";
import { getTasks } from "@/lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Tasks</h1>
        <Button onClick={() => setOpen(true)}>+ Add Task</Button>
      </div>

      <TaskTable tasks={tasks} onUpdate={fetchTasks} />
      <TaskForm open={open} setOpen={setOpen} onSuccess={fetchTasks} />
    </div>
  );
}
