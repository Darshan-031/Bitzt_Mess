// routes/authRoutes.js
import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser); // Shared login for admin & mess managers

export default router;
