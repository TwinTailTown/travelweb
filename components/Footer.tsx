'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAfrica, faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* 公司信息 */}
          <div className={styles.column}>
            <div className={styles.logoSection}>
              <FontAwesomeIcon icon={faGlobeAfrica} className={styles.logoIcon} />
              <span className={styles.logoText}>中非商务旅游</span>
            </div>
            <p className={styles.description}>
              专业的中非商务旅游服务提供商，致力于为非洲客户提供一站式商务旅游解决方案。
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div className={`${styles.column} ${styles.hiddenMobile}`}>
            <h4 className={styles.title}>快速链接</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="#home" className={styles.link}>首页</Link>
              </li>
              <li>
                <Link href="#services" className={styles.link}>我们的服务</Link>
              </li>
              <li>
                <Link href="#routes" className={styles.link}>商务路线</Link>
              </li>
              <li>
                <Link href="#exhibitions" className={styles.link}>展会信息</Link>
              </li>
              <li>
                <Link href="#cases" className={styles.link}>成功案例</Link>
              </li>
              <li>
                <Link href="#about" className={styles.link}>关于我们</Link>
              </li>
              <li>
                <Link href="#contact" className={styles.link}>联系帮助</Link>
              </li>
            </ul>
          </div>

          {/* 服务项目 */}
          <div className={`${styles.column} ${styles.hiddenMobile}`}>
            <h4 className={styles.title}>服务项目</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="#services" className={styles.link}>签证邀请函服务</Link>
              </li>
              <li>
                <Link href="#services" className={styles.link}>专业接机服务</Link>
              </li>
              <li>
                <Link href="#services" className={styles.link}>商务酒店预订</Link>
              </li>
              <li>
                <Link href="#services" className={styles.link}>专业翻译服务</Link>
              </li>
              <li>
                <Link href="#services" className={styles.link}>市场考察安排</Link>
              </li>
              <li>
                <Link href="#services" className={styles.link}>商务谈判支持</Link>
              </li>
              <li>
                <Link href="#services" className={styles.link}>国际物流服务</Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div className={`${styles.column} ${styles.hiddenMobile}`}>
            <h4 className={styles.title}>联系方式</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.contactIcon} />
                <span className={styles.contactText}>
                  广州市天河区珠江新城冼村路28号保利中环广场A座25楼
                </span>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faPhoneAlt} className={styles.contactIcon} />
                <span className={styles.contactText}>+86 20 8888 8888</span>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                <span className={styles.contactText}>info@africachinabiz.com</span>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faClock} className={styles.contactIcon} />
                <span className={styles.contactText}>周一至周五: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className={styles.bottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>© 2025 中非商务旅游. 保留所有权利.</p>
            <div className={styles.bottomLinks}>
              <Link href="#" className={styles.bottomLink}>隐私政策</Link>
              <Link href="#" className={styles.bottomLink}>服务条款</Link>
              <Link href="#" className={styles.bottomLink}>网站地图</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
