"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3030/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("authToken", data.token);
      router.push("/dashboard");
    } catch {
      setLoading(false);
      setError("Something went wrong.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-fuchsia-900 px-4 py-10">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/lifehub-hero.jpg')] bg-cover bg-center opacity-10 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl w-full max-w-md p-8 text-white"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Login to LifeHub</h1>
          <p className="text-white/70 text-sm">
            Your personal productivity OS.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center border border-red-400 bg-red-500/10 px-3 py-2 rounded mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button
            onClick={handleLogin}
            className="w-full font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        <p className="text-center text-sm text-white/60 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-300 underline hover:text-indigo-200"
          >
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
