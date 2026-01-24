'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const carouselItems = [
  {
    image: 'https://p3-doubao-search-sign.byteimg.com/tos-cn-i-xv4ileqgde/ae7f11e2465548019e408231d6125d7b~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783598841&x-signature=orgdl5yn62ROtnV0sSgYKuJKTdQ%3D',
    alt: '广州国际轻纺城',
    title: '中非商务旅游一站式服务',
    description: '专业接待非洲客户来华参观采购，提供全方位商务服务',
    buttons: [
      { href: '#services', text: '了解服务', primary: true },
      { href: '#routes', text: '探索路线', primary: false },
    ],
  },
  {
    image: 'https://p11-doubao-search-sign.byteimg.com/tos-cn-i-xv4ileqgde/9a3a902ebb7049e395a85933bca352b5~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783598841&x-signature=9cMHDAcAy0rXRDE49uf2LxhPPjA%3D',
    alt: '义乌国际商贸城',
    title: '广州 · 义乌 精品商务路线',
    description: '覆盖中国最大的小商品和纺织品批发市场',
    buttons: [
      { href: '#routes', text: '查看路线', primary: true },
      { href: '#contact', text: '预约服务', primary: false },
    ],
  },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="home" className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {carouselItems.map((item, index) => (
          <div key={index} className="carousel-item">
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
            <div className="carousel-caption">
              <h1 className="text-2xl sm-text-3xl md-text-4xl lg-text-6xl font-bold text-white mb-3 md-mb-4 drop-shadow-lg">
                {item.title}
              </h1>
              <p className="text-sm sm-text-base md-text-xl lg-text-2xl text-white mb-4 md-mb-8 drop-shadow-md">
                {item.description}
              </p>
              <div className="flex flex-col sm-flex-row flex-wrap gap-3 md-gap-4">
                {item.buttons.map((button, btnIndex) => (
                  <Link
                    key={btnIndex}
                    href={button.href}
                    className={`${
                      button.primary ? 'btn-primary' : 'btn-secondary'
                    } px-6 md-px-8 py-2-5 md-py-3 rounded-full font-bold text-base md-text-lg text-center`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {carouselItems.map((_, index) => (
          <div
            key={index}
            className={`carousel-indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
