<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入商品名称" v-model="data.name">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入订单号" v-model="data.orderCode">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入手机号" v-model="data.mobile">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" placeholder="订单状态" v-model="data.state">
        <el-option label="未使用" :value="1">
          未使用
        </el-option>
        <el-option label="已使用" :value="2">
          已使用
        </el-option>
        <el-option label="已转赠" :value="3">
          已转赠
        </el-option>
        <el-option label="已过期" :value="5">
          已过期
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <div class="he20"></div>
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入代金券ID" v-model="destroyCode">
      </el-input>
       <el-button class="filter-item" type="primary" icon="el-icon-search" @click="destroy" >核销代金券</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="orderCode" label="订单号" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.orderCode">{{scope.row.orderCode}}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column label="原价(单位：元)" align="center">
          <template slot-scope="scope">
            {{((Number(scope.row.oldPrice))/ 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="total" label="实付金额(单位：元)" align="center">
          <template slot-scope="scope">
            {{(scope.row.newPrice/ 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="deliverer" label="赠送人" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.deliverer">{{scope.row.deliverer}}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="consignee" label="被赠人" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.consignee">{{scope.row.consignee}}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1">未使用</span>
            <span v-if="scope.row.state === 2">已使用</span>
            <span v-if="scope.row.state === 3">已转赠</span>
            <span v-if="scope.row.state === 4">已收到</span>
            <span v-if="scope.row.state === 5">已过期</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAllVouchers } from '@/api/shoping'
// import { deleteExcel } from '@/api/user'
import { useCoupon } from '@/api/coupon'
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
      dataArr: [],
      data: {
        consignee: null,
        deliverer: null,
        endTime: null,
        mobile: null,
        name: null,
        orderCode: null,
        pageNum: 0,
        pageSize: 0,
        startTime: null,
        state: null
      },
      xslsUrl: '',
      destroyCode: ''
    }
  },
  created() {
    this._getAllVouchers()
  },
  methods: {
    _getAllVouchers() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      // con
      getAllVouchers(this.data).then((res) => {
        if (res.code === ERR_OK) {
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    destroy() {
      if (!this.destroyCode) {
        this.$message({
          message: '券码号不能为空',
          type: 'warning'
        })
        return
      }
      this.$confirm('是否核销该优惠券?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        useCoupon(this.destroyCode).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            if (res.data.code === 500501) {
              this.$message({
                message: '券码不存在',
                type: 'warning'
              })
            } else if (res.data.code === 500502) {
              this.$message({
                message: '券码已核销',
                type: 'warning'
              })
            } else if (res.data.code === 500503) {
              this.$message({
                message: '券码已过期',
                type: 'warning'
              })
            } else {
              this.$message({
                message: '核销成功',
                type: 'success'
              })
              this.destroyCode = ''
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消核销'
        })
      })
    },
    // _exportUserExcel() {
    //   exportGoodsOrderExcel(this.data).then((res) => {
    //     if (res.code === ERR_OK) {
    //       console.log(res.data)
    //       console.log('成功')
    //       this.xslsUrl = res.data
    //       // console.log(`http://www.shanghaiconventioncenter.com:8081${res.data}`)
    //       window.location.href = `http://www.shiccs.net${res.data}`
    //       // window.open(`http://47.96.165.248:8080/${res.data}`)
    //     }
    //   })
    // },
    // _deleteExcel() {
    //   deleteExcel(this.xslsUrl).then((res) => {
    //     console.log('删除')
    //   })
    // },
    // downloadexcel() {
    //   if (!this.xslsUrl) {
    //     this._exportUserExcel()
    //   } else {
    //     this._deleteExcel()
    //     this._exportUserExcel()
    //   }
    // },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllVouchers()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllVouchers()
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
      this._getAllVouchers()
    }
  }
  // destroyed: function() {
  //   this._deleteExcel()
  // }
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
