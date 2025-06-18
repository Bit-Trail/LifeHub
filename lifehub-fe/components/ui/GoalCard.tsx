import { Goal } from "@/types";
import { Button } from "@/components/ui/button";
import { updateGoalStatus } from "@/lib/api";

type Props = {
  goal: Goal;
  onUpdate: () => void;
};

const statusFlow = ["Not Started", "In Progress", "Done"];

export function GoalCard({ goal, onUpdate }: Props) {
  const nextStatus =
    statusFlow[(statusFlow.indexOf(goal.status) + 1) % statusFlow.length];

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">{goal.title}</h2>
      <p className="text-sm mb-2">Status: {goal.status}</p>
      <p className="text-sm text-gray-500">{goal.description}</p>
      <p className="text-sm text-gray-500">
        Target: {new Date(goal.targetDate).toLocaleDateString()}
      </p>
      <Button
        size="sm"
        onClick={() => updateGoalStatus(goal.id, nextStatus).then(onUpdate)}
      >
        Mark as {nextStatus}
      </Button>
    </div>
  );
}
