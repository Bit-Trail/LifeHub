"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", mood: 2 },
  { day: "Tue", mood: 4 },
  { day: "Wed", mood: 3 },
  { day: "Thu", mood: 5 },
  { day: "Fri", mood: 1 },
  { day: "Sat", mood: 2 },
  { day: "Sun", mood: 4 },
];

export function ChartJournalMood() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Line type="monotone" dataKey="mood" stroke="#8b5cf6" />
      </LineChart>
    </ResponsiveContainer>
  );
}
