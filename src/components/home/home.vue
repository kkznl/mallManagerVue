<template>
  <el-container class='container'>
    <el-header class='header'>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="height: 60px;"><img src="../../assets/images/1.jpg" alt="无法显示该图片" /></div>
        </el-col>
        <el-col :span="18">
          <h3 class="title">电商管理系统</h3>
        </el-col>
        <el-col :span="2"><a class="logoff" href="javascript:;" @click="logout()">退出</a></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class='aside' width="200px">
      <!-- 导航栏-->
      <!-- 开启路由模式router true-->
        <el-menu
        :unique-opened="true"
        :router="true"
         >
          <!-- 1-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="users">
                <i class="el-icon-success"></i>
                <span>用户列表</span>
              </el-menu-item>
          </el-submenu>
          <!-- 2-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="1-1">
                <i class="el-icon-user-solid"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-view"></i>
                <span>权限列表</span>
              </el-menu-item>
          </el-submenu>
          <!-- 3-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="1-1">
                <i class="el-icon-coin"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-box"></i>
                <span>分类参数</span>
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-guide"></i>
                <span>商品分类</span>
              </el-menu-item>
          </el-submenu>
          <!-- 4-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>

          </el-submenu>
          <!-- 5-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-data"></i>
                <span>数据报表</span>
              </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class='main'>
        <!-- 容器-->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default{

     methods:{
        logout(){
           //1.清除token
           localStorage.clear()
           //2.提示
           this.$message.success("退出成功！")
           //3.到达login页面
           this.$router.push({name:'login'})
        }
     },
     beforeCreate() {
       /* 进入首页的权限验证，无token直接跳转登陆页面*/
       //获取token
       const token = localStorage.getItem('token')
       if(!token){
            //没有，则返回登陆页面
           this.$router.push({name:'login'})
       }
       //if token有，则继续渲染
     }
  }
</script>

<style>
  .container {
    height: 100%;
  }

  .header {
    background-color: #b3c0d1;
  }

  .aside {
    background-color: #d3dce6;
  }

  .main {
    background-color: #e9eef3;
    height: 100%;
  }

  img {
    height: 100%;
    width: 100%;
  }

  .title {
    height: 100%;
    text-align: center;
  }

  .logoff {
    line-height: 3.75rem;
    text-decoration: none;
  }
</style>
