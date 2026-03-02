import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    senderRole: String,
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);