import React from 'react'
import { useDarkMode } from '../context/ThemeContext'

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode()
  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default DarkModeToggler
