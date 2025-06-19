import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import statsRoutes from "./routes/stats.routes";
import { authenticate } from "./middleware/auth.middleware";
import taskRoutes from "./routes/task.routes";
import habitRoutes from "./routes/habit.routes";
import journalRoutes from "./routes/journal.routes";
import goalRoutes from "./routes/goal.route";
import googleRoutes from "./routes/google.route";


dotenv.config();
const app = express();

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/google", googleRoutes);


// 🔐 Sample protected route
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "You are authenticated!", user: (req as any).user });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`✅ LifeHub backend running at http://localhost:${PORT}`);
});
