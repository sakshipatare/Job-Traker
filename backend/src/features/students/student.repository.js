import { Student } from "./student.schema.js";

export default class studentRepo {

  async createStudent(userId) {
    return await Student.create({ user: userId });
  }

  async getStudentByUserId(userId) {
    return await Student.findOne({ user: userId }).populate("user", "-password");
  }

  async updateStudent(userId, updateData) {
    return await Student.findOneAndUpdate(
      { user: userId },
      updateData,
      { returnDocument: "after", upsert: true }
    ).populate("user", "-password");
  }

  // Toggle Save Job
async toggleSaveJob(userId, jobId) {
  const student = await Student.findOne({ user: userId });

  if (!student) {
    throw new Error("Student not found");
  }

  const alreadySaved = student.savedJobs.includes(jobId);

  if (alreadySaved) {
    student.savedJobs.pull(jobId);
  } else {
    student.savedJobs.push(jobId);
  }

  await student.save();

  return {
    savedJobs: student.savedJobs,
    isSaved: !alreadySaved
  };
}


// Get Saved Jobs
async getSavedJobs(userId) {
  const student = await Student.findOne({ user: userId })
    .populate("savedJobs");

  if (!student) {
    throw new Error("Student not found");
  }

  return student.savedJobs;
}

}
