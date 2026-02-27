import React, { useEffect, useState } from "react";
import {
  Pencil,
  MapPin,
  DollarSign,
  Users,
  X,
  Save,
  Check,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CompanyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/jobs/company/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const res = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSuccessMessage("Job deleted successfully");
        fetchMyJobs();
        setEditingJobId(null);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage("Failed to delete job");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setErrorMessage("Error deleting job. Please try again.");
    }
  };

  const handleEditClick = (job) => {
    setEditingJobId(job._id);
    setFormData({
      title: job.title,
      location: job.location,
      salary: job.salary || "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (jobId) => {
    try {
      setIsSaving(true);
      const res = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Job updated successfully");
        setEditingJobId(null);
        fetchMyJobs();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      setErrorMessage("Error updating job");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-4">
          <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent mb-3">
          My Job Posts
        </h1>
        <p className="text-slate-400">
          Manage and track your job listings
        </p>
      </div>
    </motion.div>

      {/* Success / Error Messages */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3"
          >
            <Check className="text-emerald-400" size={18} />
            <span className="text-emerald-300 text-sm">{successMessage}</span>
          </motion.div>
        )}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
          >
            <AlertCircle className="text-red-400" size={18} />
            <span className="text-red-300 text-sm">{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-16 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Pencil className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-xl font-semibold text-white mb-2">No jobs posted yet</p>
          <p className="text-slate-400">Start posting jobs to attract top talent</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-fuchsia-500/40 transition-all duration-300"
            >
              {editingJobId === job._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleUpdate(job._id)}
                      disabled={isSaving}
                      className="px-5 py-2 rounded-xl bg-emerald-500 text-white disabled:opacity-50"
                    >
                      <Save size={16} /> {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingJobId(null)}
                      className="px-5 py-2 rounded-xl bg-white/10 text-white"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-4">{job.title}</h3>
                  <div className="flex gap-6 text-slate-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} /> {job.location}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} /> {job.salary.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => navigate(`/applicants/${job._id}`)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                    >
                      <Users size={16} /> View Applicants
                    </button>

                    <button
                      onClick={() => handleEditClick(job)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white"
                    >
                      <Pencil size={16} /> Update
                    </button>

                    <button
                      onClick={() => handleDelete(job._id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/40 text-red-400"
                    >
                      <X size={16} /> Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;