import applicationRepo from "./application.repository.js";
import { Student } from "../students/student.schema.js";

export default class applicationController {

  constructor() {
    this.appRepo = new applicationRepo();
  }

  // Student applies
async applyJob(req, res) {
  try {
    const { jobId } = req.params;

    //  Find student profile
    const studentProfile = await Student.findOne({ user: req.user._id });

    if (!studentProfile || !studentProfile.resume) {
      return res.status(400).json({ message: "Upload resume first" });
    }

    const application = await this.appRepo.createApplication(
      jobId,
      req.user._id,
      studentProfile.resume
    );

    return res.status(201).json({
      message: "Applied successfully",
      application
    });

  } catch (err) {
    console.error("Apply Error:", err);
    return res.status(500).json({ message: "Error applying to job" });
  }
}


  // Company sees applicants
  async getApplicants(req, res) {
    try {
      const { jobId } = req.params;

      const applications = await this.appRepo.getApplicationsByJob(jobId);

      return res.status(200).json(applications);

    } catch (err) {
      console.error("Get Applicants Error:", err);
      return res.status(500).json({ message: "Error fetching applicants" });
    }
  }

  // Student sees applied jobs
  async getMyApplications(req, res) {
    try {
      const applications = await this.appRepo.getApplicationsByStudent(req.user._id);
      return res.status(200).json(applications);

    } catch (err) {
      console.error("Get My Applications Error:", err);
      return res.status(500).json({ message: "Error fetching applications" });
    }
  }

  // Company updates status
  async updateStatus(req, res) {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      const application = await this.appRepo.updateStatus(applicationId, status);

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      return res.status(200).json({
        message: "Status updated",
        application
      });

    } catch (err) {
      console.error("Update Status Error:", err);
      return res.status(500).json({ message: "Error updating status" });
    }
  }
}
