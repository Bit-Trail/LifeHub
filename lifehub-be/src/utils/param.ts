import { Request } from "express";

/**
 * Get a single string from req.params (Express types params as string | string[]).
 * Use this whenever you need a param for parseInt/Number or as a string key.
 */
export function getParam(req: Request, key: string): string {
  const value = req.params[key];
  return Array.isArray(value) ? value[0] ?? "" : (value ?? "");
}
