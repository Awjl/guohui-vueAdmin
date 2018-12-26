<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入商品名称" v-model="data.name">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入订单号" v-model="data.code">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入手机号" v-model="data.mobile">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" placeholder="订单状态" v-model="data.state">
        <el-option label="已付款" :value="2">
          已付款
        </el-option>
        <el-option label="未付款" :value="1">
          未付款
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button type="primary" icon="document" @click="downloadexcel" :disabled="!(orderData.indexOf('1') !== -1)" :title="(orderData.indexOf('1') !== -1) ? '' : '暂无权限'">导出 excel</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="code" label="订单号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="num" label="数量" align="center">
        </el-table-column>
         <el-table-column label="购买日期" align="center">
          <template slot-scope="scope">
           {{new Date(scope.row.createDate).getFullYear()+ '-' + (((new Date(scope.row.createDate).getMonth() + 1) < 10) ? '0'+ (new Date(scope.row.createDate).getMonth() + 1) : (new Date(scope.row.createDate).getMonth() + 1)) +'-' + ((new Date(scope.row.createDate).getDate() < 10) ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate())}}
          </template>
        </el-table-column>
        <el-table-column label="总价(单位：元)" align="center">
          <template slot-scope="scope">
            {{((Number(scope.row.total)+Number(scope.row.price))/ 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="total" label="实付金额(单位：元)" align="center">
          <template slot-scope="scope">
            {{(scope.row.total/ 100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="优惠金额(单位：元)" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.price">无优惠</span>
            <span v-else>{{(scope.row.price/ 100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1">未付款</span>
            <span v-else-if="scope.row.state === 5">已取消</span>
            <span v-else>已付款</span>
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
import { getAllGoodsOrders, exportGoodsOrderExcel } from '@/api/shoping'
import { deleteExcel } from '@/api/user'
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
        code: null,
        endTime: null,
        goodsId: null,
        mobile: null,
        name: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        state: null
      },
      xslsUrl: ''
    }
  },
  created() {
    this._getAllGoodsOrders()
  },
  computed: {
    ...mapGetters([
      'orderData'
    ])
  },
  methods: {
    _getAllGoodsOrders() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllGoodsOrders(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取商品订单============')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _exportUserExcel() {
      exportGoodsOrderExcel(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          console.log('成功')
          this.xslsUrl = res.data
          // console.log(`http://www.shanghaiconventioncenter.com:8081${res.data}`)
          window.location.href = `http://www.shiccs.net${res.data}`
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
      this._getAllGoodsOrders()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllGoodsOrders()
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
      this._getAllGoodsOrders()
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
