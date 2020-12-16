//新建插件，引入axios，把axios当作vue的插件来使用
import axios from 'axios'
const MyAxios = {}


MyAxios.install = (Vue)=>{

  //给axios添加基础路径
  axios.defaults.baseURL = 'http://localhost:8888/user/'

  Vue.prototype.$http = axios
}

//下面这个是暴露端口myaxios
export default MyAxios
