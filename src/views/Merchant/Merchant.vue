<template>
  <div class="contentBox">
    <NavBar v-show="navShow" :title="title" :left="left"></NavBar>
        <van-search
          v-model="search"
          shape="round"
          background="white"
          @search="searchgoods()"
          placeholder="请输入商品名称"
        />
        <div class="itemList">
            <div class="shareBox">
                <van-cell @click="showShare = true"><van-icon name="http://7niu.caicai.run/com-share-icon3.png" /></van-cell>
                <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :options="options"
                />
                <div class="shareIcon">
                    <van-icon name="like-o" v-if="!shopItem.is_follow" @click="shopFollow()" />
                    <van-icon name="like" v-if="shopItem.is_follow" @click="shopFollow()" style="color:#EDD200" />    
                </div>
            </div>
            <van-tabs v-model="active" 
                title-active-color="#FF8319"  
                @click="onClick"
                color="#FF8319"
                >
                <van-tab class="tabBox" title="主营">
                    <div class="flexBox">
                        <van-sidebar v-model="activeKey" @change="onChange" >
                            <van-sidebar-item v-for="(option,index) in titleList" :key="index" :value="option" :title="option.name | setadress" />
                            <!-- <van-sidebar-item title="标签名2" />
                            <van-sidebar-item title="标签名3" />
                            <van-sidebar-item title="标签名1" />
                            <van-sidebar-item title="标签名2" />
                            <van-sidebar-item title="标签名3" /> -->
                        </van-sidebar>
                    </div>
                    
                    <div class="goodList">
                        <p class="goodText">所有商品</p>
                        <van-card
                            v-for="(option,index) in goodList" :key="index" :value="option"
                            :title="option.title | setadress10"
                            :thumb="option.images[0]"
                            @click="Shopdescript(option)"
                            >
                            <template #tags>
                                <div class="labsList">
                                    <div class="itemLab">现代</div>
                                    <div class="itemLab">简约</div>
                                    <div class="itemLab">时尚</div>
                                    <div class="itemLab">轻奢</div>
                                </div>
                                <div class="collectNum">
                                    <van-icon name="star" />
                                    <p>{{option.follow}}</p>
                                </div>
                                <div class="priceNum">
                                    <span class="yuan">¥</span>
                                    <span class="yuanNum">{{option.price}}</span>
                                    <span class="yuanFan">{{option.unit_name}}</span>
                                </div>
                            </template>
                            <template #footer>
                                <van-button size="normal">选规格</van-button>
                            </template>
                        </van-card>
                    </div>
                </van-tab>
                <van-tab title="商家">
                    <div class="goodName">{{shopItem.shopname}}</div>
                    <div class="collectNum" style="margin-top:10px">
                        <van-icon name="like" />
                        <p>{{shopItem.follow}}人收藏</p>
                    </div>
                    <div class="collectNum" style="margin-top:10px">
                        <van-icon name="http://7niu.caicai.run/com-yueya-icon.png" />
                        <p>7:00 - 20:00</p>
                    </div>
                    <div class="imgList">
                        <div class="slideBox">
                            <div class="imgBox" v-for="(option,index) in shopItem.image" :key="index" :value="option">
                            <img :src="option" alt="">
                            </div>
                            <!-- <div class="imgBox">
                                <img src="http://7n.kaokao.mobi/FkEWKOOEKZ7mkpw47rR3r8_e2NFs" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="http://7n.kaokao.mobi/FkEWKOOEKZ7mkpw47rR3r8_e2NFs" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="http://7n.kaokao.mobi/FkEWKOOEKZ7mkpw47rR3r8_e2NFs" alt="">
                            </div> -->
                        </div>
                    </div>
                    <div class="siteBox">
                        <van-icon name="map-marked" />
                        <p class="siteTex">{{shopItem.address}}</p>
                        <p class="bossBox">
                            <a @click="Callme()"><van-icon name="phone-o" /></a>
                            <span>{{shopItem.name}}</span>
                        </p>
                    </div>
                </van-tab>
                <van-tab title="安装说明">

                </van-tab>
            </van-tabs>
        </div>
        <div class="afterBox" v-if="isGood==1">
            <div class="afterItem">
                <van-icon name="http://7niu.caicai.run/com-huoche-icon.png" />
                配送服务：配送服务配配送服务配送服务配送服务
                </div>
            <div class="afterItem">
                <van-icon name="http://7niu.caicai.run/com-dianzhuan-icon.png" />
                安装服务：配送服送服务配送服务配送服务配送服务
            </div>
        </div>
        <div class="afterBox" v-if="isGood==1" style="margin-top:15px">
            <div class="afterItem">
                <van-icon name="volume" />
                温馨提示：配送服务配配送服务配送服务配送服务
            </div>
        </div>
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
      search:'',
      active:'',
      activeKey: 0,
      listItem :6,
      isGood:0,
      shopId:'',
      id:'',
      titleList:'',
      goodList:'',
      shopItem:{
          name:'',
          image:[],
          address:'',
          shopname:'',
          is_follow:'',
          follow:''

      },
      listLength:0,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
    };
  },
    filters:{
        setadress(value){
            if(value.length>3){
                let str = value;
                let values = str.substring(0,3);
                let items = values + "...";
                return items
                // return 123456
            }else{
                return value
            }
        },
        setadress10(value){
            if(value.length>10){
                let str = value;
                let values = str.substring(0,8);
                let items = values + "...";
                return items
                // return 123456
            }else{
                return value
            }
        }
    },
  created(){
    this.title = this.$route.query.title;
    this.left = this.$route.meta.left; 
    this.id = this.$route.query.id;
    this.shopId = this.$route.query.shop_id;
    this.GetQueryData()
    this.queryShopList()
    console.log(this.title,this.left)
  },
  mounted(){

  },
  methods:{
    onSubmit(values) {
    //   console.log('submit', values);
    },
    searchgoods(){
        let _this = this;
        _this.$axios.post('/api/wanlshop/goods/index',{
            title:_this.search,
            shop_id:_this.shopId
        }).then(function(res){
            // console.log('123456766666666666666666',res.data)
            _this.goodList = res.data.data.rows
            _this.listLength = res.data.data.rows.length
        })
    },
    GetQueryData(){
        let that = this;
        axios.post('/api/wanlshop/shop/shopclass',{
            shop_id:that.shopId,
        }).then(function(res){
            // console.log(res.data.data.rows)
            that.titleList = res.data.data.rows
            that.listLength = res.data.data.rows.length
            that.queryGoodList()
        })
    },
    onClick(name, title){
        this.isGood = name
        console.log(name, title)
    },
    onChange(index) {
        //   Notify({ type: 'primary', message: index });
        var list =  document.querySelectorAll('.van-sidebar-item')
        for(var i = 0;i<list.length;i++){
            list[i].style.cssText = 'border-radius:0 0 0 0'
        }
        if(index == 0){
            list[1].style.cssText = 'border-radius:0 20px 0 0'
        }else if(index >0 && index < this.listLength-1){
            list[index+1].style.cssText = 'border-radius:0 20px 0 0'
            list[index-1].style.cssText = 'border-radius:0 0 20px 0'
        }else if(index == this.listLength-1){
            list[index-1].style.cssText = 'border-radius:0 0 20px 0'
        }
        this.queryGoodList()
    },
    Shopdescript(item){
        this.$router.push({
            query:{
                id:item.id
            },
            path:'/ShopDiscript'
        })
    },
    shopFollow(){
        let that = this;
        let getToken = '';
        if (that.$Global.getToken('token')){
            axios.defaults.headers.common["token"] = that.$Global.getToken('token');
            axios.post('/api/wanlshop/shop/addfollow',{
                shop_id:that.shopId,
            }).then(function(res){
                console.log(res.data.data)
                that.shopItem.is_follow = res.data.data 
                that.$toast(res.data.data ? '已关注':'已取消');
            })
        }else {
            that.$router.push({
                path:'/Login',
                query:{}
            })
            }
    },
    queryGoodList(){
        let that = this;
        var classid = that.titleList[that.activeKey].id
        axios.post('/api/wanlshop/goods/classgoods',{
            classid:classid,
        }).then(function(res){
            that.goodList = res.data.data.rows
            
        })
    },
    queryShopList(){
        let that = this;
        axios.post('/hdvcmKBoQX.php/wanlshop/auths/shop',{
            shop_id:that.shopId,
            uid:that.$Global.getUserId('user_id')
        }).then(function(res){
            // that.goodList = res.data.data.rows
            that.shopItem = res.data.data
        })
    },
    Callme(){
        let mobile = this.$Global.getPhonenumber('mobile')
        if(mobile){
            window.location.href = 'tel://'+mobile
        }else{
            this.$router.push({
                path:'/Login',
                query:{}
            })
        }
        
    }

  }
}
</script>
<style>
.contentBox{
    /* width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0; */
    background-color: #FaFaFa;
}
.contentBox .van-search{
    margin-top: 20px;
}
.contentBox .avatarBox{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin:200px auto 100px;
    background: url('../../../public/img/com-zuce-icon.png') 0 0 /100% 100% no-repeat;
}
.contentBox .van-search{
    height: 80px;
    padding: 2px 20px;
    background-color:#FaFaFa !important;
}
.contentBox .van-search .van-cell{
    height: 70px;
    line-height: 70px;
    padding: 0px;
    /* background: rgb(214, 210, 214); */
}
.contentBox .van-search__content{
    background-color:#F1F1F1 !important;
}
.contentBox .van-tabs{
    width: 400px;
}
.contentBox .itemList{
    width: 690px;
    border-radius: 30px;
    background-color: #fff;
    margin: 0 auto;
    margin-top:20px;
    padding:20px 0;
    position: relative;
    box-sizing: border-box;
    position: fixed;
    top: 200px;
    left: 30px;
}
.contentBox .van-tabs--line .van-tabs__wrap{
    height: 60px;
}
.contentBox .van-tab__text--ellipsis{
    overflow: visible;
    font-size: 30px;
    font-weight: 600;
}
.contentBox .van-tabs__line{
    height: 6px;
    width: 30px;
    border-radius: 3px;
}
.contentBox .shareBox{
    margin-top: 20px;
    margin-right: 20px;
    width: 160px;
    height: 80px;
    position: absolute;
    right: 0;
    top: 0;
}
.contentBox .shareIcon{
    position: absolute;
    right: 60px;
    top: -5px;
    width: 30px;
    height: 30px;

}
.contentBox .shareBox .van-icon{
    width: 30px;
    height: 30px;
    font-size: 30px;
    margin-left: 40px;
}
.contentBox .shareBox .van-icon img{
    width: 30px;
    height: 30px;
}
.contentBox .van-sidebar{
    width: 140px;
}
.contentBox .van-sidebar-item{
    height: 100px;
    line-height: 60px;
    background-color: #F5F8FD;
    color: #999999;
    box-sizing: border-box;
    font-size: 25px;
}
.contentBox .van-sidebar-item--select, .contentBox .van-sidebar-item--select:active{
    background-color: #fff;
}
.contentBox .van-sidebar-item:nth-child(2){
    border-radius: 0 20px 0 0;
}
.contentBox .goodList{
    /* position: absolute;
    left: 140px;
    top:90px;
    min-height: 300px; */
    width: 520px;
}
.contentBox .van-card{
    height: 180px;
    margin-bottom: 10px;
    background-color: #fff;
    width: 520px;
    box-sizing: border-box;
}
.contentBox .van-card__thumb{
    width: 160px;
    height: 160px;
    border-radius: 20px;
    padding: 10px;
    box-sizing: border-box;
}
 .contentBox .van-card__thumb img{
    width: 160px;
    height: 160px;
    border-radius: 20px;
}
.contentBox  .van-card__content{
    margin-left: 15px;
}
.contentBox  .van-card__title{
    overflow:visible;
    font-size: 28px;
    font-weight: 600;
    padding-top:20px;
    height: 34px;
    line-height: 34px;
}
.contentBox .goodText{
    color: #666;
    font-size: 24px;
    padding-left: 20px;
    margin-top:35px;
}
.contentBox  .labsList{
    margin-top:10px;
    height: 30px;
}

.contentBox .itemLab{
    font-size: 18px;
    border-right: 2px solid #FF8319;
    width: 68px;
    text-align: center;
    height: 24px;
    line-height: 24px;
    color: #7E7E7E;
    float: left;
}
.contentBox .labsList .itemLab:last-child{
    border: none;
}
.contentBox .labsList .itemLab:nth-child(1){
    text-align: left;
    width: 56px;
}
.contentBox .collectNum{
    margin-top:6px;
    height: 34px;
    line-height: 20px;
}
.contentBox .van-tab__pane{
    padding: 0 20px;
    box-sizing: border-box;
}
.contentBox .collectNum .van-icon{
    margin-left: 0;
    color: #EDD200;
    margin-right: 10px;
    float: left;
    font-size: 30px;
}
.contentBox .collectNum p{
    font-size: 18px;
    color: #7E7E7E;
    float: left;
    line-height: 34px;
}
.contentBox .yuan{
    font-size: 12px;
    color: #FF5252;
}
.contentBox .yuanNum{
    font-weight: 600;
    font-size: 26px;
    color: #FF5252;
    margin:5px 3px;
}
.contentBox .yuanFan{
    color: #DADADA;
    font-size: 12px;
}
.contentBox .van-card__footer{
    position: absolute;
    width: 100px;
    height:35px;
    right: 30px;
    bottom: 10px;
    /* background-color: #FDC13A; */
    color: #333333;
}
.contentBox .van-card__footer .van-button {
    width: 100%;
    height: 100%;
    background-color:#FDC13A;
    border-radius: 5px;
    font-size: 18px;
}
.contentBox .flexBox{
    /* float: left; */
}
.contentBox .tabBox{
    display: flex;
}
.contentBox .van-tab__pane{
    width: 690px;
    margin:0 auto;
    padding: 0 30 0 0px;
    box-sizing: border-box;
    /* padding: 0 30px; */
}
.contentBox .goodName{
    font-size: 30px;
    width: 690px;
    font-weight: 600;
    margin-top:40px;
}
.contentBox .imgList{
    height: 200px;
    width: 100%;
    overflow: auto;
    margin-top:30px;
    overflow-x: scroll
}
.contentBox .imgList::-webkit-scrollbar {
    width: 0px;
}
.contentBox .slideBox {
    max-width: 1000px;
    height: 160px;
    display: flex;
}
.contentBox .imgList .imgBox{
    width: 240px;
    height: 160px;
    border-radius: 20px;
    margin-right: 30px;
}
.contentBox .imgBox img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
}
.contentBox .siteBox{
    font-size: 25px;
    width: 100%;
    color: #A9A9A9;
    height: 30px;
    box-sizing: border-box;
}
.contentBox .van-icon__image{
    width: 30px;
    height: 30px;
}
.contentBox .siteBox .van-icon{
    margin-left: 0;
    float: left;
    color: #707070;
    width: 30px;
    height: 30px;
    font-size: 30px;
}
.contentBox .siteTex{
    font-size: 25px;
    float: left;
    margin-left: 20px;
}
.contentBox .bossBox{
    float: right;
    height: 30px;
    border-left: 1px solid rgba(0, 0, 0, .3);
    text-align: center;
    font-size: 20px;
    width:130px;
}
.contentBox .bossBox .van-icon{
    float: right;
}
.contentBox .afterBox{
    width: 690px;
    border-radius: 20px;
    background-color: #fff;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    margin-top:600px;
}

.contentBox .afterItem{
    height: 60px;
    line-height: 60px;
    color: #B1B1B1;
    font-size: 24px;
}
.contentBox .afterItem .van-icon{
    /* float: left; */
    margin-left: 0;
    font-size: 24px;
    margin-right: 15px;
    color: #707070;
}
.contentBox .afterItem .van-icon img{
    height: 30px;
    padding-top: 5px;
}
.contentBox input::-webkit-input-placeholder {
  /* color: #ffffff !important; */
  /* font-weight: 400; */
  font-size: 25px !important;
}
.contentBox .itemList .van-icon-like{
    color: #EDD200;
}
.contentBox .van-card__footer .van-button--normal{
    padding: 0 ;
}
.contentBox .van-tabs__content{
    width: 690px;
    overflow: auto;
    max-height:1000px;
    overflow-x: hidden;
}
.contentBox .tabBox .van-tab__pane{
    overflow: auto;
}
.van-share-sheet__header{
    height: 70px;
    line-height: 70px;
    font-size: 25px;
}
.van-share-sheet__title{
    font-size: 25px;
    line-height: 70px;
}
.van-share-sheet__options{
    height: 150px;
    line-height: 150px;
}
.van-share-sheet__cancel::before{
    height: 20px;
}
.van-share-sheet__cancel{
    height: 100px;
    line-height: 100px !important;
    font-size: 30px !important;
    border-bottom: 30px;
}
</style>