---
title: 为hexo next 添加打赏功能
pubDate: 2017-08-03
categories: ops
tags: ['hexo', 'next', 'reward_comment']
image: 
  url: ''
  alt: ''
author: 'Clarence.C'
description: '其实如果你是next 主题的话,添加next自带打赏功能并不难的,官网也是有介绍,需要在**主题配置文件**中填入微信和支付宝收款二维码图片地址 即可开启该功能.'
---

##  hexo 怎样添加 打赏功能按扭呢?

 其实如果你是next 主题的话,添加next自带打赏功能并不难的,官网也是有介绍,需要在**主题配置文件**中填入微信和支付宝收款二维码图片地址 即可开启该功能.

> themes _config.yml
 ```javascript
reward_comment: 坚持原创技术分享，您的支持将鼓励我继续创作！
wechatpay: /path/to/wechat-reward-image
alipay: /path/to/alipay-reward-image
 ```

 但进入**_config.yml** 后你会发现, reward_comment 字段是并不存在的,需要你自己添加上去的.
 同时你必须要保证 wechatpay 和 alipay 字段下面是有值有数据的.打赏功能按钮才会正常运行.不然也是一样运行不了的.

 ## 延伸阅读

 reward 功能在模版中的位置可以阅读下文 [hexo博客Next主题添加打赏功能](http://thejojo87.com/2016/03/26/hexo%E5%8D%9A%E5%AE%A2Next%E4%B8%BB%E9%A2%98%E6%B7%BB%E5%8A%A0%E6%89%93%E8%B5%8F%E5%8A%9F%E8%83%BD/)
