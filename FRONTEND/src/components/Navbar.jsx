import { Menu, Moon, Sun, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`transition-colors duration-300 border-b ${
        isDark ? "bg-gray-900 border-green-900" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-8 w-8 ${
                  isDark ? "text-green-500" : "text-blue-600"
                }`}
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span
                className={`text-xl font-bold ${
                  isDark ? "text-green-400" : "text-gray-900"
                }`}
              >
                LinkSnap
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="#features"
              className={`transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className={`transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="#about"
              className={`transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>

            <ThemeToggle />

            <Link
              to={isAuthenticated ? `/dashboard` : `/auth`}
              className={`transition-colors p-2 rounded px-4 ${
                isDark
                  ? "border-green-900 bg-green-700 text-black hover:bg-green-900"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {isAuthenticated ? `Dashboard` : `Sign In `}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
              className={`transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className={`transition-colors ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
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
                to="#features"
                className={`transition-colors ${
                  isDark
                    ? "text-green-400 hover:text-green-300"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="#pricing"
                className={`transition-colors ${
                  isDark
                    ? "text-green-400 hover:text-green-300"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="#about"
                className={`transition-colors ${
                  isDark
                    ? "text-green-400 hover:text-green-300"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to={isAuthenticated ? `/dashboard` : `/auth`}
                variant="outline"
                size="sm"
                className={`w-fit transition-colors ${
                  isDark
                    ? "border-green-500 text-green-400 hover:bg-green-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {isAuthenticated ? `Dashboard` : `Sign In `}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
