<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="输入订单号搜索" v-model="data.code">
      </el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="输入手机号" v-model="data.mobile">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.state" placeholder="是否发货">
        <el-option  label="已发货" :value="4">
          已发货
        </el-option>
        <el-option  label="未发货" :value="3">
          未发货
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search"  @click="suchbox">搜索</el-button>
      <el-button type="primary" icon="document" @click="downloadexcel" :disabled="!(orderData.indexOf('2') !== -1)" :title="(orderData.indexOf('2') !== -1) ? '' : '暂无权限'">导出 excel</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="code" label="订单号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="kind" label="规格" align="center">
        </el-table-column>
        <el-table-column prop="createDate" label="购买日期" align="center">
          <template slot-scope="scope">
            <div>{{new Date(scope.row.createDate).getFullYear()+ '-' + (((new Date(scope.row.createDate).getMonth() + 1) < 10) ? '0'+ (new Date(scope.row.createDate).getMonth() + 1) : (new Date(scope.row.createDate).getMonth() + 1)) +'-' + (new Date(scope.row.createDate).getDate() < 10 ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate()) }}</div>
            <div>{{(new Date(scope.row.createDate).getHours() < 10 ? '0' + new Date(scope.row.createDate).getHours() : new Date(scope.row.createDate).getHours())+':'+(new Date(scope.row.createDate).getMinutes() < 10 ? '0' + new Date(scope.row.createDate).getMinutes() : new Date(scope.row.createDate).getMinutes())}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="addressee" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="total" label="消费积分" align="center">
        </el-table-column>
        <el-table-column prop="courierNumber" label="快递单号" align="center">
           <template slot-scope="scope">
            <span v-if="scope.row.courierNumber === null">无</span>
            <span v-else>{{scope.row.courierNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="地址" align="center">
          <template slot-scope="scope">
            {{scope.row.city}}{{scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="primary" size="small" v-if='scope.row.state === 3' :disabled="!(orderData.indexOf('3') !== -1)" :title="(orderData.indexOf('3') !== -1) ? '' : '暂无权限'">发货</el-button>
            <el-button @click="handleClick(scope.row.id)" type="success" size="small" v-else :disabled="!(orderData.indexOf('3') !== -1)" :title="(orderData.indexOf('3') !== -1) ? '' : '暂无权限'">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="填写快递单号">
      <el-form ref="dataForm" label-position="left" label-width="100px" style='width: 700px; margin-left:50px;'>
        <el-form-item label="快递单号">
           <el-input placeholder="请输入快递单号" v-model="item.orderid"></el-input>
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
import { getAllPointGoodsOrders, insertCourierNumber, exportPointGoodsOrderExcel } from '@/api/shoping'
import { deleteExcel } from '@/api/user'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

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
        code: null,
        courierNumber: null,
        endTime: null,
        mobile: null,
        name: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        state: null
      },
      item: {
        id: '',
        orderid: ''
      },
      xslsUrl: ''
    }
  },
  created() {
    this._getAllPointGoodsOrders()
  },
  computed: {
    ...mapGetters([
      'orderData'
    ])
  },
  methods: {
    _getAllPointGoodsOrders() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllPointGoodsOrders(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取商品订单============')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _exportUserExcel() {
      exportPointGoodsOrderExcel(this.data).then((res) => {
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
      this._getAllPointGoodsOrders()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllPointGoodsOrders()
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
      this._getAllPointGoodsOrders()
    },
    handleClick(id) {
      this.item.id = id
      this.item.orderid = ''
      this.dialogFormVisible = true
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      insertCourierNumber(this.item.orderid, this.item.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log('填写成功')
          this.dialogFormVisible = false
          this.$message({
            message: '已发货',
            type: 'success'
          })
          this._getAllPointGoodsOrders()
        }
      })
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
