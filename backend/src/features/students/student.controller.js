import studentRepo from "./student.repository.js";

export default class studentController {

  constructor() {
    this.studentRepo = new studentRepo();
  }

  // 🔹 Get Student Profile
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

  // 🔹 Update Student Profile
  async updateProfile(req, res) {
  try {
    const { phone, education } = req.body;

      let skills = [];

      if (req.body.skills) {
        skills = JSON.parse(req.body.skills);
      }

    const updateData = {
      phone,
      education,
      skills
    };

    // 🔥 If resume uploaded
    if (req.file) {
      updateData.resume = req.file.path;
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


}
