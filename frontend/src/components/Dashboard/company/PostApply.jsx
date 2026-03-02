import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Zap, FileText, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


 const InputField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="text-sm text-slate-300 mb-2 flex items-center gap-2">
      <Icon className="w-4 h-4 text-fuchsia-300" />
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-slate-200 placeholder-slate-400 transition-all"
    />
  </div>
);
const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    skills: "",
    description: "",
    deadline: ""
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
          deadline: formData.deadline,
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
          description: "",
          deadline: ""
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
  <div className="relative px-6 pt-4 pb-20">

    {/* Page Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          Post a New Job
        </h1>
        <p className="text-slate-400 mt-2">
          Reach thousands of talented students by creating a detailed and attractive listing.
        </p>
      </div>
    </motion.div>

    {/* Success Message */}
    <AnimatePresence>
    {successMessage && (
      <div className="max-w-4xl mx-auto mb-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 flex items-start gap-3 animate-fade-in">
        <Check className="text-emerald-300 w-5 h-5 mt-1" />
        <div>
          <p className="text-emerald-200 font-semibold">Success</p>
          <p className="text-emerald-100 text-sm">{successMessage}</p>
        </div>
      </div>
    )}
    </AnimatePresence>

    {/* Error Message */}
    <AnimatePresence>
    {errorMessage && (
      <div className="max-w-4xl mx-auto mb-6 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 flex items-start gap-3">
        <AlertCircle className="text-red-300 w-5 h-5 mt-1" />
        <div>
          <p className="text-red-200 font-semibold">Error</p>
          <p className="text-red-100 text-sm">{errorMessage}</p>
        </div>
      </div>
    )}
    </AnimatePresence>

    {/* Glass Form Card */}
    <div className="relative max-w-4xl mx-auto rounded-3xl border border-purple-500/40 bg-[#070017]/80 backdrop-blur shadow-[0_0_50px_rgba(129,140,248,0.45)] p-10">

      {/* Glow background */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

      <form onSubmit={handleSubmit} className="relative space-y-8">

        {/* Title & Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            icon={Briefcase}
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Senior React Developer"
          />

          <InputField
            icon={MapPin}
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Remote / Pune / Bangalore"
          />
        </div>

        {/* Salary & Skills */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            icon={DollarSign}
            label="Salary (Optional)"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter yearly salary"
          />

          <InputField
            icon={Zap}
            label="Required Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div>
        <label className="text-sm text-slate-300 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-fuchsia-300" />
          Application Deadline
        </label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-slate-200 transition-all"
        />
      </div>

        {/* Description */}
        <div>
          <label className="text-sm text-slate-300 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-300" />
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe responsibilities, requirements, and expectations..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-slate-200 placeholder-slate-400 transition-all min-h-[140px]"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-[1.03] transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Posting...
              </>
            ) : (
              <>
                <Briefcase className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                Post Job
              </>
            )}
          </button>

          <button
            type="reset"
            onClick={() =>
              setFormData({ title: "", location: "", salary: "", skills: "", description: "", deadline: "" })
            }
            className="flex-1 px-6 py-3.5 rounded-xl border border-purple-400/40 bg-white/5 text-slate-200 hover:bg-white/10 transition-all"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default PostJob;
