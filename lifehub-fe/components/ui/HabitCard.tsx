import { Habit } from "@/types";
import { Button } from "@/components/ui/button";
import { toggleHabitDay } from "@/lib/api";

type Props = {
  habit: Habit;
  onUpdate: () => void;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HabitCard({ habit, onUpdate }: Props) {
  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-2">
      <div className="text-xl">
        {habit.emoji} {habit.title}
      </div>
      <div className="flex gap-2">
        {days.map((day) => (
          <Button
            key={day}
            variant={habit.tracked?.[day] ? "default" : "outline"}
            size="sm"
            onClick={() => toggleHabitDay(habit.id, day).then(onUpdate)}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}
