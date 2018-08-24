<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="搜索">
      </el-input>
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.importance" placeholder="会员级别">
        <el-option v-for="item in importanceOptions" :key="item.key" :label="item.key" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加商品</el-button>
      <div class="he20"></div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="name1" label="商品名称">
        </el-table-column>
        <el-table-column prop="name2" label="商品订单">
        </el-table-column>
        <el-table-column prop="date" label="购买日期">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="province" label="消费积分">
        </el-table-column>
        <el-table-column prop="city" label="会员级别">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="zip" label="邮编">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="success" size="small">已发货</el-button>
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
      importanceOptions: [{ key: 'V1会员' }, { key: 'V2会员' }],
      tableData: [{
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        name1: '蓝牙耳机',
        name2: '12348596846516351',
        date: '2016-05-03',
        name: '王小虎',
        province: '12456',
        city: 'V1会员',
        address: '上海市普陀区金沙江路 1518 弄',
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
