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
    <ul class="cate-box">
      <li class="item" v-for="(item, index) in classify" :key="item.name">
        <img class="img" :src="item.image_src" alt="">
        <text class="text">{{item.name}}</text>
      </li>
    </ul>
        <!-- 楼层 --> 
    <div class="section" v-for="(item, index) in floorList" :key="index">
      <div class="title">
        <text class="text">{{item.floor_title.name}}</text>
        <img class="image" :src="item.floor_title.image_src" alt="">
      </div>
      <div class="content">
        <a class="nav" href="#" v-for="(it, i) in item.product_list" :key="i">
          <img class="image" :src="it.image_src" alt="">
        </a>
      </div>
    </div>
    <!-- 我是底线 -->
    <div class="footer">
      <span class="iconfont icon-xiao"></span>我是有底线的!
    </div>
     <!-- 回到顶部 -->
    <div class="scroll" v-show="scrollTop" @click="scrollclick">
      <span class="iconfont icon-jiantoushang top"></span>
      顶部
    </div>
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
      classify: [], //分类
      floorList: [], //楼层数据
      scrollTop:false,//返回顶部
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
            //分类
            // console.log(res);
            this.classify = res.data.message;
            // 楼层
            return tool
              .myAjax({
                url: "api/public/v1/home/floordata"
              })
              .then(res => {
                console.log(res);
                this.floorList = res.data.message;
              });
          });
      });
  },
  //页面滚动事件
  onPageScroll(e){
    // console.log(e)
    if(e.scrollTop>=300){
      this.scrollTop = true;
    }else {
      this.scrollTop = false;
    }
  },
   methods:{
    scrollclick(){
      wx.pageScrollTo({
        scrollTop:0,
      })
    }
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
// 分类选项
.cate-box {
  padding-top: 24rpx;
  padding-bottom: 30rpx;
  display: flex;
  .item {
    flex: 1;
    .img {
      width: 100rpx;
      height: 100rpx;
      display: block;
      margin: 0 auto 20rpx;
    }
    .text {
      display: block;
      text-align: center;
      font-size: 24rpx;
    }
  }
}
// 楼层数据
.section {
  .title {
    position: relative;
    .text {
      position: absolute;
      color: #ff7b94;
      font-weight: 700;
      font-size: 50rpx;
      left: 20rpx;
      top: 10rpx;
    }
    .image {
      height: 85rpx;
      width: 100%;
    }
  }
  .content {
    padding: 20rpx 16rpx;
    height: 440rpx;
    .nav {
      display: block;
      float: left;
      width: 33.333%;
      height: 100%;
      padding: 5rpx;
      box-sizing: border-box;
    }
    .image {
      display: block;
      width: 100%;
      height: 100%;
    }
    // 只要不是第一个 nav
    .nav:not(:first-child) {
      height: 50%;
    }
  }
}
// 底线布局
.footer {
  background-color: #f4f4f4;
  color: #999;
  font-size: 24rpx;
  text-align: center;
  height: 140rpx;
  line-height: 140rpx;
  .iconfont {
  }
}
// 回到顶部
.scroll {
  position: fixed;
  bottom: 100rpx;
  right: 30rpx;
  font-size: 24rpx;
  width: 80rpx;
  height: 80rpx;
  background-color: #ccc;
  text-align: center;
  border-radius: 50%;
  
  .top {
    display: block;
  }
}
</style>
