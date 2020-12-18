import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
//@  这个标记能自动找到src文件夹

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/',   //根目录
      name:'home',
      component:Home
    }
  ]
})
