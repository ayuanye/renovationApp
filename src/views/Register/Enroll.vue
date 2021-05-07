<template>
  <div class="contentBox">
    <NavBar v-show="navShow" :title="title" :left="left"></NavBar>
    <div class="avatarBox"></div>
    <van-form>
      <!-- <van-field
        class="phone"
        v-model="username"
        clearable
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        left-icon="http://7niu.caicai.run/com-avatar-icon.png"
      /> -->
      <van-field
        class="phone"
        v-model="phone"
        clearable
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
        left-icon="http://7niu.caicai.run/phone-icon1.png"
      />
      <van-field
      class="sms"
        v-model="sms"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button v-show="show" class="code" size="small" type="primary" @click="getCode">发送短信</van-button>
          <div v-show="!show" class="count">{{count}} </div>
        </template>
      </van-field>
      <van-field
        class="phone"
        v-model="falstPassword"
        clearable
        placeholder="请输密码"
        left-icon="http://7niu.caicai.run/suo-icon.png"
        type="password"
      />
      <div style="margin: 16px;">
        <van-button class="submentBtn" round block type="info" native-type="submit" @click="onSubmit">注册</van-button>
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
      show: true,
      count: '',
      timer: null,
      sms:'',
      falstPassword:'',
      phone:''

    };
  },
  mounted(){
    this.title = this.$route.meta.title;
    this.left = this.$route.meta.left; 
  },
  methods:{
    onSubmit() {
      if(!this.phone){
        this.$toast('请输入手机号');
        return false
      }
      if(!this.falstPassword){
        this.$toast('请输入密码');
        return false
      }
      const that = this
      axios.post('/api/wanlshop/users/register', {
        mobile:that.phone,
        password:that.falstPassword,
        captcha:that.sms,
      })
      .then(function (res) {
        if(res.data.code == 1){
          that.$toast('注册成功');
          that.$router.push('/Login')
        }
      })
      .catch(function (error) {
        that.$toast('请求失败');
        console.log(error);
      });

    },
    getCode(){
      if(!this.phone){
        this.$toast('请输入手机号');
        return false
      }
      const that = this
      axios.get('/api/wanlshop/sms/send', {
        params: {
          mobile: that.phone,
        }
      })
      .then(function (res) {
        if(res.data){
          const TIME_COUNT = 60;
          if (!that.timer) {
            that.count = TIME_COUNT;
            that.show = false;
            that.timer = setInterval(() => {
            if (that.count > 0 && that.count <= TIME_COUNT) {
              that.count--;
              } else {
              that.show = true;
              clearInterval(that.timer);
              that.timer = null;
              }
            }, 1000)
            }
          that.$toast(res.data.msg);
        }
      })
      .catch(function (error) {
        that.$toast('请求失败');
        console.log(error);
      });
   }  
  }
}
</script>
<style>
.contentBox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.avatarBox{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin:200px auto 100px;
    background: url('../../../public/img/com-zuce-icon.png') 0 0 /100% 100% no-repeat;
}
.phone{
  width: 600px;
  height: 80px;
  border:1px solid rgba(0, 0, 0, .1);
  border-radius: 10px;
  margin:30px auto;
 
}
.van-field__control{
  font-size: 28px;
  height: 60px;
  line-height: 60px;
}
.van-field__error-message{
  display: none;
}
.sms{
  width: 600px;
  height: 80px;
  border:1px solid rgba(0, 0, 0, .1);
  border-radius: 10px;
  margin:30px auto;
}
.van-field__button{
  width: 200px;
  height: 50px;
  width: 120px;
}
.code{
  width: 120px;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;

}
.count{
  width: 120px;
  height: 50px;
  background:rgba(0, 0, 0, .06);
  color:#666;
  font-size: 28px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;

}
.submentBtn{
  height: 80px;
  width: 600px;
  line-height: 80px;
  margin:0 auto;
  margin-top:100px;
}
.contentBox .van-icon{
  width: 50px;
  height: 50px;
  margin-top: 4px;
  margin-right: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
}
.contentBox .van-icon img{
  width: 100%;
  height: 100%;
}
.nextPassword{
  margin-top:30px;
}
.toGetBack{
  width: 600px;
  height: 30px;
  font-size:24px;
  margin: 20px auto;
  color: #1989fa;
}

.toGetBack span:nth-child(2){
  float:right;
}
</style>