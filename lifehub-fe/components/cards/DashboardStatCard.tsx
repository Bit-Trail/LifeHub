"use client";

import { Card } from "@/components/ui/card";

interface DashboardStatCardProps {
  title: string;
  count: number;
  icon?: string;
}

export function DashboardStatCard({
  title,
  count,
  icon,
}: DashboardStatCardProps) {
  return (
    <Card className="p-4 shadow-sm border rounded-xl bg-white dark:bg-muted flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="text-3xl font-bold text-primary mt-2">{count}</div>
    </Card>
  );
}
