# VisionDOM

基于 OpenCV 的可视化 DOM 分析工具

## 项目简介

基于 OpenCV 的可视化 DOM 分析工具 允许开发者实时检测、高亮和分析网页中的 DOM 元素。通过将 OpenCV.js 的计算机视觉能力与现代前端框架结合，本工具提供了比传统 DOM 检查器更丰富的可视化分析功能。

## 主要特性

- 🔍 **实时元素检测**：鼠标悬停即可精确识别并高亮 DOM 元素
- 📊 **详细元素信息**：直观显示元素的标签、ID、类名、尺寸和属性等信息
- 📸 **元素截图**：一键捕获元素截图，并应用 OpenCV 图像处理效果
- 🔄 **图像处理**：使用 OpenCV.js 进行高斯模糊等图像增强处理
- 🎨 **自定义高亮样式**：可配置的边框颜色、背景色等视觉反馈
- 💾 **自动导出**：支持自动下载处理后的元素截图

## 技术栈

- **Vue 3**：采用 Composition API 的现代化前端框架
- **TypeScript**：提供类型安全的 JavaScript 开发体验
- **OpenCV-TS**：OpenCV 的 TypeScript 绑定库
- **Vite**：快速的前端构建工具
- **html2canvas**：高质量的网页元素截图工具

## 安装与使用

### 安装依赖

```bash
pnpm install
```

### 开发环境启动

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 使用指南

1. 启动应用后，点击"启用悬停检测"按钮激活检测功能
2. 将鼠标移动到想要检查的元素上，系统会自动识别并高亮显示
3. 元素信息面板会显示当前元素的详细信息
4. 可选择开启"自动下载"功能，在悬停一段时间后自动捕获并下载元素截图
5. 使用控制面板上的按钮切换不同功能选项

## 配置选项

DOM Inspector Plus 提供多种自定义选项，可通过编辑 `autoHoverDetection.ts` 中的 `options` 对象进行配置：

- `captureOnHover`：是否在悬停时捕获截图
- `autoDownload`：是否自动下载捕获的截图
- `captureDelay`：捕获截图前的延迟时间（毫秒）
- `borderColor`：高亮边框颜色和宽度
- `backgroundColor`：高亮背景颜色
- `excludeSelectors`：需要排除的元素选择器
- `showInfoPanel`：是否显示元素信息面板

## 应用场景

- 前端开发调试
- UI/UX 设计分析
- 网页内容抓取与分析
- 教学演示网页结构
- 自动化测试辅助工具

## 贡献指南

欢迎提交 Pull Request 或创建 Issue 来改进本项目。请确保遵循项目的代码风格和提交规范。

## 许可证

MIT
