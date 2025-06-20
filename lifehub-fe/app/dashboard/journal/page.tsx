"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createJournal, deleteJournal, getJournals } from "@/lib/api";
import EmojiPicker from "emoji-picker-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [logs, setLogs] = useState<
    {
      id: number;
      title: string;
      content: string;
      mood: string | null;
      date: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const fetchLogs = async () => {
    try {
      const res = await getJournals();
      const mapped = res.map((log) => ({
        id: log.id,
        title: String(log.title),
        content: log.content,
        mood: log.mood,
        date: new Date(log.date).toLocaleDateString(),
      }));
      setLogs(mapped);
    } catch (err) {
      toast.error("Failed to load journal entries");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const saveEntry = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      setLoading(true);
      await createJournal({ title, content, mood: selectedMood || "" });
      toast.success("Journal saved");
      setTitle("");
      setContent("");
      setSelectedMood(null);
      fetchLogs();
    } catch (err) {
      toast.error("Failed to save journal");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJournal(id);
      toast.success("Entry deleted");
      fetchLogs();
    } catch (err) {
      toast.error("Failed to delete entry");
    }
  };

  const paginatedLogs = logs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">📝 Daily Journal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Journal title"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What’s on your mind today?"
            className="min-h-[120px]"
          />

          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-fit"
            >
              {selectedMood ? `Mood: ${selectedMood}` : "Select Mood"}
            </Button>

            {showEmojiPicker && (
              <div className="z-10 border rounded-md w-fit">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setSelectedMood(emojiData.emoji);
                    setShowEmojiPicker(false);
                  }}
                  height={350}
                />
              </div>
            )}
          </div>

          <Button onClick={saveEntry} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">📚 Your Journals</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {logs.length === 0 ? (
            <p className="text-gray-400">No journal entries yet.</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Mood</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell className="font-medium">{log.title}</TableCell>
                      <TableCell className="whitespace-pre-wrap text-muted-foreground">
                        {log.content}
                      </TableCell>
                      <TableCell>{log.mood}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(log.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">Page {page}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setPage((p) => (p * pageSize < logs.length ? p + 1 : p))
                  }
                  disabled={page * pageSize >= logs.length}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
