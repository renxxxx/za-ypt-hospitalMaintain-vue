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
              @open="handleOpen"
              @close="handleClose" 
              router
              :default-active="$route.path"
              >
              <el-menu-item :index="{path:'/adminView/index',query:{time:new Date().getTime().toString()}}">
                <!-- <template slot="title"> -->
                  <i class="el-icon-odometer"></i>
                  <span>医院信息</span>
                <!-- </template> -->
              </el-menu-item>
              <el-menu-item :index="{path:'/adminView/userManagement',query:{time:new Date().getTime().toString()}}">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item :index="{path:'/adminView/managementDepartment',query:{time:new Date().getTime().toString()}}">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">科室管理</span>
              </el-menu-item>
              <el-menu-item :index="{path:'/adminView/doctorManagement',query:{time:new Date().getTime().toString()}}">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">医生管理</span>
              </el-menu-item>
              <el-menu-item :index="{path:'/adminView/doctorEvaluation',query:{time:new Date().getTime().toString()}}">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">医生评价</span>
              </el-menu-item>
              <el-menu-item index="6" @click="exitFn">
                <i class="el-icon-user"></i>
                <span slot="title">退出登录</span>
              </el-menu-item>
            </el-menu>
          </el-col>
      </el-aside>
      <!-- <el-main>Main</el-main> -->
    </el-container>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  methods: {
    exitFn(){
      
      // this.$router.go(0)
      this.$axios.post('/hospital-maintain/logout ')
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg)
        }
        if(res.data.code == 0){ 
          
          this.$router.push({path:'/login'})
          this.reload();
        }
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
  background-color: #1890FF !important;
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
    background-color: #1890FF!important;
}
</style>
