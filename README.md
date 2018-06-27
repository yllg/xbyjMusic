# xbyjMusic

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GitHub license](https://img.shields.io/badge/license-GPL-blue.svg)]()

<img src="https://github.com/yllg/xbyjMusic/blob/master/resource/64x64.png" width="64" height="64"/>

> 跨平台 NeteaseMusic 桌面应用



# 前言

最近在学electron，想想平时用的桌面应用，除了编辑器和IDE等办公应用之外，就属"网易云音乐"了

> 夏日的夜晚，听着喜欢的音乐，沉浸在自己的世界里Coding

__注：此项目纯属个人瞎搞，正常的付费音乐等服务请选网易云音乐官方客户端。__



# 技术栈

> electron + react + mobx + react-router + jss + webpack + express + ES6/7 + axios + flex + canvas



# 项目运行

### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

```
git clone https://github.com/yllg/xbyjMusic.git  
cd xbyjMusic
git submodule init
git submodule update
npm install
npm run dev

```


# 目标功能
## 页面
- [x] 首页 -- 完成
- [x] 登陆 -- 完成
- [x] 每日推荐 -- 完成
- [x] 私人FM -- 完成
- [x] 歌曲页 -- 完成
- [x] 歌单页 -- 完成
- [x] 歌手页 -- 完成
- [x] 用户页 -- 完成
- [x] 排行榜 -- 完成
- [x] 歌单主页 -- 完成
- [x] 偏好设置页/首选项 -- 完成
- [ ] MV/视频页
- [ ] 朋友页
- [ ] 我的歌手/我的收藏
- [ ] 主播电台
- [ ] 最新音乐

## 组件
- [x] header组件 -- 完成
- [x] 左菜单组件 -- 完成
- [x] 播放条组件 -- 完成
- [x] audio组件 -- 完成
- [x] 播放列表组件 -- 完成
- [x] 歌词组件 -- 完成
- [ ] 评论组件 -- 只完成分类显示
- [x] 搜索组件 -- 完成
- [ ] 首页轮播 -- 接口参数不明，拿不到最新数据哦
- [x] 同步轮播组件 -- 关于我
- [x] 提示组件 -- 完成


## 功能
- [x] 喜欢 -- 完成
- [x] 不喜欢 -- 完成
- [x] 收藏歌单 -- 完成
- [ ] 收藏歌曲
- [x] 收藏歌手 -- 完成
- [ ] 评论
- [x] 评论点赞 -- 完成
- [ ] 下载歌曲




# 效果演示
（LICEcap录制GIF时，渐变色会有点失真，动图将就看下哈~）

### 首页
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/1.%E9%A6%96%E9%A1%B5.gif" /> 

### 每日推荐
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/2.%E6%AF%8F%E6%97%A5%E6%8E%A8%E8%8D%90.png" /> 

### 私人FM
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/3.%E7%A7%81%E4%BA%BAFM.png" /> 

### 歌曲页
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/4.%E6%AD%8C%E6%9B%B2%E9%A1%B5.gif" /> 

### 歌单页
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/5.%E6%AD%8C%E5%8D%95%E9%A1%B5.gif" /> 

### 歌手页
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/6.%E6%AD%8C%E6%89%8B%E9%A1%B5.gif" /> 

### 用户页
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/7.%E7%94%A8%E6%88%B7%E9%A1%B5.png" /> 

### 加载
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/8.%E5%8A%A0%E8%BD%BD%E9%A1%B5.png" /> 

### 排行榜
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/9.%E6%8E%92%E8%A1%8C%E6%A6%9C.png" /> 

### 歌单主页
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/10.%E6%AD%8C%E5%8D%95%E4%B8%BB%E9%A1%B5.png" /> 

### 搜索页
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/11.%E6%90%9C%E7%B4%A2%E9%A1%B5.png" /> 

### 偏好设置/首选项
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/12.%E5%81%8F%E5%A5%BD%E8%AE%BE%E7%BD%AE.png" /> 




# 说明

>  如果本项目对您有帮助，可以点右上角 "Star" 支持一下 谢谢~

>  或者您可以 "fork" 一下，和我一起完善剩下的功能

>  `数据接口` 由 [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 提供。

> `项目参考`  [trazyn/ieaseMusic](https://github.com/trazyn/ieaseMusic)




# 最后

### 欢迎关注我的公众号，还有个技术交流群(备注自己github账号哦)
### 公众号，微信群
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/13.%E5%85%AC%E4%BC%97%E5%8F%B7.jpg" width="200" height="200"/> <img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/14.%E5%BE%AE%E4%BF%A1%E7%BE%A4.png" width="250" height="312"/>

## 捐赠 Donate
如果我的项目对你有帮助，可以请我喝杯~~咖啡~~ 肥宅快乐水哦~🐷
### 支付宝，微信支付
<img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/15.%E6%94%AF%E4%BB%98%E5%AE%9D.jpg" width="200" height="312"/> <img src="https://github.com/yllg/xbyjMusic/blob/master/screenshots/16.%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.png" width="200" height="312"/>



## License
GPL

