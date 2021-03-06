// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
//导入自己的myaxios插件
import MyAxios from '@/plugins/myAxios.js'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyAxios)

//时间拦截器
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
