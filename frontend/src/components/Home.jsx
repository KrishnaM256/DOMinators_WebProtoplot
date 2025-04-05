import { useState, useEffect } from 'react'
import {
  FiSun,
  FiMoon,
  FiActivity,
  FiHeart,
  FiAward,
  FiBarChart2,
  FiUser,
} from 'react-icons/fi'
import { MdOutlineRestaurant, MdOutlineWaterDrop } from 'react-icons/md'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true)
    }

    setAnimated(true)

    return () => setAnimated(false)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? 'dark bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <FiHeart
              className={`text-3xl mr-2 ${
                darkMode ? 'text-pink-400' : 'text-pink-600'
              }`}
            />
            <h1 className="text-2xl font-bold">VitalTrack</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-pink-500 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Dashboard
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Community
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? 'bg-gray-700 text-yellow-300'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium ${
                darkMode
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : 'bg-pink-500 hover:bg-pink-600'
              } text-white transition-colors`}
            >
              Sign In
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div
            className={`md:w-1/2 mb-10 md:mb-0 transition-all duration-700 ${
              animated
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your{' '}
              <span
                className={`${darkMode ? 'text-pink-400' : 'text-pink-600'}`}
              >
                Health Journey
              </span>{' '}
              with Ease
            </h2>
            <p
              className={`text-lg mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Track your activities, monitor nutrition, and stay motivated with
              personalized insights and beautiful visualizations.
            </p>
            <div className="flex space-x-4">
              <button
                className={`px-6 py-3 rounded-lg font-bold ${
                  darkMode
                    ? 'bg-pink-600 hover:bg-pink-700'
                    : 'bg-pink-500 hover:bg-pink-600'
                } text-white transition-colors shadow-lg`}
              >
                Get Started
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-bold ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-white hover:bg-gray-100'
                } transition-colors shadow-lg`}
              >
                Learn More
              </button>
            </div>
          </div>
          <div
            className={`md:w-1/2 transition-all duration-700 delay-100 ${
              animated
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div
              className={`relative ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-3xl p-6 shadow-2xl overflow-hidden`}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-pink-500 opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500 opacity-20"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xl">Daily Summary</h3>
                  <div className="flex items-center space-x-2">
                    <FiUser
                      className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                    <span className="text-sm">Sarah</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-blue-50'
                    } flex flex-col items-center`}
                  >
                    <FiActivity
                      className={`text-2xl mb-2 ${
                        darkMode ? 'text-blue-300' : 'text-blue-500'
                      }`}
                    />
                    <span className="text-sm">8,240</span>
                    <span className="text-xs text-gray-500">Steps</span>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-green-50'
                    } flex flex-col items-center`}
                  >
                    <MdOutlineRestaurant
                      className={`text-2xl mb-2 ${
                        darkMode ? 'text-green-300' : 'text-green-500'
                      }`}
                    />
                    <span className="text-sm">1,850</span>
                    <span className="text-xs text-gray-500">Calories</span>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-purple-50'
                    } flex flex-col items-center`}
                  >
                    <MdOutlineWaterDrop
                      className={`text-2xl mb-2 ${
                        darkMode ? 'text-purple-300' : 'text-purple-500'
                      }`}
                    />
                    <span className="text-sm">5</span>
                    <span className="text-xs text-gray-500">Glasses</span>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl ${
                    darkMode ? 'bg-gray-700' : 'bg-indigo-50'
                  } mb-6`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Activity Progress</span>
                    <span className="text-xs font-bold">75%</span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-600' : 'bg-white'
                    }`}
                  >
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-medium ${
                    darkMode
                      ? 'bg-pink-700 hover:bg-pink-600'
                      : 'bg-pink-500 hover:bg-pink-400'
                  } text-white transition-colors flex items-center justify-center`}
                >
                  <FiAward className="mr-2" /> Complete Today's Challenge
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Choose VitalTrack?
          </h2>
          <p
            className={`text-center max-w-2xl mx-auto mb-12 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Our comprehensive platform offers everything you need to stay on top
            of your health and wellness goals.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <FiActivity
                    className={`text-3xl ${
                      darkMode ? 'text-blue-400' : 'text-blue-500'
                    }`}
                  />
                ),
                title: 'Activity Tracking',
                description:
                  'Monitor steps, distance, and active minutes with beautiful visualizations.',
                color: darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-100',
              },
              {
                icon: (
                  <MdOutlineRestaurant
                    className={`text-3xl ${
                      darkMode ? 'text-green-400' : 'text-green-500'
                    }`}
                  />
                ),
                title: 'Nutrition Insights',
                description:
                  'Track calories, macros, and water intake with our intuitive food diary.',
                color: darkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-100',
              },
              {
                icon: (
                  <FiHeart
                    className={`text-3xl ${
                      darkMode ? 'text-pink-400' : 'text-pink-500'
                    }`}
                  />
                ),
                title: 'Wellness Monitoring',
                description:
                  'Log sleep, stress levels, and mindfulness activities for holistic health.',
                color: darkMode ? 'bg-pink-900 bg-opacity-30' : 'bg-pink-100',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl ${
                  feature.color
                } transition-all hover:scale-105 duration-300 ${
                  darkMode ? 'hover:bg-opacity-50' : ''
                }`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p
                  className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section
          className={`py-12 px-6 rounded-3xl mb-20 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <FiAward
              className={`text-4xl mx-auto mb-6 ${
                darkMode ? 'text-yellow-400' : 'text-yellow-500'
              }`}
            />
            <blockquote className="text-2xl font-medium mb-6">
              "VitalTrack completely transformed my approach to health. The
              intuitive interface and motivational features helped me lose 15
              pounds and develop sustainable habits."
            </blockquote>
            <div className="flex items-center justify-center">
              <div
                className={`w-12 h-12 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                } mr-4 overflow-hidden`}
              >
                {/* Placeholder for user avatar */}
              </div>
              <div className="text-left">
                <p className="font-bold">Jamie Wilson</p>
                <p
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  3 months with VitalTrack
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p
            className={`max-w-2xl mx-auto mb-8 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Join thousands of users who have transformed their health with our
            comprehensive tracking platform.
          </p>
          <button
            className={`px-8 py-4 rounded-full font-bold text-lg ${
              darkMode
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                : 'bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600'
            } text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            Get Started for Free
          </button>
        </section>

        {/* Footer */}
        <footer
          className={`py-8 border-t ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FiHeart
                className={`text-2xl mr-2 ${
                  darkMode ? 'text-pink-400' : 'text-pink-600'
                }`}
              />
              <span className="font-bold">VitalTrack</span>
            </div>
            <div
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } mb-4 md:mb-0`}
            >
              © 2023 VitalTrack. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className={`hover:text-pink-500 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Terms
              </a>
              <a
                href="#"
                className={`hover:text-pink-500 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Privacy
              </a>
              <a
                href="#"
                className={`hover:text-pink-500 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
