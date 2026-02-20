import React from "react";

const StudentApplicants = () => {
  const applicants = [
    {
      id: 1,
      name: "Sakshi Patare",
      email: "sakshi@email.com",
      job: "Frontend Developer",
      resume: "/resume1.pdf",
      status: "Pending"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Student Applicants</h2>

      <div className="space-y-4">
        {applicants.map((student) => (
          <div key={student.id} className="border p-4 rounded-lg">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Applied For:</strong> {student.job}</p>
            <p><strong>Status:</strong> {student.status}</p>

            <a
              href={student.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentApplicants;