import { useState } from "react"
import RegisterForm from "../components/RegisterForm"
import { useSelector } from "react-redux"
import { Link2 } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"
import LoginForm from "../components/LoginForm"

const AuthPage = () => {
  const [login, setLogin] = useState(true)
  const isDark = useSelector((state) => state.theme.isDark)

  return (
    <div className={`min-h-screen flex flex-col-reverse lg:flex-row  transition-colors duration-300 ${
    isDark ? "bg-black" : "bg-gray-50"
  }`}>
      {/* Left Side - Hero Section */}
      <div
        className={`lg:flex lg:w-1/2 relative overflow-hidden ${
          isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-blue-600 to-blue-800"
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Link2 className="h-10 w-10 text-white" />
              <span className="text-3xl font-bold">LinkSnap</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{login ? "Welcome Back to LinkSnap" : "Join LinkSnap Today"}</h1>
            <p className="text-xl text-white/80 mb-8">
              {login
                ? "Sign in to access your dashboard, analytics, and manage all your shortened URLs."
                : "Create an account to start shortening URLs and tracking your links with advanced analytics."}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">Lightning-fast URL shortening</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">Advanced click analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">Custom domains & aliases</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">Team collaboration tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen">
        {/* Mobile Header with Theme Toggle */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Link2 className={`h-8 w-8 ${isDark ? "text-green-500" : "text-blue-600"}`} />
            <span className={`text-2xl font-bold ${isDark ? "text-green-400" : "text-gray-900"}`}>LinkSnap</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 lg:py-12">
          <div className="w-full max-w-md">
            {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
