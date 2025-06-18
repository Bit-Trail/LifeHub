"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Not Started", value: 4 },
  { name: "In Progress", value: 6 },
  { name: "Done", value: 2 },
];

const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

export function ChartGoalStatus() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={70} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
