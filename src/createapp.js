import Vue from 'vue'
import App from './App'
import './plugins/axios'
import {createRouter} from './router/index'
import{createStore} from './store/index'
import 'highlight.js/styles/tomorrow-night-eighties.css'
import jquery from 'jquery'
import utils from './plugins/utils'
//Vue.prototype.$axios=axios
Vue.prototype.$=jquery
Vue.prototype.utils=utils
export function createApp(context) {
    const router = createRouter()
    const store=createStore()
    const app=new Vue({
        router,
        context,
        store,
        render:h=>h(App)
    })
    return {app,router}
}