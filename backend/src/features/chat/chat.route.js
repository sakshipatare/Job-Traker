import express from "express";
import { authMiddleware } from "../../middleware/authentication.js";
import ChatController from "./chat.controller.js";

const chatRoute = express.Router();
const chatController = new ChatController();

chatRoute.post(
  "/:applicationId",
  authMiddleware,
  (req, res) => chatController.sendMessage(req, res)
);

chatRoute.get(
  "/:applicationId",
  authMiddleware,
  (req, res) => chatController.getMessages(req, res)
);

export default chatRoute;