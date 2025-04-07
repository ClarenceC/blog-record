---
title: 项目中Git 注意的一些规则
pubDate: 2017-07-19
categories: ops
tags: ['Git']
image: 
  url: ''
  alt: ''
author: 'Clarence.C'
description: ''
---

{% asset_img  atlassian-getting-git-right.jpg %}
## 1.Git规则

- Perform work in a feature branch
在功能分支上面执行工作开发。

- Branch out from `develop`
从dev 分支出来再工作。

- Never push into develop or master branch. Make a Pull Request.
不要`push`分支数据到dev 或者 master 主分支上面，合并分支时要记着`Pull Request`.

<!-- more -->

- Update your local develop branch and do an interactive rebase before pushing your feature and making a Pull Request.
更新分支时，最好使用rebase 功能,rebase功能 可以使你的提交历史更简化，并且可以简化合并时一些不必要的冲突。

- Resolve potential conflicts while rebasing and before making a Pull Request
`Pull Request` 之前记着rebase最新分支下来。

- Delete local and remote feature branches after merging.
合并分支之后，删除本地无用的分支。

- Before making a Pull Request, make sure your feature branch builds successfully and passes all tests (including code style checks).
在提交`Pull Request` 之前，最好把你的分支项目先 `build` 起来 和 `test` 全部通过（包括 `style` 检查）。

- Use this .gitignore file.
编写系统日志记录文件

- Protect your develop and master branch.
保护好你的 dev 分支和 master分支


## 2.Git 提交流程

- Checkout a new feature/bug-fix branch
新建开分支的时候
`git checkout -b <branchname>`

- Make Changes
提交的时候
```javascript
git add
git commit -a
```

- Sync with remote to get changes you’ve missed
```javascript
git checkout develop
git pull
```

- Update your feature branch with latest changes from develop by interactive rebase
人家交你的分支到最新版本的时候记着从 dev rebae 最新更新。
```javascript
git checkout <branchname>
git rebase -i --autosquash develop

<!--if you have conflicts-->
git add <file1> <file2> ...
git rebase --continue
```

- Push your branch. Rebase will change history, so you'll have to use -f to force changes into the remote branch. If someone else is working on your branch, use the less destructive --force-with-lease.
`git push -f`

- Make a Pull Request.

- Pull request will be accepted, merged and close by a reviewer.

- Remove your local feature branch if you're done.
最后记着删除本地分支
`git branch -d <branchname>`



参考文章 [project-guidelines](https://github.com/wearehive/project-guidelines)