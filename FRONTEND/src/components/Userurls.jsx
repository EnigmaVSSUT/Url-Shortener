import { useState } from "react"
import { Copy, ExternalLink, BarChart3, Search, Check, Link2 } from "lucide-react"
import { getAllUserUrls } from "../api/user.api"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

const UserUrls = () => {
  const isDark = useSelector((state) => state.theme.isDark)
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedUrl, setCopiedUrl] = useState(null)

  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 10000,
  })

  console.log("Fetched URLs:", urls);
  

  const handleCopy = (shortUrl) => {
      const fullUrl = `https://linksnap-backend.vercel.app/${shortUrl}`
      navigator.clipboard.writeText(fullUrl)
    setCopiedUrl(shortUrl)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const truncateUrl = (url, maxLength = 50) => {
    if (!url || url.length <= maxLength) return url
    return url.substring(0, maxLength) + "..."
  }

  const filteredUrls =
    urls?.filter(
      (urlObj) =>
        urlObj.fullUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        urlObj.shortUrl?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  if (isLoading) {
    return (
      <div
        className={`rounded-xl border overflow-hidden ${
          isDark ? "bg-gray-800 border-green-900" : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className={`h-4 w-1/3 rounded mb-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-4 w-1/2 rounded mb-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-4 w-1/4 rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className={`rounded-xl border p-8 text-center ${
          isDark ? "bg-gray-800 border-red-900" : "bg-white border-red-200"
        }`}
      >
        <div className={`text-red-500 ${isDark ? "text-red-400" : "text-red-600"}`}>
          <p className="font-medium">Error fetching URLs</p>
          <p className="text-sm mt-1">{error?.message || "Something went wrong"}</p>
        </div>
      </div>
    )
  }

  if (!urls || urls.length === 0) {
    return (
      <div
        className={`rounded-xl border p-8 lg:p-12 text-center ${
          isDark ? "bg-gray-800 border-green-900" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDark ? "bg-green-900/20" : "bg-blue-50"
          }`}
        >
          <Link2 className={`h-8 w-8 ${isDark ? "text-green-400" : "text-blue-600"}`} />
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>No URLs yet</h3>
        <p className={`text-sm ${isDark ? "text-green-300" : "text-gray-600"}`}>
          Create your first shortened URL using the form above.
        </p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? "bg-gray-800 border-green-900" : "bg-white border-gray-200"
      }`}
    >
      <div className={`p-4 lg:p-6 border-b ${isDark ? "border-green-900" : "border-gray-200"}`}>
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? "text-green-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search your links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
              isDark
                ? "bg-gray-700 border-green-900 text-green-100 placeholder-gray-500 focus:ring-green-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
            }`}
          />
        </div>
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-green-400" : "text-gray-500"
                }`}
              >
                Short URL
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-green-400" : "text-gray-500"
                }`}
              >
                Original URL
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-green-400" : "text-gray-500"
                }`}
              >
                Clicks
              </th>
              <th
                className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-green-400" : "text-gray-500"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUrls.reverse().map((urlObj) => (
              <tr key={urlObj._id} className={`hover:${isDark ? "bg-gray-700/50" : "bg-gray-50"} transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <a
                      href={`https://linksnap-backend.vercel.app/${urlObj.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-medium hover:underline ${
                        isDark ? "text-green-400 hover:text-green-300" : "text-blue-600 hover:text-blue-800"
                      }`}
                    >
                      {urlObj.shortUrl}
                    </a>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm ${isDark ? "text-green-300" : "text-gray-600"}`}>
                    {truncateUrl(urlObj.fullUrl, 60)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <BarChart3 className={`h-4 w-4 ${isDark ? "text-green-500" : "text-blue-500"}`} />
                    <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {urlObj.clicks || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleCopy(urlObj.shortUrl)}
                    className={`p-2 rounded-lg transition-colors ${
                      copiedUrl === urlObj.shortUrl
                        ? "bg-green-100 text-green-600"
                        : isDark
                          ? "text-green-400 hover:bg-green-900/30"
                          : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Copy short URL"
                  >
                    {copiedUrl === urlObj.shortUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
        {filteredUrls.reverse().map((urlObj) => (
          <div key={urlObj._id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <a
                  href={`https://linksnap-backend.vercel.app/${urlObj.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-medium text-sm hover:underline flex items-center space-x-1 ${
                    isDark ? "text-green-400 hover:text-green-300" : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  <span>{urlObj.shortUrl}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  onClick={() => handleCopy(urlObj.shortUrl)}
                  className={`p-2 rounded-lg transition-colors ${
                    copiedUrl === urlObj.shortUrl
                      ? "bg-green-100 text-green-600"
                      : isDark
                        ? "text-green-400 hover:bg-green-900/30"
                        : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {copiedUrl === urlObj.shortUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className={`text-sm ${isDark ? "text-green-300" : "text-gray-600"}`}>
                <span className="font-medium">Original: </span>
                {truncateUrl(urlObj.fullUrl, 50)}
              </div>

              <div className="flex items-center space-x-1">
                <BarChart3 className={`h-4 w-4 ${isDark ? "text-green-500" : "text-blue-500"}`} />
                <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  {urlObj.clicks || 0} clicks
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUrls.length === 0 && searchTerm && (
        <div className="p-8 text-center">
          <p className={`text-sm ${isDark ? "text-green-300" : "text-gray-600"}`}>
            No links found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  )
}

export default UserUrls
