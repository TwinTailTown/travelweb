'use client'

import { useEffect, useRef } from 'react'

export default function Stats() {
  const clientsRef = useRef<HTMLDivElement>(null)
  const countriesRef = useRef<HTMLDivElement>(null)
  const tripsRef = useRef<HTMLDivElement>(null)
  const satisfactionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateCounter = (
      element: HTMLDivElement | null,
      target: number,
      duration: number
    ) => {
      if (!element) return

      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          element.textContent = target.toString()
          clearInterval(timer)
        } else {
          element.textContent = Math.floor(start).toString()
        }
      }, 16)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(clientsRef.current, 500, 2000)
            animateCounter(countriesRef.current, 25, 2000)
            animateCounter(tripsRef.current, 1200, 2000)
            animateCounter(satisfactionRef.current, 98, 2000)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )

    const section = document.getElementById('stats-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-16 bg-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="scroll-animate">
            <div
              ref={clientsRef}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              0
            </div>
            <p className="text-gray-200">服务客户</p>
          </div>
          <div className="scroll-animate">
            <div
              ref={countriesRef}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              0
            </div>
            <p className="text-gray-200">覆盖国家</p>
          </div>
          <div className="scroll-animate">
            <div
              ref={tripsRef}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              0
            </div>
            <p className="text-gray-200">成功行程</p>
          </div>
          <div className="scroll-animate">
            <div
              ref={satisfactionRef}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              0
            </div>
            <p className="text-gray-200">客户满意度(%)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
