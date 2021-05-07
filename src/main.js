import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './utils/rem.js'
import {TabItem, Tabbar, InfiniteScroll} from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'amfe-flexible'
import './assets/css/reset.css'
import './assets/css/commons.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import less from 'less'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Dialog } from 'vant';

Vue.use(less)
Vue.use(Vant);
Vue.use(VueAxios, axios)
Vue.use(Dialog);



Vue.config.productionTip = false
Vue.component(TabItem.name, TabItem)
Vue.component(Tabbar.name, Tabbar);
Vue.use(InfiniteScroll);

axios.defaults.baseURL = 'https://boss.weicoming.com'; // 你的接口地址 
axios.defaults.responseType="json";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')