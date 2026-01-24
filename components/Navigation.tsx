'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlobeAfrica,
  faBars,
  faTimes,
  faLanguage,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '@/hooks/useLanguage'
import styles from './Navigation.module.scss'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { language, setLanguage, t, langName } = useLanguage()

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

      const backToTopButton = document.getElementById('back-to-top')
      if (backToTopButton) {
        if (window.scrollY > 300) {
          backToTopButton.classList.remove('opacity-0', 'invisible')
          backToTopButton.classList.add('opacity-100', 'visible')
        } else {
          backToTopButton.classList.remove('opacity-100', 'visible')
          backToTopButton.classList.add('opacity-0', 'invisible')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', key: 'nav.home' },
    { href: '#services', key: 'nav.services' },
    { href: '#routes', key: 'nav.routes' },
    { href: '#exhibitions', key: 'nav.exhibitions' },
    { href: '#cases', key: 'nav.cases' },
    { href: '#about', key: 'nav.about' },
    { href: '#contact', key: 'nav.contact' },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <FontAwesomeIcon
              icon={faGlobeAfrica}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>中非商务旅游</span>
          </Link>

          {/* 桌面导航 */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  activeSection === link.href.substring(1) ? styles.active : ''
                }`}
              >
                {t(link.key)}
              </a>
            ))}

            {/* 多语言切换 */}
            <div
              className={`${styles.languageDropdown} ${languageMenuOpen ? styles.active : ''}`}
              onMouseEnter={() => setLanguageMenuOpen(true)}
              onMouseLeave={() => setLanguageMenuOpen(false)}
            >
              <button className={styles.languageButton}>
                <FontAwesomeIcon icon={faLanguage} className={styles.languageIcon} />
                <span>{langName}</span>
                <FontAwesomeIcon icon={faChevronDown} className={styles.languageChevron} />
              </button>
              {languageMenuOpen && (
                <div className={styles.languageDropdownContent}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('zh')
                    }}
                    className={styles.languageOption}
                  >
                    中文
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('en')
                    }}
                    className={styles.languageOption}
                  >
                    English
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('sw')
                    }}
                    className={styles.languageOption}
                  >
                    Kiswahili
                  </a>
                </div>
              )}
            </div>

            <Link
              href="#contact"
              className={`btn-primary ${styles.desktopContactButton}`}
            >
              立即咨询
            </Link>
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
                {t(link.key)}
              </a>
            ))}

            {/* 多语言切换 */}
            <div className={styles.mobileLanguageSection}>
              <div className={styles.mobileLanguageDropdown}>
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className={styles.languageButton}
                >
                  <FontAwesomeIcon icon={faLanguage} className={styles.languageIcon} />
                  <span>{langName}</span>
                  <FontAwesomeIcon icon={faChevronDown} className={styles.languageChevron} />
                </button>
                {languageMenuOpen && (
                  <div className={styles.mobileLanguageDropdownContent}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setLanguage('zh')
                        setLanguageMenuOpen(false)
                      }}
                      className={styles.languageOption}
                    >
                      中文
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setLanguage('en')
                        setLanguageMenuOpen(false)
                      }}
                      className={styles.languageOption}
                    >
                      English
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setLanguage('sw')
                        setLanguageMenuOpen(false)
                      }}
                      className={styles.languageOption}
                    >
                      Kiswahili
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`btn-primary ${styles.mobileContactButton}`}
            >
              立即咨询
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
