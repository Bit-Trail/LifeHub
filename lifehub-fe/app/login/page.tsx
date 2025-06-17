"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:3030/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const token = data.token;
      localStorage.setItem("authToken", token);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Panel - Illustration + Tagline */}
      <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col justify-center items-center p-10 text-center">
        <img
          src="/login-hero.png"
          alt="LifeHub Illustration"
          className="w-2/3 max-w-sm mb-6 animate-fade-in drop-shadow-xl"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-slide-in">
          Welcome to LifeHub
        </h1>
        <p className="text-lg text-white/80 max-w-md animate-fade-in delay-200">
          Your all-in-one productivity companion — track habits, log tasks,
          write journals, and grow with clarity.
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-slate-900 animate-fade-in-up">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Sign in to your LifeHub
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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

          <Button className="w-full" onClick={handleLogin}>
            Sign In
          </Button>

          <p className="text-center text-sm text-white/60">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-400 underline hover:text-indigo-300"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
