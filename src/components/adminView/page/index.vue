<template>
  <div id='index_contain' class="scrollStyle">
    <div class="index_top">
      <i class="el-icon-s-fold"></i>
      <span>创建时间: {{hospitalAboutData.createTime || ''}}</span>
    </div>
    <div class="index_title">
      <el-breadcrumb class="index_title_bread" separator="/">
        <el-breadcrumb-item :to="{ path: '/adminView/index',query:{time:new Date().getTime().toString()}}"><span style="cursor: pointer;">医院信息</span> </el-breadcrumb-item>
        <!-- <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item> -->
      </el-breadcrumb>
      <div class="index_title_div">
        <img src="../../../assets/Bitmap.svg" alt="">
        <div class="index_title_nameIntro">
          <h3>{{hospitalAboutData.name||''}}</h3>
          <div><span v-if="hospitalAboutDataShowData[0]">{{hospitalAboutDataShowData[0]}}</span><span v-if="hospitalAboutDataShowData[1]">{{hospitalAboutDataShowData[1]}}</span></div>
        </div>
        <img class="hospitalQrCode" @click="qrCodeImagesFn(hospitalQrCode)" :src="hospitalQrCode" alt="">
        <div class="index_title_vistorNum">
          <div>
            <p>近一小时访问</p>
            <p>{{overviewDate.requestCountOfOneHourRecently}}</p>
          </div>
          <div>
            <p>近一天访问</p>
            <p>{{overviewDate.requestCountOfOneDayRecently}}</p>
          </div>
          <div>
            <p>近一周访问</p>
            <p>{{overviewDate.requestCountOfOneWeekRecently}}</p>
          </div>
          <div>
            <p>历史访问</p>
            <p>{{overviewDate.requestCountOfHistory}}</p>
          </div>
        </div>
      </div>

    </div>
    <!-- 下面的详情 -->
    <div class="index_detail">
      <el-row style="height: 100%;">
        <el-col style="height: 100%;" :span="16">
          <div class="index_detail_lf">
            <div>
              <span class="index_hosDetail">医院信息</span><span class="index_editDetail" @click="modifyFn">修改信息</span>
            </div>
            <div style="height: 545px;overflow: hidden;margin-bottom: 35px;">
              <img style="height: 280px;margin-bottom: 24px;" :src="hospitalAboutData.cover" alt="">
              <p class="line-9" v-html="hospitalAboutData.intro"></p>
            </div>
          </div>
        </el-col>
        <el-col style="height: 100%;" :span="8">
          <div class="index_detail_rt">
            <div class="index_VR">
              <p>VR地址</p>
              <div>
                <a :href="hospitalAboutData.panoramaVrUrl">
                  <img src="../../../assets/vr.svg" alt="">
                </a>
                <a :href="hospitalAboutData.panoramaVrUrl" target="_blank" class="line-1">{{hospitalAboutData.panoramaVrUrl? '点击查看':'暂未设置VR'}}</a>
              </div>
            </div>
            <div class="index_doclist">
              <p>医生团队</p>
              <div>
                <ul>
                  <router-link :to="{path:'/adminView/doctorManagement',query:{time:new Date().getTime().toString()}}" v-for="(item,inx) in doctorList" :key="inx">
                    <li  >
                      <img :src="item.cover" alt="">
                      <span class="line-1">{{item.name}}</span>
                    </li>
                  </router-link>
                </ul>
                <!-- <ul>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
                <ul>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
                <ul>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul>
                <ul>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                  <li><img src="../../../assets/doc.svg" alt=""><span>赵医生</span></li>
                </ul> -->
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      class="hospitalMessageDialog"
      :visible.sync="modifyState"
      width="62.2%">
      <div slot="title">
        <div class="modifyBoxTitle">
          <h3>修改信息</h3>
          <span @click="modifyState = false;">返回</span>
        </div>
      </div>
      <div class="modifyBox"> 
        <ul>
          <li>
            <span>医院名称：</span>
            <input v-model="modifyData.name" type="text">
          </li>
          <li>
            <span>VR地址：</span>
            <input v-model="modifyData.panoramaVrUrl" type="text">
          </li>
          <li>
            <span>标签：</span>
            <input v-model="modifyData.tag" type="text">
          </li>
          <li>
            <span>医院封面：</span>
            <div class="hospitalCover">
              <img :src="modifyData.cover" alt="">
              <div class="hospitalCoverBox">
                <i class="el-icon-more"></i>
                <input type="file" class="upload" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"
                    multiple @change="addImg($event)"/>
              </div>
              
            </div>
          </li>
          <li>
            <span>创建时间：</span>
            <input v-model="modifyData.createTime" type="text" readonly="readonly" style="cursor: not-allowed;">
          </li>
          <li>
            <span>医院简介：</span>
            <textarea v-model="modifyData.intro" name="" id="" cols="30" rows="10" class="scrollStyle"></textarea>
          </li>
        </ul>
        <div class="modifyBoxFooter">
          <button @click="modifyState = false" style="cursor:pointer;">取消</button>
          <button @click="modifySubmitState = true" style="cursor:pointer;">提交</button>
        </div>
      </div>
     
    </el-dialog>
    <el-dialog
      class="modifySubmitDialog"
      :visible.sync="modifySubmitState"
      width="30%"
      center>
      <img style="height:22px;width:22px;float:left;margin-right:16px" src="../../../assets/detele.png" alt="">
      <span style="font-size:18px">确认要修改这条信息吗？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="modifySubmitState = false">取 消</el-button>
          <el-button class="modifySubmitDialogSubmit" @click="modifySubmitFn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="qrCodeValue" class="enlargeImagesBox">
        <div slot="title">
        </div>
        <div class="qrCodeImagesClass">
            <img :src="qrCodeSrc" alt="">
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"index",
  data(){
    return {
      query : '',
      hospitalAboutData:{},
      hospitalAboutDataShowData:['',''],
      doctorList:[],
      modifyState:false,
      modifyData:{},
      modifySubmitState:false,
      hospitalQrCode:'',
      qrCodeValue:false,
      qrCodeSrc:'',
      overviewDate:{
        requestCountOfOneWeekRecently:'',
        requestCountOfOneWeekRecently:'',
        requestCountOfOneHourRecently:'',
        requestCountOfHistory:''
      }
    }
  },
  activated(){
    if(this.query != JSON.stringify(this.$route.query)){
      this.initData();
      this.$common.checkLogin(this.$route.query.hospitalId)
      this.query = JSON.stringify(this.$route.query);
      this.getData();
    }
    
  },
  methods: {
    initData(){
      Object.assign(this.$data, this.$options.data());
    },
    getData(){
      this.$axios.get('/hospital-maintain/hospital')
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg)
        }
        if(res.data.code == 0){
          this.hospitalAboutData = res.data.data;
          if(this.hospitalAboutData){
            if(this.hospitalAboutData.tag){
              this.hospitalAboutData.tag = res.data.data.tag.split(',');
            }else{
              this.hospitalAboutData.tag=['','']
            }
            this.hospitalAboutDataShowData = this.hospitalAboutData.tag
            console.log(this.hospitalAboutData.tag)
            if(this.hospitalAboutData.createTime){
              this.hospitalAboutData.createTime = this.moment(this.hospitalAboutData.createTime).format('YYYY-MM-DD')
            }else{
              this.hospitalAboutData.createTime = ''
            }
            this.$store.state.common.hospitalAboutData = this.hospitalAboutData
            localStorage.setItem('hospital',JSON.stringify(this.$store.state.common.hospitalAboutData))
            let cQ= $('<canvas  width="280" height="340" style="display:block;"></canvas>').appendTo('body');
            let c=cQ[0];
            let ctx=c.getContext("2d");
            ctx.clearRect(0,0,c.width,c.height);  
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0,0,280,340);

            res.data.data.cover = res.data.data.cover? res.data.data.cover: require("../../../assets/Bitmap.svg")
            let coverImg = $('<img src='+res.data.data.cover+' style="display:none;" />').appendTo('body')
            debugger
            if(coverImg[0]){
                ctx.drawImage(coverImg[0],5,10,30,30);
                coverImg.remove()
            }
            
            ctx.fillStyle="#000000";
            if(res.data.data.name)
                ctx.fillText(res.data.data.name,50,20);
            
            ctx.fillStyle="#000000";
            if(res.data.data.hospitalName)
            ctx.fillText(res.data.data.hospitalName,50,40);

            ctx.moveTo (0,60);       //设置起点状态
            ctx.lineTo (280,60);       //设置末端状态
            ctx.lineWidth = 1;          //设置线宽状态
            ctx.strokeStyle = '#e6e6e6' ;  //设置线的颜色状态
            ctx.stroke();
            let getUrl = '/wxminqrcode?path=' + encodeURIComponent('pages/index/index?hospitalid='+res.data.data.hospitalId
            +res.data.data.doctorId +'&hospitalname='+res.data.data.hospitalname)+'&width=280'
            Promise.all([
              new Promise((resolve)=>{
                const img = new Image();
                img.src = getUrl;
                img.onload = ()=>resolve(img);
              })
            ]).then((imgs)=>{
              console.dir(imgs[0])
              let qrCodeImg = $('<img src="'+imgs[0].src+'" style="display:none;"/>').appendTo('body')
              ctx.drawImage(qrCodeImg[0],0,60,280,280);
              try{
                  this.hospitalQrCode =  c.toDataURL("image/jpeg", 1.0)
              }catch (e) {

              }
              qrCodeImg.remove()
              cQ.remove()  
            })
            
          }
            
            // console.log(this.hospitalQrCode)
            // cQ.remove()  
        }
      })
      this.$axios.get('/hospital-maintain/doctors?'+this.$qs.stringify({
        pn:1,
        ps:10
      }))
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg)
        }
        if(res.data.code == 0){
          if(res.data.data.rows.length>0){
            this.doctorList = []
            for(let i in res.data.data.rows){
              this.doctorList.push(res.data.data.rows[i])
            }
          }
        }
      })
      this.$axios.get('/hospital-maintain/overview')
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg)
        }
        if(res.data.code == 0){
          this.overviewDate = {
            requestCountOfOneWeekRecently : res.data.data.requestCountOfOneWeekRecently,
            requestCountOfOneDayRecently : res.data.data.requestCountOfOneDayRecently,
            requestCountOfOneHourRecently : res.data.data.requestCountOfOneHourRecently,
            requestCountOfHistory : res.data.data.requestCountOfHistory,
          }
        }
      })
    },
    modifyFn(){
      debugger
      this.modifyState = true;
      this.modifyData = JSON.parse(JSON.stringify(this.hospitalAboutData));
    },
    qrCodeImagesFn(_value){
      if(_value){
        this.qrCodeValue = true
        this.qrCodeSrc = _value
      }
    },
    modifyHospitalFn(){

    },
    addImg(_fileLIst){
			var file = _fileLIst.target.files[0]
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
				formData.append('file', file)
				this.$axios.post('/upload-file',formData,{headers: {'Content-Type': 'multipart/form-data'
				}})
				.then(res =>{
					if(!res.data.codeMsg){
						this.modifyData.cover=res.data.data.url
					}
				})
				.catch(err =>{})
			 }else{
				this.$toast('请选择图片')
				return false;
			}
    },
    modifySubmitFn(){
      this.$axios.post('/update-hospital',this.$qs.stringify({
        name:this.modifyData.name,
        panoramaVrUrl:this.modifyData.panoramaVrUrl,
        tag:this.modifyData.tag,
        cover:this.modifyData.cover,
        intro:this.modifyData.intro,
      }))
      .then(res=>{
        if(res.data.codeMsg){
          this.$message(res.data.codeMsg)
        }
        if(res.data.code == 0){
          this.modifyState = false;
          this.modifySubmitState = false;
          this.hospitalAboutData = JSON.parse(JSON.stringify(this.modifyData));
          this.getData();
          this.$message("操作成功")
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
#index_contain {
  background: rgba(240, 242, 245, 1);
  /* width: calc(100% - 200px); */
  width: 100%;
  min-width: 1020px;
  height: 100%;
  float: left;
  overflow: scroll;
  overflow-x: hidden;
  -moz-osx-font-smoothing: grayscale;
  font-family:'DINPro' !important;
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
  border-radius: 50%;
}
.hospitalQrCode{
  width: 72px!important;
  height: 87px!important;
  margin: 0 24px 0px 32px!important;
  cursor: pointer;
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
  height: auto;
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
  cursor: pointer;
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
  /* display: inline-block; */
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,0.65);
  /* float: left; */
  width: calc(100% - 60px);
}
.hospitalMessageDialog >>>.el-dialog{
  position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto!important;
    height: 673px;
    min-width: 600px
}
.hospitalMessageDialog >>>.el-dialog__header,.modifySubmitDialog >>>.el-dialog__header{
  padding:0px;
}
.hospitalMessageDialog >>>.el-dialog__headerbtn,.modifySubmitDialog >>>.el-dialog__headerbtn{
  display: none;
}
.hospitalMessageDialog >>>.el-dialog__body{
  padding:0px
}
.enlargeImagesBox >>>.el-dialog{
    background-color: transparent;
    box-shadow:none;
    width: 280px;
    height: 340px;
    /* min-width: 410px; */
}
.enlargeImagesBox >>>.el-dialog__header{
  padding: 0px;
}
.enlargeImagesBox >>>.el-dialog__body{
    width: 280px;
    height: 340px;
    padding: 0px;
    
}
>>>.el-dialog__headerbtn{
  display: none;
}
.modifyBoxTitle{
  width: 100%;
  height: 100%;
  padding: 16px 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #E8E8E8;
}
.modifyBoxTitle>h3{
  font-size: 18px;
  color: #000000;
  display: inline;
}
.modifyBoxTitle>span{
  float: right;
  color: #1890FF;
  cursor: pointer;
}
.modifyBox{
  width: 100%;
  height: 100%;
  padding: 20px 0px 37px;
  box-sizing: border-box;
  overflow: hidden;
}
.modifyBox>ul{
  width: 59.98%;
  min-width: 538px;
  margin: 0px auto 40px;
}
.modifyBox>ul>li{
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
}
.modifyBox>ul>li:last-child{
  line-height: 32px;
  height: 224px;
  margin-bottom: 0px;
}
.modifyBox>ul>li:last-child>span{
  float: left;
}
.modifyBox>ul>li>span{
  width: 70px;
  text-align: right;
  color: #000000D9;
  font-size: 14px;
  display: inline-block;
  float: left;
}
.modifyBox>ul>li>input,.modifyBox>ul>li>textarea,.hospitalCover{
  height: 30px;
  line-height: 30px;
  border: 1px solid #00000027;
  border-radius: 4px;
  width: 86.99%;
  min-width: 468px;
  color: #000000D9;
  padding: 5px 12px;
  box-sizing: border-box;
  display: inline-block;
}
.hospitalCover{
  padding: 0px;
  position: relative;
}
.hospitalCover>img{
  height: 100%;
  position: absolute;
  top: 0;
  left: 12px;
  cursor: pointer;
}
.hospitalCoverBox{
  width: 14px;
  height: 100%;
  position: absolute;
  right: 23px;
  top: 0;
  bottom: 0;
  margin: auto 0px;
  cursor: pointer;
  z-index: 9999;
  overflow: hidden;
}
.hospitalCoverBox>i{
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  margin: auto 0px;  
}
.upload{
  opacity: 0;
  cursor: pointer;
  width: 14px;
  height: 100%;
  z-index: 9999;
  font-size: 0;
}
>>>.el-icon-more{
  width: 15px;
  height: 14px;
}
.modifyBox>ul>li>textarea{
  height: 224px;
  padding: 5px 8px 21px 12px;
  box-sizing: border-box
}
.modifyBoxFooter{
  width: 155px;
  height: 32px;
  margin: 0px auto;
}
.modifyBoxFooter>button{
  width: 65px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #FFFFFF
}
.modifyBoxFooter>button:first-child{
  border: 1px solid #D9D9D9;
  color: #000000A6;
  text-align: center;
  margin-right: 20px;
}
.modifyBoxFooter>button:last-child{
  color: #FFFFFF;
  background-color: #1890FF
}
.modifySubmitDialogSubmit{
  color: #F5222D;
}
>>>.modifySubmitDialogSubmit:focus,>>>.modifySubmitDialogSubmit:hover {
    color: #F5222D;
    border-color: #ffb3b7;
    background-color: #ffefef;
}
</style>
