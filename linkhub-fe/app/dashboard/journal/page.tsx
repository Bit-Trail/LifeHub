"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const moods = ["😄", "🙂", "😐", "😟", "😢"];

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [logs, setLogs] = useState<
    { id: number; text: string; mood: string | null; date: string }[]
  >([]);

  const saveEntry = () => {
    if (!entry.trim()) return;
    setLogs((prev) => [
      {
        id: Date.now(),
        text: entry,
        mood: selectedMood,
        date: new Date().toLocaleDateString(),
      },
      ...prev,
    ]);
    setEntry("");
    setSelectedMood(null);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Daily Journal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="What are you grateful for today?"
          className="min-h-[120px]"
        />
        <div className="flex gap-3">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`text-2xl transition ${
                selectedMood === mood
                  ? "scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
        <Button onClick={saveEntry}>Save</Button>

        <hr className="border-white/10 my-4" />

        {logs.length === 0 ? (
          <p className="text-gray-400">No journal entries yet.</p>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li key={log.id} className="bg-white/5 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
                  <span>{log.date}</span>
                  <span>{log.mood}</span>
                </div>
                <p>{log.text}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
