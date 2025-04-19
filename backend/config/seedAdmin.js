import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "darshan@gmail.com" });
    if (adminExists) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      email: "darshan@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

export default seedAdmin;
