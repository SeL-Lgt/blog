---
title: React+Antd国际化说明
date: 2022-07-10
updated: 2022-07-10
tags: 国际化
categories: 国际化
---
在antd海外项目中，进行文案替换方案示例。
<!-- more -->
## 目录

- [react-intl-universal插件介绍](#react-intl-universal插件介绍)
- [使用方法](#使用方法)
  - [安装](#安装)
  - [语言包准备](#语言包准备)
  - [初始化](#初始化)
  - [组件调用（仅供参考）](#组件调用（仅供参考）)
- [基本示例](#基本示例)
  - [无变量的消息](#无变量的消息)
  - [带有变量的消息](#带有变量的消息)
  - [复数消息转换](#复数消息转换)
  - [货币转换](#货币转换)
  - [显示日期](#显示日期)
  - [显示时间](#显示时间)
  - [默认消息](#默认消息)
  - [HTML消息](#HTML消息)

## react-intl-universal插件介绍

由阿里巴巴集团开发的 React 国际化包。

- 不仅可以在 React.Component 中使用，还可以在 Vanilla JS 中使用。
- 简单的。只有三个主要 API 和一个可选的帮助程序。
- 显示不同地区的数字、货币、日期和时间。
- 将字符串中的标签复数化。
- 支持消息中的变量。
- 支持消息中的 HTML。
- 支持 150 多种语言。
- 在浏览器和 Node.js 中运行。
- 消息格式由[ICU标准](http://userguide.icu-project.org/formatparse/messages)严格执行。
- 支持[嵌套 JSON 格式的](https://github.com/alibaba/react-intl-universal/releases/tag/1.4.3)区域设置数据。
- [react-intl-universal-extract](https://github.com/alibaba/react-intl-universal/tree/master/packages/react-intl-universal-extract)可帮助您轻松生成语言环境文件

## 使用方法

react-intl-universal详细教程请前往[官方文档](https://github.com/alibaba/react-intl-universal)查看
如引入antd组件相关国际化方案请前往[官方国际化教程](https://ant.design/docs/react/i18n-cn#header)查看

### 安装

```
npm install react-intl-universal --save
npm install events //引入event插件，用于消息监听
```

### 语言包准备

- 文件结构

  ```text
  | -- src
  |    | -- language
  |    |    | -- zh_CN							// 语言包存放文件夹（命名规则按照相应语言名字）
  |    |    |    | -- zh_CN.js					// 总体引入文件（被App.js引入）
  |    |    |    | -- common.js					// 通用翻译（常见）
  |    |    |    | -- components					// 公共组件的翻译文件夹
  |    |    |    |    | -- xxxx.js			    // 相关公共组件翻译文件
  |    |    |    | -- xxxxx						// 相关模块文件夹
  |    |    |    |    | -- xxxx.js			    // 相关模块翻译文件
  |    |    | -- en_US							// 语言包存放文件夹（命名规则按照相应语言名字）
  |    |    |    | -- en_US.js					// 总体引入文件（被App.js引入）
  |    |    |    | -- common.js					// 通用翻译（常见）
  |    |    |    | -- components					// 公共组件的翻译文件夹
  |    |    |    |    | -- xxxx.js			   	// 相关公共组件翻译文件
  |    |    |    | -- xxxxx						// 相关模块文件夹
  |    |    |    |    | -- xxxx.js			    // 相关模块翻译文件
  ```

- zh_CN.js（总体文件）

  ```js
  import login from "./login";
  
  export default ({
     login
  })
  ```

- login.js（相关模块文件）

  ```js
  const login={
    "username": "用户名"  // 请保证key是唯一的
  }
  
  export default login
  ```

### 初始化

- App.js

  ```js
  import React from 'react';
  import intl from "react-intl-universal";
  // 引入本地资源语言包
  import en_US from "./language/en_US/en_US";
  import zh_CN from "./language/zh_CN/zh_CN";
  // antd组件国际化方案
  import {ConfigProvider} from 'antd';
  import zhCN from 'antd/es/locale/zh_CN';
  import enUS from 'antd/es/locale/en_US';
  // 引入全局监听事件
  import eventsBus from "./utils/eventsBus";
  
  // 插件语言环境
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/zh.js');
  
  // 本地数据对象
  const locales = {
    "en-US": en_US,
    "zh-CN": zh_CN,
  };
  
  class App extends React.Component {
    state = {initDone: false, antdLang: zhCN}
  	
    constructor(props) {
      super(props);
      // 获取本地是否有语言偏好，如果无，获取浏览器优先级最高语言。
      // 兼容navigator.languages 不存在情况，默认语言为zh-CN
      let lang = localStorage.getItem('lang') || (navigator.languages[0] === 'zh-CN' ? 'zh-CN' : 'en-US') || 'zh-CN';
      // 消息监听语言变更事件
      eventsBus.on('changeLanguage', lang => this.loadLocales(lang))
      this.loadLocales(lang)
    }
  	
    // 语言初始化，antD同步变更语言
    loadLocales(lang = 'en-US') {
      // 存入语言偏好本地缓存中
      localStorage.setItem('lang', lang)
      intl.init({
        currentLocale: lang,
        locales,
      })
        .then(() => {
          this.setState({
            initDone: true,
            antdLang: lang === 'zh-CN' ? zhCN : enUS
          });
        });
     }
  
    render() {
      return (
        this.state.initDone &&
          <ConfigProvider locale={this.state.antdLang}>
  			....
  		</ConfigProvider>
      )
  }
  ```

- eventBus.js

  ```js
  import {EventEmitter} from 'events'
  
  export default new EventEmitter()
  ```

### 组件调用（仅供参考）

  ```js
  import React from 'react';
  import intl from "react-intl-universal";
  <!-- 语言切换需引入
  import eventsBus from "../../utils/eventsBus";
  -->
  
  class 组件名 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lang: localStorage.getItem('lang') || (navigator.languages[0] === 'zh-CN' ? 'zh-CN' : 'en-US') || 'zh-CN'
      };
    }
    // 切换语言
    changeLanguage(lang) {
      switch (lang) {
        case 'en-US':
          this.setState({
            lang: 'zh-CN'
          }, () => {
            // 消息发送
            eventsBus.emit('changeLanguage', this.state.lang)
          })
          return
        default:
          this.setState({
            lang: 'en-US'
          }, () => {
            // 消息发送
            eventsBus.emit('changeLanguage', this.state.lang)
          })
      }
    }
      
    render() {
    	const {lang} = this.state;
      return 
        <div>
            // 语言切换按钮
  		  <Button type="primary" onClick={this.changeLanguage.bind(this, lang)}>
              {lang === 'en-US' ? '中' : 'EN'}
            </Button>
            // 替换的语言
            <div>{intl.get('login.username')}</div>
  	  </div>
    }
  }
  ```

## 基本示例

react-intl-universal详细示例请前往[官方文档](https://github.com/alibaba/react-intl-universal)查看

### 无变量的消息

- 语言包示例

  ```json
  { "HELLO": "Hello" }
  ```

- 代码示例

  ```js
  intl.get('HELLO') // "Hello, Tony. Welcome to Alibaba!"
  ```

### 带有变量的消息

- 语言包示例

  ```json
  { "HELLO": "Hello, {name}. Welcome to {where}!" }
  ```

- 代码示例

  ```js
  intl.get('HELLO', { name: 'Tony', where: 'Alibaba' }) // "Hello, Tony. Welcome to Alibaba!"
  ```

### 复数消息转换

- 语言包示例

  ```json
  { "PHOTO": "You have {num, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}" }
  
  { "PHOTO": "You have {num, plural, =0 {该情况下被替换的文案} =1 {该情况下被替换的文案} other {# 其他文案}}" }
  ```

- 代码示例

  ```js
  intl.get('PHOTO', { num: 0 }); // "You have no photos."
  intl.get('PHOTO', { num: 1 }); // "You have one photo."
  intl.get('PHOTO', { num: 1000000 }); // "You have 1,000,000 photos."
  ```

### 货币转换

- 语言包示例

  ```json
  { "SALE_PRICE": "The price is {price, number, USD}" }
  ```

  语法格式为：{name, type, format}

  - **name**：消息中的变量名

  - **type**：number

  - **format**：值的显示格式（可选），如 `USD`

- 代码示例

  ```js
  intl.get('SALE_PRICE', { price: 123456.78 }); // The price is $123,456.78
  ```

### 显示日期

- 语言包示例

  ```json
  {
    "SALE_START": "Sale begins {start, date}",
    "SALE_END": "Sale ends {end, date, long}"
  }
  ```

  语法格式为：{name, type, format}

  - **name**：消息中的变量名

  - **type**：date

  - **format**：值的显示格式（可选）
    - `short` 显示尽可能短的日期
    - `medium` 显示月份的简短文本表示
    - `long` 显示月份的长文本表示
    - `full` 显示最详细的日期

- 代码示例

  ```js
  intl.get('SALE_START', {start:new Date()}); // Sale begins 4/19/2017
  intl.get('SALE_END', {end:new Date()}); // Sale ends April 19, 2017
  ```

### 显示时间

- 语言包示例

  ```json
  {
    "COUPON": "Coupon expires at {expires, time, medium}"
  }
  ```

  语法格式为：{name, type, format}

  - **name**：消息中的变量名

  - **type**：time

  - **format**：值的显示格式（可选）
    - `short` 以小时和分钟显示时间
    - `medium` 以小时、分钟和秒显示时间
    - `long` 显示带有小时、分钟、秒和时区的时间

- 代码示例

  ```js
  intl.get('COUPON', {expires:new Date()}); // Coupon expires at 6:45:44 PM
  ```

### 默认消息

- 语言包示例

  ```json
  { "HELLO": "Hello, {name}" }
  ```

- 代码示例

  ```js
  const name = 'Tony';
  intl.get('HELLO', { name }).defaultMessage(`Hello, ${name}`); // "Hello, Tony"
  
  // 简写
  const name = 'Tony';
  intl.get('HELLO', { name }).d(`Hello, ${name}`); // "Hello, Tony"
  
  // 嵌入html
  const name = 'Tony';
  intl.getHTML('HELLO').d(<div>Hello, {name}</div>) // React.Element with "<div>Hello, Tony</div>"
  ```

### HTML消息

- 语言包示例

  ```json
  { "TIP": "This is <span style='color:red'>HTML</span>" }
  ```

- 代码示例

  ```js
  intl.getHTML('TIP'); // {React.Element}
  ```

