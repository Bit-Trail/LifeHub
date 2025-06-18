import { Journal } from "@/types";

type Props = {
  journal: Journal;
};

export function JournalCard({ journal }: Props) {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white dark:bg-zinc-900">
      <p className="text-sm text-gray-500 mb-1">
        {new Date(journal.createdAt).toLocaleDateString()}
      </p>
      <p className="whitespace-pre-line">{journal.content}</p>
    </div>
  );
}
