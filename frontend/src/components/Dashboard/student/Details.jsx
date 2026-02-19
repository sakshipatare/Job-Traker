import React, { useEffect, useState } from "react";
import { Eye, Download, Upload, CheckCircle, AlertCircle, FileText, User, Mail, Phone, BookOpen, Zap } from "lucide-react";

const Details = () => {
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/students/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStudent(data);
        setPhone(data.phone || "");
        setEducation(data.education || "");
        setSkills(data.skills?.join(", ") || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage({ type: "error", text: "Failed to load profile" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("phone", phone);
      formData.append("education", education);
      formData.append(
        "skills",
        JSON.stringify(skills.split(",").map((s) => s.trim()))
      );

      if (resume) {
        formData.append("resume", resume);
      }

      const response = await fetch(
        "http://localhost:5000/students/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setEditMode(false);
        setResume(null);
        setResumePreview(null);
        fetchProfile();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage({ type: "error", text: data.message || "Update failed" });
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage({ type: "error", text: "Failed to update profile" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setResumePreview(file.name);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Unable to load profile</p>
        </div>
      </div>
    );
  }

  const resumeName = student.resume ? student.resume.split("/").pop() : null;

  return (
    <div className="py-2">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Student Profile
          </h1>
          <p className="text-gray-600">Manage your professional information and resume</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 animate-in fade-in ${
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

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Profile Header Card */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{student.user?.name}</h2>
                <p className="text-blue-100">{student.user?.role}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {editMode ? (
              // Edit Mode
              <div className="space-y-6">
                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email (Read-only)</span>
                  </label>
                  <input
                    type="email"
                    value={student.user?.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Education</span>
                  </label>
                  <textarea
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="E.g., Bachelor of Science in Computer Science"
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                  />
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <span>Skills</span>
                  </label>
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                  />
                  <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Upload className="w-4 h-4 text-purple-600" />
                    <span>Resume</span>
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50/30 transition cursor-pointer group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx"
                    />
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition" />
                      <p className="text-sm font-medium text-gray-700">
                        {resumePreview ? `Selected: ${resumePreview}` : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditMode(false);
                      setResume(null);
                      setResumePreview(null);
                      setPhone(student.phone || "");
                      setEducation(student.education || "");
                      setSkills(student.skills?.join(", ") || "");
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Email</p>
                    <p className="text-lg text-gray-900 font-medium">{student.user?.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
                  <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Phone</p>
                    <p className="text-lg text-gray-900 font-medium">
                      {student.phone || <span className="text-gray-400">Not added yet</span>}
                    </p>
                  </div>
                </div>

                {/* Education */}
                <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
                  <BookOpen className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Education</p>
                    <p className="text-lg text-gray-900 font-medium">
                      {student.education || <span className="text-gray-400">Not added yet</span>}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex items-start space-x-4 pb-6 border-b border-gray-100">
                  <Zap className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Skills</p>
                    {student.skills && student.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {student.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 font-medium rounded-full text-sm border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Not added yet</span>
                    )}
                  </div>
                </div>

                {/* Resume */}
                <div className="flex items-start space-x-4">
                  <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Resume</p>
                    {resumeName ? (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-6 h-6 text-purple-600" />
                          <div>
                            <p className="font-medium text-gray-900">{resumeName}</p>
                            <p className="text-xs text-gray-500">PDF Document</p>
                          </div>
                        </div>
                        <a
                          href={`http://localhost:5000/${student.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-600 hover:text-purple-700 hover:scale-110 transition-transform"
                          title="View Resume"
                        >
                          <Eye className="w-6 h-6" />
                        </a>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 font-medium">No resume uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
