import React, { useEffect, useState } from "react";
import { Building2, MapPin, Globe, Briefcase, Users, Pencil, Save, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Glow } from "../../ui/glow";

const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const [stats, setStats] = useState({ totalJobs: 0, totalApplicants: 0 });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const companyRes = await fetch("http://localhost:5000/companies/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const companyData = await companyRes.json();

      const statsRes = await fetch("http://localhost:5000/companies/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statsData = await statsRes.json();

      if (companyRes.ok) {
        setCompany(companyData);
        setFormData({
          name: companyData.name || "",
          location: companyData.location || "",
          website: companyData.website || ""
        });
      }

      if (statsRes.ok) setStats(statsData);

    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
    alert("Company name is required");
    return;
  }
  try {
    const res = await fetch("http://localhost:5000/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setCompany(data.company);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
};

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      const res = await fetch("http://localhost:5000/companies/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setCompany(data.company);
        setIsEditing(false);
        setSuccessMessage("Company profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

  if (loading) {
  return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-fuchsia-500 animate-spin" />
        <p className="text-slate-400 text-sm tracking-wide">
          Loading company profile...
        </p>
      </motion.div>
    </div>
  );
}

 if (!company) {
  return (
    <div className="py-16 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r 
          from-violet-400 to-fuchsia-500 bg-clip-text text-transparent mb-3">
            Create Company Profile
          </h1>
          <p className="text-slate-400">
            Set up your company information to start posting jobs
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl 
          bg-[#0f0f1a] border border-white/10 
          backdrop-blur-xl shadow-2xl p-10"
        >
          {/* Subtle Glow */}
          <Glow
            variant="top"
            color="purple"
            className="opacity-30 pointer-events-none"
          />

          <div className="relative z-10 space-y-8">

            {/* Company Name */}
            <InputField
              label="Company Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter company name"
            />

            {/* Location */}
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter company location"
            />

            {/* Website */}
            <InputField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCreate}
              className="w-full py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-violet-600 to-fuchsia-600 
              shadow-lg shadow-violet-500/30 
              hover:shadow-fuchsia-500/40 
              transition-all duration-300"
            >
              Create Company Profile
            </motion.button>

          </div>
        </motion.div>

      </div>
    </div>
  );
}

  return (
  <div className="relative">
    {/* Background Glow Effects */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" />
    </div>

    {/* Animated Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          Company Profile
        </h1>
        <p className="text-slate-400 mt-2">
          Manage your organization and track hiring performance
        </p>
      </div>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl 
          bg-gradient-to-r from-violet-600 to-fuchsia-600 
          text-white font-medium shadow-lg shadow-violet-500/30 
          hover:shadow-fuchsia-500/40 transition-all"
        >
          <Pencil size={16} /> Edit Profile
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl 
            bg-emerald-500 hover:bg-emerald-600 transition 
            text-white font-medium disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl 
            bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      )}
    </motion.div>

    {/* Success Alert */}
    <AnimatePresence>
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3"
        >
          <Check className="text-emerald-400" size={18} />
          <span className="text-emerald-300 text-sm">
            {successMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="grid lg:grid-cols-3 gap-8">

      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="group relative overflow-hidden lg:col-span-2 rounded-2xl 
        bg-white/5 backdrop-blur-xl border border-white/10 
        p-8 shadow-2xl hover:border-fuchsia-500/30 
        transition-all duration-500"
      >
        <Glow
          variant="top"
          color="purple"
          className="opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none"
        />
        <div className="relative z-10">
        <h2 className="text-lg font-semibold mb-8 flex items-center gap-2 text-white">
          <Building2 size={18} /> Company Information
        </h2>

        <div className="space-y-8">

          {/* Name */}
          <InfoField
            label="Company Name"
            icon={<Building2 size={18} />}
            value={company.name}
            editing={isEditing}
            field="name"
            formData={formData}
            setFormData={setFormData}
          />

          {/* Location */}
          <InfoField
            label="Location"
            icon={<MapPin size={18} />}
            value={company.location}
            editing={isEditing}
            field="location"
            formData={formData}
            setFormData={setFormData}
          />

          {/* Website */}
          <InfoField
            label="Website"
            icon={<Globe size={18} />}
            value={company.website}
            editing={isEditing}
            field="website"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        </div>
      </motion.div>

      {/* Stats Panel */}
      <div className="space-y-6">
        <StatCard
          icon={<Briefcase size={18} />}
          label="Total Jobs"
          value={stats.totalJobs}
        />
        <StatCard
          icon={<Users size={18} />}
          label="Total Applicants"
          value={stats.totalApplicants}
        />
      </div>
    </div>
  </div>
);
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">
      {label}
    </label>

    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl 
      bg-white/5 border border-white/10 
      text-white placeholder:text-slate-500
      focus:border-fuchsia-500 
      focus:ring-2 focus:ring-fuchsia-500/30
      focus:outline-none
      transition-all duration-300"
    />
  </div>
);

const InfoField = ({
  label,
  icon,
  value,
  editing,
  field,
  formData,
  setFormData,
}) => (
  <div>
    <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">
      {label}
    </label>

    {editing ? (
      <div className="relative">
        <input
          type="text"
          value={formData[field] || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              [field]: e.target.value,
            })
          }
          className="w-full pl-10 pr-4 py-3 rounded-xl 
          bg-white/5 border border-white/10 
          text-white placeholder:text-slate-500
          focus:border-fuchsia-500 
          focus:ring-2 focus:ring-fuchsia-500/30
          focus:outline-none
          transition-all duration-300"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400">
          {icon}
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-3 text-white">
        <span className="text-fuchsia-400">{icon}</span>
        <span>{value || "Not specified"}</span>
      </div>
    )}
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.06 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="group relative overflow-hidden rounded-2xl 
    bg-white/5 backdrop-blur-xl border border-white/10 
    p-6 cursor-pointer
    hover:border-fuchsia-500/40
    transition-all duration-500"
  >
    {/* Default Glow */}
    <Glow
      variant="top"
      color="violet"
      className="opacity-30 group-hover:opacity-0 transition duration-500 pointer-events-none"
    />

    {/* Hover Glow */}
    <Glow
      variant="top"
      color="pink"
      className="opacity-0 group-hover:opacity-70 transition duration-500 pointer-events-none"
    />

    <div className="relative z-10">
      <div className="flex items-center gap-3 text-slate-300 mb-3">
        <span className="text-fuchsia-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </div>

      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white"
      >
        {value}
      </motion.div>
    </div>
  </motion.div>
);

export default CompanyDetails;
