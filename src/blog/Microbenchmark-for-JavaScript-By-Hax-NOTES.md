---
title: D2 贺老 JavaScript Microbenchmark 测试的总结
pubDate: 2018-02-04
tags: ["JavaScript", "Microbenchmark"]
categories: JavaScript
comments: true
image:
  url: ""
  # url: "Microbenchmark-for-JavaScript-By-Hax-NOTES/WechatIMG149.jpeg"
  alt: "hax note"
author: "Clarence.C"
description: "虽然未能去到阿里巴巴 D2 前端盛会，但是在过后的回放当中也总结到了不少的东西，这篇文章是总结贺大 [Johnhax](http://johnhax.net/) 的关于 **Microbenchmark For JavaScript** 的性能测试演讲。"
---

# 背景

虽然未能去到阿里巴巴 D2 前端盛会，但是在过后的回放当中也总结到了不少的东西，这篇文章是总结贺大 [Johnhax](http://johnhax.net/) 的关于 **Microbenchmark For JavaScript** 的性能测试演讲。

<!-- more -->

# 知识点

## 什么叫 Microbenchmark

中文意思是微基准测试，其实的意思是在 JavaScript 一个很大的应用当前，每个应用都会有一个性能指标，而最小单位的性能测试就是 Microbenchmark， 简单点的说就是以代码段为单位的性能测试，简单到一段代码或者一个语句。

## 不要猜，要测！

一整个应用测试很多时候并不准确，因为容易受到很多外来因素的影响，有经验的程序员很多时候都会靠经验来进行性能优化，经验有时候不一定靠谱，技术和引擎都更新得很快，所以不要猜，要测！**Measure, don't guess!**

## 基本思路

重复跑待测代码块若干次，并且确保误差小于给定值。统计学，置信区间。

## benchmark.js

github 上面的测量包 benchmark.js
缺点：

1. 跑起来很慢。
2. 没有使用到 performance.now()。
3. benchmark.js 在node 上测量会比较好，在 Web 上测试比较少。
4. 比较多的参数调节。

# Microbenchmark 测试方法

### 1. `console.time`

```javascript
console.time();
// code...
console.timeEnd();
```

缺点:

1. 结果不稳定, 多次测试后，代码运行速率会根据 JavaScript 引擎和操作系统线程有关系，比如 JavaScript 引擎的 JIT 和操作系统的抢占式多任务。
2. 不能多测试平均测试数据。

## API：

### `Date.now()` (ES5+)

```javascript
Date.now();
// code
Date.now();
```

缺点：

1. 精度只有 1ms,无法测量 1ms 以下的时间间隔。
2. 有测量误差 正负20%误差。至少跑100 ms，才能减少误差。

### `new Date().getTime()` (ES3+)

```javascript
new Date().getTime();
// code
new Date().getTime();
```

缺点：

1. 精度只有 1ms。
2. 精度可能更低（15.625ms），这是由于系统Hz引起的。

要跑时间更长才能减少误差，**1.5s 正负 1%**

### `performance.now()`

performance.now 是专门用来做性能测试的，也是返回 ms 级，跟当前时间没关联,是单调递增的函数。

```javascript
performance.now();
// code
performance.now();
```

精度达到 5us (5微秒) us = 1000 ms

## Nodejs

### `process.hrtime()` 返回 `[seconds, namoseconds]`

process.hrtime 也是专门用来做性能测试的，也是跟当前时间没有关联。
精度不低于100ns.

# 总结

Microbenchmark JavaScript 测试除了方法的使用和精度外，还包一些统计学上的原理，比如 平均值 置信区间等，测量的时候要利用好方法和环境去对比性能测试，才能更准更有效。
