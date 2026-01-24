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

// 根据 badgeColor 获取对应的样式类（返回内联样式或空字符串）
export function getBadgeClass(badgeColor: string | null): string {
  // 返回空字符串，使用内联样式
  return ''
}

// 根据 linkColor 获取对应的样式类
export function getLinkClass(linkColor: string): string {
  if (linkColor === '#e63946') {
    return 'linkAfrican1'
  } else if (linkColor === '#457b9d') {
    return 'linkAfrican2'
  }
  return 'linkPrimary'
}

// 获取月份名称
export function getMonthName(month: number): string {
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月',
  ]
  return monthNames[month - 1] || ''
}
