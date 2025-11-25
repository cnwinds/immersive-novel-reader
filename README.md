# 末世黎明 - 沉浸式阅读器

一个优雅的在线小说阅读器，支持章节导航、字体设置、主题切换等功能。

## ✨ 功能特性

- 📖 **沉浸式阅读体验** - 简洁优雅的界面设计
- 🎨 **主题切换** - 支持日间/夜间模式
- 🔤 **字体选择** - 多种字体可选（思源宋体、霞鹜文楷、思源黑体等）
- ⚙️ **个性化设置** - 字体大小、行距、字间距可调
- 📱 **响应式设计** - 支持桌面和移动设备
- 🔍 **全文搜索** - 快速查找章节内容
- 📊 **阅读进度** - 自动保存阅读进度
- ⌨️ **快捷键支持** - 方向键翻页，Ctrl+F搜索等

## 🚀 快速开始

### 本地运行

1. 克隆或下载项目
2. 使用本地服务器打开（不能直接打开HTML文件）

```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx http-server

# 或使用PHP
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

### 部署到Vercel

1. 将项目推送到GitHub仓库
2. 访问 [Vercel](https://vercel.com)
3. 使用GitHub账号登录
4. 点击 "Add New Project"
5. 选择你的GitHub仓库
6. 点击 "Deploy" 完成部署

详细部署指南请查看 [部署指南.md](./部署指南.md)

## 📁 项目结构

```
.
├── index.html         # 主页面
├── catalog.md         # 章节索引文件
├── css/
│   └── reader.css     # 样式文件
├── js/
│   ├── reader.js      # 阅读器核心逻辑
│   ├── chapters.js    # 章节管理
│   └── utils.js       # 工具函数
└── Episode-*.md       # 章节文件
```

## 🎯 使用说明

### 章节管理

- 章节文件命名格式：`Episode-XX_标题.md`
- 章节信息从 `catalog.md` 自动读取
- 支持自动发现所有以 `Episode-` 开头的章节文件

### 快捷键

- `←` / `→` - 上一章/下一章
- `Ctrl/Cmd + F` - 搜索
- `Ctrl/Cmd + B` - 打开章节列表
- `ESC` - 关闭面板/退出全屏

### 设置选项

- **字体大小**：14px - 24px
- **行距**：1.4 - 2.5
- **字间距**：0 - 3px
- **字体**：思源宋体、霞鹜文楷、思源黑体、系统默认
- **主题**：日间/夜间

## 📝 技术栈

- 纯原生 JavaScript（无框架依赖）
- Marked.js - Markdown解析
- CSS3 - 样式和动画
- LocalStorage - 数据持久化

## 📄 许可证

本项目仅供学习交流使用。

## 🙏 致谢

- [Marked.js](https://marked.js.org/) - Markdown解析库
- [Google Fonts](https://fonts.google.com/) - 思源字体系列
- [霞鹜文楷](https://github.com/lxgw/LxgwWenKai) - 开源中文字体

