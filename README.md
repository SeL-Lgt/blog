<!--
 * @Author: LGT
 * @Date: 2020-03-06 22:02:33
 * @LastEditors: LGT
 * @LastEditTime: 2020-03-06 22:18:07
 -->
# blog

vue+elementUi 博客

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## 博客结构

    | -- dist                                                      // 打包目录
    | -- src                                                       // 源码目录
    |    | -- api                                                  // API 接口
    |    | -- assets                                               // css 和图片资源
    |    | -- views                                                // 页面视图
    |    |    | -- Layout                                          // 布局组件
    |    |    |    | -- Header                                     // 通用头
    |    |    |    | -- Footer                                     // 页脚
    |    |    | -- Home                                            // 首页
    |    |    | -- Blog                                            // 博客模板
    |    |    | -- xxxx                                            // 等等
    |    | -- menu                                                 // 菜单
    |    | -- router                                               // 路由
    |    | -- config                                               // 应用配置
    |    | -- App.vue                                              // 页面入口文件
    |    | -- main.js                                              // 程序入口文件，加载各种公众组件
    | -- process.json                                              // 依赖配置文件
    | -- README.md                                                 // 说明文档
