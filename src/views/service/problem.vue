<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="搜索问题">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加问题</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">修改联系电话</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="date" label="问题">
        </el-table-column>
        <el-table-column prop="name" label="答案">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
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
      importanceOptions: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }],
      tableData: [{
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
      }, {
        date: 'wifi是多少？',
        name: '打开微信扫一扫'
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
