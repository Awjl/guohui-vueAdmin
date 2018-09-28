<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入名称" v-model="data.name">
      </el-input>
      <el-select clearable style="width: 100px" class="filter-item" v-model="data.type" placeholder="类型">
        <el-option label="代金券" :value="1">
          代金券
        </el-option>
        <el-option label="停车券" :value="2">
          停车券
        </el-option>
      </el-select>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.isNewbee" placeholder="新手优惠券">
        <el-option label="新手优惠券" :value="1">
          新手优惠券
        </el-option>
        <el-option label="非新手优惠券" :value="2">
          非新手优惠券
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handbox()">添加优惠券</el-button>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="优惠券名称" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column label="优惠方式" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.type === 1">
              <span v-if="scope.row.saleType === 1">满减</span>
              <span v-else>无限制</span>
            </p>
            <p v-else>
              <span v-if="scope.row.discountTime === 1">减免一个小时</span>
              <span v-else-if="scope.row.discountTime === 2">减免两个小时</span>
              <span v-else>全免</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">代金券</span>
            <span v-else>停车券</span>
          </template>
        </el-table-column>
        <el-table-column label="使用时间" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.startTime).getFullYear()+ '-' + (((new Date(scope.row.startTime).getMonth() + 1)
              < 10) ? '0'+ (new Date(scope.row.startTime).getMonth() + 1) : (new Date(scope.row.startTime).getMonth() + 1)) + '-' + ((new Date(scope.row.startTime).getDate() < 10) ? '0' + new Date(scope.row.startTime).getDate() : new Date(scope.row.startTime).getDate())}}</span> 至
                <span>{{new Date(scope.row.endTime).getFullYear()+ '-' + (((new Date(scope.row.endTime).getMonth() + 1)
                  < 10) ? '0'+ (new Date(scope.row.endTime).getMonth() + 1) : (new Date(scope.row.endTime).getMonth() + 1)) + '-' + ((new Date(scope.row.endTime).getDate() < 10) ? '0' + new Date(scope.row.endTime).getDate() : new Date(scope.row.endTime).getDate())}}</span>
          </template>
        </el-table-column>
        <el-table-column label="新手优惠券" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isNewbee === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column label="是否上架" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="small" v-if="scope.row.isUpper === 1" @click='upclick(scope.row.id, scope.row.isUpper)'>下架</el-button>
            <el-button type="success" size="small" v-else @click='upclick(scope.row.id, scope.row.isUpper)'>上架</el-button>
          </template>
        </el-table-column>
        <el-table-column label="二维码" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click='upSee(scope.row.id)'>查看二维码</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <!-- <el-button @click="handbox(scope.row.id)" type="primary" size="small">修改</el-button> -->
            <el-button @click="del(scope.row.id)" type="danger" size="small">删除</el-button>
            <el-button @click="clicknum(scope.row.id)" type="info" size="small">发放优惠券</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 90%; margin-left:50px;'>
        <el-form-item label="商品名称">
          <el-input placeholder="请输入商品名称" v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" v-model="item.title"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否上架">
              <el-select clearable style="width: 150px" class="filter-item" placeholder="选择是否上架" v-model="item.isUpper" disabled>
                <el-option label="上架" :value="1">
                  上架
                </el-option>
                <el-option label="下架" :value="2">
                  下架
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否新手">
              <el-select clearable style="width: 150px" class="filter-item" placeholder="是否新手优惠" v-model="item.isNewbee">
                <el-option label="新手优惠券" :value="1">
                  新手优惠券
                </el-option>
                <el-option label="非新手优惠券" :value="2">
                  非新手优惠券
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优惠券类型">
              <el-select clearable style="width: 150px" class="filter-item" placeholder="优惠券类型" v-model="item.type">
                <el-option label="代金券" :value="1">
                  代金券
                </el-option>
                <el-option label="停车券" :value="2">
                  停车券
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='item.type === 1'>
          <el-col :span="8">
            <el-form-item label="优惠类型">
              <el-select clearable style="width: 150px" class="filter-item" placeholder="优惠类型" v-model="item.saleType">
                <el-option label="满减" :value="1">
                  满减
                </el-option>
                <el-option label="无限制" :value="2">
                  无限制
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if='item.saleType === 2'>
            <el-form-item label="无限制减">
              <el-input placeholder="请输入减免金额" v-model="item.price" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if='item.saleType === 1'>
            <el-form-item label="满">
              <el-input placeholder="请输入满多少" v-model="item.limitPrice" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if='item.saleType === 1'>
            <el-form-item label="减">
              <el-input placeholder="请输入减多少" v-model="item.price" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='item.type === 2'>
          <el-col :span="8">
            <el-form-item label="减免时间">
              <el-select clearable style="width: 150px" class="filter-item" placeholder="减免时间" v-model="item.discountTime">
                <el-option label="减免一小时" :value="1">
                  减免一小时
                </el-option>
                <el-option label="减免两小时" :value="2">
                  减免两小时
                </el-option>
                <el-option label="全免" :value="3">
                  全免
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="15">
            <el-form-item label="使用时间">
              <el-date-picker v-model="dataTwoArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="trueover">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="numfa" :title="title">
      <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 90%; margin-left:50px;'>
        <el-form-item label="接收人手机号">
          <el-input placeholder="请输入接收人手机号" v-model="userData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input placeholder="请输入数量" v-model="userData.number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="trueoverTwo">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="code" title="优惠券二维码">
      <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 90%; margin-left:50px;'>
        <el-form-item label="优惠券名称">
          <el-input :value="codeData.name" :disabled="true"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="总库存">
              <el-input :value="codeData.total" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已领取">
              <el-input :value="codeData.total-codeData.stock" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="增加库存">
              <el-input v-model="codeList.total"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="优惠券二维码">
          <img :src="codeData.codeUrl" alt="" width="200px;">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="trueoverThere">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllCoupon, isUpperCoupon, addCoupon, deleteCouponById, getCouponById, editCouponById, sendCoupon, getQRCode, sendCouponQRCode } from '@/api/coupon'
import { ERR_OK } from '@/api/config'

export default {
  data() {
    return {
      title: '新增优惠券',
      loading: true,
      dialogFormVisible: false,
      numfa: false,
      code: false,
      total: 1,
      listQuery: {
        page: 1,
        limit: 10
      },
      data: {
        endTime: null,
        isNewbee: null,
        isUpper: null,
        name: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        type: null,
        saleType: null
      },
      tableData: [],
      dataArr: [],
      dataTwoArr: [],
      item: {
        endTime: '',
        isNewbee: '',
        isUpper: 2,
        limitPrice: '',
        name: '',
        price: '',
        saleType: '',
        startTime: '',
        type: '',
        title: '',
        discountTime: ''
      },
      userData: {
        id: '',
        mobile: '',
        number: ''
      },
      codeData: {
        name: '',
        total: '',
        stock: '',
        codeUrl: ''
      },
      codeList: {
        couponId: '',
        total: 0
      }
    }
  },
  created() {
    this._getAllCoupon()
  },
  methods: {
    _getAllCoupon() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllCoupon(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取商品订单============')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
          this.loading = false
        }
      })
    },
    _isUpperCoupon(id, type) {
      isUpperCoupon(id, type).then((res) => {
        if (res.code === ERR_OK) {
          if (type === 1) {
            this.$message({
              type: 'success',
              message: '上架成功'
            })
          } else {
            this.$message({
              type: 'success',
              message: '下架成功'
            })
          }
          this._getAllCoupon()
        }
      })
    },
    clicknum(id) {
      this.numfa = true
      this.userData.id = id
    },
    upSee(id) {
      console.log('查看二维码')
      console.log(id)
      this.code = true
      this.codeList.couponId = id
      this.codeList.total = 0
      getQRCode(id).then((res) => {
        if (res.code === ERR_OK) {
          console.log('查看二维码==========================')
          console.log(res.data)
          this.codeData = res.data
          console.log(this.codeData)
        }
      })
    },
    del(id) {
      console.log(id)
      this.$confirm('是否删除该优惠券?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCouponById(id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this._getAllCoupon()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    upclick(id, type) {
      if (type === 1) {
        this._isUpperCoupon(id, 2)
      } else {
        this._isUpperCoupon(id, 1)
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllCoupon()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllCoupon()
    },
    quxiao() {
      this.dialogFormVisible = false
      this.numfa = false
      this.code = false
    },
    trueoverTwo() {
      sendCoupon(this.userData).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          if (res.data.code === 500104) {
            this.$message.error('没有该用户')
          } else {
            this.$message({
              message: '发布成功',
              type: 'success'
            })
            this.numfa = false
          }
        }
      })
    },
    trueoverThere() {
      console.log('测试')
      console.log(this.codeList)
      sendCouponQRCode(this.codeList).then((res) => {
        if (res.code === ERR_OK) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.code = false
        }
      })
    },
    trueover() {
      if (this.title === '新增优惠券') {
        if (this.dataTwoArr !== [] && this.dataTwoArr !== null) {
          console.log(this.dataArr)
          this.item.startTime = this.dataTwoArr[0]
          this.item.endTime = this.dataTwoArr[1]
        } else {
          this.item.startTime = null
          this.item.endTime = null
        }
        console.log(this.item)
        addCoupon(this.item).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this._getAllCoupon()
          }
        })
      } else {
        console.log(this.item)
        editCouponById(this.item).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this._getAllCoupon()
          }
        })
      }
    },
    handbox(id) {
      this.dialogFormVisible = true
      if (id) {
        this.title = '修改优惠券'
        this.item.id = id
        this.dataTwoArr = []
        getCouponById(id).then((res) => {
          if (res.code === ERR_OK) {
            this.item = res.data
            console.log(res.data)
            this.dataTwoArr.push(res.data.startTime)
            this.dataTwoArr.push(res.data.endTime)
          }
        })
      } else {
        this.title = '新增优惠券'
      }
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
      this._getAllCoupon()
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
.el-dialog{
  width: 900px;
}
</style>
