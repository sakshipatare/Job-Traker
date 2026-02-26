import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const apiUrl = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          confirmPassword,
          role,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/login");
        }, 8000);
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <AuroraBackground className="min-h-screen">
    <div className="w-full flex items-center justify-center px-4 py-12 relative">

    {/* Back */}
    <button
      onClick={() => navigate("/")}
      className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">Back</span>
    </button>

    {/* Main Card */}
    <div className="w-full max-w-5xl">
      <div className="grid md:grid-cols-[1.05fr_1fr] min-h-[650px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

        {/* LEFT PANEL (Visual like image) */}
        <div className="hidden md:flex flex-col p-10 relative overflow-hidden">
  {/* Background Image */}
  <img
    src="/business-office-remote-lifestyle.jpg"
    alt="Signup Illustration"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-between h-full">
    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        Welcome to JobTracker
      </h2>
      <p className="text-slate-200 text-sm max-w-sm">
        Track opportunities, manage applications, and connect with
        companies — all in one modern platform.
      </p>
    </div>

    <p className="text-xs text-slate-300">
      © {new Date().getFullYear()} JobTracker
    </p>
  </div>
</div>

        {/* RIGHT PANEL (Form) */}
        <div className="p-10 bg-[#0b0b1f]">
          <div className="flex justify-end mb-6 text-xs text-slate-400">
            Already have an account?
            <Link to="/login" className="ml-1 text-violet-400 hover:text-violet-300">
              Sign in
            </Link>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-2">
            Create account
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Get started in less than a minute
          </p>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" icon={User} value={firstName} setValue={setFirstName} placeholder="John"/>
              <Input label="Last Name" icon={User} value={lastName} setValue={setLastName} placeholder="Doe"/>
            </div>

            <Input label="Email Address" icon={Mail} value={email} setValue={setEmail} type="email" placeholder="you@example.com"/>
            <Input label="Password" icon={Lock} value={password} setValue={setPassword} type="password" placeholder="••••••••"/>
            <Input label="Confirm Password" icon={Lock} value={confirmPassword} setValue={setConfirmPassword} type="password" placeholder="••••••••"/>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select Role
              </label>
              <div className="flex gap-6 text-sm text-slate-400">
                {["student", "company"].map((r) => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      className="accent-violet-500"
                    />
                    <span className="capitalize">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold text-white
              shadow-lg shadow-violet-500/30 hover:shadow-fuchsia-500/40 transition-all
              disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-8 space-y-2 text-sm text-slate-400">
            {[
              "Curated job opportunities",
              "Simple hiring management",
              "Direct recruiter connections",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 mt-6">
        Enterprise-grade security • GDPR-ready
      </p>
    </div>

    {/* Success Modal */}
    {showSuccess && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="rounded-xl bg-[#0b0b1f] border border-white/10 p-6 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-violet-400" />
          <h2 className="text-lg font-semibold text-white mb-2">
            Account created
          </h2>
          <p className="text-sm text-slate-400">
            Please verify your email to continue.
          </p>
        </div>
      </div>
    )}
  </div>
  </AuroraBackground>
);
};

const Input = ({
  label,
  icon: Icon,
  value,
  setValue,
  type = "text",
  placeholder = "",
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white
        placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 outline-none"
      />
    </div>
  </div>
);

export default SignupForm;