'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendarAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './Routes.module.scss'

interface RouteHighlight {
  text: string
}

interface Route {
  id: string
  image: string
  alt: string
  title: string
  location: string
  duration: string
  description: string
  badge: string
  badgeColor: string
  iconColor: string
  highlights: RouteHighlight[]
  colSpan?: string
}

const routes: Route[] = [
  {
    id: 'guangzhou',
    image: 'https://p3-doubao-search-sign.byteimg.com/tos-cn-i-xv4ileqgde/ae7f11e2465548019e408231d6125d7b~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783598841&x-signature=orgdl5yn62ROtnV0sSgYKuJKTdQ%3D',
    alt: '广州国际轻纺城',
    title: '广州纺织品采购之旅',
    location: '广州',
    duration: '3-5天',
    description: '广州是中国最大的纺织品和服装批发市场之一，拥有多个专业市场，包括广州国际轻纺城、白马服装市场等。',
    badge: '热门路线',
    badgeColor: 'bgAfrican1',
    iconColor: 'textAfrican1',
    highlights: [
      { text: '广州国际轻纺城 - 纺织品、面料' },
      { text: '白马服装市场 - 服装、配饰' },
      { text: '沙河服装批发市场 - 中低档服装' },
      { text: '广州uus服装城 - 韩国风格服装' },
    ],
  },
  {
    id: 'yiwu',
    image: 'https://p11-doubao-search-sign.byteimg.com/tos-cn-i-xv4ileqgde/9a3a902ebb7049e395a85933bca352b5~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783598841&x-signature=9cMHDAcAy0rXRDE49uf2LxhPPjA%3D',
    alt: '义乌国际商贸城',
    title: '义乌小商品采购之旅',
    location: '义乌',
    duration: '4-6天',
    description: '义乌是世界最大的小商品批发市场，拥有超过7万个商铺，涵盖20个大类、60万个品种的商品。',
    badge: '推荐路线',
    badgeColor: 'bgAfrican2',
    iconColor: 'textAfrican2',
    highlights: [
      { text: '义乌国际商贸城一区 - 玩具、饰品' },
      { text: '义乌国际商贸城二区 - 五金、电子' },
      { text: '义乌国际商贸城三区 - 文化用品、体育用品' },
      { text: '义乌国际商贸城四区 - 纺织品、服装' },
    ],
  },
  {
    id: 'combined',
    image: 'https://p11-doubao-search-sign.byteimg.com/tos-cn-i-qvj2lq49k0/c418269b9a7948b9a256813d181426cc~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783598841&x-signature=vWi8%2BL%2FMOnoJPPaojtMR070H1V8%3D',
    alt: '义乌小商品市场',
    title: '广州义乌组合采购之旅',
    location: '广州 + 义乌',
    duration: '7-10天',
    description: '此路线结合了广州和义乌的优势，让您一次行程覆盖中国两大主要批发市场，最大化您的采购效率。',
    badge: '豪华路线',
    badgeColor: 'bgSecondary',
    iconColor: 'textSecondary',
    colSpan: 'md-col-span-2',
    highlights: [
      { text: '广州部分（3-4天）：' },
      { text: '广州国际轻纺城' },
      { text: '白马服装市场' },
      { text: '广州uus服装城' },
      { text: '义乌部分（4-5天）：' },
      { text: '义乌国际商贸城一区至四区' },
      { text: '义乌宾王市场' },
      { text: '义乌生产资料市场' },
    ],
  },
]

export default function Routes() {
  return (
    <section id="routes" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} scroll-animate`}>
          <h2 className={styles.title}>
            精品商务路线
          </h2>
          <p className={styles.subtitle}>
            我们精心设计了多条商务路线，覆盖广州和义乌的主要批发市场，满足不同客户的采购需求。
          </p>
        </div>

        <div className={styles.grid}>
          {routes.map((route) => (
            <div
              key={route.id}
              className={`${styles.card} ${route.colSpan === 'md-col-span-2' ? styles.cardFullWidth : ''} scroll-animate`}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={route.image}
                  alt={route.alt}
                  className={`${styles.image} ${route.id === 'combined' ? styles.imageLarge : ''}`}
                />
                <div className={`${styles.badge} ${styles[route.badgeColor]}`}>
                  {route.badge}
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  {route.title}
                </h3>
                <div className={styles.meta}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={`${styles.metaIcon} ${styles[route.iconColor]}`} />
                  <span className={styles.metaText}>{route.location}</span>
                  <span className={styles.metaSeparator}>|</span>
                  <FontAwesomeIcon icon={faCalendarAlt} className={`${styles.metaIcon} ${styles[route.iconColor]}`} />
                  <span className={styles.metaText}>{route.duration}</span>
                </div>
                <p className={styles.cardDescription}>{route.description}</p>

                {route.id === 'combined' ? (
                  <div className={styles.highlightsGrid}>
                    <div>
                      <h4 className={styles.highlightsTitle}>广州部分（3-4天）：</h4>
                      <ul className={styles.highlightsList}>
                        <li className={styles.highlightItem}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.highlightIcon} />
                          <span>广州国际轻纺城</span>
                        </li>
                        <li className={styles.highlightItem}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.highlightIcon} />
                          <span>白马服装市场</span>
                        </li>
                        <li className={styles.highlightItem}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.highlightIcon} />
                          <span>广州uus服装城</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className={styles.highlightsTitle}>义乌部分（4-5天）：</h4>
                      <ul className={styles.highlightsList}>
                        <li className={styles.highlightItem}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.highlightIcon} />
                          <span>义乌国际商贸城一区至四区</span>
                        </li>
                        <li className={styles.highlightItem}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.highlightIcon} />
                          <span>义乌宾王市场</span>
                        </li>
                        <li className={styles.highlightItem}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.highlightIcon} />
                          <span>义乌生产资料市场</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className={styles.highlightsTitle}>路线亮点：</h4>
                    <ul className={styles.highlightsList}>
                      {route.highlights.map((highlight, index) => (
                        <li key={index} className={styles.highlightItem}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.highlightIcon} />
                          <span>{highlight.text}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <a
                  href="#contact"
                  className={`btn-primary ${styles.button}`}
                >
                  预约此路线
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
