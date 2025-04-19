// controllers/messController.js
import Mess from "../models/Mess.js";

export const updateSchedule = async (req, res) => {
  const { schedule } = req.body; // full week schedule expected

  try {
    const mess = await Mess.findById(req.user.mess._id);
    if (!mess) return res.status(404).json({ message: "Mess not found" });

    mess.schedule = schedule;
    await mess.save();

    res.json({ message: "Schedule updated successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMess = async (req, res) => {

  try {
    const mess = await Mess.findById(req.user.mess._id);
    if (!mess) return res.status(404).json({ message: "Mess not found" });

    res.json(mess);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
