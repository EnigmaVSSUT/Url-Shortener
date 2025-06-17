import React, { useState } from "react";
import { registerUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Mail, Lock, User, Loader2, AlertCircle, ArrowRight, Github } from "lucide-react"

const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(name, email, password);
      setLoading(false);
      console.log("Registration successful:", data.message);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2
          className={`text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Create Account
        </h2>
        <p
          className={`mt-2 text-sm ${
            isDark ? "text-green-300" : "text-gray-600"
          }`}
        >
          Join LinkSnap and start shortening your URLs today
        </p>
      </div>

      {/* Register Form */}
      <div
        className={`relative rounded-xl shadow-2xl border overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-gray-800 border-green-900 shadow-green-900/20"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className={`block text-sm font-medium ${
                  isDark ? "text-green-400" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className={`h-5 w-5 ${
                      isDark ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    isDark
                      ? "bg-gray-700 border-green-900 text-green-100 placeholder-gray-500 focus:ring-green-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  isDark ? "text-green-400" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={`h-5 w-5 ${
                      isDark ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    isDark
                      ? "bg-gray-700 border-green-900 text-green-100 placeholder-gray-500 focus:ring-green-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  isDark ? "text-green-400" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className={`h-5 w-5 ${
                      isDark ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    isDark
                      ? "bg-gray-700 border-green-900 text-green-100 placeholder-gray-500 focus:ring-green-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                    isDark
                      ? "text-green-500 hover:text-green-400"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className={`p-3 rounded-lg border flex items-center space-x-2 ${
                  isDark
                    ? "bg-red-900/30 border-red-800 text-red-300"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isDark
                  ? "bg-green-600 hover:bg-green-700 text-black focus:ring-green-500 disabled:bg-gray-700 disabled:text-gray-500"
                  : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-gray-400 disabled:text-gray-300"
              } ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t ${
            isDark
              ? "bg-gray-900/50 border-green-900"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <p
            className={`text-center text-sm ${
              isDark ? "text-green-500" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <button
              onClick={() => state(true)}
              className={`font-medium transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-6 text-center">
        <Link
          to="/"
          className={`text-sm transition-colors ${
            isDark
              ? "text-green-400 hover:text-green-300"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
