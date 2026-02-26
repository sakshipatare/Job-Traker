import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowLeft, Mail, Lock, CheckCircle2 } from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        data.user.role === "company"
          ? navigate("/company-dashboard")
          : navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Something went wrong. Try again later.");
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
        <span className="hidden sm:inline text-sm font-medium">Back</span>
      </button>

      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden animate-fade-in">

          {/* Header */}
          <div className="px-8 py-10 text-center bg-gradient-to-r from-fuchsia-600/10 via-purple-600/10 to-cyan-600/10">
            <h1 className="text-3xl font-semibold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to continue to JobTracker
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                icon={Mail}
                type="email"
                value={email}
                setValue={setEmail}
                placeholder="you@example.com"
              />

              <Input
                label="Password"
                icon={Lock}
                type="password"
                value={password}
                setValue={setPassword}
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between text-sm text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-fuchsia-500"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-fuchsia-400 hover:text-fuchsia-300"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 py-3 text-sm font-semibold text-white
                shadow-lg shadow-fuchsia-500/30 hover:shadow-cyan-500/40 transition-all disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-transparent px-3 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google */}
            <div className="flex justify-center">
              <GoogleLogin
                theme="filled_black"
                size="large"
                shape="pill"
                text="signin_with"
                width="320"
                />
            </div>

            <p className="mt-8 text-center text-sm text-slate-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-fuchsia-400 hover:text-fuchsia-300 font-medium"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 bg-white/5 px-8 py-6 text-center text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Demo credentials enabled
            </div>
            <p>Email: any@email.com</p>
            <p>Password: any password</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Enterprise-grade security • GDPR-ready
        </p>
      </div>
    </div>
    </AuroraBackground>
  );
}

const Input = ({ label, icon: Icon, value, setValue, type, placeholder }) => (
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
        placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/30 outline-none"
      />
    </div>
  </div>
);