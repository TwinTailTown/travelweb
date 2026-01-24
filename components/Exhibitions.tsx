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

export default function Exhibitions() {
  const { exhibitions, loading, error } = useExhibitions()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
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
    }
  }

  // 生成日历事件
  const calendarEvents = exhibitions
    .map((exhibition) => {
      const dateInfo = parseExhibitionDate(exhibition.date)
      if (!dateInfo) return null
      return {
        ...exhibition,
        ...dateInfo,
      }
    })
    .filter((e): e is Exhibition & { year: number; month: number; day: number } => e !== null)
    .filter((e) => e.year === currentYear)
    .sort((a, b) => {
      if (a.month !== b.month) return a.month - b.month
      return a.day - b.day
    })

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
    <section id="exhibitions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md-mb-16 scroll-animate px-4">
          <h2 className="text-2xl sm-text-3xl md-text-4xl font-bold mb-3 md-mb-4 text-primary">
            展会信息
          </h2>
          <p className="text-base sm-text-lg text-gray-600 max-w-3xl mx-auto">
            我们为您提供最新的广州和义乌展会信息，帮助您把握商机，拓展业务。
          </p>
        </div>

        <div className="grid grid-cols-1 lg-grid-cols-3 gap-10">
          <div className="lg-col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 md-p-6 mb-6 md-mb-8 scroll-animate">
              <h3 className="text-xl md-text-2xl font-bold mb-4 md-mb-6 text-primary">
                近期展会
              </h3>

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-african-1"></div>
                  <p className="text-gray-600 mt-4">加载展会信息中...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600">加载展会信息失败，请稍后重试</p>
                </div>
              )}

              {!loading && !error && exhibitions.length === 0 && (
                <p className="text-gray-600 text-center py-4">暂无展会信息</p>
              )}

              {!loading && !error && exhibitions.length > 0 && (
                <div className="relative">
                  {/* 移动端左翻页按钮 */}
                  <button
                    id="exhibitions-prev"
                    onClick={() => goToExhibition(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="md-hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover-bg-gray-50 active-bg-gray-100 touch-manipulation disabled-opacity-30 disabled-cursor-not-allowed"
                    aria-label="上一页"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700" />
                  </button>

                  {/* 展会列表容器 */}
                  <div
                    id="exhibitions-wrapper"
                    className="exhibitions-wrapper"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                  >
                    <div
                      id="exhibitions-container"
                      ref={containerRef}
                      className="exhibitions-container"
                    >
                      {exhibitions.map((exhibition, index) => (
                        <div
                          key={exhibition.id}
                          className="calendar-event scroll-animate mb-6"
                          data-index={index}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-bold text-primary line-clamp-2">
                              {exhibition.title}
                            </h4>
                            {exhibition.badge && (
                              <span
                                className={`${getBadgeClass(exhibition.badgeColor)} text-white px-3 py-1 rounded-full text-sm whitespace-nowrap`}
                                style={
                                  exhibition.badgeColor &&
                                  exhibition.badgeColor !== '#e63946' &&
                                  exhibition.badgeColor !== '#457b9d'
                                    ? { backgroundColor: exhibition.badgeColor }
                                    : undefined
                                }
                              >
                                {exhibition.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-gray-600 mb-3 flex-wrap">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                            <span>{exhibition.date}</span>
                            <span className="mx-3 text-gray-400">|</span>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                            <span>{exhibition.location}</span>
                          </div>
                          <p className="text-gray-700 mb-4 line-clamp-2">{exhibition.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {exhibition.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={exhibition.detailLink}
                            className={`${getLinkClass(exhibition.linkColor)} font-medium flex items-center hover-underline`}
                          >
                            了解详情 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 移动端右翻页按钮 */}
                  <button
                    id="exhibitions-next"
                    onClick={() => goToExhibition(currentIndex + 1)}
                    disabled={currentIndex === exhibitions.length - 1}
                    className="md-hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover-bg-gray-50 active-bg-gray-100 touch-manipulation disabled-opacity-30 disabled-cursor-not-allowed"
                    aria-label="下一页"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-700" />
                  </button>

                  {/* 移动端指示器 */}
                  {isMobile && (
                    <div
                      id="exhibitions-indicators"
                      className="md-hidden flex justify-center gap-2 mt-4"
                    >
                      {exhibitions.map((_, index) => (
                        <div
                          key={index}
                          className={`exhibition-indicator ${
                            currentIndex === index ? 'active' : ''
                          }`}
                          onClick={() => goToExhibition(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 展会日历 */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-4 md-p-6 mb-6 md-mb-8 scroll-animate">
              <h3 className="text-xl font-bold mb-4 text-primary">展会日历</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={() => setCurrentYear(currentYear - 1)}
                    className="text-gray-600 hover-text-african-1 touch-manipulation"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <h4 className="font-bold">{currentYear}年</h4>
                  <button
                    onClick={() => setCurrentYear(currentYear + 1)}
                    className="text-gray-600 hover-text-african-1 touch-manipulation"
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>

              <div id="calendar-events" className="space-y-2">
                {calendarEvents.map((event) => (
                  <div
                    key={event.id}
                    className="calendar-event scroll-animate mb-6 cursor-pointer"
                    onClick={() => scrollToExhibition(event.id)}
                    style={{
                      borderLeftColor: event.badgeColor || '#e63946',
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: event.badgeColor || '#e63946',
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {event.month}月{event.day}日
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-primary line-clamp-2">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{event.location}</p>
                  </div>
                ))}
                {calendarEvents.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    {currentYear}年暂无展会安排
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
