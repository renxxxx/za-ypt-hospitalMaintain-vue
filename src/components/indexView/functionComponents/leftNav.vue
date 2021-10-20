<template>
  <div id='index_contain' >
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="z-index:9999">
          <div class="index_logo">
            <img src="../../../assets/logo.svg" alt="">
            <!-- <span>医品通</span> -->  
          </div>
          <el-menu
            background-color="#001529"
            width="200px"
            text-color="#ffffff"
            class="el-menu-vertical-demo"
            active-text-color="#e91e63"
            
            >
            <el-menu-item style="width:200px" index="1" :class="[reversedMessage == '/index/index'? 'menuColor':'']" @click="select('/index/index')">
              <!-- <template slot="title"> -->
                <i class="el-icon-odometer"></i>
                <span>医院信息</span>
              <!-- </template> -->
            </el-menu-item>
            <!-- <el-menu-item style="width:200px" index="2" :class="[reversedMessage == '/index/userManagement'? 'menuColor':'']" @click="select('/index/userManagement')">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">用户管理</span>
            </el-menu-item> -->
            <el-menu-item style="width:200px" index="3" :class="[reversedMessage == '/index/managementDepartment'? 'menuColor':'']" @click="select('/index/managementDepartment')">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">科室管理</span>
            </el-menu-item>
            <el-menu-item style="width:200px" index="4" :class="[reversedMessage == '/index/doctorManagement'? 'menuColor':'']" @click="select('/index/doctorManagement')">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">医生管理</span>
            </el-menu-item>
            <el-menu-item style="width:200px" index="5" :class="[reversedMessage == '/index/doctorEvaluation'? 'menuColor':'']" @click="select('/index/doctorEvaluation')">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">医生评价</span>
            </el-menu-item>
            <el-menu-item style="width:200px" index="6" @click="exitDialogFn">
              <i class="el-icon-user"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
      </el-aside>
      <!-- <el-main>Main</el-main> -->
    </el-container>
    <el-dialog
      class="exitDialog"
      :visible.sync="exitState"
      width="30%"
      center>
      <img style="height:22px;width:22px;float:left;margin-right:16px" src="../../../assets/detele.png" alt="">
      <span style="font-size:18px">是否退出当前登录账号？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="exitState = false">取 消</el-button>
          <el-button class="exitSubmit" @click="exitFn">确 定</el-button>
      </span>
    </el-dialog>
    <div class="versionClass">ver : {{$version}}</div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data(){
    return {
      exitState:false,
      nowValue:1,
    }
  },
   computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      console.log(this.$store.state.common.nowRouter.to.path)
      return this.$store.state.common.nowRouter.to.path;
    }
  },
  methods: {
    exitDialogFn(){
      this.exitState = true
    },
    exitFn(){
      // this.$router.go(0)
      this.$axios.post('/ypt/user/logout')
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg)
        }
        if(res.data.code == 0){ 
          
          this.$router.push({path:'/login',query:{hId:this.$route.query.hospitalId}})
          this.reload();
        }
      })
    },
    select(_value){
      let that = this
      console.dir(_value);
      
      if(_value)
        that.activityPageState = {
        doctorEvaluation : false,
        doctorManagement : false,
        index : false,
        managementDepartment : false,
        userManagement : false,
      }
      let _num = "";
      switch(_value){
        case "/index/index":
          _num = 1
          that.$router.push({path:'/index/index',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/index/userManagement":
           _num = 2
          that.$router.push({path:'/index/userManagement',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/index/managementDepartment":
           _num = 3
          that.$router.push({path:'/index/managementDepartment',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/index/doctorManagement":
           _num = 4
          that.$router.push({path:'/index/doctorManagement',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/index/doctorEvaluation":
           _num = 5
          that.$router.push({path:'/index/doctorEvaluation',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
      }
      if(this.nowValue>_num){
        this.nowValue = _num  
        console.log("top",this.nowValue,_num)
        this.$store.state.common.transitionName = 'slide-bottom'
      }else{
        this.nowValue = _num
        console.log("bottom",this.nowValue,_num)
        this.$store.state.common.transitionName = 'slide-top'
      }
    }
  }
}
</script>

<style scoped>
#index_contain{
  width:200px;
  height: 100%;
  /* float: left; */
  /* position: relative; */
  /* min-width: 1200px; */
}
.el-aside {
  background-color: #001529;
  color: #ffffff;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
>>>.el-menu {
  /* border: 0; */
}
>>>.el-menu-item{
  /* padding: 0 0 0 20px !important; */
  text-align: left !important;
  height: 54px;
  line-height: 54px;
}
>>>.el-menu-item.is-active{
  /* background-color: #1890FF !important; */
  color: #FFFFFF !important;
  font-weight: bolder;
}
.index_logo{
  /* width:64px;
  height:23px; */
  height: 64px;
  line-height: 64px;
  vertical-align: middle;
  font-size:20px;
  font-family:FZCQJW--GB1-0,FZCQJW--GB1;
  font-weight:normal;
  color:rgba(255,255,255,1);
  /* line-height:23px; */
  letter-spacing:2px;
  text-align: left;
  padding: 0 0 0 20px;
  box-sizing: border-box
}
.index_logo img{
    height:23px;
}
>>>.el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    /* background-color: #1890FF!important; */
}
.menuColor{
  background-color: #1890FF!important ;
}
.modifySubmitDialog >>>.el-dialog__header{
  padding:0px;
}
.modifySubmitDialog >>>.el-dialog__header{
  display: none;
}
.modifyDialog >>>.el-dialog__body{
  padding:0px
  
}
.versionClass{
    text-align: center;
    position: absolute;
    bottom: 55px;
    width: 100%;
    color: #a9a0a0;
  }
</style>
