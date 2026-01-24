'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      id="back-to-top"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-african-1 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover-bg-c1121f transition-all duration-300 z-50 touch-manipulation ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-label="返回顶部"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  )
}
