"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createJournal } from "@/lib/api";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess: () => void;
};

export function JournalForm({ open, setOpen, onSuccess }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await createJournal({
      content,
    });
    setContent("");
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">New Journal Entry</h2>
        <Textarea
          rows={5}
          placeholder="What’s on your mind today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSubmit}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
