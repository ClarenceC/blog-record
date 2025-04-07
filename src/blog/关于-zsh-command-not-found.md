---
title: "关于 zsh:command not found: ***"
pubDate: 2018-07-13
categories: ops
tags: ["zsh"]
image:
  url: ""
  alt: ""
author: "Clarence.C"
description: ""
---

# 关于 "zsh: command not found: \*\*\*"

<!-- more -->

如果我们使用 oh-my-zsh 为终于的时候，我们新增一些执行命令到 oh-my-zsh 上面的时候，终端都会出现上面的这个错误。以安装 arc 为例子，最近项目中由于需要使用到 `arcanist`，需要导入 `arcanist` 命令。

## 创建下截目录

```
mkdir arcanist
```

## 安装arcanist包

```
git clone https://github.com/phacility/arcanist.git
git clone https://github.com/phacility/libphutil.git
```

正常Mac bash 环境下，运行:

```
export PATH="$PATH:/Applications/arcanist/arcanist/bin"
```

就能成功把 `/bin` 里的 `arc` 命令引入到 bash，但是 zsh 不一样。
需要配置 `.zshrc`

## 配置 `.zshrc`

打开 zshrc 配置文档

```
open ~/.zshrc
```

寻找 #User configuration, 在 #User configuration 下面输入,你需要导入的 `bin` 置:

```
export PATH=$HOME/Applications/arcanist/arcanist/bin:$PATH
```

重置 zshrc

```
source ~/.zshrc
```

那就能成功运行导入的执行命令了。

## 使用

生效

```
arc help
```

# 扩展阅读

1. [oh-my-zsh ，“zsh: command not found: adb”](https://blog.csdn.net/yianemail/article/details/51693583)
2. [Phabricator（代码review）客户端安装及使用](https://segmentfault.com/a/1190000011183663)
