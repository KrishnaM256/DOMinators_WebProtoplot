import React, { useEffect, useState } from 'react'

const MotivationalNotifier = () => {
  const [permission, setPermission] = useState(Notification.permission)

  const quotes = [
    'Believe in yourself and all that you are.',
    'Every day is a second chance.',
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'Start where you are. Use what you have. Do what you can.',
    'Push yourself, because no one else is going to do it for you.',
    'Don’t watch the clock; do what it does. Keep going.',
    'The only bad workout is the one that didn’t happen.',
    'Difficult roads often lead to beautiful destinations.',
  ]

  useEffect(() => {
    // Request permission on load
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((result) => {
        setPermission(result)
      })
    }
  }, [])

  useEffect(() => {
    if (permission !== 'granted') return

    const interval = setInterval(() => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)]
      new Notification('💡 Motivation Boost!', {
        body: quote,
        icon: 'https://cdn-icons-png.flaticon.com/512/3771/3771489.png', // Optional: motivational icon
      })
    }, 1000 * 6) // every 5 minutes

    return () => clearInterval(interval) // Cleanup on unmount
  }, [permission])
}

export default MotivationalNotifier
