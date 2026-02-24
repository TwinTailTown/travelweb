'use client'

import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
  faMapMarkerAlt,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { useExhibitions } from '@/hooks/useExhibitions'
import { Exhibition } from '@/types'
import { parseExhibitionDate, getBadgeClass, getLinkClass, getMonthName } from '@/lib/utils'
import styles from './Exhibitions.module.scss'

export default function Exhibitions() {
  const { exhibitions, loading, error } = useExhibitions()
  const [currentIndex, setCurrentIndex] = useState(0)
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1) // 1-12
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile && containerRef.current) {
      const cardWidth = window.innerWidth * 0.8
      const gap = 16
      const padding = window.innerWidth * 0.1
      const translateX = -(currentIndex * (cardWidth + gap) - padding)
      containerRef.current.style.transform = `translateX(${translateX}px)`
    } else if (containerRef.current) {
      containerRef.current.style.transform = 'translateX(0)'
    }
  }, [currentIndex, isMobile, exhibitions])

  // 处理滚动动画 - 当展会数据加载完成后
  useEffect(() => {
    if (loading || exhibitions.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.01, rootMargin: '50px' }
    )

    const initObserver = () => {
      const container = containerRef.current
      if (container) {
        const elements = container.querySelectorAll('.scroll-animate')
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200
          if (isVisible) {
            el.classList.add('active')
          }
          if (!el.hasAttribute('data-observed')) {
            el.setAttribute('data-observed', 'true')
            observer.observe(el)
          }
        })
      }
    }

    const timer1 = setTimeout(initObserver, 100)
    const timer2 = setTimeout(initObserver, 500)
    const timer3 = setTimeout(initObserver, 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      const container = containerRef.current
      if (container) {
        const elements = container.querySelectorAll('.scroll-animate')
        elements.forEach((el) => {
          observer.unobserve(el)
          el.removeAttribute('data-observed')
        })
      }
    }
  }, [loading, exhibitions])

  const goToExhibition = (index: number) => {
    if (index < 0 || index >= exhibitions.length) return
    setCurrentIndex(index)
  }

  const scrollToExhibition = (id: number) => {
    const index = exhibitions.findIndex((e) => e.id === id)
    if (index !== -1) {
      setCurrentIndex(index)
      if (isMobile && containerRef.current) {
        const cardWidth = window.innerWidth * 0.8
        const gap = 16
        const padding = window.innerWidth * 0.1
        const translateX = -(index * (cardWidth + gap) - padding)
        containerRef.current.style.transform = `translateX(${translateX}px)`
      }

      // 桌面端滚动到指定元素逻辑（如果容器有 scroll 属性）
      const element = document.querySelector(`[data-index="${index}"]`)
      if (element && !isMobile) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }

  const changeMonth = (delta: number) => {
    let newMonth = currentMonth + delta
    let newYear = currentYear
    if (newMonth > 12) {
      newMonth = 1
      newYear += 1
    } else if (newMonth < 1) {
      newMonth = 12
      newYear -= 1
    }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  // 生成日历事件
  const allEvents = exhibitions
    .map((exhibition) => {
      const dateInfo = parseExhibitionDate(exhibition.date)
      if (!dateInfo) return null
      return { ...exhibition, ...dateInfo }
    })
    .filter((e): e is Exhibition & { year: number; month: number; day: number } => e !== null)

  const monthEvents = allEvents
    .filter((e) => e.year === currentYear && e.month === currentMonth)
    .sort((a, b) => a.day - b.day)

  // 生成日历网格数据
  const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month - 1, 1).getDay()
    return day === 0 ? 6 : day - 1 // 转换为 0-6 (周一到周日)
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const calendarDays = []

  // 填充月初空白
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null })
  }

  // 填充日期
  for (let i = 1; i <= daysInMonth; i++) {
    const hasEvent = monthEvents.some(e => e.day === i)
    calendarDays.push({
      day: i,
      hasEvent,
      isToday: today.getFullYear() === currentYear && today.getMonth() + 1 === currentMonth && today.getDate() === i
    })
  }

  const handleTouchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    handleTouchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!handleTouchStart.current) return

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    }

    const diffX = handleTouchStart.current.x - touchEnd.x
    const diffY = handleTouchStart.current.y - touchEnd.y

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0 && currentIndex < exhibitions.length - 1) {
        goToExhibition(currentIndex + 1)
      } else if (diffX < 0 && currentIndex > 0) {
        goToExhibition(currentIndex - 1)
      }
    }

    handleTouchStart.current = null
  }

  return (
    <section id="exhibitions" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} scroll-animate`}>
          <h2 className={styles.title}>展会信息</h2>
          <p className={styles.subtitle}>我们为您提供最新的广州和义乌展会信息，帮助您把握商机，拓展业务。</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <div className={styles.exhibitionsCard}>
              <h3 className={styles.exhibitionsTitle}>近期展会</h3>

              {loading && (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <p className={styles.loadingText}>加载展会信息中...</p>
                </div>
              )}

              {error && (
                <div className={styles.error}>
                  <p>加载展会信息失败，请稍后重试</p>
                </div>
              )}

              {!loading && !error && exhibitions.length === 0 && (
                <p className={styles.empty}>暂无展会信息</p>
              )}

              {!loading && !error && exhibitions.length > 0 && (
                <div style={{ position: 'relative' }}>
                  <button
                    id="exhibitions-prev"
                    onClick={() => goToExhibition(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className={`${styles.navButton} ${styles.navButtonPrev}`}
                    aria-label="上一页"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className={styles.navButtonIcon} />
                  </button>

                  <div
                    id="exhibitions-wrapper"
                    className={styles.wrapper}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                  >
                    <div id="exhibitions-container" ref={containerRef} className={styles.containerInner}>
                      {exhibitions.map((exhibition, index) => (
                        <div key={exhibition.id} className={`${styles.event} scroll-animate`} data-index={index}>
                          <div className={styles.eventHeader}>
                            <h4 className={styles.eventTitle}>{exhibition.title}</h4>
                            {exhibition.badge && (
                              <span
                                className={styles.badge}
                                style={exhibition.badgeColor ? { backgroundColor: exhibition.badgeColor } : { backgroundColor: '#FF8C42' }}
                              >
                                {exhibition.badge}
                              </span>
                            )}
                          </div>
                          <div className={styles.eventMeta}>
                            <FontAwesomeIcon icon={faCalendarAlt} className={styles.metaIcon} />
                            <span>{exhibition.date}</span>
                            <span className={styles.metaSeparator}>|</span>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.metaIcon} />
                            <span>{exhibition.location}</span>
                          </div>
                          <p className={styles.eventDescription}>{exhibition.description}</p>
                          <div className={styles.tags}>
                            {exhibition.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className={styles.tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={exhibition.detailLink}
                            className={`${styles.eventLink} ${styles[getLinkClass(exhibition.linkColor)]}`}
                          >
                            了解详情 <FontAwesomeIcon icon={faArrowRight} className={styles.linkIcon} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    id="exhibitions-next"
                    onClick={() => goToExhibition(currentIndex + 1)}
                    disabled={currentIndex === exhibitions.length - 1}
                    className={`${styles.navButton} ${styles.navButtonNext}`}
                    aria-label="下一页"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className={styles.navButtonIcon} />
                  </button>

                  {isMobile && (
                    <div id="exhibitions-indicators" className={styles.indicators}>
                      {exhibitions.map((_, index) => (
                        <div
                          key={index}
                          className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
                          onClick={() => goToExhibition(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={`${styles.calendarCard} scroll-animate`}>
              <h3 className={styles.calendarTitle}>展会日历</h3>
              <div className={styles.calendarControls}>
                <div className={styles.calendarHeader}>
                  <button onClick={() => changeMonth(-1)} className={styles.calendarYearButton}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <div className={styles.calendarYear}>
                    <span>{currentYear}年</span>
                    <span className={styles.calendarMonth}>{currentMonth}月</span>
                  </div>
                  <button onClick={() => changeMonth(1)} className={styles.calendarYearButton}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>

              <div className={styles.calendarGrid}>
                {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
                  <div key={d} className={styles.calendarWeekday}>
                    {d}
                  </div>
                ))}
                {calendarDays.map((date, i) => (
                  <div
                    key={i}
                    className={`${styles.calendarDay} ${!date.day ? styles.empty : ''} ${date.isToday ? styles.today : ''} ${date.hasEvent ? styles.hasEvent : ''}`}
                    onClick={() => {
                      if (date.day && date.hasEvent) {
                        const firstEvent = monthEvents.find((e) => e.day === date.day)
                        if (firstEvent) scrollToExhibition(firstEvent.id)
                      }
                    }}
                  >
                    {date.day}
                    {date.hasEvent && <div className={styles.eventDot} />}
                  </div>
                ))}
              </div>

              <div id="calendar-events" className={styles.calendarEvents}>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{currentMonth}月展会列表</h4>
                {monthEvents.map((event) => (
                  <div
                    key={event.id}
                    className={styles.calendarEvent}
                    onClick={() => scrollToExhibition(event.id)}
                    style={{ borderLeftColor: event.badgeColor || '#FF8C42' }}
                  >
                    <div className={styles.calendarEventHeader}>
                      <span className={styles.calendarEventDate}>
                        {event.month}月{event.day}日
                      </span>
                    </div>
                    <h4 className={styles.calendarEventTitle}>{event.title}</h4>
                    <p className={styles.calendarEventLocation}>{event.location}</p>
                  </div>
                ))}
                {monthEvents.length === 0 && <p className={styles.calendarEmpty}>{currentYear}年{currentMonth}月暂无展会</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
