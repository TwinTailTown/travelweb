import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'
import './globals.scss'
import './normalize.css'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-sc',
})

export const metadata: Metadata = {
  title: '中非商务旅游 - 一站式服务平台',
  description: '专业的中非商务旅游服务提供商，致力于为非洲客户提供一站式商务旅游解决方案',
  keywords: ['中非商务', '旅游服务', '商务路线', '展会信息'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.variable} ${notoSansSC.className}`}>
        {children}
      </body>
    </html>
  )
}
