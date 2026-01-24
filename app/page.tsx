'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Carousel from '@/components/Carousel'
import Routes from '@/components/Routes'
import Services from '@/components/Services'
import Exhibitions from '@/components/Exhibitions'
import ContactForm from '@/components/ContactForm'
import BackToTop from '@/components/BackToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import Stats from '@/components/Stats'

export default function Home() {
  useEffect(() => {
    // 滚动动画观察器
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

    // 初始化观察器函数
    const initObserver = () => {
      const elements = document.querySelectorAll('.scroll-animate:not(#exhibitions-wrapper .scroll-animate)')
      elements.forEach((el) => {
        // 如果元素已经在视口中，立即添加 active 类
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100
        if (isVisible) {
          el.classList.add('active')
        }
        observer.observe(el)
      })
    }

    // 延迟执行以确保 DOM 已渲染
    const timer = setTimeout(initObserver, 100)

    // 使用 MutationObserver 监听 DOM 变化，自动观察新添加的元素
    const mutationObserver = new MutationObserver(() => {
      initObserver()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timer)
      mutationObserver.disconnect()
      const elements = document.querySelectorAll('.scroll-animate')
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <main>
      <Navigation />
      <Carousel />
      <Routes />
      <Services />

      <Exhibitions />
      <Stats />
      <ContactForm />
      <BackToTop />
      <WhatsAppButton />
    </main>
  )
}
