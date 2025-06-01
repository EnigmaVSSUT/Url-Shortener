import { useSelector } from "react-redux"
import { BarChart3, Link2, MousePointer } from "lucide-react"

const DashboardStats = ({ stats, loading }) => {
  const isDark = useSelector((state) => state.theme.isDark)

  const statCards = [
    {
      title: "Total Links",
      value: stats.totalLinks,
      icon: Link2,
      color: isDark ? "text-green-400" : "text-blue-600",
      bgColor: isDark ? "bg-green-900/20" : "bg-blue-50",
    },
    {
      title: "Total Clicks",
      value: stats.totalClicks.toLocaleString(),
      icon: MousePointer,
      color: isDark ? "text-green-400" : "text-purple-600",
      bgColor: isDark ? "bg-green-900/20" : "bg-purple-50",
    },
    {
      title: "Top Performer",
      value: stats.topPerformer ? `${stats.topPerformer.clicks || 0} clicks` : "No data",
      icon: BarChart3,
      color: isDark ? "text-green-400" : "text-orange-600",
      bgColor: isDark ? "bg-green-900/20" : "bg-orange-50",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`p-4 lg:p-6 rounded-xl border animate-pulse ${
              isDark ? "bg-gray-800 border-green-900" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`h-4 w-20 rounded mb-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-8 w-16 rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
              </div>
              <div className={`h-10 w-10 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`p-4 lg:p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
            isDark
              ? "bg-gray-800 border-green-900 hover:border-green-700"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? "text-green-300" : "text-gray-600"}`}>{stat.title}</p>
              <p className={`text-2xl lg:text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
