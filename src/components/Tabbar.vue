<template>
    <div class="tabbar">
        <van-tabbar v-model="active" @change="onChange" fixed route tabbar:true active-color="#FE6767">
            <van-tabbar-item replace to="/Home">
            <span>首页</span>
            <template #icon="props">
                <img :src="props.active ? 'http://7niu.caicai.run/icon-home-s.png' : 'http://7niu.caicai.run/icon-home.png'" />
            </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/Order" icon="search">
            <span>材料框</span>
            <template #icon="props">
                <img :src="props.active ? 'http://7niu.caicai.run/com-cat-s2.png' : 'http://7niu.caicai.run/com-cat1.png'" />
            </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/Profile" icon="search">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? 'http://7niu.caicai.run/icon-me-s.png' : 'http://7niu.caicai.run/icon-me.png'" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
    
<script>
    import 'vant/lib/index.less';
    export default {
        name: 'Tabbar',
        components: {},

        data() {
            return {
                active:0
            };
        },
        mounted() {
        },
        methods: {
            onChange(index) {
                console.log(this.active)
            },
        },
        watch: {
        },
    };
</script>

<style>
.tabbar{
    height: 110px;
}
.van-tabbar-item {
    font-size: 25px;
    /* height: 50px; */
}
.van-icon {
    font-size: 30px;
}
.van-tabbar{
    height: 100px;
}
.van-tabbar-item__icon{
    font-size: 30px;
    margin-bottom: 13px;
}
.van-tabbar .van-tabbar-item__icon .van-icon{
    font-size: 30px;
    height: 30px;
    width: 30px;
}
.van-tabbar-item__icon img{
    width: 40px;
    height: 40px;
}
</style>