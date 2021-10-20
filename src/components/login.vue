<template>
  <div id="login">
    <div class="login_index">
      <div class="login_logo">
        <img src="../assets/logo.svg" alt="">
      </div>
      <div class="login_box">
        <div class="login_white">
          <p class="login_title">欢迎登录</p>
          <p class="login_deline"></p>
          <div style="width: 100%;height: auto;text-align: center;font-size: 17px;margin-top: 5px;display: block;">{{loginData.hospitalName}}</div>
          <!-- <div class="login_line line_result" style="margin-top: 60px;">
            <i class="el-icon-office-building"></i> -->
            <!-- <el-autocomplete  :fetch-suggestions="focusFn" @select="confirmFn"
            clearable clear="searchClearFn"
            v-model="loginData.hospitalName" placeholder="请选择登录的医院"></el-autocomplete > -->
             <!-- <el-input v-model="loginData.hospitalName" @blur="loseFocusFn" @input="serachFn" @focus="focusFn" clearable></el-input>
             <div class="searchResults" v-if='searchResultsState'>
              <ul class="infinite-list" v-infinite-scroll="loadFn">
                <li v-for="(item,inx) in searchResultsList" :key="inx" @mouseover="confirmFn(item)">
                  {{item.value}}
                </li>
              </ul>
            </div>
          </div> -->
          <div class="login_line" style="margin-top: 60px;">
            <i class="el-icon-user"></i>
            <el-input v-model="loginData.account" placeholder="请输入账号" clearable></el-input>
          </div>
          <div class="login_line">
            <i class="el-icon-unlock" ></i>
            <el-input show-password  v-model="loginData.pwd" placeholder="请输入密码" @autofocus="false"  clearable ></el-input>

          </div>
          <div class="login_submit">
            <button @click="submitFn">登录</button>
          </div>
          <div class="versionClass">ver : {{$version}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
	name: 'login',
	data () {
		return {
			loginData:{
        hospitalId:'',
        hospitalName:'',
        account:'',
        pwd:'',
      },
      searchResultsState:false,
      searchResultsList:[],
      HospitalNamePage:0,
		}
	},
	computed:{
		
	},
	components:{

	},
	beforeCreate(){

	},
	created(){

	},
	mounted(){
    // console.log('-------------')
    // console.log(window.location.href.split('?'))
    if(window.location.href.split('?').length>1){
      // if(window.location.href.split('?')[1].split('&')[0].split('=')[0] == 'hId'){

      //   return
      // }
      if(window.location.href.split('?')[1].split('&')[0].split('=')[0] == 'hId'){
        this.loginData.hospitalId = window.location.href.split('?')[1].split('&')[0].split('=')[1]
        this.getData()
      }else{
        this.$message('该url链接无效，请重新获取')
      }
    }else{
      this.$message('该url链接无效，请重新获取')
    }
    
	},
	activated(){
    // console.dir(JSON.stringify(this.$route.query.query))
    
		
		
	},
	methods: {
    // getId(){
    //   this.$axios.get('/ypt/cache/get')
    //     .then(res =>{
    //       console.log()
    //     })
    // },
    getData(){
      this.$axios.get('/ypt/hospital-maintain/hospital-name?'+this.$qs.stringify({
        hospitalId:this.loginData.hospitalId
      }))
      .then(res =>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg);
        }
        if(res.data.code == 0){
          this.loginData.hospitalName = res.data.data.hospitalName
        }
      })
    },
    submitFn(){
      this.$axios.post('/ypt/user/login',this.$qs.stringify({
        loginHospitalId : this.loginData.hospitalId,
        account : this.loginData.account,
        password : this.loginData.pwd,
      }))
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg);
        }
        if(res.data.code == 0){
          this.$axios.post('/ypt/user/login-refresh')
          .then(res=>{
              if(res.data.codeMsg){
                this.$message(res.data.codeMsg);
              }
              if(res.data.code == 0){
                
                this.$store.state.user.account = res.data.data;
                this.$router.push({path:'/index/index',query:{hospitalId:this.loginData.hospitalId,time : new Date().getTime()}})
              }

          })
          
        }
      })
      
    },
    searchClearFn(){
      this.HospitalNamePage=0;
      this.searchResultsList=[];
      this.loadFn()
    },
    //确认医院
    confirmFn(_item){
      // this.searchResultsState = false;
      this.loginData.hospitalName = _item.value
      this.loginData.hospitalId = _item.id
      console.dir(this.loginData.hospitalName)
      this.loginData.hospitalId = _item.id
    },
    //获取焦点事件打开下拉菜单
     focusFn(queryString, cb){
       console.log(123)
      this.searchResultsState = true;
      this.HospitalNamePage=0;
      this.searchResultsList=[];
      this.loadFn(queryString, cb)
    },
    //失去焦点事件关闭下拉菜单
    loseFocusFn(){
      setTimeout(()=>{
        this.searchResultsState = false;
        this.HospitalNamePage=0;
      },100)
    },
    //搜索医院名称
		serachFn(){
      this.searchResultsState = true;
      this.HospitalNamePage = 0;
      this.searchResultsList=[];
      this.loadFn();
    },
    loadFn(queryString, cb){
      this.HospitalNamePage++
      this.getHospitalName(queryString, cb);
    },
    // 搜索医院名称请求
    getHospitalName(queryString, cb){
      this.$axios.get('/hospitals?'+this.$qs.stringify({  
          kw:this.loginData.hospitalName,
          pn:this.HospitalNamePage,
          ps:15
        }))
        .then(res=>{
          if(res.data.codeMsg)
            this.$message(res.data.codeMsg);
          if(res.data.data.rows.length>0){
            
            for(let i in res.data.data.rows){
              this.searchResultsList.push({
                value:res.data.data.rows[i].name,
                id:res.data.data.rows[i].hospitalId,
                cover:res.data.data.rows[i].cover,
              })
            }
           
          }
        })
    }
	},
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  #login{
    width: 100vw;
    height: 100vh;
    background: url(../assets/bj.jpg) no-repeat 100% 100%;
    background-size: cover;
    min-width: 1200px;
  }
  .login_index{
    /* width: calc(100%-80px);
    height: calc(100%-80px); */
    position: fixed;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    z-index: 2;
    background:rgba(81,112,214,0.4);
    min-width: 1120px;
    min-height: 510px;
    /* opacity: 0.4; */
  }
  .login_logo{
    position: absolute;
    top: 24px;
    left: 38px;
  }
  .login_box{
    max-width: 420px;
    width: 32vw;
    min-width: 360px;
    height: 100%;
    float: right;
    background: #FFFFFF;
    position: relative;
  }
  .login_white{
    width: 100%;
    height: 492px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto 0px;
  }
  .login_title{
    width:100%;
    text-align: center;
    height:37px;
    font-size:26px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(5,1,31,1);
    line-height:37px;
    margin-top: 20vh;
  }
  .login_deline{
    width:84px;
    height:3px;
    background:rgba(24,144,255,1);
    margin: 5px auto;
  }
  .login_line{
    max-width: 352px;
    width: 24vw;
    min-width: 280px;
    height: 45px;
    line-height: 45px;
    margin: 15px auto 0;
    border-bottom: 1px solid rgba(0,0,0,0.35);
  }
   >>>.el-input{
     width:80% 
   }
  >>>.el-input input{
    width: 100%;
    border: 0;
    height: 41px;
    outline: none;
    margin-left: 20px;
  }
  >>>.el-input__suffix{
      left: 100%;
  }
  >>>.el-input__suffix-inner{
    width: 50px;
    display: inline-block;
    text-align: right;
  } 
  >>>.el-autocomplete{
    width: 80%
  }
  >>>.el-icon-circle-close{
    float: right;
    padding-top: 2px;
    box-sizing: border-box;
  }
  /* >>>.el-icon-view{
    float:left;
  } */
  >>>.popper__arrow{
    display: none;
  }
  .line_result{
    position: relative;
  }
  .searchResults{
    position: absolute;
    top: 47px;
    left: 35px;
    width: 75%;
    min-width: 200px;
    max-height: 270px;
    background-color: #FFFFFF;
    border: 1px solid rgb(169, 169, 169);
    border-top: none;
    z-index: 9;
  }
  .searchResults ul{
    list-style: none;
    max-height: 270px;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-block-start: 0px;
    margin-block-end: 0px;
    padding-inline-start: 0px;
  } 
  .searchResults ul li {
    list-style: none;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    padding-left: 20px;
    cursor: pointer;
  }
  .searchResults ul::-webkit-scrollbar {
    width: 4px;
    /* border-radius: 50px; */
  }
  .searchResults ul::-webkit-scrollbar-track {
    background-color: #e0e0e0;
    /* border-radius: 50px; */
  }
  .searchResults ul::-webkit-scrollbar-thumb {
    background-color: #b3b3b3;
    /* border-radius: 50px; */
  }
  .searchResults ul::-webkit-scrollbar-thumb:hover {
    background-color:  #b3b3b3;
    /* border-radius: 50px; */
  }
  .searchResults ul::-webkit-scrollbar-thumb:active {
    background-color: #b3b3b3;
    /* border-radius: 50px; */
  }
  .searchResults::-webkit-scrollbar-thumb:active {
    background-color: #e0e0e0;
    /* border-radius: 50px; */
  }
  .login_submit{
    width: 24vw;
    min-width: 280px;
    width: 88%;
    height: auto;
    margin: 90px auto 0;
  }
  .login_submit button{
    width: 100%;
    height: 62px;
    min-width: 280px;
    margin: 0px auto;
    background-color: #1890FF;
    color: #FFFFFF;
    font-size: 18px;
    border: none;
    box-shadow: 0px 3px 8px #135C9F;
    cursor: pointer;
  }
  .versionClass{
    text-align: center;
    /* position: absolute; */
    /* bottom: 55px; */
    margin-top: 50px;
    width: 100%;
    color: #a9a0a0;
  }
</style>
