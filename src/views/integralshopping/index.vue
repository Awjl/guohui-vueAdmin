<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入商品名称" v-model="data.name">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.level" placeholder="会员级别">
        <el-option label="V1专属商品" :value="1">
          V1会员商品
        </el-option>
        <el-option label="V2专属商品" :value="2">
          V2会员商品
        </el-option>
        <el-option label="通用商品" :value="3">
          通用商品
        </el-option>
      </el-select>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.isUpper" placeholder="选择是否上架">
        <el-option label="上架" :value="1">
          上架产品
        </el-option>
        <el-option label="下架" :value="2">
          下架产品
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <router-link :to="'/integralshopping/addintegralshopping/'+null">
        <el-button type="primary" icon="el-icon-edit" :disabled="!(integralData.indexOf('1') !== -1)" :title="(integralData.indexOf('1') !== -1) ? '' : '暂无权限'">添加商品</el-button>
      </router-link>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="商品ID" align="center">
        </el-table-column>
        <el-table-column prop="province" label="商品缩略图" align="center">
          <template slot-scope="scope">
            <div class="box-img">
              <img :src="scope.row.pictureUrl" alt="" align="center">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="city" label="折扣积分" align="center">
          <template slot-scope="scope">
            <p>V1会员积分价格：{{scope.row.v1NewPoint}}</p>
            <p>V2会员积分价格：{{scope.row.v2NewPoint}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="oldPoint" label="商品价格（单位：元）" align="center">
        </el-table-column>
        <el-table-column prop="address" label="对应级别" align="center">
          <template slot-scope="scope">
            <p v-if='scope.row.level === 1'>V1会员</p>
            <p v-if='scope.row.level === 2'>V2会员</p>
            <p v-if='scope.row.level === 3'>全部会员</p>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存数" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <router-link :to="'/integralshopping/addintegralshopping/'+scope.row.id">
              <el-button type="primary" size="small" :disabled="!(integralData.indexOf('2') !== -1)" :title="(integralData.indexOf('2') !== -1) ? '' : '暂无权限'">修改</el-button>
            </router-link>
            <el-button @click="Lower(scope.row.isUpper, scope.row.id)" type="warning" size="small" v-if="scope.row.isUpper == 1" :disabled="!(integralData.indexOf('3') !== -1)" :title="(integralData.indexOf('3') !== -1) ? '' : '暂无权限'">下架</el-button>
            <el-button @click="Lower(scope.row.isUpper, scope.row.id)" type="success" size="small" v-else :disabled="!(integralData.indexOf('3') !== -1)" :title="(integralData.indexOf('3') !== -1) ? '' : '暂无权限'">上架</el-button>
            <el-button @click="del(scope.row.id)" type="danger" size="small" :disabled="!(integralData.indexOf('4') !== -1)" :title="(integralData.indexOf('4') !== -1) ? '' : '暂无权限'">删除</el-button>
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
import { getAllPointGoods, isUpperPointGoods, deletePointGoods } from '@/api/shoping'
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
        endTime: null,
        id: null,
        level: null,
        isUpper: null,
        name: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        type: null
      }
    }
  },
  created() {
    this._getAllPointGoods()
  },
  computed: {
    ...mapGetters([
      'integralData'
    ])
  },
  methods: {
    _getAllPointGoods() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllPointGoods(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取商品列表============')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _isUpperPointGoods(id, goodsId) {
      isUpperPointGoods(id, goodsId).then((res) => {
        if (res.code === ERR_OK) {
          if (id === 1) {
            this.$message({
              message: '已上架商品',
              type: 'success'
            })
            this._getAllPointGoods()
          } else {
            this.$message({
              message: '已下架商品',
              type: 'success'
            })
            this._getAllPointGoods()
          }
        }
      })
    },
    del(id) {
      this.$confirm('是否删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePointGoods(id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this._getAllPointGoods()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    Lower(id, goodsId) {
      if (id === 1) {
        this._isUpperPointGoods(2, goodsId)
      } else {
        this._isUpperPointGoods(1, goodsId)
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllPointGoods()
    },

    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllPointGoods()
    },
    suchbox() {
      this.listQuery.limit = 10
      this.listQuery.page = 1
      if (this.dataArr !== []) {
        this.data.startTime = this.dataArr[0]
        this.data.endTime = this.dataArr[1]
      }
      console.log(this.data)
      this._getAllPointGoods()
    }
  }
}
</script>
<style>
img {
  width: 100%;
}
.he20 {
  height: 20px;
}
.filter-container {
  width: 100%;
  min-height: 700px;
}
</style>
