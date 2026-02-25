import Navigation from '@/components/Navigation'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import FloatButtons from '@/components/FloatButtons'
import styles from './VisaGuide.module.scss'

export default function VisaGuidePage() {
    const steps = [
        {
            num: '01',
            title: '在线填表',
            desc: '访问官方签证申请系统，注册账号并真实填写申请表，上传符合要求的白底近照。'
        },
        {
            num: '02',
            title: '准备邀请函',
            desc: '我司将根据您的身份信息和行程，出具符合使领馆要求的正式商务邀请函及证明文件。'
        },
        {
            num: '03',
            title: '递交材料',
            desc: '准备好护照原件、打印好的申请表、照片及我司提供的邀请函，前往目的地中国使馆或签证中心。'
        },
        {
            num: '04',
            title: '缴费取证',
            desc: '材料审核通过后，按照指引缴纳相关规费。签证签发后，凭缴费凭证领取您的护照及签证。'
        }
    ]

    const materials = [
        { name: '护照', desc: '原件，有效期需超过6个月，并留有至少2页空白签证页。' },
        { name: '证件照片', desc: '1-2张近期（6个月内）白底免冠证件照。' },
        { name: '商务邀请函', desc: '核心关键材料，由我司根据您的具体行程专业代办提供。' },
        { name: '我司营业执照', desc: '邀请单位的合法证明，由我司随邀请函一并提供。' },
        { name: '机票预售单', desc: '往返机票行程单，可待签证确切时间定下后再行最终出票。' },
        { name: '酒店确认函', desc: '在华期间的住宿安排证明，我们亦可协助您完成预订。' }
    ]

    const faqs = [
        {
            q: '客户代表不熟悉电脑操作，无法在线填表怎么办？',
            a: '我们可以提供在线指导，或者建议客户前往所在地的中国签证申请中心，那里通常提供协助填表的增值服务。'
        },
        {
            q: '办理签证需要提供邀请函的原件还是扫描件？',
            a: '目前大多数中国驻外使领馆接受打印好的扫描件。但为保险起见，建议在准备材料阶段与我司确认当时的最新政策。'
        },
        {
            q: '如果代表曾经有过拒签记录，该如何应对？',
            a: '拒签记录并不意味着再次申请一定失败。关键在于诚实申报，并根据拒签原因补充更有力的证明材料，我们将为您提供专业分析与建议。'
        }
    ]

    return (
        <div className={styles.pageContainer}>
            <Navigation />

            <header className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.pageTitle}>非洲客户中国商务签证 (M字签证) 全流程指南</h1>
                    <p className={styles.pageSubtitle}>一站式深度服务：从材料筹备到入境对接，为您的中国商贸之旅保驾护航</p>
                </div>
            </header>

            <main className={styles.mainContent}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>高效办理 4 步走</h2>
                    <div className={styles.stepsGrid}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.stepCard}>
                                <div className={styles.stepNumber}>{step.num}</div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>必备资料清单</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.materialTable}>
                            <thead>
                                <tr>
                                    <th>所需材料项</th>
                                    <th>详细要求与说明</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materials.map((m, i) => (
                                    <tr key={i}>
                                        <td>{m.name}</td>
                                        <td>{m.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>关键注意事项</h2>
                    <div className={styles.tipsGrid}>
                        <div className={styles.tipItem}>
                            <div className={styles.tipTitle}>邀请函是核心</div>
                            <div className={styles.tipText}>邀请函的内容必须严谨真实，单位盖章和负责人签字需清晰可见。</div>
                        </div>
                        <div className={styles.tipItem}>
                            <div className={styles.tipTitle}>办理周期预留</div>
                            <div className={styles.tipText}>建议在拟定行程前至少 30 天开始着手准备，以应对可能的政策变化。</div>
                        </div>
                        <div className={styles.tipItem}>
                            <div className={styles.tipTitle}>入境停留限制</div>
                            <div className={styles.tipText}>请严格遵守签证注明的停留天数，如需延长，需在到期前向当地公安机关申请。</div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>常见问题解答 (FAQ)</h2>
                    {faqs.map((faq, i) => (
                        <div key={i} className={styles.faqItem}>
                            <div className={styles.question}>
                                <span style={{ color: '#3bbfa3' }}>Q:</span> {faq.q}
                            </div>
                            <div className={styles.answer}>
                                <span style={{ fontWeight: 600, color: '#64748b' }}>A:</span> {faq.a}
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <ContactForm />
            <Footer />
            <FloatButtons />
        </div>
    )
}
