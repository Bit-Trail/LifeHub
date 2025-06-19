"use client";

import { useState } from "react";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { getAuthToken } from "@/lib/utils";
import { TaskForm } from "./TaskForm";
import { format } from "date-fns";

type Props = {
  task: Task;
  onUpdate: () => void;
};

export function TaskItem({ task, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleCompleted = async () => {
    try {
      const res = await fetch(
        `http://localhost:3030/api/tasks/${task.id}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to toggle");

      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3030/api/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete");

      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="flex flex-col gap-2 border rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={toggleCompleted}
            className={`border-2 rounded-full w-5 h-5 transition-colors duration-150 ${
              task.completed
                ? "border-green-500 bg-green-500"
                : "border-yellow-400"
            }`}
          />
          <div>
            <p
              className={`font-medium ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </p>
            <div className="text-xs text-muted-foreground space-x-2">
              {task.dueDate && (
                <span>📅 {format(new Date(task.dueDate), "dd MMM yyyy")}</span>
              )}
              {task.reminderAt && (
                <span>⏰ {format(new Date(task.reminderAt), "hh:mm a")}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {isEditing && (
        <TaskForm
          editMode
          task={task}
          onCreate={() => {
            setIsEditing(false);
            onUpdate();
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
