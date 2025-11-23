# Vercel 部署指南

## 🚀 快速部署步骤

### 第一步：访问 Vercel

1. 打开浏览器，访问：**https://vercel.com**
2. 点击右上角的 **"Sign Up"** 或 **"Log In"**

### 第二步：使用 GitHub 登录

1. 选择 **"Continue with GitHub"**
2. 授权 Vercel 访问你的 GitHub 账号
3. 如果提示，选择允许访问仓库权限

### 第三步：导入项目

1. 登录后，点击 **"Add New Project"** 或 **"New Project"**
2. 在 "Import Git Repository" 列表中，找到 **`cnwinds/immersive-novel-reader`**
3. 点击 **"Import"** 按钮

### 第四步：配置项目（通常使用默认即可）

Vercel 会自动检测项目配置：
- **Framework Preset**: 选择 "Other" 或保持默认
- **Root Directory**: `./`（根目录）
- **Build Command**: 留空（静态网站无需构建）
- **Output Directory**: 留空
- **Install Command**: 留空

### 第五步：部署

1. 点击 **"Deploy"** 按钮
2. 等待部署完成（通常 1-2 分钟）
3. 部署成功后，你会看到：
   - ✅ 部署成功的提示
   - 🌐 你的网站地址（如：`https://immersive-novel-reader.vercel.app`）

### 第六步：访问网站

点击部署成功页面上的网址，或复制网址分享给其他人！

## ✨ 自动部署

以后每次你推送代码到 GitHub，Vercel 会自动重新部署！

## 🔧 自定义域名（可选）

1. 在 Vercel 项目页面，点击 **"Settings"**
2. 选择 **"Domains"**
3. 输入你的域名（如：`novel.yourdomain.com`）
4. 按照提示配置 DNS 记录

## 📊 查看部署状态

- 在 Vercel 项目页面可以看到所有部署历史
- 每次部署都有独立的 URL
- 可以回滚到之前的版本

## 🆘 常见问题

**Q: 部署失败怎么办？**
- 检查 GitHub 仓库是否正确
- 查看 Vercel 的部署日志了解错误原因
- 确保 `index.html` 在根目录

**Q: 如何更新内容？**
- 修改本地文件
- 提交并推送到 GitHub：`git push`
- Vercel 会自动重新部署

**Q: 可以设置环境变量吗？**
- 在 Settings → Environment Variables 中设置
- 本项目是静态网站，通常不需要

## ✅ 部署检查清单

- [ ] GitHub 仓库已创建并推送代码
- [ ] Vercel 账号已注册/登录
- [ ] 已授权 GitHub 访问
- [ ] 项目已导入到 Vercel
- [ ] 部署成功并可以访问

---

**提示**：如果遇到任何问题，可以查看 Vercel 的部署日志，通常会有详细的错误信息。

