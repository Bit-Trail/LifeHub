"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types";
import { getAuthToken } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { TaskItem } from "@/components/tasks/TaskItem";
import { TaskForm } from "@/components/tasks/TaskForm";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"WORK" | "PERSONAL">(
    "WORK"
  );
  const [view, setView] = useState<"list" | "table">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("dueDateAsc");

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3030/api/tasks", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    }
  };

  const handleConnectGoogle = () => {
    window.location.href = "http://localhost:3030/api/google/auth";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filterTasksByCategory = (category: "WORK" | "PERSONAL") => {
    let filtered = tasks.filter((task) => task.category === category);

    if (searchTerm.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "dueDateAsc") {
      filtered.sort(
        (a, b) =>
          new Date(a.dueDate || 0).getTime() -
          new Date(b.dueDate || 0).getTime()
      );
    } else if (sortOption === "dueDateDesc") {
      filtered.sort(
        (a, b) =>
          new Date(b.dueDate || 0).getTime() -
          new Date(a.dueDate || 0).getTime()
      );
    }

    const today = new Date();

    const done = filtered.filter((task) => task.completed);
    const inProgress = filtered.filter(
      (task) =>
        !task.completed && task.dueDate && new Date(task.dueDate) > today
    );
    const due = filtered.filter(
      (task) =>
        !task.completed && task.dueDate && new Date(task.dueDate) <= today
    );

    const total = filtered.length;
    const percentage = total > 0 ? Math.round((done.length / total) * 100) : 0;

    return { done, inProgress, due, percentage };
  };

  const { done, inProgress, due, percentage } =
    filterTasksByCategory(selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">📝 Tasks</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-40"
          />
          <Select value={sortOption} onValueChange={(v) => setSortOption(v)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDateAsc">Due Date ↑</SelectItem>
              <SelectItem value="dueDateDesc">Due Date ↓</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleConnectGoogle}>
            🔗 Connect Google
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            List View
          </Button>
          <Button
            variant={view === "table" ? "default" : "outline"}
            onClick={() => setView("table")}
          >
            Table View
          </Button>
          <TaskForm onCreate={fetchTasks} />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-1">
          Completion: {percentage}%
        </p>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <Tabs
        defaultValue="WORK"
        onValueChange={(v) => setSelectedCategory(v as "WORK" | "PERSONAL")}
      >
        <TabsList>
          <TabsTrigger value="WORK">Work</TabsTrigger>
          <TabsTrigger value="PERSONAL">Personal</TabsTrigger>
        </TabsList>

        <TabsContent value="WORK" className="space-y-6">
          <CategoryGroup
            title="✅ Done"
            tasks={done}
            onUpdate={fetchTasks}
            view={view}
          />
          <CategoryGroup
            title="🕒 In Progress"
            tasks={inProgress}
            onUpdate={fetchTasks}
            view={view}
          />
          <CategoryGroup
            title="🔴 Due / Overdue"
            tasks={due}
            onUpdate={fetchTasks}
            view={view}
          />
        </TabsContent>

        <TabsContent value="PERSONAL" className="space-y-6">
          <CategoryGroup
            title="✅ Done"
            tasks={done}
            onUpdate={fetchTasks}
            view={view}
          />
          <CategoryGroup
            title="🕒 In Progress"
            tasks={inProgress}
            onUpdate={fetchTasks}
            view={view}
          />
          <CategoryGroup
            title="🔴 Due / Overdue"
            tasks={due}
            onUpdate={fetchTasks}
            view={view}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CategoryGroup({
  title,
  tasks,
  onUpdate,
  view,
}: {
  title: string;
  tasks: Task[];
  onUpdate: () => void;
  view: "list" | "table";
}) {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      {view === "list" ? (
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <TaskItem task={task} onUpdate={onUpdate} />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1 pr-2">Title</th>
                <th className="py-1 pr-2">Due</th>
                <th className="py-1 pr-2">Reminder</th>
                <th className="py-1 pr-2">Status</th>
                <th className="py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-muted/40">
                  <td className="py-2 pr-2">{task.title}</td>
                  <td className="py-2 pr-2">
                    {task.dueDate
                      ? format(new Date(task.dueDate), "dd MMM yyyy")
                      : "—"}
                  </td>
                  <td className="py-2 pr-2">
                    {task.reminderAt
                      ? format(new Date(task.reminderAt), "dd MMM yyyy")
                      : "—"}
                  </td>
                  <td className="py-2 pr-2">
                    {task.completed ? "✅ Done" : "🕒 Pending"}
                  </td>
                  <td className="py-2">
                    <TaskItem task={task} onUpdate={onUpdate} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
