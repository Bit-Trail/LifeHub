"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { RegisterPage } from "@/app/register/page";
import Link from "next/link";

export default function ThreeDMarqueeDemoSecond() {
  const images = [
    "/goals_one.jpg",
    "/goals.jpg",
    "/habit_one.jpg",
    "/journal_one.jpg",
    "/journal_two.jpg",
    "/lifehub_one.jpg",
    "/lifehub_three.jpg",
    "/tasks_one.jpg",
    "/todo.jpg",
    "/goals_one.jpg",
    "/goals.jpg",
    "/habit_one.jpg",
    "/journal_one.jpg",
    "/journal_two.jpg",
    "/lifehub_one.jpg",
    "/lifehub_three.jpg",
    "/tasks_one.jpg",
    "/todo.jpg",
    "/goals_one.jpg",
    "/goals.jpg",
    "/habit_one.jpg",
    "/journal_one.jpg",
    "/journal_two.jpg",
    "/lifehub_one.jpg",
    "/lifehub_three.jpg",
    "/tasks_one.jpg",
    "/todo.jpg",
  ];
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      <div className="relative mx-auto my-10 flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
         This is your life and it&apos;s ending one moment at a time.
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        LifeHub is a platform that helps you track your life and achieve your goals.
        It helps you track your habits, goals, and journals.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link href="/register">
          <button className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
            Join the club
          </button>
        </Link>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/60 dark:bg-black/30" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
    </section>
  );
}
