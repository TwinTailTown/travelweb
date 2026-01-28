// 展会信息类型
export interface Exhibition {
  id: number
  title: string
  date: string
  location: string
  description: string
  tags: string[]
  badge: string | null
  badgeColor: string | null
  linkColor: string
  detailLink: string
}

// 语言类型
export type Language = 'zh' | 'en' | 'sw'

// 联系表单类型
export interface ContactFormData {
  name: string
  email: string
  phone: string
  country: string
  service: string
  message: string
}
