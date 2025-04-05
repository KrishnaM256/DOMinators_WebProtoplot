import { useEffect, useState } from 'react'
import {
  FiActivity,
  FiHeart,
  FiAward,
  FiBarChart2,
  FiUser,
} from 'react-icons/fi'
import { MdOutlineRestaurant, MdOutlineWaterDrop } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import LandingPage from './LandingPage'

const Home = () => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
    return () => setAnimated(false)
  }, [])
  const navigate = useNavigate()
  return (
    <>
      <LandingPage />
      <div className="min-h-screen  dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-4 py-8  dark:bg-gray-900">
          <section className="flex flex-col md:flex-row items-center justify-between mb-20 pt-10 ">
            <div
              className={`md:w-1/2 mb-10 md:mb-0 transition-all duration-700 ${
                animated
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-800 dark:text-white">
                Transform Your{' '}
                <span className="text-pink-600 dark:text-pink-400">
                  Health Journey
                </span>{' '}
                with Ease
              </h2>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
                Track your activities, monitor nutrition, and stay motivated
                with personalized insights and beautiful visualizations.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/activities')}
                  className="px-6 py-3 rounded-lg font-bold bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white transition-colors shadow-lg"
                >
                  Get Started
                </button>
                <button className="px-6 py-3 rounded-lg font-bold bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-lg text-gray-800 dark:text-white">
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
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-pink-500 opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500 opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                      Daily Summary
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <FiUser />
                      <span className="text-sm">Sarah</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-gray-700 flex flex-col items-center">
                      <FiActivity className="text-2xl mb-2 text-blue-500 dark:text-blue-300" />
                      <span className="text-sm">8,240</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Steps
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-gray-700 flex flex-col items-center">
                      <MdOutlineRestaurant className="text-2xl mb-2 text-green-500 dark:text-green-300" />
                      <span className="text-sm">1,850</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Calories
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-gray-700 flex flex-col items-center">
                      <MdOutlineWaterDrop className="text-2xl mb-2 text-purple-500 dark:text-purple-300" />
                      <span className="text-sm">5</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Glasses
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-gray-700 mb-6">
                    <div className="flex justify-between items-center mb-2 text-gray-800 dark:text-gray-300">
                      <span className="text-sm">Activity Progress</span>
                      <span className="text-xs font-bold">75%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white dark:bg-gray-600">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-lg font-medium bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white transition-colors flex items-center justify-center">
                    <FiAward className="mr-2" /> Complete Today's Challenge
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              Why Choose BeFit?
            </h2>
            <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-400">
              Our comprehensive platform offers everything you need to stay on
              top of your health and wellness goals.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <FiActivity className="text-3xl text-blue-500 dark:text-blue-400" />
                  ),
                  title: 'Activity Tracking',
                  description:
                    'Monitor steps, distance, and active minutes with beautiful visualizations.',
                  bg: 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30',
                },
                {
                  icon: (
                    <MdOutlineRestaurant className="text-3xl text-green-500 dark:text-green-400" />
                  ),
                  title: 'Nutrition Insights',
                  description:
                    'Track calories, macros, and water intake with our intuitive food diary.',
                  bg: 'bg-green-100 dark:bg-green-900 dark:bg-opacity-30',
                },
                {
                  icon: (
                    <FiHeart className="text-3xl text-pink-500 dark:text-pink-400" />
                  ),
                  title: 'Wellness Monitoring',
                  description:
                    'Log sleep, stress levels, and mindfulness activities for holistic health.',
                  bg: 'bg-pink-100 dark:bg-pink-900 dark:bg-opacity-30',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${feature.bg} transition-all hover:scale-105 duration-300`}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-12 px-6 rounded-3xl mb-20 bg-white dark:bg-gray-800 shadow-xl">
            <div className="max-w-4xl mx-auto text-center">
              <FiAward className="text-4xl mx-auto mb-6 text-yellow-500 dark:text-yellow-400" />
              <blockquote className="text-2xl font-medium mb-6 text-gray-800 dark:text-white">
                "BeFit completely transformed my approach to health. The
                intuitive interface and motivational features helped me lose 15
                pounds and develop sustainable habits."
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4 overflow-hidden">
                  {/* Placeholder for user avatar */}
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800 dark:text-white">
                    Jamie Wilson
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    3 months with BeFit
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-400">
              Join thousands of users who have transformed their health with our
              comprehensive tracking platform.
            </p>
            <button className="px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 dark:from-pink-600 dark:to-purple-600 dark:hover:from-pink-700 dark:hover:to-purple-700 text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started for Free
            </button>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
