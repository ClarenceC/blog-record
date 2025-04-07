---
title: CSS 怎样居中(全)
pubDate: 2017-08-13
categories: css
tags: ['css', '居中', 'div', '垂直居中']
image: 
  url: ''
  alt: ''
author: 'Clarence.C'
description: '居中问题一直困扰着我们,无论什么类型的网站,页面或者是手机端都会存在各种元素居中的问题.所以作者总结一下各路大神分享出来的各种CSS DIV居中方案.嗯,那么我们直接进入正题吧.'
---

# 前言
居中问题一直困扰着我们,无论什么类型的网站,页面或者是手机端都会存在各种元素居中的问题.所以作者总结一下各路大神分享出来的各种CSS DIV居中方案.嗯,那么我们直接进入正题吧.

<!-- more -->

# 居中的解决方案
居中的时候,首先你得分清楚你需要居中的这个元素和模块是什么类型,跟父类元素是什么关系,这有助于你快速选定你居中的CSS结构.

## 水平居中
### 行内或者类行内元素(比如文本和链接)
在块级父容器中让行内元素居中，只需使用 `text-align: center`, 这种方法可以使用在子元素`table/inline/inline-block/inline-table/inline/flex` 等类型的元素实现居中.

```css
.parent{
    text-align: center;
}
.child{
    display:table[inline-box];
}
```

### 1. 块级元素

块级元素比如div,如果已经有**固定宽度**.只需要设置margin-left 和 margin-right为 auto就可以了;
```css
.center-me {
     margin: 0 auto;
     [position: absolute; ]/*可选*/
}
```

### 2. 多个块级元素
如果让多个块级元素在同一水平线上居中,那么要修改它们的display值.
```css
    display: inline-block;
    display: flex;
```

### 3. 浮动居中
实在想不到,原来浮动都能居中.
```css
.parent{
    float:left;
    width:100%;
    overflow:hidden;
    position:relative;
}
.child{
    clear:left;
    float:left;
    position: relative;
    left:50%;/*整个分页向右边移动宽度50%*/
    text-align:center;
}
```

### 4. 绝对定位居中
如果使用绝对定位水平居中,需要知道**固定宽度**
```css
.ele {
	position: absolute;
	width: 宽度值;
	left: 50%;
	margin-left: -(宽度值/2);
}

```

**不知道宽度**
```css
.pagination {
  position: relative;
}
.pagination ul {
  position: absolute;
  left: 50%;
}
.pagination li {
  line-height: 25px;
  margin: 0 5px;
  float: left;
  position: relative;/*注意，这里不能是absolute，大家懂的*/
  right: 50%;
}
```

### 5.css3flex水平居中
```css
.parent{
    display: flex;
    justify-content: center; 
}
or
.parent{
    display: flex;
}
.child{
    margin: auto;
}
```

### 6.css3 fit-content实现水平居中

“fit-content”是CSS中给“width”属性新加的一个属性值，他配合margin可以让我轻松的实现水平居中的效果

```css
.pagination ul { 
    width: -moz-fit-content; 
    width:-webkit-fit-content; 
    width: fit-content; 
    margin-left: auto; 
    margin-right: auto; 
}
```

### 7.img图片div内居中
```css
img.display{
    display:block;
    margin-left: auto;
    margin-right: auto;
}
```

### 8.tablecell水平居中
```css
.parent{
    min-height:300px;
    display: table-cell;
    vertical-align: middle;
}
```

## 垂直居中
### 行内或者类行内元素(比如文本和链接)
#### 垂直居中单行
对于**知道高度**单行行内或者文本元素,只需为它们添加等值的 padding-top 和 padding-bottom 就可以实现垂直居中:
```css
.link{
    padding-top: 30px;
    padding-bottom: 30px;
}
```
或者当知道行高我们可以用下面这方式:
```css
.center-text-trick {
     height: 100px; 
     line-height: 100px; 
     white-space: nowrap;
}
```
#### 垂直居中多行
对于多行文本，同样可以使用等值 padding-top 和 padding-bottom 的方式实现垂直居中。
如果你在使用过程中发现这种方法没见效，那么你可以通过 CSS 为文本设置一个类似 table-cell 的父级容器，然后使用 vertical-align 属性实现垂直居中.

```css
  <div style="display:table-cell;">
        <div style="vertical-align:middle;"></div>
  </div>
```

此外，你还可以使用 flexbox 实现垂直居中，对于父级容器为 display: flex 的元素来说,不过父级元素需要固定高度，它的每一个子元素都是垂直居中的.

```css
.flex-center-vertically{
    display:flex;
    justify-content: center;
    flex-direction: column;
    height: 400px;
}
```

如果父级元素没有固定高度,那么可以试一下用幽灵元素`ghost-center`.
```css
.ghost-center { 
    position: relative; 
} 
.ghost-center::before { 
    content: " "; 
    display: inline-block; 
    height: 100%; width: 1%; 
    vertical-align: middle; 
} 
.ghost-center p { 
    display: inline-block; 
    vertical-align: middle; 
}

```
#### 垂直居中块级元素
已知元素的高度 
```css
.parent { 
    position: relative;
} 
.child { 
    position: absolute; 
    top: 50%; 
    height: 100px; 
    margin-top: -50px; /* account for padding and border if not using box-sizing: border-box; */ 
}
```
未知元素的高度
```css
.parent { 
    position: relative;
} 
.child { 
    position: absolute; 
    top: 50%; 
    transform: translateY(-50%); 
}
```

css3 flex 方法实现
```css
.parent { 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
}
```

## 水平且垂直居中
### 宽高固定元素
设定父级容器为相对定位的容器，设定子元素绝对定位的位置 position: absolute; top: 50%; left: 50%，最后使用负向 margin 实现水平和垂直居中，margin 的值为宽高（具体的宽高需要根据实际情况计算 padding）的一半。
```css
.parent { 
    position: relative;
} 
.child { 
    width: 300px; 
    height: 100px; 
    padding: 20px; 
    position: absolute; 
    top: 50%; 
    left: 50%; 
    margin: -70px 0 0 -170px; 
}
```
### 宽高不固定元素
如果无法获取确定的宽高，同样需要设定父级容器为相对定位的容器，设定子元素绝对定位的位置 position: absolute; top: 50%; left: 50%。不同的是，接下来需要使用 transform: translate(-50%, -50%); 实现垂直居中

```css
.parent { 
    position: relative;
} 
.child { 
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
}
```

使用 transform 有一个缺陷，就是当计算结果含有小数时（比如 0.5），会让整个元素看起来是模糊的，一种解决方案就是为父级元素设置 transform-style: preserve-3d;

```css
.parent-element { 
    -webkit-transform-style: preserve-3d; 
    -moz-transform-style: preserve-3d; 
    transform-style: preserve-3d; 
} 
.element { 
    position: relative; 
    top: 50%; 
    transform: translateY(-50%); 
}
```

css3 flex 方法实现
使用 flexbox 实现水平和垂直居中，只需使用两条居中属性即可：
```css
.parent { 
    display: flex; 
    justify-content: center; 
    align-items: center; 
}
```

# 额外资讯
- 自动生成居中代码[How to center](http://howtocenterincss.com/)
- CSS居中完整[指南](https://www.w3cplus.com/css/centering-css-complete-guide.html)
- [Horizontally Centered Menus with no CSS hacks](http://matthewjamestaylor.com/blog/beautiful-css-centered-menus-no-hacks-full-cross-browser-support)
- [六种实现元素水平居中](http://www.w3cplus.com/css/elements-horizontally-center-with-css.html)
- [总结一些DIV居中的方法](https://github.com/simaQ/cssfun/issues/3)
- [How To Center Anything With CSS](https://codemyviews.com/blog/how-to-center-anything-with-css)
