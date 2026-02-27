import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  LogOut,
  ArrowLeft,
  FileText,
} from "lucide-react";
import Footer from "../../Home/Footer";

const StudentApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
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
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
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
                      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-fuchsia-400 transition">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentApplicants;