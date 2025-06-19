"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Task } from "@/types";

type Props = {
  onCreate: () => void;
  editMode?: boolean;
  task?: Task;
  onCancel?: () => void;
};

export function TaskForm({
  onCreate,
  editMode = false,
  task,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(task?.title || "");
  const [category, setCategory] = useState<"WORK" | "PERSONAL">(
    task?.category || "WORK"
  );
  const [dueDate, setDueDate] = useState(task?.dueDate?.slice(0, 10) || "");

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Task title required");

    try {
      const endpoint = editMode
        ? `http://localhost:3030/api/tasks/${task?.id}`
        : "http://localhost:3030/api/tasks";

      const method = editMode ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ title, category, dueDate: dueDate || null }),
      });

      if (!res.ok) throw new Error("Failed to save task");

      toast.success(editMode ? "Task updated" : "Task added");
      onCreate();
      setTitle("");
      setDueDate("");
      setCategory("WORK");
    } catch (err) {
      console.error(err);
      toast.error("Error saving task");
    }
  };

  return (
    <div className="flex gap-2 items-center flex-wrap mt-2">
      <Input
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-48"
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-36"
      />
      <Select
        value={category}
        onValueChange={(v) => setCategory(v as "WORK" | "PERSONAL")}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="WORK">Work</SelectItem>
          <SelectItem value="PERSONAL">Personal</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit}>{editMode ? "Update" : "Add"}</Button>
      {editMode && onCancel && (
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </div>
  );
}
