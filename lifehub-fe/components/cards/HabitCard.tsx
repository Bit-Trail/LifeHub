"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Habit } from "@/types";
import { motion } from "framer-motion";
import { Flame, CalendarCheck } from "lucide-react";

type Props = {
  habits: Habit[];
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HabitCard({ habits }: Props) {
  const totalHabits = habits.length;

  // Track completion frequency (demo logic)
  const weeklyStreak = habits.reduce((acc, habit) => {
    const freq = habit.frequency?.split(",") || [];
    freq.forEach((day: string) => {
      const key = day.trim();
      if (key) acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="w-5 h-5" />
            Habit Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 md:grid-cols-7 gap-4 text-center">
          {weekdays.map((day) => (
            <div key={day}>
              <p className="text-xs">{day}</p>
              <p className="text-xl font-bold">{weeklyStreak[day] || 0}</p>
            </div>
          ))}
          <div className="col-span-4 md:col-span-7 pt-2 text-sm text-center">
            <CalendarCheck className="inline-block w-4 h-4 mr-1" />
            Total Habits: <strong>{totalHabits}</strong>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
