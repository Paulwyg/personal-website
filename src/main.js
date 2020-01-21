// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
import {createApp} from './createapp'
import './plugins/element.js'
// import "./plugins/jquery.js";
// import store from './store'

// Vue.config.productionTip = false
const {app,router}=createApp()
router.onReady(()=>{
  app.$mount('#app')
})
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
