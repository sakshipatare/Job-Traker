import { Application } from "./application.schema.js";

export default class applicationRepo {

  async createApplication(jobId, studentId, resumePath, status, matchPercentage) {

  // prevent duplicate apply
  const existing = await Application.findOne({
    job: jobId,
    student: studentId
  });

  if (existing) return existing;

  const application = new Application({
    job: jobId,
    student: studentId,
    resume: resumePath,
    status,
    matchPercentage
  });

  return await application.save();
}

  async getApplicationsByJob(jobId) {
    return await Application.find({ job: jobId })
    .sort({ matchPercentage: -1 })
    .populate("student", "name email resume");;
  }

  async getApplicationsByStudent(studentId) {
    return await Application.find({ student: studentId })
      .populate("job", "title location salary");
  }

  async updateStatus(applicationId, status) {
    return await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
  }
}
