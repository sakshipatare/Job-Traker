import express from "express";
import studentController from "./student.controller.js";
import { authMiddleware } from "../../middleware/authentication.js";
import { authorizeRole } from "../../middleware/roleAuthorization.js";
import { uploadFiles  } from "../../middleware/upload.js";

const studentRouter = express.Router();
const StudentController = new studentController();

// Get Profile
studentRouter.get(
  "/profile",
  authMiddleware,
  authorizeRole("student"),
  (req, res) => StudentController.getProfile(req, res)
);

// Update Profile
studentRouter.put(
  "/profile",
  authMiddleware,
  authorizeRole("student"),
  uploadFiles,
  (req, res) => StudentController.updateProfile(req, res)
);

// Student Dashboard Stats
studentRouter.get(
  "/stats",
  authMiddleware,
  authorizeRole("student"),
  (req, res) => StudentController.getStudentStats(req, res)
);

studentRouter.post(
  "/save-job/:jobId",
  authMiddleware,
  authorizeRole("student"),
  (req, res) => StudentController.toggleSaveJob(req, res)
);

studentRouter.get(
  "/saved-jobs",
  authMiddleware,
  authorizeRole("student"),
  (req, res) => StudentController.getSavedJobs(req, res)
);

export default studentRouter;
