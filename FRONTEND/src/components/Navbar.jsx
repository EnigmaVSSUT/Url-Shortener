import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* App Name */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        UrlSnap
      </Link>

      {/* Nav Links + Auth Buttons */}
      <div className="flex items-center space-x-6">
        <Link
          to="/features"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Features
        </Link>
        <Link
          to="/pricing"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Pricing
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          About
        </Link>

        <Link
          to="/auth"
          className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
