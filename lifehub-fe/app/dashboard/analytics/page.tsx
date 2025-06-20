"use client";

import { useEffect, useState } from "react";
import { getInsights } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

type AIResponse = {
  highlights?: string[];
  issues?: string[];
  actions?: string[];
  reply?: string;
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState<AIResponse | null>(null);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);

  useEffect(() => {
    fetchDefaultInsights();
  }, []);

  const fetchDefaultInsights = async () => {
    setLoading(true);
    const res = await getInsights(); // no message = default productivity summary
    setAiData(res);
    setLoading(false);
  };

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setConversation((prev) => [...prev, `You: ${input}`]);

    const res = await getInsights(input);
    setConversation((prev) => [...prev, `LifeHub AI: ${res.reply}`]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">🤖 AI Insights</h2>
      <p className="text-muted-foreground text-sm">
        Personalized productivity report & assistant powered by OpenAI.
      </p>

      {loading && (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <LoaderCircle className="animate-spin h-4 w-4" /> Analyzing your
          dashboard…
        </div>
      )}

      {aiData && (
        <div className="grid gap-6 border p-6 rounded-lg bg-muted/10 shadow-sm">
          {aiData.highlights && (
            <div>
              <h3 className="text-lg font-semibold text-green-600">
                🌟 Highlights
              </h3>
              <ul className="list-disc list-inside text-sm mt-1">
                {aiData.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {aiData.issues && (
            <div>
              <h3 className="text-lg font-semibold text-red-500">⚠️ Issues</h3>
              <ul className="list-disc list-inside text-sm mt-1">
                {aiData.issues.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {aiData.actions && (
            <div>
              <h3 className="text-lg font-semibold text-blue-500">
                ✅ Suggested Actions
              </h3>
              <ul className="list-disc list-inside text-sm mt-1">
                {aiData.actions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Chat interaction */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold">💬 Ask LifeHub AI</h3>

        <div className="space-y-2 max-h-60 overflow-y-auto rounded-md border p-4 bg-background">
          {conversation.map((msg, idx) => (
            <p key={idx} className="text-sm whitespace-pre-wrap">
              {msg}
            </p>
          ))}
          {loading && (
            <p className="text-muted-foreground text-sm">
              LifeHub AI is typing...
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something like 'What's my biggest delay?'"
          />
          <Button onClick={handleAsk} disabled={loading}>
            Ask
          </Button>
        </div>
      </div>
    </div>
  );
}
