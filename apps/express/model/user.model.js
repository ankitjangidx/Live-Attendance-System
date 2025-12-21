import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  name: String,
  email: String,
  password: String, // hashed with bcrypt
  role: {
    type: String,
    enum: ["teacher", "student"],
  },
});
userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    throw new Error("something went wrong in user modal pre save middleware");
  }
});
export default mongoose.model("user", userSchema);
