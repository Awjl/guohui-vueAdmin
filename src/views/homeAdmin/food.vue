<template>
  <div class="banner">
    <div class="banneradd">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入商品名称" v-model="data.title">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.type" placeholder="请选择类型">
        <el-option label="餐券" :value="4">
          餐券
        </el-option>
        <el-option label="房券" :value="3">
          房券
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox" >搜索</el-button>
    </div>
    <div class="bannerlist-box">
      <div class="filter-container" style="width: 100%">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="goodsId" label="ID" align="center">
          </el-table-column>
          <el-table-column prop="title" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="url" label="首页商品图片" align="center">
            <template slot-scope="scope">
              <div class="box-img">
                <img :src="scope.row.url" alt="" align="center">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 3">房券</span>
              <span v-if="scope.row.type === 4">餐券</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="是否上架在首页" align="center">
            <template slot-scope="scope">
              <el-button@click="isUpper(scope.row.isUpper, scope.row.id)" type="warning" size="small" v-if="scope.row.isUpper == 1">下架</el-button>
                <el-button @click="isUpper(scope.row.isUpper, scope.row.id)" type="success" size="small" v-else>上架</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.row.id)" type="primary" size="small">修改</el-button>
              <el-button @click="delClick(scope.row.id)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="left" label-width="70px" style='width: 700px; margin-left:50px;'>
        <el-form-item label="图片名称">
          <el-input placeholder="请输入图片名称" v-model="item.title"></el-input>
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
import { getCornerMealBanner, isUpperBanner, getCornerMealBannerById, editCornerMealBannerById, deleteBanner } from '@/api/home'
import { ERR_OK } from '@/api/config'
const formData = new FormData()

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      title: '添加图片',
      tableData: [],
      total: 1,
      listQuery: {
        page: 1,
        limit: 10
      },
      data: {
        title: null,
        type: null,
        endTime: null,
        pageNum: null,
        pageSize: null,
        startTime: null
      },
      idx: 0,
      avatar: '',
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      item: {},
      dataArr: []
    }
  },
  created() {
    this._getCornerMealBanner()
  },
  methods: {
    _getCornerMealBanner() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      this.idx = 0
      getCornerMealBanner(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取列表数据')
          console.log(res.data)
          this.tableData = res.data.list
          const vm = this
          this.tableData.forEach(function(Value, index, array) {
            if (Value.isUpper === 1) {
              vm.idx++
            }
          })
          this.total = res.data.total
        }
      })
    },
    isUpper(state, id) {
      console.log(this.idx)
      if (state === 1) {
        isUpperBanner(2, id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              type: 'success',
              message: '下架成功'
            })
            this._getCornerMealBanner()
          }
        })
      } else {
        if (this.idx >= 2) {
          this.$message({
            type: 'warning',
            message: '上架数量过多，请先下架'
          })
        } else {
          isUpperBanner(1, id).then((res) => {
            if (res.code === ERR_OK) {
              this.$message({
                type: 'success',
                message: '上架成功'
              })
              this._getCornerMealBanner()
            }
          })
        }
      }
    },
    handleUpdate(id) {
      this.dialogFormVisible = true
      this.item = {}
      this.avatar = ''
      getCornerMealBannerById(id).then((res) => {
        if (res.code === ERR_OK) {
          this.item = res.data
          this.avatar = res.data.url
        }
      })
    },
    delClick(id) {
      this.$confirm('是否删除该banner?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBanner(id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this._getCornerMealBanner()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getCornerMealBanner()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getCornerMealBanner()
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      formData.set('title', this.item.title)
      formData.set('id', this.item.id)
      console.log(this.item.title)
      editCornerMealBannerById(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.dialogFormVisible = false
          console.log(res.data.data)
          this.$message({
            message: '修改完成',
            type: 'success'
          })
          this._getCornerMealBanner()
        }
      })
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
        formData.set('file', e.target.files[0])
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
      this._getCornerMealBanner()
    }
  }
}
</script>
<style>
img {
  width: 100%;
}
.banneradd {
  margin: 30px;
}
.addbanner {
  width: 100%;
  text-align: center;
  font-size: 24px;
}
.bannerlist-box {
  margin: 30px;
  min-height: 600px;
  border: 1px solid #ddd;
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
