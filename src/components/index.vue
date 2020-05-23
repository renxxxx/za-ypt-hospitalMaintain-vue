<template>
  <div id='index_contain'>
    <div class="index_top">
      <i class="el-icon-s-fold"></i>
      <span>创建时间: 2020-5-22</span>
    </div>
    <div class="index_title">
      <el-breadcrumb class="index_title_bread" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">医院信息</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="index_title_div">
        <img src="../assets/Bitmap.svg" alt="">
        <div class="index_title_nameIntro">
          <h3>忠安医疗医院</h3>
          <div><span>三甲</span><span>龙头</span></div>
        </div>
        <div class="index_title_vistorNum">
          <div>
            <p>近一小时访问</p>
            <p>125</p>
          </div>
          <div>
            <p>近一天访问</p>
            <p>1350</p>
          </div>
          <div>
            <p>近一周访问</p>
            <p>9899</p>
          </div>
          <div>
            <p>历史访问</p>
            <p>25015</p>
          </div>
        </div>
      </div>

    </div>
    <!-- 下面的详情 -->
    <div class="index_detail">
      <el-cow style="height: 100%;">
        <el-col style="height: 100%;" :span="16">
          <div class="index_detail_lf">
            <div>
              <span class="index_hosDetail">医院信息</span><span class="index_editDetail">修改信息</span>
            </div>
            <div>
              <img src="../assets/hosPic.jpg" alt="">
              <p>忠安医疗，2011年成立，于2016年在江苏股交所挂牌，代码：690881；公司是一家集研发、生产和销售为一体得高科技医疗服务企业，现有员工百余人，主要从事：疼痛科全套设备及耗材，疼痛科整体解决方案，研发了多项医疗互联网软件（医查查、医师互联、中安大健康、共享医连体等），其中国内首次提出民营医院“两权分离”理论，并在此基础上研发了“共享医连体”系统，获得国内民营医疗的高度评价并同时获得南京青年创业大赛优秀奖；公司坐落在六朝古都的南京，南京是国家重要的科教中心，自古以来就是一座崇文重教的城市，有“天下文枢”、“东南第一学”的美誉。</p>
            </div>
          </div>
        </el-col>
        <el-col style="height: 100%;" :span="8">
          <div class="index_detail_rt">
            <div class="index_VR">
              <p>VR地址</p>
              <div>
                <img src="../assets/vr.svg" alt="">
                <p>/oss/static/vr-beginning/earth/index.html?url=https://fnrpbjvfrg.720yun.com/t/d2vkn98h0q9</p>
              </div>
            </div>
            <div class="index_doclist">
              <p>医生团队</p>
              <div>
                <ul>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
                <ul>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
                <ul>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
                <ul>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
                <ul>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-cow>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
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
  #index_contain {
    background: rgba(240, 242, 245, 1);
    width: calc(100% - 200px);
    height: 100vh;
    float: left;
    /* min-width: 1200px; */
  }


  >>>.el-menu {
    border: 0;
  }

  .index_logo {
    /* width:64px;
      height:23px; */
    height: 64px;
    line-height: 64px;
    vertical-align: middle;
    font-size: 20px;
    font-family: FZCQJW--GB1-0, FZCQJW--GB1;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    /* line-height:23px; */
    letter-spacing: 2px;
  }

  .index_logo img {
    width: 23px;
    height: 23px;

  }

  .index_top {
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  }

  .index_top i {
    width: 20px;
    height: 20px;
    padding: 22px 24px;
    cursor: pointer;
  }

  .index_top span {
    float: right;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-right: 32px;
  }

  .index_title {
    width: 100%;
    height: 150px;
    background: rgba(255, 255, 255, 1);
    margin-top: 4px;
    box-sizing: border-box;
    padding: 0 32px;
  }

  .index_title_bread {
    line-height: 54px;
  }

  .index_title_div>img {
    width: 72px;
    height: 72px;
    display: inline-block;
    margin: 0 24px 24px 32px;
    float: left;
  }

  .index_title_div>div {
    display: inline-block;
  }

  .index_title_nameIntro {
    height: 96px;
    margin-left: 25px;
    float: left;
  }

  .index_title_nameIntro h3 {
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    margin: 0;
  }

  .index_title_nameIntro>div span {
    margin-top: 15px;
    display: inline-block;
    padding: 0px 22px;
    color: #1890FF;
    height: 26px;
    line-height: 26px;
    background: rgba(234, 242, 255, 1);
    border-radius: 2px;
    margin-right: 14px;
    text-align: center;
  }

  .index_title_vistorNum {
    float: right;
    height: 96px;
  }

  .index_title_vistorNum>div {
    display: inline-block;
    text-align: center;
    width: 118px;
  }

  .index_title_vistorNum>div p:first-child {
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
    margin: 0;
  }

  .index_title_vistorNum>div p:last-child {
    margin-top: 4px;
    height: 38px;
    font-size: 30px;
    font-family: HelveticaNeue;
    color: rgba(0, 0, 0, 0.85);
    line-height: 38px;
    text-align: center;
    margin: 0;
  }

  .index_detail {
    width: 100%;
    height: calc(100% - 275px);
  }

  .index_detail_lf {
    margin-top: 24px;
    margin-left: 30px;
    margin-right: 30px;
    height: 100%;
    background: #FFFFFF;
    border-radius:2px;
    /* overflow-y: scroll; */
  }

  .index_detail_rt {
    margin-top: 24px;
    margin-right: 30px;
    height: 100%;
    /* background: #FFFFFF; */
    border-radius:2px;
  }

  .index_detail_lf>div:nth-child(1) {
    height: 56px;
    line-height: 56px;
    width: 100%;
    border-bottom: 1px solid rgba(233,233,233,1);
  }

  .index_detail_lf>div:nth-child(1) span:nth-child(1) {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-left: 24px;
  }

  .index_detail_lf>div:nth-child(1) span:nth-child(2) {
    float: right;
    margin-right: 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(24, 144, 255, 1);
    cursor: pointer;
  }
  .index_detail_lf>div:nth-child(2){
    box-sizing: border-box;
    padding: 24px;
  }
  .index_detail_lf>div:nth-child(2) img{
    width: 100%;
  }
  .index_detail_lf>div:nth-child(2) p{
    margin: 24px 0;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:20px;
  }

  .index_VR{
    width: 100%;
    height: 267px;
    background: #FFFFFF;
    border-radius: 2px;
    margin-bottom: 24px;
  }
  .index_VR>p{
    height: 56px;
    line-height: 56px;
    box-sizing: border-box;
    border-bottom:1px solid rgba(233,233,233,1);
    font-size:16px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    padding-left: 24px;
    margin: 0;
  }
  .index_VR>div{
    text-align: center;
  }
  .index_VR>div img{
    width: 80px;
    height: auto;
    margin: 40px auto 34px;
  }
  .index_VR>div p{
    margin: 0;
    width: 100%;
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(24,144,255,1);
    line-height:20px;
  }

  .index_doclist{
    width: 100%;
    height:310px;
    background:rgba(255,255,255,1);
    border-radius:2px;
  }
  .index_doclist p{
   height: 56px;
   line-height: 56px;
   box-sizing: border-box;
   border-bottom:1px solid rgba(233,233,233,1);
   font-size:16px;
   font-family:PingFangSC-Medium,PingFang SC;
   font-weight:500;
   color:rgba(0,0,0,0.85);
   padding-left: 24px;
   margin: 0;
  }
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0 !important;
  }
  .index_doclist ul li{
    width: 50%;
    display: inline-block;
    float: left;
    margin-top: 24px;
    vertical-align: middle;
    line-height: 24px;
    height: 24px;
  }
   .index_doclist ul li img{
     width: 22px;
     height: 22px;
     margin-right:14px ;
     margin-left: 24px;
     float: left;
   }
   .index_doclist ul li span{
     line-height: 24px;
     display: inline-block;
     font-size:14px;
     font-family:PingFangSC-Regular,PingFang SC;
     font-weight:400;
     color:rgba(0,0,0,0.65);
      float: left;
   }
</style>
