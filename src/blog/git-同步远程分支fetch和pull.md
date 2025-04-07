---
title: Git 同步远程分支fetch和pull
pubDate: 2017-08-11
categories: ops
tags: ["Git", "fetch", "pull"]
image:
  url: ""
  alt: ""
author: "Clarence.C"
description: "在项目开始变得复杂的过程中,分支就会变得越来越多了,怎样管理好本地和远程分支成为一个很重要的事情."
---

## 问题

在项目开始变得复杂的过程中,分支就会变得越来越多了,怎样管理好本地和远程分支成为一个很重要的事情.

<!-- more -->

## 远程分支同步到本地

当远程分支更新到本地的时候可以使用下面的这两个命令,但你必须考虑远程分支是否已经更改与你本地分支的版本并不一样.

### git pull

`git pull` 缩写命令
`git pull [origin] [develop]` 详细命令同步远程origin端 的 develop分支
git pull 会直接从远程分支同步到本地分支,然后将内容合并到当前分支,直接更改你的分支.

`git pull = git fetch + git merge`;

### git fetch

`git fetch` 缩写命令
`git fetch [origin] [develop]`

1. 详细命令同步远程origin端最新develop分支,到develop本地分支上.
2. 对远程develop分支和本地develop分支进行比较.
3. 记录在本地local repository上.
4. 需要merge, 才会更改工作区workspace 的内容.

详细可以看下面这图:
![image](./git-同步远程分支fetch和pull/XwVzT.png)

> tip:尽量使用git fetch 因为 fetch对比过后再合并你的分支到工作区,减少新分支冲突带来的错误.

## 额外知识点

### 查看完程分支

`git branch -a`

```
$ git branch -a
  master
  remote
  tungway
  v1.52
* zrong
  remotes/origin/master
  remotes/origin/tungway
  remotes/origin/v1.52
  remotes/origin/zrong
```

### 删除远程分支

`$ git push origin --delete <branchName>`

### 删除不存在对应远程分支的本地分支

`git fetch -prune [origin]`

## 最后fetch方法还是有很多参数可以选用

可以查看下面连接
[fetch 参数功能](https://git-scm.com/docs/git-fetch)

## 参考文档

[Git查看、删除、重命名远程分支和tag](https://blog.zengrong.net/post/1746.html)
[Git远程05：远程分支的删除与同步](http://higoge.github.io/2015/07/07/git-remote05/)
[git fetch](https://git-scm.com/docs/git-fetch)
[Ooba Blog](http://www.zhanglian2010.cn/2014/07/git-pull-vs-fetch-and-merge/)
