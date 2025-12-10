# 现代言情短篇小说创作助手

一个专业的现代言情小说创作 Skill，通过标准化流程和模板驱动，帮助快速完成从灵感到完整初稿的创作。

## 核心功能

- **分阶段创作流程**：故事大纲 → 人物小传 → 章节目录 → 章节正文
- **模板驱动生成**：标准化文档格式，确保输出质量和一致性
- **上下文连贯**：基于文档驱动的上下文管理，保持故事前后一致
- **专业方法论**：内置现代言情创作技巧和写作风格指南

## 适用场景

当用户需要创作现代言情短篇小说时使用此 Skill，包括：
- 从故事灵感构建完整大纲
- 设计立体生动的人物角色
- 规划5章节的故事结构
- 生成符合现代言情风格的章节内容

## 创作流程

### 第一步：创建故事大纲
用户提供故事灵感后，系统会：
1. 读取 `outline-method.md` 学习大纲创作方法
2. 读取 `templates/outline-template.md` 了解大纲格式
3. 读取 `examples/outline-example.md` 参考优秀范例
4. 与用户交互，收集核心设定（主题、冲突、人物、背景）
5. 生成并保存到 `outline.md`

### 第二步：设计人物小传
基于大纲设定，系统会：
1. 读取 `outline.md` 获取故事设定
2. 读取 `templates/character-template.md` 了解人物小传格式
3. 读取 `examples/character-example.md` 参考范例
4. 生成主角、配角的详细人物设定
5. 保存到 `characters.md`

### 第三步：规划章节目录
系统会：
1. 读取 `outline.md` 和 `characters.md`
2. 读取 `templates/chapter-index-template.md`
3. 按照"起承转合"结构规划5章内容
4. 保存到 `catalog.md`

### 第四步：撰写章节正文
用户指定章节号后，系统会：
1. 读取 `outline.md`、`characters.md`、`catalog.md`
2. 读取 `output-style.md` 学习写作风格
3. 读取 `templates/chapter-template.md` 了解章节格式
4. 读取 `examples/chapter-example.md` 参考范例
5. 生成2000-3000字的章节正文
6. 保存到 `episodes/Episode-XX.md`

## 文件结构

```
项目根目录/
├── outline.md              # 故事大纲
├── characters.md           # 人物小传
├── catalog.md             # 章节目录
└── episodes/
    ├── Episode-01.md      # 第1章
    ├── Episode-02.md      # 第2章
    ├── Episode-03.md      # 第3章
    ├── Episode-04.md      # 第4章
    └── Episode-05.md      # 第5章
```

## 核心资源文件

### 方法论文件
- `outline-method.md`: 大纲创作的核心方法论，包括如何设计冲突、规划节奏等

### 风格指南
- `output-style.md`: 现代言情的写作风格要求，包括叙事视角、对话技巧、情感描写等

### 模板文件（templates/）
- `outline-template.md`: 大纲文档的标准格式
- `character-template.md`: 人物小传的标准格式
- `chapter-index-template.md`: 章节目录的标准格式
- `chapter-template.md`: 章节正文的标准格式

### 示例文件（examples/）
- `outline-example.md`: 优秀大纲范例
- `character-example.md`: 优秀人物小传范例
- `catalog-example.md`: 优秀章节目录范例
- `chapter-example.md`: 优秀章节范例

## 使用说明

1. **启动创作**：用户提供故事灵感，系统引导完成大纲
2. **逐步推进**：按照大纲→人物→目录→章节的顺序完成创作
3. **随时调整**：可以随时修改前序文档，后续生成会自动适配
4. **查看进度**：通过 `/status` 命令查看当前创作进度

## 注意事项

- 生成的内容是专业初稿，需要根据个人风格润色
- 严格遵循5章固定结构，每章2000-3000字
- 所有文档格式必须符合模板规范
- 章节创作时会自动读取所有前序文档确保连贯性
