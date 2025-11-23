@echo off
chcp 65001 >nul
echo ========================================
echo 推送到GitHub仓库
echo ========================================
echo.

echo 请先确保：
echo 1. 已在GitHub创建仓库
echo 2. 已添加远程仓库地址
echo.

set /p REPO_URL="请输入你的GitHub仓库地址（如：https://github.com/用户名/仓库名.git）: "

if "%REPO_URL%"=="" (
    echo 错误：未输入仓库地址
    pause
    exit /b 1
)

echo.
echo 正在添加远程仓库...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo 正在推送到GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ 推送成功！
    echo ========================================
    echo.
    echo 下一步：访问 https://vercel.com 部署项目
) else (
    echo.
    echo ========================================
    echo ❌ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 仓库地址不正确
    echo 2. 需要GitHub认证（使用Personal Access Token）
    echo 3. 网络连接问题
    echo.
    echo 请手动执行：
    echo git remote add origin %REPO_URL%
    echo git push -u origin main
)

echo.
pause

