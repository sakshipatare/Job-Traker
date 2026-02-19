import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    phone: {
      type: String,
    },
    education: {
      type: String,
    },
    skills: [
      {
        type: String,
      }
    ],
    resume: {
      type: String, // file path or URL
    }
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
