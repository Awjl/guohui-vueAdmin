<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入会员名称" v-model="data.nickname">
      </el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入会员手机号" v-model="data.mobile">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.level" placeholder="请选择会员等级">
        <el-option label="V1会员" :value="1">
          V1会员
        </el-option>
        <el-option label="V2会员" :value="2">
          V2会员
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
      <el-button type="primary" icon="document" @click="downloadexcel"  :disabled="!(userData.indexOf('1') !== -1)" :title="(userData.indexOf('1') !== -1) ? '' : '暂无权限'">导出 excel</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="userId" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="姓名" align="center">
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 1">男</span>
            <span v-if="scope.row.sex === 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center">
        </el-table-column>
        <el-table-column label="级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.level === 1">V1会员</span>
            <span v-else>V2会员</span>
          </template>
        </el-table-column>
        <el-table-column prop="points" label="积分" align="center">
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createDate).getFullYear()+ '-' + (((new Date(scope.row.createDate).getMonth() + 1)
              < 10) ? '0' + (new Date(scope.row.createDate).getMonth() + 1) : (new Date(scope.row.createDate).getMonth() + 1)) + '-' + ((new Date(scope.row.createDate).getDate() < 10) ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate())}}</span> </template> </el-table-column> <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAllUser, exportUserExcel, deleteExcel } from '@/api/user'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      total: 1,
      listQuery: {
        page: 1,
        limit: 10
      },
      dataArr: [],
      data: {
        endTime: null,
        level: null,
        mobile: null,
        pageNum: null,
        pageSize: null,
        sex: null,
        startTime: null,
        userId: null,
        nickname: null
      },
      tableData: [],
      xslsUrl: ''
    }
  },
  created() {
    this._getAllUser()
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
    _getAllUser() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllUser(this.data).then((res) => {
        if (res.code === ERR_OK) {
          this.total = res.data.total
          this.tableData = res.data.list
          console.log(res.data)
        }
      })
    },
    _exportUserExcel() {
      exportUserExcel(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          console.log('成功')
          this.xslsUrl = res.data
          // console.log(`http://www.shanghaiconventioncenter.com:8081${res.data}`)
          window.location.href = `http://47.96.165.248:8080${res.data}`
          // window.open(`http://47.96.165.248:8080/${res.data}`)
        }
      })
    },
    _deleteExcel() {
      deleteExcel(this.xslsUrl).then((res) => {
        console.log('删除')
      })
    },
    downloadexcel() {
      if (!this.xslsUrl) {
        this._exportUserExcel()
      } else {
        this._deleteExcel()
        this._exportUserExcel()
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllUser()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllUser()
    },
    suchbox() {
      this.listQuery.limit = 10
      this.listQuery.page = 1
      if (this.dataArr !== [] && this.dataArr !== null) {
        console.log(this.dataArr)
        this.data.startTime = this.dataArr[0]
        this.data.endTime = this.dataArr[1]
      } else {
        this.data.startTime = null
        this.data.endTime = null
      }
      this._getAllUser()
    }
  },
  destroyed: function() {
    this._deleteExcel()
  }
}
</script>
<style>
.he20 {
  height: 20px;
}
.filter-container {
  width: 100%;
  min-height: 700px;
}
</style>
