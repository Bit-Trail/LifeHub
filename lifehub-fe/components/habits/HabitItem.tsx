"use client";

import { Habit } from "@/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface Props {
  habit: Habit;
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number, day: string) => Promise<void>;
  onUpdate: () => Promise<void>;
  showStreakDetails: boolean;
}

export default function HabitItem({
  habit,
  onDelete,
  onToggle,
  onUpdate,
  showStreakDetails,
}: Props) {
  const tracked = habit.tracked ?? {};
  const createdAt = new Date(habit.createdAt);
  const today = new Date();
  const [offset, setOffset] = useState(0);

  const isWeekly = habit.frequency === "weekly";
  const daysToRender = isWeekly ? 7 : 21;
  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + offset * daysToRender);

  const renderTrackLog = () => {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < daysToRender; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() - (daysToRender - i - 1));
      const formatted = date.toISOString().split("T")[0];
      const completed = tracked[formatted] ?? false;
      const diffDays = Math.floor(
        (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      const isFuture = date > today;
      const isToggleable = diffDays >= 0 && diffDays <= 2;

      const bgColor = completed
        ? "bg-green-500 text-white"
        : isToggleable
        ? "bg-red-500 text-white"
        : "bg-muted text-muted-foreground";

      const displayDate = isWeekly
        ? `Week of ${date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })}`
        : date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          });

      elements.push(
        <button
          key={i}
          disabled={!isToggleable}
          onClick={() => onToggle(habit.id, formatted)}
          className={`rounded-lg px-3 py-2 text-xs text-center border transition-all ${bgColor} ${
            !isToggleable ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <div>{displayDate}</div>
        </button>
      );

      if (isWeekly) i += 6; // Skip next 6 days for weekly tracking
    }

    return elements;
  };

  return (
    <div className="border p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-base">{habit.title}</div>
          <div className="text-sm text-muted-foreground">
            Frequency: {habit.frequency} | Started on:{" "}
            {createdAt.toDateString()}
          </div>
        </div>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(habit.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {showStreakDetails && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-muted-foreground">
              Streak Log
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOffset((prev) => prev - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOffset((prev) => prev + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">{renderTrackLog()}</div>
        </div>
      )}
    </div>
  );
}
