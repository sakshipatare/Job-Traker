import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Briefcase, LogOut, ArrowLeft, FileText, CheckCircle, AlertCircle, XCircle, Clock, Award } from "lucide-react";
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
    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      if (res.ok) {
        setApplicants(data);
      }

    } catch (error) {
      console.error("Error fetching applicants:", error);
      setErrorMessage("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      if (res.ok) {
        setSuccessMessage(`Application marked as ${status}`);
        fetchApplicants();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage("Failed to update status");
      }

    } catch (error) {
      console.error("Status update error:", error);
      setErrorMessage("Error updating status");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "selected":
        return <CheckCircle size={16} className="text-emerald-600" />;
      case "shortlisted":
        return <Award size={16} className="text-amber-600" />;
      case "rejected":
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "selected":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "shortlisted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredApplicants = filterStatus === "all"
    ? applicants
    : applicants.filter(app => app.status === filterStatus);

  const stats = {
    total: applicants.length,
    selected: applicants.filter(a => a.status === "selected").length,
    shortlisted: applicants.filter(a => a.status === "shortlisted").length,
    rejected: applicants.filter(a => a.status === "rejected").length,
    pending: applicants.filter(a => a.status === "pending").length,
  };

  return (
    <div className="flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="px-8 py-5 flex items-center justify-between max-w-7xl mx-auto w-full">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Briefcase className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              JobTracker
            </span>
          </Link>

          <div
            className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 font-semibold transition"
            onClick={() => navigate("/")}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-semibold"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Job Applicants
            </h1>
            <p className="text-lg text-gray-600">Review and manage candidate applications</p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-emerald-900 font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-900 font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">

          <div className="bg-white rounded-xl shadow border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Total</p>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-blue-600">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Pending</p>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-600">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Shortlisted</p>
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-amber-600">{stats.shortlisted}</p>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Selected</p>
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-emerald-600">{stats.selected}</p>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm font-semibold">Rejected</p>
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-red-600">{stats.rejected}</p>
          </div>

        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {["all", "pending", "shortlisted", "selected", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-2 rounded-xl font-semibold transition-all capitalize whitespace-nowrap ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "All Applicants" : status}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading applicants...</p>
          </div>
        )}

        {/* No Applicants */}
        {!loading && filteredApplicants.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-2">No applicants found</p>
            <p className="text-gray-600">
              {filterStatus === "all"
                ? "No one has applied to this job yet"
                : `No applicants with ${filterStatus} status`}
            </p>
          </div>
        )}

        {/* Applicants Grid */}
        {!loading && filteredApplicants.length > 0 && (
          <div className="grid gap-6">
            {filteredApplicants.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
              >

                {/* Applicant Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {app.student?.user?.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{app.student?.user?.email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span className="capitalize">{app.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applicant Details */}
                <div className="px-8 py-6 space-y-4">
                  <div className="grid md:grid-cols-3 gap-6">

                    <div>
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Match Score</p>
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke={app.matchPercentage >= 75 ? "#10b981" : app.matchPercentage >= 50 ? "#f59e0b" : "#ef4444"}
                              strokeWidth="8"
                              strokeDasharray={`${(app.matchPercentage || 0) * 2.83} 283`}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-900">{app.matchPercentage?.toFixed(0)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Skills Match</p>
                          <p className="text-sm text-gray-700 mt-1">
                            {app.matchPercentage >= 75 ? "Excellent match" : app.matchPercentage >= 50 ? "Good match" : "Fair match"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Resume</p>
                      <a
                        href={`http://localhost:5000/${app.student?.resume?.replace(/\\/g, "/")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl font-semibold transition-colors"
                      >
                        <FileText size={18} />
                        View Resume
                      </a>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Application Date</p>
                      <p className="text-gray-900 font-medium">
                        {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        }) : "N/A"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 flex-wrap">

                  <button
                    onClick={() => updateStatus(app._id, "shortlisted")}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 transition-all font-semibold"
                  >
                    <Award size={18} />
                    Shortlist
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "selected")}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg transition-all font-semibold"
                  >
                    <CheckCircle size={18} />
                    Select
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition-all font-semibold"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-gray-200">
        <Footer />
      </div>

    </div>
  );
};

export default StudentApplicants;
