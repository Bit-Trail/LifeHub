"use client";

import { Journal } from "@/types";
import { deleteJournal } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Props {
  journals: Journal[];
  onUpdate: () => void;
}

export function JournalTable({ journals, onUpdate }: Props) {
  if (!Array.isArray(journals)) return null;

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Entry</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {journals.map((journal) => (
            <tr key={journal.id} className="border-t dark:border-zinc-700">
              <td className="px-4 py-2">
                {new Date(journal.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{journal.content}</td>
              <td className="px-4 py-2 text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteJournal(journal.id).then(onUpdate)}
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
