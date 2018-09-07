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
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="userId" label="id" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="level" label="级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.level === 1">V1会员</span>
            <span v-else>V2会员</span>
          </template>
        </el-table-column>
        <el-table-column prop="points" label="积分" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="warning" size="small">冻结</el-button>
            <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
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
import { getAllUser } from '@/api/user'
import { ERR_OK } from '@/api/config'
export default {
  data() {
    return {
      loading: false,
      total: 1,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      dataArr: [],
      data: {
        endTime: '',
        level: '',
        mobile: '',
        pageNum: '',
        pageSize: '',
        sex: '',
        startTime: '',
        userId: '',
        nickname: ''
      },
      tableData: []
    }
  },
  created() {
    this._getAllUser()
  },
  methods: {
    _getAllUser() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllUser(this.data).then((res) => {
        if (res.code === ERR_OK) {
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
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
      this.data.startTime = this.dataArr[0]
      this.data.endTime = this.dataArr[1]
      this._getAllUser()
    }
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
