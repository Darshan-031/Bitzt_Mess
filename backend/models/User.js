// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "manager"], required: true },
  mess: { type: mongoose.Schema.Types.ObjectId, ref: "Mess" }, // for managers only
});

const User = mongoose.model("User", userSchema);
export default User;
