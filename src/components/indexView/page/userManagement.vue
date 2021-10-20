<template>
    <div class="userManagement scrollStyle">
        <div class="userManagement_topTitle">
            <div class="userManagement_top">
                <i class="el-icon-s-fold"></i>
                <div style="display: inline;">姓名：{{$store.state.user.account.name}}&nbsp;&nbsp;&nbsp;&nbsp;手机号：{{$store.state.user.account.phone}}</div>
                <span>创建时间: {{$store.state.common.hospitalAboutData.createTime || ''}}</span>
            </div>
            <div class="userManagement_title">
                <div>
                    <router-link :to="{path: '/index/userManagement',query:{time:new Date().getTime().toString()}}">
                        <span>用户管理</span>
                    </router-link>
                </div>
            <!-- </div> -->
            <!-- <div class="userManagement_screening"> -->
                <div class="userManagement_screening_options">
                    <span>关键字：</span>
                    <el-input v-model="kw" placeholder="请输入"></el-input>
                </div>
                <div class="userManagement_screening_options">
                    <el-date-picker
                        v-model="timeSearch"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :default-time="['00:00:00','23:59:59']">
                    </el-date-picker>
                </div>
                <div class="userManagement_screening_options">
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
                    <span>医院运维：</span>
                    <el-select v-model="hospitalMaintainIsValue" placeholder="请选择">
                        <el-option
                        v-for="item in hospitalMaintainIsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button style="margin-top: 10px;" type="primary" @click="searchFn">查 询</el-button>
                <el-button style="margin-top: 10px;" type="info" @click="resertSearchFn">重 置</el-button>
                <div style="height: 40px;line-height: 40px;">总数：{{tabelSum}}</div>
            </div>
        </div>
        <div class="userManagement_table">
            <div class="userManagement_table_box">
                <!-- @current-change="handleCurrentChange" -->
                <el-button type="primary" @click="addFn()">+ 新 建</el-button>
                <el-table ref="singleTable" :data="tableDataList" highlight-current-row  
                    style="width: 100%" 
                    >
                    <el-table-column label="序号" prop="serialNumber"  width="70"></el-table-column>
                    <el-table-column label="昵称">
                         <template slot-scope="scope" >
                             <div class="line-1" :title="scope.row.name">
                                {{scope.row.name}}
                             </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="头像" prop="cover" width="143">
                        <template slot-scope="scope">
                            <img :src="scope.row.cover" style="cursor: pointer;" alt="" @click="enlargeImagesFn(scope.row.cover)">
                        </template>
                    </el-table-column>  
                    <el-table-column label="类型" width="137">
                        <template slot-scope="scope">
                            <!-- + (scope.row.type == 2? '医护':'') -->
                            {{(scope.row.type == 0? '普通':'') + (scope.row.type == 1? '医生':'' ) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="医院" >
                        <template slot-scope="scope">
                            <div class="line-2" :title="scope.row.hospitalName">{{scope.row.hospitalName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <div class="line-2" :title="scope.row.remark">{{scope.row.remark}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="nowCreateTime" ></el-table-column>
                    <el-table-column label="操作" prop="修改" width="114">
                        <template slot-scope="scope">
                           <span style="cursor: pointer;color: #1890FF" @click="modifyFn(scope.row)" title="修改此用户信息">修改</span>
                           <span style="color : #E9E9E9"> | </span>
                           <span style="cursor: pointer;color: #FF1A2E" @click="modifySubmitDialogShowFn(false,scope.row)" title="删除此用户">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="userManagement_table_page">
                <el-pagination
                    :hide-on-single-page = "hideOnSinglePageValue"
                    background
                    :current-page.sync="tabelNowPage"
                    layout="prev, pager, next,jumper"
                    @current-change = "pageFn"
                    :total="tabelSum">
                </el-pagination>
            </div>
            
        </div>
        
        
        <!-- <div class="dialogView"> -->
            <el-dialog :visible.sync="enlargeImagesValue" class="enlargeImagesBox">
                <div slot="title">
                </div>
                <div class="enlargeImagesClass">
                    <img :src="enlargeImagesSrc" alt="">
                </div>
            </el-dialog>
            <!-- 新增/修改用户列表 -->
            <el-dialog class="modifyHospitalDialog" :visible.sync="modifyState"  width="62.2%"
            @closed="addSubmitDialogState = false;modifyState = false">
                <div slot="title">
                    <div class="modifyBoxTitle">
                    <h3>修改信息</h3>
                    <span @click="modifyState = false">返回</span>
                    </div>
                </div>
                <div class="modifyBox"> 
                    <ul>
                    <li>
                        <span>用户名称：</span>
                        <input v-model="modifyData.name" type="text">
                    </li>
                    <li>
                        <span>手机：</span>
                        <input v-model="modifyData.phone" type="number">
                    </li>
                    <li>
                        <div class="modifySelectClass">
                            <span>类型：</span>
                            <el-select v-model="modifyData.type" placeholder="请选择" @change="uesrTypeChooseFn">
                                <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="modifySelectClass" style="float: right;">
                            <span>医生：</span>
                            <el-select v-model="modifyData.type1DoctorId" placeholder="请选择" @change="uesrDoctorChooseFn">
                                <el-option
                                v-for="item in doctorOptions"
                                :key="item.doctorId"
                                :label="item.label"
                                :value="item.doctorId">
                                </el-option>
                            </el-select>
                        </div>
                        
                    </li>
                    
                    <li>
                        <div class="modifySelectClass">
                            <span>医院运维：</span>
                            <el-select v-model="modifyData.hospitalMaintainIs" placeholder="请选择" @change="uesrDoctorChooseFn">
                                <el-option
                                v-for="item in hospitalMaintainIsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            
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
                        <span>头像：</span>
                        <div class="hospitalCover">
                        <img :src="modifyData.cover" alt="" @click="enlargeImagesFn(modifyData.cover)">
                        <div class="hospitalCoverBox">
                            
                            <!-- <input type="file" class="upload" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"
                                multiple @change="addImg($event)"/> -->
                            <el-upload
                                class="upload-demo"
                                action="/ypt/upload-file"
                                multiple
                                :limit="1"
                                :on-success="uploadSuccessFn"
                                :on-error="uploaErrorFn"
                                :on-exceed="exceedFn"
                                :file-list="fileList">
                                <i class="el-icon-more"></i>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </div>
                        
                        </div>
                    </li>
                    <li>
                        <span>备注：</span>
                        <textarea v-model="modifyData.remark" name="" id="" cols="30" rows="10" class="scrollStyle"></textarea>
                    </li>
                    </ul>
                    <div class="modifyBoxFooter">
                    <button @click="addSubmitDialogState = false;modifyState = false" style="cursor:pointer;">取消</button>
                    <button @click="modifySubmitDialogShowFn(true,'')" style="cursor:pointer;">提交</button>
                    </div>
                </div>
            </el-dialog>

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
        <!-- </div> -->
        
    </div>
</template>
<script>
export default {
    name : 'userManagement',
    data(){
        return {
            hideOnSinglePageValue:true,
            query:'',
            typeSelectValue:null,
            hospitalMaintainIsValue:'',
            typeOptions:[
                {
                    value : 0,
                    label : '普通'
                },
                {
                    value : 1,
                    label : '医生'
                },
            ],
            hospitalMaintainIsOptions:[
                {
                    value : 0,
                    label : '否'
                },
                {
                    value : 1,
                    label : '是'
                },
            ],
            doctorOptions:[],
            tabelSum:0,
            tabelNowPage:1,
            tableDataList:[],
            modifyState:false,
            modifyData:{},
            fileList:[],
            enlargeImagesValue:false,
            enlargeImagesSrc:'',
            userState:true,
            modifyShow:false,
            modifySubmitState:false,
            modifySubmitStateMessage:'',
            modifySubmitDialogState:false,
            modifySubmitDialogData:{},
            addSubmitDialogState:false,
            kw:'',
            timeSearch:''
        }
    },
    async activated(){
        if(this.query != JSON.stringify(this.$route.query)){
            this.initData();
            //await this.$common.checkLogin(this.$route.query.hospitalId)
            this.query = JSON.stringify(this.$route.query);
            this.getDataSum();
        }
    },
    methods:{
        initData(){
            Object.assign(this.$data, this.$options.data());
        },
        getData(_page){
            let createTimeFrom = '';
            let createTimeTo = '';
            if(this.timeSearch){
                createTimeFrom = this.moment(this.timeSearch[0]).valueOf()
                createTimeTo = this.moment(this.timeSearch[1]).valueOf()
            }
            this.$axios.get('/ypt/hospital-maintain/users?' + this.$qs.stringify({
                kw : this.kw,
                ps : 10,
                pn : _page,
                createTimeFrom : createTimeFrom,
                createTimeTo : createTimeTo,
                type: this.typeSelectValue,
                hospitalMaintainIs:this.hospitalMaintainIsValue
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
                           userId: res.data.data.rows[i].userId,
                           name: res.data.data.rows[i].name,
                           hospitalId: res.data.data.rows[i].hospitalId,
                           hospitalName: res.data.data.rows[i].hospitalName,
                           phone: res.data.data.rows[i].phone,
                           cover: res.data.data.rows[i].cover,
                           money: res.data.data.rows[i].money,
                           point: res.data.data.rows[i].point,
                           type: res.data.data.rows[i].type,
                           createTime: res.data.data.rows[i].createTime,
                           nowCreateTime: this.moment(res.data.data.rows[i].createTime).format('YYYY-MM-DD HH:mm:ss'),
                           updateTime: res.data.data.rows[i].updateTime,
                           nowUpdateTime: this.moment(res.data.data.rows[i].updateTime).format('YYYY-MM-DD HH:mm:ss'),
                           frozen: res.data.data.rows[i].frozen,
                           remark: res.data.data.rows[i].remark,
                           orderNo: res.data.data.rows[i].orderNo,
                        })
                    }
                    console.log(this.tableDataList)
                }
            })
        },
        getDataSum(){
            let createTimeFrom = '';
            let createTimeTo = '';
            if(this.timeSearch){
                createTimeFrom = this.moment(this.timeSearch[0]).valueOf()
                createTimeTo = this.moment(this.timeSearch[1]).valueOf()
            }   
            this.$axios.get('/ypt/hospital-maintain/users-sum?'+ this.$qs.stringify({
                kw : this.kw,
                createTimeFrom : createTimeFrom,
                createTimeTo : createTimeTo,
                type: this.typeSelectValue,
                hospitalMaintainIs:this.hospitalMaintainIsValue
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
                    this.tableDataList = []
                    if(this.tabelSum > 0){
                        this.pageFn(1)
                    }
                    
                }
            })
        },
        getModifyDetails(_value){
            this.$axios.get('/ypt/hospital-maintain/user-'+_value.userId)
            .then(res =>{
                if(res.data.codeMsg){
                    this.$message(res.data.codeMsg)
                }
                if(res.data.code == 0){
                    this.modifyData = {
                        userId:res.data.data.userId,
                        name: res.data.data.name,
                        phone: res.data.data.phone,
                        cover: res.data.data.cover,
                        point: res.data.data.point,
                        money: res.data.data.money,
                        hospitalId: res.data.data.hospitalId,
                        hospitalName: res.data.data.hospitalName,
                        type: res.data.data.type,
                        type1DoctorId: res.data.data.type1DoctorId,
                        type1DoctorName:res.data.data.type1DoctorName,
                        type2NurseId:res.data.data.type2NurseId,
                        type2NurseName:res.data.data.type2NurseName,
                        createTime: res.data.data.createTime,
                        nowCreateTime: this.moment(res.data.data.createTime).format('YYYY-MM-DD HH-mm-ss'),
                        updateTime: res.data.data.updateTime,
                        nowUpdateTime: this.moment(res.data.data.updateTime).format('YYYY-MM-DD HH-mm-ss'),
                        frozen: res.data.data.frozen,
                        frozenReason: res.data.data.frozenReason,
                        remark: res.data.data.remark,
                        hospitalMaintainIs:res.data.data.hospitalMaintainIs,
                    }
                }
            })
        },
        getDoctor(_value){
            this.$axios.get('/ypt/hospital-maintain/doctors' )
            .then(res=>{
                 if(res.data.codeMsg){
                    this.$message(res.data.codeMsg)
                }
                if(res.data.code == 0){
                    this.doctorOptions = []
                    for(let i in res.data.data.rows)
                    this.doctorOptions.push({
                        doctorId:res.data.data.rows[i].doctorId,
                        label:res.data.data.rows[i].name,
                    })
                }
                if(_value){
                    this.getModifyDetails(_value)
                }
                
            })
        },
        pageFn(_value){
            // console.log(_value);
            this.tableDataList = []
            this.getData(_value)
        },
        searchFn(){
            this.tabelNowPage = 1
            this.getDataSum();
            
        },
        resertSearchFn(){
            this.kw = '';
            this.timeSearch = [];
            this.timeSearch = '';
            this.typeSelectValue = ''
            this.tabelNowPage = 1;
            this.hospitalMaintainIsValue = '';
            this.getDataSum()
        },
        modifyFn(_value){
            this.doctorOptions = []
            // this.getDoctor();
            console.log(_value)
            // this.modifyData = _value;
            this.getDoctor(_value);
            this.modifyData = JSON.parse(JSON.stringify(_value));
            this.modifyState = true;
            this.userState = false;
        },
        delFn(_value){
            if(_value){
                this.$axios.post('/ypt/hospital-maintain/update-users',this.$qs.stringify({
                    userId : _value.userId,
                    delNew : '1',
                    expectedRowCount:'1'
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
                hospitalMaintainIs : '',
                createTime : '',
                remark : ''
            }
            this.getDoctor();
            this.addSubmitDialogState = true;
            this.modifyState = true;
            this.userState = true;
        },
        handleCurrentChange(_value){
            this.modifyData = _value
        },
        enlargeImagesFn(_value){
            if(_value){
                this.enlargeImagesValue = true
                this.enlargeImagesSrc = _value
            }
        },
        uesrTypeChooseFn(_value){
            if(_value == 0){
                this.modifyData.type1DoctorId = ''
            }
        },
        uesrDoctorChooseFn(_value){
            this.modifyData.type = 1
        },
        // addImg(_fileLIst){
		// 	var file = _fileLIst.target.files[0]
		// 	// 
		// 	if(file.type.indexOf('image') > -1){
		// 		let formData = new FormData();
		// 		formData.append('file', file)
		// 		this.$axios.post('/ypt/upload-file',formData,{headers: {'Content-Type': 'multipart/form-data'
		// 		}})
		// 		.then(res =>{
		// 			if(!res.data.codeMsg){
		// 				this.modifyData.cover=res.data.data.url
		// 			}
		// 		})
		// 		.catch(err =>{})
		// 	 }else{
		// 		this.$message('请选择图片')
		// 		return false;
		// 	}
        // },
        uploadSuccessFn(response, file, fileList){
            // console.log('/***********Success***********/')
            this.$message('操作成功')
            this.fileList = []
            // console.log(response)
            this.modifyData.cover = response.data.url
            // console.log(file)
            // console.log(fileList)
        },
        uploaErrorFn(err, file, fileList){
            this.$message('操作失败')
            // console.log('/***********err***********/')
            // console.log(err)
            // console.log(file)
            // console.log(fileList)
        },
        exceedFn(files, fileList){
            this.$message('请单个上传图片')
            // console.log(files)
            // console.log(fileList)
            // console.log(this.fileList)
        },
        checkoutTime(_value){
            // console.log(this.moment(_value).format('YYYY-MM-DD HH-mm-ss'))
            // console.log(_value);

        },
        modifySubmitDialogShowFn(_valueData,_value){
            if(this.addSubmitDialogState){
                
                // this.tableDataList = [];
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
                // this.tableDataList = [];
                this.modifySubmitFn();
            }else{
                this.delFn(this.modifySubmitDialogData)
            }
            this.modifySubmitState = false;
        },
        modifySubmitFn(){
            if(this.userState){
                this.$axios.post('/ypt/hospital-maintain/create-user',this.$qs.stringify({
                    name : this.modifyData.name,
                    phone : this.modifyData.phone,
                    cover : this.modifyData.cover,
                    type : this.modifyData.type,
                    hospitalMaintainIs:this.modifyData.hospitalMaintainIs,
                    type1DoctorId:this.modifyData.type1DoctorId,
                    createTime : new Date().getTime(),
                    remark : this.modifyData.remark,
                }))
                .then(res => {
                    if(res.data.codeMsg){
                        this.$message(res.data.codeMsg)
                    }
                    if(res.data.code == 0){
                        this.modifyState = false;
                        this.modifySubmitState = false;
                        this.tableDataList = [];
                        this.addSubmitDialogState = false;
                        this.$message("操作成功")
                        this.getDataSum();
                    }
                })
            }else{
                this.$axios.post('/ypt/hospital-maintain/update-user',this.$qs.stringify({
                    userId : this.modifyData.userId,
                    name : this.modifyData.name,
                    phone : this.modifyData.phone,
                    cover : this.modifyData.cover,
                    type1DoctorId:this.modifyData.type1DoctorId,
                    hospitalMaintainIs:this.modifyData.hospitalMaintainIs,
                    type : this.modifyData.type,
                    createTime : this.modifyData.createTime,
                    remark : this.modifyData.remark,
                }))
                .then(res => {
                    if(res.data.codeMsg){
                        this.$message(res.data.codeMsg)
                    }
                    if(res.data.code == 0){
                        this.modifyState = false
                        this.$message("操作成功")
                        this.getDataSum();
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
    /* width: calc(100% - 200px); */
    width: 100%;
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
    /* cursor: pointer; */
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
    height: auto;
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
    margin-right: 20px;
    margin-top: 10px;
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
.modifyHospitalDialog >>>.el-dialog{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto!important;
    height: 673px;
    min-width: 670px;
}
.modifyHospitalDialog >>>.el-dialog__header{
  padding:0px;
}
.modifyHospitalDialog >>>.el-dialog__headerbtn{
  display: none;
}
.modifyHospitalDialog >>>.el-dialog__body{
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
  height: 172px;
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
  /* height: 14px; */
}
.modifyBox>ul>li>textarea{
  height: 172px;
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
    /* width: 520px; */
    /* min-width: 468px; */
    height: 32px;
}
.modifySelectClass >>>.el-input input{
    height: 32px;
}
.modifySelectClass >>>.el-input__icon{
    line-height: 100%;
}
/* .modifyBox>ul>li:nth-child(4) >>>.el-input{
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
} */

.enlargeImagesBox >>>.el-dialog{
    background-color: transparent;
    box-shadow:none;
    width: 410px;
    height: 410px;
    /* min-width: 410px; */
}
.enlargeImagesBox >>>.el-dialog__header{
    padding: 0px;
}
.enlargeImagesBox >>>.el-dialog__body{
    height: 410px;
    width: 410px;
    padding: 0px;
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}
>>>.el-range-editor{
    width: 380px;
}
</style>