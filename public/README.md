# Public 静态资源目录

## 地图数据文件

### worldZH.json
- **描述**: 中文版世界地图 GeoJSON 数据
- **来源**: [tower1229/echarts-world-map-jeojson](https://github.com/tower1229/echarts-world-map-jeojson)
- **大小**: 4.1 MB
- **格式**: GeoJSON FeatureCollection
- **用途**: GlobalNetwork 组件使用此文件渲染世界地图
- **访问路径**: `/worldZH.json`

## 更新地图数据

如需更新地图数据，运行：

```bash
curl -k -o public/worldZH.json https://raw.githubusercontent.com/tower1229/echarts-world-map-jeojson/master/worldZH.json
```

## 切换英文地图

如需使用英文版地图：

1. 下载英文版数据：
```bash
curl -k -o public/worldEN.json https://raw.githubusercontent.com/tower1229/echarts-world-map-jeojson/master/worldEN.json
```

2. 修改 `components/GlobalNetwork.tsx`:
```typescript
const response = await fetch('/worldEN.json')
```

3. 更新国家名称为英文：
```typescript
const coveredCountries = [
  'China', 'United States of America', 'Brazil', // ...
]
```
