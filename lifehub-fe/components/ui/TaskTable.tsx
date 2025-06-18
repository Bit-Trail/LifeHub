import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { deleteTask, toggleTaskDone } from "@/lib/api";

type Props = {
  tasks: Task[];
  onUpdate: () => void;
};

export function TaskTable({ tasks, onUpdate }: Props) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t dark:border-zinc-700">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">
                {task.date ? new Date(task.date).toLocaleDateString() : "—"}
              </td>
              <td className="px-4 py-2">
                {task.completed ? "✅ Done" : "❌ Pending"}
              </td>
              <td className="px-4 py-2 flex justify-end gap-2">
                <Button
                  size="sm"
                  onClick={() => toggleTaskDone(task.id).then(onUpdate)}
                >
                  Toggle
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteTask(task.id).then(onUpdate)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
