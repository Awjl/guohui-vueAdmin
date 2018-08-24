<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入会员名称">
      </el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入会员手机号">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.importance" placeholder="请选择会员等级">
        <el-option v-for="item in importanceOptions" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="date" label="id">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="province" label="手机号">
        </el-table-column>
        <el-table-column prop="city" label="级别">
        </el-table-column>
        <el-table-column prop="zip" label="积分">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="warning" size="small">冻结</el-button>
            <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
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
export default {
  data() {
    return {
      loading: false,
      total: 100,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [{ key: '普通会员' }, { key: 'VIP会员' }],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '13500000000',
        city: '普通会员',
        zip: 200333
      }]
    }
  },
  methods: {
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
.he20 {
  height: 20px;
}
.filter-container {
  width: 100%;
  min-height: 700px;
}
</style>
