'use client'

import { useEffect, useRef } from 'react'
import styles from './Stats.module.scss'

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
    <section id="stats-section" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={`${styles.statItem} scroll-animate`}>
            <div
              ref={clientsRef}
              className={styles.statNumber}
            >
              0
            </div>
            <p className={styles.statLabel}>服务客户</p>
          </div>
          <div className={`${styles.statItem} scroll-animate`}>
            <div
              ref={countriesRef}
              className={styles.statNumber}
            >
              0
            </div>
            <p className={styles.statLabel}>覆盖国家</p>
          </div>
          <div className={`${styles.statItem} scroll-animate`}>
            <div
              ref={tripsRef}
              className={styles.statNumber}
            >
              0
            </div>
            <p className={styles.statLabel}>成功行程</p>
          </div>
          <div className={`${styles.statItem} scroll-animate`}>
            <div
              ref={satisfactionRef}
              className={styles.statNumber}
            >
              0
            </div>
            <p className={styles.statLabel}>客户满意度(%)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
