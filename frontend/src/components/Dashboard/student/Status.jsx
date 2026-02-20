import React, { useEffect, useState } from "react";
import { Info, X, Building2, MapPin, Calendar, DollarSign, AlertCircle, CheckCircle, Clock, XCircle, Briefcase, FileText, Code } from "lucide-react";

const Status = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const jobsRes = await fetch("http://localhost:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobsData = await jobsRes.json();

      const appRes = await fetch("http://localhost:5000/applications/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const appData = await appRes.json();

      if (jobsRes.ok) setJobs(jobsData);
      if (appRes.ok) setApplications(appData);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
        borderColor: "border-yellow-200",
        icon: Clock,
        label: "Pending"
      },
      selected: {
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-200",
        icon: CheckCircle,
        label: "Selected"
      },
      rejected: {
        color: "from-red-500 to-rose-500",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        icon: XCircle,
        label: "Rejected"
      },
      shortlisted: {
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        icon: CheckCircle,
        label: "Shortlisted"
      }
    };
    return configs[status] || configs.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  const appliedJobs = jobs.filter((job) =>
    applications.some((app) => app.job === job._id || app.job?._id === job._id)
  );

  const stats = [
    { label: "Total Applications", value: appliedJobs.length, color: "from-blue-500 to-cyan-500" },
    { label: "Selected", value: applications.filter(a => a.status === "selected").length, color: "from-emerald-500 to-teal-500" },
    { label: "Pending", value: applications.filter(a => a.status === "pending").length, color: "from-yellow-500 to-amber-500" },
    { label: "Rejected", value: applications.filter(a => a.status === "rejected").length, color: "from-red-500 to-rose-500" }
  ];

  return (
    <div className="py-4">
      <div>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Application Status
          </h1>
          <p className="text-lg text-gray-600">Track all your job applications in one place</p>
        </div>

        {/* Stats Grid */}
        {appliedJobs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
              >
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Applications Grid */}
        {appliedJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobs.map((job) => {
              const application = applications.find(
                (app) => app.job === job._id || app.job?._id === job._id
              );
              const statusConfig = getStatusConfig(application?.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={job._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden hover:-translate-y-2"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                    <h3 className="font-bold text-lg text-white line-clamp-2">
                      {job.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Company */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-800 font-medium">{job.company?.name}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-cyan-600" />
                      </div>
                      <span className="text-gray-700">{job.location}</span>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center space-x-2 px-4 py-3 rounded-xl ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
                      <StatusIcon className={`w-5 h-5 ${statusConfig.textColor}`} />
                      <span className={`font-bold ${statusConfig.textColor} capitalize`}>
                        {application?.status || "Unknown"}
                      </span>
                    </div>

                    {/* Applied Date */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(application?.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold hover:bg-blue-50 py-2 rounded-lg transition-all"
                    >
                      <Info className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium mb-2">No applications yet</p>
            <p className="text-gray-500">Start applying to jobs to track your application status here.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">

            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 flex justify-between items-start rounded-t-2xl">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {selectedJob.title}
                </h2>
                <p className="text-blue-100 text-sm">Full application details</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8">
              {/* Application Status */}
              {applications.find((app) => app.job === selectedJob._id || app.job?._id === selectedJob._id) && (
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
                  {(() => {
                    const app = applications.find((app) => app.job === selectedJob._id || app.job?._id === selectedJob._id);
                    const statusConfig = getStatusConfig(app?.status);
                    const StatusIcon = statusConfig.icon;
                    return (
                      <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
                        <StatusIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
                        <span className={`text-xl font-bold ${statusConfig.textColor} capitalize`}>
                          {app?.status}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Company Info */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Company Information</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Company Name</p>
                    <p className="text-lg text-gray-900 font-medium">{selectedJob.company?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Location</p>
                    <p className="text-lg text-gray-900 font-medium">{selectedJob.company?.location}</p>
                  </div>
                  {selectedJob.company?.website && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Website</p>
                      <a
                        href={selectedJob.company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline text-lg"
                      >
                        {selectedJob.company.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Info */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-cyan-600" />
                  <span>Job Details</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Location</p>
                    <div className="flex items-center space-x-2 text-lg text-gray-900">
                      <MapPin className="w-5 h-5 text-cyan-600" />
                      <span>{selectedJob.location}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Salary</p>
                    <div className="flex items-center space-x-2 text-lg text-gray-900">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <span>₹{selectedJob.salary?.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Posted</p>
                    <div className="flex items-center space-x-2 text-lg text-gray-900">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <span>{new Date(selectedJob.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span>Description</span>
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description}
                </p>
              </div>

              {/* Skills */}
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <Code className="w-5 h-5 text-orange-600" />
                    <span>Required Skills</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedJob.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 font-semibold rounded-full border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-8 py-4 flex gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 px-6 font-semibold py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
