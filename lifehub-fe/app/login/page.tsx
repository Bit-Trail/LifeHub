"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlassPage from "@/components/ui/GlassPage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <GlassPage>
      <h2 className="text-3xl font-bold mb-4">Login to LifeHub</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6"
      />
      <Button className="w-full bg-purple-600 hover:bg-purple-700">
        Login
      </Button>
    </GlassPage>
  );
}
