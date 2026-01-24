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
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))

    return () => {
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
