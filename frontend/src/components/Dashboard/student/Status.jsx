import React, { useEffect, useState } from "react";
import {
  X,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Briefcase,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat";

const Status = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [openChatId, setOpenChatId] = useState(null);
  const [interviewInvites, setInterviewInvites] = useState([]);
  const [inviteModal, setInviteModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
    checkInterviewInvite();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const jobsRes = await fetch("http://localhost:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const appRes = await fetch("http://localhost:5000/applications/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const statsRes = await fetch("http://localhost:5000/students/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobsData = await jobsRes.json();
      const appData = await appRes.json();
      const statsData = await statsRes.json();

      if (jobsRes.ok) setJobs(Array.isArray(jobsData) ? jobsData : jobsData.jobs || []);
      if (appRes.ok) setApplications(appData);
      if (statsRes.ok) setStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkInterviewInvite = async () => {
  try {
    const res = await fetch("http://localhost:5000/interviews/my-invites", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (res.ok) {
      setInterviewInvites(data);
    }

  } catch (error) {
    console.error("Error fetching invite", error);
  }
};

const respondInterview = async (status, id) => {
  try {
    const res = await fetch(
      `http://localhost:5000/interviews/respond/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (res.ok) {
      checkInterviewInvite(); // refresh invites
    }

  } catch (error) {
    console.error("Response error", error);
  }
};

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", icon: Clock },
      selected: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", icon: CheckCircle },
      rejected: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/30", icon: XCircle },
      shortlisted: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", icon: CheckCircle },
    };
    return configs[status] || configs.pending;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader className="animate-spin w-8 h-8 text-fuchsia-400" />
      </div>
    );
  }

  const appliedJobs = jobs.filter((job) =>
    applications.some((app) => app.job === job._id || app.job?._id === job._id)
  );

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
        currentUserRole="student"
        onClose={() => setOpenChatId(null)}
      />
    </div>
  );
}

return (
  <div className="px-6 pt-6 pb-20">

      {/* Header */}
      <div className="mb-12 flex justify-between items-start gap-6">

        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
            Application Status
          </h1>
          <p className="text-slate-400 mt-2">
            Track all your job applications
          </p>
        </div>

       
        <div className="flex items-start">
        <button
          onClick={() => setInviteModal(true)}
          className="relative px-6 py-2 rounded-xl
          bg-gradient-to-r from-purple-500 to-cyan-400
          text-white font-semibold
          shadow-[0_0_25px_rgba(168,85,247,0.7)]
          hover:scale-105 transition"
        >
          Interview Invite

          <span className="absolute -top-2 -right-2 
                          bg-red-500 text-white 
                          text-xs px-2 py-0.5 
                          rounded-full">
            {interviewInvites.length}
          </span>
        </button>
      </div>
      
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total", value: stats.totalApplications || 0 },
            { label: "Selected", value: stats.selectedApplications || 0 },
            { label: "Pending", value: stats.pendingApplications || 0 },
            { label: "Rejected", value: stats.rejectedApplications || 0 },
          ].map((item, i) => (
            <div
              key={i}
              className="relative bg-[#070017]/80 backdrop-blur-xl p-6 rounded-3xl border border-purple-500/40 overflow-hidden shadow-[0_0_50px_rgba(129,140,248,0.25)]"
            >
              {/* Glow */}
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="text-3xl font-bold text-fuchsia-400">{item.value}</div>
                <p className="text-slate-400 text-sm mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applications Grid */}
      {appliedJobs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appliedJobs.map((job) => {
            const application = applications.find(
              (app) => app.job === job._id || app.job?._id === job._id
            );

            const statusConfig = getStatusConfig(application?.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={job._id}
                whileHover={{ y: -5 }}
                className="relative bg-[#070017]/80 backdrop-blur-xl rounded-3xl border border-purple-500/40 p-6 overflow-hidden shadow-[0_0_50px_rgba(129,140,248,0.25)]"
              >
                {/* Glow blobs */}
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <h3 className="text-lg font-semibold text-white">{job.title}</h3>

                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Building2 size={16} />
                    {job.company?.name}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin size={16} />
                    {job.location}
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${statusConfig.bg}`}
                  >
                    <StatusIcon size={16} className={statusConfig.color} />
                    <span className={`${statusConfig.color} font-medium capitalize`}>
                      {application?.status}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:shadow-[0_0_25px_#d946ef] transition-all text-sm font-medium text-white"
                  >
                    View Details
                  </button>

                  {["shortlisted", "selected"].includes(application?.status) && (
                    <button
                      onClick={() => setOpenChatId(application._id)}
                      className="w-full mt-3 py-2 rounded-xl 
                                border border-cyan-400/40 
                                text-cyan-300 hover:bg-cyan-400/10 
                                transition text-sm font-medium"
                    >
                      💬 Open Chat
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#070017]/80 backdrop-blur-xl border border-purple-500/40 p-12 rounded-3xl text-center relative shadow-[0_0_50px_rgba(129,140,248,0.25)]">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
          <Briefcase className="mx-auto mb-4 text-slate-500" size={40} />
          <p className="text-slate-400">No applications yet</p>
        </div>
      )}

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="relative bg-[#070017]/90 border border-purple-500/30 rounded-3xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh] shadow-[0_0_50px_rgba(129,140,248,0.35)]">
            {/* Glow */}
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-fuchsia-400">{selectedJob.title}</h2>
                <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-white">
                  <X />
                </button>
              </div>

              <div className="space-y-3 text-slate-300 text-sm">
                <div className="flex gap-2 items-center">
                  <Building2 size={16} />
                  {selectedJob.company?.name}
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin size={16} />
                  {selectedJob.location}
                </div>
                <div className="flex gap-2 items-center">
                  <DollarSign size={16} />
                  ₹{selectedJob.salary?.toLocaleString()}
                </div>
                <div className="flex gap-2 items-center">
                  <Calendar size={16} />
                  {new Date(selectedJob.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div>
                <h3 className="text-fuchsia-400 font-semibold mb-2">Description</h3>
                <p className="text-slate-400 text-sm whitespace-pre-wrap">{selectedJob.description}</p>
              </div>

              {selectedJob.skills?.length > 0 && (
                <div>
                  <h3 className="text-fuchsia-400 font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {inviteModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 z-50">

    <div className="bg-[#070017] border border-purple-500/40 rounded-3xl p-8 w-full max-w-2xl shadow-[0_0_40px_rgba(129,140,248,0.4)]">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-fuchsia-400">
          Interview Invitations
        </h2>

        <button
          onClick={() => setInviteModal(false)}
          className="text-slate-400 hover:text-white"
        >
          <X/>
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">

        {interviewInvites.map((invite) => (

          <div
            key={invite._id}
            className="border border-purple-500/30 rounded-xl p-4 bg-purple-500/5"
          >

            <div className="flex justify-between items-start">

              <div className="space-y-2 text-sm">

                <div className="flex gap-2 items-center text-white">
                  <Building2 size={16}/>
                  {invite.companyName}
                </div>

                <div className="flex gap-2 items-center text-slate-300">
                  <Briefcase size={16}/>
                  {invite.role}
                </div>

                <div className="flex gap-2 items-center text-slate-300">
                  <Calendar size={16}/>
                  {new Date(invite.scheduledAt).toLocaleString()}
                </div>

              </div>

              {/* Status */}
              <span className={`text-xs px-3 py-1 rounded-full
                ${
                  invite.status === "accepted"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : invite.status === "rejected"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {invite.status}
              </span>

            </div>

            {/* Actions */}
            {true && (
              <div className="flex gap-3 mt-4">

                <button
                  onClick={() => respondInterview("accepted", invite._id)}
                  className="flex-1 py-2 rounded-xl 
                    bg-emerald-500 text-white 
                    hover:bg-emerald-600
                    shadow-[0_0_15px_rgba(16,185,129,0.5)]
                    transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => respondInterview("rejected", invite._id)}
                  className="flex-1 py-2 rounded-xl 
                      bg-red-500 text-white 
                      hover:bg-red-600
                      shadow-[0_0_15px_rgba(239,68,68,0.5)]
                      transition"
                >
                  Reject
                </button>

              </div>
            )}

          </div>

        ))}

      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default Status;