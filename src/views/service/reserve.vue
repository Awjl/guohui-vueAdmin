<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入姓名" v-model="data.name">
      </el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入手机号" v-model="data.mobile">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" placeholder="状态" v-model="data.isConnected">
        <el-option label="已联系" :value="2">
          已联系
        </el-option>
        <el-option label="未联系" :value="1">
          未联系
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="createDate" label="创建时间"  align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createDate).getFullYear()+ '-' + (((new Date(scope.row.createDate).getMonth() + 1) < 10) ? '0'+ (new Date(scope.row.createDate).getMonth() + 1) : (new Date(scope.row.createDate).getMonth() + 1)) +'-' + ((new Date(scope.row.createDate).getDate() < 10) ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate())}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"  align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"  align="center">
        </el-table-column>
        <el-table-column prop="topic" label="会议主题"  align="center">
        </el-table-column>
        <el-table-column prop="num" label="人数"  align="center">
        </el-table-column>
        <el-table-column prop="bookDate" label="预定时间"  align="center">
        </el-table-column>
        <el-table-column prop="note" label="备注"  align="center">
        </el-table-column>
        <el-table-column prop="feedback" label="反馈"  align="center">
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="small"  @click="handleClick(scope.row.id)">添加反馈</el-button>
            <el-button @click="contact(scope.row.id)" type="primary" size="small" v-if="scope.row.isConnected === 1">未联系</el-button>
            <el-button type="success" size="small" v-else>已联系</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="填写反馈">
      <el-form ref="dataForm" label-position="right" label-width="15%" style='width:90%; '>
        <el-form-item label="反馈">
           <el-input placeholder="请输入反馈内容" v-model="item.feedBack"></el-input>
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
import { getAllBook, isConnected, addFeedback } from '@/api/user'
import { ERR_OK } from '@/api/config'
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
      dataArr: [],
      data: {
        endTime: null,
        mobile: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        name: null,
        isConnected: null
      },
      item: {
        id: '',
        feedBack: ''
      }
    }
  },
  created() {
    this._getAllBook()
  },
  methods: {
    _getAllBook() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllBook(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllBook()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllBook()
    },
    contact(id) {
      console.log(id)
      isConnected(id).then((res) => {
        if (res.code === ERR_OK) {
          this.$message({
            message: '联系成功',
            type: 'success'
          })
          this._getAllBook()
        }
      })
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
      console.log(this.data)
      this._getAllBook()
    },
    handleClick(id) {
      this.item.id = id
      this.item.feedBack = ''
      this.dialogFormVisible = true
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      addFeedback(this.item).then((res) => {
        if (res.code === ERR_OK) {
          this.dialogFormVisible = false
          this.$message({
            message: '已反馈',
            type: 'success'
          })
          this._getAllBook()
        }
      })
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
