import applicationRepo from "./application.repository.js";
import { Student } from "../students/student.schema.js";
import { Job } from "../jobs/job.schema.js";
import { Company } from "../companies/company.schema.js";
import { Application } from "./application.schema.js";
import { Notification } from "../notifications/notification.schema.js";
// import { userModel } from "../users/user.repository.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { generateOfferLetter } from "../offerLetter/offerLetter.service.js";

export default class applicationController {

  constructor() {
    this.appRepo = new applicationRepo();
  }


async applyJob(req, res) {
  try {
    const { jobId } = req.params;

    // 1️⃣ Find student profile
    const studentProfile = await Student.findOne({ user: req.user._id });

    if (!studentProfile || !studentProfile.resume) {
      return res.status(400).json({ message: "Upload resume first" });
    }

    // 2️⃣ Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      student: studentProfile._id
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job."
      });
    }

    // 3️⃣ Fetch job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 4️⃣ Deadline check
    if (job.isClosed || job.deadline < new Date()) {
      return res.status(400).json({
        message: "This job is closed. Deadline has passed."
      });
    }

    // 5️⃣ Skill matching
    const jobSkills = job.skills.map(skill =>
      skill.toLowerCase().trim()
    );

    const studentSkills = studentProfile.skills.map(skill =>
      skill.replace(/"/g, "").toLowerCase().trim()
    );

    const matchedSkills = jobSkills.filter(skill =>
      studentSkills.includes(skill)
    );

    const matchPercentage =
      jobSkills.length === 0
        ? 0
        : (matchedSkills.length / jobSkills.length) * 100;

    let status = "pending";
    if (matchPercentage >= 70) {
      status = "shortlisted";
    }

    // 6️⃣ Create application
    const application = await this.appRepo.createApplication({
      job: jobId,
      student: studentProfile._id,
      resume: studentProfile.resume,
      status,
      matchPercentage
    });

    return res.status(201).json({
      message: "Applied successfully",
      matchPercentage,
      status,
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

    //  Find job first
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    //  Get company profile of logged-in user
    const company = await Company.findOne({ user: req.user._id });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    //  Check ownership
    if (job.company.toString() !== company._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    //  Now fetch applications
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
    //  Find student profile first
    const studentProfile = await Student.findOne({ user: req.user._id });

    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    // Now use studentProfile._id
    const applications = await this.appRepo.getApplicationsByStudent(studentProfile._id);

    return res.status(200).json(applications);

  } catch (err) {
    console.error("Get My Applications Error:", err);
    return res.status(500).json({ message: "Error fetching applications" });
  }
}

  // Company updates status
  // Company updates status
async updateStatus(req, res) {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId)
      .populate({
        path: "student",
        populate: { path: "user" }
      })
      .populate({
        path: "job",
        populate: { path: "company" }
      });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const company = await Company.findOne({ user: req.user._id });

    if (!company) {
      return res.status(403).json({ message: "Company not found" });
    }

    if (application.job.company._id.toString() !== company._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    application.status = status;
    await application.save();

    const studentUserId = application.student.user._id;
    const studentEmail = application.student.user.email;
    const studentName = application.student.user.name;
    const companyName = application.job.company.name;
    const jobTitle = application.job.title;

    let attachmentPath = null;

    // ✅ IF SELECTED → GENERATE PDF
    if (status === "selected") {
      attachmentPath = await generateOfferLetter(application);
    }

    // ===============================
    // ✅ CREATE NOTIFICATION
    // ===============================
    await Notification.create({
      user: studentUserId,
      title: "Application Status Updated",
      message: `Your application for ${jobTitle} at ${companyName} is now ${status}.`,
    });

    // ===============================
    // ✅ SEND EMAIL (WITH PDF IF SELECTED)
    // ===============================
    await sendEmail(
      studentEmail,
      `Application Status - ${jobTitle}`,
      `
      <div style="font-family: Arial;">
        <h2>Application Status Update</h2>
        <p>Dear ${studentName},</p>
        <p>Your application for <b>${jobTitle}</b> at 
        <b>${companyName}</b> is now:</p>

        <h3 style="color:green;">${status.toUpperCase()}</h3>

        ${status === "selected"
          ? "<p>Please find your offer letter attached.</p>"
          : ""}

        <p>Regards,<br/>JobTracker Team</p>
      </div>
      `,
      attachmentPath // <-- attachment if exists
    );

    return res.status(200).json({
      message: "Status updated successfully",
      application
    });

  } catch (err) {
    console.error("Update Status Error:", err);
    return res.status(500).json({ message: "Error updating status" });
  }
}
}
