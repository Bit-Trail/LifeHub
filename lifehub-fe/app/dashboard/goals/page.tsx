"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getGoals, updateGoalStatus, deleteGoal } from "@/lib/api";
import { GoalForm } from "@/components/goals/GoalForm";
import { GoalCard } from "@/components/goals/GoalCard";
import { Goal } from "@/types";

const PAGE_SIZE = 3;

export default function GoalPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState({
    inProgress: 0,
    completed: 0,
  });

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch {
      toast.error("Failed to fetch goals");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteGoal(id);
    toast.success("Goal deleted");
    fetchGoals();
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const draggedGoal = goals.find((g) => g.id.toString() === active.id);
    if (!draggedGoal) return;

    const newStatus =
      over.id === "completed-zone" ? "Completed" : "In Progress";
    if (draggedGoal.status !== newStatus) {
      await updateGoalStatus(draggedGoal.id, newStatus);
      toast.success("Goal updated");
      fetchGoals();
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const inProgressGoals = goals.filter((g) => g.status !== "Done");
  const completedGoals = goals.filter((g) => g.status === "Done");

  const paginated = (goals: Goal[], page: number) =>
    goals.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const renderNav = (type: "inProgress" | "completed", total: number) => (
    <div className="flex justify-between mt-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          setCurrentPage((prev) => ({ ...prev, [type]: prev[type] - 1 }))
        }
        disabled={currentPage[type] === 0}
      >
        ← Prev
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          setCurrentPage((prev) => ({ ...prev, [type]: prev[type] + 1 }))
        }
        disabled={(currentPage[type] + 1) * PAGE_SIZE >= total}
      >
        Next →
      </Button>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">🎯 Your Goals</h1>
        <Button onClick={() => setOpen(true)}>+ Add Goal</Button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DropZone id="inprogress-zone" title="In Progress">
            {paginated(inProgressGoals, currentPage.inProgress).map((goal) => (
              <DraggableCard
                key={goal.id}
                goal={goal}
                onDelete={handleDelete}
              />
            ))}
            {renderNav("inProgress", inProgressGoals.length)}
          </DropZone>

          <DropZone id="completed-zone" title="Completed">
            {paginated(completedGoals, currentPage.completed).map((goal) => (
              <DraggableCard
                key={goal.id}
                goal={goal}
                onDelete={handleDelete}
              />
            ))}
            {renderNav("completed", completedGoals.length)}
          </DropZone>
        </div>
      </DndContext>

      <GoalForm open={open} setOpen={setOpen} onSuccess={fetchGoals} />
    </div>
  );
}

function DropZone({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">{title}</h2>
      <div
        ref={setNodeRef}
        className={`rounded-md border min-h-[150px] p-2 flex flex-col gap-3 transition ${
          isOver ? "bg-blue-50" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function DraggableCard({
  goal,
  onDelete,
}: {
  goal: Goal;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: goal.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GoalCard goal={goal} onDelete={onDelete} />
    </div>
  );
}
