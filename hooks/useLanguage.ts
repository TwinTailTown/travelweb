'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/types'

const translations = {
  zh: {
    'nav.home': '首页',
    'nav.services': '我们的服务',
    'nav.routes': '商务路线',
    'nav.exhibitions': '展会信息',
    'nav.cases': '成功案例',
    'nav.about': '关于我们',
    'nav.contact': '联系帮助',
    'contact.title': '联系帮助',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Our Services',
    'nav.routes': 'Business Routes',
    'nav.exhibitions': 'Exhibitions',
    'nav.cases': 'Success Cases',
    'nav.about': 'About Us',
    'nav.contact': 'Contact & Help',
    'contact.title': 'Contact & Help',
  },
  sw: {
    'nav.home': 'Nyumbani',
    'nav.services': 'Huduma Zetu',
    'nav.routes': 'Njia za Biashara',
    'nav.exhibitions': 'Maonyesho',
    'nav.cases': 'Kesi za Mafanikio',
    'nav.about': 'Kuhusu Sisi',
    'nav.contact': 'Wasiliana na Usaidizi',
    'contact.title': 'Wasiliana na Usaidizi',
  },
}

const langNames: Record<Language, string> = {
  zh: '中文',
  en: 'English',
  sw: 'Kiswahili',
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('zh')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language
      if (savedLang && (savedLang === 'zh' || savedLang === 'en' || savedLang === 'sw')) {
        setLanguage(savedLang)
      }
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return {
    language,
    setLanguage: changeLanguage,
    t,
    langName: langNames[language],
  }
}
