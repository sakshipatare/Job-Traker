import React, { useEffect, useState } from "react";

const Apply = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/applications/${jobId}/apply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Applied Successfully ✅");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Apply error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

      <div className="grid grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>

            <button
              onClick={() => handleApply(job._id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apply;
