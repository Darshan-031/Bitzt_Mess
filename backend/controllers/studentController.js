// controllers/studentController.js
import Mess from "../models/Mess.js";

export const getTodaySchedule = async (req, res) => {
  const { messId, day } = req.params;

  try {
    const mess = await Mess.findById(messId);
    if (!mess) return res.status(404).json({ message: "Mess not found" });

    const daySchedule = mess.schedule[day];
    if (!daySchedule)
      return res
        .status(404)
        .json({ message: "Schedule not found for this day" });

    res.json(daySchedule);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessNames = async (req, res) => {
  const messes = await Mess.find({}, "name");
  res.json(messes);
};
