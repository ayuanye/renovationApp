import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = resolve => require(['../views/Home/Home.vue'], resolve); //首页  
const Order = resolve => require(['../views/Order/Order.vue'], resolve);   
const Profile = resolve => require(['../views/Profile/Profile.vue'], resolve);  //个人中心
const ChangeMsg = resolve => require(['../views/Profile/ChangeMsg.vue'], resolve);
const Merchant = resolve => require(['../views/Merchant/Merchant.vue'], resolve);
const ShopList = resolve => require(['../views/ShopList/ShopList.vue'], resolve);  
const ShopDiscript = resolve => require(['../views/ShopDiscript/ShopDiscript.vue'], resolve);  


const Mycollect = resolve => require(['../views/Mycollect/Mycollect.vue'], resolve);  
// const ShopDiscript = resolve => require(['../views/ShopDiscript/ShopDiscript.vue'], resolve);  

Vue.use(VueRouter)

const routes = [ 
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '掌上建材',
      left:false,
      keepAlive: false
    },
  },
  {
    path: '/GatBackPassword',
    name: 'GatBackPassword',
    component: () => import('../views/Register/GatBackPassword.vue'),
    meta: {
      title: '找回密码',
      left:true 
    },
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Register/Login.vue'),
    meta: {
      title: '登录',
      left:true 
    },
  },
  {
    path: '/Enroll',
    name: 'Enroll',
    component: () => import('../views/Register/Enroll.vue'),
    meta: {
      title: '注册',
      left:true 
    },
  },
  {
    path: '/Order',
    name: 'Order',
    component: Order,
    meta: {
      title: '材料框',
      left:false,
      keepAlive: false
    },
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '我的',
      left:false ,
      keepAlive: false
    },
  },
  {
    path: '/ChangeMsg',
    name: 'ChangeMsg',
    component: ChangeMsg,
    meta: {
      title: '账户设置',
      left:true,
    },
  },
  {
    path: '/Merchant',
    name: 'Merchant',
    component: Merchant,
    meta: {
      title: '店铺',
      left:true 
    }
  },
  {
    path: '/ShopList',
    name: 'ShopList',
    component: ShopList,
    meta: {
      title: '商家列表',
      left:true 
    },
  },
  {
    path: '/Mycollect',
    name: 'Mycollect',
    component: Mycollect,
    meta: {
      title: '我的收藏',
    }
  },
  {
    path: '/ShopDiscript',
    name: 'ShopDiscript',
    component: ShopDiscript,
    meta: {
      title: '',
      left:true 
    },
  },
  
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router