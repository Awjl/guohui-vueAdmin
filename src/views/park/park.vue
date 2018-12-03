<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="输入订车牌号" v-model="data.vplNumber">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="输入订单编号" v-model="data.billId">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="输入手机号" v-model="data.mobile">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.state" placeholder="订单状态">
        <el-option label="已支付" :value="1">
          已支付
        </el-option>
        <el-option label="未支付" :value="2">
          未支付
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button type="primary" icon="document" @click="downloadexcel" :disabled="!(parkData.indexOf('1') !== -1)" :title="(parkData.indexOf('1') !== -1) ? '' : '暂无权限'">导出 excel</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="billId" label="订单编号" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="number" label="车牌号" align="center">
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createDate).getFullYear()+ '-' + (((new Date(scope.row.createDate).getMonth() + 1) < 10) ? '0' + (new Date(scope.row.createDate).getMonth() + 1) : (new Date(scope.row.createDate).getMonth() + 1)) +'-' + ((new Date(scope.row.createDate).getDate() < 10) ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate())}}</span> </template> </el-table-column> <el-table-column prop="parkName" label="停车场名称" align="center">
        </el-table-column>
        <el-table-column prop="duration" label="停车时长" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.duration | timefliters}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parkCode" label="停车场编号" align="center">
        </el-table-column>
        <el-table-column prop="due" label="原停车费用" align="center">
          <template slot-scope="scope">
            {{scope.row.due/100}}
          </template>
        </el-table-column>
        <el-table-column prop="unpaid" label="当前停车费用" align="center">
          <template slot-scope="scope">
            {{scope.row.due/100}}
          </template>
        </el-table-column>
        <el-table-column label="是否支付" align="center">
          <template slot-scope="scope">
            <span v-if='scope.row.billState === 1'>已支付</span>
            <span v-if='scope.row.billState === 2'>未支付</span>
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
import { deleteExcel, getParkInfo, exportParkInfoExcel } from '@/api/user'
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
      tableData: [],
      dataArr: [],
      data: {
        vplNumber: null,
        billId: null,
        mobile: null,
        state: null,
        startTime: null,
        endTime: null,
        pageNum: null,
        pageSize: null
      },
      xslsUrl: ''
    }
  },
  created() {
    this._getParkInfo()
  },
  computed: {
    ...mapGetters([
      'parkData'
    ])
  },
  methods: {
    _getParkInfo() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getParkInfo(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取停车============')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _exportUserExcel() {
      exportParkInfoExcel(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          console.log('成功')
          this.xslsUrl = res.data
          window.location.href = `http://www.shiccs.net${res.data}`
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
      this._getParkInfo()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getParkInfo()
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
      this._getParkInfo()
    },
    handleClick(id) {
      this.item.id = id
      this.dialogFormVisible = true
    }
  },
  destroyed() {
    this._deleteExcel()
  },
  filters: {
    timefliters: function(value) {
      let secondTime = parseInt(value)
      let minuteTime = 0
      let hourTime = 0
      if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60)
        secondTime = parseInt(secondTime % 60)
        if (minuteTime > 60) {
          hourTime = parseInt(minuteTime / 60)
          minuteTime = parseInt(minuteTime % 60)
        }
      }
      let result = '' + parseInt(secondTime) + '秒'

      if (minuteTime > 0) {
        result = '' + parseInt(minuteTime) + '分' + result
      }
      if (hourTime > 0) {
        result = '' + parseInt(hourTime) + '小时' + result
      }
      return result
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
