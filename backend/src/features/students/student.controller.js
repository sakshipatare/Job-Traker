import studentRepo from "./student.repository.js";
import { Student } from "./student.schema.js";
import { Application } from "../applications/application.schema.js";

export default class studentController {

  constructor() {
    this.studentRepo = new studentRepo();
  }

async getStudentStats(req, res) {
  try {
    // 1️⃣ Find student profile using logged-in user
    const studentProfile = await Student.findOne({
      user: req.user._id
    });

    if (!studentProfile) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    const studentId = studentProfile._id;

    // 2️⃣ Count using student profile ID
    const totalApplications = await Application.countDocuments({
      student: studentId
    });

    const selectedApplications = await Application.countDocuments({
      student: studentId,
      status: "selected"
    });

    const rejectedApplications = await Application.countDocuments({
      student: studentId,
      status: "rejected"
    });

    const pendingApplications = await Application.countDocuments({
      student: studentId,
      status: "pending"
    });

    const shortlistedApplications = await Application.countDocuments({
      student: studentId,
      status: "shortlisted"
    });

    return res.status(200).json({
      totalApplications,
      selectedApplications,
      rejectedApplications,
      pendingApplications,
      shortlistedApplications
    });

  } catch (error) {
    console.error("Student Stats Error:", error);
    return res.status(500).json({
      message: "Error fetching dashboard stats"
    });
  }
}

  // Get Student Profile
  async getProfile(req, res) {
    try {
      const student = await this.studentRepo.getStudentByUserId(req.user._id);

      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }

      return res.status(200).json(student);

    } catch (error) {
      console.error("Get Profile Error:", error);
      return res.status(500).json({ message: "Error fetching profile" });
    }
  }

  // Update Student Profile
  async updateProfile(req, res) {
  try {
    const { phone, education } = req.body;

      let skills = [];

      if (req.body.skills) {
        const parsedSkills = JSON.parse(req.body.skills);

        skills = parsedSkills.map(skill =>
          skill.replace(/"/g, "").trim()
        );
      }

    const updateData = {
      phone,
      education,
      skills
    };

    // If resume uploaded
    if (req.files?.resume?.length > 0) {
  const resumePath = req.files.resume[0].path;

  updateData.resume = resumePath;

  await Application.updateMany(
    { student: req.user._id },
    { resume: resumePath }
  );
}

// Profile Photo
if (req.files?.profilePhoto?.length > 0) {
  updateData.profilePhoto = req.files.profilePhoto[0].path;
}

    const updatedStudent = await this.studentRepo.updateStudent(
      req.user._id,
      updateData
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedStudent
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Error updating profile" });
  }
}

async toggleSaveJob(req, res) {
  try {
    const { jobId } = req.params;

    const result = await this.studentRepo.toggleSaveJob(
      req.user._id,
      jobId
    );

    return res.status(200).json({
      message: result.isSaved
        ? "Job saved successfully"
        : "Job removed from saved",
      savedJobs: result.savedJobs
    });

  } catch (error) {
    console.error("Toggle Save Job Error:", error);
    return res.status(500).json({ message: error.message });
  }
}

async getSavedJobs(req, res) {
  try {
    const savedJobs = await this.studentRepo.getSavedJobs(req.user._id);

    return res.status(200).json(savedJobs);

  } catch (error) {
    console.error("Get Saved Jobs Error:", error);
    return res.status(500).json({ message: error.message });
  }
}


}
