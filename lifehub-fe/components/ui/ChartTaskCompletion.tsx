"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 5 },
  { day: "Wed", completed: 2 },
  { day: "Thu", completed: 6 },
  { day: "Fri", completed: 1 },
  { day: "Sat", completed: 4 },
  { day: "Sun", completed: 2 },
];

export function ChartTaskCompletion() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="#4f46e5"
          fill="#c7d2fe"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
