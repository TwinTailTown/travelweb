'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './SourcingIntro.module.scss'

const features = [
  { text: '最新市场咨询', description: '', highlight: false },
  { text: '高质量采购', description: '', highlight: false },
  { text: '最有竞争力价格', description: '', highlight: false },
  { text: '安全运输服务', description: '', highlight: false },
  { text: '我们有丰富的导游经验', description: '', highlight: false },
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
              <p>
                欢迎来到我们的中国一站式服务中心！我们专业为非洲朋友提供从旅游考察、产品采购到物流发货的一条龙服务。
                无论您是想来华寻找货源、对接工厂，还是需要可靠的贴心代理协助商品挑选与安全物流，我们都能凭借丰富的市场经验和渠道全程为您办好，
                提供专业、省心的全方位指导，让您的中国之行更轻松、更放心！
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
              联系报名中国之旅
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
