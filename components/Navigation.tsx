'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlobeAfrica,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import styles from './Navigation.module.scss'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [language, setLanguage] = useState<'ZH' | 'EN'>('ZH')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ZH' ? 'EN' : 'ZH')
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute('id')

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId || 'home')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/#services', label: '我们的服务' },
    { href: '/routes', label: '商务路线' },
    { href: '/exhibitions', label: '展会信息' },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="Oriju Logo" className={styles.logoImage} />
            <div className={styles.brandWrapper}>
              <span className={styles.brandName}>Oriju</span>
              <div className={styles.separator}></div>
              <span className={styles.slogan}>Your One-Stop Business Trip from Africa to China</span>
            </div>
          </Link>

          {/* 桌面导航 */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) =>
              link.href.includes('#') || link.href === '/' ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${(link.href === '/' && activeSection === 'home') ||
                    (link.href.includes('#') && activeSection === link.href.split('#')[1])
                    ? styles.active : ''
                    }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.navLink}
                >
                  {link.label}
                </Link>
              )
            )}

            <Link
              href="#contact"
              className={`btn-primary ${styles.desktopContactButton}`}
            >
              立即咨询
            </Link>

            <button
              className={styles.languageSwitchBtn}
              onClick={toggleLanguage}
              aria-label="Switch Language"
            >
              {language === 'ZH' ? 'EN' : '中'}
            </button>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuButton}
            aria-label="打开菜单"
          >
            <FontAwesomeIcon
              icon={mobileMenuOpen ? faTimes : faBars}
              className={styles.mobileMenuIcon}
            />
          </button>
        </div>

        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={styles.mobileNavLink}
              >
                {link.label}
              </a>
            ))}

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`btn-primary ${styles.mobileContactButton}`}
            >
              立即咨询
            </Link>

            <button
              className={styles.mobileLanguageSwitchBtn}
              onClick={() => {
                toggleLanguage()
                setMobileMenuOpen(false)
              }}
            >
              切换语言: {language === 'ZH' ? 'EN' : '中'}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
