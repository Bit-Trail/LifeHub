"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

      const token = data.token || data?.user?.token; // fallback
      if (token) {
        localStorage.setItem("authToken", token);
        router.push("/dashboard");
      } else {
        setError("No token returned. Try logging in.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm p-6 space-y-6 bg-slate-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">
          Create your LifeHub account
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
          className="w-full rounded-md bg-slate-800 px-3 py-2 text-sm"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <Button className="w-full" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  );
}
