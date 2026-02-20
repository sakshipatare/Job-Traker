import React, { useState } from "react";
import PostJob from "./PostApply"; 

const CompanyJobs = () => {
  const [showPost, setShowPost] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Pune",
      skills: "React, JavaScript"
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Mumbai",
      skills: "Node.js, MongoDB"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Job Posts</h2>
        <button
          onClick={() => setShowPost(!showPost)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Post New Job
        </button>
      </div>

      {showPost && <PostJob />}

      <div className="grid gap-4 mt-6">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{job.title}</h3>
            <p>Location: {job.location}</p>
            <p>Skills: {job.skills}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyJobs;