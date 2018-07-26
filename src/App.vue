<template>
    <div id="app">
        <BannerSlider :sliderConfig="sliderConfig" :silderItems="silderItems" @click="bannerClick"></BannerSlider>
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
                },
                silderItems: [
                    '//m.360buyimg.com/babel/jfs/t19918/343/2670757010/96927/7c6c3bd3/5b4da486N598b1a13.jpg',
                    '//img11.360buyimg.com/mobilecms/s350x128_jfs/t9337/240/1353877974/54320/5aa188cf/59bfd0b1Nc651cf14.jpg!q90!cc_350x128.webp',
                    '//m.360buyimg.com/babel/jfs/t22402/289/2300041360/56400/ad72889a/5b4ee30cNc04310dd.jpg',
                    '//m.360buyimg.com/babel/jfs/t20515/63/2313147701/102144/bff20e38/5b513a1bN8f3f736e.jpg',
                ]
            }
        },
        methods: {
            bannerClick(params){
                console.log(params)
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
