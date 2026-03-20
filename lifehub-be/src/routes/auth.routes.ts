import { Router, Request, Response } from "express";
import { register, login } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validation/schemas";

const router = Router();

router.post(
  "/register",
  validateBody(registerSchema),
  async (req: Request, res: Response) => {
    await register(req, res);
  }
);

router.post(
  "/login",
  validateBody(loginSchema),
  async (req: Request, res: Response) => {
    await login(req, res);
  }
);

export default router;
