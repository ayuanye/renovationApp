<template>
    <div class="home">
        <NavBar v-show="navShow" :title="title" :left="left"></NavBar>
        <div class="header">
            <div >
                <van-search
                v-model="search"
                shape="round"
                background="white"
                @search="listCase()"
                @cancel="onCancel"
                placeholder="请输入商家名称"
                />
            </div>
            <div class="center">
                <div class="center_top">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                    <van-cell>
                        <div class="van_card" v-for="(option,index) in appNameOpts" :key="index" :value="option" :model="shoplist" @click="goDetile(option)"> 
                            <div class="van-card__thumb">
                                <img :src="option.image ?option.image[0] : 'http://7n.kaokao.mobi/FkEWKOOEKZ7mkpw47rR3r8_e2NFs'" />
                            </div>
                            <div class="van_card_text">
                                <div class="van">
                                    <div class="van_left">
                                        <span>{{option.shopname}}</span>
                                    </div>
                                    <div class="van_middle">
                                        <van-icon name="like" />
                                        <span>{{option.follow}}人关注</span>
                                    </div>
                                    <div class="van_mast">
                                        <van-icon name="location" />
                                        <span>{{option.address | setadress}}</span>
                                    </div>
                                    <div class="van_foot">
                                        <div class="vans">
                                            <span>配送上门</span>
                                        </div>
                                        <div class="vans">
                                            <span>包安装</span>
                                        </div>
                                    </div>
                                    <div class="follow">
                                        <van-button round id="btn" type="danger" @click.stop="shopfollow(option)">{{option.is_follow == 0 ? '关注':'已关注'}}</van-button>
                                    </div>
                                    
                                </div>                           
                            </div>
                        </div>
                    </van-cell>
                    </van-list>
                    </van-pull-refresh>
                    <!-- <div class="van_card" v-for="(option,index) in appNameOpts" :key="index" :value="option" :model="shoplist" @click="goDetile(option)" > 
                        <div class="van-card__thumb">
                            <img :src="option.image[0]" />
                        </div>
                        <div class="van_card_text">
                            <div class="van">
                                <div class="van_left">
                                    <span>{{option.shopname}}</span>
                                </div>
                                <div class="van_middle">
                                    <van-icon name="like" />
                                    <span>8888人关注</span>
                                </div>
                                <div class="van_mast">
                                    <van-icon name="location" />
                                    <span>{{option.address | setadress}}</span>
                                </div>
                                <div class="van_foot">
                                    <div class="vans">
                                        <span>配送上门</span>
                                    </div>
                                    <div class="vans">
                                        <span>包安装</span>
                                    </div>
                                </div>
                                <div class="follow">
                                    <van-button round type="danger">关注</van-button>
                                </div>
                                
                            </div>                           
                        </div>
                    </div> -->
                    <!-- <div class="van_card">
                        <div class="van-card__thumb">
                            <img src="./image/店家.webp" />
                        </div>
                        <div class="van_card_text">
                            <div class="van">
                                <div class="van_left">
                                    <span>马可波罗瓷砖(徐东店)</span>
                                </div>
                                <div class="van_middle">
                                    <van-icon name="like" />
                                    <span>8888人关注</span>
                                </div>
                                <div class="van_mast">
                                    <van-icon name="location" />
                                    <span>湖北省武汉市团结大道1051号</span>
                                </div>
                                <div class="van_foot">
                                    <div class="vans">
                                        <span>配送上门</span>
                                    </div>
                                    <div class="vans">
                                        <span>包安装</span>
                                    </div>
                                </div>
                                <div class="follow">
                                    <van-button round type="danger">关注</van-button>
                                </div>
                                
                            </div>                           
                        </div>
                    </div> -->
                    
                </div>
                <div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Tabbar from '@/components/Tabbar.vue'
import NavBar from "@/components/NavBar.vue";
const axios = require('axios')
  export default {
    name: 'Home',
    components: {
      NavBar: NavBar,
      Tabbar
    },
    data() {
      return {
        title:'',
        left:'',
        search:'',
        navShow:true,
        selected:"0",
        shoplist:'',
        appNameOpts:[],
        loading: false,
        finished: false,
        refreshing: false,
      };
    },
    filters:{
        setadress(value){
            if(value.length>14){
                let str = value;
                let values = str.substring(0,14);
                let items = values + "...";
                return items
                // return 123456
            }else{
                return value
            }
        }
    },
    created() {
      this.listCases();
    },
    methods: {
        listCases(){
            let _this = this;
            _this.loading = true;
            // _this.$route.getters()
            axios.post('/hdvcmKBoQX.php/wanlshop/auths/shoplist',{
                page:1,
                limit:8,
                info:_this.$route.query.info,
                uid:_this.$Global.getUserId('user_id'),
                keywords:_this.$route.query.id
            }).then(function(res){
                _this.appNameOpts = res.data.data.rows;
                _this.loading = false;
                console.log(_this.appNameOpts)
            })
        },
        listCase(){
            let _this = this;
            axios.post('/hdvcmKBoQX.php/wanlshop/auths/shoplist',{
                page:1,
                limit:8,
                info:_this.search,
                uid:_this.$Global.getUserId('user_id')
            }).then(function(res){
                _this.appNameOpts = res.data.data.rows;
                console.log(_this.appNameOpts)
            })
        },
        goDetile(option){
            this.$router.push({
            path:'/Merchant',
            query:{
                id:option.id,
                title:option.shopname,
                shop_id:option.shop_id
            }
            })
        },
        onLoad() {
            let _this = this;
            // axios.post('/hdvcmKBoQX.php/wanlshop/auths/shoplist',{
            //     page:1,
            //     limit:8,
            //     info:_this.$route.query.info,
            // }).then(function(res){
            //     _this.appNameOpts = res.data.data.rows;
            //     console.log(_this.appNameOpts)
            // })
            // setTimeout(() => {
            //     if (_this.refreshing) {
            //         _this.refreshing = false;
            //     }
            //     for (let i = 0; i < 10; i++) {
            //         _this.appNameOpts.push(_this.appNameOpts.length + 1);
            //     }
                _this.loading = false;
            //     if (_this.appNameOpts.length >= 40) {
            //         _this.finished = true;
            //     }
            // }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = false;
            this.onLoad();
        },
        shopfollow(option){
            // console.log(option,"1243566")
            let _this = this;
            console.log('=========',option.shop_id,)
            console.log("+++++++++",this.$Global.getToken('token'))
            let getToken = '';
            if (_this.$Global.getToken('token')){
                _this.getToken = _this.$Global.getToken('token')
                axios.defaults.headers.common["token"] = _this.getToken
                axios.post('/api/wanlshop/shop/addfollow',{
                    shop_id:option.shop_id           
                }).then(function(res){
                    let request = res.data.data
                    _this.listCases()

                })
            }else {
                _this.$router.push({
                    path:'/Login',
                    query:{}
                })
            }

        },
        onCancel() {
            Toast('取消');
        },
    },
    mounted(){
      this.title = this.$route.meta.title;
      this.left = this.$route.meta.left; 
    },
    filters: {
        setadress: function(value) {
          if (value && value.length > 10) {  //字符最大长度
            value = value.substring(0, 10) + "...";  //超过省略
          }
    
          return value;
        },
      },
  }
</script>
<style scoped>
.home{
  /* overflow: hidden; */
  height: 1000px;
  background-color: #FaFaFa;
  
}
.header{
  background-color:#FaFaFa;
  padding: 15px 10px;

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
  padding-bottom: 10px;
}
.header .center_top{
    padding: 22px 20px 10px 20px;
}
.header .van_card{
    height: 180px;
    border-radius: 15px;
    padding: 20px 10px 20px 10px;
    background: white;
    display: flex;
    justify-content:space-between;
    margin-bottom: 20px;
}
.header .van-card__thumb{
    height: 150px;
    width: 150px;
    border-radius: 15px;
    margin-top: 15px;
    border:2px solid #D1D1D1;
    /* padding: 10px 10px 20px 0; */
}
.header .van-card__thumb img{
    width: 100%;
    height: 100%;
    
    border-radius: 15px;
}
.header .van_card_text{
    height: 180px;
    width: 490px;   
    /* background: rgb(8, 221, 154); */
    padding: 0 0 20px 0;
}
.header .van {
    height: 220px;
    position: relative;
}
.header .van .van_left{
    height: 40px;
    line-height: 40px;
    font-size: 30px;
    font-weight: bold;
    color: #4B4B4B;
    padding-top: 10px;
}
.header .van_middle{
    height: 32px;
    line-height: 32px;
    font-size: 25px;
    margin: 10px 0;
}
.header .van_mast .icon{
    margin-right: 10px;
}
.header .van_middle .van-icon{
    width: 25px;
    height: 25px;
    font-size: 25px;
    line-height: 25px;
    color: #EDD200;
    margin:0 10px 0 0;
}
.header .van_mast {
    height: 32px;
    line-height: 32px;
    font-size: 25px;
    color: #C6C6C6;
}
.header .van_mast .van-icon{
    font-size: 25px;
    line-height: 20px;
    margin:0 5px 0 0;
}
.header .van_foot{
    font-size: 25px;
    display: flex;
}
.header .van_foot .vans{
    height: 32px;
    line-height: 32px;
    background: #CDE6F9;
    margin: 5px 5px 0 0;
    padding: 5px;
    border-radius: 5px;
}
.header .vans span{
    color: #51A7E9;
}
.header .follow{
    width: 110px;
    height: 45px;
    position: absolute;
    top: 30px;
    right: 20px;
    font-size: 25px;
}
.header .home .follow .van-button{
    width: 110px;
    font-size: 25px;
}
.header .follow .van-button--danger{
    width: 110px;
    height: 45px;
}
.header .van-button--normal{
    font-size: 25px;
}
.header .van-button__content .van-button__text[data-v-2f319985]{
    font-size: 25px;
}
.header input::-webkit-input-placeholder {
  /* color: #ffffff !important; */
  /* font-weight: 400; */
  font-size: 25px !important;
}
.header .van-cell{
    padding: 0px;
}
.header .van-cell__value{
    /* margin-bottom: 50px; */
    background: #FaFaFa;
}
.header .van-cell__value{
    padding: 0px;
}
</style>

