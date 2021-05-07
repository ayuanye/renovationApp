<template>
  <div class="home">
    <NavBar v-show="navShow" :title="title" :left="left"></NavBar>
    <div class="header" >
      <div :class="{'active' : headerScroll}">
        <van-search
          v-model="search"
          shape="round"
          background="white"
          @search="searchList()"
          @cancel="onCancel"
          placeholder="请输入商家、商品名称"
        />
      </div>
      <div class="center">
        <!--首页导航-->
        <nav class="msite_nav border-1px">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/地板.png">
                  </div>
                  <span>地板</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/瓷砖.png">
                  </div>
                  <span>瓷砖</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/门.png">
                  </div>
                  <span>门</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/窗户-关.png">
                  </div>
                  <span>窗</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/class卫浴洁具安装.png">
                  </div>
                  <span>洁具</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/空调.png">
                  </div>
                  <span>空调</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/暖气.png">
                  </div>
                  <span>暖气</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/吊顶.png">
                  </div>
                  <span>扣板吊顶</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/吊顶.png">
                  </div>
                  <span>大五金</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./image/nav/五金 (1).png">
                  </div>
                  <span>小五金</span>
                </a>
              </div>
              <div class="swiper-slide">
                
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav> 
        <div class="middle">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
              <img src="./image/nav/center.jpeg"></img>             
            </van-swipe-item>
            <van-swipe-item>
              <img src="./image/nav/center.jpeg"></img> 
            </van-swipe-item>
            <van-swipe-item>
              <img src="./image/nav/center.jpeg"></img> 
            </van-swipe-item>
            <van-swipe-item>
              <img src="./image/nav/center.jpeg"></img> 
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="nav_end">
          <div class="nav_up">
            <span>精选好店</span>
          </div>
          <div class="nav_down">
            <div class="image" v-for="(option,index) in appNameOpts" :key="index" :value="option" :model="shoplist">
              <img :src="option.image[0]"/>
              <span>{{option.shopname}}</span>
            </div>          
          </div>
        </div>
        <div class="list">
          <div>
            
          </div>
        </div>
      </div>
    </div>
    
    <Tabbar/>
  </div>
</template>

<script>

import Tabbar from '@/components/Tabbar.vue'
import NavBar from "@/components/NavBar.vue";
import { Toast } from 'vant';
const axios = require('axios')
// import axios from ''
  export default {
    name: 'Home',
    components: {
      NavBar: NavBar,
      Tabbar
    },
    data() {
      return {
        isLogin:[],
        title:'',
        left:'',
        search:'',
        headerScroll: false,
        navShow:true,
        selected:"0",
        shoplist:'',
        appNameOpts:[]
      };
    },
    created() {
      this.listCase();
    },
    mounted(){
      const tokens = JSON.parse(localStorage.getItem('materialsUserInfo'));
      console.log("token",tokens.token)
      const getToken = tokens.token
      if (getToken) {
        this.isLogin = true
      }
      Toast.loading({
        message: '加载中...',
        forbidClick:true
      });
      this.title = this.$route.meta.title;
      this.left = this.$route.meta.left; 
      window.addEventListener('scroll', this.pageScroll)
    },
    methods: {
      listCase(){
        let _this = this;
        _this.isLogin = true;
        axios.post('/hdvcmKBoQX.php/wanlshop/auths/shoplist',{
            page:1,
            limit:10
        }).then(function(res){
            _this.appNameOpts = res.data.data.rows;
            _this.isLogin = false;
          console.log(_this.appNameOpts)
        })
      },
      pageScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
      },
      searchList(){
        let _this = this;
        _this.$router.push({
          path:'/ShopList',
          query:{
            info:_this.search,
          }
        })
      },
      onCancel() {
        Toast('取消');
      },
        // _this.$axios
      
    },
  }
</script>

<style>
.home{
  /* overflow: hidden; */
  height: 1000px;
  background-color: #FaFaFa;
}
.header{
  background-color:#FaFaFa;
  padding: 15px 10px;

}
.active {
  background: #868783;
}
.van-icon-search::before{
  font-size: 20px;
}
.van-field__control[type='search']{
  font-size: 25px !important;
}
.van-field__body{
  font-size: 25px;
}
.van-search{
  height: 80px;
  padding: 2px 20px;
  background-color:#FaFaFa !important;
}
.van-search .van-cell{
  height: 70px;
  line-height: 70px;
  padding: 0px;
  /* background: rgb(214, 210, 214); */
}
.van-search__content{
  background-color: #F1F1F1;
}
.van-field__control{
  height: 30px;
}
.center{
  background-color: #FaFaFa;
}
.border-1px{
  margin-top: 10px;
}
.msite_nav{
  margin: 20px 20px ;
  padding: 20px 0;
  /* height :240px; */
  border-radius: 15px;
  background:white;
}
.swiper-wrapper{
  height: 100%;
  width: 100%;
}
.swiper-slide{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap :wrap
}
.link_to_food{
  width: 20%;
}
.food_container{
  display: block;
  width: 100%;
  text-align: center;
  /* padding-bottom: 10px; */
}
.food_container img{
  display: inline-block;
  width: 60px;
  height: 50px;
}
.link_to_food span{
  font-size: 25px !important;
}
.link_to_food span{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #666;
  margin-bottom: 25px;
}
.middle{
  /* margin: 0px 20px; */
  /* width: 100%; */
  /* height: 300px; */
  padding: 0px 20px 20px 20px;
}
.middle img{
  width: 100%;
  height: 220px;
  border-radius: 25px;
  /* padding: 0 15px 10px 5px; */
}
.nav_up{
  height: 75px;
  /* background: wheat; */
  line-height: 75px;
}
.nav_up span{
  padding: 0 20px;
  font-size: 40px;
  font-weight: bold;
}
.nav_end{
  margin: 0 20px 10px 20px;
  /* height: 530px; */
  background-color: white;
  border-radius: 15px;
}
.nav_down{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap:wrap;
  /* background: tomato; */
  /* height: 10px; */
}
.nav_down img{
  /* width: ; */
  border-radius: 15px;
  height: 150px;
}
.image{
  width: 43%; 
  padding: 10px 15px 10px 20px;
}
.image span{
  font-size: 30px;
}
.list{
  height: 300px;
}
input::-webkit-input-placeholder {
  /* color: #ffffff !important; */
  /* font-weight: 400; */
  font-size: 25px !important;
}
.van-field__body{
  height: 100%;
}
.van-cell__value{
  padding: 0 15px;
}
</style>