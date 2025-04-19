// routes/messRoutes.js
import express from "express";
import { protect, isManager } from "../middleware/authMiddleware.js";
import { updateSchedule, getMess } from "../controllers/messController.js";

const router = express.Router();

router.get("/", protect, isManager, getMess);
router.put("/schedule", protect, isManager, updateSchedule);


export default router;
