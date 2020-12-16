<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" class="login-form">
      <h2>用户登陆</h2>
      <el-form-item label="账号">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-button class="login-button" type="primary" @click = "handleLogin" round>主要按钮</el-button>
    </el-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods:{
      handleLogin:function(){
        this.$http.get("login").then(res=>{
           console.log("数据：" + res.status , res.status)
        })
      }
    }
  }
</script>

<style>
  .login-wrap {
    height: 100%;
    background-color: #324152;
    /* 弹性盒子布局*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form{
    width: 25rem;
    background-color: #fff;
    border-radius: 0.3125rem;
    padding: 1.875rem;
  }
  .login-form .login-button{
    margin-top: 0.625rem;
    width: 100%;
  }
</style>
