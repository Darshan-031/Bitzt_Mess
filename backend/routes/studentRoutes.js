// routes/studentRoutes.js
import express from "express";
import {
  getTodaySchedule,
  getMessNames,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/schedule/:messId/:day", getTodaySchedule); // Get today's schedule
router.get("/messes", getMessNames); // Get list of mess names

export default router;
