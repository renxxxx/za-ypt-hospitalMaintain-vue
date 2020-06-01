<template>
  <div id="login">
    <div class="login_index">
       <div class="login_white">
          <p class="login_title">欢迎登录</p>
          <p class="login_deline"></p>
          <div class="login_line" style="margin-top: 60px;">
            <i class="el-icon-office-building"></i>
            <input type="text">

          </div>
          <div class="login_line">
            <i class="el-icon-user"></i>
            <input type="text">

          </div>
          <div class="login_line">
            <i class="el-icon-unlock"></i>
            <input type="text">

          </div>
       </div>
    </div>
  </div>
</template>

<script>

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
    /* opacity: 0.4; */
  }
  .login_white{
    width: 32vw;
    min-width: 360px;
    height: 100%;
    float: right;
    background: #FFFFFF;
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
    width: 24vw;
    min-width: 280px;
    height: 45px;
    line-height: 45px;
    margin: 15px auto 0;
    border-bottom: 1px solid rgba(0,0,0,0.35);
  }
  .login_line input{
    width:80% ;
    border: 0;
    height: 41px;
    outline: none;
    margin-left: 20px;
  }
</style>
