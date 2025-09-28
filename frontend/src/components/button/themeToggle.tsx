"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="h-8 w-8 rounded-md flex items-center justify-center text-red-400 hover:text-red-500 dark:text-sky-400 dark:hover:text-sky-500"
    >
      {resolvedTheme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  )
}
