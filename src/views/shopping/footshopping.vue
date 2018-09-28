<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入商品名称" v-model="data.name">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.barId" placeholder="选择大厅">
        <el-option v-for="(item, index) in barList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.isUpper" placeholder="选择是否上架">
        <el-option label="上架" :value="1">
          上架
        </el-option>
        <el-option label="下架" :value="2">
          下架
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handbox()">添加商品</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="商品ID" align="center">
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
        <el-table-column prop="barName" label="所属吧" align="center">
        </el-table-column>
        <el-table-column prop="summary" label="商品简介" align="center">
          <template slot-scope="scope">
            <div v-for="(listItem, index) in JSON.parse(scope.row.summary)" :key="index">{{listItem.info}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button @click="handbox(scope.row.id)" type="primary" size="small">修改</el-button>
            <el-button @click="Lower(scope.row.id)" type="warning" size="small" v-if="scope.row.isUpper == 1">下架</el-button>
            <el-button @click="shelf(scope.row.id)" type="success" size="small" v-else>上架</el-button>
            <el-button @click="del(scope.row.id)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="20%" style='width:80%;'>
        <el-form-item label="商品名称">
          <el-input placeholder="请输入商品名称" v-model="shopingTitle"></el-input>
        </el-form-item>
        <el-form-item label="选择大厅">
          <el-select clearable style="width: 150px" class="filter-item" v-model="shopingBar" placeholder="选择大厅">
            <el-option v-for="(item, index) in barList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select clearable style="width: 150px" class="filter-item" v-model="shopingisUpper" placeholder="选择是否上架">
            <el-option label="上架" :value="1">
              上架
            </el-option>
            <el-option label="下架" :value="2">
              下架
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品内容">
          <el-input placeholder="格式如：奶茶*2/拼盘*1/牛排*1" v-model="shoppingsummary"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upbtn">
            <label for="up">预览图片</label>
            <input @change="upavatarimg" type="file" id="up" value="图片上传预览" />
          </div>
          <img :src="avatar" alt="" v-if="avatar">
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
import { getAllBars, getAllBarsGoods, isUpperBarGoods, addBarGoods, getBarGoodsById, editBarGoods, deleteBarGoods } from '@/api/shoping'
import { ERR_OK } from '@/api/config'

export default {
  data() {
    return {
      formData: new FormData(),
      loading: false,
      dialogFormVisible: false,
      total: 1,
      dataArr: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      data: {
        endTime: null,
        isUpper: null,
        name: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        barId: null
      },
      bardata: {
        name: null,
        endTime: null,
        pageNum: 1,
        pageSize: 50,
        startTime: null,
        isUpper: null
      },
      tableData: [],
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      avatar: '',
      barList: [],
      title: '新增商品',
      shopingTitle: '',
      shopingBar: '',
      shopingisUpper: '',
      shoppingsummary: '',
      goodID: '',
      picId: ''
    }
  },
  created() {
    this._getAllBarsGoods()
    this._getAllBars()
  },
  methods: {
    _getAllBars() {
      getAllBars(this.bardata).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.barList = res.data.list
          console.log(this.barList)
        }
      })
    },
    _getAllBarsGoods() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllBarsGoods(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('吧商品数据==============================')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _addBarGoods() {
      addBarGoods(this.formData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            message: '新增商品成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this._getAllBarsGoods()
        }
      })
    },
    _isUpperBarGoods(goodsId, id) {
      isUpperBarGoods(goodsId, id).then((res) => {
        if (res.code === ERR_OK) {
          console.log('下架成功')
          if (id === 1) {
            this.$message({
              message: '上架成功',
              type: 'success'
            })
            this._getAllBarsGoods()
          } else {
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this._getAllBarsGoods()
          }
        }
      })
    },
    handbox(id) {
      this.dialogFormVisible = true
      if (id) {
        this.title = '修改商品'
        getBarGoodsById(id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.avatar = res.data.pictureUrl
            this.shopingTitle = res.data.name
            this.shopingBar = res.data.barId
            this.shopingisUpper = res.data.isUpper
            this.shoppingsummary = res.data.summary
            this.goodID = res.data.id
            this.picId = res.data.picId
          }
        })
      } else {
        this.avatar = ''
        this.shopingTitle = ''
        this.shopingBar = ''
        this.shopingisUpper = ''
        this.shoppingsummary = ''
        this.title = '新增商品'
      }
    },
    del(id) {
      console.log(id)
      this.$confirm('是否删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBarGoods(id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this._getAllBarsGoods()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      // this.dialogFormVisible = false
      // formData.set('title', this.bannerTitle)
      // console.log(formData.get('file'))
      // console.log(formData.get('title'))
      // this._addBarGoods()
      if (this.title === '新增商品') {
        //   shopingTitle: '',
        // shopingBar: '',
        // shopingisUpper: '',
        // shoppingsummary: ''

        this.formData.set('name', this.shopingTitle)
        this.formData.set('title', this.shopingTitle)
        this.formData.set('barId', this.shopingBar)
        this.formData.set('summary', this.shoppingsummary)
        this.formData.set('isUpper', this.shopingisUpper)
        this._addBarGoods()
      } else {
        this.formData.set('name', this.shopingTitle)
        this.formData.set('title', this.shopingTitle)
        this.formData.set('barId', this.shopingBar)
        this.formData.set('summary', this.shoppingsummary)
        this.formData.set('isUpper', this.shopingisUpper)
        this.formData.set('id', this.goodID)
        this.formData.set('picId', this.picId)
        editBarGoods(this.formData).then((res) => {
          if (res.data.code === ERR_OK) {
            this.$message({
              message: '修改商品成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this._getAllBarsGoods()
          }
        })
      }
    },
    Lower(goodsId) {
      this._isUpperBarGoods(goodsId, 2)
    },
    shelf(goodsId) {
      this._isUpperBarGoods(goodsId, 1)
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllBarsGoods()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllBarsGoods()
    },
    upavatarimg(e) {
      var avatarImg = e.target.files[0]
      var avatarImgsize = avatarImg.size
      var avatarImgtype = avatarImg.type
      // 验证图片格式
      if (this.imgType.type.indexOf(avatarImgtype) === -1) {
        this.$message.error('格式不正确')
        return false
      } else if (avatarImgsize > 5242880) {
        this.$message.error('图片太大了')
        return false
      } else {
        const _this = this
        if (!e || !window.FileReader) return
        const reader = new FileReader()
        reader.readAsDataURL(avatarImg)
        reader.onload = function(e) {
          _this.avatar = e.target.result
        }
        this.formData.set('file', e.target.files[0])
      }
    },
    suchbox() {
      this.listQuery.limit = 10
      this.listQuery.page = 1
      if (this.dataArr !== []) {
        this.data.startTime = this.dataArr[0]
        this.data.endTime = this.dataArr[1]
      }
      this._getAllBarsGoods()
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
.upbtn {
  width: 100px;
  height: 30px;
  background: #66b1ff;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin-bottom: 50px;
}
.upbtn label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
}
.upbtn input {
  opacity: 0;
}
</style>
