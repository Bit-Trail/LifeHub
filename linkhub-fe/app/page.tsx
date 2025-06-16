import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] px-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text mb-6 animate-fade-in">
        LifeHub
      </h1>
      <p className="text-gray-400 text-lg max-w-xl mb-10">
        Your all-in-one daily discipline dashboard — track tasks, habits, mood,
        goals, and more.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button className="bg-purple-600 hover:bg-purple-700">Login</Button>
        </Link>
        <Link href="/register">
          <Button
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-900/10"
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
