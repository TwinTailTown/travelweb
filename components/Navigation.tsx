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
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <FontAwesomeIcon
              icon={faGlobeAfrica}
              className="text-4xl text-african-1 mr-2"
            />
            <span className="text-2xl font-bold text-primary">中非商务旅游</span>
          </Link>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  activeSection === link.href.substring(1) ? 'active' : ''
                } text-gray-800 hover:text-african-1 font-medium`}
              >
                {t(link.key)}
              </a>
            ))}

            {/* 多语言切换 */}
            <div
              className="language-dropdown relative"
              onMouseEnter={() => setLanguageMenuOpen(true)}
              onMouseLeave={() => setLanguageMenuOpen(false)}
            >
              <button className="flex items-center text-gray-800 hover:text-african-1">
                <FontAwesomeIcon icon={faLanguage} className="mr-2" />
                <span>{langName}</span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
              </button>
              {languageMenuOpen && (
                <div className="language-dropdown-content">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('zh')
                    }}
                    className="language-option"
                  >
                    中文
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('en')
                    }}
                    className="language-option"
                  >
                    English
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setLanguage('sw')
                    }}
                    className="language-option"
                  >
                    Kiswahili
                  </a>
                </div>
              )}
            </div>

            <Link
              href="#contact"
              className="btn-primary px-6 py-2 rounded-full font-medium"
            >
              立即咨询
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 focus:outline-none w-10 h-10 flex items-center justify-center touch-manipulation"
              aria-label="打开菜单"
            >
              <FontAwesomeIcon
                icon={mobileMenuOpen ? faTimes : faBars}
                className="text-2xl"
              />
            </button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-gray-800 hover:text-african-1 active:text-african-1 touch-manipulation"
              >
                {t(link.key)}
              </a>
            ))}

            {/* 多语言切换 */}
            <div className="py-2">
              <div className="language-dropdown">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center text-gray-800 hover:text-african-1"
                >
                  <FontAwesomeIcon icon={faLanguage} className="mr-2" />
                  <span>{langName}</span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
                </button>
                {languageMenuOpen && (
                  <div className="language-dropdown-content relative mt-2">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setLanguage('zh')
                        setLanguageMenuOpen(false)
                      }}
                      className="language-option"
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
                      className="language-option"
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
                      className="language-option"
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
              className="btn-primary inline-block mt-4 px-6 py-3 rounded-full font-medium w-full text-center touch-manipulation"
            >
              立即咨询
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
