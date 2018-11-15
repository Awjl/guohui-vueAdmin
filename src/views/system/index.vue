<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入管理员名称" v-model="data.adminName">
      </el-input>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button @click="del" type="danger">删除</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="250" align="center">
        </el-table-column>
        <el-table-column prop="adminName" label="管理员" width="250" align="center">
        </el-table-column>
        <el-table-column prop="createDate" label="操作时间" width="250" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createDate).getFullYear()+ '-' + (((new Date(scope.row.createDate).getMonth() + 1)
              < 10) ? '0' + (new Date(scope.row.createDate).getMonth() + 1) : (new Date(scope.row.createDate).getMonth() + 1)) + '-' + ((new Date(scope.row.createDate).getDate() < 10) ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate())}}</span> </template> </el-table-column> <el-table-column prop="msg" label="操作内容" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="删除系统日至">
      <el-form ref="dataForm" label-position="right" label-width="20%" style='width: 80%px;'>
        <el-form-item label="删除时间点">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="trueover">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gerAllLog, deleteLog } from '@/api/user'
import { ERR_OK } from '@/api/config'
// import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      total: 1,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      data: {
        adminName: null,
        startTime: null,
        endTime: null,
        pageNum: null,
        pageSize: null
      },
      dataArr: [],
      value1: ''
    }
  },
  created() {
    this._gerAllLog()
  },
  methods: {
    _gerAllLog() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      gerAllLog(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('系统日至=====================')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    del() {
      this.dialogFormVisible = true
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      console.log(this.value1)
      this.$confirm(`是否删${this.value1}之前所有的系统日至?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLog(this.value1).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this._gerAllLog()
          }
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._gerAllLog()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._gerAllLog()
    },
    suchbox() {
      this.listQuery.limit = 10
      this.listQuery.page = 1
      if (this.dataArr !== [] && this.dataArr !== null) {
        this.data.startTime = this.dataArr[0]
        this.data.endTime = this.dataArr[1]
      } else {
        this.data.startTime = null
        this.data.endTime = null
      }
      this._gerAllLog()
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
