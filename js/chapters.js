// 章节数据管理
class ChapterManager {
    constructor() {
        this.chapters = [];
        this.currentIndex = 0;
        this.initPromise = this.init();
    }

    /**
     * 从文件名中提取序号
     * @param {string} filename - 文件名，如 "Episode-01_倒计时90天.md"
     * @returns {number} - 序号，如 1
     */
    extractOrder(filename) {
        const match = filename.match(/Episode-(\d+)/i);
        if (match) {
            return parseInt(match[1], 10);
        }
        return 999; // 如果无法提取序号，放在最后
    }

    /**
     * 从文件内容中提取标题（第一行的 # 标题）
     * @param {string} content - 文件内容
     * @returns {string} - 标题（格式化为"第X章 标题"）
     */
    extractTitle(content) {
        if (!content || typeof content !== 'string') {
            console.warn('extractTitle: 内容为空或格式错误');
            return null; // 返回 null 而不是 '未知章节'，让调用者处理
        }
        
        const lines = content.split('\n');
        for (const line of lines) {
            // 去除可能存在的 BOM 和行尾换行
            const sanitizedLine = line.replace(/^\uFEFF/, '').trim();
            // 匹配 markdown 标题格式 # / ## / ### 标题
            const match = sanitizedLine.match(/^#{1,3}\s+(.+)$/);
            if (match) {
                const originalTitle = match[1].trim();
                console.log('extractTitle: 找到标题行:', originalTitle);
                
                // 匹配 "Episode-XX：标题" 或 "Episode-XX: 标题" 格式
                const episodeMatch = originalTitle.match(/^Episode[-\s]*(\d+)\s*[：:\-]\s*(.+)$/i);
                if (episodeMatch) {
                    const chapterNum = parseInt(episodeMatch[1], 10);
                    const title = episodeMatch[2].trim();
                    // 转换为"第X章 标题"格式
                    const formattedTitle = `第${chapterNum}章 ${title}`;
                    console.log('extractTitle: 提取到标题:', formattedTitle);
                    return formattedTitle;
                }
                // 如果没有匹配到Episode格式，直接返回原始标题
                console.log('extractTitle: 使用原始标题:', originalTitle);
                return originalTitle;
            }
        }
        console.warn('extractTitle: 未找到标题行，内容前100字符:', content.substring(0, 100));
        return null; // 返回 null 表示提取失败
    }

    /**
     * 将目录中的 Episode 标题格式化为"第X章 标题"
     * @param {string} rawTitle - 原始标题，如 "Episode 06 - 情绪点兑换物资"
     * @param {number} order - 章节序号
     * @returns {string} - 格式化后的标题
     */
    formatCatalogTitle(rawTitle, order) {
        if (!rawTitle) return '未知章节';

        // 如果原始标题已经包含"第X章"，直接返回
        if (rawTitle.includes('第') && rawTitle.includes('章')) {
            return rawTitle;
        }

        // 匹配 Episode 06 - 标题 / Episode-06：标题 等格式
        const episodeMatch = rawTitle.match(/Episode[-\s]*(\d+)\s*[-：:]\s*(.+)/i);
        if (episodeMatch) {
            const chapterNum = parseInt(episodeMatch[1], 10) || order || '';
            const titleText = episodeMatch[2].trim();
            return chapterNum ? `第${chapterNum}章 ${titleText}` : titleText;
        }

        // 如果没有匹配到 Episode 格式但有序号，补全"第X章"
        if (order) {
            return `第${order}章 ${rawTitle}`;
        }

        return rawTitle;
    }

    /**
     * 尝试加载文件并获取信息
     * @param {string} filename - 文件名
     * @param {string} summary - 一句话剧情（可选）
     * @returns {Promise<Object|null>} - 章节信息或null（如果文件不存在）
     */
    async tryLoadChapter(filename, summary = '', fallbackTitle = '', orderHint) {
        try {
            // 如果文件名不包含路径，则从 episodes 文件夹读取
            const filepath = filename.includes('/') ? filename : `episodes/${filename}`;
            console.log(`tryLoadChapter: 尝试加载文件: ${filepath}`);
            const response = await fetch(filepath);
            if (!response.ok) {
                console.warn(`tryLoadChapter: 文件加载失败 ${filepath}, 状态码: ${response.status}`);
                return null;
            }
            const content = await response.text();
            if (!content || content.trim().length === 0) {
                console.warn(`tryLoadChapter: 文件内容为空: ${filepath}`);
                return null;
            }
            const order = this.extractOrder(filename);
            let title = this.extractTitle(content);
            if (title === '未知章节' && fallbackTitle) {
                title = this.formatCatalogTitle(fallbackTitle, order || orderHint);
            }
            
            // 如果标题提取失败，使用默认格式
            const finalTitle = title || `第${order}章`;
            
            console.log(`tryLoadChapter: 成功加载章节 ${filepath}, 标题: ${finalTitle}, 序号: ${order}`);
            
            return {
                file: filepath,
                title: finalTitle,
                order: order,
                summary: summary
            };
        } catch (error) {
            console.error(`tryLoadChapter: 加载文件时出错 ${filename}:`, error);
            return null;
        }
    }

    /**
     * 从章节索引文件中提取章节信息（包括文件名和一句话剧情）
     * @returns {Promise<Array<Object>>} - 章节信息列表，包含 {order, filename, summary}
     */
    async extractChapterInfoFromIndex() {
        try {
            const indexResponse = await fetch('catalog.md');
            if (!indexResponse.ok) {
                return [];
            }
            const indexContent = await indexResponse.text();
            
            const chapterInfos = [];
            
            // 按行分割内容
            const lines = indexContent.split('\n');
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // 匹配 Episode-数字：标题 格式的行
                const episodeMatch = line.match(/###\s+Episode[-\s]*(\d+)\s*[-：:]\s*(.+)/i);
                if (episodeMatch) {
                    const num = episodeMatch[1];
                    const title = episodeMatch[2].trim();
                    const numStr = num.padStart(2, '0');
                    const order = parseInt(num, 10);
                    
                    // 查找下一行的"一句话剧情"
                    let summary = '';
                    for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
                        const nextLine = lines[j];
                        const summaryMatch = nextLine.match(/\*\*\s*(一句话剧情|一句话简介)\s*\*\*[：:](.+)/);
                        if (summaryMatch) {
                            summary = summaryMatch[2].trim();
                            break;
                        }
                        // 如果遇到下一个Episode，停止搜索
                        if (nextLine.match(/###\s+Episode-/)) {
                            break;
                        }
                    }
                    
                    // 构建基础文件名候选（仅按章节号）
                    const baseFilenames = [
                        `Episode-${numStr}.md`
                    ];
                    
                    // 同时支持 episodes/ 子目录存放的情况
                    const expandedFilenames = baseFilenames.map(name => {
                        // 如果已经显式包含路径，则保持不变
                        if (name.includes('/')) {
                            return name;
                        }
                        // 默认只从 episodes/ 目录读取
                        return `episodes/${name}`;
                    });
                    
                    // 去重
                    const filenames = expandedFilenames.filter((v, i, a) => a.indexOf(v) === i);
                    
                    chapterInfos.push({
                        order: order,
                        filenames: filenames,
                        title: title,
                        summary: summary
                    });
                }
            }
            
            return chapterInfos;
        } catch (error) {
            console.warn('无法读取章节索引文件:', error);
        }
        return [];
    }

    /**
     * 自动发现所有Episode开头的章节文件
     * @returns {Promise<Array>} - 章节列表
     */
    async discoverChapters() {
        const chapters = [];
        
        // 首先尝试从 catalog.md 中提取章节信息（包括文件名和一句话剧情）
        const chapterInfos = await this.extractChapterInfoFromIndex();
        
        if (chapterInfos.length > 0) {
            console.log(`从索引文件中找到 ${chapterInfos.length} 个章节信息`);
            // 如果从索引文件中找到了章节信息，尝试加载每个文件
            const chapterPromises = chapterInfos.map(async (info) => {
                // 尝试每个可能的文件名
                for (const filename of info.filenames) {
                    try {
                        const chapter = await this.tryLoadChapter(filename, info.summary, info.title, info.order);
                        if (chapter) {
                            console.log(`成功加载章节: ${filename}`);
                            return chapter;
                        }
                    } catch (error) {
                        // 继续尝试下一个文件名
                        continue;
                    }
                }
                console.warn(`无法加载章节 ${info.order}: ${info.filenames.join(', ')}`);
                return null;
            });
            
            const results = await Promise.all(chapterPromises);
            
            // 过滤掉null值（文件不存在的情况）
            const foundChapters = results.filter(chapter => chapter !== null);
            
            console.log(`成功加载 ${foundChapters.length} 个章节文件`);
            
            // 按序号排序
            foundChapters.sort((a, b) => a.order - b.order);
            
            return foundChapters;
        } else {
            console.warn('未从索引文件中找到章节信息');
        }
        
        // 如果索引文件不存在或为空，尝试直接扫描目录中的文件
        // 由于浏览器无法直接列出目录，我们尝试加载 Episode-01 到 Episode-99
        // 但需要知道完整文件名，所以这个方法有限制
        
        // 尝试加载一个合理范围的文件（Episode-01 到 Episode-99）
        const chapterPromises = [];
        for (let i = 1; i <= 99; i++) {
            const numStr = i.toString().padStart(2, '0');
            // 尝试常见的文件名模式
            // 首先尝试简单格式 Episode-XX.md
            chapterPromises.push(
                this.tryLoadChapter(`Episode-${numStr}.md`).catch(() => null)
            );
        }
        
        const results = await Promise.all(chapterPromises);
        const foundChapters = results.filter(chapter => chapter !== null);
        foundChapters.sort((a, b) => a.order - b.order);
        
        return foundChapters;
    }

    async init() {
        // 自动发现所有Episode开头的章节文件
        try {
            const discoveredChapters = await this.discoverChapters();
            
            if (discoveredChapters.length > 0) {
                this.chapters = discoveredChapters;
                console.log(`成功加载 ${discoveredChapters.length} 个章节`);
            } else {
                console.warn('未找到任何章节文件');
                this.chapters = [];
            }
        } catch (error) {
            console.error('章节发现失败:', error);
            this.chapters = [];
        }
        
        // 加载保存的阅读进度
        const savedIndex = localStorage.getItem('currentChapterIndex');
        if (savedIndex !== null) {
            const index = parseInt(savedIndex);
            if (index >= 0 && index < this.chapters.length) {
                this.currentIndex = index;
        }
        }
        
        // 渲染章节列表（在设置 currentIndex 之后）
        this.renderChapterList();
    }

    renderChapterList() {
        const chapterList = document.getElementById('chapterList');
        if (!chapterList) return;

        chapterList.innerHTML = '';
        
        this.chapters.forEach((chapter, index) => {
            const item = document.createElement('div');
            item.className = 'chapter-item';
            if (index === this.currentIndex) {
                item.classList.add('active');
            }
            
            // 如果有"一句话剧情"，显示它；否则只显示标题和章节号
            const summaryHtml = chapter.summary 
                ? `<div class="chapter-summary">${chapter.summary}</div>` 
                : '';
            
            // 处理标题显示
            let titleText = chapter.title;
            let metaText = '';
            
            // 如果标题已经包含"第X章"，直接使用，不添加额外的章节号
            if (titleText && titleText.includes('第') && titleText.includes('章')) {
                metaText = '';
            } else {
                // 如果标题不包含章节号，添加章节号作为元信息
                // 但主要显示标题文本
                if (titleText && titleText.trim()) {
                    metaText = `<div class="chapter-meta">第${chapter.order}章</div>`;
                } else {
                    // 如果标题为空，至少显示章节号
                    titleText = `第${chapter.order}章`;
                    metaText = '';
                }
            }
            
            item.innerHTML = `
                <div class="chapter-title">${titleText}</div>
                ${metaText}
                ${summaryHtml}
            `;
            
            item.addEventListener('click', () => {
                this.loadChapter(index);
            });
            
            chapterList.appendChild(item);
        });
    }

    async loadChapter(index) {
        if (index < 0 || index >= this.chapters.length) return;
        
        this.currentIndex = index;
        // 立即更新章节列表的选中状态
        this.renderChapterList();
        
        const chapter = this.chapters[index];
        const reader = window.reader;
        if (reader) {
            await reader.loadChapter(chapter.file);
            // 更新章节进度条
            reader.updateChapterProgress();
        }
        
        // 保存当前章节索引
        localStorage.setItem('currentChapterIndex', index.toString());
        
        // 关闭章节列表侧边栏
        const sidebar = document.getElementById('chapterSidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    }

    getCurrentChapter() {
        return this.chapters[this.currentIndex];
    }

    hasNext() {
        return this.currentIndex < this.chapters.length - 1;
    }

    hasPrev() {
        return this.currentIndex > 0;
    }

    next() {
        if (this.hasNext()) {
            this.loadChapter(this.currentIndex + 1);
        }
    }

    prev() {
        if (this.hasPrev()) {
            this.loadChapter(this.currentIndex - 1);
        }
    }

    getChapterByIndex(index) {
        return this.chapters[index];
    }

    getAllChapters() {
        return this.chapters;
    }
}

// 创建全局章节管理器实例
window.chapterManager = new ChapterManager();

// 确保章节管理器在 Reader 初始化前可用
if (window.chapterManager) {
    console.log('章节管理器已创建，正在初始化...');
}
