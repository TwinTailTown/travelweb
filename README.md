# 中非商务旅游 - 一站式服务平台

基于 Next.js + TypeScript 构建的现代化商务旅游服务平台。...

## 技术栈

- **框架**: Next.js 16.1.4 (App Router)
- **语言**: TypeScript 5.9.3
- **样式**: Tailwind CSS 4.1.18
- **运行时**: Bun
- **UI 组件**: React 19.2.3
- **图标**: Font Awesome

## 项目结构

```
travelweb/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页
│   ├── admin/             # 后台管理页面
│   │   └── page.tsx
│   ├── api/               # API 路由
│   │   └── exhibitions/
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Navigation.tsx
│   ├── Carousel.tsx
│   ├── Exhibitions.tsx
│   ├── ContactForm.tsx
│   ├── BackToTop.tsx
│   ├── WhatsAppButton.tsx
│   └── Stats.tsx
├── hooks/                 # 自定义 Hooks
│   ├── useExhibitions.ts
│   └── useLanguage.ts
├── lib/                   # 工具函数
│   └── utils.ts
├── types/                 # TypeScript 类型定义
│   └── index.ts
└── data/                  # 数据文件
    └── exhibitions.json
```

## 安装依赖

使用 Bun 安装所有依赖：

```bash
bun install
```

## 开发模式

启动开发服务器：

```bash
bun run dev
```

访问 http://localhost:3000

## 生产构建

构建生产版本：

```bash
bun run build
```

启动生产服务器：

```bash
bun run start
```

## 功能特性

- ✅ 响应式设计（移动端、平板、桌面）
- ✅ 多语言支持（中文、英文、斯瓦希里语）
- ✅ 展会信息管理（CRUD）
- ✅ 展会日历动态更新
- ✅ 移动端展会翻页
- ✅ 桌面端展会滚动
- ✅ 联系表单
- ✅ 后台管理界面
- ✅ 滚动动画
- ✅ 返回顶部按钮
- ✅ WhatsApp 快速联系

## 后台管理

访问 `/admin` 路径进入后台管理界面，可以：

- 添加展会信息
- 编辑展会信息
- 删除展会信息
- 管理展会标签和徽章

## API 端点

- `GET /api/exhibitions` - 获取所有展会
- `POST /api/exhibitions` - 创建新展会
- `GET /api/exhibitions/[id]` - 获取单个展会
- `PUT /api/exhibitions/[id]` - 更新展会
- `DELETE /api/exhibitions/[id]` - 删除展会

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

MIT
