import express from "express";
import { authMiddleware } from "../../middleware/authentication.js";
import { authorizeRole } from "../../middleware/roleAuthorization.js";
import applicationController from "./application.controller.js";

const applicationRoute = express.Router();
const AppController = new applicationController();

// Student apply
applicationRoute.post("/:jobId/apply",
  authMiddleware,
  authorizeRole("student"),
  (req, res) => AppController.applyJob(req, res)
);

// Company see applicants
applicationRoute.get("/job/:jobId",
  authMiddleware,
  authorizeRole("company"),
  (req, res) => AppController.getApplicants(req, res)
);

// Student see my applications
applicationRoute.get("/me",
  authMiddleware,
  authorizeRole("student"),
  (req, res) => AppController.getMyApplications(req, res)
);

// Company update status
applicationRoute.put("/:applicationId/status",
  authMiddleware,
  authorizeRole("company"),
  (req, res) => AppController.updateStatus(req, res)
);

export default applicationRoute;
