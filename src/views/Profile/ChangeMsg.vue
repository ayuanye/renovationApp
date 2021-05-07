<template >
    <div>
        <NavBar v-show="navShow" :title="title" :left="left"></NavBar>
        <div class="content">
            <van-cell-group>
                <van-cell title="头像">
                    <van-uploader :max-count="1" :after-read="afterRead" v-model="fileList" />
                
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>
<script>

import Tabbar from '@/components/Tabbar.vue'
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ChangeMsg',
  components: {
    NavBar: NavBar,
    Tabbar
  },
  data() {
    return {
        title:'',
        left:'',
        navShow:true,
        fileList:[],
    };
  },
  mounted(){
    this.title = this.$route.meta.title;
    this.left = this.$route.meta.left; 
  },
  methods:{
      afterRead(file) {
        console.log(file);
    },
  }

}
</script>

<style >
.van-cell{
    height:100px;
    line-height: 80px;
     background:url('http://7niu.caicai.run/com-666-right-jiantou.png') 700px 35px / 30px 30px no-repeat;
}
.van-cell span{
    font-size: 30px;
}
.van-uploader__preview-delete{
    background-color: #fff;
}
.van-uploader__preview-delete-icon{
    top: -15px;
    right: -20px;
    color: rgba(0, 0, 0, .4);

}

</style>