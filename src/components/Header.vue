<template>
    
        <div class="header">
            <mt-header title="multiple button">
                <router-link to="/GatBackPassword" slot="left">
                    <van-icon name="arrow-left" />
                    <mt-button @click="handleClose" ></mt-button>
                </router-link>
                <span>掌上建材</span>
                <mt-button icon="more" text-align="right">
                    <van-icon name="ellipsis" />
                </mt-button>
            </mt-header>
        </div>
        
    
</template>
<script>
    export default {
        name:'Header',
        data() {
            return {
            };
        },
        methods: {
            handleClose (){
                let _this = this;
                _this.$router.push({
                    path:'/GatBackPassword'
                })
            }   
        },
    }
</script>
<style>
.home{
  overflow: hidden;
}
.header{
  background-color: white;
  padding:82px 0 20px 0;
  width: 750px;
  float: left;
}
.button{
    text-align: center;
}
</style>