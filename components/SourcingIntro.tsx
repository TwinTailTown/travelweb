'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './SourcingIntro.module.scss'

const features = [
  { text: 'QUALITY', description: 'sourcing', highlight: true },
  { text: 'SAFE', description: 'shipping', highlight: true },
  { text: '24/7', description: 'support', highlight: true },
  { text: 'COMPETITIVE', description: 'prices', highlight: true },
  { text: 'We offer 1 Month Free Warehouse', description: 'storage for your goods', highlight: false },
  { text: '2000+ Seller Recommend !!!', description: '', highlight: false },
]

export default function SourcingIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 左侧文字内容 */}
          <div className={styles.leftContent}>
            <h2 className={styles.title}>我们是您值得信赖的中国采购代理</h2>

            <div className={styles.description}>
              <p>欢迎来到我们中国一站式服务中心！我们专业为非洲朋友提供：来华旅游考察、产品采购、物流发货一条龙服务。</p>
              <p>无论您想来中国旅游、考察市场、寻找货源，还是需要帮忙挑选商品、对接工厂、把货物安全运回非洲，我们都能全程为您办好。</p>
            </div>

            <div className={styles.needHelp}>
              <p>
                我们拥有丰富的市场经验和可靠渠道，作为您在中国的贴心代理，我们提供
                <span className={styles.highlight}>专业指导</span>、
                <span className={styles.highlight}>省心服务</span>，让您来华做生意更轻松、更放心！
              </p>
            </div>

            <ul className={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                  <span>
                    {feature.highlight && <strong>{feature.text}</strong>}
                    {!feature.highlight && feature.text}
                    {feature.description && <span> {feature.description}</span>}
                  </span>
                </li>
              ))}
            </ul>

            <a href="#contact" className={styles.contactButton}>
              Contact This China Sourcing Company →
            </a>
          </div>

          {/* 右侧视频 */}
          <div className={styles.rightContent}>
            <div className={styles.videoWrapper}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/97K7WTQTUq4?si=z0PxJJfDeuF-zFyl"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
