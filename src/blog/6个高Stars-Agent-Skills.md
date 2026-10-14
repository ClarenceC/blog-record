---
title: 6 个高 stars 的 skills
pubDate: 2026-10-14
categories: AI
tags: ["AI", "Skills"]
image:
  url: ""
  alt: ""
author: "Clarence.C"
description: 最近 chencc 又分享了 6 个热度比较高的 skills，覆盖逆向、跨模型审查、Claude API、设计稿、按 spec 并行实现和去 AI 味。
---


上一篇的 5 个 skills 偏学习和复盘，我觉得也还行，所以分享一下给大家，这一批 skills 会更复杂：逆向任务分流、换个模型审代码、写 Claude API、出设计稿、按 spec 并行实现，还有一个去 AI 味。

#### 1. /reverse-skill

拿到 APK、二进制、前端 JS 加密或 CTF 题，agent 常常不知道该用哪套方法，只能一条条试命令。reverse-skill 负责分流：先判断任务类型，再把对应的知识包和流程交给 agent。

分流规则、各场景的 skill、本地工具索引是分开维护的，同类任务每次都走同一套流程，不用从头摸索。仓库注明只能用于合法的安全研究、CTF，以及你自己拥有或已获授权的系统。

> https://github.com/zhaoxuya520/reverse-skill

#### 2. /dev-pair

让 agent 审自己刚写的代码，效果有限：同一个模型有同样的盲区，自己犯过的错大概率还会放过去。dev-pair 把审查交给另一家厂商的模型，它只指方向、挑错、指出遗漏，不改你的实现。

它不会自动触发，要你主动说 "get a second opinion" 或 "devpair this"，毕竟小改动不值得多花一轮 token。配置里的 `daily_cap` 是每天的硬上限，每次付费调用都会先记到 ledger 里。如果审查模型和写代码的模型是同一家，它会警告，但你坚持指定的话照样执行。

> https://github.com/justinjohnson25600/hermes_skills/tree/main/dev-pair

#### 3. /claude-api

Anthropic 官方的 Claude API / SDK 参考。模型 id、价格、streaming、tool use、prompt cache、版本迁移都写在 skill 里，agent 照着写，不用靠训练时的记忆。

它会先识别项目用的语言，再读对应 SDK 的文档。这一步很有必要，因为记忆里的写法经常已经过时：比如新模型的 extended thinking 要写 `thinking: {type: "adaptive"}`，还传 `budget_tokens` 会直接报 400。它还带了几个现成流程：`migrate` 用来换模型，`prompt-audit` 检查过时的提示词，`cost-optimize` 看账单哪里能省。

新版 claude 都已经包含在默认 skills 里面，不需要额外安装。

> https://github.com/anthropics/skills/tree/main/skills/claude-api

#### 4. /baoyu-design

chencc 分享时写的名字是 gen-pptx，但 gen-pptx 只是 baoyu-design 的导出环节，真正要装的是 baoyu-design。

baoyu-design 把 Claude Design 的做法搬到本地 agent，按设计规范生成单文件 HTML。高保真界面、交互原型、线框图、落地页、幻灯片都能做。项目里已经有 design system 的话，它会严格遵守里面的视觉规范，不只是拿来参考。

gen-pptx 负责最后一步：把 baoyu-design 生成的幻灯片转成 PPTX，文字和形状在 PowerPoint 里还能编辑。它只认 baoyu-design 生成的幻灯片，拿普通网页去转，只会得到一张内容溢出的幻灯片。

> https://github.com/JimLiu/baoyu-design

#### 5. /implement-spec

Matt Pocock 写的实现类 skill，用在 spec 和 tickets 都已经拆好之后。这里的 tickets 带阻塞关系，组成一张任务图。当前没被阻塞、可以开工的那一批叫 frontier，它会把这批 ticket 同时分给多个 implementer subagent，每个 subagent 在独立的 worktree 里做，做完合并到同一条 integration branch。

全部做完后跑一次 code review，集中修问题，再去 issue tracker 里关掉这些 ticket。只有 tracker 靠 PR 关单，或者你明确要求时，它才会开 PR；用本地 markdown 当 tracker 的话，停在分支上就行。它声明了 `disable-model-invocation: true`，需要手动输入 `/implement-spec`。

它原先放在 `skills/in-progress/`，现在挪到了 `skills/engineering/implement-spec`，旧链接可能打不开。

> https://github.com/mattpocock/skills/tree/main/skills/engineering/implement-spec

#### 6. /avoid-ai-writing

和上一篇的 /unslop 一样，都是把 AI 腔从文章里去掉。区别在规则多少、改几遍，以及能不能只出一份检查结果。

/unslop 上一篇介绍过：28 条清单，分 7 类，扫一遍再重写一遍，需要手动调用。

/avoid-ai-writing 的规则多得多：74 类英文写作模式，一张 112 个词的分级替换表，外加 10 条短语。词的标准不一样，有的出现一次就标，有的要几个凑在一起才标，有的要整篇密度很高才算。默认最多改两遍，第二遍处理第一遍漏掉的，能核实的内容顺便核实。另外有两种模式：detect 只标不改，列出哪些该改、哪些可以留；edit 只改有问题的句子，已经读着自然的段落不动。说 "remove AI-isms" 这类短语就能触发它。仓库里还带了一个检测器，可以在命令行或 CI 里跑。

要注意它的规则是按英文调的，直接拿来改中文稿，误判会比较多。

所以在对话里改一篇稿子，用 /unslop；英文稿想多改一遍，或者想在提交时自动检查，用 /avoid-ai-writing。

| | /unslop | /avoid-ai-writing |
| --- | --- | --- |
| 规则 | 28 条，7 类 | 74 类模式，加 112 词的分级替换表 |
| 触发 | 只能手动调用 | 说触发短语就会用 |
| 流程 | 扫一遍，重写一遍 | 默认最多改两遍，也可以只检测或只改问题句 |
| 语言 | 例子是英文，中文稿也能按规则改 | 按英文调的，改中文误判多 |
| 适合 | 在对话里改完一篇 | 英文稿多改一遍，或提交时自动检查 |

> https://github.com/conorbronsdon/avoid-ai-writing

#### 小结

| Skill | 一句话 | 什么时候用 |
| --- | --- | --- |
| /reverse-skill | 按任务类型分流到对应的知识包 | APK、二进制、JS 加密、CTF |
| /dev-pair | 换一家模型做第二轮审查 | 改动值得多花一轮 token 时 |
| /claude-api | 按最新 SDK 文档写 Claude 调用 | 写或迁移 Claude API 代码 |
| /baoyu-design | 按设计规范出 HTML 设计稿 | 做界面、原型，或把幻灯片导出成 PPTX |
| /implement-spec | 按任务图并行实现，合到一条分支 | tickets 已经拆好、标了阻塞关系 |
| /avoid-ai-writing | 规则更细的英文去 AI 味 | 英文稿、只要检查结果，或提交时自动检查 |
