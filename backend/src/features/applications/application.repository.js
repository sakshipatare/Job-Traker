import { Application } from "./application.schema.js";

export default class applicationRepo {

  async createApplication(data) {

  const existing = await Application.findOne({
    job: data.job,
    student: data.student
  });

  if (existing) {
    throw new Error("Already applied");
  }

  const application = new Application(data);
  return await application.save();
}

  async getApplicationsByJob(jobId) {
    return await Application.find({ job: jobId })
    .sort({ matchPercentage: -1 })
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "name email"
      }
    });
  }

  async getApplicationsByStudent(studentId) {
  return await Application.find({ student: studentId })
    .populate({
      path: "job",
      populate: {
        path: "company",
        select: "name location website"
      }
    });
}

  async updateStatus(applicationId, status) {
    return await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
  }
}
