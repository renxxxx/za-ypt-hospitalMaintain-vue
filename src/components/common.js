import axios from 'axios'
import Vue from 'vue';
import router from '../router'
import store from '../store'
let vue = new Vue();
async function checkLogin(_hospitalId){
    await axios.post('/ypt/user/login-refresh')
    .then(res=>{
      if(res.data.codeMsg){
        vue.$message(res.data.codeMsg);
      }
      if(res.data.code == 0){
        store.state.user.account = res.data.data;
      }else{
        vue.$message({
          message:'暂未登录！',
          duration:1240,
          onClose:()=>{
            if(_hospitalId){
              router.push({path:'/login',query:{hId:_hospitalId}})
            }else{
              router.push({path:'/login'})
            }
          }
        })
      }
    })
}
export default {
	checkLogin
};