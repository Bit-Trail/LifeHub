"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createGoal } from "@/lib/api";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess: () => void;
};

export function GoalForm({ open, setOpen, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !targetDate) return;

    await createGoal({ title, description, targetDate });
    setTitle("");
    setDescription("");
    setTargetDate("");
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">Add Goal</h2>
        <Input
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <Button onClick={handleSubmit}>Save Goal</Button>
      </DialogContent>
    </Dialog>
  );
}
