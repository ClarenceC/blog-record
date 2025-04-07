---
title: JavaScript 无报错误访问深层属性方法
pubDate: 2019-02-04
tags: ['JavaScript', '访问 JavaScript 深层属性']
image: 
  url: ''
  alt: ''
author: 'Clarence.C'
description: '在开发的过程中，会经常访问深层 JavaScript 属性，这时如果其中一个属性会有断层， 控制台就会报错出现如下错误。如果一个程序没有兼容深层访问属性的错误，就会在后端一个未知错误的时候会报错，并且难已检测。'
---

## 访问 JavaScript 链式属性

在开发的过程中，会经常访问深层 JavaScript 属性，这时如果其中一个属性会有断层， 控制台就会报错出现如下错误。如果一个程序没有兼容深层访问属性的错误，就会在后端一个未知错误的时候会报错，并且难已检测。

<!-- more -->

```javascript
// TypeError: Cannot read property 'someProp' of undefined
```

### 1. 自定义方法判断。
- reduce

  reduce 听得多了其实 `reduce` 有很多种使用的方法.我们先了解一下 `reduce` 的用法.
  ```javascript
    Array.reduce(callback(previousValue, currentValue, index, array), [initialValue])
      - callback (执行数组中每个值的函数，包含四个参数)
        1. previousValue (上一次调用回调返回的值，或者是提供的初始值 (initialValue))
        2. currentValue (数组中当前被处理的元素)
        3. index (当前元素在数组中的索引)
        4. array (调用reduce的数组)
      - initialValue (作为第一次调用 callback 的第一个参数)
  ```

那我们现在使用 `reduce` 来遍历对像属性，原理是从初始属性，遍历每一层属性再返回上一层属性，如果属性不存在则返回 null。

  ```javascript
    const props = {
        user: {
            posts: [
                { title: 'Foo', comments: [ 'Good one!', 'Interesting...' ] },
                { title: 'Bar', comments: [ 'Ok' ] },
                { title: 'Baz', comments: []}
            ],
            comments: ['1','2','333']
        }
    }
    const get = (p, o) =>  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null,  o)
    console.log(get(['user', 'posts', 0, 'comments'], props))
    console.log(get(['user', 'post', 0, 'comments'], props))
  ```

- 递归手动实现

```javascript
    function deepGet (obj, properties, defaultValue) {
        if (!obj) { return defaultValue }
        if (properties.length === 0) { return obj }
        var foundSoFar = obj[properties[0]]
        var remainingProperties = properties.slice(1)

        return deepGet(foundSoFar, remainingProperties) // 递归
    }
    console.log(deepGet(props, ['user', 'comments', 2], {})) // 333
    console.log(deepGet(props, ['user', 'posts', 1, 'title'], {})) // Bar
```

### 2. 引入函数工具类

- **lodash**

```javascript
import { get } from 'lodash'
get(props, ['user', 'posts', 1, 'title'], {})) // Bar
```
看了一下 lodash 的 get 实现原理.和上面实现的方法很像

```javascript
// lodash Get 实现
function get(object, path, defaultValue) {
    const result = object == null ? undefined : baseGet(object, path)
    return result === undefined ? defaultValue : result
}

// baseGet
function baseGet(object, path) {
    path = castPath(path, object) // 投入的路径转为 path 数组

    let index = 0
    const length = path.length
    while(object != null && index < length) { // 循环获取对象下一层属性
        object = object[toKey(path[index++])] // toKey函数转换为可读的属性值
    }
    return (index && index == length) ? object : undefined // index 存在且遍历完全部的时候,返回 object 的值否则为 undefined
}
```
- **Ramda**

```javascript
const getUserComments = R.path(['user', 'posts', 0, 'comments'])

getUserComments(props) // ['Good one!', 'Intersting...']
getUserComments({}) // []
```

## 文章延伸

- [如何优雅安全地在深层数据结构中取值](https://zhuanlan.zhihu.com/p/27748589)

- [Making Deep Property Access Safe in JavaScript](http://adripofjavascript.com/blog/drips/making-deep-property-access-safe-in-javascript.html)

- [无报错链式取值的几种方法](https://zhuanlan.zhihu.com/p/29296692)

- [Safely Accessing Deeply Nested Values In JavaScript](https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a)