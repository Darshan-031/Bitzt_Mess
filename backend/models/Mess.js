// models/Mess.js
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  breakfast: [String],
  lunch: [String],
  snacks: [String],
  dinner: [String],
});

const messSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  schedule: {
    Monday: scheduleSchema,
    Tuesday: scheduleSchema,
    Wednesday: scheduleSchema,
    Thursday: scheduleSchema,
    Friday: scheduleSchema,
    Saturday: scheduleSchema,
    Sunday: scheduleSchema,
  },
});

const Mess = mongoose.model("Mess", messSchema);
export default Mess;
