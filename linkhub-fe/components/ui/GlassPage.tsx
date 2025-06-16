import { ReactNode } from "react";

export default function GlassPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1f1f1f] to-[#0d0d0d] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl text-white">
        {children}
      </div>
    </div>
  );
}
