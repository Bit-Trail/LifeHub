"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";

export function MainHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 shadow-sm md:px-6">
      <MobileSidebar />
      <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {mounted && theme === "light" ? <Moon /> : <Sun />}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
