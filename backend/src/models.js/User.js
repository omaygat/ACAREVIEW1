import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["student","teacher","admin"], default: "student" }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
