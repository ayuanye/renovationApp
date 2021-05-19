<template >
    <div>
        <NavBar v-show="navShow" :title="title" :left="left"></NavBar>
        <div class="contentt">
          <div class="avatarBox">
            <div class="avatarName">
              <img :src="materialsUserInfo.avatar" v-if="materialsUserInfo.avatar" alt="">
              <img src="http://7niu.caicai.run/com-avatar-my.png" v-if="!materialsUserInfo.avatar" alt="">
            </div>
            <div class="nickname" v-if="materialsUserInfo.username">
              {{materialsUserInfo.username}}
            </div>
            <div class="nickname" v-if="!materialsUserInfo.username" @click="goLogin">
              注册/登录
            </div>
          </div>
          <van-grid>
            <van-grid-item icon="todo-list-o" badge="9" text="代付款" />
            <van-grid-item icon="send-gift-o" badge="9" text="待收货" />
            <van-grid-item icon="goods-collect-o" badge="9" text="退换/售后" />
            <van-grid-item icon="newspaper-o" badge="9" text="我的订单" />
          </van-grid>
          <van-cell title="我的收藏" icon="shop-o" to="/mycollect"/>
          <van-cell title="我的关注" icon="like-o" to="home"/>
          <van-cell title="收货地址" icon="location-o" to="home"/>
          <van-cell title="帮助与反馈" icon="chat-o" to="home"/>
          <van-button round type="warning" @click="goAuto">退出登录</van-button>
            <!-- <a href="#" download="http://7niu.caicai.run/com-avatar-my.png">
            <div class="dome">
            </div>
            </a> -->
        </div>
        <keep-alive>
          <Tabbar :selected="selected" />
      </keep-alive>
    </div>
</template>
<script>

import Tabbar from '@/components/Tabbar.vue'
import NavBar from "@/components/NavBar.vue";
import { Dialog } from 'vant';

export default {
  name: 'Profile',
  components: {
    NavBar: NavBar,
    Tabbar
  },
  data() {
        return {
          selected:"2",
          title:'',
          left:'',
          navShow:true,
          materialsUserInfo:''
        };
  },
  created(){
    if(window.localStorage.getItem('materialsUserInfo')){
      this.materialsUserInfo = JSON.parse(window.localStorage.getItem('materialsUserInfo')) 
    }else{
      this.materialsUserInfo = ''
    }
  },
  mounted(){
    this.title = this.$route.meta.title;
    this.left = this.$route.meta.left; 
    
  },
  activated() {
    if(window.localStorage.getItem('materialsUserInfo')){
      this.materialsUserInfo = JSON.parse(window.localStorage.getItem('materialsUserInfo')) 
    }else{
      this.materialsUserInfo = ''
    }
 },
  methods:{
    goLogin(){
      this.$router.push('/Login')
    },
    goAuto(){
      Dialog.confirm({
        title: '退出登录',
      })
      .then(() => {
          let that = this;
          that.$axios.post('/api/wanlshop/users/logout',{
        }).then(function(res){
            that.$toast('退出成功');
            window.localStorage.removeItem('materialsUserInfo')
            that.$router.push('/Profile')
            that.materialsUserInfo = ''
        })
        
      })
      .catch((err) => {
        this.$toast('已取消');
      });
        }
      }

}
</script>

<style >
.contentt{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('http://7niu.caicai.run/com-my-bg.png') 0 0 / 100% 560px no-repeat;
  background-color: rgb(247, 244, 247);
}
.contentt .avatarBox{
  display: flex;
  width: 690px;
  height: 122px;
  margin: 140px auto 0;
  background:url('http://7niu.caicai.run/com-jiantou.png') 630px 41px / 40px 40px no-repeat;
}
.contentt .avatarName img{
  width: 120px;
  height: 120px;
  border: 2px solid #fff;
  border-radius: 50%;
}
.contentt .nickname{
  line-height: 120px;
  margin-left: 30px;
  color: #fff;
  font-size: 50px;
}
.contentt .van-grid{
  width: 690px;
  margin:40px auto;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);
}
.contentt .van-grid-item{
  border:none;
}
.contentt .van-grid-item .van-grid-item__text{
  font-size: 20px !important;
}
.contentt .van-grid-item__content--center{
  border:none;
  padding: 15px 0;
}
.contentt .van-grid-item:nth-child(1) .van-grid-item__content--center{
  border-radius: 10px 0 0 10px;
}
.contentt .van-grid-item:nth-child(4) .van-grid-item__content--center{
  border-radius:0 10px 10px 0;
}
.contentt .van-cell{
  height:100px;
  line-height: 100px;
  width: 690px;
  border-radius: 20px;
  margin:0 auto 30px;
  background:url('http://7niu.caicai.run/com-666-right-jiantou.png') 600px 35px / 30px 30px no-repeat;
  background-color: #fff;
  padding-left: 30px;
}
.contentt .van-cell .van-icon{
  width: 40px;
  height: 40px;
  font-size: 40px;
  float: left;
  padding-top:25px;
  box-sizing: border-box;
}
.contentt .van-cell__title,.contentt .van-cell__value{
  line-height: 80px;
  padding-left: 20px;
  font-size: 20px !important;
}
.contentt .van-button--round{
  width: 660px;
  height: 80px;
  border: 40px;
  margin:0 45px;
  box-sizing: border-box;
}
.contentt .van-dialog{
  width: 500px;
  height: 180px;
}
.contentt .van-dialog__header{
  height: 60px;
  font-size: 32px;
  line-height: 60px;
}
.contentt .van-dialog__footer{
  height: 72px;
  line-height: 72px;
  
}
.contentt .van-dialog__cancel{
  height: 72px;
  line-height: 72px;
}
.contentt .van-button__content{
  height: 72px;
  line-height: 72px;
}
.contentt .van-button__text{
  font-size: 25px;
}
.dome{
  width: 100px;
  height: 100px;
  background-color: red;
}
.contentt .van-button--warning{
  background-color: #FE5E5B;
}

</style>