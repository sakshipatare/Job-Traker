import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Zap, FileText, Check, AlertCircle } from "lucide-react";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    skills: "",
    description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          description: formData.description,
          salary: formData.salary ? Number(formData.salary) : undefined,
          skills: formData.skills
            .split(",")
            .map(skill => skill.trim())
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Job posted successfully! Your listing is now live.");
        setFormData({
          title: "",
          location: "",
          salary: "",
          skills: "",
          description: ""
        });
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        setErrorMessage(data.message || "Failed to post job. Please try again.");
      }

    } catch (error) {
      console.error("Error posting job:", error);
      setErrorMessage("Server error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4">
      <div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Post a New Job
            </h1>
          </div>
          <p className="text-lg text-gray-600 ml-0 md:ml-16">Create a compelling job listing to attract top talent</p>
        </div>

        {successMessage && (
          <div className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-900 font-bold text-lg">Success!</p>
              <p className="text-emerald-800">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-900 font-bold text-lg">Error</p>
              <p className="text-red-800">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-6">
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Job Details</p>
            <h2 className="text-2xl font-bold text-white mt-1">Fill in the job information</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">

            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    Job Title
                  </div>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Senior React Developer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base font-medium transition-colors placeholder:text-gray-400"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    Location
                  </div>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., San Francisco, CA or Remote"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base font-medium transition-colors placeholder:text-gray-400"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Salary (Optional)
                  </div>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    type="number"
                    name="salary"
                    placeholder="Enter salary in USD"
                    className="w-full pl-8 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base font-medium transition-colors placeholder:text-gray-400"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    Required Skills
                  </div>
                </label>
                <input
                  type="text"
                  name="skills"
                  placeholder="e.g., React, TypeScript, Node.js"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base font-medium transition-colors placeholder:text-gray-400"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Separate skills with commas</p>
              </div>

            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide block mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Job Description
                </div>
              </label>
              <textarea
                name="description"
                placeholder="Write a detailed job description including responsibilities, requirements, benefits, and company culture..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base font-medium transition-colors placeholder:text-gray-400 min-h-40 resize-none"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Posting Job...
                  </>
                ) : (
                  <>
                    <Briefcase className="w-5 h-5" />
                    Post Job
                  </>
                )}
              </button>
              <button
                type="reset"
                onClick={() => {
                  setFormData({ title: "", location: "", salary: "", skills: "", description: "" });
                  setErrorMessage("");
                }}
                className="px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all font-semibold"
              >
                Clear
              </button>
            </div>

          </form>

        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Be Specific</h3>
            <p className="text-gray-600 text-sm">Use clear job titles and detailed descriptions to attract qualified candidates.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Highlight Skills</h3>
            <p className="text-gray-600 text-sm">List all required and nice-to-have skills to help candidates self-assess.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Be Competitive</h3>
            <p className="text-gray-600 text-sm">Include salary information to attract serious candidates and set expectations.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostJob;
