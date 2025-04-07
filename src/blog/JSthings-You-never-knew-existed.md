---
layout: drafts
title: 你不知道的JS
tags: ["JavaScript"]
categoriess: JavaScript
comments: true
pubDate: 2018-03-09
image:
  url: ""
  # url: "/JSthings-You-never-knew-existed/clem-onojeghuo-200300.jpg"
  alt: ""
author: "Clarence.C"
description: "我已经看过了全部的 MDN 文档及其它 JS API 文档发现很少有说明使用这些JS功能的文档，所以列出这样的一个列表把有用你所不知道JS功能列出来。"
---

> 原文链接: [JS things I never knew existed](https://air.ghost.io/js-things-i-never-knew-existed/)
> 原文作者: [Nick](https://air.ghost.io/author/skyllo/)
> 译者： [ClarenceC](fe2x.cc)
> 本文为意译

我已经看过了全部的 MDN 文档及其它 JS API 文档发现很少有说明使用这些JS功能的文档，所以列出这样的一个列表把有用你所不知道JS功能列出来。

<!-- More -->

# Label Statements (Label 语句)

(译者注：高程红本子就有说怎样使用啊)

你能使用 `label 语句声明` 来跳出循环，或者跳到特定的语句下面，这语句其实是底层语言衍生出来的，使用场景还是有的，比如 `break` 和 `continue` 只是跳出内部循环，继续内部循环， `label`能跳出多层，可以到你想要到的地方上面。

```javascript
// labeling "loopOut"
loopOut: for (let i = 0; i < 3; i++) {
  // labeling "loopIn"
  loopIn: for (let j = 0; j < 3; j++) {
    if (i === 1) {
      continue loopOut;
    }
    console.log(`i = ${i}, j = ${j}`);
  }
}

// 输出结果跳过了 i 等 1 的情况

/*
 * # Output
 * i = 0, j = 0
 * i = 0, j = 1
 * i = 0, j = 2
 * i = 2, j = 0
 * i = 2, j = 1
 * i = 2, j = 2
 */
```

这是另一个例子，使用 `break` 阻止执行。

```javascript
foo: {
  console.log("one");
  break foo;
  console.log("this log will not be executed");
}
console.log("two");

/*
 * # Output
 * one
 * two
 */
```

# `void` 操作符

之前我认为看过所有的操作符直到看到这个是出现在 1996 年的 JS里面的操作符，全部浏览器都兼容，而且容易理解。

> `void` 操作符去计算给定的表达式和返回 undefined 值。—— MDN

它允许 IIFE 立即执行函数写成这样。

```javascript
void (function run() {
  console.log("hello");
})()(
  // 等同于
  function run() {
    console.log("hello");
  },
)();
```

`void` 操作符的函数式的返回值是 `underfined`

```javascript
const word = void (function run() {
  return "hello";
})();
// word is "undefined"

const word = (function run() {
  return "hello";
})();
// word is "hello"
```

你也能把 `void` 用在 `async` 函数上面, 你可以把它作为你的异步代码的入口：

```javascript
void (async function () {
  try {
    const response = await fetch("air.ghost.io");
    const text = await response.text();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
})()(
  // 等同于

  async () => {
    try {
      const response = await fetch("air.ghost.io");
      const text = await response.text();
      console.log(text);
    } catch (e) {
      console.error(e);
    }
  },
)();
```

# 逗号操作符(,)

在阅读过关于逗号操作符的文章后，我发现我并不是真的意识到它的原理，下面是引用至 MDN的解释：

> 逗号操作符从左到右计算每一个它的操作数，之后返回最后一个操作数的值 ——— MDN

```javascript
function myFunc() {
  let x = 0;
  return (x += 1), x; // 1 从左到右计算操作值 x = ++x,之后返回 x
}

(y = false), true; // 在浏览器控制台直接输出会返回 true
console.log(y); // 返回 false ,因为是判断了

z = (false, true); // 浏览器控制台返回 true
console.log(z); // 返回 true ,因为 (false,true) 这个表达式计算出来这个结果为 true
```

## 答配条件操作符使用 (`condition ? true : false`)

逗号操作符会返回最后的值给条件，所以你能在返回值之前做什么操作，下面例子我输出了 `console log` 在返回布尔值之前。

```javascript
const type = "man";
const isMale =
  type === "man"
    ? (console.log("Hi Man!"), true)
    : (console.log("Hi Lady!"), false);

console.log(`isMale is "${isMale}"`); // isMale is "true"
```

(译者注：译者觉得逗号操作符写进函数可能功效更大啊 )

# 国际化 API

国际化是很难在最正确的时候去做的，幸运的时候现在大部分的浏览器都提供了很好的 API 接口，一个我最喜欢的功能是其中的日期格式功能，看下面的例子。

```javascript
const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const formatter1 = new Intl.DateTimeFormat("es-es", options);
console.log(formatter1.format(date)); // 8 de marzo de 2018

const formatter2 = new Intl.DateTimeFormat("es-us", options);
console.log(formatter2.format(date)); // March 8, 2018
```

# 管道操作符(|>)

在写这文章的时候这个功能只提供在 Firefox 58+ 后面的版本里，无论怎样 Babel 已经有为些提议插件 plugin 了，在[这里](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-pipeline-operator),看上去会激动人心我喜欢。

```javascript
const square = (n) => n * n;
const increment = (n) => n + 1;

// without pipeline operator
square(increment(square(2))); // 25

// with pipeline operator
// 译者试了一下 Chrome 下面还不能使用
2 |> square |> increment |> square; // 25
```

# 值得注意的东西

## 原子性

当数据在多线程里面共享的时候，原子操作符可以提供到一个可预测性阅读和编写，在下一个执行完成之前会等其它操作完成。这是在异步里面保留数据是非常有用的，就像主线程和其它 Webworker一样工作。
我真的非常喜欢原子性在其它语言当中比如 JAVA, 我觉得将来应该更多的使用在 JS 中，我们才有更多的机会去使用 WebWorkers 将主线程上面的操作移出来。

## Array.prototype.reduceRight

好吧，这个我没有看过的原因是，使用基础的方法 `Array.prototype.reduce()` + `Array.prototype.reverse()` 来做扁平化，这很少情况会这样使用的，不过如果你遇到这情况用 `reduceRight` 是非常之合适的。

```javascript
// 扁平化数组
const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduceRight(function (a, b) {
  return a.concat(b);
}, []);

// flattened 输出数组 [4,5,2,3,0,1]
```

## setTimeout() 参数

知道这个方法后，我可能会救到自己 1~2 个，尝试用 `.bind(...)` 去给与 `setTimeout` 参数。

```javascript
setTimeout(alert, 1000, "Hello world!");
/*
 * 一秒后，弹出 alert框 显示 Hello World!
 */

function log(text, textTwo) {
  console.log(text, textTwo);
}
setTimeout(log, 1000, "Hello World!", "And Mars!");
/*
 * Hello World! And Mars!
 *
 */
```

## HTMLElement.dataset

在之前我也会使用自定义 data 属性 `data-*` 在 HTML elements 上面，但是我并没有意识到在 API 查询他们是非常容易的，除止之外一些小量的命名约束像下面的，破折号名命属性和但当在 JS 里面查询他们的时候是使用驼峰式的，所以属性 `data-birth-planet` 在 JS 里面应该写成 `birthPlanet`

`<div id="person" data-name='john' data-birth-planet='earth'></div>`

查询语句

```javascript
let personEl = document.querySelector("#person");
console.log(personEl.dataset); // DOMStringMap {name: "john", birthPlanet: "earth"}
console.log(personEl.dataset.name); // john
console.log(personEl.dataset.birthPlanet); // earth

// 你还能添加更多
personEl.dataset.foo = "bar";
console.log(personEl.dataset.foo); // bar
```

# 最后

希望你能在这份列表上面学习到一些新的东西，像我之前一样。最后希望 Mozilla 的新 MDN 站点快点出来，新站点看上去非常之不错。现在我阅读旧的 MDN 比我想像中更耗时间。
