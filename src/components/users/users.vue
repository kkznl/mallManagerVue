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
          <el-input clearable @clear="getUserList" placeholder="请输入内容" v-model="query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-top: 15px;margin-right: 0.3125rem;">
          <el-button type="success" @click="dialogFormVisible = true">添加用戶</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 3.表格-->
    <el-table :data="users" style="width: 100%">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column label="创建时间">
        <template v-slot="users">
          <!-- v-slot代替了以前的slot-scope  row 代表的是当前行 -->
          {{users.row.creatTime | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="用户状态">
        <template v-slot="users">
          <!-- 如果组件需要显示，外面需要包裹一个template容器-->
          <el-switch v-model="users.row.status" @change="updateStatus(users.row)" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="user">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="openUpdateUser(user.row)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" @click="open(user.row.id)" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" @click="openUpdateRoleId(user.row)" circle></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 4.分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalpage">
    </el-pagination>

    <!-- 对话框-->
    <!-- 添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="user.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 更新用户的弹框-->
    <el-dialog title="添加用户" :visible.sync="dialogSetNewUser">
      <el-form :model="newUser">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="newUser.userName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="newUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="newUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetNewUser = false">取 消</el-button>
        <el-button type="primary" @click="setNewUser">添 加</el-button>
      </div>
    </el-dialog>


  <!-- 更新用户的角色id的弹框-->
    <el-dialog title="角色控制" :visible.sync="dialogSetNewrole">
      <el-form :model="newRole">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="newRole.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="newRole.roleId">
            <el-option v-for="item in roles" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetNewrole = false">取 消</el-button>
        <el-button type="primary" @click="updateUserRole">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>



</template>

<script>
  export default {
    data() {
      return {
        query: '',
        users: [],
        totalpage: 0,
        pagenum: 1,
        /* 默认第一页*/
        pagesize: 2,
        /* 默认每页显示两行*/
        dialogFormVisible: false, //增加用户的弹窗控制
        user: {
          userName: '',
          password: '',
          email: '',
          mobile: ''
        },
        dialogSetNewUser: false, //更新用户的弹窗控制
        newUser: {
          userName: '',
          email: '',
          mobile: '',
          id: 0
        },
        dialogSetNewrole:false, //更新用户角色id的弹窗控制
        newRole:{
          id:0,
          userName:'slk',
          roleId:40
        },  //用户的角色信息
        roles:[],  //用来储存所有角色id信息的数组

      }
    },
    methods: {
      //异步获取用户列表
      async getUserList() {
        //设置请求头，让token一起传到后端
        const token = localStorage.getItem("token");
        this.$http.defaults.headers.common['Authorization'] = token //设置请求头的具体方法

        const res = await this.$http.get('user/users?query=' + this.query + '&pagenum=' + this.pagenum + '&pagesize=' +
          this.pagesize)
        //给各个东西赋值
        if (res.data.meta.status === 200) {
          this.users = res.data.users
          this.totalpage = res.data.totalpage
        } else {
          this.$message.error("获取用户列表失败")
        }
      },
      /* 分页的两个方法*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        //size改变的时候重新获取数据
        if (val != this.pagesize) {
          this.pagesize = val
          this.pagenum = 1
          this.getUserList()
        }

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //当页数改变时，重新获取数据
        if (val != this.pagenum) {
          this.pagenum = val
          this.getUserList()
        }
      },
      //模糊查询用户
      searchUsers() {
        //获取query之后，再全体查询
        this.pagenum = 1
        this.getUserList()
      },

      //新增用户
      async addUser() {
        //先关闭弹窗
        this.dialogFormVisible = false
        //然后异步交给后台，并接收信息
        let params = new URLSearchParams()
        params.append("userName", this.user.userName)
        params.append("password", this.user.password)
        params.append("email", this.user.email)
        params.append("mobile", this.user.mobile)
        const msg = await this.$http.post('user/addUser', params)
        if (msg.status === 200) {
          console.log('status:', msg.status)
          //成功，弹框提醒，并清空user内容
          this.$message.success('添加成功！')
          this.user = {}
          //再重新获取数据
          this.getUserList()
        } else {
          //失败
          this.$message.warning('添加失败！请重试')
        }
      },
      //打开删除弹框的按钮,顺便做删除
      open(id) {
        console.log("id:", id)
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.get('user/deleteUser?id=' + id)
          if (res.data > 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            //重新刷新列表
            this.getUserList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //打开更新用户的弹窗
      openUpdateUser(user) {
        //打开弹窗
        this.newUser.id = user.id
        this.newUser.userName = user.userName
        this.newUser.email = user.email
        this.newUser.mobile = user.mobile
        this.dialogSetNewUser = true
      },

      //更新用户的正儿八经的操作
      async setNewUser() {
        //先关闭弹窗
        this.dialogSetNewUser = false
        //异步获取
        const res = await this.$http.get('user/updateUser?id=' + this.newUser.id + '&email=' + this.newUser.email +
          '&mobile=' + this.newUser.mobile)
        if (res.data > 0) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.newUser = {}
          //重新刷新列表
          this.getUserList()
        }else{
          this.$message({
            type: 'error',
            message: '更新失败!'
          })
          this.newUser = {}
        }
      },
      //修改用户状态
      async updateStatus(user){
          const res = await this.$http.get('user/updateUserStatus?id=' + user.id + '&status=' + user.status)
          if(res.data > 0){
            this.$message.success("状态更改成功")
            //刷新列表
            this.getUserList()
          }else{
            this.$message.error("状态更改失败")
          }
      },
      //打开角色更改的弹窗的方法
      async openUpdateRoleId(user){
         this.dialogSetNewrole = true
         this.newRole.id = user.id
         this.newRole.userName = user.userName
         this.newRole.roleId = user.roleId
      },
      //获取所有权限信息的方法
      async getAllRoles(){
        const res = await this.$http.get('role/allRoles')
        this.roles = res.data
      },
      //权限修改的方法
      async updateUserRole(){
        this.dialogSetNewrole = false //关闭弹窗
        var res = await this.$http.get('role/updateRole?id=' + this.newRole.id + '&roleId=' + this.newRole.roleId)
        if(res.data > 0){
          this.getUserList()
          this.$message.success('权限修改成功！')
        }else{
          this.$message.error('权限修改失败，请重试！')
        }
      }

    },
    created() {
      //页面加载的时候执行
      this.getUserList()

      //页面加载的时候，获取权限列表
      this.getAllRoles()
    }
  }
</script>

<style>
  .box-card {
    height: 100%;
  }
</style>
