import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getTasks, createTask, toggleTask, deleteTask, updateTask } from "../controllers/task.controller";

const router = express.Router();

router.use(authenticate); // All routes below are protected

router.get("/", async (req, res) => getTasks(req, res));
router.post("/", async (req, res) => createTask(req, res));
router.patch("/:id/toggle", async (req, res) => toggleTask(req, res));
router.patch("/tasks/:id", async (req, res) => updateTask(req, res));
router.delete("/:id", async (req, res) => deleteTask(req, res));


export default router;