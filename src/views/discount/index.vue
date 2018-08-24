<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="搜索">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.importance" placeholder="优惠券类型">
        <el-option v-for="item in importanceOptions" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加优惠券</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="优惠券名称">
        </el-table-column>
        <el-table-column prop="province" label="优惠方式">
        </el-table-column>
        <el-table-column prop="city" label="类型">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
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
      place: '测试',
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
      importanceOptions: [{ key: '停车优惠券' }, { key: '内部优惠券' }],
      tableData: [{
        name: '停车优惠券',
        province: '优惠50',
        city: '停车优惠'
      }, {
        name: '停车优惠券',
        province: '优惠50',
        city: '停车优惠'
      }, {
        name: '停车优惠券',
        province: '满200优惠50',
        city: '停车优惠'
      }, {
        name: '停车优惠券',
        province: '满300优惠150',
        city: '停车优惠'
      }, {
        name: '房券购买优惠券',
        province: '满200优惠50',
        city: '内部购买优惠券'
      }, {
        name: '房券购买优惠券',
        province: '优惠50',
        city: '内部购买优惠券'
      }, {
        name: '房券购买优惠券',
        province: '满200优惠50',
        city: '内部购买优惠券'
      }, {
        name: '餐券购买优惠券',
        province: '优惠50',
        city: '内部购买优惠券'
      }, {
        name: '餐券购买优惠券',
        province: '优惠50',
        city: '内部购买优惠券'
      }, {
        name: '餐券购买优惠券',
        province: '满200优惠50',
        city: '内部购买优惠券'
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
