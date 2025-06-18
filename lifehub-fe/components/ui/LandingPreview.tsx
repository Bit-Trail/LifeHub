"use client";

import { useEffect, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Lightbulb, TrendingUp, ClipboardCheck } from "lucide-react";

// Dummy rotating tips – feel free to add more
const TIPS = [
  "Consistency beats intensity.",
  "Win the morning, win the day.",
  "Small progress is still progress.",
  "Discipline outlasts motivation.",
];

export default function LandingPreview() {
  /**
   * Weekly progress – generate a random percentage between 60‑90% on mount
   */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(60 + Math.floor(Math.random() * 30));
  }, []);

  /**
   * Tip rotation every 5 seconds
   */
  const [tipIndex, cycleTip] = useCycle(0, 1, 2, 3);
  useEffect(() => {
    const id = setInterval(() => cycleTip(), 5000);
    return () => clearInterval(id);
  }, [cycleTip]);

  // Calendar selected date state
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-2xl p-6 shadow-xl"
    >
      {/* Weekly Progress Card */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
        <Card className="border-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
          <CardContent className="p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Weekly Progress</h3>
            </div>
            <div className="relative h-2 w-full bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2 }}
                className="absolute top-0 left-0 h-full bg-white rounded-full"
              />
            </div>
            <p className="text-2xl font-bold">{progress}%</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dynamic Calendar Card */}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />

      {/* Rotating Tip Card */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
        <Card className="border-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md">
          <CardContent className="p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Tip of the Moment</h3>
            </div>
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm"
            >
              {TIPS[tipIndex]}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Goals */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
        <Card className="border-0 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md">
          <CardContent className="p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Active Goals</h3>
            </div>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
