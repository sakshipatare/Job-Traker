import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Zap,
  FileText,
  Upload,
  Image,
  Check,
  AlertCircle,
  X,
  Edit3,
  Eye,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InputField = ({
  icon: Icon,
  label,
  disabled = false,
  ...props
}) => (
  <div>
    <label className="text-sm text-slate-300 mb-2 flex items-center gap-2">
      <Icon className="w-4 h-4 text-fuchsia-300" />
      {label}
    </label>
    <input
      {...props}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 
      focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/40 
      outline-none text-slate-200 placeholder-slate-400 transition-all
      ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    />
  </div>
);

const Details = () => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    resume: null,
    profilePhoto: null,
  });

  const [originalData, setOriginalData] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumePath, setResumePath] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/students/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        const profileData = {
          name: data.user?.name || "",
          email: data.user?.email || "",
          phone: data.phone || "",
          education: data.education || "",
          skills: data.skills?.join(", ") || "",
          resume: null,
          profilePhoto: null,
        };

        setFormData(profileData);
        setOriginalData(profileData);

        if (data.resume) {
          const fileName = data.resume.split(/[/\\]/).pop();
          setResumeFileName(fileName);
          setResumePath(`http://localhost:5000/${data.resume}`);
        } else {
          setResumeFileName("");
          setResumePath("");
        }

        if (data.profilePhoto) {
          setPhotoPreview(`http://localhost:5000/${data.profilePhoto}`);
        } else {
          setPhotoPreview("");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to load profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, resume: file }));
        setResumeFileName(file.name);
      }
    } else if (name === "profilePhoto") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, profilePhoto: file }));
        setPhotoPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    fetchProfile();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const form = new FormData();
      form.append("phone", formData.phone);
      form.append("education", formData.education);
      form.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        )
      );

      if (formData.resume) form.append("resume", formData.resume);
      if (formData.profilePhoto)
        form.append("profilePhoto", formData.profilePhoto);

      const res = await fetch("http://localhost:5000/students/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (res.ok) {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
        fetchProfile();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage("Failed to update profile.");
      }
    } catch (err) {
      setErrorMessage("Server error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 pt-4 pb-20">

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
  >

    {/* Left Section */}
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Student Profile
      </h1>
      <p className="text-slate-400 mt-2 text-sm">
        Manage your professional information and resume
      </p>
    </div>

    {/* Right Section - Success Message */}
    <AnimatePresence>
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-3 rounded-xl bg-emerald-500/10 
          border border-emerald-500/30 flex items-center gap-3 
          backdrop-blur-md"
        >
          <Check className="text-emerald-400" size={18} />
          <span className="text-emerald-300 text-sm">
            {successMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>

  </motion.div>

      <div className="relative max-w-4xl mx-auto bg-[#070017]/80 p-10 rounded-3xl border border-purple-500/40 backdrop-blur shadow-[0_0_50px_rgba(168,85,247,0.45)] overflow-hidden">

      {/*  Top Glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/30 blur-3xl" />

      {/*  Bottom Glow */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

      {/*  Content Wrapper */}
      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Photo */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.6)]">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <User size={30} />
                </div>
              )}
            </div>

            {isEditing && (
              <label className="cursor-pointer px-4 py-2 bg-white/5 border border-purple-500/30 rounded-xl flex gap-2 items-center text-sm hover:shadow-[0_0_10px_#a855f7]">
                <Image size={16} />
                Change Photo
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField icon={User} label="Full Name" value={formData.name} disabled />
            <InputField icon={Mail} label="Email" value={formData.email} disabled />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField icon={Phone} label="Phone" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
            <InputField icon={BookOpen} label="Education" name="education" value={formData.education} onChange={handleChange} disabled={!isEditing} />
          </div>

          <InputField icon={Zap} label="Skills" name="skills" value={formData.skills} onChange={handleChange} disabled={!isEditing} />

          {/* Resume */}
          <div>
            <label className="text-sm text-slate-300 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-fuchsia-300" />
              Resume
            </label>

            <div className="flex items-center gap-4 flex-wrap">
              {resumeFileName ? (
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-purple-500/30">
                  <span className="text-slate-200 text-sm">
                    {resumeFileName}
                  </span>

                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/40 border border-fuchsia-400/40 transition-all hover:shadow-[0_0_12px_#d946ef]"
                  >
                    <Eye size={16} className="text-fuchsia-300" />
                  </a>
                </div>
              ) : (
                <span className="text-slate-400 text-sm">
                  No resume uploaded
                </span>
              )}

              {isEditing && (
                <label className="cursor-pointer px-4 py-2 rounded-xl bg-white/5 border border-purple-500/30 hover:bg-white/10 text-sm flex items-center gap-2 hover:shadow-[0_0_10px_#a855f7]">
                  <Upload size={16} />
                  {resumeFileName ? "Change" : "Upload"}
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Buttons */}
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 text-sm rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-[1.05] transition-all"
            >
              Update Profile
            </button>
          ) : (
            <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl 
                        bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.5)] 
                        hover:scale-[1.05] transition text-white font-medium disabled:opacity-50"
                      >
                        <Save size={16} />
                        {isSubmitting ? "Saving..." : "Save"}
                      </button>
            
                      <button
                         type="button"
                          onClick={handleCancel}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl 
                          border border-purple-400/40 bg-white/5 text-slate-200 
                          hover:bg-white/10 transition-all"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
          )}
        </form>
      </div>
      </div>
    </div>
  );
};

export default Details;