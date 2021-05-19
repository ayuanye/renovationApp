<template>
    <div>
        <!-- <div class="contentBox" v-for="(option,index) in appNameOpts" :key="index" :value="option" :model="shoplist">  -->
        <div class="contenBox"> 
            <!-- <NavBar v-show="navShow" flex :title="title" :left="left"></NavBar> -->
            <!-- <div v-for="(option,index) in appNameOpts :key="option" :value="index"> -->

                <div class="itemList">
                    <van-swipe ref="mySwiper">
                        <van-swipe-item v-for="(item,index) in swiperData" :key="index">
                            <img :src="item" @click="swiperImgClick()"/>
                        </van-swipe-item>
                    </van-swipe>
                    
                </div>
                <div class="title" :model="appNameOpts">
                    <van-card
                        :title="appNameOpts.title"
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
                                <p>8888人收藏</p>
                            </div>
                            <div class="priceNum">
                                <span class="yuan">¥</span>
                                <span class="yuanNum">{{appNameOpts.price}}</span>
                                <span class="yuanFan">/{{appNameOpts.unit_name}}</span>
                            </div>
                            <div class="icon" @click="followgoods(appNameOpts)">
                                <van-icon :name="appNameOpts.is_follow == 0 ? 'star-o':'star'" />
                                <div>
                                    <span>{{appNameOpts.is_follow == 0 ?"收藏":"已收藏"}}</span>
                                </div>
                            </div>
                        </template>
                        <template #footer>
                            <van-button size="normal" text='25px'>选规格</van-button>
                        </template>
                    </van-card>
                </div>
                <div class="decript">
                    <div class="fifst">
                        <span>详情</span>
                    </div>
                    <div class="child">
                        <span>型号：&nbsp;&nbsp;{{appNameOpts.sn}}</span>               
                    </div>
                    <div class="child">
                        <span>尺寸：&nbsp;&nbsp;800 * 800 cm</span>
                    </div>
                    <div class="child">
                        <span>规格：&nbsp;&nbsp;大理石</span>
                    </div>
                    <div class="child">
                        <span>厂商：&nbsp;&nbsp;{{appNameOpts.brand_name}}</span>
                    </div>
                </div>
                <div class="foot">
                    <div class="foot_up">
                        <span>施工工艺</span>
                    </div>
                    <div class="foot_down">
                        <span>{{appNameOpts.content}}</span>
                    </div>
                </div>
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
import { ImagePreview } from 'vant';
import NavBar from "@/components/NavBar.vue";
import axios from 'axios';
import { Toast } from 'vant';
export default {
    components: {
        ImagePreview,
        NavBar: NavBar,
    },
    data() {
        return {
            appNameOpts:'',
            shoplist:'',
            title:'',
            left:'',
            search:'',
            navShow:true,
            swiperData:[
                'http://7niu.caicai.run/com-domeImg1.png',
                'http://7niu.caicai.run/com-domeImg2.png',
                'http://7niu.caicai.run/com-domeImg3.png',
                'http://7niu.caicai.run/com-domeImg4.png',
            ]
        };
    },
    mounted(){
        Toast.loading({
            message: '加载中...',
            forbidClick:true
        });
      this.title = this.$route.meta.title;
      this.left = this.$route.meta.left; 
      console.log(this.$route.path,'ssssssssssss') 
    },
    created() {
        this.listCase()
    },
    methods: {
        listCase(){
            let _this = this;
            axios.post('/api/wanlshop/goods/detail',{
                id:_this.$route.query.id,
                uid:_this.$Global.getUserId('user_id')
            }).then(function(res){
                console.log("查看返回什么",res.data.data)
                _this.appNameOpts = res.data.data;
            })
        },
        swiperImgClick(){
            ImagePreview(this.swiperData)
        },
        followgoods(appNameOpts){
            let _this = this;
            let getToken = '';
            if (_this.$Global.getToken('token')){
                axios.defaults.headers.common["token"] = _this.$Global.getToken('token');
                _this.$axios.post('api/wanlshop/goods/addfollow',{
                    goods_id:appNameOpts.id
                }).then(function(response){
                    console.log(response,"点击关注")
                    _this.listCase()
                })
            }else {
                _this.$router.push({
                    path:'/Login',
                    query:{}
                })
            }
        }
    },
}
</script>
<style>
    .contenBox{
        background-color: #FaFaFa;
    }
    .contenBox .van-nav-bar{
       opacity: 0;
    }
    .contenBox .van-nav-bar__content{
        opacity:0;
    }
    .contenBox .itemList{
        width: 100%;
        height: 440px;
        margin-bottom: 20px;
        margin-top: 0px;
        padding: 0px;
    }
    .contenBox .van-swipe{
        width: 100%;
        height: 100%;
    }
    .contenBox .itemList img{
        width: 100%;
        height: 100%;
    }
    .contenBox .title{
        /* background: bisque; */
        height: 220px;
        margin-bottom: 20px;
    }
    .contenBox .van-card{
        width: 100%;
        height: 100%;
    }
    .contenBox .van-card{
        position: relative;
        height: 100%;
        margin-bottom: 10px;
        background-color: #fff;
        width: 100%;
        padding: 20px 0;
    }
    .contenBox .van-card__thumb{
        width: 160px;
        height: 160px;
        border-radius: 20px;
        padding: 10px;
        box-sizing: border-box;
    }
    .contenBox .van-card__thumb img{
        width: 160px;
        height: 160px;
        border-radius: 20px;
    }
    .contenBox .van-card__content{
        margin-left: 15px;
    }
    .contenBox .van-card__title{
        overflow:visible;
        font-size: 35px;
        font-weight: bold;
        padding-top:20px;
        height: 35px;
        line-height: 35px;
    }
    .contenBox .goodText{
        color: #666;
        font-size: 24px;
        padding-left: 20px;
        margin-top:35px;
    }
    .contenBox .labsList{
        margin-top:10px;
        height: 30px;
    }

    .contenBox .itemLab{
        font-size: 18px;
        border-right: 2px solid #FF8319;
        width: 68px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: #7E7E7E;
        float: left;
    }
    .contenBox .labsList .itemLab:last-child{
        border: none;
    }
    .contenBox .labsList .itemLab:nth-child(1){
        text-align: left;
        width: 56px;
    }
    .contenBox .collectNum{
        margin-top:6px;
        height: 34px;
        line-height: 20px;
    }
    .contenBox .collectNum .van-icon{
        margin-left: 0;
        color: #EDD200;
        margin-right: 10px;
        float: left;
    }
    .contenBox .collectNum p{
        font-size: 18px;
        color: #7E7E7E;
        float: left;
        line-height: 34px;
    }
    .contenBox .yuan{
        font-size: 12px;
        color: #FF5252;

    }
    .contenBox .yuanNum{
        font-weight: 600;
        font-size: 26px;
        color: #FF5252;
        margin:5px 3px;
    }
    .contenBox .yuanFan{
        color: #DADADA;
        font-size: 12px;
    }
    .contenBox .van-card__footer{
        position: absolute;
        width: 150px;
        height:60px;
        right: 30px;
        bottom: 30px;
        font-size: 30px;
        font-weight: bold;
        /* background-color: #FDC13A; */
        color: #433E33;
    }
    .contenBox .van-card__footer .van-button {
        width: 100%;
        height: 100%;
        background-color:#FDC13A;
        border-radius: 10px;
    }
    .contenBox .flexBox{
        /* float: left; */
    }
    .contenBox .tabBox{
        display: flex;
    }
    .contenBox .priceNum{
        font-size: 40px;
    }
    .contenBox .icon{
        position:absolute;
        top :10px;
        right: 30px;
        text-align: center;
        font-size: 30px;
        color: #9E9E9E;
    }
    .contenBox .icon span{
        font-size: 20px;
    }
    .contenBox .decript{
        background: #FFFFFF;
        height: 300px;
        margin-bottom: 20px;
        font-size: 28px;
        padding: 30px;
    }
    .contenBox .fifst{
        font-size: 40px;
        color: #3F3F3F;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .contenBox .child{
        margin: 10px 0;
    }
    .contenBox .foot{
        background: #FFFFFF;
        height: 130px;
        padding: 30px;
        font-size: 28px;
    }
    .contenBox .foot_up{
        font-size: 40px;
        color: #3F3F3F;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .contenBox .van-icon-star::before{
        color: #FDC13A;
    }
    .contenBox .van-button__content{
        font-size: 25px;
    }
    .contenBox .van-button__text{
        font-size: 25px;
    }
</style>

