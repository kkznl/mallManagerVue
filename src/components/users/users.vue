<template>
  <el-card class="box-card">
    <!-- 1.面包屑-->
    <!-- /首页/用户管理/用户列表-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.搜索-->
    <el-row>
      <el-col :span="12">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
      </el-col>
      <el-col :span="12"><div style="margin-top: 15px;"><el-button type="success">添加用戶</el-button></div></el-col>
    </el-row>
    <!-- 3.表格-->
     <el-table
           :data="users"
           style="width: 100%">
           <el-table-column
             type="index"
             label="#"
             width="60">
           </el-table-column>
           <el-table-column
             prop="userName"
             label="姓名"
             width="80">
           </el-table-column>
           <el-table-column
             prop="email"
             label="邮箱">
           </el-table-column>
           <el-table-column
             prop="mobile"
             label="电话">
           </el-table-column>
           <el-table-column
             prop="creatTime"
             label="创建时间">
           </el-table-column>
           <el-table-column
               prop="status"
               label="用户状态">
           </el-table-column>
           <el-table-column
               label="操作">
           </el-table-column>

         </el-table>
    <!-- 4.分页 -->
  </el-card>
</template>

<script>
  export default{
    data() {
      return {   
          query:'',
          users:[],
          totalpage:0,
          pagenum:1,  /* 默认第一页*/
          pagesize:2  /* 默认每页显示两行*/
      }
    },
    methods:{
      //异步获取用户列表
      async getUserList(){
          //设置请求头，让token一起传到后端
          const token = localStorage.getItem("token");
          this.$http.defaults.headers.common['Authorization'] = token   //设置请求头的具体方法

          const res = await this.$http.get('users?query='+this.query + '&pagenum=' + this.pagenum + '&pagesize=' + this.pagesize)
          console.log(res)
          //给各个东西赋值
          if(res.data.meta.status === 200){
            this.users = res.data.users
          }else{
            this.$message.error("获取用户列表失败")
          }
      }
    },
    created() {
      //页面加载的时候执行
      this.getUserList()
    }
  }
</script>

<style>
  .box-card {
    height: 100%;
  }
</style>
