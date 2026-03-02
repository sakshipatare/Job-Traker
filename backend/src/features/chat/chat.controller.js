import { Chat } from "./chat.schema.js";
import { Application } from "../applications/application.schema.js";

export default class ChatController {

  async sendMessage(req, res) {
    try {
      const { applicationId } = req.params;
      const { message } = req.body;

      const application = await Application.findById(applicationId)
        .populate({
          path: "student",
          populate: { path: "user" }
        })
        .populate({
          path: "job",
          populate: { path: "company", populate: { path: "user" } }
        });

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // ✅ Allow only shortlisted or selected
      if (!["shortlisted", "selected"].includes(application.status)) {
        return res.status(403).json({
          message: "Chat not allowed until shortlisted or selected"
        });
      }

      // ✅ Allow only student or company
      const allowedUsers = [
        application.student.user._id.toString(),
        application.job.company.user._id.toString()
      ];

      if (!allowedUsers.includes(req.user._id.toString())) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const chat = await Chat.create({
        application: applicationId,
        sender: req.user._id,
        senderRole: req.user.role,
        message
      });

      return res.status(201).json(chat);

    } catch (err) {
      console.error("Chat Error:", err);
      return res.status(500).json({ message: "Error sending message" });
    }
  }

  async getMessages(req, res) {
    try {
      const { applicationId } = req.params;

      const messages = await Chat.find({ application: applicationId })
        .populate("sender", "name email")
        .sort({ createdAt: 1 });

      return res.status(200).json(messages);

    } catch (err) {
      console.error("Fetch Chat Error:", err);
      return res.status(500).json({ message: "Error fetching messages" });
    }
  }
}