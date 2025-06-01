import CallToAction from "../components/CallToAction.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";
import UrlForm from "../components/UrlForm.jsx";
import Navbar from "../components/Navbar.jsx";
import { useSelector } from "react-redux";

export default function HomePage() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black text-green-400" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar/>
      <section
        className={`py-12 sm:py-20 px-4 transition-colors ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Shorten URLs with
            <span className={`${isDark ? "text-green-400" : "text-blue-600"}`}>
              {" "}
              Lightning Speed
            </span>
          </h1>
          <p
            className={`text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto ${
              isDark ? "text-green-300" : "text-gray-600"
            }`}
          >
            Transform long, complex URLs into short, shareable links. Track
            clicks, analyze performance, and manage your links with ease.
          </p>
          <UrlForm />
        </div>
      </section>
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
