'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Carousel from '@/components/Carousel'
import Exhibitions from '@/components/Exhibitions'
import ContactForm from '@/components/ContactForm'
import BackToTop from '@/components/BackToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import Stats from '@/components/Stats'

export default function Home() {
  useEffect(() => {
    // 滚动动画观察器
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <main>
      <Navigation />
      <Carousel />
      
      {/* 商务路线 */}
      <section id="routes" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 scroll-animate px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-primary">
              精品商务路线
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              我们精心设计了多条商务路线，覆盖广州和义乌的主要批发市场，满足不同客户的采购需求。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* 广州路线 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden scroll-animate">
              <div className="relative">
                <img
                  src="https://p3-doubao-search-sign.byteimg.com/tos-cn-i-xv4ileqgde/ae7f11e2465548019e408231d6125d7b~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783598841&x-signature=orgdl5yn62ROtnV0sSgYKuJKTdQ%3D"
                  alt="广州国际轻纺城"
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-african-1 text-white px-4 py-1 rounded-full font-medium">
                  热门路线
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">
                  广州纺织品采购之旅
                </h3>
                <div className="flex items-center mb-4">
                  <i className="fas fa-map-marker-alt text-african-1 mr-2"></i>
                  <span className="text-gray-700">广州</span>
                  <span className="mx-3 text-gray-400">|</span>
                  <i className="fas fa-calendar-alt text-african-1 mr-2"></i>
                  <span className="text-gray-700">3-5天</span>
                </div>
                <p className="text-gray-600 mb-6">
                  广州是中国最大的纺织品和服装批发市场之一，拥有多个专业市场，包括广州国际轻纺城、白马服装市场等。
                </p>
                <a
                  href="#contact"
                  className="btn-primary inline-block px-6 py-3 rounded-full font-medium"
                >
                  预约此路线
                </a>
              </div>
            </div>

            {/* 义乌路线 */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden scroll-animate">
              <div className="relative">
                <img
                  src="https://p11-doubao-search-sign.byteimg.com/tos-cn-i-xv4ileqgde/9a3a902ebb7049e395a85933bca352b5~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783598841&x-signature=9cMHDAcAy0rXRDE49uf2LxhPPjA%3D"
                  alt="义乌国际商贸城"
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-african-2 text-white px-4 py-1 rounded-full font-medium">
                  推荐路线
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">
                  义乌小商品采购之旅
                </h3>
                <div className="flex items-center mb-4">
                  <i className="fas fa-map-marker-alt text-african-2 mr-2"></i>
                  <span className="text-gray-700">义乌</span>
                  <span className="mx-3 text-gray-400">|</span>
                  <i className="fas fa-calendar-alt text-african-2 mr-2"></i>
                  <span className="text-gray-700">4-6天</span>
                </div>
                <p className="text-gray-600 mb-6">
                  义乌是世界最大的小商品批发市场，拥有超过7万个商铺，涵盖20个大类、60万个品种的商品。
                </p>
                <a
                  href="#contact"
                  className="btn-primary inline-block px-6 py-3 rounded-full font-medium"
                >
                  预约此路线
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的服务 */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 scroll-animate px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-primary">
              我们的服务
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              我们提供一站式商务旅游服务，从签证办理到物流运输，全程为您保驾护航。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* 服务卡片 - 这里可以进一步拆分 */}
            <div className="bg-white rounded-lg shadow-lg scroll-animate p-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <i className="fas fa-passport text-2xl md:text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-primary">
                签证服务
              </h3>
              <p className="text-gray-600 mb-4">
                提供专业的中国签证申请服务，包括商务签证、旅游签证等各类签证的办理。
              </p>
              <a href="#contact" className="text-blue-600 font-medium flex items-center hover:underline">
                了解更多 <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Exhibitions />
      <Stats />
      <ContactForm />
      <BackToTop />
      <WhatsAppButton />
    </main>
  )
}
