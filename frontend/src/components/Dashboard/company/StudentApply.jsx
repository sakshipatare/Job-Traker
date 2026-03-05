import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  LogOut,
  ArrowLeft,
  FileText,
} from "lucide-react";
import Footer from "../../Home/Footer";
import Chat from "../Chat";

const StudentApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [openChatId, setOpenChatId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (jobId) fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/applications/job/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) setApplicants(data);
    } catch {
      setErrorMessage("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/applications/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        setSuccessMessage(`Application marked as ${status}`);
        fetchApplicants();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      setErrorMessage("Error updating status");
    }
  };

  const scheduleInterview = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/interviews/schedule/${selectedApplication}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          scheduledAt: interviewDate,
        }),
      }
    );

    if (res.ok) {
      setSuccessMessage("Interview scheduled successfully");
      setScheduleModal(false);
      setInterviewDate("");
      setSelectedApplication(null);
    } else {
      setErrorMessage("Failed to schedule interview");
    }
  } catch {
    setErrorMessage("Error scheduling interview");
  }
};

  const filtered =
    filterStatus === "all"
      ? applicants
      : applicants.filter((a) => a.status === filterStatus);

  const getStatusStyles = (status) => {
    switch (status) {
      case "selected":
        return "border-emerald-400/60 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.6)]";
      case "shortlisted":
        return "border-amber-400/60 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)]";
      case "rejected":
        return "border-red-400/60 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)]";
      default:
        return "border-slate-400/40 bg-slate-500/10 text-slate-300 shadow-[0_0_10px_rgba(148,163,184,0.5)]";
    }
  };

  const getCardHighlight = (status) => {
    switch (status) {
      case "selected":
        return "hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]";
      case "shortlisted":
        return "hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]";
      case "rejected":
        return "hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]";
      default:
        return "hover:shadow-[0_0_30px_rgba(129,140,248,0.4)]";
    }
  };

  if (openChatId) {
  return (
    <div className="px-6 pt-65 pb-20">
      <button
        onClick={() => setOpenChatId(null)}
        className="mb-6 px-4 py-2 rounded-xl 
                   bg-slate-800 hover:bg-slate-700 
                   text-white text-sm"
      >
        ← Back to Status
      </button>

      <Chat
        applicationId={openChatId}
        currentUserRole="company"
        onClose={() => setOpenChatId(null)}
      />
    </div>
  );
}

return (
    <div className="min-h-screen bg-gradient-to-b from-[#050014] via-[#08001f] to-[#050014] text-slate-100 flex flex-col">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-purple-500/30 bg-[#070017]/80 backdrop-blur-xl">
        <div className="px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-fuchsia-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              JobTracker
            </span>
          </Link>

          <div
            className="flex items-center gap-2 text-red-400 hover:text-red-500 font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <LogOut size={18} />
            Logout
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 pt-24 px-6 pb-6 max-w-6xl mx-auto w-full">
        <div className="rounded-3xl border border-purple-500/40 bg-[#070017]/70 backdrop-blur-xl shadow-[0_0_45px_rgba(129,140,248,0.35)] p-8">

          {/* Header */}
          <div className="mb-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-fuchsia-400 mb-4"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Job Applicants
            </h1>
            <p className="text-slate-400 mt-2">
              Review and manage candidate applications
            </p>
          </div>

          {/* Alerts */}
          {successMessage && (
            <div className="mb-6 border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 rounded-xl p-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-6 border border-red-400/40 bg-red-500/10 text-red-300 rounded-xl p-4">
              {errorMessage}
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {["all", "pending", "shortlisted", "selected", "rejected"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 py-2 rounded-xl font-semibold capitalize transition ${
                    filterStatus === status
                      ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white shadow-lg"
                      : "bg-white/5 border border-purple-500/30 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {/* Applicants */}
          {loading ? (
            <div className="text-center py-16 text-slate-400">
              Loading applicants...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              No applicants found.
            </div>
          ) : (
            <div className="grid gap-6">
              {filtered.map((app) => (
                <div
                  key={app._id}
                  className={`group relative overflow-hidden rounded-2xl border border-purple-500/40 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${getCardHighlight(
                    app.status
                  )}`}
                >
                  <div className="flex items-center justify-between bg-gradient-to-r from-[#120224] via-[#1b0536] to-[#0b0118] border-b border-purple-500/30 px-6 py-5">
                    <div>
                      <h3
                        onClick={() => setSelectedStudent(app.student)}
                        className="text-lg font-semibold text-slate-100 group-hover:text-fuchsia-400 transition cursor-pointer hover:underline"
                      >
                        {app.student?.user?.name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {app.student?.user?.email}
                      </p>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-xl border text-sm font-semibold capitalize ${getStatusStyles(
                        app.status
                      )}`}
                    >
                      {app.status || "pending"}
                    </div>
                  </div>

                  <div className="px-6 py-6 space-y-4">
                    <a
                      href={`http://localhost:5000/${app.student?.resume?.replace(/\\/g, "/")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 transition"
                    >
                      <FileText size={16} />
                      View Resume
                    </a>

                    <div className="flex gap-3 flex-wrap pt-4">
                      <button
                        onClick={() =>
                          updateStatus(app._id, "shortlisted")
                        }
                        className="px-4 py-2 rounded-xl border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 transition font-semibold"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app._id, "selected")
                        }
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-[1.03] transition font-semibold"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app._id, "rejected")
                        }
                        className="px-4 py-2 rounded-xl border border-red-400/40 text-red-400 hover:bg-red-500/10 transition font-semibold"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app._id, "pending")
                        }
                        className="px-4 py-2 rounded-xl border border-slate-400/40 text-slate-300 hover:bg-slate-400/10 transition font-semibold"
                      >
                        Pending
                      </button>

                      {["shortlisted", "selected"].includes(app.status) && (
                        <>
                          <button
                            onClick={() => setOpenChatId(app._id)}
                            className="px-4 py-2 rounded-xl border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 transition font-semibold"
                          >
                            💬 Open Chat
                          </button>

                          <button
                            onClick={() => {
                              setSelectedApplication(app._id);
                              setScheduleModal(true);
                            }}
                            className="px-4 py-2 rounded-xl border border-purple-400/40 text-purple-300 hover:bg-purple-400/10 transition font-semibold"
                          >
                            📅 Schedule Interview
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#0c0120] border border-purple-500/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(129,140,248,0.4)]">

            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-400 text-xl"
            >
              ✕
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-6 mb-6">
              <img
                src={
                  selectedStudent?.profilePhoto
                    ? `http://localhost:5000/${selectedStudent.profilePhoto.replace(/\\/g, "/")}`
                    : "https://via.placeholder.com/120"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-purple-500/40"
              />

              <div>
                <h2 className="text-2xl font-bold text-fuchsia-400">
                  {selectedStudent?.user?.name}
                </h2>
                <p className="text-slate-400">
                  {selectedStudent?.user?.email}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedStudent?.skills?.length > 0 ? (
                  selectedStudent.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">No skills added</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Education
              </h3>
              <p className="text-slate-300">
                {selectedStudent?.education || "Not provided"}
              </p>
            </div>

            {/* Resume */}
            <div>
              <a
                href={`http://localhost:5000/${selectedStudent?.resume?.replace(/\\/g, "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10 transition"
              >
                <FileText size={16} />
                View Resume
              </a>
            </div>
          </div>
        </div>
      )}

      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0c0120] border border-purple-500/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(129,140,248,0.4)]">

            <h2 className="text-xl font-bold text-fuchsia-400 mb-4">
              Schedule Interview
            </h2>

            <input
              type="datetime-local"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full mb-6 px-4 py-2 rounded-xl bg-black/40 border border-purple-400/30 text-white"
            />

            <div className="flex gap-3">
              <button
                onClick={scheduleInterview}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold"
              >
                Schedule
              </button>

              <button
                onClick={() => setScheduleModal(false)}
                className="flex-1 py-2 rounded-xl border border-slate-400/40 text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default StudentApplicants;