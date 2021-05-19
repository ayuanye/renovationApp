<template>
  <div class="contentLogin">
    <NavBar v-show="navShow" :title="title" :left="left"></NavBar>
    <div class="LoginAvatarBox"></div>
    <van-form @submit="onSubmit">
      <van-field
        class="phone"
        v-model="username"
        clearable
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        left-icon="http://7niu.caicai.run/com-avatar-icon.png"
      />
      <van-field
        class="phone"
        v-model="falstPassword"
        clearable
        placeholder="请输新密码"
        :rules="[{ required: true, message: '请输入密码' }]"
        left-icon="http://7niu.caicai.run/suo-icon.png"
        type="password"
      />
      
      <div style="margin: 16px;">
        <van-button class="submentBtn" round block type="info" native-type="submit">登录</van-button>
      </div>
      <div class="toGetBack">
        <span @click="toSign">注册账号</span>
        <span @click="toBack">找回密码</span>
      </div>
    </van-form>
  </div>
</template>

<script>
const axios = require('axios')
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'GetBackPassword',
  components: {
     NavBar: NavBar
  },
  data() {
    return {
      title:'',
      left:'',
      navShow:true,
      username: '',
      password: '',
      show: true,
      count: '',
      timer: null,
      sms:'',
      falstPassword:'',
      materialsUserInfo:''

    };
  },
  mounted(){
    this.title = this.$route.meta.title;
    this.left = this.$route.meta.left; 
    
  },
  methods:{
    onSubmit(values) {
      const that = this
      axios.post('/api/wanlshop/users/login', {
        account:that.username,
        password:that.falstPassword,
      })
      .then(function (res) {
        if(res.data.code == 1){
          window.localStorage.setItem('materialsUserInfo',JSON.stringify( res.data.data.userinfo))
          that.$toast('登录成功');
          that.materialsUserInfo = res.data.data.userinfo
          that.$router.push('/home')
        }else{
          that.$toast('账号或密码错误')
        }
      })
      .catch(function (error) {
        that.$toast('请求失败');
        console.log(error);
      });
    },
    toBack(){
      this.$router.push("/GatBackPassword");
    },
    toSign(){
      this.$router.push("/Enroll");
    }
    
    
  }
}
</script>
<style>
.contentLogin{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.contentLogin .LoginAvatarBox{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin:200px auto 100px;
    background: url('../../../public/img/login.png') 0 0 /100% 100% no-repeat;
}
.contentLogin .phone{
  width: 600px;
  height: 80px;
  border:1px solid rgba(0, 0, 0, .1);
  border-radius: 10px;
 
}
.contentLogin .van-field__control{
  font-size: 28px;
  height: 60px;
  line-height: 60px;
}
.van-field__error-message{
  display: none;
}
.contentLogin .sms{
  width: 600px;
  height: 80px;
  border:1px solid rgba(0, 0, 0, .1);
  border-radius: 10px;
  margin:30px auto;
}
.contentLogin .van-field__button{
  width: 200px;
  height: 50px;
  width: 120px;
}
.contentLogin .code{
  width: 120px;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;

}
.contentLogin .count{
  width: 120px;
  height: 50px;
  background:rgba(0, 0, 0, .06);
  color:#666;
  font-size: 28px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;

}
.contentLogin .submentBtn{
  height: 80px;
  width: 600px;
  line-height: 80px;
  margin:0 auto;
  margin-top:100px;
  font-size: 25px;
}
.contentLogin .van-icon{
  width: 50px;
  height: 50px;
  margin-top: 4px;
  margin-right: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
}
.contentLogin .van-icon img{
  width: 100%;
  height: 100%;
}
.contentLogin .nextPassword{
  margin-top:30px;
}
.contentLogin .toGetBack{
  width: 600px;
  height: 30px;
  font-size:24px;
  margin: 20px auto;
  color: #1989fa;
}
.contentLogin .phone:nth-child(1){
  margin:30px auto;
}
.contentLogin .phone:nth-child(2){
  margin:0 auto;
}
.contentLogin .toGetBack span:nth-child(2){
  float:right;
}
</style>