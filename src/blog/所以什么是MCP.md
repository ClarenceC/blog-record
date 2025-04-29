---
title: 所以什么是MCP
pubDate: 2025-04-23
categories: AI
tags: ["MCP", "AI"]
image:
  url: ""
  alt: ""
author: "Clarence.C"
description: ""
---

在一个万物互联的世界，AI 模型就像是核心不断在分析和推导，Chat，的AI孤岛，如果想让 AI 模型能连接到更多工具和接口就需要用到 MCP，MCP 是AI 模型和外部工具的通讯协议，主要是解决 AI 应用快速而灵活地扩展功能。

#### MCP (Model Context Protocol， 模型上下文协议)

2024年11月底，由 Anthropic 推出的一种开放标准，旨在统一大型语言模型（LLM）与外部数据源和工具之间的通信协议。MCP 的主要目的在于解决当前 AI 模型因数据孤岛限制而无法充分发挥潜力的难题，MCP 使得 AI 应用能够安全地访问和操作本地及远程数据，为 AI 应用提供了连接万物的接口。

#### <font style="color:rgb(25, 27, 31);">MCP 核心架构</font>

![image](./_image/what-is-mcp.png)

<font style="color:rgb(25, 27, 31);"></font>

<font style="color:rgb(25, 27, 31);">从上图可以看出 MCP 核心架构分几个部分，MCP 遵循客户端-服务器架构（client-server），其中包含以下几个核心概念：</font>

- <font style="color:rgb(25, 27, 31);">MCP 主机（MCP Hosts）：发起请求的 LLM 应用程序（例如</font><font style="color:rgb(25, 27, 31);"> </font>[<font style="color:rgb(9, 64, 142);">Claude Desktop</font>](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Claude+Desktop&zhida_source=entity)<font style="color:rgb(25, 27, 31);">、IDE 或 AI 工具）。</font>
- <font style="color:rgb(25, 27, 31);">MCP 客户端（MCP Clients）：在主机程序内部，与 MCP server 保持 1:1 的连接。</font>
- <font style="color:rgb(25, 27, 31);">MCP 服务器（MCP Servers）：为 MCP client 提供上下文、工具和 prompt 信息。</font>
- <font style="color:rgb(25, 27, 31);">本地资源（Local Resources）：本地计算机中可供 MCP server 安全访问的资源（例如文件、数据库）。</font>
- <font style="color:rgb(25, 27, 31);">远程资源（Remote Resources）：MCP server 可以连接到的远程资源（例如通过 API）。</font>

<font style="color:rgb(25, 27, 31);"></font>

#### <font style="color:rgb(25, 27, 31);">MCP的起源</font>

<font style="color:rgb(25, 27, 31);">Anthropic </font>**想做一个类似 LSP（Language Server Protocol）的东西？把这种"AI 应用与扩展之间的通信"标准化。**

**<font style="color:rgb(54, 54, 54);">LSP </font>**<font style="color:rgba(0, 0, 0, 0.85);">是一种用于开发工具的通信协议，由微软在2016年首次提出，并在开源社区中得到了广泛的支持和推广。它主要用于简化和标准化编程语言工具（如代码编辑器、集成开发环境IDE等）与语言服务器之间的交互。</font>

**<font style="color:rgba(0, 0, 0, 0.85);">LSP</font>**<font style="color:rgba(0, 0, 0, 0.85);"> </font><font style="color:rgba(0, 0, 0, 0.85);">的功能主要用于做，自动提示代码，代码导航格式化，重构智能提示等功能，LSP 也是采用客户端-服务器模式。客户端通常是代码编辑器或IDE，服务器是语言服务器（Language Server），负责处理与特定编程语言相关的逻辑，客户端和服务器之间通过JSON-RPC协议进行通信。客户端发送请求（如代码补全请求），服务器处理后返回响应。</font>

#### <font style="color:rgba(0, 0, 0, 0.85);">MCP vs Function Calling vs A2A</font>

![](./_image/WX20250429-162052@2x.png)

<table style="width: 100%;">
  <tr style="font-size: 14px;">
    <th style="width: 15%;">对比维度</th>
    <th style="width: 30%;">MCP <br/>Model Context Protocol</th>
    <th style="width: 25%;">Function Calling</th>
    <th style="width: 30%;">A2A <br/>Agent to Agent Protocol</th>
  </tr>
  <tr>
    <td>焦点</td>
    <td>智能体 ↔ 工具 / 数据</td>
    <td>智能体扩展功能</td>
    <td>智能体 ↔ 智能体</td>
  </tr>
  <tr>
    <td>性质</td>
    <td>技术协议</td>
    <td>功能机制，使用 API 调用</td>
    <td>开放协议</td>
  </tr>
  <tr>
    <td>范围</td>
    <td>主要增强单个智能体的能力。</td>
    <td>主要实现大语言模型与外部工具和服务的交互功能。</td>
    <td>核心在于多智能体系统和协作。</td>
  </tr>
  <tr>
    <td>目标</td>
    <td>为 LLM 提供访问外部能力和上下文的标准方式。</td>
    <td>为大模型提供工具调用功能，扩展模型的能力和应用场景</td>
    <td>实现不同智能体间的互操作性与协调，打破智能体之间的"信息孤岛"</td>
  </tr>
  <tr>
    <td>实现</td>
    <td>基于标准协议，实现 Function Call</td>
    <td>基于选择函数、准备参数、调用函数和整合代码</td>
    <td>以"任务驱动、消息流转、能力发现"为核心实现</td>
  </tr>
  <tr>
    <td>常见场景</td>
    <td>支持复杂场景，跨平台数据访问和操作复杂任务</td>
    <td>简单任务，机械式操作</td>
    <td>支持复杂场景，并可以Agent 智能体之间协作操作复杂任务</td>
  </tr>
</table>

<font style="color:rgb(25, 27, 31);"></font>

#### <font style="color:rgb(25, 27, 31);">参考资源</font>

- [一文看懂：MCP(大模型上下文协议)](https://zhuanlan.zhihu.com/p/27327515233)
- [对话 MCP 团队：MCP 的起源、技术细节与设计思路、与 Agent 的关系及未来迭代方向](https://liduos.com/mcp-team-discussion.html)
- [前端开发又幸福了，Cursor + Figma MCP 快速还原设计稿](https://juejin.cn/post/7480183580120055819?searchId=2025042314451322A5C44EF2C9A3A49329)
- [聊一下MCP，希望能让各位清醒一点吧](https://juejin.cn/post/7492271537010671635)
- [A2A vs MCP: AI Protocol Evolution](https://a2a-mcp.org)
