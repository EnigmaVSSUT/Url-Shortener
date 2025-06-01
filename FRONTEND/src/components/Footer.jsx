import { Link2 } from "lucide-react"
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export default function Footer() {
  const isDark = useSelector((state) => state.theme.isDark);
  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  }

  return (
    <footer
      className={`py-8 sm:py-12 transition-colors ${
        isDark ? "bg-gray-900 text-green-400" : "bg-gray-800 text-gray-300"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Link2 className={`h-6 w-6 ${isDark ? "text-green-500" : "text-blue-400"}`} />
              <span className="text-lg font-bold">LinkSnap</span>
            </div>
            <p className={`text-sm ${isDark ? "text-green-500" : "text-gray-400"}`}>
              The fastest and most reliable URL shortener for modern businesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className={`space-y-2 text-sm ${isDark ? "text-green-500" : "text-gray-400"}`}>
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`transition-colors ${isDark ? "hover:text-green-300" : "hover:text-white"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className={`space-y-2 text-sm ${isDark ? "text-green-500" : "text-gray-400"}`}>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`transition-colors ${isDark ? "hover:text-green-300" : "hover:text-white"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className={`space-y-2 text-sm ${isDark ? "text-green-500" : "text-gray-400"}`}>
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`transition-colors ${isDark ? "hover:text-green-300" : "hover:text-white"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm transition-colors ${
            isDark ? "border-green-900 text-green-500" : "border-gray-700 text-gray-400"
          }`}
        >
          <p>&copy; {new Date().getFullYear()} LinkSnap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
