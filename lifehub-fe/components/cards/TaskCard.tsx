"use client";

import { Task } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  tasks: Task[];
};

export function TaskCard({ tasks }: Props) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="group relative rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 shadow-md transition-all"
    >
      <div className="absolute top-4 right-4 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md">
        {tasks.length} Total
      </div>

      <div className="text-3xl font-bold mb-2 flex items-center gap-2">
        📝 Tasks
      </div>

      <p className="text-sm text-white/80 mb-4">
        {completedCount} Completed • {pendingCount} Pending
      </p>

      <Link
        href="/dashboard/tasks"
        className="inline-block bg-white text-blue-600 font-semibold rounded-md px-4 py-2 text-sm hover:bg-white/90 transition"
      >
        View All Tasks
      </Link>
    </motion.div>
  );
}
