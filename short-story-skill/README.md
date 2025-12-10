# 短篇世情文创作技能包

## 技能包概述

**skill名称**：short-story-skill

**核心功能**：帮助创作者将现实题材的故事创意（职场、情感、家庭、社会百态）转化为完整的短篇故事（约10000字）。

**设计理念**：
- 从创意到成稿，全程结构化指导
- 五幕式经典叙事框架
- 口语化、细节化的实用写作规范
- 步步为营，确保创作质量

---

## 目录结构

```
short-story-skill/
├── methodology/
│   └── story-writing-method.md          # 创作方法论（核心原则、流程、技巧）
├── templates/
│   ├── short-story-idea-template.md     # 故事核心创意模板
│   ├── short-story-outline-template.md  # 五幕大纲模板
│   └── act-planning-template.md         # 分幕规划模板
├── examples/
│   ├── idea-example.md                  # 创意示例（职场斗争）
│   ├── outline-example.md               # 大纲示例
│   └── act-planning-example.md          # 分幕规划示例
└── SHORT-STORY.md                       # 完整工作流程文档
```

---

## 使用流程

### 四步创作法

```
┌─────────────────┐
│  1. 需求确认     │ → idea.md
│  (/short-story-idea) │
└────────┬────────┘
         │
┌────────▼────────┐
│  2. 故事大纲     │ → outline.md
│  (/short-story-outline) │
└────────┬────────┘
         │
┌────────▼────────┐
│  3. 分幕规划     │ → plan-act-{1-5}.md
│  (/short-story-plan-act) │
└────────┬────────┘
         │
┌────────▼────────┐
│  4. 正文创作     │ → act-{1-5}.md
│  (/short-story-write-act) │
└─────────────────┘
```

每幕2000字，总计万字左右完成一个完整故事。

---

## 命令系统

### 核心命令

| 命令 | 功能 | 输入 | 输出 |
|------|------|------|------|
| `/short-story-idea` | 创意确认 | 用户问答 | idea.md |
| `/short-story-outline` | 生成大纲 | idea.md | outline.md |
| `/short-story-plan-act 1-5` | 分幕规划 | outline.md | plan-act-X.md |
| `/short-story-write-act 1-5` | 创作正文 | idea+outline+plan | act-X.md |
| `/short-story-continue` | 继续输出 | - | 完成剩余内容 |
| `/short-story-status` | 查看进度 | - | 进度报告 |

### 命令使用示例

```bash
# 第一步：确认创意
用户输入：/short-story-idea
系统执行：
  ├─ 询问：故事讲什么？
  ├─ 询问：选哪种叙事视角？
  └─ 生成：idea.md

# 第二步：创建大纲
用户输入：/short-story-outline
系统执行：
  ├─ 读取：idea.md
  ├─ 调用：short-story-skill
  └─ 生成：outline.md

# 第三步：规划第一幕
用户输入：/short-story-plan-act 1
系统执行：
  ├─ 读取：outline.md
  ├─ 调用：skill → 分幕规划模板
  └─ 生成：plan-act-1.md

# 第四步：创作第一幕正文
用户输入：/short-story-write-act 1
系统执行：
  ├─ 读取：idea.md, outline.md, plan-act-1.md
  ├─ 调用：skill → 创作方法论
  ├─ 输出：1000字+（第1部分）
  ├─ 等待：用户输入"继续"
  ├─ 输出：剩余内容（总2000字）
  └─ 生成：act-1.md
```

---

## 创作方法论要点

### 五幕结构

1. **第一幕：拉仇恨**
   - 目标：让读者真情实感讨厌反派
   - 建立冲突，塑造可恨的对手

2. **第二幕：矛盾爆发**
   - 目标：主角首次反击失败
   - 展现主角的无助与挣扎

3. **第三幕：持续施压**
   - 目标：困境加深，退无可退
   - 为反转积蓄能量

4. **第四幕：高潮对抗**
   - 目标：主角反击，局势逆转
   - 爽感最强烈的部分

5. **第五幕：结局与升华**
   - 目标：解决问题，情感满足
   - 让读者感觉"就该这样"

### 写作规范

✅ **必须做的**：
- 口语化写作（像聊天，不文绉绉）
- 充分细节描写（看、听、触、闻）
- 对话自然流畅（符合人物身份）
- 行为展现内心（行胜于言）
- 节奏快速紧凑（场景切换快）

❌ **避免的**：
- 事后诸葛亮式说教
- 大段心理描写却缺乏行动
- 反转机械降神，毫无铺垫
- 人物脸谱化，非黑即白
- 为了虐而虐，脱离现实

---

## 质量检查标准

每幕完成后检查：

```markdown
- [ ] 字数达到2000字左右
- [ ] 语言口语化，避免书面语
- [ ] 包含3-5个感官细节描写
- [ ] 对话自然，符合人物身份
- [ ] 通过行为展现内心
- [ ] 节奏快，无冗余内容
- [ ] 与前期规划保持一致
- [ ] 开头第一句就抓住人
- [ ] 结尾留有钩子
```

---

## 示例参考

### 创意示例
`examples/idea-example.md` - 职场实习生对抗恶主管

### 大纲示例
`examples/outline-example.md` - 完整的五幕结构

### 分幕规划示例
`examples/act-planning-example.md` - 第一幕详细规划

---

## Skill调用方法

```bash
# 在Claude开发环境中调用

## 方法1：直接调用skill
skill: "short-story-skill"

## 方法2：读取特定文件读取
Read: short-story-skill/methodology/story-writing-method.md
Read: short-story-skill/templates/short-story-idea-template.md
Read: short-story-skill/templates/short-story-outline-template.md
Read: short-story-skill/examples/idea-example.md

## 方法3：执行命令时使用skill作为上下文
当用户输入：/short-story-outline
系统自动加载short-story-skill作为创作指导
```

---

## 用户场景示例

### 场景1：职场复仇故事
> 我想写一个实习生被主管欺负，最后逆袭的故事

**流程**：
1. `/short-story-idea` → 确认创意和视角
2. `/short-story-outline` → 生成五幕大纲
3. `/short-story-plan-act 1` → 规划第一幕
4. `/short-story-write-act 1` → 创作第一幕（输出1000字）
5. 用户："继续" → 完成第一幕剩余内容
6. 重复步骤3-5，直到完成五幕

### 场景2：情感纠葛故事
> 我想写一个发现男友出轨闺蜜，然后反击的故事

**流程同上**，skill会自动适配不同类型的世情文

---

## 模板结构说明

### story-writing-method.md
包含：
- 世情文定义与特点
- 创作流程四步法详解
- 核心创作原则（拉仇恨、真实感、爽感）
- 实用写作技巧（开头、对话、细节、节奏）
- 质量控制清单

### short-story-idea-template.md
包含：
- 一句话创意填写区
- 叙事视角选择项
- 核心冲突三要素（主角、对手、矛盾）

### short-story-outline-template.md
包含：
- 故事总览
- 五幕式结构（每幕的核心目标、内容要点、关键场景）
- 字数目标标注

### act-planning-template.md
包含：
- 幕次基本信息
- 场景规划（开头/发展/结尾）
- 角色状态变化
- 情感体验设计
- 关键对话设计
- 细节描写重点

---

## 版本信息

- **版本**：v1.0
- **创建日期**：2024
- **适用场景**：短篇世情文创作（万字左右）
- **核心框架**：五幕式叙事结构

---

## 联系与支持

如需优化此skill包或添加新功能：
- 修改：`methodology/story-writing-method.md` 中的方法论
- 调整：`SHORT-STORY.md` 中的工作流程
- 补充：`templates/` 目录下的新模板
- 参考：`examples/` 目录下的应用示例

---

## 快速开始

如果你是第一次使用：

```bash
# 1. 查看方法论
Read: short-story-skill/methodology/story-writing-method.md

# 2. 查看示例
Read: short-story-skill/examples/idea-example.md
Read: short-story-skill/examples/outline-example.md

# 3. 查看工作流程
Read: short-story-skill/SHORT-STORY.md

# 4. 开始创作
用户输入：/short-story-idea
系统引导：通过问答明确创意
```

Enjoy creating!
