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
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Explore Jobs
          </h1>
          <p className="text-lg text-gray-600">Find and apply to opportunities that match your skills</p>
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
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mb-10">

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
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all text-gray-900 placeholder-gray-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                showFilters
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Sliders className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="space-y-4 pt-6 border-t-2 border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Title Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Frontend Developer"
                    value={filters.title}
                    onChange={(e) => {
                      setPage(1);
                      setFilters({ ...filters, title: e.target.value });
                    }}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all placeholder-gray-400"
                  />
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., New York, Remote"
                    value={filters.location}
                    onChange={(e) => {
                      setPage(1);
                      setFilters({ ...filters, location: e.target.value });
                    }}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all placeholder-gray-400"
                  />
                </div>

                {/* Salary Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Min. Salary</label>
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    value={filters.minSalary}
                    onChange={(e) => {
                      setPage(1);
                      setFilters({ ...filters, minSalary: e.target.value });
                    }}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all placeholder-gray-400"
                  />
                </div>

              </div>

              {/* Filter Actions */}
              {hasActiveFilters && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all"
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
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
              {searchTerm && (
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span>Search: {searchTerm}</span>
                  <button
                    onClick={() => {
                      setPage(1);
                      setSearchTerm("");
                    }}
                    className="hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {filters.title && (
                <div className="flex items-center gap-2 bg-cyan-100 text-cyan-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span>Title: {filters.title}</span>
                  <button
                    onClick={() => {
                      setPage(1);
                      setFilters({ ...filters, title: "" });
                    }}
                    className="hover:text-cyan-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {filters.location && (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span>Location: {filters.location}</span>
                  <button
                    onClick={() => {
                      setPage(1);
                      setFilters({ ...filters, location: "" });
                    }}
                    className="hover:text-green-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {filters.minSalary && (
                <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span>Min Salary: ₹{filters.minSalary}</span>
                  <button
                    onClick={() => {
                      setPage(1);
                      setFilters({ ...filters, minSalary: "" });
                    }}
                    className="hover:text-amber-900"
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
            <Loader className="animate-spin w-8 h-8 text-blue-600" />
          </div>
        ) :
        jobs.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                  <h3 className="font-bold text-xl text-white line-clamp-2">
                    {job.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Company */}
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {job.company?.name || "Company"}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="text-gray-600">{job.location}</span>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-600 font-semibold">
                      ₹{job.salary?.toLocaleString() || "Not specified"}
                    </span>
                  </div>

                  {/* Skills Preview */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex items-start space-x-2">
                      <Code className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 2).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            +{job.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Posted Date */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={appliedJobs.has(job._id)}
                    className={`flex-1 font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      appliedJobs.has(job._id)
                        ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105"
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
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">No jobs available at the moment</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
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

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {selectedJob.title}
                </h2>
                <p className="text-blue-100 text-sm">Full details</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Company Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Company Information</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Company Name</p>
                    <p className="text-lg text-gray-900">{selectedJob.company?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Company Location</p>
                    <p className="text-lg text-gray-900">{selectedJob.company?.location}</p>
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
                  {/* {selectedJob.company?.description && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Company Description
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedJob.company.description}
                    </p>
                  </div>
                )} */}
                </div>
              </div>

              {/* Job Details Section */}
              <div className="border-b border-gray-200 pb-6">
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

              {/* Description Section */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description}
                </p>
              </div>

              {/* Skills Section */}
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

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-4 flex gap-3">
              <button
                onClick={() => handleApply(selectedJob._id)}
                disabled={appliedJobs.has(selectedJob._id)}
                className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  appliedJobs.has(selectedJob._id)
                    ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105"
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
                className="px-6 font-semibold py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
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

export default Apply;
