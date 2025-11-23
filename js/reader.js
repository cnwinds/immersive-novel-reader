// 核心阅读逻辑
class Reader {
    constructor() {
        this.chapterManager = window.chapterManager;
        this.utils = window.utils;
        this.settings = this.utils.loadSettings();
        this.isFullscreen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        // 双击检测相关
        this.lastTapTime = 0;
        this.lastTapY = 0;
        this.doubleTapHandler = null;
        
        // 异步初始化
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.applySettings();
        // 等待章节管理器初始化完成
        if (this.chapterManager && this.chapterManager.initPromise) {
            try {
                await this.chapterManager.initPromise;
            } catch (error) {
                console.error('等待章节管理器初始化失败:', error);
            }
        }
        // 确保章节已加载
        if (this.chapterManager && this.chapterManager.chapters.length > 0) {
            await this.loadInitialChapter();
        } else {
            console.warn('没有找到章节，显示错误信息');
            const content = document.getElementById('chapterContent');
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'none';
            if (content) {
                content.innerHTML = `
                    <div style="color: var(--text-secondary); text-align: center; padding: 40px;">
                        <p style="font-size: 18px; margin-bottom: 10px;">⚠️ 未找到章节</p>
                        <p style="font-size: 14px; color: var(--text-muted);">
                            请确保章节文件存在，或检查网络连接。
                        </p>
                    </div>`;
                content.style.display = 'block';
            }
        }
    }

    setupEventListeners() {
        // 菜单切换
        document.getElementById('menuToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        document.getElementById('sidebarClose').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // 搜索
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.toggleSearch();
        });

        document.getElementById('searchClose').addEventListener('click', () => {
            this.toggleSearch();
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }

        // 设置
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.toggleSettings();
        });

        document.getElementById('settingsClose').addEventListener('click', () => {
            this.toggleSettings();
        });

        // 导航按钮
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.chapterManager.prev();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.chapterManager.next();
        });

        // 设置滑块
        const fontSize = document.getElementById('fontSize');
        const lineHeight = document.getElementById('lineHeight');
        const letterSpacing = document.getElementById('letterSpacing');

        if (fontSize) {
            fontSize.value = this.settings.fontSize;
            fontSize.addEventListener('input', (e) => {
                this.updateFontSize(e.target.value);
            });
        }

        if (lineHeight) {
            lineHeight.value = this.settings.lineHeight;
            lineHeight.addEventListener('input', (e) => {
                this.updateLineHeight(e.target.value);
            });
        }

        if (letterSpacing) {
            letterSpacing.value = this.settings.letterSpacing;
            letterSpacing.addEventListener('input', (e) => {
                this.updateLetterSpacing(e.target.value);
            });
        }

        // 字体选择
        const fontFamily = document.getElementById('fontFamily');
        if (fontFamily) {
            fontFamily.value = this.settings.fontFamily || 'noto-serif';
            fontFamily.addEventListener('change', (e) => {
                this.updateFontFamily(e.target.value);
            });
        }

        // 主题切换
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.switchTheme(theme);
            });
        });

        // 全屏
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // 滚动监听（更新进度和标题）
        // 监听整个页面的滚动事件
        window.addEventListener('scroll', this.utils.throttle(() => {
            this.updateScrollProgress();
            this.updateHeaderTitle();
        }, 100));
        
        // 也监听 readerContent 的滚动（如果它有自己的滚动）
        const readerContent = document.getElementById('readerContent');
        if (readerContent) {
            readerContent.addEventListener('scroll', this.utils.throttle(() => {
                this.updateScrollProgress();
                this.updateHeaderTitle();
            }, 100));
        }

        // 触摸手势（移动端）
        this.setupTouchGestures();

        // 点击遮罩关闭侧边栏/设置面板
        document.getElementById('overlay').addEventListener('click', () => {
            this.closeAllPanels();
        });
    }

    setupTouchGestures() {
        const readerContent = document.getElementById('readerContent');
        if (!readerContent) return;

        readerContent.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        readerContent.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const horizontalDiff = this.touchStartX - this.touchEndX;
        const verticalDiff = this.touchStartY - this.touchEndY;
        
        // 水平滑动的最小阈值（增加以避免误触）
        const horizontalThreshold = 80;
        // 垂直滑动阈值（如果垂直滑动超过这个值，认为是滚动而不是切换章节）
        const verticalThreshold = 30;
        
        // 计算滑动的水平距离和垂直距离
        const horizontalDistance = Math.abs(horizontalDiff);
        const verticalDistance = Math.abs(verticalDiff);
        
        // 只有当水平滑动距离足够大，且垂直滑动距离较小（或水平滑动明显大于垂直滑动）时才切换章节
        // 这样可以避免在上下滚动时误触章节切换
        if (horizontalDistance > horizontalThreshold) {
            // 如果垂直滑动距离小于阈值，或者水平滑动明显大于垂直滑动（2倍以上），才认为是切换章节
            if (verticalDistance < verticalThreshold || horizontalDistance > verticalDistance * 2) {
                if (horizontalDiff > 0) {
                    // 向左滑动 - 下一章
                    this.chapterManager.next();
                } else {
                    // 向右滑动 - 上一章
                    this.chapterManager.prev();
                }
            }
        }
    }

    handleKeyboard(e) {
        // ESC 退出全屏/关闭面板
        if (e.key === 'Escape') {
            if (this.isFullscreen) {
                this.toggleFullscreen();
            } else {
                this.closeAllPanels();
            }
            return;
        }

        // 全屏模式下不响应其他快捷键
        if (this.isFullscreen) return;

        // 左右方向键切换章节（优先于其他操作）
        // 只有在输入框、文本区域等元素没有焦点时才响应
        const activeElement = document.activeElement;
        const isInputFocused = activeElement && (
            activeElement.tagName === 'INPUT' || 
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        );

        if (!isInputFocused) {
            if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                this.chapterManager.prev();
                return;
            } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                this.chapterManager.next();
                return;
            }
        }

        // Ctrl/Cmd + F 搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            this.toggleSearch();
        }

        // Ctrl/Cmd + B 章节列表
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            this.toggleSidebar();
        }
    }

    async loadInitialChapter() {
        const progress = this.utils.loadProgress();
        if (progress) {
            this.chapterManager.currentIndex = progress.chapterIndex;
            // 更新章节列表的选中状态
            this.chapterManager.renderChapterList();
        }
        
        const currentChapter = this.chapterManager.getCurrentChapter();
        if (currentChapter) {
            await this.loadChapter(currentChapter.file);
            
            // 恢复滚动位置
            if (progress && progress.scrollPosition) {
                setTimeout(() => {
                    const readerContent = document.getElementById('readerContent');
                    if (readerContent) {
                        readerContent.scrollTop = progress.scrollPosition;
                    }
                }, 100);
            }
        } else {
            // 如果没有保存的进度，加载第一个章节
            if (this.chapterManager.chapters.length > 0) {
                this.chapterManager.currentIndex = 0;
                this.chapterManager.renderChapterList();
                await this.loadChapter(this.chapterManager.chapters[0].file);
            }
        }
    }

    /**
     * 格式化章节标题，只保留标题（去掉"第X章"）
     * @param {string} html - 解析后的HTML
     * @param {string} filename - 文件名
     * @returns {string} - 格式化后的HTML
     */
    formatChapterTitle(html, filename) {
        // 创建临时DOM元素来操作HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // 查找h1标签
        const h1 = tempDiv.querySelector('h1');
        if (!h1) return html;
        
        const originalTitle = h1.textContent.trim();
        
        // 匹配 "Episode-XX：标题" 或 "Episode-XX: 标题" 格式
        const episodeMatch = originalTitle.match(/^Episode-(\d+)[：:]\s*(.+)$/);
        if (episodeMatch) {
            const title = episodeMatch[2].trim();
            
            // 只显示标题，去掉"第X章"
            h1.innerHTML = `<span class="chapter-title-text">${title}</span>`;
        }
        
        return tempDiv.innerHTML;
    }

    /**
     * 过滤markdown内容，移除不需要显示的部分
     * @param {string} markdown - 原始markdown文本
     * @returns {string} - 过滤后的markdown文本
     */
    filterMarkdown(markdown) {
        let filtered = markdown;
        
        // 移除剧情概要、字数、结构信息行
        // 使用多行模式，匹配行首或行尾的换行符
        filtered = filtered.replace(/^\*\*剧情概要\*\*[：:].+$/gm, '');
        filtered = filtered.replace(/^\*\*字数\*\*[：:]\s*\d+字\s*$/gm, '');
        filtered = filtered.replace(/^\*\*结构\*\*[：:].+$/gm, '');
        
        // 移除结构标记行（## 【起/承/转/钩】（数字字））
        filtered = filtered.replace(/^##\s*【[起承转钩]】\s*（\d+字）\s*$/gm, '');
        
        // 清理可能出现的连续空行
        filtered = filtered.replace(/\n{3,}/g, '\n\n');
        
        // 查找所有需要移除的章节标题位置
        const sectionsToRemove = [
            '## 写作自检清单',
            '## 禁忌检查',
            '## 与后续集数关联',
            '## 与前后集数关联',
            '## 与大纲契合度'
        ];
        
        // 找到最早出现的需要移除的章节位置
        let earliestIndex = -1;
        for (const section of sectionsToRemove) {
            const index = filtered.indexOf(section);
            if (index !== -1) {
                if (earliestIndex === -1 || index < earliestIndex) {
                    earliestIndex = index;
                }
            }
        }
        
        // 如果找到了需要移除的部分，截断到该位置
        if (earliestIndex !== -1) {
            filtered = filtered.substring(0, earliestIndex).trim();
        }
        
        return filtered;
    }

    async loadChapter(filename) {
        const loading = document.getElementById('loading');
        const content = document.getElementById('chapterContent');
        
        if (loading) loading.style.display = 'block';
        if (content) content.style.display = 'none';

        try {
            // 检查 marked.js 是否加载
            if (typeof marked === 'undefined') {
                throw new Error('Marked.js 未加载，请检查网络连接');
            }

            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(`加载失败: ${response.status} ${response.statusText}`);
            }

            let markdown = await response.text();
            
            // 过滤不需要显示的内容
            markdown = this.filterMarkdown(markdown);
            
            // 使用 marked.parse 或 marked（兼容不同版本）
            let html = typeof marked.parse === 'function' 
                ? marked.parse(markdown) 
                : marked(markdown);
            
            // 处理标题格式：将 "Episode-01：倒计时90天" 转换为 "第一章 倒计时90天"
            html = this.formatChapterTitle(html, filename);
            
            if (content) {
                content.innerHTML = html;
                content.style.display = 'block';
            }
            
            // 更新底部导航栏的章节进度条
            this.updateChapterProgress();

            // 更新导航按钮状态
            this.updateNavButtons();
            
            // 重置标题（章节加载后，标题在视口中，显示默认标题）
            const bookTitle = document.querySelector('.book-title');
            if (bookTitle) {
                bookTitle.textContent = '末世黎明';
            }
            document.title = '末世黎明 - 沉浸式阅读器';
            
            // 更新章节列表的选中状态（确保同步）
            if (this.chapterManager) {
                // 根据文件名找到对应的章节索引
                const chapterIndex = this.chapterManager.chapters.findIndex(ch => ch.file === filename);
                if (chapterIndex !== -1 && chapterIndex !== this.chapterManager.currentIndex) {
                    this.chapterManager.currentIndex = chapterIndex;
                    this.chapterManager.renderChapterList();
                }
            }

            // 重置滚动位置
            const readerContent = document.getElementById('readerContent');
            if (readerContent) {
                readerContent.scrollTop = 0;
            }
            
            // 初始化进度和标题（等待内容渲染完成）
            setTimeout(() => {
                this.updateScrollProgress();
                this.updateHeaderTitle();
                this.updateChapterProgress();
            }, 200);

        } catch (error) {
            console.error('Error loading chapter:', error);
            if (content) {
                const errorMsg = error.message || '加载失败，请检查文件是否存在。';
                content.innerHTML = `
                    <div style="color: var(--text-secondary); text-align: center; padding: 40px;">
                        <p style="font-size: 18px; margin-bottom: 10px;">⚠️ 加载失败</p>
                        <p style="font-size: 14px; color: var(--text-muted);">${errorMsg}</p>
                        <p style="font-size: 12px; color: var(--text-muted); margin-top: 20px;">
                            请确保：<br>
                            1. 文件路径正确<br>
                            2. 使用本地服务器运行（不能直接打开HTML文件）<br>
                            3. 网络连接正常（marked.js需要从CDN加载）
                        </p>
                    </div>`;
                content.style.display = 'block';
            }
        } finally {
            if (loading) loading.style.display = 'none';
        }
    }

    updateNavButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = !this.chapterManager.hasPrev();
        }

        if (nextBtn) {
            nextBtn.disabled = !this.chapterManager.hasNext();
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('chapterSidebar');
        const overlay = document.getElementById('overlay');
        
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    toggleSearch() {
        const searchPanel = document.getElementById('searchPanel');
        const overlay = document.getElementById('overlay');
        
        searchPanel.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (searchPanel.classList.contains('active')) {
            document.getElementById('searchInput').focus();
        }
    }

    toggleSettings() {
        const settingsPanel = document.getElementById('settingsPanel');
        const overlay = document.getElementById('overlay');
        
        settingsPanel.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    closeAllPanels() {
        document.getElementById('chapterSidebar').classList.remove('active');
        document.getElementById('settingsPanel').classList.remove('active');
        document.getElementById('searchPanel').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    }

    handleSearch(query) {
        const results = this.utils.search(query);
        const resultsContainer = document.getElementById('searchResults');
        
        if (!resultsContainer) return;

        if (!query || query.trim().length === 0) {
            resultsContainer.innerHTML = '';
            return;
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">未找到匹配结果</div>';
            return;
        }

        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result-item" data-chapter="${result.chapterIndex}">
                <div style="font-weight: 500; margin-bottom: 4px;">${result.chapter.title}</div>
                <div style="font-size: 14px; color: var(--text-secondary);">${result.highlighted}</div>
            </div>
        `).join('');

        // 点击搜索结果跳转
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const chapterIndex = parseInt(item.dataset.chapter);
                this.chapterManager.loadChapter(chapterIndex);
                this.closeAllPanels();
            });
        });
    }

    updateFontSize(value) {
        const fontSize = parseInt(value);
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
        document.getElementById('fontSizeValue').textContent = `${fontSize}px`;
        this.settings.fontSize = fontSize;
        this.utils.saveSettings(this.settings);
    }

    updateLineHeight(value) {
        const lineHeight = parseFloat(value);
        document.documentElement.style.setProperty('--line-height', lineHeight);
        document.getElementById('lineHeightValue').textContent = lineHeight.toFixed(1);
        this.settings.lineHeight = lineHeight;
        this.utils.saveSettings(this.settings);
    }

    updateLetterSpacing(value) {
        const letterSpacing = parseFloat(value);
        document.documentElement.style.setProperty('--letter-spacing', `${letterSpacing}px`);
        document.getElementById('letterSpacingValue').textContent = `${letterSpacing}px`;
        this.settings.letterSpacing = letterSpacing;
        this.utils.saveSettings(this.settings);
    }

    updateFontFamily(fontFamily) {
        const fontMap = {
            'noto-serif': "'Noto Serif SC', serif",
            'lxgw-wenkai': "'LXGW WenKai', serif",
            'noto-sans': "'Noto Sans SC', sans-serif",
            'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        };
        
        const fontFamilyValue = fontMap[fontFamily] || fontMap['noto-serif'];
        document.documentElement.style.setProperty('--font-family', fontFamilyValue);
        
        // 应用到章节内容
        const chapterContent = document.getElementById('chapterContent');
        if (chapterContent) {
            chapterContent.style.fontFamily = fontFamilyValue;
        }
        
        this.settings.fontFamily = fontFamily;
        this.utils.saveSettings(this.settings);
    }

    switchTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // 更新主题按钮状态
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        this.settings.theme = theme;
        this.utils.saveSettings(this.settings);
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        document.body.classList.toggle('fullscreen', this.isFullscreen);
        
        // 切换全屏时，确保关闭所有面板和遮罩层
        if (this.isFullscreen) {
            this.closeAllPanels();
            this.setupFullscreenExit();
        } else {
            this.removeFullscreenExit();
        }
    }

    /**
     * 设置全屏模式的退出方式（移动端友好）
     */
    setupFullscreenExit() {
        // 创建顶部退出区域（点击顶部退出全屏）
        const topExitZone = document.createElement('div');
        topExitZone.className = 'fullscreen-exit-zone';
        topExitZone.innerHTML = '<span class="exit-hint">点击退出全屏</span>';
        topExitZone.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFullscreen();
        });
        document.body.appendChild(topExitZone);
        this.fullscreenExitZone = topExitZone;

        // 双击屏幕退出全屏（优化检测逻辑）
        const readerContent = document.getElementById('readerContent');
        if (readerContent && !this.doubleTapHandler) {
            // 重置双击检测状态
            this.lastTapTime = 0;
            this.lastTapY = 0;
            
            // 创建双击检测处理函数
            this.doubleTapHandler = (e) => {
                const currentTime = Date.now();
                const timeDiff = currentTime - this.lastTapTime;
                const tapY = e.changedTouches[0].clientY;
                const tapYDiff = Math.abs(tapY - this.lastTapY);
                
                // 优化双击检测条件：
                // 1. 时间窗口：500ms内（更宽松）
                // 2. 位置差异：100px内（更宽松，适应不同手指大小）
                // 3. 触发区域：整个屏幕（移除中央区域限制）
                if (timeDiff > 0 && timeDiff < 500 && tapYDiff < 100) {
                    // 阻止默认行为和事件冒泡
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 退出全屏
                    this.toggleFullscreen();
                    
                    // 重置状态，避免连续触发
                    this.lastTapTime = 0;
                    this.lastTapY = 0;
                    return;
                }
                
                // 更新最后点击时间和位置
                this.lastTapTime = currentTime;
                this.lastTapY = tapY;
            };
            
            // 添加事件监听器（使用 passive: false 以便 preventDefault）
            readerContent.addEventListener('touchend', this.doubleTapHandler, { passive: false });
        }
    }

    /**
     * 移除全屏退出元素
     */
    removeFullscreenExit() {
        // 移除顶部退出区域
        if (this.fullscreenExitZone) {
            this.fullscreenExitZone.remove();
            this.fullscreenExitZone = null;
        }
        
        // 移除双击事件监听器
        const readerContent = document.getElementById('readerContent');
        if (readerContent && this.doubleTapHandler) {
            readerContent.removeEventListener('touchend', this.doubleTapHandler);
            this.doubleTapHandler = null;
        }
        
        // 重置双击检测状态
        this.lastTapTime = 0;
        this.lastTapY = 0;
    }

    applySettings() {
        // 应用保存的设置
        this.updateFontSize(this.settings.fontSize);
        this.updateLineHeight(this.settings.lineHeight);
        this.updateLetterSpacing(this.settings.letterSpacing);
        if (this.settings.fontFamily) {
            this.updateFontFamily(this.settings.fontFamily);
        }
        this.switchTheme(this.settings.theme);
    }

    updateScrollProgress() {
        // 优先使用 readerContent 的滚动（如果有自己的滚动容器）
        let scrollTop, scrollHeight, clientHeight;
        const readerContent = document.getElementById('readerContent');
        const chapterContent = document.getElementById('chapterContent');
        
        if (readerContent && readerContent.scrollHeight > readerContent.clientHeight) {
            // readerContent 有自己的滚动
            scrollTop = readerContent.scrollTop;
            scrollHeight = readerContent.scrollHeight;
            clientHeight = readerContent.clientHeight;
        } else {
            // 使用整个页面的滚动
            scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            scrollHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        }

        // 计算进度（避免除零）
        if (scrollHeight > clientHeight) {
            this.utils.updateProgress(scrollTop, scrollHeight, clientHeight);
            
            // 保存进度
            this.utils.saveProgress(
                this.chapterManager.currentIndex,
                scrollTop
            );
        }
    }

    /**
     * 更新标题栏：当章节标题移出屏幕时，在标题栏显示章节信息
     */
    /**
     * 更新顶部导航栏的章节进度条（显示整体进度，无数字）
     */
    updateChapterProgress() {
        // 获取章节信息
        if (!this.chapterManager || !this.chapterManager.chapters.length) {
            return;
        }
        
        const totalChapters = this.chapterManager.chapters.length;
        const currentChapter = this.chapterManager.currentIndex + 1; // 从1开始计数
        const progress = (currentChapter / totalChapters) * 100;
        
        // 更新顶部导航栏的章节进度条
        const headerProgressFill = document.getElementById('headerProgressFill');
        
        if (headerProgressFill) {
            headerProgressFill.style.width = `${progress}%`;
        }
    }

    updateHeaderTitle() {
        const chapterContent = document.getElementById('chapterContent');
        if (!chapterContent) return;

        const h1 = chapterContent.querySelector('h1');
        if (!h1) return;

        const bookTitle = document.querySelector('.book-title');
        if (!bookTitle) return;

        // 获取章节标题的位置信息
        const h1Rect = h1.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // 判断章节标题是否在视口中（考虑顶部导航栏的高度60px）
        const isTitleVisible = h1Rect.top >= 60 && h1Rect.bottom <= viewportHeight;

        // 如果标题不在视口中，显示章节信息
        if (!isTitleVisible && h1Rect.top < 60) {
            // 标题已经滚动出屏幕上方
            const chapterTitleText = h1.querySelector('.chapter-title-text');
            
            if (chapterTitleText) {
                const titleText = chapterTitleText.textContent.trim();
                bookTitle.textContent = `末世黎明 - ${titleText}`;
                // 同时更新页面标题
                document.title = `${titleText} - 末世黎明`;
            } else {
                // 如果没有格式化标题，尝试从文本中提取
                const titleText = h1.textContent.trim();
                if (titleText) {
                    bookTitle.textContent = `末世黎明 - ${titleText}`;
                    document.title = `${titleText} - 末世黎明`;
                }
            }
        } else {
            // 标题在视口中，恢复默认标题
            bookTitle.textContent = '末世黎明';
            document.title = '末世黎明 - 沉浸式阅读器';
        }
    }
}

// 初始化阅读器
function initReader() {
    // 检查 marked.js 是否已加载
    if (typeof marked === 'undefined') {
        console.warn('Marked.js 未加载，等待加载...');
        // 如果 marked.js 还没加载，等待一下再试
        setTimeout(() => {
            if (typeof marked !== 'undefined') {
                window.reader = new Reader();
            } else {
                console.error('Marked.js 加载失败，请检查网络连接或使用本地文件');
                document.getElementById('chapterContent').innerHTML = `
                    <div style="color: var(--text-secondary); text-align: center; padding: 40px;">
                        <p style="font-size: 18px; margin-bottom: 10px;">⚠️ Marked.js 加载失败</p>
                        <p style="font-size: 14px; color: var(--text-muted);">
                            无法加载 Markdown 解析库，请检查网络连接。
                        </p>
                    </div>`;
            }
        }, 500);
    } else {
        window.reader = new Reader();
    }
}

// 等待 DOM 和 marked.js 都加载完成
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReader);
} else {
    // DOM 已经加载完成，直接初始化
    initReader();
}

