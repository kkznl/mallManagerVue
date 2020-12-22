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
           :data="tableData"
           style="width: 100%">
           <el-table-column
             type="index"
             label="#"
             width="60">
           </el-table-column>
           <el-table-column
             prop="name"
             label="姓名"
             width="80">
           </el-table-column>
           <el-table-column
             prop="address"
             label="邮箱">
           </el-table-column>
           <el-table-column
             prop="address"
             label="电话">
           </el-table-column>
           <el-table-column
             prop="address"
             label="创建时间">
           </el-table-column>
           <el-table-column
               prop="address"
               label="用户状态">
           </el-table-column>
           <el-table-column
               prop="address"
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
          tableData:[]
      }
    }
  }
</script>

<style>
  .box-card {
    height: 100%;
  }
</style>
