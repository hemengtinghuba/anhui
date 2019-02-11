import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  './directive'
import  './mixin'
import  './components/index'

//========================第三方模块引入=============================//
import ElementUI from 'element-ui'
import axios from "./api/api"
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(axios)

//=================================================================//



Vue.config.productionTip = true


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
