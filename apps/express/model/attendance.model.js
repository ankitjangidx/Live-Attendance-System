import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema({
  classId: {
    type: mongoose.Schema.ObjectId,
    ref: "class",
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "class",
  },
  status: {
    type: String,
    enum: ["present", "absent"],
  },
});
export default mongoose.model("attendance", attendanceSchema);
