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
import styles from './ContactForm.module.scss'

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
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} scroll-animate`}>
          <h2 className={styles.title}>
            联系帮助
          </h2>
          <p className={styles.subtitle}>
            无论您有任何问题或需求，我们的团队随时为您提供帮助。请通过以下方式与我们联系。
          </p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.formCard} scroll-animate`}>
            <h3 className={styles.formTitle}>发送消息</h3>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">
                    姓名
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    id="name"
                    placeholder="姓名"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">
                    邮箱
                  </label>
                  <input
                    type="email"
                    className={styles.input}
                    id="email"
                    placeholder="邮箱"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="phone">
                    电话
                  </label>
                  <input
                    type="tel"
                    className={styles.input}
                    id="phone"
                    placeholder="电话"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="country">
                    国家
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    id="country"
                    placeholder="国家"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="service">
                  服务类型
                </label>
                <select
                  className={styles.select}
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
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">
                  留言
                </label>
                <textarea
                  className={styles.textarea}
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
                className={`btn-primary ${styles.submitButton}`}
              >
                提交
              </button>
            </form>
          </div>

          <div className={styles.sidebar}>
            <div className={`${styles.contactCard} scroll-animate`}>
              <h3 className={styles.contactTitle}>联系方式</h3>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactLabel}>邮箱</h4>
                    <p className={styles.contactValue}>info@africa-china-travel.com</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactLabel}>电话</h4>
                    <p className={styles.contactValue}>+86 138 0013 8000</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.contactIcon} />
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactLabel}>地址</h4>
                    <p className={styles.contactValue}>中国广州市天河区</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 移动端隐藏关注我们 */}
            <div className={`${styles.socialCard} scroll-animate`}>
              <h3 className={styles.socialTitle}>关注我们</h3>
              <div className={styles.socialLinks}>
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.whatsapp}`}
                  aria-label="WhatsApp"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className={styles.socialIcon} />
                </a>
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.weixin}`}
                  aria-label="微信"
                >
                  <FontAwesomeIcon icon={faWeixin} className={styles.socialIcon} />
                </a>
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.facebook}`}
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
                </a>
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.twitter}`}
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
                </a>
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.instagram}`}
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
