# GitHub部署步骤

## 📋 前置准备

1. 确保已安装 Git
2. 拥有GitHub账号（如果没有，请先注册：https://github.com）

## 🚀 部署步骤

### 第一步：在GitHub创建新仓库

1. 登录 GitHub
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库信息：
   - **Repository name**: `novel-reader`（或你喜欢的名字）
   - **Description**: `末世黎明 - 沉浸式小说阅读器`
   - **Visibility**: 选择 `Public`（公开）或 `Private`（私有）
   - **不要**勾选 "Initialize this repository with a README"（我们已经有了）
4. 点击 `Create repository`

### 第二步：连接本地仓库到GitHub

在项目目录下执行以下命令（替换 `YOUR_USERNAME` 为你的GitHub用户名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/novel-reader.git

# 或者使用SSH（如果你配置了SSH密钥）
# git remote add origin git@github.com:YOUR_USERNAME/novel-reader.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

### 第三步：在Vercel部署

1. 访问 https://vercel.com
2. 点击右上角 `Sign Up`，使用GitHub账号登录
3. 登录后，点击 `Add New Project`
4. 在 "Import Git Repository" 中选择你刚创建的仓库
5. 点击 `Import`
6. Vercel会自动检测项目配置（无需修改）
7. 点击 `Deploy` 按钮
8. 等待部署完成（通常1-2分钟）
9. 部署完成后，你会得到一个网址，如：`https://novel-reader.vercel.app`

### 第四步：自定义域名（可选）

1. 在Vercel项目页面，点击 `Settings`
2. 选择 `Domains`
3. 输入你的域名（如果有）
4. 按照提示配置DNS记录

## ✅ 完成！

现在你的小说阅读器已经部署到公网了，可以分享给任何人访问！

## 🔄 更新内容

以后如果需要更新内容：

1. 修改本地文件
2. 提交更改：
   ```bash
   git add .
   git commit -m "更新内容描述"
   git push
   ```
3. Vercel会自动检测到更改并重新部署（通常1-2分钟）

## 📝 注意事项

- 首次推送可能需要输入GitHub用户名和密码（或使用Personal Access Token）
- 如果遇到权限问题，可能需要配置SSH密钥或使用Personal Access Token
- Vercel的免费版有使用限制，但对于个人项目通常足够

## 🆘 常见问题

**Q: 推送时提示需要认证？**  
A: GitHub已不再支持密码认证，需要使用Personal Access Token：
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 生成新token，勾选 `repo` 权限
3. 推送时使用token作为密码

**Q: Vercel部署失败？**  
A: 检查：
- 确保 `index.html` 在根目录
- 确保所有文件都已提交到GitHub
- 查看Vercel的部署日志了解具体错误

**Q: 如何更新章节内容？**  
A: 修改对应的 `Episode-*.md` 文件，提交并推送即可自动更新

