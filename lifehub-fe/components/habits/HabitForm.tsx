"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createHabit } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  onCreate: () => void;
}

export function HabitForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    await createHabit({ title, emoji: "", frequency });
    setTitle("");
    setFrequency("daily");
    onCreate();
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="New habit..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="border rounded-md px-2 py-1 text-sm"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
}
