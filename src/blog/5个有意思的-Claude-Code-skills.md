---
title: 5 个有意思的 Claude Code skills
pubDate: 2026-08-31
categories: AI
tags: ["AI", "Claude Code", "Skills"]
image:
  url: ""
  alt: ""
author: "Clarence.C"
description: 最近 chencc 大佬在 X 上面推荐了 5 个 非常实用的 skills，我试了一圈觉得都好有意思。方向是优化学习效率和对 Agent 使用做复盘的，正好分享给大家
---


#### 1. /eli5

eli5 = Explain Like I'm 5，用 5 岁小孩能懂的方式解释复杂概念。

它的 SKILL.md 全文就一句话：像对一个完全不懂这个话题的人解释，产出一个 HTML artifact，大图，少字。丢给它一个概念或问题，它会把东西画给你看，而不是写一篇长文讲给你听。

接触陌生领域先跑一遍建立直觉，给非技术同学讲东西也用得上。

> https://github.com/anthropics/claude-plugins-community/blob/main/eli5/skills/eli5/SKILL.md

#### 2. /show-me

来自 HumanLayer（写 12-Factor Agents 的那个团队）的可视化解释技能。思路是"选最小的视图，把关键点讲清楚"，按内容自动挑形式：

- 算法或逻辑 → 伪代码
- 运行时控制流 → 调用树
- UI 结构 → 组件树（带关键 state 和模块边界）
- 文件职责 → 目录树
- 交互或数据流 → Mermaid 图
- "改了什么" → diff
- 太复杂画不下的 → 一个聚焦的 HTML 页面

和 eli5 的区别：eli5 面向完全不懂的人，产出一整个图解文档；show-me 面向当前对话里正在讨论的话题，用最小的图讲清眼前这个问题。

> https://github.com/humanlayer/skills/tree/main/plugins/show-me

#### 3. /skill-doctor

Warp 出品，给 agent 配置做体检。流程是读取本地真实的会话记录，然后：

1. 按效率和代码质量两套 rubric 给抽样会话打分（默认回看 45 天）
2. 算 skill 覆盖率：有多少会话真的用上了已安装的 skill
3. 找出失败会话（低于 0.5 分的），所有改进建议必须追溯到具体哪次会话、哪个环节出了问题，不允许泛泛的最佳实践
4. 基于失败案例起草 skill 修改，直接生成 diff，最后渲染成一份可分享的 HTML 报告

全程本地运行，不上传任何会话内容。装了一堆 skill 又不确定哪些真的在起作用的话，跑一次就有答案。

> https://github.com/warpdotdev/common-skills/tree/main/.agents/skills/skill-doctor

#### 4. /retro

Matt Pocock 写的会话复盘 skill。前提很简单：agent 犯错，很可能不是 agent 的问题，而是环境的问题。所以复盘的对象不是 agent，是环境。它从 7 个维度找改进点：

- Navigation：agent 找文件费不费劲，要不要加导航指针
- Automated checks：agent 犯的错能不能被 lint、类型检查、测试拦住
- Coding standards：reviewer agent 缺不缺规则，或者有没有该删的规则
- Global AGENTS.md：全局指令是不是太重，该不该下沉到具体文件
- Tool economy：有没有特别烧 token 的工具调用
- No-ops：steering 文件里有没有根本不生效的指令
- Information access：关键信息 agent 是不是根本拿不到（比如 dev server 日志）

注意它必须手动触发，SKILL.md 里声明了 `disable-model-invocation: true`，模型不会自动调用。跑完一次复盘，下次会话就能少走点弯路。

> https://github.com/mattpocock/skills/blob/main/skills/in-progress/retro/SKILL.md

#### 5. /unslop

Cursor plugins 仓库里的去 "AI 味" skill。内嵌了一份 31 条的 AI 文风特征清单，分 7 类：内容（吹捧、空洞的 -ing 从句）、语言（AI 高频词、三段式排比）、风格（破折号滥用、加粗滥用）、聊天机器人腔（"希望对你有帮助！"）、废话、黑话、大白话。流程是扫描、重写、加灵魂、自审。

它一半篇幅其实花在"加灵魂"上：删掉 AI 腔只是半个工作，干瘪无味的文字一样一眼假。有观点，节奏有起伏，敢用第一人称，允许一点不完美，最后还要具体。

Meta 一点，这篇日志写完，也该让 /unslop 扫一遍。

> https://github.com/cursor/plugins/tree/main/pstack/skills/unslop

#### 小结

| Skill | 一句话 | 什么时候用 |
| --- | --- | --- |
| /eli5 | 大图少字的 HTML 图解 | 给外行或自己讲明白一个陌生概念 |
| /show-me | 选最小的视图讲清关键点 | 读懂代码结构、流程、改动 |
| /skill-doctor | 用真实会话给 skill 打分 | 检查 skills 配置是否真的在起作用 |
| /retro | 复盘会话，改环境不改 agent | 让下次会话少走弯路 |
| /unslop | 31 条清单去 AI 味 | 让 AI 写的东西像人写的 |
