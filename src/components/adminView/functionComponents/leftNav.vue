<template>
  <div id='index_contain' >
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px">
         <el-col style="width: 100%;">
            <div class="index_logo">
              <img src="assets/logo.svg" alt="">
              <!-- <span>医品通</span> -->
            </div>
            <el-menu
              background-color="#001529"
              text-color="#ffffff"
              class="el-menu-vertical-demo"
              active-text-color="#e91e63"
              >
              <el-menu-item  :class="[reversedMessage == '/adminView/index'? 'menuColor':'']" @click="select('/adminView/index')">
                <!-- <template slot="title"> -->
                  <i class="el-icon-odometer"></i>
                  <span>医院信息</span>
                <!-- </template> -->
              </el-menu-item>
              <el-menu-item index="1" :class="[reversedMessage == '/adminView/userManagement'? 'menuColor':'']" @click="select('/adminView/userManagement')">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="2" :class="[reversedMessage == '/adminView/managementDepartment'? 'menuColor':'']" @click="select('/adminView/managementDepartment')">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">科室管理</span>
              </el-menu-item>
              <el-menu-item index="3" :class="[reversedMessage == '/adminView/doctorManagement'? 'menuColor':'']" @click="select('/adminView/doctorManagement')">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">医生管理</span>
              </el-menu-item>
              <el-menu-item index="4" :class="[reversedMessage == '/adminView/doctorEvaluation'? 'menuColor':'']" @click="select('/adminView/doctorEvaluation')">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">医生评价</span>
              </el-menu-item>
              <el-menu-item index="5" @click="exitDialogFn">
                <i class="el-icon-user"></i>
                <span slot="title">退出登录</span>
              </el-menu-item>
            </el-menu>
          </el-col>
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
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data(){
    return {
      exitState:false
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
      this.$axios.post('/hospital-maintain/logout')
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg)
        }
        if(res.data.code == 0){ 
          
          this.$router.push({path:'/login',query:{hospitalId:this.$route.query.hospitalId}})
          this.reload();
        }
      })
    },
    select(_value){
      let that = this
      console.dir(_value)
      if(_value)
        that.activityPageState = {
        doctorEvaluation : false,
        doctorManagement : false,
        index : false,
        managementDepartment : false,
        userManagement : false,
      }
      switch(_value){
        case "/adminView/index":
          that.$router.push({path:'/adminView/index',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/adminView/userManagement":
          that.$router.push({path:'/adminView/userManagement',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/adminView/managementDepartment":
          that.$router.push({path:'/adminView/managementDepartment',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/adminView/doctorManagement":
          that.$router.push({path:'/adminView/doctorManagement',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
        case "/adminView/doctorEvaluation":
          that.$router.push({path:'/adminView/doctorEvaluation',query:{hospitalId:this.$route.query.hospitalId,time:new Date().getTime().toString()}})
        break;
      }
    }
  }
}
</script>

<style scoped>
#index_contain{
  width:200px;
  height: 100%;
  float: left;
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
  padding: 0 0 0 20px !important;
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
</style>
