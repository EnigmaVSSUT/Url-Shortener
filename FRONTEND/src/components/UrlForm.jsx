import { useState } from "react";
import { Copy, Check, AlertTriangle } from "lucide-react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";
import { Link } from "@tanstack/react-router";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const data = await createShortUrl(url, customUrl);
      setShortUrl(data);
      setUrl("");
      setCustomUrl("");
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    } catch (err) {
      console.error("Error generating short URL:", err);
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`max-w-2xl mx-auto transition-colors rounded-lg ${
        isDark ? "bg-gray-800 border-green-900" : "bg-white border-gray-200 shadow-lg"
      }`}
    >
      <div className="p-4 sm:p-6">
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="url"
              className={`text-left block ${
                isDark ? "text-green-400" : "text-gray-700"
              }`}
            >
              Enter your long URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError(null); // clear error on change
                }}
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                className={`flex-1 transition-colors p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-black ${
                  isDark
                    ? "bg-gray-700 border-none text-green-100 placeholder:text-gray-500"
                    : "bg-white border border-black text-gray-900 placeholder:text-gray-400"
                }`}
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 sm:px-8 transition-colors p-2 rounded cursor-pointer ${
                  isDark
                    ? "bg-green-600 text-black hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isLoading ? "Shortening..." : "Shorten"}
              </button>
            </div>
          </div>

          {isAuthenticated && (
            <input
              type="text"
              placeholder="Enter custom alias (optional)"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                setError(null); // clear error on change
              }}
              className={`w-full p-3 mb-4 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-black ${
                isDark
                  ? "bg-gray-700 border-none text-green-100 placeholder:text-gray-500"
                  : "bg-white border border-black text-gray-900 placeholder:text-gray-400"
              }`}
            />
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 border border-red-300 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}

          {shortUrl && (
            <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-between shadow-sm transition">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 break-all hover:underline"
              >
               {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-3 p-2 rounded-full hover:bg-gray-200 transition"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {!isAuthenticated && (
        <div
          className={`p-3 rounded-lg border-none ${
            isDark ? "text-green-300" : "text-blue-700"
          }`}
        >
          <p className="text-sm font-medium">
            💡 Want to track your links and access your dashboard?
            <Link
              to="/auth"
              className={`ml-1 underline ${
                isDark
                  ? "text-green-400 hover:text-green-300"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Sign in here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
