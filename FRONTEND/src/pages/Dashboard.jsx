import React from "react"
import { useSelector } from "react-redux"
import Header from "../components/Header.jsx"
import DashboardStats from "../components/DashboardStats"
import { useQuery } from "@tanstack/react-query"
import { getAllUserUrls } from "../api/user.api"
import { Plus, Link2 } from "lucide-react"
import UrlForm from "../components/UrlForm.jsx"
import UserUrls from "../components/Userurls.jsx"

const Dashboard = () => {
  const isDark = useSelector((state) => state.theme.isDark)
  const auth = useSelector((state) => state.auth)

  // Fetch user URLs for stats calculation
  const {
    data: urls = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 10000,
  })

  // Calculate stats from URLs - only using available data
  const stats = React.useMemo(() => {
    if (!urls || urls.length === 0) {
      return {
        totalLinks: 0,
        totalClicks: 0,
        topPerformer: null,
      }
    }

    const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0)
    const topPerformer = urls.reduce((top, url) => ((url.clicks || 0) > (top?.clicks || 0) ? url : top), null)

    return {
      totalLinks: urls.length,
      totalClicks,
      topPerformer,
    }
  }, [urls])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black" : "bg-gray-50"}`}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="mb-8">
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Welcome back, {auth.user?.name || "User"}!
          </h1>
          <p className={`mt-2 text-sm sm:text-base ${isDark ? "text-green-300" : "text-gray-600"}`}>
            Manage your shortened URLs and track their performance.
          </p>
        </div>

        {/* Stats Section */}
        <DashboardStats stats={stats} loading={isLoading} />

        {/* URL Shortener Form */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Plus className={`h-5 w-5 ${isDark ? "text-green-400" : "text-blue-600"}`} />
            <h2 className={`text-xl sm:text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Create New Short URL
            </h2>
          </div>

          {/* Enhanced URL Form Container */}
          <div
            className={`rounded-xl border overflow-hidden transition-all duration-300 ${
              isDark ? "bg-gray-800 border-green-900 shadow-green-900/20" : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <div className="p-6">
              <UrlForm />
            </div>
          </div>
        </div>

        {/* Links Management Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Link2 className={`h-5 w-5 ${isDark ? "text-green-400" : "text-blue-600"}`} />
            <h2 className={`text-xl sm:text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Your Links
            </h2>
          </div>
          <UserUrls />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
