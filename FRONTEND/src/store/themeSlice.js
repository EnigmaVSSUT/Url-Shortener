import { createSlice } from "@reduxjs/toolkit"

// Check if user has a theme preference in localStorage or prefers dark mode
const getInitialTheme = () => {
  if (typeof window === "undefined") return false

  // Check localStorage first
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    return savedTheme === "dark"
  }

  // Otherwise check system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark

      // Update localStorage
      localStorage.setItem("theme", state.isDark ? "dark" : "light")

      // Update document class for global CSS
      if (state.isDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    },
    initTheme: (state) => {
      // Update document class for global CSS on initial load
      if (state.isDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    },
  },
})

export const { toggleTheme, initTheme } = themeSlice.actions

export default themeSlice.reducer
