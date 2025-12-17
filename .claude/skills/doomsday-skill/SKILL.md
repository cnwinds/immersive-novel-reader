# 末世重生漫剧创作技能包

## 技能包说明
这是一个专业的末世重生题材漫剧创作技能包，包含完整的创作方法论、写作风格定义、文档模板和实战示例。

## 技能包结构
```
doomsday-skill/
├── SKILL.md                           # 当前文件，技能包核心配置
├── doomsday-outline-method.md         # 大纲创作方法论
├── doomsday-storyboard-method.md      # 分镜脚本创作方法论
├── doomsday-output-style.md           # 写作风格定义
├── templates/                         # 文档格式模板
│   ├── doomsday-outline-template.md
│   ├── doomsday-storyboard-template.md
│   ├── doomsday-character-template.md
│   ├── doomsday-chapter-index-template.md
│   └── doomsday-chapter-template.md
└── examples/                          # 创作示例
    ├── outline-example.md
    ├── storyboard-example.md
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
7. **AI分镜脚本创作**：支持生成文生图和图生视频提示词，角色一致性控制

## 调用方式

### 调用机制说明
技能包通过**文件读取**方式调用，主Agent需要按顺序读取对应文件。所有文件路径相对于项目根目录。

### 文件路径规范
- 技能包根目录：`.claude/skills/doomsday-skill/`
- 模板目录：`.claude/skills/doomsday-skill/templates/`
- 示例目录：`.claude/skills/doomsday-skill/examples/`
- 输出文件目录：项目根目录（`outline.md`、`characters.md`、`catalog.md`、`episodes/`）

### 各阶段调用流程

**大纲阶段**（/outline命令）：
1. 读取 `.claude/skills/doomsday-skill/doomsday-outline-method.md`（方法论）
2. 读取 `.claude/skills/doomsday-skill/templates/doomsday-outline-template.md`（模板）
3. 读取 `.claude/skills/doomsday-skill/examples/outline-example.md`（示例）
4. 基于读取内容生成大纲
5. 写入项目根目录的 `outline.md` 文件

**人物阶段**（/character命令）：
1. 读取项目根目录的 `outline.md`（获取故事背景）
2. 读取 `.claude/skills/doomsday-skill/templates/doomsday-character-template.md`（模板）
3. 读取 `.claude/skills/doomsday-skill/examples/character-example.md`（示例）
4. 基于读取内容生成人物小传
5. 写入项目根目录的 `characters.md` 文件

**目录阶段**（/catalog命令）：
1. 读取项目根目录的 `outline.md` 和 `characters.md`（获取设定）
2. 读取 `.claude/skills/doomsday-skill/templates/doomsday-chapter-index-template.md`（模板）
3. 读取 `.claude/skills/doomsday-skill/examples/catalog-example.md`（示例）
4. 基于读取内容生成分集目录
5. 写入项目根目录的 `catalog.md` 文件

**正文阶段**（/write命令）：
1. 读取项目根目录的 `outline.md`、`characters.md`、`catalog.md`（获取设定和规划）
2. 读取 `.claude/skills/doomsday-skill/doomsday-output-style.md`（写作风格）
3. 读取 `.claude/skills/doomsday-skill/templates/doomsday-chapter-template.md`（模板）
4. 读取 `.claude/skills/doomsday-skill/examples/chapter-example.md`（示例）
5. 如有已完成的集数，读取 `episodes/` 目录中最近3集保持连贯性
6. 基于读取内容生成正文
7. 写入 `episodes/Episode-XX.md` 文件

**分镜脚本阶段**：
- 读取 doomsday-storyboard-method.md 获取分镜创作方法论
- 读取 templates/doomsday-storyboard-template.md 获取格式规范
- 读取 examples/storyboard-example.md 学习优秀范例

## 执行流程
<<<<<<< HEAD
1. 主Agent识别当前创作阶段
2. 自动调用对应的方法论、模板、示例文件
3. 基于skill提供的专业知识进行内容创作
4. 严格遵循模板格式输出结果
5. 正文阶段完成后触发质量检查
6. 支持分镜脚本生成，将正文转化为可视化分镜
=======
1. 主Agent识别当前创作阶段（通过用户命令或工作流状态）
2. 按顺序读取对应的方法论、模板、示例文件
3. 读取必要的设定文档（outline.md、characters.md、catalog.md）
4. 基于skill提供的专业知识进行内容创作
5. 严格遵循模板格式输出结果
6. 正文阶段完成后自动触发质量检查（调用 doomsday-aligner）
>>>>>>> df5392b (淇绔犺妭鏍囬鏄剧ず鍜屽皬璇村悕绉伴棶棰橈紝浼樺寲闃呰甯冨眬)

## 适用场景
- 末世重生题材漫剧剧本创作
- 60集短剧结构设计
- 囤货复仇双线叙事
- 天灾升级体系构建
- 快节奏爽文创作
<<<<<<< HEAD
- AI辅助分镜脚本创作
- 文生图+图生视频工作流
- 角色一致性控制
=======
>>>>>>> df5392b (淇绔犺妭鏍囬鏄剧ず鍜屽皬璇村悕绉伴棶棰橈紝浼樺寲闃呰甯冨眬)

## Commands

### /status
显示当前创作进度：
<<<<<<< HEAD
- 已完成的阶段（大纲/人物/目录/正文/分镜）
- 正文创作进度（已完成X/60集）
- 分镜脚本完成数量
=======
- 已完成的阶段（大纲/人物/目录/正文）
- 正文创作进度（已完成X/60集）
>>>>>>> df5392b (淇绔犺妭鏍囬鏄剧ず鍜屽皬璇村悕绉伴棶棰橈紝浼樺寲闃呰甯冨眬)
- 下一步操作建议

### /outline
重新生成或修改故事大纲（会询问是否覆盖现有大纲）

### /character
创建或修改人物小传（需要先完成大纲）

### /catalog
<<<<<<< HEAD
生成分集目录（需要先完成大纲和人物）
=======
生成或修改分集目录（需要先完成大纲和人物）
>>>>>>> df5392b (淇绔犺妭鏍囬鏄剧ず鍜屽皬璇村悕绉伴棶棰橈紝浼樺寲闃呰甯冨眬)

### /write
开始或继续正文创作（需要先完成大纲、人物、目录）
- 首次调用从Episode-01开始
- 后续调用从最后完成的集数继续

<<<<<<< HEAD
### /storyboard
为指定剧集生成分镜脚本（需要先完成正文）
- 支持按集生成（Episode-XX）
- 支持批量生成（连续剧集）
- 自动生成角色一致性控制的提示词
- 输出格式：Markdown表格（镜头|时长|场景|文生图|图生视频|备注）

=======
>>>>>>> df5392b (淇绔犺妭鏍囬鏄剧ず鍜屽皬璇村悕绉伴棶棰橈紝浼樺寲闃呰甯冨眬)
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

<<<<<<< HEAD
## 注意事项

- 输入质量决定输出质量：用户在Q1-Q3提供的创意越详细，生成内容越贴合预期
- AI生成的是初稿：需要人工润色才能达到投稿标准
- 检查-修改闭环：如果一致性检查失败，必须调用skill修改后重新检查，直到通过
- 不主动偏离大纲：正文创作过程中，如发现与大纲冲突的情况，优先以大纲为准
- 批次创作模式：每批5集完成后必须进行质量检查，通过后才能写入文件并继续下一批
- 分镜脚本创作规则：
  - 严格时长控制：每个镜头5-10秒，超时必须拆分
  - 角色一致性：每个分镜必须完整重复主角外观描述
  - 视角适配：根据自拍/第一人称/第三人称选择合适景别
  - 场景切换：每组镜头组建议在不同空间，避免布局冲冲突
  - 提示词格式：文生图（景别+角色+主体+环境+氛围+风格+光影），图生视频（镜头+运动+行为+背景+环境）
- 分镜质量保障：必须先完成正文创作，才可能确保剧情完整准确
=======
## 错误处理

### 文件读取失败
- **情况**：无法读取技能包文件（模板、示例、方法论）
- **处理**：提示文件路径错误或文件不存在，中止当前操作
- **恢复**：检查文件路径，确认技能包文件完整性

### 输出文件冲突
- **情况**：目标输出文件已存在（如outline.md已存在）
- **处理**：询问用户是否覆盖现有文件
- **恢复**：根据用户选择覆盖或中止操作

### 前置文件缺失
- **情况**：执行命令时缺少必要的前置文件（如执行/character时缺少outline.md）
- **处理**：明确提示缺少哪个文件，说明需要先执行哪个命令
- **恢复**：用户完成前置步骤后，重新执行当前命令

## 注意事项

- **输入质量决定输出质量**：用户在Q1-Q3提供的创意越详细，生成内容越贴合预期
- **AI生成的是初稿**：需要人工润色才能达到投稿标准
- **检查-修改闭环**：如果一致性检查失败，必须根据报告修改后重新检查，最多循环3次
- **不主动偏离大纲**：正文创作过程中，如发现与大纲冲突的情况，优先以大纲为准
- **批次创作模式**：每批5集完成后必须进行质量检查，通过后才能写入文件并继续下一批
- **文件路径统一**：所有文件路径必须严格按照规范，确保跨平台兼容性
- **读取顺序重要**：必须按"方法论→模板→示例"的顺序读取，确保理解完整
>>>>>>> df5392b (淇绔犺妭鏍囬鏄剧ず鍜屽皬璇村悕绉伴棶棰橈紝浼樺寲闃呰甯冨眬)
