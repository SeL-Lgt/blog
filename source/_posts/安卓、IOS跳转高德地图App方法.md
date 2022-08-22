---
title: 安卓、IOS跳转高德地图App方法
date: 2022-07-22
updated: 2022-07-22
tags: 通用工具
categories: 通用工具
---
安卓、IOS跳转高德地图App方法，核心代码与注意事项。
<!-- more -->
## 准备工作

- 需要原生安卓解除跳转第三方APP限制。否则会出现下面报错提醒：

  ![image-20220729160249278](image-20220729160249278.png)

- 防抖函数。限制用户多次点击跳转。

```js
/**
 * 防抖函数
 */
function debounce(func, wait, immediate = true) {
  let context = this;
  let args = arguments;

  if (this.timeOut) clearTimeout(this.timeOut);
  if (immediate) {
    let callNow = !this.timeOut;
    this.timeOut = setTimeout(() => {
      this.timeOut = null;
    }, wait)
    if (callNow) func.apply(context, args)
  } else {
    this.timeOut = setTimeout(function () {
      func.apply(context, args)
    }, wait);
  }
}
```

## 主要代码

### 调用函数

```js
/**
 * type - baidu 百度
 *      - gaode 高德
 */
function toAdd(type) {
  // window.corMPortal.openNavigation(
  //   JSON.stringify({
  //     longitude: this.device_info.longitude,
  //     latitude: this.device_info.latitude,
  //     address: this.device_info.address,
  //   })
  // );
  this.debounce(() => this.chooseMap(type), 1000)
}
```

### 选择地图

```js
/**
 * 选择地图
 * type - baidu 百度
 *      - gaode 高德
 */
function chooseMap(type) {
  const {latitude, longitude, address} = this.device_info
  switch (type) {
    case 'gaode': {
      console.log('gaode');
      this.gaodeMap({
        latitude,
        longitude,
        address
      })
      break;
    }
    case 'baidu': {
      console.log('baidu');
      this.baiduMap({
        latitude,
        longitude,
        address
      })
      break;
    }
  }
}
```

### 高德地图

```js
/**
 * longitude 经度
 * latitude 纬度
 * address 地名
 */
function gaodeMap({latitude, longitude, address}) {
  const location = `?sourceApplication=appname&poiname=${address}&lat=${latitude}&lon=${longitude}&dev=0`
  switch (this.UA) {
    case "Android": {
      window.location.href = `androidamap://viewMap` + location;
      break;
    }
    case "iPhone" : {
      window.location.href = `iosamap://viewMap` + location;
      break;
    }
    default: {
      console.log("PC");
    }
  }

  //判断是否切出浏览器
  setTimeout(function () {
    let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
    if (typeof hidden == "undefined" || hidden == false) {
      //应用宝下载地址
      window.location.href = `https://uri.amap.com/marker?position=${longitude},${latitude}`;
    }
  }, 1000);
}
```

### 百度地图

```js
/**
 * longitude 经度
 * latitude 纬度
 * address 地名
 * 百度和高德地图经纬度传参顺序相反
 */
function baiduMap({latitude, longitude, address}) {
  const location = `?location=${latitude},${longitude}&title=${address}&content=${address}&src=linjiyun`
  switch (this.UA) {
    case "Android": {
      window.location.href = 'bdapp://map/marker' + location
      break;
    }
    case "iPhone" : {
      window.location.href = 'baidumap://map/marker' + location
      break;
    }
    default: {
      console.log("PC");
    }
  }
  /**
   * 由于百度地图跳转APP后，会在后台执行剩余代码
   * 通过定时器跳转H5页面
   * 通过监听是否处于在当前页面，移除定时器
   * @type {number}
   */
  let goH5 = setInterval(function () {
    let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
    if (typeof hidden == "undefined" || hidden == false) {
      //应用宝下载地址
      window.location.href = `http://api.map.baidu.com/marker${location}&output=html`;
    }
  }, 1000);
  let hiddenProperty = 'hidden' in window.document ? 'hidden' :
    'webkitHidden' in window.document ? 'webkitHidden' :
      'mozHidden' in window.document ? 'mozHidden' :
        null;
  let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
  let onVisibilityChange = function () {
    if (!document[hiddenProperty]) {
      clearInterval(goH5)
    }
  }
  window.document.addEventListener(visibilityChangeEvent, onVisibilityChange);
}
```

## 参考资料

[H5页面唤醒高德地图|百度地图App](https://blog.csdn.net/weixin_40224916/article/details/105268120)

[html5唤起高德,h5页面唤醒百度高德地图](https://blog.csdn.net/weixin_39609071/article/details/118272736)

[H5 如何唤起百度地图 App](https://blog.csdn.net/weixin_34186128/article/details/88679326?utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-4.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-4.no_search_link)
