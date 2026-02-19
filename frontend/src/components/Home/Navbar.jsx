import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2"> 
          <Briefcase className="w-7 h-7 text-blue-600" /> 
          <span className="text-xl font-bold text-blue-600"> JobTracker </span> 
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors ${location.pathname === "/"? "text-blue-600 font-semibold": "text-gray-600 hover:text-blue-600"}`}>
              Home
            </Link>
            {/* <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/docs" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Docs
            </Link> */}
            {/* <Link to="/contact" className={`font-medium transition-colors ${location.pathname === "/contact"? "text-blue-600 font-semibold": "text-gray-600 hover:text-blue-600"}`}>
              Contact
            </Link> */}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="px-5 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium">
                Get Started
              </button>
            </Link>
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">
              Home
            </Link>
            {/* <Link to="/pricing" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">
              Pricing
            </Link>
            <Link to="/docs" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">
              Docs
            </Link> */}
            {/* <Link to="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2">
              Contact
            </Link> */}
            <div className="pt-4 space-y-3 border-t">
              <Link to="/login" className="block">
                <button className="w-full px-5 py-2 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="block">
                <button className="w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium">
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