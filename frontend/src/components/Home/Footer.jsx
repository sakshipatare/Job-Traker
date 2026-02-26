import { Link } from "react-router-dom";
import { Briefcase, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#050510] to-[#0b0b1f] text-slate-300">
      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-12 md:grid-cols-4 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl 
                bg-gradient-to-br from-violet-600 to-fuchsia-600 
                shadow-lg shadow-violet-500/30">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                JobTracker
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A modern job tracking platform helping students and companies
              connect with clarity, speed, and transparency.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white transition">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  For Companies
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition">
                  For Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>help@jobtracker.com</li>
              <li>+91-00000-00000</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Stay connected
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              Product updates, hiring insights, and announcements.
            </p>
            <div className="flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="group flex h-9 w-9 items-center justify-center rounded-full 
                    border border-white/10 bg-white/5 
                    hover:border-violet-500/40 
                    hover:bg-violet-500/10 
                    transition-all"
                >
                  <Icon className="h-4 w-4 text-slate-300 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JobTracker. All rights reserved.</p>
          <div className="flex gap-4">
            <button className="hover:text-slate-300 transition">Privacy</button>
            <button className="hover:text-slate-300 transition">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}