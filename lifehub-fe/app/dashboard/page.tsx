"use client";

import { useEffect, useState } from "react";
import { getTasks, getHabits, getJournals, getGoals } from "@/lib/api";
import { Task, Habit, Journal, Goal } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStatCard } from "@/components/cards/DashboardStatCard";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("personal");

  const fetchData = async () => {
    const [taskRes, habitRes, journalRes, goalRes] = await Promise.all([
      getTasks(),
      getHabits(),
      getJournals(),
      getGoals(),
    ]);
    setTasks(Array.isArray(taskRes) ? taskRes : []);
    setHabits(Array.isArray(habitRes) ? habitRes : []);
    setJournals(Array.isArray(journalRes) ? journalRes : []);
    setGoals(Array.isArray(goalRes) ? goalRes : []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTasks = tasks.filter(
    (task) => task.category === selectedCategory
  );

  return (
    <div className="flex flex-col gap-8 px-6 py-8">
      <h2 className="text-3xl font-bold mb-4">📊 LifeHub Overview</h2>

      {/* 🧮 Stat Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardStatCard title="Tasks" count={tasks.length} icon="📝" />
        <DashboardStatCard title="Habits" count={habits.length} icon="🔥" />
        <DashboardStatCard
          title="Goals in Progress"
          count={goals.filter((g) => g.status !== "Done").length}
          icon="🎯"
        />
        <DashboardStatCard title="Journals" count={journals.length} icon="📓" />
      </div>

      {/* 🧠 AI Insight Placeholder */}
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">🧠 AI Insights</h3>
        <p className="text-sm text-muted-foreground">
          You’ve completed 70% of your tasks this week. Keep the momentum going!
          ✨
        </p>
      </div>

      {/* 🔘 Task Filter Tabs */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Task Categories</h3>
        <Tabs defaultValue="personal" onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="WORK">🧘 WORK</TabsTrigger>
            <TabsTrigger value="PERSONAL">💼 PERSONAL</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <div className="mt-4 space-y-2">
              {filteredTasks.length ? (
                filteredTasks.map((task) => (
                  <div key={task.id} className="text-sm text-muted-foreground">
                    • {task.title}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No personal tasks found.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="professional">
            <div className="mt-4 space-y-2">
              {filteredTasks.length ? (
                filteredTasks.map((task) => (
                  <div key={task.id} className="text-sm text-muted-foreground">
                    • {task.title}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No professional tasks found.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 📝 Latest Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <h4 className="text-lg font-medium mb-3">📝 Latest Tasks</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              {filteredTasks.slice(0, 5).map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
              {filteredTasks.length === 0 && <li>No tasks available</li>}
            </ul>
          </div>
        </div>

        {/* Habits & Goals */}
        <div className="grid gap-4">
          <div className="rounded-xl border bg-background p-4">
            <h4 className="text-sm font-semibold">🔥 Active Habits</h4>
            <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
              {habits.slice(0, 3).map((habit) => (
                <li key={habit.id}>{habit.title}</li>
              ))}
              {habits.length === 0 && <li>No habits found</li>}
            </ul>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <h4 className="text-sm font-semibold">🎯 Goals in Progress</h4>
            <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
              {goals
                .filter((g) => g.status !== "Done")
                .slice(0, 3)
                .map((goal) => (
                  <li key={goal.id}>{goal.title}</li>
                ))}
              {goals.filter((g) => g.status !== "Done").length === 0 && (
                <li>No goals found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
