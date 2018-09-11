<template>
  <div class="banner">
    <div class="banneradd">
      <el-button type="primary" size="mini" @click="handleUpdate()" icon="el-icon-plus">新增Banner</el-button>
      <el-button type="primary" size="mini" @click="topBanner" >首页顶部Banner</el-button>
      <el-button type="primary" size="mini" @click="bottomBanner" >首页大厅Banner</el-button>
    </div>
    <div class="bannerlist-box">
      <div class="filter-container">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID"  align="center" >
          </el-table-column>
          <el-table-column prop="title" label="图片名称" align="center" >
          </el-table-column>
          <el-table-column prop="url" label="图片展示" align="center" >
            <template slot-scope="scope">
              <div class="box-img">
                <img :src="scope.row.url" alt="" align="center" >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="isUpper" label="是否上架" align="center" >
            <template slot-scope="scope">
              <el-button  type="success" size="small" v-if="scope.row.isUpper === 1">已上架</el-button>
              <el-button  type="info" size="small" v-else>已下架</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="url" label="图片链接">
          </el-table-column> -->
          <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
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
        <el-form-item :label="title">
          <el-upload class="upload-demo" action="" :auto-upload="false" :show-file-list="true" list-type="picture" :on-change="onUploadChange" :on-remove="handleRemove" :file-list="arr">
            <el-button slot="trigger" size="small" type="primary">选取</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllTopBanner, getAllBottomBanner } from '@/api/home'
import { ERR_OK } from '@/api/config'

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
      }
    }
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
    bottomBanner() {
      console.log('测试')
      getAllBottomBanner(this.listQuery.page, this.listQuery.limit).then((res) => {
        if (res.code === ERR_OK) {
          console.log('banner数据==================')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    topBanner() {
      this._getAllTopBanner()
    },
    handleUpdate() {
      this.dialogFormVisible = true
    },
    handleClick(row) {
      // this.tableData
      console.log(this.tableData)
    },
    submitUpload() {
      this.arr2 = []
      var that = this
      this.arr.forEach(function(value, index, array) {
        that.arr2.push(value.raw)
      })
      const formData = new FormData()
      formData.append('files', this.arr2)
      console.log(this.arr2)
    },
    handleRemove(file, arr) {
      console.log(file)
      this.arr = arr
    },
    onUploadChange(file, arr) {
      console.log(file)
      const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMAGE) {
        this.$message.error('只能上传jpg/png图片!')
        this.handleRemove(file, arr)
        return
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        this.handleRemove(file, arr)
        return
      }
      this.arr.push(file) // 上传文件变化时将文件对象push进files数组
      console.log(this.arr)
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
</style>
