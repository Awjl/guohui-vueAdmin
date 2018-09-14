<template>
  <div class="banner">
    <div class="banneradd">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入商品名称" v-model="data.name">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="data.isUpper" placeholder="是否上架">
        <el-option label="上架" :value="1">
          上架
        </el-option>
        <el-option label="下架" :value="2">
          下架
        </el-option>
      </el-select>
      <el-date-picker v-model="dataArr" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="suchbox" >搜索</el-button>
      <el-button type="primary"  @click="handleUpdate()" icon="el-icon-plus">新增大厅</el-button>
    </div>
    <div class="bannerlist-box">
      <div class="filter-container" style="width: 100%">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" align="center">
          </el-table-column>
          <el-table-column prop="name" label="大厅名称" align="center">
          </el-table-column>
          <el-table-column label="大厅图片" align="center">
            <template slot-scope="scope">
              <div class="box-img">
                <img :src="scope.row.pictureUrl" alt="" align="center">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="是否上架" align="center">
            <template slot-scope="scope">
              <el-button@click="isUpper(scope.row.isUpper, scope.row.id)" type="warning" size="small" v-if="scope.row.isUpper == 1">下架</el-button>
                <el-button @click="isUpper(scope.row.isUpper, scope.row.id)" type="success" size="small" v-else>上架</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="500px" align="center">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.row.id)" type="warning" size="small">修改</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" label-position="left" label-width="70px" style='width: 700px; margin-left:50px;'>
        <el-form-item label="图片名称">
          <el-input placeholder="请输入图片名称" v-model="dataTitle"></el-input>
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
import { getAllBars, isUpperBar, addBar, editBar, getBarById, deleteBar } from '@/api/shoping'
import { ERR_OK } from '@/api/config'
const formData = new FormData()

export default {
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      tableData: [],
      total: 1,
      listQuery: {
        page: 1,
        limit: 10
      },
      data: {
        name: null,
        endTime: null,
        pageNum: null,
        pageSize: null,
        startTime: null,
        isUpper: null
      },
      idx: 0,
      title: '添加大厅',
      avatar: '',
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      dataTitle: '',
      goodsId: '',
      picId: '',
      dataArr: []
    }
  },
  created() {
    this._getAllBars()
  },
  methods: {
    _getAllBars() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      this.idx = 0
      getAllBars(this.data).then((res) => {
        if (res.code === ERR_OK) {
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
      if (state === 1) {
        isUpperBar(id, 2).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              type: 'success',
              message: '下架成功'
            })
            this._getAllBars()
          }
        })
      } else {
        if (this.idx >= 2) {
          this.$message({
            type: 'warning',
            message: '上架数量过多，请先下架'
          })
        } else {
          isUpperBar(id, 1).then((res) => {
            if (res.code === ERR_OK) {
              this.$message({
                type: 'success',
                message: '上架成功'
              })
              this._getAllBars()
            }
          })
        }
      }
    },
    handleUpdate(id) {
      this.dialogFormVisible = true
      if (id) {
        this.title = '修改大厅'
        getBarById(id).then((res) => {
          if (res.code === ERR_OK) {
            console.log('获取吧详情==================')
            console.log(res.data)
            this.dataTitle = res.data.name
            this.avatar = res.data.pictureUrl
            this.goodsId = res.data.id
            this.picId = res.data.picId
          }
        })
      } else {
        this.title = '添加大厅'
      }
    },
    delClick(id) {
      this.$confirm('是否删除该大厅?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBar(id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this._getAllBars()
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
      this._getAllBars()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllBars()
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      if (this.title === '修改大厅') {
        formData.set('name', this.dataTitle)
        formData.set('id', this.goodsId)
        formData.set('picId', this.picId)
        console.log(this.goodsId, this.picId)
        editBar(formData).then((res) => {
          if (res.data.code === ERR_OK) {
            this.dialogFormVisible = false
            this.$message({
              message: '修改完成',
              type: 'success'
            })
            this._getAllBars()
          }
        })
      } else {
        formData.set('name', this.dataTitle)
        addBar(formData).then((res) => {
          if (res.data.code === ERR_OK) {
            this.dialogFormVisible = false
            this.$message({
              message: '添加完成',
              type: 'success'
            })
            this._getAllBars()
          }
        })
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
      console.log(this.data)
      this._getAllBars()
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
