'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhoneAlt, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedinIn,
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            <form id="contact-form">
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
                  <select
                    className={styles.select}
                    id="country"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="">国家</option>
                    <option value="egypt">埃及</option>
                    <option value="nigeria">尼日利亚</option>
                    <option value="south-africa">南非</option>
                    <option value="ghana">加纳</option>
                    <option value="kenya">肯尼亚</option>
                    <option value="senegal">塞内加尔</option>
                    <option value="other">其他国家</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="service">
                  咨询服务
                </label>
                <select
                  className={styles.select}
                  id="service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">请选择咨询服务</option>
                  <option value="visa">签证邀请函服务</option>
                  <option value="airport">接机服务</option>
                  <option value="hotel">酒店预订</option>
                  <option value="translation">翻译服务</option>
                  <option value="market">市场考察安排</option>
                  <option value="negotiation">商务谈判支持</option>
                  <option value="logistics">国际物流服务</option>
                  <option value="culture">文化体验活动</option>
                  <option value="route">商务路线定制</option>
                  <option value="exhibition">展会服务</option>
                  <option value="other">其他服务</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">
                  消息内容
                </label>
                <textarea
                  className={styles.textarea}
                  id="message"
                  rows={5}
                  placeholder="请详细描述您的需求或问题"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="button"
                id="submit-contact"
                onClick={handleSubmit}
                className={`btn-primary ${styles.submitButton} touch-manipulation`}
              >
                发送消息
              </button>
            </form>
          </div>

          <div className={styles.sidebar}>
            <div className={`${styles.contactCard} scroll-animate`}>
              <h3 className={styles.contactTitle}>联系方式</h3>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <div className={`${styles.iconWrapper} ${styles.iconRed}`}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactLabel}>地址</h4>
                    <p className={styles.contactValue}>广州市天河区珠江新城冼村路28号保利中环广场A座25楼</p>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                    <FontAwesomeIcon icon={faPhoneAlt} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactLabel}>电话</h4>
                    <p className={styles.contactValue}>+86 20 8888 8888</p>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactLabel}>邮箱</h4>
                    <p className={styles.contactValue}>info@africachinabiz.com</p>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                    <FontAwesomeIcon icon={faClock} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactLabel}>工作时间</h4>
                    <p className={styles.contactValue}>周一至周五: 9:00 - 18:00</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 桌面端显示关注我们 */}
            <div className={`${styles.socialCard} scroll-animate`}>
              <h3 className={styles.socialTitle}>关注我们</h3>
              <div className={styles.socialLinks}>
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.facebook}`}
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} className={styles.socialIcon} />
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
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.youtube}`}
                  aria-label="YouTube"
                >
                  <FontAwesomeIcon icon={faYoutube} className={styles.socialIcon} />
                </a>
                <a
                  href="#"
                  className={`${styles.socialLink} ${styles.linkedin}`}
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className={styles.socialIcon} />
                </a>
              </div>

              <div className={styles.newsletter}>
                <h4 className={styles.newsletterTitle}>订阅我们的通讯</h4>
                <div className={styles.newsletterForm}>
                  <input
                    type="email"
                    className={styles.newsletterInput}
                    placeholder="请输入您的邮箱"
                  />
                  <button type="button" className={`btn-primary ${styles.newsletterButton}`}>
                    订阅
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
