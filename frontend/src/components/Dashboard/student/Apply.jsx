import React, { useEffect, useState } from "react";
import {
  Eye,
  MapPin,
  DollarSign,
  Building2,
  Briefcase,
  Calendar,
  X,
  CheckCircle,
  AlertCircle,
  Code,
  Loader,
  Search,
  Sliders
} from "lucide-react";

const Apply = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // jobs per page
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    minSalary: ""
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [page, searchTerm, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/jobs?page=${page}&limit=${limit}&search=${searchTerm}&title=${filters.title}&location=${filters.location}&minSalary=${filters.minSalary}&sortBy=createdAt&order=desc`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data)) {
          // backend not updated yet
          setJobs(data);
          setTotalPages(1);
        } else {
          // paginated response
          setJobs(data.jobs || []);
          setTotalPages(data.totalPages || 1);
        }
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setMessage({ type: "error", text: "Failed to load jobs" });
    } finally {
      setLoading(false);
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
        setMessage({ type: "success", text: "Applied successfully!" });
        setAppliedJobs(new Set([...appliedJobs, jobId]));
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to apply" });
      }
    } catch (error) {
      console.error("Apply error:", error);
      setMessage({ type: "error", text: "Failed to apply to job" });
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center py-12">
  //       <div className="text-center">
  //         <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-gray-600 font-medium">Loading opportunities...</p>
  //       </div>
  //     </div>
  //   );
  // }

  const clearFilters = () => {
    setPage(1);
    setSearchTerm("");
    setFilters({ title: "", location: "", minSalary: "" });
  };

  const hasActiveFilters = searchTerm || filters.title || filters.location || filters.minSalary;

  return (
    <div className="py-4">
      <div>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Explore Jobs
          </h1>
          <p className="text-slate-400">Find and apply to opportunities that match your skills</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-lg flex items-center space-x-3 animate-in fade-in fixed top-4 right-4 z-40 shadow-lg max-w-md ${
              message.type === "success"
                ? "bg-emerald-50 border border-emerald-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span className={message.type === "success" ? "text-emerald-800" : "text-red-800"}>
              {message.text}
            </span>
          </div>
        )}

        {/* Search Section */}
        <div className="relative rounded-3xl border border-purple-500/40 bg-[#070017]/80 backdrop-blur shadow-[0_0_50px_rgba(168,85,247,0.45)] p-6 md:p-8 mb-10 overflow-hidden">

        {/* Glow Effects */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10">

          {/* Main Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, location..."
                value={searchTerm}
                onChange={(e) => {
                  setPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 
                  focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/40 
                  outline-none text-slate-200 placeholder-slate-400 transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap border ${
                showFilters
                  ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white border-transparent shadow-[0_0_25px_rgba(236,72,153,0.35)]"
                  : "bg-white/5 text-slate-100 border-purple-500/40 hover:border-fuchsia-400/70 hover:bg-white/10"
              }`}
            >
              <Sliders className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
                      <div className="space-y-4 pt-6 mb-8 border-t border-purple-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
                          {/* Title Filter */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                              Job Title
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Frontend Developer"
                              value={filters.title}
                              onChange={(e) => {
                                setPage(1);
                                setFilters({ ...filters, title: e.target.value });
                              }}
                              className="w-full px-4 py-2.5 rounded-xl border border-purple-500/40 bg-white/5 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/60 transition-all"
                            />
                          </div>
          
                          {/* Location Filter */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                              Location
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., New York, Remote"
                              value={filters.location}
                              onChange={(e) => {
                                setPage(1);
                                setFilters({ ...filters, location: e.target.value });
                              }}
                              className="w-full px-4 py-2.5 rounded-xl border border-purple-500/40 bg-white/5 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/60 transition-all"
                            />
                          </div>
          
                          {/* Salary Filter */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                              Min. Salary
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 50000"
                              value={filters.minSalary}
                              onChange={(e) => {
                                setPage(1);
                                setFilters({ ...filters, minSalary: e.target.value });
                              }}
                              className="w-full px-4 py-2.5 rounded-xl border border-purple-500/40 bg-white/5 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/60 transition-all"
                            />
                          </div>
          
                        </div>
          
                        {/* Filter Actions */}
                        {hasActiveFilters && (
                          <div className="flex justify-end pt-2">
                            <button
                              onClick={clearFilters}
                              className="flex items-center gap-2 px-4 py-2 text-rose-200 hover:bg-rose-500/10 rounded-lg font-semibold transition-all border border-rose-400/30 hover:border-rose-300/60"
                            >
                              <X className="w-4 h-4" />
                              Clear Filters
                            </button>
                          </div>
                        )}
                      </div>
                    )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-purple-500/20">
              {searchTerm && (
                <div className="flex items-center gap-2 bg-white/5 border border-cyan-400/30 text-slate-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span>Search: {searchTerm}</span>
                  <button
                    onClick={() => {
                      setPage(1);
                      setSearchTerm("");
                    }}
                    className="hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {filters.title && (
                <div className="flex items-center gap-2 bg-white/5 border border-fuchsia-400/30 text-slate-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span>Title: {filters.title}</span>
                  <button
                    onClick={() => {
                      setPage(1);
                      setFilters({ ...filters, title: "" });
                    }}
                    className="hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {filters.location && (
                              <div className="flex items-center gap-2 bg-white/5 border border-emerald-400/30 text-slate-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                                <span>Location: {filters.location}</span>
                                <button
                                  onClick={() => {
                                    setPage(1);
                                    setFilters({ ...filters, location: "" });
                                  }}
                                  className="hover:text-white"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                            {filters.minSalary && (
                              <div className="flex items-center gap-2 bg-white/5 border border-amber-400/30 text-slate-100 px-3 py-1.5 rounded-full text-sm font-semibold">
                                <span>Min Salary: ₹{filters.minSalary}</span>
                                <button
                                  onClick={() => {
                                    setPage(1);
                                    setFilters({ ...filters, minSalary: "" });
                                  }}
                                  className="hover:text-white"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
            </div>
          )}

        </div>

        {/* Jobs Grid */}
        {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader className="animate-spin w-8 h-8 text-fuchsia-300" />
                  </div>
                ) :
                jobs.length > 0 ? (
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                      <div
                        key={job._id}
                        className="group relative overflow-hidden rounded-2xl border border-purple-500/40 bg-white/5 shadow-[0_0_30px_rgba(88,28,135,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-400/70"
                      >
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-fuchsia-500/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="relative z-10">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-6 py-4">
                  <h3 className="font-bold text-lg md:text-xl text-white line-clamp-2">
                    {job.title}
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                                  {/* Company */}
                                  <div className="flex items-center space-x-2">
                                    <Building2 className="w-5 h-5 text-fuchsia-300 flex-shrink-0" />
                                    <span className="text-slate-100 font-medium">
                                      {job.company?.name || "Company"}
                                    </span>
                                  </div>
                
                                  {/* Location */}
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                                    <span className="text-slate-300">{job.location}</span>
                                  </div>
                
                                  {/* Salary */}
                                  <div className="flex items-center space-x-2">
                                    <DollarSign className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                                    <span className="text-slate-200 font-semibold">
                                      ₹{job.salary?.toLocaleString() || "Not specified"}
                                    </span>
                                  </div>
                
                                  {/* Skills Preview */}
                                  {job.skills && job.skills.length > 0 && (
                                    <div className="flex items-start space-x-2">
                                      <Code className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                                      <div className="flex flex-wrap gap-1">
                                        {job.skills.slice(0, 2).map((skill, idx) => (
                                          <span
                                            key={idx}
                                            className="px-2 py-1 bg-white/5 border border-purple-500/30 text-slate-100 text-xs font-medium rounded-full"
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                        {job.skills.length > 2 && (
                                          <span className="px-2 py-1 bg-white/5 border border-purple-500/20 text-slate-300 text-xs font-medium rounded-full">
                                            +{job.skills.length - 2}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                
                                  {/* Posted Date */}
                                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                
                                {/* Card Footer */}
                                <div className="px-6 py-4 border-t border-purple-500/20 flex gap-3">
                                  <button
                                    onClick={() => handleApply(job._id)}
                                    disabled={appliedJobs.has(job._id)}
                                    className={`flex-1 font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                                      appliedJobs.has(job._id)
                                        ? "bg-emerald-500/15 text-emerald-100 border border-emerald-400/30 cursor-not-allowed"
                                        : "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white hover:shadow-[0_0_25px_rgba(236,72,153,0.45)] hover:scale-[1.02]"
                                    }`}
                                  >
                                    {appliedJobs.has(job._id) ? (
                                      <>
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Applied</span>
                                      </>
                                    ) : (
                                      <>
                                        <Briefcase className="w-4 h-4" />
                                        <span>Apply</span>
                                      </>
                                    )}
                                  </button>
                
                                  <button
                                    onClick={() => setSelectedJob(job)}
                                    className="px-4 py-2 bg-white/5 border border-purple-500/30 text-slate-100 rounded-lg hover:bg-white/10 hover:border-fuchsia-400/60 transition-all duration-300 flex items-center justify-center"
                                    title="View Details"
                                  >
                                    <Eye className="w-5 h-5" />
                                  </button>
                                </div>
                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-500/15 via-purple-500/15 to-cyan-400/15 opacity-0 mix-blend-screen blur-xl transition-opacity duration-300 group-hover:opacity-60" />
              </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative text-center py-16 rounded-3xl border border-purple-500/40 bg-[#070017]/80 backdrop-blur shadow-[0_0_40px_rgba(168,85,247,0.4)] overflow-hidden">
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="relative z-10">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">No jobs available at the moment</p>
          </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white/5 border border-purple-500/30 text-slate-200 hover:bg-white/10 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-semibold text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-[#070017]/90 backdrop-blur-xl rounded-3xl border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.5)] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="relative z-10">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-6 md:px-8 py-5 md:py-6 flex items-start justify-between">
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {selectedJob.title}
                              </h2>
                              <p className="text-white/80 text-sm">Full details</p>
                            </div>
                            <button
                              onClick={() => setSelectedJob(null)}
                              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                            >
                              <X className="w-6 h-6" />
                            </button>
                          </div>
            
                          {/* Modal Body */}
                          <div className="p-6 md:p-8 space-y-6">
                            {/* Company Section */}
                            <div className="border-b border-purple-500/20 pb-6">
                              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center space-x-2">
                                <Building2 className="w-5 h-5 text-fuchsia-300" />
                                <span>Company Information</span>
                              </h3>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
                                    Company Name
                                  </p>
                                  <p className="text-base md:text-lg text-slate-50">
                                    {selectedJob.company?.name}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
                                    Company Location
                                  </p>
                                  <p className="text-base md:text-lg text-slate-50">
                                    {selectedJob.company?.location}
                                  </p>
                                </div>
                                {selectedJob.company?.website && (
                                  <div className="md:col-span-2">
                                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
                                      Website
                                    </p>
                                    <a
                                      href={selectedJob.company.website}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-cyan-300 hover:text-cyan-200 underline text-base md:text-lg"
                                    >
                                      {selectedJob.company.website}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

              {/* Job Details Section */}
                              <div className="border-b border-purple-500/20 pb-6">
                                <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center space-x-2">
                                  <Briefcase className="w-5 h-5 text-cyan-300" />
                                  <span>Job Details</span>
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
                                      Location
                                    </p>
                                    <div className="flex items-center space-x-2 text-base md:text-lg text-slate-50">
                                      <MapPin className="w-5 h-5 text-cyan-300" />
                                      <span>{selectedJob.location}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
                                      Salary
                                    </p>
                                    <div className="flex items-center space-x-2 text-base md:text-lg text-slate-50">
                                      <DollarSign className="w-5 h-5 text-emerald-300" />
                                      <span>₹{selectedJob.salary?.toLocaleString()}</span>
                                    </div>
                                  </div>
                                  <div className="md:col-span-2">
                                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
                                      Posted
                                    </p>
                                    <div className="flex items-center space-x-2 text-base md:text-lg text-slate-50">
                                      <Calendar className="w-5 h-5 text-amber-300" />
                                      <span>
                                        {new Date(selectedJob.createdAt).toLocaleDateString(
                                          "en-US",
                                          {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                          }
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
              
                              {/* Description Section */}
                              <div className="border-b border-purple-500/20 pb-6">
                                <h3 className="text-lg font-semibold text-slate-50 mb-3">
                                  Description
                                </h3>
                                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                                  {selectedJob.description}
                                </p>
                              </div>
              
                              {/* Skills Section */}
                              {selectedJob.skills && selectedJob.skills.length > 0 && (
                                <div>
                                  <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center space-x-2">
                                    <Code className="w-5 h-5 text-amber-300" />
                                    <span>Required Skills</span>
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedJob.skills.map((skill, index) => (
                                      <span
                                        key={index}
                                        className="px-3 py-1.5 bg-white/5 text-slate-100 font-semibold rounded-full border border-purple-500/30 text-xs"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

            {/* Modal Footer */}
                          <div className="sticky bottom-0 bg-[#070017]/80 border-t border-purple-500/20 px-6 md:px-8 py-4 flex gap-3 backdrop-blur">
                            <button
                              onClick={() => handleApply(selectedJob._id)}
                              disabled={appliedJobs.has(selectedJob._id)}
                              className={`flex-1 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                                appliedJobs.has(selectedJob._id)
                                  ? "bg-emerald-500/15 text-emerald-100 border border-emerald-400/30 cursor-not-allowed"
                                  : "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white hover:shadow-[0_0_25px_rgba(236,72,153,0.45)] hover:scale-[1.01]"
                              }`}
                            >
                              {appliedJobs.has(selectedJob._id) ? (
                                <>
                                  <CheckCircle className="w-5 h-5" />
                                  <span>Already Applied</span>
                                </>
                              ) : (
                                <>
                                  <Briefcase className="w-5 h-5" />
                                  <span>Apply Now</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => setSelectedJob(null)}
                              className="px-6 font-semibold py-3 bg-white/5 border border-purple-500/30 text-slate-100 rounded-xl hover:bg-white/10 hover:border-fuchsia-400/60 transition-all"
                            >
                              Close
                            </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Apply;
