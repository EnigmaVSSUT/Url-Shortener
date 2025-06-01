import { BarChart3, Link2, Shield, Zap, Eye, Globe } from "lucide-react"
import { useSelector } from "react-redux"


export default function Features() {

  const isDark = useSelector((state) => state.theme.isDark);
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate shortened URLs instantly with our optimized infrastructure. No waiting, no delays.",
      color: isDark ? "bg-green-900" : "bg-blue-100",
      textColor: isDark ? "text-green-400" : "text-blue-600",
      requiresSignIn: false,
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track clicks, geographic data, referrers, and more with detailed analytics and insights.",
      color: isDark ? "bg-green-900" : "bg-green-100",
      textColor: isDark ? "text-green-400" : "text-green-600",
      requiresSignIn: true,
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee. Your links are always accessible.",
      color: isDark ? "bg-green-900" : "bg-purple-100",
      textColor: isDark ? "text-green-400" : "text-purple-600",
      requiresSignIn: false,
    },
    {
      icon: Eye,
      title: "Custom Domains",
      description: "Use your own domain for branded short links. Build trust with your audience.",
      color: isDark ? "bg-green-900" : "bg-orange-100",
      textColor: isDark ? "text-green-400" : "text-orange-600",
      requiresSignIn: true,
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Fast redirects worldwide with our global content delivery network infrastructure.",
      color: isDark ? "bg-green-900" : "bg-red-100",
      textColor: isDark ? "text-green-400" : "text-red-600",
      requiresSignIn: false,
    },
    {
      icon: Link2,
      title: "Bulk Operations",
      description: "Shorten multiple URLs at once and manage large link campaigns efficiently.",
      color: isDark ? "bg-green-900" : "bg-indigo-100",
      textColor: isDark ? "text-green-400" : "text-indigo-600",
      requiresSignIn: true,
    },
  ]

  return (
    <section id="features" className={`py-12 sm:py-20 transition-colors ${isDark ? "bg-black" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Powerful Features for Modern Link Management
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDark ? "text-green-400" : "text-gray-600"}`}>
            Everything you need to create, manage, and track your shortened URLs effectively.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ${
                isDark
                  ? "bg-gray-900 border-green-900 hover:border-green-700"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? "text-green-400" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`text-sm sm:text-base ${isDark ? "text-green-300" : "text-gray-600"}`}>
                  {feature.description}
                </p>
                {feature.requiresSignIn && (
                  <p className={`text-xs mt-2 font-medium ${isDark ? "text-green-500" : "text-blue-600"}`}>
                    *Requires sign in
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
