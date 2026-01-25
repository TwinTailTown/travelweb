'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import styles from './FloatButtons.module.scss'

export default function FloatButtons() {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsBackToTopVisible(true)
      } else {
        setIsBackToTopVisible(false)
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
    <>
      {/* WhatsApp 按钮 */}
      <a
        href="https://wa.me/8613800138000"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
        aria-label="WhatsApp联系我们"
      >
        <FontAwesomeIcon icon={faWhatsapp} className={styles.whatsappIcon} />
      </a>

      {/* 返回顶部按钮 */}
      <button
        id="back-to-top"
        onClick={scrollToTop}
        className={`${styles.backToTopButton} ${isBackToTopVisible ? styles.visible : styles.hidden}`}
        aria-label="返回顶部"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </>
  )
}
