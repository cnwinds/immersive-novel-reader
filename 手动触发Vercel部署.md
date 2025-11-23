# 手动触发 Vercel 部署

## 方法一：在 Vercel 控制台手动部署（推荐）

### 步骤：

1. **访问 Vercel 控制台**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **进入项目页面**
   - 点击你的项目：`immersive-novel-reader`
   - 或访问：https://vercel.com/dashboard

3. **查看部署历史**
   - 在项目页面，你会看到 "Deployments" 部分
   - 显示所有历史部署记录

4. **手动触发重新部署**
   - 找到最新的部署记录（通常是列表最上面的）
   - 点击右侧的 **"..."** (三个点) 菜单
   - 选择 **"Redeploy"** 或 **"重新部署"**
   - 确认后，Vercel 会使用最新的代码重新部署

## 方法二：通过 Git 触发（创建空提交）

如果方法一不行，可以通过创建一个空提交来触发自动部署：

```bash
# 创建一个空提交（不改变任何文件）
git commit --allow-empty -m "Trigger Vercel deployment"

# 推送到 GitHub
git push
```

这会触发 Vercel 的自动部署。

## 方法三：检查 Vercel 配置

如果自动部署不工作，检查以下设置：

1. **进入项目设置**
   - 在 Vercel 项目页面，点击 **"Settings"**

2. **检查 Git 集成**
   - 进入 **"Git"** 部分
   - 确认 GitHub 仓库已正确连接
   - 确认分支设置为 `main`

3. **检查部署设置**
   - 进入 **"General"** 部分
   - 确认 "Production Branch" 设置为 `main`
   - 确认 "Auto-deploy" 已启用

## 方法四：重新连接仓库

如果以上方法都不行，可以尝试重新连接：

1. 在 Vercel 项目设置中
2. 进入 **"Git"** → **"Disconnect"**
3. 然后重新 **"Connect Git Repository"**
4. 选择你的仓库并重新部署

## 常见问题

**Q: 为什么自动部署不工作？**
- 检查 GitHub 仓库是否正确连接
- 确认推送到了 `main` 分支
- 检查 Vercel 的部署日志查看错误信息

**Q: 如何查看部署状态？**
- 在 Vercel 项目页面的 "Deployments" 部分
- 点击部署记录可以查看详细日志

**Q: 部署失败怎么办？**
- 查看部署日志了解错误原因
- 检查 `vercel.json` 配置是否正确
- 确认所有文件都已提交到 GitHub

## 快速命令

如果需要快速触发部署，运行：

```bash
git commit --allow-empty -m "Trigger deployment"
git push
```

