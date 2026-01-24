'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Carousel.module.scss'

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
    <section id="home" className={styles.carousel}>
      <div className={styles.carouselInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {carouselItems.map((item, index) => (
          <div key={index} className={styles.carouselItem}>
            <img
              src={item.image}
              alt={item.alt}
            />
            <div className={styles.carouselCaption}>
              <h1 className={styles.carouselTitle}>
                {item.title}
              </h1>
              <p className={styles.carouselDescription}>
                {item.description}
              </p>
              <div className={styles.carouselButtons}>
                {item.buttons.map((button, btnIndex) => (
                  <Link
                    key={btnIndex}
                    href={button.href}
                    className={`${styles.carouselButton} ${
                      button.primary ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.carouselIndicators}>
        {carouselItems.map((_, index) => (
          <div
            key={index}
            className={`${styles.carouselIndicator} ${currentIndex === index ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
