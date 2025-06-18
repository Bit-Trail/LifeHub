"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTaskCompletion } from "@/components/ui/ChartTaskCompletion";
import { ChartHabitTrend } from "@/components/ui/ChartHabitTrend";
import { ChartGoalStatus } from "@/components/ui/ChartGoalStatus";
import { ChartJournalMood } from "@/components/ui/ChartJournalMood";

export default function AnalyticsPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">📊 Life Analytics</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartTaskCompletion />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habit Tracking by Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartHabitTrend />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Progress Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartGoalStatus />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Journal Mood Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartJournalMood />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
