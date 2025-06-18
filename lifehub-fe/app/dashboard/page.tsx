import { SectionCards } from "@/components/ui/SectionCards";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <SectionCards />
      <ChartAreaInteractive />
    </div>
  );
}
