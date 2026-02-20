import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Briefcase, LogOut } from "lucide-react";
import CompanyDetails from "./company/CompanyDetails";
import PostApply from "./company/PostApply";
import StudentApply from "./company/StudentApply";
import CompanyJobs from "./company/CompanyJobs";
import Footer from "../Home/Footer";

const CompanyDashboard = () => {
  const [activePage, setActivePage] = useState("details");
  const navigate = useNavigate();

  const renderPage = () => {
    switch (activePage) {
      case "details":
        return <CompanyDetails />;
      case "apply":
        return <PostApply />;
      case "jobs":
        return <CompanyJobs />;
      case "applicants":
        return <StudentApply />;
      default:
        return <CompanyDetails />;
    }
  };

  const navLinkStyle = (page) =>
    `cursor-pointer pb-1 transition duration-200 ${
      activePage === page
        ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">
            JobTracker
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          <span
            className={navLinkStyle("details")}
            onClick={() => setActivePage("details")}
          >
            Details
          </span>

          <span
            className={navLinkStyle("apply")}
            onClick={() => setActivePage("apply")}
          >
            Post
          </span>

          <span
            className={navLinkStyle("jobs")}
            onClick={() => setActivePage("jobs")}
            >
            Jobs
            </span>

            <span
            className={navLinkStyle("applicants")}
            onClick={() => setActivePage("applicants")}
            >
            Applicants
            </span>
        </div>

        {/* Logout */}
        <div
          className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-600"
          onClick={() => navigate("/")}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          {renderPage()}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyDashboard;
