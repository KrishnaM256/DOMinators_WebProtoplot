import React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const LandingPage = () => {
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.quote', {
      x: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
    })
    tl.to('.quote', {
      x: -100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
    })
    tl.to('.land', {
      opacity: 0,
      display: 'none',
    })
  })
  return (
    <div className="land text-3xl text-white bg-black w-full h-screen flex items-center justify-center fixed z-50">
      <h1 className="quote w-1/2 h-1/2 flex items-center justify-center">
        “Physical fitness is not only one of the most important keys to a
        healthy body, it is the basic of dynamic and creative intellectual
        activity.” – John F. Kennedy{' '}
      </h1>
    </div>
  )
}

export default LandingPage
