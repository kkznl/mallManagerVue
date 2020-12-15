#### 01-项目-登陆-新建分支-login组件-配置路由
> 新建一个分支 专门写登陆功能
> git branch     //查看有哪些分支
> git checkout -b 分支名    //创建分支
> 进入项目 新建分支+配置路由
> 注意：
- 1.commit 每完成一个小功能就提交一次
- 2.push操作只有master去完成
#### 02-项目-登陆-引入表单组件
> el-form
> 1.引入
> 2.调整标签（h2+button+form）
#### 03-项目-插件-引入axios插件
> 因为axios不是vue的插件，所以得自己封装插件使用
```插件
import axios from 'axios'
const MyAxios = {}
MyAxios.install = (Vue)=>{
  Vue.prototype.$http = axios
}
//下面这个是暴露端口myaxios
export default MyAxios ```
>然后在main.js中  Vue(MyAxios) 引入
