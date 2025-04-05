import { useState } from 'react'
import {
  FiMenu as Menu,
  FiX as X,
  FiActivity,
  FiHeart,
  FiAward,
  FiUser,
} from 'react-icons/fi'
import DarkModeToggler from './DarkModeToggler'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Nutrition', link: '/nutrition' },
    { name: 'Activities', link: '/activities' },
    { name: 'Community', link: '/community' },
  ]

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <FiHeart className="text-3xl mr-2 text-pink-600 dark:text-pink-400" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            VitalTrack
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <DarkModeToggler />
          <button className="px-4 py-2 rounded-full font-medium bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white transition-colors">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <DarkModeToggler />
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white dark:bg-gray-900">
          <div className="flex flex-col gap-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="py-2 text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button className="w-full mt-2 py-2 rounded-lg font-medium bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white transition-colors">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
