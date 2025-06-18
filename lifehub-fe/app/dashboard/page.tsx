"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, getDashboardPreview } from "@/lib/api";
import { format } from "date-fns";
import { BadgeCheck, ListTodo, BookText, Target } from "lucide-react";
import { getTasks, getHabits, getJournals, getGoals } from "@/lib/api";
import { Task, Habit, Journal, Goal } from "@/types";
import { TaskCard } from "@/components/cards/TaskCard";
import { HabitCard } from "@/components/cards/HabitCard";
import { JournalCard } from "@/components/cards/JournalCard";
import { GoalCard } from "@/components/cards/GoalCard";

type Stats = {
  tasks: number;
  habits: number;
  journals: number;
  goals: number;
};

type Preview = {
  tasks: any[];
  habits: any[];
  journals: any[];
  goals: any[];
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  const today = format(new Date(), "eeee, MMMM d");

  const summaryCards = [
    {
      title: "Tasks",
      value: stats?.tasks ?? "-",
      icon: <ListTodo className="h-6 w-6 text-indigo-600" />,
      color: "bg-indigo-100",
    },
    {
      title: "Habits",
      value: stats?.habits ?? "-",
      icon: <BadgeCheck className="h-6 w-6 text-emerald-600" />,
      color: "bg-emerald-100",
    },
    {
      title: "Journals",
      value: stats?.journals ?? "-",
      icon: <BookText className="h-6 w-6 text-rose-600" />,
      color: "bg-rose-100",
    },
    {
      title: "Goals",
      value: stats?.goals ?? "-",
      icon: <Target className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-100",
    },
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchData = async () => {
    const [taskRes, habitRes, journalRes, goalRes] = await Promise.all([
      getTasks(),
      getHabits(),
      getJournals(),
      getGoals(),
    ]);
    setTasks(taskRes);
    setHabits(habitRes);
    setJournals(journalRes);
    setGoals(goalRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* 🧠 Hero */}
      <div className="bg-gradient-to-br from-zinc-800 to-indigo-900 text-white rounded-xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome back, Akshay 👋</h1>
        <p className="text-sm text-zinc-300 mt-1">{today}</p>
      </div>

      {/* 📊 Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 shadow-md border flex flex-col gap-2 justify-between hover:scale-[1.02] transition-all duration-200 ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{card.title}</span>
              {card.icon}
            </div>
            <div className="text-3xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 p-4 md:p-6">
        <TaskCard tasks={tasks} onUpdate={fetchData} />
        <HabitCard habits={habits} onUpdate={fetchData} />
        <JournalCard journals={journals} onUpdate={fetchData} />
        <GoalCard goals={goals} onUpdate={fetchData} />
      </div>
    </div>
  );
}
