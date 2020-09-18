<template>
  <div class="doctorEvaluation scrollStyle">
      <div class="doctorEvaluation_topTitle">
          <div class="doctorEvaluation_top">
              <i class="el-icon-s-fold"></i>
              <span>创建时间: {{$store.state.common.hospitalAboutData.createTime || ''}}</span>
          </div>
          <div class="doctorEvaluation_title">
              <router-link :to="{path: '/adminView/doctorEvaluation',query:{time:new Date().getTime().toString()}}">
                  <span>医生评价</span>
              </router-link>
              
          </div>
          <div class="doctorEvaluation_screening">
              <div class="doctorEvaluation_screening_options">
                  <span>关键字：</span>
                  <el-input v-model="kw" placeholder="请输入"></el-input>
              </div>
              <!-- <div class="doctorEvaluation_screening_options">
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
              <div class="doctorEvaluation_screening_options">
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
      <div class="doctorEvaluation_table">
          <div class="doctorEvaluation_table_box">
              <el-table ref="singleTable" :data="tableDataList" highlight-current-row  
                  style="width: 100%" 
                  >
                  <el-table-column label="序号" prop="serialNumber" width="80"></el-table-column>
                  <el-table-column label="评价结果">
                        <template slot-scope="scope">
                            <div class="line-1 starClass" >
                                <img src="../../../assets/star.png" alt="" v-for="(item,inx) in scope.row.star" :key="inx">
                            </div>
                        </template>
                  </el-table-column>
                  <el-table-column label="医生">
                      <template slot-scope="scope">
                            <div class="line-1">{{scope.row.doctorName}}</div>
                        </template>
                  </el-table-column>
                  <el-table-column label="用户">
                      <template slot-scope="scope">
                            <div class="line-1">{{scope.row.userName}}</div>
                        </template>
                  </el-table-column>
                  <el-table-column label="医院">
                      <template slot-scope="scope">
                            <div class="line-1">{{scope.row.hospitalName}}</div>
                        </template>
                  </el-table-column>
                  <el-table-column label="评价内容">
                      <template slot-scope="scope">
                            <div class="line-2">{{scope.row.content}}</div>
                        </template>
                  </el-table-column>
                  <el-table-column label="创建时间">
                      <template slot-scope="scope">
                            <div class="line-1">{{scope.row.nowCreateTime}}</div>
                        </template>
                  </el-table-column>
              </el-table>
          </div>
          <div class="doctorEvaluation_table_page">
              <el-pagination
                  :hide-on-single-page = "hideOnSinglePageValue"
                  background
                  :current-page.sync = "tabelNowPage"
                  layout="prev, pager, next,jumper"
                  @current-change = "pageFn"
                  :total="tabelSum">
              </el-pagination>
          </div>
        </div>
    </div>          
  </div>
</template>
<script>
export default {
    name : 'doctorEvaluation',
    data(){
        return {
            query:'',
            typeSelectValue:null,
            hideOnSinglePageValue:true,
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
            kw:''
        }
    },
    activated(){
        if(this.query != JSON.stringify(this.$route.query)){
            this.initData();
            this.$common.checkLogin(this.$route.query.hospitalId)
            this.query = JSON.stringify(this.$route.query);
            this.getDataSum();
        }
    },
    methods:{
        initData(){
            Object.assign(this.$data, this.$options.data());
        },
        getData(_page){
            this.$axios.get('/hospital-maintain/doctor-comments?' + this.$qs.stringify({
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
                            doctorCommentId: res.data.data.rows[i].doctorCommentId,
                            userId: res.data.data.rows[i].userId,
                            userName: res.data.data.rows[i].userName,
                            doctorId: res.data.data.rows[i].doctorId,
                            doctorName: res.data.data.rows[i].doctorName,
                            hospitalId: res.data.data.rows[i].hospitalId,
                            hospitalName: res.data.data.rows[i].hospitalName,
                            content: res.data.data.rows[i].content,
                            image: res.data.data.rows[i].image,
                            video: res.data.data.rows[i].video,
                            star: res.data.data.rows[i].star,
                            createTime: res.data.data.rows[i].createTime,
                            nowCreateTime: this.moment(res.data.data.rows[i].createTime).format('YYYY-MM-DD HH-mm-ss'),
                            updateTime: res.data.data.rows[i].updateTime,
                            nowUpdateTime: this.moment(res.data.data.rows[i].updateTime).format('YYYY-MM-DD HH-mm-ss'),
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
            this.$axios.get('/hospital-maintain/doctor-comments-sum?'+ this.$qs.stringify({
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
                    this.tableDataList = []
                    if(this.tabelSum > 0){
                        this.pageFn(1)
                    }
                }
            })
        },
        pageFn(_value){
            // console.log(_value);
            
            this.getData(_value)
        },
        searchFn(){
            this.tabelNowPage = 1
            this.getDataSum();
        },
        delFn(_value){
            if(_value){
                this.$axios.post('/hospital-maintain/update-users',this.$qs.stringify({
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
    }
}
</script>
<style scoped>
.doctorEvaluation {
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
.doctorEvaluation_topTitle{
    height: auto;
    width: 100%;
    position: relative;
}
.doctorEvaluation_top {
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
}
.doctorEvaluation_top i {
    width: 20px;
    height: 20px;
    padding: 22px 24px;
    box-sizing: border-box;
    cursor: pointer;
}

.doctorEvaluation_top span {
    float: right;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-right: 32px;
}
.doctorEvaluation_title{
    width: 100%;
    height: 150px;
    background: rgba(255, 255, 255, 1);
    margin-top: 4px;
    box-sizing: border-box;
    padding: 16px 32px 19px;
    box-sizing: border-box
}
.doctorEvaluation_title>span{
    color: #000000;
    cursor: pointer;
}
.doctorEvaluation_screening{
    position: absolute;
    bottom: 19px;
    left: 32px;
}
.doctorEvaluation_screening_options{
    display: inline-block;
    margin-right: 30px;
}
.doctorEvaluation_screening_options >>>.el-input{
    width: 180px
}
.doctorEvaluation_table{
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
.doctorEvaluation_table{
    width: 100%;
    height: 658px;
}
.doctorEvaluation_table_box{
    box-sizing: border-box;
    padding: 32px;
    background-color: #ffffff
}
>>>.has-gutter{
    background-color: #FAFAFA
}
.doctorEvaluation_table_page{
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
.starClass img{
    width: 20px!important;
    height: 20px!important;
}
</style>