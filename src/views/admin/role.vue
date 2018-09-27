<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addRoles()">新增权限</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="name" label="权限名称" align="center">
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createDate).getFullYear()+ '-' + (((new Date(scope.row.createDate).getMonth() + 1)
              < 10) ? '0' + (new Date(scope.row.createDate).getMonth() + 1) : (new Date(scope.row.createDate).getMonth() + 1)) + '-' + ((new Date(scope.row.createDate).getDate() < 10) ? '0' + new Date(scope.row.createDate).getDate() : new Date(scope.row.createDate).getDate())}}</span> </template> </el-table-column> <el-table-column prop="note" label="备注" align="center">
                <template slot-scope="scope">
                  <p v-if="scope.row.id != 1">
                    {{scope.row.note}}
                  </p>
                  <p v-else>
                    最高权限，不可更改
                  </p>
                </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.id != 1">
              <el-button @click="addRoles(scope.row.id)" type="primary" size="small">修改</el-button>
              <el-button @click="del(scope.row.id)" type="danger" size="small">删除</el-button>
            </p>
            <p v-else>
              不可操作
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form ref="dataForm" label-position="right" label-width="15%" style='width:90%;'>
        <el-form-item label="权限名称">
          <el-input placeholder="请输入权限名称" v-model="dataAll.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input placeholder="请输入备注" v-model="dataAll.note"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
          <div>网站管理</div>
          <el-checkbox-group v-model="homeData">
            <el-checkbox v-for="(item, index) in homeList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>会员管理</div>
          <el-checkbox-group v-model="userData">
            <el-checkbox v-for="(item, index) in userList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>商城管理</div>
          <el-checkbox-group v-model="shoppingData">
            <el-checkbox v-for="(item, index) in shoppingList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>积分商城管理</div>
          <el-checkbox-group v-model="integralData">
            <el-checkbox v-for="(item, index) in integralList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>订单管理</div>
          <el-checkbox-group v-model="orderData">
            <el-checkbox v-for="(item, index) in orderList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>优惠券管理</div>
          <el-checkbox-group v-model="discountData">
            <el-checkbox v-for="(item, index) in discountList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>服务管理</div>
          <el-checkbox-group v-model="serverData">
            <el-checkbox v-for="(item, index) in  serverList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>管理员管理</div>
          <el-checkbox-group v-model="adminData">
            <el-checkbox v-for="(item, index) in adminList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <div>系统日志管理</div>
          <el-checkbox-group v-model="systemData">
            <el-checkbox v-for="(item, index) in systemList" :label="item.key" :key="index" style='margin-left:0; margin-right:15px;'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
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
import { getRoles, addRole, getRoleById, editRole, deleteRole } from '@/api/user'
import { ERR_OK } from '@/api/config'

export default {
  data() {
    return {
      homeList: [{ key: 1, name: '查询Bnnner' }, { key: 2, name: '查询会议厅' }, { key: 3, name: '新增Banner' }, { key: 4, name: '上下架Banner' }, { key: 7, name: '删除Banner' }, { key: 5, name: '获取首页文章内容' }, { key: 6, name: '更改首页文章内容' }, { key: 16, name: '查询所有大厅' }, { key: 17, name: '新增大厅' }, { key: 18, name: '查询大厅信息' }, { key: 19, name: '修改大厅信息' }, { key: 20, name: '删除大厅' }, { key: 73, name: '上架大厅' }, { key: 8, name: '获取一隅一食推荐图片' }, { key: 10, name: '查询一隅一食推荐图片详情' }, { key: 11, name: '修改一隅一食推荐图片详情' }],
      homeData: [],
      userList: [{ key: 14, name: '查询用户' }, { key: 15, name: '导出用户' }],
      userData: [],
      shoppingList: [{ key: 21, name: '查询所有一期一会商品' }, { key: 22, name: '新增一期一会商品' }, { key: 23, name: '查询一期一会商品详情' }, { key: 24, name: '修改一期一会商品' }, { key: 25, name: '删除一期一会商品' }, { key: 74, name: '上架一期一会商品' }, { key: 26, name: '查询所有商品' }, { key: 27, name: '新增商品 ' }, { key: 28, name: '查询商品详情' }, { key: 29, name: '修改商品详情' }, { key: 30, name: '设置为热推商品' }, { key: 31, name: '上架商品' }, { key: 32, name: '删除商品' }, { key: 13, name: '查看顶部热推图片' }, { key: 12, name: '修改顶部热推图片' }, { key: 9, name: '设置一隅一食推荐图片' }, { key: 51, name: '核销优惠券' }],
      shoppingData: [],
      integralList: [{ key: 33, name: '查询所有积分商品' }, { key: 34, name: '新增积分商品' }, { key: 35, name: '查询积分商品详情' }, { key: 36, name: '修改积分商品详情' }, { key: 37, name: '上架积分商品' }, { key: 38, name: '删除积分商品' }],
      integralData: [],
      orderList: [{ key: 39, name: '查询所有商品订单' }, { key: 42, name: '导出商品订单Excel' }, { key: 40, name: '查询所有积分商品订单' }, { key: 41, name: '输入快递单号' }, { key: 43, name: '导出积分商品订单Excel' }],
      orderData: [],
      discountList: [{ key: 44, name: '查询所有优惠券' }, { key: 45, name: '新增优惠券' }, { key: 46, name: '查看优惠券信息' }, { key: 47, name: '修改优惠券信息' }, { key: 48, name: '删除优惠券' }, { key: 49, name: '上架优惠券' }, { key: 50, name: '发放优惠券' }, { key: 52, name: '查看优惠券二维码 ' }, { key: 53, name: '扫码发放优惠券' }],
      discountData: [],
      serverList: [{ key: 75, name: '查看会议预定' }, { key: 76, name: '设置已联系' }, { key: 77, name: '添加反馈' }, { key: 54, name: '查询所有热门问题' }, { key: 55, name: '新增热门问题' }, { key: 56, name: '查看热门问题详情' }, { key: 57, name: '修改热门问题详情' }, { key: 58, name: '删除热门问题详情 ' }, { key: 59, name: '上架热门问题详情' }, { key: 60, name: '修改电话号码' }],
      serverData: [],
      adminList: [{ key: 61, name: '添加管理员' }, { key: 63, name: '查询所有管理员' }, { key: 64, name: '查看管理员信息' }, { key: 62, name: '修改管理员权限' }, { key: 65, name: '删除管理员' }, { key: 66, name: '添加角色' }, { key: 68, name: '查询所有角色' }, { key: 69, name: '查看角色信息 ' }, { key: 67, name: '修改角色信息' }, { key: 70, name: '删除角色' }],
      adminData: [],
      systemList: [{ key: 71, name: '查询所有日志' }, { key: 72, name: '删除日志' }],
      systemData: [],
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
      title: '新增权限管理',
      dataAll: {
        name: '',
        homeData: '',
        userData: '',
        shoppingData: '',
        integralData: '',
        orderData: '',
        discountData: '',
        serverData: '',
        adminData: '',
        systemData: '',
        parkData: '',
        note: '',
        id: ''
      },
      checkAll: false,
      isIndeterminate: true
    }
  },
  created() {
    this._getRoles()
  },
  methods: {
    _getRoles() {
      this.data.pageNum = this.listQuery.page
      this.data.pageSize = this.listQuery.limit
      getRoles(this.data.pageNum, this.data.pageSize).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.tableData = res.data.list
        }
      })
    },
    _addRole() {
      console.log(this.dataAll)
      addRole(this.dataAll).then((res) => {
        if (res.code === ERR_OK) {
          console.log('保存成功')
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.dialogFormVisible = false
          this._getRoles()
        }
      })
    },
    _getRoleById(id) {
      getRoleById(id).then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取成功')
          console.log(res.data)
          var vm = this
          this.dataAll.name = res.data.name
          this.dataAll.note = res.data.note
          if (res.data.homeData !== '') {
            res.data.homeData.split(',').forEach(function(value, index, array) {
              vm.homeData.push(Number(value))
            })
          }
          if (res.data.userData !== '') {
            res.data.userData.split(',').forEach(function(value, index, array) {
              vm.userData.push(Number(value))
            })
          }
          if (res.data.shoppingData !== '') {
            res.data.shoppingData.split(',').forEach(function(value, index, array) {
              vm.shoppingData.push(Number(value))
            })
          }
          if (res.data.integralData !== '') {
            res.data.integralData.split(',').forEach(function(value, index, array) {
              vm.integralData.push(Number(value))
            })
          }
          if (res.data.orderData !== '') {
            res.data.orderData.split(',').forEach(function(value, index, array) {
              vm.orderData.push(Number(value))
            })
          }
          if (res.data.discountData !== '') {
            res.data.discountData.split(',').forEach(function(value, index, array) {
              vm.discountData.push(Number(value))
            })
          }
          if (res.data.serverData !== '') {
            res.data.serverData.split(',').forEach(function(value, index, array) {
              vm.serverData.push(Number(value))
            })
          }
          if (res.data.adminData !== '') {
            res.data.adminData.split(',').forEach(function(value, index, array) {
              vm.adminData.push(Number(value))
            })
          }
          if (res.data.systemData !== '') {
            res.data.systemData.split(',').forEach(function(value, index, array) {
              vm.systemData.push(Number(value))
            })
          }
        }
      })
    },
    _editRole() {
      editRole(this.dataAll).then((res) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.dialogFormVisible = false
        this._getRoles()
      })
    },
    del(id) {
      this.$confirm('是否删除该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this._getRoles()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addRoles(id) {
      console.log(id)
      this.checkAll = false
      this.dialogFormVisible = true
      this.dataAll.name = ''
      this.homeData = []
      this.userData = []
      this.shoppingData = []
      this.integralData = []
      this.orderData = []
      this.discountData = []
      this.serverData = []
      this.adminData = []
      this.systemData = []
      this.parkData = []
      this.dataAll.note = ''
      this.dataAll.id = ''
      if (id) {
        this._getRoleById(id)
        this.title = '修改权限管理'
        this.dataAll.id = id
      }
    },
    quxiao() {
      this.dialogFormVisible = false
    },
    trueover() {
      console.log('保存')
      this.dataAll.homeData = this.homeData.join()
      this.dataAll.userData = this.userData.join()
      this.dataAll.shoppingData = this.shoppingData.join()
      this.dataAll.integralData = this.integralData.join()
      this.dataAll.orderData = this.orderData.join()
      this.dataAll.discountData = this.discountData.join()
      this.dataAll.serverData = this.serverData.join()
      this.dataAll.adminData = this.adminData.join()
      this.dataAll.systemData = this.systemData.join()
      console.log(this.dataAll)
      if (this.title === '新增权限管理') {
        this._addRole()
      } else {
        this._editRole()
      }
    },
    handleCheckAllChange(value) {
      console.log(value)
      if (value) {
        this.homeData = [1, 2, 3, 4, 7, 5, 6, 16, 17, 18, 19, 20, 73, 8, 10, 11]
        this.userData = [14, 15]
        this.shoppingData = [21, 22, 23, 24, 25, 74, 26, 27, 28, 29, 30, 31, 32, 13, 12, 9, 51]
        this.integralData = [33, 34, 35, 36, 37, 38]
        this.orderData = [39, 42, 40, 41, 43]
        this.discountData = [44, 45, 46, 47, 48, 49, 50, 52, 53]
        this.serverData = [75, 76, 77, 54, 55, 56, 57, 58, 59, 60]
        this.adminData = [61, 63, 64, 62, 65, 66, 68, 69, 67, 70]
        this.systemData = [71, 72]
        this.parkData = []
      } else {
        this.homeData = []
        this.userData = []
        this.shoppingData = []
        this.integralData = []
        this.orderData = []
        this.discountData = []
        this.serverData = []
        this.adminData = []
        this.systemData = []
        this.parkData = []
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this._getRoles()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this._getRoles()
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
