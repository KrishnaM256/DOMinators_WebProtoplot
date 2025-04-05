import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import DarkModeToggler from './DarkModeToggler'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
    { name: 'Contact', link: '/contact' },
  ]

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items- center dark:text-white">
        <div className="text-2xl font-bold text-blue-600">MySite</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <DarkModeToggler />
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
