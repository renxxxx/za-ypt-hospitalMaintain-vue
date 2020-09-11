<template>
    <div class="userManagement scrollStyle">
        <div class="userManagement_topTitle">
            <div class="userManagement_top">
                <i class="el-icon-s-fold"></i>
                <span>创建时间: {{$store.state.common.hospitalAboutData.createTime || ''}}</span>
            </div>
            <div class="userManagement_title">
                <router-link :to="{path: '/adminView/managementDepartment',query:{time:new Date().getTime().toString()}}">
                    <span>科室管理</span>
                </router-link>
            </div>
            <div class="userManagement_screening">
                <div class="userManagement_screening_options">
                    <span>关键字：</span>
                    <el-input v-model="kw" placeholder="请输入"></el-input>
                </div>
                <!-- <div class="userManagement_screening_options">
                    <span>类型：</span>
                    <el-select v-model="typeSelectValue" placeholder="请选择">
                        <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="userManagement_screening_options">
                    <span>医生：</span>
                    <el-select v-model="doctorSelectValue" placeholder="请选择">
                        <el-option
                        v-for="item in doctorOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div> -->
                <el-button type="primary" @click="searchFn">查 询</el-button>
            </div>
        </div>
        <div class="userManagement_table">
            <div class="userManagement_table_box">
                <!-- @current-change="handleCurrentChange" -->
                <el-button type="primary" @click="addFn()">+ 新 建</el-button>
                <el-table ref="singleTable" :data="tableDataList" highlight-current-row  
                    style="width: 100%" 
                    >
                    <el-table-column label="序号" prop="serialNumber" width="80"></el-table-column>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="封面" prop="cover" width="153">
                        <template slot-scope="scope">
                            <img :src="scope.row.cover" style="cursor: pointer;" alt="" @click="enlargeImagesFn(scope.row.cover)">
                        </template>
                    </el-table-column>  
                    <!-- <el-table-column label="类型" width="147">
                        <template slot-scope="scope">
                            {{(scope.row.type == 0? '普通':'') + (scope.row.type == 1? '医生':'' ) + (scope.row.type == 2? '医护':'')}}
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column label="医院" prop="hospitalName" ></el-table-column> -->
                    <!-- <el-table-column label="备注" prop="remark" ></el-table-column> -->
                    <el-table-column label="创建时间" prop="nowCreateTime" ></el-table-column>
                    <el-table-column label="更新时间" prop="nowCreateTime" ></el-table-column>
                    <el-table-column label="操作" prop="修改" width="124">
                        <template slot-scope="scope">
                           <span style="cursor: pointer;color: #1890FF" @click="modifyFn(scope.row)">修改</span>
                           <span style="color : #E9E9E9"> | </span>
                           <span style="cursor: pointer;color: #FF1A2E" @click="modifySubmitDialogShowFn(false,scope.row)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="userManagement_table_page">
                <el-pagination
                    hide-on-single-page = "true"
                    background
                    :current-page = "tabelNowPage"
                    layout="prev, pager, next,jumper"
                    @current-change = "pageFn"
                    :total="tabelSum">
                </el-pagination>
            </div>
            
        </div>
        
        
        <!-- <div class="dialogView"> -->
            <el-dialog :visible.sync="enlargeImagesValue" class="enlargeImagesBox" show-close="false">
                <div slot="title">
                </div>
                <div class="enlargeImagesClass">
                    <img :src="enlargeImagesSrc" alt="">
                </div>
            </el-dialog>
            <!-- 新增/修改用户列表 -->
            <el-dialog :visible.sync="modifyState" class="modifyDialog" width="62.2%" show-close="false">
                <div slot="title">
                    <div class="modifyBoxTitle">
                    <h3>修改信息</h3>
                    <span @click="modifyState = false">返回</span>
                    </div>
                </div>
                <div class="modifyBox"> 
                    <ul>
                    <li>
                        <span>科室名称：</span>
                        <input v-model="modifyData.name" type="text">
                    </li>
                    <li>
                        <span>封面：</span>
                        <div class="hospitalCover">
                        <img :src="modifyData.cover" alt="" @click="enlargeImagesFn(modifyData.cover)">
                        <div class="hospitalCoverBox">
                            <i class="el-icon-more"></i>
                            <input type="file" class="upload" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"
                                multiple @change="addImg($event)"/>
                        </div>
                        </div>
                    </li>
                    <li v-if="!userState">
                        <span>创建时间：</span>
                        <input v-model="modifyData.nowCreateTime" readonly="readonly" style="cursor: not-allowed;" type="text">
                        <!-- <el-date-picker
                            v-model="modifyData.createTime"
                            type="date"
                            placeholder="选择日期"
                            @change="checkoutTime">
                        </el-date-picker> -->
                    </li>
                    
                    <li>
                        <span>备注：</span>
                        <textarea v-model="modifyData.intro" name="" id="" cols="30" rows="10" class="scrollStyle"></textarea>
                    </li>
                    </ul>
                    <div class="modifyBoxFooter">
                    <button @click="modifyState = false">取消</button>
                    <button @click="modifySubmitDialogShowFn(true,'')">提交</button>
                    </div>
                </div>
            </el-dialog>
        <!-- </div> -->
        <el-dialog
            class="modifySubmitDialog"
            :visible.sync="modifySubmitState"
            width="30%"
            center>
            <img style="height:22px;width:22px;float:left;margin-right:16px" src="../../../assets/detele.png" alt="">
            <span style="font-size:18px">{{modifySubmitStateMessage}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifySubmitState = false">取 消</el-button>
                <el-button class="modifySubmitDialogSubmit" @click="modifySubmitDialogFn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name : 'userManagement',
    data(){
        return {
            query:'',
            typeSelectValue:null,
            doctorSelectValue:null,
            typeOptions:[
                {
                    value : 0,
                    label : '普通'
                },
                {
                    value : 1,
                    label : '医生'
                },
                {
                    value : 2,
                    label : '医护'
                },
            ],
            doctorOptions:[
                {}
            ],
            tabelSum:1,
            tabelNowPage:1,
            tableDataList:[],
            modifyState:false,
            modifyData:{},
            enlargeImagesValue:false,
            enlargeImagesSrc:'',
            userState:true,
            kw:'',
            modifySubmitState:false,
            modifySubmitStateMessage:'',
            modifySubmitDialogState:false,
            addSubmitDialogState:false,
            modifySubmitDialogData:{},
        }
    },
    activated(){
        if(this.query != JSON.stringify(this.$route.query)){
            this.initData();
            this.$common.checkLogin()
            this.query = JSON.stringify(this.$route.query);
            this.getDataSum();
        }
    },
    methods:{
        initData(){
            Object.assign(this.$data, this.$options.data());
        },
        getData(_page){
            this.$axios.get('/hospital-maintain/office-list?' + this.$qs.stringify({
                kw : this.kw,
                ps : 10,
                pn : _page,
            }))
            .then(res => {
                if(res.data.codeMsg){
                    this.$message(res.data.codeMsg)
                }
                if(res.data.code == 0){
                    
                    for(let i in res.data.data.rows){
                        // res.data.data.rows[i].createTime = this.moment(res.data.data.rows[i].createTime).format('YYYY-MM-DD HH-mm-ss')
                        // res.data.data.rows[i].updateTime = this.moment(res.data.data.rows[i].updateTime).format('YYYY-MM-DD HH-mm-ss')
                        this.tableDataList.push({
                           serialNumber:(_page - 1) * 10 + parseInt(i)+1,
                           officeId: res.data.data.rows[i].officeId,
                           name: res.data.data.rows[i].name,
                           cover: res.data.data.rows[i].cover,
                           intro: res.data.data.rows[i].intro,
                           orderNoInHospital: res.data.data.rows[i].orderNoInHospital,
                           createTime: res.data.data.rows[i].createTime,
                           nowCreateTime: this.moment(res.data.data.rows[i].createTime).format('YYYY-MM-DD HH-mm-ss'),
                           updateTime: res.data.data.rows[i].updateTime,
                           nowUpdateTime: this.moment(res.data.data.rows[i].updateTime).format('YYYY-MM-DD HH-mm-ss'),
                        })
                    }
                    console.log(this.tableDataList)
                }
            })
        },
        getDataSum(){
            this.$axios.get('/hospital-maintain/office-list-sum?'+ this.$qs.stringify({
                kw : this.kw,
            }))
            .then(res => {
                if(res.data.codeMsg){
                    this.$message(res.data.codeMsg)
                }
                if(res.data.code == 0){
                    // this.tabelSum = ;
                    
                    // if(String(res.data.data.rowCount/10).split(".").length > 1){
                    //     this.tabelSum =parseInt(String(res.data.data.rowCount/10).split(".")[0]) + 1
                    // }
                    this.tabelSum = res.data.data.rowCount
                    // console.log(this.tabelSum)
                    if(this.tabelSum > 0){
                        this.getData(1)
                    }
                }
            })
        },
        pageFn(_value){
            // console.log(_value);
            this.tableDataList = []
            this.getData(_value)
        },
        searchFn(){
            this.tableDataList = []
            this.getDataSum();
        },
        modifyFn(_value){
            console.log(_value)
            this.modifyData = _value
            this.modifyState = true;
            this.userState = false;
        },
        delFn(_value){
            if(_value){
                this.$axios.post('/hospital-maintain/delete-office-list',this.$qs.stringify({
                    officeId : _value.officeId,
                    delNew : '1',
                    expectedRowCount : '1'
                }))
                .then(res => {
                    if(res.data.codeMsg){
                        this.$message(res.data.codeMsg)
                    }
                    if(res.data.code == 0){
                        this.$message("操作成功")
                        this.tableDataList = []
                        this.getDataSum();
                    }
                })
            }
        },
        addFn(){
            this.modifyData = {
                userId : '',
                name : '',
                phone : '',
                cover : '',
                type : '',
                createTime : '',
                remark : '',
            }
            this.modifyState = true;
            this.userState = true;
            this.addSubmitDialogState = true;
        },
        handleCurrentChange(_value){
            this.modifyData = _value
        },
        enlargeImagesFn(_value){
            this.enlargeImagesValue = true
            this.enlargeImagesSrc = _value
        },
        addImg(_fileLIst){
			var file = _fileLIst.target.files[0]
			// 
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
				formData.append('file', file)
				this.$axios.post('upload-file?',formData,{headers: {'Content-Type': 'multipart/form-data'
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
        checkoutTime(_value){
            // console.log(this.moment(_value).format('YYYY-MM-DD HH-mm-ss'))
            // console.log(_value);

        },
        modifySubmitDialogShowFn(_valueData,_value){
            if(this.addSubmitDialogState){
                this.addSubmitDialogState = false;
                this.modifySubmitFn()
                return ''
            }
            this.modifySubmitState = true;
            this.modifySubmitDialogState = _valueData;
            this.modifySubmitDialogData = _value
            if(_valueData){
                this.modifySubmitStateMessage = "确认要修改这条信息吗？"
            }else{
                this.modifySubmitStateMessage = "确认要删除这条信息吗？"
            }
        },
        modifySubmitDialogFn(){
            if(this.modifySubmitDialogState){
                this.modifySubmitFn();
            }else{
                this.delFn(this.modifySubmitDialogData)
            }
            this.modifySubmitState = false;
        },
        modifySubmitFn(){
            if(this.userState){
                this.$axios.post('/hospital-maintain/create-office',this.$qs.stringify({
                     name : this.modifyData.name,
                    cover : this.modifyData.cover,
                    createTime: new Date().getTime(),
                    intro : this.modifyData.intro,
                }))
                .then(res => {
                    if(res.data.codeMsg){
                        this.$message(res.data.codeMsg)
                    }
                    if(res.data.code == 0){
                        this.modifyState = false
                        this.$message("操作成功")
                        this.tableDataList = []
                        this.getDataSum();
                    }
                })
            }else{
                this.$axios.post('hospital-maintain/update-office',this.$qs.stringify({
                    officeId : this.modifyData.officeId,
                    name : this.modifyData.name,
                    cover : this.modifyData.cover,
                    createTime: this.modifyData.createTime,
                    intro : this.modifyData.intro,
                }))
                .then(res => {
                    if(res.data.codeMsg){
                        this.$message(res.data.codeMsg)
                    }
                    if(res.data.code == 0){
                        this.modifyState = false
                        this.$message("操作成功")
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.userManagement {
    background: rgba(240, 242, 245, 1);
    width: calc(100% - 200px);
    min-width: 900px;
    height: 100%;
    float: left;
    overflow: scroll;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    font-family:'DINPro' !important;
}
.dialogView{
    height: 100vh;
    width: 100vh;
}
.userManagement_topTitle{
    height: auto;
    width: 100%;
    position: relative;
}
.userManagement_top {
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
}
.userManagement_top i {
    width: 20px;
    height: 20px;
    padding: 22px 24px;
    box-sizing: border-box;
    cursor: pointer;
}

.userManagement_top span {
    float: right;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-right: 32px;
}
.userManagement_title{
    width: 100%;
    height: 150px;
    background: rgba(255, 255, 255, 1);
    margin-top: 4px;
    box-sizing: border-box;
    padding: 16px 32px 19px;
    box-sizing: border-box
}
.userManagement_title>span{
    color: #000000;
    cursor: pointer;
}
.userManagement_screening{
    position: absolute;
    bottom: 19px;
    left: 32px;
}
.userManagement_screening_options{
    display: inline-block;
    margin-right: 30px;
}
.userManagement_screening_options >>>.el-input{
    width: 180px
}
.userManagement_table{
    height: calc(100% - 214px);
    width: 100%;
    padding: 25px 24px 61px;
    box-sizing: border-box;
}
>>>.el-pager li  {
    background-color: #ffffff!important
}
>>>.el-pager li:not(.disabled).active {
    background-color: #409EFF!important;
}
>>>.btn-next,>>>.btn-prev{
    background-color: #ffffff!important
}
.userManagement_table{
    width: 100%;
    height: 658px;
}
.userManagement_table_box{
    box-sizing: border-box;
    padding: 32px;
    background-color: #ffffff
}
>>>.has-gutter{
    background-color: #FAFAFA
}
.userManagement_table_page{
    margin: 40px 0px 61px;
    float: right;

}
.tabelModifySpan{
    cursor: pointer;
    color: #1890FF
}
>>>.el-table__row td:nth-child(3){
    padding: 0px
}
>>>.el-table__row td:nth-child(3) img{
    height: 41px;
    width: 41px;
}
>>>.el-table__row td:nth-child(5) div{
    display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
}
.modifyDialog >>>.el-dialog{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto!important;
    height: 667px;
    min-width: 670px;
}
.modifyDialog >>>.el-dialog__header,.modifySubmitDialog >>>.el-dialog__header{
  padding:0px;
}
.modifyDialog >>>.el-dialog__headerbtn,.modifySubmitDialog >>>.el-dialog__header{
  display: none;
}
.modifyDialog >>>.el-dialog__body{
  padding:0px
  
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
  padding: 0px;
  min-width: 590px;
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
  width: 520px;
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
.modifySelectClass{
    display: inline-block;
}
.modifySelectClass>span{
    width: 70px;
    text-align: right;
    color: #000000D9;
    font-size: 14px;
    display: inline-block;
    float: left;
}
.modifySelectClass >>>.el-input{
    width: 520px;
    min-width: 468px;
    height: 32px;
}
.modifySelectClass >>>.el-input input{
    height: 32px;
}
.modifySelectClass >>>.el-input__icon{
    line-height: 100%;
}
.modifyBox>ul>li:nth-child(4) >>>.el-input{
    width: 520px;
    min-width: 468px;
    height: 30px;
}
.modifyBox>ul>li:nth-child(4) >>>.el-input input{
    height: 30px;
    cursor: pointer;
}
.modifyBox>ul>li:nth-child(4) >>>.el-input__icon{
    line-height: 100%
}

.enlargeImagesBox >>>.el-dialog{
    background-color: transparent;
    box-shadow:none;
    width: 410px;
    height: 410px;
    min-width: 410px;
}
.enlargeImagesBox >>>.el-dialog__body{
    height: 410px;
    width: 410px;
    
}
.enlargeImagesClass{
    position: relative;
    height: 410px;
    width: 410px;
}
.enlargeImagesClass>img{
    height: 410px;
    width: 410px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
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