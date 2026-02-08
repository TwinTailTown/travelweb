# 网站色系变量说明

## 配色方案
本网站采用橙色为主色，绿色为次色的配色方案。

## CSS 变量定义（位于 `app/globals.scss`）

### 主色系 - 橙色
```scss
--primary-color: #FF8C42;          // 主橙色
--primary-color-light: #FFB366;    // 浅橙色
--primary-color-dark: #E67A2E;     // 深橙色
--primary-color-hover: #FF7A29;    // hover 橙色
```

### 次色系 - 绿色
```scss
--secondary-color: #4CAF50;        // 主绿色
--secondary-color-light: #66BB6A;  // 浅绿色
--secondary-color-dark: #388E3C;   // 深绿色
--secondary-color-hover: #45A049;  // hover 绿色
```

### 辅助色
```scss
--accent-color: #FFA726;           // 强调色（亮橙色）
--dark-color: #2C3E50;             // 深色背景
--light-color: #F5F7FA;            // 浅色背景
--text-color: #333333;             // 主文字颜色
--text-light: #6B7280;             // 浅文字颜色
--border-color: #E0E0E0;           // 边框颜色
```

### 背景色
```scss
--bg-primary: #FFFFFF;             // 主背景色（白色）
--bg-secondary: #F9FAFB;           // 次背景色（浅灰）
--bg-light: #FFF8F3;               // 浅色背景（暖色调）
```

### 状态色
```scss
--success-color: #4CAF50;          // 成功状态（绿色）
--warning-color: #FF9800;          // 警告状态（橙色）
--error-color: #F44336;            // 错误状态（红色）
--info-color: #2196F3;             // 信息状态（蓝色）
```

### 阴影
```scss
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

## 使用示例

### 在 SCSS 模块中使用
```scss
.myButton {
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    background-color: var(--primary-color-hover);
  }
}
```

### 在内联样式中使用
```tsx
<div style={{ backgroundColor: 'var(--primary-color)' }}>
  内容
</div>
```

## 已更新的组件

以下组件已统一使用新的色系变量：

1. **全局样式** (`app/globals.scss`)
   - 按钮样式
   - 滚动条
   - 触摸高亮

2. **导航栏** (`components/Navigation`)
   - Logo 图标颜色
   - 链接 hover 效果
   - 下划线颜色

3. **物流服务** (`components/LogisticsServices`)
   - 标题下划线渐变
   - 卡片叠加层
   - 按钮 hover 效果

4. **采购介绍** (`components/SourcingIntro`)
   - 标题颜色
   - 高亮文字
   - 勾选图标
   - 联系按钮

5. **服务卡片** (`components/Services`)
   - 图标背景色
   - 图标颜色
   - 链接颜色

6. **路线展示** (`components/Routes`)
   - 徽章背景色
   - 图标颜色
   - 高亮图标

7. **联系表单** (`components/ContactForm`)
   - 输入框焦点效果
   - 图标背景色和颜色

8. **展会列表** (`components/Exhibitions`)
   - 徽章颜色
   - 边框颜色
   - 标签颜色

9. **页脚** (`components/Footer`)
   - Logo 颜色
   - 联系图标颜色
   - 背景色

10. **浮动按钮** (`components/FloatButtons`)
    - 回到顶部按钮颜色

11. **统计数据** (`components/Stats`)
    - 背景渐变

## 注意事项

- 始终使用 CSS 变量而不是硬编码颜色值
- 保持品牌色调的一致性
- 确保文字与背景有足够的对比度
- 在深色背景上使用浅色文字，反之亦然
