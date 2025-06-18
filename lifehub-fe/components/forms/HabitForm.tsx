"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createHabit } from "@/lib/api";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSuccess: () => void;
};

export function HabitForm({ open, setOpen, onSuccess }: Props) {
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");

  const handleSubmit = async () => {
    await createHabit({ emoji, title, frequency });
    setEmoji("");
    setTitle("");
    setFrequency("Daily");
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">Create Habit</h2>
        <Input
          placeholder="🔥 Emoji"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />
        <Input
          placeholder="Habit Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Frequency (e.g. Daily)"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />

        <Button onClick={handleSubmit}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}
