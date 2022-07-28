---
title: css居中的几种方式以及选择情况(上)
date: 2021-08-10
updated: 2021-08-10
tags: CSS
categories: CSS
---
## 本文简介

在网页进行布局的时候,想要对模块进行水平、垂直居中，参考网上代码实施时，发现并不生效。

为了解决这种情况我们需要对此进行一些判断。
1. 居中的需求考虑
2. 对元素属性的判断
3. 是否已知高度

*本文代码只给出必要的，如非必要会注明*

## 水平居中---行内元素、块级元素

|          | 情况1    | 情况2    | 情况3    |
|:---------|:---------|:---------|:---------|
| 自身     | 行内元素 | 行内元素 | 块级元素 |
| 父级     | 块级元素 | 行内元素 | 块级元素 |
| 父级宽度 |          |          | 已知     |

### 情况一、情况二

**情况一**自身为行内元素，父级为块级元素。

**情况二**父级不是块级元素，则转换成块级元素。

```html
<style>
   #father{
      /*
        父级不是块级元素时
        display: block;
      */
      text-align: center;
   }
</style>

<div id="father">
  <span id="son">行内元素</span>
</div>
```

### 情况三

**情况三**自身为块级元素，已知父级宽度

```html
<style>
    #father {
      width: 600px;
      height: 300px;
      background-color: red;
    }
    #son{
      margin: 0 auto;
      background: blue;
    }
</style>

<div id="father">
  <div id="son"></div>
</div>
```

## 水平居中---使用定位属性position

|          | 情况4    | 情况5    |
|:---------|:---------|:---------|
| 自身     | 绝对定位 | 绝对定位 |
| 父级     | 相对定位 | 相对定位 |
| 自身宽度 | 已知     | 未知     |

### 情况四、情况五

**前提**父级元素绝对定位，自身元素绝对定位，设置自身元素的`left:50%`

**情况四**使用`margin-left:自身宽度一半`或`transform:translateX(-50%)`

**情况五**使用`transform:translateX(-50%)`

*`transform:translateX(-50%)`的适用情况更广*

```html
<style>
    #father {
      position: relative;
      width: 600px;
      height: 300px;
      background-color: red;
    }
    #son {
      width: 100px;
      height: 100px;
      background-color: blue;
      position: absolute;
      left: 50%;
      /*已知自身宽度可使用
        margin-left:50px
       */
      transform: translateX(-50%);
    }
</style>
 
<div id="father">
  <div id="son">sss</div>
</div>
```

## 水平居中---使用flexbox布局

父级元素添加属性：`display:flex;justify-content: center;`

```html
 <style>
    #father {
      width: 600px;
      height: 300px;
      background-color: red;
      display: flex;
      justify-content: center;
    }
    #son {
      background-color: blue;
    }
 </style>
 
 <div id="father">
  <div id="son">sss</div>
</div>
```

