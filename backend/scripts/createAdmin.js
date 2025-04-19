import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminExists = await User.findOne({ username: "admin" });
  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin user created: username = admin, password = admin123");
  process.exit();
};

createAdmin();
