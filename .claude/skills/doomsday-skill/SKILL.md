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