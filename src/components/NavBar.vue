<template>
    <div id="NavBar">
    <van-nav-bar :title="title" fixed :left-arrow="left" @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    components: {},
    props: ["title","left"],

    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        }
    },
    
};
</script>

<style>
#NavBar{
    height: 100px;
    line-height: 100px;

}
.van-nav-bar{
    height:100px;
    line-height: 100px;
}
.van-nav-bar > div{
    height:100px;
    line-height: 100px;
}
.van-nav-bar__title{
    font-size: 35px !important;
}
.van-nav-bar__left .van-icon {
    font-size: 35px !important;
}
</style>