import React, { useState } from "react";
import axios from "axios";
import { Copy, Check } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      const data = createShortUrl(url);
      setShortUrl(data);
      setUrl("");
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
