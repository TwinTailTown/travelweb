import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Exhibition } from '@/types'

const DATA_FILE = path.join(process.cwd(), 'data', 'exhibitions.json')

async function readExhibitions(): Promise<Exhibition[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('读取数据文件失败:', error)
    return []
  }
}

async function saveExhibitions(exhibitions: Exhibition[]): Promise<boolean> {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(exhibitions, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('保存数据文件失败:', error)
    return false
  }
}

export async function GET() {
  try {
    const exhibitions = await readExhibitions()
    return NextResponse.json(exhibitions, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: '获取展会信息失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const exhibitions = await readExhibitions()

    const newId =
      exhibitions.length > 0
        ? Math.max(...exhibitions.map((e) => e.id)) + 1
        : 1

    const newExhibition: Exhibition = {
      id: newId,
      title: body.title || '',
      date: body.date || '',
      location: body.location || '',
      description: body.description || '',
      tags: body.tags || [],
      badge: body.badge || null,
      badgeColor: body.badgeColor || null,
      linkColor: body.linkColor || '#1a365d',
      detailLink: body.detailLink || '#',
    }

    exhibitions.push(newExhibition)
    const saved = await saveExhibitions(exhibitions)

    if (saved) {
      return NextResponse.json(newExhibition, {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
    } else {
      return NextResponse.json(
        { error: '保存失败' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: '请求格式错误' },
      { status: 400 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
