import express from "express";
import { authMiddleware } from "../../middleware/authentication.js";
import { authorizeRole } from "../../middleware/roleAuthorization.js";
import jobController from "./job.controller.js";

const jobRoutes = express.Router();
const JobController = new jobController();

// Company creates a job
jobRoutes.post("/", authMiddleware, authorizeRole("company"), (req, res) => JobController.createJob(req, res));

// Get all jobs (for students)
jobRoutes.get("/", authMiddleware, authorizeRole("student"), (req, res) => JobController.getAllJobs(req, res));

// Get single job
jobRoutes.get("/:jobId", authMiddleware, (req, res) => JobController.getJob(req, res));

// Company updates job
jobRoutes.put("/:jobId", authMiddleware, authorizeRole("company"), (req, res) => JobController.updateJob(req, res));

// Company deletes job
jobRoutes.delete("/:jobId", authMiddleware, authorizeRole("company"), (req, res) => JobController.deleteJob(req, res));

export default jobRoutes;
