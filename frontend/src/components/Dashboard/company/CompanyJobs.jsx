import React, { useEffect, useState } from "react";
import PostJob from "./PostApply";
import { Pencil, Trash2, MapPin, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyJobs = () => {
  const navigate = useNavigate();
  const [showPost, setShowPost] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/jobs/company/my-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      if (res.ok) setJobs(data);

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/jobs/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.ok) {
        alert("Job deleted");
        fetchMyJobs(); // 🔥 refresh list
        setEditingJob(null);
      }

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/jobs/${editingJob._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingJob)
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Job updated successfully");
      setEditingJob(null);
      fetchMyJobs();  // 🔥 refresh data
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error("Update error:", error);
  }
};

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

      {editingJob && (
        <div className="bg-gray-100 p-5 rounded-xl mb-6">
          <h3 className="font-bold mb-3">Update Job</h3>

          <input
            type="text"
            value={editingJob.title}
            onChange={(e) =>
              setEditingJob({ ...editingJob, title: e.target.value })
            }
            className="border p-2 mb-2 w-full rounded"
            placeholder="Title"
          />

          <input
            type="text"
            value={editingJob.location}
            onChange={(e) =>
              setEditingJob({ ...editingJob, location: e.target.value })
            }
            className="border p-2 mb-2 w-full rounded"
            placeholder="Location"
          />

          <input
            type="number"
            value={editingJob.salary || ""}
            onChange={(e) =>
              setEditingJob({ ...editingJob, salary: e.target.value })
            }
            className="border p-2 mb-2 w-full rounded"
            placeholder="Salary"
          />

          <input
            type="text"
            value={editingJob.skills.join(", ")}
            onChange={(e) =>
              setEditingJob({
                ...editingJob,
                skills: e.target.value.split(",").map(s => s.trim())
              })
            }
            className="border p-2 mb-3 w-full rounded"
            placeholder="Skills (comma separated)"
          />

          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditingJob(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 mt-6">
        {jobs.length === 0 && (
          <p className="text-gray-500">No jobs posted yet.</p>
        )}

        {jobs.map((job) => (
          <div
            key={job._id}
            className="p-5 border rounded-xl shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg mb-2">{job.title}</h3>

            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>

            {job.salary && (
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <DollarSign size={16} />
                <span>₹ {job.salary}</span>
              </div>
            )}

            <p className="text-sm text-gray-500 mb-2">
              Skills: {job.skills.join(", ")}
            </p>

            {/* Update & Delete */}
            {/* Actions */}
          <div className="flex gap-4 mt-3 flex-wrap">

            <button
              onClick={() => navigate(`/applicants/${job._id}`)}
              className="bg-gray-800 text-white px-3 py-1 rounded"
            >
              View Applicants
            </button>

            <button
              onClick={() => setEditingJob(job)}
              className="flex items-center gap-1 text-blue-600"
            >
              <Pencil size={16} /> Update
            </button>

            <button
              onClick={() => handleDelete(job._id)}
              className="flex items-center gap-1 text-red-600"
            >
              <Trash2 size={16} /> Delete
            </button>

          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyJobs;