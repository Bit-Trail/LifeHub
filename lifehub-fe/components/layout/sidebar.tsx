"use client";

import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside className="hidden md:flex fixed inset-y-0 z-30 w-64 flex-col border-r bg-background shadow-sm">
      <SidebarContent />
    </aside>
  );
}
