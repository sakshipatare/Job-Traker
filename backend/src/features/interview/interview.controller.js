import { Interview } from "./interview.schema.js";
import { Application } from "../applications/application.schema.js";
import { createMeetEvent } from "./googleCalendar.js";
import { sendEmail } from "./email.js";
import { Student } from "../students/student.schema.js";

export const scheduleInterview = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { scheduledAt } = req.body;

    const application = await Application.findById(applicationId)
      .populate({
        path: "student",
        populate: { path: "user" }
      })
      .populate({
        path: "job",
        populate: {
          path: "company",
          populate: { path: "user" }
        }
      });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const studentEmail = application.student.user.email;
    const companyEmail = application.job.company.user.email;

    const meetLink = `https://meet.google.com/${Math.random()
      .toString(36)
      .substring(7)}`;

    // ✅ Create interview (THIS WAS MISSING)
    const interview = await Interview.create({
      application: applicationId,
      company: application.job.company._id,
      student: application.student._id,
      scheduledAt,
      meetLink
    });

    const companyName = application.job.company.user.name;
    const role = application.job.title;
    const studentName = application.student.user.name;

    // format date properly
    const formattedDate = new Date(scheduledAt).toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short"
    });

    // ✅ Send email to student
    if (studentEmail) {
      await sendEmail(
        studentEmail,
        `Interview Scheduled - ${companyName}`,
        
    `Hello ${studentName},

    You have been invited for an interview.

    Manager: ${companyName}
    Role: ${role}

    Interview Date & Time:
    ${formattedDate}

    Meeting Link:
    ${meetLink}

    Please login to your dashboard to ACCEPT or DECLINE the interview invitation.

    Dashboard:
    http://localhost:5173/dashboard

    Best Regards,
    ${companyName} Hiring Team`
      );
    }

    // ✅ Optional: Send confirmation email to company
    if (companyEmail) {
      await sendEmail(
        companyEmail,
        "Interview Scheduled Successfully",
        `Interview scheduled with student on ${scheduledAt}`
      );
    }

    res.status(201).json(interview);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Interview scheduling failed" });
  }
};

export const respondInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { status } = req.body;

    const interview = await Interview.findById(interviewId)
      .populate({
        path: "company",
        populate: { path: "user" }
      })
      .populate({
        path: "student",
        populate: { path: "user" }
      });

    if (!interview)
      return res.status(404).json({ message: "Interview not found" });

    interview.status = status;
    await interview.save();

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid response" });
    }

    const companyEmail = interview.company.user.email;

    await sendEmail(
      companyEmail,
      "Interview Response",
      `Student has ${status} the interview scheduled on ${interview.scheduledAt}`
    );

    res.json({ message: `Interview ${status}` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating response" });
  }
};

export const getMyInterviewInvites = async (req, res) => {
  try {

    // get student using logged user
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const interviews = await Interview.find({
      student: student._id,
      status: "pending"
    })
    .populate({
      path: "application",
      populate: {
        path: "job",
        populate: {
          path: "company",
          populate: { path: "user" }
        }
      }
    });

    const formatted = interviews.map((i) => ({
      _id: i._id,
      scheduledAt: i.scheduledAt,
      meetLink: i.meetLink,
      role: i.application.job.title,
      salary: i.application.job.salary,
      companyName: i.application.job.company.user.name,
      status: i.status,
    }));

    res.json(formatted);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch interview invites" });
  }
};