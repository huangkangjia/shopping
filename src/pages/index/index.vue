<template>
 <div>
    <div class="header">
      <icon type="search" size="18"></icon>
      <input type="text" placeholder="搜索">
    </div>
    <!-- 轮播图 -->
    <swiper autoplay interval="2000" indicator-active-color="yellow" indicator-dots="true" indicator-color="rgba(0,0,0.5)" class="swiper">
        <swiper-item v-for="item in swiperList" :key="item.name">
            <img :src="item.image_src" alt="">
        </swiper-item>
    </swiper>
    <!-- 分类 -->
    <ul class="classify">
      <li v-for="item in classify" :key="item.name">
        <img src="http://p6lmyfkof.bkt.clouddn.com/icon_index_nav_2@2x.png" alt="">
        <!-- <span>{{item.name}}</span> -->
      </li>
    </ul>
 </div>
  
</template>

<script>
// 导入自己封装的ajax
import tool from "../../utils/index";
// console.log(tool)
export default {
  data: function() {
    return {
      swiperList: [], //输入图
      classify: [] //分类  
    };
  },
  // 生命周期函数
  created() {
    tool
      .myAjax({
        url: "api/public/v1/home/swiperdata"
      })
      .then(res => {
        // console.log(res);
        this.swiperList = res.data.message;
        return tool
          .myAjax({
            url: "api/public/v1/home/catitems"
          })
          .then(res => {
            console.log(res);
            this.classify = res.data.message;
          });
      });
  }
};
</script>

<style lang="less">
.header {
  height: 100rpx;
  widows: 750rpx;
  background-color: #ff2d4a;
  padding: 20rpx 16rpx;
  box-sizing: border-box;
  position: relative;
  input {
    height: 60rpx;
    background-color: white;
    border-radius: 10rpx;
    font-size: 24rpx;
    text-align: center;
  }
  icon {
    position: absolute;
    z-index: 998;
    left: 50%;
    transform: translateX(-80rpx);
    top: 32rpx;
  }
}
// 轮播图
.swiper {
  height: 340rpx;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
// 分类
.classify {
  height: 170rpx;
  display: flex;
 
  ._li {
    flex: 1;
    img {
      width: 128rpx;
      height: 128rpx;
      display: block;
      margin: 20rpx auto;
    }
  }
}
</style>
