"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Journal } from "@/types";
import { motion } from "framer-motion";
import { BookOpenCheck, CalendarDays } from "lucide-react";

type Props = {
  journals: Journal[];
};

export function JournalCard({ journals }: Props) {
  const totalJournals = journals.length;

  const latest = journals
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const latestDate = latest ? new Date(latest.date).toLocaleDateString() : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <Card className="bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5" />
            Journal Entries
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div>
            Total Written: <strong>{totalJournals}</strong>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Last Entry: <span className="font-semibold">{latestDate}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
