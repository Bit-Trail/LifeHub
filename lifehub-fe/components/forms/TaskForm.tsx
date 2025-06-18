"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "@/lib/api";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess: () => void;
};

export function TaskForm({ open, setOpen, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    await createTask({ title, date });
    setTitle("");
    setDate("");
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">Add New Task</h2>
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onClick={handleSubmit}>Create Task</Button>
      </DialogContent>
    </Dialog>
  );
}
