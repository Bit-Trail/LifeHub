"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "@/types";
import { motion } from "framer-motion";
import { Target, CheckCircle, Clock9 } from "lucide-react";

type Props = {
  goals: Goal[];
};

export function GoalCard({ goals }: Props) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "Done").length;
  const inProgressGoals = goals.filter(
    (g) => g.status === "In Progress"
  ).length;

  const upcoming = goals
    .filter((g) => new Date(g.targetDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    )[0];

  const upcomingText = upcoming
    ? `${upcoming.title} (${new Date(
        upcoming.targetDate
      ).toLocaleDateString()})`
    : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5" />
            Goal Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div>
            Total Goals: <strong>{totalGoals}</strong>
          </div>
          <div>
            Completed: <span className="font-semibold">{completedGoals}</span> /
            In Progress:{" "}
            <span className="font-semibold">{inProgressGoals}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock9 className="w-4 h-4" />
            Upcoming Goal: <span className="font-medium">{upcomingText}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
