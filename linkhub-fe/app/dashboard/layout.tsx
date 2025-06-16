import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">LifeHub</h1>
        <nav className="space-y-4">
          <a href="/dashboard" className="block">
            Home
          </a>
          <a href="/dashboard/tasks" className="block">
            Tasks
          </a>
          <a href="/dashboard/habits" className="block">
            Habits
          </a>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
