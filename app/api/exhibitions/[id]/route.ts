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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const exhibitionId = parseInt(id)
    const exhibitions = await readExhibitions()
    const exhibition = exhibitions.find((e) => e.id === exhibitionId)

    if (!exhibition) {
      return NextResponse.json(
        { error: '展会不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(exhibition, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: '获取展会信息失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const exhibitionId = parseInt(id)
    const body = await request.json()
    const exhibitions = await readExhibitions()
    const index = exhibitions.findIndex((e) => e.id === exhibitionId)

    if (index === -1) {
      return NextResponse.json(
        { error: '展会不存在' },
        { status: 404 }
      )
    }

    exhibitions[index] = {
      ...exhibitions[index],
      ...body,
      id: exhibitionId,
    }

    const saved = await saveExhibitions(exhibitions)

    if (saved) {
      return NextResponse.json(exhibitions[index], {
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const exhibitionId = parseInt(id)
    const exhibitions = await readExhibitions()
    const index = exhibitions.findIndex((e) => e.id === exhibitionId)

    if (index === -1) {
      return NextResponse.json(
        { error: '展会不存在' },
        { status: 404 }
      )
    }

    exhibitions.splice(index, 1)
    const saved = await saveExhibitions(exhibitions)

    if (saved) {
      return NextResponse.json(
        { message: '删除成功' },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    } else {
      return NextResponse.json(
        { error: '保存失败' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: '删除失败' },
      { status: 500 }
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
