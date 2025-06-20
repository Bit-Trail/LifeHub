"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { getAuthToken } from "@/lib/utils";

type Insight = { highlights: string[]; issues: string[]; actions: string[] };

export function AIInsights() {
  const [insights, setInsights] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:3030/api/ai-insights", {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (res.ok) setInsights(await res.json());
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return (
    <Card className="border p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">🧠 AI Insights</h3>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Analyzing your data…</p>
      )}

      {insights && (
        <>
          <Section
            title="Highlights"
            items={insights.highlights}
            color="text-green-600"
          />
          <Section
            title="Issues"
            items={insights.issues}
            color="text-red-600"
          />
          <Section
            title="Next Actions"
            items={insights.actions}
            color="text-blue-600"
          />
        </>
      )}
    </Card>
  );
}

function Section({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className={`text-sm font-medium ${color}`}>{title}</h4>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        {items.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
