import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/jobs", label: "Jobs" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#0b0b1f]/80 to-[#0b0b1f]/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 relative">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-lamp"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {/* Glow lamp */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-6 bg-fuchsia-500 rounded-full">
                        <div className="absolute -top-2 -left-2 h-6 w-10 bg-fuchsia-500/30 blur-lg rounded-full" />
                      </div>
                    </motion.div>
                  )}

                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <button className="text-sm font-medium text-slate-300 hover:text-white transition">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="relative overflow-hidden rounded-xl px-5 py-2 text-sm font-medium text-white 
                bg-gradient-to-r from-violet-600 to-fuchsia-600 
                shadow-lg shadow-violet-500/30 
                hover:shadow-fuchsia-500/40 transition-all">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-slate-300 hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (unchanged) */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0b0b1f]/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-medium text-slate-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10">
                  Login
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm text-white shadow-md">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}