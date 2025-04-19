import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import messRoutes from "./routes/messRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

// ✅ Use CORS with your frontend origin
app.use(cors({
  origin: true, // 👈 allow your frontend URL
  credentials: true // optional: use this if you're dealing with cookies/auth
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/student", studentRoutes);

export default app;
