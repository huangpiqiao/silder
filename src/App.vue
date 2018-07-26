<template>
    <div id="app">
        <BannerSlider :sliderConfig="sliderConfig" :silderItems="silderItemsArray" @click="bannerClick"></BannerSlider>
        <div :style="{marginTop: '50px'}">
            <BannerSlider :sliderConfig="sliderConfig" :silderItems="silderItemsObject" @click="bannerClick"></BannerSlider>
        </div>
    </div>
</template>

<script>
    import BannerSlider from './components/BannerSlider';

    export default {
        name: 'app',
        data: () => {
            return {
                sliderConfig: {
                    //自动滑动时间,默认为3000毫秒,0为不自动滑动
                    autoPlay: 4000,
                    //盒子长度,必填
                    width: 6,
                    //盒子高度,必填
                    height: 5,
                    //设计稿宽度，单位px,默认为750
                    designWidth: 750,
                    //网站主要内容最大宽度,默认为750
                    maxWidth: 750,
                    //指示点展示控制,默认不显示
                    optionShow: true,
                    //点击是否自动跳转链接
                    autoLocation: true,
                },
                silderItemsArray: [
                    '//m.360buyimg.com/babel/jfs/t19918/343/2670757010/96927/7c6c3bd3/5b4da486N598b1a13.jpg',
                    '//img1.360buyimg.com/pop/jfs/t18049/280/2263512182/124650/fa929ef0/5aedc456Nacfeaf43.jpg',
                    '//m.360buyimg.com/babel/jfs/t22402/289/2300041360/56400/ad72889a/5b4ee30cNc04310dd.jpg',
                    '//m.360buyimg.com/babel/jfs/t20515/63/2313147701/102144/bff20e38/5b513a1bN8f3f736e.jpg',
                ],
                silderItemsObject: [
                    {
                        imgUrl: '//m.360buyimg.com/babel/jfs/t19918/343/2670757010/96927/7c6c3bd3/5b4da486N598b1a13.jpg',
                        url: 'http://baidu.com'
                    },
                    {
                        imgUrl: '//img1.360buyimg.com/pop/jfs/t18049/280/2263512182/124650/fa929ef0/5aedc456Nacfeaf43.jpg',
                    },
                    {
                        imgUrl: '//m.360buyimg.com/babel/jfs/t22402/289/2300041360/56400/ad72889a/5b4ee30cNc04310dd.jpg',
                    },
                    {
                        imgUrl: '//m.360buyimg.com/babel/jfs/t20515/63/2313147701/102144/bff20e38/5b513a1bN8f3f736e.jpg',
                        url: 'http://baidu.com'
                    }
                ]
            }
        },
        methods: {
            //banner点击
            bannerClick(params){
                // console.log(params)
            }
        },
        components: {
            // HelloWorld,
            BannerSlider
        }
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
