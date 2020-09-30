<template>
  <div id='user_index'>
    <topLine></topLine>
    <div class="searchBox">
      <el-breadcrumb class="index_title_bread" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">医院信息</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#/view/user">用户管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="searchQue">
        <span>关键字:</span>
        <el-input class="keyword" v-model="input" placeholder="请输入内容"></el-input>
        <span class="typeName">类型:</span>
        <el-select v-model="type" placeholder="请选择">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span class="typeName">医生:</span>
        <el-select v-model="doctor" placeholder="请选择">
          <el-option v-for="item in doctors" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span class="typeName">医护:</span>
        <el-select v-model="nurse" placeholder="请选择">
          <el-option v-for="item in nurses" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <!-- 主体 -->
    <div class="user_mainBox">
      <div class="user_mainBox_list">
        <template>
          <el-table :data="tableData" border :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%">

            <el-table-column prop="name" label="名称" fixed>
            </el-table-column>
            <el-table-column prop="avator" label="头像" >
              <template slot-scope="scope">
                <img src="../assets/Bitmap.svg" alt="">
              </template>
            </el-table-column>

            <el-table-column prop="type" label="类型">
            </el-table-column>

            <el-table-column prop="hospital" label="医院">
            </el-table-column>
            <el-table-column prop="reamerk" label="备注">
            </el-table-column>
            <el-table-column  prop="date" label="创建时间" sortable width="150">
            </el-table-column>

            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                <el-button type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40]"
           :page-size="10"
          layout="prev, pager, next,jumper,sizes"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import topLine from './topLine.vue'
  export default {
    data() {
      return {
        types: [{
          value: '1',
          label: '普通'
        }, {
          value: '2',
          label: '医生'
        }, {
          value: '3',
          label: '医护'
        }],
        doctors: [{
          value: '1',
          label: '王某'
        }, {
          value: '2',
          label: '张某'
        }, {
          value: '3',
          label: '李某某'
        }],
        nurses: [{
          value: '1',
          label: '王某某'
        }, {
          value: '2',
          label: '田某某'
        }, {
          value: '3',
          label: '顾某'
        }],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          type: '上海',
          hospital: '普陀区',
          reamerk: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          type: '上海',
          hospital: '普陀区',
          reamerk: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
         date: '2016-05-02',
         name: '王小虎',
         type: '上海',
         hospital: '普陀区',
         reamerk: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
        }, {
        date: '2016-05-02',
        name: '王小虎',
        type: '上海',
        hospital: '普陀区',
        reamerk: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
        }],
        type: '',
        doctor: '',
        nurse: '',
      }
    },
    components: {
      topLine,
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      handleClick(row) {
        console.log(row);
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
  #user_index {
    background: rgba(240, 242, 245, 1);
    width: calc(100% - 200px);
    height: 100vh;
    float: left;
    /* min-width: 1200px; */
  }

  .searchBox {
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

  .searchQue {
    margin-top: 40px;
    min-width: 1150px;
  }

  .searchQue .keyword {
    width: 180px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  >>>.searchQue .keyword input {
    width: 180px;
    height: 32px;
    border: 0;
  }

  .searchQue .typeName {
    margin-left: 30px;
  }

  >>>.searchQue .el-select input {
    width: 180px;
    height: 32px;
    line-height: 32px;
  }

  >>>.searchQue .el-select .el-input__icon {
    line-height: 32px;
  }

  >>>.searchQue .el-button {
    width: 65px;
    height: 32px;
    border-radius: 4px;
    line-height: 32px;
    padding: 0;
    margin-left: 30px;
  }

  .user_mainBox {
    width: 100%;
    height: calc(100% - 275px);
    padding: 24px;
    /* background: #FFFFFF; */
    box-sizing: border-box;
  }

  .user_mainBox .user_mainBox_list {
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
</style>
