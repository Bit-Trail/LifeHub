"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Goal = {
  id: number;
  title: string;
  target: number;
  current: number;
  type: "short" | "long";
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [draft, setDraft] = useState({
    title: "",
    target: 0,
    type: "short" as "short" | "long",
  });

  const addGoal = () => {
    if (!draft.title.trim() || draft.target <= 0) return;
    setGoals((prev) => [...prev, { id: Date.now(), ...draft, current: 0 }]);
    setDraft({ title: "", target: 0, type: "short" });
  };

  const bumpProgress = (id: number) =>
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, current: Math.min(g.current + 1, g.target) } : g
      )
    );

  const Section = ({ type }: { type: "short" | "long" }) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-3 capitalize">{type} term</h3>
      {goals.filter((g) => g.type === type).length === 0 && (
        <p className="text-gray-500 mb-4">No {type}-term goals yet.</p>
      )}
      {goals
        .filter((g) => g.type === type)
        .map((goal) => {
          const pct = Math.round((goal.current / goal.target) * 100);
          return (
            <Card key={goal.id} className="bg-white/5">
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span>{goal.title}</span>
                  <Button size="sm" onClick={() => bumpProgress(goal.id)}>
                    +1
                  </Button>
                </div>
                <Progress value={pct} className="h-2" />
                <p className="text-xs text-right mt-1">
                  {goal.current}/{goal.target} ({pct}%)
                </p>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* add goal form */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Goal title (e.g. Read 20 books)"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Target"
            value={draft.target || ""}
            onChange={(e) =>
              setDraft({ ...draft, target: Number(e.target.value) })
            }
            className="max-w-[120px]"
          />
          <select
            value={draft.type}
            onChange={(e) =>
              setDraft({ ...draft, type: e.target.value as "short" | "long" })
            }
            className="rounded-md bg-gray-800 text-white px-3"
          >
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>
          <Button onClick={addGoal}>Add Goal</Button>
        </div>

        {/* goals lists */}
        <div className="space-y-8">
          <Section type="short" />
          <Section type="long" />
        </div>
      </CardContent>
    </Card>
  );
}
