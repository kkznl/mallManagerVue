<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" class="login-form">
      <h2>用户登陆</h2>
      <el-form-item label="账号">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" show-password class="eleput"></el-input>
      </el-form-item>
      <el-button class="login-button" type="primary" @click = "handleLogin" round>登陆</el-button>
    </el-form>

  </div>
</template>



<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods:{
        async handleLogin(){
        let params = new URLSearchParams()
        params.append("mgName",this.username)
        params.append("mgPwd",this.password)
        const _this = this

        //async + await 将异步代码实现为同步代码
        const res = await this.$http.post("login",params)    //async放在方法前面  await放在异步操作的前面

        let msg = res.data
        if (msg.status === 200){
            _this.$message.success("登陆成功！")
            //获取传过来的token,并存储在本地
            const jwtToken = msg.token
            localStorage.setItem("token",jwtToken)
            //跳转主页
            _this.$router.push({name:'home'})
        }else{
            _this.password = ''
            _this.$message.error('用户名或密码错误！登陆失败！');
        }


        //异步代码
        /* this.$http.post("login",params).then(res=>{
           console.log("数据：" + res , res.status)
           let msg = res.data
           if (msg.status === 200){
               _this.$message.success("登陆成功！")
               //跳转主页
               _this.$router.push({name:'home'})
           }else{
               _this.password = ''
               _this.$message.error('用户名或密码错误！登陆失败！');
           }
        }) */
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
