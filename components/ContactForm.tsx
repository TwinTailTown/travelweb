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
  faWhatsapp,
  faSkype,
  faWeixin,
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
                    <option value="">请选择所在国家</option>
                    <option value="nigeria">尼日利亚</option>
                    <option value="south-africa">南非</option>
                    <option value="egypt">埃及</option>
                    <option value="ethiopia">埃塞俄比亚</option>
                    <option value="kenya">肯尼亚</option>
                    <option value="tanzania">坦桑尼亚</option>
                    <option value="ghana">加纳</option>
                    <option value="cameroon">喀麦隆</option>
                    <option value="ivory-coast">科特迪瓦</option>
                    <option value="senegal">塞内加尔</option>
                    <option value="angola">安哥拉</option>
                    <option value="algeria">阿尔及利亚</option>
                    <option value="morocco">摩洛哥</option>
                    <option value="uganda">乌干达</option>
                    <option value="rwanda">卢旺达</option>
                    <option value="zambia">赞比亚</option>
                    <option value="zimbabwe">津巴布韦</option>
                    <option value="mozambique">莫桑比克</option>
                    <option value="botswana">博茨瓦纳</option>
                    <option value="namibia">纳米比亚</option>
                    <option value="other-africa">其他非洲国家</option>
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
            <div className={`${styles.founderMessage} scroll-animate`}>
              <h3 className={styles.founderTitle}>创始人寄语</h3>
              <p className={styles.founderSubtitle}>
                LeelineSourcing 将始终是您从中国进口商品的最佳采购伙伴。
              </p>

              <div className={styles.founderImageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                  alt="Sharline"
                  className={styles.founderImage}
                />
              </div>

              <div className={styles.founderBio}>
                <p>
                  嘿，我是 Leeline Sourcing 的创始人 Sharline。我在中国采购领域拥有 10 年的经验，我们帮助 2000 多位客户从中国、阿里巴巴、1688 进口到亚马逊 FBA 或 Shopify。如果你有任何关于采购的问题，请随时联系我们。
                </p>
              </div>

              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <FontAwesomeIcon icon={faWhatsapp} className={styles.contactIcon} />
                  <span>Whatsapp ID : 8613986152456</span>
                </li>
                <li className={styles.contactItem}>
                  <FontAwesomeIcon icon={faSkype} className={styles.contactIcon} />
                  <span>Skype : sharline1983</span>
                </li>
                <li className={styles.contactItem}>
                  <FontAwesomeIcon icon={faWeixin} className={styles.contactIcon} />
                  <span>微信 : 13986152456</span>
                </li>
                <li className={styles.contactItem}>
                  <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                  <span>info@leelinesourcing.com</span>
                </li>
                <li className={styles.contactItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.contactIcon} />
                  <span>地址：湖北省武汉市汉阳区九州通大厦 2208 室</span>
                </li>
              </ul>

              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
