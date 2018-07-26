//统计模块展示次数
export default(Vue) => {
  const imageAutoShow = (el,{value}) =>{
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
  Vue.directive('imgautoshow',{
    bind:imageAutoShow,
  })
}
