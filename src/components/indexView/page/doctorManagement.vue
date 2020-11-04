<template>
    <div class="doctorManagement scrollStyle">
        <div class="doctorManagement_topTitle">
            <div class="doctorManagement_top">
                <i class="el-icon-s-fold"></i>
                <div style="display: inline;">姓名：{{$store.state.user.account.name}}&nbsp;&nbsp;&nbsp;&nbsp;手机号：{{$store.state.user.account.phone}}</div>
                <span>创建时间: {{$store.state.common.hospitalAboutData.createTime || ''}}</span>
            </div>
            <div class="doctorManagement_title">
                <div>
                    <router-link :to="{path: '/index/doctorManagement',query:{time:new Date().getTime().toString()}}">
                        <span>医生管理</span>
                    </router-link>
                </div>
                
                
            <!-- </div> -->
            <!-- <div class="doctorManagement_screening"> -->
                <div class="doctorManagement_screening_options">
                    <span>关键字：</span>
                    <el-input v-model="kw" placeholder="请输入"></el-input>
                </div>
                <div class="doctorManagement_screening_options">
                    <el-date-picker
                        v-model="timeSearch"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :default-time="['00:00:00','23:59:59']">
                    </el-date-picker>
                </div>
                <div class="doctorManagement_screening_options">
                    <span>科室：</span>
                    <el-select v-model="officeId" placeholder="请选择">
                        <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class="doctorManagement_screening_options">
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
                <el-button style="margin-top: 10px;" type="primary" @click="searchFn">查 询</el-button>
                <el-button style="margin-top: 10px;" type="info" @click="resertSearchFn">重 置</el-button>
                <div style="height: 40px;line-height: 40px;">总数：{{tabelSum}}</div>
            </div>
        </div>
        <div class="doctorManagement_table">
            <div class="doctorManagement_table_box">
                <el-button type="primary" @click="addFn()">+ 新 建</el-button>
                <el-button type="info" @click="allDownloadFn()">
                    <i class="el-icon-download"></i>
                    下载全部二维码
                </el-button>
                
                  <!-- <canvas  width="40" height="60" style="display:block;" id="canvassss"></canvas> -->
                <el-table ref="singleTable" :data="tableDataList" highlight-current-row  
                    style="width: 100%" 
                    >
                    <el-table-column prop="serialNumber" width="70"></el-table-column>
                    <el-table-column prop="cover" width="62">
                        <template slot-scope="scope">
                            <img :src="scope.row.cover" style="cursor: pointer;" alt="" @click="enlargeImagesFn(scope.row.cover)">
                        </template>
                    </el-table-column> 
                    <el-table-column>
                        <template slot-scope="scope">
                            <div :title="scope.row.name" class="line-1">{{scope.row.name}}</div>
                            <div :title="scope.row.intro" class="line-2">{{scope.row.intro}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column >
                        <template slot-scope="scope">
                            <img :src="scope.row.qrcode" alt="" style="height:84px;width:70px" @click="qrCodeImagesFn(scope.row.qrcode)">
                        </template>
                    </el-table-column>
                    
                    <el-table-column>
                        <template slot-scope="scope" >
                            <div>标签</div>
                            <div :title="scope.row.tag" class="line-1">{{scope.row.tag}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope" >
                            <div>创建时间</div>
                            <div :title="scope.row.nowCreateTime">{{scope.row.nowCreateTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="修改" width="150">
                        <template slot-scope="scope">
                           <span style="cursor: pointer;color: #1890FF" @click="modifyFn(scope.row)" title="修改此医生信息">修改</span>
                           <span style="color : #E9E9E9"> | </span>
                           <span style="cursor: pointer;color: #FF1A2E" @click="modifySubmitDialogShowFn(false,scope.row)" title="删除此医生">删除</span>
                           <span style="color : #E9E9E9"> | </span>
                           <a style="cursor: pointer;color: #909399" :href="scope.row.wxMappQrcode" title="下载二维码" :download="scope.row.name+'-'+scope.row.hospitalName+'-'+scope.row.doctorId">下载</a>
                           <!-- <span style="cursor: pointer;color: #909399" @click="downloadFn(scope.row)" title="下载二维码" download>下载</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="doctorManagement_table_page">
                <el-pagination
                    :hide-on-single-page = "hideOnSinglePageValue"
                    background
                    :current-page.sync ="tabelNowPage"
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
            <el-dialog :visible.sync="qrCodeValue" class="enlargeImagesBox">
                <div slot="title">
                </div>
                <div class="qrCodeImagesClass">
                    <img :src="qrCodeSrc" alt="">
                </div>
            </el-dialog>
            <!-- 新增/修改用户列表 -->
            <el-dialog :visible.sync="modifyState" class="modifyDialog" width="62.2%"
            @closed="addSubmitDialogState = false;modifyState = false"
            >
                <div slot="title">
                    <div class="modifyBoxTitle">
                    <h3>修改信息</h3>
                    <span @click="modifyState = false">返回</span>
                    </div>
                </div>
                <div class="modifyBox"> 
                    <ul>
                        <li>
                            <span>医生名称：</span>
                            <input v-model="modifyData.name" type="text">
                        </li>
                        <li>
                            <span>标签：</span>
                            <input v-model="modifyData.tag" type="text">
                        </li>
                        <li>
                            <span>简介：</span>
                            <input v-model="modifyData.intro" type="text">
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
                                <i class="el-icon-more"></i>
                                <input type="file" class="upload" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"
                                    multiple @change="addImg($event)"/>
                            </div>
                            
                            </div>
                        </li>

                        <li>
                            <div class="modifySelectClass">
                                <span>科室：</span>
                                <el-select v-model="modifyData.officeId" placeholder="请选择">
                                    <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <!-- <div class="modifySelectClass" style="float: right;">
                                <span>医生：</span>
                                <el-select v-model="typeSelectValue" placeholder="请选择">
                                    <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div> -->
                        </li>
                        
                        
                        <li>
                            <span>备注：</span>
                            <textarea v-model="modifyData.remark" name="" id="" cols="30" rows="10" class="scrollStyle"></textarea>
                        </li>
                    </ul>
                    <div class="modifyBoxFooter">
                    <button @click="modifyState = false;addSubmitDialogState = false" style="cursor:pointer;">取消</button>
                    <button @click="modifySubmitDialogShowFn(true,'')" style="cursor:pointer;">提交</button>
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
        <div class="v-modal" tabindex="0" style="z-index: 2003;" v-if="allDownloadShowState">
            <div class="spinner-box">
                <div class="circle-border">
                    <div class="circle-core"></div>
                </div>  
            </div>
        </div>
    </div>
</template>
<script>
import JSZip from 'jszip'
import FileSaver from 'file-saver'
export default {
    name : 'doctorManagement',
    data(){
        return {
            query:'',
            hideOnSinglePageValue:true,
            typeSelectValue:null,
            officeSelectValue:[],
            typeOptions:[],
            doctorOptions:[
                {}
            ],
            
            tabelSum:0,
            tabelNowPage:1,
            tableDataList:[],
            modifyState:false,
            modifyData:{},
            enlargeImagesValue:false,
            enlargeImagesSrc:'',
            qrCodeValue:false,
            qrCodeSrc:'',
            userState:true,
            kw:'',
            modifySubmitState:false,
            modifySubmitStateMessage:'',
            modifySubmitDialogState:false,
            addSubmitDialogState:false,
            modifySubmitDialogData:{},
            timeSearch:'',
            officeId:'',
            wxminQrcode : '',
            allDownloadShowState : false,
            allDownTimeoutHandling : '',
        }
    },
    activated(){
        if(this.query != JSON.stringify(this.$route.query)){
            this.initData();
            this.$common.checkLogin(this.$route.query.hospitalId)
            this.query = JSON.stringify(this.$route.query);
            this.getDataSum();
            this.getOfficeFn()
        }
    },
    methods:{
        initData(){
            Object.assign(this.$data, this.$options.data());
        },
        getOfficeFn(_value){
            this.$axios.get('/ypt/hospital-maintain/office-list')
            .then(res => {
                if(res.data.codeMsg){
                    this.$message(res.data.codeMsg)
                }
                if(res.data.code == 0){
                    for(let i in res.data.data.rows){
                        this.typeOptions.push({
                            value : res.data.data.rows[i].officeId,
                            label : res.data.data.rows[i].name
                        })
                    }
                }
            })
        },
        getWxminQrcode(_resValue,inx,_state){
            let dataUrl = null;
            // this.$nextTick(()=>{
            let cQ= $('<canvas  width="560" height="680" style="display:block;"></canvas>').appendTo('body');
            // this.
            let c=cQ[0];
            let ctx=c.getContext("2d");
            ctx.clearRect(0,0,c.width,c.height);  
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0,0,560,680);

            _resValue.cover = _resValue.cover? _resValue.cover: require("../../../assets/head.png")
            let coverImg = $('<img src='+_resValue.cover+' style="display:none;" />').appendTo('body')
            if(coverImg[0]){
                ctx.drawImage(coverImg[0],10,20,70,70);
                coverImg.remove()
            }
            
            ctx.fillStyle="#000000";
            ctx.font="24px Arial";
            if(_resValue.name)
                ctx.fillText(_resValue.name,100,40);
            
            ctx.fillStyle="#000000";
            ctx.font="18px Arial";
            if(_resValue.hospitalName)
            ctx.fillText(_resValue.hospitalName,100,80);
            
            ctx.moveTo (0,120);       //设置起点状态
            ctx.lineTo (560,120);       //设置末端状态
            ctx.lineWidth = 1;          //设置线宽状态
            ctx.strokeStyle = '#e6e6e6' ;  //设置线的颜色状态
            ctx.stroke();
            // let qrCodeImg = $(`<img src="/wxminqrcode?path=${
            // encodeURIComponent('pages/evaNowShare/evaNowShare?type=1&isfrom=1&id='
            // +_resValue.doctorId
            // +'&hospitalid='+_resValue.hospitalId)
            // }&width=560" style="display:none;"/>`).appendTo('body')
            let getUrl = '/ypt/wxminqrcode?path=' + encodeURIComponent('pages/evaNowShare/evaNowShare?type=1&isfrom=1&id='
            +_resValue.doctorId +'&hospitalid='+_resValue.hospitalId)+'&width=560'
            Promise.all([
                new Promise((resolve)=>{
                    const img = new Image();
                    img.src = getUrl;
                    img.onload = ()=>resolve(img);
                })
            ]).then((imgs)=>{
                console.dir(imgs[0])
                let qrCodeImg = $('<img src="'+imgs[0].src+'" style="display:none;"/>').appendTo('body')
                ctx.drawImage(qrCodeImg[0],0,120,560,560);
                let base64Url
                try{
                    base64Url = c.toDataURL("image/jpeg", 1.0)
                    // this.tableDataList[inx].qrcode =  c.toDataURL("image/jpeg", 1.0);
                }catch (e) {
                }
                qrCodeImg.remove()
                cQ.remove()
                debugger  
                let uploadData = base64Url.split(",")[1];
                // uploadData = uploadData.substring(0,uploadData.length-2);
                uploadData = window.atob(uploadData);
                var ia = new Uint8Array(uploadData.length);
                for (var i = 0; i < uploadData.length; i++) {
                    ia[i] = uploadData.charCodeAt(i);
                }
                let thisV = this;
                c.toBlob(function(blob){
                    let formData = new FormData();
                    formData.append('file', blob,"121.jpg")
                    console.log(formData)
                        thisV.$axios.post('/ypt/upload-file?ext=jpg',formData,{headers: {'Content-Type': 'multipart/form-data'
                    }})
                    .then(res =>{
                        if(res.data.codeMsg){
                            thisV.$message(res.data.codeMsg)
                        }
                        if(res.data.code == 0){
                            if(_state)
                                thisV.tableDataList[inx] = _resValue;
                            console.log(thisV.tableDataList[inx] )
                            thisV.tableDataList[inx].qrcode =  res.data.data.url
                            thisV.$axios.post('/ypt/hospital-maintain/update-doctor',thisV.$qs.stringify({
                                doctorId : _resValue.doctorId,
                                wxMappQrcode : res.data.data.url,
                            }))
                            .then(res => {
                                if(res.data.codeMsg){
                                    thisV.$message(res.data.codeMsg)
                                }
                                if(res.data.code == 0){
                                }
                            })
                        }
                    })
                })          
            })
        },
        modifyWxminQrcode(_resValue,inx,offic){
            let dataUrl = null;
            // this.$nextTick(()=>{
            let cQ= $('<canvas  width="560" height="680" style="display:block;"></canvas>').appendTo('body');
            // this.
            let c=cQ[0];
            let ctx=c.getContext("2d");
            ctx.clearRect(0,0,c.width,c.height);  
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0,0,560,680);

            _resValue.cover = _resValue.cover? _resValue.cover: require("../../../assets/head.png")
            let coverImg = $('<img src='+_resValue.cover+' style="display:none;" />').appendTo('body')
            if(coverImg[0]){
                ctx.drawImage(coverImg[0],10,20,70,70);
                coverImg.remove()
            }
            
            ctx.fillStyle="#000000";
            ctx.font="24px Arial";
            if(_resValue.name)
                ctx.fillText(_resValue.name,100,40);
            
            ctx.fillStyle="#000000";
            ctx.font="18px Arial";
            if(_resValue.hospitalName)
            ctx.fillText(_resValue.hospitalName,100,80);

            ctx.moveTo (0,120);       //设置起点状态
            ctx.lineTo (560,120);       //设置末端状态
            ctx.lineWidth = 1;          //设置线宽状态
            ctx.strokeStyle = '#e6e6e6' ;  //设置线的颜色状态
            ctx.stroke();
            // let qrCodeImg = $(`<img src="/wxminqrcode?path=${
            // encodeURIComponent('pages/evaNowShare/evaNowShare?type=1&isfrom=1&id='
            // +_resValue.doctorId
            // +'&hospitalid='+_resValue.hospitalId)
            // }&width=280" style="display:none;"/>`).appendTo('body')
            let getUrl = '/ypt/wxminqrcode?path=' + encodeURIComponent('pages/evaNowShare/evaNowShare?type=1&isfrom=1&id='
            +_resValue.doctorId +'&hospitalid='+_resValue.hospitalId)+'&width=560'
            Promise.all([
                new Promise((resolve)=>{
                    const img = new Image();
                    img.src = getUrl;
                    img.onload = ()=>resolve(img);
                })
            ]).then((imgs)=>{
                console.dir(imgs[0])
                let qrCodeImg = $('<img src="'+imgs[0].src+'" style="display:none;"/>').appendTo('body')
                ctx.drawImage(qrCodeImg[0],0,120,560,560);
                let base64Url
                try{
                    base64Url = c.toDataURL("image/jpeg", 1.0)
                    // this.tableDataList[inx].qrcode =  c.toDataURL("image/jpeg", 1.0);
                }catch (e) {
                }
                qrCodeImg.remove()
                cQ.remove()
                debugger  
                let uploadData = base64Url.split(",")[1];
                // uploadData = uploadData.substring(0,uploadData.length-2);
                uploadData = window.atob(uploadData);
                var ia = new Uint8Array(uploadData.length);
                for (var i = 0; i < uploadData.length; i++) {
                    ia[i] = uploadData.charCodeAt(i);
                }
                let thisV = this;
                c.toBlob(function(blob){
                    let formData = new FormData();
                    formData.append('file', blob,"121.jpg")
                    console.log(formData)
                        thisV.$axios.post('/ypt/upload-file?ext=jpg',formData,{headers: {'Content-Type': 'multipart/form-data'
                    }})
                    .then(res =>{
                        if(res.data.codeMsg){
                            thisV.$message(res.data.codeMsg)
                        }
                        if(res.data.code == 0){
                            // thisV.tableDataList[inx].qrcode =  res.data.data.url
                            thisV.$axios.post('/ypt/hospital-maintain/update-doctor',thisV.$qs.stringify({
                                doctorId : _resValue.doctorId,
                                wxMappQrcode : res.data.data.url,
                                name : thisV.modifyData.name,
                                tag : thisV.modifyData.tag,
                                intro : thisV.modifyData.intro,
                                createTime : thisV.modifyData.createTime,
                                cover : thisV.modifyData.cover,
                                officeId : thisV.modifyData.officeId,
                                officeName : offic.label,
                                remark:thisV.modifyData.remark,
                            }))
                            .then(res => {
                                if(res.data.codeMsg){
                                    thisV.$message(res.data.codeMsg)
                                }
                                if(res.data.code == 0){
                                    thisV.modifyState = false;
                        
                                    thisV.$message("操作成功")
                                    thisV.tableDataList = []
                                    thisV.getDataSum();
                                }
                            })
                        }
                    })
                })          
            })
        },
        getData(_page){
            let createTimeFrom = '';
            let createTimeTo = '';
            if(this.timeSearch){
                createTimeFrom = this.moment(this.timeSearch[0]).valueOf()
                createTimeTo = this.moment(this.timeSearch[1]).valueOf()
            }
            this.$axios.get('/ypt/hospital-maintain/doctors?' + this.$qs.stringify({
                kw : this.kw,
                ps : 10,
                pn : _page,
                createTimeFrom : createTimeFrom,
                createTimeTo : createTimeTo,
                officeId : this.officeId,
            }))
            .then(res => {
                if(res.data.codeMsg){
                    this.$message(res.data.codeMsg)
                }
                if(res.data.code == 0){
                    
                    for(let i in res.data.data.rows){
                        // res.data.data.rows[i].createTime = this.moment(res.data.data.rows[i].createTime).format('YYYY-MM-DD HH-mm-ss')
                        // res.data.data.rows[i].updateTime = this.moment(res.data.data.rows[i].updateTime).format('YYYY-MM-DD HH-mm-ss')
                        // let cQ = $(`<canvas  width="280" height="340" style="display:block;"></canvas>`).appendTo('body');
                        // res.data.data.rows[i].wxMappQrcode = ''
                        if(!res.data.data.rows[i].wxMappQrcode){
                            this.getWxminQrcode(res.data.data.rows[i],i,false)
                        }
                        this.tableDataList.push({
                            qrcode: res.data.data.rows[i].wxMappQrcode,
                            serialNumber:(_page - 1) * 10 + parseInt(i)+1,
                            doctorId: res.data.data.rows[i].doctorId,
                            wxMappQrcode: res.data.data.rows[i].wxMappQrcode,
                            name: res.data.data.rows[i].name,
                            hospitalId: res.data.data.rows[i].hospitalId,
                            hospitalName: res.data.data.rows[i].hospitalName,
                            cover: res.data.data.rows[i].cover,
                            tag: res.data.data.rows[i].tag,
                            intro: res.data.data.rows[i].intro,
                            createTime: res.data.data.rows[i].createTime,
                            nowCreateTime: this.moment(res.data.data.rows[i].createTime).format('YYYY-MM-DD HH:mm:ss'),
                            updateTime: res.data.data.rows[i].updateTime,
                            nowUpdateTime: this.moment(res.data.data.rows[i].updateTime).format('YYYY-MM-DD HH:mm:ss'),
                            frozen: res.data.data.rows[i].frozen,
                            remark: res.data.data.rows[i].remark,
                            orderNo: res.data.data.rows[i].orderNo,
                        })

                        // ctx.drawImage(qrCodeImg[0],0,60,280,280);
                        // qrCodeImg.remove()
                        // try{
                        //     dataUrl =  c.toDataURL("image/jpeg", 1.0)
                        // }catch (e) {

                        // }
                        // console.log(dataUrl)
                        // cQ.remove()                        
                        
                    }
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
            this.$axios.get('/ypt/hospital-maintain/doctors-sum?'+ this.$qs.stringify({
                kw : this.kw,
                createTimeFrom : createTimeFrom,
                createTimeTo : createTimeTo,
                officeId : this.officeId,
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
            this.$axios.get('/ypt/hospital-maintain/doctor-'+_value.doctorId)
            .then(res =>{
                if(res.data.codeMsg){
                    this.$message(res.data.codeMsg)
                }
                if(res.data.code == 0){
                    this.modifyData = {
                        doctorId:res.data.data.doctorId,
                        name: res.data.data.name,
                        cover: res.data.data.cover,
                        video: res.data.data.video,
                        hospitalId: res.data.data.hospitalId,
                        hospitalName: res.data.data.hospitalName,
                        tag: res.data.data.tag,
                        intro: res.data.data.intro,
                        officeId:res.data.data.officeId,
                        officeName:res.data.data.officeName,
                        createTime: res.data.data.createTime,
                        nowCreateTime: this.moment(res.data.data.createTime).format('YYYY-MM-DD HH-mm-ss'),
                        updateTime: res.data.data.updateTime,
                        nowUpdateTime: this.moment(res.data.data.updateTime).format('YYYY-MM-DD HH-mm-ss'),
                        orderNo: res.data.data.orderNo,
                        frozen: res.data.data.frozen,
                        frozenReason: res.data.data.frozenReason,
                        remark: res.data.data.remark,
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
            this.tabelNowPage = 1
            this.getDataSum();
        },
        resertSearchFn(){
            this.kw = '';
            this.officeId = '';
            this.timeSearch = '';
            this.tabelNowPage = 1
            this.getDataSum()
        },
        modifyFn(_value){
            console.log(_value)
            this.query = JSON.stringify(this.$route.query);
            
            // this.modifyData =  JSON.parse(JSON.stringify(_value));
            this.modifyState = true;
            this.userState = false;
            this.getModifyDetails(_value)
            // this.typeOptions=[]
        },
        delFn(_value){
            if(_value){
                this.$axios.post('/ypt/hospital-maintain/update-doctors',this.$qs.stringify({
                    doctorId : _value.doctorId,
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
                createTime : '',
                remark : '',
            }
            this.modifyState = true;
            this.userState = true;
            // this.typeOptions=[]
            this.addSubmitDialogState = true;
        },
        async allDownloadFn(){
            let _this = this;
            _this.allDownloadShowState = true;
            _this.allDownTimeoutHandling = setTimeout(()=>{
                _this.allDownloadShowState = false;
                _this.$nextTick(()=>{
                    _this.$message('下载失败，请重试')
                    return
                })  
            },100000)
            let downloadList = [];
            let addState = true;
            // let _page = Math.ceil(_this.tabelSum/2);
            let _page = 1
            console.log(_page)                
            while(addState){
                console.log(_page)
                await _this.$axios.get('/ypt/hospital-maintain/doctors?' + _this.$qs.stringify({
                    pn : _page,
                    ps : 2,
                }))
                .then(res => {
                    
                    let page = _page
                    if(res.data.codeMsg){
                        _this.$message(res.data.codeMsg)
                    }
                    if(res.data.code == 0){
                        if(res.data.data.rows.length == 0){
                            addState = false
                        }
                        
                        for(let i in res.data.data.rows){
                            downloadList.push(res.data.data.rows[i])
                        }
                    }
                })
                if(_page >10000){
                    addState = false;
                    _this.allDownloadShowState = false;
                    clearTimeout(_this.allDownTimeoutHandling)
                    _this.$nextTick(()=>{
                        _this.$message('下载失败，请重试')
                        return
                    })  
                }
                ++_page;
            }
            debugger
            if(downloadList.length >= _this.tabelSum && downloadList.length>0){
                _this.downZip(downloadList)
            }else{
                _this.allDownloadShowState = false;
                clearTimeout(_this.allDownTimeoutHandling)
                if(downloadList == 0){
                    _this.$nextTick(()=>{
                        _this.$message('暂无可下载的二维码')
                    })
                }else{
                    _this.$nextTick(()=>{
                        _this.$message('下载失败')
                    })
                }
               
            }
        },
        async downZip(_downloadList){
            debugger
            let data = _downloadList;
            let zip = new JSZip()
            let cache = {}
            let promises = []
            let _this = this;
            let _num = 0;
            await data.forEach(item => {
                debugger
                let _item = item;
                if(item.wxMappQrcode){
                    let promise = _this.getFile(item.wxMappQrcode).then(data => { // 下载文件, 并存成ArrayBuffer对象
                    debugger
                    let _data = data
                    let file_type = item.wxMappQrcode.split(".")[1];
                    let file_name = _item.name + '-' + _item.doctorId.substring(_item.doctorId.length-15,_item.doctorId.length) + '.' + file_type
                        zip.file(file_name, data, {
                            binary: true
                        }) 
                        // 逐个添加文件
                        cache[file_name] = data
                    })
                    promises.push(promise)
                }else{
                    _num++
                }
                
            })
            
            
            Promise.all(promises).then(() => {
                zip.generateAsync({
                    type: "blob"
                }).then(content => { 
                    // 生成二进制流
                    _this.allDownloadShowState = false;
                    clearTimeout(_this.allDownTimeoutHandling)
                    debugger
                    // console.log(data.length)
                    _this.$nextTick(()=>{
                        if(_num){
                            _this.$message('已下载'+data.length-num+',请注意查看')
                        }else{
                            _this.$message('下载成功,请注意查看')
                        }
                    })
                    console.log(_this.$store.state.common.hospitalAboutData.name)
                    FileSaver.saveAs(content, _this.$store.state.common.hospitalAboutData.name+ '--' + _this.moment().format('YYYY-MM-DD HH-mm-ss') + ".zip") // 利用file-saver保存文件
                })
            })

        },
        getFile(url){
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'get',
                    url,
                    responseType: 'arraybuffer'
                }).then(data => {
                    resolve(data.data)
                })
            })
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
        qrCodeImagesFn(_value){
            this.qrCodeValue = true
            this.qrCodeSrc = _value
        },
        addImg(_fileLIst){
            var file = _fileLIst.target.files[0]
            console.log(file)
			// 
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
                formData.append('file', file)
                console.log(formData)
				this.$axios.post('/ypt/upload-file',formData,{headers: {'Content-Type': 'multipart/form-data'
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
            let offic = ''
            let inx = ''
            if(this.modifyData.doctorId)
                inx = this.tableDataList.findIndex(res => this.modifyData.doctorId == res.doctorId);
            // console.log(inx)
            if(this.modifyData.officeId)
                offic = this.typeOptions.find(res => this.modifyData.officeId == res.value);
            if(this.userState){
                this.$axios.post('/ypt/hospital-maintain/create-doctor',this.$qs.stringify({
                    name : this.modifyData.name,
                    tag : this.modifyData.tag,
                    intro : this.modifyData.intro,
                    createTime : this.modifyData.createTime,
                    cover : this.modifyData.cover,
                    officeId : this.modifyData.officeId,
                    officeName : offic.label,
                    remark:this.modifyData.remark,
                }))
                .then(res => {
                    if(res.data.codeMsg){
                        this.$message(res.data.codeMsg)
                    }
                    if(res.data.code == 0){
                        this.modifyState = false;
                        this.addSubmitDialogState = false;
                        this.tableDataList = []
                        this.getDataSum();
                        this.$message("操作成功")
                    }
                })
            }else{
                this.modifyWxminQrcode(this.modifyData,inx,offic)
                // console.dir(this.modifyData)
                // this.$axios.post('/ypt/hospital-maintain/update-doctor',this.$qs.stringify({
                //     doctorId : this.modifyData.doctorId,
                //     name : this.modifyData.name,
                //     tag : this.modifyData.tag,
                //     intro : this.modifyData.intro,
                //     createTime : this.modifyData.createTime,
                //     cover : this.modifyData.cover,
                //     officeId : this.modifyData.officeId,
                //     officeName : offic.label,
                //     remark:this.modifyData.remark,
                // }))
                // .then(res => {
                //     if(res.data.codeMsg){
                //         this.$message(res.data.codeMsg)
                //     }
                //     if(res.data.code == 0){
                //         this.modifyState = false;
                        
                        
                //         this.$message("操作成功")
                //     }
                // })
            }
        }
    }
}
</script>
<style scoped>
.doctorManagement {
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
.doctorManagement_topTitle{
    height: auto;
    width: 100%;
    position: relative;
}
.doctorManagement_top {
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
}
.doctorManagement_top i {
    width: 20px;
    height: 20px;
    padding: 22px 24px;
    box-sizing: border-box;
    /* cursor: pointer; */
}

.doctorManagement_top span {
    float: right;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-right: 32px;
}
.doctorManagement_title{
    width: 100%;
    height: auto;
    background: rgba(255, 255, 255, 1);
    margin-top: 4px;
    box-sizing: border-box;
    padding: 16px 32px 19px;
    box-sizing: border-box
}
.doctorManagement_title>span{
    color: #000000;
    cursor: pointer;
}
.doctorManagement_screening{
    position: absolute;
    bottom: 19px;
    left: 32px;
}
.doctorManagement_screening_options{
    display: inline-block;
    margin-right: 20px;
}
.doctorManagement_screening_options >>>.el-input{
    width: 180px
}
.doctorManagement_table{
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
.doctorManagement_table{
    width: 100%;
    height: 658px;
}
.doctorManagement_table_box{
    box-sizing: border-box;
    padding: 32px;
    background-color: #ffffff
}
>>>.has-gutter{
    background-color: #FAFAFA
}
.doctorManagement_table_page{
    margin: 40px 0px 61px;
    float: right;

}
.tabelModifySpan{
    cursor: pointer;
    color: #1890FF
}
>>>.el-table__row td:nth-child(2){
    padding: 0px
}
>>>.el-table__row td:nth-child(2) img{
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
    height: 673px;
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
  height: 133px;
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
  height: 133px;
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
    height: 417px;
    width: 343px;
    /* min-width: 410px; */
}
>>>.el-dialog__headerbtn{
    display: none;
}
.enlargeImagesBox >>>.el-dialog__header{
    padding: 0px;
}
.enlargeImagesBox >>>.el-dialog__body{
    height: 417px;
    width: 343px;
    padding: 0px
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
.qrCodeImagesClass{
    position: relative;
    height: 417px;
    width: 343px;
}
.qrCodeImagesClass>img{
    height: 417px;
    width: 343px;
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
.spinner-box {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}

/* SPINNING CIRCLE */

.circle-border {
    width: 50px;
    height: 50px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgb(102,177,255);
    background: linear-gradient(0deg, rgba(102,177,255,0.1) 33%, rgba(102,177,255,1) 100%);
    animation: spin .8s linear 0s infinite;
}

.circle-core {
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 50%;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
}
</style>