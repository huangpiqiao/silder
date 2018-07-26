<!--banner轮播组件-->

<template>
    <div class="slider-box" v-if="imageShowList.length > 0 && silderItems.length>0" :style="{ height:sliderConfig.height+'rem', width:sliderConfig.width+'rem'}">
        <ul class="slider-content" @touchstart="touchstart($event)"
            @touchmove="touchmove($event)"
            @touchend="touchend($event)"
            :style="{
                transform:'translate3d('+translateX+'rem,0,0)',
                transitionTimingFunction:timing,
                transitionDuration:duration+'ms',
                width:sliderWidth+'rem',
                left:-sliderConfig.width+'rem',
                height:sliderConfig.height+'rem'}">
            <!--循环第一张-->
            <li class="slider-item defaultBg" :style="{width:screenWidth+'rem'}" v-if="imageShowList.length>1">
                <a :href="getUrl(imageShowList[silderItemsLenght-1])" :style="{height:sliderConfig.height+'rem'}" @click.prevent="handleClick(imageShowList[silderItemsLenght-1],$event)">
                    <img v-imgautoshow="sliderConfig" v-if="getImage(imageShowList[silderItemsLenght-1])" :src="getImage(imageShowList[silderItemsLenght-1])">
                </a>
            </li>
            <!--轮播主体-->
            <li class="slider-item defaultBg" v-for="(item,index) in imageShowList" :key="index" :style="{width:screenWidth+'rem'}">
                <a :href="getUrl(item)" :style="{height:sliderConfig.height+'rem'}" @click.prevent="handleClick(item,$event)">
                    <img v-imgautoshow="sliderConfig" :src="getImage(item)" v-if="getImage(item)">
                </a>
            </li>
            <!--循环最后一张-->
            <li class="slider-item defaultBg" :style="{width:screenWidth+'rem'}" v-if="imageShowList.length>1">
                <a :href="getUrl(imageShowList[0])" :style="{height:sliderConfig.height+'rem'}" @click.prevent.stop="handleClick(imageShowList[0],$event)">
                    <img v-imgautoshow="sliderConfig" :src="getImage(imageShowList[0])" v-if="getImage(imageShowList[0])"></a>
            </li>
        </ul>
        <ol class="slider-guider" v-if="silderItems.length>1 && optionShow">
            <li @click="handleOprionClick($event,i)" class="slider-guider-item" v-for="i in silderItems.length" :key="i" :class="index==i-1?'selected':''"></li>
        </ol>
    </div>
</template>
<script>
    export default {
        props: {
            //图片原始列表
            silderItems: {
                type: Array, Object,
            },
            //轮滑banner参数
            sliderConfig: {
                type: Object,
            },
        },
        data() {
            return {
                //滑动x轴坐标
                translateX: 0,
                //滑动原点
                origin: 0,
                //动画类型
                timing: 'ease',
                //动画时间
                duration: 300,
                //滑动开始X坐标
                startX: "",
                //滑动开始X坐标
                startY: "",
                //滑动结束Y坐标
                endX: "",
                //滑动结束Y坐标
                endY: "",
                //当期图片索引
                index: 0,
                //是否自动轮播
                autoPlay: this.sliderConfig.hasOwnProperty('autoPlay') ? this.sliderConfig.autoPlay : 3000,
                //自动循环定时器
                autoInterval: 0,
                //动画时间设置定时器
                delayTimeout: 0,
                //图片展示列表
                imageShowList: [],
                //自动轮播开关
                autoPlaySwitch: false,
                //图片加载长度
                ImageLoadCurrentLength: 0,
                //是否开始滑动
                isTouch: false,
                //是否显示option
                optionShow: this.sliderConfig.hasOwnProperty('optionShow') ? this.sliderConfig.optionShow : true,
            }
        },
        created() {
            this.setHtmlFontSize();
            window.addEventListener('resize', this.setHtmlFontSize, false)
            this.imageLoad();
        },
        mounted() {

        },
        beforeDestroy(){
            window.removeEventListener('resize',this.setHtmlFontSize)
        },
        methods: {
            //设置html的根字体大小
            setHtmlFontSize: function () {
                var htmlEl = document.documentElement;
                var momentWith = 0;
                const designWidth = this.sliderConfig.designWidth ? this.sliderConfig.designWidth : 750;
                const maxWidth = this.sliderConfig.maxWidth ? this.sliderConfig.maxWidth : 750;
                function setHtmlFontSize(designWidth, maxWidth) {
                    momentWith = htmlEl.clientWidth > maxWidth ? maxWidth : htmlEl.clientWidth;
                    let fontSize = momentWith / designWidth * 100;
                    //解决苹果plus版本出现黑边的BUG
                    if( parseInt(fontSize%1*10)===2 ) {
                        fontSize = (parseInt(fontSize*10)+parseInt(fontSize%1*10))/10
                    }
                    htmlEl.style.fontSize = fontSize + 'px';
                }

                setHtmlFontSize(designWidth, maxWidth);
            },
            //图片的加载规则，默认先加载第一张，第二张之后必须下载完成之后再开始轮播,手动滑动之后则取消加载逻辑，按时间滑动
            imageLoad() {
                var _this = this;
                this.imageShowListInit();
                function imageLoadEach(index, length) {
                    //开始滑动之后则取消所有逻辑
                    if (!_this.isTouch) {
                        var image = new Image();
                        if (index === 0) {
                            image.onload = function () {
                                if (_this.isTouch) return;
                                _this.isAutoPlay(true);
                                _this.ImageLoadCurrentLength++;
                                index++;
                                imageLoadEach(index, length);
                            }
                        }
                        else if (index < length) {
                            image.onload = function () {
                                if (_this.isTouch) return;
                                _this.imageShowList.splice(index, 1, _this.silderItems[index]);
                                _this.ImageLoadCurrentLength++;
                                _this.autoPlaySwitch = true;
                                index++;
                                imageLoadEach(index, length)
                            }
                        }
                        else {
                            _this.autoPlaySwitch = true;
                            return;
                        }
                        //图片加载出错，则继续滑动
                        image.onerror = function () {
                            for (; index < length; index++) {
                                _this.imageShowList.splice(index, 1, _this.silderItems[index]);
                            }
                            _this.ImageLoadCurrentLength = length;
                            _this.autoPlaySwitch = true;
                        }
                        //数组和对象
                        if (typeof _this.silderItems[index] === 'string') {
                            image.src = _this.silderItems[index];
                        }
                        else {
                            image.src = _this.silderItems[index].imgUrl;
                        }
                    }
                }
                imageLoadEach(0, this.silderItems.length);
            },
            //当滑动的时候则把所有图片全部填充到列表中
            filledAllImage() {
                if (!this.isTouch) {
                    for (var i = 0; i < this.silderItems.length; i++) {
                        this.$set(this.imageShowList, i, this.silderItems[i]);
                    }
                    this.autoPlaySwitch = true;
                    this.isTouch = true;
                    this.isAutoPlay(true);
                }
            },
            //初始化图片列表
            imageShowListInit() {
                var length = this.silderItems.length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        if (i === 0) {
                            this.imageShowList.push(this.silderItems[i]);
                        }
                        else {
                            this.imageShowList.push('');
                        }
                    }
                }
            },
            //点击底部
            handleOprionClick(e,index) {
                this.isAutoPlay(false);//暂停自动
                this.duration = 300;
                this.index = index-1;
                this.setOrigin();
                this.isAutoPlay(true);//打开自动
                e.stopPropagation();
                e.preventDefault();
            },
            //滑动开始
            touchstart: function (e) {
                let targetTouches = e.targetTouches[0];
                this.startX = targetTouches.clientX;
                this.startY = targetTouches.clientY;
                this.endX = targetTouches.clientX;
                this.endY = targetTouches.clientY;
                this.isAutoPlay(false);//暂停自动
                this.delaySetDuration(false);//清除自动产生的延迟
                this.duration = 0;
                this.setOrigin();
            },
            //滑动
            touchmove: function (e) {
                let targetTouches = e.targetTouches[0];
                this.endX = targetTouches.clientX;
                this.endY = targetTouches.clientY;
                if (Math.abs(this.endX - this.startX) - Math.abs(this.startY - this.endY) > 0) {
                    this.translateX = this.origin + (this.endX - this.startX) / 50;
                    e.preventDefault();
                }
            },
            //滑动结束
            touchend: function (e) {
                //组织点击滑动
                let targetTouches = e.changedTouches[0];
                this.endX = targetTouches.clientX;
                this.endY = targetTouches.clientY;
                let touchMoveWidth = (this.endX - this.startX) / 100;
                this.duration = 300;
                //滑动有效
                if (Math.abs(touchMoveWidth) > this.touchMinWidth && this.silderItemsLenght > 1) {
                    this.filledAllImage();
                    if (touchMoveWidth < 0) {
                        //向左滑
                        this.next();
                    }
                    else {
                        //向右滑
                        this.pre();
                    }
                    this.$emit('on-slider');
                }
                else {
                    //滑动距离短，无效，返回原来的位置
                    this.setOrigin();
                }
                this.isAutoPlay(true);
            },
            //设置滑动原点
            setOrigin: function () {
                this.origin = this.translateX = -this.screenWidth * this.index;
            },
            //向后
            next: function () {
                this.index++;
                //正常滑动
                if (this.index <= this.silderItemsLenght) {
                    this.setOrigin();
                    //如果是最后一张则变为第二张
                    if (this.index == this.silderItemsLenght) {
                        this.index = 0;
                    }
                }
            },
            //向前
            pre: function () {
                this.index--;
                if (this.index >= -1) {
                    this.setOrigin();
                    //如果是第一张则变为倒数第二张
                    if (this.index == -1) {
                        this.index = this.silderItemsLenght - 1;
                    }
                }
            },
            //自动滑动
            animationInterval: function () {
                let that = this;
                if (this.autoPlay) {
                    that.delaySetDuration(true);
                    this.autoInterval = setInterval(function () {
                        if (that.silderItemsLenght > 1 && that.autoPlaySwitch) {
                            that.index++;
                            that.duration = 300;
                            that.setOrigin();
                            if (that.index == that.silderItemsLenght) {
                                that.index = 0;
                                that.delaySetDuration(true);
                            }
                            else if (that.index == -1) {
                                that.index = that.silderItemsLenght - 1;
                                that.delaySetDuration(true);
                            }
                            //如果下载的长度小于图片的长度且还没触碰，则关闭,否则打开
                            if (!that.isTouch && that.ImageLoadCurrentLength < that.silderItemsLenght) {
                                that.autoPlaySwitch = false;
                            }
                            else {
                                that.autoPlaySwitch = true;
                            }
                        }
                    }, this.autoPlay)
                }
            },
            //暂停和续播
            isAutoPlay: function (type) {
                clearInterval(this.autoInterval);
                if (type) {
                    this.animationInterval();
                }
            },
            //延迟设置
            delaySetDuration: function (type) {
                if (type) {
                    let that = this;
                    this.delayTimeout = setTimeout(function () {
                        that.duration = 0;
                        that.setOrigin();
                    }, this.duration)
                }
                else {
                    clearTimeout(this.delayTimeout);
                }
            },
            //点击事件
            handleClick: function (source,e) {
                if(this.sliderConfig.autoLocation && typeof source == "object"){
                    window.location.href = source.url;
                }
                this.$emit('click',{
                    image: source,
                    event: e,
                });
            },
            //获取轮播图片，如果是字符串则直接返回，如果是对象则返回image
            getImage: function (source) {
                if (typeof source == "object") {
                    return source.imgUrl;
                }
                else {
                    return source;
                }
            },
            //获取跳转到额url
            getUrl: function (source) {
                if (typeof source == "object") {
                    return source.url;
                }
                return 'javascript:;';
            }
        },
        computed: {
            //盒子长度
            screenWidth: function () {
                return this.sliderConfig.width;
            },
            //滑块长度
            sliderWidth: function () {
                let width;
                if (this.silderItemsLenght > 1) {
                    width = (this.silderItems.length + 2) * this.screenWidth;
                }
                else {
                    width = this.screenWidth;
                }
                return width;
            },
            //滑动长度超过屏幕的1/4则变化
            touchMinWidth: function () {
                return 0.15 * this.screenWidth;
            },
            //banner数量
            silderItemsLenght: function () {
                return this.imageShowList.length;
            },
            //初始位置偏左
            left: function () {
                return this.silderItemsLenght > 1 ? -this.screenWidth : 0;
            },
        },
        directives: {
            imgautoshow(el,{ value }){
                var imge = new Image();
                //设计稿的宽高比
                var settingRatio =  value.width / value.height;
                imge.onload=function () {
                    //实际图片的宽高比
                    var  realityRatio = this.width / this.height;
                    var imgWidth = this.width/100;
                    var imgHeigth = this.height/100;
                    if(realityRatio<=settingRatio){
                        el.style.width = '100%';
                        el.style.height = 'auto';
                        var imgScaleHeight = imgHeigth/(imgWidth/value.width);
                        el.style.marginTop = -(imgScaleHeight-value.height)/2+'rem';
                    }
                    if(realityRatio>settingRatio){
                        el.style.height = '100%';
                        el.style.width = 'auto';
                        var imgScaleWidth = imgWidth/(imgHeigth/value.height);
                        el.style.marginLeft = -(imgScaleWidth - value.width)/2+'rem';
                    }
                }
                //错误则隐藏
                imge.onerror = function () {
                    el.style.display = 'none';
                }
                imge.src=el.src;
            }
        }
    }
</script>
<style>
    html,body,div,ul,li,ol,a,img{
        padding: 0;
        margin: 0;
    }
    ul,li,ol{
        list-style:none;
    }
    a{
        text-decoration:none;
        border:none;
        outline:none;
        tap-highlight-color: rgba(0,0,0,0);
        focus-ring-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-focus-ring-color: rgba(0,0,0,0);
        -moz-tap-highlight-color: rgba(0,0,0,0);
        -moz-focus-ring-color: rgba(0,0,0,0);
    }
    a:visited{
        color: inherit;
    }
    /*轮播样式*/
    .slider-box {
        width: 100%;
        overflow: hidden;
        min-height: 3rem;
        position: relative;
        background-color: #fff;
        margin: 0 auto;
    }

    .slider-content {
        position: relative;
        top: 0;
    }

    .slider-item {
        float: left;
        background-color: #fff;
    }
    .slider-item a{
        overflow: hidden;
        display: block;
        position: relative;
    }
    .slider .slider-content a {
        display: block;
    }

    .slider-guider {
        width: 100%;
        overflow: hidden;
        position: absolute;
        bottom: 0.10rem;
        text-align: center;
    }

    .slider-guider-item {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #bcbfc1;
        background-color: rgba(0, 0, 0, .3);
        /*float: left;*/
        margin: 0 4px;
        display: inline-block;
    }
    .slider-guider-item.selected {
        background-color: #333333;
    }
</style>
