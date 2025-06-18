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
  { date: "Mon", tasks: 4 },
  { date: "Tue", tasks: 6 },
  { date: "Wed", tasks: 3 },
  { date: "Thu", tasks: 5 },
  { date: "Fri", tasks: 2 },
  { date: "Sat", tasks: 7 },
  { date: "Sun", tasks: 4 },
];

export function ChartAreaInteractive() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">Productivity This Week</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#4f46e5"
            fillOpacity={1}
            fill="url(#colorTasks)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
