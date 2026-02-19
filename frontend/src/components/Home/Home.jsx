import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  const features = [
    {
      icon: Briefcase,
      title: "Post & Manage Jobs",
      description:
        "Companies can easily create, update, and manage job postings."
    },
    {
      icon: Users,
      title: "Applicant Management",
      description:
        "Review, shortlist, and update application statuses in one place."
    },
    {
      icon: FileText,
      title: "Resume Tracking",
      description:
        "Students can upload resumes and track application progress."
    },
    {
      icon: BarChart3,
      title: "Smart Dashboard",
      description:
        "Get insights with statistics for jobs, applications, and hiring status."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Smart Hiring Made Simple
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          JobTracker is a modern Job Tracking Application that connects
          students and companies. Post jobs, apply easily, and track
          application status in real time.
        </p>

        <Link to="/signup">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center space-x-2 mx-auto">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">
          Why Choose JobTracker?
        </h2>

        <div className="max-w-4xl mx-auto space-y-4 text-lg">
          <div className="flex justify-center items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Secure Role-Based Access Control</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Real-Time Application Tracking</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Optimized Database & Fast Performance</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Scalable & Future-Ready Architecture</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
