'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendarAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

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
    badgeColor: 'bg-african-1',
    iconColor: 'text-african-1',
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
    badgeColor: 'bg-african-2',
    iconColor: 'text-african-2',
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
    badgeColor: 'bg-[#f59e0b]',
    iconColor: 'text-[#f59e0b]',
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
    <section id="routes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md-mb-16 scroll-animate px-4">
          <h2 className="text-2xl sm-text-3xl md-text-4xl font-bold mb-3 md-mb-4 text-primary">
            精品商务路线
          </h2>
          <p className="text-base sm-text-lg text-gray-600 max-w-3xl mx-auto">
            我们精心设计了多条商务路线，覆盖广州和义乌的主要批发市场，满足不同客户的采购需求。
          </p>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-2 gap-6 md-gap-10">
          {routes.map((route) => (
            <div
              key={route.id}
              className={`bg-white rounded-lg shadow-xl overflow-hidden scroll-animate ${route.colSpan || ''}`}
            >
              <div className="relative">
                <img
                  src={route.image}
                  alt={route.alt}
                  className={`w-full object-cover ${route.id === 'combined' ? 'h-56 md-h-80' : 'h-48 md-h-64'}`}
                />
                <div className={`absolute top-4 right-4 ${route.badgeColor} text-white px-4 py-1 rounded-full font-medium`}>
                  {route.badge}
                </div>
              </div>
              <div className="p-4 md-p-6">
                <h3 className="text-xl md-text-2xl font-bold mb-3 md-mb-4 text-primary">
                  {route.title}
                </h3>
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={`${route.iconColor} mr-2`} />
                  <span className="text-gray-700">{route.location}</span>
                  <span className="mx-3 text-gray-400">|</span>
                  <FontAwesomeIcon icon={faCalendarAlt} className={`${route.iconColor} mr-2`} />
                  <span className="text-gray-700">{route.duration}</span>
                </div>
                <p className="text-gray-600 mb-6">{route.description}</p>

                {route.id === 'combined' ? (
                  <div className="grid grid-cols-1 md-grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-primary">广州部分（3-4天）：</h4>
                      <ul className="text-gray-600">
                        <li className="flex items-start mb-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>广州国际轻纺城</span>
                        </li>
                        <li className="flex items-start mb-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>白马服装市场</span>
                        </li>
                        <li className="flex items-start">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>广州uus服装城</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-primary">义乌部分（4-5天）：</h4>
                      <ul className="text-gray-600">
                        <li className="flex items-start mb-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>义乌国际商贸城一区至四区</span>
                        </li>
                        <li className="flex items-start mb-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>义乌宾王市场</span>
                        </li>
                        <li className="flex items-start">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>义乌生产资料市场</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold text-lg mb-3 text-primary">路线亮点：</h4>
                    <ul className="text-gray-600 mb-6">
                      {route.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start mb-2 last:mb-0">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>{highlight.text}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <a
                  href="#contact"
                  className="btn-primary inline-block px-6 py-3 rounded-full font-medium text-white"
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
