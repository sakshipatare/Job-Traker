import React, { useEffect, useState } from "react";
import { Building2, MapPin, Globe, Briefcase, Users, Pencil, Save, X, Check } from "lucide-react";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-900 mb-2">Company Profile Not Found</p>
          <p className="text-gray-600">Please create or complete your company profile to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Company Profile
            </h1>
            <p className="text-lg text-gray-600">Manage your company information and track performance</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold whitespace-nowrap"
            >
              <Pencil size={18} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-3 w-full md:w-auto flex-col md:flex-row">
              <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50"
              >
                <Save size={18} /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p className="text-emerald-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Company Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6" />
                  Company Information
                </h2>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">

                {/* Company Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                    Company Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base transition-colors"
                      placeholder="Enter company name"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-base text-gray-900">
                      <Building2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold">{company.name}</span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base transition-colors"
                      placeholder="Enter company location"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-base text-gray-900">
                      <MapPin className="w-6 h-6 text-cyan-600 flex-shrink-0" />
                      <span className="font-semibold">{company.location}</span>
                    </div>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base transition-colors"
                      placeholder="https://example.com"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-lg text-blue-600 hover:text-blue-700 underline font-semibold break-all"
                        >
                          {company.website}
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">Not provided</span>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Right Section - Stats */}
          <div className="space-y-6">

            {/* Total Jobs Posted */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 px-6 py-5">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-6 h-6 text-white" />
                  <p className="text-purple-100 text-sm font-semibold">Total Jobs Posted</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-purple-600 mb-1">{stats.totalJobs}</div>
                <p className="text-gray-600 text-sm">Active and archived positions</p>
              </div>
            </div>

            {/* Total Applicants */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-5">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-white" />
                  <p className="text-orange-100 text-sm font-semibold">Total Applicants</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-orange-600 mb-1">{stats.totalApplicants}</div>
                <p className="text-gray-600 text-sm">Applications received</p>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg border border-blue-300 p-6">
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 text-sm">Avg. Applications per Job</span>
                  <span className="text-white font-bold text-lg">
                    {stats.totalJobs > 0 ? (stats.totalApplicants / stats.totalJobs).toFixed(1) : "0"}
                  </span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.totalApplicants / (stats.totalJobs * 10)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDetails;
