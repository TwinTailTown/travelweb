'use client'

import { useState, useEffect } from 'react'
import { Exhibition } from '@/types'

export function useExhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExhibitions()
  }, [])

  async function fetchExhibitions() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/exhibitions')
      if (!response.ok) {
        throw new Error('获取展会信息失败')
      }
      const data = await response.json()
      setExhibitions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setLoading(false)
    }
  }

  return { exhibitions, loading, error, refetch: fetchExhibitions }
}
