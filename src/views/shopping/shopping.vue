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
      <router-link :to="'/shoppingAdmin/addshopping/null'">
        <el-button type="primary" icon="el-icon-edit" :disabled="!(shoppingData.indexOf('5') !== -1)" :title="(shoppingData.indexOf('5') !== -1) ? '' : '暂无权限'">添加商品</el-button>
      </router-link>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="setTopHot" :disabled="!(shoppingData.indexOf('6') !== -1)" :title="(shoppingData.indexOf('6') !== -1) ? '' : '暂无权限'">查看顶部热推</el-button>
      <div class="he20"></div>
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入优惠券编码" v-model="destroyCode">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="destroy" :disabled="!(shoppingData.indexOf('7') !== -1)" :title="(shoppingData.indexOf('7') !== -1) ? '' : '暂无权限'">核销代金券</el-button>
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
        <el-table-column prop="newPrice" label="折扣价(单位：元)" align="center">
          <template slot-scope="scope">
            {{(scope.row.newPrice/100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="oldPrice" label="原价(单位：元)" align="center">
          <template slot-scope="scope">
            {{(scope.row.oldPrice/100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="isCommend" label="推荐至首页" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small" v-if="scope.row.hasIndexPic === 1" disabled>已推荐</el-button>
            <el-button type="primary" size="small" v-else  @click="setHome(scope.row.goodsId, scope.row.type)" :disabled="!(shoppingData.indexOf('8') !== -1)" :title="(shoppingData.indexOf('8') !== -1) ? '' : '暂无权限'">去推荐</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="isCommend" label="是否为热推" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small" v-if="scope.row.isCommend === 1" @click="setHot(scope.row.isCommend, scope.row.goodsId)" :disabled="!(shoppingData.indexOf('9') !== -1)" :title="(shoppingData.indexOf('9') !== -1) ? '' : '暂无权限'">热推产品</el-button>
            <el-button type="info" size="small" v-else @click="setHot(scope.row.isCommend, scope.row.goodsId)" :disabled="!(shoppingData.indexOf('9') !== -1)" :title="(shoppingData.indexOf('9') !== -1) ? '' : '暂无权限'">非热推产品</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <router-link :to="'/shoppingAdmin/addshopping/'+scope.row.goodsId">
              <el-button type="primary" size="small" :disabled="!(shoppingData.indexOf('10') !== -1)" :title="(shoppingData.indexOf('10') !== -1) ? '' : '暂无权限'">修改</el-button>
            </router-link>
            <el-button @click="Lower(scope.row.goodsId)" type="warning" size="small" v-if="scope.row.isUpper == 1" :disabled="!(shoppingData.indexOf('11') !== -1)" :title="(shoppingData.indexOf('11') !== -1) ? '' : '暂无权限'">下架</el-button>
            <el-button @click="shelf(scope.row.goodsId)" type="success" size="small" v-else :disabled="!(shoppingData.indexOf('11') !== -1)" :title="(shoppingData.indexOf('11') !== -1) ? '' : '暂无权限'">上架</el-button>
            <el-button @click="del(scope.row.goodsId)" type="danger" size="small" :disabled="!(shoppingData.indexOf('12') !== -1)" :title="(shoppingData.indexOf('12') !== -1) ? '' : '暂无权限'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="绑定首页图片">
      <el-form ref="dataForm" label-position="right" label-width="20%" style='width: 80%px;'>
        <el-form-item label="图片名称">
          <el-input placeholder="请输入图片名称" v-model="bannerTitle"></el-input>
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

    <el-dialog :visible.sync="dialogTopHot" title="顶部热推">
      <el-form ref="dataForm" label-position="right" label-width="20%" style='width: 80%;'>
        <el-form-item label="一隅热推">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{OneTitle}}</span>
          <el-input placeholder="请输入图片名称" v-model="bannerOneTitle"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upbtn">
            <label for="up">预览图片</label>
            <input @change="upavatarOneimg" type="file" id="up" value="图片上传预览" />
          </div>
          <img :src="oneavatar" alt="" v-if="oneavatar">
        </el-form-item>
        <div style="margin-left:30px;margin-bottom:50px;">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="trueoneover">保存</el-button>
        </div>
      </el-form>
      <el-form ref="dataForm" label-position="right" label-width="20%" style='width: 80%;'>
        <el-form-item label="一食热推">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{TwoTitle}}</span>
          <el-input placeholder="请输入图片名称" v-model="bannerTwoTitle"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upbtn">
            <label for="up">预览图片</label>
            <input @change="upavatarTwoimg" type="file" id="up" value="图片上传预览" />
          </div>
          <img :src="twoavatar" alt="" v-if="twoavatar">
        </el-form-item>
        <div style="margin-left:30px;margin-bottom:20px;">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="truetwoover">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getAllGoods, isUpperGoods, setHotGoods, deleteGood, setCornerMealBanner, getCornerMealListBanner, setCornerMealListBanner } from '@/api/shoping'
import { useCoupon } from '@/api/coupon'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

const formData = new FormData()
const formOneData = new FormData()
const formTwoData = new FormData()

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      dialogTopHot: false,
      total: 1,
      dataArr: [],
      listQuery: {
        page: 1,
        limit: 10
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
      tableData: [],
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      avatar: '',
      oneavatar: '',
      twoavatar: '',
      bannerTitle: '',
      bannerOneTitle: '',
      bannerTwoTitle: '',
      OneID: '',
      TwoID: '',
      destroyCode: '',
      OneTitle: '',
      TwoTitle: ''
    }
  },
  created() {
    this._getAllGoods()
  },
  computed: {
    ...mapGetters([
      'shoppingData'
    ])
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
    _setCornerMealBanner() {
      setCornerMealBanner(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            message: '绑定成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this._getAllGoods()
        }
      })
    },
    del(id) {
      this.$confirm('是否删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGood(id).then((res) => {
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
    setTopHot() {
      this.dialogTopHot = true
      this.OneTitle = ''
      this.TwoTitle = ''
      getCornerMealListBanner().then((res) => {
        if (res.code === ERR_OK) {
          this.oneavatar = res.data[0].url
          this.twoavatar = res.data[1].url
          this.bannerOneTitle = res.data[0].title
          this.bannerTwoTitle = res.data[1].title
          this.OneID = res.data[0].id
          this.TwoID = res.data[1].id
        }
      })
    },
    setHome(id, type) {
      formData.set('goodsId', id)
      if (type === 1) {
        formData.set(' type', '3')
      } else {
        formData.set(' type', '4')
      }
      this.dialogFormVisible = true
      this.bannerTitle = ''
      this.avatar = ''
    },
    quxiao() {
      this.dialogFormVisible = false
      this.dialogTopHot = false
    },
    trueover() {
      formData.set('title', this.bannerTitle)
      this._setCornerMealBanner()
    },
    trueoneover() {
      if (!this.bannerOneTitle) {
        this.OneTitle = '请输入标题'
        return
      }
      formOneData.set('id', this.OneID)
      formOneData.set('title', this.bannerOneTitle)
      setCornerMealListBanner(formOneData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            message: '修改一隅成功',
            type: 'success'
          })
          this.dialogTopHot = false
        }
      })
    },
    truetwoover() {
      if (!this.bannerTwoTitle) {
        this.TwoTitle = '请输入标题'
        return
      }
      formTwoData.set('id', this.TwoID)
      formTwoData.set('title', this.bannerTwoTitle)
      setCornerMealListBanner(formTwoData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            message: '修改一食成功',
            type: 'success'
          })
          this.dialogTopHot = false
        }
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
    shelf(goodsId) {
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
    upavatarOneimg(e) {
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
          _this.oneavatar = e.target.result
        }
        formOneData.set('file', e.target.files[0])
      }
    },
    upavatarTwoimg(e) {
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
          _this.twoavatar = e.target.result
        }
        formTwoData.set('file', e.target.files[0])
      }
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
