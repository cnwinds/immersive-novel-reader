// 工具函数
class Utils {
    constructor() {
        this.searchIndex = [];
        this.initSearchIndex();
    }

    // 初始化搜索索引
    async initSearchIndex() {
        const chapters = window.chapterManager.getAllChapters();
        for (let i = 0; i < chapters.length; i++) {
            try {
                const response = await fetch(chapters[i].file);
                const text = await response.text();
                this.searchIndex.push({
                    chapterIndex: i,
                    chapter: chapters[i],
                    content: text
                });
            } catch (error) {
                console.error(`Failed to index chapter ${i}:`, error);
            }
        }
    }

    // 搜索功能
    search(query) {
        if (!query || query.trim().length === 0) {
            return [];
        }

        const results = [];
        const lowerQuery = query.toLowerCase();

        this.searchIndex.forEach(item => {
            const lines = item.content.split('\n');
            lines.forEach((line, lineIndex) => {
                if (line.toLowerCase().includes(lowerQuery)) {
                    // 高亮匹配文本
                    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
                    const highlighted = line.replace(regex, '<span class="highlight">$1</span>');
                    
                    results.push({
                        chapterIndex: item.chapterIndex,
                        chapter: item.chapter,
                        line: line.trim(),
                        highlighted: highlighted.trim(),
                        lineNumber: lineIndex + 1
                    });
                }
            });
        });

        return results.slice(0, 50); // 限制结果数量
    }

    // 转义正则表达式特殊字符
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 保存阅读进度
    saveProgress(chapterIndex, scrollPosition) {
        const progress = {
            chapterIndex,
            scrollPosition,
            timestamp: Date.now()
        };
        localStorage.setItem('readingProgress', JSON.stringify(progress));
    }

    // 加载阅读进度
    loadProgress() {
        const saved = localStorage.getItem('readingProgress');
        if (saved) {
            return JSON.parse(saved);
        }
        return null;
    }

    // 保存用户设置
    saveSettings(settings) {
        localStorage.setItem('readerSettings', JSON.stringify(settings));
    }

    // 加载用户设置
    loadSettings() {
        const saved = localStorage.getItem('readerSettings');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            fontSize: 18,
            lineHeight: 1.8,
            letterSpacing: 0.5,
            fontFamily: 'noto-serif',
            theme: 'light'
        };
    }

    // 更新进度条
    updateProgress(scrollTop, scrollHeight, clientHeight) {
        // 计算进度，处理边界情况
        let progress = 0;
        const scrollableHeight = scrollHeight - clientHeight;
        
        if (scrollableHeight > 0) {
            progress = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
        } else if (scrollHeight > 0) {
            // 如果内容高度小于等于视口高度，进度为100%
            progress = 100;
        }
        
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(progress)}%`;
        }
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// 创建全局工具实例
window.utils = new Utils();

