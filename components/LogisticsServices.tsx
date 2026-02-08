'use client'

import { useState } from 'react'
import styles from './LogisticsServices.module.scss'

interface ServiceDetail {
  category: string
  items: string[]
}

interface LogisticsService {
  id: string
  image: string
  title: string
  description: string
  details: ServiceDetail[]
}

const services: LogisticsService[] = [
  {
    id: 'business-travel',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    title: '商旅服务·专业商务接待全流程',
    description: '提供从签证办理、机场接送、酒店住宿到商务翻译的一站式商旅服务解决方案',
    details: [
      {
        category: '签证服务',
        items: ['邀请函办理', '材料指导', '快速审批']
      },
      {
        category: '接送服务',
        items: ['机场接送', '专车配备', '行程安排']
      },
      {
        category: '住宿安排',
        items: ['商务酒店', '长租优惠', '舒适环境']
      },
      {
        category: '翻译陪同',
        items: ['专业翻译', '商务陪同', '文化沟通']
      },
      {
        category: '行程规划',
        items: ['定制路线', '时间优化', '高效安排']
      }
    ]
  },
  {
    id: 'procurement',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    title: '采购服务·对接优质供应商资源',
    description: '打造从市场考察、供应商筛选到价格谈判的全方位采购支持服务',
    details: [
      {
        category: '市场考察',
        items: ['义乌市场', '广州批发', '深圳电子']
      },
      {
        category: '供应商对接',
        items: ['资质审核', '实地考察', '质量把控']
      },
      {
        category: '商务谈判',
        items: ['价格协商', '订单跟进', '合同审核']
      },
      {
        category: '质检服务',
        items: ['产品检验', '质量标准', '报告出具']
      },
      {
        category: '采购支持',
        items: ['下单协助', '进度追踪', '售后处理']
      }
    ]
  },
  {
    id: 'logistics',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
    title: '物流服务·国际运输清关派送',
    description: '提供从仓储打包、国际运输到清关派送的全链条物流配送解决方案',
    details: [
      {
        category: '仓储服务',
        items: ['货物集运', '安全仓储', '打包装箱']
      },
      {
        category: '国际运输',
        items: ['海运专线', '空运快递', '陆运物流']
      },
      {
        category: '清关服务',
        items: ['报关代理', '单证办理', '税务处理']
      },
      {
        category: '末端配送',
        items: ['目的地派送', '签收确认', '物流追踪']
      },
      {
        category: '增值服务',
        items: ['保险服务', '货物查验', '特殊处理']
      }
    ]
  },
  {
    id: 'exhibition',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    title: '展会服务·专业展览参观对接',
    description: '提供广交会、进博会等大型展会的参观对接和商务配套服务',
    details: [
      {
        category: '展会门票',
        items: ['门票预订', '展位预约', '观展安排']
      },
      {
        category: '展会接待',
        items: ['专人接待', '展馆导览', '展商对接']
      },
      {
        category: '商务配套',
        items: ['翻译服务', '商务洽谈', '资料整理']
      },
      {
        category: '展会推荐',
        items: ['广交会', '进博会', '行业展会']
      },
      {
        category: '后续跟进',
        items: ['名片整理', '联系对接', '订单跟进']
      }
    ]
  },
  {
    id: 'products',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    title: '产品服务·精选优质商品推荐',
    description: '聚焦纺织品、小商品、电子产品等优势品类，提供一站式产品采购方案',
    details: [
      {
        category: '纺织服装',
        items: ['面料布匹', '成衣服装', '鞋帽配饰']
      },
      {
        category: '小商品',
        items: ['日用百货', '工艺品', '节日用品']
      },
      {
        category: '电子产品',
        items: ['消费电子', '配件周边', '智能设备']
      },
      {
        category: '建材五金',
        items: ['装饰材料', '五金工具', '灯具照明']
      },
      {
        category: '定制服务',
        items: ['OEM定制', '品牌代工', '包装设计']
      }
    ]
  }
]

export default function LogisticsServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>以优质服务筑牢发展根基</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.cardsWrapper}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`${styles.card} ${hoveredIndex === index ? styles.expanded : ''} ${hoveredIndex !== null && hoveredIndex !== index ? styles.collapsed : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.cardImage}>
                <img src={service.image} alt={service.title} />
                <div className={styles.cardOverlay}></div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                
                {hoveredIndex !== index && (
                  <>
                    <p className={styles.cardDescription}>{service.description}</p>
                    <button className={styles.cardButton}>了解详情 ›</button>
                  </>
                )}

                {hoveredIndex === index && (
                  <div className={styles.detailsWrapper}>
                    <p className={styles.expandedDescription}>{service.description}</p>
                    <div className={styles.detailsGrid}>
                      {service.details.map((detail, idx) => (
                        <div key={idx} className={styles.detailItem}>
                          <h4 className={styles.detailCategory}>{detail.category}</h4>
                          <ul className={styles.detailList}>
                            {detail.items.map((item, itemIdx) => (
                              <li key={itemIdx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
