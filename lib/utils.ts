import { Exhibition } from '@/types'

// 解析日期字符串，提取年月日
export function parseExhibitionDate(dateStr: string): {
  year: number
  month: number
  day: number
} | null {
  const patterns = [
    /(\d{4})年(\d{1,2})月(\d{1,2})日/,
    /(\d{4})\/(\d{1,2})\/(\d{1,2})/,
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
  ]

  for (const pattern of patterns) {
    const match = dateStr.match(pattern)
    if (match) {
      return {
        year: parseInt(match[1]),
        month: parseInt(match[2]),
        day: parseInt(match[3]),
      }
    }
  }

  return null
}

// 根据 badgeColor 获取对应的 Tailwind 类
export function getBadgeClass(badgeColor: string | null): string {
  if (badgeColor === '#e63946') {
    return 'bg-[#e63946]'
  } else if (badgeColor === '#457b9d') {
    return 'bg-[#457b9d]'
  }
  return 'bg-gray-500'
}

// 根据 linkColor 获取对应的 Tailwind 类
export function getLinkClass(linkColor: string): string {
  if (linkColor === '#e63946') {
    return 'text-[#e63946]'
  } else if (linkColor === '#457b9d') {
    return 'text-[#457b9d]'
  }
  return 'text-[#1a365d]'
}

// 获取月份名称
export function getMonthName(month: number): string {
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月',
  ]
  return monthNames[month - 1] || ''
}
