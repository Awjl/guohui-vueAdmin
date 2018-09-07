<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入商品名称" v-model="data.name">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.isCommend" placeholder="是否为热推">
        <el-option label="热推产品" :value="1">
          热推产品
        </el-option>
        <el-option label="非热推产品" :value="2">
          非热推产品
        </el-option>
      </el-select>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.type" placeholder="选择分类">
        <el-option label="房券" :value="1">
          房券
        </el-option>
        <el-option label="餐券" :value="2">
          餐券
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
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加商品</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="goodsId" label="商品ID" align="center">
        </el-table-column>
        <el-table-column prop="pictureUrl" label="商品缩略图" align="center">
          <template slot-scope="scope">
            <div class="box-img">
              <img :src="scope.row.pictureUrl" alt="" align="center">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="newPrice" label="折扣价" align="center">
        </el-table-column>
        <el-table-column prop="oldPrice" label="原价" align="center">
        </el-table-column>
        <el-table-column prop="isCommend" label="是否为热推" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small" v-if="scope.row.isCommend === 1" @click="setHot(scope.row.isCommend, scope.row.goodsId)">热推产品</el-button>
            <el-button type="info" size="small" v-else @click="setHot(scope.row.isCommend, scope.row.goodsId)">非热推产品</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
            <el-button @click="Lower(scope.row.goodsId, scope.$index)" type="warning" size="small" v-if="scope.row.isUpper == 1">下架</el-button>
            <el-button @click="shelf(scope.row.goodsId, scope.$index)" type="success" size="small" v-else>上架</el-button>
            <el-button @click="del(scope.row.goodsId)" type="danger" size="small">删除</el-button>
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
import { getAllGoods, isUpperGoods, setHotGoods, deleteGoods } from '@/api/shoping'
import { ERR_OK } from '@/api/config'

export default {
  data() {
    return {
      loading: false,
      total: 1,
      dataArr: [],
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      data: {
        endTime: null,
        isCommend: null,
        isUpper: null,
        name: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        type: null
      },
      tableData: []
    }
  },
  created() {
    this._getAllGoods()
  },
  methods: {
    _getAllGoods() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllGoods(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('商品数据===================')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _isUpperGoods(id, goodsId) {
      console.log(id, goodsId)
      isUpperGoods(id, goodsId).then((res) => {
        if (res.code === ERR_OK) {
          console.log('下架成功')
          if (id === 1) {
            this.$message({
              message: '上架成功',
              type: 'success'
            })
            this._getAllGoods()
          } else {
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this._getAllGoods()
          }
        }
      })
    },
    _setHotGoods(id, goodsId) {
      setHotGoods(id, goodsId).then((res) => {
        if (res.code === ERR_OK) {
          console.log('设置热推')
          if (id === 1) {
            this.$message({
              message: '已设置为热推',
              type: 'success'
            })
            this._getAllGoods()
          } else {
            this.$message({
              message: '已取消为热推',
              type: 'success'
            })
            this._getAllGoods()
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
        deleteGoods(id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this._getAllGoods()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setHot(id, goodsId) {
      if (id === 1) {
        this._setHotGoods(2, goodsId)
      } else {
        this._setHotGoods(1, goodsId)
      }
    },
    Lower(goodsId) {
      this._isUpperGoods(2, goodsId)
    },
    shelf(goodsId, index) {
      this._isUpperGoods(1, goodsId)
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllGoods()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllGoods()
    },
    suchbox() {
      this.listQuery.limit = 10
      this.listQuery.page = 1
      if (this.dataArr !== []) {
        this.data.startTime = this.dataArr[0]
        this.data.endTime = this.dataArr[1]
      }
      console.log(this.data)
      this._getAllGoods()
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
