<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 150px;" class="filter-item" placeholder="请输入商品名称">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.importance" placeholder="是否为热推">
        <el-option v-for="item in list" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.importance" placeholder="选择分类">
        <el-option v-for="item in importanceOptions" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加商品</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="date" label="商品ID">
        </el-table-column>
        <el-table-column prop="province" label="商品缩略图">
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="city" label="折扣价">
        </el-table-column>
        <el-table-column prop="city" label="原价">
        </el-table-column>
        <el-table-column prop="address" label="是否为热推">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.address" active-text="是" inactive-text="否">
            </el-switch>
          </template>
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
      importanceOptions: [{ key: '房券' }, { key: '餐券' }],
      list: [{ key: '热推' }, { key: '非热推' }],
      tableData: [{
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
        zip: 200333
      },
      {
        date: '1',
        name: '王小虎',
        province: 'img',
        city: '普陀区',
        address: true,
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
