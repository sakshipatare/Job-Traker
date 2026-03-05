import express from "express";
import {
  scheduleInterview,
  respondInterview,
  getMyInterviewInvites,
} from "./interview.controller.js";
import { authMiddleware } from "../../middleware/authentication.js";

const InterviewRouter = express.Router();

InterviewRouter.post("/schedule/:applicationId", authMiddleware, scheduleInterview);
InterviewRouter.post("/respond/:interviewId", authMiddleware, respondInterview);
InterviewRouter.get("/my-invites", authMiddleware, getMyInterviewInvites);

export default InterviewRouter;