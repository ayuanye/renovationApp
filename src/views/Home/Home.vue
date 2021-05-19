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
          placeholder="请输入商家名称"
        />
      </div>
      <div class="center">
        <!--首页导航-->
        <nav class="msite_nav border-1px">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" >
                <a href="javascript:" class="link_to_food" v-for="(option,index) in appOptions" :key="index" :value="option" @click="gogoods(option)">
                  <div class="food_container">
                    <img :src="option.icon">
                  </div>
                  <span>{{option.name}}</span>
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
            <div class="image" v-for="(option,index) in appNameOpts" :key="index" :value="option" :model="shoplist" @click="goshops(option)">
              <img :src="option.image ? option.image[0] : 'http://7n.kaokao.mobi/FkEWKOOEKZ7mkpw47rR3r8_e2NFs' "/>
              <span>{{option.shopname ? option.shopname : '暂无名称'}}</span>
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
        appOptions:[],
        isLogin:true,
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
      this.listicons();
    },
    mounted(){
      // const tokens = JSON.parse(localStorage.getItem('materialsUserInfo'));
      // console.log("token",tokens.token)
      // const getToken = tokens.token
      // if (getToken) {
      //   this.isLogin = true
      // }
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
        let userId = '';
        if (_this.$Global.getToken('token')){
          _this.userId =  _this.$Global.getUserId('user_id')
        }else {
          _this.userId = 0
        }
        // axios.defaults.headers.common["token"] = _this.$Global.getToken('token');
        axios.post('/hdvcmKBoQX.php/wanlshop/auths/shoplist',{
            page:1,
            limit:10,
            uid:_this.userId
            // uid:_this.$Global.getToken('token') ? _this.$Global.getUserId('user_id') : 0
        }).then(function(res){
            _this.appNameOpts = res.data.data.rows;
            _this.isLogin = false;
          console.log(_this.appNameOpts)
        })
      },
      listicons(){
        let _this = this;
        _this.$axios.post('/api/wanlshop/basedata/industry',{
        }).then(function(res){
          _this.appOptions = res.data.data
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
      goshops(option){
        let _this = this;
        _this.$router.push({
          path:'/Merchant',
          query:{
              id:option.id,
              title:option.shopname,
              shop_id:option.shop_id
          }
        })
      },
        
      gogoods(option){
        let _this = this;
        _this.$router.push({
          path:'/ShopList',
          query:{
              id:option.id,
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
.header .active {
  background: #868783;
}
.header .van-icon-search::before{
  font-size: 20px;
}
.header .van-field__control[type='search']{
  font-size: 25px !important;
}
.header .van-field__body{
  font-size: 25px;
}
.header .van-search{
  height: 80px;
  padding: 2px 20px;
  background-color:#FaFaFa !important;
}
.header .van-search .van-cell{
  height: 70px;
  line-height: 70px;
  padding: 0px;
  /* background: rgb(214, 210, 214); */
}
.header .van-search__content{
  background-color: #F1F1F1;
}
.header .van-field__control{
  height: 30px;
}
.header .center{
  background-color: #FaFaFa;
}
.header .border-1px{
  margin-top: 10px;
}
.header .msite_nav{
  margin: 20px 20px ;
  padding: 20px 0;
  /* height :240px; */
  border-radius: 15px;
  background:white;
}
.header .swiper-wrapper{
  height: 100%;
  width: 100%;
}
.header .swiper-slide{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap :wrap
}
.header .link_to_food{
  width: 20%;
}
.header .food_container{
  display: block;
  width: 100%;
  text-align: center;
  /* padding-bottom: 10px; */
}
.header .food_container img{
  display: inline-block;
  width: 60px;
  height: 50px;
}
.header .link_to_food span{
  font-size: 25px !important;
}
.header .link_to_food span{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #666;
  margin-bottom: 25px;
}
.header .middle{
  /* margin: 0px 20px; */
  /* width: 100%; */
  /* height: 300px; */
  padding: 0px 20px 20px 20px;
}
.header .middle img{
  width: 100%;
  height: 220px;
  border-radius: 25px;
  /* padding: 0 15px 10px 5px; */
} 
.header .nav_up{
  height: 75px;
  /* background: wheat; */
  line-height: 75px;
}
.header .nav_up span{
  padding: 0 20px;
  font-size: 40px;
  font-weight: bold;
}
.header .nav_end{
  margin: 0 20px 10px 20px;
  /* height: 530px; */
  background-color: white;
  border-radius: 15px;
}
.header .nav_down{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap:wrap;
  /* background: tomato; */
  /* height: 10px; */
}
.header .nav_down img{
  /* width: ; */
  border-radius: 15px;
  height: 150px;
}
.header .image{
  width: 43%; 
  padding: 10px 15px 10px 20px;
}
.header .image span{
  font-size: 30px;
}
.header .list{
  height: 300px;
}
.header input::-webkit-input-placeholder {
  /* color: #ffffff !important; */
  /* font-weight: 400; */
  font-size: 25px !important;
}
.header .van-field__body{
  height: 100%;
}
.header .van-cell__value{
  padding: 0 15px;
}
</style>