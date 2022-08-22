---
title: css字体引入与压缩
date: 2021-07-21
updated: 2021-07-21
tags: CSS
categories: CSS
---
关于 css3 中如何引用特殊字体，不同字体文件格式区别，如何生成不同类型的字体文件方法，以及如何减少字体文件大小从而提高加载速率。
<!-- more -->
## 本文简要

关于 css3 中如何引用特殊字体，不同字体文件格式区别，如何生成不同类型的字体文件方法，以及如何减少字体文件大小从而提高加载速率。

- 基本的语法使用
- 字体格式及使用范围
- 生成不同字体文件的方法
- 减少用户加载字体文件的大小

## @font-face 的基本语法

```css
@font-face {
  font-family: <<name>>;/*用户自定义字体名字*/
  src: <url>[<format>],[<url>[<format>]]; /*可以有多个路径*/
  /* 可选择参数
    font-weight: <weight>;
    font-style: <style>;
  */ ];
}
```

## 字体格式及使用范围

在上诉代码中`format`为自定义字体格式，主要用来帮助浏览器识别。

字体格式：

- **.ttf 格式:** `适用所有主流浏览器`
- **.otf 格式:** `不兼容IE浏览器`
- **.woff 格式** `web字体中最佳格式，但不支持手机端`
- **.eot 格式:** `IE专用字体，IE4可以使用`
- **.svg 格式:** `更多照顾ios端`
除了.eot 格式外，其他字体格式最低需求`IE9 以上`

通用模板

```css
@font-face {
  font-family: "youfont";
  src: url("youfont.eot"); /*IE9*/
  src: url("youfont.eot?#iefix") format("embedded-opentype"), 
       url("youfont.ttf") format("truetype"), /*手机端*/ 
       url("youfont.woff") format("woff"), /*web端*/
       url("youfont.svg") format("svg"); /*ios*/
}
```

## 如何生成其他格式的字体文件

一般从网上下载下来的字体文件大多数为`.ttf`格式，这时我们需要对他进行一个字体格式的转换。
可通过以下网址进行获取,连同相应的 css 文件：
[https://www.fontsquirrel.com/tools/webfont-generator](https://www.fontsquirrel.com/tools/webfont-generator)
以下为使用流程
![a](1.png)
![a](2.png)
下方**红色标注的选项**记得勾上（懒得截图了）
**别用迅雷下载 容易出现压缩包为 0kb 的情况**

## 减少用户加载字体文件的大小

一些特殊字体文件往往有 6M 以上,而一个网页除去图片后可能只有 1-2M 的大小,而特殊字体一般情况我们只会用到十几个字甚至只有标题三四个字，那这时候我们引入一个完整的字体文件就显得特别浪费。
针对上诉这种情况，可以考虑使用`font-spider`（[字蛛官网](http://font-spider.org/)）

需要提前安装好 NodeJS

```Linux
<!-- 安装字蛛插件 -->
npm install font-spider -g
<!--
    运行font-spider命令
    页面所依赖的字体将被重新打包，原本的.ttf字体会备份
-->
font-spider *.html

```

![3](3.png)
如图会发现，原本的 2MB 的字体文件会重新成只有 4kb 的字体文件。
此方法能够减少用户的加载时间，但如果文字内容更换则需要重新打包，建议用在网站名字等不常更改的地方。
