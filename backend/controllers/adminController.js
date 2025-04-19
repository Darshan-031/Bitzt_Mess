// controllers/adminController.js
import Mess from "../models/Mess.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const addMess = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingMess = await Mess.findOne({ name });
    if (existingMess)
      return res
        .status(400)
        .json({ message: "Mess with this name already exists" });

    const existingUser = await User.findOne({ name });
    if (existingUser)
      return res.status(400).json({ message: "Username already taken" });

    const mess = await Mess.create({
      name,
      schedule: {
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
        Sunday: {},
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username : name,
      password: hashedPassword,
      role: "manager",
      mess: mess._id,
    });

    res.json({ message: "Mess and manager created" });
  } catch (e) {
    console.log("error in server while adding mess ", e);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteMess = async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) return res.status(404).json({ message: "Mess not found" });

    await User.deleteMany({ mess: mess._id });
    await mess.deleteOne();

    res.json({ message: "Mess and associated manager deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
