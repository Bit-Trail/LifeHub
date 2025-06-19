"use client";

import { useEffect, useState } from "react";
import { getTasks, getHabits, getJournals, getGoals } from "@/lib/api";
import { Task, Habit, Journal, Goal } from "@/types";
import { TaskCard } from "@/components/cards/TaskCard";
import { GoalCard } from "@/components/cards/GoalCard";
import { HabitCard } from "@/components/cards/HabitCard";
import { JournalCard } from "@/components/cards/JournalCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6 lg:px-8 xl:px-10">
      <h2 className="text-3xl font-bold mb-6">📊 LifeHub Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <TaskCard tasks={filteredTasks} />
        <HabitCard habits={habits} />
        <GoalCard goals={goals} />
        <JournalCard journals={journals} />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Task Categories</h3>
        <Tabs defaultValue="personal" onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="personal">🧘 Personal</TabsTrigger>
            <TabsTrigger value="professional">💼 Professional</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              {goals.slice(0, 3).map((goal) => (
                <li key={goal.id}>{goal.title}</li>
              ))}
              {goals.length === 0 && <li>No goals found</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
