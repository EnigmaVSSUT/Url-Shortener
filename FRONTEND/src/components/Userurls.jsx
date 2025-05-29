import React, { useState } from "react";
import { Copy } from "lucide-react";
import { getAllUserUrls } from "../api/user.api";
import { useQuery } from "@tanstack/react-query";

const UserUrls = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 10000,
  });

  const [copiedUrl, setCopiedUrl] = useState(null);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error fetching URLs: {error.message}
      </div>
    );
  }

  if (!urls || urls.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p className="text-gray-500 font-medium">No URLs found</p>
        <p className="mt-1">You haven't cretaed any shortened url</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Shortened URLs</h2>

      <div className="space-y-4">
        {urls.length === 0 ? (
          <p className="text-gray-500">No URLs found. Start shortening some!</p>
        ) : (
          urls.reverse().map((urlObj) => (
            <div
              key={urlObj._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-500 truncate">
                  <span className="font-medium text-gray-700">Full URL:</span>{" "}
                  {urlObj.fullUrl}
                </p>

                <a
                  href={`http://localhost:5000/${urlObj.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline break-all"
                >
                  <span className="font-medium text-gray-700">Short URL:</span>{" "}
                  {`http://localhost:5000/${urlObj.shortUrl}`}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Clicks:</span> {urlObj.clicks}
                </div>

                <button
                  onClick={() => handleCopy(urlObj.shortUrl)}
                  className="p-2 rounded-full hover:bg-gray-100 transition border border-gray-300"
                  title="Copy URL"
                >
                  <Copy className="h-5 w-5 text-gray-600" />
                </button>

                {copiedUrl === urlObj.shortUrl && (
                  <span className="text-green-600 text-sm">Copied!</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserUrls;
