import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">MySite</h2>
          <p className="text-sm text-gray-600">
            Building the web, one page at a time. 🚀
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-blue-600">
                Projects
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#">
              <Facebook size={20} />
            </a>
            <a href="#">
              <Instagram size={20} />
            </a>
            <a href="#">
              <Twitter size={20} />
            </a>
            <a href="#">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MySite. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
9
