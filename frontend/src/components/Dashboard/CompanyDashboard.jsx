import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CompanyDetails from "./company/CompanyDetails";
import PostApply from "./company/PostApply";
import CompanyJobs from "./company/CompanyJobs";
import Footer from "../Home/Footer";
import { BeamsBackground } from "../ui/BeamsBackground";

const navItems = [
  { key: "details", label: "Details" },
  { key: "apply", label: "Post" },
  { key: "jobs", label: "Jobs" },
];

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
      default:
        return <CompanyDetails />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0b0b1f] to-black text-white">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#0b0b1f]/80 to-[#0b0b1f]/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/30">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                JobTracker
              </span>
            </Link>

            {/* Center Navigation with Motion */}
            <div className="hidden md:flex items-center gap-4 relative">
              {navItems.map((item) => {
                const isActive = activePage === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => setActivePage(item.key)}
                    className="relative px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="dashboard-lamp"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        {/* Glow Lamp */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-6 bg-fuchsia-500 rounded-full">
                          <div className="absolute -top-2 -left-2 h-6 w-10 bg-fuchsia-500/30 blur-lg rounded-full" />
                        </div>
                      </motion.div>
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Logout */}
            <div
              className="flex items-center gap-2 text-red-400 cursor-pointer hover:text-red-500 transition"
              onClick={() => navigate("/")}
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Page Content */}
      <BeamsBackground intensity="medium">
      <div className="pt-28 px-6 max-w-6xl mx-auto pb-24">
        <div className="bg-white/5 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </BeamsBackground>

      <Footer />
    </div>
  );
};

export default CompanyDashboard;