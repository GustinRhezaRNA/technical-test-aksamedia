import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    // Default to system if no saved theme or invalid theme
    if (!savedTheme || !['light', 'dark', 'system'].includes(savedTheme)) {
      return 'system'
    }
    return savedTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (newTheme) => {
      if (newTheme === 'dark') {
        root.classList.add('dark')
      } else if (newTheme === 'light') {
        root.classList.remove('dark')
      } else {
        // System preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const systemPrefersDark = mediaQuery.matches

        if (systemPrefersDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    }

    // Apply theme immediately
    applyTheme(theme)
    localStorage.setItem('theme', theme)

    // Setup listener for system theme changes
    let mediaQuery = null
    let handleChange = null

    if (theme === 'system') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      handleChange = () => {
        applyTheme('system')
      }

      // Add listener
      mediaQuery.addEventListener('change', handleChange)
    }

    // Cleanup function
    return () => {
      if (mediaQuery && handleChange) {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}