'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8613800138000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover-bg-green-600 transition-all duration-300 z-50 touch-manipulation"
      aria-label="WhatsApp联系我们"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
    </a>
  )
}
