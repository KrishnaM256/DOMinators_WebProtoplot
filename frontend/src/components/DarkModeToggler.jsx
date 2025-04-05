import React from 'react'
import { useDarkMode } from '../context/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode()

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all duration-300 shadow-lg hover:scale-105"
    >
      <div
        className={`w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md flex items-center justify-center transform transition-all duration-300 ${
          darkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {darkMode ? (
          <FiMoon className="text-gray-900 text-lg" />
        ) : (
          <FiSun className="text-yellow-500 text-lg" />
        )}
      </div>
    </button>
  )
}

export default DarkModeToggler
