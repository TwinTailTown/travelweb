'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import {
  faWhatsapp,
  faWeixin,
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.country || !formData.service || !formData.message) {
      alert('请填写所有必填字段')
      return
    }
    alert('感谢您的留言！我们的团队将在24小时内与您联系。')
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      service: '',
      message: '',
    })
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 scroll-animate px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-primary">
            联系帮助
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            无论您有任何问题或需求，我们的团队随时为您提供帮助。请通过以下方式与我们联系。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-lg shadow-xl p-6 scroll-animate">
            <h3 className="text-2xl font-bold mb-6 text-primary">发送消息</h3>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 md:mb-2 text-xs md:text-base" htmlFor="name">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="w-full px-2 md:px-4 py-2 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1 text-sm md:text-base"
                    id="name"
                    placeholder="姓名"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 md:mb-2 text-xs md:text-base" htmlFor="email">
                    邮箱
                  </label>
                  <input
                    type="email"
                    className="w-full px-2 md:px-4 py-2 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1 text-sm md:text-base"
                    id="email"
                    placeholder="邮箱"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 md:mb-2 text-xs md:text-base" htmlFor="phone">
                    电话
                  </label>
                  <input
                    type="tel"
                    className="w-full px-2 md:px-4 py-2 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1 text-sm md:text-base"
                    id="phone"
                    placeholder="电话"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 md:mb-2 text-xs md:text-base" htmlFor="country">
                    国家
                  </label>
                  <input
                    type="text"
                    className="w-full px-2 md:px-4 py-2 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1 text-sm md:text-base"
                    id="country"
                    placeholder="国家"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1 md:mb-2 text-xs md:text-base" htmlFor="service">
                  服务类型
                </label>
                <select
                  className="w-full px-2 md:px-4 py-2 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1 text-sm md:text-base"
                  id="service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">请选择服务类型</option>
                  <option value="visa">签证服务</option>
                  <option value="accommodation">住宿安排</option>
                  <option value="translation">翻译服务</option>
                  <option value="market">市场考察</option>
                  <option value="negotiation">商务谈判</option>
                  <option value="logistics">物流服务</option>
                  <option value="exhibition">展会服务</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-1 md:mb-2 text-xs md:text-base" htmlFor="message">
                  留言
                </label>
                <textarea
                  className="w-full px-2 md:px-4 py-2 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1 text-sm md:text-base min-h-[120px]"
                  id="message"
                  placeholder="请输入您的留言"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                id="submit-contact"
                className="btn-primary w-full px-6 py-3 rounded-full font-medium text-center touch-manipulation"
              >
                提交
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-6 scroll-animate">
              <h3 className="text-2xl font-bold mb-6 text-primary">联系方式</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faEnvelope} className="text-african-1 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">邮箱</h4>
                    <p className="text-gray-600">info@africa-china-travel.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faPhone} className="text-african-1 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">电话</h4>
                    <p className="text-gray-600">+86 138 0013 8000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-african-1 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">地址</h4>
                    <p className="text-gray-600">中国广州市天河区</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 移动端隐藏关注我们 */}
            <div className="bg-white rounded-lg shadow-xl p-6 scroll-animate hidden md:block">
              <h3 className="text-2xl font-bold mb-6 text-primary">关注我们</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors"
                  aria-label="微信"
                >
                  <FontAwesomeIcon icon={faWeixin} className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
