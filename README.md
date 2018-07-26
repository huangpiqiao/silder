## 组件功能
<ol>
    <li>实现无缝滑动</li>
    <li>实现组件自适应布局，以设计稿的宽度和网站主要的内容宽度为准</li>
    <li>实现初始化自动滚动时下一张图片必须加载出来或者加载失败才会滚动</li>
    <li>实现图片自动最大化并居中功能</li>
</ol>


## 参数
<!--参数开始-->
| 参数 | 是否必须 | 类型 | 默认值 |
|-----|--------|-------|------|
| sliderConfig | 是 | object | 无 |
| silderItems | 是 | object or array| 无 |
| bannerClick | 否 | function(image)| 无 |
<!--参数结束-->

## 项目安装

```
npm install
```

## 本地调试

```
npm run serve
```

## 相关
<ul>
    <li>核心组件：BannerSlider.vue</li>
    <li>图片自动最大化并居中指令：imgAutoShow.js</li>
</ul>