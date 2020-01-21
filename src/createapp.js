import Vue from 'vue'
import App from './App'
import axios from 'axios'
import {createRouter} from './router/index'
import{createStore} from './store/index'
import 'highlight.js/styles/tomorrow-night-eighties.css'
import jquery from 'jquery'
Vue.prototype.$axios=axios
Vue.prototype.$=jquery
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