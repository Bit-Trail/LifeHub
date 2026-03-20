import { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode?: number;
  details?: unknown;
}

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
  });
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode && err.statusCode >= 400 && err.statusCode < 600 ? err.statusCode : 500;

  // Basic structured log – replace with a real logger in production
  console.error("[Error]", {
    message: err.message,
    stack: err.stack,
    statusCode,
    details: err.details,
  });

  if (statusCode === 500) {
    res.status(500).json({
      error: "Internal Server Error",
    });
    return;
  }

  res.status(statusCode).json({
    error: err.message || "Request failed",
    details: err.details,
  });
}

