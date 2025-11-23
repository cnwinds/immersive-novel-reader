# Gitee Pages 开启指南

## ✅ 已完成

- ✅ 代码已推送到 Gitee 仓库：https://gitee.com/cnwinds/immersive-novel-reader
- ✅ 远程仓库已配置完成

## 🚀 开启 Gitee Pages 步骤

### 第一步：进入仓库页面
1. 访问：https://gitee.com/cnwinds/immersive-novel-reader
2. 确保你已经登录 Gitee 账号

### 第二步：开启 Gitee Pages 服务
1. 在仓库页面，点击顶部的 **"服务"** 菜单
2. 在下拉菜单中选择 **"Gitee Pages"**
3. 如果首次使用，可能需要实名认证（免费，只需几分钟）

### 第三步：配置 Pages 设置
1. 点击 **"启动"** 按钮
2. 配置选项：
   - **分支**：选择 `main`
   - **目录**：选择 `/`（根目录）
   - **部署目录**：留空（或填写 `/`）
3. 点击 **"启动"** 按钮

### 第四步：等待部署
- 通常需要 1-5 分钟
- 部署完成后，会显示绿色的 **"已启动"** 状态
- 会显示你的网站地址

### 第五步：访问网站
- 你的网站地址将是：`https://cnwinds.gitee.io/immersive-novel-reader`
- 或者：`https://cnwinds.gitee.io/immersive-novel-reader/`

## 📝 后续更新

每次你推送代码到 Gitee 后：

1. 进入仓库 → **"服务"** → **"Gitee Pages"**
2. 点击 **"更新"** 按钮
3. 等待重新部署完成（通常 1-2 分钟）

**注意**：Gitee Pages 需要手动点击"更新"，不会自动部署。

## 🔄 自动同步 GitHub 和 Gitee

如果你想同时维护两个仓库，可以设置自动同步：

### 方法一：使用 Git 命令（推荐）
```bash
# 同时推送到 GitHub 和 Gitee
git push origin main
git push gitee main
```

### 方法二：创建推送脚本
创建一个 `push-all.bat` 文件：
```bash
@echo off
git push origin main
git push gitee main
echo 已推送到 GitHub 和 Gitee
pause
```

## ✨ 自定义域名（可选）

1. 在 Gitee Pages 设置中，找到 **"自定义域名"**
2. 输入你的域名（如：`novel.yourdomain.com`）
3. 在你的域名 DNS 设置中添加 CNAME 记录：
   - **类型**：CNAME
   - **主机记录**：`novel`（或 `@`）
   - **记录值**：`cnwinds.gitee.io`

## 🆘 常见问题

**Q: 提示需要实名认证？**
A: Gitee Pages 需要实名认证才能使用，这是免费的，只需几分钟。

**Q: 部署失败怎么办？**
A: 检查：
- 确保 `index.html` 在根目录
- 确保所有文件都已提交
- 查看部署日志了解错误原因

**Q: 如何查看部署日志？**
A: 在 Gitee Pages 页面，点击 **"部署日志"** 可以查看详细日志。

**Q: 可以设置自动部署吗？**
A: Gitee Pages 免费版不支持自动部署，需要手动点击"更新"。可以考虑使用 Gitee Go（CI/CD）实现自动化。

## 📊 访问统计

Gitee Pages 提供基础的访问统计功能，可以在 Pages 设置页面查看。

---

**完成以上步骤后，你的小说阅读器就可以在国内正常访问了！** 🎉

