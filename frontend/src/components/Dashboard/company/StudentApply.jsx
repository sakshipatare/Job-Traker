import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Briefcase, LogOut, ArrowLeft } from "lucide-react";
import Footer from "../../Home/Footer";

const StudentApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      if (res.ok) {
        setApplicants(data);
      }

    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      if (res.ok) {
        fetchApplicants();
      }

    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">
            JobTracker
          </span>
        </Link>

        {/* <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium"
        >
          ← Back to Jobs
        </button> */}

        <div
          className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-600"
          onClick={() => navigate("/")}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Student Applicants</h2>
              <p className="text-gray-500 text-sm mt-1">
                Total Applicants: {applicants.length}
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              <ArrowLeft size={18} />
              Back to Jobs
            </button>
          </div>

          {/* No Applicants */}
          {applicants.length === 0 && (
            <p className="text-gray-500">No applicants yet.</p>
          )}

          {/* Applicants List */}
          <div className="space-y-5">
            {applicants.map((app) => (
              <div
                key={app._id}
                className="border rounded-xl p-5 bg-gray-50 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-lg">{app.student?.name}</p>
                    <p className="text-sm text-gray-500">{app.student?.email}</p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                      ${
                        app.status === "selected"
                          ? "bg-green-100 text-green-700"
                          : app.status === "shortlisted"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-sm mb-2">
                  <strong>Match:</strong> {app.matchPercentage?.toFixed(1)}%
                </p>

                <a
                  href={`http://localhost:5000/${app.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  View Resume
                </a>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    onClick={() => updateStatus(app._id, "shortlisted")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "selected")}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                  >
                    Select
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentApplicants;