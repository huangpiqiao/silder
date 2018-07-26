## 组件功能
<ol>
    <li>实现无缝循环轮播</li>
    <li>实现组件自适应布局，以设计稿的宽度和网站主要的内容宽度为准</li>
    <li>实现初始化自动滚动时下一张图片必须加载出来或者加载失败才会滚动</li>
    <li>实现图片自动最大化并居中功能</li>
</ol>


## API
### BannerSlider
| 参数 | 说明 |是否必须 | 类型 | 默认值 |
|-----|-----|-------|------|----|
| sliderConfig | 轮播配置参数 | 是 | object | 无 |
| silderItems | 图片参数 | 是 | object or array| 无 |
| bannerClick | banner点击回调，可以在这里统一跳转 | 否 | function(image) | 无 |
### BannerSlider.sliderConfig
| 参数 | 说明 |是否必须 | 类型 | 默认值 |
|-----|-----|-------|------|-------|
| autoPlay | 自动滑动时间,单位：毫秒 | 否 | number | 3000 |
| width | 盒子长度,因为单位为rem，所以 值=宽度/100 | 是 | number | 无 |
| height | 盒子高度,因为单位为rem，所以 值=高度/100 | 否 | number | 无 |
| designWidth | 设计稿宽度 | 否 | number | 750 |
| maxWidth | 网站主要内容最大宽度 | 否 | number | 750 |
| optionShow | 指示点展示控制,默认不显示 | 否 | boolean | false |
| autoLocation | 点击是否自动跳转链接 | 否 | boolean | false |
### BannerSlider.silderItems```<Array>```
数组成员为字符串，值为图片链接
### BannerSlider.silderItems```Array<Object>```
| 参数 | 说明 |是否必须 | 类型 | 默认值 |
|-----|-----|-------|------|-------|
| imgUrl | 图片链接 | 是 | string | 无 |
| url | 点击跳转链接 | 否 | string | 无 |
##### 以上图片参数字段是组件用到的，也可以传入其他参数，通过bannerClick函数返回，或者在bannerClick函数做跳转

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
