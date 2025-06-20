"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:3030/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      const token = data.token || data?.user?.token;
      if (token) {
        localStorage.setItem("authToken", token);
        router.push("/dashboard");
      } else {
        setError("No token returned. Try logging in.");
      }
    } catch {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/lifehub-hero.jpg')] bg-cover bg-center opacity-10 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your LifeHub account
        </h2>

        {error && (
          <p className="text-sm text-red-400 text-center border border-red-400 bg-red-500/10 px-3 py-2 rounded mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full rounded-md bg-slate-800 px-3 py-2 text-sm focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <Button className="w-full mt-2" onClick={handleRegister}>
            Register
          </Button>

          <p className="text-center text-sm text-white/60 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-300 underline hover:text-indigo-200"
            >
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
