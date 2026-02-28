import express from "express";
import { Notification } from "./notification.schema.js";
import { authMiddleware } from "../../middleware/authentication.js";

const notificationRouter = express.Router();

// Get logged-in user's notifications
notificationRouter.get("/", authMiddleware, async (req, res) => {
  const notifications = await Notification.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

// Mark notification as read
notificationRouter.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,   // 🔥 ensures ownership
      },
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Error updating notification" });
  }
});

export default notificationRouter;