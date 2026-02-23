import React, { useEffect, useState } from "react";
// import PostJob from "./PostApply";
import { Pencil, Trash2, MapPin, DollarSign, Users, ArrowRight, X, Save, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyJobs = () => {
  const navigate = useNavigate();
  // const [showPost, setShowPost] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      setErrorMessage("Failed to load jobs. Please try again.");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

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
        setSuccessMessage("Job deleted successfully");
        fetchMyJobs();
        setEditingJob(null);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage("Failed to delete job");
      }

    } catch (error) {
      console.error("Delete error:", error);
      setErrorMessage("Error deleting job. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      setErrorMessage("");

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
        setSuccessMessage("Job updated successfully");
        setEditingJob(null);
        fetchMyJobs();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(data.message || "Failed to update job");
      }

    } catch (error) {
      console.error("Update error:", error);
      setErrorMessage("Error updating job. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-4">
      <div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              My Job Posts
            </h1>
            <p className="text-lg text-gray-600">Manage and track your job listings</p>
          </div>

          {/* <button
            onClick={() => setShowPost(!showPost)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold whitespace-nowrap"
          >
            {showPost ? (
              <>
                <X size={18} /> Close
              </>
            ) : (
              <>
                <span>+</span> Post New Job
              </>
            )}
          </button> */}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-900 font-bold">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-900 font-bold">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Post Job Section */}
          {/* <div className="mb-8 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Post a New Job</h2>
            </div>
            <div className="p-6">
              <PostJob />
            </div>
          </div> */}


        {/* Edit Job Section */}
        {editingJob && (
          <div className="mb-8 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Pencil size={24} /> Update Job Listing
              </h2>
            </div>

            <div className="p-8 space-y-6">

              <div>
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-2">Job Title</label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, title: e.target.value })
                  }
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-medium transition-colors"
                  placeholder="Job title"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-2">Location</label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, location: e.target.value })
                    }
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-medium transition-colors"
                    placeholder="City, Country or Remote"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-2">Salary</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                    <input
                      type="number"
                      value={editingJob.salary || ""}
                      onChange={(e) =>
                        setEditingJob({ ...editingJob, salary: e.target.value })
                      }
                      className="w-full pl-8 pr-5 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-medium transition-colors"
                      placeholder="Annual salary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-2">Required Skills</label>
                <input
                  type="text"
                  value={editingJob.skills.join(", ")}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      skills: e.target.value.split(",").map(s => s.trim())
                    })
                  }
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-medium transition-colors"
                  placeholder="React, TypeScript, Node.js"
                />
                <p className="text-xs text-gray-500 mt-2">Separate skills with commas</p>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleUpdate}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} /> {isSaving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setEditingJob(null)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all font-semibold"
                >
                  <X size={18} /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pencil className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</p>
            <p className="text-gray-600">Start posting jobs to attract top talent to your company</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
              >

                {/* Job Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold  mb-3 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-cyan-600 flex-shrink-0" />
                          <span className="font-medium">{job.location}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-emerald-600 flex-shrink-0" />
                            <span className="font-medium">₹ {job.salary.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="px-8 py-6">
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Skills Required</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 flex-wrap">

                  <button
                    onClick={() => navigate(`/applicants/${job._id}`)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex-1 sm:flex-initial"
                  >
                    <Users size={18} />
                    View Applicants
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => setEditingJob(job)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-all font-semibold"
                  >
                    <Pencil size={18} />
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-red-200 text-red-700 hover:bg-red-50 transition-all font-semibold"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CompanyJobs;
