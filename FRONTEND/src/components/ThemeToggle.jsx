import { Sun, Moon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../store/themeSlice"

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const isDark = useSelector((state) => state.theme.isDark)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 rounded-md transition-colors ${
        isDark
          ? "text-green-400 hover:text-green-300 hover:bg-green-900/30"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
