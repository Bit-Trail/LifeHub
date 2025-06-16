import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Analytics (coming soon)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-400">
        <p>We’ll wire real charts after backend is ready. Expect:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Discipline score donut</li>
          <li>Weekly tasks & habits bar chart</li>
          <li>Mood trend line</li>
        </ul>
      </CardContent>
    </Card>
  );
}
