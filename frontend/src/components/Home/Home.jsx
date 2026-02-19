import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Zap
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  const features = [
    {
      icon: Briefcase,
      title: "Post & Manage Jobs",
      description:
        "Companies can easily create, update, and manage job postings.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Applicant Management",
      description:
        "Review, shortlist, and update application statuses in one place.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: FileText,
      title: "Resume Tracking",
      description:
        "Students can upload resumes and track application progress.",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: BarChart3,
      title: "Smart Dashboard",
      description:
        "Get insights with statistics for jobs, applications, and hiring status.",
      gradient: "from-rose-500 to-pink-500"
    }
  ];

  const stats = [
    { value: "500+", label: "Active Jobs" },
    { value: "10K+", label: "Students" },
    { value: "200+", label: "Companies" },
    { value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Modern Recruitment Platform
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Smart Hiring
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            JobTracker is a modern Job Tracking Application that connects
            students and companies. Post jobs, apply easily, and track
            application status in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg shadow-blue-500/30">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold border-2 border-gray-200">
                Sign In
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-4">
              <Target className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                Powerful Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your recruitment process with our comprehensive suite of tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
              >
                {/* Icon Background Gradient */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for Success
            </h2>
            <p className="text-xl text-blue-100">
              Enterprise-grade features designed for modern recruitment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Secure Role-Based Access",
                description: "Enterprise-level security with JWT authentication and role-based permissions"
              },
              {
                icon: CheckCircle,
                title: "Real-Time Tracking",
                description: "Monitor application status and updates instantly with live notifications"
              },
              {
                icon: CheckCircle,
                title: "Optimized Performance",
                description: "Lightning-fast database queries and optimized frontend for best UX"
              },
              {
                icon: CheckCircle,
                title: "Future-Ready Architecture",
                description: "Scalable infrastructure ready to grow with your business needs"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-blue-100 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of companies and students already using JobTracker
          </p>
          <Link to="/signup">
            <button className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center space-x-2 mx-auto shadow-xl shadow-blue-500/30">
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
