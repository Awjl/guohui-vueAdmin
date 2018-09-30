<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleClick()" :disabled="!(serverData.indexOf('3') !== -1)" :title="(serverData.indexOf('3') !== -1) ? '' : '暂无权限'">添加问题</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="hotphone()" :disabled="!(serverData.indexOf('4') !== -1)" :title="(serverData.indexOf('4') !== -1) ? '' : '暂无权限'">修改服务电话</el-button>
      <span style="margin-left: 10px;">服务热线：</span>
      <span>{{phone}}</span>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="question" label="问题" align="center">
        </el-table-column>
        <el-table-column prop="answer" label="答案" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="primary" size="small" :disabled="!(serverData.indexOf('5') !== -1)" :title="(serverData.indexOf('5') !== -1) ? '' : '暂无权限'">修改</el-button>
            <el-button @click="Lower(scope.row.id, scope.row.isUpper)" type="warning" size="small" v-if="scope.row.isUpper == 1" :disabled="!(serverData.indexOf('6') !== -1)" :title="(serverData.indexOf('6') !== -1) ? '' : '暂无权限'">下架</el-button>
            <el-button @click="Lower(scope.row.id, scope.row.isUpper)" type="success" size="small" v-else :disabled="!(serverData.indexOf('6') !== -1)" :title="(serverData.indexOf('6') !== -1) ? '' : '暂无权限'">上架</el-button>
            <el-button @click="del(scope.row.id)" type="danger" size="small" :disabled="!(serverData.indexOf('7') !== -1)" :title="(serverData.indexOf('7') !== -1) ? '' : '暂无权限'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="15%" style='width:90%; '>
        <el-form-item label="问题">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{questionERR}}</span>
          <el-input placeholder="请输入问题" v-model="problem.question"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <span style="position: absolute;bottom:-30px;left:0px;color:red">{{answerERR}}</span>
          <el-input placeholder="请输入答案" v-model="problem.answer"></el-input>
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
import { getAllHotQuestion, isUpperHotQuestion, addHotQuestion, getHotQuestionById, editHotQuestionById, deleteHotQuestionById, getPhone, updatePhone } from '@/api/user'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      total: 1,
      title: '',
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      data: {
        pageNum: null,
        pageSize: null
      },
      tableData: [],
      problem: {
        answer: null,
        question: null
      },
      phone: '',
      questionERR: '',
      answerERR: ''
    }
  },
  created() {
    this._getAllHotQuestion()
    this._getPhone()
  },
  computed: {
    ...mapGetters([
      'serverData'
    ])
  },
  methods: {
    _getAllHotQuestion() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getAllHotQuestion(this.data).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    _getPhone() {
      getPhone().then((res) => {
        if (res.code === ERR_OK) {
          this.phone = res.data
        }
      })
    },
    _addHotQuestion(data) {
      addHotQuestion(data).then((res) => {
        if (res.code === ERR_OK) {
          this.dialogFormVisible = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this._getAllHotQuestion()
        }
      })
    },
    _editHotQuestionById(data) {
      editHotQuestionById(data).then((res) => {
        if (res.code === ERR_OK) {
          this.dialogFormVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this._getAllHotQuestion()
        }
      })
    },
    _updatePhone() {
      updatePhone(this.phone).then((res) => {
        if (res.code === ERR_OK) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    },
    hotphone() {
      console.log('修改')
      this.$prompt('请输入热线', '热线', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value) {
          this.phone = value
          this._updatePhone()
        } else {
          this.$message({
            type: 'info',
            message: '请输入热线'
          })
        }
      })
    },
    del(id) {
      this.$confirm('是否删除该问题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHotQuestionById(id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this._getAllHotQuestion()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClick(id) {
      this.questionERR = ''
      this.answerERR = ''
      if (id) {
        this.title = '修改问题'
        getHotQuestionById(id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.problem = res.data
          }
        })
      } else {
        this.title = '新增问题'
        this.problem = {
          answer: null,
          question: null,
          id: null
        }
      }
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getAllHotQuestion()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getAllHotQuestion()
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      if (!this.problem.question) {
        this.questionERR = '请输入问题'
        return
      }
      if (!this.problem.answer) {
        this.answerERR = '请输入答案'
        return
      }
      if (this.problem.id) {
        this._editHotQuestionById(this.problem)
      } else {
        this._addHotQuestion(this.problem)
      }
    },
    Lower(id, state) {
      if (state === 1) {
        isUpperHotQuestion(id, 2).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '已下架问题',
              type: 'success'
            })
            this._getAllHotQuestion()
          }
        })
      } else {
        isUpperHotQuestion(id, 1).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '已上架问题',
              type: 'success'
            })
            this._getAllHotQuestion()
          }
        })
      }
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
</style>
