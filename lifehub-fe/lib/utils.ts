import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwtDecode from "jwt-decode";

// ✅ Tailwind class merge utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ Get token from localStorage
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

// ✅ Save token to localStorage
export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

// ✅ Remove token
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

// ✅ Decode JWT and get user object
export function getCurrentUser(): any | null {
  const token = getAuthToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

// ✅ Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    return decoded?.exp ? Date.now() < decoded.exp * 1000 : true;
  } catch {
    return false;
  }
}