<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入名称" v-model="data.name">
      </el-input>
      <el-select style="width: 100px" class="filter-item" v-model="data.type" placeholder="类型">
        <el-option label="优惠券" :value="1">
          优惠券
        </el-option>
        <el-option label="停车券" :value="2">
          停车券
        </el-option>
      </el-select>
      <el-select style="width: 150px" class="filter-item" v-model="data.isNewbee" placeholder="新手优惠券">
        <el-option label="新手优惠券" :value="1">
          新手优惠券
        </el-option>
        <el-option label="通用优惠券" :value="2">
          通用优惠券
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handbox()" :disabled="!(discountData.indexOf('1') !== -1)" :title="(discountData.indexOf('1') !== -1) ? '' : '暂无权限'">添加优惠券</el-button>
      <div class="he20"></div>
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
              <span>减免时间</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">优惠券</span>
            <span v-else>停车券</span>
          </template>
        </el-table-column>
        <el-table-column label="减免" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">
                {{scope.row.price/100}}元
            </span>
            <span v-else>
              {{scope.row.discountTime}}分钟
            </span>
          </template>
        </el-table-column>
        <el-table-column label="使用时间" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.startTime).getFullYear()+ '-' + (((new Date(scope.row.startTime).getMonth() + 1)
              < 10) ? '0' + (new Date(scope.row.startTime).getMonth() + 1) : (new Date(scope.row.startTime).getMonth() + 1)) + '-' + ((new Date(scope.row.startTime).getDate() < 10) ? '0' + new Date(scope.row.startTime).getDate() : new Date(scope.row.startTime).getDate())}}</span> 至 <span>{{new Date(scope.row.endTime).getFullYear()+ '-' + (((new Date(scope.row.endTime).getMonth() + 1)
                < 10) ? '0' + (new Date(scope.row.endTime).getMonth() + 1) : (new Date(scope.row.endTime).getMonth() + 1)) + '-' + ((new Date(scope.row.endTime).getDate() < 10) ? '0' + new Date(scope.row.endTime).getDate() : new Date(scope.row.endTime).getDate())}}</span> </template> </el-table-column> <el-table-column label="新手优惠券" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.isNewbee === 1">是</span>
                    <span v-else>否</span>
                  </template>
        </el-table-column>
        <el-table-column label="上下架操作" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="small" v-if="scope.row.isUpper === 1" @click='upclick(scope.row.id, scope.row.isUpper)' :disabled="!(discountData.indexOf('2') !== -1)" :title="(discountData.indexOf('2') !== -1) ? '' : '暂无权限'">下架</el-button>
            <el-button type="success" size="small" v-else @click='upclick(scope.row.id, scope.row.isUpper)' :disabled="!(discountData.indexOf('2') !== -1)" :title="(discountData.indexOf('2') !== -1) ? '' : '暂无权限'">上架</el-button>
          </template>
        </el-table-column>
        <el-table-column label="发放" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small"  v-if="scope.row.isNewbee === 1" :disabled="true">一键发放</el-button>
            <el-button type="success" size="small" @click='_sendCoupon2All(scope.row.id)' :disabled="scope.row.isUpper == 2" v-else>一键发放</el-button>
          </template>
        </el-table-column>
        <el-table-column label="二维码" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click='upSee(scope.row.id)' :disabled="!(discountData.indexOf('3') !== -1) ||  scope.row.isUpper === 2" :title="(discountData.indexOf('3') !== -1) ? '' : '暂无权限'">查看二维码</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button @click="del(scope.row.id)" type="danger" size="small" :disabled="!(discountData.indexOf('4') !== -1)" :title="(discountData.indexOf('4') !== -1) ? '' : '暂无权限'">删除</el-button>
            <el-button @click="clicknum(scope.row.id)" type="primary" size="small" :disabled="!(discountData.indexOf('5') !== -1)  ||  scope.row.isUpper === 2 " :title="(discountData.indexOf('5') !== -1) ? '' : '暂无权限'">发放优惠券</el-button>
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
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{nameERR}}</span>
          <el-input placeholder="请输入商品名称" v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{titleERR}}</span>
          <el-input placeholder="请输入标题" v-model="item.title"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="库存">
              <el-input type="number" placeholder="请输入库存" v-model="item.total" style="width: 150px" min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否新手">
              <el-select style="width: 150px" class="filter-item" placeholder="是否新手优惠" v-model="item.isNewbee">
                <el-option label="新手优惠券" :value="1">
                  新手优惠券
                </el-option>
                <el-option label="通用优惠券" :value="2">
                  通用优惠券
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优惠券类型">
              <el-select style="width: 150px" class="filter-item" placeholder="优惠券类型" v-model="item.type">
                <el-option label="优惠券" :value="1">
                  优惠券
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
              <el-select style="width: 150px" class="filter-item" placeholder="优惠类型" v-model="item.saleType">
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
              <el-input type="number" placeholder="单位：分" v-model="item.price" style="width: 150px" min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if='item.saleType === 1'>
            <el-form-item label="满">
              <el-input type="number" placeholder="单位：分" v-model="item.limitPrice" style="width: 150px" min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if='item.saleType === 1'>
            <el-form-item label="减">
              <el-input type="number" placeholder="单位：分" v-model="item.price" style="width: 150px" min="0"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='item.type === 2'>
          <el-col :span="8">
            <el-form-item label="减免时间">
              <el-input type="number" placeholder="单位（分钟）" v-model="item.discountTime" style="width: 150px" min="0"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="15">
            <el-form-item label="使用时间">
              <span style="position: absolute;bottom:-30px;left:0px;color:red">{{dataERR}}</span>
              <el-date-picker v-model="dataTwoArr" :picker-options="pickerOptions" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
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
    <el-dialog :visible.sync="numfa" title="发放优惠券">
      <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 90%; margin-left:50px;'>
        <el-form-item label="接收人手机号">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{mobileERR}}</span>
          <el-input placeholder="请输入接收人手机号" v-model="userData.mobile"></el-input>
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
              <span style="position: absolute;bottom:-30px;left:0px;color:red" >{{totalERR}}</span>
              <el-input v-model="codeList.total" type='number' min="0"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="优惠券二维码">
          <div style="width:200px;">
            <img :src="codeData.codeUrl" alt="" style="width:100%;">
          </div>
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
import { getAllCoupon, isUpperCoupon, addCoupon, deleteCouponById, editCouponById, sendCoupon, getQRCode, sendCouponQRCode, sendCoupon2All } from '@/api/coupon'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
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
        isNewbee: 1,
        isUpper: 2,
        limitPrice: '',
        name: '',
        price: '',
        saleType: 2,
        startTime: '',
        type: 1,
        title: '',
        discountTime: '',
        total: ''
      },
      userData: {
        id: '',
        mobile: ''
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
      },
      dataERR: '',
      titleERR: '',
      nameERR: '',
      totalERR: '',
      mobileERR: '',
      numberERR: ''
    }
  },
  created() {
    this._getAllCoupon()
  },
  computed: {
    ...mapGetters([
      'discountData'
    ])
  },
  methods: {
    _sendCoupon2All(id) {
      sendCoupon2All(id).then((res) => {
        if (res.code === ERR_OK) {
          this.$message({
            type: 'success',
            message: '发放成功'
          })
        }
      })
    },
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
      this.userData = {
        id: '',
        mobile: ''
      }
      this.userData.id = id
    },
    upSee(id) {
      this.code = true
      this.codeList.couponId = id
      this.codeList.total = 0
      this.totalERR = ''
      getQRCode(id).then((res) => {
        if (res.code === ERR_OK) {
          console.log('查看二维码==========================')
          console.log(res.data)
          this.codeData = res.data
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
        this.$confirm('下架后该优惠券会消失在用户列表中', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._isUpperCoupon(id, 2)
        })
      } else {
        this.$confirm('上架后该优惠券内容不可更改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._isUpperCoupon(id, 1)
        })
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
      this.mobileERR = ''
      this.numberERR = ''
      const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      const numReg = /(^[0-9]*[1-9][0-9]*$)/
      if (!this.userData.mobile) {
        this.mobileERR = '请输入手机号'
        return
      }
      if (!phoneReg.test(this.userData.mobile)) {
        this.mobileERR = '请输入正确的手机格式'
        return
      }
      if (!this.userData.number) {
        this.numberERR = '请输入发放数量'
        return
      }
      if (!numReg.test(this.userData.number)) {
        this.numberERR = '请输入正整数'
        return
      }
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
      if (!this.codeList.total) {
        this.totalERR = '请输入库存数'
        return
      }
      sendCouponQRCode(this.codeList).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.code)
          this.code = false
        }
      })
    },
    trueover() {
      this.dataERR = ''
      this.titleERR = ''
      this.nameERR = ''
      if (!this.item.name) {
        this.nameERR = '请输入名称'
        return
      }
      if (!this.item.title) {
        this.titleERR = '请输入标题'
        return
      }
      if (this.dataTwoArr.length < 2) {
        this.dataERR = '请选择初始时间和结束时间'
        return
      }
      if (this.title === '新增优惠券') {
        if (this.item.saleType === 2) {
          this.item.limitPrice = this.item.price
        }
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
      this.item = {
        endTime: '',
        isNewbee: 1,
        isUpper: 2,
        limitPrice: 0,
        name: '',
        price: '',
        saleType: 2,
        startTime: '',
        type: 1,
        title: '',
        discountTime: ''
      }
      this.dataTwoArr = []
      // if (id) {
      //   this.title = '修改优惠券'
      //   this.item.id = id
      //   this.dataTwoArr = []
      //   getCouponById(id).then((res) => {
      //     if (res.code === ERR_OK) {
      //       this.item = res.data
      //       console.log(res.data)
      //       this.dataTwoArr.push(res.data.startTime)
      //       this.dataTwoArr.push(res.data.endTime)
      //     }
      //   })
      // } else {
      this.title = '新增优惠券'
      // }
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
.el-dialog {
  width: 900px;
}
</style>
