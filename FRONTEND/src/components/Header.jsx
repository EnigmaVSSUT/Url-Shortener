import { useState } from "react";
import { Menu, X, Link2 } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { logOutuser } from "../api/user.api";

export default function Header() {
  const isDark = useSelector((state) => state.theme.isDark);
  const auth = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogOutUser = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await logOutuser();
      window.location.href = "/"
    } catch (error) {
      console.error("Error logging out:", error);
      setErrorMsg("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header
      className={`transition-colors duration-300 border-b ${
        isDark ? "bg-gray-900 border-green-900" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Link2
                className={`h-8 w-8 ${
                  isDark ? "text-green-500" : "text-blue-600"
                }`}
              />
              <span
                className={`text-xl font-bold ${
                  isDark ? "text-green-400" : "text-gray-900"
                }`}
              >
                LinkSnap
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className={`transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Features
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            {auth.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm ${
                    isDark ? "text-green-300" : "text-gray-600"
                  }`}
                >
                  {auth.user?.name || "User"}
                </span>
                <button
                onClick={handleLogOutUser}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    isDark
                      ? "border-green-500 text-green-400 hover:bg-green-900"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md border transition-colors ${
                  isDark
                    ? "border-green-500 text-green-400 hover:bg-green-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden py-4 border-t transition-colors ${
              isDark ? "border-green-900" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/features"
                className={`transition-colors ${
                  isDark
                    ? "text-green-400 hover:text-green-300"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>

              {auth.isAuthenticated ? (
                <button
                  onClick={handleLogOutUser}
                  className={`w-fit px-4 py-2 rounded-md border transition-colors ${
                    isDark
                      ? "border-green-500 text-green-400 hover:bg-green-900"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`w-fit px-4 py-2 rounded-md border transition-colors ${
                    isDark
                      ? "border-green-500 text-green-400 hover:bg-green-900"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
