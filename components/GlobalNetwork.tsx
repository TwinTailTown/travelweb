'use client'

import { memo, useEffect, useRef } from 'react'
import styles from './GlobalNetwork.module.scss'

// 服务覆盖的国家列表（中文名称）
const coveredCountries = [
  '中国', '美国', '巴西', '澳大利亚', 
  '尼日利亚', '肯尼亚', '坦桑尼亚', '沙特阿拉伯', 
  '阿拉伯联合酋长国', '越南', '泰国', '印度',
  '南非', '埃塞俄比亚', '加纳', '英国', '德国', '法国'
]

const stats = [
  { number: '25', unit: '年+', label: '深耕国际物流' },
  { number: '20', unit: '家+', label: '分支机构' },
  { number: '9', unit: '个+', label: '国家海外仓' },
  { number: '50', unit: '个+', label: '覆盖国家' },
  { number: '500', unit: '人+', label: '全球员工' },
  { number: '3', unit: '万+', label: '服务客户数' },
]

 function GlobalNetwork() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let chart: any = null

    const loadMap = async () => {
      try {
        const echarts = await import('echarts')
        
        if (!chartRef.current) return

        // 使用 Canvas 渲染器（更快，但不支持事件）或 SVG（支持更多交互）
        // Canvas 渲染性能更好
        chart = echarts.init(chartRef.current, null, {
          renderer: 'canvas', // 使用 canvas 渲染，性能更好
          useDirtyRect: true, // 脏矩形渲染优化
        })

        // 从本地加载中文版世界地图数据
        const response = await fetch('/worldZH.min.json')
        const worldMapData = await response.json()

        // 注册地图
        echarts.registerMap('world', worldMapData)

        const option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            showDelay: 100, // 延迟显示，减少频繁触发
            hideDelay: 100,
            transitionDuration: 0.1, // 减少过渡时间
            formatter: function (params: any) {
              const isCovered = coveredCountries.includes(params.name)
              if (isCovered) {
                return `<strong style="color: #4CAF50;">${params.name}</strong><br/>✓ 服务覆盖地区`
              }
              return `<strong>${params.name}</strong>`
            },
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#4CAF50',
            borderWidth: 1,
            padding: 10,
            textStyle: {
              color: '#333',
              fontSize: 14,
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: 1,
            inRange: {
              color: ['#e8e8e8', '#4CAF50'],
            },
          },
          series: [
            {
              name: '全球网络',
              type: 'map',
              map: 'world',
              roam: false, // 禁用缩放和移动
              zoom: 1.15, // 默认放大 1.15 倍
              emphasis: {
                disabled: false, // 保持 hover 效果
                label: {
                  show: false, // 禁用 label 显示，减少渲染
                },
                itemStyle: {
                  areaColor: '#66BB6A',
                  borderColor: '#388E3C',
                  borderWidth: 1,
                  shadowBlur: 0, // 禁用阴影，提升性能
                },
              },
              select: {
                disabled: true, // 禁用选中状态
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 0.3, // 减少边框宽度
                areaColor: '#e8e8e8',
                shadowBlur: 0, // 禁用阴影
              },
              label: {
                show: false,
              },
              // 性能优化：只对覆盖的国家设置特殊样式
              data: coveredCountries.map((country) => ({
                name: country,
                value: 1,
                itemStyle: {
                  areaColor: '#4CAF50',
                },
                emphasis: {
                  itemStyle: {
                    areaColor: '#66BB6A',
                  },
                },
              })),
            },
          ],
          // 性能优化配置
          animation: false, // 禁用动画
          progressive: 1000, // 渐进式渲染
          progressiveThreshold: 3000, // 超过3000个图形元素启用渐进式渲染
        }

        chart.setOption(option)

        // 响应式处理 - 使用防抖优化
        let resizeTimer: NodeJS.Timeout
        const handleResize = () => {
          clearTimeout(resizeTimer)
          resizeTimer = setTimeout(() => {
            chart?.resize()
          }, 200) // 200ms 防抖
        }

        window.addEventListener('resize', handleResize)

        return () => {
          clearTimeout(resizeTimer)
          window.removeEventListener('resize', handleResize)
        }
      } catch (error) {
        console.error('Failed to load world map:', error)
      }
    }

    loadMap()

    return () => {
      chart?.dispose()
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>以全球网络赋能企业出海</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.mapContainer}>
          <div ref={chartRef} className={styles.chart}></div>
        </div>

        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumber}>
                {stat.number}
                <span className={styles.statUnit}>{stat.unit}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.progressBar}></div>
      </div>
    </section>
  )
}
export default memo(GlobalNetwork)