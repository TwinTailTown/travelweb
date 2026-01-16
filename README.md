# 中非商务旅游一站式服务平台

## 项目说明

这是一个中非商务旅游一站式服务平台的网站项目，提供商务路线、展会信息、服务介绍等功能。

## 技术栈

- **前端**: HTML, CSS, JavaScript, Tailwind CSS
- **后端**: Bun (JavaScript 运行时)
- **服务端**: Bun HTTP Server

## 安装和运行

### 1. 安装 Bun

如果还没有安装 Bun，请运行：

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 2. 启动服务

```bash
bun run server.js
```

或者使用开发模式（自动重启）：

```bash
bun run dev
```

服务将在 `http://localhost:3000` 启动。

### 3. 访问网站

在浏览器中打开 `http://localhost:3000`

## API 接口

### 获取展会信息

- **URL**: `/api/exhibitions`
- **方法**: `GET`
- **响应**: JSON 格式的展会信息数组

示例响应：

```json
[
  {
    "id": 1,
    "title": "第138届中国进出口商品交易会（广交会）",
    "date": "2025年10月15日 - 11月4日",
    "location": "广州 · 广交会展馆",
    "description": "广交会是中国最大的进出口商品交易会...",
    "tags": ["电子家电", "机械设备", "纺织品", "家居用品"],
    "badge": "热门",
    "badgeColor": "#e63946",
    "linkColor": "#e63946",
    "detailLink": "#"
  }
]
```

## 项目结构

```
.
├── index.html          # 主页面
├── script.js           # 前端 JavaScript
├── style.css           # 样式文件
├── server.js           # 后端服务
├── package.json        # 项目配置
└── README.md           # 项目说明
```

## 功能特性

- ✅ 响应式设计
- ✅ 多语言支持（中文、英文、斯瓦希里语）
- ✅ 动态展会信息获取
- ✅ 轮播图展示
- ✅ 滚动动画效果
- ✅ 联系表单

## 开发说明

### 修改展会信息

编辑 `server.js` 文件中的 `exhibitions` 数组来修改展会信息。

### 添加新的 API 接口

在 `server.js` 的 `fetch` 函数中添加新的路由处理。

## 许可证

MIT
