// routes/adminRoutes.js
import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { addMess, deleteMess } from "../controllers/adminController.js";

const router = express.Router();

router.post("/add-mess", protect, isAdmin, addMess);
router.delete("/remove-mess/:id", protect, isAdmin, deleteMess);

export default router;
