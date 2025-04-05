// contexts/ThemeContext.js
import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [colorTheme, setColorTheme] = useState('blue')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode, colorTheme, setColorTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
