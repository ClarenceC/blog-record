---
title: node-sass安装遇到的问题
pubDate: 2017-07-08
categories: ops
tags: ["工具"]
image:
  url: ""
  alt: ""
author: "Clarence.C"
description: "项目需要使用node-Sass,一 npm install 就报错了, ` npm install node-sass --save-dev` 这么简单都报错,于是细心看了一下,原来是跟node-gyp 有关,发现一层又一层的底层安装,我的是window 端,总结一下错误情况如下:"
---

<!-- more -->

## node-gyp

> ` $ npm install -g node-gyp`

安装 node-gyp ,需要安装不同的依赖如下

### **On Unix**

- python (v2.7 recommended, v3.x.x is not supported)
- make
- A proper C/C++ compiler toolchain, like GCC

### **On Mac OS X**

- python (v2.7 recommended, v3.x.x is not supported) (already installed on Mac OS X)
- Xcode
  - You also need to install the Command Line Tools via Xcode. You can find this under the menu Xcode -> Preferences -> Downloads
  - This step will install gcc and the related toolchain containing make

### **On Windows**

**Option 1**

Install all the required tools and configurations using Microsoft's windows-build-tools using npm install --global --production windows-build-tools from an elevated PowerShell or CMD.exe (run as Administrator).

Option 2

Install tools and configuration manually:

- Visual C++ Build Environment:

  - Option 1: Install [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the Default Install option.

  - Option 2: Install [Visual Studio 2015](https://www.visualstudio.com/products/visual-studio-community-vs) (or modify an existing installation) and select Common Tools for Visual C++ during setup. This also works with the free Community and Express for Desktop editions.

> 💡 [Windows Vista / 7 only] requires .NET Framework 4.5.1

- Install Python 2.7 (v3.x.x is not supported), and run ` npm config set python python2.7` (or see below for further instructions on specifying the proper Python version and path.)

- Launch cmd, ` npm config set msvs_version 2015`

If the above steps didn't work for you, please visit Microsoft's Node.js Guidelines for Windows for additional tips.

If you have multiple Python versions installed, you can identify which Python version node-gyp uses by setting the '--python' variable:

` $ node-gyp --python /path/to/python2.7`
If node-gyp is called by way of npm and you have multiple versions of Python installed, then you can set npm's 'python' config key to the appropriate value:

` $ npm config set python /path/to/executable/python2.7`
Note that OS X is just a flavour of Unix and so needs python, make, and C/C++. An easy way to obtain these is to install XCode from Apple, and then use it to install the command line tools (under Preferences -> Downloads).

### 总结来说:

**Windows** 安装 **node-gyp** 需要安装依赖

- python2.7 并安装前设置 `npm config set python python2.7`
- 2005Visual C++ Build Tools 并安装前设置 `npm config set msvs_version 2015`

## node-sass

在安装**node-sass**通常情常下都会卡着，因为安装的过程需要到墙外下载二进制包。可以有三种方法安装

一，使用梯子安装

这不详细解释了。

二，使用淘宝镜像或者cnpm

[淘宝镜像网址](https://npm.taobao.org/)

三，因为是二进制包卡，所以可以去官网根据版本号、系统环境，选择下载 **.node** 单独下载：

[https://github.com/sass/node-sass/releases](https://github.com/sass/node-sass/releases)

安装时，添加上你的本地安装地址.

`npm install node-sass sass_binary_path=C:/node-sass/darwin-x64-48_binding.node`

or

```
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
npm install node-sass

```

or

`npm uninstall node-sass && npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/`

那就可以了。

错误情况一:

```
Error: Can't find Python executable "python", you can set the PYT
HON env variable.
```

缺少安装 python 看上面依赖安装

错误情况二:

```
MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”
```

缺少安装 Visual C++ 组件 上面安装连接

错误情况三:

```
fatal error LNK1107: invalid or corrupt file: cannot read at 0xB8790
```

The error message suggests, that you have linked against **.dll instead of **.lib. One always has to link against the lib file and copy the dll to a place where it can be found at runtime

[cannot read at 0x2B0](https://stackoverflow.com/questions/35916703/error1-error-lnk1107-invalid-or-corrupt-file-cannot-read-at-0x2b0)

错误情况四:

```
Error: ENOENT: no such file or directory, scandir '**/node_modules/node-sass/vendor'

```

得重新 rebuild `npm rebuild node-sass`

## 参考文章 :

[MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe".](https://github.com/nodejs/node-gyp/issues/307#issuecomment-240556824)
[node-gyp github](https://github.com/nodejs/node-gyp)
[npm install sass-loader --save-dev 总是失败](https://segmentfault.com/q/1010000004137785/a-1020000004139336)
[“Can't find Python executable…” - npm install hangs](https://stackoverflow.com/questions/29368205/cant-find-python-executable-npm-install-hangs)
[Running Python on Windows for Node.js dependencies](https://stackoverflow.com/questions/15126050/running-python-on-windows-for-node-js-dependencies)
[npm install socket.io 提示缺少“VCBuild.exe”，一定要装VS C++吗？](https://cnodejs.org/topic/510a98acdf9e9fcc58ee157b)
[安装 node-sass 的正确姿势](https://github.com/lmk123/blog/issues/28)
[node-sass 安装卡在 node scripts/install.js 解决办法](https://segmentfault.com/a/1190000005921721)
[node-sass compile time missing folder](https://github.com/davezuko/react-redux-starter-kit/issues/791)
[node-sass 安装失败的解决办法](https://lzw.me/a/node-sass-install-helper.html)
