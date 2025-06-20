"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function LifeHubLanding() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white flex flex-col justify-center items-center px-6">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold">
          <Sparkles className="text-purple-400" />
          LifeHub
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Take Control of Your <span className="text-purple-400">Life</span>
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Your all-in-one productivity assistant for managing tasks, habits,
          goals, and journals — now powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            variant="default"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-400 hover:bg-purple-900"
            onClick={() => router.push("/register")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </main>
  );
}
