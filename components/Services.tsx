'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPassport,
  faPlane,
  faHotel,
  faLanguage,
  faStore,
  faHandshake,
  faShippingFast,
  faLeaf,
  faCheckCircle,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import styles from './Services.module.scss'

interface ServiceFeature {
  text: string
}

interface Service {
  id: string
  icon: IconDefinition
  iconBgColor: string
  iconColor: string
  title: string
  description: string
  features: ServiceFeature[]
  linkColor: string
}

const services: Service[] = [
  {
    id: 'visa',
    icon: faPassport,
    iconBgColor: 'bgRed100',
    iconColor: 'textAfrican1',
    title: '签证邀请函服务',
    description: '提供商务签证邀请函申请服务，协助准备所需材料，确保签证顺利获批。',
    features: [
      { text: '商务签证邀请函申请' },
      { text: '签证材料准备指导' },
      { text: '签证面试辅导' },
    ],
    linkColor: 'textAfrican1',
  },
  {
    id: 'airport',
    icon: faPlane,
    iconBgColor: 'bgBlue100',
    iconColor: 'textAfrican2',
    title: '专业接机服务',
    description: '提供24小时机场接送机服务，配备专业司机和翻译，确保您的行程顺畅。',
    features: [
      { text: '24小时机场接送机' },
      { text: '专业司机和翻译陪同' },
      { text: '行李协助和酒店入住' },
    ],
    linkColor: 'textAfrican2',
  },
  {
    id: 'hotel',
    icon: faHotel,
    iconBgColor: 'bgYellow100',
    iconColor: 'textSecondary',
    title: '商务酒店预订',
    description: '提供商务酒店预订服务，根据您的需求和预算推荐合适的住宿选择。',
    features: [
      { text: '商务酒店预订' },
      { text: '长期住宿优惠' },
      { text: '酒店设施和服务咨询' },
    ],
    linkColor: 'textSecondary',
  },
  {
    id: 'translation',
    icon: faLanguage,
    iconBgColor: 'bgGreen100',
    iconColor: 'textGreen600',
    title: '专业翻译服务',
    description: '提供专业的商务翻译服务，包括口语翻译、文件翻译和商务谈判翻译。',
    features: [
      { text: '商务口语翻译' },
      { text: '商务文件翻译' },
      { text: '商务谈判陪同翻译' },
    ],
    linkColor: 'textGreen600',
  },
  {
    id: 'market',
    icon: faStore,
    iconBgColor: 'bgPurple100',
    iconColor: 'textPurple600',
    title: '市场考察安排',
    description: '根据您的采购需求，安排专业的市场考察行程，带您参观相关批发市场和供应商。',
    features: [
      { text: '定制化市场考察行程' },
      { text: '专业市场导览' },
      { text: '供应商筛选和推荐' },
    ],
    linkColor: 'textPurple600',
  },
  {
    id: 'negotiation',
    icon: faHandshake,
    iconBgColor: 'bgRed100',
    iconColor: 'textAfrican1',
    title: '商务谈判支持',
    description: '提供商务谈判支持服务，包括价格协商、合同条款审核和商务礼仪指导。',
    features: [
      { text: '价格协商协助' },
      { text: '合同条款审核' },
      { text: '商务礼仪指导' },
    ],
    linkColor: 'textAfrican1',
  },
  {
    id: 'logistics',
    icon: faShippingFast,
    iconBgColor: 'bgBlue100',
    iconColor: 'textAfrican2',
    title: '国际物流服务',
    description: '提供国际物流服务，包括货物打包、仓储、报关和国际运输等。',
    features: [
      { text: '货物打包和仓储' },
      { text: '出口报关代理' },
      { text: '国际海运和空运' },
    ],
    linkColor: 'textAfrican2',
  },
  {
    id: 'culture',
    icon: faLeaf,
    iconBgColor: 'bgYellow100',
    iconColor: 'textSecondary',
    title: '文化体验活动',
    description: '安排中国文化体验活动，让您在商务之余感受中国传统文化的魅力。',
    features: [
      { text: '中国传统文化体验' },
      { text: '城市观光游览' },
      { text: '特色美食品尝' },
    ],
    linkColor: 'textSecondary',
  },
]

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} scroll-animate`}>
          <h2 className={styles.title}>
            我们的服务
          </h2>
          <p className={styles.subtitle}>
            我们提供全方位的商务旅游服务，从签证办理到行程安排，从翻译服务到物流支持，让您的中国采购之旅无忧无虑。
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.id} className={`${styles.card} service-card scroll-animate`}>
              <div className={styles.cardContent}>
                <div className={`${styles.iconWrapper} ${styles[service.iconBgColor]}`}>
                  <FontAwesomeIcon icon={service.icon} className={`${styles.icon} ${styles[service.iconColor]}`} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <ul className={styles.featuresList}>
                  {service.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <FontAwesomeIcon icon={faCheckCircle} className={styles.featureIcon} />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`${styles.featureLink} ${styles[service.linkColor]} touch-manipulation`}
                >
                  了解更多 <FontAwesomeIcon icon={faArrowRight} className={styles.featureLinkIcon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
