# 地图数据说明

## ✅ 已完成：地图数据本地化

世界地图数据已下载到本地，不再需要每次访问 GitHub。

### 📁 文件位置
```
public/worldZH.json (4.1 MB)
```

### 🔄 加载方式
组件从本地加载：
```typescript
const response = await fetch('/worldZH.json')
```

### ✨ 优势
- ⚡ **更快的加载速度** - 无需等待外部网络请求
- 🔒 **更稳定** - 不依赖 GitHub 的可用性
- 💰 **节省带宽** - 减少外部 API 调用
- 🚀 **离线可用** - 本地开发时也能正常工作

### 📦 数据来源
- 仓库: [tower1229/echarts-world-map-jeojson](https://github.com/tower1229/echarts-world-map-jeojson)
- 文件: worldZH.json (中国居中版本，中文国家名称)
- 格式: GeoJSON FeatureCollection
- 包含: 全球 200+ 个国家/地区的地理边界数据

### 🔄 如何更新地图数据

当地图数据需要更新时，运行：

```bash
cd /Users/plutocrown/Desktop/travelweb
curl -k -o public/worldZH.json https://raw.githubusercontent.com/tower1229/echarts-world-map-jeojson/master/worldZH.json
```

### 🌍 使用英文地图（可选）

如果需要英文国家名称：

**步骤 1**: 下载英文版地图数据
```bash
curl -k -o public/worldEN.json https://raw.githubusercontent.com/tower1229/echarts-world-map-jeojson/master/worldEN.json
```

**步骤 2**: 修改 `components/GlobalNetwork.tsx`
```typescript
// 修改这一行
const response = await fetch('/worldEN.json')

// 更新国家列表为英文名称
const coveredCountries = [
  'China', 'United States of America', 'Brazil', 'Australia', 
  'Nigeria', 'Kenya', 'Tanzania', 'Saudi Arabia', 
  'United Arab Emirates', 'Vietnam', 'Thailand', 'India',
  'South Africa', 'Ethiopia', 'Ghana', 'United Kingdom', 'Germany', 'France'
]
```

### 📊 当前覆盖的国家（18个）

中文名称列表：
- 亚洲: 中国、越南、泰国、印度、沙特阿拉伯、阿拉伯联合酋长国
- 非洲: 尼日利亚、肯尼亚、坦桑尼亚、南非、埃塞俄比亚、加纳
- 美洲: 美国、巴西
- 欧洲: 英国、德国、法国
- 大洋洲: 澳大利亚

### 🎨 配色方案
- 服务覆盖国家: `#4CAF50` (绿色)
- 未覆盖国家: `#e8e8e8` (灰色)
- 悬浮高亮: `#66BB6A` (亮绿色)

### 🐛 常见问题

**Q: 地图无法显示？**
- 确认 `public/worldZH.json` 文件存在
- 检查文件大小约为 4.1 MB
- 查看浏览器控制台是否有 404 错误

**Q: 国家名称不匹配？**
- 中文地图必须使用完整的中文国家名称
- 部分国家名称较长（如"阿拉伯联合酋长国"）

**Q: 如何添加更多国家？**
- 在 `components/GlobalNetwork.tsx` 的 `coveredCountries` 数组中添加
- 确保国家名称与 worldZH.json 中的完全一致

### 📚 相关文件
- 组件: `components/GlobalNetwork.tsx`
- 样式: `components/GlobalNetwork.module.scss`
- 数据: `public/worldZH.json`
- 说明: `public/README.md`
