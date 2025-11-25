# 末世重生漫剧创作技能包

## 技能包说明
这是一个专业的末世重生题材漫剧创作技能包，包含完整的创作方法论、写作风格定义、文档模板和实战示例。

## 技能包结构
```
doomsday-skill/
├── SKILL.md                           # 当前文件，技能包核心配置
├── doomsday-outline-method.md         # 大纲创作方法论
├── doomsday-output-style.md           # 写作风格定义
├── templates/                         # 文档格式模板
│   ├── doomsday-outline-template.md
│   ├── doomsday-character-template.md
│   ├── doomsday-chapter-index-template.md
│   └── doomsday-chapter-template.md
└── examples/                          # 创作示例
    ├── outline-example.md
    ├── character-example.md
    ├── catalog-example.md
    └── chapter-example.md
```

## 核心能力
1. **三幕式结构设计**：60集固定结构对应起、承、转三幕布局
2. **天灾进程体系**：从低级到高级的天灾等级设计和时间线规划
3. **爽点分布策略**：囤货爽点+复仇爽点的节奏控制
4. **单集叙事结构**：起承转钩的500-800字标准格式
5. **视觉化表达**：适合漫画分镜的画面感和动作描写
6. **人物塑造体系**：主角-炮灰反派-前世仇人-终极boss的层级设计

## 调用方式
主Agent在不同创作阶段会自动调用对应资源：

**大纲阶段**：
- 读取 doomsday-outline-method.md 获取创作方法论
- 读取 templates/doomsday-outline-template.md 获取格式规范
- 读取 examples/outline-example.md 学习优秀范例

**人物阶段**：
- 读取 templates/doomsday-character-template.md 获取格式规范
- 读取 examples/character-example.md 学习优秀范例

**目录阶段**：
- 读取 templates/doomsday-chapter-index-template.md 获取格式规范
- 读取 examples/catalog-example.md 学习优秀范例

**正文阶段**：
- 读取 doomsday-output-style.md 获取写作风格指导
- 读取 templates/doomsday-chapter-template.md 获取格式规范
- 读取 examples/chapter-example.md 学习优秀范例

## 执行流程
1. 主Agent识别当前创作阶段
2. 自动调用对应的方法论、模板、示例文件
3. 基于skill提供的专业知识进行内容创作
4. 严格遵循模板格式输出结果
5. 正文阶段完成后触发质量检查

## 适用场景
- 末世重生题材漫剧剧本创作
- 60集短剧结构设计
- 囤货复仇双线叙事
- 天灾升级体系构建
- 快节奏爽文创作

## Commands

### /status
显示当前创作进度：
- 已完成的阶段（大纲/人物/目录/正文）
- 正文创作进度（已完成X/60集）
- 下一步操作建议

### /outline
重新生成或修改故事大纲（会询问是否覆盖现有大纲）

### /character
创建或修改人物小传（需要先完成大纲）

### /catalog
生成或修改分集目录（需要先完成大纲和人物）

### /write
开始或继续正文创作（需要先完成大纲、人物、目录）
- 首次调用从Episode-01开始
- 后续调用从最后完成的集数继续

### /check
手动触发一致性检查（检查最近完成的5集内容）

### /help
显示完整指令列表和使用说明

## 核心原则

1. **模块化创作**：严格按照"大纲→人物→目录→正文"顺序推进，不跳步
2. **模板驱动**：所有输出严格遵循 templates/ 定义的格式
3. **质量保障**：正文创作每批5集后自动触发一致性检查，确保不偏离大纲
4. **上下文连贯**：每个阶段创作前读取已有文档，保持故事连贯性
5. **文档驱动**：通过文档而非对话记忆维护上下文，支持长期创作
6. **固定结构**：60集固定结构，对应三幕式布局，不支持自定义集数

## 注意事项

- 输入质量决定输出质量：用户在Q1-Q3提供的创意越详细，生成内容越贴合预期
- AI生成的是初稿：需要人工润色才能达到投稿标准
- 检查-修改闭环：如果一致性检查失败，必须调用skill修改后重新检查，直到通过
- 不主动偏离大纲：正文创作过程中，如发现与大纲冲突的情况，优先以大纲为准
- 批次创作模式：每批5集完成后必须进行质量检查，通过后才能写入文件并继续下一批