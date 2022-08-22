---
title: Vue国际化方案（Vue+MUI）
date: 2022-07-12
updated: 2022-07-12
tags: 国际化
categories: 国际化
---
在vue海外项目中，进行文案替换方案示例。
<!-- more -->
## 目录

- [vue-i18n介绍](#vue-i18n介绍)
  - [安装](#安装)
  - [语言包目录结构](#语言包目录结构)
  - [语言包文件示例](#语言包文件示例)
  - [初始化](#初始化)
  - [基本示例](#基本示例)
    - [基础使用](#基础使用)
    - [具名格式（带有变量名）](#具名格式（带有变量名）)
    - [列表方式（数组传参）](#列表方式（数组传参）)
    - [HTML格式化](#HTML格式化)
    - [复数（同一文案多种情况处理）](#复数（同一文案多种情况处理）)
    - [更多用法查看官网](https://kazupon.github.io/vue-i18n/zh/introduction.html)
  - [关于语言切换（非必要）](#关于语言切换（非必要）)
    - [Vuex模块文件--language.js](#Vuex模块文件--language.js)
    - [Vuex主文件引用](#Vuex主文件引用)
    - [组件调用](#组件调用)
  - [关于Vuex中文案替换](#关于Vuex中文案替换)
- [MUI国际化](#MUI国际化)
  - [前言](#前言)
  - [目录结构](#目录结构)
  - [MUI初始化](#MUI初始化)

## vue-i18n

### vue-i18n介绍

查看[官方文档](https://kazupon.github.io/vue-i18n/zh/introduction.html)

### 安装

```node
npm install vue-i18n
```

###  语言包目录结构

```text
| -- src
|    | -- language
|    |    | -- zh_CN				// 语言包存放文件夹（命名规则按照相应语言名字）
|    |    |    | -- zh_CN.js		// 总体引入文件（被 vue-i18n初始化文件 引入）
|    |    |    | -- common.js		// 通用翻译（常见）
|    |    |    | -- components		// 公共组件的翻译文件夹
|    |    |    |    | -- xxxx.js	// 相关公共组件翻译文件
|    |    |    | -- xxxxx			// 相关模块文件夹
|    |    |    |    | -- xxxx.js	// 相关模块翻译文件
|    |    | -- en_US				// 语言包存放文件夹（命名规则按照相应语言名字）
|    |    |    | -- en_US.js		// 总体引入文件（被 vue-i18n初始化文件 引入）
|    |    |    | -- common.js		// 通用翻译（常见）
|    |    |    | -- components		// 公共组件的翻译文件夹
|    |    |    |    | -- xxxx.js	// 相关公共组件翻译文件
|    |    |    | -- xxxxx			// 相关模块文件夹
|    |    |    |    | -- xxxx.js	// 相关模块翻译文件
|    | -- index.js					// vue-i18n初始化文件
```

### 语言包文件示例

- zh_CN.js（总体文件）

  ```js
  import login from "./login"; 
  
  export default ({
     login //小驼峰命名
  })
  ```

- login.js（相关模块文件）

  ```js
  const login={
    "UserName": "用户名"  // 请保证key是唯一的,大驼峰命名
  }
  
  export default login
  ```

  *PS:为了方便后续人员修改，文件名（模块名）为小驼峰命名，Key值为大驼峰命名。*

### 初始化

- index.js（Vue-i18n初始化文件）

  ```js
  import Vue from 'vue'
  import VueI18n from 'vue-i18n'
  import en_US from "./en_US/en_US";
  import zh_CN from "./zh_CN/zh_CN";
  
  Vue.use(VueI18n)
  
  const messages = {
    "en-US": {
      ...en_US
    },
    "zh-CN": {
      ...zh_CN
    }
  }
  
  export function getLanguage() {
    const lang=localStorage.getItem('lang') || (navigator.languages[0] === 'zh-CN' ? 'zh-CN' : 'en-US') || 'zh-CN'
    localStorage.setItem('lang',lang)
    return lang
  }
  
  const i18n = new VueI18n({
    locale: getLanguage(),
    messages
  })
  
  export default i18n
  ```

- main.js

  ```js
  import i18n from "./language";
  
  ...
  
  new Vue({
    ...
    i18n,
    render: h => h(app)
  }).$mount('#app')
  ```

### 基本示例

vue-i18n详细示例请前往[官方文档](https://kazupon.github.io/vue-i18n/zh/introduction.html)

#### 基础使用

- 语音包示例

  ```json
  { Hello: "Hello" }
  ```

- 代码示例

  ```js
  $t("Hello")
  ```

#### 具名格式（带有变量名）

- 语音包示例

  ```json
  { Hello: '{msg} world' }
  ```

- 代码示例

  ```js
  $t('hello', { msg: 'hello' }) // hello world
  ```

#### 列表方式（数组传参）

- 语音包示例

  ```json
  { Hello: '{0} world' }
  ```

- 代码示例

  ```js
  $t('hello', ['hello'])	// hello world
  ```

#### HTML格式化

- 语音包示例

  ```json
  { Hello: 'hello <br> world' }
  ```

- 代码示例

  ```vue
  <p v-html="$t('message.hello')"></p>
  <!--
  	hello
  	world
  -->
  ```

#### 复数（同一文案多种情况处理）

- 语音包示例

  ```json
   {
      car: 'car | cars | cars:',
      apple: 'no apples | one apple | {count} apples'
   }
  ```

- 代码示例

  ```js
  { $tc('car', 1) } // car
  { $tc('car', 2) } // cars
  { $tc('car', 3) } // cars:
  
  { $tc('apple', 0) } // no apples
  { $tc('apple', 1) } // one apple
  { $tc('apple', 10, { count: 10 }) } // 10 apple
  ```

### 关于语言切换（非必要）

通过Vuex进行管理，在组件中进行调用。

#### Vuex模块文件--language.js

```js
import {getLanguage} from "../../language";
import i18n from "../../language";

const state = {
  language: getLanguage()
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    localStorage.setItem("lang", language)
    i18n.locale=language
  },
}

const actions = {
  setLanguage({commit}, language) {
    commit("SET_LANGUAGE", language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

#### Vuex主文件引用

```js
import language from "./modules/language";// 国际化

export default new Vuex.Store({
      modules: {
          ...
		  language
      }
})
```

#### 组件调用

```vue
<template>
	<button @click="test">切换</button>
</template>
<script>
	 methods: {
         test(){
             const lang=this.$store.state.language.language==='zh-CN' ? 'en-US' : 'zh-CN'
             this.$store.commit("language/SET_LANGUAGE",lang)
         }
     }
</script>
```

### 关于Vuex中的文案替换 

- store/modules下的js文件

  ```js
  import lang from '../../language/index'
  
  // 原来
  name: '姓名',
  // 替换后
  name: lang.t("common.Edit"),
  ```

## MUI国际化

### 前言

由于mui框架是自身没有国际化，项目中是通过源码引入的方式，故可以通过修改源码的方式进行国际化。

但由于mui是通过原生JS构成，无法使用Vue源码，上文中vue-i18n方案并不能支持此处国际化。

根据vue-i18n的国际化原理，通过json格式的key值确定唯一性，通过改变value的方式进行当前偏好的显示。

**注意事项：**

1. 请先备份mui源文件，防止修改源码导致出现未知错误。
2. 由于mui在webpack构建前引入（可能？），导致babel还未加载，无法识别es6的import、export写法，请使用AMD写法引入国际化文件。
3. public下其余文件均可按此教程原理进行国际化。

### 目录结构

```text
| -- src
|    | -- public
|    |    | -- i18n.js							// 国际化文件
|    |    | -- mui.js							// 修改后的mui文件
|    |    | -- mui_back.js						// 备份原文件
```

### MUI初始化

- i18n.js

  ```js
  const lang = localStorage.getItem('lang') || (navigator.languages[0] === 'zh-CN' ? 'zh-CN' : 'en-US') || 'zh-CN'
  
  const en = {
    PullDownToRefresh: 'Pull down to refresh',
    RefreshImmediatelyAfterRelease: 'Refresh immediately after release',
    Refreshing: 'Refreshing...',
    PullUpToShowMore: "Pull up to show more",
    Loading: "loading...",
    NoMoreData: "No more data",
    Define: "Define",
    Point: "Point",
    Cancel: "Cancel",
    Confirm: "Confirm",
    DomError: "Missing container element when constructing numbox",
    Reset: "Reset",
    Year:"Year",
    Month:"Month",
    Day:"Day",
    Time:"Time",
    Minute:"Minute",
    EleError:"You need to specify element when you instantiate IndexedList",
    Sunday:"Sun",
    Monday:"Mon",
    Tuesday:"Tue",
    Wednesday:"Wed",
    Thursday:"Thu",
    Friday:"Fri",
    Saturday:"Sat",
  }
  
  const zh = {
    PullDownToRefresh: '下拉可以刷新',
    RefreshImmediatelyAfterRelease: '释放立即刷新',
    Refreshing: '正在刷新...',
    PullUpToShowMore: "上拉显示更多",
    Loading: "正在加载...",
    NoMoreData: "没有更多数据了",
    Define: "确定",
    Point: "提示",
    Cancel: "取消",
    Confirm: "确认",
    DomError: "构造 numbox 时缺少容器元素",
    Reset: "重置",
    Year:"年",
    Month:"月",
    Day:"日",
    Time:"时",
    Minute:"分",
    EleError:"实例 IndexedList 时需要指定 element",
    Sunday:"周日",
    Monday:"周一",
    Tuesday:"周二",
    Wednesday:"周三",
    Thursday:"周四",
    Friday:"周五",
    Saturday:"周六",
  }
  
  let init = function () {
    switch (lang) {
      case "zh-CN": {
        return zh
      }
      case "en-US": {
        return en
      }
    }
  }
  
  let local = init()
  
  module.exports = {local}	// AMD写法
  ```

- mui.js

  ```js
  var lang = require("./i18n-mui.js")		// AMD写法
  
  var mui = (
      ...
    	// 替换示例
      function (element, options) {
          this._super(element, $.extend(true, {
            scrollY: true,
            scrollX: false,
            indicators: true,
            deceleration: 0.003,
            down: {
              height: 50,
              contentinit: lang.local.PullDownToRefresh,		
              contentdown: lang.local.PullDownToRefresh,
              contentover: lang.local.RefreshImmediatelyAfterRelease,
              contentrefresh: lang.local.Refreshing
             /**
              原文案
              contentinit: '下拉可以刷新',
              contentdown: '下拉可以刷新',
              contentover: '释放立即刷新',
              contentrefresh: '正在刷新...'
             */
            },
            up: {
              height: 50,
              auto: false,
              contentinit: lang.local.PullUpToShowMore,
              contentdown: lang.local.PullUpToShowMore,
              contentrefresh: lang.local.Loading,
              contentnomore: lang.local.NoMoreData,
              /**
              原文案
              contentinit: '上拉显示更多',
              contentdown: '上拉显示更多',
              contentrefresh: '正在加载...',
              contentnomore: '没有更多数据了',
              */
              duration: 300
            }
          }, options));
  )
  ```

  
