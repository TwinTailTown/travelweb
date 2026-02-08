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
            <h2 className={styles.title}>Your Trusted China Sourcing Agent</h2>
            
            <div className={styles.description}>
              <p>Welcome to the biggest product sourcing company in China.</p>
              <p>With a decade of sourcing experience, we provide all sorts of product sourcing services to your needs.</p>
            </div>

            <div className={styles.needHelp}>
              <p>
                Need help finding expertise for sourcing goods? Work with us! We as China{' '}
                <span className={styles.highlight}>sourcing agents</span> gives you professional advice to build your{' '}
                <span className={styles.highlight}>eCommerce business</span>, including:
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
