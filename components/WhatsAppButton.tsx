'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import styles from './WhatsAppButton.module.scss'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8613800138000"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="WhatsApp联系我们"
    >
      <FontAwesomeIcon icon={faWhatsapp} className={styles.icon} />
    </a>
  )
}
