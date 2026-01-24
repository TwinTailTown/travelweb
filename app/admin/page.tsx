'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faHome,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faSave,
} from '@fortawesome/free-solid-svg-icons'
import { Exhibition } from '@/types'

export default function AdminPage() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<Partial<Exhibition>>({
    title: '',
    date: '',
    location: '',
    description: '',
    tags: [],
    badge: null,
    badgeColor: null,
    linkColor: '#1a365d',
    detailLink: '#',
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    fetchExhibitions()
  }, [])

  const fetchExhibitions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/exhibitions')
      if (!response.ok) throw new Error('获取展会信息失败')
      const data = await response.json()
      setExhibitions(data)
    } catch (error) {
      console.error('获取展会信息失败:', error)
      alert('获取展会信息失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      tags: [],
      badge: null,
      badgeColor: null,
      linkColor: '#1a365d',
      detailLink: '#',
    })
    setEditingId(null)
    setShowModal(true)
  }

  const handleEdit = (exhibition: Exhibition) => {
    setFormData(exhibition)
    setEditingId(exhibition.id)
    setTagInput(exhibition.tags.join(', '))
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个展会吗？')) return

    try {
      const response = await fetch(`/api/exhibitions/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('删除失败')
      fetchExhibitions()
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const tags = tagInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const submitData = {
      ...formData,
      tags,
    }

    try {
      if (editingId) {
        const response = await fetch(`/api/exhibitions/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData),
        })
        if (!response.ok) throw new Error('更新失败')
      } else {
        const response = await fetch('/api/exhibitions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData),
        })
        if (!response.ok) throw new Error('添加失败')
      }
      setShowModal(false)
      fetchExhibitions()
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败')
    }
  }

  const getBadgeClass = (badgeColor: string | null) => {
    if (badgeColor === '#e63946') {
      return 'bg-[#e63946]'
    } else if (badgeColor === '#457b9d') {
      return 'bg-[#457b9d]'
    }
    return 'bg-gray-500'
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 导航栏 */}
      <nav className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCog} className="text-2xl mr-3" />
              <h1 className="text-2xl font-bold">展会信息管理后台</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-gray-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 操作栏 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary">展会列表</h2>
            <button
              onClick={handleAdd}
              className="bg-african-1 text-white px-6 py-2 rounded-lg hover:bg-[#d62839] transition duration-300 flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              添加展会
            </button>
          </div>
        </div>

        {/* 展会列表 */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-african-1"></div>
            <p className="text-gray-600 mt-4">加载中...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标题
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    地点
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标签
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {exhibitions.map((exhibition) => (
                  <tr key={exhibition.id} className="fade-in">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exhibition.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center">
                        <span>{exhibition.title}</span>
                        {exhibition.badge && (
                          <span
                            className={`${getBadgeClass(exhibition.badgeColor)} text-white px-3 py-1 rounded-full text-sm whitespace-nowrap ml-2`}
                            style={
                              exhibition.badgeColor &&
                              exhibition.badgeColor !== '#e63946' &&
                              exhibition.badgeColor !== '#457b9d'
                                ? { backgroundColor: exhibition.badgeColor }
                                : undefined
                            }
                          >
                            {exhibition.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exhibition.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exhibition.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {exhibition.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(exhibition)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(exhibition.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 添加/编辑模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary">
                  {editingId ? '编辑展会' : '添加展会'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      标题 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      日期 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="例如：2025年10月15日 - 11月4日"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      地点 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      描述 *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      标签（用逗号分隔）
                    </label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="例如：电子家电, 机械设备, 纺织品"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      徽章文字
                    </label>
                    <input
                      type="text"
                      value={formData.badge || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value || null })
                      }
                      placeholder="例如：热门、推荐"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      徽章颜色
                    </label>
                    <input
                      type="color"
                      value={formData.badgeColor || '#e63946'}
                      onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      链接颜色
                    </label>
                    <input
                      type="color"
                      value={formData.linkColor || '#1a365d'}
                      onChange={(e) => setFormData({ ...formData, linkColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      详情链接
                    </label>
                    <input
                      type="text"
                      value={formData.detailLink}
                      onChange={(e) => setFormData({ ...formData, detailLink: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-1"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-african-1 text-white rounded-lg hover:bg-[#d62839] flex items-center"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
