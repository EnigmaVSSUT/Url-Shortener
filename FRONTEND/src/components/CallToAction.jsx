import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export default function CallToAction() {
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <section
      className={`py-12 sm:py-20 transition-colors ${
        isDark ? "bg-green-900" : "bg-blue-600"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
          Ready to Start Shortening?
        </h2>
        <p
          className={`text-lg sm:text-xl mb-6 sm:mb-8 ${
            isDark ? "text-green-200" : "text-blue-100"
          }`}
        >
          Join thousands of users who trust LinkSnap for their URL shortening
          needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/auth"
            className={`px-6 sm:px-8 transition-colors p-2 rounded-lg ${
              isDark
                ? "bg-black text-green-400 hover:bg-gray-900"
                : "bg-white text-blue-600 hover:bg-gray-100"
            }`}
          >
            Log In
          </Link>
          <Link
            to="#"
            className={`px-6 p-2 sm:px-8 border-white rounded-lg ${
              isDark
                ? "bg-black text-green-400 hover:bg-gray-900"
                : "bg-white text-blue-600 hover:bg-gray-100"
            }`}
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
