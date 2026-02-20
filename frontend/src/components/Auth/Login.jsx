import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { ArrowLeft, Mail, Lock, CheckCircle2 } from "lucide-react";

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

        const apiUrl = "http://localhost:5000";

        try{
            const response = await fetch(`${apiUrl}/users/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Login response:", data);

            if (response.ok) {
                localStorage.setItem("userData", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user?._id);

                console.log(localStorage.getItem("userData"));
                console.log(localStorage.getItem("token"));
                console.log("Role:", data.user.role);

                const role = data.user.role;

                if (role === "student") {
                    navigate("/dashboard");
                } 
                else if (role === "company") {
                    navigate("/company-dashboard");
                }
                }else{
                    setError(data.message || "Login failed. Please try again.");
                }

        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/users/google-signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("userData", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                const role = data.user.role;

                if (role === "student") {
                    navigate("/dashboard");
                } 
                else if (role === "company") {
                    navigate("/company-dashboard");
                }
            } else {
                setError(data.message || "Google sign-in failed");
            }
        } catch (err) {
            console.error("Google login error:", err);
            setError("Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError("Google Sign-In failed. Try again.");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Back</span>
            </button>

            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-12 flex flex-col items-center justify-center text-center">
                      <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                      <p className="text-blue-100">Sign in to manage your jobs and applications</p>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                                </div>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                                    />
                                    <span className="ml-2.5 text-sm text-gray-700">Remember me</span>
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <div className="mt-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-600">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                            />
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Create now
                            </Link>
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-8 py-6 border-t border-gray-100 items-center justify-center text-center">
                        <p className="text-xs font-semibold text-gray-900 mb-3 flex items-center space-x-1 items-center justify-center text-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Demo credentials for testing:</span>
                        </p>
                        <div className="space-y-1 text-xs text-gray-700 bg-white rounded p-3 border border-gray-200">
                            <p><span className="font-medium">Email:</span> any@email.com</p>
                            <p><span className="font-medium">Password:</span> any password</p>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    Protected by enterprise-grade security
                </p>
            </div>
        </div>
    );
}