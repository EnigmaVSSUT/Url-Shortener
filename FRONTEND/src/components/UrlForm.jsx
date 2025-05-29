import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from '../main'

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  const {isAuthenticated} = useSelector((state) => state.auth);

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      const data = await createShortUrl(url, customUrl);
      setShortUrl(data);
      setUrl("");
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    } catch (err) {
      console.error("Error generating short URL:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <div className="max-w-xl mx-auto mt-20 px-6">
      <form
        onSubmit={handleUrlSubmit}
        className="bg-white shadow-xl rounded-xl p-3 space-y-4 border border-gray-100"
      >
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {isAuthenticated && (
        <input
          type="text"
          placeholder="Enter custom alias (optional)"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Shorten URL
        </button>

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
  );
};

export default UrlForm;
