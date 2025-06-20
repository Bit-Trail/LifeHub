"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createGoal } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export function GoalForm({ open, setOpen, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = async () => {
    if (!title || !targetDate) {
      toast.error("Please enter both title and target date");
      return;
    }

    try {
      await createGoal({ title, description, targetDate });
      toast.success("Goal added successfully");
      setTitle("");
      setDescription("");
      setTargetDate("");
      setOpen(false);
      onSuccess();
    } catch (err) {
      toast.error("Failed to add goal");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-semibold">🎯 Create a New Goal</h2>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              placeholder="e.g. Learn Solana"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Add details or purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Target Date</Label>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Save Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
