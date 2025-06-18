"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SectionCards() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Tasks Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">18</p>
          <Progress value={75} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Habits Tracked</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">12/14</p>
          <Progress value={85} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">6</p>
          <Progress value={40} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Goals Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">3/5</p>
          <Progress value={60} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
}
