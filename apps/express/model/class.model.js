import mongoose, { Schema } from "mongoose";


const classSchema = new Schema({
  className: String,
  teacherId: {
    type: mongoose.Schema.ObjectId,
    ref: "user"
  },
  studentIds: [{
    type: mongoose.Schema.ObjectId,
    ref: "user"
  }]

})
export default mongoose.model("class", classSchema);