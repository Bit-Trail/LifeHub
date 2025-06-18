"use client";

import { Journal } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { JournalForm } from "@/components/forms/JournalForm";
import { JournalTable } from "@/components/ui/JournalTable";
import { motion } from "framer-motion";

interface Props {
  journals: Journal[];
  onUpdate: () => void;
}

export function JournalCard({ journals, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          📓 Daily Journal
        </h2>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Entry
        </Button>
      </div>

      <JournalTable journals={journals} onUpdate={onUpdate} />
      <JournalForm open={open} setOpen={setOpen} onSuccess={onUpdate} />
    </motion.div>
  );
}
