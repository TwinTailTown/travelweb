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
    { href: '#home', label: '首页' },
    { href: '#services', label: '我们的服务' },
    { href: '#routes', label: '商务路线' },
    { href: '#exhibitions', label: '展会信息' },
    { href: '#cases', label: '成功案例' },
    { href: '#about', label: '关于我们' },
    { href: '#contact', label: '联系帮助' },
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
                {link.label}
              </a>
            ))}

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
          </div>
        )}
      </div>
    </nav>
  )
}
