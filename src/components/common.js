import axios from 'axios'
import Vue from 'vue';
import router from '../router'
import store from '../store'
let vue = new Vue();
function checkLogin(){
    axios.post('/hospital-maintain/login-refresh')
    .then(res=>{
      if(res.data.codeMsg){
        vue.$message(res.data.codeMsg);
      }
      if(res.data.code == 0){
        
          store.state.account = res.data.data;
        }else{
          vue.$message({
            message:'暂未登录！',
            duration:1240,
            onClose:()=>{
              router.push({path:'/login'})
            }
          })
        }
    })
}
export default {
	checkLogin
};