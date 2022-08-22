---
title: css居中的几种方式以及选择情况(下)
date: 2021-08-13
updated: 2021-08-13
tags: CSS
categories: CSS
---
css居中的几种方式以及选择情况与代码示例。
<!-- more -->
## 本文简介

本文代码将讲述垂直居中、水平垂直同时居中的代码实现。

如果需要查看水平居中方式，请查看上文《css居中的几种方式以及选择情况（上）》

*由于我咕咕咕咕咕，你们试下后台回复**咕咕咕咕咕**会有点小帮助？*

## 垂直居中---表格布局方式

父级元素设置`display:table-cell`和`vertical-align:middle`

自身：行内元素、块级元素均可
```html
<style>
    #father {
      width: 600px;
      height: 300px;
      background: red;
      display: table-cell;
      vertical-align: middle;
    }
    #son {
      background-color: blue;
    }
</style>

<div id="father">
  <div id="son">我是单行的行内元素</div>
</div>
```
## 垂直居中---定位方式

|          | 情况一   | 情况二 (通用情况) |
|:---------|:---------|:------------------|
| 自身定位 | 绝对定位 | 绝对定位          |
| 父级定位 | 相对定位 | 相对定位          |
| 自身高度 | 已知     | 未知              |

**前提**父级相对定位，本身为绝对定位，设置子元素的`top:50%`。

情况一：已知高度，`margin-top: -自身高度一半;`

情况二（通用情况）：设置`transform: translateY(-50%)`;

```html
<style>
    #father {
      width: 600px;
      height: 300px;
      background: red;
      position: relative;
    }
    #son {
      position: absolute;
      top:50%;
      /*
        已知高度（情况一）
        margin-top: -50px;
      */
      /*通用情况*/
      transform: translateY(-50%);
      background-color: blue;
    }
</style>

<div id="father">
    <span id="son">行内或块级元素均可</span>
</div>
```
## 垂直居中---flexbox布局方式
块状父级元素设置： `display: flex; align-items: center;`
```html
<style>
    #father {
      width: 600px;
      height: 300px;
      background: red;
      display: flex;
      align-items: center;
    }
    #son {
      background-color: blue;
    }
 </style>
 
<div id="father">
  <span id="son">行内或块级元素均可</span>
</div>
```

## 水平垂直居中--已知高度

**前提**父级元素为相对定位，自身设为绝对定位，已知自身高宽。

方法一：`top: 0; right: 0; bottom: 0; left: 0; margin: auto;`

方法二：`left: 50%; top: 50%; margin-left: -自身宽度的一半px; margin-top: -自身高度的一半px;`
```html
<style>
    #father {
      width: 600px;
      height: 300px;
      background: red;
      position: relative;
    }
    #son{
      /*前提*/
      width:100px;
      height: 100px;
      position: absolute;
      background-color: blue;
    }
    #sonOne {
      /*方法一*/
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
    #sonTwo{
      /*方法2*/
      top: 50%;
      left: 50%;
      margin-left: -50px;
      margin-top: -50px;
    }
</style>

<div id="father">
  <div id="son sonOne">行内或块级元素均可</div>
  <div id="son sonTwo">行内或块级元素均可</div>
</div>
```
## 水平垂直居中--未知高度
###  方法一：使用定位
设置父级元素相对定位，自身绝对定位，自身属性：`left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);`
```html
<style>
    #father {
      width: 600px;
      height: 300px;
      background: red;
      position: relative;
    }
    #son {
      background-color: blue;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
</style>

<div id="father">
  <span id="son">行内或块级元素均可</span>
</div>
```
### 方法二：flex布局方式
设置父级元素为flex定位，父级属性：`justify-content: center; align-items: center;`
```html
<style>
    #father {
      width: 600px;
      height: 300px;
      background: red;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #son {
      background-color: blue;
    }
</style>
<div id="father">
  <span id="son">行内或块级元素均可</span>
</div>
```
