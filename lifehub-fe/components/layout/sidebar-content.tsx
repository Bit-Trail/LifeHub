"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ListTodo,
  Repeat,
  BookText,
  Target,
  BarChart,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/dashboard/tasks", icon: ListTodo },
  { name: "Habits", href: "/dashboard/habits", icon: Repeat },
  { name: "Journal", href: "/dashboard/journal", icon: BookText },
  { name: "Goals", href: "/dashboard/goals", icon: Target },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
];

export function SidebarContent() {
  return (
    <>
      <div className="flex h-16 items-center justify-center border-b px-6 text-lg font-semibold">
        LifeHub
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {name}
          </Link>
        ))}
      </nav>
    </>
  );
}
