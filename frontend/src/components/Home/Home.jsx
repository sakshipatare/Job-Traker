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
import { AuroraBackground } from "../ui/AuroraBackground";

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
    <div className="min-h-screen bg-gradient-to-b from-[#050014] via-[#08001f] to-[#050014] text-slate-100">
      <Navbar />

      <AuroraBackground showRadialGradient>
        {/* Hero Section - Dark neon style */}
        <section className="relative w-full pt-28 md:pt-32 pb-20 md:pb-24 px-6 overflow-hidden">
        {/* Background gradients */}
        {/* <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-fuchsia-600/40 blur-3xl" />
          <div className="absolute top-40 -right-40 h-[420px] w-[420px] rounded-full bg-purple-500/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
        </div> */}

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-stretch">
          {/* Left column: copy + actions */}
          <div className="w-full max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium text-fuchsia-200 shadow-sm">
              <Sparkles className="h-4 w-4 text-fuchsia-400" />
              <span>AI-powered recruiting workspace</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-50">
            Smart Hiring
              <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Made Simple
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-slate-300">
            JobTracker is a modern Job Tracking Application that connects
            students and companies. Post jobs, apply easily, and track
            application status in real time.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-center">
              <Link to="/signup">
                <button className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.45)] transition-all hover:scale-[1.03]">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link to="/login">
                <button className="inline-flex items-center justify-center rounded-xl border border-purple-500/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-100 shadow-sm transition-all hover:border-purple-400 hover:bg-white/10">
                  Sign in to dashboard
                </button>
              </Link>
            </div>

            <div className="mt-5 flex flex-col items-center gap-3 text-xs text-slate-500 sm:flex-row lg:items-center">
              <div className="flex -space-x-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-500 text-[10px] font-semibold text-white">
                  JT
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-semibold text-white">
                  HR
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-semibold text-white">
                  CXO
                </span>
              </div>
              <span className="mt-1 sm:mt-0 text-slate-400">
                Trusted by teams at {stats[1].value}+ students and {stats[2].value}+ companies
              </span>
            </div>
          </div>

          {/* Right column: dashboard-style card */}
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-6 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-500/70 via-purple-500/60 to-cyan-400/60 blur-3xl" />
            <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-fuchsia-700/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-purple-500/40 bg-[#070017]/80 shadow-[0_0_45px_rgba(129,140,248,0.45)] backdrop-blur">
              {/* Header strip */}
              <div className="flex items-center justify-between border-b border-purple-500/20 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                  <span className="text-xs font-medium text-slate-100">
                    Live hiring overview
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                  <span className="h-6 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium">
                    Students
                  </span>
                  <span className="h-6 rounded-full bg-white/5 px-3 py-1 text-[10px]">
                    Companies
                  </span>
                </div>
              </div>

              <div className="grid gap-4 px-5 py-5 md:px-6 md:py-6">
                {/* Primary metric block */}
                <div className="rounded-2xl bg-gradient-to-br from-[#120224] via-[#1b0536] to-[#0b0118] px-5 py-4 text-white shadow-lg shadow-purple-900/60">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-fuchsia-200/80">
                        Active roles
                      </p>
                      <p className="mt-1 text-3xl font-semibold">
                        {stats[0].value}
                      </p>
                      <p className="mt-1 text-[11px] text-emerald-300">
                        +18% vs last month
                      </p>
                    </div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5">
                      <Briefcase className="h-5 w-5 text-fuchsia-300" />
                    </div>
                  </div>

                  {/* Simple sparkline */} 
                  <div className="mt-4 flex h-16 items-end gap-1">
                    {[20, 40, 28, 55, 38, 62, 48, 70].map((h, i) => (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        className="w-2 rounded-full bg-gradient-to-t from-fuchsia-500/60 via-purple-400/70 to-cyan-300/80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Secondary metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-3 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium text-slate-200">
                        Candidates in pipeline
                      </p>
                      <Users className="h-4 w-4 text-cyan-300" />
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-50">
                      {stats[1].value}
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-300">
                      3.2K new this week
                    </p>
                  </div>

                  <div className="rounded-2xl border border-purple-500/30 bg-white/5 p-3 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium text-slate-200">
                        Hiring success rate
                      </p>
                      <BarChart3 className="h-4 w-4 text-emerald-300" />
                    </div>
                    <p className="mt-2 text-lg font-semibold text-slate-50">
                      {stats[3].value}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Based on closed roles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </AuroraBackground>

      {/* Features Section - dark cards */}
      <section id="features" className="relative py-20 md:py-24 px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-2 mb-4">
              <Target className="w-4 h-4 text-fuchsia-300" />
              <span className="text-sm font-medium text-fuchsia-100">
                Powerful features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              Simplify your recruiting workflow
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
              From posting roles to closing offers, JobTracker centralizes every step
              of your hiring pipeline in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-purple-500/40 bg-white/5 p-6 shadow-[0_0_30px_rgba(88,28,135,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-400/70"
              >
                {/* Icon Background Gradient */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-slate-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Glow border */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 mix-blend-screen blur-xl transition-opacity duration-300 group-hover:opacity-60`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - deep gradient strip */}
      <section
        id="why-us"
        className="relative py-20 md:py-24 px-6 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b0536] via-[#2b0c56] to-[#060015]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-fuchsia-300/40 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-fuchsia-200" />
              <span className="text-sm font-medium text-white">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for Success
            </h2>
            <p className="text-base md:text-lg text-fuchsia-100/80">
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
                className="group bg-white/5 backdrop-blur-md border border-fuchsia-200/30 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-fuchsia-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-fuchsia-100" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-fuchsia-50/90 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - closing glow */}
      <section className="py-20 md:py-24 px-6">
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl border border-fuchsia-500/40 bg-gradient-to-r from-[#1b0536] via-[#2f105b] to-[#050014] px-8 py-12 text-center shadow-[0_0_40px_rgba(129,140,248,0.55)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-fuchsia-500/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" />

          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-sm md:text-base text-slate-200 mb-8">
            Join thousands of companies and students already using JobTracker
          </p>
          <Link to="/signup">
            <button className="group px-8 py-3.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white text-sm md:text-base rounded-xl hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] hover:scale-[1.03] transition-all duration-300 font-semibold flex items-center space-x-2 mx-auto">
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
