import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold text-white">
                JobTracker
              </span>
            </div>
            <p className="text-sm text-gray-400">
              A modern job tracking system connecting students and companies efficiently.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
              <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <p className="text-sm text-gray-400">
              Email: support@jobtracker.com
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          © 2026 JobTracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
