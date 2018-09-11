<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加管理员</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="管理员ID"  align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="管理员级别"  align="center">
        </el-table-column>
        <el-table-column prop="username" label="姓名"  align="center">
        </el-table-column>
        <el-table-column prop="date" label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.date).getFullYear()+ '-' + (((new Date(scope.row.date).getMonth() + 1) < 10) ? '0'+ (new Date(scope.row.date).getMonth() + 1) : (new Date(scope.row.date).getMonth() + 1)) +'-' + ((new Date(scope.row.date).getDate() < 10) ? '0' + new Date(scope.row.date).getDate() : new Date(scope.row.date).getDate())}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lve" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
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
import { getAdmins } from '@/api/user'
import { ERR_OK } from '@/api/config'

export default {
  data() {
    return {
      loading: false,
      total: 1,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      data: {
        endTime: null,
        name: null,
        pageNum: null,
        pageSize: null,
        roleName: null,
        startTime: null
      }
    }
  },
  created() {
    this._getAdmins()
  },
  methods: {
    _getAdmins() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAdmins(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取全部管理员============================')
          console.log(res.data)
          this.tableData = res.data.list
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
