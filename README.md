## 组件功能
<ol>
    <li>实现无缝循环轮播</li>
    <li>实现组件自适应布局，以设计稿的宽度和网站主要的内容宽度为准</li>
    <li>实现初始化自动滚动时下一张图片必须加载出来或者加载失败才会滚动</li>
    <li>实现图片自动最大化并居中功能</li>
</ol>


## API
组件api
####BannerSlider
| 参数 | 说明 |是否必须 | 类型 | 默认值 |
|-----|-----|-------|------|----|
| sliderConfig | 轮播配置参数 | 是 | object | 无 |
| silderItems | 图片参数 | 是 | object or array| 无 |
| bannerClick | banner点击回调，可以在这里统一跳转 | 否 | function(image) | 无 |

## 相关
<ul>
    <li>核心组件：BannerSlider.vue</li>
    <li>图片自动最大化并居中指令：imgAutoShow.js</li>
</ul>

## 项目安装

```
npm install
```

## 本地调试

```
npm run serve
```
