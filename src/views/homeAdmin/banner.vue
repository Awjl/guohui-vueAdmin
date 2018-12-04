<template>
  <div class="banner">
    <div class="banneradd">
      <el-button type="primary" @click="handleUpdate()" icon="el-icon-plus" :disabled="!(homeData.indexOf('1') !== -1)" :title="(homeData.indexOf('3') !== -1) ? '' : '暂无权限'">新增Banner</el-button>
      <!-- <el-button type="primary" @click="topBanner">首页顶部Banner</el-button>
      <el-button type="primary" @click="bottomBanner">首页大厅Banner</el-button> -->
    </div>
    <div class="bannerlist-box">
      <div class="filter-container">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" align="center">
          </el-table-column>
          <el-table-column prop="title" label="图片名称" align="center">
          </el-table-column>
          <el-table-column prop="url" label="图片展示" align="center">
            <template slot-scope="scope">
              <div class="box-img">
                <img :src="scope.row.url" alt="" align="center">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="isUpper" label="是否上架" align="center">
            <template slot-scope="scope">
              <el-button type="warning" size="small" v-if="scope.row.isUpper === 1" @click="isUpper(scope.row.isUpper, scope.row.id)" :disabled="!(homeData.indexOf('2') !== -1)" :title="(homeData.indexOf('2') !== -1) ? '' : '暂无权限'">下架</el-button>
              <el-button type="primary" size="small" v-else @click="isUpper(scope.row.isUpper, scope.row.id)" :disabled="!(homeData.indexOf('2') !== -1)" :title="(homeData.indexOf('2') !== -1) ? '' : '暂无权限'">上架</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.id)" type="danger" size="small" :disabled="!(homeData.indexOf('3') !== -1)" :title="(homeData.indexOf('3') !== -1) ? '' : '暂无权限'">删除</el-button>
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
      <el-form ref="dataForm" label-position="right" label-width="20%" style='width: 80%;'>
        <el-form-item label="图片名称" prop="name">
          <el-input placeholder="请输入图片名称" v-model="bannerName"></el-input>
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{bannerERR}}</span>
        </el-form-item>
        <el-form-item label="图片类型">
          <el-select clearable style="width: 150px" class="filter-item" placeholder="图片类型" v-model="statel">
            <el-option label="顶部Banner" :value="1">
              顶部Banner
            </el-option>
            <!-- <el-option label="底部Banner" :value="2">
              底部Banner
            </el-option> -->
          </el-select>
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{typeERR}}</span>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upbtn">
            <label for="up">预览图片</label>
            <input @change="upavatarimg" type="file" id="up" value="图片上传预览" />
          </div>
          <img :src="avatar" alt="" v-if="avatar">
          <span style="position: absolute;top:20px;left:0px;color:red">{{imgERR}}</span>
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
import { getAllTopBanner, getAllBottomBanner, uploadIndexPicture, deleteBanner, isUpperBanner } from '@/api/home'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

const formData = new FormData()

export default {
  data() {
    return {
      loading: false,
      arr: [],
      arr2: [],
      dialogFormVisible: false,
      title: '添加图片',
      tableData: [],
      value3: true,
      total: 100,
      listQuery: {
        page: 1,
        limit: 10
      },
      statel: 1,
      bannerName: '',
      avatar: '',
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      bannershow: true,
      bannerERR: '',
      typeERR: '',
      imgERR: ''
    }
  },
  computed: {
    ...mapGetters([
      'homeData'
    ])
  },
  created() {
    this._getAllTopBanner()
  },
  methods: {
    _getAllTopBanner() {
      getAllTopBanner(this.listQuery.page, this.listQuery.limit).then((res) => {
        if (res.code === ERR_OK) {
          console.log('banner数据==================')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _getAllBottomBanner() {
      getAllBottomBanner(this.listQuery.page, this.listQuery.limit).then((res) => {
        if (res.code === ERR_OK) {
          console.log('banner数据==================')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    bottomBanner() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.bannershow = false
      this._getAllBottomBanner()
    },
    topBanner() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.bannershow = true
      this._getAllTopBanner()
    },
    handleUpdate() {
      this.dialogFormVisible = true
      this.statel = 1
      this.avatar = ''
      this.bannerName = ''
    },
    handleClick(id) {
      this.$confirm('是否删除该Banner?', '提示', {
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
            if (this.bannershow) {
              this.topBanner()
            } else {
              this.bottomBanner()
            }
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
      if (!this.bannerName) {
        this.bannerERR = '请输入名称'
        return
      } else {
        this.bannerERR = ''
      }
      if (!this.statel) {
        this.typeERR = '请选择类型'
        return
      } else {
        this.typeERR = ''
      }
      if (!this.avatar) {
        this.imgERR = '请上传图片'
        return
      } else {
        this.imgERR = ''
      }
      formData.set('title', this.bannerName)
      formData.set('type', this.statel)
      uploadIndexPicture(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.dialogFormVisible = false
          this.$message({
            message: '添加完成',
            type: 'success'
          })
          if (this.bannershow) {
            this.topBanner()
          } else {
            this.bottomBanner()
          }
        }
      })
    },
    isUpper(state, id) {
      if (state === 1) {
        isUpperBanner(2, id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              type: 'success',
              message: '下架成功'
            })
            if (this.bannershow) {
              this.topBanner()
            } else {
              this.bottomBanner()
            }
          }
        })
      } else {
        isUpperBanner(1, id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              type: 'success',
              message: '上架成功'
            })
            if (this.bannershow) {
              this.topBanner()
            } else {
              this.bottomBanner()
            }
          }
        })
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      if (this.bannershow) {
        this._getAllTopBanner()
      } else {
        this._getAllBottomBanner()
      }
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      if (this.bannershow) {
        this._getAllTopBanner()
      } else {
        this._getAllBottomBanner()
      }
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
