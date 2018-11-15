<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="title" label="规则名称" align="center">
        </el-table-column>
        <el-table-column prop="number" label="赠送积分" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" :disabled="!(integralData.indexOf('5') !== -1)" :title="(integralData.indexOf('5') !== -1) ? '' : '暂无权限'" @click="edit(scope.row.id)">修改</el-button>
            <el-button @click="Lower(scope.row.isUpper, scope.row.id)" type="warning" size="small" v-if="scope.row.isUpper == 1" :disabled="!(integralData.indexOf('6') !== -1)" :title="(integralData.indexOf('6') !== -1) ? '' : '暂无权限'">下架</el-button>
            <el-button @click="Lower(scope.row.isUpper, scope.row.id)" type="success" size="small" v-else :disabled="!(integralData.indexOf('6') !== -1)" :title="(integralData.indexOf('6') !== -1) ? '' : '暂无权限'">上架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="修改规则">
      <el-form ref="dataForm" label-position="left" label-width="100px" style='width: 700px; margin-left:50px;'>
        <el-form-item label="积分规则名称">
          <el-input placeholder="请输入积分规则名称" v-model="rule.title"></el-input>
        </el-form-item>
        <el-form-item label="赠送积分">
          <el-input type="number" placeholder="输入赠送积分" v-model="rule.number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select clearable style="width: 150px" class="filter-item" v-model="rule.isUpper" placeholder="选择是否上架">
            <el-option label="上架" :value="1">
              上架
            </el-option>
            <el-option label="下架" :value="2">
              下架
            </el-option>
          </el-select>
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
import { getAllPointRule, isUpperPointRule, getPointRuleById, editPointRule } from '@/api/shoping'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      total: 1,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      data: {
        pageNum: null,
        pageSize: null
      },
      rule: {
        id: '',
        title: '',
        number: '',
        isUpper: ''
      }
    }
  },
  created() {
    this._getAllPointRule()
  },
  computed: {
    ...mapGetters([
      'integralData'
    ])
  },
  methods: {
    _getAllPointRule() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllPointRule(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取商品列表============')
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _isUpperPointRule(id, goodsId) {
      isUpperPointRule(id, goodsId).then((res) => {
        if (res.code === ERR_OK) {
          if (id === 1) {
            this.$message({
              message: '已上架规则',
              type: 'success'
            })
            this._getAllPointRule()
          } else {
            this.$message({
              message: '已下架规则',
              type: 'success'
            })
            this._getAllPointRule()
          }
        }
      })
    },
    Lower(id, goodsId) {
      if (id === 1) {
        this._isUpperPointRule(2, goodsId)
      } else {
        this._isUpperPointRule(1, goodsId)
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllPointRule()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllPointRule()
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      editPointRule(this.rule).then((res) => {
        if (res.code === ERR_OK) {
          this.$message({
            message: '已修改完成',
            type: 'success'
          })
          this._getAllPointRule()
          this.dialogFormVisible = false
        }
      })
    },
    edit(id) {
      this.dialogFormVisible = true
      this.rule.id = id
      getPointRuleById(id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.rule = res.data
        }
      })
    },
    suchbox() {
      this.listQuery.limit = 10
      this.listQuery.page = 1
      if (this.dataArr !== []) {
        this.data.startTime = this.dataArr[0]
        this.data.endTime = this.dataArr[1]
      }
      console.log(this.data)
      this._getAllPointRule()
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
