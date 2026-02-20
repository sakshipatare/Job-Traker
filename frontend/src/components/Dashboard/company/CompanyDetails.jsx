import React, { useEffect, useState } from "react";
import { Building2, MapPin, Globe, Briefcase, Users, Pencil, Save, X } from "lucide-react";

const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const [stats, setStats] = useState({ totalJobs: 0, totalApplicants: 0 });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
        alert("Company profile updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!company) {
    return <p className="text-red-500">Company profile not found.</p>;
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Company Details</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Pencil size={16} /> Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Save size={16} /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-lg border">

        {/* Left Section */}
        <div className="space-y-4">

          <div className="flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-blue-600" />
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p><strong>Name:</strong> {company.name}</p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-cyan-600" />
            {isEditing ? (
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p><strong>Location:</strong> {company.location}</p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-emerald-600" />
            {isEditing ? (
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="border p-2 rounded w-full"
              />
            ) : (
              company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {company.website}
                </a>
              )
            )}
          </div>

        </div>

        {/* Right Section - Live Stats */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-lg">
            <Briefcase className="w-6 h-6 text-purple-600" />
            <p>
              <strong>Total Jobs Posted:</strong> {stats.totalJobs}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-lg">
            <Users className="w-6 h-6 text-orange-600" />
            <p>
              <strong>Total Applicants:</strong> {stats.totalApplicants}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDetails;