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

}
